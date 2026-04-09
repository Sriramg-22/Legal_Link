import mongoose from "mongoose";

const lawyerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    languages: {
      type: [String],
      required: true,
      default: [],
    },
    photo: {
      type: String,
      default: "",
      trim: true,
    },
    availableSlots: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Lawyer = mongoose.model("Lawyer", lawyerSchema);

export default Lawyer;
