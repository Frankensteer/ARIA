'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('bottleRocket.services', []).
  value('version', '0.1');

// Most services we will need are just $http calls
// For the Home and Artist pages, we'll need a service that makes a $http request to the Seevl or MusicBrainz APIs
// The Artist page will need a service that makes a call to the YouTube and Soundcloud APIs
// The Events page will need a service that makes a call to the BandsInTown APIs
// We'll also need an auth service that calls the Facebook Auth API