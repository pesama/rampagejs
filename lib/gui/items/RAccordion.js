
/**
 * @class {Rampage.gui.items.RAccordion}
 * @extends {Rampage.gui.RItem}
 * Defines an accordion with all its events
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 */
Rampage.gui.items.RAccordion = function() {
	this.className = 'Rampage.gui.items.RAccordion';
	this.extends(Rampage.gui.RItem);
	this.bind('accordion');

	/**
	 * Initializes the context
	 * @Override
	 */
	this.initContext = function() {
		this.dom().accordion();
		this.bind();
		this.parent.initContext();
	};

	/**
	 * Sets and gets the foreground
	 * @param fg {String} The new foreground
	 * @return {String}
	 */
	this.foreground = function(fg) {
		if(fg) this.style().color = fg;
		return this.style().color;
	};

	/**
	 * Adds a tab into the accordion
	 * @param tab {Rampage.gui.items.RAccordionTab} The new tab to append
	 */
	this.addTab = function(tab) {
		this.add(tab);
	};

	/**
	 * Adds a tabSelectionListener
	 * @param tabSelectionListener {Rampage.gui.listeners.TabSelectionListener} The tab selection listener
	 */
	this.addTabSelectionChangeListener = function(tabSelectionListener) {
		_changeListener = tabSelectionListener;

		var mouseManager = Rampage.Core.mouseManager();
		mouseManager.addEventListener('tabSelectionEvent', tabSelectionListener);
	};

	/**
	 * Proceeds an action when an event is dispatched
	 * @param event {Option} The event dispatched
	 * @param ui {Object} Indicates the old tab and the new tab
	 */
	this.proceedAction = function(event, ui) {
		var tabs = this.items();
		var oldTab = null, newTab = null;
		for(var i = 0; i < tabs.length; i++) {
			if(ui.oldPanel && tabs[i].content().id() === ui.oldPanel.attr('id')) {
				oldTab = tabs[i];
				continue;
			}
			if(ui.newPanel && tabs[i].content().id() === ui.newPanel.attr('id')) {
				newTab = tabs[i];
				continue;
			}
			if(oldTab && newTab) break;
		}

		var tabSelectionEvent = new Rampage.core.events.TabSelectionEvent(event, this, oldTab, newTab);

		var mouseManager = Rampage.Core.mouseManager();
		mouseManager.dispatchEvent(tabSelectionEvent);
	};
};

ko.bindingHandlers.accordion = {
	init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		// This will be called when the binding is first applied to an element
		// Set up any initial state, event handlers, etc. here
		var item = ko.utils.unwrapObservable(valueAccessor());
		var jElement = $(element);
		jElement.on('accordionbeforeactivate', function(event, ui) {
			item.proceedAction(event, ui);
		});
	},
	
	update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    	// This will be called once when the binding is first applied to an element,
    	// and again whenever the associated observable changes value.
    	// Update the DOM element based on the supplied values here.
	}
};