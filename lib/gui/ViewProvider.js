/**
 * @type Object The storage for the view element graphical representation
 */
Rampage.gui.ViewProvider = {
	className : 'Rampage.gui.ViewProvider',
	views : {
		'Rampage.gui.items.RPanel' : {
			'div::.Rampage_gui_items_RPanel' : {
			},
		},
		'Rampage.gui.items.RAjaxPane' : {
			'div::.Rampage_gui_items_RPane' : {
			},
		},
		'Rampage.gui.items.RDialog' : {
			'div::.Rampage_gui_items_RDialog' : {
			},
		},
		'Rampage.gui.items.RAccordion' : {
			'div::.Rampage_gui_items_RAccordion' : {
			},
		},
		'Rampage.gui.items.RTabbedPane' : {
			'div::.Rampage_gui_items_RTabbedPane' : {
			},
		},
		'Rampage.gui.items.RTabHeader' : {
			'ul::.Rampage_gui_items_RTabHeader' : {
			},
		},
		'Rampage.gui.items.RTabHeaderItem' : {
			'li::.Rampage_gui_items_RTabHeaderItem' : {
				
			},
		},
		'Rampage.gui.items.RList' : {
			'div::.Rampage_gui_items_RList' : {
			},
		},
		'Rampage.gui.items.RButton' : {
			'button::.Rampage_gui_items_RButton' : {
			},
		},
		'Rampage.gui.items.RButtonSet' : {
			'div::.Rampage_gui_items_RButtonSet' : {
			},
		},
		'Rampage.gui.items.RLabel' : {
			'div::.Rampage_gui_items_RLabel' : {

			},
		},
		'Rampage.gui.items.RMenu' : {
			'ul::.Rampage_gui_items_RMenu' : {

			},
		},
		'Rampage.gui.items.RMenuItem' : {
			'li::.Rampage_gui_items_RMenuItem' : {

			},
		},
		'Rampage.gui.items.RLink' : {
			'a::.Rampage_gui_items_RLink' : {

			},
		},
		'Rampage.gui.items.RImage' : {
			'img::.Rampage_gui_items_RImage' : {
				
			},
		},
		'Rampage.gui.items.RTextInput' : {
			'input::.Rampage_gui_items_RTextInput' : {
				type : 'text'
			},
		},
		'Rampage.gui.items.RDateInput' : {
			'input::.Rampage_gui_items_RDateInput' : {
				type : 'text'
			},
		},
		'Rampage.gui.items.RPasswordInput' : {
			'input::.Rampage_gui_items_RPasswordInput' : {
				type : 'password'
			},
		},
		'Rampage.gui.items.RRadioOption' : {
			'input::.Rampage_gui_items_RRadioOption' : {
				type : 'radio'
			},
		},
		'Rampage.gui.items.RCheckbox' : {
			'input::.Rampage_gui_items_RCheckbox' : {
				type : 'checkbox'
			},
		},
		'Rampage.gui.items.RInputLabel' : {
			'label::.Rampage_gui_items_RInputLabel' : {

			},
		},
		'Rampage.gui.items.RProgressBar' : {
			'div::.Rampage_gui_items_RProgressBar' : {

			},
		},
		'Rampage.gui.items.RSlider' : {
			'div::Rampage_gui_items_RSlider' : {

			},
		},
		'Rampage.gui.items.RCanvas' : {
			'canvas::.Rampage_gui_items_RCanvas' : {

			},
		},
		'Rampage.gui.items.RSVG' : {
			'svg::.Rampage_gui_items_RSVG' : {
				xmlns : 'http://www.w3.org/2000/svg',
				version : '1.1'
			},
		},
		'Rampage.gui.items.svg.RLine' : {
			'line::.Rampage_gui_items_svg_RLine' : {

			},
		},
		'Rampage.gui.items.svg.RPolyLine' : {
			'polyline::.Rampage_gui_items_svg_RPolyLine' : {
				
			},
		},
	},
	
	addView : function(className, content) {
		if(this[className] !== undefined) {
			Rampage.log(Rampage.LOG_WARNING, this.className, Rampage.message('OVERRIDE_EXISTING_VIEW', [ className ]));
		};
		this.views[className] = content;
	},

	/**
	 * Returns the view for the class name given
	 * @param className {String} The class name for the RItem
	 * @return {Object}
	 */
	getView : function(className) {
		if(this.views[className]) return this.views[className];
		return null;
	}
};