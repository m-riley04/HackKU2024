import OpenAI from "openai";
import { useEffect, useState } from "react";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import { Fact, Pin, User } from "../interfaces";
import ScanResults from "../ScanResults/ScanResults";
import LoadingIcon from "../LoadingIcon/LoadingIcon";


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

/**
 * Updates the user
 * @param userId 
 * @param userData 
 * @returns 
 */
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

/**
 * Adds a new pin to the database via a POST request.
 * 
 * @param {Pin} pin - The pin data to add.
 */
async function addPin(pin: Pin) {
    try {
        const response = await fetch(`${window.location.origin}/api/pins`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pin)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Pin added successfully:', result);
            return result;
        } else {
            const error = await response.json();
            throw new Error(`Failed to add pin: ${error.message}`);
        }
    } catch (error) {
        console.error('Error adding pin:', error);
        throw error;  // Re-throw to handle it according to the context of the call
    }
}

/**
 * Adds an amount to the user's total trash collection count
 * @param user the user that will have their stats updated
 * @param numOfTrash the number of pieces of trash that the user cleaned up
 */
async function addTrashCollected(user: User, numOfTrash: number) {
    user.trashCollected += numOfTrash;
}

/**
 * Adds an amount of xp to a user
 * @param user the user that will gain xp
 * @param xp the amount of xp to be gained
 */
async function addXP(user: User, xp: number) {
    user.xp += xp;
    await checkUserXP(user);
}

/**
 * Checks the user's current XP to see if they are ready to level up.
 * If they are, increments their level and resets their xp (accounting for rollover).
 * @param user the user whose xp will be checked
 */
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
            let mat = await getObjectMaterial_GPT(uri)
            setMaterial(mat);

            if (mat !== "paper" && mat !== "plastic" && mat !== "glass") {
                mat = "other";
            }

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
        let xpToAdd = 0;
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
            case "":
                break;
            case "none":
                break;
            default:
                xpToAdd = 1;
                break;
        }
        
        // Update the user
        const numOfTrash = 1;
        addTrashCollected(user, numOfTrash);
        if (xpToAdd > 0) addXP(user, xpToAdd);

        // Construct a placeholder pin
        const tempPin = {
            id: 3,
            name: "University of Kansas",
            latitude: -38,
            longitude: -95
        };

        // Add a pin to the map
        addPin(tempPin)
            .then(data => console.log(data))
            .catch(error => console.error(error));

        setProcessing(false); // Hide the loading screen
    }, [material])

    // Processing/loading screen
    if (processing) {
        return (
            <div style={{height: "78vh"}}>
                <p>Processing image data...</p>
                <LoadingIcon></LoadingIcon>
            </div>
        );
    }

    return (
        <>
        <div style={{height: "73vh"}}>
            {
            (imageData)
            // If an image was taken...
                ? 
                <>
                    <div className="picture-preview-container">
                        <img src={imageData}/>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", margin: "auto"}}>
                        <button onClick={handleRetake}>Retake</button>
                        <button onClick={() => handleImageChosen(imageData)}>Confirm</button>
                    </div>
                </>
            // If there isn't an image yet...
                : <Camera onTakePhoto={handleTakePhoto} idealFacingMode={FACING_MODES.ENVIRONMENT}/> 
            }
            {(material) ? <ScanResults material={material} recyclable={recyclable} fact={fact?.body}></ScanResults> : <></>}
        </div>

        
        </>
    );
}

export default CameraPage;