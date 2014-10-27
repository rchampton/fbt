(function(w){
	/* * * * *
	Locate [A] on String [6]
		Given a validStrings array select a string s
		Given a validFrets array select a fret f
		Prompt="Locate +(new StringFret(s, f)).noteName()+ on String +s+"

		Response=touch location

	Identify this note
		Given a validStrings array select a string s
		Given a validFrets array select a fret f
		Draw target note on fretboard
		Prompt="Identify this note"

		Response=touch note name
	* * * * */
	var Q=function(validStrings, validFrets){
		this.validStrings=validStrings||[1,2,3,4,5,6];
		this.validFrets=validFrets||[0,1,2,3,4,5,6,7,8,9,10,11];
		this.type=Q.prototype.Type.Locate;
		this.prompt="Find";
	};

	Q.prototype.Type={Locate:0, Identify:1, Mixed:2};

	Q.prototype.randomStringFret=function(){
		var randString=this.validStrings[Math.floor(Math.random()*317*13)%this.validStrings.length];
		var randFret=this.validFrets[Math.floor(Math.random()*317*13)%this.validFrets.length];
		var sf=new StringFret(randString, randFret);
		return sf;
	};

	Q.prototype.locate=function(){
		this.type=Q.prototype.Type.Locate;
		this.stringFret=this.randomStringFret();
		this.prompt="Locate " + this.stringFret.noteName() + ' on string ' + this.stringFret.string;
		return this;
	};

	Q.prototype.identify=function(){
		this.type=Q.prototype.Type.Identify;
		this.stringFret=this.randomStringFret();
		this.prompt="Identify this note";
		return this;
	};

	Q.prototype.next=function(qType){
		var newQ;

		switch(qType){
			case Q.prototype.Type.Locate:
				newQ=this.locate();
				break;
			case Q.prototype.Type.Identify:
				newQ=this.identify();
				break;
			case Q.prototype.Type.Mixed:
				var oddOrEven=Math.floor(Math.random()*317*13)%2;
				if(oddOrEven==0)
					newQ=this.locate();
				else
					newQ=this.identify();
				break;
			default:
				throw('Invalid qType ' + qType);
		}
		return this;
	};

	// Export Q to window
	w.Q=Q;
})(window);