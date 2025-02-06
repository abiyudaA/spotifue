const isAuthenticated = (req, res, next) => {
    console.log(req.session, 'iniii')
    if (!req.session.UserId) {
        return res.redirect ('/login')
    }
    next()
}

module.exports =
    isAuthenticated