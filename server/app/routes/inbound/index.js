'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var User = mongoose.model('User'); 

router.post('/', function(req, res){
	User.findOne({ phone: req.body.From }).exec()
	.then(function(user){
		if (user.lastStep.nextStep.length > 1) {
			user.sendText(req.body.Body);
			res.end();
		}
		else res.end();
	})
})
