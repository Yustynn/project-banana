'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose'); 
var _ = require('lodash');
var Story = mongoose.model('Story'); 
var Step = mongoose.model('Step');

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.get('/:story_id', function(req, res){
  console.log(req.params.story_id);
  Story.findOne({ _id: req.params.story_id }).exec()
  .then(function(result){
    Step.findOne({ _id: result.startStep }).exec()
    .then(function(result){
      Step.findOne({ _id: result.nextStep }).exec()
      .then(function(start){
        console.log(req.user);
        console.log(start.text);
        req.user.advanceStep(start);
        res.status(200).send(start);
      })
    })
  })
});

router.get('/', function(req, res, next){
  Story.find({}).exec()
  .then(function(stories){
    res.status(200).send(stories); 
  })
  .then(null, next); 
});

router.post('/create', ensureAuthenticated, function(req, res, next) {
  Story.create({
    storyAuthor: req.user._id, 
    storyName: req.body.storyName,
    description: req.body.description
  })
  .then(function(newStory){
    return newStory.createHeadStep()
  })
  .then(function(headStep) {
    res.status(200).send({
      stepId: headStep._id, 
      storyId: headStep.story
    }) 
  })
  .then(null, next); 

})