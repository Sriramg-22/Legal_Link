import mongoose from "mongoose";
import dotenv from "dotenv";
import Lawyer from "../models/Lawyer.js";

dotenv.config();

const lawyers = [
  {
    name: "Aarav Mehta",
    specialization: "Corporate Law",
    experience: 12,
    location: "Mumbai, Maharashtra",
    rating: 4.8,
    languages: ["English", "Hindi", "Gujarati"],
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    availableSlots: ["10:00 AM", "12:30 PM", "2:00 PM", "4:30 PM"],
  },
  {
    name: "Priya Nair",
    specialization: "Family Law",
    experience: 9,
    location: "Kochi, Kerala",
    rating: 4.6,
    languages: ["English", "Malayalam", "Tamil"],
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    availableSlots: ["9:30 AM", "11:00 AM", "2:30 PM", "5:00 PM"],
  },
  {
    name: "Rohan Kulkarni",
    specialization: "Criminal Law",
    experience: 14,
    location: "Pune, Maharashtra",
    rating: 4.7,
    languages: ["English", "Hindi", "Marathi"],
    photo: "https://randomuser.me/api/portraits/men/57.jpg",
    availableSlots: ["10:30 AM", "1:00 PM", "3:30 PM", "6:00 PM"],
  },
  {
    name: "Sneha Reddy",
    specialization: "Cyber Law",
    experience: 7,
    location: "Hyderabad, Telangana",
    rating: 4.5,
    languages: ["English", "Hindi", "Telugu"],
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    availableSlots: ["9:00 AM", "12:00 PM", "3:00 PM", "5:30 PM"],
  },
  {
    name: "Aditya Singh",
    specialization: "Property Law",
    experience: 11,
    location: "Lucknow, Uttar Pradesh",
    rating: 4.4,
    languages: ["English", "Hindi"],
    photo: "https://randomuser.me/api/portraits/men/41.jpg",
    availableSlots: ["10:00 AM", "1:30 PM", "4:00 PM", "6:30 PM"],
  },
  {
    name: "Kavya Iyer",
    specialization: "Intellectual Property Law",
    experience: 10,
    location: "Chennai, Tamil Nadu",
    rating: 4.9,
    languages: ["English", "Tamil", "Hindi"],
    photo: "https://randomuser.me/api/portraits/women/52.jpg",
    availableSlots: ["9:45 AM", "11:30 AM", "2:15 PM", "4:45 PM"],
  },
  {
    name: "Arjun Chakraborty",
    specialization: "Civil Law",
    experience: 13,
    location: "Kolkata, West Bengal",
    rating: 4.6,
    languages: ["English", "Bengali", "Hindi"],
    photo: "https://randomuser.me/api/portraits/men/76.jpg",
    availableSlots: ["10:15 AM", "12:45 PM", "3:15 PM", "5:15 PM"],
  },
  {
    name: "Neha Sharma",
    specialization: "Labour Law",
    experience: 8,
    location: "Jaipur, Rajasthan",
    rating: 4.3,
    languages: ["English", "Hindi"],
    photo: "https://randomuser.me/api/portraits/women/29.jpg",
    availableSlots: ["9:30 AM", "12:00 PM", "2:45 PM", "5:30 PM"],
  },
  {
    name: "Vikram Deshmukh",
    specialization: "Tax Law",
    experience: 15,
    location: "Nagpur, Maharashtra",
    rating: 4.7,
    languages: ["English", "Hindi", "Marathi"],
    photo: "https://randomuser.me/api/portraits/men/63.jpg",
    availableSlots: ["10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"],
  },
  {
    name: "Ananya Das",
    specialization: "Immigration Law",
    experience: 6,
    location: "Bengaluru, Karnataka",
    rating: 4.5,
    languages: ["English", "Hindi", "Bengali"],
    photo: "https://randomuser.me/api/portraits/women/61.jpg",
    availableSlots: ["11:00 AM", "1:30 PM", "4:00 PM", "6:00 PM"],
  },
];

const seedLawyers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    await Lawyer.deleteMany();
    await Lawyer.insertMany(lawyers);

    console.log("10 dummy lawyers inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedLawyers();
