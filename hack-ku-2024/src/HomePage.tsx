import "./App.scss";
import { useEffect, useState } from "react";
import UserStats from "./UserStats/UserStats";
import { Button } from "react-bootstrap";
import Minimap from "./Minimap/Minimap";
import { User } from "./interfaces";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import { APIProvider } from "@vis.gl/react-google-maps";
import "react-html5-camera-photo/build/css/index.css";
import OpenAI from "openai";

const APP_URL = "https://hackku2024-lz3sc7ogqa-uc.a.run.app";

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

function HomePage() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [imageData, setImageData] = useState('');
  const [trashCategory, setTrashCategory] = useState<string | null | undefined>("");
  const [loading, setLoading] = useState(false);

  /**
   * Sets the user hook based on a user ID
   * @param id a user Id
   */
  async function handleSetUser(id: number) {
    await fetch(`${APP_URL}/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
        console.log(user);
      }) // Set the user state
      .catch((e) => {
        console.error("Failed to fetch user:", e);
      });
  }

  function handleClickedRetake() {
    setImageData('');
  }

  /**
   * Function that handles when the image is chosen
   * @param uri image uri to process
   */
  async function handleImageChosen(uri: string) {
    // Show a loading screen
    setLoading(true);
  
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
      
      //
      console.log(trashCategory)
  
      setLoading(false);
      setImageData(''); // Clear the image data
    }
}

  /**
   * Handles when the user opens the camera
   */
  function handleOpenCamera() {
    setCameraOpen(true);
  }

  /**
   * Handles when the user closes the camera
   */
  function handleCloseCamera() {
    setCameraOpen(false);
  }

  /**
   * Handles taking the photo
   * @param dataUri the image data uri
   */
  function handleTakePhoto(dataUri: string) {
    console.log(`takePhoto: ${dataUri}`);
    setImageData(dataUri);
  }

  //===== DEBUGGING USERS
  useEffect(() => {
    if (user == undefined) {
      // Set current user for debugging/placeholder
      const currentUserId = 1;

      // Get the current user from the database
      handleSetUser(currentUserId);
    }
  }, [user]);

  if (!user) {
    return (
      <>
        <p>Loading user...</p>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <p>Processing image data...</p>
      </>
    );
  }

  // Check if the camera is open
  if (cameraOpen) return (
    <>
      <div>
        {
          (imageData)
          // If an image was taken...
            ? 
            <>
              <img src={imageData}/>
              <button onClick={handleClickedRetake}>Retake</button>
              <button onClick={() => handleImageChosen(imageData)}>Confirm</button>
            </>
          // If there isn't an image yet...
            : <Camera onTakePhoto={handleTakePhoto} idealFacingMode={FACING_MODES.ENVIRONMENT}/> 
        }
      </div>
      <button onClick={handleCloseCamera}>Back</button>

      {(trashCategory) ? <><h3>{trashCategory}</h3></> : <></>}
    </>
  );

  return (
    <>
      <UserStats user={user}></UserStats>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Minimap />
      </APIProvider>
      <Button onClick={handleOpenCamera}>Open Camera</Button>
    </>
  );
}

export default HomePage;
