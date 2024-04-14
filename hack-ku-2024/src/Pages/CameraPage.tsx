import OpenAI from "openai";
import { useState } from "react";
import Camera, { FACING_MODES } from "react-html5-camera-photo";


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
      - Other
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
  
function CameraPage() {
    const [imageData, setImageData] = useState('');
    const [trashCategory, setTrashCategory] = useState<string | null | undefined>("");
    const [processing, setProcessing] = useState(false);

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
            setTrashCategory(await getObjectMaterial_GPT(uri));
        } catch (error) {
            console.error(error);
        } finally {
            // Check the category
            switch (trashCategory) {
                case "plastic":
                    break;
                case "paper":
                    break;
                case "metal":
                    break;
                case "glass":
                    break;
                case "styrofoam":
                    break;
                case "other":
                    break;
        
                default:
                    //setTrashCategory(null);
                    break;
            }
            
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
                <img src={imageData}/>
                <button onClick={handleRetake}>Retake</button>
                <button onClick={() => handleImageChosen(imageData)}>Confirm</button>
                </>
            // If there isn't an image yet...
                : <Camera onTakePhoto={handleTakePhoto} idealFacingMode={FACING_MODES.ENVIRONMENT}/> 
            }
        </div>

        {(trashCategory) ? <><h3>{trashCategory}</h3></> : <></>}
        </>
    );
}

export default CameraPage;