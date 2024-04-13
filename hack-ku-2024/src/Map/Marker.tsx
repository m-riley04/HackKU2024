import { useState } from "react";

import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

function CustomMarker({ latitude, longitude }) {
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
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
          <img height="100" src="./images/leep.jpg" />
        </InfoWindow>
      )}
    </>
  );
}

export default CustomMarker;
