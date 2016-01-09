'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Step = mongoose.model('Step'); 

var storySchema = new mongoose.Schema({

  storyName: {
    type: String,
    required: true
  },
  startStep: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Step'
  }, 
  storyAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, 
  }, 
  published: {
    type: Boolean, 
    default: false
  }

})

storySchema.methods.createHeadStep = function() {
  return Step.create({
    text: 'DEFAULT_HEADER', 
    prevStep: null, 
    story: this._id 
  })
}
  

mongoose.model('Story', storySchema); 

