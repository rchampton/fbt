'use strict';

/* Q.js jasmine specs*/
describe('Q Specs', function(){
	var q0=new Q([6],[0]);

	beforeEach(function(){
	});

	describe('General', function(){
		it('Default q locate() should return a string', function(){
			expect(q0.locate().prompt).toBe('Locate E on string 6');
		});
	});
});
