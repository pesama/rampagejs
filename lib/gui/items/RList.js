
/**
 * @class {Rampage.gui.items.RList}
 * @extends {Rampage.gui.items.RPanel{
 * Defines a List of elements, attached to the list as panels containing information
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 */
Rampage.gui.items.RList = function() {
	this.className = 'Rampage.gui.items.RList';
	this.extends(Rampage.gui.items.RPanel);
	this.implements(Rampage.core.events.listeners.ActionListener);

	this.bind('list');

	this.HEADER_FOREGROUND	= '#ffffff';
	this.HEADER_BACKGROUND	= '#787878';
	this.FOOTER_FOREGROUND	= '#ffffff';
	this.FOOTER_BACKGROUND	= '#787878';
	this.ODD_BACKGROUND 	= '#ffffff';
	this.EVEN_BACKGROUND 	= '#f9cfcf';
	this.FOCUSED_BACKGROUND = '#fffcaa';

	this.PAGE_DELIMITER		= '-';

	/**
	 * @type Number currently start index
	 */
	var currentIndex 	= 0;
	
	/**
	 * @type {Number} Focused element
	 */
	var focusedIndex = -1;
	
	/**
	 * @type Array Array of rows
	 */ 
	var idleItems 		= new Array();
	
	/**
	 * @type Number Number of elements on each page
	 */
	var elementHeight 		= 10;
	
	/**
	 * @type Boolean Indicates whether the content should be divided in pages
	 */
	var pagination 			= true;

	/**
	 * @type Rampage.gui.RItem Item that is shown as header
	 */
	var header 			= null;
	
	/**
	 * @type Number Height of the header
	 */
	var headerHeight 	= 20;

	/**
	 * @type Rampage.gui.items.RPanel Item that acts as footer
	 */
	var footer 			= null;
	
	/**
	 * @type Number Height of the footer
	 */
	var footerHeight 	= 20;

	/**
	 * @type Rampage.gui.items.RLabel Label that shows the current page number
	 */
	var footerCurrentPageLabel 	= null;
	
	/**
	 * @type Rampage.gui.items.RLabel Label that showns the total number of pages
	 */
	var footerPageNoLabel 		= null;
	
	/**
	 * @type Rampage.gui.items.RButton Button to go to next page
	 */
	var nextPageButton 			= null;
	
	/**
	 * @type Rampage.gui.items.RButton Button to go to previous page
	 */
	var previousPageButton 		= null;

	/**
	 * Goes to next page
	 */
	function nextPage() {
		currentIndex += elementHeight;
	}

	/**
	 * Goes to previous page
	 */
	function previousPage() {
		if(currentIndex - elementHeight >= 0) currentIndex -= elementHeight;
		else currentIndex = 0;
	}

	/**
	 * Adds a row into the list
	 * @param row {Rampage.gui.RItem} The row to append
	 */
	this.addRow = function(row) {
		idleItems.push(row);
		this.resizeItem(row);
	};

	/**
	 * Sets and gets the elementHeight parameter
	 * @param eH {Number} The new element height
	 * @return {Number}
	 */
	this.elementHeight = function(eH) {
		if(eH !== undefined) elementHeight = eH;
		return elementHeight;
	};

	/**
	 * Sets and gets the header height
	 * @param hh {Number} new size for the header
	 * @return {Number}
	 */
	this.headerHeight = function(hh) {
		if(hh !== undefined) headerHeight = hh;
		return headerHeight;
	};

	/**
	 * Sets and gets the footer height
	 * @param fh {Number} The new size for the footer
	 * @return {Number}
	 */
	this.footerHeight = function(fh) {
		if(fh) footerHeight = fh;
		return footerHeight;
	};

	/**
	 * Sets and gets the pagination flag
	 * @param pag {Boolean} The new value for the flag
	 * @return {Boolean}
	 */
	this.pagination = function(pag) {
		if(pag !== undefined) pagination = pag;
		return pagination;
	};

	/**
	 * Resizes an item to make it fit row height and width
	 * @param item {Rampage.gui.RItem}
	 * @param index {Number} The index for the element in the list
	 */
	this.resizeItem = function(item, index) {
		var bounds = this.bounds();
		var rowHeight = (bounds.height - headerHeight - footerHeight) / elementHeight;

		var rowBounds = {
			top : headerHeight + index * rowHeight,
			left : 0,
			width : bounds.width,
			height : rowHeight
		};

		item.bounds(rowBounds);
	};

	/**
	 * Updates the list
	 */
	this.update = function() {
		if(!header) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('LIST_NO_HEADER', [ this.id() ]));
		}

		this.removeAll();
		this.add(header);
		for(var i = 0; i < elementHeight; i++) {
			var index = i + currentIndex;
			if(index >= idleItems.length) break;
			var row = idleItems[index];
			row.background(i % 2 === 0 ? this.ODD_BACKGROUND : this.EVEN_BACKGROUND);
			
			if(index === focusedIndex) {
				row.background(this.FOCUSED_BACKGROUND);
			}

			this.resizeItem(row, i);
			this.add(row);
		}
		if(!footer) {
			this.createFooter();
		}

		this.updateFooter();
		this.add(footer);
	};

	/**
	 * Creates the footer
	 */
	this.createFooter = function() {
		var bounds = this.bounds();
		footer = new Rampage.gui.items.RPanel();
		footer.background(this.FOOTER_BACKGROUND);
		footer.bounds({
			top : bounds.height - footerHeight,
			left : 0,
			width : bounds.width,
			height : footerHeight
		});

		var footerLayout = new Rampage.gui.layouts.GridBagLayout(6, 31);
		var footerConstraints = new Rampage.gui.layouts.constraints.GridBagConstraints();
		footer.layout(footerLayout);

		footerConstraints.gridx = 13;
		footerConstraints.gridy = 1;
		footerConstraints.gridwidth = 1;
		footerConstraints.gridheight = 4;

		previousPageButton = new Rampage.gui.items.RButton('<');
		previousPageButton.font('', {size : 8});
		previousPageButton.actionCommand('listPreviousPage');
		previousPageButton.addActionListener(this);
		footer.add(previousPageButton, footerConstraints);

		footerConstraints.gridx = 17;
		footerConstraints.gridy = 1;
		footerConstraints.gridwidth = 1;
		footerConstraints.gridheight = 4;

		nextPageButton = new Rampage.gui.items.RButton('>');
		nextPageButton.font('', {size : 8});
		nextPageButton.actionCommand('listNextPage');
		nextPageButton.addActionListener(this);
		footer.add(nextPageButton, footerConstraints);


		footerConstraints.gridx = 14;
		footerConstraints.gridy = 1;
		footerConstraints.gridwidth = 1;
		footerConstraints.gridheight = 4;

		footerCurrentPageLabel = new Rampage.gui.items.RLabel('1');
		footerCurrentPageLabel.font('Verdana', {size : 10});
		footerCurrentPageLabel.alignment('center');
		footer.add(footerCurrentPageLabel, footerConstraints);

		footerConstraints.gridx = 15;
		footerConstraints.gridy = 1;
		footerConstraints.gridwidth = 1;
		footerConstraints.gridheight = 4;

		var pageDelimiter = new Rampage.gui.items.RLabel(this.PAGE_DELIMITER);
			pageDelimiter.font('Verdana', {size : 10});
			pageDelimiter.alignment('center');
		footer.add(pageDelimiter, footerConstraints);

		footerConstraints.gridx = 16;
		footerConstraints.gridy = 1;
		footerConstraints.gridwidth = 1;
		footerConstraints.gridheight = 4;

		footerPageNoLabel = new Rampage.gui.items.RLabel('1');
		footerPageNoLabel.font('Verdana', {size : 10});
		footerPageNoLabel.alignment('center');
		footer.add(footerPageNoLabel, footerConstraints);
	};

	/**
	 * Updates the footer with the current information
	 */
	this.updateFooter = function() {
		var currentPage = Math.round(currentIndex / elementHeight);
		currentPage++;
		footerCurrentPageLabel.text(currentPage);
		var pageNo = Math.round(idleItems.length / elementHeight);
		footerPageNoLabel.text(pageNo);

		previousPageButton.enable();
		nextPageButton.enable();

		if(currentPage === 1) previousPageButton.disable();
		if(pageNo === currentPage) nextPageButton.disable();
	};

	/**
	 * Sets up the header for the element
	 * @param head {Rampage.gui.RItem} The new header item
	 */
	this.header = function(head) {
		header = head;
		var bounds = this.bounds();
		header.background(this.HEADER_BACKGROUND);
		header.bounds({
			top : 0,
			left : 0,
			width : bounds.width,
			height : headerHeight
		});
	};

	/**
	 * Appends a ListSelectionListener
	 * @param listSelectionListener {Rampage.core.events.listeners.ListSelectionListener}
	 */
	this.addListSelectionListener = function(listSelectionListener) {
		var mouseManager = Rampage.Core.mouseManager();
		mouseManager.addEventListener(Rampage.core.events.ListSelectionEvent.className, listSelectionListener);
	};

	/**
	 * Proceeds an action whenever a native event is dispatched
	 * @param event {Event} The native event dispatched
	 */
	this.proceedAction = function(event) {
		var sourceID 	= event.currentTarget.id;
		var sourceElem 	= null;

		for(var i = 0; i < idleItems.length; i++) {
			if(idleItems[i].id() === sourceID) {
				sourceElem = idleItems[i];
				break;
			}
		}
		if(!sourceElem) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('LIST_ACTION_NO_ITEM', [ sourceID ]));
			return;
		}

		focusedIndex = i;
		var listSelectionEvent = new Rampage.core.events.ListSelectionEvent(event, this, focusedIndex, sourceElem);

		var mouseManager = Rampage.Core.mouseManager();
		mouseManager.dispatchEvent(listSelectionEvent);
		
		Rampage.Core.view().update();
	};

	/**
	 * Performs an action when an ActionEvent is dispatched
	 * Normally for page changing
	 * @override
	 * @param event {Rampage.core.events.ListSelectionEvent} The event dispatched
	 */
	this.actionPerformed = function(event) {
		if(event.source() === nextPageButton) {
			nextPage();
			Rampage.Core.view().update(); 
			focusedIndex = -1;
		}
		else if(event.source() === previousPageButton) {
			previousPage();
			Rampage.Core.view().update();
			focusedIndex = -1;
		}
	};
};

ko.bindingHandlers.list = {
	init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		// This will be called when the binding is first applied to an element
		// Set up any initial state, event handlers, etc. here
		var item = ko.utils.unwrapObservable(valueAccessor()); 
		var jElement = $(element);
		//jElement.text(item.getText());
		var children = jElement.children();
		children.on('click', function(event) {
			item.proceedAction(event);
			return false;
		});
	},
	update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    	// This will be called once when the binding is first applied to an element,
    	// and again whenever the associated observable changes value.
    	// Update the DOM element based on the supplied values here.
	},
};