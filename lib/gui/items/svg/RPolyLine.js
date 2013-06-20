Rampage.gui.items.svg.RPolyLine = function() {
	this.className = 'Rampage.gui.items.svg.RPolyLine';
	this.extends(Rampage.gui.RItem);

	this.addPoint = function(x, y) {
		var points = this.points();
		var arrPoints = points ? points.split(' ') : [];
		var currPos = x + ',' + y;
		arrPoints.push(currPos);
		this.points(arrPoints.join(' '));
	};

	this.points = function(pnt) {
		if(pnt) this.modelParam('points', pnt);
		return this.modelParam('points')
	};

	this.fill = function(style) {
		if(style) this.modelParam('fill', style);
		return this.modelParam('fill');
	}

	this.stroke = function(style) {
		if(style) this.modelParam('stroke', style);
		return this.modelParam('stroke');
	};
};