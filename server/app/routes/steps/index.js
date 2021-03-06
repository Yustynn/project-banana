'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var _ = require('lodash');
var Step = mongoose.model('Step');




var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.get('/:stepId', function(req, res, next) {
   Step.findById(req.params.stepId).exec()
   .then(function(step) {
     res.status(200).send(step); 
   })
})

router.post('/create', ensureAuthenticated, function(req, res, next) {

  var time = req.body.time || 0;

  Step.create({
    choice: req.body.choice,
    text: req.body.text,
    prevStep: req.body.prevStep,
    time: time,
    story: req.body.storyId
  })
  .then(function(step) {
    if (step.choice === 'right') return step.linkFromPrev(step.choice);
    return step.linkFromPrev();
  })
  .then(function(step){
    res.status(200).send({
      stepId: step._id,
      storyId: step.story
    });
  })
  .then(null, next)


})
