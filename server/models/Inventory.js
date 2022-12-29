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
  categories: [{
    type: String,
  }]
})

module.exports = mongoose.model("Inventory", InventorySchema)