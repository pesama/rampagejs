
/**
 * @class {Rampage.gui.items.RTabbedPane}
 * @extends {Rampage.gui.RItem}
 * Panel with several interchangeable tabs
 * 
 * @version 2.0.2-ALPHA
 */
Rampage.gui.items.RTabbedPane = function() {
	this.className = 'Rampage.gui.items.RTabbedPane';
	this.extends(Rampage.gui.RItem);
	
	/**
	 * @type Rampage.gui.items.RTabHeader Holds the header of the tabbedPane
	 */
	var header = new Rampage.gui.items.RTabHeader();
	this.add(header);
	
	/**
	 * Adds a Tab to the Pane
	 * @param title {String} Title text for the tag
	 * @param content {Rampage.gui.items.RPanel} Content for the tab
	 */
	this.addTab = function(title, content) {
		var titleLabel = new Rampage.gui.items.RTabHeaderItem(title);
		header.add(titleLabel);
		this.add(content);
	};
};

/**
 * @class {Rampage.gui.items.RTabHeader}
 * @extends {Rampage.gui.RItem}
 * The header for the TabbedPane
 */
Rampage.gui.items.RTabHeader = function() {
	this.className = 'Rampage.gui.items.RTabHeader';
	this.extends(Rampage.gui.RItem);
};

/**
 * @class {Rampage.gui.items.RTabHeaderItem}
 * @extends {Rampage.gui.RItem}
 * A header item for the TabbedPane
 * 
 * @param text {String} The 
 * 
 */
Rampage.gui.items.RTabHeaderItem = function(text) {
	this.className = 'Rampage.gui.items.RTabHeaderItem';
	this.extends(Rampage.gui.RItem);
	
	this.text(text);
};