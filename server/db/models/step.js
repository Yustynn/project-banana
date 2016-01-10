'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');
var twilio = require('twilio')('ACc2ba5d5926dbc98aa72dc1134da53f13', 'd18c90e94b8b5d9c27812be9a109ada4');

var stepSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  choice: {
    type: String,
    default: 'none'
  },
  nextStep:
    [{type: mongoose.Schema.Types.ObjectId,
    ref: 'Step'}]
  ,
  prevStep: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Step'
  },
  time: {
    type: Number,
    default: 0
  },
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story'
  }
})

stepSchema.methods.linkFromPrev = function(right = false) {
  var index = right ? 1 : 0;
  console.log('TOP', this.prevStep, '\n\n\n');
  var _this = this;
  var prevId = _this.prevStep;


  return _this.constructor.findById(prevId)
  .then(function(prevStep) {
    prevStep.nextStep[index] = _this._id;
    if(!prevStep.nextStep[0]) prevStep.nextStep[0] = _this.prevStep; // hacky
    prevStep.markModified('nextStep');
    return prevStep.save()
  })
  .then(function(updatedStep) {
    return _this.constructor.findOne({_id: updatedStep.nextStep[index]})
  })
}

var Step = mongoose.model('Step', stepSchema);

module.exports = Step;
