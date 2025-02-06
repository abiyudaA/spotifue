const { where, Op } = require('sequelize');
const {Song, Genre, User, Profile} = require('../models');

class ProfileController {
    static async profileById(req, res) {
        try {

            const {UserId} = req.session

            let profile = await Profile.findOne({
                where:{
                    UserId: UserId
                }
            })
            
            res.render('profilePage', {profile})
            
        } catch (err) {
            console.log(err);

            res.send(err);
        }
    }

}

module.exports = ProfileController;