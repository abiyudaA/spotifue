const express = require ('express')
const router = express.Router()
const SongController = require ('../controllers/songController')

router.get('/', SongController.home)

module.exports = router;