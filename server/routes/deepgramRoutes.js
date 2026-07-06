
import express from "express";
import { createToken } from "../controllers/deepgramController.js";

const router = express.Router();

router.get("/token", createToken);

export default router;