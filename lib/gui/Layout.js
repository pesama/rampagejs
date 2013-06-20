/**
 *
 * @class Rampage.gui.Layout
 * Defines a layout for a panel
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 */
Rampage.gui.Layout = function() {
	this.className = 'Rampage.gui.Layout';

	/**
	 * @type Number margin for the layout positions
	 */
	var margin = 0;

	/**
	 * Sets and gets the margin
	 * @param mrg {Number} new margin for the element
	 * @return {Number}
	 */
	this.margin = function(mrg) {
		if(mrg) margin = mrg;
		return margin;
	};

};