const { Schema, model } = require('mongoose');

const clientSchema = new Schema({
  userId: String,
  name: String,
  location: String,
  contact: String
});

module.exports = model('clients', clientSchema);
