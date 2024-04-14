import { useEffect, useState } from "react";
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  useMapsLibrary,
  Pin,
} from "@vis.gl/react-google-maps";
import './Marker.scss';

const APP_URL = "https://hackku2024-lz3sc7ogqa-uc.a.run.app";

function CustomMarker({ id }: { id: number }) {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [trashData, setTrashData] = useState({ name: '', id: -1  })
  const [coords, setCoords] = useState({ lat: 0.0, lng: 0.0 });
  const [address, setAddress] = useState("Placeholder");

  const geocodingLibrary = useMapsLibrary("geocoding");

  const glyphColors = [
    "#f38ba8",
    "#fab387",
    "#f9e2af",
    "#a6e3a1",
    "#74c7ec",
    "#b4befe",
    "#cba6f7",
    "#f5c2e7",
  ];

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
        <AdvancedMarker ref={markerRef} onClick={() => setInfowindowOpen(true)} position={coords}>
          <Pin background={glyphColors[trashData.id]} glyphColor="#222"/>
        </AdvancedMarker>

        {infowindowOpen && (
          <InfoWindow
            //className="infowindow"
            anchor={marker}
            disableAutoPan={true}
            onCloseClick={() => setInfowindowOpen(false)}
          >
            <p> {trashData.name} - {address} </p>
            <div className="gm-image-holder">
              <img src="https://static01.nyt.com/images/2018/01/24/world/24Lebanon1/merlin_132751718_77a902ed-e0aa-475e-83cc-f8707b004f80-superJumbo.jpg" />
            </div>
          </InfoWindow>
      )}
      </APIProvider>
    </>
  );
}

export default CustomMarker;
