/**
 * @namespace Rampage.core.events
 * @module
 * @class NavigationEvent
 * @extends Event
 * @desc Event dispatched on navigation actions
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param actionType {String} Whether the action loaded is an Activity or a View
 * @param actionClassName {String} The className of the new action
 * @param popStateEvent {PopStateEvent} The original Pop State Event
 * 
 */
Rampage.core.events.NavigationEvent = function(actionType, actionClassName, popStateEvent) {
	this.className = 'Rampage.core.events.NavigationEvent';
	this.extends(Rampage.core.Event);

	this.event(popStateEvent);
	this.source(Rampage.Core);

	/**
	 * @public
	 * @function NavigationEvent#actionType
	 * @desc Get the action type
	 * @return {String} The action type (Activity or View)
	 */
	this.actionType = function() {
		return actionType;
	};

	/**
	 * @public
	 * @function NavigationEvent#actionClassName
	 * @desc Get the action className
	 * @return {String} The action className
	 */
	this.actionClassName = function() {
		return actionClassName;
	};
};