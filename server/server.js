import "dotenv/config";

import express from 'express';
import cors from 'cors'



import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"


import {
  clerkMiddleware,
} from "@clerk/express";
import interviewRoutes from "./routes/interviewRoutes.js";
import deepgramRoutes from "./routes/deepgramRoutes.js"






const app = express();





app.use(cors());
app.use(express.json());
connectDB();
app.use(clerkMiddleware());


//routes
app.use(
  "/api/users",
  userRoutes
);
app.use(
  "/api/interviews",
  interviewRoutes
);
app.use("/api/deepgram", deepgramRoutes);


app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});