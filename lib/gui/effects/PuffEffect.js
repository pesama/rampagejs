/**
 * @class {Rampage.gui.effects.PuffEffect}
 * @extends {Rampage.gui.Effect}
 * Performs a JQueryUI Puff effect
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param percent {Number} The percentage to puff
 */
Rampage.gui.effects.PuffEffect = function(percent) {
	this.className = 'Rampage.gui.effects.PuffEffect';
	this.extends(Rampage.gui.Effect);

	this.type(Rampage.gui.Effect.TYPE_PUFF);
	if(percent) this.option('percent', percent);

	/**
	 * Sets and gets the percentage
	 * @param _percent {Number} The new percentage of the puff
	 * @return {Number} The percentage of the puff
	 */
	this.percent = function(_percent) {
		if(_percent) {
			percent = _percent;
			this.option('percent', percent);
		}
		return percent;
	};
};