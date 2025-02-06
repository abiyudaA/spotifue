const express = require("express");
const ProfileController = require("../controllers/profileController");
const upload = require("../helpers/multer");
const router = express.Router();

router.get("/", ProfileController.getProfile);

router.get("/edit", ProfileController.editProfile);
router.post("/edit", upload.single("profilePicture"),ProfileController.saveEditedProfile);
router.get("/:id", ProfileController.getProfileById);

module.exports = router;
