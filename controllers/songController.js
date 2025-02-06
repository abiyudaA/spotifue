const {Song, Genre, User, Profile} = require('../models');

class SongController {
    static async home(req, res) {
        try {

            const songs = await Song.findAll({
                include: [
                    {
                        model: Genre
                    },
                    {
                        model: User   
                    }
                ]
            })

            // console.log(songs)

            res.render("home", {songs});
        } catch (err) {
            console.log(err);

            res.send(err);
        }
    }

}

module.exports = SongController;