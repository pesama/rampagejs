/**
 * @namespace Rampage.core.managers
 * @module
 * @class MouseManager
 * @extends Manager
 * @desc Controls all mouse-related events, notifying their attached listeners
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @property {String} MouseManager.MOUSE_EVENT_CLICK 	- Event type for click events
 * @property {String} MouseManager.MOUSE_EVENT_OVER 	- Event type for mouse over events
 * @property {String} MouseManager.MOUSE_EVENT_OUT 		- Event type for mouse out events
 * @property {String} MouseManager.MOUSE_EVENT_MOVE 	- Event type for mouse move events
 * @property {String} MouseManager.MOUSE_EVENT_DOWN 	- Event type for mouse down events
 * @property {String} MouseManager.MOUSE_EVENT_UP 		- Event type for mouse up events
 */
Rampage.core.managers.MouseManager = function() {
	this.className = 'Rampage.core.managers.MouseManager';
	this.extends(Rampage.core.Manager);
	
	/**
	 * @public
	 * @function MouseManager#bind
	 * @desc Binds an item to some event
	 * @param eventType {String} The type of event (e.g. click)
	 * @param item {RItem} The item to bind
	 */
	this.bind = function(eventType, item) {
		item.dom().on(eventType, function(evt) {
			var actionEvent = new Rampage.core.events.ActionEvent(evt, item, item.actionCommand());
			item.proceedAction(actionEvent);
		});
	};
};

Rampage.core.managers.MouseManager.MOUSE_EVENT_CLICK 	= 'click';
Rampage.core.managers.MouseManager.MOUSE_EVENT_OVER 	= 'mouseover';
Rampage.core.managers.MouseManager.MOUSE_EVENT_OUT 		= 'mouseout';
Rampage.core.managers.MouseManager.MOUSE_EVENT_MOVE 	= 'mousemove';
Rampage.core.managers.MouseManager.MOUSE_EVENT_DOWN 	= 'mousedown';
Rampage.core.managers.MouseManager.MOUSE_EVENT_UP 		= 'mouseup';