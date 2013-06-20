/**
 * @namespace 
 * @module
 * @class Rampage
 * @summary RAMPAGE FRAMEWORK MAIN FILE Controls all the lifecycle of the application,
 * all the requests, and all the other stuff.
 * @desc All methods for lifecycle management, dependency importing and 
 * framework utilities lay on this Object. Thus, this class contains <b>read only</b>
 * methods giving you full control of the engine.
 * 
 * @version 2.0.1-ALPHA
 * @author Pelayo Sanchez Margareto
 *
 */
var Rampage = new (function() {
	this.className = 'RampageApplication';

	this.CORE_PREFFIX = 'Rampage.';
	
	/**
	 * @desc Unique string that defines the execution
	 * @type String
	 * @readonly
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.executionUid = null;
	

	/**
	 * @desc Defines the global path of the Framework
	 * @type String
	 * @readonly
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.globalPath = null;

	/*
	 * Asset specifications
	 */

	this.ASSET_PATH = 'assets/';
	this.ASSET_STYLESHEET = 'css';
	this.ASSET_JPEG_IMAGE = 'jpeg';
	this.ASSET_JPG_IMAGE = 'jpg';
	this.ASSET_PNG_IMAGE = 'png';
	this.ASSET_GIF_IMAGE = 'gif';

	/*
	 * Dependency parameters
	 */

	this.DEPENDENCY_APP = 'Application';
	this.DEPENDENCY_CORE = 'Rampage';
	this.DEPENDENCY_CORE_EXTENSION = '.js';
	this.DEPENDENCY_CORE_PATH = 'lib/';
	this.DEPENDENCY_SEPARATOR = '::';

	/**
	 * @desc Default value for dom's children
	 * @type String
	 * @readonly
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.DOM_CHILDREN_ATTRIBUTE = 'children';

	/**
	 * @desc Default id for loading icon
	 * @type String
	 * @readonly
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.LOADING_ICON_ID = 'Rampage_loading_icon';

	/*
	 * LOG Types
	 */
	
	this.LOG_DEBUG = 'DEBUG';
	this.LOG_INFO = 'INFO';
	this.LOG_WARNING = 'WARNING';
	this.LOG_ERROR = 'ERROR';

	/**
	 * @desc Chain to replace for variables in messages
	 * @type String
	 * @readonly
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.REPLACE_EXPRESSION = '##';
	
	/*
	 * Script status
	 */
	
	/**
	 * @desc Indicates that the Script has not started loading yet, and it's laying in the queue
	 * @const
	 * @type String
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.SCRIPT_STATUS_IDLE = 'Status_Idle';
	
	/**
	 * @desc Indicates that the Script has started loading, and its contents are being queried
	 * @const
	 * @type String
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.SCRIPT_STATUS_LOAD = 'Status_Load';
	
	/**
	 * @desc Indicates that the Script has already been loaded, and it is ready for being handled
	 * @const
	 * @type String
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.SCRIPT_STATUS_READY = 'Status_Ready';
	
	/**
	 * @desc Indicates that the Script has been processed, and the Object(s) imported are fully extended with Rampage's abilities
	 * @const
	 * @type String
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.SCRIPT_STATUS_LINKED = 'Status_Linked';
	
	/**
	 * @desc Indicates that the Script is not longer needed, and therefore it has been unloaded 
	 * @const
	 * @type String
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.SCRIPT_STATUS_UNLOAD = 'Status_Unload';

	/*
	 * Core Status
	 */
	
	/**
	 * @desc Indicates that the Core has just started, and it is loading its required dependencies
	 * @const
	 * @type String
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.STATUS_INIT = 'INIT';
	
	/**
	 * @desc Indicates that the Core is loading the required dependencies
	 * @const
	 * @type String
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.STATUS_LOAD = 'LOAD';
	
	/**
	 * @desc Indicates that the Core is ready and running, and the application is being executed
	 * @const
	 * @type String
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.STATUS_RUN = 'RUN';
	
	/**
	 * @desc Your application is stored here. You can access to Rampage.application, as well as with your namespace.
	 * @type Object
	 * @readonly
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.application = null;
	
	/**
	 * @desc Indicates whether the core is ready to start the processes (meaning the DOM is ready and the application loaded)
	 * @type Boolean
	 *
	 * @private
	 * @memberof Rampage
	 * @inner
	 */
	var coreReady = false;

	/**
	 * @desc All dependencies loaded within Rampage's Core are stored here. Its structure is classified by the 
	 * dependency identifier (i.e. the link with it was loaded - e.g. 'Rampage::Core')
	 *            
	 * @member {Object} dependencies
	 * @property {Object} dependency		- Each entry in dependencies Object is a dependency. Its real name is its identifier (see description) 
	 * @property {Object} dependency.status	- Indicates the status of the script
	 * 
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.dependencies = {};

	/**
	 * @desc Defines the timeout to start loading dependencies
	 * @type Timeout
	 * 
	 * @public
	 * @memberof Rampage
	 * @ignore
	 * @instance
	 */
	this.holdLoad = null;

	/**
	 * @desc Stores the set of messages for logging information as well as for other purposes. 
	 * When using Rampage.REPLACE_EXPRESSION property, you can replace pieces of the message for your variables, in case
	 * you need dynamic messages
	 * @type Object
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.messages = {
		'SET_CORE_STATUS' : 'Setting core status to ##',
		'IMPORT_DEPENDENCY_IDLE' : 'Appending dependency ##',
		'IMPORT_DEPENDENCY_LOAD' : 'Loading dependency ##',
		'IMPORT_DEPENDENCY_READY' : '## dependency ## is loaded',
		'GET_MESSAGE_REPLACEMENT_WARNING_LESS' : 'GetMessage function received less text replaces than the text was intended to',
		'GET_MESSAGE_REPLACEMENT_WARNING_MORE' : 'GetMessage function received more text replaces than the text was intended to',
		'DEPENDENCY_ALREADY_LOADED' : 'Dependency ## is already loaded.',
		'OVERRIDE_CORE_STATUS' : 'Core tried to override status ##',
		'WRONG_EVENT_LISTENER' : 'Trying to dispatch a ## event, but i\'m listening to ##',
		'GET_NON_EXISTING_OBJECT' : 'The object ## does not exists (Trying to get ##)',
		'DISPLAY_MANAGER_INIT' : 'DisplayManager module is initializing',
		'DISPLAY_MANAGER_RUN' : 'DisplayManager module is running',
		'GET_NON_EXISTING_OBJECT' : 'The object ## does not exists (Trying to get ##)',
		'TIMELINE_RUN' : 'Timeline module is running',
		'WINDOW_ONLOAD_EVENT' : 'Window is loaded',
		'WINDOW_ONUNLOAD_EVENT' : 'Window is unloading',
		'DISPATCH_EVENT_BEFORE_RUN' : 'Trying to dispatch a ## event on status ##',
		'TIMELINE_TRIGGER_EXPRESSION_FAIL' : 'The expression ## cannot be evaluated by Javascript. (##)',
		'CONFIG_ATTRIBUTE_APPLIED' : 'Configuration\'s attribute \'##\' has been applied with value \'##\'',
		'CONFIG_READ_ERROR' : 'The configuration file parsing has found an error\n\tError: ##',
		'FACTORY_ELEMENT_OVERWRITE' : 'Trying to overwrite an element in a factory (Element name: ##) \nUse option overwrite=true if that\'s what you want',
		'CORE_MANAGER_INIT' : 'CoreManager is running',
		'FACTORY_ELEMENT_NOT_EXISTING' : 'Requested ## \'##\' does not exist into the selected factory',
		'FACTORY_OVERWRITING_ELEMENT' : 'Trying to overwrite ## with index ## and value ## into the selected factory',
		'FACTORY_MISSING_VALUES' : 'Method #### has missing or not correct values. Check it out',
		'VIEW_PAINT_NO_GRAPHICS' : 'Trying to paint without any graphics given',
		'FORM_VIEW_APPEND_EXISTING_ITEM' : 'Trying to append an existing item into the formview',
		'FORM_VIEW_REMOVE_NON_EXISTING_ITEM' : 'Trying to remove a non existing item from a form',
		'EXTENDS_WRONG_TYPES' : '## is trying to inherit ##, but they don\'t have the right types',
		'APPLICATION_WRONG_PARAM' : 'Trying to append parameter ## to an application (which has not that attribute)',
		'APPLICATION_NULL_PARAM' : 'Missing parameter ## on the application',
		'DISPATCH_NONEXISTING_EVENT' : 'The event ## has no listeners available',
		'IMPLEMENTATION_ERROR' : 'The element ## does not correctly implement ##',
		'NOT_APPROPRIATE_LISTENER' : 'The element ## does not listen to ## events',
		'HIERARCHY_WEIRD_TYPES' : 'An object of type ## can not inherit another of type ##',
		'BAD_IMPLEMENTATION' : 'An interface MUST inherit Rampage.RClass object',
		'RAMPAGE_FILE_UNAVAILABLE' : 'The file with name ##js is unavailable. Have you change the file name?',
		'CALLING_ACTION_PERFORMED' : 'An action event is being dispatched',
		'CALLING_CONFIGURATION_CHANGE' : 'A configuration event is being dispatched',
		'CALLING_DISPLAY_ACTION' : 'A display event is being dispatched',
		'CALLING_KEYBOARD_ACTION' : 'A keyboard event is being dispatched',
		'CALLING_VALUE_CHANGED' : 'A List selection event is being dispatched',
		'CALLING_ACTION_CHANGED' : 'A navigation event is being dispatched',
		'CALLING_TAB_CHANGED' : 'A Tab Selection Event is being dispatched',
		'WRONG_LISTENER' : 'The listener ## does not understand events of type ##',
		'LISTENER_NO_HANDLER' : 'The listener ## does not have a specific listening method to ## events',
		'CONFIG_UNKNOWN_PARAMETER' : 'Configuration parameter ## is unknown for Rampage\'s defaults',
		'CONFIG_GET_UNEXISTING_PARAMETER' : 'Configuration parameter ## does not exist',
		'KEYBOARD_UNEXISTING_KEY' : 'The character ## can\'t be used within the KeyboardManager',
		'KEYBOARD_DUPLICATED_SHORTCUT' : 'There is a duplicity in a shortcut. It might trigger unwanted actions',
		'NAVIGATION_OUT_OF_BOUNDS' : 'A navigation action has exit from execution bounds. The application might have crashed',
		'NAVIGATION_NO_ACTION' : 'Navigation state with id ## does not correlate to any action',
		'APPLICATION_RUNNING' : 'The application has started running',
		'EFFECT_REQUIRED_PARAMETER' : 'The parameter ## is required, and has not been given',
		'FORM_NOT_VALIDATED' : 'The form with ID ## has unvalid parameters',
		'LIST_NO_HEADER' : 'List with ID ## does not have a header',
		'LIST_ACTION_NO_ITEM' : 'List item with ID ## does not exist',
		'MENUITEM_NULL_PARAMETER' : 'MenuItem must have a valid ##, instead of ##',
		'MENUITEM_NO_MENU' : 'MenuItem with ID ## is not attached to any menu',
		'SLIDER_VALUES_NOT_RANGE' : 'Option values for a Slider is only available in range mode',
		'LAYOUT_WRONG_MARGIN' : 'A wrong margin has been applied to a layout',
		'LAYOUT_NULL_PARAM' : 'The parameter ## is required for this layout',
		'EFFECT_NO_METHOD' : 'An effect has to have a method of execution (either effect, show, hide or toggle)',
		'EFFECT_NO_TYPE' : 'An effect must have a type',
		'EFFECT_NO_OPTION' : 'The effect has no option ##',
		'EFFECT_NO_ITEM' : 'The effect must be applied over an item',
		'GRAPHICS_UNEXISTING_DOM' : 'Graphical Item ## does not have an associated DOM element',
		'ITEM_REMOVE_NONEXISTING_CHILDREN' : 'The item does not have ## as child',
		'ITEM_DUPLICATED_CLASSNAME' : 'The item already has the className ##',
		'ITEM_NONEXISTING_CLASSNAME' : 'The item does not have the className ##',
		'ITEM_STYLE_NULL_PARAM' : 'Cannot apply a null style param to an item',
		'SHORTCUT_NO_KEYS' : 'A Shortcut must have at least one key pressed',
		'SHORTCUT_MULTI_KEYS' : 'A Shortcut does not accept a sequence such as ## in multi-key mode',
		'SHORTCUT_WRONG_EVENT' : 'A Shortcut validates KeyEvents, not ##',
		'STORAGE_NO_PARAMETER' : 'A Name must be provided to access Storage parameters',
		'STORAGE_OVERRIDE_PARAMETER' : 'The parameter ## is being overriden in the Storage, but the configuration does not allow it',
		'CLASS_ALREADY_IMPLEMENTS' : 'The class already implements interface ##',
		'AJAX_PANE_NO_CONTENT' : 'RAjaxPane has retrieved no content from url ##',
		'MENU_ACTION_NO_ITEM' : 'A Menu Action has been dispatched, but no item is related to it',
		'OVERRIDE_EXISTING_VIEW' : 'The content of view ## is being overriden',
		'LISTENER_ALREADY_LISTENING' : 'The listener ## is already listening to ##',
		'EXISTING_ACTION_LISTENER' : 'The item is already being listener by that listener',
	};

	/**
	 * @desc The next integer for UID Assignment
	 * @type Number 
	 *
	 * @private
	 * @memberof Rampage
	 * @inner
	 */
	var next_uid = 1;

	/**
	 * @desc The loading icon
	 * @type JQueryDOMElement
	 *
	 * @private
	 * @memberof Rampage
	 * @inner
	 */
	var loading = null;
	
	/**
	 * @desc Holds the current core status
	 * @type String
	 *
	 * @private
	 * @memberof Rampage
	 * @inner
	 */
	var status = this.STATUS_SHUTDOWN;
	
	/*
	 * Lifecycle management
	 */

	/**
	 * @function start
	 * @summary Lifecycle management method. Starts the loading process
	 * @desc Once the DOM is ready and your application imported, this method will be executed, to load 
	 * all required dependencies for both the core and your application  
	 * @returns { void }
	 * 
	 * @private
	 * @memberof Rampage
	 * @inner
	 */
	function start() {
		Rampage.import('Rampage::RClass');
		Rampage.import('Rampage::Core');
		Rampage.import('Rampage::core.Application');
		Rampage.import('Rampage::core.Activity');
		Rampage.import('Rampage::core.Event');
		Rampage.import('Rampage::core.events.ActionEvent');
		Rampage.import('Rampage::core.events.ConfigurationEvent');
		Rampage.import('Rampage::core.events.DisplayEvent');
		Rampage.import('Rampage::core.events.KeyEvent');
		Rampage.import('Rampage::core.events.ListSelectionEvent');
		Rampage.import('Rampage::core.events.NavigationEvent');
		Rampage.import('Rampage::core.events.TabSelectionEvent');
		Rampage.import('Rampage::core.events.TimeEvent');
		Rampage.import('Rampage::core.events.Listener');
		Rampage.import('Rampage::core.events.listeners.ActionListener');
		Rampage.import('Rampage::core.events.listeners.KeyListener');
		Rampage.import('Rampage::core.events.listeners.ListSelectionListener');
		Rampage.import('Rampage::core.events.listeners.TabSelectionListener');
		Rampage.import('Rampage::core.events.listeners.DisplayListener');
		Rampage.import('Rampage::core.Manager');
		Rampage.import('Rampage::core.managers.RuleBasedManager');
		Rampage.import('Rampage::core.managers.ConfigurationManager');
		Rampage.import('Rampage::core.managers.DisplayManager');
		Rampage.import('Rampage::core.managers.KeyboardManager');
		Rampage.import('Rampage::core.managers.MouseManager');
		Rampage.import('Rampage::core.managers.NavigationManager');
		Rampage.import('Rampage::core.managers.TimeManager');
		Rampage.import('Rampage::util.Bounds');
		Rampage.import('Rampage::util.Factory');
		Rampage.import('Rampage::util.Shortcut');
		Rampage.import('Rampage::util.Storage');
		Rampage.import('Rampage::core.Exception');
		Rampage.import('Rampage::gui.ViewProvider');
		Rampage.import('Rampage::gui.View');
		Rampage.import('Rampage::gui.RItem');
		Rampage.import('Rampage::gui.Layout');
		Rampage.import('Rampage::gui.Graphics');
		Rampage.import('Rampage::gui.Effect');
		Rampage.import('Rampage::gui.items.RLink');
		Rampage.import('Rampage::gui.items.RLabel');
		Rampage.import('Rampage::gui.effects.FadeEffect');
		Rampage.import('Rampage::net.Ajax');
		Rampage.import('Rampage::net.RequestDTO');
		
		Rampage.application.init();
		delete Rampage.application.init;

		Rampage.asset(Rampage.DEPENDENCY_CORE, 'css', 'css.main');
		Rampage.asset(Rampage.DEPENDENCY_CORE, 'css', 'css.fonts');

		loading = Rampage.DOM({
			'div::#Rampage_loading_icon' : {}
		});

		setStatus(Rampage.STATUS_LOAD);
	}

	/**
	 * @function load
	 * @summary Lifecycle management method. Loads the dependencies
	 * @desc This method will include in the runtime environment all the dependencies included 
	 * on the {@linkcode Rampage~start} method
	 * @returns { void }
	 *
	 * @private
	 * @memberof Rampage
	 * @inner
	 */
	function load() {
		var ready;
		do {
			ready = true;
			for ( var dependency in Rampage.dependencies) {
				var dependency_info = dependency
						.split(Rampage.DEPENDENCY_SEPARATOR);
				switch (Rampage.dependencies[dependency].status) {
				case Rampage.SCRIPT_STATUS_IDLE:
					Rampage.log(Rampage.LOG_DEBUG, Rampage.className, Rampage
							.message('IMPORT_DEPENDENCY_LOAD',
									[ dependency ]));
					Rampage.dependencies[dependency].status = Rampage.SCRIPT_STATUS_LOAD;
					includeScript(dependency_info[0], dependency_info[1]);
				case Rampage.SCRIPT_STATUS_LOAD:
					ready = false;
					break;
				case Rampage.SCRIPT_STATUS_READY:
				case Rampage.SCRIPT_STATUS_LINKED:
					// Do nothing
					break;
				}
			}
		} while (!ready);
	}

	/**
	 * @function preRun
	 * @summary Lifecycle management method. Extends the dependencies
	 * @desc After the {@linkcode Rampage~load} Process all dependencies are extended with some extra attributes and methods
	 * @returns { void }
	 *
	 * @private
	 * @memberof Rampage
	 * @inner
	 */
	function preRun() {
		var ready = true;
		for ( var dependency in Rampage.dependencies) {
			var info = dependency.split(Rampage.DEPENDENCY_SEPARATOR);
			if (Rampage.dependencies[dependency].status !== Rampage.SCRIPT_STATUS_LINKED) {
				var packages = info[1].split('.');
				var element = packages.pop();
				var object = Rampage.getObject(info[0], packages);
				
				if(packages.length > 0) {
					object = object[element];
				}
				
				if (object) {
					Rampage.dependencies[dependency].status = Rampage.SCRIPT_STATUS_LINKED;
					
					/*
					 * Apply hierarchy
					 */
					if(typeof object === 'function') {
						object.prototype.extends = Rampage.extends;
						object.prototype.implements = doImplement;
						object.prototype.config = Rampage.config;
						
						// This can be dangerous
						// TODO It actually is. Delete
						try {
							var objectInstance = new object();
							object.className = objectInstance.className;
							delete objectInstance;
						} catch(e) {
							// Do nothing
						}
					}
					
					Rampage.dependencies[dependency].handler = object;

				} else ready = false;
			}
		}
		if (ready) {			
			clearInterval(Rampage.initInterval);
			delete Rampage.initInterval;
			
			/*
			 * Now we're loaded. Start running
			 */
			
			loading.fadeOut('slow', function() {
				setStatus(Rampage.STATUS_RUN);
			});
		}
	}

	/**
	 * @function run
	 * @summary Lifecycle management method. Runs the system
	 * 
	 * @desc When everything is ready, the system starts and your application loads. Every content rendering and
	 * interaction is done here.
	 * @returns { void }
	 *
	 * @private
	 * @memberof Rampage
	 * @inner
	 */
	function run() {
		Rampage.Core.start();
	}
	
	/**
	 * @function doImplement
	 * @desc Makes the implementation official
	 * @returns { void }
	 *
	 * @private
	 * @memberof Rampage
	 * @inner
	 */
	function doImplement(iface) {
		var item = this;
		var ifaceInstance = new iface();
		item.addImplementation(ifaceInstance);
		setTimeout(function() {
			Rampage.implements.call(item, ifaceInstance);
		}, 15);
	}

	/**
	 * @function includeScript
	 * @summary Core method. Loads Scripts (i.e. dependencies)
	 * @desc Loads a dependency into the system. A dependency can either from Rampage's lib as well as 
	 * your application's.
	 * 
	 * @param type {String} The type of Script to append (Rampage, App)
	 * 
	 * @param script {String} The className of the script
	 * @returns { void }
	 *
	 * @private
	 * @memberof Rampage
	 * @inner
	 */
	function includeScript(type, script) {
		var packages = script.split('.');

		var path = null;

		switch (type) {
		case Rampage.DEPENDENCY_CORE:
			path = Rampage.globalPath + Rampage.DEPENDENCY_CORE_PATH;
			break;
		case Rampage.DEPENDENCY_APP:
			path = Rampage.application.path;
			break;
		}

		path += packages.join('/') + Rampage.DEPENDENCY_CORE_EXTENSION;

		packages.pop();
		Rampage.getObject(type, packages, true);

		function loadHandler(e) {
			dependencyLoadEventHandler(type, script, e);
		}

		var scriptObj = {
			'script' : {
				'src' : path,
				// 'onload' : loadHandler,
				'onreadystatechange' : loadHandler,
			}
		};
		// XXX Uncomment below line and coment belower (lol) to make ajax petitions instead of html
		// 		when activating such option, the scripts will no longer be visible by the console
//		$('head').append(Rampage.DOM(scriptObj));
			document.getElementsByTagName('head')[0].appendChild(Rampage
					.DOM(scriptObj, true));
	}

	/**
	 * @function Rampage~setStatus
	 * @summary Core Method. Changes the status of the Core
	 * @desc This method is used for status changing. Apart from changing core's status, it shows and hides the 
	 * loading icon
	 * 
	 * @param newStatus {String} The new status for the application
	 * @returns { void }
	 *
	 * @private
	 */
	function setStatus(newStatus) {
		if (status === newStatus) {
			Rampage.log(Rampage.LOG_DEBUG, Rampage.className, Rampage
					.message('OVERRIDE_CORE_STATUS', [ status ]));
			return;
		}
		status = newStatus;
		Rampage.log(Rampage.LOG_DEBUG, Rampage.className, Rampage.message(
				'SET_CORE_STATUS', [ status ]));
		switch (newStatus) {
		case Rampage.STATUS_INIT:
			start();
			break;
		case Rampage.STATUS_LOAD:
			$('body').append(loading);
			load();
			Rampage.initInterval = setInterval(preRun, 50);
			break;
		case Rampage.STATUS_RUN:
			loading.remove();
			run();
			break;
		}
	}
	
	/**
	 * @function Rampage#config
	 * @summary Configuration utility
	 * @desc Links the {@linkcode ConfigurationManager} to the items themselves
	 * @this Function
	 * @param param {String} The name of the configuration parameter
	 * @param [value] {Mixed} (Optional) The value for the parameter
	 * @returns {Mixed} The configuration parameter
	 */
	this.config = function(param, value) {
		var configurationManager = Rampage.Core.configurationManager();
		return configurationManager.config(param, value);
	};

	/**
	 * @function status
	 * @desc Get the current core status
	 * @returns {String} The current core status
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.status = function() {
		return status;
	};

	/*
	 * Hierarchy and iface management
	 */
	
	/**
	 * @function extends
	 * @summary Core Method. Makes an inheritance between two dependencies
	 * @desc This method extends one given object with an instance of a given function. It does not actually create
	 * a real inheritance, but by using duck typing it gives you full access to parent methods from the class itself
	 * (if they do exist on child's class, you should access to the parent method with this.parent)
	 * @this Function
	 * @param interface {Function} The interface to inherit (the parent)
	 * @returns { void }
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.extends = function(interface) {
		if(!(typeof this === 'object' && typeof interface === 'function')) {
			Rampage.log(Rampage.LOG_WARNING, this.className, Rampage.message('EXTENDS_WRONG_TYPES', [ this.className, interface.className ]));
			if(!Rampage.config('HIERARCHY_WEIRD_TYPES')) {
				Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('HIERARCHY_WEIRD_TYPES', [typeof this, typeof interface]));
			}
		}

		var inherit = new interface();
		var that = this;
		
		function applyHierarchies(iface, parentMethod) {
//			that[iface] = function() {
//				return parentMethod.apply(that, arguments);
//			};
			that[iface] = parentMethod;
		}

		this.parent = inherit;
		for(var iface in inherit) {
			var childMethod = this[iface];
			var parentMethod = inherit[iface];
			if(!childMethod) {
				if(typeof(parentMethod === 'function')) {
					applyHierarchies(iface, parentMethod);
				}
				else that[iface] = parentMethod;
			}
			else {
				// Override child methods here
			}
		}
	};

	/**
	 * @function implements
	 * @summary Sets up an interface implementation
	 * @desc Creates an implementation between an object given and some interface. The methods declared within the
	 * interface must be implemented in the implementee, because it will be verified and they will be called. 
	 * @throws If the class does not implement the required methods, an exception is thrown.
	 * @this RClass
	 * @param iface {Function} Interface to implement
	 * @returns { void }
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.implements = function(interface) {
		if(!this.hasClassName || !this.hasClassName('Rampage.RClass')) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('BAD_IMPLEMENTATION'));
		}
		
		function applyImplementation(childMethod, parentMethod, child, methodName) {
			interface[methodName] = function() {
				parentMethod.apply(interface, arguments);
				childMethod.apply(parent, arguments);
			};
		}

		for(var method in interface) {
			if(typeof interface[method] !== 'function' || interface.parent && (interface[method] === interface.parent[method])) continue;
			if((!this.hasOwnProperty(method) && !interface.parent.hasOwnProperty(method))) {
				Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('IMPLEMENTATION_ERROR', [ this.className, interface.className ]));
			}

//			var that = this;
//			var originalMethod 	= interface[method];
//			var ownMethod 		= this[method];
//			
//			applyImplementation(ownMethod, originalMethod, that, method);
		}
		
//		this.addImplementation(interface);
	};

	/**
	 * @function asset
	 * @desc Loads and returns an asset. An asset can be loaded from the core and from your application.
	 * Multimedia content and Stylesheets are mainly the assets. Although you can load whatever you can
	 * 
	 * @param source {String} Indicates whether its a core asset or an applicative one
	 * @param type
	 *            The type (extension) of the asset
	 * @param asset
	 *            the className of the asset
	 * @returns {Any}
	 * 
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.asset = function(source, type, asset) {
		var path = null;
		switch(source) {
		case this.DEPENDENCY_CORE:
			path = this.globalPath + this.ASSET_PATH;
			break;
		case this.DEPENDENCY_APP:
			path = this.application.path;
		}
		path += asset.split('.').join('/') + '.' + type;
		switch (type) {
		case this.ASSET_STYLESHEET:
			var style = {
				'link' : {
					'rel' : 'stylesheet',
					'type' : 'text/css',
					'href' : path
				}
			};

			var DOMStyle = this.DOM(style, true);
			$('head').append(DOMStyle);
			return true;
			break;
		default:
			var img = {
				'img' : {
					'src' : path
				}
			};
			var DOMImg = this.DOM(img, true);
			return DOMImg;
		}
	};

	/**
	 * @function import
	 * @summary Core Method. Imports the dependencies.
	 * 
	 * @desc Loads a dependency into the core system. The dependencies are not loaded immediately, but queued. Once
	 * the status of the core is changed to {@linkcode Rampage#STATUS_LOAD} (which this method do) they are fully loaded
	 * and extended.
	 * 
	 * @param dependency {String} The name of the dependency
	 * @returns { void }
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.import = function(dependency) {
		if (Rampage.dependencies[dependency]) {
			Rampage.log(Rampage.LOG_DEBUG, Rampage.className, Rampage.message(
					'DEPENDENCY_ALREADY_LOADED', [ dependency ]));
			if(status !== Rampage.STATUS_INIT)
				Rampage.holdLoad(true);
		}
		else {
			Rampage.dependencies[dependency] = {
				'status' : Rampage.SCRIPT_STATUS_IDLE,
				handler : null
			};
			Rampage.log(Rampage.LOG_DEBUG, Rampage.className, Rampage.message(
					'IMPORT_DEPENDENCY_IDLE', [ dependency ]));
			if (status !== Rampage.STATUS_INIT) {
				Rampage.holdLoad();
			}
		}
		return Rampage.dependencies[dependency].handler;
	};

	/**
	 * @ignore
	 * @function holdLoad
	 * @desc Sets up a little timeout for returning to loading process. Thus it gives time for loading 
	 * further dependencies
	 * @param [notNeeded] {Boolean} Whether it is needed a loading process
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.holdLoad = function(notNeeded) {
		clearTimeout(Rampage.holdLoadInterval);
		Rampage.holdLoadInterval = setTimeout(function() {
			Rampage.releaseLoad(!notNeeded);
		}, 50);
	};

	/**
	 * @ignore
	 * @function releaseLoad
	 * @desc Starts the loading process if needed
	 * @param needed {Boolean} Whether it is needed
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.releaseLoad = function(needed) {
		if(needed) setStatus(this.STATUS_LOAD);
		else run();
	};

	/**
	 * @function init
	 * @summary Core Method
	 * @desc Initializes the application lifecycle
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.init = function() {
		setStatus(Rampage.STATUS_INIT);
	};

	/**
	 * @function coreReady
	 * @desc Sets up the core as ready to start
	 * @returns { void }
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.coreReady = function() {
		coreReady = true;
		
		var str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		var execUID = '';
		for(var i = 0; i < 20; i++) {
			execUID += str.charAt(Math.round(Math.random() * str.length));
		}
		this.executionUID = execUID;
		
		if(this.application) this.init();
	};

	/**
	 * @function loadApplication
	 * @summary Entry point for application
	 * @desc Send your application to Rampage through this method, and it will be loaded and run. 
	 * @param application {Application} Your application
	 * @returns { void }
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 * 
	 */
	this.loadApplication = function(application) {
		this.application = application;
		
		// Set up core path
		var scripts = $('script');
		for(var i = 0; i < scripts.length; i++) {
			var src = scripts[i].src;
			var index = src.indexOf(this.CORE_PREFFIX + 'js');
			if(index + 10 === src.length) {
				var path = src.substring(0, index);
				this.globalPath = path;
				break;
			}
		}
		if(!this.globalPath) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('RAMPAGE_FILE_UNAVAILABLE', [ Rampage.CORE_PREFFIX ] ));
		}
		if(coreReady) this.init();
	};
	
	/**
	 * @function getRootObject
	 * @desc Returns the root object depending on the selected type. It could be {@linkcode Rampage} itself, 
	 * or your application
	 * @param type {String} The type of requested object
	 * @returns {Object} The object requested
	 * 
	 *
	 * @private
	 * @memberof Rampage
	 * @inner
	 */
	function getRootObject(type) {
		var target = null;
		switch(type) {
		case Rampage.DEPENDENCY_CORE:
			target = Rampage;
			break;
		case Rampage.DEPENDENCY_APP:
			target = Rampage.application;
			break;
		}
		return target;
	}
	
	/**
	 * @function DOM
	 * @summary Util Method. Creates DOM objects
	 * 
	 * @desc Creates a DOM structure given an object with its name.
	 * @todo APPEND TUTORIAL!!
	 * 
	 * @param structure
	 *            {Object} The object containing all the elements to create
	 *            
	 * @param [disableJQuery] {Boolean} Whether the object to retrieve is JQuery's or DOM's
	 * 
	 * @returns {JQueryDOMElement|DOMElement}
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.DOM = function(structure, disableJQuery) {
//		var DOMGroup = [];
		for ( var element in structure) {
			var identifiers = element.split(this.DEPENDENCY_SEPARATOR);
			var tag = null, id = null, className = null;
			for ( var identifier in identifiers) {
				switch (identifiers[identifier].charAt(0)) {
				case '#':
					id = identifiers[identifier].substring(1);
					break;
				case '.':
					className = identifiers[identifier].substring(1);
					break;
				default:
					tag = identifiers[identifier];
				}
			}
			
			var DOMElement = $('<' + tag + '/>');
			if (id)
				DOMElement.attr('id', id);
			if (className)
				DOMElement.attr('class', className);
			for ( var attribute in structure[element]) {
				if (attribute === this.DOM_CHILDREN_ATTRIBUTE) {
					for(var i = 0; i < structure[element][attribute].length; i++) {
						DOMElement
							.append(this
									.DOM(structure[element][this.DOM_CHILDREN_ATTRIBUTE][i]));
					}
				} else {
					DOMElement.attr(attribute, structure[element][attribute]);
				}
			}
			DOMElement.inner = function() {
				return this[0];
			};
			if(disableJQuery) return DOMElement.inner();
			return DOMElement;
//			DOMGroup.push(DOMElement.inner());
		}
//		return $(DOMGroup);
	};

	/**
	 * @function message
	 * @desc Returns a message from the message Storage (i.e. {@linkcode Rampage#messages})
	 * 
	 * @param message
	 *            {String} The name of the message to show
	 * @param [replace]
	 *            {Array} List of parameters to show in the message. Will be
	 *            rendered in each {@linkcode MESSAGE_REPLACE_EXPRESSION} String occur.
	 * @returns {String}
	 * 
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.message = function(message, replace) {
		if (!replace)
			return this.messages[message];
		var splitMessage = this.messages[message]
				.split(this.REPLACE_EXPRESSION);
		if (splitMessage.length > replace.length * 2) {
			this.log(this.LOG_WARNING, this.className, this
					.message('GET_MESSAGE_REPLACEMENT_WARNING_LESS'));
		}
		var i = 0;
		var ret = splitMessage[i++];
		for ( var text in replace) {
			ret += replace[text];
			try {
				ret += splitMessage[i++];
			} catch (exception) {
				if ((i + 1) !== splitMessage.length)
					this.log(this.LOG_WARNING, this.className, this.message('GET_MESSAGE_REPLACEMENT_WARNING_MORE'));
			}
		}
		return ret;
	};
	
	/**
	 * @function getObject
	 * @desc Returns a Rampage Object with an array of tags given.
	 * 
	 * @param type
	 *            {String} The type of parent object
	 * @param packages
	 *            {Array} The array with all the elements to descend to
	 * @param [create]
	 *            {Boolean} Whether create the package objects if not existing or
	 *            throw an exception
	 * @throws Exception
	 * @returns {Object}
	 * 
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.getObject = function(type, packages, create) {
		var target = getRootObject(type);
		for ( var pack = 0; pack < packages.length; pack++) {
			if (!target[packages[pack]]) {
				if (create)
					target[packages[pack]] = {};
				else {
					if (this.status() === this.STATUS_LOAD)
						throw this.message('GET_NON_EXISTING_OBJECT', [
								packages[pack], packages.join('.') ]);
					else
						throw new Rampage.core.Exception(this.className, this
								.message('GET_NON_EXISTING_OBJECT', [
										packages[pack], packages.join('.') ]));
				}
			}
			target = target[packages[pack]];
		}
		return target;
	};

	/**
	 * @function setObject
	 * @desc Sets a Rampage Object with an array of tags given.
	 * 
	 * @param packages
	 *            {Array} The array with all the elements to descend to
	 * @param value
	 *            {Object} The value for the object
	 * @returns { void }
	 * 
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.setObject = function(type, packages, value) {
		var target = getRootObject(type);
		for ( var pack = 0; pack < packages.length - 1; pack++) {
			target = target[packages[pack]];
			if (target === undefined) {
				if (this.status() === this.STATUS_LOAD)
					throw this.message('GET_NON_EXISTING_OBJECT', [
							packages[pack], packages.join('.') ]);
				else
					throw new Rampage.core.Exception(this.className, this
							.message('GET_NON_EXISTING_OBJECT', [
									packages[pack], packages.join('.') ]));
			}
		}
		if (target[packages[packages.length - 1]] === undefined) {
			throw new Rampage.core.Exception(this.className, this.message(
					'GET_NON_EXISTING_OBJECT', [ packages[packages.length - 1],
							packages.join('.') ]));
		}
		target[packages[packages.length - 1]] = value;
	};

	/**
	 * @function log
	 * @summary Util method. Logs things
	 * 
	 * Log something in the console.
	 * 
	 * @param type
	 *            {String} Indicates the type of the log
	 * @param className
	 *            {String} Tells who triggered the log
	 * @param log
	 *            {String} The message to be logged
	 * @returns { void }
	 *            
	 * @property Rampage.LOG_DEBUG		- Log type that is shown only in development's mode
	 * @property Rampage.LOG_INFO		- Log type for showing information in the console
	 * @property Rampage.LOG_WARNING	- Log type for sending up a warning
	 * @property Rampage.LOG_ERROR		- Log used to throw errors and exceptions
	 * 
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.log = function(type, className, log) {
		var message = className + '\t' + log;
		switch (type) {
		case this.LOG_DEBUG:
			console.debug(message);
			break;
		case this.LOG_WARNING:
			console.warn(message);
			break;
		case this.LOG_ERROR:
			if(status === Rampage.STATUS_LOAD) return;
			console.error(message);
			break;
		case this.LOG_INFO:
			console.log(message);
		default:
			break;
		}
	};

	/**
	 * @function generateID
	 * @desc Creates a unique ID for an element without it
	 * @this RClass}
	 * @returns {String} The new ID for the element
	 * 
	 * @public
	 * @memberof Rampage
	 * @instance
	 */
	this.generateID = function() {
		var id = this.className + '@' + next_uid++;
		return id;
	};

	/*
	 * Event handlers
	 */

	/**
	 * @function dependencyLoadEventHandler
	 * @desc Function called once a dependency is ready to use
	 * @param type {String} Whether the depencency it's a core or an applicative one
	 * @param script {String} The className of the dependency
	 * @param event {Event} Unused. Ready state event
	 * @returns { void }
	 *
	 * @private
	 * @memberof Rampage
	 * @inner
	 */
	function dependencyLoadEventHandler(type, script, event) {
		Rampage.dependencies[type + Rampage.DEPENDENCY_SEPARATOR + script].status = Rampage.SCRIPT_STATUS_READY;
		Rampage.log(Rampage.LOG_DEBUG, Rampage.className, Rampage.message(
				'IMPORT_DEPENDENCY_READY', [ type, script ]));
	}
})();

$(function() {
	Rampage.coreReady();
});