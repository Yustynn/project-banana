app.config(function($stateProvider) {

  $stateProvider.state('step', {
    url: '/stories/:storyId/steps/:stepId',
    templateUrl: 'js/step/step.html',
    controller: 'StepCtrl'
  });

});

app.controller('StepCtrl', function($scope, $rootScope, $state, $stateParams, StoryFactory) {
  
  $scope.bigMessage = ["Begin your story below…", "What happens next?"];

  $scope.pathOptions = [{value: true,
                          text: 'yes'},
                          {value: false,
                          text: 'no'}];
  $scope.pathChoice = false;
  $scope.timeInMinutes = 0;

  $scope.createNewStep = function() {
    if ($scope.optionOne && $scope.optionTwo){
      $scope.content += ' ' + $scope.optionOne.toUpperCase() + ' or ' + $scope.optionTwo.toUpperCase();
    }
    // Params are.. text, prevStep, storyId, time
    StoryFactory.createNewStep($scope.content, $stateParams.stepId, $stateParams.storyId, $scope.timeInMinutes)
      .then(function(responseData) {
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
