/**
 * @namespace  Rampage.core.events
 * @module
 * @class ActionEvent
 * @extends Event
 * @desc Action Events for Action Command dispatching
 *
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 *
 * @param event {Event} Stores original event
 * @param source {RItem} the item that dispatched the event
 * @param actionCommand {String} Defines the command that identifies the action
 */
Rampage.core.events.ActionEvent = function(event, source, actionCommand) {
	this.className = 'Rampage.core.events.ActionEvent';
	this.extends(Rampage.core.Event);

	this.event(event);
	this.source(source);

	/**
	 * @public
	 * @function ActionEvent#actionCommand
	 * @desc Returns the action command
	 * @return {String} The action command of the event
	 */
	this.actionCommand = function() {
		return actionCommand;
	};
};