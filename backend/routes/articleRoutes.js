import express from "express";
import { getArticleById, getArticles } from "../controllers/articleController.js";

const router = express.Router();

router.get("/", getArticles);
router.get("/:id", getArticleById);

export default router;
