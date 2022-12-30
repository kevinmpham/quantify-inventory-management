const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')


router.route('/')
  .post(usersController.createUser)
  .patch(usersController.updateUser)

module.exports = router