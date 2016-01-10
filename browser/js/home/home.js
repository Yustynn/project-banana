app.config(function($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'js/home/home.html',
    controller: 'HomeCtrl'
  });
});


app.controller('HomeCtrl', function($scope, $state, StoryFactory, $rootScope) {
  $scope.createNewStory = function() {
    StoryFactory.createNewStory($scope.title, $scope.description)
      .then(function(responseData) {

        console.log(responseData, "REPONSE DATA")
        $rootScope.isFirstStep = true;
        $rootScope.storyTitle = $scope.title;
        $state.go('step', {
          stepId: responseData.stepId,
          storyId: responseData.storyId
        });
      })
      .then(null, function(err) {
        console.error(err)
      })
      //new story => creates default headnode =>give back id for head node
  }

});
