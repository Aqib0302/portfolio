const router = require("express").Router();
const { trackVisit, getStats } = require("../controllers/stats.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/visit", trackVisit);            // Public — called by frontend on load
router.get("/", protect, getStats);           // Admin only

module.exports = router;
