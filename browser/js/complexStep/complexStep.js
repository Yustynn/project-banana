app.config(function($stateProvider) {

  $stateProvider.state('complexStep', {
    url: '/stories/:storyId/steps/:stepId',
    templateUrl: 'js/complexStep/complex-step.html',
    controller: 'ComplexStepCtrl'
  });

});

app.controller('ComplexStepCtrl', function($scope, $rootScope, $state, $stateParams, StoryFactory) {
  console.log("We are in the complexStep");

  $scope.timeInMinutes = 0;

  $scope.$watch('pathChoice', function(newValue, oldValue) {
    console.log("NEWVALUE", newValue);
    console.log("OLDVALUE", oldValue);
    console.log("----");
    
    if (newValue === false) {
      $state.go('simpleStep', {
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
        $state.go('complexStep', {
          stepId: responseData.stepId,
          storyId: responseData.storyId
        });
      }).then(null, function(err) {
        console.error(err);
      })
  }

});
