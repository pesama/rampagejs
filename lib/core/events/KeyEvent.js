/**
 * @namespace Rampage.core.events
 * @module
 * @class KeyEvent
 * @extends Event
 * @desc Event dispatched on keyboard actions
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param event {Event} Original event
 * @param source {Mixed} The source of the event 
 * @param keyStack {Array} List of keys pressed
 * @param control {Boolean} Whether the control key is pressed
 * @param shift {Boolean} Whether the shift key is pressed
 * @param alt {Boolean} Whether the alt key is pressed
 * @param command {Boolean} Whether the command key (or Windows key) is pressed
 * @param lastAction {String} Last run action
 */
Rampage.core.events.KeyEvent = function(event, source, keyStack, control, shift, alt, command, lastAction) {
	this.className = 'Rampage.core.events.KeyEvent';
	this.extends(Rampage.core.Event);

	this.event(event);
	this.source(source);

	/**
	 * @public
	 * @function KeyEvent#keyStack
	 * @desc Get the current stack of keys pressed
	 * @return {Array} The list of keys pressed
	 */
	this.keyStack = function() {
		return keyStack;
	};

	/**
	 * @public
	 * @function KeyEvent#control
	 * @desc Returns whether the control key is pressed
	 * @return {Boolean} True if control is pressed, false otherwise
	 */
	this.control = function() {
		return control;
	};

	/**
	 * @public
	 * @function KeyEvent#shift
	 * @desc Returns whether the shift key is pressed
	 * @return {Boolean} True if shift is pressed, false otherwise
	 */
	this.shift = function() {
		return shift;
	};

	/**
	 * @public
	 * @function KeyEvent#alt
	 * @descReturns whether the alt key is pressed
	 * @return {Boolean} True if alt is pressed, false otherwise
	 */
	this.alt = function() {
		return alt;
	};

	/**
	 * @public
	 * @function KeyEvent#command
	 * @desc Returns whether the command key is pressed
	 * @return {Boolean} True if command is pressed, false otherwise
	 */
	this.command = function() {
		return command;
	};

	/**
	 * @public
	 * @function KeyEvent#lastAction
	 * @desc Returns the last executed action
	 * @return {String} The last executed action
	 */
	this.lastAction = function() {
		return lastAction;
	};
};