app.config(function($stateProvider) {

  $stateProvider.state('simpleStep', {
    url: '/stories/:storyId/steps/:stepId',
    templateUrl: 'js/simpleStep/simple-step.html',
    controller: 'SimpleStepCtrl'
  });

});

app.controller('SimpleStepCtrl', function($scope, $state, $stateParams, StoryFactory) {
  $scope.timeInMinutes = 0;

  $scope.createNewStep = function() {
    // Params are.. text, prevStep, storyId, time
    StoryFactory.createNewStep($scope.content, $stateParams.stepId, $stateParams.storyId, $scope.timeInMinutes)
      .then(function(responseData) {
        $rootScope.isFirstStep = false;
        $state.go('simpleStep', {
          stepId: responseData.stepId,
          storyId: responseData.storyId
        });
      }).then(null, function(err) {
        console.error(err);
      })
  }

});
