import './App.scss'
import { useEffect, useState } from "react"
import UserStats from './UserStats/UserStats'
import { Button } from 'react-bootstrap'
import Minimap from './Minimap/Minimap'
import { User } from "./interfaces"
import Camera from 'react-html5-camera-photo'
const APP_URL = "https://hackku2024-lz3sc7ogqa-uc.a.run.app"

function HomePage() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [cameraOpen, setCameraOpen] = useState(false);

  /**
   * Sets the user hook based on a user ID
   * @param id a user Id
   */
  async function handleSetUser(id:number) {
    await fetch(`${APP_URL}/api/users/${id}`)
    .then(res => res.json())
    .then(data => { setUser(data.data); console.log(user) }) // Set the user state
    .catch(e => {
      console.error("Failed to fetch user:", e);
    });
  }

  function handleOpenCamera() {
    setCameraOpen(true);
  }

  function handleTakePhoto (dataUri:string) {
    // Do stuff with the photo...
    console.log(`takePhoto: ${dataUri}`);
  }

  useEffect(() => {
    if (user == undefined) {
      // Set current user for debugging/placeholder
      const currentUserId = 1;

      // Get the current user from the database
      handleSetUser(currentUserId)
    }
  }, [user]);

  if (!user) {
    return <><p>Loading user...</p></>
  }

  if (cameraOpen) return (
    <Camera
      onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
    />
  );

  return (
    <>
      <UserStats user={user}></UserStats>
      <Minimap/>
      <Button onClick={handleOpenCamera}>Open Camera</Button>
    </>
  )
}

export default HomePage
