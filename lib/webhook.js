var mongoose = require('mongoose');

var Webhook = mongoose.model('Webhook', {
  owner: String,
  name: String,
  url: String
});

module.exports = Webhook;
