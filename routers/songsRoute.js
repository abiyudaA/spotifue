const express = require("express");
const router = express.Router();
const SongController = require("../controllers/songController");
const upload = require("../helpers/multer");
const { checkRole } = require("../middlewares/authentication");

router.get("/", SongController.home);

router.get("/add", SongController.formAddSong);

router.post(
  "/add",
  upload.fields([
    { name: "songImage", maxCount: 1 },
    { name: "songURL", maxCount: 1 },
  ]),
  SongController.addSong
);

router.get("/edit/:songId", checkRole, SongController.editSong);
router.post("/edit/:songId", upload.single("image"), SongController.updateSong);

router.get("/delete/:songId", checkRole, SongController.deleteSong);

module.exports = router;
