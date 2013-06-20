
/**
 * @class {Rampage.gui.items.RButton}
 * @extends {Rampage.gui.RItem}
 * Defines a button visual component
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param text {String} The text for the button
 * @return {Rampage.gui.items.RButton}
 */
Rampage.gui.items.RButton = function(text) {
	this.className = 'Rampage.gui.items.RButton';
	this.extends(Rampage.gui.RItem);
	this.implements(Rampage.core.events.listeners.KeyListener);

	this.bind('button');
	if(text) this.text(text);

	/**
	 * @type String The icon of the button
	 */
	var icon = null;

	/**
	 * @type Rampage.util.Shortcut Stores the mnemonic for the item
	 *
	 */
	var mnemonic = null;

	/**
	 * Initializes the context
	 * @Override
	 */
	this.initContext = function() {
		this.dom().button(this.options());
	};

	/**
	 * Sets the font
	 * @param font {String} The new font
	 * @param options {Object} Font options
	 */
	this.font = function(font, options) {
		if(!options) options = new Object();
		options.family = font;
		this.styleParam('font', '', options);
	};

	/**
	 * Disables the button
	 */
	this.disable = function() {
		this.option('disabled', true);
	};

	/**
	 * Enables the button
	 */
	this.enable = function() {
		this.option('disabled', false);
	};

	/**
	 * Sets and gets the icon
	 * @return {String}
	 */
	this.icon = function(_icon) {
		if(_icon) icon = _icon;
		return icon;
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
	 * @override
	 */
	this.proceedAction = function(event) {
		var actionEvent = new Rampage.core.events.ActionEvent(event, this, this.actionCommand());
		this.parent.proceedAction(actionEvent);
	};
};

ko.bindingHandlers.button = {
	init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		// This will be called when the binding is first applied to an element
		// Set up any initial state, event handlers, etc. here
		var item = ko.utils.unwrapObservable(valueAccessor()); 
		var jElement = $(element);
		jElement.button();
		//jElement.text(item.getText());
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