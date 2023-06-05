const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clubSchema = new Schema({
  brand: String,
  model: String,
  condition: [Number],
  value: Number,
  pictures: Buffer,
  forSale: Boolean,
  user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
  timestamps: true
});

module.exports = mongoose.model('Club', clubSchema);