
/**
 * @class {Rampage.gui.items.RImage}
 * @extends {Rampage.gui.RItem}
 * Represent an image
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param path {String} The path for the Image
 */
Rampage.gui.items.RImage = function(path) {
	this.className = 'Rampage.gui.items.RImage';
	this.extends(Rampage.gui.RItem);
	this.bind('image');
	
	/**
	 * Gets and sets the path for the image
	 * @param src {String} The new path
	 * @return {String}
	 */
	this.path = function(src) {
		if(src) path = src;
		return path;
	};
	
	/**
	 * Proceeds an action when an event is dispatched
	 * @param event {Rampage.core.Event} 
	 */
	this.proceedAction = function(event) {
		var actionEvent = new Rampage.core.events.ActionEvent(event, this, this.actionCommand());
		this.parent.proceedAction(actionEvent);
	};
};

ko.bindingHandlers.image = {
	init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		// This will be called when the binding is first applied to an element
		// Set up any initial state, event handlers, etc. here
		var item = ko.utils.unwrapObservable(valueAccessor());
		var jElement = $(element);
		jElement.attr('src', Rampage.Core.applicationPath() + item.path());
		jElement.on('click', function(event) {
			item.proceedAction(event);
		});
	},
	update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    	// This will be called once when the binding is first applied to an element,
    	// and again whenever the associated observable changes value.
    	// Update the DOM element based on the supplied values here.
	},
};