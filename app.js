var express = require('express');
var bodyParser = require('body-parser');
var basicAuth = require('./lib/basic-auth');
var hooks = require('./hooks');
var saveHook = require('./hooks/save-hook');
var slackHook = require('./hooks/slack-hook');
var webAppApi = require('./routes/routes');
var webhooks = require('./lib/webhooks');
var mongoose = require('mongoose');
var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/slack-hooker');

app.use(basicAuth(['/hook/slack', '/hook/slack/save']));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', webAppApi);
app.use('/hook', [slackHook, saveHook]);
app.use('/resources/webhooks', webhooks);
app.use('/', express.static(__dirname + '/public'));

var server = app.listen(process.env.PORT || 8000, function() {
  console.log('listening on port %d', server.address().port);
});
