const Stat = require("../models/Stat.model");
const Contact = require("../models/Contact.model");

// POST /api/stats/visit  (called by frontend on load)
const trackVisit = async (req, res, next) => {
  try {
    await Stat.findOneAndUpdate(
      {},
      { $inc: { totalVisits: 1 }, lastVisit: new Date() },
      { upsert: true }
    );
    res.json({ success: true });
  } catch (err) { next(err); }
};

// GET /api/stats  (admin)
const getStats = async (req, res, next) => {
  try {
    const stat = await Stat.findOne();
    const unreadMessages = await Contact.countDocuments({ isRead: false });
    res.json({
      success: true,
      data: {
        totalVisits: stat?.totalVisits || 0,
        totalContacts: stat?.totalContacts || 0,
        unreadMessages,
        lastVisit: stat?.lastVisit || null,
      },
    });
  } catch (err) { next(err); }
};

module.exports = { trackVisit, getStats };
