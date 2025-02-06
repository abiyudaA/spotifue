const { User, Song } = require("../models");

const isAuthenticated = (req, res, next) => {
  if (!req.session.UserId) {
    return res.redirect("/login");
  }
  next();
};

const checkRole = async (req, res, next) => {
  try {
    const { role, UserId } = req.session;
    const { songId } = req.params;

    if (!UserId) {
      throw new Error("No user is found");
    }

    if (role === "Listener") {
      res.redirect("/home/profile?error=Unauthorized");
    }

    const song = await Song.findOne({ where: { id: songId, UserId } });

    if (!song) {
      res.redirect("/home/profile?error=Song%20Not%20Found");
    }

    if (song.UserId !== UserId) {
      res.redirect("/home/profile?error=Unauthorized");
    }

    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  isAuthenticated,
  checkRole,
};
