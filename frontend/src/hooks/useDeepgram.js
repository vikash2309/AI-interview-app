import { useEffect, useRef, useState } from "react";
import { getDeepgramToken } from "../services/deepgramService";

export default function useDeepgram() {
    // ===============================
    // States
    // ===============================

    const [liveTranscript, setLiveTranscript] = useState("");
    const [finalTranscript, setFinalTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);

    // ===============================
    // Refs
    // ===============================

    const socketRef = useRef(null);
    const streamRef = useRef(null);
    const mediaRecorderRef = useRef(null);

    // ===============================
    // Start Listening
    // ===============================

    const startListening = async () => {
        try {
            if (isListening) return;

            const token = await getDeepgramToken();

            const ws = new WebSocket(
                "wss://api.deepgram.com/v1/listen?model=nova-3&language=en-IN&smart_format=true&punctuate=true&interim_results=true&endpointing=500&filler_words=false",
                ["Bearer", token]
            );

            socketRef.current = ws;

            ws.onopen = async () => {
                console.log("✅ Deepgram Connected");

                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        channelCount: 1,
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true,

                        sampleRate: 48000,
                    },
                });

                streamRef.current = stream;

                const mimeType = MediaRecorder.isTypeSupported(
                    "audio/webm;codecs=opus"
                )
                    ? "audio/webm;codecs=opus"
                    : "audio/webm";

                const recorder = new MediaRecorder(stream, {
                    mimeType,
                });

                mediaRecorderRef.current = recorder;

                recorder.ondataavailable = (event) => {
                    if (
                        event.data.size > 0 &&
                        ws.readyState === WebSocket.OPEN
                    ) {
                        ws.send(event.data);
                    }
                };

                recorder.start(200);;

                setIsListening(true);

                console.log("🎤 Listening Started");
            };

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data.type !== "Results") return;
                const confidence =
                    data.channel?.alternatives?.[0]?.confidence;

                console.log(confidence);

                const transcript =
                    data.channel?.alternatives?.[0]?.transcript || "";

                if (!transcript) return;

                setLiveTranscript(transcript);

                if (data.is_final) {
                    setFinalTranscript((prev) => {
                        if (!prev) return transcript;

                        return prev + " " + transcript;
                    });
                }
            };

            ws.onerror = (err) => {
                console.log(err);
            };

            ws.onclose = () => {
                console.log("🔴 Deepgram Closed");
                setIsListening(false);
            };
        } catch (err) {
            console.log(err);
        }
    };

    // ===============================
    // Stop Listening
    // ===============================

    const stopListening = () => {
        if (
            mediaRecorderRef.current &&
            mediaRecorderRef.current.state !== "inactive"
        ) {
            mediaRecorderRef.current.stop();
        }

        if (streamRef.current) {
            streamRef.current
                .getTracks()
                .forEach((track) => track.stop());
        }

        if (socketRef.current) {
            socketRef.current.close();
        }

        setIsListening(false);
    };

    // ===============================
    // Clear Transcript
    // ===============================

    const clearTranscript = () => {
        setLiveTranscript("");
        setFinalTranscript("");
    };

    // ===============================
    // Cleanup
    // ===============================

    useEffect(() => {
        return () => {
            stopListening();
        };
    }, []);

    return {
        liveTranscript,
        finalTranscript,
        isListening,
        startListening,
        stopListening,
        clearTranscript,
    };
}