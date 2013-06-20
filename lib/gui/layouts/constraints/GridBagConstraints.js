/**
 * @class {Rampage.gui.layouts.constraints.GridBagConstraints}
 * Represents constraints (bounds and sizes) for a grid bag layout appended item
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 */
Rampage.gui.layouts.constraints.GridBagConstraints = function() {
	this.className = 'Rampage.gui.layouts.constraints.GridBagConstraints';

	/**
	 * @type Number The x-offset of the item
	 */
	this.gridx		=	0;
	
	/**
	 * @type Number The y-offset of the item
	 */
	this.gridy 		=	0;
	
	/**
	 * @type Number The width (in columns) of the item
	 */
	this.gridwidth	=	0;
	
	/**
	 * @type Number The height (in rows) of the item
	 */
	this.gridheight	=	0;
};