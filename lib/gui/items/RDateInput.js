/**
 * @class {Rampage.gui.items.RDateInput}
 * @extends {Rampage.gui.items.RTextInput}
 * Enhances the text input to provide date insertion
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 */
Rampage.gui.items.RDateInput = function() {
	this.className = 'Rampage.gui.items.RDateInput';
	this.extends(Rampage.gui.items.RTextInput);

	/**
	 * Initializes the context
	 * @override 
	 */
	this.initContext = function() {
		this.dom().datepicker();
	};

	/**
	 * Sets and gets the date format
	 * @param _format {String} The new format ('dd/mm/yy' or so)
	 */
	this.format = function(_format) {
		if(_format) this.option('dateFormat', _format);
		return this.option('dateFormat');
	};
	
	/**
	 * Sets and gets the date of the input
	 * @param _date {Date} The new date
	 * @return {Date} The current date
	 */
	this.date = function(_date) {
		if(_date) this.option('setDate', _date);
		return this.option('getDate');
	};
};