
/**
 * @class {Rampage.gui.effects.SizeEffect}
 * @extends {Rampage.gui.Effect}
 * Performs a JQueryUI Size effect, which resizes an element to specified dimensions
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param width {Number} The new width of the element
 * @param height {Number} The new height of the element
 * @param origin {Array} The vanishing point ['top', 'left']
 * @param scale {String} Which areas will be resized
 */
Rampage.gui.effects.SizeEffect = function(width, height, origin, scale) {
	this.className = 'Rampage.gui.effects.SizeEffect';
	this.extends(Rampage.gui.Effect);

	this.type(Rampage.gui.Effect.TYPE_SIZE);
	if(width === undefined) {
		Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('EFFECT_REQUIRED_PARAMETER', [ 'width' ]));
	}
	if(height === undefined) {
		Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('EFFECT_REQUIRED_PARAMETER', [ 'height' ]));
	}
	this.option('to', {width : width, height : height});
	if(origin) this.option('origin', origin);
	if(scale) this.option('scale', scale);

	/**
	 * Sets and gets the height of the element
	 * @param _height {Number} The new height
	 * @return {Number} The height of the element
	 */
	this.height = function(_height) {
		if(_height) {
			height = _height;
			this.option('to', {width : width, height : height});
		}
		return height;
	};

	/**
	 * Sets and gets the vanishing point
	 * @param _origin {Array} The new vanishing point
	 * @return {Array} The vanishing point
	 */
	this.origin = function(_origin) {
		if(_origin) {
			origin = _origin;
			this.option('origin', origin);
		}
		return origin;
	};

	/**
	 * Sets and gets the width of the element
	 * @param _width {Number} The new width
	 * @return {Number} The width of the element
	 */
	this.width = function(_width) {
		if(_width) {
			width = _width;
			this.option('to', {width : width, height : height});
		}
		return width;
	};

	/**
	 * Sets and gets the scale format
	 * @param _scale {String} The new scale
	 * @return {String} The scale of the element
	 */
	this.scale = function(_scale) {
		if(_scale) {
			scale = _scale;
			this.option('scale', scale);
		}
		return scale;
	};
};

Rampage.gui.effects.Size.SCALE_BOX = 'box';
Rampage.gui.effects.Size.SCALE_CONTENT = 'content';
Rampage.gui.effects.Size.SCALE_BOTH = 'both';