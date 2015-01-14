var _ = require('lodash');
var allowedSeperatorChars = [".", ":", "-"];
var FunnySegment = require('../models/FunnySegments');

exports.handler = function (args, saveRequest) {
	var start = setDate(args[0]);
	var end = setDate(args[1]);

	var segment = new FunnySegment({
		type:"TIME",
		user_name: saveRequest.user_name,
		user_id: saveRequest.user_id,
		start: start,
		end: end
	});

	segment.save(function(err) {
		if (err) {
			console.log("ERROR SAVING TIME segment");
		}
		else {
			console.log("SUCCESS SAVING TIME SEGMENT");
		}
	});
	
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