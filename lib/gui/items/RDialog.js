/**
 * @class {Rampage.gui.items.RDialog}
 * @extends {Rampage.gui.items.RPanel}
 * Represents a dialog that emerges on the screen
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 * @param parent {Rampage.gui.RItem} The parent element
 * @param title {String} The title of the dialog
 * @param content {Rampage.gui.items.RPanel} The content pane
 */
Rampage.gui.items.RDialog = function(parent, title, content) {
	this.className = 'Rampage.gui.items.RDialog';
	this.extends(Rampage.gui.items.RPanel);

	/**
	 * Initializes the dialog
	 */
	function init() {
		var bounds = new Object();
		this.bounds(bounds);
		if(content === undefined) width = 300;
		else width = content.bounds().width;

		if(content === undefined) height = 200;
		else height = content.bounds().height;

		this.width(width);
		this.height(height);

		if(parent) this.parent(parent);
		if(title) this.title(title);
		if(content) this.contentPane(content);

		var that = this;
		function proceedAction(action, event, ui) {
			that.dialogAction(action, event, ui);
		}
		
		this.option('beforeClose', function(event, ui) {
			proceedAction(Rampage.gui.items.RDialog.ACTION_COMMAND_BEFORE_CLOSE, event, ui);
		});

		this.option('close', function(event, ui) {
			proceedAction(Rampage.gui.items.RDialog.ACTION_COMMAND_CLOSE, event, ui);
		});
		
		this.option('drag', function(event, ui) {
			proceedAction(Rampage.gui.items.RDialog.ACTION_COMMAND_DRAG, event, ui);
		});
		
		this.option('dragStart', function(event, ui) {
			proceedAction(Rampage.gui.items.RDialog.ACTION_COMMAND_DRAG_START, event, ui);
		});
		
		this.option('dragStop', function(event, ui) {
			proceedAction(Rampage.gui.items.RDialog.ACTION_COMMAND_DRAG_STOP, event, ui);
		});
		
		this.option('focus', function(event, ui) {
			proceedAction(Rampage.gui.items.RDialog.ACTION_COMMAND_FOCUS, event, ui);
		});

		this.option('open', function(event, ui) {
			proceedAction(Rampage.gui.items.RDialog.ACTION_COMMAND_OPEN, event, ui);
		});
		
		this.option('resize', function(event, ui) {
			proceedAction(Rampage.gui.items.RDialog.ACTION_COMMAND_RESIZE, event, ui);
		});
		
		this.option('resizeStart', function(event, ui) {
			proceedAction(Rampage.gui.items.RDialog.ACTION_COMMAND_RESIZE_START, event, ui);
		});
		
		this.option('resizeStop', function(event, ui) {
			proceedAction(Rampage.gui.items.RDialog.ACTION_COMMAND_RESIZE_STOP, event, ui);
		});
	}

	/**
	 * Initializes the context
	 * @override
	 */
	this.initContext = function() {
		this.dom().dialog(this.options());
	};

	/**
	 * Opens the dialog
	 */
	this.openDialog = function() {
		this.dom().open();
	};

	/**
	 * Closes the dialog
	 */
	this.closeDialog = function() {
		this.dom().close();
	};

	/**
	 * Sets and gets the automatic open flag
	 * @param _auto {Boolean} The new value for the auto flag
	 * @return {Boolean} The value of the flag
	 */
	this.auto = function(_auto) {
		if(_auto !== undefined) this.option('autoOpen', _auto);
		return this.option('autoOpen');
	};

	/**
	 * Sets and gets the dialog content pane
	 * @param _content {Rampage.gui.items.RPanel} the new content pane
	 * @return {Rampage.gui.items.RPanel} The content pane
	 */
	this.content = function(_content) {
		if(_content !== undefined) this.contentPane(content);
		return this.contentPane();
	};

	/**
	 * Sets and gets the draggable flag
	 * @param _draggable {Boolean} The new value for the flag
	 * @return {Boolean} The value of the flag
	 */
	this.draggable = function(_draggable) {
		if(_draggable !== undefined) this.option('draggable', _draggable);
		return this.option('draggable');
	};

	/**
	 * Sets and gets the modal flag
	 * @param _modal {Boolean} The new value for the flag
	 * @return {Boolean} The value of the flag
	 */
	this.modal = function(_modal) {
		if(_modal !== undefined) this.option('modal', _modal);
		return this.option('modal');
	};

	/**
	 * Sets and gets the resizable flag
	 * @param _resizable {Boolean} The new value for the flag
	 * @return {Boolean} The value of the flag
	 */
	this.resizable = function(_resizable) {
		if(_resizable !== undefined) this.option('resizable', _resizable);
		return this.option('resizable');
	};

	/**
	 * Sets and gets the width of the dialog
	 * @param _width {Number} The new width
	 * @return {Number} The current width
	 */
	this.width = function(_width) {
		if(_width !== undefined) {
			this.option('width', _width);
			this.bounds().width = width;
		}
		return this.option('width');
	};

	/**
	 * Sets and gets the height of the dialog
	 * @param _height {Number} The new height
	 * @return {Number} The current height
	 */
	this.height = function(_height) {
		if(_height !== undefined) {
			this.option('height', _height);
			this.bounds().height = height;
		}
		return this.option('height');
	};

	/**
	 * Sets and gets the parent item
	 * @param _parent {Rampage.gui.RItem} The new parent
	 * @return {Rampage.gui.RItem} The current parent
	 */
	this.parent = function(_parent) {
		if(_parent) {
			parent = _parent;
			parent.add(this);
			this.option('appendTo', '#' + parent.id());
		}
		return parent;
	};

	/**
	 * Sets and gets the title of the dialog
	 * @param _title {String} The new title for the dialog
	 * @return {String} The current title
	 */
	this.title = function(_title) {
		if(_title !== undefined) this.option('title', _title);
		return this.option('title');
	};

	/**
	 * @override
	 * @param action {String} The type of the action
	 * @param event {Event} The native event dispatched
	 * @param ui {Object} The UI context
	 */
	this.proceedAction = function(action, event, ui) {
		var actionEvent = new Rampage.core.events.ActionEvent(event, this, action);
		this.parent.proceedAction(actionEvent);
	};

	init.call(this);
};

/* 
 * Action Commands
 */

Rampage.gui.items.RDialog.ACTION_COMMAND_BEFORE_CLOSE = 'dialogBeforeClose';
Rampage.gui.items.RDialog.ACTION_COMMAND_CLOSE = 'dialogClose';
Rampage.gui.items.RDialog.ACTION_COMMAND_DRAG = 'dialogDrag';
Rampage.gui.items.RDialog.ACTION_COMMAND_DRAG_START = 'dialogDragStart';
Rampage.gui.items.RDialog.ACTION_COMMAND_DRAG_STOP = 'dialogDragStop';
Rampage.gui.items.RDialog.ACTION_COMMAND_FOCUS = 'dialogFocus';
Rampage.gui.items.RDialog.ACTION_COMMAND_OPEN = 'dialogBeforeOpen';
Rampage.gui.items.RDialog.ACTION_COMMAND_RESIZE = 'dialogResize';
Rampage.gui.items.RDialog.ACTION_COMMAND_RESIZE_START = 'dialogResizeStart';
Rampage.gui.items.RDialog.ACTION_COMMAND_RESIZE_STOP = 'dialogResizeStop';