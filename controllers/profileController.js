const { Profile, User, Song } = require("../models");
const multer = require("multer");
const path = require("path");
const { where, Op } = require("sequelize");

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
      console.log(getProfile)
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
  static async editProfile(req, res) {
    try {
      let {UserId} = req.session
      let profile = await Profile.findOne({
        where: {UserId}
      })
      res.render('formProfile', {profile})
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
  static async saveEditedProfile(req, res) {
    try {
        let { UserId } = req.session;
        let { profileName, bio } = req.body;
        let profilePicture = req.file ? req.file.filename : null; // Ambil nama file jika ada

        let updateData = { profileName, bio };
        if (profilePicture) {
            updateData.profilePicture = profilePicture;
        }

        await Profile.update(updateData, { where: { UserId } });

        console.log("Updated Profile:", updateData);
        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating profile.");
    }
}

}

module.exports = ProfileController;
