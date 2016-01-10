app.factory('StoryFactory', function($http) {
  var extractData = data => data.data;
  return {
    createNewStory: function(title, description){
      return $http.post('/api/stories/create', {storyName: title, description: description})
        .then(extractData);
    }, 
    createNewStep: function(text, prevStep, storyId, time, choice) {
      return $http.post('/api/steps/create', {text: text, prevStep: prevStep, storyId: storyId, time: time, choice: choice})
        .then(extractData);
    },
    goToPrevStep: function(storyId, stepId) {
      return $http.get('api/stories/:storyId/steps/:stepId')
        .then(extractData)
    }
  };
})