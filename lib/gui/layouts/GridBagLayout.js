/**
 * @class {Rampage.gui.layouts.GridBagLayout}
 * @extends {Rampage.gui.Layout}
 * Represents a Java GridBagLayout, where elements can have more elastic sizes
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param rows {Number} Number of rows for the grid bag
 * @param columns {Number} Number of columns for the grid bag
 */
Rampage.gui.layouts.GridBagLayout = function(rows, columns) {
	this.className = 'Rampage.gui.layouts.GridBagLayout';
	this.extends(Rampage.gui.Layout);

	/**
	 * @type Number number of rows
	 */
	var _rownum = rows;
	
	/**
	 * @type Number number of columns
	 */
	var _colnum = columns;
	
	/**
	 * Get the bounds for the element
	 * @param constraints {Rampage.gui.layouts.constraints.GridBagConstraints} The constraints for the item
	 * @param contextWidth {Number} The width of the context
	 * @param contextHeight {Number} The height of the context
	 * @return {Rampage.util.Bounds} The bounds for the item
	 */
	this.bounds = function(constraints, contextWidth, contextHeight) {
		var width = Math.round(contextWidth / _colnum);
		var height = Math.round(contextHeight / _rownum);

		var margin = this.margin();
		var splitMargin = null;

		if(margin.split) splitMargin = margin.split(' ');
		else splitMargin = [margin];

		var marginLength = splitMargin.length;

		switch(marginLength) {
		case 1:
			splitMargin.push(splitMargin[0], splitMargin[0], splitMargin[0], splitMargin[0]);
			break;
		case 2:
			splitMargin.push(splitMargin[0], splitMargin[1]);
			break;
		case 4:
			break;
		default:
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('LAYOUT_WRONG_MARGIN'));
		}

		var x = constraints.gridx * width + splitMargin[1];
		var y = constraints.gridy * height + splitMargin[0];
		var w = constraints.gridwidth * width - splitMargin[1] - splitMargin[3];
		var h = constraints.gridheight * height - splitMargin[0] - splitMargin[2];
		
		var bounds = new Rampage.util.Bounds(x, y, w, h);
		return bounds;
	};

	/**
	 * Overrides standard add item to provide more functionality to the layout
	 * @this {Rampage.gui.RItem}
	 * @override
	 * @param item {Rampage.gui.RItem} The item to add
	 * @param constraints {Rampage.gui.layouts.constraints.GridBagConstraints} The constraints for the item
	 */
	this.add = function(item, constraints) {
		if(item === undefined) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('LAYOUT_NULL_PARAM', [ 'item' ]));
		}
		if(constraints === undefined) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('LAYOUT_NULL_PARAM', [ 'constraints' ]));
		}
		var bounds = this.bounds();
		var itemBounds = this.layout().bounds(constraints, bounds.width, bounds.height);
		item.bounds(itemBounds);
		this.doAdd(item);
	};
};