import { FiMessageSquare, FiCpu } from "react-icons/fi";

function FeedbackCard({ feedback }) {
  return (
    <div
      className="
      bg-gradient-to-br from-[#171923] via-[#1a1f2d] to-[#1d2230]
      border border-[#262b36]
      rounded-2xl sm:rounded-3xl
      p-5 sm:p-6 md:p-8
      mb-6
      overflow-hidden relative
    "
    >
      <div className="absolute -top-10 -right-10 w-44 sm:w-56 h-44 sm:h-56 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div
            className="
            w-11 h-11 sm:w-14 sm:h-14
            rounded-xl sm:rounded-2xl
            bg-cyan-500/10
            flex items-center justify-center
            text-cyan-400
            shrink-0
          "
          >
            <FiCpu size={22} className="sm:hidden" />
            <FiCpu size={26} className="hidden sm:block" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold"> Overall Feedback</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Personalized interview analysis
            </p>
          </div>
        </div>

        <div className="rounded-xl sm:rounded-2xl bg-[#11151d] border border-[#262b36] p-4 sm:p-6">
          <div className="flex gap-3 sm:gap-4">
            <div className="mt-1 text-cyan-400 shrink-0">
              <FiMessageSquare size={20} className="sm:hidden" />
              <FiMessageSquare size={22} className="hidden sm:block" />
            </div>

            <p
              className="
              text-gray-300 leading-7 sm:leading-8
              whitespace-pre-line break-words
              text-sm sm:text-base
            "
            >
              {feedback || "No feedback available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackCard;