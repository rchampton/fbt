// Define Coord
(function(w){
	var Coord=function(x,y){
		this.x=x||0
			, this.y=y||0;
	};

	Coord.prototype.toString = function() {
		return '(' + this.x + ', ' + this.y + ')';
	};

	// Export Coord to window
	w.Coord=Coord;
})(window);