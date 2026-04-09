import Lawyer from "../models/Lawyer.js";

const defaultLawyers = [
  {
    name: "Rahul Sharma",
    specialization: "Criminal Law",
    experience: 8,
    location: "Delhi",
    rating: 4.5,
    languages: ["Hindi", "English"],
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    availableSlots: ["10:00 AM", "12:00 PM", "3:00 PM"],
  },
  {
    name: "Priya Reddy",
    specialization: "Family Law",
    experience: 6,
    location: "Hyderabad",
    rating: 4.7,
    languages: ["Telugu", "English"],
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    availableSlots: ["11:00 AM", "2:00 PM"],
  },
  {
    name: "Arjun Mehta",
    specialization: "Corporate Law",
    experience: 10,
    location: "Mumbai",
    rating: 4.8,
    languages: ["English", "Hindi"],
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
    availableSlots: ["9:00 AM", "1:00 PM"],
  },
];

// ✅ SEED FUNCTION
const ensureLawyersSeeded = async () => {
  try {
    const count = await Lawyer.countDocuments();
    if (count === 0) {
      await Lawyer.insertMany(defaultLawyers);
      console.log("Lawyers seeded");
    }
  } catch (error) {
    console.error("Lawyer seeding error:", error);
  }
};

// ✅ GET LAWYERS
export const getLawyers = async (req, res) => {
  try {
    await ensureLawyersSeeded();

    const lawyers = await Lawyer.find().sort({ createdAt: -1 });

    res.status(200).json(lawyers);
  } catch (error) {
    console.error("Lawyers Error:", error);
    res.status(500).json({ message: "Failed to fetch lawyers" });
  }
};