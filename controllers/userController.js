const { User } = require("../models");

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
      await User.create({
        email,
        username,
        password,
        role,
      });

      res.redirect("/register");
    } catch (err) {
      console.log(err);

      res.send(err);
    }

    static async userLogin (req, res) {
        try {

            res.render ('login')
        } catch (err) {
            console.log (err)

            res.send (err)
        }
    }

  }
  
}

module.exports = UserController;
