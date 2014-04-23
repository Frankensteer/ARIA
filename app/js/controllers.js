'use strict';

/* Controllers */

angular.module('bottleRocket.controllers', [])

	.controller('MainCtrl', ['$scope', '$sce', '$route', function($scope, $sce, $route) {

        // We should probably move this Soundcloud stuff out into a service and directive but it's not hugh priority
        $scope.searchSC = function() {
            SC.get('/tracks', { q: $scope.query, limit: 10 }, function(tracks) {
                $scope.tracks = tracks;
                $scope.$apply();
            });

            $scope.playTrack = function(track) {
                track_url = track.permalink_url;
                SC.oEmbed(track_url, { auto_play: true }, function(oEmbed) {
                    $scope.oEmbed = oEmbed;
                    $scope.oEmbed.htmlSafe = $sce.trustAsHtml(oEmbed.html);
                    $scope.$apply();
                });
            }
        }

        var track_url;
        SC.oEmbed(track_url, { auto_play: false }, function(oEmbed) {
            $scope.oEmbed = oEmbed;
            // http://stackoverflow.com/questions/19415394/with-ng-bind-html-unsafe-removed-how-do-i-inject-html
            $scope.oEmbed.htmlSafe = $sce.trustAsHtml(oEmbed.html);
            $scope.$apply();
        });
  	}])

  // basic code for accessing data from AJAX service
	.controller('HomeCtrl', ['$scope', 'seevlService', function($scope, seevlService )  {
  		$scope.title = "HOME";
      seevlService.then(function(data){
      console.log("seevl"+ data);
	  });
      
      
  }])

	.controller('ProfileCtrl', [ function() {
  		
	}])


    .controller('EventsCtrl', ['$scope', 'bandsintownService', function($scope, bandsintownService) {
      $scope.title = "EVENT";
      $scope.searchBands =  function() {
          return bandsintownService.players($scope.band).then(function(data){
               $scope.bandsPlaying = data;
              console.log(data);
          });
      };

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          $scope.lat = position.coords.latitude;
          $scope.long = position.coords.longitude;
          console.log("GEOLOCATION: " + $scope.lat + ", " + $scope.long);
      }, function() {
        alert("You need to give me permission to use your position to get Weather Info.");
      });
    } else {
      // Default Lat & Long for Dublin
        console.log("DEFAULT GEOLOCATION")
        $scope.lat = 53.3478;
        $scope.long = 6.2597;
    }
  
  }])

	.controller('ArtistCtrl', [ function() {
  	
  }]);
