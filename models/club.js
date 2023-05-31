const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clubSchema = new Schema({
  model: String,
  condition: [String],
  value: Number,
  pictures: [String]
}, {
  timestamps: true
});

module.exports = clubSchema;