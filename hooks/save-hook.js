var express = require('express');
var app = express();
var FunnySegment = require('../models/FunnySegment');

app.post('/slack/save', function(req, res) {

  var body = req.body;
  var token = body.token;

  if (token !== process.env.SLACK_TOKEN) {
    return res
    .status(500)
    .send({success: false, message: 'wrong token'})
  }

  var segment = new FunnySegment({
    type:body.type,
    channel: body.channel_name,
    user_name: body.user_name,
    user_id: body.user_id,
    start: body.start ? body.start : body.timestamp,
    end: body.end
  });

  segment.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send({ success: false, error: err });    
    }
    else {
      res.send({ success: true });    
    }
  });
});

module.exports = app;