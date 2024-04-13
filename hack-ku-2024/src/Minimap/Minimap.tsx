import "./Minimap.scss"

import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useGeolocated } from "react-geolocated";

import CustomMarker from "./Marker.tsx";

function Minimap() {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
      useGeolocated();
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    return !(isGeolocationEnabled && isGeolocationAvailable && coords) ? (
      <div className="map_error">
        <p> Failed to get geolocation data </p>
      </div>
      ): (
      <div className="map">
      <APIProvider apiKey={API_KEY}>
        <Map
          mapId={"somethingunique"}
          defaultCenter={{ lat: coords.latitude, lng: coords.longitude }}
          defaultZoom={15}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <CustomMarker name="test" id="test" latitude={coords.latitude} longitude={coords.longitude} image="./images/leep.jpg" />

        </Map>
      </APIProvider>
      </div>
    );
}

export default Minimap
