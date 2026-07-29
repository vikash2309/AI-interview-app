import { useAuth } from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";

import { FiArrowLeft, FiPlusCircle } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getInterviewById } from "../utils/interviewApi";
import ScoreCard from "../components/evaluation/ScoreCard";
import InterviewInfo from "../components/evaluation/InterviewInfo";
import { useParams } from "react-router-dom";
import StrengthCard from "../components/evaluation/StrengthCard";
import ImprovementCard from "../components/evaluation/ImprovementCard";
import FeedbackCard from "../components/evaluation/FeedbackCard";
import AnalyticsCard from "../components/evaluation/AnalyticsCard";
import CameraAnalyticsCard from "../components/evaluation/CameraAnalyticsCard";
import CameraFeedbackCard from "../components/evaluation/CameraFeedbackCard";

const EvaluationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const token = await getToken();
        const res = await getInterviewById(id, token);
        setInterview(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInterview();
  }, [id, getToken]);

  if (loading) {
    return (
      <div className="h-screen bg-[#0f1117] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <div
            className="
            w-10 h-10 sm:w-12 sm:h-12
            border-4 border-cyan-500 border-t-transparent
            rounded-full animate-spin
          "
          />
          <p className="text-gray-400 text-sm sm:text-base">Loading Interview...</p>
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="h-screen bg-[#0f1117] text-white flex items-center justify-center px-4 text-center">
        Interview not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        {/* Header */}
        <div
          className="
          flex flex-col md:flex-row
          md:items-center md:justify-between
          gap-4 sm:gap-5
          mb-6 sm:mb-8
        "
        >
          <div>
            <button
              onClick={() => navigate(-1)}
              className="
              flex items-center gap-2
              text-sm sm:text-base
              text-gray-400 hover:text-cyan-400
              transition mb-3 sm:mb-4
            "
            >
              <FiArrowLeft />
              Back
            </button>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words">
              AI Interview Report
            </h1>

            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              Detailed AI-powered interview analysis.
            </p>
          </div>
        </div>

        <ScoreCard score={interview.score} />
        <InterviewInfo interview={interview} />
        <AnalyticsCard analytics={interview.analytics} />
       

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-6">
          <StrengthCard strengths={interview.feedback?.strengths} />
          <ImprovementCard improvements={interview.feedback?.improvements} />
        </div>

        
         <CameraAnalyticsCard analytics={interview.cameraAnalytics} />
        <CameraFeedbackCard feedback={interview.cameraFeedback} />
        <FeedbackCard feedback={interview.feedback?.overallFeedback} />

        <div className="mt-8 flex justify-center px-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="
            w-full sm:w-auto
            flex items-center justify-center gap-3
            px-6 sm:px-8 py-3.5 sm:py-4
            rounded-2xl
            bg-gradient-to-r from-cyan-500 to-blue-500
            hover:from-cyan-400 hover:to-blue-400
            text-black font-semibold
            text-sm sm:text-base
            transition
          "
          >
            <FiPlusCircle />
            Create Another Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationPage;