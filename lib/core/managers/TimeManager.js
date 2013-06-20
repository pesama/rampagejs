/**
 * @namespace Rampage.core.managers
 * @module
 * @class TimeManager
 * @extends RuleBasedManager
 * @desc Controls all time-related events, and evaluates time expressions to notify the appropriate listeners
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @property {String} TimeManager.CLK_REPLACE_EXPRESSION			- Expression for substituting with current CLK count
 * @property {String} TimeManager.MILLISECONDS_REPLACE_EXPRESSION	- Expression for substituting with current milliseconds
 */
Rampage.core.managers.TimeManager = function() {
	this.className = 'Rampage.core.managers.TimeManager';
	this.extends(Rampage.core.managers.RuleBasedManager);

	/**
	 * @type Number
	 * @desc Current clock tick count
	 * 
	 * @private
	 * @inner
	 * @memberOf TimeManager
	 */
	var clk = 0;

	/**
	 * @type Number
	 * @desc Frames per second
	 * 
	 * @private
	 * @inner
	 * @memberOf TimeManager
	 */
	var fps = 30;

	/**
	 * @type Boolean
	 * @desc Indicates whether it is working
	 * 
	 * @private
	 * @inner
	 * @memberOf TimeManager
	 */
	var running = false;

	/**
	 * @public
	 * @function TimeManager#clk
	 * @desc Returns the current clk's count
	 * @return {Number}
	 */
	this.clk = function() {
		return clk;
	};

	/**
	 * @public
	 * @function TimeManager#milliseconds
	 * @desc Returns the current milliseconds
	 * @return {Number}
	 */
	this.milliseconds = function() {
		return Math.round(clk * (1000 / fps));
	};

	/**
	 * @public
	 * @function TimeManager#pause
	 * @desc Pauses the execution of the TimeManager
	 */
	this.pause = function() {
		running = false;
	};

	/**
	 * @public
	 * @function TimeManager#play
	 * @desc Plays (or resumes) the execution of the TimeManager
	 */
	this.play = function() {
		running = true;
	};

	/**
	 * @public
	 * @function TimeManager#stop
	 * @desc Resets the status of the TimeManager
	 */
	this.stop = function() {
		this.pause();
		clk = 0;
	};

	/**
	 * @public
	 * @function TimeManager#tick
	 * @desc Tick function. Automatically loaded by TimelineThread. Updates the status
	 * of the clk, and verifies all the expressions of the triggers attached. It
	 * also fires the Events if needed
	 */
	this.tick = function() {
		if (!running)
			return;
		clk++;
		var triggers = this.triggers();
		for ( var trigger in triggers) {
			try {
				var regexp = eval(triggers[trigger].expression.split(
						Rampage.core.managers.TimeManager.CLK_REPLACE_EXPRESSION).join(this.clk()).split(
								Rampage.core.managers.TimeManager.MILLISECONDS_REPLACE_EXPRESSION).join(
						this.milliseconds()));
				if (regexp) {
					var event = new Rampage.core.events.TimeEvent(this.clk(), this.milliseconds(), triggers[trigger].expression);
					triggers[trigger].handler(event);
				}
			} catch (e) {
				Rampage.log(Rampage.LOG_WARNING, this.className, Rampage
						.message('TIMELINE_TRIGGER_EXPRESSION_FAIL', [
								trigger.expression, e ]));
			}
		}
	};

	/**
	 * @public
	 * @function TimeManager#start
	 * @desc Starts the execution of the time manager
	 */
	this.start = function() {
		this.parent.start();

		var self = this;
		clk = 0;
		Rampage.log(Rampage.LOG_DEBUG, this.className, Rampage
				.message('TIMELINE_RUN'));
		setInterval(function() {
			self.tick();
		}, 1000 / fps);
		this.play();
	};
};
Rampage.core.managers.TimeManager.CLK_REPLACE_EXPRESSION = '#CLK#';
Rampage.core.managers.TimeManager.MILLISECONDS_REPLACE_EXPRESSION = '#MS#';