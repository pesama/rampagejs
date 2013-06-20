
/**
 * 
 * @class {Rampage.gui.View}
 * Provides common parameters and methods for every registered view.
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 */
Rampage.gui.View = function() {
	this.className = 'Rampage.gui.View';
	this.extends(Rampage.RClass);

	/**
	 * @type Rampage.core.Activity Activity that holds / owns the view
	 */
	var activity = null;

	/**
	 * @type String Title of the view
	 */
	var title = null;

	/**
	 * @type Rampage.gui.items.RPanel Main container (a component) of view's visual components
	 */
	var contentPane = null;

	/**
	 * Sets and gets the title
	 * @param ttl {String} The new title for the view
	 * @return{String}
	 */
	this.title = function(ttl) {
		if(ttl) title = ttl;
		return title;
	};
	
	/*
	 * Graphics management
	 */
	
	/**
	 * 
	 * Paints the container contentPane into the graphics context
	 * @param graphics {Rampage.gui.Graphics} The graphics to paint into
	 */
	function paint(graphics) {
		var displayManager = Rampage.Core.displayManager();
		var target = contentPane;
		
		if(!graphics) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('VIEW_PAINT_NO_GRAPHICS'));
		}
		graphics.empty();

		var emptyReason = Rampage.core.events.DisplayEvent.REASON_FLUSH;
		var emptyStatus = Rampage.core.events.DisplayEvent.STATUS_EMPTY;
		var emptyEvent = new Rampage.core.events.DisplayEvent(this, emptyReason, emptyStatus, target);
		displayManager.dispatchEvent(emptyEvent);
		
		target.paint(graphics);

		var paintReason = Rampage.core.events.DisplayEvent.REASON_PAINT;
		var paintStatus = Rampage.core.events.DisplayEvent.STATUS_LOAD;
		var paintEvent = new Rampage.core.events.DisplayEvent(this, paintReason, paintStatus, target);		
		displayManager.dispatchEvent(paintEvent);
		
		graphics.render();

		var renderReason = Rampage.core.events.DisplayEvent.REASON_RENDER;
		var renderStatus = Rampage.core.events.DisplayEvent.STATUS_READY;
		var renderEvent = new Rampage.core.events.DisplayEvent(this, renderReason, renderStatus, target);		
		displayManager.dispatchEvent(renderEvent);

		var viewModel = displayManager.viewModel();
		ko.applyBindings(viewModel);

		target.initContext();
	}

	/**
	 * Default run method
	 */
	this.doRun = function() {
		var that = this;
		setTimeout(function() {
			that.run();
			that.resume();
		}, 30);
	};
	
	/**
	 * Saves the view within the Navigation Manager
	 */
	this.save = function() {
		var navigationManager = Rampage.Core.navigationManager();
		navigationManager.save(this);
	};

	/**
	 * Default resume method
	 * @param effect {Rampage.gui.Effect} Effect to execute on view resume
	 * @param dontSave {Boolean} If true, the view is not saved within the navigation manager
	 */
	this.resume = function(effect, dontSave) {
		if(!dontSave) {
			this.save();
		}
		
		this.update();

		if(effect) {
			effect.show(contentPane);
		}
	};

	/**
	 * Default flush method
	 */
	this.flush = function() {
		contentPane.dom().remove();
	};

	/**
	 * Updates the visual appearance of the view
	 */
	this.update = function() {
		var displayManager = Rampage.Core.displayManager();
		graphics = displayManager.graphics();
		paint.call(this, graphics);
	};

	/**
	 * Shuts down the view (launch transition.out and deactivate)
	 * @param effect {Rampage.gui.Effect} Effect to apply to the view
	 */
	this.shutdown = function(effect) {
		if(effect) {
			var that = this;
			effect.callback = function() {
				that.doShutdown();
			};
			effect.hide(contentPane);
		}
	};

	/**
	 * Makes the shutdown effective (after transition.out)
	 */
	this.doShutdown = function() {
		this.flush();
	};

	/**
	 * Sets and gets the content pane of the view
	 * @param _contentPane {Rampage.gui.items.RPanel} The new contentPane
	 * @return {Rampage.gui.items.RPanel}
	 */
	this.contentPane = function(_contentPane) {
		if(_contentPane) {
			contentPane = _contentPane;
			contentPane.id(this.id());
			var bounds = Rampage.Core.displayManager().bounds();
			contentPane.bounds(bounds);
		}
		return contentPane;
	};

	/**
	 * Sets and gets the activity
	 * @param act {Rampage.core.Activity} The new Activity
	 * @return {Rampage.core.Activity} The current Activity
	 */
	this.activity = function(act) {
		if(act) activity = act;
		return activity;
	};
	
	/**
	 * Attaches a listener to Display events
	 * @param listener {Rampage.core.events.listeners.DisplayListener}
	 */
	this.addDisplayListener = function(listener) {
		var displayManager = Rampage.Core.displayManager();
		displayManager.addEventListener(Rampage.core.events.DisplayEvent.className, listener);
	};
};