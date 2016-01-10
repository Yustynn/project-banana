'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');
var twilio = require('twilio')('ACc2ba5d5926dbc98aa72dc1134da53f13', 'd18c90e94b8b5d9c27812be9a109ada4')

var stepSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  nextStep: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Step',
    default: []
  },
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
  
stepSchema.linkFromPrev = function() {

  var _this = this; 
  var prevId = _this.prevStep; 

  return this.findOne({ _id: prevId })
  .exec()
  .then(function(prevStep) {
    prevStep.nextStep = _this._id; 
    return prevStep.save() 
  })
  .then(function(updatedStep) {
    return this.findOne({_id: updatedStep.nextStep})
    .exec()
  })
}

var Step = mongoose.model('Step', stepSchema);

module.exports = Step; 
