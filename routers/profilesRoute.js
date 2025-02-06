const express = require("express");
const ProfileController = require("../controllers/profileController");
const router = express.Router();

router.get("/", ProfileController.getProfile);
router.get("/:id", ProfileController.getProfileById);

module.exports = router;
