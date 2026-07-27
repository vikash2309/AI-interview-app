import useWebcam from "../../hooks/useWebcam";

const WebcamPreview = ({
    videoRef,
    loading,
    error
}) => {
 

  if (loading) {
    return <p>Starting Camera...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      width="600"
      height="400"
      style={{
        border: "2px solid black",
        borderRadius: "10px",
           transform: "scaleX(-1)"
      }}
    />
  );
};

export default WebcamPreview;
