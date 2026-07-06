import React from "react";
import { Link } from "react-router-dom";
import { SignIn, SignOutButton, SignUp } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/clerk-react";
import { SignUpButton } from "@clerk/clerk-react";



const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
        
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-5">
        <h1 className="text-2xl font-bold">
          CRACK<span className="text-blue-500">ZO</span>
        </h1>

        <div className="flex gap-4">
         <SignInButton mode="modal">
  <button className="px-5 py-2 border border-gray-600 rounded-lg cursor-pointer">
    Sign In
  </button>
</SignInButton>

         <SignUpButton mode="modal">
  <button className="px-5 py-2 bg-blue-600 rounded-lg cursor-pointer">
    Register
  </button>
</SignUpButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="max-w-4xl">
          <span className="inline-block px-4 py-2 mb-6 text-sm bg-blue-600/20 text-blue-400 rounded-full border border-blue-500/30">
            AI Powered Mock Interviews
          </span>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Ace Your Next
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Technical Interview
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Practice real interview questions with an AI interviewer.
            Get instant feedback, performance analysis, and improve your
            confidence before the actual interview.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <SignUpButton mode="modal">
            <button
              
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold transition cursor-pointer"
            >
              Get Started Free
            </button>
            </SignUpButton>
             <SignInButton mode="modal">

            <button
              
              className="px-8 py-4 border border-gray-600 hover:bg-white hover:text-black rounded-xl text-lg font-semibold transition cursor-pointer"
            >
              Sign In
            </button>
            </SignInButton>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-16 py-16">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Why Choose CRACKZO?
          </h2>
          <p className="text-gray-400 mt-3">
            Everything you need to prepare effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl">
            <div className="text-4xl mb-4">🎤</div>
            <h3 className="text-xl font-semibold mb-2">
              Real-Time Interviews
            </h3>
            <p className="text-gray-400">
              Experience realistic interview sessions powered by AI.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">
              Detailed Feedback
            </h3>
            <p className="text-gray-400">
              Get performance reports on communication, confidence,
              and technical skills.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">
              AI Evaluation
            </h3>
            <p className="text-gray-400">
              Receive intelligent suggestions to improve your answers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto text-center bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/20 rounded-3xl p-12">
          <h2 className="text-4xl font-bold">
            Ready to Crack Your Dream Job?
          </h2>

          <p className="mt-4 text-gray-300">
            Start practicing today and build confidence for your next
            interview.
          </p>
          <SignUpButton mode="modal">

          <button
           
            className=" cursor-pointer inline-block mt-8 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold transition"
          >
            Start Interview Practice
          </button>
          </SignUpButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-white/10 text-gray-500">
        © {new Date().getFullYear()} CRACKZO. All Rights Reserved.Created by Vikash Chaudhary
      </footer>
    </div>
  );
};

export default Home;