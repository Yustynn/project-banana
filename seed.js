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

require('babel/register');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Story = mongoose.model('Story');
var Step = mongoose.model('Step');


var obamaId;
var storyId;
var forkStep;

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
  var stories = {
    storyName: 'Matt"s Day in the Sun',
    storyAuthor: obamaId
  }

  return Story.create(stories);
}

var seedSteps = function() {
  var steps = [{
    text: 'HEAD',
    story: ''
  }]
}


// connectToDb.then(function() {

//   seedUsers()
//   .then(function(){
//     return User.findOne({displayName: "Barack"}).exec()
//   }).then(function(barackUser) {
//     obamaId = barackUser._id;
//   }).then(function(){
//     return seedStories()
//   }).then(function(){
//     return Story.findOne({storyName: "Sunny Day"})
//   }).then(function(story){
//     return story.createHeadStep(story._id)
//     .then(function(headStep){
//       return story.startStep = headStep._id;
//     })
//   }).then(function(startStepId) {
//     return Step.findOne({_id: startStepId}).exec()
//   }).then(function(startStep){

//   }).then(function() {
//     console.log(chalk.green('Seed successful!'));
//     process.kill(0);
//   }).catch(function(err) {
//     console.error(err);
//     process.kill(1);
//   });
// });


  User.findOne({displayName: "Barack"}).exec()
  .then(function(barackUser) {
    console.log('FOUND BARACK');
    obamaId = barackUser._id;
  }).then(function(){
    return seedStories()
  }).then(function(){
    return Story.findOne({storyName: "Sunny Day"})
  }).then(function(story){
    storyId = story._id;
    return story.createHeadStep(story._id)
    .then(function(headStep){
      story.startStep = headStep._id;
      return headStep;
    })
  }).then(function(startStep){
    return Step.create({
        text:   "It’s a sunny day. Life is pretty.",
        prevStep: startStep._id,
        time: 30000,
        story: storyId,
        choice: 'none'
      }).then(function(step){
        return step.linkFromPrev()
      })


  }).then(function(prevStep){
    return Step.create({
        text: "Oh no, Microsoft Excel keeps crashing!",
        prevStep: prevStep,
        time: 30000,
        story: storyId,
        choice: 'none'
      }).then(function(step){
        return step.linkFromPrev()
      })
  }).then(function(prevStep){
    return Step.create({
        text: "My boss is gonna kill me if I don’t get this spreadsheet done!",
        prevStep: prevStep,
        time: 30000,
        story: storyId,
        choice: 'none'
      }).then(function(step){
        return step.linkFromPrev()
      })
  }).then(function(prevStep){
    forkStep = prevStep;
    return Step.create({
        text: "You’re a genius! That totally worked!",
        prevStep: prevStep,
        time: 30000,
        story: storyId,
        choice: 'left'
      }).then(function(step){
        return step.linkFromPrev()
      })
  }).then(function(prevStep){
    return Step.create({
        text: "Life is pretty again.",
        prevStep: prevStep,
        time: 30000,
        story: storyId,
        choice: 'none'
      }).then(function(step){
        return step.linkFromPrev()
      })
  }).then(function(){
    return Step.create({
        text: "But it’s hard out there for ex-cons.",
        prevStep: forkStep,
        time: 30000,
        story: storyId,
        choice: 'right'
      }).then(function(step){
        return step.linkFromPrev(true)
      })
  }).then(function(prevStep){
    return Step.create({
        text: "I love my job.",
        prevStep: prevStep,
        time: 30000,
        story: storyId,
        choice: 'none'
      }).then(function(step){
        return step.linkFromPrev()
      })
  }).then(function() {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
  }).then(null, function(err) {
    console.error(err);
    process.kill(1);
  });
// });
