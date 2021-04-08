const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  userId: String,
  supplierId: String,
  expectedObtained: Number,
  date: Number
});

module.exports = model('orders', orderSchema);
