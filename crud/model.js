var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId; 
var db = mongoose.connect('mongodb://localhost/node-crud');

function validator(v) {
	return v.length > 0;
}

function fillZero(target) {
	return target > 9 ? target : '0' + target;
}

function getDate() {
	var current = new Date();
	var ymd = current.getFullYear() + '/' + (current.getMonth() + 1) + '/' + fillZero(current.getDate());
	var hm = ' ' + fillZero(current.getHours()) + ':' + fillZero(current.getMinutes());
	return ymd + hm;
}

var Post = new mongoose.Schema({
	text: {
		type: String,
		validate: [validator, 'Empty Error']
	},
	created: {
		type: String,
		default: getDate
	}
});

exports.Post = db.model('Post', Post);