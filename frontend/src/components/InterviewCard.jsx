import { Link }
from "react-router-dom";


function InterviewCard({
  interview,
}) {
  const getStatusColor = (
    status
  ) => {
    switch (
      status?.toLowerCase()
    ) {
      case "completed":
        return "bg-green-500/10 text-green-400 border-green-500/20";

      case "in-progress":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";

      default:
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    }
  };

  return (
    <Link
  to={`/interviews/${interview._id}`}

      className="
      group
      relative
      overflow-hidden
      bg-gradient-to-br
      from-[#171923]
      via-[#1a1f2d]
      to-[#1f2533]
      border
      border-[#262b36]
      rounded-3xl
      p-5
      transition-all
      duration-300
      hover:border-cyan-500/30
      hover:-translate-y-1
      hover:shadow-xl
      hover:shadow-cyan-500/10
      cursor-pointer
      h-full
      flex
      flex-col
    "
    >
      {/* Glow */}
      <div
        className="
        absolute
        -top-10
        -right-10
        h-32
        w-32
        rounded-full
        bg-cyan-500/10
        blur-3xl
        opacity-0
        group-hover:opacity-100
        transition-all
        duration-500
        pointer-events-none
      "
      />

      {/* Header */}
      <div
        className="
        relative
        z-10
        flex
        items-start
        justify-between
        gap-3
      "
      >
        <div className="flex-1 min-w-0">
          <h3
            className="
            text-xl
            font-bold
            text-white
            break-words
            leading-tight
            group-hover:text-cyan-400
            transition-colors
          "
          >
            {interview.company}
          </h3>

          <p
            className="
            text-gray-400
            mt-2
            break-words
          "
          >
            {interview.role}
          </p>
        </div>

        <span
          className={`
          shrink-0
          px-3
          py-1
          rounded-full
          text-xs
          font-medium
          border
          whitespace-nowrap
          ${getStatusColor(
            interview.status
          )}
        `}
        >
          {interview.status}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-5">
        <span
          className="
          px-3
          py-1
          rounded-full
          text-xs
          font-medium
          bg-cyan-500/10
          text-cyan-300
          border
          border-cyan-500/20
        "
        >
          {interview.difficulty}
        </span>

        <span
          className="
          px-3
          py-1
          rounded-full
          text-xs
          font-medium
          bg-blue-500/10
          text-blue-300
          border
          border-blue-500/20
        "
        >
          {interview.duration} mins
        </span>

        <span
          className="
          px-3
          py-1
          rounded-full
          text-xs
          font-medium
          bg-purple-500/10
          text-purple-300
          border
          border-purple-500/20
        "
        >
          {interview.interviewType}
        </span>
      </div>

      {/* Questions Count */}
      <div
        className="
        mt-4
        px-4
        py-3
        rounded-xl
        bg-[#10141d]
        border
        border-[#262b36]
      "
      >
        <p className="text-sm text-gray-400">
          Questions Generated
        </p>

        <h4
          className="
          text-lg
          font-semibold
          text-cyan-400
          mt-1
        "
        >
         {interview.questionCount || 0}
        </h4>
      </div>

      <div className="flex-1" />

      {/* Footer */}
      <div
        className="
        mt-5
        pt-4
        border-t
        border-[#262b36]
        flex
        items-center
        justify-between
      "
      >
        <div>
          <p
            className="
            text-xs
            uppercase
            tracking-wider
            text-gray-500
          "
          >
            Interview Session
          </p>

          <p
            className="
            text-sm
            text-gray-300
            mt-1
          "
          >
            Ready for practice
          </p>
        </div>

        <div
          className="
          flex
          items-center
          gap-2
          text-cyan-400
          font-medium
          text-sm

          opacity-100

          lg:opacity-0
          lg:translate-x-2

          lg:group-hover:opacity-100
          lg:group-hover:translate-x-0

          transition-all
          duration-300
        "
        >
          View Details
          <span>→</span>
        </div>
      </div>
    </Link>
  );
}

export default InterviewCard;