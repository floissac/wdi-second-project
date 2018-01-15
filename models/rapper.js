const mongoose = require('mongoose');

const rapperSchema = new mongoose.Schema({
  name: { type: String},
  image: { type: String},
  bio: { type: String }
});

module.exports = mongoose.model('Rapper', rapperSchema);
