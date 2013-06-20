
/**
 * @namespace Rampage.core.managers
 * @module 
 * @class ConfigurationManager
 * @extends Manager
 * @desc Controls the configuration parameters for the application pluggable options
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 */
Rampage.core.managers.ConfigurationManager = function() {
	this.className = 'Rampage.core.managers.ConfigurationManager';
	this.extends(Rampage.core.Manager);

	/**
	 * @type Object
	 * @desc Custom configuration parameters
	 *
	 * @private
	 * @inner
	 * @memberOf ConfigurationManager
	 */
	var custom = {};
	
	/**
	 * @type Object
	 * @desc Default configuration parameters
	 *
	 * @private
	 * @inner
	 * @memberOf ConfigurationManager
	 */
	var defaults = {
		APPLICATION_ALLOW_NULL_PARAMS : true,
		APPLICATION_STRICT_PARAMS : false,
		ITEM_SILENT_EXCEPTIONS : false,
		MANAGER_SILENT_EXCEPTIONS : false,
		AJAX_SERVICE_URL : null,
//		RAMPAGEWS_DEFAULT_HOST : null,
		ALLOW_UNKNOWN_LISTENERS : false,
		STORAGE_OVERRIDE_ITEMS : true,
		NAVIGATION_CHANGE_EFFECT : new Rampage.gui.effects.FadeEffect(),
	};
	
	/**
	 * @public
	 * @function ConfigurationManager#config
	 * @desc Sets or gets a configuration parameter
	 * @param param {String} The name of the parameter
	 * @param [value] {Any} The value for the parameter
	 */
	this.config = function(param, value) {
		if(value) {
			if(defaults[value] === undefined) {
				Rampage.log(Rampage.LOG_DEBUG, this.className, Rampage.message('CONFIG_UNKNOWN_PARAMETER', [ param ]));
			}
			custom[param] = value;
			var source = null;
			var event = new Rampage.core.events.ConfigurationEvent(source, param, value);
			this.dispatchEvent(event);
		}
		var parameter = custom[param];
		if(parameter === undefined) parameter = defaults[param];
		if(parameter === undefined) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('CONFIG_GET_UNEXISTING_PARAMETER', [ param ]));
		}
		return parameter;
	};
};