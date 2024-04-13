import "../App.scss";
import { useEffect, useState } from "react";
import UserStats from "../UserStats/UserStats";
import Minimap from "../Minimap/Minimap";
import { User } from "../interfaces";
import { APIProvider } from "@vis.gl/react-google-maps";
import "react-html5-camera-photo/build/css/index.css";

const APP_URL = "https://hackku2024-lz3sc7ogqa-uc.a.run.app";

/**
 * Processes an image using GPT Vision to determine the material that it is made out of. The possible materials are paper, plastic, metal, glass, styrofoam, and other.
 * @param uri a public image uri
 * @returns {string} a string that is a single-word defining the material
 * 
 * @throws {Error} if the API/GPT returns nothing, or if it returns "Error" as a string
 */

function HomePage() {
  const [user, setUser] = useState<User | undefined>(undefined);

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

  return (
    <>
      <UserStats user={user}></UserStats>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Minimap />
      </APIProvider>
    </>
  );
}

export default HomePage;
