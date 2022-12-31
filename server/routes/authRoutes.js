const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.route('/login').post(authController.handleLogin);
router.route('/refresh').get()
router.route('/logout').post(authController.handleLogout);

module.exports = router