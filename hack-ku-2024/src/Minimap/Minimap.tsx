import { useEffect, useState } from "react";
import "./Minimap.scss";

import { Map, APIProvider } from "@vis.gl/react-google-maps";

import CustomMarker from "./Marker";

function Minimap() {
  // define location state
  const [location, setLocation] = useState<GeolocationCoordinates>();
  const failure = <div className="map" />;

  // check if browser supports geolocation
  if (!navigator.geolocation) {
    return failure;
  }

  // use native HTML geolocation service to get the user's current position
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setLocation(position.coords);
      },
      () => {},
    );
  }, []);

  // return empty map if location service failed
  if (!location) {
    return failure;
  }

  // embed map from google maps api with user pins
  return (
    <div className="map">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          mapId="efc6d932e1c1638a"
          defaultCenter={{ lat: location.latitude, lng: location.longitude }}
          disableDefaultUI={true}
          gestureHandling={"greedy"}
          defaultZoom={15}
        >
          <CustomMarker id={0} />
          <CustomMarker id={1} />
        </Map>
      </APIProvider>
    </div>
  );
}

export default Minimap;
