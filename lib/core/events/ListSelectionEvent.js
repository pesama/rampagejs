
/**
 * @namespace Rampage.core.events
 * @module
 * @class ListSelectionEvent
 * @extends Event
 * @desc Event dispatched when a list item is selected
 *
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 *
 * @param event {Event} Original event
 * @param source {Rampage.gui.RItem} The item that dispatched the event
 * @param index {Number} The index of the selected element
 * @param item {Rampage.gui.RItem} Selected item
 */
Rampage.core.events.ListSelectionEvent = function(event, source, index, item) {
	this.className = 'Rampage.core.events.ListSelectionEvent';
	this.extends(Rampage.core.Event);

	this.event(event);
	this.source(source);

	/**
	 * @public
	 * @function ListSelectionEvent#index
	 * @desc Returns the selected index
	 * @return {Number} The selected index
	 */
	this.index = function() {
		return index;
	};

	/**
	 * @public
	 * @function ListSelectionEvent#item
	 * @descReturns the selected item
	 * @return RItem The selected item
	 */
	this.item = function() {
		return item;
	};
};