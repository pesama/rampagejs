/**
 * @class {Rampage.gui.effects.BounceEffect}
 * @extends {Rampage.gui.Effect}
 * Performs a JQueryUI bounce effect
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param distance {Number} The distance of the bounce
 * @param times {Number} The times to bounce
 */
Rampage.gui.effects.BounceEffect = function(distance, times) {
	this.className = 'Rampage.gui.effects.BounceEffect';
	this.extends(Rampage.gui.Effect);

	this.type(Rampage.gui.Effect.TYPE_BOUNCE);
	if(distance) this.option('distance', distance);
	if(times) this.option('times', times);

	/**
	 * Sets and gets the distance of the bounce
	 * @param _distance {Number} The new distance of the bounce
	 * @return {Number} The distance of the bounce
	 */
	this.distance = function(_distance) {
		if(_distance) {
			distance = _distance;
			this.option('distance', distance);
		}
		return distance;
	};

	/**
	 * Sets and gets the times to bounce
	 * @param _times {Number} The new times to bounce
	 * @return {Number} The times to bounce
	 */
	this.times = function(_times) {
		if(_times) {
			times = _times;
			this.option('times', times);
		}
		return times;
	};
};