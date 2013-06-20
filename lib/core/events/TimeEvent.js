/**
 * @namespace Rampage.core.events
 * @module
 * @class TimeEvent
 * @extends Event
 * @desc Event dispatched on time actions
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param clk {Number} Current clock count
 * @param milliseconds {Number} Current milliseconds
 * @param expression {String} The evaluated expression
 * 
 */
Rampage.core.events.TimeEvent = function(clk, milliseconds, expression) {
	this.className = 'Rampage.core.events.TimeEvent';
	this.extends(Rampage.core.Event);

	/**
	 * @public
	 * @function TimeEvent#clk
	 * @desc Get the current CLK
	 * @return {Number} The current CLK
	 */
	this.clk = function() {
		return clk;
	};


	/**
	 * @public
	 * @function TimeEvent#milliseconds
	 * @desc Get the current milliseconds
	 * @return {Number} The current milliseconds
	 */
	this.milliseconds = function() {
		return milliseconds;
	};

	/**
	 * @public
	 * @function TimeEvent#expression
	 * @desc Get the evaluated expression
	 * @return {String} The expression
	 */
	this.expression = function() {
		return expression;
	};
};