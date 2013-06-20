/**
 * @namespace Rampage
 * @module
 * @class Core
 * @summary Takes control of all the core operations needed for Rampage framework to work
 * @desc It controls the cycle once the main processes are running, to enable the application 
 * and let it be shown. It also controls all the managers, which you'd need to access 
 * for event management.
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 */
Rampage.Core = new (function() {
	this.className = 'Rampage.Core';

	/**
	 * @type Activity 
	 * @desc Holds the activity in execution
	 *
	 * @private
	 * @memberof Core
	 */
	var activity = null;

	/**
	 * @type Application
	 * @desc Holds the application
	 *
	 * @private
	 * @memberof Core
	 */
	var application = null;

	/**
	 * @type ConfigurationManager 
	 * @desc Stores the instance of the configuration manager
	 *
	 * @private
	 * @memberof Core
	 */
	var configurationManager = null;

	/**
	 * @type DisplayManager 
	 * @desc Stores display manager's instance
	 *
	 * @private
	 * @memberof Core
	 */
	var displayManager = null;

	/**
	 * 
	 * @type KeyboardManager
	 * @desc Stores the instance of the keyboardManager
	 *
	 * @private
	 * @memberof Core
	 */
	var keyboardManager = null;

	/**
	 * 
	 * @type MouseManager 
	 * @dec Stores the instance of the MouseManager
	 *
	 * @private
	 * @memberof Core
	 */
	var mouseManager = null;

	/**
	 * 
	 * @type NavigationManager
	 * @desc Stores the instance of the NavigationManager
	 *
	 * @private
	 * @memberof Core
	 */
	var navigationManager = null;

	/**
	 * 
	 * @type TimeManager
	 * @desc Stores the instance of the TimeManager
	 *
	 * @private
	 * @memberof Core
	 */
	var timeManager = null;

	/**
	 * @type View 
	 * @desc Stores the view currently shown
	 *
	 * @private
	 * @memberof Core
	 */
	var view = null;

	/**
	 * @function Core~init
	 * @desc This method loads all the managers needed to manage the applications and
	 * to let them control the framework workflow.
	 *
	 * @private
	 */
	function init() {
		initManagers();
		navigationManager.save(0);
		run();
	}

	/**
	 * @function Core~initManagers
	 * @desc Initializes all the managers.
	 *
	 * @private
	 */
	function initManagers() {
		configurationManager = new Rampage.core.managers.ConfigurationManager();
		displayManager = new Rampage.core.managers.DisplayManager();
		keyboardManager = new Rampage.core.managers.KeyboardManager();
		mouseManager = new Rampage.core.managers.MouseManager();
		navigationManager = new Rampage.core.managers.NavigationManager();
		timeManager = new Rampage.core.managers.TimeManager();

		// Start managers
		
		displayManager.start();
		keyboardManager.start();
		navigationManager.start();
		timeManager.start();
	}

	/**
	 * @function Core~run
	 * @desc This method is loaded when all the managers have been loaded and the
	 * application is ready to be run.
	 *
	 * @private
	 */
	function run() {
		application = new Rampage.core.Application(Rampage.application);
		application.init();
	}

	/**
	 * @function Core#flush
	 * @desc Empties the manager's listeners to refill them afterwards by other view /
	 * activity
	 *
	 * @public
	 */
	this.flush = function() {
		humanManager.flush();
		mouseManager.flush();
		keyboardManager.flush();
		navigationManager.flush();
	};

	/**
	 * @function Core#configurationManager
	 * @desc Returns the configuration manager
	 * @returns {ConfigurationManager}
	 *
	 * @public
	 */
	this.configurationManager = function() {
		return configurationManager;
	};

	/**
	 * @function Core#displayManager
	 * @desc Returns the manager of the display
	 * @returns {DisplayManager}
	 *
	 * @public
	 */
	this.displayManager = function() {
		return displayManager;
	};

	/**
	 * @function Core#keyboardManager
	 * @desc Returns the keyboard manager
	 * @returns {KeyboardManager}
	 *
	 * @public
	 */
	this.keyboardManager = function() {
		return keyboardManager;
	};

	/**
	 * @function Core#mouseManager
	 * @desc Returns the mouse manager
	 * @returns {MouseManager}
	 *
	 * @public
	 */
	this.mouseManager = function() {
		return mouseManager;
	};

	/**
	 * @function Core#navigationManager
	 * @desc Returns the navigation manager
	 * @returns {NavigationManager}
	 *
	 * @public
	 */
	this.navigationManager = function() {
		return navigationManager;
	};

	/**
	 * @function Core#timeManager
	 * @desc Returns the time manager
	 * @returns {TimeManager}
	 *
	 * @public
	 */
	this.timeManager = function() {
		return timeManager;
	};

	/**
	 * @function Core#applicationPath
	 * @desc Returns the application path
	 * @returns {String}
	 *
	 * @public
	 */
	this.applicationPath = function() {
		return application.path;
	};

	/**
	 * @function Core#activity
	 * @desc Sets and gets the activity
	 * @param [_activity] {Activity} The new activity
	 * @returns {Activity}
	 *
	 * @public
	 */
	this.activity = function(_activity) {
		if(_activity) {
			activity = _activity;
			navigationManager.activity(_activity);
		}
		return activity;
	};
	
	/**
	 * @function Core#application
	 * @desc Gets the application
	 * @returns {Application}
	 *
	 * @public
	 */
	this.application = function() {
		return application;
	};

	/**
	 * @function Core#view
	 * @desc Sets and gets the view
	 * @param [_view] {View} The new view
	 * @returns {View}
	 *
	 * @public
	 */
	this.view = function(_view) {
		if(_view) {
			view = _view;
			navigationManager.view(_view);
		}
		return view;
	};

	/**
	 * @function Core#start
	 * @desc CoreManager initialization method. This is the first method loaded by the
	 * CoreManager, and it starts the management of the environment and
	 * applications
	 *
	 * @public
	 */
	this.start = function() {
		init();
		application.doRun();
	};
})();