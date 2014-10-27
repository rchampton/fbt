'use strict';

/* StringFret jasmine specs*/
describe('StringFret Specs', function(){
	describe('General tests', function(){
		var sf=new StringFret(), g=new StringFret(6,3);

		it('should initialize to string 0, fret 0', function(){
			expect(sf.string).toBe(0);
			expect(sf.fret).toBe(0);
		});

		it('create g as new StringFret(6,3) should initialize string to 6 and fret to 3', function(){
			expect(g.string).toBe(6);
			expect(g.fret).toBe(3);
		});

		it('now g.toString() should return "3rd fret of E string"', function(){
			expect(g.toString()).toBe("3rd fret of E string");
		});

		it('and g.noteName() should return "G"', function(){
			expect(g.noteName()).toBe('G');
		});

		it('create g2 as new StringFret(6, 3) should .equals(g)', function(){
			var g2=new StringFret(6, 3);
			expect(g.equals(g2)).toBe(true);
		});

		it('new StringFret(1,0) should return noteName E', function(){
			var sf=new StringFret(1,0);
			expect(sf.noteName()).toBe('E');
		});

		it('new StringFret(2,1).toString() should return 1st fret of B string', function(){
			var sf=new StringFret(2,1);
			expect(sf.toString()).toBe('1st fret of B string');
		});

		it('new StringFret(3,1).toString() should return 1st fret of G string', function(){
			var sf=new StringFret(3,1);
			expect(sf.toString()).toBe('1st fret of G string');
		});

		it('new StringFret(2,1) should return noteName C', function(){
			var sf=new StringFret(2,1);
			expect(sf.noteName()).toBe('C');
		});
	});

	describe("prototype.random(...) tests", function(){
		var sfr=new StringFret(1, 0);
		it('sfr initialized propertly', function(){
			expect(sfr.string).toBe(1);
			expect(sfr.fret).toBe(0);
		});

		it('sfr.random([6], [0]).toString() === "Open E string"', function(){
			expect(sfr.random([6], [0]).toString()).toEqual('Open 6 string');
		});

		it('sfr.random() returns a StringFret with a string value in the range 1-6 and a fret value in the range 0-12', function(){
			var sf1=sfr.random();
			expect(sf1.string).toBeGreaterThan(0);
			expect(sf1.string).toBeLessThan(7);
			expect(sf1.fret).toBeGreaterThan(-1);
			expect(sf1.fret).toBeLessThan(12);
		});

		it('sfr.random([1],[0]) returns a StringFret with a string value 1 and a fret value 0', function(){
			var sf0=sfr.random([1],[0]);
			expect(sf0.string).toBe(1);
			expect(sf0.fret).toBe(0);
		});

		it('sfr.random([1,2,3], [5,6,7]) returns a StringFret with a string value in the range [1-3] and a fret value in the range [5-8]', function(){
			var sf=sfr.random([1,2,3], [5,6,7]);
			expect(sf.string).toBeGreaterThan(0);
			expect(sf.string).toBeLessThan(4);
			expect(sf.fret).toBeGreaterThan(4);
			expect(sf.fret).toBeLessThan(9);
		});

		it('sfr.random([1],[0]).noteName() equals E', function(){
			expect(sfr.random([1],[0]).noteName()).toBe('E');
		});
	});

	describe('prototype.fromCoord(...) tests (Completely dependent on Fboard.geometry values)', function(){
		var sf=new StringFret();

		it('Clicking 20, 141 should be note E', function(){
			expect(sf.fromCoord(new Coord(20, 141)).noteName()).toBe('E');
		});
		it('Clicking 46, 122 should be note A#', function(){
			expect(sf.fromCoord(new Coord(46, 122)).noteName()).toBe('A#');
		});
		it('Clicking 91, 102 should be note E', function(){
			expect(sf.fromCoord(new Coord(91, 102)).noteName()).toBe('E');
		});
		it('Clicking 123, 83 should be note A#', function(){
			expect(sf.fromCoord(new Coord(123, 83)).noteName()).toBe('A#');
		});
		it('Clicking 178, 62 should be note D#', function(){
			expect(sf.fromCoord(new Coord(178, 62)).noteName()).toBe('D#');
		});
		it('Clicking 215, 45 should be note A', function(){
			expect(sf.fromCoord(new Coord(215, 45)).noteName()).toBe('A');
		});
	});

	describe('prototype.toCoord(...) tests (Completely dependent on Fboard.geometry values)', function(){
		it('Should accept a StringFret and return a Coord representing center', function(){
			pending();
		});
	});
});
