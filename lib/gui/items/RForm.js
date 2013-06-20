/**
 * @class {Rampage.gui.items.RForm}
 * @extends {Rampage.gui.items.RPanel}
 * Represents a native HTML5 form
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 */
Rampage.gui.items.RForm = function() {
	this.className = 'Rampage.gui.items.RForm';
	this.extends(Rampage.gui.items.RPanel);
	
	/**
	 * @type Array stores the input items of the form
	 */
	var formItems = new Array();

	/**
	 * @type String Defines the action of the form (where to submit)
	 */
	var action = null;

	/**
	 * @type String Defines the enctype for the form
	 */
	var enctype = Rampage.gui.items.RForm.ENCTYPE_FORM_URLENCODED;

	/**
	 * @type String Defines the method the form uses to be sent
	 * Available options are GET and POST
	 */
	var method = Rampage.gui.items.RForm.METHOD_POST;
	
	/**
	 * Adds an item into the form
	 * @override
	 * @param item {Rampage.gui.RItem} The appended item
	 */
	this.add = function(item) {
		if(item.hasClassName(Rampage.gui.items.RInput.className)) {
			if(formItems.indexOf(item) === -1) {
				formItems.push(item);
			}
		}
		this.parent.add(item);
	};

	/**
	 * Sets and gets the action for the form
	 * @param _action {String} The new action for the form
	 * @return {String} The current action of the form
	 */
	this.action = function(_action) {
		if(_action) action = _action;
		return action;
	};

	/**
	 * Sets and gets the enctype of the form
	 * @param _enctype {String} The new enctype
	 * @return {String} The current enctype
	 */
	this.enctype = function(_enctype) {
		if(_enctype) enctype = _enctype;
		return enctype;
	};

	/**
	 * Sets and gets the form submit method
	 * @param _method {String} The new method
	 * @return {String} The current method
	 */
	this.method = function(_method) {
		if(_method) method = _method;
		return method;
	};

	/**
	 * Resets the form
	 */
	this.reset = function() {
		for(var i = 0; i < formItems.length; i++) {
			var currentItem = formItems[i];
			currentItem.value('');
		}
	};

	/**
	 * Submits the form
	 */
	this.submit = function() {
		if(this.validate()) {
			var requestData = new Object();
			for(var i = 0; i < formItems.length; i++) {
				var currentItem = formItems[i];
				requestData[currentItem.id()] = currentItem.value();
			}
			var request = new Rampage.net.RequestDTO('put', requestData);
			var response = Rampage.net.Ajax.json(action, request);
			return response;
		}
		else {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('FORM_NOT_VALIDATED', [ this.id() ]));
		}
		return null;
	};

	/**
	 * Validates the items values within the form
	 * @return {Boolean} Whether the form is validated
	 */
	this.validate = function() {
		for(var i = 0; i < formItems.length; i++) {
			var currentItem = formItems[i];
			if(!currentItem.validate()) return false;
		}
		return true;
	};
};

/*
 * Available methods
 */

Rampage.gui.items.RForm.METHOD_GET 	= 'get';
Rampage.gui.items.RForm.METHOD_POST = 'post';

/*
 * Available enctypes
 */

Rampage.gui.items.RForm.ENCTYPE_FORM_URLENCODED = 'application/x-www-form-urlencoded';
Rampage.gui.items.RForm.ENCTYPE_MULTIPART 	= 'multipart/form-data';
Rampage.gui.items.RForm.ENCTYPE_TEXT_PLAIN = 'text/plain';