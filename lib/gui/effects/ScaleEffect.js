/**
 * @class {Rampage.gui.effects.ScaleEffect}
 * @extends {Rampage.gui.Effect}
 * Performs a JQueryUI Scale effect
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param percent {Number} The percentage of the scale
 * @param direction {String} The direction of the scale
 * @param origin {Array} The vanishing point
 * @param scale {String} The type of scale
 */
Rampage.gui.effects.ScaleEffect = function(percent, direction, origin, scale) {
	this.className = 'Rampage.gui.effects.ScaleEffect';
	this.extends(Rampage.gui.Effect);

	this.type(Rampage.gui.Effect.TYPE_SCALE);
	if(percent === undefined) {
		Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('EFFECT_REQUIRED_PARAMETER', [ 'percent' ]));
	}
	this.option('percent', percent);
	if(direction) this.option('direction', direction);
	if(origin) this.option('origin', origin);
	if(scale) this.option('scale', scale);

	/**
	 * Sets and gets the direction of the scale
	 * @param _direction {String} The new direction
	 * @return {String} The direction of the scale
	 */
	this.direction = function(_direction) {
		if(_direction) {
			direction = _direction;
			this.option('direction', direction);
		}
		return direction;
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
	 * Sets and gets the percentage of the scale
	 * @param _percent {Number} The new percentage
	 */
	this.percent = function(_percent) {
		if(_percent) {
			percent = _percent;
			this.option('percent', percent);
		}
		return percent;
	};

	/**
	 * Sets and gets the scale of the element
	 * @param _scale {String} The new scale for the element
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

Rampage.gui.effects.ScaleEffect.DIRECTION_BOTH = 'both';
Rampage.gui.effects.ScaleEffect.DIRECTION_VERTICAL = 'vertical';
Rampage.gui.effects.ScaleEffect.DIRECTION_HORIZONTAL = 'horizontal';

Rampage.gui.effects.ScaleEffect.SCALE_BOX = 'box';
Rampage.gui.effects.ScaleEffect.SCALE_CONTENT = 'content';
Rampage.gui.effects.ScaleEffect.SCALE_BOTH = 'both';