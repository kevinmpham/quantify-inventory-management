const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InventorySchema = new Schema({
  item: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  category: {
    type: String,
  },
  user: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Inventory", InventorySchema)