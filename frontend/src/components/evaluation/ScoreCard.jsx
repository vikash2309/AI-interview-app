import { FiAward } from "react-icons/fi";

function ScoreCard({ score }) {
  const getColor = () => {
    if (score >= 90)
      return {
        bg: "from-emerald-500 to-green-500",
        text: "text-emerald-400",
        label: "Outstanding",
      };

    if (score >= 80)
      return {
        bg: "from-cyan-500 to-blue-500",
        text: "text-cyan-400",
        label: "Excellent",
      };

    if (score >= 70)
      return {
        bg: "from-blue-500 to-indigo-500",
        text: "text-blue-400",
        label: "Good",
      };

    if (score >= 60)
      return {
        bg: "from-yellow-500 to-orange-500",
        text: "text-yellow-400",
        label: "Average",
      };

    return {
      bg: "from-red-500 to-pink-500",
      text: "text-red-400",
      label: "Needs Improvement",
    };
  };

  const color = getColor();

  return (
    <div
      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-[#262b36]
      bg-gradient-to-br
      from-[#171923]
      via-[#1a1f2d]
      to-[#1d2230]
      p-8
      md:p-12
      mb-6
    "
    >
      <div
        className="
        absolute
        -top-16
        -right-16
        w-72
        h-72
        rounded-full
        bg-cyan-500/10
        blur-3xl
      "
      />

      <div className="relative z-10 flex flex-col items-center">
        <div
          className={`
          w-20
          h-20
          rounded-full
          bg-gradient-to-r
          ${color.bg}
          flex
          items-center
          justify-center
          shadow-lg
        `}
        >
          <FiAward size={34} className="text-white" />
        </div>

        <h1
          className={`
          mt-6
          text-6xl
          md:text-7xl
          font-bold
          ${color.text}
        `}
        >
          {score}
        </h1>

        <p className="text-gray-400 mt-2">Overall Score</p>

        <span
          className={`
          mt-5
          px-5
          py-2
          rounded-full
          bg-gradient-to-r
          ${color.bg}
          text-white
          text-sm
          font-semibold
        `}
        >
          {color.label}
        </span>
      </div>
    </div>
  );
}

export default ScoreCard;
