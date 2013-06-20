/**
 * @namespace Rampage.core.managers
 * @module
 * @class KeyboardManager
 * @extends Manager
 * @desc Controls all key-generated events, and notifies all the listeners enabled
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 */
Rampage.core.managers.KeyboardManager = function() {
	this.className = 'Rampage.core.managers.KeyboardManager';
	this.extends(Rampage.core.Manager);

	/**
	 * @type Array
	 * @desc Stores the Array of shortcuts
	 *
	 * @private
	 * @inner
	 * @memberOf KeyboardManager
	 */
	var shortcuts = new Array();

	/**
	 * @type Array
	 * @desc List of keys pressed
	 *
	 * @private
	 * @inner
	 * @memberOf KeyboardManager
	 */
	var keyStack = new Array();

	/**
	 * @type Boolean
	 * @desc Indicates whether the Control Keys are pressed
	 *
	 * @private
	 * @inner
	 * @memberOf KeyboardManager
	 */
	var ctrl = false;

	/**
	 * @type Boolean
	 * @desc Indicates whether the shift keys are pressed
	 *
	 * @private
	 * @inner
	 * @memberOf KeyboardManager
	 */
	var shift = false;
	
	/**
	 * @type Boolean 
	 * @desc Indicates whether the Alt Keys are pressed
	 *
	 * @private
	 * @inner
	 * @memberOf KeyboardManager
	 */
	var alt = false;
	
	/**
	 * @type Boolean
	 * @desc Indicates whether the Command Keys are pressed
	 *
	 * @private
	 * @inner
	 * @memberOf KeyboardManager
	 */
	var command = false;

	/**
	 * @type Object
	 * @desc Stores all the characters and their relatives key and ascii codes
	 * 
	 * @property {Object} keyCode					- Stores the key and ascii code for all characters
	 * @property {Object} keyCode.character			- Where character is a real character (e.g. 'A', 'a'...)
	 * @property {Number} keyCode.character.keyCode	- Stores the keyCode for the character
	 * @property {Number} keyCode.character.ascii	- Stores the ascii code for the character
	 *
	 * @private
	 * @inner
	 * @memberOf KeyboardManager
	 */
	var keyCodes = {
		'A' : {
			keyCode : 65,
			ascii : 65
		},
		'B' : {
			keyCode : 66,
			ascii : 66
		},
		'C' : {
			keyCode : 67,
			ascii : 67
		},
		'D' : {
			keyCode : 68,
			ascii : 68
		},
		'E' : {
			keyCode : 69,
			ascii : 69
		},
		'F' : {
			keyCode : 70,
			ascii : 70
		},
		'G' : {
			keyCode : 71,
			ascii : 71
		},
		'H' : {
			keyCode : 72,
			ascii : 72
		},
		'I' : {
			keyCode : 73,
			ascii : 73
		},
		'J' : {
			keyCode : 74,
			ascii : 74
		},
		'K' : {
			keyCode : 75,
			ascii : 75
		},
		'L' : {
			keyCode : 76,
			ascii : 76
		},
		'M' : {
			keyCode : 77,
			ascii : 77
		},
		'N' : {
			keyCode : 78,
			ascii : 78
		},
		'O' : {
			keyCode : 79,
			ascii : 79
		},
		'P' : {
			keyCode : 80,
			ascii : 80
		},
		'Q' : {
			keyCode : 81,
			ascii : 81
		},
		'R' : {
			keyCode : 82,
			ascii : 82
		},
		'S' : {
			keyCode : 83,
			ascii : 83
		},
		'T' : {
			keyCode : 84,
			ascii : 84
		},
		'U' : {
			keyCode : 85,
			ascii : 85
		},
		'V' : {
			keyCode : 86,
			ascii : 86
		},
		'W' : {
			keyCode : 87,
			ascii : 87
		},
		'X' : {
			keyCode : 88,
			ascii : 88
		},
		'Y' : {
			keyCode : 89,
			ascii : 89
		},
		'Z' : {
			keyCode : 90,
			ascii : 90
		},
		'a' : {
			keyCode : 65,
			ascii : 97
		},
		'b' : {
			keyCode : 66,
			ascii : 98
		},
		'c' : {
			keyCode : 67,
			ascii : 99
		},
		'd' : {
			keyCode : 68,
			ascii : 100
		},
		'e' : {
			keyCode : 69,
			ascii : 101
		},
		'f' : {
			keyCode : 70,
			ascii : 102
		},
		'g' : {
			keyCode : 71,
			ascii : 103
		},
		'h' : {
			keyCode : 72,
			ascii : 104
		},
		'i' : {
			keyCode : 73,
			ascii : 105
		},
		'j' : {
			keyCode : 74,
			ascii : 106
		},
		'k' : {
			keyCode : 75,
			ascii : 107
		},
		'l' : {
			keyCode : 76,
			ascii : 108
		},
		'm' : {
			keyCode : 77,
			ascii : 109
		},
		'n' : {
			keyCode : 78,
			ascii : 110
		},
		'o' : {
			keyCode : 79,
			ascii : 111
		},
		'p' : {
			keyCode : 80,
			ascii : 112
		},
		'q' : {
			keyCode : 81,
			ascii : 113
		},
		'r' : {
			keyCode : 82,
			ascii : 114
		},
		't' : {
			keyCode : 83,
			ascii : 115
		},
		'u' : {
			keyCode : 84,
			ascii : 116
		},
		'v' : {
			keyCode : 85,
			ascii : 117
		},
		'w' : {
			keyCode : 86,
			ascii : 118
		},
		'x' : {
			keyCode : 87,
			ascii : 119
		},
		'y' : {
			keyCode : 88,
			ascii : 120
		},
		'z' : {
			keyCode : 89,
			ascii : 121
		},
		'0' : {
			keyCode : 48,
			ascii : 48
		},
		'1' : {
			keyCode : 49,
			ascii : 49
		},
		'2' : {
			keyCode : 50,
			ascii : 50
		},
		'3' : {
			keyCode : 51,
			ascii : 51
		},
		'4' : {
			keyCode : 52,
			ascii : 52
		},
		'5' : {
			keyCode : 53,
			ascii : 53
		},
		'6' : {
			keyCode : 54,
			ascii : 54
		},
		'7' : {
			keyCode : 55,
			ascii : 55
		},
		'8' : {
			keyCode : 56,
			ascii : 56
		},
		'9' : {
			keyCode : 57,
			ascii : 57
		},
		'n0' : {
			keyCode : 96,
			ascii : 48
		},
		'n1' : {
			keyCode : 97,
			ascii : 49
		},
		'n2' : {
			keyCode : 98,
			ascii : 50
		},
		'n3' : {
			keyCode : 99,
			ascii : 51
		},
		'n4' : {
			keyCode : 100,
			ascii : 52
		},
		'n5' : {
			keyCode : 101,
			ascii : 53
		},
		'n6' : {
			keyCode : 102,
			ascii : 54
		},
		'n7' : {
			keyCode : 103,
			ascii : 55
		},
		'n8' : {
			keyCode : 104,
			ascii : 56
		},
		'n9' : {
			keyCode : 105,
			ascii : 57
		},
	};

	/**
	 * @public
	 * @function KeyboardManager#start
	 * @desc Default initialization method
	 */
	this.start = function() {
		var that = this;
		window.addEventListener('keydown', function(event) {
			that.proceedAction(event, 'down');
		});

		window.addEventListener('keyup', function(event) {
			that.proceedAction(event, 'up');
		});
	};

	/**
	 * @public
	 * @function KeyboardManager#proceedAction
	 * @desc Proceeds an action when the keyboard is used
	 * @param event {KeyboardEvent} the event to proceed
	 * @param type {String} either down or up
	 */
	this.proceedAction = function(event, type) {
		switch(type) {
		case 'down':
			switch(event.keyCode) {
			case 16:
				// Shift key
				shift = true;
				break;
			case 17:
				// Control key
				ctrl = true;
				break;
			case 18:
				// Alt key
				alt = true;
				break;
			case 91:
				// Command key
				command = true;
			default:
				if(keyStack.indexOf(event.keyCode) === -1) 
					keyStack.push(event.keyCode);
			}
			break;
		case 'up':
			switch(event.keyCode) {
			case 16:
				// Shift key
				shift = false;
				break;
			case 17:
				// Control key
				ctrl = false;
				break;
			case 18:
				// Alt key
				alt = false;
				break;
			case 91:
				// Command key
				command = false;
			default:
				var index = keyStack.indexOf(event.keyCode);
				if(index !== -1) {
					keyStack.splice(index, 1);
				}
			}
			break;
		}

		var keyEvent = new Rampage.core.events.KeyEvent(event, this, keyStack, ctrl, shift, alt, command, type);
		this.dispatchEvent(keyEvent);
	};

	/**
	 * @public
	 * @function KeyboardManager#asciiCode
	 * @desc Returns the ascii code for a given character
	 * @param character {Character} The char to get the code
	 * @return {Number} The ascii code
	 */
	this.asciiCode = function(character) {
		if(!keyCodes[character]) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('KEYBOARD_UNEXISTING_KEY', [ character ]));
			return;
		}
		return keyCodes[character].ascii;
	};

	/**
	 * @public
	 * @function KeyboardManager#keyCode
	 * @desc Returns the key code for a given characted
	 * @param character {Character} The char to get the key code
	 * @return {Number} The key code
	 */
	this.keyCode = function(character) {
		if(!keyCodes[character]) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('KEYBOARD_UNEXISTING_KEY', [ character ]));
			return;
		}
		return keyCodes[character].keyCode;
	};

	/**
	 * @public
	 * @function KeyboardManager#registerShortcut
	 * @desc Registers a shortcut within the manager, to dispatch its actions when executed
	 * @param shortcut {Shortcut} Shortcut to append
	 * @param action {KeyListener} The listener of the actions
	 */
	this.registerShortcut = function(shortcut, action) {
		for(var i = 0; i < shortcuts.length; i++) {
			var current = shortcuts[i];
			if(shortcut.alt() === current.alt() && shortcut.ctrl() === current.ctrl() && shortcut.shift() === current.shift()) {
				var repeated = true;
				var shortcutChars = shortcut.characters();
				var currentChars = current.characters();
				for(var f = 0; f < shortcutChars.length; f++) {
					if(currentChars.indexOf(shortcutChars[f]) === -1) {
						repeated = false;
						break;
					}
				}
				if(repeated) {
					Rampage.log(Rampage.LOG_WARNING, this.className, Rampage.message('KEYBOARD_DUPLICATED_SHORTCUT'));
				}
			}
		}
		this.addEventListener(Rampage.core.events.KeyEvent.className, action);
	};
};