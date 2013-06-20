/**
 * @class {Rampage.gui.effects.HighlightEffect}
 * @extends {Rampage.gui.Effect}
 * Performs a JQueryUI Highlight effect with specified color
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param color {String} The color of the highlight
 */
Rampage.gui.effects.HighlightEffect = function(color) {
	this.className = 'Rampage.gui.effects.HighlightEffect';
	this.extends(Rampage.gui.Effect);

	this.type(Rampage.gui.Effect.TYPE_HIGHLIGHT);
	if(color) this.option('color', color);

	/**
	 * Sets and gets the color
	 * @param _color {String} The new color
	 * @return {String} The color
	 */
	this.color = function(_color) {
		if(_color) {
			color = _color;
			this.option('color', color);
		}
		return color;
	};
};