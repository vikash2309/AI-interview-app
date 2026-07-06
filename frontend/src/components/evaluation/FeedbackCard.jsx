import {
  FiMessageSquare,
  FiCpu,
} from "react-icons/fi";

function FeedbackCard({
  feedback,
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
      md:p-8
      mb-6
      overflow-hidden
      relative
    "
    >
      {/* Glow */}
      <div
        className="
        absolute
        -top-10
        -right-10
        w-56
        h-56
        bg-cyan-500/10
        rounded-full
        blur-3xl
      "
      />

      <div className="relative z-10">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="
            w-14
            h-14
            rounded-2xl
            bg-cyan-500/10
            flex
            items-center
            justify-center
            text-cyan-400
          "
          >
            <FiCpu size={26} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
               Feedback
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Personalized interview analysis
            </p>
          </div>
        </div>

        {/* Feedback */}
        <div
          className="
          rounded-2xl
          bg-[#11151d]
          border
          border-[#262b36]
          p-6
        "
        >
          <div className="flex gap-4">

            <div className="mt-1 text-cyan-400 shrink-0">
              <FiMessageSquare size={22} />
            </div>

            <p
              className="
              text-gray-300
              leading-8
              whitespace-pre-line
              break-words
              text-[15px]
              md:text-base
            "
            >
              {feedback ||
                "No feedback available."}
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default FeedbackCard;