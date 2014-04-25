'use strict';

var app = angular.module('app', ['facebook']); // inject facebook module

app.config(['FacebookProvider', function(FacebookProvider) {
     // Here you could set your appId through the setAppId method and then initialize
     // or use the shortcut in the initialize method directly.
     FacebookProvider.init('636537143098707');
}])
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

.config(['$routeProvider', '$locationProvider', 'FacebookProvider', function($routeProvider, $locationProvider, FacebookProvider) {

	FacebookProvider.init('636537143098707');
  
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
      })

      .when('/contact', {
            templateUrl: 'app/views/contact.html',
            controller: 'ContactCtrl'
        });

}]);
