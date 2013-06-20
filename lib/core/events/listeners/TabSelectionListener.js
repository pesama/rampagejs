/**
 * @namespace Rampage.core.events.listeners
 * @class TabSelectionListener
 * @extends Listener
 * @interface
 * @desc Listens to tab change events on Accordions and TabbedPanes
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 */
Rampage.core.events.listeners.TabSelectionListener = function() {
	this.className = 'Rampage.core.events.listeners.TabSelectionListener';
	this.extends(Rampage.core.events.Listener);

	/**
	 * @type String
	 * @desc Name of the handler action
	 *
	 * @private
	 * @inner
	 * @memberOf TabSelectionListener
	 */
	var eventHandler 	= 'tabChanged';
	
	/**
	 * @type String
	 * @desc ClassName of the accepted event
	 *
	 * @private
	 * @inner
	 * @memberOf TabSelectionListener
	 */
	var acceptedEvent 	= Rampage.core.events.TabSelectionEvent.className;

	this.handler(eventHandler);
	this.registerEvent(acceptedEvent);

	/**
	 * @public
	 * @function TabSelectionListener#tabChanged
	 * @augments Event#eventListener
	 * @desc Function called on event dispatching
	 * @param event {Rampage.core.events.TabSelectionEvent} The event dispatched
	 * @param listener {RItem} The Handler to proceed the action with
	 */
	this.tabChanged = function(event, listener) {
		Rampage.log(Rampage.LOG_DEBUG, this.className, Rampage.message('CALLING_TAB_CHANGED'));
		listener.tabChanged();
	};
};