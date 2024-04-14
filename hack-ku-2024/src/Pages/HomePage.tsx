import "../App.scss";
import UserStats from "../UserStats/UserStats";
import Minimap from "../Minimap/Minimap";
import { User } from "../interfaces";
import { APIProvider } from "@vis.gl/react-google-maps";
import "react-html5-camera-photo/build/css/index.css";

function HomePage({ user } : { user: User}) {

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
