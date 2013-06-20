/**
 * @namespace Rampage.core.events
 * @module
 * @class DisplayEvent
 * @extends Event
 * @desc Controls the events launched by the display
 *
 * @property {String} DisplayEvent.REASON_PAINT 	- The screen has been painted
 * @property {String} DisplayEvent.REASON_CANVAS 	- The canvas has changed
 * @property {String} DisplayEvent.REASON_FLUSH 	- The screen has been flush
 * @property {String} DisplayEvent.REASON_RENDER 	- The screen has been rendered

 * @property {String} DisplayEvent.STATUS_READY 	- Status for ready screens
 * @property {String} DisplayEvent.STATUS_LOAD 		- Status for screen loading
 * @property {String} DisplayEvent.STATUS_EMPTY 	- Status for screen empty
 * 
 * @param source {Mixed} The source of the event
 * @param reason {String} The reason for the event
 * @param status {String} The status of the display
 * @param target {RItem} The target of the event
 */
Rampage.core.events.DisplayEvent = function(source, reason, status, target) {
	this.className = 'Rampage.core.events.DisplayEvent';
	this.extends(Rampage.core.Event);

	this.source(source);

	/**
	 * @public
	 * @function DisplayEvent#reason
	 * @desc Returns the reason for the event
	 * @return {String} The reason
	 */
	this.reason = function() {
		return reason;
	};

	/**
	 * @public
	 * @function DisplayEvent#status
	 * @desc Returns the status for the event
	 * @return {String} The status
	 */
	this.status = function() {
		return status;
	};

	/**
	 * @public
	 * @function DisplayEvent#target
	 * @desc Returns the target of the event
	 * @return {RItem} The reason
	 */
	this.target = function() {
		return target;
	};
};

Rampage.core.events.DisplayEvent.REASON_PAINT 	= 'paint';
Rampage.core.events.DisplayEvent.REASON_CANVAS 	= 'canvas';
Rampage.core.events.DisplayEvent.REASON_FLUSH 	= 'flush';
Rampage.core.events.DisplayEvent.REASON_RENDER 	= 'render';

Rampage.core.events.DisplayEvent.STATUS_READY 	= 'ready';
Rampage.core.events.DisplayEvent.STATUS_LOAD 	= 'load';
Rampage.core.events.DisplayEvent.STATUS_EMPTY 	= 'empty';