/**
 * @namespace Rampage
 * @module
 * @class RClass
 * @summary Minimum class for Rampage inner items. 
 * @desc Defines the main class that every Rampage Applicative Class will extend. 
 * It contains identification information as well as methods 
 *
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA 
 */
Rampage.RClass = function() {
	this.className = 'Rampage.RClass';

	/**
	 * @type String
	 * @descDefines the ID for the element
	 *
	 * @private
	 * @memberof RClass
	 */
	var id = null;

	/**
	 * @type String
	 * @desc Defines the name of the element (normally its className without the packages)
	 *
	 * @private
	 * @memberof RClass
	 */
	var name = null;
	
	/**
	 * @type String 
	 * @desc The title of the item (for the window)
	 *
	 * @private
	 * @memberof RClass
	 */
	var title = null;

	/**
	 * @type Array 
	 * @desc the interfaces the class is implementing
	 *
	 * @private
	 * @memberof RClass
	 */
	var implementations = new Array();

	/**
	 * @function RClass#id
	 * @desc Sets and gets the id
	 * @param [_id] {String} The new id
	 *
	 * @public
	 */
	this.id = function(_id) {
		if(_id) id = _id;
		if(!id) id = Rampage.generateID.call(this);
		return id;
	};

	/**
	 * @function RClass#name
	 * @desc Sets and gets the name
	 * @param [_name] {String} The new name
	 * @returns {String} The current name
	 *
	 * @public
	 */
	this.name = function(_name) {
		if(_name) name = _name;
		return name;
	};
	
	/**
	 * @function RClass#title
	 * @desc Sets and gets the title of the element
	 * @param [_title] {String} The new title
	 * @returns {String} Current title
	 *
	 * @public
	 */
	this.title = function(_title) {
		if(_title) title = _title;
		return title;
	};

	/**
	 * @function RClass#addImplementation
	 * @desc Sets up an implementation for an interface
	 * @param interface {RClass} The interface to implement
	 *
	 * @public
	 */
	this.addImplementation = function(interface) {
		if(this.implementing(interface.className)) {
			Rampage.log(Rampage.LOG_WARNING, this.className, Rampage.message('CLASS_ALREADY_IMPLEMENTS', [ interface.className ]));
			return;
		}
		implementations.push(interface);
	};

	/**
	 * @function RClass#implementations
	 * @desc Returns the array of object implementations
	 * @returns {Array}
	 * 
	 * @public
	 */
	this.implementations = function() {
		return implementations;
	};

	/**
	 * @function RClass#implementing
	 * @desc Verifies if it is implementing some interface
	 * @param interface {RClass} The interface to verify
	 * @returns {Boolean} Whether it is implementing
	 *
	 * @public
	 */
	this.implementing = function(interface) {
		for(var i = 0; i < implementations.length; i++) {
			if(implementations[i].className === interface.className) {
				return true;
			}
		}
		return false;
	};

	/**
	 * @function RClass#hasClassName
	 * @desc Verifies if has some className (even on upper levels on hierarchy)
	 * @param _className {String} The className to verify
	 * @returns {Boolean} Whether has the className
	 *
	 * @public
	 */
	this.hasClassName = function(_className) {
		if(this.className === _className) return true;
		var current = this;
		while(true) {
			current = current.parent;
			if(!current) break;
			if(current.className === _className) return true;
		}
		return false;
	};
};