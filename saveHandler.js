var _ = require('lodash');
var saveCommand = "$save";
var Commands = require('./utils/Commands');
var commands;


exports.isSaveCommand = function (msg) {
	if(msg.indexOf(saveCommand) > -1) {
		return true;
	}
	else {
		return false;
	}
}

exports.setCommands = function (allowedCommands) {
	commands = new Commands();
	_.forEach(allowedCommands, function(obj) {
		commands.addCommand(obj);
	});
}

exports.handleSaveCommand = function(saveRequest) {
	var msg = saveRequest.text;
	var array  = msg.split("-");
	array.shift();
	_.forEach(array, function(strValue) {
		var arguments = strValue.split(" ");
		var command = commands.getCommand(arguments[0]); 
		if(!command) {
			return;
		}
		arguments.shift();
		var respons = command.handler(arguments, saveRequest);
		if (respons) {
			console.log("An error happend", respons);
		}
	})
}




