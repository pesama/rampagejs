
/**
 * @class Rampage.gui.Effect
 * Visual effect to be appended to an item
 * It inherits effects from JQueryUI
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @see http://api.jqueryui.com/category/effects/
 * 
 */
Rampage.gui.Effect = function() {
	this.className = 'Rampage.gui.Effect';

	var METHOD_EFFECT 	= 'effect';
	var METHOD_SHOW 	= 'show';
	var METHOD_HIDE 	= 'hide';
	var METHOD_TOGGLE 	= 'toggle';

	/**
	 * @type String The type of the effect
	 */
	var type = null;

	/**
	 * @type String The easing for the effect
	 */
	var easing = null;

	/**
	 * @type Number The milliseconds the effect will last
	 */
	var duration = null;

	/**
	 * @type Function Function to call once the effect is completed
	 */
	var callback = null;

	/**
	 * @type Object Set of options for the effect
	 */
	var options = new Object();

	/**
	 * Executes the effect to specified item
	 * @param item {Rampage.gui.RItem} The target of the effect
	 * @param method {String} Method of execution (effect, show, hide, toggle)
	 */
	function execute(item, method) {
		if(!method) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('EFFECT_NO_METHOD'));
		}
		if(!type) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('EFFECT_NO_TYPE'));
		}

		options.effect = type;
		if(easing) options.easing = easing;
		if(duration) options.duration = duration;
		if(callback) options.complete = callback;

		var domItem = item.dom();

		domItem[method](options);
	}

	/**
	 * Sets and gets the type for the effect
	 * @param _type {String} The new type of the effect
	 * @return {String} The type of the effect
	 */
	this.type = function(_type) {
		if(_type) type = _type;
		return type;
	};

	/**
	 * Sets and gets the easing for the effect
	 * @param _easing {String} The new easing of the effect
	 * @return {String} The easing of the effect
	 */
	this.easing = function(_easing) {
		if(_easing) easing = _easing;
		return easing;
	};

	/**
	 * Sets and gets the duration for the effect (in milliseconds)
	 * @param _duration {Number} New duration of the effect
	 * @return {Number} The duration of the effect
	 */
	this.duration = function(_duration) {
		if(_duration) duration = _duration;
		return duration;
	};

	/**
	 * Sets and gets the callback for the effect
	 * @param _callback {Function} New callback
	 * @return {Function} The callback
	 */
	this.callback = function(_callback) {
		if(_callback) callback = _callback;
		return callback;
	};

	/**
	 * Adds an extra option to the effect
	 * @param name {String} The name of the option
	 * @param value {Any} The value of the option
	 */
	this.option = function(name, value) {
		options[name] = value;
	};

	/**
	 * Removes an option from the effect
	 * @param name {String} The name of the effect
	 */
	this.removeOption = function(name) {
		if(options[name] === undefined) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('EFFECT_NO_OPTION', [ 'name' ]));
		}
		delete options[name];
	};

	/**
	 * Executes the effect
	 * @param item {Rampage.gui.RItem} The item to apply the effect to
	 */
	this.effect = function(item) {
		if(!item) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('EFFECT_NO_ITEM'));
		}
		execute.call(this, item, METHOD_EFFECT);
	};

	/**
	 * Executes the effect via show
	 * @param item {Rampage.gui.RItem} The item to apply the effect to
	 */
	this.show = function(item) {
		if(!item) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('EFFECT_NO_ITEM'));
		}
		item.dom().hide();
		execute.call(this, item, METHOD_SHOW);
	};

	/**
	 * Executes the effect via hide
	 * @param item {Rampage.gui.RItem} The item to apply the effect to
	 */
	this.hide = function(item) {
		if(!item) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('EFFECT_NO_ITEM'));
		}
		item.dom().show();
		execute.call(this, item, METHOD_HIDE);
	};

	/**
	 * Executes the effect via toggle
	 * @param item {Rampage.gui.RItem} The item to apply the effect to
	 */
	this.toggle = function(item) {
		if(!item) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('EFFECT_NO_ITEM'));
		}
		execute.call(this, item, METHOD_TOGGLE);	
	};
};

