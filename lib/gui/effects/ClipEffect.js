/**
 * @class {Rampage.gui.effects.ClipEffect}
 * @extends {Rampage.gui.Effect}
 * Performs a JQueryUI clip effect
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param direction {String} The direction of the clip
 */
Rampage.gui.effects.ClipEffect = function(direction) {
	this.className = 'Rampage.gui.effects.ClipEffect';
	this.extends(Rampage.gui.Effect);

	this.type(Rampage.gui.Effect.TYPE_CLIP);
	if(direction) this.option('direction', direction);

	/**
	 * Sets and gets the direction of the clip
	 * @param _direction {String} The new direction
	 * @return {String} The direction of the clip
	 */
	this.direction = function(_direction) {
		if(_direction) {
			direction = _direction;
			this.option('direction', direction);
		}
		return direction;
	};
};

Rampage.gui.effects.ClipEffect.DIRECTION_UP = 'up';
Rampage.gui.effects.ClipEffect.DIRECTION_DOWN = 'down';
Rampage.gui.effects.ClipEffect.DIRECTION_LEFT = 'left';
Rampage.gui.effects.ClipEffect.DIRECTION_RIGHT = 'right';
Rampage.gui.effects.ClipEffect.DIRECTION_VERTICAL = 'vertical';
Rampage.gui.effects.ClipEffect.DIRECTION_HORIZONTAL = 'horizontal';