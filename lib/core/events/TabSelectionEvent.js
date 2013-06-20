
/**
 * @namespace Rampage.core.events
 * @module
 * @class TabSelectionEvent
 * @extends Event
 * @desc Event that is dispatched when user changes tabs 
 *
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 *
 * @param event {Event} Original event
 * @param source {RItem} Item that triggered the event
 * @param oldTab {RAccordionTab}
 */
Rampage.core.events.TabSelectionEvent = function(event, source, oldTab, newTab) {
	this.className = 'Rampage.core.events.TabSelectionEvent';
	this.extends(Rampage.core.Event);

	this.event(event);
	this.source(source);

	/**
	 * @public
	 * @function TabSelectionEvent#newTab
	 * @desc Returns the tab that is selected in the new state
	 * @return RTab
	 */
	this.newTab = function() {
		return newTab;
	};

	/**
	 * @public
	 * @function TabSelectionEvent#oldTab
	 * @desc Returns the tab that is selected in the old state
	 * @return RTab
	 */
	this.oldTab = function() {
		return oldTab;
	};
};