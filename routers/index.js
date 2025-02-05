const router = require('express').Router()
const genresRoute = require ('./genresRoute')
const songsRoute = require ('./songsRoute')
const profilesRoute = require('./profilesRoute')
const usersRoute = require ('./usersRoute')
const userController = require ('../controllers/userController')
const { isAuthenticated } = require('../middlewares/authentication')


//register
router.get('/register', userController.userRegister)
router.post('/register', userController.saveUserRegister)
//login
router.get('/login', userController.userLogin)
//middleware
router.use(isAuthenticated)



module.exports = router;



