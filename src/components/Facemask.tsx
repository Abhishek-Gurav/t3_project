import { useEffect, useRef, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import * as Facemesh from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors } from "@mediapipe/drawing_utils";
import Webcam from "react-webcam";
import { isTablet } from "react-device-detect";
import ghostMask from "../Images/Ghostmask.png";
import styles from "../styles/facemesh.module.css";

interface WindowDimension {
  winWidth: number;
  winHeight: number;
}

const Facemask = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [windowDimension, setWindowDimension] = useState<WindowDimension>({
    winWidth: typeof window !== "undefined" ? window.innerWidth : 0,
    winHeight: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const [isTab, setIsTab] = useState<boolean>(false);

  const onResults = (results: Facemesh.Results) => {
    const img = new Image();
    img.src = "https://www.svgrepo.com/show/62101/sword.svg";
    const { multiFaceLandmarks } = results;

    const videoWidth = webcamRef.current?.video?.videoWidth;
    const videoHeight = webcamRef.current?.video?.videoHeight;

    canvasRef.current?.setAttribute("width", `${videoWidth}`);
    canvasRef.current?.setAttribute("height", `${videoHeight}`);

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement?.getContext("2d");

    if (multiFaceLandmarks) {
      for (const landmarks of multiFaceLandmarks) {
        drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_TESSELATION, {
          color: "black",
          lineWidth: 15,
        });
        drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYE, {
          color: "#30FF30",
          lineWidth: 2,
        });
        drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYEBROW, {
          color: "red",
          lineWidth: 2,
        });
        drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYE, {
          color: "#30FF30",
          lineWidth: 2,
        });
        drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYEBROW, {
          color: "red",
          lineWidth: 2,
        });
        drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_FACE_OVAL, {
          color: "aqua",
          lineWidth: 2,
        });
      }
    }
  };

  useEffect(() => {
    setIsTab(isTablet);
    setWindowDimension({
      winWidth: typeof window !== "undefined" ? window.innerWidth : 0,
      winHeight: typeof window !== "undefined" ? window.innerHeight : 0,
    });
  }, [windowDimension]);

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file: string) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    faceMesh.setOptions({
      maxNumFaces: 4,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
      refineLandmarks: true,
    });

    faceMesh.onResults(onResults);

    if (webcamRef.current) {
      const camera = new Camera(webcamRef.current.video!, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current.video! });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  return (
    <center>
      <div className={styles.face__div} style={{ position: "relative" }}>
        <div className={styles.face__text}>
          <h1 className={styles.face__head}>Ghost Mask</h1>
          <p className={styles.face__para}>
            Have fun with friends by adding a ghost mask to your face and take snaps.
            <br />
            (Wait for some time to load the model)
          </p>
          <img width="100%" style={{ marginLeft: "-20px", marginTop: "-20px" }} src={ghostMask} alt="ghost" />
        </div>
        <div className={styles.face__canvas}>
          <Webcam
            ref={webcamRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              right: isTab ? "30vw" : "8vw",
              textAlign: "center",
              zIndex: 9,
              marginTop: "8vw",
              width: isTab ? "70vw" : "45vw",
              height: "auto",
              borderRadius: "10%",
              border: "10px solid black",
            }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              right: isTab ? "30vw" : "8vw",
              textAlign: "center",
              zIndex: 9,
              marginTop: "8vw",
              width: isTab ? "70vw" : "45vw",
              height: "auto",
            }}
          ></canvas>
        </div>
      </div>
    </center>
  );
};

export default Facemask;
