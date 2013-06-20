/**
 * @class {Rampage.gui.items.RPasswordInput}
 * @extends {Rampage.gui.items.RInput}
 * Represents a password text input
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param text {String} The initial text of the input
 * 
 */
Rampage.gui.items.RPasswordInput = function(text) {
	this.className = 'Rampage.gui.items.RPasswordInput';
	this.extends(Rampage.gui.items.RInput);
	if(text) this.value(text);
};