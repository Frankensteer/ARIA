'use strict';

/*  Lots of problems here
*   Injecting services into controller tests is proving very difficult
*   As is injecting other dependencies that certain Ctrl rely on
*   e.g. $route, $sce
*   Testing very trivial things here is easy, which is why there are simple tests to check that certain controllers exist
*   But once those controllers start needing more dependencies, even something simple like $scope, the test suite falls over
*/

describe('controllers', function(){
  
  beforeEach(module('bottleRocket.controllers'));

  describe('MainCtrl', function() {

    // trying to set up controller tests that actually work
    // http://odetocode.com/blogs/scott/archive/2013/06/10/simple-unit-tests-with-angularjs.aspx
    var scope;
    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      $controller("MainCtrl", {
        $scope: scope
      });
    }));
 
    it("should double the numbers", function() {
      scope.doubleIt();
      expect(scope.x).toBe(6);
    });
    

  });

  describe('HomeCtrl', function() {

    it('should exist', inject(function($controller) {
      var HomeCtrl = $controller('HomeCtrl');
      expect(HomeCtrl).toBeDefined();
    }));

  });

  describe('MusicCtrl', function() {

    // it's proving very difficult to test this Ctrl because it relies on the SoundCloud SDK which is outside of Angular's Digest cycle
    // refactoring SC into a service + directive would help with this

    var scope;
    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      $controller("MusicCtrl", {
        $scope: scope
      });
    }));

    it('should get tracks from Soundcloud', function($route) {
      scope.searchSC();
      expect(scope.set_track).toBe(true);
    });

    it('should play a track', function(track) {
      scope.playTrack();
      expect(scope.trackPlaying).toBe(true);
    });


  });

  describe('ArtistCtrl', function() {

    // problems here with injecting seevl and youtube services into controller function tests

    var scope;
    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      $controller("ArtistCtrl", {
        $scope: scope
      });
    }));
    var $httpBackend;

    beforeEach(inject(function ($injector) {
      $httpBackend = $injector.get("$httpBackend");

      // Seevl Requests
      // Search
      $httpBackend
          .when("JSONP", "http://data.seevl.fm/entities/?prefLabel=nirvana&user_key=f934179d7329edcc16058765fb653a77&callback=JSON_CALLBACK")
            .respond(200, {value: "gotSearchDataFromSeevl"});
      // Info
      $httpBackend
          .when("JSONP", "http://data.seevl.fm/entities/RkMQZrfG/infos?user_key=f934179d7329edcc16058765fb653a77&callback=JSON_CALLBACK")
            .respond(200, {value: "gotInfoDataFromSeevl"});
      // Related
      $httpBackend
          .when("JSONP", "http://data.seevl.fm/entities/RkMQZrfG/related?user_key=f934179d7329edcc16058765fb653a77&callback=JSON_CALLBACK")
            .respond(200, {value: "gotRelatedDataFromSeevl"});
      // Facts
      $httpBackend
          .when("JSONP", "http://data.seevl.fm/entities/RkMQZrfG/facts?user_key=f934179d7329edcc16058765fb653a77&callback=JSON_CALLBACK")
            .respond(200, {value: "gotFactsDataFromSeevl"});

      // YouTube Request
      $httpBackend
          .when("JSONP", "http://gdata.youtube.com/feeds/api/videos?q=nirvana&format=5&max-results=1&v=2&alt=jsonc&callback=JSON_CALLBACK")
            .respond(200, {value: "gotVideoFromYoutube"});
  }));

    it('should exist', inject(function($controller, scope) {
      expect(ArtistCtrl).toBeDefined();
    }));

    it('should set a scoped query', function() {
      scope.search("nirvana");
      expect(scope.query).toEqual("nirvana");
    });

    it('should make $scope.info true when search results are returned', function() {
      scope.search("nirvana");
      expect(scope.info).toBe(true);
    });

  });

  describe('EventCtrl', function() {
    var scope;
    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      $controller("EventCtrl", {
        $scope: scope
      });
    }));

    it('should exist', function() {
      expect(EventCtrl).toBeDefined();
    });

  });

  describe('MovieCtrl', function() {
    var scope;
    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      $controller("MovieCtrl", {
        $scope: scope
      });
    }));

    it('should exist', function() {
      expect(MovieCtrl).toBeDefined();
    });

  });

});
