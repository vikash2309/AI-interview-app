import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  InterviewProvider,
} from "./context/InterviewContext";

import {
  ClerkProvider,
} from "@clerk/clerk-react";

const clerkPubKey =
  import.meta.env
    .VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <ClerkProvider
    publishableKey={clerkPubKey}
  >
    <BrowserRouter>
    <InterviewProvider>
  <App />

      <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#171923",
          color: "#fff",
          border: "1px solid #262b36",
        },
      }}
    />
    </InterviewProvider>
    </BrowserRouter>
  </ClerkProvider>
);