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

User.findOne({
    displayName: 'Barack'
  })
  .then(barack => {
    console.log('Barack is in the house.');
    return barack.createStory({
      storyName: 'Sunny Day'
    })
  })
  .then(story => {
    console.log('Started his life story');
    return seedStory(story, storyArr)
  })
  .then((lastStep) => {
    console.log('DATABASE SEEDED! :)')
  })

function seedStory(story, storyArr) {

  // create step, update prev step to ref new step
  function createStep(text, prevStepId) {
    console.log(text);
    return story.createStep({
        text: text,
        prevStep: prevStepId
      })
      .then(step => step.linkFromPrev);
  }

  // recursively walks through given array, creating promise chain for seed
  function seedHelper(arr, promForPrevStep) {
    if (!arr.length) return promForPrevStep;
    var el = arr[0];

    // if el is string, append to promise chain
    if (typeof el === 'string') {

      return promForPrevStep
        .then(prevStep => {
          promForNewStep = createStep(el, prevStep._id);
          return seedHelper(arr.slice(1), promForNewStep);
        })
    }
    // if el is string, append Promise.all for both left and right paths to promise chain
    if (typeof el === 'object') {
      return promForPrevStep
        .then(prevStep => {
          var leftArr = el.left,
            rightArr = el.right;

          var promForLeftStep = createStep(leftArr[0], prevStep._id),
            promForRightStep = createStep(rightArr[0], prevStep._id);

          var promForLeftPath = seedHelper(leftArr.slice(1), promForLeftStep),
            promForRightPath = seedHelper(rightArr.slice(1), promForRightStep);

          return Promise.all([promForLeftPath, promiseForRightPath])
        })
    }
  }

  // start actual seedStory function code
  var promiseForHeadStep = story.createHeadStep(storyArr[0]);

  return seedHelper(storyArr.slice(1), promiseForHeadStep)
}
