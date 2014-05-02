'use strict';

/* Controllers */

angular.module('bottleRocket.controllers', [])

  .controller('HomeCtrl', [ function() {
    
  }])

  .controller('MainCtrl', ['$scope', function($scope) {
    // simple function for setting up Controller tests
    // taken from: http://odetocode.com/blogs/scott/archive/2013/06/10/simple-unit-tests-with-angularjs.aspx
    $scope.x = 3;
    $scope.y = 4;
    $scope.doubleIt = function () {
      $scope.x *= 2;
      $scope.y *= 2;
    };

  }])


	.controller('MusicCtrl', ['$scope', '$sce', '$route', '$location', function($scope, $sce, $route) {

        // We should probably move this Soundcloud stuff out into a service and directive but it's not hugh priority
        $scope.searchSC = function() {
            SC.get('/tracks', { q: $scope.query, limit: 10 }, function(tracks) {
                $scope.tracks = tracks;
                $scope.tracks_set = true;
                $scope.$apply();
            });

            $scope.playTrack = function(track) {
                track_url = track.permalink_url;
                SC.oEmbed(track_url, { auto_play: true }, function(oEmbed) {
                    $scope.oEmbed = oEmbed;
                    $scope.oEmbed.htmlSafe = $sce.trustAsHtml(oEmbed.html);
                    $scope.trackPlaying = true;
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
	.controller('ArtistCtrl', ['$scope', 'seevlService', '$sce', 'youtubeService', '$timeout', function($scope, seevlService, $sce, youtubeService, $timeout) {

      $scope.search = function(query) {
        seevlService.search(query)
        .success(function(data) {

          $scope.query = query;

          var video_url = "http://www.syoutube.com/embed/" + $scope.youtube_id; 

          $scope.seevl_id = data.data.results[0].id;
          $scope.info = true;

          seevlService.getInfo($scope.seevl_id)
          .success(function(more_data) {
            $scope.artistInfo = more_data;
            $scope.artistDesc = $sce.trustAsHtml(more_data.data.description.value);
          })
          .error(function(more_data) {
            console.log("Another Error Caught!")
          });

          seevlService.getRelated($scope.seevl_id)
          .then(function(even_more_data) {
            $scope.relatedBands = even_more_data;
          });

          seevlService.getFacts($scope.seevl_id)
          .then(function(too_much_data) {
            $scope.facts = too_much_data;
          });

          youtubeService.search($scope.query)
          .then(function(vdata) {
              $scope.youtube_id = vdata.data.data.items[0].id;
              video_url = "http://www.youtube.com/embed/" + $scope.youtube_id;
              $scope.videoUrl = $sce.trustAsResourceUrl(video_url);
              // $scope.$apply();
          });

        })
      .error(function(data) {
        console.log("ERROR CAUGHT");
        // Dummy data for demoing while Seevl API is down
        $scope.query = "nirvana";
        var video_url = "http://www.youtube.com/embed/50Y8UBKI09k";
        $scope.videoUrl = video_url;
        $scope.info = true;
        
        $scope.artistDesc =  $sce.trustAsHtml("<p><strong>Nirvana</strong> was an American rock band formed by singer/guitarist Kurt Cobain and bassist Krist Novoselic in Aberdeen, Washington in 1987. Nirvana went through a succession of drummers, the longest-lasting being Dave Grohl, who joined the band in 1990. Despite releasing only three full-length studio albums in their seven-year career, Nirvana has come to be regarded as one of the most influential and important rock bands of the modern era.</p>");

        $scope.facts = {
          "data": {
            "origin": {
              "0": {
                "prefLabel": "Aberdeen"
              }
            },
            "genre": {
              "0": {
                "prefLabel": "punk"
              },
              "1": {
                "prefLabel": "rock"
              },
              "2": {
                "prefLabel": "other"
              }
            },
            "membership": {
              "artist": {
                "0": {
                  "prefLabel": "Kurt Cobain"
                },
                "1": {
                  "prefLabel": "Krist Novoselic"
                },
                "2": {
                  "prefLabel": "Dave Grohl"
                }
              }
            },
            "label": {
              "0": {
                "prefLabel": "A Record Label"
              },
              "1": {
                "prefLabel": "Another Label"
              },
              "2": {
                "prefLabel": "SubPop"
              }
            },
            "collaborated_with": {
              "0": {
                "prefLabel": "Courtney Love"
              },
              "1": {
                "prefLabel": "Francis Bean"
              },
              "2": {
                "prefLabel": "Heroin"
              }
            }
          }
        };
  
        $scope.relatedBands = {
          "data": {
            "association": {
              "0": {
                "object": {
                  "prefLabel": "Foo Fighters"
                }
              },
              "1": {
                "object": {
                  "prefLabel": "Pavement"
                }
              },
              "2": {
                "object": {
                  "prefLabel": "Hole"
                }
              }
            }
          }
        };

      });

    };
      
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


    .controller('EventsCtrl', ['$scope', 'bandsintownService', 'songkickService', function($scope, bandsintownService, songkickService) {
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
          songkickService.getMetroArea()
            .then(function(area) {
              $scope.areaData = area;
              $scope.metroId = area.data.resultsPage.results.location[0].metroArea.id;
              songkickService.getUpcomingEvents($scope.metroId)
                .then(function(events) {
                  $scope.upcomingEvents = events.data.resultsPage.results.event;
                });
            });
      }, function() {
        alert("You need to give me permission to use your position to get Location Info.");
      });
    } else {
      // Default Lat & Long for Dublin
        console.log("DEFAULT GEOLOCATION")
        $scope.lat = 53.3478;
        $scope.long = 6.2597;
        songkickService.getMetroArea()
            .then(function(area) {
              $scope.areaData = area;
              $scope.metroId = area.data.resultsPage.results.location[0].metroArea.id;
              songkickService.getUpcomingEvents($scope.metroId)
                .then(function(events) {
                  $scope.upcomingEvents = events.data.resultsPage.results.event;
                });
            });
    }


  
  }])
    //New stuff added by PJ
    .controller('MovieCtrl', function ($scope, rottentomatoesFactory) {
        rottentomatoesFactory.getMovies()
            .then(function(movies) {
                console.log(movies);
                $scope.movies=movies;
            });
        });

