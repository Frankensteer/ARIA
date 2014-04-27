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
				return $http.jsonp("http://data.seevl.fm/entities/?prefLabel=" + band + "&callback=JSON_CALLBACK");
			},
			getInfo: function(id) {
				return $http.jsonp("http://data.seevl.fm/entities/" + id + "/infos?callback=JSON_CALLBACK");
			},
			getRelated: function(id) {
				return $http.jsonp("http://data.seevl.fm/entities/" + id + "/related?callback=JSON_CALLBACK"); 
			},
			getFacts: function(id) {
				return $http.jsonp("http://data.seevl.fm/entities/" + id + "/facts?callback=JSON_CALLBACK");
			}
		}

	})

	.factory('youtubeService', function($http) {
		// this also needs an API key
		// will be more complicated than the others so we'll leave it for a while
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

	});