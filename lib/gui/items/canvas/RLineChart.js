/**
 * @class {Rampage.gui.items.canvas.RLineChart}
 * @extends {Rampage.gui.items.RCanvas}
 * Represents an linear chart
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param values {Array} List of values for the chart
 * @param unitX {String} Unit name for x-axis
 * @param unitY {String} Unit name for y-axis
 * @param style {String} Style for the line (CSS color)
 */
Rampage.gui.items.canvas.RLineChart = function(values, unitX, unitY, style) {
	this.className = 'Rampage.gui.items.canvas.RLineChart';
	this.extends(Rampage.gui.items.RCanvas);

	/**
	 * @type Number The width for the chart
	 */
	var width = 0;
	
	/**
	 * @type Number The height for the chart
	 */
	var height = 0;

	/**
	 * @type Number Width of the line
	 */
	var lineWidth = 4;
	
	/**
	 * @type Number Line top margin
	 */
	var marginTop = 10;
	
	/**
	 * @type Number Line right margin
	 */
	var marginRight = 20;

	/**
	 * @type String Style of the axis
	 */
	var lineAxisStyle = '#222222';
	
	/**
	 * @type Number Width of axis lines
	 */
	var lineAxisWidth = 5;

	/**
	 * @type String Helper lines style
	 */
	var helperLineStyle = '#787878';
	
	/**
	 * @type Number Helper lines width
	 */
	var helperLineWidth = 1;

	/**
	 * @type Number Width of the labels
	 */
	var labelWidth = 50;
	
	/**
	 * @type Number Height of the labels
	 */
	var labelHeight = 25;

	/**
	 * @type Object Position ratio
	 */
	var positionRatio = {
		x : 0,
		y : 0,
	};

	/**
	 * @type Object Min and max ranges
	 */
	var range = {
		min : {
			x : false,
			y : false
		},
		max : {
			x : false,
			y : false
		}
	};

	/**
	 * Calculate the position of a given point
	 * @param point {Object} The point
	 * @return {Object} The point new coordinates
	 */
	function positionify(point) {

		// Save original points
		point.originalx = point.x;
		point.originaly = point.y;

		// Apply ranges
		point.x -= range.min.x;
		point.y -= range.min.y;

		// Apply relativity
		point.x *= positionRatio.x;
		point.y *= positionRatio.y;

		// Roundiiiiiiiiiing!
		point.x = Math.round(point.x);
		point.y = Math.round(point.y);

		// Invert y-axis
		point.y = height - point.y;

		// Apply label and axis margins
		point.x += labelWidth + lineAxisWidth;
		point.y -= labelHeight + lineAxisWidth - 2;

		// Fix top border for line cutting avoidance
		point.y += lineWidth;

		return point;
	}
	
	/**
	 * Initializes the chart
	 * @param v {Array} Array of values
	 * @param uX {String} unitX name
	 * @param uY {String} unitY name
	 * @param s {String} Style for the line
	 */
	this.init = function(v, uX, uY, s) {
		if(v) values = v;
		if(uX) unitX = uX;
		if(uY) unitY = uY;
		if(s) style = s;

		var bounds = this.bounds();
		width = bounds.width;
		height = bounds.height;

		this.width(width);
		this.height(height);


		for(var i = 0; i < values.length; i++) {
			var value = values[i];

			if(range.min.x === false || value.x < range.min.x) range.min.x = value.x;
			if(range.min.y === false || value.y < range.min.y) range.min.y = value.y;
			if(range.max.x === false || value.x > range.max.x) range.max.x = value.x;
			if(range.max.y === false || value.y > range.max.y) range.max.y = value.y;
		}

		positionRatio.x = (width - labelWidth - marginRight - lineAxisWidth) / (range.max.x - range.min.x);
		positionRatio.y = (height - labelHeight - marginTop - lineAxisWidth) / (range.max.y - range.min.y);

		for(var j = 0; j < values.length; j++) {
			positionify(values[j]);
		}
	};

	/**
	 * Returns the chart height
	 * @return {Number} The height of the chart
	 */
	this.chartHeight = function() {
		return height - labelHeight;
	};

	/**
	 * Paints the axis within given's context
	 * @param context {CanvasRenderingContext2d} The context to paint within
	 */
	this.paintAxis = function(context) {
		context.beginPath();

		var x1 = labelWidth;
		var y2 = height - labelHeight + lineAxisWidth / 2;
		context.moveTo(x1, 0);
		context.lineTo(x1, y2);
		context.lineTo(width, y2);
		context.strokeStyle = lineAxisStyle;
		context.lineWidth = lineAxisWidth;
		context.stroke();
	};

	/**
	 * Paints the lines of the chart
	 * @param context {CanvasRenderingContext2d} The context to paint within
	 */
	this.paintLines = function(context) {
		var currentX = 0;

		var stepX = (width - labelWidth) / 100;

		context.beginPath();
		for(var i = 1; i < 100; i++) {
			currentX = labelWidth + i*stepX;

			// Vertical lines
			if(i % 2 === 0) {
				context.moveTo(currentX, 0);
				context.lineTo(currentX, height - labelHeight);
			}
		}

		context.strokeStyle = '#dedede';
		context.lineWidth = 1;
		context.stroke();
	};
	
	/**
	 * Paints the helper lines of the chart
	 * @param context {CanvasRenderingContext2d} The context to paint within
	 */
	this.paintHelperLines = function(context) {
		context.beginPath();
		for(var i = 0; i < values.length; i++) {
			var position = values[i];

			this.dashedLine(context, labelWidth - lineAxisWidth + 3, position.x, position.y, position.y, 5);
			this.dashedLine(context, position.x, position.x, position.y, height - labelHeight + lineAxisWidth - 3, 5);
		}
		context.strokeStyle = helperLineStyle;
		context.lineWidth = helperLineWidth;
		context.stroke();
	};

	/**
	 * Paints the mnemonics of the chart
	 * @param context {CanvasRenderingContext2d} The context to paint within
	 */
	this.paintMnemonics = function(context) {

		var mnemonicsPainted = new Array();
		
		context.fillStyle = '#222222';

		var xPos = labelWidth - lineAxisWidth - 3;
		var yPos = height - labelHeight + lineAxisWidth + 3;

		context.beginPath();
		for(var i = 0; i < values.length; i++) {
			var position = values[i];
			context.moveTo(xPos, position.y);
			context.lineTo(labelWidth, position.y);
			context.moveTo(position.x, height - labelHeight);
			context.lineTo(position.x, yPos);

			var okX = true;
			var okY = true;

			for(var j = 0; j < mnemonicsPainted.length && (okX || okY); j++) {
				if(okX && Math.abs(position.x - mnemonicsPainted[j].x) < 15) {
					okX = false;
				}
				if(okY && Math.abs(position.y - mnemonicsPainted[j].y) < 15) {
					okY = false;
				}
			}
			var newPosition = {
				x : 0,
				y : 0,
			};
			if(okX) {
				context.textAlign = 'center';
				context.fillText(position.originalx + unitX, position.x, yPos + 8);
				newPosition.x = position.x;
			}
			if(okY) {
				context.textAlign = 'right';
				context.fillText(position.originaly + unitY, xPos - 1, position.y + 4);
				newPosition.y = position.y;
			}
			if(okX || okY) mnemonicsPainted.push(newPosition);
		}
		context.lineWidth 	= 1;
		context.strokeStyle = lineAxisStyle;
		context.stroke();
	};

	/**
	 * Paints the chart
	 * @param context {CanvasRenderingContext2d} The context to paint within
	 */
	this.paintChart = function(context) {
		context.beginPath(); 
		var initial = values[0];
		context.moveTo(initial.x, initial.y);
		for(var i = 1; i < values.length; i++) {
			var position = values[i];
			context.lineTo(position.x, position.y);
		}
		context.strokeStyle = style;
		context.lineWidth = 3;
		context.stroke();
	};

	/**
	 * Paints the canvas
	 * @param context {CanvasRenderingContext2d} The context to paint within
	 */
	this.paintCanvas = function(context) {
		this.flush();
		this.paintLines(context);

		this.paintHelperLines(context);

		this.paintChart(context);

		this.paintAxis(context);
		this.paintMnemonics(context);
	};

	/**
	 * Sets and gets the values
	 * @param vls {Array} The new set of values
	 * @return {Array} The current values
	 */
	this.values = function(vls) {
		if(vls) values = vls;
		return values;
	};
};