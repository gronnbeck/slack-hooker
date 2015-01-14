var mongoose = require('mongoose');

var FunnySegments = mongoose.model('FunnySegments', {
  type: String,
  user_name: String,
  user_id: String,
  start: String,
  end: String
});

module.exports = FunnySegments;