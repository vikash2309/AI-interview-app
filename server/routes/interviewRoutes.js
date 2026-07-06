import express from "express";

import protect from "../middleware/authMiddleware.js";
import { getUserInterviews } from "../controllers/interviewController.js";
import { getInterviewById } from "../controllers/interviewController.js";
import { finishInterview } from "../controllers/interviewController.js";
import { saveAnswers } from "../controllers/interviewController.js";
import { generateEvaluation } from "../controllers/interviewController.js";
import {
  createInterview,
} from "../controllers/interviewController.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  createInterview
);

router.get(
  "/",
  protect,
  getUserInterviews
);

router.get(
  "/:id",
  getInterviewById
);
router.put(
  "/:id/answers",
  saveAnswers
);

router.put(
  "/:id/finish",
  finishInterview
);
router.post(
  "/:id/evaluate",
  generateEvaluation
);

export default router;