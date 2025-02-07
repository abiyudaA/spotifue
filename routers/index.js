const router = require("express").Router();
const songsRoute = require("./songsRoute");
const profilesRoute = require("./profilesRoute");
const usersRoute = require("./usersRoute");
const userController = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/authentication");

router.get('/', userController.landingPage)

//register
router.get("/register", userController.userRegister);
router.post("/register", userController.saveUserRegister);
//login
router.get("/login", userController.userLogin);
router.post("/login", userController.loggedIn);
//middleware
router.use(isAuthenticated);

router.get("/logout", userController.logout)

//songs
router.use("/home", songsRoute);
router.use("/profile", profilesRoute);

module.exports = router;
