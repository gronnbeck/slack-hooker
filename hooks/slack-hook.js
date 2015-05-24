var express = require('express');
var _ = require('lodash');
var Q = require('q');
var request = require('superagent');
var Webhook = require('../lib/webhook');
var app = express();
var Message = require('../models/Message');

function throttleExecute(task, tasks) {
  task.execute()
  .then(function() {
    // should we log task completed successfully?
  })
  .catch(function(){
    // we should retry tasks too
    console.log('should log these errors or report them somehwere')
  })
  .finally(function() {
    if (tasks.length == 0) return;
    var nextTask = tasks.pop();
    throttleExecute(nextTask);
  });
}

function throttle(tasks, noOfConcurrentTasks) {
  noOfConcurrentTasks = noOfConcurrentTasks || 1;
  var startTasks = _.slice(tasks, 0, noOfConcurrentTasks + 1)
  var restTasks = _.slice(noOfConcurrentTasks + 1, tasks.length);
  _.forEach(startTasks, function(task) {
    throttleExecute(task, restTasks);
  })
}

var WEBHOOK_KEY = process.env.WEBHOOK_KEY;
function RequestTask (url, data) {
  this.execute = function() {
    var def = Q.defer();

    request.post(url + '?key=' + WEBHOOK_KEY)
      .send(data)
      .set('Content-Type', 'application/json')
      .end(function(err) {
        if (err) return def.reject();
        else return def.resolve();
      });

    return def.promise;
  }

  return this;
}


function runWebhooks (data) {
  var MAX_NUM_OF_REQ = 10;
  Webhook.find().exec(function(err, docs) {
    if (err) throw new Error('DatabaseException');
    var tasks = _.map(docs, function (doc) {
      return new RequestTask(doc.url, data);
    });
    throttle(tasks, MAX_NUM_OF_REQ);
  });
}

app.post('/slack', function(req, res) {

  var body = req.body;
  var token = body.token;

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

    res.send({ success: true });

    runWebhooks(message);
  });
});

module.exports = app;