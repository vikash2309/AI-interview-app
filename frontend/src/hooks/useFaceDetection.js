import { useEffect, useState } from "react";
import { initializeFaceDetector } from "../services/mediapipe";

const useFaceDetection = (videoRef) => {

    const [faceDetected, setFaceDetected] = useState(false);
    const [faceCount, setFaceCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        let detector = null;
        let intervalId = null;

        const detectFaces = async () => {

            try {

                detector = await initializeFaceDetector();

                setLoading(false);

                intervalId = setInterval(() => {



                    if (!videoRef.current) {

                        return;
                    }



                    if (videoRef.current.readyState < 2) {

                        return;
                    }



                    const result = detector.detectForVideo(
                        videoRef.current,
                        performance.now()
                    );

                    const faces = result.detections || [];



                    setFaceCount(faces.length);
                    setFaceDetected(faces.length > 0);

                }, 200);

            } catch (err) {

                console.error(err);

                setError("Unable to detect faces.");

                setLoading(false);

            }

        };

        detectFaces();

        return () => {

            if (intervalId) {

                clearInterval(intervalId);

            }

        };

    }, [videoRef]);

    return {

        faceDetected,
        faceCount,
        loading,
        error

    };

};

export default useFaceDetection;