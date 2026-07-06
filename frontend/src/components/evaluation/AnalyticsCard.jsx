import {
  FiBarChart2,
} from "react-icons/fi";

function AnalyticsCard({ analytics }) {

  const metrics = [
    {
      title: "Technical Knowledge",
      value:
        analytics?.technicalKnowledge ?? 0,
    },
    {
      title: "Communication",
      value:
        analytics?.communication ?? 0,
    },
    {
      title: "Problem Solving",
      value:
        analytics?.problemSolving ?? 0,
    },
    {
      title: "Confidence",
      value:
        analytics?.confidence ?? 0,
    },
    {
      title: "Practical Thinking",
      value:
        analytics?.practicalThinking ?? 0,
    },
  ];

  const getColor = (score) => {

    if (score >= 90)
      return "bg-emerald-500";

    if (score >= 80)
      return "bg-cyan-500";

    if (score >= 70)
      return "bg-blue-500";

    if (score >= 60)
      return "bg-yellow-500";

    return "bg-red-500";

  };

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
      relative
      overflow-hidden
    "
    >

      {/* Glow */}
      <div
        className="
        absolute
        -top-12
        -right-12
        w-60
        h-60
        rounded-full
        bg-cyan-500/10
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
            <FiBarChart2 size={28} />
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Performance Analytics
            </h2>

            <p className="text-gray-400 mt-1 text-sm">
              Different areas
              of your interview.
            </p>

          </div>

        </div>

        {/* Metrics */}

        <div className="space-y-7">

          {metrics.map((metric) => (

            <div key={metric.title}>

              <div className="flex justify-between mb-2">

                <span className="text-gray-300 font-medium">

                  {metric.title}

                </span>

                <span className="font-semibold">

                  {metric.value}%

                </span>

              </div>

              <div
                className="
                h-3
                bg-[#262b36]
                rounded-full
                overflow-hidden
              "
              >

                <div
                  className={`
                  h-full
                  rounded-full
                  transition-all
                  duration-700
                  ${getColor(metric.value)}
                `}
                  style={{
                    width: `${metric.value}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );

}

export default AnalyticsCard;