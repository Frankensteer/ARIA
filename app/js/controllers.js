'use strict';

/* Controllers */

angular.module('bottleRocket.controllers', [])

	.controller('MainCtrl', ['$scope', function($scope) {
  		
  	}])

  // basic code for accessing data from AJAX service
	.controller('HomeCtrl', ['$scope', 'seevlService', function($scope, seevlService) {
  		$scope.title = "HOME";
      seevlService.then(function(data) {
        $scope.data = data;
        console.log($scope.data);
      })
      
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
