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
  Story.findOne({ _id: req.params.story_id }).exec()
  .then(function(result){
    Step.findOne({ _id: result.startStep }).exec()
    .then(function(result){
      Step.findOne({ _id: result.nextStep }).exec()
      .then(function(start){
        req.user.advanceStep(start);
      })
    })
  })
})

router.post('/create', ensureAuthenticated, function(req, res, next) {
  console.log(req.body.storyName, req.user._id)
  console.log('\n\n\nHIT\n\n\n')
  Story.create({
    storyAuthor: req.user._id,
    storyName: req.body.storyName
  })
  .then(function(newStory){
    console.log(newStory);
    return newStory.createHeadStep()
  }, console.error.bind(console))
  .then(function(headStep) {
    console.log(headStep, "THIS IS THE HEAD STEP")
    res.status(200).send({
      stepId: headStep._id,
      storyId: headStep.story
    })
  })
  .then(null, next);

})
