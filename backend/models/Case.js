import mongoose from "mongoose";

const caseUpdateSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const caseSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    updates: {
      type: [caseUpdateSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Case = mongoose.model("Case", caseSchema);

export default Case;
