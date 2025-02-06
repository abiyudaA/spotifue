const { Profile } = require("../models");

class ProfileController {
  static async getProfile(req, res) {
    try {
      const { UserId } = req.session;

      const getProfile = await Profile.findOne({
        where: {
          UserId,
        },
        include: [
          {
            model: User,
            include: [
              {
                model: Song,
                attributes: ["id", "title", "duration", "songImage"],
              },
            ],
          },
        ],
      });

      if (!getProfile) {
        throw new Error("User profile not found");
      }

      // Render the profile page with the user profile and the songs
      res.render("UserProfile.ejs", { getProfile });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = ProfileController;
