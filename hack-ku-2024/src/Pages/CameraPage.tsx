import OpenAI from "openai";
import { useEffect, useState } from "react";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import { Fact, User } from "../interfaces";


const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true
});

/**
 * Processes an image using GPT Vision to determine the material that it is made out of. The possible materials are paper, plastic, metal, glass, styrofoam, and other.
 * @param uri a public image uri
 * @returns {string} a string that is a single-word defining the material
 * 
 * @throws {Error} if the API/GPT returns nothing, or if it returns "Error" as a string
 */
async function getObjectMaterial_GPT(uri: string) {
    const PROMPT = `You are a tool that's sole purpose is to categorize images of trash. When a user uploads an image of trash, 
      you must and will only reply in one word from the word list. The categories/words that you are able to respond with are the following:
      - Paper
      - Plastic
      - Metal
      - Glass
      - Styrofoam
      - Ceramic
      If the user takes a picture of something that is not recyclable or it is just trash, you must reply with "Other"
      If the user takes a picture of something that is not trash, you must reply with "None". 
      If something goes wrong during image processing, you must reply with "Error".
      Please give your best guess.`;
  
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: PROMPT },
            { type: "image_url", image_url: { url: uri } },
          ],
        },
      ],
    });
  
    if (response.choices && response.choices.length > 0 && response.choices?.at(0)?.message.content?.toLowerCase() != "error") {
      console.log(`Response: "${response.choices?.at(0)?.message.content}"`); // Process the API response
      return response.choices?.at(0)?.message.content?.toLowerCase();
    } else {
      throw new Error('No response from AI model');
    }
}
async function updateUser(userId: number, userData: User) {
    try {
        const response = await fetch(`${window.location.origin}/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Server responded with an error');
        }

        const result = await response.json();
        console.log('Update successful:', result);
        return result;
    } catch (error) {
        console.error('Failed to update user:', error);
        throw new Error('Failed to update user');
    }
}

async function addXP(user: User, xp: number) {

    user.xp += xp;
    await checkUserXP(user);
}

async function checkUserXP(user: User) {
    // Check if the XP is above the user's next XP
    if (user.xp >= user.nextLevelXP) {
        // Increment the level
        user.level += 1;

        // Get the rollover XP
        const rolloverXP = user.xp - user.nextLevelXP;
        user.xp = rolloverXP

        // Set the new level XP
        user.nextLevelXP = 10 * user.level;
    }

    // Update the database
    await updateUser(user.id, user)
}
  
function CameraPage({ user } : { user: User}) {
    const [imageData, setImageData] = useState('');
    const [material, setMaterial] = useState<string | null | undefined>("");
    const [processing, setProcessing] = useState(false);
    const [fact, setFact] = useState<Fact | undefined>();
    const [recyclable, setRecyclable] = useState(false);

    /**
     * Handles when the used clicks on retake
     */
    function handleRetake() {
        setImageData('');
    }

    /**
     * Function that handles when the image is chosen
     * @param uri image uri to process
     */
    async function handleImageChosen(uri: string) {
        // Show a loading screen
        setProcessing(true);
    
        // Process the image and get the object's material as a string
        try {
            const mat = await getObjectMaterial_GPT(uri)
            setMaterial(mat);

            await fetch(`${window.location.origin}/api/facts/${mat}`)
                .then((res) => res.json())
                .then((data) => {
                    const _facts = data.data;
                    const _item = _facts[Math.floor(Math.random()*_facts.length)]
                    console.log(_item)
                    setFact(_item)
                }) // Set the user state
                .catch((e) => {
                    console.error("Failed to fetch user:", e);
                });
        } catch (error) {
            console.error(error);
        } finally {
            setProcessing(false); // Hides the loading screen
            setImageData(''); // Clear the image data
        }
    }

    /**
     * Handles taking the photo
     * @param dataUri the image data uri
     */
    function handleTakePhoto(dataUri: string) {
        console.log(`takePhoto: ${dataUri}`);
        setImageData(dataUri);
    }

    useEffect(() => {
        // Update the recyclable state
        const recyclable = ["plastic", "paper", "metal", "glass"]
        const nonrecyclable = ["styrofoam", "ceramic"]

        if (nonrecyclable.includes(String(material))) { 
            // Material is not recyclable
            setRecyclable(false);
            
        } else if (material != "" && recyclable.includes(String(material))) {
            // Material is reyclable
            setRecyclable(true);
        } else {
            // Material is empty or none
            setRecyclable(false);
        }

        // Give the user an experience point based on the material
        let xpToAdd = 1;

        switch (material) {
            case "plastic":
                xpToAdd = 5;
                break;
            case "styrofoam":
                xpToAdd = 4;
                break;
            case "glass":
                xpToAdd = 3;
                break;
            case "metal":
                xpToAdd = 2;
                break;
            case "paper":
                xpToAdd = 1;
                break;
            default:
                xpToAdd = 1;
                break;
        }
        
        addXP(user, xpToAdd);
    }, [material])

    // Processing/loading screen
    if (processing) {
        return (
        <>
            <p>Processing image data...</p>
        </>
        );
    }

    return (
        <>
        <div>
            {
            (imageData)
            // If an image was taken...
                ? 
                <>
                    <div className="picture-preview-container">
                        <img src={imageData}/>
                    </div>
                    <button onClick={handleRetake}>Retake</button>
                    <button onClick={() => handleImageChosen(imageData)}>Confirm</button>
                </>
            // If there isn't an image yet...
                : <Camera onTakePhoto={handleTakePhoto} idealFacingMode={FACING_MODES.ENVIRONMENT}/> 
            }
        </div>

        {(material) ? <><h3>{material}</h3></> : <></>}
        {(fact) ? <><p>{fact.body}</p></> : <></>}
        {(recyclable) ? <>Recyclable</> : <>Non-Recyclable</>}
        </>
    );
}

export default CameraPage;