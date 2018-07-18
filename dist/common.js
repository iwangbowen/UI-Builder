require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({52:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _inputs = require('./inputs/inputs');

var _jsoup = require('./util/jsoup');

var _download = require('./util/download');

var _fullScreen = require('./util/fullScreen');

var _common = require('./components/common');

var _htmlGenerator = require('./util/htmlGenerator');

var _htmlGenerator2 = _interopRequireDefault(_htmlGenerator);

var _calendar = require('./util/calendar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	var cache = {};

	this.tmpl = function tmpl(str, data) {
		// Figure out if we're getting a template, or if we need to
		// load the template - and be sure to cache the result.
		var fn = /^[-a-zA-Z0-9]+$/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) :

		// Generate a reusable function that will serve as a template
		// generator (and which will be cached).
		new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" +

		// Introduce the data as local variables using with(){}
		"with(obj){p.push('" +

		// Convert the template into pure JavaScript
		str.replace(/[\r\t\n]/g, " ").split("{%").join("\t").replace(/((^|%})[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%}/g, "',$1,'").split("\t").join("');").split("%}").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
		// Provide some basic currying to the user
		return data ? fn(data) : fn;
	};
})();

var delay = function () {
	var timer = 0;
	return function (callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
}();

function getStyle(el, styleProp) {
	value = "";
	//var el = document.getElementById(el);
	if (el.style && el.style.length > 0 && el.style[styleProp]) //check inline
		var value = el.style[styleProp];else if (el.currentStyle) //check defined css
		var value = el.currentStyle[styleProp];else if (window.getComputedStyle) {
		var value = document.defaultView.getDefaultComputedStyle ? document.defaultView.getDefaultComputedStyle(el, null).getPropertyValue(styleProp) : window.getComputedStyle(el, null).getPropertyValue(styleProp);
	}

	return value;
}

if (Vvveb === undefined) var Vvveb = {};

Vvveb.defaultComponent = "_base";
Vvveb.preservePropertySections = true;

Vvveb.baseUrl = document.currentScript ? document.currentScript.src.replace(/[^\/]*?\.js$/, '') : '';

Vvveb.ComponentsGroup = {};

Vvveb.Components = {
	_components: {},

	_nodesLookup: {},

	_attributesLookup: {},

	_classesLookup: {},

	_classesRegexLookup: {},

	init: function init(url) {},

	get: function get(type) {
		return this._components[type];
	},

	add: function add(type, data) {
		var _this = this;

		data.type = type;

		this._components[type] = data;

		if (data.nodes) {
			for (var i in data.nodes) {
				this._nodesLookup[data.nodes[i]] = data;
			}
		}

		if (data.attributes) {
			if (data.attributes.constructor === Array) {
				for (var i in data.attributes) {
					this._attributesLookup[data.attributes[i]] = data;
				}
			} else {
				for (var i in data.attributes) {
					if (typeof this._attributesLookup[i] === 'undefined') {
						this._attributesLookup[i] = {};
					}

					if (data.attributes[i].constructor === Array) {
						// 支持textinput中不同的输入类型attributes: { "type": ['text', 'password'] },
						data.attributes[i].forEach(function (value) {
							_this._attributesLookup[i][value] = data;
						});
					} else {
						this._attributesLookup[i][data.attributes[i]] = data;
					}
				}
			}
		}

		if (data.classes) {
			for (var i in data.classes) {
				this._classesLookup[data.classes[i]] = data;
			}
		}

		if (data.classesRegex) {
			for (var i in data.classesRegex) {
				this._classesRegexLookup[data.classesRegex[i]] = data;
			}
		}
	},

	extend: function extend(inheritType, type, data) {

		newData = data;

		if (inheritData = this._components[inheritType]) {
			newData = $.extend(true, {}, inheritData, data);
			newData.properties = $.merge($.merge([], inheritData.properties ? inheritData.properties : []), data.properties ? data.properties : []);
		}

		//sort by order
		newData.properties.sort(function (a, b) {
			if (typeof a.sort === "undefined") a.sort = 0;
			if (typeof b.sort === "undefined") b.sort = 0;

			if (a.sort < b.sort) return -1;
			if (a.sort > b.sort) return 1;
			return 0;
		});

		this.add(type, newData);
	},

	matchNode: function matchNode(node) {
		if ($(node).attr(_common.dataComponentId) && this._components[$(node).attr(_common.dataComponentId)]) {
			return this._components[$(node).attr(_common.dataComponentId)];
		} else if ($(node).attr('type') == 'radio' || $(node).attr('type') == 'checkbox') {
			var $parent = $(node).parent();
			if ($parent.attr(_common.dataComponentId) && this._components[$parent.attr(_common.dataComponentId)]) {
				return this._components[$parent.attr(_common.dataComponentId)];
			}
		}

		if (node.attributes.length) {
			//search for attributes
			for (var i in node.attributes) {
				attr = node.attributes[i].name;
				value = node.attributes[i].value;

				if (attr in this._attributesLookup) {
					component = this._attributesLookup[attr];

					//currently we check that is not a component by looking at name attribute
					//if we have a collection of objects it means that attribute value must be checked
					if (typeof component["name"] === "undefined") {
						if (value in component) {
							return component[value];
						}
					} else return component;
				}
			}

			for (var i in node.attributes) {
				attr = node.attributes[i].name;
				value = node.attributes[i].value;

				//check for node classes
				if (attr == "class") {
					classes = value.split(" ");

					for (j in classes) {
						if (classes[j] in this._classesLookup) return this._classesLookup[classes[j]];
					}

					for (regex in this._classesRegexLookup) {
						regexObj = new RegExp(regex);
						if (regexObj.exec(value)) {
							return this._classesRegexLookup[regex];
						}
					}
				}
			}
		}

		tagName = node.tagName.toLowerCase();
		if (tagName in this._nodesLookup) return this._nodesLookup[tagName];

		//return false;
		return this.get(Vvveb.defaultComponent);
	},

	render: function render(type) {

		component = this._components[type];

		rightPanel = jQuery("#right-panel #component-properties");
		section = rightPanel.find('.section[data-section="default"]');

		if (!(Vvveb.preservePropertySections && section.length)) {
			rightPanel.html('').append(tmpl("vvveb-input-sectioninput", { key: "default", header: component.name }));
			section = rightPanel.find(".section");
		}

		rightPanel.find('[data-header="default"] span').html(component.name);
		section.html("");

		if (component.beforeInit) component.beforeInit(Vvveb.Builder.selectedEl.get(0));

		fn = function fn(component, property) {
			return property.input.on('propertyChange', function (event, value, input) {
				element = Vvveb.Builder.selectedEl;
				if (property.child) element = element.find(property.child);
				if (property.parent) element = element.parent(property.parent);

				if (property.onChange) {
					element = property.onChange(element, value, input, component);
				} else if (property.htmlAttr) {
					oldValue = element.attr(property.htmlAttr);

					if (property.htmlAttr == 'text') {
						element.text(value);
					} else if (property.htmlAttr == "class" && property.validValues) {
						element.removeClass(property.validValues.join(" "));
						element = element.addClass(value);
					} else if (property.htmlAttr == "style") {
						element = element.css(property.key, value);
					} else {
						element = element.attr(property.htmlAttr, value);
					}

					Vvveb.Undo.addMutation({
						type: 'attributes',
						target: element.get(0),
						attributeName: property.htmlAttr,
						oldValue: oldValue,
						newValue: element.attr(property.htmlAttr)
					});
				}

				if (component.onChange) {
					element = component.onChange(element, property, value, input);
				}

				if (!property.child && !property.parent) Vvveb.Builder.selectNode(element);
			});
		};

		nodeElement = Vvveb.Builder.selectedEl;

		for (var i in component.properties) {
			property = component.properties[i];

			if (property.beforeInit) property.beforeInit(element.get(0));

			element = nodeElement;
			if (property.child) element = element.find(property.child);

			if (property.data) {
				property.data["key"] = property.key;
			} else {
				property.data = { "key": property.key };
			}

			if (typeof property.group === 'undefined') property.group = null;

			property.input = property.inputtype.init(property.data);

			if (property.init) {
				property.inputtype.setValue(property.init(element.get(0)));
			} else if (property.htmlAttr) {
				if (property.htmlAttr == 'text') {
					value = element.text();
				} else if (property.htmlAttr == "style") {
					//value = element.css(property.key);//jquery css returns computed style
					value = getStyle(element.get(0), property.key); //getStyle returns declared style
				} else {
					value = element.attr(property.htmlAttr);
				}

				//if attribute is class check if one of valid values is included as class to set the select
				if (value && property.htmlAttr == "class" && property.validValues) {
					value = value.split(" ").filter(function (el) {
						return property.validValues.indexOf(el) != -1;
					});
				}

				property.inputtype.setValue(value);
			}

			fn(component, property);

			if (property.inputtype == _inputs.SectionInput) {
				section = rightPanel.find('.section[data-section="' + property.key + '"]');

				if (Vvveb.preservePropertySections && section.length) {
					section.html("");
				} else {
					rightPanel.append(property.input);
					section = rightPanel.find('.section[data-section="' + property.key + '"]');
				}
			} else {
				row = $(tmpl('vvveb-property', property));
				row.find('.input').append(property.input);
				section.append(row);
			}
		}

		if (component.init) component.init(Vvveb.Builder.selectedEl.get(0));
	}
};

Vvveb.WysiwygEditor = {

	isActive: false,
	oldValue: '',
	doc: false,

	init: function init(doc) {
		this.doc = doc;

		$("#bold-btn").on("click", function (e) {
			doc.execCommand('bold', false, null);
			e.preventDefault();
			return false;
		});

		$("#italic-btn").on("click", function (e) {
			doc.execCommand('italic', false, null);
			e.preventDefault();
			return false;
		});

		$("#underline-btn").on("click", function (e) {
			doc.execCommand('underline', false, null);
			e.preventDefault();
			return false;
		});

		$("#strike-btn").on("click", function (e) {
			doc.execCommand('strikeThrough', false, null);
			e.preventDefault();
			return false;
		});

		$("#link-btn").on("click", function (e) {
			doc.execCommand('createLink', false, "#");
			e.preventDefault();
			return false;
		});
	},

	undo: function undo(element) {
		this.doc.execCommand('undo', false, null);
	},

	redo: function redo(element) {
		this.doc.execCommand('redo', false, null);
	},

	edit: function edit(element) {
		element.attr({ 'contenteditable': true, 'spellcheckker': false });
		$("#wysiwyg-editor").show();

		this.element = element;
		this.isActive = true;
		this.oldValue = element.html();
	},

	destroy: function destroy(element) {
		element.removeAttr('contenteditable spellcheckker');
		$("#wysiwyg-editor").hide();
		this.isActive = false;

		node = this.element.get(0);
		Vvveb.Undo.addMutation({
			type: 'characterData',
			target: node,
			oldValue: this.oldValue,
			newValue: node.innerHTML
		});
	}
};

Vvveb.Builder = {

	dragMoveMutation: false,

	init: function init(url, callback) {

		self = this;

		self.loadControlGroups();

		self.selectedEl = null;
		self.highlightEl = null;
		self.initCallback = callback;

		self.documentFrame = $("#iframe-wrapper > iframe");
		self.canvas = $("#canvas");

		self._loadIframe(url);

		self._initDragdrop();

		self.dragElement = null;
	},

	/* controls */
	loadControlGroups: function loadControlGroups() {

		componentsList = $("#components-list");
		componentsList.empty();

		for (group in Vvveb.ComponentsGroup) {
			componentsList.append('<li class="header" data-section="' + group + '"  data-search=""><label class="header" for="comphead_' + group + '">' + group + '  <div class="header-arrow"></div>\
								   </label><input class="header_check" type="checkbox" checked="true" id="comphead_' + group + '">  <ol></ol></li>');

			componentsSubList = componentsList.find('li[data-section="' + group + '"]  ol');

			components = Vvveb.ComponentsGroup[group];

			for (i in components) {
				componentType = components[i];
				component = Vvveb.Components.get(componentType);

				if (component) {
					item = $('<li data-section="' + group + '" data-type="' + componentType + '" data-search="' + component.name.toLowerCase() + '"><a href="#">' + component.name + "</a></li>");

					if (component.image) {

						item.css({
							backgroundImage: "url(" + 'libs/builder/' + component.image + ")",
							backgroundRepeat: "no-repeat"
						});
					}

					componentsSubList.append(item);
				}
			}
		}
	},

	loadUrl: function loadUrl(url) {
		jQuery("#select-box").hide();
		self.iframe.src = url;
	},

	/* iframe */
	_loadIframe: function _loadIframe(url) {

		self.iframe = this.documentFrame.get(0);
		self.iframe.src = url;

		return this.documentFrame.on("load", function () {

			window.FrameWindow = self.iframe.contentWindow;
			window.FrameDocument = self.iframe.contentWindow.document;

			Vvveb.WysiwygEditor.init(window.FrameDocument);
			if (self.initCallback) self.initCallback();

			return self._frameLoaded();
		});
	},

	_frameLoaded: function _frameLoaded() {

		self.frameDoc = $(window.FrameDocument);
		self.frameHtml = $(window.FrameDocument).find("html");
		self.frameBody = $(window.FrameDocument).find('body');

		this._initHightlight();
	},

	_getElementType: function _getElementType(el) {

		//search for component attribute
		componentName = '';

		if (el.attributes) for (var j = 0; j < el.attributes.length; j++) {

			if (el.attributes[j].nodeName.indexOf('data-component') > -1) {
				componentName = el.attributes[j].nodeName.replace('data-component-', '');
			}
		}

		if (componentName != '') return componentName;

		if (el.attributes) for (var j = 0; j < el.attributes.length; j++) {

			if (el.attributes[j].nodeName.indexOf('data-component') > -1) {
				componentName = el.attributes[j].nodeName.replace('data-component-', '');
			}
		}

		if (componentName != '') return componentName;
		//if (className) return componentName;
		return el.tagName;
	},

	loadNodeComponent: function loadNodeComponent(node) {
		data = Vvveb.Components.matchNode(node);
		if (data) Vvveb.Components.render(data.type);
	},

	selectNode: function selectNode() {
		var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


		if (!node) {
			jQuery("#select-box").hide();
			return;
		}

		if (self.texteditEl && self.selectedEl.get(0) != node) {
			Vvveb.WysiwygEditor.destroy(self.texteditEl);
			jQuery("#select-box").removeClass("text-edit").find("#select-actions").show();
			self.texteditEl = null;
		}

		self.selectedEl = target = jQuery(node);
		offset = target.offset();

		jQuery("#select-box").css({
			"top": offset.top - self.frameDoc.scrollTop(),
			"left": offset.left - self.frameDoc.scrollLeft(),
			"width": target.outerWidth(),
			"height": target.outerHeight(),
			"display": "block"
		});

		jQuery("#highlight-name").html(self._getElementType(node));
	},

	/* iframe highlight */
	_initHightlight: function _initHightlight() {

		moveEvent = { target: null };

		this.frameBody.on("mousemove touchmove", function (event) {
			//delay for half a second if dragging over same element
			// if (event.target == moveEvent.target && ((event.timeStamp - moveEvent.timeStamp) < 500)) return;
			if (event.target) {
				moveEvent = event;

				self.highlightEl = target = jQuery(event.target);
				offset = target.offset();
				width = target.outerWidth();
				height = target.outerHeight();

				if (self.isDragging) {
					self.dragElement.css({
						display: 'none'
					});
					parent = self.highlightEl;
					parentOffset = self.dragElement.offset();
					// try {
					// 	self.dragElement.css({
					// 		display: 'none'
					// 	});
					// 	if (event.originalEvent && (offset.left > (event.originalEvent.x - 10))) {
					// 		if (offset.top > (event.originalEvent.y - 10)) {
					// 			parent.before(self.dragElement);
					// 		} else {
					// 			parent.prepend(self.dragElement);
					// 			self.dragElement.prependTo(parent);
					// 		}
					// 	} else {
					// 		if (event.originalEvent && offset.top > ((event.originalEvent.y - 10))) {
					// 			parent.before(self.dragElement);
					// 		} else {
					// 			parent.append(self.dragElement);
					// 			self.dragElement.appendTo(parent);
					// 		}
					// 	}
					// } catch (err) {
					// 	console.log(err);
					// }
				} else {

					jQuery("#highlight-box").css({
						"top": offset.top - self.frameDoc.scrollTop(),
						"left": offset.left - self.frameDoc.scrollLeft(),
						"width": width,
						"height": height,
						"display": event.target.hasAttribute('contenteditable') ? "none" : "block"
					});

					jQuery("#highlight-name").html(self._getElementType(event.target));
				}
			}
		});

		this.frameBody.on("mouseup touchend", function (event) {
			if (self.isDragging) {
				self.isDragging = false;

				if (component.dragHtml) //if dragHtml is set for dragging then set real component html
					{
						newElement = $(component.html);
						self.dragElement.replaceWith(newElement);
						self.dragElement = newElement;
					}
				if (component.afterDrop) self.dragElement = component.afterDrop(self.dragElement);

				node = self.dragElement.get(0);
				self.selectNode(node);
				self.loadNodeComponent(node);

				if (self.dragMoveMutation === false) {
					Vvveb.Undo.addMutation({
						type: 'childList',
						target: node.parentNode,
						addedNodes: [node],
						nextSibling: node.nextSibling
					});
				} else {
					self.dragMoveMutation.newParent = node.parentNode;
					self.dragMoveMutation.newNextSibling = node.nextSibling;

					Vvveb.Undo.addMutation(self.dragMoveMutation);
					self.dragMoveMutation = false;
				}
			}
		});

		this.frameBody.on("dblclick", function (event) {
			(0, _calendar.replaceOtherShowingCalendarInputs)(event.target, self.frameBody);

			self.texteditEl = target = jQuery(event.target);

			Vvveb.WysiwygEditor.edit(self.texteditEl);

			self.texteditEl.attr({ 'contenteditable': true, 'spellcheckker': false });

			self.texteditEl.on("blur keyup paste input", function (event) {

				jQuery("#select-box").css({
					"width": self.texteditEl.outerWidth(),
					"height": self.texteditEl.outerHeight()
				});
			});

			jQuery("#select-box").addClass("text-edit").find("#select-actions").hide();
			jQuery("#highlight-box").hide();
		});

		this.frameBody.on("click", function (event) {
			(0, _calendar.replaceOtherShowingCalendarInputs)(event.target, self.frameBody);

			if (event.target) {
				if (!isPreview && !$('#attribute-settings').hasClass('active')) {
					$('#attribute-settings').addClass('active').siblings().removeClass('active');
					$('#left-panel').hide();
					$('#right-panel').show();
				}
				self.selectNode(event.target);
				self.loadNodeComponent(event.target);

				event.preventDefault();
				return false;
			}
		});

		this.frameBody.keydown(function (e) {
			if (self.selectedEl && self.selectedEl.prop('tagName') != 'BODY') {
				if (e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40) {
					document.getElementById('iframeId').contentWindow.arrowKeyMove(e.which, self.selectedEl);
					e.preventDefault(); // prevent the default action (scroll / move caret)
				}
			}
		});

		$("#drag-box").on("mousedown", function (event) {
			jQuery("#select-box").hide();
			self.dragElement = self.selectedEl;
			self.isDragging = true;

			node = self.dragElement.get(0);

			self.dragMoveMutation = {
				type: 'move',
				target: node,
				oldParent: node.parentNode,
				oldNextSibling: node.nextSibling
			};

			//self.selectNode(false);
			event.preventDefault();
			return false;
		});

		$("#down-box").on("click", function (event) {
			jQuery("#select-box").hide();

			node = self.selectedEl.get(0);
			oldParent = node.parentNode;
			oldNextSibling = node.nextSibling;

			next = self.selectedEl.next();

			if (next.length > 0) {
				next.after(self.selectedEl);
			} else {
				self.selectedEl.parent().after(self.selectedEl);
			}

			newParent = node.parentNode;
			newNextSibling = node.nextSibling;

			Vvveb.Undo.addMutation({
				type: 'move',
				target: node,
				oldParent: oldParent,
				newParent: newParent,
				oldNextSibling: oldNextSibling,
				newNextSibling: newNextSibling
			});

			event.preventDefault();
			return false;
		});

		$("#up-box").on("click", function (event) {
			jQuery("#select-box").hide();

			node = self.selectedEl.get(0);
			oldParent = node.parentNode;
			oldNextSibling = node.nextSibling;

			next = self.selectedEl.prev();

			if (next.length > 0) {
				next.before(self.selectedEl);
			} else {
				self.selectedEl.parent().before(self.selectedEl);
			}

			newParent = node.parentNode;
			newNextSibling = node.nextSibling;

			Vvveb.Undo.addMutation({
				type: 'move',
				target: node,
				oldParent: oldParent,
				newParent: newParent,
				oldNextSibling: oldNextSibling,
				newNextSibling: newNextSibling
			});

			event.preventDefault();
			return false;
		});

		$("#clone-box").on("click", function (event) {
			clone = self.selectedEl.clone();

			self.selectedEl.after(clone);

			self.selectedEl = clone.click();

			node = clone.get(0);
			Vvveb.Undo.addMutation({
				type: 'childList',
				target: node.parentNode,
				addedNodes: [node],
				nextSibling: node.nextSibling
			});

			event.preventDefault();
			return false;
		});

		$("#parent-box").on("click", function (event) {

			node = self.selectedEl.parent().get(0);

			self.selectNode(node);
			self.loadNodeComponent(node);

			event.preventDefault();
			return false;
		});

		$("#delete-box").on("click", function (event) {
			jQuery("#select-box").hide();

			node = self.selectedEl.get(0);

			Vvveb.Undo.addMutation({
				type: 'childList',
				target: node.parentNode,
				removedNodes: [node],
				nextSibling: node.nextSibling
			});

			self.selectedEl.remove();

			event.preventDefault();
			return false;
		});

		jQuery(window.FrameWindow).on("scroll resize", function (event) {

			if (self.selectedEl) {
				offset = self.selectedEl.offset();

				jQuery("#select-box").css({
					"top": offset.top - self.frameDoc.scrollTop(),
					"left": offset.left - self.frameDoc.scrollLeft(),
					"width": self.selectedEl.outerWidth(),
					"height": self.selectedEl.outerHeight()
					//"display": "block"
				});
			}

			if (self.highlightEl) {
				offset = self.highlightEl.offset();

				jQuery("#highlight-box").css({
					"top": offset.top - self.frameDoc.scrollTop(),
					"left": offset.left - self.frameDoc.scrollLeft(),
					"width": self.highlightEl.outerWidth(),
					"height": self.highlightEl.outerHeight()
					//"display": "block"
				});
			}
		});
	},

	/* drag and drop */
	_initDragdrop: function _initDragdrop() {

		self.isDragging = false;
		component = {};
		$('#components ul > li > ol > li').on("mousedown touchstart", function (event) {
			$this = jQuery(this);

			// $("#component-clone").remove();
			component = Vvveb.Components.get($this.data("type"));

			if (component.dragHtml) {
				html = component.dragHtml;
			} else {
				html = component.html;
			}

			self.dragElement = $(html);

			if (component.dragStart) self.dragElement = component.dragStart(self.dragElement);

			self.isDragging = true;
		});

		$('body').on('mouseup touchend', function (event) {
			if (self.isDragging == true) {
				self.isDragging = false;
				// $("#component-clone").remove();
			}
		});

		$('body').on('mousemove touchmove', function (event) {
			if (self.isDragging == true) {
				elementMouseIsOver = document.elementFromPoint(event.clientX - 60, event.clientY - 40);
				//if drag elements hovers over iframe switch to iframe mouseover handler	
				if (elementMouseIsOver && elementMouseIsOver.tagName == 'IFRAME') {
					self.frameBody.trigger("mousemove", event);
					event.stopPropagation();
					self.selectNode(false);
				}
			}
		});

		$('#components ul > ol > li > li').on("mouseup touchend", function (event) {
			self.isDragging = false;
			// $("#component-clone").remove();
		});
	},

	getBeautifiedHtml: function getBeautifiedHtml() {
		/*
  -I, --indent-inner-html            Indent <head> and <body> sections. Default is false.
  -U, --unformatted                  List of tags (defaults to inline) that should not be reformatted
  								   use empty array to denote that no tags should not be reformatted
   */

		var _getHtml = this.getHtml(),
		    doctype = _getHtml.doctype,
		    html = _getHtml.html;

		return html_beautify(doctype + '\n\t\t\t\t\t\t\t  ' + (0, _htmlGenerator2.default)(html, _jsoup.removeUnusedTags, _jsoup.emptyChildren, _jsoup.generateTableScript, _jsoup.generateCalendarOnclickAttr, _jsoup.generateSelectOptionsScript, _jsoup.generateSubmitFormScript, _jsoup.generateButtonOnclickAttr), {
			preserve_newlines: false,
			indent_inner_html: true,
			unformatted: []
		});
	},


	getHtml: function getHtml() {
		doc = window.FrameDocument;
		var doctype = "<!DOCTYPE " + doc.doctype.name + (doc.doctype.publicId ? ' PUBLIC "' + doc.doctype.publicId + '"' : '') + (!doc.doctype.publicId && doc.doctype.systemId ? ' SYSTEM' : '') + (doc.doctype.systemId ? ' "' + doc.doctype.systemId + '"' : '') + ">\n";
		var html = doctype + '\n\t\t\t\t\t  <html>\n\t\t\t\t\t\t  ' + doc.documentElement.innerHTML + '\n\t\t\t\t\t  </html>';
		return {
			doctype: doctype,
			html: html
		};
	},

	setHtml: function setHtml(html) {
		//update only body to avoid breaking iframe css/js relative paths
		start = html.indexOf("<body");
		end = html.indexOf("</body");

		if (start >= 0 && end >= 0) {
			body = html.slice(html.indexOf(">", start) + 1, end);
		} else {
			body = html;
		}

		//self.frameBody.html(body);
		window.FrameDocument.body.innerHTML = body;

		//below methods brake document relative css and js paths
		//return self.iframe.outerHTML = html;
		//return self.documentFrame.html(html);
		//return self.documentFrame.attr("srcdoc", html);
	}
};

Vvveb.CodeEditor = {

	isActive: false,
	oldValue: '',
	doc: false,

	init: function init(doc) {
		$("#vvveb-code-editor textarea").val(Vvveb.Builder.getBeautifiedHtml());

		$("#vvveb-code-editor textarea").keyup(function () {
			delay(Vvveb.Builder.setHtml(this.value), 1000);
		});

		//load code on document changes
		Vvveb.Builder.frameBody.on("vvveb.undo.add vvveb.undo.restore", function (e) {
			Vvveb.CodeEditor.setValue();
		});
		//load code when a new url is loaded
		Vvveb.Builder.documentFrame.on("load", function (e) {
			Vvveb.CodeEditor.setValue();
		});

		this.isActive = true;
	},

	setValue: function setValue(value) {
		if (this.isActive) {
			$("#vvveb-code-editor textarea").val(Vvveb.Builder.getBeautifiedHtml());
		}
	},

	destroy: function destroy(element) {
		//this.isActive = false;
	},

	toggle: function toggle() {
		if (this.isActive != true) {
			this.isActive = true;
			return this.init();
		}
		this.isActive = false;
		this.destroy();
	}
};

var shownPanel = void 0,
    hiddenPanel = void 0,
    isPreview = void 0;

Vvveb.Gui = {

	init: function init() {
		$("[data-vvveb-action]").each(function () {
			on = "click";
			if (this.dataset.vvvebOn) on = this.dataset.vvvebOn;

			$(this).on(on, Vvveb.Gui[this.dataset.vvvebAction]);
			if (this.dataset.vvvebShortcut) {
				$(document).bind('keydown', this.dataset.vvvebShortcut, Vvveb.Gui[this.dataset.vvvebAction]);
				$(window.FrameDocument, window.FrameWindow).bind('keydown', this.dataset.vvvebShortcut, Vvveb.Gui[this.dataset.vvvebAction]);
			}
		});
	},

	undo: function undo() {
		if (Vvveb.WysiwygEditor.isActive) {
			Vvveb.WysiwygEditor.undo();
		} else {
			Vvveb.Undo.undo();
		}
		Vvveb.Builder.selectNode();
	},

	redo: function redo() {
		if (Vvveb.WysiwygEditor.isActive) {
			Vvveb.WysiwygEditor.redo();
		} else {
			Vvveb.Undo.redo();
		}
		Vvveb.Builder.selectNode();
	},

	check: function check() {
		$('#textarea-modal textarea').val(Vvveb.Builder.getBeautifiedHtml());
		$('#textarea-modal').modal();
	},

	viewport: function viewport() {
		$("#canvas").attr("class", this.dataset.view);
	},

	toggleEditor: function toggleEditor() {
		$("#vvveb-builder").toggleClass("bottom-panel-expand");
		Vvveb.CodeEditor.toggle();
	},

	download: function download() {
		(0, _download.downloadAsTextFile)('index', Vvveb.Builder.getBeautifiedHtml());
	},


	preview: function preview() {
		if ($('#left-panel').is(':visible')) {
			shownPanel = 'left-panel';
			hiddenPanel = 'right-panel';
			$('#left-panel, #right-panel').hide();
			isPreview = true;
		} else if ($('#right-panel').is(':visible')) {
			shownPanel = 'right-panel';
			hiddenPanel = 'left-panel';
			$('#left-panel, #right-panel').hide();
			isPreview = true;
		} else {
			isPreview = false;
			$('#' + shownPanel).show();
			$('#' + hiddenPanel).hide();
		}

		$('#menu-panel').toggle();
		$("#iframe-layer").toggle();
		$("#vvveb-builder").toggleClass("preview");
	},

	fullscreen: function fullscreen() {
		(0, _fullScreen.launchFullScreen)(document); // the whole page
	},

	componentSearch: function componentSearch() {
		searchText = this.value;

		$("#components-list li ol li").each(function () {
			$this = $(this);

			$this.hide();
			if ($this.data("search").indexOf(searchText) > -1) $this.show();
		});
	},

	clearComponentSearch: function clearComponentSearch() {
		$("#component-search").val("").keyup();
	}
};

Vvveb.FileManager = {
	tree: false,
	pages: {},

	init: function init() {
		this.tree = $("#filemanager .tree > ol").html("");

		$(this.tree).on("click", "li[data-page] span", function (e) {
			window.location.href = '#' + $(this).parents('li').data('page');
			window.location.reload();
			// Vvveb.FileManager.loadPage($(this).parents("li").data("page"));
			return false;
		});
	},

	getPage: function getPage(name) {
		return this.pages[name];
	},


	addPage: function addPage(name, title, url) {

		this.pages[name] = {
			name: name,
			title: title,
			url: url
		};

		this.tree.append(tmpl("vvveb-filemanager-page", { name: name, title: title, url: url }));
	},

	addPages: function addPages(pages) {
		for (page in pages) {
			this.addPage(pages[page]['name'], pages[page]['title'], pages[page]['url']);
		}
	},

	addComponent: function addComponent(name, url, title, page) {
		$("[data-page='" + page + "'] > ol", this.tree).append(tmpl("vvveb-filemanager-component", { name: name, url: url, title: title }));
	},

	showActive: function showActive(name) {
		$("[data-page]", this.tree).removeClass("active");
		$("[data-page='" + name + "']", this.tree).addClass("active");
	},


	loadPage: function loadPage(name) {
		$("[data-page]", this.tree).removeClass("active");
		$("[data-page='" + name + "']", this.tree).addClass("active");

		Vvveb.Builder.loadUrl(this.pages[name]['url']);
	}

};

exports.default = Vvveb;

},{"./components/common":138,"./inputs/inputs":170,"./util/calendar":177,"./util/download":178,"./util/fullScreen":180,"./util/htmlGenerator":181,"./util/jsoup":182}],182:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateButtonOnclickAttr = exports.generateSubmitFormScript = exports.generateSelectOptionsScript = exports.generateCalendarOnclickAttr = exports.generateTableScript = exports.emptyChildren = exports.removeUnusedTags = undefined;

