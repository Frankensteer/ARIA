'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('bottleRocket.services', []).
  value('version', '0.1')

// Most services we will need are just going to make $http calls
// For the Home and Artist pages, we'll need a service that makes a $http request to the EchoNest, Seevl or MusicBrainz APIs
// The Artist page will need a service that makes a call to the YouTube and Soundcloud APIs
// The Events page will need a service that makes a call to the BandsInTown APIs
// We'll also need an auth service that calls the Facebook Auth API

// &callback=JSON_CALLBACK must be appended to all URIs

	.factory('seevlService', function($http) {
		// sample URL: http://data.seevl.fm/entities/?prefLabel=nirvana
		
		return {
			search: function(band) {
				return $http.jsonp("http://data.seevl.fm/entities/?prefLabel=" + band + "&user_key=f934179d7329edcc16058765fb653a77&callback=JSON_CALLBACK");
			},
			getInfo: function(id) {
				return $http.jsonp("http://data.seevl.fm/entities/" + id + "/infos?user_key=f934179d7329edcc16058765fb653a77&callback=JSON_CALLBACK");
			},
			getRelated: function(id) {
				return $http.jsonp("http://data.seevl.fm/entities/" + id + "/related?user_key=f934179d7329edcc16058765fb653a77&callback=JSON_CALLBACK"); 
			},
			getFacts: function(id) {
				return $http.jsonp("http://data.seevl.fm/entities/" + id + "/facts?user_key=f934179d7329edcc16058765fb653a77&callback=JSON_CALLBACK");
			}
		}

	})

	.factory('youtubeService', function($http) {
		// this also needs an API key
		// will be more complicated than the others so we'll leave it for a while
		return {
			search: function(query) {
				return $http.jsonp("http://gdata.youtube.com/feeds/api/videos?q=" + query + "&format=5&max-results=1&v=2&alt=jsonc&callback=JSON_CALLBACK");
			}
		}
	})

	.factory('bandsintownService', function($http) {
//	The Bandsintown V2 API currently does not require authentication but does require that an application ID (app_id) parameter be passed with every request to identify yourself. See the example below:
	//	http://api.bandsintown.com/artists/Skrillex/events.json?api_version=2.0&app_id=YOUR_APP_ID
	//	The application ID can be anything, but should be a word that describes your application or company.

	//	Sample URL for this request: http://api.bandsintown.com/artists/Skrillex.json?api_version=2.0&app_id=YOUR_APP_ID&callback=JSON_CALLBACK


        return {
            players: function(band) {
              return $http.jsonp("http://api.bandsintown.com/artists/" + band + ".json?api_version=2.0&app_id=bottleRocket&callback=JSON_CALLBACK");
       		}
     	}

	})

	.factory('songkickService', function($http) {
		return {
			getMetroArea: function() {
				return $http.jsonp("http://api.songkick.com/api/3.0/search/locations.json?location=clientip&apikey=u0Djnk8AUNL26y43&jsoncallback=JSON_CALLBACK");
			},
			getUpcomingEvents: function(area) {
				return $http.jsonp("http://api.songkick.com/api/3.0/metro_areas/" + area + "/calendar.json?apikey=u0Djnk8AUNL26y43&jsoncallback=JSON_CALLBACK");
			}
		}
	})

    .factory('rottentomatoesFactory', function($http) {
        return {
        getMovies: function() {
             return $http.jsonp("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?page_limit=16&page=1&country=ie&apikey=2fu8bhwngnxuc6a56pburxfm&callback=JSON_CALLBACK");
             }
        }
    });
