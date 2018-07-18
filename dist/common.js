require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({53:[function(require,module,exports){
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

var _dom = require('./util/dom');

var _selectors = require('./util/selectors');

var _jquery = require('../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

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
			newData = _jquery2.default.extend(true, {}, inheritData, data);
			newData.properties = _jquery2.default.merge(_jquery2.default.merge([], inheritData.properties ? inheritData.properties : []), data.properties ? data.properties : []);
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
		if ((0, _jquery2.default)(node).attr(_common.dataComponentId) && this._components[(0, _jquery2.default)(node).attr(_common.dataComponentId)]) {
			return this._components[(0, _jquery2.default)(node).attr(_common.dataComponentId)];
		} else if ((0, _jquery2.default)(node).attr('type') == 'radio' || (0, _jquery2.default)(node).attr('type') == 'checkbox') {
			var $parent = (0, _jquery2.default)(node).parent();
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
					} else if (property.noValueAttr) {
						if (value) {
							element = element.attr(property.htmlAttr, '');
						} else {
							element = element.removeAttr(property.htmlAttr);
						}
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
					value = (0, _dom.getStyle)(element.get(0), property.key); //getStyle returns declared style
				} else {
					value = element.attr(property.htmlAttr);
				}

				//if attribute is class check if one of valid values is included as class to set the select
				if (value && property.htmlAttr == "class" && property.validValues) {
					value = value.split(" ").filter(function (el) {
						return property.validValues.indexOf(el) != -1;
					});
				}

				if (property.noValueAttr) {
					value = element.attr(property.htmlAttr) ? property.validValues : [];
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
				row = (0, _jquery2.default)(tmpl('vvveb-property', property));
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

		(0, _jquery2.default)("#bold-btn").on("click", function (e) {
			doc.execCommand('bold', false, null);
			e.preventDefault();
			return false;
		});

		(0, _jquery2.default)("#italic-btn").on("click", function (e) {
			doc.execCommand('italic', false, null);
			e.preventDefault();
			return false;
		});

		(0, _jquery2.default)("#underline-btn").on("click", function (e) {
			doc.execCommand('underline', false, null);
			e.preventDefault();
			return false;
		});

		(0, _jquery2.default)("#strike-btn").on("click", function (e) {
			doc.execCommand('strikeThrough', false, null);
			e.preventDefault();
			return false;
		});

		(0, _jquery2.default)("#link-btn").on("click", function (e) {
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
		(0, _jquery2.default)("#wysiwyg-editor").show();

		this.element = element;
		this.isActive = true;
		this.oldValue = element.html();
	},

	destroy: function destroy(element) {
		element.removeAttr('contenteditable spellcheckker');
		(0, _jquery2.default)("#wysiwyg-editor").hide();
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

		self.documentFrame = (0, _jquery2.default)("#iframe-wrapper > iframe");
		self.canvas = (0, _jquery2.default)("#canvas");

		self._loadIframe(url);

		self._initDragdrop();

		self.dragElement = null;
	},

	/* controls */
	loadControlGroups: function loadControlGroups() {

		componentsList = (0, _jquery2.default)("#components-list");
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
					item = (0, _jquery2.default)('<li data-section="' + group + '" data-type="' + componentType + '" data-search="' + component.name.toLowerCase() + '"><a href="#">' + component.name + "</a></li>");

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

		self.frameDoc = (0, _jquery2.default)(window.FrameDocument);
		self.frameHtml = (0, _jquery2.default)(window.FrameDocument).find("html");
		self.frameBody = (0, _jquery2.default)(window.FrameDocument).find('body');

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
						newElement = (0, _jquery2.default)(component.html);
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
				var _node = (0, _selectors.getParentOrSelf)(event.target);
				if (!isPreview && !(0, _jquery2.default)('#attribute-settings').hasClass('active')) {
					(0, _jquery2.default)('#attribute-settings').addClass('active').siblings().removeClass('active');
					(0, _jquery2.default)('#left-panel').hide();
					(0, _jquery2.default)('#right-panel').show();
				}
				self.selectNode(_node);
				self.loadNodeComponent(_node);

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

		(0, _jquery2.default)("#drag-box").on("mousedown", function (event) {
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

		(0, _jquery2.default)("#down-box").on("click", function (event) {
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

		(0, _jquery2.default)("#up-box").on("click", function (event) {
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

		(0, _jquery2.default)("#clone-box").on("click", function (event) {
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

		(0, _jquery2.default)("#parent-box").on("click", function (event) {

			node = self.selectedEl.parent().get(0);

			self.selectNode(node);
			self.loadNodeComponent(node);

			event.preventDefault();
			return false;
		});

		(0, _jquery2.default)("#delete-box").on("click", function (event) {
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
		(0, _jquery2.default)('#components ul > li > ol > li').on("mousedown touchstart", function (event) {
			$this = jQuery(this);

			// $("#component-clone").remove();
			component = Vvveb.Components.get($this.data("type"));

			if (component.dragHtml) {
				html = component.dragHtml;
			} else {
				html = component.html;
			}

			self.dragElement = (0, _jquery2.default)(html);

			if (component.dragStart) self.dragElement = component.dragStart(self.dragElement);

			self.isDragging = true;
		});

		(0, _jquery2.default)('body').on('mouseup touchend', function (event) {
			if (self.isDragging == true) {
				self.isDragging = false;
				// $("#component-clone").remove();
			}
		});

		(0, _jquery2.default)('body').on('mousemove touchmove', function (event) {
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

		(0, _jquery2.default)('#components ul > ol > li > li').on("mouseup touchend", function (event) {
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
		(0, _jquery2.default)("#vvveb-code-editor textarea").val(Vvveb.Builder.getBeautifiedHtml());

		(0, _jquery2.default)("#vvveb-code-editor textarea").keyup(function () {
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
			(0, _jquery2.default)("#vvveb-code-editor textarea").val(Vvveb.Builder.getBeautifiedHtml());
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
		(0, _jquery2.default)("[data-vvveb-action]").each(function () {
			on = "click";
			if (this.dataset.vvvebOn) on = this.dataset.vvvebOn;

			(0, _jquery2.default)(this).on(on, Vvveb.Gui[this.dataset.vvvebAction]);
			if (this.dataset.vvvebShortcut) {
				(0, _jquery2.default)(document).bind('keydown', this.dataset.vvvebShortcut, Vvveb.Gui[this.dataset.vvvebAction]);
				(0, _jquery2.default)(window.FrameDocument, window.FrameWindow).bind('keydown', this.dataset.vvvebShortcut, Vvveb.Gui[this.dataset.vvvebAction]);
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
		(0, _jquery2.default)('#textarea-modal textarea').val(Vvveb.Builder.getBeautifiedHtml());
		(0, _jquery2.default)('#textarea-modal').modal();
	},

	viewport: function viewport() {
		(0, _jquery2.default)("#canvas").attr("class", this.dataset.view);
	},

	toggleEditor: function toggleEditor() {
		(0, _jquery2.default)("#vvveb-builder").toggleClass("bottom-panel-expand");
		Vvveb.CodeEditor.toggle();
	},

	download: function download() {
		(0, _download.downloadAsTextFile)('index', Vvveb.Builder.getBeautifiedHtml());
	},


	preview: function preview() {
		if ((0, _jquery2.default)('#left-panel').is(':visible')) {
			shownPanel = 'left-panel';
			hiddenPanel = 'right-panel';
			(0, _jquery2.default)('#left-panel, #right-panel').hide();
			isPreview = true;
		} else if ((0, _jquery2.default)('#right-panel').is(':visible')) {
			shownPanel = 'right-panel';
			hiddenPanel = 'left-panel';
			(0, _jquery2.default)('#left-panel, #right-panel').hide();
			isPreview = true;
		} else {
			isPreview = false;
			(0, _jquery2.default)('#' + shownPanel).show();
			(0, _jquery2.default)('#' + hiddenPanel).hide();
		}

		(0, _jquery2.default)('#menu-panel').toggle();
		(0, _jquery2.default)("#iframe-layer").toggle();
		(0, _jquery2.default)("#vvveb-builder").toggleClass("preview");
	},

	fullscreen: function fullscreen() {
		(0, _fullScreen.launchFullScreen)(document); // the whole page
	},

	componentSearch: function componentSearch() {
		searchText = this.value;

		(0, _jquery2.default)("#components-list li ol li").each(function () {
			$this = (0, _jquery2.default)(this);

			$this.hide();
			if ($this.data("search").indexOf(searchText) > -1) $this.show();
		});
	},

	clearComponentSearch: function clearComponentSearch() {
		(0, _jquery2.default)("#component-search").val("").keyup();
	}
};

Vvveb.FileManager = {
	tree: false,
	pages: {},

	init: function init() {
		this.tree = (0, _jquery2.default)("#filemanager .tree > ol").html("");

		(0, _jquery2.default)(this.tree).on("click", "li[data-page] span", function (e) {
			window.location.href = '#' + (0, _jquery2.default)(this).parents('li').data('page');
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
		(0, _jquery2.default)("[data-page='" + page + "'] > ol", this.tree).append(tmpl("vvveb-filemanager-component", { name: name, url: url, title: title }));
	},

	showActive: function showActive(name) {
		(0, _jquery2.default)("[data-page]", this.tree).removeClass("active");
		(0, _jquery2.default)("[data-page='" + name + "']", this.tree).addClass("active");
	},


	loadPage: function loadPage(name) {
		(0, _jquery2.default)("[data-page]", this.tree).removeClass("active");
		(0, _jquery2.default)("[data-page='" + name + "']", this.tree).addClass("active");

		Vvveb.Builder.loadUrl(this.pages[name]['url']);
	}

};

exports.default = Vvveb;

},{"../js/jquery.min":1,"./components/common":139,"./inputs/inputs":171,"./util/calendar":178,"./util/dom":179,"./util/download":180,"./util/fullScreen":182,"./util/htmlGenerator":183,"./util/jsoup":184,"./util/selectors":185}],184:[function(require,module,exports){
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

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

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
    (0, _jquery2.default)(el).find(_selectors.emptyChildrenSelectors.join(', ')).empty();
    return el;
}

function appendScript(el, jsStr) {
    jsStr && (0, _jquery2.default)('<script></script>').text(jsStr).appendTo((0, _jquery2.default)(el).find('body'));
    return el;
}

function generateTableScript(el) {
    var jsStr = Array.from((0, _jquery2.default)(el).find(_selectors.tableSelector)).reduce(function (prev, element) {
        return prev + '\n                ' + (0, _table2.default)((0, _jquery2.default)(element), _table4.default);
    }, '');
    return appendScript(el, jsStr);
}

function generateCalendarOnclickAttr(el) {
    (0, _jquery2.default)(el).find(_calendar.calendarSelector).each(function () {
        (0, _jquery2.default)(this).attr('onclick') || (0, _calendar.setOnclickAttr)(this);
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
    (0, _jquery2.default)(el).find(_selectors.submitButtonSelector).each(function () {
        (0, _jquery2.default)(this).attr('onclick') || (0, _submitbutton.setOnclickAttr)(this);
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

},{"../../js/jquery.min":1,"../components/@oee/table":129,"../templates/autoselectinput":174,"../templates/submitform":175,"../templates/table":176,"./calendar":178,"./selectors":185,"./submitbutton":186,"./unusedTags":187}],187:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unusedTags = [{
	name: 'script',
	filter: function filter(tag) {
		return tag.getAttribute('src') && tag.getAttribute('src').includes('iframe-drag-n-drop');
	}
}, {
	name: 'link',
	filter: function filter(tag) {
		return tag.getAttribute('rel') == 'stylesheet' && (tag.getAttribute('href').includes('drag-n-drop.css') || tag.getAttribute('href').includes('/datepicker/skin/WdatePicker.css') || tag.getAttribute('href').includes('/layer/skin/layer.css'));
	}
}, {
	name: 'hr',
	filter: function filter(tag) {
		return (0, _jquery2.default)(tag).hasClass('horizontal-line') || (0, _jquery2.default)(tag).hasClass('vertical-line');
	}
}];

exports.default = unusedTags;

},{"../../js/jquery.min":1}],186:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setOnclickAttr = undefined;

var _submitform = require('../templates/submitform');

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setOnclickAttr(node) {
    return (0, _jquery2.default)(node).attr('onclick', _submitform.functionName + '(this)');
}

exports.setOnclickAttr = setOnclickAttr;

},{"../../js/jquery.min":1,"../templates/submitform":175}],176:[function(require,module,exports){
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

},{"../components/common":139}],175:[function(require,module,exports){
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

},{"../components/common":139}],174:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require("../components/common");

var _selectors = require("../util/selectors");

function template() {
    return "\n        function generateOptions(el, response) {\n            var value = $(el).attr('" + _common.dataValueMapping + "') || 'value';\n            var text = $(el).attr('" + _common.dataTextMapping + "') || 'text';\n            response.forEach(function (option) {\n                $('<option></option>')\n                    .val(option[value])\n                    .text(option[text])\n                    .appendTo($(el));\n            });\n        }\n        Array.from($('body').find('" + _selectors.autoselectinputSelector + "'))\n            .filter(function (el) {\n                return $(el).attr('" + _common.dataUrl + "');\n            }).forEach(function (el) {\n                $.ajax({\n                    url: $(el).attr('" + _common.dataUrl + "'),\n                    success: function (response) {\n                        if (response.code == 200) {\n                            generateOptions(el, response.data);\n                        }\n                    }\n                });\n            });\n    ";
}

exports.default = template;

},{"../components/common":139,"../util/selectors":185}],185:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getParentOrSelf = exports.parentSelector = exports.submitButtonSelector = exports.autoselectinputSelector = exports.tableSelector = exports.emptyChildrenSelectors = undefined;

var _common = require('../components/common');

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tableSelector = '[' + _common.dataTableId + ']';
var emptyChildrenSelectors = [tableSelector];
var autoselectinputSelector = '[' + _common.dataAutoSelectId + ']';
var submitButtonSelector = 'button[' + _common.dataButtonId + ']';
var parentSelector = [tableSelector].join(', ');

function getParentOrSelf(node) {
    var parents = (0, _jquery2.default)(node).parents(parentSelector);
    return parents.length ? parents[0] : node;
}

exports.emptyChildrenSelectors = emptyChildrenSelectors;
exports.tableSelector = tableSelector;
exports.autoselectinputSelector = autoselectinputSelector;
exports.submitButtonSelector = submitButtonSelector;
exports.parentSelector = parentSelector;
exports.getParentOrSelf = getParentOrSelf;

},{"../../js/jquery.min":1,"../components/common":139}],129:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../../inputs/inputs');

var _common = require('../common');

var _builder = require('../../builder');

var _builder2 = _interopRequireDefault(_builder);

var _jquery = require('../../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var tables = {};
var index = 1;
function setColumnDefsAndRender(node, colDefs) {
    // Call to set new column definitions into the grid. 
    // The grid will redraw all the column headers, and then redraw all of the rows.
    tables[(0, _jquery2.default)(node).attr(_common.dataTableId)].api.setColumnDefs(colDefs);
    _builder2.default.Components.render("html/table@oee");
}

var table = {
    nodes: ["table"],
    classes: ["table"],
    image: "icons/table.svg",
    name: "ag-Grid",
    html: '<div ' + _common.dataComponentId + '="html/table@oee" style="width: 500px; height: 200px;" class="dropzone draggable ag-theme-blue horizontal-stripes"></div>',
    onDrop: function onDrop(node) {
        (0, _jquery2.default)(node).css({
            height: 'calc(100% - 25px)',
            width: '100%',
            position: '',
            left: '',
            top: '',
            transform: ''
        }).removeClass('draggable');
        _builder2.default.Builder.frameBody.find('.containerRight .allContent .topContent .container .row .everyBox .boxarea').append((0, _jquery2.default)(node).prop('outerHTML'));
        (0, _jquery2.default)(node).remove();
    },
    getTable: function getTable(key) {
        return tables[key];
    },

    beforeInit: function beforeInit(node) {
        var _this = this,
            _properties;

        (0, _jquery2.default)(node).removeClass('horizontal-stripes');
        if (!(0, _jquery2.default)(node).attr(_common.dataTableId)) {
            var id = index++;
            (0, _jquery2.default)(node).attr(_common.dataTableId, id);
            tables[id] = {
                columnDefs: [{ headerName: "header", field: "filed", width: '' }, { headerName: "header", field: "field", width: '' }, { headerName: "header", field: "field", width: '' }],
                enableSorting: false,
                enableFilter: false
            };
            new (document.getElementById('iframeId').contentWindow.agGrid.Grid)(node, tables[id]);
            tables[id].api.setRowData([]);
        }
        var i = 0;
        var properties = tables[(0, _jquery2.default)(node).attr(_common.dataTableId)].columnDefs.reduce(function (prev, cur) {
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
                    var colDefs = tables[(0, _jquery2.default)(node).attr(_common.dataTableId)].columnDefs;
                    if (input.nodeName == 'BUTTON') {
                        colDefs = colDefs.filter(function (value, index) {
                            return index != keyIndex;
                        });
                        tables[(0, _jquery2.default)(node).attr(_common.dataTableId)].columnDefs = colDefs;
                        setColumnDefsAndRender(node, colDefs);
                    } else {
                        if (input.name == 'width') {
                            colDefs[keyIndex][input.name] = value && parseInt(value);
                        } else {
                            colDefs[keyIndex][input.name] = value;
                        }
                        // 重新渲染会失去输入框焦点，只需要用新的colDefs更新表格即可，右侧的部分不需要重新渲染。
                        tables[(0, _jquery2.default)(node).attr(_common.dataTableId)].api.setColumnDefs(colDefs);
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
            var colDefs = tables[(0, _jquery2.default)(node).attr(_common.dataTableId)].columnDefs;
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

},{"../../../js/jquery.min":1,"../../builder":53,"../../inputs/inputs":171,"../common":139}],183:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function htmlGenerator(html) {
    var el = document.createElement('html');
    el.innerHTML = html;

    for (var _len = arguments.length, fns = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        fns[_key - 1] = arguments[_key];
    }

    fns.reduce(function (el, fn) {
        return fn(el);
    }, el);
    return (0, _jquery2.default)(el).prop('outerHTML');
}

exports.default = htmlGenerator;

},{"../../js/jquery.min":1}],182:[function(require,module,exports){
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

},{}],180:[function(require,module,exports){
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

},{}],179:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
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

exports.getStyle = getStyle;

},{}],178:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setDataConfigInfo = exports.setOnclickAttr = exports.getParsedConfigInfo = exports.getDateFmt = exports.getDataConfigInfo = exports.calendarOnclickSelector = exports.calendarSelector = exports.cloneWithoutOnclick = exports.replaceOtherShowingCalendarInputs = undefined;

var _common = require('../components/common');

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calendarSelector = 'input[' + _common.dataCalendarId + ']';
var calendarOnclickSelector = 'input[' + _common.dataCalendarId + '][onclick]';
// <input data-id="{'a', b}"> 替换包含'\''的属性值为合法的json字符串
function getDataConfigInfo(node) {
    return (0, _jquery2.default)(node).attr(_common.dataConfigInfo);
}

function getDataConfigInfoJSONString(node) {
    return getDataConfigInfo(node).replace(/'/g, '"');
}

function setDataConfigInfo(node, newValue) {
    (0, _jquery2.default)(node).attr(_common.dataConfigInfo, JSON.stringify(newValue).replace(/"/g, '\''));
}

function setOnclickAttr(node) {
    return (0, _jquery2.default)(node).attr('onclick', 'WdatePicker(' + getDataConfigInfo(node) + ')');
}

function getParsedConfigInfo(node) {
    return JSON.parse(getDataConfigInfoJSONString(node));
}

function getDateFmt(node) {
    return getParsedConfigInfo(node).dateFmt;
}

function cloneWithoutOnclick(node) {
    var $clone = (0, _jquery2.default)(node).removeAttr('onclick').clone();
    (0, _jquery2.default)(node).replaceWith($clone);
    return $clone;
}

function replaceOtherShowingCalendarInputs(element, context) {
    if (!(0, _jquery2.default)(element).is(calendarOnclickSelector)) {
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

},{"../../js/jquery.min":1,"../components/common":139}],171:[function(require,module,exports){
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

},{"./ButtonInput":150,"./CheckboxInput":151,"./ColorInput":152,"./CssUnitInput":153,"./FileUploadInput":154,"./GridInput":155,"./GridLayoutInput":156,"./Input":157,"./LinkInput":158,"./ListInput":159,"./NumberInput":160,"./ProductsInput":161,"./RadioButtonInput":162,"./RadioInput":163,"./RangeInput":164,"./SectionInput":165,"./SelectInput":166,"./TextInput":167,"./TextValueInput":168,"./ToggleInput":169,"./ValueTextInput":170}],170:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _TextInput = require('./TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValueTextInput = _jquery2.default.extend({}, _TextInput2.default, {

	events: [["keyup", "onChange", "input"]],

	setValue: function setValue(value) {
		(0, _jquery2.default)('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textinput", data);
	}
});

exports.default = ValueTextInput;

},{"../../js/jquery.min":1,"./TextInput":167}],169:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _TextInput = require('./TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToggleInput = _jquery2.default.extend({}, _TextInput2.default, {

	onChange: function onChange(event, node) {
		if (event.data && event.data.element) {
			event.data.element.trigger('propertyChange', [this.checked ? this.getAttribute("data-value-on") : this.getAttribute("data-value-off"), this]);
		}
	},

	events: [["change", "onChange", "input"]],

	setValue: function setValue(value) {
		(0, _jquery2.default)('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("toggle", data);
	}
});

exports.default = ToggleInput;

},{"../../js/jquery.min":1,"./TextInput":167}],168:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextValueInput = _jquery2.default.extend({}, _Input2.default, {
	events: [["keyup", "onChange", "input"], ["click", "onChange", "button" /*'select'*/]],

	setValue: function setValue(value) {
		(0, _jquery2.default)('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textvalue", data);
	}

});

exports.default = TextValueInput;

},{"../../js/jquery.min":1,"./Input":157}],166:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectInput = _jquery2.default.extend({}, _Input2.default, {

    events: [["change", "onChange", "select"]],

    setValue: function setValue(value) {
        (0, _jquery2.default)('select', this.element).val(value);
    },

    init: function init(data) {
        return this.render("select", data);
    }

});

exports.default = SelectInput;

},{"../../js/jquery.min":1,"./Input":157}],165:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SectionInput = _jquery2.default.extend({}, _Input2.default, {

	events: [["click", "onChange", "button" /*'select'*/]],

	setValue: function setValue(value) {
		return false;
	},

	init: function init(data) {
		return this.render("sectioninput", data);
	}

});

exports.default = SectionInput;

},{"../../js/jquery.min":1,"./Input":157}],164:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RangeInput = _jquery2.default.extend({}, _Input2.default, {

	events: [["change", "onChange", "input"]],

	setValue: function setValue(value) {
		(0, _jquery2.default)('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("rangeinput", data);
	}
});

exports.default = RangeInput;

},{"../../js/jquery.min":1,"./Input":157}],162:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _RadioInput = require('./RadioInput');

var _RadioInput2 = _interopRequireDefault(_RadioInput);

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioButtonInput = _jquery2.default.extend({}, _RadioInput2.default, {

    init: function init(data) {
        return this.render("radiobuttoninput", data);
    }
});

exports.default = RadioButtonInput;

},{"../../js/jquery.min":1,"./RadioInput":163}],163:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioInput = _jquery2.default.extend({}, _Input2.default, {

	onChange: function onChange(event, node) {

		if (event.data && event.data.element) {
			event.data.element.trigger('propertyChange', [this.value, this]);
		}
	},

	events: [["change", "onChange", "input"]],

	setValue: function setValue(value) {
		(0, _jquery2.default)('input', this.element).removeAttr('checked');
		if (value) (0, _jquery2.default)("input[value=" + value + "]", this.element).prop('checked', true);
	},

	init: function init(data) {
		return this.render("radioinput", data);
	}
});

exports.default = RadioInput;

},{"../../js/jquery.min":1,"./Input":157}],161:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _TextInput = require('./TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductsInput = _jquery2.default.extend({}, _TextInput2.default, {

	events: [["keyup", "onChange", "input"]],

	setValue: function setValue(value) {
		(0, _jquery2.default)('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textinput", data);
	}
});

exports.default = ProductsInput;

},{"../../js/jquery.min":1,"./TextInput":167}],160:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NumberInput = _jquery2.default.extend({}, _Input2.default, {

	events: [["change", "onChange", "input"]],

	setValue: function setValue(value) {
		(0, _jquery2.default)('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("numberinput", data);
	}
});

exports.default = NumberInput;

},{"../../js/jquery.min":1,"./Input":157}],159:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListInput = _jquery2.default.extend({}, _Input2.default, {

	events: [["change", "onChange", "select"]],

	setValue: function setValue(value) {
		(0, _jquery2.default)('select', this.element).val(value);
	},

	init: function init(data) {
		return this.render("listinput", data);
	}

});

exports.default = ListInput;

},{"../../js/jquery.min":1,"./Input":157}],158:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _TextInput = require('./TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinkInput = _jquery2.default.extend({}, _TextInput2.default, {

	events: [["change", "onChange", "input"]],

	setValue: function setValue(value) {
		(0, _jquery2.default)('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textinput", data);
	}
});

exports.default = LinkInput;

},{"../../js/jquery.min":1,"./TextInput":167}],156:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _TextInput = require('./TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridLayoutInput = _jquery2.default.extend({}, _TextInput2.default, {

	events: [["keyup", "onChange", "input"]],

	setValue: function setValue(value) {
		(0, _jquery2.default)('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textinput", data);
	}
});

exports.default = GridLayoutInput;

},{"../../js/jquery.min":1,"./TextInput":167}],155:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridInput = _jquery2.default.extend({}, _Input2.default, {
	events: [["change", "onChange", "select" /*'select'*/], ["click", "onChange", "button" /*'select'*/]],

	setValue: function setValue(value) {
		(0, _jquery2.default)('select', this.element).val(value);
	},

	init: function init(data) {
		return this.render("grid", data);
	}

});

exports.default = GridInput;

},{"../../js/jquery.min":1,"./Input":157}],154:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _TextInput = require('./TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileUploadInput = _jquery2.default.extend({}, _TextInput2.default, {

	events: [["keyup", "onChange", "input"]],

	setValue: function setValue(value) {
		(0, _jquery2.default)('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textinput", data);
	}
});

exports.default = FileUploadInput;

},{"../../js/jquery.min":1,"./TextInput":167}],167:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextInput = _jquery2.default.extend({}, _Input2.default, {

	events: [["keyup", "onChange", "input"]],

	setValue: function setValue(value) {
		(0, _jquery2.default)('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textinput", data);
	}
});

exports.default = TextInput;

},{"../../js/jquery.min":1,"./Input":157}],153:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CssUnitInput = _jquery2.default.extend({}, _Input2.default, {

	number: 0,
	unit: "px",

	onChange: function onChange(event) {

		if (event.data && event.data.element) {
			input = event.data.input;
			input[this.name] = this.value; // this.name = unit or number	

			value = "";
			if (input.unit == "auto") {
				(0, _jquery2.default)(event.data.element).addClass("auto");
				value = input.unit;
			} else {
				(0, _jquery2.default)(event.data.element).removeClass("auto");
				value = input.number + input.unit;
			}

			event.data.element.trigger('propertyChange', [value, this]);
		}
	},

	events: [["change", "onChange", "select"], ["change", "onChange", "input"]],

	setValue: function setValue(value) {
		this.number = parseInt(value);
		this.unit = value.replace(this.number, '');

		if (this.unit == "auto") (0, _jquery2.default)(this.element).addClass("auto");

		(0, _jquery2.default)('input', this.element).val(this.number);
		(0, _jquery2.default)('select', this.element).val(this.unit);
	},

	init: function init(data) {
		return this.render("cssunitinput", data);
	}
});

exports.default = CssUnitInput;

},{"../../js/jquery.min":1,"./Input":157}],152:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColorInput = _jquery2.default.extend({}, _Input2.default, {

	//html5 color input only supports setting values as hex colors even if the picker returns only rgb
	rgb2hex: function rgb2hex(rgb) {

		rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

		return rgb && rgb.length === 4 ? "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : rgb;
	},

	events: [["change", "onChange", "input"]],

	setValue: function setValue(value) {
		(0, _jquery2.default)('input', this.element).val(this.rgb2hex(value));
	},

	init: function init(data) {
		return this.render("colorinput", data);
	}
});

exports.default = ColorInput;

},{"../../js/jquery.min":1,"./Input":157}],151:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxInput = _jquery2.default.extend({}, _Input2.default, {

	onChange: function onChange(event, node) {

		if (event.data && event.data.element) {
			event.data.element.trigger('propertyChange', [this.checked, this]);
		}
	},

	events: [["change", "onChange", "input"]],

	setValue: function setValue(value) {
		(0, _jquery2.default)('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("checkboxinput", data);
	}
});

exports.default = CheckboxInput;

},{"../../js/jquery.min":1,"./Input":157}],150:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonInput = _jquery2.default.extend({}, _Input2.default, {

	events: [["click", "onChange", "button" /*'select'*/]],

	setValue: function setValue(value) {
		(0, _jquery2.default)('button', this.element).val(value);
	},

	init: function init(data) {
		return this.render("button", data);
	}

});

exports.default = ButtonInput;

},{"../../js/jquery.min":1,"./Input":157}],157:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jquery = require('../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
		this.element = (0, _jquery2.default)(this.renderTemplate(name, data));

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

},{"../../js/jquery.min":1}],139:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dataTextMapping = exports.dataValueMapping = exports.dataButtonId = exports.dataAutoSelectId = exports.dataUrl = exports.dataCalendarId = exports.dataConfigInfo = exports.dataTableId = exports.dataComponentId = exports.inc_base_sort = exports.changeNodeName = exports.bgcolorSelectOptions = exports.bgcolorClasses = undefined;

var _jquery = require("../../js/jquery.min");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    (0, _jquery2.default)(newNode).append((0, _jquery2.default)(node).contents());
    (0, _jquery2.default)(node).replaceWith(newNode);

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

},{"../../js/jquery.min":1}],1:[function(require,module,exports){
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function (a, b) {
  "use strict";
  "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = a.document ? b(a, !0) : function (a) {
    if (!a.document) throw new Error("jQuery requires a window with a document");return b(a);
  } : b(a);
}("undefined" != typeof window ? window : undefined, function (a, b) {
  "use strict";
  var c = [],
      d = a.document,
      e = Object.getPrototypeOf,
      f = c.slice,
      g = c.concat,
      h = c.push,
      i = c.indexOf,
      j = {},
      k = j.toString,
      l = j.hasOwnProperty,
      m = l.toString,
      n = m.call(Object),
      o = {};function p(a, b) {
    b = b || d;var c = b.createElement("script");c.text = a, b.head.appendChild(c).parentNode.removeChild(c);
  }var q = "3.2.1",
      r = function r(a, b) {
    return new r.fn.init(a, b);
  },
      s = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      t = /^-ms-/,
      u = /-([a-z])/g,
      v = function v(a, b) {
    return b.toUpperCase();
  };r.fn = r.prototype = { jquery: q, constructor: r, length: 0, toArray: function toArray() {
      return f.call(this);
    }, get: function get(a) {
      return null == a ? f.call(this) : a < 0 ? this[a + this.length] : this[a];
    }, pushStack: function pushStack(a) {
      var b = r.merge(this.constructor(), a);return b.prevObject = this, b;
    }, each: function each(a) {
      return r.each(this, a);
    }, map: function map(a) {
      return this.pushStack(r.map(this, function (b, c) {
        return a.call(b, c, b);
      }));
    }, slice: function slice() {
      return this.pushStack(f.apply(this, arguments));
    }, first: function first() {
      return this.eq(0);
    }, last: function last() {
      return this.eq(-1);
    }, eq: function eq(a) {
      var b = this.length,
          c = +a + (a < 0 ? b : 0);return this.pushStack(c >= 0 && c < b ? [this[c]] : []);
    }, end: function end() {
      return this.prevObject || this.constructor();
    }, push: h, sort: c.sort, splice: c.splice }, r.extend = r.fn.extend = function () {
    var a,
        b,
        c,
        d,
        e,
        f,
        g = arguments[0] || {},
        h = 1,
        i = arguments.length,
        j = !1;for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == (typeof g === "undefined" ? "undefined" : _typeof(g)) || r.isFunction(g) || (g = {}), h === i && (g = this, h--); h < i; h++) {
      if (null != (a = arguments[h])) for (b in a) {
        c = g[b], d = a[b], g !== d && (j && d && (r.isPlainObject(d) || (e = Array.isArray(d))) ? (e ? (e = !1, f = c && Array.isArray(c) ? c : []) : f = c && r.isPlainObject(c) ? c : {}, g[b] = r.extend(j, f, d)) : void 0 !== d && (g[b] = d));
      }
    }return g;
  }, r.extend({ expando: "jQuery" + (q + Math.random()).replace(/\D/g, ""), isReady: !0, error: function error(a) {
      throw new Error(a);
    }, noop: function noop() {}, isFunction: function isFunction(a) {
      return "function" === r.type(a);
    }, isWindow: function isWindow(a) {
      return null != a && a === a.window;
    }, isNumeric: function isNumeric(a) {
      var b = r.type(a);return ("number" === b || "string" === b) && !isNaN(a - parseFloat(a));
    }, isPlainObject: function isPlainObject(a) {
      var b, c;return !(!a || "[object Object]" !== k.call(a)) && (!(b = e(a)) || (c = l.call(b, "constructor") && b.constructor, "function" == typeof c && m.call(c) === n));
    }, isEmptyObject: function isEmptyObject(a) {
      var b;for (b in a) {
        return !1;
      }return !0;
    }, type: function type(a) {
      return null == a ? a + "" : "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) || "function" == typeof a ? j[k.call(a)] || "object" : typeof a === "undefined" ? "undefined" : _typeof(a);
    }, globalEval: function globalEval(a) {
      p(a);
    }, camelCase: function camelCase(a) {
      return a.replace(t, "ms-").replace(u, v);
    }, each: function each(a, b) {
      var c,
          d = 0;if (w(a)) {
        for (c = a.length; d < c; d++) {
          if (b.call(a[d], d, a[d]) === !1) break;
        }
      } else for (d in a) {
        if (b.call(a[d], d, a[d]) === !1) break;
      }return a;
    }, trim: function trim(a) {
      return null == a ? "" : (a + "").replace(s, "");
    }, makeArray: function makeArray(a, b) {
      var c = b || [];return null != a && (w(Object(a)) ? r.merge(c, "string" == typeof a ? [a] : a) : h.call(c, a)), c;
    }, inArray: function inArray(a, b, c) {
      return null == b ? -1 : i.call(b, a, c);
    }, merge: function merge(a, b) {
      for (var c = +b.length, d = 0, e = a.length; d < c; d++) {
        a[e++] = b[d];
      }return a.length = e, a;
    }, grep: function grep(a, b, c) {
      for (var d, e = [], f = 0, g = a.length, h = !c; f < g; f++) {
        d = !b(a[f], f), d !== h && e.push(a[f]);
      }return e;
    }, map: function map(a, b, c) {
      var d,
          e,
          f = 0,
          h = [];if (w(a)) for (d = a.length; f < d; f++) {
        e = b(a[f], f, c), null != e && h.push(e);
      } else for (f in a) {
        e = b(a[f], f, c), null != e && h.push(e);
      }return g.apply([], h);
    }, guid: 1, proxy: function proxy(a, b) {
      var c, d, e;if ("string" == typeof b && (c = a[b], b = a, a = c), r.isFunction(a)) return d = f.call(arguments, 2), e = function e() {
        return a.apply(b || this, d.concat(f.call(arguments)));
      }, e.guid = a.guid = a.guid || r.guid++, e;
    }, now: Date.now, support: o }), "function" == typeof Symbol && (r.fn[Symbol.iterator] = c[Symbol.iterator]), r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (a, b) {
    j["[object " + b + "]"] = b.toLowerCase();
  });function w(a) {
    var b = !!a && "length" in a && a.length,
        c = r.type(a);return "function" !== c && !r.isWindow(a) && ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a);
  }var x = function (a) {
    var b,
        c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u = "sizzle" + 1 * new Date(),
        v = a.document,
        w = 0,
        x = 0,
        y = ha(),
        z = ha(),
        A = ha(),
        B = function B(a, b) {
      return a === b && (l = !0), 0;
    },
        C = {}.hasOwnProperty,
        D = [],
        E = D.pop,
        F = D.push,
        G = D.push,
        H = D.slice,
        I = function I(a, b) {
      for (var c = 0, d = a.length; c < d; c++) {
        if (a[c] === b) return c;
      }return -1;
    },
        J = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        K = "[\\x20\\t\\r\\n\\f]",
        L = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
        M = "\\[" + K + "*(" + L + ")(?:" + K + "*([*^$|!~]?=)" + K + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + L + "))|)" + K + "*\\]",
        N = ":(" + L + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + M + ")*)|.*)\\)|)",
        O = new RegExp(K + "+", "g"),
        P = new RegExp("^" + K + "+|((?:^|[^\\\\])(?:\\\\.)*)" + K + "+$", "g"),
        Q = new RegExp("^" + K + "*," + K + "*"),
        R = new RegExp("^" + K + "*([>+~]|" + K + ")" + K + "*"),
        S = new RegExp("=" + K + "*([^\\]'\"]*?)" + K + "*\\]", "g"),
        T = new RegExp(N),
        U = new RegExp("^" + L + "$"),
        V = { ID: new RegExp("^#(" + L + ")"), CLASS: new RegExp("^\\.(" + L + ")"), TAG: new RegExp("^(" + L + "|[*])"), ATTR: new RegExp("^" + M), PSEUDO: new RegExp("^" + N), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + K + "*(even|odd|(([+-]|)(\\d*)n|)" + K + "*(?:([+-]|)" + K + "*(\\d+)|))" + K + "*\\)|)", "i"), bool: new RegExp("^(?:" + J + ")$", "i"), needsContext: new RegExp("^" + K + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + K + "*((?:-\\d)?\\d*)" + K + "*\\)|)(?=[^-]|$)", "i") },
        W = /^(?:input|select|textarea|button)$/i,
        X = /^h\d$/i,
        Y = /^[^{]+\{\s*\[native \w/,
        Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        $ = /[+~]/,
        _ = new RegExp("\\\\([\\da-f]{1,6}" + K + "?|(" + K + ")|.)", "ig"),
        aa = function aa(a, b, c) {
      var d = "0x" + b - 65536;return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
    },
        ba = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        ca = function ca(a, b) {
      return b ? "\0" === a ? "\uFFFD" : a.slice(0, -1) + "\\" + a.charCodeAt(a.length - 1).toString(16) + " " : "\\" + a;
    },
        da = function da() {
      m();
    },
        ea = ta(function (a) {
      return a.disabled === !0 && ("form" in a || "label" in a);
    }, { dir: "parentNode", next: "legend" });try {
      G.apply(D = H.call(v.childNodes), v.childNodes), D[v.childNodes.length].nodeType;
    } catch (fa) {
      G = { apply: D.length ? function (a, b) {
          F.apply(a, H.call(b));
        } : function (a, b) {
          var c = a.length,
              d = 0;while (a[c++] = b[d++]) {}a.length = c - 1;
        } };
    }function ga(a, b, d, e) {
      var f,
          h,
          j,
          k,
          l,
          o,
          r,
          s = b && b.ownerDocument,
          w = b ? b.nodeType : 9;if (d = d || [], "string" != typeof a || !a || 1 !== w && 9 !== w && 11 !== w) return d;if (!e && ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, p)) {
        if (11 !== w && (l = Z.exec(a))) if (f = l[1]) {
          if (9 === w) {
            if (!(j = b.getElementById(f))) return d;if (j.id === f) return d.push(j), d;
          } else if (s && (j = s.getElementById(f)) && t(b, j) && j.id === f) return d.push(j), d;
        } else {
          if (l[2]) return G.apply(d, b.getElementsByTagName(a)), d;if ((f = l[3]) && c.getElementsByClassName && b.getElementsByClassName) return G.apply(d, b.getElementsByClassName(f)), d;
        }if (c.qsa && !A[a + " "] && (!q || !q.test(a))) {
          if (1 !== w) s = b, r = a;else if ("object" !== b.nodeName.toLowerCase()) {
            (k = b.getAttribute("id")) ? k = k.replace(ba, ca) : b.setAttribute("id", k = u), o = g(a), h = o.length;while (h--) {
              o[h] = "#" + k + " " + sa(o[h]);
            }r = o.join(","), s = $.test(a) && qa(b.parentNode) || b;
          }if (r) try {
            return G.apply(d, s.querySelectorAll(r)), d;
          } catch (x) {} finally {
            k === u && b.removeAttribute("id");
          }
        }
      }return i(a.replace(P, "$1"), b, d, e);
    }function ha() {
      var a = [];function b(c, e) {
        return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e;
      }return b;
    }function ia(a) {
      return a[u] = !0, a;
    }function ja(a) {
      var b = n.createElement("fieldset");try {
        return !!a(b);
      } catch (c) {
        return !1;
      } finally {
        b.parentNode && b.parentNode.removeChild(b), b = null;
      }
    }function ka(a, b) {
      var c = a.split("|"),
          e = c.length;while (e--) {
        d.attrHandle[c[e]] = b;
      }
    }function la(a, b) {
      var c = b && a,
          d = c && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex;if (d) return d;if (c) while (c = c.nextSibling) {
        if (c === b) return -1;
      }return a ? 1 : -1;
    }function ma(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();return "input" === c && b.type === a;
      };
    }function na(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();return ("input" === c || "button" === c) && b.type === a;
      };
    }function oa(a) {
      return function (b) {
        return "form" in b ? b.parentNode && b.disabled === !1 ? "label" in b ? "label" in b.parentNode ? b.parentNode.disabled === a : b.disabled === a : b.isDisabled === a || b.isDisabled !== !a && ea(b) === a : b.disabled === a : "label" in b && b.disabled === a;
      };
    }function pa(a) {
      return ia(function (b) {
        return b = +b, ia(function (c, d) {
          var e,
              f = a([], c.length, b),
              g = f.length;while (g--) {
            c[e = f[g]] && (c[e] = !(d[e] = c[e]));
          }
        });
      });
    }function qa(a) {
      return a && "undefined" != typeof a.getElementsByTagName && a;
    }c = ga.support = {}, f = ga.isXML = function (a) {
      var b = a && (a.ownerDocument || a).documentElement;return !!b && "HTML" !== b.nodeName;
    }, m = ga.setDocument = function (a) {
      var b,
          e,
          g = a ? a.ownerDocument || a : v;return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = n.documentElement, p = !f(n), v !== n && (e = n.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", da, !1) : e.attachEvent && e.attachEvent("onunload", da)), c.attributes = ja(function (a) {
        return a.className = "i", !a.getAttribute("className");
      }), c.getElementsByTagName = ja(function (a) {
        return a.appendChild(n.createComment("")), !a.getElementsByTagName("*").length;
      }), c.getElementsByClassName = Y.test(n.getElementsByClassName), c.getById = ja(function (a) {
        return o.appendChild(a).id = u, !n.getElementsByName || !n.getElementsByName(u).length;
      }), c.getById ? (d.filter.ID = function (a) {
        var b = a.replace(_, aa);return function (a) {
          return a.getAttribute("id") === b;
        };
      }, d.find.ID = function (a, b) {
        if ("undefined" != typeof b.getElementById && p) {
          var c = b.getElementById(a);return c ? [c] : [];
        }
      }) : (d.filter.ID = function (a) {
        var b = a.replace(_, aa);return function (a) {
          var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");return c && c.value === b;
        };
      }, d.find.ID = function (a, b) {
        if ("undefined" != typeof b.getElementById && p) {
          var c,
              d,
              e,
              f = b.getElementById(a);if (f) {
            if (c = f.getAttributeNode("id"), c && c.value === a) return [f];e = b.getElementsByName(a), d = 0;while (f = e[d++]) {
              if (c = f.getAttributeNode("id"), c && c.value === a) return [f];
            }
          }return [];
        }
      }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
        return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0;
      } : function (a, b) {
        var c,
            d = [],
            e = 0,
            f = b.getElementsByTagName(a);if ("*" === a) {
          while (c = f[e++]) {
            1 === c.nodeType && d.push(c);
          }return d;
        }return f;
      }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
        if ("undefined" != typeof b.getElementsByClassName && p) return b.getElementsByClassName(a);
      }, r = [], q = [], (c.qsa = Y.test(n.querySelectorAll)) && (ja(function (a) {
        o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + K + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + K + "*(?:value|" + J + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]");
      }), ja(function (a) {
        a.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var b = n.createElement("input");b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + K + "*[*^$|!~]?="), 2 !== a.querySelectorAll(":enabled").length && q.push(":enabled", ":disabled"), o.appendChild(a).disabled = !0, 2 !== a.querySelectorAll(":disabled").length && q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:");
      })), (c.matchesSelector = Y.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ja(function (a) {
        c.disconnectedMatch = s.call(a, "*"), s.call(a, "[s!='']:x"), r.push("!=", N);
      }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = Y.test(o.compareDocumentPosition), t = b || Y.test(o.contains) ? function (a, b) {
        var c = 9 === a.nodeType ? a.documentElement : a,
            d = b && b.parentNode;return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
      } : function (a, b) {
        if (b) while (b = b.parentNode) {
          if (b === a) return !0;
        }return !1;
      }, B = b ? function (a, b) {
        if (a === b) return l = !0, 0;var d = !a.compareDocumentPosition - !b.compareDocumentPosition;return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === n || a.ownerDocument === v && t(v, a) ? -1 : b === n || b.ownerDocument === v && t(v, b) ? 1 : k ? I(k, a) - I(k, b) : 0 : 4 & d ? -1 : 1);
      } : function (a, b) {
        if (a === b) return l = !0, 0;var c,
            d = 0,
            e = a.parentNode,
            f = b.parentNode,
            g = [a],
            h = [b];if (!e || !f) return a === n ? -1 : b === n ? 1 : e ? -1 : f ? 1 : k ? I(k, a) - I(k, b) : 0;if (e === f) return la(a, b);c = a;while (c = c.parentNode) {
          g.unshift(c);
        }c = b;while (c = c.parentNode) {
          h.unshift(c);
        }while (g[d] === h[d]) {
          d++;
        }return d ? la(g[d], h[d]) : g[d] === v ? -1 : h[d] === v ? 1 : 0;
      }, n) : n;
    }, ga.matches = function (a, b) {
      return ga(a, null, null, b);
    }, ga.matchesSelector = function (a, b) {
      if ((a.ownerDocument || a) !== n && m(a), b = b.replace(S, "='$1']"), c.matchesSelector && p && !A[b + " "] && (!r || !r.test(b)) && (!q || !q.test(b))) try {
        var d = s.call(a, b);if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d;
      } catch (e) {}return ga(b, n, null, [a]).length > 0;
    }, ga.contains = function (a, b) {
      return (a.ownerDocument || a) !== n && m(a), t(a, b);
    }, ga.attr = function (a, b) {
      (a.ownerDocument || a) !== n && m(a);var e = d.attrHandle[b.toLowerCase()],
          f = e && C.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null;
    }, ga.escape = function (a) {
      return (a + "").replace(ba, ca);
    }, ga.error = function (a) {
      throw new Error("Syntax error, unrecognized expression: " + a);
    }, ga.uniqueSort = function (a) {
      var b,
          d = [],
          e = 0,
          f = 0;if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
        while (b = a[f++]) {
          b === a[f] && (e = d.push(f));
        }while (e--) {
          a.splice(d[e], 1);
        }
      }return k = null, a;
    }, e = ga.getText = function (a) {
      var b,
          c = "",
          d = 0,
          f = a.nodeType;if (f) {
        if (1 === f || 9 === f || 11 === f) {
          if ("string" == typeof a.textContent) return a.textContent;for (a = a.firstChild; a; a = a.nextSibling) {
            c += e(a);
          }
        } else if (3 === f || 4 === f) return a.nodeValue;
      } else while (b = a[d++]) {
        c += e(b);
      }return c;
    }, d = ga.selectors = { cacheLength: 50, createPseudo: ia, match: V, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(a) {
          return a[1] = a[1].replace(_, aa), a[3] = (a[3] || a[4] || a[5] || "").replace(_, aa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
        }, CHILD: function CHILD(a) {
          return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || ga.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && ga.error(a[0]), a;
        }, PSEUDO: function PSEUDO(a) {
          var b,
              c = !a[6] && a[2];return V.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && T.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3));
        } }, filter: { TAG: function TAG(a) {
          var b = a.replace(_, aa).toLowerCase();return "*" === a ? function () {
            return !0;
          } : function (a) {
            return a.nodeName && a.nodeName.toLowerCase() === b;
          };
        }, CLASS: function CLASS(a) {
          var b = y[a + " "];return b || (b = new RegExp("(^|" + K + ")" + a + "(" + K + "|$)")) && y(a, function (a) {
            return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "");
          });
        }, ATTR: function ATTR(a, b, c) {
          return function (d) {
            var e = ga.attr(d, a);return null == e ? "!=" === b : !b || (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(O, " ") + " ").indexOf(c) > -1 : "|=" === b && (e === c || e.slice(0, c.length + 1) === c + "-"));
          };
        }, CHILD: function CHILD(a, b, c, d, e) {
          var f = "nth" !== a.slice(0, 3),
              g = "last" !== a.slice(-4),
              h = "of-type" === b;return 1 === d && 0 === e ? function (a) {
            return !!a.parentNode;
          } : function (b, c, i) {
            var j,
                k,
                l,
                m,
                n,
                o,
                p = f !== g ? "nextSibling" : "previousSibling",
                q = b.parentNode,
                r = h && b.nodeName.toLowerCase(),
                s = !i && !h,
                t = !1;if (q) {
              if (f) {
                while (p) {
                  m = b;while (m = m[p]) {
                    if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                  }o = p = "only" === a && !o && "nextSibling";
                }return !0;
              }if (o = [g ? q.firstChild : q.lastChild], g && s) {
                m = q, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n && j[2], m = n && q.childNodes[n];while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) {
                  if (1 === m.nodeType && ++t && m === b) {
                    k[a] = [w, n, t];break;
                  }
                }
              } else if (s && (m = b, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n), t === !1) while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) {
                if ((h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) && ++t && (s && (l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [w, t]), m === b)) break;
              }return t -= e, t === d || t % d === 0 && t / d >= 0;
            }
          };
        }, PSEUDO: function PSEUDO(a, b) {
          var c,
              e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || ga.error("unsupported pseudo: " + a);return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ia(function (a, c) {
            var d,
                f = e(a, b),
                g = f.length;while (g--) {
              d = I(a, f[g]), a[d] = !(c[d] = f[g]);
            }
          }) : function (a) {
            return e(a, 0, c);
          }) : e;
        } }, pseudos: { not: ia(function (a) {
          var b = [],
              c = [],
              d = h(a.replace(P, "$1"));return d[u] ? ia(function (a, b, c, e) {
            var f,
                g = d(a, null, e, []),
                h = a.length;while (h--) {
              (f = g[h]) && (a[h] = !(b[h] = f));
            }
          }) : function (a, e, f) {
            return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop();
          };
        }), has: ia(function (a) {
          return function (b) {
            return ga(a, b).length > 0;
          };
        }), contains: ia(function (a) {
          return a = a.replace(_, aa), function (b) {
            return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;
          };
        }), lang: ia(function (a) {
          return U.test(a || "") || ga.error("unsupported lang: " + a), a = a.replace(_, aa).toLowerCase(), function (b) {
            var c;do {
              if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
            } while ((b = b.parentNode) && 1 === b.nodeType);return !1;
          };
        }), target: function target(b) {
          var c = a.location && a.location.hash;return c && c.slice(1) === b.id;
        }, root: function root(a) {
          return a === o;
        }, focus: function focus(a) {
          return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
        }, enabled: oa(!1), disabled: oa(!0), checked: function checked(a) {
          var b = a.nodeName.toLowerCase();return "input" === b && !!a.checked || "option" === b && !!a.selected;
        }, selected: function selected(a) {
          return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
        }, empty: function empty(a) {
          for (a = a.firstChild; a; a = a.nextSibling) {
            if (a.nodeType < 6) return !1;
          }return !0;
        }, parent: function parent(a) {
          return !d.pseudos.empty(a);
        }, header: function header(a) {
          return X.test(a.nodeName);
        }, input: function input(a) {
          return W.test(a.nodeName);
        }, button: function button(a) {
          var b = a.nodeName.toLowerCase();return "input" === b && "button" === a.type || "button" === b;
        }, text: function text(a) {
          var b;return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
        }, first: pa(function () {
          return [0];
        }), last: pa(function (a, b) {
          return [b - 1];
        }), eq: pa(function (a, b, c) {
          return [c < 0 ? c + b : c];
        }), even: pa(function (a, b) {
          for (var c = 0; c < b; c += 2) {
            a.push(c);
          }return a;
        }), odd: pa(function (a, b) {
          for (var c = 1; c < b; c += 2) {
            a.push(c);
          }return a;
        }), lt: pa(function (a, b, c) {
          for (var d = c < 0 ? c + b : c; --d >= 0;) {
            a.push(d);
          }return a;
        }), gt: pa(function (a, b, c) {
          for (var d = c < 0 ? c + b : c; ++d < b;) {
            a.push(d);
          }return a;
        }) } }, d.pseudos.nth = d.pseudos.eq;for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) {
      d.pseudos[b] = ma(b);
    }for (b in { submit: !0, reset: !0 }) {
      d.pseudos[b] = na(b);
    }function ra() {}ra.prototype = d.filters = d.pseudos, d.setFilters = new ra(), g = ga.tokenize = function (a, b) {
      var c,
          e,
          f,
          g,
          h,
          i,
          j,
          k = z[a + " "];if (k) return b ? 0 : k.slice(0);h = a, i = [], j = d.preFilter;while (h) {
        c && !(e = Q.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = R.exec(h)) && (c = e.shift(), f.push({ value: c, type: e[0].replace(P, " ") }), h = h.slice(c.length));for (g in d.filter) {
          !(e = V[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({ value: c, type: g, matches: e }), h = h.slice(c.length));
        }if (!c) break;
      }return b ? h.length : h ? ga.error(a) : z(a, i).slice(0);
    };function sa(a) {
      for (var b = 0, c = a.length, d = ""; b < c; b++) {
        d += a[b].value;
      }return d;
    }function ta(a, b, c) {
      var d = b.dir,
          e = b.next,
          f = e || d,
          g = c && "parentNode" === f,
          h = x++;return b.first ? function (b, c, e) {
        while (b = b[d]) {
          if (1 === b.nodeType || g) return a(b, c, e);
        }return !1;
      } : function (b, c, i) {
        var j,
            k,
            l,
            m = [w, h];if (i) {
          while (b = b[d]) {
            if ((1 === b.nodeType || g) && a(b, c, i)) return !0;
          }
        } else while (b = b[d]) {
          if (1 === b.nodeType || g) if (l = b[u] || (b[u] = {}), k = l[b.uniqueID] || (l[b.uniqueID] = {}), e && e === b.nodeName.toLowerCase()) b = b[d] || b;else {
            if ((j = k[f]) && j[0] === w && j[1] === h) return m[2] = j[2];if (k[f] = m, m[2] = a(b, c, i)) return !0;
          }
        }return !1;
      };
    }function ua(a) {
      return a.length > 1 ? function (b, c, d) {
        var e = a.length;while (e--) {
          if (!a[e](b, c, d)) return !1;
        }return !0;
      } : a[0];
    }function va(a, b, c) {
      for (var d = 0, e = b.length; d < e; d++) {
        ga(a, b[d], c);
      }return c;
    }function wa(a, b, c, d, e) {
      for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++) {
        (f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
      }return g;
    }function xa(a, b, c, d, e, f) {
      return d && !d[u] && (d = xa(d)), e && !e[u] && (e = xa(e, f)), ia(function (f, g, h, i) {
        var j,
            k,
            l,
            m = [],
            n = [],
            o = g.length,
            p = f || va(b || "*", h.nodeType ? [h] : h, []),
            q = !a || !f && b ? p : wa(p, m, a, h, i),
            r = c ? e || (f ? a : o || d) ? [] : g : q;if (c && c(q, r, h, i), d) {
          j = wa(r, n), d(j, [], h, i), k = j.length;while (k--) {
            (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
          }
        }if (f) {
          if (e || a) {
            if (e) {
              j = [], k = r.length;while (k--) {
                (l = r[k]) && j.push(q[k] = l);
              }e(null, r = [], j, i);
            }k = r.length;while (k--) {
              (l = r[k]) && (j = e ? I(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l));
            }
          }
        } else r = wa(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : G.apply(g, r);
      });
    }function ya(a) {
      for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = ta(function (a) {
        return a === b;
      }, h, !0), l = ta(function (a) {
        return I(b, a) > -1;
      }, h, !0), m = [function (a, c, d) {
        var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));return b = null, e;
      }]; i < f; i++) {
        if (c = d.relative[a[i].type]) m = [ta(ua(m), c)];else {
          if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
            for (e = ++i; e < f; e++) {
              if (d.relative[a[e].type]) break;
            }return xa(i > 1 && ua(m), i > 1 && sa(a.slice(0, i - 1).concat({ value: " " === a[i - 2].type ? "*" : "" })).replace(P, "$1"), c, i < e && ya(a.slice(i, e)), e < f && ya(a = a.slice(e)), e < f && sa(a));
          }m.push(c);
        }
      }return ua(m);
    }function za(a, b) {
      var c = b.length > 0,
          e = a.length > 0,
          f = function f(_f, g, h, i, k) {
        var l,
            o,
            q,
            r = 0,
            s = "0",
            t = _f && [],
            u = [],
            v = j,
            x = _f || e && d.find.TAG("*", k),
            y = w += null == v ? 1 : Math.random() || .1,
            z = x.length;for (k && (j = g === n || g || k); s !== z && null != (l = x[s]); s++) {
          if (e && l) {
            o = 0, g || l.ownerDocument === n || (m(l), h = !p);while (q = a[o++]) {
              if (q(l, g || n, h)) {
                i.push(l);break;
              }
            }k && (w = y);
          }c && ((l = !q && l) && r--, _f && t.push(l));
        }if (r += s, c && s !== r) {
          o = 0;while (q = b[o++]) {
            q(t, u, g, h);
          }if (_f) {
            if (r > 0) while (s--) {
              t[s] || u[s] || (u[s] = E.call(i));
            }u = wa(u);
          }G.apply(i, u), k && !_f && u.length > 0 && r + b.length > 1 && ga.uniqueSort(i);
        }return k && (w = y, j = v), t;
      };return c ? ia(f) : f;
    }return h = ga.compile = function (a, b) {
      var c,
          d = [],
          e = [],
          f = A[a + " "];if (!f) {
        b || (b = g(a)), c = b.length;while (c--) {
          f = ya(b[c]), f[u] ? d.push(f) : e.push(f);
        }f = A(a, za(e, d)), f.selector = a;
      }return f;
    }, i = ga.select = function (a, b, c, e) {
      var f,
          i,
          j,
          k,
          l,
          m = "function" == typeof a && a,
          n = !e && g(a = m.selector || a);if (c = c || [], 1 === n.length) {
        if (i = n[0] = n[0].slice(0), i.length > 2 && "ID" === (j = i[0]).type && 9 === b.nodeType && p && d.relative[i[1].type]) {
          if (b = (d.find.ID(j.matches[0].replace(_, aa), b) || [])[0], !b) return c;m && (b = b.parentNode), a = a.slice(i.shift().value.length);
        }f = V.needsContext.test(a) ? 0 : i.length;while (f--) {
          if (j = i[f], d.relative[k = j.type]) break;if ((l = d.find[k]) && (e = l(j.matches[0].replace(_, aa), $.test(i[0].type) && qa(b.parentNode) || b))) {
            if (i.splice(f, 1), a = e.length && sa(i), !a) return G.apply(c, e), c;break;
          }
        }
      }return (m || h(a, n))(e, b, !p, c, !b || $.test(a) && qa(b.parentNode) || b), c;
    }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ja(function (a) {
      return 1 & a.compareDocumentPosition(n.createElement("fieldset"));
    }), ja(function (a) {
      return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href");
    }) || ka("type|href|height|width", function (a, b, c) {
      if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
    }), c.attributes && ja(function (a) {
      return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
    }) || ka("value", function (a, b, c) {
      if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue;
    }), ja(function (a) {
      return null == a.getAttribute("disabled");
    }) || ka(J, function (a, b, c) {
      var d;if (!c) return a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
    }), ga;
  }(a);r.find = x, r.expr = x.selectors, r.expr[":"] = r.expr.pseudos, r.uniqueSort = r.unique = x.uniqueSort, r.text = x.getText, r.isXMLDoc = x.isXML, r.contains = x.contains, r.escapeSelector = x.escape;var y = function y(a, b, c) {
    var d = [],
        e = void 0 !== c;while ((a = a[b]) && 9 !== a.nodeType) {
      if (1 === a.nodeType) {
        if (e && r(a).is(c)) break;d.push(a);
      }
    }return d;
  },
      z = function z(a, b) {
    for (var c = []; a; a = a.nextSibling) {
      1 === a.nodeType && a !== b && c.push(a);
    }return c;
  },
      A = r.expr.match.needsContext;function B(a, b) {
    return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
  }var C = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
      D = /^.[^:#\[\.,]*$/;function E(a, b, c) {
    return r.isFunction(b) ? r.grep(a, function (a, d) {
      return !!b.call(a, d, a) !== c;
    }) : b.nodeType ? r.grep(a, function (a) {
      return a === b !== c;
    }) : "string" != typeof b ? r.grep(a, function (a) {
      return i.call(b, a) > -1 !== c;
    }) : D.test(b) ? r.filter(b, a, c) : (b = r.filter(b, a), r.grep(a, function (a) {
      return i.call(b, a) > -1 !== c && 1 === a.nodeType;
    }));
  }r.filter = function (a, b, c) {
    var d = b[0];return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? r.find.matchesSelector(d, a) ? [d] : [] : r.find.matches(a, r.grep(b, function (a) {
      return 1 === a.nodeType;
    }));
  }, r.fn.extend({ find: function find(a) {
      var b,
          c,
          d = this.length,
          e = this;if ("string" != typeof a) return this.pushStack(r(a).filter(function () {
        for (b = 0; b < d; b++) {
          if (r.contains(e[b], this)) return !0;
        }
      }));for (c = this.pushStack([]), b = 0; b < d; b++) {
        r.find(a, e[b], c);
      }return d > 1 ? r.uniqueSort(c) : c;
    }, filter: function filter(a) {
      return this.pushStack(E(this, a || [], !1));
    }, not: function not(a) {
      return this.pushStack(E(this, a || [], !0));
    }, is: function is(a) {
      return !!E(this, "string" == typeof a && A.test(a) ? r(a) : a || [], !1).length;
    } });var F,
      G = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
      H = r.fn.init = function (a, b, c) {
    var e, f;if (!a) return this;if (c = c || F, "string" == typeof a) {
      if (e = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : G.exec(a), !e || !e[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);if (e[1]) {
        if (b = b instanceof r ? b[0] : b, r.merge(this, r.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)), C.test(e[1]) && r.isPlainObject(b)) for (e in b) {
          r.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);
        }return this;
      }return f = d.getElementById(e[2]), f && (this[0] = f, this.length = 1), this;
    }return a.nodeType ? (this[0] = a, this.length = 1, this) : r.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(r) : r.makeArray(a, this);
  };H.prototype = r.fn, F = r(d);var I = /^(?:parents|prev(?:Until|All))/,
      J = { children: !0, contents: !0, next: !0, prev: !0 };r.fn.extend({ has: function has(a) {
      var b = r(a, this),
          c = b.length;return this.filter(function () {
        for (var a = 0; a < c; a++) {
          if (r.contains(this, b[a])) return !0;
        }
      });
    }, closest: function closest(a, b) {
      var c,
          d = 0,
          e = this.length,
          f = [],
          g = "string" != typeof a && r(a);if (!A.test(a)) for (; d < e; d++) {
        for (c = this[d]; c && c !== b; c = c.parentNode) {
          if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && r.find.matchesSelector(c, a))) {
            f.push(c);break;
          }
        }
      }return this.pushStack(f.length > 1 ? r.uniqueSort(f) : f);
    }, index: function index(a) {
      return a ? "string" == typeof a ? i.call(r(a), this[0]) : i.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    }, add: function add(a, b) {
      return this.pushStack(r.uniqueSort(r.merge(this.get(), r(a, b))));
    }, addBack: function addBack(a) {
      return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
    } });function K(a, b) {
    while ((a = a[b]) && 1 !== a.nodeType) {}return a;
  }r.each({ parent: function parent(a) {
      var b = a.parentNode;return b && 11 !== b.nodeType ? b : null;
    }, parents: function parents(a) {
      return y(a, "parentNode");
    }, parentsUntil: function parentsUntil(a, b, c) {
      return y(a, "parentNode", c);
    }, next: function next(a) {
      return K(a, "nextSibling");
    }, prev: function prev(a) {
      return K(a, "previousSibling");
    }, nextAll: function nextAll(a) {
      return y(a, "nextSibling");
    }, prevAll: function prevAll(a) {
      return y(a, "previousSibling");
    }, nextUntil: function nextUntil(a, b, c) {
      return y(a, "nextSibling", c);
    }, prevUntil: function prevUntil(a, b, c) {
      return y(a, "previousSibling", c);
    }, siblings: function siblings(a) {
      return z((a.parentNode || {}).firstChild, a);
    }, children: function children(a) {
      return z(a.firstChild);
    }, contents: function contents(a) {
      return B(a, "iframe") ? a.contentDocument : (B(a, "template") && (a = a.content || a), r.merge([], a.childNodes));
    } }, function (a, b) {
    r.fn[a] = function (c, d) {
      var e = r.map(this, b, c);return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = r.filter(d, e)), this.length > 1 && (J[a] || r.uniqueSort(e), I.test(a) && e.reverse()), this.pushStack(e);
    };
  });var L = /[^\x20\t\r\n\f]+/g;function M(a) {
    var b = {};return r.each(a.match(L) || [], function (a, c) {
      b[c] = !0;
    }), b;
  }r.Callbacks = function (a) {
    a = "string" == typeof a ? M(a) : r.extend({}, a);var b,
        c,
        d,
        e,
        f = [],
        g = [],
        h = -1,
        i = function i() {
      for (e = e || a.once, d = b = !0; g.length; h = -1) {
        c = g.shift();while (++h < f.length) {
          f[h].apply(c[0], c[1]) === !1 && a.stopOnFalse && (h = f.length, c = !1);
        }
      }a.memory || (c = !1), b = !1, e && (f = c ? [] : "");
    },
        j = { add: function add() {
        return f && (c && !b && (h = f.length - 1, g.push(c)), function d(b) {
          r.each(b, function (b, c) {
            r.isFunction(c) ? a.unique && j.has(c) || f.push(c) : c && c.length && "string" !== r.type(c) && d(c);
          });
        }(arguments), c && !b && i()), this;
      }, remove: function remove() {
        return r.each(arguments, function (a, b) {
          var c;while ((c = r.inArray(b, f, c)) > -1) {
            f.splice(c, 1), c <= h && h--;
          }
        }), this;
      }, has: function has(a) {
        return a ? r.inArray(a, f) > -1 : f.length > 0;
      }, empty: function empty() {
        return f && (f = []), this;
      }, disable: function disable() {
        return e = g = [], f = c = "", this;
      }, disabled: function disabled() {
        return !f;
      }, lock: function lock() {
        return e = g = [], c || b || (f = c = ""), this;
      }, locked: function locked() {
        return !!e;
      }, fireWith: function fireWith(a, c) {
        return e || (c = c || [], c = [a, c.slice ? c.slice() : c], g.push(c), b || i()), this;
      }, fire: function fire() {
        return j.fireWith(this, arguments), this;
      }, fired: function fired() {
        return !!d;
      } };return j;
  };function N(a) {
    return a;
  }function O(a) {
    throw a;
  }function P(a, b, c, d) {
    var e;try {
      a && r.isFunction(e = a.promise) ? e.call(a).done(b).fail(c) : a && r.isFunction(e = a.then) ? e.call(a, b, c) : b.apply(void 0, [a].slice(d));
    } catch (a) {
      c.apply(void 0, [a]);
    }
  }r.extend({ Deferred: function Deferred(b) {
      var c = [["notify", "progress", r.Callbacks("memory"), r.Callbacks("memory"), 2], ["resolve", "done", r.Callbacks("once memory"), r.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", r.Callbacks("once memory"), r.Callbacks("once memory"), 1, "rejected"]],
          d = "pending",
          e = { state: function state() {
          return d;
        }, always: function always() {
          return f.done(arguments).fail(arguments), this;
        }, "catch": function _catch(a) {
          return e.then(null, a);
        }, pipe: function pipe() {
          var a = arguments;return r.Deferred(function (b) {
            r.each(c, function (c, d) {
              var e = r.isFunction(a[d[4]]) && a[d[4]];f[d[1]](function () {
                var a = e && e.apply(this, arguments);a && r.isFunction(a.promise) ? a.promise().progress(b.notify).done(b.resolve).fail(b.reject) : b[d[0] + "With"](this, e ? [a] : arguments);
              });
            }), a = null;
          }).promise();
        }, then: function then(b, d, e) {
          var f = 0;function g(b, c, d, e) {
            return function () {
              var h = this,
                  i = arguments,
                  j = function j() {
                var a, j;if (!(b < f)) {
                  if (a = d.apply(h, i), a === c.promise()) throw new TypeError("Thenable self-resolution");j = a && ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) || "function" == typeof a) && a.then, r.isFunction(j) ? e ? j.call(a, g(f, c, N, e), g(f, c, O, e)) : (f++, j.call(a, g(f, c, N, e), g(f, c, O, e), g(f, c, N, c.notifyWith))) : (d !== N && (h = void 0, i = [a]), (e || c.resolveWith)(h, i));
                }
              },
                  k = e ? j : function () {
                try {
                  j();
                } catch (a) {
                  r.Deferred.exceptionHook && r.Deferred.exceptionHook(a, k.stackTrace), b + 1 >= f && (d !== O && (h = void 0, i = [a]), c.rejectWith(h, i));
                }
              };b ? k() : (r.Deferred.getStackHook && (k.stackTrace = r.Deferred.getStackHook()), a.setTimeout(k));
            };
          }return r.Deferred(function (a) {
            c[0][3].add(g(0, a, r.isFunction(e) ? e : N, a.notifyWith)), c[1][3].add(g(0, a, r.isFunction(b) ? b : N)), c[2][3].add(g(0, a, r.isFunction(d) ? d : O));
          }).promise();
        }, promise: function promise(a) {
          return null != a ? r.extend(a, e) : e;
        } },
          f = {};return r.each(c, function (a, b) {
        var g = b[2],
            h = b[5];e[b[1]] = g.add, h && g.add(function () {
          d = h;
        }, c[3 - a][2].disable, c[0][2].lock), g.add(b[3].fire), f[b[0]] = function () {
          return f[b[0] + "With"](this === f ? void 0 : this, arguments), this;
        }, f[b[0] + "With"] = g.fireWith;
      }), e.promise(f), b && b.call(f, f), f;
    }, when: function when(a) {
      var b = arguments.length,
          c = b,
          d = Array(c),
          e = f.call(arguments),
          g = r.Deferred(),
          h = function h(a) {
        return function (c) {
          d[a] = this, e[a] = arguments.length > 1 ? f.call(arguments) : c, --b || g.resolveWith(d, e);
        };
      };if (b <= 1 && (P(a, g.done(h(c)).resolve, g.reject, !b), "pending" === g.state() || r.isFunction(e[c] && e[c].then))) return g.then();while (c--) {
        P(e[c], h(c), g.reject);
      }return g.promise();
    } });var Q = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook = function (b, c) {
    a.console && a.console.warn && b && Q.test(b.name) && a.console.warn("jQuery.Deferred exception: " + b.message, b.stack, c);
  }, r.readyException = function (b) {
    a.setTimeout(function () {
      throw b;
    });
  };var R = r.Deferred();r.fn.ready = function (a) {
    return R.then(a)["catch"](function (a) {
      r.readyException(a);
    }), this;
  }, r.extend({ isReady: !1, readyWait: 1, ready: function ready(a) {
      (a === !0 ? --r.readyWait : r.isReady) || (r.isReady = !0, a !== !0 && --r.readyWait > 0 || R.resolveWith(d, [r]));
    } }), r.ready.then = R.then;function S() {
    d.removeEventListener("DOMContentLoaded", S), a.removeEventListener("load", S), r.ready();
  }"complete" === d.readyState || "loading" !== d.readyState && !d.documentElement.doScroll ? a.setTimeout(r.ready) : (d.addEventListener("DOMContentLoaded", S), a.addEventListener("load", S));var T = function T(a, b, c, d, e, f, g) {
    var h = 0,
        i = a.length,
        j = null == c;if ("object" === r.type(c)) {
      e = !0;for (h in c) {
        T(a, b, h, c[h], !0, f, g);
      }
    } else if (void 0 !== d && (e = !0, r.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function b(a, _b, c) {
      return j.call(r(a), c);
    })), b)) for (; h < i; h++) {
      b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
    }return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
  },
      U = function U(a) {
    return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType;
  };function V() {
    this.expando = r.expando + V.uid++;
  }V.uid = 1, V.prototype = { cache: function cache(a) {
      var b = a[this.expando];return b || (b = {}, U(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, { value: b, configurable: !0 }))), b;
    }, set: function set(a, b, c) {
      var d,
          e = this.cache(a);if ("string" == typeof b) e[r.camelCase(b)] = c;else for (d in b) {
        e[r.camelCase(d)] = b[d];
      }return e;
    }, get: function get(a, b) {
      return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][r.camelCase(b)];
    }, access: function access(a, b, c) {
      return void 0 === b || b && "string" == typeof b && void 0 === c ? this.get(a, b) : (this.set(a, b, c), void 0 !== c ? c : b);
    }, remove: function remove(a, b) {
      var c,
          d = a[this.expando];if (void 0 !== d) {
        if (void 0 !== b) {
          Array.isArray(b) ? b = b.map(r.camelCase) : (b = r.camelCase(b), b = b in d ? [b] : b.match(L) || []), c = b.length;while (c--) {
            delete d[b[c]];
          }
        }(void 0 === b || r.isEmptyObject(d)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando]);
      }
    }, hasData: function hasData(a) {
      var b = a[this.expando];return void 0 !== b && !r.isEmptyObject(b);
    } };var W = new V(),
      X = new V(),
      Y = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      Z = /[A-Z]/g;function $(a) {
    return "true" === a || "false" !== a && ("null" === a ? null : a === +a + "" ? +a : Y.test(a) ? JSON.parse(a) : a);
  }function _(a, b, c) {
    var d;if (void 0 === c && 1 === a.nodeType) if (d = "data-" + b.replace(Z, "-$&").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
      try {
        c = $(c);
      } catch (e) {}X.set(a, b, c);
    } else c = void 0;return c;
  }r.extend({ hasData: function hasData(a) {
      return X.hasData(a) || W.hasData(a);
    }, data: function data(a, b, c) {
      return X.access(a, b, c);
    }, removeData: function removeData(a, b) {
      X.remove(a, b);
    }, _data: function _data(a, b, c) {
      return W.access(a, b, c);
    }, _removeData: function _removeData(a, b) {
      W.remove(a, b);
    } }), r.fn.extend({ data: function data(a, b) {
      var c,
          d,
          e,
          f = this[0],
          g = f && f.attributes;if (void 0 === a) {
        if (this.length && (e = X.get(f), 1 === f.nodeType && !W.get(f, "hasDataAttrs"))) {
          c = g.length;while (c--) {
            g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = r.camelCase(d.slice(5)), _(f, d, e[d])));
          }W.set(f, "hasDataAttrs", !0);
        }return e;
      }return "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) ? this.each(function () {
        X.set(this, a);
      }) : T(this, function (b) {
        var c;if (f && void 0 === b) {
          if (c = X.get(f, a), void 0 !== c) return c;if (c = _(f, a), void 0 !== c) return c;
        } else this.each(function () {
          X.set(this, a, b);
        });
      }, null, b, arguments.length > 1, null, !0);
    }, removeData: function removeData(a) {
      return this.each(function () {
        X.remove(this, a);
      });
    } }), r.extend({ queue: function queue(a, b, c) {
      var d;if (a) return b = (b || "fx") + "queue", d = W.get(a, b), c && (!d || Array.isArray(c) ? d = W.access(a, b, r.makeArray(c)) : d.push(c)), d || [];
    }, dequeue: function dequeue(a, b) {
      b = b || "fx";var c = r.queue(a, b),
          d = c.length,
          e = c.shift(),
          f = r._queueHooks(a, b),
          g = function g() {
        r.dequeue(a, b);
      };"inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
    }, _queueHooks: function _queueHooks(a, b) {
      var c = b + "queueHooks";return W.get(a, c) || W.access(a, c, { empty: r.Callbacks("once memory").add(function () {
          W.remove(a, [b + "queue", c]);
        }) });
    } }), r.fn.extend({ queue: function queue(a, b) {
      var c = 2;return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? r.queue(this[0], a) : void 0 === b ? this : this.each(function () {
        var c = r.queue(this, a, b);r._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && r.dequeue(this, a);
      });
    }, dequeue: function dequeue(a) {
      return this.each(function () {
        r.dequeue(this, a);
      });
    }, clearQueue: function clearQueue(a) {
      return this.queue(a || "fx", []);
    }, promise: function promise(a, b) {
      var c,
          d = 1,
          e = r.Deferred(),
          f = this,
          g = this.length,
          h = function h() {
        --d || e.resolveWith(f, [f]);
      };"string" != typeof a && (b = a, a = void 0), a = a || "fx";while (g--) {
        c = W.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
      }return h(), e.promise(b);
    } });var aa = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      ba = new RegExp("^(?:([+-])=|)(" + aa + ")([a-z%]*)$", "i"),
      ca = ["Top", "Right", "Bottom", "Left"],
      da = function da(a, b) {
    return a = b || a, "none" === a.style.display || "" === a.style.display && r.contains(a.ownerDocument, a) && "none" === r.css(a, "display");
  },
      ea = function ea(a, b, c, d) {
    var e,
        f,
        g = {};for (f in b) {
      g[f] = a.style[f], a.style[f] = b[f];
    }e = c.apply(a, d || []);for (f in b) {
      a.style[f] = g[f];
    }return e;
  };function fa(a, b, c, d) {
    var e,
        f = 1,
        g = 20,
        h = d ? function () {
      return d.cur();
    } : function () {
      return r.css(a, b, "");
    },
        i = h(),
        j = c && c[3] || (r.cssNumber[b] ? "" : "px"),
        k = (r.cssNumber[b] || "px" !== j && +i) && ba.exec(r.css(a, b));if (k && k[3] !== j) {
      j = j || k[3], c = c || [], k = +i || 1;do {
        f = f || ".5", k /= f, r.style(a, b, k + j);
      } while (f !== (f = h() / i) && 1 !== f && --g);
    }return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e;
  }var ga = {};function ha(a) {
    var b,
        c = a.ownerDocument,
        d = a.nodeName,
        e = ga[d];return e ? e : (b = c.body.appendChild(c.createElement(d)), e = r.css(b, "display"), b.parentNode.removeChild(b), "none" === e && (e = "block"), ga[d] = e, e);
  }function ia(a, b) {
    for (var c, d, e = [], f = 0, g = a.length; f < g; f++) {
      d = a[f], d.style && (c = d.style.display, b ? ("none" === c && (e[f] = W.get(d, "display") || null, e[f] || (d.style.display = "")), "" === d.style.display && da(d) && (e[f] = ha(d))) : "none" !== c && (e[f] = "none", W.set(d, "display", c)));
    }for (f = 0; f < g; f++) {
      null != e[f] && (a[f].style.display = e[f]);
    }return a;
  }r.fn.extend({ show: function show() {
      return ia(this, !0);
    }, hide: function hide() {
      return ia(this);
    }, toggle: function toggle(a) {
      return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
        da(this) ? r(this).show() : r(this).hide();
      });
    } });var ja = /^(?:checkbox|radio)$/i,
      ka = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
      la = /^$|\/(?:java|ecma)script/i,
      ma = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };ma.optgroup = ma.option, ma.tbody = ma.tfoot = ma.colgroup = ma.caption = ma.thead, ma.th = ma.td;function na(a, b) {
    var c;return c = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : [], void 0 === b || b && B(a, b) ? r.merge([a], c) : c;
  }function oa(a, b) {
    for (var c = 0, d = a.length; c < d; c++) {
      W.set(a[c], "globalEval", !b || W.get(b[c], "globalEval"));
    }
  }var pa = /<|&#?\w+;/;function qa(a, b, c, d, e) {
    for (var f, g, h, i, j, k, l = b.createDocumentFragment(), m = [], n = 0, o = a.length; n < o; n++) {
      if (f = a[n], f || 0 === f) if ("object" === r.type(f)) r.merge(m, f.nodeType ? [f] : f);else if (pa.test(f)) {
        g = g || l.appendChild(b.createElement("div")), h = (ka.exec(f) || ["", ""])[1].toLowerCase(), i = ma[h] || ma._default, g.innerHTML = i[1] + r.htmlPrefilter(f) + i[2], k = i[0];while (k--) {
          g = g.lastChild;
        }r.merge(m, g.childNodes), g = l.firstChild, g.textContent = "";
      } else m.push(b.createTextNode(f));
    }l.textContent = "", n = 0;while (f = m[n++]) {
      if (d && r.inArray(f, d) > -1) e && e.push(f);else if (j = r.contains(f.ownerDocument, f), g = na(l.appendChild(f), "script"), j && oa(g), c) {
        k = 0;while (f = g[k++]) {
          la.test(f.type || "") && c.push(f);
        }
      }
    }return l;
  }!function () {
    var a = d.createDocumentFragment(),
        b = a.appendChild(d.createElement("div")),
        c = d.createElement("input");c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), o.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", o.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue;
  }();var ra = d.documentElement,
      sa = /^key/,
      ta = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      ua = /^([^.]*)(?:\.(.+)|)/;function va() {
    return !0;
  }function wa() {
    return !1;
  }function xa() {
    try {
      return d.activeElement;
    } catch (a) {}
  }function ya(a, b, c, d, e, f) {
    var g, h;if ("object" == (typeof b === "undefined" ? "undefined" : _typeof(b))) {
      "string" != typeof c && (d = d || c, c = void 0);for (h in b) {
        ya(a, h, c, d, b[h], f);
      }return a;
    }if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = wa;else if (!e) return a;return 1 === f && (g = e, e = function e(a) {
      return r().off(a), g.apply(this, arguments);
    }, e.guid = g.guid || (g.guid = r.guid++)), a.each(function () {
      r.event.add(this, b, e, d, c);
    });
  }r.event = { global: {}, add: function add(a, b, c, d, e) {
      var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q = W.get(a);if (q) {
        c.handler && (f = c, c = f.handler, e = f.selector), e && r.find.matchesSelector(ra, e), c.guid || (c.guid = r.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function (b) {
          return "undefined" != typeof r && r.event.triggered !== b.type ? r.event.dispatch.apply(a, arguments) : void 0;
        }), b = (b || "").match(L) || [""], j = b.length;while (j--) {
          h = ua.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = r.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = r.event.special[n] || {}, k = r.extend({ type: n, origType: p, data: d, handler: c, guid: c.guid, selector: e, needsContext: e && r.expr.match.needsContext.test(e), namespace: o.join(".") }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), r.event.global[n] = !0);
        }
      }
    }, remove: function remove(a, b, c, d, e) {
      var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q = W.hasData(a) && W.get(a);if (q && (i = q.events)) {
        b = (b || "").match(L) || [""], j = b.length;while (j--) {
          if (h = ua.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
            l = r.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length;while (f--) {
              k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
            }g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || r.removeEvent(a, n, q.handle), delete i[n]);
          } else for (n in i) {
            r.event.remove(a, n + b[j], c, d, !0);
          }
        }r.isEmptyObject(i) && W.remove(a, "handle events");
      }
    }, dispatch: function dispatch(a) {
      var b = r.event.fix(a),
          c,
          d,
          e,
          f,
          g,
          h,
          i = new Array(arguments.length),
          j = (W.get(this, "events") || {})[b.type] || [],
          k = r.event.special[b.type] || {};for (i[0] = b, c = 1; c < arguments.length; c++) {
        i[c] = arguments[c];
      }if (b.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, b) !== !1) {
        h = r.event.handlers.call(this, b, j), c = 0;while ((f = h[c++]) && !b.isPropagationStopped()) {
          b.currentTarget = f.elem, d = 0;while ((g = f.handlers[d++]) && !b.isImmediatePropagationStopped()) {
            b.rnamespace && !b.rnamespace.test(g.namespace) || (b.handleObj = g, b.data = g.data, e = ((r.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== e && (b.result = e) === !1 && (b.preventDefault(), b.stopPropagation()));
          }
        }return k.postDispatch && k.postDispatch.call(this, b), b.result;
      }
    }, handlers: function handlers(a, b) {
      var c,
          d,
          e,
          f,
          g,
          h = [],
          i = b.delegateCount,
          j = a.target;if (i && j.nodeType && !("click" === a.type && a.button >= 1)) for (; j !== this; j = j.parentNode || this) {
        if (1 === j.nodeType && ("click" !== a.type || j.disabled !== !0)) {
          for (f = [], g = {}, c = 0; c < i; c++) {
            d = b[c], e = d.selector + " ", void 0 === g[e] && (g[e] = d.needsContext ? r(e, this).index(j) > -1 : r.find(e, this, null, [j]).length), g[e] && f.push(d);
          }f.length && h.push({ elem: j, handlers: f });
        }
      }return j = this, i < b.length && h.push({ elem: j, handlers: b.slice(i) }), h;
    }, addProp: function addProp(a, b) {
      Object.defineProperty(r.Event.prototype, a, { enumerable: !0, configurable: !0, get: r.isFunction(b) ? function () {
          if (this.originalEvent) return b(this.originalEvent);
        } : function () {
          if (this.originalEvent) return this.originalEvent[a];
        }, set: function set(b) {
          Object.defineProperty(this, a, { enumerable: !0, configurable: !0, writable: !0, value: b });
        } });
    }, fix: function fix(a) {
      return a[r.expando] ? a : new r.Event(a);
    }, special: { load: { noBubble: !0 }, focus: { trigger: function trigger() {
          if (this !== xa() && this.focus) return this.focus(), !1;
        }, delegateType: "focusin" }, blur: { trigger: function trigger() {
          if (this === xa() && this.blur) return this.blur(), !1;
        }, delegateType: "focusout" }, click: { trigger: function trigger() {
          if ("checkbox" === this.type && this.click && B(this, "input")) return this.click(), !1;
        }, _default: function _default(a) {
          return B(a.target, "a");
        } }, beforeunload: { postDispatch: function postDispatch(a) {
          void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
        } } } }, r.removeEvent = function (a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c);
  }, r.Event = function (a, b) {
    return this instanceof r.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? va : wa, this.target = a.target && 3 === a.target.nodeType ? a.target.parentNode : a.target, this.currentTarget = a.currentTarget, this.relatedTarget = a.relatedTarget) : this.type = a, b && r.extend(this, b), this.timeStamp = a && a.timeStamp || r.now(), void (this[r.expando] = !0)) : new r.Event(a, b);
  }, r.Event.prototype = { constructor: r.Event, isDefaultPrevented: wa, isPropagationStopped: wa, isImmediatePropagationStopped: wa, isSimulated: !1, preventDefault: function preventDefault() {
      var a = this.originalEvent;this.isDefaultPrevented = va, a && !this.isSimulated && a.preventDefault();
    }, stopPropagation: function stopPropagation() {
      var a = this.originalEvent;this.isPropagationStopped = va, a && !this.isSimulated && a.stopPropagation();
    }, stopImmediatePropagation: function stopImmediatePropagation() {
      var a = this.originalEvent;this.isImmediatePropagationStopped = va, a && !this.isSimulated && a.stopImmediatePropagation(), this.stopPropagation();
    } }, r.each({ altKey: !0, bubbles: !0, cancelable: !0, changedTouches: !0, ctrlKey: !0, detail: !0, eventPhase: !0, metaKey: !0, pageX: !0, pageY: !0, shiftKey: !0, view: !0, "char": !0, charCode: !0, key: !0, keyCode: !0, button: !0, buttons: !0, clientX: !0, clientY: !0, offsetX: !0, offsetY: !0, pointerId: !0, pointerType: !0, screenX: !0, screenY: !0, targetTouches: !0, toElement: !0, touches: !0, which: function which(a) {
      var b = a.button;return null == a.which && sa.test(a.type) ? null != a.charCode ? a.charCode : a.keyCode : !a.which && void 0 !== b && ta.test(a.type) ? 1 & b ? 1 : 2 & b ? 3 : 4 & b ? 2 : 0 : a.which;
    } }, r.event.addProp), r.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (a, b) {
    r.event.special[a] = { delegateType: b, bindType: b, handle: function handle(a) {
        var c,
            d = this,
            e = a.relatedTarget,
            f = a.handleObj;return e && (e === d || r.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c;
      } };
  }), r.fn.extend({ on: function on(a, b, c, d) {
      return ya(this, a, b, c, d);
    }, one: function one(a, b, c, d) {
      return ya(this, a, b, c, d, 1);
    }, off: function off(a, b, c) {
      var d, e;if (a && a.preventDefault && a.handleObj) return d = a.handleObj, r(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;if ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a))) {
        for (e in a) {
          this.off(e, b, a[e]);
        }return this;
      }return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = wa), this.each(function () {
        r.event.remove(this, a, c, b);
      });
    } });var za = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
      Aa = /<script|<style|<link/i,
      Ba = /checked\s*(?:[^=]|=\s*.checked.)/i,
      Ca = /^true\/(.*)/,
      Da = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Ea(a, b) {
    return B(a, "table") && B(11 !== b.nodeType ? b : b.firstChild, "tr") ? r(">tbody", a)[0] || a : a;
  }function Fa(a) {
    return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a;
  }function Ga(a) {
    var b = Ca.exec(a.type);return b ? a.type = b[1] : a.removeAttribute("type"), a;
  }function Ha(a, b) {
    var c, d, e, f, g, h, i, j;if (1 === b.nodeType) {
      if (W.hasData(a) && (f = W.access(a), g = W.set(b, f), j = f.events)) {
        delete g.handle, g.events = {};for (e in j) {
          for (c = 0, d = j[e].length; c < d; c++) {
            r.event.add(b, e, j[e][c]);
          }
        }
      }X.hasData(a) && (h = X.access(a), i = r.extend({}, h), X.set(b, i));
    }
  }function Ia(a, b) {
    var c = b.nodeName.toLowerCase();"input" === c && ja.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue);
  }function Ja(a, b, c, d) {
    b = g.apply([], b);var e,
        f,
        h,
        i,
        j,
        k,
        l = 0,
        m = a.length,
        n = m - 1,
        q = b[0],
        s = r.isFunction(q);if (s || m > 1 && "string" == typeof q && !o.checkClone && Ba.test(q)) return a.each(function (e) {
      var f = a.eq(e);s && (b[0] = q.call(this, e, f.html())), Ja(f, b, c, d);
    });if (m && (e = qa(b, a[0].ownerDocument, !1, a, d), f = e.firstChild, 1 === e.childNodes.length && (e = f), f || d)) {
      for (h = r.map(na(e, "script"), Fa), i = h.length; l < m; l++) {
        j = e, l !== n && (j = r.clone(j, !0, !0), i && r.merge(h, na(j, "script"))), c.call(a[l], j, l);
      }if (i) for (k = h[h.length - 1].ownerDocument, r.map(h, Ga), l = 0; l < i; l++) {
        j = h[l], la.test(j.type || "") && !W.access(j, "globalEval") && r.contains(k, j) && (j.src ? r._evalUrl && r._evalUrl(j.src) : p(j.textContent.replace(Da, ""), k));
      }
    }return a;
  }function Ka(a, b, c) {
    for (var d, e = b ? r.filter(b, a) : a, f = 0; null != (d = e[f]); f++) {
      c || 1 !== d.nodeType || r.cleanData(na(d)), d.parentNode && (c && r.contains(d.ownerDocument, d) && oa(na(d, "script")), d.parentNode.removeChild(d));
    }return a;
  }r.extend({ htmlPrefilter: function htmlPrefilter(a) {
      return a.replace(za, "<$1></$2>");
    }, clone: function clone(a, b, c) {
      var d,
          e,
          f,
          g,
          h = a.cloneNode(!0),
          i = r.contains(a.ownerDocument, a);if (!(o.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || r.isXMLDoc(a))) for (g = na(h), f = na(a), d = 0, e = f.length; d < e; d++) {
        Ia(f[d], g[d]);
      }if (b) if (c) for (f = f || na(a), g = g || na(h), d = 0, e = f.length; d < e; d++) {
        Ha(f[d], g[d]);
      } else Ha(a, h);return g = na(h, "script"), g.length > 0 && oa(g, !i && na(a, "script")), h;
    }, cleanData: function cleanData(a) {
      for (var b, c, d, e = r.event.special, f = 0; void 0 !== (c = a[f]); f++) {
        if (U(c)) {
          if (b = c[W.expando]) {
            if (b.events) for (d in b.events) {
              e[d] ? r.event.remove(c, d) : r.removeEvent(c, d, b.handle);
            }c[W.expando] = void 0;
          }c[X.expando] && (c[X.expando] = void 0);
        }
      }
    } }), r.fn.extend({ detach: function detach(a) {
      return Ka(this, a, !0);
    }, remove: function remove(a) {
      return Ka(this, a);
    }, text: function text(a) {
      return T(this, function (a) {
        return void 0 === a ? r.text(this) : this.empty().each(function () {
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a);
        });
      }, null, a, arguments.length);
    }, append: function append() {
      return Ja(this, arguments, function (a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = Ea(this, a);b.appendChild(a);
        }
      });
    }, prepend: function prepend() {
      return Ja(this, arguments, function (a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = Ea(this, a);b.insertBefore(a, b.firstChild);
        }
      });
    }, before: function before() {
      return Ja(this, arguments, function (a) {
        this.parentNode && this.parentNode.insertBefore(a, this);
      });
    }, after: function after() {
      return Ja(this, arguments, function (a) {
        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
      });
    }, empty: function empty() {
      for (var a, b = 0; null != (a = this[b]); b++) {
        1 === a.nodeType && (r.cleanData(na(a, !1)), a.textContent = "");
      }return this;
    }, clone: function clone(a, b) {
      return a = null != a && a, b = null == b ? a : b, this.map(function () {
        return r.clone(this, a, b);
      });
    }, html: function html(a) {
      return T(this, function (a) {
        var b = this[0] || {},
            c = 0,
            d = this.length;if (void 0 === a && 1 === b.nodeType) return b.innerHTML;if ("string" == typeof a && !Aa.test(a) && !ma[(ka.exec(a) || ["", ""])[1].toLowerCase()]) {
          a = r.htmlPrefilter(a);try {
            for (; c < d; c++) {
              b = this[c] || {}, 1 === b.nodeType && (r.cleanData(na(b, !1)), b.innerHTML = a);
            }b = 0;
          } catch (e) {}
        }b && this.empty().append(a);
      }, null, a, arguments.length);
    }, replaceWith: function replaceWith() {
      var a = [];return Ja(this, arguments, function (b) {
        var c = this.parentNode;r.inArray(this, a) < 0 && (r.cleanData(na(this)), c && c.replaceChild(b, this));
      }, a);
    } }), r.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (a, b) {
    r.fn[a] = function (a) {
      for (var c, d = [], e = r(a), f = e.length - 1, g = 0; g <= f; g++) {
        c = g === f ? this : this.clone(!0), r(e[g])[b](c), h.apply(d, c.get());
      }return this.pushStack(d);
    };
  });var La = /^margin/,
      Ma = new RegExp("^(" + aa + ")(?!px)[a-z%]+$", "i"),
      Na = function Na(b) {
    var c = b.ownerDocument.defaultView;return c && c.opener || (c = a), c.getComputedStyle(b);
  };!function () {
    function b() {
      if (i) {
        i.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", i.innerHTML = "", ra.appendChild(h);var b = a.getComputedStyle(i);c = "1%" !== b.top, g = "2px" === b.marginLeft, e = "4px" === b.width, i.style.marginRight = "50%", f = "4px" === b.marginRight, ra.removeChild(h), i = null;
      }
    }var c,
        e,
        f,
        g,
        h = d.createElement("div"),
        i = d.createElement("div");i.style && (i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", o.clearCloneStyle = "content-box" === i.style.backgroundClip, h.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", h.appendChild(i), r.extend(o, { pixelPosition: function pixelPosition() {
        return b(), c;
      }, boxSizingReliable: function boxSizingReliable() {
        return b(), e;
      }, pixelMarginRight: function pixelMarginRight() {
        return b(), f;
      }, reliableMarginLeft: function reliableMarginLeft() {
        return b(), g;
      } }));
  }();function Oa(a, b, c) {
    var d,
        e,
        f,
        g,
        h = a.style;return c = c || Na(a), c && (g = c.getPropertyValue(b) || c[b], "" !== g || r.contains(a.ownerDocument, a) || (g = r.style(a, b)), !o.pixelMarginRight() && Ma.test(g) && La.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g;
  }function Pa(a, b) {
    return { get: function get() {
        return a() ? void delete this.get : (this.get = b).apply(this, arguments);
      } };
  }var Qa = /^(none|table(?!-c[ea]).+)/,
      Ra = /^--/,
      Sa = { position: "absolute", visibility: "hidden", display: "block" },
      Ta = { letterSpacing: "0", fontWeight: "400" },
      Ua = ["Webkit", "Moz", "ms"],
      Va = d.createElement("div").style;function Wa(a) {
    if (a in Va) return a;var b = a[0].toUpperCase() + a.slice(1),
        c = Ua.length;while (c--) {
      if (a = Ua[c] + b, a in Va) return a;
    }
  }function Xa(a) {
    var b = r.cssProps[a];return b || (b = r.cssProps[a] = Wa(a) || a), b;
  }function Ya(a, b, c) {
    var d = ba.exec(b);return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b;
  }function Za(a, b, c, d, e) {
    var f,
        g = 0;for (f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0; f < 4; f += 2) {
      "margin" === c && (g += r.css(a, c + ca[f], !0, e)), d ? ("content" === c && (g -= r.css(a, "padding" + ca[f], !0, e)), "margin" !== c && (g -= r.css(a, "border" + ca[f] + "Width", !0, e))) : (g += r.css(a, "padding" + ca[f], !0, e), "padding" !== c && (g += r.css(a, "border" + ca[f] + "Width", !0, e)));
    }return g;
  }function $a(a, b, c) {
    var d,
        e = Na(a),
        f = Oa(a, b, e),
        g = "border-box" === r.css(a, "boxSizing", !1, e);return Ma.test(f) ? f : (d = g && (o.boxSizingReliable() || f === a.style[b]), "auto" === f && (f = a["offset" + b[0].toUpperCase() + b.slice(1)]), f = parseFloat(f) || 0, f + Za(a, b, c || (g ? "border" : "content"), d, e) + "px");
  }r.extend({ cssHooks: { opacity: { get: function get(a, b) {
          if (b) {
            var c = Oa(a, "opacity");return "" === c ? "1" : c;
          }
        } } }, cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": "cssFloat" }, style: function style(a, b, c, d) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var e,
            f,
            g,
            h = r.camelCase(b),
            i = Ra.test(b),
            j = a.style;return i || (b = Xa(h)), g = r.cssHooks[b] || r.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : j[b] : (f = typeof c === "undefined" ? "undefined" : _typeof(c), "string" === f && (e = ba.exec(c)) && e[1] && (c = fa(a, b, e), f = "number"), null != c && c === c && ("number" === f && (c += e && e[3] || (r.cssNumber[h] ? "" : "px")), o.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (j[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i ? j.setProperty(b, c) : j[b] = c)), void 0);
      }
    }, css: function css(a, b, c, d) {
      var e,
          f,
          g,
          h = r.camelCase(b),
          i = Ra.test(b);return i || (b = Xa(h)), g = r.cssHooks[b] || r.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = Oa(a, b, d)), "normal" === e && b in Ta && (e = Ta[b]), "" === c || c ? (f = parseFloat(e), c === !0 || isFinite(f) ? f || 0 : e) : e;
    } }), r.each(["height", "width"], function (a, b) {
    r.cssHooks[b] = { get: function get(a, c, d) {
        if (c) return !Qa.test(r.css(a, "display")) || a.getClientRects().length && a.getBoundingClientRect().width ? $a(a, b, d) : ea(a, Sa, function () {
          return $a(a, b, d);
        });
      }, set: function set(a, c, d) {
        var e,
            f = d && Na(a),
            g = d && Za(a, b, d, "border-box" === r.css(a, "boxSizing", !1, f), f);return g && (e = ba.exec(c)) && "px" !== (e[3] || "px") && (a.style[b] = c, c = r.css(a, b)), Ya(a, c, g);
      } };
  }), r.cssHooks.marginLeft = Pa(o.reliableMarginLeft, function (a, b) {
    if (b) return (parseFloat(Oa(a, "marginLeft")) || a.getBoundingClientRect().left - ea(a, { marginLeft: 0 }, function () {
      return a.getBoundingClientRect().left;
    })) + "px";
  }), r.each({ margin: "", padding: "", border: "Width" }, function (a, b) {
    r.cssHooks[a + b] = { expand: function expand(c) {
        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; d < 4; d++) {
          e[a + ca[d] + b] = f[d] || f[d - 2] || f[0];
        }return e;
      } }, La.test(a) || (r.cssHooks[a + b].set = Ya);
  }), r.fn.extend({ css: function css(a, b) {
      return T(this, function (a, b, c) {
        var d,
            e,
            f = {},
            g = 0;if (Array.isArray(b)) {
          for (d = Na(a), e = b.length; g < e; g++) {
            f[b[g]] = r.css(a, b[g], !1, d);
          }return f;
        }return void 0 !== c ? r.style(a, b, c) : r.css(a, b);
      }, a, b, arguments.length > 1);
    } });function _a(a, b, c, d, e) {
    return new _a.prototype.init(a, b, c, d, e);
  }r.Tween = _a, _a.prototype = { constructor: _a, init: function init(a, b, c, d, e, f) {
      this.elem = a, this.prop = c, this.easing = e || r.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (r.cssNumber[c] ? "" : "px");
    }, cur: function cur() {
      var a = _a.propHooks[this.prop];return a && a.get ? a.get(this) : _a.propHooks._default.get(this);
    }, run: function run(a) {
      var b,
          c = _a.propHooks[this.prop];return this.options.duration ? this.pos = b = r.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : _a.propHooks._default.set(this), this;
    } }, _a.prototype.init.prototype = _a.prototype, _a.propHooks = { _default: { get: function get(a) {
        var b;return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = r.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0);
      }, set: function set(a) {
        r.fx.step[a.prop] ? r.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[r.cssProps[a.prop]] && !r.cssHooks[a.prop] ? a.elem[a.prop] = a.now : r.style(a.elem, a.prop, a.now + a.unit);
      } } }, _a.propHooks.scrollTop = _a.propHooks.scrollLeft = { set: function set(a) {
      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
    } }, r.easing = { linear: function linear(a) {
      return a;
    }, swing: function swing(a) {
      return .5 - Math.cos(a * Math.PI) / 2;
    }, _default: "swing" }, r.fx = _a.prototype.init, r.fx.step = {};var ab,
      bb,
      cb = /^(?:toggle|show|hide)$/,
      db = /queueHooks$/;function eb() {
    bb && (d.hidden === !1 && a.requestAnimationFrame ? a.requestAnimationFrame(eb) : a.setTimeout(eb, r.fx.interval), r.fx.tick());
  }function fb() {
    return a.setTimeout(function () {
      ab = void 0;
    }), ab = r.now();
  }function gb(a, b) {
    var c,
        d = 0,
        e = { height: a };for (b = b ? 1 : 0; d < 4; d += 2 - b) {
      c = ca[d], e["margin" + c] = e["padding" + c] = a;
    }return b && (e.opacity = e.width = a), e;
  }function hb(a, b, c) {
    for (var d, e = (kb.tweeners[b] || []).concat(kb.tweeners["*"]), f = 0, g = e.length; f < g; f++) {
      if (d = e[f].call(c, b, a)) return d;
    }
  }function ib(a, b, c) {
    var d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l = "width" in b || "height" in b,
        m = this,
        n = {},
        o = a.style,
        p = a.nodeType && da(a),
        q = W.get(a, "fxshow");c.queue || (g = r._queueHooks(a, "fx"), null == g.unqueued && (g.unqueued = 0, h = g.empty.fire, g.empty.fire = function () {
      g.unqueued || h();
    }), g.unqueued++, m.always(function () {
      m.always(function () {
        g.unqueued--, r.queue(a, "fx").length || g.empty.fire();
      });
    }));for (d in b) {
      if (e = b[d], cb.test(e)) {
        if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
          if ("show" !== e || !q || void 0 === q[d]) continue;p = !0;
        }n[d] = q && q[d] || r.style(a, d);
      }
    }if (i = !r.isEmptyObject(b), i || !r.isEmptyObject(n)) {
      l && 1 === a.nodeType && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = q && q.display, null == j && (j = W.get(a, "display")), k = r.css(a, "display"), "none" === k && (j ? k = j : (ia([a], !0), j = a.style.display || j, k = r.css(a, "display"), ia([a]))), ("inline" === k || "inline-block" === k && null != j) && "none" === r.css(a, "float") && (i || (m.done(function () {
        o.display = j;
      }), null == j && (k = o.display, j = "none" === k ? "" : k)), o.display = "inline-block")), c.overflow && (o.overflow = "hidden", m.always(function () {
        o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2];
      })), i = !1;for (d in n) {
        i || (q ? "hidden" in q && (p = q.hidden) : q = W.access(a, "fxshow", { display: j }), f && (q.hidden = !p), p && ia([a], !0), m.done(function () {
          p || ia([a]), W.remove(a, "fxshow");for (d in n) {
            r.style(a, d, n[d]);
          }
        })), i = hb(p ? q[d] : 0, d, m), d in q || (q[d] = i.start, p && (i.end = i.start, i.start = 0));
      }
    }
  }function jb(a, b) {
    var c, d, e, f, g;for (c in a) {
      if (d = r.camelCase(c), e = b[d], f = a[c], Array.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = r.cssHooks[d], g && "expand" in g) {
        f = g.expand(f), delete a[d];for (c in f) {
          c in a || (a[c] = f[c], b[c] = e);
        }
      } else b[d] = e;
    }
  }function kb(a, b, c) {
    var d,
        e,
        f = 0,
        g = kb.prefilters.length,
        h = r.Deferred().always(function () {
      delete i.elem;
    }),
        i = function i() {
      if (e) return !1;for (var b = ab || fb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; g < i; g++) {
        j.tweens[g].run(f);
      }return h.notifyWith(a, [j, f, c]), f < 1 && i ? c : (i || h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j]), !1);
    },
        j = h.promise({ elem: a, props: r.extend({}, b), opts: r.extend(!0, { specialEasing: {}, easing: r.easing._default }, c), originalProperties: b, originalOptions: c, startTime: ab || fb(), duration: c.duration, tweens: [], createTween: function createTween(b, c) {
        var d = r.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);return j.tweens.push(d), d;
      }, stop: function stop(b) {
        var c = 0,
            d = b ? j.tweens.length : 0;if (e) return this;for (e = !0; c < d; c++) {
          j.tweens[c].run(1);
        }return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this;
      } }),
        k = j.props;for (jb(k, j.opts.specialEasing); f < g; f++) {
      if (d = kb.prefilters[f].call(j, a, k, j.opts)) return r.isFunction(d.stop) && (r._queueHooks(j.elem, j.opts.queue).stop = r.proxy(d.stop, d)), d;
    }return r.map(k, hb, j), r.isFunction(j.opts.start) && j.opts.start.call(a, j), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always), r.fx.timer(r.extend(i, { elem: a, anim: j, queue: j.opts.queue })), j;
  }r.Animation = r.extend(kb, { tweeners: { "*": [function (a, b) {
        var c = this.createTween(a, b);return fa(c.elem, a, ba.exec(b), c), c;
      }] }, tweener: function tweener(a, b) {
      r.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(L);for (var c, d = 0, e = a.length; d < e; d++) {
        c = a[d], kb.tweeners[c] = kb.tweeners[c] || [], kb.tweeners[c].unshift(b);
      }
    }, prefilters: [ib], prefilter: function prefilter(a, b) {
      b ? kb.prefilters.unshift(a) : kb.prefilters.push(a);
    } }), r.speed = function (a, b, c) {
    var d = a && "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) ? r.extend({}, a) : { complete: c || !c && b || r.isFunction(a) && a, duration: a, easing: c && b || b && !r.isFunction(b) && b };return r.fx.off ? d.duration = 0 : "number" != typeof d.duration && (d.duration in r.fx.speeds ? d.duration = r.fx.speeds[d.duration] : d.duration = r.fx.speeds._default), null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function () {
      r.isFunction(d.old) && d.old.call(this), d.queue && r.dequeue(this, d.queue);
    }, d;
  }, r.fn.extend({ fadeTo: function fadeTo(a, b, c, d) {
      return this.filter(da).css("opacity", 0).show().end().animate({ opacity: b }, a, c, d);
    }, animate: function animate(a, b, c, d) {
      var e = r.isEmptyObject(a),
          f = r.speed(b, c, d),
          g = function g() {
        var b = kb(this, r.extend({}, a), f);(e || W.get(this, "finish")) && b.stop(!0);
      };return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
    }, stop: function stop(a, b, c) {
      var d = function d(a) {
        var b = a.stop;delete a.stop, b(c);
      };return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
        var b = !0,
            e = null != a && a + "queueHooks",
            f = r.timers,
            g = W.get(this);if (e) g[e] && g[e].stop && d(g[e]);else for (e in g) {
          g[e] && g[e].stop && db.test(e) && d(g[e]);
        }for (e = f.length; e--;) {
          f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
        }!b && c || r.dequeue(this, a);
      });
    }, finish: function finish(a) {
      return a !== !1 && (a = a || "fx"), this.each(function () {
        var b,
            c = W.get(this),
            d = c[a + "queue"],
            e = c[a + "queueHooks"],
            f = r.timers,
            g = d ? d.length : 0;for (c.finish = !0, r.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) {
          f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
        }for (b = 0; b < g; b++) {
          d[b] && d[b].finish && d[b].finish.call(this);
        }delete c.finish;
      });
    } }), r.each(["toggle", "show", "hide"], function (a, b) {
    var c = r.fn[b];r.fn[b] = function (a, d, e) {
      return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(gb(b, !0), a, d, e);
    };
  }), r.each({ slideDown: gb("show"), slideUp: gb("hide"), slideToggle: gb("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (a, b) {
    r.fn[a] = function (a, c, d) {
      return this.animate(b, a, c, d);
    };
  }), r.timers = [], r.fx.tick = function () {
    var a,
        b = 0,
        c = r.timers;for (ab = r.now(); b < c.length; b++) {
      a = c[b], a() || c[b] !== a || c.splice(b--, 1);
    }c.length || r.fx.stop(), ab = void 0;
  }, r.fx.timer = function (a) {
    r.timers.push(a), r.fx.start();
  }, r.fx.interval = 13, r.fx.start = function () {
    bb || (bb = !0, eb());
  }, r.fx.stop = function () {
    bb = null;
  }, r.fx.speeds = { slow: 600, fast: 200, _default: 400 }, r.fn.delay = function (b, c) {
    return b = r.fx ? r.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function (c, d) {
      var e = a.setTimeout(c, b);d.stop = function () {
        a.clearTimeout(e);
      };
    });
  }, function () {
    var a = d.createElement("input"),
        b = d.createElement("select"),
        c = b.appendChild(d.createElement("option"));a.type = "checkbox", o.checkOn = "" !== a.value, o.optSelected = c.selected, a = d.createElement("input"), a.value = "t", a.type = "radio", o.radioValue = "t" === a.value;
  }();var lb,
      mb = r.expr.attrHandle;r.fn.extend({ attr: function attr(a, b) {
      return T(this, r.attr, a, b, arguments.length > 1);
    }, removeAttr: function removeAttr(a) {
      return this.each(function () {
        r.removeAttr(this, a);
      });
    } }), r.extend({ attr: function attr(a, b, c) {
      var d,
          e,
          f = a.nodeType;if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof a.getAttribute ? r.prop(a, b, c) : (1 === f && r.isXMLDoc(a) || (e = r.attrHooks[b.toLowerCase()] || (r.expr.match.bool.test(b) ? lb : void 0)), void 0 !== c ? null === c ? void r.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = r.find.attr(a, b), null == d ? void 0 : d));
    }, attrHooks: { type: { set: function set(a, b) {
          if (!o.radioValue && "radio" === b && B(a, "input")) {
            var c = a.value;return a.setAttribute("type", b), c && (a.value = c), b;
          }
        } } }, removeAttr: function removeAttr(a, b) {
      var c,
          d = 0,
          e = b && b.match(L);if (e && 1 === a.nodeType) while (c = e[d++]) {
        a.removeAttribute(c);
      }
    } }), lb = { set: function set(a, b, c) {
      return b === !1 ? r.removeAttr(a, c) : a.setAttribute(c, c), c;
    } }, r.each(r.expr.match.bool.source.match(/\w+/g), function (a, b) {
    var c = mb[b] || r.find.attr;mb[b] = function (a, b, d) {
      var e,
          f,
          g = b.toLowerCase();return d || (f = mb[g], mb[g] = e, e = null != c(a, b, d) ? g : null, mb[g] = f), e;
    };
  });var nb = /^(?:input|select|textarea|button)$/i,
      ob = /^(?:a|area)$/i;r.fn.extend({ prop: function prop(a, b) {
      return T(this, r.prop, a, b, arguments.length > 1);
    }, removeProp: function removeProp(a) {
      return this.each(function () {
        delete this[r.propFix[a] || a];
      });
    } }), r.extend({ prop: function prop(a, b, c) {
      var d,
          e,
          f = a.nodeType;if (3 !== f && 8 !== f && 2 !== f) return 1 === f && r.isXMLDoc(a) || (b = r.propFix[b] || b, e = r.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b];
    }, propHooks: { tabIndex: { get: function get(a) {
          var b = r.find.attr(a, "tabindex");return b ? parseInt(b, 10) : nb.test(a.nodeName) || ob.test(a.nodeName) && a.href ? 0 : -1;
        } } }, propFix: { "for": "htmlFor", "class": "className" } }), o.optSelected || (r.propHooks.selected = { get: function get(a) {
      var b = a.parentNode;return b && b.parentNode && b.parentNode.selectedIndex, null;
    }, set: function set(a) {
      var b = a.parentNode;b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
    } }), r.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    r.propFix[this.toLowerCase()] = this;
  });function pb(a) {
    var b = a.match(L) || [];return b.join(" ");
  }function qb(a) {
    return a.getAttribute && a.getAttribute("class") || "";
  }r.fn.extend({ addClass: function addClass(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i = 0;if (r.isFunction(a)) return this.each(function (b) {
        r(this).addClass(a.call(this, b, qb(this)));
      });if ("string" == typeof a && a) {
        b = a.match(L) || [];while (c = this[i++]) {
          if (e = qb(c), d = 1 === c.nodeType && " " + pb(e) + " ") {
            g = 0;while (f = b[g++]) {
              d.indexOf(" " + f + " ") < 0 && (d += f + " ");
            }h = pb(d), e !== h && c.setAttribute("class", h);
          }
        }
      }return this;
    }, removeClass: function removeClass(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i = 0;if (r.isFunction(a)) return this.each(function (b) {
        r(this).removeClass(a.call(this, b, qb(this)));
      });if (!arguments.length) return this.attr("class", "");if ("string" == typeof a && a) {
        b = a.match(L) || [];while (c = this[i++]) {
          if (e = qb(c), d = 1 === c.nodeType && " " + pb(e) + " ") {
            g = 0;while (f = b[g++]) {
              while (d.indexOf(" " + f + " ") > -1) {
                d = d.replace(" " + f + " ", " ");
              }
            }h = pb(d), e !== h && c.setAttribute("class", h);
          }
        }
      }return this;
    }, toggleClass: function toggleClass(a, b) {
      var c = typeof a === "undefined" ? "undefined" : _typeof(a);return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : r.isFunction(a) ? this.each(function (c) {
        r(this).toggleClass(a.call(this, c, qb(this), b), b);
      }) : this.each(function () {
        var b, d, e, f;if ("string" === c) {
          d = 0, e = r(this), f = a.match(L) || [];while (b = f[d++]) {
            e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
          }
        } else void 0 !== a && "boolean" !== c || (b = qb(this), b && W.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || a === !1 ? "" : W.get(this, "__className__") || ""));
      });
    }, hasClass: function hasClass(a) {
      var b,
          c,
          d = 0;b = " " + a + " ";while (c = this[d++]) {
        if (1 === c.nodeType && (" " + pb(qb(c)) + " ").indexOf(b) > -1) return !0;
      }return !1;
    } });var rb = /\r/g;r.fn.extend({ val: function val(a) {
      var b,
          c,
          d,
          e = this[0];{
        if (arguments.length) return d = r.isFunction(a), this.each(function (c) {
          var e;1 === this.nodeType && (e = d ? a.call(this, c, r(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : Array.isArray(e) && (e = r.map(e, function (a) {
            return null == a ? "" : a + "";
          })), b = r.valHooks[this.type] || r.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e));
        });if (e) return b = r.valHooks[e.type] || r.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(rb, "") : null == c ? "" : c);
      }
    } }), r.extend({ valHooks: { option: { get: function get(a) {
          var b = r.find.attr(a, "value");return null != b ? b : pb(r.text(a));
        } }, select: { get: function get(a) {
          var b,
              c,
              d,
              e = a.options,
              f = a.selectedIndex,
              g = "select-one" === a.type,
              h = g ? null : [],
              i = g ? f + 1 : e.length;for (d = f < 0 ? i : g ? f : 0; d < i; d++) {
            if (c = e[d], (c.selected || d === f) && !c.disabled && (!c.parentNode.disabled || !B(c.parentNode, "optgroup"))) {
              if (b = r(c).val(), g) return b;h.push(b);
            }
          }return h;
        }, set: function set(a, b) {
          var c,
              d,
              e = a.options,
              f = r.makeArray(b),
              g = e.length;while (g--) {
            d = e[g], (d.selected = r.inArray(r.valHooks.option.get(d), f) > -1) && (c = !0);
          }return c || (a.selectedIndex = -1), f;
        } } } }), r.each(["radio", "checkbox"], function () {
    r.valHooks[this] = { set: function set(a, b) {
        if (Array.isArray(b)) return a.checked = r.inArray(r(a).val(), b) > -1;
      } }, o.checkOn || (r.valHooks[this].get = function (a) {
      return null === a.getAttribute("value") ? "on" : a.value;
    });
  });var sb = /^(?:focusinfocus|focusoutblur)$/;r.extend(r.event, { trigger: function trigger(b, c, e, f) {
      var g,
          h,
          i,
          j,
          k,
          m,
          n,
          o = [e || d],
          p = l.call(b, "type") ? b.type : b,
          q = l.call(b, "namespace") ? b.namespace.split(".") : [];if (h = i = e = e || d, 3 !== e.nodeType && 8 !== e.nodeType && !sb.test(p + r.event.triggered) && (p.indexOf(".") > -1 && (q = p.split("."), p = q.shift(), q.sort()), k = p.indexOf(":") < 0 && "on" + p, b = b[r.expando] ? b : new r.Event(p, "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b), b.isTrigger = f ? 2 : 3, b.namespace = q.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = e), c = null == c ? [b] : r.makeArray(c, [b]), n = r.event.special[p] || {}, f || !n.trigger || n.trigger.apply(e, c) !== !1)) {
        if (!f && !n.noBubble && !r.isWindow(e)) {
          for (j = n.delegateType || p, sb.test(j + p) || (h = h.parentNode); h; h = h.parentNode) {
            o.push(h), i = h;
          }i === (e.ownerDocument || d) && o.push(i.defaultView || i.parentWindow || a);
        }g = 0;while ((h = o[g++]) && !b.isPropagationStopped()) {
          b.type = g > 1 ? j : n.bindType || p, m = (W.get(h, "events") || {})[b.type] && W.get(h, "handle"), m && m.apply(h, c), m = k && h[k], m && m.apply && U(h) && (b.result = m.apply(h, c), b.result === !1 && b.preventDefault());
        }return b.type = p, f || b.isDefaultPrevented() || n._default && n._default.apply(o.pop(), c) !== !1 || !U(e) || k && r.isFunction(e[p]) && !r.isWindow(e) && (i = e[k], i && (e[k] = null), r.event.triggered = p, e[p](), r.event.triggered = void 0, i && (e[k] = i)), b.result;
      }
    }, simulate: function simulate(a, b, c) {
      var d = r.extend(new r.Event(), c, { type: a, isSimulated: !0 });r.event.trigger(d, null, b);
    } }), r.fn.extend({ trigger: function trigger(a, b) {
      return this.each(function () {
        r.event.trigger(a, b, this);
      });
    }, triggerHandler: function triggerHandler(a, b) {
      var c = this[0];if (c) return r.event.trigger(a, b, c, !0);
    } }), r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (a, b) {
    r.fn[b] = function (a, c) {
      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
    };
  }), r.fn.extend({ hover: function hover(a, b) {
      return this.mouseenter(a).mouseleave(b || a);
    } }), o.focusin = "onfocusin" in a, o.focusin || r.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
    var c = function c(a) {
      r.event.simulate(b, a.target, r.event.fix(a));
    };r.event.special[b] = { setup: function setup() {
        var d = this.ownerDocument || this,
            e = W.access(d, b);e || d.addEventListener(a, c, !0), W.access(d, b, (e || 0) + 1);
      }, teardown: function teardown() {
        var d = this.ownerDocument || this,
            e = W.access(d, b) - 1;e ? W.access(d, b, e) : (d.removeEventListener(a, c, !0), W.remove(d, b));
      } };
  });var tb = a.location,
      ub = r.now(),
      vb = /\?/;r.parseXML = function (b) {
    var c;if (!b || "string" != typeof b) return null;try {
      c = new a.DOMParser().parseFromString(b, "text/xml");
    } catch (d) {
      c = void 0;
    }return c && !c.getElementsByTagName("parsererror").length || r.error("Invalid XML: " + b), c;
  };var wb = /\[\]$/,
      xb = /\r?\n/g,
      yb = /^(?:submit|button|image|reset|file)$/i,
      zb = /^(?:input|select|textarea|keygen)/i;function Ab(a, b, c, d) {
    var e;if (Array.isArray(b)) r.each(b, function (b, e) {
      c || wb.test(a) ? d(a, e) : Ab(a + "[" + ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && null != e ? b : "") + "]", e, c, d);
    });else if (c || "object" !== r.type(b)) d(a, b);else for (e in b) {
      Ab(a + "[" + e + "]", b[e], c, d);
    }
  }r.param = function (a, b) {
    var c,
        d = [],
        e = function e(a, b) {
      var c = r.isFunction(b) ? b() : b;d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(null == c ? "" : c);
    };if (Array.isArray(a) || a.jquery && !r.isPlainObject(a)) r.each(a, function () {
      e(this.name, this.value);
    });else for (c in a) {
      Ab(c, a[c], b, e);
    }return d.join("&");
  }, r.fn.extend({ serialize: function serialize() {
      return r.param(this.serializeArray());
    }, serializeArray: function serializeArray() {
      return this.map(function () {
        var a = r.prop(this, "elements");return a ? r.makeArray(a) : this;
      }).filter(function () {
        var a = this.type;return this.name && !r(this).is(":disabled") && zb.test(this.nodeName) && !yb.test(a) && (this.checked || !ja.test(a));
      }).map(function (a, b) {
        var c = r(this).val();return null == c ? null : Array.isArray(c) ? r.map(c, function (a) {
          return { name: b.name, value: a.replace(xb, "\r\n") };
        }) : { name: b.name, value: c.replace(xb, "\r\n") };
      }).get();
    } });var Bb = /%20/g,
      Cb = /#.*$/,
      Db = /([?&])_=[^&]*/,
      Eb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      Fb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      Gb = /^(?:GET|HEAD)$/,
      Hb = /^\/\//,
      Ib = {},
      Jb = {},
      Kb = "*/".concat("*"),
      Lb = d.createElement("a");Lb.href = tb.href;function Mb(a) {
    return function (b, c) {
      "string" != typeof b && (c = b, b = "*");var d,
          e = 0,
          f = b.toLowerCase().match(L) || [];if (r.isFunction(c)) while (d = f[e++]) {
        "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
      }
    };
  }function Nb(a, b, c, d) {
    var e = {},
        f = a === Jb;function g(h) {
      var i;return e[h] = !0, r.each(a[h] || [], function (a, h) {
        var j = h(b, c, d);return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1);
      }), i;
    }return g(b.dataTypes[0]) || !e["*"] && g("*");
  }function Ob(a, b) {
    var c,
        d,
        e = r.ajaxSettings.flatOptions || {};for (c in b) {
      void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
    }return d && r.extend(!0, a, d), a;
  }function Pb(a, b, c) {
    var d,
        e,
        f,
        g,
        h = a.contents,
        i = a.dataTypes;while ("*" === i[0]) {
      i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
    }if (d) for (e in h) {
      if (h[e] && h[e].test(d)) {
        i.unshift(e);break;
      }
    }if (i[0] in c) f = i[0];else {
      for (e in c) {
        if (!i[0] || a.converters[e + " " + i[0]]) {
          f = e;break;
        }g || (g = e);
      }f = f || g;
    }if (f) return f !== i[0] && i.unshift(f), c[f];
  }function Qb(a, b, c, d) {
    var e,
        f,
        g,
        h,
        i,
        j = {},
        k = a.dataTypes.slice();if (k[1]) for (g in a.converters) {
      j[g.toLowerCase()] = a.converters[g];
    }f = k.shift();while (f) {
      if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i;else if ("*" !== i && i !== f) {
        if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) {
          if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
            g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));break;
          }
        }if (g !== !0) if (g && a["throws"]) b = g(b);else try {
          b = g(b);
        } catch (l) {
          return { state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f };
        }
      }
    }return { state: "success", data: b };
  }r.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: tb.href, type: "GET", isLocal: Fb.test(tb.protocol), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Kb, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": r.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function ajaxSetup(a, b) {
      return b ? Ob(Ob(a, r.ajaxSettings), b) : Ob(r.ajaxSettings, a);
    }, ajaxPrefilter: Mb(Ib), ajaxTransport: Mb(Jb), ajax: function ajax(b, c) {
      "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && (c = b, b = void 0), c = c || {};var e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o = r.ajaxSetup({}, c),
          p = o.context || o,
          q = o.context && (p.nodeType || p.jquery) ? r(p) : r.event,
          s = r.Deferred(),
          t = r.Callbacks("once memory"),
          u = o.statusCode || {},
          v = {},
          w = {},
          x = "canceled",
          y = { readyState: 0, getResponseHeader: function getResponseHeader(a) {
          var b;if (k) {
            if (!h) {
              h = {};while (b = Eb.exec(g)) {
                h[b[1].toLowerCase()] = b[2];
              }
            }b = h[a.toLowerCase()];
          }return null == b ? null : b;
        }, getAllResponseHeaders: function getAllResponseHeaders() {
          return k ? g : null;
        }, setRequestHeader: function setRequestHeader(a, b) {
          return null == k && (a = w[a.toLowerCase()] = w[a.toLowerCase()] || a, v[a] = b), this;
        }, overrideMimeType: function overrideMimeType(a) {
          return null == k && (o.mimeType = a), this;
        }, statusCode: function statusCode(a) {
          var b;if (a) if (k) y.always(a[y.status]);else for (b in a) {
            u[b] = [u[b], a[b]];
          }return this;
        }, abort: function abort(a) {
          var b = a || x;return e && e.abort(b), A(0, b), this;
        } };if (s.promise(y), o.url = ((b || o.url || tb.href) + "").replace(Hb, tb.protocol + "//"), o.type = c.method || c.type || o.method || o.type, o.dataTypes = (o.dataType || "*").toLowerCase().match(L) || [""], null == o.crossDomain) {
        j = d.createElement("a");try {
          j.href = o.url, j.href = j.href, o.crossDomain = Lb.protocol + "//" + Lb.host != j.protocol + "//" + j.host;
        } catch (z) {
          o.crossDomain = !0;
        }
      }if (o.data && o.processData && "string" != typeof o.data && (o.data = r.param(o.data, o.traditional)), Nb(Ib, o, c, y), k) return y;l = r.event && o.global, l && 0 === r.active++ && r.event.trigger("ajaxStart"), o.type = o.type.toUpperCase(), o.hasContent = !Gb.test(o.type), f = o.url.replace(Cb, ""), o.hasContent ? o.data && o.processData && 0 === (o.contentType || "").indexOf("application/x-www-form-urlencoded") && (o.data = o.data.replace(Bb, "+")) : (n = o.url.slice(f.length), o.data && (f += (vb.test(f) ? "&" : "?") + o.data, delete o.data), o.cache === !1 && (f = f.replace(Db, "$1"), n = (vb.test(f) ? "&" : "?") + "_=" + ub++ + n), o.url = f + n), o.ifModified && (r.lastModified[f] && y.setRequestHeader("If-Modified-Since", r.lastModified[f]), r.etag[f] && y.setRequestHeader("If-None-Match", r.etag[f])), (o.data && o.hasContent && o.contentType !== !1 || c.contentType) && y.setRequestHeader("Content-Type", o.contentType), y.setRequestHeader("Accept", o.dataTypes[0] && o.accepts[o.dataTypes[0]] ? o.accepts[o.dataTypes[0]] + ("*" !== o.dataTypes[0] ? ", " + Kb + "; q=0.01" : "") : o.accepts["*"]);for (m in o.headers) {
        y.setRequestHeader(m, o.headers[m]);
      }if (o.beforeSend && (o.beforeSend.call(p, y, o) === !1 || k)) return y.abort();if (x = "abort", t.add(o.complete), y.done(o.success), y.fail(o.error), e = Nb(Jb, o, c, y)) {
        if (y.readyState = 1, l && q.trigger("ajaxSend", [y, o]), k) return y;o.async && o.timeout > 0 && (i = a.setTimeout(function () {
          y.abort("timeout");
        }, o.timeout));try {
          k = !1, e.send(v, A);
        } catch (z) {
          if (k) throw z;A(-1, z);
        }
      } else A(-1, "No Transport");function A(b, c, d, h) {
        var j,
            m,
            n,
            v,
            w,
            x = c;k || (k = !0, i && a.clearTimeout(i), e = void 0, g = h || "", y.readyState = b > 0 ? 4 : 0, j = b >= 200 && b < 300 || 304 === b, d && (v = Pb(o, y, d)), v = Qb(o, v, y, j), j ? (o.ifModified && (w = y.getResponseHeader("Last-Modified"), w && (r.lastModified[f] = w), w = y.getResponseHeader("etag"), w && (r.etag[f] = w)), 204 === b || "HEAD" === o.type ? x = "nocontent" : 304 === b ? x = "notmodified" : (x = v.state, m = v.data, n = v.error, j = !n)) : (n = x, !b && x || (x = "error", b < 0 && (b = 0))), y.status = b, y.statusText = (c || x) + "", j ? s.resolveWith(p, [m, x, y]) : s.rejectWith(p, [y, x, n]), y.statusCode(u), u = void 0, l && q.trigger(j ? "ajaxSuccess" : "ajaxError", [y, o, j ? m : n]), t.fireWith(p, [y, x]), l && (q.trigger("ajaxComplete", [y, o]), --r.active || r.event.trigger("ajaxStop")));
      }return y;
    }, getJSON: function getJSON(a, b, c) {
      return r.get(a, b, c, "json");
    }, getScript: function getScript(a, b) {
      return r.get(a, void 0, b, "script");
    } }), r.each(["get", "post"], function (a, b) {
    r[b] = function (a, c, d, e) {
      return r.isFunction(c) && (e = e || d, d = c, c = void 0), r.ajax(r.extend({ url: a, type: b, dataType: e, data: c, success: d }, r.isPlainObject(a) && a));
    };
  }), r._evalUrl = function (a) {
    return r.ajax({ url: a, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, "throws": !0 });
  }, r.fn.extend({ wrapAll: function wrapAll(a) {
      var b;return this[0] && (r.isFunction(a) && (a = a.call(this[0])), b = r(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
        var a = this;while (a.firstElementChild) {
          a = a.firstElementChild;
        }return a;
      }).append(this)), this;
    }, wrapInner: function wrapInner(a) {
      return r.isFunction(a) ? this.each(function (b) {
        r(this).wrapInner(a.call(this, b));
      }) : this.each(function () {
        var b = r(this),
            c = b.contents();c.length ? c.wrapAll(a) : b.append(a);
      });
    }, wrap: function wrap(a) {
      var b = r.isFunction(a);return this.each(function (c) {
        r(this).wrapAll(b ? a.call(this, c) : a);
      });
    }, unwrap: function unwrap(a) {
      return this.parent(a).not("body").each(function () {
        r(this).replaceWith(this.childNodes);
      }), this;
    } }), r.expr.pseudos.hidden = function (a) {
    return !r.expr.pseudos.visible(a);
  }, r.expr.pseudos.visible = function (a) {
    return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length);
  }, r.ajaxSettings.xhr = function () {
    try {
      return new a.XMLHttpRequest();
    } catch (b) {}
  };var Rb = { 0: 200, 1223: 204 },
      Sb = r.ajaxSettings.xhr();o.cors = !!Sb && "withCredentials" in Sb, o.ajax = Sb = !!Sb, r.ajaxTransport(function (b) {
    var _c, d;if (o.cors || Sb && !b.crossDomain) return { send: function send(e, f) {
        var g,
            h = b.xhr();if (h.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields) for (g in b.xhrFields) {
          h[g] = b.xhrFields[g];
        }b.mimeType && h.overrideMimeType && h.overrideMimeType(b.mimeType), b.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");for (g in e) {
          h.setRequestHeader(g, e[g]);
        }_c = function c(a) {
          return function () {
            _c && (_c = d = h.onload = h.onerror = h.onabort = h.onreadystatechange = null, "abort" === a ? h.abort() : "error" === a ? "number" != typeof h.status ? f(0, "error") : f(h.status, h.statusText) : f(Rb[h.status] || h.status, h.statusText, "text" !== (h.responseType || "text") || "string" != typeof h.responseText ? { binary: h.response } : { text: h.responseText }, h.getAllResponseHeaders()));
          };
        }, h.onload = _c(), d = h.onerror = _c("error"), void 0 !== h.onabort ? h.onabort = d : h.onreadystatechange = function () {
          4 === h.readyState && a.setTimeout(function () {
            _c && d();
          });
        }, _c = _c("abort");try {
          h.send(b.hasContent && b.data || null);
        } catch (i) {
          if (_c) throw i;
        }
      }, abort: function abort() {
        _c && _c();
      } };
  }), r.ajaxPrefilter(function (a) {
    a.crossDomain && (a.contents.script = !1);
  }), r.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /\b(?:java|ecma)script\b/ }, converters: { "text script": function textScript(a) {
        return r.globalEval(a), a;
      } } }), r.ajaxPrefilter("script", function (a) {
    void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET");
  }), r.ajaxTransport("script", function (a) {
    if (a.crossDomain) {
      var b, _c2;return { send: function send(e, f) {
          b = r("<script>").prop({ charset: a.scriptCharset, src: a.url }).on("load error", _c2 = function c(a) {
            b.remove(), _c2 = null, a && f("error" === a.type ? 404 : 200, a.type);
          }), d.head.appendChild(b[0]);
        }, abort: function abort() {
          _c2 && _c2();
        } };
    }
  });var Tb = [],
      Ub = /(=)\?(?=&|$)|\?\?/;r.ajaxSetup({ jsonp: "callback", jsonpCallback: function jsonpCallback() {
      var a = Tb.pop() || r.expando + "_" + ub++;return this[a] = !0, a;
    } }), r.ajaxPrefilter("json jsonp", function (b, c, d) {
    var e,
        f,
        g,
        h = b.jsonp !== !1 && (Ub.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && Ub.test(b.data) && "data");if (h || "jsonp" === b.dataTypes[0]) return e = b.jsonpCallback = r.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Ub, "$1" + e) : b.jsonp !== !1 && (b.url += (vb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
      return g || r.error(e + " was not called"), g[0];
    }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
      g = arguments;
    }, d.always(function () {
      void 0 === f ? r(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Tb.push(e)), g && r.isFunction(f) && f(g[0]), g = f = void 0;
    }), "script";
  }), o.createHTMLDocument = function () {
    var a = d.implementation.createHTMLDocument("").body;return a.innerHTML = "<form></form><form></form>", 2 === a.childNodes.length;
  }(), r.parseHTML = function (a, b, c) {
    if ("string" != typeof a) return [];"boolean" == typeof b && (c = b, b = !1);var e, f, g;return b || (o.createHTMLDocument ? (b = d.implementation.createHTMLDocument(""), e = b.createElement("base"), e.href = d.location.href, b.head.appendChild(e)) : b = d), f = C.exec(a), g = !c && [], f ? [b.createElement(f[1])] : (f = qa([a], b, g), g && g.length && r(g).remove(), r.merge([], f.childNodes));
  }, r.fn.load = function (a, b, c) {
    var d,
        e,
        f,
        g = this,
        h = a.indexOf(" ");return h > -1 && (d = pb(a.slice(h)), a = a.slice(0, h)), r.isFunction(b) ? (c = b, b = void 0) : b && "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && (e = "POST"), g.length > 0 && r.ajax({ url: a, type: e || "GET", dataType: "html", data: b }).done(function (a) {
      f = arguments, g.html(d ? r("<div>").append(r.parseHTML(a)).find(d) : a);
    }).always(c && function (a, b) {
      g.each(function () {
        c.apply(this, f || [a.responseText, b, a]);
      });
    }), this;
  }, r.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
    r.fn[b] = function (a) {
      return this.on(b, a);
    };
  }), r.expr.pseudos.animated = function (a) {
    return r.grep(r.timers, function (b) {
      return a === b.elem;
    }).length;
  }, r.offset = { setOffset: function setOffset(a, b, c) {
      var d,
          e,
          f,
          g,
          h,
          i,
          j,
          k = r.css(a, "position"),
          l = r(a),
          m = {};"static" === k && (a.style.position = "relative"), h = l.offset(), f = r.css(a, "top"), i = r.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), r.isFunction(b) && (b = b.call(a, c, r.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m);
    } }, r.fn.extend({ offset: function offset(a) {
      if (arguments.length) return void 0 === a ? this : this.each(function (b) {
        r.offset.setOffset(this, a, b);
      });var b,
          c,
          d,
          e,
          f = this[0];if (f) return f.getClientRects().length ? (d = f.getBoundingClientRect(), b = f.ownerDocument, c = b.documentElement, e = b.defaultView, { top: d.top + e.pageYOffset - c.clientTop, left: d.left + e.pageXOffset - c.clientLeft }) : { top: 0, left: 0 };
    }, position: function position() {
      if (this[0]) {
        var a,
            b,
            c = this[0],
            d = { top: 0, left: 0 };return "fixed" === r.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), B(a[0], "html") || (d = a.offset()), d = { top: d.top + r.css(a[0], "borderTopWidth", !0), left: d.left + r.css(a[0], "borderLeftWidth", !0) }), { top: b.top - d.top - r.css(c, "marginTop", !0), left: b.left - d.left - r.css(c, "marginLeft", !0) };
      }
    }, offsetParent: function offsetParent() {
      return this.map(function () {
        var a = this.offsetParent;while (a && "static" === r.css(a, "position")) {
          a = a.offsetParent;
        }return a || ra;
      });
    } }), r.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (a, b) {
    var c = "pageYOffset" === b;r.fn[a] = function (d) {
      return T(this, function (a, d, e) {
        var f;return r.isWindow(a) ? f = a : 9 === a.nodeType && (f = a.defaultView), void 0 === e ? f ? f[b] : a[d] : void (f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : a[d] = e);
      }, a, d, arguments.length);
    };
  }), r.each(["top", "left"], function (a, b) {
    r.cssHooks[b] = Pa(o.pixelPosition, function (a, c) {
      if (c) return c = Oa(a, b), Ma.test(c) ? r(a).position()[b] + "px" : c;
    });
  }), r.each({ Height: "height", Width: "width" }, function (a, b) {
    r.each({ padding: "inner" + a, content: b, "": "outer" + a }, function (c, d) {
      r.fn[d] = function (e, f) {
        var g = arguments.length && (c || "boolean" != typeof e),
            h = c || (e === !0 || f === !0 ? "margin" : "border");return T(this, function (b, c, e) {
          var f;return r.isWindow(b) ? 0 === d.indexOf("outer") ? b["inner" + a] : b.document.documentElement["client" + a] : 9 === b.nodeType ? (f = b.documentElement, Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" + a], f["offset" + a], f["client" + a])) : void 0 === e ? r.css(b, c, h) : r.style(b, c, e, h);
        }, b, g ? e : void 0, g);
      };
    });
  }), r.fn.extend({ bind: function bind(a, b, c) {
      return this.on(a, null, b, c);
    }, unbind: function unbind(a, b) {
      return this.off(a, null, b);
    }, delegate: function delegate(a, b, c, d) {
      return this.on(b, a, c, d);
    }, undelegate: function undelegate(a, b, c) {
      return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
    } }), r.holdReady = function (a) {
    a ? r.readyWait++ : r.ready(!0);
  }, r.isArray = Array.isArray, r.parseJSON = JSON.parse, r.nodeName = B, "function" == typeof define && define.amd && define("jquery", [], function () {
    return r;
  });var Vb = a.jQuery,
      Wb = a.$;return r.noConflict = function (b) {
    return a.$ === r && (a.$ = Wb), b && a.jQuery === r && (a.jQuery = Vb), r;
  }, b || (a.jQuery = a.$ = r), r;
});

},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGRlci5qcyIsInNyYy91dGlsL2pzb3VwLmpzIiwic3JjL3V0aWwvdW51c2VkVGFncy5qcyIsInNyYy91dGlsL3N1Ym1pdGJ1dHRvbi5qcyIsInNyYy90ZW1wbGF0ZXMvdGFibGUuanMiLCJzcmMvdGVtcGxhdGVzL3N1Ym1pdGZvcm0uanMiLCJzcmMvdGVtcGxhdGVzL2F1dG9zZWxlY3RpbnB1dC5qcyIsInNyYy91dGlsL3NlbGVjdG9ycy5qcyIsInNyYy9jb21wb25lbnRzL0BvZWUvdGFibGUuanMiLCJzcmMvdXRpbC9odG1sR2VuZXJhdG9yLmpzIiwic3JjL3V0aWwvZnVsbFNjcmVlbi5qcyIsInNyYy91dGlsL2Rvd25sb2FkLmpzIiwic3JjL3V0aWwvZG9tLmpzIiwic3JjL3V0aWwvY2FsZW5kYXIuanMiLCJzcmMvaW5wdXRzL2lucHV0cy5qcyIsInNyYy9pbnB1dHMvVmFsdWVUZXh0SW5wdXQuanMiLCJzcmMvaW5wdXRzL1RvZ2dsZUlucHV0LmpzIiwic3JjL2lucHV0cy9UZXh0VmFsdWVJbnB1dC5qcyIsInNyYy9pbnB1dHMvU2VsZWN0SW5wdXQuanMiLCJzcmMvaW5wdXRzL1NlY3Rpb25JbnB1dC5qcyIsInNyYy9pbnB1dHMvUmFuZ2VJbnB1dC5qcyIsInNyYy9pbnB1dHMvUmFkaW9CdXR0b25JbnB1dC5qcyIsInNyYy9pbnB1dHMvUmFkaW9JbnB1dC5qcyIsInNyYy9pbnB1dHMvUHJvZHVjdHNJbnB1dC5qcyIsInNyYy9pbnB1dHMvTnVtYmVySW5wdXQuanMiLCJzcmMvaW5wdXRzL0xpc3RJbnB1dC5qcyIsInNyYy9pbnB1dHMvTGlua0lucHV0LmpzIiwic3JjL2lucHV0cy9HcmlkTGF5b3V0SW5wdXQuanMiLCJzcmMvaW5wdXRzL0dyaWRJbnB1dC5qcyIsInNyYy9pbnB1dHMvRmlsZVVwbG9hZElucHV0LmpzIiwic3JjL2lucHV0cy9UZXh0SW5wdXQuanMiLCJzcmMvaW5wdXRzL0Nzc1VuaXRJbnB1dC5qcyIsInNyYy9pbnB1dHMvQ29sb3JJbnB1dC5qcyIsInNyYy9pbnB1dHMvQ2hlY2tib3hJbnB1dC5qcyIsInNyYy9pbnB1dHMvQnV0dG9uSW5wdXQuanMiLCJzcmMvaW5wdXRzL0lucHV0LmpzIiwic3JjL2NvbXBvbmVudHMvY29tbW9uLmpzIiwianMvanF1ZXJ5Lm1pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNBQTs7QUFDQTs7QUFJQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxDQUFDLFlBQVk7QUFDWixLQUFJLFFBQVEsRUFBWjs7QUFFQSxNQUFLLElBQUwsR0FBWSxTQUFTLElBQVQsQ0FBYyxHQUFkLEVBQW1CLElBQW5CLEVBQXlCO0FBQ3BDO0FBQ0E7QUFDQSxNQUFJLEtBQUssa0JBQWtCLElBQWxCLENBQXVCLEdBQXZCLElBQ1IsTUFBTSxHQUFOLElBQWEsTUFBTSxHQUFOLEtBQ2IsS0FBSyxTQUFTLGNBQVQsQ0FBd0IsR0FBeEIsRUFBNkIsU0FBbEMsQ0FGUTs7QUFJUjtBQUNBO0FBQ0EsTUFBSSxRQUFKLENBQWEsS0FBYixFQUNDOztBQUVBO0FBQ0Esc0JBSEE7O0FBS0E7QUFDQSxNQUNFLE9BREYsQ0FDVSxXQURWLEVBQ3VCLEdBRHZCLEVBRUUsS0FGRixDQUVRLElBRlIsRUFFYyxJQUZkLENBRW1CLElBRm5CLEVBR0UsT0FIRixDQUdVLGtCQUhWLEVBRzhCLE1BSDlCLEVBSUUsT0FKRixDQUlVLGFBSlYsRUFJeUIsUUFKekIsRUFLRSxLQUxGLENBS1EsSUFMUixFQUtjLElBTGQsQ0FLbUIsS0FMbkIsRUFNRSxLQU5GLENBTVEsSUFOUixFQU1jLElBTmQsQ0FNbUIsVUFObkIsRUFPRSxLQVBGLENBT1EsSUFQUixFQU9jLElBUGQsQ0FPbUIsS0FQbkIsQ0FOQSxHQWNFLHdCQWZILENBTkQ7QUFzQkE7QUFDQSxTQUFPLE9BQU8sR0FBRyxJQUFILENBQVAsR0FBa0Is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TCxDQUFTLENBQVQsRUFBVyxJQUFYLENBQXJCLEdBQXNDLEtBQUssR0FBTCxDQUFTLENBQVQsRUFBVyxLQUFHLElBQWQsRUFBbUIsQ0FBbkIsQ0FBN0M7QUFBbUUsS0FBcFAsRUFBWixDQUE1ekksRUFBK2pKLEVBQUUsU0FBRixHQUFZLFVBQVMsQ0FBVCxFQUFXO0FBQUMsUUFBRSxFQUFFLFNBQUYsRUFBRixHQUFnQixFQUFFLEtBQUYsQ0FBUSxDQUFDLENBQVQsQ0FBaEI7QUFBNEIsR0FBbm5KLEVBQW9uSixFQUFFLE9BQUYsR0FBVSxNQUFNLE9BQXBvSixFQUE0b0osRUFBRSxTQUFGLEdBQVksS0FBSyxLQUE3cEosRUFBbXFKLEVBQUUsUUFBRixHQUFXLENBQTlxSixFQUFnckosY0FBWSxPQUFPLE1BQW5CLElBQTJCLE9BQU8sR0FBbEMsSUFBdUMsT0FBTyxRQUFQLEVBQWdCLEVBQWhCLEVBQW1CLFlBQVU7QUFBQyxXQUFPLENBQVA7QUFBUyxHQUF2QyxDQUF2dEosQ0FBZ3dKLElBQUksS0FBRyxFQUFFLE1BQVQ7QUFBQSxNQUFnQixLQUFHLEVBQUUsQ0FBckIsQ0FBdUIsT0FBTyxFQUFFLFVBQUYsR0FBYSxVQUFTLENBQVQsRUFBVztBQUFDLFdBQU8sRUFBRSxDQUFGLEtBQU0sQ0FBTixLQUFVLEVBQUUsQ0FBRixHQUFJLEVBQWQsR0FBa0IsS0FBRyxFQUFFLE1BQUYsS0FBVyxDQUFkLEtBQWtCLEVBQUUsTUFBRixHQUFTLEVBQTNCLENBQWxCLEVBQWlELENBQXhEO0FBQTBELEdBQW5GLEVBQW9GLE1BQUksRUFBRSxNQUFGLEdBQVMsRUFBRSxDQUFGLEdBQUksQ0FBakIsQ0FBcEYsRUFBd0csQ0FBL0c7QUFBaUgsQ0FGNzhyQixDQUFEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgU2VjdGlvbklucHV0IH0gZnJvbSAnLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHtcclxuXHRyZW1vdmVVbnVzZWRUYWdzLCBlbXB0eUNoaWxkcmVuLCBnZW5lcmF0ZVRhYmxlU2NyaXB0LCBnZW5lcmF0ZUNhbGVuZGFyT25jbGlja0F0dHIsXHJcblx0Z2VuZXJhdGVTZWxlY3RPcHRpb25zU2NyaXB0LCBnZW5lcmF0ZVN1Ym1pdEZvcm1TY3JpcHQsIGdlbmVyYXRlQnV0dG9uT25jbGlja0F0dHJcclxufSBmcm9tICcuL3V0aWwvanNvdXAnO1xyXG5pbXBvcnQgeyBkb3dubG9hZEFzVGV4dEZpbGUgfSBmcm9tICcuL3V0aWwvZG93bmxvYWQnO1xyXG5pbXBvcnQgeyBsYXVuY2hGdWxsU2NyZWVuIH0gZnJvbSAnLi91dGlsL2Z1bGxTY3JlZW4nO1xyXG5pbXBvcnQgeyBkYXRhQ29tcG9uZW50SWQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29tbW9uJ1xyXG5pbXBvcnQgaHRtbEdlbmVyYXRvciBmcm9tICcuL3V0aWwvaHRtbEdlbmVyYXRvcic7XHJcbmltcG9ydCB7IHJlcGxhY2VPdGhlclNob3dpbmdDYWxlbmRhcklucHV0cyB9IGZyb20gJy4vdXRpbC9jYWxlbmRhcic7XHJcbmltcG9ydCB7IGdldFN0eWxlIH0gZnJvbSAnLi91dGlsL2RvbSc7XHJcbmltcG9ydCB7IGdldFBhcmVudE9yU2VsZiB9IGZyb20gJy4vdXRpbC9zZWxlY3RvcnMnO1xyXG5pbXBvcnQgJCBmcm9tICcuLi9qcy9qcXVlcnkubWluJztcclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGNhY2hlID0ge307XHJcblxyXG5cdHRoaXMudG1wbCA9IGZ1bmN0aW9uIHRtcGwoc3RyLCBkYXRhKSB7XHJcblx0XHQvLyBGaWd1cmUgb3V0IGlmIHdlJ3JlIGdldHRpbmcgYSB0ZW1wbGF0ZSwgb3IgaWYgd2UgbmVlZCB0b1xyXG5cdFx0Ly8gbG9hZCB0aGUgdGVtcGxhdGUgLSBhbmQgYmUgc3VyZSB0byBjYWNoZSB0aGUgcmVzdWx0LlxyXG5cdFx0dmFyIGZuID0gL15bLWEtekEtWjAtOV0rJC8udGVzdChzdHIpID9cclxuXHRcdFx0Y2FjaGVbc3RyXSA9IGNhY2hlW3N0cl0gfHxcclxuXHRcdFx0dG1wbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzdHIpLmlubmVySFRNTCkgOlxyXG5cclxuXHRcdFx0Ly8gR2VuZXJhdGUgYSByZXVzYWJsZSBmdW5jdGlvbiB0aGF0IHdpbGwgc2VydmUgYXMgYSB0ZW1wbGF0ZVxyXG5cdFx0XHQvLyBnZW5lcmF0b3IgKGFuZCB3aGljaCB3aWxsIGJlIGNhY2hlZCkuXHJcblx0XHRcdG5ldyBGdW5jdGlvbihcIm9ialwiLFxyXG5cdFx0XHRcdFwidmFyIHA9W10scHJpbnQ9ZnVuY3Rpb24oKXtwLnB1c2guYXBwbHkocCxhcmd1bWVudHMpO307XCIgK1xyXG5cclxuXHRcdFx0XHQvLyBJbnRyb2R1Y2UgdGhlIGRhdGEgYXMgbG9jYWwgdmFyaWFibGVzIHVzaW5nIHdpdGgoKXt9XHJcblx0XHRcdFx0XCJ3aXRoKG9iail7cC5wdXNoKCdcIiArXHJcblxyXG5cdFx0XHRcdC8vIENvbnZlcnQgdGhlIHRlbXBsYXRlIGludG8gcHVyZSBKYXZhU2NyaXB0XHJcblx0XHRcdFx0c3RyXHJcblx0XHRcdFx0XHQucmVwbGFjZSgvW1xcclxcdFxcbl0vZywgXCIgXCIpXHJcblx0XHRcdFx0XHQuc3BsaXQoXCJ7JVwiKS5qb2luKFwiXFx0XCIpXHJcblx0XHRcdFx0XHQucmVwbGFjZSgvKChefCV9KVteXFx0XSopJy9nLCBcIiQxXFxyXCIpXHJcblx0XHRcdFx0XHQucmVwbGFjZSgvXFx0PSguKj8pJX0vZywgXCInLCQxLCdcIilcclxuXHRcdFx0XHRcdC5zcGxpdChcIlxcdFwiKS5qb2luKFwiJyk7XCIpXHJcblx0XHRcdFx0XHQuc3BsaXQoXCIlfVwiKS5qb2luKFwicC5wdXNoKCdcIilcclxuXHRcdFx0XHRcdC5zcGxpdChcIlxcclwiKS5qb2luKFwiXFxcXCdcIilcclxuXHRcdFx0XHQrIFwiJyk7fXJldHVybiBwLmpvaW4oJycpO1wiKTtcclxuXHRcdC8vIFByb3ZpZGUgc29tZSBiYXNpYyBjdXJyeWluZyB0byB0aGUgdXNlclxyXG5cdFx0cmV0dXJuIGRhdGEgPyBmbihkYXRhKSA6IGZuO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG52YXIgZGVsYXkgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB0aW1lciA9IDA7XHJcblx0cmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjaywgbXMpIHtcclxuXHRcdGNsZWFyVGltZW91dCh0aW1lcik7XHJcblx0XHR0aW1lciA9IHNldFRpbWVvdXQoY2FsbGJhY2ssIG1zKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuaWYgKFZ2dmViID09PSB1bmRlZmluZWQpIHZhciBWdnZlYiA9IHt9O1xyXG5cclxuVnZ2ZWIuZGVmYXVsdENvbXBvbmVudCA9IFwiX2Jhc2VcIjtcclxuVnZ2ZWIucHJlc2VydmVQcm9wZXJ0eVNlY3Rpb25zID0gdHJ1ZTtcclxuXHJcblZ2dmViLmJhc2VVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0ID8gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmMucmVwbGFjZSgvW15cXC9dKj9cXC5qcyQvLCAnJykgOiAnJztcclxuXHJcblZ2dmViLkNvbXBvbmVudHNHcm91cCA9IHt9O1xyXG5cclxuVnZ2ZWIuQ29tcG9uZW50cyA9IHtcclxuXHRfY29tcG9uZW50czoge30sXHJcblxyXG5cdF9ub2Rlc0xvb2t1cDoge30sXHJcblxyXG5cdF9hdHRyaWJ1dGVzTG9va3VwOiB7fSxcclxuXHJcblx0X2NsYXNzZXNMb29rdXA6IHt9LFxyXG5cclxuXHRfY2xhc3Nlc1JlZ2V4TG9va3VwOiB7fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKHVybCkge1xyXG5cdH0sXHJcblxyXG5cdGdldDogZnVuY3Rpb24gKHR5cGUpIHtcclxuXHRcdHJldHVybiB0aGlzLl9jb21wb25lbnRzW3R5cGVdO1xyXG5cdH0sXHJcblxyXG5cdGFkZDogZnVuY3Rpb24gKHR5cGUsIGRhdGEpIHtcclxuXHRcdGRhdGEudHlwZSA9IHR5cGU7XHJcblxyXG5cdFx0dGhpcy5fY29tcG9uZW50c1t0eXBlXSA9IGRhdGE7XHJcblxyXG5cdFx0aWYgKGRhdGEubm9kZXMpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBkYXRhLm5vZGVzKSB7XHJcblx0XHRcdFx0dGhpcy5fbm9kZXNMb29rdXBbZGF0YS5ub2Rlc1tpXV0gPSBkYXRhO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGRhdGEuYXR0cmlidXRlcykge1xyXG5cdFx0XHRpZiAoZGF0YS5hdHRyaWJ1dGVzLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xyXG5cdFx0XHRcdGZvciAodmFyIGkgaW4gZGF0YS5hdHRyaWJ1dGVzKSB7XHJcblx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2RhdGEuYXR0cmlidXRlc1tpXV0gPSBkYXRhO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRmb3IgKHZhciBpIGluIGRhdGEuYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2ldID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2ldID0ge307XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGRhdGEuYXR0cmlidXRlc1tpXS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcclxuXHRcdFx0XHRcdFx0Ly8g5pSv5oyBdGV4dGlucHV05Lit5LiN5ZCM55qE6L6T5YWl57G75Z6LYXR0cmlidXRlczogeyBcInR5cGVcIjogWyd0ZXh0JywgJ3Bhc3N3b3JkJ10gfSxcclxuXHRcdFx0XHRcdFx0ZGF0YS5hdHRyaWJ1dGVzW2ldLmZvckVhY2godmFsdWUgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuX2F0dHJpYnV0ZXNMb29rdXBbaV1bdmFsdWVdID0gZGF0YTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2ldW2RhdGEuYXR0cmlidXRlc1tpXV0gPSBkYXRhO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkYXRhLmNsYXNzZXMpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBkYXRhLmNsYXNzZXMpIHtcclxuXHRcdFx0XHR0aGlzLl9jbGFzc2VzTG9va3VwW2RhdGEuY2xhc3Nlc1tpXV0gPSBkYXRhO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGRhdGEuY2xhc3Nlc1JlZ2V4KSB7XHJcblx0XHRcdGZvciAodmFyIGkgaW4gZGF0YS5jbGFzc2VzUmVnZXgpIHtcclxuXHRcdFx0XHR0aGlzLl9jbGFzc2VzUmVnZXhMb29rdXBbZGF0YS5jbGFzc2VzUmVnZXhbaV1dID0gZGF0YTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGV4dGVuZDogZnVuY3Rpb24gKGluaGVyaXRUeXBlLCB0eXBlLCBkYXRhKSB7XHJcblxyXG5cdFx0bmV3RGF0YSA9IGRhdGE7XHJcblxyXG5cdFx0aWYgKGluaGVyaXREYXRhID0gdGhpcy5fY29tcG9uZW50c1tpbmhlcml0VHlwZV0pIHtcclxuXHRcdFx0bmV3RGF0YSA9ICQuZXh0ZW5kKHRydWUsIHt9LCBpbmhlcml0RGF0YSwgZGF0YSk7XHJcblx0XHRcdG5ld0RhdGEucHJvcGVydGllcyA9ICQubWVyZ2UoJC5tZXJnZShbXSwgaW5oZXJpdERhdGEucHJvcGVydGllcyA/IGluaGVyaXREYXRhLnByb3BlcnRpZXMgOiBbXSksIGRhdGEucHJvcGVydGllcyA/IGRhdGEucHJvcGVydGllcyA6IFtdKTtcclxuXHRcdH1cclxuXHJcblx0XHQvL3NvcnQgYnkgb3JkZXJcclxuXHRcdG5ld0RhdGEucHJvcGVydGllcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgYS5zb3J0ID09PSBcInVuZGVmaW5lZFwiKSBhLnNvcnQgPSAwO1xyXG5cdFx0XHRpZiAodHlwZW9mIGIuc29ydCA9PT0gXCJ1bmRlZmluZWRcIikgYi5zb3J0ID0gMDtcclxuXHJcblx0XHRcdGlmIChhLnNvcnQgPCBiLnNvcnQpXHJcblx0XHRcdFx0cmV0dXJuIC0xO1xyXG5cdFx0XHRpZiAoYS5zb3J0ID4gYi5zb3J0KVxyXG5cdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHRyZXR1cm4gMDtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHR0aGlzLmFkZCh0eXBlLCBuZXdEYXRhKTtcclxuXHR9LFxyXG5cclxuXHJcblx0bWF0Y2hOb2RlOiBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0aWYgKCQobm9kZSkuYXR0cihkYXRhQ29tcG9uZW50SWQpICYmIHRoaXMuX2NvbXBvbmVudHNbJChub2RlKS5hdHRyKGRhdGFDb21wb25lbnRJZCldKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9jb21wb25lbnRzWyQobm9kZSkuYXR0cihkYXRhQ29tcG9uZW50SWQpXTtcclxuXHRcdH0gZWxzZSBpZiAoJChub2RlKS5hdHRyKCd0eXBlJykgPT0gJ3JhZGlvJyB8fCAkKG5vZGUpLmF0dHIoJ3R5cGUnKSA9PSAnY2hlY2tib3gnKSB7XHJcblx0XHRcdGNvbnN0ICRwYXJlbnQgPSAkKG5vZGUpLnBhcmVudCgpO1xyXG5cdFx0XHRpZiAoJHBhcmVudC5hdHRyKGRhdGFDb21wb25lbnRJZCkgJiYgdGhpcy5fY29tcG9uZW50c1skcGFyZW50LmF0dHIoZGF0YUNvbXBvbmVudElkKV0pIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fY29tcG9uZW50c1skcGFyZW50LmF0dHIoZGF0YUNvbXBvbmVudElkKV1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChub2RlLmF0dHJpYnV0ZXMubGVuZ3RoKSB7XHJcblx0XHRcdC8vc2VhcmNoIGZvciBhdHRyaWJ1dGVzXHJcblx0XHRcdGZvciAodmFyIGkgaW4gbm9kZS5hdHRyaWJ1dGVzKSB7XHJcblx0XHRcdFx0YXR0ciA9IG5vZGUuYXR0cmlidXRlc1tpXS5uYW1lO1xyXG5cdFx0XHRcdHZhbHVlID0gbm9kZS5hdHRyaWJ1dGVzW2ldLnZhbHVlO1xyXG5cclxuXHRcdFx0XHRpZiAoYXR0ciBpbiB0aGlzLl9hdHRyaWJ1dGVzTG9va3VwKSB7XHJcblx0XHRcdFx0XHRjb21wb25lbnQgPSB0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2F0dHJdO1xyXG5cclxuXHRcdFx0XHRcdC8vY3VycmVudGx5IHdlIGNoZWNrIHRoYXQgaXMgbm90IGEgY29tcG9uZW50IGJ5IGxvb2tpbmcgYXQgbmFtZSBhdHRyaWJ1dGVcclxuXHRcdFx0XHRcdC8vaWYgd2UgaGF2ZSBhIGNvbGxlY3Rpb24gb2Ygb2JqZWN0cyBpdCBtZWFucyB0aGF0IGF0dHJpYnV0ZSB2YWx1ZSBtdXN0IGJlIGNoZWNrZWRcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgY29tcG9uZW50W1wibmFtZVwiXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdFx0XHRpZiAodmFsdWUgaW4gY29tcG9uZW50KSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGNvbXBvbmVudFt2YWx1ZV07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gY29tcG9uZW50O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBub2RlLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRhdHRyID0gbm9kZS5hdHRyaWJ1dGVzW2ldLm5hbWU7XHJcblx0XHRcdFx0dmFsdWUgPSBub2RlLmF0dHJpYnV0ZXNbaV0udmFsdWU7XHJcblxyXG5cdFx0XHRcdC8vY2hlY2sgZm9yIG5vZGUgY2xhc3Nlc1xyXG5cdFx0XHRcdGlmIChhdHRyID09IFwiY2xhc3NcIikge1xyXG5cdFx0XHRcdFx0Y2xhc3NlcyA9IHZhbHVlLnNwbGl0KFwiIFwiKTtcclxuXHJcblx0XHRcdFx0XHRmb3IgKGogaW4gY2xhc3Nlcykge1xyXG5cdFx0XHRcdFx0XHRpZiAoY2xhc3Nlc1tqXSBpbiB0aGlzLl9jbGFzc2VzTG9va3VwKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl9jbGFzc2VzTG9va3VwW2NsYXNzZXNbal1dO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGZvciAocmVnZXggaW4gdGhpcy5fY2xhc3Nlc1JlZ2V4TG9va3VwKSB7XHJcblx0XHRcdFx0XHRcdHJlZ2V4T2JqID0gbmV3IFJlZ0V4cChyZWdleCk7XHJcblx0XHRcdFx0XHRcdGlmIChyZWdleE9iai5leGVjKHZhbHVlKSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl9jbGFzc2VzUmVnZXhMb29rdXBbcmVnZXhdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGFnTmFtZSA9IG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0aWYgKHRhZ05hbWUgaW4gdGhpcy5fbm9kZXNMb29rdXApIHJldHVybiB0aGlzLl9ub2Rlc0xvb2t1cFt0YWdOYW1lXTtcclxuXHJcblx0XHQvL3JldHVybiBmYWxzZTtcclxuXHRcdHJldHVybiB0aGlzLmdldChWdnZlYi5kZWZhdWx0Q29tcG9uZW50KTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uICh0eXBlKSB7XHJcblxyXG5cdFx0Y29tcG9uZW50ID0gdGhpcy5fY29tcG9uZW50c1t0eXBlXTtcclxuXHJcblx0XHRyaWdodFBhbmVsID0galF1ZXJ5KFwiI3JpZ2h0LXBhbmVsICNjb21wb25lbnQtcHJvcGVydGllc1wiKTtcclxuXHRcdHNlY3Rpb24gPSByaWdodFBhbmVsLmZpbmQoJy5zZWN0aW9uW2RhdGEtc2VjdGlvbj1cImRlZmF1bHRcIl0nKTtcclxuXHJcblx0XHRpZiAoIShWdnZlYi5wcmVzZXJ2ZVByb3BlcnR5U2VjdGlvbnMgJiYgc2VjdGlvbi5sZW5ndGgpKSB7XHJcblx0XHRcdHJpZ2h0UGFuZWwuaHRtbCgnJykuYXBwZW5kKHRtcGwoXCJ2dnZlYi1pbnB1dC1zZWN0aW9uaW5wdXRcIiwgeyBrZXk6IFwiZGVmYXVsdFwiLCBoZWFkZXI6IGNvbXBvbmVudC5uYW1lIH0pKTtcclxuXHRcdFx0c2VjdGlvbiA9IHJpZ2h0UGFuZWwuZmluZChcIi5zZWN0aW9uXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJpZ2h0UGFuZWwuZmluZCgnW2RhdGEtaGVhZGVyPVwiZGVmYXVsdFwiXSBzcGFuJykuaHRtbChjb21wb25lbnQubmFtZSk7XHJcblx0XHRzZWN0aW9uLmh0bWwoXCJcIilcclxuXHJcblx0XHRpZiAoY29tcG9uZW50LmJlZm9yZUluaXQpIGNvbXBvbmVudC5iZWZvcmVJbml0KFZ2dmViLkJ1aWxkZXIuc2VsZWN0ZWRFbC5nZXQoMCkpO1xyXG5cclxuXHRcdGZuID0gZnVuY3Rpb24gKGNvbXBvbmVudCwgcHJvcGVydHkpIHtcclxuXHRcdFx0cmV0dXJuIHByb3BlcnR5LmlucHV0Lm9uKCdwcm9wZXJ0eUNoYW5nZScsIGZ1bmN0aW9uIChldmVudCwgdmFsdWUsIGlucHV0KSB7XHJcblx0XHRcdFx0ZWxlbWVudCA9IFZ2dmViLkJ1aWxkZXIuc2VsZWN0ZWRFbDtcclxuXHRcdFx0XHRpZiAocHJvcGVydHkuY2hpbGQpIGVsZW1lbnQgPSBlbGVtZW50LmZpbmQocHJvcGVydHkuY2hpbGQpO1xyXG5cdFx0XHRcdGlmIChwcm9wZXJ0eS5wYXJlbnQpIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudChwcm9wZXJ0eS5wYXJlbnQpO1xyXG5cclxuXHRcdFx0XHRpZiAocHJvcGVydHkub25DaGFuZ2UpIHtcclxuXHRcdFx0XHRcdGVsZW1lbnQgPSBwcm9wZXJ0eS5vbkNoYW5nZShlbGVtZW50LCB2YWx1ZSwgaW5wdXQsIGNvbXBvbmVudCk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eS5odG1sQXR0cikge1xyXG5cdFx0XHRcdFx0b2xkVmFsdWUgPSBlbGVtZW50LmF0dHIocHJvcGVydHkuaHRtbEF0dHIpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChwcm9wZXJ0eS5odG1sQXR0ciA9PSAndGV4dCcpIHtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudC50ZXh0KHZhbHVlKTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHkuaHRtbEF0dHIgPT0gXCJjbGFzc1wiICYmIHByb3BlcnR5LnZhbGlkVmFsdWVzKSB7XHJcblx0XHRcdFx0XHRcdGVsZW1lbnQucmVtb3ZlQ2xhc3MocHJvcGVydHkudmFsaWRWYWx1ZXMuam9pbihcIiBcIikpO1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5hZGRDbGFzcyh2YWx1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChwcm9wZXJ0eS5odG1sQXR0ciA9PSBcInN0eWxlXCIpIHtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQuY3NzKHByb3BlcnR5LmtleSwgdmFsdWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAocHJvcGVydHkubm9WYWx1ZUF0dHIpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHZhbHVlKSB7XHJcblx0XHRcdFx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQuYXR0cihwcm9wZXJ0eS5odG1sQXR0ciwgJycpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LnJlbW92ZUF0dHIocHJvcGVydHkuaHRtbEF0dHIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5hdHRyKHByb3BlcnR5Lmh0bWxBdHRyLCB2YWx1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0XHRcdHR5cGU6ICdhdHRyaWJ1dGVzJyxcclxuXHRcdFx0XHRcdFx0dGFyZ2V0OiBlbGVtZW50LmdldCgwKSxcclxuXHRcdFx0XHRcdFx0YXR0cmlidXRlTmFtZTogcHJvcGVydHkuaHRtbEF0dHIsXHJcblx0XHRcdFx0XHRcdG9sZFZhbHVlOiBvbGRWYWx1ZSxcclxuXHRcdFx0XHRcdFx0bmV3VmFsdWU6IGVsZW1lbnQuYXR0cihwcm9wZXJ0eS5odG1sQXR0cilcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGNvbXBvbmVudC5vbkNoYW5nZSkge1xyXG5cdFx0XHRcdFx0ZWxlbWVudCA9IGNvbXBvbmVudC5vbkNoYW5nZShlbGVtZW50LCBwcm9wZXJ0eSwgdmFsdWUsIGlucHV0KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICghcHJvcGVydHkuY2hpbGQgJiYgIXByb3BlcnR5LnBhcmVudCkgVnZ2ZWIuQnVpbGRlci5zZWxlY3ROb2RlKGVsZW1lbnQpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0bm9kZUVsZW1lbnQgPSBWdnZlYi5CdWlsZGVyLnNlbGVjdGVkRWw7XHJcblxyXG5cdFx0Zm9yICh2YXIgaSBpbiBjb21wb25lbnQucHJvcGVydGllcykge1xyXG5cdFx0XHRwcm9wZXJ0eSA9IGNvbXBvbmVudC5wcm9wZXJ0aWVzW2ldO1xyXG5cclxuXHRcdFx0aWYgKHByb3BlcnR5LmJlZm9yZUluaXQpIHByb3BlcnR5LmJlZm9yZUluaXQoZWxlbWVudC5nZXQoMCkpXHJcblxyXG5cdFx0XHRlbGVtZW50ID0gbm9kZUVsZW1lbnQ7XHJcblx0XHRcdGlmIChwcm9wZXJ0eS5jaGlsZCkgZWxlbWVudCA9IGVsZW1lbnQuZmluZChwcm9wZXJ0eS5jaGlsZCk7XHJcblxyXG5cdFx0XHRpZiAocHJvcGVydHkuZGF0YSkge1xyXG5cdFx0XHRcdHByb3BlcnR5LmRhdGFbXCJrZXlcIl0gPSBwcm9wZXJ0eS5rZXk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cHJvcGVydHkuZGF0YSA9IHsgXCJrZXlcIjogcHJvcGVydHkua2V5IH07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0eXBlb2YgcHJvcGVydHkuZ3JvdXAgPT09ICd1bmRlZmluZWQnKSBwcm9wZXJ0eS5ncm91cCA9IG51bGw7XHJcblxyXG5cdFx0XHRwcm9wZXJ0eS5pbnB1dCA9IHByb3BlcnR5LmlucHV0dHlwZS5pbml0KHByb3BlcnR5LmRhdGEpO1xyXG5cclxuXHRcdFx0aWYgKHByb3BlcnR5LmluaXQpIHtcclxuXHRcdFx0XHRwcm9wZXJ0eS5pbnB1dHR5cGUuc2V0VmFsdWUocHJvcGVydHkuaW5pdChlbGVtZW50LmdldCgwKSkpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5Lmh0bWxBdHRyKSB7XHJcblx0XHRcdFx0aWYgKHByb3BlcnR5Lmh0bWxBdHRyID09ICd0ZXh0Jykge1xyXG5cdFx0XHRcdFx0dmFsdWUgPSBlbGVtZW50LnRleHQoKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5Lmh0bWxBdHRyID09IFwic3R5bGVcIikge1xyXG5cdFx0XHRcdFx0Ly92YWx1ZSA9IGVsZW1lbnQuY3NzKHByb3BlcnR5LmtleSk7Ly9qcXVlcnkgY3NzIHJldHVybnMgY29tcHV0ZWQgc3R5bGVcclxuXHRcdFx0XHRcdHZhbHVlID0gZ2V0U3R5bGUoZWxlbWVudC5nZXQoMCksIHByb3BlcnR5LmtleSk7Ly9nZXRTdHlsZSByZXR1cm5zIGRlY2xhcmVkIHN0eWxlXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHZhbHVlID0gZWxlbWVudC5hdHRyKHByb3BlcnR5Lmh0bWxBdHRyKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vaWYgYXR0cmlidXRlIGlzIGNsYXNzIGNoZWNrIGlmIG9uZSBvZiB2YWxpZCB2YWx1ZXMgaXMgaW5jbHVkZWQgYXMgY2xhc3MgdG8gc2V0IHRoZSBzZWxlY3RcclxuXHRcdFx0XHRpZiAodmFsdWUgJiYgcHJvcGVydHkuaHRtbEF0dHIgPT0gXCJjbGFzc1wiICYmIHByb3BlcnR5LnZhbGlkVmFsdWVzKSB7XHJcblx0XHRcdFx0XHR2YWx1ZSA9IHZhbHVlLnNwbGl0KFwiIFwiKS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBwcm9wZXJ0eS52YWxpZFZhbHVlcy5pbmRleE9mKGVsKSAhPSAtMVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAocHJvcGVydHkubm9WYWx1ZUF0dHIpIHtcclxuXHRcdFx0XHRcdHZhbHVlID0gZWxlbWVudC5hdHRyKHByb3BlcnR5Lmh0bWxBdHRyKSA/IHByb3BlcnR5LnZhbGlkVmFsdWVzIDogW107XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRwcm9wZXJ0eS5pbnB1dHR5cGUuc2V0VmFsdWUodmFsdWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmbihjb21wb25lbnQsIHByb3BlcnR5KTtcclxuXHJcblx0XHRcdGlmIChwcm9wZXJ0eS5pbnB1dHR5cGUgPT0gU2VjdGlvbklucHV0KSB7XHJcblx0XHRcdFx0c2VjdGlvbiA9IHJpZ2h0UGFuZWwuZmluZCgnLnNlY3Rpb25bZGF0YS1zZWN0aW9uPVwiJyArIHByb3BlcnR5LmtleSArICdcIl0nKTtcclxuXHJcblx0XHRcdFx0aWYgKFZ2dmViLnByZXNlcnZlUHJvcGVydHlTZWN0aW9ucyAmJiBzZWN0aW9uLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0c2VjdGlvbi5odG1sKFwiXCIpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyaWdodFBhbmVsLmFwcGVuZChwcm9wZXJ0eS5pbnB1dCk7XHJcblx0XHRcdFx0XHRzZWN0aW9uID0gcmlnaHRQYW5lbC5maW5kKCcuc2VjdGlvbltkYXRhLXNlY3Rpb249XCInICsgcHJvcGVydHkua2V5ICsgJ1wiXScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRyb3cgPSAkKHRtcGwoJ3Z2dmViLXByb3BlcnR5JywgcHJvcGVydHkpKTtcclxuXHRcdFx0XHRyb3cuZmluZCgnLmlucHV0JykuYXBwZW5kKHByb3BlcnR5LmlucHV0KTtcclxuXHRcdFx0XHRzZWN0aW9uLmFwcGVuZChyb3cpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbXBvbmVudC5pbml0KSBjb21wb25lbnQuaW5pdChWdnZlYi5CdWlsZGVyLnNlbGVjdGVkRWwuZ2V0KDApKTtcclxuXHR9XHJcbn07XHJcblxyXG5cclxuXHJcblZ2dmViLld5c2l3eWdFZGl0b3IgPSB7XHJcblxyXG5cdGlzQWN0aXZlOiBmYWxzZSxcclxuXHRvbGRWYWx1ZTogJycsXHJcblx0ZG9jOiBmYWxzZSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRvYykge1xyXG5cdFx0dGhpcy5kb2MgPSBkb2M7XHJcblxyXG5cdFx0JChcIiNib2xkLWJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGRvYy5leGVjQ29tbWFuZCgnYm9sZCcsIGZhbHNlLCBudWxsKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI2l0YWxpYy1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRkb2MuZXhlY0NvbW1hbmQoJ2l0YWxpYycsIGZhbHNlLCBudWxsKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI3VuZGVybGluZS1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRkb2MuZXhlY0NvbW1hbmQoJ3VuZGVybGluZScsIGZhbHNlLCBudWxsKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI3N0cmlrZS1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRkb2MuZXhlY0NvbW1hbmQoJ3N0cmlrZVRocm91Z2gnLCBmYWxzZSwgbnVsbCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNsaW5rLWJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGRvYy5leGVjQ29tbWFuZCgnY3JlYXRlTGluaycsIGZhbHNlLCBcIiNcIik7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0dW5kbzogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZG9jLmV4ZWNDb21tYW5kKCd1bmRvJywgZmFsc2UsIG51bGwpO1xyXG5cdH0sXHJcblxyXG5cdHJlZG86IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHR0aGlzLmRvYy5leGVjQ29tbWFuZCgncmVkbycsIGZhbHNlLCBudWxsKTtcclxuXHR9LFxyXG5cclxuXHRlZGl0OiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0ZWxlbWVudC5hdHRyKHsgJ2NvbnRlbnRlZGl0YWJsZSc6IHRydWUsICdzcGVsbGNoZWNra2VyJzogZmFsc2UgfSk7XHJcblx0XHQkKFwiI3d5c2l3eWctZWRpdG9yXCIpLnNob3coKTtcclxuXHJcblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG5cdFx0dGhpcy5pc0FjdGl2ZSA9IHRydWU7XHJcblx0XHR0aGlzLm9sZFZhbHVlID0gZWxlbWVudC5odG1sKCk7XHJcblx0fSxcclxuXHJcblx0ZGVzdHJveTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdGVsZW1lbnQucmVtb3ZlQXR0cignY29udGVudGVkaXRhYmxlIHNwZWxsY2hlY2trZXInKTtcclxuXHRcdCQoXCIjd3lzaXd5Zy1lZGl0b3JcIikuaGlkZSgpO1xyXG5cdFx0dGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuXHJcblx0XHRub2RlID0gdGhpcy5lbGVtZW50LmdldCgwKTtcclxuXHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHR0eXBlOiAnY2hhcmFjdGVyRGF0YScsXHJcblx0XHRcdHRhcmdldDogbm9kZSxcclxuXHRcdFx0b2xkVmFsdWU6IHRoaXMub2xkVmFsdWUsXHJcblx0XHRcdG5ld1ZhbHVlOiBub2RlLmlubmVySFRNTFxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5WdnZlYi5CdWlsZGVyID0ge1xyXG5cclxuXHRkcmFnTW92ZU11dGF0aW9uOiBmYWxzZSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKHVybCwgY2FsbGJhY2spIHtcclxuXHJcblx0XHRzZWxmID0gdGhpcztcclxuXHJcblx0XHRzZWxmLmxvYWRDb250cm9sR3JvdXBzKCk7XHJcblxyXG5cdFx0c2VsZi5zZWxlY3RlZEVsID0gbnVsbDtcclxuXHRcdHNlbGYuaGlnaGxpZ2h0RWwgPSBudWxsO1xyXG5cdFx0c2VsZi5pbml0Q2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHJcblx0XHRzZWxmLmRvY3VtZW50RnJhbWUgPSAkKFwiI2lmcmFtZS13cmFwcGVyID4gaWZyYW1lXCIpO1xyXG5cdFx0c2VsZi5jYW52YXMgPSAkKFwiI2NhbnZhc1wiKTtcclxuXHJcblx0XHRzZWxmLl9sb2FkSWZyYW1lKHVybCk7XHJcblxyXG5cdFx0c2VsZi5faW5pdERyYWdkcm9wKCk7XHJcblxyXG5cdFx0c2VsZi5kcmFnRWxlbWVudCA9IG51bGw7XHJcblx0fSxcclxuXHJcblx0LyogY29udHJvbHMgKi9cclxuXHRsb2FkQ29udHJvbEdyb3VwczogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdGNvbXBvbmVudHNMaXN0ID0gJChcIiNjb21wb25lbnRzLWxpc3RcIik7XHJcblx0XHRjb21wb25lbnRzTGlzdC5lbXB0eSgpO1xyXG5cclxuXHRcdGZvciAoZ3JvdXAgaW4gVnZ2ZWIuQ29tcG9uZW50c0dyb3VwKSB7XHJcblx0XHRcdGNvbXBvbmVudHNMaXN0LmFwcGVuZCgnPGxpIGNsYXNzPVwiaGVhZGVyXCIgZGF0YS1zZWN0aW9uPVwiJyArIGdyb3VwICsgJ1wiICBkYXRhLXNlYXJjaD1cIlwiPjxsYWJlbCBjbGFzcz1cImhlYWRlclwiIGZvcj1cImNvbXBoZWFkXycgKyBncm91cCArICdcIj4nICsgZ3JvdXAgKyAnICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWFycm93XCI+PC9kaXY+XFxcclxuXHRcdFx0XHRcdFx0XHRcdCAgIDwvbGFiZWw+PGlucHV0IGNsYXNzPVwiaGVhZGVyX2NoZWNrXCIgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD1cInRydWVcIiBpZD1cImNvbXBoZWFkXycgKyBncm91cCArICdcIj4gIDxvbD48L29sPjwvbGk+Jyk7XHJcblxyXG5cdFx0XHRjb21wb25lbnRzU3ViTGlzdCA9IGNvbXBvbmVudHNMaXN0LmZpbmQoJ2xpW2RhdGEtc2VjdGlvbj1cIicgKyBncm91cCArICdcIl0gIG9sJyk7XHJcblxyXG5cdFx0XHRjb21wb25lbnRzID0gVnZ2ZWIuQ29tcG9uZW50c0dyb3VwW2dyb3VwXTtcclxuXHJcblx0XHRcdGZvciAoaSBpbiBjb21wb25lbnRzKSB7XHJcblx0XHRcdFx0Y29tcG9uZW50VHlwZSA9IGNvbXBvbmVudHNbaV07XHJcblx0XHRcdFx0Y29tcG9uZW50ID0gVnZ2ZWIuQ29tcG9uZW50cy5nZXQoY29tcG9uZW50VHlwZSk7XHJcblxyXG5cdFx0XHRcdGlmIChjb21wb25lbnQpIHtcclxuXHRcdFx0XHRcdGl0ZW0gPSAkKCc8bGkgZGF0YS1zZWN0aW9uPVwiJyArIGdyb3VwICsgJ1wiIGRhdGEtdHlwZT1cIicgKyBjb21wb25lbnRUeXBlICsgJ1wiIGRhdGEtc2VhcmNoPVwiJyArIGNvbXBvbmVudC5uYW1lLnRvTG93ZXJDYXNlKCkgKyAnXCI+PGEgaHJlZj1cIiNcIj4nICsgY29tcG9uZW50Lm5hbWUgKyBcIjwvYT48L2xpPlwiKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoY29tcG9uZW50LmltYWdlKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRpdGVtLmNzcyh7XHJcblx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZEltYWdlOiBcInVybChcIiArICdsaWJzL2J1aWxkZXIvJyArIGNvbXBvbmVudC5pbWFnZSArIFwiKVwiLFxyXG5cdFx0XHRcdFx0XHRcdGJhY2tncm91bmRSZXBlYXQ6IFwibm8tcmVwZWF0XCJcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRjb21wb25lbnRzU3ViTGlzdC5hcHBlbmQoaXRlbSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRsb2FkVXJsOiBmdW5jdGlvbiAodXJsKSB7XHJcblx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblx0XHRzZWxmLmlmcmFtZS5zcmMgPSB1cmw7XHJcblx0fSxcclxuXHJcblx0LyogaWZyYW1lICovXHJcblx0X2xvYWRJZnJhbWU6IGZ1bmN0aW9uICh1cmwpIHtcclxuXHJcblx0XHRzZWxmLmlmcmFtZSA9IHRoaXMuZG9jdW1lbnRGcmFtZS5nZXQoMCk7XHJcblx0XHRzZWxmLmlmcmFtZS5zcmMgPSB1cmw7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuZG9jdW1lbnRGcmFtZS5vbihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0d2luZG93LkZyYW1lV2luZG93ID0gc2VsZi5pZnJhbWUuY29udGVudFdpbmRvdztcclxuXHRcdFx0d2luZG93LkZyYW1lRG9jdW1lbnQgPSBzZWxmLmlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xyXG5cclxuXHRcdFx0VnZ2ZWIuV3lzaXd5Z0VkaXRvci5pbml0KHdpbmRvdy5GcmFtZURvY3VtZW50KTtcclxuXHRcdFx0aWYgKHNlbGYuaW5pdENhbGxiYWNrKSBzZWxmLmluaXRDYWxsYmFjaygpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNlbGYuX2ZyYW1lTG9hZGVkKCk7XHJcblx0XHR9KTtcclxuXHJcblx0fSxcclxuXHJcblx0X2ZyYW1lTG9hZGVkOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0c2VsZi5mcmFtZURvYyA9ICQod2luZG93LkZyYW1lRG9jdW1lbnQpO1xyXG5cdFx0c2VsZi5mcmFtZUh0bWwgPSAkKHdpbmRvdy5GcmFtZURvY3VtZW50KS5maW5kKFwiaHRtbFwiKTtcclxuXHRcdHNlbGYuZnJhbWVCb2R5ID0gJCh3aW5kb3cuRnJhbWVEb2N1bWVudCkuZmluZCgnYm9keScpO1xyXG5cclxuXHRcdHRoaXMuX2luaXRIaWdodGxpZ2h0KCk7XHJcblx0fSxcclxuXHJcblx0X2dldEVsZW1lbnRUeXBlOiBmdW5jdGlvbiAoZWwpIHtcclxuXHJcblx0XHQvL3NlYXJjaCBmb3IgY29tcG9uZW50IGF0dHJpYnV0ZVxyXG5cdFx0Y29tcG9uZW50TmFtZSA9ICcnO1xyXG5cclxuXHRcdGlmIChlbC5hdHRyaWJ1dGVzKVxyXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBqKyspIHtcclxuXHJcblx0XHRcdFx0aWYgKGVsLmF0dHJpYnV0ZXNbal0ubm9kZU5hbWUuaW5kZXhPZignZGF0YS1jb21wb25lbnQnKSA+IC0xKSB7XHJcblx0XHRcdFx0XHRjb21wb25lbnROYW1lID0gZWwuYXR0cmlidXRlc1tqXS5ub2RlTmFtZS5yZXBsYWNlKCdkYXRhLWNvbXBvbmVudC0nLCAnJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbXBvbmVudE5hbWUgIT0gJycpIHJldHVybiBjb21wb25lbnROYW1lO1xyXG5cclxuXHRcdGlmIChlbC5hdHRyaWJ1dGVzKVxyXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBqKyspIHtcclxuXHJcblx0XHRcdFx0aWYgKGVsLmF0dHJpYnV0ZXNbal0ubm9kZU5hbWUuaW5kZXhPZignZGF0YS1jb21wb25lbnQnKSA+IC0xKSB7XHJcblx0XHRcdFx0XHRjb21wb25lbnROYW1lID0gZWwuYXR0cmlidXRlc1tqXS5ub2RlTmFtZS5yZXBsYWNlKCdkYXRhLWNvbXBvbmVudC0nLCAnJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbXBvbmVudE5hbWUgIT0gJycpIHJldHVybiBjb21wb25lbnROYW1lO1xyXG5cdFx0Ly9pZiAoY2xhc3NOYW1lKSByZXR1cm4gY29tcG9uZW50TmFtZTtcclxuXHRcdHJldHVybiBlbC50YWdOYW1lO1xyXG5cdH0sXHJcblxyXG5cdGxvYWROb2RlQ29tcG9uZW50OiBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0ZGF0YSA9IFZ2dmViLkNvbXBvbmVudHMubWF0Y2hOb2RlKG5vZGUpO1xyXG5cdFx0aWYgKGRhdGEpIFZ2dmViLkNvbXBvbmVudHMucmVuZGVyKGRhdGEudHlwZSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdHNlbGVjdE5vZGU6IGZ1bmN0aW9uIChub2RlID0gZmFsc2UpIHtcclxuXHJcblx0XHRpZiAoIW5vZGUpIHtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHNlbGYudGV4dGVkaXRFbCAmJiBzZWxmLnNlbGVjdGVkRWwuZ2V0KDApICE9IG5vZGUpIHtcclxuXHRcdFx0VnZ2ZWIuV3lzaXd5Z0VkaXRvci5kZXN0cm95KHNlbGYudGV4dGVkaXRFbCk7XHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLnJlbW92ZUNsYXNzKFwidGV4dC1lZGl0XCIpLmZpbmQoXCIjc2VsZWN0LWFjdGlvbnNcIikuc2hvdygpO1xyXG5cdFx0XHRzZWxmLnRleHRlZGl0RWwgPSBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlbGYuc2VsZWN0ZWRFbCA9IHRhcmdldCA9IGpRdWVyeShub2RlKTtcclxuXHRcdG9mZnNldCA9IHRhcmdldC5vZmZzZXQoKTtcclxuXHJcblxyXG5cdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuY3NzKFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJ0b3BcIjogb2Zmc2V0LnRvcCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsVG9wKCksXHJcblx0XHRcdFx0XCJsZWZ0XCI6IG9mZnNldC5sZWZ0IC0gc2VsZi5mcmFtZURvYy5zY3JvbGxMZWZ0KCksXHJcblx0XHRcdFx0XCJ3aWR0aFwiOiB0YXJnZXQub3V0ZXJXaWR0aCgpLFxyXG5cdFx0XHRcdFwiaGVpZ2h0XCI6IHRhcmdldC5vdXRlckhlaWdodCgpLFxyXG5cdFx0XHRcdFwiZGlzcGxheVwiOiBcImJsb2NrXCIsXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdGpRdWVyeShcIiNoaWdobGlnaHQtbmFtZVwiKS5odG1sKHNlbGYuX2dldEVsZW1lbnRUeXBlKG5vZGUpKTtcclxuXHJcblx0fSxcclxuXHJcblx0LyogaWZyYW1lIGhpZ2hsaWdodCAqL1xyXG5cdF9pbml0SGlnaHRsaWdodDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdG1vdmVFdmVudCA9IHsgdGFyZ2V0OiBudWxsLCB9O1xyXG5cclxuXHRcdHRoaXMuZnJhbWVCb2R5Lm9uKFwibW91c2Vtb3ZlIHRvdWNobW92ZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0Ly9kZWxheSBmb3IgaGFsZiBhIHNlY29uZCBpZiBkcmFnZ2luZyBvdmVyIHNhbWUgZWxlbWVudFxyXG5cdFx0XHQvLyBpZiAoZXZlbnQudGFyZ2V0ID09IG1vdmVFdmVudC50YXJnZXQgJiYgKChldmVudC50aW1lU3RhbXAgLSBtb3ZlRXZlbnQudGltZVN0YW1wKSA8IDUwMCkpIHJldHVybjtcclxuXHRcdFx0aWYgKGV2ZW50LnRhcmdldCkge1xyXG5cdFx0XHRcdG1vdmVFdmVudCA9IGV2ZW50O1xyXG5cclxuXHRcdFx0XHRzZWxmLmhpZ2hsaWdodEVsID0gdGFyZ2V0ID0galF1ZXJ5KGV2ZW50LnRhcmdldCk7XHJcblx0XHRcdFx0b2Zmc2V0ID0gdGFyZ2V0Lm9mZnNldCgpO1xyXG5cdFx0XHRcdHdpZHRoID0gdGFyZ2V0Lm91dGVyV2lkdGgoKTtcclxuXHRcdFx0XHRoZWlnaHQgPSB0YXJnZXQub3V0ZXJIZWlnaHQoKTtcclxuXHJcblx0XHRcdFx0aWYgKHNlbGYuaXNEcmFnZ2luZykge1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnRWxlbWVudC5jc3Moe1xyXG5cdFx0XHRcdFx0XHRkaXNwbGF5OiAnbm9uZSdcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0cGFyZW50ID0gc2VsZi5oaWdobGlnaHRFbDtcclxuXHRcdFx0XHRcdHBhcmVudE9mZnNldCA9IHNlbGYuZHJhZ0VsZW1lbnQub2Zmc2V0KCk7XHJcblx0XHRcdFx0XHQvLyB0cnkge1xyXG5cdFx0XHRcdFx0Ly8gXHRzZWxmLmRyYWdFbGVtZW50LmNzcyh7XHJcblx0XHRcdFx0XHQvLyBcdFx0ZGlzcGxheTogJ25vbmUnXHJcblx0XHRcdFx0XHQvLyBcdH0pO1xyXG5cdFx0XHRcdFx0Ly8gXHRpZiAoZXZlbnQub3JpZ2luYWxFdmVudCAmJiAob2Zmc2V0LmxlZnQgPiAoZXZlbnQub3JpZ2luYWxFdmVudC54IC0gMTApKSkge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdGlmIChvZmZzZXQudG9wID4gKGV2ZW50Lm9yaWdpbmFsRXZlbnQueSAtIDEwKSkge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0cGFyZW50LmJlZm9yZShzZWxmLmRyYWdFbGVtZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0cGFyZW50LnByZXBlbmQoc2VsZi5kcmFnRWxlbWVudCk7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRzZWxmLmRyYWdFbGVtZW50LnByZXBlbmRUbyhwYXJlbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdH1cclxuXHRcdFx0XHRcdC8vIFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRpZiAoZXZlbnQub3JpZ2luYWxFdmVudCAmJiBvZmZzZXQudG9wID4gKChldmVudC5vcmlnaW5hbEV2ZW50LnkgLSAxMCkpKSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRwYXJlbnQuYmVmb3JlKHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRwYXJlbnQuYXBwZW5kKHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0c2VsZi5kcmFnRWxlbWVudC5hcHBlbmRUbyhwYXJlbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdH1cclxuXHRcdFx0XHRcdC8vIFx0fVxyXG5cdFx0XHRcdFx0Ly8gfSBjYXRjaCAoZXJyKSB7XHJcblx0XHRcdFx0XHQvLyBcdGNvbnNvbGUubG9nKGVycik7XHJcblx0XHRcdFx0XHQvLyB9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0XHRqUXVlcnkoXCIjaGlnaGxpZ2h0LWJveFwiKS5jc3MoXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcInRvcFwiOiBvZmZzZXQudG9wIC0gc2VsZi5mcmFtZURvYy5zY3JvbGxUb3AoKSxcclxuXHRcdFx0XHRcdFx0XHRcImxlZnRcIjogb2Zmc2V0LmxlZnQgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbExlZnQoKSxcclxuXHRcdFx0XHRcdFx0XHRcIndpZHRoXCI6IHdpZHRoLFxyXG5cdFx0XHRcdFx0XHRcdFwiaGVpZ2h0XCI6IGhlaWdodCxcclxuXHRcdFx0XHRcdFx0XHRcImRpc3BsYXlcIjogZXZlbnQudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJykgPyBcIm5vbmVcIiA6IFwiYmxvY2tcIlxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRqUXVlcnkoXCIjaGlnaGxpZ2h0LW5hbWVcIikuaHRtbChzZWxmLl9nZXRFbGVtZW50VHlwZShldmVudC50YXJnZXQpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHR0aGlzLmZyYW1lQm9keS5vbihcIm1vdXNldXAgdG91Y2hlbmRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGlmIChzZWxmLmlzRHJhZ2dpbmcpIHtcclxuXHRcdFx0XHRzZWxmLmlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0aWYgKGNvbXBvbmVudC5kcmFnSHRtbCkgLy9pZiBkcmFnSHRtbCBpcyBzZXQgZm9yIGRyYWdnaW5nIHRoZW4gc2V0IHJlYWwgY29tcG9uZW50IGh0bWxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRuZXdFbGVtZW50ID0gJChjb21wb25lbnQuaHRtbCk7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdFbGVtZW50LnJlcGxhY2VXaXRoKG5ld0VsZW1lbnQpO1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnRWxlbWVudCA9IG5ld0VsZW1lbnQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChjb21wb25lbnQuYWZ0ZXJEcm9wKSBzZWxmLmRyYWdFbGVtZW50ID0gY29tcG9uZW50LmFmdGVyRHJvcChzZWxmLmRyYWdFbGVtZW50KTtcclxuXHJcblx0XHRcdFx0bm9kZSA9IHNlbGYuZHJhZ0VsZW1lbnQuZ2V0KDApO1xyXG5cdFx0XHRcdHNlbGYuc2VsZWN0Tm9kZShub2RlKTtcclxuXHRcdFx0XHRzZWxmLmxvYWROb2RlQ29tcG9uZW50KG5vZGUpO1xyXG5cclxuXHRcdFx0XHRpZiAoc2VsZi5kcmFnTW92ZU11dGF0aW9uID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0XHRcdHR5cGU6ICdjaGlsZExpc3QnLFxyXG5cdFx0XHRcdFx0XHR0YXJnZXQ6IG5vZGUucGFyZW50Tm9kZSxcclxuXHRcdFx0XHRcdFx0YWRkZWROb2RlczogW25vZGVdLFxyXG5cdFx0XHRcdFx0XHRuZXh0U2libGluZzogbm9kZS5uZXh0U2libGluZ1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ01vdmVNdXRhdGlvbi5uZXdQYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdNb3ZlTXV0YXRpb24ubmV3TmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oc2VsZi5kcmFnTW92ZU11dGF0aW9uKTtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ01vdmVNdXRhdGlvbiA9IGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdHRoaXMuZnJhbWVCb2R5Lm9uKFwiZGJsY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdHJlcGxhY2VPdGhlclNob3dpbmdDYWxlbmRhcklucHV0cyhldmVudC50YXJnZXQsIHNlbGYuZnJhbWVCb2R5KTtcclxuXHJcblx0XHRcdHNlbGYudGV4dGVkaXRFbCA9IHRhcmdldCA9IGpRdWVyeShldmVudC50YXJnZXQpO1xyXG5cclxuXHRcdFx0VnZ2ZWIuV3lzaXd5Z0VkaXRvci5lZGl0KHNlbGYudGV4dGVkaXRFbCk7XHJcblxyXG5cdFx0XHRzZWxmLnRleHRlZGl0RWwuYXR0cih7ICdjb250ZW50ZWRpdGFibGUnOiB0cnVlLCAnc3BlbGxjaGVja2tlcic6IGZhbHNlIH0pO1xyXG5cclxuXHRcdFx0c2VsZi50ZXh0ZWRpdEVsLm9uKFwiYmx1ciBrZXl1cCBwYXN0ZSBpbnB1dFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuY3NzKHtcclxuXHRcdFx0XHRcdFwid2lkdGhcIjogc2VsZi50ZXh0ZWRpdEVsLm91dGVyV2lkdGgoKSxcclxuXHRcdFx0XHRcdFwiaGVpZ2h0XCI6IHNlbGYudGV4dGVkaXRFbC5vdXRlckhlaWdodCgpXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuYWRkQ2xhc3MoXCJ0ZXh0LWVkaXRcIikuZmluZChcIiNzZWxlY3QtYWN0aW9uc1wiKS5oaWRlKCk7XHJcblx0XHRcdGpRdWVyeShcIiNoaWdobGlnaHQtYm94XCIpLmhpZGUoKTtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHR0aGlzLmZyYW1lQm9keS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRyZXBsYWNlT3RoZXJTaG93aW5nQ2FsZW5kYXJJbnB1dHMoZXZlbnQudGFyZ2V0LCBzZWxmLmZyYW1lQm9keSk7XHJcblxyXG5cdFx0XHRpZiAoZXZlbnQudGFyZ2V0KSB7XHJcblx0XHRcdFx0Y29uc3Qgbm9kZSA9IGdldFBhcmVudE9yU2VsZihldmVudC50YXJnZXQpO1xyXG5cdFx0XHRcdGlmICghaXNQcmV2aWV3ICYmICEkKCcjYXR0cmlidXRlLXNldHRpbmdzJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcblx0XHRcdFx0XHQkKCcjYXR0cmlidXRlLXNldHRpbmdzJylcclxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKCdhY3RpdmUnKVxyXG5cdFx0XHRcdFx0XHQuc2libGluZ3MoKVxyXG5cdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdFx0JCgnI2xlZnQtcGFuZWwnKS5oaWRlKCk7XHJcblx0XHRcdFx0XHQkKCcjcmlnaHQtcGFuZWwnKS5zaG93KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHNlbGYuc2VsZWN0Tm9kZShub2RlKTtcclxuXHRcdFx0XHRzZWxmLmxvYWROb2RlQ29tcG9uZW50KG5vZGUpO1xyXG5cclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5mcmFtZUJvZHkua2V5ZG93bihlID0+IHtcclxuXHRcdFx0aWYgKHNlbGYuc2VsZWN0ZWRFbCAmJiBzZWxmLnNlbGVjdGVkRWwucHJvcCgndGFnTmFtZScpICE9ICdCT0RZJykge1xyXG5cdFx0XHRcdGlmIChlLndoaWNoID09IDM3IHx8IGUud2hpY2ggPT0gMzggfHwgZS53aGljaCA9PSAzOSB8fCBlLndoaWNoID09IDQwKSB7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaWZyYW1lSWQnKS5jb250ZW50V2luZG93LmFycm93S2V5TW92ZShlLndoaWNoLCBzZWxmLnNlbGVjdGVkRWwpO1xyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50IHRoZSBkZWZhdWx0IGFjdGlvbiAoc2Nyb2xsIC8gbW92ZSBjYXJldClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjZHJhZy1ib3hcIikub24oXCJtb3VzZWRvd25cIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmhpZGUoKTtcclxuXHRcdFx0c2VsZi5kcmFnRWxlbWVudCA9IHNlbGYuc2VsZWN0ZWRFbDtcclxuXHRcdFx0c2VsZi5pc0RyYWdnaW5nID0gdHJ1ZTtcclxuXHJcblx0XHRcdG5vZGUgPSBzZWxmLmRyYWdFbGVtZW50LmdldCgwKTtcclxuXHJcblxyXG5cdFx0XHRzZWxmLmRyYWdNb3ZlTXV0YXRpb24gPSB7XHJcblx0XHRcdFx0dHlwZTogJ21vdmUnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZSxcclxuXHRcdFx0XHRvbGRQYXJlbnQ6IG5vZGUucGFyZW50Tm9kZSxcclxuXHRcdFx0XHRvbGROZXh0U2libGluZzogbm9kZS5uZXh0U2libGluZ1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly9zZWxmLnNlbGVjdE5vZGUoZmFsc2UpO1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI2Rvd24tYm94XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmhpZGUoKTtcclxuXHJcblx0XHRcdG5vZGUgPSBzZWxmLnNlbGVjdGVkRWwuZ2V0KDApO1xyXG5cdFx0XHRvbGRQYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdG9sZE5leHRTaWJsaW5nID0gbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRcdG5leHQgPSBzZWxmLnNlbGVjdGVkRWwubmV4dCgpO1xyXG5cclxuXHRcdFx0aWYgKG5leHQubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdG5leHQuYWZ0ZXIoc2VsZi5zZWxlY3RlZEVsKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzZWxmLnNlbGVjdGVkRWwucGFyZW50KCkuYWZ0ZXIoc2VsZi5zZWxlY3RlZEVsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bmV3UGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRuZXdOZXh0U2libGluZyA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0XHR0eXBlOiAnbW92ZScsXHJcblx0XHRcdFx0dGFyZ2V0OiBub2RlLFxyXG5cdFx0XHRcdG9sZFBhcmVudDogb2xkUGFyZW50LFxyXG5cdFx0XHRcdG5ld1BhcmVudDogbmV3UGFyZW50LFxyXG5cdFx0XHRcdG9sZE5leHRTaWJsaW5nOiBvbGROZXh0U2libGluZyxcclxuXHRcdFx0XHRuZXdOZXh0U2libGluZzogbmV3TmV4dFNpYmxpbmdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI3VwLWJveFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5zZWxlY3RlZEVsLmdldCgwKTtcclxuXHRcdFx0b2xkUGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRvbGROZXh0U2libGluZyA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0XHRuZXh0ID0gc2VsZi5zZWxlY3RlZEVsLnByZXYoKTtcclxuXHJcblx0XHRcdGlmIChuZXh0Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRuZXh0LmJlZm9yZShzZWxmLnNlbGVjdGVkRWwpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHNlbGYuc2VsZWN0ZWRFbC5wYXJlbnQoKS5iZWZvcmUoc2VsZi5zZWxlY3RlZEVsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bmV3UGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRuZXdOZXh0U2libGluZyA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0XHR0eXBlOiAnbW92ZScsXHJcblx0XHRcdFx0dGFyZ2V0OiBub2RlLFxyXG5cdFx0XHRcdG9sZFBhcmVudDogb2xkUGFyZW50LFxyXG5cdFx0XHRcdG5ld1BhcmVudDogbmV3UGFyZW50LFxyXG5cdFx0XHRcdG9sZE5leHRTaWJsaW5nOiBvbGROZXh0U2libGluZyxcclxuXHRcdFx0XHRuZXdOZXh0U2libGluZzogbmV3TmV4dFNpYmxpbmdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI2Nsb25lLWJveFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRjbG9uZSA9IHNlbGYuc2VsZWN0ZWRFbC5jbG9uZSgpO1xyXG5cclxuXHRcdFx0c2VsZi5zZWxlY3RlZEVsLmFmdGVyKGNsb25lKTtcclxuXHJcblx0XHRcdHNlbGYuc2VsZWN0ZWRFbCA9IGNsb25lLmNsaWNrKCk7XHJcblxyXG5cdFx0XHRub2RlID0gY2xvbmUuZ2V0KDApO1xyXG5cdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0XHR0eXBlOiAnY2hpbGRMaXN0JyxcclxuXHRcdFx0XHR0YXJnZXQ6IG5vZGUucGFyZW50Tm9kZSxcclxuXHRcdFx0XHRhZGRlZE5vZGVzOiBbbm9kZV0sXHJcblx0XHRcdFx0bmV4dFNpYmxpbmc6IG5vZGUubmV4dFNpYmxpbmdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI3BhcmVudC1ib3hcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcblx0XHRcdG5vZGUgPSBzZWxmLnNlbGVjdGVkRWwucGFyZW50KCkuZ2V0KDApO1xyXG5cclxuXHRcdFx0c2VsZi5zZWxlY3ROb2RlKG5vZGUpO1xyXG5cdFx0XHRzZWxmLmxvYWROb2RlQ29tcG9uZW50KG5vZGUpO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNkZWxldGUtYm94XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmhpZGUoKTtcclxuXHJcblx0XHRcdG5vZGUgPSBzZWxmLnNlbGVjdGVkRWwuZ2V0KDApO1xyXG5cclxuXHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0dHlwZTogJ2NoaWxkTGlzdCcsXHJcblx0XHRcdFx0dGFyZ2V0OiBub2RlLnBhcmVudE5vZGUsXHJcblx0XHRcdFx0cmVtb3ZlZE5vZGVzOiBbbm9kZV0sXHJcblx0XHRcdFx0bmV4dFNpYmxpbmc6IG5vZGUubmV4dFNpYmxpbmdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRzZWxmLnNlbGVjdGVkRWwucmVtb3ZlKCk7XHJcblxyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHRqUXVlcnkod2luZG93LkZyYW1lV2luZG93KS5vbihcInNjcm9sbCByZXNpemVcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRpZiAoc2VsZi5zZWxlY3RlZEVsKSB7XHJcblx0XHRcdFx0b2Zmc2V0ID0gc2VsZi5zZWxlY3RlZEVsLm9mZnNldCgpO1xyXG5cclxuXHRcdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5jc3MoXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFwidG9wXCI6IG9mZnNldC50b3AgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbFRvcCgpLFxyXG5cdFx0XHRcdFx0XHRcImxlZnRcIjogb2Zmc2V0LmxlZnQgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbExlZnQoKSxcclxuXHRcdFx0XHRcdFx0XCJ3aWR0aFwiOiBzZWxmLnNlbGVjdGVkRWwub3V0ZXJXaWR0aCgpLFxyXG5cdFx0XHRcdFx0XHRcImhlaWdodFwiOiBzZWxmLnNlbGVjdGVkRWwub3V0ZXJIZWlnaHQoKSxcclxuXHRcdFx0XHRcdFx0Ly9cImRpc3BsYXlcIjogXCJibG9ja1wiXHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChzZWxmLmhpZ2hsaWdodEVsKSB7XHJcblx0XHRcdFx0b2Zmc2V0ID0gc2VsZi5oaWdobGlnaHRFbC5vZmZzZXQoKTtcclxuXHJcblx0XHRcdFx0alF1ZXJ5KFwiI2hpZ2hsaWdodC1ib3hcIikuY3NzKFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcInRvcFwiOiBvZmZzZXQudG9wIC0gc2VsZi5mcmFtZURvYy5zY3JvbGxUb3AoKSxcclxuXHRcdFx0XHRcdFx0XCJsZWZ0XCI6IG9mZnNldC5sZWZ0IC0gc2VsZi5mcmFtZURvYy5zY3JvbGxMZWZ0KCksXHJcblx0XHRcdFx0XHRcdFwid2lkdGhcIjogc2VsZi5oaWdobGlnaHRFbC5vdXRlcldpZHRoKCksXHJcblx0XHRcdFx0XHRcdFwiaGVpZ2h0XCI6IHNlbGYuaGlnaGxpZ2h0RWwub3V0ZXJIZWlnaHQoKSxcclxuXHRcdFx0XHRcdFx0Ly9cImRpc3BsYXlcIjogXCJibG9ja1wiXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdC8qIGRyYWcgYW5kIGRyb3AgKi9cclxuXHRfaW5pdERyYWdkcm9wOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0c2VsZi5pc0RyYWdnaW5nID0gZmFsc2U7XHJcblx0XHRjb21wb25lbnQgPSB7fTtcclxuXHRcdCQoJyNjb21wb25lbnRzIHVsID4gbGkgPiBvbCA+IGxpJykub24oXCJtb3VzZWRvd24gdG91Y2hzdGFydFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0JHRoaXMgPSBqUXVlcnkodGhpcyk7XHJcblxyXG5cdFx0XHQvLyAkKFwiI2NvbXBvbmVudC1jbG9uZVwiKS5yZW1vdmUoKTtcclxuXHRcdFx0Y29tcG9uZW50ID0gVnZ2ZWIuQ29tcG9uZW50cy5nZXQoJHRoaXMuZGF0YShcInR5cGVcIikpO1xyXG5cclxuXHRcdFx0aWYgKGNvbXBvbmVudC5kcmFnSHRtbCkge1xyXG5cdFx0XHRcdGh0bWwgPSBjb21wb25lbnQuZHJhZ0h0bWw7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aHRtbCA9IGNvbXBvbmVudC5odG1sO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZWxmLmRyYWdFbGVtZW50ID0gJChodG1sKTtcclxuXHJcblx0XHRcdGlmIChjb21wb25lbnQuZHJhZ1N0YXJ0KSBzZWxmLmRyYWdFbGVtZW50ID0gY29tcG9uZW50LmRyYWdTdGFydChzZWxmLmRyYWdFbGVtZW50KTtcclxuXHJcblx0XHRcdHNlbGYuaXNEcmFnZ2luZyA9IHRydWU7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0JCgnYm9keScpLm9uKCdtb3VzZXVwIHRvdWNoZW5kJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGlmIChzZWxmLmlzRHJhZ2dpbmcgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdHNlbGYuaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cdFx0XHRcdC8vICQoXCIjY29tcG9uZW50LWNsb25lXCIpLnJlbW92ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCdib2R5Jykub24oJ21vdXNlbW92ZSB0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0aWYgKHNlbGYuaXNEcmFnZ2luZyA9PSB0cnVlKSB7XHJcblx0XHRcdFx0ZWxlbWVudE1vdXNlSXNPdmVyID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYIC0gNjAsIGV2ZW50LmNsaWVudFkgLSA0MCk7XHJcblx0XHRcdFx0Ly9pZiBkcmFnIGVsZW1lbnRzIGhvdmVycyBvdmVyIGlmcmFtZSBzd2l0Y2ggdG8gaWZyYW1lIG1vdXNlb3ZlciBoYW5kbGVyXHRcclxuXHRcdFx0XHRpZiAoZWxlbWVudE1vdXNlSXNPdmVyICYmIGVsZW1lbnRNb3VzZUlzT3Zlci50YWdOYW1lID09ICdJRlJBTUUnKSB7XHJcblx0XHRcdFx0XHRzZWxmLmZyYW1lQm9keS50cmlnZ2VyKFwibW91c2Vtb3ZlXCIsIGV2ZW50KTtcclxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdFx0c2VsZi5zZWxlY3ROb2RlKGZhbHNlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJyNjb21wb25lbnRzIHVsID4gb2wgPiBsaSA+IGxpJykub24oXCJtb3VzZXVwIHRvdWNoZW5kXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRzZWxmLmlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHRcdFx0Ly8gJChcIiNjb21wb25lbnQtY2xvbmVcIikucmVtb3ZlKCk7XHJcblx0XHR9KTtcclxuXHJcblx0fSxcclxuXHJcblx0Z2V0QmVhdXRpZmllZEh0bWwoKSB7XHJcblx0XHQvKlxyXG5cdFx0LUksIC0taW5kZW50LWlubmVyLWh0bWwgICAgICAgICAgICBJbmRlbnQgPGhlYWQ+IGFuZCA8Ym9keT4gc2VjdGlvbnMuIERlZmF1bHQgaXMgZmFsc2UuXHJcblx0XHQtVSwgLS11bmZvcm1hdHRlZCAgICAgICAgICAgICAgICAgIExpc3Qgb2YgdGFncyAoZGVmYXVsdHMgdG8gaW5saW5lKSB0aGF0IHNob3VsZCBub3QgYmUgcmVmb3JtYXR0ZWRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgICB1c2UgZW1wdHkgYXJyYXkgdG8gZGVub3RlIHRoYXQgbm8gdGFncyBzaG91bGQgbm90IGJlIHJlZm9ybWF0dGVkXHJcblx0XHQgKi9cclxuXHJcblx0XHRjb25zdCB7IGRvY3R5cGUsIGh0bWwgfSA9IHRoaXMuZ2V0SHRtbCgpO1xyXG5cdFx0cmV0dXJuIGh0bWxfYmVhdXRpZnkoYCR7ZG9jdHlwZX1cclxuXHRcdFx0XHRcdFx0XHQgICR7aHRtbEdlbmVyYXRvcihodG1sLCByZW1vdmVVbnVzZWRUYWdzLCBlbXB0eUNoaWxkcmVuLFxyXG5cdFx0XHRcdGdlbmVyYXRlVGFibGVTY3JpcHQsIGdlbmVyYXRlQ2FsZW5kYXJPbmNsaWNrQXR0ciwgZ2VuZXJhdGVTZWxlY3RPcHRpb25zU2NyaXB0LFxyXG5cdFx0XHRcdGdlbmVyYXRlU3VibWl0Rm9ybVNjcmlwdCwgZ2VuZXJhdGVCdXR0b25PbmNsaWNrQXR0cil9YCxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHByZXNlcnZlX25ld2xpbmVzOiBmYWxzZSxcclxuXHRcdFx0XHRpbmRlbnRfaW5uZXJfaHRtbDogdHJ1ZSxcclxuXHRcdFx0XHR1bmZvcm1hdHRlZDogW11cclxuXHRcdFx0fSk7XHJcblx0fSxcclxuXHJcblx0Z2V0SHRtbDogZnVuY3Rpb24gKCkge1xyXG5cdFx0ZG9jID0gd2luZG93LkZyYW1lRG9jdW1lbnQ7XHJcblx0XHRjb25zdCBkb2N0eXBlID0gXCI8IURPQ1RZUEUgXCJcclxuXHRcdFx0KyBkb2MuZG9jdHlwZS5uYW1lXHJcblx0XHRcdCsgKGRvYy5kb2N0eXBlLnB1YmxpY0lkID8gJyBQVUJMSUMgXCInICsgZG9jLmRvY3R5cGUucHVibGljSWQgKyAnXCInIDogJycpXHJcblx0XHRcdCsgKCFkb2MuZG9jdHlwZS5wdWJsaWNJZCAmJiBkb2MuZG9jdHlwZS5zeXN0ZW1JZCA/ICcgU1lTVEVNJyA6ICcnKVxyXG5cdFx0XHQrIChkb2MuZG9jdHlwZS5zeXN0ZW1JZCA/ICcgXCInICsgZG9jLmRvY3R5cGUuc3lzdGVtSWQgKyAnXCInIDogJycpXHJcblx0XHRcdCsgXCI+XFxuXCI7XHJcblx0XHRjb25zdCBodG1sID0gYCR7ZG9jdHlwZX1cclxuXHRcdFx0XHRcdCAgPGh0bWw+XHJcblx0XHRcdFx0XHRcdCAgJHtkb2MuZG9jdW1lbnRFbGVtZW50LmlubmVySFRNTH1cclxuXHRcdFx0XHRcdCAgPC9odG1sPmA7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRkb2N0eXBlLFxyXG5cdFx0XHRodG1sXHJcblx0XHR9O1xyXG5cdH0sXHJcblxyXG5cdHNldEh0bWw6IGZ1bmN0aW9uIChodG1sKSB7XHJcblx0XHQvL3VwZGF0ZSBvbmx5IGJvZHkgdG8gYXZvaWQgYnJlYWtpbmcgaWZyYW1lIGNzcy9qcyByZWxhdGl2ZSBwYXRoc1xyXG5cdFx0c3RhcnQgPSBodG1sLmluZGV4T2YoXCI8Ym9keVwiKTtcclxuXHRcdGVuZCA9IGh0bWwuaW5kZXhPZihcIjwvYm9keVwiKTtcclxuXHJcblx0XHRpZiAoc3RhcnQgPj0gMCAmJiBlbmQgPj0gMCkge1xyXG5cdFx0XHRib2R5ID0gaHRtbC5zbGljZShodG1sLmluZGV4T2YoXCI+XCIsIHN0YXJ0KSArIDEsIGVuZCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRib2R5ID0gaHRtbFxyXG5cdFx0fVxyXG5cclxuXHRcdC8vc2VsZi5mcmFtZUJvZHkuaHRtbChib2R5KTtcclxuXHRcdHdpbmRvdy5GcmFtZURvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gYm9keTtcclxuXHJcblx0XHQvL2JlbG93IG1ldGhvZHMgYnJha2UgZG9jdW1lbnQgcmVsYXRpdmUgY3NzIGFuZCBqcyBwYXRoc1xyXG5cdFx0Ly9yZXR1cm4gc2VsZi5pZnJhbWUub3V0ZXJIVE1MID0gaHRtbDtcclxuXHRcdC8vcmV0dXJuIHNlbGYuZG9jdW1lbnRGcmFtZS5odG1sKGh0bWwpO1xyXG5cdFx0Ly9yZXR1cm4gc2VsZi5kb2N1bWVudEZyYW1lLmF0dHIoXCJzcmNkb2NcIiwgaHRtbCk7XHJcblx0fVxyXG59O1xyXG5cclxuVnZ2ZWIuQ29kZUVkaXRvciA9IHtcclxuXHJcblx0aXNBY3RpdmU6IGZhbHNlLFxyXG5cdG9sZFZhbHVlOiAnJyxcclxuXHRkb2M6IGZhbHNlLFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZG9jKSB7XHJcblx0XHQkKFwiI3Z2dmViLWNvZGUtZWRpdG9yIHRleHRhcmVhXCIpLnZhbChWdnZlYi5CdWlsZGVyLmdldEJlYXV0aWZpZWRIdG1sKCkpO1xyXG5cclxuXHRcdCQoXCIjdnZ2ZWItY29kZS1lZGl0b3IgdGV4dGFyZWFcIikua2V5dXAoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRkZWxheShWdnZlYi5CdWlsZGVyLnNldEh0bWwodGhpcy52YWx1ZSksIDEwMDApO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly9sb2FkIGNvZGUgb24gZG9jdW1lbnQgY2hhbmdlc1xyXG5cdFx0VnZ2ZWIuQnVpbGRlci5mcmFtZUJvZHkub24oXCJ2dnZlYi51bmRvLmFkZCB2dnZlYi51bmRvLnJlc3RvcmVcIiwgZnVuY3Rpb24gKGUpIHsgVnZ2ZWIuQ29kZUVkaXRvci5zZXRWYWx1ZSgpOyB9KTtcclxuXHRcdC8vbG9hZCBjb2RlIHdoZW4gYSBuZXcgdXJsIGlzIGxvYWRlZFxyXG5cdFx0VnZ2ZWIuQnVpbGRlci5kb2N1bWVudEZyYW1lLm9uKFwibG9hZFwiLCBmdW5jdGlvbiAoZSkgeyBWdnZlYi5Db2RlRWRpdG9yLnNldFZhbHVlKCk7IH0pO1xyXG5cclxuXHRcdHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xyXG5cdH0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdGlmICh0aGlzLmlzQWN0aXZlKSB7XHJcblx0XHRcdCQoXCIjdnZ2ZWItY29kZS1lZGl0b3IgdGV4dGFyZWFcIikudmFsKFZ2dmViLkJ1aWxkZXIuZ2V0QmVhdXRpZmllZEh0bWwoKSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZGVzdHJveTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdC8vdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cdH0sXHJcblxyXG5cdHRvZ2dsZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuaXNBY3RpdmUgIT0gdHJ1ZSkge1xyXG5cdFx0XHR0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaW5pdCgpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5kZXN0cm95KCk7XHJcblx0fVxyXG59XHJcblxyXG5sZXQgc2hvd25QYW5lbCwgaGlkZGVuUGFuZWwsIGlzUHJldmlldztcclxuXHJcblZ2dmViLkd1aSA9IHtcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKCkge1xyXG5cdFx0JChcIltkYXRhLXZ2dmViLWFjdGlvbl1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdG9uID0gXCJjbGlja1wiO1xyXG5cdFx0XHRpZiAodGhpcy5kYXRhc2V0LnZ2dmViT24pIG9uID0gdGhpcy5kYXRhc2V0LnZ2dmViT247XHJcblxyXG5cdFx0XHQkKHRoaXMpLm9uKG9uLCBWdnZlYi5HdWlbdGhpcy5kYXRhc2V0LnZ2dmViQWN0aW9uXSk7XHJcblx0XHRcdGlmICh0aGlzLmRhdGFzZXQudnZ2ZWJTaG9ydGN1dCkge1xyXG5cdFx0XHRcdCQoZG9jdW1lbnQpLmJpbmQoJ2tleWRvd24nLCB0aGlzLmRhdGFzZXQudnZ2ZWJTaG9ydGN1dCwgVnZ2ZWIuR3VpW3RoaXMuZGF0YXNldC52dnZlYkFjdGlvbl0pO1xyXG5cdFx0XHRcdCQod2luZG93LkZyYW1lRG9jdW1lbnQsIHdpbmRvdy5GcmFtZVdpbmRvdykuYmluZCgna2V5ZG93bicsIHRoaXMuZGF0YXNldC52dnZlYlNob3J0Y3V0LCBWdnZlYi5HdWlbdGhpcy5kYXRhc2V0LnZ2dmViQWN0aW9uXSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHVuZG86IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmIChWdnZlYi5XeXNpd3lnRWRpdG9yLmlzQWN0aXZlKSB7XHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IudW5kbygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0VnZ2ZWIuVW5kby51bmRvKCk7XHJcblx0XHR9XHJcblx0XHRWdnZlYi5CdWlsZGVyLnNlbGVjdE5vZGUoKTtcclxuXHR9LFxyXG5cclxuXHRyZWRvOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoVnZ2ZWIuV3lzaXd5Z0VkaXRvci5pc0FjdGl2ZSkge1xyXG5cdFx0XHRWdnZlYi5XeXNpd3lnRWRpdG9yLnJlZG8oKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdFZ2dmViLlVuZG8ucmVkbygpO1xyXG5cdFx0fVxyXG5cdFx0VnZ2ZWIuQnVpbGRlci5zZWxlY3ROb2RlKCk7XHJcblx0fSxcclxuXHJcblx0Y2hlY2s6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoJyN0ZXh0YXJlYS1tb2RhbCB0ZXh0YXJlYScpLnZhbChWdnZlYi5CdWlsZGVyLmdldEJlYXV0aWZpZWRIdG1sKCkpO1xyXG5cdFx0JCgnI3RleHRhcmVhLW1vZGFsJykubW9kYWwoKTtcclxuXHR9LFxyXG5cclxuXHR2aWV3cG9ydDogZnVuY3Rpb24gKCkge1xyXG5cdFx0JChcIiNjYW52YXNcIikuYXR0cihcImNsYXNzXCIsIHRoaXMuZGF0YXNldC52aWV3KTtcclxuXHR9LFxyXG5cclxuXHR0b2dnbGVFZGl0b3I6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoXCIjdnZ2ZWItYnVpbGRlclwiKS50b2dnbGVDbGFzcyhcImJvdHRvbS1wYW5lbC1leHBhbmRcIik7XHJcblx0XHRWdnZlYi5Db2RlRWRpdG9yLnRvZ2dsZSgpO1xyXG5cdH0sXHJcblxyXG5cdGRvd25sb2FkKCkge1xyXG5cdFx0ZG93bmxvYWRBc1RleHRGaWxlKCdpbmRleCcsIFZ2dmViLkJ1aWxkZXIuZ2V0QmVhdXRpZmllZEh0bWwoKSk7XHJcblx0fSxcclxuXHJcblx0cHJldmlldzogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCQoJyNsZWZ0LXBhbmVsJykuaXMoJzp2aXNpYmxlJykpIHtcclxuXHRcdFx0c2hvd25QYW5lbCA9ICdsZWZ0LXBhbmVsJztcclxuXHRcdFx0aGlkZGVuUGFuZWwgPSAncmlnaHQtcGFuZWwnO1xyXG5cdFx0XHQkKCcjbGVmdC1wYW5lbCwgI3JpZ2h0LXBhbmVsJykuaGlkZSgpO1xyXG5cdFx0XHRpc1ByZXZpZXcgPSB0cnVlO1xyXG5cdFx0fSBlbHNlIGlmICgkKCcjcmlnaHQtcGFuZWwnKS5pcygnOnZpc2libGUnKSkge1xyXG5cdFx0XHRzaG93blBhbmVsID0gJ3JpZ2h0LXBhbmVsJztcclxuXHRcdFx0aGlkZGVuUGFuZWwgPSAnbGVmdC1wYW5lbCc7XHJcblx0XHRcdCQoJyNsZWZ0LXBhbmVsLCAjcmlnaHQtcGFuZWwnKS5oaWRlKCk7XHJcblx0XHRcdGlzUHJldmlldyA9IHRydWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpc1ByZXZpZXcgPSBmYWxzZTtcclxuXHRcdFx0JChgIyR7c2hvd25QYW5lbH1gKS5zaG93KCk7XHJcblx0XHRcdCQoYCMke2hpZGRlblBhbmVsfWApLmhpZGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHQkKCcjbWVudS1wYW5lbCcpLnRvZ2dsZSgpO1xyXG5cdFx0JChcIiNpZnJhbWUtbGF5ZXJcIikudG9nZ2xlKCk7XHJcblx0XHQkKFwiI3Z2dmViLWJ1aWxkZXJcIikudG9nZ2xlQ2xhc3MoXCJwcmV2aWV3XCIpO1xyXG5cdH0sXHJcblxyXG5cdGZ1bGxzY3JlZW46IGZ1bmN0aW9uICgpIHtcclxuXHRcdGxhdW5jaEZ1bGxTY3JlZW4oZG9jdW1lbnQpOyAvLyB0aGUgd2hvbGUgcGFnZVxyXG5cdH0sXHJcblxyXG5cdGNvbXBvbmVudFNlYXJjaDogZnVuY3Rpb24gKCkge1xyXG5cdFx0c2VhcmNoVGV4dCA9IHRoaXMudmFsdWU7XHJcblxyXG5cdFx0JChcIiNjb21wb25lbnRzLWxpc3QgbGkgb2wgbGlcIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCR0aGlzID0gJCh0aGlzKTtcclxuXHJcblx0XHRcdCR0aGlzLmhpZGUoKTtcclxuXHRcdFx0aWYgKCR0aGlzLmRhdGEoXCJzZWFyY2hcIikuaW5kZXhPZihzZWFyY2hUZXh0KSA+IC0xKSAkdGhpcy5zaG93KCk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRjbGVhckNvbXBvbmVudFNlYXJjaDogZnVuY3Rpb24gKCkge1xyXG5cdFx0JChcIiNjb21wb25lbnQtc2VhcmNoXCIpLnZhbChcIlwiKS5rZXl1cCgpO1xyXG5cdH1cclxufVxyXG5cclxuVnZ2ZWIuRmlsZU1hbmFnZXIgPSB7XHJcblx0dHJlZTogZmFsc2UsXHJcblx0cGFnZXM6IHt9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLnRyZWUgPSAkKFwiI2ZpbGVtYW5hZ2VyIC50cmVlID4gb2xcIikuaHRtbChcIlwiKTtcclxuXHJcblx0XHQkKHRoaXMudHJlZSkub24oXCJjbGlja1wiLCBcImxpW2RhdGEtcGFnZV0gc3BhblwiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAjJHskKHRoaXMpLnBhcmVudHMoJ2xpJykuZGF0YSgncGFnZScpfWA7XHJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuXHRcdFx0Ly8gVnZ2ZWIuRmlsZU1hbmFnZXIubG9hZFBhZ2UoJCh0aGlzKS5wYXJlbnRzKFwibGlcIikuZGF0YShcInBhZ2VcIikpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KVxyXG5cdH0sXHJcblxyXG5cdGdldFBhZ2UobmFtZSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucGFnZXNbbmFtZV07XHJcblx0fSxcclxuXHJcblx0YWRkUGFnZTogZnVuY3Rpb24gKG5hbWUsIHRpdGxlLCB1cmwpIHtcclxuXHJcblx0XHR0aGlzLnBhZ2VzW25hbWVdID0ge1xyXG5cdFx0XHRuYW1lLFxyXG5cdFx0XHR0aXRsZSxcclxuXHRcdFx0dXJsXHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMudHJlZS5hcHBlbmQoXHJcblx0XHRcdHRtcGwoXCJ2dnZlYi1maWxlbWFuYWdlci1wYWdlXCIsIHsgbmFtZSwgdGl0bGUsIHVybCB9KSk7XHJcblx0fSxcclxuXHJcblx0YWRkUGFnZXM6IGZ1bmN0aW9uIChwYWdlcykge1xyXG5cdFx0Zm9yIChwYWdlIGluIHBhZ2VzKSB7XHJcblx0XHRcdHRoaXMuYWRkUGFnZShwYWdlc1twYWdlXVsnbmFtZSddLCBwYWdlc1twYWdlXVsndGl0bGUnXSwgcGFnZXNbcGFnZV1bJ3VybCddKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRhZGRDb21wb25lbnQ6IGZ1bmN0aW9uIChuYW1lLCB1cmwsIHRpdGxlLCBwYWdlKSB7XHJcblx0XHQkKFwiW2RhdGEtcGFnZT0nXCIgKyBwYWdlICsgXCInXSA+IG9sXCIsIHRoaXMudHJlZSkuYXBwZW5kKFxyXG5cdFx0XHR0bXBsKFwidnZ2ZWItZmlsZW1hbmFnZXItY29tcG9uZW50XCIsIHsgbmFtZSwgdXJsLCB0aXRsZSB9KSk7XHJcblx0fSxcclxuXHJcblx0c2hvd0FjdGl2ZShuYW1lKSB7XHJcblx0XHQkKFwiW2RhdGEtcGFnZV1cIiwgdGhpcy50cmVlKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdCQoXCJbZGF0YS1wYWdlPSdcIiArIG5hbWUgKyBcIiddXCIsIHRoaXMudHJlZSkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0fSxcclxuXHJcblx0bG9hZFBhZ2U6IGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0XHQkKFwiW2RhdGEtcGFnZV1cIiwgdGhpcy50cmVlKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdCQoXCJbZGF0YS1wYWdlPSdcIiArIG5hbWUgKyBcIiddXCIsIHRoaXMudHJlZSkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblxyXG5cdFx0VnZ2ZWIuQnVpbGRlci5sb2FkVXJsKHRoaXMucGFnZXNbbmFtZV1bJ3VybCddKTtcclxuXHR9LFxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVnZ2ZWI7IiwiaW1wb3J0IHVudXNlZFRhZ3MgZnJvbSAnLi91bnVzZWRUYWdzJztcclxuaW1wb3J0IHsgZW1wdHlDaGlsZHJlblNlbGVjdG9ycywgdGFibGVTZWxlY3Rvciwgc3VibWl0QnV0dG9uU2VsZWN0b3IgfSBmcm9tICcuL3NlbGVjdG9ycyc7XHJcbmltcG9ydCB0YWJsZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy90YWJsZSc7XHJcbmltcG9ydCBhdXRvc2VsZWN0aW5wdXRUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvYXV0b3NlbGVjdGlucHV0JztcclxuaW1wb3J0IHsgdGVtcGxhdGUgYXMgc3VibWl0Rm9ybVRlbXBsYXRlIH0gZnJvbSAnLi4vdGVtcGxhdGVzL3N1Ym1pdGZvcm0nO1xyXG5pbXBvcnQgdGFibGUgZnJvbSAnLi4vY29tcG9uZW50cy9Ab2VlL3RhYmxlJztcclxuaW1wb3J0IHsgY2FsZW5kYXJTZWxlY3Rvciwgc2V0T25jbGlja0F0dHIgYXMgc2V0Q2FsZW5kYXJPbmNsaWNrQXR0ciB9IGZyb20gJy4vY2FsZW5kYXInO1xyXG5pbXBvcnQgeyBzZXRPbmNsaWNrQXR0ciBhcyBzZXRCdXR0b25PbmNsaWNrQXR0ciB9IGZyb20gJy4vc3VibWl0YnV0dG9uJztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBhbHdheXNUcnVlID0gKCkgPT4gdHJ1ZTtcclxuXHJcbi8vIHRoaXMgcmVmZXJzIHRvIGh0bWwgZWxlbWVudFxyXG5mdW5jdGlvbiByZW1vdmVUYWcoeyBuYW1lLCBmaWx0ZXIgPSBhbHdheXNUcnVlIH0pIHtcclxuICAgIEFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5VGFnTmFtZShuYW1lKSlcclxuICAgICAgICAuZmlsdGVyKGZpbHRlcilcclxuICAgICAgICAuZm9yRWFjaCh0YWcgPT4gdGFnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGFnKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVVudXNlZFRhZ3MoZWwpIHtcclxuICAgIHVudXNlZFRhZ3MuZm9yRWFjaChyZW1vdmVUYWcsIGVsKTtcclxuICAgIHJldHVybiBlbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZW1wdHlDaGlsZHJlbihlbCkge1xyXG4gICAgJChlbCkuZmluZChlbXB0eUNoaWxkcmVuU2VsZWN0b3JzLmpvaW4oJywgJykpLmVtcHR5KCk7XHJcbiAgICByZXR1cm4gZWw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGVuZFNjcmlwdChlbCwganNTdHIpIHtcclxuICAgIGpzU3RyICYmICQoJzxzY3JpcHQ+PC9zY3JpcHQ+JykudGV4dChqc1N0cikuYXBwZW5kVG8oJChlbCkuZmluZCgnYm9keScpKTtcclxuICAgIHJldHVybiBlbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVUYWJsZVNjcmlwdChlbCkge1xyXG4gICAgY29uc3QganNTdHIgPSBBcnJheS5mcm9tKCQoZWwpLmZpbmQodGFibGVTZWxlY3RvcikpLnJlZHVjZSgocHJldiwgZWxlbWVudCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgJHtwcmV2fVxyXG4gICAgICAgICAgICAgICAgJHt0YWJsZVRlbXBsYXRlKCQoZWxlbWVudCksIHRhYmxlKX1gO1xyXG4gICAgfSwgJycpO1xyXG4gICAgcmV0dXJuIGFwcGVuZFNjcmlwdChlbCwganNTdHIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZUNhbGVuZGFyT25jbGlja0F0dHIoZWwpIHtcclxuICAgICQoZWwpLmZpbmQoY2FsZW5kYXJTZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5hdHRyKCdvbmNsaWNrJykgfHwgc2V0Q2FsZW5kYXJPbmNsaWNrQXR0cih0aGlzKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGVsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZVNlbGVjdE9wdGlvbnNTY3JpcHQoZWwpIHtcclxuICAgIHJldHVybiBhcHBlbmRTY3JpcHQoZWwsIGF1dG9zZWxlY3RpbnB1dFRlbXBsYXRlKCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZVN1Ym1pdEZvcm1TY3JpcHQoZWwpIHtcclxuICAgIHJldHVybiBhcHBlbmRTY3JpcHQoZWwsIHN1Ym1pdEZvcm1UZW1wbGF0ZSgpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVCdXR0b25PbmNsaWNrQXR0cihlbCkge1xyXG4gICAgJChlbCkuZmluZChzdWJtaXRCdXR0b25TZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5hdHRyKCdvbmNsaWNrJykgfHwgc2V0QnV0dG9uT25jbGlja0F0dHIodGhpcyk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBlbDtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIHJlbW92ZVVudXNlZFRhZ3MsIGVtcHR5Q2hpbGRyZW4sIGdlbmVyYXRlVGFibGVTY3JpcHQsIGdlbmVyYXRlQ2FsZW5kYXJPbmNsaWNrQXR0cixcclxuICAgIGdlbmVyYXRlU2VsZWN0T3B0aW9uc1NjcmlwdCwgZ2VuZXJhdGVTdWJtaXRGb3JtU2NyaXB0LCBnZW5lcmF0ZUJ1dHRvbk9uY2xpY2tBdHRyXHJcbn07IiwiaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCB1bnVzZWRUYWdzID0gW1xyXG5cdHtcclxuXHRcdG5hbWU6ICdzY3JpcHQnLFxyXG5cdFx0ZmlsdGVyOiB0YWcgPT4gdGFnLmdldEF0dHJpYnV0ZSgnc3JjJylcclxuXHRcdFx0JiYgdGFnLmdldEF0dHJpYnV0ZSgnc3JjJykuaW5jbHVkZXMoJ2lmcmFtZS1kcmFnLW4tZHJvcCcpXHJcblx0fSxcclxuXHR7XHJcblx0XHRuYW1lOiAnbGluaycsXHJcblx0XHRmaWx0ZXI6IHRhZyA9PiB0YWcuZ2V0QXR0cmlidXRlKCdyZWwnKSA9PSAnc3R5bGVzaGVldCdcclxuXHRcdFx0JiYgKHRhZy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5pbmNsdWRlcygnZHJhZy1uLWRyb3AuY3NzJylcclxuXHRcdFx0XHR8fCB0YWcuZ2V0QXR0cmlidXRlKCdocmVmJykuaW5jbHVkZXMoJy9kYXRlcGlja2VyL3NraW4vV2RhdGVQaWNrZXIuY3NzJylcclxuXHRcdFx0fHwgdGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpLmluY2x1ZGVzKCcvbGF5ZXIvc2tpbi9sYXllci5jc3MnKSlcclxuXHR9LFxyXG5cdHtcclxuXHRcdG5hbWU6ICdocicsXHJcblx0XHRmaWx0ZXI6IHRhZyA9PiAkKHRhZykuaGFzQ2xhc3MoJ2hvcml6b250YWwtbGluZScpXHJcblx0XHRcdHx8ICQodGFnKS5oYXNDbGFzcygndmVydGljYWwtbGluZScpXHJcblx0fVxyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdW51c2VkVGFnczsiLCJpbXBvcnQgeyBmdW5jdGlvbk5hbWUgfSBmcm9tICcuLi90ZW1wbGF0ZXMvc3VibWl0Zm9ybSc7XHJcbmltcG9ydCAkIGZyb20gJy4uLy4uL2pzL2pxdWVyeS5taW4nO1xyXG5cclxuZnVuY3Rpb24gc2V0T25jbGlja0F0dHIobm9kZSkge1xyXG4gICAgcmV0dXJuICQobm9kZSkuYXR0cignb25jbGljaycsIGAke2Z1bmN0aW9uTmFtZX0odGhpcylgKTtcclxufVxyXG5cclxuZXhwb3J0IHsgc2V0T25jbGlja0F0dHIgfTsiLCJpbXBvcnQgeyBkYXRhVGFibGVJZCB9IGZyb20gXCIuLi9jb21wb25lbnRzL2NvbW1vblwiO1xyXG5cclxubGV0IGluZGV4ID0gMTtcclxuXHJcbmZ1bmN0aW9uIHRlbXBsYXRlKG5vZGUsIHRhYmxlKSB7XHJcbiAgICBjb25zdCBpZCA9IG5vZGUuYXR0cignaWQnKSB8fCAobm9kZS5hdHRyKCdpZCcsIGB0YWJsZSR7aW5kZXgrK31gKSwgbm9kZS5hdHRyKCdpZCcpKTtcclxuICAgIGNvbnN0IGtleSA9IG5vZGUuYXR0cihkYXRhVGFibGVJZCk7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgdmFyIGNvbHVtbkRlZnMke2tleX0gPSBbXHJcbiAgICAgICAgJHt0YWJsZS5nZXRUYWJsZShrZXkpLmNvbHVtbkRlZnMubWFwKGRlZiA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBge2hlYWRlck5hbWU6IFwiJHtkZWYuaGVhZGVyTmFtZX1cIiwgZmllbGQ6IFwiJHtkZWYuZmllbGR9XCIsIHdpZHRoOiAke2RlZi53aWR0aCA/IGRlZi53aWR0aCA6ICdcIlwiJ319YDtcclxuICAgICAgICB9KS5qb2luKCcsJyl9XHJcbiAgICBdO1xyXG4gICAgdmFyIGdyaWRPcHRpb25zJHtrZXl9ID0ge1xyXG4gICAgICAgIGNvbHVtbkRlZnM6IGNvbHVtbkRlZnMke2tleX0sXHJcbiAgICAgICAgZW5hYmxlU29ydGluZzogZmFsc2UsXHJcbiAgICAgICAgZW5hYmxlRmlsdGVyOiBmYWxzZVxyXG4gICAgICB9O1xyXG4gICAgdmFyIGVHcmlkRGl2JHtrZXl9ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIyR7aWR9Jyk7XHJcbiAgICBuZXcgYWdHcmlkLkdyaWQoZUdyaWREaXYke2tleX0sIGdyaWRPcHRpb25zJHtrZXl9KTtcclxuICAgIGdyaWRPcHRpb25zJHtrZXl9LmFwaS5zZXRSb3dEYXRhKFtdKTtcclxuICAgIGA7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRlbXBsYXRlO1xyXG5cclxuIiwiaW1wb3J0IHsgZGF0YVRhYmxlSWQgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb21tb25cIjtcclxuXHJcbmNvbnN0IGZ1bmN0aW9uTmFtZSA9ICdzdWJtaXRGb3JtJztcclxuZnVuY3Rpb24gdGVtcGxhdGUoKSB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAgIHZhciBncmlkT3B0aW9uc0lkZW50aWZpZXIgPSB3aW5kb3dbJ2dyaWRPcHRpb25zJyArICQoJ1ske2RhdGFUYWJsZUlkfV0nKS5hdHRyKCcke2RhdGFUYWJsZUlkfScpXTtcclxuICAgICAgICBmdW5jdGlvbiAke2Z1bmN0aW9uTmFtZX0oZWxlbWVudCwgZm9ybUlkKSB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAvLyB1cmw6IGNvbmZpZy5mdW5kb2Rvb1dlYkRvbWFpblVybCArICQoZWxlbWVudCkuYXR0cignZGF0YS11cmwnKSxcclxuICAgICAgICAgICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hcGkvZGF0YScsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kIDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogKGZvcm1JZCA/ICQoJyNmb3JtSWQnKSA6ICQoJ2Zvcm0nKSkuc2VyaWFsaXplSlNPTigpLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJzLCBzdGF0dXMsIHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChycy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkT3B0aW9uc0lkZW50aWZpZXIuYXBpLnNldFJvd0RhdGEocnMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICBgO1xyXG59XHJcblxyXG5leHBvcnQgeyB0ZW1wbGF0ZSwgZnVuY3Rpb25OYW1lIH07IiwiaW1wb3J0IHsgZGF0YVVybCwgZGF0YVZhbHVlTWFwcGluZywgZGF0YVRleHRNYXBwaW5nIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY29tbW9uXCI7XHJcbmltcG9ydCB7IGF1dG9zZWxlY3RpbnB1dFNlbGVjdG9yIH0gZnJvbSAnLi4vdXRpbC9zZWxlY3RvcnMnO1xyXG5cclxuZnVuY3Rpb24gdGVtcGxhdGUoKSB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlT3B0aW9ucyhlbCwgcmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gJChlbCkuYXR0cignJHtkYXRhVmFsdWVNYXBwaW5nfScpIHx8ICd2YWx1ZSc7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gJChlbCkuYXR0cignJHtkYXRhVGV4dE1hcHBpbmd9JykgfHwgJ3RleHQnO1xyXG4gICAgICAgICAgICByZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIChvcHRpb24pIHtcclxuICAgICAgICAgICAgICAgICQoJzxvcHRpb24+PC9vcHRpb24+JylcclxuICAgICAgICAgICAgICAgICAgICAudmFsKG9wdGlvblt2YWx1ZV0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRleHQob3B0aW9uW3RleHRdKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkKGVsKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBBcnJheS5mcm9tKCQoJ2JvZHknKS5maW5kKCcke2F1dG9zZWxlY3RpbnB1dFNlbGVjdG9yfScpKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoZWwpLmF0dHIoJyR7ZGF0YVVybH0nKTtcclxuICAgICAgICAgICAgfSkuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAkKGVsKS5hdHRyKCcke2RhdGFVcmx9JyksXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVPcHRpb25zKGVsLCByZXNwb25zZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIGA7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRlbXBsYXRlOyIsImltcG9ydCB7IGRhdGFUYWJsZUlkLCBkYXRhQXV0b1NlbGVjdElkLCBkYXRhQnV0dG9uSWQgfSBmcm9tICcuLi9jb21wb25lbnRzL2NvbW1vbic7XHJcbmltcG9ydCAkIGZyb20gJy4uLy4uL2pzL2pxdWVyeS5taW4nO1xyXG5cclxuY29uc3QgdGFibGVTZWxlY3RvciA9IGBbJHtkYXRhVGFibGVJZH1dYDtcclxuY29uc3QgZW1wdHlDaGlsZHJlblNlbGVjdG9ycyA9IFt0YWJsZVNlbGVjdG9yXTtcclxuY29uc3QgYXV0b3NlbGVjdGlucHV0U2VsZWN0b3IgPSBgWyR7ZGF0YUF1dG9TZWxlY3RJZH1dYDtcclxuY29uc3Qgc3VibWl0QnV0dG9uU2VsZWN0b3IgPSBgYnV0dG9uWyR7ZGF0YUJ1dHRvbklkfV1gO1xyXG5jb25zdCBwYXJlbnRTZWxlY3RvciA9IFt0YWJsZVNlbGVjdG9yXS5qb2luKCcsICcpO1xyXG5cclxuZnVuY3Rpb24gZ2V0UGFyZW50T3JTZWxmKG5vZGUpIHtcclxuICAgIGNvbnN0IHBhcmVudHMgPSAkKG5vZGUpLnBhcmVudHMocGFyZW50U2VsZWN0b3IpO1xyXG4gICAgcmV0dXJuIHBhcmVudHMubGVuZ3RoID8gcGFyZW50c1swXSA6IG5vZGU7XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBlbXB0eUNoaWxkcmVuU2VsZWN0b3JzLCB0YWJsZVNlbGVjdG9yLCBhdXRvc2VsZWN0aW5wdXRTZWxlY3Rvciwgc3VibWl0QnV0dG9uU2VsZWN0b3IsXHJcbiAgICBwYXJlbnRTZWxlY3RvciwgZ2V0UGFyZW50T3JTZWxmXHJcbn07IiwiaW1wb3J0IHsgQnV0dG9uSW5wdXQsIFRleHRWYWx1ZUlucHV0LCBTZWxlY3RJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBkYXRhQ29tcG9uZW50SWQsIGRhdGFUYWJsZUlkIH0gZnJvbSAnLi4vY29tbW9uJztcclxuaW1wb3J0IFZ2dmViIGZyb20gJy4uLy4uL2J1aWxkZXInO1xyXG5pbXBvcnQgJCBmcm9tICcuLi8uLi8uLi9qcy9qcXVlcnkubWluJztcclxuXHJcbmNvbnN0IHRhYmxlcyA9IHt9O1xyXG5sZXQgaW5kZXggPSAxO1xyXG5mdW5jdGlvbiBzZXRDb2x1bW5EZWZzQW5kUmVuZGVyKG5vZGUsIGNvbERlZnMpIHtcclxuICAgIC8vIENhbGwgdG8gc2V0IG5ldyBjb2x1bW4gZGVmaW5pdGlvbnMgaW50byB0aGUgZ3JpZC4gXHJcbiAgICAvLyBUaGUgZ3JpZCB3aWxsIHJlZHJhdyBhbGwgdGhlIGNvbHVtbiBoZWFkZXJzLCBhbmQgdGhlbiByZWRyYXcgYWxsIG9mIHRoZSByb3dzLlxyXG4gICAgdGFibGVzWyQobm9kZSkuYXR0cihkYXRhVGFibGVJZCldLmFwaS5zZXRDb2x1bW5EZWZzKGNvbERlZnMpO1xyXG4gICAgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIoXCJodG1sL3RhYmxlQG9lZVwiKTtcclxufVxyXG5cclxuY29uc3QgdGFibGUgPSB7XHJcbiAgICBub2RlczogW1widGFibGVcIl0sXHJcbiAgICBjbGFzc2VzOiBbXCJ0YWJsZVwiXSxcclxuICAgIGltYWdlOiBcImljb25zL3RhYmxlLnN2Z1wiLFxyXG4gICAgbmFtZTogXCJhZy1HcmlkXCIsXHJcbiAgICBodG1sOiBgPGRpdiAke2RhdGFDb21wb25lbnRJZH09XCJodG1sL3RhYmxlQG9lZVwiIHN0eWxlPVwid2lkdGg6IDUwMHB4OyBoZWlnaHQ6IDIwMHB4O1wiIGNsYXNzPVwiZHJvcHpvbmUgZHJhZ2dhYmxlIGFnLXRoZW1lLWJsdWUgaG9yaXpvbnRhbC1zdHJpcGVzXCI+PC9kaXY+YCxcclxuICAgIG9uRHJvcChub2RlKSB7XHJcbiAgICAgICAgJChub2RlKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogJ2NhbGMoMTAwJSAtIDI1cHgpJyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJycsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiAnJyxcclxuICAgICAgICAgICAgICAgIHRvcDogJycsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICcnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZHJhZ2dhYmxlJyk7XHJcbiAgICAgICAgVnZ2ZWIuQnVpbGRlci5mcmFtZUJvZHkuZmluZCgnLmNvbnRhaW5lclJpZ2h0IC5hbGxDb250ZW50IC50b3BDb250ZW50IC5jb250YWluZXIgLnJvdyAuZXZlcnlCb3ggLmJveGFyZWEnKS5hcHBlbmQoJChub2RlKS5wcm9wKCdvdXRlckhUTUwnKSk7XHJcbiAgICAgICAgJChub2RlKS5yZW1vdmUoKTtcclxuICAgIH0sXHJcbiAgICBnZXRUYWJsZShrZXkpIHtcclxuICAgICAgICByZXR1cm4gdGFibGVzW2tleV07XHJcbiAgICB9LFxyXG4gICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAkKG5vZGUpLnJlbW92ZUNsYXNzKCdob3Jpem9udGFsLXN0cmlwZXMnKTtcclxuICAgICAgICBpZiAoISQobm9kZSkuYXR0cihkYXRhVGFibGVJZCkpIHtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSBpbmRleCsrO1xyXG4gICAgICAgICAgICAkKG5vZGUpLmF0dHIoZGF0YVRhYmxlSWQsIGlkKTtcclxuICAgICAgICAgICAgdGFibGVzW2lkXSA9IHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbkRlZnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IGhlYWRlck5hbWU6IFwiaGVhZGVyXCIsIGZpZWxkOiBcImZpbGVkXCIsIHdpZHRoOiAnJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgaGVhZGVyTmFtZTogXCJoZWFkZXJcIiwgZmllbGQ6IFwiZmllbGRcIiwgd2lkdGg6ICcnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBoZWFkZXJOYW1lOiBcImhlYWRlclwiLCBmaWVsZDogXCJmaWVsZFwiLCB3aWR0aDogJycgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZVNvcnRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlRmlsdGVyOiBmYWxzZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBuZXcgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpZnJhbWVJZCcpLmNvbnRlbnRXaW5kb3cuYWdHcmlkKS5HcmlkKG5vZGUsIHRhYmxlc1tpZF0pO1xyXG4gICAgICAgICAgICB0YWJsZXNbaWRdLmFwaS5zZXRSb3dEYXRhKFtdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0YWJsZXNbJChub2RlKS5hdHRyKGRhdGFUYWJsZUlkKV0uY29sdW1uRGVmcy5yZWR1Y2UoKHByZXYsIGN1cikgPT4ge1xyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIHByZXYucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkhlYWRlciBcIiArIGksXHJcbiAgICAgICAgICAgICAgICBrZXk6IFwib3B0aW9uXCIgKyBpLFxyXG4gICAgICAgICAgICAgICAgLy9pbmRleDogaSAtIDEsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25Ob2RlOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgaW5wdXR0eXBlOiBUZXh0VmFsdWVJbnB1dCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ3RhYmxlaGVhZGVyQG9lZScsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyTmFtZTogY3VyLmhlYWRlck5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGN1ci5maWVsZCxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogY3VyLndpZHRoXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXlJbmRleCA9IHBhcnNlSW50KHRoaXMua2V5LnN1YnN0cignb3B0aW9uJy5sZW5ndGgpKSAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbERlZnMgPSB0YWJsZXNbJChub2RlKS5hdHRyKGRhdGFUYWJsZUlkKV0uY29sdW1uRGVmcztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQubm9kZU5hbWUgPT0gJ0JVVFRPTicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sRGVmcyA9IGNvbERlZnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKHZhbHVlLCBpbmRleCkgPT4gaW5kZXggIT0ga2V5SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZXNbJChub2RlKS5hdHRyKGRhdGFUYWJsZUlkKV0uY29sdW1uRGVmcyA9IGNvbERlZnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbHVtbkRlZnNBbmRSZW5kZXIobm9kZSwgY29sRGVmcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Lm5hbWUgPT0gJ3dpZHRoJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sRGVmc1trZXlJbmRleF1baW5wdXQubmFtZV0gPSB2YWx1ZSAmJiBwYXJzZUludCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xEZWZzW2tleUluZGV4XVtpbnB1dC5uYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOmHjeaWsOa4suafk+S8muWkseWOu+i+k+WFpeahhueEpueCue+8jOWPqumcgOimgeeUqOaWsOeahGNvbERlZnPmm7TmlrDooajmoLzljbPlj6/vvIzlj7PkvqfnmoTpg6jliIbkuI3pnIDopoHph43mlrDmuLLmn5PjgIJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVzWyQobm9kZSkuYXR0cihkYXRhVGFibGVJZCldLmFwaS5zZXRDb2x1bW5EZWZzKGNvbERlZnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJldjtcclxuICAgICAgICB9LCBbXSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHRoaXMucHJvcGVydGllcy5maWx0ZXIocHJvcGVydHkgPT4gcHJvcGVydHkua2V5LmluZGV4T2YoXCJvcHRpb25cIikgPT09IC0xKTtcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMudW5zaGlmdCguLi5wcm9wZXJ0aWVzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9LFxyXG4gICAgcHJvcGVydGllczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJUaGVtZVwiLFxyXG4gICAgICAgICAgICBrZXk6IFwidGhlbWVcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFsnYWctdGhlbWUtYmFsaGFtLWRhcmsnLCAnYWctdGhlbWUtYmFsaGFtJywgJ2FnLXRoZW1lLWJsdWUnLCAnYWctdGhlbWUtYm9vdHN0cmFwJyxcclxuICAgICAgICAgICAgICAgICdhZy10aGVtZS1kYXJrJywgJ2FnLXRoZW1lLWZyZXNoJywgJ2FnLXRoZW1lLW1hdGVyaWFsJ10sXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQ2xhc3ModGhpcy52YWxpZFZhbHVlcy5qb2luKFwiIFwiKSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmFkZENsYXNzKHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb2RlIGNvcGllZCBmb3JtIG9mZmljaWFsIHNpdGUgZXhhbXBsZSBodHRwczovL3d3dy5hZy1ncmlkLmNvbS9leGFtcGxlLnBocCMvXHJcbiAgICAgICAgICAgICAgICBjb25zdCBncmlkT3B0aW9ucyA9IHRhYmxlc1tub2RlLmF0dHIoZGF0YVRhYmxlSWQpXTtcclxuICAgICAgICAgICAgICAgIGdyaWRPcHRpb25zLmFwaS5yZXNldFJvd0hlaWdodHMoKTtcclxuICAgICAgICAgICAgICAgIGdyaWRPcHRpb25zLmFwaS5yZWRyYXdSb3dzKCk7XHJcbiAgICAgICAgICAgICAgICBncmlkT3B0aW9ucy5hcGkucmVmcmVzaEhlYWRlcigpO1xyXG4gICAgICAgICAgICAgICAgZ3JpZE9wdGlvbnMuYXBpLnJlZnJlc2hUb29sUGFuZWwoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJEZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImFnLXRoZW1lLWJhbGhhbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQmFsaGFtXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJhZy10aGVtZS1iYWxoYW0tZGFya1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQmFsaGFtIChkYXJrKVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiYWctdGhlbWUtYmx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQmx1ZVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiYWctdGhlbWUtYm9vdHN0cmFwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJCb290c3RyYXBcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImFnLXRoZW1lLWRhcmtcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhcmtcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImFnLXRoZW1lLWZyZXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJGcmVzaFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiYWctdGhlbWUtbWF0ZXJpYWxcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIk1hdGVyaWFsXCJcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICAgICAga2V5OiBcImFkZENoaWxkXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQnV0dG9uSW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHsgdGV4dDogXCJBZGQgaGVhZGVyXCIgfSxcclxuICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xEZWZzID0gdGFibGVzWyQobm9kZSkuYXR0cihkYXRhVGFibGVJZCldLmNvbHVtbkRlZnM7XHJcbiAgICAgICAgICAgICAgICBjb2xEZWZzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlck5hbWU6ICdoZWFkZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiAnZmllbGQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0Q29sdW1uRGVmc0FuZFJlbmRlcihub2RlLCBjb2xEZWZzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhYmxlOyIsImltcG9ydCAkIGZyb20gJy4uLy4uL2pzL2pxdWVyeS5taW4nO1xyXG5cclxuZnVuY3Rpb24gaHRtbEdlbmVyYXRvcihodG1sLCAuLi5mbnMpIHtcclxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHRtbCcpO1xyXG4gICAgZWwuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIGZucy5yZWR1Y2UoKGVsLCBmbikgPT4gZm4oZWwpLCBlbCk7XHJcbiAgICByZXR1cm4gJChlbCkucHJvcCgnb3V0ZXJIVE1MJyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGh0bWxHZW5lcmF0b3I7IiwiLy8gVG9nZ2xlIGZ1bGxzY3JlZW5cclxuZnVuY3Rpb24gbGF1bmNoRnVsbFNjcmVlbihkb2N1bWVudCkge1xyXG4gICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbFNjcmVlbikge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQuRnVsbFNjcmVlbkVsZW1lbnQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmV4aXRGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICAvL21vemlsbGFcdFx0XHJcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQubW96RnVsbFNjcmVlbkVsZW1lbnQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgIC8vd2Via2l0XHQgIFxyXG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50KVxyXG4gICAgICAgICAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgLy9pZVx0ICBcclxuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50Lm1zRnVsbFNjcmVlbkVsZW1lbnQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IGxhdW5jaEZ1bGxTY3JlZW4gfTsiLCJmdW5jdGlvbiBkb3dubG9hZEFzVGV4dEZpbGUoZmlsZW5hbWUsIHRleHQpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaHJlZicsIGBkYXRhOnRleHQvaHRtbDtjaGFyc2V0PXV0Zi04LCR7ZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpfWApO1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgZmlsZW5hbWUpO1xyXG5cclxuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcblxyXG4gICAgZWxlbWVudC5jbGljaygpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGRvd25sb2FkQXNUZXh0RmlsZSB9OyIsImZ1bmN0aW9uIGdldFN0eWxlKGVsLCBzdHlsZVByb3ApIHtcclxuICAgIHZhbHVlID0gXCJcIjtcclxuICAgIC8vdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWwpO1xyXG4gICAgaWYgKGVsLnN0eWxlICYmIGVsLnN0eWxlLmxlbmd0aCA+IDAgJiYgZWwuc3R5bGVbc3R5bGVQcm9wXSkvL2NoZWNrIGlubGluZVxyXG4gICAgICAgIHZhciB2YWx1ZSA9IGVsLnN0eWxlW3N0eWxlUHJvcF07XHJcbiAgICBlbHNlXHJcbiAgICAgICAgaWYgKGVsLmN1cnJlbnRTdHlsZSlcdC8vY2hlY2sgZGVmaW5lZCBjc3NcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZWwuY3VycmVudFN0eWxlW3N0eWxlUHJvcF07XHJcbiAgICAgICAgZWxzZSBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0RGVmYXVsdENvbXB1dGVkU3R5bGUgP1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0RGVmYXVsdENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoc3R5bGVQcm9wKSA6XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZVByb3ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGdldFN0eWxlIH07IiwiaW1wb3J0IHsgZGF0YUNvbmZpZ0luZm8sIGRhdGFDYWxlbmRhcklkIH0gZnJvbSAnLi4vY29tcG9uZW50cy9jb21tb24nO1xyXG5pbXBvcnQgJCBmcm9tICcuLi8uLi9qcy9qcXVlcnkubWluJztcclxuXHJcbmNvbnN0IGNhbGVuZGFyU2VsZWN0b3IgPSBgaW5wdXRbJHtkYXRhQ2FsZW5kYXJJZH1dYDtcclxuY29uc3QgY2FsZW5kYXJPbmNsaWNrU2VsZWN0b3IgPSBgaW5wdXRbJHtkYXRhQ2FsZW5kYXJJZH1dW29uY2xpY2tdYDtcclxuLy8gPGlucHV0IGRhdGEtaWQ9XCJ7J2EnLCBifVwiPiDmm7/mjaLljIXlkKsnXFwnJ+eahOWxnuaAp+WAvOS4uuWQiOazleeahGpzb27lrZfnrKbkuLJcclxuZnVuY3Rpb24gZ2V0RGF0YUNvbmZpZ0luZm8obm9kZSkge1xyXG4gICAgcmV0dXJuICQobm9kZSkuYXR0cihkYXRhQ29uZmlnSW5mbyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERhdGFDb25maWdJbmZvSlNPTlN0cmluZyhub2RlKSB7XHJcbiAgICByZXR1cm4gZ2V0RGF0YUNvbmZpZ0luZm8obm9kZSkucmVwbGFjZSgvJy9nLCAnXCInKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0RGF0YUNvbmZpZ0luZm8obm9kZSwgbmV3VmFsdWUpIHtcclxuICAgICQobm9kZSkuYXR0cihkYXRhQ29uZmlnSW5mbywgSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpLnJlcGxhY2UoL1wiL2csICdcXCcnKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldE9uY2xpY2tBdHRyKG5vZGUpIHtcclxuICAgIHJldHVybiAkKG5vZGUpLmF0dHIoJ29uY2xpY2snLCBgV2RhdGVQaWNrZXIoJHtnZXREYXRhQ29uZmlnSW5mbyhub2RlKX0pYCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFBhcnNlZENvbmZpZ0luZm8obm9kZSkge1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoZ2V0RGF0YUNvbmZpZ0luZm9KU09OU3RyaW5nKG5vZGUpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF0ZUZtdChub2RlKSB7XHJcbiAgICByZXR1cm4gZ2V0UGFyc2VkQ29uZmlnSW5mbyhub2RlKS5kYXRlRm10O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9uZVdpdGhvdXRPbmNsaWNrKG5vZGUpIHtcclxuICAgIGNvbnN0ICRjbG9uZSA9ICQobm9kZSkucmVtb3ZlQXR0cignb25jbGljaycpLmNsb25lKCk7XHJcbiAgICAkKG5vZGUpLnJlcGxhY2VXaXRoKCRjbG9uZSk7XHJcbiAgICByZXR1cm4gJGNsb25lO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXBsYWNlT3RoZXJTaG93aW5nQ2FsZW5kYXJJbnB1dHMoZWxlbWVudCwgY29udGV4dCkge1xyXG4gICAgaWYgKCEkKGVsZW1lbnQpLmlzKGNhbGVuZGFyT25jbGlja1NlbGVjdG9yKSkge1xyXG4gICAgICAgIGNvbnRleHQuZmluZChjYWxlbmRhck9uY2xpY2tTZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNsb25lV2l0aG91dE9uY2xpY2sodGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICByZXBsYWNlT3RoZXJTaG93aW5nQ2FsZW5kYXJJbnB1dHMsIGNsb25lV2l0aG91dE9uY2xpY2ssXHJcbiAgICBjYWxlbmRhclNlbGVjdG9yLCBjYWxlbmRhck9uY2xpY2tTZWxlY3RvcixcclxuICAgIGdldERhdGFDb25maWdJbmZvLCBnZXREYXRlRm10LCBnZXRQYXJzZWRDb25maWdJbmZvLFxyXG4gICAgc2V0T25jbGlja0F0dHIsIHNldERhdGFDb25maWdJbmZvXHJcbn07IiwiLypcclxuQ29weXJpZ2h0IDIwMTcgWmlhZGluIEdpdmFuXHJcblxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cclxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcblxyXG5odHRwczovL2dpdGh1Yi5jb20vZ2l2YW56L1Z2dmViSnNcclxuKi9cclxuaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5pbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuaW1wb3J0IENoZWNrYm94SW5wdXQgZnJvbSAnLi9DaGVja2JveElucHV0JztcclxuaW1wb3J0IFNlbGVjdElucHV0IGZyb20gJy4vU2VsZWN0SW5wdXQnO1xyXG5pbXBvcnQgTGlua0lucHV0IGZyb20gJy4vTGlua0lucHV0JztcclxuaW1wb3J0IFJhbmdlSW5wdXQgZnJvbSAnLi9SYW5nZUlucHV0JztcclxuaW1wb3J0IE51bWJlcklucHV0IGZyb20gJy4vTnVtYmVySW5wdXQnO1xyXG5pbXBvcnQgQ3NzVW5pdElucHV0IGZyb20gJy4vQ3NzVW5pdElucHV0JztcclxuaW1wb3J0IENvbG9ySW5wdXQgZnJvbSAnLi9Db2xvcklucHV0JztcclxuaW1wb3J0IEZpbGVVcGxvYWRJbnB1dCBmcm9tICcuL0ZpbGVVcGxvYWRJbnB1dCc7XHJcbmltcG9ydCBSYWRpb0lucHV0IGZyb20gJy4vUmFkaW9JbnB1dCc7XHJcbmltcG9ydCBSYWRpb0J1dHRvbklucHV0IGZyb20gJy4vUmFkaW9CdXR0b25JbnB1dCc7XHJcbmltcG9ydCBUb2dnbGVJbnB1dCBmcm9tICcuL1RvZ2dsZUlucHV0JztcclxuaW1wb3J0IFZhbHVlVGV4dElucHV0IGZyb20gJy4vVmFsdWVUZXh0SW5wdXQnO1xyXG5pbXBvcnQgR3JpZExheW91dElucHV0IGZyb20gJy4vR3JpZExheW91dElucHV0JztcclxuaW1wb3J0IFByb2R1Y3RzSW5wdXQgZnJvbSAnLi9Qcm9kdWN0c0lucHV0JztcclxuaW1wb3J0IEdyaWRJbnB1dCBmcm9tICcuL0dyaWRJbnB1dCc7XHJcbmltcG9ydCBUZXh0VmFsdWVJbnB1dCBmcm9tICcuL1RleHRWYWx1ZUlucHV0JztcclxuaW1wb3J0IEJ1dHRvbklucHV0IGZyb20gJy4vQnV0dG9uSW5wdXQnO1xyXG5pbXBvcnQgU2VjdGlvbklucHV0IGZyb20gJy4vU2VjdGlvbklucHV0JztcclxuaW1wb3J0IExpc3RJbnB1dCBmcm9tICcuL0xpc3RJbnB1dCc7XHJcblxyXG5leHBvcnQge1xyXG5cdElucHV0LCBUZXh0SW5wdXQsIENoZWNrYm94SW5wdXQsIFNlbGVjdElucHV0LCBMaW5rSW5wdXQsIFJhbmdlSW5wdXQsIE51bWJlcklucHV0LCBDc3NVbml0SW5wdXQsXHJcblx0UmFkaW9JbnB1dCwgUmFkaW9CdXR0b25JbnB1dCwgVG9nZ2xlSW5wdXQsIFZhbHVlVGV4dElucHV0LCBHcmlkTGF5b3V0SW5wdXQsIFByb2R1Y3RzSW5wdXQsIEdyaWRJbnB1dCxcclxuXHRUZXh0VmFsdWVJbnB1dCwgQnV0dG9uSW5wdXQsIFNlY3Rpb25JbnB1dCwgTGlzdElucHV0LCBDb2xvcklucHV0LCBGaWxlVXBsb2FkSW5wdXRcclxufTsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBWYWx1ZVRleHRJbnB1dCA9ICQuZXh0ZW5kKHt9LCBUZXh0SW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWYWx1ZVRleHRJbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBUb2dnbGVJbnB1dCA9ICQuZXh0ZW5kKHt9LCBUZXh0SW5wdXQsIHtcclxuXHJcblx0b25DaGFuZ2U6IGZ1bmN0aW9uIChldmVudCwgbm9kZSkge1xyXG5cdFx0aWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS5lbGVtZW50KSB7XHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt0aGlzLmNoZWNrZWQgPyB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtdmFsdWUtb25cIikgOiB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtdmFsdWUtb2ZmXCIpLCB0aGlzXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0b2dnbGVcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVG9nZ2xlSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5pbXBvcnQgJCBmcm9tICcuLi8uLi9qcy9qcXVlcnkubWluJztcclxuXHJcbmNvbnN0IFRleHRWYWx1ZUlucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XHRbXCJjbGlja1wiLCBcIm9uQ2hhbmdlXCIsIFwiYnV0dG9uXCIgLyonc2VsZWN0JyovXSxcclxuXHRdLFxyXG5cclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHR2YWx1ZVwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGV4dFZhbHVlSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5pbXBvcnQgJCBmcm9tICcuLi8uLi9qcy9qcXVlcnkubWluJztcclxuXHJcbmNvbnN0IFNlbGVjdElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG4gICAgZXZlbnRzOiBbXHJcbiAgICAgICAgW1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJzZWxlY3RcIl0sXHJcbiAgICBdLFxyXG5cclxuXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgJCgnc2VsZWN0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcihcInNlbGVjdFwiLCBkYXRhKTtcclxuICAgIH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcbmltcG9ydCAkIGZyb20gJy4uLy4uL2pzL2pxdWVyeS5taW4nO1xyXG5cclxuY29uc3QgU2VjdGlvbklucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2xpY2tcIiwgXCJvbkNoYW5nZVwiLCBcImJ1dHRvblwiIC8qJ3NlbGVjdCcqL10sXHJcblx0XSxcclxuXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwic2VjdGlvbmlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWN0aW9uSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5pbXBvcnQgJCBmcm9tICcuLi8uLi9qcy9qcXVlcnkubWluJztcclxuXHJcbmNvbnN0IFJhbmdlSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJyYW5nZWlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhbmdlSW5wdXQ7IiwiaW1wb3J0IFJhZGlvSW5wdXQgZnJvbSAnLi9SYWRpb0lucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBSYWRpb0J1dHRvbklucHV0ID0gJC5leHRlbmQoe30sIFJhZGlvSW5wdXQsIHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcihcInJhZGlvYnV0dG9uaW5wdXRcIiwgZGF0YSk7XHJcbiAgICB9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYWRpb0J1dHRvbklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBSYWRpb0lucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQsIG5vZGUpIHtcclxuXHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpIHtcclxuXHRcdFx0ZXZlbnQuZGF0YS5lbGVtZW50LnRyaWdnZXIoJ3Byb3BlcnR5Q2hhbmdlJywgW3RoaXMudmFsdWUsIHRoaXNdKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnJlbW92ZUF0dHIoJ2NoZWNrZWQnKTtcclxuXHRcdGlmICh2YWx1ZSlcclxuXHRcdFx0JChcImlucHV0W3ZhbHVlPVwiICsgdmFsdWUgKyBcIl1cIiwgdGhpcy5lbGVtZW50KS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInJhZGlvaW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmFkaW9JbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBQcm9kdWN0c0lucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImtleXVwXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RzSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5pbXBvcnQgJCBmcm9tICcuLi8uLi9qcy9qcXVlcnkubWluJztcclxuXHJcbnZhciBOdW1iZXJJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcIm51bWJlcmlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE51bWJlcklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBMaXN0SW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcInNlbGVjdFwiXSxcclxuXHRdLFxyXG5cclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnc2VsZWN0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJsaXN0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpc3RJbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBMaW5rSW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbmtJbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBHcmlkTGF5b3V0SW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR3JpZExheW91dElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBHcmlkSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwic2VsZWN0XCIgLyonc2VsZWN0JyovXSxcclxuXHRcdFtcImNsaWNrXCIsIFwib25DaGFuZ2VcIiwgXCJidXR0b25cIiAvKidzZWxlY3QnKi9dLFxyXG5cdF0sXHJcblxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdzZWxlY3QnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImdyaWRcIiwgZGF0YSk7XHJcblx0fSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdyaWRJbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBGaWxlVXBsb2FkSW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmlsZVVwbG9hZElucHV0O1xyXG4iLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcbmltcG9ydCAkIGZyb20gJy4uLy4uL2pzL2pxdWVyeS5taW4nO1xyXG5cclxuY29uc3QgVGV4dElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG4gICAgZXZlbnRzOiBbXHJcbiAgICAgICAgW1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdCBdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblx0XHJcblx0aW5pdDogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbiAgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGV4dElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBDc3NVbml0SW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0bnVtYmVyOiAwLFxyXG5cdHVuaXQ6IFwicHhcIixcclxuXHJcblx0b25DaGFuZ2U6IGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuXHRcdGlmIChldmVudC5kYXRhICYmIGV2ZW50LmRhdGEuZWxlbWVudCkge1xyXG5cdFx0XHRpbnB1dCA9IGV2ZW50LmRhdGEuaW5wdXQ7XHJcblx0XHRcdGlucHV0W3RoaXMubmFtZV0gPSB0aGlzLnZhbHVlOy8vIHRoaXMubmFtZSA9IHVuaXQgb3IgbnVtYmVyXHRcclxuXHJcblx0XHRcdHZhbHVlID0gXCJcIjtcclxuXHRcdFx0aWYgKGlucHV0LnVuaXQgPT0gXCJhdXRvXCIpIHtcclxuXHRcdFx0XHQkKGV2ZW50LmRhdGEuZWxlbWVudCkuYWRkQ2xhc3MoXCJhdXRvXCIpO1xyXG5cdFx0XHRcdHZhbHVlID0gaW5wdXQudW5pdDtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHQkKGV2ZW50LmRhdGEuZWxlbWVudCkucmVtb3ZlQ2xhc3MoXCJhdXRvXCIpO1xyXG5cdFx0XHRcdHZhbHVlID0gaW5wdXQubnVtYmVyICsgaW5wdXQudW5pdDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZXZlbnQuZGF0YS5lbGVtZW50LnRyaWdnZXIoJ3Byb3BlcnR5Q2hhbmdlJywgW3ZhbHVlLCB0aGlzXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcInNlbGVjdFwiXSxcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0dGhpcy5udW1iZXIgPSBwYXJzZUludCh2YWx1ZSk7XHJcblx0XHR0aGlzLnVuaXQgPSB2YWx1ZS5yZXBsYWNlKHRoaXMubnVtYmVyLCAnJyk7XHJcblxyXG5cdFx0aWYgKHRoaXMudW5pdCA9PSBcImF1dG9cIikgJCh0aGlzLmVsZW1lbnQpLmFkZENsYXNzKFwiYXV0b1wiKTtcclxuXHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHRoaXMubnVtYmVyKTtcclxuXHRcdCQoJ3NlbGVjdCcsIHRoaXMuZWxlbWVudCkudmFsKHRoaXMudW5pdCk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImNzc3VuaXRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDc3NVbml0SW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5pbXBvcnQgJCBmcm9tICcuLi8uLi9qcy9qcXVlcnkubWluJztcclxuXHJcbmNvbnN0IENvbG9ySW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0Ly9odG1sNSBjb2xvciBpbnB1dCBvbmx5IHN1cHBvcnRzIHNldHRpbmcgdmFsdWVzIGFzIGhleCBjb2xvcnMgZXZlbiBpZiB0aGUgcGlja2VyIHJldHVybnMgb25seSByZ2JcclxuXHRyZ2IyaGV4OiBmdW5jdGlvbiAocmdiKSB7XHJcblxyXG5cdFx0cmdiID0gcmdiLm1hdGNoKC9ecmdiYT9bXFxzK10/XFwoW1xccytdPyhcXGQrKVtcXHMrXT8sW1xccytdPyhcXGQrKVtcXHMrXT8sW1xccytdPyhcXGQrKVtcXHMrXT8vaSk7XHJcblxyXG5cdFx0cmV0dXJuIChyZ2IgJiYgcmdiLmxlbmd0aCA9PT0gNCkgPyBcIiNcIiArXHJcblx0XHRcdChcIjBcIiArIHBhcnNlSW50KHJnYlsxXSwgMTApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpICtcclxuXHRcdFx0KFwiMFwiICsgcGFyc2VJbnQocmdiWzJdLCAxMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMikgK1xyXG5cdFx0XHQoXCIwXCIgKyBwYXJzZUludChyZ2JbM10sIDEwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKSA6IHJnYjtcclxuXHR9LFxyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh0aGlzLnJnYjJoZXgodmFsdWUpKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwiY29sb3JpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb2xvcklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBDaGVja2JveElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbihldmVudCwgbm9kZSkge1xyXG5cdFx0XHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpXHJcblx0XHR7XHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt0aGlzLmNoZWNrZWQsIHRoaXNdKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuICAgIGV2ZW50czogW1xyXG4gICAgICAgIFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0IF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHRcclxuXHRpbml0OiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJjaGVja2JveGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbiAgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tib3hJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcbmltcG9ydCAkIGZyb20gJy4uLy4uL2pzL2pxdWVyeS5taW4nO1xyXG5cclxuY29uc3QgQnV0dG9uSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjbGlja1wiLCBcIm9uQ2hhbmdlXCIsIFwiYnV0dG9uXCIgLyonc2VsZWN0JyovXSxcclxuXHRdLFxyXG5cclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnYnV0dG9uJywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJidXR0b25cIiwgZGF0YSk7XHJcblx0fSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbklucHV0OyIsImltcG9ydCAkIGZyb20gJy4uLy4uL2pzL2pxdWVyeS5taW4nO1xyXG5cclxuY29uc3QgSW5wdXQgPSB7XHJcblx0XHJcblx0aW5pdDogZnVuY3Rpb24obmFtZSkge1xyXG5cdH0sXHJcblxyXG5cclxuXHRvbkNoYW5nZTogZnVuY3Rpb24oZXZlbnQsIG5vZGUpIHtcclxuXHRcdFxyXG5cdFx0aWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS5lbGVtZW50KVxyXG5cdFx0e1xyXG5cdFx0XHRldmVudC5kYXRhLmVsZW1lbnQudHJpZ2dlcigncHJvcGVydHlDaGFuZ2UnLCBbdGhpcy52YWx1ZSwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHJlbmRlclRlbXBsYXRlOiBmdW5jdGlvbihuYW1lLCBkYXRhKSB7XHJcblx0XHRyZXR1cm4gdG1wbChcInZ2dmViLWlucHV0LVwiICsgbmFtZSwgZGF0YSk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbihuYW1lLCBkYXRhKSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKHRoaXMucmVuZGVyVGVtcGxhdGUobmFtZSwgZGF0YSkpO1xyXG5cdFx0XHJcblx0XHQvL2JpbmQgZXZlbnRzXHJcblx0XHRpZiAodGhpcy5ldmVudHMpXHJcblx0XHRmb3IgKHZhciBpIGluIHRoaXMuZXZlbnRzKVxyXG5cdFx0e1xyXG5cdFx0XHRldmVudCA9IHRoaXMuZXZlbnRzW2ldWzBdO1xyXG5cdFx0XHRmdW4gPSB0aGlzWyB0aGlzLmV2ZW50c1tpXVsxXSBdO1xyXG5cdFx0XHRlbCA9IHRoaXMuZXZlbnRzW2ldWzJdO1xyXG5cdFx0XHJcblx0XHRcdHRoaXMuZWxlbWVudC5vbihldmVudCwgZWwsIHtlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGlucHV0OnRoaXN9LCBmdW4pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLmVsZW1lbnQ7XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5wdXQ7IiwiaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBiZ2NvbG9yQ2xhc3NlcyA9IFtcImJnLXByaW1hcnlcIiwgXCJiZy1zZWNvbmRhcnlcIiwgXCJiZy1zdWNjZXNzXCIsIFwiYmctZGFuZ2VyXCIsIFwiYmctd2FybmluZ1wiLCBcImJnLWluZm9cIiwgXCJiZy1saWdodFwiLCBcImJnLWRhcmtcIiwgXCJiZy13aGl0ZVwiXTtcclxuXHJcbmNvbnN0IGJnY29sb3JTZWxlY3RPcHRpb25zID1cclxuICAgIFt7XHJcbiAgICAgICAgdmFsdWU6IFwiRGVmYXVsdFwiLFxyXG4gICAgICAgIHRleHQ6IFwiXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctcHJpbWFyeVwiLFxyXG4gICAgICAgIHRleHQ6IFwiUHJpbWFyeVwiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctc2Vjb25kYXJ5XCIsXHJcbiAgICAgICAgdGV4dDogXCJTZWNvbmRhcnlcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLXN1Y2Nlc3NcIixcclxuICAgICAgICB0ZXh0OiBcIlN1Y2Nlc3NcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLWRhbmdlclwiLFxyXG4gICAgICAgIHRleHQ6IFwiRGFuZ2VyXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy13YXJuaW5nXCIsXHJcbiAgICAgICAgdGV4dDogXCJXYXJuaW5nXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1pbmZvXCIsXHJcbiAgICAgICAgdGV4dDogXCJJbmZvXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1saWdodFwiLFxyXG4gICAgICAgIHRleHQ6IFwiTGlnaHRcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLWRhcmtcIixcclxuICAgICAgICB0ZXh0OiBcIkRhcmtcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLXdoaXRlXCIsXHJcbiAgICAgICAgdGV4dDogXCJXaGl0ZVwiXHJcbiAgICB9XTtcclxuXHJcbmZ1bmN0aW9uIGNoYW5nZU5vZGVOYW1lKG5vZGUsIG5ld05vZGVOYW1lKSB7XHJcbiAgICB2YXIgbmV3Tm9kZTtcclxuICAgIG5ld05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5ld05vZGVOYW1lKTtcclxuICAgIGF0dHJpYnV0ZXMgPSBub2RlLmdldCgwKS5hdHRyaWJ1dGVzO1xyXG5cclxuICAgIGZvciAoaSA9IDAsIGxlbiA9IGF0dHJpYnV0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBuZXdOb2RlLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVzW2ldLm5vZGVOYW1lLCBhdHRyaWJ1dGVzW2ldLm5vZGVWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgJChuZXdOb2RlKS5hcHBlbmQoJChub2RlKS5jb250ZW50cygpKTtcclxuICAgICQobm9kZSkucmVwbGFjZVdpdGgobmV3Tm9kZSk7XHJcblxyXG4gICAgcmV0dXJuIG5ld05vZGU7XHJcbn1cclxuXHJcbmxldCBiYXNlX3NvcnQgPSAxMDA7Ly9zdGFydCBzb3J0aW5nIGZvciBiYXNlIGNvbXBvbmVudCBmcm9tIDEwMCB0byBhbGxvdyBleHRlbmRlZCBwcm9wZXJ0aWVzIHRvIGJlIGZpcnN0XHJcbmZ1bmN0aW9uIGluY19iYXNlX3NvcnQoKSB7XHJcbiAgICByZXR1cm4gYmFzZV9zb3J0Kys7XHJcbn1cclxuXHJcbmNvbnN0IGRhdGFDb21wb25lbnRJZCA9ICdkYXRhLWNvbXBvbmVudC1pZCc7XHJcbmNvbnN0IGRhdGFUYWJsZUlkID0gJ2RhdGEtdGFibGUtaWQnO1xyXG5jb25zdCBkYXRhQ2FsZW5kYXJJZCA9ICdkYXRhLWNhbGVuZGFyLWlkJztcclxuY29uc3QgZGF0YUNvbmZpZ0luZm8gPSAnZGF0YS1jb25maWctaW5mbyc7XHJcbmNvbnN0IGRhdGFBdXRvU2VsZWN0SWQgPSAnZGF0YS1hdXRvLXNlbGVjdC1pZCc7XHJcbmNvbnN0IGRhdGFCdXR0b25JZCA9ICdkYXRhLWJ1dHRvbi1pZCc7XHJcbmNvbnN0IGRhdGFVcmwgPSAnZGF0YS11cmwnO1xyXG5jb25zdCBkYXRhVmFsdWVNYXBwaW5nID0gJ2RhdGEtdmFsdWUtbWFwcGluZyc7XHJcbmNvbnN0IGRhdGFUZXh0TWFwcGluZyA9ICdkYXRhLXRleHQtbWFwcGluZyc7XHJcblxyXG5leHBvcnQge1xyXG4gICAgYmdjb2xvckNsYXNzZXMsIGJnY29sb3JTZWxlY3RPcHRpb25zLCBjaGFuZ2VOb2RlTmFtZSwgaW5jX2Jhc2Vfc29ydCwgZGF0YUNvbXBvbmVudElkLCBkYXRhVGFibGVJZCxcclxuICAgIGRhdGFDb25maWdJbmZvLCBkYXRhQ2FsZW5kYXJJZCwgZGF0YVVybCwgZGF0YUF1dG9TZWxlY3RJZCwgZGF0YUJ1dHRvbklkLCBkYXRhVmFsdWVNYXBwaW5nLCBkYXRhVGV4dE1hcHBpbmdcclxufTtcclxuIiwiLyohIGpRdWVyeSB2My4yLjEgfCAoYykgSlMgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIHwganF1ZXJ5Lm9yZy9saWNlbnNlICovXHJcbiFmdW5jdGlvbihhLGIpe1widXNlIHN0cmljdFwiO1wib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1hLmRvY3VtZW50P2IoYSwhMCk6ZnVuY3Rpb24oYSl7aWYoIWEuZG9jdW1lbnQpdGhyb3cgbmV3IEVycm9yKFwialF1ZXJ5IHJlcXVpcmVzIGEgd2luZG93IHdpdGggYSBkb2N1bWVudFwiKTtyZXR1cm4gYihhKX06YihhKX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6dGhpcyxmdW5jdGlvbihhLGIpe1widXNlIHN0cmljdFwiO3ZhciBjPVtdLGQ9YS5kb2N1bWVudCxlPU9iamVjdC5nZXRQcm90b3R5cGVPZixmPWMuc2xpY2UsZz1jLmNvbmNhdCxoPWMucHVzaCxpPWMuaW5kZXhPZixqPXt9LGs9ai50b1N0cmluZyxsPWouaGFzT3duUHJvcGVydHksbT1sLnRvU3RyaW5nLG49bS5jYWxsKE9iamVjdCksbz17fTtmdW5jdGlvbiBwKGEsYil7Yj1ifHxkO3ZhciBjPWIuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtjLnRleHQ9YSxiLmhlYWQuYXBwZW5kQ2hpbGQoYykucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjKX12YXIgcT1cIjMuMi4xXCIscj1mdW5jdGlvbihhLGIpe3JldHVybiBuZXcgci5mbi5pbml0KGEsYil9LHM9L15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLHQ9L14tbXMtLyx1PS8tKFthLXpdKS9nLHY9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYi50b1VwcGVyQ2FzZSgpfTtyLmZuPXIucHJvdG90eXBlPXtqcXVlcnk6cSxjb25zdHJ1Y3RvcjpyLGxlbmd0aDowLHRvQXJyYXk6ZnVuY3Rpb24oKXtyZXR1cm4gZi5jYWxsKHRoaXMpfSxnZXQ6ZnVuY3Rpb24oYSl7cmV0dXJuIG51bGw9PWE/Zi5jYWxsKHRoaXMpOmE8MD90aGlzW2ErdGhpcy5sZW5ndGhdOnRoaXNbYV19LHB1c2hTdGFjazpmdW5jdGlvbihhKXt2YXIgYj1yLm1lcmdlKHRoaXMuY29uc3RydWN0b3IoKSxhKTtyZXR1cm4gYi5wcmV2T2JqZWN0PXRoaXMsYn0sZWFjaDpmdW5jdGlvbihhKXtyZXR1cm4gci5lYWNoKHRoaXMsYSl9LG1hcDpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5wdXNoU3RhY2soci5tYXAodGhpcyxmdW5jdGlvbihiLGMpe3JldHVybiBhLmNhbGwoYixjLGIpfSkpfSxzbGljZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLnB1c2hTdGFjayhmLmFwcGx5KHRoaXMsYXJndW1lbnRzKSl9LGZpcnN0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZXEoMCl9LGxhc3Q6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lcSgtMSl9LGVxOmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMubGVuZ3RoLGM9K2ErKGE8MD9iOjApO3JldHVybiB0aGlzLnB1c2hTdGFjayhjPj0wJiZjPGI/W3RoaXNbY11dOltdKX0sZW5kOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucHJldk9iamVjdHx8dGhpcy5jb25zdHJ1Y3RvcigpfSxwdXNoOmgsc29ydDpjLnNvcnQsc3BsaWNlOmMuc3BsaWNlfSxyLmV4dGVuZD1yLmZuLmV4dGVuZD1mdW5jdGlvbigpe3ZhciBhLGIsYyxkLGUsZixnPWFyZ3VtZW50c1swXXx8e30saD0xLGk9YXJndW1lbnRzLmxlbmd0aCxqPSExO2ZvcihcImJvb2xlYW5cIj09dHlwZW9mIGcmJihqPWcsZz1hcmd1bWVudHNbaF18fHt9LGgrKyksXCJvYmplY3RcIj09dHlwZW9mIGd8fHIuaXNGdW5jdGlvbihnKXx8KGc9e30pLGg9PT1pJiYoZz10aGlzLGgtLSk7aDxpO2grKylpZihudWxsIT0oYT1hcmd1bWVudHNbaF0pKWZvcihiIGluIGEpYz1nW2JdLGQ9YVtiXSxnIT09ZCYmKGomJmQmJihyLmlzUGxhaW5PYmplY3QoZCl8fChlPUFycmF5LmlzQXJyYXkoZCkpKT8oZT8oZT0hMSxmPWMmJkFycmF5LmlzQXJyYXkoYyk/YzpbXSk6Zj1jJiZyLmlzUGxhaW5PYmplY3QoYyk/Yzp7fSxnW2JdPXIuZXh0ZW5kKGosZixkKSk6dm9pZCAwIT09ZCYmKGdbYl09ZCkpO3JldHVybiBnfSxyLmV4dGVuZCh7ZXhwYW5kbzpcImpRdWVyeVwiKyhxK01hdGgucmFuZG9tKCkpLnJlcGxhY2UoL1xcRC9nLFwiXCIpLGlzUmVhZHk6ITAsZXJyb3I6ZnVuY3Rpb24oYSl7dGhyb3cgbmV3IEVycm9yKGEpfSxub29wOmZ1bmN0aW9uKCl7fSxpc0Z1bmN0aW9uOmZ1bmN0aW9uKGEpe3JldHVyblwiZnVuY3Rpb25cIj09PXIudHlwZShhKX0saXNXaW5kb3c6ZnVuY3Rpb24oYSl7cmV0dXJuIG51bGwhPWEmJmE9PT1hLndpbmRvd30saXNOdW1lcmljOmZ1bmN0aW9uKGEpe3ZhciBiPXIudHlwZShhKTtyZXR1cm4oXCJudW1iZXJcIj09PWJ8fFwic3RyaW5nXCI9PT1iKSYmIWlzTmFOKGEtcGFyc2VGbG9hdChhKSl9LGlzUGxhaW5PYmplY3Q6ZnVuY3Rpb24oYSl7dmFyIGIsYztyZXR1cm4hKCFhfHxcIltvYmplY3QgT2JqZWN0XVwiIT09ay5jYWxsKGEpKSYmKCEoYj1lKGEpKXx8KGM9bC5jYWxsKGIsXCJjb25zdHJ1Y3RvclwiKSYmYi5jb25zdHJ1Y3RvcixcImZ1bmN0aW9uXCI9PXR5cGVvZiBjJiZtLmNhbGwoYyk9PT1uKSl9LGlzRW1wdHlPYmplY3Q6ZnVuY3Rpb24oYSl7dmFyIGI7Zm9yKGIgaW4gYSlyZXR1cm4hMTtyZXR1cm4hMH0sdHlwZTpmdW5jdGlvbihhKXtyZXR1cm4gbnVsbD09YT9hK1wiXCI6XCJvYmplY3RcIj09dHlwZW9mIGF8fFwiZnVuY3Rpb25cIj09dHlwZW9mIGE/altrLmNhbGwoYSldfHxcIm9iamVjdFwiOnR5cGVvZiBhfSxnbG9iYWxFdmFsOmZ1bmN0aW9uKGEpe3AoYSl9LGNhbWVsQ2FzZTpmdW5jdGlvbihhKXtyZXR1cm4gYS5yZXBsYWNlKHQsXCJtcy1cIikucmVwbGFjZSh1LHYpfSxlYWNoOmZ1bmN0aW9uKGEsYil7dmFyIGMsZD0wO2lmKHcoYSkpe2ZvcihjPWEubGVuZ3RoO2Q8YztkKyspaWYoYi5jYWxsKGFbZF0sZCxhW2RdKT09PSExKWJyZWFrfWVsc2UgZm9yKGQgaW4gYSlpZihiLmNhbGwoYVtkXSxkLGFbZF0pPT09ITEpYnJlYWs7cmV0dXJuIGF9LHRyaW06ZnVuY3Rpb24oYSl7cmV0dXJuIG51bGw9PWE/XCJcIjooYStcIlwiKS5yZXBsYWNlKHMsXCJcIil9LG1ha2VBcnJheTpmdW5jdGlvbihhLGIpe3ZhciBjPWJ8fFtdO3JldHVybiBudWxsIT1hJiYodyhPYmplY3QoYSkpP3IubWVyZ2UoYyxcInN0cmluZ1wiPT10eXBlb2YgYT9bYV06YSk6aC5jYWxsKGMsYSkpLGN9LGluQXJyYXk6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiBudWxsPT1iPy0xOmkuY2FsbChiLGEsYyl9LG1lcmdlOmZ1bmN0aW9uKGEsYil7Zm9yKHZhciBjPStiLmxlbmd0aCxkPTAsZT1hLmxlbmd0aDtkPGM7ZCsrKWFbZSsrXT1iW2RdO3JldHVybiBhLmxlbmd0aD1lLGF9LGdyZXA6ZnVuY3Rpb24oYSxiLGMpe2Zvcih2YXIgZCxlPVtdLGY9MCxnPWEubGVuZ3RoLGg9IWM7ZjxnO2YrKylkPSFiKGFbZl0sZiksZCE9PWgmJmUucHVzaChhW2ZdKTtyZXR1cm4gZX0sbWFwOmZ1bmN0aW9uKGEsYixjKXt2YXIgZCxlLGY9MCxoPVtdO2lmKHcoYSkpZm9yKGQ9YS5sZW5ndGg7ZjxkO2YrKyllPWIoYVtmXSxmLGMpLG51bGwhPWUmJmgucHVzaChlKTtlbHNlIGZvcihmIGluIGEpZT1iKGFbZl0sZixjKSxudWxsIT1lJiZoLnB1c2goZSk7cmV0dXJuIGcuYXBwbHkoW10saCl9LGd1aWQ6MSxwcm94eTpmdW5jdGlvbihhLGIpe3ZhciBjLGQsZTtpZihcInN0cmluZ1wiPT10eXBlb2YgYiYmKGM9YVtiXSxiPWEsYT1jKSxyLmlzRnVuY3Rpb24oYSkpcmV0dXJuIGQ9Zi5jYWxsKGFyZ3VtZW50cywyKSxlPWZ1bmN0aW9uKCl7cmV0dXJuIGEuYXBwbHkoYnx8dGhpcyxkLmNvbmNhdChmLmNhbGwoYXJndW1lbnRzKSkpfSxlLmd1aWQ9YS5ndWlkPWEuZ3VpZHx8ci5ndWlkKyssZX0sbm93OkRhdGUubm93LHN1cHBvcnQ6b30pLFwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmKHIuZm5bU3ltYm9sLml0ZXJhdG9yXT1jW1N5bWJvbC5pdGVyYXRvcl0pLHIuZWFjaChcIkJvb2xlYW4gTnVtYmVyIFN0cmluZyBGdW5jdGlvbiBBcnJheSBEYXRlIFJlZ0V4cCBPYmplY3QgRXJyb3IgU3ltYm9sXCIuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKGEsYil7altcIltvYmplY3QgXCIrYitcIl1cIl09Yi50b0xvd2VyQ2FzZSgpfSk7ZnVuY3Rpb24gdyhhKXt2YXIgYj0hIWEmJlwibGVuZ3RoXCJpbiBhJiZhLmxlbmd0aCxjPXIudHlwZShhKTtyZXR1cm5cImZ1bmN0aW9uXCIhPT1jJiYhci5pc1dpbmRvdyhhKSYmKFwiYXJyYXlcIj09PWN8fDA9PT1ifHxcIm51bWJlclwiPT10eXBlb2YgYiYmYj4wJiZiLTEgaW4gYSl9dmFyIHg9ZnVuY3Rpb24oYSl7dmFyIGIsYyxkLGUsZixnLGgsaSxqLGssbCxtLG4sbyxwLHEscixzLHQsdT1cInNpenpsZVwiKzEqbmV3IERhdGUsdj1hLmRvY3VtZW50LHc9MCx4PTAseT1oYSgpLHo9aGEoKSxBPWhhKCksQj1mdW5jdGlvbihhLGIpe3JldHVybiBhPT09YiYmKGw9ITApLDB9LEM9e30uaGFzT3duUHJvcGVydHksRD1bXSxFPUQucG9wLEY9RC5wdXNoLEc9RC5wdXNoLEg9RC5zbGljZSxJPWZ1bmN0aW9uKGEsYil7Zm9yKHZhciBjPTAsZD1hLmxlbmd0aDtjPGQ7YysrKWlmKGFbY109PT1iKXJldHVybiBjO3JldHVybi0xfSxKPVwiY2hlY2tlZHxzZWxlY3RlZHxhc3luY3xhdXRvZm9jdXN8YXV0b3BsYXl8Y29udHJvbHN8ZGVmZXJ8ZGlzYWJsZWR8aGlkZGVufGlzbWFwfGxvb3B8bXVsdGlwbGV8b3BlbnxyZWFkb25seXxyZXF1aXJlZHxzY29wZWRcIixLPVwiW1xcXFx4MjBcXFxcdFxcXFxyXFxcXG5cXFxcZl1cIixMPVwiKD86XFxcXFxcXFwufFtcXFxcdy1dfFteXFwwLVxcXFx4YTBdKStcIixNPVwiXFxcXFtcIitLK1wiKihcIitMK1wiKSg/OlwiK0srXCIqKFsqXiR8IX5dPz0pXCIrSytcIiooPzonKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcJ10pKiknfFxcXCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFxcXFwiXSkqKVxcXCJ8KFwiK0wrXCIpKXwpXCIrSytcIipcXFxcXVwiLE49XCI6KFwiK0wrXCIpKD86XFxcXCgoKCcoKD86XFxcXFxcXFwufFteXFxcXFxcXFwnXSkqKSd8XFxcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXFxcXCJdKSopXFxcIil8KCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcKClbXFxcXF1dfFwiK00rXCIpKil8LiopXFxcXCl8KVwiLE89bmV3IFJlZ0V4cChLK1wiK1wiLFwiZ1wiKSxQPW5ldyBSZWdFeHAoXCJeXCIrSytcIit8KCg/Ol58W15cXFxcXFxcXF0pKD86XFxcXFxcXFwuKSopXCIrSytcIiskXCIsXCJnXCIpLFE9bmV3IFJlZ0V4cChcIl5cIitLK1wiKixcIitLK1wiKlwiKSxSPW5ldyBSZWdFeHAoXCJeXCIrSytcIiooWz4rfl18XCIrSytcIilcIitLK1wiKlwiKSxTPW5ldyBSZWdFeHAoXCI9XCIrSytcIiooW15cXFxcXSdcXFwiXSo/KVwiK0srXCIqXFxcXF1cIixcImdcIiksVD1uZXcgUmVnRXhwKE4pLFU9bmV3IFJlZ0V4cChcIl5cIitMK1wiJFwiKSxWPXtJRDpuZXcgUmVnRXhwKFwiXiMoXCIrTCtcIilcIiksQ0xBU1M6bmV3IFJlZ0V4cChcIl5cXFxcLihcIitMK1wiKVwiKSxUQUc6bmV3IFJlZ0V4cChcIl4oXCIrTCtcInxbKl0pXCIpLEFUVFI6bmV3IFJlZ0V4cChcIl5cIitNKSxQU0VVRE86bmV3IFJlZ0V4cChcIl5cIitOKSxDSElMRDpuZXcgUmVnRXhwKFwiXjoob25seXxmaXJzdHxsYXN0fG50aHxudGgtbGFzdCktKGNoaWxkfG9mLXR5cGUpKD86XFxcXChcIitLK1wiKihldmVufG9kZHwoKFsrLV18KShcXFxcZCopbnwpXCIrSytcIiooPzooWystXXwpXCIrSytcIiooXFxcXGQrKXwpKVwiK0srXCIqXFxcXCl8KVwiLFwiaVwiKSxib29sOm5ldyBSZWdFeHAoXCJeKD86XCIrSitcIikkXCIsXCJpXCIpLG5lZWRzQ29udGV4dDpuZXcgUmVnRXhwKFwiXlwiK0srXCIqWz4rfl18OihldmVufG9kZHxlcXxndHxsdHxudGh8Zmlyc3R8bGFzdCkoPzpcXFxcKFwiK0srXCIqKCg/Oi1cXFxcZCk/XFxcXGQqKVwiK0srXCIqXFxcXCl8KSg/PVteLV18JClcIixcImlcIil9LFc9L14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8YnV0dG9uKSQvaSxYPS9eaFxcZCQvaSxZPS9eW157XStcXHtcXHMqXFxbbmF0aXZlIFxcdy8sWj0vXig/OiMoW1xcdy1dKyl8KFxcdyspfFxcLihbXFx3LV0rKSkkLywkPS9bK35dLyxfPW5ldyBSZWdFeHAoXCJcXFxcXFxcXChbXFxcXGRhLWZdezEsNn1cIitLK1wiP3woXCIrSytcIil8LilcIixcImlnXCIpLGFhPWZ1bmN0aW9uKGEsYixjKXt2YXIgZD1cIjB4XCIrYi02NTUzNjtyZXR1cm4gZCE9PWR8fGM/YjpkPDA/U3RyaW5nLmZyb21DaGFyQ29kZShkKzY1NTM2KTpTdHJpbmcuZnJvbUNoYXJDb2RlKGQ+PjEwfDU1Mjk2LDEwMjMmZHw1NjMyMCl9LGJhPS8oW1xcMC1cXHgxZlxceDdmXXxeLT9cXGQpfF4tJHxbXlxcMC1cXHgxZlxceDdmLVxcdUZGRkZcXHctXS9nLGNhPWZ1bmN0aW9uKGEsYil7cmV0dXJuIGI/XCJcXDBcIj09PWE/XCJcXHVmZmZkXCI6YS5zbGljZSgwLC0xKStcIlxcXFxcIithLmNoYXJDb2RlQXQoYS5sZW5ndGgtMSkudG9TdHJpbmcoMTYpK1wiIFwiOlwiXFxcXFwiK2F9LGRhPWZ1bmN0aW9uKCl7bSgpfSxlYT10YShmdW5jdGlvbihhKXtyZXR1cm4gYS5kaXNhYmxlZD09PSEwJiYoXCJmb3JtXCJpbiBhfHxcImxhYmVsXCJpbiBhKX0se2RpcjpcInBhcmVudE5vZGVcIixuZXh0OlwibGVnZW5kXCJ9KTt0cnl7Ry5hcHBseShEPUguY2FsbCh2LmNoaWxkTm9kZXMpLHYuY2hpbGROb2RlcyksRFt2LmNoaWxkTm9kZXMubGVuZ3RoXS5ub2RlVHlwZX1jYXRjaChmYSl7Rz17YXBwbHk6RC5sZW5ndGg/ZnVuY3Rpb24oYSxiKXtGLmFwcGx5KGEsSC5jYWxsKGIpKX06ZnVuY3Rpb24oYSxiKXt2YXIgYz1hLmxlbmd0aCxkPTA7d2hpbGUoYVtjKytdPWJbZCsrXSk7YS5sZW5ndGg9Yy0xfX19ZnVuY3Rpb24gZ2EoYSxiLGQsZSl7dmFyIGYsaCxqLGssbCxvLHIscz1iJiZiLm93bmVyRG9jdW1lbnQsdz1iP2Iubm9kZVR5cGU6OTtpZihkPWR8fFtdLFwic3RyaW5nXCIhPXR5cGVvZiBhfHwhYXx8MSE9PXcmJjkhPT13JiYxMSE9PXcpcmV0dXJuIGQ7aWYoIWUmJigoYj9iLm93bmVyRG9jdW1lbnR8fGI6dikhPT1uJiZtKGIpLGI9Ynx8bixwKSl7aWYoMTEhPT13JiYobD1aLmV4ZWMoYSkpKWlmKGY9bFsxXSl7aWYoOT09PXcpe2lmKCEoaj1iLmdldEVsZW1lbnRCeUlkKGYpKSlyZXR1cm4gZDtpZihqLmlkPT09ZilyZXR1cm4gZC5wdXNoKGopLGR9ZWxzZSBpZihzJiYoaj1zLmdldEVsZW1lbnRCeUlkKGYpKSYmdChiLGopJiZqLmlkPT09ZilyZXR1cm4gZC5wdXNoKGopLGR9ZWxzZXtpZihsWzJdKXJldHVybiBHLmFwcGx5KGQsYi5nZXRFbGVtZW50c0J5VGFnTmFtZShhKSksZDtpZigoZj1sWzNdKSYmYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lJiZiLmdldEVsZW1lbnRzQnlDbGFzc05hbWUpcmV0dXJuIEcuYXBwbHkoZCxiLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoZikpLGR9aWYoYy5xc2EmJiFBW2ErXCIgXCJdJiYoIXF8fCFxLnRlc3QoYSkpKXtpZigxIT09dylzPWIscj1hO2Vsc2UgaWYoXCJvYmplY3RcIiE9PWIubm9kZU5hbWUudG9Mb3dlckNhc2UoKSl7KGs9Yi5nZXRBdHRyaWJ1dGUoXCJpZFwiKSk/az1rLnJlcGxhY2UoYmEsY2EpOmIuc2V0QXR0cmlidXRlKFwiaWRcIixrPXUpLG89ZyhhKSxoPW8ubGVuZ3RoO3doaWxlKGgtLSlvW2hdPVwiI1wiK2srXCIgXCIrc2Eob1toXSk7cj1vLmpvaW4oXCIsXCIpLHM9JC50ZXN0KGEpJiZxYShiLnBhcmVudE5vZGUpfHxifWlmKHIpdHJ5e3JldHVybiBHLmFwcGx5KGQscy5xdWVyeVNlbGVjdG9yQWxsKHIpKSxkfWNhdGNoKHgpe31maW5hbGx5e2s9PT11JiZiLnJlbW92ZUF0dHJpYnV0ZShcImlkXCIpfX19cmV0dXJuIGkoYS5yZXBsYWNlKFAsXCIkMVwiKSxiLGQsZSl9ZnVuY3Rpb24gaGEoKXt2YXIgYT1bXTtmdW5jdGlvbiBiKGMsZSl7cmV0dXJuIGEucHVzaChjK1wiIFwiKT5kLmNhY2hlTGVuZ3RoJiZkZWxldGUgYlthLnNoaWZ0KCldLGJbYytcIiBcIl09ZX1yZXR1cm4gYn1mdW5jdGlvbiBpYShhKXtyZXR1cm4gYVt1XT0hMCxhfWZ1bmN0aW9uIGphKGEpe3ZhciBiPW4uY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpO3RyeXtyZXR1cm4hIWEoYil9Y2F0Y2goYyl7cmV0dXJuITF9ZmluYWxseXtiLnBhcmVudE5vZGUmJmIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChiKSxiPW51bGx9fWZ1bmN0aW9uIGthKGEsYil7dmFyIGM9YS5zcGxpdChcInxcIiksZT1jLmxlbmd0aDt3aGlsZShlLS0pZC5hdHRySGFuZGxlW2NbZV1dPWJ9ZnVuY3Rpb24gbGEoYSxiKXt2YXIgYz1iJiZhLGQ9YyYmMT09PWEubm9kZVR5cGUmJjE9PT1iLm5vZGVUeXBlJiZhLnNvdXJjZUluZGV4LWIuc291cmNlSW5kZXg7aWYoZClyZXR1cm4gZDtpZihjKXdoaWxlKGM9Yy5uZXh0U2libGluZylpZihjPT09YilyZXR1cm4tMTtyZXR1cm4gYT8xOi0xfWZ1bmN0aW9uIG1hKGEpe3JldHVybiBmdW5jdGlvbihiKXt2YXIgYz1iLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7cmV0dXJuXCJpbnB1dFwiPT09YyYmYi50eXBlPT09YX19ZnVuY3Rpb24gbmEoYSl7cmV0dXJuIGZ1bmN0aW9uKGIpe3ZhciBjPWIubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtyZXR1cm4oXCJpbnB1dFwiPT09Y3x8XCJidXR0b25cIj09PWMpJiZiLnR5cGU9PT1hfX1mdW5jdGlvbiBvYShhKXtyZXR1cm4gZnVuY3Rpb24oYil7cmV0dXJuXCJmb3JtXCJpbiBiP2IucGFyZW50Tm9kZSYmYi5kaXNhYmxlZD09PSExP1wibGFiZWxcImluIGI/XCJsYWJlbFwiaW4gYi5wYXJlbnROb2RlP2IucGFyZW50Tm9kZS5kaXNhYmxlZD09PWE6Yi5kaXNhYmxlZD09PWE6Yi5pc0Rpc2FibGVkPT09YXx8Yi5pc0Rpc2FibGVkIT09IWEmJmVhKGIpPT09YTpiLmRpc2FibGVkPT09YTpcImxhYmVsXCJpbiBiJiZiLmRpc2FibGVkPT09YX19ZnVuY3Rpb24gcGEoYSl7cmV0dXJuIGlhKGZ1bmN0aW9uKGIpe3JldHVybiBiPStiLGlhKGZ1bmN0aW9uKGMsZCl7dmFyIGUsZj1hKFtdLGMubGVuZ3RoLGIpLGc9Zi5sZW5ndGg7d2hpbGUoZy0tKWNbZT1mW2ddXSYmKGNbZV09IShkW2VdPWNbZV0pKX0pfSl9ZnVuY3Rpb24gcWEoYSl7cmV0dXJuIGEmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBhLmdldEVsZW1lbnRzQnlUYWdOYW1lJiZhfWM9Z2Euc3VwcG9ydD17fSxmPWdhLmlzWE1MPWZ1bmN0aW9uKGEpe3ZhciBiPWEmJihhLm93bmVyRG9jdW1lbnR8fGEpLmRvY3VtZW50RWxlbWVudDtyZXR1cm4hIWImJlwiSFRNTFwiIT09Yi5ub2RlTmFtZX0sbT1nYS5zZXREb2N1bWVudD1mdW5jdGlvbihhKXt2YXIgYixlLGc9YT9hLm93bmVyRG9jdW1lbnR8fGE6djtyZXR1cm4gZyE9PW4mJjk9PT1nLm5vZGVUeXBlJiZnLmRvY3VtZW50RWxlbWVudD8obj1nLG89bi5kb2N1bWVudEVsZW1lbnQscD0hZihuKSx2IT09biYmKGU9bi5kZWZhdWx0VmlldykmJmUudG9wIT09ZSYmKGUuYWRkRXZlbnRMaXN0ZW5lcj9lLmFkZEV2ZW50TGlzdGVuZXIoXCJ1bmxvYWRcIixkYSwhMSk6ZS5hdHRhY2hFdmVudCYmZS5hdHRhY2hFdmVudChcIm9udW5sb2FkXCIsZGEpKSxjLmF0dHJpYnV0ZXM9amEoZnVuY3Rpb24oYSl7cmV0dXJuIGEuY2xhc3NOYW1lPVwiaVwiLCFhLmdldEF0dHJpYnV0ZShcImNsYXNzTmFtZVwiKX0pLGMuZ2V0RWxlbWVudHNCeVRhZ05hbWU9amEoZnVuY3Rpb24oYSl7cmV0dXJuIGEuYXBwZW5kQ2hpbGQobi5jcmVhdGVDb21tZW50KFwiXCIpKSwhYS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIikubGVuZ3RofSksYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lPVkudGVzdChuLmdldEVsZW1lbnRzQnlDbGFzc05hbWUpLGMuZ2V0QnlJZD1qYShmdW5jdGlvbihhKXtyZXR1cm4gby5hcHBlbmRDaGlsZChhKS5pZD11LCFuLmdldEVsZW1lbnRzQnlOYW1lfHwhbi5nZXRFbGVtZW50c0J5TmFtZSh1KS5sZW5ndGh9KSxjLmdldEJ5SWQ/KGQuZmlsdGVyLklEPWZ1bmN0aW9uKGEpe3ZhciBiPWEucmVwbGFjZShfLGFhKTtyZXR1cm4gZnVuY3Rpb24oYSl7cmV0dXJuIGEuZ2V0QXR0cmlidXRlKFwiaWRcIik9PT1ifX0sZC5maW5kLklEPWZ1bmN0aW9uKGEsYil7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGIuZ2V0RWxlbWVudEJ5SWQmJnApe3ZhciBjPWIuZ2V0RWxlbWVudEJ5SWQoYSk7cmV0dXJuIGM/W2NdOltdfX0pOihkLmZpbHRlci5JRD1mdW5jdGlvbihhKXt2YXIgYj1hLnJlcGxhY2UoXyxhYSk7cmV0dXJuIGZ1bmN0aW9uKGEpe3ZhciBjPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBhLmdldEF0dHJpYnV0ZU5vZGUmJmEuZ2V0QXR0cmlidXRlTm9kZShcImlkXCIpO3JldHVybiBjJiZjLnZhbHVlPT09Yn19LGQuZmluZC5JRD1mdW5jdGlvbihhLGIpe2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBiLmdldEVsZW1lbnRCeUlkJiZwKXt2YXIgYyxkLGUsZj1iLmdldEVsZW1lbnRCeUlkKGEpO2lmKGYpe2lmKGM9Zi5nZXRBdHRyaWJ1dGVOb2RlKFwiaWRcIiksYyYmYy52YWx1ZT09PWEpcmV0dXJuW2ZdO2U9Yi5nZXRFbGVtZW50c0J5TmFtZShhKSxkPTA7d2hpbGUoZj1lW2QrK10paWYoYz1mLmdldEF0dHJpYnV0ZU5vZGUoXCJpZFwiKSxjJiZjLnZhbHVlPT09YSlyZXR1cm5bZl19cmV0dXJuW119fSksZC5maW5kLlRBRz1jLmdldEVsZW1lbnRzQnlUYWdOYW1lP2Z1bmN0aW9uKGEsYil7cmV0dXJuXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGIuZ2V0RWxlbWVudHNCeVRhZ05hbWU/Yi5nZXRFbGVtZW50c0J5VGFnTmFtZShhKTpjLnFzYT9iLnF1ZXJ5U2VsZWN0b3JBbGwoYSk6dm9pZCAwfTpmdW5jdGlvbihhLGIpe3ZhciBjLGQ9W10sZT0wLGY9Yi5nZXRFbGVtZW50c0J5VGFnTmFtZShhKTtpZihcIipcIj09PWEpe3doaWxlKGM9ZltlKytdKTE9PT1jLm5vZGVUeXBlJiZkLnB1c2goYyk7cmV0dXJuIGR9cmV0dXJuIGZ9LGQuZmluZC5DTEFTUz1jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUmJmZ1bmN0aW9uKGEsYil7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSYmcClyZXR1cm4gYi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGEpfSxyPVtdLHE9W10sKGMucXNhPVkudGVzdChuLnF1ZXJ5U2VsZWN0b3JBbGwpKSYmKGphKGZ1bmN0aW9uKGEpe28uYXBwZW5kQ2hpbGQoYSkuaW5uZXJIVE1MPVwiPGEgaWQ9J1wiK3UrXCInPjwvYT48c2VsZWN0IGlkPSdcIit1K1wiLVxcclxcXFwnIG1zYWxsb3djYXB0dXJlPScnPjxvcHRpb24gc2VsZWN0ZWQ9Jyc+PC9vcHRpb24+PC9zZWxlY3Q+XCIsYS5xdWVyeVNlbGVjdG9yQWxsKFwiW21zYWxsb3djYXB0dXJlXj0nJ11cIikubGVuZ3RoJiZxLnB1c2goXCJbKl4kXT1cIitLK1wiKig/OicnfFxcXCJcXFwiKVwiKSxhLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbc2VsZWN0ZWRdXCIpLmxlbmd0aHx8cS5wdXNoKFwiXFxcXFtcIitLK1wiKig/OnZhbHVlfFwiK0orXCIpXCIpLGEucXVlcnlTZWxlY3RvckFsbChcIltpZH49XCIrdStcIi1dXCIpLmxlbmd0aHx8cS5wdXNoKFwifj1cIiksYS5xdWVyeVNlbGVjdG9yQWxsKFwiOmNoZWNrZWRcIikubGVuZ3RofHxxLnB1c2goXCI6Y2hlY2tlZFwiKSxhLnF1ZXJ5U2VsZWN0b3JBbGwoXCJhI1wiK3UrXCIrKlwiKS5sZW5ndGh8fHEucHVzaChcIi4jLitbK35dXCIpfSksamEoZnVuY3Rpb24oYSl7YS5pbm5lckhUTUw9XCI8YSBocmVmPScnIGRpc2FibGVkPSdkaXNhYmxlZCc+PC9hPjxzZWxlY3QgZGlzYWJsZWQ9J2Rpc2FibGVkJz48b3B0aW9uLz48L3NlbGVjdD5cIjt2YXIgYj1uLmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtiLnNldEF0dHJpYnV0ZShcInR5cGVcIixcImhpZGRlblwiKSxhLmFwcGVuZENoaWxkKGIpLnNldEF0dHJpYnV0ZShcIm5hbWVcIixcIkRcIiksYS5xdWVyeVNlbGVjdG9yQWxsKFwiW25hbWU9ZF1cIikubGVuZ3RoJiZxLnB1c2goXCJuYW1lXCIrSytcIipbKl4kfCF+XT89XCIpLDIhPT1hLnF1ZXJ5U2VsZWN0b3JBbGwoXCI6ZW5hYmxlZFwiKS5sZW5ndGgmJnEucHVzaChcIjplbmFibGVkXCIsXCI6ZGlzYWJsZWRcIiksby5hcHBlbmRDaGlsZChhKS5kaXNhYmxlZD0hMCwyIT09YS5xdWVyeVNlbGVjdG9yQWxsKFwiOmRpc2FibGVkXCIpLmxlbmd0aCYmcS5wdXNoKFwiOmVuYWJsZWRcIixcIjpkaXNhYmxlZFwiKSxhLnF1ZXJ5U2VsZWN0b3JBbGwoXCIqLDp4XCIpLHEucHVzaChcIiwuKjpcIil9KSksKGMubWF0Y2hlc1NlbGVjdG9yPVkudGVzdChzPW8ubWF0Y2hlc3x8by53ZWJraXRNYXRjaGVzU2VsZWN0b3J8fG8ubW96TWF0Y2hlc1NlbGVjdG9yfHxvLm9NYXRjaGVzU2VsZWN0b3J8fG8ubXNNYXRjaGVzU2VsZWN0b3IpKSYmamEoZnVuY3Rpb24oYSl7Yy5kaXNjb25uZWN0ZWRNYXRjaD1zLmNhbGwoYSxcIipcIikscy5jYWxsKGEsXCJbcyE9JyddOnhcIiksci5wdXNoKFwiIT1cIixOKX0pLHE9cS5sZW5ndGgmJm5ldyBSZWdFeHAocS5qb2luKFwifFwiKSkscj1yLmxlbmd0aCYmbmV3IFJlZ0V4cChyLmpvaW4oXCJ8XCIpKSxiPVkudGVzdChvLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKSx0PWJ8fFkudGVzdChvLmNvbnRhaW5zKT9mdW5jdGlvbihhLGIpe3ZhciBjPTk9PT1hLm5vZGVUeXBlP2EuZG9jdW1lbnRFbGVtZW50OmEsZD1iJiZiLnBhcmVudE5vZGU7cmV0dXJuIGE9PT1kfHwhKCFkfHwxIT09ZC5ub2RlVHlwZXx8IShjLmNvbnRhaW5zP2MuY29udGFpbnMoZCk6YS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiYmMTYmYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihkKSkpfTpmdW5jdGlvbihhLGIpe2lmKGIpd2hpbGUoYj1iLnBhcmVudE5vZGUpaWYoYj09PWEpcmV0dXJuITA7cmV0dXJuITF9LEI9Yj9mdW5jdGlvbihhLGIpe2lmKGE9PT1iKXJldHVybiBsPSEwLDA7dmFyIGQ9IWEuY29tcGFyZURvY3VtZW50UG9zaXRpb24tIWIuY29tcGFyZURvY3VtZW50UG9zaXRpb247cmV0dXJuIGQ/ZDooZD0oYS5vd25lckRvY3VtZW50fHxhKT09PShiLm93bmVyRG9jdW1lbnR8fGIpP2EuY29tcGFyZURvY3VtZW50UG9zaXRpb24oYik6MSwxJmR8fCFjLnNvcnREZXRhY2hlZCYmYi5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihhKT09PWQ/YT09PW58fGEub3duZXJEb2N1bWVudD09PXYmJnQodixhKT8tMTpiPT09bnx8Yi5vd25lckRvY3VtZW50PT09diYmdCh2LGIpPzE6az9JKGssYSktSShrLGIpOjA6NCZkPy0xOjEpfTpmdW5jdGlvbihhLGIpe2lmKGE9PT1iKXJldHVybiBsPSEwLDA7dmFyIGMsZD0wLGU9YS5wYXJlbnROb2RlLGY9Yi5wYXJlbnROb2RlLGc9W2FdLGg9W2JdO2lmKCFlfHwhZilyZXR1cm4gYT09PW4/LTE6Yj09PW4/MTplPy0xOmY/MTprP0koayxhKS1JKGssYik6MDtpZihlPT09ZilyZXR1cm4gbGEoYSxiKTtjPWE7d2hpbGUoYz1jLnBhcmVudE5vZGUpZy51bnNoaWZ0KGMpO2M9Yjt3aGlsZShjPWMucGFyZW50Tm9kZSloLnVuc2hpZnQoYyk7d2hpbGUoZ1tkXT09PWhbZF0pZCsrO3JldHVybiBkP2xhKGdbZF0saFtkXSk6Z1tkXT09PXY/LTE6aFtkXT09PXY/MTowfSxuKTpufSxnYS5tYXRjaGVzPWZ1bmN0aW9uKGEsYil7cmV0dXJuIGdhKGEsbnVsbCxudWxsLGIpfSxnYS5tYXRjaGVzU2VsZWN0b3I9ZnVuY3Rpb24oYSxiKXtpZigoYS5vd25lckRvY3VtZW50fHxhKSE9PW4mJm0oYSksYj1iLnJlcGxhY2UoUyxcIj0nJDEnXVwiKSxjLm1hdGNoZXNTZWxlY3RvciYmcCYmIUFbYitcIiBcIl0mJighcnx8IXIudGVzdChiKSkmJighcXx8IXEudGVzdChiKSkpdHJ5e3ZhciBkPXMuY2FsbChhLGIpO2lmKGR8fGMuZGlzY29ubmVjdGVkTWF0Y2h8fGEuZG9jdW1lbnQmJjExIT09YS5kb2N1bWVudC5ub2RlVHlwZSlyZXR1cm4gZH1jYXRjaChlKXt9cmV0dXJuIGdhKGIsbixudWxsLFthXSkubGVuZ3RoPjB9LGdhLmNvbnRhaW5zPWZ1bmN0aW9uKGEsYil7cmV0dXJuKGEub3duZXJEb2N1bWVudHx8YSkhPT1uJiZtKGEpLHQoYSxiKX0sZ2EuYXR0cj1mdW5jdGlvbihhLGIpeyhhLm93bmVyRG9jdW1lbnR8fGEpIT09biYmbShhKTt2YXIgZT1kLmF0dHJIYW5kbGVbYi50b0xvd2VyQ2FzZSgpXSxmPWUmJkMuY2FsbChkLmF0dHJIYW5kbGUsYi50b0xvd2VyQ2FzZSgpKT9lKGEsYiwhcCk6dm9pZCAwO3JldHVybiB2b2lkIDAhPT1mP2Y6Yy5hdHRyaWJ1dGVzfHwhcD9hLmdldEF0dHJpYnV0ZShiKTooZj1hLmdldEF0dHJpYnV0ZU5vZGUoYikpJiZmLnNwZWNpZmllZD9mLnZhbHVlOm51bGx9LGdhLmVzY2FwZT1mdW5jdGlvbihhKXtyZXR1cm4oYStcIlwiKS5yZXBsYWNlKGJhLGNhKX0sZ2EuZXJyb3I9ZnVuY3Rpb24oYSl7dGhyb3cgbmV3IEVycm9yKFwiU3ludGF4IGVycm9yLCB1bnJlY29nbml6ZWQgZXhwcmVzc2lvbjogXCIrYSl9LGdhLnVuaXF1ZVNvcnQ9ZnVuY3Rpb24oYSl7dmFyIGIsZD1bXSxlPTAsZj0wO2lmKGw9IWMuZGV0ZWN0RHVwbGljYXRlcyxrPSFjLnNvcnRTdGFibGUmJmEuc2xpY2UoMCksYS5zb3J0KEIpLGwpe3doaWxlKGI9YVtmKytdKWI9PT1hW2ZdJiYoZT1kLnB1c2goZikpO3doaWxlKGUtLSlhLnNwbGljZShkW2VdLDEpfXJldHVybiBrPW51bGwsYX0sZT1nYS5nZXRUZXh0PWZ1bmN0aW9uKGEpe3ZhciBiLGM9XCJcIixkPTAsZj1hLm5vZGVUeXBlO2lmKGYpe2lmKDE9PT1mfHw5PT09Znx8MTE9PT1mKXtpZihcInN0cmluZ1wiPT10eXBlb2YgYS50ZXh0Q29udGVudClyZXR1cm4gYS50ZXh0Q29udGVudDtmb3IoYT1hLmZpcnN0Q2hpbGQ7YTthPWEubmV4dFNpYmxpbmcpYys9ZShhKX1lbHNlIGlmKDM9PT1mfHw0PT09ZilyZXR1cm4gYS5ub2RlVmFsdWV9ZWxzZSB3aGlsZShiPWFbZCsrXSljKz1lKGIpO3JldHVybiBjfSxkPWdhLnNlbGVjdG9ycz17Y2FjaGVMZW5ndGg6NTAsY3JlYXRlUHNldWRvOmlhLG1hdGNoOlYsYXR0ckhhbmRsZTp7fSxmaW5kOnt9LHJlbGF0aXZlOntcIj5cIjp7ZGlyOlwicGFyZW50Tm9kZVwiLGZpcnN0OiEwfSxcIiBcIjp7ZGlyOlwicGFyZW50Tm9kZVwifSxcIitcIjp7ZGlyOlwicHJldmlvdXNTaWJsaW5nXCIsZmlyc3Q6ITB9LFwiflwiOntkaXI6XCJwcmV2aW91c1NpYmxpbmdcIn19LHByZUZpbHRlcjp7QVRUUjpmdW5jdGlvbihhKXtyZXR1cm4gYVsxXT1hWzFdLnJlcGxhY2UoXyxhYSksYVszXT0oYVszXXx8YVs0XXx8YVs1XXx8XCJcIikucmVwbGFjZShfLGFhKSxcIn49XCI9PT1hWzJdJiYoYVszXT1cIiBcIithWzNdK1wiIFwiKSxhLnNsaWNlKDAsNCl9LENISUxEOmZ1bmN0aW9uKGEpe3JldHVybiBhWzFdPWFbMV0udG9Mb3dlckNhc2UoKSxcIm50aFwiPT09YVsxXS5zbGljZSgwLDMpPyhhWzNdfHxnYS5lcnJvcihhWzBdKSxhWzRdPSsoYVs0XT9hWzVdKyhhWzZdfHwxKToyKihcImV2ZW5cIj09PWFbM118fFwib2RkXCI9PT1hWzNdKSksYVs1XT0rKGFbN10rYVs4XXx8XCJvZGRcIj09PWFbM10pKTphWzNdJiZnYS5lcnJvcihhWzBdKSxhfSxQU0VVRE86ZnVuY3Rpb24oYSl7dmFyIGIsYz0hYVs2XSYmYVsyXTtyZXR1cm4gVi5DSElMRC50ZXN0KGFbMF0pP251bGw6KGFbM10/YVsyXT1hWzRdfHxhWzVdfHxcIlwiOmMmJlQudGVzdChjKSYmKGI9ZyhjLCEwKSkmJihiPWMuaW5kZXhPZihcIilcIixjLmxlbmd0aC1iKS1jLmxlbmd0aCkmJihhWzBdPWFbMF0uc2xpY2UoMCxiKSxhWzJdPWMuc2xpY2UoMCxiKSksYS5zbGljZSgwLDMpKX19LGZpbHRlcjp7VEFHOmZ1bmN0aW9uKGEpe3ZhciBiPWEucmVwbGFjZShfLGFhKS50b0xvd2VyQ2FzZSgpO3JldHVyblwiKlwiPT09YT9mdW5jdGlvbigpe3JldHVybiEwfTpmdW5jdGlvbihhKXtyZXR1cm4gYS5ub2RlTmFtZSYmYS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpPT09Yn19LENMQVNTOmZ1bmN0aW9uKGEpe3ZhciBiPXlbYStcIiBcIl07cmV0dXJuIGJ8fChiPW5ldyBSZWdFeHAoXCIoXnxcIitLK1wiKVwiK2ErXCIoXCIrSytcInwkKVwiKSkmJnkoYSxmdW5jdGlvbihhKXtyZXR1cm4gYi50ZXN0KFwic3RyaW5nXCI9PXR5cGVvZiBhLmNsYXNzTmFtZSYmYS5jbGFzc05hbWV8fFwidW5kZWZpbmVkXCIhPXR5cGVvZiBhLmdldEF0dHJpYnV0ZSYmYS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKXx8XCJcIil9KX0sQVRUUjpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIGZ1bmN0aW9uKGQpe3ZhciBlPWdhLmF0dHIoZCxhKTtyZXR1cm4gbnVsbD09ZT9cIiE9XCI9PT1iOiFifHwoZSs9XCJcIixcIj1cIj09PWI/ZT09PWM6XCIhPVwiPT09Yj9lIT09YzpcIl49XCI9PT1iP2MmJjA9PT1lLmluZGV4T2YoYyk6XCIqPVwiPT09Yj9jJiZlLmluZGV4T2YoYyk+LTE6XCIkPVwiPT09Yj9jJiZlLnNsaWNlKC1jLmxlbmd0aCk9PT1jOlwifj1cIj09PWI/KFwiIFwiK2UucmVwbGFjZShPLFwiIFwiKStcIiBcIikuaW5kZXhPZihjKT4tMTpcInw9XCI9PT1iJiYoZT09PWN8fGUuc2xpY2UoMCxjLmxlbmd0aCsxKT09PWMrXCItXCIpKX19LENISUxEOmZ1bmN0aW9uKGEsYixjLGQsZSl7dmFyIGY9XCJudGhcIiE9PWEuc2xpY2UoMCwzKSxnPVwibGFzdFwiIT09YS5zbGljZSgtNCksaD1cIm9mLXR5cGVcIj09PWI7cmV0dXJuIDE9PT1kJiYwPT09ZT9mdW5jdGlvbihhKXtyZXR1cm4hIWEucGFyZW50Tm9kZX06ZnVuY3Rpb24oYixjLGkpe3ZhciBqLGssbCxtLG4sbyxwPWYhPT1nP1wibmV4dFNpYmxpbmdcIjpcInByZXZpb3VzU2libGluZ1wiLHE9Yi5wYXJlbnROb2RlLHI9aCYmYi5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpLHM9IWkmJiFoLHQ9ITE7aWYocSl7aWYoZil7d2hpbGUocCl7bT1iO3doaWxlKG09bVtwXSlpZihoP20ubm9kZU5hbWUudG9Mb3dlckNhc2UoKT09PXI6MT09PW0ubm9kZVR5cGUpcmV0dXJuITE7bz1wPVwib25seVwiPT09YSYmIW8mJlwibmV4dFNpYmxpbmdcIn1yZXR1cm4hMH1pZihvPVtnP3EuZmlyc3RDaGlsZDpxLmxhc3RDaGlsZF0sZyYmcyl7bT1xLGw9bVt1XXx8KG1bdV09e30pLGs9bFttLnVuaXF1ZUlEXXx8KGxbbS51bmlxdWVJRF09e30pLGo9a1thXXx8W10sbj1qWzBdPT09dyYmalsxXSx0PW4mJmpbMl0sbT1uJiZxLmNoaWxkTm9kZXNbbl07d2hpbGUobT0rK24mJm0mJm1bcF18fCh0PW49MCl8fG8ucG9wKCkpaWYoMT09PW0ubm9kZVR5cGUmJisrdCYmbT09PWIpe2tbYV09W3csbix0XTticmVha319ZWxzZSBpZihzJiYobT1iLGw9bVt1XXx8KG1bdV09e30pLGs9bFttLnVuaXF1ZUlEXXx8KGxbbS51bmlxdWVJRF09e30pLGo9a1thXXx8W10sbj1qWzBdPT09dyYmalsxXSx0PW4pLHQ9PT0hMSl3aGlsZShtPSsrbiYmbSYmbVtwXXx8KHQ9bj0wKXx8by5wb3AoKSlpZigoaD9tLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk9PT1yOjE9PT1tLm5vZGVUeXBlKSYmKyt0JiYocyYmKGw9bVt1XXx8KG1bdV09e30pLGs9bFttLnVuaXF1ZUlEXXx8KGxbbS51bmlxdWVJRF09e30pLGtbYV09W3csdF0pLG09PT1iKSlicmVhaztyZXR1cm4gdC09ZSx0PT09ZHx8dCVkPT09MCYmdC9kPj0wfX19LFBTRVVETzpmdW5jdGlvbihhLGIpe3ZhciBjLGU9ZC5wc2V1ZG9zW2FdfHxkLnNldEZpbHRlcnNbYS50b0xvd2VyQ2FzZSgpXXx8Z2EuZXJyb3IoXCJ1bnN1cHBvcnRlZCBwc2V1ZG86IFwiK2EpO3JldHVybiBlW3VdP2UoYik6ZS5sZW5ndGg+MT8oYz1bYSxhLFwiXCIsYl0sZC5zZXRGaWx0ZXJzLmhhc093blByb3BlcnR5KGEudG9Mb3dlckNhc2UoKSk/aWEoZnVuY3Rpb24oYSxjKXt2YXIgZCxmPWUoYSxiKSxnPWYubGVuZ3RoO3doaWxlKGctLSlkPUkoYSxmW2ddKSxhW2RdPSEoY1tkXT1mW2ddKX0pOmZ1bmN0aW9uKGEpe3JldHVybiBlKGEsMCxjKX0pOmV9fSxwc2V1ZG9zOntub3Q6aWEoZnVuY3Rpb24oYSl7dmFyIGI9W10sYz1bXSxkPWgoYS5yZXBsYWNlKFAsXCIkMVwiKSk7cmV0dXJuIGRbdV0/aWEoZnVuY3Rpb24oYSxiLGMsZSl7dmFyIGYsZz1kKGEsbnVsbCxlLFtdKSxoPWEubGVuZ3RoO3doaWxlKGgtLSkoZj1nW2hdKSYmKGFbaF09IShiW2hdPWYpKX0pOmZ1bmN0aW9uKGEsZSxmKXtyZXR1cm4gYlswXT1hLGQoYixudWxsLGYsYyksYlswXT1udWxsLCFjLnBvcCgpfX0pLGhhczppYShmdW5jdGlvbihhKXtyZXR1cm4gZnVuY3Rpb24oYil7cmV0dXJuIGdhKGEsYikubGVuZ3RoPjB9fSksY29udGFpbnM6aWEoZnVuY3Rpb24oYSl7cmV0dXJuIGE9YS5yZXBsYWNlKF8sYWEpLGZ1bmN0aW9uKGIpe3JldHVybihiLnRleHRDb250ZW50fHxiLmlubmVyVGV4dHx8ZShiKSkuaW5kZXhPZihhKT4tMX19KSxsYW5nOmlhKGZ1bmN0aW9uKGEpe3JldHVybiBVLnRlc3QoYXx8XCJcIil8fGdhLmVycm9yKFwidW5zdXBwb3J0ZWQgbGFuZzogXCIrYSksYT1hLnJlcGxhY2UoXyxhYSkudG9Mb3dlckNhc2UoKSxmdW5jdGlvbihiKXt2YXIgYztkbyBpZihjPXA/Yi5sYW5nOmIuZ2V0QXR0cmlidXRlKFwieG1sOmxhbmdcIil8fGIuZ2V0QXR0cmlidXRlKFwibGFuZ1wiKSlyZXR1cm4gYz1jLnRvTG93ZXJDYXNlKCksYz09PWF8fDA9PT1jLmluZGV4T2YoYStcIi1cIik7d2hpbGUoKGI9Yi5wYXJlbnROb2RlKSYmMT09PWIubm9kZVR5cGUpO3JldHVybiExfX0pLHRhcmdldDpmdW5jdGlvbihiKXt2YXIgYz1hLmxvY2F0aW9uJiZhLmxvY2F0aW9uLmhhc2g7cmV0dXJuIGMmJmMuc2xpY2UoMSk9PT1iLmlkfSxyb290OmZ1bmN0aW9uKGEpe3JldHVybiBhPT09b30sZm9jdXM6ZnVuY3Rpb24oYSl7cmV0dXJuIGE9PT1uLmFjdGl2ZUVsZW1lbnQmJighbi5oYXNGb2N1c3x8bi5oYXNGb2N1cygpKSYmISEoYS50eXBlfHxhLmhyZWZ8fH5hLnRhYkluZGV4KX0sZW5hYmxlZDpvYSghMSksZGlzYWJsZWQ6b2EoITApLGNoZWNrZWQ6ZnVuY3Rpb24oYSl7dmFyIGI9YS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO3JldHVyblwiaW5wdXRcIj09PWImJiEhYS5jaGVja2VkfHxcIm9wdGlvblwiPT09YiYmISFhLnNlbGVjdGVkfSxzZWxlY3RlZDpmdW5jdGlvbihhKXtyZXR1cm4gYS5wYXJlbnROb2RlJiZhLnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleCxhLnNlbGVjdGVkPT09ITB9LGVtcHR5OmZ1bmN0aW9uKGEpe2ZvcihhPWEuZmlyc3RDaGlsZDthO2E9YS5uZXh0U2libGluZylpZihhLm5vZGVUeXBlPDYpcmV0dXJuITE7cmV0dXJuITB9LHBhcmVudDpmdW5jdGlvbihhKXtyZXR1cm4hZC5wc2V1ZG9zLmVtcHR5KGEpfSxoZWFkZXI6ZnVuY3Rpb24oYSl7cmV0dXJuIFgudGVzdChhLm5vZGVOYW1lKX0saW5wdXQ6ZnVuY3Rpb24oYSl7cmV0dXJuIFcudGVzdChhLm5vZGVOYW1lKX0sYnV0dG9uOmZ1bmN0aW9uKGEpe3ZhciBiPWEubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtyZXR1cm5cImlucHV0XCI9PT1iJiZcImJ1dHRvblwiPT09YS50eXBlfHxcImJ1dHRvblwiPT09Yn0sdGV4dDpmdW5jdGlvbihhKXt2YXIgYjtyZXR1cm5cImlucHV0XCI9PT1hLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkmJlwidGV4dFwiPT09YS50eXBlJiYobnVsbD09KGI9YS5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpKXx8XCJ0ZXh0XCI9PT1iLnRvTG93ZXJDYXNlKCkpfSxmaXJzdDpwYShmdW5jdGlvbigpe3JldHVyblswXX0pLGxhc3Q6cGEoZnVuY3Rpb24oYSxiKXtyZXR1cm5bYi0xXX0pLGVxOnBhKGZ1bmN0aW9uKGEsYixjKXtyZXR1cm5bYzwwP2MrYjpjXX0pLGV2ZW46cGEoZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9MDtjPGI7Yys9MilhLnB1c2goYyk7cmV0dXJuIGF9KSxvZGQ6cGEoZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9MTtjPGI7Yys9MilhLnB1c2goYyk7cmV0dXJuIGF9KSxsdDpwYShmdW5jdGlvbihhLGIsYyl7Zm9yKHZhciBkPWM8MD9jK2I6YzstLWQ+PTA7KWEucHVzaChkKTtyZXR1cm4gYX0pLGd0OnBhKGZ1bmN0aW9uKGEsYixjKXtmb3IodmFyIGQ9YzwwP2MrYjpjOysrZDxiOylhLnB1c2goZCk7cmV0dXJuIGF9KX19LGQucHNldWRvcy5udGg9ZC5wc2V1ZG9zLmVxO2ZvcihiIGlue3JhZGlvOiEwLGNoZWNrYm94OiEwLGZpbGU6ITAscGFzc3dvcmQ6ITAsaW1hZ2U6ITB9KWQucHNldWRvc1tiXT1tYShiKTtmb3IoYiBpbntzdWJtaXQ6ITAscmVzZXQ6ITB9KWQucHNldWRvc1tiXT1uYShiKTtmdW5jdGlvbiByYSgpe31yYS5wcm90b3R5cGU9ZC5maWx0ZXJzPWQucHNldWRvcyxkLnNldEZpbHRlcnM9bmV3IHJhLGc9Z2EudG9rZW5pemU9ZnVuY3Rpb24oYSxiKXt2YXIgYyxlLGYsZyxoLGksaixrPXpbYStcIiBcIl07aWYoaylyZXR1cm4gYj8wOmsuc2xpY2UoMCk7aD1hLGk9W10saj1kLnByZUZpbHRlcjt3aGlsZShoKXtjJiYhKGU9US5leGVjKGgpKXx8KGUmJihoPWguc2xpY2UoZVswXS5sZW5ndGgpfHxoKSxpLnB1c2goZj1bXSkpLGM9ITEsKGU9Ui5leGVjKGgpKSYmKGM9ZS5zaGlmdCgpLGYucHVzaCh7dmFsdWU6Yyx0eXBlOmVbMF0ucmVwbGFjZShQLFwiIFwiKX0pLGg9aC5zbGljZShjLmxlbmd0aCkpO2ZvcihnIGluIGQuZmlsdGVyKSEoZT1WW2ddLmV4ZWMoaCkpfHxqW2ddJiYhKGU9altnXShlKSl8fChjPWUuc2hpZnQoKSxmLnB1c2goe3ZhbHVlOmMsdHlwZTpnLG1hdGNoZXM6ZX0pLGg9aC5zbGljZShjLmxlbmd0aCkpO2lmKCFjKWJyZWFrfXJldHVybiBiP2gubGVuZ3RoOmg/Z2EuZXJyb3IoYSk6eihhLGkpLnNsaWNlKDApfTtmdW5jdGlvbiBzYShhKXtmb3IodmFyIGI9MCxjPWEubGVuZ3RoLGQ9XCJcIjtiPGM7YisrKWQrPWFbYl0udmFsdWU7cmV0dXJuIGR9ZnVuY3Rpb24gdGEoYSxiLGMpe3ZhciBkPWIuZGlyLGU9Yi5uZXh0LGY9ZXx8ZCxnPWMmJlwicGFyZW50Tm9kZVwiPT09ZixoPXgrKztyZXR1cm4gYi5maXJzdD9mdW5jdGlvbihiLGMsZSl7d2hpbGUoYj1iW2RdKWlmKDE9PT1iLm5vZGVUeXBlfHxnKXJldHVybiBhKGIsYyxlKTtyZXR1cm4hMX06ZnVuY3Rpb24oYixjLGkpe3ZhciBqLGssbCxtPVt3LGhdO2lmKGkpe3doaWxlKGI9YltkXSlpZigoMT09PWIubm9kZVR5cGV8fGcpJiZhKGIsYyxpKSlyZXR1cm4hMH1lbHNlIHdoaWxlKGI9YltkXSlpZigxPT09Yi5ub2RlVHlwZXx8ZylpZihsPWJbdV18fChiW3VdPXt9KSxrPWxbYi51bmlxdWVJRF18fChsW2IudW5pcXVlSURdPXt9KSxlJiZlPT09Yi5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKWI9YltkXXx8YjtlbHNle2lmKChqPWtbZl0pJiZqWzBdPT09dyYmalsxXT09PWgpcmV0dXJuIG1bMl09alsyXTtpZihrW2ZdPW0sbVsyXT1hKGIsYyxpKSlyZXR1cm4hMH1yZXR1cm4hMX19ZnVuY3Rpb24gdWEoYSl7cmV0dXJuIGEubGVuZ3RoPjE/ZnVuY3Rpb24oYixjLGQpe3ZhciBlPWEubGVuZ3RoO3doaWxlKGUtLSlpZighYVtlXShiLGMsZCkpcmV0dXJuITE7cmV0dXJuITB9OmFbMF19ZnVuY3Rpb24gdmEoYSxiLGMpe2Zvcih2YXIgZD0wLGU9Yi5sZW5ndGg7ZDxlO2QrKylnYShhLGJbZF0sYyk7cmV0dXJuIGN9ZnVuY3Rpb24gd2EoYSxiLGMsZCxlKXtmb3IodmFyIGYsZz1bXSxoPTAsaT1hLmxlbmd0aCxqPW51bGwhPWI7aDxpO2grKykoZj1hW2hdKSYmKGMmJiFjKGYsZCxlKXx8KGcucHVzaChmKSxqJiZiLnB1c2goaCkpKTtyZXR1cm4gZ31mdW5jdGlvbiB4YShhLGIsYyxkLGUsZil7cmV0dXJuIGQmJiFkW3VdJiYoZD14YShkKSksZSYmIWVbdV0mJihlPXhhKGUsZikpLGlhKGZ1bmN0aW9uKGYsZyxoLGkpe3ZhciBqLGssbCxtPVtdLG49W10sbz1nLmxlbmd0aCxwPWZ8fHZhKGJ8fFwiKlwiLGgubm9kZVR5cGU/W2hdOmgsW10pLHE9IWF8fCFmJiZiP3A6d2EocCxtLGEsaCxpKSxyPWM/ZXx8KGY/YTpvfHxkKT9bXTpnOnE7aWYoYyYmYyhxLHIsaCxpKSxkKXtqPXdhKHIsbiksZChqLFtdLGgsaSksaz1qLmxlbmd0aDt3aGlsZShrLS0pKGw9altrXSkmJihyW25ba11dPSEocVtuW2tdXT1sKSl9aWYoZil7aWYoZXx8YSl7aWYoZSl7aj1bXSxrPXIubGVuZ3RoO3doaWxlKGstLSkobD1yW2tdKSYmai5wdXNoKHFba109bCk7ZShudWxsLHI9W10saixpKX1rPXIubGVuZ3RoO3doaWxlKGstLSkobD1yW2tdKSYmKGo9ZT9JKGYsbCk6bVtrXSk+LTEmJihmW2pdPSEoZ1tqXT1sKSl9fWVsc2Ugcj13YShyPT09Zz9yLnNwbGljZShvLHIubGVuZ3RoKTpyKSxlP2UobnVsbCxnLHIsaSk6Ry5hcHBseShnLHIpfSl9ZnVuY3Rpb24geWEoYSl7Zm9yKHZhciBiLGMsZSxmPWEubGVuZ3RoLGc9ZC5yZWxhdGl2ZVthWzBdLnR5cGVdLGg9Z3x8ZC5yZWxhdGl2ZVtcIiBcIl0saT1nPzE6MCxrPXRhKGZ1bmN0aW9uKGEpe3JldHVybiBhPT09Yn0saCwhMCksbD10YShmdW5jdGlvbihhKXtyZXR1cm4gSShiLGEpPi0xfSxoLCEwKSxtPVtmdW5jdGlvbihhLGMsZCl7dmFyIGU9IWcmJihkfHxjIT09ail8fCgoYj1jKS5ub2RlVHlwZT9rKGEsYyxkKTpsKGEsYyxkKSk7cmV0dXJuIGI9bnVsbCxlfV07aTxmO2krKylpZihjPWQucmVsYXRpdmVbYVtpXS50eXBlXSltPVt0YSh1YShtKSxjKV07ZWxzZXtpZihjPWQuZmlsdGVyW2FbaV0udHlwZV0uYXBwbHkobnVsbCxhW2ldLm1hdGNoZXMpLGNbdV0pe2ZvcihlPSsraTtlPGY7ZSsrKWlmKGQucmVsYXRpdmVbYVtlXS50eXBlXSlicmVhaztyZXR1cm4geGEoaT4xJiZ1YShtKSxpPjEmJnNhKGEuc2xpY2UoMCxpLTEpLmNvbmNhdCh7dmFsdWU6XCIgXCI9PT1hW2ktMl0udHlwZT9cIipcIjpcIlwifSkpLnJlcGxhY2UoUCxcIiQxXCIpLGMsaTxlJiZ5YShhLnNsaWNlKGksZSkpLGU8ZiYmeWEoYT1hLnNsaWNlKGUpKSxlPGYmJnNhKGEpKX1tLnB1c2goYyl9cmV0dXJuIHVhKG0pfWZ1bmN0aW9uIHphKGEsYil7dmFyIGM9Yi5sZW5ndGg+MCxlPWEubGVuZ3RoPjAsZj1mdW5jdGlvbihmLGcsaCxpLGspe3ZhciBsLG8scSxyPTAscz1cIjBcIix0PWYmJltdLHU9W10sdj1qLHg9Znx8ZSYmZC5maW5kLlRBRyhcIipcIixrKSx5PXcrPW51bGw9PXY/MTpNYXRoLnJhbmRvbSgpfHwuMSx6PXgubGVuZ3RoO2ZvcihrJiYoaj1nPT09bnx8Z3x8ayk7cyE9PXomJm51bGwhPShsPXhbc10pO3MrKyl7aWYoZSYmbCl7bz0wLGd8fGwub3duZXJEb2N1bWVudD09PW58fChtKGwpLGg9IXApO3doaWxlKHE9YVtvKytdKWlmKHEobCxnfHxuLGgpKXtpLnB1c2gobCk7YnJlYWt9ayYmKHc9eSl9YyYmKChsPSFxJiZsKSYmci0tLGYmJnQucHVzaChsKSl9aWYocis9cyxjJiZzIT09cil7bz0wO3doaWxlKHE9YltvKytdKXEodCx1LGcsaCk7aWYoZil7aWYocj4wKXdoaWxlKHMtLSl0W3NdfHx1W3NdfHwodVtzXT1FLmNhbGwoaSkpO3U9d2EodSl9Ry5hcHBseShpLHUpLGsmJiFmJiZ1Lmxlbmd0aD4wJiZyK2IubGVuZ3RoPjEmJmdhLnVuaXF1ZVNvcnQoaSl9cmV0dXJuIGsmJih3PXksaj12KSx0fTtyZXR1cm4gYz9pYShmKTpmfXJldHVybiBoPWdhLmNvbXBpbGU9ZnVuY3Rpb24oYSxiKXt2YXIgYyxkPVtdLGU9W10sZj1BW2ErXCIgXCJdO2lmKCFmKXtifHwoYj1nKGEpKSxjPWIubGVuZ3RoO3doaWxlKGMtLSlmPXlhKGJbY10pLGZbdV0/ZC5wdXNoKGYpOmUucHVzaChmKTtmPUEoYSx6YShlLGQpKSxmLnNlbGVjdG9yPWF9cmV0dXJuIGZ9LGk9Z2Euc2VsZWN0PWZ1bmN0aW9uKGEsYixjLGUpe3ZhciBmLGksaixrLGwsbT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBhJiZhLG49IWUmJmcoYT1tLnNlbGVjdG9yfHxhKTtpZihjPWN8fFtdLDE9PT1uLmxlbmd0aCl7aWYoaT1uWzBdPW5bMF0uc2xpY2UoMCksaS5sZW5ndGg+MiYmXCJJRFwiPT09KGo9aVswXSkudHlwZSYmOT09PWIubm9kZVR5cGUmJnAmJmQucmVsYXRpdmVbaVsxXS50eXBlXSl7aWYoYj0oZC5maW5kLklEKGoubWF0Y2hlc1swXS5yZXBsYWNlKF8sYWEpLGIpfHxbXSlbMF0sIWIpcmV0dXJuIGM7bSYmKGI9Yi5wYXJlbnROb2RlKSxhPWEuc2xpY2UoaS5zaGlmdCgpLnZhbHVlLmxlbmd0aCl9Zj1WLm5lZWRzQ29udGV4dC50ZXN0KGEpPzA6aS5sZW5ndGg7d2hpbGUoZi0tKXtpZihqPWlbZl0sZC5yZWxhdGl2ZVtrPWoudHlwZV0pYnJlYWs7aWYoKGw9ZC5maW5kW2tdKSYmKGU9bChqLm1hdGNoZXNbMF0ucmVwbGFjZShfLGFhKSwkLnRlc3QoaVswXS50eXBlKSYmcWEoYi5wYXJlbnROb2RlKXx8YikpKXtpZihpLnNwbGljZShmLDEpLGE9ZS5sZW5ndGgmJnNhKGkpLCFhKXJldHVybiBHLmFwcGx5KGMsZSksYzticmVha319fXJldHVybihtfHxoKGEsbikpKGUsYiwhcCxjLCFifHwkLnRlc3QoYSkmJnFhKGIucGFyZW50Tm9kZSl8fGIpLGN9LGMuc29ydFN0YWJsZT11LnNwbGl0KFwiXCIpLnNvcnQoQikuam9pbihcIlwiKT09PXUsYy5kZXRlY3REdXBsaWNhdGVzPSEhbCxtKCksYy5zb3J0RGV0YWNoZWQ9amEoZnVuY3Rpb24oYSl7cmV0dXJuIDEmYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihuLmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKSl9KSxqYShmdW5jdGlvbihhKXtyZXR1cm4gYS5pbm5lckhUTUw9XCI8YSBocmVmPScjJz48L2E+XCIsXCIjXCI9PT1hLmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKX0pfHxrYShcInR5cGV8aHJlZnxoZWlnaHR8d2lkdGhcIixmdW5jdGlvbihhLGIsYyl7aWYoIWMpcmV0dXJuIGEuZ2V0QXR0cmlidXRlKGIsXCJ0eXBlXCI9PT1iLnRvTG93ZXJDYXNlKCk/MToyKX0pLGMuYXR0cmlidXRlcyYmamEoZnVuY3Rpb24oYSl7cmV0dXJuIGEuaW5uZXJIVE1MPVwiPGlucHV0Lz5cIixhLmZpcnN0Q2hpbGQuc2V0QXR0cmlidXRlKFwidmFsdWVcIixcIlwiKSxcIlwiPT09YS5maXJzdENoaWxkLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpfSl8fGthKFwidmFsdWVcIixmdW5jdGlvbihhLGIsYyl7aWYoIWMmJlwiaW5wdXRcIj09PWEubm9kZU5hbWUudG9Mb3dlckNhc2UoKSlyZXR1cm4gYS5kZWZhdWx0VmFsdWV9KSxqYShmdW5jdGlvbihhKXtyZXR1cm4gbnVsbD09YS5nZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKX0pfHxrYShKLGZ1bmN0aW9uKGEsYixjKXt2YXIgZDtpZighYylyZXR1cm4gYVtiXT09PSEwP2IudG9Mb3dlckNhc2UoKTooZD1hLmdldEF0dHJpYnV0ZU5vZGUoYikpJiZkLnNwZWNpZmllZD9kLnZhbHVlOm51bGx9KSxnYX0oYSk7ci5maW5kPXgsci5leHByPXguc2VsZWN0b3JzLHIuZXhwcltcIjpcIl09ci5leHByLnBzZXVkb3Msci51bmlxdWVTb3J0PXIudW5pcXVlPXgudW5pcXVlU29ydCxyLnRleHQ9eC5nZXRUZXh0LHIuaXNYTUxEb2M9eC5pc1hNTCxyLmNvbnRhaW5zPXguY29udGFpbnMsci5lc2NhcGVTZWxlY3Rvcj14LmVzY2FwZTt2YXIgeT1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9W10sZT12b2lkIDAhPT1jO3doaWxlKChhPWFbYl0pJiY5IT09YS5ub2RlVHlwZSlpZigxPT09YS5ub2RlVHlwZSl7aWYoZSYmcihhKS5pcyhjKSlicmVhaztkLnB1c2goYSl9cmV0dXJuIGR9LHo9ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9W107YTthPWEubmV4dFNpYmxpbmcpMT09PWEubm9kZVR5cGUmJmEhPT1iJiZjLnB1c2goYSk7cmV0dXJuIGN9LEE9ci5leHByLm1hdGNoLm5lZWRzQ29udGV4dDtmdW5jdGlvbiBCKGEsYil7cmV0dXJuIGEubm9kZU5hbWUmJmEubm9kZU5hbWUudG9Mb3dlckNhc2UoKT09PWIudG9Mb3dlckNhc2UoKX12YXIgQz0vXjwoW2Etel1bXlxcL1xcMD46XFx4MjBcXHRcXHJcXG5cXGZdKilbXFx4MjBcXHRcXHJcXG5cXGZdKlxcLz8+KD86PFxcL1xcMT58KSQvaSxEPS9eLlteOiNcXFtcXC4sXSokLztmdW5jdGlvbiBFKGEsYixjKXtyZXR1cm4gci5pc0Z1bmN0aW9uKGIpP3IuZ3JlcChhLGZ1bmN0aW9uKGEsZCl7cmV0dXJuISFiLmNhbGwoYSxkLGEpIT09Y30pOmIubm9kZVR5cGU/ci5ncmVwKGEsZnVuY3Rpb24oYSl7cmV0dXJuIGE9PT1iIT09Y30pOlwic3RyaW5nXCIhPXR5cGVvZiBiP3IuZ3JlcChhLGZ1bmN0aW9uKGEpe3JldHVybiBpLmNhbGwoYixhKT4tMSE9PWN9KTpELnRlc3QoYik/ci5maWx0ZXIoYixhLGMpOihiPXIuZmlsdGVyKGIsYSksci5ncmVwKGEsZnVuY3Rpb24oYSl7cmV0dXJuIGkuY2FsbChiLGEpPi0xIT09YyYmMT09PWEubm9kZVR5cGV9KSl9ci5maWx0ZXI9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPWJbMF07cmV0dXJuIGMmJihhPVwiOm5vdChcIithK1wiKVwiKSwxPT09Yi5sZW5ndGgmJjE9PT1kLm5vZGVUeXBlP3IuZmluZC5tYXRjaGVzU2VsZWN0b3IoZCxhKT9bZF06W106ci5maW5kLm1hdGNoZXMoYSxyLmdyZXAoYixmdW5jdGlvbihhKXtyZXR1cm4gMT09PWEubm9kZVR5cGV9KSl9LHIuZm4uZXh0ZW5kKHtmaW5kOmZ1bmN0aW9uKGEpe3ZhciBiLGMsZD10aGlzLmxlbmd0aCxlPXRoaXM7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGEpcmV0dXJuIHRoaXMucHVzaFN0YWNrKHIoYSkuZmlsdGVyKGZ1bmN0aW9uKCl7Zm9yKGI9MDtiPGQ7YisrKWlmKHIuY29udGFpbnMoZVtiXSx0aGlzKSlyZXR1cm4hMH0pKTtmb3IoYz10aGlzLnB1c2hTdGFjayhbXSksYj0wO2I8ZDtiKyspci5maW5kKGEsZVtiXSxjKTtyZXR1cm4gZD4xP3IudW5pcXVlU29ydChjKTpjfSxmaWx0ZXI6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMucHVzaFN0YWNrKEUodGhpcyxhfHxbXSwhMSkpfSxub3Q6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMucHVzaFN0YWNrKEUodGhpcyxhfHxbXSwhMCkpfSxpczpmdW5jdGlvbihhKXtyZXR1cm4hIUUodGhpcyxcInN0cmluZ1wiPT10eXBlb2YgYSYmQS50ZXN0KGEpP3IoYSk6YXx8W10sITEpLmxlbmd0aH19KTt2YXIgRixHPS9eKD86XFxzKig8W1xcd1xcV10rPilbXj5dKnwjKFtcXHctXSspKSQvLEg9ci5mbi5pbml0PWZ1bmN0aW9uKGEsYixjKXt2YXIgZSxmO2lmKCFhKXJldHVybiB0aGlzO2lmKGM9Y3x8RixcInN0cmluZ1wiPT10eXBlb2YgYSl7aWYoZT1cIjxcIj09PWFbMF0mJlwiPlwiPT09YVthLmxlbmd0aC0xXSYmYS5sZW5ndGg+PTM/W251bGwsYSxudWxsXTpHLmV4ZWMoYSksIWV8fCFlWzFdJiZiKXJldHVybiFifHxiLmpxdWVyeT8oYnx8YykuZmluZChhKTp0aGlzLmNvbnN0cnVjdG9yKGIpLmZpbmQoYSk7aWYoZVsxXSl7aWYoYj1iIGluc3RhbmNlb2Ygcj9iWzBdOmIsci5tZXJnZSh0aGlzLHIucGFyc2VIVE1MKGVbMV0sYiYmYi5ub2RlVHlwZT9iLm93bmVyRG9jdW1lbnR8fGI6ZCwhMCkpLEMudGVzdChlWzFdKSYmci5pc1BsYWluT2JqZWN0KGIpKWZvcihlIGluIGIpci5pc0Z1bmN0aW9uKHRoaXNbZV0pP3RoaXNbZV0oYltlXSk6dGhpcy5hdHRyKGUsYltlXSk7cmV0dXJuIHRoaXN9cmV0dXJuIGY9ZC5nZXRFbGVtZW50QnlJZChlWzJdKSxmJiYodGhpc1swXT1mLHRoaXMubGVuZ3RoPTEpLHRoaXN9cmV0dXJuIGEubm9kZVR5cGU/KHRoaXNbMF09YSx0aGlzLmxlbmd0aD0xLHRoaXMpOnIuaXNGdW5jdGlvbihhKT92b2lkIDAhPT1jLnJlYWR5P2MucmVhZHkoYSk6YShyKTpyLm1ha2VBcnJheShhLHRoaXMpfTtILnByb3RvdHlwZT1yLmZuLEY9cihkKTt2YXIgST0vXig/OnBhcmVudHN8cHJldig/OlVudGlsfEFsbCkpLyxKPXtjaGlsZHJlbjohMCxjb250ZW50czohMCxuZXh0OiEwLHByZXY6ITB9O3IuZm4uZXh0ZW5kKHtoYXM6ZnVuY3Rpb24oYSl7dmFyIGI9cihhLHRoaXMpLGM9Yi5sZW5ndGg7cmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKCl7Zm9yKHZhciBhPTA7YTxjO2ErKylpZihyLmNvbnRhaW5zKHRoaXMsYlthXSkpcmV0dXJuITB9KX0sY2xvc2VzdDpmdW5jdGlvbihhLGIpe3ZhciBjLGQ9MCxlPXRoaXMubGVuZ3RoLGY9W10sZz1cInN0cmluZ1wiIT10eXBlb2YgYSYmcihhKTtpZighQS50ZXN0KGEpKWZvcig7ZDxlO2QrKylmb3IoYz10aGlzW2RdO2MmJmMhPT1iO2M9Yy5wYXJlbnROb2RlKWlmKGMubm9kZVR5cGU8MTEmJihnP2cuaW5kZXgoYyk+LTE6MT09PWMubm9kZVR5cGUmJnIuZmluZC5tYXRjaGVzU2VsZWN0b3IoYyxhKSkpe2YucHVzaChjKTticmVha31yZXR1cm4gdGhpcy5wdXNoU3RhY2soZi5sZW5ndGg+MT9yLnVuaXF1ZVNvcnQoZik6Zil9LGluZGV4OmZ1bmN0aW9uKGEpe3JldHVybiBhP1wic3RyaW5nXCI9PXR5cGVvZiBhP2kuY2FsbChyKGEpLHRoaXNbMF0pOmkuY2FsbCh0aGlzLGEuanF1ZXJ5P2FbMF06YSk6dGhpc1swXSYmdGhpc1swXS5wYXJlbnROb2RlP3RoaXMuZmlyc3QoKS5wcmV2QWxsKCkubGVuZ3RoOi0xfSxhZGQ6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdGhpcy5wdXNoU3RhY2soci51bmlxdWVTb3J0KHIubWVyZ2UodGhpcy5nZXQoKSxyKGEsYikpKSl9LGFkZEJhY2s6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuYWRkKG51bGw9PWE/dGhpcy5wcmV2T2JqZWN0OnRoaXMucHJldk9iamVjdC5maWx0ZXIoYSkpfX0pO2Z1bmN0aW9uIEsoYSxiKXt3aGlsZSgoYT1hW2JdKSYmMSE9PWEubm9kZVR5cGUpO3JldHVybiBhfXIuZWFjaCh7cGFyZW50OmZ1bmN0aW9uKGEpe3ZhciBiPWEucGFyZW50Tm9kZTtyZXR1cm4gYiYmMTEhPT1iLm5vZGVUeXBlP2I6bnVsbH0scGFyZW50czpmdW5jdGlvbihhKXtyZXR1cm4geShhLFwicGFyZW50Tm9kZVwiKX0scGFyZW50c1VudGlsOmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4geShhLFwicGFyZW50Tm9kZVwiLGMpfSxuZXh0OmZ1bmN0aW9uKGEpe3JldHVybiBLKGEsXCJuZXh0U2libGluZ1wiKX0scHJldjpmdW5jdGlvbihhKXtyZXR1cm4gSyhhLFwicHJldmlvdXNTaWJsaW5nXCIpfSxuZXh0QWxsOmZ1bmN0aW9uKGEpe3JldHVybiB5KGEsXCJuZXh0U2libGluZ1wiKX0scHJldkFsbDpmdW5jdGlvbihhKXtyZXR1cm4geShhLFwicHJldmlvdXNTaWJsaW5nXCIpfSxuZXh0VW50aWw6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiB5KGEsXCJuZXh0U2libGluZ1wiLGMpfSxwcmV2VW50aWw6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiB5KGEsXCJwcmV2aW91c1NpYmxpbmdcIixjKX0sc2libGluZ3M6ZnVuY3Rpb24oYSl7cmV0dXJuIHooKGEucGFyZW50Tm9kZXx8e30pLmZpcnN0Q2hpbGQsYSl9LGNoaWxkcmVuOmZ1bmN0aW9uKGEpe3JldHVybiB6KGEuZmlyc3RDaGlsZCl9LGNvbnRlbnRzOmZ1bmN0aW9uKGEpe3JldHVybiBCKGEsXCJpZnJhbWVcIik/YS5jb250ZW50RG9jdW1lbnQ6KEIoYSxcInRlbXBsYXRlXCIpJiYoYT1hLmNvbnRlbnR8fGEpLHIubWVyZ2UoW10sYS5jaGlsZE5vZGVzKSl9fSxmdW5jdGlvbihhLGIpe3IuZm5bYV09ZnVuY3Rpb24oYyxkKXt2YXIgZT1yLm1hcCh0aGlzLGIsYyk7cmV0dXJuXCJVbnRpbFwiIT09YS5zbGljZSgtNSkmJihkPWMpLGQmJlwic3RyaW5nXCI9PXR5cGVvZiBkJiYoZT1yLmZpbHRlcihkLGUpKSx0aGlzLmxlbmd0aD4xJiYoSlthXXx8ci51bmlxdWVTb3J0KGUpLEkudGVzdChhKSYmZS5yZXZlcnNlKCkpLHRoaXMucHVzaFN0YWNrKGUpfX0pO3ZhciBMPS9bXlxceDIwXFx0XFxyXFxuXFxmXSsvZztmdW5jdGlvbiBNKGEpe3ZhciBiPXt9O3JldHVybiByLmVhY2goYS5tYXRjaChMKXx8W10sZnVuY3Rpb24oYSxjKXtiW2NdPSEwfSksYn1yLkNhbGxiYWNrcz1mdW5jdGlvbihhKXthPVwic3RyaW5nXCI9PXR5cGVvZiBhP00oYSk6ci5leHRlbmQoe30sYSk7dmFyIGIsYyxkLGUsZj1bXSxnPVtdLGg9LTEsaT1mdW5jdGlvbigpe2ZvcihlPWV8fGEub25jZSxkPWI9ITA7Zy5sZW5ndGg7aD0tMSl7Yz1nLnNoaWZ0KCk7d2hpbGUoKytoPGYubGVuZ3RoKWZbaF0uYXBwbHkoY1swXSxjWzFdKT09PSExJiZhLnN0b3BPbkZhbHNlJiYoaD1mLmxlbmd0aCxjPSExKX1hLm1lbW9yeXx8KGM9ITEpLGI9ITEsZSYmKGY9Yz9bXTpcIlwiKX0saj17YWRkOmZ1bmN0aW9uKCl7cmV0dXJuIGYmJihjJiYhYiYmKGg9Zi5sZW5ndGgtMSxnLnB1c2goYykpLGZ1bmN0aW9uIGQoYil7ci5lYWNoKGIsZnVuY3Rpb24oYixjKXtyLmlzRnVuY3Rpb24oYyk/YS51bmlxdWUmJmouaGFzKGMpfHxmLnB1c2goYyk6YyYmYy5sZW5ndGgmJlwic3RyaW5nXCIhPT1yLnR5cGUoYykmJmQoYyl9KX0oYXJndW1lbnRzKSxjJiYhYiYmaSgpKSx0aGlzfSxyZW1vdmU6ZnVuY3Rpb24oKXtyZXR1cm4gci5lYWNoKGFyZ3VtZW50cyxmdW5jdGlvbihhLGIpe3ZhciBjO3doaWxlKChjPXIuaW5BcnJheShiLGYsYykpPi0xKWYuc3BsaWNlKGMsMSksYzw9aCYmaC0tfSksdGhpc30saGFzOmZ1bmN0aW9uKGEpe3JldHVybiBhP3IuaW5BcnJheShhLGYpPi0xOmYubGVuZ3RoPjB9LGVtcHR5OmZ1bmN0aW9uKCl7cmV0dXJuIGYmJihmPVtdKSx0aGlzfSxkaXNhYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIGU9Zz1bXSxmPWM9XCJcIix0aGlzfSxkaXNhYmxlZDpmdW5jdGlvbigpe3JldHVybiFmfSxsb2NrOmZ1bmN0aW9uKCl7cmV0dXJuIGU9Zz1bXSxjfHxifHwoZj1jPVwiXCIpLHRoaXN9LGxvY2tlZDpmdW5jdGlvbigpe3JldHVybiEhZX0sZmlyZVdpdGg6ZnVuY3Rpb24oYSxjKXtyZXR1cm4gZXx8KGM9Y3x8W10sYz1bYSxjLnNsaWNlP2Muc2xpY2UoKTpjXSxnLnB1c2goYyksYnx8aSgpKSx0aGlzfSxmaXJlOmZ1bmN0aW9uKCl7cmV0dXJuIGouZmlyZVdpdGgodGhpcyxhcmd1bWVudHMpLHRoaXN9LGZpcmVkOmZ1bmN0aW9uKCl7cmV0dXJuISFkfX07cmV0dXJuIGp9O2Z1bmN0aW9uIE4oYSl7cmV0dXJuIGF9ZnVuY3Rpb24gTyhhKXt0aHJvdyBhfWZ1bmN0aW9uIFAoYSxiLGMsZCl7dmFyIGU7dHJ5e2EmJnIuaXNGdW5jdGlvbihlPWEucHJvbWlzZSk/ZS5jYWxsKGEpLmRvbmUoYikuZmFpbChjKTphJiZyLmlzRnVuY3Rpb24oZT1hLnRoZW4pP2UuY2FsbChhLGIsYyk6Yi5hcHBseSh2b2lkIDAsW2FdLnNsaWNlKGQpKX1jYXRjaChhKXtjLmFwcGx5KHZvaWQgMCxbYV0pfX1yLmV4dGVuZCh7RGVmZXJyZWQ6ZnVuY3Rpb24oYil7dmFyIGM9W1tcIm5vdGlmeVwiLFwicHJvZ3Jlc3NcIixyLkNhbGxiYWNrcyhcIm1lbW9yeVwiKSxyLkNhbGxiYWNrcyhcIm1lbW9yeVwiKSwyXSxbXCJyZXNvbHZlXCIsXCJkb25lXCIsci5DYWxsYmFja3MoXCJvbmNlIG1lbW9yeVwiKSxyLkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLDAsXCJyZXNvbHZlZFwiXSxbXCJyZWplY3RcIixcImZhaWxcIixyLkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLHIuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIiksMSxcInJlamVjdGVkXCJdXSxkPVwicGVuZGluZ1wiLGU9e3N0YXRlOmZ1bmN0aW9uKCl7cmV0dXJuIGR9LGFsd2F5czpmdW5jdGlvbigpe3JldHVybiBmLmRvbmUoYXJndW1lbnRzKS5mYWlsKGFyZ3VtZW50cyksdGhpc30sXCJjYXRjaFwiOmZ1bmN0aW9uKGEpe3JldHVybiBlLnRoZW4obnVsbCxhKX0scGlwZTpmdW5jdGlvbigpe3ZhciBhPWFyZ3VtZW50cztyZXR1cm4gci5EZWZlcnJlZChmdW5jdGlvbihiKXtyLmVhY2goYyxmdW5jdGlvbihjLGQpe3ZhciBlPXIuaXNGdW5jdGlvbihhW2RbNF1dKSYmYVtkWzRdXTtmW2RbMV1dKGZ1bmN0aW9uKCl7dmFyIGE9ZSYmZS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7YSYmci5pc0Z1bmN0aW9uKGEucHJvbWlzZSk/YS5wcm9taXNlKCkucHJvZ3Jlc3MoYi5ub3RpZnkpLmRvbmUoYi5yZXNvbHZlKS5mYWlsKGIucmVqZWN0KTpiW2RbMF0rXCJXaXRoXCJdKHRoaXMsZT9bYV06YXJndW1lbnRzKX0pfSksYT1udWxsfSkucHJvbWlzZSgpfSx0aGVuOmZ1bmN0aW9uKGIsZCxlKXt2YXIgZj0wO2Z1bmN0aW9uIGcoYixjLGQsZSl7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIGg9dGhpcyxpPWFyZ3VtZW50cyxqPWZ1bmN0aW9uKCl7dmFyIGEsajtpZighKGI8Zikpe2lmKGE9ZC5hcHBseShoLGkpLGE9PT1jLnByb21pc2UoKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlbmFibGUgc2VsZi1yZXNvbHV0aW9uXCIpO2o9YSYmKFwib2JqZWN0XCI9PXR5cGVvZiBhfHxcImZ1bmN0aW9uXCI9PXR5cGVvZiBhKSYmYS50aGVuLHIuaXNGdW5jdGlvbihqKT9lP2ouY2FsbChhLGcoZixjLE4sZSksZyhmLGMsTyxlKSk6KGYrKyxqLmNhbGwoYSxnKGYsYyxOLGUpLGcoZixjLE8sZSksZyhmLGMsTixjLm5vdGlmeVdpdGgpKSk6KGQhPT1OJiYoaD12b2lkIDAsaT1bYV0pLChlfHxjLnJlc29sdmVXaXRoKShoLGkpKX19LGs9ZT9qOmZ1bmN0aW9uKCl7dHJ5e2ooKX1jYXRjaChhKXtyLkRlZmVycmVkLmV4Y2VwdGlvbkhvb2smJnIuRGVmZXJyZWQuZXhjZXB0aW9uSG9vayhhLGsuc3RhY2tUcmFjZSksYisxPj1mJiYoZCE9PU8mJihoPXZvaWQgMCxpPVthXSksYy5yZWplY3RXaXRoKGgsaSkpfX07Yj9rKCk6KHIuRGVmZXJyZWQuZ2V0U3RhY2tIb29rJiYoay5zdGFja1RyYWNlPXIuRGVmZXJyZWQuZ2V0U3RhY2tIb29rKCkpLGEuc2V0VGltZW91dChrKSl9fXJldHVybiByLkRlZmVycmVkKGZ1bmN0aW9uKGEpe2NbMF1bM10uYWRkKGcoMCxhLHIuaXNGdW5jdGlvbihlKT9lOk4sYS5ub3RpZnlXaXRoKSksY1sxXVszXS5hZGQoZygwLGEsci5pc0Z1bmN0aW9uKGIpP2I6TikpLGNbMl1bM10uYWRkKGcoMCxhLHIuaXNGdW5jdGlvbihkKT9kOk8pKX0pLnByb21pc2UoKX0scHJvbWlzZTpmdW5jdGlvbihhKXtyZXR1cm4gbnVsbCE9YT9yLmV4dGVuZChhLGUpOmV9fSxmPXt9O3JldHVybiByLmVhY2goYyxmdW5jdGlvbihhLGIpe3ZhciBnPWJbMl0saD1iWzVdO2VbYlsxXV09Zy5hZGQsaCYmZy5hZGQoZnVuY3Rpb24oKXtkPWh9LGNbMy1hXVsyXS5kaXNhYmxlLGNbMF1bMl0ubG9jayksZy5hZGQoYlszXS5maXJlKSxmW2JbMF1dPWZ1bmN0aW9uKCl7cmV0dXJuIGZbYlswXStcIldpdGhcIl0odGhpcz09PWY/dm9pZCAwOnRoaXMsYXJndW1lbnRzKSx0aGlzfSxmW2JbMF0rXCJXaXRoXCJdPWcuZmlyZVdpdGh9KSxlLnByb21pc2UoZiksYiYmYi5jYWxsKGYsZiksZn0sd2hlbjpmdW5jdGlvbihhKXt2YXIgYj1hcmd1bWVudHMubGVuZ3RoLGM9YixkPUFycmF5KGMpLGU9Zi5jYWxsKGFyZ3VtZW50cyksZz1yLkRlZmVycmVkKCksaD1mdW5jdGlvbihhKXtyZXR1cm4gZnVuY3Rpb24oYyl7ZFthXT10aGlzLGVbYV09YXJndW1lbnRzLmxlbmd0aD4xP2YuY2FsbChhcmd1bWVudHMpOmMsLS1ifHxnLnJlc29sdmVXaXRoKGQsZSl9fTtpZihiPD0xJiYoUChhLGcuZG9uZShoKGMpKS5yZXNvbHZlLGcucmVqZWN0LCFiKSxcInBlbmRpbmdcIj09PWcuc3RhdGUoKXx8ci5pc0Z1bmN0aW9uKGVbY10mJmVbY10udGhlbikpKXJldHVybiBnLnRoZW4oKTt3aGlsZShjLS0pUChlW2NdLGgoYyksZy5yZWplY3QpO3JldHVybiBnLnByb21pc2UoKX19KTt2YXIgUT0vXihFdmFsfEludGVybmFsfFJhbmdlfFJlZmVyZW5jZXxTeW50YXh8VHlwZXxVUkkpRXJyb3IkLztyLkRlZmVycmVkLmV4Y2VwdGlvbkhvb2s9ZnVuY3Rpb24oYixjKXthLmNvbnNvbGUmJmEuY29uc29sZS53YXJuJiZiJiZRLnRlc3QoYi5uYW1lKSYmYS5jb25zb2xlLndhcm4oXCJqUXVlcnkuRGVmZXJyZWQgZXhjZXB0aW9uOiBcIitiLm1lc3NhZ2UsYi5zdGFjayxjKX0sci5yZWFkeUV4Y2VwdGlvbj1mdW5jdGlvbihiKXthLnNldFRpbWVvdXQoZnVuY3Rpb24oKXt0aHJvdyBifSl9O3ZhciBSPXIuRGVmZXJyZWQoKTtyLmZuLnJlYWR5PWZ1bmN0aW9uKGEpe3JldHVybiBSLnRoZW4oYSlbXCJjYXRjaFwiXShmdW5jdGlvbihhKXtyLnJlYWR5RXhjZXB0aW9uKGEpfSksdGhpc30sci5leHRlbmQoe2lzUmVhZHk6ITEscmVhZHlXYWl0OjEscmVhZHk6ZnVuY3Rpb24oYSl7KGE9PT0hMD8tLXIucmVhZHlXYWl0OnIuaXNSZWFkeSl8fChyLmlzUmVhZHk9ITAsYSE9PSEwJiYtLXIucmVhZHlXYWl0PjB8fFIucmVzb2x2ZVdpdGgoZCxbcl0pKX19KSxyLnJlYWR5LnRoZW49Ui50aGVuO2Z1bmN0aW9uIFMoKXtkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsUyksXHJcbmEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIixTKSxyLnJlYWR5KCl9XCJjb21wbGV0ZVwiPT09ZC5yZWFkeVN0YXRlfHxcImxvYWRpbmdcIiE9PWQucmVhZHlTdGF0ZSYmIWQuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsP2Euc2V0VGltZW91dChyLnJlYWR5KTooZC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLFMpLGEuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixTKSk7dmFyIFQ9ZnVuY3Rpb24oYSxiLGMsZCxlLGYsZyl7dmFyIGg9MCxpPWEubGVuZ3RoLGo9bnVsbD09YztpZihcIm9iamVjdFwiPT09ci50eXBlKGMpKXtlPSEwO2ZvcihoIGluIGMpVChhLGIsaCxjW2hdLCEwLGYsZyl9ZWxzZSBpZih2b2lkIDAhPT1kJiYoZT0hMCxyLmlzRnVuY3Rpb24oZCl8fChnPSEwKSxqJiYoZz8oYi5jYWxsKGEsZCksYj1udWxsKTooaj1iLGI9ZnVuY3Rpb24oYSxiLGMpe3JldHVybiBqLmNhbGwocihhKSxjKX0pKSxiKSlmb3IoO2g8aTtoKyspYihhW2hdLGMsZz9kOmQuY2FsbChhW2hdLGgsYihhW2hdLGMpKSk7cmV0dXJuIGU/YTpqP2IuY2FsbChhKTppP2IoYVswXSxjKTpmfSxVPWZ1bmN0aW9uKGEpe3JldHVybiAxPT09YS5ub2RlVHlwZXx8OT09PWEubm9kZVR5cGV8fCErYS5ub2RlVHlwZX07ZnVuY3Rpb24gVigpe3RoaXMuZXhwYW5kbz1yLmV4cGFuZG8rVi51aWQrK31WLnVpZD0xLFYucHJvdG90eXBlPXtjYWNoZTpmdW5jdGlvbihhKXt2YXIgYj1hW3RoaXMuZXhwYW5kb107cmV0dXJuIGJ8fChiPXt9LFUoYSkmJihhLm5vZGVUeXBlP2FbdGhpcy5leHBhbmRvXT1iOk9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLHRoaXMuZXhwYW5kbyx7dmFsdWU6Yixjb25maWd1cmFibGU6ITB9KSkpLGJ9LHNldDpmdW5jdGlvbihhLGIsYyl7dmFyIGQsZT10aGlzLmNhY2hlKGEpO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBiKWVbci5jYW1lbENhc2UoYildPWM7ZWxzZSBmb3IoZCBpbiBiKWVbci5jYW1lbENhc2UoZCldPWJbZF07cmV0dXJuIGV9LGdldDpmdW5jdGlvbihhLGIpe3JldHVybiB2b2lkIDA9PT1iP3RoaXMuY2FjaGUoYSk6YVt0aGlzLmV4cGFuZG9dJiZhW3RoaXMuZXhwYW5kb11bci5jYW1lbENhc2UoYildfSxhY2Nlc3M6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiB2b2lkIDA9PT1ifHxiJiZcInN0cmluZ1wiPT10eXBlb2YgYiYmdm9pZCAwPT09Yz90aGlzLmdldChhLGIpOih0aGlzLnNldChhLGIsYyksdm9pZCAwIT09Yz9jOmIpfSxyZW1vdmU6ZnVuY3Rpb24oYSxiKXt2YXIgYyxkPWFbdGhpcy5leHBhbmRvXTtpZih2b2lkIDAhPT1kKXtpZih2b2lkIDAhPT1iKXtBcnJheS5pc0FycmF5KGIpP2I9Yi5tYXAoci5jYW1lbENhc2UpOihiPXIuY2FtZWxDYXNlKGIpLGI9YiBpbiBkP1tiXTpiLm1hdGNoKEwpfHxbXSksYz1iLmxlbmd0aDt3aGlsZShjLS0pZGVsZXRlIGRbYltjXV19KHZvaWQgMD09PWJ8fHIuaXNFbXB0eU9iamVjdChkKSkmJihhLm5vZGVUeXBlP2FbdGhpcy5leHBhbmRvXT12b2lkIDA6ZGVsZXRlIGFbdGhpcy5leHBhbmRvXSl9fSxoYXNEYXRhOmZ1bmN0aW9uKGEpe3ZhciBiPWFbdGhpcy5leHBhbmRvXTtyZXR1cm4gdm9pZCAwIT09YiYmIXIuaXNFbXB0eU9iamVjdChiKX19O3ZhciBXPW5ldyBWLFg9bmV3IFYsWT0vXig/Olxce1tcXHdcXFddKlxcfXxcXFtbXFx3XFxXXSpcXF0pJC8sWj0vW0EtWl0vZztmdW5jdGlvbiAkKGEpe3JldHVyblwidHJ1ZVwiPT09YXx8XCJmYWxzZVwiIT09YSYmKFwibnVsbFwiPT09YT9udWxsOmE9PT0rYStcIlwiPythOlkudGVzdChhKT9KU09OLnBhcnNlKGEpOmEpfWZ1bmN0aW9uIF8oYSxiLGMpe3ZhciBkO2lmKHZvaWQgMD09PWMmJjE9PT1hLm5vZGVUeXBlKWlmKGQ9XCJkYXRhLVwiK2IucmVwbGFjZShaLFwiLSQmXCIpLnRvTG93ZXJDYXNlKCksYz1hLmdldEF0dHJpYnV0ZShkKSxcInN0cmluZ1wiPT10eXBlb2YgYyl7dHJ5e2M9JChjKX1jYXRjaChlKXt9WC5zZXQoYSxiLGMpfWVsc2UgYz12b2lkIDA7cmV0dXJuIGN9ci5leHRlbmQoe2hhc0RhdGE6ZnVuY3Rpb24oYSl7cmV0dXJuIFguaGFzRGF0YShhKXx8Vy5oYXNEYXRhKGEpfSxkYXRhOmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gWC5hY2Nlc3MoYSxiLGMpfSxyZW1vdmVEYXRhOmZ1bmN0aW9uKGEsYil7WC5yZW1vdmUoYSxiKX0sX2RhdGE6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiBXLmFjY2VzcyhhLGIsYyl9LF9yZW1vdmVEYXRhOmZ1bmN0aW9uKGEsYil7Vy5yZW1vdmUoYSxiKX19KSxyLmZuLmV4dGVuZCh7ZGF0YTpmdW5jdGlvbihhLGIpe3ZhciBjLGQsZSxmPXRoaXNbMF0sZz1mJiZmLmF0dHJpYnV0ZXM7aWYodm9pZCAwPT09YSl7aWYodGhpcy5sZW5ndGgmJihlPVguZ2V0KGYpLDE9PT1mLm5vZGVUeXBlJiYhVy5nZXQoZixcImhhc0RhdGFBdHRyc1wiKSkpe2M9Zy5sZW5ndGg7d2hpbGUoYy0tKWdbY10mJihkPWdbY10ubmFtZSwwPT09ZC5pbmRleE9mKFwiZGF0YS1cIikmJihkPXIuY2FtZWxDYXNlKGQuc2xpY2UoNSkpLF8oZixkLGVbZF0pKSk7Vy5zZXQoZixcImhhc0RhdGFBdHRyc1wiLCEwKX1yZXR1cm4gZX1yZXR1cm5cIm9iamVjdFwiPT10eXBlb2YgYT90aGlzLmVhY2goZnVuY3Rpb24oKXtYLnNldCh0aGlzLGEpfSk6VCh0aGlzLGZ1bmN0aW9uKGIpe3ZhciBjO2lmKGYmJnZvaWQgMD09PWIpe2lmKGM9WC5nZXQoZixhKSx2b2lkIDAhPT1jKXJldHVybiBjO2lmKGM9XyhmLGEpLHZvaWQgMCE9PWMpcmV0dXJuIGN9ZWxzZSB0aGlzLmVhY2goZnVuY3Rpb24oKXtYLnNldCh0aGlzLGEsYil9KX0sbnVsbCxiLGFyZ3VtZW50cy5sZW5ndGg+MSxudWxsLCEwKX0scmVtb3ZlRGF0YTpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7WC5yZW1vdmUodGhpcyxhKX0pfX0pLHIuZXh0ZW5kKHtxdWV1ZTpmdW5jdGlvbihhLGIsYyl7dmFyIGQ7aWYoYSlyZXR1cm4gYj0oYnx8XCJmeFwiKStcInF1ZXVlXCIsZD1XLmdldChhLGIpLGMmJighZHx8QXJyYXkuaXNBcnJheShjKT9kPVcuYWNjZXNzKGEsYixyLm1ha2VBcnJheShjKSk6ZC5wdXNoKGMpKSxkfHxbXX0sZGVxdWV1ZTpmdW5jdGlvbihhLGIpe2I9Ynx8XCJmeFwiO3ZhciBjPXIucXVldWUoYSxiKSxkPWMubGVuZ3RoLGU9Yy5zaGlmdCgpLGY9ci5fcXVldWVIb29rcyhhLGIpLGc9ZnVuY3Rpb24oKXtyLmRlcXVldWUoYSxiKX07XCJpbnByb2dyZXNzXCI9PT1lJiYoZT1jLnNoaWZ0KCksZC0tKSxlJiYoXCJmeFwiPT09YiYmYy51bnNoaWZ0KFwiaW5wcm9ncmVzc1wiKSxkZWxldGUgZi5zdG9wLGUuY2FsbChhLGcsZikpLCFkJiZmJiZmLmVtcHR5LmZpcmUoKX0sX3F1ZXVlSG9va3M6ZnVuY3Rpb24oYSxiKXt2YXIgYz1iK1wicXVldWVIb29rc1wiO3JldHVybiBXLmdldChhLGMpfHxXLmFjY2VzcyhhLGMse2VtcHR5OnIuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIikuYWRkKGZ1bmN0aW9uKCl7Vy5yZW1vdmUoYSxbYitcInF1ZXVlXCIsY10pfSl9KX19KSxyLmZuLmV4dGVuZCh7cXVldWU6ZnVuY3Rpb24oYSxiKXt2YXIgYz0yO3JldHVyblwic3RyaW5nXCIhPXR5cGVvZiBhJiYoYj1hLGE9XCJmeFwiLGMtLSksYXJndW1lbnRzLmxlbmd0aDxjP3IucXVldWUodGhpc1swXSxhKTp2b2lkIDA9PT1iP3RoaXM6dGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGM9ci5xdWV1ZSh0aGlzLGEsYik7ci5fcXVldWVIb29rcyh0aGlzLGEpLFwiZnhcIj09PWEmJlwiaW5wcm9ncmVzc1wiIT09Y1swXSYmci5kZXF1ZXVlKHRoaXMsYSl9KX0sZGVxdWV1ZTpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7ci5kZXF1ZXVlKHRoaXMsYSl9KX0sY2xlYXJRdWV1ZTpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5xdWV1ZShhfHxcImZ4XCIsW10pfSxwcm9taXNlOmZ1bmN0aW9uKGEsYil7dmFyIGMsZD0xLGU9ci5EZWZlcnJlZCgpLGY9dGhpcyxnPXRoaXMubGVuZ3RoLGg9ZnVuY3Rpb24oKXstLWR8fGUucmVzb2x2ZVdpdGgoZixbZl0pfTtcInN0cmluZ1wiIT10eXBlb2YgYSYmKGI9YSxhPXZvaWQgMCksYT1hfHxcImZ4XCI7d2hpbGUoZy0tKWM9Vy5nZXQoZltnXSxhK1wicXVldWVIb29rc1wiKSxjJiZjLmVtcHR5JiYoZCsrLGMuZW1wdHkuYWRkKGgpKTtyZXR1cm4gaCgpLGUucHJvbWlzZShiKX19KTt2YXIgYWE9L1srLV0/KD86XFxkKlxcLnwpXFxkKyg/OltlRV1bKy1dP1xcZCt8KS8uc291cmNlLGJhPW5ldyBSZWdFeHAoXCJeKD86KFsrLV0pPXwpKFwiK2FhK1wiKShbYS16JV0qKSRcIixcImlcIiksY2E9W1wiVG9wXCIsXCJSaWdodFwiLFwiQm90dG9tXCIsXCJMZWZ0XCJdLGRhPWZ1bmN0aW9uKGEsYil7cmV0dXJuIGE9Ynx8YSxcIm5vbmVcIj09PWEuc3R5bGUuZGlzcGxheXx8XCJcIj09PWEuc3R5bGUuZGlzcGxheSYmci5jb250YWlucyhhLm93bmVyRG9jdW1lbnQsYSkmJlwibm9uZVwiPT09ci5jc3MoYSxcImRpc3BsYXlcIil9LGVhPWZ1bmN0aW9uKGEsYixjLGQpe3ZhciBlLGYsZz17fTtmb3IoZiBpbiBiKWdbZl09YS5zdHlsZVtmXSxhLnN0eWxlW2ZdPWJbZl07ZT1jLmFwcGx5KGEsZHx8W10pO2ZvcihmIGluIGIpYS5zdHlsZVtmXT1nW2ZdO3JldHVybiBlfTtmdW5jdGlvbiBmYShhLGIsYyxkKXt2YXIgZSxmPTEsZz0yMCxoPWQ/ZnVuY3Rpb24oKXtyZXR1cm4gZC5jdXIoKX06ZnVuY3Rpb24oKXtyZXR1cm4gci5jc3MoYSxiLFwiXCIpfSxpPWgoKSxqPWMmJmNbM118fChyLmNzc051bWJlcltiXT9cIlwiOlwicHhcIiksaz0oci5jc3NOdW1iZXJbYl18fFwicHhcIiE9PWomJitpKSYmYmEuZXhlYyhyLmNzcyhhLGIpKTtpZihrJiZrWzNdIT09ail7aj1qfHxrWzNdLGM9Y3x8W10saz0raXx8MTtkbyBmPWZ8fFwiLjVcIixrLz1mLHIuc3R5bGUoYSxiLGsraik7d2hpbGUoZiE9PShmPWgoKS9pKSYmMSE9PWYmJi0tZyl9cmV0dXJuIGMmJihrPStrfHwraXx8MCxlPWNbMV0/aysoY1sxXSsxKSpjWzJdOitjWzJdLGQmJihkLnVuaXQ9aixkLnN0YXJ0PWssZC5lbmQ9ZSkpLGV9dmFyIGdhPXt9O2Z1bmN0aW9uIGhhKGEpe3ZhciBiLGM9YS5vd25lckRvY3VtZW50LGQ9YS5ub2RlTmFtZSxlPWdhW2RdO3JldHVybiBlP2U6KGI9Yy5ib2R5LmFwcGVuZENoaWxkKGMuY3JlYXRlRWxlbWVudChkKSksZT1yLmNzcyhiLFwiZGlzcGxheVwiKSxiLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYiksXCJub25lXCI9PT1lJiYoZT1cImJsb2NrXCIpLGdhW2RdPWUsZSl9ZnVuY3Rpb24gaWEoYSxiKXtmb3IodmFyIGMsZCxlPVtdLGY9MCxnPWEubGVuZ3RoO2Y8ZztmKyspZD1hW2ZdLGQuc3R5bGUmJihjPWQuc3R5bGUuZGlzcGxheSxiPyhcIm5vbmVcIj09PWMmJihlW2ZdPVcuZ2V0KGQsXCJkaXNwbGF5XCIpfHxudWxsLGVbZl18fChkLnN0eWxlLmRpc3BsYXk9XCJcIikpLFwiXCI9PT1kLnN0eWxlLmRpc3BsYXkmJmRhKGQpJiYoZVtmXT1oYShkKSkpOlwibm9uZVwiIT09YyYmKGVbZl09XCJub25lXCIsVy5zZXQoZCxcImRpc3BsYXlcIixjKSkpO2ZvcihmPTA7ZjxnO2YrKyludWxsIT1lW2ZdJiYoYVtmXS5zdHlsZS5kaXNwbGF5PWVbZl0pO3JldHVybiBhfXIuZm4uZXh0ZW5kKHtzaG93OmZ1bmN0aW9uKCl7cmV0dXJuIGlhKHRoaXMsITApfSxoaWRlOmZ1bmN0aW9uKCl7cmV0dXJuIGlhKHRoaXMpfSx0b2dnbGU6ZnVuY3Rpb24oYSl7cmV0dXJuXCJib29sZWFuXCI9PXR5cGVvZiBhP2E/dGhpcy5zaG93KCk6dGhpcy5oaWRlKCk6dGhpcy5lYWNoKGZ1bmN0aW9uKCl7ZGEodGhpcyk/cih0aGlzKS5zaG93KCk6cih0aGlzKS5oaWRlKCl9KX19KTt2YXIgamE9L14oPzpjaGVja2JveHxyYWRpbykkL2ksa2E9LzwoW2Etel1bXlxcL1xcMD5cXHgyMFxcdFxcclxcblxcZl0rKS9pLGxhPS9eJHxcXC8oPzpqYXZhfGVjbWEpc2NyaXB0L2ksbWE9e29wdGlvbjpbMSxcIjxzZWxlY3QgbXVsdGlwbGU9J211bHRpcGxlJz5cIixcIjwvc2VsZWN0PlwiXSx0aGVhZDpbMSxcIjx0YWJsZT5cIixcIjwvdGFibGU+XCJdLGNvbDpbMixcIjx0YWJsZT48Y29sZ3JvdXA+XCIsXCI8L2NvbGdyb3VwPjwvdGFibGU+XCJdLHRyOlsyLFwiPHRhYmxlPjx0Ym9keT5cIixcIjwvdGJvZHk+PC90YWJsZT5cIl0sdGQ6WzMsXCI8dGFibGU+PHRib2R5Pjx0cj5cIixcIjwvdHI+PC90Ym9keT48L3RhYmxlPlwiXSxfZGVmYXVsdDpbMCxcIlwiLFwiXCJdfTttYS5vcHRncm91cD1tYS5vcHRpb24sbWEudGJvZHk9bWEudGZvb3Q9bWEuY29sZ3JvdXA9bWEuY2FwdGlvbj1tYS50aGVhZCxtYS50aD1tYS50ZDtmdW5jdGlvbiBuYShhLGIpe3ZhciBjO3JldHVybiBjPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBhLmdldEVsZW1lbnRzQnlUYWdOYW1lP2EuZ2V0RWxlbWVudHNCeVRhZ05hbWUoYnx8XCIqXCIpOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBhLnF1ZXJ5U2VsZWN0b3JBbGw/YS5xdWVyeVNlbGVjdG9yQWxsKGJ8fFwiKlwiKTpbXSx2b2lkIDA9PT1ifHxiJiZCKGEsYik/ci5tZXJnZShbYV0sYyk6Y31mdW5jdGlvbiBvYShhLGIpe2Zvcih2YXIgYz0wLGQ9YS5sZW5ndGg7YzxkO2MrKylXLnNldChhW2NdLFwiZ2xvYmFsRXZhbFwiLCFifHxXLmdldChiW2NdLFwiZ2xvYmFsRXZhbFwiKSl9dmFyIHBhPS88fCYjP1xcdys7LztmdW5jdGlvbiBxYShhLGIsYyxkLGUpe2Zvcih2YXIgZixnLGgsaSxqLGssbD1iLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxtPVtdLG49MCxvPWEubGVuZ3RoO248bztuKyspaWYoZj1hW25dLGZ8fDA9PT1mKWlmKFwib2JqZWN0XCI9PT1yLnR5cGUoZikpci5tZXJnZShtLGYubm9kZVR5cGU/W2ZdOmYpO2Vsc2UgaWYocGEudGVzdChmKSl7Zz1nfHxsLmFwcGVuZENoaWxkKGIuY3JlYXRlRWxlbWVudChcImRpdlwiKSksaD0oa2EuZXhlYyhmKXx8W1wiXCIsXCJcIl0pWzFdLnRvTG93ZXJDYXNlKCksaT1tYVtoXXx8bWEuX2RlZmF1bHQsZy5pbm5lckhUTUw9aVsxXStyLmh0bWxQcmVmaWx0ZXIoZikraVsyXSxrPWlbMF07d2hpbGUoay0tKWc9Zy5sYXN0Q2hpbGQ7ci5tZXJnZShtLGcuY2hpbGROb2RlcyksZz1sLmZpcnN0Q2hpbGQsZy50ZXh0Q29udGVudD1cIlwifWVsc2UgbS5wdXNoKGIuY3JlYXRlVGV4dE5vZGUoZikpO2wudGV4dENvbnRlbnQ9XCJcIixuPTA7d2hpbGUoZj1tW24rK10paWYoZCYmci5pbkFycmF5KGYsZCk+LTEpZSYmZS5wdXNoKGYpO2Vsc2UgaWYoaj1yLmNvbnRhaW5zKGYub3duZXJEb2N1bWVudCxmKSxnPW5hKGwuYXBwZW5kQ2hpbGQoZiksXCJzY3JpcHRcIiksaiYmb2EoZyksYyl7az0wO3doaWxlKGY9Z1trKytdKWxhLnRlc3QoZi50eXBlfHxcIlwiKSYmYy5wdXNoKGYpfXJldHVybiBsfSFmdW5jdGlvbigpe3ZhciBhPWQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLGI9YS5hcHBlbmRDaGlsZChkLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpLGM9ZC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7Yy5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsXCJyYWRpb1wiKSxjLnNldEF0dHJpYnV0ZShcImNoZWNrZWRcIixcImNoZWNrZWRcIiksYy5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsXCJ0XCIpLGIuYXBwZW5kQ2hpbGQoYyksby5jaGVja0Nsb25lPWIuY2xvbmVOb2RlKCEwKS5jbG9uZU5vZGUoITApLmxhc3RDaGlsZC5jaGVja2VkLGIuaW5uZXJIVE1MPVwiPHRleHRhcmVhPng8L3RleHRhcmVhPlwiLG8ubm9DbG9uZUNoZWNrZWQ9ISFiLmNsb25lTm9kZSghMCkubGFzdENoaWxkLmRlZmF1bHRWYWx1ZX0oKTt2YXIgcmE9ZC5kb2N1bWVudEVsZW1lbnQsc2E9L15rZXkvLHRhPS9eKD86bW91c2V8cG9pbnRlcnxjb250ZXh0bWVudXxkcmFnfGRyb3ApfGNsaWNrLyx1YT0vXihbXi5dKikoPzpcXC4oLispfCkvO2Z1bmN0aW9uIHZhKCl7cmV0dXJuITB9ZnVuY3Rpb24gd2EoKXtyZXR1cm4hMX1mdW5jdGlvbiB4YSgpe3RyeXtyZXR1cm4gZC5hY3RpdmVFbGVtZW50fWNhdGNoKGEpe319ZnVuY3Rpb24geWEoYSxiLGMsZCxlLGYpe3ZhciBnLGg7aWYoXCJvYmplY3RcIj09dHlwZW9mIGIpe1wic3RyaW5nXCIhPXR5cGVvZiBjJiYoZD1kfHxjLGM9dm9pZCAwKTtmb3IoaCBpbiBiKXlhKGEsaCxjLGQsYltoXSxmKTtyZXR1cm4gYX1pZihudWxsPT1kJiZudWxsPT1lPyhlPWMsZD1jPXZvaWQgMCk6bnVsbD09ZSYmKFwic3RyaW5nXCI9PXR5cGVvZiBjPyhlPWQsZD12b2lkIDApOihlPWQsZD1jLGM9dm9pZCAwKSksZT09PSExKWU9d2E7ZWxzZSBpZighZSlyZXR1cm4gYTtyZXR1cm4gMT09PWYmJihnPWUsZT1mdW5jdGlvbihhKXtyZXR1cm4gcigpLm9mZihhKSxnLmFwcGx5KHRoaXMsYXJndW1lbnRzKX0sZS5ndWlkPWcuZ3VpZHx8KGcuZ3VpZD1yLmd1aWQrKykpLGEuZWFjaChmdW5jdGlvbigpe3IuZXZlbnQuYWRkKHRoaXMsYixlLGQsYyl9KX1yLmV2ZW50PXtnbG9iYWw6e30sYWRkOmZ1bmN0aW9uKGEsYixjLGQsZSl7dmFyIGYsZyxoLGksaixrLGwsbSxuLG8scCxxPVcuZ2V0KGEpO2lmKHEpe2MuaGFuZGxlciYmKGY9YyxjPWYuaGFuZGxlcixlPWYuc2VsZWN0b3IpLGUmJnIuZmluZC5tYXRjaGVzU2VsZWN0b3IocmEsZSksYy5ndWlkfHwoYy5ndWlkPXIuZ3VpZCsrKSwoaT1xLmV2ZW50cyl8fChpPXEuZXZlbnRzPXt9KSwoZz1xLmhhbmRsZSl8fChnPXEuaGFuZGxlPWZ1bmN0aW9uKGIpe3JldHVyblwidW5kZWZpbmVkXCIhPXR5cGVvZiByJiZyLmV2ZW50LnRyaWdnZXJlZCE9PWIudHlwZT9yLmV2ZW50LmRpc3BhdGNoLmFwcGx5KGEsYXJndW1lbnRzKTp2b2lkIDB9KSxiPShifHxcIlwiKS5tYXRjaChMKXx8W1wiXCJdLGo9Yi5sZW5ndGg7d2hpbGUoai0tKWg9dWEuZXhlYyhiW2pdKXx8W10sbj1wPWhbMV0sbz0oaFsyXXx8XCJcIikuc3BsaXQoXCIuXCIpLnNvcnQoKSxuJiYobD1yLmV2ZW50LnNwZWNpYWxbbl18fHt9LG49KGU/bC5kZWxlZ2F0ZVR5cGU6bC5iaW5kVHlwZSl8fG4sbD1yLmV2ZW50LnNwZWNpYWxbbl18fHt9LGs9ci5leHRlbmQoe3R5cGU6bixvcmlnVHlwZTpwLGRhdGE6ZCxoYW5kbGVyOmMsZ3VpZDpjLmd1aWQsc2VsZWN0b3I6ZSxuZWVkc0NvbnRleHQ6ZSYmci5leHByLm1hdGNoLm5lZWRzQ29udGV4dC50ZXN0KGUpLG5hbWVzcGFjZTpvLmpvaW4oXCIuXCIpfSxmKSwobT1pW25dKXx8KG09aVtuXT1bXSxtLmRlbGVnYXRlQ291bnQ9MCxsLnNldHVwJiZsLnNldHVwLmNhbGwoYSxkLG8sZykhPT0hMXx8YS5hZGRFdmVudExpc3RlbmVyJiZhLmFkZEV2ZW50TGlzdGVuZXIobixnKSksbC5hZGQmJihsLmFkZC5jYWxsKGEsayksay5oYW5kbGVyLmd1aWR8fChrLmhhbmRsZXIuZ3VpZD1jLmd1aWQpKSxlP20uc3BsaWNlKG0uZGVsZWdhdGVDb3VudCsrLDAsayk6bS5wdXNoKGspLHIuZXZlbnQuZ2xvYmFsW25dPSEwKX19LHJlbW92ZTpmdW5jdGlvbihhLGIsYyxkLGUpe3ZhciBmLGcsaCxpLGosayxsLG0sbixvLHAscT1XLmhhc0RhdGEoYSkmJlcuZ2V0KGEpO2lmKHEmJihpPXEuZXZlbnRzKSl7Yj0oYnx8XCJcIikubWF0Y2goTCl8fFtcIlwiXSxqPWIubGVuZ3RoO3doaWxlKGotLSlpZihoPXVhLmV4ZWMoYltqXSl8fFtdLG49cD1oWzFdLG89KGhbMl18fFwiXCIpLnNwbGl0KFwiLlwiKS5zb3J0KCksbil7bD1yLmV2ZW50LnNwZWNpYWxbbl18fHt9LG49KGQ/bC5kZWxlZ2F0ZVR5cGU6bC5iaW5kVHlwZSl8fG4sbT1pW25dfHxbXSxoPWhbMl0mJm5ldyBSZWdFeHAoXCIoXnxcXFxcLilcIitvLmpvaW4oXCJcXFxcLig/Oi4qXFxcXC58KVwiKStcIihcXFxcLnwkKVwiKSxnPWY9bS5sZW5ndGg7d2hpbGUoZi0tKWs9bVtmXSwhZSYmcCE9PWsub3JpZ1R5cGV8fGMmJmMuZ3VpZCE9PWsuZ3VpZHx8aCYmIWgudGVzdChrLm5hbWVzcGFjZSl8fGQmJmQhPT1rLnNlbGVjdG9yJiYoXCIqKlwiIT09ZHx8IWsuc2VsZWN0b3IpfHwobS5zcGxpY2UoZiwxKSxrLnNlbGVjdG9yJiZtLmRlbGVnYXRlQ291bnQtLSxsLnJlbW92ZSYmbC5yZW1vdmUuY2FsbChhLGspKTtnJiYhbS5sZW5ndGgmJihsLnRlYXJkb3duJiZsLnRlYXJkb3duLmNhbGwoYSxvLHEuaGFuZGxlKSE9PSExfHxyLnJlbW92ZUV2ZW50KGEsbixxLmhhbmRsZSksZGVsZXRlIGlbbl0pfWVsc2UgZm9yKG4gaW4gaSlyLmV2ZW50LnJlbW92ZShhLG4rYltqXSxjLGQsITApO3IuaXNFbXB0eU9iamVjdChpKSYmVy5yZW1vdmUoYSxcImhhbmRsZSBldmVudHNcIil9fSxkaXNwYXRjaDpmdW5jdGlvbihhKXt2YXIgYj1yLmV2ZW50LmZpeChhKSxjLGQsZSxmLGcsaCxpPW5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKSxqPShXLmdldCh0aGlzLFwiZXZlbnRzXCIpfHx7fSlbYi50eXBlXXx8W10saz1yLmV2ZW50LnNwZWNpYWxbYi50eXBlXXx8e307Zm9yKGlbMF09YixjPTE7Yzxhcmd1bWVudHMubGVuZ3RoO2MrKylpW2NdPWFyZ3VtZW50c1tjXTtpZihiLmRlbGVnYXRlVGFyZ2V0PXRoaXMsIWsucHJlRGlzcGF0Y2h8fGsucHJlRGlzcGF0Y2guY2FsbCh0aGlzLGIpIT09ITEpe2g9ci5ldmVudC5oYW5kbGVycy5jYWxsKHRoaXMsYixqKSxjPTA7d2hpbGUoKGY9aFtjKytdKSYmIWIuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSl7Yi5jdXJyZW50VGFyZ2V0PWYuZWxlbSxkPTA7d2hpbGUoKGc9Zi5oYW5kbGVyc1tkKytdKSYmIWIuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSliLnJuYW1lc3BhY2UmJiFiLnJuYW1lc3BhY2UudGVzdChnLm5hbWVzcGFjZSl8fChiLmhhbmRsZU9iaj1nLGIuZGF0YT1nLmRhdGEsZT0oKHIuZXZlbnQuc3BlY2lhbFtnLm9yaWdUeXBlXXx8e30pLmhhbmRsZXx8Zy5oYW5kbGVyKS5hcHBseShmLmVsZW0saSksdm9pZCAwIT09ZSYmKGIucmVzdWx0PWUpPT09ITEmJihiLnByZXZlbnREZWZhdWx0KCksYi5zdG9wUHJvcGFnYXRpb24oKSkpfXJldHVybiBrLnBvc3REaXNwYXRjaCYmay5wb3N0RGlzcGF0Y2guY2FsbCh0aGlzLGIpLGIucmVzdWx0fX0saGFuZGxlcnM6ZnVuY3Rpb24oYSxiKXt2YXIgYyxkLGUsZixnLGg9W10saT1iLmRlbGVnYXRlQ291bnQsaj1hLnRhcmdldDtpZihpJiZqLm5vZGVUeXBlJiYhKFwiY2xpY2tcIj09PWEudHlwZSYmYS5idXR0b24+PTEpKWZvcig7aiE9PXRoaXM7aj1qLnBhcmVudE5vZGV8fHRoaXMpaWYoMT09PWoubm9kZVR5cGUmJihcImNsaWNrXCIhPT1hLnR5cGV8fGouZGlzYWJsZWQhPT0hMCkpe2ZvcihmPVtdLGc9e30sYz0wO2M8aTtjKyspZD1iW2NdLGU9ZC5zZWxlY3RvcitcIiBcIix2b2lkIDA9PT1nW2VdJiYoZ1tlXT1kLm5lZWRzQ29udGV4dD9yKGUsdGhpcykuaW5kZXgoaik+LTE6ci5maW5kKGUsdGhpcyxudWxsLFtqXSkubGVuZ3RoKSxnW2VdJiZmLnB1c2goZCk7Zi5sZW5ndGgmJmgucHVzaCh7ZWxlbTpqLGhhbmRsZXJzOmZ9KX1yZXR1cm4gaj10aGlzLGk8Yi5sZW5ndGgmJmgucHVzaCh7ZWxlbTpqLGhhbmRsZXJzOmIuc2xpY2UoaSl9KSxofSxhZGRQcm9wOmZ1bmN0aW9uKGEsYil7T2JqZWN0LmRlZmluZVByb3BlcnR5KHIuRXZlbnQucHJvdG90eXBlLGEse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLGdldDpyLmlzRnVuY3Rpb24oYik/ZnVuY3Rpb24oKXtpZih0aGlzLm9yaWdpbmFsRXZlbnQpcmV0dXJuIGIodGhpcy5vcmlnaW5hbEV2ZW50KX06ZnVuY3Rpb24oKXtpZih0aGlzLm9yaWdpbmFsRXZlbnQpcmV0dXJuIHRoaXMub3JpZ2luYWxFdmVudFthXX0sc2V0OmZ1bmN0aW9uKGIpe09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLGEse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOmJ9KX19KX0sZml4OmZ1bmN0aW9uKGEpe3JldHVybiBhW3IuZXhwYW5kb10/YTpuZXcgci5FdmVudChhKX0sc3BlY2lhbDp7bG9hZDp7bm9CdWJibGU6ITB9LGZvY3VzOnt0cmlnZ2VyOmZ1bmN0aW9uKCl7aWYodGhpcyE9PXhhKCkmJnRoaXMuZm9jdXMpcmV0dXJuIHRoaXMuZm9jdXMoKSwhMX0sZGVsZWdhdGVUeXBlOlwiZm9jdXNpblwifSxibHVyOnt0cmlnZ2VyOmZ1bmN0aW9uKCl7aWYodGhpcz09PXhhKCkmJnRoaXMuYmx1cilyZXR1cm4gdGhpcy5ibHVyKCksITF9LGRlbGVnYXRlVHlwZTpcImZvY3Vzb3V0XCJ9LGNsaWNrOnt0cmlnZ2VyOmZ1bmN0aW9uKCl7aWYoXCJjaGVja2JveFwiPT09dGhpcy50eXBlJiZ0aGlzLmNsaWNrJiZCKHRoaXMsXCJpbnB1dFwiKSlyZXR1cm4gdGhpcy5jbGljaygpLCExfSxfZGVmYXVsdDpmdW5jdGlvbihhKXtyZXR1cm4gQihhLnRhcmdldCxcImFcIil9fSxiZWZvcmV1bmxvYWQ6e3Bvc3REaXNwYXRjaDpmdW5jdGlvbihhKXt2b2lkIDAhPT1hLnJlc3VsdCYmYS5vcmlnaW5hbEV2ZW50JiYoYS5vcmlnaW5hbEV2ZW50LnJldHVyblZhbHVlPWEucmVzdWx0KX19fX0sci5yZW1vdmVFdmVudD1mdW5jdGlvbihhLGIsYyl7YS5yZW1vdmVFdmVudExpc3RlbmVyJiZhLnJlbW92ZUV2ZW50TGlzdGVuZXIoYixjKX0sci5FdmVudD1mdW5jdGlvbihhLGIpe3JldHVybiB0aGlzIGluc3RhbmNlb2Ygci5FdmVudD8oYSYmYS50eXBlPyh0aGlzLm9yaWdpbmFsRXZlbnQ9YSx0aGlzLnR5cGU9YS50eXBlLHRoaXMuaXNEZWZhdWx0UHJldmVudGVkPWEuZGVmYXVsdFByZXZlbnRlZHx8dm9pZCAwPT09YS5kZWZhdWx0UHJldmVudGVkJiZhLnJldHVyblZhbHVlPT09ITE/dmE6d2EsdGhpcy50YXJnZXQ9YS50YXJnZXQmJjM9PT1hLnRhcmdldC5ub2RlVHlwZT9hLnRhcmdldC5wYXJlbnROb2RlOmEudGFyZ2V0LHRoaXMuY3VycmVudFRhcmdldD1hLmN1cnJlbnRUYXJnZXQsdGhpcy5yZWxhdGVkVGFyZ2V0PWEucmVsYXRlZFRhcmdldCk6dGhpcy50eXBlPWEsYiYmci5leHRlbmQodGhpcyxiKSx0aGlzLnRpbWVTdGFtcD1hJiZhLnRpbWVTdGFtcHx8ci5ub3coKSx2b2lkKHRoaXNbci5leHBhbmRvXT0hMCkpOm5ldyByLkV2ZW50KGEsYil9LHIuRXZlbnQucHJvdG90eXBlPXtjb25zdHJ1Y3RvcjpyLkV2ZW50LGlzRGVmYXVsdFByZXZlbnRlZDp3YSxpc1Byb3BhZ2F0aW9uU3RvcHBlZDp3YSxpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZDp3YSxpc1NpbXVsYXRlZDohMSxwcmV2ZW50RGVmYXVsdDpmdW5jdGlvbigpe3ZhciBhPXRoaXMub3JpZ2luYWxFdmVudDt0aGlzLmlzRGVmYXVsdFByZXZlbnRlZD12YSxhJiYhdGhpcy5pc1NpbXVsYXRlZCYmYS5wcmV2ZW50RGVmYXVsdCgpfSxzdG9wUHJvcGFnYXRpb246ZnVuY3Rpb24oKXt2YXIgYT10aGlzLm9yaWdpbmFsRXZlbnQ7dGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZD12YSxhJiYhdGhpcy5pc1NpbXVsYXRlZCYmYS5zdG9wUHJvcGFnYXRpb24oKX0sc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5vcmlnaW5hbEV2ZW50O3RoaXMuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQ9dmEsYSYmIXRoaXMuaXNTaW11bGF0ZWQmJmEuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCksdGhpcy5zdG9wUHJvcGFnYXRpb24oKX19LHIuZWFjaCh7YWx0S2V5OiEwLGJ1YmJsZXM6ITAsY2FuY2VsYWJsZTohMCxjaGFuZ2VkVG91Y2hlczohMCxjdHJsS2V5OiEwLGRldGFpbDohMCxldmVudFBoYXNlOiEwLG1ldGFLZXk6ITAscGFnZVg6ITAscGFnZVk6ITAsc2hpZnRLZXk6ITAsdmlldzohMCxcImNoYXJcIjohMCxjaGFyQ29kZTohMCxrZXk6ITAsa2V5Q29kZTohMCxidXR0b246ITAsYnV0dG9uczohMCxjbGllbnRYOiEwLGNsaWVudFk6ITAsb2Zmc2V0WDohMCxvZmZzZXRZOiEwLHBvaW50ZXJJZDohMCxwb2ludGVyVHlwZTohMCxzY3JlZW5YOiEwLHNjcmVlblk6ITAsdGFyZ2V0VG91Y2hlczohMCx0b0VsZW1lbnQ6ITAsdG91Y2hlczohMCx3aGljaDpmdW5jdGlvbihhKXt2YXIgYj1hLmJ1dHRvbjtyZXR1cm4gbnVsbD09YS53aGljaCYmc2EudGVzdChhLnR5cGUpP251bGwhPWEuY2hhckNvZGU/YS5jaGFyQ29kZTphLmtleUNvZGU6IWEud2hpY2gmJnZvaWQgMCE9PWImJnRhLnRlc3QoYS50eXBlKT8xJmI/MToyJmI/Mzo0JmI/MjowOmEud2hpY2h9fSxyLmV2ZW50LmFkZFByb3ApLHIuZWFjaCh7bW91c2VlbnRlcjpcIm1vdXNlb3ZlclwiLG1vdXNlbGVhdmU6XCJtb3VzZW91dFwiLHBvaW50ZXJlbnRlcjpcInBvaW50ZXJvdmVyXCIscG9pbnRlcmxlYXZlOlwicG9pbnRlcm91dFwifSxmdW5jdGlvbihhLGIpe3IuZXZlbnQuc3BlY2lhbFthXT17ZGVsZWdhdGVUeXBlOmIsYmluZFR5cGU6YixoYW5kbGU6ZnVuY3Rpb24oYSl7dmFyIGMsZD10aGlzLGU9YS5yZWxhdGVkVGFyZ2V0LGY9YS5oYW5kbGVPYmo7cmV0dXJuIGUmJihlPT09ZHx8ci5jb250YWlucyhkLGUpKXx8KGEudHlwZT1mLm9yaWdUeXBlLGM9Zi5oYW5kbGVyLmFwcGx5KHRoaXMsYXJndW1lbnRzKSxhLnR5cGU9YiksY319fSksci5mbi5leHRlbmQoe29uOmZ1bmN0aW9uKGEsYixjLGQpe3JldHVybiB5YSh0aGlzLGEsYixjLGQpfSxvbmU6ZnVuY3Rpb24oYSxiLGMsZCl7cmV0dXJuIHlhKHRoaXMsYSxiLGMsZCwxKX0sb2ZmOmZ1bmN0aW9uKGEsYixjKXt2YXIgZCxlO2lmKGEmJmEucHJldmVudERlZmF1bHQmJmEuaGFuZGxlT2JqKXJldHVybiBkPWEuaGFuZGxlT2JqLHIoYS5kZWxlZ2F0ZVRhcmdldCkub2ZmKGQubmFtZXNwYWNlP2Qub3JpZ1R5cGUrXCIuXCIrZC5uYW1lc3BhY2U6ZC5vcmlnVHlwZSxkLnNlbGVjdG9yLGQuaGFuZGxlciksdGhpcztpZihcIm9iamVjdFwiPT10eXBlb2YgYSl7Zm9yKGUgaW4gYSl0aGlzLm9mZihlLGIsYVtlXSk7cmV0dXJuIHRoaXN9cmV0dXJuIGIhPT0hMSYmXCJmdW5jdGlvblwiIT10eXBlb2YgYnx8KGM9YixiPXZvaWQgMCksYz09PSExJiYoYz13YSksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7ci5ldmVudC5yZW1vdmUodGhpcyxhLGMsYil9KX19KTt2YXIgemE9LzwoPyFhcmVhfGJyfGNvbHxlbWJlZHxocnxpbWd8aW5wdXR8bGlua3xtZXRhfHBhcmFtKSgoW2Etel1bXlxcL1xcMD5cXHgyMFxcdFxcclxcblxcZl0qKVtePl0qKVxcLz4vZ2ksQWE9LzxzY3JpcHR8PHN0eWxlfDxsaW5rL2ksQmE9L2NoZWNrZWRcXHMqKD86W149XXw9XFxzKi5jaGVja2VkLikvaSxDYT0vXnRydWVcXC8oLiopLyxEYT0vXlxccyo8ISg/OlxcW0NEQVRBXFxbfC0tKXwoPzpcXF1cXF18LS0pPlxccyokL2c7ZnVuY3Rpb24gRWEoYSxiKXtyZXR1cm4gQihhLFwidGFibGVcIikmJkIoMTEhPT1iLm5vZGVUeXBlP2I6Yi5maXJzdENoaWxkLFwidHJcIik/cihcIj50Ym9keVwiLGEpWzBdfHxhOmF9ZnVuY3Rpb24gRmEoYSl7cmV0dXJuIGEudHlwZT0obnVsbCE9PWEuZ2V0QXR0cmlidXRlKFwidHlwZVwiKSkrXCIvXCIrYS50eXBlLGF9ZnVuY3Rpb24gR2EoYSl7dmFyIGI9Q2EuZXhlYyhhLnR5cGUpO3JldHVybiBiP2EudHlwZT1iWzFdOmEucmVtb3ZlQXR0cmlidXRlKFwidHlwZVwiKSxhfWZ1bmN0aW9uIEhhKGEsYil7dmFyIGMsZCxlLGYsZyxoLGksajtpZigxPT09Yi5ub2RlVHlwZSl7aWYoVy5oYXNEYXRhKGEpJiYoZj1XLmFjY2VzcyhhKSxnPVcuc2V0KGIsZiksaj1mLmV2ZW50cykpe2RlbGV0ZSBnLmhhbmRsZSxnLmV2ZW50cz17fTtmb3IoZSBpbiBqKWZvcihjPTAsZD1qW2VdLmxlbmd0aDtjPGQ7YysrKXIuZXZlbnQuYWRkKGIsZSxqW2VdW2NdKX1YLmhhc0RhdGEoYSkmJihoPVguYWNjZXNzKGEpLGk9ci5leHRlbmQoe30saCksWC5zZXQoYixpKSl9fWZ1bmN0aW9uIElhKGEsYil7dmFyIGM9Yi5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1wiaW5wdXRcIj09PWMmJmphLnRlc3QoYS50eXBlKT9iLmNoZWNrZWQ9YS5jaGVja2VkOlwiaW5wdXRcIiE9PWMmJlwidGV4dGFyZWFcIiE9PWN8fChiLmRlZmF1bHRWYWx1ZT1hLmRlZmF1bHRWYWx1ZSl9ZnVuY3Rpb24gSmEoYSxiLGMsZCl7Yj1nLmFwcGx5KFtdLGIpO3ZhciBlLGYsaCxpLGosayxsPTAsbT1hLmxlbmd0aCxuPW0tMSxxPWJbMF0scz1yLmlzRnVuY3Rpb24ocSk7aWYoc3x8bT4xJiZcInN0cmluZ1wiPT10eXBlb2YgcSYmIW8uY2hlY2tDbG9uZSYmQmEudGVzdChxKSlyZXR1cm4gYS5lYWNoKGZ1bmN0aW9uKGUpe3ZhciBmPWEuZXEoZSk7cyYmKGJbMF09cS5jYWxsKHRoaXMsZSxmLmh0bWwoKSkpLEphKGYsYixjLGQpfSk7aWYobSYmKGU9cWEoYixhWzBdLm93bmVyRG9jdW1lbnQsITEsYSxkKSxmPWUuZmlyc3RDaGlsZCwxPT09ZS5jaGlsZE5vZGVzLmxlbmd0aCYmKGU9ZiksZnx8ZCkpe2ZvcihoPXIubWFwKG5hKGUsXCJzY3JpcHRcIiksRmEpLGk9aC5sZW5ndGg7bDxtO2wrKylqPWUsbCE9PW4mJihqPXIuY2xvbmUoaiwhMCwhMCksaSYmci5tZXJnZShoLG5hKGosXCJzY3JpcHRcIikpKSxjLmNhbGwoYVtsXSxqLGwpO2lmKGkpZm9yKGs9aFtoLmxlbmd0aC0xXS5vd25lckRvY3VtZW50LHIubWFwKGgsR2EpLGw9MDtsPGk7bCsrKWo9aFtsXSxsYS50ZXN0KGoudHlwZXx8XCJcIikmJiFXLmFjY2VzcyhqLFwiZ2xvYmFsRXZhbFwiKSYmci5jb250YWlucyhrLGopJiYoai5zcmM/ci5fZXZhbFVybCYmci5fZXZhbFVybChqLnNyYyk6cChqLnRleHRDb250ZW50LnJlcGxhY2UoRGEsXCJcIiksaykpfXJldHVybiBhfWZ1bmN0aW9uIEthKGEsYixjKXtmb3IodmFyIGQsZT1iP3IuZmlsdGVyKGIsYSk6YSxmPTA7bnVsbCE9KGQ9ZVtmXSk7ZisrKWN8fDEhPT1kLm5vZGVUeXBlfHxyLmNsZWFuRGF0YShuYShkKSksZC5wYXJlbnROb2RlJiYoYyYmci5jb250YWlucyhkLm93bmVyRG9jdW1lbnQsZCkmJm9hKG5hKGQsXCJzY3JpcHRcIikpLGQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkKSk7cmV0dXJuIGF9ci5leHRlbmQoe2h0bWxQcmVmaWx0ZXI6ZnVuY3Rpb24oYSl7cmV0dXJuIGEucmVwbGFjZSh6YSxcIjwkMT48LyQyPlwiKX0sY2xvbmU6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkLGUsZixnLGg9YS5jbG9uZU5vZGUoITApLGk9ci5jb250YWlucyhhLm93bmVyRG9jdW1lbnQsYSk7aWYoIShvLm5vQ2xvbmVDaGVja2VkfHwxIT09YS5ub2RlVHlwZSYmMTEhPT1hLm5vZGVUeXBlfHxyLmlzWE1MRG9jKGEpKSlmb3IoZz1uYShoKSxmPW5hKGEpLGQ9MCxlPWYubGVuZ3RoO2Q8ZTtkKyspSWEoZltkXSxnW2RdKTtpZihiKWlmKGMpZm9yKGY9Znx8bmEoYSksZz1nfHxuYShoKSxkPTAsZT1mLmxlbmd0aDtkPGU7ZCsrKUhhKGZbZF0sZ1tkXSk7ZWxzZSBIYShhLGgpO3JldHVybiBnPW5hKGgsXCJzY3JpcHRcIiksZy5sZW5ndGg+MCYmb2EoZywhaSYmbmEoYSxcInNjcmlwdFwiKSksaH0sY2xlYW5EYXRhOmZ1bmN0aW9uKGEpe2Zvcih2YXIgYixjLGQsZT1yLmV2ZW50LnNwZWNpYWwsZj0wO3ZvaWQgMCE9PShjPWFbZl0pO2YrKylpZihVKGMpKXtpZihiPWNbVy5leHBhbmRvXSl7aWYoYi5ldmVudHMpZm9yKGQgaW4gYi5ldmVudHMpZVtkXT9yLmV2ZW50LnJlbW92ZShjLGQpOnIucmVtb3ZlRXZlbnQoYyxkLGIuaGFuZGxlKTtjW1cuZXhwYW5kb109dm9pZCAwfWNbWC5leHBhbmRvXSYmKGNbWC5leHBhbmRvXT12b2lkIDApfX19KSxyLmZuLmV4dGVuZCh7ZGV0YWNoOmZ1bmN0aW9uKGEpe3JldHVybiBLYSh0aGlzLGEsITApfSxyZW1vdmU6ZnVuY3Rpb24oYSl7cmV0dXJuIEthKHRoaXMsYSl9LHRleHQ6ZnVuY3Rpb24oYSl7cmV0dXJuIFQodGhpcyxmdW5jdGlvbihhKXtyZXR1cm4gdm9pZCAwPT09YT9yLnRleHQodGhpcyk6dGhpcy5lbXB0eSgpLmVhY2goZnVuY3Rpb24oKXsxIT09dGhpcy5ub2RlVHlwZSYmMTEhPT10aGlzLm5vZGVUeXBlJiY5IT09dGhpcy5ub2RlVHlwZXx8KHRoaXMudGV4dENvbnRlbnQ9YSl9KX0sbnVsbCxhLGFyZ3VtZW50cy5sZW5ndGgpfSxhcHBlbmQ6ZnVuY3Rpb24oKXtyZXR1cm4gSmEodGhpcyxhcmd1bWVudHMsZnVuY3Rpb24oYSl7aWYoMT09PXRoaXMubm9kZVR5cGV8fDExPT09dGhpcy5ub2RlVHlwZXx8OT09PXRoaXMubm9kZVR5cGUpe3ZhciBiPUVhKHRoaXMsYSk7Yi5hcHBlbmRDaGlsZChhKX19KX0scHJlcGVuZDpmdW5jdGlvbigpe3JldHVybiBKYSh0aGlzLGFyZ3VtZW50cyxmdW5jdGlvbihhKXtpZigxPT09dGhpcy5ub2RlVHlwZXx8MTE9PT10aGlzLm5vZGVUeXBlfHw5PT09dGhpcy5ub2RlVHlwZSl7dmFyIGI9RWEodGhpcyxhKTtiLmluc2VydEJlZm9yZShhLGIuZmlyc3RDaGlsZCl9fSl9LGJlZm9yZTpmdW5jdGlvbigpe3JldHVybiBKYSh0aGlzLGFyZ3VtZW50cyxmdW5jdGlvbihhKXt0aGlzLnBhcmVudE5vZGUmJnRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSx0aGlzKX0pfSxhZnRlcjpmdW5jdGlvbigpe3JldHVybiBKYSh0aGlzLGFyZ3VtZW50cyxmdW5jdGlvbihhKXt0aGlzLnBhcmVudE5vZGUmJnRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSx0aGlzLm5leHRTaWJsaW5nKX0pfSxlbXB0eTpmdW5jdGlvbigpe2Zvcih2YXIgYSxiPTA7bnVsbCE9KGE9dGhpc1tiXSk7YisrKTE9PT1hLm5vZGVUeXBlJiYoci5jbGVhbkRhdGEobmEoYSwhMSkpLGEudGV4dENvbnRlbnQ9XCJcIik7cmV0dXJuIHRoaXN9LGNsb25lOmZ1bmN0aW9uKGEsYil7cmV0dXJuIGE9bnVsbCE9YSYmYSxiPW51bGw9PWI/YTpiLHRoaXMubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIHIuY2xvbmUodGhpcyxhLGIpfSl9LGh0bWw6ZnVuY3Rpb24oYSl7cmV0dXJuIFQodGhpcyxmdW5jdGlvbihhKXt2YXIgYj10aGlzWzBdfHx7fSxjPTAsZD10aGlzLmxlbmd0aDtpZih2b2lkIDA9PT1hJiYxPT09Yi5ub2RlVHlwZSlyZXR1cm4gYi5pbm5lckhUTUw7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGEmJiFBYS50ZXN0KGEpJiYhbWFbKGthLmV4ZWMoYSl8fFtcIlwiLFwiXCJdKVsxXS50b0xvd2VyQ2FzZSgpXSl7YT1yLmh0bWxQcmVmaWx0ZXIoYSk7dHJ5e2Zvcig7YzxkO2MrKyliPXRoaXNbY118fHt9LDE9PT1iLm5vZGVUeXBlJiYoci5jbGVhbkRhdGEobmEoYiwhMSkpLGIuaW5uZXJIVE1MPWEpO2I9MH1jYXRjaChlKXt9fWImJnRoaXMuZW1wdHkoKS5hcHBlbmQoYSl9LG51bGwsYSxhcmd1bWVudHMubGVuZ3RoKX0scmVwbGFjZVdpdGg6ZnVuY3Rpb24oKXt2YXIgYT1bXTtyZXR1cm4gSmEodGhpcyxhcmd1bWVudHMsZnVuY3Rpb24oYil7dmFyIGM9dGhpcy5wYXJlbnROb2RlO3IuaW5BcnJheSh0aGlzLGEpPDAmJihyLmNsZWFuRGF0YShuYSh0aGlzKSksYyYmYy5yZXBsYWNlQ2hpbGQoYix0aGlzKSl9LGEpfX0pLHIuZWFjaCh7YXBwZW5kVG86XCJhcHBlbmRcIixwcmVwZW5kVG86XCJwcmVwZW5kXCIsaW5zZXJ0QmVmb3JlOlwiYmVmb3JlXCIsaW5zZXJ0QWZ0ZXI6XCJhZnRlclwiLHJlcGxhY2VBbGw6XCJyZXBsYWNlV2l0aFwifSxmdW5jdGlvbihhLGIpe3IuZm5bYV09ZnVuY3Rpb24oYSl7Zm9yKHZhciBjLGQ9W10sZT1yKGEpLGY9ZS5sZW5ndGgtMSxnPTA7Zzw9ZjtnKyspYz1nPT09Zj90aGlzOnRoaXMuY2xvbmUoITApLHIoZVtnXSlbYl0oYyksaC5hcHBseShkLGMuZ2V0KCkpO3JldHVybiB0aGlzLnB1c2hTdGFjayhkKX19KTt2YXIgTGE9L15tYXJnaW4vLE1hPW5ldyBSZWdFeHAoXCJeKFwiK2FhK1wiKSg/IXB4KVthLXolXSskXCIsXCJpXCIpLE5hPWZ1bmN0aW9uKGIpe3ZhciBjPWIub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldztyZXR1cm4gYyYmYy5vcGVuZXJ8fChjPWEpLGMuZ2V0Q29tcHV0ZWRTdHlsZShiKX07IWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYigpe2lmKGkpe2kuc3R5bGUuY3NzVGV4dD1cImJveC1zaXppbmc6Ym9yZGVyLWJveDtwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO21hcmdpbjphdXRvO2JvcmRlcjoxcHg7cGFkZGluZzoxcHg7dG9wOjElO3dpZHRoOjUwJVwiLGkuaW5uZXJIVE1MPVwiXCIscmEuYXBwZW5kQ2hpbGQoaCk7dmFyIGI9YS5nZXRDb21wdXRlZFN0eWxlKGkpO2M9XCIxJVwiIT09Yi50b3AsZz1cIjJweFwiPT09Yi5tYXJnaW5MZWZ0LGU9XCI0cHhcIj09PWIud2lkdGgsaS5zdHlsZS5tYXJnaW5SaWdodD1cIjUwJVwiLGY9XCI0cHhcIj09PWIubWFyZ2luUmlnaHQscmEucmVtb3ZlQ2hpbGQoaCksaT1udWxsfX12YXIgYyxlLGYsZyxoPWQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxpPWQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtpLnN0eWxlJiYoaS5zdHlsZS5iYWNrZ3JvdW5kQ2xpcD1cImNvbnRlbnQtYm94XCIsaS5jbG9uZU5vZGUoITApLnN0eWxlLmJhY2tncm91bmRDbGlwPVwiXCIsby5jbGVhckNsb25lU3R5bGU9XCJjb250ZW50LWJveFwiPT09aS5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCxoLnN0eWxlLmNzc1RleHQ9XCJib3JkZXI6MDt3aWR0aDo4cHg7aGVpZ2h0OjA7dG9wOjA7bGVmdDotOTk5OXB4O3BhZGRpbmc6MDttYXJnaW4tdG9wOjFweDtwb3NpdGlvbjphYnNvbHV0ZVwiLGguYXBwZW5kQ2hpbGQoaSksci5leHRlbmQobyx7cGl4ZWxQb3NpdGlvbjpmdW5jdGlvbigpe3JldHVybiBiKCksY30sYm94U2l6aW5nUmVsaWFibGU6ZnVuY3Rpb24oKXtyZXR1cm4gYigpLGV9LHBpeGVsTWFyZ2luUmlnaHQ6ZnVuY3Rpb24oKXtyZXR1cm4gYigpLGZ9LHJlbGlhYmxlTWFyZ2luTGVmdDpmdW5jdGlvbigpe3JldHVybiBiKCksZ319KSl9KCk7ZnVuY3Rpb24gT2EoYSxiLGMpe3ZhciBkLGUsZixnLGg9YS5zdHlsZTtyZXR1cm4gYz1jfHxOYShhKSxjJiYoZz1jLmdldFByb3BlcnR5VmFsdWUoYil8fGNbYl0sXCJcIiE9PWd8fHIuY29udGFpbnMoYS5vd25lckRvY3VtZW50LGEpfHwoZz1yLnN0eWxlKGEsYikpLCFvLnBpeGVsTWFyZ2luUmlnaHQoKSYmTWEudGVzdChnKSYmTGEudGVzdChiKSYmKGQ9aC53aWR0aCxlPWgubWluV2lkdGgsZj1oLm1heFdpZHRoLGgubWluV2lkdGg9aC5tYXhXaWR0aD1oLndpZHRoPWcsZz1jLndpZHRoLGgud2lkdGg9ZCxoLm1pbldpZHRoPWUsaC5tYXhXaWR0aD1mKSksdm9pZCAwIT09Zz9nK1wiXCI6Z31mdW5jdGlvbiBQYShhLGIpe3JldHVybntnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gYSgpP3ZvaWQgZGVsZXRlIHRoaXMuZ2V0Oih0aGlzLmdldD1iKS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fX12YXIgUWE9L14obm9uZXx0YWJsZSg/IS1jW2VhXSkuKykvLFJhPS9eLS0vLFNhPXtwb3NpdGlvbjpcImFic29sdXRlXCIsdmlzaWJpbGl0eTpcImhpZGRlblwiLGRpc3BsYXk6XCJibG9ja1wifSxUYT17bGV0dGVyU3BhY2luZzpcIjBcIixmb250V2VpZ2h0OlwiNDAwXCJ9LFVhPVtcIldlYmtpdFwiLFwiTW96XCIsXCJtc1wiXSxWYT1kLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikuc3R5bGU7ZnVuY3Rpb24gV2EoYSl7aWYoYSBpbiBWYSlyZXR1cm4gYTt2YXIgYj1hWzBdLnRvVXBwZXJDYXNlKCkrYS5zbGljZSgxKSxjPVVhLmxlbmd0aDt3aGlsZShjLS0paWYoYT1VYVtjXStiLGEgaW4gVmEpcmV0dXJuIGF9ZnVuY3Rpb24gWGEoYSl7dmFyIGI9ci5jc3NQcm9wc1thXTtyZXR1cm4gYnx8KGI9ci5jc3NQcm9wc1thXT1XYShhKXx8YSksYn1mdW5jdGlvbiBZYShhLGIsYyl7dmFyIGQ9YmEuZXhlYyhiKTtyZXR1cm4gZD9NYXRoLm1heCgwLGRbMl0tKGN8fDApKSsoZFszXXx8XCJweFwiKTpifWZ1bmN0aW9uIFphKGEsYixjLGQsZSl7dmFyIGYsZz0wO2ZvcihmPWM9PT0oZD9cImJvcmRlclwiOlwiY29udGVudFwiKT80Olwid2lkdGhcIj09PWI/MTowO2Y8NDtmKz0yKVwibWFyZ2luXCI9PT1jJiYoZys9ci5jc3MoYSxjK2NhW2ZdLCEwLGUpKSxkPyhcImNvbnRlbnRcIj09PWMmJihnLT1yLmNzcyhhLFwicGFkZGluZ1wiK2NhW2ZdLCEwLGUpKSxcIm1hcmdpblwiIT09YyYmKGctPXIuY3NzKGEsXCJib3JkZXJcIitjYVtmXStcIldpZHRoXCIsITAsZSkpKTooZys9ci5jc3MoYSxcInBhZGRpbmdcIitjYVtmXSwhMCxlKSxcInBhZGRpbmdcIiE9PWMmJihnKz1yLmNzcyhhLFwiYm9yZGVyXCIrY2FbZl0rXCJXaWR0aFwiLCEwLGUpKSk7cmV0dXJuIGd9ZnVuY3Rpb24gJGEoYSxiLGMpe3ZhciBkLGU9TmEoYSksZj1PYShhLGIsZSksZz1cImJvcmRlci1ib3hcIj09PXIuY3NzKGEsXCJib3hTaXppbmdcIiwhMSxlKTtyZXR1cm4gTWEudGVzdChmKT9mOihkPWcmJihvLmJveFNpemluZ1JlbGlhYmxlKCl8fGY9PT1hLnN0eWxlW2JdKSxcImF1dG9cIj09PWYmJihmPWFbXCJvZmZzZXRcIitiWzBdLnRvVXBwZXJDYXNlKCkrYi5zbGljZSgxKV0pLGY9cGFyc2VGbG9hdChmKXx8MCxmK1phKGEsYixjfHwoZz9cImJvcmRlclwiOlwiY29udGVudFwiKSxkLGUpK1wicHhcIil9ci5leHRlbmQoe2Nzc0hvb2tzOntvcGFjaXR5OntnZXQ6ZnVuY3Rpb24oYSxiKXtpZihiKXt2YXIgYz1PYShhLFwib3BhY2l0eVwiKTtyZXR1cm5cIlwiPT09Yz9cIjFcIjpjfX19fSxjc3NOdW1iZXI6e2FuaW1hdGlvbkl0ZXJhdGlvbkNvdW50OiEwLGNvbHVtbkNvdW50OiEwLGZpbGxPcGFjaXR5OiEwLGZsZXhHcm93OiEwLGZsZXhTaHJpbms6ITAsZm9udFdlaWdodDohMCxsaW5lSGVpZ2h0OiEwLG9wYWNpdHk6ITAsb3JkZXI6ITAsb3JwaGFuczohMCx3aWRvd3M6ITAsekluZGV4OiEwLHpvb206ITB9LGNzc1Byb3BzOntcImZsb2F0XCI6XCJjc3NGbG9hdFwifSxzdHlsZTpmdW5jdGlvbihhLGIsYyxkKXtpZihhJiYzIT09YS5ub2RlVHlwZSYmOCE9PWEubm9kZVR5cGUmJmEuc3R5bGUpe3ZhciBlLGYsZyxoPXIuY2FtZWxDYXNlKGIpLGk9UmEudGVzdChiKSxqPWEuc3R5bGU7cmV0dXJuIGl8fChiPVhhKGgpKSxnPXIuY3NzSG9va3NbYl18fHIuY3NzSG9va3NbaF0sdm9pZCAwPT09Yz9nJiZcImdldFwiaW4gZyYmdm9pZCAwIT09KGU9Zy5nZXQoYSwhMSxkKSk/ZTpqW2JdOihmPXR5cGVvZiBjLFwic3RyaW5nXCI9PT1mJiYoZT1iYS5leGVjKGMpKSYmZVsxXSYmKGM9ZmEoYSxiLGUpLGY9XCJudW1iZXJcIiksbnVsbCE9YyYmYz09PWMmJihcIm51bWJlclwiPT09ZiYmKGMrPWUmJmVbM118fChyLmNzc051bWJlcltoXT9cIlwiOlwicHhcIikpLG8uY2xlYXJDbG9uZVN0eWxlfHxcIlwiIT09Y3x8MCE9PWIuaW5kZXhPZihcImJhY2tncm91bmRcIil8fChqW2JdPVwiaW5oZXJpdFwiKSxnJiZcInNldFwiaW4gZyYmdm9pZCAwPT09KGM9Zy5zZXQoYSxjLGQpKXx8KGk/ai5zZXRQcm9wZXJ0eShiLGMpOmpbYl09YykpLHZvaWQgMCl9fSxjc3M6ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGUsZixnLGg9ci5jYW1lbENhc2UoYiksaT1SYS50ZXN0KGIpO3JldHVybiBpfHwoYj1YYShoKSksZz1yLmNzc0hvb2tzW2JdfHxyLmNzc0hvb2tzW2hdLGcmJlwiZ2V0XCJpbiBnJiYoZT1nLmdldChhLCEwLGMpKSx2b2lkIDA9PT1lJiYoZT1PYShhLGIsZCkpLFwibm9ybWFsXCI9PT1lJiZiIGluIFRhJiYoZT1UYVtiXSksXCJcIj09PWN8fGM/KGY9cGFyc2VGbG9hdChlKSxjPT09ITB8fGlzRmluaXRlKGYpP2Z8fDA6ZSk6ZX19KSxyLmVhY2goW1wiaGVpZ2h0XCIsXCJ3aWR0aFwiXSxmdW5jdGlvbihhLGIpe3IuY3NzSG9va3NbYl09e2dldDpmdW5jdGlvbihhLGMsZCl7aWYoYylyZXR1cm4hUWEudGVzdChyLmNzcyhhLFwiZGlzcGxheVwiKSl8fGEuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGgmJmEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg/JGEoYSxiLGQpOmVhKGEsU2EsZnVuY3Rpb24oKXtyZXR1cm4gJGEoYSxiLGQpfSl9LHNldDpmdW5jdGlvbihhLGMsZCl7dmFyIGUsZj1kJiZOYShhKSxnPWQmJlphKGEsYixkLFwiYm9yZGVyLWJveFwiPT09ci5jc3MoYSxcImJveFNpemluZ1wiLCExLGYpLGYpO3JldHVybiBnJiYoZT1iYS5leGVjKGMpKSYmXCJweFwiIT09KGVbM118fFwicHhcIikmJihhLnN0eWxlW2JdPWMsYz1yLmNzcyhhLGIpKSxZYShhLGMsZyl9fX0pLHIuY3NzSG9va3MubWFyZ2luTGVmdD1QYShvLnJlbGlhYmxlTWFyZ2luTGVmdCxmdW5jdGlvbihhLGIpe2lmKGIpcmV0dXJuKHBhcnNlRmxvYXQoT2EoYSxcIm1hcmdpbkxlZnRcIikpfHxhLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQtZWEoYSx7bWFyZ2luTGVmdDowfSxmdW5jdGlvbigpe3JldHVybiBhLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnR9KSkrXCJweFwifSksci5lYWNoKHttYXJnaW46XCJcIixwYWRkaW5nOlwiXCIsYm9yZGVyOlwiV2lkdGhcIn0sZnVuY3Rpb24oYSxiKXtyLmNzc0hvb2tzW2ErYl09e2V4cGFuZDpmdW5jdGlvbihjKXtmb3IodmFyIGQ9MCxlPXt9LGY9XCJzdHJpbmdcIj09dHlwZW9mIGM/Yy5zcGxpdChcIiBcIik6W2NdO2Q8NDtkKyspZVthK2NhW2RdK2JdPWZbZF18fGZbZC0yXXx8ZlswXTtyZXR1cm4gZX19LExhLnRlc3QoYSl8fChyLmNzc0hvb2tzW2ErYl0uc2V0PVlhKX0pLHIuZm4uZXh0ZW5kKHtjc3M6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gVCh0aGlzLGZ1bmN0aW9uKGEsYixjKXt2YXIgZCxlLGY9e30sZz0wO2lmKEFycmF5LmlzQXJyYXkoYikpe2ZvcihkPU5hKGEpLGU9Yi5sZW5ndGg7ZzxlO2crKylmW2JbZ11dPXIuY3NzKGEsYltnXSwhMSxkKTtyZXR1cm4gZn1yZXR1cm4gdm9pZCAwIT09Yz9yLnN0eWxlKGEsYixjKTpyLmNzcyhhLGIpfSxhLGIsYXJndW1lbnRzLmxlbmd0aD4xKX19KTtmdW5jdGlvbiBfYShhLGIsYyxkLGUpe3JldHVybiBuZXcgX2EucHJvdG90eXBlLmluaXQoYSxiLGMsZCxlKX1yLlR3ZWVuPV9hLF9hLnByb3RvdHlwZT17Y29uc3RydWN0b3I6X2EsaW5pdDpmdW5jdGlvbihhLGIsYyxkLGUsZil7dGhpcy5lbGVtPWEsdGhpcy5wcm9wPWMsdGhpcy5lYXNpbmc9ZXx8ci5lYXNpbmcuX2RlZmF1bHQsdGhpcy5vcHRpb25zPWIsdGhpcy5zdGFydD10aGlzLm5vdz10aGlzLmN1cigpLHRoaXMuZW5kPWQsdGhpcy51bml0PWZ8fChyLmNzc051bWJlcltjXT9cIlwiOlwicHhcIil9LGN1cjpmdW5jdGlvbigpe3ZhciBhPV9hLnByb3BIb29rc1t0aGlzLnByb3BdO3JldHVybiBhJiZhLmdldD9hLmdldCh0aGlzKTpfYS5wcm9wSG9va3MuX2RlZmF1bHQuZ2V0KHRoaXMpfSxydW46ZnVuY3Rpb24oYSl7dmFyIGIsYz1fYS5wcm9wSG9va3NbdGhpcy5wcm9wXTtyZXR1cm4gdGhpcy5vcHRpb25zLmR1cmF0aW9uP3RoaXMucG9zPWI9ci5lYXNpbmdbdGhpcy5lYXNpbmddKGEsdGhpcy5vcHRpb25zLmR1cmF0aW9uKmEsMCwxLHRoaXMub3B0aW9ucy5kdXJhdGlvbik6dGhpcy5wb3M9Yj1hLHRoaXMubm93PSh0aGlzLmVuZC10aGlzLnN0YXJ0KSpiK3RoaXMuc3RhcnQsdGhpcy5vcHRpb25zLnN0ZXAmJnRoaXMub3B0aW9ucy5zdGVwLmNhbGwodGhpcy5lbGVtLHRoaXMubm93LHRoaXMpLGMmJmMuc2V0P2Muc2V0KHRoaXMpOl9hLnByb3BIb29rcy5fZGVmYXVsdC5zZXQodGhpcyksdGhpc319LF9hLnByb3RvdHlwZS5pbml0LnByb3RvdHlwZT1fYS5wcm90b3R5cGUsX2EucHJvcEhvb2tzPXtfZGVmYXVsdDp7Z2V0OmZ1bmN0aW9uKGEpe3ZhciBiO3JldHVybiAxIT09YS5lbGVtLm5vZGVUeXBlfHxudWxsIT1hLmVsZW1bYS5wcm9wXSYmbnVsbD09YS5lbGVtLnN0eWxlW2EucHJvcF0/YS5lbGVtW2EucHJvcF06KGI9ci5jc3MoYS5lbGVtLGEucHJvcCxcIlwiKSxiJiZcImF1dG9cIiE9PWI/YjowKX0sc2V0OmZ1bmN0aW9uKGEpe3IuZnguc3RlcFthLnByb3BdP3IuZnguc3RlcFthLnByb3BdKGEpOjEhPT1hLmVsZW0ubm9kZVR5cGV8fG51bGw9PWEuZWxlbS5zdHlsZVtyLmNzc1Byb3BzW2EucHJvcF1dJiYhci5jc3NIb29rc1thLnByb3BdP2EuZWxlbVthLnByb3BdPWEubm93OnIuc3R5bGUoYS5lbGVtLGEucHJvcCxhLm5vdythLnVuaXQpfX19LF9hLnByb3BIb29rcy5zY3JvbGxUb3A9X2EucHJvcEhvb2tzLnNjcm9sbExlZnQ9e3NldDpmdW5jdGlvbihhKXthLmVsZW0ubm9kZVR5cGUmJmEuZWxlbS5wYXJlbnROb2RlJiYoYS5lbGVtW2EucHJvcF09YS5ub3cpfX0sci5lYXNpbmc9e2xpbmVhcjpmdW5jdGlvbihhKXtyZXR1cm4gYX0sc3dpbmc6ZnVuY3Rpb24oYSl7cmV0dXJuLjUtTWF0aC5jb3MoYSpNYXRoLlBJKS8yfSxfZGVmYXVsdDpcInN3aW5nXCJ9LHIuZng9X2EucHJvdG90eXBlLmluaXQsci5meC5zdGVwPXt9O3ZhciBhYixiYixjYj0vXig/OnRvZ2dsZXxzaG93fGhpZGUpJC8sZGI9L3F1ZXVlSG9va3MkLztmdW5jdGlvbiBlYigpe2JiJiYoZC5oaWRkZW49PT0hMSYmYS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU/YS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZWIpOmEuc2V0VGltZW91dChlYixyLmZ4LmludGVydmFsKSxyLmZ4LnRpY2soKSl9ZnVuY3Rpb24gZmIoKXtyZXR1cm4gYS5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YWI9dm9pZCAwfSksYWI9ci5ub3coKX1mdW5jdGlvbiBnYihhLGIpe3ZhciBjLGQ9MCxlPXtoZWlnaHQ6YX07Zm9yKGI9Yj8xOjA7ZDw0O2QrPTItYiljPWNhW2RdLGVbXCJtYXJnaW5cIitjXT1lW1wicGFkZGluZ1wiK2NdPWE7cmV0dXJuIGImJihlLm9wYWNpdHk9ZS53aWR0aD1hKSxlfWZ1bmN0aW9uIGhiKGEsYixjKXtmb3IodmFyIGQsZT0oa2IudHdlZW5lcnNbYl18fFtdKS5jb25jYXQoa2IudHdlZW5lcnNbXCIqXCJdKSxmPTAsZz1lLmxlbmd0aDtmPGc7ZisrKWlmKGQ9ZVtmXS5jYWxsKGMsYixhKSlyZXR1cm4gZH1mdW5jdGlvbiBpYihhLGIsYyl7dmFyIGQsZSxmLGcsaCxpLGosayxsPVwid2lkdGhcImluIGJ8fFwiaGVpZ2h0XCJpbiBiLG09dGhpcyxuPXt9LG89YS5zdHlsZSxwPWEubm9kZVR5cGUmJmRhKGEpLHE9Vy5nZXQoYSxcImZ4c2hvd1wiKTtjLnF1ZXVlfHwoZz1yLl9xdWV1ZUhvb2tzKGEsXCJmeFwiKSxudWxsPT1nLnVucXVldWVkJiYoZy51bnF1ZXVlZD0wLGg9Zy5lbXB0eS5maXJlLGcuZW1wdHkuZmlyZT1mdW5jdGlvbigpe2cudW5xdWV1ZWR8fGgoKX0pLGcudW5xdWV1ZWQrKyxtLmFsd2F5cyhmdW5jdGlvbigpe20uYWx3YXlzKGZ1bmN0aW9uKCl7Zy51bnF1ZXVlZC0tLHIucXVldWUoYSxcImZ4XCIpLmxlbmd0aHx8Zy5lbXB0eS5maXJlKCl9KX0pKTtmb3IoZCBpbiBiKWlmKGU9YltkXSxjYi50ZXN0KGUpKXtpZihkZWxldGUgYltkXSxmPWZ8fFwidG9nZ2xlXCI9PT1lLGU9PT0ocD9cImhpZGVcIjpcInNob3dcIikpe2lmKFwic2hvd1wiIT09ZXx8IXF8fHZvaWQgMD09PXFbZF0pY29udGludWU7cD0hMH1uW2RdPXEmJnFbZF18fHIuc3R5bGUoYSxkKX1pZihpPSFyLmlzRW1wdHlPYmplY3QoYiksaXx8IXIuaXNFbXB0eU9iamVjdChuKSl7bCYmMT09PWEubm9kZVR5cGUmJihjLm92ZXJmbG93PVtvLm92ZXJmbG93LG8ub3ZlcmZsb3dYLG8ub3ZlcmZsb3dZXSxqPXEmJnEuZGlzcGxheSxudWxsPT1qJiYoaj1XLmdldChhLFwiZGlzcGxheVwiKSksaz1yLmNzcyhhLFwiZGlzcGxheVwiKSxcIm5vbmVcIj09PWsmJihqP2s9ajooaWEoW2FdLCEwKSxqPWEuc3R5bGUuZGlzcGxheXx8aixrPXIuY3NzKGEsXCJkaXNwbGF5XCIpLGlhKFthXSkpKSwoXCJpbmxpbmVcIj09PWt8fFwiaW5saW5lLWJsb2NrXCI9PT1rJiZudWxsIT1qKSYmXCJub25lXCI9PT1yLmNzcyhhLFwiZmxvYXRcIikmJihpfHwobS5kb25lKGZ1bmN0aW9uKCl7by5kaXNwbGF5PWp9KSxudWxsPT1qJiYoaz1vLmRpc3BsYXksaj1cIm5vbmVcIj09PWs/XCJcIjprKSksby5kaXNwbGF5PVwiaW5saW5lLWJsb2NrXCIpKSxjLm92ZXJmbG93JiYoby5vdmVyZmxvdz1cImhpZGRlblwiLG0uYWx3YXlzKGZ1bmN0aW9uKCl7by5vdmVyZmxvdz1jLm92ZXJmbG93WzBdLG8ub3ZlcmZsb3dYPWMub3ZlcmZsb3dbMV0sby5vdmVyZmxvd1k9Yy5vdmVyZmxvd1syXX0pKSxpPSExO2ZvcihkIGluIG4paXx8KHE/XCJoaWRkZW5cImluIHEmJihwPXEuaGlkZGVuKTpxPVcuYWNjZXNzKGEsXCJmeHNob3dcIix7ZGlzcGxheTpqfSksZiYmKHEuaGlkZGVuPSFwKSxwJiZpYShbYV0sITApLG0uZG9uZShmdW5jdGlvbigpe3B8fGlhKFthXSksVy5yZW1vdmUoYSxcImZ4c2hvd1wiKTtmb3IoZCBpbiBuKXIuc3R5bGUoYSxkLG5bZF0pfSkpLGk9aGIocD9xW2RdOjAsZCxtKSxkIGluIHF8fChxW2RdPWkuc3RhcnQscCYmKGkuZW5kPWkuc3RhcnQsaS5zdGFydD0wKSl9fWZ1bmN0aW9uIGpiKGEsYil7dmFyIGMsZCxlLGYsZztmb3IoYyBpbiBhKWlmKGQ9ci5jYW1lbENhc2UoYyksZT1iW2RdLGY9YVtjXSxBcnJheS5pc0FycmF5KGYpJiYoZT1mWzFdLGY9YVtjXT1mWzBdKSxjIT09ZCYmKGFbZF09ZixkZWxldGUgYVtjXSksZz1yLmNzc0hvb2tzW2RdLGcmJlwiZXhwYW5kXCJpbiBnKXtmPWcuZXhwYW5kKGYpLGRlbGV0ZSBhW2RdO2ZvcihjIGluIGYpYyBpbiBhfHwoYVtjXT1mW2NdLGJbY109ZSl9ZWxzZSBiW2RdPWV9ZnVuY3Rpb24ga2IoYSxiLGMpe3ZhciBkLGUsZj0wLGc9a2IucHJlZmlsdGVycy5sZW5ndGgsaD1yLkRlZmVycmVkKCkuYWx3YXlzKGZ1bmN0aW9uKCl7ZGVsZXRlIGkuZWxlbX0pLGk9ZnVuY3Rpb24oKXtpZihlKXJldHVybiExO2Zvcih2YXIgYj1hYnx8ZmIoKSxjPU1hdGgubWF4KDAsai5zdGFydFRpbWUrai5kdXJhdGlvbi1iKSxkPWMvai5kdXJhdGlvbnx8MCxmPTEtZCxnPTAsaT1qLnR3ZWVucy5sZW5ndGg7ZzxpO2crKylqLnR3ZWVuc1tnXS5ydW4oZik7cmV0dXJuIGgubm90aWZ5V2l0aChhLFtqLGYsY10pLGY8MSYmaT9jOihpfHxoLm5vdGlmeVdpdGgoYSxbaiwxLDBdKSxoLnJlc29sdmVXaXRoKGEsW2pdKSwhMSl9LGo9aC5wcm9taXNlKHtlbGVtOmEscHJvcHM6ci5leHRlbmQoe30sYiksb3B0czpyLmV4dGVuZCghMCx7c3BlY2lhbEVhc2luZzp7fSxlYXNpbmc6ci5lYXNpbmcuX2RlZmF1bHR9LGMpLG9yaWdpbmFsUHJvcGVydGllczpiLG9yaWdpbmFsT3B0aW9uczpjLHN0YXJ0VGltZTphYnx8ZmIoKSxkdXJhdGlvbjpjLmR1cmF0aW9uLHR3ZWVuczpbXSxjcmVhdGVUd2VlbjpmdW5jdGlvbihiLGMpe3ZhciBkPXIuVHdlZW4oYSxqLm9wdHMsYixjLGoub3B0cy5zcGVjaWFsRWFzaW5nW2JdfHxqLm9wdHMuZWFzaW5nKTtyZXR1cm4gai50d2VlbnMucHVzaChkKSxkfSxzdG9wOmZ1bmN0aW9uKGIpe3ZhciBjPTAsZD1iP2oudHdlZW5zLmxlbmd0aDowO2lmKGUpcmV0dXJuIHRoaXM7Zm9yKGU9ITA7YzxkO2MrKylqLnR3ZWVuc1tjXS5ydW4oMSk7cmV0dXJuIGI/KGgubm90aWZ5V2l0aChhLFtqLDEsMF0pLGgucmVzb2x2ZVdpdGgoYSxbaixiXSkpOmgucmVqZWN0V2l0aChhLFtqLGJdKSx0aGlzfX0pLGs9ai5wcm9wcztmb3IoamIoayxqLm9wdHMuc3BlY2lhbEVhc2luZyk7ZjxnO2YrKylpZihkPWtiLnByZWZpbHRlcnNbZl0uY2FsbChqLGEsayxqLm9wdHMpKXJldHVybiByLmlzRnVuY3Rpb24oZC5zdG9wKSYmKHIuX3F1ZXVlSG9va3Moai5lbGVtLGoub3B0cy5xdWV1ZSkuc3RvcD1yLnByb3h5KGQuc3RvcCxkKSksZDtyZXR1cm4gci5tYXAoayxoYixqKSxyLmlzRnVuY3Rpb24oai5vcHRzLnN0YXJ0KSYmai5vcHRzLnN0YXJ0LmNhbGwoYSxqKSxqLnByb2dyZXNzKGoub3B0cy5wcm9ncmVzcykuZG9uZShqLm9wdHMuZG9uZSxqLm9wdHMuY29tcGxldGUpLmZhaWwoai5vcHRzLmZhaWwpLmFsd2F5cyhqLm9wdHMuYWx3YXlzKSxyLmZ4LnRpbWVyKHIuZXh0ZW5kKGkse2VsZW06YSxhbmltOmoscXVldWU6ai5vcHRzLnF1ZXVlfSkpLGp9ci5BbmltYXRpb249ci5leHRlbmQoa2Ise3R3ZWVuZXJzOntcIipcIjpbZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzLmNyZWF0ZVR3ZWVuKGEsYik7cmV0dXJuIGZhKGMuZWxlbSxhLGJhLmV4ZWMoYiksYyksY31dfSx0d2VlbmVyOmZ1bmN0aW9uKGEsYil7ci5pc0Z1bmN0aW9uKGEpPyhiPWEsYT1bXCIqXCJdKTphPWEubWF0Y2goTCk7Zm9yKHZhciBjLGQ9MCxlPWEubGVuZ3RoO2Q8ZTtkKyspYz1hW2RdLGtiLnR3ZWVuZXJzW2NdPWtiLnR3ZWVuZXJzW2NdfHxbXSxrYi50d2VlbmVyc1tjXS51bnNoaWZ0KGIpfSxwcmVmaWx0ZXJzOltpYl0scHJlZmlsdGVyOmZ1bmN0aW9uKGEsYil7Yj9rYi5wcmVmaWx0ZXJzLnVuc2hpZnQoYSk6a2IucHJlZmlsdGVycy5wdXNoKGEpfX0pLHIuc3BlZWQ9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPWEmJlwib2JqZWN0XCI9PXR5cGVvZiBhP3IuZXh0ZW5kKHt9LGEpOntjb21wbGV0ZTpjfHwhYyYmYnx8ci5pc0Z1bmN0aW9uKGEpJiZhLGR1cmF0aW9uOmEsZWFzaW5nOmMmJmJ8fGImJiFyLmlzRnVuY3Rpb24oYikmJmJ9O3JldHVybiByLmZ4Lm9mZj9kLmR1cmF0aW9uPTA6XCJudW1iZXJcIiE9dHlwZW9mIGQuZHVyYXRpb24mJihkLmR1cmF0aW9uIGluIHIuZnguc3BlZWRzP2QuZHVyYXRpb249ci5meC5zcGVlZHNbZC5kdXJhdGlvbl06ZC5kdXJhdGlvbj1yLmZ4LnNwZWVkcy5fZGVmYXVsdCksbnVsbCE9ZC5xdWV1ZSYmZC5xdWV1ZSE9PSEwfHwoZC5xdWV1ZT1cImZ4XCIpLGQub2xkPWQuY29tcGxldGUsZC5jb21wbGV0ZT1mdW5jdGlvbigpe3IuaXNGdW5jdGlvbihkLm9sZCkmJmQub2xkLmNhbGwodGhpcyksZC5xdWV1ZSYmci5kZXF1ZXVlKHRoaXMsZC5xdWV1ZSl9LGR9LHIuZm4uZXh0ZW5kKHtmYWRlVG86ZnVuY3Rpb24oYSxiLGMsZCl7cmV0dXJuIHRoaXMuZmlsdGVyKGRhKS5jc3MoXCJvcGFjaXR5XCIsMCkuc2hvdygpLmVuZCgpLmFuaW1hdGUoe29wYWNpdHk6Yn0sYSxjLGQpfSxhbmltYXRlOmZ1bmN0aW9uKGEsYixjLGQpe3ZhciBlPXIuaXNFbXB0eU9iamVjdChhKSxmPXIuc3BlZWQoYixjLGQpLGc9ZnVuY3Rpb24oKXt2YXIgYj1rYih0aGlzLHIuZXh0ZW5kKHt9LGEpLGYpOyhlfHxXLmdldCh0aGlzLFwiZmluaXNoXCIpKSYmYi5zdG9wKCEwKX07cmV0dXJuIGcuZmluaXNoPWcsZXx8Zi5xdWV1ZT09PSExP3RoaXMuZWFjaChnKTp0aGlzLnF1ZXVlKGYucXVldWUsZyl9LHN0b3A6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPWZ1bmN0aW9uKGEpe3ZhciBiPWEuc3RvcDtkZWxldGUgYS5zdG9wLGIoYyl9O3JldHVyblwic3RyaW5nXCIhPXR5cGVvZiBhJiYoYz1iLGI9YSxhPXZvaWQgMCksYiYmYSE9PSExJiZ0aGlzLnF1ZXVlKGF8fFwiZnhcIixbXSksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGI9ITAsZT1udWxsIT1hJiZhK1wicXVldWVIb29rc1wiLGY9ci50aW1lcnMsZz1XLmdldCh0aGlzKTtpZihlKWdbZV0mJmdbZV0uc3RvcCYmZChnW2VdKTtlbHNlIGZvcihlIGluIGcpZ1tlXSYmZ1tlXS5zdG9wJiZkYi50ZXN0KGUpJiZkKGdbZV0pO2ZvcihlPWYubGVuZ3RoO2UtLTspZltlXS5lbGVtIT09dGhpc3x8bnVsbCE9YSYmZltlXS5xdWV1ZSE9PWF8fChmW2VdLmFuaW0uc3RvcChjKSxiPSExLGYuc3BsaWNlKGUsMSkpOyFiJiZjfHxyLmRlcXVldWUodGhpcyxhKX0pfSxmaW5pc2g6ZnVuY3Rpb24oYSl7cmV0dXJuIGEhPT0hMSYmKGE9YXx8XCJmeFwiKSx0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgYixjPVcuZ2V0KHRoaXMpLGQ9Y1thK1wicXVldWVcIl0sZT1jW2ErXCJxdWV1ZUhvb2tzXCJdLGY9ci50aW1lcnMsZz1kP2QubGVuZ3RoOjA7Zm9yKGMuZmluaXNoPSEwLHIucXVldWUodGhpcyxhLFtdKSxlJiZlLnN0b3AmJmUuc3RvcC5jYWxsKHRoaXMsITApLGI9Zi5sZW5ndGg7Yi0tOylmW2JdLmVsZW09PT10aGlzJiZmW2JdLnF1ZXVlPT09YSYmKGZbYl0uYW5pbS5zdG9wKCEwKSxmLnNwbGljZShiLDEpKTtmb3IoYj0wO2I8ZztiKyspZFtiXSYmZFtiXS5maW5pc2gmJmRbYl0uZmluaXNoLmNhbGwodGhpcyk7ZGVsZXRlIGMuZmluaXNofSl9fSksci5lYWNoKFtcInRvZ2dsZVwiLFwic2hvd1wiLFwiaGlkZVwiXSxmdW5jdGlvbihhLGIpe3ZhciBjPXIuZm5bYl07ci5mbltiXT1mdW5jdGlvbihhLGQsZSl7cmV0dXJuIG51bGw9PWF8fFwiYm9vbGVhblwiPT10eXBlb2YgYT9jLmFwcGx5KHRoaXMsYXJndW1lbnRzKTp0aGlzLmFuaW1hdGUoZ2IoYiwhMCksYSxkLGUpfX0pLHIuZWFjaCh7c2xpZGVEb3duOmdiKFwic2hvd1wiKSxzbGlkZVVwOmdiKFwiaGlkZVwiKSxzbGlkZVRvZ2dsZTpnYihcInRvZ2dsZVwiKSxmYWRlSW46e29wYWNpdHk6XCJzaG93XCJ9LGZhZGVPdXQ6e29wYWNpdHk6XCJoaWRlXCJ9LGZhZGVUb2dnbGU6e29wYWNpdHk6XCJ0b2dnbGVcIn19LGZ1bmN0aW9uKGEsYil7ci5mblthXT1mdW5jdGlvbihhLGMsZCl7cmV0dXJuIHRoaXMuYW5pbWF0ZShiLGEsYyxkKX19KSxyLnRpbWVycz1bXSxyLmZ4LnRpY2s9ZnVuY3Rpb24oKXt2YXIgYSxiPTAsYz1yLnRpbWVycztmb3IoYWI9ci5ub3coKTtiPGMubGVuZ3RoO2IrKylhPWNbYl0sYSgpfHxjW2JdIT09YXx8Yy5zcGxpY2UoYi0tLDEpO2MubGVuZ3RofHxyLmZ4LnN0b3AoKSxhYj12b2lkIDB9LHIuZngudGltZXI9ZnVuY3Rpb24oYSl7ci50aW1lcnMucHVzaChhKSxyLmZ4LnN0YXJ0KCl9LHIuZnguaW50ZXJ2YWw9MTMsci5meC5zdGFydD1mdW5jdGlvbigpe2JifHwoYmI9ITAsZWIoKSl9LHIuZnguc3RvcD1mdW5jdGlvbigpe2JiPW51bGx9LHIuZnguc3BlZWRzPXtzbG93OjYwMCxmYXN0OjIwMCxfZGVmYXVsdDo0MDB9LHIuZm4uZGVsYXk9ZnVuY3Rpb24oYixjKXtyZXR1cm4gYj1yLmZ4P3IuZnguc3BlZWRzW2JdfHxiOmIsYz1jfHxcImZ4XCIsdGhpcy5xdWV1ZShjLGZ1bmN0aW9uKGMsZCl7dmFyIGU9YS5zZXRUaW1lb3V0KGMsYik7ZC5zdG9wPWZ1bmN0aW9uKCl7YS5jbGVhclRpbWVvdXQoZSl9fSl9LGZ1bmN0aW9uKCl7dmFyIGE9ZC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiksYj1kLmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIiksYz1iLmFwcGVuZENoaWxkKGQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSk7YS50eXBlPVwiY2hlY2tib3hcIixvLmNoZWNrT249XCJcIiE9PWEudmFsdWUsby5vcHRTZWxlY3RlZD1jLnNlbGVjdGVkLGE9ZC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiksYS52YWx1ZT1cInRcIixhLnR5cGU9XCJyYWRpb1wiLG8ucmFkaW9WYWx1ZT1cInRcIj09PWEudmFsdWV9KCk7dmFyIGxiLG1iPXIuZXhwci5hdHRySGFuZGxlO3IuZm4uZXh0ZW5kKHthdHRyOmZ1bmN0aW9uKGEsYil7cmV0dXJuIFQodGhpcyxyLmF0dHIsYSxiLGFyZ3VtZW50cy5sZW5ndGg+MSl9LHJlbW92ZUF0dHI6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3IucmVtb3ZlQXR0cih0aGlzLGEpfSl9fSksci5leHRlbmQoe2F0dHI6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkLGUsZj1hLm5vZGVUeXBlO2lmKDMhPT1mJiY4IT09ZiYmMiE9PWYpcmV0dXJuXCJ1bmRlZmluZWRcIj09dHlwZW9mIGEuZ2V0QXR0cmlidXRlP3IucHJvcChhLGIsYyk6KDE9PT1mJiZyLmlzWE1MRG9jKGEpfHwoZT1yLmF0dHJIb29rc1tiLnRvTG93ZXJDYXNlKCldfHwoci5leHByLm1hdGNoLmJvb2wudGVzdChiKT9sYjp2b2lkIDApKSx2b2lkIDAhPT1jP251bGw9PT1jP3ZvaWQgci5yZW1vdmVBdHRyKGEsYik6ZSYmXCJzZXRcImluIGUmJnZvaWQgMCE9PShkPWUuc2V0KGEsYyxiKSk/ZDooYS5zZXRBdHRyaWJ1dGUoYixjK1wiXCIpLGMpOmUmJlwiZ2V0XCJpbiBlJiZudWxsIT09KGQ9ZS5nZXQoYSxiKSk/ZDooZD1yLmZpbmQuYXR0cihhLGIpLFxyXG5udWxsPT1kP3ZvaWQgMDpkKSl9LGF0dHJIb29rczp7dHlwZTp7c2V0OmZ1bmN0aW9uKGEsYil7aWYoIW8ucmFkaW9WYWx1ZSYmXCJyYWRpb1wiPT09YiYmQihhLFwiaW5wdXRcIikpe3ZhciBjPWEudmFsdWU7cmV0dXJuIGEuc2V0QXR0cmlidXRlKFwidHlwZVwiLGIpLGMmJihhLnZhbHVlPWMpLGJ9fX19LHJlbW92ZUF0dHI6ZnVuY3Rpb24oYSxiKXt2YXIgYyxkPTAsZT1iJiZiLm1hdGNoKEwpO2lmKGUmJjE9PT1hLm5vZGVUeXBlKXdoaWxlKGM9ZVtkKytdKWEucmVtb3ZlQXR0cmlidXRlKGMpfX0pLGxiPXtzZXQ6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiBiPT09ITE/ci5yZW1vdmVBdHRyKGEsYyk6YS5zZXRBdHRyaWJ1dGUoYyxjKSxjfX0sci5lYWNoKHIuZXhwci5tYXRjaC5ib29sLnNvdXJjZS5tYXRjaCgvXFx3Ky9nKSxmdW5jdGlvbihhLGIpe3ZhciBjPW1iW2JdfHxyLmZpbmQuYXR0cjttYltiXT1mdW5jdGlvbihhLGIsZCl7dmFyIGUsZixnPWIudG9Mb3dlckNhc2UoKTtyZXR1cm4gZHx8KGY9bWJbZ10sbWJbZ109ZSxlPW51bGwhPWMoYSxiLGQpP2c6bnVsbCxtYltnXT1mKSxlfX0pO3ZhciBuYj0vXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b24pJC9pLG9iPS9eKD86YXxhcmVhKSQvaTtyLmZuLmV4dGVuZCh7cHJvcDpmdW5jdGlvbihhLGIpe3JldHVybiBUKHRoaXMsci5wcm9wLGEsYixhcmd1bWVudHMubGVuZ3RoPjEpfSxyZW1vdmVQcm9wOmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtkZWxldGUgdGhpc1tyLnByb3BGaXhbYV18fGFdfSl9fSksci5leHRlbmQoe3Byb3A6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkLGUsZj1hLm5vZGVUeXBlO2lmKDMhPT1mJiY4IT09ZiYmMiE9PWYpcmV0dXJuIDE9PT1mJiZyLmlzWE1MRG9jKGEpfHwoYj1yLnByb3BGaXhbYl18fGIsZT1yLnByb3BIb29rc1tiXSksdm9pZCAwIT09Yz9lJiZcInNldFwiaW4gZSYmdm9pZCAwIT09KGQ9ZS5zZXQoYSxjLGIpKT9kOmFbYl09YzplJiZcImdldFwiaW4gZSYmbnVsbCE9PShkPWUuZ2V0KGEsYikpP2Q6YVtiXX0scHJvcEhvb2tzOnt0YWJJbmRleDp7Z2V0OmZ1bmN0aW9uKGEpe3ZhciBiPXIuZmluZC5hdHRyKGEsXCJ0YWJpbmRleFwiKTtyZXR1cm4gYj9wYXJzZUludChiLDEwKTpuYi50ZXN0KGEubm9kZU5hbWUpfHxvYi50ZXN0KGEubm9kZU5hbWUpJiZhLmhyZWY/MDotMX19fSxwcm9wRml4OntcImZvclwiOlwiaHRtbEZvclwiLFwiY2xhc3NcIjpcImNsYXNzTmFtZVwifX0pLG8ub3B0U2VsZWN0ZWR8fChyLnByb3BIb29rcy5zZWxlY3RlZD17Z2V0OmZ1bmN0aW9uKGEpe3ZhciBiPWEucGFyZW50Tm9kZTtyZXR1cm4gYiYmYi5wYXJlbnROb2RlJiZiLnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleCxudWxsfSxzZXQ6ZnVuY3Rpb24oYSl7dmFyIGI9YS5wYXJlbnROb2RlO2ImJihiLnNlbGVjdGVkSW5kZXgsYi5wYXJlbnROb2RlJiZiLnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleCl9fSksci5lYWNoKFtcInRhYkluZGV4XCIsXCJyZWFkT25seVwiLFwibWF4TGVuZ3RoXCIsXCJjZWxsU3BhY2luZ1wiLFwiY2VsbFBhZGRpbmdcIixcInJvd1NwYW5cIixcImNvbFNwYW5cIixcInVzZU1hcFwiLFwiZnJhbWVCb3JkZXJcIixcImNvbnRlbnRFZGl0YWJsZVwiXSxmdW5jdGlvbigpe3IucHJvcEZpeFt0aGlzLnRvTG93ZXJDYXNlKCldPXRoaXN9KTtmdW5jdGlvbiBwYihhKXt2YXIgYj1hLm1hdGNoKEwpfHxbXTtyZXR1cm4gYi5qb2luKFwiIFwiKX1mdW5jdGlvbiBxYihhKXtyZXR1cm4gYS5nZXRBdHRyaWJ1dGUmJmEuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIil8fFwiXCJ9ci5mbi5leHRlbmQoe2FkZENsYXNzOmZ1bmN0aW9uKGEpe3ZhciBiLGMsZCxlLGYsZyxoLGk9MDtpZihyLmlzRnVuY3Rpb24oYSkpcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihiKXtyKHRoaXMpLmFkZENsYXNzKGEuY2FsbCh0aGlzLGIscWIodGhpcykpKX0pO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBhJiZhKXtiPWEubWF0Y2goTCl8fFtdO3doaWxlKGM9dGhpc1tpKytdKWlmKGU9cWIoYyksZD0xPT09Yy5ub2RlVHlwZSYmXCIgXCIrcGIoZSkrXCIgXCIpe2c9MDt3aGlsZShmPWJbZysrXSlkLmluZGV4T2YoXCIgXCIrZitcIiBcIik8MCYmKGQrPWYrXCIgXCIpO2g9cGIoZCksZSE9PWgmJmMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixoKX19cmV0dXJuIHRoaXN9LHJlbW92ZUNsYXNzOmZ1bmN0aW9uKGEpe3ZhciBiLGMsZCxlLGYsZyxoLGk9MDtpZihyLmlzRnVuY3Rpb24oYSkpcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihiKXtyKHRoaXMpLnJlbW92ZUNsYXNzKGEuY2FsbCh0aGlzLGIscWIodGhpcykpKX0pO2lmKCFhcmd1bWVudHMubGVuZ3RoKXJldHVybiB0aGlzLmF0dHIoXCJjbGFzc1wiLFwiXCIpO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBhJiZhKXtiPWEubWF0Y2goTCl8fFtdO3doaWxlKGM9dGhpc1tpKytdKWlmKGU9cWIoYyksZD0xPT09Yy5ub2RlVHlwZSYmXCIgXCIrcGIoZSkrXCIgXCIpe2c9MDt3aGlsZShmPWJbZysrXSl3aGlsZShkLmluZGV4T2YoXCIgXCIrZitcIiBcIik+LTEpZD1kLnJlcGxhY2UoXCIgXCIrZitcIiBcIixcIiBcIik7aD1wYihkKSxlIT09aCYmYy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLGgpfX1yZXR1cm4gdGhpc30sdG9nZ2xlQ2xhc3M6ZnVuY3Rpb24oYSxiKXt2YXIgYz10eXBlb2YgYTtyZXR1cm5cImJvb2xlYW5cIj09dHlwZW9mIGImJlwic3RyaW5nXCI9PT1jP2I/dGhpcy5hZGRDbGFzcyhhKTp0aGlzLnJlbW92ZUNsYXNzKGEpOnIuaXNGdW5jdGlvbihhKT90aGlzLmVhY2goZnVuY3Rpb24oYyl7cih0aGlzKS50b2dnbGVDbGFzcyhhLmNhbGwodGhpcyxjLHFiKHRoaXMpLGIpLGIpfSk6dGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGIsZCxlLGY7aWYoXCJzdHJpbmdcIj09PWMpe2Q9MCxlPXIodGhpcyksZj1hLm1hdGNoKEwpfHxbXTt3aGlsZShiPWZbZCsrXSllLmhhc0NsYXNzKGIpP2UucmVtb3ZlQ2xhc3MoYik6ZS5hZGRDbGFzcyhiKX1lbHNlIHZvaWQgMCE9PWEmJlwiYm9vbGVhblwiIT09Y3x8KGI9cWIodGhpcyksYiYmVy5zZXQodGhpcyxcIl9fY2xhc3NOYW1lX19cIixiKSx0aGlzLnNldEF0dHJpYnV0ZSYmdGhpcy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLGJ8fGE9PT0hMT9cIlwiOlcuZ2V0KHRoaXMsXCJfX2NsYXNzTmFtZV9fXCIpfHxcIlwiKSl9KX0saGFzQ2xhc3M6ZnVuY3Rpb24oYSl7dmFyIGIsYyxkPTA7Yj1cIiBcIithK1wiIFwiO3doaWxlKGM9dGhpc1tkKytdKWlmKDE9PT1jLm5vZGVUeXBlJiYoXCIgXCIrcGIocWIoYykpK1wiIFwiKS5pbmRleE9mKGIpPi0xKXJldHVybiEwO3JldHVybiExfX0pO3ZhciByYj0vXFxyL2c7ci5mbi5leHRlbmQoe3ZhbDpmdW5jdGlvbihhKXt2YXIgYixjLGQsZT10aGlzWzBdO3tpZihhcmd1bWVudHMubGVuZ3RoKXJldHVybiBkPXIuaXNGdW5jdGlvbihhKSx0aGlzLmVhY2goZnVuY3Rpb24oYyl7dmFyIGU7MT09PXRoaXMubm9kZVR5cGUmJihlPWQ/YS5jYWxsKHRoaXMsYyxyKHRoaXMpLnZhbCgpKTphLG51bGw9PWU/ZT1cIlwiOlwibnVtYmVyXCI9PXR5cGVvZiBlP2UrPVwiXCI6QXJyYXkuaXNBcnJheShlKSYmKGU9ci5tYXAoZSxmdW5jdGlvbihhKXtyZXR1cm4gbnVsbD09YT9cIlwiOmErXCJcIn0pKSxiPXIudmFsSG9va3NbdGhpcy50eXBlXXx8ci52YWxIb29rc1t0aGlzLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCldLGImJlwic2V0XCJpbiBiJiZ2b2lkIDAhPT1iLnNldCh0aGlzLGUsXCJ2YWx1ZVwiKXx8KHRoaXMudmFsdWU9ZSkpfSk7aWYoZSlyZXR1cm4gYj1yLnZhbEhvb2tzW2UudHlwZV18fHIudmFsSG9va3NbZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpXSxiJiZcImdldFwiaW4gYiYmdm9pZCAwIT09KGM9Yi5nZXQoZSxcInZhbHVlXCIpKT9jOihjPWUudmFsdWUsXCJzdHJpbmdcIj09dHlwZW9mIGM/Yy5yZXBsYWNlKHJiLFwiXCIpOm51bGw9PWM/XCJcIjpjKX19fSksci5leHRlbmQoe3ZhbEhvb2tzOntvcHRpb246e2dldDpmdW5jdGlvbihhKXt2YXIgYj1yLmZpbmQuYXR0cihhLFwidmFsdWVcIik7cmV0dXJuIG51bGwhPWI/YjpwYihyLnRleHQoYSkpfX0sc2VsZWN0OntnZXQ6ZnVuY3Rpb24oYSl7dmFyIGIsYyxkLGU9YS5vcHRpb25zLGY9YS5zZWxlY3RlZEluZGV4LGc9XCJzZWxlY3Qtb25lXCI9PT1hLnR5cGUsaD1nP251bGw6W10saT1nP2YrMTplLmxlbmd0aDtmb3IoZD1mPDA/aTpnP2Y6MDtkPGk7ZCsrKWlmKGM9ZVtkXSwoYy5zZWxlY3RlZHx8ZD09PWYpJiYhYy5kaXNhYmxlZCYmKCFjLnBhcmVudE5vZGUuZGlzYWJsZWR8fCFCKGMucGFyZW50Tm9kZSxcIm9wdGdyb3VwXCIpKSl7aWYoYj1yKGMpLnZhbCgpLGcpcmV0dXJuIGI7aC5wdXNoKGIpfXJldHVybiBofSxzZXQ6ZnVuY3Rpb24oYSxiKXt2YXIgYyxkLGU9YS5vcHRpb25zLGY9ci5tYWtlQXJyYXkoYiksZz1lLmxlbmd0aDt3aGlsZShnLS0pZD1lW2ddLChkLnNlbGVjdGVkPXIuaW5BcnJheShyLnZhbEhvb2tzLm9wdGlvbi5nZXQoZCksZik+LTEpJiYoYz0hMCk7cmV0dXJuIGN8fChhLnNlbGVjdGVkSW5kZXg9LTEpLGZ9fX19KSxyLmVhY2goW1wicmFkaW9cIixcImNoZWNrYm94XCJdLGZ1bmN0aW9uKCl7ci52YWxIb29rc1t0aGlzXT17c2V0OmZ1bmN0aW9uKGEsYil7aWYoQXJyYXkuaXNBcnJheShiKSlyZXR1cm4gYS5jaGVja2VkPXIuaW5BcnJheShyKGEpLnZhbCgpLGIpPi0xfX0sby5jaGVja09ufHwoci52YWxIb29rc1t0aGlzXS5nZXQ9ZnVuY3Rpb24oYSl7cmV0dXJuIG51bGw9PT1hLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpP1wib25cIjphLnZhbHVlfSl9KTt2YXIgc2I9L14oPzpmb2N1c2luZm9jdXN8Zm9jdXNvdXRibHVyKSQvO3IuZXh0ZW5kKHIuZXZlbnQse3RyaWdnZXI6ZnVuY3Rpb24oYixjLGUsZil7dmFyIGcsaCxpLGosayxtLG4sbz1bZXx8ZF0scD1sLmNhbGwoYixcInR5cGVcIik/Yi50eXBlOmIscT1sLmNhbGwoYixcIm5hbWVzcGFjZVwiKT9iLm5hbWVzcGFjZS5zcGxpdChcIi5cIik6W107aWYoaD1pPWU9ZXx8ZCwzIT09ZS5ub2RlVHlwZSYmOCE9PWUubm9kZVR5cGUmJiFzYi50ZXN0KHArci5ldmVudC50cmlnZ2VyZWQpJiYocC5pbmRleE9mKFwiLlwiKT4tMSYmKHE9cC5zcGxpdChcIi5cIikscD1xLnNoaWZ0KCkscS5zb3J0KCkpLGs9cC5pbmRleE9mKFwiOlwiKTwwJiZcIm9uXCIrcCxiPWJbci5leHBhbmRvXT9iOm5ldyByLkV2ZW50KHAsXCJvYmplY3RcIj09dHlwZW9mIGImJmIpLGIuaXNUcmlnZ2VyPWY/MjozLGIubmFtZXNwYWNlPXEuam9pbihcIi5cIiksYi5ybmFtZXNwYWNlPWIubmFtZXNwYWNlP25ldyBSZWdFeHAoXCIoXnxcXFxcLilcIitxLmpvaW4oXCJcXFxcLig/Oi4qXFxcXC58KVwiKStcIihcXFxcLnwkKVwiKTpudWxsLGIucmVzdWx0PXZvaWQgMCxiLnRhcmdldHx8KGIudGFyZ2V0PWUpLGM9bnVsbD09Yz9bYl06ci5tYWtlQXJyYXkoYyxbYl0pLG49ci5ldmVudC5zcGVjaWFsW3BdfHx7fSxmfHwhbi50cmlnZ2VyfHxuLnRyaWdnZXIuYXBwbHkoZSxjKSE9PSExKSl7aWYoIWYmJiFuLm5vQnViYmxlJiYhci5pc1dpbmRvdyhlKSl7Zm9yKGo9bi5kZWxlZ2F0ZVR5cGV8fHAsc2IudGVzdChqK3ApfHwoaD1oLnBhcmVudE5vZGUpO2g7aD1oLnBhcmVudE5vZGUpby5wdXNoKGgpLGk9aDtpPT09KGUub3duZXJEb2N1bWVudHx8ZCkmJm8ucHVzaChpLmRlZmF1bHRWaWV3fHxpLnBhcmVudFdpbmRvd3x8YSl9Zz0wO3doaWxlKChoPW9bZysrXSkmJiFiLmlzUHJvcGFnYXRpb25TdG9wcGVkKCkpYi50eXBlPWc+MT9qOm4uYmluZFR5cGV8fHAsbT0oVy5nZXQoaCxcImV2ZW50c1wiKXx8e30pW2IudHlwZV0mJlcuZ2V0KGgsXCJoYW5kbGVcIiksbSYmbS5hcHBseShoLGMpLG09ayYmaFtrXSxtJiZtLmFwcGx5JiZVKGgpJiYoYi5yZXN1bHQ9bS5hcHBseShoLGMpLGIucmVzdWx0PT09ITEmJmIucHJldmVudERlZmF1bHQoKSk7cmV0dXJuIGIudHlwZT1wLGZ8fGIuaXNEZWZhdWx0UHJldmVudGVkKCl8fG4uX2RlZmF1bHQmJm4uX2RlZmF1bHQuYXBwbHkoby5wb3AoKSxjKSE9PSExfHwhVShlKXx8ayYmci5pc0Z1bmN0aW9uKGVbcF0pJiYhci5pc1dpbmRvdyhlKSYmKGk9ZVtrXSxpJiYoZVtrXT1udWxsKSxyLmV2ZW50LnRyaWdnZXJlZD1wLGVbcF0oKSxyLmV2ZW50LnRyaWdnZXJlZD12b2lkIDAsaSYmKGVba109aSkpLGIucmVzdWx0fX0sc2ltdWxhdGU6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXIuZXh0ZW5kKG5ldyByLkV2ZW50LGMse3R5cGU6YSxpc1NpbXVsYXRlZDohMH0pO3IuZXZlbnQudHJpZ2dlcihkLG51bGwsYil9fSksci5mbi5leHRlbmQoe3RyaWdnZXI6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7ci5ldmVudC50cmlnZ2VyKGEsYix0aGlzKX0pfSx0cmlnZ2VySGFuZGxlcjpmdW5jdGlvbihhLGIpe3ZhciBjPXRoaXNbMF07aWYoYylyZXR1cm4gci5ldmVudC50cmlnZ2VyKGEsYixjLCEwKX19KSxyLmVhY2goXCJibHVyIGZvY3VzIGZvY3VzaW4gZm9jdXNvdXQgcmVzaXplIHNjcm9sbCBjbGljayBkYmxjbGljayBtb3VzZWRvd24gbW91c2V1cCBtb3VzZW1vdmUgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlZW50ZXIgbW91c2VsZWF2ZSBjaGFuZ2Ugc2VsZWN0IHN1Ym1pdCBrZXlkb3duIGtleXByZXNzIGtleXVwIGNvbnRleHRtZW51XCIuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKGEsYil7ci5mbltiXT1mdW5jdGlvbihhLGMpe3JldHVybiBhcmd1bWVudHMubGVuZ3RoPjA/dGhpcy5vbihiLG51bGwsYSxjKTp0aGlzLnRyaWdnZXIoYil9fSksci5mbi5leHRlbmQoe2hvdmVyOmZ1bmN0aW9uKGEsYil7cmV0dXJuIHRoaXMubW91c2VlbnRlcihhKS5tb3VzZWxlYXZlKGJ8fGEpfX0pLG8uZm9jdXNpbj1cIm9uZm9jdXNpblwiaW4gYSxvLmZvY3VzaW58fHIuZWFjaCh7Zm9jdXM6XCJmb2N1c2luXCIsYmx1cjpcImZvY3Vzb3V0XCJ9LGZ1bmN0aW9uKGEsYil7dmFyIGM9ZnVuY3Rpb24oYSl7ci5ldmVudC5zaW11bGF0ZShiLGEudGFyZ2V0LHIuZXZlbnQuZml4KGEpKX07ci5ldmVudC5zcGVjaWFsW2JdPXtzZXR1cDpmdW5jdGlvbigpe3ZhciBkPXRoaXMub3duZXJEb2N1bWVudHx8dGhpcyxlPVcuYWNjZXNzKGQsYik7ZXx8ZC5hZGRFdmVudExpc3RlbmVyKGEsYywhMCksVy5hY2Nlc3MoZCxiLChlfHwwKSsxKX0sdGVhcmRvd246ZnVuY3Rpb24oKXt2YXIgZD10aGlzLm93bmVyRG9jdW1lbnR8fHRoaXMsZT1XLmFjY2VzcyhkLGIpLTE7ZT9XLmFjY2VzcyhkLGIsZSk6KGQucmVtb3ZlRXZlbnRMaXN0ZW5lcihhLGMsITApLFcucmVtb3ZlKGQsYikpfX19KTt2YXIgdGI9YS5sb2NhdGlvbix1Yj1yLm5vdygpLHZiPS9cXD8vO3IucGFyc2VYTUw9ZnVuY3Rpb24oYil7dmFyIGM7aWYoIWJ8fFwic3RyaW5nXCIhPXR5cGVvZiBiKXJldHVybiBudWxsO3RyeXtjPShuZXcgYS5ET01QYXJzZXIpLnBhcnNlRnJvbVN0cmluZyhiLFwidGV4dC94bWxcIil9Y2F0Y2goZCl7Yz12b2lkIDB9cmV0dXJuIGMmJiFjLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwicGFyc2VyZXJyb3JcIikubGVuZ3RofHxyLmVycm9yKFwiSW52YWxpZCBYTUw6IFwiK2IpLGN9O3ZhciB3Yj0vXFxbXFxdJC8seGI9L1xccj9cXG4vZyx5Yj0vXig/OnN1Ym1pdHxidXR0b258aW1hZ2V8cmVzZXR8ZmlsZSkkL2ksemI9L14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8a2V5Z2VuKS9pO2Z1bmN0aW9uIEFiKGEsYixjLGQpe3ZhciBlO2lmKEFycmF5LmlzQXJyYXkoYikpci5lYWNoKGIsZnVuY3Rpb24oYixlKXtjfHx3Yi50ZXN0KGEpP2QoYSxlKTpBYihhK1wiW1wiKyhcIm9iamVjdFwiPT10eXBlb2YgZSYmbnVsbCE9ZT9iOlwiXCIpK1wiXVwiLGUsYyxkKX0pO2Vsc2UgaWYoY3x8XCJvYmplY3RcIiE9PXIudHlwZShiKSlkKGEsYik7ZWxzZSBmb3IoZSBpbiBiKUFiKGErXCJbXCIrZStcIl1cIixiW2VdLGMsZCl9ci5wYXJhbT1mdW5jdGlvbihhLGIpe3ZhciBjLGQ9W10sZT1mdW5jdGlvbihhLGIpe3ZhciBjPXIuaXNGdW5jdGlvbihiKT9iKCk6YjtkW2QubGVuZ3RoXT1lbmNvZGVVUklDb21wb25lbnQoYSkrXCI9XCIrZW5jb2RlVVJJQ29tcG9uZW50KG51bGw9PWM/XCJcIjpjKX07aWYoQXJyYXkuaXNBcnJheShhKXx8YS5qcXVlcnkmJiFyLmlzUGxhaW5PYmplY3QoYSkpci5lYWNoKGEsZnVuY3Rpb24oKXtlKHRoaXMubmFtZSx0aGlzLnZhbHVlKX0pO2Vsc2UgZm9yKGMgaW4gYSlBYihjLGFbY10sYixlKTtyZXR1cm4gZC5qb2luKFwiJlwiKX0sci5mbi5leHRlbmQoe3NlcmlhbGl6ZTpmdW5jdGlvbigpe3JldHVybiByLnBhcmFtKHRoaXMuc2VyaWFsaXplQXJyYXkoKSl9LHNlcmlhbGl6ZUFycmF5OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7dmFyIGE9ci5wcm9wKHRoaXMsXCJlbGVtZW50c1wiKTtyZXR1cm4gYT9yLm1ha2VBcnJheShhKTp0aGlzfSkuZmlsdGVyKGZ1bmN0aW9uKCl7dmFyIGE9dGhpcy50eXBlO3JldHVybiB0aGlzLm5hbWUmJiFyKHRoaXMpLmlzKFwiOmRpc2FibGVkXCIpJiZ6Yi50ZXN0KHRoaXMubm9kZU5hbWUpJiYheWIudGVzdChhKSYmKHRoaXMuY2hlY2tlZHx8IWphLnRlc3QoYSkpfSkubWFwKGZ1bmN0aW9uKGEsYil7dmFyIGM9cih0aGlzKS52YWwoKTtyZXR1cm4gbnVsbD09Yz9udWxsOkFycmF5LmlzQXJyYXkoYyk/ci5tYXAoYyxmdW5jdGlvbihhKXtyZXR1cm57bmFtZTpiLm5hbWUsdmFsdWU6YS5yZXBsYWNlKHhiLFwiXFxyXFxuXCIpfX0pOntuYW1lOmIubmFtZSx2YWx1ZTpjLnJlcGxhY2UoeGIsXCJcXHJcXG5cIil9fSkuZ2V0KCl9fSk7dmFyIEJiPS8lMjAvZyxDYj0vIy4qJC8sRGI9LyhbPyZdKV89W14mXSovLEViPS9eKC4qPyk6WyBcXHRdKihbXlxcclxcbl0qKSQvZ20sRmI9L14oPzphYm91dHxhcHB8YXBwLXN0b3JhZ2V8ListZXh0ZW5zaW9ufGZpbGV8cmVzfHdpZGdldCk6JC8sR2I9L14oPzpHRVR8SEVBRCkkLyxIYj0vXlxcL1xcLy8sSWI9e30sSmI9e30sS2I9XCIqL1wiLmNvbmNhdChcIipcIiksTGI9ZC5jcmVhdGVFbGVtZW50KFwiYVwiKTtMYi5ocmVmPXRiLmhyZWY7ZnVuY3Rpb24gTWIoYSl7cmV0dXJuIGZ1bmN0aW9uKGIsYyl7XCJzdHJpbmdcIiE9dHlwZW9mIGImJihjPWIsYj1cIipcIik7dmFyIGQsZT0wLGY9Yi50b0xvd2VyQ2FzZSgpLm1hdGNoKEwpfHxbXTtpZihyLmlzRnVuY3Rpb24oYykpd2hpbGUoZD1mW2UrK10pXCIrXCI9PT1kWzBdPyhkPWQuc2xpY2UoMSl8fFwiKlwiLChhW2RdPWFbZF18fFtdKS51bnNoaWZ0KGMpKTooYVtkXT1hW2RdfHxbXSkucHVzaChjKX19ZnVuY3Rpb24gTmIoYSxiLGMsZCl7dmFyIGU9e30sZj1hPT09SmI7ZnVuY3Rpb24gZyhoKXt2YXIgaTtyZXR1cm4gZVtoXT0hMCxyLmVhY2goYVtoXXx8W10sZnVuY3Rpb24oYSxoKXt2YXIgaj1oKGIsYyxkKTtyZXR1cm5cInN0cmluZ1wiIT10eXBlb2Yganx8Znx8ZVtqXT9mPyEoaT1qKTp2b2lkIDA6KGIuZGF0YVR5cGVzLnVuc2hpZnQoaiksZyhqKSwhMSl9KSxpfXJldHVybiBnKGIuZGF0YVR5cGVzWzBdKXx8IWVbXCIqXCJdJiZnKFwiKlwiKX1mdW5jdGlvbiBPYihhLGIpe3ZhciBjLGQsZT1yLmFqYXhTZXR0aW5ncy5mbGF0T3B0aW9uc3x8e307Zm9yKGMgaW4gYil2b2lkIDAhPT1iW2NdJiYoKGVbY10/YTpkfHwoZD17fSkpW2NdPWJbY10pO3JldHVybiBkJiZyLmV4dGVuZCghMCxhLGQpLGF9ZnVuY3Rpb24gUGIoYSxiLGMpe3ZhciBkLGUsZixnLGg9YS5jb250ZW50cyxpPWEuZGF0YVR5cGVzO3doaWxlKFwiKlwiPT09aVswXSlpLnNoaWZ0KCksdm9pZCAwPT09ZCYmKGQ9YS5taW1lVHlwZXx8Yi5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKSk7aWYoZClmb3IoZSBpbiBoKWlmKGhbZV0mJmhbZV0udGVzdChkKSl7aS51bnNoaWZ0KGUpO2JyZWFrfWlmKGlbMF1pbiBjKWY9aVswXTtlbHNle2ZvcihlIGluIGMpe2lmKCFpWzBdfHxhLmNvbnZlcnRlcnNbZStcIiBcIitpWzBdXSl7Zj1lO2JyZWFrfWd8fChnPWUpfWY9Znx8Z31pZihmKXJldHVybiBmIT09aVswXSYmaS51bnNoaWZ0KGYpLGNbZl19ZnVuY3Rpb24gUWIoYSxiLGMsZCl7dmFyIGUsZixnLGgsaSxqPXt9LGs9YS5kYXRhVHlwZXMuc2xpY2UoKTtpZihrWzFdKWZvcihnIGluIGEuY29udmVydGVycylqW2cudG9Mb3dlckNhc2UoKV09YS5jb252ZXJ0ZXJzW2ddO2Y9ay5zaGlmdCgpO3doaWxlKGYpaWYoYS5yZXNwb25zZUZpZWxkc1tmXSYmKGNbYS5yZXNwb25zZUZpZWxkc1tmXV09YiksIWkmJmQmJmEuZGF0YUZpbHRlciYmKGI9YS5kYXRhRmlsdGVyKGIsYS5kYXRhVHlwZSkpLGk9ZixmPWsuc2hpZnQoKSlpZihcIipcIj09PWYpZj1pO2Vsc2UgaWYoXCIqXCIhPT1pJiZpIT09Zil7aWYoZz1qW2krXCIgXCIrZl18fGpbXCIqIFwiK2ZdLCFnKWZvcihlIGluIGopaWYoaD1lLnNwbGl0KFwiIFwiKSxoWzFdPT09ZiYmKGc9altpK1wiIFwiK2hbMF1dfHxqW1wiKiBcIitoWzBdXSkpe2c9PT0hMD9nPWpbZV06altlXSE9PSEwJiYoZj1oWzBdLGsudW5zaGlmdChoWzFdKSk7YnJlYWt9aWYoZyE9PSEwKWlmKGcmJmFbXCJ0aHJvd3NcIl0pYj1nKGIpO2Vsc2UgdHJ5e2I9ZyhiKX1jYXRjaChsKXtyZXR1cm57c3RhdGU6XCJwYXJzZXJlcnJvclwiLGVycm9yOmc/bDpcIk5vIGNvbnZlcnNpb24gZnJvbSBcIitpK1wiIHRvIFwiK2Z9fX1yZXR1cm57c3RhdGU6XCJzdWNjZXNzXCIsZGF0YTpifX1yLmV4dGVuZCh7YWN0aXZlOjAsbGFzdE1vZGlmaWVkOnt9LGV0YWc6e30sYWpheFNldHRpbmdzOnt1cmw6dGIuaHJlZix0eXBlOlwiR0VUXCIsaXNMb2NhbDpGYi50ZXN0KHRiLnByb3RvY29sKSxnbG9iYWw6ITAscHJvY2Vzc0RhdGE6ITAsYXN5bmM6ITAsY29udGVudFR5cGU6XCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLThcIixhY2NlcHRzOntcIipcIjpLYix0ZXh0OlwidGV4dC9wbGFpblwiLGh0bWw6XCJ0ZXh0L2h0bWxcIix4bWw6XCJhcHBsaWNhdGlvbi94bWwsIHRleHQveG1sXCIsanNvbjpcImFwcGxpY2F0aW9uL2pzb24sIHRleHQvamF2YXNjcmlwdFwifSxjb250ZW50czp7eG1sOi9cXGJ4bWxcXGIvLGh0bWw6L1xcYmh0bWwvLGpzb246L1xcYmpzb25cXGIvfSxyZXNwb25zZUZpZWxkczp7eG1sOlwicmVzcG9uc2VYTUxcIix0ZXh0OlwicmVzcG9uc2VUZXh0XCIsanNvbjpcInJlc3BvbnNlSlNPTlwifSxjb252ZXJ0ZXJzOntcIiogdGV4dFwiOlN0cmluZyxcInRleHQgaHRtbFwiOiEwLFwidGV4dCBqc29uXCI6SlNPTi5wYXJzZSxcInRleHQgeG1sXCI6ci5wYXJzZVhNTH0sZmxhdE9wdGlvbnM6e3VybDohMCxjb250ZXh0OiEwfX0sYWpheFNldHVwOmZ1bmN0aW9uKGEsYil7cmV0dXJuIGI/T2IoT2IoYSxyLmFqYXhTZXR0aW5ncyksYik6T2Ioci5hamF4U2V0dGluZ3MsYSl9LGFqYXhQcmVmaWx0ZXI6TWIoSWIpLGFqYXhUcmFuc3BvcnQ6TWIoSmIpLGFqYXg6ZnVuY3Rpb24oYixjKXtcIm9iamVjdFwiPT10eXBlb2YgYiYmKGM9YixiPXZvaWQgMCksYz1jfHx7fTt2YXIgZSxmLGcsaCxpLGosayxsLG0sbixvPXIuYWpheFNldHVwKHt9LGMpLHA9by5jb250ZXh0fHxvLHE9by5jb250ZXh0JiYocC5ub2RlVHlwZXx8cC5qcXVlcnkpP3IocCk6ci5ldmVudCxzPXIuRGVmZXJyZWQoKSx0PXIuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIiksdT1vLnN0YXR1c0NvZGV8fHt9LHY9e30sdz17fSx4PVwiY2FuY2VsZWRcIix5PXtyZWFkeVN0YXRlOjAsZ2V0UmVzcG9uc2VIZWFkZXI6ZnVuY3Rpb24oYSl7dmFyIGI7aWYoayl7aWYoIWgpe2g9e307d2hpbGUoYj1FYi5leGVjKGcpKWhbYlsxXS50b0xvd2VyQ2FzZSgpXT1iWzJdfWI9aFthLnRvTG93ZXJDYXNlKCldfXJldHVybiBudWxsPT1iP251bGw6Yn0sZ2V0QWxsUmVzcG9uc2VIZWFkZXJzOmZ1bmN0aW9uKCl7cmV0dXJuIGs/ZzpudWxsfSxzZXRSZXF1ZXN0SGVhZGVyOmZ1bmN0aW9uKGEsYil7cmV0dXJuIG51bGw9PWsmJihhPXdbYS50b0xvd2VyQ2FzZSgpXT13W2EudG9Mb3dlckNhc2UoKV18fGEsdlthXT1iKSx0aGlzfSxvdmVycmlkZU1pbWVUeXBlOmZ1bmN0aW9uKGEpe3JldHVybiBudWxsPT1rJiYoby5taW1lVHlwZT1hKSx0aGlzfSxzdGF0dXNDb2RlOmZ1bmN0aW9uKGEpe3ZhciBiO2lmKGEpaWYoayl5LmFsd2F5cyhhW3kuc3RhdHVzXSk7ZWxzZSBmb3IoYiBpbiBhKXVbYl09W3VbYl0sYVtiXV07cmV0dXJuIHRoaXN9LGFib3J0OmZ1bmN0aW9uKGEpe3ZhciBiPWF8fHg7cmV0dXJuIGUmJmUuYWJvcnQoYiksQSgwLGIpLHRoaXN9fTtpZihzLnByb21pc2UoeSksby51cmw9KChifHxvLnVybHx8dGIuaHJlZikrXCJcIikucmVwbGFjZShIYix0Yi5wcm90b2NvbCtcIi8vXCIpLG8udHlwZT1jLm1ldGhvZHx8Yy50eXBlfHxvLm1ldGhvZHx8by50eXBlLG8uZGF0YVR5cGVzPShvLmRhdGFUeXBlfHxcIipcIikudG9Mb3dlckNhc2UoKS5tYXRjaChMKXx8W1wiXCJdLG51bGw9PW8uY3Jvc3NEb21haW4pe2o9ZC5jcmVhdGVFbGVtZW50KFwiYVwiKTt0cnl7ai5ocmVmPW8udXJsLGouaHJlZj1qLmhyZWYsby5jcm9zc0RvbWFpbj1MYi5wcm90b2NvbCtcIi8vXCIrTGIuaG9zdCE9ai5wcm90b2NvbCtcIi8vXCIrai5ob3N0fWNhdGNoKHope28uY3Jvc3NEb21haW49ITB9fWlmKG8uZGF0YSYmby5wcm9jZXNzRGF0YSYmXCJzdHJpbmdcIiE9dHlwZW9mIG8uZGF0YSYmKG8uZGF0YT1yLnBhcmFtKG8uZGF0YSxvLnRyYWRpdGlvbmFsKSksTmIoSWIsbyxjLHkpLGspcmV0dXJuIHk7bD1yLmV2ZW50JiZvLmdsb2JhbCxsJiYwPT09ci5hY3RpdmUrKyYmci5ldmVudC50cmlnZ2VyKFwiYWpheFN0YXJ0XCIpLG8udHlwZT1vLnR5cGUudG9VcHBlckNhc2UoKSxvLmhhc0NvbnRlbnQ9IUdiLnRlc3Qoby50eXBlKSxmPW8udXJsLnJlcGxhY2UoQ2IsXCJcIiksby5oYXNDb250ZW50P28uZGF0YSYmby5wcm9jZXNzRGF0YSYmMD09PShvLmNvbnRlbnRUeXBlfHxcIlwiKS5pbmRleE9mKFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpJiYoby5kYXRhPW8uZGF0YS5yZXBsYWNlKEJiLFwiK1wiKSk6KG49by51cmwuc2xpY2UoZi5sZW5ndGgpLG8uZGF0YSYmKGYrPSh2Yi50ZXN0KGYpP1wiJlwiOlwiP1wiKStvLmRhdGEsZGVsZXRlIG8uZGF0YSksby5jYWNoZT09PSExJiYoZj1mLnJlcGxhY2UoRGIsXCIkMVwiKSxuPSh2Yi50ZXN0KGYpP1wiJlwiOlwiP1wiKStcIl89XCIrdWIrKyArbiksby51cmw9ZituKSxvLmlmTW9kaWZpZWQmJihyLmxhc3RNb2RpZmllZFtmXSYmeS5zZXRSZXF1ZXN0SGVhZGVyKFwiSWYtTW9kaWZpZWQtU2luY2VcIixyLmxhc3RNb2RpZmllZFtmXSksci5ldGFnW2ZdJiZ5LnNldFJlcXVlc3RIZWFkZXIoXCJJZi1Ob25lLU1hdGNoXCIsci5ldGFnW2ZdKSksKG8uZGF0YSYmby5oYXNDb250ZW50JiZvLmNvbnRlbnRUeXBlIT09ITF8fGMuY29udGVudFR5cGUpJiZ5LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIixvLmNvbnRlbnRUeXBlKSx5LnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIixvLmRhdGFUeXBlc1swXSYmby5hY2NlcHRzW28uZGF0YVR5cGVzWzBdXT9vLmFjY2VwdHNbby5kYXRhVHlwZXNbMF1dKyhcIipcIiE9PW8uZGF0YVR5cGVzWzBdP1wiLCBcIitLYitcIjsgcT0wLjAxXCI6XCJcIik6by5hY2NlcHRzW1wiKlwiXSk7Zm9yKG0gaW4gby5oZWFkZXJzKXkuc2V0UmVxdWVzdEhlYWRlcihtLG8uaGVhZGVyc1ttXSk7aWYoby5iZWZvcmVTZW5kJiYoby5iZWZvcmVTZW5kLmNhbGwocCx5LG8pPT09ITF8fGspKXJldHVybiB5LmFib3J0KCk7aWYoeD1cImFib3J0XCIsdC5hZGQoby5jb21wbGV0ZSkseS5kb25lKG8uc3VjY2VzcykseS5mYWlsKG8uZXJyb3IpLGU9TmIoSmIsbyxjLHkpKXtpZih5LnJlYWR5U3RhdGU9MSxsJiZxLnRyaWdnZXIoXCJhamF4U2VuZFwiLFt5LG9dKSxrKXJldHVybiB5O28uYXN5bmMmJm8udGltZW91dD4wJiYoaT1hLnNldFRpbWVvdXQoZnVuY3Rpb24oKXt5LmFib3J0KFwidGltZW91dFwiKX0sby50aW1lb3V0KSk7dHJ5e2s9ITEsZS5zZW5kKHYsQSl9Y2F0Y2goeil7aWYoayl0aHJvdyB6O0EoLTEseil9fWVsc2UgQSgtMSxcIk5vIFRyYW5zcG9ydFwiKTtmdW5jdGlvbiBBKGIsYyxkLGgpe3ZhciBqLG0sbix2LHcseD1jO2t8fChrPSEwLGkmJmEuY2xlYXJUaW1lb3V0KGkpLGU9dm9pZCAwLGc9aHx8XCJcIix5LnJlYWR5U3RhdGU9Yj4wPzQ6MCxqPWI+PTIwMCYmYjwzMDB8fDMwND09PWIsZCYmKHY9UGIobyx5LGQpKSx2PVFiKG8sdix5LGopLGo/KG8uaWZNb2RpZmllZCYmKHc9eS5nZXRSZXNwb25zZUhlYWRlcihcIkxhc3QtTW9kaWZpZWRcIiksdyYmKHIubGFzdE1vZGlmaWVkW2ZdPXcpLHc9eS5nZXRSZXNwb25zZUhlYWRlcihcImV0YWdcIiksdyYmKHIuZXRhZ1tmXT13KSksMjA0PT09Ynx8XCJIRUFEXCI9PT1vLnR5cGU/eD1cIm5vY29udGVudFwiOjMwND09PWI/eD1cIm5vdG1vZGlmaWVkXCI6KHg9di5zdGF0ZSxtPXYuZGF0YSxuPXYuZXJyb3Isaj0hbikpOihuPXgsIWImJnh8fCh4PVwiZXJyb3JcIixiPDAmJihiPTApKSkseS5zdGF0dXM9Yix5LnN0YXR1c1RleHQ9KGN8fHgpK1wiXCIsaj9zLnJlc29sdmVXaXRoKHAsW20seCx5XSk6cy5yZWplY3RXaXRoKHAsW3kseCxuXSkseS5zdGF0dXNDb2RlKHUpLHU9dm9pZCAwLGwmJnEudHJpZ2dlcihqP1wiYWpheFN1Y2Nlc3NcIjpcImFqYXhFcnJvclwiLFt5LG8saj9tOm5dKSx0LmZpcmVXaXRoKHAsW3kseF0pLGwmJihxLnRyaWdnZXIoXCJhamF4Q29tcGxldGVcIixbeSxvXSksLS1yLmFjdGl2ZXx8ci5ldmVudC50cmlnZ2VyKFwiYWpheFN0b3BcIikpKX1yZXR1cm4geX0sZ2V0SlNPTjpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIHIuZ2V0KGEsYixjLFwianNvblwiKX0sZ2V0U2NyaXB0OmZ1bmN0aW9uKGEsYil7cmV0dXJuIHIuZ2V0KGEsdm9pZCAwLGIsXCJzY3JpcHRcIil9fSksci5lYWNoKFtcImdldFwiLFwicG9zdFwiXSxmdW5jdGlvbihhLGIpe3JbYl09ZnVuY3Rpb24oYSxjLGQsZSl7cmV0dXJuIHIuaXNGdW5jdGlvbihjKSYmKGU9ZXx8ZCxkPWMsYz12b2lkIDApLHIuYWpheChyLmV4dGVuZCh7dXJsOmEsdHlwZTpiLGRhdGFUeXBlOmUsZGF0YTpjLHN1Y2Nlc3M6ZH0sci5pc1BsYWluT2JqZWN0KGEpJiZhKSl9fSksci5fZXZhbFVybD1mdW5jdGlvbihhKXtyZXR1cm4gci5hamF4KHt1cmw6YSx0eXBlOlwiR0VUXCIsZGF0YVR5cGU6XCJzY3JpcHRcIixjYWNoZTohMCxhc3luYzohMSxnbG9iYWw6ITEsXCJ0aHJvd3NcIjohMH0pfSxyLmZuLmV4dGVuZCh7d3JhcEFsbDpmdW5jdGlvbihhKXt2YXIgYjtyZXR1cm4gdGhpc1swXSYmKHIuaXNGdW5jdGlvbihhKSYmKGE9YS5jYWxsKHRoaXNbMF0pKSxiPXIoYSx0aGlzWzBdLm93bmVyRG9jdW1lbnQpLmVxKDApLmNsb25lKCEwKSx0aGlzWzBdLnBhcmVudE5vZGUmJmIuaW5zZXJ0QmVmb3JlKHRoaXNbMF0pLGIubWFwKGZ1bmN0aW9uKCl7dmFyIGE9dGhpczt3aGlsZShhLmZpcnN0RWxlbWVudENoaWxkKWE9YS5maXJzdEVsZW1lbnRDaGlsZDtyZXR1cm4gYX0pLmFwcGVuZCh0aGlzKSksdGhpc30sd3JhcElubmVyOmZ1bmN0aW9uKGEpe3JldHVybiByLmlzRnVuY3Rpb24oYSk/dGhpcy5lYWNoKGZ1bmN0aW9uKGIpe3IodGhpcykud3JhcElubmVyKGEuY2FsbCh0aGlzLGIpKX0pOnRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBiPXIodGhpcyksYz1iLmNvbnRlbnRzKCk7Yy5sZW5ndGg/Yy53cmFwQWxsKGEpOmIuYXBwZW5kKGEpfSl9LHdyYXA6ZnVuY3Rpb24oYSl7dmFyIGI9ci5pc0Z1bmN0aW9uKGEpO3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oYyl7cih0aGlzKS53cmFwQWxsKGI/YS5jYWxsKHRoaXMsYyk6YSl9KX0sdW53cmFwOmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLnBhcmVudChhKS5ub3QoXCJib2R5XCIpLmVhY2goZnVuY3Rpb24oKXtyKHRoaXMpLnJlcGxhY2VXaXRoKHRoaXMuY2hpbGROb2Rlcyl9KSx0aGlzfX0pLHIuZXhwci5wc2V1ZG9zLmhpZGRlbj1mdW5jdGlvbihhKXtyZXR1cm4hci5leHByLnBzZXVkb3MudmlzaWJsZShhKX0sci5leHByLnBzZXVkb3MudmlzaWJsZT1mdW5jdGlvbihhKXtyZXR1cm4hIShhLm9mZnNldFdpZHRofHxhLm9mZnNldEhlaWdodHx8YS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCl9LHIuYWpheFNldHRpbmdzLnhocj1mdW5jdGlvbigpe3RyeXtyZXR1cm4gbmV3IGEuWE1MSHR0cFJlcXVlc3R9Y2F0Y2goYil7fX07dmFyIFJiPXswOjIwMCwxMjIzOjIwNH0sU2I9ci5hamF4U2V0dGluZ3MueGhyKCk7by5jb3JzPSEhU2ImJlwid2l0aENyZWRlbnRpYWxzXCJpbiBTYixvLmFqYXg9U2I9ISFTYixyLmFqYXhUcmFuc3BvcnQoZnVuY3Rpb24oYil7dmFyIGMsZDtpZihvLmNvcnN8fFNiJiYhYi5jcm9zc0RvbWFpbilyZXR1cm57c2VuZDpmdW5jdGlvbihlLGYpe3ZhciBnLGg9Yi54aHIoKTtpZihoLm9wZW4oYi50eXBlLGIudXJsLGIuYXN5bmMsYi51c2VybmFtZSxiLnBhc3N3b3JkKSxiLnhockZpZWxkcylmb3IoZyBpbiBiLnhockZpZWxkcyloW2ddPWIueGhyRmllbGRzW2ddO2IubWltZVR5cGUmJmgub3ZlcnJpZGVNaW1lVHlwZSYmaC5vdmVycmlkZU1pbWVUeXBlKGIubWltZVR5cGUpLGIuY3Jvc3NEb21haW58fGVbXCJYLVJlcXVlc3RlZC1XaXRoXCJdfHwoZVtcIlgtUmVxdWVzdGVkLVdpdGhcIl09XCJYTUxIdHRwUmVxdWVzdFwiKTtmb3IoZyBpbiBlKWguc2V0UmVxdWVzdEhlYWRlcihnLGVbZ10pO2M9ZnVuY3Rpb24oYSl7cmV0dXJuIGZ1bmN0aW9uKCl7YyYmKGM9ZD1oLm9ubG9hZD1oLm9uZXJyb3I9aC5vbmFib3J0PWgub25yZWFkeXN0YXRlY2hhbmdlPW51bGwsXCJhYm9ydFwiPT09YT9oLmFib3J0KCk6XCJlcnJvclwiPT09YT9cIm51bWJlclwiIT10eXBlb2YgaC5zdGF0dXM/ZigwLFwiZXJyb3JcIik6ZihoLnN0YXR1cyxoLnN0YXR1c1RleHQpOmYoUmJbaC5zdGF0dXNdfHxoLnN0YXR1cyxoLnN0YXR1c1RleHQsXCJ0ZXh0XCIhPT0oaC5yZXNwb25zZVR5cGV8fFwidGV4dFwiKXx8XCJzdHJpbmdcIiE9dHlwZW9mIGgucmVzcG9uc2VUZXh0P3tiaW5hcnk6aC5yZXNwb25zZX06e3RleHQ6aC5yZXNwb25zZVRleHR9LGguZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpKX19LGgub25sb2FkPWMoKSxkPWgub25lcnJvcj1jKFwiZXJyb3JcIiksdm9pZCAwIT09aC5vbmFib3J0P2gub25hYm9ydD1kOmgub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7ND09PWgucmVhZHlTdGF0ZSYmYS5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YyYmZCgpfSl9LGM9YyhcImFib3J0XCIpO3RyeXtoLnNlbmQoYi5oYXNDb250ZW50JiZiLmRhdGF8fG51bGwpfWNhdGNoKGkpe2lmKGMpdGhyb3cgaX19LGFib3J0OmZ1bmN0aW9uKCl7YyYmYygpfX19KSxyLmFqYXhQcmVmaWx0ZXIoZnVuY3Rpb24oYSl7YS5jcm9zc0RvbWFpbiYmKGEuY29udGVudHMuc2NyaXB0PSExKX0pLHIuYWpheFNldHVwKHthY2NlcHRzOntzY3JpcHQ6XCJ0ZXh0L2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2VjbWFzY3JpcHQsIGFwcGxpY2F0aW9uL3gtZWNtYXNjcmlwdFwifSxjb250ZW50czp7c2NyaXB0Oi9cXGIoPzpqYXZhfGVjbWEpc2NyaXB0XFxiL30sY29udmVydGVyczp7XCJ0ZXh0IHNjcmlwdFwiOmZ1bmN0aW9uKGEpe3JldHVybiByLmdsb2JhbEV2YWwoYSksYX19fSksci5hamF4UHJlZmlsdGVyKFwic2NyaXB0XCIsZnVuY3Rpb24oYSl7dm9pZCAwPT09YS5jYWNoZSYmKGEuY2FjaGU9ITEpLGEuY3Jvc3NEb21haW4mJihhLnR5cGU9XCJHRVRcIil9KSxyLmFqYXhUcmFuc3BvcnQoXCJzY3JpcHRcIixmdW5jdGlvbihhKXtpZihhLmNyb3NzRG9tYWluKXt2YXIgYixjO3JldHVybntzZW5kOmZ1bmN0aW9uKGUsZil7Yj1yKFwiPHNjcmlwdD5cIikucHJvcCh7Y2hhcnNldDphLnNjcmlwdENoYXJzZXQsc3JjOmEudXJsfSkub24oXCJsb2FkIGVycm9yXCIsYz1mdW5jdGlvbihhKXtiLnJlbW92ZSgpLGM9bnVsbCxhJiZmKFwiZXJyb3JcIj09PWEudHlwZT80MDQ6MjAwLGEudHlwZSl9KSxkLmhlYWQuYXBwZW5kQ2hpbGQoYlswXSl9LGFib3J0OmZ1bmN0aW9uKCl7YyYmYygpfX19fSk7dmFyIFRiPVtdLFViPS8oPSlcXD8oPz0mfCQpfFxcP1xcPy87ci5hamF4U2V0dXAoe2pzb25wOlwiY2FsbGJhY2tcIixqc29ucENhbGxiYWNrOmZ1bmN0aW9uKCl7dmFyIGE9VGIucG9wKCl8fHIuZXhwYW5kbytcIl9cIit1YisrO3JldHVybiB0aGlzW2FdPSEwLGF9fSksci5hamF4UHJlZmlsdGVyKFwianNvbiBqc29ucFwiLGZ1bmN0aW9uKGIsYyxkKXt2YXIgZSxmLGcsaD1iLmpzb25wIT09ITEmJihVYi50ZXN0KGIudXJsKT9cInVybFwiOlwic3RyaW5nXCI9PXR5cGVvZiBiLmRhdGEmJjA9PT0oYi5jb250ZW50VHlwZXx8XCJcIikuaW5kZXhPZihcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKSYmVWIudGVzdChiLmRhdGEpJiZcImRhdGFcIik7aWYoaHx8XCJqc29ucFwiPT09Yi5kYXRhVHlwZXNbMF0pcmV0dXJuIGU9Yi5qc29ucENhbGxiYWNrPXIuaXNGdW5jdGlvbihiLmpzb25wQ2FsbGJhY2spP2IuanNvbnBDYWxsYmFjaygpOmIuanNvbnBDYWxsYmFjayxoP2JbaF09YltoXS5yZXBsYWNlKFViLFwiJDFcIitlKTpiLmpzb25wIT09ITEmJihiLnVybCs9KHZiLnRlc3QoYi51cmwpP1wiJlwiOlwiP1wiKStiLmpzb25wK1wiPVwiK2UpLGIuY29udmVydGVyc1tcInNjcmlwdCBqc29uXCJdPWZ1bmN0aW9uKCl7cmV0dXJuIGd8fHIuZXJyb3IoZStcIiB3YXMgbm90IGNhbGxlZFwiKSxnWzBdfSxiLmRhdGFUeXBlc1swXT1cImpzb25cIixmPWFbZV0sYVtlXT1mdW5jdGlvbigpe2c9YXJndW1lbnRzfSxkLmFsd2F5cyhmdW5jdGlvbigpe3ZvaWQgMD09PWY/cihhKS5yZW1vdmVQcm9wKGUpOmFbZV09ZixiW2VdJiYoYi5qc29ucENhbGxiYWNrPWMuanNvbnBDYWxsYmFjayxUYi5wdXNoKGUpKSxnJiZyLmlzRnVuY3Rpb24oZikmJmYoZ1swXSksZz1mPXZvaWQgMH0pLFwic2NyaXB0XCJ9KSxvLmNyZWF0ZUhUTUxEb2N1bWVudD1mdW5jdGlvbigpe3ZhciBhPWQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KFwiXCIpLmJvZHk7cmV0dXJuIGEuaW5uZXJIVE1MPVwiPGZvcm0+PC9mb3JtPjxmb3JtPjwvZm9ybT5cIiwyPT09YS5jaGlsZE5vZGVzLmxlbmd0aH0oKSxyLnBhcnNlSFRNTD1mdW5jdGlvbihhLGIsYyl7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGEpcmV0dXJuW107XCJib29sZWFuXCI9PXR5cGVvZiBiJiYoYz1iLGI9ITEpO3ZhciBlLGYsZztyZXR1cm4gYnx8KG8uY3JlYXRlSFRNTERvY3VtZW50PyhiPWQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KFwiXCIpLGU9Yi5jcmVhdGVFbGVtZW50KFwiYmFzZVwiKSxlLmhyZWY9ZC5sb2NhdGlvbi5ocmVmLGIuaGVhZC5hcHBlbmRDaGlsZChlKSk6Yj1kKSxmPUMuZXhlYyhhKSxnPSFjJiZbXSxmP1tiLmNyZWF0ZUVsZW1lbnQoZlsxXSldOihmPXFhKFthXSxiLGcpLGcmJmcubGVuZ3RoJiZyKGcpLnJlbW92ZSgpLHIubWVyZ2UoW10sZi5jaGlsZE5vZGVzKSl9LHIuZm4ubG9hZD1mdW5jdGlvbihhLGIsYyl7dmFyIGQsZSxmLGc9dGhpcyxoPWEuaW5kZXhPZihcIiBcIik7cmV0dXJuIGg+LTEmJihkPXBiKGEuc2xpY2UoaCkpLGE9YS5zbGljZSgwLGgpKSxyLmlzRnVuY3Rpb24oYik/KGM9YixiPXZvaWQgMCk6YiYmXCJvYmplY3RcIj09dHlwZW9mIGImJihlPVwiUE9TVFwiKSxnLmxlbmd0aD4wJiZyLmFqYXgoe3VybDphLHR5cGU6ZXx8XCJHRVRcIixkYXRhVHlwZTpcImh0bWxcIixkYXRhOmJ9KS5kb25lKGZ1bmN0aW9uKGEpe2Y9YXJndW1lbnRzLGcuaHRtbChkP3IoXCI8ZGl2PlwiKS5hcHBlbmQoci5wYXJzZUhUTUwoYSkpLmZpbmQoZCk6YSl9KS5hbHdheXMoYyYmZnVuY3Rpb24oYSxiKXtnLmVhY2goZnVuY3Rpb24oKXtjLmFwcGx5KHRoaXMsZnx8W2EucmVzcG9uc2VUZXh0LGIsYV0pfSl9KSx0aGlzfSxyLmVhY2goW1wiYWpheFN0YXJ0XCIsXCJhamF4U3RvcFwiLFwiYWpheENvbXBsZXRlXCIsXCJhamF4RXJyb3JcIixcImFqYXhTdWNjZXNzXCIsXCJhamF4U2VuZFwiXSxmdW5jdGlvbihhLGIpe3IuZm5bYl09ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMub24oYixhKX19KSxyLmV4cHIucHNldWRvcy5hbmltYXRlZD1mdW5jdGlvbihhKXtyZXR1cm4gci5ncmVwKHIudGltZXJzLGZ1bmN0aW9uKGIpe3JldHVybiBhPT09Yi5lbGVtfSkubGVuZ3RofSxyLm9mZnNldD17c2V0T2Zmc2V0OmZ1bmN0aW9uKGEsYixjKXt2YXIgZCxlLGYsZyxoLGksaixrPXIuY3NzKGEsXCJwb3NpdGlvblwiKSxsPXIoYSksbT17fTtcInN0YXRpY1wiPT09ayYmKGEuc3R5bGUucG9zaXRpb249XCJyZWxhdGl2ZVwiKSxoPWwub2Zmc2V0KCksZj1yLmNzcyhhLFwidG9wXCIpLGk9ci5jc3MoYSxcImxlZnRcIiksaj0oXCJhYnNvbHV0ZVwiPT09a3x8XCJmaXhlZFwiPT09aykmJihmK2kpLmluZGV4T2YoXCJhdXRvXCIpPi0xLGo/KGQ9bC5wb3NpdGlvbigpLGc9ZC50b3AsZT1kLmxlZnQpOihnPXBhcnNlRmxvYXQoZil8fDAsZT1wYXJzZUZsb2F0KGkpfHwwKSxyLmlzRnVuY3Rpb24oYikmJihiPWIuY2FsbChhLGMsci5leHRlbmQoe30saCkpKSxudWxsIT1iLnRvcCYmKG0udG9wPWIudG9wLWgudG9wK2cpLG51bGwhPWIubGVmdCYmKG0ubGVmdD1iLmxlZnQtaC5sZWZ0K2UpLFwidXNpbmdcImluIGI/Yi51c2luZy5jYWxsKGEsbSk6bC5jc3MobSl9fSxyLmZuLmV4dGVuZCh7b2Zmc2V0OmZ1bmN0aW9uKGEpe2lmKGFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIHZvaWQgMD09PWE/dGhpczp0aGlzLmVhY2goZnVuY3Rpb24oYil7ci5vZmZzZXQuc2V0T2Zmc2V0KHRoaXMsYSxiKX0pO3ZhciBiLGMsZCxlLGY9dGhpc1swXTtpZihmKXJldHVybiBmLmdldENsaWVudFJlY3RzKCkubGVuZ3RoPyhkPWYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksYj1mLm93bmVyRG9jdW1lbnQsYz1iLmRvY3VtZW50RWxlbWVudCxlPWIuZGVmYXVsdFZpZXcse3RvcDpkLnRvcCtlLnBhZ2VZT2Zmc2V0LWMuY2xpZW50VG9wLGxlZnQ6ZC5sZWZ0K2UucGFnZVhPZmZzZXQtYy5jbGllbnRMZWZ0fSk6e3RvcDowLGxlZnQ6MH19LHBvc2l0aW9uOmZ1bmN0aW9uKCl7aWYodGhpc1swXSl7dmFyIGEsYixjPXRoaXNbMF0sZD17dG9wOjAsbGVmdDowfTtyZXR1cm5cImZpeGVkXCI9PT1yLmNzcyhjLFwicG9zaXRpb25cIik/Yj1jLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOihhPXRoaXMub2Zmc2V0UGFyZW50KCksYj10aGlzLm9mZnNldCgpLEIoYVswXSxcImh0bWxcIil8fChkPWEub2Zmc2V0KCkpLGQ9e3RvcDpkLnRvcCtyLmNzcyhhWzBdLFwiYm9yZGVyVG9wV2lkdGhcIiwhMCksbGVmdDpkLmxlZnQrci5jc3MoYVswXSxcImJvcmRlckxlZnRXaWR0aFwiLCEwKX0pLHt0b3A6Yi50b3AtZC50b3Atci5jc3MoYyxcIm1hcmdpblRvcFwiLCEwKSxsZWZ0OmIubGVmdC1kLmxlZnQtci5jc3MoYyxcIm1hcmdpbkxlZnRcIiwhMCl9fX0sb2Zmc2V0UGFyZW50OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5vZmZzZXRQYXJlbnQ7d2hpbGUoYSYmXCJzdGF0aWNcIj09PXIuY3NzKGEsXCJwb3NpdGlvblwiKSlhPWEub2Zmc2V0UGFyZW50O3JldHVybiBhfHxyYX0pfX0pLHIuZWFjaCh7c2Nyb2xsTGVmdDpcInBhZ2VYT2Zmc2V0XCIsc2Nyb2xsVG9wOlwicGFnZVlPZmZzZXRcIn0sZnVuY3Rpb24oYSxiKXt2YXIgYz1cInBhZ2VZT2Zmc2V0XCI9PT1iO3IuZm5bYV09ZnVuY3Rpb24oZCl7cmV0dXJuIFQodGhpcyxmdW5jdGlvbihhLGQsZSl7dmFyIGY7cmV0dXJuIHIuaXNXaW5kb3coYSk/Zj1hOjk9PT1hLm5vZGVUeXBlJiYoZj1hLmRlZmF1bHRWaWV3KSx2b2lkIDA9PT1lP2Y/ZltiXTphW2RdOnZvaWQoZj9mLnNjcm9sbFRvKGM/Zi5wYWdlWE9mZnNldDplLGM/ZTpmLnBhZ2VZT2Zmc2V0KTphW2RdPWUpfSxhLGQsYXJndW1lbnRzLmxlbmd0aCl9fSksci5lYWNoKFtcInRvcFwiLFwibGVmdFwiXSxmdW5jdGlvbihhLGIpe3IuY3NzSG9va3NbYl09UGEoby5waXhlbFBvc2l0aW9uLGZ1bmN0aW9uKGEsYyl7aWYoYylyZXR1cm4gYz1PYShhLGIpLE1hLnRlc3QoYyk/cihhKS5wb3NpdGlvbigpW2JdK1wicHhcIjpjfSl9KSxyLmVhY2goe0hlaWdodDpcImhlaWdodFwiLFdpZHRoOlwid2lkdGhcIn0sZnVuY3Rpb24oYSxiKXtyLmVhY2goe3BhZGRpbmc6XCJpbm5lclwiK2EsY29udGVudDpiLFwiXCI6XCJvdXRlclwiK2F9LGZ1bmN0aW9uKGMsZCl7ci5mbltkXT1mdW5jdGlvbihlLGYpe3ZhciBnPWFyZ3VtZW50cy5sZW5ndGgmJihjfHxcImJvb2xlYW5cIiE9dHlwZW9mIGUpLGg9Y3x8KGU9PT0hMHx8Zj09PSEwP1wibWFyZ2luXCI6XCJib3JkZXJcIik7cmV0dXJuIFQodGhpcyxmdW5jdGlvbihiLGMsZSl7dmFyIGY7cmV0dXJuIHIuaXNXaW5kb3coYik/MD09PWQuaW5kZXhPZihcIm91dGVyXCIpP2JbXCJpbm5lclwiK2FdOmIuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50W1wiY2xpZW50XCIrYV06OT09PWIubm9kZVR5cGU/KGY9Yi5kb2N1bWVudEVsZW1lbnQsTWF0aC5tYXgoYi5ib2R5W1wic2Nyb2xsXCIrYV0sZltcInNjcm9sbFwiK2FdLGIuYm9keVtcIm9mZnNldFwiK2FdLGZbXCJvZmZzZXRcIithXSxmW1wiY2xpZW50XCIrYV0pKTp2b2lkIDA9PT1lP3IuY3NzKGIsYyxoKTpyLnN0eWxlKGIsYyxlLGgpfSxiLGc/ZTp2b2lkIDAsZyl9fSl9KSxyLmZuLmV4dGVuZCh7YmluZDpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIHRoaXMub24oYSxudWxsLGIsYyl9LHVuYmluZDpmdW5jdGlvbihhLGIpe3JldHVybiB0aGlzLm9mZihhLG51bGwsYil9LGRlbGVnYXRlOmZ1bmN0aW9uKGEsYixjLGQpe3JldHVybiB0aGlzLm9uKGIsYSxjLGQpfSx1bmRlbGVnYXRlOmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gMT09PWFyZ3VtZW50cy5sZW5ndGg/dGhpcy5vZmYoYSxcIioqXCIpOnRoaXMub2ZmKGIsYXx8XCIqKlwiLGMpfX0pLHIuaG9sZFJlYWR5PWZ1bmN0aW9uKGEpe2E/ci5yZWFkeVdhaXQrKzpyLnJlYWR5KCEwKX0sci5pc0FycmF5PUFycmF5LmlzQXJyYXksci5wYXJzZUpTT049SlNPTi5wYXJzZSxyLm5vZGVOYW1lPUIsXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kJiZkZWZpbmUoXCJqcXVlcnlcIixbXSxmdW5jdGlvbigpe3JldHVybiByfSk7dmFyIFZiPWEualF1ZXJ5LFdiPWEuJDtyZXR1cm4gci5ub0NvbmZsaWN0PWZ1bmN0aW9uKGIpe3JldHVybiBhLiQ9PT1yJiYoYS4kPVdiKSxiJiZhLmpRdWVyeT09PXImJihhLmpRdWVyeT1WYikscn0sYnx8KGEualF1ZXJ5PWEuJD1yKSxyfSk7XHJcbiJdfQ==
