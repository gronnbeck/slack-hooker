var FunnySegment = require('../../models/FunnySegments');

exports.handler = function (args, saveRequest) {
	if(args.length == 1) {
		saveLastMinutes(args[0], saveRequest, function(err) {
			if(err) {
				return err;
			}
		});
	}		
}

function saveLastLines(numberOfMinutes, saveRequest, callback) {
	var segment = new FunnySegment({
		type:"MINUTES",
		channel: saveRequest.channel_name,
		user_name: saveRequest.user_name,
		user_id: saveRequest.user_id,
		start: saveRequest.timestamp,
		end: numberOfMinutes
	});

	segment.save(function(err) {
		if (err) {
			callback(err);
		}
	});
}
