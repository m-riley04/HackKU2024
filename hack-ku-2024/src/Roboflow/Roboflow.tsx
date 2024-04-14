/*
import { useRef, useEffect, useState } from "react";

const PUBLISHABLE_ROBOFLOW_API_KEY = "YOUR_PUBLISHABLE_ROBOFLOW_API_KEY";
const PROJECT_URL = "YOUR_PROJECT_URL";
const MODEL_VERSION = "YOUR_MODEL_VERSION";

const Roboflow = (props) => {

  const [inferRunning, setInferRunning] = useState(true);

  const startInfer = () => {
    setInferRunning(true);
    window.roboflow
      .auth({
        publishable_key: PUBLISHABLE_ROBOFLOW_API_KEY,
      })
      .load({
        model: PROJECT_URL,
        version: MODEL_VERSION,
        onMetadata: function (m) {
          console.log("model loaded");
        },
      })
      .then((model) => {
        setInterval(() => {
          if (inferRunning) detect(model);
        }, 10);
      });
  };

  useEffect(startInfer, []);

  // const stopInfer = () => {
  //     inferRunning = false;
  //     if (model) model.teardown();
  // };

  const detect = async (model) => {
    // Check data is available
      const detections = await model.detect(webcamRef.current.video);
  };

  return (
    <>
      
    </>
  );
};

export default Roboflow;*/