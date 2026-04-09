import express from "express";
import {
  cancelBooking,
  createBooking,
  getBookingsByUserId,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/:userId", getBookingsByUserId);
router.put("/:id/cancel", cancelBooking);

export default router;
