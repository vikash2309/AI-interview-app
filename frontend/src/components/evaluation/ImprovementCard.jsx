import { FiTrendingUp, FiArrowUpRight } from "react-icons/fi";

function ImprovementCard({ improvements = [] }) {
  return (
    <div
      className="
      bg-gradient-to-br from-[#171923] via-[#1a1f2d] to-[#1d2230]
      border border-[#262b36]
      rounded-2xl sm:rounded-3xl
      p-5 sm:p-6
      h-full
    "
    >
      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div
          className="
          w-11 h-11 sm:w-12 sm:h-12
          rounded-xl
          bg-amber-500/10
          flex items-center justify-center
          text-amber-400 text-lg sm:text-xl
          shrink-0
        "
        >
          <FiTrendingUp />
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Areas To Improve</h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Small improvements for your next interview
          </p>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {improvements.length > 0 ? (
          improvements.map((improvement, index) => (
            <div
              key={index}
              className="
              flex items-start gap-3 sm:gap-4
              rounded-xl sm:rounded-2xl
              bg-[#11151d]
              border border-[#262b36]
              p-3.5 sm:p-4
              hover:border-amber-500/30
              transition-all duration-300
            "
            >
              <div className="mt-1 text-amber-400 shrink-0">
                <FiArrowUpRight size={18} className="sm:hidden" />
                <FiArrowUpRight size={20} className="hidden sm:block" />
              </div>

              <p className="text-gray-200 leading-relaxed break-words text-sm sm:text-base">
                {improvement}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-xl sm:rounded-2xl bg-[#11151d] border border-[#262b36] p-5 sm:p-6 text-center">
            <p className="text-gray-400 text-sm sm:text-base">
              Great job! No major improvements suggested.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImprovementCard;