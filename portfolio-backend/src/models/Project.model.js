const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
}, { _id: false });

const projectSchema = new mongoose.Schema({
  order: { type: Number, default: 0 },
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, required: true },
  period: { type: String, required: true },
  type: { type: String, required: true },
  colorClass: { type: String, enum: ["accent", "accent2", "accent3"], default: "accent" },
  stack: [{ type: String }],
  summary: { type: String, required: true },
  highlights: [{ type: String }],
  metrics: [metricSchema],
  liveUrl: { type: String, default: null },
  githubUrl: { type: String, default: null },
  isVisible: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
