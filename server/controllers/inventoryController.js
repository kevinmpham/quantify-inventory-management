const Inventory = require('../models/Inventory');

const asyncHandler = require('express-async-handler');

const getAllItems = asyncHandler(async (req, res) => {
  const inventoryItems = await Inventory.find();
  /*   if (!items) {
      return res.status(400).json({ message: 'No items' });
    } */
  res.json(inventoryItems);
})

const createItem = asyncHandler(async (req, res) => {
  const { item, quantity, categories } = req.body;
  const newItem = { item, quantity, categories }
  const inventoryItem = await Inventory.create(newItem);
  res.send("created")
})

const updateItem = asyncHandler(async (req, res) => {
  const { _id: id, item, quantity, categories } = req.body;

  const inventoryItem = await Inventory.findById(id).exec();
  inventoryItem.item = item;
  inventoryItem.quantity = quantity;
  inventoryItem.categories = categories;

  const updatedInventoryItem = await inventoryItem.save();
  res.send("updated")
})

const deleteItem = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const inventoryItem = await Inventory.findById(id).exec();
  const deleted = (await inventoryItem.deleteOne());
  res.send("deleted");
})

module.exports = { getAllItems, createItem, updateItem, deleteItem }