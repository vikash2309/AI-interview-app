const CameraStatus = ({
    faceDetected,
    faceCount,
    loading,
    error,
}) => {

    if (loading) {
        return (
            <p>Detecting face...</p>
        );
    }

    if (error) {
        return (
            <p style={{ color: "red" }}>
                {error}
            </p>
        );
    }

    if (!faceDetected) {
        return (
            <div>
                <h3>🔴 No Face Detected</h3>
            </div>
        );
    }

    if (faceCount > 1) {
        return (
            <div>
                <h3>⚠ Multiple Faces Detected</h3>
                <p>Faces: {faceCount}</p>
            </div>
        );
    }

    return (
        <div>
            <h3>🟢 Face Detected</h3>
            <p>Faces: {faceCount}</p>
        </div>
    );
};

export default CameraStatus;