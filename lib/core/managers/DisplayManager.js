/**
 * @namespace Rampage.core.managers
 * @class DisplayManager
 * @extends Manager
 * @desc Controls all screen related items, as well as the access to the visual content
 *
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 */
Rampage.core.managers.DisplayManager = function() {
	this.className = 'Rampage.core.managers.DisplayManager';
	this.extends(Rampage.core.Manager);
	
	/**
	 * @type JQueryDOMElement
	 * @desc Main container of the application
	 *
	 * @private
	 * @inner
	 * @memberOf DisplayManager
	 */
	var canvas = null;
	
	/**
	 * @type JQueryDOMElement
	 * @desc Title of the window
	 *
	 * @private
	 * @inner
	 * @memberOf DisplayManager
	 */
	var title = null;
	
	/**
	 * @type Object
	 * @desc Stores the visual elements on the screen and their attached models
	 *
	 * @private
	 * @inner
	 * @memberOf DisplayManager
	 */
	var viewModel = {
		items : {},
		models : {},
	};

	/**
	 * @public
	 * @function DisplayManager#canvas
	 * @desc Sets the canvas (if the method is setting) and then returns current jQuery canvas element;
	 * @param [cnvs] {JQueryDOMElement}
	 * @returns {JQueryDOMElement}
	 */
	this.canvas = function(cnvs) {
		if(cnvs) canvas = cnvs;
		return canvas;
	};

	/**
	 * @public
	 * @function DisplayManager#graphics
	 * @desc Returns a graphics object with the context set at the main canvas element
	 * @return {Graphics}
	 */
	this.graphics = function() {
		var graphics = new Rampage.gui.Graphics();
		graphics.context(canvas);
		return graphics;
	};

	/**
	 * @public
	 * @function DisplayManager#bounds
	 * @desc Returns the Bounds of the main canvas element
	 * @return {Bounds}
	 */
	this.bounds = function() {
		var cssLeft = canvas.css('left');
		var left = parseInt(cssLeft.substring(0, cssLeft.indexOf('px')));
		var cssTop = canvas.css('top');
		var top = parseInt(cssTop.substring(0, cssTop.indexOf('px')));
		var bounds = new Rampage.util.Bounds(left, top, canvas.width(), canvas.height());
		return bounds;
	};
	
	/**
	 * @public
	 * @function DisplayManager#title
	 * @desc Sets and gets the title of the window
	 * @param [_title] {String} The new title
	 * @return {String} The current title
	 */
	this.title = function(_title) {
		if(_title) {
			title.text(_title + ' - ' + Rampage.application.name);
		}
		return title.text();
	};

	/**
	 * @public
	 * @function DisplayManager#viewModel
	 * @desc Returns the viewModel element
	 * @return {Object}
	 */
	this.viewModel = function() {
		return viewModel;
	};
	
	/**
	 * @public
	 * @function DisplayManager#start
	 * @desc start method
	 */
	this.start = function() {
		canvas = $(document.body);
		title = $('title');
		if(!title || !title.length) {
			title = Rampage.DOM({'title' : {}});
			$('head').append(title);
		}
	};
};