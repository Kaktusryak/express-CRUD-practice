const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth')

const UserController = require('../controllers/user')

router.post('/signup', UserController.userSignUp)

router.post('/login', UserController.userLogIn)

router.delete('/:userId',checkAuth,UserController.userDeleteOne)

module.exports = router