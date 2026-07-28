import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

import WebcamPreview from "../components/video/WebcamPreview";
import CameraStatus from "../components/video/CameraStatus";

import useWebcam from "../hooks/useWebcam";
import useFaceDetection from "../hooks/useFaceDetection";

import {
  FiClock,
  FiChevronRight,
  FiFlag,
  FiMic,
  FiMicOff,
  FiBriefcase,
  FiCheckCircle,
  FiAlertTriangle,
  FiVideo,
} from "react-icons/fi";

import {
  getInterviewById,
  saveAnswers,
  finishInterview,
  evaluateInterview,
} from "../utils/interviewApi";
import useDeepgram from "../hooks/useDeepgram";
import { speak, stopSpeaking } from "../services/speechService";

function InterviewRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getToken } = useAuth();
  const {
    videoRef,
    loading: webcamLoading,
    error: webcamError,
    stopWebcam,
  } = useWebcam();

  const {
    faceDetected,
    faceCount,
    headDirection,
    distanceStatus,
    facePosition,
    stopFaceDetection,
    getInterviewAnalytics,
  } = useFaceDetection(videoRef);

  const [interview, setInterview] = useState(null);
  const [finishing, setFinishing] = useState(false);

  const [loading, setLoading] = useState(true);
  const [aiSpeaking, setAiSpeaking] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState([]);

  const [currentAnswer, setCurrentAnswer] = useState("");
  const {
    finalTranscript,
    isListening,
    startListening,
    stopListening,
    clearTranscript,
  } = useDeepgram();

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const token = await getToken();
        const data = await getInterviewById(id, token);
        setInterview(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [id, getToken]);

  useEffect(() => {
    if (!interview) return;
    setTimeLeft(interview.duration * 60);
  }, [interview]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const saveCurrentAnswer = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = {
      question: interview.questions[currentQuestion],
      answer: finalTranscript.trim() ? finalTranscript : currentAnswer,
    };
    setAnswers(updatedAnswers);
    return updatedAnswers;
  };

  const nextQuestion = async () => {
    stopListening();
    const updatedAnswers = saveCurrentAnswer();
    const token = await getToken();

    await saveAnswers(interview._id, updatedAnswers, token);
    clearTranscript();

    if (currentQuestion < interview.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const savedAnswer = answers[currentQuestion]?.answer || "";
    setCurrentAnswer(savedAnswer);
  }, [currentQuestion, answers]);

  useEffect(() => {
    if (!interview) return;

    const question = interview.questions[currentQuestion];
    setAiSpeaking(true);

    speak(question, () => {
      setAiSpeaking(false);
    });

    return () => {
      stopSpeaking();
    };
  }, [currentQuestion, interview]);

  const handleFinish = async () => {
    try {
      setFinishing(true);

      stopListening();

      stopSpeaking();
      const cameraAnalytics = getInterviewAnalytics();
      stopFaceDetection();
      stopWebcam();
      const token = await getToken();

      const updatedAnswers = saveCurrentAnswer();
      await saveAnswers(interview._id, updatedAnswers, token);
      await finishInterview(interview._id,cameraAnalytics, token);
      await evaluateInterview(interview._id, token);

      navigate(`/evaluation/${interview._id}`, {
        replace: true,
      });
    } catch (error) {
      console.log(error);
      setFinishing(false);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to generate interview report. Please try again.",
      );
      navigate(-1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm font-medium">
            Loading Interview...
          </p>
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="min-h-screen bg-[#0f1117] text-white flex items-center justify-center p-4">
        Interview not found
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / interview.questionCount) * 100;
  const isLastQuestion = currentQuestion === interview.questions.length - 1;
  const isTimeLow = timeLeft <= 60 && timeLeft > 0;

  const proctoringWarnings = [
    !faceDetected && {
      key: "no-face",
      tone: "danger",
      message: "Face not detected. Stay in front of the camera.",
    },
    faceCount > 1 && {
      key: "multi-face",
      tone: "danger",
      message: "Multiple faces detected. Only you should be visible.",
    },
    headDirection !== "Looking Forward" && {
      key: "head-direction",
      tone: "warning",
      message: `${headDirection}. Please look toward the camera.`,
    },
    distanceStatus !== "Optimal" && {
      key: "distance",
      tone: "warning",
      message: `${distanceStatus}. Adjust your distance from the camera.`,
    },
    facePosition !== "Centered" && {
      key: "position",
      tone: "warning",
      message: facePosition,
    },
  ].filter(Boolean);

  return (
    <div className="min-h-screen lg:h-screen bg-[#0f1117] text-white flex flex-col overflow-x-hidden">
      <div className="flex-1 min-h-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-28 lg:pb-4 flex flex-col overflow-y-auto lg:overflow-hidden">
        {/* Header */}
        <div className="shrink-0 bg-[#171923] border border-[#262b36] rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex items-center gap-3">
              <div className="hidden sm:flex w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 items-center justify-center text-cyan-400 shrink-0">
                <FiBriefcase size={18} />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg md:text-xl font-bold truncate">
                  {interview.company}
                </h1>
                <p className="text-gray-400 text-xs sm:text-sm truncate">
                  {interview.role}
                </p>
              </div>
            </div>

            <div
              className={`shrink-0 flex items-center gap-2 border rounded-xl px-3 sm:px-4 py-2 transition-colors ${
                isTimeLow
                  ? "bg-red-500/10 border-red-500/30"
                  : "bg-cyan-500/10 border-cyan-500/20"
              }`}
            >
              <FiClock
                className={isTimeLow ? "text-red-400" : "text-cyan-400"}
              />
              <span
                className={`text-sm sm:text-base font-bold tabular-nums ${
                  isTimeLow ? "text-red-400 animate-pulse" : "text-cyan-400"
                }`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 sm:mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1.5 font-medium">
              <span>
                Question {currentQuestion + 1} of {interview.questionCount}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-[#222734] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] lg:grid-rows-[auto_1fr] gap-4 mt-4 flex-1 min-h-0">
          {/* Left Side: Question + Recording */}
          <div className="flex flex-col gap-4 min-w-0 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:min-h-0">
            {/* Question Card */}
            <div className="shrink-0 bg-gradient-to-br from-[#171923] via-[#1a1f2d] to-[#1d2230] border border-[#262b36] rounded-2xl p-4 sm:p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <span className="inline-flex px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold mb-3">
                  Question {currentQuestion + 1}
                </span>

                <h2 className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-white break-words">
                  {interview.questions[currentQuestion]}
                </h2>
              </div>
            </div>

            {/* Recording / Answer Panel */}
            <div className="flex-1 min-h-[260px] rounded-2xl bg-[#171923] border border-[#262b36] p-6 flex flex-col items-center justify-center gap-4">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl transition-all duration-300 ${
                  isListening
                    ? "bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 animate-pulse scale-105"
                    : "bg-gray-800 text-gray-500 border-2 border-transparent"
                }`}
              >
                {isListening ? <FiMic /> : <FiMicOff />}
              </div>

              <div className="text-center">
                <h3 className="text-base sm:text-lg font-semibold">
                  {isListening ? "Listening..." : "Microphone Paused"}
                </h3>
                <p className="mt-1 text-gray-400 text-xs sm:text-sm max-w-sm">
                  {aiSpeaking
                    ? "AI is asking the question..."
                    : isListening
                      ? "Speak clearly into your microphone."
                      : "Click Start Answer when you're ready."}
                </p>
              </div>

              <button
                onClick={startListening}
                disabled={isListening || aiSpeaking}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-400 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-black text-sm sm:text-base font-bold transition"
              >
                <FiMic />
                {aiSpeaking
                  ? "AI Speaking..."
                  : isListening
                    ? "Listening..."
                    : "Start Answer"}
              </button>
            </div>

            {/* Mobile/Tablet Next Button */}
            <div className="lg:hidden shrink-0 mt-1">
              <button
                onClick={nextQuestion}
                disabled={isLastQuestion || finishing}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 active:bg-cyan-400 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next Question
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Side: Camera Preview + Proctoring Warnings */}
          <div className="flex flex-col gap-3 min-w-0 lg:col-start-2 lg:row-start-1">
            <div className="bg-[#171923] border border-[#262b36] rounded-2xl p-3.5 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <FiVideo size={14} className="text-cyan-400" />
                  Your Camera
                </span>
              </div>

              {/* Camera Frame */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-[#262b36]">
                <div className="absolute inset-0 [&>*]:w-full [&>*]:h-full [&>video]:object-cover [&>img]:object-cover">
                  <WebcamPreview
                    videoRef={videoRef}
                    loading={webcamLoading}
                    error={webcamError}
                  />
                </div>
              </div>

              <CameraStatus faceDetected={faceDetected} faceCount={faceCount} />

              {/* Proctoring Warnings (Fully visible flex list without height clipping) */}
              {proctoringWarnings.length > 0 && (
                <div className="flex flex-col gap-2 pt-1 border-t border-[#262b36]/60">
                  {proctoringWarnings.map((warning) => (
                    <div
                      key={warning.key}
                      className={`flex items-start gap-2.5 rounded-xl border p-2.5 text-xs leading-relaxed transition-all ${
                        warning.tone === "danger"
                          ? "bg-red-500/10 border-red-500/30 text-red-300"
                          : "bg-yellow-500/10 border-yellow-500/30 text-yellow-300"
                      }`}
                    >
                      <FiAlertTriangle className="shrink-0 mt-0.5 text-sm" />
                      <span>{warning.message}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Sidebar: Actions */}
          <div className="hidden lg:flex flex-col lg:col-start-2 lg:row-start-2 gap-3 justify-end">
            <div className="bg-[#171923] border border-[#262b36] rounded-2xl p-4 space-y-3">
              <button
                onClick={nextQuestion}
                disabled={isLastQuestion || finishing}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500 text-black text-sm font-bold hover:bg-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Question
                <FiChevronRight size={18} />
              </button>

              <button
                onClick={handleFinish}
                disabled={finishing}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/90 hover:bg-red-500 text-white text-sm font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiFlag />
                {finishing ? "Generating Report..." : "Finish Interview"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Mobile/Tablet Action Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#171923]/95 backdrop-blur-md border-t border-[#262b36] px-4 py-3 z-40">
        <button
          onClick={handleFinish}
          disabled={finishing}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-red-500/90 hover:bg-red-500 text-white font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiFlag />
          {finishing ? "Generating Report..." : "Finish Interview"}
        </button>
      </div>

      {/* Generating Report Overlay */}
      {finishing && (
        <div className="fixed inset-0 z-[999] bg-[#0f1117]/95 backdrop-blur-md flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin" />
            <h2 className="mt-8 text-2xl sm:text-3xl font-bold text-white">
              Generating Report
            </h2>
            <p className="mt-3 text-gray-400 text-sm leading-relaxed">
              Our AI is analyzing your interview, evaluating your answers, and
              preparing a personalized report.
            </p>
            <div className="mt-6 h-2 rounded-full bg-[#252b39] overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 animate-pulse" />
            </div>
            <p className="mt-4 text-xs text-gray-500">
              This usually takes 10–30 seconds.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterviewRoom;
