import { useEffect } from "react";

import {
  useAuth,
} from "@clerk/clerk-react";

import {
  useInterview,
} from "../context/InterviewContext";

import {
  getInterviews,
} from "../utils/interviewApi";

import InterviewCard from "./InterviewCard";

function RecentInterviews() {
  const { getToken } =
    useAuth();

  const {
    interviews,
    setInterviews,
    loadingInterviews,
    setLoadingInterviews,
  } = useInterview();

  const fetchInterviews =
    async () => {
      try {
        setLoadingInterviews(
          true
        );

        const token =
          await getToken();

        const data =
          await getInterviews(
            token
          );

        setInterviews(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingInterviews(
          false
        );
      }
    };

  useEffect(() => {
    fetchInterviews();
  }, []);

  /* Loading State */
  if (loadingInterviews) {
    return (
      <div
        className="
        bg-gradient-to-br
        from-[#171923]
        to-[#1d2230]
        border
        border-[#262b36]
        rounded-3xl
        p-10
        text-center
      "
      >
        <div
          className="
          w-10
          h-10
          mx-auto
          rounded-full
          border-4
          border-cyan-500/20
          border-t-cyan-400
          animate-spin
        "
        />

        <h3 className="mt-5 text-lg font-semibold">
          Loading Interviews
        </h3>

        <p className="text-gray-400 mt-2">
          Fetching your latest interview sessions...
        </p>
      </div>
    );
  }

  /* Empty State */
  if (
    interviews.length === 0
  ) {
    return (
      <div
        className="
        bg-gradient-to-br
        from-[#171923]
        to-[#1d2230]
        border
        border-dashed
        border-[#30384b]
        rounded-3xl
        p-10
        text-center
      "
      >
        <div
          className="
          w-16
          h-16
          mx-auto
          rounded-2xl
          bg-cyan-500/10
          border
          border-cyan-500/20
          flex
          items-center
          justify-center
          text-3xl
        "
        >
          🎤
        </div>

        <h3 className="mt-5 text-xl font-semibold">
          No Interviews Yet
        </h3>

        <p className="text-gray-400 mt-3 max-w-md mx-auto">
          Create your first AI interview session
          and start practicing with personalized
          company-specific questions.
        </p>
      </div>
    );
  }

  return (
    <section>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            Recent Interviews
          </h2>

          <p className="text-gray-400 mt-1">
            Continue where you left off.
          </p>
        </div>

        <div
          className="
          self-start
          sm:self-auto
          px-4
          py-2
          rounded-xl
          bg-cyan-500/10
          border
          border-cyan-500/20
          text-cyan-300
          text-sm
          font-medium
        "
        >
          {interviews.length} Total
        </div>
      </div>

      {/* Cards */}
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-5
      "
      >
        {interviews
          .slice(0, 3)
          .map(
            (
              interview
            ) => (
              <InterviewCard
                key={
                  interview._id
                }
                interview={
                  interview
                }
              />
            )
          )}
      </div>

      {/* Footer Hint */}
      {interviews.length >
        3 && (
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Showing latest 3 interviews.
            View complete history from
            the History section.
          </p>
        </div>
      )}
    </section>
  );
}

export default RecentInterviews;