'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');

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
  
stepSchema.methods.linkFromPrev = function() {

  var _this = this; 
  var prevId = _this.prevStep; 

  return _this.constructor.findOne({ _id: prevId })
  .exec()
  .then(function(prevStep) {
    prevStep.nextStep = _this._id; 
    return prevStep.save() 
  })
  .then(function(updatedStep) {
    return _this.constructor.findOne({_id: updatedStep.nextStep})
    .exec()
  })
}

var Step = mongoose.model('Step', stepSchema);

module.exports = Step; 
