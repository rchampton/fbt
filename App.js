if(!window.app){
	var storekey='Settings.store';
	var app={};
	app.Settings={};

	app.init=function(){
		console.debug('app.init called');

		if(sessionStorage.getItem(storekey)!=undefined){
			app.Settings.store=JSON.parse(sessionStorage.getItem(storekey));
			console.debug('Rehydrated app.Settings.store with existing object');
		}
		else {
			app.Settings.store={};
			app.Config.loadDefaults();
			app.Settings.store=JSON.parse(sessionStorage.getItem(storekey));
			console.debug('app.Config defaults loaded');
		}
	};

	app.Settings.get=function(key){
		return app.Settings.store[key];
	};

	app.Settings.set=function(key, value, defaultFlag){
		defaultFlag=(defaultFlag==undefined)?false:defaultFlag;

		if(defaultFlag){
			if(app.Settings.store[key]==undefined){
				app.Settings.store[key]=value;
			}
		}else{
			app.Settings.store[key]=value;
		}

		sessionStorage.removeItem(storekey);
		sessionStorage.setItem(storekey, JSON.stringify(app.Settings.store));
	};

	app.Settings.del=function(key){
		if(this.store[key]!=undefined){
			delete this.store[key];
			sessionStorage.removeItem(storekey);
			sessionStorage.setItem(storekey, JSON.stringify(this.store));
			return true;
		}
		return false;
	}

	// Export app to window
	window.app=app;
}

$(function(){
	app.init();
});