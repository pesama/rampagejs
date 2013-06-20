/**
 * @class {Rampage.gui.effects.ExplodeEffect}
 * @extends {Rampage.gui.Effect}
 * Performs a JQueryUI explode effect
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param pieces {Number} The number of pieces
 */
Rampage.gui.effects.ExplodeEffect = function(pieces) {
	this.className = 'Rampage.gui.effects.ExplodeEffect';
	this.extends(Rampage.gui.Effect);

	this.type(Rampage.gui.Effect.TYPE_EXPLODE);
	if(pieces) this.option('pieces', pieces);

	/**
	 * Sets and gets the pieces number
	 * @param _pieces {Number} The new value for the pieces
	 * @return {Number} The pieces number
	 */
	this.pieces = function(_pieces) {
		if(_pieces) {
			pieces = _pieces;
			this.option('pieces', pieces);
		}
		return pieces;
	};
};