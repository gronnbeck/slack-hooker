var _ = require('lodash');

function Commands() {
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

module.exports = Commands;