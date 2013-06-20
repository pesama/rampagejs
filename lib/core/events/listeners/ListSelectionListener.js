/**
 * @namespace Rampage.core.events.listeners
 * @module
 * @class ListSelectionListener
 * @extends Listener
 * @interface
 * @desc Listens to list item selection change events
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 */
Rampage.core.events.listeners.ListSelectionListener = function() {
	this.className = 'Rampage.core.events.listeners.ListSelectionListener';
	this.extends(Rampage.core.events.Listener);

	/**
	 * @type String
	 * @desc Name of the handler action
	 *
	 * @private
	 * @inner
	 * @memberOf ListSelectionListener
	 */
	var eventHandler 	= 'valueChanged';
	
	/**
	 * @type String
	 * @desc ClassName of the accepted event
	 *
	 * @private
	 * @inner
	 * @memberOf ListSelectionListener
	 */
	var acceptedEvent 	= Rampage.core.events.ListSelectionEvent.className;

	this.handler(eventHandler);
	this.registerEvent(acceptedEvent);

	/**
	 * @public
	 * @function ListSelectionListener#valueChanged
	 * @augments Event#eventListener
	 * @desc Function called on event dispatching
	 * @param event {Rampage.core.events.ListSelectionEvent} The event dispatched
	 * @param listener {RItem} The Handler to proceed the action with
	 */
	this.valueChanged = function(event, listener) {
		Rampage.log(Rampage.LOG_DEBUG, this.className, Rampage.message('CALLING_VALUE_CHANGED'));
		listener.valueChanged(event);
	};
};