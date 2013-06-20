/**
 * @namespace Rampage.core.events
 * @module
 * @class ConfigurationEvent
 * @extends Event
 * @desc Event dispatched on configuration changes
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param source {RItem} The source of the event
 * @param parameter {String} The name of the parameter updated
 * @param value {String} The new value for the parameter
 */
Rampage.core.events.ConfigurationEvent = function(source, parameter, value) {
	this.className = 'Rampage.core.events.ConfigurationEvent';
	this.extends(Rampage.core.Event);

	this.source(source);

	/**
	 * @public
	 * @function ConfigurationEvent#parameter 
	 * @desc Returns the parameter name
	 * @return {String} The name of the parameter
	 */
	this.parameter = function() {
		return parameter;
	};

	/**
	 * @public
	 * @function ConfigurationManager#value
	 * @desc Returns the parameter value
	 * @return {String} The value for the parameter
	 */
	this.value = function() {
		return value;
	};
};