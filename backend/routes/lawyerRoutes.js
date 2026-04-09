import express from "express";
import { getLawyers } from "../controllers/lawyerController.js";

const router = express.Router();

router.get("/", getLawyers);

export default router;
