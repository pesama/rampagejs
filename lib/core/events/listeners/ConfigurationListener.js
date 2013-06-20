/**
 * @namespace Rampage.core.events.listeners
 * @module
 * @class ConfigurationListener
 * @extends Listener
 * @interface
 * @desc Listens configuration changes events
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 */
Rampage.core.events.listeners.ConfigurationListener = function() {
	this.className = 'Rampage.core.events.listeners.ConfigurationListener';
	this.extends(Rampage.core.events.Listener);

	/**
	 * @type String
	 * @desc Name of the handler action
	 *
	 * @private
	 * @inner
	 * @memberOf ConfigurationListener
	 */
	var eventHandler 	= 'configurationChanged';
	
	/**
	 * @type String
	 * @desc ClassName of the accepted event
	 *
	 * @private
	 * @inner
	 * @memberOf ConfigurationListener
	 */
	var acceptedEvent 	= Rampage.core.events.ConfigurationEvent.className;

	this.handler(eventHandler);
	this.registerEvent(acceptedEvent);
	
	/**
	 * @public 
	 * @function ConfigurationListener#configurationChanged
	 * @augments Event#eventListener
	 * @desc Function called on event dispatching
	 * @param event {ConfigurationEvent} The event dispatched
	 * @param listener {RItem} The Handler to proceed the action with
	 */
	this.configurationChanged = function(event, listener) {
		Rampage.log(Rampage.LOG_DEBUG, this.className, Rampage.message('CALLING_CONFIGURATION_CHANGE'));
		listener.configurationChanged(event);
	};
};