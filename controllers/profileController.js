const { Profile } = require("../models");

class ProfileController {
  static async getProfile(req, res) {
    try {
      const { UserId,role } = req.session;
      let option = {
        where: {
          UserId,
        }
      }

      if (role === "Artist") {
        option.include = [
          {
            model: User,
            include: [
              {
                model: Song,
                attributes: ["id", "title", "duration", "songImage"],
              },
            ],
          },
        ]
      }

      const getProfile = await Profile.findOne(option);

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

  static async getProfileById(req, res) {
    try {
      let {id} = req.params;
      let profile = await Profile.findByPk(+id)

      // Render the profile page with the user profile and the songs
      res.render("UserProfileById.ejs", { profile });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = ProfileController;
