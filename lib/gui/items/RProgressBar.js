/**
 * @class {Rampage.gui.items.RProgressBar}
 * @extends {Rampage.gui.RItem}
 * Represents a progress bar
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param value {Number} The initial value of the progress bar
 */
Rampage.gui.items.RProgressBar = function(value) {
	this.className = 'Rampage.gui.items.RProgressBar';
	this.extends(Rampage.gui.RItem);

	/**
	 * Initializes the context
	 * @override
	 */
	this.initContext = function() {
		this.dom().progressbar({ value : value });
	};
	
	/**
	 * Sets and gets the value of the progress bar
	 * @param _value {Number} The new value
	 * @return {Number} The current value
	 */
	this.value = function(_value) {
		if(_value) value = _value;
		return value;
	};
};