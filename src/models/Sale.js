const { Schema, model } = require('mongoose');

const saleSchema = new Schema({
  userId: String,
  productId: String,
  clientId: String,
  quantity: Number,
  obtained: Number,
  profit: Number,
  discount: Number,
  type: String,
  date: Number
});

module.exports = model('sales', saleSchema);
