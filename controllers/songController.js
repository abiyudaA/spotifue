const { where, Op } = require('sequelize');
const {Song, Genre, User, Profile} = require('../models');

class SongController {
    static async home(req, res) {
        try {

            let {GenreId, title} = req.query
            
            
            let option = {
                include: [
                    Genre,
                    {
                        model:  User,
                        include: Profile
                    }
                ]
            }

            if (GenreId || title){
                option.where = {}
            }

            if (GenreId){
                option.where.GenreId = +GenreId
            }

            if (title){
                option.where.title = {
                    [Op.iLike]: `%${title}%`
                }
            }

            const songs = await Song.findAll(option)


            const genres = await Genre.findAll()
            const {profilePicture, name} = req.session
            // console.log(songs)

            // res.send(songs)
            res.render("home", {songs, genres, profilePicture, name});
        } catch (err) {
            console.log(err);

            res.send(err);
        }
    }

}

module.exports = SongController;