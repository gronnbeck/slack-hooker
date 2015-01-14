var _ = require('lodash');
var saveCommand = "$save";
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
		command.handler(arguments, saveRequest);
	})
}

var Commands = function() {
	this.commands = {};
}

Commands.prototype.addCommand = function(obj) {
	this.commands[obj.descriptor] = {
		"flag": obj.flag,
		"handler": obj.handler
	}
}

Commands.prototype.getCommand = function(command) {
	return _.find(this.commands, {"flag":command});
}


