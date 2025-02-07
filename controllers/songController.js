// controllers/songController.js

const { Song, Genre, User, Profile } = require("../models");
const multer = require("multer");
const path = require("path");
const { where, Op } = require("sequelize");

class SongController {
  static async home(req, res) {
    try {
      let { GenreId, title, song } = req.query;

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
      const artist = await User.findAll({
        where:{
          role: "Artist"
        },
        include: Profile
      })
      const listener = await User.findAll({
        where:{
          role: "Listener"
        },
        include: Profile
      })
      const { ProfileId, name } = req.session;
      const profile = await Profile.findByPk(ProfileId)
      // console.log(artist)
      // console.log(profilePicture)
      // Pass the songs with songURL (MP3 file path) to the view
      // console.log(artist, 'ini monyet')
console.log(profile, 'ini prof')
      res.render("home", { songs, genres, profile, artist, listener, song });
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
      let song = await Song.create({
        title,
        duration,
        GenreId,
        UserId,
        songURL: songURL, // Store the MP3 file name
        songImage: songImage, // Store the image file name
      }, {
        returning: true
      });
      // console.log (song)
      let {title: songtitle} = song
      res.redirect(`/home?song=${songtitle}`);
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

      let deleted = await Song.findOne({
        include: User,
        where:{
          id: songId
        }
      })
      
      // console.log(deleted)

       await Song.destroy({
        where: {
          UserId,
          id: songId,
        }
      });

      let {title} = deleted

      res.redirect(`/profile?deleted=${title}`);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = SongController;
