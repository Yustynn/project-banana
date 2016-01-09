'use strict';
var mongoose = require('mongoose');
var Story = mongoose.model('Story'); 
var User = mongoose.model('User');
var Step = mongoose.model('Step'); 

var storySchema = {
  storyName: {
    type: String,
    required: true
  },
  startStep: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Step', 
    required: true
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
}

storySchema.statics.createHeadStep = function(storyId) {
  return Step.create({
    text: 'DEFAULT_HEADER', 
    prevStep: null, 
    story: storyId 
  })
}
  

mongoose.model('Story', storySchema); 

