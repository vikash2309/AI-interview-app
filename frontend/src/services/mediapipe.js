import {
    FilesetResolver,
    FaceDetector
} from "@mediapipe/tasks-vision";

let faceDetector = null;

/**
 * Initializes the MediaPipe Face Detector.
 * This should only run once when the app starts.
 */
export const initializeFaceDetector = async () => {

    // If already initialized, return the existing detector
    if (faceDetector) {
        return faceDetector;
    }

    // Load MediaPipe vision files
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    // Create detector
    faceDetector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite"
        },
        runningMode: "VIDEO"
    });

    return faceDetector;
};