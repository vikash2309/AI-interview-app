import {
    FilesetResolver,
    FaceDetector,
     FaceLandmarker
} from "@mediapipe/tasks-vision";

let faceDetector = null;
let landmarker = null;


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
export const initializeFaceLandmarker = async () => {

    if (landmarker) return landmarker;

    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    landmarker = await FaceLandmarker.createFromOptions(
        vision,
        {
            baseOptions: {
                modelAssetPath:
                    "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task"
            },

            runningMode: "VIDEO",

            numFaces: 1
        }
    );

    return landmarker;
};