/**
 * @namespace Rampage.core.events.listeners
 * @module
 * @class ActionListener
 * @extends Listener
 * @interface
 * @desc Listens to actions dispatched by items
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 */
Rampage.core.events.listeners.ActionListener = function() {
	this.className = 'Rampage.core.events.listeners.ActionListener';
	this.extends(Rampage.core.events.Listener);

	/**
	 * @type String
	 * @desc Name of the handler action
	 *
	 * @private
	 * @inner
	 * @memberOf ActionListener
	 */
	var eventHandler 	= 'actionPerformed';
	
	/**
	 * @type String
	 * @desc ClassName of the accepted event
	 *
	 * @private
	 * @inner
	 * @memberOf ActionListener
	 */
	var acceptedEvent 	= Rampage.core.events.ActionEvent.className;

	this.handler(eventHandler);
	this.registerEvent(acceptedEvent);
	
	/**
	 * @public
	 * @function ActionListener#actionPerformed
	 * @augments Event#eventListener
	 * @desc Function called on event dispatching
	 * @param event {ActionEvent} The event dispatched
	 * @param listener {RItem} The Handler to proceed the action with
	 */
	this.actionPerformed = function(event, listener) {
		Rampage.log(Rampage.LOG_DEBUG, this.className, Rampage.message('CALLING_ACTION_PERFORMED'));
		listener.actionPerformed(event);
	};
};