import {
  FiTrendingUp,
  FiArrowUpRight,
} from "react-icons/fi";

function ImprovementCard({
  improvements = [],
}) {
  return (
    <div
      className="
      bg-gradient-to-br
      from-[#171923]
      via-[#1a1f2d]
      to-[#1d2230]
      border
      border-[#262b36]
      rounded-3xl
      p-6
      h-full
    "
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className="
          w-12
          h-12
          rounded-xl
          bg-amber-500/10
          flex
          items-center
          justify-center
          text-amber-400
          text-xl
        "
        >
          <FiTrendingUp />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Areas To Improve
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Small improvements for your next interview
          </p>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {improvements.length > 0 ? (
          improvements.map(
            (
              improvement,
              index
            ) => (
              <div
                key={index}
                className="
                flex
                items-start
                gap-4
                rounded-2xl
                bg-[#11151d]
                border
                border-[#262b36]
                p-4
                hover:border-amber-500/30
                transition-all
                duration-300
              "
              >
                <div
                  className="
                  mt-1
                  text-amber-400
                  shrink-0
                "
                >
                  <FiArrowUpRight
                    size={20}
                  />
                </div>

                <p
                  className="
                  text-gray-200
                  leading-relaxed
                  break-words
                "
                >
                  {improvement}
                </p>
              </div>
            )
          )
        ) : (
          <div
            className="
            rounded-2xl
            bg-[#11151d]
            border
            border-[#262b36]
            p-6
            text-center
          "
          >
            <p className="text-gray-400">
              Great job! No major
              improvements suggested.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImprovementCard;