
/**
 * @namespace Rampage.core
 * @module
 * @class Exception
 * @desc Creates an exception for some core execution instructions
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param message {String} The message to show to the user
 * @param vars {Array} The parameters to replace
 * 
 */
Rampage.core.Exception = function(target, message) {
	this.className = 'Rampage.core.Exception';
	
	/**
	 * @type Object
	 * @desc Class that threw the exception
	 *
	 * @public
	 * @instance
	 * @memberOf Exception
	 */
	this.target = target;
	
	/**
	 * @type String
	 * @desc Exception message
	 *
	 * @public
	 * @instance
	 * @memberOf Exception
	 */
	this.message = message;
	
	/**
	 * @public
	 * @function Exception#printStackTrace
	 * @desc Prints the message into the error log
	 */
	this.printStackTrace = function() {
		Rampage.log(Rampage.LOG_ERROR, this.target, this.message);
	};
};