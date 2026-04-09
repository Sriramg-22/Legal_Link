import Case from "../models/Case.js";

const buildDummyCases = (userId) => [
  {
    userId,
    title: "Property Ownership Dispute",
    updates: [
      { status: "Case Filed", date: "2026-01-08" },
      { status: "Hearing Scheduled", date: "2026-01-26" },
      { status: "In Progress", date: "2026-02-14" },
      { status: "Completed", date: "2026-03-03" },
    ],
  },
  {
    userId,
    title: "Employment Contract Review Matter",
    updates: [
      { status: "Case Filed", date: "2026-02-10" },
      { status: "Hearing Scheduled", date: "2026-02-21" },
      { status: "In Progress", date: "2026-03-05" },
    ],
  },
  {
    userId,
    title: "Tenant Eviction Notice Assistance",
    updates: [
      { status: "Case Filed", date: "2026-03-01" },
      { status: "Hearing Scheduled", date: "2026-03-12" },
    ],
  },
];

const ensureDummyCases = async (userId) => {
  const existingCases = await Case.countDocuments({ userId });

  if (existingCases === 0) {
    await Case.insertMany(buildDummyCases(userId));
  }
};

export const getCasesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    await ensureDummyCases(userId);
    const cases = await Case.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cases",
      error: error.message,
    });
  }
};
