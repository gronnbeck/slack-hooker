var express = require('express');
var mongoose = require('mongoose');
var app = express();

function ApiException (error) {
  this.type = error.type;
  this.code = error.code;
  this.userMessage = error.userMessage;
  this.developerMessage = error.developerMessage;
  return this;
}

function DatabaseException () {
  return new ApiException({
    type: 'DatabaseException',
    code: 2000,
    userMessage: 'Something is wrong with the application. Please retry later',
    developerMessage: 'Mongoose query seemed to fail. Is the database running?'
  });
}

function MalformedDataException () {
  return new ApiException({
    type: 'MalformedDataException',
    code: 3000,
    userMessage: 'Invalid data',
    developerMessage: 'Invalid data passed to the api'
  })
}

var Webhook = mongoose.model('Webhook', {
  owner: String,
  name: String,
  url: String
});

var isValid = function (d) {
  return d.owner != null && d.owner.length > 0 &&
    d.name != null && d.name.length > 0
}

app.get('/', function(req, res) {
  Webhook.find().exec(function(err, docs) {
      if (err) return res.status(500).send(new DatabaseException());
      else return res.send(docs);
  });
});

app.post('/', function(req, res) {
  var data = req.body;
  if (!isValid(data)) return res.status(400).send(new MalformedDataException);
  var webhook = new Webhook({
    owner: data.owner,
    name: data.name,
    url: data.url
  });
  webhook.save(function(err) {
    if (err) return res.status(500).send(new DatabaseException());
    else return res.send({
      success: true,
      _link: req.baseUrl
    });
  });
});

module.exports = app;