var _unusedTags = require('./unusedTags');

var _unusedTags2 = _interopRequireDefault(_unusedTags);

var _selectors = require('./selectors');

var _table = require('../templates/table');

var _table2 = _interopRequireDefault(_table);

var _autoselectinput = require('../templates/autoselectinput');

var _autoselectinput2 = _interopRequireDefault(_autoselectinput);

var _submitform = require('../templates/submitform');

var _table3 = require('../components/@oee/table');

var _table4 = _interopRequireDefault(_table3);

var _calendar = require('./calendar');

var _submitbutton = require('./submitbutton');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alwaysTrue = function alwaysTrue() {
    return true;
};

// this refers to html element
function removeTag(_ref) {
    var name = _ref.name,
        _ref$filter = _ref.filter,
        filter = _ref$filter === undefined ? alwaysTrue : _ref$filter;

    Array.from(this.getElementsByTagName(name)).filter(filter).forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
    });
}

function removeUnusedTags(el) {
    _unusedTags2.default.forEach(removeTag, el);
    return el;
}

function emptyChildren(el) {
    $(el).find(_selectors.emptyChildrenSelectors.join(', ')).empty();
    return el;
}

function appendScript(el, jsStr) {
    jsStr && $('<script></script>').text(jsStr).appendTo($(el).find('body'));
    return el;
}

function generateTableScript(el) {
    var jsStr = Array.from($(el).find(_selectors.tableSelector)).reduce(function (prev, element) {
        return prev + '\n                ' + (0, _table2.default)($(element), _table4.default);
    }, '');
    return appendScript(el, jsStr);
}

function generateCalendarOnclickAttr(el) {
    $(el).find(_calendar.calendarSelector).each(function () {
        $(this).attr('onclick') || (0, _calendar.setOnclickAttr)(this);
    });
    return el;
}

function generateSelectOptionsScript(el) {
    return appendScript(el, (0, _autoselectinput2.default)());
}

function generateSubmitFormScript(el) {
    return appendScript(el, (0, _submitform.template)());
}

function generateButtonOnclickAttr(el) {
    $(el).find(_selectors.submitButtonSelector).each(function () {
        $(this).attr('onclick') || (0, _submitbutton.setOnclickAttr)(this);
    });
    return el;
}

exports.removeUnusedTags = removeUnusedTags;
exports.emptyChildren = emptyChildren;
exports.generateTableScript = generateTableScript;
exports.generateCalendarOnclickAttr = generateCalendarOnclickAttr;
exports.generateSelectOptionsScript = generateSelectOptionsScript;
exports.generateSubmitFormScript = generateSubmitFormScript;
exports.generateButtonOnclickAttr = generateButtonOnclickAttr;

},{"../components/@oee/table":128,"../templates/autoselectinput":173,"../templates/submitform":174,"../templates/table":175,"./calendar":177,"./selectors":183,"./submitbutton":184,"./unusedTags":185}],185:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});
var unusedTags = [{
	name: 'script',
	filter: function filter(tag) {
		return tag.getAttribute('src') && tag.getAttribute('src').includes('iframe-drag-n-drop');
	}
}, {
	name: 'link',
	filter: function filter(tag) {
		return tag.getAttribute('rel') == 'stylesheet' && (tag.getAttribute('href').includes('drag-n-drop') || tag.getAttribute('href').includes('/datepicker/skin/WdatePicker.css') || tag.getAttribute('href').includes('/layer/skin/layer.css'));
	}
}, {
	name: 'hr',
	filter: function filter(tag) {
		return $(tag).hasClass('horizontal-line') || $(tag).hasClass('vertical-line');
	}
}];

exports.default = unusedTags;

},{}],184:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setOnclickAttr = undefined;

var _submitform = require('../templates/submitform');

function setOnclickAttr(node) {
    return $(node).attr('onclick', _submitform.functionName + '(this)');
}

exports.setOnclickAttr = setOnclickAttr;

},{"../templates/submitform":174}],175:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require('../components/common');

var index = 1;

function template(node, table) {
    var id = node.attr('id') || (node.attr('id', 'table' + index++), node.attr('id'));
    var key = node.attr(_common.dataTableId);
    return '\n    var columnDefs' + key + ' = [\n        ' + table.getTable(key).columnDefs.map(function (def) {
        return '{headerName: "' + def.headerName + '", field: "' + def.field + '", width: ' + (def.width ? def.width : '""') + '}';
    }).join(',') + '\n    ];\n    var gridOptions' + key + ' = {\n        columnDefs: columnDefs' + key + ',\n        enableSorting: false,\n        enableFilter: false\n      };\n    var eGridDiv' + key + ' = document.querySelector(\'#' + id + '\');\n    new agGrid.Grid(eGridDiv' + key + ', gridOptions' + key + ');\n    gridOptions' + key + '.api.setRowData([]);\n    ';
}

exports.default = template;

},{"../components/common":138}],174:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.functionName = exports.template = undefined;

var _common = require("../components/common");

var functionName = 'submitForm';
function template() {
    return "\n        var gridOptionsIdentifier = window['gridOptions' + $('[" + _common.dataTableId + "]').attr('" + _common.dataTableId + "')];\n        function " + functionName + "(element, formId) {\n            $.ajax({\n                // url: config.fundodooWebDomainUrl + $(element).attr('data-url'),\n                url: 'http://localhost:8080/api/data',\n                dataType: 'json',\n                method : 'POST',\n                data: (formId ? $('#formId') : $('form')).serializeJSON(),\n                success: function (rs, status, xhr) {\n                    if (rs.code == 200) {\n                        gridOptionsIdentifier.api.setRowData(rs.data);\n                    }\n                }\n            });\n        }\n    ";
}

exports.template = template;
exports.functionName = functionName;

},{"../components/common":138}],173:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require("../components/common");

var _selectors = require("../util/selectors");

function template() {
    return "\n        function generateOptions(el, response) {\n            var value = $(el).attr('" + _common.dataValueMapping + "') || 'value';\n            var text = $(el).attr('" + _common.dataTextMapping + "') || 'text';\n            response.forEach(function (option) {\n                $('<option></option>')\n                    .val(option[value])\n                    .text(option[text])\n                    .appendTo($(el));\n            });\n        }\n        Array.from($('body').find('" + _selectors.autoselectinputSelector + "'))\n            .filter(function (el) {\n                return $(el).attr('" + _common.dataUrl + "');\n            }).forEach(function (el) {\n                $.ajax({\n                    url: $(el).attr('" + _common.dataUrl + "'),\n                    success: function (response) {\n                        if (response.code == 200) {\n                            generateOptions(el, response.data);\n                        }\n                    }\n                });\n            });\n    ";
}

exports.default = template;

},{"../components/common":138,"../util/selectors":183}],183:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitButtonSelector = exports.autoselectinputSelector = exports.tableSelector = exports.emptyChildrenSelectors = undefined;

var _common = require('../components/common');

var tableSelector = '[' + _common.dataTableId + ']';
var emptyChildrenSelectors = [tableSelector];
var autoselectinputSelector = '[' + _common.dataAutoSelectId + ']';
var submitButtonSelector = 'button[' + _common.dataButtonId + ']';

exports.emptyChildrenSelectors = emptyChildrenSelectors;
exports.tableSelector = tableSelector;
exports.autoselectinputSelector = autoselectinputSelector;
exports.submitButtonSelector = submitButtonSelector;

},{"../components/common":138}],128:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../../inputs/inputs');

var _common = require('../common');

var _builder = require('../../builder');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var tables = {};
var index = 1;
function setColumnDefsAndRender(node, colDefs) {
    // Call to set new column definitions into the grid. 
    // The grid will redraw all the column headers, and then redraw all of the rows.
    tables[$(node).attr(_common.dataTableId)].api.setColumnDefs(colDefs);
    _builder2.default.Components.render("html/table@oee");
}

var table = {
    nodes: ["table"],
    classes: ["table"],
    image: "icons/table.svg",
    name: "ag-Grid",
    html: '<div ' + _common.dataComponentId + '="html/table@oee" style="width: 500px; height: 200px;" class="dropzone draggable ag-theme-blue horizontal-stripes"></div>',
    onDrop: function onDrop(node) {
        $(node).css({
            height: 'calc(100% - 25px)',
            width: '100%',
            position: '',
            left: '',
            top: '',
            transform: ''
        }).removeClass('draggable');
        _builder2.default.Builder.frameBody.find('.containerRight .allContent .topContent .container .row .everyBox .boxarea').append($(node).prop('outerHTML'));
        $(node).remove();
    },
    getTable: function getTable(key) {
        return tables[key];
    },

    beforeInit: function beforeInit(node) {
        var _this = this,
            _properties;

        $(node).removeClass('horizontal-stripes');
        if (!$(node).attr(_common.dataTableId)) {
            var id = index++;
            $(node).attr(_common.dataTableId, id);
            tables[id] = {
                columnDefs: [{ headerName: "header", field: "filed", width: '' }, { headerName: "header", field: "field", width: '' }, { headerName: "header", field: "field", width: '' }],
                enableSorting: false,
                enableFilter: false
            };
            new (document.getElementById('iframeId').contentWindow.agGrid.Grid)(node, tables[id]);
            tables[id].api.setRowData([]);
        }
        var i = 0;
        var properties = tables[$(node).attr(_common.dataTableId)].columnDefs.reduce(function (prev, cur) {
            i++;
            prev.push({
                name: "Header " + i,
                key: "option" + i,
                //index: i - 1,
                optionNode: _this,
                inputtype: _inputs.TextValueInput,
                data: {
                    id: 'tableheader@oee',
                    headerName: cur.headerName,
                    field: cur.field,
                    width: cur.width
                },
                onChange: function onChange(node, value, input) {
                    var keyIndex = parseInt(this.key.substr('option'.length)) - 1;
                    var colDefs = tables[$(node).attr(_common.dataTableId)].columnDefs;
                    if (input.nodeName == 'BUTTON') {
                        colDefs = colDefs.filter(function (value, index) {
                            return index != keyIndex;
                        });
                        tables[$(node).attr(_common.dataTableId)].columnDefs = colDefs;
                        setColumnDefsAndRender(node, colDefs);
                    } else {
                        if (input.name == 'width') {
                            colDefs[keyIndex][input.name] = value && parseInt(value);
                        } else {
                            colDefs[keyIndex][input.name] = value;
                        }
                        // 重新渲染会失去输入框焦点，只需要用新的colDefs更新表格即可，右侧的部分不需要重新渲染。
                        tables[$(node).attr(_common.dataTableId)].api.setColumnDefs(colDefs);
                    }
                    return node;
                }
            });
            return prev;
        }, []);

        this.properties = this.properties.filter(function (property) {
            return property.key.indexOf("option") === -1;
        });
        (_properties = this.properties).unshift.apply(_properties, _toConsumableArray(properties));

        return node;
    },
    properties: [{
        name: "Theme",
        key: "theme",
        htmlAttr: "class",
        validValues: ['ag-theme-balham-dark', 'ag-theme-balham', 'ag-theme-blue', 'ag-theme-bootstrap', 'ag-theme-dark', 'ag-theme-fresh', 'ag-theme-material'],
        inputtype: _inputs.SelectInput,
        onChange: function onChange(node, value) {
            node.removeClass(this.validValues.join(" "));
            node.addClass(value);

            // Code copied form official site example https://www.ag-grid.com/example.php#/
            var gridOptions = tables[node.attr(_common.dataTableId)];
            gridOptions.api.resetRowHeights();
            gridOptions.api.redrawRows();
            gridOptions.api.refreshHeader();
            gridOptions.api.refreshToolPanel();
        },
        data: {
            options: [{
                value: "Default",
                text: ""
            }, {
                value: "ag-theme-balham",
                text: "Balham"
            }, {
                value: "ag-theme-balham-dark",
                text: "Balham (dark)"
            }, {
                value: "ag-theme-blue",
                text: "Blue"
            }, {
                value: "ag-theme-bootstrap",
                text: "Bootstrap"
            }, {
                value: "ag-theme-dark",
                text: "Dark"
            }, {
                value: "ag-theme-fresh",
                text: "Fresh"
            }, {
                value: "ag-theme-material",
                text: "Material"
            }]
        }
    }, {
        name: "",
        key: "addChild",
        inputtype: _inputs.ButtonInput,
        data: { text: "Add header" },
        onChange: function onChange(node) {
            var colDefs = tables[$(node).attr(_common.dataTableId)].columnDefs;
            colDefs.push({
                headerName: 'header',
                field: 'field',
                width: ''
            });

            setColumnDefsAndRender(node, colDefs);
            return node;
        }
    }]
};

exports.default = table;

},{"../../builder":52,"../../inputs/inputs":170,"../common":138}],181:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
function htmlGenerator(html) {
    var el = document.createElement('html');
    el.innerHTML = html;

    for (var _len = arguments.length, fns = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        fns[_key - 1] = arguments[_key];
    }

    fns.reduce(function (el, fn) {
        return fn(el);
    }, el);
    return $(el).prop('outerHTML');
}

exports.default = htmlGenerator;

},{}],180:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
// Toggle fullscreen
function launchFullScreen(document) {
    if (document.documentElement.requestFullScreen) {

        if (document.FullScreenElement) document.exitFullScreen();else document.documentElement.requestFullScreen();
        //mozilla		
    } else if (document.documentElement.mozRequestFullScreen) {

        if (document.mozFullScreenElement) document.mozCancelFullScreen();else document.documentElement.mozRequestFullScreen();
        //webkit	  
    } else if (document.documentElement.webkitRequestFullScreen) {

        if (document.webkitFullscreenElement) document.webkitExitFullscreen();else document.documentElement.webkitRequestFullScreen();
        //ie	  
    } else if (document.documentElement.msRequestFullscreen) {

        if (document.msFullScreenElement) document.msExitFullscreen();else document.documentElement.msRequestFullscreen();
    }
}

exports.launchFullScreen = launchFullScreen;

},{}],178:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
function downloadAsTextFile(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

exports.downloadAsTextFile = downloadAsTextFile;

},{}],177:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setDataConfigInfo = exports.setOnclickAttr = exports.getParsedConfigInfo = exports.getDateFmt = exports.getDataConfigInfo = exports.calendarOnclickSelector = exports.calendarSelector = exports.cloneWithoutOnclick = exports.replaceOtherShowingCalendarInputs = undefined;

var _common = require('../components/common');

var calendarSelector = 'input[' + _common.dataCalendarId + ']';
var calendarOnclickSelector = 'input[' + _common.dataCalendarId + '][onclick]';
// <input data-id="{'a', b}"> 替换包含'\''的属性值为合法的json字符串
function getDataConfigInfo(node) {
    return $(node).attr(_common.dataConfigInfo);
}

function getDataConfigInfoJSONString(node) {
    return getDataConfigInfo(node).replace(/'/g, '"');
}

function setDataConfigInfo(node, newValue) {
    $(node).attr(_common.dataConfigInfo, JSON.stringify(newValue).replace(/"/g, '\''));
}

function setOnclickAttr(node) {
    return $(node).attr('onclick', 'WdatePicker(' + getDataConfigInfo(node) + ')');
}

function getParsedConfigInfo(node) {
    return JSON.parse(getDataConfigInfoJSONString(node));
}

function getDateFmt(node) {
    return getParsedConfigInfo(node).dateFmt;
}

function cloneWithoutOnclick(node) {
    var $clone = $(node).removeAttr('onclick').clone();
    $(node).replaceWith($clone);
    return $clone;
}

function replaceOtherShowingCalendarInputs(element, context) {
    if (!$(element).is(calendarOnclickSelector)) {
        context.find(calendarOnclickSelector).each(function () {
            cloneWithoutOnclick(this);
        });
    }
}

exports.replaceOtherShowingCalendarInputs = replaceOtherShowingCalendarInputs;
exports.cloneWithoutOnclick = cloneWithoutOnclick;
exports.calendarSelector = calendarSelector;
exports.calendarOnclickSelector = calendarOnclickSelector;
exports.getDataConfigInfo = getDataConfigInfo;
exports.getDateFmt = getDateFmt;
exports.getParsedConfigInfo = getParsedConfigInfo;
exports.setOnclickAttr = setOnclickAttr;
exports.setDataConfigInfo = setDataConfigInfo;

},{"../components/common":138}],170:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FileUploadInput = exports.ColorInput = exports.ListInput = exports.SectionInput = exports.ButtonInput = exports.TextValueInput = exports.GridInput = exports.ProductsInput = exports.GridLayoutInput = exports.ValueTextInput = exports.ToggleInput = exports.RadioButtonInput = exports.RadioInput = exports.CssUnitInput = exports.NumberInput = exports.RangeInput = exports.LinkInput = exports.SelectInput = exports.CheckboxInput = exports.TextInput = exports.Input = undefined;

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _TextInput = require('./TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _CheckboxInput = require('./CheckboxInput');

var _CheckboxInput2 = _interopRequireDefault(_CheckboxInput);

var _SelectInput = require('./SelectInput');

var _SelectInput2 = _interopRequireDefault(_SelectInput);

var _LinkInput = require('./LinkInput');

var _LinkInput2 = _interopRequireDefault(_LinkInput);

var _RangeInput = require('./RangeInput');

var _RangeInput2 = _interopRequireDefault(_RangeInput);

var _NumberInput = require('./NumberInput');

var _NumberInput2 = _interopRequireDefault(_NumberInput);

var _CssUnitInput = require('./CssUnitInput');

var _CssUnitInput2 = _interopRequireDefault(_CssUnitInput);

var _ColorInput = require('./ColorInput');

var _ColorInput2 = _interopRequireDefault(_ColorInput);

var _FileUploadInput = require('./FileUploadInput');

var _FileUploadInput2 = _interopRequireDefault(_FileUploadInput);

var _RadioInput = require('./RadioInput');

var _RadioInput2 = _interopRequireDefault(_RadioInput);

var _RadioButtonInput = require('./RadioButtonInput');

var _RadioButtonInput2 = _interopRequireDefault(_RadioButtonInput);

var _ToggleInput = require('./ToggleInput');

var _ToggleInput2 = _interopRequireDefault(_ToggleInput);

var _ValueTextInput = require('./ValueTextInput');

var _ValueTextInput2 = _interopRequireDefault(_ValueTextInput);

var _GridLayoutInput = require('./GridLayoutInput');

var _GridLayoutInput2 = _interopRequireDefault(_GridLayoutInput);

var _ProductsInput = require('./ProductsInput');

var _ProductsInput2 = _interopRequireDefault(_ProductsInput);

var _GridInput = require('./GridInput');

var _GridInput2 = _interopRequireDefault(_GridInput);

var _TextValueInput = require('./TextValueInput');

var _TextValueInput2 = _interopRequireDefault(_TextValueInput);

var _ButtonInput = require('./ButtonInput');

var _ButtonInput2 = _interopRequireDefault(_ButtonInput);

var _SectionInput = require('./SectionInput');

var _SectionInput2 = _interopRequireDefault(_SectionInput);

var _ListInput = require('./ListInput');

var _ListInput2 = _interopRequireDefault(_ListInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Input = _Input2.default;
exports.TextInput = _TextInput2.default;
exports.CheckboxInput = _CheckboxInput2.default;
exports.SelectInput = _SelectInput2.default;
exports.LinkInput = _LinkInput2.default;
exports.RangeInput = _RangeInput2.default;
exports.NumberInput = _NumberInput2.default;
exports.CssUnitInput = _CssUnitInput2.default;
exports.RadioInput = _RadioInput2.default;
exports.RadioButtonInput = _RadioButtonInput2.default;
exports.ToggleInput = _ToggleInput2.default;
exports.ValueTextInput = _ValueTextInput2.default;
exports.GridLayoutInput = _GridLayoutInput2.default;
exports.ProductsInput = _ProductsInput2.default;
exports.GridInput = _GridInput2.default;
exports.TextValueInput = _TextValueInput2.default;
exports.ButtonInput = _ButtonInput2.default;
exports.SectionInput = _SectionInput2.default;
exports.ListInput = _ListInput2.default;
exports.ColorInput = _ColorInput2.default;
exports.FileUploadInput = _FileUploadInput2.default; /*
                                                     Copyright 2017 Ziadin Givan
                                                     
                                                     Licensed under the Apache License, Version 2.0 (the "License");
                                                     you may not use this file except in compliance with the License.
                                                     You may obtain a copy of the License at
                                                     
                                                        http://www.apache.org/licenses/LICENSE-2.0
                                                     
                                                     Unless required by applicable law or agreed to in writing, software
                                                     distributed under the License is distributed on an "AS IS" BASIS,
                                                     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                     See the License for the specific language governing permissions and
                                                     limitations under the License.
                                                     
                                                     https://github.com/givanz/VvvebJs
                                                     */

},{"./ButtonInput":149,"./CheckboxInput":150,"./ColorInput":151,"./CssUnitInput":152,"./FileUploadInput":153,"./GridInput":154,"./GridLayoutInput":155,"./Input":156,"./LinkInput":157,"./ListInput":158,"./NumberInput":159,"./ProductsInput":160,"./RadioButtonInput":161,"./RadioInput":162,"./RangeInput":163,"./SectionInput":164,"./SelectInput":165,"./TextInput":166,"./TextValueInput":167,"./ToggleInput":168,"./ValueTextInput":169}],169:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _TextInput = require("./TextInput");

var _TextInput2 = _interopRequireDefault(_TextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValueTextInput = $.extend({}, _TextInput2.default, {

	events: [["keyup", "onChange", "input"]],

	setValue: function setValue(value) {
		$('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textinput", data);
	}
});

exports.default = ValueTextInput;

},{"./TextInput":166}],168:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _TextInput = require('./TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToggleInput = $.extend({}, _TextInput2.default, {

	onChange: function onChange(event, node) {
		if (event.data && event.data.element) {
			event.data.element.trigger('propertyChange', [this.checked ? this.getAttribute("data-value-on") : this.getAttribute("data-value-off"), this]);
		}
	},

	events: [["change", "onChange", "input"]],

	setValue: function setValue(value) {
		$('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("toggle", data);
	}
});

exports.default = ToggleInput;

},{"./TextInput":166}],167:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require("./Input");

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextValueInput = $.extend({}, _Input2.default, {
	events: [["keyup", "onChange", "input"], ["click", "onChange", "button" /*'select'*/]],

	setValue: function setValue(value) {
		$('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textvalue", data);
	}

});

exports.default = TextValueInput;

},{"./Input":156}],165:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Input = require("./Input");

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectInput = $.extend({}, _Input2.default, {

    events: [["change", "onChange", "select"]],

    setValue: function setValue(value) {
        $('select', this.element).val(value);
    },

    init: function init(data) {
        return this.render("select", data);
    }

});

