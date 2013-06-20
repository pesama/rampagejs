/**
 * 
 * @class Rampage.gui.Graphics
 * Controls all graphics management, and deals with every screen painting / updating process, transforming business content into visual content
 * 
 * @author Pelayo Sanchez Margareto
 * @version 2.0.1-ALPHA
 * 
 */
Rampage.gui.Graphics = function() {
	this.className = 'Rampage.gui.Graphics';

	/**
	 * @type Object Allocates native bindings 
	 * @enum {String} Different binding prossibilities
	 */
	var binds = {
		TEXT : 'text',
	};

	/**
	 * @type JQueryDOMElement The context for the canvas
	 */
	var context = null;

	/**
	 * @type Array The array of RItems appended
	 */
	var items = [];
	
	/**
	 * Creates a DOM item with an element given, using a graphics class (which may be different than this)
	 * @param item {Rampage.gui.RItem} The item to paint
	 * @param graphics {Rampage.gui.Graphics} The graphics to render within
	 * @return {jQueryDOMElement}
	 */
	function createDOMItem(item, graphics) {
		var current = item;
		var domConfig = null;
		while(current && !domConfig) {
			domConfig = Rampage.gui.ViewProvider.getView(current.className);
			if(!domConfig) current = current.parent;
		}
		if(!domConfig) {
			Rampage.log(Rampage.LOG_ERROR, this.className, Rampage.message('GRAPHICS_UNEXISTING_DOM', [ item.className ]));
		}
		
		var dom = Rampage.DOM(domConfig);

		if(item.update) item.update();

		if(dom) {
			item.dom(dom);

			var domID = item.id();
			var domClassNames = item.classNames();

			dom.attr('id', domID);

			for(var i = 0; i < domClassNames.length; i++) {
				dom.addClass(domClassNames[i]);
			}

			var bounds = item.bounds();
			if(bounds) {
				if(bounds['position']) {
					dom.css('position', bounds['position']);
					delete bounds['position'];
				}
				else if(bounds.top || bounds.left || bounds.bottom || bounds.right) {
					dom.css('position', 'absolute');
				}
				for(var bound in bounds) {
					if(bound === 'className' || !bounds.hasOwnProperty(bound)) continue;
					dom.css(bound, bounds[bound]);
				}
			}

			var style = item.style();
			for(var child in style) {
				dom.css(child, style[child]);
			}

			var dataBind = new Object();
			dataBind.attr = new Object();

			var model = item.model();
			var bind = null;
			for(bind in model) {
				var useBind = true;
				// Individually proceed binds
				switch(bind) {
				case binds.TEXT:
					if(!item.mnemonic) break;
					var mnemonic = item.mnemonic();
					if(mnemonic) {
						var characters = mnemonic.realCharacters();
						var mnemonicChar = characters[0];
						var text = model[bind]();
						var index = text.indexOf(mnemonicChar);
						if(index !== -1) {
							var newText = text.substring(0, index);
							newText += '<span class="underlined">';
							newText += text.substring(index, index+1);
							newText += '</span>';
							newText += text.substring(index+1, text.length);
							dom.html(newText);
							useBind = false;
						}
					}
					break;
				}
				if(useBind) {
					dataBind[bind] = 'models[\'' + domID + '\'][\'' + bind + '\']';
					dataBind.attr[bind] = dataBind[bind];
				}
			}

			var viewModel = Rampage.Core.displayManager().viewModel();
			viewModel.items[domID] = item;
			viewModel.models[domID] = model;
			
			bind = item.bind();
			if(bind) {
				dataBind[bind] = 'items[\'' + domID + '\']';
			}
			
			var parsed_dataBind = JSON.stringify(dataBind).split('"').join('');
			dom.attr('data-bind', parsed_dataBind);
		}
		else 
			dom = $([]);

		var children = item.items();
		var ok = dom.length;
		for(var i = 0; i < children.length; i++) {
			var child = children[i];
			if(ok) {
				var childGraphics = new Rampage.gui.Graphics(graphics);
				childGraphics.context(dom);
				child.paint(childGraphics);
				childGraphics.render();
			}
			else {
				var childDOM = createDOMItem(child, graphics);
				dom.push(childDOM[0]);
			}
		}

		return dom;
	}

	/**
	 * Empties context's rendered items
	 */
	this.empty = function() {
		if(context) context.empty();
	};

	/**
	 * Include an element into the stack
	 * @param item {Rampage.gui.RItem}
	 */
	this.register = function(item) {
		items.push(item);
	};

	/**
	 * Renders the generated content within its container (the context)
	 */
	this.render = function() {
		while(items.length) {
			var item = items.pop();
			var dom = createDOMItem(item, this);
			context.append(dom);
			context.tooltip();
		}
	};

	/**
	 * Sets and gets the context
	 * @var ctxt {jQueryDOMElement} The new context
	 * @return {jQueryDOMElement}
	 */
	this.context = function(ctxt) {
		if(ctxt) context = ctxt;
		return context;
	};
};