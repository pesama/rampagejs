
/**
 * @namespace {Rampage.core}
 * @module
 * @class Application
 * @extends RClass
 * @desc Controls all required items to link the application with the engine, and other
 * utilities
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @property params {Object}				- The specific parameters of your application
 * @property params.author {String}			- Your name
 * @property params.name {String}			- The name of your application
 * @property params.description {String}	- The description of your application
 * @property params.version {String} 		- The version of your application
 * @property params.init {Function}			- Initialization function (import dependencies and assets)
 * @property params.run {Function} 			- Run method (Runs the application)
 * 
 * @param params {Object} Configuration params for the application
 * 
 */
Rampage.core.Application = function(params) {
	this.className = 'Rampage.core.Application';
	this.extends(Rampage.RClass);
	
	/**
	 * @type Object
	 * @desc Activities package
	 * 
	 * @public
	 * @instance
	 * @memberOf Application
	 */
	this.activities = {};
	
	/**
	 * @type Object
	 * @desc Views package
	 *
	 * @public
	 * @instance
	 * @memberOf Application
	 */
	this.views = {};

	/**
	 * @type Activity 
	 * @desc Stores the activity currently in execution
	 *
	 * @private
	 * @memberOf Application
	 * @inner
	 */
	var currentActivity = null;
	
	/**
	 * @type String
	 * @desc Holds the author of the application
	 *
	 * @public
	 * @instance
	 * @memberOf Application
	 */
	this.author = null;
	
	/**
	 * @type String
	 * @desc Holds the description of the application
	 *
	 * @public
	 * @instance
	 * @memberOf Application
	 */
	this.description = null;
	
	/**
	 * @type String
	 * @desc Holds the name of the application
	 *
	 * @public
	 * @instance
	 * @memberOf Application
	 */
	this.name = null;
	
	/**
	 * @type String
	 * @desc Holds the path of the application
	 *
	 * @public
	 * @instance
	 * @memberOf Application
	 */
	this.path = null;
	
	/**
	 * @type String
	 * @desc Holds the version of the application
	 *
	 * @public
	 * @instance
	 * @memberOf Application
	 */
	this.version = null;
	
	/*
	 * Activity handling
	 * @memberOf Application
	 */
	
	/**
	 * @type Factory 
	 * @desc Stores the activity factory
	 *
	 * @private
	 * @memberOf Application
	 * @inner
	 */
	var activityFactory = null;

	/**
	 * @function Application~initActivity
	 * @desc Initializes an activity
	 * @param {Activity} activity
	 *
	 * @private
	 */
	function initActivity(activity) {
		activityFactory.addActivity(activity.id(), activity, true);
		activity.application(this);
		activity.doRun();
	};

	/**
	 * @function Application#init
	 * @desc Initializes managers and applies application configuration
	 *
	 * @public
	 */
	this.init = function() {
		// Initialize local parameters
		activityFactory = new Rampage.util.Factory(Rampage.core.Activity);
		
		for(var param in params) {
			if(this[param] === undefined) {
				if(this.config('APPLICATION_STRICT_PARAMS')) {
					Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('APPLICATION_WRONG_PARAM', [ param ]));
				}
			}
			this[param] = params[param];
		}
		
		for(var param in this) {
			if(this[param] === null) {
				if(!this.config('APPLICATION_ALLOW_NULL_PARAMS')) {
					Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('APPLICATION_NULL_PARAM', [ param ]));
				}
			}
		}
	};

	/**
	 * @function Application#activity
	 * @desc Sets and gets the current activity
	 * @param [_activity] {Rampage.core.Activity} The new activity
	 * @return {Activity} The current activity
	 *
	 * @public
	 */
	this.activity = function(_activity) {
		if(_activity) {
			currentActivity = _activity;
			Rampage.Core.activity(_activity);
		}
		return currentActivity;
	};

	/**
	 * @function Application#doRun
	 * @desc Run process
	 *
	 * @public
	 */
	this.doRun = function() {
		Rampage.log(Rampage.LOG_DEBUG, this.className, Rampage.message('APPLICATION_RUNNING'));
		this.run();
	};
	
	/**
	 * @function Application#run
	 * @type Function
	 * @summary Runs the application
	 * @desc This method must be declared in your application's file
	 *
	 * @public
	 */
	this.run = null;

	/**
	 * @function Application#loadActivity
	 * @desc Loads an activity into the activityFactory
	 * @param activityUid {Activity} The UID of the activity
	 * @param fromNavigation {Boolean} Whether it's the NavigationManager who loaded me 
	 * 
	 *
	 * @public
	 * @instance
	 * @memberOf Application
	 */
	this.loadActivity = function(activity) {
		this.activity(activity);
		var loadedActivity = activityFactory.getActivity(activity.id());
		if(loadedActivity !== activity) initActivity.call(this, activity);
	};
};