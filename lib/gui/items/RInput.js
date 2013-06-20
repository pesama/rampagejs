
/**
 * @class {Rampage.gui.items.RInput}
 * @extends {Rampage.gui.RItem}
 * Defines an input element
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 */
Rampage.gui.items.RInput = function() {
	this.extends(Rampage.gui.RItem);

	/**
	 * @type Array List of words for the autocomplete system
	 */
	var autocomplete = null;
	
	/**
	 * @type Boolean Whether the field is needed
	 */
	var required = false;
	
	/**
	 * @type String The regular expression to validate the input
	 */
	var validator = null;
	
	this.initContext = function() {
		if(autocomplete)
			this.dom().autocomplete({source : autocomplete});
	};

	/**
	 * Sets and gets the autocomplete word list
	 * @param auto {Array} The new list of words
	 * @return {Array} The list of words to autocomplete
	 */
	this.autocomplete = function(auto) {
		if(auto) {
			autocomplete = auto;
		}
		return autocomplete;
	};
	
	/**
	 * Sets and gets the required flag
	 * @param _required {Boolean} The new value for the flag
	 * @return {Boolean} The current value of the flag 
	 */
	this.required = function(_required) {
		if(_required !== undefined) required = _required;
		return required;
	};

	/**
	 * Sets and gets the name of the input
	 * @param nm {String} The new name
	 * @return {String} The current name
	 */
	this.name = function(nm) {
		if(nm) this.modelParam('name', nm);
		return this.modelParam('name');
	};

	/**
	 * Sets and gets the validator
	 * @param valid {String} The new regular expression String
	 * @return {String} The current regular expression String
	 */
	this.validator = function(valid) {
		if(valid) validator = new RegExp(valid);
		if(!validator) return null;
		return validator.toString();
	};

	/**
	 * Sets and gets the value of the input
	 * @param val {Any} The new value
	 * @return {Any} The current value of the input
	 */
	this.value = function(val) {
		if(val) this.modelParam('value', val);
		return this.modelParam('value');
	};

	/**
	 * Validates the form
	 * @return {Boolean} Whether the validation finished successfully
	 */
	this.validate = function() {
		var value = this.value();
		if(required && !value) return false;
		if(!validator) return true;
		var validation = value.match(validator);
		if(validation.length === 1 && validation[0] === value) return true;
		return false;
	};
};