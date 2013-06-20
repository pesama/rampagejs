/**
 * @class {Rampage.gui.items.RSlider}
 * @extends {Rampage.gui.items.RInput}
 * Represents a slider
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param min {Number} Mininmum value for the slider
 * @param max {Number} Maximum value for the slider
 * @param value {Number} Current value for the slider
 * @param step {Number} Step for the slider value changing
 * @param orientation {String} Whether vertical or horizontal
 * @param range {Boolean} Whether the slider represents a range
 */
Rampage.gui.items.RSlider = function(min, max, value, step, orientation, range) {
	this.className = 'Rampage.gui.items.RSlider';
	this.extends(Rampage.gui.items.RInput);

	/**
	 * Initializes the slider
	 */
	function init() {
		if(min !== undefined) this.min(min);
		if(max !== undefined) this.max(max);
		if(value !== undefined) this.value(value);
		if(step !== undefined) this.step(step);
		if(orientation !== undefined) this.orientation(orientation);
		if(range !== undefined) this.range(range);
	}

	/**
	 * Initializes the context
	 * @override
	 */
	this.initContext = function() {
		this.dom().slider(this.options());
	};

	/**
	 * Sets and gets the animate option
	 * @param animation {String|Number|Boolean} New value for the animation
	 * @return {String|Number|Boolean} 
	 */
	this.animate = function(animation) {
		if(animation) this.option('animate', animation);
		return this.option('animate');
	};

	/**
	 * Disables the slider
	 */
	this.disable = function() {
		this.option('disabled', true);
	};

	/**
	 * Enables the slider
	 */
	this.enable = function() {
		this.option('disabled', false);
	};

	/**
	 * Sets and gets the minimum value
	 * @param _min {Number} The new minimum value
	 * @return {Number} The current minimum value
	 */
	this.min = function(_min) {
		if(_min !== undefined) {
			min = _min;
			this.option('min', min);
		}
		return min;
	};

	/**
	 * Sets and gets the maximum value
	 * @param _max {Number} The new maximum value
	 * @return {Number} The current maximum value
	 */
	this.max = function(_max) {
		if(_max !== undefined) {
			max = _max;
			this.option('max', max);
		}
		return max;
	};

	/**
	 * Sets and gets the step value
	 * @param _step {Number} The new step value
	 * @return {Number} The current step value
	 */
	this.step = function(_step) {
		if(_step) {
			step = _step;
			this.option('step', step);
		}
		return step;

	};

	/**
	 * Sets and gets the orientation
	 * @param _orientation {String} The new orientation
	 * @return {String} The current orientation
	 */
	this.orientation = function(_orientation) {
		if(_orientation) {
			orientation = _orientation;
			this.option('orientation', orientation);
		}
		return orientation;
	};

	/**
	 * Sets and gets the range flag
	 * @param _range {Boolean} The new value for the flag
	 * @return {Boolean} The current value of the flag
	 */
	this.range = function(_range) {
		if(_range !== undefined) {
			range = _range;
			this.option('range', range);
		}
		return range;
	};

	/**
	 * Sets the values for range selection (only working for ranges)
	 * @param _values {Array} The new values for the ranges
	 * @return {Array} The current values of the ranges
	 */
	this.values = function(_values) {
		if(!range) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('SLIDER_VALUES_NOT_RANGE'));
		}
		if(_values) {
			this.option('values', _values);
		}
		return this.option('values');
	};

	init.call(this);
};

/*
 * Available orientations
 */

Rampage.gui.items.RSlider.ORIENTATION_VERTICAL = 'vertical';
Rampage.gui.items.RSlider.ORIENTATION_HORIZONTAL = 'horizontal';