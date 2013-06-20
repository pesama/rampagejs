/**
 *
 * @class {Rampage.gui.RItem}
 * @extends {Rampage.RClass}
 * Main parent class for all Items. Stores all common methods and attributes.
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 */
Rampage.gui.RItem = function() {
	this.className = 'Rampage.gui.RItem';
	this.extends(Rampage.RClass);
	
	/**
	 * @type String The action command of the button
	 */
	var actionCommand = null;
	
	/**
	 * @type Array listeners
	 */
	var actionListeners = new Array();
	
	/**
	 * @type Rampage.util.Bounds  Defines the bounds for the element
	 */
	var bounds = null;

	/**
	 * @type String Stores the bind if using custom binding
	 */
	var bind = null;

	/**
	 * @type JQueryDOMElement Stores the DOM element for the item
	 */
	var dom = null;

	/**
	 * @type Array The list of classNames for the element
	 */
	var classNames = new Array();

	/**
	 * @type Array Stores item's children
	 */
	var items = new Array();

	/**
	 * @type Object Stores the model for the item
	 */
	var model = {};

	/**
	 * @type String Stores the name of the item
	 */
	var name = null;

	/**
	 * @type Object Stores the options for the item
	 */
	var options = null;

	/**
	 * @type Object Stores the style parameters for the item
	 */
	var style = new Object();

	/**
	 * Initializes DOM's context (jQueryUI parameters, canvas painting...)
	 */
	this.initContext = function() {
		var items = this.items();
		for(var i = 0;i < items.length; i++) {
			items[i].initContext();
		}
		if(!bind && actionListeners.length) {
			var mouseManager = Rampage.Core.mouseManager();
			mouseManager.bind(Rampage.core.managers.MouseManager.MOUSE_EVENT_CLICK, this);
		}
	};
	
	/**
	 * Sets and gets the action command
	 * @param _actionCommand {String} The new actionCommand
	 * @return {String} The action command
	 */
	this.actionCommand = function(_actionCommand) {
		if(_actionCommand) actionCommand = _actionCommand;
		return actionCommand;
	};
	
	/**
	 * Adds an action listener for the events dispatched by the button
	 * @param actionListener {Rampage.gui.events.listeners.ActionListener} The actionLis
	 */
	this.addActionListener = function(actionListener) {
		if(actionListeners.indexOf(actionListener) !== -1) {
			Rampage.log(Rampage.LOG_WARNING, this.className, Rampage.message('EXISTING_ACTION_LISTENER'));
		}
		actionListeners.push(actionListener);
		var mouseManager = Rampage.Core.mouseManager();
		mouseManager.addEventListener(Rampage.core.events.ActionEvent.className, actionListener);
	};

	/**
	 * Sets and gets item DOM's structure
	 * @param _dom {jQueryDOMElement} The new DOM structure
	 * @return {jQueryDOMElement} The current DOM structure
	 */
	this.dom = function(_dom) {
		if(_dom) dom = _dom;
		return dom;
	};

	/**
	 * Sets and gets the background of the item
	 * @param background {String} Background for the item
	 * @param options {Object} Background parameter options
	 * @return {String} The current background
	 */
	this.background = function(background, options) {
		if(background) this.styleParam('background', background, options);
		return style.background;
	};
	
	/**
	 * Sets and gets the foreground
	 * @param foreground {String} The new foreground color
	 * @return {String} The color
	 */
	this.foreground = function(foreground) {
		if(foreground) this.style().color = foreground;
		return this.style().color;
	};

	/**
	 * Sets and gets the bind for the element
	 * @param _bind {String} The new bind for the element
	 * @return {String} Current bind for the element
	 */
	this.bind = function(_bind) {
		if(_bind) bind = _bind;
		return bind;
	};

	/**
	 * Sets and gets the border of the element
	 * @param border {String} Border of the item
	 * @param options {Object} Border options for the item
	 * @return {String} The current border for the element 
	 */
	this.border = function(border, options) {
		if(border) this.styleParam('border', border, options);
		return style.border;
	};

	/**
	 * Sets and gets the bounds of the element
	 * @param bnds {Rampage.util.Bounds} The new bounds for the item
	 * @return {Rampage.util.Bounds}
	 */
	this.bounds = function(_bounds) {
		if(_bounds) bounds = _bounds;
		else if(!bounds) bounds = new Rampage.util.Bounds();
		return bounds;
	};

	/**
	 * Adds an item into children stack
	 * @param item {Rampage.gui.RItem} The item to append
	 */
	this.add = function(item) {
		items.push(item);
	};

	/**
	 * Removes an item from the stack
	 * @param item {Rampage.gui.RItem} The item to remove
	 */
	this.remove = function(item) {
		for(var i = 0; i < items.length; i++) {
			if(items[i] === item) {
				items.splice(i, 1);
				return;
			}
		}
		Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('ITEM_REMOVE_NONEXISTING_CHILDREN', [ item.id() ]));
	};

	/**
	 * Removes all items from the storage
	 */
	this.removeAll = function() {
		items = new Array();
	};

	/**
	 * Returns the children items
	 * @return {Array}
	 */
	this.items = function() {
		return items;
	};

	/**
	 * Sets and gets the model
	 * @param mdl {Object} The new model parameter
	 * @return {Object} The current model parameter
	 */
	this.model = function(_model) {
		if(_model) model = _model;
		return model;
	};

	/**
	 * Returns a parameter from the model
	 * @param param {String} Parameter name
	 * @param value {Object} The value of the model parameter
	 * @return {Any} The model parameter
	 */
	this.modelParam = function(param, value) {
		if(value) {
			if(model[param]) model[param](value);
			else model[param] = ko.observable(value);
		}
		if(model[param]) return model[param]();
		return null;
	};

	/**
	 * Appends a className to the DOM element
	 * @param className {String} the className to append
	 */
	this.addClassName = function(className) {
		if(classNames.indexOf(className) !== -1) {
			Rampage.log(Rampage.LOG_WARNING, this.className, Rampage.message('ITEM_DUPLICATED_CLASSNAME', [ className ]));
		}
		classNames.push(className);
	};

	/**
	 * Removes a className from the DOM element
	 * @param className {String} the className to remove
	 */
	this.removeClassName = function(className) {
		if(classNames.indexOf(className) === -1) {
			Rampage.log(Rampage.LOG_WARNING, this.className, Rampage.message('ITEM_NONEXISTING_CLASSNAME', [ className ]));
		}
		classNames.splice(classNames.indexOf(className), 1);
	};

	/**
	 * Returns the current DOM classNames
	 * @return {Array} The array with the classNames
	 */
	this.classNames = function() {
		return classNames;
	};

	/**
	 * Sets or get the style options
	 * @param stl {Object} The new style object
	 * @return {Object}
	 */
	this.style = function(stl) {
		if(stl) style = stl;
		return style;
	};

	/**
	 * Sets and gets a style parameter
	 * @param param {String} Parameter name
	 * @param value {String} Parameter value
	 * @param options {Object} Other options for the style
	 * @return {String} The value for the parameter
	 */
	this.styleParam = function(param, value, options) {
		if(!param) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('ITEM_STYLE_NULL_PARAM'));
		}
		if(value) style[param] = value;
		for(var option in options) {
			style[param+ '-' + option] = options[option];
		}
		return style[param];
	};

	/**
	 * Sets and gets the name of the item
	 * @param _name {String} The new name for the item
	 * @return {String} The current name for the item
	 */
	this.name = function(_name) {
		if(_name) name = _name;
		return name;
	};

	/**
	 * Sets and gets the options for the item
	 * @param _options {Object} new Options object
	 * @return {Object} The options for the item
	 */
	this.options = function(_options) {
		if(_options) options = _options;
		return options;
	};

	/**
	 * Sets and gets an option parameter into the options stack
	 * @param option {String} Option parameter name
	 * @param value {Object} Option value
	 * @return {Mixed} The option
	 */
	this.option = function(option, value) {
		if(!options) this.options(new Object());
		if(value !== undefined) {
			options[option] = value;
		}
		return options[option];
	};

	/**
	 * Sets and gets the text for the item
	 * @param txt {String} The new text
	 * @return {Object}
	 */
	this.text = function(txt) {
		if(txt) this.modelParam('text', txt);
		return this.modelParam('text');
	};

	/**
	 * Sets and gets the tooltip text for the item
	 * @param tltip {String} The new tooltip for the item
	 * @return {Object} The new Tooltip
	 */
	this.tooltip = function(tltip) {
		if(tltip) this.modelParam('title', tltip);
		return this.modelParam('title');
	};

	/**
	 * Returns the instance of RItem for the object
	 * @return {Rampage.gui.RItem} The instance
	 */ 
	this.parentItem = function() {
		var parent = null;
		var newParent = this.parent;
		while(newParent) {
			parent = newParent;
			if(parent instanceof Rampage.gui.RItem) return parent;
			newParent = parent.parent;
		}
		return null;
	};

	/**
	 * Paint the item within the graphics
	 * @param graphics {Rampage.gui.Graphics}
	 */
	this.paint = function(graphics) {
		graphics.register(this);
	};

	/**
	 * Returns the current style
	 * @return {Object}
	 */
	this.style = function() {
		return style;
	};
	
	/**
	 * Proceeds an action when an event is dispatched
	 * @param event {Rampage.core.events.ActionEvent} 
	 */
	this.proceedAction = function(event) {
		var mouseManager = Rampage.Core.mouseManager();
		mouseManager.dispatchEvent(event, actionListeners);
	};
};

