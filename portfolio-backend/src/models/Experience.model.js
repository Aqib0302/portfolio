const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
}, { _id: false });

const experienceSchema = new mongoose.Schema({
  order: { type: Number, default: 0 },
  role: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  location: { type: String, required: true },
  period: { type: String, required: true },
  type: { type: String, enum: ["Full-Time", "Freelance", "Internship", "Contract"], default: "Full-Time" },
  url: { type: String, default: "#" },
  status: { type: String, enum: ["current", "past"], default: "past" },
  stack: [{ type: String }],
  summary: { type: String, required: true },
  highlights: [{ type: String }],
  metrics: [metricSchema],
  isVisible: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Experience", experienceSchema);
