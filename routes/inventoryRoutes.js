const express = require('express')
const router = express.Router();

const inventoryController = require('../controllers/inventoryController');

router.route('/')
  .get(inventoryController.getAllItems)
  .post(inventoryController.createNewItem)
  .patch(inventoryController.updateItem)
  .delete(inventoryController.deleteItem)

module.exports = router;