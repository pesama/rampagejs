/**
 * @namespace Rampage.core
 * @module
 * @class Manager
 * @extends RClass
 * @desc Controls event-related actions, such as listening to events and dispatch them.
 * 
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 */
Rampage.core.Manager = function() {
	this.className = 'Rampage.core.Manager';
	this.extends(Rampage.RClass);

	/**
	 * @type Object 
	 * @desc List of listeners for the manager
	 *
	 * @private
	 * @inner
	 * @memberOf Manager
	 */
	var listeners = new Object();
	
	/*
	 * Event dispatching and listening
	 */
	
	/**
	 * @function Manager#addEventListener
	 * @desc Adds a listener to some event.
	 * @param event {String} The className of the event
	 * @param handler {Function} Method to be launched when handling the event.
	 * 
	 * @public
	 */
	this.addEventListener = function(event, handler) {
		var implementations = handler.implementations();
		var listener = null;
		for(var i = 0; i < implementations.length; i++) {
			var current = implementations[i];
			if(current.accepts(event)) {
				listener = current;
				break;
			}
		}

		if(!listener) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('NOT_APPROPRIATE_LISTENER', [ handler.className, event ]));
		}

		var listenerString = event;
		if(!listeners[listenerString]) {
			listeners[listenerString] = new Array();
		}
		if(listeners[listenerString].indexOf(handler) === -1) {
			listeners[listenerString].push(handler);
		}
	};
	
	/**
	 * @function Manager#removeEventListener
	 * @desc Removes a listener from the stack, preventing it from 
	 * being further dispatched
	 * 
	 * @public
	 */
	this.removeEventListener = function(listener) {
		if(listeners.indexOf(listener) === -1) {
			Rampage.log(Rampage.LOG_WARNING, this.className, Rampage.message('NON_EXISTING_LISTENER'), [ listener.className ]);
		}
	};
	
	/**
	 * @function Manager#dispatchEvent
	 * @desc Dispatches an event
	 * @param event {Rampage.core.Event} Event to be dispatched
	 * @param [_listeners] {Rampage.core.events.Listener|Array} The listener to dispatch to (or array of)
	 * 
	 * @public
	 */
	this.dispatchEvent = function(event, _listeners) {
		var eventType = event.className;

		var listenerString = eventType;
		
		function dispatch(listener, handler) {
			listener.eventListener(event, handler);
		}
		
		if(_listeners) {
			if(_listeners.hasClassName && _listeners.hasClassName(Rampage.core.events.Listener.className)) {
				dispatch(_listeners);
				return;
			}
			handlers = new Array();
		} else _listeners = listeners[eventType];
		
		if(!_listeners) {
			if(!this.config('MANAGER_SILENT_EXCEPTIONS')) {
				Rampage.log(Rampage.LOG_WARNING, this.className, Rampage.message('DISPATCH_NONEXISTING_EVENT', [ listenerString ]));
			}
			return;
		}
		
		for(var i = 0; i < _listeners.length; i++) {
			handlers = new Array();
			var current = _listeners[i];
			var implementations = current.implementations();
			for(var f = 0; f < implementations.length; f++) {
				var currentImplementation = implementations[f];
				if(currentImplementation.accepts(eventType)) {
					dispatch(currentImplementation, current);
				}
			}
		}
	};
};