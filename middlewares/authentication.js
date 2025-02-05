const isAuthenticated = (req, res, next) => {
    if (!req.session.UserId) {
        return res.redirect ('/login')
    }
    next()
}

module.exports =
    isAuthenticated