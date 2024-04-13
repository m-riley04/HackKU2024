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
  const [address, setAddress] = useState("Placeholder");

  const geocodingLibrary = useMapsLibrary("geocoding");
  if (geocodingLibrary) {
    const geocoder = new geocodingLibrary.Geocoder();

    navigator.geolocation.watchPosition(
      (position: GeolocationPosition) => {
        let coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        geocoder.geocode({ location: coords }, (response) => {
          if (response) {
            setAddress(response[0].formatted_address);
          }
        });
      },
      () => {},
    );
  }

  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <AdvancedMarker
          className={name}
          ref={markerRef}
          onClick={() => setInfowindowOpen(true)}
          position={{ lat: latitude, lng: longitude }}
          title={"Stub for marker"}
        />

        {infowindowOpen && (
          <InfoWindow
            anchor={marker}
            maxWidth={200}
            onCloseClick={() => setInfowindowOpen(false)}
          >
            <p> {name} - {address} </p>
            <img height="100" src={image} />
          </InfoWindow>
        )}
      </APIProvider>
    </>
  );
}

export default CustomMarker;
