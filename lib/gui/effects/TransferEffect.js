
/**
 * @class {Rampage.gui.effects.TransferEffect}
 * @extends {Rampage.gui.Effect}
 * Performs a JQueryUI Transfer effect from one element to another
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param destiny {Rampage.gui.RItem} Destiny item for the transfer
 * @param applyClassName {String} ClassName to apply
 */
Rampage.gui.effects.TransferEffect = function(destiny, applyClassName) {
	this.className = 'Rampage.gui.effects.TransferEffect';
	this.extends(Rampage.gui.Effect);

	this.type(Rampage.gui.Effect.TYPE_TRANSFER);
	if(destiny === undefined) {
		Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('EFFECT_REQUIRED_PARAMETER', [ 'destiny' ]));
	}
	this.option('to', destiny.dom());
	if(applyClassName) this.option('className', applyClassName);

	/**
	 * Sets and gets the destiny element for the effect
	 * @param _destiny {Rampage.gui.RItem} The destiny item
	 * @return {Rampage.gui.RItem} The destiny item
	 */
	this.destiny = function(_destiny) {
		if(_destiny) {
			destiny = _destiny;
			this.option('to', destiny.dom());
		}
		return destiny;
	};

	/**
	 * Sets and gets the className to apply
	 * @param _applyClassName {String} The className to apply
	 * @return {String} The className to apply
	 */
	this.applyClassName = function(_applyClassName) {
		if(_applyClassName) {
			applyClassName = _applyClassName;
			this.option('className', applyClassName);
		}
		return applyClassName;
	};
};