/**
 * @class {Rampage.gui.effects.DropEffect}
 * @extends {Rampage.gui.Effect}
 * Performs a JQueryUI drop effect
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param direction {String} The direction of the drop
 */
Rampage.gui.effects.DropEffect = function(direction) {
	this.className = 'Rampage.gui.effects.DropEffect';
	this.extends(Rampage.gui.Effect);

	this.type(Rampage.gui.Effect.TYPE_DROP);
	if(direction) this.option('direction', direction);

	/**
	 * Sets and gets the direction of the drop
	 * @param _direction {String} The new direction
	 * @return {String} The direction of the drop
	 */
	this.direction = function(_direction) {
		if(_direction) {
			direction = _direction;
			this.option('direction', direction);
		}
		return direction;
	};
};

Rampage.gui.effects.DropEffect.DIRECTION_UP = 'up';
Rampage.gui.effects.DropEffect.DIRECTION_DOWN = 'down';
Rampage.gui.effects.DropEffect.DIRECTION_LEFT = 'left';
Rampage.gui.effects.DropEffect.DIRECTION_RIGHT = 'right';