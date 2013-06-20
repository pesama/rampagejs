/**
 * @class {Rampage.util.Shortcut}
 * A shortcut is a keyboard action that dispatches some event
 * 
 * @param chars {Array} The list of keys needed
 * @param ctrl {Boolean} Whether the control key needs to be pressed
 * @param shift {Boolean} Whether the shift key needs to be pressed
 * @param alt {Boolean} Whether the alt key needs to be pressed
 */
Rampage.util.Shortcut = function(chars, ctrl, shift, alt) {
	this.className = 'Rampage.util.Shortcut';

	/**
	 * @type Rampage.core.managers.KeyboardManager
	 */
	var keyboardManager = Rampage.Core.keyboardManager();

	/**
	 * @type Array the real characters
	 */
	var realCharacters 	= new Array();
	
	/**
	 * @type Array the characters keyCodes
	 */
	var characters 		= new Array();

	/**
	 * Initialize the shortcut
	 */
	this.init = function() {
		if(ctrl 	!== true) ctrl 	= false;
		if(shift 	!== true) shift = false;
		if(alt 		!== true) alt 	= false;

		if(!chars) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('SHORTCUT_NO_KEYS'));
		}

		if(typeof chars === 'string') {
			this.addCharacter(chars);
		}
		else if(typeof chars === 'object') {
			for(var i = 0; i < chars.length; i++) {
				if(chars[i].length > 1) {
					Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('SHORTCUT_MULTI_KEYS', [ chars[i] ]));
				}
				this.addCharacter.push(chars[i]);
			}
		}
	};

	/**
	 * Adds a character to the stack
	 * @param _character {Character} The new character to append
	 */
	this.addCharacter = function(_character) {
		var character = keyboardManager.keyCode(_character);
		realCharacters.push(_character);
		characters.push(character);
	};

	/**
	 * Get the stack of character keyCodes
	 * @return {Array}
	 */
	this.characters = function() {
		return characters;
	};

	/**
	 * Get the stack of real characters
	 * @return {Array}
	 */
	this.realCharacters = function() {
		return realCharacters;
	};

	/**
	 * Sets and gets the alt flag
	 * @param _alt {Boolean} The new value for the flag
	 * @return {Boolean} The current value of the flag
	 */
	this.alt = function(_alt) {
		if(_alt !== undefined) alt == _alt;
		return alt;
	};

	/**
	 * Sets and gets the control flag
	 * @param _control {Boolean} The new value for the flag
	 * @return {Boolean} The current value of the flag
	 */
	this.ctrl = function(_ctrl) {
		if(_ctrl !== undefined) ctrl = _ctrl;
		return ctrl;
	};

	/**
	 * Sets and gets the shift flag
	 * @param _shift {Boolean} The new value for the flag
	 * @return {Boolean} The current value of the flag
	 */
	this.shift = function(_shift) {
		if(_shift !== undefined) shift = _shift;
		return _shift;
	};

	/**
	 * Validates whether a key event matches the shortcut
	 * @param event {Rampage.core.events.KeyEvent}
	 */
	this.validate = function(event) {
		if(event.className !== 'Rampage.core.events.KeyEvent') {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('SHORTCUT_WRONG_EVENT', [ event.className ]));
		}

		var keyStack = event.keyStack();
		if(event.control() !== ctrl || event.alt() !== alt || event.shift() !== shift || keyStack.length !== characters.length) {
			return false;
		}
		for(var i = 0; i < keyStack.length; i++) {
			if(characters.indexOf(keyStack[i]) === -1) {
				return false;
			}
		}
		return true;
	};

	this.init();
};