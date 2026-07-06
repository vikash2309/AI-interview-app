import {
  FiBriefcase,
  FiLayers,
  FiTarget,
  FiCheckCircle,
  FiHelpCircle,
  FiClock,
  FiCalendar,
} from "react-icons/fi";

function InterviewInfo({ interview }) {
  const info = [
    {
      title: "Company",
      value: interview.company,
      icon: <FiBriefcase />,
    },
    {
      title: "Role",
      value: interview.role,
      icon: <FiLayers />,
    },
    {
      title: "Difficulty",
      value: interview.difficulty,
      icon: <FiTarget />,
    },
    {
      title: "Interview Type",
      value: interview.interviewType,
      icon: <FiCheckCircle />,
    },
    {
      title: "Questions",
      value: interview.questionCount,
      icon: <FiHelpCircle />,
    },
    {
      title: "Duration",
      value: `${interview.duration} Minutes`,
      icon: <FiClock />,
    },
    {
      title: "Status",
      value: interview.status,
      icon: <FiCheckCircle />,
    },
    {
      title: "Created",
      value: new Date(interview.createdAt).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
}),
      icon: <FiCalendar />,
    },
  ];

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
    "
    >
      <div className="flex items-center gap-3 mb-8">
        <div
          className="
          w-12
          h-12
          rounded-xl
          bg-cyan-500/10
          flex
          items-center
          justify-center
          text-cyan-400
          text-xl
        "
        >
          <FiBriefcase />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Interview Information
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Overview of your interview session
          </p>
        </div>
      </div>

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-5
      "
      >
        {info.map((item) => (
          <div
            key={item.title}
            className="
            rounded-2xl
            bg-[#11151d]
            border
            border-[#262b36]
            p-5
            hover:border-cyan-500/40
            hover:-translate-y-1
            transition-all
            duration-300
          "
          >
            <div className="flex items-center justify-between mb-5">
              <div
                className="
                w-10
                h-10
                rounded-xl
                bg-cyan-500/10
                flex
                items-center
                justify-center
                text-cyan-400
              "
              >
                {item.icon}
              </div>
            </div>

            <p className="text-gray-400 text-sm">
              {item.title}
            </p>

            <h3
              className="
              mt-2
              text-lg
              font-semibold
              break-words
            "
            >
              {item.value}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InterviewInfo;