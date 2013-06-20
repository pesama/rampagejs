/**
 * @class {Rampage.gui.items.RTextInput}
 * @extends {Rampage.gui.items.RInput}
 * Represents a text input
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param text {String} The text of the item
 * 
 */
Rampage.gui.items.RTextInput = function(text) {
	this.className = 'Rampage.gui.items.RTextInput';
	this.extends(Rampage.gui.items.RInput);
	if(text) this.value(text);

};