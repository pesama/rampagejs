
/**
 * @class {Rampage.util.Bounds}
 * 
 * @author Pelayo Sanchez Margareto
 * 
 * @param x The x-coordinate of the bounds
 * @param y The y-coordinate of the bounds
 * @param width The width of the bounds
 * @param height The height of the bounds
 */
Rampage.util.Bounds = function(x, y, width, height) {
	this.className = 'Rampage.util.Bounds';
	
	/**
	 * @type Number The x-coordinate of the bounds
	 */
	this.left = x;
	
	/**
	 * @type Number The y-coordinate of the bounds
	 */
	this.top = y;
	
	/**
	 * @type Number The width for the bounds
	 */
	this.width = width;
	
	/**
	 * @type Number the height for the bounds
	 */
	this.height = height;
};