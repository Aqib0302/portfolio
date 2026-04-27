const Experience = require("../models/Experience.model");

// GET /api/experience
const getAll = async (req, res, next) => {
  try {
    const experiences = await Experience.find({ isVisible: true }).sort({ order: 1 });
    res.json({ success: true, data: experiences });
  } catch (err) { next(err); }
};

// POST /api/experience (admin)
const create = async (req, res, next) => {
  try {
    const exp = await Experience.create(req.body);
    res.status(201).json({ success: true, data: exp });
  } catch (err) { next(err); }
};

// PUT /api/experience/:id (admin)
const update = async (req, res, next) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!exp) return res.status(404).json({ success: false, message: "Experience not found." });
    res.json({ success: true, data: exp });
  } catch (err) { next(err); }
};

// DELETE /api/experience/:id (admin)
const remove = async (req, res, next) => {
  try {
    const exp = await Experience.findByIdAndDelete(req.params.id);
    if (!exp) return res.status(404).json({ success: false, message: "Experience not found." });
    res.json({ success: true, message: "Experience deleted." });
  } catch (err) { next(err); }
};

module.exports = { getAll, create, update, remove };
