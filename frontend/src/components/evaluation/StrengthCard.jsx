import {
  FiCheckCircle,
  FiTrendingUp,
} from "react-icons/fi";

function StrengthCard({ strengths = [] }) {
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
          bg-emerald-500/10
          flex
          items-center
          justify-center
          text-emerald-400
          text-xl
        "
        >
          <FiTrendingUp />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Strengths
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Areas where you performed well
          </p>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {strengths.length > 0 ? (
          strengths.map(
            (strength, index) => (
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
                hover:border-emerald-500/30
                transition-all
                duration-300
              "
              >
                <div
                  className="
                  mt-1
                  text-emerald-400
                  shrink-0
                "
                >
                  <FiCheckCircle size={20} />
                </div>

                <p
                  className="
                  text-gray-200
                  leading-relaxed
                  break-words
                "
                >
                  {strength}
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
              No strengths available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StrengthCard;