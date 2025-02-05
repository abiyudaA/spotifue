const router = require('express').Router()
const genresRoute = require ('./genresRoute')
const songsRoute = require ('./songsRoute')
const profilesRoute = require('./profilesRoute')
const usersRoute = require ('./usersRoute')
const userController = require ('../controllers/userController')
const isAuthenticated = require('../middlewares/authentication')


//register
router.get('/register', userController.userRegister)
router.post('/register', userController.saveUserRegister)
//login
router.get('/login', userController.userLogin)
router.post('/login', userController.loggedIn)
//middleware
// router.use(isAuthenticated)


//songs
router.use('/home', songsRoute)


module.exports = router;



