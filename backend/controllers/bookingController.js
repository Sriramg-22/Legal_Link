import Booking from "../models/Booking.js";
import Lawyer from "../models/Lawyer.js";

export const createBooking = async (req, res) => {
  try {
    const { userId, lawyer, date, time } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required to create a booking",
      });
    }

    const selectedLawyer = await Lawyer.findById(lawyer);

    if (!selectedLawyer) {
      return res.status(404).json({
        message: "Lawyer not found",
      });
    }

    if (!selectedLawyer.availableSlots.includes(time)) {
      return res.status(400).json({
        message: "Selected time slot is not available for this lawyer",
      });
    }

    const existingBooking = await Booking.findOne({
      lawyer,
      date,
      time,
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "This slot is already booked. Please choose another slot.",
      });
    }

    const booking = await Booking.create({
      userId,
      lawyer,
      date,
      time,
    });

    const populatedBooking = await booking.populate("lawyer");

    res.status(201).json({
      message: "Booking created successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

export const getBookingsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ userId })
      .populate("lawyer", "name specialization photo")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "lawyer",
      "name specialization photo"
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to cancel booking",
      error: error.message,
    });
  }
};
