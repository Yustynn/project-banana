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

  $scope.beginPlayingStory = function(id){
    StoryFactory.beginStory(id)
      .then(function(id) {
        console.log("Story has begun!");
        $scope.storyHasBegun = true;
      }).then(null, function(err) {
        console.error(err);
      });
  };

});
