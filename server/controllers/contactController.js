import Contact from "../models/Contact.js";

export async function createContact(req, res) {
  try {
    const { name, company = "", email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required.",
      });
    }

    const contact = await Contact.create({
      name,
      company,
      email,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Contact request submitted successfully.",
      data: contact,
    });
  } catch (error) {
    console.error("Create contact error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)
          .map((item) => item.message)
          .join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to submit contact request.",
    });
  }
}

export async function listContactLeads(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required.",
    });
  }

  try {
    const leads = await Contact.find()
      .select("name company email message createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return res.json({ success: true, leads });
  } catch (error) {
    return next(error);
  }
}
