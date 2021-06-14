const { Schema, model } = require('mongoose');

const supplierSchema = new Schema({
  userId: String,
  name: String,
  location: String,
  contact: String,
});

module.exports = model('suppliers', supplierSchema);
