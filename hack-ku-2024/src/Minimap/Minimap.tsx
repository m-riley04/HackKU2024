import { useState } from "react";
import "./Minimap.scss";

import { Map, useMap } from "@vis.gl/react-google-maps";

import CustomMarker from "./Marker";

function Minimap() {
  const [location, setLocation] = useState<GeolocationCoordinates>();
  const map = useMap();

  if (!navigator.geolocation) {
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position: GeolocationPosition) => {
      setLocation(position.coords);
      if (location && map) {
        map.panTo({ lat: location.latitude, lng: location.longitude });
      }
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
      <Map
        mapId="efc6d932e1c1638a"
        defaultZoom={15}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <CustomMarker
          name="test"
          id="test"
          latitude={location.latitude}
          longitude={location.longitude}
          image="./images/leep.jpg"
        />
      </Map>
    </div>
  );
}

export default Minimap;
