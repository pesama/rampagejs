Rampage.gui.items.svg.composite.RLineChart = function(values, style) {
//	this.className = 'Rampage.gui.items.svg.composite.RLineChart';
	this.extends(Rampage.gui.items.RSVG);

	this.init = function() {
		var bounds = this.bounds();
		this.modelParam('width', bounds.width);
		this.modelParam('height', bounds.height);
		var currentLine = new Rampage.gui.items.svg.RPolyLine();

		for(var i = 0; i < values.length; i+=2) {
			var currentX = values[i];
			var currentY = values[i+1];
			currentLine.addPoint(currentX, currentY);
		}

		currentLine.stroke(style);
		this.add(currentLine);
	};
};