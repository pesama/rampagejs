/**
 * @class {Rampage.gui.effects.FoldEffect}
 * @extends {Rampage.gui.Effect}
 * Performs a JQueryUI fold effect
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param size {Number} The size to fold
 * @param horizFirst {Boolean} Whether the folding starts horizontally
 */
Rampage.gui.effects.FoldEffect = function(size, horizFirst) {
	this.className = 'Rampage.gui.effects.FoldEffect';
	this.extends(Rampage.gui.Effect);

	this.type(Rampage.gui.Effect.TYPE_FOLD);
	if(size) this.option('size', size);
	if(horizFirst) this.option('horizFirst', horizFirst);

	/**
	 * Sets and gets the size of the folding
	 * @param _size {Number} The new size
	 * @return {Number} The size of the folding
	 */
	this.size = function(_size) {
		if(_size) {
			size = _size;
			this.option('size', size);
		}
		return size;
	};

	/**
	 * Sets and gets the horizFirst flag
	 * @param _horizFirst {Boolean} The new value for the flag
	 * @return {Boolean} The value of the flag
	 */
	this.horizFirst = function(_horizFirst) {
		if(_horizFirst) {
			horizFirst = _horizFirst;
			this.option('horizFirst', horizFirst);
		}
		return horizFirst;
	};
};