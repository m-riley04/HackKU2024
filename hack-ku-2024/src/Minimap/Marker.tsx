import { useState } from "react";
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";


function CustomMarker({ name, id, latitude, longitude, image } : { id:number, name:string, latitude:number, longitude: number, image: string}) {
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [prevCoords, setPrevCoords] = useState({ lat: 0.0, lng: 0.0 });
  const [address, setAddress] = useState("Placeholder");
  const METER = 0.00001;

  const marker = AdvancedMarker;

  const geocodingLibrary = useMapsLibrary("geocoding");
  if (geocodingLibrary) {
    const geocoder = new geocodingLibrary.Geocoder();

    const coords = {
      lat: latitude,
      lng: longitude,
    };

    let delta =
      ((coords.lat - prevCoords.lat) ** 2 +
        (coords.lng - prevCoords.lng) ** 2) **
      0.5;
    if (delta > METER) {
      setPrevCoords(coords);
      geocoder.geocode({ location: coords }, (response) => {
        if (response) {
          setAddress(response[0].formatted_address);
        }
      });
    }
  }

  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <AdvancedMarker
          className={name}
          ref={markerRef}
          onClick={() => setInfowindowOpen(true)}
          position={{ lat: latitude, lng: longitude }}
          title={`Stub for marker ${id}`}
        />

        {infowindowOpen && (
          <InfoWindow
            anchor={marker}
            maxWidth={200}
            onCloseClick={() => setInfowindowOpen(false)}
          >
            <p>
              {" "}
              {name} - {address}{" "}
            </p>
            <img height="100" src={image} />
          </InfoWindow>
        )}
      </APIProvider>
    </>
  );
}

export default CustomMarker;
