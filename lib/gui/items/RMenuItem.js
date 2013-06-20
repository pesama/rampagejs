/**
 * @class {Rampage.gui.items.RMenuItem}
 * @extends {Rampage.gui.RItem}
 * Represents a menu item
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param id {String} The id of the item
 * @param text {String} The text of the item
 */
Rampage.gui.items.RMenuItem = function(id, text) {
	this.className = 'Rampage.gui.items.RMenuItem';
	this.extends(Rampage.gui.RItem);
	this.bind('menuitem');

	if(!id) {
		Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('MENUITEM_NULL_PARAMETER', [ 'id', id ]));
	}
	if(!text) {
		Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('MENUITEM_NULL_PARAMETER', [ 'text', text ]));
	}

	this.id(id);
	var href = new Rampage.gui.items.RLink(text);
	this.add(href);

	/**
	 * @type Rampage.gui.items.RMenu The menu which this element belongs
	 */
	var menu = null;

	/**
	 * Disables the menu item
	 */
	this.disable = function() {
		this.addClassName('ui-state-disabled');
	};

	/**
	 * Enables the menu item
	 */
	this.enable = function() {
		this.removeClassName('ui-state-disabled');
	};

	/**
	 * Sets and gets the container menu
	 * @param _menu {Rampage.gui.items.RMenu} The new container menu
	 * @return {Rampage.gui.items.RMenu} The current container menu
	 */
	this.menu = function(_menu) {
		if(_menu) menu = _menu;
		return menu;
	};

	/**
	 * Sets and gets the mnemonic for the element
	 * @param character {Character} The key to press
	 * @param _ctrl {Boolean} Whether the control key is needed
	 * @param _shift {Boolean} Whether the shift key is needed
	 * @param _alt {Boolean} Whether the alt key is needed (default true) 
	 */
	this.mnemonic = function(character, _ctrl, _shift, _alt) {
		if(character) {

			if(_ctrl 	!== true) _ctrl 	= false;
			if(_shift 	!== true) _shift 	= false;
			if(_alt 	!== false) _alt 	= true;

			mnemonic = new Rampage.util.Shortcut(character, _ctrl, _shift, _alt);
			
			var keyboardManager = Rampage.Core.keyboardManager();
			keyboardManager.registerShortcut(mnemonic, this);
		}
		return mnemonic;
	};

	/**
	 * Action proceeded on key events to verify the mnemonic
	 * @param event {Rampage.core.events.KeyEvent} The keyboard event
	 */
	this.keyboardAction = function(event) {
		if(mnemonic.validate(event)) {
			this.proceedAction(event);			
		}
	};

	/**
	 * Proceeds an action when an event is dispatched
	 * @param event {Rampage.core.Event} 
	 */
	this.proceedAction = function(event) {
		if(!menu) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('MENUITEM_NO_MENU', [ id ]));
		}
		menu.menuAction(this);
	};
};

ko.bindingHandlers.menuitem = {
	init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		// This will be called when the binding is first applied to an element
		// Set up any initial state, event handlers, etc. here
		var item = ko.utils.unwrapObservable(valueAccessor()); 
		var jElement = $(element);
		//jElement.text(item.getText());
		jElement.on('click', function(event) {
			item.proceedAction(event);
			return false;
		});
	},
	update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    	// This will be called once when the binding is first applied to an element,
    	// and again whenever the associated observable changes value.
    	// Update the DOM element based on the supplied values here.
	},
};