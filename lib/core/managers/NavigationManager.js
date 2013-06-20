/**
 * @namespace Rampage.core.managers
 * @module
 * @class NavigationManager
 * @extends Manager
 * @desc Controls all navigation-related events, and notify all their attached listeners
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 */
Rampage.core.managers.NavigationManager = function() {
	this.className = 'Rampage.core.managers.NavigationManager';
	this.extends(Rampage.core.Manager);

	this.ACTION_TYPE_ACTIVITY 	= 'Activity';
	this.ACTION_TYPE_VIEW 		= 'View';

	/**
	 * @type Activity
	 * @desc Holds the activity currently in execution
	 *
	 * @private
	 * @inner
	 * @memberOf NavigationManager
	 */
	var activity = null;

	/**
	 * @type Factory
	 * @desc Holds the list of actions executed
	 *
	 * @private
	 * @inner
	 * @memberOf NavigationManager
	 */
	var actionFactory = null;

	/**
	 *
	 * @type View
	 * @desc Stores the current view
	 *
	 *
	 * @private
	 * @inner
	 * @memberOf NavigationManager
	 */
	var view = null;

	/**
	 * @public
	 * @function NavigationManager#activity
	 * @desc Sets and gets the Activity
	 * @param [_activity] {Rampage.core.Activity} The new Activity
	 * @return {Activity} The current activity
	 */
	this.activity = function(_activity) {
		if(_activity) {
			activity = _activity;
		}
		return activity;
	};

	/**
	 * @public
	 * @function NavigationManager#view
	 * @desc Sets and gets the View
	 * @param [_view] {View} The new View
	 * @return {View} The current view
	 */
	this.view = function(_view) {
		if(_view) view = _view;
		return view;
	};

	/**
	 * @public
	 * @function NavigationManager#popState
	 * @desc Pops an state from the history
	 * @param event {PopStateEvent} The event of the pop state
	 */
	this.popState = function(event) {
		if(!event || !event.state || !event.state.id) {
			return;
		}
		if(event.state.executionUID !== Rampage.executionUID) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('NAVIGATION_OUT_OF_BOUNDS'));
			var activity = Rampage.Core.activity();
			Rampage.Core.application().loadActivity(activity);
		}
		var id = event.state.id;
		var action = actionFactory.getAction(id);
		if(!action) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('NAVIGATION_NO_ACTION', [ id ]));
			return;
		}
		var actionType = null;
		var actionTitle = action.title();
		if(actionTitle) {
			var displayManager = Rampage.Core.displayManager();
			displayManager.title(actionTitle);
		}
		if(action.hasClassName('Rampage.gui.View')) {
			var effect = this.config('NAVIGATION_CHANGE_EFFECT');
			var viewActivity = action.activity();
			if(viewActivity !== this.activity()) {
				Rampage.Core.application().loadActivity(viewActivity);
			}
			this.activity().loadView(action, effect, true);
			actionType = this.ACTION_TYPE_VIEW;
		}
		
		var evt = new Rampage.core.events.NavigationEvent(actionType, action.className, event);
		this.dispatchEvent(evt);
	};

	/**
	 * @public
	 * @function NavigationManager#save
	 * @desc Saves an activity or view in the stack once it's loaded
	 * @param item {Mixed} (Rampage.core.Activity or Rampage.gui.View) The action to store
	 */
	this.save = function(item) {
		var id = null;
		var title = null;
		var path = null;
		if(item !== 0) {
			id = item.id();

			path = '#' + id;
			title = item.title();

			actionFactory.addAction(id, item, true);
		}
		else id = 0;
		if(title) {
			var displayManager = Rampage.Core.displayManager();
			displayManager.title(title);
		}
		history.pushState({ id : id, executionUID : Rampage.executionUID }, title, path);
	};

	/**
	 * @public
	 * @function NavigationManager#start
	 * @desc Starts the NavigationManager
	 */
	this.start = function() {
		actionFactory = new Rampage.util.Factory('Action');

		/*
		 * Init global bindings
		 */
		var that = this;
		window.onpopstate = function(event) {
			that.popState(event);
		};
	};
};