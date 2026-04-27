const router = require("express").Router();
const { getAll, getOne, create, update, remove } = require("../controllers/project.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/", getAll);                      // Public
router.get("/:id", getOne);                   // Public
router.post("/", protect, create);            // Admin only
router.put("/:id", protect, update);          // Admin only
router.delete("/:id", protect, remove);       // Admin only

module.exports = router;
