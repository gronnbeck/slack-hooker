var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var messageModel = require('./models/Message');
var saveHandler = require('./saveHandler');
var timeSaver = require('./timeSaver');
var lineSaver = require('./lineSaver');
var app = express();

saveHandler.setCommands([
  {
    "flag": "t", 
    "handler": timeSaver.handler,
    "descriptor": "TIME"
  },
  { 
    "flag": "l",
    "handler": lineSaver.handler,
    "descriptor": "LINE"
  },
]);

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/slack-hooker');

var Message = messageModel;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/hook/slack', function(req, res) {

  var body = req.body;
  var token = body.token;
  var message = body.text
  if(saveHandler.isSaveCommand(message)) {
    saveHandler.handleSaveCommand(message);
  }

  if (token !== process.env.SLACK_TOKEN) {
    return res
      .status(500)
      .send({success: false, message: 'wrong token'})
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

app.get('/hook/slack', function(req, res) {
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

var server = app.listen(process.env.PORT || 8000, function() {
  console.log('listening on port %d', server.address().port);
});
