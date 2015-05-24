var express = require('express');
var app = express();
var Message = require('../models/Message');

app.get('/log', function(req, res) {
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
