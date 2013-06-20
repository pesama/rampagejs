
/**
 * @class {Rampage.gui.items.RAccordionTab}
 * @extends Rampage.gui.RItem
 * Represents a tab for an accordion
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param title {String} The title for the tab
 * @param content {Rampage.gui.RItem}
 */
Rampage.gui.items.RAccordionTab = function(title, content) {
	this.className = 'Rampage.gui.items.AccordionTab';
	this.extends(Rampage.gui.RItem);

	/**
	 * @type Rampage.gui.items.RLabel The label item for the tab title
	 */
	var titleLabel = null;

	/**
	 * @constructor Default initialization method
	 */
	this.init = function() {
		this.title(title);
		this.add(titleLabel);
		this.add(content);
	};

	/**
	 * Gets and sets the title of the tab
	 * @param newTitle {String} The new title of the tab
	 * @return {String}
	 */
	this.title = function(newTitle) {
		if(newTitle) {
			title = newTitle;
			if(!titleLabel) titleLabel = new Rampage.gui.items.RLabel(title);
			else titleLabel.text(title);
		}
		return title;
	};

	/**
	 * Gets and sets the content of the tab
	 * @param newContent {Rampage.gui.RItem}
	 * @return {Rampage.gui.RItem}
	 */
	this.content = function(newContent) {
		if(newContent) content = newContent;
		return content;
	};

	this.init();
};