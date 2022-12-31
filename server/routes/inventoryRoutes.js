const express = require('express')
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
  .get(inventoryController.getAllItems)
  .post(inventoryController.createItem)
  .patch(inventoryController.updateItem)
  .delete(inventoryController.deleteItem)

module.exports = router;