import { useEffect, useState, useRef } from "react";

import {
    initializeFaceDetector,
    initializeFaceLandmarker
} from "../services/mediapipe";

const initialAnalytics = {
    totalFrames: 0,

    faceVisibleFrames: 0,
    faceMissingFrames: 0,

    forwardFrames: 0,
    leftFrames: 0,
    rightFrames: 0,
    upFrames: 0,
    downFrames: 0,

    centeredFrames: 0,
    offCenterFrames: 0,

    optimalDistanceFrames: 0,
    tooCloseFrames: 0,
    tooFarFrames: 0,
};


const useFaceDetection = (videoRef) => {

    const [faceDetected, setFaceDetected] = useState(false);
    const [faceCount, setFaceCount] = useState(0);

    const [headDirection, setHeadDirection] = useState("Unknown");
    const [distanceStatus, setDistanceStatus] = useState("Unknown");
    const [facePosition, setFacePosition] = useState("Centered");

    const [yaw, setYaw] = useState(0);//left right movement of face
    const [pitch, setPitch] = useState(0);//up/down movement of face

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const analyticsRef = useRef(structuredClone(initialAnalytics));
    const intervalRef = useRef(null);
    const updateAnalytics = ({
        faceDetected,
        headDirection,
        facePosition,
        distanceStatus,
    }) => {

        const stats = analyticsRef.current;

        stats.totalFrames++;

        if (faceDetected) {
            stats.faceVisibleFrames++;
        } else {
            stats.faceMissingFrames++;
        }

        switch (headDirection) {

            case "Looking Forward":
                stats.forwardFrames++;
                break;

            case "Looking Left":
                stats.leftFrames++;
                break;

            case "Looking Right":
                stats.rightFrames++;
                break;

            case "Looking Up":
                stats.upFrames++;
                break;

            case "Looking Down":
                stats.downFrames++;
                break;
        }

        if (facePosition === "Centered") {
            stats.centeredFrames++;
        } else {
            stats.offCenterFrames++;
        }

        switch (distanceStatus) {

            case "Optimal":
                stats.optimalDistanceFrames++;
                break;

            case "Too Close":
                stats.tooCloseFrames++;
                break;

            case "Too Far":
                stats.tooFarFrames++;
                break;
        }

    };
    const getInterviewAnalytics = () => {
        const stats = analyticsRef.current;

        const total = Math.max(stats.totalFrames, 1);

        const faceVisibility =
            (stats.faceVisibleFrames / total) * 100;

        const attention =
            (stats.forwardFrames / total) * 100;

        const centered =
            (stats.centeredFrames / total) * 100;

        const optimalDistance =
            (stats.optimalDistanceFrames / total) * 100;

        const overallCameraScore =
            (
                faceVisibility +
                attention +
                centered +
                optimalDistance
            ) / 4;

        return {

            faceVisibility: Number(faceVisibility.toFixed(1)),

            attention: Number(attention.toFixed(1)),

            centered: Number(centered.toFixed(1)),

            optimalDistance: Number(optimalDistance.toFixed(1)),

            overallCameraScore: Number(
                overallCameraScore.toFixed(1)
            ),

            raw: structuredClone(stats),
        };
    };


    useEffect(() => {

        let detector = null;
        let landmarker = null;


        const detectFaces = async () => {

            try {

                detector = await initializeFaceDetector();
                landmarker = await initializeFaceLandmarker();

                setLoading(false);

                intervalRef.current = setInterval(() => {



                    if (!videoRef.current) {

                        return;
                    }
                    if (!videoRef.current.srcObject) {
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

                    const landmarkResult = landmarker.detectForVideo(
                        videoRef.current,
                        performance.now()
                    );
                    const faceLandmarks = landmarkResult.faceLandmarks || [];

                    if (faceLandmarks.length === 0) {

                        updateAnalytics({
                            faceDetected: false,
                            headDirection: "Unknown",
                            facePosition: "Unknown",
                            distanceStatus: "Unknown",
                        });

                        return;
                    }

                    const landmarks = faceLandmarks[0];

                    //requiired landmarks
                    const nose = landmarks[1];
                    const leftEye = landmarks[33];
                    const rightEye = landmarks[263];
                    const eyeDistance = Math.abs(rightEye.x - leftEye.x);

                    //setting  eye distance status
                    let currentDistanceStatus;

                    if (eyeDistance < 0.10) {

                        currentDistanceStatus = "Too Far";

                    }
                    else if (eyeDistance > 0.22) {

                        currentDistanceStatus = "Too Close";

                    }
                    else {

                        currentDistanceStatus = "Optimal";

                    }

                    setDistanceStatus(currentDistanceStatus);

                    //centered face detection logic
                    const centerX = nose.x;
                    const centerY = nose.y;

                    let currentFacePosition = "Centered";

                    if (centerX < 0.40) {
                        currentFacePosition = "Move camera Right";
                    }
                    else if (centerX > 0.60) {
                        currentFacePosition = "Move camera Left";
                    }
                    else if (centerY < 0.35) {
                        currentFacePosition = "Move camera Up";
                    }
                    else if (centerY > 0.65) {
                        currentFacePosition = "Move camera Down";
                    }

                    setFacePosition(currentFacePosition);




                    //setting yaw-->left and right
                    const eyeCenterX = (leftEye.x + rightEye.x) / 2;
                    const yawOffset = nose.x - eyeCenterX;

                    setYaw(yawOffset);
                    //setting pitch-->up and down
                    const eyeCenterY = (leftEye.y + rightEye.y) / 2;
                    const pitchOffset = nose.y - eyeCenterY;

                    setPitch(pitchOffset);


                    // setting head direction
                    const YAW_THRESHOLD = 0.04;
                    const PITCH_UP_THRESHOLD = 0.07;
                    const PITCH_DOWN_THRESHOLD = 0.14;
                    let currentHeadDirection = "Looking Forward";

                    if (yawOffset > YAW_THRESHOLD) {
                        currentHeadDirection = "Looking Left";
                    }
                    else if (yawOffset < -YAW_THRESHOLD) {
                        currentHeadDirection = "Looking Right";
                    }
                    else if (pitchOffset < PITCH_UP_THRESHOLD) {
                        currentHeadDirection = "Looking Up";
                    }
                    else if (pitchOffset > PITCH_DOWN_THRESHOLD) {
                        currentHeadDirection = "Looking Down";
                    }

                    setHeadDirection(currentHeadDirection);

                    updateAnalytics({
                        faceDetected: faces.length > 0,
                        headDirection: currentHeadDirection,
                        facePosition: currentFacePosition,
                        distanceStatus: currentDistanceStatus,
                    });

                }, 200);

            } catch (err) {

                console.error(err);

                setError("Unable to detect faces.");

                setLoading(false);

            }

        };

        detectFaces();

        return () => {
    if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }
};

    }, [videoRef]);

   const stopFaceDetection = () => {
    if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }
};

    return {
        faceDetected,
        faceCount,
        facePosition,

        headDirection,
        distanceStatus,
        yaw,
        pitch,
        getInterviewAnalytics,

        loading,
        error,
        stopFaceDetection,
    };
};

export default useFaceDetection;