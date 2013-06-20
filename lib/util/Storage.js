
/**
 * @class {Rampage.util.Storage}
 * Store local persistent data to retrieve it in your application afterwards
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 */
Rampage.util.Storage = new (function() {
	this.className = 'Rampage.util.Storage';
	
	/**
	 * Sets or gets an item into | from the local storage
	 * @param name {String} The name of the parameter to store
	 * @param value {Object} The object to store
	 * @return {Object} The object stored
	 */
	this.local = function(name, value) {
		if(!name) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('STORAGE_NO_PARAMETER'));
		}
		if(value) {
			var item = localStorage.getItem(name);
			if(item && !this.config('STORAGE_OVERRIDE_ITEMS')) {
				Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('STORAGE_OVERRIDE_PARAMETER', [ name ]));
			}
			var newValue = JSON.stringify(value);
			localStorage.setItem(name, newValue);
		}
		var item = localStorage.getItem(name);
		if(!item) return null;
		return JSON.parse(item);
	};
	
	/**
	 * Sets or gets an item into | from the session storage
	 * @param name {String} The name of the parameter to store
	 * @param value {Object} The object to store
	 * @return {Object} The object stored
	 */
	this.session = function(name, value) {
		if(!name) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('STORAGE_NO_PARAMETER'));
		}
		if(value) {
			var item = sessionStorage.getItem(name);
			if(item && !this.config('STORAGE_OVERRIDE_ITEMS')) {
				Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('STORAGE_OVERRIDE_PARAMETER', [ name ]));
			}
			var newValue = JSON.stringify(value);
			sessionStorage.setItem(name, newValue);
		}
		var item = sessionStorage.getItem(name);
		if(!item) return null;
		return JSON.parse(item);
	};
});