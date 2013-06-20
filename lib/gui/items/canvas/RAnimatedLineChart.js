/**
 * @class {Rampage.gui.items.canvas.RAnimatedLineChart}
 * @extends {Rampage.gui.items.canvas.RLineChart}
 * Represents an animated linear chart
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param values {Array} List of values for the chart
 * @param uX {String} Unit name for x-axis
 * @param uY {String} Unit name for y-axis
 * @param style {String} Style for the line (CSS color)
 */
Rampage.gui.items.canvas.RAnimatedLineChart = function(values, uX, uY, style) {
	this.className = 'Rampage.gui.items.canvas.RAnimatedLineChart';
	this.extends(Rampage.gui.items.canvas.RLineChart);

	/**
	 * @type Array List of original values (not-animated)
	 */
	var originalValues = new Array();

	/**
	 * Initializes the chart with the animation on the starting position
	 */
	this.init = function() {
		this.parent.init(values, uX, uY, style);

		for(var i = 0; i < values.length; i++) {
			var position = values[i];
			
			var originalPosition = {
				x : position.x,
				y : position.y,
			};
			originalValues.push(originalPosition);
		}
	};

	/**
	 * Sets up the initial position
	 */
	this.initialPosition = function() {
		for(var i = 0; i < values.length; i++) {
			var position = values[i];
			
			var originalPosition = {
				x : position.x,
				y : position.y,
			};
			originalValues.push(originalPosition);
			var height = this.chartHeight();
			position.y = height;
		}
	};

	/**
	 * Paints the canvas within the given context
	 * @param context {CanvasRenderingContext2d} The context
	 */
	this.paintCanvas = function(context) {
		var timeManager = Rampage.Core.timeManager();
		var triggerName = this.id();
		var triggerExpression = '1';

		this.initialPosition();

		var that = this;
		var ok = true;
		timeManager.removeTrigger(triggerName);
		timeManager.appendTrigger(triggerName, triggerExpression, function() {
			ok = that.doPaintCanvas(context);
			if(!ok) timeManager.removeTrigger(triggerName);
		});
	};

	/**
	 * Starts the painting process
	 * @param context {CanvasRenderingContext2d} The context to paint within
	 */
	this.doPaintCanvas = function(context) {
		var ok = false;
		for(var i = 0; i < values.length; i++) {
			var currentPosition = values[i];
			var originalPosition = originalValues[i];

			var diff =  currentPosition.y - originalPosition.y;
			if(diff > 3) {
				currentPosition.y -= 3;
				ok = true;
			}
			else {
				currentPosition.y = originalPosition.y;
			}
		}

		this.parent.paintCanvas(context);

		return ok;
	};
};