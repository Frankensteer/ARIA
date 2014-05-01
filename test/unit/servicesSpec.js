'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('bottleRocket.services'));

  // Spec Template from Angular-Seed
  // describe('version', function() {
  //   it('should return current version', inject(function(version) {
  //     expect(version).toEqual('0.1');
  //   }));
  // });

  // Testing API calls using ngMock instead of Sinon because ngMock is built into Angular
  // https://docs.angularjs.org/api/ngMock/service/$httpBackend
	
  // Used this to help set up $httpBackend:
  // http://stackoverflow.com/questions/15927919/using-ngmock-to-simulate-http-calls-in-service-unit-tests

  var $httpBackend;

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get("$httpBackend");

    // configure the requests
    
    // Seevl Requests
    $httpBackend
        .when("JSONP", "http://data.seevl.fm/entities/?prefLabel=nirvana&user_key=f934179d7329edcc16058765fb653a77&callback=JSON_CALLBACK")
        	.respond(200, {value: "gotSearchDataFromSeevl"});
    $httpBackend
        .when("JSONP", "http://data.seevl.fm/entities/RkMQZrfG/infos?user_key=f934179d7329edcc16058765fb653a77&callback=JSON_CALLBACK")
        	.respond(200, {value: "gotInfoDataFromSeevl"});
    $httpBackend
        .when("JSONP", "http://data.seevl.fm/entities/RkMQZrfG/related?user_key=f934179d7329edcc16058765fb653a77&callback=JSON_CALLBACK")
        	.respond(200, {value: "gotRelatedDataFromSeevl"});
    $httpBackend
        .when("JSONP", "http://data.seevl.fm/entities/RkMQZrfG/facts?user_key=f934179d7329edcc16058765fb653a77&callback=JSON_CALLBACK")
        	.respond(200, {value: "gotFactsDataFromSeevl"});

    // YouTube Request
    $httpBackend
        .when("JSONP", "http://gdata.youtube.com/feeds/api/videos?q=nirvana&format=5&max-results=1&v=2&alt=jsonc&callback=JSON_CALLBACK")
        	.respond(200, {value: "gotVideoFromYoutube"});

    // Rotten Tomatoes request
    $httpBackend
        .when("JSONP", "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?page_limit=16&page=1&country=ie&apikey=2fu8bhwngnxuc6a56pburxfm&callback=JSON_CALLBACK")
        	.respond(200, {value: "gotMoviesFromRottenTomatoes"});

    // BandsInTown request
    $httpBackend
        .when("JSONP", "http://api.bandsintown.com/artists/Skrillex.json?api_version=2.0&app_id=bottleRocket&callback=JSON_CALLBACK")
        	.respond(200, {value: "gotBandFromBandsInTown"});

        	
  }));

  afterEach(function () {
    $httpBackend.flush()
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  
  describe('seevlService tests', function() {

  	describe('seevlService Search http request', function () {
  		it('.value should be "gotSearchDataFromSeevl', inject(function (seevlService) {

  			seevlService.search("nirvana").success(function(response) {
  		  		expect(response.value).toEqual("gotSearchDataFromSeevl");
  			}).error( function(response) {
  		  		expect(false).toEqual(true);
  			});

  		}));
  	});

  	describe('seevlService Info http request', function () {
  		it('.value should be "gotInfoDataFromSeevl', inject(function (seevlService) {

  			seevlService.getInfo("RkMQZrfG").success(function(response) {
  		  		expect(response.value).toEqual("gotInfoDataFromSeevl");
  			}).error( function(response) {
  		  		expect(false).toEqual(true);
  			});

  		}));
  	});

  	describe('seevlService Related http request', function () {
  		it('.value should be "gotRelatedDataFromSeevl', inject(function (seevlService) {

  			seevlService.getRelated("RkMQZrfG").success(function(response) {
  		  		expect(response.value).toEqual("gotRelatedDataFromSeevl");
  			}).error( function(response) {
  		  		expect(false).toEqual(true);
  			});

  		}));
  	});

  	describe('seevlService Facts http request', function () {
  		it('.value should be "gotFactsDataFromSeevl', inject(function (seevlService) {

  			seevlService.getFacts("RkMQZrfG").success(function(response) {
  		  		expect(response.value).toEqual("gotFactsDataFromSeevl");
  			}).error( function(response) {
  		  		expect(false).toEqual(true);
  			});

  		}));
  	});

  });

  describe('youtubeService test', function() {
  	it('.value should be "gotVideoFromYoutube', inject(function (youtubeService) {

  		youtubeService.search("nirvana").success(function(response) {
  			expect(response.value).toEqual("gotVideoFromYoutube");
  		}).error( function(response) {
  			expect(false).toEqual(true);
  		});

  	}));
  });

  describe('rottentomatoesFactory test', function() {
  	it('.value should be "gotMoviesFromRottenTomatoes', inject(function (rottentomatoesFactory) {

  		rottentomatoesFactory.getMovies().success(function(response) {
  			expect(response.value).toEqual("gotMoviesFromRottenTomatoes");
  		}).error( function(response) {
  			expect(false).toEqual(true);
  		});

  	}));
  });

  describe('bandsintownService test', function() {
  	it('.value should be "gotBandFromBandsInTown', inject(function (bandsintownService) {

  		bandsintownService.players("Skrillex").success(function(response) {
  			expect(response.value).toEqual("gotBandFromBandsInTown");
  		}).error( function(response) {
  			expect(false).toEqual(true);
  		});

  	}));
  });
  
});
