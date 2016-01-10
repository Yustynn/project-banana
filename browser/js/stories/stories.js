app.config(function($stateProvider) {

  $stateProvider.state('stories', {
    url: '/stories/',
    templateUrl: 'js/stories/stories.html',
    controller: 'AllStoriesCtrl', 
    resolve: {
      allStories: function(StoryFactory) {
        return StoryFactory.getAllStories()
          .then(function(allStories) {
            return allStories;
          });
      }
    }
  });

});

app.controller('AllStoriesCtrl', function($scope, $rootScope, allStories, StoryFactory) {

  $scope.allStories = allStories;

});
