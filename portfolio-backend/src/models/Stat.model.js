const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
  totalVisits: { type: Number, default: 0 },
  totalContacts: { type: Number, default: 0 },
  lastVisit: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model("Stat", statSchema);
