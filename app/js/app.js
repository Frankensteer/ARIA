'use strict';

// Declare app level module which depends on filters, and services
angular.module('bottleRocket', [
  'ngRoute',
  'bottleRocket.filters',
  'bottleRocket.services',
  'bottleRocket.directives',
  'bottleRocket.controllers',
  'facebook',
  'mm.foundation'
])

.config(['$routeProvider', '$locationProvider', 'FacebookProvider', '$sceDelegateProvider', function($routeProvider, $locationProvider, FacebookProvider, $sceDelegateProvider) {

	FacebookProvider.init('636537143098707');
  
  $locationProvider.html5Mode(true);

  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'http://www.youtube.com/**']);


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
            controller: 'MusicCtrl'
        })

      .when('/events', {
          templateUrl: 'app/views/events.html',
          controller: 'EventsCtrl'
      })

        .when('/movies', {
            templateUrl: 'app/views/movie.html',
            controller: 'MovieCtrl'
        })

       .when('/about', {
          templateUrl: 'app/views/about.html',
          controller: 'AboutCtrl'
      })

      .when('/contact', {
            templateUrl: 'app/views/contact.html',
            controller: 'ContactCtrl'
        });

}]);


