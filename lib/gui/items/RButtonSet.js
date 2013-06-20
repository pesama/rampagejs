/**
 * @class {Rampage.gui.items.RButtonSet}
 * @extends {Rampage.gui.RItem}
 * Represents a button set drawn by jQueryUI
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 *
 * @param type {String} Defines the type of the buttonset
 */
Rampage.gui.items.RButtonSet = function(type) {
	this.className = 'Rampage.gui.items.RButtonSet';
	this.extends(Rampage.gui.RItem);

	/**
	 * @type Object Options for the font
	 */
	var fontOptions = null;

	/**
	 * Initializes the context
	 * @Override
	 */
	this.initContext = function() {
		this.parent.initContext();
		this.dom().buttonset();
	};

	/**
	 * Adds an option to the button set
	 * @param title {String} The title for the option
	 * @param option {Rampage.gui.items.RInput} The input element representing the option (radio, checkbox...)
	 * @param checked {boolean} Defines whether the option is checked
	 * @param mnenonic {Character || Array} Mnemonic for the option
	 */
	this.option = function(title, option, checked, mnemonic) {
		var label = new Rampage.gui.items.RInputLabel(title, option);
		if(mnemonic) label.mnemonic(mnemonic);
		if(fontOptions) label.font(fontOptions.family, fontOptions);
		if(checked) option.checked(true);
		else option.checked(false);
		option.group(this);
		this.add(label);
		this.add(option);
	};

	/**
	 * Checks an item and unchecks the rest
	 * @param id {String} The id of the item to check
	 */
	this.check = function(id) {
		var items = this.items();
		for(var i = 0; i < items.length; i++) {
			if(!items[i].checked) continue;
			if(items[i].id() === id) {
				if(type === Rampage.gui.items.RButtonSet.TYPE_UNIQUE_OPTION) items[i].checked(true);
				else items[i].checked(!items[i].checked());
			}
			else {
				if(type === Rampage.gui.items.RButtonSet.TYPE_UNIQUE_OPTION) items[i].checked(false);
			}
		}
	};

	/**
	 * Sets up the font for the options
	 * @param font {String} The name of the font
	 * @param options {Object} The font options
	 */
	this.font = function(font, options) {
		if(!options) options = new Object();
		options.family = font;
		fontOptions = options;
	};

	/**
	 * Sets and gets the type
	 * @param _type {String} The new buttonset type
	 * @return {String} The buttonset type
	 */
	this.type = function(_type) {
		if(_type) type = _type;
		return type;
	};
	
	/**
	 * Proceeds an action when an event is dispatched
	 * @override
	 * @param event {Event} The event dispatched
	 * @param item {Rampage.gui.RItem} The source item
	 */
	this.proceedAction = function(event, item) {
		var actionEvent = new Rampage.core.events.ActionEvent(event, item, item.actionCommand());
		
		var parent = this.parent;
		while(parent && parent.className !== Rampage.gui.RItem.className) {
			parent = parent.parent;
		}
		if(parent) {
			parent.proceedAction(actionEvent);
		}
	};
};

/*
 * Button set types
 */

Rampage.gui.items.RButtonSet.TYPE_UNIQUE_OPTION = 'unique_option';
Rampage.gui.items.RButtonSet.TYPE_MULTI_OPTION = 'multi_option';