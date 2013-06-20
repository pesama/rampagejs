/**
 * @class {Rampage.gui.items.RCheckbox}
 * @extends {Rampage.gui.RItem}
 * Represents a native HTML5 check box
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param name {String} The name of the checkbox (for grouping)
 * @param id {String} The ID of the checkbox
 */
Rampage.gui.items.RCheckbox = function(name, id) {
	this.className = 'Rampage.gui.items.RCheckbox';
	this.extends(Rampage.gui.items.RInput);
	this.bind('checkbox');

	this.name(name);
	if(id) this.id(id);

	/**
	 * @type Boolean Indicates whether the chekbox is checked
	 */
	var checked = false;

	/**
	 * @type Rampage.gui.items.RButtonSet The group that contains the checkbox
	 */
	var group = null;

	/**
	 * Sets and gets the checked flag
	 * @param chk {Boolean} The new value for the flag
	 * @return {Boolean} The current value of the flag
	 */
	this.checked = function(chk) {
		if(chk !== undefined) checked = chk;
		return checked;
	};

	/**
	 * Sets and gets the group
	 * @param grp {Rampage.gui.items.RButtonSet} The new group
	 * @return {Rampage.gui.items.RButtonSet} The current group
	 */
	this.group = function(grp) {
		if(grp) group = grp;
		return group;
	};



	/**
	 * Proceeds an action whenever a native event is dispatched
	 * @param event {Event} The native event
	 */
	this.proceedAction = function(event) {
		if(event.className === Rampage.core.events.KeyEvent.className) {
			var group = this.group();
			if(group) group.check(this.id());
		} 
		
		var actionEvent = new Rampage.core.events.ActionEvent(event, this, this.actionCommand());
		this.parent.proceedAction(actionEvent);
	};
};

ko.bindingHandlers.checkbox = {
	init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		// This will be called when the binding is first applied to an element
		// Set up any initial state, event handlers, etc. here
		var item = ko.utils.unwrapObservable(valueAccessor()); 
		var jElement = $(element);
		jElement.button();
		//jElement.text(item.getText());
		jElement.on('click', function(event) {
			if(item.group()) {
				item.group().check(item.id());
				item.group().proceedAction(event, item);
			}
			else {
				item.proceedAction(event);
			}
		});
		var checked = 	item.checked();
		if(checked) 	jElement.attr('checked', true);
		else 			jElement.attr('checked', false);
	},
	update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    	// This will be called once when the binding is first applied to an element,
    	// and again whenever the associated observable changes value.
    	// Update the DOM element based on the supplied values here.
	},
};