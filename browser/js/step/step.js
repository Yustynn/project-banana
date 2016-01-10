app.config(function($stateProvider) {

  $stateProvider.state('step', {
    url: '/stories/:storyId/steps/:stepId',
    templateUrl: 'js/step/step.html',
    controller: 'StepCtrl'
  });

});

app.controller('StepCtrl', function($scope, $rootScope, $state, $stateParams, StoryFactory) {

  if ($rootScope.isFirstStep) {
    $scope.bigMessage = "Begin your story below…";
  } else {
    $scope.bigMessage = "What happens next?";
  }

  // pathChoice: Whether or not we're branching from this step
  $scope.pathChoice = false;


  $scope.goToPreviousStep = function(){
    StoryFactory.goToPrevStep($stateParams.storyId, $stateParams.stepId)
    .then(function(data){
      $state.go('step', {
        stepId: data.stepId,
        storyId: data.storyId
      });
    })
  }
  // timeDelay: How long to delay this step's delivery
  $scope.timeDelay = 0;
  
  $scope.createNewStep = function() {
    if ($scope.optionOne && $scope.optionTwo) {
      $scope.content += ' ' + $scope.optionOne.toUpperCase() + ' or ' + $scope.optionTwo.toUpperCase();
    }

    // Params are.. text, prevStep, storyId, time, choice
    StoryFactory.createNewStep($scope.content, $stateParams.stepId, $stateParams.storyId, parseInt($scope.timeDelay))
      .then(function(responseData) {
        console.log(responseData, "RESPONSE DATA");
        $rootScope.isFirstStep = false;

        $state.go('step', {
          stepId: responseData.stepId,
          storyId: responseData.storyId
        });
      }).then(null, function(err) {
        console.error(err);
      })
  }
});
