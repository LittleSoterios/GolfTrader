const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const clubSchema = require('./club')

const userSchema = new Schema({
  name: String,
  googleId: {
    type: String,
    required: true
  },
  email: String,
  avatar: String,
  inventory: [clubSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);