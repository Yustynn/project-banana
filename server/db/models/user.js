'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

// OTHER MODELS
var Story = require('./story');

var schema = new mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  salt: {
    type: String
  },
  twitter: {
    id: String,
    username: String,
    token: String,
    tokenSecret: String
  },
  facebook: {
    id: String
  },
  google: {
    id: String
  },
  phone: {
    type: String,
    required: true, 
    unique: true
  },
  storiesWritten: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Story'
  },
  displayName: {
    type: String,
    required: true
  },
  pendingStories: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Story'
  },
  activeStory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story'
  },
  completedStories: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Story'
  },
  lastStep: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Step'
  }
});

// method to remove sensitive information from user objects before sending them out
schema.methods.sanitize = function() {
  return _.omit(this.toJSON(), ['password', 'salt']);
};

schema.methods.advanceStep = function(step){
  twilio.sendMessage({
    to: this.phone,
    from: ourPhone,
    body: step.text
  })
  if(step.nextStep.length > 1) {
    return;
  }
  waitPeriod = step.time;
  this.lastStep = step.nextStep[0]
  this.save()
  .then(function(updatedUser){
    setTimeout(advanceStep(updatedUser.lastStep), waitPeriod)
  })
}

schema.methods.handleText = function(input){
  
}

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function(plainText, salt) {
  var hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

schema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.salt = this.constructor.generateSalt();
    this.password = this.constructor.encryptPassword(this.password, this.salt);
  }
  next();

});


// STATICS
schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

// METHODS
schema.method('correctPassword', function(candidatePassword) {
  return encryptPassword(candidatePassword, this.salt) === this.password;
});

schema.methods.createStory = function(storyData) {
  storyData.storyAuthor = this._id;
  return Story.create(storyData);
}

var User = mongoose.model('User', schema);
module.exports = User;
