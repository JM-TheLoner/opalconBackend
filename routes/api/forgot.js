const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')

router.route('/')
    .put(userController.forgotPassword)

module.exports = router