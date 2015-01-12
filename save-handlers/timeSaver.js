var _ = require('lodash');
var allowedSeperatorChars = [".", ":", "-"];


exports.handler = function (args) {
	var start = setDate(args[0]);
	var end = setDate(args[1]);
	console.log(start, "-", end);
	
}

function setDate(time) {
	var now = new Date(Date.now());
	_.forEach(allowedSeperatorChars, function(char) {
		if(_.contains(time, char)) {
			time = time.split(char);
		}
	});
	now.setHours(time[0]);
	now.setMinutes(time[1]);
	return Date.parse(now);
}