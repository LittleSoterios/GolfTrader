const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const msgSchema = new Schema({
    club: {type: Schema.Types.ObjectId, ref: 'Club'},
    seller: {type: Schema.Types.ObjectId, ref: 'User'},
    buyer: {type: Schema.Types.ObjectId, ref: 'User'},
    messages: [String],
    offer: Number
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model('Messages', msgSchema);