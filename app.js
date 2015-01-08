var express = require('express');
var bodyParser = require('body-parser');
var basicAuth = require('./lib/basic-auth');
var hooks = require('./hooks');
var mongoose = require('mongoose');
var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/slack-hooker');

app.use(basicAuth(['/hook/slack']));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/hook', hooks);
app.use('/js', express.static(__dirname + '/build/js'));
app.use('/', express.static(__dirname + '/public'));

var server = app.listen(process.env.PORT || 8000, function() {
  console.log('listening on port %d', server.address().port);
});
