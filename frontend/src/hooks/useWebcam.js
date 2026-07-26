import { useState, useEffect, useRef } from "react";

const useWebcam = () => {

    const videoRef = useRef(null);

    const [stream, setStream] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // Start Camera
    useEffect(() => {

        const startCamera = async () => {

            try {

                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false
                });

                setStream(mediaStream);

            } catch (err) {

                console.log(err);

                if (err.name === "NotAllowedError") {
                    setError("Camera permission denied");
                }
                else if (err.name === "NotFoundError") {
                    setError("No webcam found");
                }
                else {
                    setError("Unable to access webcam");
                }

            } finally {

                setLoading(false);

            }

        };

        startCamera();

    }, []);

    // Attach stream to video
    useEffect(() => {

        if (videoRef.current && stream) {

            videoRef.current.srcObject = stream;

        }

    }, [stream]);

    // Cleanup
    useEffect(() => {

        return () => {

            if (stream) {

                stream.getTracks().forEach(track => track.stop());

            }

        };

    }, [stream]);

    return {
        videoRef,
        loading,
        error
    };

};

export default useWebcam;