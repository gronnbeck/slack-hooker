var express = require('express');
var bodyParser = require('body-parser');
var basicAuth = require('./lib/basic-auth');
var hooks = require('./hooks');
var mongoose = require('mongoose');
var saveHandler = require('./saveHandler');
var timeSaver = require('./save-handlers/timeSaver');
var lineSaver = require('./save-handlers/lineSaver');
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

app.use(basicAuth(['/hook/slack']));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/hook', hooks);
app.use('/js', express.static(__dirname + '/build/js'));
app.use('/', express.static(__dirname + '/public'));

var server = app.listen(process.env.PORT || 8000, function() {
  console.log('listening on port %d', server.address().port);
});
