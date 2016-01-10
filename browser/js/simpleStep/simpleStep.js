app.config(function($stateProvider) {

  $stateProvider.state('simpleStep', {
    url: '/stories/:storyId/steps/:stepId',
    templateUrl: 'js/simpleStep/simple-step.html',
    controller: 'SimpleStepCtrl'
  });

});

app.controller('SimpleStepCtrl', function($scope, $rootScope, $state, $stateParams, StoryFactory) {
  console.log("We are in the simpleStep");
  $scope.timeInMinutes = 0;

  $scope.$watch('pathChoice', function(newValue, oldValue) {
    console.log("NEWVALUE", newValue);
    console.log("OLDVALUE", oldValue);
    console.log("----");
      if (newValue === true){
        $state.go('complexStep',  {
            stepId: $stateParams.stepId,
            storyId: $stateParams.storyId
          })
      }
  });

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
