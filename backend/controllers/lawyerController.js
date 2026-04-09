import Lawyer from "../models/Lawyer.js";

export const getLawyers = async (req, res) => {
  try {
    // 🔥 TEMPORARY FORCE SEED (remove later)
    await Lawyer.deleteMany({});

    await Lawyer.insertMany([
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
      {
        name: "Sneha Iyer",
        specialization: "Property Law",
        experience: 7,
        location: "Chennai",
        rating: 4.6,
        languages: ["Tamil", "English"],
        photo: "https://randomuser.me/api/portraits/women/4.jpg",
        availableSlots: ["10:30 AM", "4:00 PM"],
      },
      {
        name: "Karan Verma",
        specialization: "Civil Rights",
        experience: 9,
        location: "Bangalore",
        rating: 4.4,
        languages: ["Hindi", "English", "Kannada"],
        photo: "https://randomuser.me/api/portraits/men/5.jpg",
        availableSlots: ["11:00 AM", "5:00 PM"],
      },
      {
        name: "Anjali Gupta",
        specialization: "Employment Law",
        experience: 5,
        location: "Pune",
        rating: 4.3,
        languages: ["Hindi", "English"],
        photo: "https://randomuser.me/api/portraits/women/6.jpg",
        availableSlots: ["12:00 PM", "3:30 PM"],
      },
      {
        name: "Rohit Singh",
        specialization: "Criminal Law",
        experience: 11,
        location: "Lucknow",
        rating: 4.9,
        languages: ["Hindi", "English"],
        photo: "https://randomuser.me/api/portraits/men/7.jpg",
        availableSlots: ["9:30 AM", "2:30 PM"],
      },
      {
        name: "Meera Nair",
        specialization: "Family Law",
        experience: 8,
        location: "Kochi",
        rating: 4.7,
        languages: ["Malayalam", "English"],
        photo: "https://randomuser.me/api/portraits/women/8.jpg",
        availableSlots: ["10:00 AM", "1:00 PM"],
      },
      {
        name: "Vikram Patel",
        specialization: "Corporate Law",
        experience: 12,
        location: "Ahmedabad",
        rating: 4.6,
        languages: ["Gujarati", "Hindi", "English"],
        photo: "https://randomuser.me/api/portraits/men/9.jpg",
        availableSlots: ["11:30 AM", "4:30 PM"],
      },
      {
        name: "Divya Sharma",
        specialization: "Property Law",
        experience: 6,
        location: "Jaipur",
        rating: 4.5,
        languages: ["Hindi", "English"],
        photo: "https://randomuser.me/api/portraits/women/10.jpg",
        availableSlots: ["10:00 AM", "3:00 PM"],
      }
    ]);

    const lawyers = await Lawyer.find();

    res.status(200).json(lawyers);
  } catch (error) {
    console.error("Lawyers Error:", error);
    res.status(500).json({ message: "Failed to fetch lawyers" });
  }
};
