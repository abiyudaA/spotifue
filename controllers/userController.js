class UserController {
    static async userRegister (req, res) {
        try {
            
            res.render ('userRegister')
        } catch (err) {
            console.log (err)

            res.send (err)
        }
    }
}

module.exports = UserController;