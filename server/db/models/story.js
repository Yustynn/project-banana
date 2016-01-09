'use strict';
var mongoose = require('mongoose');
var Story = require('./story'); 
var User = require('./user');

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

mongoose.model('Story', storySchema); 

