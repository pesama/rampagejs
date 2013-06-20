/**
 * @class {Rampage.gui.layouts.FlowLayout}
 * @extends {Rampage.gui.Layout}
 * Defines a Layout with a flow pattern. Elements will be appended respecting its size and its display options
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param display {String} The display method (block, inline...)
 */
Rampage.gui.layouts.FlowLayout = function(display, align) {
	this.className = 'Rampage.gui.layouts.FlowLayout';
	this.extends(Rampage.gui.Layout);

	this.CONTENT_ALIGNMENT_LEFT 	= 'left !important';
	this.CONTENT_ALIGNMENT_CENTER 	= 'center !important';
	this.CONTENT_ALIGNMENT_RIGHT 	= 'right';

	this.CONTENT_DISPLAY_BLOCK 		= 'block';

	/**
	 * Returns the bounds for an item
	 * @param itemBounds {Rampage.util.Bounds} Bounds of the item
	 * @param parentBounds {Rampage.util.Bounds} Bounds of the container
	 * @return {Rampage.util.Bounds} The bounds of the item
	 */
	this.bounds = function(itemBounds, parentBounds) {
		var alignment = this[align];
		var margin = this.margin();
		
		var bounds = new Rampage.util.Bounds();
		bounds.position =  'relative';
		bounds['text-align'] = alignment;
		bounds.display = display;
		bounds.margin = margin;

		var width = itemBounds && itemBounds.width ? itemBounds.width : parentBounds.width;
		var height = itemBounds ? itemBounds.height : null;

		if(display === this.CONTENT_DISPLAY_BLOCK && typeof margin === 'object') {
			var splitMargin = margin.split(' ');
			bounds.width = width - splitMargin[1] - splitMargin[3];
			if(height) bounds.height = height;
		};

		return bounds;
	};

	/**
	 * Overrides standard add item to provide more functionality to the layout
	 * @this {Rampage.gui.RItem}
	 * @override
	 * @param item {Rampage.gui.RItem} The item to append
	 */
	this.add = function(item) {
		var bounds = item.bounds();
		var itemBounds = this.layout().bounds(bounds, this.bounds());
		item.bounds(itemBounds);
		this.doAdd(item);
	};
};

