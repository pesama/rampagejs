/**
 * @namespace Rampage.core
 * @module
 * @class Activity
 * @extends RClass
 * @desc An activity is the handler of a group of views and actions within an application
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 */
Rampage.core.Activity = function() {
	this.className = 'Rampage.core.Activity';
	this.extends(Rampage.RClass);

	/**
	 * @type Application
	 * @desc Holds the instance of the application running
	 *
	 * @private
	 * @inner
	 * @memberOf Activity
	 */
	var application = null;
	
	/**
	 * @type View
	 * @desc Holds the view currently shown
	 *
	 * @private
	 * @inner
	 * @memberOf Activity
	 */
	var currentView = null;
	
	/**
	 * @type Factory
	 * @desc Holds the view factory
	 *
	 * @private
	 * @inner
	 * @memberOf Activity
	 */
	var viewFactory = null;

	/**
	 * @private
	 * @function Activity~initView
	 * @desc Loads a new view into the factory and starts it
	 * @this Activity
	 * @param view View The view to load
	 */
	function initView(view) {
		this.view(view);
		view.activity(this);
		viewFactory.addView(view.id(), view, true);
		view.doRun();
	};

	/**
	 * @public
	 * @function Activity#view
	 * @desc Sets and gets the view currently enabled
	 * @param [_view] {View} new view to set up
	 * @return {View}
	 */
	this.view = function(_view) {
		if(_view) {
			currentView = _view;
			Rampage.Core.view(currentView);
		}
		return currentView;
	};

	/**
	 * @public
	 * @function Activity#callWS
	 * @desc Performs a synchronous service call to get or put data
	 * @param method {String} Whether the request is to GET, PUT or DELETE (or other value if not using RampageWS)
	 * @param data {Object} The data to submit to the server
	 * @param path {String} (Optional) Address of the Web Service
	 * @return {Object} The response from the service
	 */
	this.callWS = function(method, data, path) {
		if(!path) path = this.config('AJAX_SERVICE_URL');
		var request = new Rampage.net.RequestDTO();
		request.status = method;
		request.data = data;

		var response = Rampage.net.Ajax.get(path, request);
		return response;
	};

	/**
	 * @public
	 * @function Activity#loadView
	 * @desc Loads a view into the system
	 * @param view {Rampage.gui.View} View to load
	 * @param effect {Rampage.gui.Effect} The effect to load
	 * @param fromNavigation {Boolean} Whether it's the NavigationManager who loaded me
	 */
	this.loadView = function(view, effect, fromNavigation) {
		if(currentView) {
			currentView.shutdown(effect);
		}
		else {
			// First view of the system
		}
		var loadedView = viewFactory.getView(view.id());
		if(loadedView !== view) initView.call(this, view);
		else view.resume(effect, fromNavigation);
	};

	/**
	 * @public
	 * @function Activity#doRun
	 * @desc Starts the running process of the activity
	 */
	this.doRun = function() {
		viewFactory = new Rampage.util.Factory(Rampage.gui.View);

		this.run();
	};

	/**
	 * @public
	 * @function Activity#application
	 * @desc Sets and gets the current application
	 * @param [app] {Application} The new application
	 * @return {Application} The current application
	 */
	this.application = function(app) {
		if(app) application = app;
		return application;
	};
};