
/**
 * @namespace Rampage.core
 * @module
 * @class Event
 * @desc Every event dispatched within RampageJS will inherit this class.
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 */
Rampage.core.Event = function() {
	this.className = 'Rampage.core.Event';
	this.extends(Rampage.RClass);

	/**
	 * @type Event 
	 * @desc Original event
	 *
	 * @private
	 * @inner
	 * @memberOf Event
	 */
	var originalEvent = null;

	/**
	 * @type RItem
	 * @desc Item that triggered the event
	 *
	 * @private
	 * @inner
	 * @memberOf Event
	 */
	var source = null;

	/**
	 * @public
	 * @function Event#event
	 * @desc Sets and gets the event
	 * @param [evt] {Event} The new event
	 * @return {Event} The event
	 */
	this.event = function(evt) {
		if(evt) originalEvent = evt;
		return originalEvent;
	};

	/**
	 * @public
	 * @function Event#source
	 * @desc Sets and gets the source
	 * @param [src] {RItem} The new item to set
	 * @return {RItem}
	 */
	this.source = function(src) {
		if(src) source = src;
		return source;
	};
};