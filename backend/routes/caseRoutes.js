import express from "express";
import { getCasesByUserId } from "../controllers/caseController.js";

const router = express.Router();

router.get("/:userId", getCasesByUserId);

export default router;
