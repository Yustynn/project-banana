'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose'); 
var _ = require('lodash');
var Story = mongoose.model('Story'); 




var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};


router.post('/create', ensureAuthenticated, function(req, res, next) {
  console.log('hit api/stories/create: ', req.body)
  Story.create({
    storyAuthor: req.user._id, 
    storyName: req.body.storyName
  })
  .then(function(newStory){
    return newStory.createHeadStep()
  })
  .then(function(headStep) {
    res.status(200).send(headStep._id); 
  })
  .then(null, next); 

})