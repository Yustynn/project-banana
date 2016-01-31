'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Step = mongoose.model('Step');

router.post('/', function(req, res){
	if (req.body.Body !== "1" && req.body.Body !== "2"){
		console.log("ID-10T: Error between computer and keyboard.")
		res.end();
	}
	User.findOne({ phone: req.body.From }).populate('lastStep').exec()
	.then(function(user){
		if (user.lastStep.nextStep.length === 1) {
			console.log("you don't have a choice here");
			res.end();
		}
		Step.findOne({ _id: user.lastStep.nextStep[req.body.Body] }).exec()
		.then(function(step){
			user.advanceStep(step);
		})
	})
})
