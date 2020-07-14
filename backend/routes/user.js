const express = require("express")
const router = express.Router()
const userController = require('../controllers/user')
const passport = require('passport')

const authentication = passport.authenticate("jwt", { session: false })

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/profile/:id', authentication, userController.getProfile)

module.exports = router