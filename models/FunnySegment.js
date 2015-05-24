var mongoose = require('mongoose');

var FunnySegment = mongoose.model('FunnySegment', {
  type: String,
  channel: String,
  user_name: String,
  user_id: String,
  start: String,
  end: String
});

module.exports = FunnySegment;