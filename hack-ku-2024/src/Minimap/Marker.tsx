import { useEffect, useState } from "react";
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";

const APP_URL = "https://hackku2024-lz3sc7ogqa-uc.a.run.app";

function CustomMarker({ id }: { id: number }) {
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [trashData, setTrashData] = useState({ name: '', id: -1  })
  const [coords, setCoords] = useState({ lat: 0.0, lng: 0.0 });
  const [address, setAddress] = useState("Placeholder");
  //const METER = 0.00001;

  const geocodingLibrary = useMapsLibrary("geocoding");

  useEffect(() => {
    console.log(APP_URL);
    fetch(`${APP_URL}/api/pins/${id}`)
      .then((response) => response.json())
      .then((data) => {
        data = data.data;
        setCoords({lat: data.latitude, lng: data.longitude});
        setTrashData({name: data.name, id: data.id});
      }) // Set the user state
      .catch((e) => {
        console.error("Failed to fetch user:", e);
      });

    if (geocodingLibrary) {
      const geocoder = new geocodingLibrary.Geocoder();
        geocoder.geocode({ location: coords }, (response) => {
          if (response) {
            setAddress(response[0].formatted_address);
          }
        });
    }
  }, [ geocodingLibrary ]);

  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <AdvancedMarker
          ref={markerRef}
          onClick={() => setInfowindowOpen(true)}
          position={coords}
        />

        {infowindowOpen && (
          <InfoWindow
            anchor={marker}
            disableAutoPan={true}
            maxWidth={200}
            //maxHeight={50}
            onCloseClick={() => setInfowindowOpen(false)}
          >
            <p>
              ({trashData.id}) {trashData.name} - {address}<br/>
              {coords.lat} {coords.lng}
            </p>
            <img height="100" src="" />
          </InfoWindow>
        )}
      </APIProvider>
    </>
  );
}

export default CustomMarker;
