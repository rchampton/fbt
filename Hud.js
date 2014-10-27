(function(w){
	var ctx;
	var right=total=pct=0;
	var messages=[]; // Each object in messages is {id, text, x, y, fillStyle, font}
	var nextId=0;

	function init(context){
		ctx=context;
	}

	function removeMessage(messageId){
		for(var i=0, max=messages.length; i<max; i++)
			if(messages[i].id==messageId)
				messages.splice(i-1,1);
	}

	function pushMessage(text, x, y, fillStyle, font){
		var msg={};
		if(text==undefined||text==null)text='Undefined';
		if(fillStyle==undefined||fillStyle==null)fillStyle="green";
		if(font==undefined||font==null)font="16px sans-serif"; /* TODOFC */
		if(x==undefined||x==null){
			ctx.save();
			ctx.font=font;
			x=(ctx.canvas.width-ctx.measureText(text).width)/2; // Default to centered
			ctx.restore();
		}
		if(y==undefined||y==null)y=ctx.canvas.height/2-40;
		msg.id=nextId;
		msg.text=text;
		msg.x=x;
		msg.y=y;
		msg.fillStyle=fillStyle;
		msg.font=font;
		messages.push(msg);
		nextId+=1;
		return msg.id;
	}

	function drawMessages(){
		var msg;
		for(var i=0, max=messages.length; i<max; i++){
			msg=messages[i];
			ctx.save();
			ctx.font=msg.font;
			ctx.fillStyle=msg.fillStyle;
			ctx.fillText(msg.text, msg.x, msg.y);
			ctx.restore();
		}
	}

	function drawMessage(text, fillStyle, font, x, y){
		if(text==undefined)text='Undefined';
		if(fillStyle==undefined)fillStyle="green";
		if(font==undefined)font="40px sans-serif"; /* TODOFC */
		if(y==undefined)y=Math.floor(ctx.canvas.height/2-40);

		ctx.save();
		ctx.fillStyle=fillStyle;
		ctx.font=font;
		if(x==undefined)x=Math.floor((ctx.canvas.width-ctx.measureText(text).width)/2); // Default to centered
		ctx.fillText(text, x, y);
		ctx.restore();
	}

	function updateScore(rt, tt, pt){
		right=rt;
		total=tt;
		pct=Math.round(pt*100);
	}

	function draw(){
		ctx.save();

		var stringScore='Score ' + right+' / '+total+' ('+pct+'%)';

		ctx.fillStyle="black";
		ctx.font="18pt Tahoma"; /* TODOFC */
		ctx.fillText('Fretboard Trainer', 20, 30);
		ctx.fillStyle="black";
		// TODO replace reference to WIDTH here with something that reads the WIDTH-20 values from window.anim? object
		ctx.fillText(stringScore, WIDTH-20-20-ctx.measureText(stringScore).width, 30);

		drawMessages();

		ctx.restore();
	}

	// Export HUD
	w.hud={
		init: init
		, draw: draw
		, updateScore: updateScore
		, drawMessage: drawMessage
		, pushMessage: pushMessage
		, removeMessage: removeMessage
	};
})(window);