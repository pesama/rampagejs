/**
 * 
 * @class {Rampage.net.Ajax}
 * Provides Ajax communications for data-retrieving
 *
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 */
Rampage.net.Ajax = new (function() {
	this.className = 'Rampage.net.Ajax';
	
	/**
	 * Clones the request status and data to avoid Framework malfunctioning 
	 * @param request {Rampage.net.RequestDTO} The request to clone
	 * @return {Object} The request cloned
	 */
	function cloneRequest(request) {
		var reqCopy = null;
		if(request) {
			reqCopy = {
				status 	: request.status,
				data 	: request.data,
			};
		}
		return reqCopy;
	}
	
	/**
	 * Performs an asynchronous ajax request
	 * @param url {String} The url to call
	 * @param request {Rampage.net.RequestDTO} The DTO object for the request
	 * @param config {Object} Configuration parameters and options 
	 */
	function async(url, request, config) {
		$.ajax(
			{ 
				accepts : config.accepts,
				async : false,
				complete : config.complete,
				data : request,
				dataType : config.dataType,
				error : config.error,
				url : url,
			});
	}
	
	/**
	 * 
	 * Makes a syncrhonous AJAX Call
	 * @param url {String} URL Of the service to retrieve data
	 * @param request {Rampage.net.RequestDTO} Request object for the call 
	 * @return {Any} The data received
	 */
	function sync(url, request) {
		var data = $.ajax(
			{ 
				type : 'POST',
				dataType : 'application/json',
				async : false,
				data : request,
				url : url,
			}
		);
		return data;
	}
	
	/**
	 * 
	 * Makes a service call with a RequestDTO object, and retrieves a ResponseDTO data JSON Object
	 * @param url {String} url to call
	 * @param request {Rampage.net.RequestDTO} Parameters for the service call
	 * @return {JSON} The object returned by the service
	 * 
	 */
	this.json = function(url, request) {
		var reqCopy = cloneRequest(request);
		if(request.async) {
			async(url, request.config);
			return false;
		}
		var data = sync(url, reqCopy);
		return eval(data.responseText);
	};
	
	/**
	 * 
	 * Makes a service call with a RequestDTO object, and retrieves HTML Plain data
	 * @param url {String} url to call
	 * @param request {Rampage.net.RequestDTO} Parameters for the service call
	 * @return {String} The HTML code retrieved from the service
	 * 
	 */
	this.html = function(url, request) {
		var reqCopy = cloneRequest(request);
		var data = sync(url, reqCopy);
		return data.responseText;
	};
	
})();