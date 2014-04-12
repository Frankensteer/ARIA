'use strict';

/* Filters */

// We probably won't need to write any filters unless one of you wants to try it out

angular.module('bottleRocket.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]);
