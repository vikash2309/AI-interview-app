import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

import {
  useInterview,
} from "../context/InterviewContext";

import {
  getInterviews,
} from "../utils/interviewApi";

function InterviewForm() {
  const { getToken } = useAuth();

  const {
    setInterviews,
  } = useInterview();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      company: "",
      role: "",
      difficulty: "Medium",
      questionCount: 5,
      interviewType: "Technical",
    });

 const handleChange = (e) => {
  const { name, value } = e.target;

  setForm({
    ...form,
    [name]:
      name === "questionCount"
        ? Number(value)
        : value,
  });
};

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (
      !form.company.trim() ||
      !form.role.trim()
    ) {
      toast.error(
        "Company and Role are required"
      );
      return;
    }

    const toastId =
      toast.loading(
        "Creating interview..."
      );

    try {
      setLoading(true);

      const token =
        await getToken();

      const res =
        await axios.post(
          `${import.meta.env.VITE_API_URL}/interviews/create`,
          form,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      console.log(res.data);

      const updatedInterviews =
        await getInterviews(
          token
        );

      setInterviews(
        updatedInterviews
      );

      toast.success(
        "Interview created successfully",
        {
          id: toastId,
        }
      );

      setForm({
        company: "",
        role: "",
        difficulty:
          "Medium",
        questionCount: 5,
        interviewType:
          "Technical",
      });
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Failed to create interview",
        {
          id: toastId,
        }
      );
    } finally {
      setLoading(false);
    }
  };
  const estimatedDuration =
  form.questionCount * 2;

  return (
    <div
      className="
      relative
      overflow-hidden
      bg-gradient-to-br
      from-[#171923]
      via-[#1a1e2b]
      to-[#1d2230]
      border
      border-[#262b36]
      rounded-3xl
      p-6
      md:p-8
      shadow-xl
      shadow-black/20
    "
    >
      {/* Glow */}
      <div
        className="
        absolute
        top-0
        right-0
        h-48
        w-48
        bg-cyan-500/10
        blur-3xl
        rounded-full
        pointer-events-none
      "
      />

      {/* Header */}
      <div className="relative z-10 mb-8">
        <p className="text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase">
          Create Interview
        </p>

        <h2 className="text-3xl font-bold mt-2">
          Start New Interview
        </h2>

        <p className="text-gray-400 mt-3 max-w-2xl leading-relaxed">
          Configure your interview experience and let AI
          generate a company-specific mock interview tailored
          to your selected role and difficulty level.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 space-y-6"
      >
        {/* Company + Role */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Company
            </label>

            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Google"
              className="
              w-full
              bg-[#10141d]
              border
              border-[#2b3142]
              rounded-xl
              px-4
              py-3
              text-white
              outline-none
              transition-all
              duration-200
              hover:border-[#3a4358]
              focus:border-cyan-500
              focus:ring-4
              focus:ring-cyan-500/10
            "
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Job Role
            </label>

            <input
              type="text"
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="Frontend Developer"
              className="
              w-full
              bg-[#10141d]
              border
              border-[#2b3142]
              rounded-xl
              px-4
              py-3
              text-white
              outline-none
              transition-all
              duration-200
              hover:border-[#3a4358]
              focus:border-cyan-500
              focus:ring-4
              focus:ring-cyan-500/10
            "
            />
          </div>
        </div>

        {/* Selects */}
        <div className="grid md:grid-cols-3 gap-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Difficulty
            </label>

            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              className="
              w-full
              bg-[#10141d]
              border
              border-[#2b3142]
              rounded-xl
              px-4
              py-3
              text-white
              cursor-pointer
              outline-none
              transition-all
              duration-200
              hover:border-[#3a4358]
              focus:border-cyan-500
              focus:ring-4
              focus:ring-cyan-500/10
            "
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Number of Questions
            </label>

            <select
              name="questionCount"
              value={form.questionCount}
              onChange={handleChange}
              className="
              w-full
              bg-[#10141d]
              border
              border-[#2b3142]
              rounded-xl
              px-4
              py-3
              text-white
              cursor-pointer
              outline-none
              transition-all
              duration-200
              hover:border-[#3a4358]
              focus:border-cyan-500
              focus:ring-4
              focus:ring-cyan-500/10
            "
            >
              <option value="5">
                5
              </option>

              <option value="10">
                10
              </option>

              <option value="15">
                15
              </option>

              <option value="20">
                20
              </option>
            </select>
            <p className="mt-2 text-xs text-cyan-400">
  Estimated Interview Duration: {estimatedDuration} minutes
</p>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Interview Type
            </label>

            <select
              name="interviewType"
              value={form.interviewType}
              onChange={handleChange}
              className="
              w-full
              bg-[#10141d]
              border
              border-[#2b3142]
              rounded-xl
              px-4
              py-3
              text-white
              cursor-pointer
              outline-none
              transition-all
              duration-200
              hover:border-[#3a4358]
              focus:border-cyan-500
              focus:ring-4
              focus:ring-cyan-500/10
            "
            >
              <option>
                Technical
              </option>

              <option>
                Behavioral
              </option>

              <option>
                Mixed
              </option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div
          className="
          pt-5
          border-t
          border-[#262b36]
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-4
        "
        >
          <p className="text-sm text-gray-500 max-w-xl">
           AI will generate interview questions based on your selected company, role, difficulty level, and interview type. The interview duration is automatically estimated from the number of questions you choose.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            lg:w-auto
            px-8
            py-3.5
            rounded-xl
            font-semibold
            text-white
            cursor-pointer
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            hover:from-cyan-400
            hover:to-blue-500
            hover:scale-[1.02]
            active:scale-[0.98]
            transition-all
            duration-300
            shadow-lg
            shadow-cyan-500/20
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
          >
            {loading
              ? "Creating..."
              : "Create Interview"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default InterviewForm;