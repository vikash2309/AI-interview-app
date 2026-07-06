import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import InterviewForm from "../components/InterviewForm";
import RecentInterviews from "../components/RecentInterviews";

function Dashboard() {
  const { user } = useUser();

  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-[#0f1117] text-white">
      <Navbar setOpen={setOpen} />

      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar
          open={open}
          setOpen={setOpen}
        />

        <main
          className="
          flex-1
          overflow-y-auto
          p-4
          md:p-8
          lg:p-10
        "
        >
          {/* Hero Section */}
          <div className="mb-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-cyan-400">
                  AI Interview Platform
                </p>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
                  Welcome back,
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent ml-2">
                    {user?.firstName}
                  </span>
                </h1>

                <p className="text-gray-400 mt-4 max-w-2xl">
                  Continue your interview preparation journey and
                  improve your confidence with AI-powered mock interviews.
                </p>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div
            className="
            bg-gradient-to-br
            from-[#171923]
            to-[#1d2230]
            border
            border-[#262b36]
            rounded-3xl
            p-6
            mb-10
            shadow-xl
            shadow-black/20
          "
          >
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src={user?.imageUrl}
                alt="profile"
                className="
                w-24
                h-24
                rounded-full
                ring-4
                ring-cyan-500/20
                shadow-lg
                shadow-cyan-500/10
                object-cover
              "
              />

              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold">
                  {user?.fullName}
                </h2>

                <p className="text-gray-400 mt-1">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>

               
              </div>
            </div>
          </div>

        

          {/* Interview Form */}
          <section className="mb-10">
            <InterviewForm />
          </section>

          {/* Recent Interviews */}
          <section className="mt-10">
  <RecentInterviews />
</section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;