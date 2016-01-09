'use strict';
var mongoose = require('mongoose');
var User = require('./user');
var Step = require('./step');

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

storySchema.method.createHeadStep = function(text) {
  return Step.create({
    text: text || 'DEFAULT_HEADER',
    prevStep: null,
    story: this._id
  })
}

storySchema.method.createStep = function(stepData) {
    stepData.story = this._id;
    return Step.create(stepData);
}

var Story = mongoose.model('Story', storySchema);

module.exports = Story; 
