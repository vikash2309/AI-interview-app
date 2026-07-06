import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "@clerk/clerk-react";

import {
  FiArrowLeft,
  FiClock,
  FiCheckCircle,
  FiHelpCircle,
  FiMic,
  FiVolume2,
  FiMessageCircle,
  FiPlayCircle,
  FiSkipForward,
  FiAlertTriangle,
  FiFileText,
} from "react-icons/fi";

import {
  getInterviewById,
} from "../utils/interviewApi";
import { evaluateInterview } from "../utils/interviewApi";


function InterviewDetails() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const { getToken } =
    useAuth();

  const [
    interview,
    setInterview,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);
  const [finishing, setfinishing] = useState(false);

  useEffect(() => {
    const fetchInterview =
      async () => {
        try {
          const token =
            await getToken();

          const data =
            await getInterviewById(
              id,
              token
            );

          setInterview(
            data
          );
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(
            false
          );
        }
      };

    fetchInterview();
  }, [id]);

  const hasReport =
  interview?.feedback?.overallFeedback !== null &&
  interview?.feedback?.overallFeedback !== undefined &&
  interview?.feedback?.overallFeedback !== '';

const isCompleted =
  interview?.status === "completed";

  const handleEvaluation=async()=>{
    try {
    setfinishing(true);
      const  token=await getToken();
      await evaluateInterview(interview._id,token);
      navigate(`/evaluation/${interview._id}`);


      
    } catch (error) {
      console.log(error);
      setfinishing(false);
      alert("Server is busy .Try after sometime");
      
    }

  }

  // Instructions shown before starting an interview
  const instructions = [
    {
      icon: FiMic,
      text: "Allow microphone access before starting.",
    },
    {
      icon: FiVolume2,
      text: "Sit in a quiet environment and use a good microphone if possible.",
    },
    {
      icon: FiMessageCircle,
      text: "Speak clearly at a natural pace.",
    },
    {
      icon: FiPlayCircle,
      text: "Click Start Answer when you're ready to respond.",
    },
    {
      icon: FiSkipForward,
      text: "Click Next Question after finishing your answer.",
    },
  ];

  if (loading) {
    return (
      <div
        className="
        h-screen
        bg-[#0f1117]
        flex
        items-center
        justify-center
      "
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="
            w-12
            h-12
            border-4
            border-cyan-500
            border-t-transparent
            rounded-full
            animate-spin
          "
          />

          <p className="text-gray-400">
            Loading Interview...
          </p>
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div
        className="
        h-screen
        bg-[#0f1117]
        text-white
        flex
        items-center
        justify-center
      "
      >
        Interview not found
      </div>
    );
  }

  return (
   <div
  className="
  min-h-screen
  lg:h-screen
  
  overflow-y-auto
  bg-[#0f1117]
  text-white
"
>
      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        md:px-8
        py-6
        lg:h-full
        lg:flex
        lg:flex-col
      "
      >
        {/* Back Button */}
        <button
          onClick={() =>
            navigate(-1)
          }
          className="
          flex
          items-center
          gap-2
          text-gray-400
          hover:text-white
          transition
          mb-4
          cursor-pointer
          shrink-0
        "
        >
          <FiArrowLeft />
          Back
        </button>

        {/* Hero Section */}
        <div
          className="
          relative
          
          rounded-3xl
          border
          border-cyan-500/20
          bg-gradient-to-r
          from-cyan-500/10
          via-blue-500/5
          to-purple-500/10
          p-5
          md:p-7
          shrink-0
        "
        >
          <div
            className="
            absolute
            top-0
            right-0
            w-48
            h-48
            bg-cyan-500/10
            rounded-full
            blur-3xl
          "
          />

          <div className="relative z-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1
                  className="
                  text-2xl
                  md:text-4xl
                  font-bold
                  break-words
                "
                >
                  {interview.company}
                </h1>

                <p
                  className="
                  text-gray-300
                  text-base
                  md:text-lg
                  mt-2
                  break-words
                "
                >
                  {interview.role}
                </p>
              </div>

              <div className="text-right shrink-0">
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Questions Generated
                </p>
                <p className="text-cyan-400 text-xl md:text-2xl font-semibold mt-1">
                  {interview.questionCount}
                </p>
              </div>
            </div>

            <div
              className="
              flex
              flex-wrap
              gap-3
              mt-5
            "
            >
              <span
                className="
                px-4
                py-1.5
                rounded-full
                bg-cyan-500/10
                border
                border-cyan-500/20
                text-cyan-300
                text-sm
              "
              >
                {interview.difficulty}
              </span>

              <span
                className="
                px-4
                py-1.5
                rounded-full
                bg-purple-500/10
                border
                border-purple-500/20
                text-purple-300
                text-sm
              "
              >
                {interview.interviewType}
              </span>

              <span
                className="
                px-4
                py-1.5
                rounded-full
                bg-blue-500/10
                border
                border-blue-500/20
                text-blue-300
                text-sm
                flex
                items-center
                gap-2
              "
              >
                <FiClock />
                {interview.duration}
                {" "}
                Minutes
              </span>

              <span
                className="
                px-4
                py-1.5
                rounded-full
                bg-[#222734]
                border
                border-[#2c3140]
                text-gray-300
                text-sm
                flex
                items-center
                gap-2
              "
              >
                <FiCheckCircle className="text-cyan-400" />
                {interview.status}
              </span>
            </div>
          </div>
        </div>

        {/* Content: Summary + Instructions side by side on larger screens */}
        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-5
          gap-6
          mt-6
          lg:flex-1
          lg:min-h-0
          pb-6
          lg:pb-0
        "
        >

          {/* Summary + Action */}
          <div className="lg:col-span-2 lg:h-full">
            <div
              className="
              bg-[#171923]
              border
              border-[#262b36]
              rounded-3xl
              p-6
              flex
              flex-col
              lg:h-full
            "
            >
              <h3
                className="
                text-xl
                font-semibold
                mb-6
                flex
                items-center
                gap-2
              "
              >
                <FiFileText className="text-cyan-400" />
                Interview Summary
              </h3>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">
                    Questions
                  </p>

                  <p
                    className="
                    text-lg
                    font-semibold
                    mt-1
                  "
                  >
                    {interview.questionCount}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Duration
                  </p>

                  <p
                    className="
                    text-lg
                    font-semibold
                    mt-1
                  "
                  >
                    {interview.duration}
                    {" "}
                    Min
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Status
                  </p>

                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    mt-2
                  "
                  >
                    <FiCheckCircle className="text-cyan-400 shrink-0" />

                    <span
                      className="
                      px-2.5
                      py-1
                      rounded-full
                      bg-cyan-500/10
                      border
                      border-cyan-500/20
                      text-cyan-300
                      text-xs
                      whitespace-nowrap
                    "
                    >
                      {interview.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1" />

              {/* button logic */}
              {
               !isCompleted?(
                  <button
              onClick={() =>
    navigate(
      `/interview-room/${interview._id}`
    )
  }
                disabled={
                  !interview.questions
                    ?.length
                }
                className="
                w-full
                mt-8
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                hover:from-cyan-400
                hover:to-blue-400
                text-black
                font-semibold
                transition
                shadow-lg
                shadow-cyan-500/20
                disabled:opacity-50
                disabled:cursor-not-allowed
                cursor-pointer
                flex
                items-center
                justify-center
                gap-2
              "
              >
                <FiPlayCircle />
                Start Interview
              </button>
                ): hasReport?(
                  <button
              onClick={() =>
    navigate(
      `/evaluation/${interview._id}`
    )
  }
                disabled={
                  !interview.questions
                    ?.length
                }
                className="
                w-full
                mt-8
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                hover:from-cyan-400
                hover:to-blue-400
                text-black
                font-semibold
                transition
                shadow-lg
                shadow-cyan-500/20
                disabled:opacity-50
                disabled:cursor-not-allowed
                cursor-pointer
                flex
                items-center
                justify-center
                gap-2
              "
              >
                <FiFileText />
                View Report
              </button>
                ) : (
                  <button
              onClick={handleEvaluation}
                disabled={
                  !interview.questions
                    ?.length
                }
                className="
                w-full
                mt-8
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                hover:from-cyan-400
                hover:to-blue-400
                text-black
                font-semibold
                transition
                shadow-lg
                shadow-cyan-500/20
                disabled:opacity-50
                disabled:cursor-not-allowed
                cursor-pointer
                flex
                items-center
                justify-center
                gap-2
              "
              >
                <FiFileText />
                Generate Report
              </button>
                )
              }

            </div>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-3 lg:h-full">
            <div
              className="
              bg-[#171923]
              border
              border-[#262b36]
              rounded-3xl
              p-6
              lg:h-full
              lg:overflow-y-auto
            "
            >
              <h3
                className="
                text-xl
                font-semibold
                mb-6
                flex
                items-center
                gap-2
              "
              >
                <FiHelpCircle className="text-cyan-400" />
                Before You Begin
              </h3>

              <ul className="space-y-4">
                {instructions.map(({ icon: Icon, text }, idx) => (
                  <li
                    key={idx}
                    className="
                    flex
                    items-start
                    gap-3
                  "
                  >
                    <span
                      className="
                      w-9
                      h-9
                      rounded-xl
                      bg-cyan-500/10
                      border
                      border-cyan-500/20
                      flex
                      items-center
                      justify-center
                      text-cyan-300
                      shrink-0
                    "
                    >
                      <Icon size={16} />
                    </span>
                    <p className="text-gray-300 leading-6 mt-1.5">
                      {text}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Warning */}
              <div
                className="
                mt-6
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-amber-500/20
                bg-amber-500/10
                p-4
              "
              >
                <span
                  className="
                  w-9
                  h-9
                  rounded-xl
                  bg-amber-500/15
                  border
                  border-amber-500/30
                  flex
                  items-center
                  justify-center
                  text-amber-400
                  shrink-0
                "
                >
                  <FiAlertTriangle size={16} />
                </span>
                <p className="text-amber-200 leading-6 mt-1.5 text-sm">
                  Once you move to the next question, you cannot return.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
         {
  finishing && (
    <div
      className="
      fixed
      inset-0
      z-[999]
      bg-[#0f1117]/95
      backdrop-blur-md
      flex
      items-center
      justify-center
      px-6
    "
    >
      <div
        className="
        max-w-md
        w-full
        text-center
      "
      >
        {/* Spinner */}
        <div
          className="
          mx-auto
          w-20
          h-20
          rounded-full
          border-[5px]
          border-cyan-500
          border-t-transparent
          animate-spin
        "
        />

        {/* Heading */}
        <h2
          className="
          mt-10
          text-3xl
          font-bold
          text-white
        "
        >
          Generating Report
        </h2>

        {/* Description */}
        <p
          className="
          mt-4
          text-gray-400
          leading-7
        "
        >
          Our AI is analyzing your interview,
          evaluating your answers and preparing
          a personalized report.
        </p>

        {/* Animated Progress */}
        <div
          className="
          mt-8
          h-2
          rounded-full
          bg-[#252b39]
          overflow-hidden
        "
        >
          <div
            className="
            h-full
            w-full
            bg-gradient-to-r
            from-cyan-500
            via-blue-500
            to-cyan-500
            animate-pulse
          "
          />
        </div>

        {/* Footer */}
        <p
          className="
          mt-5
          text-sm
          text-gray-500
        "
        >
          This usually takes 10–30 seconds.
        </p>
      </div>
    </div>
  )
}
    </div>
  );
}

export default InterviewDetails;
