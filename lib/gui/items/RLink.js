/**
 * @class {Rampage.gui.items.RLink}
 * @extends {Rampage.gui.RItem}
 * Represents a hyper link to somewhere
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param text {String} The text of the link
 * @param href {String} The address of the link
 */
Rampage.gui.items.RLink = function(text, href) {
	this.className = 'Rampage.gui.items.RLink';
	this.extends(Rampage.gui.RItem);

	/**
	 * @type String Value for null links
	 */
	var NULL_HREF = '#';

	this.text(text);
	if(!href) href = NULL_HREF;

	/**
	 * Sets and gets the href of the link
	 * @param _href {String} The new HREF
	 */
	this.href = function(_href) {
		if(_href) {
			href = _href;
			this.modelParam('href', href);
		}
		return href;
	};
	
	/**
	 * Sets and gets the text of the link
	 * @param _text {String} The new text for the link
	 * @return {String} The current text
	 */
	this.text = function(_text) {
		if(_text) {
			text = _text;
			this.text(text);
		}
		return text;
	};
};