const router = require("express").Router();
const { getAll, create, update, remove } = require("../controllers/experience.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/", getAll);                      // Public — frontend fetches this
router.post("/", protect, create);            // Admin only
router.put("/:id", protect, update);          // Admin only
router.delete("/:id", protect, remove);       // Admin only

module.exports = router;
