/**
 * @class {Rampage.gui.effects.BlindEffect}
 * @extends {Rampage.gui.Effect}
 * Performs a JQueryUI blind effect
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param direction {String} The direction of the blind
 */
Rampage.gui.effects.BlindEffect = function(direction) {
	this.className = 'Rampage.gui.effects.BlindEffect';
	this.extends(Rampage.gui.Effect);

	this.type(Rampage.gui.Effect.TYPE_BLIND);
	if(direction) this.option('direction', direction);

	/**
	 * Sets and gets the direction of the blind
	 */
	this.direction = function(_direction) {
		if(_direction) {
			direction = _direction;
			this.option('direction', direction);
		}
		return direction;
	};
};


Rampage.gui.effects.BlindEffect.DIRECTION_UP = 'up';
Rampage.gui.effects.BlindEffect.DIRECTION_DOWN = 'down';
Rampage.gui.effects.BlindEffect.DIRECTION_LEFT = 'left';
Rampage.gui.effects.BlindEffect.DIRECTION_RIGHT = 'right';
Rampage.gui.effects.BlindEffect.DIRECTION_VERTICAL = 'vertical';
Rampage.gui.effects.BlindEffect.DIRECTION_HORIZONTAL = 'horizontal';