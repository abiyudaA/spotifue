const { comparePassword } = require("../helpers/helper");
const { User, Profile } = require("../models");

class UserController {
    static async userRegister(req, res) {
        try {
            res.render("userRegister");
        } catch (err) {
            console.log(err);

            res.send(err);
        }
    }

    static async saveUserRegister(req, res) {
        try {
            const { email, username, password, role } = req.body;

            if (!email || !username || !password || !role) {
                return res.status(400).send("All fields are required");
            }

            // Create user in database
            let user = await User.create({
                email,
                username,
                password,
                role,
            }, {returning: true});

            await Profile.create({
                UserId: user.id,
                profileName: 'username' + new Date ().getTime(),
                bio: `Hello! I'm Using Spotifue now :)`,
                profilePicture: 'https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg',
            });

            res.redirect("/login");
        } catch (err) {
            console.log(err);

            res.send(err);
        }

    }

    static async userLogin(req, res) {
        try {

            res.render('login')
        } catch (err) {
            console.log(err)

            res.send(err)
        }
    }

    static async loggedIn(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({
                where:{
                    username
                }
            })

            if (!user) {return res.send ('username incorrect')}

            if (!comparePassword(password, user.password)) {
                return res.send ('password incorect!!')
            }
            
            // console.log(req.session)
            req.session.UserId = user.id
            req.session.role = user.role
            res.redirect ('/home')
        } catch (err) {
            console.log(err)

            res.send(err)
        }
    }

}

module.exports = UserController;
