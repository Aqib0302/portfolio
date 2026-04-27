const router = require("express").Router();
const { login, getMe } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: "Too many login attempts. Try again in 15 minutes." },
});

router.post("/login", loginLimiter, login);
router.get("/me", protect, getMe);

module.exports = router;
