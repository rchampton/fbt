// Define StringFret (A string number and fret number)
(function(w){
	// TODO we want to be able to toggle b/w Flats, Sharps, and Scale degree (ie-- I ii iii IV ...)
	var displayAsFlats=false;

	// Setup default Fboard if it's not found 
	if(typeof Fboard=='undefined'){
		Fboard={}; // Do NOT use var here bc during testing we need Fboard attached to window object
		Fboard.tunings=['E','B','G','D','A','E'];
		Fboard.geometry={
			top: 33
			, left: 33
			, intrastringWidth: 20
			, stringLength: 520 // 13 * fretWidth
			, fretCount: 12
			, fretWidth: 40
		};
	}

	var StringFret=function(string, fret){
		// +fret ensures fret is treated as a number not as a string
		this.string=+string||0;
		this.fret=+fret||0;
	};

	StringFret.prototype.toString=function(){
		var suffix="";
		switch(this.fret.toString().substring(this.fret.length-1)){
			case "1":
				suffix="st";
				break;
			case "2":
				suffix="nd";
				break;
			case "3":
				suffix="rd";
				break;
			default:
				suffix="th";

		}
		return (this.fret===0)
			?'Open ' + this.string + ' string'
			:this.fret + suffix + ' fret of ' + Fboard.tunings[this.string-1] + ' string';
	};

	StringFret.prototype.noteName=function(){
		var baseNote=Fboard.tunings[this.string-1];
		var scale=['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
		var scaleAsFlats=['A','Bb','B','C','Db','D','Eb','E','F','Gb','G','Ab'];

		if(displayAsFlats)
			scale=scaleAsFlats;
		var initIndex=scale.indexOf(baseNote);

		// initIndex=0 and this.fret = "0" totally screwing result up number + string
		var index=(initIndex+parseInt(this.fret))%scale.length;
		return scale[index];
	};

	StringFret.prototype.equals=function(otherStringFret){
		if(this.string===otherStringFret.string&&this.fret===otherStringFret.fret)
			return true;

		return false;
	};

	StringFret.prototype.random=function(validStrings, validFrets){
		if(validStrings==null)
			validStrings=[1,2,3,4,5,6];
		if(validFrets==null)
			validFrets=[0,1,2,3,4,5,6,7,8,9,10,11];
		var randomString=(Math.random()*1000>>0)%validStrings.length
			, randomFret=(Math.random()*1000>>0)%validFrets.length;
		this.string=validStrings[randomString];
		this.fret=validFrets[randomFret];

		return this;
	};

	StringFret.prototype.fromCoord=function(coord){
		var boxHeight=Fboard.geometry.intrastringWidth;
		this.string=Math.floor((coord.y-Fboard.geometry.top)/boxHeight)+1;
		this.fret=Math.floor((coord.x-Fboard.geometry.left)/Fboard.geometry.fretWidth)+1;

		if(this.string>Fboard.tunings.length||this.string<1
			||this.fret>Fboard.geometry.fretCount||this.fret<0){
			this.string=0;
			this.fret=0;
			return null; // Indicates coord supplied doesn't map to valid StringFret
		}
		return this;
	};

	StringFret.prototype.toCoord=function(){
		// Given a String & Fret return a Coord representing the center of the note
		var c=new Coord(0,0);
		c.x=Fboard.geometry.left + Fboard.geometry.fretWidth*(this.fret-1) + Math.floor(Fboard.geometry.fretWidth/2);
		c.y=Fboard.geometry.top + Fboard.geometry.intrastringWidth*this.string - Math.floor(Fboard.geometry.intrastringWidth/2);
		return c;
	};

	StringFret.prototype.toggleFlats=function(){displayAsFlats=!displayAsFlats;}

	// Export StringFret to window
	w.StringFret=StringFret;
})(window);