import React from "react";
import { FiVideo, FiCheckCircle, FiZap } from "react-icons/fi";

const CameraFeedbackCard = ({ feedback }) => {
  if (!feedback) return null;

  return (
    <div
      className="
      bg-gradient-to-br from-[#171923] via-[#1a1f2d] to-[#1d2230]
      border border-[#262b36]
      rounded-2xl sm:rounded-3xl
      p-5 sm:p-6 md:p-8
      mb-6
      relative overflow-hidden
    "
    >
      <div className="absolute -top-10 -right-10 w-44 sm:w-56 h-44 sm:h-56 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div
            className="
            w-11 h-11 sm:w-14 sm:h-14
            rounded-xl sm:rounded-2xl
            bg-purple-500/10
            flex items-center justify-center
            text-purple-400
            shrink-0
          "
          >
            <FiVideo size={22} className="sm:hidden" />
            <FiVideo size={26} className="hidden sm:block" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Camera Feedback</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Analysis of your camera presence during the interview.
            </p>
          </div>
        </div>

        {/* Summary */}
        {feedback.summary && (
          <div className="rounded-xl sm:rounded-2xl bg-[#11151d] border border-[#262b36] p-4 sm:p-6 mb-5 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Summary</h3>
            <p className="text-gray-300 leading-6 sm:leading-7 text-sm sm:text-base break-words">
              {feedback.summary}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Strengths */}
          <div>
            <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-green-400 mb-3">
              <FiCheckCircle size={18} />
              Strengths
            </h3>

            <div className="space-y-2.5">
              {feedback.strengths?.map((item, index) => (
                <div
                  key={index}
                  className="
                  flex items-start gap-2.5
                  rounded-xl bg-[#11151d]
                  border border-[#262b36]
                  p-3
                  hover:border-green-500/30
                  transition-all duration-300
                "
                >
                  <span className="text-green-400 mt-0.5 shrink-0 text-sm">✅</span>
                  <span className="text-gray-300 text-sm sm:text-base break-words">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Improvements */}
          <div>
            <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-orange-400 mb-3">
              <FiZap size={18} />
              Improvements
            </h3>

            <div className="space-y-2.5">
              {feedback.improvements?.map((item, index) => (
                <div
                  key={index}
                  className="
                  flex items-start gap-2.5
                  rounded-xl bg-[#11151d]
                  border border-[#262b36]
                  p-3
                  hover:border-orange-500/30
                  transition-all duration-300
                "
                >
                  <span className="text-orange-400 mt-0.5 shrink-0 text-sm">💡</span>
                  <span className="text-gray-300 text-sm sm:text-base break-words">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraFeedbackCard;