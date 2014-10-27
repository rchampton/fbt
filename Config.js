(function(w){
	var stringstouse=[1,2,3,4,5,6];
	var fretstouse=[0,1,2,3,4,5,6,7,8,9,10,11];

	// Config values
	var user='Mr Mr';
	var tuningdisplay='E,B,G,D,A,E';
	var tuning=['E','B','G','D','A','E'];
	var stringsdisplay='1-6';
	var strings=[1,2,3,4,5,6];
	var fretsdisplay='0-12';
	var frets=[0,1,2,3,4,5,6,7,8,9,10,11];
	var bShowTime=false;
	var bShowFlats=false;

	function parseArrayField(arrayAsString){
		var result=[]
			, values=arrayAsString.split(',');
		try{
			for(var i=0, max=values.length; i<max; i++){
				if(values[i].indexOf('-')==-1){
					// Individual value , not range
					result.push(values[i]);
				}else{
					// Range value, get left and right
					var left=values[i].split('-')[0]
						, right=values[i].split('-')[1];
					for(var j=left; j<=right; j++){
						result.push(j);
					}
				}
			}
		}catch(e){
			console.error('Error parsing value ' + arrayAsString);
			return undefined;
		}

		return result;
	}

	function loadDefaults(){
		console.debug('app.Config.loadDefaults entered');
		app.Settings.set('user', 'User');
		app.Settings.set('tuning', ['E','B','G','D','A','E']);// Note the order here is string#-1, string#-2,...
		app.Settings.set('tuningdisplay', 'E,B,G,D,A,E');
		app.Settings.set('strings', [1,2,3,4,5,6]);
		app.Settings.set('stringsdisplay', '1-6');
		app.Settings.set('frets', [0,1,2,3,4,5,6,7,8,9,10,11]);
		app.Settings.set('fretsdisplay', '0-11');
		app.Settings.set('bShowTime', false);
		app.Settings.set('bShowFlats', false);
	}

	function loadPresets(presetValue){
		console.debug('TODO implement presets, presetValue ' + presetValue);
		switch(presetValue){
			default:
				break;
		}
	}

	function save(){
		app.Settings.set('user', user);
		app.Settings.set('tuning', tuning);
		app.Settings.set('strings', strings);
		app.Settings.set('frets', frets);
		app.Settings.set('bShowTime', bShowTime);
		app.Settings.set('bShowFlats', bShowFlats);
	}

	// Export Config to app
	app.Config={
		set User(val){return user=val;}
		, get User(){return user;}
		, set Tuning(val){
			tuning=parseArrayField(val)
			if(tuning!=undefined){
				tuningdisplay=val;
			}else{
				tuning=[];
				tuningdisplay='Parse error';
			}
			return tuningdisplay;
		}
		, get Tuning(){return tuning;}
		, get Tuningdisplay(){return tuningdisplay;}
		, get Numstrings(){return tuning.length;}
		, set Strings(val){
			strings=parseArrayField(val);
			if(strings!=undefined){
				stringsdisplay=val;
			}else{
				strings=[];
				stringsdisplay='Parse error';
			}
			return stringsdisplay;
		}
		, get Strings(){return strings;}
		, get Stringsdisplay(){return stringsdisplay;}
		, set Frets(val){
			frets=parseArrayField(val);
			if(frets!=undefined){
				fretsdisplay=val;
			}else{
				frets=[];
				fretsdisplay='Parse error';
			}
			return fretsdisplay;
		}
		, get Frets(){return frets;}
		, get Fretsdisplay(){return fretsdisplay;}
		, set Showtime(val){return bShowTime=val;}
		, get Showtime(){return bShowTime;}
		, set Showflats(val){return bShowFlats=val;}
		, get Showflats(){return bShowFlats;}
		, loadDefaults: loadDefaults
		, loadPresets: loadPresets
		, save: save
	};
})(window);