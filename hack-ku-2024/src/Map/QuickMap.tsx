import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useGeolocated } from "react-geolocated";

import CustomMarker from "./Marker.tsx";

function QuickMap() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated();
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return !(isGeolocationEnabled && isGeolocationAvailable && coords) ? (
    <p> Failed to get geolocation data </p>
  ) : (
    <APIProvider apiKey={API_KEY}>
      <Map
        mapId={"somethingunique"}
        style={{ width: "90vw", height: "50vh" }}
        defaultCenter={{ lat: coords.latitude, lng: coords.longitude }}
        defaultZoom={15}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <CustomMarker latitude={coords.latitude} longitude={coords.longitude} />
      </Map>
    </APIProvider>
  );
}

export default QuickMap;
