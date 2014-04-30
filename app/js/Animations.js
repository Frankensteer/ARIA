angular.module ('bottleRocket.animations',[ ])

// http://www.yearofmoo.com/2013/08/remastered-animation-in-angularjs-1-2.html#animating-nginclude-ngview-and-ngif

	.animation('.sliderruiny-animation', function() {
		return {
		    enter : function(element, done) {
		      $(element).css({
		        position:'relative',
		        'z-index':-2,
		        top:600,
		        opacity:0
		      });
		      $(element).animate({
		        top:100,
		        opacity:1
		      }, done);
		    },

		    leave : function(element, done) {
		      $(element).css({
		        position:'relative',
		        'z-index':-3,
		        top:0,
		        opacity:1
		      });
		      $(element).animate({
		        top:-600,
		        opacity:0
		      }, done);
		    }
		};
	});