Rampage.gui.RItem.MANAGER_MOUSE = 'mouse';
Rampage.gui.RItem.MANAGER_KEYBOARD = 'keyboard';


/*
 * UI ICONS
 */

Rampage.gui.RItem.UI_ICON_CARAT_1_N = 'ui-icon-carat-1-n';
Rampage.gui.RItem.UI_ICON_CARAT_1_NE = 'ui-icon-carat-1-ne';
Rampage.gui.RItem.UI_ICON_CARAT_1_E = 'ui-icon-carat-1-e';
Rampage.gui.RItem.UI_ICON_CARAT_1_SE = 'ui-icon-carat-1-se';
Rampage.gui.RItem.UI_ICON_CARAT_1_S = 'ui-icon-carat-1-s';
Rampage.gui.RItem.UI_ICON_CARAT_1_SW = 'ui-icon-carat-1-sw';
Rampage.gui.RItem.UI_ICON_CARAT_1_W = 'ui-icon-carat-1-w';
Rampage.gui.RItem.UI_ICON_CARAT_1_NW = 'ui-icon-carat-1-nw';
Rampage.gui.RItem.UI_ICON_CARAT_2_N_S = 'ui-icon-carat-2-n-s';
Rampage.gui.RItem.UI_ICON_CARAT_2_E_W = 'ui-icon-carat-2-e-w';
Rampage.gui.RItem.UI_ICON_TRIANGLE_1_N = 'ui-icon-triangle-1-n';
Rampage.gui.RItem.UI_ICON_TRIANGLE_1_NE = 'ui-icon-triangle-1-ne';
Rampage.gui.RItem.UI_ICON_TRIANGLE_1_E = 'ui-icon-triangle-1-e';
Rampage.gui.RItem.UI_ICON_TRIANGLE_1_SE = 'ui-icon-triangle-1-se';
Rampage.gui.RItem.UI_ICON_TRIANGLE_1_S = 'ui-icon-triangle-1-s';
Rampage.gui.RItem.UI_ICON_TRIANGLE_1_SW = 'ui-icon-triangle-1-sw';
Rampage.gui.RItem.UI_ICON_TRIANGLE_1_W = 'ui-icon-triangle-1-w';
Rampage.gui.RItem.UI_ICON_TRIANGLE_1_NW = 'ui-icon-triangle-1-nw';
Rampage.gui.RItem.UI_ICON_TRIANGLE_2_N_S = 'ui-icon-triangle-2-n-s';
Rampage.gui.RItem.UI_ICON_TRIANGLE_2_E_W = 'ui-icon-triangle-2-e-w';
Rampage.gui.RItem.UI_ICON_ARROW_1_N = 'ui-icon-arrow-1-n';
Rampage.gui.RItem.UI_ICON_ARROW_1_NE = 'ui-icon-arrow-1-ne';
Rampage.gui.RItem.UI_ICON_ARROW_1_E = 'ui-icon-arrow-1-e';
Rampage.gui.RItem.UI_ICON_ARROW_1_SE = 'ui-icon-arrow-1-se';
Rampage.gui.RItem.UI_ICON_ARROW_1_S = 'ui-icon-arrow-1-s';
Rampage.gui.RItem.UI_ICON_ARROW_1_SW = 'ui-icon-arrow-1-sw';
Rampage.gui.RItem.UI_ICON_ARROW_1_W = 'ui-icon-arrow-1-w';
Rampage.gui.RItem.UI_ICON_ARROW_1_NW = 'ui-icon-arrow-1-nw';
Rampage.gui.RItem.UI_ICON_ARROW_2_N_S = 'ui-icon-arrow-2-n-s';
Rampage.gui.RItem.UI_ICON_ARROW_2_NE_SW = 'ui-icon-arrow-2-ne-sw';
Rampage.gui.RItem.UI_ICON_ARROW_2_E_W = 'ui-icon-arrow-2-e-w';
Rampage.gui.RItem.UI_ICON_ARROW_2_SE_NW = 'ui-icon-arrow-2-se-nw';
Rampage.gui.RItem.UI_ICON_ARROWSTOP_1_N = 'ui-icon-arrowstop-1-n';
Rampage.gui.RItem.UI_ICON_ARROWSTOP_1_E = 'ui-icon-arrowstop-1-e';
Rampage.gui.RItem.UI_ICON_ARROWSTOP_1_S = 'ui-icon-arrowstop-1-s';
Rampage.gui.RItem.UI_ICON_ARROWSTOP_1_W = 'ui-icon-arrowstop-1-w';
Rampage.gui.RItem.UI_ICON_ARROWTHICK_1_N = 'ui-icon-arrowthick-1-n';
Rampage.gui.RItem.UI_ICON_ARROWTHICK_1_NE = 'ui-icon-arrowthick-1-ne';
Rampage.gui.RItem.UI_ICON_ARROWTHICK_1_E = 'ui-icon-arrowthick-1-e';
Rampage.gui.RItem.UI_ICON_ARROWTHICK_1_SE = 'ui-icon-arrowthick-1-se';
Rampage.gui.RItem.UI_ICON_ARROWTHICK_1_S = 'ui-icon-arrowthick-1-s';
Rampage.gui.RItem.UI_ICON_ARROWTHICK_1_SW = 'ui-icon-arrowthick-1-sw';
Rampage.gui.RItem.UI_ICON_ARROWTHICK_1_W = 'ui-icon-arrowthick-1-w';
Rampage.gui.RItem.UI_ICON_ARROWTHICK_1_NW = 'ui-icon-arrowthick-1-nw';
Rampage.gui.RItem.UI_ICON_ARROWTHICK_2_N_S = 'ui-icon-arrowthick-2-n-s';
Rampage.gui.RItem.UI_ICON_ARROWTHICK_2_NE_SW = 'ui-icon-arrowthick-2-ne-sw';
Rampage.gui.RItem.UI_ICON_ARROWTHICK_2_E_W = 'ui-icon-arrowthick-2-e-w';
Rampage.gui.RItem.UI_ICON_ARROWTHICK_2_SE_NW = 'ui-icon-arrowthick-2-se-nw';
Rampage.gui.RItem.UI_ICON_ARROWTHICKSTOP_1_N = 'ui-icon-arrowthickstop-1-n';
Rampage.gui.RItem.UI_ICON_ARROWTHICKSTOP_1_E = 'ui-icon-arrowthickstop-1-e';
Rampage.gui.RItem.UI_ICON_ARROWTHICKSTOP_1_S = 'ui-icon-arrowthickstop-1-s';
Rampage.gui.RItem.UI_ICON_ARROWTHICKSTOP_1_W = 'ui-icon-arrowthickstop-1-w';
Rampage.gui.RItem.UI_ICON_ARROWRETURNTHICK_1_W = 'ui-icon-arrowreturnthick-1-w';
Rampage.gui.RItem.UI_ICON_ARROWRETURNTHICK_1_N = 'ui-icon-arrowreturnthick-1-n';
Rampage.gui.RItem.UI_ICON_ARROWRETURNTHICK_1_E = 'ui-icon-arrowreturnthick-1-e';
Rampage.gui.RItem.UI_ICON_ARROWRETURNTHICK_1_S = 'ui-icon-arrowreturnthick-1-s';
Rampage.gui.RItem.UI_ICON_ARROWRETURN_1_W = 'ui-icon-arrowreturn-1-w';
Rampage.gui.RItem.UI_ICON_ARROWRETURN_1_N = 'ui-icon-arrowreturn-1-n';
Rampage.gui.RItem.UI_ICON_ARROWRETURN_1_E = 'ui-icon-arrowreturn-1-e';
Rampage.gui.RItem.UI_ICON_ARROWRETURN_1_S = 'ui-icon-arrowreturn-1-s';
Rampage.gui.RItem.UI_ICON_ARROWREFRESH_1_W = 'ui-icon-arrowrefresh-1-w';
Rampage.gui.RItem.UI_ICON_ARROWREFRESH_1_N = 'ui-icon-arrowrefresh-1-n';
Rampage.gui.RItem.UI_ICON_ARROWREFRESH_1_E = 'ui-icon-arrowrefresh-1-e';
Rampage.gui.RItem.UI_ICON_ARROWREFRESH_1_S = 'ui-icon-arrowrefresh-1-s';
Rampage.gui.RItem.UI_ICON_ARROW_4 = 'ui-icon-arrow-4';
Rampage.gui.RItem.UI_ICON_ARROW_4_DIAG = 'ui-icon-arrow-4-diag';
Rampage.gui.RItem.UI_ICON_EXTLINK = 'ui-icon-extlink';
Rampage.gui.RItem.UI_ICON_NEWWIN = 'ui-icon-newwin';
Rampage.gui.RItem.UI_ICON_REFRESH = 'ui-icon-refresh';
Rampage.gui.RItem.UI_ICON_SHUFFLE = 'ui-icon-shuffle';
Rampage.gui.RItem.UI_ICON_TRANSFER_E_W = 'ui-icon-transfer-e-w';
Rampage.gui.RItem.UI_ICON_TRANSFERTHICK_E_W = 'ui-icon-transferthick-e-w';
Rampage.gui.RItem.UI_ICON_FOLDER_COLLAPSED = 'ui-icon-folder-collapsed';
Rampage.gui.RItem.UI_ICON_FOLDER_OPEN = 'ui-icon-folder-open';
Rampage.gui.RItem.UI_ICON_DOCUMENT = 'ui-icon-document';
Rampage.gui.RItem.UI_ICON_DOCUMENT_B = 'ui-icon-document-b';
Rampage.gui.RItem.UI_ICON_NOTE = 'ui-icon-note';
Rampage.gui.RItem.UI_ICON_MAIL_CLOSED = 'ui-icon-mail-closed';
Rampage.gui.RItem.UI_ICON_MAIL_OPEN = 'ui-icon-mail-open';
Rampage.gui.RItem.UI_ICON_SUITCASE = 'ui-icon-suitcase';
Rampage.gui.RItem.UI_ICON_COMMENT = 'ui-icon-comment';
Rampage.gui.RItem.UI_ICON_PERSON = 'ui-icon-person';
Rampage.gui.RItem.UI_ICON_PRINT = 'ui-icon-print';
Rampage.gui.RItem.UI_ICON_TRASH = 'ui-icon-trash';
Rampage.gui.RItem.UI_ICON_LOCKED = 'ui-icon-locked';
Rampage.gui.RItem.UI_ICON_UNLOCKED = 'ui-icon-unlocked';
Rampage.gui.RItem.UI_ICON_BOOKMARK = 'ui-icon-bookmark';
Rampage.gui.RItem.UI_ICON_TAG = 'ui-icon-tag';
Rampage.gui.RItem.UI_ICON_HOME = 'ui-icon-home';
Rampage.gui.RItem.UI_ICON_FLAG = 'ui-icon-flag';
Rampage.gui.RItem.UI_ICON_CALCULATOR = 'ui-icon-calculator';
Rampage.gui.RItem.UI_ICON_CART = 'ui-icon-cart';
Rampage.gui.RItem.UI_ICON_PENCIL = 'ui-icon-pencil';
Rampage.gui.RItem.UI_ICON_CLOCK = 'ui-icon-clock';
Rampage.gui.RItem.UI_ICON_DISK = 'ui-icon-disk';
Rampage.gui.RItem.UI_ICON_CALENDAR = 'ui-icon-calendar';
Rampage.gui.RItem.UI_ICON_ZOOMIN = 'ui-icon-zoomin';
Rampage.gui.RItem.UI_ICON_ZOOMOUT = 'ui-icon-zoomout';
Rampage.gui.RItem.UI_ICON_SEARCH = 'ui-icon-search';
Rampage.gui.RItem.UI_ICON_WRENCH = 'ui-icon-wrench';
Rampage.gui.RItem.UI_ICON_GEAR = 'ui-icon-gear';
Rampage.gui.RItem.UI_ICON_HEART = 'ui-icon-heart';
Rampage.gui.RItem.UI_ICON_STAR = 'ui-icon-star';
Rampage.gui.RItem.UI_ICON_LINK = 'ui-icon-link';
Rampage.gui.RItem.UI_ICON_CANCEL = 'ui-icon-cancel';
Rampage.gui.RItem.UI_ICON_PLUS = 'ui-icon-plus';
Rampage.gui.RItem.UI_ICON_PLUSTHICK = 'ui-icon-plusthick';
Rampage.gui.RItem.UI_ICON_MINUS = 'ui-icon-minus';
Rampage.gui.RItem.UI_ICON_MINUSTHICK = 'ui-icon-minusthick';
Rampage.gui.RItem.UI_ICON_CLOSE = 'ui-icon-close';
Rampage.gui.RItem.UI_ICON_CLOSETHICK = 'ui-icon-closethick';
Rampage.gui.RItem.UI_ICON_KEY = 'ui-icon-key';
Rampage.gui.RItem.UI_ICON_LIGHTBULB = 'ui-icon-lightbulb';
Rampage.gui.RItem.UI_ICON_SCISSORS = 'ui-icon-scissors';
Rampage.gui.RItem.UI_ICON_CLIPBOARD = 'ui-icon-clipboard';
Rampage.gui.RItem.UI_ICON_COPY = 'ui-icon-copy';
Rampage.gui.RItem.UI_ICON_CONTACT = 'ui-icon-contact';
Rampage.gui.RItem.UI_ICON_IMAGE = 'ui-icon-image';
Rampage.gui.RItem.UI_ICON_VIDEO = 'ui-icon-video';
Rampage.gui.RItem.UI_ICON_SCRIPT = 'ui-icon-script';
Rampage.gui.RItem.UI_ICON_ALERT = 'ui-icon-alert';
Rampage.gui.RItem.UI_ICON_INFO = 'ui-icon-info';
Rampage.gui.RItem.UI_ICON_NOTICE = 'ui-icon-notice';
Rampage.gui.RItem.UI_ICON_HELP = 'ui-icon-help';
Rampage.gui.RItem.UI_ICON_CHECK = 'ui-icon-check';
Rampage.gui.RItem.UI_ICON_BULLET = 'ui-icon-bullet';
Rampage.gui.RItem.UI_ICON_RADIO_OFF = 'ui-icon-radio-off';
Rampage.gui.RItem.UI_ICON_RADIO_ON = 'ui-icon-radio-on';
Rampage.gui.RItem.UI_ICON_PIN_W = 'ui-icon-pin-w';
Rampage.gui.RItem.UI_ICON_PIN_S = 'ui-icon-pin-s';
Rampage.gui.RItem.UI_ICON_PLAY = 'ui-icon-play';
Rampage.gui.RItem.UI_ICON_PAUSE = 'ui-icon-pause';
Rampage.gui.RItem.UI_ICON_SEEK_NEXT = 'ui-icon-seek-next';
Rampage.gui.RItem.UI_ICON_SEEK_PREV = 'ui-icon-seek-prev';
Rampage.gui.RItem.UI_ICON_SEEK_END = 'ui-icon-seek-end';
Rampage.gui.RItem.UI_ICON_SEEK_FIRST = 'ui-icon-seek-first';
Rampage.gui.RItem.UI_ICON_STOP = 'ui-icon-stop';
Rampage.gui.RItem.UI_ICON_EJECT = 'ui-icon-eject';
Rampage.gui.RItem.UI_ICON_VOLUME_OFF = 'ui-icon-volume-off';
Rampage.gui.RItem.UI_ICON_VOLUME_ON = 'ui-icon-volume-on';
Rampage.gui.RItem.UI_ICON_POWER = 'ui-icon-power';
Rampage.gui.RItem.UI_ICON_SIGNAL_DIAG = 'ui-icon-signal-diag';
Rampage.gui.RItem.UI_ICON_SIGNAL = 'ui-icon-signal';
Rampage.gui.RItem.UI_ICON_BATTERY_0 = 'ui-icon-battery-0';
Rampage.gui.RItem.UI_ICON_BATTERY_1 = 'ui-icon-battery-1';
Rampage.gui.RItem.UI_ICON_BATTERY_2 = 'ui-icon-battery-2';
Rampage.gui.RItem.UI_ICON_BATTERY_3 = 'ui-icon-battery-3';
Rampage.gui.RItem.UI_ICON_CIRCLE_PLUS = 'ui-icon-circle-plus';
Rampage.gui.RItem.UI_ICON_CIRCLE_MINUS = 'ui-icon-circle-minus';
Rampage.gui.RItem.UI_ICON_CIRCLE_CLOSE = 'ui-icon-circle-close';
Rampage.gui.RItem.UI_ICON_CIRCLE_TRIANGLE_E = 'ui-icon-circle-triangle-e';
Rampage.gui.RItem.UI_ICON_CIRCLE_TRIANGLE_S = 'ui-icon-circle-triangle-s';
Rampage.gui.RItem.UI_ICON_CIRCLE_TRIANGLE_W = 'ui-icon-circle-triangle-w';
Rampage.gui.RItem.UI_ICON_CIRCLE_TRIANGLE_N = 'ui-icon-circle-triangle-n';
Rampage.gui.RItem.UI_ICON_CIRCLE_ARROW_E = 'ui-icon-circle-arrow-e';
Rampage.gui.RItem.UI_ICON_CIRCLE_ARROW_S = 'ui-icon-circle-arrow-s';
Rampage.gui.RItem.UI_ICON_CIRCLE_ARROW_W = 'ui-icon-circle-arrow-w';
Rampage.gui.RItem.UI_ICON_CIRCLE_ARROW_N = 'ui-icon-circle-arrow-n';
Rampage.gui.RItem.UI_ICON_CIRCLE_ZOOMIN = 'ui-icon-circle-zoomin';
Rampage.gui.RItem.UI_ICON_CIRCLE_ZOOMOUT = 'ui-icon-circle-zoomout';
Rampage.gui.RItem.UI_ICON_CIRCLE_CHECK = 'ui-icon-circle-check';
Rampage.gui.RItem.UI_ICON_CIRCLESMALL_PLUS = 'ui-icon-circlesmall-plus';
Rampage.gui.RItem.UI_ICON_CIRCLESMALL_MINUS = 'ui-icon-circlesmall-minus';
Rampage.gui.RItem.UI_ICON_CIRCLESMALL_CLOSE = 'ui-icon-circlesmall-close';
Rampage.gui.RItem.UI_ICON_SQUARESMALL_PLUS = 'ui-icon-squaresmall-plus';
Rampage.gui.RItem.UI_ICON_SQUARESMALL_MINUS = 'ui-icon-squaresmall-minus';
Rampage.gui.RItem.UI_ICON_SQUARESMALL_CLOSE = 'ui-icon-squaresmall-close';
Rampage.gui.RItem.UI_ICON_GRIP_DOTTED_VERTICAL = 'ui-icon-grip-dotted-vertical';
Rampage.gui.RItem.UI_ICON_GRIP_SOLID_VERTICAL = 'ui-icon-grip-solid-vertical';
Rampage.gui.RItem.UI_ICON_GRIP_SOLID_HORIZONTAL = 'ui-icon-grip-solid-horizontal';
Rampage.gui.RItem.UI_ICON_GRIPSMALL_DIAGONAL_SE = 'ui-icon-gripsmall-diagonal-se';
Rampage.gui.RItem.UI_ICON_GRIP_DIAGONAL_SE = 'ui-icon-grip-diagonal-se';