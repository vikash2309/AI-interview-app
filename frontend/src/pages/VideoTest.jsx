import WebcamPreview from "../components/video/WebcamPreview";
import CameraStatus from "../components/video/CameraStatus";

import useWebcam from "../hooks/useWebcam";
import useFaceDetection from "../hooks/useFaceDetection";

const VideoTest = () => {

   const {
    videoRef,
    loading,
    error
} = useWebcam();

const {
    faceDetected,
    faceCount
} = useFaceDetection(videoRef);
    return (

        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
                marginTop: "30px"
            }}
        >

            <h1>Video Test</h1>

              <WebcamPreview
            videoRef={videoRef}
            loading={loading}
            error={error}
        />

        <CameraStatus
            faceDetected={faceDetected}
            faceCount={faceCount}
        />

        </div>

    );

};

export default VideoTest;