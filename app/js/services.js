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

	.factory('echonestService', function() {
		// this needs an API key which I do not want to check into Source Control,
		// I'll come up with a workaround if we need to use it
		
		
	})

	.factory('seevlService', function($http) {
		// sample URL: http://data.seevl.fm/entities/?prefLabel=nirvana
		
		return $http.jsonp("http://data.seevl.fm/entities/?prefLabel=nirvana&callback=JSON_CALLBACK ");
	})


	.factory('musicbrainzService', function($http) {
		// search API only returns XML I think so we might not use this
	})

	.factory('youtubeService', function($http) {
		// this also needs an API key
		// will be more complicated than the others so we'll leave it for a while
	})

	
	.factory('soundcloudService', function($http) {
		// this service might not be necessary, SC uses an SDK that we'll have to integrate, it's easy to implement but might take too much effort to refactor into a service
	})

	.factory('bandsintownService', function($http) {
	//	The Bandsintown V2 API currently does not require authentication but does require that an application ID (app_id) parameter be passed with every request to identify yourself. See the example below:
	//	http://api.bandsintown.com/artists/Skrillex/events.json?api_version=2.0&app_id=YOUR_APP_ID
	//	The application ID can be anything, but should be a word that describes your application or company.

	//	Sample URL for this request: http://api.bandsintown.com/artists/Skrillex.json?api_version=2.0&app_id=YOUR_APP_ID


	});