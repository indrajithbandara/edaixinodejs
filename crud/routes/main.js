var model = require('../model');
var mongoose = require('mongoose');
var Deferred = require('JQDeferred');
var ObjectId = mongoose.Types.ObjectId; 
var Post = model.Post;

exports.index = function(req, res){
	Post.find().sort({created: -1}).exec(function(err, items){
		res.render('index', { title: 'Entry List', items: items });
	});
};

exports.form = function(req, res) {
	res.render('form', {title: 'New Entry'});
};

exports.tweet = function(req, res) {
	var newPost = new Post(req.body);
	console.log(req.body);
	newPost.save(function(err) {
		if (err) {
			console.log(err);
			res.json({status: 'fail'});
		} else {
			newPost.status = 'success';
			res.json(newPost);
		}
	});
};

exports.update = function(req, res) {

};

exports.delete = function(req, res) {
	Post.findById(ObjectId(req.body._id), function(err, post) {
		console.dir(post);
		//post.update({deleted: true}, function(err) {
		post.remove(function(err) {
			if (err) {
				console.log(err);
				res.json({'status': 'fail'});
			} else {
				res.json({'status': 'success'});
			}
		});
	});
};
