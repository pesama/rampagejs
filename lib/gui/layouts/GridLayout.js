/**
 * @class {Rampage.gui.layouts.GridLayout}
 * @extends {Rampage.gui.Layout}"
 * Defines a Layout with a Grid Pattern, and Same sized elements.
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param rows {Number} Number of rows for the grid
 * @param columns {Number} Number of columns for the grid
 * 
 */
Rampage.gui.layouts.GridLayout = function(rows, columns) {
	this.className = 'Rampage.gui.layouts.GridLayout';
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
	 * @param row {Number} Index of the row
	 * @param column {Number} Index of the column
	 * @param contextWidth {Number} Width of the context
	 * @param contextHeight {Number} Height of the context
	 * @return {Rampage.util.Bounds} The bounds for the element
	 */
	this.bounds = function(row, column, contextWidth, contextHeight) {
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

		var x = column * width + splitMargin[1];
		var y = row * height + splitMargin[0];
		var w = width - splitMargin[1] - splitMargin[3];
		var h = height - splitMargin[0] - splitMargin[2];
		
		var bounds = new Rampage.util.Bounds(x, y, w, h);
		
		return bounds;
	};

	/**
	 * Overrides standard add item to provide more functionality to the layout
	 * @this {Rampage.gui.RItem}
	 * @override
	 * @param item {Rampage.gui.RItem} The item to add
	 * @param row {Number} Index of the row
	 * @param column {Number} Index of the column
	 */
	this.add = function(item, row, column) {
		if(row === undefined) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('LAYOUT_NULL_PARAM', [ 'row' ]));
		}
		if(column === undefined) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('LAYOUT_NULL_PARAM', [ 'column' ]));
		}
		var bounds = this.bounds();
		var itemBounds = this.layout().bounds(row, column, bounds.width, bounds.height);
		item.bounds(itemBounds);
		this.doAdd(item);
	};
};

