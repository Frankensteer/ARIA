'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('bottleRocket.controllers'));


  it('should ....', inject(function($controller) {
    //spec body
    var myCtrl1 = $controller('ProfileCtrl');
    expect(myCtrl1).toBeDefined();
  }));

  it('should ....', inject(function($controller) {
    //spec body
    var myCtrl2 = $controller('ArtistCtrl');
    expect(myCtrl2).toBeDefined();
  }));
});
