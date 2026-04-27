const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");
const Contact = require("../models/Contact.model");
const Stat = require("../models/Stat.model");

const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

// POST /api/contact
const submitContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    // Save to MongoDB
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ip: req.ip,
    });

    // Update stats
    await Stat.findOneAndUpdate({}, { $inc: { totalContacts: 1 } }, { upsert: true });

    // Send notification email to Mohammad Aqib
    try {
      const transporter = createTransporter();

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_USER,
        subject: `📬 Portfolio Contact: ${subject}`,
        html: `
          <div style="font-family:monospace;background:#050810;color:#e8eaf6;padding:32px;border-radius:12px;max-width:600px">
            <h2 style="color:#00d4ff;margin-bottom:24px">New Portfolio Message</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="color:#6b7db3;padding:8px 0;width:100px">From:</td><td style="color:#e8eaf6">${name}</td></tr>
              <tr><td style="color:#6b7db3;padding:8px 0">Email:</td><td><a href="mailto:${email}" style="color:#00d4ff">${email}</a></td></tr>
              <tr><td style="color:#6b7db3;padding:8px 0">Subject:</td><td style="color:#e8eaf6">${subject}</td></tr>
            </table>
            <div style="margin-top:24px;padding:20px;background:#0f1629;border-radius:8px;border-left:3px solid #00d4ff">
              <p style="color:#6b7db3;margin:0 0 8px;font-size:12px">Message:</p>
              <p style="color:#e8eaf6;margin:0;line-height:1.7">${message.replace(/\n/g, "<br>")}</p>
            </div>
            <p style="color:#6b7db3;font-size:12px;margin-top:20px">Received: ${new Date().toUTCString()}</p>
          </div>
        `,
      });

      // Auto-reply to sender
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Thanks for reaching out, ${name}!`,
        html: `
          <div style="font-family:monospace;background:#050810;color:#e8eaf6;padding:32px;border-radius:12px;max-width:600px">
            <h2 style="color:#00d4ff">Hey ${name},</h2>
            <p style="color:#e8eaf6;line-height:1.7">Thanks for your message! I've received it and will get back to you as soon as possible — usually within 24 hours.</p>
            <div style="margin:24px 0;padding:20px;background:#0f1629;border-radius:8px;border-left:3px solid #06ffa5">
              <p style="color:#6b7db3;margin:0 0 8px;font-size:12px">Your message:</p>
              <p style="color:#e8eaf6;margin:0;font-style:italic">"${message.substring(0, 200)}${message.length > 200 ? "..." : ""}"</p>
            </div>
            <p style="color:#e8eaf6">Best,<br><strong style="color:#00d4ff">Mohammad Aqib</strong><br><span style="color:#6b7db3;font-size:12px">MERN Stack Engineer — Dubai, UAE</span></p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("⚠️ Email sending failed (message still saved):", emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
      data: { id: contact._id, name: contact.name },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/contact  (admin — all messages)
const getAllContacts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      Contact.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Contact.countDocuments(),
    ]);

    res.json({
      success: true,
      data: contacts,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/contact/:id/read  (admin)
const markAsRead = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!contact) return res.status(404).json({ success: false, message: "Message not found." });
    res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/contact/:id  (admin)
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: "Message not found." });
    res.json({ success: true, message: "Message deleted." });
  } catch (err) {
    next(err);
  }
};

module.exports = { submitContact, getAllContacts, markAsRead, deleteContact };
