import { useEffect, useState } from "react";
import "./Minimap.scss";

import { Map, APIProvider } from "@vis.gl/react-google-maps";

import CustomMarker from "./Marker";

function Minimap() {
  const [location, setLocation] = useState<GeolocationCoordinates>();
  const failure = <div className="map" />;

  if (!navigator.geolocation) {
    return failure;
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setLocation(position.coords);
      },
      () => {},
    );
  }, []);

  if (!location) {
    return failure;
  }

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
