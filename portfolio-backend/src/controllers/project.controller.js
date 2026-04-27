const Project = require("../models/Project.model");

// GET /api/projects
const getAll = async (req, res, next) => {
  try {
    const projects = await Project.find({ isVisible: true }).sort({ order: 1 });
    res.json({ success: true, data: projects });
  } catch (err) { next(err); }
};

// GET /api/projects/:id
const getOne = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found." });
    res.json({ success: true, data: project });
  } catch (err) { next(err); }
};

// POST /api/projects (admin)
const create = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) { next(err); }
};

// PUT /api/projects/:id (admin)
const update = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ success: false, message: "Project not found." });
    res.json({ success: true, data: project });
  } catch (err) { next(err); }
};

// DELETE /api/projects/:id (admin)
const remove = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found." });
    res.json({ success: true, message: "Project deleted." });
  } catch (err) { next(err); }
};

module.exports = { getAll, getOne, create, update, remove };
