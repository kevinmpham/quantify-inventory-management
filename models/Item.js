const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InventorySchema = new Schema({
  name: {
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

module.export = mongoose.model("Inventory", InventorySchema)