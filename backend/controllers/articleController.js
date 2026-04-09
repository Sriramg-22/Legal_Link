import Article from "../models/Article.js";

const samplePdfLink =
  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

const defaultArticles = [
  {
    title: "What to Do If You Are Stopped by the Police",
    category: "Know Your Rights",
    content:
      "If you are stopped by the police, stay calm, avoid sudden movements, and ask why you are being stopped. You have the right to remain silent and the right to ask if you are free to leave. If you are being detained or arrested, do not resist even if you believe the action is unfair. You can ask for a lawyer and avoid signing any statement without understanding it. Keeping records such as officer names, badge numbers, time, and location may be helpful later.",
    pdfLink: samplePdfLink,
  },
  {
    title: "Understanding Your Rights as a Tenant in India",
    category: "Know Your Rights",
    content:
      "Tenants generally have the right to peaceful possession of the rented property during the agreed tenancy period. Landlords usually cannot force eviction without following legal process. Rental agreements, security deposit terms, maintenance responsibilities, and notice periods should be clearly documented. If disputes arise about eviction, unfair rent increases, or deposit refunds, written communication and copies of the agreement become important evidence.",
    pdfLink: samplePdfLink,
  },
  {
    title: "Key Documents to Check Before Buying Property",
    category: "Property Law",
    content:
      "Before buying property, verify title documents, encumbrance certificates, approved layout plans, tax receipts, possession details, and identity of the seller. If the property is part of a project, check approvals from local authorities and whether the developer has legal authority to sell. It is also wise to confirm that there are no pending disputes, loans, or conflicting claims connected to the property.",
    pdfLink: samplePdfLink,
  },
  {
    title: "How Property Registration Protects Ownership",
    category: "Property Law",
    content:
      "Property registration creates formal legal evidence of transfer and helps reduce ownership disputes. A sale deed should be executed correctly, stamped as required, and registered before the appropriate authority. Registration does not solve every title issue by itself, but it is a crucial step in proving ownership, securing loans, and protecting long-term rights over the property.",
    pdfLink: samplePdfLink,
  },
  {
    title: "Basic Employee Rights at the Workplace",
    category: "Employment Law",
    content:
      "Employees are generally entitled to timely wages, a safe workplace, and protection from unfair treatment. Depending on the nature of employment, workers may also have rights relating to leave, notice periods, termination procedures, harassment protection, and benefits. Appointment letters, salary slips, and written communication should be preserved because they help establish the actual terms of employment if a dispute arises.",
    pdfLink: samplePdfLink,
  },
  {
    title: "What to Know Before Resigning from a Job",
    category: "Employment Law",
    content:
      "Before resigning, review your employment contract for notice period clauses, non-compete terms, confidentiality obligations, and final settlement rules. A formal resignation email or letter should be professional and dated. Keep copies of documents relating to pending dues, bonus eligibility, relieving letters, and provident fund records. If an employer withholds salary or experience documents unfairly, legal remedies may be available.",
    pdfLink: samplePdfLink,
  },
  {
    title: "How to Prepare for a Family Law Consultation",
    category: "Know Your Rights",
    content:
      "For family law matters involving divorce, custody, maintenance, or domestic disputes, gather important records before meeting a lawyer. This can include marriage certificates, identity documents, communication records, financial details, and any court notices already received. A clear timeline of major events helps your lawyer understand the matter quickly and advise you on possible legal options and next steps.",
    pdfLink: samplePdfLink,
  },
  {
    title: "Common Mistakes to Avoid in Employment Disputes",
    category: "Employment Law",
    content:
      "One common mistake is relying only on verbal promises from employers instead of preserving written records. Another is delaying action after termination, harassment, or non-payment of salary. Employees should keep copies of contracts, HR emails, attendance records, and payment proof. Escalating issues internally in writing and consulting a lawyer early often improves the chances of resolving the dispute effectively.",
    pdfLink: samplePdfLink,
  },
  {
    title: "Understanding Inheritance and Succession Basics",
    category: "Property Law",
    content:
      "Inheritance and succession issues often arise when property passes after the death of an owner without clear distribution. The outcome can depend on religion, personal law, wills, nominee status, and the nature of the property. Legal heirs may need succession certificates, legal heir certificates, or probate proceedings in some cases. Early documentation and proper legal advice can prevent long-running disputes among family members.",
    pdfLink: samplePdfLink,
  },
];

const ensureArticlesSeeded = async () => {
  try {
    const count = await Article.countDocuments();
    if (count === 0) {
      await Article.insertMany(defaultArticles);
      console.log("Articles seeded");
    }
  } catch (error) {
    console.error("Seeding Error:", error);
  }
};

// ✅ GET ALL ARTICLES
export const getArticles = async (req, res) => {
  try {
    await ensureArticlesSeeded();

    const articles = await Article.find().sort({ createdAt: -1 });

    res.status(200).json(articles);
  } catch (error) {
    console.error("Articles Error:", error);
    res.status(500).json({ message: "Failed to fetch articles" });
  }
};

// ✅ GET SINGLE ARTICLE
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error("Article Error:", error);
    res.status(500).json({ message: "Failed to fetch article" });
  }
};
