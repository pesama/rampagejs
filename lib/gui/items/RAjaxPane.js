
/**
 * @class {Rampage.gui.items.RAjaxPane}
 * @extends {Rampage.gui.RItem}
 * Panel with plain HTML content retrieved from an AJAX call
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param url {String} The URL to retrieve the contents from
 */
Rampage.gui.items.RAjaxPane = function(url) {
	this.className = 'Rampage.gui.items.RAjaxPane';
	this.extends(Rampage.gui.RItem);
	
	/**
	 * Initialize the panel
	 */
	function init() {
		if(url) this.url(url);
	}
	
	/**
	 * Initializes the context
	 * @override
	 */
	this.initContext = function() {
		var content = Rampage.net.Ajax.html(url);
		if(!content) {
			Rampage.log(Rampage.LOG_WARNING, this.className, Rampage.message('AJAX_PANE_NO_CONTENT', [ url ]));
		}
		this.dom().html(content);
	};
	
	/**
	 * Sets and gets the URL
	 * @param _url {String} The new URL to call
	 * @return {String} The current URL
	 */
	this.url = function(_url) {
		if(_url) url = _url;
		return url;
	};
	
	/**
	 * Sets the font
	 * @param font {String} The new font
	 * @param options {Object} Font options
	 */
	this.font = function(font, options) {
		if(!options) options = new Object();
		options.family = font;
		this.styleParam('font', '', options);
	};
	init.call(this);
};