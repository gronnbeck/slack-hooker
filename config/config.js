var saveHandler = require('../saveHandler');
var timeSaver = require('../lib/save-handlers/timeSaver');
var lineSaver = require('../lib/save-handlers/lineSaver');


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
	]);
}