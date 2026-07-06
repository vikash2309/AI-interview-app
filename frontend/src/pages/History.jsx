import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import InterviewCard from "../components/InterviewCard";

import { getInterviews } from "../utils/interviewApi";

function History() {
 

  const [open, setOpen] = useState(false);
  const { getToken } = useAuth();

  const [interviews, setInterviews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = await getToken();

        const data = await getInterviews(token);

        setInterviews(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);
  //search query
  const filteredInterviews = interviews.filter((interview) => {
  const searchValue = search.toLowerCase();

  return (
    interview.company
      .toLowerCase()
      .includes(searchValue) ||

    interview.role
      .toLowerCase()
      .includes(searchValue)
  );
});

  //stats
  const totalInterviews = interviews.length;

  const averageScore = interviews.length
    ? Math.round(
        interviews.reduce(
          (sum, interview) => sum + interview.score,

          0,
        ) / interviews.length,
      )
    : 0;
  return (
    <div className="h-screen overflow-hidden bg-[#0f1117] text-white">
      <Navbar setOpen={setOpen} />

      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar open={open} setOpen={setOpen} />

      <main
  className="
    flex-1
    overflow-y-auto
    p-4
    md:p-8
    lg:p-10
  "
>
  {/* Header */}
  <div className="mb-10">
    <p className="text-sm uppercase tracking-widest text-cyan-400 font-medium">
      Interview Archive
    </p>

    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
      Interview History
    </h1>

    <p className="text-gray-400 mt-3 max-w-2xl">
      Review your previous interviews, monitor your progress and revisit
      detailed AI feedback anytime.
    </p>
  </div>

  {/* Stats */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
    <div
      className="
        bg-gradient-to-br
        from-[#171923]
        to-[#1f2533]
        border
        border-[#262b36]
        rounded-3xl
        p-6
      "
    >
      <p className="text-sm text-gray-400">
        Total Interviews
      </p>

      <h2 className="text-4xl font-bold mt-4">
        {totalInterviews}
      </h2>
    </div>

    <div
      className="
        bg-gradient-to-br
        from-[#171923]
        to-[#1f2533]
        border
        border-[#262b36]
        rounded-3xl
        p-6
      "
    >
      <p className="text-sm text-gray-400">
        Average Score
      </p>

      <h2 className="text-4xl font-bold mt-4">
        {averageScore}%
      </h2>
    </div>
  </div>

  {/* Search */}
  <div className="mb-8">
    <input
      type="text"
      placeholder="Search by company or role..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="
        w-full
        bg-[#171923]
        border
        border-[#262b36]
        rounded-2xl
        px-5
        py-4
        outline-none
        text-white
        placeholder:text-gray-500
        focus:border-cyan-500
        transition
      "
    />
  </div>

  {/* Loading */}
  {loading && (
    <div className="flex justify-center py-20">
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
    </div>
  )}

  {/* Empty */}
  {!loading && filteredInterviews.length === 0 && (
    <div
      className="
        bg-[#171923]
        border
        border-[#262b36]
        rounded-3xl
        py-20
        text-center
      "
    >
      <h2 className="text-2xl font-semibold">
        No Interviews Found
      </h2>

      <p className="text-gray-400 mt-3">
        Create your first AI interview to begin your journey.
      </p>
    </div>
  )}

  {/* Cards */}
  {!loading && filteredInterviews.length > 0 && (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
    >
      {filteredInterviews.map((interview) => (
        <InterviewCard
          key={interview._id}
          interview={interview}
        />
      ))}
    </div>
  )}
</main>
      </div>
    </div>
  );
}

export default History;