exports.default = SelectInput;

},{"./Input":156}],164:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require("./Input");

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SectionInput = $.extend({}, _Input2.default, {

	events: [["click", "onChange", "button" /*'select'*/]],

	setValue: function setValue(value) {
		return false;
	},

	init: function init(data) {
		return this.render("sectioninput", data);
	}

});

exports.default = SectionInput;

},{"./Input":156}],163:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require("./Input");

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RangeInput = $.extend({}, _Input2.default, {

	events: [["change", "onChange", "input"]],

	setValue: function setValue(value) {
		$('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("rangeinput", data);
	}
});

exports.default = RangeInput;

},{"./Input":156}],161:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _RadioInput = require("./RadioInput");

var _RadioInput2 = _interopRequireDefault(_RadioInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioButtonInput = $.extend({}, _RadioInput2.default, {

    init: function init(data) {
        return this.render("radiobuttoninput", data);
    }
});

exports.default = RadioButtonInput;

},{"./RadioInput":162}],162:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioInput = $.extend({}, _Input2.default, {

	onChange: function onChange(event, node) {

		if (event.data && event.data.element) {
			event.data.element.trigger('propertyChange', [this.value, this]);
		}
	},

	events: [["change", "onChange", "input"]],

	setValue: function setValue(value) {
		$('input', this.element).removeAttr('checked');
		if (value) $("input[value=" + value + "]", this.element).prop('checked', true);
	},

	init: function init(data) {
		return this.render("radioinput", data);
	}
});

exports.default = RadioInput;

},{"./Input":156}],160:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _TextInput = require("./TextInput");

var _TextInput2 = _interopRequireDefault(_TextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductsInput = $.extend({}, _TextInput2.default, {

	events: [["keyup", "onChange", "input"]],

	setValue: function setValue(value) {
		$('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textinput", data);
	}
});

exports.default = ProductsInput;

},{"./TextInput":166}],159:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require("./Input");

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NumberInput = $.extend({}, _Input2.default, {

	events: [["change", "onChange", "input"]],

	setValue: function setValue(value) {
		$('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("numberinput", data);
	}
});

exports.default = NumberInput;

},{"./Input":156}],158:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require("./Input");

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListInput = $.extend({}, _Input2.default, {

	events: [["change", "onChange", "select"]],

	setValue: function setValue(value) {
		$('select', this.element).val(value);
	},

	init: function init(data) {
		return this.render("listinput", data);
	}

});

exports.default = ListInput;

},{"./Input":156}],157:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _TextInput = require("./TextInput");

var _TextInput2 = _interopRequireDefault(_TextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinkInput = $.extend({}, _TextInput2.default, {

	events: [["change", "onChange", "input"]],

	setValue: function setValue(value) {
		$('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textinput", data);
	}
});

exports.default = LinkInput;

},{"./TextInput":166}],155:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _TextInput = require("./TextInput");

var _TextInput2 = _interopRequireDefault(_TextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridLayoutInput = $.extend({}, _TextInput2.default, {

	events: [["keyup", "onChange", "input"]],

	setValue: function setValue(value) {
		$('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textinput", data);
	}
});

exports.default = GridLayoutInput;

},{"./TextInput":166}],154:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require("./Input");

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridInput = $.extend({}, _Input2.default, {
	events: [["change", "onChange", "select" /*'select'*/], ["click", "onChange", "button" /*'select'*/]],

	setValue: function setValue(value) {
		$('select', this.element).val(value);
	},

	init: function init(data) {
		return this.render("grid", data);
	}

});

exports.default = GridInput;

},{"./Input":156}],153:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _TextInput = require("./TextInput");

var _TextInput2 = _interopRequireDefault(_TextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileUploadInput = $.extend({}, _TextInput2.default, {

	events: [["keyup", "onChange", "input"]],

	setValue: function setValue(value) {
		$('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textinput", data);
	}
});

exports.default = FileUploadInput;

},{"./TextInput":166}],166:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require("./Input");

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextInput = $.extend({}, _Input2.default, {

	events: [["keyup", "onChange", "input"]],

	setValue: function setValue(value) {
		$('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textinput", data);
	}
});

exports.default = TextInput;

},{"./Input":156}],152:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require("./Input");

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CssUnitInput = $.extend({}, _Input2.default, {

	number: 0,
	unit: "px",

	onChange: function onChange(event) {

		if (event.data && event.data.element) {
			input = event.data.input;
			input[this.name] = this.value; // this.name = unit or number	

			value = "";
			if (input.unit == "auto") {
				$(event.data.element).addClass("auto");
				value = input.unit;
			} else {
				$(event.data.element).removeClass("auto");
				value = input.number + input.unit;
			}

			event.data.element.trigger('propertyChange', [value, this]);
		}
	},

	events: [["change", "onChange", "select"], ["change", "onChange", "input"]],

	setValue: function setValue(value) {
		this.number = parseInt(value);
		this.unit = value.replace(this.number, '');

		if (this.unit == "auto") $(this.element).addClass("auto");

		$('input', this.element).val(this.number);
		$('select', this.element).val(this.unit);
	},

	init: function init(data) {
		return this.render("cssunitinput", data);
	}
});

exports.default = CssUnitInput;

},{"./Input":156}],151:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require("./Input");

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColorInput = $.extend({}, _Input2.default, {

	//html5 color input only supports setting values as hex colors even if the picker returns only rgb
	rgb2hex: function rgb2hex(rgb) {

		rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

		return rgb && rgb.length === 4 ? "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : rgb;
	},

	events: [["change", "onChange", "input"]],

	setValue: function setValue(value) {
		$('input', this.element).val(this.rgb2hex(value));
	},

	init: function init(data) {
		return this.render("colorinput", data);
	}
});

exports.default = ColorInput;

},{"./Input":156}],150:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxInput = $.extend({}, _Input2.default, {

	onChange: function onChange(event, node) {

		if (event.data && event.data.element) {
			event.data.element.trigger('propertyChange', [this.checked, this]);
		}
	},

	events: [["change", "onChange", "input"]],

	setValue: function setValue(value) {
		$('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("checkboxinput", data);
	}
});

exports.default = CheckboxInput;

},{"./Input":156}],149:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require("./Input");

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonInput = $.extend({}, _Input2.default, {

	events: [["click", "onChange", "button" /*'select'*/]],

	setValue: function setValue(value) {
		$('button', this.element).val(value);
	},

	init: function init(data) {
		return this.render("button", data);
	}

});

exports.default = ButtonInput;

},{"./Input":156}],156:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});
var Input = {

	init: function init(name) {},

	onChange: function onChange(event, node) {

		if (event.data && event.data.element) {
			event.data.element.trigger('propertyChange', [this.value, this]);
		}
	},

	renderTemplate: function renderTemplate(name, data) {
		return tmpl("vvveb-input-" + name, data);
	},

	render: function render(name, data) {
		this.element = $(this.renderTemplate(name, data));

		//bind events
		if (this.events) for (var i in this.events) {
			event = this.events[i][0];
			fun = this[this.events[i][1]];
			el = this.events[i][2];

			this.element.on(event, el, { element: this.element, input: this }, fun);
		}

		return this.element;
	}
};

exports.default = Input;

},{}],138:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var bgcolorClasses = ["bg-primary", "bg-secondary", "bg-success", "bg-danger", "bg-warning", "bg-info", "bg-light", "bg-dark", "bg-white"];

var bgcolorSelectOptions = [{
    value: "Default",
    text: ""
}, {
    value: "bg-primary",
    text: "Primary"
}, {
    value: "bg-secondary",
    text: "Secondary"
}, {
    value: "bg-success",
    text: "Success"
}, {
    value: "bg-danger",
    text: "Danger"
}, {
    value: "bg-warning",
    text: "Warning"
}, {
    value: "bg-info",
    text: "Info"
}, {
    value: "bg-light",
    text: "Light"
}, {
    value: "bg-dark",
    text: "Dark"
}, {
    value: "bg-white",
    text: "White"
}];

function changeNodeName(node, newNodeName) {
    var newNode;
    newNode = document.createElement(newNodeName);
    attributes = node.get(0).attributes;

    for (i = 0, len = attributes.length; i < len; i++) {
        newNode.setAttribute(attributes[i].nodeName, attributes[i].nodeValue);
    }

    $(newNode).append($(node).contents());
    $(node).replaceWith(newNode);

    return newNode;
}

var base_sort = 100; //start sorting for base component from 100 to allow extended properties to be first
function inc_base_sort() {
    return base_sort++;
}

var dataComponentId = 'data-component-id';
var dataTableId = 'data-table-id';
var dataCalendarId = 'data-calendar-id';
var dataConfigInfo = 'data-config-info';
var dataAutoSelectId = 'data-auto-select-id';
var dataButtonId = 'data-button-id';
var dataUrl = 'data-url';
var dataValueMapping = 'data-value-mapping';
var dataTextMapping = 'data-text-mapping';

