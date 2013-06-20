/**
 * @namespace Rampage.core.events
 * @module
 * @class Listener
 * @extends RClass
 * @interface
 * @desc Implements a basic listeners, who others will inherit
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 */
Rampage.core.events.Listener = function() {
	this.className = 'Rampage.core.events.Listener';
	this.extends(Rampage.RClass);

	/**
	 * @type Array
	 * @desc List of accepted events
	 * 
	 * @private
	 * @inner
	 * @memberOf Listener
	 */
	var allowedEvents = new Array();
	
	/**
	 * @type String
	 * @desc Name of the specific handler function
	 * 
	 * @private
	 * @inner
	 * @memberOf Listener
	 */
	var handler = null;

	/**
	 * @public
	 * @function Listener#accepts
	 * @desc Verify if the type of event is accepted
	 * @param className {String} ClassName of the event
	 * @return {Boolean} Whether the event is supported by the listener
	 */
	this.accepts = function(className) {
		if(allowedEvents.indexOf(className) === -1) return false;
		return true;
	};

	/**
	 * @public
	 * @function Listener#handler
	 * @desc Sets and gets the handler name for the event
	 * @param [_handler] {String} The new handler
	 * @return {String} The current handler
	 */
	this.handler = function(_handler) {
		if(_handler) handler = _handler;
		return handler;
	};

	/**
	 * @public
	 * @function Listener#registerEvent
	 * @descAppends a supported event type into the list
	 * @param className {String} The className of the new type of event
	 */
	this.registerEvent = function(className) {
		if(allowedEvents.indexOf(className) === -1) allowedEvents.push(className);
	};

	/**
	 * @public 
	 * @function Listener#eventListener
	 * @desc Generic method for event listening
	 * @param event {Event} The dispatched event
	 * @param handlerClass {RItem} The Handler to proceed the action with
	 */
	this.eventListener = function(event, handlerClass) {
		if(!this.accepts(event.className)) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('WRONG_LISTENER', [ this.className, event.className ]));
		}
		if(!handler) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('LISTENER_NO_HANDLER', [ this.className, event.className ]));
		}
		this[handler](event, handlerClass);
	};
};