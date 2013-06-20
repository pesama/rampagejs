/**
 * @class {Rampage.gui.items.RPanel}
 * @extends {Rampage.gui.RItem}
 * Represents a container of items
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 */
Rampage.gui.items.RPanel = function() {
	this.className = 'Rampage.gui.items.RPanel';
	this.extends(Rampage.gui.RItem);

	/**
	 * @type Rampage.gui.Layout The layout for the panel
	 */
	var layout = null;
	
	/**
	 * @type Rampage.gui.items.RPanel The content pane of the panel
	 */
	var contentPane = null;
	
	/**
	 * Sets and gets the layout
	 * @param lyt {Rampage.gui.Layout} The new layout
	 * @return {Rampage.gui.Layout} The current layout
	 */
	this.layout = function(lyt) {
		if(lyt) {
			layout = lyt;
			this.doAdd = this.add;
			this.add = layout.add;
		}
		return layout;
	};

	/**
	 * Sets the alignment for the panel content
	 * @param align {String} The new alignment
	 */
	this.align = function(align) {
		var bounds = this.bounds() || new Object();
		bounds.position = 'relative';
		bounds['text-align'] = align;
		this.bounds(bounds);
	};

	/**
	 * Sets and gets the content pane
	 * @param _contentPane {Rampage.gui.items.RPanel} The new content pane
	 * @return {Rampage.gui.items.RPanel} The current content pane
	 */
	this.contentPane = function(_contentPane) {
		if(_contentPane) {
			var bounds = this.bounds();
			var panelBounds = {
				top : 0,
				left : 0,
				width : bounds.width,
				height : bounds.height
			};
			_contentPane.bounds(panelBounds);
			this.removeAll();
			this.add(_contentPane);
			contentPane = _contentPane;
		}
		return contentPane;
	};
};

