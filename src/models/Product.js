const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  userId: String,
  orderId: String,
  name: String,
  char1: String,
  char2: String,
  initialStock: Number,
  retailPrice: Number,
  wholesalePrice: Number,
  purchasePrice: Number
});

module.exports = model('products', productSchema);
