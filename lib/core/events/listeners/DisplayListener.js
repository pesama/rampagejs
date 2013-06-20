/**
 * @namespace Rampage.core.events.listeners
 * @module
 * @class DisplayListener
 * @extends Listener
 * @interface
 * @desc Listens to display changes events
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 */
Rampage.core.events.listeners.DisplayListener = function() {
	this.className = 'Rampage.core.events.listeners.DisplayListener';
	this.extends(Rampage.core.events.Listener);

	/**
	 * @type String
	 * @desc Name of the handler action
	 *
	 * @private
	 * @inner
	 * @memberOf DisplayListener
	 */
	var eventHandler 	= 'displayAction';
	
	/**
	 * @type String
	 * @desc ClassName of the accepted event
	 *
	 * @private
	 * @inner
	 * @memberOf DisplayListener
	 */
	var acceptedEvent 	= Rampage.core.events.DisplayEvent.className;

	this.handler(eventHandler);
	this.registerEvent(acceptedEvent);
	
	/**
	 * @public
	 * @function DisplayListener#displayAction
	 * @augments Event#eventListener
	 * @desc Function called on event dispatching
	 * @param event {Rampage.core.events.DisplayEvent} The event dispatched
	 * @param listener {RItem} The Handler to proceed the action with
	 */
	this.displayAction = function(event, listener) {
		Rampage.log(Rampage.LOG_DEBUG, this.className, Rampage.message('CALLING_DISPLAY_ACTION'));
		listener.displayAction(event);
	};
};