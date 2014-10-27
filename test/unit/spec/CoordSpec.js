'use strict';

/* Coord jasmine specs*/
describe('Coord Specs', function(){
	beforeEach(function(){
		this.c=new Coord();
	});

	afterEach(function(){
		delete this.c;
	});

	it('Defaults to 0,0', function(){
		expect(this.c.x).toBe(0);
		expect(this.c.y).toBe(0);
	});

	it('x, y values can be set in constructor', function(){
		this.d=new Coord(13,7);
		expect(this.d.x).toBe(13);
		expect(this.d.y).toBe(7);
	});

	it('toString returns (x, y)', function(){
		expect(this.c.toString()).toBe('(0, 0)');
	});
});
