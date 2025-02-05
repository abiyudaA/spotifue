const router = require('express').Router()
const genresRoute = require ('./genresRoute')
const songsRoute = require ('./songsRoute')
const profilesRoute = require('./profilesRoute')
const usersRoute = require ('./usersRoute')
const userController = require ('../controllers/userController')

// router.use('/genres', genresRoute)
// router.use('/songs', songsRoute)
// router.use('/profiles', profilesRoute)
//login
router.get('/register', userController.userRegister)
// router.get('/login', userController.userLogin)



module.exports = router;



