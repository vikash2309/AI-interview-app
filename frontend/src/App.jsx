import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { RedirectToSignIn } from "@clerk/clerk-react";
import Dashboard from "./pages/Dashboard";
import InterviewDetails from "./pages/InterviewDetails";
import InterviewRoom from "./pages/InterviewRoom";
import EvaluationPage from "./pages/EvaluationPage";
import History from "./pages/History";
import VideoTest from "./pages/VideoTest";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <SignedOut>
              <Home />
            </SignedOut>
            <SignedIn>
              <Dashboard />
            </SignedIn>
          </>
        }
      />
      <Route path="/signin" element={<Login />} />

      <Route path="/signup" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <>
            <SignedIn>
              <Dashboard />
            </SignedIn>

            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
      <Route path="/interviews/:id" element={<InterviewDetails />} />
      <Route path="/interview-room/:id" element={<InterviewRoom />} />
      <Route path="/evaluation/:id" element={<EvaluationPage />} />
      
      <Route path="/history" element={<History />} />
      <Route path="/video" element={<VideoTest />} />

    </Routes>
  );
}

export default App;
