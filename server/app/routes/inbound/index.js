'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var User = mongoose.model('User'); 

router.post('/', function(req, res){
	if (req.body.Body !== "1" || req.body.Body !== "2"){
		console.log("ID-10T: Error between computer and keyboard.")
		res.end();
	}
	User.findOne({ phone: req.body.From }).exec()
	.then(function(user){

	})
})
