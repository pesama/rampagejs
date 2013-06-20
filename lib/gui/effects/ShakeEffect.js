/**
 * @class {Rampage.gui.effects.ShakeEffect}
 * @extends {Rampage.gui.Effect}
 * Performs a JQueryUI shake effect
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param direction {String} The direction of the shake
 * @param distance {Number} The distance to move
 * @param times {Number} The times to shake
 */
Rampage.gui.effects.ShakeEffect = function(direction, distance, times) {
	this.className = 'Rampage.gui.effects.ShakeEffect';
	this.extends(Rampage.gui.Effect);

	this.type(Rampage.gui.Effect.TYPE_SHAKE);
	if(direction) this.option('direction', direction);
	if(times) this.option('times', times);
	if(distance) this.option('distance', distance);

	/**
	 * Sets and gets the direction of the shake
	 * @param _direction {String} The new direction
	 * @return {String} The direction of the shake
	 */
	this.direction = function(_direction) {
		if(_direction) {
			direction = _direction;
			this.option('direction', direction);
		}
		return direction;
	};

	/**
	 * Sets and gets the times of the shake
	 * @param _times {Number} The new times
	 * @return {Number} The times of the shake
	 */
	this.times = function(_times) {
		if(_times) {
			times = _times;
			this.option('times', times);
		}
		return times;
	};

	/**
	 * Sets and gets the distance for the shake
	 * @param _distance {Number} The new distance
	 * @return {Number} The distance of the shake
	 */
	this.distance = function(_distance) {
		if(_distance) {
			distance = _distance;
			this.option('distance', distance);
		}
		return distance;
	};
};

Rampage.gui.effects.ShakeEffect.DIRECTION_UP = 'up';
Rampage.gui.effects.ShakeEffect.DIRECTION_DOWN = 'down';
Rampage.gui.effects.ShakeEffect.DIRECTION_LEFT = 'left';
Rampage.gui.effects.ShakeEffect.DIRECTION_RIGHT = 'right';