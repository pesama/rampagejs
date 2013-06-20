/**
 * @class {Rampage.gui.effects.SlideEffect}
 * @extends {Rampage.gui.Effect}
 * Performs a JQueryUI slide effect in the specified direction
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param direction {String} The direction of the movement
 * @param distance {Number} The distance for the movement
 */
Rampage.gui.effects.SlideEffect = function(direction, distance) {
	this.className = 'Rampage.gui.effects.SlideEffect';
	this.extends(Rampage.gui.Effect);

	this.type(Rampage.gui.Effect.TYPE_SLIDE);
	if(direction) this.option('direction', direction);
	if(distance) this.option('distance', distance);

	/**
	 * Sets and gets the direction of the slide
	 * @param _direction {String} The new direction for the slide
	 * @return {String} The direction for the slide
	 */
	this.direction = function(_direction) {
		if(_direction) {
			direction = _direction;
			this.option('direction', direction);
		}
		return direction;
	};

	/**
	 * Sets and gets the distance for the slide
	 * @param _distance {Number} The distance for the slide
	 * @return {Number} The current distance
	 */
	this.distance = function(_distance) {
		if(_distance) {
			distance = _distance;
			this.option('distance', distance);
		}
		return distance;
	};
};

Rampage.gui.effects.SlideEffect.DIRECTION_UP = 'up';
Rampage.gui.effects.SlideEffect.DIRECTION_DOWN = 'down';
Rampage.gui.effects.SlideEffect.DIRECTION_LEFT = 'left';
Rampage.gui.effects.SlideEffect.DIRECTION_RIGHT = 'right';