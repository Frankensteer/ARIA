'use strict';


// Declare app level module which depends on filters, and services
angular.module('bottleRocket', [
  'ngRoute',
  'bottleRocket.filters',
  'bottleRocket.services',
  'bottleRocket.directives',
  'bottleRocket.controllers'
])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	$routeProvider
      
    	.when('/app', {
        	templateUrl: 'app/views/home.html',
        	controller: 'HomeCtrl'
      	})

      .when('/profile', {
      		templateUrl: 'app/views/profile.html',
      		controller: 'ProfileCtrl'
      	})
      	
      .when('/artist', {
      		templateUrl: 'app/views/artist.html',
      		controller: 'ArtistCtrl'
      	})

        .when('/music', {
            templateUrl: 'app/views/music.html',
            controller: 'MainCtrl'
        })

      .when('/events', {
          templateUrl: 'app/views/events.html',
          controller: 'EventsCtrl'
      });

}]);
