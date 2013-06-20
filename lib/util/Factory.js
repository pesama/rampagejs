
/**
 * 
 * @class {Rampage.util.Factory}
 * A factory is a group of elements of the same kind, as a HashMap
 *
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 *
 * @param T {Rampage.RClass|String} The element (which name will be inherited by methods addT and getT)
 * @param source {Object} (Optional) Initial data source for the factory
 * 
 */
Rampage.util.Factory = function(T, source) {
	this.className = 'Rampage.util.Factory';
	
	/**
	 * @type Object stores all the elements of the factory
	 */
	var factory = null;
	
	/**
	 * Initializes the factory
	 */
	function init() {
		if(!source)
			factory = {};
		else 
			factory = source;
		
		var itemName = null;
		if(typeof T === 'string') {
			itemName = T;
		}
		else {
			itemName = T.className.split('.');
			itemName = itemName[itemName.length -1];
		}
		this['add' + itemName] = this.addElement;
		this['get' + itemName] = this.getElement;
		this['remove' + itemName] = this.removeElement;
	}
	
	/**
	 * 
	 * Adds an element into the factory
	 * @param index {String} The index for the HashMap
	 * @param value {T} The value of the item
	 * @param overwrite {Boolean} (Optional) Indicates wether to overwrite if existing index
	 * @throws Rampage.core.Exception
	 * 
	 */
	this.addElement = function(index, value, overwrite) {
		if(!index || value === undefined) {
			throw new Rampage.core.Exception(this.className, Rampage.message('FACTORY_MISSING_VALUES'), [ 'add', T ]);
		}
		if(factory[index] !== undefined && !overwrite) {
			throw new Rampage.core.Exception(this.className, Rampage.message('FACTORY_OVERWRITING_ELEMENT', [ T, index, value ]));
		}
		factory[index] = value;
	};

	/**
	 * 
	 * Returns an element present in factory. This function is used as getT, where T is {T}
	 * @param index {String} The index to the element
	 * @return {T} The element chosen
	 * @throws Rampage.core.Exception
	 * 
	 */
	this.getElement = function(index) {
		if(!index) {
//			throw new Rampage.core.Exception(this.className, Rampage.message('FACTORY_MISSING_VALUES'), [ 'get', T ]);
		}
		if (!factory) {
//			throw new Rampage.core.Exception(this.className, Rampage
//					.message('FACTORY_NOT_INITIALISED', [ T ]));
		}
		if(factory[index] === undefined) {
//			throw new Rampage.core.Exception(this.className, Rampage.message('FACTORY_ELEMENT_NOT_EXISTING', [ T, index ]));
			return null;
		}
		return factory[index];
	};

	this.removeElement = function(index) {
		if(!index) {
//			throw new Rampage.core.Exception(this.className, Rampage.message('FACTORY_MISSING_VALUES'), [ 'get', T ]);
		}
		if (!factory) {
//			throw new Rampage.core.Exception(this.className, Rampage
//					.message('FACTORY_NOT_INITIALISED', [ T ]));
		}
		if(factory[index] === undefined) {
//			throw new Rampage.core.Exception(this.className, Rampage.message('FACTORY_ELEMENT_NOT_EXISTING', [ T, index ]));
			return;
		}
		delete factory[index];
	};

	/**
	 * Returns the whole set of existing elements
	 */
	this.getFactory = function() {
		return factory;
	};

	
	init.call(this);
};