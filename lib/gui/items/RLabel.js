
/**
 * @class {Rampage.gui.items.RLabel}
 * @extends {Rampage.gui.RItem}
 * Defines a label element
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param text {String} The text for the label
 */
Rampage.gui.items.RLabel = function(text) {
	this.className = 'Rampage.gui.items.RLabel';
	this.extends(Rampage.gui.RItem);
	this.implements(Rampage.core.events.listeners.KeyListener);

	this.text(text);

	/**
	 * @type Rampage.gui.RItem Component identified by the label
	 */
	var labelFor = null;

	/**
	 * @type Rampage.util.Shortcut Stores the mnemonic for the item
	 *
	 */
	var mnemonic = null;

	/**
	 * Sets and gets the alignment for the label
	 * @param algnmt {String} The new alignment
	 */
	this.alignment = function(algnmt) {
		if(algnmt) this.styleParam('text-align', algnmt);
	};

	/**
	 * Sets and gets the labelFor for the label
	 * @param element {Rampage.gui.RItem} The new element
	 * @return {Rampage.gui.items.RItem}
	 */
	this.labelFor = function(element) {
		if(element) {
			labelFor = element;
			this.modelParam('for', element.id());
		}
		return labelFor;
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
	 * Proceeds an action when an event is fired
	 * @param event {Rampage.core.Event}
	 */
	this.proceedAction = function(event) {
		if(labelFor) {
			labelFor.proceedAction(event);
			return;
		}

		this.parentItem().proceedAction(event);
	};

	/**
	 * Sets up the font for the label
	 * @param font {String} The name of the font
	 * @param options {Object} The options for the object
	 */
	this.font = function(font, options) {
		options.family = font;
		this.styleParam('font', '', options);
	};
};