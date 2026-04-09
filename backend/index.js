import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import lawyerRoutes from "./routes/lawyerRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import caseRoutes from "./routes/caseRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// ROUTES
app.use("/api/lawyers", lawyerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/cases", caseRoutes);

app.get("/", (req, res) => {
  res.send("Legal Link API is running...");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
