const express = require("express");
const ProfileController = require("../controllers/profileController");
const router = express.Router();

router.get("/profiles", ProfileController.getProfile);

module.exports = router;
