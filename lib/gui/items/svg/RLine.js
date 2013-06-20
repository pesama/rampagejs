Rampage.gui.items.svg.RLine = function(startX, startY, endX, endY, style) {
	this.className = 'Rampage.gui.items.svg.RLine';
	this.extends(Rampage.gui.RItem);

	this.modelParam('x1', startX);
	this.modelParam('x2', endX);
	this.modelParam('y1', startY);
	this.modelParam('y2', endY);

	this.style(style);
};