'use strict';

/* Directives */

// We'll have to write Directives if we want to include any jQuery plugins but I think they're best left to the end
// We can write most of the code in Controllers first and then refactor into Directives and Services if time allows
// Would like to use some though, they are cool.

angular.module('bottleRocket.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])


