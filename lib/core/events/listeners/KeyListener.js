/**
 * @namespace Rampage.core.events.listeners
 * @module
 * @class KeyListener
 * @extends Listener
 * @interface
 * @desc Listens to key events
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 */
Rampage.core.events.listeners.KeyListener = function() {
	this.className = 'Rampage.core.events.listeners.KeyListener';
	this.extends(Rampage.core.events.Listener);

	/**
	 * @type String
	 * @desc Name of the handler action
	 *
	 * @private
	 * @inner
	 * @memberOf KeyListener
	 */
	var eventHandler 	= 'keyboardAction';
	
	/**
	 * @type String
	 * @desc ClassName of the accepted event
	 *
	 * @private
	 * @inner
	 * @memberOf KeyListener
	 */
	var acceptedEvent 	= Rampage.core.events.KeyEvent.className;

	this.handler(eventHandler);
	this.registerEvent(acceptedEvent);

	/**
	 * @public
	 * @function KeyListener#keyboardAction
	 * @augments Event#eventListener
	 * @desc Function called on event dispatching
	 * @param event {KeyEvent} The event dispatched
	 * @param listener {RItem} The Handler to proceed the action with
	 */
	this.keyboardAction = function(event, listener) {
		Rampage.log(Rampage.LOG_DEBUG, this.className, Rampage.message('CALLING_KEYBOARD_ACTION'));
		listener.keyboardAction(event);
	};
};