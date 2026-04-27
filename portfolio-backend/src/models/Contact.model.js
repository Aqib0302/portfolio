const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true },
  subject: { type: String, required: true, trim: true, maxlength: 200 },
  message: { type: String, required: true, trim: true, maxlength: 2000 },
  ip: { type: String },
  isRead: { type: Boolean, default: false },
  repliedAt: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);
