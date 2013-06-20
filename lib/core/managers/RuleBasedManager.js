/**
 * @namespace Rampage.core.managers
 * @class RuleBasedManager
 * @extends Manager
 * @desc A Rule based manager extends the functionality of a plain manager by attaching
 * complex trigger dispatching
 *
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 */
Rampage.core.managers.RuleBasedManager = function() {
	this.className = 'Rampage.core.managers.RuleBasedManager';
	this.extends(Rampage.core.Manager);

	/**
	 * @type Factory
	 * @desc Stores the trigger factory
	 *
	 * @private
	 * @inner
	 * @memberOf RuleBasedManager
	 */
	var triggers = null;

	/**
	 * @public
	 * @function RuleBasedManager#appendTrigger
	 * @desc Appends a trigger to be automatically fired when the expression matches
	 * @param name {String} The name of the trigger to dispatch
	 * @param regexp {String} Regular expression to be evaluated
	 * @param handler {Function} Proceeds a function if the expression returns true
	 */
	this.appendTrigger = function(name, regexp, handler) {
		var trigger = {
			expression : regexp,
			handler : handler,
		};

		triggers.addTrigger(name, trigger);
	};

	/**
	 * @public
	 * @function RuleBasedManager#removeTrigger
	 * @desc Removes a trigger from the storage to prevent it from being dispatched.
	 * @param name {String} The name of the trigger to remove
	 */
	this.removeTrigger = function(name) {
		triggers.removeTrigger(name);
	};

	/**
	 * @public
	 * @function RuleBasedManager#start
	 * @desc Starts the Manager
	 */
	this.start = function() {
		triggers = new Rampage.util.Factory('Trigger');
	};

	/**
	 * @public
	 * @function RuleBasedManager#triggers
	 * @desc Returns the trigger factory
	 * @return {Object}
	 */
	this.triggers = function() {
		return triggers.getFactory();
	};
};