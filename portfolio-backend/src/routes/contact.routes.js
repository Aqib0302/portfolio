const router = require("express").Router();
const { body } = require("express-validator");
const rateLimit = require("express-rate-limit");
const { submitContact, getAllContacts, markAsRead, deleteContact } = require("../controllers/contact.controller");
const { protect } = require("../middleware/auth.middleware");

// Strict rate limit for contact form — 5 submissions per hour
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many messages sent. Please wait before trying again." },
});

const contactValidation = [
  body("name").trim().notEmpty().withMessage("Name is required.").isLength({ max: 100 }),
  body("email").isEmail().withMessage("Valid email is required.").normalizeEmail(),
  body("subject").trim().notEmpty().withMessage("Subject is required.").isLength({ max: 200 }),
  body("message").trim().notEmpty().withMessage("Message is required.").isLength({ min: 10, max: 2000 }),
];

// Public
router.post("/", contactLimiter, contactValidation, submitContact);

// Admin protected
router.get("/", protect, getAllContacts);
router.patch("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteContact);

module.exports = router;
