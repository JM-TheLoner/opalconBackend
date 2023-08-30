const express = require('express')
const router = express.Router()
const servicesController = require('../../controllers/servicesController')
const verifyRoles = require('../../middleware/verifyRoles')
const ROLES_LIST = require('../../config/roles_list')

router.route('/')
    .get(servicesController.getAllServices)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), servicesController.createNewService)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), servicesController.updateService)
    .delete(verifyRoles(ROLES_LIST.Admin), servicesController.deleteService)

router.route('/:id')
    .get(servicesController.getService)

module.exports = router