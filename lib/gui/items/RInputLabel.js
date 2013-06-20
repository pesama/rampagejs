
/**
 * @class {Rampage.gui.items.RInputLabel}
 * @extends {Rampage.gui.items.RLabel}
 * Defines a label for an input element
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param text {String} The text for the label
 * @param lbFor {Rampage.gui.RItem} Item identified by the label 
 */
Rampage.gui.items.RInputLabel = function(text, lbFor) {
	this.className = 'Rampage.gui.items.RInputLabel';
	this.extends(Rampage.gui.items.RLabel);
	this.text(text);
	if(lbFor) this.labelFor(lbFor);
};