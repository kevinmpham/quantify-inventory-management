const Inventory = require('../models/Inventory');
const asyncHandler = require('express-async-handler');


const getAllItems = asyncHandler(async (req, res) => {
  const inventory = await Inventory.find({ user: req.user });
  res.json(inventory);
})

const createItem = asyncHandler(async (req, res) => {
  const { item, quantity, category, user } = req.body;
  const newItem = { item, quantity, category, user }
  await Inventory.create(newItem);
  res.send("created")
})

const updateItem = asyncHandler(async (req, res) => {
  const { _id: id, item, quantity, category } = req.body;

  const inventoryItem = await Inventory.findById(id).exec();
  inventoryItem.item = item;
  inventoryItem.quantity = quantity;
  inventoryItem.category = category;

  await inventoryItem.save();
  res.send("updated")
})

const deleteItem = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const inventoryItem = await Inventory.findById(id).exec();
  (await inventoryItem.deleteOne());
  res.send("deleted");
})

module.exports = { getAllItems, createItem, updateItem, deleteItem }