'use strict';

/* Controllers */

angular.module('bottleRocket.controllers', [])

	.controller('MainCtrl', ['$scope', function($scope) {
  		
  	}])

	.controller('HomeCtrl', ['$scope', function($scope) {
  		$scope.title = "HOME";
  	}])

	.controller('ProfileCtrl', ['$scope', function($scope) {
  		$scope.title = "PROFILE";
	}])

	.controller('ArtistCtrl', ['$scope', function($scope) {
  		$scope.title = "ARTIST";
  	}])

  .controller('EventsCtrl', ['$scope', function($scope) {
      $scope.title = "EVENTS";
    }]);
