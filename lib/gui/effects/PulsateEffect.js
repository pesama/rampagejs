/**
 * @class {Rampage.gui.effects.PulsateEffect}
 * @extends {Rampage.gui.Effect}
 * Performs a JQueryUI pulsate effect
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param times {Number} The times to pulsate
 */
Rampage.gui.effects.PulsateEffect = function(times) {
	this.className = 'Rampage.gui.effects.PulsateEffect';
	this.extends(Rampage.gui.Effect);

	this.type(Rampage.gui.Effect.TYPE_PULSATE);
	if(times) this.option('times', times);

	/**
	 * Sets and gets the times to pulsate
	 * @param _times {Number} The new times
	 * @return {Number} The times to pulsate
	 */
	this.times = function(_times) {
		if(_times) {
			times = _times;
			this.option('times', times);
		}
		return times;
	};
};