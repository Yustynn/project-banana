var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');

var connectToDb = require('./server/db');

var User = mongoose.model('User');

var storyArr = [
  "It’s a sunny day. Life is pretty.",
  "Oh no, Microsoft Excel keeps crashing!",
  "My boss is gonna kill me if I don’t get this spreadsheet done!", {
    left: [
      "You’re a genius! That totally worked!",
      "Life is pretty again."
    ],
    right: [
      "But it’s hard out there for ex-cons.",
      "I love my job.",
      "There’s got to be another way!", {
        left: [
          "You’re a genius! That totally worked!",
          "Life is pretty again."
        ],
        right: [
          "You knew? You knew all along and you said nothing!"
        ]
      },
    ]
  }
];

user.findOne({
    displayName: 'Barack'
  })
  .then(barack => {
    return barack.createStory({
      storyName: 'Sunny Day'
    })
  })
  .then(story => {
    seedStory(story, storyArr)
  })
  .then(() => console.log('DATABASE SEEDED! :)'))

function seedStory(story, storyArr) {

  // recursively walks through given array, creating promise chain for seed
  function seedHelper(arr, promForPrevStep) {
    if (!arr.length) return promForPrevStep;

    var el = arr[0];
    // if el is string, append to promise chain
    if (typeof el === 'string') {
      return promForPrevStep
        .then(prevStep => {
          var stepData = createStepData(el, prevStep._id);
          promForNewStep = story.createStep(stepData);
          return seed(arr.slice(1), promForNewStep);
        })
    }
    // if el is string, append Promise.all for both left and right paths to promise chain
    if (typeof el === 'object') {
      return promForPrevStep
        .then(prevStep => {
          var leftArr = el.left,
            rightArr = el.right;

          var promForLeftStep = createStep(leftArr.unshift(), prevStep._id),
            promForRightStep = createStep(rightArr.unshift(), prevStep._id);

          var promForLeftPath = seedHelper(leftArr.left, promForLeftStep),
            promForRightPath = seedHelper(rightArr.right, promForRightStep);

          return Promise.all(promForLeftPath, promiseForRightPath)
        })
    }
  }

  function createStep(text, prevStepId) {
    return story.createStep({
        text: text,
        prevStep: prevStepId
      })
      .then(step => step.linkFromPrev);
  }

  storyArr = storyArr.slice(0); // Just to keep things functional / no side effects
  var promiseForHeadStep = story.createHeadStep(storyArr.unshift());

  return seedHelper(storyArr, promiseForHeadStep)
}
