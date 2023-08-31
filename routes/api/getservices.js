const express = require('express')
const router = express.Router()
const servicesController = require('../../controllers/servicesController')
const verifyRoles = require('../../middleware/verifyRoles')
const ROLES_LIST = require('../../config/roles_list')

router.route('/')
    .get(servicesController.getAllServices)
router.route('/:id')
    .get(servicesController.getService)

module.exports = router