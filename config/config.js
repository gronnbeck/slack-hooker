var saveHandler = require('../saveHandler');
var timeSaver = require('../lib/save-handlers/timeSaver');
var lineSaver = require('../lib/save-handlers/lineSaver');
var minutesSaver = require('../lib/save-handlers/minutesSaver');


exports.setUpCommands = function () {
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
	  {
	  	"flag": "m",
	  	"handler": minutesSaver.handler,
	  	"descriptor": "MINUTES"
	  }
	]);
}