/**
 * @class {Rampage.gui.items.RCanvas}
 * @extends {Rampage.gui.RItem}
 * Defines a canvas element (for low level rendering graphics)
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param width {Number} The width for the canvas
 * @param height {Number} The height for the canvas
 */
Rampage.gui.items.RCanvas = function(width, height) {
	this.className = 'Rampage.gui.items.RCanvas';
	this.extends(Rampage.gui.RItem);
	this.modelParam('width', width);
	this.modelParam('height', height);

	/**
	 * @type CanvasRenderingContext2d Holds the context of the canvas
	 */
	var context = null;

	/**
	 * Initializes the context
	 * @Override
	 */
	this.initContext = function() {
		var parent = this.parent;
		while(!(parent instanceof Rampage.gui.RItem)) {
			parent = parent.parent;
		}
		parent.initContext();
		context = this.dom().inner().getContext('2d');
		this.paintCanvas(context);
	};

	/**
	 * Sets and gets the bounds for the canvas
	 * @param bounds {Rampage.util.Bounds} The new bounds for the Canvas
	 * @return {Rampage.util.Bounds} The bounds for the canvas
	 * @Override
	 */
	this.bounds = function(bounds) {
		if(bounds) {
			this.width(bounds.width);
			this.height(bounds.height);
		}
		return this.parent.bounds(bounds);
	};

	/**
	 * Sets and gets the height of the canvas
	 * @param hgt {Number} The new height of the item
	 * @return {Object}
	 */
	this.height = function(hgt) {
		if(hgt !== undefined) {
			height = hgt;
			this.modelParam('height', hgt);
		}
		return this.modelParam('height');
	};

	/**
	 * Sets and gets the width of the canvas
	 * @param wdt {Number} The new width for the item
	 * @return {Object}
	 */
	this.width = function(wdt) {
		if(wdt !== undefined) {
			width = wdt;
			this.modelParam('width', wdt);
		}
		return this.modelParam('width');
	};

	/**
	 * Paints a dashed line within the given context
	 * @param context {CanvasRenderingContext2d} The context of the canvas
	 * @param x1 {Number} The x initial position
	 * @param x2 {Number} The x final position
	 * @param y1 {Number} The y initial position
	 * @param y2 {Number} The y final position
	 * @param dashLen {Number} The length of each line
	 */
	this.dashedLine = function(context, x1, x2, y1, y2, dashLen) {
		if (dashLen == undefined) dashLen = 2;
	    context.moveTo(x1, y1);
	    
	    var dX = x2 - x1;
	    var dY = y2 - y1;
	    var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
	    var dashX = dX / dashes;
	    var dashY = dY / dashes;
	    
	    var q = 0;
	    while (q++ < dashes) {
	     x1 += dashX;
	     y1 += dashY;
	     context[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
	    }
	    context[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);
	};

	/**
	 * Empties the context to re-render
	 */
	this.flush = function() {
		context.fillStyle = this.background();
		context.fillRect(0, 0, width, height);
	};
};