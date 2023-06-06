const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const message = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    message: String
  }, {
    timestamps: true
  })


const msgSchema = new Schema({
    club: {type: Schema.Types.ObjectId, ref: 'Club'},
    seller: {type: Schema.Types.ObjectId, ref: 'User'},
    buyer: {type: Schema.Types.ObjectId, ref: 'User'},
    messages: [message],
    offer: Number
  }, {
    timestamps: true
  });


  
  
  module.exports = mongoose.model('Messages', msgSchema);