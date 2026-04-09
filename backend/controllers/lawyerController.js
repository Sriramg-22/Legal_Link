import Lawyer from "../models/Lawyer.js";

export const getLawyers = async (req, res) => {
  try {
    const lawyers = await Lawyer.find().sort({ createdAt: -1 });
    res.status(200).json(lawyers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch lawyers",
      error: error.message,
    });
  }
};
