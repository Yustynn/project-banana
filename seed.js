/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var obamaId; 

var seedUsers = function() {

  var users = [{
    email: 'michelle@gmail.com',
    password: 'flotus', 
    displayName: 'Michelle'
  }, {
    email: 'obama@gmail.com',
    password: 'potus', 
    displayName: 'Barack'
  }];

  return User.createAsync(users);

};

var seedStories = function() {
  var stories = [{
    storyName: 'Sunny Day',
    storyAuthor: obamaId  
  }]

  return Story.createAsync(stories); 
}

var seedSteps = function() {
  var steps = [{
    text: 'HEAD', 
    story: ''
  }]
}


connectToDb.then(function() {

  seedUsers()
  .then(function(){
    return User.findOne({displayName: "Barack"}).exec()
  }).then(function(barackUser) {
    obamaId = barackUser._id; 
  }).then(function(){
    return seedStories()
  }).then(function(){
    return Story.findOne({storyName: "Sunny Day"})
  }).then(function(story){
    return story.createHeadStep(story._id)
    .then(function(headStep){
      return story.startStep = headStep._id; 
    })
  }).then(function(startStepId) {
    return Step.findOne({_id: startStepId}).exec()
  }).then(function(startStep){

  }).then(function() {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
  }).catch(function(err) {
    console.error(err);
    process.kill(1);
  });
});