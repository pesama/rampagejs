/**
 * @namespace Rampage.core.events.listeners
 * @module
 * @class NavigationListener
 * @extends Listener
 * @interface
 * @desc Listens to navigation change events
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 */
Rampage.core.events.listeners.NavigationListener = function() {
	this.className = 'Rampage.core.events.listeners.NavigationListener';
	this.extends(Rampage.core.events.Listener);

	/**
	 * @type String
	 * @desc Name of the handler action
	 *
	 * @private
	 * @inner
	 * @memberOf NavigationListener
	 */
	var eventHandler 	= 'actionChanged';
	
	/**
	 * @type String
	 * @desc ClassName of the accepted event
	 *
	 * @private
	 * @inner
	 * @memberOf NavigationListener
	 */
	var acceptedEvent 	= Rampage.core.events.NavigationEvent.className;

	this.handler(eventHandler);
	this.registerEvent(acceptedEvent);
	
	/**
	 * @public
	 * @function NavigationListener#actionChanged
	 * @augments Event#eventListener
	 * @desc Function called on event dispatching
	 * @param event {NavigationEvent} The event dispatched
	 * @param listener {RItem} The Handler to proceed the action with
	 */
	this.actionChanged = function(event, listener) {
		Rampage.log(Rampage.LOG_DEBUG, this.className, Rampage.message('CALLING_ACTION_CHANGED'));
		listener.actionChanged(event);
	};
};