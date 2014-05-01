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
  

});
