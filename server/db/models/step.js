'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');

var stepSchema = {
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
}

mongoose.model('Step', stepSchema);

