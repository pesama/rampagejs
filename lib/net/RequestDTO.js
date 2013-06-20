/**
 * @class {Rampage.net.RequestDTO}
 * Represents a DTO Object for Ajax requests 
 * 
 * @param status {String} The status of the request
 * @param data {Object} The data object
 * @param async {Boolean} If true, the call will be asynchronous
 * @param config {Object} Configuration parameters for the call
 */
Rampage.net.RequestDTO = function(status, data, async, config) {
	this.className = 'Rampage.net.RequestDTO';
	
	/**
	 * @type String The request status
	 */
	this.status = status;
	
	/**
	 * @type Boolean Whether to perform asynchronous calls
	 */
	this.async = async;
	
	/**
	 * @type Object Stores configuration parameters
	 */
	this.config = config;
	
	/**
	 * @type Object The data Object
	 */
	this.data = data;
};

/*
 * Available status
 */

Rampage.net.RequestDTO.STATUS_GET = 'get';
Rampage.net.RequestDTO.STATUS_PUT = 'put';
Rampage.net.RequestDTO.STATUS_DELETE = 'delete';