import React from "react";
import { FiCamera } from "react-icons/fi";

const CameraAnalyticsCard = ({ analytics }) => {
  if (!analytics) return null;

  const metrics = [
    { title: "Overall Camera Score", value: analytics.overallCameraScore, color: "bg-cyan-500" },
    { title: "Face Visibility", value: analytics.faceVisibility, color: "bg-green-500" },
    { title: "Attention", value: analytics.attention, color: "bg-purple-500" },
    { title: "Centered", value: analytics.centered, color: "bg-orange-500" },
    { title: "Optimal Distance", value: analytics.optimalDistance, color: "bg-pink-500" },
  ];

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
      <div className="absolute -top-12 -right-12 w-48 sm:w-60 h-48 sm:h-60 rounded-full bg-purple-500/10 blur-3xl" />

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
            <FiCamera size={22} className="sm:hidden" />
            <FiCamera size={26} className="hidden sm:block" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Camera Analytics</h2>
            <p className="text-gray-400 mt-1 text-xs sm:text-sm">
              Camera performance during the interview.
            </p>
          </div>
        </div>

        <div className="space-y-5 sm:space-y-6">
          {metrics.map((metric) => (
            <div key={metric.title}>
              <div className="flex justify-between mb-2 gap-2">
                <span className="text-gray-300 font-medium text-sm sm:text-base">
                  {metric.title}
                </span>
                <span className="font-semibold text-sm sm:text-base shrink-0">
                  {metric.value}%
                </span>
              </div>

              <div className="h-2.5 sm:h-3 rounded-full bg-[#232734] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${metric.color}`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CameraAnalyticsCard;