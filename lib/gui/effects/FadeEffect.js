/**
 * @class {Rampage.gui.effects.FadeEffect}
 * @extends {Rampage.gui.Effect}
 * Performs a JQueryUI fade effect
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 */
Rampage.gui.effects.FadeEffect = function() {
	this.className = 'Rampage.gui.effects.FadeEffect';
	this.extends(Rampage.gui.Effect);

	this.type(Rampage.gui.Effect.TYPE_FADE);
};