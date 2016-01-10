// 'use strict';
// var mongoose = require('mongoose');
// var _ = require('lodash');
// var twilio = require('twilio')('ACc2ba5d5926dbc98aa72dc1134da53f13', 'd18c90e94b8b5d9c27812be9a109ada4')

// var stepSchema = new mongoose.Schema({
//   text: {
//     type: String,
//     required: true
//   },
//   nextStep: {
//     type: [mongoose.Schema.Types.ObjectId],
//     ref: 'Step',
//     default: []
//   },
//   prevStep: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Step'
//   },
//   time: {
//     type: Number,
//     default: 0
//   }, 
//   story: {
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'Story'
//   }
// })
  
// stepSchema.methods.linkFromPrev = function() {

//   var _this = this; 
//   var prevId = _this.prevStep; 

//   return _this.constructor.findOne({ _id: prevId })
//   .exec()
//   .then(function(prevStep) {
//     prevStep.nextStep = _this._id; 
//     return prevStep.save() 
//   })
//   .then(function(updatedStep) {
//     return _this.constructor.findOne({_id: updatedStep.nextStep})
//     .exec()
//   })
// }

// var Step = mongoose.model('Step', stepSchema);

// module.exports = Step; 





// NEW STUFF!!! 

'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');
var twilio = require('twilio')('ACc2ba5d5926dbc98aa72dc1134da53f13', 'd18c90e94b8b5d9c27812be9a109ada4')

var stepSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  nextStep: 
    [{type: mongoose.Schema.Types.ObjectId,
    ref: 'Step'}]
  ,
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
})
  
stepSchema.methods.linkFromPrev = function(index) {

  index = index || 0; 
  console.log('the index is: ', index)

  console.log('TOP', this.prevStep); 
  var _this = this; 
  var prevId = _this.prevStep; 

  console.log(_this.constructor.findOne); 

  return _this.constructor.findById(prevId)
  .exec()
  .then(function(prevStep) {
    console.log('found prevStep: ', prevStep); 
    prevStep.nextStep[index] = _this._id; 
    if(!prevStep.nextStep[0]) prevStep.nextStep[0] = _this._id;  
    console.log('array: ', prevStep.nextStep)
    return prevStep.save()
  })
  .then(function(updatedStep) {
    console.log('updatedStep: ', updatedStep.nextStep)
    return _this.constructor.findOne({_id: updatedStep.nextStep[index]})
    .exec()
  })
}

var Step = mongoose.model('Step', stepSchema);

module.exports = Step; 