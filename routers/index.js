const router = require('express').Router()
const genresRoute = require ('./genresRoute')
const songsRoute = require ('./songsRoute')
const profilesRoute = require('./profilesRoute')
const usersRoute = require ('./usersRoute')
const userController = require ('../controllers/userController')
const { isAuthenticated } = require('../middlewares/authentication')


//login
router.get('/register', userController.userRegister)
router.get('/login', userController.userLogin)

router.use(isAuthenticated)




module.exports = router;



