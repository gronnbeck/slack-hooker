var express = require('express');
var mongoose = require('mongoose');
var saveHandler = require('./saveHandler')
var app = express();

var Message = mongoose.model('Message', {
  channel_name: String,
  timestamp: String,
  user_id: String,
  user_name: String,
  text: String
});

app.post('/slack', function(req, res) {

  var body = req.body;
  var token = body.token;

  if (token !== process.env.SLACK_TOKEN) {
    return res
    .status(500)
    .send({success: false, message: 'wrong token'})
  }

  if(saveHandler.isSaveCommand(body.text)) {
    saveHandler.handleSaveCommand(body);
  }

  var message = new Message({
    channel_name: body.channel_name,
    timestamp: body.timestamp,
    user_id: body.user_id,
    user_name: body.user_name,
    text: body.text
  });

  message.save(function(err) {
    if (err) {
      return res
      .status(500)
      .send({success: false});
    }

    return res
    .send({ success: true });
  });
});

app.get('/slack', function(req, res) {
  Message
  .find({})
  .find(function(err, messages) {
    if (err) {
      return res
      .status(500)
      .send({success: false});
    }
    return res
    .send({success: true, messages: messages })
  });
});

module.exports = app;
