//js
const express = require('express')
const {registerView, loginView, getPlayer } = require('../controllers/loginController')
const router = express.Router()
router.get('/register', registerView)
router.get('/login', loginView)
router.get('/player/:username', getPlayer)
module.exports = router