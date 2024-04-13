import { useState } from "react";
import "./Minimap.scss";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

import CustomMarker from "./Marker";

function Minimap() {
  const [location, setLocation] = useState<GeolocationCoordinates>();

  if (!navigator.geolocation) {
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position: GeolocationPosition) => {
      setLocation(position.coords)
    },
    () => {},
  );

  if (!location) {
    return (
      <div className="map_error">
        <p> Failed to get geolocation data </p>
      </div>
    );
  }

  return (
    <div className="map">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          mapId="efc6d932e1c1638a"
          defaultCenter={{ lat: location.latitude, lng: location.longitude }}
          defaultZoom={15}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <CustomMarker
            name="test"
            id={0}
            latitude={location.latitude}
            longitude={location.longitude}
            image="./images/leep.jpg"
          />
        </Map>
        <Minimap/>
      </APIProvider>
    </div>
  );
}

export default Minimap;
