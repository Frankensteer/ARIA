'use strict';

/* Controllers */

angular.module('bottleRocket.controllers', [])

  .controller('MainCtrl', [ function() {
    
  }])

  .controller('HomeCtrl', [ function() {
    
  }])


	.controller('MusicCtrl', ['$scope', '$sce', '$route', function($scope, $sce, $route) {

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
	.controller('ArtistCtrl', ['$scope', 'seevlService', function($scope, seevlService) {
      $scope.search = function(query) {
        seevlService.search(query)
        .then(function(data) {

          $scope.seevl_id = data.data.results[0].id;

          seevlService.getInfo($scope.seevl_id)
          .then(function(more_data) {
            $scope.artistInfo = more_data;
          });

          seevlService.getRelated($scope.seevl_id)
          .then(function(even_more_data) {
            $scope.relatedBands = even_more_data;
          });

          seevlService.getFacts($scope.seevl_id)
          .then(function(too_much_data) {
            $scope.facts = too_much_data;
            console.log("here:")
            console.log($scope.facts);
          })

        });
      }
      
  }])

  // Profile

	.controller('ProfileCtrl', [ function() {
  		
	}])

  // About 

  .controller('AboutCtrl', [ function() {
      
  }])

  // Contact

  .controller('ContactCtrl', [ function() {
      
  }])


    .controller('EventsCtrl', ['$scope', 'bandsintownService', function($scope, bandsintownService, $http) {
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
          return $http.jsonp("http://api.bandsintown.com/artists/Crystal%20Castles/events/recommended?location=" + $scope.lat + "," + $scope.long + "&radius=50&app_id=bottleRocket&api_version=2.0&format=json&callback=JSON_CALLBACK")
            .then(function(data) {
              console.log("DIS WAN");
              console.log(data);
          });
      }, function() {
        alert("You need to give me permission to use your position to get Location Info.");
      });
    } else {
      // Default Lat & Long for Dublin
        console.log("DEFAULT GEOLOCATION")
        $scope.lat = 53.3478;
        $scope.long = 6.2597;
        $http.jsonp("http://api.bandsintown.com/artists/Crystal%20Castles/events/recommended?location=" + $scope.lat + "," + $scope.long + "&radius=50&app_id=bottleRocket&api_version=2.0&format=json&callback=JSON_CALLBACK")
          .then(function(data) {
            console.log("DIS WAN");
            console.log(data);
          });
    }


  
  }]);
