/**
 * @class {Rampage.gui.items.RMenu}
 * @extends {Rampage.gui.RItem}
 * Represents a menu
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param id {String} The id of the menu
 * @param submenu {Boolean} Whether the menu is a submenu
 */
Rampage.gui.items.RMenu = function(id, submenu) {
	this.className = 'Rampage.gui.items.RMenu';
	this.extends(Rampage.gui.RItem);

	this.id(id);
	this.bind('menu');

	/**
	 * Initializes the context
	 * @override
	 */
	this.initContext = function() {
		if(!submenu) this.dom().menu();
	};

	/**
	 * Disables the menu
	 */
	this.disable = function() {
		this.option('disabled', true);
	};

	/**
	 * Enables the menu
	 */
	this.enable = function() {
		this.option('disabled', false);
	};

	/**
	 * Sets and gets the submenu flag
	 * @param _submenu {Boolean} The new value for the flag
	 * @return {Boolean} The current value of the flag
	 */
	this.submenu = function(_submenu) {
		if(_submenu) submenu = _submenu;
		return submenu;
	};

	/**
	 * Collapses the focused submenu
	 */
	this.collapse = function() {
		this.dom().menu('collapse');
	};

	/**
	 * Expands the focused submenu
	 */
	this.expand = function() {
		this.dom().menu('expand');
	};

	/**
	 * Adds a menu item
	 * @param item {Rampage.gui.items.RMenuItem} The item to append
	 */
	this.addMenuItem = function(item) {
		this.add(item);
		item.menu(this);
	};

	/**
	 * Adds a submenu
	 * @param name {String} The name of the submenu
	 * @param _submenu {Rampage.gui.items.RMenu} The submenu to append
	 */
	this.addSubmenu = function(name, _submenu) {
		var submenuID = _submenu.id() + '_submenu';
		var menuItem = new Rampage.gui.items.RMenuItem(submenuID, name);
		_submenu.submenu(true);
		menuItem.add(_submenu);
		this.addMenuItem(menuItem);
	};

	/**
	 * Performs a menu action when clicking on an element
	 * @param item {Rampage.gui.items.RMenuItem} The source item
	 */
	this.menuAction = function(item) {
		var actionEvent = new Rampage.core.events.ActionEvent(event, item, item.actionCommand());

		this.parent.proceedAction(actionEvent);
	};
};