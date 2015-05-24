var mongoose = require('mongoose');

var Message = mongoose.model('Message', {
  channel_name: String,
  timestamp: String,
  user_id: String,
  user_name: String,
  text: String
});

module.exports = Message;