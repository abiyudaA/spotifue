// controllers/songController.js

const { Song, Genre, User, Profile } = require("../models");
const multer = require("multer");
const path = require("path");

class SongController {
  static async home(req, res) {
    try {
      let { GenreId, title } = req.query;

      let option = {
        include: [
          Genre,
          {
            model: User,
            include: Profile,
          },
        ],
      };

      if (GenreId || title) {
        option.where = {};
      }

      if (GenreId) {
        option.where.GenreId = +GenreId;
      }

      if (title) {
        option.where.title = {
          [Op.iLike]: `%${title}%`,
        };
      }

      const songs = await Song.findAll(option);
      const genres = await Genre.findAll();
      const { profilePicture, name } = req.session;

      // Pass the songs with songURL (MP3 file path) to the view
      res.render("home", { songs, genres, profilePicture, name });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async formAddSong(req, res) {
    try {
      res.render("songForm.ejs");
    } catch (error) {
      console.log(error);
    }
  }

  static async addSong(req, res) {
    try {
      const { UserId } = req.session;
      const { title, duration, GenreId } = req.body;

      // Handle the uploaded files
      const songImage = req.files.songImage[0].filename; // Get the filename of the uploaded song image
      const songURL = req.files.songURL[0].filename; // Get the filename of the uploaded MP3 file

      // Create the new song entry in the database
      await Song.create({
        title,
        duration,
        GenreId,
        UserId,
        songURL: songURL, // Store the MP3 file name
        songImage: songImage, // Store the image file name
      });

      res.redirect("/home");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  // Edit Song Method - Show the form with the current song data
  static async editSong(req, res) {
    try {
      const { songId } = req.params;

      // Fetch the song by ID
      const song = await Song.findOne({
        where: {
          id: songId,
        },
        include: [Genre],
      });

      if (!song) {
        return res.status(404).send("Song not found");
      }

      const genres = await Genre.findAll();
      res.render("editSongForm.ejs", { song, genres });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async updateSong(req, res) {
    try {
      const { songId } = req.params;
      const { title, duration, GenreId, songURL } = req.body;

      const songImage = req.file ? req.file.filename : null;

      const song = await Song.findOne({
        where: {
          id: songId,
        },
      });

      if (!song) {
        throw new Error("Song not found");
      }

      song.title = title;
      song.duration = duration;
      song.GenreId = GenreId;
      song.songURL = songURL;
      if (songImage) {
        song.songImage = songImage;
      }

      await song.save();

      // Redirect to the home page after successful update
      res.redirect("/home");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  // Delete Song Method
  static async deleteSong(req, res) {
    try {
      const { UserId } = req.session;
      const { songId } = req.params;

      const foundProfile = await Profile.findOne({
        where: {
          UserId,
        },
      });

      if (!foundProfile) throw new Error("User Profile not found");

      await Song.destroy({
        where: {
          UserId,
          id: songId,
        },
      });

      res.redirect("/profile");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = SongController;