Rampage.gui.Effect.TYPE_BLIND 	= 'blind';
Rampage.gui.Effect.TYPE_BOUNCE 	= 'bounce';
Rampage.gui.Effect.TYPE_CLIP 		= 'clip';
Rampage.gui.Effect.TYPE_DROP 		= 'drop';
Rampage.gui.Effect.TYPE_EXPLODE 	= 'explode';
Rampage.gui.Effect.TYPE_FADE 		= 'fade';
Rampage.gui.Effect.TYPE_FOLD 		= 'fold';
Rampage.gui.Effect.TYPE_HIGHLIGHT = 'highlight';
Rampage.gui.Effect.TYPE_PUFF 		= 'puff';
Rampage.gui.Effect.TYPE_PULSATE 	= 'pulsate';
Rampage.gui.Effect.TYPE_SCALE 	= 'scale';
Rampage.gui.Effect.TYPE_SHAKE 	= 'shake';
Rampage.gui.Effect.TYPE_SIZE 		= 'size';
Rampage.gui.Effect.TYPE_SLIDE 	= 'slide';
Rampage.gui.Effect.TYPE_TRANSFER 	= 'transfer';

Rampage.gui.Effect.EASE_LINEAR 			= 'linear';
Rampage.gui.Effect.EASE_SWING 			= 'swing';
Rampage.gui.Effect.EASE_IN_QUAD 			= 'easeInQuad';
Rampage.gui.Effect.EASE_OUT_QUAD 			= 'easeOutQuad';
Rampage.gui.Effect.EASE_IN_OUT_QUAD 		= 'easeInOutQuad';
Rampage.gui.Effect.EASE_IN_CUBIC 			= 'easeInCubic';
Rampage.gui.Effect.EASE_OUT_CUBIC 		= 'easeOutCubic';
Rampage.gui.Effect.EASE_IN_OUT_CUBIC 		= 'easeInOutCubic';
Rampage.gui.Effect.EASE_IN_QUART 			= 'easeInQuart';
Rampage.gui.Effect.EASE_OUT_QUART 		= 'easeOutQuart';
Rampage.gui.Effect.EASE_IN_OUT_QUART 		= 'easeInOutQuart';
Rampage.gui.Effect.EASE_IN_QUINT 			= 'easeInQuint';
Rampage.gui.Effect.EASE_OUT_QUINT 		= 'easeOutQuint';
Rampage.gui.Effect.EASE_IN_OUT_QUINT 		= 'easeInOutQuint';
Rampage.gui.Effect.EASE_IN_EXPO 			= 'easeInExpo';
Rampage.gui.Effect.EASE_OUT_EXPO 			= 'easeOutExpo';
Rampage.gui.Effect.EASE_IN_OUT_EXPO 		= 'easeInOutExpo';
Rampage.gui.Effect.EASE_IN_SINE 			= 'easeInSine';
Rampage.gui.Effect.EASE_OUT_SINE 			= 'easeOutSine';
Rampage.gui.Effect.EASE_IN_OUT_SINE 		= 'easeInOutSine';
Rampage.gui.Effect.EASE_IN_CIRC 			= 'easeInCirc';
Rampage.gui.Effect.EASE_OUT_CIRC 			= 'easeOutCirc';
Rampage.gui.Effect.EASE_IN_OUT_CIRC 		= 'easeInOutCirc';
Rampage.gui.Effect.EASE_IN_ELASTIC 		= 'easeInElastic';
Rampage.gui.Effect.EASE_OUT_ELASTIC 		= 'easeOutElastic';
Rampage.gui.Effect.EASE_IN_OUT_ELASTIC 	= 'easeInOutElastic';
Rampage.gui.Effect.EASE_IN_BACK 			= 'easeInBack';
Rampage.gui.Effect.EASE_OUT_BACK 			= 'easeOutBack';
Rampage.gui.Effect.EASE_IN_OUT_BACK 		= 'easeInOutBack';
Rampage.gui.Effect.EASE_IN_BOUNCE 		= 'easeInBounce';
Rampage.gui.Effect.EASE_OUT_BOUNCE 		= 'easeOutBounce';
Rampage.gui.Effect.EASE_IN_OUT_BOUNCE 	= 'easeInOutBounce';