exports.bgcolorClasses = bgcolorClasses;
exports.bgcolorSelectOptions = bgcolorSelectOptions;
exports.changeNodeName = changeNodeName;
exports.inc_base_sort = inc_base_sort;
exports.dataComponentId = dataComponentId;
exports.dataTableId = dataTableId;
exports.dataConfigInfo = dataConfigInfo;
exports.dataCalendarId = dataCalendarId;
exports.dataUrl = dataUrl;
exports.dataAutoSelectId = dataAutoSelectId;
exports.dataButtonId = dataButtonId;
exports.dataValueMapping = dataValueMapping;
exports.dataTextMapping = dataTextMapping;

},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGRlci5qcyIsInNyYy91dGlsL2pzb3VwLmpzIiwic3JjL3V0aWwvdW51c2VkVGFncy5qcyIsInNyYy91dGlsL3N1Ym1pdGJ1dHRvbi5qcyIsInNyYy90ZW1wbGF0ZXMvdGFibGUuanMiLCJzcmMvdGVtcGxhdGVzL3N1Ym1pdGZvcm0uanMiLCJzcmMvdGVtcGxhdGVzL2F1dG9zZWxlY3RpbnB1dC5qcyIsInNyYy91dGlsL3NlbGVjdG9ycy5qcyIsInNyYy9jb21wb25lbnRzL0BvZWUvdGFibGUuanMiLCJzcmMvdXRpbC9odG1sR2VuZXJhdG9yLmpzIiwic3JjL3V0aWwvZnVsbFNjcmVlbi5qcyIsInNyYy91dGlsL2Rvd25sb2FkLmpzIiwic3JjL3V0aWwvY2FsZW5kYXIuanMiLCJzcmMvaW5wdXRzL2lucHV0cy5qcyIsInNyYy9pbnB1dHMvVmFsdWVUZXh0SW5wdXQuanMiLCJzcmMvaW5wdXRzL1RvZ2dsZUlucHV0LmpzIiwic3JjL2lucHV0cy9UZXh0VmFsdWVJbnB1dC5qcyIsInNyYy9pbnB1dHMvU2VsZWN0SW5wdXQuanMiLCJzcmMvaW5wdXRzL1NlY3Rpb25JbnB1dC5qcyIsInNyYy9pbnB1dHMvUmFuZ2VJbnB1dC5qcyIsInNyYy9pbnB1dHMvUmFkaW9CdXR0b25JbnB1dC5qcyIsInNyYy9pbnB1dHMvUmFkaW9JbnB1dC5qcyIsInNyYy9pbnB1dHMvUHJvZHVjdHNJbnB1dC5qcyIsInNyYy9pbnB1dHMvTnVtYmVySW5wdXQuanMiLCJzcmMvaW5wdXRzL0xpc3RJbnB1dC5qcyIsInNyYy9pbnB1dHMvTGlua0lucHV0LmpzIiwic3JjL2lucHV0cy9HcmlkTGF5b3V0SW5wdXQuanMiLCJzcmMvaW5wdXRzL0dyaWRJbnB1dC5qcyIsInNyYy9pbnB1dHMvRmlsZVVwbG9hZElucHV0LmpzIiwic3JjL2lucHV0cy9UZXh0SW5wdXQuanMiLCJzcmMvaW5wdXRzL0Nzc1VuaXRJbnB1dC5qcyIsInNyYy9pbnB1dHMvQ29sb3JJbnB1dC5qcyIsInNyYy9pbnB1dHMvQ2hlY2tib3hJbnB1dC5qcyIsInNyYy9pbnB1dHMvQnV0dG9uSW5wdXQuanMiLCJzcmMvaW5wdXRzL0lucHV0LmpzIiwic3JjL2NvbXBvbmVudHMvY29tbW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBOztBQUNBOztBQUlBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxDQUFDLFlBQVk7QUFDWixLQUFJLFFBQVEsRUFBWjs7QUFFQSxNQUFLLElBQUwsR0FBWSxTQUFTLElBQVQsQ0FBYyxHQUFkLEVBQW1CLElBQW5CLEVBQXlCO0FBQ3BDO0FBQ0E7QUFDQSxNQUFJLEtBQUssa0JBQWtCLElBQWxCLENBQXVCLEdBQXZCLElBQ1IsTUFBTSxHQUFOLElBQWEsTUFBTSxHQUFOLEtBQ2IsS0FBSyxTQUFTLGNBQVQsQ0FBd0IsR0FBeEIsRUFBNkIsU0FBbEMsQ0FGUTs7QUFJUjtBQUNBO0FBQ0EsTUFBSSxRQUFKLENBQWEsS0FBYixFQUNDOztBQUVBO0FBQ0Esc0JBSEE7O0FBS0E7QUFDQSxNQUNFLE9BREYsQ0FDVSxXQURWLEVBQ3VCLEdBRHZCLEVBRUUsS0FGRixDQUVRLElBRlIsRUFFYyxJQUZkLENBRW1CLElBRm5CLEVBR0UsT0FIRixDQUdVLGtCQUhWLEVBRzhCLE1BSDlCLEVBSUUsT0FKRixDQUlVLGFBSlYsRUFJeUIsUUFKekIsRUFLRSxLQUxGLENBS1EsSUFMUixFQUtjLElBTGQsQ0FLbUIsS0FMbkIsRUFNRSxLQU5GLENBTVEsSUFOUixFQU1jLElBTmQsQ0FNbUIsVUFObkIsRUFPRSxLQVBGLENBT1EsSUFQUixFQU9jLElBUGQsQ0FPbUIsS0FQbkIsQ0FOQSxHQWNFLHdCQWZILENBTkQ7QUFzQkE7QUFDQSxTQUFPLE9BQU8sR0FBRyxJQUFILENBQVAsR0FBa0IsRUFBekI7QUFDQSxFQTNCRDtBQTRCQSxDQS9CRDs7QUFpQ0EsSUFBSSxRQUFTLFlBQVk7QUFDeEIs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WSxVQUF6Qjs7QUFFQSxTQUFLLElBQUksQ0FBSixFQUFPLE1BQU0sV0FBVyxNQUE3QixFQUFxQyxJQUFJLEdBQXpDLEVBQThDLEdBQTlDLEVBQW1EO0FBQy9DLGdCQUFRLFlBQVIsQ0FBcUIsV0FBVyxDQUFYLEVBQWMsUUFBbkMsRUFBNkMsV0FBVyxDQUFYLEVBQWMsU0FBM0Q7QUFDSDs7QUFFRCxNQUFFLE9BQUYsRUFBVyxNQUFYLENBQWtCLEVBQUUsSUFBRixFQUFRLFFBQVIsRUFBbEI7QUFDQSxNQUFFLElBQUYsRUFBUSxXQUFSLENBQW9CLE9BQXBCOztBQUVBLFdBQU8sT0FBUDtBQUNIOztBQUVELElBQUksWUFBWSxHQUFoQixDLENBQW9CO0FBQ3BCLFNBQVMsYUFBVCxHQUF5QjtBQUNyQixXQUFPLFdBQVA7QUFDSDs7QUFFRCxJQUFNLGtCQUFrQixtQkFBeEI7QUFDQSxJQUFNLGNBQWMsZUFBcEI7QUFDQSxJQUFNLGlCQUFpQixrQkFBdkI7QUFDQSxJQUFNLGlCQUFpQixrQkFBdkI7QUFDQSxJQUFNLG1CQUFtQixxQkFBekI7QUFDQSxJQUFNLGVBQWUsZ0JBQXJCO0FBQ0EsSUFBTSxVQUFVLFVBQWhCO0FBQ0EsSUFBTSxtQkFBbUIsb0JBQXpCO0FBQ0EsSUFBTSxrQkFBa0IsbUJBQXhCOztRQUdJLGMsR0FBQSxjO1FBQWdCLG9CLEdBQUEsb0I7UUFBc0IsYyxHQUFBLGM7UUFBZ0IsYSxHQUFBLGE7UUFBZSxlLEdBQUEsZTtRQUFpQixXLEdBQUEsVztRQUN0RixjLEdBQUEsYztRQUFnQixjLEdBQUEsYztRQUFnQixPLEdBQUEsTztRQUFTLGdCLEdBQUEsZ0I7UUFBa0IsWSxHQUFBLFk7UUFBYyxnQixHQUFBLGdCO1FBQWtCLGUsR0FBQSxlIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgU2VjdGlvbklucHV0IH0gZnJvbSAnLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHtcclxuXHRyZW1vdmVVbnVzZWRUYWdzLCBlbXB0eUNoaWxkcmVuLCBnZW5lcmF0ZVRhYmxlU2NyaXB0LCBnZW5lcmF0ZUNhbGVuZGFyT25jbGlja0F0dHIsXHJcblx0Z2VuZXJhdGVTZWxlY3RPcHRpb25zU2NyaXB0LCBnZW5lcmF0ZVN1Ym1pdEZvcm1TY3JpcHQsIGdlbmVyYXRlQnV0dG9uT25jbGlja0F0dHJcclxufSBmcm9tICcuL3V0aWwvanNvdXAnO1xyXG5pbXBvcnQgeyBkb3dubG9hZEFzVGV4dEZpbGUgfSBmcm9tICcuL3V0aWwvZG93bmxvYWQnO1xyXG5pbXBvcnQgeyBsYXVuY2hGdWxsU2NyZWVuIH0gZnJvbSAnLi91dGlsL2Z1bGxTY3JlZW4nO1xyXG5pbXBvcnQgeyBkYXRhQ29tcG9uZW50SWQsIGRhdGFDYWxlbmRhcklkIH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbW1vbidcclxuaW1wb3J0IGh0bWxHZW5lcmF0b3IgZnJvbSAnLi91dGlsL2h0bWxHZW5lcmF0b3InO1xyXG5pbXBvcnQgeyByZXBsYWNlT3RoZXJTaG93aW5nQ2FsZW5kYXJJbnB1dHMgfSBmcm9tICcuL3V0aWwvY2FsZW5kYXInO1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgY2FjaGUgPSB7fTtcclxuXHJcblx0dGhpcy50bXBsID0gZnVuY3Rpb24gdG1wbChzdHIsIGRhdGEpIHtcclxuXHRcdC8vIEZpZ3VyZSBvdXQgaWYgd2UncmUgZ2V0dGluZyBhIHRlbXBsYXRlLCBvciBpZiB3ZSBuZWVkIHRvXHJcblx0XHQvLyBsb2FkIHRoZSB0ZW1wbGF0ZSAtIGFuZCBiZSBzdXJlIHRvIGNhY2hlIHRoZSByZXN1bHQuXHJcblx0XHR2YXIgZm4gPSAvXlstYS16QS1aMC05XSskLy50ZXN0KHN0cikgP1xyXG5cdFx0XHRjYWNoZVtzdHJdID0gY2FjaGVbc3RyXSB8fFxyXG5cdFx0XHR0bXBsKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHN0cikuaW5uZXJIVE1MKSA6XHJcblxyXG5cdFx0XHQvLyBHZW5lcmF0ZSBhIHJldXNhYmxlIGZ1bmN0aW9uIHRoYXQgd2lsbCBzZXJ2ZSBhcyBhIHRlbXBsYXRlXHJcblx0XHRcdC8vIGdlbmVyYXRvciAoYW5kIHdoaWNoIHdpbGwgYmUgY2FjaGVkKS5cclxuXHRcdFx0bmV3IEZ1bmN0aW9uKFwib2JqXCIsXHJcblx0XHRcdFx0XCJ2YXIgcD1bXSxwcmludD1mdW5jdGlvbigpe3AucHVzaC5hcHBseShwLGFyZ3VtZW50cyk7fTtcIiArXHJcblxyXG5cdFx0XHRcdC8vIEludHJvZHVjZSB0aGUgZGF0YSBhcyBsb2NhbCB2YXJpYWJsZXMgdXNpbmcgd2l0aCgpe31cclxuXHRcdFx0XHRcIndpdGgob2JqKXtwLnB1c2goJ1wiICtcclxuXHJcblx0XHRcdFx0Ly8gQ29udmVydCB0aGUgdGVtcGxhdGUgaW50byBwdXJlIEphdmFTY3JpcHRcclxuXHRcdFx0XHRzdHJcclxuXHRcdFx0XHRcdC5yZXBsYWNlKC9bXFxyXFx0XFxuXS9nLCBcIiBcIilcclxuXHRcdFx0XHRcdC5zcGxpdChcInslXCIpLmpvaW4oXCJcXHRcIilcclxuXHRcdFx0XHRcdC5yZXBsYWNlKC8oKF58JX0pW15cXHRdKiknL2csIFwiJDFcXHJcIilcclxuXHRcdFx0XHRcdC5yZXBsYWNlKC9cXHQ9KC4qPyklfS9nLCBcIicsJDEsJ1wiKVxyXG5cdFx0XHRcdFx0LnNwbGl0KFwiXFx0XCIpLmpvaW4oXCInKTtcIilcclxuXHRcdFx0XHRcdC5zcGxpdChcIiV9XCIpLmpvaW4oXCJwLnB1c2goJ1wiKVxyXG5cdFx0XHRcdFx0LnNwbGl0KFwiXFxyXCIpLmpvaW4oXCJcXFxcJ1wiKVxyXG5cdFx0XHRcdCsgXCInKTt9cmV0dXJuIHAuam9pbignJyk7XCIpO1xyXG5cdFx0Ly8gUHJvdmlkZSBzb21lIGJhc2ljIGN1cnJ5aW5nIHRvIHRoZSB1c2VyXHJcblx0XHRyZXR1cm4gZGF0YSA/IGZuKGRhdGEpIDogZm47XHJcblx0fTtcclxufSkoKTtcclxuXHJcbnZhciBkZWxheSA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHRpbWVyID0gMDtcclxuXHRyZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrLCBtcykge1xyXG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuXHRcdHRpbWVyID0gc2V0VGltZW91dChjYWxsYmFjaywgbXMpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBnZXRTdHlsZShlbCwgc3R5bGVQcm9wKSB7XHJcblx0dmFsdWUgPSBcIlwiO1xyXG5cdC8vdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWwpO1xyXG5cdGlmIChlbC5zdHlsZSAmJiBlbC5zdHlsZS5sZW5ndGggPiAwICYmIGVsLnN0eWxlW3N0eWxlUHJvcF0pLy9jaGVjayBpbmxpbmVcclxuXHRcdHZhciB2YWx1ZSA9IGVsLnN0eWxlW3N0eWxlUHJvcF07XHJcblx0ZWxzZVxyXG5cdFx0aWYgKGVsLmN1cnJlbnRTdHlsZSlcdC8vY2hlY2sgZGVmaW5lZCBjc3NcclxuXHRcdFx0dmFyIHZhbHVlID0gZWwuY3VycmVudFN0eWxlW3N0eWxlUHJvcF07XHJcblx0XHRlbHNlIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xyXG5cdFx0XHR2YXIgdmFsdWUgPSBkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXREZWZhdWx0Q29tcHV0ZWRTdHlsZSA/XHJcblx0XHRcdFx0ZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0RGVmYXVsdENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoc3R5bGVQcm9wKSA6XHJcblx0XHRcdFx0d2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoc3R5bGVQcm9wKTtcclxuXHRcdH1cclxuXHJcblx0cmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5pZiAoVnZ2ZWIgPT09IHVuZGVmaW5lZCkgdmFyIFZ2dmViID0ge307XHJcblxyXG5WdnZlYi5kZWZhdWx0Q29tcG9uZW50ID0gXCJfYmFzZVwiO1xyXG5WdnZlYi5wcmVzZXJ2ZVByb3BlcnR5U2VjdGlvbnMgPSB0cnVlO1xyXG5cclxuVnZ2ZWIuYmFzZVVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgPyBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYy5yZXBsYWNlKC9bXlxcL10qP1xcLmpzJC8sICcnKSA6ICcnO1xyXG5cclxuVnZ2ZWIuQ29tcG9uZW50c0dyb3VwID0ge307XHJcblxyXG5WdnZlYi5Db21wb25lbnRzID0ge1xyXG5cdF9jb21wb25lbnRzOiB7fSxcclxuXHJcblx0X25vZGVzTG9va3VwOiB7fSxcclxuXHJcblx0X2F0dHJpYnV0ZXNMb29rdXA6IHt9LFxyXG5cclxuXHRfY2xhc3Nlc0xvb2t1cDoge30sXHJcblxyXG5cdF9jbGFzc2VzUmVnZXhMb29rdXA6IHt9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAodXJsKSB7XHJcblx0fSxcclxuXHJcblx0Z2V0OiBmdW5jdGlvbiAodHlwZSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NvbXBvbmVudHNbdHlwZV07XHJcblx0fSxcclxuXHJcblx0YWRkOiBmdW5jdGlvbiAodHlwZSwgZGF0YSkge1xyXG5cdFx0ZGF0YS50eXBlID0gdHlwZTtcclxuXHJcblx0XHR0aGlzLl9jb21wb25lbnRzW3R5cGVdID0gZGF0YTtcclxuXHJcblx0XHRpZiAoZGF0YS5ub2Rlcykge1xyXG5cdFx0XHRmb3IgKHZhciBpIGluIGRhdGEubm9kZXMpIHtcclxuXHRcdFx0XHR0aGlzLl9ub2Rlc0xvb2t1cFtkYXRhLm5vZGVzW2ldXSA9IGRhdGE7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZGF0YS5hdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGlmIChkYXRhLmF0dHJpYnV0ZXMuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSBpbiBkYXRhLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRcdHRoaXMuX2F0dHJpYnV0ZXNMb29rdXBbZGF0YS5hdHRyaWJ1dGVzW2ldXSA9IGRhdGE7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGZvciAodmFyIGkgaW4gZGF0YS5hdHRyaWJ1dGVzKSB7XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIHRoaXMuX2F0dHJpYnV0ZXNMb29rdXBbaV0gPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuX2F0dHJpYnV0ZXNMb29rdXBbaV0gPSB7fTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoZGF0YS5hdHRyaWJ1dGVzW2ldLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xyXG5cdFx0XHRcdFx0XHQvLyDmlK/mjIF0ZXh0aW5wdXTkuK3kuI3lkIznmoTovpPlhaXnsbvlnothdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBbJ3RleHQnLCAncGFzc3dvcmQnXSB9LFxyXG5cdFx0XHRcdFx0XHRkYXRhLmF0dHJpYnV0ZXNbaV0uZm9yRWFjaCh2YWx1ZSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlc0xvb2t1cFtpXVt2YWx1ZV0gPSBkYXRhO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuX2F0dHJpYnV0ZXNMb29rdXBbaV1bZGF0YS5hdHRyaWJ1dGVzW2ldXSA9IGRhdGE7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGRhdGEuY2xhc3Nlcykge1xyXG5cdFx0XHRmb3IgKHZhciBpIGluIGRhdGEuY2xhc3Nlcykge1xyXG5cdFx0XHRcdHRoaXMuX2NsYXNzZXNMb29rdXBbZGF0YS5jbGFzc2VzW2ldXSA9IGRhdGE7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZGF0YS5jbGFzc2VzUmVnZXgpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBkYXRhLmNsYXNzZXNSZWdleCkge1xyXG5cdFx0XHRcdHRoaXMuX2NsYXNzZXNSZWdleExvb2t1cFtkYXRhLmNsYXNzZXNSZWdleFtpXV0gPSBkYXRhO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZXh0ZW5kOiBmdW5jdGlvbiAoaW5oZXJpdFR5cGUsIHR5cGUsIGRhdGEpIHtcclxuXHJcblx0XHRuZXdEYXRhID0gZGF0YTtcclxuXHJcblx0XHRpZiAoaW5oZXJpdERhdGEgPSB0aGlzLl9jb21wb25lbnRzW2luaGVyaXRUeXBlXSkge1xyXG5cdFx0XHRuZXdEYXRhID0gJC5leHRlbmQodHJ1ZSwge30sIGluaGVyaXREYXRhLCBkYXRhKTtcclxuXHRcdFx0bmV3RGF0YS5wcm9wZXJ0aWVzID0gJC5tZXJnZSgkLm1lcmdlKFtdLCBpbmhlcml0RGF0YS5wcm9wZXJ0aWVzID8gaW5oZXJpdERhdGEucHJvcGVydGllcyA6IFtdKSwgZGF0YS5wcm9wZXJ0aWVzID8gZGF0YS5wcm9wZXJ0aWVzIDogW10pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vc29ydCBieSBvcmRlclxyXG5cdFx0bmV3RGF0YS5wcm9wZXJ0aWVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBhLnNvcnQgPT09IFwidW5kZWZpbmVkXCIpIGEuc29ydCA9IDA7XHJcblx0XHRcdGlmICh0eXBlb2YgYi5zb3J0ID09PSBcInVuZGVmaW5lZFwiKSBiLnNvcnQgPSAwO1xyXG5cclxuXHRcdFx0aWYgKGEuc29ydCA8IGIuc29ydClcclxuXHRcdFx0XHRyZXR1cm4gLTE7XHJcblx0XHRcdGlmIChhLnNvcnQgPiBiLnNvcnQpXHJcblx0XHRcdFx0cmV0dXJuIDE7XHJcblx0XHRcdHJldHVybiAwO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdHRoaXMuYWRkKHR5cGUsIG5ld0RhdGEpO1xyXG5cdH0sXHJcblxyXG5cclxuXHRtYXRjaE5vZGU6IGZ1bmN0aW9uIChub2RlKSB7XHJcblx0XHRpZiAoJChub2RlKS5hdHRyKGRhdGFDb21wb25lbnRJZCkgJiYgdGhpcy5fY29tcG9uZW50c1skKG5vZGUpLmF0dHIoZGF0YUNvbXBvbmVudElkKV0pIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2NvbXBvbmVudHNbJChub2RlKS5hdHRyKGRhdGFDb21wb25lbnRJZCldO1xyXG5cdFx0fSBlbHNlIGlmICgkKG5vZGUpLmF0dHIoJ3R5cGUnKSA9PSAncmFkaW8nIHx8ICQobm9kZSkuYXR0cigndHlwZScpID09ICdjaGVja2JveCcpIHtcclxuXHRcdFx0Y29uc3QgJHBhcmVudCA9ICQobm9kZSkucGFyZW50KCk7XHJcblx0XHRcdGlmICgkcGFyZW50LmF0dHIoZGF0YUNvbXBvbmVudElkKSAmJiB0aGlzLl9jb21wb25lbnRzWyRwYXJlbnQuYXR0cihkYXRhQ29tcG9uZW50SWQpXSkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLl9jb21wb25lbnRzWyRwYXJlbnQuYXR0cihkYXRhQ29tcG9uZW50SWQpXVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG5vZGUuYXR0cmlidXRlcy5sZW5ndGgpIHtcclxuXHRcdFx0Ly9zZWFyY2ggZm9yIGF0dHJpYnV0ZXNcclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBub2RlLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRhdHRyID0gbm9kZS5hdHRyaWJ1dGVzW2ldLm5hbWU7XHJcblx0XHRcdFx0dmFsdWUgPSBub2RlLmF0dHJpYnV0ZXNbaV0udmFsdWU7XHJcblxyXG5cdFx0XHRcdGlmIChhdHRyIGluIHRoaXMuX2F0dHJpYnV0ZXNMb29rdXApIHtcclxuXHRcdFx0XHRcdGNvbXBvbmVudCA9IHRoaXMuX2F0dHJpYnV0ZXNMb29rdXBbYXR0cl07XHJcblxyXG5cdFx0XHRcdFx0Ly9jdXJyZW50bHkgd2UgY2hlY2sgdGhhdCBpcyBub3QgYSBjb21wb25lbnQgYnkgbG9va2luZyBhdCBuYW1lIGF0dHJpYnV0ZVxyXG5cdFx0XHRcdFx0Ly9pZiB3ZSBoYXZlIGEgY29sbGVjdGlvbiBvZiBvYmplY3RzIGl0IG1lYW5zIHRoYXQgYXR0cmlidXRlIHZhbHVlIG11c3QgYmUgY2hlY2tlZFxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBjb21wb25lbnRbXCJuYW1lXCJdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdFx0XHRcdGlmICh2YWx1ZSBpbiBjb21wb25lbnQpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gY29tcG9uZW50W3ZhbHVlXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlXHJcblx0XHRcdFx0XHRcdHJldHVybiBjb21wb25lbnQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpIGluIG5vZGUuYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdGF0dHIgPSBub2RlLmF0dHJpYnV0ZXNbaV0ubmFtZTtcclxuXHRcdFx0XHR2YWx1ZSA9IG5vZGUuYXR0cmlidXRlc1tpXS52YWx1ZTtcclxuXHJcblx0XHRcdFx0Ly9jaGVjayBmb3Igbm9kZSBjbGFzc2VzXHJcblx0XHRcdFx0aWYgKGF0dHIgPT0gXCJjbGFzc1wiKSB7XHJcblx0XHRcdFx0XHRjbGFzc2VzID0gdmFsdWUuc3BsaXQoXCIgXCIpO1xyXG5cclxuXHRcdFx0XHRcdGZvciAoaiBpbiBjbGFzc2VzKSB7XHJcblx0XHRcdFx0XHRcdGlmIChjbGFzc2VzW2pdIGluIHRoaXMuX2NsYXNzZXNMb29rdXApXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2NsYXNzZXNMb29rdXBbY2xhc3Nlc1tqXV07XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Zm9yIChyZWdleCBpbiB0aGlzLl9jbGFzc2VzUmVnZXhMb29rdXApIHtcclxuXHRcdFx0XHRcdFx0cmVnZXhPYmogPSBuZXcgUmVnRXhwKHJlZ2V4KTtcclxuXHRcdFx0XHRcdFx0aWYgKHJlZ2V4T2JqLmV4ZWModmFsdWUpKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2NsYXNzZXNSZWdleExvb2t1cFtyZWdleF07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0YWdOYW1lID0gbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRpZiAodGFnTmFtZSBpbiB0aGlzLl9ub2Rlc0xvb2t1cCkgcmV0dXJuIHRoaXMuX25vZGVzTG9va3VwW3RhZ05hbWVdO1xyXG5cclxuXHRcdC8vcmV0dXJuIGZhbHNlO1xyXG5cdFx0cmV0dXJuIHRoaXMuZ2V0KFZ2dmViLmRlZmF1bHRDb21wb25lbnQpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24gKHR5cGUpIHtcclxuXHJcblx0XHRjb21wb25lbnQgPSB0aGlzLl9jb21wb25lbnRzW3R5cGVdO1xyXG5cclxuXHRcdHJpZ2h0UGFuZWwgPSBqUXVlcnkoXCIjcmlnaHQtcGFuZWwgI2NvbXBvbmVudC1wcm9wZXJ0aWVzXCIpO1xyXG5cdFx0c2VjdGlvbiA9IHJpZ2h0UGFuZWwuZmluZCgnLnNlY3Rpb25bZGF0YS1zZWN0aW9uPVwiZGVmYXVsdFwiXScpO1xyXG5cclxuXHRcdGlmICghKFZ2dmViLnByZXNlcnZlUHJvcGVydHlTZWN0aW9ucyAmJiBzZWN0aW9uLmxlbmd0aCkpIHtcclxuXHRcdFx0cmlnaHRQYW5lbC5odG1sKCcnKS5hcHBlbmQodG1wbChcInZ2dmViLWlucHV0LXNlY3Rpb25pbnB1dFwiLCB7IGtleTogXCJkZWZhdWx0XCIsIGhlYWRlcjogY29tcG9uZW50Lm5hbWUgfSkpO1xyXG5cdFx0XHRzZWN0aW9uID0gcmlnaHRQYW5lbC5maW5kKFwiLnNlY3Rpb25cIik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmlnaHRQYW5lbC5maW5kKCdbZGF0YS1oZWFkZXI9XCJkZWZhdWx0XCJdIHNwYW4nKS5odG1sKGNvbXBvbmVudC5uYW1lKTtcclxuXHRcdHNlY3Rpb24uaHRtbChcIlwiKVxyXG5cclxuXHRcdGlmIChjb21wb25lbnQuYmVmb3JlSW5pdCkgY29tcG9uZW50LmJlZm9yZUluaXQoVnZ2ZWIuQnVpbGRlci5zZWxlY3RlZEVsLmdldCgwKSk7XHJcblxyXG5cdFx0Zm4gPSBmdW5jdGlvbiAoY29tcG9uZW50LCBwcm9wZXJ0eSkge1xyXG5cdFx0XHRyZXR1cm4gcHJvcGVydHkuaW5wdXQub24oJ3Byb3BlcnR5Q2hhbmdlJywgZnVuY3Rpb24gKGV2ZW50LCB2YWx1ZSwgaW5wdXQpIHtcclxuXHRcdFx0XHRlbGVtZW50ID0gVnZ2ZWIuQnVpbGRlci5zZWxlY3RlZEVsO1xyXG5cdFx0XHRcdGlmIChwcm9wZXJ0eS5jaGlsZCkgZWxlbWVudCA9IGVsZW1lbnQuZmluZChwcm9wZXJ0eS5jaGlsZCk7XHJcblx0XHRcdFx0aWYgKHByb3BlcnR5LnBhcmVudCkgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50KHByb3BlcnR5LnBhcmVudCk7XHJcblxyXG5cdFx0XHRcdGlmIChwcm9wZXJ0eS5vbkNoYW5nZSkge1xyXG5cdFx0XHRcdFx0ZWxlbWVudCA9IHByb3BlcnR5Lm9uQ2hhbmdlKGVsZW1lbnQsIHZhbHVlLCBpbnB1dCwgY29tcG9uZW50KTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5Lmh0bWxBdHRyKSB7XHJcblx0XHRcdFx0XHRvbGRWYWx1ZSA9IGVsZW1lbnQuYXR0cihwcm9wZXJ0eS5odG1sQXR0cik7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHByb3BlcnR5Lmh0bWxBdHRyID09ICd0ZXh0Jykge1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50LnRleHQodmFsdWUpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eS5odG1sQXR0ciA9PSBcImNsYXNzXCIgJiYgcHJvcGVydHkudmFsaWRWYWx1ZXMpIHtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudC5yZW1vdmVDbGFzcyhwcm9wZXJ0eS52YWxpZFZhbHVlcy5qb2luKFwiIFwiKSk7XHJcblx0XHRcdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LmFkZENsYXNzKHZhbHVlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKHByb3BlcnR5Lmh0bWxBdHRyID09IFwic3R5bGVcIikge1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5jc3MocHJvcGVydHkua2V5LCB2YWx1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQuYXR0cihwcm9wZXJ0eS5odG1sQXR0ciwgdmFsdWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdFx0XHR0eXBlOiAnYXR0cmlidXRlcycsXHJcblx0XHRcdFx0XHRcdHRhcmdldDogZWxlbWVudC5nZXQoMCksXHJcblx0XHRcdFx0XHRcdGF0dHJpYnV0ZU5hbWU6IHByb3BlcnR5Lmh0bWxBdHRyLFxyXG5cdFx0XHRcdFx0XHRvbGRWYWx1ZTogb2xkVmFsdWUsXHJcblx0XHRcdFx0XHRcdG5ld1ZhbHVlOiBlbGVtZW50LmF0dHIocHJvcGVydHkuaHRtbEF0dHIpXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChjb21wb25lbnQub25DaGFuZ2UpIHtcclxuXHRcdFx0XHRcdGVsZW1lbnQgPSBjb21wb25lbnQub25DaGFuZ2UoZWxlbWVudCwgcHJvcGVydHksIHZhbHVlLCBpbnB1dCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoIXByb3BlcnR5LmNoaWxkICYmICFwcm9wZXJ0eS5wYXJlbnQpIFZ2dmViLkJ1aWxkZXIuc2VsZWN0Tm9kZShlbGVtZW50KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdG5vZGVFbGVtZW50ID0gVnZ2ZWIuQnVpbGRlci5zZWxlY3RlZEVsO1xyXG5cclxuXHRcdGZvciAodmFyIGkgaW4gY29tcG9uZW50LnByb3BlcnRpZXMpIHtcclxuXHRcdFx0cHJvcGVydHkgPSBjb21wb25lbnQucHJvcGVydGllc1tpXTtcclxuXHJcblx0XHRcdGlmIChwcm9wZXJ0eS5iZWZvcmVJbml0KSBwcm9wZXJ0eS5iZWZvcmVJbml0KGVsZW1lbnQuZ2V0KDApKVxyXG5cclxuXHRcdFx0ZWxlbWVudCA9IG5vZGVFbGVtZW50O1xyXG5cdFx0XHRpZiAocHJvcGVydHkuY2hpbGQpIGVsZW1lbnQgPSBlbGVtZW50LmZpbmQocHJvcGVydHkuY2hpbGQpO1xyXG5cclxuXHRcdFx0aWYgKHByb3BlcnR5LmRhdGEpIHtcclxuXHRcdFx0XHRwcm9wZXJ0eS5kYXRhW1wia2V5XCJdID0gcHJvcGVydHkua2V5O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHByb3BlcnR5LmRhdGEgPSB7IFwia2V5XCI6IHByb3BlcnR5LmtleSB9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIHByb3BlcnR5Lmdyb3VwID09PSAndW5kZWZpbmVkJykgcHJvcGVydHkuZ3JvdXAgPSBudWxsO1xyXG5cclxuXHRcdFx0cHJvcGVydHkuaW5wdXQgPSBwcm9wZXJ0eS5pbnB1dHR5cGUuaW5pdChwcm9wZXJ0eS5kYXRhKTtcclxuXHJcblx0XHRcdGlmIChwcm9wZXJ0eS5pbml0KSB7XHJcblx0XHRcdFx0cHJvcGVydHkuaW5wdXR0eXBlLnNldFZhbHVlKHByb3BlcnR5LmluaXQoZWxlbWVudC5nZXQoMCkpKTtcclxuXHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eS5odG1sQXR0cikge1xyXG5cdFx0XHRcdGlmIChwcm9wZXJ0eS5odG1sQXR0ciA9PSAndGV4dCcpIHtcclxuXHRcdFx0XHRcdHZhbHVlID0gZWxlbWVudC50ZXh0KCk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eS5odG1sQXR0ciA9PSBcInN0eWxlXCIpIHtcclxuXHRcdFx0XHRcdC8vdmFsdWUgPSBlbGVtZW50LmNzcyhwcm9wZXJ0eS5rZXkpOy8vanF1ZXJ5IGNzcyByZXR1cm5zIGNvbXB1dGVkIHN0eWxlXHJcblx0XHRcdFx0XHR2YWx1ZSA9IGdldFN0eWxlKGVsZW1lbnQuZ2V0KDApLCBwcm9wZXJ0eS5rZXkpOy8vZ2V0U3R5bGUgcmV0dXJucyBkZWNsYXJlZCBzdHlsZVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR2YWx1ZSA9IGVsZW1lbnQuYXR0cihwcm9wZXJ0eS5odG1sQXR0cik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvL2lmIGF0dHJpYnV0ZSBpcyBjbGFzcyBjaGVjayBpZiBvbmUgb2YgdmFsaWQgdmFsdWVzIGlzIGluY2x1ZGVkIGFzIGNsYXNzIHRvIHNldCB0aGUgc2VsZWN0XHJcblx0XHRcdFx0aWYgKHZhbHVlICYmIHByb3BlcnR5Lmh0bWxBdHRyID09IFwiY2xhc3NcIiAmJiBwcm9wZXJ0eS52YWxpZFZhbHVlcykge1xyXG5cdFx0XHRcdFx0dmFsdWUgPSB2YWx1ZS5zcGxpdChcIiBcIikuZmlsdGVyKGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcHJvcGVydHkudmFsaWRWYWx1ZXMuaW5kZXhPZihlbCkgIT0gLTFcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cHJvcGVydHkuaW5wdXR0eXBlLnNldFZhbHVlKHZhbHVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zm4oY29tcG9uZW50LCBwcm9wZXJ0eSk7XHJcblxyXG5cdFx0XHRpZiAocHJvcGVydHkuaW5wdXR0eXBlID09IFNlY3Rpb25JbnB1dCkge1xyXG5cdFx0XHRcdHNlY3Rpb24gPSByaWdodFBhbmVsLmZpbmQoJy5zZWN0aW9uW2RhdGEtc2VjdGlvbj1cIicgKyBwcm9wZXJ0eS5rZXkgKyAnXCJdJyk7XHJcblxyXG5cdFx0XHRcdGlmIChWdnZlYi5wcmVzZXJ2ZVByb3BlcnR5U2VjdGlvbnMgJiYgc2VjdGlvbi5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdHNlY3Rpb24uaHRtbChcIlwiKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cmlnaHRQYW5lbC5hcHBlbmQocHJvcGVydHkuaW5wdXQpO1xyXG5cdFx0XHRcdFx0c2VjdGlvbiA9IHJpZ2h0UGFuZWwuZmluZCgnLnNlY3Rpb25bZGF0YS1zZWN0aW9uPVwiJyArIHByb3BlcnR5LmtleSArICdcIl0nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0cm93ID0gJCh0bXBsKCd2dnZlYi1wcm9wZXJ0eScsIHByb3BlcnR5KSk7XHJcblx0XHRcdFx0cm93LmZpbmQoJy5pbnB1dCcpLmFwcGVuZChwcm9wZXJ0eS5pbnB1dCk7XHJcblx0XHRcdFx0c2VjdGlvbi5hcHBlbmQocm93KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjb21wb25lbnQuaW5pdCkgY29tcG9uZW50LmluaXQoVnZ2ZWIuQnVpbGRlci5zZWxlY3RlZEVsLmdldCgwKSk7XHJcblx0fVxyXG59O1xyXG5cclxuXHJcblxyXG5WdnZlYi5XeXNpd3lnRWRpdG9yID0ge1xyXG5cclxuXHRpc0FjdGl2ZTogZmFsc2UsXHJcblx0b2xkVmFsdWU6ICcnLFxyXG5cdGRvYzogZmFsc2UsXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkb2MpIHtcclxuXHRcdHRoaXMuZG9jID0gZG9jO1xyXG5cclxuXHRcdCQoXCIjYm9sZC1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRkb2MuZXhlY0NvbW1hbmQoJ2JvbGQnLCBmYWxzZSwgbnVsbCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNpdGFsaWMtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCdpdGFsaWMnLCBmYWxzZSwgbnVsbCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiN1bmRlcmxpbmUtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCd1bmRlcmxpbmUnLCBmYWxzZSwgbnVsbCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNzdHJpa2UtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCdzdHJpa2VUaHJvdWdoJywgZmFsc2UsIG51bGwpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjbGluay1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRkb2MuZXhlY0NvbW1hbmQoJ2NyZWF0ZUxpbmsnLCBmYWxzZSwgXCIjXCIpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHVuZG86IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHR0aGlzLmRvYy5leGVjQ29tbWFuZCgndW5kbycsIGZhbHNlLCBudWxsKTtcclxuXHR9LFxyXG5cclxuXHRyZWRvOiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5kb2MuZXhlY0NvbW1hbmQoJ3JlZG8nLCBmYWxzZSwgbnVsbCk7XHJcblx0fSxcclxuXHJcblx0ZWRpdDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdGVsZW1lbnQuYXR0cih7ICdjb250ZW50ZWRpdGFibGUnOiB0cnVlLCAnc3BlbGxjaGVja2tlcic6IGZhbHNlIH0pO1xyXG5cdFx0JChcIiN3eXNpd3lnLWVkaXRvclwiKS5zaG93KCk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuXHRcdHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xyXG5cdFx0dGhpcy5vbGRWYWx1ZSA9IGVsZW1lbnQuaHRtbCgpO1xyXG5cdH0sXHJcblxyXG5cdGRlc3Ryb3k6IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHRlbGVtZW50LnJlbW92ZUF0dHIoJ2NvbnRlbnRlZGl0YWJsZSBzcGVsbGNoZWNra2VyJyk7XHJcblx0XHQkKFwiI3d5c2l3eWctZWRpdG9yXCIpLmhpZGUoKTtcclxuXHRcdHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHJcblxyXG5cdFx0bm9kZSA9IHRoaXMuZWxlbWVudC5nZXQoMCk7XHJcblx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0dHlwZTogJ2NoYXJhY3RlckRhdGEnLFxyXG5cdFx0XHR0YXJnZXQ6IG5vZGUsXHJcblx0XHRcdG9sZFZhbHVlOiB0aGlzLm9sZFZhbHVlLFxyXG5cdFx0XHRuZXdWYWx1ZTogbm9kZS5pbm5lckhUTUxcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuVnZ2ZWIuQnVpbGRlciA9IHtcclxuXHJcblx0ZHJhZ01vdmVNdXRhdGlvbjogZmFsc2UsXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uICh1cmwsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0c2VsZiA9IHRoaXM7XHJcblxyXG5cdFx0c2VsZi5sb2FkQ29udHJvbEdyb3VwcygpO1xyXG5cclxuXHRcdHNlbGYuc2VsZWN0ZWRFbCA9IG51bGw7XHJcblx0XHRzZWxmLmhpZ2hsaWdodEVsID0gbnVsbDtcclxuXHRcdHNlbGYuaW5pdENhbGxiYWNrID0gY2FsbGJhY2s7XHJcblxyXG5cdFx0c2VsZi5kb2N1bWVudEZyYW1lID0gJChcIiNpZnJhbWUtd3JhcHBlciA+IGlmcmFtZVwiKTtcclxuXHRcdHNlbGYuY2FudmFzID0gJChcIiNjYW52YXNcIik7XHJcblxyXG5cdFx0c2VsZi5fbG9hZElmcmFtZSh1cmwpO1xyXG5cclxuXHRcdHNlbGYuX2luaXREcmFnZHJvcCgpO1xyXG5cclxuXHRcdHNlbGYuZHJhZ0VsZW1lbnQgPSBudWxsO1xyXG5cdH0sXHJcblxyXG5cdC8qIGNvbnRyb2xzICovXHJcblx0bG9hZENvbnRyb2xHcm91cHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRjb21wb25lbnRzTGlzdCA9ICQoXCIjY29tcG9uZW50cy1saXN0XCIpO1xyXG5cdFx0Y29tcG9uZW50c0xpc3QuZW1wdHkoKTtcclxuXHJcblx0XHRmb3IgKGdyb3VwIGluIFZ2dmViLkNvbXBvbmVudHNHcm91cCkge1xyXG5cdFx0XHRjb21wb25lbnRzTGlzdC5hcHBlbmQoJzxsaSBjbGFzcz1cImhlYWRlclwiIGRhdGEtc2VjdGlvbj1cIicgKyBncm91cCArICdcIiAgZGF0YS1zZWFyY2g9XCJcIj48bGFiZWwgY2xhc3M9XCJoZWFkZXJcIiBmb3I9XCJjb21waGVhZF8nICsgZ3JvdXAgKyAnXCI+JyArIGdyb3VwICsgJyAgPGRpdiBjbGFzcz1cImhlYWRlci1hcnJvd1wiPjwvZGl2PlxcXHJcblx0XHRcdFx0XHRcdFx0XHQgICA8L2xhYmVsPjxpbnB1dCBjbGFzcz1cImhlYWRlcl9jaGVja1wiIHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJ0cnVlXCIgaWQ9XCJjb21waGVhZF8nICsgZ3JvdXAgKyAnXCI+ICA8b2w+PC9vbD48L2xpPicpO1xyXG5cclxuXHRcdFx0Y29tcG9uZW50c1N1Ykxpc3QgPSBjb21wb25lbnRzTGlzdC5maW5kKCdsaVtkYXRhLXNlY3Rpb249XCInICsgZ3JvdXAgKyAnXCJdICBvbCcpO1xyXG5cclxuXHRcdFx0Y29tcG9uZW50cyA9IFZ2dmViLkNvbXBvbmVudHNHcm91cFtncm91cF07XHJcblxyXG5cdFx0XHRmb3IgKGkgaW4gY29tcG9uZW50cykge1xyXG5cdFx0XHRcdGNvbXBvbmVudFR5cGUgPSBjb21wb25lbnRzW2ldO1xyXG5cdFx0XHRcdGNvbXBvbmVudCA9IFZ2dmViLkNvbXBvbmVudHMuZ2V0KGNvbXBvbmVudFR5cGUpO1xyXG5cclxuXHRcdFx0XHRpZiAoY29tcG9uZW50KSB7XHJcblx0XHRcdFx0XHRpdGVtID0gJCgnPGxpIGRhdGEtc2VjdGlvbj1cIicgKyBncm91cCArICdcIiBkYXRhLXR5cGU9XCInICsgY29tcG9uZW50VHlwZSArICdcIiBkYXRhLXNlYXJjaD1cIicgKyBjb21wb25lbnQubmFtZS50b0xvd2VyQ2FzZSgpICsgJ1wiPjxhIGhyZWY9XCIjXCI+JyArIGNvbXBvbmVudC5uYW1lICsgXCI8L2E+PC9saT5cIik7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGNvbXBvbmVudC5pbWFnZSkge1xyXG5cclxuXHRcdFx0XHRcdFx0aXRlbS5jc3Moe1xyXG5cdFx0XHRcdFx0XHRcdGJhY2tncm91bmRJbWFnZTogXCJ1cmwoXCIgKyAnbGlicy9idWlsZGVyLycgKyBjb21wb25lbnQuaW1hZ2UgKyBcIilcIixcclxuXHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kUmVwZWF0OiBcIm5vLXJlcGVhdFwiXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Y29tcG9uZW50c1N1Ykxpc3QuYXBwZW5kKGl0ZW0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0bG9hZFVybDogZnVuY3Rpb24gKHVybCkge1xyXG5cdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cdFx0c2VsZi5pZnJhbWUuc3JjID0gdXJsO1xyXG5cdH0sXHJcblxyXG5cdC8qIGlmcmFtZSAqL1xyXG5cdF9sb2FkSWZyYW1lOiBmdW5jdGlvbiAodXJsKSB7XHJcblxyXG5cdFx0c2VsZi5pZnJhbWUgPSB0aGlzLmRvY3VtZW50RnJhbWUuZ2V0KDApO1xyXG5cdFx0c2VsZi5pZnJhbWUuc3JjID0gdXJsO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmRvY3VtZW50RnJhbWUub24oXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdHdpbmRvdy5GcmFtZVdpbmRvdyA9IHNlbGYuaWZyYW1lLmNvbnRlbnRXaW5kb3c7XHJcblx0XHRcdHdpbmRvdy5GcmFtZURvY3VtZW50ID0gc2VsZi5pZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcclxuXHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IuaW5pdCh3aW5kb3cuRnJhbWVEb2N1bWVudCk7XHJcblx0XHRcdGlmIChzZWxmLmluaXRDYWxsYmFjaykgc2VsZi5pbml0Q2FsbGJhY2soKTtcclxuXHJcblx0XHRcdHJldHVybiBzZWxmLl9mcmFtZUxvYWRlZCgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdF9mcmFtZUxvYWRlZDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHNlbGYuZnJhbWVEb2MgPSAkKHdpbmRvdy5GcmFtZURvY3VtZW50KTtcclxuXHRcdHNlbGYuZnJhbWVIdG1sID0gJCh3aW5kb3cuRnJhbWVEb2N1bWVudCkuZmluZChcImh0bWxcIik7XHJcblx0XHRzZWxmLmZyYW1lQm9keSA9ICQod2luZG93LkZyYW1lRG9jdW1lbnQpLmZpbmQoJ2JvZHknKTtcclxuXHJcblx0XHR0aGlzLl9pbml0SGlnaHRsaWdodCgpO1xyXG5cdH0sXHJcblxyXG5cdF9nZXRFbGVtZW50VHlwZTogZnVuY3Rpb24gKGVsKSB7XHJcblxyXG5cdFx0Ly9zZWFyY2ggZm9yIGNvbXBvbmVudCBhdHRyaWJ1dGVcclxuXHRcdGNvbXBvbmVudE5hbWUgPSAnJztcclxuXHJcblx0XHRpZiAoZWwuYXR0cmlidXRlcylcclxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaisrKSB7XHJcblxyXG5cdFx0XHRcdGlmIChlbC5hdHRyaWJ1dGVzW2pdLm5vZGVOYW1lLmluZGV4T2YoJ2RhdGEtY29tcG9uZW50JykgPiAtMSkge1xyXG5cdFx0XHRcdFx0Y29tcG9uZW50TmFtZSA9IGVsLmF0dHJpYnV0ZXNbal0ubm9kZU5hbWUucmVwbGFjZSgnZGF0YS1jb21wb25lbnQtJywgJycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdGlmIChjb21wb25lbnROYW1lICE9ICcnKSByZXR1cm4gY29tcG9uZW50TmFtZTtcclxuXHJcblx0XHRpZiAoZWwuYXR0cmlidXRlcylcclxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaisrKSB7XHJcblxyXG5cdFx0XHRcdGlmIChlbC5hdHRyaWJ1dGVzW2pdLm5vZGVOYW1lLmluZGV4T2YoJ2RhdGEtY29tcG9uZW50JykgPiAtMSkge1xyXG5cdFx0XHRcdFx0Y29tcG9uZW50TmFtZSA9IGVsLmF0dHJpYnV0ZXNbal0ubm9kZU5hbWUucmVwbGFjZSgnZGF0YS1jb21wb25lbnQtJywgJycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdGlmIChjb21wb25lbnROYW1lICE9ICcnKSByZXR1cm4gY29tcG9uZW50TmFtZTtcclxuXHRcdC8vaWYgKGNsYXNzTmFtZSkgcmV0dXJuIGNvbXBvbmVudE5hbWU7XHJcblx0XHRyZXR1cm4gZWwudGFnTmFtZTtcclxuXHR9LFxyXG5cclxuXHRsb2FkTm9kZUNvbXBvbmVudDogZnVuY3Rpb24gKG5vZGUpIHtcclxuXHRcdGRhdGEgPSBWdnZlYi5Db21wb25lbnRzLm1hdGNoTm9kZShub2RlKTtcclxuXHRcdGlmIChkYXRhKSBWdnZlYi5Db21wb25lbnRzLnJlbmRlcihkYXRhLnR5cGUpO1xyXG5cclxuXHR9LFxyXG5cclxuXHRzZWxlY3ROb2RlOiBmdW5jdGlvbiAobm9kZSA9IGZhbHNlKSB7XHJcblxyXG5cdFx0aWYgKCFub2RlKSB7XHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmhpZGUoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChzZWxmLnRleHRlZGl0RWwgJiYgc2VsZi5zZWxlY3RlZEVsLmdldCgwKSAhPSBub2RlKSB7XHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IuZGVzdHJveShzZWxmLnRleHRlZGl0RWwpO1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5yZW1vdmVDbGFzcyhcInRleHQtZWRpdFwiKS5maW5kKFwiI3NlbGVjdC1hY3Rpb25zXCIpLnNob3coKTtcclxuXHRcdFx0c2VsZi50ZXh0ZWRpdEVsID0gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRzZWxmLnNlbGVjdGVkRWwgPSB0YXJnZXQgPSBqUXVlcnkobm9kZSk7XHJcblx0XHRvZmZzZXQgPSB0YXJnZXQub2Zmc2V0KCk7XHJcblxyXG5cclxuXHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmNzcyhcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwidG9wXCI6IG9mZnNldC50b3AgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbFRvcCgpLFxyXG5cdFx0XHRcdFwibGVmdFwiOiBvZmZzZXQubGVmdCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsTGVmdCgpLFxyXG5cdFx0XHRcdFwid2lkdGhcIjogdGFyZ2V0Lm91dGVyV2lkdGgoKSxcclxuXHRcdFx0XHRcImhlaWdodFwiOiB0YXJnZXQub3V0ZXJIZWlnaHQoKSxcclxuXHRcdFx0XHRcImRpc3BsYXlcIjogXCJibG9ja1wiLFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRqUXVlcnkoXCIjaGlnaGxpZ2h0LW5hbWVcIikuaHRtbChzZWxmLl9nZXRFbGVtZW50VHlwZShub2RlKSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdC8qIGlmcmFtZSBoaWdobGlnaHQgKi9cclxuXHRfaW5pdEhpZ2h0bGlnaHQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRtb3ZlRXZlbnQgPSB7IHRhcmdldDogbnVsbCwgfTtcclxuXHJcblx0XHR0aGlzLmZyYW1lQm9keS5vbihcIm1vdXNlbW92ZSB0b3VjaG1vdmVcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdC8vZGVsYXkgZm9yIGhhbGYgYSBzZWNvbmQgaWYgZHJhZ2dpbmcgb3ZlciBzYW1lIGVsZW1lbnRcclxuXHRcdFx0Ly8gaWYgKGV2ZW50LnRhcmdldCA9PSBtb3ZlRXZlbnQudGFyZ2V0ICYmICgoZXZlbnQudGltZVN0YW1wIC0gbW92ZUV2ZW50LnRpbWVTdGFtcCkgPCA1MDApKSByZXR1cm47XHJcblx0XHRcdGlmIChldmVudC50YXJnZXQpIHtcclxuXHRcdFx0XHRtb3ZlRXZlbnQgPSBldmVudDtcclxuXHJcblx0XHRcdFx0c2VsZi5oaWdobGlnaHRFbCA9IHRhcmdldCA9IGpRdWVyeShldmVudC50YXJnZXQpO1xyXG5cdFx0XHRcdG9mZnNldCA9IHRhcmdldC5vZmZzZXQoKTtcclxuXHRcdFx0XHR3aWR0aCA9IHRhcmdldC5vdXRlcldpZHRoKCk7XHJcblx0XHRcdFx0aGVpZ2h0ID0gdGFyZ2V0Lm91dGVySGVpZ2h0KCk7XHJcblxyXG5cdFx0XHRcdGlmIChzZWxmLmlzRHJhZ2dpbmcpIHtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQuY3NzKHtcclxuXHRcdFx0XHRcdFx0ZGlzcGxheTogJ25vbmUnXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHBhcmVudCA9IHNlbGYuaGlnaGxpZ2h0RWw7XHJcblx0XHRcdFx0XHRwYXJlbnRPZmZzZXQgPSBzZWxmLmRyYWdFbGVtZW50Lm9mZnNldCgpO1xyXG5cdFx0XHRcdFx0Ly8gdHJ5IHtcclxuXHRcdFx0XHRcdC8vIFx0c2VsZi5kcmFnRWxlbWVudC5jc3Moe1xyXG5cdFx0XHRcdFx0Ly8gXHRcdGRpc3BsYXk6ICdub25lJ1xyXG5cdFx0XHRcdFx0Ly8gXHR9KTtcclxuXHRcdFx0XHRcdC8vIFx0aWYgKGV2ZW50Lm9yaWdpbmFsRXZlbnQgJiYgKG9mZnNldC5sZWZ0ID4gKGV2ZW50Lm9yaWdpbmFsRXZlbnQueCAtIDEwKSkpIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRpZiAob2Zmc2V0LnRvcCA+IChldmVudC5vcmlnaW5hbEV2ZW50LnkgLSAxMCkpIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHBhcmVudC5iZWZvcmUoc2VsZi5kcmFnRWxlbWVudCk7XHJcblx0XHRcdFx0XHQvLyBcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHBhcmVudC5wcmVwZW5kKHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0c2VsZi5kcmFnRWxlbWVudC5wcmVwZW5kVG8ocGFyZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHR9XHJcblx0XHRcdFx0XHQvLyBcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0aWYgKGV2ZW50Lm9yaWdpbmFsRXZlbnQgJiYgb2Zmc2V0LnRvcCA+ICgoZXZlbnQub3JpZ2luYWxFdmVudC55IC0gMTApKSkge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0cGFyZW50LmJlZm9yZShzZWxmLmRyYWdFbGVtZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0cGFyZW50LmFwcGVuZChzZWxmLmRyYWdFbGVtZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQuYXBwZW5kVG8ocGFyZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHR9XHJcblx0XHRcdFx0XHQvLyBcdH1cclxuXHRcdFx0XHRcdC8vIH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRcdFx0Ly8gXHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cdFx0XHRcdFx0Ly8gfVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0alF1ZXJ5KFwiI2hpZ2hsaWdodC1ib3hcIikuY3NzKFxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XCJ0b3BcIjogb2Zmc2V0LnRvcCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsVG9wKCksXHJcblx0XHRcdFx0XHRcdFx0XCJsZWZ0XCI6IG9mZnNldC5sZWZ0IC0gc2VsZi5mcmFtZURvYy5zY3JvbGxMZWZ0KCksXHJcblx0XHRcdFx0XHRcdFx0XCJ3aWR0aFwiOiB3aWR0aCxcclxuXHRcdFx0XHRcdFx0XHRcImhlaWdodFwiOiBoZWlnaHQsXHJcblx0XHRcdFx0XHRcdFx0XCJkaXNwbGF5XCI6IGV2ZW50LnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScpID8gXCJub25lXCIgOiBcImJsb2NrXCJcclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0alF1ZXJ5KFwiI2hpZ2hsaWdodC1uYW1lXCIpLmh0bWwoc2VsZi5fZ2V0RWxlbWVudFR5cGUoZXZlbnQudGFyZ2V0KSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0dGhpcy5mcmFtZUJvZHkub24oXCJtb3VzZXVwIHRvdWNoZW5kXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRpZiAoc2VsZi5pc0RyYWdnaW5nKSB7XHJcblx0XHRcdFx0c2VsZi5pc0RyYWdnaW5nID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdGlmIChjb21wb25lbnQuZHJhZ0h0bWwpIC8vaWYgZHJhZ0h0bWwgaXMgc2V0IGZvciBkcmFnZ2luZyB0aGVuIHNldCByZWFsIGNvbXBvbmVudCBodG1sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bmV3RWxlbWVudCA9ICQoY29tcG9uZW50Lmh0bWwpO1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnRWxlbWVudC5yZXBsYWNlV2l0aChuZXdFbGVtZW50KTtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQgPSBuZXdFbGVtZW50O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoY29tcG9uZW50LmFmdGVyRHJvcCkgc2VsZi5kcmFnRWxlbWVudCA9IGNvbXBvbmVudC5hZnRlckRyb3Aoc2VsZi5kcmFnRWxlbWVudCk7XHJcblxyXG5cdFx0XHRcdG5vZGUgPSBzZWxmLmRyYWdFbGVtZW50LmdldCgwKTtcclxuXHRcdFx0XHRzZWxmLnNlbGVjdE5vZGUobm9kZSk7XHJcblx0XHRcdFx0c2VsZi5sb2FkTm9kZUNvbXBvbmVudChub2RlKTtcclxuXHJcblx0XHRcdFx0aWYgKHNlbGYuZHJhZ01vdmVNdXRhdGlvbiA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdFx0XHR0eXBlOiAnY2hpbGRMaXN0JyxcclxuXHRcdFx0XHRcdFx0dGFyZ2V0OiBub2RlLnBhcmVudE5vZGUsXHJcblx0XHRcdFx0XHRcdGFkZGVkTm9kZXM6IFtub2RlXSxcclxuXHRcdFx0XHRcdFx0bmV4dFNpYmxpbmc6IG5vZGUubmV4dFNpYmxpbmdcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdNb3ZlTXV0YXRpb24ubmV3UGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnTW92ZU11dGF0aW9uLm5ld05leHRTaWJsaW5nID0gbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRcdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHNlbGYuZHJhZ01vdmVNdXRhdGlvbik7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdNb3ZlTXV0YXRpb24gPSBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHR0aGlzLmZyYW1lQm9keS5vbihcImRibGNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRyZXBsYWNlT3RoZXJTaG93aW5nQ2FsZW5kYXJJbnB1dHMoZXZlbnQudGFyZ2V0LCBzZWxmLmZyYW1lQm9keSk7XHJcblxyXG5cdFx0XHRzZWxmLnRleHRlZGl0RWwgPSB0YXJnZXQgPSBqUXVlcnkoZXZlbnQudGFyZ2V0KTtcclxuXHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IuZWRpdChzZWxmLnRleHRlZGl0RWwpO1xyXG5cclxuXHRcdFx0c2VsZi50ZXh0ZWRpdEVsLmF0dHIoeyAnY29udGVudGVkaXRhYmxlJzogdHJ1ZSwgJ3NwZWxsY2hlY2trZXInOiBmYWxzZSB9KTtcclxuXHJcblx0XHRcdHNlbGYudGV4dGVkaXRFbC5vbihcImJsdXIga2V5dXAgcGFzdGUgaW5wdXRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmNzcyh7XHJcblx0XHRcdFx0XHRcIndpZHRoXCI6IHNlbGYudGV4dGVkaXRFbC5vdXRlcldpZHRoKCksXHJcblx0XHRcdFx0XHRcImhlaWdodFwiOiBzZWxmLnRleHRlZGl0RWwub3V0ZXJIZWlnaHQoKVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmFkZENsYXNzKFwidGV4dC1lZGl0XCIpLmZpbmQoXCIjc2VsZWN0LWFjdGlvbnNcIikuaGlkZSgpO1xyXG5cdFx0XHRqUXVlcnkoXCIjaGlnaGxpZ2h0LWJveFwiKS5oaWRlKCk7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0dGhpcy5mcmFtZUJvZHkub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0cmVwbGFjZU90aGVyU2hvd2luZ0NhbGVuZGFySW5wdXRzKGV2ZW50LnRhcmdldCwgc2VsZi5mcmFtZUJvZHkpO1xyXG5cclxuXHRcdFx0aWYgKGV2ZW50LnRhcmdldCkge1xyXG5cdFx0XHRcdGlmICghaXNQcmV2aWV3ICYmICEkKCcjYXR0cmlidXRlLXNldHRpbmdzJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcblx0XHRcdFx0XHQkKCcjYXR0cmlidXRlLXNldHRpbmdzJylcclxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKCdhY3RpdmUnKVxyXG5cdFx0XHRcdFx0XHQuc2libGluZ3MoKVxyXG5cdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdFx0JCgnI2xlZnQtcGFuZWwnKS5oaWRlKCk7XHJcblx0XHRcdFx0XHQkKCcjcmlnaHQtcGFuZWwnKS5zaG93KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHNlbGYuc2VsZWN0Tm9kZShldmVudC50YXJnZXQpO1xyXG5cdFx0XHRcdHNlbGYubG9hZE5vZGVDb21wb25lbnQoZXZlbnQudGFyZ2V0KTtcclxuXHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuZnJhbWVCb2R5LmtleWRvd24oZSA9PiB7XHJcblx0XHRcdGlmIChzZWxmLnNlbGVjdGVkRWwgJiYgc2VsZi5zZWxlY3RlZEVsLnByb3AoJ3RhZ05hbWUnKSAhPSAnQk9EWScpIHtcclxuXHRcdFx0XHRpZiAoZS53aGljaCA9PSAzNyB8fCBlLndoaWNoID09IDM4IHx8IGUud2hpY2ggPT0gMzkgfHwgZS53aGljaCA9PSA0MCkge1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lmcmFtZUlkJykuY29udGVudFdpbmRvdy5hcnJvd0tleU1vdmUoZS53aGljaCwgc2VsZi5zZWxlY3RlZEVsKTtcclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCB0aGUgZGVmYXVsdCBhY3Rpb24gKHNjcm9sbCAvIG1vdmUgY2FyZXQpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI2RyYWctYm94XCIpLm9uKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQgPSBzZWxmLnNlbGVjdGVkRWw7XHJcblx0XHRcdHNlbGYuaXNEcmFnZ2luZyA9IHRydWU7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5kcmFnRWxlbWVudC5nZXQoMCk7XHJcblxyXG5cclxuXHRcdFx0c2VsZi5kcmFnTW92ZU11dGF0aW9uID0ge1xyXG5cdFx0XHRcdHR5cGU6ICdtb3ZlJyxcclxuXHRcdFx0XHR0YXJnZXQ6IG5vZGUsXHJcblx0XHRcdFx0b2xkUGFyZW50OiBub2RlLnBhcmVudE5vZGUsXHJcblx0XHRcdFx0b2xkTmV4dFNpYmxpbmc6IG5vZGUubmV4dFNpYmxpbmdcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vc2VsZi5zZWxlY3ROb2RlKGZhbHNlKTtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNkb3duLWJveFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5zZWxlY3RlZEVsLmdldCgwKTtcclxuXHRcdFx0b2xkUGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRvbGROZXh0U2libGluZyA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0XHRuZXh0ID0gc2VsZi5zZWxlY3RlZEVsLm5leHQoKTtcclxuXHJcblx0XHRcdGlmIChuZXh0Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRuZXh0LmFmdGVyKHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c2VsZi5zZWxlY3RlZEVsLnBhcmVudCgpLmFmdGVyKHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG5ld1BhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0bmV3TmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0dHlwZTogJ21vdmUnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZSxcclxuXHRcdFx0XHRvbGRQYXJlbnQ6IG9sZFBhcmVudCxcclxuXHRcdFx0XHRuZXdQYXJlbnQ6IG5ld1BhcmVudCxcclxuXHRcdFx0XHRvbGROZXh0U2libGluZzogb2xkTmV4dFNpYmxpbmcsXHJcblx0XHRcdFx0bmV3TmV4dFNpYmxpbmc6IG5ld05leHRTaWJsaW5nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiN1cC1ib3hcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cclxuXHRcdFx0bm9kZSA9IHNlbGYuc2VsZWN0ZWRFbC5nZXQoMCk7XHJcblx0XHRcdG9sZFBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0b2xkTmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0bmV4dCA9IHNlbGYuc2VsZWN0ZWRFbC5wcmV2KCk7XHJcblxyXG5cdFx0XHRpZiAobmV4dC5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0bmV4dC5iZWZvcmUoc2VsZi5zZWxlY3RlZEVsKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzZWxmLnNlbGVjdGVkRWwucGFyZW50KCkuYmVmb3JlKHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG5ld1BhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0bmV3TmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0dHlwZTogJ21vdmUnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZSxcclxuXHRcdFx0XHRvbGRQYXJlbnQ6IG9sZFBhcmVudCxcclxuXHRcdFx0XHRuZXdQYXJlbnQ6IG5ld1BhcmVudCxcclxuXHRcdFx0XHRvbGROZXh0U2libGluZzogb2xkTmV4dFNpYmxpbmcsXHJcblx0XHRcdFx0bmV3TmV4dFNpYmxpbmc6IG5ld05leHRTaWJsaW5nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNjbG9uZS1ib3hcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0Y2xvbmUgPSBzZWxmLnNlbGVjdGVkRWwuY2xvbmUoKTtcclxuXHJcblx0XHRcdHNlbGYuc2VsZWN0ZWRFbC5hZnRlcihjbG9uZSk7XHJcblxyXG5cdFx0XHRzZWxmLnNlbGVjdGVkRWwgPSBjbG9uZS5jbGljaygpO1xyXG5cclxuXHRcdFx0bm9kZSA9IGNsb25lLmdldCgwKTtcclxuXHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0dHlwZTogJ2NoaWxkTGlzdCcsXHJcblx0XHRcdFx0dGFyZ2V0OiBub2RlLnBhcmVudE5vZGUsXHJcblx0XHRcdFx0YWRkZWROb2RlczogW25vZGVdLFxyXG5cdFx0XHRcdG5leHRTaWJsaW5nOiBub2RlLm5leHRTaWJsaW5nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNwYXJlbnQtYm94XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5zZWxlY3RlZEVsLnBhcmVudCgpLmdldCgwKTtcclxuXHJcblx0XHRcdHNlbGYuc2VsZWN0Tm9kZShub2RlKTtcclxuXHRcdFx0c2VsZi5sb2FkTm9kZUNvbXBvbmVudChub2RlKTtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjZGVsZXRlLWJveFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5zZWxlY3RlZEVsLmdldCgwKTtcclxuXHJcblx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdHR5cGU6ICdjaGlsZExpc3QnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZS5wYXJlbnROb2RlLFxyXG5cdFx0XHRcdHJlbW92ZWROb2RlczogW25vZGVdLFxyXG5cdFx0XHRcdG5leHRTaWJsaW5nOiBub2RlLm5leHRTaWJsaW5nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0c2VsZi5zZWxlY3RlZEVsLnJlbW92ZSgpO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0alF1ZXJ5KHdpbmRvdy5GcmFtZVdpbmRvdykub24oXCJzY3JvbGwgcmVzaXplXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuXHRcdFx0aWYgKHNlbGYuc2VsZWN0ZWRFbCkge1xyXG5cdFx0XHRcdG9mZnNldCA9IHNlbGYuc2VsZWN0ZWRFbC5vZmZzZXQoKTtcclxuXHJcblx0XHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuY3NzKFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcInRvcFwiOiBvZmZzZXQudG9wIC0gc2VsZi5mcmFtZURvYy5zY3JvbGxUb3AoKSxcclxuXHRcdFx0XHRcdFx0XCJsZWZ0XCI6IG9mZnNldC5sZWZ0IC0gc2VsZi5mcmFtZURvYy5zY3JvbGxMZWZ0KCksXHJcblx0XHRcdFx0XHRcdFwid2lkdGhcIjogc2VsZi5zZWxlY3RlZEVsLm91dGVyV2lkdGgoKSxcclxuXHRcdFx0XHRcdFx0XCJoZWlnaHRcIjogc2VsZi5zZWxlY3RlZEVsLm91dGVySGVpZ2h0KCksXHJcblx0XHRcdFx0XHRcdC8vXCJkaXNwbGF5XCI6IFwiYmxvY2tcIlxyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoc2VsZi5oaWdobGlnaHRFbCkge1xyXG5cdFx0XHRcdG9mZnNldCA9IHNlbGYuaGlnaGxpZ2h0RWwub2Zmc2V0KCk7XHJcblxyXG5cdFx0XHRcdGpRdWVyeShcIiNoaWdobGlnaHQtYm94XCIpLmNzcyhcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJ0b3BcIjogb2Zmc2V0LnRvcCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsVG9wKCksXHJcblx0XHRcdFx0XHRcdFwibGVmdFwiOiBvZmZzZXQubGVmdCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsTGVmdCgpLFxyXG5cdFx0XHRcdFx0XHRcIndpZHRoXCI6IHNlbGYuaGlnaGxpZ2h0RWwub3V0ZXJXaWR0aCgpLFxyXG5cdFx0XHRcdFx0XHRcImhlaWdodFwiOiBzZWxmLmhpZ2hsaWdodEVsLm91dGVySGVpZ2h0KCksXHJcblx0XHRcdFx0XHRcdC8vXCJkaXNwbGF5XCI6IFwiYmxvY2tcIlxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHR9LFxyXG5cclxuXHQvKiBkcmFnIGFuZCBkcm9wICovXHJcblx0X2luaXREcmFnZHJvcDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHNlbGYuaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cdFx0Y29tcG9uZW50ID0ge307XHJcblx0XHQkKCcjY29tcG9uZW50cyB1bCA+IGxpID4gb2wgPiBsaScpLm9uKFwibW91c2Vkb3duIHRvdWNoc3RhcnRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdCR0aGlzID0galF1ZXJ5KHRoaXMpO1xyXG5cclxuXHRcdFx0Ly8gJChcIiNjb21wb25lbnQtY2xvbmVcIikucmVtb3ZlKCk7XHJcblx0XHRcdGNvbXBvbmVudCA9IFZ2dmViLkNvbXBvbmVudHMuZ2V0KCR0aGlzLmRhdGEoXCJ0eXBlXCIpKTtcclxuXHJcblx0XHRcdGlmIChjb21wb25lbnQuZHJhZ0h0bWwpIHtcclxuXHRcdFx0XHRodG1sID0gY29tcG9uZW50LmRyYWdIdG1sO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGh0bWwgPSBjb21wb25lbnQuaHRtbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VsZi5kcmFnRWxlbWVudCA9ICQoaHRtbCk7XHJcblxyXG5cdFx0XHRpZiAoY29tcG9uZW50LmRyYWdTdGFydCkgc2VsZi5kcmFnRWxlbWVudCA9IGNvbXBvbmVudC5kcmFnU3RhcnQoc2VsZi5kcmFnRWxlbWVudCk7XHJcblxyXG5cdFx0XHRzZWxmLmlzRHJhZ2dpbmcgPSB0cnVlO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdCQoJ2JvZHknKS5vbignbW91c2V1cCB0b3VjaGVuZCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRpZiAoc2VsZi5pc0RyYWdnaW5nID09IHRydWUpIHtcclxuXHRcdFx0XHRzZWxmLmlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHRcdFx0XHQvLyAkKFwiI2NvbXBvbmVudC1jbG9uZVwiKS5yZW1vdmUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnYm9keScpLm9uKCdtb3VzZW1vdmUgdG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGlmIChzZWxmLmlzRHJhZ2dpbmcgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdGVsZW1lbnRNb3VzZUlzT3ZlciA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCAtIDYwLCBldmVudC5jbGllbnRZIC0gNDApO1xyXG5cdFx0XHRcdC8vaWYgZHJhZyBlbGVtZW50cyBob3ZlcnMgb3ZlciBpZnJhbWUgc3dpdGNoIHRvIGlmcmFtZSBtb3VzZW92ZXIgaGFuZGxlclx0XHJcblx0XHRcdFx0aWYgKGVsZW1lbnRNb3VzZUlzT3ZlciAmJiBlbGVtZW50TW91c2VJc092ZXIudGFnTmFtZSA9PSAnSUZSQU1FJykge1xyXG5cdFx0XHRcdFx0c2VsZi5mcmFtZUJvZHkudHJpZ2dlcihcIm1vdXNlbW92ZVwiLCBldmVudCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdHNlbGYuc2VsZWN0Tm9kZShmYWxzZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcjY29tcG9uZW50cyB1bCA+IG9sID4gbGkgPiBsaScpLm9uKFwibW91c2V1cCB0b3VjaGVuZFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0c2VsZi5pc0RyYWdnaW5nID0gZmFsc2U7XHJcblx0XHRcdC8vICQoXCIjY29tcG9uZW50LWNsb25lXCIpLnJlbW92ZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdGdldEJlYXV0aWZpZWRIdG1sKCkge1xyXG5cdFx0LypcclxuXHRcdC1JLCAtLWluZGVudC1pbm5lci1odG1sICAgICAgICAgICAgSW5kZW50IDxoZWFkPiBhbmQgPGJvZHk+IHNlY3Rpb25zLiBEZWZhdWx0IGlzIGZhbHNlLlxyXG5cdFx0LVUsIC0tdW5mb3JtYXR0ZWQgICAgICAgICAgICAgICAgICBMaXN0IG9mIHRhZ3MgKGRlZmF1bHRzIHRvIGlubGluZSkgdGhhdCBzaG91bGQgbm90IGJlIHJlZm9ybWF0dGVkXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgdXNlIGVtcHR5IGFycmF5IHRvIGRlbm90ZSB0aGF0IG5vIHRhZ3Mgc2hvdWxkIG5vdCBiZSByZWZvcm1hdHRlZFxyXG5cdFx0ICovXHJcblxyXG5cdFx0Y29uc3QgeyBkb2N0eXBlLCBodG1sIH0gPSB0aGlzLmdldEh0bWwoKTtcclxuXHRcdHJldHVybiBodG1sX2JlYXV0aWZ5KGAke2RvY3R5cGV9XHJcblx0XHRcdFx0XHRcdFx0ICAke2h0bWxHZW5lcmF0b3IoaHRtbCwgcmVtb3ZlVW51c2VkVGFncywgZW1wdHlDaGlsZHJlbixcclxuXHRcdFx0XHRnZW5lcmF0ZVRhYmxlU2NyaXB0LCBnZW5lcmF0ZUNhbGVuZGFyT25jbGlja0F0dHIsIGdlbmVyYXRlU2VsZWN0T3B0aW9uc1NjcmlwdCxcclxuXHRcdFx0XHRnZW5lcmF0ZVN1Ym1pdEZvcm1TY3JpcHQsIGdlbmVyYXRlQnV0dG9uT25jbGlja0F0dHIpfWAsXHJcblx0XHRcdHtcclxuXHRcdFx0XHRwcmVzZXJ2ZV9uZXdsaW5lczogZmFsc2UsXHJcblx0XHRcdFx0aW5kZW50X2lubmVyX2h0bWw6IHRydWUsXHJcblx0XHRcdFx0dW5mb3JtYXR0ZWQ6IFtdXHJcblx0XHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdGdldEh0bWw6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGRvYyA9IHdpbmRvdy5GcmFtZURvY3VtZW50O1xyXG5cdFx0Y29uc3QgZG9jdHlwZSA9IFwiPCFET0NUWVBFIFwiXHJcblx0XHRcdCsgZG9jLmRvY3R5cGUubmFtZVxyXG5cdFx0XHQrIChkb2MuZG9jdHlwZS5wdWJsaWNJZCA/ICcgUFVCTElDIFwiJyArIGRvYy5kb2N0eXBlLnB1YmxpY0lkICsgJ1wiJyA6ICcnKVxyXG5cdFx0XHQrICghZG9jLmRvY3R5cGUucHVibGljSWQgJiYgZG9jLmRvY3R5cGUuc3lzdGVtSWQgPyAnIFNZU1RFTScgOiAnJylcclxuXHRcdFx0KyAoZG9jLmRvY3R5cGUuc3lzdGVtSWQgPyAnIFwiJyArIGRvYy5kb2N0eXBlLnN5c3RlbUlkICsgJ1wiJyA6ICcnKVxyXG5cdFx0XHQrIFwiPlxcblwiO1xyXG5cdFx0Y29uc3QgaHRtbCA9IGAke2RvY3R5cGV9XHJcblx0XHRcdFx0XHQgIDxodG1sPlxyXG5cdFx0XHRcdFx0XHQgICR7ZG9jLmRvY3VtZW50RWxlbWVudC5pbm5lckhUTUx9XHJcblx0XHRcdFx0XHQgIDwvaHRtbD5gO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZG9jdHlwZSxcclxuXHRcdFx0aHRtbFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHRzZXRIdG1sOiBmdW5jdGlvbiAoaHRtbCkge1xyXG5cdFx0Ly91cGRhdGUgb25seSBib2R5IHRvIGF2b2lkIGJyZWFraW5nIGlmcmFtZSBjc3MvanMgcmVsYXRpdmUgcGF0aHNcclxuXHRcdHN0YXJ0ID0gaHRtbC5pbmRleE9mKFwiPGJvZHlcIik7XHJcblx0XHRlbmQgPSBodG1sLmluZGV4T2YoXCI8L2JvZHlcIik7XHJcblxyXG5cdFx0aWYgKHN0YXJ0ID49IDAgJiYgZW5kID49IDApIHtcclxuXHRcdFx0Ym9keSA9IGh0bWwuc2xpY2UoaHRtbC5pbmRleE9mKFwiPlwiLCBzdGFydCkgKyAxLCBlbmQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ym9keSA9IGh0bWxcclxuXHRcdH1cclxuXHJcblx0XHQvL3NlbGYuZnJhbWVCb2R5Lmh0bWwoYm9keSk7XHJcblx0XHR3aW5kb3cuRnJhbWVEb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGJvZHk7XHJcblxyXG5cdFx0Ly9iZWxvdyBtZXRob2RzIGJyYWtlIGRvY3VtZW50IHJlbGF0aXZlIGNzcyBhbmQganMgcGF0aHNcclxuXHRcdC8vcmV0dXJuIHNlbGYuaWZyYW1lLm91dGVySFRNTCA9IGh0bWw7XHJcblx0XHQvL3JldHVybiBzZWxmLmRvY3VtZW50RnJhbWUuaHRtbChodG1sKTtcclxuXHRcdC8vcmV0dXJuIHNlbGYuZG9jdW1lbnRGcmFtZS5hdHRyKFwic3JjZG9jXCIsIGh0bWwpO1xyXG5cdH1cclxufTtcclxuXHJcblZ2dmViLkNvZGVFZGl0b3IgPSB7XHJcblxyXG5cdGlzQWN0aXZlOiBmYWxzZSxcclxuXHRvbGRWYWx1ZTogJycsXHJcblx0ZG9jOiBmYWxzZSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRvYykge1xyXG5cdFx0JChcIiN2dnZlYi1jb2RlLWVkaXRvciB0ZXh0YXJlYVwiKS52YWwoVnZ2ZWIuQnVpbGRlci5nZXRCZWF1dGlmaWVkSHRtbCgpKTtcclxuXHJcblx0XHQkKFwiI3Z2dmViLWNvZGUtZWRpdG9yIHRleHRhcmVhXCIpLmtleXVwKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0ZGVsYXkoVnZ2ZWIuQnVpbGRlci5zZXRIdG1sKHRoaXMudmFsdWUpLCAxMDAwKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vbG9hZCBjb2RlIG9uIGRvY3VtZW50IGNoYW5nZXNcclxuXHRcdFZ2dmViLkJ1aWxkZXIuZnJhbWVCb2R5Lm9uKFwidnZ2ZWIudW5kby5hZGQgdnZ2ZWIudW5kby5yZXN0b3JlXCIsIGZ1bmN0aW9uIChlKSB7IFZ2dmViLkNvZGVFZGl0b3Iuc2V0VmFsdWUoKTsgfSk7XHJcblx0XHQvL2xvYWQgY29kZSB3aGVuIGEgbmV3IHVybCBpcyBsb2FkZWRcclxuXHRcdFZ2dmViLkJ1aWxkZXIuZG9jdW1lbnRGcmFtZS5vbihcImxvYWRcIiwgZnVuY3Rpb24gKGUpIHsgVnZ2ZWIuQ29kZUVkaXRvci5zZXRWYWx1ZSgpOyB9KTtcclxuXHJcblx0XHR0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcclxuXHR9LFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRpZiAodGhpcy5pc0FjdGl2ZSkge1xyXG5cdFx0XHQkKFwiI3Z2dmViLWNvZGUtZWRpdG9yIHRleHRhcmVhXCIpLnZhbChWdnZlYi5CdWlsZGVyLmdldEJlYXV0aWZpZWRIdG1sKCkpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGRlc3Ryb3k6IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHQvL3RoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHR0b2dnbGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLmlzQWN0aXZlICE9IHRydWUpIHtcclxuXHRcdFx0dGhpcy5pc0FjdGl2ZSA9IHRydWU7XHJcblx0XHRcdHJldHVybiB0aGlzLmluaXQoKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHRcdHRoaXMuZGVzdHJveSgpO1xyXG5cdH1cclxufVxyXG5cclxubGV0IHNob3duUGFuZWwsIGhpZGRlblBhbmVsLCBpc1ByZXZpZXc7XHJcblxyXG5WdnZlYi5HdWkgPSB7XHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoXCJbZGF0YS12dnZlYi1hY3Rpb25dXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRvbiA9IFwiY2xpY2tcIjtcclxuXHRcdFx0aWYgKHRoaXMuZGF0YXNldC52dnZlYk9uKSBvbiA9IHRoaXMuZGF0YXNldC52dnZlYk9uO1xyXG5cclxuXHRcdFx0JCh0aGlzKS5vbihvbiwgVnZ2ZWIuR3VpW3RoaXMuZGF0YXNldC52dnZlYkFjdGlvbl0pO1xyXG5cdFx0XHRpZiAodGhpcy5kYXRhc2V0LnZ2dmViU2hvcnRjdXQpIHtcclxuXHRcdFx0XHQkKGRvY3VtZW50KS5iaW5kKCdrZXlkb3duJywgdGhpcy5kYXRhc2V0LnZ2dmViU2hvcnRjdXQsIFZ2dmViLkd1aVt0aGlzLmRhdGFzZXQudnZ2ZWJBY3Rpb25dKTtcclxuXHRcdFx0XHQkKHdpbmRvdy5GcmFtZURvY3VtZW50LCB3aW5kb3cuRnJhbWVXaW5kb3cpLmJpbmQoJ2tleWRvd24nLCB0aGlzLmRhdGFzZXQudnZ2ZWJTaG9ydGN1dCwgVnZ2ZWIuR3VpW3RoaXMuZGF0YXNldC52dnZlYkFjdGlvbl0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHR1bmRvOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoVnZ2ZWIuV3lzaXd5Z0VkaXRvci5pc0FjdGl2ZSkge1xyXG5cdFx0XHRWdnZlYi5XeXNpd3lnRWRpdG9yLnVuZG8oKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdFZ2dmViLlVuZG8udW5kbygpO1xyXG5cdFx0fVxyXG5cdFx0VnZ2ZWIuQnVpbGRlci5zZWxlY3ROb2RlKCk7XHJcblx0fSxcclxuXHJcblx0cmVkbzogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKFZ2dmViLld5c2l3eWdFZGl0b3IuaXNBY3RpdmUpIHtcclxuXHRcdFx0VnZ2ZWIuV3lzaXd5Z0VkaXRvci5yZWRvKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRWdnZlYi5VbmRvLnJlZG8oKTtcclxuXHRcdH1cclxuXHRcdFZ2dmViLkJ1aWxkZXIuc2VsZWN0Tm9kZSgpO1xyXG5cdH0sXHJcblxyXG5cdGNoZWNrOiBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKCcjdGV4dGFyZWEtbW9kYWwgdGV4dGFyZWEnKS52YWwoVnZ2ZWIuQnVpbGRlci5nZXRCZWF1dGlmaWVkSHRtbCgpKTtcclxuXHRcdCQoJyN0ZXh0YXJlYS1tb2RhbCcpLm1vZGFsKCk7XHJcblx0fSxcclxuXHJcblx0dmlld3BvcnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoXCIjY2FudmFzXCIpLmF0dHIoXCJjbGFzc1wiLCB0aGlzLmRhdGFzZXQudmlldyk7XHJcblx0fSxcclxuXHJcblx0dG9nZ2xlRWRpdG9yOiBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKFwiI3Z2dmViLWJ1aWxkZXJcIikudG9nZ2xlQ2xhc3MoXCJib3R0b20tcGFuZWwtZXhwYW5kXCIpO1xyXG5cdFx0VnZ2ZWIuQ29kZUVkaXRvci50b2dnbGUoKTtcclxuXHR9LFxyXG5cclxuXHRkb3dubG9hZCgpIHtcclxuXHRcdGRvd25sb2FkQXNUZXh0RmlsZSgnaW5kZXgnLCBWdnZlYi5CdWlsZGVyLmdldEJlYXV0aWZpZWRIdG1sKCkpO1xyXG5cdH0sXHJcblxyXG5cdHByZXZpZXc6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICgkKCcjbGVmdC1wYW5lbCcpLmlzKCc6dmlzaWJsZScpKSB7XHJcblx0XHRcdHNob3duUGFuZWwgPSAnbGVmdC1wYW5lbCc7XHJcblx0XHRcdGhpZGRlblBhbmVsID0gJ3JpZ2h0LXBhbmVsJztcclxuXHRcdFx0JCgnI2xlZnQtcGFuZWwsICNyaWdodC1wYW5lbCcpLmhpZGUoKTtcclxuXHRcdFx0aXNQcmV2aWV3ID0gdHJ1ZTtcclxuXHRcdH0gZWxzZSBpZiAoJCgnI3JpZ2h0LXBhbmVsJykuaXMoJzp2aXNpYmxlJykpIHtcclxuXHRcdFx0c2hvd25QYW5lbCA9ICdyaWdodC1wYW5lbCc7XHJcblx0XHRcdGhpZGRlblBhbmVsID0gJ2xlZnQtcGFuZWwnO1xyXG5cdFx0XHQkKCcjbGVmdC1wYW5lbCwgI3JpZ2h0LXBhbmVsJykuaGlkZSgpO1xyXG5cdFx0XHRpc1ByZXZpZXcgPSB0cnVlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aXNQcmV2aWV3ID0gZmFsc2U7XHJcblx0XHRcdCQoYCMke3Nob3duUGFuZWx9YCkuc2hvdygpO1xyXG5cdFx0XHQkKGAjJHtoaWRkZW5QYW5lbH1gKS5oaWRlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0JCgnI21lbnUtcGFuZWwnKS50b2dnbGUoKTtcclxuXHRcdCQoXCIjaWZyYW1lLWxheWVyXCIpLnRvZ2dsZSgpO1xyXG5cdFx0JChcIiN2dnZlYi1idWlsZGVyXCIpLnRvZ2dsZUNsYXNzKFwicHJldmlld1wiKTtcclxuXHR9LFxyXG5cclxuXHRmdWxsc2NyZWVuOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRsYXVuY2hGdWxsU2NyZWVuKGRvY3VtZW50KTsgLy8gdGhlIHdob2xlIHBhZ2VcclxuXHR9LFxyXG5cclxuXHRjb21wb25lbnRTZWFyY2g6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHNlYXJjaFRleHQgPSB0aGlzLnZhbHVlO1xyXG5cclxuXHRcdCQoXCIjY29tcG9uZW50cy1saXN0IGxpIG9sIGxpXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQkdGhpcyA9ICQodGhpcyk7XHJcblxyXG5cdFx0XHQkdGhpcy5oaWRlKCk7XHJcblx0XHRcdGlmICgkdGhpcy5kYXRhKFwic2VhcmNoXCIpLmluZGV4T2Yoc2VhcmNoVGV4dCkgPiAtMSkgJHRoaXMuc2hvdygpO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0Y2xlYXJDb21wb25lbnRTZWFyY2g6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoXCIjY29tcG9uZW50LXNlYXJjaFwiKS52YWwoXCJcIikua2V5dXAoKTtcclxuXHR9XHJcbn1cclxuXHJcblZ2dmViLkZpbGVNYW5hZ2VyID0ge1xyXG5cdHRyZWU6IGZhbHNlLFxyXG5cdHBhZ2VzOiB7fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy50cmVlID0gJChcIiNmaWxlbWFuYWdlciAudHJlZSA+IG9sXCIpLmh0bWwoXCJcIik7XHJcblxyXG5cdFx0JCh0aGlzLnRyZWUpLm9uKFwiY2xpY2tcIiwgXCJsaVtkYXRhLXBhZ2VdIHNwYW5cIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBgIyR7JCh0aGlzKS5wYXJlbnRzKCdsaScpLmRhdGEoJ3BhZ2UnKX1gO1xyXG5cdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcblx0XHRcdC8vIFZ2dmViLkZpbGVNYW5hZ2VyLmxvYWRQYWdlKCQodGhpcykucGFyZW50cyhcImxpXCIpLmRhdGEoXCJwYWdlXCIpKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSlcclxuXHR9LFxyXG5cclxuXHRnZXRQYWdlKG5hbWUpIHtcclxuXHRcdHJldHVybiB0aGlzLnBhZ2VzW25hbWVdO1xyXG5cdH0sXHJcblxyXG5cdGFkZFBhZ2U6IGZ1bmN0aW9uIChuYW1lLCB0aXRsZSwgdXJsKSB7XHJcblxyXG5cdFx0dGhpcy5wYWdlc1tuYW1lXSA9IHtcclxuXHRcdFx0bmFtZSxcclxuXHRcdFx0dGl0bGUsXHJcblx0XHRcdHVybFxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLnRyZWUuYXBwZW5kKFxyXG5cdFx0XHR0bXBsKFwidnZ2ZWItZmlsZW1hbmFnZXItcGFnZVwiLCB7IG5hbWUsIHRpdGxlLCB1cmwgfSkpO1xyXG5cdH0sXHJcblxyXG5cdGFkZFBhZ2VzOiBmdW5jdGlvbiAocGFnZXMpIHtcclxuXHRcdGZvciAocGFnZSBpbiBwYWdlcykge1xyXG5cdFx0XHR0aGlzLmFkZFBhZ2UocGFnZXNbcGFnZV1bJ25hbWUnXSwgcGFnZXNbcGFnZV1bJ3RpdGxlJ10sIHBhZ2VzW3BhZ2VdWyd1cmwnXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0YWRkQ29tcG9uZW50OiBmdW5jdGlvbiAobmFtZSwgdXJsLCB0aXRsZSwgcGFnZSkge1xyXG5cdFx0JChcIltkYXRhLXBhZ2U9J1wiICsgcGFnZSArIFwiJ10gPiBvbFwiLCB0aGlzLnRyZWUpLmFwcGVuZChcclxuXHRcdFx0dG1wbChcInZ2dmViLWZpbGVtYW5hZ2VyLWNvbXBvbmVudFwiLCB7IG5hbWUsIHVybCwgdGl0bGUgfSkpO1xyXG5cdH0sXHJcblxyXG5cdHNob3dBY3RpdmUobmFtZSkge1xyXG5cdFx0JChcIltkYXRhLXBhZ2VdXCIsIHRoaXMudHJlZSkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHQkKFwiW2RhdGEtcGFnZT0nXCIgKyBuYW1lICsgXCInXVwiLCB0aGlzLnRyZWUpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdH0sXHJcblxyXG5cdGxvYWRQYWdlOiBmdW5jdGlvbiAobmFtZSkge1xyXG5cdFx0JChcIltkYXRhLXBhZ2VdXCIsIHRoaXMudHJlZSkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHQkKFwiW2RhdGEtcGFnZT0nXCIgKyBuYW1lICsgXCInXVwiLCB0aGlzLnRyZWUpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cclxuXHRcdFZ2dmViLkJ1aWxkZXIubG9hZFVybCh0aGlzLnBhZ2VzW25hbWVdWyd1cmwnXSk7XHJcblx0fSxcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ2dmViOyIsImltcG9ydCB1bnVzZWRUYWdzIGZyb20gJy4vdW51c2VkVGFncyc7XHJcbmltcG9ydCB7IGVtcHR5Q2hpbGRyZW5TZWxlY3RvcnMsIHRhYmxlU2VsZWN0b3IsIHN1Ym1pdEJ1dHRvblNlbGVjdG9yIH0gZnJvbSAnLi9zZWxlY3RvcnMnO1xyXG5pbXBvcnQgdGFibGVUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvdGFibGUnO1xyXG5pbXBvcnQgYXV0b3NlbGVjdGlucHV0VGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL2F1dG9zZWxlY3RpbnB1dCc7XHJcbmltcG9ydCB7IHRlbXBsYXRlIGFzIHN1Ym1pdEZvcm1UZW1wbGF0ZSB9IGZyb20gJy4uL3RlbXBsYXRlcy9zdWJtaXRmb3JtJztcclxuaW1wb3J0IHRhYmxlIGZyb20gJy4uL2NvbXBvbmVudHMvQG9lZS90YWJsZSc7XHJcbmltcG9ydCB7IGNhbGVuZGFyU2VsZWN0b3IsIHNldE9uY2xpY2tBdHRyIGFzIHNldENhbGVuZGFyT25jbGlja0F0dHIgfSBmcm9tICcuL2NhbGVuZGFyJztcclxuaW1wb3J0IHsgc2V0T25jbGlja0F0dHIgYXMgc2V0QnV0dG9uT25jbGlja0F0dHIgfSBmcm9tICcuL3N1Ym1pdGJ1dHRvbic7XHJcblxyXG5jb25zdCBhbHdheXNUcnVlID0gKCkgPT4gdHJ1ZTtcclxuXHJcbi8vIHRoaXMgcmVmZXJzIHRvIGh0bWwgZWxlbWVudFxyXG5mdW5jdGlvbiByZW1vdmVUYWcoeyBuYW1lLCBmaWx0ZXIgPSBhbHdheXNUcnVlIH0pIHtcclxuICAgIEFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5VGFnTmFtZShuYW1lKSlcclxuICAgICAgICAuZmlsdGVyKGZpbHRlcilcclxuICAgICAgICAuZm9yRWFjaCh0YWcgPT4gdGFnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGFnKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVVudXNlZFRhZ3MoZWwpIHtcclxuICAgIHVudXNlZFRhZ3MuZm9yRWFjaChyZW1vdmVUYWcsIGVsKTtcclxuICAgIHJldHVybiBlbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZW1wdHlDaGlsZHJlbihlbCkge1xyXG4gICAgJChlbCkuZmluZChlbXB0eUNoaWxkcmVuU2VsZWN0b3JzLmpvaW4oJywgJykpLmVtcHR5KCk7XHJcbiAgICByZXR1cm4gZWw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGVuZFNjcmlwdChlbCwganNTdHIpIHtcclxuICAgIGpzU3RyICYmICQoJzxzY3JpcHQ+PC9zY3JpcHQ+JykudGV4dChqc1N0cikuYXBwZW5kVG8oJChlbCkuZmluZCgnYm9keScpKTtcclxuICAgIHJldHVybiBlbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVUYWJsZVNjcmlwdChlbCkge1xyXG4gICAgY29uc3QganNTdHIgPSBBcnJheS5mcm9tKCQoZWwpLmZpbmQodGFibGVTZWxlY3RvcikpLnJlZHVjZSgocHJldiwgZWxlbWVudCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgJHtwcmV2fVxyXG4gICAgICAgICAgICAgICAgJHt0YWJsZVRlbXBsYXRlKCQoZWxlbWVudCksIHRhYmxlKX1gO1xyXG4gICAgfSwgJycpO1xyXG4gICAgcmV0dXJuIGFwcGVuZFNjcmlwdChlbCwganNTdHIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZUNhbGVuZGFyT25jbGlja0F0dHIoZWwpIHtcclxuICAgICQoZWwpLmZpbmQoY2FsZW5kYXJTZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5hdHRyKCdvbmNsaWNrJykgfHwgc2V0Q2FsZW5kYXJPbmNsaWNrQXR0cih0aGlzKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGVsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZVNlbGVjdE9wdGlvbnNTY3JpcHQoZWwpIHtcclxuICAgIHJldHVybiBhcHBlbmRTY3JpcHQoZWwsIGF1dG9zZWxlY3RpbnB1dFRlbXBsYXRlKCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZVN1Ym1pdEZvcm1TY3JpcHQoZWwpIHtcclxuICAgIHJldHVybiBhcHBlbmRTY3JpcHQoZWwsIHN1Ym1pdEZvcm1UZW1wbGF0ZSgpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVCdXR0b25PbmNsaWNrQXR0cihlbCkge1xyXG4gICAgJChlbCkuZmluZChzdWJtaXRCdXR0b25TZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5hdHRyKCdvbmNsaWNrJykgfHwgc2V0QnV0dG9uT25jbGlja0F0dHIodGhpcyk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBlbDtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIHJlbW92ZVVudXNlZFRhZ3MsIGVtcHR5Q2hpbGRyZW4sIGdlbmVyYXRlVGFibGVTY3JpcHQsIGdlbmVyYXRlQ2FsZW5kYXJPbmNsaWNrQXR0cixcclxuICAgIGdlbmVyYXRlU2VsZWN0T3B0aW9uc1NjcmlwdCwgZ2VuZXJhdGVTdWJtaXRGb3JtU2NyaXB0LCBnZW5lcmF0ZUJ1dHRvbk9uY2xpY2tBdHRyXHJcbn07IiwiY29uc3QgdW51c2VkVGFncyA9IFtcclxuXHR7XHJcblx0XHRuYW1lOiAnc2NyaXB0JyxcclxuXHRcdGZpbHRlcjogdGFnID0+IHRhZy5nZXRBdHRyaWJ1dGUoJ3NyYycpXHJcblx0XHRcdCYmIHRhZy5nZXRBdHRyaWJ1dGUoJ3NyYycpLmluY2x1ZGVzKCdpZnJhbWUtZHJhZy1uLWRyb3AnKVxyXG5cdH0sXHJcblx0e1xyXG5cdFx0bmFtZTogJ2xpbmsnLFxyXG5cdFx0ZmlsdGVyOiB0YWcgPT4gdGFnLmdldEF0dHJpYnV0ZSgncmVsJykgPT0gJ3N0eWxlc2hlZXQnXHJcblx0XHRcdCYmICh0YWcuZ2V0QXR0cmlidXRlKCdocmVmJykuaW5jbHVkZXMoJ2RyYWctbi1kcm9wJylcclxuXHRcdFx0XHR8fCB0YWcuZ2V0QXR0cmlidXRlKCdocmVmJykuaW5jbHVkZXMoJy9kYXRlcGlja2VyL3NraW4vV2RhdGVQaWNrZXIuY3NzJylcclxuXHRcdFx0fHwgdGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpLmluY2x1ZGVzKCcvbGF5ZXIvc2tpbi9sYXllci5jc3MnKSlcclxuXHR9LFxyXG5cdHtcclxuXHRcdG5hbWU6ICdocicsXHJcblx0XHRmaWx0ZXI6IHRhZyA9PiAkKHRhZykuaGFzQ2xhc3MoJ2hvcml6b250YWwtbGluZScpXHJcblx0XHRcdHx8ICQodGFnKS5oYXNDbGFzcygndmVydGljYWwtbGluZScpXHJcblx0fVxyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdW51c2VkVGFnczsiLCJpbXBvcnQgeyBmdW5jdGlvbk5hbWUgfSBmcm9tICcuLi90ZW1wbGF0ZXMvc3VibWl0Zm9ybSc7XHJcblxyXG5mdW5jdGlvbiBzZXRPbmNsaWNrQXR0cihub2RlKSB7XHJcbiAgICByZXR1cm4gJChub2RlKS5hdHRyKCdvbmNsaWNrJywgYCR7ZnVuY3Rpb25OYW1lfSh0aGlzKWApO1xyXG59XHJcblxyXG5leHBvcnQgeyBzZXRPbmNsaWNrQXR0ciB9OyIsImltcG9ydCB7IGRhdGFUYWJsZUlkIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY29tbW9uXCI7XHJcblxyXG5sZXQgaW5kZXggPSAxO1xyXG5cclxuZnVuY3Rpb24gdGVtcGxhdGUobm9kZSwgdGFibGUpIHtcclxuICAgIGNvbnN0IGlkID0gbm9kZS5hdHRyKCdpZCcpIHx8IChub2RlLmF0dHIoJ2lkJywgYHRhYmxlJHtpbmRleCsrfWApLCBub2RlLmF0dHIoJ2lkJykpO1xyXG4gICAgY29uc3Qga2V5ID0gbm9kZS5hdHRyKGRhdGFUYWJsZUlkKTtcclxuICAgIHJldHVybiBgXHJcbiAgICB2YXIgY29sdW1uRGVmcyR7a2V5fSA9IFtcclxuICAgICAgICAke3RhYmxlLmdldFRhYmxlKGtleSkuY29sdW1uRGVmcy5tYXAoZGVmID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGB7aGVhZGVyTmFtZTogXCIke2RlZi5oZWFkZXJOYW1lfVwiLCBmaWVsZDogXCIke2RlZi5maWVsZH1cIiwgd2lkdGg6ICR7ZGVmLndpZHRoID8gZGVmLndpZHRoIDogJ1wiXCInfX1gO1xyXG4gICAgICAgIH0pLmpvaW4oJywnKX1cclxuICAgIF07XHJcbiAgICB2YXIgZ3JpZE9wdGlvbnMke2tleX0gPSB7XHJcbiAgICAgICAgY29sdW1uRGVmczogY29sdW1uRGVmcyR7a2V5fSxcclxuICAgICAgICBlbmFibGVTb3J0aW5nOiBmYWxzZSxcclxuICAgICAgICBlbmFibGVGaWx0ZXI6IGZhbHNlXHJcbiAgICAgIH07XHJcbiAgICB2YXIgZUdyaWREaXYke2tleX0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJHtpZH0nKTtcclxuICAgIG5ldyBhZ0dyaWQuR3JpZChlR3JpZERpdiR7a2V5fSwgZ3JpZE9wdGlvbnMke2tleX0pO1xyXG4gICAgZ3JpZE9wdGlvbnMke2tleX0uYXBpLnNldFJvd0RhdGEoW10pO1xyXG4gICAgYDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGVtcGxhdGU7XHJcblxyXG4iLCJpbXBvcnQgeyBkYXRhVGFibGVJZCB9IGZyb20gXCIuLi9jb21wb25lbnRzL2NvbW1vblwiO1xyXG5cclxuY29uc3QgZnVuY3Rpb25OYW1lID0gJ3N1Ym1pdEZvcm0nO1xyXG5mdW5jdGlvbiB0ZW1wbGF0ZSgpIHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgdmFyIGdyaWRPcHRpb25zSWRlbnRpZmllciA9IHdpbmRvd1snZ3JpZE9wdGlvbnMnICsgJCgnWyR7ZGF0YVRhYmxlSWR9XScpLmF0dHIoJyR7ZGF0YVRhYmxlSWR9JyldO1xyXG4gICAgICAgIGZ1bmN0aW9uICR7ZnVuY3Rpb25OYW1lfShlbGVtZW50LCBmb3JtSWQpIHtcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIC8vIHVybDogY29uZmlnLmZ1bmRvZG9vV2ViRG9tYWluVXJsICsgJChlbGVtZW50KS5hdHRyKCdkYXRhLXVybCcpLFxyXG4gICAgICAgICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9kYXRhJyxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICBtZXRob2QgOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiAoZm9ybUlkID8gJCgnI2Zvcm1JZCcpIDogJCgnZm9ybScpKS5zZXJpYWxpemVKU09OKCksXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocnMsIHN0YXR1cywgeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRPcHRpb25zSWRlbnRpZmllci5hcGkuc2V0Um93RGF0YShycy5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIGA7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHRlbXBsYXRlLCBmdW5jdGlvbk5hbWUgfTsiLCJpbXBvcnQgeyBkYXRhVXJsLCBkYXRhVmFsdWVNYXBwaW5nLCBkYXRhVGV4dE1hcHBpbmcgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb21tb25cIjtcclxuaW1wb3J0IHsgYXV0b3NlbGVjdGlucHV0U2VsZWN0b3IgfSBmcm9tICcuLi91dGlsL3NlbGVjdG9ycyc7XHJcblxyXG5mdW5jdGlvbiB0ZW1wbGF0ZSgpIHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVPcHRpb25zKGVsLCByZXNwb25zZSkge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAkKGVsKS5hdHRyKCcke2RhdGFWYWx1ZU1hcHBpbmd9JykgfHwgJ3ZhbHVlJztcclxuICAgICAgICAgICAgdmFyIHRleHQgPSAkKGVsKS5hdHRyKCcke2RhdGFUZXh0TWFwcGluZ30nKSB8fCAndGV4dCc7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gKG9wdGlvbikge1xyXG4gICAgICAgICAgICAgICAgJCgnPG9wdGlvbj48L29wdGlvbj4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC52YWwob3B0aW9uW3ZhbHVlXSlcclxuICAgICAgICAgICAgICAgICAgICAudGV4dChvcHRpb25bdGV4dF0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKCQoZWwpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEFycmF5LmZyb20oJCgnYm9keScpLmZpbmQoJyR7YXV0b3NlbGVjdGlucHV0U2VsZWN0b3J9JykpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChlbCkuYXR0cignJHtkYXRhVXJsfScpO1xyXG4gICAgICAgICAgICB9KS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICQoZWwpLmF0dHIoJyR7ZGF0YVVybH0nKSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZU9wdGlvbnMoZWwsIHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgYDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGVtcGxhdGU7IiwiaW1wb3J0IHsgZGF0YVRhYmxlSWQsIGRhdGFBdXRvU2VsZWN0SWQsIGRhdGFCdXR0b25JZCB9IGZyb20gJy4uL2NvbXBvbmVudHMvY29tbW9uJztcclxuXHJcbmNvbnN0IHRhYmxlU2VsZWN0b3IgPSBgWyR7ZGF0YVRhYmxlSWR9XWA7XHJcbmNvbnN0IGVtcHR5Q2hpbGRyZW5TZWxlY3RvcnMgPSBbdGFibGVTZWxlY3Rvcl07XHJcbmNvbnN0IGF1dG9zZWxlY3RpbnB1dFNlbGVjdG9yID0gYFske2RhdGFBdXRvU2VsZWN0SWR9XWA7XHJcbmNvbnN0IHN1Ym1pdEJ1dHRvblNlbGVjdG9yID0gYGJ1dHRvblske2RhdGFCdXR0b25JZH1dYDtcclxuXHJcbmV4cG9ydCB7IGVtcHR5Q2hpbGRyZW5TZWxlY3RvcnMsIHRhYmxlU2VsZWN0b3IsIGF1dG9zZWxlY3RpbnB1dFNlbGVjdG9yLCBzdWJtaXRCdXR0b25TZWxlY3RvciB9OyIsImltcG9ydCB7IEJ1dHRvbklucHV0LCBUZXh0VmFsdWVJbnB1dCwgU2VsZWN0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgZGF0YUNvbXBvbmVudElkLCBkYXRhVGFibGVJZCB9IGZyb20gJy4uL2NvbW1vbic7XHJcbmltcG9ydCBWdnZlYiBmcm9tICcuLi8uLi9idWlsZGVyJztcclxuXHJcbmNvbnN0IHRhYmxlcyA9IHt9O1xyXG5sZXQgaW5kZXggPSAxO1xyXG5mdW5jdGlvbiBzZXRDb2x1bW5EZWZzQW5kUmVuZGVyKG5vZGUsIGNvbERlZnMpIHtcclxuICAgIC8vIENhbGwgdG8gc2V0IG5ldyBjb2x1bW4gZGVmaW5pdGlvbnMgaW50byB0aGUgZ3JpZC4gXHJcbiAgICAvLyBUaGUgZ3JpZCB3aWxsIHJlZHJhdyBhbGwgdGhlIGNvbHVtbiBoZWFkZXJzLCBhbmQgdGhlbiByZWRyYXcgYWxsIG9mIHRoZSByb3dzLlxyXG4gICAgdGFibGVzWyQobm9kZSkuYXR0cihkYXRhVGFibGVJZCldLmFwaS5zZXRDb2x1bW5EZWZzKGNvbERlZnMpO1xyXG4gICAgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIoXCJodG1sL3RhYmxlQG9lZVwiKTtcclxufVxyXG5cclxuY29uc3QgdGFibGUgPSB7XHJcbiAgICBub2RlczogW1widGFibGVcIl0sXHJcbiAgICBjbGFzc2VzOiBbXCJ0YWJsZVwiXSxcclxuICAgIGltYWdlOiBcImljb25zL3RhYmxlLnN2Z1wiLFxyXG4gICAgbmFtZTogXCJhZy1HcmlkXCIsXHJcbiAgICBodG1sOiBgPGRpdiAke2RhdGFDb21wb25lbnRJZH09XCJodG1sL3RhYmxlQG9lZVwiIHN0eWxlPVwid2lkdGg6IDUwMHB4OyBoZWlnaHQ6IDIwMHB4O1wiIGNsYXNzPVwiZHJvcHpvbmUgZHJhZ2dhYmxlIGFnLXRoZW1lLWJsdWUgaG9yaXpvbnRhbC1zdHJpcGVzXCI+PC9kaXY+YCxcclxuICAgIG9uRHJvcChub2RlKSB7XHJcbiAgICAgICAgJChub2RlKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogJ2NhbGMoMTAwJSAtIDI1cHgpJyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJycsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiAnJyxcclxuICAgICAgICAgICAgICAgIHRvcDogJycsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICcnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZHJhZ2dhYmxlJyk7XHJcbiAgICAgICAgVnZ2ZWIuQnVpbGRlci5mcmFtZUJvZHkuZmluZCgnLmNvbnRhaW5lclJpZ2h0IC5hbGxDb250ZW50IC50b3BDb250ZW50IC5jb250YWluZXIgLnJvdyAuZXZlcnlCb3ggLmJveGFyZWEnKS5hcHBlbmQoJChub2RlKS5wcm9wKCdvdXRlckhUTUwnKSk7XHJcbiAgICAgICAgJChub2RlKS5yZW1vdmUoKTtcclxuICAgIH0sXHJcbiAgICBnZXRUYWJsZShrZXkpIHtcclxuICAgICAgICByZXR1cm4gdGFibGVzW2tleV07XHJcbiAgICB9LFxyXG4gICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAkKG5vZGUpLnJlbW92ZUNsYXNzKCdob3Jpem9udGFsLXN0cmlwZXMnKTtcclxuICAgICAgICBpZiAoISQobm9kZSkuYXR0cihkYXRhVGFibGVJZCkpIHtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSBpbmRleCsrO1xyXG4gICAgICAgICAgICAkKG5vZGUpLmF0dHIoZGF0YVRhYmxlSWQsIGlkKTtcclxuICAgICAgICAgICAgdGFibGVzW2lkXSA9IHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbkRlZnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IGhlYWRlck5hbWU6IFwiaGVhZGVyXCIsIGZpZWxkOiBcImZpbGVkXCIsIHdpZHRoOiAnJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgaGVhZGVyTmFtZTogXCJoZWFkZXJcIiwgZmllbGQ6IFwiZmllbGRcIiwgd2lkdGg6ICcnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBoZWFkZXJOYW1lOiBcImhlYWRlclwiLCBmaWVsZDogXCJmaWVsZFwiLCB3aWR0aDogJycgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZVNvcnRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlRmlsdGVyOiBmYWxzZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBuZXcgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpZnJhbWVJZCcpLmNvbnRlbnRXaW5kb3cuYWdHcmlkKS5HcmlkKG5vZGUsIHRhYmxlc1tpZF0pO1xyXG4gICAgICAgICAgICB0YWJsZXNbaWRdLmFwaS5zZXRSb3dEYXRhKFtdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0YWJsZXNbJChub2RlKS5hdHRyKGRhdGFUYWJsZUlkKV0uY29sdW1uRGVmcy5yZWR1Y2UoKHByZXYsIGN1cikgPT4ge1xyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIHByZXYucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkhlYWRlciBcIiArIGksXHJcbiAgICAgICAgICAgICAgICBrZXk6IFwib3B0aW9uXCIgKyBpLFxyXG4gICAgICAgICAgICAgICAgLy9pbmRleDogaSAtIDEsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25Ob2RlOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgaW5wdXR0eXBlOiBUZXh0VmFsdWVJbnB1dCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ3RhYmxlaGVhZGVyQG9lZScsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyTmFtZTogY3VyLmhlYWRlck5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGN1ci5maWVsZCxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogY3VyLndpZHRoXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXlJbmRleCA9IHBhcnNlSW50KHRoaXMua2V5LnN1YnN0cignb3B0aW9uJy5sZW5ndGgpKSAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbERlZnMgPSB0YWJsZXNbJChub2RlKS5hdHRyKGRhdGFUYWJsZUlkKV0uY29sdW1uRGVmcztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQubm9kZU5hbWUgPT0gJ0JVVFRPTicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sRGVmcyA9IGNvbERlZnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKHZhbHVlLCBpbmRleCkgPT4gaW5kZXggIT0ga2V5SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZXNbJChub2RlKS5hdHRyKGRhdGFUYWJsZUlkKV0uY29sdW1uRGVmcyA9IGNvbERlZnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbHVtbkRlZnNBbmRSZW5kZXIobm9kZSwgY29sRGVmcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Lm5hbWUgPT0gJ3dpZHRoJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sRGVmc1trZXlJbmRleF1baW5wdXQubmFtZV0gPSB2YWx1ZSAmJiBwYXJzZUludCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xEZWZzW2tleUluZGV4XVtpbnB1dC5uYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOmHjeaWsOa4suafk+S8muWkseWOu+i+k+WFpeahhueEpueCue+8jOWPqumcgOimgeeUqOaWsOeahGNvbERlZnPmm7TmlrDooajmoLzljbPlj6/vvIzlj7PkvqfnmoTpg6jliIbkuI3pnIDopoHph43mlrDmuLLmn5PjgIJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVzWyQobm9kZSkuYXR0cihkYXRhVGFibGVJZCldLmFwaS5zZXRDb2x1bW5EZWZzKGNvbERlZnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJldjtcclxuICAgICAgICB9LCBbXSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHRoaXMucHJvcGVydGllcy5maWx0ZXIocHJvcGVydHkgPT4gcHJvcGVydHkua2V5LmluZGV4T2YoXCJvcHRpb25cIikgPT09IC0xKTtcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMudW5zaGlmdCguLi5wcm9wZXJ0aWVzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9LFxyXG4gICAgcHJvcGVydGllczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJUaGVtZVwiLFxyXG4gICAgICAgICAgICBrZXk6IFwidGhlbWVcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFsnYWctdGhlbWUtYmFsaGFtLWRhcmsnLCAnYWctdGhlbWUtYmFsaGFtJywgJ2FnLXRoZW1lLWJsdWUnLCAnYWctdGhlbWUtYm9vdHN0cmFwJyxcclxuICAgICAgICAgICAgICAgICdhZy10aGVtZS1kYXJrJywgJ2FnLXRoZW1lLWZyZXNoJywgJ2FnLXRoZW1lLW1hdGVyaWFsJ10sXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQ2xhc3ModGhpcy52YWxpZFZhbHVlcy5qb2luKFwiIFwiKSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmFkZENsYXNzKHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb2RlIGNvcGllZCBmb3JtIG9mZmljaWFsIHNpdGUgZXhhbXBsZSBodHRwczovL3d3dy5hZy1ncmlkLmNvbS9leGFtcGxlLnBocCMvXHJcbiAgICAgICAgICAgICAgICBjb25zdCBncmlkT3B0aW9ucyA9IHRhYmxlc1tub2RlLmF0dHIoZGF0YVRhYmxlSWQpXTtcclxuICAgICAgICAgICAgICAgIGdyaWRPcHRpb25zLmFwaS5yZXNldFJvd0hlaWdodHMoKTtcclxuICAgICAgICAgICAgICAgIGdyaWRPcHRpb25zLmFwaS5yZWRyYXdSb3dzKCk7XHJcbiAgICAgICAgICAgICAgICBncmlkT3B0aW9ucy5hcGkucmVmcmVzaEhlYWRlcigpO1xyXG4gICAgICAgICAgICAgICAgZ3JpZE9wdGlvbnMuYXBpLnJlZnJlc2hUb29sUGFuZWwoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJEZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImFnLXRoZW1lLWJhbGhhbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQmFsaGFtXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJhZy10aGVtZS1iYWxoYW0tZGFya1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQmFsaGFtIChkYXJrKVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiYWctdGhlbWUtYmx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQmx1ZVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiYWctdGhlbWUtYm9vdHN0cmFwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJCb290c3RyYXBcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImFnLXRoZW1lLWRhcmtcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhcmtcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImFnLXRoZW1lLWZyZXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJGcmVzaFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiYWctdGhlbWUtbWF0ZXJpYWxcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIk1hdGVyaWFsXCJcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICAgICAga2V5OiBcImFkZENoaWxkXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQnV0dG9uSW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHsgdGV4dDogXCJBZGQgaGVhZGVyXCIgfSxcclxuICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xEZWZzID0gdGFibGVzWyQobm9kZSkuYXR0cihkYXRhVGFibGVJZCldLmNvbHVtbkRlZnM7XHJcbiAgICAgICAgICAgICAgICBjb2xEZWZzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlck5hbWU6ICdoZWFkZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiAnZmllbGQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0Q29sdW1uRGVmc0FuZFJlbmRlcihub2RlLCBjb2xEZWZzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhYmxlOyIsImZ1bmN0aW9uIGh0bWxHZW5lcmF0b3IoaHRtbCwgLi4uZm5zKSB7XHJcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2h0bWwnKTtcclxuICAgIGVsLmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICBmbnMucmVkdWNlKChlbCwgZm4pID0+IGZuKGVsKSwgZWwpO1xyXG4gICAgcmV0dXJuICQoZWwpLnByb3AoJ291dGVySFRNTCcpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBodG1sR2VuZXJhdG9yOyIsIi8vIFRvZ2dsZSBmdWxsc2NyZWVuXHJcbmZ1bmN0aW9uIGxhdW5jaEZ1bGxTY3JlZW4oZG9jdW1lbnQpIHtcclxuICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LkZ1bGxTY3JlZW5FbGVtZW50KVxyXG4gICAgICAgICAgICBkb2N1bWVudC5leGl0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgLy9tb3ppbGxhXHRcdFxyXG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50KVxyXG4gICAgICAgICAgICBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICAvL3dlYmtpdFx0ICBcclxuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudClcclxuICAgICAgICAgICAgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgIC8vaWVcdCAgXHJcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC5tc0Z1bGxTY3JlZW5FbGVtZW50KVxyXG4gICAgICAgICAgICBkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBsYXVuY2hGdWxsU2NyZWVuIH07IiwiZnVuY3Rpb24gZG93bmxvYWRBc1RleHRGaWxlKGZpbGVuYW1lLCB0ZXh0KSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBgZGF0YTp0ZXh0L2h0bWw7Y2hhcnNldD11dGYtOCwke2VuY29kZVVSSUNvbXBvbmVudCh0ZXh0KX1gKTtcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIGZpbGVuYW1lKTtcclxuXHJcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG5cclxuICAgIGVsZW1lbnQuY2xpY2soKTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG59XHJcblxyXG5leHBvcnQgeyBkb3dubG9hZEFzVGV4dEZpbGUgfTsiLCJpbXBvcnQgeyBkYXRhQ29uZmlnSW5mbywgZGF0YUNhbGVuZGFySWQgfSBmcm9tICcuLi9jb21wb25lbnRzL2NvbW1vbic7XHJcbmNvbnN0IGNhbGVuZGFyU2VsZWN0b3IgPSBgaW5wdXRbJHtkYXRhQ2FsZW5kYXJJZH1dYDtcclxuY29uc3QgY2FsZW5kYXJPbmNsaWNrU2VsZWN0b3IgPSBgaW5wdXRbJHtkYXRhQ2FsZW5kYXJJZH1dW29uY2xpY2tdYDtcclxuLy8gPGlucHV0IGRhdGEtaWQ9XCJ7J2EnLCBifVwiPiDmm7/mjaLljIXlkKsnXFwnJ+eahOWxnuaAp+WAvOS4uuWQiOazleeahGpzb27lrZfnrKbkuLJcclxuZnVuY3Rpb24gZ2V0RGF0YUNvbmZpZ0luZm8obm9kZSkge1xyXG4gICAgcmV0dXJuICQobm9kZSkuYXR0cihkYXRhQ29uZmlnSW5mbyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERhdGFDb25maWdJbmZvSlNPTlN0cmluZyhub2RlKSB7XHJcbiAgICByZXR1cm4gZ2V0RGF0YUNvbmZpZ0luZm8obm9kZSkucmVwbGFjZSgvJy9nLCAnXCInKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0RGF0YUNvbmZpZ0luZm8obm9kZSwgbmV3VmFsdWUpIHtcclxuICAgICQobm9kZSkuYXR0cihkYXRhQ29uZmlnSW5mbywgSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpLnJlcGxhY2UoL1wiL2csICdcXCcnKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldE9uY2xpY2tBdHRyKG5vZGUpIHtcclxuICAgIHJldHVybiAkKG5vZGUpLmF0dHIoJ29uY2xpY2snLCBgV2RhdGVQaWNrZXIoJHtnZXREYXRhQ29uZmlnSW5mbyhub2RlKX0pYCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFBhcnNlZENvbmZpZ0luZm8obm9kZSkge1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoZ2V0RGF0YUNvbmZpZ0luZm9KU09OU3RyaW5nKG5vZGUpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF0ZUZtdChub2RlKSB7XHJcbiAgICByZXR1cm4gZ2V0UGFyc2VkQ29uZmlnSW5mbyhub2RlKS5kYXRlRm10O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9uZVdpdGhvdXRPbmNsaWNrKG5vZGUpIHtcclxuICAgIGNvbnN0ICRjbG9uZSA9ICQobm9kZSkucmVtb3ZlQXR0cignb25jbGljaycpLmNsb25lKCk7XHJcbiAgICAkKG5vZGUpLnJlcGxhY2VXaXRoKCRjbG9uZSk7XHJcbiAgICByZXR1cm4gJGNsb25lO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXBsYWNlT3RoZXJTaG93aW5nQ2FsZW5kYXJJbnB1dHMoZWxlbWVudCwgY29udGV4dCkge1xyXG4gICAgaWYgKCEkKGVsZW1lbnQpLmlzKGNhbGVuZGFyT25jbGlja1NlbGVjdG9yKSkge1xyXG4gICAgICAgIGNvbnRleHQuZmluZChjYWxlbmRhck9uY2xpY2tTZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNsb25lV2l0aG91dE9uY2xpY2sodGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICByZXBsYWNlT3RoZXJTaG93aW5nQ2FsZW5kYXJJbnB1dHMsIGNsb25lV2l0aG91dE9uY2xpY2ssXHJcbiAgICBjYWxlbmRhclNlbGVjdG9yLCBjYWxlbmRhck9uY2xpY2tTZWxlY3RvcixcclxuICAgIGdldERhdGFDb25maWdJbmZvLCBnZXREYXRlRm10LCBnZXRQYXJzZWRDb25maWdJbmZvLFxyXG4gICAgc2V0T25jbGlja0F0dHIsIHNldERhdGFDb25maWdJbmZvXHJcbn07IiwiLypcclxuQ29weXJpZ2h0IDIwMTcgWmlhZGluIEdpdmFuXHJcblxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cclxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcblxyXG5odHRwczovL2dpdGh1Yi5jb20vZ2l2YW56L1Z2dmViSnNcclxuKi9cclxuaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5pbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuaW1wb3J0IENoZWNrYm94SW5wdXQgZnJvbSAnLi9DaGVja2JveElucHV0JztcclxuaW1wb3J0IFNlbGVjdElucHV0IGZyb20gJy4vU2VsZWN0SW5wdXQnO1xyXG5pbXBvcnQgTGlua0lucHV0IGZyb20gJy4vTGlua0lucHV0JztcclxuaW1wb3J0IFJhbmdlSW5wdXQgZnJvbSAnLi9SYW5nZUlucHV0JztcclxuaW1wb3J0IE51bWJlcklucHV0IGZyb20gJy4vTnVtYmVySW5wdXQnO1xyXG5pbXBvcnQgQ3NzVW5pdElucHV0IGZyb20gJy4vQ3NzVW5pdElucHV0JztcclxuaW1wb3J0IENvbG9ySW5wdXQgZnJvbSAnLi9Db2xvcklucHV0JztcclxuaW1wb3J0IEZpbGVVcGxvYWRJbnB1dCBmcm9tICcuL0ZpbGVVcGxvYWRJbnB1dCc7XHJcbmltcG9ydCBSYWRpb0lucHV0IGZyb20gJy4vUmFkaW9JbnB1dCc7XHJcbmltcG9ydCBSYWRpb0J1dHRvbklucHV0IGZyb20gJy4vUmFkaW9CdXR0b25JbnB1dCc7XHJcbmltcG9ydCBUb2dnbGVJbnB1dCBmcm9tICcuL1RvZ2dsZUlucHV0JztcclxuaW1wb3J0IFZhbHVlVGV4dElucHV0IGZyb20gJy4vVmFsdWVUZXh0SW5wdXQnO1xyXG5pbXBvcnQgR3JpZExheW91dElucHV0IGZyb20gJy4vR3JpZExheW91dElucHV0JztcclxuaW1wb3J0IFByb2R1Y3RzSW5wdXQgZnJvbSAnLi9Qcm9kdWN0c0lucHV0JztcclxuaW1wb3J0IEdyaWRJbnB1dCBmcm9tICcuL0dyaWRJbnB1dCc7XHJcbmltcG9ydCBUZXh0VmFsdWVJbnB1dCBmcm9tICcuL1RleHRWYWx1ZUlucHV0JztcclxuaW1wb3J0IEJ1dHRvbklucHV0IGZyb20gJy4vQnV0dG9uSW5wdXQnO1xyXG5pbXBvcnQgU2VjdGlvbklucHV0IGZyb20gJy4vU2VjdGlvbklucHV0JztcclxuaW1wb3J0IExpc3RJbnB1dCBmcm9tICcuL0xpc3RJbnB1dCc7XHJcblxyXG5leHBvcnQge1xyXG5cdElucHV0LCBUZXh0SW5wdXQsIENoZWNrYm94SW5wdXQsIFNlbGVjdElucHV0LCBMaW5rSW5wdXQsIFJhbmdlSW5wdXQsIE51bWJlcklucHV0LCBDc3NVbml0SW5wdXQsXHJcblx0UmFkaW9JbnB1dCwgUmFkaW9CdXR0b25JbnB1dCwgVG9nZ2xlSW5wdXQsIFZhbHVlVGV4dElucHV0LCBHcmlkTGF5b3V0SW5wdXQsIFByb2R1Y3RzSW5wdXQsIEdyaWRJbnB1dCxcclxuXHRUZXh0VmFsdWVJbnB1dCwgQnV0dG9uSW5wdXQsIFNlY3Rpb25JbnB1dCwgTGlzdElucHV0LCBDb2xvcklucHV0LCBGaWxlVXBsb2FkSW5wdXRcclxufTsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuXHJcbmNvbnN0IFZhbHVlVGV4dElucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImtleXVwXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZhbHVlVGV4dElucHV0OyIsImltcG9ydCBUZXh0SW5wdXQgZnJvbSAnLi9UZXh0SW5wdXQnO1xyXG5cclxuY29uc3QgVG9nZ2xlSW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQsIG5vZGUpIHtcclxuXHRcdGlmIChldmVudC5kYXRhICYmIGV2ZW50LmRhdGEuZWxlbWVudCkge1xyXG5cdFx0XHRldmVudC5kYXRhLmVsZW1lbnQudHJpZ2dlcigncHJvcGVydHlDaGFuZ2UnLCBbdGhpcy5jaGVja2VkID8gdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlLW9uXCIpIDogdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlLW9mZlwiKSwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidG9nZ2xlXCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRvZ2dsZUlucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFRleHRWYWx1ZUlucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XHRbXCJjbGlja1wiLCBcIm9uQ2hhbmdlXCIsIFwiYnV0dG9uXCIgLyonc2VsZWN0JyovXSxcclxuXHRdLFxyXG5cclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHR2YWx1ZVwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGV4dFZhbHVlSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgU2VsZWN0SW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcbiAgICBldmVudHM6IFtcclxuICAgICAgICBbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcInNlbGVjdFwiXSxcclxuICAgIF0sXHJcblxyXG5cclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAkKCdzZWxlY3QnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKFwic2VsZWN0XCIsIGRhdGEpO1xyXG4gICAgfSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlbGVjdElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFNlY3Rpb25JbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNsaWNrXCIsIFwib25DaGFuZ2VcIiwgXCJidXR0b25cIiAvKidzZWxlY3QnKi9dLFxyXG5cdF0sXHJcblxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInNlY3Rpb25pbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFJhbmdlSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJyYW5nZWlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhbmdlSW5wdXQ7IiwiaW1wb3J0IFJhZGlvSW5wdXQgZnJvbSAnLi9SYWRpb0lucHV0JztcclxuXHJcbmNvbnN0IFJhZGlvQnV0dG9uSW5wdXQgPSAkLmV4dGVuZCh7fSwgUmFkaW9JbnB1dCwge1xyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKFwicmFkaW9idXR0b25pbnB1dFwiLCBkYXRhKTtcclxuICAgIH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhZGlvQnV0dG9uSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgUmFkaW9JbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRvbkNoYW5nZTogZnVuY3Rpb24gKGV2ZW50LCBub2RlKSB7XHJcblxyXG5cdFx0aWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS5lbGVtZW50KSB7XHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt0aGlzLnZhbHVlLCB0aGlzXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XHJcblx0XHRpZiAodmFsdWUpXHJcblx0XHRcdCQoXCJpbnB1dFt2YWx1ZT1cIiArIHZhbHVlICsgXCJdXCIsIHRoaXMuZWxlbWVudCkucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJyYWRpb2lucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhZGlvSW5wdXQ7IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBQcm9kdWN0c0lucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImtleXVwXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RzSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxudmFyIE51bWJlcklucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwibnVtYmVyaW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTnVtYmVySW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgTGlzdElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJzZWxlY3RcIl0sXHJcblx0XSxcclxuXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ3NlbGVjdCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwibGlzdGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaXN0SW5wdXQ7IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBMaW5rSW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbmtJbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuXHJcbmNvbnN0IEdyaWRMYXlvdXRJbnB1dCA9ICQuZXh0ZW5kKHt9LCBUZXh0SW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHcmlkTGF5b3V0SW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgR3JpZElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcInNlbGVjdFwiIC8qJ3NlbGVjdCcqL10sXHJcblx0XHRbXCJjbGlja1wiLCBcIm9uQ2hhbmdlXCIsIFwiYnV0dG9uXCIgLyonc2VsZWN0JyovXSxcclxuXHRdLFxyXG5cclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnc2VsZWN0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJncmlkXCIsIGRhdGEpO1xyXG5cdH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHcmlkSW5wdXQ7IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBGaWxlVXBsb2FkSW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmlsZVVwbG9hZElucHV0O1xyXG4iLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBUZXh0SW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcbiAgICBldmVudHM6IFtcclxuICAgICAgICBbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0IF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHRcclxuXHRpbml0OiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxuICB9XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUZXh0SW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgQ3NzVW5pdElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdG51bWJlcjogMCxcclxuXHR1bml0OiBcInB4XCIsXHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpIHtcclxuXHRcdFx0aW5wdXQgPSBldmVudC5kYXRhLmlucHV0O1xyXG5cdFx0XHRpbnB1dFt0aGlzLm5hbWVdID0gdGhpcy52YWx1ZTsvLyB0aGlzLm5hbWUgPSB1bml0IG9yIG51bWJlclx0XHJcblxyXG5cdFx0XHR2YWx1ZSA9IFwiXCI7XHJcblx0XHRcdGlmIChpbnB1dC51bml0ID09IFwiYXV0b1wiKSB7XHJcblx0XHRcdFx0JChldmVudC5kYXRhLmVsZW1lbnQpLmFkZENsYXNzKFwiYXV0b1wiKTtcclxuXHRcdFx0XHR2YWx1ZSA9IGlucHV0LnVuaXQ7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0JChldmVudC5kYXRhLmVsZW1lbnQpLnJlbW92ZUNsYXNzKFwiYXV0b1wiKTtcclxuXHRcdFx0XHR2YWx1ZSA9IGlucHV0Lm51bWJlciArIGlucHV0LnVuaXQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt2YWx1ZSwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJzZWxlY3RcIl0sXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdHRoaXMubnVtYmVyID0gcGFyc2VJbnQodmFsdWUpO1xyXG5cdFx0dGhpcy51bml0ID0gdmFsdWUucmVwbGFjZSh0aGlzLm51bWJlciwgJycpO1xyXG5cclxuXHRcdGlmICh0aGlzLnVuaXQgPT0gXCJhdXRvXCIpICQodGhpcy5lbGVtZW50KS5hZGRDbGFzcyhcImF1dG9cIik7XHJcblxyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh0aGlzLm51bWJlcik7XHJcblx0XHQkKCdzZWxlY3QnLCB0aGlzLmVsZW1lbnQpLnZhbCh0aGlzLnVuaXQpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJjc3N1bml0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3NzVW5pdElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IENvbG9ySW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0Ly9odG1sNSBjb2xvciBpbnB1dCBvbmx5IHN1cHBvcnRzIHNldHRpbmcgdmFsdWVzIGFzIGhleCBjb2xvcnMgZXZlbiBpZiB0aGUgcGlja2VyIHJldHVybnMgb25seSByZ2JcclxuXHRyZ2IyaGV4OiBmdW5jdGlvbiAocmdiKSB7XHJcblxyXG5cdFx0cmdiID0gcmdiLm1hdGNoKC9ecmdiYT9bXFxzK10/XFwoW1xccytdPyhcXGQrKVtcXHMrXT8sW1xccytdPyhcXGQrKVtcXHMrXT8sW1xccytdPyhcXGQrKVtcXHMrXT8vaSk7XHJcblxyXG5cdFx0cmV0dXJuIChyZ2IgJiYgcmdiLmxlbmd0aCA9PT0gNCkgPyBcIiNcIiArXHJcblx0XHRcdChcIjBcIiArIHBhcnNlSW50KHJnYlsxXSwgMTApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpICtcclxuXHRcdFx0KFwiMFwiICsgcGFyc2VJbnQocmdiWzJdLCAxMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMikgK1xyXG5cdFx0XHQoXCIwXCIgKyBwYXJzZUludChyZ2JbM10sIDEwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKSA6IHJnYjtcclxuXHR9LFxyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh0aGlzLnJnYjJoZXgodmFsdWUpKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwiY29sb3JpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb2xvcklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IENoZWNrYm94SW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0b25DaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50LCBub2RlKSB7XHJcblx0XHRcclxuXHRcdGlmIChldmVudC5kYXRhICYmIGV2ZW50LmRhdGEuZWxlbWVudClcclxuXHRcdHtcclxuXHRcdFx0ZXZlbnQuZGF0YS5lbGVtZW50LnRyaWdnZXIoJ3Byb3BlcnR5Q2hhbmdlJywgW3RoaXMuY2hlY2tlZCwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG4gICAgZXZlbnRzOiBbXHJcbiAgICAgICAgW1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHQgXSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cdFxyXG5cdGluaXQ6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImNoZWNrYm94aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxuICB9XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaGVja2JveElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IEJ1dHRvbklucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2xpY2tcIiwgXCJvbkNoYW5nZVwiLCBcImJ1dHRvblwiIC8qJ3NlbGVjdCcqL10sXHJcblx0XSxcclxuXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2J1dHRvbicsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwiYnV0dG9uXCIsIGRhdGEpO1xyXG5cdH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b25JbnB1dDsiLCJjb25zdCBJbnB1dCA9IHtcclxuXHRcclxuXHRpbml0OiBmdW5jdGlvbihuYW1lKSB7XHJcblx0fSxcclxuXHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbihldmVudCwgbm9kZSkge1xyXG5cdFx0XHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpXHJcblx0XHR7XHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt0aGlzLnZhbHVlLCB0aGlzXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0cmVuZGVyVGVtcGxhdGU6IGZ1bmN0aW9uKG5hbWUsIGRhdGEpIHtcclxuXHRcdHJldHVybiB0bXBsKFwidnZ2ZWItaW5wdXQtXCIgKyBuYW1lLCBkYXRhKTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uKG5hbWUsIGRhdGEpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQodGhpcy5yZW5kZXJUZW1wbGF0ZShuYW1lLCBkYXRhKSk7XHJcblx0XHRcclxuXHRcdC8vYmluZCBldmVudHNcclxuXHRcdGlmICh0aGlzLmV2ZW50cylcclxuXHRcdGZvciAodmFyIGkgaW4gdGhpcy5ldmVudHMpXHJcblx0XHR7XHJcblx0XHRcdGV2ZW50ID0gdGhpcy5ldmVudHNbaV1bMF07XHJcblx0XHRcdGZ1biA9IHRoaXNbIHRoaXMuZXZlbnRzW2ldWzFdIF07XHJcblx0XHRcdGVsID0gdGhpcy5ldmVudHNbaV1bMl07XHJcblx0XHRcclxuXHRcdFx0dGhpcy5lbGVtZW50Lm9uKGV2ZW50LCBlbCwge2VsZW1lbnQ6IHRoaXMuZWxlbWVudCwgaW5wdXQ6dGhpc30sIGZ1bik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuZWxlbWVudDtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnB1dDsiLCJjb25zdCBiZ2NvbG9yQ2xhc3NlcyA9IFtcImJnLXByaW1hcnlcIiwgXCJiZy1zZWNvbmRhcnlcIiwgXCJiZy1zdWNjZXNzXCIsIFwiYmctZGFuZ2VyXCIsIFwiYmctd2FybmluZ1wiLCBcImJnLWluZm9cIiwgXCJiZy1saWdodFwiLCBcImJnLWRhcmtcIiwgXCJiZy13aGl0ZVwiXTtcclxuXHJcbmNvbnN0IGJnY29sb3JTZWxlY3RPcHRpb25zID1cclxuICAgIFt7XHJcbiAgICAgICAgdmFsdWU6IFwiRGVmYXVsdFwiLFxyXG4gICAgICAgIHRleHQ6IFwiXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctcHJpbWFyeVwiLFxyXG4gICAgICAgIHRleHQ6IFwiUHJpbWFyeVwiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctc2Vjb25kYXJ5XCIsXHJcbiAgICAgICAgdGV4dDogXCJTZWNvbmRhcnlcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLXN1Y2Nlc3NcIixcclxuICAgICAgICB0ZXh0OiBcIlN1Y2Nlc3NcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLWRhbmdlclwiLFxyXG4gICAgICAgIHRleHQ6IFwiRGFuZ2VyXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy13YXJuaW5nXCIsXHJcbiAgICAgICAgdGV4dDogXCJXYXJuaW5nXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1pbmZvXCIsXHJcbiAgICAgICAgdGV4dDogXCJJbmZvXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1saWdodFwiLFxyXG4gICAgICAgIHRleHQ6IFwiTGlnaHRcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLWRhcmtcIixcclxuICAgICAgICB0ZXh0OiBcIkRhcmtcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLXdoaXRlXCIsXHJcbiAgICAgICAgdGV4dDogXCJXaGl0ZVwiXHJcbiAgICB9XTtcclxuXHJcbmZ1bmN0aW9uIGNoYW5nZU5vZGVOYW1lKG5vZGUsIG5ld05vZGVOYW1lKSB7XHJcbiAgICB2YXIgbmV3Tm9kZTtcclxuICAgIG5ld05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5ld05vZGVOYW1lKTtcclxuICAgIGF0dHJpYnV0ZXMgPSBub2RlLmdldCgwKS5hdHRyaWJ1dGVzO1xyXG5cclxuICAgIGZvciAoaSA9IDAsIGxlbiA9IGF0dHJpYnV0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBuZXdOb2RlLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVzW2ldLm5vZGVOYW1lLCBhdHRyaWJ1dGVzW2ldLm5vZGVWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgJChuZXdOb2RlKS5hcHBlbmQoJChub2RlKS5jb250ZW50cygpKTtcclxuICAgICQobm9kZSkucmVwbGFjZVdpdGgobmV3Tm9kZSk7XHJcblxyXG4gICAgcmV0dXJuIG5ld05vZGU7XHJcbn1cclxuXHJcbmxldCBiYXNlX3NvcnQgPSAxMDA7Ly9zdGFydCBzb3J0aW5nIGZvciBiYXNlIGNvbXBvbmVudCBmcm9tIDEwMCB0byBhbGxvdyBleHRlbmRlZCBwcm9wZXJ0aWVzIHRvIGJlIGZpcnN0XHJcbmZ1bmN0aW9uIGluY19iYXNlX3NvcnQoKSB7XHJcbiAgICByZXR1cm4gYmFzZV9zb3J0Kys7XHJcbn1cclxuXHJcbmNvbnN0IGRhdGFDb21wb25lbnRJZCA9ICdkYXRhLWNvbXBvbmVudC1pZCc7XHJcbmNvbnN0IGRhdGFUYWJsZUlkID0gJ2RhdGEtdGFibGUtaWQnO1xyXG5jb25zdCBkYXRhQ2FsZW5kYXJJZCA9ICdkYXRhLWNhbGVuZGFyLWlkJztcclxuY29uc3QgZGF0YUNvbmZpZ0luZm8gPSAnZGF0YS1jb25maWctaW5mbyc7XHJcbmNvbnN0IGRhdGFBdXRvU2VsZWN0SWQgPSAnZGF0YS1hdXRvLXNlbGVjdC1pZCc7XHJcbmNvbnN0IGRhdGFCdXR0b25JZCA9ICdkYXRhLWJ1dHRvbi1pZCc7XHJcbmNvbnN0IGRhdGFVcmwgPSAnZGF0YS11cmwnO1xyXG5jb25zdCBkYXRhVmFsdWVNYXBwaW5nID0gJ2RhdGEtdmFsdWUtbWFwcGluZyc7XHJcbmNvbnN0IGRhdGFUZXh0TWFwcGluZyA9ICdkYXRhLXRleHQtbWFwcGluZyc7XHJcblxyXG5leHBvcnQge1xyXG4gICAgYmdjb2xvckNsYXNzZXMsIGJnY29sb3JTZWxlY3RPcHRpb25zLCBjaGFuZ2VOb2RlTmFtZSwgaW5jX2Jhc2Vfc29ydCwgZGF0YUNvbXBvbmVudElkLCBkYXRhVGFibGVJZCxcclxuICAgIGRhdGFDb25maWdJbmZvLCBkYXRhQ2FsZW5kYXJJZCwgZGF0YVVybCwgZGF0YUF1dG9TZWxlY3RJZCwgZGF0YUJ1dHRvbklkLCBkYXRhVmFsdWVNYXBwaW5nLCBkYXRhVGV4dE1hcHBpbmdcclxufTtcclxuIl19
