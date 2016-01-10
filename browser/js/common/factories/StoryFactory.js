app.factory('StoryFactory', function($http) {
  var extractData = data => data.data;
  var incompletePaths = [];
  // [ {id: ...} ]
  return {
    createNewStory: function(title, description){
      return $http.post('/api/stories/create', {storyName: title, description: description})
        .then(extractData);
    }, 
    createNewStep: function(text, prevStep, storyId, time) {
      return $http.post('/api/steps/create', {text: text, prevStep: prevStep, storyId: storyId, time: time})
        .then(extractData);
    },
    goToPrevStep: function(storyId, stepId) {
      return $http.get('api/steps/:stepId')
        .then(extractData);
    },
    getAllStories: function() {
      return $http.get('/api/stories')
        .then(extractData);
    }, 
    beginStory: function(id) {
      return $http.get('/api/stories/' + id)
        .then(extractData);
    },
    getIncompletePaths: function() {
      // Then, do a backend request for that ID so that we can get the 
          // prevID & choice properties on that step

      //We make backend request
      //We get prevId
      //We get content
      return incompletePaths;
    },
    getLastIncompletePath: function(){
      return incompletePaths[incompletePaths.length-1]
    },
    addToIncompletePaths: function(step) {
      incompletePaths.push(step);
    } 
  };
})