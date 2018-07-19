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
				var _node = (0, _selectors.getParentOrSelf)(event.target);
				if (!isPreview && !$('#attribute-settings').hasClass('active')) {
					$('#attribute-settings').addClass('active').siblings().removeClass('active');
					$('#left-panel').hide();
					$('#right-panel').show();
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

},{"./components/common":139,"./inputs/inputs":171,"./util/calendar":178,"./util/dom":179,"./util/download":180,"./util/fullScreen":182,"./util/htmlGenerator":183,"./util/jsoup":184,"./util/selectors":185}],184:[function(require,module,exports){
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
    return "\n        var gridOptionsIdentifier = window['gridOptions' + $('[" + _common.dataTableId + "]').attr('" + _common.dataTableId + "')];\n        function " + functionName + "(el, formId) {\n            $.ajax({\n                url: config.fundodooApiDomainUrl + $(el).attr('data-url'),\n                dataType: 'json',\n                method : 'POST',\n                data: (formId ? $('#formId') : $('form')).serializeJSON(),\n                fundodooAjax: true, //true:\u5F00\u542F\u8BA1\u65F6\u529F\u80FD\uFF0Cfalse\uFF08\u6216\u53BB\u6389\u6B64\u5C5E\u6027\uFF09\uFF1A\u4E0D\u5F00\u542F\u8BA1\u65F6\u529F\u80FD\n                success: function (rs, status, xhr) {\n                    if (rs.code == 200) {\n                        gridOptionsIdentifier.api.setRowData(rs.data);\n                    }\n                }\n            });\n        }\n    ";
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
    return "\n        function generateOptions(el, response) {\n            var value = $(el).attr('" + _common.dataValueMapping + "') || 'value';\n            var text = $(el).attr('" + _common.dataTextMapping + "') || 'text';\n            response.forEach(function (option) {\n                $('<option></option>')\n                    .val(option[value])\n                    .text(option[text])\n                    .appendTo($(el));\n            });\n        }\n        Array.from($('body').find('" + _selectors.autoselectinputSelector + "'))\n            .filter(function (el) {\n                return $(el).attr('" + _common.dataUrl + "');\n            }).forEach(function (el) {\n                $.ajax({\n                    url: config.fundodooApiDomainUrl + $(el).attr('" + _common.dataUrl + "'),\n                    success: function (response) {\n                        if (response.code == 200) {\n                            generateOptions(el, response.data);\n                        }\n                    }\n                });\n            });\n    ";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGRlci5qcyIsInNyYy91dGlsL2pzb3VwLmpzIiwic3JjL3V0aWwvdW51c2VkVGFncy5qcyIsInNyYy91dGlsL3N1Ym1pdGJ1dHRvbi5qcyIsInNyYy90ZW1wbGF0ZXMvdGFibGUuanMiLCJzcmMvdGVtcGxhdGVzL3N1Ym1pdGZvcm0uanMiLCJzcmMvdGVtcGxhdGVzL2F1dG9zZWxlY3RpbnB1dC5qcyIsInNyYy91dGlsL3NlbGVjdG9ycy5qcyIsInNyYy9jb21wb25lbnRzL0BvZWUvdGFibGUuanMiLCJzcmMvdXRpbC9odG1sR2VuZXJhdG9yLmpzIiwic3JjL3V0aWwvZnVsbFNjcmVlbi5qcyIsInNyYy91dGlsL2Rvd25sb2FkLmpzIiwic3JjL3V0aWwvZG9tLmpzIiwic3JjL3V0aWwvY2FsZW5kYXIuanMiLCJzcmMvaW5wdXRzL2lucHV0cy5qcyIsInNyYy9pbnB1dHMvVmFsdWVUZXh0SW5wdXQuanMiLCJzcmMvaW5wdXRzL1RvZ2dsZUlucHV0LmpzIiwic3JjL2lucHV0cy9UZXh0VmFsdWVJbnB1dC5qcyIsInNyYy9pbnB1dHMvU2VsZWN0SW5wdXQuanMiLCJzcmMvaW5wdXRzL1NlY3Rpb25JbnB1dC5qcyIsInNyYy9pbnB1dHMvUmFuZ2VJbnB1dC5qcyIsInNyYy9pbnB1dHMvUmFkaW9CdXR0b25JbnB1dC5qcyIsInNyYy9pbnB1dHMvUmFkaW9JbnB1dC5qcyIsInNyYy9pbnB1dHMvUHJvZHVjdHNJbnB1dC5qcyIsInNyYy9pbnB1dHMvTnVtYmVySW5wdXQuanMiLCJzcmMvaW5wdXRzL0xpc3RJbnB1dC5qcyIsInNyYy9pbnB1dHMvTGlua0lucHV0LmpzIiwic3JjL2lucHV0cy9HcmlkTGF5b3V0SW5wdXQuanMiLCJzcmMvaW5wdXRzL0dyaWRJbnB1dC5qcyIsInNyYy9pbnB1dHMvRmlsZVVwbG9hZElucHV0LmpzIiwic3JjL2lucHV0cy9UZXh0SW5wdXQuanMiLCJzcmMvaW5wdXRzL0Nzc1VuaXRJbnB1dC5qcyIsInNyYy9pbnB1dHMvQ29sb3JJbnB1dC5qcyIsInNyYy9pbnB1dHMvQ2hlY2tib3hJbnB1dC5qcyIsInNyYy9pbnB1dHMvQnV0dG9uSW5wdXQuanMiLCJzcmMvaW5wdXRzL0lucHV0LmpzIiwic3JjL2NvbXBvbmVudHMvY29tbW9uLmpzIiwianMvanF1ZXJ5Lm1pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNBQTs7QUFDQTs7QUFJQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsQ0FBQyxZQUFZO0FBQ1osS0FBSSxRQUFRLEVBQVo7O0FBRUEsTUFBSyxJQUFMLEdBQVksU0FBUyxJQUFULENBQWMsR0FBZCxFQUFtQixJQUFuQixFQUF5QjtBQUNwQztBQUNBO0FBQ0EsTUFBSSxLQUFLLGtCQUFrQixJQUFsQixDQUF1QixHQUF2QixJQUNSLE1BQU0sR0FBTixJQUFhLE1BQU0sR0FBTixLQUNiLEtBQUssU0FBUyxjQUFULENBQXdCLEdBQXhCLEVBQTZCLFNBQWxDLENBRlE7O0FBSVI7QUFDQTtBQUNBLE1BQUksUUFBSixDQUFhLEtBQWIsRUFDQzs7QUFFQTtBQUNBLHNCQUhBOztBQUtBO0FBQ0EsTUFDRSxPQURGLENBQ1UsV0FEVixFQUN1QixHQUR2QixFQUVFLEtBRkYsQ0FFUSxJQUZSLEVBRWMsSUFGZCxDQUVtQixJQUZuQixFQUdFLE9BSEYsQ0FHVSxrQkFIVixFQUc4QixNQUg5QixFQUlFLE9BSkYsQ0FJVSxhQUpWLEVBSXlCLFFBSnpCLEVBS0UsS0FMRixDQUtRLElBTFIsRUFLYyxJQUxkLENBS21CLEtBTG5CLEVBTUUsS0FORixDQU1RLElBTlIsRUFNYyxJQU5kLENBTW1CLFVBTm5CLEVBT0UsS0FQRixDQU9RLElBUFIsRUFPYyxJQVBkLENBT21CLEtBUG5CLENBTkEsR0FjRSx3QkFmSCxDQU5EO0FBc0JBO0FBQ0EsU0FBTyxPQUFPLEdBQUcsSUFBSCxDQUFQLEdBQWtCLEVBQXpCO0FBQ0EsRUEzQkQ7QUE0QkEsQ0EvQkQ7O0FBaUNBLElBQUksUUFBUyxZQUFZO0FBQ3hCLEtBQUksUUFBUSxDQUFaO0FBQ0EsUUFBTyxVQUFVLFFBQVYsRUFBb0IsRUFBcEIsRUFBd0I7QUFDOUIsZUFBYSxLQUFiO0FBQ0EsVUFBUSxXQUFXLFFBQVgsRUFBcUIsRUFBckIsQ0FBUjtBQUNBLEVBSEQ7QUFJQSxDQU5XLEVBQVo7O0FBUUEsSUFBSSxVQUFVLFNBQWQsRUFBeUIsSUFBSSxRQUFRLEVBQVo7O0FBRXpCLE1BQU0sZ0JBQU4sR0FBeUIsT0FBekI7QUFDQSxNQUFNLHdCQUFOLEdBQWlDLElBQWpDOztBQUVBLE1BQU0sT0FBTixHQUFnQixTQUFTLGFBQVQsR0FBeUIsU0FBUyxhQUFULENBQXVCLEdBQXZCLENBQTJCLE9BQTNCLENBQW1DLGNBQW5DLEVBQW1ELEVBQW5ELENBQXpCLEdBQWtGLEVBQWxHOztBQUVBLE1BQU0sZUFBTixHQUF3QixFQUF4Qjs7QUFFQSxNQUFNLFVBQU4sR0FBbUI7QUFDbEIsY0FBYSxFQURLOztBQUdsQixlQUFjLEVBSEk7O0FBS2xCLG9CQUFtQixFQUxEOztBQU9sQixpQkFBZ0IsRUFQRTs7QUFTbEIsc0JBQXFCLEVBVEg7O0FBV2xCLE9BQU0sY0FBVSxHQUFWLEVBQWUsQ0FDcEIsQ0FaaUI7O0FBY2xCLE1BQUssYUFBVSxJQUFWLEVBQWdCO0FBQ3BCLFNBQU8sS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQVA7QUFDQSxFQWhCaUI7O0FBa0JsQixNQUFLLGFBQVUsSUFBVixFQUFnQixJQUFoQixFQUFzQjtBQUFBOztBQUMxQixPQUFLLElBQUwsR0FBWSxJQUFaOztBQUVBLE9BQUssV0FBTCxDQUFpQixJQUFqQixJQUF5QixJQUF6Qjs7QUFFQSxNQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNmLFFBQUssSUFBSSxDQUFULElBQWMsS0FBSyxLQUFuQixFQUEwQjtBQUN6QixTQUFLLFlBQUwsQ0FBa0IsS0FBSyxLQUFMLENBQVcsQ0FBWCxDQUFsQixJQUFtQyxJQUFuQztBQUNBO0FBQ0Q7O0FBRUQsTUFBSSxLQUFLLFVBQVQsRUFBcUI7QUFDcEIsT0FBSSxLQUFLLFVBQUwsQ0FBZ0IsV0FBaEIsS0FBZ0MsS0FBcEMsRUFBMkM7QUFDMUMsU0FBSyxJQUFJLENBQVQsSUFBYyxLQUFLLFVBQW5CLEVBQStCO0FBQzlCLFVBQUssaUJBQUwsQ0FBdUIsS0FBSyxVQUFMLENBQWdCLENBQWhCLENBQXZCLElBQTZDLElBQTdDO0FBQ0E7QUFDRCxJQUpELE1BSU87QUFDTixTQUFLLElBQUksQ0FBVCxJQUFjLEtBQUssVUFBbkIsRUFBK0I7QUFDOUIsU0FBSSxPQUFPLEtBQUssaUJBQUwsQ0FBdUIsQ0FBdkIsQ0FBUCxLQUFxQyxXQUF6QyxFQUFzRDtBQUNyRCxXQUFLLGlCQUFMLENBQXVCLENBQXZCLElBQTRCLEVBQTVCO0FBQ0E7O0FBRUQsU0FBSSxLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUIsV0FBbkIsS0FBbUMsS0FBdkMsRUFBOEM7QUFDN0M7QUFDQSxXQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUIsT0FBbkIsQ0FBMkIsaUJBQVM7QUFDbkMsYUFBSyxpQkFBTCxDQUF1QixDQUF2QixFQUEwQixLQUExQixJQUFtQyxJQUFuQztBQUNBLE9BRkQ7QUFHQSxNQUxELE1BS087QUFDTixXQUFLLGlCQUFMLENBQXVCLENBQXZCLEVBQTBCLEtBQUssVUFBTCxDQUFnQixDQUFoQixDQUExQixJQUFnRCxJQUFoRDtBQUNBO0FBQ0Q7QUFDRDtBQUNEOztBQUVELE1BQUksS0FBSyxPQUFULEVBQWtCO0FBQ2pCLFFBQUssSUFBSSxDQUFULElBQWMsS0FBSyxPQUFuQixFQUE0QjtBQUMzQixTQUFLLGNBQUwsQ0FBb0IsS0FBSyxPQUFMLENBQWEsQ0FBYixDQUFwQixJQUF1QyxJQUF2QztBQUNBO0FBQ0Q7O0FBRUQsTUFBSSxLQUFLLFlBQVQsRUFBdUI7QUFDdEIsUUFBSyxJQUFJLENBQVQsSUFBYyxLQUFLLFlBQW5CLEVBQWlDO0FBQ2hDLFNBQUssbUJBQUwsQ0FBeUIsS0FBSyxZQUFMLENBQWtCLENBQWxCLENBQXpCLElBQWlELElBQWpEO0FBQ0E7QUFDRDtBQUNELEVBL0RpQjs7QUFpRWxCLFNBQVEsZ0JBQVUsV0FBVixFQUF1QixJQUF2QixFQUE2QixJQUE3QixFQUFtQzs7QUFFMUMsWUFBVSxJQUFWOztBQUVBLE1BQUksY0FBYyxLQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBbEIsRUFBaUQ7QUFDaEQsYUFBVSxFQUFFLE1BQUYsQ0FBUyxJQUFULEVBQWUsRUFBZixFQUFtQixXQUFuQixFQUFnQyxJQUFoQyxDQUFWO0FBQ0EsV0FBUSxVQUFSLEdBQXFCLEVBQUUsS0FBRixDQUFRLEVBQUUsS0FBRixDQUFRLEVBQVIsRUFBWSxZQUFZLFVBQVosR0FBeUIsWUFBWSxVQUFyQyxHQUFrRCxFQUE5RCxDQUFSLEVBQTJFLEtBQUssVUFBTCxHQUFrQixLQUFLLFVBQXZCLEdBQW9DLEVBQS9HLENBQXJCO0FBQ0E7O0FBRUQ7QUFDQSxVQUFRLFVBQVIsQ0FBbUIsSUFBbkIsQ0FBd0IsVUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQjtBQUN2QyxPQUFJLE9BQU8sRUFBRSxJQUFULEtBQWtCLFdBQXRCLEVBQW1DLEVBQUUsSUFBRixHQUFTLENBQVQ7QUFDbkMsT0FBSSxPQUFPLEVBQUUsSUFBVCxLQUFrQixXQUF0QixFQUFtQyxFQUFFLElBQUYsR0FBUyxDQUFUOztBQUVuQyxPQUFJLEVBQUUsSUFBRixHQUFTLEVBQUUsSUFBZixFQUNDLE9BQU8sQ0FBQyxDQUFSO0FBQ0QsT0FBSSxFQUFFLElBQUYsR0FBUyxFQUFFLElBQWYsRUFDQyxPQUFPLENBQVA7QUFDRCxVQUFPLENBQVA7QUFDQSxHQVREOztBQVlBLE9BQUssR0FBTCxDQUFTLElBQVQsRUFBZSxPQUFmO0FBQ0EsRUF4RmlCOztBQTJGbEIsWUFBVyxtQkFBVSxJQUFWLEVBQWdCO0FBQzFCLE1BQUksRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLHVCQUFiLEtBQWlDLEtBQUssV0FBTCxDQUFpQixFQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsdUJBQWIsQ0FBakIsQ0FBckMsRUFBc0Y7QUFDckYsVUFBTyxLQUFLLFdBQUwsQ0FBaUIsRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLHVCQUFiLENBQWpCLENBQVA7QUFDQSxHQUZELE1BRU8sSUFBSSxFQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsTUFBYixLQUF3QixPQUF4QixJQUFtQyxFQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsTUFBYixLQUF3QixVQUEvRCxFQUEyRTtBQUNqRixPQUFNLFVBQVUsRUFBRSxJQUFGLEVBQVEsTUFBUixFQUFoQjtBQUNBLE9BQUksUUFBUSxJQUFSLENBQWEsdUJBQWIsS0FBaUMsS0FBSyxXQUFMLENBQWlCLFFBQVEsSUFBUixDQUFhLHVCQUFiLENBQWpCLENBQXJDLEVBQXNGO0FBQ3JGLFdBQU8sS0FBSyxXQUFMLENBQWlCLFFBQVEsSUFBUixDQUFhLHVCQUFiLENBQWpCLENBQVA7QUFDQTtBQUNEOztBQUVELE1BQUksS0FBSyxVQUFMLENBQWdCLE1BQXBCLEVBQTRCO0FBQzNCO0FBQ0EsUUFBSyxJQUFJLENBQVQsSUFBYyxLQUFLLFVBQW5CLEVBQStCO0FBQzlCLFdBQU8sS0FBSyxVQUFMLENBQWdCLENBQWhCLEVBQW1CLElBQTFCO0FBQ0EsWUFBUSxLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUIsS0FBM0I7O0FBRUEsUUFBSSxRQUFRLEtBQUssaUJBQWpCLEVBQW9DO0FBQ25DLGlCQUFZLEtBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBWjs7QUFFQTtBQUNBO0FBQ0EsU0FBSSxPQUFPLFVBQVUsTUFBVixDQUFQLEtBQTZCLFdBQWpDLEVBQThDO0FBQzdDLFVBQUksU0FBUyxTQUFiLEVBQXdCO0FBQ3ZCLGNBQU8sVUFBVSxLQUFWLENBQVA7QUFDQTtBQUNELE1BSkQsTUFLQyxPQUFPLFNBQVA7QUFDRDtBQUNEOztBQUVELFFBQUssSUFBSSxDQUFULElBQWMsS0FBSyxVQUFuQixFQUErQjtBQUM5QixXQUFPLEtBQUssVUFBTCxDQUFnQixDQUFoQixFQUFtQixJQUExQjtBQUNBLFlBQVEsS0FBSyxVQUFMLENBQWdCLENBQWhCLEVBQW1CLEtBQTNCOztBQUVBO0FBQ0EsUUFBSSxRQUFRLE9BQVosRUFBcUI7QUFDcEIsZUFBVSxNQUFNLEtBQU4sQ0FBWSxHQUFaLENBQVY7O0FBRUEsVUFBSyxDQUFMLElBQVUsT0FBVixFQUFtQjtBQUNsQixVQUFJLFFBQVEsQ0FBUixLQUFjLEtBQUssY0FBdkIsRUFDQyxPQUFPLEtBQUssY0FBTCxDQUFvQixRQUFRLENBQVIsQ0FBcEIsQ0FBUDtBQUNEOztBQUVELFVBQUssS0FBTCxJQUFjLEtBQUssbUJBQW5CLEVBQXdDO0FBQ3ZDLGlCQUFXLElBQUksTUFBSixDQUFXLEtBQVgsQ0FBWDtBQUNBLFVBQUksU0FBUyxJQUFULENBQWMsS0FBZCxDQUFKLEVBQTBCO0FBQ3pCLGNBQU8sS0FBSyxtQkFBTCxDQUF5QixLQUF6QixDQUFQO0FBQ0E7QUFDRDtBQUNEO0FBQ0Q7QUFDRDs7QUFFRCxZQUFVLEtBQUssT0FBTCxDQUFhLFdBQWIsRUFBVjtBQUNBLE1BQUksV0FBVyxLQUFLLFlBQXBCLEVBQWtDLE9BQU8sS0FBSyxZQUFMLENBQWtCLE9BQWxCLENBQVA7O0FBRWxDO0FBQ0EsU0FBTyxLQUFLLEdBQUwsQ0FBUyxNQUFNLGdCQUFmLENBQVA7QUFDQSxFQXJKaUI7O0FBdUpsQixTQUFRLGdCQUFVLElBQVYsRUFBZ0I7O0FBRXZCLGNBQVksS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQVo7O0FBRUEsZUFBYSxPQUFPLG9DQUFQLENBQWI7QUFDQSxZQUFVLFdBQVcsSUFBWCxDQUFnQixrQ0FBaEIsQ0FBVjs7QUFFQSxNQUFJLEVBQUUsTUFBTSx3QkFBTixJQUFrQyxRQUFRLE1BQTVDLENBQUosRUFBeUQ7QUFDeEQsY0FBVyxJQUFYLENBQWdCLEVBQWhCLEVBQW9CLE1BQXBCLENBQTJCLEtBQUssMEJBQUwsRUFBaUMsRUFBRSxLQUFLLFNBQVAsRUFBa0IsUUFBUSxVQUFVLElBQXBDLEVBQWpDLENBQTNCO0FBQ0EsYUFBVSxXQUFXLElBQVgsQ0FBZ0IsVUFBaEIsQ0FBVjtBQUNBOztBQUVELGFBQVcsSUFBWCxDQUFnQiw4QkFBaEIsRUFBZ0QsSUFBaEQsQ0FBcUQsVUFBVSxJQUEvRDtBQUNBLFVBQVEsSUFBUixDQUFhLEVBQWI7O0FBRUEsTUFBSSxVQUFVLFVBQWQsRUFBMEIsVUFBVSxVQUFWLENBQXFCLE1BQU0sT0FBTixDQUFjLFVBQWQsQ0FBeUIsR0FBekIsQ0FBNkIsQ0FBN0IsQ0FBckI7O0FBRTFCLE9BQUssWUFBVSxTQUFWLEVBQXFCLFFBQXJCLEVBQStCO0FBQ25DLFVBQU8sU0FBUyxLQUFULENBQWUsRUFBZixDQUFrQixnQkFBbEIsRUFBb0MsVUFBVSxLQUFWLEVBQWlCLEtBQWpCLEVBQXdCLEtBQXhCLEVBQStCO0FBQ3pFLGNBQVUsTUFBTSxPQUFOLENBQWMsVUFBeEI7QUFDQSxRQUFJLFNBQVMsS0FBYixFQUFvQixVQUFVLFFBQVEsSUFBUixDQUFhLFNBQVMsS0FBdEIsQ0FBVjtBQUNwQixRQUFJLFNBQVMsTUFBYixFQUFxQixVQUFVLFFBQVEsTUFBUixDQUFlLFNBQVMsTUFBeEIsQ0FBVjs7QUFFckIsUUFBSSxTQUFTLFFBQWIsRUFBdUI7QUFDdEIsZUFBVSxTQUFTLFFBQVQsQ0FBa0IsT0FBbEIsRUFBMkIsS0FBM0IsRUFBa0MsS0FBbEMsRUFBeUMsU0FBekMsQ0FBVjtBQUNBLEtBRkQsTUFFTyxJQUFJLFNBQVMsUUFBYixFQUF1QjtBQUM3QixnQkFBVyxRQUFRLElBQVIsQ0FBYSxTQUFTLFFBQXRCLENBQVg7O0FBRUEsU0FBSSxTQUFTLFFBQVQsSUFBcUIsTUFBekIsRUFBaUM7QUFDaEMsY0FBUSxJQUFSLENBQWEsS0FBYjtBQUNBLE1BRkQsTUFFTyxJQUFJLFNBQVMsUUFBVCxJQUFxQixPQUFyQixJQUFnQyxTQUFTLFdBQTdDLEVBQTBEO0FBQ2hFLGNBQVEsV0FBUixDQUFvQixTQUFTLFdBQVQsQ0FBcUIsSUFBckIsQ0FBMEIsR0FBMUIsQ0FBcEI7QUFDQSxnQkFBVSxRQUFRLFFBQVIsQ0FBaUIsS0FBakIsQ0FBVjtBQUNBLE1BSE0sTUFJRixJQUFJLFNBQVMsUUFBVCxJQUFxQixPQUF6QixFQUFrQztBQUN0QyxnQkFBVSxRQUFRLEdBQVIsQ0FBWSxTQUFTLEdBQXJCLEVBQTBCLEtBQTFCLENBQVY7QUFDQSxNQUZJLE1BR0EsSUFBSSxTQUFTLFdBQWIsRUFBMEI7QUFDOUIsVUFBSSxLQUFKLEVBQVc7QUFDVixpQkFBVSxRQUFRLElBQVIsQ0FBYSxTQUFTLFFBQXRCLEVBQWdDLEVBQWhDLENBQVY7QUFDQSxPQUZELE1BRU87QUFDTixpQkFBVSxRQUFRLFVBQVIsQ0FBbUIsU0FBUyxRQUE1QixDQUFWO0FBQ0E7QUFDRCxNQU5JLE1BTUU7QUFDTixnQkFBVSxRQUFRLElBQVIsQ0FBYSxTQUFTLFFBQXRCLEVBQWdDLEtBQWhDLENBQVY7QUFDQTs7QUFFRCxXQUFNLElBQU4sQ0FBVyxXQUFYLENBQXVCO0FBQ3RCLFlBQU0sWUFEZ0I7QUFFdEIsY0FBUSxRQUFRLEdBQVIsQ0FBWSxDQUFaLENBRmM7QUFHdEIscUJBQWUsU0FBUyxRQUhGO0FBSXRCLGdCQUFVLFFBSlk7QUFLdEIsZ0JBQVUsUUFBUSxJQUFSLENBQWEsU0FBUyxRQUF0QjtBQUxZLE1BQXZCO0FBT0E7O0FBRUQsUUFBSSxVQUFVLFFBQWQsRUFBd0I7QUFDdkIsZUFBVSxVQUFVLFFBQVYsQ0FBbUIsT0FBbkIsRUFBNEIsUUFBNUIsRUFBc0MsS0FBdEMsRUFBNkMsS0FBN0MsQ0FBVjtBQUNBOztBQUVELFFBQUksQ0FBQyxTQUFTLEtBQVYsSUFBbUIsQ0FBQyxTQUFTLE1BQWpDLEVBQXlDLE1BQU0sT0FBTixDQUFjLFVBQWQsQ0FBeUIsT0FBekI7QUFDekMsSUEzQ00sQ0FBUDtBQTRDQSxHQTdDRDs7QUErQ0EsZ0JBQWMsTUFBTSxPQUFOLENBQWMsVUFBNUI7O0FBRUEsT0FBSyxJQUFJLENBQVQsSUFBYyxVQUFVLFVBQXhCLEVBQW9DO0FBQ25DLGNBQVcsVUFBVSxVQUFWLENBQXFCLENBQXJCLENBQVg7O0FBRUEsT0FBSSxTQUFTLFVBQWIsRUFBeUIsU0FBUyxVQUFULENBQW9CLFFBQVEsR0FBUixDQUFZLENBQVosQ0FBcEI7O0FBRXpCLGFBQVUsV0FBVjtBQUNBLE9BQUksU0FBUyxLQUFiLEVBQW9CLFVBQVUsUUFBUSxJQUFSLENBQWEsU0FBUyxLQUF0QixDQUFWOztBQUVwQixPQUFJLFNBQVMsSUFBYixFQUFtQjtBQUNsQixhQUFTLElBQVQsQ0FBYyxLQUFkLElBQXVCLFNBQVMsR0FBaEM7QUFDQSxJQUZELE1BRU87QUFDTixhQUFTLElBQVQsR0FBZ0IsRUFBRSxPQUFPLFNBQVMsR0FBbEIsRUFBaEI7QUFDQTs7QUFFRCxPQUFJLE9BQU8sU0FBUyxLQUFoQixLQUEwQixXQUE5QixFQUEyQyxTQUFTLEtBQVQsR0FBaUIsSUFBakI7O0FBRTNDLFlBQVMsS0FBVCxHQUFpQixTQUFTLFNBQVQsQ0FBbUIsSUFBbkIsQ0FBd0IsU0FBUyxJQUFqQyxDQUFqQjs7QUFFQSxPQUFJLFNBQVMsSUFBYixFQUFtQjtBQUNsQixhQUFTLFNBQVQsQ0FBbUIsUUFBbkIsQ0FBNEIsU0FBUyxJQUFULENBQWMsUUFBUSxHQUFSLENBQVksQ0FBWixDQUFkLENBQTVCO0FBQ0EsSUFGRCxNQUVPLElBQUksU0FBUyxRQUFiLEVBQXVCO0FBQzdCLFFBQUksU0FBUyxRQUFULElBQXFCLE1BQXpCLEVBQWlDO0FBQ2hDLGFBQVEsUUFBUSxJQUFSLEVBQVI7QUFDQSxLQUZELE1BRU8sSUFBSSxTQUFTLFFBQVQsSUFBcUIsT0FBekIsRUFBa0M7QUFDeEM7QUFDQSxhQUFRLG1CQUFTLFFBQVEsR0FBUixDQUFZLENBQVosQ0FBVCxFQUF5QixTQUFTLEdBQWxDLENBQVIsQ0FGd0MsQ0FFTztBQUMvQyxLQUhNLE1BR0E7QUFDTixhQUFRLFFBQVEsSUFBUixDQUFhLFNBQVMsUUFBdEIsQ0FBUjtBQUNBOztBQUVEO0FBQ0EsUUFBSSxTQUFTLFNBQVMsUUFBVCxJQUFxQixPQUE5QixJQUF5QyxTQUFTLFdBQXRELEVBQW1FO0FBQ2xFLGFBQVEsTUFBTSxLQUFOLENBQVksR0FBWixFQUFpQixNQUFqQixDQUF3QixVQUFVLEVBQVYsRUFBYztBQUM3QyxhQUFPLFNBQVMsV0FBVCxDQUFxQixPQUFyQixDQUE2QixFQUE3QixLQUFvQyxDQUFDLENBQTVDO0FBQ0EsTUFGTyxDQUFSO0FBR0E7O0FBRUQsUUFBSSxTQUFTLFdBQWIsRUFBMEI7QUFDekIsYUFBUSxRQUFRLElBQVIsQ0FBYSxTQUFTLFFBQXRCLElBQWtDLFNBQVMsV0FBM0MsR0FBeUQsRUFBakU7QUFDQTs7QUFFRCxhQUFTLFNBQVQsQ0FBbUIsUUFBbkIsQ0FBNEIsS0FBNUI7QUFDQTs7QUFFRCxNQUFHLFNBQUgsRUFBYyxRQUFkOztBQUVBLE9BQUksU0FBUyxTQUFULElBQXNCLG9CQUExQixFQUF3QztBQUN2QyxjQUFVLFdBQVcsSUFBWCxDQUFnQiw0QkFBNEIsU0FBUyxHQUFyQyxHQUEyQyxJQUEzRCxDQUFWOztBQUVBLFFBQUksTUFBTSx3QkFBTixJQUFrQyxRQUFRLE1BQTlDLEVBQXNEO0FBQ3JELGFBQVEsSUFBUixDQUFhLEVBQWI7QUFDQSxLQUZELE1BRU87QUFDTixnQkFBVyxNQUFYLENBQWtCLFNBQVMsS0FBM0I7QUFDQSxlQUFVLFdBQVcsSUFBWCxDQUFnQiw0QkFBNEIsU0FBUyxHQUFyQyxHQUEyQyxJQUEzRCxDQUFWO0FBQ0E7QUFDRCxJQVRELE1BVUs7QUFDSixVQUFNLEVBQUUsS0FBSyxnQkFBTCxFQUF1QixRQUF2QixDQUFGLENBQU47QUFDQSxRQUFJLElBQUosQ0FBUyxRQUFULEVBQW1CLE1BQW5CLENBQTBCLFNBQVMsS0FBbkM7QUFDQSxZQUFRLE1BQVIsQ0FBZSxHQUFmO0FBQ0E7QUFDRDs7QUFFRCxNQUFJLFVBQVUsSUFBZCxFQUFvQixVQUFVLElBQVYsQ0FBZSxNQUFNLE9BQU4sQ0FBYyxVQUFkLENBQXlCLEdBQXpCLENBQTZCLENBQTdCLENBQWY7QUFDcEI7QUF6UmlCLENBQW5COztBQThSQSxNQUFNLGFBQU4sR0FBc0I7O0FBRXJCLFdBQVUsS0FGVztBQUdyQixXQUFVLEVBSFc7QUFJckIsTUFBSyxLQUpnQjs7QUFNckIsT0FBTSxjQUFVLEdBQVYsRUFBZTtBQUNwQixPQUFLLEdBQUwsR0FBVyxHQUFYOztBQUVBLElBQUUsV0FBRixFQUFlLEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsVUFBVSxDQUFWLEVBQWE7QUFDdkMsT0FBSSxXQUFKLENBQWdCLE1BQWhCLEVBQXdCLEtBQXhCLEVBQStCLElBQS9CO0FBQ0EsS0FBRSxjQUFGO0FBQ0EsVUFBTyxLQUFQO0FBQ0EsR0FKRDs7QUFNQSxJQUFFLGFBQUYsRUFBaUIsRUFBakIsQ0FBb0IsT0FBcEIsRUFBNkIsVUFBVSxDQUFWLEVBQWE7QUFDekMsT0FBSSxXQUFKLENBQWdCLFFBQWhCLEVBQTBCLEtBQTFCLEVBQWlDLElBQWpDO0FBQ0EsS0FBRSxjQUFGO0FBQ0EsVUFBTyxLQUFQO0FBQ0EsR0FKRDs7QUFNQSxJQUFFLGdCQUFGLEVBQW9CLEVBQXBCLENBQXVCLE9BQXZCLEVBQWdDLFVBQVUsQ0FBVixFQUFhO0FBQzVDLE9BQUksV0FBSixDQUFnQixXQUFoQixFQUE2QixLQUE3QixFQUFvQyxJQUFwQztBQUNBLEtBQUUsY0FBRjtBQUNBLFVBQU8sS0FBUDtBQUNBLEdBSkQ7O0FBTUEsSUFBRSxhQUFGLEVBQWlCLEVBQWpCLENBQW9CLE9BQXBCLEVBQTZCLFVBQVUsQ0FBVixFQUFhO0FBQ3pDLE9BQUksV0FBSixDQUFnQixlQUFoQixFQUFpQyxLQUFqQyxFQUF3QyxJQUF4QztBQUNBLEtBQUUsY0FBRjtBQUNBLFVBQU8sS0FBUDtBQUNBLEdBSkQ7O0FBTUEsSUFBRSxXQUFGLEVBQWUsRUFBZixDQUFrQixPQUFsQixFQUEyQixVQUFVLENBQVYsRUFBYTtBQUN2QyxPQUFJLFdBQUosQ0FBZ0IsWUFBaEIsRUFBOEIsS0FBOUIsRUFBcUMsR0FBckM7QUFDQSxLQUFFLGNBQUY7QUFDQSxVQUFPLEtBQVA7QUFDQSxHQUpEO0FBS0EsRUF0Q29COztBQXdDckIsT0FBTSxjQUFVLE9BQVYsRUFBbUI7QUFDeEIsT0FBSyxHQUFMLENBQVMsV0FBVCxDQUFxQixNQUFyQixFQUE2QixLQUE3QixFQUFvQyxJQUFwQztBQUNBLEVBMUNvQjs7QUE0Q3JCLE9BQU0sY0FBVSxPQUFWLEVBQW1CO0FBQ3hCLE9BQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsTUFBckIsRUFBNkIsS0FBN0IsRUFBb0MsSUFBcEM7QUFDQSxFQTlDb0I7O0FBZ0RyQixPQUFNLGNBQVUsT0FBVixFQUFtQjtBQUN4QixVQUFRLElBQVIsQ0FBYSxFQUFFLG1CQUFtQixJQUFyQixFQUEyQixpQkFBaUIsS0FBNUMsRUFBYjtBQUNBLElBQUUsaUJBQUYsRUFBcUIsSUFBckI7O0FBRUEsT0FBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLE9BQUssUUFBTCxHQUFnQixJQUFoQjtBQUNBLE9BQUssUUFBTCxHQUFnQixRQUFRLElBQVIsRUFBaEI7QUFDQSxFQXZEb0I7O0FBeURyQixVQUFTLGlCQUFVLE9BQVYsRUFBbUI7QUFDM0IsVUFBUSxVQUFSLENBQW1CLCtCQUFuQjtBQUNBLElBQUUsaUJBQUYsRUFBcUIsSUFBckI7QUFDQSxPQUFLLFFBQUwsR0FBZ0IsS0FBaEI7O0FBR0EsU0FBTyxLQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWlCLENBQWpCLENBQVA7QUFDQSxRQUFNLElBQU4sQ0FBVyxXQUFYLENBQXVCO0FBQ3RCLFNBQU0sZUFEZ0I7QUFFdEIsV0FBUSxJQUZjO0FBR3RCLGFBQVUsS0FBSyxRQUhPO0FBSXRCLGFBQVUsS0FBSztBQUpPLEdBQXZCO0FBTUE7QUF0RW9CLENBQXRCOztBQXlFQSxNQUFNLE9BQU4sR0FBZ0I7O0FBRWYsbUJBQWtCLEtBRkg7O0FBSWYsT0FBTSxjQUFVLEdBQVYsRUFBZSxRQUFmLEVBQXlCOztBQUU5QixTQUFPLElBQVA7O0FBRUEsT0FBSyxpQkFBTDs7QUFFQSxPQUFLLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxPQUFLLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxPQUFLLFlBQUwsR0FBb0IsUUFBcEI7O0FBRUEsT0FBSyxhQUFMLEdBQXFCLEVBQUUsMEJBQUYsQ0FBckI7QUFDQSxPQUFLLE1BQUwsR0FBYyxFQUFFLFNBQUYsQ0FBZDs7QUFFQSxPQUFLLFdBQUwsQ0FBaUIsR0FBakI7O0FBRUEsT0FBSyxhQUFMOztBQUVBLE9BQUssV0FBTCxHQUFtQixJQUFuQjtBQUNBLEVBdEJjOztBQXdCZjtBQUNBLG9CQUFtQiw2QkFBWTs7QUFFOUIsbUJBQWlCLEVBQUUsa0JBQUYsQ0FBakI7QUFDQSxpQkFBZSxLQUFmOztBQUVBLE9BQUssS0FBTCxJQUFjLE1BQU0sZUFBcEIsRUFBcUM7QUFDcEMsa0JBQWUsTUFBZixDQUFzQixzQ0FBc0MsS0FBdEMsR0FBOEMsd0RBQTlDLEdBQXlHLEtBQXpHLEdBQWlILElBQWpILEdBQXdILEtBQXhILEdBQWdJOzRGQUFoSSxHQUNzRSxLQUR0RSxHQUM4RSxvQkFEcEc7O0FBR0EsdUJBQW9CLGVBQWUsSUFBZixDQUFvQixzQkFBc0IsS0FBdEIsR0FBOEIsUUFBbEQsQ0FBcEI7O0FBRUEsZ0JBQWEsTUFBTSxlQUFOLENBQXNCLEtBQXRCLENBQWI7O0FBRUEsUUFBSyxDQUFMLElBQVUsVUFBVixFQUFzQjtBQUNyQixvQkFBZ0IsV0FBVyxDQUFYLENBQWhCO0FBQ0EsZ0JBQVksTUFBTSxVQUFOLENBQWlCLEdBQWpCLENBQXFCLGFBQXJCLENBQVo7O0FBRUEsUUFBSSxTQUFKLEVBQWU7QUFDZCxZQUFPLEVBQUUsdUJBQXVCLEtBQXZCLEdBQStCLGVBQS9CLEdBQWlELGFBQWpELEdBQWlFLGlCQUFqRSxHQUFxRixVQUFVLElBQVYsQ0FBZSxXQUFmLEVBQXJGLEdBQW9ILGdCQUFwSCxHQUF1SSxVQUFVLElBQWpKLEdBQXdKLFdBQTFKLENBQVA7O0FBRUEsU0FBSSxVQUFVLEtBQWQsRUFBcUI7O0FBRXBCLFdBQUssR0FBTCxDQUFTO0FBQ1Isd0JBQWlCLFNBQVMsZUFBVCxHQUEyQixVQUFVLEtBQXJDLEdBQTZDLEdBRHREO0FBRVIseUJBQWtCO0FBRlYsT0FBVDtBQUlBOztBQUVELHVCQUFrQixNQUFsQixDQUF5QixJQUF6QjtBQUNBO0FBQ0Q7QUFDRDtBQUNELEVBekRjOztBQTJEZixVQUFTLGlCQUFVLEdBQVYsRUFBZTtBQUN2QixTQUFPLGFBQVAsRUFBc0IsSUFBdEI7QUFDQSxPQUFLLE1BQUwsQ0FBWSxHQUFaLEdBQWtCLEdBQWxCO0FBQ0EsRUE5RGM7O0FBZ0VmO0FBQ0EsY0FBYSxxQkFBVSxHQUFWLEVBQWU7O0FBRTNCLE9BQUssTUFBTCxHQUFjLEtBQUssYUFBTCxDQUFtQixHQUFuQixDQUF1QixDQUF2QixDQUFkO0FBQ0EsT0FBSyxNQUFMLENBQVksR0FBWixHQUFrQixHQUFsQjs7QUFFQSxTQUFPLEtBQUssYUFBTCxDQUFtQixFQUFuQixDQUFzQixNQUF0QixFQUE4QixZQUFZOztBQUVoRCxVQUFPLFdBQVAsR0FBcUIsS0FBSyxNQUFMLENBQVksYUFBakM7QUFDQSxVQUFPLGFBQVAsR0FBdUIsS0FBSyxNQUFMLENBQVksYUFBWixDQUEwQixRQUFqRDs7QUFFQSxTQUFNLGFBQU4sQ0FBb0IsSUFBcEIsQ0FBeUIsT0FBTyxhQUFoQztBQUNBLE9BQUksS0FBSyxZQUFULEVBQXVCLEtBQUssWUFBTDs7QUFFdkIsVUFBTyxLQUFLLFlBQUwsRUFBUDtBQUNBLEdBVE0sQ0FBUDtBQVdBLEVBakZjOztBQW1GZixlQUFjLHdCQUFZOztBQUV6QixPQUFLLFFBQUwsR0FBZ0IsRUFBRSxPQUFPLGFBQVQsQ0FBaEI7QUFDQSxPQUFLLFNBQUwsR0FBaUIsRUFBRSxPQUFPLGFBQVQsRUFBd0IsSUFBeEIsQ0FBNkIsTUFBN0IsQ0FBakI7QUFDQSxPQUFLLFNBQUwsR0FBaUIsRUFBRSxPQUFPLGFBQVQsRUFBd0IsSUFBeEIsQ0FBNkIsTUFBN0IsQ0FBakI7O0FBRUEsT0FBSyxlQUFMO0FBQ0EsRUExRmM7O0FBNEZmLGtCQUFpQix5QkFBVSxFQUFWLEVBQWM7O0FBRTlCO0FBQ0Esa0JBQWdCLEVBQWhCOztBQUVBLE1BQUksR0FBRyxVQUFQLEVBQ0MsS0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEdBQUcsVUFBSCxDQUFjLE1BQWxDLEVBQTBDLEdBQTFDLEVBQStDOztBQUU5QyxPQUFJLEdBQUcsVUFBSCxDQUFjLENBQWQsRUFBaUIsUUFBakIsQ0FBMEIsT0FBMUIsQ0FBa0MsZ0JBQWxDLElBQXNELENBQUMsQ0FBM0QsRUFBOEQ7QUFDN0Qsb0JBQWdCLEdBQUcsVUFBSCxDQUFjLENBQWQsRUFBaUIsUUFBakIsQ0FBMEIsT0FBMUIsQ0FBa0MsaUJBQWxDLEVBQXFELEVBQXJELENBQWhCO0FBQ0E7QUFDRDs7QUFFRixNQUFJLGlCQUFpQixFQUFyQixFQUF5QixPQUFPLGFBQVA7O0FBRXpCLE1BQUksR0FBRyxVQUFQLEVBQ0MsS0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEdBQUcsVUFBSCxDQUFjLE1BQWxDLEVBQTBDLEdBQTFDLEVBQStDOztBQUU5QyxPQUFJLEdBQUcsVUFBSCxDQUFjLENBQWQsRUFBaUIsUUFBakIsQ0FBMEIsT0FBMUIsQ0FBa0MsZ0JBQWxDLElBQXNELENBQUMsQ0FBM0QsRUFBOEQ7QUFDN0Qsb0JBQWdCLEdBQUcsVUFBSCxDQUFjLENBQWQsRUFBaUIsUUFBakIsQ0FBMEIsT0FBMUIsQ0FBa0MsaUJBQWxDLEVBQXFELEVBQXJELENBQWhCO0FBQ0E7QUFDRDs7QUFFRixNQUFJLGlCQUFpQixFQUFyQixFQUF5QixPQUFPLGFBQVA7QUFDekI7QUFDQSxTQUFPLEdBQUcsT0FBVjtBQUNBLEVBdEhjOztBQXdIZixvQkFBbUIsMkJBQVUsSUFBVixFQUFnQjtBQUNsQyxTQUFPLE1BQU0sVUFBTixDQUFpQixTQUFqQixDQUEyQixJQUEzQixDQUFQO0FBQ0EsTUFBSSxJQUFKLEVBQVUsTUFBTSxVQUFOLENBQWlCLE1BQWpCLENBQXdCLEtBQUssSUFBN0I7QUFFVixFQTVIYzs7QUE4SGYsYUFBWSxzQkFBd0I7QUFBQSxNQUFkLElBQWMsdUVBQVAsS0FBTzs7O0FBRW5DLE1BQUksQ0FBQyxJQUFMLEVBQVc7QUFDVixVQUFPLGFBQVAsRUFBc0IsSUFBdEI7QUFDQTtBQUNBOztBQUVELE1BQUksS0FBSyxVQUFMLElBQW1CLEtBQUssVUFBTCxDQUFnQixHQUFoQixDQUFvQixDQUFwQixLQUEwQixJQUFqRCxFQUF1RDtBQUN0RCxTQUFNLGFBQU4sQ0FBb0IsT0FBcEIsQ0FBNEIsS0FBSyxVQUFqQztBQUNBLFVBQU8sYUFBUCxFQUFzQixXQUF0QixDQUFrQyxXQUFsQyxFQUErQyxJQUEvQyxDQUFvRCxpQkFBcEQsRUFBdUUsSUFBdkU7QUFDQSxRQUFLLFVBQUwsR0FBa0IsSUFBbEI7QUFDQTs7QUFFRCxPQUFLLFVBQUwsR0FBa0IsU0FBUyxPQUFPLElBQVAsQ0FBM0I7QUFDQSxXQUFTLE9BQU8sTUFBUCxFQUFUOztBQUdBLFNBQU8sYUFBUCxFQUFzQixHQUF0QixDQUNDO0FBQ0MsVUFBTyxPQUFPLEdBQVAsR0FBYSxLQUFLLFFBQUwsQ0FBYyxTQUFkLEVBRHJCO0FBRUMsV0FBUSxPQUFPLElBQVAsR0FBYyxLQUFLLFFBQUwsQ0FBYyxVQUFkLEVBRnZCO0FBR0MsWUFBUyxPQUFPLFVBQVAsRUFIVjtBQUlDLGFBQVUsT0FBTyxXQUFQLEVBSlg7QUFLQyxjQUFXO0FBTFosR0FERDs7QUFTQSxTQUFPLGlCQUFQLEVBQTBCLElBQTFCLENBQStCLEtBQUssZUFBTCxDQUFxQixJQUFyQixDQUEvQjtBQUVBLEVBMUpjOztBQTRKZjtBQUNBLGtCQUFpQiwyQkFBWTs7QUFFNUIsY0FBWSxFQUFFLFFBQVEsSUFBVixFQUFaOztBQUVBLE9BQUssU0FBTCxDQUFlLEVBQWYsQ0FBa0IscUJBQWxCLEVBQXlDLFVBQVUsS0FBVixFQUFpQjtBQUN6RDtBQUNBO0FBQ0EsT0FBSSxNQUFNLE1BQVYsRUFBa0I7QUFDakIsZ0JBQVksS0FBWjs7QUFFQSxTQUFLLFdBQUwsR0FBbUIsU0FBUyxPQUFPLE1BQU0sTUFBYixDQUE1QjtBQUNBLGFBQVMsT0FBTyxNQUFQLEVBQVQ7QUFDQSxZQUFRLE9BQU8sVUFBUCxFQUFSO0FBQ0EsYUFBUyxPQUFPLFdBQVAsRUFBVDs7QUFFQSxRQUFJLEtBQUssVUFBVCxFQUFxQjtBQUNwQixVQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUI7QUFDcEIsZUFBUztBQURXLE1BQXJCO0FBR0EsY0FBUyxLQUFLLFdBQWQ7QUFDQSxvQkFBZSxLQUFLLFdBQUwsQ0FBaUIsTUFBakIsRUFBZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0E1QkQsTUE0Qk87O0FBRU4sWUFBTyxnQkFBUCxFQUF5QixHQUF6QixDQUNDO0FBQ0MsYUFBTyxPQUFPLEdBQVAsR0FBYSxLQUFLLFFBQUwsQ0FBYyxTQUFkLEVBRHJCO0FBRUMsY0FBUSxPQUFPLElBQVAsR0FBYyxLQUFLLFFBQUwsQ0FBYyxVQUFkLEVBRnZCO0FBR0MsZUFBUyxLQUhWO0FBSUMsZ0JBQVUsTUFKWDtBQUtDLGlCQUFXLE1BQU0sTUFBTixDQUFhLFlBQWIsQ0FBMEIsaUJBQTFCLElBQStDLE1BQS9DLEdBQXdEO0FBTHBFLE1BREQ7O0FBU0EsWUFBTyxpQkFBUCxFQUEwQixJQUExQixDQUErQixLQUFLLGVBQUwsQ0FBcUIsTUFBTSxNQUEzQixDQUEvQjtBQUNBO0FBQ0Q7QUFDRCxHQXJERDs7QUF3REEsT0FBSyxTQUFMLENBQWUsRUFBZixDQUFrQixrQkFBbEIsRUFBc0MsVUFBVSxLQUFWLEVBQWlCO0FBQ3RELE9BQUksS0FBSyxVQUFULEVBQXFCO0FBQ3BCLFNBQUssVUFBTCxHQUFrQixLQUFsQjs7QUFFQSxRQUFJLFVBQVUsUUFBZCxFQUF3QjtBQUN4QjtBQUNDLG1CQUFhLEVBQUUsVUFBVSxJQUFaLENBQWI7QUFDQSxXQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsVUFBN0I7QUFDQSxXQUFLLFdBQUwsR0FBbUIsVUFBbkI7QUFDQTtBQUNELFFBQUksVUFBVSxTQUFkLEVBQXlCLEtBQUssV0FBTCxHQUFtQixVQUFVLFNBQVYsQ0FBb0IsS0FBSyxXQUF6QixDQUFuQjs7QUFFekIsV0FBTyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsQ0FBckIsQ0FBUDtBQUNBLFNBQUssVUFBTCxDQUFnQixJQUFoQjtBQUNBLFNBQUssaUJBQUwsQ0FBdUIsSUFBdkI7O0FBRUEsUUFBSSxLQUFLLGdCQUFMLEtBQTBCLEtBQTlCLEVBQXFDO0FBQ3BDLFdBQU0sSUFBTixDQUFXLFdBQVgsQ0FBdUI7QUFDdEIsWUFBTSxXQURnQjtBQUV0QixjQUFRLEtBQUssVUFGUztBQUd0QixrQkFBWSxDQUFDLElBQUQsQ0FIVTtBQUl0QixtQkFBYSxLQUFLO0FBSkksTUFBdkI7QUFNQSxLQVBELE1BT087QUFDTixVQUFLLGdCQUFMLENBQXNCLFNBQXRCLEdBQWtDLEtBQUssVUFBdkM7QUFDQSxVQUFLLGdCQUFMLENBQXNCLGNBQXRCLEdBQXVDLEtBQUssV0FBNUM7O0FBRUEsV0FBTSxJQUFOLENBQVcsV0FBWCxDQUF1QixLQUFLLGdCQUE1QjtBQUNBLFVBQUssZ0JBQUwsR0FBd0IsS0FBeEI7QUFDQTtBQUNEO0FBQ0QsR0EvQkQ7O0FBa0NBLE9BQUssU0FBTCxDQUFlLEVBQWYsQ0FBa0IsVUFBbEIsRUFBOEIsVUFBVSxLQUFWLEVBQWlCO0FBQzlDLG9EQUFrQyxNQUFNLE1BQXhDLEVBQWdELEtBQUssU0FBckQ7O0FBRUEsUUFBSyxVQUFMLEdBQWtCLFNBQVMsT0FBTyxNQUFNLE1BQWIsQ0FBM0I7O0FBRUEsU0FBTSxhQUFOLENBQW9CLElBQXBCLENBQXlCLEtBQUssVUFBOUI7O0FBRUEsUUFBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLEVBQUUsbUJBQW1CLElBQXJCLEVBQTJCLGlCQUFpQixLQUE1QyxFQUFyQjs7QUFFQSxRQUFLLFVBQUwsQ0FBZ0IsRUFBaEIsQ0FBbUIsd0JBQW5CLEVBQTZDLFVBQVUsS0FBVixFQUFpQjs7QUFFN0QsV0FBTyxhQUFQLEVBQXNCLEdBQXRCLENBQTBCO0FBQ3pCLGNBQVMsS0FBSyxVQUFMLENBQWdCLFVBQWhCLEVBRGdCO0FBRXpCLGVBQVUsS0FBSyxVQUFMLENBQWdCLFdBQWhCO0FBRmUsS0FBMUI7QUFJQSxJQU5EOztBQVFBLFVBQU8sYUFBUCxFQUFzQixRQUF0QixDQUErQixXQUEvQixFQUE0QyxJQUE1QyxDQUFpRCxpQkFBakQsRUFBb0UsSUFBcEU7QUFDQSxVQUFPLGdCQUFQLEVBQXlCLElBQXpCO0FBQ0EsR0FuQkQ7O0FBc0JBLE9BQUssU0FBTCxDQUFlLEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsVUFBVSxLQUFWLEVBQWlCO0FBQzNDLG9EQUFrQyxNQUFNLE1BQXhDLEVBQWdELEtBQUssU0FBckQ7O0FBRUEsT0FBSSxNQUFNLE1BQVYsRUFBa0I7QUFDakIsUUFBTSxRQUFPLGdDQUFnQixNQUFNLE1BQXRCLENBQWI7QUFDQSxRQUFJLENBQUMsU0FBRCxJQUFjLENBQUMsRUFBRSxxQkFBRixFQUF5QixRQUF6QixDQUFrQyxRQUFsQyxDQUFuQixFQUFnRTtBQUMvRCxPQUFFLHFCQUFGLEVBQ0UsUUFERixDQUNXLFFBRFgsRUFFRSxRQUZGLEdBR0UsV0FIRixDQUdjLFFBSGQ7QUFJQSxPQUFFLGFBQUYsRUFBaUIsSUFBakI7QUFDQSxPQUFFLGNBQUYsRUFBa0IsSUFBbEI7QUFDQTtBQUNELFNBQUssVUFBTCxDQUFnQixLQUFoQjtBQUNBLFNBQUssaUJBQUwsQ0FBdUIsS0FBdkI7O0FBRUEsVUFBTSxjQUFOO0FBQ0EsV0FBTyxLQUFQO0FBQ0E7QUFDRCxHQW5CRDs7QUFxQkEsT0FBSyxTQUFMLENBQWUsT0FBZixDQUF1QixhQUFLO0FBQzNCLE9BQUksS0FBSyxVQUFMLElBQW1CLEtBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixTQUFyQixLQUFtQyxNQUExRCxFQUFrRTtBQUNqRSxRQUFJLEVBQUUsS0FBRixJQUFXLEVBQVgsSUFBaUIsRUFBRSxLQUFGLElBQVcsRUFBNUIsSUFBa0MsRUFBRSxLQUFGLElBQVcsRUFBN0MsSUFBbUQsRUFBRSxLQUFGLElBQVcsRUFBbEUsRUFBc0U7QUFDckUsY0FBUyxjQUFULENBQXdCLFVBQXhCLEVBQW9DLGFBQXBDLENBQWtELFlBQWxELENBQStELEVBQUUsS0FBakUsRUFBd0UsS0FBSyxVQUE3RTtBQUNBLE9BQUUsY0FBRixHQUZxRSxDQUVqRDtBQUNwQjtBQUNEO0FBQ0QsR0FQRDs7QUFTQSxJQUFFLFdBQUYsRUFBZSxFQUFmLENBQWtCLFdBQWxCLEVBQStCLFVBQVUsS0FBVixFQUFpQjtBQUMvQyxVQUFPLGFBQVAsRUFBc0IsSUFBdEI7QUFDQSxRQUFLLFdBQUwsR0FBbUIsS0FBSyxVQUF4QjtBQUNBLFFBQUssVUFBTCxHQUFrQixJQUFsQjs7QUFFQSxVQUFPLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixDQUFyQixDQUFQOztBQUdBLFFBQUssZ0JBQUwsR0FBd0I7QUFDdkIsVUFBTSxNQURpQjtBQUV2QixZQUFRLElBRmU7QUFHdkIsZUFBVyxLQUFLLFVBSE87QUFJdkIsb0JBQWdCLEtBQUs7QUFKRSxJQUF4Qjs7QUFPQTtBQUNBLFNBQU0sY0FBTjtBQUNBLFVBQU8sS0FBUDtBQUNBLEdBbEJEOztBQW9CQSxJQUFFLFdBQUYsRUFBZSxFQUFmLENBQWtCLE9BQWxCLEVBQTJCLFVBQVUsS0FBVixFQUFpQjtBQUMzQyxVQUFPLGFBQVAsRUFBc0IsSUFBdEI7O0FBRUEsVUFBTyxLQUFLLFVBQUwsQ0FBZ0IsR0FBaEIsQ0FBb0IsQ0FBcEIsQ0FBUDtBQUNBLGVBQVksS0FBSyxVQUFqQjtBQUNBLG9CQUFpQixLQUFLLFdBQXRCOztBQUVBLFVBQU8sS0FBSyxVQUFMLENBQWdCLElBQWhCLEVBQVA7O0FBRUEsT0FBSSxLQUFLLE1BQUwsR0FBYyxDQUFsQixFQUFxQjtBQUNwQixTQUFLLEtBQUwsQ0FBVyxLQUFLLFVBQWhCO0FBQ0EsSUFGRCxNQUVPO0FBQ04sU0FBSyxVQUFMLENBQWdCLE1BQWhCLEdBQXlCLEtBQXpCLENBQStCLEtBQUssVUFBcEM7QUFDQTs7QUFFRCxlQUFZLEtBQUssVUFBakI7QUFDQSxvQkFBaUIsS0FBSyxXQUF0Qjs7QUFFQSxTQUFNLElBQU4sQ0FBVyxXQUFYLENBQXVCO0FBQ3RCLFVBQU0sTUFEZ0I7QUFFdEIsWUFBUSxJQUZjO0FBR3RCLGVBQVcsU0FIVztBQUl0QixlQUFXLFNBSlc7QUFLdEIsb0JBQWdCLGNBTE07QUFNdEIsb0JBQWdCO0FBTk0sSUFBdkI7O0FBU0EsU0FBTSxjQUFOO0FBQ0EsVUFBTyxLQUFQO0FBQ0EsR0E3QkQ7O0FBK0JBLElBQUUsU0FBRixFQUFhLEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsVUFBVSxLQUFWLEVBQWlCO0FBQ3pDLFVBQU8sYUFBUCxFQUFzQixJQUF0Qjs7QUFFQSxVQUFPLEtBQUssVUFBTCxDQUFnQixHQUFoQixDQUFvQixDQUFwQixDQUFQO0FBQ0EsZUFBWSxLQUFLLFVBQWpCO0FBQ0Esb0JBQWlCLEtBQUssV0FBdEI7O0FBRUEsVUFBTyxLQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsRUFBUDs7QUFFQSxPQUFJLEtBQUssTUFBTCxHQUFjLENBQWxCLEVBQXFCO0FBQ3BCLFNBQUssTUFBTCxDQUFZLEtBQUssVUFBakI7QUFDQSxJQUZELE1BRU87QUFDTixTQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsR0FBeUIsTUFBekIsQ0FBZ0MsS0FBSyxVQUFyQztBQUNBOztBQUVELGVBQVksS0FBSyxVQUFqQjtBQUNBLG9CQUFpQixLQUFLLFdBQXRCOztBQUVBLFNBQU0sSUFBTixDQUFXLFdBQVgsQ0FBdUI7QUFDdEIsVUFBTSxNQURnQjtBQUV0QixZQUFRLElBRmM7QUFHdEIsZUFBVyxTQUhXO0FBSXRCLGVBQVcsU0FKVztBQUt0QixvQkFBZ0IsY0FMTTtBQU10QixvQkFBZ0I7QUFOTSxJQUF2Qjs7QUFTQSxTQUFNLGNBQU47QUFDQSxVQUFPLEtBQVA7QUFDQSxHQTdCRDs7QUErQkEsSUFBRSxZQUFGLEVBQWdCLEVBQWhCLENBQW1CLE9BQW5CLEVBQTRCLFVBQVUsS0FBVixFQUFpQjtBQUM1QyxXQUFRLEtBQUssVUFBTCxDQUFnQixLQUFoQixFQUFSOztBQUVBLFFBQUssVUFBTCxDQUFnQixLQUFoQixDQUFzQixLQUF0Qjs7QUFFQSxRQUFLLFVBQUwsR0FBa0IsTUFBTSxLQUFOLEVBQWxCOztBQUVBLFVBQU8sTUFBTSxHQUFOLENBQVUsQ0FBVixDQUFQO0FBQ0EsU0FBTSxJQUFOLENBQVcsV0FBWCxDQUF1QjtBQUN0QixVQUFNLFdBRGdCO0FBRXRCLFlBQVEsS0FBSyxVQUZTO0FBR3RCLGdCQUFZLENBQUMsSUFBRCxDQUhVO0FBSXRCLGlCQUFhLEtBQUs7QUFKSSxJQUF2Qjs7QUFPQSxTQUFNLGNBQU47QUFDQSxVQUFPLEtBQVA7QUFDQSxHQWpCRDs7QUFtQkEsSUFBRSxhQUFGLEVBQWlCLEVBQWpCLENBQW9CLE9BQXBCLEVBQTZCLFVBQVUsS0FBVixFQUFpQjs7QUFFN0MsVUFBTyxLQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsR0FBeUIsR0FBekIsQ0FBNkIsQ0FBN0IsQ0FBUDs7QUFFQSxRQUFLLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDQSxRQUFLLGlCQUFMLENBQXVCLElBQXZCOztBQUVBLFNBQU0sY0FBTjtBQUNBLFVBQU8sS0FBUDtBQUNBLEdBVEQ7O0FBV0EsSUFBRSxhQUFGLEVBQWlCLEVBQWpCLENBQW9CLE9BQXBCLEVBQTZCLFVBQVUsS0FBVixFQUFpQjtBQUM3QyxVQUFPLGFBQVAsRUFBc0IsSUFBdEI7O0FBRUEsVUFBTyxLQUFLLFVBQUwsQ0FBZ0IsR0FBaEIsQ0FBb0IsQ0FBcEIsQ0FBUDs7QUFFQSxTQUFNLElBQU4sQ0FBVyxXQUFYLENBQXVCO0FBQ3RCLFVBQU0sV0FEZ0I7QUFFdEIsWUFBUSxLQUFLLFVBRlM7QUFHdEIsa0JBQWMsQ0FBQyxJQUFELENBSFE7QUFJdEIsaUJBQWEsS0FBSztBQUpJLElBQXZCOztBQU9BLFFBQUssVUFBTCxDQUFnQixNQUFoQjs7QUFFQSxTQUFNLGNBQU47QUFDQSxVQUFPLEtBQVA7QUFDQSxHQWhCRDs7QUFrQkEsU0FBTyxPQUFPLFdBQWQsRUFBMkIsRUFBM0IsQ0FBOEIsZUFBOUIsRUFBK0MsVUFBVSxLQUFWLEVBQWlCOztBQUUvRCxPQUFJLEtBQUssVUFBVCxFQUFxQjtBQUNwQixhQUFTLEtBQUssVUFBTCxDQUFnQixNQUFoQixFQUFUOztBQUVBLFdBQU8sYUFBUCxFQUFzQixHQUF0QixDQUNDO0FBQ0MsWUFBTyxPQUFPLEdBQVAsR0FBYSxLQUFLLFFBQUwsQ0FBYyxTQUFkLEVBRHJCO0FBRUMsYUFBUSxPQUFPLElBQVAsR0FBYyxLQUFLLFFBQUwsQ0FBYyxVQUFkLEVBRnZCO0FBR0MsY0FBUyxLQUFLLFVBQUwsQ0FBZ0IsVUFBaEIsRUFIVjtBQUlDLGVBQVUsS0FBSyxVQUFMLENBQWdCLFdBQWhCO0FBQ1Y7QUFMRCxLQUREO0FBU0E7O0FBRUQsT0FBSSxLQUFLLFdBQVQsRUFBc0I7QUFDckIsYUFBUyxLQUFLLFdBQUwsQ0FBaUIsTUFBakIsRUFBVDs7QUFFQSxXQUFPLGdCQUFQLEVBQXlCLEdBQXpCLENBQ0M7QUFDQyxZQUFPLE9BQU8sR0FBUCxHQUFhLEtBQUssUUFBTCxDQUFjLFNBQWQsRUFEckI7QUFFQyxhQUFRLE9BQU8sSUFBUCxHQUFjLEtBQUssUUFBTCxDQUFjLFVBQWQsRUFGdkI7QUFHQyxjQUFTLEtBQUssV0FBTCxDQUFpQixVQUFqQixFQUhWO0FBSUMsZUFBVSxLQUFLLFdBQUwsQ0FBaUIsV0FBakI7QUFDVjtBQUxELEtBREQ7QUFRQTtBQUNELEdBNUJEO0FBOEJBLEVBL2NjOztBQWlkZjtBQUNBLGdCQUFlLHlCQUFZOztBQUUxQixPQUFLLFVBQUwsR0FBa0IsS0FBbEI7QUFDQSxjQUFZLEVBQVo7QUFDQSxJQUFFLCtCQUFGLEVBQW1DLEVBQW5DLENBQXNDLHNCQUF0QyxFQUE4RCxVQUFVLEtBQVYsRUFBaUI7QUFDOUUsV0FBUSxPQUFPLElBQVAsQ0FBUjs7QUFFQTtBQUNBLGVBQVksTUFBTSxVQUFOLENBQWlCLEdBQWpCLENBQXFCLE1BQU0sSUFBTixDQUFXLE1BQVgsQ0FBckIsQ0FBWjs7QUFFQSxPQUFJLFVBQVUsUUFBZCxFQUF3QjtBQUN2QixXQUFPLFVBQVUsUUFBakI7QUFDQSxJQUZELE1BRU87QUFDTixXQUFPLFVBQVUsSUFBakI7QUFDQTs7QUFFRCxRQUFLLFdBQUwsR0FBbUIsRUFBRSxJQUFGLENBQW5COztBQUVBLE9BQUksVUFBVSxTQUFkLEVBQXlCLEtBQUssV0FBTCxHQUFtQixVQUFVLFNBQVYsQ0FBb0IsS0FBSyxXQUF6QixDQUFuQjs7QUFFekIsUUFBSyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsR0FqQkQ7O0FBb0JBLElBQUUsTUFBRixFQUFVLEVBQVYsQ0FBYSxrQkFBYixFQUFpQyxVQUFVLEtBQVYsRUFBaUI7QUFDakQsT0FBSSxLQUFLLFVBQUwsSUFBbUIsSUFBdkIsRUFBNkI7QUFDNUIsU0FBSyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0E7QUFDQTtBQUNELEdBTEQ7O0FBT0EsSUFBRSxNQUFGLEVBQVUsRUFBVixDQUFhLHFCQUFiLEVBQW9DLFVBQVUsS0FBVixFQUFpQjtBQUNwRCxPQUFJLEtBQUssVUFBTCxJQUFtQixJQUF2QixFQUE2QjtBQUM1Qix5QkFBcUIsU0FBUyxnQkFBVCxDQUEwQixNQUFNLE9BQU4sR0FBZ0IsRUFBMUMsRUFBOEMsTUFBTSxPQUFOLEdBQWdCLEVBQTlELENBQXJCO0FBQ0E7QUFDQSxRQUFJLHNCQUFzQixtQkFBbUIsT0FBbkIsSUFBOEIsUUFBeEQsRUFBa0U7QUFDakUsVUFBSyxTQUFMLENBQWUsT0FBZixDQUF1QixXQUF2QixFQUFvQyxLQUFwQztBQUNBLFdBQU0sZUFBTjtBQUNBLFVBQUssVUFBTCxDQUFnQixLQUFoQjtBQUNBO0FBQ0Q7QUFDRCxHQVZEOztBQVlBLElBQUUsK0JBQUYsRUFBbUMsRUFBbkMsQ0FBc0Msa0JBQXRDLEVBQTBELFVBQVUsS0FBVixFQUFpQjtBQUMxRSxRQUFLLFVBQUwsR0FBa0IsS0FBbEI7QUFDQTtBQUNBLEdBSEQ7QUFLQSxFQWxnQmM7O0FBb2dCZixrQkFwZ0JlLCtCQW9nQks7QUFDbkI7Ozs7OztBQURtQixpQkFPTyxLQUFLLE9BQUwsRUFQUDtBQUFBLE1BT1gsT0FQVyxZQU9YLE9BUFc7QUFBQSxNQU9GLElBUEUsWUFPRixJQVBFOztBQVFuQixTQUFPLGNBQWlCLE9BQWpCLDBCQUNFLDZCQUFjLElBQWQsRUFBb0IsdUJBQXBCLEVBQXNDLG9CQUF0QyxFQUNQLDBCQURPLEVBQ2Msa0NBRGQsRUFDMkMsa0NBRDNDLEVBRVAsK0JBRk8sRUFFbUIsZ0NBRm5CLENBREYsRUFJTjtBQUNDLHNCQUFtQixLQURwQjtBQUVDLHNCQUFtQixJQUZwQjtBQUdDLGdCQUFhO0FBSGQsR0FKTSxDQUFQO0FBU0EsRUFyaEJjOzs7QUF1aEJmLFVBQVMsbUJBQVk7QUFDcEIsUUFBTSxPQUFPLGFBQWI7QUFDQSxNQUFNLFVBQVUsZUFDYixJQUFJLE9BQUosQ0FBWSxJQURDLElBRVosSUFBSSxPQUFKLENBQVksUUFBWixHQUF1QixjQUFjLElBQUksT0FBSixDQUFZLFFBQTFCLEdBQXFDLEdBQTVELEdBQWtFLEVBRnRELEtBR1osQ0FBQyxJQUFJLE9BQUosQ0FBWSxRQUFiLElBQXlCLElBQUksT0FBSixDQUFZLFFBQXJDLEdBQWdELFNBQWhELEdBQTRELEVBSGhELEtBSVosSUFBSSxPQUFKLENBQVksUUFBWixHQUF1QixPQUFPLElBQUksT0FBSixDQUFZLFFBQW5CLEdBQThCLEdBQXJELEdBQTJELEVBSi9DLElBS2IsS0FMSDtBQU1BLE1BQU0sT0FBVSxPQUFWLDRDQUVFLElBQUksZUFBSixDQUFvQixTQUZ0QiwwQkFBTjtBQUlBLFNBQU87QUFDTixtQkFETTtBQUVOO0FBRk0sR0FBUDtBQUlBLEVBdmlCYzs7QUF5aUJmLFVBQVMsaUJBQVUsSUFBVixFQUFnQjtBQUN4QjtBQUNBLFVBQVEsS0FBSyxPQUFMLENBQWEsT0FBYixDQUFSO0FBQ0EsUUFBTSxLQUFLLE9BQUwsQ0FBYSxRQUFiLENBQU47O0FBRUEsTUFBSSxTQUFTLENBQVQsSUFBYyxPQUFPLENBQXpCLEVBQTRCO0FBQzNCLFVBQU8sS0FBSyxLQUFMLENBQVcsS0FBSyxPQUFMLENBQWEsR0FBYixFQUFrQixLQUFsQixJQUEyQixDQUF0QyxFQUF5QyxHQUF6QyxDQUFQO0FBQ0EsR0FGRCxNQUVPO0FBQ04sVUFBTyxJQUFQO0FBQ0E7O0FBRUQ7QUFDQSxTQUFPLGFBQVAsQ0FBcUIsSUFBckIsQ0FBMEIsU0FBMUIsR0FBc0MsSUFBdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTNqQmMsQ0FBaEI7O0FBOGpCQSxNQUFNLFVBQU4sR0FBbUI7O0FBRWxCLFdBQVUsS0FGUTtBQUdsQixXQUFVLEVBSFE7QUFJbEIsTUFBSyxLQUphOztBQU1sQixPQUFNLGNBQVUsR0FBVixFQUFlO0FBQ3BCLElBQUUsNkJBQUYsRUFBaUMsR0FBakMsQ0FBcUMsTUFBTSxPQUFOLENBQWMsaUJBQWQsRUFBckM7O0FBRUEsSUFBRSw2QkFBRixFQUFpQyxLQUFqQyxDQUF1QyxZQUFZO0FBQ2xELFNBQU0sTUFBTSxPQUFOLENBQWMsT0FBZCxDQUFzQixLQUFLLEtBQTNCLENBQU4sRUFBeUMsSUFBekM7QUFDQSxHQUZEOztBQUlBO0FBQ0EsUUFBTSxPQUFOLENBQWMsU0FBZCxDQUF3QixFQUF4QixDQUEyQixtQ0FBM0IsRUFBZ0UsVUFBVSxDQUFWLEVBQWE7QUFBRSxTQUFNLFVBQU4sQ0FBaUIsUUFBakI7QUFBOEIsR0FBN0c7QUFDQTtBQUNBLFFBQU0sT0FBTixDQUFjLGFBQWQsQ0FBNEIsRUFBNUIsQ0FBK0IsTUFBL0IsRUFBdUMsVUFBVSxDQUFWLEVBQWE7QUFBRSxTQUFNLFVBQU4sQ0FBaUIsUUFBakI7QUFBOEIsR0FBcEY7O0FBRUEsT0FBSyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsRUFuQmlCOztBQXFCbEIsV0FBVSxrQkFBVSxLQUFWLEVBQWlCO0FBQzFCLE1BQUksS0FBSyxRQUFULEVBQW1CO0FBQ2xCLEtBQUUsNkJBQUYsRUFBaUMsR0FBakMsQ0FBcUMsTUFBTSxPQUFOLENBQWMsaUJBQWQsRUFBckM7QUFDQTtBQUNELEVBekJpQjs7QUEyQmxCLFVBQVMsaUJBQVUsT0FBVixFQUFtQjtBQUMzQjtBQUNBLEVBN0JpQjs7QUErQmxCLFNBQVEsa0JBQVk7QUFDbkIsTUFBSSxLQUFLLFFBQUwsSUFBaUIsSUFBckIsRUFBMkI7QUFDMUIsUUFBSyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsVUFBTyxLQUFLLElBQUwsRUFBUDtBQUNBO0FBQ0QsT0FBSyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsT0FBSyxPQUFMO0FBQ0E7QUF0Q2lCLENBQW5COztBQXlDQSxJQUFJLG1CQUFKO0FBQUEsSUFBZ0Isb0JBQWhCO0FBQUEsSUFBNkIsa0JBQTdCOztBQUVBLE1BQU0sR0FBTixHQUFZOztBQUVYLE9BQU0sZ0JBQVk7QUFDakIsSUFBRSxxQkFBRixFQUF5QixJQUF6QixDQUE4QixZQUFZO0FBQ3pDLFFBQUssT0FBTDtBQUNBLE9BQUksS0FBSyxPQUFMLENBQWEsT0FBakIsRUFBMEIsS0FBSyxLQUFLLE9BQUwsQ0FBYSxPQUFsQjs7QUFFMUIsS0FBRSxJQUFGLEVBQVEsRUFBUixDQUFXLEVBQVgsRUFBZSxNQUFNLEdBQU4sQ0FBVSxLQUFLLE9BQUwsQ0FBYSxXQUF2QixDQUFmO0FBQ0EsT0FBSSxLQUFLLE9BQUwsQ0FBYSxhQUFqQixFQUFnQztBQUMvQixNQUFFLFFBQUYsRUFBWSxJQUFaLENBQWlCLFNBQWpCLEVBQTRCLEtBQUssT0FBTCxDQUFhLGFBQXpDLEVBQXdELE1BQU0sR0FBTixDQUFVLEtBQUssT0FBTCxDQUFhLFdBQXZCLENBQXhEO0FBQ0EsTUFBRSxPQUFPLGFBQVQsRUFBd0IsT0FBTyxXQUEvQixFQUE0QyxJQUE1QyxDQUFpRCxTQUFqRCxFQUE0RCxLQUFLLE9BQUwsQ0FBYSxhQUF6RSxFQUF3RixNQUFNLEdBQU4sQ0FBVSxLQUFLLE9BQUwsQ0FBYSxXQUF2QixDQUF4RjtBQUNBO0FBQ0QsR0FURDtBQVVBLEVBYlU7O0FBZVgsT0FBTSxnQkFBWTtBQUNqQixNQUFJLE1BQU0sYUFBTixDQUFvQixRQUF4QixFQUFrQztBQUNqQyxTQUFNLGFBQU4sQ0FBb0IsSUFBcEI7QUFDQSxHQUZELE1BRU87QUFDTixTQUFNLElBQU4sQ0FBVyxJQUFYO0FBQ0E7QUFDRCxRQUFNLE9BQU4sQ0FBYyxVQUFkO0FBQ0EsRUF0QlU7O0FBd0JYLE9BQU0sZ0JBQVk7QUFDakIsTUFBSSxNQUFNLGFBQU4sQ0FBb0IsUUFBeEIsRUFBa0M7QUFDakMsU0FBTSxhQUFOLENBQW9CLElBQXBCO0FBQ0EsR0FGRCxNQUVPO0FBQ04sU0FBTSxJQUFOLENBQVcsSUFBWDtBQUNBO0FBQ0QsUUFBTSxPQUFOLENBQWMsVUFBZDtBQUNBLEVBL0JVOztBQWlDWCxRQUFPLGlCQUFZO0FBQ2xCLElBQUUsMEJBQUYsRUFBOEIsR0FBOUIsQ0FBa0MsTUFBTSxPQUFOLENBQWMsaUJBQWQsRUFBbEM7QUFDQSxJQUFFLGlCQUFGLEVBQXFCLEtBQXJCO0FBQ0EsRUFwQ1U7O0FBc0NYLFdBQVUsb0JBQVk7QUFDckIsSUFBRSxTQUFGLEVBQWEsSUFBYixDQUFrQixPQUFsQixFQUEyQixLQUFLLE9BQUwsQ0FBYSxJQUF4QztBQUNBLEVBeENVOztBQTBDWCxlQUFjLHdCQUFZO0FBQ3pCLElBQUUsZ0JBQUYsRUFBb0IsV0FBcEIsQ0FBZ0MscUJBQWhDO0FBQ0EsUUFBTSxVQUFOLENBQWlCLE1BQWpCO0FBQ0EsRUE3Q1U7O0FBK0NYLFNBL0NXLHNCQStDQTtBQUNWLG9DQUFtQixPQUFuQixFQUE0QixNQUFNLE9BQU4sQ0FBYyxpQkFBZCxFQUE1QjtBQUNBLEVBakRVOzs7QUFtRFgsVUFBUyxtQkFBWTtBQUNwQixNQUFJLEVBQUUsYUFBRixFQUFpQixFQUFqQixDQUFvQixVQUFwQixDQUFKLEVBQXFDO0FBQ3BDLGdCQUFhLFlBQWI7QUFDQSxpQkFBYyxhQUFkO0FBQ0EsS0FBRSwyQkFBRixFQUErQixJQUEvQjtBQUNBLGVBQVksSUFBWjtBQUNBLEdBTEQsTUFLTyxJQUFJLEVBQUUsY0FBRixFQUFrQixFQUFsQixDQUFxQixVQUFyQixDQUFKLEVBQXNDO0FBQzVDLGdCQUFhLGFBQWI7QUFDQSxpQkFBYyxZQUFkO0FBQ0EsS0FBRSwyQkFBRixFQUErQixJQUEvQjtBQUNBLGVBQVksSUFBWjtBQUNBLEdBTE0sTUFLQTtBQUNOLGVBQVksS0FBWjtBQUNBLFdBQU0sVUFBTixFQUFvQixJQUFwQjtBQUNBLFdBQU0sV0FBTixFQUFxQixJQUFyQjtBQUNBOztBQUVELElBQUUsYUFBRixFQUFpQixNQUFqQjtBQUNBLElBQUUsZUFBRixFQUFtQixNQUFuQjtBQUNBLElBQUUsZ0JBQUYsRUFBb0IsV0FBcEIsQ0FBZ0MsU0FBaEM7QUFDQSxFQXZFVTs7QUF5RVgsYUFBWSxzQkFBWTtBQUN2QixvQ0FBaUIsUUFBakIsRUFEdUIsQ0FDSztBQUM1QixFQTNFVTs7QUE2RVgsa0JBQWlCLDJCQUFZO0FBQzVCLGVBQWEsS0FBSyxLQUFsQjs7QUFFQSxJQUFFLDJCQUFGLEVBQStCLElBQS9CLENBQW9DLFlBQVk7QUFDL0MsV0FBUSxFQUFFLElBQUYsQ0FBUjs7QUFFQSxTQUFNLElBQU47QUFDQSxPQUFJLE1BQU0sSUFBTixDQUFXLFFBQVgsRUFBcUIsT0FBckIsQ0FBNkIsVUFBN0IsSUFBMkMsQ0FBQyxDQUFoRCxFQUFtRCxNQUFNLElBQU47QUFDbkQsR0FMRDtBQU1BLEVBdEZVOztBQXdGWCx1QkFBc0IsZ0NBQVk7QUFDakMsSUFBRSxtQkFBRixFQUF1QixHQUF2QixDQUEyQixFQUEzQixFQUErQixLQUEvQjtBQUNBO0FBMUZVLENBQVo7O0FBNkZBLE1BQU0sV0FBTixHQUFvQjtBQUNuQixPQUFNLEtBRGE7QUFFbkIsUUFBTyxFQUZZOztBQUluQixPQUFNLGdCQUFZO0FBQ2pCLE9BQUssSUFBTCxHQUFZLEVBQUUseUJBQUYsRUFBNkIsSUFBN0IsQ0FBa0MsRUFBbEMsQ0FBWjs7QUFFQSxJQUFFLEtBQUssSUFBUCxFQUFhLEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsb0JBQXpCLEVBQStDLFVBQVUsQ0FBVixFQUFhO0FBQzNELFVBQU8sUUFBUCxDQUFnQixJQUFoQixTQUEyQixFQUFFLElBQUYsRUFBUSxPQUFSLENBQWdCLElBQWhCLEVBQXNCLElBQXRCLENBQTJCLE1BQTNCLENBQTNCO0FBQ0EsVUFBTyxRQUFQLENBQWdCLE1BQWhCO0FBQ0E7QUFDQSxVQUFPLEtBQVA7QUFDQSxHQUxEO0FBTUEsRUFia0I7O0FBZW5CLFFBZm1CLG1CQWVYLElBZlcsRUFlTDtBQUNiLFNBQU8sS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFQO0FBQ0EsRUFqQmtCOzs7QUFtQm5CLFVBQVMsaUJBQVUsSUFBVixFQUFnQixLQUFoQixFQUF1QixHQUF2QixFQUE0Qjs7QUFFcEMsT0FBSyxLQUFMLENBQVcsSUFBWCxJQUFtQjtBQUNsQixhQURrQjtBQUVsQixlQUZrQjtBQUdsQjtBQUhrQixHQUFuQjs7QUFNQSxPQUFLLElBQUwsQ0FBVSxNQUFWLENBQ0MsS0FBSyx3QkFBTCxFQUErQixFQUFFLFVBQUYsRUFBUSxZQUFSLEVBQWUsUUFBZixFQUEvQixDQUREO0FBRUEsRUE3QmtCOztBQStCbkIsV0FBVSxrQkFBVSxLQUFWLEVBQWlCO0FBQzFCLE9BQUssSUFBTCxJQUFhLEtBQWIsRUFBb0I7QUFDbkIsUUFBSyxPQUFMLENBQWEsTUFBTSxJQUFOLEVBQVksTUFBWixDQUFiLEVBQWtDLE1BQU0sSUFBTixFQUFZLE9BQVosQ0FBbEMsRUFBd0QsTUFBTSxJQUFOLEVBQVksS0FBWixDQUF4RDtBQUNBO0FBQ0QsRUFuQ2tCOztBQXFDbkIsZUFBYyxzQkFBVSxJQUFWLEVBQWdCLEdBQWhCLEVBQXFCLEtBQXJCLEVBQTRCLElBQTVCLEVBQWtDO0FBQy9DLElBQUUsaUJBQWlCLElBQWpCLEdBQXdCLFNBQTFCLEVBQXFDLEtBQUssSUFBMUMsRUFBZ0QsTUFBaEQsQ0FDQyxLQUFLLDZCQUFMLEVBQW9DLEVBQUUsVUFBRixFQUFRLFFBQVIsRUFBYSxZQUFiLEVBQXBDLENBREQ7QUFFQSxFQXhDa0I7O0FBMENuQixXQTFDbUIsc0JBMENSLElBMUNRLEVBMENGO0FBQ2hCLElBQUUsYUFBRixFQUFpQixLQUFLLElBQXRCLEVBQTRCLFdBQTVCLENBQXdDLFFBQXhDO0FBQ0EsSUFBRSxpQkFBaUIsSUFBakIsR0FBd0IsSUFBMUIsRUFBZ0MsS0FBSyxJQUFyQyxFQUEyQyxRQUEzQyxDQUFvRCxRQUFwRDtBQUNBLEVBN0NrQjs7O0FBK0NuQixXQUFVLGtCQUFVLElBQVYsRUFBZ0I7QUFDekIsSUFBRSxhQUFGLEVBQWlCLEtBQUssSUFBdEIsRUFBNEIsV0FBNUIsQ0FBd0MsUUFBeEM7QUFDQSxJQUFFLGlCQUFpQixJQUFqQixHQUF3QixJQUExQixFQUFnQyxLQUFLLElBQXJDLEVBQTJDLFFBQTNDLENBQW9ELFFBQXBEOztBQUVBLFFBQU0sT0FBTixDQUFjLE9BQWQsQ0FBc0IsS0FBSyxLQUFMLENBQVcsSUFBWCxFQUFpQixLQUFqQixDQUF0QjtBQUNBOztBQXBEa0IsQ0FBcEI7O2tCQXdEZSxLOzs7Ozs7OztBQ3BxQ2Y7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxhQUFhLFNBQWIsVUFBYTtBQUFBLFdBQU0sSUFBTjtBQUFBLENBQW5COztBQUVBO0FBQ0EsU0FBUyxTQUFULE9BQWtEO0FBQUEsUUFBN0IsSUFBNkIsUUFBN0IsSUFBNkI7QUFBQSwyQkFBdkIsTUFBdUI7QUFBQSxRQUF2QixNQUF1QiwrQkFBZCxVQUFjOztBQUM5QyxVQUFNLElBQU4sQ0FBVyxLQUFLLG9CQUFMLENBQTBCLElBQTFCLENBQVgsRUFDSyxNQURMLENBQ1ksTUFEWixFQUVLLE9BRkwsQ0FFYTtBQUFBLGVBQU8sSUFBSSxVQUFKLENBQWUsV0FBZixDQUEyQixHQUEzQixDQUFQO0FBQUEsS0FGYjtBQUdIOztBQUVELFNBQVMsZ0JBQVQsQ0FBMEIsRUFBMUIsRUFBOEI7QUFDMUIseUJBQVcsT0FBWCxDQUFtQixTQUFuQixFQUE4QixFQUE5QjtBQUNBLFdBQU8sRUFBUDtBQUNIOztBQUVELFNBQVMsYUFBVCxDQUF1QixFQUF2QixFQUEyQjtBQUN2QiwwQkFBRSxFQUFGLEVBQU0sSUFBTixDQUFXLGtDQUF1QixJQUF2QixDQUE0QixJQUE1QixDQUFYLEVBQThDLEtBQTlDO0FBQ0EsV0FBTyxFQUFQO0FBQ0g7O0FBRUQsU0FBUyxZQUFULENBQXNCLEVBQXRCLEVBQTBCLEtBQTFCLEVBQWlDO0FBQzdCLGFBQVMsc0JBQUUsbUJBQUYsRUFBdUIsSUFBdkIsQ0FBNEIsS0FBNUIsRUFBbUMsUUFBbkMsQ0FBNEMsc0JBQUUsRUFBRixFQUFNLElBQU4sQ0FBVyxNQUFYLENBQTVDLENBQVQ7QUFDQSxXQUFPLEVBQVA7QUFDSDs7QUFFRCxTQUFTLG1CQUFULENBQTZCLEVBQTdCLEVBQWlDO0FBQzdCLFFBQU0sUUFBUSxNQUFNLElBQU4sQ0FBVyxzQkFBRSxFQUFGLEVBQU0sSUFBTixDQUFXLHdCQUFYLENBQVgsRUFBc0MsTUFBdEMsQ0FBNkMsVUFBQyxJQUFELEVBQU8sT0FBUCxFQUFtQjtBQUMxRSxlQUFVLElBQVYsMEJBQ1UscUJBQWMsc0JBQUUsT0FBRixDQUFkLEVBQTBCLGVBQTFCLENBRFY7QUFFSCxLQUhhLEVBR1gsRUFIVyxDQUFkO0FBSUEsV0FBTyxhQUFhLEVBQWIsRUFBaUIsS0FBakIsQ0FBUDtBQUNIOztBQUVELFNBQVMsMkJBQVQsQ0FBcUMsRUFBckMsRUFBeUM7QUFDckMsMEJBQUUsRUFBRixFQUFNLElBQU4sQ0FBVywwQkFBWCxFQUE2QixJQUE3QixDQUFrQyxZQUFZO0FBQzFDLDhCQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsU0FBYixLQUEyQiw4QkFBdUIsSUFBdkIsQ0FBM0I7QUFDSCxLQUZEO0FBR0EsV0FBTyxFQUFQO0FBQ0g7O0FBRUQsU0FBUywyQkFBVCxDQUFxQyxFQUFyQyxFQUF5QztBQUNyQyxXQUFPLGFBQWEsRUFBYixFQUFpQixnQ0FBakIsQ0FBUDtBQUNIOztBQUVELFNBQVMsd0JBQVQsQ0FBa0MsRUFBbEMsRUFBc0M7QUFDbEMsV0FBTyxhQUFhLEVBQWIsRUFBaUIsMkJBQWpCLENBQVA7QUFDSDs7QUFFRCxTQUFTLHlCQUFULENBQW1DLEVBQW5DLEVBQXVDO0FBQ25DLDBCQUFFLEVBQUYsRUFBTSxJQUFOLENBQVcsK0JBQVgsRUFBaUMsSUFBakMsQ0FBc0MsWUFBWTtBQUM5Qyw4QkFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLFNBQWIsS0FBMkIsa0NBQXFCLElBQXJCLENBQTNCO0FBQ0gsS0FGRDtBQUdBLFdBQU8sRUFBUDtBQUNIOztRQUdHLGdCLEdBQUEsZ0I7UUFBa0IsYSxHQUFBLGE7UUFBZSxtQixHQUFBLG1CO1FBQXFCLDJCLEdBQUEsMkI7UUFDdEQsMkIsR0FBQSwyQjtRQUE2Qix3QixHQUFBLHdCO1FBQTBCLHlCLEdBQUEseUI7Ozs7Ozs7QUNsRTNEOzs7Ozs7QUFFQSxJQUFNLGFBQWEsQ0FDbEI7QUFDQyxPQUFNLFFBRFA7QUFFQyxTQUFRO0FBQUEsU0FBTyxJQUFJLFlBQUosQ0FBaUIsS0FBakIsS0FDWCxJQUFJLFlBQUosQ0FBaUIsS0FBakIsRUFBd0IsUUFBeEIsQ0FBaUMsb0JBQWpDLENBREk7QUFBQTtBQUZULENBRGtCLEVBTWxCO0FBQ0MsT0FBTSxNQURQO0FBRUMsU0FBUTtBQUFBLFNBQU8sSUFBSSxZQUFKLENBQWlCLEtBQWpCLEtBQTJCLFlBQTNCLEtBQ1YsSUFBSSxZQUFKLENBQWlCLE1BQWpCLEVBQXlCLFFBQXpCLENBQWtDLGlCQUFsQyxLQUNBLElBQUksWUFBSixDQUFpQixNQUFqQixFQUF5QixRQUF6QixDQUFrQyxrQ0FBbEMsQ0FEQSxJQUVELElBQUksWUFBSixDQUFpQixNQUFqQixFQUF5QixRQUF6QixDQUFrQyx1QkFBbEMsQ0FIVyxDQUFQO0FBQUE7QUFGVCxDQU5rQixFQWFsQjtBQUNDLE9BQU0sSUFEUDtBQUVDLFNBQVE7QUFBQSxTQUFPLHNCQUFFLEdBQUYsRUFBTyxRQUFQLENBQWdCLGlCQUFoQixLQUNYLHNCQUFFLEdBQUYsRUFBTyxRQUFQLENBQWdCLGVBQWhCLENBREk7QUFBQTtBQUZULENBYmtCLENBQW5COztrQkFvQmUsVTs7Ozs7Ozs7QUN0QmY7O0FBQ0E7Ozs7OztBQUVBLFNBQVMsY0FBVCxDQUF3QixJQUF4QixFQUE4QjtBQUMxQixXQUFPLHNCQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsU0FBYixFQUEyQix3QkFBM0IsWUFBUDtBQUNIOztRQUVRLGMsR0FBQSxjOzs7Ozs7O0FDUFQ7O0FBRUEsSUFBSSxRQUFRLENBQVo7O0FBRUEsU0FBUyxRQUFULENBQWtCLElBQWxCLEVBQXdCLEtBQXhCLEVBQStCO0FBQzNCLFFBQU0sS0FBSyxLQUFLLElBQUwsQ0FBVSxJQUFWLE1BQW9CLEtBQUssSUFBTCxDQUFVLElBQVYsWUFBd0IsT0FBeEIsR0FBb0MsS0FBSyxJQUFMLENBQVUsSUFBVixDQUF4RCxDQUFYO0FBQ0EsUUFBTSxNQUFNLEtBQUssSUFBTCxDQUFVLG1CQUFWLENBQVo7QUFDQSxvQ0FDZ0IsR0FEaEIsc0JBRU0sTUFBTSxRQUFOLENBQWUsR0FBZixFQUFvQixVQUFwQixDQUErQixHQUEvQixDQUFtQyxlQUFPO0FBQ3hDLGtDQUF3QixJQUFJLFVBQTVCLG1CQUFvRCxJQUFJLEtBQXhELG1CQUEwRSxJQUFJLEtBQUosR0FBWSxJQUFJLEtBQWhCLEdBQXdCLElBQWxHO0FBQ0gsS0FGQyxFQUVDLElBRkQsQ0FFTSxHQUZOLENBRk4scUNBTWlCLEdBTmpCLDRDQU80QixHQVA1QixpR0FXYyxHQVhkLHFDQVdnRCxFQVhoRCwwQ0FZMEIsR0FaMUIscUJBWTZDLEdBWjdDLDJCQWFhLEdBYmI7QUFlSDs7a0JBRWMsUTs7Ozs7Ozs7QUN4QmY7O0FBRUEsSUFBTSxlQUFlLFlBQXJCO0FBQ0EsU0FBUyxRQUFULEdBQW9CO0FBQ2hCLGlGQUM2RCxtQkFEN0Qsa0JBQ3FGLG1CQURyRiwrQkFFZSxZQUZmO0FBaUJIOztRQUVRLFEsR0FBQSxRO1FBQVUsWSxHQUFBLFk7Ozs7Ozs7QUN2Qm5COztBQUNBOztBQUVBLFNBQVMsUUFBVCxHQUFvQjtBQUNoQix3R0FFa0Msd0JBRmxDLDJEQUdpQyx1QkFIakMseVNBV2lDLGtDQVhqQyxxRkFhaUMsZUFiakMsa0pBZ0JpRSxlQWhCakU7QUF5Qkg7O2tCQUVjLFE7Ozs7Ozs7O0FDL0JmOztBQUNBOzs7Ozs7QUFFQSxJQUFNLHNCQUFvQixtQkFBcEIsTUFBTjtBQUNBLElBQU0seUJBQXlCLENBQUMsYUFBRCxDQUEvQjtBQUNBLElBQU0sZ0NBQThCLHdCQUE5QixNQUFOO0FBQ0EsSUFBTSxtQ0FBaUMsb0JBQWpDLE1BQU47QUFDQSxJQUFNLGlCQUFpQixDQUFDLGFBQUQsRUFBZ0IsSUFBaEIsQ0FBcUIsSUFBckIsQ0FBdkI7O0FBRUEsU0FBUyxlQUFULENBQXlCLElBQXpCLEVBQStCO0FBQzNCLFFBQU0sVUFBVSxzQkFBRSxJQUFGLEVBQVEsT0FBUixDQUFnQixjQUFoQixDQUFoQjtBQUNBLFdBQU8sUUFBUSxNQUFSLEdBQWlCLFFBQVEsQ0FBUixDQUFqQixHQUE4QixJQUFyQztBQUNIOztRQUdHLHNCLEdBQUEsc0I7UUFBd0IsYSxHQUFBLGE7UUFBZSx1QixHQUFBLHVCO1FBQXlCLG9CLEdBQUEsb0I7UUFDaEUsYyxHQUFBLGM7UUFBZ0IsZSxHQUFBLGU7Ozs7Ozs7QUNoQnBCOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTSxTQUFTLEVBQWY7QUFDQSxJQUFJLFFBQVEsQ0FBWjtBQUNBLFNBQVMsc0JBQVQsQ0FBZ0MsSUFBaEMsRUFBc0MsT0FBdEMsRUFBK0M7QUFDM0M7QUFDQTtBQUNBLFdBQU8sc0JBQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxtQkFBYixDQUFQLEVBQWtDLEdBQWxDLENBQXNDLGFBQXRDLENBQW9ELE9BQXBEO0FBQ0Esc0JBQU0sVUFBTixDQUFpQixNQUFqQixDQUF3QixnQkFBeEI7QUFDSDs7QUFFRCxJQUFNLFFBQVE7QUFDVixXQUFPLENBQUMsT0FBRCxDQURHO0FBRVYsYUFBUyxDQUFDLE9BQUQsQ0FGQztBQUdWLFdBQU8saUJBSEc7QUFJVixVQUFNLFNBSkk7QUFLVixvQkFBYyx1QkFBZCw4SEFMVTtBQU1WLFVBTlUsa0JBTUgsSUFORyxFQU1HO0FBQ1QsOEJBQUUsSUFBRixFQUNLLEdBREwsQ0FDUztBQUNELG9CQUFRLG1CQURQO0FBRUQsbUJBQU8sTUFGTjtBQUdELHNCQUFVLEVBSFQ7QUFJRCxrQkFBTSxFQUpMO0FBS0QsaUJBQUssRUFMSjtBQU1ELHVCQUFXO0FBTlYsU0FEVCxFQVNLLFdBVEwsQ0FTaUIsV0FUakI7QUFVQSwwQkFBTSxPQUFOLENBQWMsU0FBZCxDQUF3QixJQUF4QixDQUE2Qiw0RUFBN0IsRUFBMkcsTUFBM0csQ0FBa0gsc0JBQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxXQUFiLENBQWxIO0FBQ0EsOEJBQUUsSUFBRixFQUFRLE1BQVI7QUFDSCxLQW5CUztBQW9CVixZQXBCVSxvQkFvQkQsR0FwQkMsRUFvQkk7QUFDVixlQUFPLE9BQU8sR0FBUCxDQUFQO0FBQ0gsS0F0QlM7O0FBdUJWLGdCQUFZLG9CQUFVLElBQVYsRUFBZ0I7QUFBQTtBQUFBOztBQUN4Qiw4QkFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixvQkFBcEI7QUFDQSxZQUFJLENBQUMsc0JBQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxtQkFBYixDQUFMLEVBQWdDO0FBQzVCLGdCQUFNLEtBQUssT0FBWDtBQUNBLGtDQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsbUJBQWIsRUFBMEIsRUFBMUI7QUFDQSxtQkFBTyxFQUFQLElBQWE7QUFDVCw0QkFBWSxDQUNSLEVBQUUsWUFBWSxRQUFkLEVBQXdCLE9BQU8sT0FBL0IsRUFBd0MsT0FBTyxFQUEvQyxFQURRLEVBRVIsRUFBRSxZQUFZLFFBQWQsRUFBd0IsT0FBTyxPQUEvQixFQUF3QyxPQUFPLEVBQS9DLEVBRlEsRUFHUixFQUFFLFlBQVksUUFBZCxFQUF3QixPQUFPLE9BQS9CLEVBQXdDLE9BQU8sRUFBL0MsRUFIUSxDQURIO0FBTVQsK0JBQWUsS0FOTjtBQU9ULDhCQUFjO0FBUEwsYUFBYjtBQVNBLGlCQUFLLFNBQVMsY0FBVCxDQUF3QixVQUF4QixFQUFvQyxhQUFwQyxDQUFrRCxNQUFuRCxDQUEyRCxJQUEvRCxFQUFvRSxJQUFwRSxFQUEwRSxPQUFPLEVBQVAsQ0FBMUU7QUFDQSxtQkFBTyxFQUFQLEVBQVcsR0FBWCxDQUFlLFVBQWYsQ0FBMEIsRUFBMUI7QUFDSDtBQUNELFlBQUksSUFBSSxDQUFSO0FBQ0EsWUFBTSxhQUFhLE9BQU8sc0JBQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxtQkFBYixDQUFQLEVBQWtDLFVBQWxDLENBQTZDLE1BQTdDLENBQW9ELFVBQUMsSUFBRCxFQUFPLEdBQVAsRUFBZTtBQUNsRjtBQUNBLGlCQUFLLElBQUwsQ0FBVTtBQUNOLHNCQUFNLFlBQVksQ0FEWjtBQUVOLHFCQUFLLFdBQVcsQ0FGVjtBQUdOO0FBQ0EsNEJBQVksS0FKTjtBQUtOLDJCQUFXLHNCQUxMO0FBTU4sc0JBQU07QUFDRix3QkFBSSxpQkFERjtBQUVGLGdDQUFZLElBQUksVUFGZDtBQUdGLDJCQUFPLElBQUksS0FIVDtBQUlGLDJCQUFPLElBQUk7QUFKVCxpQkFOQTtBQVlOLDBCQUFVLGtCQUFVLElBQVYsRUFBZ0IsS0FBaEIsRUFBdUIsS0FBdkIsRUFBOEI7QUFDcEMsd0JBQU0sV0FBVyxTQUFTLEtBQUssR0FBTCxDQUFTLE1BQVQsQ0FBZ0IsU0FBUyxNQUF6QixDQUFULElBQTZDLENBQTlEO0FBQ0Esd0JBQUksVUFBVSxPQUFPLHNCQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsbUJBQWIsQ0FBUCxFQUFrQyxVQUFoRDtBQUNBLHdCQUFJLE1BQU0sUUFBTixJQUFrQixRQUF0QixFQUFnQztBQUM1QixrQ0FBVSxRQUNMLE1BREssQ0FDRSxVQUFDLEtBQUQsRUFBUSxLQUFSO0FBQUEsbUNBQWtCLFNBQVMsUUFBM0I7QUFBQSx5QkFERixDQUFWO0FBRUEsK0JBQU8sc0JBQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxtQkFBYixDQUFQLEVBQWtDLFVBQWxDLEdBQStDLE9BQS9DO0FBQ0EsK0NBQXVCLElBQXZCLEVBQTZCLE9BQTdCO0FBQ0gscUJBTEQsTUFLTztBQUNILDRCQUFJLE1BQU0sSUFBTixJQUFjLE9BQWxCLEVBQTJCO0FBQ3ZCLG9DQUFRLFFBQVIsRUFBa0IsTUFBTSxJQUF4QixJQUFnQyxTQUFTLFNBQVMsS0FBVCxDQUF6QztBQUNILHlCQUZELE1BRU87QUFDSCxvQ0FBUSxRQUFSLEVBQWtCLE1BQU0sSUFBeEIsSUFBZ0MsS0FBaEM7QUFDSDtBQUNEO0FBQ0EsK0JBQU8sc0JBQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxtQkFBYixDQUFQLEVBQWtDLEdBQWxDLENBQXNDLGFBQXRDLENBQW9ELE9BQXBEO0FBQ0g7QUFDRCwyQkFBTyxJQUFQO0FBQ0g7QUE5QkssYUFBVjtBQWdDQSxtQkFBTyxJQUFQO0FBQ0gsU0FuQ2tCLEVBbUNoQixFQW5DZ0IsQ0FBbkI7O0FBcUNBLGFBQUssVUFBTCxHQUFrQixLQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsQ0FBdUI7QUFBQSxtQkFBWSxTQUFTLEdBQVQsQ0FBYSxPQUFiLENBQXFCLFFBQXJCLE1BQW1DLENBQUMsQ0FBaEQ7QUFBQSxTQUF2QixDQUFsQjtBQUNBLDRCQUFLLFVBQUwsRUFBZ0IsT0FBaEIsdUNBQTJCLFVBQTNCOztBQUVBLGVBQU8sSUFBUDtBQUNILEtBbEZTO0FBbUZWLGdCQUFZLENBQ1I7QUFDSSxjQUFNLE9BRFY7QUFFSSxhQUFLLE9BRlQ7QUFHSSxrQkFBVSxPQUhkO0FBSUkscUJBQWEsQ0FBQyxzQkFBRCxFQUF5QixpQkFBekIsRUFBNEMsZUFBNUMsRUFBNkQsb0JBQTdELEVBQ1QsZUFEUyxFQUNRLGdCQURSLEVBQzBCLG1CQUQxQixDQUpqQjtBQU1JLG1CQUFXLG1CQU5mO0FBT0ksa0JBQVUsa0JBQVUsSUFBVixFQUFnQixLQUFoQixFQUF1QjtBQUM3QixpQkFBSyxXQUFMLENBQWlCLEtBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixHQUF0QixDQUFqQjtBQUNBLGlCQUFLLFFBQUwsQ0FBYyxLQUFkOztBQUVBO0FBQ0EsZ0JBQU0sY0FBYyxPQUFPLEtBQUssSUFBTCxDQUFVLG1CQUFWLENBQVAsQ0FBcEI7QUFDQSx3QkFBWSxHQUFaLENBQWdCLGVBQWhCO0FBQ0Esd0JBQVksR0FBWixDQUFnQixVQUFoQjtBQUNBLHdCQUFZLEdBQVosQ0FBZ0IsYUFBaEI7QUFDQSx3QkFBWSxHQUFaLENBQWdCLGdCQUFoQjtBQUNILFNBakJMO0FBa0JJLGNBQU07QUFDRixxQkFBUyxDQUFDO0FBQ04sdUJBQU8sU0FERDtBQUVOLHNCQUFNO0FBRkEsYUFBRCxFQUdOO0FBQ0MsdUJBQU8saUJBRFI7QUFFQyxzQkFBTTtBQUZQLGFBSE0sRUFNTjtBQUNDLHVCQUFPLHNCQURSO0FBRUMsc0JBQU07QUFGUCxhQU5NLEVBU047QUFDQyx1QkFBTyxlQURSO0FBRUMsc0JBQU07QUFGUCxhQVRNLEVBWU47QUFDQyx1QkFBTyxvQkFEUjtBQUVDLHNCQUFNO0FBRlAsYUFaTSxFQWVOO0FBQ0MsdUJBQU8sZUFEUjtBQUVDLHNCQUFNO0FBRlAsYUFmTSxFQWtCTjtBQUNDLHVCQUFPLGdCQURSO0FBRUMsc0JBQU07QUFGUCxhQWxCTSxFQXFCTjtBQUNDLHVCQUFPLG1CQURSO0FBRUMsc0JBQU07QUFGUCxhQXJCTTtBQURQO0FBbEJWLEtBRFEsRUErQ1I7QUFDSSxjQUFNLEVBRFY7QUFFSSxhQUFLLFVBRlQ7QUFHSSxtQkFBVyxtQkFIZjtBQUlJLGNBQU0sRUFBRSxNQUFNLFlBQVIsRUFKVjtBQUtJLGtCQUFVLGtCQUFVLElBQVYsRUFBZ0I7QUFDdEIsZ0JBQU0sVUFBVSxPQUFPLHNCQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsbUJBQWIsQ0FBUCxFQUFrQyxVQUFsRDtBQUNBLG9CQUFRLElBQVIsQ0FBYTtBQUNULDRCQUFZLFFBREg7QUFFVCx1QkFBTyxPQUZFO0FBR1QsdUJBQU87QUFIRSxhQUFiOztBQU1BLG1DQUF1QixJQUF2QixFQUE2QixPQUE3QjtBQUNBLG1CQUFPLElBQVA7QUFDSDtBQWZMLEtBL0NRO0FBbkZGLENBQWQ7O2tCQXFKZSxLOzs7Ozs7O0FDbktmOzs7Ozs7QUFFQSxTQUFTLGFBQVQsQ0FBdUIsSUFBdkIsRUFBcUM7QUFDakMsUUFBTSxLQUFLLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFYO0FBQ0EsT0FBRyxTQUFILEdBQWUsSUFBZjs7QUFGaUMsc0NBQUwsR0FBSztBQUFMLFdBQUs7QUFBQTs7QUFHakMsUUFBSSxNQUFKLENBQVcsVUFBQyxFQUFELEVBQUssRUFBTDtBQUFBLGVBQVksR0FBRyxFQUFILENBQVo7QUFBQSxLQUFYLEVBQStCLEVBQS9CO0FBQ0EsV0FBTyxzQkFBRSxFQUFGLEVBQU0sSUFBTixDQUFXLFdBQVgsQ0FBUDtBQUNIOztrQkFFYyxhOzs7Ozs7QUNUZjtBQUNBLFNBQVMsZ0JBQVQsQ0FBMEIsUUFBMUIsRUFBb0M7QUFDaEMsUUFBSSxTQUFTLGVBQVQsQ0FBeUIsaUJBQTdCLEVBQWdEOztBQUU1QyxZQUFJLFNBQVMsaUJBQWIsRUFDSSxTQUFTLGNBQVQsR0FESixLQUdJLFNBQVMsZUFBVCxDQUF5QixpQkFBekI7QUFDSjtBQUNILEtBUEQsTUFPTyxJQUFJLFNBQVMsZUFBVCxDQUF5QixvQkFBN0IsRUFBbUQ7O0FBRXRELFlBQUksU0FBUyxvQkFBYixFQUNJLFNBQVMsbUJBQVQsR0FESixLQUdJLFNBQVMsZUFBVCxDQUF5QixvQkFBekI7QUFDSjtBQUNILEtBUE0sTUFPQSxJQUFJLFNBQVMsZUFBVCxDQUF5Qix1QkFBN0IsRUFBc0Q7O0FBRXpELFlBQUksU0FBUyx1QkFBYixFQUNJLFNBQVMsb0JBQVQsR0FESixLQUdJLFNBQVMsZUFBVCxDQUF5Qix1QkFBekI7QUFDSjtBQUNILEtBUE0sTUFPQSxJQUFJLFNBQVMsZUFBVCxDQUF5QixtQkFBN0IsRUFBa0Q7O0FBRXJELFlBQUksU0FBUyxtQkFBYixFQUNJLFNBQVMsZ0JBQVQsR0FESixLQUdJLFNBQVMsZUFBVCxDQUF5QixtQkFBekI7QUFDUDtBQUNKOztRQUVRLGdCLEdBQUEsZ0I7Ozs7OztBQ2hDVCxTQUFTLGtCQUFULENBQTRCLFFBQTVCLEVBQXNDLElBQXRDLEVBQTRDO0FBQ3hDLFFBQU0sVUFBVSxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBaEI7QUFDQSxZQUFRLFlBQVIsQ0FBcUIsTUFBckIsb0NBQTZELG1CQUFtQixJQUFuQixDQUE3RDtBQUNBLFlBQVEsWUFBUixDQUFxQixVQUFyQixFQUFpQyxRQUFqQzs7QUFFQSxZQUFRLEtBQVIsQ0FBYyxPQUFkLEdBQXdCLE1BQXhCO0FBQ0EsYUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixPQUExQjs7QUFFQSxZQUFRLEtBQVI7O0FBRUEsYUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixPQUExQjtBQUNIOztRQUVRLGtCLEdBQUEsa0I7Ozs7OztBQ2JULFNBQVMsUUFBVCxDQUFrQixFQUFsQixFQUFzQixTQUF0QixFQUFpQztBQUM3QixZQUFRLEVBQVI7QUFDQTtBQUNBLFFBQUksR0FBRyxLQUFILElBQVksR0FBRyxLQUFILENBQVMsTUFBVCxHQUFrQixDQUE5QixJQUFtQyxHQUFHLEtBQUgsQ0FBUyxTQUFULENBQXZDLEVBQTJEO0FBQ3ZELFlBQUksUUFBUSxHQUFHLEtBQUgsQ0FBUyxTQUFULENBQVosQ0FESixLQUdJLElBQUksR0FBRyxZQUFQLEVBQXFCO0FBQ2pCLFlBQUksUUFBUSxHQUFHLFlBQUgsQ0FBZ0IsU0FBaEIsQ0FBWixDQURKLEtBRUssSUFBSSxPQUFPLGdCQUFYLEVBQTZCO0FBQzlCLFlBQUksUUFBUSxTQUFTLFdBQVQsQ0FBcUIsdUJBQXJCLEdBQ1IsU0FBUyxXQUFULENBQXFCLHVCQUFyQixDQUE2QyxFQUE3QyxFQUFpRCxJQUFqRCxFQUF1RCxnQkFBdkQsQ0FBd0UsU0FBeEUsQ0FEUSxHQUVSLE9BQU8sZ0JBQVAsQ0FBd0IsRUFBeEIsRUFBNEIsSUFBNUIsRUFBa0MsZ0JBQWxDLENBQW1ELFNBQW5ELENBRko7QUFHSDs7QUFFTCxXQUFPLEtBQVA7QUFDSDs7UUFFUSxRLEdBQUEsUTs7Ozs7Ozs7QUNqQlQ7O0FBQ0E7Ozs7OztBQUVBLElBQU0sOEJBQTRCLHNCQUE1QixNQUFOO0FBQ0EsSUFBTSxxQ0FBbUMsc0JBQW5DLGVBQU47QUFDQTtBQUNBLFNBQVMsaUJBQVQsQ0FBMkIsSUFBM0IsRUFBaUM7QUFDN0IsV0FBTyxzQkFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLHNCQUFiLENBQVA7QUFDSDs7QUFFRCxTQUFTLDJCQUFULENBQXFDLElBQXJDLEVBQTJDO0FBQ3ZDLFdBQU8sa0JBQWtCLElBQWxCLEVBQXdCLE9BQXhCLENBQWdDLElBQWhDLEVBQXNDLEdBQXRDLENBQVA7QUFDSDs7QUFFRCxTQUFTLGlCQUFULENBQTJCLElBQTNCLEVBQWlDLFFBQWpDLEVBQTJDO0FBQ3ZDLDBCQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsc0JBQWIsRUFBNkIsS0FBSyxTQUFMLENBQWUsUUFBZixFQUF5QixPQUF6QixDQUFpQyxJQUFqQyxFQUF1QyxJQUF2QyxDQUE3QjtBQUNIOztBQUVELFNBQVMsY0FBVCxDQUF3QixJQUF4QixFQUE4QjtBQUMxQixXQUFPLHNCQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsU0FBYixtQkFBdUMsa0JBQWtCLElBQWxCLENBQXZDLE9BQVA7QUFDSDs7QUFFRCxTQUFTLG1CQUFULENBQTZCLElBQTdCLEVBQW1DO0FBQy9CLFdBQU8sS0FBSyxLQUFMLENBQVcsNEJBQTRCLElBQTVCLENBQVgsQ0FBUDtBQUNIOztBQUVELFNBQVMsVUFBVCxDQUFvQixJQUFwQixFQUEwQjtBQUN0QixXQUFPLG9CQUFvQixJQUFwQixFQUEwQixPQUFqQztBQUNIOztBQUVELFNBQVMsbUJBQVQsQ0FBNkIsSUFBN0IsRUFBbUM7QUFDL0IsUUFBTSxTQUFTLHNCQUFFLElBQUYsRUFBUSxVQUFSLENBQW1CLFNBQW5CLEVBQThCLEtBQTlCLEVBQWY7QUFDQSwwQkFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixNQUFwQjtBQUNBLFdBQU8sTUFBUDtBQUNIOztBQUVELFNBQVMsaUNBQVQsQ0FBMkMsT0FBM0MsRUFBb0QsT0FBcEQsRUFBNkQ7QUFDekQsUUFBSSxDQUFDLHNCQUFFLE9BQUYsRUFBVyxFQUFYLENBQWMsdUJBQWQsQ0FBTCxFQUE2QztBQUN6QyxnQkFBUSxJQUFSLENBQWEsdUJBQWIsRUFBc0MsSUFBdEMsQ0FBMkMsWUFBWTtBQUNuRCxnQ0FBb0IsSUFBcEI7QUFDSCxTQUZEO0FBR0g7QUFDSjs7UUFHRyxpQyxHQUFBLGlDO1FBQW1DLG1CLEdBQUEsbUI7UUFDbkMsZ0IsR0FBQSxnQjtRQUFrQix1QixHQUFBLHVCO1FBQ2xCLGlCLEdBQUEsaUI7UUFBbUIsVSxHQUFBLFU7UUFBWSxtQixHQUFBLG1CO1FBQy9CLGMsR0FBQSxjO1FBQWdCLGlCLEdBQUEsaUI7Ozs7Ozs7O0FDL0JwQjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztRQUdDLEssR0FBQSxlO1FBQU8sUyxHQUFBLG1CO1FBQVcsYSxHQUFBLHVCO1FBQWUsVyxHQUFBLHFCO1FBQWEsUyxHQUFBLG1CO1FBQVcsVSxHQUFBLG9CO1FBQVksVyxHQUFBLHFCO1FBQWEsWSxHQUFBLHNCO1FBQ2xGLFUsR0FBQSxvQjtRQUFZLGdCLEdBQUEsMEI7UUFBa0IsVyxHQUFBLHFCO1FBQWEsYyxHQUFBLHdCO1FBQWdCLGUsR0FBQSx5QjtRQUFpQixhLEdBQUEsdUI7UUFBZSxTLEdBQUEsbUI7UUFDM0YsYyxHQUFBLHdCO1FBQWdCLFcsR0FBQSxxQjtRQUFhLFksR0FBQSxzQjtRQUFjLFMsR0FBQSxtQjtRQUFXLFUsR0FBQSxvQjtRQUFZLGUsR0FBQSx5QixFQTFDbkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxpQkFBaUIsaUJBQUUsTUFBRixDQUFTLEVBQVQsRUFBYSxtQkFBYixFQUF3Qjs7QUFFOUMsU0FBUSxDQUNQLENBQUMsT0FBRCxFQUFVLFVBQVYsRUFBc0IsT0FBdEIsQ0FETyxDQUZzQzs7QUFNOUMsV0FBVSxrQkFBVSxLQUFWLEVBQWlCO0FBQzFCLHdCQUFFLE9BQUYsRUFBVyxLQUFLLE9BQWhCLEVBQXlCLEdBQXpCLENBQTZCLEtBQTdCO0FBQ0EsRUFSNkM7O0FBVTlDLE9BQU0sY0FBVSxJQUFWLEVBQWdCO0FBQ3JCLFNBQU8sS0FBSyxNQUFMLENBQVksV0FBWixFQUF5QixJQUF6QixDQUFQO0FBQ0E7QUFaNkMsQ0FBeEIsQ0FBdkI7O2tCQWdCZSxjOzs7Ozs7O0FDbkJmOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sY0FBYyxpQkFBRSxNQUFGLENBQVMsRUFBVCxFQUFhLG1CQUFiLEVBQXdCOztBQUUzQyxXQUFVLGtCQUFVLEtBQVYsRUFBaUIsSUFBakIsRUFBdUI7QUFDaEMsTUFBSSxNQUFNLElBQU4sSUFBYyxNQUFNLElBQU4sQ0FBVyxPQUE3QixFQUFzQztBQUNyQyxTQUFNLElBQU4sQ0FBVyxPQUFYLENBQW1CLE9BQW5CLENBQTJCLGdCQUEzQixFQUE2QyxDQUFDLEtBQUssT0FBTCxHQUFlLEtBQUssWUFBTCxDQUFrQixlQUFsQixDQUFmLEdBQW9ELEtBQUssWUFBTCxDQUFrQixnQkFBbEIsQ0FBckQsRUFBMEYsSUFBMUYsQ0FBN0M7QUFDQTtBQUNELEVBTjBDOztBQVEzQyxTQUFRLENBQ1AsQ0FBQyxRQUFELEVBQVcsVUFBWCxFQUF1QixPQUF2QixDQURPLENBUm1DOztBQVkzQyxXQUFVLGtCQUFVLEtBQVYsRUFBaUI7QUFDMUIsd0JBQUUsT0FBRixFQUFXLEtBQUssT0FBaEIsRUFBeUIsR0FBekIsQ0FBNkIsS0FBN0I7QUFDQSxFQWQwQzs7QUFnQjNDLE9BQU0sY0FBVSxJQUFWLEVBQWdCO0FBQ3JCLFNBQU8sS0FBSyxNQUFMLENBQVksUUFBWixFQUFzQixJQUF0QixDQUFQO0FBQ0E7QUFsQjBDLENBQXhCLENBQXBCOztrQkFzQmUsVzs7Ozs7OztBQ3pCZjs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLGlCQUFpQixpQkFBRSxNQUFGLENBQVMsRUFBVCxFQUFhLGVBQWIsRUFBb0I7QUFDMUMsU0FBUSxDQUNQLENBQUMsT0FBRCxFQUFVLFVBQVYsRUFBc0IsT0FBdEIsQ0FETyxFQUVQLENBQUMsT0FBRCxFQUFVLFVBQVYsRUFBc0IsUUFBdEIsQ0FBK0IsWUFBL0IsQ0FGTyxDQURrQzs7QUFPMUMsV0FBVSxrQkFBVSxLQUFWLEVBQWlCO0FBQzFCLHdCQUFFLE9BQUYsRUFBVyxLQUFLLE9BQWhCLEVBQXlCLEdBQXpCLENBQTZCLEtBQTdCO0FBQ0EsRUFUeUM7O0FBVzFDLE9BQU0sY0FBVSxJQUFWLEVBQWdCO0FBQ3JCLFNBQU8sS0FBSyxNQUFMLENBQVksV0FBWixFQUF5QixJQUF6QixDQUFQO0FBQ0E7O0FBYnlDLENBQXBCLENBQXZCOztrQkFrQmUsYzs7Ozs7OztBQ3JCZjs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLGNBQWMsaUJBQUUsTUFBRixDQUFTLEVBQVQsRUFBYSxlQUFiLEVBQW9COztBQUVwQyxZQUFRLENBQ0osQ0FBQyxRQUFELEVBQVcsVUFBWCxFQUF1QixRQUF2QixDQURJLENBRjRCOztBQU9wQyxjQUFVLGtCQUFVLEtBQVYsRUFBaUI7QUFDdkIsOEJBQUUsUUFBRixFQUFZLEtBQUssT0FBakIsRUFBMEIsR0FBMUIsQ0FBOEIsS0FBOUI7QUFDSCxLQVRtQzs7QUFXcEMsVUFBTSxjQUFVLElBQVYsRUFBZ0I7QUFDbEIsZUFBTyxLQUFLLE1BQUwsQ0FBWSxRQUFaLEVBQXNCLElBQXRCLENBQVA7QUFDSDs7QUFibUMsQ0FBcEIsQ0FBcEI7O2tCQWtCZSxXOzs7Ozs7O0FDckJmOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sZUFBZSxpQkFBRSxNQUFGLENBQVMsRUFBVCxFQUFhLGVBQWIsRUFBb0I7O0FBRXhDLFNBQVEsQ0FDUCxDQUFDLE9BQUQsRUFBVSxVQUFWLEVBQXNCLFFBQXRCLENBQStCLFlBQS9CLENBRE8sQ0FGZ0M7O0FBT3hDLFdBQVUsa0JBQVUsS0FBVixFQUFpQjtBQUMxQixTQUFPLEtBQVA7QUFDQSxFQVR1Qzs7QUFXeEMsT0FBTSxjQUFVLElBQVYsRUFBZ0I7QUFDckIsU0FBTyxLQUFLLE1BQUwsQ0FBWSxjQUFaLEVBQTRCLElBQTVCLENBQVA7QUFDQTs7QUFidUMsQ0FBcEIsQ0FBckI7O2tCQWtCZSxZOzs7Ozs7O0FDckJmOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sYUFBYSxpQkFBRSxNQUFGLENBQVMsRUFBVCxFQUFhLGVBQWIsRUFBb0I7O0FBRXRDLFNBQVEsQ0FDUCxDQUFDLFFBQUQsRUFBVyxVQUFYLEVBQXVCLE9BQXZCLENBRE8sQ0FGOEI7O0FBTXRDLFdBQVUsa0JBQVUsS0FBVixFQUFpQjtBQUMxQix3QkFBRSxPQUFGLEVBQVcsS0FBSyxPQUFoQixFQUF5QixHQUF6QixDQUE2QixLQUE3QjtBQUNBLEVBUnFDOztBQVV0QyxPQUFNLGNBQVUsSUFBVixFQUFnQjtBQUNyQixTQUFPLEtBQUssTUFBTCxDQUFZLFlBQVosRUFBMEIsSUFBMUIsQ0FBUDtBQUNBO0FBWnFDLENBQXBCLENBQW5COztrQkFnQmUsVTs7Ozs7OztBQ25CZjs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLG1CQUFtQixpQkFBRSxNQUFGLENBQVMsRUFBVCxFQUFhLG9CQUFiLEVBQXlCOztBQUU5QyxVQUFNLGNBQVUsSUFBVixFQUFnQjtBQUNsQixlQUFPLEtBQUssTUFBTCxDQUFZLGtCQUFaLEVBQWdDLElBQWhDLENBQVA7QUFDSDtBQUo2QyxDQUF6QixDQUF6Qjs7a0JBUWUsZ0I7Ozs7Ozs7QUNYZjs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLGFBQWEsaUJBQUUsTUFBRixDQUFTLEVBQVQsRUFBYSxlQUFiLEVBQW9COztBQUV0QyxXQUFVLGtCQUFVLEtBQVYsRUFBaUIsSUFBakIsRUFBdUI7O0FBRWhDLE1BQUksTUFBTSxJQUFOLElBQWMsTUFBTSxJQUFOLENBQVcsT0FBN0IsRUFBc0M7QUFDckMsU0FBTSxJQUFOLENBQVcsT0FBWCxDQUFtQixPQUFuQixDQUEyQixnQkFBM0IsRUFBNkMsQ0FBQyxLQUFLLEtBQU4sRUFBYSxJQUFiLENBQTdDO0FBQ0E7QUFDRCxFQVBxQzs7QUFTdEMsU0FBUSxDQUNQLENBQUMsUUFBRCxFQUFXLFVBQVgsRUFBdUIsT0FBdkIsQ0FETyxDQVQ4Qjs7QUFhdEMsV0FBVSxrQkFBVSxLQUFWLEVBQWlCO0FBQzFCLHdCQUFFLE9BQUYsRUFBVyxLQUFLLE9BQWhCLEVBQXlCLFVBQXpCLENBQW9DLFNBQXBDO0FBQ0EsTUFBSSxLQUFKLEVBQ0Msc0JBQUUsaUJBQWlCLEtBQWpCLEdBQXlCLEdBQTNCLEVBQWdDLEtBQUssT0FBckMsRUFBOEMsSUFBOUMsQ0FBbUQsU0FBbkQsRUFBOEQsSUFBOUQ7QUFDRCxFQWpCcUM7O0FBbUJ0QyxPQUFNLGNBQVUsSUFBVixFQUFnQjtBQUNyQixTQUFPLEtBQUssTUFBTCxDQUFZLFlBQVosRUFBMEIsSUFBMUIsQ0FBUDtBQUNBO0FBckJxQyxDQUFwQixDQUFuQjs7a0JBeUJlLFU7Ozs7Ozs7QUM1QmY7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxnQkFBZ0IsaUJBQUUsTUFBRixDQUFTLEVBQVQsRUFBYSxtQkFBYixFQUF3Qjs7QUFFN0MsU0FBUSxDQUNQLENBQUMsT0FBRCxFQUFVLFVBQVYsRUFBc0IsT0FBdEIsQ0FETyxDQUZxQzs7QUFNN0MsV0FBVSxrQkFBVSxLQUFWLEVBQWlCO0FBQzFCLHdCQUFFLE9BQUYsRUFBVyxLQUFLLE9BQWhCLEVBQXlCLEdBQXpCLENBQTZCLEtBQTdCO0FBQ0EsRUFSNEM7O0FBVTdDLE9BQU0sY0FBVSxJQUFWLEVBQWdCO0FBQ3JCLFNBQU8sS0FBSyxNQUFMLENBQVksV0FBWixFQUF5QixJQUF6QixDQUFQO0FBQ0E7QUFaNEMsQ0FBeEIsQ0FBdEI7O2tCQWdCZSxhOzs7Ozs7O0FDbkJmOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUksY0FBYyxpQkFBRSxNQUFGLENBQVMsRUFBVCxFQUFhLGVBQWIsRUFBb0I7O0FBRXJDLFNBQVEsQ0FDUCxDQUFDLFFBQUQsRUFBVyxVQUFYLEVBQXVCLE9BQXZCLENBRE8sQ0FGNkI7O0FBTXJDLFdBQVUsa0JBQVUsS0FBVixFQUFpQjtBQUMxQix3QkFBRSxPQUFGLEVBQVcsS0FBSyxPQUFoQixFQUF5QixHQUF6QixDQUE2QixLQUE3QjtBQUNBLEVBUm9DOztBQVVyQyxPQUFNLGNBQVUsSUFBVixFQUFnQjtBQUNyQixTQUFPLEtBQUssTUFBTCxDQUFZLGFBQVosRUFBMkIsSUFBM0IsQ0FBUDtBQUNBO0FBWm9DLENBQXBCLENBQWxCOztrQkFnQmUsVzs7Ozs7OztBQ25CZjs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLFlBQVksaUJBQUUsTUFBRixDQUFTLEVBQVQsRUFBYSxlQUFiLEVBQW9COztBQUVyQyxTQUFRLENBQ1AsQ0FBQyxRQUFELEVBQVcsVUFBWCxFQUF1QixRQUF2QixDQURPLENBRjZCOztBQU9yQyxXQUFVLGtCQUFVLEtBQVYsRUFBaUI7QUFDMUIsd0JBQUUsUUFBRixFQUFZLEtBQUssT0FBakIsRUFBMEIsR0FBMUIsQ0FBOEIsS0FBOUI7QUFDQSxFQVRvQzs7QUFXckMsT0FBTSxjQUFVLElBQVYsRUFBZ0I7QUFDckIsU0FBTyxLQUFLLE1BQUwsQ0FBWSxXQUFaLEVBQXlCLElBQXpCLENBQVA7QUFDQTs7QUFib0MsQ0FBcEIsQ0FBbEI7O2tCQWtCZSxTOzs7Ozs7O0FDckJmOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sWUFBWSxpQkFBRSxNQUFGLENBQVMsRUFBVCxFQUFhLG1CQUFiLEVBQXdCOztBQUV6QyxTQUFRLENBQ1AsQ0FBQyxRQUFELEVBQVcsVUFBWCxFQUF1QixPQUF2QixDQURPLENBRmlDOztBQU16QyxXQUFVLGtCQUFVLEtBQVYsRUFBaUI7QUFDMUIsd0JBQUUsT0FBRixFQUFXLEtBQUssT0FBaEIsRUFBeUIsR0FBekIsQ0FBNkIsS0FBN0I7QUFDQSxFQVJ3Qzs7QUFVekMsT0FBTSxjQUFVLElBQVYsRUFBZ0I7QUFDckIsU0FBTyxLQUFLLE1BQUwsQ0FBWSxXQUFaLEVBQXlCLElBQXpCLENBQVA7QUFDQTtBQVp3QyxDQUF4QixDQUFsQjs7a0JBZ0JlLFM7Ozs7Ozs7QUNuQmY7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxrQkFBa0IsaUJBQUUsTUFBRixDQUFTLEVBQVQsRUFBYSxtQkFBYixFQUF3Qjs7QUFFL0MsU0FBUSxDQUNQLENBQUMsT0FBRCxFQUFVLFVBQVYsRUFBc0IsT0FBdEIsQ0FETyxDQUZ1Qzs7QUFNL0MsV0FBVSxrQkFBVSxLQUFWLEVBQWlCO0FBQzFCLHdCQUFFLE9BQUYsRUFBVyxLQUFLLE9BQWhCLEVBQXlCLEdBQXpCLENBQTZCLEtBQTdCO0FBQ0EsRUFSOEM7O0FBVS9DLE9BQU0sY0FBVSxJQUFWLEVBQWdCO0FBQ3JCLFNBQU8sS0FBSyxNQUFMLENBQVksV0FBWixFQUF5QixJQUF6QixDQUFQO0FBQ0E7QUFaOEMsQ0FBeEIsQ0FBeEI7O2tCQWdCZSxlOzs7Ozs7O0FDbkJmOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sWUFBWSxpQkFBRSxNQUFGLENBQVMsRUFBVCxFQUFhLGVBQWIsRUFBb0I7QUFDckMsU0FBUSxDQUNQLENBQUMsUUFBRCxFQUFXLFVBQVgsRUFBdUIsUUFBdkIsQ0FBZ0MsWUFBaEMsQ0FETyxFQUVQLENBQUMsT0FBRCxFQUFVLFVBQVYsRUFBc0IsUUFBdEIsQ0FBK0IsWUFBL0IsQ0FGTyxDQUQ2Qjs7QUFPckMsV0FBVSxrQkFBVSxLQUFWLEVBQWlCO0FBQzFCLHdCQUFFLFFBQUYsRUFBWSxLQUFLLE9BQWpCLEVBQTBCLEdBQTFCLENBQThCLEtBQTlCO0FBQ0EsRUFUb0M7O0FBV3JDLE9BQU0sY0FBVSxJQUFWLEVBQWdCO0FBQ3JCLFNBQU8sS0FBSyxNQUFMLENBQVksTUFBWixFQUFvQixJQUFwQixDQUFQO0FBQ0E7O0FBYm9DLENBQXBCLENBQWxCOztrQkFrQmUsUzs7Ozs7OztBQ3JCZjs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLGtCQUFrQixpQkFBRSxNQUFGLENBQVMsRUFBVCxFQUFhLG1CQUFiLEVBQXdCOztBQUUvQyxTQUFRLENBQ1AsQ0FBQyxPQUFELEVBQVUsVUFBVixFQUFzQixPQUF0QixDQURPLENBRnVDOztBQU0vQyxXQUFVLGtCQUFVLEtBQVYsRUFBaUI7QUFDMUIsd0JBQUUsT0FBRixFQUFXLEtBQUssT0FBaEIsRUFBeUIsR0FBekIsQ0FBNkIsS0FBN0I7QUFDQSxFQVI4Qzs7QUFVL0MsT0FBTSxjQUFVLElBQVYsRUFBZ0I7QUFDckIsU0FBTyxLQUFLLE1BQUwsQ0FBWSxXQUFaLEVBQXlCLElBQXpCLENBQVA7QUFDQTtBQVo4QyxDQUF4QixDQUF4Qjs7a0JBZ0JlLGU7Ozs7Ozs7QUNuQmY7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxZQUFZLGlCQUFFLE1BQUYsQ0FBUyxFQUFULEVBQWEsZUFBYixFQUFvQjs7QUFFbEMsU0FBUSxDQUNKLENBQUMsT0FBRCxFQUFVLFVBQVYsRUFBc0IsT0FBdEIsQ0FESSxDQUYwQjs7QUFNckMsV0FBVSxrQkFBUyxLQUFULEVBQWdCO0FBQ3pCLHdCQUFFLE9BQUYsRUFBVyxLQUFLLE9BQWhCLEVBQXlCLEdBQXpCLENBQTZCLEtBQTdCO0FBQ0EsRUFSb0M7O0FBVXJDLE9BQU0sY0FBUyxJQUFULEVBQWU7QUFDcEIsU0FBTyxLQUFLLE1BQUwsQ0FBWSxXQUFaLEVBQXlCLElBQXpCLENBQVA7QUFDQTtBQVpvQyxDQUFwQixDQUFsQjs7a0JBZ0JlLFM7Ozs7Ozs7QUNuQmY7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxlQUFlLGlCQUFFLE1BQUYsQ0FBUyxFQUFULEVBQWEsZUFBYixFQUFvQjs7QUFFeEMsU0FBUSxDQUZnQztBQUd4QyxPQUFNLElBSGtDOztBQUt4QyxXQUFVLGtCQUFVLEtBQVYsRUFBaUI7O0FBRTFCLE1BQUksTUFBTSxJQUFOLElBQWMsTUFBTSxJQUFOLENBQVcsT0FBN0IsRUFBc0M7QUFDckMsV0FBUSxNQUFNLElBQU4sQ0FBVyxLQUFuQjtBQUNBLFNBQU0sS0FBSyxJQUFYLElBQW1CLEtBQUssS0FBeEIsQ0FGcUMsQ0FFUDs7QUFFOUIsV0FBUSxFQUFSO0FBQ0EsT0FBSSxNQUFNLElBQU4sSUFBYyxNQUFsQixFQUEwQjtBQUN6QiwwQkFBRSxNQUFNLElBQU4sQ0FBVyxPQUFiLEVBQXNCLFFBQXRCLENBQStCLE1BQS9CO0FBQ0EsWUFBUSxNQUFNLElBQWQ7QUFDQSxJQUhELE1BSUs7QUFDSiwwQkFBRSxNQUFNLElBQU4sQ0FBVyxPQUFiLEVBQXNCLFdBQXRCLENBQWtDLE1BQWxDO0FBQ0EsWUFBUSxNQUFNLE1BQU4sR0FBZSxNQUFNLElBQTdCO0FBQ0E7O0FBRUQsU0FBTSxJQUFOLENBQVcsT0FBWCxDQUFtQixPQUFuQixDQUEyQixnQkFBM0IsRUFBNkMsQ0FBQyxLQUFELEVBQVEsSUFBUixDQUE3QztBQUNBO0FBQ0QsRUF2QnVDOztBQXlCeEMsU0FBUSxDQUNQLENBQUMsUUFBRCxFQUFXLFVBQVgsRUFBdUIsUUFBdkIsQ0FETyxFQUVQLENBQUMsUUFBRCxFQUFXLFVBQVgsRUFBdUIsT0FBdkIsQ0FGTyxDQXpCZ0M7O0FBOEJ4QyxXQUFVLGtCQUFVLEtBQVYsRUFBaUI7QUFDMUIsT0FBSyxNQUFMLEdBQWMsU0FBUyxLQUFULENBQWQ7QUFDQSxPQUFLLElBQUwsR0FBWSxNQUFNLE9BQU4sQ0FBYyxLQUFLLE1BQW5CLEVBQTJCLEVBQTNCLENBQVo7O0FBRUEsTUFBSSxLQUFLLElBQUwsSUFBYSxNQUFqQixFQUF5QixzQkFBRSxLQUFLLE9BQVAsRUFBZ0IsUUFBaEIsQ0FBeUIsTUFBekI7O0FBRXpCLHdCQUFFLE9BQUYsRUFBVyxLQUFLLE9BQWhCLEVBQXlCLEdBQXpCLENBQTZCLEtBQUssTUFBbEM7QUFDQSx3QkFBRSxRQUFGLEVBQVksS0FBSyxPQUFqQixFQUEwQixHQUExQixDQUE4QixLQUFLLElBQW5DO0FBQ0EsRUF0Q3VDOztBQXdDeEMsT0FBTSxjQUFVLElBQVYsRUFBZ0I7QUFDckIsU0FBTyxLQUFLLE1BQUwsQ0FBWSxjQUFaLEVBQTRCLElBQTVCLENBQVA7QUFDQTtBQTFDdUMsQ0FBcEIsQ0FBckI7O2tCQThDZSxZOzs7Ozs7O0FDakRmOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sYUFBYSxpQkFBRSxNQUFGLENBQVMsRUFBVCxFQUFhLGVBQWIsRUFBb0I7O0FBRXRDO0FBQ0EsVUFBUyxpQkFBVSxHQUFWLEVBQWU7O0FBRXZCLFFBQU0sSUFBSSxLQUFKLENBQVUsc0VBQVYsQ0FBTjs7QUFFQSxTQUFRLE9BQU8sSUFBSSxNQUFKLEtBQWUsQ0FBdkIsR0FBNEIsTUFDbEMsQ0FBQyxNQUFNLFNBQVMsSUFBSSxDQUFKLENBQVQsRUFBaUIsRUFBakIsRUFBcUIsUUFBckIsQ0FBOEIsRUFBOUIsQ0FBUCxFQUEwQyxLQUExQyxDQUFnRCxDQUFDLENBQWpELENBRGtDLEdBRWxDLENBQUMsTUFBTSxTQUFTLElBQUksQ0FBSixDQUFULEVBQWlCLEVBQWpCLEVBQXFCLFFBQXJCLENBQThCLEVBQTlCLENBQVAsRUFBMEMsS0FBMUMsQ0FBZ0QsQ0FBQyxDQUFqRCxDQUZrQyxHQUdsQyxDQUFDLE1BQU0sU0FBUyxJQUFJLENBQUosQ0FBVCxFQUFpQixFQUFqQixFQUFxQixRQUFyQixDQUE4QixFQUE5QixDQUFQLEVBQTBDLEtBQTFDLENBQWdELENBQUMsQ0FBakQsQ0FITSxHQUdnRCxHQUh2RDtBQUlBLEVBWHFDOztBQWF0QyxTQUFRLENBQ1AsQ0FBQyxRQUFELEVBQVcsVUFBWCxFQUF1QixPQUF2QixDQURPLENBYjhCOztBQWlCdEMsV0FBVSxrQkFBVSxLQUFWLEVBQWlCO0FBQzFCLHdCQUFFLE9BQUYsRUFBVyxLQUFLLE9BQWhCLEVBQXlCLEdBQXpCLENBQTZCLEtBQUssT0FBTCxDQUFhLEtBQWIsQ0FBN0I7QUFDQSxFQW5CcUM7O0FBcUJ0QyxPQUFNLGNBQVUsSUFBVixFQUFnQjtBQUNyQixTQUFPLEtBQUssTUFBTCxDQUFZLFlBQVosRUFBMEIsSUFBMUIsQ0FBUDtBQUNBO0FBdkJxQyxDQUFwQixDQUFuQjs7a0JBMkJlLFU7Ozs7Ozs7QUM5QmY7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxnQkFBZ0IsaUJBQUUsTUFBRixDQUFTLEVBQVQsRUFBYSxlQUFiLEVBQW9COztBQUV6QyxXQUFVLGtCQUFTLEtBQVQsRUFBZ0IsSUFBaEIsRUFBc0I7O0FBRS9CLE1BQUksTUFBTSxJQUFOLElBQWMsTUFBTSxJQUFOLENBQVcsT0FBN0IsRUFDQTtBQUNDLFNBQU0sSUFBTixDQUFXLE9BQVgsQ0FBbUIsT0FBbkIsQ0FBMkIsZ0JBQTNCLEVBQTZDLENBQUMsS0FBSyxPQUFOLEVBQWUsSUFBZixDQUE3QztBQUNBO0FBQ0QsRUFSd0M7O0FBVXRDLFNBQVEsQ0FDSixDQUFDLFFBQUQsRUFBVyxVQUFYLEVBQXVCLE9BQXZCLENBREksQ0FWOEI7O0FBY3pDLFdBQVUsa0JBQVMsS0FBVCxFQUFnQjtBQUN6Qix3QkFBRSxPQUFGLEVBQVcsS0FBSyxPQUFoQixFQUF5QixHQUF6QixDQUE2QixLQUE3QjtBQUNBLEVBaEJ3Qzs7QUFrQnpDLE9BQU0sY0FBUyxJQUFULEVBQWU7QUFDcEIsU0FBTyxLQUFLLE1BQUwsQ0FBWSxlQUFaLEVBQTZCLElBQTdCLENBQVA7QUFDQTtBQXBCd0MsQ0FBcEIsQ0FBdEI7O2tCQXdCZSxhOzs7Ozs7O0FDM0JmOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sY0FBYyxpQkFBRSxNQUFGLENBQVMsRUFBVCxFQUFhLGVBQWIsRUFBb0I7O0FBRXZDLFNBQVEsQ0FDUCxDQUFDLE9BQUQsRUFBVSxVQUFWLEVBQXNCLFFBQXRCLENBQStCLFlBQS9CLENBRE8sQ0FGK0I7O0FBT3ZDLFdBQVUsa0JBQVUsS0FBVixFQUFpQjtBQUMxQix3QkFBRSxRQUFGLEVBQVksS0FBSyxPQUFqQixFQUEwQixHQUExQixDQUE4QixLQUE5QjtBQUNBLEVBVHNDOztBQVd2QyxPQUFNLGNBQVUsSUFBVixFQUFnQjtBQUNyQixTQUFPLEtBQUssTUFBTCxDQUFZLFFBQVosRUFBc0IsSUFBdEIsQ0FBUDtBQUNBOztBQWJzQyxDQUFwQixDQUFwQjs7a0JBa0JlLFc7Ozs7Ozs7QUNyQmY7Ozs7OztBQUVBLElBQU0sUUFBUTs7QUFFYixPQUFNLGNBQVMsSUFBVCxFQUFlLENBQ3BCLENBSFk7O0FBTWIsV0FBVSxrQkFBUyxLQUFULEVBQWdCLElBQWhCLEVBQXNCOztBQUUvQixNQUFJLE1BQU0sSUFBTixJQUFjLE1BQU0sSUFBTixDQUFXLE9BQTdCLEVBQ0E7QUFDQyxTQUFNLElBQU4sQ0FBVyxPQUFYLENBQW1CLE9BQW5CLENBQTJCLGdCQUEzQixFQUE2QyxDQUFDLEtBQUssS0FBTixFQUFhLElBQWIsQ0FBN0M7QUFDQTtBQUNELEVBWlk7O0FBY2IsaUJBQWdCLHdCQUFTLElBQVQsRUFBZSxJQUFmLEVBQXFCO0FBQ3BDLFNBQU8sS0FBSyxpQkFBaUIsSUFBdEIsRUFBNEIsSUFBNUIsQ0FBUDtBQUNBLEVBaEJZOztBQWtCYixTQUFRLGdCQUFTLElBQVQsRUFBZSxJQUFmLEVBQXFCO0FBQzVCLE9BQUssT0FBTCxHQUFlLHNCQUFFLEtBQUssY0FBTCxDQUFvQixJQUFwQixFQUEwQixJQUExQixDQUFGLENBQWY7O0FBRUE7QUFDQSxNQUFJLEtBQUssTUFBVCxFQUNBLEtBQUssSUFBSSxDQUFULElBQWMsS0FBSyxNQUFuQixFQUNBO0FBQ0MsV0FBUSxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsQ0FBZixDQUFSO0FBQ0EsU0FBTSxLQUFNLEtBQUssTUFBTCxDQUFZLENBQVosRUFBZSxDQUFmLENBQU4sQ0FBTjtBQUNBLFFBQUssS0FBSyxNQUFMLENBQVksQ0FBWixFQUFlLENBQWYsQ0FBTDs7QUFFQSxRQUFLLE9BQUwsQ0FBYSxFQUFiLENBQWdCLEtBQWhCLEVBQXVCLEVBQXZCLEVBQTJCLEVBQUMsU0FBUyxLQUFLLE9BQWYsRUFBd0IsT0FBTSxJQUE5QixFQUEzQixFQUFnRSxHQUFoRTtBQUNBOztBQUVELFNBQU8sS0FBSyxPQUFaO0FBQ0E7QUFqQ1ksQ0FBZDs7a0JBb0NlLEs7Ozs7Ozs7O0FDdENmOzs7Ozs7QUFFQSxJQUFNLGlCQUFpQixDQUFDLFlBQUQsRUFBZSxjQUFmLEVBQStCLFlBQS9CLEVBQTZDLFdBQTdDLEVBQTBELFlBQTFELEVBQXdFLFNBQXhFLEVBQW1GLFVBQW5GLEVBQStGLFNBQS9GLEVBQTBHLFVBQTFHLENBQXZCOztBQUVBLElBQU0sdUJBQ0YsQ0FBQztBQUNHLFdBQU8sU0FEVjtBQUVHLFVBQU07QUFGVCxDQUFELEVBSUE7QUFDSSxXQUFPLFlBRFg7QUFFSSxVQUFNO0FBRlYsQ0FKQSxFQU9HO0FBQ0MsV0FBTyxjQURSO0FBRUMsVUFBTTtBQUZQLENBUEgsRUFVRztBQUNDLFdBQU8sWUFEUjtBQUVDLFVBQU07QUFGUCxDQVZILEVBYUc7QUFDQyxXQUFPLFdBRFI7QUFFQyxVQUFNO0FBRlAsQ0FiSCxFQWdCRztBQUNDLFdBQU8sWUFEUjtBQUVDLFVBQU07QUFGUCxDQWhCSCxFQW1CRztBQUNDLFdBQU8sU0FEUjtBQUVDLFVBQU07QUFGUCxDQW5CSCxFQXNCRztBQUNDLFdBQU8sVUFEUjtBQUVDLFVBQU07QUFGUCxDQXRCSCxFQXlCRztBQUNDLFdBQU8sU0FEUjtBQUVDLFVBQU07QUFGUCxDQXpCSCxFQTRCRztBQUNDLFdBQU8sVUFEUjtBQUVDLFVBQU07QUFGUCxDQTVCSCxDQURKOztBQWtDQSxTQUFTLGNBQVQsQ0FBd0IsSUFBeEIsRUFBOEIsV0FBOUIsRUFBMkM7QUFDdkMsUUFBSSxPQUFKO0FBQ0EsY0FBVSxTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBVjtBQUNBLGlCQUFhLEtBQUssR0FBTCxDQUFTLENBQVQsRUFBWSxVQUF6Qjs7QUFFQSxTQUFLLElBQUksQ0FBSixFQUFPLE1BQU0sV0FBVyxNQUE3QixFQUFxQyxJQUFJLEdBQXpDLEVBQThDLEdBQTlDLEVBQW1EO0FBQy9DLGdCQUFRLFlBQVIsQ0FBcUIsV0FBVyxDQUFYLEVBQWMsUUFBbkMsRUFBNkMsV0FBVyxDQUFYLEVBQWMsU0FBM0Q7QUFDSDs7QUFFRCwwQkFBRSxPQUFGLEVBQVcsTUFBWCxDQUFrQixzQkFBRSxJQUFGLEVBQVEsUUFBUixFQUFsQjtBQUNBLDBCQUFFLElBQUYsRUFBUSxXQUFSLENBQW9CLE9BQXBCOztBQUVBLFdBQU8sT0FBUDtBQUNIOztBQUVELElBQUksWUFBWSxHQUFoQixDLENBQW9CO0FBQ3BCLFNBQVMsYUFBVCxHQUF5QjtBQUNyQixXQUFPLFdBQVA7QUFDSDs7QUFFRCxJQUFNLGtCQUFrQixtQkFBeEI7QUFDQSxJQUFNLGNBQWMsZUFBcEI7QUFDQSxJQUFNLGlCQUFpQixrQkFBdkI7QUFDQSxJQUFNLGlCQUFpQixrQkFBdkI7QUFDQSxJQUFNLG1CQUFtQixxQkFBekI7QUFDQSxJQUFNLGVBQWUsZ0JBQXJCO0FBQ0EsSUFBTSxVQUFVLFVBQWhCO0FBQ0EsSUFBTSxtQkFBbUIsb0JBQXpCO0FBQ0EsSUFBTSxrQkFBa0IsbUJBQXhCOztRQUdJLGMsR0FBQSxjO1FBQWdCLG9CLEdBQUEsb0I7UUFBc0IsYyxHQUFBLGM7UUFBZ0IsYSxHQUFBLGE7UUFBZSxlLEdBQUEsZTtRQUFpQixXLEdBQUEsVztRQUN0RixjLEdBQUEsYztRQUFnQixjLEdBQUEsYztRQUFnQixPLEdBQUEsTztRQUFTLGdCLEdBQUEsZ0I7UUFBa0IsWSxHQUFBLFk7UUFBYyxnQixHQUFBLGdCO1FBQWtCLGUsR0FBQSxlOzs7OztBQ3RFL0Y7QUFDQSxDQUFDLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDO0FBQWEsc0JBQWlCLE1BQWpCLHlDQUFpQixNQUFqQixNQUF5QixvQkFBaUIsT0FBTyxPQUF4QixDQUF6QixHQUF5RCxPQUFPLE9BQVAsR0FBZSxFQUFFLFFBQUYsR0FBVyxFQUFFLENBQUYsRUFBSSxDQUFDLENBQUwsQ0FBWCxHQUFtQixVQUFTLENBQVQsRUFBVztBQUFDLFFBQUcsQ0FBQyxFQUFFLFFBQU4sRUFBZSxNQUFNLElBQUksS0FBSixDQUFVLDBDQUFWLENBQU4sQ0FBNEQsT0FBTyxFQUFFLENBQUYsQ0FBUDtBQUFZLEdBQTlMLEdBQStMLEVBQUUsQ0FBRixDQUEvTDtBQUFvTSxDQUEvTixDQUFnTyxlQUFhLE9BQU8sTUFBcEIsR0FBMkIsTUFBM0IsWUFBaE8sRUFBdVEsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUM7QUFBYSxNQUFJLElBQUUsRUFBTjtBQUFBLE1BQVMsSUFBRSxFQUFFLFFBQWI7QUFBQSxNQUFzQixJQUFFLE9BQU8sY0FBL0I7QUFBQSxNQUE4QyxJQUFFLEVBQUUsS0FBbEQ7QUFBQSxNQUF3RCxJQUFFLEVBQUUsTUFBNUQ7QUFBQSxNQUFtRSxJQUFFLEVBQUUsSUFBdkU7QUFBQSxNQUE0RSxJQUFFLEVBQUUsT0FBaEY7QUFBQSxNQUF3RixJQUFFLEVBQTFGO0FBQUEsTUFBNkYsSUFBRSxFQUFFLFFBQWpHO0FBQUEsTUFBMEcsSUFBRSxFQUFFLGNBQTlHO0FBQUEsTUFBNkgsSUFBRSxFQUFFLFFBQWpJO0FBQUEsTUFBMEksSUFBRSxFQUFFLElBQUYsQ0FBTyxNQUFQLENBQTVJO0FBQUEsTUFBMkosSUFBRSxFQUE3SixDQUFnSyxTQUFTLENBQVQsQ0FBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsUUFBRSxLQUFHLENBQUwsQ0FBTyxJQUFJLElBQUUsRUFBRSxhQUFGLENBQWdCLFFBQWhCLENBQU4sQ0FBZ0MsRUFBRSxJQUFGLEdBQU8sQ0FBUCxFQUFTLEVBQUUsSUFBRixDQUFPLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0IsVUFBdEIsQ0FBaUMsV0FBakMsQ0FBNkMsQ0FBN0MsQ0FBVDtBQUF5RCxPQUFJLElBQUUsT0FBTjtBQUFBLE1BQWMsSUFBRSxTQUFGLENBQUUsQ0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsV0FBTyxJQUFJLEVBQUUsRUFBRixDQUFLLElBQVQsQ0FBYyxDQUFkLEVBQWdCLENBQWhCLENBQVA7QUFBMEIsR0FBeEQ7QUFBQSxNQUF5RCxJQUFFLG9DQUEzRDtBQUFBLE1BQWdHLElBQUUsT0FBbEc7QUFBQSxNQUEwRyxJQUFFLFdBQTVHO0FBQUEsTUFBd0gsSUFBRSxTQUFGLENBQUUsQ0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsV0FBTyxFQUFFLFdBQUYsRUFBUDtBQUF1QixHQUEvSixDQUFnSyxFQUFFLEVBQUYsR0FBSyxFQUFFLFNBQUYsR0FBWSxFQUFDLFFBQU8sQ0FBUixFQUFVLGFBQVksQ0FBdEIsRUFBd0IsUUFBTyxDQUEvQixFQUFpQyxTQUFRLG1CQUFVO0FBQUMsYUFBTyxFQUFFLElBQUYsQ0FBTyxJQUFQLENBQVA7QUFBb0IsS0FBeEUsRUFBeUUsS0FBSSxhQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sUUFBTSxDQUFOLEdBQVEsRUFBRSxJQUFGLENBQU8sSUFBUCxDQUFSLEdBQXFCLElBQUUsQ0FBRixHQUFJLEtBQUssSUFBRSxLQUFLLE1BQVosQ0FBSixHQUF3QixLQUFLLENBQUwsQ0FBcEQ7QUFBNEQsS0FBckosRUFBc0osV0FBVSxtQkFBUyxDQUFULEVBQVc7QUFBQyxVQUFJLElBQUUsRUFBRSxLQUFGLENBQVEsS0FBSyxXQUFMLEVBQVIsRUFBMkIsQ0FBM0IsQ0FBTixDQUFvQyxPQUFPLEVBQUUsVUFBRixHQUFhLElBQWIsRUFBa0IsQ0FBekI7QUFBMkIsS0FBM08sRUFBNE8sTUFBSyxjQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sRUFBRSxJQUFGLENBQU8sSUFBUCxFQUFZLENBQVosQ0FBUDtBQUFzQixLQUFuUixFQUFvUixLQUFJLGFBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxLQUFLLFNBQUwsQ0FBZSxFQUFFLEdBQUYsQ0FBTSxJQUFOLEVBQVcsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsZUFBTyxFQUFFLElBQUYsQ0FBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsQ0FBUDtBQUFxQixPQUE5QyxDQUFmLENBQVA7QUFBdUUsS0FBM1csRUFBNFcsT0FBTSxpQkFBVTtBQUFDLGFBQU8sS0FBSyxTQUFMLENBQWUsRUFBRSxLQUFGLENBQVEsSUFBUixFQUFhLFNBQWIsQ0FBZixDQUFQO0FBQStDLEtBQTVhLEVBQTZhLE9BQU0saUJBQVU7QUFBQyxhQUFPLEtBQUssRUFBTCxDQUFRLENBQVIsQ0FBUDtBQUFrQixLQUFoZCxFQUFpZCxNQUFLLGdCQUFVO0FBQUMsYUFBTyxLQUFLLEVBQUwsQ0FBUSxDQUFDLENBQVQsQ0FBUDtBQUFtQixLQUFwZixFQUFxZixJQUFHLFlBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBSSxJQUFFLEtBQUssTUFBWDtBQUFBLFVBQWtCLElBQUUsQ0FBQyxDQUFELElBQUksSUFBRSxDQUFGLEdBQUksQ0FBSixHQUFNLENBQVYsQ0FBcEIsQ0FBaUMsT0FBTyxLQUFLLFNBQUwsQ0FBZSxLQUFHLENBQUgsSUFBTSxJQUFFLENBQVIsR0FBVSxDQUFDLEtBQUssQ0FBTCxDQUFELENBQVYsR0FBb0IsRUFBbkMsQ0FBUDtBQUE4QyxLQUFubEIsRUFBb2xCLEtBQUksZUFBVTtBQUFDLGFBQU8sS0FBSyxVQUFMLElBQWlCLEtBQUssV0FBTCxFQUF4QjtBQUEyQyxLQUE5b0IsRUFBK29CLE1BQUssQ0FBcHBCLEVBQXNwQixNQUFLLEVBQUUsSUFBN3BCLEVBQWtxQixRQUFPLEVBQUUsTUFBM3FCLEVBQWpCLEVBQW9zQixFQUFFLE1BQUYsR0FBUyxFQUFFLEVBQUYsQ0FBSyxNQUFMLEdBQVksWUFBVTtBQUFDLFFBQUksQ0FBSjtBQUFBLFFBQU0sQ0FBTjtBQUFBLFFBQVEsQ0FBUjtBQUFBLFFBQVUsQ0FBVjtBQUFBLFFBQVksQ0FBWjtBQUFBLFFBQWMsQ0FBZDtBQUFBLFFBQWdCLElBQUUsVUFBVSxDQUFWLEtBQWMsRUFBaEM7QUFBQSxRQUFtQyxJQUFFLENBQXJDO0FBQUEsUUFBdUMsSUFBRSxVQUFVLE1BQW5EO0FBQUEsUUFBMEQsSUFBRSxDQUFDLENBQTdELENBQStELEtBQUksYUFBVyxPQUFPLENBQWxCLEtBQXNCLElBQUUsQ0FBRixFQUFJLElBQUUsVUFBVSxDQUFWLEtBQWMsRUFBcEIsRUFBdUIsR0FBN0MsR0FBa0Qsb0JBQWlCLENBQWpCLHlDQUFpQixDQUFqQixNQUFvQixFQUFFLFVBQUYsQ0FBYSxDQUFiLENBQXBCLEtBQXNDLElBQUUsRUFBeEMsQ0FBbEQsRUFBOEYsTUFBSSxDQUFKLEtBQVEsSUFBRSxJQUFGLEVBQU8sR0FBZixDQUFsRyxFQUFzSCxJQUFFLENBQXhILEVBQTBILEdBQTFIO0FBQThILFVBQUcsU0FBTyxJQUFFLFVBQVUsQ0FBVixDQUFULENBQUgsRUFBMEIsS0FBSSxDQUFKLElBQVMsQ0FBVDtBQUFXLFlBQUUsRUFBRSxDQUFGLENBQUYsRUFBTyxJQUFFLEVBQUUsQ0FBRixDQUFULEVBQWMsTUFBSSxDQUFKLEtBQVEsS0FBRyxDQUFILEtBQU8sRUFBRSxhQUFGLENBQWdCLENBQWhCLE1BQXFCLElBQUUsTUFBTSxPQUFOLENBQWMsQ0FBZCxDQUF2QixDQUFQLEtBQWtELEtBQUcsSUFBRSxDQUFDLENBQUgsRUFBSyxJQUFFLEtBQUcsTUFBTSxPQUFOLENBQWMsQ0FBZCxDQUFILEdBQW9CLENBQXBCLEdBQXNCLEVBQWhDLElBQW9DLElBQUUsS0FBRyxFQUFFLGFBQUYsQ0FBZ0IsQ0FBaEIsQ0FBSCxHQUFzQixDQUF0QixHQUF3QixFQUE5RCxFQUFpRSxFQUFFLENBQUYsSUFBSyxFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsQ0FBeEgsSUFBeUksS0FBSyxDQUFMLEtBQVMsQ0FBVCxLQUFhLEVBQUUsQ0FBRixJQUFLLENBQWxCLENBQWpKLENBQWQ7QUFBWDtBQUF4SixLQUF3VixPQUFPLENBQVA7QUFBUyxHQUFwb0MsRUFBcW9DLEVBQUUsTUFBRixDQUFTLEVBQUMsU0FBUSxXQUFTLENBQUMsSUFBRSxLQUFLLE1BQUwsRUFBSCxFQUFrQixPQUFsQixDQUEwQixLQUExQixFQUFnQyxFQUFoQyxDQUFsQixFQUFzRCxTQUFRLENBQUMsQ0FBL0QsRUFBaUUsT0FBTSxlQUFTLENBQVQsRUFBVztBQUFDLFlBQU0sSUFBSSxLQUFKLENBQVUsQ0FBVixDQUFOO0FBQW1CLEtBQXRHLEVBQXVHLE1BQUssZ0JBQVUsQ0FBRSxDQUF4SCxFQUF5SCxZQUFXLG9CQUFTLENBQVQsRUFBVztBQUFDLGFBQU0sZUFBYSxFQUFFLElBQUYsQ0FBTyxDQUFQLENBQW5CO0FBQTZCLEtBQTdLLEVBQThLLFVBQVMsa0JBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxRQUFNLENBQU4sSUFBUyxNQUFJLEVBQUUsTUFBdEI7QUFBNkIsS0FBaE8sRUFBaU8sV0FBVSxtQkFBUyxDQUFULEVBQVc7QUFBQyxVQUFJLElBQUUsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUFOLENBQWdCLE9BQU0sQ0FBQyxhQUFXLENBQVgsSUFBYyxhQUFXLENBQTFCLEtBQThCLENBQUMsTUFBTSxJQUFFLFdBQVcsQ0FBWCxDQUFSLENBQXJDO0FBQTRELEtBQW5VLEVBQW9VLGVBQWMsdUJBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBSSxDQUFKLEVBQU0sQ0FBTixDQUFRLE9BQU0sRUFBRSxDQUFDLENBQUQsSUFBSSxzQkFBb0IsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUExQixNQUF1QyxFQUFFLElBQUUsRUFBRSxDQUFGLENBQUosTUFBWSxJQUFFLEVBQUUsSUFBRixDQUFPLENBQVAsRUFBUyxhQUFULEtBQXlCLEVBQUUsV0FBN0IsRUFBeUMsY0FBWSxPQUFPLENBQW5CLElBQXNCLEVBQUUsSUFBRixDQUFPLENBQVAsTUFBWSxDQUF2RixDQUF2QyxDQUFOO0FBQXdJLEtBQTllLEVBQStlLGVBQWMsdUJBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBSSxDQUFKLENBQU0sS0FBSSxDQUFKLElBQVMsQ0FBVDtBQUFXLGVBQU0sQ0FBQyxDQUFQO0FBQVgsT0FBb0IsT0FBTSxDQUFDLENBQVA7QUFBUyxLQUE1aUIsRUFBNmlCLE1BQUssY0FBUyxDQUFULEVBQVc7QUFBQyxhQUFPLFFBQU0sQ0FBTixHQUFRLElBQUUsRUFBVixHQUFhLG9CQUFpQixDQUFqQix5Q0FBaUIsQ0FBakIsTUFBb0IsY0FBWSxPQUFPLENBQXZDLEdBQXlDLEVBQUUsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUFGLEtBQWMsUUFBdkQsVUFBdUUsQ0FBdkUseUNBQXVFLENBQXZFLENBQXBCO0FBQTZGLEtBQTNwQixFQUE0cEIsWUFBVyxvQkFBUyxDQUFULEVBQVc7QUFBQyxRQUFFLENBQUY7QUFBSyxLQUF4ckIsRUFBeXJCLFdBQVUsbUJBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxFQUFFLE9BQUYsQ0FBVSxDQUFWLEVBQVksS0FBWixFQUFtQixPQUFuQixDQUEyQixDQUEzQixFQUE2QixDQUE3QixDQUFQO0FBQXVDLEtBQXR2QixFQUF1dkIsTUFBSyxjQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxVQUFJLENBQUo7QUFBQSxVQUFNLElBQUUsQ0FBUixDQUFVLElBQUcsRUFBRSxDQUFGLENBQUgsRUFBUTtBQUFDLGFBQUksSUFBRSxFQUFFLE1BQVIsRUFBZSxJQUFFLENBQWpCLEVBQW1CLEdBQW5CO0FBQXVCLGNBQUcsRUFBRSxJQUFGLENBQU8sRUFBRSxDQUFGLENBQVAsRUFBWSxDQUFaLEVBQWMsRUFBRSxDQUFGLENBQWQsTUFBc0IsQ0FBQyxDQUExQixFQUE0QjtBQUFuRDtBQUF5RCxPQUFsRSxNQUF1RSxLQUFJLENBQUosSUFBUyxDQUFUO0FBQVcsWUFBRyxFQUFFLElBQUYsQ0FBTyxFQUFFLENBQUYsQ0FBUCxFQUFZLENBQVosRUFBYyxFQUFFLENBQUYsQ0FBZCxNQUFzQixDQUFDLENBQTFCLEVBQTRCO0FBQXZDLE9BQTZDLE9BQU8sQ0FBUDtBQUFTLEtBQWo1QixFQUFrNUIsTUFBSyxjQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sUUFBTSxDQUFOLEdBQVEsRUFBUixHQUFXLENBQUMsSUFBRSxFQUFILEVBQU8sT0FBUCxDQUFlLENBQWYsRUFBaUIsRUFBakIsQ0FBbEI7QUFBdUMsS0FBMThCLEVBQTI4QixXQUFVLG1CQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxVQUFJLElBQUUsS0FBRyxFQUFULENBQVksT0FBTyxRQUFNLENBQU4sS0FBVSxFQUFFLE9BQU8sQ0FBUCxDQUFGLElBQWEsRUFBRSxLQUFGLENBQVEsQ0FBUixFQUFVLFlBQVUsT0FBTyxDQUFqQixHQUFtQixDQUFDLENBQUQsQ0FBbkIsR0FBdUIsQ0FBakMsQ0FBYixHQUFpRCxFQUFFLElBQUYsQ0FBTyxDQUFQLEVBQVMsQ0FBVCxDQUEzRCxHQUF3RSxDQUEvRTtBQUFpRixLQUFoa0MsRUFBaWtDLFNBQVEsaUJBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWU7QUFBQyxhQUFPLFFBQU0sQ0FBTixHQUFRLENBQUMsQ0FBVCxHQUFXLEVBQUUsSUFBRixDQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxDQUFsQjtBQUFnQyxLQUF6bkMsRUFBMG5DLE9BQU0sZUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsV0FBSSxJQUFJLElBQUUsQ0FBQyxFQUFFLE1BQVQsRUFBZ0IsSUFBRSxDQUFsQixFQUFvQixJQUFFLEVBQUUsTUFBNUIsRUFBbUMsSUFBRSxDQUFyQyxFQUF1QyxHQUF2QztBQUEyQyxVQUFFLEdBQUYsSUFBTyxFQUFFLENBQUYsQ0FBUDtBQUEzQyxPQUF1RCxPQUFPLEVBQUUsTUFBRixHQUFTLENBQVQsRUFBVyxDQUFsQjtBQUFvQixLQUF6dEMsRUFBMHRDLE1BQUssY0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLFdBQUksSUFBSSxDQUFKLEVBQU0sSUFBRSxFQUFSLEVBQVcsSUFBRSxDQUFiLEVBQWUsSUFBRSxFQUFFLE1BQW5CLEVBQTBCLElBQUUsQ0FBQyxDQUFqQyxFQUFtQyxJQUFFLENBQXJDLEVBQXVDLEdBQXZDO0FBQTJDLFlBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBRixDQUFGLEVBQU8sQ0FBUCxDQUFILEVBQWEsTUFBSSxDQUFKLElBQU8sRUFBRSxJQUFGLENBQU8sRUFBRSxDQUFGLENBQVAsQ0FBcEI7QUFBM0MsT0FBNEUsT0FBTyxDQUFQO0FBQVMsS0FBcDBDLEVBQXEwQyxLQUFJLGFBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWU7QUFBQyxVQUFJLENBQUo7QUFBQSxVQUFNLENBQU47QUFBQSxVQUFRLElBQUUsQ0FBVjtBQUFBLFVBQVksSUFBRSxFQUFkLENBQWlCLElBQUcsRUFBRSxDQUFGLENBQUgsRUFBUSxLQUFJLElBQUUsRUFBRSxNQUFSLEVBQWUsSUFBRSxDQUFqQixFQUFtQixHQUFuQjtBQUF1QixZQUFFLEVBQUUsRUFBRSxDQUFGLENBQUYsRUFBTyxDQUFQLEVBQVMsQ0FBVCxDQUFGLEVBQWMsUUFBTSxDQUFOLElBQVMsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUF2QjtBQUF2QixPQUFSLE1BQXFFLEtBQUksQ0FBSixJQUFTLENBQVQ7QUFBVyxZQUFFLEVBQUUsRUFBRSxDQUFGLENBQUYsRUFBTyxDQUFQLEVBQVMsQ0FBVCxDQUFGLEVBQWMsUUFBTSxDQUFOLElBQVMsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUF2QjtBQUFYLE9BQTRDLE9BQU8sRUFBRSxLQUFGLENBQVEsRUFBUixFQUFXLENBQVgsQ0FBUDtBQUFxQixLQUFoL0MsRUFBaS9DLE1BQUssQ0FBdC9DLEVBQXcvQyxPQUFNLGVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFVBQUksQ0FBSixFQUFNLENBQU4sRUFBUSxDQUFSLENBQVUsSUFBRyxZQUFVLE9BQU8sQ0FBakIsS0FBcUIsSUFBRSxFQUFFLENBQUYsQ0FBRixFQUFPLElBQUUsQ0FBVCxFQUFXLElBQUUsQ0FBbEMsR0FBcUMsRUFBRSxVQUFGLENBQWEsQ0FBYixDQUF4QyxFQUF3RCxPQUFPLElBQUUsRUFBRSxJQUFGLENBQU8sU0FBUCxFQUFpQixDQUFqQixDQUFGLEVBQXNCLElBQUUsYUFBVTtBQUFDLGVBQU8sRUFBRSxLQUFGLENBQVEsS0FBRyxJQUFYLEVBQWdCLEVBQUUsTUFBRixDQUFTLEVBQUUsSUFBRixDQUFPLFNBQVAsQ0FBVCxDQUFoQixDQUFQO0FBQW9ELE9BQXZGLEVBQXdGLEVBQUUsSUFBRixHQUFPLEVBQUUsSUFBRixHQUFPLEVBQUUsSUFBRixJQUFRLEVBQUUsSUFBRixFQUE5RyxFQUF1SCxDQUE5SDtBQUFnSSxLQUE5c0QsRUFBK3NELEtBQUksS0FBSyxHQUF4dEQsRUFBNHRELFNBQVEsQ0FBcHVELEVBQVQsQ0FBcm9DLEVBQXMzRixjQUFZLE9BQU8sTUFBbkIsS0FBNEIsRUFBRSxFQUFGLENBQUssT0FBTyxRQUFaLElBQXNCLEVBQUUsT0FBTyxRQUFULENBQWxELENBQXQzRixFQUE0N0YsRUFBRSxJQUFGLENBQU8sdUVBQXVFLEtBQXZFLENBQTZFLEdBQTdFLENBQVAsRUFBeUYsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsTUFBRSxhQUFXLENBQVgsR0FBYSxHQUFmLElBQW9CLEVBQUUsV0FBRixFQUFwQjtBQUFvQyxHQUEzSSxDQUE1N0YsQ0FBeWtHLFNBQVMsQ0FBVCxDQUFXLENBQVgsRUFBYTtBQUFDLFFBQUksSUFBRSxDQUFDLENBQUMsQ0FBRixJQUFLLFlBQVcsQ0FBaEIsSUFBbUIsRUFBRSxNQUEzQjtBQUFBLFFBQWtDLElBQUUsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUFwQyxDQUE4QyxPQUFNLGVBQWEsQ0FBYixJQUFnQixDQUFDLEVBQUUsUUFBRixDQUFXLENBQVgsQ0FBakIsS0FBaUMsWUFBVSxDQUFWLElBQWEsTUFBSSxDQUFqQixJQUFvQixZQUFVLE9BQU8sQ0FBakIsSUFBb0IsSUFBRSxDQUF0QixJQUF5QixJQUFFLENBQUYsSUFBTyxDQUFyRixDQUFOO0FBQThGLE9BQUksSUFBRSxVQUFTLENBQVQsRUFBVztBQUFDLFFBQUksQ0FBSjtBQUFBLFFBQU0sQ0FBTjtBQUFBLFFBQVEsQ0FBUjtBQUFBLFFBQVUsQ0FBVjtBQUFBLFFBQVksQ0FBWjtBQUFBLFFBQWMsQ0FBZDtBQUFBLFFBQWdCLENBQWhCO0FBQUEsUUFBa0IsQ0FBbEI7QUFBQSxRQUFvQixDQUFwQjtBQUFBLFFBQXNCLENBQXRCO0FBQUEsUUFBd0IsQ0FBeEI7QUFBQSxRQUEwQixDQUExQjtBQUFBLFFBQTRCLENBQTVCO0FBQUEsUUFBOEIsQ0FBOUI7QUFBQSxRQUFnQyxDQUFoQztBQUFBLFFBQWtDLENBQWxDO0FBQUEsUUFBb0MsQ0FBcEM7QUFBQSxRQUFzQyxDQUF0QztBQUFBLFFBQXdDLENBQXhDO0FBQUEsUUFBMEMsSUFBRSxXQUFTLElBQUUsSUFBSSxJQUFKLEVBQXZEO0FBQUEsUUFBZ0UsSUFBRSxFQUFFLFFBQXBFO0FBQUEsUUFBNkUsSUFBRSxDQUEvRTtBQUFBLFFBQWlGLElBQUUsQ0FBbkY7QUFBQSxRQUFxRixJQUFFLElBQXZGO0FBQUEsUUFBNEYsSUFBRSxJQUE5RjtBQUFBLFFBQW1HLElBQUUsSUFBckc7QUFBQSxRQUEwRyxJQUFFLFdBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLGFBQU8sTUFBSSxDQUFKLEtBQVEsSUFBRSxDQUFDLENBQVgsR0FBYyxDQUFyQjtBQUF1QixLQUFqSjtBQUFBLFFBQWtKLElBQUUsR0FBRyxjQUF2SjtBQUFBLFFBQXNLLElBQUUsRUFBeEs7QUFBQSxRQUEySyxJQUFFLEVBQUUsR0FBL0s7QUFBQSxRQUFtTCxJQUFFLEVBQUUsSUFBdkw7QUFBQSxRQUE0TCxJQUFFLEVBQUUsSUFBaE07QUFBQSxRQUFxTSxJQUFFLEVBQUUsS0FBek07QUFBQSxRQUErTSxJQUFFLFNBQUYsQ0FBRSxDQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxXQUFJLElBQUksSUFBRSxDQUFOLEVBQVEsSUFBRSxFQUFFLE1BQWhCLEVBQXVCLElBQUUsQ0FBekIsRUFBMkIsR0FBM0I7QUFBK0IsWUFBRyxFQUFFLENBQUYsTUFBTyxDQUFWLEVBQVksT0FBTyxDQUFQO0FBQTNDLE9BQW9ELE9BQU0sQ0FBQyxDQUFQO0FBQVMsS0FBNVI7QUFBQSxRQUE2UixJQUFFLDRIQUEvUjtBQUFBLFFBQTRaLElBQUUscUJBQTlaO0FBQUEsUUFBb2IsSUFBRSwrQkFBdGI7QUFBQSxRQUFzZCxJQUFFLFFBQU0sQ0FBTixHQUFRLElBQVIsR0FBYSxDQUFiLEdBQWUsTUFBZixHQUFzQixDQUF0QixHQUF3QixlQUF4QixHQUF3QyxDQUF4QyxHQUEwQywwREFBMUMsR0FBcUcsQ0FBckcsR0FBdUcsTUFBdkcsR0FBOEcsQ0FBOUcsR0FBZ0gsTUFBeGtCO0FBQUEsUUFBK2tCLElBQUUsT0FBSyxDQUFMLEdBQU8sdUZBQVAsR0FBK0YsQ0FBL0YsR0FBaUcsY0FBbHJCO0FBQUEsUUFBaXNCLElBQUUsSUFBSSxNQUFKLENBQVcsSUFBRSxHQUFiLEVBQWlCLEdBQWpCLENBQW5zQjtBQUFBLFFBQXl0QixJQUFFLElBQUksTUFBSixDQUFXLE1BQUksQ0FBSixHQUFNLDZCQUFOLEdBQW9DLENBQXBDLEdBQXNDLElBQWpELEVBQXNELEdBQXRELENBQTN0QjtBQUFBLFFBQXN4QixJQUFFLElBQUksTUFBSixDQUFXLE1BQUksQ0FBSixHQUFNLElBQU4sR0FBVyxDQUFYLEdBQWEsR0FBeEIsQ0FBeHhCO0FBQUEsUUFBcXpCLElBQUUsSUFBSSxNQUFKLENBQVcsTUFBSSxDQUFKLEdBQU0sVUFBTixHQUFpQixDQUFqQixHQUFtQixHQUFuQixHQUF1QixDQUF2QixHQUF5QixHQUFwQyxDQUF2ekI7QUFBQSxRQUFnMkIsSUFBRSxJQUFJLE1BQUosQ0FBVyxNQUFJLENBQUosR0FBTSxnQkFBTixHQUF1QixDQUF2QixHQUF5QixNQUFwQyxFQUEyQyxHQUEzQyxDQUFsMkI7QUFBQSxRQUFrNUIsSUFBRSxJQUFJLE1BQUosQ0FBVyxDQUFYLENBQXA1QjtBQUFBLFFBQWs2QixJQUFFLElBQUksTUFBSixDQUFXLE1BQUksQ0FBSixHQUFNLEdBQWpCLENBQXA2QjtBQUFBLFFBQTA3QixJQUFFLEVBQUMsSUFBRyxJQUFJLE1BQUosQ0FBVyxRQUFNLENBQU4sR0FBUSxHQUFuQixDQUFKLEVBQTRCLE9BQU0sSUFBSSxNQUFKLENBQVcsVUFBUSxDQUFSLEdBQVUsR0FBckIsQ0FBbEMsRUFBNEQsS0FBSSxJQUFJLE1BQUosQ0FBVyxPQUFLLENBQUwsR0FBTyxPQUFsQixDQUFoRSxFQUEyRixNQUFLLElBQUksTUFBSixDQUFXLE1BQUksQ0FBZixDQUFoRyxFQUFrSCxRQUFPLElBQUksTUFBSixDQUFXLE1BQUksQ0FBZixDQUF6SCxFQUEySSxPQUFNLElBQUksTUFBSixDQUFXLDJEQUF5RCxDQUF6RCxHQUEyRCw4QkFBM0QsR0FBMEYsQ0FBMUYsR0FBNEYsYUFBNUYsR0FBMEcsQ0FBMUcsR0FBNEcsWUFBNUcsR0FBeUgsQ0FBekgsR0FBMkgsUUFBdEksRUFBK0ksR0FBL0ksQ0FBakosRUFBcVMsTUFBSyxJQUFJLE1BQUosQ0FBVyxTQUFPLENBQVAsR0FBUyxJQUFwQixFQUF5QixHQUF6QixDQUExUyxFQUF3VSxjQUFhLElBQUksTUFBSixDQUFXLE1BQUksQ0FBSixHQUFNLGtEQUFOLEdBQXlELENBQXpELEdBQTJELGtCQUEzRCxHQUE4RSxDQUE5RSxHQUFnRixrQkFBM0YsRUFBOEcsR0FBOUcsQ0FBclYsRUFBNTdCO0FBQUEsUUFBcTRDLElBQUUscUNBQXY0QztBQUFBLFFBQTY2QyxJQUFFLFFBQS82QztBQUFBLFFBQXc3QyxJQUFFLHdCQUExN0M7QUFBQSxRQUFtOUMsSUFBRSxrQ0FBcjlDO0FBQUEsUUFBdy9DLElBQUUsTUFBMS9DO0FBQUEsUUFBaWdELElBQUUsSUFBSSxNQUFKLENBQVcsdUJBQXFCLENBQXJCLEdBQXVCLEtBQXZCLEdBQTZCLENBQTdCLEdBQStCLE1BQTFDLEVBQWlELElBQWpELENBQW5nRDtBQUFBLFFBQTBqRCxLQUFHLFNBQUgsRUFBRyxDQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsVUFBSSxJQUFFLE9BQUssQ0FBTCxHQUFPLEtBQWIsQ0FBbUIsT0FBTyxNQUFJLENBQUosSUFBTyxDQUFQLEdBQVMsQ0FBVCxHQUFXLElBQUUsQ0FBRixHQUFJLE9BQU8sWUFBUCxDQUFvQixJQUFFLEtBQXRCLENBQUosR0FBaUMsT0FBTyxZQUFQLENBQW9CLEtBQUcsRUFBSCxHQUFNLEtBQTFCLEVBQWdDLE9BQUssQ0FBTCxHQUFPLEtBQXZDLENBQW5EO0FBQWlHLEtBQWpzRDtBQUFBLFFBQWtzRCxLQUFHLHFEQUFyc0Q7QUFBQSxRQUEydkQsS0FBRyxTQUFILEVBQUcsQ0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsYUFBTyxJQUFFLFNBQU8sQ0FBUCxHQUFTLFFBQVQsR0FBa0IsRUFBRSxLQUFGLENBQVEsQ0FBUixFQUFVLENBQUMsQ0FBWCxJQUFjLElBQWQsR0FBbUIsRUFBRSxVQUFGLENBQWEsRUFBRSxNQUFGLEdBQVMsQ0FBdEIsRUFBeUIsUUFBekIsQ0FBa0MsRUFBbEMsQ0FBbkIsR0FBeUQsR0FBN0UsR0FBaUYsT0FBSyxDQUE3RjtBQUErRixLQUEzMkQ7QUFBQSxRQUE0MkQsS0FBRyxTQUFILEVBQUcsR0FBVTtBQUFDO0FBQUksS0FBOTNEO0FBQUEsUUFBKzNELEtBQUcsR0FBRyxVQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sRUFBRSxRQUFGLEtBQWEsQ0FBQyxDQUFkLEtBQWtCLFVBQVMsQ0FBVCxJQUFZLFdBQVUsQ0FBeEMsQ0FBUDtBQUFrRCxLQUFqRSxFQUFrRSxFQUFDLEtBQUksWUFBTCxFQUFrQixNQUFLLFFBQXZCLEVBQWxFLENBQWw0RCxDQUFzK0QsSUFBRztBQUFDLFFBQUUsS0FBRixDQUFRLElBQUUsRUFBRSxJQUFGLENBQU8sRUFBRSxVQUFULENBQVYsRUFBK0IsRUFBRSxVQUFqQyxHQUE2QyxFQUFFLEVBQUUsVUFBRixDQUFhLE1BQWYsRUFBdUIsUUFBcEU7QUFBNkUsS0FBakYsQ0FBaUYsT0FBTSxFQUFOLEVBQVM7QUFBQyxVQUFFLEVBQUMsT0FBTSxFQUFFLE1BQUYsR0FBUyxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxZQUFFLEtBQUYsQ0FBUSxDQUFSLEVBQVUsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUFWO0FBQXFCLFNBQTVDLEdBQTZDLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLGNBQUksSUFBRSxFQUFFLE1BQVI7QUFBQSxjQUFlLElBQUUsQ0FBakIsQ0FBbUIsT0FBTSxFQUFFLEdBQUYsSUFBTyxFQUFFLEdBQUYsQ0FBYixJQUFxQixFQUFFLE1BQUYsR0FBUyxJQUFFLENBQVg7QUFBYSxTQUF2SCxFQUFGO0FBQTJILGNBQVMsRUFBVCxDQUFZLENBQVosRUFBYyxDQUFkLEVBQWdCLENBQWhCLEVBQWtCLENBQWxCLEVBQW9CO0FBQUMsVUFBSSxDQUFKO0FBQUEsVUFBTSxDQUFOO0FBQUEsVUFBUSxDQUFSO0FBQUEsVUFBVSxDQUFWO0FBQUEsVUFBWSxDQUFaO0FBQUEsVUFBYyxDQUFkO0FBQUEsVUFBZ0IsQ0FBaEI7QUFBQSxVQUFrQixJQUFFLEtBQUcsRUFBRSxhQUF6QjtBQUFBLFVBQXVDLElBQUUsSUFBRSxFQUFFLFFBQUosR0FBYSxDQUF0RCxDQUF3RCxJQUFHLElBQUUsS0FBRyxFQUFMLEVBQVEsWUFBVSxPQUFPLENBQWpCLElBQW9CLENBQUMsQ0FBckIsSUFBd0IsTUFBSSxDQUFKLElBQU8sTUFBSSxDQUFYLElBQWMsT0FBSyxDQUF0RCxFQUF3RCxPQUFPLENBQVAsQ0FBUyxJQUFHLENBQUMsQ0FBRCxLQUFLLENBQUMsSUFBRSxFQUFFLGFBQUYsSUFBaUIsQ0FBbkIsR0FBcUIsQ0FBdEIsTUFBMkIsQ0FBM0IsSUFBOEIsRUFBRSxDQUFGLENBQTlCLEVBQW1DLElBQUUsS0FBRyxDQUF4QyxFQUEwQyxDQUEvQyxDQUFILEVBQXFEO0FBQUMsWUFBRyxPQUFLLENBQUwsS0FBUyxJQUFFLEVBQUUsSUFBRixDQUFPLENBQVAsQ0FBWCxDQUFILEVBQXlCLElBQUcsSUFBRSxFQUFFLENBQUYsQ0FBTCxFQUFVO0FBQUMsY0FBRyxNQUFJLENBQVAsRUFBUztBQUFDLGdCQUFHLEVBQUUsSUFBRSxFQUFFLGNBQUYsQ0FBaUIsQ0FBakIsQ0FBSixDQUFILEVBQTRCLE9BQU8sQ0FBUCxDQUFTLElBQUcsRUFBRSxFQUFGLEtBQU8sQ0FBVixFQUFZLE9BQU8sRUFBRSxJQUFGLENBQU8sQ0FBUCxHQUFVLENBQWpCO0FBQW1CLFdBQTlFLE1BQW1GLElBQUcsTUFBSSxJQUFFLEVBQUUsY0FBRixDQUFpQixDQUFqQixDQUFOLEtBQTRCLEVBQUUsQ0FBRixFQUFJLENBQUosQ0FBNUIsSUFBb0MsRUFBRSxFQUFGLEtBQU8sQ0FBOUMsRUFBZ0QsT0FBTyxFQUFFLElBQUYsQ0FBTyxDQUFQLEdBQVUsQ0FBakI7QUFBbUIsU0FBakssTUFBcUs7QUFBQyxjQUFHLEVBQUUsQ0FBRixDQUFILEVBQVEsT0FBTyxFQUFFLEtBQUYsQ0FBUSxDQUFSLEVBQVUsRUFBRSxvQkFBRixDQUF1QixDQUF2QixDQUFWLEdBQXFDLENBQTVDLENBQThDLElBQUcsQ0FBQyxJQUFFLEVBQUUsQ0FBRixDQUFILEtBQVUsRUFBRSxzQkFBWixJQUFvQyxFQUFFLHNCQUF6QyxFQUFnRSxPQUFPLEVBQUUsS0FBRixDQUFRLENBQVIsRUFBVSxFQUFFLHNCQUFGLENBQXlCLENBQXpCLENBQVYsR0FBdUMsQ0FBOUM7QUFBZ0QsYUFBRyxFQUFFLEdBQUYsSUFBTyxDQUFDLEVBQUUsSUFBRSxHQUFKLENBQVIsS0FBbUIsQ0FBQyxDQUFELElBQUksQ0FBQyxFQUFFLElBQUYsQ0FBTyxDQUFQLENBQXhCLENBQUgsRUFBc0M7QUFBQyxjQUFHLE1BQUksQ0FBUCxFQUFTLElBQUUsQ0FBRixFQUFJLElBQUUsQ0FBTixDQUFULEtBQXNCLElBQUcsYUFBVyxFQUFFLFFBQUYsQ0FBVyxXQUFYLEVBQWQsRUFBdUM7QUFBQyxhQUFDLElBQUUsRUFBRSxZQUFGLENBQWUsSUFBZixDQUFILElBQXlCLElBQUUsRUFBRSxPQUFGLENBQVUsRUFBVixFQUFhLEVBQWIsQ0FBM0IsR0FBNEMsRUFBRSxZQUFGLENBQWUsSUFBZixFQUFvQixJQUFFLENBQXRCLENBQTVDLEVBQXFFLElBQUUsRUFBRSxDQUFGLENBQXZFLEVBQTRFLElBQUUsRUFBRSxNQUFoRixDQUF1RixPQUFNLEdBQU47QUFBVSxnQkFBRSxDQUFGLElBQUssTUFBSSxDQUFKLEdBQU0sR0FBTixHQUFVLEdBQUcsRUFBRSxDQUFGLENBQUgsQ0FBZjtBQUFWLGFBQWtDLElBQUUsRUFBRSxJQUFGLENBQU8sR0FBUCxDQUFGLEVBQWMsSUFBRSxFQUFFLElBQUYsQ0FBTyxDQUFQLEtBQVcsR0FBRyxFQUFFLFVBQUwsQ0FBWCxJQUE2QixDQUE3QztBQUErQyxlQUFHLENBQUgsRUFBSyxJQUFHO0FBQUMsbUJBQU8sRUFBRSxLQUFGLENBQVEsQ0FBUixFQUFVLEVBQUUsZ0JBQUYsQ0FBbUIsQ0FBbkIsQ0FBVixHQUFpQyxDQUF4QztBQUEwQyxXQUE5QyxDQUE4QyxPQUFNLENBQU4sRUFBUSxDQUFFLENBQXhELFNBQStEO0FBQUMsa0JBQUksQ0FBSixJQUFPLEVBQUUsZUFBRixDQUFrQixJQUFsQixDQUFQO0FBQStCO0FBQUM7QUFBQyxjQUFPLEVBQUUsRUFBRSxPQUFGLENBQVUsQ0FBVixFQUFZLElBQVosQ0FBRixFQUFvQixDQUFwQixFQUFzQixDQUF0QixFQUF3QixDQUF4QixDQUFQO0FBQWtDLGNBQVMsRUFBVCxHQUFhO0FBQUMsVUFBSSxJQUFFLEVBQU4sQ0FBUyxTQUFTLENBQVQsQ0FBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsZUFBTyxFQUFFLElBQUYsQ0FBTyxJQUFFLEdBQVQsSUFBYyxFQUFFLFdBQWhCLElBQTZCLE9BQU8sRUFBRSxFQUFFLEtBQUYsRUFBRixDQUFwQyxFQUFpRCxFQUFFLElBQUUsR0FBSixJQUFTLENBQWpFO0FBQW1FLGNBQU8sQ0FBUDtBQUFTLGNBQVMsRUFBVCxDQUFZLENBQVosRUFBYztBQUFDLGFBQU8sRUFBRSxDQUFGLElBQUssQ0FBQyxDQUFOLEVBQVEsQ0FBZjtBQUFpQixjQUFTLEVBQVQsQ0FBWSxDQUFaLEVBQWM7QUFBQyxVQUFJLElBQUUsRUFBRSxhQUFGLENBQWdCLFVBQWhCLENBQU4sQ0FBa0MsSUFBRztBQUFDLGVBQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBRixDQUFSO0FBQWEsT0FBakIsQ0FBaUIsT0FBTSxDQUFOLEVBQVE7QUFBQyxlQUFNLENBQUMsQ0FBUDtBQUFTLE9BQW5DLFNBQTBDO0FBQUMsVUFBRSxVQUFGLElBQWMsRUFBRSxVQUFGLENBQWEsV0FBYixDQUF5QixDQUF6QixDQUFkLEVBQTBDLElBQUUsSUFBNUM7QUFBaUQ7QUFBQyxjQUFTLEVBQVQsQ0FBWSxDQUFaLEVBQWMsQ0FBZCxFQUFnQjtBQUFDLFVBQUksSUFBRSxFQUFFLEtBQUYsQ0FBUSxHQUFSLENBQU47QUFBQSxVQUFtQixJQUFFLEVBQUUsTUFBdkIsQ0FBOEIsT0FBTSxHQUFOO0FBQVUsVUFBRSxVQUFGLENBQWEsRUFBRSxDQUFGLENBQWIsSUFBbUIsQ0FBbkI7QUFBVjtBQUErQixjQUFTLEVBQVQsQ0FBWSxDQUFaLEVBQWMsQ0FBZCxFQUFnQjtBQUFDLFVBQUksSUFBRSxLQUFHLENBQVQ7QUFBQSxVQUFXLElBQUUsS0FBRyxNQUFJLEVBQUUsUUFBVCxJQUFtQixNQUFJLEVBQUUsUUFBekIsSUFBbUMsRUFBRSxXQUFGLEdBQWMsRUFBRSxXQUFoRSxDQUE0RSxJQUFHLENBQUgsRUFBSyxPQUFPLENBQVAsQ0FBUyxJQUFHLENBQUgsRUFBSyxPQUFNLElBQUUsRUFBRSxXQUFWO0FBQXNCLFlBQUcsTUFBSSxDQUFQLEVBQVMsT0FBTSxDQUFDLENBQVA7QUFBL0IsT0FBd0MsT0FBTyxJQUFFLENBQUYsR0FBSSxDQUFDLENBQVo7QUFBYyxjQUFTLEVBQVQsQ0FBWSxDQUFaLEVBQWM7QUFBQyxhQUFPLFVBQVMsQ0FBVCxFQUFXO0FBQUMsWUFBSSxJQUFFLEVBQUUsUUFBRixDQUFXLFdBQVgsRUFBTixDQUErQixPQUFNLFlBQVUsQ0FBVixJQUFhLEVBQUUsSUFBRixLQUFTLENBQTVCO0FBQThCLE9BQWhGO0FBQWlGLGNBQVMsRUFBVCxDQUFZLENBQVosRUFBYztBQUFDLGFBQU8sVUFBUyxDQUFULEVBQVc7QUFBQyxZQUFJLElBQUUsRUFBRSxRQUFGLENBQVcsV0FBWCxFQUFOLENBQStCLE9BQU0sQ0FBQyxZQUFVLENBQVYsSUFBYSxhQUFXLENBQXpCLEtBQTZCLEVBQUUsSUFBRixLQUFTLENBQTVDO0FBQThDLE9BQWhHO0FBQWlHLGNBQVMsRUFBVCxDQUFZLENBQVosRUFBYztBQUFDLGFBQU8sVUFBUyxDQUFULEVBQVc7QUFBQyxlQUFNLFVBQVMsQ0FBVCxHQUFXLEVBQUUsVUFBRixJQUFjLEVBQUUsUUFBRixLQUFhLENBQUMsQ0FBNUIsR0FBOEIsV0FBVSxDQUFWLEdBQVksV0FBVSxFQUFFLFVBQVosR0FBdUIsRUFBRSxVQUFGLENBQWEsUUFBYixLQUF3QixDQUEvQyxHQUFpRCxFQUFFLFFBQUYsS0FBYSxDQUExRSxHQUE0RSxFQUFFLFVBQUYsS0FBZSxDQUFmLElBQWtCLEVBQUUsVUFBRixLQUFlLENBQUMsQ0FBaEIsSUFBbUIsR0FBRyxDQUFILE1BQVEsQ0FBdkosR0FBeUosRUFBRSxRQUFGLEtBQWEsQ0FBakwsR0FBbUwsV0FBVSxDQUFWLElBQWEsRUFBRSxRQUFGLEtBQWEsQ0FBbk47QUFBcU4sT0FBeE87QUFBeU8sY0FBUyxFQUFULENBQVksQ0FBWixFQUFjO0FBQUMsYUFBTyxHQUFHLFVBQVMsQ0FBVCxFQUFXO0FBQUMsZUFBTyxJQUFFLENBQUMsQ0FBSCxFQUFLLEdBQUcsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsY0FBSSxDQUFKO0FBQUEsY0FBTSxJQUFFLEVBQUUsRUFBRixFQUFLLEVBQUUsTUFBUCxFQUFjLENBQWQsQ0FBUjtBQUFBLGNBQXlCLElBQUUsRUFBRSxNQUE3QixDQUFvQyxPQUFNLEdBQU47QUFBVSxjQUFFLElBQUUsRUFBRSxDQUFGLENBQUosTUFBWSxFQUFFLENBQUYsSUFBSyxFQUFFLEVBQUUsQ0FBRixJQUFLLEVBQUUsQ0FBRixDQUFQLENBQWpCO0FBQVY7QUFBeUMsU0FBOUYsQ0FBWjtBQUE0RyxPQUEzSCxDQUFQO0FBQW9JLGNBQVMsRUFBVCxDQUFZLENBQVosRUFBYztBQUFDLGFBQU8sS0FBRyxlQUFhLE9BQU8sRUFBRSxvQkFBekIsSUFBK0MsQ0FBdEQ7QUFBd0QsU0FBRSxHQUFHLE9BQUgsR0FBVyxFQUFiLEVBQWdCLElBQUUsR0FBRyxLQUFILEdBQVMsVUFBUyxDQUFULEVBQVc7QUFBQyxVQUFJLElBQUUsS0FBRyxDQUFDLEVBQUUsYUFBRixJQUFpQixDQUFsQixFQUFxQixlQUE5QixDQUE4QyxPQUFNLENBQUMsQ0FBQyxDQUFGLElBQUssV0FBUyxFQUFFLFFBQXRCO0FBQStCLEtBQXBILEVBQXFILElBQUUsR0FBRyxXQUFILEdBQWUsVUFBUyxDQUFULEVBQVc7QUFBQyxVQUFJLENBQUo7QUFBQSxVQUFNLENBQU47QUFBQSxVQUFRLElBQUUsSUFBRSxFQUFFLGFBQUYsSUFBaUIsQ0FBbkIsR0FBcUIsQ0FBL0IsQ0FBaUMsT0FBTyxNQUFJLENBQUosSUFBTyxNQUFJLEVBQUUsUUFBYixJQUF1QixFQUFFLGVBQXpCLElBQTBDLElBQUUsQ0FBRixFQUFJLElBQUUsRUFBRSxlQUFSLEVBQXdCLElBQUUsQ0FBQyxFQUFFLENBQUYsQ0FBM0IsRUFBZ0MsTUFBSSxDQUFKLEtBQVEsSUFBRSxFQUFFLFdBQVosS0FBMEIsRUFBRSxHQUFGLEtBQVEsQ0FBbEMsS0FBc0MsRUFBRSxnQkFBRixHQUFtQixFQUFFLGdCQUFGLENBQW1CLFFBQW5CLEVBQTRCLEVBQTVCLEVBQStCLENBQUMsQ0FBaEMsQ0FBbkIsR0FBc0QsRUFBRSxXQUFGLElBQWUsRUFBRSxXQUFGLENBQWMsVUFBZCxFQUF5QixFQUF6QixDQUEzRyxDQUFoQyxFQUF5SyxFQUFFLFVBQUYsR0FBYSxHQUFHLFVBQVMsQ0FBVCxFQUFXO0FBQUMsZUFBTyxFQUFFLFNBQUYsR0FBWSxHQUFaLEVBQWdCLENBQUMsRUFBRSxZQUFGLENBQWUsV0FBZixDQUF4QjtBQUFvRCxPQUFuRSxDQUF0TCxFQUEyUCxFQUFFLG9CQUFGLEdBQXVCLEdBQUcsVUFBUyxDQUFULEVBQVc7QUFBQyxlQUFPLEVBQUUsV0FBRixDQUFjLEVBQUUsYUFBRixDQUFnQixFQUFoQixDQUFkLEdBQW1DLENBQUMsRUFBRSxvQkFBRixDQUF1QixHQUF2QixFQUE0QixNQUF2RTtBQUE4RSxPQUE3RixDQUFsUixFQUFpWCxFQUFFLHNCQUFGLEdBQXlCLEVBQUUsSUFBRixDQUFPLEVBQUUsc0JBQVQsQ0FBMVksRUFBMmEsRUFBRSxPQUFGLEdBQVUsR0FBRyxVQUFTLENBQVQsRUFBVztBQUFDLGVBQU8sRUFBRSxXQUFGLENBQWMsQ0FBZCxFQUFpQixFQUFqQixHQUFvQixDQUFwQixFQUFzQixDQUFDLEVBQUUsaUJBQUgsSUFBc0IsQ0FBQyxFQUFFLGlCQUFGLENBQW9CLENBQXBCLEVBQXVCLE1BQTNFO0FBQWtGLE9BQWpHLENBQXJiLEVBQXdoQixFQUFFLE9BQUYsSUFBVyxFQUFFLE1BQUYsQ0FBUyxFQUFULEdBQVksVUFBUyxDQUFULEVBQVc7QUFBQyxZQUFJLElBQUUsRUFBRSxPQUFGLENBQVUsQ0FBVixFQUFZLEVBQVosQ0FBTixDQUFzQixPQUFPLFVBQVMsQ0FBVCxFQUFXO0FBQUMsaUJBQU8sRUFBRSxZQUFGLENBQWUsSUFBZixNQUF1QixDQUE5QjtBQUFnQyxTQUFuRDtBQUFvRCxPQUFsRyxFQUFtRyxFQUFFLElBQUYsQ0FBTyxFQUFQLEdBQVUsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsWUFBRyxlQUFhLE9BQU8sRUFBRSxjQUF0QixJQUFzQyxDQUF6QyxFQUEyQztBQUFDLGNBQUksSUFBRSxFQUFFLGNBQUYsQ0FBaUIsQ0FBakIsQ0FBTixDQUEwQixPQUFPLElBQUUsQ0FBQyxDQUFELENBQUYsR0FBTSxFQUFiO0FBQWdCO0FBQUMsT0FBN04sS0FBZ08sRUFBRSxNQUFGLENBQVMsRUFBVCxHQUFZLFVBQVMsQ0FBVCxFQUFXO0FBQUMsWUFBSSxJQUFFLEVBQUUsT0FBRixDQUFVLENBQVYsRUFBWSxFQUFaLENBQU4sQ0FBc0IsT0FBTyxVQUFTLENBQVQsRUFBVztBQUFDLGNBQUksSUFBRSxlQUFhLE9BQU8sRUFBRSxnQkFBdEIsSUFBd0MsRUFBRSxnQkFBRixDQUFtQixJQUFuQixDQUE5QyxDQUF1RSxPQUFPLEtBQUcsRUFBRSxLQUFGLEtBQVUsQ0FBcEI7QUFBc0IsU0FBaEg7QUFBaUgsT0FBL0osRUFBZ0ssRUFBRSxJQUFGLENBQU8sRUFBUCxHQUFVLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFlBQUcsZUFBYSxPQUFPLEVBQUUsY0FBdEIsSUFBc0MsQ0FBekMsRUFBMkM7QUFBQyxjQUFJLENBQUo7QUFBQSxjQUFNLENBQU47QUFBQSxjQUFRLENBQVI7QUFBQSxjQUFVLElBQUUsRUFBRSxjQUFGLENBQWlCLENBQWpCLENBQVosQ0FBZ0MsSUFBRyxDQUFILEVBQUs7QUFBQyxnQkFBRyxJQUFFLEVBQUUsZ0JBQUYsQ0FBbUIsSUFBbkIsQ0FBRixFQUEyQixLQUFHLEVBQUUsS0FBRixLQUFVLENBQTNDLEVBQTZDLE9BQU0sQ0FBQyxDQUFELENBQU4sQ0FBVSxJQUFFLEVBQUUsaUJBQUYsQ0FBb0IsQ0FBcEIsQ0FBRixFQUF5QixJQUFFLENBQTNCLENBQTZCLE9BQU0sSUFBRSxFQUFFLEdBQUYsQ0FBUjtBQUFlLGtCQUFHLElBQUUsRUFBRSxnQkFBRixDQUFtQixJQUFuQixDQUFGLEVBQTJCLEtBQUcsRUFBRSxLQUFGLEtBQVUsQ0FBM0MsRUFBNkMsT0FBTSxDQUFDLENBQUQsQ0FBTjtBQUE1RDtBQUFzRSxrQkFBTSxFQUFOO0FBQVM7QUFBQyxPQUE5b0IsQ0FBeGhCLEVBQXdxQyxFQUFFLElBQUYsQ0FBTyxHQUFQLEdBQVcsRUFBRSxvQkFBRixHQUF1QixVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxlQUFNLGVBQWEsT0FBTyxFQUFFLG9CQUF0QixHQUEyQyxFQUFFLG9CQUFGLENBQXVCLENBQXZCLENBQTNDLEdBQXFFLEVBQUUsR0FBRixHQUFNLEVBQUUsZ0JBQUYsQ0FBbUIsQ0FBbkIsQ0FBTixHQUE0QixLQUFLLENBQTVHO0FBQThHLE9BQW5KLEdBQW9KLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFlBQUksQ0FBSjtBQUFBLFlBQU0sSUFBRSxFQUFSO0FBQUEsWUFBVyxJQUFFLENBQWI7QUFBQSxZQUFlLElBQUUsRUFBRSxvQkFBRixDQUF1QixDQUF2QixDQUFqQixDQUEyQyxJQUFHLFFBQU0sQ0FBVCxFQUFXO0FBQUMsaUJBQU0sSUFBRSxFQUFFLEdBQUYsQ0FBUjtBQUFlLGtCQUFJLEVBQUUsUUFBTixJQUFnQixFQUFFLElBQUYsQ0FBTyxDQUFQLENBQWhCO0FBQWYsV0FBeUMsT0FBTyxDQUFQO0FBQVMsZ0JBQU8sQ0FBUDtBQUFTLE9BQXY4QyxFQUF3OEMsRUFBRSxJQUFGLENBQU8sS0FBUCxHQUFhLEVBQUUsc0JBQUYsSUFBMEIsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsWUFBRyxlQUFhLE9BQU8sRUFBRSxzQkFBdEIsSUFBOEMsQ0FBakQsRUFBbUQsT0FBTyxFQUFFLHNCQUFGLENBQXlCLENBQXpCLENBQVA7QUFBbUMsT0FBbmxELEVBQW9sRCxJQUFFLEVBQXRsRCxFQUF5bEQsSUFBRSxFQUEzbEQsRUFBOGxELENBQUMsRUFBRSxHQUFGLEdBQU0sRUFBRSxJQUFGLENBQU8sRUFBRSxnQkFBVCxDQUFQLE1BQXFDLEdBQUcsVUFBUyxDQUFULEVBQVc7QUFBQyxVQUFFLFdBQUYsQ0FBYyxDQUFkLEVBQWlCLFNBQWpCLEdBQTJCLFlBQVUsQ0FBVixHQUFZLG9CQUFaLEdBQWlDLENBQWpDLEdBQW1DLGlFQUE5RCxFQUFnSSxFQUFFLGdCQUFGLENBQW1CLHNCQUFuQixFQUEyQyxNQUEzQyxJQUFtRCxFQUFFLElBQUYsQ0FBTyxXQUFTLENBQVQsR0FBVyxjQUFsQixDQUFuTCxFQUFxTixFQUFFLGdCQUFGLENBQW1CLFlBQW5CLEVBQWlDLE1BQWpDLElBQXlDLEVBQUUsSUFBRixDQUFPLFFBQU0sQ0FBTixHQUFRLFlBQVIsR0FBcUIsQ0FBckIsR0FBdUIsR0FBOUIsQ0FBOVAsRUFBaVMsRUFBRSxnQkFBRixDQUFtQixVQUFRLENBQVIsR0FBVSxJQUE3QixFQUFtQyxNQUFuQyxJQUEyQyxFQUFFLElBQUYsQ0FBTyxJQUFQLENBQTVVLEVBQXlWLEVBQUUsZ0JBQUYsQ0FBbUIsVUFBbkIsRUFBK0IsTUFBL0IsSUFBdUMsRUFBRSxJQUFGLENBQU8sVUFBUCxDQUFoWSxFQUFtWixFQUFFLGdCQUFGLENBQW1CLE9BQUssQ0FBTCxHQUFPLElBQTFCLEVBQWdDLE1BQWhDLElBQXdDLEVBQUUsSUFBRixDQUFPLFVBQVAsQ0FBM2I7QUFBOGMsT0FBN2QsR0FBK2QsR0FBRyxVQUFTLENBQVQsRUFBVztBQUFDLFVBQUUsU0FBRixHQUFZLG1GQUFaLENBQWdHLElBQUksSUFBRSxFQUFFLGFBQUYsQ0FBZ0IsT0FBaEIsQ0FBTixDQUErQixFQUFFLFlBQUYsQ0FBZSxNQUFmLEVBQXNCLFFBQXRCLEdBQWdDLEVBQUUsV0FBRixDQUFjLENBQWQsRUFBaUIsWUFBakIsQ0FBOEIsTUFBOUIsRUFBcUMsR0FBckMsQ0FBaEMsRUFBMEUsRUFBRSxnQkFBRixDQUFtQixVQUFuQixFQUErQixNQUEvQixJQUF1QyxFQUFFLElBQUYsQ0FBTyxTQUFPLENBQVAsR0FBUyxhQUFoQixDQUFqSCxFQUFnSixNQUFJLEVBQUUsZ0JBQUYsQ0FBbUIsVUFBbkIsRUFBK0IsTUFBbkMsSUFBMkMsRUFBRSxJQUFGLENBQU8sVUFBUCxFQUFrQixXQUFsQixDQUEzTCxFQUEwTixFQUFFLFdBQUYsQ0FBYyxDQUFkLEVBQWlCLFFBQWpCLEdBQTBCLENBQUMsQ0FBclAsRUFBdVAsTUFBSSxFQUFFLGdCQUFGLENBQW1CLFdBQW5CLEVBQWdDLE1BQXBDLElBQTRDLEVBQUUsSUFBRixDQUFPLFVBQVAsRUFBa0IsV0FBbEIsQ0FBblMsRUFBa1UsRUFBRSxnQkFBRixDQUFtQixNQUFuQixDQUFsVSxFQUE2VixFQUFFLElBQUYsQ0FBTyxNQUFQLENBQTdWO0FBQTRXLE9BQTFmLENBQXBnQixDQUE5bEQsRUFBK2xGLENBQUMsRUFBRSxlQUFGLEdBQWtCLEVBQUUsSUFBRixDQUFPLElBQUUsRUFBRSxPQUFGLElBQVcsRUFBRSxxQkFBYixJQUFvQyxFQUFFLGtCQUF0QyxJQUEwRCxFQUFFLGdCQUE1RCxJQUE4RSxFQUFFLGlCQUF6RixDQUFuQixLQUFpSSxHQUFHLFVBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBRSxpQkFBRixHQUFvQixFQUFFLElBQUYsQ0FBTyxDQUFQLEVBQVMsR0FBVCxDQUFwQixFQUFrQyxFQUFFLElBQUYsQ0FBTyxDQUFQLEVBQVMsV0FBVCxDQUFsQyxFQUF3RCxFQUFFLElBQUYsQ0FBTyxJQUFQLEVBQVksQ0FBWixDQUF4RDtBQUF1RSxPQUF0RixDQUFodUYsRUFBd3pGLElBQUUsRUFBRSxNQUFGLElBQVUsSUFBSSxNQUFKLENBQVcsRUFBRSxJQUFGLENBQU8sR0FBUCxDQUFYLENBQXAwRixFQUE0MUYsSUFBRSxFQUFFLE1BQUYsSUFBVSxJQUFJLE1BQUosQ0FBVyxFQUFFLElBQUYsQ0FBTyxHQUFQLENBQVgsQ0FBeDJGLEVBQWc0RixJQUFFLEVBQUUsSUFBRixDQUFPLEVBQUUsdUJBQVQsQ0FBbDRGLEVBQW82RixJQUFFLEtBQUcsRUFBRSxJQUFGLENBQU8sRUFBRSxRQUFULENBQUgsR0FBc0IsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsWUFBSSxJQUFFLE1BQUksRUFBRSxRQUFOLEdBQWUsRUFBRSxlQUFqQixHQUFpQyxDQUF2QztBQUFBLFlBQXlDLElBQUUsS0FBRyxFQUFFLFVBQWhELENBQTJELE9BQU8sTUFBSSxDQUFKLElBQU8sRUFBRSxDQUFDLENBQUQsSUFBSSxNQUFJLEVBQUUsUUFBVixJQUFvQixFQUFFLEVBQUUsUUFBRixHQUFXLEVBQUUsUUFBRixDQUFXLENBQVgsQ0FBWCxHQUF5QixFQUFFLHVCQUFGLElBQTJCLEtBQUcsRUFBRSx1QkFBRixDQUEwQixDQUExQixDQUF6RCxDQUF0QixDQUFkO0FBQTRILE9BQTNOLEdBQTROLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFlBQUcsQ0FBSCxFQUFLLE9BQU0sSUFBRSxFQUFFLFVBQVY7QUFBcUIsY0FBRyxNQUFJLENBQVAsRUFBUyxPQUFNLENBQUMsQ0FBUDtBQUE5QixTQUF1QyxPQUFNLENBQUMsQ0FBUDtBQUFTLE9BQXJzRyxFQUFzc0csSUFBRSxJQUFFLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFlBQUcsTUFBSSxDQUFQLEVBQVMsT0FBTyxJQUFFLENBQUMsQ0FBSCxFQUFLLENBQVosQ0FBYyxJQUFJLElBQUUsQ0FBQyxFQUFFLHVCQUFILEdBQTJCLENBQUMsRUFBRSx1QkFBcEMsQ0FBNEQsT0FBTyxJQUFFLENBQUYsSUFBSyxJQUFFLENBQUMsRUFBRSxhQUFGLElBQWlCLENBQWxCLE9BQXdCLEVBQUUsYUFBRixJQUFpQixDQUF6QyxJQUE0QyxFQUFFLHVCQUFGLENBQTBCLENBQTFCLENBQTVDLEdBQXlFLENBQTNFLEVBQTZFLElBQUUsQ0FBRixJQUFLLENBQUMsRUFBRSxZQUFILElBQWlCLEVBQUUsdUJBQUYsQ0FBMEIsQ0FBMUIsTUFBK0IsQ0FBckQsR0FBdUQsTUFBSSxDQUFKLElBQU8sRUFBRSxhQUFGLEtBQWtCLENBQWxCLElBQXFCLEVBQUUsQ0FBRixFQUFJLENBQUosQ0FBNUIsR0FBbUMsQ0FBQyxDQUFwQyxHQUFzQyxNQUFJLENBQUosSUFBTyxFQUFFLGFBQUYsS0FBa0IsQ0FBbEIsSUFBcUIsRUFBRSxDQUFGLEVBQUksQ0FBSixDQUE1QixHQUFtQyxDQUFuQyxHQUFxQyxJQUFFLEVBQUUsQ0FBRixFQUFJLENBQUosSUFBTyxFQUFFLENBQUYsRUFBSSxDQUFKLENBQVQsR0FBZ0IsQ0FBbEosR0FBb0osSUFBRSxDQUFGLEdBQUksQ0FBQyxDQUFMLEdBQU8sQ0FBN08sQ0FBUDtBQUF1UCxPQUExVixHQUEyVixVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxZQUFHLE1BQUksQ0FBUCxFQUFTLE9BQU8sSUFBRSxDQUFDLENBQUgsRUFBSyxDQUFaLENBQWMsSUFBSSxDQUFKO0FBQUEsWUFBTSxJQUFFLENBQVI7QUFBQSxZQUFVLElBQUUsRUFBRSxVQUFkO0FBQUEsWUFBeUIsSUFBRSxFQUFFLFVBQTdCO0FBQUEsWUFBd0MsSUFBRSxDQUFDLENBQUQsQ0FBMUM7QUFBQSxZQUE4QyxJQUFFLENBQUMsQ0FBRCxDQUFoRCxDQUFvRCxJQUFHLENBQUMsQ0FBRCxJQUFJLENBQUMsQ0FBUixFQUFVLE9BQU8sTUFBSSxDQUFKLEdBQU0sQ0FBQyxDQUFQLEdBQVMsTUFBSSxDQUFKLEdBQU0sQ0FBTixHQUFRLElBQUUsQ0FBQyxDQUFILEdBQUssSUFBRSxDQUFGLEdBQUksSUFBRSxFQUFFLENBQUYsRUFBSSxDQUFKLElBQU8sRUFBRSxDQUFGLEVBQUksQ0FBSixDQUFULEdBQWdCLENBQWpELENBQW1ELElBQUcsTUFBSSxDQUFQLEVBQVMsT0FBTyxHQUFHLENBQUgsRUFBSyxDQUFMLENBQVAsQ0FBZSxJQUFFLENBQUYsQ0FBSSxPQUFNLElBQUUsRUFBRSxVQUFWO0FBQXFCLFlBQUUsT0FBRixDQUFVLENBQVY7QUFBckIsU0FBa0MsSUFBRSxDQUFGLENBQUksT0FBTSxJQUFFLEVBQUUsVUFBVjtBQUFxQixZQUFFLE9BQUYsQ0FBVSxDQUFWO0FBQXJCLFNBQWtDLE9BQU0sRUFBRSxDQUFGLE1BQU8sRUFBRSxDQUFGLENBQWI7QUFBa0I7QUFBbEIsU0FBc0IsT0FBTyxJQUFFLEdBQUcsRUFBRSxDQUFGLENBQUgsRUFBUSxFQUFFLENBQUYsQ0FBUixDQUFGLEdBQWdCLEVBQUUsQ0FBRixNQUFPLENBQVAsR0FBUyxDQUFDLENBQVYsR0FBWSxFQUFFLENBQUYsTUFBTyxDQUFQLEdBQVMsQ0FBVCxHQUFXLENBQTlDO0FBQWdELE9BQW4ySCxFQUFvMkgsQ0FBOTRILElBQWk1SCxDQUF4NUg7QUFBMDVILEtBQTdrSSxFQUE4a0ksR0FBRyxPQUFILEdBQVcsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsYUFBTyxHQUFHLENBQUgsRUFBSyxJQUFMLEVBQVUsSUFBVixFQUFlLENBQWYsQ0FBUDtBQUF5QixLQUFob0ksRUFBaW9JLEdBQUcsZUFBSCxHQUFtQixVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxVQUFHLENBQUMsRUFBRSxhQUFGLElBQWlCLENBQWxCLE1BQXVCLENBQXZCLElBQTBCLEVBQUUsQ0FBRixDQUExQixFQUErQixJQUFFLEVBQUUsT0FBRixDQUFVLENBQVYsRUFBWSxRQUFaLENBQWpDLEVBQXVELEVBQUUsZUFBRixJQUFtQixDQUFuQixJQUFzQixDQUFDLEVBQUUsSUFBRSxHQUFKLENBQXZCLEtBQWtDLENBQUMsQ0FBRCxJQUFJLENBQUMsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUF2QyxNQUFvRCxDQUFDLENBQUQsSUFBSSxDQUFDLEVBQUUsSUFBRixDQUFPLENBQVAsQ0FBekQsQ0FBMUQsRUFBOEgsSUFBRztBQUFDLFlBQUksSUFBRSxFQUFFLElBQUYsQ0FBTyxDQUFQLEVBQVMsQ0FBVCxDQUFOLENBQWtCLElBQUcsS0FBRyxFQUFFLGlCQUFMLElBQXdCLEVBQUUsUUFBRixJQUFZLE9BQUssRUFBRSxRQUFGLENBQVcsUUFBdkQsRUFBZ0UsT0FBTyxDQUFQO0FBQVMsT0FBL0YsQ0FBK0YsT0FBTSxDQUFOLEVBQVEsQ0FBRSxRQUFPLEdBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxJQUFQLEVBQVksQ0FBQyxDQUFELENBQVosRUFBaUIsTUFBakIsR0FBd0IsQ0FBL0I7QUFBaUMsS0FBMTZJLEVBQTI2SSxHQUFHLFFBQUgsR0FBWSxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxhQUFNLENBQUMsRUFBRSxhQUFGLElBQWlCLENBQWxCLE1BQXVCLENBQXZCLElBQTBCLEVBQUUsQ0FBRixDQUExQixFQUErQixFQUFFLENBQUYsRUFBSSxDQUFKLENBQXJDO0FBQTRDLEtBQWovSSxFQUFrL0ksR0FBRyxJQUFILEdBQVEsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsT0FBQyxFQUFFLGFBQUYsSUFBaUIsQ0FBbEIsTUFBdUIsQ0FBdkIsSUFBMEIsRUFBRSxDQUFGLENBQTFCLENBQStCLElBQUksSUFBRSxFQUFFLFVBQUYsQ0FBYSxFQUFFLFdBQUYsRUFBYixDQUFOO0FBQUEsVUFBb0MsSUFBRSxLQUFHLEVBQUUsSUFBRixDQUFPLEVBQUUsVUFBVCxFQUFvQixFQUFFLFdBQUYsRUFBcEIsQ0FBSCxHQUF3QyxFQUFFLENBQUYsRUFBSSxDQUFKLEVBQU0sQ0FBQyxDQUFQLENBQXhDLEdBQWtELEtBQUssQ0FBN0YsQ0FBK0YsT0FBTyxLQUFLLENBQUwsS0FBUyxDQUFULEdBQVcsQ0FBWCxHQUFhLEVBQUUsVUFBRixJQUFjLENBQUMsQ0FBZixHQUFpQixFQUFFLFlBQUYsQ0FBZSxDQUFmLENBQWpCLEdBQW1DLENBQUMsSUFBRSxFQUFFLGdCQUFGLENBQW1CLENBQW5CLENBQUgsS0FBMkIsRUFBRSxTQUE3QixHQUF1QyxFQUFFLEtBQXpDLEdBQStDLElBQXRHO0FBQTJHLEtBQWp2SixFQUFrdkosR0FBRyxNQUFILEdBQVUsVUFBUyxDQUFULEVBQVc7QUFBQyxhQUFNLENBQUMsSUFBRSxFQUFILEVBQU8sT0FBUCxDQUFlLEVBQWYsRUFBa0IsRUFBbEIsQ0FBTjtBQUE0QixLQUFweUosRUFBcXlKLEdBQUcsS0FBSCxHQUFTLFVBQVMsQ0FBVCxFQUFXO0FBQUMsWUFBTSxJQUFJLEtBQUosQ0FBVSw0Q0FBMEMsQ0FBcEQsQ0FBTjtBQUE2RCxLQUF2M0osRUFBdzNKLEdBQUcsVUFBSCxHQUFjLFVBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBSSxDQUFKO0FBQUEsVUFBTSxJQUFFLEVBQVI7QUFBQSxVQUFXLElBQUUsQ0FBYjtBQUFBLFVBQWUsSUFBRSxDQUFqQixDQUFtQixJQUFHLElBQUUsQ0FBQyxFQUFFLGdCQUFMLEVBQXNCLElBQUUsQ0FBQyxFQUFFLFVBQUgsSUFBZSxFQUFFLEtBQUYsQ0FBUSxDQUFSLENBQXZDLEVBQWtELEVBQUUsSUFBRixDQUFPLENBQVAsQ0FBbEQsRUFBNEQsQ0FBL0QsRUFBaUU7QUFBQyxlQUFNLElBQUUsRUFBRSxHQUFGLENBQVI7QUFBZSxnQkFBSSxFQUFFLENBQUYsQ0FBSixLQUFXLElBQUUsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUFiO0FBQWYsU0FBdUMsT0FBTSxHQUFOO0FBQVUsWUFBRSxNQUFGLENBQVMsRUFBRSxDQUFGLENBQVQsRUFBYyxDQUFkO0FBQVY7QUFBMkIsY0FBTyxJQUFFLElBQUYsRUFBTyxDQUFkO0FBQWdCLEtBQXpqSyxFQUEwakssSUFBRSxHQUFHLE9BQUgsR0FBVyxVQUFTLENBQVQsRUFBVztBQUFDLFVBQUksQ0FBSjtBQUFBLFVBQU0sSUFBRSxFQUFSO0FBQUEsVUFBVyxJQUFFLENBQWI7QUFBQSxVQUFlLElBQUUsRUFBRSxRQUFuQixDQUE0QixJQUFHLENBQUgsRUFBSztBQUFDLFlBQUcsTUFBSSxDQUFKLElBQU8sTUFBSSxDQUFYLElBQWMsT0FBSyxDQUF0QixFQUF3QjtBQUFDLGNBQUcsWUFBVSxPQUFPLEVBQUUsV0FBdEIsRUFBa0MsT0FBTyxFQUFFLFdBQVQsQ0FBcUIsS0FBSSxJQUFFLEVBQUUsVUFBUixFQUFtQixDQUFuQixFQUFxQixJQUFFLEVBQUUsV0FBekI7QUFBcUMsaUJBQUcsRUFBRSxDQUFGLENBQUg7QUFBckM7QUFBNkMsU0FBN0gsTUFBa0ksSUFBRyxNQUFJLENBQUosSUFBTyxNQUFJLENBQWQsRUFBZ0IsT0FBTyxFQUFFLFNBQVQ7QUFBbUIsT0FBM0ssTUFBZ0wsT0FBTSxJQUFFLEVBQUUsR0FBRixDQUFSO0FBQWUsYUFBRyxFQUFFLENBQUYsQ0FBSDtBQUFmLE9BQXVCLE9BQU8sQ0FBUDtBQUFTLEtBQS96SyxFQUFnMEssSUFBRSxHQUFHLFNBQUgsR0FBYSxFQUFDLGFBQVksRUFBYixFQUFnQixjQUFhLEVBQTdCLEVBQWdDLE9BQU0sQ0FBdEMsRUFBd0MsWUFBVyxFQUFuRCxFQUFzRCxNQUFLLEVBQTNELEVBQThELFVBQVMsRUFBQyxLQUFJLEVBQUMsS0FBSSxZQUFMLEVBQWtCLE9BQU0sQ0FBQyxDQUF6QixFQUFMLEVBQWlDLEtBQUksRUFBQyxLQUFJLFlBQUwsRUFBckMsRUFBd0QsS0FBSSxFQUFDLEtBQUksaUJBQUwsRUFBdUIsT0FBTSxDQUFDLENBQTlCLEVBQTVELEVBQTZGLEtBQUksRUFBQyxLQUFJLGlCQUFMLEVBQWpHLEVBQXZFLEVBQWlNLFdBQVUsRUFBQyxNQUFLLGNBQVMsQ0FBVCxFQUFXO0FBQUMsaUJBQU8sRUFBRSxDQUFGLElBQUssRUFBRSxDQUFGLEVBQUssT0FBTCxDQUFhLENBQWIsRUFBZSxFQUFmLENBQUwsRUFBd0IsRUFBRSxDQUFGLElBQUssQ0FBQyxFQUFFLENBQUYsS0FBTSxFQUFFLENBQUYsQ0FBTixJQUFZLEVBQUUsQ0FBRixDQUFaLElBQWtCLEVBQW5CLEVBQXVCLE9BQXZCLENBQStCLENBQS9CLEVBQWlDLEVBQWpDLENBQTdCLEVBQWtFLFNBQU8sRUFBRSxDQUFGLENBQVAsS0FBYyxFQUFFLENBQUYsSUFBSyxNQUFJLEVBQUUsQ0FBRixDQUFKLEdBQVMsR0FBNUIsQ0FBbEUsRUFBbUcsRUFBRSxLQUFGLENBQVEsQ0FBUixFQUFVLENBQVYsQ0FBMUc7QUFBdUgsU0FBekksRUFBMEksT0FBTSxlQUFTLENBQVQsRUFBVztBQUFDLGlCQUFPLEVBQUUsQ0FBRixJQUFLLEVBQUUsQ0FBRixFQUFLLFdBQUwsRUFBTCxFQUF3QixVQUFRLEVBQUUsQ0FBRixFQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWEsQ0FBYixDQUFSLElBQXlCLEVBQUUsQ0FBRixLQUFNLEdBQUcsS0FBSCxDQUFTLEVBQUUsQ0FBRixDQUFULENBQU4sRUFBcUIsRUFBRSxDQUFGLElBQUssRUFBRSxFQUFFLENBQUYsSUFBSyxFQUFFLENBQUYsS0FBTSxFQUFFLENBQUYsS0FBTSxDQUFaLENBQUwsR0FBb0IsS0FBRyxXQUFTLEVBQUUsQ0FBRixDQUFULElBQWUsVUFBUSxFQUFFLENBQUYsQ0FBMUIsQ0FBdEIsQ0FBMUIsRUFBaUYsRUFBRSxDQUFGLElBQUssRUFBRSxFQUFFLENBQUYsSUFBSyxFQUFFLENBQUYsQ0FBTCxJQUFXLFVBQVEsRUFBRSxDQUFGLENBQXJCLENBQS9HLElBQTJJLEVBQUUsQ0FBRixLQUFNLEdBQUcsS0FBSCxDQUFTLEVBQUUsQ0FBRixDQUFULENBQXpLLEVBQXdMLENBQS9MO0FBQWlNLFNBQTdWLEVBQThWLFFBQU8sZ0JBQVMsQ0FBVCxFQUFXO0FBQUMsY0FBSSxDQUFKO0FBQUEsY0FBTSxJQUFFLENBQUMsRUFBRSxDQUFGLENBQUQsSUFBTyxFQUFFLENBQUYsQ0FBZixDQUFvQixPQUFPLEVBQUUsS0FBRixDQUFRLElBQVIsQ0FBYSxFQUFFLENBQUYsQ0FBYixJQUFtQixJQUFuQixJQUF5QixFQUFFLENBQUYsSUFBSyxFQUFFLENBQUYsSUFBSyxFQUFFLENBQUYsS0FBTSxFQUFFLENBQUYsQ0FBTixJQUFZLEVBQXRCLEdBQXlCLEtBQUcsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUFILEtBQWUsSUFBRSxFQUFFLENBQUYsRUFBSSxDQUFDLENBQUwsQ0FBakIsTUFBNEIsSUFBRSxFQUFFLE9BQUYsQ0FBVSxHQUFWLEVBQWMsRUFBRSxNQUFGLEdBQVMsQ0FBdkIsSUFBMEIsRUFBRSxNQUExRCxNQUFvRSxFQUFFLENBQUYsSUFBSyxFQUFFLENBQUYsRUFBSyxLQUFMLENBQVcsQ0FBWCxFQUFhLENBQWIsQ0FBTCxFQUFxQixFQUFFLENBQUYsSUFBSyxFQUFFLEtBQUYsQ0FBUSxDQUFSLEVBQVUsQ0FBVixDQUE5RixDQUF6QixFQUFxSSxFQUFFLEtBQUYsQ0FBUSxDQUFSLEVBQVUsQ0FBVixDQUE5SixDQUFQO0FBQW1MLFNBQXhqQixFQUEzTSxFQUFxd0IsUUFBTyxFQUFDLEtBQUksYUFBUyxDQUFULEVBQVc7QUFBQyxjQUFJLElBQUUsRUFBRSxPQUFGLENBQVUsQ0FBVixFQUFZLEVBQVosRUFBZ0IsV0FBaEIsRUFBTixDQUFvQyxPQUFNLFFBQU0sQ0FBTixHQUFRLFlBQVU7QUFBQyxtQkFBTSxDQUFDLENBQVA7QUFBUyxXQUE1QixHQUE2QixVQUFTLENBQVQsRUFBVztBQUFDLG1CQUFPLEVBQUUsUUFBRixJQUFZLEVBQUUsUUFBRixDQUFXLFdBQVgsT0FBMkIsQ0FBOUM7QUFBZ0QsV0FBL0Y7QUFBZ0csU0FBckosRUFBc0osT0FBTSxlQUFTLENBQVQsRUFBVztBQUFDLGNBQUksSUFBRSxFQUFFLElBQUUsR0FBSixDQUFOLENBQWUsT0FBTyxLQUFHLENBQUMsSUFBRSxJQUFJLE1BQUosQ0FBVyxRQUFNLENBQU4sR0FBUSxHQUFSLEdBQVksQ0FBWixHQUFjLEdBQWQsR0FBa0IsQ0FBbEIsR0FBb0IsS0FBL0IsQ0FBSCxLQUEyQyxFQUFFLENBQUYsRUFBSSxVQUFTLENBQVQsRUFBVztBQUFDLG1CQUFPLEVBQUUsSUFBRixDQUFPLFlBQVUsT0FBTyxFQUFFLFNBQW5CLElBQThCLEVBQUUsU0FBaEMsSUFBMkMsZUFBYSxPQUFPLEVBQUUsWUFBdEIsSUFBb0MsRUFBRSxZQUFGLENBQWUsT0FBZixDQUEvRSxJQUF3RyxFQUEvRyxDQUFQO0FBQTBILFdBQTFJLENBQXJEO0FBQWlNLFNBQXhYLEVBQXlYLE1BQUssY0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLGlCQUFPLFVBQVMsQ0FBVCxFQUFXO0FBQUMsZ0JBQUksSUFBRSxHQUFHLElBQUgsQ0FBUSxDQUFSLEVBQVUsQ0FBVixDQUFOLENBQW1CLE9BQU8sUUFBTSxDQUFOLEdBQVEsU0FBTyxDQUFmLEdBQWlCLENBQUMsQ0FBRCxLQUFLLEtBQUcsRUFBSCxFQUFNLFFBQU0sQ0FBTixHQUFRLE1BQUksQ0FBWixHQUFjLFNBQU8sQ0FBUCxHQUFTLE1BQUksQ0FBYixHQUFlLFNBQU8sQ0FBUCxHQUFTLEtBQUcsTUFBSSxFQUFFLE9BQUYsQ0FBVSxDQUFWLENBQWhCLEdBQTZCLFNBQU8sQ0FBUCxHQUFTLEtBQUcsRUFBRSxPQUFGLENBQVUsQ0FBVixJQUFhLENBQUMsQ0FBMUIsR0FBNEIsU0FBTyxDQUFQLEdBQVMsS0FBRyxFQUFFLEtBQUYsQ0FBUSxDQUFDLEVBQUUsTUFBWCxNQUFxQixDQUFqQyxHQUFtQyxTQUFPLENBQVAsR0FBUyxDQUFDLE1BQUksRUFBRSxPQUFGLENBQVUsQ0FBVixFQUFZLEdBQVosQ0FBSixHQUFxQixHQUF0QixFQUEyQixPQUEzQixDQUFtQyxDQUFuQyxJQUFzQyxDQUFDLENBQWhELEdBQWtELFNBQU8sQ0FBUCxLQUFXLE1BQUksQ0FBSixJQUFPLEVBQUUsS0FBRixDQUFRLENBQVIsRUFBVSxFQUFFLE1BQUYsR0FBUyxDQUFuQixNQUF3QixJQUFFLEdBQTVDLENBQXRMLENBQXhCO0FBQWdRLFdBQXRTO0FBQXVTLFNBQXJyQixFQUFzckIsT0FBTSxlQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUI7QUFBQyxjQUFJLElBQUUsVUFBUSxFQUFFLEtBQUYsQ0FBUSxDQUFSLEVBQVUsQ0FBVixDQUFkO0FBQUEsY0FBMkIsSUFBRSxXQUFTLEVBQUUsS0FBRixDQUFRLENBQUMsQ0FBVCxDQUF0QztBQUFBLGNBQWtELElBQUUsY0FBWSxDQUFoRSxDQUFrRSxPQUFPLE1BQUksQ0FBSixJQUFPLE1BQUksQ0FBWCxHQUFhLFVBQVMsQ0FBVCxFQUFXO0FBQUMsbUJBQU0sQ0FBQyxDQUFDLEVBQUUsVUFBVjtBQUFxQixXQUE5QyxHQUErQyxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsZ0JBQUksQ0FBSjtBQUFBLGdCQUFNLENBQU47QUFBQSxnQkFBUSxDQUFSO0FBQUEsZ0JBQVUsQ0FBVjtBQUFBLGdCQUFZLENBQVo7QUFBQSxnQkFBYyxDQUFkO0FBQUEsZ0JBQWdCLElBQUUsTUFBSSxDQUFKLEdBQU0sYUFBTixHQUFvQixpQkFBdEM7QUFBQSxnQkFBd0QsSUFBRSxFQUFFLFVBQTVEO0FBQUEsZ0JBQXVFLElBQUUsS0FBRyxFQUFFLFFBQUYsQ0FBVyxXQUFYLEVBQTVFO0FBQUEsZ0JBQXFHLElBQUUsQ0FBQyxDQUFELElBQUksQ0FBQyxDQUE1RztBQUFBLGdCQUE4RyxJQUFFLENBQUMsQ0FBakgsQ0FBbUgsSUFBRyxDQUFILEVBQUs7QUFBQyxrQkFBRyxDQUFILEVBQUs7QUFBQyx1QkFBTSxDQUFOLEVBQVE7QUFBQyxzQkFBRSxDQUFGLENBQUksT0FBTSxJQUFFLEVBQUUsQ0FBRixDQUFSO0FBQWEsd0JBQUcsSUFBRSxFQUFFLFFBQUYsQ0FBVyxXQUFYLE9BQTJCLENBQTdCLEdBQStCLE1BQUksRUFBRSxRQUF4QyxFQUFpRCxPQUFNLENBQUMsQ0FBUDtBQUE5RCxtQkFBdUUsSUFBRSxJQUFFLFdBQVMsQ0FBVCxJQUFZLENBQUMsQ0FBYixJQUFnQixhQUFwQjtBQUFrQyx3QkFBTSxDQUFDLENBQVA7QUFBUyxtQkFBRyxJQUFFLENBQUMsSUFBRSxFQUFFLFVBQUosR0FBZSxFQUFFLFNBQWxCLENBQUYsRUFBK0IsS0FBRyxDQUFyQyxFQUF1QztBQUFDLG9CQUFFLENBQUYsRUFBSSxJQUFFLEVBQUUsQ0FBRixNQUFPLEVBQUUsQ0FBRixJQUFLLEVBQVosQ0FBTixFQUFzQixJQUFFLEVBQUUsRUFBRSxRQUFKLE1BQWdCLEVBQUUsRUFBRSxRQUFKLElBQWMsRUFBOUIsQ0FBeEIsRUFBMEQsSUFBRSxFQUFFLENBQUYsS0FBTSxFQUFsRSxFQUFxRSxJQUFFLEVBQUUsQ0FBRixNQUFPLENBQVAsSUFBVSxFQUFFLENBQUYsQ0FBakYsRUFBc0YsSUFBRSxLQUFHLEVBQUUsQ0FBRixDQUEzRixFQUFnRyxJQUFFLEtBQUcsRUFBRSxVQUFGLENBQWEsQ0FBYixDQUFyRyxDQUFxSCxPQUFNLElBQUUsRUFBRSxDQUFGLElBQUssQ0FBTCxJQUFRLEVBQUUsQ0FBRixDQUFSLEtBQWUsSUFBRSxJQUFFLENBQW5CLEtBQXVCLEVBQUUsR0FBRixFQUEvQjtBQUF1QyxzQkFBRyxNQUFJLEVBQUUsUUFBTixJQUFnQixFQUFFLENBQWxCLElBQXFCLE1BQUksQ0FBNUIsRUFBOEI7QUFBQyxzQkFBRSxDQUFGLElBQUssQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsQ0FBTCxDQUFhO0FBQU07QUFBekY7QUFBMEYsZUFBdlAsTUFBNFAsSUFBRyxNQUFJLElBQUUsQ0FBRixFQUFJLElBQUUsRUFBRSxDQUFGLE1BQU8sRUFBRSxDQUFGLElBQUssRUFBWixDQUFOLEVBQXNCLElBQUUsRUFBRSxFQUFFLFFBQUosTUFBZ0IsRUFBRSxFQUFFLFFBQUosSUFBYyxFQUE5QixDQUF4QixFQUEwRCxJQUFFLEVBQUUsQ0FBRixLQUFNLEVBQWxFLEVBQXFFLElBQUUsRUFBRSxDQUFGLE1BQU8sQ0FBUCxJQUFVLEVBQUUsQ0FBRixDQUFqRixFQUFzRixJQUFFLENBQTVGLEdBQStGLE1BQUksQ0FBQyxDQUF2RyxFQUF5RyxPQUFNLElBQUUsRUFBRSxDQUFGLElBQUssQ0FBTCxJQUFRLEVBQUUsQ0FBRixDQUFSLEtBQWUsSUFBRSxJQUFFLENBQW5CLEtBQXVCLEVBQUUsR0FBRixFQUEvQjtBQUF1QyxvQkFBRyxDQUFDLElBQUUsRUFBRSxRQUFGLENBQVcsV0FBWCxPQUEyQixDQUE3QixHQUErQixNQUFJLEVBQUUsUUFBdEMsS0FBaUQsRUFBRSxDQUFuRCxLQUF1RCxNQUFJLElBQUUsRUFBRSxDQUFGLE1BQU8sRUFBRSxDQUFGLElBQUssRUFBWixDQUFGLEVBQWtCLElBQUUsRUFBRSxFQUFFLFFBQUosTUFBZ0IsRUFBRSxFQUFFLFFBQUosSUFBYyxFQUE5QixDQUFwQixFQUFzRCxFQUFFLENBQUYsSUFBSyxDQUFDLENBQUQsRUFBRyxDQUFILENBQS9ELEdBQXNFLE1BQUksQ0FBakksQ0FBSCxFQUF1STtBQUE5SyxlQUFvTCxPQUFPLEtBQUcsQ0FBSCxFQUFLLE1BQUksQ0FBSixJQUFPLElBQUUsQ0FBRixLQUFNLENBQU4sSUFBUyxJQUFFLENBQUYsSUFBSyxDQUFqQztBQUFtQztBQUFDLFdBQWo0QjtBQUFrNEIsU0FBcHBELEVBQXFwRCxRQUFPLGdCQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxjQUFJLENBQUo7QUFBQSxjQUFNLElBQUUsRUFBRSxPQUFGLENBQVUsQ0FBVixLQUFjLEVBQUUsVUFBRixDQUFhLEVBQUUsV0FBRixFQUFiLENBQWQsSUFBNkMsR0FBRyxLQUFILENBQVMseUJBQXVCLENBQWhDLENBQXJELENBQXdGLE9BQU8sRUFBRSxDQUFGLElBQUssRUFBRSxDQUFGLENBQUwsR0FBVSxFQUFFLE1BQUYsR0FBUyxDQUFULElBQVksSUFBRSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssRUFBTCxFQUFRLENBQVIsQ0FBRixFQUFhLEVBQUUsVUFBRixDQUFhLGNBQWIsQ0FBNEIsRUFBRSxXQUFGLEVBQTVCLElBQTZDLEdBQUcsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsZ0JBQUksQ0FBSjtBQUFBLGdCQUFNLElBQUUsRUFBRSxDQUFGLEVBQUksQ0FBSixDQUFSO0FBQUEsZ0JBQWUsSUFBRSxFQUFFLE1BQW5CLENBQTBCLE9BQU0sR0FBTjtBQUFVLGtCQUFFLEVBQUUsQ0FBRixFQUFJLEVBQUUsQ0FBRixDQUFKLENBQUYsRUFBWSxFQUFFLENBQUYsSUFBSyxFQUFFLEVBQUUsQ0FBRixJQUFLLEVBQUUsQ0FBRixDQUFQLENBQWpCO0FBQVY7QUFBd0MsV0FBbkYsQ0FBN0MsR0FBa0ksVUFBUyxDQUFULEVBQVc7QUFBQyxtQkFBTyxFQUFFLENBQUYsRUFBSSxDQUFKLEVBQU0sQ0FBTixDQUFQO0FBQWdCLFdBQXZMLElBQXlMLENBQTFNO0FBQTRNLFNBQTk4RCxFQUE1d0IsRUFBNHRGLFNBQVEsRUFBQyxLQUFJLEdBQUcsVUFBUyxDQUFULEVBQVc7QUFBQyxjQUFJLElBQUUsRUFBTjtBQUFBLGNBQVMsSUFBRSxFQUFYO0FBQUEsY0FBYyxJQUFFLEVBQUUsRUFBRSxPQUFGLENBQVUsQ0FBVixFQUFZLElBQVosQ0FBRixDQUFoQixDQUFxQyxPQUFPLEVBQUUsQ0FBRixJQUFLLEdBQUcsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCO0FBQUMsZ0JBQUksQ0FBSjtBQUFBLGdCQUFNLElBQUUsRUFBRSxDQUFGLEVBQUksSUFBSixFQUFTLENBQVQsRUFBVyxFQUFYLENBQVI7QUFBQSxnQkFBdUIsSUFBRSxFQUFFLE1BQTNCLENBQWtDLE9BQU0sR0FBTjtBQUFVLGVBQUMsSUFBRSxFQUFFLENBQUYsQ0FBSCxNQUFXLEVBQUUsQ0FBRixJQUFLLEVBQUUsRUFBRSxDQUFGLElBQUssQ0FBUCxDQUFoQjtBQUFWO0FBQXFDLFdBQTVGLENBQUwsR0FBbUcsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLG1CQUFPLEVBQUUsQ0FBRixJQUFLLENBQUwsRUFBTyxFQUFFLENBQUYsRUFBSSxJQUFKLEVBQVMsQ0FBVCxFQUFXLENBQVgsQ0FBUCxFQUFxQixFQUFFLENBQUYsSUFBSyxJQUExQixFQUErQixDQUFDLEVBQUUsR0FBRixFQUF2QztBQUErQyxXQUF6SztBQUEwSyxTQUE5TixDQUFMLEVBQXFPLEtBQUksR0FBRyxVQUFTLENBQVQsRUFBVztBQUFDLGlCQUFPLFVBQVMsQ0FBVCxFQUFXO0FBQUMsbUJBQU8sR0FBRyxDQUFILEVBQUssQ0FBTCxFQUFRLE1BQVIsR0FBZSxDQUF0QjtBQUF3QixXQUEzQztBQUE0QyxTQUEzRCxDQUF6TyxFQUFzUyxVQUFTLEdBQUcsVUFBUyxDQUFULEVBQVc7QUFBQyxpQkFBTyxJQUFFLEVBQUUsT0FBRixDQUFVLENBQVYsRUFBWSxFQUFaLENBQUYsRUFBa0IsVUFBUyxDQUFULEVBQVc7QUFBQyxtQkFBTSxDQUFDLEVBQUUsV0FBRixJQUFlLEVBQUUsU0FBakIsSUFBNEIsRUFBRSxDQUFGLENBQTdCLEVBQW1DLE9BQW5DLENBQTJDLENBQTNDLElBQThDLENBQUMsQ0FBckQ7QUFBdUQsV0FBNUY7QUFBNkYsU0FBNUcsQ0FBL1MsRUFBNlosTUFBSyxHQUFHLFVBQVMsQ0FBVCxFQUFXO0FBQUMsaUJBQU8sRUFBRSxJQUFGLENBQU8sS0FBRyxFQUFWLEtBQWUsR0FBRyxLQUFILENBQVMsdUJBQXFCLENBQTlCLENBQWYsRUFBZ0QsSUFBRSxFQUFFLE9BQUYsQ0FBVSxDQUFWLEVBQVksRUFBWixFQUFnQixXQUFoQixFQUFsRCxFQUFnRixVQUFTLENBQVQsRUFBVztBQUFDLGdCQUFJLENBQUosQ0FBTTtBQUFHLGtCQUFHLElBQUUsSUFBRSxFQUFFLElBQUosR0FBUyxFQUFFLFlBQUYsQ0FBZSxVQUFmLEtBQTRCLEVBQUUsWUFBRixDQUFlLE1BQWYsQ0FBMUMsRUFBaUUsT0FBTyxJQUFFLEVBQUUsV0FBRixFQUFGLEVBQWtCLE1BQUksQ0FBSixJQUFPLE1BQUksRUFBRSxPQUFGLENBQVUsSUFBRSxHQUFaLENBQXBDO0FBQXBFLHFCQUErSCxDQUFDLElBQUUsRUFBRSxVQUFMLEtBQWtCLE1BQUksRUFBRSxRQUF2SixFQUFpSyxPQUFNLENBQUMsQ0FBUDtBQUFTLFdBQW5SO0FBQW9SLFNBQW5TLENBQWxhLEVBQXVzQixRQUFPLGdCQUFTLENBQVQsRUFBVztBQUFDLGNBQUksSUFBRSxFQUFFLFFBQUYsSUFBWSxFQUFFLFFBQUYsQ0FBVyxJQUE3QixDQUFrQyxPQUFPLEtBQUcsRUFBRSxLQUFGLENBQVEsQ0FBUixNQUFhLEVBQUUsRUFBekI7QUFBNEIsU0FBeHhCLEVBQXl4QixNQUFLLGNBQVMsQ0FBVCxFQUFXO0FBQUMsaUJBQU8sTUFBSSxDQUFYO0FBQWEsU0FBdnpCLEVBQXd6QixPQUFNLGVBQVMsQ0FBVCxFQUFXO0FBQUMsaUJBQU8sTUFBSSxFQUFFLGFBQU4sS0FBc0IsQ0FBQyxFQUFFLFFBQUgsSUFBYSxFQUFFLFFBQUYsRUFBbkMsS0FBa0QsQ0FBQyxFQUFFLEVBQUUsSUFBRixJQUFRLEVBQUUsSUFBVixJQUFnQixDQUFDLEVBQUUsUUFBckIsQ0FBMUQ7QUFBeUYsU0FBbjZCLEVBQW82QixTQUFRLEdBQUcsQ0FBQyxDQUFKLENBQTU2QixFQUFtN0IsVUFBUyxHQUFHLENBQUMsQ0FBSixDQUE1N0IsRUFBbThCLFNBQVEsaUJBQVMsQ0FBVCxFQUFXO0FBQUMsY0FBSSxJQUFFLEVBQUUsUUFBRixDQUFXLFdBQVgsRUFBTixDQUErQixPQUFNLFlBQVUsQ0FBVixJQUFhLENBQUMsQ0FBQyxFQUFFLE9BQWpCLElBQTBCLGFBQVcsQ0FBWCxJQUFjLENBQUMsQ0FBQyxFQUFFLFFBQWxEO0FBQTJELFNBQWpqQyxFQUFrakMsVUFBUyxrQkFBUyxDQUFULEVBQVc7QUFBQyxpQkFBTyxFQUFFLFVBQUYsSUFBYyxFQUFFLFVBQUYsQ0FBYSxhQUEzQixFQUF5QyxFQUFFLFFBQUYsS0FBYSxDQUFDLENBQTlEO0FBQWdFLFNBQXZvQyxFQUF3b0MsT0FBTSxlQUFTLENBQVQsRUFBVztBQUFDLGVBQUksSUFBRSxFQUFFLFVBQVIsRUFBbUIsQ0FBbkIsRUFBcUIsSUFBRSxFQUFFLFdBQXpCO0FBQXFDLGdCQUFHLEVBQUUsUUFBRixHQUFXLENBQWQsRUFBZ0IsT0FBTSxDQUFDLENBQVA7QUFBckQsV0FBOEQsT0FBTSxDQUFDLENBQVA7QUFBUyxTQUFqdUMsRUFBa3VDLFFBQU8sZ0JBQVMsQ0FBVCxFQUFXO0FBQUMsaUJBQU0sQ0FBQyxFQUFFLE9BQUYsQ0FBVSxLQUFWLENBQWdCLENBQWhCLENBQVA7QUFBMEIsU0FBL3dDLEVBQWd4QyxRQUFPLGdCQUFTLENBQVQsRUFBVztBQUFDLGlCQUFPLEVBQUUsSUFBRixDQUFPLEVBQUUsUUFBVCxDQUFQO0FBQTBCLFNBQTd6QyxFQUE4ekMsT0FBTSxlQUFTLENBQVQsRUFBVztBQUFDLGlCQUFPLEVBQUUsSUFBRixDQUFPLEVBQUUsUUFBVCxDQUFQO0FBQTBCLFNBQTEyQyxFQUEyMkMsUUFBTyxnQkFBUyxDQUFULEVBQVc7QUFBQyxjQUFJLElBQUUsRUFBRSxRQUFGLENBQVcsV0FBWCxFQUFOLENBQStCLE9BQU0sWUFBVSxDQUFWLElBQWEsYUFBVyxFQUFFLElBQTFCLElBQWdDLGFBQVcsQ0FBakQ7QUFBbUQsU0FBaDlDLEVBQWk5QyxNQUFLLGNBQVMsQ0FBVCxFQUFXO0FBQUMsY0FBSSxDQUFKLENBQU0sT0FBTSxZQUFVLEVBQUUsUUFBRixDQUFXLFdBQVgsRUFBVixJQUFvQyxXQUFTLEVBQUUsSUFBL0MsS0FBc0QsU0FBTyxJQUFFLEVBQUUsWUFBRixDQUFlLE1BQWYsQ0FBVCxLQUFrQyxXQUFTLEVBQUUsV0FBRixFQUFqRyxDQUFOO0FBQXdILFNBQWhtRCxFQUFpbUQsT0FBTSxHQUFHLFlBQVU7QUFBQyxpQkFBTSxDQUFDLENBQUQsQ0FBTjtBQUFVLFNBQXhCLENBQXZtRCxFQUFpb0QsTUFBSyxHQUFHLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLGlCQUFNLENBQUMsSUFBRSxDQUFILENBQU47QUFBWSxTQUE3QixDQUF0b0QsRUFBcXFELElBQUcsR0FBRyxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsaUJBQU0sQ0FBQyxJQUFFLENBQUYsR0FBSSxJQUFFLENBQU4sR0FBUSxDQUFULENBQU47QUFBa0IsU0FBckMsQ0FBeHFELEVBQStzRCxNQUFLLEdBQUcsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsZUFBSSxJQUFJLElBQUUsQ0FBVixFQUFZLElBQUUsQ0FBZCxFQUFnQixLQUFHLENBQW5CO0FBQXFCLGNBQUUsSUFBRixDQUFPLENBQVA7QUFBckIsV0FBK0IsT0FBTyxDQUFQO0FBQVMsU0FBekQsQ0FBcHRELEVBQSt3RCxLQUFJLEdBQUcsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsZUFBSSxJQUFJLElBQUUsQ0FBVixFQUFZLElBQUUsQ0FBZCxFQUFnQixLQUFHLENBQW5CO0FBQXFCLGNBQUUsSUFBRixDQUFPLENBQVA7QUFBckIsV0FBK0IsT0FBTyxDQUFQO0FBQVMsU0FBekQsQ0FBbnhELEVBQTgwRCxJQUFHLEdBQUcsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLGVBQUksSUFBSSxJQUFFLElBQUUsQ0FBRixHQUFJLElBQUUsQ0FBTixHQUFRLENBQWxCLEVBQW9CLEVBQUUsQ0FBRixJQUFLLENBQXpCO0FBQTRCLGNBQUUsSUFBRixDQUFPLENBQVA7QUFBNUIsV0FBc0MsT0FBTyxDQUFQO0FBQVMsU0FBbEUsQ0FBajFELEVBQXE1RCxJQUFHLEdBQUcsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLGVBQUksSUFBSSxJQUFFLElBQUUsQ0FBRixHQUFJLElBQUUsQ0FBTixHQUFRLENBQWxCLEVBQW9CLEVBQUUsQ0FBRixHQUFJLENBQXhCO0FBQTJCLGNBQUUsSUFBRixDQUFPLENBQVA7QUFBM0IsV0FBcUMsT0FBTyxDQUFQO0FBQVMsU0FBakUsQ0FBeDVELEVBQXB1RixFQUEvMEssRUFBZ2hVLEVBQUUsT0FBRixDQUFVLEdBQVYsR0FBYyxFQUFFLE9BQUYsQ0FBVSxFQUF4aVUsQ0FBMmlVLEtBQUksQ0FBSixJQUFRLEVBQUMsT0FBTSxDQUFDLENBQVIsRUFBVSxVQUFTLENBQUMsQ0FBcEIsRUFBc0IsTUFBSyxDQUFDLENBQTVCLEVBQThCLFVBQVMsQ0FBQyxDQUF4QyxFQUEwQyxPQUFNLENBQUMsQ0FBakQsRUFBUjtBQUE0RCxRQUFFLE9BQUYsQ0FBVSxDQUFWLElBQWEsR0FBRyxDQUFILENBQWI7QUFBNUQsS0FBK0UsS0FBSSxDQUFKLElBQVEsRUFBQyxRQUFPLENBQUMsQ0FBVCxFQUFXLE9BQU0sQ0FBQyxDQUFsQixFQUFSO0FBQTZCLFFBQUUsT0FBRixDQUFVLENBQVYsSUFBYSxHQUFHLENBQUgsQ0FBYjtBQUE3QixLQUFnRCxTQUFTLEVBQVQsR0FBYSxDQUFFLElBQUcsU0FBSCxHQUFhLEVBQUUsT0FBRixHQUFVLEVBQUUsT0FBekIsRUFBaUMsRUFBRSxVQUFGLEdBQWEsSUFBSSxFQUFKLEVBQTlDLEVBQXFELElBQUUsR0FBRyxRQUFILEdBQVksVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsVUFBSSxDQUFKO0FBQUEsVUFBTSxDQUFOO0FBQUEsVUFBUSxDQUFSO0FBQUEsVUFBVSxDQUFWO0FBQUEsVUFBWSxDQUFaO0FBQUEsVUFBYyxDQUFkO0FBQUEsVUFBZ0IsQ0FBaEI7QUFBQSxVQUFrQixJQUFFLEVBQUUsSUFBRSxHQUFKLENBQXBCLENBQTZCLElBQUcsQ0FBSCxFQUFLLE9BQU8sSUFBRSxDQUFGLEdBQUksRUFBRSxLQUFGLENBQVEsQ0FBUixDQUFYLENBQXNCLElBQUUsQ0FBRixFQUFJLElBQUUsRUFBTixFQUFTLElBQUUsRUFBRSxTQUFiLENBQXVCLE9BQU0sQ0FBTixFQUFRO0FBQUMsYUFBRyxFQUFFLElBQUUsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUFKLENBQUgsS0FBb0IsTUFBSSxJQUFFLEVBQUUsS0FBRixDQUFRLEVBQUUsQ0FBRixFQUFLLE1BQWIsS0FBc0IsQ0FBNUIsR0FBK0IsRUFBRSxJQUFGLENBQU8sSUFBRSxFQUFULENBQW5ELEdBQWlFLElBQUUsQ0FBQyxDQUFwRSxFQUFzRSxDQUFDLElBQUUsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUFILE1BQWdCLElBQUUsRUFBRSxLQUFGLEVBQUYsRUFBWSxFQUFFLElBQUYsQ0FBTyxFQUFDLE9BQU0sQ0FBUCxFQUFTLE1BQUssRUFBRSxDQUFGLEVBQUssT0FBTCxDQUFhLENBQWIsRUFBZSxHQUFmLENBQWQsRUFBUCxDQUFaLEVBQXVELElBQUUsRUFBRSxLQUFGLENBQVEsRUFBRSxNQUFWLENBQXpFLENBQXRFLENBQWtLLEtBQUksQ0FBSixJQUFTLEVBQUUsTUFBWDtBQUFrQixZQUFFLElBQUUsRUFBRSxDQUFGLEVBQUssSUFBTCxDQUFVLENBQVYsQ0FBSixLQUFtQixFQUFFLENBQUYsS0FBTSxFQUFFLElBQUUsRUFBRSxDQUFGLEVBQUssQ0FBTCxDQUFKLENBQXpCLEtBQXdDLElBQUUsRUFBRSxLQUFGLEVBQUYsRUFBWSxFQUFFLElBQUYsQ0FBTyxFQUFDLE9BQU0sQ0FBUCxFQUFTLE1BQUssQ0FBZCxFQUFnQixTQUFRLENBQXhCLEVBQVAsQ0FBWixFQUErQyxJQUFFLEVBQUUsS0FBRixDQUFRLEVBQUUsTUFBVixDQUF6RjtBQUFsQixTQUE4SCxJQUFHLENBQUMsQ0FBSixFQUFNO0FBQU0sY0FBTyxJQUFFLEVBQUUsTUFBSixHQUFXLElBQUUsR0FBRyxLQUFILENBQVMsQ0FBVCxDQUFGLEdBQWMsRUFBRSxDQUFGLEVBQUksQ0FBSixFQUFPLEtBQVAsQ0FBYSxDQUFiLENBQWhDO0FBQWdELEtBQXJnQixDQUFzZ0IsU0FBUyxFQUFULENBQVksQ0FBWixFQUFjO0FBQUMsV0FBSSxJQUFJLElBQUUsQ0FBTixFQUFRLElBQUUsRUFBRSxNQUFaLEVBQW1CLElBQUUsRUFBekIsRUFBNEIsSUFBRSxDQUE5QixFQUFnQyxHQUFoQztBQUFvQyxhQUFHLEVBQUUsQ0FBRixFQUFLLEtBQVI7QUFBcEMsT0FBa0QsT0FBTyxDQUFQO0FBQVMsY0FBUyxFQUFULENBQVksQ0FBWixFQUFjLENBQWQsRUFBZ0IsQ0FBaEIsRUFBa0I7QUFBQyxVQUFJLElBQUUsRUFBRSxHQUFSO0FBQUEsVUFBWSxJQUFFLEVBQUUsSUFBaEI7QUFBQSxVQUFxQixJQUFFLEtBQUcsQ0FBMUI7QUFBQSxVQUE0QixJQUFFLEtBQUcsaUJBQWUsQ0FBaEQ7QUFBQSxVQUFrRCxJQUFFLEdBQXBELENBQXdELE9BQU8sRUFBRSxLQUFGLEdBQVEsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLGVBQU0sSUFBRSxFQUFFLENBQUYsQ0FBUjtBQUFhLGNBQUcsTUFBSSxFQUFFLFFBQU4sSUFBZ0IsQ0FBbkIsRUFBcUIsT0FBTyxFQUFFLENBQUYsRUFBSSxDQUFKLEVBQU0sQ0FBTixDQUFQO0FBQWxDLFNBQWtELE9BQU0sQ0FBQyxDQUFQO0FBQVMsT0FBbkYsR0FBb0YsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLFlBQUksQ0FBSjtBQUFBLFlBQU0sQ0FBTjtBQUFBLFlBQVEsQ0FBUjtBQUFBLFlBQVUsSUFBRSxDQUFDLENBQUQsRUFBRyxDQUFILENBQVosQ0FBa0IsSUFBRyxDQUFILEVBQUs7QUFBQyxpQkFBTSxJQUFFLEVBQUUsQ0FBRixDQUFSO0FBQWEsZ0JBQUcsQ0FBQyxNQUFJLEVBQUUsUUFBTixJQUFnQixDQUFqQixLQUFxQixFQUFFLENBQUYsRUFBSSxDQUFKLEVBQU0sQ0FBTixDQUF4QixFQUFpQyxPQUFNLENBQUMsQ0FBUDtBQUE5QztBQUF1RCxTQUE3RCxNQUFrRSxPQUFNLElBQUUsRUFBRSxDQUFGLENBQVI7QUFBYSxjQUFHLE1BQUksRUFBRSxRQUFOLElBQWdCLENBQW5CLEVBQXFCLElBQUcsSUFBRSxFQUFFLENBQUYsTUFBTyxFQUFFLENBQUYsSUFBSyxFQUFaLENBQUYsRUFBa0IsSUFBRSxFQUFFLEVBQUUsUUFBSixNQUFnQixFQUFFLEVBQUUsUUFBSixJQUFjLEVBQTlCLENBQXBCLEVBQXNELEtBQUcsTUFBSSxFQUFFLFFBQUYsQ0FBVyxXQUFYLEVBQWhFLEVBQXlGLElBQUUsRUFBRSxDQUFGLEtBQU0sQ0FBUixDQUF6RixLQUF1RztBQUFDLGdCQUFHLENBQUMsSUFBRSxFQUFFLENBQUYsQ0FBSCxLQUFVLEVBQUUsQ0FBRixNQUFPLENBQWpCLElBQW9CLEVBQUUsQ0FBRixNQUFPLENBQTlCLEVBQWdDLE9BQU8sRUFBRSxDQUFGLElBQUssRUFBRSxDQUFGLENBQVosQ0FBaUIsSUFBRyxFQUFFLENBQUYsSUFBSyxDQUFMLEVBQU8sRUFBRSxDQUFGLElBQUssRUFBRSxDQUFGLEVBQUksQ0FBSixFQUFNLENBQU4sQ0FBZixFQUF3QixPQUFNLENBQUMsQ0FBUDtBQUFTO0FBQTVOLFNBQTROLE9BQU0sQ0FBQyxDQUFQO0FBQVMsT0FBcGE7QUFBcWEsY0FBUyxFQUFULENBQVksQ0FBWixFQUFjO0FBQUMsYUFBTyxFQUFFLE1BQUYsR0FBUyxDQUFULEdBQVcsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLFlBQUksSUFBRSxFQUFFLE1BQVIsQ0FBZSxPQUFNLEdBQU47QUFBVSxjQUFHLENBQUMsRUFBRSxDQUFGLEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULENBQUosRUFBZ0IsT0FBTSxDQUFDLENBQVA7QUFBMUIsU0FBbUMsT0FBTSxDQUFDLENBQVA7QUFBUyxPQUF0RixHQUF1RixFQUFFLENBQUYsQ0FBOUY7QUFBbUcsY0FBUyxFQUFULENBQVksQ0FBWixFQUFjLENBQWQsRUFBZ0IsQ0FBaEIsRUFBa0I7QUFBQyxXQUFJLElBQUksSUFBRSxDQUFOLEVBQVEsSUFBRSxFQUFFLE1BQWhCLEVBQXVCLElBQUUsQ0FBekIsRUFBMkIsR0FBM0I7QUFBK0IsV0FBRyxDQUFILEVBQUssRUFBRSxDQUFGLENBQUwsRUFBVSxDQUFWO0FBQS9CLE9BQTRDLE9BQU8sQ0FBUDtBQUFTLGNBQVMsRUFBVCxDQUFZLENBQVosRUFBYyxDQUFkLEVBQWdCLENBQWhCLEVBQWtCLENBQWxCLEVBQW9CLENBQXBCLEVBQXNCO0FBQUMsV0FBSSxJQUFJLENBQUosRUFBTSxJQUFFLEVBQVIsRUFBVyxJQUFFLENBQWIsRUFBZSxJQUFFLEVBQUUsTUFBbkIsRUFBMEIsSUFBRSxRQUFNLENBQXRDLEVBQXdDLElBQUUsQ0FBMUMsRUFBNEMsR0FBNUM7QUFBZ0QsU0FBQyxJQUFFLEVBQUUsQ0FBRixDQUFILE1BQVcsS0FBRyxDQUFDLEVBQUUsQ0FBRixFQUFJLENBQUosRUFBTSxDQUFOLENBQUosS0FBZSxFQUFFLElBQUYsQ0FBTyxDQUFQLEdBQVUsS0FBRyxFQUFFLElBQUYsQ0FBTyxDQUFQLENBQTVCLENBQVg7QUFBaEQsT0FBbUcsT0FBTyxDQUFQO0FBQVMsY0FBUyxFQUFULENBQVksQ0FBWixFQUFjLENBQWQsRUFBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEIsRUFBb0IsQ0FBcEIsRUFBc0IsQ0FBdEIsRUFBd0I7QUFBQyxhQUFPLEtBQUcsQ0FBQyxFQUFFLENBQUYsQ0FBSixLQUFXLElBQUUsR0FBRyxDQUFILENBQWIsR0FBb0IsS0FBRyxDQUFDLEVBQUUsQ0FBRixDQUFKLEtBQVcsSUFBRSxHQUFHLENBQUgsRUFBSyxDQUFMLENBQWIsQ0FBcEIsRUFBMEMsR0FBRyxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUI7QUFBQyxZQUFJLENBQUo7QUFBQSxZQUFNLENBQU47QUFBQSxZQUFRLENBQVI7QUFBQSxZQUFVLElBQUUsRUFBWjtBQUFBLFlBQWUsSUFBRSxFQUFqQjtBQUFBLFlBQW9CLElBQUUsRUFBRSxNQUF4QjtBQUFBLFlBQStCLElBQUUsS0FBRyxHQUFHLEtBQUcsR0FBTixFQUFVLEVBQUUsUUFBRixHQUFXLENBQUMsQ0FBRCxDQUFYLEdBQWUsQ0FBekIsRUFBMkIsRUFBM0IsQ0FBcEM7QUFBQSxZQUFtRSxJQUFFLENBQUMsQ0FBRCxJQUFJLENBQUMsQ0FBRCxJQUFJLENBQVIsR0FBVSxDQUFWLEdBQVksR0FBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxDQUFqRjtBQUFBLFlBQStGLElBQUUsSUFBRSxNQUFJLElBQUUsQ0FBRixHQUFJLEtBQUcsQ0FBWCxJQUFjLEVBQWQsR0FBaUIsQ0FBbkIsR0FBcUIsQ0FBdEgsQ0FBd0gsSUFBRyxLQUFHLEVBQUUsQ0FBRixFQUFJLENBQUosRUFBTSxDQUFOLEVBQVEsQ0FBUixDQUFILEVBQWMsQ0FBakIsRUFBbUI7QUFBQyxjQUFFLEdBQUcsQ0FBSCxFQUFLLENBQUwsQ0FBRixFQUFVLEVBQUUsQ0FBRixFQUFJLEVBQUosRUFBTyxDQUFQLEVBQVMsQ0FBVCxDQUFWLEVBQXNCLElBQUUsRUFBRSxNQUExQixDQUFpQyxPQUFNLEdBQU47QUFBVSxhQUFDLElBQUUsRUFBRSxDQUFGLENBQUgsTUFBVyxFQUFFLEVBQUUsQ0FBRixDQUFGLElBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBRixDQUFGLElBQVEsQ0FBVixDQUFuQjtBQUFWO0FBQTJDLGFBQUcsQ0FBSCxFQUFLO0FBQUMsY0FBRyxLQUFHLENBQU4sRUFBUTtBQUFDLGdCQUFHLENBQUgsRUFBSztBQUFDLGtCQUFFLEVBQUYsRUFBSyxJQUFFLEVBQUUsTUFBVCxDQUFnQixPQUFNLEdBQU47QUFBVSxpQkFBQyxJQUFFLEVBQUUsQ0FBRixDQUFILEtBQVUsRUFBRSxJQUFGLENBQU8sRUFBRSxDQUFGLElBQUssQ0FBWixDQUFWO0FBQVYsZUFBbUMsRUFBRSxJQUFGLEVBQU8sSUFBRSxFQUFULEVBQVksQ0FBWixFQUFjLENBQWQ7QUFBaUIsaUJBQUUsRUFBRSxNQUFKLENBQVcsT0FBTSxHQUFOO0FBQVUsZUFBQyxJQUFFLEVBQUUsQ0FBRixDQUFILEtBQVUsQ0FBQyxJQUFFLElBQUUsRUFBRSxDQUFGLEVBQUksQ0FBSixDQUFGLEdBQVMsRUFBRSxDQUFGLENBQVosSUFBa0IsQ0FBQyxDQUE3QixLQUFpQyxFQUFFLENBQUYsSUFBSyxFQUFFLEVBQUUsQ0FBRixJQUFLLENBQVAsQ0FBdEM7QUFBVjtBQUEyRDtBQUFDLFNBQWhLLE1BQXFLLElBQUUsR0FBRyxNQUFJLENBQUosR0FBTSxFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsRUFBRSxNQUFiLENBQU4sR0FBMkIsQ0FBOUIsQ0FBRixFQUFtQyxJQUFFLEVBQUUsSUFBRixFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxDQUFGLEdBQWdCLEVBQUUsS0FBRixDQUFRLENBQVIsRUFBVSxDQUFWLENBQW5EO0FBQWdFLE9BQWxkLENBQWpEO0FBQXFnQixjQUFTLEVBQVQsQ0FBWSxDQUFaLEVBQWM7QUFBQyxXQUFJLElBQUksQ0FBSixFQUFNLENBQU4sRUFBUSxDQUFSLEVBQVUsSUFBRSxFQUFFLE1BQWQsRUFBcUIsSUFBRSxFQUFFLFFBQUYsQ0FBVyxFQUFFLENBQUYsRUFBSyxJQUFoQixDQUF2QixFQUE2QyxJQUFFLEtBQUcsRUFBRSxRQUFGLENBQVcsR0FBWCxDQUFsRCxFQUFrRSxJQUFFLElBQUUsQ0FBRixHQUFJLENBQXhFLEVBQTBFLElBQUUsR0FBRyxVQUFTLENBQVQsRUFBVztBQUFDLGVBQU8sTUFBSSxDQUFYO0FBQWEsT0FBNUIsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBQyxDQUFoQyxDQUE1RSxFQUErRyxJQUFFLEdBQUcsVUFBUyxDQUFULEVBQVc7QUFBQyxlQUFPLEVBQUUsQ0FBRixFQUFJLENBQUosSUFBTyxDQUFDLENBQWY7QUFBaUIsT0FBaEMsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBQyxDQUFwQyxDQUFqSCxFQUF3SixJQUFFLENBQUMsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLFlBQUksSUFBRSxDQUFDLENBQUQsS0FBSyxLQUFHLE1BQUksQ0FBWixNQUFpQixDQUFDLElBQUUsQ0FBSCxFQUFNLFFBQU4sR0FBZSxFQUFFLENBQUYsRUFBSSxDQUFKLEVBQU0sQ0FBTixDQUFmLEdBQXdCLEVBQUUsQ0FBRixFQUFJLENBQUosRUFBTSxDQUFOLENBQXpDLENBQU4sQ0FBeUQsT0FBTyxJQUFFLElBQUYsRUFBTyxDQUFkO0FBQWdCLE9BQTFGLENBQTlKLEVBQTBQLElBQUUsQ0FBNVAsRUFBOFAsR0FBOVA7QUFBa1EsWUFBRyxJQUFFLEVBQUUsUUFBRixDQUFXLEVBQUUsQ0FBRixFQUFLLElBQWhCLENBQUwsRUFBMkIsSUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFILENBQUgsRUFBUyxDQUFULENBQUQsQ0FBRixDQUEzQixLQUErQztBQUFDLGNBQUcsSUFBRSxFQUFFLE1BQUYsQ0FBUyxFQUFFLENBQUYsRUFBSyxJQUFkLEVBQW9CLEtBQXBCLENBQTBCLElBQTFCLEVBQStCLEVBQUUsQ0FBRixFQUFLLE9BQXBDLENBQUYsRUFBK0MsRUFBRSxDQUFGLENBQWxELEVBQXVEO0FBQUMsaUJBQUksSUFBRSxFQUFFLENBQVIsRUFBVSxJQUFFLENBQVosRUFBYyxHQUFkO0FBQWtCLGtCQUFHLEVBQUUsUUFBRixDQUFXLEVBQUUsQ0FBRixFQUFLLElBQWhCLENBQUgsRUFBeUI7QUFBM0MsYUFBaUQsT0FBTyxHQUFHLElBQUUsQ0FBRixJQUFLLEdBQUcsQ0FBSCxDQUFSLEVBQWMsSUFBRSxDQUFGLElBQUssR0FBRyxFQUFFLEtBQUYsQ0FBUSxDQUFSLEVBQVUsSUFBRSxDQUFaLEVBQWUsTUFBZixDQUFzQixFQUFDLE9BQU0sUUFBTSxFQUFFLElBQUUsQ0FBSixFQUFPLElBQWIsR0FBa0IsR0FBbEIsR0FBc0IsRUFBN0IsRUFBdEIsQ0FBSCxFQUE0RCxPQUE1RCxDQUFvRSxDQUFwRSxFQUFzRSxJQUF0RSxDQUFuQixFQUErRixDQUEvRixFQUFpRyxJQUFFLENBQUYsSUFBSyxHQUFHLEVBQUUsS0FBRixDQUFRLENBQVIsRUFBVSxDQUFWLENBQUgsQ0FBdEcsRUFBdUgsSUFBRSxDQUFGLElBQUssR0FBRyxJQUFFLEVBQUUsS0FBRixDQUFRLENBQVIsQ0FBTCxDQUE1SCxFQUE2SSxJQUFFLENBQUYsSUFBSyxHQUFHLENBQUgsQ0FBbEosQ0FBUDtBQUFnSyxhQUFFLElBQUYsQ0FBTyxDQUFQO0FBQVU7QUFBcmtCLE9BQXFrQixPQUFPLEdBQUcsQ0FBSCxDQUFQO0FBQWEsY0FBUyxFQUFULENBQVksQ0FBWixFQUFjLENBQWQsRUFBZ0I7QUFBQyxVQUFJLElBQUUsRUFBRSxNQUFGLEdBQVMsQ0FBZjtBQUFBLFVBQWlCLElBQUUsRUFBRSxNQUFGLEdBQVMsQ0FBNUI7QUFBQSxVQUE4QixJQUFFLFdBQVMsRUFBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQjtBQUFDLFlBQUksQ0FBSjtBQUFBLFlBQU0sQ0FBTjtBQUFBLFlBQVEsQ0FBUjtBQUFBLFlBQVUsSUFBRSxDQUFaO0FBQUEsWUFBYyxJQUFFLEdBQWhCO0FBQUEsWUFBb0IsSUFBRSxNQUFHLEVBQXpCO0FBQUEsWUFBNEIsSUFBRSxFQUE5QjtBQUFBLFlBQWlDLElBQUUsQ0FBbkM7QUFBQSxZQUFxQyxJQUFFLE1BQUcsS0FBRyxFQUFFLElBQUYsQ0FBTyxHQUFQLENBQVcsR0FBWCxFQUFlLENBQWYsQ0FBN0M7QUFBQSxZQUErRCxJQUFFLEtBQUcsUUFBTSxDQUFOLEdBQVEsQ0FBUixHQUFVLEtBQUssTUFBTCxNQUFlLEVBQTdGO0FBQUEsWUFBZ0csSUFBRSxFQUFFLE1BQXBHLENBQTJHLEtBQUksTUFBSSxJQUFFLE1BQUksQ0FBSixJQUFPLENBQVAsSUFBVSxDQUFoQixDQUFKLEVBQXVCLE1BQUksQ0FBSixJQUFPLFNBQU8sSUFBRSxFQUFFLENBQUYsQ0FBVCxDQUE5QixFQUE2QyxHQUE3QyxFQUFpRDtBQUFDLGNBQUcsS0FBRyxDQUFOLEVBQVE7QUFBQyxnQkFBRSxDQUFGLEVBQUksS0FBRyxFQUFFLGFBQUYsS0FBa0IsQ0FBckIsS0FBeUIsRUFBRSxDQUFGLEdBQUssSUFBRSxDQUFDLENBQWpDLENBQUosQ0FBd0MsT0FBTSxJQUFFLEVBQUUsR0FBRixDQUFSO0FBQWUsa0JBQUcsRUFBRSxDQUFGLEVBQUksS0FBRyxDQUFQLEVBQVMsQ0FBVCxDQUFILEVBQWU7QUFBQyxrQkFBRSxJQUFGLENBQU8sQ0FBUCxFQUFVO0FBQU07QUFBL0MsYUFBK0MsTUFBSSxJQUFFLENBQU47QUFBUyxpQkFBSSxDQUFDLElBQUUsQ0FBQyxDQUFELElBQUksQ0FBUCxLQUFXLEdBQVgsRUFBZSxNQUFHLEVBQUUsSUFBRixDQUFPLENBQVAsQ0FBdEI7QUFBaUMsYUFBRyxLQUFHLENBQUgsRUFBSyxLQUFHLE1BQUksQ0FBZixFQUFpQjtBQUFDLGNBQUUsQ0FBRixDQUFJLE9BQU0sSUFBRSxFQUFFLEdBQUYsQ0FBUjtBQUFlLGNBQUUsQ0FBRixFQUFJLENBQUosRUFBTSxDQUFOLEVBQVEsQ0FBUjtBQUFmLFdBQTBCLElBQUcsRUFBSCxFQUFLO0FBQUMsZ0JBQUcsSUFBRSxDQUFMLEVBQU8sT0FBTSxHQUFOO0FBQVUsZ0JBQUUsQ0FBRixLQUFNLEVBQUUsQ0FBRixDQUFOLEtBQWEsRUFBRSxDQUFGLElBQUssRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUFsQjtBQUFWLGFBQXVDLElBQUUsR0FBRyxDQUFILENBQUY7QUFBUSxhQUFFLEtBQUYsQ0FBUSxDQUFSLEVBQVUsQ0FBVixHQUFhLEtBQUcsQ0FBQyxFQUFKLElBQU8sRUFBRSxNQUFGLEdBQVMsQ0FBaEIsSUFBbUIsSUFBRSxFQUFFLE1BQUosR0FBVyxDQUE5QixJQUFpQyxHQUFHLFVBQUgsQ0FBYyxDQUFkLENBQTlDO0FBQStELGdCQUFPLE1BQUksSUFBRSxDQUFGLEVBQUksSUFBRSxDQUFWLEdBQWEsQ0FBcEI7QUFBc0IsT0FBNWhCLENBQTZoQixPQUFPLElBQUUsR0FBRyxDQUFILENBQUYsR0FBUSxDQUFmO0FBQWlCLFlBQU8sSUFBRSxHQUFHLE9BQUgsR0FBVyxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxVQUFJLENBQUo7QUFBQSxVQUFNLElBQUUsRUFBUjtBQUFBLFVBQVcsSUFBRSxFQUFiO0FBQUEsVUFBZ0IsSUFBRSxFQUFFLElBQUUsR0FBSixDQUFsQixDQUEyQixJQUFHLENBQUMsQ0FBSixFQUFNO0FBQUMsY0FBSSxJQUFFLEVBQUUsQ0FBRixDQUFOLEdBQVksSUFBRSxFQUFFLE1BQWhCLENBQXVCLE9BQU0sR0FBTjtBQUFVLGNBQUUsR0FBRyxFQUFFLENBQUYsQ0FBSCxDQUFGLEVBQVcsRUFBRSxDQUFGLElBQUssRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUFMLEdBQWUsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUExQjtBQUFWLFNBQThDLElBQUUsRUFBRSxDQUFGLEVBQUksR0FBRyxDQUFILEVBQUssQ0FBTCxDQUFKLENBQUYsRUFBZSxFQUFFLFFBQUYsR0FBVyxDQUExQjtBQUE0QixjQUFPLENBQVA7QUFBUyxLQUF2SyxFQUF3SyxJQUFFLEdBQUcsTUFBSCxHQUFVLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQjtBQUFDLFVBQUksQ0FBSjtBQUFBLFVBQU0sQ0FBTjtBQUFBLFVBQVEsQ0FBUjtBQUFBLFVBQVUsQ0FBVjtBQUFBLFVBQVksQ0FBWjtBQUFBLFVBQWMsSUFBRSxjQUFZLE9BQU8sQ0FBbkIsSUFBc0IsQ0FBdEM7QUFBQSxVQUF3QyxJQUFFLENBQUMsQ0FBRCxJQUFJLEVBQUUsSUFBRSxFQUFFLFFBQUYsSUFBWSxDQUFoQixDQUE5QyxDQUFpRSxJQUFHLElBQUUsS0FBRyxFQUFMLEVBQVEsTUFBSSxFQUFFLE1BQWpCLEVBQXdCO0FBQUMsWUFBRyxJQUFFLEVBQUUsQ0FBRixJQUFLLEVBQUUsQ0FBRixFQUFLLEtBQUwsQ0FBVyxDQUFYLENBQVAsRUFBcUIsRUFBRSxNQUFGLEdBQVMsQ0FBVCxJQUFZLFNBQU8sQ0FBQyxJQUFFLEVBQUUsQ0FBRixDQUFILEVBQVMsSUFBNUIsSUFBa0MsTUFBSSxFQUFFLFFBQXhDLElBQWtELENBQWxELElBQXFELEVBQUUsUUFBRixDQUFXLEVBQUUsQ0FBRixFQUFLLElBQWhCLENBQTdFLEVBQW1HO0FBQUMsY0FBRyxJQUFFLENBQUMsRUFBRSxJQUFGLENBQU8sRUFBUCxDQUFVLEVBQUUsT0FBRixDQUFVLENBQVYsRUFBYSxPQUFiLENBQXFCLENBQXJCLEVBQXVCLEVBQXZCLENBQVYsRUFBcUMsQ0FBckMsS0FBeUMsRUFBMUMsRUFBOEMsQ0FBOUMsQ0FBRixFQUFtRCxDQUFDLENBQXZELEVBQXlELE9BQU8sQ0FBUCxDQUFTLE1BQUksSUFBRSxFQUFFLFVBQVIsR0FBb0IsSUFBRSxFQUFFLEtBQUYsQ0FBUSxFQUFFLEtBQUYsR0FBVSxLQUFWLENBQWdCLE1BQXhCLENBQXRCO0FBQXNELGFBQUUsRUFBRSxZQUFGLENBQWUsSUFBZixDQUFvQixDQUFwQixJQUF1QixDQUF2QixHQUF5QixFQUFFLE1BQTdCLENBQW9DLE9BQU0sR0FBTixFQUFVO0FBQUMsY0FBRyxJQUFFLEVBQUUsQ0FBRixDQUFGLEVBQU8sRUFBRSxRQUFGLENBQVcsSUFBRSxFQUFFLElBQWYsQ0FBVixFQUErQixNQUFNLElBQUcsQ0FBQyxJQUFFLEVBQUUsSUFBRixDQUFPLENBQVAsQ0FBSCxNQUFnQixJQUFFLEVBQUUsRUFBRSxPQUFGLENBQVUsQ0FBVixFQUFhLE9BQWIsQ0FBcUIsQ0FBckIsRUFBdUIsRUFBdkIsQ0FBRixFQUE2QixFQUFFLElBQUYsQ0FBTyxFQUFFLENBQUYsRUFBSyxJQUFaLEtBQW1CLEdBQUcsRUFBRSxVQUFMLENBQW5CLElBQXFDLENBQWxFLENBQWxCLENBQUgsRUFBMkY7QUFBQyxnQkFBRyxFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsQ0FBWCxHQUFjLElBQUUsRUFBRSxNQUFGLElBQVUsR0FBRyxDQUFILENBQTFCLEVBQWdDLENBQUMsQ0FBcEMsRUFBc0MsT0FBTyxFQUFFLEtBQUYsQ0FBUSxDQUFSLEVBQVUsQ0FBVixHQUFhLENBQXBCLENBQXNCO0FBQU07QUFBQztBQUFDLGNBQU0sQ0FBQyxLQUFHLEVBQUUsQ0FBRixFQUFJLENBQUosQ0FBSixFQUFZLENBQVosRUFBYyxDQUFkLEVBQWdCLENBQUMsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBQyxDQUFELElBQUksRUFBRSxJQUFGLENBQU8sQ0FBUCxLQUFXLEdBQUcsRUFBRSxVQUFMLENBQWYsSUFBaUMsQ0FBdEQsR0FBeUQsQ0FBL0Q7QUFBaUUsS0FBanpCLEVBQWt6QixFQUFFLFVBQUYsR0FBYSxFQUFFLEtBQUYsQ0FBUSxFQUFSLEVBQVksSUFBWixDQUFpQixDQUFqQixFQUFvQixJQUFwQixDQUF5QixFQUF6QixNQUErQixDQUE5MUIsRUFBZzJCLEVBQUUsZ0JBQUYsR0FBbUIsQ0FBQyxDQUFDLENBQXIzQixFQUF1M0IsR0FBdjNCLEVBQTIzQixFQUFFLFlBQUYsR0FBZSxHQUFHLFVBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxJQUFFLEVBQUUsdUJBQUYsQ0FBMEIsRUFBRSxhQUFGLENBQWdCLFVBQWhCLENBQTFCLENBQVQ7QUFBZ0UsS0FBL0UsQ0FBMTRCLEVBQTI5QixHQUFHLFVBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxFQUFFLFNBQUYsR0FBWSxrQkFBWixFQUErQixRQUFNLEVBQUUsVUFBRixDQUFhLFlBQWIsQ0FBMEIsTUFBMUIsQ0FBNUM7QUFBOEUsS0FBN0YsS0FBZ0csR0FBRyx3QkFBSCxFQUE0QixVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsVUFBRyxDQUFDLENBQUosRUFBTSxPQUFPLEVBQUUsWUFBRixDQUFlLENBQWYsRUFBaUIsV0FBUyxFQUFFLFdBQUYsRUFBVCxHQUF5QixDQUF6QixHQUEyQixDQUE1QyxDQUFQO0FBQXNELEtBQXhHLENBQTNqQyxFQUFxcUMsRUFBRSxVQUFGLElBQWMsR0FBRyxVQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sRUFBRSxTQUFGLEdBQVksVUFBWixFQUF1QixFQUFFLFVBQUYsQ0FBYSxZQUFiLENBQTBCLE9BQTFCLEVBQWtDLEVBQWxDLENBQXZCLEVBQTZELE9BQUssRUFBRSxVQUFGLENBQWEsWUFBYixDQUEwQixPQUExQixDQUF6RTtBQUE0RyxLQUEzSCxDQUFkLElBQTRJLEdBQUcsT0FBSCxFQUFXLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWU7QUFBQyxVQUFHLENBQUMsQ0FBRCxJQUFJLFlBQVUsRUFBRSxRQUFGLENBQVcsV0FBWCxFQUFqQixFQUEwQyxPQUFPLEVBQUUsWUFBVDtBQUFzQixLQUEzRixDQUFqekMsRUFBODRDLEdBQUcsVUFBUyxDQUFULEVBQVc7QUFBQyxhQUFPLFFBQU0sRUFBRSxZQUFGLENBQWUsVUFBZixDQUFiO0FBQXdDLEtBQXZELEtBQTBELEdBQUcsQ0FBSCxFQUFLLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWU7QUFBQyxVQUFJLENBQUosQ0FBTSxJQUFHLENBQUMsQ0FBSixFQUFNLE9BQU8sRUFBRSxDQUFGLE1BQU8sQ0FBQyxDQUFSLEdBQVUsRUFBRSxXQUFGLEVBQVYsR0FBMEIsQ0FBQyxJQUFFLEVBQUUsZ0JBQUYsQ0FBbUIsQ0FBbkIsQ0FBSCxLQUEyQixFQUFFLFNBQTdCLEdBQXVDLEVBQUUsS0FBekMsR0FBK0MsSUFBaEY7QUFBcUYsS0FBdEgsQ0FBeDhDLEVBQWdrRCxFQUF2a0Q7QUFBMGtELEdBQTNubUIsQ0FBNG5tQixDQUE1bm1CLENBQU4sQ0FBcW9tQixFQUFFLElBQUYsR0FBTyxDQUFQLEVBQVMsRUFBRSxJQUFGLEdBQU8sRUFBRSxTQUFsQixFQUE0QixFQUFFLElBQUYsQ0FBTyxHQUFQLElBQVksRUFBRSxJQUFGLENBQU8sT0FBL0MsRUFBdUQsRUFBRSxVQUFGLEdBQWEsRUFBRSxNQUFGLEdBQVMsRUFBRSxVQUEvRSxFQUEwRixFQUFFLElBQUYsR0FBTyxFQUFFLE9BQW5HLEVBQTJHLEVBQUUsUUFBRixHQUFXLEVBQUUsS0FBeEgsRUFBOEgsRUFBRSxRQUFGLEdBQVcsRUFBRSxRQUEzSSxFQUFvSixFQUFFLGNBQUYsR0FBaUIsRUFBRSxNQUF2SyxDQUE4SyxJQUFJLElBQUUsU0FBRixDQUFFLENBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWU7QUFBQyxRQUFJLElBQUUsRUFBTjtBQUFBLFFBQVMsSUFBRSxLQUFLLENBQUwsS0FBUyxDQUFwQixDQUFzQixPQUFNLENBQUMsSUFBRSxFQUFFLENBQUYsQ0FBSCxLQUFVLE1BQUksRUFBRSxRQUF0QjtBQUErQixVQUFHLE1BQUksRUFBRSxRQUFULEVBQWtCO0FBQUMsWUFBRyxLQUFHLEVBQUUsQ0FBRixFQUFLLEVBQUwsQ0FBUSxDQUFSLENBQU4sRUFBaUIsTUFBTSxFQUFFLElBQUYsQ0FBTyxDQUFQO0FBQVU7QUFBbkYsS0FBbUYsT0FBTyxDQUFQO0FBQVMsR0FBeEk7QUFBQSxNQUF5SSxJQUFFLFNBQUYsQ0FBRSxDQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxTQUFJLElBQUksSUFBRSxFQUFWLEVBQWEsQ0FBYixFQUFlLElBQUUsRUFBRSxXQUFuQjtBQUErQixZQUFJLEVBQUUsUUFBTixJQUFnQixNQUFJLENBQXBCLElBQXVCLEVBQUUsSUFBRixDQUFPLENBQVAsQ0FBdkI7QUFBL0IsS0FBZ0UsT0FBTyxDQUFQO0FBQVMsR0FBbE87QUFBQSxNQUFtTyxJQUFFLEVBQUUsSUFBRixDQUFPLEtBQVAsQ0FBYSxZQUFsUCxDQUErUCxTQUFTLENBQVQsQ0FBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsV0FBTyxFQUFFLFFBQUYsSUFBWSxFQUFFLFFBQUYsQ0FBVyxXQUFYLE9BQTJCLEVBQUUsV0FBRixFQUE5QztBQUE4RCxPQUFJLElBQUUsaUVBQU47QUFBQSxNQUF3RSxJQUFFLGdCQUExRSxDQUEyRixTQUFTLENBQVQsQ0FBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUI7QUFBQyxXQUFPLEVBQUUsVUFBRixDQUFhLENBQWIsSUFBZ0IsRUFBRSxJQUFGLENBQU8sQ0FBUCxFQUFTLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLGFBQU0sQ0FBQyxDQUFDLEVBQUUsSUFBRixDQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxDQUFGLEtBQWtCLENBQXhCO0FBQTBCLEtBQWpELENBQWhCLEdBQW1FLEVBQUUsUUFBRixHQUFXLEVBQUUsSUFBRixDQUFPLENBQVAsRUFBUyxVQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sTUFBSSxDQUFKLEtBQVEsQ0FBZjtBQUFpQixLQUF0QyxDQUFYLEdBQW1ELFlBQVUsT0FBTyxDQUFqQixHQUFtQixFQUFFLElBQUYsQ0FBTyxDQUFQLEVBQVMsVUFBUyxDQUFULEVBQVc7QUFBQyxhQUFPLEVBQUUsSUFBRixDQUFPLENBQVAsRUFBUyxDQUFULElBQVksQ0FBQyxDQUFiLEtBQWlCLENBQXhCO0FBQTBCLEtBQS9DLENBQW5CLEdBQW9FLEVBQUUsSUFBRixDQUFPLENBQVAsSUFBVSxFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsQ0FBVixJQUEyQixJQUFFLEVBQUUsTUFBRixDQUFTLENBQVQsRUFBVyxDQUFYLENBQUYsRUFBZ0IsRUFBRSxJQUFGLENBQU8sQ0FBUCxFQUFTLFVBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxFQUFFLElBQUYsQ0FBTyxDQUFQLEVBQVMsQ0FBVCxJQUFZLENBQUMsQ0FBYixLQUFpQixDQUFqQixJQUFvQixNQUFJLEVBQUUsUUFBakM7QUFBMEMsS0FBL0QsQ0FBM0MsQ0FBak07QUFBOFMsS0FBRSxNQUFGLEdBQVMsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLFFBQUksSUFBRSxFQUFFLENBQUYsQ0FBTixDQUFXLE9BQU8sTUFBSSxJQUFFLFVBQVEsQ0FBUixHQUFVLEdBQWhCLEdBQXFCLE1BQUksRUFBRSxNQUFOLElBQWMsTUFBSSxFQUFFLFFBQXBCLEdBQTZCLEVBQUUsSUFBRixDQUFPLGVBQVAsQ0FBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsSUFBNEIsQ0FBQyxDQUFELENBQTVCLEdBQWdDLEVBQTdELEdBQWdFLEVBQUUsSUFBRixDQUFPLE9BQVAsQ0FBZSxDQUFmLEVBQWlCLEVBQUUsSUFBRixDQUFPLENBQVAsRUFBUyxVQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sTUFBSSxFQUFFLFFBQWI7QUFBc0IsS0FBM0MsQ0FBakIsQ0FBNUY7QUFBMkosR0FBL0wsRUFBZ00sRUFBRSxFQUFGLENBQUssTUFBTCxDQUFZLEVBQUMsTUFBSyxjQUFTLENBQVQsRUFBVztBQUFDLFVBQUksQ0FBSjtBQUFBLFVBQU0sQ0FBTjtBQUFBLFVBQVEsSUFBRSxLQUFLLE1BQWY7QUFBQSxVQUFzQixJQUFFLElBQXhCLENBQTZCLElBQUcsWUFBVSxPQUFPLENBQXBCLEVBQXNCLE9BQU8sS0FBSyxTQUFMLENBQWUsRUFBRSxDQUFGLEVBQUssTUFBTCxDQUFZLFlBQVU7QUFBQyxhQUFJLElBQUUsQ0FBTixFQUFRLElBQUUsQ0FBVixFQUFZLEdBQVo7QUFBZ0IsY0FBRyxFQUFFLFFBQUYsQ0FBVyxFQUFFLENBQUYsQ0FBWCxFQUFnQixJQUFoQixDQUFILEVBQXlCLE9BQU0sQ0FBQyxDQUFQO0FBQXpDO0FBQWtELE9BQXpFLENBQWYsQ0FBUCxDQUFrRyxLQUFJLElBQUUsS0FBSyxTQUFMLENBQWUsRUFBZixDQUFGLEVBQXFCLElBQUUsQ0FBM0IsRUFBNkIsSUFBRSxDQUEvQixFQUFpQyxHQUFqQztBQUFxQyxVQUFFLElBQUYsQ0FBTyxDQUFQLEVBQVMsRUFBRSxDQUFGLENBQVQsRUFBYyxDQUFkO0FBQXJDLE9BQXNELE9BQU8sSUFBRSxDQUFGLEdBQUksRUFBRSxVQUFGLENBQWEsQ0FBYixDQUFKLEdBQW9CLENBQTNCO0FBQTZCLEtBQTFQLEVBQTJQLFFBQU8sZ0JBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxLQUFLLFNBQUwsQ0FBZSxFQUFFLElBQUYsRUFBTyxLQUFHLEVBQVYsRUFBYSxDQUFDLENBQWQsQ0FBZixDQUFQO0FBQXdDLEtBQXRULEVBQXVULEtBQUksYUFBUyxDQUFULEVBQVc7QUFBQyxhQUFPLEtBQUssU0FBTCxDQUFlLEVBQUUsSUFBRixFQUFPLEtBQUcsRUFBVixFQUFhLENBQUMsQ0FBZCxDQUFmLENBQVA7QUFBd0MsS0FBL1csRUFBZ1gsSUFBRyxZQUFTLENBQVQsRUFBVztBQUFDLGFBQU0sQ0FBQyxDQUFDLEVBQUUsSUFBRixFQUFPLFlBQVUsT0FBTyxDQUFqQixJQUFvQixFQUFFLElBQUYsQ0FBTyxDQUFQLENBQXBCLEdBQThCLEVBQUUsQ0FBRixDQUE5QixHQUFtQyxLQUFHLEVBQTdDLEVBQWdELENBQUMsQ0FBakQsRUFBb0QsTUFBNUQ7QUFBbUUsS0FBbGMsRUFBWixDQUFoTSxDQUFpcEIsSUFBSSxDQUFKO0FBQUEsTUFBTSxJQUFFLHFDQUFSO0FBQUEsTUFBOEMsSUFBRSxFQUFFLEVBQUYsQ0FBSyxJQUFMLEdBQVUsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLFFBQUksQ0FBSixFQUFNLENBQU4sQ0FBUSxJQUFHLENBQUMsQ0FBSixFQUFNLE9BQU8sSUFBUCxDQUFZLElBQUcsSUFBRSxLQUFHLENBQUwsRUFBTyxZQUFVLE9BQU8sQ0FBM0IsRUFBNkI7QUFBQyxVQUFHLElBQUUsUUFBTSxFQUFFLENBQUYsQ0FBTixJQUFZLFFBQU0sRUFBRSxFQUFFLE1BQUYsR0FBUyxDQUFYLENBQWxCLElBQWlDLEVBQUUsTUFBRixJQUFVLENBQTNDLEdBQTZDLENBQUMsSUFBRCxFQUFNLENBQU4sRUFBUSxJQUFSLENBQTdDLEdBQTJELEVBQUUsSUFBRixDQUFPLENBQVAsQ0FBN0QsRUFBdUUsQ0FBQyxDQUFELElBQUksQ0FBQyxFQUFFLENBQUYsQ0FBRCxJQUFPLENBQXJGLEVBQXVGLE9BQU0sQ0FBQyxDQUFELElBQUksRUFBRSxNQUFOLEdBQWEsQ0FBQyxLQUFHLENBQUosRUFBTyxJQUFQLENBQVksQ0FBWixDQUFiLEdBQTRCLEtBQUssV0FBTCxDQUFpQixDQUFqQixFQUFvQixJQUFwQixDQUF5QixDQUF6QixDQUFsQyxDQUE4RCxJQUFHLEVBQUUsQ0FBRixDQUFILEVBQVE7QUFBQyxZQUFHLElBQUUsYUFBYSxDQUFiLEdBQWUsRUFBRSxDQUFGLENBQWYsR0FBb0IsQ0FBdEIsRUFBd0IsRUFBRSxLQUFGLENBQVEsSUFBUixFQUFhLEVBQUUsU0FBRixDQUFZLEVBQUUsQ0FBRixDQUFaLEVBQWlCLEtBQUcsRUFBRSxRQUFMLEdBQWMsRUFBRSxhQUFGLElBQWlCLENBQS9CLEdBQWlDLENBQWxELEVBQW9ELENBQUMsQ0FBckQsQ0FBYixDQUF4QixFQUE4RixFQUFFLElBQUYsQ0FBTyxFQUFFLENBQUYsQ0FBUCxLQUFjLEVBQUUsYUFBRixDQUFnQixDQUFoQixDQUEvRyxFQUFrSSxLQUFJLENBQUosSUFBUyxDQUFUO0FBQVcsWUFBRSxVQUFGLENBQWEsS0FBSyxDQUFMLENBQWIsSUFBc0IsS0FBSyxDQUFMLEVBQVEsRUFBRSxDQUFGLENBQVIsQ0FBdEIsR0FBb0MsS0FBSyxJQUFMLENBQVUsQ0FBVixFQUFZLEVBQUUsQ0FBRixDQUFaLENBQXBDO0FBQVgsU0FBaUUsT0FBTyxJQUFQO0FBQVksY0FBTyxJQUFFLEVBQUUsY0FBRixDQUFpQixFQUFFLENBQUYsQ0FBakIsQ0FBRixFQUF5QixNQUFJLEtBQUssQ0FBTCxJQUFRLENBQVIsRUFBVSxLQUFLLE1BQUwsR0FBWSxDQUExQixDQUF6QixFQUFzRCxJQUE3RDtBQUFrRSxZQUFPLEVBQUUsUUFBRixJQUFZLEtBQUssQ0FBTCxJQUFRLENBQVIsRUFBVSxLQUFLLE1BQUwsR0FBWSxDQUF0QixFQUF3QixJQUFwQyxJQUEwQyxFQUFFLFVBQUYsQ0FBYSxDQUFiLElBQWdCLEtBQUssQ0FBTCxLQUFTLEVBQUUsS0FBWCxHQUFpQixFQUFFLEtBQUYsQ0FBUSxDQUFSLENBQWpCLEdBQTRCLEVBQUUsQ0FBRixDQUE1QyxHQUFpRCxFQUFFLFNBQUYsQ0FBWSxDQUFaLEVBQWMsSUFBZCxDQUFsRztBQUFzSCxHQUF2cUIsQ0FBd3FCLEVBQUUsU0FBRixHQUFZLEVBQUUsRUFBZCxFQUFpQixJQUFFLEVBQUUsQ0FBRixDQUFuQixDQUF3QixJQUFJLElBQUUsZ0NBQU47QUFBQSxNQUF1QyxJQUFFLEVBQUMsVUFBUyxDQUFDLENBQVgsRUFBYSxVQUFTLENBQUMsQ0FBdkIsRUFBeUIsTUFBSyxDQUFDLENBQS9CLEVBQWlDLE1BQUssQ0FBQyxDQUF2QyxFQUF6QyxDQUFtRixFQUFFLEVBQUYsQ0FBSyxNQUFMLENBQVksRUFBQyxLQUFJLGFBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBSSxJQUFFLEVBQUUsQ0FBRixFQUFJLElBQUosQ0FBTjtBQUFBLFVBQWdCLElBQUUsRUFBRSxNQUFwQixDQUEyQixPQUFPLEtBQUssTUFBTCxDQUFZLFlBQVU7QUFBQyxhQUFJLElBQUksSUFBRSxDQUFWLEVBQVksSUFBRSxDQUFkLEVBQWdCLEdBQWhCO0FBQW9CLGNBQUcsRUFBRSxRQUFGLENBQVcsSUFBWCxFQUFnQixFQUFFLENBQUYsQ0FBaEIsQ0FBSCxFQUF5QixPQUFNLENBQUMsQ0FBUDtBQUE3QztBQUFzRCxPQUE3RSxDQUFQO0FBQXNGLEtBQWxJLEVBQW1JLFNBQVEsaUJBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFVBQUksQ0FBSjtBQUFBLFVBQU0sSUFBRSxDQUFSO0FBQUEsVUFBVSxJQUFFLEtBQUssTUFBakI7QUFBQSxVQUF3QixJQUFFLEVBQTFCO0FBQUEsVUFBNkIsSUFBRSxZQUFVLE9BQU8sQ0FBakIsSUFBb0IsRUFBRSxDQUFGLENBQW5ELENBQXdELElBQUcsQ0FBQyxFQUFFLElBQUYsQ0FBTyxDQUFQLENBQUosRUFBYyxPQUFLLElBQUUsQ0FBUCxFQUFTLEdBQVQ7QUFBYSxhQUFJLElBQUUsS0FBSyxDQUFMLENBQU4sRUFBYyxLQUFHLE1BQUksQ0FBckIsRUFBdUIsSUFBRSxFQUFFLFVBQTNCO0FBQXNDLGNBQUcsRUFBRSxRQUFGLEdBQVcsRUFBWCxLQUFnQixJQUFFLEVBQUUsS0FBRixDQUFRLENBQVIsSUFBVyxDQUFDLENBQWQsR0FBZ0IsTUFBSSxFQUFFLFFBQU4sSUFBZ0IsRUFBRSxJQUFGLENBQU8sZUFBUCxDQUF1QixDQUF2QixFQUF5QixDQUF6QixDQUFoRCxDQUFILEVBQWdGO0FBQUMsY0FBRSxJQUFGLENBQU8sQ0FBUCxFQUFVO0FBQU07QUFBdkk7QUFBYixPQUFvSixPQUFPLEtBQUssU0FBTCxDQUFlLEVBQUUsTUFBRixHQUFTLENBQVQsR0FBVyxFQUFFLFVBQUYsQ0FBYSxDQUFiLENBQVgsR0FBMkIsQ0FBMUMsQ0FBUDtBQUFvRCxLQUF2YSxFQUF3YSxPQUFNLGVBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxJQUFFLFlBQVUsT0FBTyxDQUFqQixHQUFtQixFQUFFLElBQUYsQ0FBTyxFQUFFLENBQUYsQ0FBUCxFQUFZLEtBQUssQ0FBTCxDQUFaLENBQW5CLEdBQXdDLEVBQUUsSUFBRixDQUFPLElBQVAsRUFBWSxFQUFFLE1BQUYsR0FBUyxFQUFFLENBQUYsQ0FBVCxHQUFjLENBQTFCLENBQTFDLEdBQXVFLEtBQUssQ0FBTCxLQUFTLEtBQUssQ0FBTCxFQUFRLFVBQWpCLEdBQTRCLEtBQUssS0FBTCxHQUFhLE9BQWIsR0FBdUIsTUFBbkQsR0FBMEQsQ0FBQyxDQUF6STtBQUEySSxLQUFya0IsRUFBc2tCLEtBQUksYUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsYUFBTyxLQUFLLFNBQUwsQ0FBZSxFQUFFLFVBQUYsQ0FBYSxFQUFFLEtBQUYsQ0FBUSxLQUFLLEdBQUwsRUFBUixFQUFtQixFQUFFLENBQUYsRUFBSSxDQUFKLENBQW5CLENBQWIsQ0FBZixDQUFQO0FBQWdFLEtBQXhwQixFQUF5cEIsU0FBUSxpQkFBUyxDQUFULEVBQVc7QUFBQyxhQUFPLEtBQUssR0FBTCxDQUFTLFFBQU0sQ0FBTixHQUFRLEtBQUssVUFBYixHQUF3QixLQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsQ0FBdUIsQ0FBdkIsQ0FBakMsQ0FBUDtBQUFtRSxLQUFodkIsRUFBWixFQUErdkIsU0FBUyxDQUFULENBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLFdBQU0sQ0FBQyxJQUFFLEVBQUUsQ0FBRixDQUFILEtBQVUsTUFBSSxFQUFFLFFBQXRCLElBQWdDLE9BQU8sQ0FBUDtBQUFTLEtBQUUsSUFBRixDQUFPLEVBQUMsUUFBTyxnQkFBUyxDQUFULEVBQVc7QUFBQyxVQUFJLElBQUUsRUFBRSxVQUFSLENBQW1CLE9BQU8sS0FBRyxPQUFLLEVBQUUsUUFBVixHQUFtQixDQUFuQixHQUFxQixJQUE1QjtBQUFpQyxLQUF4RSxFQUF5RSxTQUFRLGlCQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sRUFBRSxDQUFGLEVBQUksWUFBSixDQUFQO0FBQXlCLEtBQXRILEVBQXVILGNBQWEsc0JBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWU7QUFBQyxhQUFPLEVBQUUsQ0FBRixFQUFJLFlBQUosRUFBaUIsQ0FBakIsQ0FBUDtBQUEyQixLQUEvSyxFQUFnTCxNQUFLLGNBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxFQUFFLENBQUYsRUFBSSxhQUFKLENBQVA7QUFBMEIsS0FBM04sRUFBNE4sTUFBSyxjQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sRUFBRSxDQUFGLEVBQUksaUJBQUosQ0FBUDtBQUE4QixLQUEzUSxFQUE0USxTQUFRLGlCQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sRUFBRSxDQUFGLEVBQUksYUFBSixDQUFQO0FBQTBCLEtBQTFULEVBQTJULFNBQVEsaUJBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxFQUFFLENBQUYsRUFBSSxpQkFBSixDQUFQO0FBQThCLEtBQTdXLEVBQThXLFdBQVUsbUJBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWU7QUFBQyxhQUFPLEVBQUUsQ0FBRixFQUFJLGFBQUosRUFBa0IsQ0FBbEIsQ0FBUDtBQUE0QixLQUFwYSxFQUFxYSxXQUFVLG1CQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsYUFBTyxFQUFFLENBQUYsRUFBSSxpQkFBSixFQUFzQixDQUF0QixDQUFQO0FBQWdDLEtBQS9kLEVBQWdlLFVBQVMsa0JBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxFQUFFLENBQUMsRUFBRSxVQUFGLElBQWMsRUFBZixFQUFtQixVQUFyQixFQUFnQyxDQUFoQyxDQUFQO0FBQTBDLEtBQS9oQixFQUFnaUIsVUFBUyxrQkFBUyxDQUFULEVBQVc7QUFBQyxhQUFPLEVBQUUsRUFBRSxVQUFKLENBQVA7QUFBdUIsS0FBNWtCLEVBQTZrQixVQUFTLGtCQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sRUFBRSxDQUFGLEVBQUksUUFBSixJQUFjLEVBQUUsZUFBaEIsSUFBaUMsRUFBRSxDQUFGLEVBQUksVUFBSixNQUFrQixJQUFFLEVBQUUsT0FBRixJQUFXLENBQS9CLEdBQWtDLEVBQUUsS0FBRixDQUFRLEVBQVIsRUFBVyxFQUFFLFVBQWIsQ0FBbkUsQ0FBUDtBQUFvRyxLQUF0c0IsRUFBUCxFQUErc0IsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsTUFBRSxFQUFGLENBQUssQ0FBTCxJQUFRLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFVBQUksSUFBRSxFQUFFLEdBQUYsQ0FBTSxJQUFOLEVBQVcsQ0FBWCxFQUFhLENBQWIsQ0FBTixDQUFzQixPQUFNLFlBQVUsRUFBRSxLQUFGLENBQVEsQ0FBQyxDQUFULENBQVYsS0FBd0IsSUFBRSxDQUExQixHQUE2QixLQUFHLFlBQVUsT0FBTyxDQUFwQixLQUF3QixJQUFFLEVBQUUsTUFBRixDQUFTLENBQVQsRUFBVyxDQUFYLENBQTFCLENBQTdCLEVBQXNFLEtBQUssTUFBTCxHQUFZLENBQVosS0FBZ0IsRUFBRSxDQUFGLEtBQU0sRUFBRSxVQUFGLENBQWEsQ0FBYixDQUFOLEVBQXNCLEVBQUUsSUFBRixDQUFPLENBQVAsS0FBVyxFQUFFLE9BQUYsRUFBakQsQ0FBdEUsRUFBb0ksS0FBSyxTQUFMLENBQWUsQ0FBZixDQUExSTtBQUE0SixLQUF4TTtBQUF5TSxHQUF0NkIsRUFBdzZCLElBQUksSUFBRSxtQkFBTixDQUEwQixTQUFTLENBQVQsQ0FBVyxDQUFYLEVBQWE7QUFBQyxRQUFJLElBQUUsRUFBTixDQUFTLE9BQU8sRUFBRSxJQUFGLENBQU8sRUFBRSxLQUFGLENBQVEsQ0FBUixLQUFZLEVBQW5CLEVBQXNCLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFFBQUUsQ0FBRixJQUFLLENBQUMsQ0FBTjtBQUFRLEtBQTVDLEdBQThDLENBQXJEO0FBQXVELEtBQUUsU0FBRixHQUFZLFVBQVMsQ0FBVCxFQUFXO0FBQUMsUUFBRSxZQUFVLE9BQU8sQ0FBakIsR0FBbUIsRUFBRSxDQUFGLENBQW5CLEdBQXdCLEVBQUUsTUFBRixDQUFTLEVBQVQsRUFBWSxDQUFaLENBQTFCLENBQXlDLElBQUksQ0FBSjtBQUFBLFFBQU0sQ0FBTjtBQUFBLFFBQVEsQ0FBUjtBQUFBLFFBQVUsQ0FBVjtBQUFBLFFBQVksSUFBRSxFQUFkO0FBQUEsUUFBaUIsSUFBRSxFQUFuQjtBQUFBLFFBQXNCLElBQUUsQ0FBQyxDQUF6QjtBQUFBLFFBQTJCLElBQUUsU0FBRixDQUFFLEdBQVU7QUFBQyxXQUFJLElBQUUsS0FBRyxFQUFFLElBQVAsRUFBWSxJQUFFLElBQUUsQ0FBQyxDQUFyQixFQUF1QixFQUFFLE1BQXpCLEVBQWdDLElBQUUsQ0FBQyxDQUFuQyxFQUFxQztBQUFDLFlBQUUsRUFBRSxLQUFGLEVBQUYsQ0FBWSxPQUFNLEVBQUUsQ0FBRixHQUFJLEVBQUUsTUFBWjtBQUFtQixZQUFFLENBQUYsRUFBSyxLQUFMLENBQVcsRUFBRSxDQUFGLENBQVgsRUFBZ0IsRUFBRSxDQUFGLENBQWhCLE1BQXdCLENBQUMsQ0FBekIsSUFBNEIsRUFBRSxXQUE5QixLQUE0QyxJQUFFLEVBQUUsTUFBSixFQUFXLElBQUUsQ0FBQyxDQUExRDtBQUFuQjtBQUFnRixTQUFFLE1BQUYsS0FBVyxJQUFFLENBQUMsQ0FBZCxHQUFpQixJQUFFLENBQUMsQ0FBcEIsRUFBc0IsTUFBSSxJQUFFLElBQUUsRUFBRixHQUFLLEVBQVgsQ0FBdEI7QUFBcUMsS0FBL007QUFBQSxRQUFnTixJQUFFLEVBQUMsS0FBSSxlQUFVO0FBQUMsZUFBTyxNQUFJLEtBQUcsQ0FBQyxDQUFKLEtBQVEsSUFBRSxFQUFFLE1BQUYsR0FBUyxDQUFYLEVBQWEsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUFyQixHQUFnQyxTQUFTLENBQVQsQ0FBVyxDQUFYLEVBQWE7QUFBQyxZQUFFLElBQUYsQ0FBTyxDQUFQLEVBQVMsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsY0FBRSxVQUFGLENBQWEsQ0FBYixJQUFnQixFQUFFLE1BQUYsSUFBVSxFQUFFLEdBQUYsQ0FBTSxDQUFOLENBQVYsSUFBb0IsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUFwQyxHQUE4QyxLQUFHLEVBQUUsTUFBTCxJQUFhLGFBQVcsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUF4QixJQUFtQyxFQUFFLENBQUYsQ0FBakY7QUFBc0YsV0FBN0c7QUFBK0csU0FBN0gsQ0FBOEgsU0FBOUgsQ0FBaEMsRUFBeUssS0FBRyxDQUFDLENBQUosSUFBTyxHQUFwTCxHQUF5TCxJQUFoTTtBQUFxTSxPQUFyTixFQUFzTixRQUFPLGtCQUFVO0FBQUMsZUFBTyxFQUFFLElBQUYsQ0FBTyxTQUFQLEVBQWlCLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLGNBQUksQ0FBSixDQUFNLE9BQU0sQ0FBQyxJQUFFLEVBQUUsT0FBRixDQUFVLENBQVYsRUFBWSxDQUFaLEVBQWMsQ0FBZCxDQUFILElBQXFCLENBQUMsQ0FBNUI7QUFBOEIsY0FBRSxNQUFGLENBQVMsQ0FBVCxFQUFXLENBQVgsR0FBYyxLQUFHLENBQUgsSUFBTSxHQUFwQjtBQUE5QjtBQUFzRCxTQUEzRixHQUE2RixJQUFwRztBQUF5RyxPQUFqVixFQUFrVixLQUFJLGFBQVMsQ0FBVCxFQUFXO0FBQUMsZUFBTyxJQUFFLEVBQUUsT0FBRixDQUFVLENBQVYsRUFBWSxDQUFaLElBQWUsQ0FBQyxDQUFsQixHQUFvQixFQUFFLE1BQUYsR0FBUyxDQUFwQztBQUFzQyxPQUF4WSxFQUF5WSxPQUFNLGlCQUFVO0FBQUMsZUFBTyxNQUFJLElBQUUsRUFBTixHQUFVLElBQWpCO0FBQXNCLE9BQWhiLEVBQWliLFNBQVEsbUJBQVU7QUFBQyxlQUFPLElBQUUsSUFBRSxFQUFKLEVBQU8sSUFBRSxJQUFFLEVBQVgsRUFBYyxJQUFyQjtBQUEwQixPQUE5ZCxFQUErZCxVQUFTLG9CQUFVO0FBQUMsZUFBTSxDQUFDLENBQVA7QUFBUyxPQUE1ZixFQUE2ZixNQUFLLGdCQUFVO0FBQUMsZUFBTyxJQUFFLElBQUUsRUFBSixFQUFPLEtBQUcsQ0FBSCxLQUFPLElBQUUsSUFBRSxFQUFYLENBQVAsRUFBc0IsSUFBN0I7QUFBa0MsT0FBL2lCLEVBQWdqQixRQUFPLGtCQUFVO0FBQUMsZUFBTSxDQUFDLENBQUMsQ0FBUjtBQUFVLE9BQTVrQixFQUE2a0IsVUFBUyxrQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsZUFBTyxNQUFJLElBQUUsS0FBRyxFQUFMLEVBQVEsSUFBRSxDQUFDLENBQUQsRUFBRyxFQUFFLEtBQUYsR0FBUSxFQUFFLEtBQUYsRUFBUixHQUFrQixDQUFyQixDQUFWLEVBQWtDLEVBQUUsSUFBRixDQUFPLENBQVAsQ0FBbEMsRUFBNEMsS0FBRyxHQUFuRCxHQUF3RCxJQUEvRDtBQUFvRSxPQUF4cUIsRUFBeXFCLE1BQUssZ0JBQVU7QUFBQyxlQUFPLEVBQUUsUUFBRixDQUFXLElBQVgsRUFBZ0IsU0FBaEIsR0FBMkIsSUFBbEM7QUFBdUMsT0FBaHVCLEVBQWl1QixPQUFNLGlCQUFVO0FBQUMsZUFBTSxDQUFDLENBQUMsQ0FBUjtBQUFVLE9BQTV2QixFQUFsTixDQUFnOUIsT0FBTyxDQUFQO0FBQVMsR0FBMWhDLENBQTJoQyxTQUFTLENBQVQsQ0FBVyxDQUFYLEVBQWE7QUFBQyxXQUFPLENBQVA7QUFBUyxZQUFTLENBQVQsQ0FBVyxDQUFYLEVBQWE7QUFBQyxVQUFNLENBQU47QUFBUSxZQUFTLENBQVQsQ0FBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUI7QUFBQyxRQUFJLENBQUosQ0FBTSxJQUFHO0FBQUMsV0FBRyxFQUFFLFVBQUYsQ0FBYSxJQUFFLEVBQUUsT0FBakIsQ0FBSCxHQUE2QixFQUFFLElBQUYsQ0FBTyxDQUFQLEVBQVUsSUFBVixDQUFlLENBQWYsRUFBa0IsSUFBbEIsQ0FBdUIsQ0FBdkIsQ0FBN0IsR0FBdUQsS0FBRyxFQUFFLFVBQUYsQ0FBYSxJQUFFLEVBQUUsSUFBakIsQ0FBSCxHQUEwQixFQUFFLElBQUYsQ0FBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsQ0FBMUIsR0FBd0MsRUFBRSxLQUFGLENBQVEsS0FBSyxDQUFiLEVBQWUsQ0FBQyxDQUFELEVBQUksS0FBSixDQUFVLENBQVYsQ0FBZixDQUEvRjtBQUE0SCxLQUFoSSxDQUFnSSxPQUFNLENBQU4sRUFBUTtBQUFDLFFBQUUsS0FBRixDQUFRLEtBQUssQ0FBYixFQUFlLENBQUMsQ0FBRCxDQUFmO0FBQW9CO0FBQUMsS0FBRSxNQUFGLENBQVMsRUFBQyxVQUFTLGtCQUFTLENBQVQsRUFBVztBQUFDLFVBQUksSUFBRSxDQUFDLENBQUMsUUFBRCxFQUFVLFVBQVYsRUFBcUIsRUFBRSxTQUFGLENBQVksUUFBWixDQUFyQixFQUEyQyxFQUFFLFNBQUYsQ0FBWSxRQUFaLENBQTNDLEVBQWlFLENBQWpFLENBQUQsRUFBcUUsQ0FBQyxTQUFELEVBQVcsTUFBWCxFQUFrQixFQUFFLFNBQUYsQ0FBWSxhQUFaLENBQWxCLEVBQTZDLEVBQUUsU0FBRixDQUFZLGFBQVosQ0FBN0MsRUFBd0UsQ0FBeEUsRUFBMEUsVUFBMUUsQ0FBckUsRUFBMkosQ0FBQyxRQUFELEVBQVUsTUFBVixFQUFpQixFQUFFLFNBQUYsQ0FBWSxhQUFaLENBQWpCLEVBQTRDLEVBQUUsU0FBRixDQUFZLGFBQVosQ0FBNUMsRUFBdUUsQ0FBdkUsRUFBeUUsVUFBekUsQ0FBM0osQ0FBTjtBQUFBLFVBQXVQLElBQUUsU0FBelA7QUFBQSxVQUFtUSxJQUFFLEVBQUMsT0FBTSxpQkFBVTtBQUFDLGlCQUFPLENBQVA7QUFBUyxTQUEzQixFQUE0QixRQUFPLGtCQUFVO0FBQUMsaUJBQU8sRUFBRSxJQUFGLENBQU8sU0FBUCxFQUFrQixJQUFsQixDQUF1QixTQUF2QixHQUFrQyxJQUF6QztBQUE4QyxTQUE1RixFQUE2RixTQUFRLGdCQUFTLENBQVQsRUFBVztBQUFDLGlCQUFPLEVBQUUsSUFBRixDQUFPLElBQVAsRUFBWSxDQUFaLENBQVA7QUFBc0IsU0FBdkksRUFBd0ksTUFBSyxnQkFBVTtBQUFDLGNBQUksSUFBRSxTQUFOLENBQWdCLE9BQU8sRUFBRSxRQUFGLENBQVcsVUFBUyxDQUFULEVBQVc7QUFBQyxjQUFFLElBQUYsQ0FBTyxDQUFQLEVBQVMsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsa0JBQUksSUFBRSxFQUFFLFVBQUYsQ0FBYSxFQUFFLEVBQUUsQ0FBRixDQUFGLENBQWIsS0FBdUIsRUFBRSxFQUFFLENBQUYsQ0FBRixDQUE3QixDQUFxQyxFQUFFLEVBQUUsQ0FBRixDQUFGLEVBQVEsWUFBVTtBQUFDLG9CQUFJLElBQUUsS0FBRyxFQUFFLEtBQUYsQ0FBUSxJQUFSLEVBQWEsU0FBYixDQUFULENBQWlDLEtBQUcsRUFBRSxVQUFGLENBQWEsRUFBRSxPQUFmLENBQUgsR0FBMkIsRUFBRSxPQUFGLEdBQVksUUFBWixDQUFxQixFQUFFLE1BQXZCLEVBQStCLElBQS9CLENBQW9DLEVBQUUsT0FBdEMsRUFBK0MsSUFBL0MsQ0FBb0QsRUFBRSxNQUF0RCxDQUEzQixHQUF5RixFQUFFLEVBQUUsQ0FBRixJQUFLLE1BQVAsRUFBZSxJQUFmLEVBQW9CLElBQUUsQ0FBQyxDQUFELENBQUYsR0FBTSxTQUExQixDQUF6RjtBQUE4SCxlQUFsTDtBQUFvTCxhQUFoUCxHQUFrUCxJQUFFLElBQXBQO0FBQXlQLFdBQWhSLEVBQWtSLE9BQWxSLEVBQVA7QUFBbVMsU0FBM2MsRUFBNGMsTUFBSyxjQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsY0FBSSxJQUFFLENBQU4sQ0FBUSxTQUFTLENBQVQsQ0FBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUI7QUFBQyxtQkFBTyxZQUFVO0FBQUMsa0JBQUksSUFBRSxJQUFOO0FBQUEsa0JBQVcsSUFBRSxTQUFiO0FBQUEsa0JBQXVCLElBQUUsYUFBVTtBQUFDLG9CQUFJLENBQUosRUFBTSxDQUFOLENBQVEsSUFBRyxFQUFFLElBQUUsQ0FBSixDQUFILEVBQVU7QUFBQyxzQkFBRyxJQUFFLEVBQUUsS0FBRixDQUFRLENBQVIsRUFBVSxDQUFWLENBQUYsRUFBZSxNQUFJLEVBQUUsT0FBRixFQUF0QixFQUFrQyxNQUFNLElBQUksU0FBSixDQUFjLDBCQUFkLENBQU4sQ0FBZ0QsSUFBRSxNQUFJLG9CQUFpQixDQUFqQix5Q0FBaUIsQ0FBakIsTUFBb0IsY0FBWSxPQUFPLENBQTNDLEtBQStDLEVBQUUsSUFBbkQsRUFBd0QsRUFBRSxVQUFGLENBQWEsQ0FBYixJQUFnQixJQUFFLEVBQUUsSUFBRixDQUFPLENBQVAsRUFBUyxFQUFFLENBQUYsRUFBSSxDQUFKLEVBQU0sQ0FBTixFQUFRLENBQVIsQ0FBVCxFQUFvQixFQUFFLENBQUYsRUFBSSxDQUFKLEVBQU0sQ0FBTixFQUFRLENBQVIsQ0FBcEIsQ0FBRixJQUFtQyxLQUFJLEVBQUUsSUFBRixDQUFPLENBQVAsRUFBUyxFQUFFLENBQUYsRUFBSSxDQUFKLEVBQU0sQ0FBTixFQUFRLENBQVIsQ0FBVCxFQUFvQixFQUFFLENBQUYsRUFBSSxDQUFKLEVBQU0sQ0FBTixFQUFRLENBQVIsQ0FBcEIsRUFBK0IsRUFBRSxDQUFGLEVBQUksQ0FBSixFQUFNLENBQU4sRUFBUSxFQUFFLFVBQVYsQ0FBL0IsQ0FBdkMsQ0FBaEIsSUFBK0csTUFBSSxDQUFKLEtBQVEsSUFBRSxLQUFLLENBQVAsRUFBUyxJQUFFLENBQUMsQ0FBRCxDQUFuQixHQUF3QixDQUFDLEtBQUcsRUFBRSxXQUFOLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLENBQXZJLENBQXhEO0FBQXdOO0FBQUMsZUFBbFc7QUFBQSxrQkFBbVcsSUFBRSxJQUFFLENBQUYsR0FBSSxZQUFVO0FBQUMsb0JBQUc7QUFBQztBQUFJLGlCQUFSLENBQVEsT0FBTSxDQUFOLEVBQVE7QUFBQyxvQkFBRSxRQUFGLENBQVcsYUFBWCxJQUEwQixFQUFFLFFBQUYsQ0FBVyxhQUFYLENBQXlCLENBQXpCLEVBQTJCLEVBQUUsVUFBN0IsQ0FBMUIsRUFBbUUsSUFBRSxDQUFGLElBQUssQ0FBTCxLQUFTLE1BQUksQ0FBSixLQUFRLElBQUUsS0FBSyxDQUFQLEVBQVMsSUFBRSxDQUFDLENBQUQsQ0FBbkIsR0FBd0IsRUFBRSxVQUFGLENBQWEsQ0FBYixFQUFlLENBQWYsQ0FBakMsQ0FBbkU7QUFBdUg7QUFBQyxlQUE3ZixDQUE4ZixJQUFFLEdBQUYsSUFBTyxFQUFFLFFBQUYsQ0FBVyxZQUFYLEtBQTBCLEVBQUUsVUFBRixHQUFhLEVBQUUsUUFBRixDQUFXLFlBQVgsRUFBdkMsR0FBa0UsRUFBRSxVQUFGLENBQWEsQ0FBYixDQUF6RTtBQUEwRixhQUExbUI7QUFBMm1CLGtCQUFPLEVBQUUsUUFBRixDQUFXLFVBQVMsQ0FBVCxFQUFXO0FBQUMsY0FBRSxDQUFGLEVBQUssQ0FBTCxFQUFRLEdBQVIsQ0FBWSxFQUFFLENBQUYsRUFBSSxDQUFKLEVBQU0sRUFBRSxVQUFGLENBQWEsQ0FBYixJQUFnQixDQUFoQixHQUFrQixDQUF4QixFQUEwQixFQUFFLFVBQTVCLENBQVosR0FBcUQsRUFBRSxDQUFGLEVBQUssQ0FBTCxFQUFRLEdBQVIsQ0FBWSxFQUFFLENBQUYsRUFBSSxDQUFKLEVBQU0sRUFBRSxVQUFGLENBQWEsQ0FBYixJQUFnQixDQUFoQixHQUFrQixDQUF4QixDQUFaLENBQXJELEVBQTZGLEVBQUUsQ0FBRixFQUFLLENBQUwsRUFBUSxHQUFSLENBQVksRUFBRSxDQUFGLEVBQUksQ0FBSixFQUFNLEVBQUUsVUFBRixDQUFhLENBQWIsSUFBZ0IsQ0FBaEIsR0FBa0IsQ0FBeEIsQ0FBWixDQUE3RjtBQUFxSSxXQUE1SixFQUE4SixPQUE5SixFQUFQO0FBQStLLFNBQXZ4QyxFQUF3eEMsU0FBUSxpQkFBUyxDQUFULEVBQVc7QUFBQyxpQkFBTyxRQUFNLENBQU4sR0FBUSxFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsQ0FBWCxDQUFSLEdBQXNCLENBQTdCO0FBQStCLFNBQTMwQyxFQUFyUTtBQUFBLFVBQWtsRCxJQUFFLEVBQXBsRCxDQUF1bEQsT0FBTyxFQUFFLElBQUYsQ0FBTyxDQUFQLEVBQVMsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsWUFBSSxJQUFFLEVBQUUsQ0FBRixDQUFOO0FBQUEsWUFBVyxJQUFFLEVBQUUsQ0FBRixDQUFiLENBQWtCLEVBQUUsRUFBRSxDQUFGLENBQUYsSUFBUSxFQUFFLEdBQVYsRUFBYyxLQUFHLEVBQUUsR0FBRixDQUFNLFlBQVU7QUFBQyxjQUFFLENBQUY7QUFBSSxTQUFyQixFQUFzQixFQUFFLElBQUUsQ0FBSixFQUFPLENBQVAsRUFBVSxPQUFoQyxFQUF3QyxFQUFFLENBQUYsRUFBSyxDQUFMLEVBQVEsSUFBaEQsQ0FBakIsRUFBdUUsRUFBRSxHQUFGLENBQU0sRUFBRSxDQUFGLEVBQUssSUFBWCxDQUF2RSxFQUF3RixFQUFFLEVBQUUsQ0FBRixDQUFGLElBQVEsWUFBVTtBQUFDLGlCQUFPLEVBQUUsRUFBRSxDQUFGLElBQUssTUFBUCxFQUFlLFNBQU8sQ0FBUCxHQUFTLEtBQUssQ0FBZCxHQUFnQixJQUEvQixFQUFvQyxTQUFwQyxHQUErQyxJQUF0RDtBQUEyRCxTQUF0SyxFQUF1SyxFQUFFLEVBQUUsQ0FBRixJQUFLLE1BQVAsSUFBZSxFQUFFLFFBQXhMO0FBQWlNLE9BQTFPLEdBQTRPLEVBQUUsT0FBRixDQUFVLENBQVYsQ0FBNU8sRUFBeVAsS0FBRyxFQUFFLElBQUYsQ0FBTyxDQUFQLEVBQVMsQ0FBVCxDQUE1UCxFQUF3USxDQUEvUTtBQUFpUixLQUE5M0QsRUFBKzNELE1BQUssY0FBUyxDQUFULEVBQVc7QUFBQyxVQUFJLElBQUUsVUFBVSxNQUFoQjtBQUFBLFVBQXVCLElBQUUsQ0FBekI7QUFBQSxVQUEyQixJQUFFLE1BQU0sQ0FBTixDQUE3QjtBQUFBLFVBQXNDLElBQUUsRUFBRSxJQUFGLENBQU8sU0FBUCxDQUF4QztBQUFBLFVBQTBELElBQUUsRUFBRSxRQUFGLEVBQTVEO0FBQUEsVUFBeUUsSUFBRSxTQUFGLENBQUUsQ0FBUyxDQUFULEVBQVc7QUFBQyxlQUFPLFVBQVMsQ0FBVCxFQUFXO0FBQUMsWUFBRSxDQUFGLElBQUssSUFBTCxFQUFVLEVBQUUsQ0FBRixJQUFLLFVBQVUsTUFBVixHQUFpQixDQUFqQixHQUFtQixFQUFFLElBQUYsQ0FBTyxTQUFQLENBQW5CLEdBQXFDLENBQXBELEVBQXNELEVBQUUsQ0FBRixJQUFLLEVBQUUsV0FBRixDQUFjLENBQWQsRUFBZ0IsQ0FBaEIsQ0FBM0Q7QUFBOEUsU0FBakc7QUFBa0csT0FBekwsQ0FBMEwsSUFBRyxLQUFHLENBQUgsS0FBTyxFQUFFLENBQUYsRUFBSSxFQUFFLElBQUYsQ0FBTyxFQUFFLENBQUYsQ0FBUCxFQUFhLE9BQWpCLEVBQXlCLEVBQUUsTUFBM0IsRUFBa0MsQ0FBQyxDQUFuQyxHQUFzQyxjQUFZLEVBQUUsS0FBRixFQUFaLElBQXVCLEVBQUUsVUFBRixDQUFhLEVBQUUsQ0FBRixLQUFNLEVBQUUsQ0FBRixFQUFLLElBQXhCLENBQXBFLENBQUgsRUFBc0csT0FBTyxFQUFFLElBQUYsRUFBUCxDQUFnQixPQUFNLEdBQU47QUFBVSxVQUFFLEVBQUUsQ0FBRixDQUFGLEVBQU8sRUFBRSxDQUFGLENBQVAsRUFBWSxFQUFFLE1BQWQ7QUFBVixPQUFnQyxPQUFPLEVBQUUsT0FBRixFQUFQO0FBQW1CLEtBQW52RSxFQUFULEVBQSt2RSxJQUFJLElBQUUsd0RBQU4sQ0FBK0QsRUFBRSxRQUFGLENBQVcsYUFBWCxHQUF5QixVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxNQUFFLE9BQUYsSUFBVyxFQUFFLE9BQUYsQ0FBVSxJQUFyQixJQUEyQixDQUEzQixJQUE4QixFQUFFLElBQUYsQ0FBTyxFQUFFLElBQVQsQ0FBOUIsSUFBOEMsRUFBRSxPQUFGLENBQVUsSUFBVixDQUFlLGdDQUE4QixFQUFFLE9BQS9DLEVBQXVELEVBQUUsS0FBekQsRUFBK0QsQ0FBL0QsQ0FBOUM7QUFBZ0gsR0FBdkosRUFBd0osRUFBRSxjQUFGLEdBQWlCLFVBQVMsQ0FBVCxFQUFXO0FBQUMsTUFBRSxVQUFGLENBQWEsWUFBVTtBQUFDLFlBQU0sQ0FBTjtBQUFRLEtBQWhDO0FBQWtDLEdBQXZOLENBQXdOLElBQUksSUFBRSxFQUFFLFFBQUYsRUFBTixDQUFtQixFQUFFLEVBQUYsQ0FBSyxLQUFMLEdBQVcsVUFBUyxDQUFULEVBQVc7QUFBQyxXQUFPLEVBQUUsSUFBRixDQUFPLENBQVAsRUFBVSxPQUFWLEVBQW1CLFVBQVMsQ0FBVCxFQUFXO0FBQUMsUUFBRSxjQUFGLENBQWlCLENBQWpCO0FBQW9CLEtBQW5ELEdBQXFELElBQTVEO0FBQWlFLEdBQXhGLEVBQXlGLEVBQUUsTUFBRixDQUFTLEVBQUMsU0FBUSxDQUFDLENBQVYsRUFBWSxXQUFVLENBQXRCLEVBQXdCLE9BQU0sZUFBUyxDQUFULEVBQVc7QUFBQyxPQUFDLE1BQUksQ0FBQyxDQUFMLEdBQU8sRUFBRSxFQUFFLFNBQVgsR0FBcUIsRUFBRSxPQUF4QixNQUFtQyxFQUFFLE9BQUYsR0FBVSxDQUFDLENBQVgsRUFBYSxNQUFJLENBQUMsQ0FBTCxJQUFRLEVBQUUsRUFBRSxTQUFKLEdBQWMsQ0FBdEIsSUFBeUIsRUFBRSxXQUFGLENBQWMsQ0FBZCxFQUFnQixDQUFDLENBQUQsQ0FBaEIsQ0FBekU7QUFBK0YsS0FBekksRUFBVCxDQUF6RixFQUE4TyxFQUFFLEtBQUYsQ0FBUSxJQUFSLEdBQWEsRUFBRSxJQUE3UCxDQUFrUSxTQUFTLENBQVQsR0FBWTtBQUFDLE1BQUUsbUJBQUYsQ0FBc0Isa0JBQXRCLEVBQXlDLENBQXpDLEdBQ3J2K0IsRUFBRSxtQkFBRixDQUFzQixNQUF0QixFQUE2QixDQUE3QixDQURxditCLEVBQ3J0K0IsRUFBRSxLQUFGLEVBRHF0K0I7QUFDM3MrQixrQkFBYSxFQUFFLFVBQWYsSUFBMkIsY0FBWSxFQUFFLFVBQWQsSUFBMEIsQ0FBQyxFQUFFLGVBQUYsQ0FBa0IsUUFBeEUsR0FBaUYsRUFBRSxVQUFGLENBQWEsRUFBRSxLQUFmLENBQWpGLElBQXdHLEVBQUUsZ0JBQUYsQ0FBbUIsa0JBQW5CLEVBQXNDLENBQXRDLEdBQXlDLEVBQUUsZ0JBQUYsQ0FBbUIsTUFBbkIsRUFBMEIsQ0FBMUIsQ0FBakosRUFBK0ssSUFBSSxJQUFFLFNBQUYsQ0FBRSxDQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUI7QUFBQyxRQUFJLElBQUUsQ0FBTjtBQUFBLFFBQVEsSUFBRSxFQUFFLE1BQVo7QUFBQSxRQUFtQixJQUFFLFFBQU0sQ0FBM0IsQ0FBNkIsSUFBRyxhQUFXLEVBQUUsSUFBRixDQUFPLENBQVAsQ0FBZCxFQUF3QjtBQUFDLFVBQUUsQ0FBQyxDQUFILENBQUssS0FBSSxDQUFKLElBQVMsQ0FBVDtBQUFXLFVBQUUsQ0FBRixFQUFJLENBQUosRUFBTSxDQUFOLEVBQVEsRUFBRSxDQUFGLENBQVIsRUFBYSxDQUFDLENBQWQsRUFBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEI7QUFBWDtBQUFnQyxLQUE5RCxNQUFtRSxJQUFHLEtBQUssQ0FBTCxLQUFTLENBQVQsS0FBYSxJQUFFLENBQUMsQ0FBSCxFQUFLLEVBQUUsVUFBRixDQUFhLENBQWIsTUFBa0IsSUFBRSxDQUFDLENBQXJCLENBQUwsRUFBNkIsTUFBSSxLQUFHLEVBQUUsSUFBRixDQUFPLENBQVAsRUFBUyxDQUFULEdBQVksSUFBRSxJQUFqQixLQUF3QixJQUFFLENBQUYsRUFBSSxJQUFFLFdBQVMsQ0FBVCxFQUFXLEVBQVgsRUFBYSxDQUFiLEVBQWU7QUFBQyxhQUFPLEVBQUUsSUFBRixDQUFPLEVBQUUsQ0FBRixDQUFQLEVBQVksQ0FBWixDQUFQO0FBQXNCLEtBQXBFLENBQUosQ0FBN0IsRUFBd0csQ0FBckgsQ0FBSCxFQUEySCxPQUFLLElBQUUsQ0FBUCxFQUFTLEdBQVQ7QUFBYSxRQUFFLEVBQUUsQ0FBRixDQUFGLEVBQU8sQ0FBUCxFQUFTLElBQUUsQ0FBRixHQUFJLEVBQUUsSUFBRixDQUFPLEVBQUUsQ0FBRixDQUFQLEVBQVksQ0FBWixFQUFjLEVBQUUsRUFBRSxDQUFGLENBQUYsRUFBTyxDQUFQLENBQWQsQ0FBYjtBQUFiLEtBQW9ELE9BQU8sSUFBRSxDQUFGLEdBQUksSUFBRSxFQUFFLElBQUYsQ0FBTyxDQUFQLENBQUYsR0FBWSxJQUFFLEVBQUUsRUFBRSxDQUFGLENBQUYsRUFBTyxDQUFQLENBQUYsR0FBWSxDQUFuQztBQUFxQyxHQUFsVjtBQUFBLE1BQW1WLElBQUUsU0FBRixDQUFFLENBQVMsQ0FBVCxFQUFXO0FBQUMsV0FBTyxNQUFJLEVBQUUsUUFBTixJQUFnQixNQUFJLEVBQUUsUUFBdEIsSUFBZ0MsQ0FBQyxDQUFDLEVBQUUsUUFBM0M7QUFBb0QsR0FBclosQ0FBc1osU0FBUyxDQUFULEdBQVk7QUFBQyxTQUFLLE9BQUwsR0FBYSxFQUFFLE9BQUYsR0FBVSxFQUFFLEdBQUYsRUFBdkI7QUFBK0IsS0FBRSxHQUFGLEdBQU0sQ0FBTixFQUFRLEVBQUUsU0FBRixHQUFZLEVBQUMsT0FBTSxlQUFTLENBQVQsRUFBVztBQUFDLFVBQUksSUFBRSxFQUFFLEtBQUssT0FBUCxDQUFOLENBQXNCLE9BQU8sTUFBSSxJQUFFLEVBQUYsRUFBSyxFQUFFLENBQUYsTUFBTyxFQUFFLFFBQUYsR0FBVyxFQUFFLEtBQUssT0FBUCxJQUFnQixDQUEzQixHQUE2QixPQUFPLGNBQVAsQ0FBc0IsQ0FBdEIsRUFBd0IsS0FBSyxPQUE3QixFQUFxQyxFQUFDLE9BQU0sQ0FBUCxFQUFTLGNBQWEsQ0FBQyxDQUF2QixFQUFyQyxDQUFwQyxDQUFULEdBQStHLENBQXRIO0FBQXdILEtBQWpLLEVBQWtLLEtBQUksYUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLFVBQUksQ0FBSjtBQUFBLFVBQU0sSUFBRSxLQUFLLEtBQUwsQ0FBVyxDQUFYLENBQVIsQ0FBc0IsSUFBRyxZQUFVLE9BQU8sQ0FBcEIsRUFBc0IsRUFBRSxFQUFFLFNBQUYsQ0FBWSxDQUFaLENBQUYsSUFBa0IsQ0FBbEIsQ0FBdEIsS0FBK0MsS0FBSSxDQUFKLElBQVMsQ0FBVDtBQUFXLFVBQUUsRUFBRSxTQUFGLENBQVksQ0FBWixDQUFGLElBQWtCLEVBQUUsQ0FBRixDQUFsQjtBQUFYLE9BQWtDLE9BQU8sQ0FBUDtBQUFTLEtBQXRTLEVBQXVTLEtBQUksYUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsYUFBTyxLQUFLLENBQUwsS0FBUyxDQUFULEdBQVcsS0FBSyxLQUFMLENBQVcsQ0FBWCxDQUFYLEdBQXlCLEVBQUUsS0FBSyxPQUFQLEtBQWlCLEVBQUUsS0FBSyxPQUFQLEVBQWdCLEVBQUUsU0FBRixDQUFZLENBQVosQ0FBaEIsQ0FBakQ7QUFBaUYsS0FBMVksRUFBMlksUUFBTyxnQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLGFBQU8sS0FBSyxDQUFMLEtBQVMsQ0FBVCxJQUFZLEtBQUcsWUFBVSxPQUFPLENBQXBCLElBQXVCLEtBQUssQ0FBTCxLQUFTLENBQTVDLEdBQThDLEtBQUssR0FBTCxDQUFTLENBQVQsRUFBVyxDQUFYLENBQTlDLElBQTZELEtBQUssR0FBTCxDQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixHQUFnQixLQUFLLENBQUwsS0FBUyxDQUFULEdBQVcsQ0FBWCxHQUFhLENBQTFGLENBQVA7QUFBb0csS0FBdGdCLEVBQXVnQixRQUFPLGdCQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxVQUFJLENBQUo7QUFBQSxVQUFNLElBQUUsRUFBRSxLQUFLLE9BQVAsQ0FBUixDQUF3QixJQUFHLEtBQUssQ0FBTCxLQUFTLENBQVosRUFBYztBQUFDLFlBQUcsS0FBSyxDQUFMLEtBQVMsQ0FBWixFQUFjO0FBQUMsZ0JBQU0sT0FBTixDQUFjLENBQWQsSUFBaUIsSUFBRSxFQUFFLEdBQUYsQ0FBTSxFQUFFLFNBQVIsQ0FBbkIsSUFBdUMsSUFBRSxFQUFFLFNBQUYsQ0FBWSxDQUFaLENBQUYsRUFBaUIsSUFBRSxLQUFLLENBQUwsR0FBTyxDQUFDLENBQUQsQ0FBUCxHQUFXLEVBQUUsS0FBRixDQUFRLENBQVIsS0FBWSxFQUFqRixHQUFxRixJQUFFLEVBQUUsTUFBekYsQ0FBZ0csT0FBTSxHQUFOO0FBQVUsbUJBQU8sRUFBRSxFQUFFLENBQUYsQ0FBRixDQUFQO0FBQVY7QUFBeUIsVUFBQyxLQUFLLENBQUwsS0FBUyxDQUFULElBQVksRUFBRSxhQUFGLENBQWdCLENBQWhCLENBQWIsTUFBbUMsRUFBRSxRQUFGLEdBQVcsRUFBRSxLQUFLLE9BQVAsSUFBZ0IsS0FBSyxDQUFoQyxHQUFrQyxPQUFPLEVBQUUsS0FBSyxPQUFQLENBQTVFO0FBQTZGO0FBQUMsS0FBenlCLEVBQTB5QixTQUFRLGlCQUFTLENBQVQsRUFBVztBQUFDLFVBQUksSUFBRSxFQUFFLEtBQUssT0FBUCxDQUFOLENBQXNCLE9BQU8sS0FBSyxDQUFMLEtBQVMsQ0FBVCxJQUFZLENBQUMsRUFBRSxhQUFGLENBQWdCLENBQWhCLENBQXBCO0FBQXVDLEtBQTMzQixFQUFwQixDQUFpNUIsSUFBSSxJQUFFLElBQUksQ0FBSixFQUFOO0FBQUEsTUFBWSxJQUFFLElBQUksQ0FBSixFQUFkO0FBQUEsTUFBb0IsSUFBRSwrQkFBdEI7QUFBQSxNQUFzRCxJQUFFLFFBQXhELENBQWlFLFNBQVMsQ0FBVCxDQUFXLENBQVgsRUFBYTtBQUFDLFdBQU0sV0FBUyxDQUFULElBQVksWUFBVSxDQUFWLEtBQWMsV0FBUyxDQUFULEdBQVcsSUFBWCxHQUFnQixNQUFJLENBQUMsQ0FBRCxHQUFHLEVBQVAsR0FBVSxDQUFDLENBQVgsR0FBYSxFQUFFLElBQUYsQ0FBTyxDQUFQLElBQVUsS0FBSyxLQUFMLENBQVcsQ0FBWCxDQUFWLEdBQXdCLENBQW5FLENBQWxCO0FBQXdGLFlBQVMsQ0FBVCxDQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQjtBQUFDLFFBQUksQ0FBSixDQUFNLElBQUcsS0FBSyxDQUFMLEtBQVMsQ0FBVCxJQUFZLE1BQUksRUFBRSxRQUFyQixFQUE4QixJQUFHLElBQUUsVUFBUSxFQUFFLE9BQUYsQ0FBVSxDQUFWLEVBQVksS0FBWixFQUFtQixXQUFuQixFQUFWLEVBQTJDLElBQUUsRUFBRSxZQUFGLENBQWUsQ0FBZixDQUE3QyxFQUErRCxZQUFVLE9BQU8sQ0FBbkYsRUFBcUY7QUFBQyxVQUFHO0FBQUMsWUFBRSxFQUFFLENBQUYsQ0FBRjtBQUFPLE9BQVgsQ0FBVyxPQUFNLENBQU4sRUFBUSxDQUFFLEdBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxDQUFSLEVBQVUsQ0FBVjtBQUFhLEtBQXhILE1BQTZILElBQUUsS0FBSyxDQUFQLENBQVMsT0FBTyxDQUFQO0FBQVMsS0FBRSxNQUFGLENBQVMsRUFBQyxTQUFRLGlCQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sRUFBRSxPQUFGLENBQVUsQ0FBVixLQUFjLEVBQUUsT0FBRixDQUFVLENBQVYsQ0FBckI7QUFBa0MsS0FBdkQsRUFBd0QsTUFBSyxjQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsYUFBTyxFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsQ0FBUDtBQUF1QixLQUFwRyxFQUFxRyxZQUFXLG9CQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxRQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsQ0FBWDtBQUFjLEtBQTVJLEVBQTZJLE9BQU0sZUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLGFBQU8sRUFBRSxNQUFGLENBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLENBQVA7QUFBdUIsS0FBMUwsRUFBMkwsYUFBWSxxQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsUUFBRSxNQUFGLENBQVMsQ0FBVCxFQUFXLENBQVg7QUFBYyxLQUFuTyxFQUFULEdBQStPLEVBQUUsRUFBRixDQUFLLE1BQUwsQ0FBWSxFQUFDLE1BQUssY0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsVUFBSSxDQUFKO0FBQUEsVUFBTSxDQUFOO0FBQUEsVUFBUSxDQUFSO0FBQUEsVUFBVSxJQUFFLEtBQUssQ0FBTCxDQUFaO0FBQUEsVUFBb0IsSUFBRSxLQUFHLEVBQUUsVUFBM0IsQ0FBc0MsSUFBRyxLQUFLLENBQUwsS0FBUyxDQUFaLEVBQWM7QUFBQyxZQUFHLEtBQUssTUFBTCxLQUFjLElBQUUsRUFBRSxHQUFGLENBQU0sQ0FBTixDQUFGLEVBQVcsTUFBSSxFQUFFLFFBQU4sSUFBZ0IsQ0FBQyxFQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVEsY0FBUixDQUExQyxDQUFILEVBQXNFO0FBQUMsY0FBRSxFQUFFLE1BQUosQ0FBVyxPQUFNLEdBQU47QUFBVSxjQUFFLENBQUYsTUFBTyxJQUFFLEVBQUUsQ0FBRixFQUFLLElBQVAsRUFBWSxNQUFJLEVBQUUsT0FBRixDQUFVLE9BQVYsQ0FBSixLQUF5QixJQUFFLEVBQUUsU0FBRixDQUFZLEVBQUUsS0FBRixDQUFRLENBQVIsQ0FBWixDQUFGLEVBQTBCLEVBQUUsQ0FBRixFQUFJLENBQUosRUFBTSxFQUFFLENBQUYsQ0FBTixDQUFuRCxDQUFuQjtBQUFWLFdBQThGLEVBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxjQUFSLEVBQXVCLENBQUMsQ0FBeEI7QUFBMkIsZ0JBQU8sQ0FBUDtBQUFTLGNBQU0sb0JBQWlCLENBQWpCLHlDQUFpQixDQUFqQixLQUFtQixLQUFLLElBQUwsQ0FBVSxZQUFVO0FBQUMsVUFBRSxHQUFGLENBQU0sSUFBTixFQUFXLENBQVg7QUFBYyxPQUFuQyxDQUFuQixHQUF3RCxFQUFFLElBQUYsRUFBTyxVQUFTLENBQVQsRUFBVztBQUFDLFlBQUksQ0FBSixDQUFNLElBQUcsS0FBRyxLQUFLLENBQUwsS0FBUyxDQUFmLEVBQWlCO0FBQUMsY0FBRyxJQUFFLEVBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxDQUFSLENBQUYsRUFBYSxLQUFLLENBQUwsS0FBUyxDQUF6QixFQUEyQixPQUFPLENBQVAsQ0FBUyxJQUFHLElBQUUsRUFBRSxDQUFGLEVBQUksQ0FBSixDQUFGLEVBQVMsS0FBSyxDQUFMLEtBQVMsQ0FBckIsRUFBdUIsT0FBTyxDQUFQO0FBQVMsU0FBdEYsTUFBMkYsS0FBSyxJQUFMLENBQVUsWUFBVTtBQUFDLFlBQUUsR0FBRixDQUFNLElBQU4sRUFBVyxDQUFYLEVBQWEsQ0FBYjtBQUFnQixTQUFyQztBQUF1QyxPQUEzSixFQUE0SixJQUE1SixFQUFpSyxDQUFqSyxFQUFtSyxVQUFVLE1BQVYsR0FBaUIsQ0FBcEwsRUFBc0wsSUFBdEwsRUFBMkwsQ0FBQyxDQUE1TCxDQUE5RDtBQUE2UCxLQUExaEIsRUFBMmhCLFlBQVcsb0JBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxLQUFLLElBQUwsQ0FBVSxZQUFVO0FBQUMsVUFBRSxNQUFGLENBQVMsSUFBVCxFQUFjLENBQWQ7QUFBaUIsT0FBdEMsQ0FBUDtBQUErQyxLQUFqbUIsRUFBWixDQUEvTyxFQUErMUIsRUFBRSxNQUFGLENBQVMsRUFBQyxPQUFNLGVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWU7QUFBQyxVQUFJLENBQUosQ0FBTSxJQUFHLENBQUgsRUFBSyxPQUFPLElBQUUsQ0FBQyxLQUFHLElBQUosSUFBVSxPQUFaLEVBQW9CLElBQUUsRUFBRSxHQUFGLENBQU0sQ0FBTixFQUFRLENBQVIsQ0FBdEIsRUFBaUMsTUFBSSxDQUFDLENBQUQsSUFBSSxNQUFNLE9BQU4sQ0FBYyxDQUFkLENBQUosR0FBcUIsSUFBRSxFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLEVBQUUsU0FBRixDQUFZLENBQVosQ0FBYixDQUF2QixHQUFvRCxFQUFFLElBQUYsQ0FBTyxDQUFQLENBQXhELENBQWpDLEVBQW9HLEtBQUcsRUFBOUc7QUFBaUgsS0FBbkosRUFBb0osU0FBUSxpQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsVUFBRSxLQUFHLElBQUwsQ0FBVSxJQUFJLElBQUUsRUFBRSxLQUFGLENBQVEsQ0FBUixFQUFVLENBQVYsQ0FBTjtBQUFBLFVBQW1CLElBQUUsRUFBRSxNQUF2QjtBQUFBLFVBQThCLElBQUUsRUFBRSxLQUFGLEVBQWhDO0FBQUEsVUFBMEMsSUFBRSxFQUFFLFdBQUYsQ0FBYyxDQUFkLEVBQWdCLENBQWhCLENBQTVDO0FBQUEsVUFBK0QsSUFBRSxTQUFGLENBQUUsR0FBVTtBQUFDLFVBQUUsT0FBRixDQUFVLENBQVYsRUFBWSxDQUFaO0FBQWUsT0FBM0YsQ0FBNEYsaUJBQWUsQ0FBZixLQUFtQixJQUFFLEVBQUUsS0FBRixFQUFGLEVBQVksR0FBL0IsR0FBb0MsTUFBSSxTQUFPLENBQVAsSUFBVSxFQUFFLE9BQUYsQ0FBVSxZQUFWLENBQVYsRUFBa0MsT0FBTyxFQUFFLElBQTNDLEVBQWdELEVBQUUsSUFBRixDQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxDQUFwRCxDQUFwQyxFQUF1RyxDQUFDLENBQUQsSUFBSSxDQUFKLElBQU8sRUFBRSxLQUFGLENBQVEsSUFBUixFQUE5RztBQUE2SCxLQUE3WSxFQUE4WSxhQUFZLHFCQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxVQUFJLElBQUUsSUFBRSxZQUFSLENBQXFCLE9BQU8sRUFBRSxHQUFGLENBQU0sQ0FBTixFQUFRLENBQVIsS0FBWSxFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLEVBQUMsT0FBTSxFQUFFLFNBQUYsQ0FBWSxhQUFaLEVBQTJCLEdBQTNCLENBQStCLFlBQVU7QUFBQyxZQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsQ0FBQyxJQUFFLE9BQUgsRUFBVyxDQUFYLENBQVg7QUFBMEIsU0FBcEUsQ0FBUCxFQUFiLENBQW5CO0FBQStHLEtBQTVpQixFQUFULENBQS8xQixFQUF1NUMsRUFBRSxFQUFGLENBQUssTUFBTCxDQUFZLEVBQUMsT0FBTSxlQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxVQUFJLElBQUUsQ0FBTixDQUFRLE9BQU0sWUFBVSxPQUFPLENBQWpCLEtBQXFCLElBQUUsQ0FBRixFQUFJLElBQUUsSUFBTixFQUFXLEdBQWhDLEdBQXFDLFVBQVUsTUFBVixHQUFpQixDQUFqQixHQUFtQixFQUFFLEtBQUYsQ0FBUSxLQUFLLENBQUwsQ0FBUixFQUFnQixDQUFoQixDQUFuQixHQUFzQyxLQUFLLENBQUwsS0FBUyxDQUFULEdBQVcsSUFBWCxHQUFnQixLQUFLLElBQUwsQ0FBVSxZQUFVO0FBQUMsWUFBSSxJQUFFLEVBQUUsS0FBRixDQUFRLElBQVIsRUFBYSxDQUFiLEVBQWUsQ0FBZixDQUFOLENBQXdCLEVBQUUsV0FBRixDQUFjLElBQWQsRUFBbUIsQ0FBbkIsR0FBc0IsU0FBTyxDQUFQLElBQVUsaUJBQWUsRUFBRSxDQUFGLENBQXpCLElBQStCLEVBQUUsT0FBRixDQUFVLElBQVYsRUFBZSxDQUFmLENBQXJEO0FBQXVFLE9BQXBILENBQWpHO0FBQXVOLEtBQXBQLEVBQXFQLFNBQVEsaUJBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxLQUFLLElBQUwsQ0FBVSxZQUFVO0FBQUMsVUFBRSxPQUFGLENBQVUsSUFBVixFQUFlLENBQWY7QUFBa0IsT0FBdkMsQ0FBUDtBQUFnRCxLQUF6VCxFQUEwVCxZQUFXLG9CQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sS0FBSyxLQUFMLENBQVcsS0FBRyxJQUFkLEVBQW1CLEVBQW5CLENBQVA7QUFBOEIsS0FBL1csRUFBZ1gsU0FBUSxpQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsVUFBSSxDQUFKO0FBQUEsVUFBTSxJQUFFLENBQVI7QUFBQSxVQUFVLElBQUUsRUFBRSxRQUFGLEVBQVo7QUFBQSxVQUF5QixJQUFFLElBQTNCO0FBQUEsVUFBZ0MsSUFBRSxLQUFLLE1BQXZDO0FBQUEsVUFBOEMsSUFBRSxTQUFGLENBQUUsR0FBVTtBQUFDLFVBQUUsQ0FBRixJQUFLLEVBQUUsV0FBRixDQUFjLENBQWQsRUFBZ0IsQ0FBQyxDQUFELENBQWhCLENBQUw7QUFBMEIsT0FBckYsQ0FBc0YsWUFBVSxPQUFPLENBQWpCLEtBQXFCLElBQUUsQ0FBRixFQUFJLElBQUUsS0FBSyxDQUFoQyxHQUFtQyxJQUFFLEtBQUcsSUFBeEMsQ0FBNkMsT0FBTSxHQUFOO0FBQVUsWUFBRSxFQUFFLEdBQUYsQ0FBTSxFQUFFLENBQUYsQ0FBTixFQUFXLElBQUUsWUFBYixDQUFGLEVBQTZCLEtBQUcsRUFBRSxLQUFMLEtBQWEsS0FBSSxFQUFFLEtBQUYsQ0FBUSxHQUFSLENBQVksQ0FBWixDQUFqQixDQUE3QjtBQUFWLE9BQXdFLE9BQU8sS0FBSSxFQUFFLE9BQUYsQ0FBVSxDQUFWLENBQVg7QUFBd0IsS0FBem1CLEVBQVosQ0FBdjVDLENBQStnRSxJQUFJLEtBQUcsc0NBQXNDLE1BQTdDO0FBQUEsTUFBb0QsS0FBRyxJQUFJLE1BQUosQ0FBVyxtQkFBaUIsRUFBakIsR0FBb0IsYUFBL0IsRUFBNkMsR0FBN0MsQ0FBdkQ7QUFBQSxNQUF5RyxLQUFHLENBQUMsS0FBRCxFQUFPLE9BQVAsRUFBZSxRQUFmLEVBQXdCLE1BQXhCLENBQTVHO0FBQUEsTUFBNEksS0FBRyxTQUFILEVBQUcsQ0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsV0FBTyxJQUFFLEtBQUcsQ0FBTCxFQUFPLFdBQVMsRUFBRSxLQUFGLENBQVEsT0FBakIsSUFBMEIsT0FBSyxFQUFFLEtBQUYsQ0FBUSxPQUFiLElBQXNCLEVBQUUsUUFBRixDQUFXLEVBQUUsYUFBYixFQUEyQixDQUEzQixDQUF0QixJQUFxRCxXQUFTLEVBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxTQUFSLENBQXRHO0FBQXlILEdBQXRSO0FBQUEsTUFBdVIsS0FBRyxTQUFILEVBQUcsQ0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCO0FBQUMsUUFBSSxDQUFKO0FBQUEsUUFBTSxDQUFOO0FBQUEsUUFBUSxJQUFFLEVBQVYsQ0FBYSxLQUFJLENBQUosSUFBUyxDQUFUO0FBQVcsUUFBRSxDQUFGLElBQUssRUFBRSxLQUFGLENBQVEsQ0FBUixDQUFMLEVBQWdCLEVBQUUsS0FBRixDQUFRLENBQVIsSUFBVyxFQUFFLENBQUYsQ0FBM0I7QUFBWCxLQUEyQyxJQUFFLEVBQUUsS0FBRixDQUFRLENBQVIsRUFBVSxLQUFHLEVBQWIsQ0FBRixDQUFtQixLQUFJLENBQUosSUFBUyxDQUFUO0FBQVcsUUFBRSxLQUFGLENBQVEsQ0FBUixJQUFXLEVBQUUsQ0FBRixDQUFYO0FBQVgsS0FBMkIsT0FBTyxDQUFQO0FBQVMsR0FBM1osQ0FBNFosU0FBUyxFQUFULENBQVksQ0FBWixFQUFjLENBQWQsRUFBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEIsRUFBb0I7QUFBQyxRQUFJLENBQUo7QUFBQSxRQUFNLElBQUUsQ0FBUjtBQUFBLFFBQVUsSUFBRSxFQUFaO0FBQUEsUUFBZSxJQUFFLElBQUUsWUFBVTtBQUFDLGFBQU8sRUFBRSxHQUFGLEVBQVA7QUFBZSxLQUE1QixHQUE2QixZQUFVO0FBQUMsYUFBTyxFQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVEsQ0FBUixFQUFVLEVBQVYsQ0FBUDtBQUFxQixLQUE5RTtBQUFBLFFBQStFLElBQUUsR0FBakY7QUFBQSxRQUFxRixJQUFFLEtBQUcsRUFBRSxDQUFGLENBQUgsS0FBVSxFQUFFLFNBQUYsQ0FBWSxDQUFaLElBQWUsRUFBZixHQUFrQixJQUE1QixDQUF2RjtBQUFBLFFBQXlILElBQUUsQ0FBQyxFQUFFLFNBQUYsQ0FBWSxDQUFaLEtBQWdCLFNBQU8sQ0FBUCxJQUFVLENBQUMsQ0FBNUIsS0FBZ0MsR0FBRyxJQUFILENBQVEsRUFBRSxHQUFGLENBQU0sQ0FBTixFQUFRLENBQVIsQ0FBUixDQUEzSixDQUErSyxJQUFHLEtBQUcsRUFBRSxDQUFGLE1BQU8sQ0FBYixFQUFlO0FBQUMsVUFBRSxLQUFHLEVBQUUsQ0FBRixDQUFMLEVBQVUsSUFBRSxLQUFHLEVBQWYsRUFBa0IsSUFBRSxDQUFDLENBQUQsSUFBSSxDQUF4QixDQUEwQjtBQUFHLFlBQUUsS0FBRyxJQUFMLEVBQVUsS0FBRyxDQUFiLEVBQWUsRUFBRSxLQUFGLENBQVEsQ0FBUixFQUFVLENBQVYsRUFBWSxJQUFFLENBQWQsQ0FBZjtBQUFILGVBQXlDLE9BQUssSUFBRSxNQUFJLENBQVgsS0FBZSxNQUFJLENBQW5CLElBQXNCLEVBQUUsQ0FBakU7QUFBb0UsWUFBTyxNQUFJLElBQUUsQ0FBQyxDQUFELElBQUksQ0FBQyxDQUFMLElBQVEsQ0FBVixFQUFZLElBQUUsRUFBRSxDQUFGLElBQUssSUFBRSxDQUFDLEVBQUUsQ0FBRixJQUFLLENBQU4sSUFBUyxFQUFFLENBQUYsQ0FBaEIsR0FBcUIsQ0FBQyxFQUFFLENBQUYsQ0FBcEMsRUFBeUMsTUFBSSxFQUFFLElBQUYsR0FBTyxDQUFQLEVBQVMsRUFBRSxLQUFGLEdBQVEsQ0FBakIsRUFBbUIsRUFBRSxHQUFGLEdBQU0sQ0FBN0IsQ0FBN0MsR0FBOEUsQ0FBckY7QUFBdUYsT0FBSSxLQUFHLEVBQVAsQ0FBVSxTQUFTLEVBQVQsQ0FBWSxDQUFaLEVBQWM7QUFBQyxRQUFJLENBQUo7QUFBQSxRQUFNLElBQUUsRUFBRSxhQUFWO0FBQUEsUUFBd0IsSUFBRSxFQUFFLFFBQTVCO0FBQUEsUUFBcUMsSUFBRSxHQUFHLENBQUgsQ0FBdkMsQ0FBNkMsT0FBTyxJQUFFLENBQUYsSUFBSyxJQUFFLEVBQUUsSUFBRixDQUFPLFdBQVAsQ0FBbUIsRUFBRSxhQUFGLENBQWdCLENBQWhCLENBQW5CLENBQUYsRUFBeUMsSUFBRSxFQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVEsU0FBUixDQUEzQyxFQUE4RCxFQUFFLFVBQUYsQ0FBYSxXQUFiLENBQXlCLENBQXpCLENBQTlELEVBQTBGLFdBQVMsQ0FBVCxLQUFhLElBQUUsT0FBZixDQUExRixFQUFrSCxHQUFHLENBQUgsSUFBTSxDQUF4SCxFQUEwSCxDQUEvSCxDQUFQO0FBQXlJLFlBQVMsRUFBVCxDQUFZLENBQVosRUFBYyxDQUFkLEVBQWdCO0FBQUMsU0FBSSxJQUFJLENBQUosRUFBTSxDQUFOLEVBQVEsSUFBRSxFQUFWLEVBQWEsSUFBRSxDQUFmLEVBQWlCLElBQUUsRUFBRSxNQUF6QixFQUFnQyxJQUFFLENBQWxDLEVBQW9DLEdBQXBDO0FBQXdDLFVBQUUsRUFBRSxDQUFGLENBQUYsRUFBTyxFQUFFLEtBQUYsS0FBVSxJQUFFLEVBQUUsS0FBRixDQUFRLE9BQVYsRUFBa0IsS0FBRyxXQUFTLENBQVQsS0FBYSxFQUFFLENBQUYsSUFBSyxFQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVEsU0FBUixLQUFvQixJQUF6QixFQUE4QixFQUFFLENBQUYsTUFBTyxFQUFFLEtBQUYsQ0FBUSxPQUFSLEdBQWdCLEVBQXZCLENBQTNDLEdBQXVFLE9BQUssRUFBRSxLQUFGLENBQVEsT0FBYixJQUFzQixHQUFHLENBQUgsQ0FBdEIsS0FBOEIsRUFBRSxDQUFGLElBQUssR0FBRyxDQUFILENBQW5DLENBQTFFLElBQXFILFdBQVMsQ0FBVCxLQUFhLEVBQUUsQ0FBRixJQUFLLE1BQUwsRUFBWSxFQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVEsU0FBUixFQUFrQixDQUFsQixDQUF6QixDQUFqSixDQUFQO0FBQXhDLEtBQWdQLEtBQUksSUFBRSxDQUFOLEVBQVEsSUFBRSxDQUFWLEVBQVksR0FBWjtBQUFnQixjQUFNLEVBQUUsQ0FBRixDQUFOLEtBQWEsRUFBRSxDQUFGLEVBQUssS0FBTCxDQUFXLE9BQVgsR0FBbUIsRUFBRSxDQUFGLENBQWhDO0FBQWhCLEtBQXNELE9BQU8sQ0FBUDtBQUFTLEtBQUUsRUFBRixDQUFLLE1BQUwsQ0FBWSxFQUFDLE1BQUssZ0JBQVU7QUFBQyxhQUFPLEdBQUcsSUFBSCxFQUFRLENBQUMsQ0FBVCxDQUFQO0FBQW1CLEtBQXBDLEVBQXFDLE1BQUssZ0JBQVU7QUFBQyxhQUFPLEdBQUcsSUFBSCxDQUFQO0FBQWdCLEtBQXJFLEVBQXNFLFFBQU8sZ0JBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTSxhQUFXLE9BQU8sQ0FBbEIsR0FBb0IsSUFBRSxLQUFLLElBQUwsRUFBRixHQUFjLEtBQUssSUFBTCxFQUFsQyxHQUE4QyxLQUFLLElBQUwsQ0FBVSxZQUFVO0FBQUMsV0FBRyxJQUFILElBQVMsRUFBRSxJQUFGLEVBQVEsSUFBUixFQUFULEdBQXdCLEVBQUUsSUFBRixFQUFRLElBQVIsRUFBeEI7QUFBdUMsT0FBNUQsQ0FBcEQ7QUFBa0gsS0FBM00sRUFBWixFQUEwTixJQUFJLEtBQUcsdUJBQVA7QUFBQSxNQUErQixLQUFHLGdDQUFsQztBQUFBLE1BQW1FLEtBQUcsMkJBQXRFO0FBQUEsTUFBa0csS0FBRyxFQUFDLFFBQU8sQ0FBQyxDQUFELEVBQUcsOEJBQUgsRUFBa0MsV0FBbEMsQ0FBUixFQUF1RCxPQUFNLENBQUMsQ0FBRCxFQUFHLFNBQUgsRUFBYSxVQUFiLENBQTdELEVBQXNGLEtBQUksQ0FBQyxDQUFELEVBQUcsbUJBQUgsRUFBdUIscUJBQXZCLENBQTFGLEVBQXdJLElBQUcsQ0FBQyxDQUFELEVBQUcsZ0JBQUgsRUFBb0Isa0JBQXBCLENBQTNJLEVBQW1MLElBQUcsQ0FBQyxDQUFELEVBQUcsb0JBQUgsRUFBd0IsdUJBQXhCLENBQXRMLEVBQXVPLFVBQVMsQ0FBQyxDQUFELEVBQUcsRUFBSCxFQUFNLEVBQU4sQ0FBaFAsRUFBckcsQ0FBZ1csR0FBRyxRQUFILEdBQVksR0FBRyxNQUFmLEVBQXNCLEdBQUcsS0FBSCxHQUFTLEdBQUcsS0FBSCxHQUFTLEdBQUcsUUFBSCxHQUFZLEdBQUcsT0FBSCxHQUFXLEdBQUcsS0FBbEUsRUFBd0UsR0FBRyxFQUFILEdBQU0sR0FBRyxFQUFqRixDQUFvRixTQUFTLEVBQVQsQ0FBWSxDQUFaLEVBQWMsQ0FBZCxFQUFnQjtBQUFDLFFBQUksQ0FBSixDQUFNLE9BQU8sSUFBRSxlQUFhLE9BQU8sRUFBRSxvQkFBdEIsR0FBMkMsRUFBRSxvQkFBRixDQUF1QixLQUFHLEdBQTFCLENBQTNDLEdBQTBFLGVBQWEsT0FBTyxFQUFFLGdCQUF0QixHQUF1QyxFQUFFLGdCQUFGLENBQW1CLEtBQUcsR0FBdEIsQ0FBdkMsR0FBa0UsRUFBOUksRUFBaUosS0FBSyxDQUFMLEtBQVMsQ0FBVCxJQUFZLEtBQUcsRUFBRSxDQUFGLEVBQUksQ0FBSixDQUFmLEdBQXNCLEVBQUUsS0FBRixDQUFRLENBQUMsQ0FBRCxDQUFSLEVBQVksQ0FBWixDQUF0QixHQUFxQyxDQUE3TDtBQUErTCxZQUFTLEVBQVQsQ0FBWSxDQUFaLEVBQWMsQ0FBZCxFQUFnQjtBQUFDLFNBQUksSUFBSSxJQUFFLENBQU4sRUFBUSxJQUFFLEVBQUUsTUFBaEIsRUFBdUIsSUFBRSxDQUF6QixFQUEyQixHQUEzQjtBQUErQixRQUFFLEdBQUYsQ0FBTSxFQUFFLENBQUYsQ0FBTixFQUFXLFlBQVgsRUFBd0IsQ0FBQyxDQUFELElBQUksRUFBRSxHQUFGLENBQU0sRUFBRSxDQUFGLENBQU4sRUFBVyxZQUFYLENBQTVCO0FBQS9CO0FBQXFGLE9BQUksS0FBRyxXQUFQLENBQW1CLFNBQVMsRUFBVCxDQUFZLENBQVosRUFBYyxDQUFkLEVBQWdCLENBQWhCLEVBQWtCLENBQWxCLEVBQW9CLENBQXBCLEVBQXNCO0FBQUMsU0FBSSxJQUFJLENBQUosRUFBTSxDQUFOLEVBQVEsQ0FBUixFQUFVLENBQVYsRUFBWSxDQUFaLEVBQWMsQ0FBZCxFQUFnQixJQUFFLEVBQUUsc0JBQUYsRUFBbEIsRUFBNkMsSUFBRSxFQUEvQyxFQUFrRCxJQUFFLENBQXBELEVBQXNELElBQUUsRUFBRSxNQUE5RCxFQUFxRSxJQUFFLENBQXZFLEVBQXlFLEdBQXpFO0FBQTZFLFVBQUcsSUFBRSxFQUFFLENBQUYsQ0FBRixFQUFPLEtBQUcsTUFBSSxDQUFqQixFQUFtQixJQUFHLGFBQVcsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUFkLEVBQXdCLEVBQUUsS0FBRixDQUFRLENBQVIsRUFBVSxFQUFFLFFBQUYsR0FBVyxDQUFDLENBQUQsQ0FBWCxHQUFlLENBQXpCLEVBQXhCLEtBQXlELElBQUcsR0FBRyxJQUFILENBQVEsQ0FBUixDQUFILEVBQWM7QUFBQyxZQUFFLEtBQUcsRUFBRSxXQUFGLENBQWMsRUFBRSxhQUFGLENBQWdCLEtBQWhCLENBQWQsQ0FBTCxFQUEyQyxJQUFFLENBQUMsR0FBRyxJQUFILENBQVEsQ0FBUixLQUFZLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBYixFQUFzQixDQUF0QixFQUF5QixXQUF6QixFQUE3QyxFQUFvRixJQUFFLEdBQUcsQ0FBSCxLQUFPLEdBQUcsUUFBaEcsRUFBeUcsRUFBRSxTQUFGLEdBQVksRUFBRSxDQUFGLElBQUssRUFBRSxhQUFGLENBQWdCLENBQWhCLENBQUwsR0FBd0IsRUFBRSxDQUFGLENBQTdJLEVBQWtKLElBQUUsRUFBRSxDQUFGLENBQXBKLENBQXlKLE9BQU0sR0FBTjtBQUFVLGNBQUUsRUFBRSxTQUFKO0FBQVYsU0FBd0IsRUFBRSxLQUFGLENBQVEsQ0FBUixFQUFVLEVBQUUsVUFBWixHQUF3QixJQUFFLEVBQUUsVUFBNUIsRUFBdUMsRUFBRSxXQUFGLEdBQWMsRUFBckQ7QUFBd0QsT0FBeFAsTUFBNlAsRUFBRSxJQUFGLENBQU8sRUFBRSxjQUFGLENBQWlCLENBQWpCLENBQVA7QUFBdFosS0FBa2IsRUFBRSxXQUFGLEdBQWMsRUFBZCxFQUFpQixJQUFFLENBQW5CLENBQXFCLE9BQU0sSUFBRSxFQUFFLEdBQUYsQ0FBUjtBQUFlLFVBQUcsS0FBRyxFQUFFLE9BQUYsQ0FBVSxDQUFWLEVBQVksQ0FBWixJQUFlLENBQUMsQ0FBdEIsRUFBd0IsS0FBRyxFQUFFLElBQUYsQ0FBTyxDQUFQLENBQUgsQ0FBeEIsS0FBMEMsSUFBRyxJQUFFLEVBQUUsUUFBRixDQUFXLEVBQUUsYUFBYixFQUEyQixDQUEzQixDQUFGLEVBQWdDLElBQUUsR0FBRyxFQUFFLFdBQUYsQ0FBYyxDQUFkLENBQUgsRUFBb0IsUUFBcEIsQ0FBbEMsRUFBZ0UsS0FBRyxHQUFHLENBQUgsQ0FBbkUsRUFBeUUsQ0FBNUUsRUFBOEU7QUFBQyxZQUFFLENBQUYsQ0FBSSxPQUFNLElBQUUsRUFBRSxHQUFGLENBQVI7QUFBZSxhQUFHLElBQUgsQ0FBUSxFQUFFLElBQUYsSUFBUSxFQUFoQixLQUFxQixFQUFFLElBQUYsQ0FBTyxDQUFQLENBQXJCO0FBQWY7QUFBOEM7QUFBMUwsS0FBMEwsT0FBTyxDQUFQO0FBQVMsSUFBQyxZQUFVO0FBQUMsUUFBSSxJQUFFLEVBQUUsc0JBQUYsRUFBTjtBQUFBLFFBQWlDLElBQUUsRUFBRSxXQUFGLENBQWMsRUFBRSxhQUFGLENBQWdCLEtBQWhCLENBQWQsQ0FBbkM7QUFBQSxRQUF5RSxJQUFFLEVBQUUsYUFBRixDQUFnQixPQUFoQixDQUEzRSxDQUFvRyxFQUFFLFlBQUYsQ0FBZSxNQUFmLEVBQXNCLE9BQXRCLEdBQStCLEVBQUUsWUFBRixDQUFlLFNBQWYsRUFBeUIsU0FBekIsQ0FBL0IsRUFBbUUsRUFBRSxZQUFGLENBQWUsTUFBZixFQUFzQixHQUF0QixDQUFuRSxFQUE4RixFQUFFLFdBQUYsQ0FBYyxDQUFkLENBQTlGLEVBQStHLEVBQUUsVUFBRixHQUFhLEVBQUUsU0FBRixDQUFZLENBQUMsQ0FBYixFQUFnQixTQUFoQixDQUEwQixDQUFDLENBQTNCLEVBQThCLFNBQTlCLENBQXdDLE9BQXBLLEVBQTRLLEVBQUUsU0FBRixHQUFZLHdCQUF4TCxFQUFpTixFQUFFLGNBQUYsR0FBaUIsQ0FBQyxDQUFDLEVBQUUsU0FBRixDQUFZLENBQUMsQ0FBYixFQUFnQixTQUFoQixDQUEwQixZQUE5UDtBQUEyUSxHQUExWCxFQUFELENBQThYLElBQUksS0FBRyxFQUFFLGVBQVQ7QUFBQSxNQUF5QixLQUFHLE1BQTVCO0FBQUEsTUFBbUMsS0FBRyxnREFBdEM7QUFBQSxNQUF1RixLQUFHLHFCQUExRixDQUFnSCxTQUFTLEVBQVQsR0FBYTtBQUFDLFdBQU0sQ0FBQyxDQUFQO0FBQVMsWUFBUyxFQUFULEdBQWE7QUFBQyxXQUFNLENBQUMsQ0FBUDtBQUFTLFlBQVMsRUFBVCxHQUFhO0FBQUMsUUFBRztBQUFDLGFBQU8sRUFBRSxhQUFUO0FBQXVCLEtBQTNCLENBQTJCLE9BQU0sQ0FBTixFQUFRLENBQUU7QUFBQyxZQUFTLEVBQVQsQ0FBWSxDQUFaLEVBQWMsQ0FBZCxFQUFnQixDQUFoQixFQUFrQixDQUFsQixFQUFvQixDQUFwQixFQUFzQixDQUF0QixFQUF3QjtBQUFDLFFBQUksQ0FBSixFQUFNLENBQU4sQ0FBUSxJQUFHLG9CQUFpQixDQUFqQix5Q0FBaUIsQ0FBakIsRUFBSCxFQUFzQjtBQUFDLGtCQUFVLE9BQU8sQ0FBakIsS0FBcUIsSUFBRSxLQUFHLENBQUwsRUFBTyxJQUFFLEtBQUssQ0FBbkMsRUFBc0MsS0FBSSxDQUFKLElBQVMsQ0FBVDtBQUFXLFdBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLEVBQUUsQ0FBRixDQUFYLEVBQWdCLENBQWhCO0FBQVgsT0FBOEIsT0FBTyxDQUFQO0FBQVMsU0FBRyxRQUFNLENBQU4sSUFBUyxRQUFNLENBQWYsSUFBa0IsSUFBRSxDQUFGLEVBQUksSUFBRSxJQUFFLEtBQUssQ0FBL0IsSUFBa0MsUUFBTSxDQUFOLEtBQVUsWUFBVSxPQUFPLENBQWpCLElBQW9CLElBQUUsQ0FBRixFQUFJLElBQUUsS0FBSyxDQUEvQixLQUFtQyxJQUFFLENBQUYsRUFBSSxJQUFFLENBQU4sRUFBUSxJQUFFLEtBQUssQ0FBbEQsQ0FBVixDQUFsQyxFQUFrRyxNQUFJLENBQUMsQ0FBMUcsRUFBNEcsSUFBRSxFQUFGLENBQTVHLEtBQXNILElBQUcsQ0FBQyxDQUFKLEVBQU0sT0FBTyxDQUFQLENBQVMsT0FBTyxNQUFJLENBQUosS0FBUSxJQUFFLENBQUYsRUFBSSxJQUFFLFdBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxJQUFJLEdBQUosQ0FBUSxDQUFSLEdBQVcsRUFBRSxLQUFGLENBQVEsSUFBUixFQUFhLFNBQWIsQ0FBbEI7QUFBMEMsS0FBNUQsRUFBNkQsRUFBRSxJQUFGLEdBQU8sRUFBRSxJQUFGLEtBQVMsRUFBRSxJQUFGLEdBQU8sRUFBRSxJQUFGLEVBQWhCLENBQTVFLEdBQXVHLEVBQUUsSUFBRixDQUFPLFlBQVU7QUFBQyxRQUFFLEtBQUYsQ0FBUSxHQUFSLENBQVksSUFBWixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QjtBQUEwQixLQUE1QyxDQUE5RztBQUE0SixLQUFFLEtBQUYsR0FBUSxFQUFDLFFBQU8sRUFBUixFQUFXLEtBQUksYUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CO0FBQUMsVUFBSSxDQUFKO0FBQUEsVUFBTSxDQUFOO0FBQUEsVUFBUSxDQUFSO0FBQUEsVUFBVSxDQUFWO0FBQUEsVUFBWSxDQUFaO0FBQUEsVUFBYyxDQUFkO0FBQUEsVUFBZ0IsQ0FBaEI7QUFBQSxVQUFrQixDQUFsQjtBQUFBLFVBQW9CLENBQXBCO0FBQUEsVUFBc0IsQ0FBdEI7QUFBQSxVQUF3QixDQUF4QjtBQUFBLFVBQTBCLElBQUUsRUFBRSxHQUFGLENBQU0sQ0FBTixDQUE1QixDQUFxQyxJQUFHLENBQUgsRUFBSztBQUFDLFVBQUUsT0FBRixLQUFZLElBQUUsQ0FBRixFQUFJLElBQUUsRUFBRSxPQUFSLEVBQWdCLElBQUUsRUFBRSxRQUFoQyxHQUEwQyxLQUFHLEVBQUUsSUFBRixDQUFPLGVBQVAsQ0FBdUIsRUFBdkIsRUFBMEIsQ0FBMUIsQ0FBN0MsRUFBMEUsRUFBRSxJQUFGLEtBQVMsRUFBRSxJQUFGLEdBQU8sRUFBRSxJQUFGLEVBQWhCLENBQTFFLEVBQW9HLENBQUMsSUFBRSxFQUFFLE1BQUwsTUFBZSxJQUFFLEVBQUUsTUFBRixHQUFTLEVBQTFCLENBQXBHLEVBQWtJLENBQUMsSUFBRSxFQUFFLE1BQUwsTUFBZSxJQUFFLEVBQUUsTUFBRixHQUFTLFVBQVMsQ0FBVCxFQUFXO0FBQUMsaUJBQU0sZUFBYSxPQUFPLENBQXBCLElBQXVCLEVBQUUsS0FBRixDQUFRLFNBQVIsS0FBb0IsRUFBRSxJQUE3QyxHQUFrRCxFQUFFLEtBQUYsQ0FBUSxRQUFSLENBQWlCLEtBQWpCLENBQXVCLENBQXZCLEVBQXlCLFNBQXpCLENBQWxELEdBQXNGLEtBQUssQ0FBakc7QUFBbUcsU0FBekksQ0FBbEksRUFBNlEsSUFBRSxDQUFDLEtBQUcsRUFBSixFQUFRLEtBQVIsQ0FBYyxDQUFkLEtBQWtCLENBQUMsRUFBRCxDQUFqUyxFQUFzUyxJQUFFLEVBQUUsTUFBMVMsQ0FBaVQsT0FBTSxHQUFOO0FBQVUsY0FBRSxHQUFHLElBQUgsQ0FBUSxFQUFFLENBQUYsQ0FBUixLQUFlLEVBQWpCLEVBQW9CLElBQUUsSUFBRSxFQUFFLENBQUYsQ0FBeEIsRUFBNkIsSUFBRSxDQUFDLEVBQUUsQ0FBRixLQUFNLEVBQVAsRUFBVyxLQUFYLENBQWlCLEdBQWpCLEVBQXNCLElBQXRCLEVBQS9CLEVBQTRELE1BQUksSUFBRSxFQUFFLEtBQUYsQ0FBUSxPQUFSLENBQWdCLENBQWhCLEtBQW9CLEVBQXRCLEVBQXlCLElBQUUsQ0FBQyxJQUFFLEVBQUUsWUFBSixHQUFpQixFQUFFLFFBQXBCLEtBQStCLENBQTFELEVBQTRELElBQUUsRUFBRSxLQUFGLENBQVEsT0FBUixDQUFnQixDQUFoQixLQUFvQixFQUFsRixFQUFxRixJQUFFLEVBQUUsTUFBRixDQUFTLEVBQUMsTUFBSyxDQUFOLEVBQVEsVUFBUyxDQUFqQixFQUFtQixNQUFLLENBQXhCLEVBQTBCLFNBQVEsQ0FBbEMsRUFBb0MsTUFBSyxFQUFFLElBQTNDLEVBQWdELFVBQVMsQ0FBekQsRUFBMkQsY0FBYSxLQUFHLEVBQUUsSUFBRixDQUFPLEtBQVAsQ0FBYSxZQUFiLENBQTBCLElBQTFCLENBQStCLENBQS9CLENBQTNFLEVBQTZHLFdBQVUsRUFBRSxJQUFGLENBQU8sR0FBUCxDQUF2SCxFQUFULEVBQTZJLENBQTdJLENBQXZGLEVBQXVPLENBQUMsSUFBRSxFQUFFLENBQUYsQ0FBSCxNQUFXLElBQUUsRUFBRSxDQUFGLElBQUssRUFBUCxFQUFVLEVBQUUsYUFBRixHQUFnQixDQUExQixFQUE0QixFQUFFLEtBQUYsSUFBUyxFQUFFLEtBQUYsQ0FBUSxJQUFSLENBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsTUFBd0IsQ0FBQyxDQUFsQyxJQUFxQyxFQUFFLGdCQUFGLElBQW9CLEVBQUUsZ0JBQUYsQ0FBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsQ0FBaEcsQ0FBdk8sRUFBZ1csRUFBRSxHQUFGLEtBQVEsRUFBRSxHQUFGLENBQU0sSUFBTixDQUFXLENBQVgsRUFBYSxDQUFiLEdBQWdCLEVBQUUsT0FBRixDQUFVLElBQVYsS0FBaUIsRUFBRSxPQUFGLENBQVUsSUFBVixHQUFlLEVBQUUsSUFBbEMsQ0FBeEIsQ0FBaFcsRUFBaWEsSUFBRSxFQUFFLE1BQUYsQ0FBUyxFQUFFLGFBQUYsRUFBVCxFQUEyQixDQUEzQixFQUE2QixDQUE3QixDQUFGLEdBQWtDLEVBQUUsSUFBRixDQUFPLENBQVAsQ0FBbmMsRUFBNmMsRUFBRSxLQUFGLENBQVEsTUFBUixDQUFlLENBQWYsSUFBa0IsQ0FBQyxDQUFwZSxDQUE1RDtBQUFWO0FBQTZpQjtBQUFDLEtBQTc2QixFQUE4NkIsUUFBTyxnQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CO0FBQUMsVUFBSSxDQUFKO0FBQUEsVUFBTSxDQUFOO0FBQUEsVUFBUSxDQUFSO0FBQUEsVUFBVSxDQUFWO0FBQUEsVUFBWSxDQUFaO0FBQUEsVUFBYyxDQUFkO0FBQUEsVUFBZ0IsQ0FBaEI7QUFBQSxVQUFrQixDQUFsQjtBQUFBLFVBQW9CLENBQXBCO0FBQUEsVUFBc0IsQ0FBdEI7QUFBQSxVQUF3QixDQUF4QjtBQUFBLFVBQTBCLElBQUUsRUFBRSxPQUFGLENBQVUsQ0FBVixLQUFjLEVBQUUsR0FBRixDQUFNLENBQU4sQ0FBMUMsQ0FBbUQsSUFBRyxNQUFJLElBQUUsRUFBRSxNQUFSLENBQUgsRUFBbUI7QUFBQyxZQUFFLENBQUMsS0FBRyxFQUFKLEVBQVEsS0FBUixDQUFjLENBQWQsS0FBa0IsQ0FBQyxFQUFELENBQXBCLEVBQXlCLElBQUUsRUFBRSxNQUE3QixDQUFvQyxPQUFNLEdBQU47QUFBVSxjQUFHLElBQUUsR0FBRyxJQUFILENBQVEsRUFBRSxDQUFGLENBQVIsS0FBZSxFQUFqQixFQUFvQixJQUFFLElBQUUsRUFBRSxDQUFGLENBQXhCLEVBQTZCLElBQUUsQ0FBQyxFQUFFLENBQUYsS0FBTSxFQUFQLEVBQVcsS0FBWCxDQUFpQixHQUFqQixFQUFzQixJQUF0QixFQUEvQixFQUE0RCxDQUEvRCxFQUFpRTtBQUFDLGdCQUFFLEVBQUUsS0FBRixDQUFRLE9BQVIsQ0FBZ0IsQ0FBaEIsS0FBb0IsRUFBdEIsRUFBeUIsSUFBRSxDQUFDLElBQUUsRUFBRSxZQUFKLEdBQWlCLEVBQUUsUUFBcEIsS0FBK0IsQ0FBMUQsRUFBNEQsSUFBRSxFQUFFLENBQUYsS0FBTSxFQUFwRSxFQUF1RSxJQUFFLEVBQUUsQ0FBRixLQUFNLElBQUksTUFBSixDQUFXLFlBQVUsRUFBRSxJQUFGLENBQU8sZUFBUCxDQUFWLEdBQWtDLFNBQTdDLENBQS9FLEVBQXVJLElBQUUsSUFBRSxFQUFFLE1BQTdJLENBQW9KLE9BQU0sR0FBTjtBQUFVLGtCQUFFLEVBQUUsQ0FBRixDQUFGLEVBQU8sQ0FBQyxDQUFELElBQUksTUFBSSxFQUFFLFFBQVYsSUFBb0IsS0FBRyxFQUFFLElBQUYsS0FBUyxFQUFFLElBQWxDLElBQXdDLEtBQUcsQ0FBQyxFQUFFLElBQUYsQ0FBTyxFQUFFLFNBQVQsQ0FBNUMsSUFBaUUsS0FBRyxNQUFJLEVBQUUsUUFBVCxLQUFvQixTQUFPLENBQVAsSUFBVSxDQUFDLEVBQUUsUUFBakMsQ0FBakUsS0FBOEcsRUFBRSxNQUFGLENBQVMsQ0FBVCxFQUFXLENBQVgsR0FBYyxFQUFFLFFBQUYsSUFBWSxFQUFFLGFBQUYsRUFBMUIsRUFBNEMsRUFBRSxNQUFGLElBQVUsRUFBRSxNQUFGLENBQVMsSUFBVCxDQUFjLENBQWQsRUFBZ0IsQ0FBaEIsQ0FBcEssQ0FBUDtBQUFWLGFBQXlNLEtBQUcsQ0FBQyxFQUFFLE1BQU4sS0FBZSxFQUFFLFFBQUYsSUFBWSxFQUFFLFFBQUYsQ0FBVyxJQUFYLENBQWdCLENBQWhCLEVBQWtCLENBQWxCLEVBQW9CLEVBQUUsTUFBdEIsTUFBZ0MsQ0FBQyxDQUE3QyxJQUFnRCxFQUFFLFdBQUYsQ0FBYyxDQUFkLEVBQWdCLENBQWhCLEVBQWtCLEVBQUUsTUFBcEIsQ0FBaEQsRUFBNEUsT0FBTyxFQUFFLENBQUYsQ0FBbEc7QUFBd0csV0FBdmdCLE1BQTRnQixLQUFJLENBQUosSUFBUyxDQUFUO0FBQVcsY0FBRSxLQUFGLENBQVEsTUFBUixDQUFlLENBQWYsRUFBaUIsSUFBRSxFQUFFLENBQUYsQ0FBbkIsRUFBd0IsQ0FBeEIsRUFBMEIsQ0FBMUIsRUFBNEIsQ0FBQyxDQUE3QjtBQUFYO0FBQXRoQixTQUFpa0IsRUFBRSxhQUFGLENBQWdCLENBQWhCLEtBQW9CLEVBQUUsTUFBRixDQUFTLENBQVQsRUFBVyxlQUFYLENBQXBCO0FBQWdEO0FBQUMsS0FBdHFELEVBQXVxRCxVQUFTLGtCQUFTLENBQVQsRUFBVztBQUFDLFVBQUksSUFBRSxFQUFFLEtBQUYsQ0FBUSxHQUFSLENBQVksQ0FBWixDQUFOO0FBQUEsVUFBcUIsQ0FBckI7QUFBQSxVQUF1QixDQUF2QjtBQUFBLFVBQXlCLENBQXpCO0FBQUEsVUFBMkIsQ0FBM0I7QUFBQSxVQUE2QixDQUE3QjtBQUFBLFVBQStCLENBQS9CO0FBQUEsVUFBaUMsSUFBRSxJQUFJLEtBQUosQ0FBVSxVQUFVLE1BQXBCLENBQW5DO0FBQUEsVUFBK0QsSUFBRSxDQUFDLEVBQUUsR0FBRixDQUFNLElBQU4sRUFBVyxRQUFYLEtBQXNCLEVBQXZCLEVBQTJCLEVBQUUsSUFBN0IsS0FBb0MsRUFBckc7QUFBQSxVQUF3RyxJQUFFLEVBQUUsS0FBRixDQUFRLE9BQVIsQ0FBZ0IsRUFBRSxJQUFsQixLQUF5QixFQUFuSSxDQUFzSSxLQUFJLEVBQUUsQ0FBRixJQUFLLENBQUwsRUFBTyxJQUFFLENBQWIsRUFBZSxJQUFFLFVBQVUsTUFBM0IsRUFBa0MsR0FBbEM7QUFBc0MsVUFBRSxDQUFGLElBQUssVUFBVSxDQUFWLENBQUw7QUFBdEMsT0FBd0QsSUFBRyxFQUFFLGNBQUYsR0FBaUIsSUFBakIsRUFBc0IsQ0FBQyxFQUFFLFdBQUgsSUFBZ0IsRUFBRSxXQUFGLENBQWMsSUFBZCxDQUFtQixJQUFuQixFQUF3QixDQUF4QixNQUE2QixDQUFDLENBQXZFLEVBQXlFO0FBQUMsWUFBRSxFQUFFLEtBQUYsQ0FBUSxRQUFSLENBQWlCLElBQWpCLENBQXNCLElBQXRCLEVBQTJCLENBQTNCLEVBQTZCLENBQTdCLENBQUYsRUFBa0MsSUFBRSxDQUFwQyxDQUFzQyxPQUFNLENBQUMsSUFBRSxFQUFFLEdBQUYsQ0FBSCxLQUFZLENBQUMsRUFBRSxvQkFBRixFQUFuQixFQUE0QztBQUFDLFlBQUUsYUFBRixHQUFnQixFQUFFLElBQWxCLEVBQXVCLElBQUUsQ0FBekIsQ0FBMkIsT0FBTSxDQUFDLElBQUUsRUFBRSxRQUFGLENBQVcsR0FBWCxDQUFILEtBQXFCLENBQUMsRUFBRSw2QkFBRixFQUE1QjtBQUE4RCxjQUFFLFVBQUYsSUFBYyxDQUFDLEVBQUUsVUFBRixDQUFhLElBQWIsQ0FBa0IsRUFBRSxTQUFwQixDQUFmLEtBQWdELEVBQUUsU0FBRixHQUFZLENBQVosRUFBYyxFQUFFLElBQUYsR0FBTyxFQUFFLElBQXZCLEVBQTRCLElBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBRixDQUFRLE9BQVIsQ0FBZ0IsRUFBRSxRQUFsQixLQUE2QixFQUE5QixFQUFrQyxNQUFsQyxJQUEwQyxFQUFFLE9BQTdDLEVBQXNELEtBQXRELENBQTRELEVBQUUsSUFBOUQsRUFBbUUsQ0FBbkUsQ0FBOUIsRUFBb0csS0FBSyxDQUFMLEtBQVMsQ0FBVCxJQUFZLENBQUMsRUFBRSxNQUFGLEdBQVMsQ0FBVixNQUFlLENBQUMsQ0FBNUIsS0FBZ0MsRUFBRSxjQUFGLElBQW1CLEVBQUUsZUFBRixFQUFuRCxDQUFwSjtBQUE5RDtBQUEyUixnQkFBTyxFQUFFLFlBQUYsSUFBZ0IsRUFBRSxZQUFGLENBQWUsSUFBZixDQUFvQixJQUFwQixFQUF5QixDQUF6QixDQUFoQixFQUE0QyxFQUFFLE1BQXJEO0FBQTREO0FBQUMsS0FBMTRFLEVBQTI0RSxVQUFTLGtCQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxVQUFJLENBQUo7QUFBQSxVQUFNLENBQU47QUFBQSxVQUFRLENBQVI7QUFBQSxVQUFVLENBQVY7QUFBQSxVQUFZLENBQVo7QUFBQSxVQUFjLElBQUUsRUFBaEI7QUFBQSxVQUFtQixJQUFFLEVBQUUsYUFBdkI7QUFBQSxVQUFxQyxJQUFFLEVBQUUsTUFBekMsQ0FBZ0QsSUFBRyxLQUFHLEVBQUUsUUFBTCxJQUFlLEVBQUUsWUFBVSxFQUFFLElBQVosSUFBa0IsRUFBRSxNQUFGLElBQVUsQ0FBOUIsQ0FBbEIsRUFBbUQsT0FBSyxNQUFJLElBQVQsRUFBYyxJQUFFLEVBQUUsVUFBRixJQUFjLElBQTlCO0FBQW1DLFlBQUcsTUFBSSxFQUFFLFFBQU4sS0FBaUIsWUFBVSxFQUFFLElBQVosSUFBa0IsRUFBRSxRQUFGLEtBQWEsQ0FBQyxDQUFqRCxDQUFILEVBQXVEO0FBQUMsZUFBSSxJQUFFLEVBQUYsRUFBSyxJQUFFLEVBQVAsRUFBVSxJQUFFLENBQWhCLEVBQWtCLElBQUUsQ0FBcEIsRUFBc0IsR0FBdEI7QUFBMEIsZ0JBQUUsRUFBRSxDQUFGLENBQUYsRUFBTyxJQUFFLEVBQUUsUUFBRixHQUFXLEdBQXBCLEVBQXdCLEtBQUssQ0FBTCxLQUFTLEVBQUUsQ0FBRixDQUFULEtBQWdCLEVBQUUsQ0FBRixJQUFLLEVBQUUsWUFBRixHQUFlLEVBQUUsQ0FBRixFQUFJLElBQUosRUFBVSxLQUFWLENBQWdCLENBQWhCLElBQW1CLENBQUMsQ0FBbkMsR0FBcUMsRUFBRSxJQUFGLENBQU8sQ0FBUCxFQUFTLElBQVQsRUFBYyxJQUFkLEVBQW1CLENBQUMsQ0FBRCxDQUFuQixFQUF3QixNQUFsRixDQUF4QixFQUFrSCxFQUFFLENBQUYsS0FBTSxFQUFFLElBQUYsQ0FBTyxDQUFQLENBQXhIO0FBQTFCLFdBQTRKLEVBQUUsTUFBRixJQUFVLEVBQUUsSUFBRixDQUFPLEVBQUMsTUFBSyxDQUFOLEVBQVEsVUFBUyxDQUFqQixFQUFQLENBQVY7QUFBc0M7QUFBN1IsT0FBNlIsT0FBTyxJQUFFLElBQUYsRUFBTyxJQUFFLEVBQUUsTUFBSixJQUFZLEVBQUUsSUFBRixDQUFPLEVBQUMsTUFBSyxDQUFOLEVBQVEsVUFBUyxFQUFFLEtBQUYsQ0FBUSxDQUFSLENBQWpCLEVBQVAsQ0FBbkIsRUFBd0QsQ0FBL0Q7QUFBaUUsS0FBbjJGLEVBQW8yRixTQUFRLGlCQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxhQUFPLGNBQVAsQ0FBc0IsRUFBRSxLQUFGLENBQVEsU0FBOUIsRUFBd0MsQ0FBeEMsRUFBMEMsRUFBQyxZQUFXLENBQUMsQ0FBYixFQUFlLGNBQWEsQ0FBQyxDQUE3QixFQUErQixLQUFJLEVBQUUsVUFBRixDQUFhLENBQWIsSUFBZ0IsWUFBVTtBQUFDLGNBQUcsS0FBSyxhQUFSLEVBQXNCLE9BQU8sRUFBRSxLQUFLLGFBQVAsQ0FBUDtBQUE2QixTQUE5RSxHQUErRSxZQUFVO0FBQUMsY0FBRyxLQUFLLGFBQVIsRUFBc0IsT0FBTyxLQUFLLGFBQUwsQ0FBbUIsQ0FBbkIsQ0FBUDtBQUE2QixTQUFoTCxFQUFpTCxLQUFJLGFBQVMsQ0FBVCxFQUFXO0FBQUMsaUJBQU8sY0FBUCxDQUFzQixJQUF0QixFQUEyQixDQUEzQixFQUE2QixFQUFDLFlBQVcsQ0FBQyxDQUFiLEVBQWUsY0FBYSxDQUFDLENBQTdCLEVBQStCLFVBQVMsQ0FBQyxDQUF6QyxFQUEyQyxPQUFNLENBQWpELEVBQTdCO0FBQWtGLFNBQW5SLEVBQTFDO0FBQWdVLEtBQTFyRyxFQUEyckcsS0FBSSxhQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sRUFBRSxFQUFFLE9BQUosSUFBYSxDQUFiLEdBQWUsSUFBSSxFQUFFLEtBQU4sQ0FBWSxDQUFaLENBQXRCO0FBQXFDLEtBQWh2RyxFQUFpdkcsU0FBUSxFQUFDLE1BQUssRUFBQyxVQUFTLENBQUMsQ0FBWCxFQUFOLEVBQW9CLE9BQU0sRUFBQyxTQUFRLG1CQUFVO0FBQUMsY0FBRyxTQUFPLElBQVAsSUFBYSxLQUFLLEtBQXJCLEVBQTJCLE9BQU8sS0FBSyxLQUFMLElBQWEsQ0FBQyxDQUFyQjtBQUF1QixTQUF0RSxFQUF1RSxjQUFhLFNBQXBGLEVBQTFCLEVBQXlILE1BQUssRUFBQyxTQUFRLG1CQUFVO0FBQUMsY0FBRyxTQUFPLElBQVAsSUFBYSxLQUFLLElBQXJCLEVBQTBCLE9BQU8sS0FBSyxJQUFMLElBQVksQ0FBQyxDQUFwQjtBQUFzQixTQUFwRSxFQUFxRSxjQUFhLFVBQWxGLEVBQTlILEVBQTROLE9BQU0sRUFBQyxTQUFRLG1CQUFVO0FBQUMsY0FBRyxlQUFhLEtBQUssSUFBbEIsSUFBd0IsS0FBSyxLQUE3QixJQUFvQyxFQUFFLElBQUYsRUFBTyxPQUFQLENBQXZDLEVBQXVELE9BQU8sS0FBSyxLQUFMLElBQWEsQ0FBQyxDQUFyQjtBQUF1QixTQUFsRyxFQUFtRyxVQUFTLGtCQUFTLENBQVQsRUFBVztBQUFDLGlCQUFPLEVBQUUsRUFBRSxNQUFKLEVBQVcsR0FBWCxDQUFQO0FBQXVCLFNBQS9JLEVBQWxPLEVBQW1YLGNBQWEsRUFBQyxjQUFhLHNCQUFTLENBQVQsRUFBVztBQUFDLGVBQUssQ0FBTCxLQUFTLEVBQUUsTUFBWCxJQUFtQixFQUFFLGFBQXJCLEtBQXFDLEVBQUUsYUFBRixDQUFnQixXQUFoQixHQUE0QixFQUFFLE1BQW5FO0FBQTJFLFNBQXJHLEVBQWhZLEVBQXp2RyxFQUFSLEVBQTB1SCxFQUFFLFdBQUYsR0FBYyxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsTUFBRSxtQkFBRixJQUF1QixFQUFFLG1CQUFGLENBQXNCLENBQXRCLEVBQXdCLENBQXhCLENBQXZCO0FBQWtELEdBQTF6SCxFQUEyekgsRUFBRSxLQUFGLEdBQVEsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsV0FBTyxnQkFBZ0IsRUFBRSxLQUFsQixJQUF5QixLQUFHLEVBQUUsSUFBTCxJQUFXLEtBQUssYUFBTCxHQUFtQixDQUFuQixFQUFxQixLQUFLLElBQUwsR0FBVSxFQUFFLElBQWpDLEVBQXNDLEtBQUssa0JBQUwsR0FBd0IsRUFBRSxnQkFBRixJQUFvQixLQUFLLENBQUwsS0FBUyxFQUFFLGdCQUFYLElBQTZCLEVBQUUsV0FBRixLQUFnQixDQUFDLENBQWxFLEdBQW9FLEVBQXBFLEdBQXVFLEVBQXJJLEVBQXdJLEtBQUssTUFBTCxHQUFZLEVBQUUsTUFBRixJQUFVLE1BQUksRUFBRSxNQUFGLENBQVMsUUFBdkIsR0FBZ0MsRUFBRSxNQUFGLENBQVMsVUFBekMsR0FBb0QsRUFBRSxNQUExTSxFQUFpTixLQUFLLGFBQUwsR0FBbUIsRUFBRSxhQUF0TyxFQUFvUCxLQUFLLGFBQUwsR0FBbUIsRUFBRSxhQUFwUixJQUFtUyxLQUFLLElBQUwsR0FBVSxDQUE3UyxFQUErUyxLQUFHLEVBQUUsTUFBRixDQUFTLElBQVQsRUFBYyxDQUFkLENBQWxULEVBQW1VLEtBQUssU0FBTCxHQUFlLEtBQUcsRUFBRSxTQUFMLElBQWdCLEVBQUUsR0FBRixFQUFsVyxFQUEwVyxNQUFLLEtBQUssRUFBRSxPQUFQLElBQWdCLENBQUMsQ0FBdEIsQ0FBblksSUFBNlosSUFBSSxFQUFFLEtBQU4sQ0FBWSxDQUFaLEVBQWMsQ0FBZCxDQUFwYTtBQUFxYixHQUF0d0ksRUFBdXdJLEVBQUUsS0FBRixDQUFRLFNBQVIsR0FBa0IsRUFBQyxhQUFZLEVBQUUsS0FBZixFQUFxQixvQkFBbUIsRUFBeEMsRUFBMkMsc0JBQXFCLEVBQWhFLEVBQW1FLCtCQUE4QixFQUFqRyxFQUFvRyxhQUFZLENBQUMsQ0FBakgsRUFBbUgsZ0JBQWUsMEJBQVU7QUFBQyxVQUFJLElBQUUsS0FBSyxhQUFYLENBQXlCLEtBQUssa0JBQUwsR0FBd0IsRUFBeEIsRUFBMkIsS0FBRyxDQUFDLEtBQUssV0FBVCxJQUFzQixFQUFFLGNBQUYsRUFBakQ7QUFBb0UsS0FBMU8sRUFBMk8saUJBQWdCLDJCQUFVO0FBQUMsVUFBSSxJQUFFLEtBQUssYUFBWCxDQUF5QixLQUFLLG9CQUFMLEdBQTBCLEVBQTFCLEVBQTZCLEtBQUcsQ0FBQyxLQUFLLFdBQVQsSUFBc0IsRUFBRSxlQUFGLEVBQW5EO0FBQXVFLEtBQXRXLEVBQXVXLDBCQUF5QixvQ0FBVTtBQUFDLFVBQUksSUFBRSxLQUFLLGFBQVgsQ0FBeUIsS0FBSyw2QkFBTCxHQUFtQyxFQUFuQyxFQUFzQyxLQUFHLENBQUMsS0FBSyxXQUFULElBQXNCLEVBQUUsd0JBQUYsRUFBNUQsRUFBeUYsS0FBSyxlQUFMLEVBQXpGO0FBQWdILEtBQXBoQixFQUF6eEksRUFBK3lKLEVBQUUsSUFBRixDQUFPLEVBQUMsUUFBTyxDQUFDLENBQVQsRUFBVyxTQUFRLENBQUMsQ0FBcEIsRUFBc0IsWUFBVyxDQUFDLENBQWxDLEVBQW9DLGdCQUFlLENBQUMsQ0FBcEQsRUFBc0QsU0FBUSxDQUFDLENBQS9ELEVBQWlFLFFBQU8sQ0FBQyxDQUF6RSxFQUEyRSxZQUFXLENBQUMsQ0FBdkYsRUFBeUYsU0FBUSxDQUFDLENBQWxHLEVBQW9HLE9BQU0sQ0FBQyxDQUEzRyxFQUE2RyxPQUFNLENBQUMsQ0FBcEgsRUFBc0gsVUFBUyxDQUFDLENBQWhJLEVBQWtJLE1BQUssQ0FBQyxDQUF4SSxFQUEwSSxRQUFPLENBQUMsQ0FBbEosRUFBb0osVUFBUyxDQUFDLENBQTlKLEVBQWdLLEtBQUksQ0FBQyxDQUFySyxFQUF1SyxTQUFRLENBQUMsQ0FBaEwsRUFBa0wsUUFBTyxDQUFDLENBQTFMLEVBQTRMLFNBQVEsQ0FBQyxDQUFyTSxFQUF1TSxTQUFRLENBQUMsQ0FBaE4sRUFBa04sU0FBUSxDQUFDLENBQTNOLEVBQTZOLFNBQVEsQ0FBQyxDQUF0TyxFQUF3TyxTQUFRLENBQUMsQ0FBalAsRUFBbVAsV0FBVSxDQUFDLENBQTlQLEVBQWdRLGFBQVksQ0FBQyxDQUE3USxFQUErUSxTQUFRLENBQUMsQ0FBeFIsRUFBMFIsU0FBUSxDQUFDLENBQW5TLEVBQXFTLGVBQWMsQ0FBQyxDQUFwVCxFQUFzVCxXQUFVLENBQUMsQ0FBalUsRUFBbVUsU0FBUSxDQUFDLENBQTVVLEVBQThVLE9BQU0sZUFBUyxDQUFULEVBQVc7QUFBQyxVQUFJLElBQUUsRUFBRSxNQUFSLENBQWUsT0FBTyxRQUFNLEVBQUUsS0FBUixJQUFlLEdBQUcsSUFBSCxDQUFRLEVBQUUsSUFBVixDQUFmLEdBQStCLFFBQU0sRUFBRSxRQUFSLEdBQWlCLEVBQUUsUUFBbkIsR0FBNEIsRUFBRSxPQUE3RCxHQUFxRSxDQUFDLEVBQUUsS0FBSCxJQUFVLEtBQUssQ0FBTCxLQUFTLENBQW5CLElBQXNCLEdBQUcsSUFBSCxDQUFRLEVBQUUsSUFBVixDQUF0QixHQUFzQyxJQUFFLENBQUYsR0FBSSxDQUFKLEdBQU0sSUFBRSxDQUFGLEdBQUksQ0FBSixHQUFNLElBQUUsQ0FBRixHQUFJLENBQUosR0FBTSxDQUF4RCxHQUEwRCxFQUFFLEtBQXhJO0FBQThJLEtBQTdmLEVBQVAsRUFBc2dCLEVBQUUsS0FBRixDQUFRLE9BQTlnQixDQUEveUosRUFBczBLLEVBQUUsSUFBRixDQUFPLEVBQUMsWUFBVyxXQUFaLEVBQXdCLFlBQVcsVUFBbkMsRUFBOEMsY0FBYSxhQUEzRCxFQUF5RSxjQUFhLFlBQXRGLEVBQVAsRUFBMkcsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsTUFBRSxLQUFGLENBQVEsT0FBUixDQUFnQixDQUFoQixJQUFtQixFQUFDLGNBQWEsQ0FBZCxFQUFnQixVQUFTLENBQXpCLEVBQTJCLFFBQU8sZ0JBQVMsQ0FBVCxFQUFXO0FBQUMsWUFBSSxDQUFKO0FBQUEsWUFBTSxJQUFFLElBQVI7QUFBQSxZQUFhLElBQUUsRUFBRSxhQUFqQjtBQUFBLFlBQStCLElBQUUsRUFBRSxTQUFuQyxDQUE2QyxPQUFPLE1BQUksTUFBSSxDQUFKLElBQU8sRUFBRSxRQUFGLENBQVcsQ0FBWCxFQUFhLENBQWIsQ0FBWCxNQUE4QixFQUFFLElBQUYsR0FBTyxFQUFFLFFBQVQsRUFBa0IsSUFBRSxFQUFFLE9BQUYsQ0FBVSxLQUFWLENBQWdCLElBQWhCLEVBQXFCLFNBQXJCLENBQXBCLEVBQW9ELEVBQUUsSUFBRixHQUFPLENBQXpGLEdBQTRGLENBQW5HO0FBQXFHLE9BQWhNLEVBQW5CO0FBQXFOLEdBQTlVLENBQXQwSyxFQUFzcEwsRUFBRSxFQUFGLENBQUssTUFBTCxDQUFZLEVBQUMsSUFBRyxZQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUI7QUFBQyxhQUFPLEdBQUcsSUFBSCxFQUFRLENBQVIsRUFBVSxDQUFWLEVBQVksQ0FBWixFQUFjLENBQWQsQ0FBUDtBQUF3QixLQUE5QyxFQUErQyxLQUFJLGFBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQjtBQUFDLGFBQU8sR0FBRyxJQUFILEVBQVEsQ0FBUixFQUFVLENBQVYsRUFBWSxDQUFaLEVBQWMsQ0FBZCxFQUFnQixDQUFoQixDQUFQO0FBQTBCLEtBQS9GLEVBQWdHLEtBQUksYUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLFVBQUksQ0FBSixFQUFNLENBQU4sQ0FBUSxJQUFHLEtBQUcsRUFBRSxjQUFMLElBQXFCLEVBQUUsU0FBMUIsRUFBb0MsT0FBTyxJQUFFLEVBQUUsU0FBSixFQUFjLEVBQUUsRUFBRSxjQUFKLEVBQW9CLEdBQXBCLENBQXdCLEVBQUUsU0FBRixHQUFZLEVBQUUsUUFBRixHQUFXLEdBQVgsR0FBZSxFQUFFLFNBQTdCLEdBQXVDLEVBQUUsUUFBakUsRUFBMEUsRUFBRSxRQUE1RSxFQUFxRixFQUFFLE9BQXZGLENBQWQsRUFBOEcsSUFBckgsQ0FBMEgsSUFBRyxvQkFBaUIsQ0FBakIseUNBQWlCLENBQWpCLEVBQUgsRUFBc0I7QUFBQyxhQUFJLENBQUosSUFBUyxDQUFUO0FBQVcsZUFBSyxHQUFMLENBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxFQUFFLENBQUYsQ0FBYjtBQUFYLFNBQThCLE9BQU8sSUFBUDtBQUFZLGNBQU8sTUFBSSxDQUFDLENBQUwsSUFBUSxjQUFZLE9BQU8sQ0FBM0IsS0FBK0IsSUFBRSxDQUFGLEVBQUksSUFBRSxLQUFLLENBQTFDLEdBQTZDLE1BQUksQ0FBQyxDQUFMLEtBQVMsSUFBRSxFQUFYLENBQTdDLEVBQTRELEtBQUssSUFBTCxDQUFVLFlBQVU7QUFBQyxVQUFFLEtBQUYsQ0FBUSxNQUFSLENBQWUsSUFBZixFQUFvQixDQUFwQixFQUFzQixDQUF0QixFQUF3QixDQUF4QjtBQUEyQixPQUFoRCxDQUFuRTtBQUFxSCxLQUFoZCxFQUFaLENBQXRwTCxDQUFxbk0sSUFBSSxLQUFHLDZGQUFQO0FBQUEsTUFBcUcsS0FBRyx1QkFBeEc7QUFBQSxNQUFnSSxLQUFHLG1DQUFuSTtBQUFBLE1BQXVLLEtBQUcsYUFBMUs7QUFBQSxNQUF3TCxLQUFHLDBDQUEzTCxDQUFzTyxTQUFTLEVBQVQsQ0FBWSxDQUFaLEVBQWMsQ0FBZCxFQUFnQjtBQUFDLFdBQU8sRUFBRSxDQUFGLEVBQUksT0FBSixLQUFjLEVBQUUsT0FBSyxFQUFFLFFBQVAsR0FBZ0IsQ0FBaEIsR0FBa0IsRUFBRSxVQUF0QixFQUFpQyxJQUFqQyxDQUFkLEdBQXFELEVBQUUsUUFBRixFQUFXLENBQVgsRUFBYyxDQUFkLEtBQWtCLENBQXZFLEdBQXlFLENBQWhGO0FBQWtGLFlBQVMsRUFBVCxDQUFZLENBQVosRUFBYztBQUFDLFdBQU8sRUFBRSxJQUFGLEdBQU8sQ0FBQyxTQUFPLEVBQUUsWUFBRixDQUFlLE1BQWYsQ0FBUixJQUFnQyxHQUFoQyxHQUFvQyxFQUFFLElBQTdDLEVBQWtELENBQXpEO0FBQTJELFlBQVMsRUFBVCxDQUFZLENBQVosRUFBYztBQUFDLFFBQUksSUFBRSxHQUFHLElBQUgsQ0FBUSxFQUFFLElBQVYsQ0FBTixDQUFzQixPQUFPLElBQUUsRUFBRSxJQUFGLEdBQU8sRUFBRSxDQUFGLENBQVQsR0FBYyxFQUFFLGVBQUYsQ0FBa0IsTUFBbEIsQ0FBZCxFQUF3QyxDQUEvQztBQUFpRCxZQUFTLEVBQVQsQ0FBWSxDQUFaLEVBQWMsQ0FBZCxFQUFnQjtBQUFDLFFBQUksQ0FBSixFQUFNLENBQU4sRUFBUSxDQUFSLEVBQVUsQ0FBVixFQUFZLENBQVosRUFBYyxDQUFkLEVBQWdCLENBQWhCLEVBQWtCLENBQWxCLENBQW9CLElBQUcsTUFBSSxFQUFFLFFBQVQsRUFBa0I7QUFBQyxVQUFHLEVBQUUsT0FBRixDQUFVLENBQVYsTUFBZSxJQUFFLEVBQUUsTUFBRixDQUFTLENBQVQsQ0FBRixFQUFjLElBQUUsRUFBRSxHQUFGLENBQU0sQ0FBTixFQUFRLENBQVIsQ0FBaEIsRUFBMkIsSUFBRSxFQUFFLE1BQTlDLENBQUgsRUFBeUQ7QUFBQyxlQUFPLEVBQUUsTUFBVCxFQUFnQixFQUFFLE1BQUYsR0FBUyxFQUF6QixDQUE0QixLQUFJLENBQUosSUFBUyxDQUFUO0FBQVcsZUFBSSxJQUFFLENBQUYsRUFBSSxJQUFFLEVBQUUsQ0FBRixFQUFLLE1BQWYsRUFBc0IsSUFBRSxDQUF4QixFQUEwQixHQUExQjtBQUE4QixjQUFFLEtBQUYsQ0FBUSxHQUFSLENBQVksQ0FBWixFQUFjLENBQWQsRUFBZ0IsRUFBRSxDQUFGLEVBQUssQ0FBTCxDQUFoQjtBQUE5QjtBQUFYO0FBQWtFLFNBQUUsT0FBRixDQUFVLENBQVYsTUFBZSxJQUFFLEVBQUUsTUFBRixDQUFTLENBQVQsQ0FBRixFQUFjLElBQUUsRUFBRSxNQUFGLENBQVMsRUFBVCxFQUFZLENBQVosQ0FBaEIsRUFBK0IsRUFBRSxHQUFGLENBQU0sQ0FBTixFQUFRLENBQVIsQ0FBOUM7QUFBMEQ7QUFBQyxZQUFTLEVBQVQsQ0FBWSxDQUFaLEVBQWMsQ0FBZCxFQUFnQjtBQUFDLFFBQUksSUFBRSxFQUFFLFFBQUYsQ0FBVyxXQUFYLEVBQU4sQ0FBK0IsWUFBVSxDQUFWLElBQWEsR0FBRyxJQUFILENBQVEsRUFBRSxJQUFWLENBQWIsR0FBNkIsRUFBRSxPQUFGLEdBQVUsRUFBRSxPQUF6QyxHQUFpRCxZQUFVLENBQVYsSUFBYSxlQUFhLENBQTFCLEtBQThCLEVBQUUsWUFBRixHQUFlLEVBQUUsWUFBL0MsQ0FBakQ7QUFBOEcsWUFBUyxFQUFULENBQVksQ0FBWixFQUFjLENBQWQsRUFBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEIsRUFBb0I7QUFBQyxRQUFFLEVBQUUsS0FBRixDQUFRLEVBQVIsRUFBVyxDQUFYLENBQUYsQ0FBZ0IsSUFBSSxDQUFKO0FBQUEsUUFBTSxDQUFOO0FBQUEsUUFBUSxDQUFSO0FBQUEsUUFBVSxDQUFWO0FBQUEsUUFBWSxDQUFaO0FBQUEsUUFBYyxDQUFkO0FBQUEsUUFBZ0IsSUFBRSxDQUFsQjtBQUFBLFFBQW9CLElBQUUsRUFBRSxNQUF4QjtBQUFBLFFBQStCLElBQUUsSUFBRSxDQUFuQztBQUFBLFFBQXFDLElBQUUsRUFBRSxDQUFGLENBQXZDO0FBQUEsUUFBNEMsSUFBRSxFQUFFLFVBQUYsQ0FBYSxDQUFiLENBQTlDLENBQThELElBQUcsS0FBRyxJQUFFLENBQUYsSUFBSyxZQUFVLE9BQU8sQ0FBdEIsSUFBeUIsQ0FBQyxFQUFFLFVBQTVCLElBQXdDLEdBQUcsSUFBSCxDQUFRLENBQVIsQ0FBOUMsRUFBeUQsT0FBTyxFQUFFLElBQUYsQ0FBTyxVQUFTLENBQVQsRUFBVztBQUFDLFVBQUksSUFBRSxFQUFFLEVBQUYsQ0FBSyxDQUFMLENBQU4sQ0FBYyxNQUFJLEVBQUUsQ0FBRixJQUFLLEVBQUUsSUFBRixDQUFPLElBQVAsRUFBWSxDQUFaLEVBQWMsRUFBRSxJQUFGLEVBQWQsQ0FBVCxHQUFrQyxHQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsQ0FBbEM7QUFBOEMsS0FBL0UsQ0FBUCxDQUF3RixJQUFHLE1BQUksSUFBRSxHQUFHLENBQUgsRUFBSyxFQUFFLENBQUYsRUFBSyxhQUFWLEVBQXdCLENBQUMsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsQ0FBRixFQUFrQyxJQUFFLEVBQUUsVUFBdEMsRUFBaUQsTUFBSSxFQUFFLFVBQUYsQ0FBYSxNQUFqQixLQUEwQixJQUFFLENBQTVCLENBQWpELEVBQWdGLEtBQUcsQ0FBdkYsQ0FBSCxFQUE2RjtBQUFDLFdBQUksSUFBRSxFQUFFLEdBQUYsQ0FBTSxHQUFHLENBQUgsRUFBSyxRQUFMLENBQU4sRUFBcUIsRUFBckIsQ0FBRixFQUEyQixJQUFFLEVBQUUsTUFBbkMsRUFBMEMsSUFBRSxDQUE1QyxFQUE4QyxHQUE5QztBQUFrRCxZQUFFLENBQUYsRUFBSSxNQUFJLENBQUosS0FBUSxJQUFFLEVBQUUsS0FBRixDQUFRLENBQVIsRUFBVSxDQUFDLENBQVgsRUFBYSxDQUFDLENBQWQsQ0FBRixFQUFtQixLQUFHLEVBQUUsS0FBRixDQUFRLENBQVIsRUFBVSxHQUFHLENBQUgsRUFBSyxRQUFMLENBQVYsQ0FBOUIsQ0FBSixFQUE2RCxFQUFFLElBQUYsQ0FBTyxFQUFFLENBQUYsQ0FBUCxFQUFZLENBQVosRUFBYyxDQUFkLENBQTdEO0FBQWxELE9BQWdJLElBQUcsQ0FBSCxFQUFLLEtBQUksSUFBRSxFQUFFLEVBQUUsTUFBRixHQUFTLENBQVgsRUFBYyxhQUFoQixFQUE4QixFQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVEsRUFBUixDQUE5QixFQUEwQyxJQUFFLENBQWhELEVBQWtELElBQUUsQ0FBcEQsRUFBc0QsR0FBdEQ7QUFBMEQsWUFBRSxFQUFFLENBQUYsQ0FBRixFQUFPLEdBQUcsSUFBSCxDQUFRLEVBQUUsSUFBRixJQUFRLEVBQWhCLEtBQXFCLENBQUMsRUFBRSxNQUFGLENBQVMsQ0FBVCxFQUFXLFlBQVgsQ0FBdEIsSUFBZ0QsRUFBRSxRQUFGLENBQVcsQ0FBWCxFQUFhLENBQWIsQ0FBaEQsS0FBa0UsRUFBRSxHQUFGLEdBQU0sRUFBRSxRQUFGLElBQVksRUFBRSxRQUFGLENBQVcsRUFBRSxHQUFiLENBQWxCLEdBQW9DLEVBQUUsRUFBRSxXQUFGLENBQWMsT0FBZCxDQUFzQixFQUF0QixFQUF5QixFQUF6QixDQUFGLEVBQStCLENBQS9CLENBQXRHLENBQVA7QUFBMUQ7QUFBME0sWUFBTyxDQUFQO0FBQVMsWUFBUyxFQUFULENBQVksQ0FBWixFQUFjLENBQWQsRUFBZ0IsQ0FBaEIsRUFBa0I7QUFBQyxTQUFJLElBQUksQ0FBSixFQUFNLElBQUUsSUFBRSxFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsQ0FBWCxDQUFGLEdBQWdCLENBQXhCLEVBQTBCLElBQUUsQ0FBaEMsRUFBa0MsU0FBTyxJQUFFLEVBQUUsQ0FBRixDQUFULENBQWxDLEVBQWlELEdBQWpEO0FBQXFELFdBQUcsTUFBSSxFQUFFLFFBQVQsSUFBbUIsRUFBRSxTQUFGLENBQVksR0FBRyxDQUFILENBQVosQ0FBbkIsRUFBc0MsRUFBRSxVQUFGLEtBQWUsS0FBRyxFQUFFLFFBQUYsQ0FBVyxFQUFFLGFBQWIsRUFBMkIsQ0FBM0IsQ0FBSCxJQUFrQyxHQUFHLEdBQUcsQ0FBSCxFQUFLLFFBQUwsQ0FBSCxDQUFsQyxFQUFxRCxFQUFFLFVBQUYsQ0FBYSxXQUFiLENBQXlCLENBQXpCLENBQXBFLENBQXRDO0FBQXJELEtBQTRMLE9BQU8sQ0FBUDtBQUFTLEtBQUUsTUFBRixDQUFTLEVBQUMsZUFBYyx1QkFBUyxDQUFULEVBQVc7QUFBQyxhQUFPLEVBQUUsT0FBRixDQUFVLEVBQVYsRUFBYSxXQUFiLENBQVA7QUFBaUMsS0FBNUQsRUFBNkQsT0FBTSxlQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsVUFBSSxDQUFKO0FBQUEsVUFBTSxDQUFOO0FBQUEsVUFBUSxDQUFSO0FBQUEsVUFBVSxDQUFWO0FBQUEsVUFBWSxJQUFFLEVBQUUsU0FBRixDQUFZLENBQUMsQ0FBYixDQUFkO0FBQUEsVUFBOEIsSUFBRSxFQUFFLFFBQUYsQ0FBVyxFQUFFLGFBQWIsRUFBMkIsQ0FBM0IsQ0FBaEMsQ0FBOEQsSUFBRyxFQUFFLEVBQUUsY0FBRixJQUFrQixNQUFJLEVBQUUsUUFBTixJQUFnQixPQUFLLEVBQUUsUUFBekMsSUFBbUQsRUFBRSxRQUFGLENBQVcsQ0FBWCxDQUFyRCxDQUFILEVBQXVFLEtBQUksSUFBRSxHQUFHLENBQUgsQ0FBRixFQUFRLElBQUUsR0FBRyxDQUFILENBQVYsRUFBZ0IsSUFBRSxDQUFsQixFQUFvQixJQUFFLEVBQUUsTUFBNUIsRUFBbUMsSUFBRSxDQUFyQyxFQUF1QyxHQUF2QztBQUEyQyxXQUFHLEVBQUUsQ0FBRixDQUFILEVBQVEsRUFBRSxDQUFGLENBQVI7QUFBM0MsT0FBeUQsSUFBRyxDQUFILEVBQUssSUFBRyxDQUFILEVBQUssS0FBSSxJQUFFLEtBQUcsR0FBRyxDQUFILENBQUwsRUFBVyxJQUFFLEtBQUcsR0FBRyxDQUFILENBQWhCLEVBQXNCLElBQUUsQ0FBeEIsRUFBMEIsSUFBRSxFQUFFLE1BQWxDLEVBQXlDLElBQUUsQ0FBM0MsRUFBNkMsR0FBN0M7QUFBaUQsV0FBRyxFQUFFLENBQUYsQ0FBSCxFQUFRLEVBQUUsQ0FBRixDQUFSO0FBQWpELE9BQUwsTUFBeUUsR0FBRyxDQUFILEVBQUssQ0FBTCxFQUFRLE9BQU8sSUFBRSxHQUFHLENBQUgsRUFBSyxRQUFMLENBQUYsRUFBaUIsRUFBRSxNQUFGLEdBQVMsQ0FBVCxJQUFZLEdBQUcsQ0FBSCxFQUFLLENBQUMsQ0FBRCxJQUFJLEdBQUcsQ0FBSCxFQUFLLFFBQUwsQ0FBVCxDQUE3QixFQUFzRCxDQUE3RDtBQUErRCxLQUF0YSxFQUF1YSxXQUFVLG1CQUFTLENBQVQsRUFBVztBQUFDLFdBQUksSUFBSSxDQUFKLEVBQU0sQ0FBTixFQUFRLENBQVIsRUFBVSxJQUFFLEVBQUUsS0FBRixDQUFRLE9BQXBCLEVBQTRCLElBQUUsQ0FBbEMsRUFBb0MsS0FBSyxDQUFMLE1BQVUsSUFBRSxFQUFFLENBQUYsQ0FBWixDQUFwQyxFQUFzRCxHQUF0RDtBQUEwRCxZQUFHLEVBQUUsQ0FBRixDQUFILEVBQVE7QUFBQyxjQUFHLElBQUUsRUFBRSxFQUFFLE9BQUosQ0FBTCxFQUFrQjtBQUFDLGdCQUFHLEVBQUUsTUFBTCxFQUFZLEtBQUksQ0FBSixJQUFTLEVBQUUsTUFBWDtBQUFrQixnQkFBRSxDQUFGLElBQUssRUFBRSxLQUFGLENBQVEsTUFBUixDQUFlLENBQWYsRUFBaUIsQ0FBakIsQ0FBTCxHQUF5QixFQUFFLFdBQUYsQ0FBYyxDQUFkLEVBQWdCLENBQWhCLEVBQWtCLEVBQUUsTUFBcEIsQ0FBekI7QUFBbEIsYUFBdUUsRUFBRSxFQUFFLE9BQUosSUFBYSxLQUFLLENBQWxCO0FBQW9CLGFBQUUsRUFBRSxPQUFKLE1BQWUsRUFBRSxFQUFFLE9BQUosSUFBYSxLQUFLLENBQWpDO0FBQW9DO0FBQWpPO0FBQWtPLEtBQS9wQixFQUFULEdBQTJxQixFQUFFLEVBQUYsQ0FBSyxNQUFMLENBQVksRUFBQyxRQUFPLGdCQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sR0FBRyxJQUFILEVBQVEsQ0FBUixFQUFVLENBQUMsQ0FBWCxDQUFQO0FBQXFCLEtBQXpDLEVBQTBDLFFBQU8sZ0JBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxHQUFHLElBQUgsRUFBUSxDQUFSLENBQVA7QUFBa0IsS0FBL0UsRUFBZ0YsTUFBSyxjQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sRUFBRSxJQUFGLEVBQU8sVUFBUyxDQUFULEVBQVc7QUFBQyxlQUFPLEtBQUssQ0FBTCxLQUFTLENBQVQsR0FBVyxFQUFFLElBQUYsQ0FBTyxJQUFQLENBQVgsR0FBd0IsS0FBSyxLQUFMLEdBQWEsSUFBYixDQUFrQixZQUFVO0FBQUMsZ0JBQUksS0FBSyxRQUFULElBQW1CLE9BQUssS0FBSyxRQUE3QixJQUF1QyxNQUFJLEtBQUssUUFBaEQsS0FBMkQsS0FBSyxXQUFMLEdBQWlCLENBQTVFO0FBQStFLFNBQTVHLENBQS9CO0FBQTZJLE9BQWhLLEVBQWlLLElBQWpLLEVBQXNLLENBQXRLLEVBQXdLLFVBQVUsTUFBbEwsQ0FBUDtBQUFpTSxLQUFsUyxFQUFtUyxRQUFPLGtCQUFVO0FBQUMsYUFBTyxHQUFHLElBQUgsRUFBUSxTQUFSLEVBQWtCLFVBQVMsQ0FBVCxFQUFXO0FBQUMsWUFBRyxNQUFJLEtBQUssUUFBVCxJQUFtQixPQUFLLEtBQUssUUFBN0IsSUFBdUMsTUFBSSxLQUFLLFFBQW5ELEVBQTREO0FBQUMsY0FBSSxJQUFFLEdBQUcsSUFBSCxFQUFRLENBQVIsQ0FBTixDQUFpQixFQUFFLFdBQUYsQ0FBYyxDQUFkO0FBQWlCO0FBQUMsT0FBOUgsQ0FBUDtBQUF1SSxLQUE1YixFQUE2YixTQUFRLG1CQUFVO0FBQUMsYUFBTyxHQUFHLElBQUgsRUFBUSxTQUFSLEVBQWtCLFVBQVMsQ0FBVCxFQUFXO0FBQUMsWUFBRyxNQUFJLEtBQUssUUFBVCxJQUFtQixPQUFLLEtBQUssUUFBN0IsSUFBdUMsTUFBSSxLQUFLLFFBQW5ELEVBQTREO0FBQUMsY0FBSSxJQUFFLEdBQUcsSUFBSCxFQUFRLENBQVIsQ0FBTixDQUFpQixFQUFFLFlBQUYsQ0FBZSxDQUFmLEVBQWlCLEVBQUUsVUFBbkI7QUFBK0I7QUFBQyxPQUE1SSxDQUFQO0FBQXFKLEtBQXJtQixFQUFzbUIsUUFBTyxrQkFBVTtBQUFDLGFBQU8sR0FBRyxJQUFILEVBQVEsU0FBUixFQUFrQixVQUFTLENBQVQsRUFBVztBQUFDLGFBQUssVUFBTCxJQUFpQixLQUFLLFVBQUwsQ0FBZ0IsWUFBaEIsQ0FBNkIsQ0FBN0IsRUFBK0IsSUFBL0IsQ0FBakI7QUFBc0QsT0FBcEYsQ0FBUDtBQUE2RixLQUFydEIsRUFBc3RCLE9BQU0saUJBQVU7QUFBQyxhQUFPLEdBQUcsSUFBSCxFQUFRLFNBQVIsRUFBa0IsVUFBUyxDQUFULEVBQVc7QUFBQyxhQUFLLFVBQUwsSUFBaUIsS0FBSyxVQUFMLENBQWdCLFlBQWhCLENBQTZCLENBQTdCLEVBQStCLEtBQUssV0FBcEMsQ0FBakI7QUFBa0UsT0FBaEcsQ0FBUDtBQUF5RyxLQUFoMUIsRUFBaTFCLE9BQU0saUJBQVU7QUFBQyxXQUFJLElBQUksQ0FBSixFQUFNLElBQUUsQ0FBWixFQUFjLFNBQU8sSUFBRSxLQUFLLENBQUwsQ0FBVCxDQUFkLEVBQWdDLEdBQWhDO0FBQW9DLGNBQUksRUFBRSxRQUFOLEtBQWlCLEVBQUUsU0FBRixDQUFZLEdBQUcsQ0FBSCxFQUFLLENBQUMsQ0FBTixDQUFaLEdBQXNCLEVBQUUsV0FBRixHQUFjLEVBQXJEO0FBQXBDLE9BQTZGLE9BQU8sSUFBUDtBQUFZLEtBQTM4QixFQUE0OEIsT0FBTSxlQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxhQUFPLElBQUUsUUFBTSxDQUFOLElBQVMsQ0FBWCxFQUFhLElBQUUsUUFBTSxDQUFOLEdBQVEsQ0FBUixHQUFVLENBQXpCLEVBQTJCLEtBQUssR0FBTCxDQUFTLFlBQVU7QUFBQyxlQUFPLEVBQUUsS0FBRixDQUFRLElBQVIsRUFBYSxDQUFiLEVBQWUsQ0FBZixDQUFQO0FBQXlCLE9BQTdDLENBQWxDO0FBQWlGLEtBQWpqQyxFQUFrakMsTUFBSyxjQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sRUFBRSxJQUFGLEVBQU8sVUFBUyxDQUFULEVBQVc7QUFBQyxZQUFJLElBQUUsS0FBSyxDQUFMLEtBQVMsRUFBZjtBQUFBLFlBQWtCLElBQUUsQ0FBcEI7QUFBQSxZQUFzQixJQUFFLEtBQUssTUFBN0IsQ0FBb0MsSUFBRyxLQUFLLENBQUwsS0FBUyxDQUFULElBQVksTUFBSSxFQUFFLFFBQXJCLEVBQThCLE9BQU8sRUFBRSxTQUFULENBQW1CLElBQUcsWUFBVSxPQUFPLENBQWpCLElBQW9CLENBQUMsR0FBRyxJQUFILENBQVEsQ0FBUixDQUFyQixJQUFpQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUgsQ0FBUSxDQUFSLEtBQVksQ0FBQyxFQUFELEVBQUksRUFBSixDQUFiLEVBQXNCLENBQXRCLEVBQXlCLFdBQXpCLEVBQUgsQ0FBckMsRUFBZ0Y7QUFBQyxjQUFFLEVBQUUsYUFBRixDQUFnQixDQUFoQixDQUFGLENBQXFCLElBQUc7QUFBQyxtQkFBSyxJQUFFLENBQVAsRUFBUyxHQUFUO0FBQWEsa0JBQUUsS0FBSyxDQUFMLEtBQVMsRUFBWCxFQUFjLE1BQUksRUFBRSxRQUFOLEtBQWlCLEVBQUUsU0FBRixDQUFZLEdBQUcsQ0FBSCxFQUFLLENBQUMsQ0FBTixDQUFaLEdBQXNCLEVBQUUsU0FBRixHQUFZLENBQW5ELENBQWQ7QUFBYixhQUFpRixJQUFFLENBQUY7QUFBSSxXQUF6RixDQUF5RixPQUFNLENBQU4sRUFBUSxDQUFFO0FBQUMsY0FBRyxLQUFLLEtBQUwsR0FBYSxNQUFiLENBQW9CLENBQXBCLENBQUg7QUFBMEIsT0FBNVUsRUFBNlUsSUFBN1UsRUFBa1YsQ0FBbFYsRUFBb1YsVUFBVSxNQUE5VixDQUFQO0FBQTZXLEtBQWg3QyxFQUFpN0MsYUFBWSx1QkFBVTtBQUFDLFVBQUksSUFBRSxFQUFOLENBQVMsT0FBTyxHQUFHLElBQUgsRUFBUSxTQUFSLEVBQWtCLFVBQVMsQ0FBVCxFQUFXO0FBQUMsWUFBSSxJQUFFLEtBQUssVUFBWCxDQUFzQixFQUFFLE9BQUYsQ0FBVSxJQUFWLEVBQWUsQ0FBZixJQUFrQixDQUFsQixLQUFzQixFQUFFLFNBQUYsQ0FBWSxHQUFHLElBQUgsQ0FBWixHQUFzQixLQUFHLEVBQUUsWUFBRixDQUFlLENBQWYsRUFBaUIsSUFBakIsQ0FBL0M7QUFBdUUsT0FBM0gsRUFBNEgsQ0FBNUgsQ0FBUDtBQUFzSSxLQUF2bEQsRUFBWixDQUEzcUIsRUFBaXhFLEVBQUUsSUFBRixDQUFPLEVBQUMsVUFBUyxRQUFWLEVBQW1CLFdBQVUsU0FBN0IsRUFBdUMsY0FBYSxRQUFwRCxFQUE2RCxhQUFZLE9BQXpFLEVBQWlGLFlBQVcsYUFBNUYsRUFBUCxFQUFrSCxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxNQUFFLEVBQUYsQ0FBSyxDQUFMLElBQVEsVUFBUyxDQUFULEVBQVc7QUFBQyxXQUFJLElBQUksQ0FBSixFQUFNLElBQUUsRUFBUixFQUFXLElBQUUsRUFBRSxDQUFGLENBQWIsRUFBa0IsSUFBRSxFQUFFLE1BQUYsR0FBUyxDQUE3QixFQUErQixJQUFFLENBQXJDLEVBQXVDLEtBQUcsQ0FBMUMsRUFBNEMsR0FBNUM7QUFBZ0QsWUFBRSxNQUFJLENBQUosR0FBTSxJQUFOLEdBQVcsS0FBSyxLQUFMLENBQVcsQ0FBQyxDQUFaLENBQWIsRUFBNEIsRUFBRSxFQUFFLENBQUYsQ0FBRixFQUFRLENBQVIsRUFBVyxDQUFYLENBQTVCLEVBQTBDLEVBQUUsS0FBRixDQUFRLENBQVIsRUFBVSxFQUFFLEdBQUYsRUFBVixDQUExQztBQUFoRCxPQUE2RyxPQUFPLEtBQUssU0FBTCxDQUFlLENBQWYsQ0FBUDtBQUF5QixLQUExSjtBQUEySixHQUEzUixDQUFqeEUsQ0FBOGlGLElBQUksS0FBRyxTQUFQO0FBQUEsTUFBaUIsS0FBRyxJQUFJLE1BQUosQ0FBVyxPQUFLLEVBQUwsR0FBUSxpQkFBbkIsRUFBcUMsR0FBckMsQ0FBcEI7QUFBQSxNQUE4RCxLQUFHLFNBQUgsRUFBRyxDQUFTLENBQVQsRUFBVztBQUFDLFFBQUksSUFBRSxFQUFFLGFBQUYsQ0FBZ0IsV0FBdEIsQ0FBa0MsT0FBTyxLQUFHLEVBQUUsTUFBTCxLQUFjLElBQUUsQ0FBaEIsR0FBbUIsRUFBRSxnQkFBRixDQUFtQixDQUFuQixDQUExQjtBQUFnRCxHQUEvSixDQUFnSyxDQUFDLFlBQVU7QUFBQyxhQUFTLENBQVQsR0FBWTtBQUFDLFVBQUcsQ0FBSCxFQUFLO0FBQUMsVUFBRSxLQUFGLENBQVEsT0FBUixHQUFnQiwyR0FBaEIsRUFBNEgsRUFBRSxTQUFGLEdBQVksRUFBeEksRUFBMkksR0FBRyxXQUFILENBQWUsQ0FBZixDQUEzSSxDQUE2SixJQUFJLElBQUUsRUFBRSxnQkFBRixDQUFtQixDQUFuQixDQUFOLENBQTRCLElBQUUsU0FBTyxFQUFFLEdBQVgsRUFBZSxJQUFFLFVBQVEsRUFBRSxVQUEzQixFQUFzQyxJQUFFLFVBQVEsRUFBRSxLQUFsRCxFQUF3RCxFQUFFLEtBQUYsQ0FBUSxXQUFSLEdBQW9CLEtBQTVFLEVBQWtGLElBQUUsVUFBUSxFQUFFLFdBQTlGLEVBQTBHLEdBQUcsV0FBSCxDQUFlLENBQWYsQ0FBMUcsRUFBNEgsSUFBRSxJQUE5SDtBQUFtSTtBQUFDLFNBQUksQ0FBSjtBQUFBLFFBQU0sQ0FBTjtBQUFBLFFBQVEsQ0FBUjtBQUFBLFFBQVUsQ0FBVjtBQUFBLFFBQVksSUFBRSxFQUFFLGFBQUYsQ0FBZ0IsS0FBaEIsQ0FBZDtBQUFBLFFBQXFDLElBQUUsRUFBRSxhQUFGLENBQWdCLEtBQWhCLENBQXZDLENBQThELEVBQUUsS0FBRixLQUFVLEVBQUUsS0FBRixDQUFRLGNBQVIsR0FBdUIsYUFBdkIsRUFBcUMsRUFBRSxTQUFGLENBQVksQ0FBQyxDQUFiLEVBQWdCLEtBQWhCLENBQXNCLGNBQXRCLEdBQXFDLEVBQTFFLEVBQTZFLEVBQUUsZUFBRixHQUFrQixrQkFBZ0IsRUFBRSxLQUFGLENBQVEsY0FBdkgsRUFBc0ksRUFBRSxLQUFGLENBQVEsT0FBUixHQUFnQiwyRkFBdEosRUFBa1AsRUFBRSxXQUFGLENBQWMsQ0FBZCxDQUFsUCxFQUFtUSxFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsRUFBQyxlQUFjLHlCQUFVO0FBQUMsZUFBTyxLQUFJLENBQVg7QUFBYSxPQUF2QyxFQUF3QyxtQkFBa0IsNkJBQVU7QUFBQyxlQUFPLEtBQUksQ0FBWDtBQUFhLE9BQWxGLEVBQW1GLGtCQUFpQiw0QkFBVTtBQUFDLGVBQU8sS0FBSSxDQUFYO0FBQWEsT0FBNUgsRUFBNkgsb0JBQW1CLDhCQUFVO0FBQUMsZUFBTyxLQUFJLENBQVg7QUFBYSxPQUF4SyxFQUFYLENBQTdRO0FBQW9jLEdBQTcxQixFQUFELENBQWkyQixTQUFTLEVBQVQsQ0FBWSxDQUFaLEVBQWMsQ0FBZCxFQUFnQixDQUFoQixFQUFrQjtBQUFDLFFBQUksQ0FBSjtBQUFBLFFBQU0sQ0FBTjtBQUFBLFFBQVEsQ0FBUjtBQUFBLFFBQVUsQ0FBVjtBQUFBLFFBQVksSUFBRSxFQUFFLEtBQWhCLENBQXNCLE9BQU8sSUFBRSxLQUFHLEdBQUcsQ0FBSCxDQUFMLEVBQVcsTUFBSSxJQUFFLEVBQUUsZ0JBQUYsQ0FBbUIsQ0FBbkIsS0FBdUIsRUFBRSxDQUFGLENBQXpCLEVBQThCLE9BQUssQ0FBTCxJQUFRLEVBQUUsUUFBRixDQUFXLEVBQUUsYUFBYixFQUEyQixDQUEzQixDQUFSLEtBQXdDLElBQUUsRUFBRSxLQUFGLENBQVEsQ0FBUixFQUFVLENBQVYsQ0FBMUMsQ0FBOUIsRUFBc0YsQ0FBQyxFQUFFLGdCQUFGLEVBQUQsSUFBdUIsR0FBRyxJQUFILENBQVEsQ0FBUixDQUF2QixJQUFtQyxHQUFHLElBQUgsQ0FBUSxDQUFSLENBQW5DLEtBQWdELElBQUUsRUFBRSxLQUFKLEVBQVUsSUFBRSxFQUFFLFFBQWQsRUFBdUIsSUFBRSxFQUFFLFFBQTNCLEVBQW9DLEVBQUUsUUFBRixHQUFXLEVBQUUsUUFBRixHQUFXLEVBQUUsS0FBRixHQUFRLENBQWxFLEVBQW9FLElBQUUsRUFBRSxLQUF4RSxFQUE4RSxFQUFFLEtBQUYsR0FBUSxDQUF0RixFQUF3RixFQUFFLFFBQUYsR0FBVyxDQUFuRyxFQUFxRyxFQUFFLFFBQUYsR0FBVyxDQUFoSyxDQUExRixDQUFYLEVBQXlRLEtBQUssQ0FBTCxLQUFTLENBQVQsR0FBVyxJQUFFLEVBQWIsR0FBZ0IsQ0FBaFM7QUFBa1MsWUFBUyxFQUFULENBQVksQ0FBWixFQUFjLENBQWQsRUFBZ0I7QUFBQyxXQUFNLEVBQUMsS0FBSSxlQUFVO0FBQUMsZUFBTyxNQUFJLEtBQUssT0FBTyxLQUFLLEdBQXJCLEdBQXlCLENBQUMsS0FBSyxHQUFMLEdBQVMsQ0FBVixFQUFhLEtBQWIsQ0FBbUIsSUFBbkIsRUFBd0IsU0FBeEIsQ0FBaEM7QUFBbUUsT0FBbkYsRUFBTjtBQUEyRixPQUFJLEtBQUcsMkJBQVA7QUFBQSxNQUFtQyxLQUFHLEtBQXRDO0FBQUEsTUFBNEMsS0FBRyxFQUFDLFVBQVMsVUFBVixFQUFxQixZQUFXLFFBQWhDLEVBQXlDLFNBQVEsT0FBakQsRUFBL0M7QUFBQSxNQUF5RyxLQUFHLEVBQUMsZUFBYyxHQUFmLEVBQW1CLFlBQVcsS0FBOUIsRUFBNUc7QUFBQSxNQUFpSixLQUFHLENBQUMsUUFBRCxFQUFVLEtBQVYsRUFBZ0IsSUFBaEIsQ0FBcEo7QUFBQSxNQUEwSyxLQUFHLEVBQUUsYUFBRixDQUFnQixLQUFoQixFQUF1QixLQUFwTSxDQUEwTSxTQUFTLEVBQVQsQ0FBWSxDQUFaLEVBQWM7QUFBQyxRQUFHLEtBQUssRUFBUixFQUFXLE9BQU8sQ0FBUCxDQUFTLElBQUksSUFBRSxFQUFFLENBQUYsRUFBSyxXQUFMLEtBQW1CLEVBQUUsS0FBRixDQUFRLENBQVIsQ0FBekI7QUFBQSxRQUFvQyxJQUFFLEdBQUcsTUFBekMsQ0FBZ0QsT0FBTSxHQUFOO0FBQVUsVUFBRyxJQUFFLEdBQUcsQ0FBSCxJQUFNLENBQVIsRUFBVSxLQUFLLEVBQWxCLEVBQXFCLE9BQU8sQ0FBUDtBQUEvQjtBQUF3QyxZQUFTLEVBQVQsQ0FBWSxDQUFaLEVBQWM7QUFBQyxRQUFJLElBQUUsRUFBRSxRQUFGLENBQVcsQ0FBWCxDQUFOLENBQW9CLE9BQU8sTUFBSSxJQUFFLEVBQUUsUUFBRixDQUFXLENBQVgsSUFBYyxHQUFHLENBQUgsS0FBTyxDQUEzQixHQUE4QixDQUFyQztBQUF1QyxZQUFTLEVBQVQsQ0FBWSxDQUFaLEVBQWMsQ0FBZCxFQUFnQixDQUFoQixFQUFrQjtBQUFDLFFBQUksSUFBRSxHQUFHLElBQUgsQ0FBUSxDQUFSLENBQU4sQ0FBaUIsT0FBTyxJQUFFLEtBQUssR0FBTCxDQUFTLENBQVQsRUFBVyxFQUFFLENBQUYsS0FBTSxLQUFHLENBQVQsQ0FBWCxLQUF5QixFQUFFLENBQUYsS0FBTSxJQUEvQixDQUFGLEdBQXVDLENBQTlDO0FBQWdELFlBQVMsRUFBVCxDQUFZLENBQVosRUFBYyxDQUFkLEVBQWdCLENBQWhCLEVBQWtCLENBQWxCLEVBQW9CLENBQXBCLEVBQXNCO0FBQUMsUUFBSSxDQUFKO0FBQUEsUUFBTSxJQUFFLENBQVIsQ0FBVSxLQUFJLElBQUUsT0FBSyxJQUFFLFFBQUYsR0FBVyxTQUFoQixJQUEyQixDQUEzQixHQUE2QixZQUFVLENBQVYsR0FBWSxDQUFaLEdBQWMsQ0FBakQsRUFBbUQsSUFBRSxDQUFyRCxFQUF1RCxLQUFHLENBQTFEO0FBQTRELG1CQUFXLENBQVgsS0FBZSxLQUFHLEVBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxJQUFFLEdBQUcsQ0FBSCxDQUFWLEVBQWdCLENBQUMsQ0FBakIsRUFBbUIsQ0FBbkIsQ0FBbEIsR0FBeUMsS0FBRyxjQUFZLENBQVosS0FBZ0IsS0FBRyxFQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVEsWUFBVSxHQUFHLENBQUgsQ0FBbEIsRUFBd0IsQ0FBQyxDQUF6QixFQUEyQixDQUEzQixDQUFuQixHQUFrRCxhQUFXLENBQVgsS0FBZSxLQUFHLEVBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxXQUFTLEdBQUcsQ0FBSCxDQUFULEdBQWUsT0FBdkIsRUFBK0IsQ0FBQyxDQUFoQyxFQUFrQyxDQUFsQyxDQUFsQixDQUFyRCxLQUErRyxLQUFHLEVBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxZQUFVLEdBQUcsQ0FBSCxDQUFsQixFQUF3QixDQUFDLENBQXpCLEVBQTJCLENBQTNCLENBQUgsRUFBaUMsY0FBWSxDQUFaLEtBQWdCLEtBQUcsRUFBRSxHQUFGLENBQU0sQ0FBTixFQUFRLFdBQVMsR0FBRyxDQUFILENBQVQsR0FBZSxPQUF2QixFQUErQixDQUFDLENBQWhDLEVBQWtDLENBQWxDLENBQW5CLENBQWhKLENBQXpDO0FBQTVELEtBQStTLE9BQU8sQ0FBUDtBQUFTLFlBQVMsRUFBVCxDQUFZLENBQVosRUFBYyxDQUFkLEVBQWdCLENBQWhCLEVBQWtCO0FBQUMsUUFBSSxDQUFKO0FBQUEsUUFBTSxJQUFFLEdBQUcsQ0FBSCxDQUFSO0FBQUEsUUFBYyxJQUFFLEdBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLENBQWhCO0FBQUEsUUFBMEIsSUFBRSxpQkFBZSxFQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVEsV0FBUixFQUFvQixDQUFDLENBQXJCLEVBQXVCLENBQXZCLENBQTNDLENBQXFFLE9BQU8sR0FBRyxJQUFILENBQVEsQ0FBUixJQUFXLENBQVgsSUFBYyxJQUFFLE1BQUksRUFBRSxpQkFBRixNQUF1QixNQUFJLEVBQUUsS0FBRixDQUFRLENBQVIsQ0FBL0IsQ0FBRixFQUE2QyxXQUFTLENBQVQsS0FBYSxJQUFFLEVBQUUsV0FBUyxFQUFFLENBQUYsRUFBSyxXQUFMLEVBQVQsR0FBNEIsRUFBRSxLQUFGLENBQVEsQ0FBUixDQUE5QixDQUFmLENBQTdDLEVBQXVHLElBQUUsV0FBVyxDQUFYLEtBQWUsQ0FBeEgsRUFBMEgsSUFBRSxHQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sTUFBSSxJQUFFLFFBQUYsR0FBVyxTQUFmLENBQVAsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsQ0FBRixHQUF3QyxJQUFoTCxDQUFQO0FBQTZMLEtBQUUsTUFBRixDQUFTLEVBQUMsVUFBUyxFQUFDLFNBQVEsRUFBQyxLQUFJLGFBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLGNBQUcsQ0FBSCxFQUFLO0FBQUMsZ0JBQUksSUFBRSxHQUFHLENBQUgsRUFBSyxTQUFMLENBQU4sQ0FBc0IsT0FBTSxPQUFLLENBQUwsR0FBTyxHQUFQLEdBQVcsQ0FBakI7QUFBbUI7QUFBQyxTQUFuRSxFQUFULEVBQVYsRUFBeUYsV0FBVSxFQUFDLHlCQUF3QixDQUFDLENBQTFCLEVBQTRCLGFBQVksQ0FBQyxDQUF6QyxFQUEyQyxhQUFZLENBQUMsQ0FBeEQsRUFBMEQsVUFBUyxDQUFDLENBQXBFLEVBQXNFLFlBQVcsQ0FBQyxDQUFsRixFQUFvRixZQUFXLENBQUMsQ0FBaEcsRUFBa0csWUFBVyxDQUFDLENBQTlHLEVBQWdILFNBQVEsQ0FBQyxDQUF6SCxFQUEySCxPQUFNLENBQUMsQ0FBbEksRUFBb0ksU0FBUSxDQUFDLENBQTdJLEVBQStJLFFBQU8sQ0FBQyxDQUF2SixFQUF5SixRQUFPLENBQUMsQ0FBakssRUFBbUssTUFBSyxDQUFDLENBQXpLLEVBQW5HLEVBQStRLFVBQVMsRUFBQyxTQUFRLFVBQVQsRUFBeFIsRUFBNlMsT0FBTSxlQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUI7QUFBQyxVQUFHLEtBQUcsTUFBSSxFQUFFLFFBQVQsSUFBbUIsTUFBSSxFQUFFLFFBQXpCLElBQW1DLEVBQUUsS0FBeEMsRUFBOEM7QUFBQyxZQUFJLENBQUo7QUFBQSxZQUFNLENBQU47QUFBQSxZQUFRLENBQVI7QUFBQSxZQUFVLElBQUUsRUFBRSxTQUFGLENBQVksQ0FBWixDQUFaO0FBQUEsWUFBMkIsSUFBRSxHQUFHLElBQUgsQ0FBUSxDQUFSLENBQTdCO0FBQUEsWUFBd0MsSUFBRSxFQUFFLEtBQTVDLENBQWtELE9BQU8sTUFBSSxJQUFFLEdBQUcsQ0FBSCxDQUFOLEdBQWEsSUFBRSxFQUFFLFFBQUYsQ0FBVyxDQUFYLEtBQWUsRUFBRSxRQUFGLENBQVcsQ0FBWCxDQUE5QixFQUE0QyxLQUFLLENBQUwsS0FBUyxDQUFULEdBQVcsS0FBRyxTQUFRLENBQVgsSUFBYyxLQUFLLENBQUwsTUFBVSxJQUFFLEVBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxDQUFDLENBQVQsRUFBVyxDQUFYLENBQVosQ0FBZCxHQUF5QyxDQUF6QyxHQUEyQyxFQUFFLENBQUYsQ0FBdEQsSUFBNEQsV0FBUyxDQUFULHlDQUFTLENBQVQsR0FBVyxhQUFXLENBQVgsS0FBZSxJQUFFLEdBQUcsSUFBSCxDQUFRLENBQVIsQ0FBakIsS0FBOEIsRUFBRSxDQUFGLENBQTlCLEtBQXFDLElBQUUsR0FBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsQ0FBRixFQUFZLElBQUUsUUFBbkQsQ0FBWCxFQUF3RSxRQUFNLENBQU4sSUFBUyxNQUFJLENBQWIsS0FBaUIsYUFBVyxDQUFYLEtBQWUsS0FBRyxLQUFHLEVBQUUsQ0FBRixDQUFILEtBQVUsRUFBRSxTQUFGLENBQVksQ0FBWixJQUFlLEVBQWYsR0FBa0IsSUFBNUIsQ0FBbEIsR0FBcUQsRUFBRSxlQUFGLElBQW1CLE9BQUssQ0FBeEIsSUFBMkIsTUFBSSxFQUFFLE9BQUYsQ0FBVSxZQUFWLENBQS9CLEtBQXlELEVBQUUsQ0FBRixJQUFLLFNBQTlELENBQXJELEVBQThILEtBQUcsU0FBUSxDQUFYLElBQWMsS0FBSyxDQUFMLE1BQVUsSUFBRSxFQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVEsQ0FBUixFQUFVLENBQVYsQ0FBWixDQUFkLEtBQTBDLElBQUUsRUFBRSxXQUFGLENBQWMsQ0FBZCxFQUFnQixDQUFoQixDQUFGLEdBQXFCLEVBQUUsQ0FBRixJQUFLLENBQXBFLENBQS9JLENBQXhFLEVBQStSLEtBQUssQ0FBaFcsQ0FBbkQ7QUFBc1o7QUFBQyxLQUE3ekIsRUFBOHpCLEtBQUksYUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCO0FBQUMsVUFBSSxDQUFKO0FBQUEsVUFBTSxDQUFOO0FBQUEsVUFBUSxDQUFSO0FBQUEsVUFBVSxJQUFFLEVBQUUsU0FBRixDQUFZLENBQVosQ0FBWjtBQUFBLFVBQTJCLElBQUUsR0FBRyxJQUFILENBQVEsQ0FBUixDQUE3QixDQUF3QyxPQUFPLE1BQUksSUFBRSxHQUFHLENBQUgsQ0FBTixHQUFhLElBQUUsRUFBRSxRQUFGLENBQVcsQ0FBWCxLQUFlLEVBQUUsUUFBRixDQUFXLENBQVgsQ0FBOUIsRUFBNEMsS0FBRyxTQUFRLENBQVgsS0FBZSxJQUFFLEVBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxDQUFDLENBQVQsRUFBVyxDQUFYLENBQWpCLENBQTVDLEVBQTRFLEtBQUssQ0FBTCxLQUFTLENBQVQsS0FBYSxJQUFFLEdBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLENBQWYsQ0FBNUUsRUFBc0csYUFBVyxDQUFYLElBQWMsS0FBSyxFQUFuQixLQUF3QixJQUFFLEdBQUcsQ0FBSCxDQUExQixDQUF0RyxFQUF1SSxPQUFLLENBQUwsSUFBUSxDQUFSLElBQVcsSUFBRSxXQUFXLENBQVgsQ0FBRixFQUFnQixNQUFJLENBQUMsQ0FBTCxJQUFRLFNBQVMsQ0FBVCxDQUFSLEdBQW9CLEtBQUcsQ0FBdkIsR0FBeUIsQ0FBcEQsSUFBdUQsQ0FBck07QUFBdU0sS0FBbmtDLEVBQVQsR0FBK2tDLEVBQUUsSUFBRixDQUFPLENBQUMsUUFBRCxFQUFVLE9BQVYsQ0FBUCxFQUEwQixVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxNQUFFLFFBQUYsQ0FBVyxDQUFYLElBQWMsRUFBQyxLQUFJLGFBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWU7QUFBQyxZQUFHLENBQUgsRUFBSyxPQUFNLENBQUMsR0FBRyxJQUFILENBQVEsRUFBRSxHQUFGLENBQU0sQ0FBTixFQUFRLFNBQVIsQ0FBUixDQUFELElBQThCLEVBQUUsY0FBRixHQUFtQixNQUFuQixJQUEyQixFQUFFLHFCQUFGLEdBQTBCLEtBQW5GLEdBQXlGLEdBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLENBQXpGLEdBQW1HLEdBQUcsQ0FBSCxFQUFLLEVBQUwsRUFBUSxZQUFVO0FBQUMsaUJBQU8sR0FBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsQ0FBUDtBQUFpQixTQUFwQyxDQUF6RztBQUErSSxPQUF6SyxFQUEwSyxLQUFJLGFBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWU7QUFBQyxZQUFJLENBQUo7QUFBQSxZQUFNLElBQUUsS0FBRyxHQUFHLENBQUgsQ0FBWDtBQUFBLFlBQWlCLElBQUUsS0FBRyxHQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLGlCQUFlLEVBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxXQUFSLEVBQW9CLENBQUMsQ0FBckIsRUFBdUIsQ0FBdkIsQ0FBeEIsRUFBa0QsQ0FBbEQsQ0FBdEIsQ0FBMkUsT0FBTyxNQUFJLElBQUUsR0FBRyxJQUFILENBQVEsQ0FBUixDQUFOLEtBQW1CLFVBQVEsRUFBRSxDQUFGLEtBQU0sSUFBZCxDQUFuQixLQUF5QyxFQUFFLEtBQUYsQ0FBUSxDQUFSLElBQVcsQ0FBWCxFQUFhLElBQUUsRUFBRSxHQUFGLENBQU0sQ0FBTixFQUFRLENBQVIsQ0FBeEQsR0FBb0UsR0FBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsQ0FBM0U7QUFBcUYsT0FBOVYsRUFBZDtBQUE4VyxHQUF0WixDQUEva0MsRUFBdStDLEVBQUUsUUFBRixDQUFXLFVBQVgsR0FBc0IsR0FBRyxFQUFFLGtCQUFMLEVBQXdCLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFFBQUcsQ0FBSCxFQUFLLE9BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBSCxFQUFLLFlBQUwsQ0FBWCxLQUFnQyxFQUFFLHFCQUFGLEdBQTBCLElBQTFCLEdBQStCLEdBQUcsQ0FBSCxFQUFLLEVBQUMsWUFBVyxDQUFaLEVBQUwsRUFBb0IsWUFBVTtBQUFDLGFBQU8sRUFBRSxxQkFBRixHQUEwQixJQUFqQztBQUFzQyxLQUFyRSxDQUFoRSxJQUF3SSxJQUE5STtBQUFtSixHQUE5TCxDQUE3L0MsRUFBNnJELEVBQUUsSUFBRixDQUFPLEVBQUMsUUFBTyxFQUFSLEVBQVcsU0FBUSxFQUFuQixFQUFzQixRQUFPLE9BQTdCLEVBQVAsRUFBNkMsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsTUFBRSxRQUFGLENBQVcsSUFBRSxDQUFiLElBQWdCLEVBQUMsUUFBTyxnQkFBUyxDQUFULEVBQVc7QUFBQyxhQUFJLElBQUksSUFBRSxDQUFOLEVBQVEsSUFBRSxFQUFWLEVBQWEsSUFBRSxZQUFVLE9BQU8sQ0FBakIsR0FBbUIsRUFBRSxLQUFGLENBQVEsR0FBUixDQUFuQixHQUFnQyxDQUFDLENBQUQsQ0FBbkQsRUFBdUQsSUFBRSxDQUF6RCxFQUEyRCxHQUEzRDtBQUErRCxZQUFFLElBQUUsR0FBRyxDQUFILENBQUYsR0FBUSxDQUFWLElBQWEsRUFBRSxDQUFGLEtBQU0sRUFBRSxJQUFFLENBQUosQ0FBTixJQUFjLEVBQUUsQ0FBRixDQUEzQjtBQUEvRCxTQUErRixPQUFPLENBQVA7QUFBUyxPQUE1SCxFQUFoQixFQUE4SSxHQUFHLElBQUgsQ0FBUSxDQUFSLE1BQWEsRUFBRSxRQUFGLENBQVcsSUFBRSxDQUFiLEVBQWdCLEdBQWhCLEdBQW9CLEVBQWpDLENBQTlJO0FBQW1MLEdBQTlPLENBQTdyRCxFQUE2NkQsRUFBRSxFQUFGLENBQUssTUFBTCxDQUFZLEVBQUMsS0FBSSxhQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxhQUFPLEVBQUUsSUFBRixFQUFPLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWU7QUFBQyxZQUFJLENBQUo7QUFBQSxZQUFNLENBQU47QUFBQSxZQUFRLElBQUUsRUFBVjtBQUFBLFlBQWEsSUFBRSxDQUFmLENBQWlCLElBQUcsTUFBTSxPQUFOLENBQWMsQ0FBZCxDQUFILEVBQW9CO0FBQUMsZUFBSSxJQUFFLEdBQUcsQ0FBSCxDQUFGLEVBQVEsSUFBRSxFQUFFLE1BQWhCLEVBQXVCLElBQUUsQ0FBekIsRUFBMkIsR0FBM0I7QUFBK0IsY0FBRSxFQUFFLENBQUYsQ0FBRixJQUFRLEVBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxFQUFFLENBQUYsQ0FBUixFQUFhLENBQUMsQ0FBZCxFQUFnQixDQUFoQixDQUFSO0FBQS9CLFdBQTBELE9BQU8sQ0FBUDtBQUFTLGdCQUFPLEtBQUssQ0FBTCxLQUFTLENBQVQsR0FBVyxFQUFFLEtBQUYsQ0FBUSxDQUFSLEVBQVUsQ0FBVixFQUFZLENBQVosQ0FBWCxHQUEwQixFQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVEsQ0FBUixDQUFqQztBQUE0QyxPQUE1SyxFQUE2SyxDQUE3SyxFQUErSyxDQUEvSyxFQUFpTCxVQUFVLE1BQVYsR0FBaUIsQ0FBbE0sQ0FBUDtBQUE0TSxLQUEvTixFQUFaLENBQTc2RCxDQUEycEUsU0FBUyxFQUFULENBQVksQ0FBWixFQUFjLENBQWQsRUFBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEIsRUFBb0IsQ0FBcEIsRUFBc0I7QUFBQyxXQUFPLElBQUksR0FBRyxTQUFILENBQWEsSUFBakIsQ0FBc0IsQ0FBdEIsRUFBd0IsQ0FBeEIsRUFBMEIsQ0FBMUIsRUFBNEIsQ0FBNUIsRUFBOEIsQ0FBOUIsQ0FBUDtBQUF3QyxLQUFFLEtBQUYsR0FBUSxFQUFSLEVBQVcsR0FBRyxTQUFILEdBQWEsRUFBQyxhQUFZLEVBQWIsRUFBZ0IsTUFBSyxjQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUI7QUFBQyxXQUFLLElBQUwsR0FBVSxDQUFWLEVBQVksS0FBSyxJQUFMLEdBQVUsQ0FBdEIsRUFBd0IsS0FBSyxNQUFMLEdBQVksS0FBRyxFQUFFLE1BQUYsQ0FBUyxRQUFoRCxFQUF5RCxLQUFLLE9BQUwsR0FBYSxDQUF0RSxFQUF3RSxLQUFLLEtBQUwsR0FBVyxLQUFLLEdBQUwsR0FBUyxLQUFLLEdBQUwsRUFBNUYsRUFBdUcsS0FBSyxHQUFMLEdBQVMsQ0FBaEgsRUFBa0gsS0FBSyxJQUFMLEdBQVUsTUFBSSxFQUFFLFNBQUYsQ0FBWSxDQUFaLElBQWUsRUFBZixHQUFrQixJQUF0QixDQUE1SDtBQUF3SixLQUFuTSxFQUFvTSxLQUFJLGVBQVU7QUFBQyxVQUFJLElBQUUsR0FBRyxTQUFILENBQWEsS0FBSyxJQUFsQixDQUFOLENBQThCLE9BQU8sS0FBRyxFQUFFLEdBQUwsR0FBUyxFQUFFLEdBQUYsQ0FBTSxJQUFOLENBQVQsR0FBcUIsR0FBRyxTQUFILENBQWEsUUFBYixDQUFzQixHQUF0QixDQUEwQixJQUExQixDQUE1QjtBQUE0RCxLQUE3UyxFQUE4UyxLQUFJLGFBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBSSxDQUFKO0FBQUEsVUFBTSxJQUFFLEdBQUcsU0FBSCxDQUFhLEtBQUssSUFBbEIsQ0FBUixDQUFnQyxPQUFPLEtBQUssT0FBTCxDQUFhLFFBQWIsR0FBc0IsS0FBSyxHQUFMLEdBQVMsSUFBRSxFQUFFLE1BQUYsQ0FBUyxLQUFLLE1BQWQsRUFBc0IsQ0FBdEIsRUFBd0IsS0FBSyxPQUFMLENBQWEsUUFBYixHQUFzQixDQUE5QyxFQUFnRCxDQUFoRCxFQUFrRCxDQUFsRCxFQUFvRCxLQUFLLE9BQUwsQ0FBYSxRQUFqRSxDQUFqQyxHQUE0RyxLQUFLLEdBQUwsR0FBUyxJQUFFLENBQXZILEVBQXlILEtBQUssR0FBTCxHQUFTLENBQUMsS0FBSyxHQUFMLEdBQVMsS0FBSyxLQUFmLElBQXNCLENBQXRCLEdBQXdCLEtBQUssS0FBL0osRUFBcUssS0FBSyxPQUFMLENBQWEsSUFBYixJQUFtQixLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLElBQWxCLENBQXVCLEtBQUssSUFBNUIsRUFBaUMsS0FBSyxHQUF0QyxFQUEwQyxJQUExQyxDQUF4TCxFQUF3TyxLQUFHLEVBQUUsR0FBTCxHQUFTLEVBQUUsR0FBRixDQUFNLElBQU4sQ0FBVCxHQUFxQixHQUFHLFNBQUgsQ0FBYSxRQUFiLENBQXNCLEdBQXRCLENBQTBCLElBQTFCLENBQTdQLEVBQTZSLElBQXBTO0FBQXlTLEtBQXZvQixFQUF4QixFQUFpcUIsR0FBRyxTQUFILENBQWEsSUFBYixDQUFrQixTQUFsQixHQUE0QixHQUFHLFNBQWhzQixFQUEwc0IsR0FBRyxTQUFILEdBQWEsRUFBQyxVQUFTLEVBQUMsS0FBSSxhQUFTLENBQVQsRUFBVztBQUFDLFlBQUksQ0FBSixDQUFNLE9BQU8sTUFBSSxFQUFFLElBQUYsQ0FBTyxRQUFYLElBQXFCLFFBQU0sRUFBRSxJQUFGLENBQU8sRUFBRSxJQUFULENBQU4sSUFBc0IsUUFBTSxFQUFFLElBQUYsQ0FBTyxLQUFQLENBQWEsRUFBRSxJQUFmLENBQWpELEdBQXNFLEVBQUUsSUFBRixDQUFPLEVBQUUsSUFBVCxDQUF0RSxJQUFzRixJQUFFLEVBQUUsR0FBRixDQUFNLEVBQUUsSUFBUixFQUFhLEVBQUUsSUFBZixFQUFvQixFQUFwQixDQUFGLEVBQTBCLEtBQUcsV0FBUyxDQUFaLEdBQWMsQ0FBZCxHQUFnQixDQUFoSSxDQUFQO0FBQTBJLE9BQWpLLEVBQWtLLEtBQUksYUFBUyxDQUFULEVBQVc7QUFBQyxVQUFFLEVBQUYsQ0FBSyxJQUFMLENBQVUsRUFBRSxJQUFaLElBQWtCLEVBQUUsRUFBRixDQUFLLElBQUwsQ0FBVSxFQUFFLElBQVosRUFBa0IsQ0FBbEIsQ0FBbEIsR0FBdUMsTUFBSSxFQUFFLElBQUYsQ0FBTyxRQUFYLElBQXFCLFFBQU0sRUFBRSxJQUFGLENBQU8sS0FBUCxDQUFhLEVBQUUsUUFBRixDQUFXLEVBQUUsSUFBYixDQUFiLENBQU4sSUFBd0MsQ0FBQyxFQUFFLFFBQUYsQ0FBVyxFQUFFLElBQWIsQ0FBOUQsR0FBaUYsRUFBRSxJQUFGLENBQU8sRUFBRSxJQUFULElBQWUsRUFBRSxHQUFsRyxHQUFzRyxFQUFFLEtBQUYsQ0FBUSxFQUFFLElBQVYsRUFBZSxFQUFFLElBQWpCLEVBQXNCLEVBQUUsR0FBRixHQUFNLEVBQUUsSUFBOUIsQ0FBN0k7QUFBaUwsT0FBblcsRUFBVixFQUF2dEIsRUFBdWtDLEdBQUcsU0FBSCxDQUFhLFNBQWIsR0FBdUIsR0FBRyxTQUFILENBQWEsVUFBYixHQUF3QixFQUFDLEtBQUksYUFBUyxDQUFULEVBQVc7QUFBQyxRQUFFLElBQUYsQ0FBTyxRQUFQLElBQWlCLEVBQUUsSUFBRixDQUFPLFVBQXhCLEtBQXFDLEVBQUUsSUFBRixDQUFPLEVBQUUsSUFBVCxJQUFlLEVBQUUsR0FBdEQ7QUFBMkQsS0FBNUUsRUFBdG5DLEVBQW9zQyxFQUFFLE1BQUYsR0FBUyxFQUFDLFFBQU8sZ0JBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxDQUFQO0FBQVMsS0FBN0IsRUFBOEIsT0FBTSxlQUFTLENBQVQsRUFBVztBQUFDLGFBQU0sS0FBRyxLQUFLLEdBQUwsQ0FBUyxJQUFFLEtBQUssRUFBaEIsSUFBb0IsQ0FBN0I7QUFBK0IsS0FBL0UsRUFBZ0YsVUFBUyxPQUF6RixFQUE3c0MsRUFBK3lDLEVBQUUsRUFBRixHQUFLLEdBQUcsU0FBSCxDQUFhLElBQWowQyxFQUFzMEMsRUFBRSxFQUFGLENBQUssSUFBTCxHQUFVLEVBQWgxQyxDQUFtMUMsSUFBSSxFQUFKO0FBQUEsTUFBTyxFQUFQO0FBQUEsTUFBVSxLQUFHLHdCQUFiO0FBQUEsTUFBc0MsS0FBRyxhQUF6QyxDQUF1RCxTQUFTLEVBQVQsR0FBYTtBQUFDLFdBQUssRUFBRSxNQUFGLEtBQVcsQ0FBQyxDQUFaLElBQWUsRUFBRSxxQkFBakIsR0FBdUMsRUFBRSxxQkFBRixDQUF3QixFQUF4QixDQUF2QyxHQUFtRSxFQUFFLFVBQUYsQ0FBYSxFQUFiLEVBQWdCLEVBQUUsRUFBRixDQUFLLFFBQXJCLENBQW5FLEVBQWtHLEVBQUUsRUFBRixDQUFLLElBQUwsRUFBdkc7QUFBb0gsWUFBUyxFQUFULEdBQWE7QUFBQyxXQUFPLEVBQUUsVUFBRixDQUFhLFlBQVU7QUFBQyxXQUFHLEtBQUssQ0FBUjtBQUFVLEtBQWxDLEdBQW9DLEtBQUcsRUFBRSxHQUFGLEVBQTlDO0FBQXNELFlBQVMsRUFBVCxDQUFZLENBQVosRUFBYyxDQUFkLEVBQWdCO0FBQUMsUUFBSSxDQUFKO0FBQUEsUUFBTSxJQUFFLENBQVI7QUFBQSxRQUFVLElBQUUsRUFBQyxRQUFPLENBQVIsRUFBWixDQUF1QixLQUFJLElBQUUsSUFBRSxDQUFGLEdBQUksQ0FBVixFQUFZLElBQUUsQ0FBZCxFQUFnQixLQUFHLElBQUUsQ0FBckI7QUFBdUIsVUFBRSxHQUFHLENBQUgsQ0FBRixFQUFRLEVBQUUsV0FBUyxDQUFYLElBQWMsRUFBRSxZQUFVLENBQVosSUFBZSxDQUFyQztBQUF2QixLQUE4RCxPQUFPLE1BQUksRUFBRSxPQUFGLEdBQVUsRUFBRSxLQUFGLEdBQVEsQ0FBdEIsR0FBeUIsQ0FBaEM7QUFBa0MsWUFBUyxFQUFULENBQVksQ0FBWixFQUFjLENBQWQsRUFBZ0IsQ0FBaEIsRUFBa0I7QUFBQyxTQUFJLElBQUksQ0FBSixFQUFNLElBQUUsQ0FBQyxHQUFHLFFBQUgsQ0FBWSxDQUFaLEtBQWdCLEVBQWpCLEVBQXFCLE1BQXJCLENBQTRCLEdBQUcsUUFBSCxDQUFZLEdBQVosQ0FBNUIsQ0FBUixFQUFzRCxJQUFFLENBQXhELEVBQTBELElBQUUsRUFBRSxNQUFsRSxFQUF5RSxJQUFFLENBQTNFLEVBQTZFLEdBQTdFO0FBQWlGLFVBQUcsSUFBRSxFQUFFLENBQUYsRUFBSyxJQUFMLENBQVUsQ0FBVixFQUFZLENBQVosRUFBYyxDQUFkLENBQUwsRUFBc0IsT0FBTyxDQUFQO0FBQXZHO0FBQWdILFlBQVMsRUFBVCxDQUFZLENBQVosRUFBYyxDQUFkLEVBQWdCLENBQWhCLEVBQWtCO0FBQUMsUUFBSSxDQUFKO0FBQUEsUUFBTSxDQUFOO0FBQUEsUUFBUSxDQUFSO0FBQUEsUUFBVSxDQUFWO0FBQUEsUUFBWSxDQUFaO0FBQUEsUUFBYyxDQUFkO0FBQUEsUUFBZ0IsQ0FBaEI7QUFBQSxRQUFrQixDQUFsQjtBQUFBLFFBQW9CLElBQUUsV0FBVSxDQUFWLElBQWEsWUFBVyxDQUE5QztBQUFBLFFBQWdELElBQUUsSUFBbEQ7QUFBQSxRQUF1RCxJQUFFLEVBQXpEO0FBQUEsUUFBNEQsSUFBRSxFQUFFLEtBQWhFO0FBQUEsUUFBc0UsSUFBRSxFQUFFLFFBQUYsSUFBWSxHQUFHLENBQUgsQ0FBcEY7QUFBQSxRQUEwRixJQUFFLEVBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxRQUFSLENBQTVGLENBQThHLEVBQUUsS0FBRixLQUFVLElBQUUsRUFBRSxXQUFGLENBQWMsQ0FBZCxFQUFnQixJQUFoQixDQUFGLEVBQXdCLFFBQU0sRUFBRSxRQUFSLEtBQW1CLEVBQUUsUUFBRixHQUFXLENBQVgsRUFBYSxJQUFFLEVBQUUsS0FBRixDQUFRLElBQXZCLEVBQTRCLEVBQUUsS0FBRixDQUFRLElBQVIsR0FBYSxZQUFVO0FBQUMsUUFBRSxRQUFGLElBQVksR0FBWjtBQUFnQixLQUF2RixDQUF4QixFQUFpSCxFQUFFLFFBQUYsRUFBakgsRUFBOEgsRUFBRSxNQUFGLENBQVMsWUFBVTtBQUFDLFFBQUUsTUFBRixDQUFTLFlBQVU7QUFBQyxVQUFFLFFBQUYsSUFBYSxFQUFFLEtBQUYsQ0FBUSxDQUFSLEVBQVUsSUFBVixFQUFnQixNQUFoQixJQUF3QixFQUFFLEtBQUYsQ0FBUSxJQUFSLEVBQXJDO0FBQW9ELE9BQXhFO0FBQTBFLEtBQTlGLENBQXhJLEVBQXlPLEtBQUksQ0FBSixJQUFTLENBQVQ7QUFBVyxVQUFHLElBQUUsRUFBRSxDQUFGLENBQUYsRUFBTyxHQUFHLElBQUgsQ0FBUSxDQUFSLENBQVYsRUFBcUI7QUFBQyxZQUFHLE9BQU8sRUFBRSxDQUFGLENBQVAsRUFBWSxJQUFFLEtBQUcsYUFBVyxDQUE1QixFQUE4QixPQUFLLElBQUUsTUFBRixHQUFTLE1BQWQsQ0FBakMsRUFBdUQ7QUFBQyxjQUFHLFdBQVMsQ0FBVCxJQUFZLENBQUMsQ0FBYixJQUFnQixLQUFLLENBQUwsS0FBUyxFQUFFLENBQUYsQ0FBNUIsRUFBaUMsU0FBUyxJQUFFLENBQUMsQ0FBSDtBQUFLLFdBQUUsQ0FBRixJQUFLLEtBQUcsRUFBRSxDQUFGLENBQUgsSUFBUyxFQUFFLEtBQUYsQ0FBUSxDQUFSLEVBQVUsQ0FBVixDQUFkO0FBQTJCO0FBQW5LLEtBQW1LLElBQUcsSUFBRSxDQUFDLEVBQUUsYUFBRixDQUFnQixDQUFoQixDQUFILEVBQXNCLEtBQUcsQ0FBQyxFQUFFLGFBQUYsQ0FBZ0IsQ0FBaEIsQ0FBN0IsRUFBZ0Q7QUFBQyxXQUFHLE1BQUksRUFBRSxRQUFULEtBQW9CLEVBQUUsUUFBRixHQUFXLENBQUMsRUFBRSxRQUFILEVBQVksRUFBRSxTQUFkLEVBQXdCLEVBQUUsU0FBMUIsQ0FBWCxFQUFnRCxJQUFFLEtBQUcsRUFBRSxPQUF2RCxFQUErRCxRQUFNLENBQU4sS0FBVSxJQUFFLEVBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxTQUFSLENBQVosQ0FBL0QsRUFBK0YsSUFBRSxFQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVEsU0FBUixDQUFqRyxFQUFvSCxXQUFTLENBQVQsS0FBYSxJQUFFLElBQUUsQ0FBSixJQUFPLEdBQUcsQ0FBQyxDQUFELENBQUgsRUFBTyxDQUFDLENBQVIsR0FBVyxJQUFFLEVBQUUsS0FBRixDQUFRLE9BQVIsSUFBaUIsQ0FBOUIsRUFBZ0MsSUFBRSxFQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVEsU0FBUixDQUFsQyxFQUFxRCxHQUFHLENBQUMsQ0FBRCxDQUFILENBQTVELENBQWIsQ0FBcEgsRUFBdU0sQ0FBQyxhQUFXLENBQVgsSUFBYyxtQkFBaUIsQ0FBakIsSUFBb0IsUUFBTSxDQUF6QyxLQUE2QyxXQUFTLEVBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxPQUFSLENBQXRELEtBQXlFLE1BQUksRUFBRSxJQUFGLENBQU8sWUFBVTtBQUFDLFVBQUUsT0FBRixHQUFVLENBQVY7QUFBWSxPQUE5QixHQUFnQyxRQUFNLENBQU4sS0FBVSxJQUFFLEVBQUUsT0FBSixFQUFZLElBQUUsV0FBUyxDQUFULEdBQVcsRUFBWCxHQUFjLENBQXRDLENBQXBDLEdBQThFLEVBQUUsT0FBRixHQUFVLGNBQWpLLENBQTNOLEdBQTZZLEVBQUUsUUFBRixLQUFhLEVBQUUsUUFBRixHQUFXLFFBQVgsRUFBb0IsRUFBRSxNQUFGLENBQVMsWUFBVTtBQUFDLFVBQUUsUUFBRixHQUFXLEVBQUUsUUFBRixDQUFXLENBQVgsQ0FBWCxFQUF5QixFQUFFLFNBQUYsR0FBWSxFQUFFLFFBQUYsQ0FBVyxDQUFYLENBQXJDLEVBQW1ELEVBQUUsU0FBRixHQUFZLEVBQUUsUUFBRixDQUFXLENBQVgsQ0FBL0Q7QUFBNkUsT0FBakcsQ0FBakMsQ0FBN1ksRUFBa2hCLElBQUUsQ0FBQyxDQUFyaEIsQ0FBdWhCLEtBQUksQ0FBSixJQUFTLENBQVQ7QUFBVyxjQUFJLElBQUUsWUFBVyxDQUFYLEtBQWUsSUFBRSxFQUFFLE1BQW5CLENBQUYsR0FBNkIsSUFBRSxFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsUUFBWCxFQUFvQixFQUFDLFNBQVEsQ0FBVCxFQUFwQixDQUEvQixFQUFnRSxNQUFJLEVBQUUsTUFBRixHQUFTLENBQUMsQ0FBZCxDQUFoRSxFQUFpRixLQUFHLEdBQUcsQ0FBQyxDQUFELENBQUgsRUFBTyxDQUFDLENBQVIsQ0FBcEYsRUFBK0YsRUFBRSxJQUFGLENBQU8sWUFBVTtBQUFDLGVBQUcsR0FBRyxDQUFDLENBQUQsQ0FBSCxDQUFILEVBQVcsRUFBRSxNQUFGLENBQVMsQ0FBVCxFQUFXLFFBQVgsQ0FBWCxDQUFnQyxLQUFJLENBQUosSUFBUyxDQUFUO0FBQVcsY0FBRSxLQUFGLENBQVEsQ0FBUixFQUFVLENBQVYsRUFBWSxFQUFFLENBQUYsQ0FBWjtBQUFYO0FBQTZCLFNBQS9FLENBQW5HLEdBQXFMLElBQUUsR0FBRyxJQUFFLEVBQUUsQ0FBRixDQUFGLEdBQU8sQ0FBVixFQUFZLENBQVosRUFBYyxDQUFkLENBQXZMLEVBQXdNLEtBQUssQ0FBTCxLQUFTLEVBQUUsQ0FBRixJQUFLLEVBQUUsS0FBUCxFQUFhLE1BQUksRUFBRSxHQUFGLEdBQU0sRUFBRSxLQUFSLEVBQWMsRUFBRSxLQUFGLEdBQVEsQ0FBMUIsQ0FBdEIsQ0FBeE07QUFBWDtBQUF1UTtBQUFDLFlBQVMsRUFBVCxDQUFZLENBQVosRUFBYyxDQUFkLEVBQWdCO0FBQUMsUUFBSSxDQUFKLEVBQU0sQ0FBTixFQUFRLENBQVIsRUFBVSxDQUFWLEVBQVksQ0FBWixDQUFjLEtBQUksQ0FBSixJQUFTLENBQVQ7QUFBVyxVQUFHLElBQUUsRUFBRSxTQUFGLENBQVksQ0FBWixDQUFGLEVBQWlCLElBQUUsRUFBRSxDQUFGLENBQW5CLEVBQXdCLElBQUUsRUFBRSxDQUFGLENBQTFCLEVBQStCLE1BQU0sT0FBTixDQUFjLENBQWQsTUFBbUIsSUFBRSxFQUFFLENBQUYsQ0FBRixFQUFPLElBQUUsRUFBRSxDQUFGLElBQUssRUFBRSxDQUFGLENBQWpDLENBQS9CLEVBQXNFLE1BQUksQ0FBSixLQUFRLEVBQUUsQ0FBRixJQUFLLENBQUwsRUFBTyxPQUFPLEVBQUUsQ0FBRixDQUF0QixDQUF0RSxFQUFrRyxJQUFFLEVBQUUsUUFBRixDQUFXLENBQVgsQ0FBcEcsRUFBa0gsS0FBRyxZQUFXLENBQW5JLEVBQXFJO0FBQUMsWUFBRSxFQUFFLE1BQUYsQ0FBUyxDQUFULENBQUYsRUFBYyxPQUFPLEVBQUUsQ0FBRixDQUFyQixDQUEwQixLQUFJLENBQUosSUFBUyxDQUFUO0FBQVcsZUFBSyxDQUFMLEtBQVMsRUFBRSxDQUFGLElBQUssRUFBRSxDQUFGLENBQUwsRUFBVSxFQUFFLENBQUYsSUFBSyxDQUF4QjtBQUFYO0FBQXNDLE9BQXRNLE1BQTJNLEVBQUUsQ0FBRixJQUFLLENBQUw7QUFBdE47QUFBNk4sWUFBUyxFQUFULENBQVksQ0FBWixFQUFjLENBQWQsRUFBZ0IsQ0FBaEIsRUFBa0I7QUFBQyxRQUFJLENBQUo7QUFBQSxRQUFNLENBQU47QUFBQSxRQUFRLElBQUUsQ0FBVjtBQUFBLFFBQVksSUFBRSxHQUFHLFVBQUgsQ0FBYyxNQUE1QjtBQUFBLFFBQW1DLElBQUUsRUFBRSxRQUFGLEdBQWEsTUFBYixDQUFvQixZQUFVO0FBQUMsYUFBTyxFQUFFLElBQVQ7QUFBYyxLQUE3QyxDQUFyQztBQUFBLFFBQW9GLElBQUUsYUFBVTtBQUFDLFVBQUcsQ0FBSCxFQUFLLE9BQU0sQ0FBQyxDQUFQLENBQVMsS0FBSSxJQUFJLElBQUUsTUFBSSxJQUFWLEVBQWUsSUFBRSxLQUFLLEdBQUwsQ0FBUyxDQUFULEVBQVcsRUFBRSxTQUFGLEdBQVksRUFBRSxRQUFkLEdBQXVCLENBQWxDLENBQWpCLEVBQXNELElBQUUsSUFBRSxFQUFFLFFBQUosSUFBYyxDQUF0RSxFQUF3RSxJQUFFLElBQUUsQ0FBNUUsRUFBOEUsSUFBRSxDQUFoRixFQUFrRixJQUFFLEVBQUUsTUFBRixDQUFTLE1BQWpHLEVBQXdHLElBQUUsQ0FBMUcsRUFBNEcsR0FBNUc7QUFBZ0gsVUFBRSxNQUFGLENBQVMsQ0FBVCxFQUFZLEdBQVosQ0FBZ0IsQ0FBaEI7QUFBaEgsT0FBbUksT0FBTyxFQUFFLFVBQUYsQ0FBYSxDQUFiLEVBQWUsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsQ0FBZixHQUF3QixJQUFFLENBQUYsSUFBSyxDQUFMLEdBQU8sQ0FBUCxJQUFVLEtBQUcsRUFBRSxVQUFGLENBQWEsQ0FBYixFQUFlLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLENBQWYsQ0FBSCxFQUEyQixFQUFFLFdBQUYsQ0FBYyxDQUFkLEVBQWdCLENBQUMsQ0FBRCxDQUFoQixDQUEzQixFQUFnRCxDQUFDLENBQTNELENBQS9CO0FBQTZGLEtBQS9VO0FBQUEsUUFBZ1YsSUFBRSxFQUFFLE9BQUYsQ0FBVSxFQUFDLE1BQUssQ0FBTixFQUFRLE9BQU0sRUFBRSxNQUFGLENBQVMsRUFBVCxFQUFZLENBQVosQ0FBZCxFQUE2QixNQUFLLEVBQUUsTUFBRixDQUFTLENBQUMsQ0FBVixFQUFZLEVBQUMsZUFBYyxFQUFmLEVBQWtCLFFBQU8sRUFBRSxNQUFGLENBQVMsUUFBbEMsRUFBWixFQUF3RCxDQUF4RCxDQUFsQyxFQUE2RixvQkFBbUIsQ0FBaEgsRUFBa0gsaUJBQWdCLENBQWxJLEVBQW9JLFdBQVUsTUFBSSxJQUFsSixFQUF1SixVQUFTLEVBQUUsUUFBbEssRUFBMkssUUFBTyxFQUFsTCxFQUFxTCxhQUFZLHFCQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxZQUFJLElBQUUsRUFBRSxLQUFGLENBQVEsQ0FBUixFQUFVLEVBQUUsSUFBWixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixFQUFFLElBQUYsQ0FBTyxhQUFQLENBQXFCLENBQXJCLEtBQXlCLEVBQUUsSUFBRixDQUFPLE1BQXJELENBQU4sQ0FBbUUsT0FBTyxFQUFFLE1BQUYsQ0FBUyxJQUFULENBQWMsQ0FBZCxHQUFpQixDQUF4QjtBQUEwQixPQUE1UyxFQUE2UyxNQUFLLGNBQVMsQ0FBVCxFQUFXO0FBQUMsWUFBSSxJQUFFLENBQU47QUFBQSxZQUFRLElBQUUsSUFBRSxFQUFFLE1BQUYsQ0FBUyxNQUFYLEdBQWtCLENBQTVCLENBQThCLElBQUcsQ0FBSCxFQUFLLE9BQU8sSUFBUCxDQUFZLEtBQUksSUFBRSxDQUFDLENBQVAsRUFBUyxJQUFFLENBQVgsRUFBYSxHQUFiO0FBQWlCLFlBQUUsTUFBRixDQUFTLENBQVQsRUFBWSxHQUFaLENBQWdCLENBQWhCO0FBQWpCLFNBQW9DLE9BQU8sS0FBRyxFQUFFLFVBQUYsQ0FBYSxDQUFiLEVBQWUsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsQ0FBZixHQUF3QixFQUFFLFdBQUYsQ0FBYyxDQUFkLEVBQWdCLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBaEIsQ0FBM0IsSUFBbUQsRUFBRSxVQUFGLENBQWEsQ0FBYixFQUFlLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBZixDQUFuRCxFQUF5RSxJQUFoRjtBQUFxRixPQUF0ZSxFQUFWLENBQWxWO0FBQUEsUUFBcTBCLElBQUUsRUFBRSxLQUF6MEIsQ0FBKzBCLEtBQUksR0FBRyxDQUFILEVBQUssRUFBRSxJQUFGLENBQU8sYUFBWixDQUFKLEVBQStCLElBQUUsQ0FBakMsRUFBbUMsR0FBbkM7QUFBdUMsVUFBRyxJQUFFLEdBQUcsVUFBSCxDQUFjLENBQWQsRUFBaUIsSUFBakIsQ0FBc0IsQ0FBdEIsRUFBd0IsQ0FBeEIsRUFBMEIsQ0FBMUIsRUFBNEIsRUFBRSxJQUE5QixDQUFMLEVBQXlDLE9BQU8sRUFBRSxVQUFGLENBQWEsRUFBRSxJQUFmLE1BQXVCLEVBQUUsV0FBRixDQUFjLEVBQUUsSUFBaEIsRUFBcUIsRUFBRSxJQUFGLENBQU8sS0FBNUIsRUFBbUMsSUFBbkMsR0FBd0MsRUFBRSxLQUFGLENBQVEsRUFBRSxJQUFWLEVBQWUsQ0FBZixDQUEvRCxHQUFrRixDQUF6RjtBQUFoRixLQUEySyxPQUFPLEVBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxFQUFSLEVBQVcsQ0FBWCxHQUFjLEVBQUUsVUFBRixDQUFhLEVBQUUsSUFBRixDQUFPLEtBQXBCLEtBQTRCLEVBQUUsSUFBRixDQUFPLEtBQVAsQ0FBYSxJQUFiLENBQWtCLENBQWxCLEVBQW9CLENBQXBCLENBQTFDLEVBQWlFLEVBQUUsUUFBRixDQUFXLEVBQUUsSUFBRixDQUFPLFFBQWxCLEVBQTRCLElBQTVCLENBQWlDLEVBQUUsSUFBRixDQUFPLElBQXhDLEVBQTZDLEVBQUUsSUFBRixDQUFPLFFBQXBELEVBQThELElBQTlELENBQW1FLEVBQUUsSUFBRixDQUFPLElBQTFFLEVBQWdGLE1BQWhGLENBQXVGLEVBQUUsSUFBRixDQUFPLE1BQTlGLENBQWpFLEVBQXVLLEVBQUUsRUFBRixDQUFLLEtBQUwsQ0FBVyxFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsRUFBQyxNQUFLLENBQU4sRUFBUSxNQUFLLENBQWIsRUFBZSxPQUFNLEVBQUUsSUFBRixDQUFPLEtBQTVCLEVBQVgsQ0FBWCxDQUF2SyxFQUFrTyxDQUF6TztBQUEyTyxLQUFFLFNBQUYsR0FBWSxFQUFFLE1BQUYsQ0FBUyxFQUFULEVBQVksRUFBQyxVQUFTLEVBQUMsS0FBSSxDQUFDLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFlBQUksSUFBRSxLQUFLLFdBQUwsQ0FBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsQ0FBTixDQUE0QixPQUFPLEdBQUcsRUFBRSxJQUFMLEVBQVUsQ0FBVixFQUFZLEdBQUcsSUFBSCxDQUFRLENBQVIsQ0FBWixFQUF1QixDQUF2QixHQUEwQixDQUFqQztBQUFtQyxPQUE5RSxDQUFMLEVBQVYsRUFBZ0csU0FBUSxpQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsUUFBRSxVQUFGLENBQWEsQ0FBYixLQUFpQixJQUFFLENBQUYsRUFBSSxJQUFFLENBQUMsR0FBRCxDQUF2QixJQUE4QixJQUFFLEVBQUUsS0FBRixDQUFRLENBQVIsQ0FBaEMsQ0FBMkMsS0FBSSxJQUFJLENBQUosRUFBTSxJQUFFLENBQVIsRUFBVSxJQUFFLEVBQUUsTUFBbEIsRUFBeUIsSUFBRSxDQUEzQixFQUE2QixHQUE3QjtBQUFpQyxZQUFFLEVBQUUsQ0FBRixDQUFGLEVBQU8sR0FBRyxRQUFILENBQVksQ0FBWixJQUFlLEdBQUcsUUFBSCxDQUFZLENBQVosS0FBZ0IsRUFBdEMsRUFBeUMsR0FBRyxRQUFILENBQVksQ0FBWixFQUFlLE9BQWYsQ0FBdUIsQ0FBdkIsQ0FBekM7QUFBakM7QUFBb0csS0FBclEsRUFBc1EsWUFBVyxDQUFDLEVBQUQsQ0FBalIsRUFBc1IsV0FBVSxtQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsVUFBRSxHQUFHLFVBQUgsQ0FBYyxPQUFkLENBQXNCLENBQXRCLENBQUYsR0FBMkIsR0FBRyxVQUFILENBQWMsSUFBZCxDQUFtQixDQUFuQixDQUEzQjtBQUFpRCxLQUEvVixFQUFaLENBQVosRUFBMFgsRUFBRSxLQUFGLEdBQVEsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLFFBQUksSUFBRSxLQUFHLG9CQUFpQixDQUFqQix5Q0FBaUIsQ0FBakIsRUFBSCxHQUFzQixFQUFFLE1BQUYsQ0FBUyxFQUFULEVBQVksQ0FBWixDQUF0QixHQUFxQyxFQUFDLFVBQVMsS0FBRyxDQUFDLENBQUQsSUFBSSxDQUFQLElBQVUsRUFBRSxVQUFGLENBQWEsQ0FBYixLQUFpQixDQUFyQyxFQUF1QyxVQUFTLENBQWhELEVBQWtELFFBQU8sS0FBRyxDQUFILElBQU0sS0FBRyxDQUFDLEVBQUUsVUFBRixDQUFhLENBQWIsQ0FBSixJQUFxQixDQUFwRixFQUEzQyxDQUFrSSxPQUFPLEVBQUUsRUFBRixDQUFLLEdBQUwsR0FBUyxFQUFFLFFBQUYsR0FBVyxDQUFwQixHQUFzQixZQUFVLE9BQU8sRUFBRSxRQUFuQixLQUE4QixFQUFFLFFBQUYsSUFBYyxFQUFFLEVBQUYsQ0FBSyxNQUFuQixHQUEwQixFQUFFLFFBQUYsR0FBVyxFQUFFLEVBQUYsQ0FBSyxNQUFMLENBQVksRUFBRSxRQUFkLENBQXJDLEdBQTZELEVBQUUsUUFBRixHQUFXLEVBQUUsRUFBRixDQUFLLE1BQUwsQ0FBWSxRQUFsSCxDQUF0QixFQUFrSixRQUFNLEVBQUUsS0FBUixJQUFlLEVBQUUsS0FBRixLQUFVLENBQUMsQ0FBMUIsS0FBOEIsRUFBRSxLQUFGLEdBQVEsSUFBdEMsQ0FBbEosRUFBOEwsRUFBRSxHQUFGLEdBQU0sRUFBRSxRQUF0TSxFQUErTSxFQUFFLFFBQUYsR0FBVyxZQUFVO0FBQUMsUUFBRSxVQUFGLENBQWEsRUFBRSxHQUFmLEtBQXFCLEVBQUUsR0FBRixDQUFNLElBQU4sQ0FBVyxJQUFYLENBQXJCLEVBQXNDLEVBQUUsS0FBRixJQUFTLEVBQUUsT0FBRixDQUFVLElBQVYsRUFBZSxFQUFFLEtBQWpCLENBQS9DO0FBQXVFLEtBQTVTLEVBQTZTLENBQXBUO0FBQXNULEdBQTEwQixFQUEyMEIsRUFBRSxFQUFGLENBQUssTUFBTCxDQUFZLEVBQUMsUUFBTyxnQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCO0FBQUMsYUFBTyxLQUFLLE1BQUwsQ0FBWSxFQUFaLEVBQWdCLEdBQWhCLENBQW9CLFNBQXBCLEVBQThCLENBQTlCLEVBQWlDLElBQWpDLEdBQXdDLEdBQXhDLEdBQThDLE9BQTlDLENBQXNELEVBQUMsU0FBUSxDQUFULEVBQXRELEVBQWtFLENBQWxFLEVBQW9FLENBQXBFLEVBQXNFLENBQXRFLENBQVA7QUFBZ0YsS0FBMUcsRUFBMkcsU0FBUSxpQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCO0FBQUMsVUFBSSxJQUFFLEVBQUUsYUFBRixDQUFnQixDQUFoQixDQUFOO0FBQUEsVUFBeUIsSUFBRSxFQUFFLEtBQUYsQ0FBUSxDQUFSLEVBQVUsQ0FBVixFQUFZLENBQVosQ0FBM0I7QUFBQSxVQUEwQyxJQUFFLFNBQUYsQ0FBRSxHQUFVO0FBQUMsWUFBSSxJQUFFLEdBQUcsSUFBSCxFQUFRLEVBQUUsTUFBRixDQUFTLEVBQVQsRUFBWSxDQUFaLENBQVIsRUFBdUIsQ0FBdkIsQ0FBTixDQUFnQyxDQUFDLEtBQUcsRUFBRSxHQUFGLENBQU0sSUFBTixFQUFXLFFBQVgsQ0FBSixLQUEyQixFQUFFLElBQUYsQ0FBTyxDQUFDLENBQVIsQ0FBM0I7QUFBc0MsT0FBN0gsQ0FBOEgsT0FBTyxFQUFFLE1BQUYsR0FBUyxDQUFULEVBQVcsS0FBRyxFQUFFLEtBQUYsS0FBVSxDQUFDLENBQWQsR0FBZ0IsS0FBSyxJQUFMLENBQVUsQ0FBVixDQUFoQixHQUE2QixLQUFLLEtBQUwsQ0FBVyxFQUFFLEtBQWIsRUFBbUIsQ0FBbkIsQ0FBL0M7QUFBcUUsS0FBeFUsRUFBeVUsTUFBSyxjQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsVUFBSSxJQUFFLFNBQUYsQ0FBRSxDQUFTLENBQVQsRUFBVztBQUFDLFlBQUksSUFBRSxFQUFFLElBQVIsQ0FBYSxPQUFPLEVBQUUsSUFBVCxFQUFjLEVBQUUsQ0FBRixDQUFkO0FBQW1CLE9BQWxELENBQW1ELE9BQU0sWUFBVSxPQUFPLENBQWpCLEtBQXFCLElBQUUsQ0FBRixFQUFJLElBQUUsQ0FBTixFQUFRLElBQUUsS0FBSyxDQUFwQyxHQUF1QyxLQUFHLE1BQUksQ0FBQyxDQUFSLElBQVcsS0FBSyxLQUFMLENBQVcsS0FBRyxJQUFkLEVBQW1CLEVBQW5CLENBQWxELEVBQXlFLEtBQUssSUFBTCxDQUFVLFlBQVU7QUFBQyxZQUFJLElBQUUsQ0FBQyxDQUFQO0FBQUEsWUFBUyxJQUFFLFFBQU0sQ0FBTixJQUFTLElBQUUsWUFBdEI7QUFBQSxZQUFtQyxJQUFFLEVBQUUsTUFBdkM7QUFBQSxZQUE4QyxJQUFFLEVBQUUsR0FBRixDQUFNLElBQU4sQ0FBaEQsQ0FBNEQsSUFBRyxDQUFILEVBQUssRUFBRSxDQUFGLEtBQU0sRUFBRSxDQUFGLEVBQUssSUFBWCxJQUFpQixFQUFFLEVBQUUsQ0FBRixDQUFGLENBQWpCLENBQUwsS0FBbUMsS0FBSSxDQUFKLElBQVMsQ0FBVDtBQUFXLFlBQUUsQ0FBRixLQUFNLEVBQUUsQ0FBRixFQUFLLElBQVgsSUFBaUIsR0FBRyxJQUFILENBQVEsQ0FBUixDQUFqQixJQUE2QixFQUFFLEVBQUUsQ0FBRixDQUFGLENBQTdCO0FBQVgsU0FBZ0QsS0FBSSxJQUFFLEVBQUUsTUFBUixFQUFlLEdBQWY7QUFBb0IsWUFBRSxDQUFGLEVBQUssSUFBTCxLQUFZLElBQVosSUFBa0IsUUFBTSxDQUFOLElBQVMsRUFBRSxDQUFGLEVBQUssS0FBTCxLQUFhLENBQXhDLEtBQTRDLEVBQUUsQ0FBRixFQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsQ0FBZixHQUFrQixJQUFFLENBQUMsQ0FBckIsRUFBdUIsRUFBRSxNQUFGLENBQVMsQ0FBVCxFQUFXLENBQVgsQ0FBbkU7QUFBcEIsU0FBc0csQ0FBQyxDQUFELElBQUksQ0FBSixJQUFPLEVBQUUsT0FBRixDQUFVLElBQVYsRUFBZSxDQUFmLENBQVA7QUFBeUIsT0FBblMsQ0FBL0U7QUFBb1gsS0FBcndCLEVBQXN3QixRQUFPLGdCQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sTUFBSSxDQUFDLENBQUwsS0FBUyxJQUFFLEtBQUcsSUFBZCxHQUFvQixLQUFLLElBQUwsQ0FBVSxZQUFVO0FBQUMsWUFBSSxDQUFKO0FBQUEsWUFBTSxJQUFFLEVBQUUsR0FBRixDQUFNLElBQU4sQ0FBUjtBQUFBLFlBQW9CLElBQUUsRUFBRSxJQUFFLE9BQUosQ0FBdEI7QUFBQSxZQUFtQyxJQUFFLEVBQUUsSUFBRSxZQUFKLENBQXJDO0FBQUEsWUFBdUQsSUFBRSxFQUFFLE1BQTNEO0FBQUEsWUFBa0UsSUFBRSxJQUFFLEVBQUUsTUFBSixHQUFXLENBQS9FLENBQWlGLEtBQUksRUFBRSxNQUFGLEdBQVMsQ0FBQyxDQUFWLEVBQVksRUFBRSxLQUFGLENBQVEsSUFBUixFQUFhLENBQWIsRUFBZSxFQUFmLENBQVosRUFBK0IsS0FBRyxFQUFFLElBQUwsSUFBVyxFQUFFLElBQUYsQ0FBTyxJQUFQLENBQVksSUFBWixFQUFpQixDQUFDLENBQWxCLENBQTFDLEVBQStELElBQUUsRUFBRSxNQUF2RSxFQUE4RSxHQUE5RTtBQUFtRixZQUFFLENBQUYsRUFBSyxJQUFMLEtBQVksSUFBWixJQUFrQixFQUFFLENBQUYsRUFBSyxLQUFMLEtBQWEsQ0FBL0IsS0FBbUMsRUFBRSxDQUFGLEVBQUssSUFBTCxDQUFVLElBQVYsQ0FBZSxDQUFDLENBQWhCLEdBQW1CLEVBQUUsTUFBRixDQUFTLENBQVQsRUFBVyxDQUFYLENBQXREO0FBQW5GLFNBQXdKLEtBQUksSUFBRSxDQUFOLEVBQVEsSUFBRSxDQUFWLEVBQVksR0FBWjtBQUFnQixZQUFFLENBQUYsS0FBTSxFQUFFLENBQUYsRUFBSyxNQUFYLElBQW1CLEVBQUUsQ0FBRixFQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLElBQWpCLENBQW5CO0FBQWhCLFNBQTBELE9BQU8sRUFBRSxNQUFUO0FBQWdCLE9BQXhVLENBQTNCO0FBQXFXLEtBQTluQyxFQUFaLENBQTMwQixFQUF3OUQsRUFBRSxJQUFGLENBQU8sQ0FBQyxRQUFELEVBQVUsTUFBVixFQUFpQixNQUFqQixDQUFQLEVBQWdDLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFFBQUksSUFBRSxFQUFFLEVBQUYsQ0FBSyxDQUFMLENBQU4sQ0FBYyxFQUFFLEVBQUYsQ0FBSyxDQUFMLElBQVEsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLGFBQU8sUUFBTSxDQUFOLElBQVMsYUFBVyxPQUFPLENBQTNCLEdBQTZCLEVBQUUsS0FBRixDQUFRLElBQVIsRUFBYSxTQUFiLENBQTdCLEdBQXFELEtBQUssT0FBTCxDQUFhLEdBQUcsQ0FBSCxFQUFLLENBQUMsQ0FBTixDQUFiLEVBQXNCLENBQXRCLEVBQXdCLENBQXhCLEVBQTBCLENBQTFCLENBQTVEO0FBQXlGLEtBQWpIO0FBQWtILEdBQTlLLENBQXg5RCxFQUF3b0UsRUFBRSxJQUFGLENBQU8sRUFBQyxXQUFVLEdBQUcsTUFBSCxDQUFYLEVBQXNCLFNBQVEsR0FBRyxNQUFILENBQTlCLEVBQXlDLGFBQVksR0FBRyxRQUFILENBQXJELEVBQWtFLFFBQU8sRUFBQyxTQUFRLE1BQVQsRUFBekUsRUFBMEYsU0FBUSxFQUFDLFNBQVEsTUFBVCxFQUFsRyxFQUFtSCxZQUFXLEVBQUMsU0FBUSxRQUFULEVBQTlILEVBQVAsRUFBeUosVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsTUFBRSxFQUFGLENBQUssQ0FBTCxJQUFRLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWU7QUFBQyxhQUFPLEtBQUssT0FBTCxDQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLENBQVA7QUFBNkIsS0FBckQ7QUFBc0QsR0FBN04sQ0FBeG9FLEVBQXUyRSxFQUFFLE1BQUYsR0FBUyxFQUFoM0UsRUFBbTNFLEVBQUUsRUFBRixDQUFLLElBQUwsR0FBVSxZQUFVO0FBQUMsUUFBSSxDQUFKO0FBQUEsUUFBTSxJQUFFLENBQVI7QUFBQSxRQUFVLElBQUUsRUFBRSxNQUFkLENBQXFCLEtBQUksS0FBRyxFQUFFLEdBQUYsRUFBUCxFQUFlLElBQUUsRUFBRSxNQUFuQixFQUEwQixHQUExQjtBQUE4QixVQUFFLEVBQUUsQ0FBRixDQUFGLEVBQU8sT0FBSyxFQUFFLENBQUYsTUFBTyxDQUFaLElBQWUsRUFBRSxNQUFGLENBQVMsR0FBVCxFQUFhLENBQWIsQ0FBdEI7QUFBOUIsS0FBb0UsRUFBRSxNQUFGLElBQVUsRUFBRSxFQUFGLENBQUssSUFBTCxFQUFWLEVBQXNCLEtBQUcsS0FBSyxDQUE5QjtBQUFnQyxHQUFqZ0YsRUFBa2dGLEVBQUUsRUFBRixDQUFLLEtBQUwsR0FBVyxVQUFTLENBQVQsRUFBVztBQUFDLE1BQUUsTUFBRixDQUFTLElBQVQsQ0FBYyxDQUFkLEdBQWlCLEVBQUUsRUFBRixDQUFLLEtBQUwsRUFBakI7QUFBOEIsR0FBdmpGLEVBQXdqRixFQUFFLEVBQUYsQ0FBSyxRQUFMLEdBQWMsRUFBdGtGLEVBQXlrRixFQUFFLEVBQUYsQ0FBSyxLQUFMLEdBQVcsWUFBVTtBQUFDLFdBQUssS0FBRyxDQUFDLENBQUosRUFBTSxJQUFYO0FBQWlCLEdBQWhuRixFQUFpbkYsRUFBRSxFQUFGLENBQUssSUFBTCxHQUFVLFlBQVU7QUFBQyxTQUFHLElBQUg7QUFBUSxHQUE5b0YsRUFBK29GLEVBQUUsRUFBRixDQUFLLE1BQUwsR0FBWSxFQUFDLE1BQUssR0FBTixFQUFVLE1BQUssR0FBZixFQUFtQixVQUFTLEdBQTVCLEVBQTNwRixFQUE0ckYsRUFBRSxFQUFGLENBQUssS0FBTCxHQUFXLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFdBQU8sSUFBRSxFQUFFLEVBQUYsR0FBSyxFQUFFLEVBQUYsQ0FBSyxNQUFMLENBQVksQ0FBWixLQUFnQixDQUFyQixHQUF1QixDQUF6QixFQUEyQixJQUFFLEtBQUcsSUFBaEMsRUFBcUMsS0FBSyxLQUFMLENBQVcsQ0FBWCxFQUFhLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFVBQUksSUFBRSxFQUFFLFVBQUYsQ0FBYSxDQUFiLEVBQWUsQ0FBZixDQUFOLENBQXdCLEVBQUUsSUFBRixHQUFPLFlBQVU7QUFBQyxVQUFFLFlBQUYsQ0FBZSxDQUFmO0FBQWtCLE9BQXBDO0FBQXFDLEtBQXhGLENBQTVDO0FBQXNJLEdBQTMxRixFQUE0MUYsWUFBVTtBQUFDLFFBQUksSUFBRSxFQUFFLGFBQUYsQ0FBZ0IsT0FBaEIsQ0FBTjtBQUFBLFFBQStCLElBQUUsRUFBRSxhQUFGLENBQWdCLFFBQWhCLENBQWpDO0FBQUEsUUFBMkQsSUFBRSxFQUFFLFdBQUYsQ0FBYyxFQUFFLGFBQUYsQ0FBZ0IsUUFBaEIsQ0FBZCxDQUE3RCxDQUFzRyxFQUFFLElBQUYsR0FBTyxVQUFQLEVBQWtCLEVBQUUsT0FBRixHQUFVLE9BQUssRUFBRSxLQUFuQyxFQUF5QyxFQUFFLFdBQUYsR0FBYyxFQUFFLFFBQXpELEVBQWtFLElBQUUsRUFBRSxhQUFGLENBQWdCLE9BQWhCLENBQXBFLEVBQTZGLEVBQUUsS0FBRixHQUFRLEdBQXJHLEVBQXlHLEVBQUUsSUFBRixHQUFPLE9BQWhILEVBQXdILEVBQUUsVUFBRixHQUFhLFFBQU0sRUFBRSxLQUE3STtBQUFtSixHQUFwUSxFQUE1MUYsQ0FBbW1HLElBQUksRUFBSjtBQUFBLE1BQU8sS0FBRyxFQUFFLElBQUYsQ0FBTyxVQUFqQixDQUE0QixFQUFFLEVBQUYsQ0FBSyxNQUFMLENBQVksRUFBQyxNQUFLLGNBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLGFBQU8sRUFBRSxJQUFGLEVBQU8sRUFBRSxJQUFULEVBQWMsQ0FBZCxFQUFnQixDQUFoQixFQUFrQixVQUFVLE1BQVYsR0FBaUIsQ0FBbkMsQ0FBUDtBQUE2QyxLQUFqRSxFQUFrRSxZQUFXLG9CQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sS0FBSyxJQUFMLENBQVUsWUFBVTtBQUFDLFVBQUUsVUFBRixDQUFhLElBQWIsRUFBa0IsQ0FBbEI7QUFBcUIsT0FBMUMsQ0FBUDtBQUFtRCxLQUE1SSxFQUFaLEdBQTJKLEVBQUUsTUFBRixDQUFTLEVBQUMsTUFBSyxjQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsVUFBSSxDQUFKO0FBQUEsVUFBTSxDQUFOO0FBQUEsVUFBUSxJQUFFLEVBQUUsUUFBWixDQUFxQixJQUFHLE1BQUksQ0FBSixJQUFPLE1BQUksQ0FBWCxJQUFjLE1BQUksQ0FBckIsRUFBdUIsT0FBTSxlQUFhLE9BQU8sRUFBRSxZQUF0QixHQUFtQyxFQUFFLElBQUYsQ0FBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsQ0FBbkMsSUFBa0QsTUFBSSxDQUFKLElBQU8sRUFBRSxRQUFGLENBQVcsQ0FBWCxDQUFQLEtBQXVCLElBQUUsRUFBRSxTQUFGLENBQVksRUFBRSxXQUFGLEVBQVosTUFBK0IsRUFBRSxJQUFGLENBQU8sS0FBUCxDQUFhLElBQWIsQ0FBa0IsSUFBbEIsQ0FBdUIsQ0FBdkIsSUFBMEIsRUFBMUIsR0FBNkIsS0FBSyxDQUFqRSxDQUF6QixHQUE4RixLQUFLLENBQUwsS0FBUyxDQUFULEdBQVcsU0FBTyxDQUFQLEdBQVMsS0FBSyxFQUFFLFVBQUYsQ0FBYSxDQUFiLEVBQWUsQ0FBZixDQUFkLEdBQWdDLEtBQUcsU0FBUSxDQUFYLElBQWMsS0FBSyxDQUFMLE1BQVUsSUFBRSxFQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVEsQ0FBUixFQUFVLENBQVYsQ0FBWixDQUFkLEdBQXdDLENBQXhDLElBQTJDLEVBQUUsWUFBRixDQUFlLENBQWYsRUFBaUIsSUFBRSxFQUFuQixHQUF1QixDQUFsRSxDQUEzQyxHQUFnSCxLQUFHLFNBQVEsQ0FBWCxJQUFjLFVBQVEsSUFBRSxFQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVEsQ0FBUixDQUFWLENBQWQsR0FBb0MsQ0FBcEMsSUFBdUMsSUFBRSxFQUFFLElBQUYsQ0FBTyxJQUFQLENBQVksQ0FBWixFQUFjLENBQWQsQ0FBRixFQUN2eStCLFFBQU0sQ0FBTixHQUFRLEtBQUssQ0FBYixHQUFlLENBRGl2K0IsQ0FBaFEsQ0FBTjtBQUN2KzlCLEtBRHE2OUIsRUFDcDY5QixXQUFVLEVBQUMsTUFBSyxFQUFDLEtBQUksYUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsY0FBRyxDQUFDLEVBQUUsVUFBSCxJQUFlLFlBQVUsQ0FBekIsSUFBNEIsRUFBRSxDQUFGLEVBQUksT0FBSixDQUEvQixFQUE0QztBQUFDLGdCQUFJLElBQUUsRUFBRSxLQUFSLENBQWMsT0FBTyxFQUFFLFlBQUYsQ0FBZSxNQUFmLEVBQXNCLENBQXRCLEdBQXlCLE1BQUksRUFBRSxLQUFGLEdBQVEsQ0FBWixDQUF6QixFQUF3QyxDQUEvQztBQUFpRDtBQUFDLFNBQWhJLEVBQU4sRUFEMDU5QixFQUNqeDlCLFlBQVcsb0JBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFVBQUksQ0FBSjtBQUFBLFVBQU0sSUFBRSxDQUFSO0FBQUEsVUFBVSxJQUFFLEtBQUcsRUFBRSxLQUFGLENBQVEsQ0FBUixDQUFmLENBQTBCLElBQUcsS0FBRyxNQUFJLEVBQUUsUUFBWixFQUFxQixPQUFNLElBQUUsRUFBRSxHQUFGLENBQVI7QUFBZSxVQUFFLGVBQUYsQ0FBa0IsQ0FBbEI7QUFBZjtBQUFvQyxLQURxcTlCLEVBQVQsQ0FBM0osRUFDOS84QixLQUFHLEVBQUMsS0FBSSxhQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsYUFBTyxNQUFJLENBQUMsQ0FBTCxHQUFPLEVBQUUsVUFBRixDQUFhLENBQWIsRUFBZSxDQUFmLENBQVAsR0FBeUIsRUFBRSxZQUFGLENBQWUsQ0FBZixFQUFpQixDQUFqQixDQUF6QixFQUE2QyxDQUFwRDtBQUFzRCxLQUEzRSxFQUQyLzhCLEVBQzk2OEIsRUFBRSxJQUFGLENBQU8sRUFBRSxJQUFGLENBQU8sS0FBUCxDQUFhLElBQWIsQ0FBa0IsTUFBbEIsQ0FBeUIsS0FBekIsQ0FBK0IsTUFBL0IsQ0FBUCxFQUE4QyxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxRQUFJLElBQUUsR0FBRyxDQUFILEtBQU8sRUFBRSxJQUFGLENBQU8sSUFBcEIsQ0FBeUIsR0FBRyxDQUFILElBQU0sVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLFVBQUksQ0FBSjtBQUFBLFVBQU0sQ0FBTjtBQUFBLFVBQVEsSUFBRSxFQUFFLFdBQUYsRUFBVixDQUEwQixPQUFPLE1BQUksSUFBRSxHQUFHLENBQUgsQ0FBRixFQUFRLEdBQUcsQ0FBSCxJQUFNLENBQWQsRUFBZ0IsSUFBRSxRQUFNLEVBQUUsQ0FBRixFQUFJLENBQUosRUFBTSxDQUFOLENBQU4sR0FBZSxDQUFmLEdBQWlCLElBQW5DLEVBQXdDLEdBQUcsQ0FBSCxJQUFNLENBQWxELEdBQXFELENBQTVEO0FBQThELEtBQTlHO0FBQStHLEdBQXBNLENBRDg2OEIsQ0FDeHU4QixJQUFJLEtBQUcscUNBQVA7QUFBQSxNQUE2QyxLQUFHLGVBQWhELENBQWdFLEVBQUUsRUFBRixDQUFLLE1BQUwsQ0FBWSxFQUFDLE1BQUssY0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsYUFBTyxFQUFFLElBQUYsRUFBTyxFQUFFLElBQVQsRUFBYyxDQUFkLEVBQWdCLENBQWhCLEVBQWtCLFVBQVUsTUFBVixHQUFpQixDQUFuQyxDQUFQO0FBQTZDLEtBQWpFLEVBQWtFLFlBQVcsb0JBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxLQUFLLElBQUwsQ0FBVSxZQUFVO0FBQUMsZUFBTyxLQUFLLEVBQUUsT0FBRixDQUFVLENBQVYsS0FBYyxDQUFuQixDQUFQO0FBQTZCLE9BQWxELENBQVA7QUFBMkQsS0FBcEosRUFBWixHQUFtSyxFQUFFLE1BQUYsQ0FBUyxFQUFDLE1BQUssY0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLFVBQUksQ0FBSjtBQUFBLFVBQU0sQ0FBTjtBQUFBLFVBQVEsSUFBRSxFQUFFLFFBQVosQ0FBcUIsSUFBRyxNQUFJLENBQUosSUFBTyxNQUFJLENBQVgsSUFBYyxNQUFJLENBQXJCLEVBQXVCLE9BQU8sTUFBSSxDQUFKLElBQU8sRUFBRSxRQUFGLENBQVcsQ0FBWCxDQUFQLEtBQXVCLElBQUUsRUFBRSxPQUFGLENBQVUsQ0FBVixLQUFjLENBQWhCLEVBQWtCLElBQUUsRUFBRSxTQUFGLENBQVksQ0FBWixDQUEzQyxHQUEyRCxLQUFLLENBQUwsS0FBUyxDQUFULEdBQVcsS0FBRyxTQUFRLENBQVgsSUFBYyxLQUFLLENBQUwsTUFBVSxJQUFFLEVBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxDQUFSLEVBQVUsQ0FBVixDQUFaLENBQWQsR0FBd0MsQ0FBeEMsR0FBMEMsRUFBRSxDQUFGLElBQUssQ0FBMUQsR0FBNEQsS0FBRyxTQUFRLENBQVgsSUFBYyxVQUFRLElBQUUsRUFBRSxHQUFGLENBQU0sQ0FBTixFQUFRLENBQVIsQ0FBVixDQUFkLEdBQW9DLENBQXBDLEdBQXNDLEVBQUUsQ0FBRixDQUFwSztBQUF5SyxLQUEzTyxFQUE0TyxXQUFVLEVBQUMsVUFBUyxFQUFDLEtBQUksYUFBUyxDQUFULEVBQVc7QUFBQyxjQUFJLElBQUUsRUFBRSxJQUFGLENBQU8sSUFBUCxDQUFZLENBQVosRUFBYyxVQUFkLENBQU4sQ0FBZ0MsT0FBTyxJQUFFLFNBQVMsQ0FBVCxFQUFXLEVBQVgsQ0FBRixHQUFpQixHQUFHLElBQUgsQ0FBUSxFQUFFLFFBQVYsS0FBcUIsR0FBRyxJQUFILENBQVEsRUFBRSxRQUFWLEtBQXFCLEVBQUUsSUFBNUMsR0FBaUQsQ0FBakQsR0FBbUQsQ0FBQyxDQUE1RTtBQUE4RSxTQUEvSCxFQUFWLEVBQXRQLEVBQWtZLFNBQVEsRUFBQyxPQUFNLFNBQVAsRUFBaUIsU0FBUSxXQUF6QixFQUExWSxFQUFULENBQW5LLEVBQThsQixFQUFFLFdBQUYsS0FBZ0IsRUFBRSxTQUFGLENBQVksUUFBWixHQUFxQixFQUFDLEtBQUksYUFBUyxDQUFULEVBQVc7QUFBQyxVQUFJLElBQUUsRUFBRSxVQUFSLENBQW1CLE9BQU8sS0FBRyxFQUFFLFVBQUwsSUFBaUIsRUFBRSxVQUFGLENBQWEsYUFBOUIsRUFBNEMsSUFBbkQ7QUFBd0QsS0FBNUYsRUFBNkYsS0FBSSxhQUFTLENBQVQsRUFBVztBQUFDLFVBQUksSUFBRSxFQUFFLFVBQVIsQ0FBbUIsTUFBSSxFQUFFLGFBQUYsRUFBZ0IsRUFBRSxVQUFGLElBQWMsRUFBRSxVQUFGLENBQWEsYUFBL0M7QUFBOEQsS0FBOUwsRUFBckMsQ0FBOWxCLEVBQW8wQixFQUFFLElBQUYsQ0FBTyxDQUFDLFVBQUQsRUFBWSxVQUFaLEVBQXVCLFdBQXZCLEVBQW1DLGFBQW5DLEVBQWlELGFBQWpELEVBQStELFNBQS9ELEVBQXlFLFNBQXpFLEVBQW1GLFFBQW5GLEVBQTRGLGFBQTVGLEVBQTBHLGlCQUExRyxDQUFQLEVBQW9JLFlBQVU7QUFBQyxNQUFFLE9BQUYsQ0FBVSxLQUFLLFdBQUwsRUFBVixJQUE4QixJQUE5QjtBQUFtQyxHQUFsTCxDQUFwMEIsQ0FBdy9CLFNBQVMsRUFBVCxDQUFZLENBQVosRUFBYztBQUFDLFFBQUksSUFBRSxFQUFFLEtBQUYsQ0FBUSxDQUFSLEtBQVksRUFBbEIsQ0FBcUIsT0FBTyxFQUFFLElBQUYsQ0FBTyxHQUFQLENBQVA7QUFBbUIsWUFBUyxFQUFULENBQVksQ0FBWixFQUFjO0FBQUMsV0FBTyxFQUFFLFlBQUYsSUFBZ0IsRUFBRSxZQUFGLENBQWUsT0FBZixDQUFoQixJQUF5QyxFQUFoRDtBQUFtRCxLQUFFLEVBQUYsQ0FBSyxNQUFMLENBQVksRUFBQyxVQUFTLGtCQUFTLENBQVQsRUFBVztBQUFDLFVBQUksQ0FBSjtBQUFBLFVBQU0sQ0FBTjtBQUFBLFVBQVEsQ0FBUjtBQUFBLFVBQVUsQ0FBVjtBQUFBLFVBQVksQ0FBWjtBQUFBLFVBQWMsQ0FBZDtBQUFBLFVBQWdCLENBQWhCO0FBQUEsVUFBa0IsSUFBRSxDQUFwQixDQUFzQixJQUFHLEVBQUUsVUFBRixDQUFhLENBQWIsQ0FBSCxFQUFtQixPQUFPLEtBQUssSUFBTCxDQUFVLFVBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBRSxJQUFGLEVBQVEsUUFBUixDQUFpQixFQUFFLElBQUYsQ0FBTyxJQUFQLEVBQVksQ0FBWixFQUFjLEdBQUcsSUFBSCxDQUFkLENBQWpCO0FBQTBDLE9BQWhFLENBQVAsQ0FBeUUsSUFBRyxZQUFVLE9BQU8sQ0FBakIsSUFBb0IsQ0FBdkIsRUFBeUI7QUFBQyxZQUFFLEVBQUUsS0FBRixDQUFRLENBQVIsS0FBWSxFQUFkLENBQWlCLE9BQU0sSUFBRSxLQUFLLEdBQUwsQ0FBUjtBQUFrQixjQUFHLElBQUUsR0FBRyxDQUFILENBQUYsRUFBUSxJQUFFLE1BQUksRUFBRSxRQUFOLElBQWdCLE1BQUksR0FBRyxDQUFILENBQUosR0FBVSxHQUF2QyxFQUEyQztBQUFDLGdCQUFFLENBQUYsQ0FBSSxPQUFNLElBQUUsRUFBRSxHQUFGLENBQVI7QUFBZSxnQkFBRSxPQUFGLENBQVUsTUFBSSxDQUFKLEdBQU0sR0FBaEIsSUFBcUIsQ0FBckIsS0FBeUIsS0FBRyxJQUFFLEdBQTlCO0FBQWYsYUFBa0QsSUFBRSxHQUFHLENBQUgsQ0FBRixFQUFRLE1BQUksQ0FBSixJQUFPLEVBQUUsWUFBRixDQUFlLE9BQWYsRUFBdUIsQ0FBdkIsQ0FBZjtBQUF5QztBQUE3SjtBQUE4SixjQUFPLElBQVA7QUFBWSxLQUE3VixFQUE4VixhQUFZLHFCQUFTLENBQVQsRUFBVztBQUFDLFVBQUksQ0FBSjtBQUFBLFVBQU0sQ0FBTjtBQUFBLFVBQVEsQ0FBUjtBQUFBLFVBQVUsQ0FBVjtBQUFBLFVBQVksQ0FBWjtBQUFBLFVBQWMsQ0FBZDtBQUFBLFVBQWdCLENBQWhCO0FBQUEsVUFBa0IsSUFBRSxDQUFwQixDQUFzQixJQUFHLEVBQUUsVUFBRixDQUFhLENBQWIsQ0FBSCxFQUFtQixPQUFPLEtBQUssSUFBTCxDQUFVLFVBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixFQUFFLElBQUYsQ0FBTyxJQUFQLEVBQVksQ0FBWixFQUFjLEdBQUcsSUFBSCxDQUFkLENBQXBCO0FBQTZDLE9BQW5FLENBQVAsQ0FBNEUsSUFBRyxDQUFDLFVBQVUsTUFBZCxFQUFxQixPQUFPLEtBQUssSUFBTCxDQUFVLE9BQVYsRUFBa0IsRUFBbEIsQ0FBUCxDQUE2QixJQUFHLFlBQVUsT0FBTyxDQUFqQixJQUFvQixDQUF2QixFQUF5QjtBQUFDLFlBQUUsRUFBRSxLQUFGLENBQVEsQ0FBUixLQUFZLEVBQWQsQ0FBaUIsT0FBTSxJQUFFLEtBQUssR0FBTCxDQUFSO0FBQWtCLGNBQUcsSUFBRSxHQUFHLENBQUgsQ0FBRixFQUFRLElBQUUsTUFBSSxFQUFFLFFBQU4sSUFBZ0IsTUFBSSxHQUFHLENBQUgsQ0FBSixHQUFVLEdBQXZDLEVBQTJDO0FBQUMsZ0JBQUUsQ0FBRixDQUFJLE9BQU0sSUFBRSxFQUFFLEdBQUYsQ0FBUjtBQUFlLHFCQUFNLEVBQUUsT0FBRixDQUFVLE1BQUksQ0FBSixHQUFNLEdBQWhCLElBQXFCLENBQUMsQ0FBNUI7QUFBOEIsb0JBQUUsRUFBRSxPQUFGLENBQVUsTUFBSSxDQUFKLEdBQU0sR0FBaEIsRUFBb0IsR0FBcEIsQ0FBRjtBQUE5QjtBQUFmLGFBQXdFLElBQUUsR0FBRyxDQUFILENBQUYsRUFBUSxNQUFJLENBQUosSUFBTyxFQUFFLFlBQUYsQ0FBZSxPQUFmLEVBQXVCLENBQXZCLENBQWY7QUFBeUM7QUFBbkw7QUFBb0wsY0FBTyxJQUFQO0FBQVksS0FBeHdCLEVBQXl3QixhQUFZLHFCQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxVQUFJLFdBQVMsQ0FBVCx5Q0FBUyxDQUFULENBQUosQ0FBZSxPQUFNLGFBQVcsT0FBTyxDQUFsQixJQUFxQixhQUFXLENBQWhDLEdBQWtDLElBQUUsS0FBSyxRQUFMLENBQWMsQ0FBZCxDQUFGLEdBQW1CLEtBQUssV0FBTCxDQUFpQixDQUFqQixDQUFyRCxHQUF5RSxFQUFFLFVBQUYsQ0FBYSxDQUFiLElBQWdCLEtBQUssSUFBTCxDQUFVLFVBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixFQUFFLElBQUYsQ0FBTyxJQUFQLEVBQVksQ0FBWixFQUFjLEdBQUcsSUFBSCxDQUFkLEVBQXVCLENBQXZCLENBQXBCLEVBQThDLENBQTlDO0FBQWlELE9BQXZFLENBQWhCLEdBQXlGLEtBQUssSUFBTCxDQUFVLFlBQVU7QUFBQyxZQUFJLENBQUosRUFBTSxDQUFOLEVBQVEsQ0FBUixFQUFVLENBQVYsQ0FBWSxJQUFHLGFBQVcsQ0FBZCxFQUFnQjtBQUFDLGNBQUUsQ0FBRixFQUFJLElBQUUsRUFBRSxJQUFGLENBQU4sRUFBYyxJQUFFLEVBQUUsS0FBRixDQUFRLENBQVIsS0FBWSxFQUE1QixDQUErQixPQUFNLElBQUUsRUFBRSxHQUFGLENBQVI7QUFBZSxjQUFFLFFBQUYsQ0FBVyxDQUFYLElBQWMsRUFBRSxXQUFGLENBQWMsQ0FBZCxDQUFkLEdBQStCLEVBQUUsUUFBRixDQUFXLENBQVgsQ0FBL0I7QUFBZjtBQUE0RCxTQUE1RyxNQUFpSCxLQUFLLENBQUwsS0FBUyxDQUFULElBQVksY0FBWSxDQUF4QixLQUE0QixJQUFFLEdBQUcsSUFBSCxDQUFGLEVBQVcsS0FBRyxFQUFFLEdBQUYsQ0FBTSxJQUFOLEVBQVcsZUFBWCxFQUEyQixDQUEzQixDQUFkLEVBQTRDLEtBQUssWUFBTCxJQUFtQixLQUFLLFlBQUwsQ0FBa0IsT0FBbEIsRUFBMEIsS0FBRyxNQUFJLENBQUMsQ0FBUixHQUFVLEVBQVYsR0FBYSxFQUFFLEdBQUYsQ0FBTSxJQUFOLEVBQVcsZUFBWCxLQUE2QixFQUFwRSxDQUEzRjtBQUFvSyxPQUF0VCxDQUF4SztBQUFnZSxLQUFseEMsRUFBbXhDLFVBQVMsa0JBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBSSxDQUFKO0FBQUEsVUFBTSxDQUFOO0FBQUEsVUFBUSxJQUFFLENBQVYsQ0FBWSxJQUFFLE1BQUksQ0FBSixHQUFNLEdBQVIsQ0FBWSxPQUFNLElBQUUsS0FBSyxHQUFMLENBQVI7QUFBa0IsWUFBRyxNQUFJLEVBQUUsUUFBTixJQUFnQixDQUFDLE1BQUksR0FBRyxHQUFHLENBQUgsQ0FBSCxDQUFKLEdBQWMsR0FBZixFQUFvQixPQUFwQixDQUE0QixDQUE1QixJQUErQixDQUFDLENBQW5ELEVBQXFELE9BQU0sQ0FBQyxDQUFQO0FBQXZFLE9BQWdGLE9BQU0sQ0FBQyxDQUFQO0FBQVMsS0FBejVDLEVBQVosRUFBdzZDLElBQUksS0FBRyxLQUFQLENBQWEsRUFBRSxFQUFGLENBQUssTUFBTCxDQUFZLEVBQUMsS0FBSSxhQUFTLENBQVQsRUFBVztBQUFDLFVBQUksQ0FBSjtBQUFBLFVBQU0sQ0FBTjtBQUFBLFVBQVEsQ0FBUjtBQUFBLFVBQVUsSUFBRSxLQUFLLENBQUwsQ0FBWixDQUFvQjtBQUFDLFlBQUcsVUFBVSxNQUFiLEVBQW9CLE9BQU8sSUFBRSxFQUFFLFVBQUYsQ0FBYSxDQUFiLENBQUYsRUFBa0IsS0FBSyxJQUFMLENBQVUsVUFBUyxDQUFULEVBQVc7QUFBQyxjQUFJLENBQUosQ0FBTSxNQUFJLEtBQUssUUFBVCxLQUFvQixJQUFFLElBQUUsRUFBRSxJQUFGLENBQU8sSUFBUCxFQUFZLENBQVosRUFBYyxFQUFFLElBQUYsRUFBUSxHQUFSLEVBQWQsQ0FBRixHQUErQixDQUFqQyxFQUFtQyxRQUFNLENBQU4sR0FBUSxJQUFFLEVBQVYsR0FBYSxZQUFVLE9BQU8sQ0FBakIsR0FBbUIsS0FBRyxFQUF0QixHQUF5QixNQUFNLE9BQU4sQ0FBYyxDQUFkLE1BQW1CLElBQUUsRUFBRSxHQUFGLENBQU0sQ0FBTixFQUFRLFVBQVMsQ0FBVCxFQUFXO0FBQUMsbUJBQU8sUUFBTSxDQUFOLEdBQVEsRUFBUixHQUFXLElBQUUsRUFBcEI7QUFBdUIsV0FBM0MsQ0FBckIsQ0FBekUsRUFBNEksSUFBRSxFQUFFLFFBQUYsQ0FBVyxLQUFLLElBQWhCLEtBQXVCLEVBQUUsUUFBRixDQUFXLEtBQUssUUFBTCxDQUFjLFdBQWQsRUFBWCxDQUFySyxFQUE2TSxLQUFHLFNBQVEsQ0FBWCxJQUFjLEtBQUssQ0FBTCxLQUFTLEVBQUUsR0FBRixDQUFNLElBQU4sRUFBVyxDQUFYLEVBQWEsT0FBYixDQUF2QixLQUErQyxLQUFLLEtBQUwsR0FBVyxDQUExRCxDQUFqTztBQUErUixTQUEzVCxDQUF6QixDQUFzVixJQUFHLENBQUgsRUFBSyxPQUFPLElBQUUsRUFBRSxRQUFGLENBQVcsRUFBRSxJQUFiLEtBQW9CLEVBQUUsUUFBRixDQUFXLEVBQUUsUUFBRixDQUFXLFdBQVgsRUFBWCxDQUF0QixFQUEyRCxLQUFHLFNBQVEsQ0FBWCxJQUFjLEtBQUssQ0FBTCxNQUFVLElBQUUsRUFBRSxHQUFGLENBQU0sQ0FBTixFQUFRLE9BQVIsQ0FBWixDQUFkLEdBQTRDLENBQTVDLElBQStDLElBQUUsRUFBRSxLQUFKLEVBQVUsWUFBVSxPQUFPLENBQWpCLEdBQW1CLEVBQUUsT0FBRixDQUFVLEVBQVYsRUFBYSxFQUFiLENBQW5CLEdBQW9DLFFBQU0sQ0FBTixHQUFRLEVBQVIsR0FBVyxDQUF4RyxDQUFsRTtBQUE2SztBQUFDLEtBQW5rQixFQUFaLEdBQWtsQixFQUFFLE1BQUYsQ0FBUyxFQUFDLFVBQVMsRUFBQyxRQUFPLEVBQUMsS0FBSSxhQUFTLENBQVQsRUFBVztBQUFDLGNBQUksSUFBRSxFQUFFLElBQUYsQ0FBTyxJQUFQLENBQVksQ0FBWixFQUFjLE9BQWQsQ0FBTixDQUE2QixPQUFPLFFBQU0sQ0FBTixHQUFRLENBQVIsR0FBVSxHQUFHLEVBQUUsSUFBRixDQUFPLENBQVAsQ0FBSCxDQUFqQjtBQUErQixTQUE3RSxFQUFSLEVBQXVGLFFBQU8sRUFBQyxLQUFJLGFBQVMsQ0FBVCxFQUFXO0FBQUMsY0FBSSxDQUFKO0FBQUEsY0FBTSxDQUFOO0FBQUEsY0FBUSxDQUFSO0FBQUEsY0FBVSxJQUFFLEVBQUUsT0FBZDtBQUFBLGNBQXNCLElBQUUsRUFBRSxhQUExQjtBQUFBLGNBQXdDLElBQUUsaUJBQWUsRUFBRSxJQUEzRDtBQUFBLGNBQWdFLElBQUUsSUFBRSxJQUFGLEdBQU8sRUFBekU7QUFBQSxjQUE0RSxJQUFFLElBQUUsSUFBRSxDQUFKLEdBQU0sRUFBRSxNQUF0RixDQUE2RixLQUFJLElBQUUsSUFBRSxDQUFGLEdBQUksQ0FBSixHQUFNLElBQUUsQ0FBRixHQUFJLENBQWhCLEVBQWtCLElBQUUsQ0FBcEIsRUFBc0IsR0FBdEI7QUFBMEIsZ0JBQUcsSUFBRSxFQUFFLENBQUYsQ0FBRixFQUFPLENBQUMsRUFBRSxRQUFGLElBQVksTUFBSSxDQUFqQixLQUFxQixDQUFDLEVBQUUsUUFBeEIsS0FBbUMsQ0FBQyxFQUFFLFVBQUYsQ0FBYSxRQUFkLElBQXdCLENBQUMsRUFBRSxFQUFFLFVBQUosRUFBZSxVQUFmLENBQTVELENBQVYsRUFBa0c7QUFBQyxrQkFBRyxJQUFFLEVBQUUsQ0FBRixFQUFLLEdBQUwsRUFBRixFQUFhLENBQWhCLEVBQWtCLE9BQU8sQ0FBUCxDQUFTLEVBQUUsSUFBRixDQUFPLENBQVA7QUFBVTtBQUFsSyxXQUFrSyxPQUFPLENBQVA7QUFBUyxTQUF6UixFQUEwUixLQUFJLGFBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLGNBQUksQ0FBSjtBQUFBLGNBQU0sQ0FBTjtBQUFBLGNBQVEsSUFBRSxFQUFFLE9BQVo7QUFBQSxjQUFvQixJQUFFLEVBQUUsU0FBRixDQUFZLENBQVosQ0FBdEI7QUFBQSxjQUFxQyxJQUFFLEVBQUUsTUFBekMsQ0FBZ0QsT0FBTSxHQUFOO0FBQVUsZ0JBQUUsRUFBRSxDQUFGLENBQUYsRUFBTyxDQUFDLEVBQUUsUUFBRixHQUFXLEVBQUUsT0FBRixDQUFVLEVBQUUsUUFBRixDQUFXLE1BQVgsQ0FBa0IsR0FBbEIsQ0FBc0IsQ0FBdEIsQ0FBVixFQUFtQyxDQUFuQyxJQUFzQyxDQUFDLENBQW5ELE1BQXdELElBQUUsQ0FBQyxDQUEzRCxDQUFQO0FBQVYsV0FBK0UsT0FBTyxNQUFJLEVBQUUsYUFBRixHQUFnQixDQUFDLENBQXJCLEdBQXdCLENBQS9CO0FBQWlDLFNBQTVjLEVBQTlGLEVBQVYsRUFBVCxDQUFsbEIsRUFBb3BDLEVBQUUsSUFBRixDQUFPLENBQUMsT0FBRCxFQUFTLFVBQVQsQ0FBUCxFQUE0QixZQUFVO0FBQUMsTUFBRSxRQUFGLENBQVcsSUFBWCxJQUFpQixFQUFDLEtBQUksYUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsWUFBRyxNQUFNLE9BQU4sQ0FBYyxDQUFkLENBQUgsRUFBb0IsT0FBTyxFQUFFLE9BQUYsR0FBVSxFQUFFLE9BQUYsQ0FBVSxFQUFFLENBQUYsRUFBSyxHQUFMLEVBQVYsRUFBcUIsQ0FBckIsSUFBd0IsQ0FBQyxDQUExQztBQUE0QyxPQUFuRixFQUFqQixFQUFzRyxFQUFFLE9BQUYsS0FBWSxFQUFFLFFBQUYsQ0FBVyxJQUFYLEVBQWlCLEdBQWpCLEdBQXFCLFVBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxTQUFPLEVBQUUsWUFBRixDQUFlLE9BQWYsQ0FBUCxHQUErQixJQUEvQixHQUFvQyxFQUFFLEtBQTdDO0FBQW1ELEtBQWhHLENBQXRHO0FBQXdNLEdBQS9PLENBQXBwQyxDQUFxNEMsSUFBSSxLQUFHLGlDQUFQLENBQXlDLEVBQUUsTUFBRixDQUFTLEVBQUUsS0FBWCxFQUFpQixFQUFDLFNBQVEsaUJBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQjtBQUFDLFVBQUksQ0FBSjtBQUFBLFVBQU0sQ0FBTjtBQUFBLFVBQVEsQ0FBUjtBQUFBLFVBQVUsQ0FBVjtBQUFBLFVBQVksQ0FBWjtBQUFBLFVBQWMsQ0FBZDtBQUFBLFVBQWdCLENBQWhCO0FBQUEsVUFBa0IsSUFBRSxDQUFDLEtBQUcsQ0FBSixDQUFwQjtBQUFBLFVBQTJCLElBQUUsRUFBRSxJQUFGLENBQU8sQ0FBUCxFQUFTLE1BQVQsSUFBaUIsRUFBRSxJQUFuQixHQUF3QixDQUFyRDtBQUFBLFVBQXVELElBQUUsRUFBRSxJQUFGLENBQU8sQ0FBUCxFQUFTLFdBQVQsSUFBc0IsRUFBRSxTQUFGLENBQVksS0FBWixDQUFrQixHQUFsQixDQUF0QixHQUE2QyxFQUF0RyxDQUF5RyxJQUFHLElBQUUsSUFBRSxJQUFFLEtBQUcsQ0FBVCxFQUFXLE1BQUksRUFBRSxRQUFOLElBQWdCLE1BQUksRUFBRSxRQUF0QixJQUFnQyxDQUFDLEdBQUcsSUFBSCxDQUFRLElBQUUsRUFBRSxLQUFGLENBQVEsU0FBbEIsQ0FBakMsS0FBZ0UsRUFBRSxPQUFGLENBQVUsR0FBVixJQUFlLENBQUMsQ0FBaEIsS0FBb0IsSUFBRSxFQUFFLEtBQUYsQ0FBUSxHQUFSLENBQUYsRUFBZSxJQUFFLEVBQUUsS0FBRixFQUFqQixFQUEyQixFQUFFLElBQUYsRUFBL0MsR0FBeUQsSUFBRSxFQUFFLE9BQUYsQ0FBVSxHQUFWLElBQWUsQ0FBZixJQUFrQixPQUFLLENBQWxGLEVBQW9GLElBQUUsRUFBRSxFQUFFLE9BQUosSUFBYSxDQUFiLEdBQWUsSUFBSSxFQUFFLEtBQU4sQ0FBWSxDQUFaLEVBQWMsb0JBQWlCLENBQWpCLHlDQUFpQixDQUFqQixNQUFvQixDQUFsQyxDQUFyRyxFQUEwSSxFQUFFLFNBQUYsR0FBWSxJQUFFLENBQUYsR0FBSSxDQUExSixFQUE0SixFQUFFLFNBQUYsR0FBWSxFQUFFLElBQUYsQ0FBTyxHQUFQLENBQXhLLEVBQW9MLEVBQUUsVUFBRixHQUFhLEVBQUUsU0FBRixHQUFZLElBQUksTUFBSixDQUFXLFlBQVUsRUFBRSxJQUFGLENBQU8sZUFBUCxDQUFWLEdBQWtDLFNBQTdDLENBQVosR0FBb0UsSUFBclEsRUFBMFEsRUFBRSxNQUFGLEdBQVMsS0FBSyxDQUF4UixFQUEwUixFQUFFLE1BQUYsS0FBVyxFQUFFLE1BQUYsR0FBUyxDQUFwQixDQUExUixFQUFpVCxJQUFFLFFBQU0sQ0FBTixHQUFRLENBQUMsQ0FBRCxDQUFSLEdBQVksRUFBRSxTQUFGLENBQVksQ0FBWixFQUFjLENBQUMsQ0FBRCxDQUFkLENBQS9ULEVBQWtWLElBQUUsRUFBRSxLQUFGLENBQVEsT0FBUixDQUFnQixDQUFoQixLQUFvQixFQUF4VyxFQUEyVyxLQUFHLENBQUMsRUFBRSxPQUFOLElBQWUsRUFBRSxPQUFGLENBQVUsS0FBVixDQUFnQixDQUFoQixFQUFrQixDQUFsQixNQUF1QixDQUFDLENBQWxkLENBQWQsRUFBbWU7QUFBQyxZQUFHLENBQUMsQ0FBRCxJQUFJLENBQUMsRUFBRSxRQUFQLElBQWlCLENBQUMsRUFBRSxRQUFGLENBQVcsQ0FBWCxDQUFyQixFQUFtQztBQUFDLGVBQUksSUFBRSxFQUFFLFlBQUYsSUFBZ0IsQ0FBbEIsRUFBb0IsR0FBRyxJQUFILENBQVEsSUFBRSxDQUFWLE1BQWUsSUFBRSxFQUFFLFVBQW5CLENBQXhCLEVBQXVELENBQXZELEVBQXlELElBQUUsRUFBRSxVQUE3RDtBQUF3RSxjQUFFLElBQUYsQ0FBTyxDQUFQLEdBQVUsSUFBRSxDQUFaO0FBQXhFLFdBQXNGLE9BQUssRUFBRSxhQUFGLElBQWlCLENBQXRCLEtBQTBCLEVBQUUsSUFBRixDQUFPLEVBQUUsV0FBRixJQUFlLEVBQUUsWUFBakIsSUFBK0IsQ0FBdEMsQ0FBMUI7QUFBbUUsYUFBRSxDQUFGLENBQUksT0FBTSxDQUFDLElBQUUsRUFBRSxHQUFGLENBQUgsS0FBWSxDQUFDLEVBQUUsb0JBQUYsRUFBbkI7QUFBNEMsWUFBRSxJQUFGLEdBQU8sSUFBRSxDQUFGLEdBQUksQ0FBSixHQUFNLEVBQUUsUUFBRixJQUFZLENBQXpCLEVBQTJCLElBQUUsQ0FBQyxFQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVEsUUFBUixLQUFtQixFQUFwQixFQUF3QixFQUFFLElBQTFCLEtBQWlDLEVBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxRQUFSLENBQTlELEVBQWdGLEtBQUcsRUFBRSxLQUFGLENBQVEsQ0FBUixFQUFVLENBQVYsQ0FBbkYsRUFBZ0csSUFBRSxLQUFHLEVBQUUsQ0FBRixDQUFyRyxFQUEwRyxLQUFHLEVBQUUsS0FBTCxJQUFZLEVBQUUsQ0FBRixDQUFaLEtBQW1CLEVBQUUsTUFBRixHQUFTLEVBQUUsS0FBRixDQUFRLENBQVIsRUFBVSxDQUFWLENBQVQsRUFBc0IsRUFBRSxNQUFGLEtBQVcsQ0FBQyxDQUFaLElBQWUsRUFBRSxjQUFGLEVBQXhELENBQTFHO0FBQTVDLFNBQWtPLE9BQU8sRUFBRSxJQUFGLEdBQU8sQ0FBUCxFQUFTLEtBQUcsRUFBRSxrQkFBRixFQUFILElBQTJCLEVBQUUsUUFBRixJQUFZLEVBQUUsUUFBRixDQUFXLEtBQVgsQ0FBaUIsRUFBRSxHQUFGLEVBQWpCLEVBQXlCLENBQXpCLE1BQThCLENBQUMsQ0FBdEUsSUFBeUUsQ0FBQyxFQUFFLENBQUYsQ0FBMUUsSUFBZ0YsS0FBRyxFQUFFLFVBQUYsQ0FBYSxFQUFFLENBQUYsQ0FBYixDQUFILElBQXVCLENBQUMsRUFBRSxRQUFGLENBQVcsQ0FBWCxDQUF4QixLQUF3QyxJQUFFLEVBQUUsQ0FBRixDQUFGLEVBQU8sTUFBSSxFQUFFLENBQUYsSUFBSyxJQUFULENBQVAsRUFBc0IsRUFBRSxLQUFGLENBQVEsU0FBUixHQUFrQixDQUF4QyxFQUEwQyxFQUFFLENBQUYsR0FBMUMsRUFBaUQsRUFBRSxLQUFGLENBQVEsU0FBUixHQUFrQixLQUFLLENBQXhFLEVBQTBFLE1BQUksRUFBRSxDQUFGLElBQUssQ0FBVCxDQUFsSCxDQUF6RixFQUF3TixFQUFFLE1BQWpPO0FBQXdPO0FBQUMsS0FBcHZDLEVBQXF2QyxVQUFTLGtCQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsVUFBSSxJQUFFLEVBQUUsTUFBRixDQUFTLElBQUksRUFBRSxLQUFOLEVBQVQsRUFBcUIsQ0FBckIsRUFBdUIsRUFBQyxNQUFLLENBQU4sRUFBUSxhQUFZLENBQUMsQ0FBckIsRUFBdkIsQ0FBTixDQUFzRCxFQUFFLEtBQUYsQ0FBUSxPQUFSLENBQWdCLENBQWhCLEVBQWtCLElBQWxCLEVBQXVCLENBQXZCO0FBQTBCLEtBQTkxQyxFQUFqQixHQUFrM0MsRUFBRSxFQUFGLENBQUssTUFBTCxDQUFZLEVBQUMsU0FBUSxpQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsYUFBTyxLQUFLLElBQUwsQ0FBVSxZQUFVO0FBQUMsVUFBRSxLQUFGLENBQVEsT0FBUixDQUFnQixDQUFoQixFQUFrQixDQUFsQixFQUFvQixJQUFwQjtBQUEwQixPQUEvQyxDQUFQO0FBQXdELEtBQS9FLEVBQWdGLGdCQUFlLHdCQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxVQUFJLElBQUUsS0FBSyxDQUFMLENBQU4sQ0FBYyxJQUFHLENBQUgsRUFBSyxPQUFPLEVBQUUsS0FBRixDQUFRLE9BQVIsQ0FBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEIsRUFBb0IsQ0FBcEIsRUFBc0IsQ0FBQyxDQUF2QixDQUFQO0FBQWlDLEtBQWpLLEVBQVosQ0FBbDNDLEVBQWtpRCxFQUFFLElBQUYsQ0FBTyx3TEFBd0wsS0FBeEwsQ0FBOEwsR0FBOUwsQ0FBUCxFQUEwTSxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxNQUFFLEVBQUYsQ0FBSyxDQUFMLElBQVEsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsYUFBTyxVQUFVLE1BQVYsR0FBaUIsQ0FBakIsR0FBbUIsS0FBSyxFQUFMLENBQVEsQ0FBUixFQUFVLElBQVYsRUFBZSxDQUFmLEVBQWlCLENBQWpCLENBQW5CLEdBQXVDLEtBQUssT0FBTCxDQUFhLENBQWIsQ0FBOUM7QUFBOEQsS0FBcEY7QUFBcUYsR0FBN1MsQ0FBbGlELEVBQWkxRCxFQUFFLEVBQUYsQ0FBSyxNQUFMLENBQVksRUFBQyxPQUFNLGVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLGFBQU8sS0FBSyxVQUFMLENBQWdCLENBQWhCLEVBQW1CLFVBQW5CLENBQThCLEtBQUcsQ0FBakMsQ0FBUDtBQUEyQyxLQUFoRSxFQUFaLENBQWoxRCxFQUFnNkQsRUFBRSxPQUFGLEdBQVUsZUFBYyxDQUF4N0QsRUFBMDdELEVBQUUsT0FBRixJQUFXLEVBQUUsSUFBRixDQUFPLEVBQUMsT0FBTSxTQUFQLEVBQWlCLE1BQUssVUFBdEIsRUFBUCxFQUF5QyxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxRQUFJLElBQUUsU0FBRixDQUFFLENBQVMsQ0FBVCxFQUFXO0FBQUMsUUFBRSxLQUFGLENBQVEsUUFBUixDQUFpQixDQUFqQixFQUFtQixFQUFFLE1BQXJCLEVBQTRCLEVBQUUsS0FBRixDQUFRLEdBQVIsQ0FBWSxDQUFaLENBQTVCO0FBQTRDLEtBQTlELENBQStELEVBQUUsS0FBRixDQUFRLE9BQVIsQ0FBZ0IsQ0FBaEIsSUFBbUIsRUFBQyxPQUFNLGlCQUFVO0FBQUMsWUFBSSxJQUFFLEtBQUssYUFBTCxJQUFvQixJQUExQjtBQUFBLFlBQStCLElBQUUsRUFBRSxNQUFGLENBQVMsQ0FBVCxFQUFXLENBQVgsQ0FBakMsQ0FBK0MsS0FBRyxFQUFFLGdCQUFGLENBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQUMsQ0FBeEIsQ0FBSCxFQUE4QixFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQUMsS0FBRyxDQUFKLElBQU8sQ0FBcEIsQ0FBOUI7QUFBcUQsT0FBdEgsRUFBdUgsVUFBUyxvQkFBVTtBQUFDLFlBQUksSUFBRSxLQUFLLGFBQUwsSUFBb0IsSUFBMUI7QUFBQSxZQUErQixJQUFFLEVBQUUsTUFBRixDQUFTLENBQVQsRUFBVyxDQUFYLElBQWMsQ0FBL0MsQ0FBaUQsSUFBRSxFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsQ0FBRixJQUFtQixFQUFFLG1CQUFGLENBQXNCLENBQXRCLEVBQXdCLENBQXhCLEVBQTBCLENBQUMsQ0FBM0IsR0FBOEIsRUFBRSxNQUFGLENBQVMsQ0FBVCxFQUFXLENBQVgsQ0FBakQ7QUFBZ0UsT0FBNVAsRUFBbkI7QUFBaVIsR0FBdlksQ0FBcjhELENBQTgwRSxJQUFJLEtBQUcsRUFBRSxRQUFUO0FBQUEsTUFBa0IsS0FBRyxFQUFFLEdBQUYsRUFBckI7QUFBQSxNQUE2QixLQUFHLElBQWhDLENBQXFDLEVBQUUsUUFBRixHQUFXLFVBQVMsQ0FBVCxFQUFXO0FBQUMsUUFBSSxDQUFKLENBQU0sSUFBRyxDQUFDLENBQUQsSUFBSSxZQUFVLE9BQU8sQ0FBeEIsRUFBMEIsT0FBTyxJQUFQLENBQVksSUFBRztBQUFDLFVBQUcsSUFBSSxFQUFFLFNBQU4sRUFBRCxDQUFrQixlQUFsQixDQUFrQyxDQUFsQyxFQUFvQyxVQUFwQyxDQUFGO0FBQWtELEtBQXRELENBQXNELE9BQU0sQ0FBTixFQUFRO0FBQUMsVUFBRSxLQUFLLENBQVA7QUFBUyxZQUFPLEtBQUcsQ0FBQyxFQUFFLG9CQUFGLENBQXVCLGFBQXZCLEVBQXNDLE1BQTFDLElBQWtELEVBQUUsS0FBRixDQUFRLGtCQUFnQixDQUF4QixDQUFsRCxFQUE2RSxDQUFwRjtBQUFzRixHQUFqTyxDQUFrTyxJQUFJLEtBQUcsT0FBUDtBQUFBLE1BQWUsS0FBRyxRQUFsQjtBQUFBLE1BQTJCLEtBQUcsdUNBQTlCO0FBQUEsTUFBc0UsS0FBRyxvQ0FBekUsQ0FBOEcsU0FBUyxFQUFULENBQVksQ0FBWixFQUFjLENBQWQsRUFBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEIsRUFBb0I7QUFBQyxRQUFJLENBQUosQ0FBTSxJQUFHLE1BQU0sT0FBTixDQUFjLENBQWQsQ0FBSCxFQUFvQixFQUFFLElBQUYsQ0FBTyxDQUFQLEVBQVMsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsV0FBRyxHQUFHLElBQUgsQ0FBUSxDQUFSLENBQUgsR0FBYyxFQUFFLENBQUYsRUFBSSxDQUFKLENBQWQsR0FBcUIsR0FBRyxJQUFFLEdBQUYsSUFBTyxvQkFBaUIsQ0FBakIseUNBQWlCLENBQWpCLE1BQW9CLFFBQU0sQ0FBMUIsR0FBNEIsQ0FBNUIsR0FBOEIsRUFBckMsSUFBeUMsR0FBNUMsRUFBZ0QsQ0FBaEQsRUFBa0QsQ0FBbEQsRUFBb0QsQ0FBcEQsQ0FBckI7QUFBNEUsS0FBbkcsRUFBcEIsS0FBOEgsSUFBRyxLQUFHLGFBQVcsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUFqQixFQUEyQixFQUFFLENBQUYsRUFBSSxDQUFKLEVBQTNCLEtBQXVDLEtBQUksQ0FBSixJQUFTLENBQVQ7QUFBVyxTQUFHLElBQUUsR0FBRixHQUFNLENBQU4sR0FBUSxHQUFYLEVBQWUsRUFBRSxDQUFGLENBQWYsRUFBb0IsQ0FBcEIsRUFBc0IsQ0FBdEI7QUFBWDtBQUFvQyxLQUFFLEtBQUYsR0FBUSxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxRQUFJLENBQUo7QUFBQSxRQUFNLElBQUUsRUFBUjtBQUFBLFFBQVcsSUFBRSxTQUFGLENBQUUsQ0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsVUFBSSxJQUFFLEVBQUUsVUFBRixDQUFhLENBQWIsSUFBZ0IsR0FBaEIsR0FBb0IsQ0FBMUIsQ0FBNEIsRUFBRSxFQUFFLE1BQUosSUFBWSxtQkFBbUIsQ0FBbkIsSUFBc0IsR0FBdEIsR0FBMEIsbUJBQW1CLFFBQU0sQ0FBTixHQUFRLEVBQVIsR0FBVyxDQUE5QixDQUF0QztBQUF1RSxLQUE5SCxDQUErSCxJQUFHLE1BQU0sT0FBTixDQUFjLENBQWQsS0FBa0IsRUFBRSxNQUFGLElBQVUsQ0FBQyxFQUFFLGFBQUYsQ0FBZ0IsQ0FBaEIsQ0FBaEMsRUFBbUQsRUFBRSxJQUFGLENBQU8sQ0FBUCxFQUFTLFlBQVU7QUFBQyxRQUFFLEtBQUssSUFBUCxFQUFZLEtBQUssS0FBakI7QUFBd0IsS0FBNUMsRUFBbkQsS0FBc0csS0FBSSxDQUFKLElBQVMsQ0FBVDtBQUFXLFNBQUcsQ0FBSCxFQUFLLEVBQUUsQ0FBRixDQUFMLEVBQVUsQ0FBVixFQUFZLENBQVo7QUFBWCxLQUEwQixPQUFPLEVBQUUsSUFBRixDQUFPLEdBQVAsQ0FBUDtBQUFtQixHQUF4UyxFQUF5UyxFQUFFLEVBQUYsQ0FBSyxNQUFMLENBQVksRUFBQyxXQUFVLHFCQUFVO0FBQUMsYUFBTyxFQUFFLEtBQUYsQ0FBUSxLQUFLLGNBQUwsRUFBUixDQUFQO0FBQXNDLEtBQTVELEVBQTZELGdCQUFlLDBCQUFVO0FBQUMsYUFBTyxLQUFLLEdBQUwsQ0FBUyxZQUFVO0FBQUMsWUFBSSxJQUFFLEVBQUUsSUFBRixDQUFPLElBQVAsRUFBWSxVQUFaLENBQU4sQ0FBOEIsT0FBTyxJQUFFLEVBQUUsU0FBRixDQUFZLENBQVosQ0FBRixHQUFpQixJQUF4QjtBQUE2QixPQUEvRSxFQUFpRixNQUFqRixDQUF3RixZQUFVO0FBQUMsWUFBSSxJQUFFLEtBQUssSUFBWCxDQUFnQixPQUFPLEtBQUssSUFBTCxJQUFXLENBQUMsRUFBRSxJQUFGLEVBQVEsRUFBUixDQUFXLFdBQVgsQ0FBWixJQUFxQyxHQUFHLElBQUgsQ0FBUSxLQUFLLFFBQWIsQ0FBckMsSUFBNkQsQ0FBQyxHQUFHLElBQUgsQ0FBUSxDQUFSLENBQTlELEtBQTJFLEtBQUssT0FBTCxJQUFjLENBQUMsR0FBRyxJQUFILENBQVEsQ0FBUixDQUExRixDQUFQO0FBQTZHLE9BQWhPLEVBQWtPLEdBQWxPLENBQXNPLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFlBQUksSUFBRSxFQUFFLElBQUYsRUFBUSxHQUFSLEVBQU4sQ0FBb0IsT0FBTyxRQUFNLENBQU4sR0FBUSxJQUFSLEdBQWEsTUFBTSxPQUFOLENBQWMsQ0FBZCxJQUFpQixFQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVEsVUFBUyxDQUFULEVBQVc7QUFBQyxpQkFBTSxFQUFDLE1BQUssRUFBRSxJQUFSLEVBQWEsT0FBTSxFQUFFLE9BQUYsQ0FBVSxFQUFWLEVBQWEsTUFBYixDQUFuQixFQUFOO0FBQStDLFNBQW5FLENBQWpCLEdBQXNGLEVBQUMsTUFBSyxFQUFFLElBQVIsRUFBYSxPQUFNLEVBQUUsT0FBRixDQUFVLEVBQVYsRUFBYSxNQUFiLENBQW5CLEVBQTFHO0FBQW1KLE9BQTNaLEVBQTZaLEdBQTdaLEVBQVA7QUFBMGEsS0FBamdCLEVBQVosQ0FBelMsQ0FBeXpCLElBQUksS0FBRyxNQUFQO0FBQUEsTUFBYyxLQUFHLE1BQWpCO0FBQUEsTUFBd0IsS0FBRyxlQUEzQjtBQUFBLE1BQTJDLEtBQUcsNEJBQTlDO0FBQUEsTUFBMkUsS0FBRywyREFBOUU7QUFBQSxNQUEwSSxLQUFHLGdCQUE3STtBQUFBLE1BQThKLEtBQUcsT0FBaks7QUFBQSxNQUF5SyxLQUFHLEVBQTVLO0FBQUEsTUFBK0ssS0FBRyxFQUFsTDtBQUFBLE1BQXFMLEtBQUcsS0FBSyxNQUFMLENBQVksR0FBWixDQUF4TDtBQUFBLE1BQXlNLEtBQUcsRUFBRSxhQUFGLENBQWdCLEdBQWhCLENBQTVNLENBQWlPLEdBQUcsSUFBSCxHQUFRLEdBQUcsSUFBWCxDQUFnQixTQUFTLEVBQVQsQ0FBWSxDQUFaLEVBQWM7QUFBQyxXQUFPLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLGtCQUFVLE9BQU8sQ0FBakIsS0FBcUIsSUFBRSxDQUFGLEVBQUksSUFBRSxHQUEzQixFQUFnQyxJQUFJLENBQUo7QUFBQSxVQUFNLElBQUUsQ0FBUjtBQUFBLFVBQVUsSUFBRSxFQUFFLFdBQUYsR0FBZ0IsS0FBaEIsQ0FBc0IsQ0FBdEIsS0FBMEIsRUFBdEMsQ0FBeUMsSUFBRyxFQUFFLFVBQUYsQ0FBYSxDQUFiLENBQUgsRUFBbUIsT0FBTSxJQUFFLEVBQUUsR0FBRixDQUFSO0FBQWUsZ0JBQU0sRUFBRSxDQUFGLENBQU4sSUFBWSxJQUFFLEVBQUUsS0FBRixDQUFRLENBQVIsS0FBWSxHQUFkLEVBQWtCLENBQUMsRUFBRSxDQUFGLElBQUssRUFBRSxDQUFGLEtBQU0sRUFBWixFQUFnQixPQUFoQixDQUF3QixDQUF4QixDQUE5QixJQUEwRCxDQUFDLEVBQUUsQ0FBRixJQUFLLEVBQUUsQ0FBRixLQUFNLEVBQVosRUFBZ0IsSUFBaEIsQ0FBcUIsQ0FBckIsQ0FBMUQ7QUFBZjtBQUFpRyxLQUFsTjtBQUFtTixZQUFTLEVBQVQsQ0FBWSxDQUFaLEVBQWMsQ0FBZCxFQUFnQixDQUFoQixFQUFrQixDQUFsQixFQUFvQjtBQUFDLFFBQUksSUFBRSxFQUFOO0FBQUEsUUFBUyxJQUFFLE1BQUksRUFBZixDQUFrQixTQUFTLENBQVQsQ0FBVyxDQUFYLEVBQWE7QUFBQyxVQUFJLENBQUosQ0FBTSxPQUFPLEVBQUUsQ0FBRixJQUFLLENBQUMsQ0FBTixFQUFRLEVBQUUsSUFBRixDQUFPLEVBQUUsQ0FBRixLQUFNLEVBQWIsRUFBZ0IsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsWUFBSSxJQUFFLEVBQUUsQ0FBRixFQUFJLENBQUosRUFBTSxDQUFOLENBQU4sQ0FBZSxPQUFNLFlBQVUsT0FBTyxDQUFqQixJQUFvQixDQUFwQixJQUF1QixFQUFFLENBQUYsQ0FBdkIsR0FBNEIsSUFBRSxFQUFFLElBQUUsQ0FBSixDQUFGLEdBQVMsS0FBSyxDQUExQyxJQUE2QyxFQUFFLFNBQUYsQ0FBWSxPQUFaLENBQW9CLENBQXBCLEdBQXVCLEVBQUUsQ0FBRixDQUF2QixFQUE0QixDQUFDLENBQTFFLENBQU47QUFBbUYsT0FBaEksQ0FBUixFQUEwSSxDQUFqSjtBQUFtSixZQUFPLEVBQUUsRUFBRSxTQUFGLENBQVksQ0FBWixDQUFGLEtBQW1CLENBQUMsRUFBRSxHQUFGLENBQUQsSUFBUyxFQUFFLEdBQUYsQ0FBbkM7QUFBMEMsWUFBUyxFQUFULENBQVksQ0FBWixFQUFjLENBQWQsRUFBZ0I7QUFBQyxRQUFJLENBQUo7QUFBQSxRQUFNLENBQU47QUFBQSxRQUFRLElBQUUsRUFBRSxZQUFGLENBQWUsV0FBZixJQUE0QixFQUF0QyxDQUF5QyxLQUFJLENBQUosSUFBUyxDQUFUO0FBQVcsV0FBSyxDQUFMLEtBQVMsRUFBRSxDQUFGLENBQVQsS0FBZ0IsQ0FBQyxFQUFFLENBQUYsSUFBSyxDQUFMLEdBQU8sTUFBSSxJQUFFLEVBQU4sQ0FBUixFQUFtQixDQUFuQixJQUFzQixFQUFFLENBQUYsQ0FBdEM7QUFBWCxLQUF1RCxPQUFPLEtBQUcsRUFBRSxNQUFGLENBQVMsQ0FBQyxDQUFWLEVBQVksQ0FBWixFQUFjLENBQWQsQ0FBSCxFQUFvQixDQUEzQjtBQUE2QixZQUFTLEVBQVQsQ0FBWSxDQUFaLEVBQWMsQ0FBZCxFQUFnQixDQUFoQixFQUFrQjtBQUFDLFFBQUksQ0FBSjtBQUFBLFFBQU0sQ0FBTjtBQUFBLFFBQVEsQ0FBUjtBQUFBLFFBQVUsQ0FBVjtBQUFBLFFBQVksSUFBRSxFQUFFLFFBQWhCO0FBQUEsUUFBeUIsSUFBRSxFQUFFLFNBQTdCLENBQXVDLE9BQU0sUUFBTSxFQUFFLENBQUYsQ0FBWjtBQUFpQixRQUFFLEtBQUYsSUFBVSxLQUFLLENBQUwsS0FBUyxDQUFULEtBQWEsSUFBRSxFQUFFLFFBQUYsSUFBWSxFQUFFLGlCQUFGLENBQW9CLGNBQXBCLENBQTNCLENBQVY7QUFBakIsS0FBMkYsSUFBRyxDQUFILEVBQUssS0FBSSxDQUFKLElBQVMsQ0FBVDtBQUFXLFVBQUcsRUFBRSxDQUFGLEtBQU0sRUFBRSxDQUFGLEVBQUssSUFBTCxDQUFVLENBQVYsQ0FBVCxFQUFzQjtBQUFDLFVBQUUsT0FBRixDQUFVLENBQVYsRUFBYTtBQUFNO0FBQXJELEtBQXFELElBQUcsRUFBRSxDQUFGLEtBQU8sQ0FBVixFQUFZLElBQUUsRUFBRSxDQUFGLENBQUYsQ0FBWixLQUF1QjtBQUFDLFdBQUksQ0FBSixJQUFTLENBQVQsRUFBVztBQUFDLFlBQUcsQ0FBQyxFQUFFLENBQUYsQ0FBRCxJQUFPLEVBQUUsVUFBRixDQUFhLElBQUUsR0FBRixHQUFNLEVBQUUsQ0FBRixDQUFuQixDQUFWLEVBQW1DO0FBQUMsY0FBRSxDQUFGLENBQUk7QUFBTSxlQUFJLElBQUUsQ0FBTjtBQUFTLFdBQUUsS0FBRyxDQUFMO0FBQU8sU0FBRyxDQUFILEVBQUssT0FBTyxNQUFJLEVBQUUsQ0FBRixDQUFKLElBQVUsRUFBRSxPQUFGLENBQVUsQ0FBVixDQUFWLEVBQXVCLEVBQUUsQ0FBRixDQUE5QjtBQUFtQyxZQUFTLEVBQVQsQ0FBWSxDQUFaLEVBQWMsQ0FBZCxFQUFnQixDQUFoQixFQUFrQixDQUFsQixFQUFvQjtBQUFDLFFBQUksQ0FBSjtBQUFBLFFBQU0sQ0FBTjtBQUFBLFFBQVEsQ0FBUjtBQUFBLFFBQVUsQ0FBVjtBQUFBLFFBQVksQ0FBWjtBQUFBLFFBQWMsSUFBRSxFQUFoQjtBQUFBLFFBQW1CLElBQUUsRUFBRSxTQUFGLENBQVksS0FBWixFQUFyQixDQUF5QyxJQUFHLEVBQUUsQ0FBRixDQUFILEVBQVEsS0FBSSxDQUFKLElBQVMsRUFBRSxVQUFYO0FBQXNCLFFBQUUsRUFBRSxXQUFGLEVBQUYsSUFBbUIsRUFBRSxVQUFGLENBQWEsQ0FBYixDQUFuQjtBQUF0QixLQUF5RCxJQUFFLEVBQUUsS0FBRixFQUFGLENBQVksT0FBTSxDQUFOO0FBQVEsVUFBRyxFQUFFLGNBQUYsQ0FBaUIsQ0FBakIsTUFBc0IsRUFBRSxFQUFFLGNBQUYsQ0FBaUIsQ0FBakIsQ0FBRixJQUF1QixDQUE3QyxHQUFnRCxDQUFDLENBQUQsSUFBSSxDQUFKLElBQU8sRUFBRSxVQUFULEtBQXNCLElBQUUsRUFBRSxVQUFGLENBQWEsQ0FBYixFQUFlLEVBQUUsUUFBakIsQ0FBeEIsQ0FBaEQsRUFBb0csSUFBRSxDQUF0RyxFQUF3RyxJQUFFLEVBQUUsS0FBRixFQUE3RyxFQUF1SCxJQUFHLFFBQU0sQ0FBVCxFQUFXLElBQUUsQ0FBRixDQUFYLEtBQW9CLElBQUcsUUFBTSxDQUFOLElBQVMsTUFBSSxDQUFoQixFQUFrQjtBQUFDLFlBQUcsSUFBRSxFQUFFLElBQUUsR0FBRixHQUFNLENBQVIsS0FBWSxFQUFFLE9BQUssQ0FBUCxDQUFkLEVBQXdCLENBQUMsQ0FBNUIsRUFBOEIsS0FBSSxDQUFKLElBQVMsQ0FBVDtBQUFXLGNBQUcsSUFBRSxFQUFFLEtBQUYsQ0FBUSxHQUFSLENBQUYsRUFBZSxFQUFFLENBQUYsTUFBTyxDQUFQLEtBQVcsSUFBRSxFQUFFLElBQUUsR0FBRixHQUFNLEVBQUUsQ0FBRixDQUFSLEtBQWUsRUFBRSxPQUFLLEVBQUUsQ0FBRixDQUFQLENBQTVCLENBQWxCLEVBQTREO0FBQUMsa0JBQUksQ0FBQyxDQUFMLEdBQU8sSUFBRSxFQUFFLENBQUYsQ0FBVCxHQUFjLEVBQUUsQ0FBRixNQUFPLENBQUMsQ0FBUixLQUFZLElBQUUsRUFBRSxDQUFGLENBQUYsRUFBTyxFQUFFLE9BQUYsQ0FBVSxFQUFFLENBQUYsQ0FBVixDQUFuQixDQUFkLENBQWtEO0FBQU07QUFBaEksU0FBZ0ksSUFBRyxNQUFJLENBQUMsQ0FBUixFQUFVLElBQUcsS0FBRyxFQUFFLFFBQUYsQ0FBTixFQUFrQixJQUFFLEVBQUUsQ0FBRixDQUFGLENBQWxCLEtBQThCLElBQUc7QUFBQyxjQUFFLEVBQUUsQ0FBRixDQUFGO0FBQU8sU0FBWCxDQUFXLE9BQU0sQ0FBTixFQUFRO0FBQUMsaUJBQU0sRUFBQyxPQUFNLGFBQVAsRUFBcUIsT0FBTSxJQUFFLENBQUYsR0FBSSx3QkFBc0IsQ0FBdEIsR0FBd0IsTUFBeEIsR0FBK0IsQ0FBOUQsRUFBTjtBQUF1RTtBQUFDO0FBQXhjLEtBQXdjLE9BQU0sRUFBQyxPQUFNLFNBQVAsRUFBaUIsTUFBSyxDQUF0QixFQUFOO0FBQStCLEtBQUUsTUFBRixDQUFTLEVBQUMsUUFBTyxDQUFSLEVBQVUsY0FBYSxFQUF2QixFQUEwQixNQUFLLEVBQS9CLEVBQWtDLGNBQWEsRUFBQyxLQUFJLEdBQUcsSUFBUixFQUFhLE1BQUssS0FBbEIsRUFBd0IsU0FBUSxHQUFHLElBQUgsQ0FBUSxHQUFHLFFBQVgsQ0FBaEMsRUFBcUQsUUFBTyxDQUFDLENBQTdELEVBQStELGFBQVksQ0FBQyxDQUE1RSxFQUE4RSxPQUFNLENBQUMsQ0FBckYsRUFBdUYsYUFBWSxrREFBbkcsRUFBc0osU0FBUSxFQUFDLEtBQUksRUFBTCxFQUFRLE1BQUssWUFBYixFQUEwQixNQUFLLFdBQS9CLEVBQTJDLEtBQUksMkJBQS9DLEVBQTJFLE1BQUssbUNBQWhGLEVBQTlKLEVBQW1SLFVBQVMsRUFBQyxLQUFJLFNBQUwsRUFBZSxNQUFLLFFBQXBCLEVBQTZCLE1BQUssVUFBbEMsRUFBNVIsRUFBMFUsZ0JBQWUsRUFBQyxLQUFJLGFBQUwsRUFBbUIsTUFBSyxjQUF4QixFQUF1QyxNQUFLLGNBQTVDLEVBQXpWLEVBQXFaLFlBQVcsRUFBQyxVQUFTLE1BQVYsRUFBaUIsYUFBWSxDQUFDLENBQTlCLEVBQWdDLGFBQVksS0FBSyxLQUFqRCxFQUF1RCxZQUFXLEVBQUUsUUFBcEUsRUFBaGEsRUFBOGUsYUFBWSxFQUFDLEtBQUksQ0FBQyxDQUFOLEVBQVEsU0FBUSxDQUFDLENBQWpCLEVBQTFmLEVBQS9DLEVBQThqQixXQUFVLG1CQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxhQUFPLElBQUUsR0FBRyxHQUFHLENBQUgsRUFBSyxFQUFFLFlBQVAsQ0FBSCxFQUF3QixDQUF4QixDQUFGLEdBQTZCLEdBQUcsRUFBRSxZQUFMLEVBQWtCLENBQWxCLENBQXBDO0FBQXlELEtBQS9vQixFQUFncEIsZUFBYyxHQUFHLEVBQUgsQ0FBOXBCLEVBQXFxQixlQUFjLEdBQUcsRUFBSCxDQUFuckIsRUFBMHJCLE1BQUssY0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsMEJBQWlCLENBQWpCLHlDQUFpQixDQUFqQixPQUFxQixJQUFFLENBQUYsRUFBSSxJQUFFLEtBQUssQ0FBaEMsR0FBbUMsSUFBRSxLQUFHLEVBQXhDLENBQTJDLElBQUksQ0FBSjtBQUFBLFVBQU0sQ0FBTjtBQUFBLFVBQVEsQ0FBUjtBQUFBLFVBQVUsQ0FBVjtBQUFBLFVBQVksQ0FBWjtBQUFBLFVBQWMsQ0FBZDtBQUFBLFVBQWdCLENBQWhCO0FBQUEsVUFBa0IsQ0FBbEI7QUFBQSxVQUFvQixDQUFwQjtBQUFBLFVBQXNCLENBQXRCO0FBQUEsVUFBd0IsSUFBRSxFQUFFLFNBQUYsQ0FBWSxFQUFaLEVBQWUsQ0FBZixDQUExQjtBQUFBLFVBQTRDLElBQUUsRUFBRSxPQUFGLElBQVcsQ0FBekQ7QUFBQSxVQUEyRCxJQUFFLEVBQUUsT0FBRixLQUFZLEVBQUUsUUFBRixJQUFZLEVBQUUsTUFBMUIsSUFBa0MsRUFBRSxDQUFGLENBQWxDLEdBQXVDLEVBQUUsS0FBdEc7QUFBQSxVQUE0RyxJQUFFLEVBQUUsUUFBRixFQUE5RztBQUFBLFVBQTJILElBQUUsRUFBRSxTQUFGLENBQVksYUFBWixDQUE3SDtBQUFBLFVBQXdKLElBQUUsRUFBRSxVQUFGLElBQWMsRUFBeEs7QUFBQSxVQUEySyxJQUFFLEVBQTdLO0FBQUEsVUFBZ0wsSUFBRSxFQUFsTDtBQUFBLFVBQXFMLElBQUUsVUFBdkw7QUFBQSxVQUFrTSxJQUFFLEVBQUMsWUFBVyxDQUFaLEVBQWMsbUJBQWtCLDJCQUFTLENBQVQsRUFBVztBQUFDLGNBQUksQ0FBSixDQUFNLElBQUcsQ0FBSCxFQUFLO0FBQUMsZ0JBQUcsQ0FBQyxDQUFKLEVBQU07QUFBQyxrQkFBRSxFQUFGLENBQUssT0FBTSxJQUFFLEdBQUcsSUFBSCxDQUFRLENBQVIsQ0FBUjtBQUFtQixrQkFBRSxFQUFFLENBQUYsRUFBSyxXQUFMLEVBQUYsSUFBc0IsRUFBRSxDQUFGLENBQXRCO0FBQW5CO0FBQThDLGlCQUFFLEVBQUUsRUFBRSxXQUFGLEVBQUYsQ0FBRjtBQUFxQixrQkFBTyxRQUFNLENBQU4sR0FBUSxJQUFSLEdBQWEsQ0FBcEI7QUFBc0IsU0FBN0osRUFBOEosdUJBQXNCLGlDQUFVO0FBQUMsaUJBQU8sSUFBRSxDQUFGLEdBQUksSUFBWDtBQUFnQixTQUEvTSxFQUFnTixrQkFBaUIsMEJBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLGlCQUFPLFFBQU0sQ0FBTixLQUFVLElBQUUsRUFBRSxFQUFFLFdBQUYsRUFBRixJQUFtQixFQUFFLEVBQUUsV0FBRixFQUFGLEtBQW9CLENBQXpDLEVBQTJDLEVBQUUsQ0FBRixJQUFLLENBQTFELEdBQTZELElBQXBFO0FBQXlFLFNBQXhULEVBQXlULGtCQUFpQiwwQkFBUyxDQUFULEVBQVc7QUFBQyxpQkFBTyxRQUFNLENBQU4sS0FBVSxFQUFFLFFBQUYsR0FBVyxDQUFyQixHQUF3QixJQUEvQjtBQUFvQyxTQUExWCxFQUEyWCxZQUFXLG9CQUFTLENBQVQsRUFBVztBQUFDLGNBQUksQ0FBSixDQUFNLElBQUcsQ0FBSCxFQUFLLElBQUcsQ0FBSCxFQUFLLEVBQUUsTUFBRixDQUFTLEVBQUUsRUFBRSxNQUFKLENBQVQsRUFBTCxLQUFnQyxLQUFJLENBQUosSUFBUyxDQUFUO0FBQVcsY0FBRSxDQUFGLElBQUssQ0FBQyxFQUFFLENBQUYsQ0FBRCxFQUFNLEVBQUUsQ0FBRixDQUFOLENBQUw7QUFBWCxXQUE0QixPQUFPLElBQVA7QUFBWSxTQUFyZSxFQUFzZSxPQUFNLGVBQVMsQ0FBVCxFQUFXO0FBQUMsY0FBSSxJQUFFLEtBQUcsQ0FBVCxDQUFXLE9BQU8sS0FBRyxFQUFFLEtBQUYsQ0FBUSxDQUFSLENBQUgsRUFBYyxFQUFFLENBQUYsRUFBSSxDQUFKLENBQWQsRUFBcUIsSUFBNUI7QUFBaUMsU0FBcGlCLEVBQXBNLENBQTB1QixJQUFHLEVBQUUsT0FBRixDQUFVLENBQVYsR0FBYSxFQUFFLEdBQUYsR0FBTSxDQUFDLENBQUMsS0FBRyxFQUFFLEdBQUwsSUFBVSxHQUFHLElBQWQsSUFBb0IsRUFBckIsRUFBeUIsT0FBekIsQ0FBaUMsRUFBakMsRUFBb0MsR0FBRyxRQUFILEdBQVksSUFBaEQsQ0FBbkIsRUFBeUUsRUFBRSxJQUFGLEdBQU8sRUFBRSxNQUFGLElBQVUsRUFBRSxJQUFaLElBQWtCLEVBQUUsTUFBcEIsSUFBNEIsRUFBRSxJQUE5RyxFQUFtSCxFQUFFLFNBQUYsR0FBWSxDQUFDLEVBQUUsUUFBRixJQUFZLEdBQWIsRUFBa0IsV0FBbEIsR0FBZ0MsS0FBaEMsQ0FBc0MsQ0FBdEMsS0FBMEMsQ0FBQyxFQUFELENBQXpLLEVBQThLLFFBQU0sRUFBRSxXQUF6TCxFQUFxTTtBQUFDLFlBQUUsRUFBRSxhQUFGLENBQWdCLEdBQWhCLENBQUYsQ0FBdUIsSUFBRztBQUFDLFlBQUUsSUFBRixHQUFPLEVBQUUsR0FBVCxFQUFhLEVBQUUsSUFBRixHQUFPLEVBQUUsSUFBdEIsRUFBMkIsRUFBRSxXQUFGLEdBQWMsR0FBRyxRQUFILEdBQVksSUFBWixHQUFpQixHQUFHLElBQXBCLElBQTBCLEVBQUUsUUFBRixHQUFXLElBQVgsR0FBZ0IsRUFBRSxJQUFyRjtBQUEwRixTQUE5RixDQUE4RixPQUFNLENBQU4sRUFBUTtBQUFDLFlBQUUsV0FBRixHQUFjLENBQUMsQ0FBZjtBQUFpQjtBQUFDLFdBQUcsRUFBRSxJQUFGLElBQVEsRUFBRSxXQUFWLElBQXVCLFlBQVUsT0FBTyxFQUFFLElBQTFDLEtBQWlELEVBQUUsSUFBRixHQUFPLEVBQUUsS0FBRixDQUFRLEVBQUUsSUFBVixFQUFlLEVBQUUsV0FBakIsQ0FBeEQsR0FBdUYsR0FBRyxFQUFILEVBQU0sQ0FBTixFQUFRLENBQVIsRUFBVSxDQUFWLENBQXZGLEVBQW9HLENBQXZHLEVBQXlHLE9BQU8sQ0FBUCxDQUFTLElBQUUsRUFBRSxLQUFGLElBQVMsRUFBRSxNQUFiLEVBQW9CLEtBQUcsTUFBSSxFQUFFLE1BQUYsRUFBUCxJQUFtQixFQUFFLEtBQUYsQ0FBUSxPQUFSLENBQWdCLFdBQWhCLENBQXZDLEVBQW9FLEVBQUUsSUFBRixHQUFPLEVBQUUsSUFBRixDQUFPLFdBQVAsRUFBM0UsRUFBZ0csRUFBRSxVQUFGLEdBQWEsQ0FBQyxHQUFHLElBQUgsQ0FBUSxFQUFFLElBQVYsQ0FBOUcsRUFBOEgsSUFBRSxFQUFFLEdBQUYsQ0FBTSxPQUFOLENBQWMsRUFBZCxFQUFpQixFQUFqQixDQUFoSSxFQUFxSixFQUFFLFVBQUYsR0FBYSxFQUFFLElBQUYsSUFBUSxFQUFFLFdBQVYsSUFBdUIsTUFBSSxDQUFDLEVBQUUsV0FBRixJQUFlLEVBQWhCLEVBQW9CLE9BQXBCLENBQTRCLG1DQUE1QixDQUEzQixLQUE4RixFQUFFLElBQUYsR0FBTyxFQUFFLElBQUYsQ0FBTyxPQUFQLENBQWUsRUFBZixFQUFrQixHQUFsQixDQUFyRyxDQUFiLElBQTJJLElBQUUsRUFBRSxHQUFGLENBQU0sS0FBTixDQUFZLEVBQUUsTUFBZCxDQUFGLEVBQXdCLEVBQUUsSUFBRixLQUFTLEtBQUcsQ0FBQyxHQUFHLElBQUgsQ0FBUSxDQUFSLElBQVcsR0FBWCxHQUFlLEdBQWhCLElBQXFCLEVBQUUsSUFBMUIsRUFBK0IsT0FBTyxFQUFFLElBQWpELENBQXhCLEVBQStFLEVBQUUsS0FBRixLQUFVLENBQUMsQ0FBWCxLQUFlLElBQUUsRUFBRSxPQUFGLENBQVUsRUFBVixFQUFhLElBQWIsQ0FBRixFQUFxQixJQUFFLENBQUMsR0FBRyxJQUFILENBQVEsQ0FBUixJQUFXLEdBQVgsR0FBZSxHQUFoQixJQUFxQixJQUFyQixHQUEwQixJQUExQixHQUFnQyxDQUF0RSxDQUEvRSxFQUF3SixFQUFFLEdBQUYsR0FBTSxJQUFFLENBQTNTLENBQXJKLEVBQW1jLEVBQUUsVUFBRixLQUFlLEVBQUUsWUFBRixDQUFlLENBQWYsS0FBbUIsRUFBRSxnQkFBRixDQUFtQixtQkFBbkIsRUFBdUMsRUFBRSxZQUFGLENBQWUsQ0FBZixDQUF2QyxDQUFuQixFQUE2RSxFQUFFLElBQUYsQ0FBTyxDQUFQLEtBQVcsRUFBRSxnQkFBRixDQUFtQixlQUFuQixFQUFtQyxFQUFFLElBQUYsQ0FBTyxDQUFQLENBQW5DLENBQXZHLENBQW5jLEVBQXlsQixDQUFDLEVBQUUsSUFBRixJQUFRLEVBQUUsVUFBVixJQUFzQixFQUFFLFdBQUYsS0FBZ0IsQ0FBQyxDQUF2QyxJQUEwQyxFQUFFLFdBQTdDLEtBQTJELEVBQUUsZ0JBQUYsQ0FBbUIsY0FBbkIsRUFBa0MsRUFBRSxXQUFwQyxDQUFwcEIsRUFBcXNCLEVBQUUsZ0JBQUYsQ0FBbUIsUUFBbkIsRUFBNEIsRUFBRSxTQUFGLENBQVksQ0FBWixLQUFnQixFQUFFLE9BQUYsQ0FBVSxFQUFFLFNBQUYsQ0FBWSxDQUFaLENBQVYsQ0FBaEIsR0FBMEMsRUFBRSxPQUFGLENBQVUsRUFBRSxTQUFGLENBQVksQ0FBWixDQUFWLEtBQTJCLFFBQU0sRUFBRSxTQUFGLENBQVksQ0FBWixDQUFOLEdBQXFCLE9BQUssRUFBTCxHQUFRLFVBQTdCLEdBQXdDLEVBQW5FLENBQTFDLEdBQWlILEVBQUUsT0FBRixDQUFVLEdBQVYsQ0FBN0ksQ0FBcnNCLENBQWsyQixLQUFJLENBQUosSUFBUyxFQUFFLE9BQVg7QUFBbUIsVUFBRSxnQkFBRixDQUFtQixDQUFuQixFQUFxQixFQUFFLE9BQUYsQ0FBVSxDQUFWLENBQXJCO0FBQW5CLE9BQXNELElBQUcsRUFBRSxVQUFGLEtBQWUsRUFBRSxVQUFGLENBQWEsSUFBYixDQUFrQixDQUFsQixFQUFvQixDQUFwQixFQUFzQixDQUF0QixNQUEyQixDQUFDLENBQTVCLElBQStCLENBQTlDLENBQUgsRUFBb0QsT0FBTyxFQUFFLEtBQUYsRUFBUCxDQUFpQixJQUFHLElBQUUsT0FBRixFQUFVLEVBQUUsR0FBRixDQUFNLEVBQUUsUUFBUixDQUFWLEVBQTRCLEVBQUUsSUFBRixDQUFPLEVBQUUsT0FBVCxDQUE1QixFQUE4QyxFQUFFLElBQUYsQ0FBTyxFQUFFLEtBQVQsQ0FBOUMsRUFBOEQsSUFBRSxHQUFHLEVBQUgsRUFBTSxDQUFOLEVBQVEsQ0FBUixFQUFVLENBQVYsQ0FBbkUsRUFBZ0Y7QUFBQyxZQUFHLEVBQUUsVUFBRixHQUFhLENBQWIsRUFBZSxLQUFHLEVBQUUsT0FBRixDQUFVLFVBQVYsRUFBcUIsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFyQixDQUFsQixFQUE4QyxDQUFqRCxFQUFtRCxPQUFPLENBQVAsQ0FBUyxFQUFFLEtBQUYsSUFBUyxFQUFFLE9BQUYsR0FBVSxDQUFuQixLQUF1QixJQUFFLEVBQUUsVUFBRixDQUFhLFlBQVU7QUFBQyxZQUFFLEtBQUYsQ0FBUSxTQUFSO0FBQW1CLFNBQTNDLEVBQTRDLEVBQUUsT0FBOUMsQ0FBekIsRUFBaUYsSUFBRztBQUFDLGNBQUUsQ0FBQyxDQUFILEVBQUssRUFBRSxJQUFGLENBQU8sQ0FBUCxFQUFTLENBQVQsQ0FBTDtBQUFpQixTQUFyQixDQUFxQixPQUFNLENBQU4sRUFBUTtBQUFDLGNBQUcsQ0FBSCxFQUFLLE1BQU0sQ0FBTixDQUFRLEVBQUUsQ0FBQyxDQUFILEVBQUssQ0FBTDtBQUFRO0FBQUMsT0FBbFIsTUFBdVIsRUFBRSxDQUFDLENBQUgsRUFBSyxjQUFMLEVBQXFCLFNBQVMsQ0FBVCxDQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQjtBQUFDLFlBQUksQ0FBSjtBQUFBLFlBQU0sQ0FBTjtBQUFBLFlBQVEsQ0FBUjtBQUFBLFlBQVUsQ0FBVjtBQUFBLFlBQVksQ0FBWjtBQUFBLFlBQWMsSUFBRSxDQUFoQixDQUFrQixNQUFJLElBQUUsQ0FBQyxDQUFILEVBQUssS0FBRyxFQUFFLFlBQUYsQ0FBZSxDQUFmLENBQVIsRUFBMEIsSUFBRSxLQUFLLENBQWpDLEVBQW1DLElBQUUsS0FBRyxFQUF4QyxFQUEyQyxFQUFFLFVBQUYsR0FBYSxJQUFFLENBQUYsR0FBSSxDQUFKLEdBQU0sQ0FBOUQsRUFBZ0UsSUFBRSxLQUFHLEdBQUgsSUFBUSxJQUFFLEdBQVYsSUFBZSxRQUFNLENBQXZGLEVBQXlGLE1BQUksSUFBRSxHQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxDQUFOLENBQXpGLEVBQTBHLElBQUUsR0FBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULENBQTVHLEVBQXdILEtBQUcsRUFBRSxVQUFGLEtBQWUsSUFBRSxFQUFFLGlCQUFGLENBQW9CLGVBQXBCLENBQUYsRUFBdUMsTUFBSSxFQUFFLFlBQUYsQ0FBZSxDQUFmLElBQWtCLENBQXRCLENBQXZDLEVBQWdFLElBQUUsRUFBRSxpQkFBRixDQUFvQixNQUFwQixDQUFsRSxFQUE4RixNQUFJLEVBQUUsSUFBRixDQUFPLENBQVAsSUFBVSxDQUFkLENBQTdHLEdBQStILFFBQU0sQ0FBTixJQUFTLFdBQVMsRUFBRSxJQUFwQixHQUF5QixJQUFFLFdBQTNCLEdBQXVDLFFBQU0sQ0FBTixHQUFRLElBQUUsYUFBVixJQUF5QixJQUFFLEVBQUUsS0FBSixFQUFVLElBQUUsRUFBRSxJQUFkLEVBQW1CLElBQUUsRUFBRSxLQUF2QixFQUE2QixJQUFFLENBQUMsQ0FBekQsQ0FBekssS0FBdU8sSUFBRSxDQUFGLEVBQUksQ0FBQyxDQUFELElBQUksQ0FBSixLQUFRLElBQUUsT0FBRixFQUFVLElBQUUsQ0FBRixLQUFNLElBQUUsQ0FBUixDQUFsQixDQUEzTyxDQUF4SCxFQUFrWSxFQUFFLE1BQUYsR0FBUyxDQUEzWSxFQUE2WSxFQUFFLFVBQUYsR0FBYSxDQUFDLEtBQUcsQ0FBSixJQUFPLEVBQWphLEVBQW9hLElBQUUsRUFBRSxXQUFGLENBQWMsQ0FBZCxFQUFnQixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxDQUFoQixDQUFGLEdBQTJCLEVBQUUsVUFBRixDQUFhLENBQWIsRUFBZSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxDQUFmLENBQS9iLEVBQXVkLEVBQUUsVUFBRixDQUFhLENBQWIsQ0FBdmQsRUFBdWUsSUFBRSxLQUFLLENBQTllLEVBQWdmLEtBQUcsRUFBRSxPQUFGLENBQVUsSUFBRSxhQUFGLEdBQWdCLFdBQTFCLEVBQXNDLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxJQUFFLENBQUYsR0FBSSxDQUFULENBQXRDLENBQW5mLEVBQXNpQixFQUFFLFFBQUYsQ0FBVyxDQUFYLEVBQWEsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFiLENBQXRpQixFQUEwakIsTUFBSSxFQUFFLE9BQUYsQ0FBVSxjQUFWLEVBQXlCLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBekIsR0FBZ0MsRUFBRSxFQUFFLE1BQUosSUFBWSxFQUFFLEtBQUYsQ0FBUSxPQUFSLENBQWdCLFVBQWhCLENBQWhELENBQTlqQjtBQUE0b0IsY0FBTyxDQUFQO0FBQVMsS0FBOTJILEVBQSsySCxTQUFRLGlCQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsYUFBTyxFQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVEsQ0FBUixFQUFVLENBQVYsRUFBWSxNQUFaLENBQVA7QUFBMkIsS0FBbDZILEVBQW02SCxXQUFVLG1CQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxhQUFPLEVBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxLQUFLLENBQWIsRUFBZSxDQUFmLEVBQWlCLFFBQWpCLENBQVA7QUFBa0MsS0FBNzlILEVBQVQsR0FBeStILEVBQUUsSUFBRixDQUFPLENBQUMsS0FBRCxFQUFPLE1BQVAsQ0FBUCxFQUFzQixVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxNQUFFLENBQUYsSUFBSyxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUI7QUFBQyxhQUFPLEVBQUUsVUFBRixDQUFhLENBQWIsTUFBa0IsSUFBRSxLQUFHLENBQUwsRUFBTyxJQUFFLENBQVQsRUFBVyxJQUFFLEtBQUssQ0FBcEMsR0FBdUMsRUFBRSxJQUFGLENBQU8sRUFBRSxNQUFGLENBQVMsRUFBQyxLQUFJLENBQUwsRUFBTyxNQUFLLENBQVosRUFBYyxVQUFTLENBQXZCLEVBQXlCLE1BQUssQ0FBOUIsRUFBZ0MsU0FBUSxDQUF4QyxFQUFULEVBQW9ELEVBQUUsYUFBRixDQUFnQixDQUFoQixLQUFvQixDQUF4RSxDQUFQLENBQTlDO0FBQWlJLEtBQXhKO0FBQXlKLEdBQTdMLENBQXorSCxFQUF3cUksRUFBRSxRQUFGLEdBQVcsVUFBUyxDQUFULEVBQVc7QUFBQyxXQUFPLEVBQUUsSUFBRixDQUFPLEVBQUMsS0FBSSxDQUFMLEVBQU8sTUFBSyxLQUFaLEVBQWtCLFVBQVMsUUFBM0IsRUFBb0MsT0FBTSxDQUFDLENBQTNDLEVBQTZDLE9BQU0sQ0FBQyxDQUFwRCxFQUFzRCxRQUFPLENBQUMsQ0FBOUQsRUFBZ0UsVUFBUyxDQUFDLENBQTFFLEVBQVAsQ0FBUDtBQUE0RixHQUEzeEksRUFBNHhJLEVBQUUsRUFBRixDQUFLLE1BQUwsQ0FBWSxFQUFDLFNBQVEsaUJBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBSSxDQUFKLENBQU0sT0FBTyxLQUFLLENBQUwsTUFBVSxFQUFFLFVBQUYsQ0FBYSxDQUFiLE1BQWtCLElBQUUsRUFBRSxJQUFGLENBQU8sS0FBSyxDQUFMLENBQVAsQ0FBcEIsR0FBcUMsSUFBRSxFQUFFLENBQUYsRUFBSSxLQUFLLENBQUwsRUFBUSxhQUFaLEVBQTJCLEVBQTNCLENBQThCLENBQTlCLEVBQWlDLEtBQWpDLENBQXVDLENBQUMsQ0FBeEMsQ0FBdkMsRUFBa0YsS0FBSyxDQUFMLEVBQVEsVUFBUixJQUFvQixFQUFFLFlBQUYsQ0FBZSxLQUFLLENBQUwsQ0FBZixDQUF0RyxFQUE4SCxFQUFFLEdBQUYsQ0FBTSxZQUFVO0FBQUMsWUFBSSxJQUFFLElBQU4sQ0FBVyxPQUFNLEVBQUUsaUJBQVI7QUFBMEIsY0FBRSxFQUFFLGlCQUFKO0FBQTFCLFNBQWdELE9BQU8sQ0FBUDtBQUFTLE9BQXJGLEVBQXVGLE1BQXZGLENBQThGLElBQTlGLENBQXhJLEdBQTZPLElBQXBQO0FBQXlQLEtBQXBSLEVBQXFSLFdBQVUsbUJBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxFQUFFLFVBQUYsQ0FBYSxDQUFiLElBQWdCLEtBQUssSUFBTCxDQUFVLFVBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBRSxJQUFGLEVBQVEsU0FBUixDQUFrQixFQUFFLElBQUYsQ0FBTyxJQUFQLEVBQVksQ0FBWixDQUFsQjtBQUFrQyxPQUF4RCxDQUFoQixHQUEwRSxLQUFLLElBQUwsQ0FBVSxZQUFVO0FBQUMsWUFBSSxJQUFFLEVBQUUsSUFBRixDQUFOO0FBQUEsWUFBYyxJQUFFLEVBQUUsUUFBRixFQUFoQixDQUE2QixFQUFFLE1BQUYsR0FBUyxFQUFFLE9BQUYsQ0FBVSxDQUFWLENBQVQsR0FBc0IsRUFBRSxNQUFGLENBQVMsQ0FBVCxDQUF0QjtBQUFrQyxPQUFwRixDQUFqRjtBQUF1SyxLQUFsZCxFQUFtZCxNQUFLLGNBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBSSxJQUFFLEVBQUUsVUFBRixDQUFhLENBQWIsQ0FBTixDQUFzQixPQUFPLEtBQUssSUFBTCxDQUFVLFVBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBRSxJQUFGLEVBQVEsT0FBUixDQUFnQixJQUFFLEVBQUUsSUFBRixDQUFPLElBQVAsRUFBWSxDQUFaLENBQUYsR0FBaUIsQ0FBakM7QUFBb0MsT0FBMUQsQ0FBUDtBQUFtRSxLQUE3akIsRUFBOGpCLFFBQU8sZ0JBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsR0FBZixDQUFtQixNQUFuQixFQUEyQixJQUEzQixDQUFnQyxZQUFVO0FBQUMsVUFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixLQUFLLFVBQXpCO0FBQXFDLE9BQWhGLEdBQWtGLElBQXpGO0FBQThGLEtBQS9xQixFQUFaLENBQTV4SSxFQUEwOUosRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFlLE1BQWYsR0FBc0IsVUFBUyxDQUFULEVBQVc7QUFBQyxXQUFNLENBQUMsRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFlLE9BQWYsQ0FBdUIsQ0FBdkIsQ0FBUDtBQUFpQyxHQUE3aEssRUFBOGhLLEVBQUUsSUFBRixDQUFPLE9BQVAsQ0FBZSxPQUFmLEdBQXVCLFVBQVMsQ0FBVCxFQUFXO0FBQUMsV0FBTSxDQUFDLEVBQUUsRUFBRSxXQUFGLElBQWUsRUFBRSxZQUFqQixJQUErQixFQUFFLGNBQUYsR0FBbUIsTUFBcEQsQ0FBUDtBQUFtRSxHQUFwb0ssRUFBcW9LLEVBQUUsWUFBRixDQUFlLEdBQWYsR0FBbUIsWUFBVTtBQUFDLFFBQUc7QUFBQyxhQUFPLElBQUksRUFBRSxjQUFOLEVBQVA7QUFBNEIsS0FBaEMsQ0FBZ0MsT0FBTSxDQUFOLEVBQVEsQ0FBRTtBQUFDLEdBQTlzSyxDQUErc0ssSUFBSSxLQUFHLEVBQUMsR0FBRSxHQUFILEVBQU8sTUFBSyxHQUFaLEVBQVA7QUFBQSxNQUF3QixLQUFHLEVBQUUsWUFBRixDQUFlLEdBQWYsRUFBM0IsQ0FBZ0QsRUFBRSxJQUFGLEdBQU8sQ0FBQyxDQUFDLEVBQUYsSUFBTSxxQkFBb0IsRUFBakMsRUFBb0MsRUFBRSxJQUFGLEdBQU8sS0FBRyxDQUFDLENBQUMsRUFBaEQsRUFBbUQsRUFBRSxhQUFGLENBQWdCLFVBQVMsQ0FBVCxFQUFXO0FBQUMsUUFBSSxFQUFKLEVBQU0sQ0FBTixDQUFRLElBQUcsRUFBRSxJQUFGLElBQVEsTUFBSSxDQUFDLEVBQUUsV0FBbEIsRUFBOEIsT0FBTSxFQUFDLE1BQUssY0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsWUFBSSxDQUFKO0FBQUEsWUFBTSxJQUFFLEVBQUUsR0FBRixFQUFSLENBQWdCLElBQUcsRUFBRSxJQUFGLENBQU8sRUFBRSxJQUFULEVBQWMsRUFBRSxHQUFoQixFQUFvQixFQUFFLEtBQXRCLEVBQTRCLEVBQUUsUUFBOUIsRUFBdUMsRUFBRSxRQUF6QyxHQUFtRCxFQUFFLFNBQXhELEVBQWtFLEtBQUksQ0FBSixJQUFTLEVBQUUsU0FBWDtBQUFxQixZQUFFLENBQUYsSUFBSyxFQUFFLFNBQUYsQ0FBWSxDQUFaLENBQUw7QUFBckIsU0FBeUMsRUFBRSxRQUFGLElBQVksRUFBRSxnQkFBZCxJQUFnQyxFQUFFLGdCQUFGLENBQW1CLEVBQUUsUUFBckIsQ0FBaEMsRUFBK0QsRUFBRSxXQUFGLElBQWUsRUFBRSxrQkFBRixDQUFmLEtBQXVDLEVBQUUsa0JBQUYsSUFBc0IsZ0JBQTdELENBQS9ELENBQThJLEtBQUksQ0FBSixJQUFTLENBQVQ7QUFBVyxZQUFFLGdCQUFGLENBQW1CLENBQW5CLEVBQXFCLEVBQUUsQ0FBRixDQUFyQjtBQUFYLFNBQXNDLEtBQUUsV0FBUyxDQUFULEVBQVc7QUFBQyxpQkFBTyxZQUFVO0FBQUMsbUJBQUksS0FBRSxJQUFFLEVBQUUsTUFBRixHQUFTLEVBQUUsT0FBRixHQUFVLEVBQUUsT0FBRixHQUFVLEVBQUUsa0JBQUYsR0FBcUIsSUFBdEQsRUFBMkQsWUFBVSxDQUFWLEdBQVksRUFBRSxLQUFGLEVBQVosR0FBc0IsWUFBVSxDQUFWLEdBQVksWUFBVSxPQUFPLEVBQUUsTUFBbkIsR0FBMEIsRUFBRSxDQUFGLEVBQUksT0FBSixDQUExQixHQUF1QyxFQUFFLEVBQUUsTUFBSixFQUFXLEVBQUUsVUFBYixDQUFuRCxHQUE0RSxFQUFFLEdBQUcsRUFBRSxNQUFMLEtBQWMsRUFBRSxNQUFsQixFQUF5QixFQUFFLFVBQTNCLEVBQXNDLFlBQVUsRUFBRSxZQUFGLElBQWdCLE1BQTFCLEtBQW1DLFlBQVUsT0FBTyxFQUFFLFlBQXRELEdBQW1FLEVBQUMsUUFBTyxFQUFFLFFBQVYsRUFBbkUsR0FBdUYsRUFBQyxNQUFLLEVBQUUsWUFBUixFQUE3SCxFQUFtSixFQUFFLHFCQUFGLEVBQW5KLENBQWpLO0FBQWdWLFdBQWxXO0FBQW1XLFNBQWpYLEVBQWtYLEVBQUUsTUFBRixHQUFTLElBQTNYLEVBQStYLElBQUUsRUFBRSxPQUFGLEdBQVUsR0FBRSxPQUFGLENBQTNZLEVBQXNaLEtBQUssQ0FBTCxLQUFTLEVBQUUsT0FBWCxHQUFtQixFQUFFLE9BQUYsR0FBVSxDQUE3QixHQUErQixFQUFFLGtCQUFGLEdBQXFCLFlBQVU7QUFBQyxnQkFBSSxFQUFFLFVBQU4sSUFBa0IsRUFBRSxVQUFGLENBQWEsWUFBVTtBQUFDLGtCQUFHLEdBQUg7QUFBTyxXQUEvQixDQUFsQjtBQUFtRCxTQUF4Z0IsRUFBeWdCLEtBQUUsR0FBRSxPQUFGLENBQTNnQixDQUFzaEIsSUFBRztBQUFDLFlBQUUsSUFBRixDQUFPLEVBQUUsVUFBRixJQUFjLEVBQUUsSUFBaEIsSUFBc0IsSUFBN0I7QUFBbUMsU0FBdkMsQ0FBdUMsT0FBTSxDQUFOLEVBQVE7QUFBQyxjQUFHLEVBQUgsRUFBSyxNQUFNLENBQU47QUFBUTtBQUFDLE9BQXY1QixFQUF3NUIsT0FBTSxpQkFBVTtBQUFDLGNBQUcsSUFBSDtBQUFPLE9BQWg3QixFQUFOO0FBQXc3QixHQUExL0IsQ0FBbkQsRUFBK2lDLEVBQUUsYUFBRixDQUFnQixVQUFTLENBQVQsRUFBVztBQUFDLE1BQUUsV0FBRixLQUFnQixFQUFFLFFBQUYsQ0FBVyxNQUFYLEdBQWtCLENBQUMsQ0FBbkM7QUFBc0MsR0FBbEUsQ0FBL2lDLEVBQW1uQyxFQUFFLFNBQUYsQ0FBWSxFQUFDLFNBQVEsRUFBQyxRQUFPLDJGQUFSLEVBQVQsRUFBOEcsVUFBUyxFQUFDLFFBQU8seUJBQVIsRUFBdkgsRUFBMEosWUFBVyxFQUFDLGVBQWMsb0JBQVMsQ0FBVCxFQUFXO0FBQUMsZUFBTyxFQUFFLFVBQUYsQ0FBYSxDQUFiLEdBQWdCLENBQXZCO0FBQXlCLE9BQXBELEVBQXJLLEVBQVosQ0FBbm5DLEVBQTQxQyxFQUFFLGFBQUYsQ0FBZ0IsUUFBaEIsRUFBeUIsVUFBUyxDQUFULEVBQVc7QUFBQyxTQUFLLENBQUwsS0FBUyxFQUFFLEtBQVgsS0FBbUIsRUFBRSxLQUFGLEdBQVEsQ0FBQyxDQUE1QixHQUErQixFQUFFLFdBQUYsS0FBZ0IsRUFBRSxJQUFGLEdBQU8sS0FBdkIsQ0FBL0I7QUFBNkQsR0FBbEcsQ0FBNTFDLEVBQWc4QyxFQUFFLGFBQUYsQ0FBZ0IsUUFBaEIsRUFBeUIsVUFBUyxDQUFULEVBQVc7QUFBQyxRQUFHLEVBQUUsV0FBTCxFQUFpQjtBQUFDLFVBQUksQ0FBSixFQUFNLEdBQU4sQ0FBUSxPQUFNLEVBQUMsTUFBSyxjQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxjQUFFLEVBQUUsVUFBRixFQUFjLElBQWQsQ0FBbUIsRUFBQyxTQUFRLEVBQUUsYUFBWCxFQUF5QixLQUFJLEVBQUUsR0FBL0IsRUFBbkIsRUFBd0QsRUFBeEQsQ0FBMkQsWUFBM0QsRUFBd0UsTUFBRSxXQUFTLENBQVQsRUFBVztBQUFDLGNBQUUsTUFBRixJQUFXLE1BQUUsSUFBYixFQUFrQixLQUFHLEVBQUUsWUFBVSxFQUFFLElBQVosR0FBaUIsR0FBakIsR0FBcUIsR0FBdkIsRUFBMkIsRUFBRSxJQUE3QixDQUFyQjtBQUF3RCxXQUE5SSxDQUFGLEVBQWtKLEVBQUUsSUFBRixDQUFPLFdBQVAsQ0FBbUIsRUFBRSxDQUFGLENBQW5CLENBQWxKO0FBQTJLLFNBQS9MLEVBQWdNLE9BQU0saUJBQVU7QUFBQyxpQkFBRyxLQUFIO0FBQU8sU0FBeE4sRUFBTjtBQUFnTztBQUFDLEdBQWhTLENBQWg4QyxDQUFrdUQsSUFBSSxLQUFHLEVBQVA7QUFBQSxNQUFVLEtBQUcsbUJBQWIsQ0FBaUMsRUFBRSxTQUFGLENBQVksRUFBQyxPQUFNLFVBQVAsRUFBa0IsZUFBYyx5QkFBVTtBQUFDLFVBQUksSUFBRSxHQUFHLEdBQUgsTUFBVSxFQUFFLE9BQUYsR0FBVSxHQUFWLEdBQWMsSUFBOUIsQ0FBbUMsT0FBTyxLQUFLLENBQUwsSUFBUSxDQUFDLENBQVQsRUFBVyxDQUFsQjtBQUFvQixLQUFsRyxFQUFaLEdBQWlILEVBQUUsYUFBRixDQUFnQixZQUFoQixFQUE2QixVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsUUFBSSxDQUFKO0FBQUEsUUFBTSxDQUFOO0FBQUEsUUFBUSxDQUFSO0FBQUEsUUFBVSxJQUFFLEVBQUUsS0FBRixLQUFVLENBQUMsQ0FBWCxLQUFlLEdBQUcsSUFBSCxDQUFRLEVBQUUsR0FBVixJQUFlLEtBQWYsR0FBcUIsWUFBVSxPQUFPLEVBQUUsSUFBbkIsSUFBeUIsTUFBSSxDQUFDLEVBQUUsV0FBRixJQUFlLEVBQWhCLEVBQW9CLE9BQXBCLENBQTRCLG1DQUE1QixDQUE3QixJQUErRixHQUFHLElBQUgsQ0FBUSxFQUFFLElBQVYsQ0FBL0YsSUFBZ0gsTUFBcEosQ0FBWixDQUF3SyxJQUFHLEtBQUcsWUFBVSxFQUFFLFNBQUYsQ0FBWSxDQUFaLENBQWhCLEVBQStCLE9BQU8sSUFBRSxFQUFFLGFBQUYsR0FBZ0IsRUFBRSxVQUFGLENBQWEsRUFBRSxhQUFmLElBQThCLEVBQUUsYUFBRixFQUE5QixHQUFnRCxFQUFFLGFBQXBFLEVBQWtGLElBQUUsRUFBRSxDQUFGLElBQUssRUFBRSxDQUFGLEVBQUssT0FBTCxDQUFhLEVBQWIsRUFBZ0IsT0FBSyxDQUFyQixDQUFQLEdBQStCLEVBQUUsS0FBRixLQUFVLENBQUMsQ0FBWCxLQUFlLEVBQUUsR0FBRixJQUFPLENBQUMsR0FBRyxJQUFILENBQVEsRUFBRSxHQUFWLElBQWUsR0FBZixHQUFtQixHQUFwQixJQUF5QixFQUFFLEtBQTNCLEdBQWlDLEdBQWpDLEdBQXFDLENBQTNELENBQWpILEVBQStLLEVBQUUsVUFBRixDQUFhLGFBQWIsSUFBNEIsWUFBVTtBQUFDLGFBQU8sS0FBRyxFQUFFLEtBQUYsQ0FBUSxJQUFFLGlCQUFWLENBQUgsRUFBZ0MsRUFBRSxDQUFGLENBQXZDO0FBQTRDLEtBQWxRLEVBQW1RLEVBQUUsU0FBRixDQUFZLENBQVosSUFBZSxNQUFsUixFQUF5UixJQUFFLEVBQUUsQ0FBRixDQUEzUixFQUFnUyxFQUFFLENBQUYsSUFBSyxZQUFVO0FBQUMsVUFBRSxTQUFGO0FBQVksS0FBNVQsRUFBNlQsRUFBRSxNQUFGLENBQVMsWUFBVTtBQUFDLFdBQUssQ0FBTCxLQUFTLENBQVQsR0FBVyxFQUFFLENBQUYsRUFBSyxVQUFMLENBQWdCLENBQWhCLENBQVgsR0FBOEIsRUFBRSxDQUFGLElBQUssQ0FBbkMsRUFBcUMsRUFBRSxDQUFGLE1BQU8sRUFBRSxhQUFGLEdBQWdCLEVBQUUsYUFBbEIsRUFBZ0MsR0FBRyxJQUFILENBQVEsQ0FBUixDQUF2QyxDQUFyQyxFQUF3RixLQUFHLEVBQUUsVUFBRixDQUFhLENBQWIsQ0FBSCxJQUFvQixFQUFFLEVBQUUsQ0FBRixDQUFGLENBQTVHLEVBQW9ILElBQUUsSUFBRSxLQUFLLENBQTdIO0FBQStILEtBQW5KLENBQTdULEVBQWtkLFFBQXpkO0FBQWtlLEdBQXR0QixDQUFqSCxFQUF5MEIsRUFBRSxrQkFBRixHQUFxQixZQUFVO0FBQUMsUUFBSSxJQUFFLEVBQUUsY0FBRixDQUFpQixrQkFBakIsQ0FBb0MsRUFBcEMsRUFBd0MsSUFBOUMsQ0FBbUQsT0FBTyxFQUFFLFNBQUYsR0FBWSw0QkFBWixFQUF5QyxNQUFJLEVBQUUsVUFBRixDQUFhLE1BQWpFO0FBQXdFLEdBQXRJLEVBQTkxQixFQUF1K0IsRUFBRSxTQUFGLEdBQVksVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLFFBQUcsWUFBVSxPQUFPLENBQXBCLEVBQXNCLE9BQU0sRUFBTixDQUFTLGFBQVcsT0FBTyxDQUFsQixLQUFzQixJQUFFLENBQUYsRUFBSSxJQUFFLENBQUMsQ0FBN0IsRUFBZ0MsSUFBSSxDQUFKLEVBQU0sQ0FBTixFQUFRLENBQVIsQ0FBVSxPQUFPLE1BQUksRUFBRSxrQkFBRixJQUFzQixJQUFFLEVBQUUsY0FBRixDQUFpQixrQkFBakIsQ0FBb0MsRUFBcEMsQ0FBRixFQUEwQyxJQUFFLEVBQUUsYUFBRixDQUFnQixNQUFoQixDQUE1QyxFQUFvRSxFQUFFLElBQUYsR0FBTyxFQUFFLFFBQUYsQ0FBVyxJQUF0RixFQUEyRixFQUFFLElBQUYsQ0FBTyxXQUFQLENBQW1CLENBQW5CLENBQWpILElBQXdJLElBQUUsQ0FBOUksR0FBaUosSUFBRSxFQUFFLElBQUYsQ0FBTyxDQUFQLENBQW5KLEVBQTZKLElBQUUsQ0FBQyxDQUFELElBQUksRUFBbkssRUFBc0ssSUFBRSxDQUFDLEVBQUUsYUFBRixDQUFnQixFQUFFLENBQUYsQ0FBaEIsQ0FBRCxDQUFGLElBQTJCLElBQUUsR0FBRyxDQUFDLENBQUQsQ0FBSCxFQUFPLENBQVAsRUFBUyxDQUFULENBQUYsRUFBYyxLQUFHLEVBQUUsTUFBTCxJQUFhLEVBQUUsQ0FBRixFQUFLLE1BQUwsRUFBM0IsRUFBeUMsRUFBRSxLQUFGLENBQVEsRUFBUixFQUFXLEVBQUUsVUFBYixDQUFwRSxDQUE3SztBQUEyUSxHQUF2MUMsRUFBdzFDLEVBQUUsRUFBRixDQUFLLElBQUwsR0FBVSxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsUUFBSSxDQUFKO0FBQUEsUUFBTSxDQUFOO0FBQUEsUUFBUSxDQUFSO0FBQUEsUUFBVSxJQUFFLElBQVo7QUFBQSxRQUFpQixJQUFFLEVBQUUsT0FBRixDQUFVLEdBQVYsQ0FBbkIsQ0FBa0MsT0FBTyxJQUFFLENBQUMsQ0FBSCxLQUFPLElBQUUsR0FBRyxFQUFFLEtBQUYsQ0FBUSxDQUFSLENBQUgsQ0FBRixFQUFpQixJQUFFLEVBQUUsS0FBRixDQUFRLENBQVIsRUFBVSxDQUFWLENBQTFCLEdBQXdDLEVBQUUsVUFBRixDQUFhLENBQWIsS0FBaUIsSUFBRSxDQUFGLEVBQUksSUFBRSxLQUFLLENBQTVCLElBQStCLEtBQUcsb0JBQWlCLENBQWpCLHlDQUFpQixDQUFqQixFQUFILEtBQXdCLElBQUUsTUFBMUIsQ0FBdkUsRUFBeUcsRUFBRSxNQUFGLEdBQVMsQ0FBVCxJQUFZLEVBQUUsSUFBRixDQUFPLEVBQUMsS0FBSSxDQUFMLEVBQU8sTUFBSyxLQUFHLEtBQWYsRUFBcUIsVUFBUyxNQUE5QixFQUFxQyxNQUFLLENBQTFDLEVBQVAsRUFBcUQsSUFBckQsQ0FBMEQsVUFBUyxDQUFULEVBQVc7QUFBQyxVQUFFLFNBQUYsRUFBWSxFQUFFLElBQUYsQ0FBTyxJQUFFLEVBQUUsT0FBRixFQUFXLE1BQVgsQ0FBa0IsRUFBRSxTQUFGLENBQVksQ0FBWixDQUFsQixFQUFrQyxJQUFsQyxDQUF1QyxDQUF2QyxDQUFGLEdBQTRDLENBQW5ELENBQVo7QUFBa0UsS0FBeEksRUFBMEksTUFBMUksQ0FBaUosS0FBRyxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxRQUFFLElBQUYsQ0FBTyxZQUFVO0FBQUMsVUFBRSxLQUFGLENBQVEsSUFBUixFQUFhLEtBQUcsQ0FBQyxFQUFFLFlBQUgsRUFBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEIsQ0FBaEI7QUFBc0MsT0FBeEQ7QUFBMEQsS0FBNU4sQ0FBckgsRUFBbVYsSUFBMVY7QUFBK1YsR0FBbnZELEVBQW92RCxFQUFFLElBQUYsQ0FBTyxDQUFDLFdBQUQsRUFBYSxVQUFiLEVBQXdCLGNBQXhCLEVBQXVDLFdBQXZDLEVBQW1ELGFBQW5ELEVBQWlFLFVBQWpFLENBQVAsRUFBb0YsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsTUFBRSxFQUFGLENBQUssQ0FBTCxJQUFRLFVBQVMsQ0FBVCxFQUFXO0FBQUMsYUFBTyxLQUFLLEVBQUwsQ0FBUSxDQUFSLEVBQVUsQ0FBVixDQUFQO0FBQW9CLEtBQXhDO0FBQXlDLEdBQTNJLENBQXB2RCxFQUFpNEQsRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFlLFFBQWYsR0FBd0IsVUFBUyxDQUFULEVBQVc7QUFBQyxXQUFPLEVBQUUsSUFBRixDQUFPLEVBQUUsTUFBVCxFQUFnQixVQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sTUFBSSxFQUFFLElBQWI7QUFBa0IsS0FBOUMsRUFBZ0QsTUFBdkQ7QUFBOEQsR0FBbitELEVBQW8rRCxFQUFFLE1BQUYsR0FBUyxFQUFDLFdBQVUsbUJBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWU7QUFBQyxVQUFJLENBQUo7QUFBQSxVQUFNLENBQU47QUFBQSxVQUFRLENBQVI7QUFBQSxVQUFVLENBQVY7QUFBQSxVQUFZLENBQVo7QUFBQSxVQUFjLENBQWQ7QUFBQSxVQUFnQixDQUFoQjtBQUFBLFVBQWtCLElBQUUsRUFBRSxHQUFGLENBQU0sQ0FBTixFQUFRLFVBQVIsQ0FBcEI7QUFBQSxVQUF3QyxJQUFFLEVBQUUsQ0FBRixDQUExQztBQUFBLFVBQStDLElBQUUsRUFBakQsQ0FBb0QsYUFBVyxDQUFYLEtBQWUsRUFBRSxLQUFGLENBQVEsUUFBUixHQUFpQixVQUFoQyxHQUE0QyxJQUFFLEVBQUUsTUFBRixFQUE5QyxFQUF5RCxJQUFFLEVBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxLQUFSLENBQTNELEVBQTBFLElBQUUsRUFBRSxHQUFGLENBQU0sQ0FBTixFQUFRLE1BQVIsQ0FBNUUsRUFBNEYsSUFBRSxDQUFDLGVBQWEsQ0FBYixJQUFnQixZQUFVLENBQTNCLEtBQStCLENBQUMsSUFBRSxDQUFILEVBQU0sT0FBTixDQUFjLE1BQWQsSUFBc0IsQ0FBQyxDQUFwSixFQUFzSixLQUFHLElBQUUsRUFBRSxRQUFGLEVBQUYsRUFBZSxJQUFFLEVBQUUsR0FBbkIsRUFBdUIsSUFBRSxFQUFFLElBQTlCLEtBQXFDLElBQUUsV0FBVyxDQUFYLEtBQWUsQ0FBakIsRUFBbUIsSUFBRSxXQUFXLENBQVgsS0FBZSxDQUF6RSxDQUF0SixFQUFrTyxFQUFFLFVBQUYsQ0FBYSxDQUFiLE1BQWtCLElBQUUsRUFBRSxJQUFGLENBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxFQUFFLE1BQUYsQ0FBUyxFQUFULEVBQVksQ0FBWixDQUFYLENBQXBCLENBQWxPLEVBQWtSLFFBQU0sRUFBRSxHQUFSLEtBQWMsRUFBRSxHQUFGLEdBQU0sRUFBRSxHQUFGLEdBQU0sRUFBRSxHQUFSLEdBQVksQ0FBaEMsQ0FBbFIsRUFBcVQsUUFBTSxFQUFFLElBQVIsS0FBZSxFQUFFLElBQUYsR0FBTyxFQUFFLElBQUYsR0FBTyxFQUFFLElBQVQsR0FBYyxDQUFwQyxDQUFyVCxFQUE0VixXQUFVLENBQVYsR0FBWSxFQUFFLEtBQUYsQ0FBUSxJQUFSLENBQWEsQ0FBYixFQUFlLENBQWYsQ0FBWixHQUE4QixFQUFFLEdBQUYsQ0FBTSxDQUFOLENBQTFYO0FBQW1ZLEtBQWxkLEVBQTcrRCxFQUFpOEUsRUFBRSxFQUFGLENBQUssTUFBTCxDQUFZLEVBQUMsUUFBTyxnQkFBUyxDQUFULEVBQVc7QUFBQyxVQUFHLFVBQVUsTUFBYixFQUFvQixPQUFPLEtBQUssQ0FBTCxLQUFTLENBQVQsR0FBVyxJQUFYLEdBQWdCLEtBQUssSUFBTCxDQUFVLFVBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBRSxNQUFGLENBQVMsU0FBVCxDQUFtQixJQUFuQixFQUF3QixDQUF4QixFQUEwQixDQUExQjtBQUE2QixPQUFuRCxDQUF2QixDQUE0RSxJQUFJLENBQUo7QUFBQSxVQUFNLENBQU47QUFBQSxVQUFRLENBQVI7QUFBQSxVQUFVLENBQVY7QUFBQSxVQUFZLElBQUUsS0FBSyxDQUFMLENBQWQsQ0FBc0IsSUFBRyxDQUFILEVBQUssT0FBTyxFQUFFLGNBQUYsR0FBbUIsTUFBbkIsSUFBMkIsSUFBRSxFQUFFLHFCQUFGLEVBQUYsRUFBNEIsSUFBRSxFQUFFLGFBQWhDLEVBQThDLElBQUUsRUFBRSxlQUFsRCxFQUFrRSxJQUFFLEVBQUUsV0FBdEUsRUFBa0YsRUFBQyxLQUFJLEVBQUUsR0FBRixHQUFNLEVBQUUsV0FBUixHQUFvQixFQUFFLFNBQTNCLEVBQXFDLE1BQUssRUFBRSxJQUFGLEdBQU8sRUFBRSxXQUFULEdBQXFCLEVBQUUsVUFBakUsRUFBN0csSUFBMkwsRUFBQyxLQUFJLENBQUwsRUFBTyxNQUFLLENBQVosRUFBbE07QUFBaU4sS0FBaFcsRUFBaVcsVUFBUyxvQkFBVTtBQUFDLFVBQUcsS0FBSyxDQUFMLENBQUgsRUFBVztBQUFDLFlBQUksQ0FBSjtBQUFBLFlBQU0sQ0FBTjtBQUFBLFlBQVEsSUFBRSxLQUFLLENBQUwsQ0FBVjtBQUFBLFlBQWtCLElBQUUsRUFBQyxLQUFJLENBQUwsRUFBTyxNQUFLLENBQVosRUFBcEIsQ0FBbUMsT0FBTSxZQUFVLEVBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxVQUFSLENBQVYsR0FBOEIsSUFBRSxFQUFFLHFCQUFGLEVBQWhDLElBQTJELElBQUUsS0FBSyxZQUFMLEVBQUYsRUFBc0IsSUFBRSxLQUFLLE1BQUwsRUFBeEIsRUFBc0MsRUFBRSxFQUFFLENBQUYsQ0FBRixFQUFPLE1BQVAsTUFBaUIsSUFBRSxFQUFFLE1BQUYsRUFBbkIsQ0FBdEMsRUFBcUUsSUFBRSxFQUFDLEtBQUksRUFBRSxHQUFGLEdBQU0sRUFBRSxHQUFGLENBQU0sRUFBRSxDQUFGLENBQU4sRUFBVyxnQkFBWCxFQUE0QixDQUFDLENBQTdCLENBQVgsRUFBMkMsTUFBSyxFQUFFLElBQUYsR0FBTyxFQUFFLEdBQUYsQ0FBTSxFQUFFLENBQUYsQ0FBTixFQUFXLGlCQUFYLEVBQTZCLENBQUMsQ0FBOUIsQ0FBdkQsRUFBbEksR0FBNE4sRUFBQyxLQUFJLEVBQUUsR0FBRixHQUFNLEVBQUUsR0FBUixHQUFZLEVBQUUsR0FBRixDQUFNLENBQU4sRUFBUSxXQUFSLEVBQW9CLENBQUMsQ0FBckIsQ0FBakIsRUFBeUMsTUFBSyxFQUFFLElBQUYsR0FBTyxFQUFFLElBQVQsR0FBYyxFQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVEsWUFBUixFQUFxQixDQUFDLENBQXRCLENBQTVELEVBQWxPO0FBQXdUO0FBQUMsS0FBN3RCLEVBQTh0QixjQUFhLHdCQUFVO0FBQUMsYUFBTyxLQUFLLEdBQUwsQ0FBUyxZQUFVO0FBQUMsWUFBSSxJQUFFLEtBQUssWUFBWCxDQUF3QixPQUFNLEtBQUcsYUFBVyxFQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVEsVUFBUixDQUFwQjtBQUF3QyxjQUFFLEVBQUUsWUFBSjtBQUF4QyxTQUF5RCxPQUFPLEtBQUcsRUFBVjtBQUFhLE9BQWxILENBQVA7QUFBMkgsS0FBajNCLEVBQVosQ0FBajhFLEVBQWkwRyxFQUFFLElBQUYsQ0FBTyxFQUFDLFlBQVcsYUFBWixFQUEwQixXQUFVLGFBQXBDLEVBQVAsRUFBMEQsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsUUFBSSxJQUFFLGtCQUFnQixDQUF0QixDQUF3QixFQUFFLEVBQUYsQ0FBSyxDQUFMLElBQVEsVUFBUyxDQUFULEVBQVc7QUFBQyxhQUFPLEVBQUUsSUFBRixFQUFPLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWU7QUFBQyxZQUFJLENBQUosQ0FBTSxPQUFPLEVBQUUsUUFBRixDQUFXLENBQVgsSUFBYyxJQUFFLENBQWhCLEdBQWtCLE1BQUksRUFBRSxRQUFOLEtBQWlCLElBQUUsRUFBRSxXQUFyQixDQUFsQixFQUFvRCxLQUFLLENBQUwsS0FBUyxDQUFULEdBQVcsSUFBRSxFQUFFLENBQUYsQ0FBRixHQUFPLEVBQUUsQ0FBRixDQUFsQixHQUF1QixNQUFLLElBQUUsRUFBRSxRQUFGLENBQVcsSUFBRSxFQUFFLFdBQUosR0FBZ0IsQ0FBM0IsRUFBNkIsSUFBRSxDQUFGLEdBQUksRUFBRSxXQUFuQyxDQUFGLEdBQWtELEVBQUUsQ0FBRixJQUFLLENBQTVELENBQWxGO0FBQWlKLE9BQTlLLEVBQStLLENBQS9LLEVBQWlMLENBQWpMLEVBQW1MLFVBQVUsTUFBN0wsQ0FBUDtBQUE0TSxLQUFoTztBQUFpTyxHQUFqVSxDQUFqMEcsRUFBb29ILEVBQUUsSUFBRixDQUFPLENBQUMsS0FBRCxFQUFPLE1BQVAsQ0FBUCxFQUFzQixVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxNQUFFLFFBQUYsQ0FBVyxDQUFYLElBQWMsR0FBRyxFQUFFLGFBQUwsRUFBbUIsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsVUFBRyxDQUFILEVBQUssT0FBTyxJQUFFLEdBQUcsQ0FBSCxFQUFLLENBQUwsQ0FBRixFQUFVLEdBQUcsSUFBSCxDQUFRLENBQVIsSUFBVyxFQUFFLENBQUYsRUFBSyxRQUFMLEdBQWdCLENBQWhCLElBQW1CLElBQTlCLEdBQW1DLENBQXBEO0FBQXNELEtBQTVGLENBQWQ7QUFBNEcsR0FBaEosQ0FBcG9ILEVBQXN4SCxFQUFFLElBQUYsQ0FBTyxFQUFDLFFBQU8sUUFBUixFQUFpQixPQUFNLE9BQXZCLEVBQVAsRUFBdUMsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsTUFBRSxJQUFGLENBQU8sRUFBQyxTQUFRLFVBQVEsQ0FBakIsRUFBbUIsU0FBUSxDQUEzQixFQUE2QixJQUFHLFVBQVEsQ0FBeEMsRUFBUCxFQUFrRCxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxRQUFFLEVBQUYsQ0FBSyxDQUFMLElBQVEsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsWUFBSSxJQUFFLFVBQVUsTUFBVixLQUFtQixLQUFHLGFBQVcsT0FBTyxDQUF4QyxDQUFOO0FBQUEsWUFBaUQsSUFBRSxNQUFJLE1BQUksQ0FBQyxDQUFMLElBQVEsTUFBSSxDQUFDLENBQWIsR0FBZSxRQUFmLEdBQXdCLFFBQTVCLENBQW5ELENBQXlGLE9BQU8sRUFBRSxJQUFGLEVBQU8sVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLGNBQUksQ0FBSixDQUFNLE9BQU8sRUFBRSxRQUFGLENBQVcsQ0FBWCxJQUFjLE1BQUksRUFBRSxPQUFGLENBQVUsT0FBVixDQUFKLEdBQXVCLEVBQUUsVUFBUSxDQUFWLENBQXZCLEdBQW9DLEVBQUUsUUFBRixDQUFXLGVBQVgsQ0FBMkIsV0FBUyxDQUFwQyxDQUFsRCxHQUF5RixNQUFJLEVBQUUsUUFBTixJQUFnQixJQUFFLEVBQUUsZUFBSixFQUFvQixLQUFLLEdBQUwsQ0FBUyxFQUFFLElBQUYsQ0FBTyxXQUFTLENBQWhCLENBQVQsRUFBNEIsRUFBRSxXQUFTLENBQVgsQ0FBNUIsRUFBMEMsRUFBRSxJQUFGLENBQU8sV0FBUyxDQUFoQixDQUExQyxFQUE2RCxFQUFFLFdBQVMsQ0FBWCxDQUE3RCxFQUEyRSxFQUFFLFdBQVMsQ0FBWCxDQUEzRSxDQUFwQyxJQUErSCxLQUFLLENBQUwsS0FBUyxDQUFULEdBQVcsRUFBRSxHQUFGLENBQU0sQ0FBTixFQUFRLENBQVIsRUFBVSxDQUFWLENBQVgsR0FBd0IsRUFBRSxLQUFGLENBQVEsQ0FBUixFQUFVLENBQVYsRUFBWSxDQUFaLEVBQWMsQ0FBZCxDQUF2UDtBQUF3USxTQUFyUyxFQUFzUyxDQUF0UyxFQUF3UyxJQUFFLENBQUYsR0FBSSxLQUFLLENBQWpULEVBQW1ULENBQW5ULENBQVA7QUFBNlQsT0FBNWE7QUFBNmEsS0FBN2U7QUFBK2UsR0FBcGlCLENBQXR4SCxFQUE0ekksRUFBRSxFQUFGLENBQUssTUFBTCxDQUFZLEVBQUMsTUFBSyxjQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsYUFBTyxLQUFLLEVBQUwsQ0FBUSxDQUFSLEVBQVUsSUFBVixFQUFlLENBQWYsRUFBaUIsQ0FBakIsQ0FBUDtBQUEyQixLQUFqRCxFQUFrRCxRQUFPLGdCQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxhQUFPLEtBQUssR0FBTCxDQUFTLENBQVQsRUFBVyxJQUFYLEVBQWdCLENBQWhCLENBQVA7QUFBMEIsS0FBakcsRUFBa0csVUFBUyxrQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCO0FBQUMsYUFBTyxLQUFLLEVBQUwsQ0FBUSxDQUFSLEVBQVUsQ0FBVixFQUFZLENBQVosRUFBYyxDQUFkLENBQVA7QUFBd0IsS0FBckosRUFBc0osWUFBVyxvQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLGFBQU8sTUFBSSxVQUFVLE1BQWQsR0FBcUIsS0FBSyxHQUFMLENBQVMsQ0FBVCxFQUFXLElBQVgsQ0FBckIsR0FBc0MsS0FBSyxHQUFMLENBQVMsQ0FBVCxFQUFXLEtBQUcsSUFBZCxFQUFtQixDQUFuQixDQUE3QztBQUFtRSxLQUFwUCxFQUFaLENBQTV6SSxFQUErakosRUFBRSxTQUFGLEdBQVksVUFBUyxDQUFULEVBQVc7QUFBQyxRQUFFLEVBQUUsU0FBRixFQUFGLEdBQWdCLEVBQUUsS0FBRixDQUFRLENBQUMsQ0FBVCxDQUFoQjtBQUE0QixHQUFubkosRUFBb25KLEVBQUUsT0FBRixHQUFVLE1BQU0sT0FBcG9KLEVBQTRvSixFQUFFLFNBQUYsR0FBWSxLQUFLLEtBQTdwSixFQUFtcUosRUFBRSxRQUFGLEdBQVcsQ0FBOXFKLEVBQWdySixjQUFZLE9BQU8sTUFBbkIsSUFBMkIsT0FBTyxHQUFsQyxJQUF1QyxPQUFPLFFBQVAsRUFBZ0IsRUFBaEIsRUFBbUIsWUFBVTtBQUFDLFdBQU8sQ0FBUDtBQUFTLEdBQXZDLENBQXZ0SixDQUFnd0osSUFBSSxLQUFHLEVBQUUsTUFBVDtBQUFBLE1BQWdCLEtBQUcsRUFBRSxDQUFyQixDQUF1QixPQUFPLEVBQUUsVUFBRixHQUFhLFVBQVMsQ0FBVCxFQUFXO0FBQUMsV0FBTyxFQUFFLENBQUYsS0FBTSxDQUFOLEtBQVUsRUFBRSxDQUFGLEdBQUksRUFBZCxHQUFrQixLQUFHLEVBQUUsTUFBRixLQUFXLENBQWQsS0FBa0IsRUFBRSxNQUFGLEdBQVMsRUFBM0IsQ0FBbEIsRUFBaUQsQ0FBeEQ7QUFBMEQsR0FBbkYsRUFBb0YsTUFBSSxFQUFFLE1BQUYsR0FBUyxFQUFFLENBQUYsR0FBSSxDQUFqQixDQUFwRixFQUF3RyxDQUEvRztBQUFpSCxDQUY3OHJCLENBQUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBTZWN0aW9uSW5wdXQgfSBmcm9tICcuL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQge1xyXG5cdHJlbW92ZVVudXNlZFRhZ3MsIGVtcHR5Q2hpbGRyZW4sIGdlbmVyYXRlVGFibGVTY3JpcHQsIGdlbmVyYXRlQ2FsZW5kYXJPbmNsaWNrQXR0cixcclxuXHRnZW5lcmF0ZVNlbGVjdE9wdGlvbnNTY3JpcHQsIGdlbmVyYXRlU3VibWl0Rm9ybVNjcmlwdCwgZ2VuZXJhdGVCdXR0b25PbmNsaWNrQXR0clxyXG59IGZyb20gJy4vdXRpbC9qc291cCc7XHJcbmltcG9ydCB7IGRvd25sb2FkQXNUZXh0RmlsZSB9IGZyb20gJy4vdXRpbC9kb3dubG9hZCc7XHJcbmltcG9ydCB7IGxhdW5jaEZ1bGxTY3JlZW4gfSBmcm9tICcuL3V0aWwvZnVsbFNjcmVlbic7XHJcbmltcG9ydCB7IGRhdGFDb21wb25lbnRJZCB9IGZyb20gJy4vY29tcG9uZW50cy9jb21tb24nXHJcbmltcG9ydCBodG1sR2VuZXJhdG9yIGZyb20gJy4vdXRpbC9odG1sR2VuZXJhdG9yJztcclxuaW1wb3J0IHsgcmVwbGFjZU90aGVyU2hvd2luZ0NhbGVuZGFySW5wdXRzIH0gZnJvbSAnLi91dGlsL2NhbGVuZGFyJztcclxuaW1wb3J0IHsgZ2V0U3R5bGUgfSBmcm9tICcuL3V0aWwvZG9tJztcclxuaW1wb3J0IHsgZ2V0UGFyZW50T3JTZWxmIH0gZnJvbSAnLi91dGlsL3NlbGVjdG9ycyc7XHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG5cdHZhciBjYWNoZSA9IHt9O1xyXG5cclxuXHR0aGlzLnRtcGwgPSBmdW5jdGlvbiB0bXBsKHN0ciwgZGF0YSkge1xyXG5cdFx0Ly8gRmlndXJlIG91dCBpZiB3ZSdyZSBnZXR0aW5nIGEgdGVtcGxhdGUsIG9yIGlmIHdlIG5lZWQgdG9cclxuXHRcdC8vIGxvYWQgdGhlIHRlbXBsYXRlIC0gYW5kIGJlIHN1cmUgdG8gY2FjaGUgdGhlIHJlc3VsdC5cclxuXHRcdHZhciBmbiA9IC9eWy1hLXpBLVowLTldKyQvLnRlc3Qoc3RyKSA/XHJcblx0XHRcdGNhY2hlW3N0cl0gPSBjYWNoZVtzdHJdIHx8XHJcblx0XHRcdHRtcGwoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3RyKS5pbm5lckhUTUwpIDpcclxuXHJcblx0XHRcdC8vIEdlbmVyYXRlIGEgcmV1c2FibGUgZnVuY3Rpb24gdGhhdCB3aWxsIHNlcnZlIGFzIGEgdGVtcGxhdGVcclxuXHRcdFx0Ly8gZ2VuZXJhdG9yIChhbmQgd2hpY2ggd2lsbCBiZSBjYWNoZWQpLlxyXG5cdFx0XHRuZXcgRnVuY3Rpb24oXCJvYmpcIixcclxuXHRcdFx0XHRcInZhciBwPVtdLHByaW50PWZ1bmN0aW9uKCl7cC5wdXNoLmFwcGx5KHAsYXJndW1lbnRzKTt9O1wiICtcclxuXHJcblx0XHRcdFx0Ly8gSW50cm9kdWNlIHRoZSBkYXRhIGFzIGxvY2FsIHZhcmlhYmxlcyB1c2luZyB3aXRoKCl7fVxyXG5cdFx0XHRcdFwid2l0aChvYmope3AucHVzaCgnXCIgK1xyXG5cclxuXHRcdFx0XHQvLyBDb252ZXJ0IHRoZSB0ZW1wbGF0ZSBpbnRvIHB1cmUgSmF2YVNjcmlwdFxyXG5cdFx0XHRcdHN0clxyXG5cdFx0XHRcdFx0LnJlcGxhY2UoL1tcXHJcXHRcXG5dL2csIFwiIFwiKVxyXG5cdFx0XHRcdFx0LnNwbGl0KFwieyVcIikuam9pbihcIlxcdFwiKVxyXG5cdFx0XHRcdFx0LnJlcGxhY2UoLygoXnwlfSlbXlxcdF0qKScvZywgXCIkMVxcclwiKVxyXG5cdFx0XHRcdFx0LnJlcGxhY2UoL1xcdD0oLio/KSV9L2csIFwiJywkMSwnXCIpXHJcblx0XHRcdFx0XHQuc3BsaXQoXCJcXHRcIikuam9pbihcIicpO1wiKVxyXG5cdFx0XHRcdFx0LnNwbGl0KFwiJX1cIikuam9pbihcInAucHVzaCgnXCIpXHJcblx0XHRcdFx0XHQuc3BsaXQoXCJcXHJcIikuam9pbihcIlxcXFwnXCIpXHJcblx0XHRcdFx0KyBcIicpO31yZXR1cm4gcC5qb2luKCcnKTtcIik7XHJcblx0XHQvLyBQcm92aWRlIHNvbWUgYmFzaWMgY3VycnlpbmcgdG8gdGhlIHVzZXJcclxuXHRcdHJldHVybiBkYXRhID8gZm4oZGF0YSkgOiBmbjtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxudmFyIGRlbGF5ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGltZXIgPSAwO1xyXG5cdHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2ssIG1zKSB7XHJcblx0XHRjbGVhclRpbWVvdXQodGltZXIpO1xyXG5cdFx0dGltZXIgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCBtcyk7XHJcblx0fTtcclxufSkoKTtcclxuXHJcbmlmIChWdnZlYiA9PT0gdW5kZWZpbmVkKSB2YXIgVnZ2ZWIgPSB7fTtcclxuXHJcblZ2dmViLmRlZmF1bHRDb21wb25lbnQgPSBcIl9iYXNlXCI7XHJcblZ2dmViLnByZXNlcnZlUHJvcGVydHlTZWN0aW9ucyA9IHRydWU7XHJcblxyXG5WdnZlYi5iYXNlVXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdCA/IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjLnJlcGxhY2UoL1teXFwvXSo/XFwuanMkLywgJycpIDogJyc7XHJcblxyXG5WdnZlYi5Db21wb25lbnRzR3JvdXAgPSB7fTtcclxuXHJcblZ2dmViLkNvbXBvbmVudHMgPSB7XHJcblx0X2NvbXBvbmVudHM6IHt9LFxyXG5cclxuXHRfbm9kZXNMb29rdXA6IHt9LFxyXG5cclxuXHRfYXR0cmlidXRlc0xvb2t1cDoge30sXHJcblxyXG5cdF9jbGFzc2VzTG9va3VwOiB7fSxcclxuXHJcblx0X2NsYXNzZXNSZWdleExvb2t1cDoge30sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uICh1cmwpIHtcclxuXHR9LFxyXG5cclxuXHRnZXQ6IGZ1bmN0aW9uICh0eXBlKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY29tcG9uZW50c1t0eXBlXTtcclxuXHR9LFxyXG5cclxuXHRhZGQ6IGZ1bmN0aW9uICh0eXBlLCBkYXRhKSB7XHJcblx0XHRkYXRhLnR5cGUgPSB0eXBlO1xyXG5cclxuXHRcdHRoaXMuX2NvbXBvbmVudHNbdHlwZV0gPSBkYXRhO1xyXG5cclxuXHRcdGlmIChkYXRhLm5vZGVzKSB7XHJcblx0XHRcdGZvciAodmFyIGkgaW4gZGF0YS5ub2Rlcykge1xyXG5cdFx0XHRcdHRoaXMuX25vZGVzTG9va3VwW2RhdGEubm9kZXNbaV1dID0gZGF0YTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkYXRhLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0aWYgKGRhdGEuYXR0cmlidXRlcy5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcclxuXHRcdFx0XHRmb3IgKHZhciBpIGluIGRhdGEuYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlc0xvb2t1cFtkYXRhLmF0dHJpYnV0ZXNbaV1dID0gZGF0YTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSBpbiBkYXRhLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5fYXR0cmlidXRlc0xvb2t1cFtpXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlc0xvb2t1cFtpXSA9IHt9O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChkYXRhLmF0dHJpYnV0ZXNbaV0uY29uc3RydWN0b3IgPT09IEFycmF5KSB7XHJcblx0XHRcdFx0XHRcdC8vIOaUr+aMgXRleHRpbnB1dOS4reS4jeWQjOeahOi+k+WFpeexu+Wei2F0dHJpYnV0ZXM6IHsgXCJ0eXBlXCI6IFsndGV4dCcsICdwYXNzd29yZCddIH0sXHJcblx0XHRcdFx0XHRcdGRhdGEuYXR0cmlidXRlc1tpXS5mb3JFYWNoKHZhbHVlID0+IHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2ldW3ZhbHVlXSA9IGRhdGE7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlc0xvb2t1cFtpXVtkYXRhLmF0dHJpYnV0ZXNbaV1dID0gZGF0YTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZGF0YS5jbGFzc2VzKSB7XHJcblx0XHRcdGZvciAodmFyIGkgaW4gZGF0YS5jbGFzc2VzKSB7XHJcblx0XHRcdFx0dGhpcy5fY2xhc3Nlc0xvb2t1cFtkYXRhLmNsYXNzZXNbaV1dID0gZGF0YTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkYXRhLmNsYXNzZXNSZWdleCkge1xyXG5cdFx0XHRmb3IgKHZhciBpIGluIGRhdGEuY2xhc3Nlc1JlZ2V4KSB7XHJcblx0XHRcdFx0dGhpcy5fY2xhc3Nlc1JlZ2V4TG9va3VwW2RhdGEuY2xhc3Nlc1JlZ2V4W2ldXSA9IGRhdGE7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRleHRlbmQ6IGZ1bmN0aW9uIChpbmhlcml0VHlwZSwgdHlwZSwgZGF0YSkge1xyXG5cclxuXHRcdG5ld0RhdGEgPSBkYXRhO1xyXG5cclxuXHRcdGlmIChpbmhlcml0RGF0YSA9IHRoaXMuX2NvbXBvbmVudHNbaW5oZXJpdFR5cGVdKSB7XHJcblx0XHRcdG5ld0RhdGEgPSAkLmV4dGVuZCh0cnVlLCB7fSwgaW5oZXJpdERhdGEsIGRhdGEpO1xyXG5cdFx0XHRuZXdEYXRhLnByb3BlcnRpZXMgPSAkLm1lcmdlKCQubWVyZ2UoW10sIGluaGVyaXREYXRhLnByb3BlcnRpZXMgPyBpbmhlcml0RGF0YS5wcm9wZXJ0aWVzIDogW10pLCBkYXRhLnByb3BlcnRpZXMgPyBkYXRhLnByb3BlcnRpZXMgOiBbXSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly9zb3J0IGJ5IG9yZGVyXHJcblx0XHRuZXdEYXRhLnByb3BlcnRpZXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG5cdFx0XHRpZiAodHlwZW9mIGEuc29ydCA9PT0gXCJ1bmRlZmluZWRcIikgYS5zb3J0ID0gMDtcclxuXHRcdFx0aWYgKHR5cGVvZiBiLnNvcnQgPT09IFwidW5kZWZpbmVkXCIpIGIuc29ydCA9IDA7XHJcblxyXG5cdFx0XHRpZiAoYS5zb3J0IDwgYi5zb3J0KVxyXG5cdFx0XHRcdHJldHVybiAtMTtcclxuXHRcdFx0aWYgKGEuc29ydCA+IGIuc29ydClcclxuXHRcdFx0XHRyZXR1cm4gMTtcclxuXHRcdFx0cmV0dXJuIDA7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0dGhpcy5hZGQodHlwZSwgbmV3RGF0YSk7XHJcblx0fSxcclxuXHJcblxyXG5cdG1hdGNoTm9kZTogZnVuY3Rpb24gKG5vZGUpIHtcclxuXHRcdGlmICgkKG5vZGUpLmF0dHIoZGF0YUNvbXBvbmVudElkKSAmJiB0aGlzLl9jb21wb25lbnRzWyQobm9kZSkuYXR0cihkYXRhQ29tcG9uZW50SWQpXSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fY29tcG9uZW50c1skKG5vZGUpLmF0dHIoZGF0YUNvbXBvbmVudElkKV07XHJcblx0XHR9IGVsc2UgaWYgKCQobm9kZSkuYXR0cigndHlwZScpID09ICdyYWRpbycgfHwgJChub2RlKS5hdHRyKCd0eXBlJykgPT0gJ2NoZWNrYm94Jykge1xyXG5cdFx0XHRjb25zdCAkcGFyZW50ID0gJChub2RlKS5wYXJlbnQoKTtcclxuXHRcdFx0aWYgKCRwYXJlbnQuYXR0cihkYXRhQ29tcG9uZW50SWQpICYmIHRoaXMuX2NvbXBvbmVudHNbJHBhcmVudC5hdHRyKGRhdGFDb21wb25lbnRJZCldKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2NvbXBvbmVudHNbJHBhcmVudC5hdHRyKGRhdGFDb21wb25lbnRJZCldXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAobm9kZS5hdHRyaWJ1dGVzLmxlbmd0aCkge1xyXG5cdFx0XHQvL3NlYXJjaCBmb3IgYXR0cmlidXRlc1xyXG5cdFx0XHRmb3IgKHZhciBpIGluIG5vZGUuYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdGF0dHIgPSBub2RlLmF0dHJpYnV0ZXNbaV0ubmFtZTtcclxuXHRcdFx0XHR2YWx1ZSA9IG5vZGUuYXR0cmlidXRlc1tpXS52YWx1ZTtcclxuXHJcblx0XHRcdFx0aWYgKGF0dHIgaW4gdGhpcy5fYXR0cmlidXRlc0xvb2t1cCkge1xyXG5cdFx0XHRcdFx0Y29tcG9uZW50ID0gdGhpcy5fYXR0cmlidXRlc0xvb2t1cFthdHRyXTtcclxuXHJcblx0XHRcdFx0XHQvL2N1cnJlbnRseSB3ZSBjaGVjayB0aGF0IGlzIG5vdCBhIGNvbXBvbmVudCBieSBsb29raW5nIGF0IG5hbWUgYXR0cmlidXRlXHJcblx0XHRcdFx0XHQvL2lmIHdlIGhhdmUgYSBjb2xsZWN0aW9uIG9mIG9iamVjdHMgaXQgbWVhbnMgdGhhdCBhdHRyaWJ1dGUgdmFsdWUgbXVzdCBiZSBjaGVja2VkXHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIGNvbXBvbmVudFtcIm5hbWVcIl0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHZhbHVlIGluIGNvbXBvbmVudCkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBjb21wb25lbnRbdmFsdWVdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2VcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGNvbXBvbmVudDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZvciAodmFyIGkgaW4gbm9kZS5hdHRyaWJ1dGVzKSB7XHJcblx0XHRcdFx0YXR0ciA9IG5vZGUuYXR0cmlidXRlc1tpXS5uYW1lO1xyXG5cdFx0XHRcdHZhbHVlID0gbm9kZS5hdHRyaWJ1dGVzW2ldLnZhbHVlO1xyXG5cclxuXHRcdFx0XHQvL2NoZWNrIGZvciBub2RlIGNsYXNzZXNcclxuXHRcdFx0XHRpZiAoYXR0ciA9PSBcImNsYXNzXCIpIHtcclxuXHRcdFx0XHRcdGNsYXNzZXMgPSB2YWx1ZS5zcGxpdChcIiBcIik7XHJcblxyXG5cdFx0XHRcdFx0Zm9yIChqIGluIGNsYXNzZXMpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGNsYXNzZXNbal0gaW4gdGhpcy5fY2xhc3Nlc0xvb2t1cClcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fY2xhc3Nlc0xvb2t1cFtjbGFzc2VzW2pdXTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRmb3IgKHJlZ2V4IGluIHRoaXMuX2NsYXNzZXNSZWdleExvb2t1cCkge1xyXG5cdFx0XHRcdFx0XHRyZWdleE9iaiA9IG5ldyBSZWdFeHAocmVnZXgpO1xyXG5cdFx0XHRcdFx0XHRpZiAocmVnZXhPYmouZXhlYyh2YWx1ZSkpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fY2xhc3Nlc1JlZ2V4TG9va3VwW3JlZ2V4XTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRhZ05hbWUgPSBub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcclxuXHRcdGlmICh0YWdOYW1lIGluIHRoaXMuX25vZGVzTG9va3VwKSByZXR1cm4gdGhpcy5fbm9kZXNMb29rdXBbdGFnTmFtZV07XHJcblxyXG5cdFx0Ly9yZXR1cm4gZmFsc2U7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXQoVnZ2ZWIuZGVmYXVsdENvbXBvbmVudCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAodHlwZSkge1xyXG5cclxuXHRcdGNvbXBvbmVudCA9IHRoaXMuX2NvbXBvbmVudHNbdHlwZV07XHJcblxyXG5cdFx0cmlnaHRQYW5lbCA9IGpRdWVyeShcIiNyaWdodC1wYW5lbCAjY29tcG9uZW50LXByb3BlcnRpZXNcIik7XHJcblx0XHRzZWN0aW9uID0gcmlnaHRQYW5lbC5maW5kKCcuc2VjdGlvbltkYXRhLXNlY3Rpb249XCJkZWZhdWx0XCJdJyk7XHJcblxyXG5cdFx0aWYgKCEoVnZ2ZWIucHJlc2VydmVQcm9wZXJ0eVNlY3Rpb25zICYmIHNlY3Rpb24ubGVuZ3RoKSkge1xyXG5cdFx0XHRyaWdodFBhbmVsLmh0bWwoJycpLmFwcGVuZCh0bXBsKFwidnZ2ZWItaW5wdXQtc2VjdGlvbmlucHV0XCIsIHsga2V5OiBcImRlZmF1bHRcIiwgaGVhZGVyOiBjb21wb25lbnQubmFtZSB9KSk7XHJcblx0XHRcdHNlY3Rpb24gPSByaWdodFBhbmVsLmZpbmQoXCIuc2VjdGlvblwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRyaWdodFBhbmVsLmZpbmQoJ1tkYXRhLWhlYWRlcj1cImRlZmF1bHRcIl0gc3BhbicpLmh0bWwoY29tcG9uZW50Lm5hbWUpO1xyXG5cdFx0c2VjdGlvbi5odG1sKFwiXCIpXHJcblxyXG5cdFx0aWYgKGNvbXBvbmVudC5iZWZvcmVJbml0KSBjb21wb25lbnQuYmVmb3JlSW5pdChWdnZlYi5CdWlsZGVyLnNlbGVjdGVkRWwuZ2V0KDApKTtcclxuXHJcblx0XHRmbiA9IGZ1bmN0aW9uIChjb21wb25lbnQsIHByb3BlcnR5KSB7XHJcblx0XHRcdHJldHVybiBwcm9wZXJ0eS5pbnB1dC5vbigncHJvcGVydHlDaGFuZ2UnLCBmdW5jdGlvbiAoZXZlbnQsIHZhbHVlLCBpbnB1dCkge1xyXG5cdFx0XHRcdGVsZW1lbnQgPSBWdnZlYi5CdWlsZGVyLnNlbGVjdGVkRWw7XHJcblx0XHRcdFx0aWYgKHByb3BlcnR5LmNoaWxkKSBlbGVtZW50ID0gZWxlbWVudC5maW5kKHByb3BlcnR5LmNoaWxkKTtcclxuXHRcdFx0XHRpZiAocHJvcGVydHkucGFyZW50KSBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnQocHJvcGVydHkucGFyZW50KTtcclxuXHJcblx0XHRcdFx0aWYgKHByb3BlcnR5Lm9uQ2hhbmdlKSB7XHJcblx0XHRcdFx0XHRlbGVtZW50ID0gcHJvcGVydHkub25DaGFuZ2UoZWxlbWVudCwgdmFsdWUsIGlucHV0LCBjb21wb25lbnQpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHkuaHRtbEF0dHIpIHtcclxuXHRcdFx0XHRcdG9sZFZhbHVlID0gZWxlbWVudC5hdHRyKHByb3BlcnR5Lmh0bWxBdHRyKTtcclxuXHJcblx0XHRcdFx0XHRpZiAocHJvcGVydHkuaHRtbEF0dHIgPT0gJ3RleHQnKSB7XHJcblx0XHRcdFx0XHRcdGVsZW1lbnQudGV4dCh2YWx1ZSk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5Lmh0bWxBdHRyID09IFwiY2xhc3NcIiAmJiBwcm9wZXJ0eS52YWxpZFZhbHVlcykge1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50LnJlbW92ZUNsYXNzKHByb3BlcnR5LnZhbGlkVmFsdWVzLmpvaW4oXCIgXCIpKTtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQuYWRkQ2xhc3ModmFsdWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAocHJvcGVydHkuaHRtbEF0dHIgPT0gXCJzdHlsZVwiKSB7XHJcblx0XHRcdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LmNzcyhwcm9wZXJ0eS5rZXksIHZhbHVlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKHByb3BlcnR5Lm5vVmFsdWVBdHRyKSB7XHJcblx0XHRcdFx0XHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LmF0dHIocHJvcGVydHkuaHRtbEF0dHIsICcnKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5yZW1vdmVBdHRyKHByb3BlcnR5Lmh0bWxBdHRyKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQuYXR0cihwcm9wZXJ0eS5odG1sQXR0ciwgdmFsdWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdFx0XHR0eXBlOiAnYXR0cmlidXRlcycsXHJcblx0XHRcdFx0XHRcdHRhcmdldDogZWxlbWVudC5nZXQoMCksXHJcblx0XHRcdFx0XHRcdGF0dHJpYnV0ZU5hbWU6IHByb3BlcnR5Lmh0bWxBdHRyLFxyXG5cdFx0XHRcdFx0XHRvbGRWYWx1ZTogb2xkVmFsdWUsXHJcblx0XHRcdFx0XHRcdG5ld1ZhbHVlOiBlbGVtZW50LmF0dHIocHJvcGVydHkuaHRtbEF0dHIpXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChjb21wb25lbnQub25DaGFuZ2UpIHtcclxuXHRcdFx0XHRcdGVsZW1lbnQgPSBjb21wb25lbnQub25DaGFuZ2UoZWxlbWVudCwgcHJvcGVydHksIHZhbHVlLCBpbnB1dCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoIXByb3BlcnR5LmNoaWxkICYmICFwcm9wZXJ0eS5wYXJlbnQpIFZ2dmViLkJ1aWxkZXIuc2VsZWN0Tm9kZShlbGVtZW50KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdG5vZGVFbGVtZW50ID0gVnZ2ZWIuQnVpbGRlci5zZWxlY3RlZEVsO1xyXG5cclxuXHRcdGZvciAodmFyIGkgaW4gY29tcG9uZW50LnByb3BlcnRpZXMpIHtcclxuXHRcdFx0cHJvcGVydHkgPSBjb21wb25lbnQucHJvcGVydGllc1tpXTtcclxuXHJcblx0XHRcdGlmIChwcm9wZXJ0eS5iZWZvcmVJbml0KSBwcm9wZXJ0eS5iZWZvcmVJbml0KGVsZW1lbnQuZ2V0KDApKVxyXG5cclxuXHRcdFx0ZWxlbWVudCA9IG5vZGVFbGVtZW50O1xyXG5cdFx0XHRpZiAocHJvcGVydHkuY2hpbGQpIGVsZW1lbnQgPSBlbGVtZW50LmZpbmQocHJvcGVydHkuY2hpbGQpO1xyXG5cclxuXHRcdFx0aWYgKHByb3BlcnR5LmRhdGEpIHtcclxuXHRcdFx0XHRwcm9wZXJ0eS5kYXRhW1wia2V5XCJdID0gcHJvcGVydHkua2V5O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHByb3BlcnR5LmRhdGEgPSB7IFwia2V5XCI6IHByb3BlcnR5LmtleSB9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIHByb3BlcnR5Lmdyb3VwID09PSAndW5kZWZpbmVkJykgcHJvcGVydHkuZ3JvdXAgPSBudWxsO1xyXG5cclxuXHRcdFx0cHJvcGVydHkuaW5wdXQgPSBwcm9wZXJ0eS5pbnB1dHR5cGUuaW5pdChwcm9wZXJ0eS5kYXRhKTtcclxuXHJcblx0XHRcdGlmIChwcm9wZXJ0eS5pbml0KSB7XHJcblx0XHRcdFx0cHJvcGVydHkuaW5wdXR0eXBlLnNldFZhbHVlKHByb3BlcnR5LmluaXQoZWxlbWVudC5nZXQoMCkpKTtcclxuXHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eS5odG1sQXR0cikge1xyXG5cdFx0XHRcdGlmIChwcm9wZXJ0eS5odG1sQXR0ciA9PSAndGV4dCcpIHtcclxuXHRcdFx0XHRcdHZhbHVlID0gZWxlbWVudC50ZXh0KCk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eS5odG1sQXR0ciA9PSBcInN0eWxlXCIpIHtcclxuXHRcdFx0XHRcdC8vdmFsdWUgPSBlbGVtZW50LmNzcyhwcm9wZXJ0eS5rZXkpOy8vanF1ZXJ5IGNzcyByZXR1cm5zIGNvbXB1dGVkIHN0eWxlXHJcblx0XHRcdFx0XHR2YWx1ZSA9IGdldFN0eWxlKGVsZW1lbnQuZ2V0KDApLCBwcm9wZXJ0eS5rZXkpOy8vZ2V0U3R5bGUgcmV0dXJucyBkZWNsYXJlZCBzdHlsZVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR2YWx1ZSA9IGVsZW1lbnQuYXR0cihwcm9wZXJ0eS5odG1sQXR0cik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvL2lmIGF0dHJpYnV0ZSBpcyBjbGFzcyBjaGVjayBpZiBvbmUgb2YgdmFsaWQgdmFsdWVzIGlzIGluY2x1ZGVkIGFzIGNsYXNzIHRvIHNldCB0aGUgc2VsZWN0XHJcblx0XHRcdFx0aWYgKHZhbHVlICYmIHByb3BlcnR5Lmh0bWxBdHRyID09IFwiY2xhc3NcIiAmJiBwcm9wZXJ0eS52YWxpZFZhbHVlcykge1xyXG5cdFx0XHRcdFx0dmFsdWUgPSB2YWx1ZS5zcGxpdChcIiBcIikuZmlsdGVyKGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcHJvcGVydHkudmFsaWRWYWx1ZXMuaW5kZXhPZihlbCkgIT0gLTFcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHByb3BlcnR5Lm5vVmFsdWVBdHRyKSB7XHJcblx0XHRcdFx0XHR2YWx1ZSA9IGVsZW1lbnQuYXR0cihwcm9wZXJ0eS5odG1sQXR0cikgPyBwcm9wZXJ0eS52YWxpZFZhbHVlcyA6IFtdO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cHJvcGVydHkuaW5wdXR0eXBlLnNldFZhbHVlKHZhbHVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zm4oY29tcG9uZW50LCBwcm9wZXJ0eSk7XHJcblxyXG5cdFx0XHRpZiAocHJvcGVydHkuaW5wdXR0eXBlID09IFNlY3Rpb25JbnB1dCkge1xyXG5cdFx0XHRcdHNlY3Rpb24gPSByaWdodFBhbmVsLmZpbmQoJy5zZWN0aW9uW2RhdGEtc2VjdGlvbj1cIicgKyBwcm9wZXJ0eS5rZXkgKyAnXCJdJyk7XHJcblxyXG5cdFx0XHRcdGlmIChWdnZlYi5wcmVzZXJ2ZVByb3BlcnR5U2VjdGlvbnMgJiYgc2VjdGlvbi5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdHNlY3Rpb24uaHRtbChcIlwiKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cmlnaHRQYW5lbC5hcHBlbmQocHJvcGVydHkuaW5wdXQpO1xyXG5cdFx0XHRcdFx0c2VjdGlvbiA9IHJpZ2h0UGFuZWwuZmluZCgnLnNlY3Rpb25bZGF0YS1zZWN0aW9uPVwiJyArIHByb3BlcnR5LmtleSArICdcIl0nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0cm93ID0gJCh0bXBsKCd2dnZlYi1wcm9wZXJ0eScsIHByb3BlcnR5KSk7XHJcblx0XHRcdFx0cm93LmZpbmQoJy5pbnB1dCcpLmFwcGVuZChwcm9wZXJ0eS5pbnB1dCk7XHJcblx0XHRcdFx0c2VjdGlvbi5hcHBlbmQocm93KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjb21wb25lbnQuaW5pdCkgY29tcG9uZW50LmluaXQoVnZ2ZWIuQnVpbGRlci5zZWxlY3RlZEVsLmdldCgwKSk7XHJcblx0fVxyXG59O1xyXG5cclxuXHJcblxyXG5WdnZlYi5XeXNpd3lnRWRpdG9yID0ge1xyXG5cclxuXHRpc0FjdGl2ZTogZmFsc2UsXHJcblx0b2xkVmFsdWU6ICcnLFxyXG5cdGRvYzogZmFsc2UsXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkb2MpIHtcclxuXHRcdHRoaXMuZG9jID0gZG9jO1xyXG5cclxuXHRcdCQoXCIjYm9sZC1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRkb2MuZXhlY0NvbW1hbmQoJ2JvbGQnLCBmYWxzZSwgbnVsbCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNpdGFsaWMtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCdpdGFsaWMnLCBmYWxzZSwgbnVsbCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiN1bmRlcmxpbmUtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCd1bmRlcmxpbmUnLCBmYWxzZSwgbnVsbCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNzdHJpa2UtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCdzdHJpa2VUaHJvdWdoJywgZmFsc2UsIG51bGwpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjbGluay1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRkb2MuZXhlY0NvbW1hbmQoJ2NyZWF0ZUxpbmsnLCBmYWxzZSwgXCIjXCIpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHVuZG86IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHR0aGlzLmRvYy5leGVjQ29tbWFuZCgndW5kbycsIGZhbHNlLCBudWxsKTtcclxuXHR9LFxyXG5cclxuXHRyZWRvOiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5kb2MuZXhlY0NvbW1hbmQoJ3JlZG8nLCBmYWxzZSwgbnVsbCk7XHJcblx0fSxcclxuXHJcblx0ZWRpdDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdGVsZW1lbnQuYXR0cih7ICdjb250ZW50ZWRpdGFibGUnOiB0cnVlLCAnc3BlbGxjaGVja2tlcic6IGZhbHNlIH0pO1xyXG5cdFx0JChcIiN3eXNpd3lnLWVkaXRvclwiKS5zaG93KCk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuXHRcdHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xyXG5cdFx0dGhpcy5vbGRWYWx1ZSA9IGVsZW1lbnQuaHRtbCgpO1xyXG5cdH0sXHJcblxyXG5cdGRlc3Ryb3k6IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHRlbGVtZW50LnJlbW92ZUF0dHIoJ2NvbnRlbnRlZGl0YWJsZSBzcGVsbGNoZWNra2VyJyk7XHJcblx0XHQkKFwiI3d5c2l3eWctZWRpdG9yXCIpLmhpZGUoKTtcclxuXHRcdHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHJcblxyXG5cdFx0bm9kZSA9IHRoaXMuZWxlbWVudC5nZXQoMCk7XHJcblx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0dHlwZTogJ2NoYXJhY3RlckRhdGEnLFxyXG5cdFx0XHR0YXJnZXQ6IG5vZGUsXHJcblx0XHRcdG9sZFZhbHVlOiB0aGlzLm9sZFZhbHVlLFxyXG5cdFx0XHRuZXdWYWx1ZTogbm9kZS5pbm5lckhUTUxcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuVnZ2ZWIuQnVpbGRlciA9IHtcclxuXHJcblx0ZHJhZ01vdmVNdXRhdGlvbjogZmFsc2UsXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uICh1cmwsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0c2VsZiA9IHRoaXM7XHJcblxyXG5cdFx0c2VsZi5sb2FkQ29udHJvbEdyb3VwcygpO1xyXG5cclxuXHRcdHNlbGYuc2VsZWN0ZWRFbCA9IG51bGw7XHJcblx0XHRzZWxmLmhpZ2hsaWdodEVsID0gbnVsbDtcclxuXHRcdHNlbGYuaW5pdENhbGxiYWNrID0gY2FsbGJhY2s7XHJcblxyXG5cdFx0c2VsZi5kb2N1bWVudEZyYW1lID0gJChcIiNpZnJhbWUtd3JhcHBlciA+IGlmcmFtZVwiKTtcclxuXHRcdHNlbGYuY2FudmFzID0gJChcIiNjYW52YXNcIik7XHJcblxyXG5cdFx0c2VsZi5fbG9hZElmcmFtZSh1cmwpO1xyXG5cclxuXHRcdHNlbGYuX2luaXREcmFnZHJvcCgpO1xyXG5cclxuXHRcdHNlbGYuZHJhZ0VsZW1lbnQgPSBudWxsO1xyXG5cdH0sXHJcblxyXG5cdC8qIGNvbnRyb2xzICovXHJcblx0bG9hZENvbnRyb2xHcm91cHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRjb21wb25lbnRzTGlzdCA9ICQoXCIjY29tcG9uZW50cy1saXN0XCIpO1xyXG5cdFx0Y29tcG9uZW50c0xpc3QuZW1wdHkoKTtcclxuXHJcblx0XHRmb3IgKGdyb3VwIGluIFZ2dmViLkNvbXBvbmVudHNHcm91cCkge1xyXG5cdFx0XHRjb21wb25lbnRzTGlzdC5hcHBlbmQoJzxsaSBjbGFzcz1cImhlYWRlclwiIGRhdGEtc2VjdGlvbj1cIicgKyBncm91cCArICdcIiAgZGF0YS1zZWFyY2g9XCJcIj48bGFiZWwgY2xhc3M9XCJoZWFkZXJcIiBmb3I9XCJjb21waGVhZF8nICsgZ3JvdXAgKyAnXCI+JyArIGdyb3VwICsgJyAgPGRpdiBjbGFzcz1cImhlYWRlci1hcnJvd1wiPjwvZGl2PlxcXHJcblx0XHRcdFx0XHRcdFx0XHQgICA8L2xhYmVsPjxpbnB1dCBjbGFzcz1cImhlYWRlcl9jaGVja1wiIHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJ0cnVlXCIgaWQ9XCJjb21waGVhZF8nICsgZ3JvdXAgKyAnXCI+ICA8b2w+PC9vbD48L2xpPicpO1xyXG5cclxuXHRcdFx0Y29tcG9uZW50c1N1Ykxpc3QgPSBjb21wb25lbnRzTGlzdC5maW5kKCdsaVtkYXRhLXNlY3Rpb249XCInICsgZ3JvdXAgKyAnXCJdICBvbCcpO1xyXG5cclxuXHRcdFx0Y29tcG9uZW50cyA9IFZ2dmViLkNvbXBvbmVudHNHcm91cFtncm91cF07XHJcblxyXG5cdFx0XHRmb3IgKGkgaW4gY29tcG9uZW50cykge1xyXG5cdFx0XHRcdGNvbXBvbmVudFR5cGUgPSBjb21wb25lbnRzW2ldO1xyXG5cdFx0XHRcdGNvbXBvbmVudCA9IFZ2dmViLkNvbXBvbmVudHMuZ2V0KGNvbXBvbmVudFR5cGUpO1xyXG5cclxuXHRcdFx0XHRpZiAoY29tcG9uZW50KSB7XHJcblx0XHRcdFx0XHRpdGVtID0gJCgnPGxpIGRhdGEtc2VjdGlvbj1cIicgKyBncm91cCArICdcIiBkYXRhLXR5cGU9XCInICsgY29tcG9uZW50VHlwZSArICdcIiBkYXRhLXNlYXJjaD1cIicgKyBjb21wb25lbnQubmFtZS50b0xvd2VyQ2FzZSgpICsgJ1wiPjxhIGhyZWY9XCIjXCI+JyArIGNvbXBvbmVudC5uYW1lICsgXCI8L2E+PC9saT5cIik7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGNvbXBvbmVudC5pbWFnZSkge1xyXG5cclxuXHRcdFx0XHRcdFx0aXRlbS5jc3Moe1xyXG5cdFx0XHRcdFx0XHRcdGJhY2tncm91bmRJbWFnZTogXCJ1cmwoXCIgKyAnbGlicy9idWlsZGVyLycgKyBjb21wb25lbnQuaW1hZ2UgKyBcIilcIixcclxuXHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kUmVwZWF0OiBcIm5vLXJlcGVhdFwiXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Y29tcG9uZW50c1N1Ykxpc3QuYXBwZW5kKGl0ZW0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0bG9hZFVybDogZnVuY3Rpb24gKHVybCkge1xyXG5cdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cdFx0c2VsZi5pZnJhbWUuc3JjID0gdXJsO1xyXG5cdH0sXHJcblxyXG5cdC8qIGlmcmFtZSAqL1xyXG5cdF9sb2FkSWZyYW1lOiBmdW5jdGlvbiAodXJsKSB7XHJcblxyXG5cdFx0c2VsZi5pZnJhbWUgPSB0aGlzLmRvY3VtZW50RnJhbWUuZ2V0KDApO1xyXG5cdFx0c2VsZi5pZnJhbWUuc3JjID0gdXJsO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmRvY3VtZW50RnJhbWUub24oXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdHdpbmRvdy5GcmFtZVdpbmRvdyA9IHNlbGYuaWZyYW1lLmNvbnRlbnRXaW5kb3c7XHJcblx0XHRcdHdpbmRvdy5GcmFtZURvY3VtZW50ID0gc2VsZi5pZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcclxuXHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IuaW5pdCh3aW5kb3cuRnJhbWVEb2N1bWVudCk7XHJcblx0XHRcdGlmIChzZWxmLmluaXRDYWxsYmFjaykgc2VsZi5pbml0Q2FsbGJhY2soKTtcclxuXHJcblx0XHRcdHJldHVybiBzZWxmLl9mcmFtZUxvYWRlZCgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdF9mcmFtZUxvYWRlZDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHNlbGYuZnJhbWVEb2MgPSAkKHdpbmRvdy5GcmFtZURvY3VtZW50KTtcclxuXHRcdHNlbGYuZnJhbWVIdG1sID0gJCh3aW5kb3cuRnJhbWVEb2N1bWVudCkuZmluZChcImh0bWxcIik7XHJcblx0XHRzZWxmLmZyYW1lQm9keSA9ICQod2luZG93LkZyYW1lRG9jdW1lbnQpLmZpbmQoJ2JvZHknKTtcclxuXHJcblx0XHR0aGlzLl9pbml0SGlnaHRsaWdodCgpO1xyXG5cdH0sXHJcblxyXG5cdF9nZXRFbGVtZW50VHlwZTogZnVuY3Rpb24gKGVsKSB7XHJcblxyXG5cdFx0Ly9zZWFyY2ggZm9yIGNvbXBvbmVudCBhdHRyaWJ1dGVcclxuXHRcdGNvbXBvbmVudE5hbWUgPSAnJztcclxuXHJcblx0XHRpZiAoZWwuYXR0cmlidXRlcylcclxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaisrKSB7XHJcblxyXG5cdFx0XHRcdGlmIChlbC5hdHRyaWJ1dGVzW2pdLm5vZGVOYW1lLmluZGV4T2YoJ2RhdGEtY29tcG9uZW50JykgPiAtMSkge1xyXG5cdFx0XHRcdFx0Y29tcG9uZW50TmFtZSA9IGVsLmF0dHJpYnV0ZXNbal0ubm9kZU5hbWUucmVwbGFjZSgnZGF0YS1jb21wb25lbnQtJywgJycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdGlmIChjb21wb25lbnROYW1lICE9ICcnKSByZXR1cm4gY29tcG9uZW50TmFtZTtcclxuXHJcblx0XHRpZiAoZWwuYXR0cmlidXRlcylcclxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaisrKSB7XHJcblxyXG5cdFx0XHRcdGlmIChlbC5hdHRyaWJ1dGVzW2pdLm5vZGVOYW1lLmluZGV4T2YoJ2RhdGEtY29tcG9uZW50JykgPiAtMSkge1xyXG5cdFx0XHRcdFx0Y29tcG9uZW50TmFtZSA9IGVsLmF0dHJpYnV0ZXNbal0ubm9kZU5hbWUucmVwbGFjZSgnZGF0YS1jb21wb25lbnQtJywgJycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdGlmIChjb21wb25lbnROYW1lICE9ICcnKSByZXR1cm4gY29tcG9uZW50TmFtZTtcclxuXHRcdC8vaWYgKGNsYXNzTmFtZSkgcmV0dXJuIGNvbXBvbmVudE5hbWU7XHJcblx0XHRyZXR1cm4gZWwudGFnTmFtZTtcclxuXHR9LFxyXG5cclxuXHRsb2FkTm9kZUNvbXBvbmVudDogZnVuY3Rpb24gKG5vZGUpIHtcclxuXHRcdGRhdGEgPSBWdnZlYi5Db21wb25lbnRzLm1hdGNoTm9kZShub2RlKTtcclxuXHRcdGlmIChkYXRhKSBWdnZlYi5Db21wb25lbnRzLnJlbmRlcihkYXRhLnR5cGUpO1xyXG5cclxuXHR9LFxyXG5cclxuXHRzZWxlY3ROb2RlOiBmdW5jdGlvbiAobm9kZSA9IGZhbHNlKSB7XHJcblxyXG5cdFx0aWYgKCFub2RlKSB7XHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmhpZGUoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChzZWxmLnRleHRlZGl0RWwgJiYgc2VsZi5zZWxlY3RlZEVsLmdldCgwKSAhPSBub2RlKSB7XHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IuZGVzdHJveShzZWxmLnRleHRlZGl0RWwpO1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5yZW1vdmVDbGFzcyhcInRleHQtZWRpdFwiKS5maW5kKFwiI3NlbGVjdC1hY3Rpb25zXCIpLnNob3coKTtcclxuXHRcdFx0c2VsZi50ZXh0ZWRpdEVsID0gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRzZWxmLnNlbGVjdGVkRWwgPSB0YXJnZXQgPSBqUXVlcnkobm9kZSk7XHJcblx0XHRvZmZzZXQgPSB0YXJnZXQub2Zmc2V0KCk7XHJcblxyXG5cclxuXHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmNzcyhcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwidG9wXCI6IG9mZnNldC50b3AgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbFRvcCgpLFxyXG5cdFx0XHRcdFwibGVmdFwiOiBvZmZzZXQubGVmdCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsTGVmdCgpLFxyXG5cdFx0XHRcdFwid2lkdGhcIjogdGFyZ2V0Lm91dGVyV2lkdGgoKSxcclxuXHRcdFx0XHRcImhlaWdodFwiOiB0YXJnZXQub3V0ZXJIZWlnaHQoKSxcclxuXHRcdFx0XHRcImRpc3BsYXlcIjogXCJibG9ja1wiLFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRqUXVlcnkoXCIjaGlnaGxpZ2h0LW5hbWVcIikuaHRtbChzZWxmLl9nZXRFbGVtZW50VHlwZShub2RlKSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdC8qIGlmcmFtZSBoaWdobGlnaHQgKi9cclxuXHRfaW5pdEhpZ2h0bGlnaHQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRtb3ZlRXZlbnQgPSB7IHRhcmdldDogbnVsbCwgfTtcclxuXHJcblx0XHR0aGlzLmZyYW1lQm9keS5vbihcIm1vdXNlbW92ZSB0b3VjaG1vdmVcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdC8vZGVsYXkgZm9yIGhhbGYgYSBzZWNvbmQgaWYgZHJhZ2dpbmcgb3ZlciBzYW1lIGVsZW1lbnRcclxuXHRcdFx0Ly8gaWYgKGV2ZW50LnRhcmdldCA9PSBtb3ZlRXZlbnQudGFyZ2V0ICYmICgoZXZlbnQudGltZVN0YW1wIC0gbW92ZUV2ZW50LnRpbWVTdGFtcCkgPCA1MDApKSByZXR1cm47XHJcblx0XHRcdGlmIChldmVudC50YXJnZXQpIHtcclxuXHRcdFx0XHRtb3ZlRXZlbnQgPSBldmVudDtcclxuXHJcblx0XHRcdFx0c2VsZi5oaWdobGlnaHRFbCA9IHRhcmdldCA9IGpRdWVyeShldmVudC50YXJnZXQpO1xyXG5cdFx0XHRcdG9mZnNldCA9IHRhcmdldC5vZmZzZXQoKTtcclxuXHRcdFx0XHR3aWR0aCA9IHRhcmdldC5vdXRlcldpZHRoKCk7XHJcblx0XHRcdFx0aGVpZ2h0ID0gdGFyZ2V0Lm91dGVySGVpZ2h0KCk7XHJcblxyXG5cdFx0XHRcdGlmIChzZWxmLmlzRHJhZ2dpbmcpIHtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQuY3NzKHtcclxuXHRcdFx0XHRcdFx0ZGlzcGxheTogJ25vbmUnXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHBhcmVudCA9IHNlbGYuaGlnaGxpZ2h0RWw7XHJcblx0XHRcdFx0XHRwYXJlbnRPZmZzZXQgPSBzZWxmLmRyYWdFbGVtZW50Lm9mZnNldCgpO1xyXG5cdFx0XHRcdFx0Ly8gdHJ5IHtcclxuXHRcdFx0XHRcdC8vIFx0c2VsZi5kcmFnRWxlbWVudC5jc3Moe1xyXG5cdFx0XHRcdFx0Ly8gXHRcdGRpc3BsYXk6ICdub25lJ1xyXG5cdFx0XHRcdFx0Ly8gXHR9KTtcclxuXHRcdFx0XHRcdC8vIFx0aWYgKGV2ZW50Lm9yaWdpbmFsRXZlbnQgJiYgKG9mZnNldC5sZWZ0ID4gKGV2ZW50Lm9yaWdpbmFsRXZlbnQueCAtIDEwKSkpIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRpZiAob2Zmc2V0LnRvcCA+IChldmVudC5vcmlnaW5hbEV2ZW50LnkgLSAxMCkpIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHBhcmVudC5iZWZvcmUoc2VsZi5kcmFnRWxlbWVudCk7XHJcblx0XHRcdFx0XHQvLyBcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHBhcmVudC5wcmVwZW5kKHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0c2VsZi5kcmFnRWxlbWVudC5wcmVwZW5kVG8ocGFyZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHR9XHJcblx0XHRcdFx0XHQvLyBcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0aWYgKGV2ZW50Lm9yaWdpbmFsRXZlbnQgJiYgb2Zmc2V0LnRvcCA+ICgoZXZlbnQub3JpZ2luYWxFdmVudC55IC0gMTApKSkge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0cGFyZW50LmJlZm9yZShzZWxmLmRyYWdFbGVtZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0cGFyZW50LmFwcGVuZChzZWxmLmRyYWdFbGVtZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQuYXBwZW5kVG8ocGFyZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHR9XHJcblx0XHRcdFx0XHQvLyBcdH1cclxuXHRcdFx0XHRcdC8vIH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRcdFx0Ly8gXHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cdFx0XHRcdFx0Ly8gfVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0alF1ZXJ5KFwiI2hpZ2hsaWdodC1ib3hcIikuY3NzKFxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XCJ0b3BcIjogb2Zmc2V0LnRvcCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsVG9wKCksXHJcblx0XHRcdFx0XHRcdFx0XCJsZWZ0XCI6IG9mZnNldC5sZWZ0IC0gc2VsZi5mcmFtZURvYy5zY3JvbGxMZWZ0KCksXHJcblx0XHRcdFx0XHRcdFx0XCJ3aWR0aFwiOiB3aWR0aCxcclxuXHRcdFx0XHRcdFx0XHRcImhlaWdodFwiOiBoZWlnaHQsXHJcblx0XHRcdFx0XHRcdFx0XCJkaXNwbGF5XCI6IGV2ZW50LnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScpID8gXCJub25lXCIgOiBcImJsb2NrXCJcclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0alF1ZXJ5KFwiI2hpZ2hsaWdodC1uYW1lXCIpLmh0bWwoc2VsZi5fZ2V0RWxlbWVudFR5cGUoZXZlbnQudGFyZ2V0KSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0dGhpcy5mcmFtZUJvZHkub24oXCJtb3VzZXVwIHRvdWNoZW5kXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRpZiAoc2VsZi5pc0RyYWdnaW5nKSB7XHJcblx0XHRcdFx0c2VsZi5pc0RyYWdnaW5nID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdGlmIChjb21wb25lbnQuZHJhZ0h0bWwpIC8vaWYgZHJhZ0h0bWwgaXMgc2V0IGZvciBkcmFnZ2luZyB0aGVuIHNldCByZWFsIGNvbXBvbmVudCBodG1sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bmV3RWxlbWVudCA9ICQoY29tcG9uZW50Lmh0bWwpO1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnRWxlbWVudC5yZXBsYWNlV2l0aChuZXdFbGVtZW50KTtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQgPSBuZXdFbGVtZW50O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoY29tcG9uZW50LmFmdGVyRHJvcCkgc2VsZi5kcmFnRWxlbWVudCA9IGNvbXBvbmVudC5hZnRlckRyb3Aoc2VsZi5kcmFnRWxlbWVudCk7XHJcblxyXG5cdFx0XHRcdG5vZGUgPSBzZWxmLmRyYWdFbGVtZW50LmdldCgwKTtcclxuXHRcdFx0XHRzZWxmLnNlbGVjdE5vZGUobm9kZSk7XHJcblx0XHRcdFx0c2VsZi5sb2FkTm9kZUNvbXBvbmVudChub2RlKTtcclxuXHJcblx0XHRcdFx0aWYgKHNlbGYuZHJhZ01vdmVNdXRhdGlvbiA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdFx0XHR0eXBlOiAnY2hpbGRMaXN0JyxcclxuXHRcdFx0XHRcdFx0dGFyZ2V0OiBub2RlLnBhcmVudE5vZGUsXHJcblx0XHRcdFx0XHRcdGFkZGVkTm9kZXM6IFtub2RlXSxcclxuXHRcdFx0XHRcdFx0bmV4dFNpYmxpbmc6IG5vZGUubmV4dFNpYmxpbmdcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdNb3ZlTXV0YXRpb24ubmV3UGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnTW92ZU11dGF0aW9uLm5ld05leHRTaWJsaW5nID0gbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRcdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHNlbGYuZHJhZ01vdmVNdXRhdGlvbik7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdNb3ZlTXV0YXRpb24gPSBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHR0aGlzLmZyYW1lQm9keS5vbihcImRibGNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRyZXBsYWNlT3RoZXJTaG93aW5nQ2FsZW5kYXJJbnB1dHMoZXZlbnQudGFyZ2V0LCBzZWxmLmZyYW1lQm9keSk7XHJcblxyXG5cdFx0XHRzZWxmLnRleHRlZGl0RWwgPSB0YXJnZXQgPSBqUXVlcnkoZXZlbnQudGFyZ2V0KTtcclxuXHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IuZWRpdChzZWxmLnRleHRlZGl0RWwpO1xyXG5cclxuXHRcdFx0c2VsZi50ZXh0ZWRpdEVsLmF0dHIoeyAnY29udGVudGVkaXRhYmxlJzogdHJ1ZSwgJ3NwZWxsY2hlY2trZXInOiBmYWxzZSB9KTtcclxuXHJcblx0XHRcdHNlbGYudGV4dGVkaXRFbC5vbihcImJsdXIga2V5dXAgcGFzdGUgaW5wdXRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmNzcyh7XHJcblx0XHRcdFx0XHRcIndpZHRoXCI6IHNlbGYudGV4dGVkaXRFbC5vdXRlcldpZHRoKCksXHJcblx0XHRcdFx0XHRcImhlaWdodFwiOiBzZWxmLnRleHRlZGl0RWwub3V0ZXJIZWlnaHQoKVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmFkZENsYXNzKFwidGV4dC1lZGl0XCIpLmZpbmQoXCIjc2VsZWN0LWFjdGlvbnNcIikuaGlkZSgpO1xyXG5cdFx0XHRqUXVlcnkoXCIjaGlnaGxpZ2h0LWJveFwiKS5oaWRlKCk7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0dGhpcy5mcmFtZUJvZHkub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0cmVwbGFjZU90aGVyU2hvd2luZ0NhbGVuZGFySW5wdXRzKGV2ZW50LnRhcmdldCwgc2VsZi5mcmFtZUJvZHkpO1xyXG5cclxuXHRcdFx0aWYgKGV2ZW50LnRhcmdldCkge1xyXG5cdFx0XHRcdGNvbnN0IG5vZGUgPSBnZXRQYXJlbnRPclNlbGYoZXZlbnQudGFyZ2V0KTtcclxuXHRcdFx0XHRpZiAoIWlzUHJldmlldyAmJiAhJCgnI2F0dHJpYnV0ZS1zZXR0aW5ncycpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG5cdFx0XHRcdFx0JCgnI2F0dHJpYnV0ZS1zZXR0aW5ncycpXHJcblx0XHRcdFx0XHRcdC5hZGRDbGFzcygnYWN0aXZlJylcclxuXHRcdFx0XHRcdFx0LnNpYmxpbmdzKClcclxuXHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdCQoJyNsZWZ0LXBhbmVsJykuaGlkZSgpO1xyXG5cdFx0XHRcdFx0JCgnI3JpZ2h0LXBhbmVsJykuc2hvdygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzZWxmLnNlbGVjdE5vZGUobm9kZSk7XHJcblx0XHRcdFx0c2VsZi5sb2FkTm9kZUNvbXBvbmVudChub2RlKTtcclxuXHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuZnJhbWVCb2R5LmtleWRvd24oZSA9PiB7XHJcblx0XHRcdGlmIChzZWxmLnNlbGVjdGVkRWwgJiYgc2VsZi5zZWxlY3RlZEVsLnByb3AoJ3RhZ05hbWUnKSAhPSAnQk9EWScpIHtcclxuXHRcdFx0XHRpZiAoZS53aGljaCA9PSAzNyB8fCBlLndoaWNoID09IDM4IHx8IGUud2hpY2ggPT0gMzkgfHwgZS53aGljaCA9PSA0MCkge1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lmcmFtZUlkJykuY29udGVudFdpbmRvdy5hcnJvd0tleU1vdmUoZS53aGljaCwgc2VsZi5zZWxlY3RlZEVsKTtcclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCB0aGUgZGVmYXVsdCBhY3Rpb24gKHNjcm9sbCAvIG1vdmUgY2FyZXQpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI2RyYWctYm94XCIpLm9uKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQgPSBzZWxmLnNlbGVjdGVkRWw7XHJcblx0XHRcdHNlbGYuaXNEcmFnZ2luZyA9IHRydWU7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5kcmFnRWxlbWVudC5nZXQoMCk7XHJcblxyXG5cclxuXHRcdFx0c2VsZi5kcmFnTW92ZU11dGF0aW9uID0ge1xyXG5cdFx0XHRcdHR5cGU6ICdtb3ZlJyxcclxuXHRcdFx0XHR0YXJnZXQ6IG5vZGUsXHJcblx0XHRcdFx0b2xkUGFyZW50OiBub2RlLnBhcmVudE5vZGUsXHJcblx0XHRcdFx0b2xkTmV4dFNpYmxpbmc6IG5vZGUubmV4dFNpYmxpbmdcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vc2VsZi5zZWxlY3ROb2RlKGZhbHNlKTtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNkb3duLWJveFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5zZWxlY3RlZEVsLmdldCgwKTtcclxuXHRcdFx0b2xkUGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRvbGROZXh0U2libGluZyA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0XHRuZXh0ID0gc2VsZi5zZWxlY3RlZEVsLm5leHQoKTtcclxuXHJcblx0XHRcdGlmIChuZXh0Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRuZXh0LmFmdGVyKHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c2VsZi5zZWxlY3RlZEVsLnBhcmVudCgpLmFmdGVyKHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG5ld1BhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0bmV3TmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0dHlwZTogJ21vdmUnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZSxcclxuXHRcdFx0XHRvbGRQYXJlbnQ6IG9sZFBhcmVudCxcclxuXHRcdFx0XHRuZXdQYXJlbnQ6IG5ld1BhcmVudCxcclxuXHRcdFx0XHRvbGROZXh0U2libGluZzogb2xkTmV4dFNpYmxpbmcsXHJcblx0XHRcdFx0bmV3TmV4dFNpYmxpbmc6IG5ld05leHRTaWJsaW5nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiN1cC1ib3hcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cclxuXHRcdFx0bm9kZSA9IHNlbGYuc2VsZWN0ZWRFbC5nZXQoMCk7XHJcblx0XHRcdG9sZFBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0b2xkTmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0bmV4dCA9IHNlbGYuc2VsZWN0ZWRFbC5wcmV2KCk7XHJcblxyXG5cdFx0XHRpZiAobmV4dC5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0bmV4dC5iZWZvcmUoc2VsZi5zZWxlY3RlZEVsKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzZWxmLnNlbGVjdGVkRWwucGFyZW50KCkuYmVmb3JlKHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG5ld1BhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0bmV3TmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0dHlwZTogJ21vdmUnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZSxcclxuXHRcdFx0XHRvbGRQYXJlbnQ6IG9sZFBhcmVudCxcclxuXHRcdFx0XHRuZXdQYXJlbnQ6IG5ld1BhcmVudCxcclxuXHRcdFx0XHRvbGROZXh0U2libGluZzogb2xkTmV4dFNpYmxpbmcsXHJcblx0XHRcdFx0bmV3TmV4dFNpYmxpbmc6IG5ld05leHRTaWJsaW5nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNjbG9uZS1ib3hcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0Y2xvbmUgPSBzZWxmLnNlbGVjdGVkRWwuY2xvbmUoKTtcclxuXHJcblx0XHRcdHNlbGYuc2VsZWN0ZWRFbC5hZnRlcihjbG9uZSk7XHJcblxyXG5cdFx0XHRzZWxmLnNlbGVjdGVkRWwgPSBjbG9uZS5jbGljaygpO1xyXG5cclxuXHRcdFx0bm9kZSA9IGNsb25lLmdldCgwKTtcclxuXHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0dHlwZTogJ2NoaWxkTGlzdCcsXHJcblx0XHRcdFx0dGFyZ2V0OiBub2RlLnBhcmVudE5vZGUsXHJcblx0XHRcdFx0YWRkZWROb2RlczogW25vZGVdLFxyXG5cdFx0XHRcdG5leHRTaWJsaW5nOiBub2RlLm5leHRTaWJsaW5nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNwYXJlbnQtYm94XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5zZWxlY3RlZEVsLnBhcmVudCgpLmdldCgwKTtcclxuXHJcblx0XHRcdHNlbGYuc2VsZWN0Tm9kZShub2RlKTtcclxuXHRcdFx0c2VsZi5sb2FkTm9kZUNvbXBvbmVudChub2RlKTtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjZGVsZXRlLWJveFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5zZWxlY3RlZEVsLmdldCgwKTtcclxuXHJcblx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdHR5cGU6ICdjaGlsZExpc3QnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZS5wYXJlbnROb2RlLFxyXG5cdFx0XHRcdHJlbW92ZWROb2RlczogW25vZGVdLFxyXG5cdFx0XHRcdG5leHRTaWJsaW5nOiBub2RlLm5leHRTaWJsaW5nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0c2VsZi5zZWxlY3RlZEVsLnJlbW92ZSgpO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0alF1ZXJ5KHdpbmRvdy5GcmFtZVdpbmRvdykub24oXCJzY3JvbGwgcmVzaXplXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuXHRcdFx0aWYgKHNlbGYuc2VsZWN0ZWRFbCkge1xyXG5cdFx0XHRcdG9mZnNldCA9IHNlbGYuc2VsZWN0ZWRFbC5vZmZzZXQoKTtcclxuXHJcblx0XHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuY3NzKFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcInRvcFwiOiBvZmZzZXQudG9wIC0gc2VsZi5mcmFtZURvYy5zY3JvbGxUb3AoKSxcclxuXHRcdFx0XHRcdFx0XCJsZWZ0XCI6IG9mZnNldC5sZWZ0IC0gc2VsZi5mcmFtZURvYy5zY3JvbGxMZWZ0KCksXHJcblx0XHRcdFx0XHRcdFwid2lkdGhcIjogc2VsZi5zZWxlY3RlZEVsLm91dGVyV2lkdGgoKSxcclxuXHRcdFx0XHRcdFx0XCJoZWlnaHRcIjogc2VsZi5zZWxlY3RlZEVsLm91dGVySGVpZ2h0KCksXHJcblx0XHRcdFx0XHRcdC8vXCJkaXNwbGF5XCI6IFwiYmxvY2tcIlxyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoc2VsZi5oaWdobGlnaHRFbCkge1xyXG5cdFx0XHRcdG9mZnNldCA9IHNlbGYuaGlnaGxpZ2h0RWwub2Zmc2V0KCk7XHJcblxyXG5cdFx0XHRcdGpRdWVyeShcIiNoaWdobGlnaHQtYm94XCIpLmNzcyhcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJ0b3BcIjogb2Zmc2V0LnRvcCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsVG9wKCksXHJcblx0XHRcdFx0XHRcdFwibGVmdFwiOiBvZmZzZXQubGVmdCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsTGVmdCgpLFxyXG5cdFx0XHRcdFx0XHRcIndpZHRoXCI6IHNlbGYuaGlnaGxpZ2h0RWwub3V0ZXJXaWR0aCgpLFxyXG5cdFx0XHRcdFx0XHRcImhlaWdodFwiOiBzZWxmLmhpZ2hsaWdodEVsLm91dGVySGVpZ2h0KCksXHJcblx0XHRcdFx0XHRcdC8vXCJkaXNwbGF5XCI6IFwiYmxvY2tcIlxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHR9LFxyXG5cclxuXHQvKiBkcmFnIGFuZCBkcm9wICovXHJcblx0X2luaXREcmFnZHJvcDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHNlbGYuaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cdFx0Y29tcG9uZW50ID0ge307XHJcblx0XHQkKCcjY29tcG9uZW50cyB1bCA+IGxpID4gb2wgPiBsaScpLm9uKFwibW91c2Vkb3duIHRvdWNoc3RhcnRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdCR0aGlzID0galF1ZXJ5KHRoaXMpO1xyXG5cclxuXHRcdFx0Ly8gJChcIiNjb21wb25lbnQtY2xvbmVcIikucmVtb3ZlKCk7XHJcblx0XHRcdGNvbXBvbmVudCA9IFZ2dmViLkNvbXBvbmVudHMuZ2V0KCR0aGlzLmRhdGEoXCJ0eXBlXCIpKTtcclxuXHJcblx0XHRcdGlmIChjb21wb25lbnQuZHJhZ0h0bWwpIHtcclxuXHRcdFx0XHRodG1sID0gY29tcG9uZW50LmRyYWdIdG1sO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGh0bWwgPSBjb21wb25lbnQuaHRtbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VsZi5kcmFnRWxlbWVudCA9ICQoaHRtbCk7XHJcblxyXG5cdFx0XHRpZiAoY29tcG9uZW50LmRyYWdTdGFydCkgc2VsZi5kcmFnRWxlbWVudCA9IGNvbXBvbmVudC5kcmFnU3RhcnQoc2VsZi5kcmFnRWxlbWVudCk7XHJcblxyXG5cdFx0XHRzZWxmLmlzRHJhZ2dpbmcgPSB0cnVlO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdCQoJ2JvZHknKS5vbignbW91c2V1cCB0b3VjaGVuZCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRpZiAoc2VsZi5pc0RyYWdnaW5nID09IHRydWUpIHtcclxuXHRcdFx0XHRzZWxmLmlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHRcdFx0XHQvLyAkKFwiI2NvbXBvbmVudC1jbG9uZVwiKS5yZW1vdmUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnYm9keScpLm9uKCdtb3VzZW1vdmUgdG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGlmIChzZWxmLmlzRHJhZ2dpbmcgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdGVsZW1lbnRNb3VzZUlzT3ZlciA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCAtIDYwLCBldmVudC5jbGllbnRZIC0gNDApO1xyXG5cdFx0XHRcdC8vaWYgZHJhZyBlbGVtZW50cyBob3ZlcnMgb3ZlciBpZnJhbWUgc3dpdGNoIHRvIGlmcmFtZSBtb3VzZW92ZXIgaGFuZGxlclx0XHJcblx0XHRcdFx0aWYgKGVsZW1lbnRNb3VzZUlzT3ZlciAmJiBlbGVtZW50TW91c2VJc092ZXIudGFnTmFtZSA9PSAnSUZSQU1FJykge1xyXG5cdFx0XHRcdFx0c2VsZi5mcmFtZUJvZHkudHJpZ2dlcihcIm1vdXNlbW92ZVwiLCBldmVudCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdHNlbGYuc2VsZWN0Tm9kZShmYWxzZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcjY29tcG9uZW50cyB1bCA+IG9sID4gbGkgPiBsaScpLm9uKFwibW91c2V1cCB0b3VjaGVuZFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0c2VsZi5pc0RyYWdnaW5nID0gZmFsc2U7XHJcblx0XHRcdC8vICQoXCIjY29tcG9uZW50LWNsb25lXCIpLnJlbW92ZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdGdldEJlYXV0aWZpZWRIdG1sKCkge1xyXG5cdFx0LypcclxuXHRcdC1JLCAtLWluZGVudC1pbm5lci1odG1sICAgICAgICAgICAgSW5kZW50IDxoZWFkPiBhbmQgPGJvZHk+IHNlY3Rpb25zLiBEZWZhdWx0IGlzIGZhbHNlLlxyXG5cdFx0LVUsIC0tdW5mb3JtYXR0ZWQgICAgICAgICAgICAgICAgICBMaXN0IG9mIHRhZ3MgKGRlZmF1bHRzIHRvIGlubGluZSkgdGhhdCBzaG91bGQgbm90IGJlIHJlZm9ybWF0dGVkXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgdXNlIGVtcHR5IGFycmF5IHRvIGRlbm90ZSB0aGF0IG5vIHRhZ3Mgc2hvdWxkIG5vdCBiZSByZWZvcm1hdHRlZFxyXG5cdFx0ICovXHJcblxyXG5cdFx0Y29uc3QgeyBkb2N0eXBlLCBodG1sIH0gPSB0aGlzLmdldEh0bWwoKTtcclxuXHRcdHJldHVybiBodG1sX2JlYXV0aWZ5KGAke2RvY3R5cGV9XHJcblx0XHRcdFx0XHRcdFx0ICAke2h0bWxHZW5lcmF0b3IoaHRtbCwgcmVtb3ZlVW51c2VkVGFncywgZW1wdHlDaGlsZHJlbixcclxuXHRcdFx0XHRnZW5lcmF0ZVRhYmxlU2NyaXB0LCBnZW5lcmF0ZUNhbGVuZGFyT25jbGlja0F0dHIsIGdlbmVyYXRlU2VsZWN0T3B0aW9uc1NjcmlwdCxcclxuXHRcdFx0XHRnZW5lcmF0ZVN1Ym1pdEZvcm1TY3JpcHQsIGdlbmVyYXRlQnV0dG9uT25jbGlja0F0dHIpfWAsXHJcblx0XHRcdHtcclxuXHRcdFx0XHRwcmVzZXJ2ZV9uZXdsaW5lczogZmFsc2UsXHJcblx0XHRcdFx0aW5kZW50X2lubmVyX2h0bWw6IHRydWUsXHJcblx0XHRcdFx0dW5mb3JtYXR0ZWQ6IFtdXHJcblx0XHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdGdldEh0bWw6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGRvYyA9IHdpbmRvdy5GcmFtZURvY3VtZW50O1xyXG5cdFx0Y29uc3QgZG9jdHlwZSA9IFwiPCFET0NUWVBFIFwiXHJcblx0XHRcdCsgZG9jLmRvY3R5cGUubmFtZVxyXG5cdFx0XHQrIChkb2MuZG9jdHlwZS5wdWJsaWNJZCA/ICcgUFVCTElDIFwiJyArIGRvYy5kb2N0eXBlLnB1YmxpY0lkICsgJ1wiJyA6ICcnKVxyXG5cdFx0XHQrICghZG9jLmRvY3R5cGUucHVibGljSWQgJiYgZG9jLmRvY3R5cGUuc3lzdGVtSWQgPyAnIFNZU1RFTScgOiAnJylcclxuXHRcdFx0KyAoZG9jLmRvY3R5cGUuc3lzdGVtSWQgPyAnIFwiJyArIGRvYy5kb2N0eXBlLnN5c3RlbUlkICsgJ1wiJyA6ICcnKVxyXG5cdFx0XHQrIFwiPlxcblwiO1xyXG5cdFx0Y29uc3QgaHRtbCA9IGAke2RvY3R5cGV9XHJcblx0XHRcdFx0XHQgIDxodG1sPlxyXG5cdFx0XHRcdFx0XHQgICR7ZG9jLmRvY3VtZW50RWxlbWVudC5pbm5lckhUTUx9XHJcblx0XHRcdFx0XHQgIDwvaHRtbD5gO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZG9jdHlwZSxcclxuXHRcdFx0aHRtbFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHRzZXRIdG1sOiBmdW5jdGlvbiAoaHRtbCkge1xyXG5cdFx0Ly91cGRhdGUgb25seSBib2R5IHRvIGF2b2lkIGJyZWFraW5nIGlmcmFtZSBjc3MvanMgcmVsYXRpdmUgcGF0aHNcclxuXHRcdHN0YXJ0ID0gaHRtbC5pbmRleE9mKFwiPGJvZHlcIik7XHJcblx0XHRlbmQgPSBodG1sLmluZGV4T2YoXCI8L2JvZHlcIik7XHJcblxyXG5cdFx0aWYgKHN0YXJ0ID49IDAgJiYgZW5kID49IDApIHtcclxuXHRcdFx0Ym9keSA9IGh0bWwuc2xpY2UoaHRtbC5pbmRleE9mKFwiPlwiLCBzdGFydCkgKyAxLCBlbmQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ym9keSA9IGh0bWxcclxuXHRcdH1cclxuXHJcblx0XHQvL3NlbGYuZnJhbWVCb2R5Lmh0bWwoYm9keSk7XHJcblx0XHR3aW5kb3cuRnJhbWVEb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGJvZHk7XHJcblxyXG5cdFx0Ly9iZWxvdyBtZXRob2RzIGJyYWtlIGRvY3VtZW50IHJlbGF0aXZlIGNzcyBhbmQganMgcGF0aHNcclxuXHRcdC8vcmV0dXJuIHNlbGYuaWZyYW1lLm91dGVySFRNTCA9IGh0bWw7XHJcblx0XHQvL3JldHVybiBzZWxmLmRvY3VtZW50RnJhbWUuaHRtbChodG1sKTtcclxuXHRcdC8vcmV0dXJuIHNlbGYuZG9jdW1lbnRGcmFtZS5hdHRyKFwic3JjZG9jXCIsIGh0bWwpO1xyXG5cdH1cclxufTtcclxuXHJcblZ2dmViLkNvZGVFZGl0b3IgPSB7XHJcblxyXG5cdGlzQWN0aXZlOiBmYWxzZSxcclxuXHRvbGRWYWx1ZTogJycsXHJcblx0ZG9jOiBmYWxzZSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRvYykge1xyXG5cdFx0JChcIiN2dnZlYi1jb2RlLWVkaXRvciB0ZXh0YXJlYVwiKS52YWwoVnZ2ZWIuQnVpbGRlci5nZXRCZWF1dGlmaWVkSHRtbCgpKTtcclxuXHJcblx0XHQkKFwiI3Z2dmViLWNvZGUtZWRpdG9yIHRleHRhcmVhXCIpLmtleXVwKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0ZGVsYXkoVnZ2ZWIuQnVpbGRlci5zZXRIdG1sKHRoaXMudmFsdWUpLCAxMDAwKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vbG9hZCBjb2RlIG9uIGRvY3VtZW50IGNoYW5nZXNcclxuXHRcdFZ2dmViLkJ1aWxkZXIuZnJhbWVCb2R5Lm9uKFwidnZ2ZWIudW5kby5hZGQgdnZ2ZWIudW5kby5yZXN0b3JlXCIsIGZ1bmN0aW9uIChlKSB7IFZ2dmViLkNvZGVFZGl0b3Iuc2V0VmFsdWUoKTsgfSk7XHJcblx0XHQvL2xvYWQgY29kZSB3aGVuIGEgbmV3IHVybCBpcyBsb2FkZWRcclxuXHRcdFZ2dmViLkJ1aWxkZXIuZG9jdW1lbnRGcmFtZS5vbihcImxvYWRcIiwgZnVuY3Rpb24gKGUpIHsgVnZ2ZWIuQ29kZUVkaXRvci5zZXRWYWx1ZSgpOyB9KTtcclxuXHJcblx0XHR0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcclxuXHR9LFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRpZiAodGhpcy5pc0FjdGl2ZSkge1xyXG5cdFx0XHQkKFwiI3Z2dmViLWNvZGUtZWRpdG9yIHRleHRhcmVhXCIpLnZhbChWdnZlYi5CdWlsZGVyLmdldEJlYXV0aWZpZWRIdG1sKCkpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGRlc3Ryb3k6IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHQvL3RoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHR0b2dnbGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLmlzQWN0aXZlICE9IHRydWUpIHtcclxuXHRcdFx0dGhpcy5pc0FjdGl2ZSA9IHRydWU7XHJcblx0XHRcdHJldHVybiB0aGlzLmluaXQoKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHRcdHRoaXMuZGVzdHJveSgpO1xyXG5cdH1cclxufVxyXG5cclxubGV0IHNob3duUGFuZWwsIGhpZGRlblBhbmVsLCBpc1ByZXZpZXc7XHJcblxyXG5WdnZlYi5HdWkgPSB7XHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoXCJbZGF0YS12dnZlYi1hY3Rpb25dXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRvbiA9IFwiY2xpY2tcIjtcclxuXHRcdFx0aWYgKHRoaXMuZGF0YXNldC52dnZlYk9uKSBvbiA9IHRoaXMuZGF0YXNldC52dnZlYk9uO1xyXG5cclxuXHRcdFx0JCh0aGlzKS5vbihvbiwgVnZ2ZWIuR3VpW3RoaXMuZGF0YXNldC52dnZlYkFjdGlvbl0pO1xyXG5cdFx0XHRpZiAodGhpcy5kYXRhc2V0LnZ2dmViU2hvcnRjdXQpIHtcclxuXHRcdFx0XHQkKGRvY3VtZW50KS5iaW5kKCdrZXlkb3duJywgdGhpcy5kYXRhc2V0LnZ2dmViU2hvcnRjdXQsIFZ2dmViLkd1aVt0aGlzLmRhdGFzZXQudnZ2ZWJBY3Rpb25dKTtcclxuXHRcdFx0XHQkKHdpbmRvdy5GcmFtZURvY3VtZW50LCB3aW5kb3cuRnJhbWVXaW5kb3cpLmJpbmQoJ2tleWRvd24nLCB0aGlzLmRhdGFzZXQudnZ2ZWJTaG9ydGN1dCwgVnZ2ZWIuR3VpW3RoaXMuZGF0YXNldC52dnZlYkFjdGlvbl0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHR1bmRvOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoVnZ2ZWIuV3lzaXd5Z0VkaXRvci5pc0FjdGl2ZSkge1xyXG5cdFx0XHRWdnZlYi5XeXNpd3lnRWRpdG9yLnVuZG8oKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdFZ2dmViLlVuZG8udW5kbygpO1xyXG5cdFx0fVxyXG5cdFx0VnZ2ZWIuQnVpbGRlci5zZWxlY3ROb2RlKCk7XHJcblx0fSxcclxuXHJcblx0cmVkbzogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKFZ2dmViLld5c2l3eWdFZGl0b3IuaXNBY3RpdmUpIHtcclxuXHRcdFx0VnZ2ZWIuV3lzaXd5Z0VkaXRvci5yZWRvKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRWdnZlYi5VbmRvLnJlZG8oKTtcclxuXHRcdH1cclxuXHRcdFZ2dmViLkJ1aWxkZXIuc2VsZWN0Tm9kZSgpO1xyXG5cdH0sXHJcblxyXG5cdGNoZWNrOiBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKCcjdGV4dGFyZWEtbW9kYWwgdGV4dGFyZWEnKS52YWwoVnZ2ZWIuQnVpbGRlci5nZXRCZWF1dGlmaWVkSHRtbCgpKTtcclxuXHRcdCQoJyN0ZXh0YXJlYS1tb2RhbCcpLm1vZGFsKCk7XHJcblx0fSxcclxuXHJcblx0dmlld3BvcnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoXCIjY2FudmFzXCIpLmF0dHIoXCJjbGFzc1wiLCB0aGlzLmRhdGFzZXQudmlldyk7XHJcblx0fSxcclxuXHJcblx0dG9nZ2xlRWRpdG9yOiBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKFwiI3Z2dmViLWJ1aWxkZXJcIikudG9nZ2xlQ2xhc3MoXCJib3R0b20tcGFuZWwtZXhwYW5kXCIpO1xyXG5cdFx0VnZ2ZWIuQ29kZUVkaXRvci50b2dnbGUoKTtcclxuXHR9LFxyXG5cclxuXHRkb3dubG9hZCgpIHtcclxuXHRcdGRvd25sb2FkQXNUZXh0RmlsZSgnaW5kZXgnLCBWdnZlYi5CdWlsZGVyLmdldEJlYXV0aWZpZWRIdG1sKCkpO1xyXG5cdH0sXHJcblxyXG5cdHByZXZpZXc6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICgkKCcjbGVmdC1wYW5lbCcpLmlzKCc6dmlzaWJsZScpKSB7XHJcblx0XHRcdHNob3duUGFuZWwgPSAnbGVmdC1wYW5lbCc7XHJcblx0XHRcdGhpZGRlblBhbmVsID0gJ3JpZ2h0LXBhbmVsJztcclxuXHRcdFx0JCgnI2xlZnQtcGFuZWwsICNyaWdodC1wYW5lbCcpLmhpZGUoKTtcclxuXHRcdFx0aXNQcmV2aWV3ID0gdHJ1ZTtcclxuXHRcdH0gZWxzZSBpZiAoJCgnI3JpZ2h0LXBhbmVsJykuaXMoJzp2aXNpYmxlJykpIHtcclxuXHRcdFx0c2hvd25QYW5lbCA9ICdyaWdodC1wYW5lbCc7XHJcblx0XHRcdGhpZGRlblBhbmVsID0gJ2xlZnQtcGFuZWwnO1xyXG5cdFx0XHQkKCcjbGVmdC1wYW5lbCwgI3JpZ2h0LXBhbmVsJykuaGlkZSgpO1xyXG5cdFx0XHRpc1ByZXZpZXcgPSB0cnVlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aXNQcmV2aWV3ID0gZmFsc2U7XHJcblx0XHRcdCQoYCMke3Nob3duUGFuZWx9YCkuc2hvdygpO1xyXG5cdFx0XHQkKGAjJHtoaWRkZW5QYW5lbH1gKS5oaWRlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0JCgnI21lbnUtcGFuZWwnKS50b2dnbGUoKTtcclxuXHRcdCQoXCIjaWZyYW1lLWxheWVyXCIpLnRvZ2dsZSgpO1xyXG5cdFx0JChcIiN2dnZlYi1idWlsZGVyXCIpLnRvZ2dsZUNsYXNzKFwicHJldmlld1wiKTtcclxuXHR9LFxyXG5cclxuXHRmdWxsc2NyZWVuOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRsYXVuY2hGdWxsU2NyZWVuKGRvY3VtZW50KTsgLy8gdGhlIHdob2xlIHBhZ2VcclxuXHR9LFxyXG5cclxuXHRjb21wb25lbnRTZWFyY2g6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHNlYXJjaFRleHQgPSB0aGlzLnZhbHVlO1xyXG5cclxuXHRcdCQoXCIjY29tcG9uZW50cy1saXN0IGxpIG9sIGxpXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQkdGhpcyA9ICQodGhpcyk7XHJcblxyXG5cdFx0XHQkdGhpcy5oaWRlKCk7XHJcblx0XHRcdGlmICgkdGhpcy5kYXRhKFwic2VhcmNoXCIpLmluZGV4T2Yoc2VhcmNoVGV4dCkgPiAtMSkgJHRoaXMuc2hvdygpO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0Y2xlYXJDb21wb25lbnRTZWFyY2g6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoXCIjY29tcG9uZW50LXNlYXJjaFwiKS52YWwoXCJcIikua2V5dXAoKTtcclxuXHR9XHJcbn1cclxuXHJcblZ2dmViLkZpbGVNYW5hZ2VyID0ge1xyXG5cdHRyZWU6IGZhbHNlLFxyXG5cdHBhZ2VzOiB7fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy50cmVlID0gJChcIiNmaWxlbWFuYWdlciAudHJlZSA+IG9sXCIpLmh0bWwoXCJcIik7XHJcblxyXG5cdFx0JCh0aGlzLnRyZWUpLm9uKFwiY2xpY2tcIiwgXCJsaVtkYXRhLXBhZ2VdIHNwYW5cIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBgIyR7JCh0aGlzKS5wYXJlbnRzKCdsaScpLmRhdGEoJ3BhZ2UnKX1gO1xyXG5cdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcblx0XHRcdC8vIFZ2dmViLkZpbGVNYW5hZ2VyLmxvYWRQYWdlKCQodGhpcykucGFyZW50cyhcImxpXCIpLmRhdGEoXCJwYWdlXCIpKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSlcclxuXHR9LFxyXG5cclxuXHRnZXRQYWdlKG5hbWUpIHtcclxuXHRcdHJldHVybiB0aGlzLnBhZ2VzW25hbWVdO1xyXG5cdH0sXHJcblxyXG5cdGFkZFBhZ2U6IGZ1bmN0aW9uIChuYW1lLCB0aXRsZSwgdXJsKSB7XHJcblxyXG5cdFx0dGhpcy5wYWdlc1tuYW1lXSA9IHtcclxuXHRcdFx0bmFtZSxcclxuXHRcdFx0dGl0bGUsXHJcblx0XHRcdHVybFxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLnRyZWUuYXBwZW5kKFxyXG5cdFx0XHR0bXBsKFwidnZ2ZWItZmlsZW1hbmFnZXItcGFnZVwiLCB7IG5hbWUsIHRpdGxlLCB1cmwgfSkpO1xyXG5cdH0sXHJcblxyXG5cdGFkZFBhZ2VzOiBmdW5jdGlvbiAocGFnZXMpIHtcclxuXHRcdGZvciAocGFnZSBpbiBwYWdlcykge1xyXG5cdFx0XHR0aGlzLmFkZFBhZ2UocGFnZXNbcGFnZV1bJ25hbWUnXSwgcGFnZXNbcGFnZV1bJ3RpdGxlJ10sIHBhZ2VzW3BhZ2VdWyd1cmwnXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0YWRkQ29tcG9uZW50OiBmdW5jdGlvbiAobmFtZSwgdXJsLCB0aXRsZSwgcGFnZSkge1xyXG5cdFx0JChcIltkYXRhLXBhZ2U9J1wiICsgcGFnZSArIFwiJ10gPiBvbFwiLCB0aGlzLnRyZWUpLmFwcGVuZChcclxuXHRcdFx0dG1wbChcInZ2dmViLWZpbGVtYW5hZ2VyLWNvbXBvbmVudFwiLCB7IG5hbWUsIHVybCwgdGl0bGUgfSkpO1xyXG5cdH0sXHJcblxyXG5cdHNob3dBY3RpdmUobmFtZSkge1xyXG5cdFx0JChcIltkYXRhLXBhZ2VdXCIsIHRoaXMudHJlZSkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHQkKFwiW2RhdGEtcGFnZT0nXCIgKyBuYW1lICsgXCInXVwiLCB0aGlzLnRyZWUpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdH0sXHJcblxyXG5cdGxvYWRQYWdlOiBmdW5jdGlvbiAobmFtZSkge1xyXG5cdFx0JChcIltkYXRhLXBhZ2VdXCIsIHRoaXMudHJlZSkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHQkKFwiW2RhdGEtcGFnZT0nXCIgKyBuYW1lICsgXCInXVwiLCB0aGlzLnRyZWUpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cclxuXHRcdFZ2dmViLkJ1aWxkZXIubG9hZFVybCh0aGlzLnBhZ2VzW25hbWVdWyd1cmwnXSk7XHJcblx0fSxcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ2dmViOyIsImltcG9ydCB1bnVzZWRUYWdzIGZyb20gJy4vdW51c2VkVGFncyc7XHJcbmltcG9ydCB7IGVtcHR5Q2hpbGRyZW5TZWxlY3RvcnMsIHRhYmxlU2VsZWN0b3IsIHN1Ym1pdEJ1dHRvblNlbGVjdG9yIH0gZnJvbSAnLi9zZWxlY3RvcnMnO1xyXG5pbXBvcnQgdGFibGVUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvdGFibGUnO1xyXG5pbXBvcnQgYXV0b3NlbGVjdGlucHV0VGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL2F1dG9zZWxlY3RpbnB1dCc7XHJcbmltcG9ydCB7IHRlbXBsYXRlIGFzIHN1Ym1pdEZvcm1UZW1wbGF0ZSB9IGZyb20gJy4uL3RlbXBsYXRlcy9zdWJtaXRmb3JtJztcclxuaW1wb3J0IHRhYmxlIGZyb20gJy4uL2NvbXBvbmVudHMvQG9lZS90YWJsZSc7XHJcbmltcG9ydCB7IGNhbGVuZGFyU2VsZWN0b3IsIHNldE9uY2xpY2tBdHRyIGFzIHNldENhbGVuZGFyT25jbGlja0F0dHIgfSBmcm9tICcuL2NhbGVuZGFyJztcclxuaW1wb3J0IHsgc2V0T25jbGlja0F0dHIgYXMgc2V0QnV0dG9uT25jbGlja0F0dHIgfSBmcm9tICcuL3N1Ym1pdGJ1dHRvbic7XHJcbmltcG9ydCAkIGZyb20gJy4uLy4uL2pzL2pxdWVyeS5taW4nO1xyXG5cclxuY29uc3QgYWx3YXlzVHJ1ZSA9ICgpID0+IHRydWU7XHJcblxyXG4vLyB0aGlzIHJlZmVycyB0byBodG1sIGVsZW1lbnRcclxuZnVuY3Rpb24gcmVtb3ZlVGFnKHsgbmFtZSwgZmlsdGVyID0gYWx3YXlzVHJ1ZSB9KSB7XHJcbiAgICBBcnJheS5mcm9tKHRoaXMuZ2V0RWxlbWVudHNCeVRhZ05hbWUobmFtZSkpXHJcbiAgICAgICAgLmZpbHRlcihmaWx0ZXIpXHJcbiAgICAgICAgLmZvckVhY2godGFnID0+IHRhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhZykpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVVbnVzZWRUYWdzKGVsKSB7XHJcbiAgICB1bnVzZWRUYWdzLmZvckVhY2gocmVtb3ZlVGFnLCBlbCk7XHJcbiAgICByZXR1cm4gZWw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVtcHR5Q2hpbGRyZW4oZWwpIHtcclxuICAgICQoZWwpLmZpbmQoZW1wdHlDaGlsZHJlblNlbGVjdG9ycy5qb2luKCcsICcpKS5lbXB0eSgpO1xyXG4gICAgcmV0dXJuIGVsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRTY3JpcHQoZWwsIGpzU3RyKSB7XHJcbiAgICBqc1N0ciAmJiAkKCc8c2NyaXB0Pjwvc2NyaXB0PicpLnRleHQoanNTdHIpLmFwcGVuZFRvKCQoZWwpLmZpbmQoJ2JvZHknKSk7XHJcbiAgICByZXR1cm4gZWw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlVGFibGVTY3JpcHQoZWwpIHtcclxuICAgIGNvbnN0IGpzU3RyID0gQXJyYXkuZnJvbSgkKGVsKS5maW5kKHRhYmxlU2VsZWN0b3IpKS5yZWR1Y2UoKHByZXYsIGVsZW1lbnQpID0+IHtcclxuICAgICAgICByZXR1cm4gYCR7cHJldn1cclxuICAgICAgICAgICAgICAgICR7dGFibGVUZW1wbGF0ZSgkKGVsZW1lbnQpLCB0YWJsZSl9YDtcclxuICAgIH0sICcnKTtcclxuICAgIHJldHVybiBhcHBlbmRTY3JpcHQoZWwsIGpzU3RyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVDYWxlbmRhck9uY2xpY2tBdHRyKGVsKSB7XHJcbiAgICAkKGVsKS5maW5kKGNhbGVuZGFyU2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuYXR0cignb25jbGljaycpIHx8IHNldENhbGVuZGFyT25jbGlja0F0dHIodGhpcyk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBlbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVTZWxlY3RPcHRpb25zU2NyaXB0KGVsKSB7XHJcbiAgICByZXR1cm4gYXBwZW5kU2NyaXB0KGVsLCBhdXRvc2VsZWN0aW5wdXRUZW1wbGF0ZSgpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVTdWJtaXRGb3JtU2NyaXB0KGVsKSB7XHJcbiAgICByZXR1cm4gYXBwZW5kU2NyaXB0KGVsLCBzdWJtaXRGb3JtVGVtcGxhdGUoKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlQnV0dG9uT25jbGlja0F0dHIoZWwpIHtcclxuICAgICQoZWwpLmZpbmQoc3VibWl0QnV0dG9uU2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuYXR0cignb25jbGljaycpIHx8IHNldEJ1dHRvbk9uY2xpY2tBdHRyKHRoaXMpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZWw7XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICByZW1vdmVVbnVzZWRUYWdzLCBlbXB0eUNoaWxkcmVuLCBnZW5lcmF0ZVRhYmxlU2NyaXB0LCBnZW5lcmF0ZUNhbGVuZGFyT25jbGlja0F0dHIsXHJcbiAgICBnZW5lcmF0ZVNlbGVjdE9wdGlvbnNTY3JpcHQsIGdlbmVyYXRlU3VibWl0Rm9ybVNjcmlwdCwgZ2VuZXJhdGVCdXR0b25PbmNsaWNrQXR0clxyXG59OyIsImltcG9ydCAkIGZyb20gJy4uLy4uL2pzL2pxdWVyeS5taW4nO1xyXG5cclxuY29uc3QgdW51c2VkVGFncyA9IFtcclxuXHR7XHJcblx0XHRuYW1lOiAnc2NyaXB0JyxcclxuXHRcdGZpbHRlcjogdGFnID0+IHRhZy5nZXRBdHRyaWJ1dGUoJ3NyYycpXHJcblx0XHRcdCYmIHRhZy5nZXRBdHRyaWJ1dGUoJ3NyYycpLmluY2x1ZGVzKCdpZnJhbWUtZHJhZy1uLWRyb3AnKVxyXG5cdH0sXHJcblx0e1xyXG5cdFx0bmFtZTogJ2xpbmsnLFxyXG5cdFx0ZmlsdGVyOiB0YWcgPT4gdGFnLmdldEF0dHJpYnV0ZSgncmVsJykgPT0gJ3N0eWxlc2hlZXQnXHJcblx0XHRcdCYmICh0YWcuZ2V0QXR0cmlidXRlKCdocmVmJykuaW5jbHVkZXMoJ2RyYWctbi1kcm9wLmNzcycpXHJcblx0XHRcdFx0fHwgdGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpLmluY2x1ZGVzKCcvZGF0ZXBpY2tlci9za2luL1dkYXRlUGlja2VyLmNzcycpXHJcblx0XHRcdHx8IHRhZy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5pbmNsdWRlcygnL2xheWVyL3NraW4vbGF5ZXIuY3NzJykpXHJcblx0fSxcclxuXHR7XHJcblx0XHRuYW1lOiAnaHInLFxyXG5cdFx0ZmlsdGVyOiB0YWcgPT4gJCh0YWcpLmhhc0NsYXNzKCdob3Jpem9udGFsLWxpbmUnKVxyXG5cdFx0XHR8fCAkKHRhZykuaGFzQ2xhc3MoJ3ZlcnRpY2FsLWxpbmUnKVxyXG5cdH1cclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVudXNlZFRhZ3M7IiwiaW1wb3J0IHsgZnVuY3Rpb25OYW1lIH0gZnJvbSAnLi4vdGVtcGxhdGVzL3N1Ym1pdGZvcm0nO1xyXG5pbXBvcnQgJCBmcm9tICcuLi8uLi9qcy9qcXVlcnkubWluJztcclxuXHJcbmZ1bmN0aW9uIHNldE9uY2xpY2tBdHRyKG5vZGUpIHtcclxuICAgIHJldHVybiAkKG5vZGUpLmF0dHIoJ29uY2xpY2snLCBgJHtmdW5jdGlvbk5hbWV9KHRoaXMpYCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHNldE9uY2xpY2tBdHRyIH07IiwiaW1wb3J0IHsgZGF0YVRhYmxlSWQgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb21tb25cIjtcclxuXHJcbmxldCBpbmRleCA9IDE7XHJcblxyXG5mdW5jdGlvbiB0ZW1wbGF0ZShub2RlLCB0YWJsZSkge1xyXG4gICAgY29uc3QgaWQgPSBub2RlLmF0dHIoJ2lkJykgfHwgKG5vZGUuYXR0cignaWQnLCBgdGFibGUke2luZGV4Kyt9YCksIG5vZGUuYXR0cignaWQnKSk7XHJcbiAgICBjb25zdCBrZXkgPSBub2RlLmF0dHIoZGF0YVRhYmxlSWQpO1xyXG4gICAgcmV0dXJuIGBcclxuICAgIHZhciBjb2x1bW5EZWZzJHtrZXl9ID0gW1xyXG4gICAgICAgICR7dGFibGUuZ2V0VGFibGUoa2V5KS5jb2x1bW5EZWZzLm1hcChkZWYgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYHtoZWFkZXJOYW1lOiBcIiR7ZGVmLmhlYWRlck5hbWV9XCIsIGZpZWxkOiBcIiR7ZGVmLmZpZWxkfVwiLCB3aWR0aDogJHtkZWYud2lkdGggPyBkZWYud2lkdGggOiAnXCJcIid9fWA7XHJcbiAgICAgICAgfSkuam9pbignLCcpfVxyXG4gICAgXTtcclxuICAgIHZhciBncmlkT3B0aW9ucyR7a2V5fSA9IHtcclxuICAgICAgICBjb2x1bW5EZWZzOiBjb2x1bW5EZWZzJHtrZXl9LFxyXG4gICAgICAgIGVuYWJsZVNvcnRpbmc6IGZhbHNlLFxyXG4gICAgICAgIGVuYWJsZUZpbHRlcjogZmFsc2VcclxuICAgICAgfTtcclxuICAgIHZhciBlR3JpZERpdiR7a2V5fSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMke2lkfScpO1xyXG4gICAgbmV3IGFnR3JpZC5HcmlkKGVHcmlkRGl2JHtrZXl9LCBncmlkT3B0aW9ucyR7a2V5fSk7XHJcbiAgICBncmlkT3B0aW9ucyR7a2V5fS5hcGkuc2V0Um93RGF0YShbXSk7XHJcbiAgICBgO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0ZW1wbGF0ZTtcclxuXHJcbiIsImltcG9ydCB7IGRhdGFUYWJsZUlkIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY29tbW9uXCI7XHJcblxyXG5jb25zdCBmdW5jdGlvbk5hbWUgPSAnc3VibWl0Rm9ybSc7XHJcbmZ1bmN0aW9uIHRlbXBsYXRlKCkge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICB2YXIgZ3JpZE9wdGlvbnNJZGVudGlmaWVyID0gd2luZG93WydncmlkT3B0aW9ucycgKyAkKCdbJHtkYXRhVGFibGVJZH1dJykuYXR0cignJHtkYXRhVGFibGVJZH0nKV07XHJcbiAgICAgICAgZnVuY3Rpb24gJHtmdW5jdGlvbk5hbWV9KGVsLCBmb3JtSWQpIHtcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogY29uZmlnLmZ1bmRvZG9vQXBpRG9tYWluVXJsICsgJChlbCkuYXR0cignZGF0YS11cmwnKSxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICBtZXRob2QgOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiAoZm9ybUlkID8gJCgnI2Zvcm1JZCcpIDogJCgnZm9ybScpKS5zZXJpYWxpemVKU09OKCksXHJcbiAgICAgICAgICAgICAgICBmdW5kb2Rvb0FqYXg6IHRydWUsIC8vdHJ1ZTrlvIDlkK/orqHml7blip/og73vvIxmYWxzZe+8iOaIluWOu+aOieatpOWxnuaAp++8ie+8muS4jeW8gOWQr+iuoeaXtuWKn+iDvVxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJzLCBzdGF0dXMsIHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChycy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkT3B0aW9uc0lkZW50aWZpZXIuYXBpLnNldFJvd0RhdGEocnMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICBgO1xyXG59XHJcblxyXG5leHBvcnQgeyB0ZW1wbGF0ZSwgZnVuY3Rpb25OYW1lIH07IiwiaW1wb3J0IHsgZGF0YVVybCwgZGF0YVZhbHVlTWFwcGluZywgZGF0YVRleHRNYXBwaW5nIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY29tbW9uXCI7XHJcbmltcG9ydCB7IGF1dG9zZWxlY3RpbnB1dFNlbGVjdG9yIH0gZnJvbSAnLi4vdXRpbC9zZWxlY3RvcnMnO1xyXG5cclxuZnVuY3Rpb24gdGVtcGxhdGUoKSB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlT3B0aW9ucyhlbCwgcmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gJChlbCkuYXR0cignJHtkYXRhVmFsdWVNYXBwaW5nfScpIHx8ICd2YWx1ZSc7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gJChlbCkuYXR0cignJHtkYXRhVGV4dE1hcHBpbmd9JykgfHwgJ3RleHQnO1xyXG4gICAgICAgICAgICByZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIChvcHRpb24pIHtcclxuICAgICAgICAgICAgICAgICQoJzxvcHRpb24+PC9vcHRpb24+JylcclxuICAgICAgICAgICAgICAgICAgICAudmFsKG9wdGlvblt2YWx1ZV0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRleHQob3B0aW9uW3RleHRdKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkKGVsKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBBcnJheS5mcm9tKCQoJ2JvZHknKS5maW5kKCcke2F1dG9zZWxlY3RpbnB1dFNlbGVjdG9yfScpKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoZWwpLmF0dHIoJyR7ZGF0YVVybH0nKTtcclxuICAgICAgICAgICAgfSkuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBjb25maWcuZnVuZG9kb29BcGlEb21haW5VcmwgKyAkKGVsKS5hdHRyKCcke2RhdGFVcmx9JyksXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVPcHRpb25zKGVsLCByZXNwb25zZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIGA7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRlbXBsYXRlOyIsImltcG9ydCB7IGRhdGFUYWJsZUlkLCBkYXRhQXV0b1NlbGVjdElkLCBkYXRhQnV0dG9uSWQgfSBmcm9tICcuLi9jb21wb25lbnRzL2NvbW1vbic7XHJcbmltcG9ydCAkIGZyb20gJy4uLy4uL2pzL2pxdWVyeS5taW4nO1xyXG5cclxuY29uc3QgdGFibGVTZWxlY3RvciA9IGBbJHtkYXRhVGFibGVJZH1dYDtcclxuY29uc3QgZW1wdHlDaGlsZHJlblNlbGVjdG9ycyA9IFt0YWJsZVNlbGVjdG9yXTtcclxuY29uc3QgYXV0b3NlbGVjdGlucHV0U2VsZWN0b3IgPSBgWyR7ZGF0YUF1dG9TZWxlY3RJZH1dYDtcclxuY29uc3Qgc3VibWl0QnV0dG9uU2VsZWN0b3IgPSBgYnV0dG9uWyR7ZGF0YUJ1dHRvbklkfV1gO1xyXG5jb25zdCBwYXJlbnRTZWxlY3RvciA9IFt0YWJsZVNlbGVjdG9yXS5qb2luKCcsICcpO1xyXG5cclxuZnVuY3Rpb24gZ2V0UGFyZW50T3JTZWxmKG5vZGUpIHtcclxuICAgIGNvbnN0IHBhcmVudHMgPSAkKG5vZGUpLnBhcmVudHMocGFyZW50U2VsZWN0b3IpO1xyXG4gICAgcmV0dXJuIHBhcmVudHMubGVuZ3RoID8gcGFyZW50c1swXSA6IG5vZGU7XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBlbXB0eUNoaWxkcmVuU2VsZWN0b3JzLCB0YWJsZVNlbGVjdG9yLCBhdXRvc2VsZWN0aW5wdXRTZWxlY3Rvciwgc3VibWl0QnV0dG9uU2VsZWN0b3IsXHJcbiAgICBwYXJlbnRTZWxlY3RvciwgZ2V0UGFyZW50T3JTZWxmXHJcbn07IiwiaW1wb3J0IHsgQnV0dG9uSW5wdXQsIFRleHRWYWx1ZUlucHV0LCBTZWxlY3RJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBkYXRhQ29tcG9uZW50SWQsIGRhdGFUYWJsZUlkIH0gZnJvbSAnLi4vY29tbW9uJztcclxuaW1wb3J0IFZ2dmViIGZyb20gJy4uLy4uL2J1aWxkZXInO1xyXG5pbXBvcnQgJCBmcm9tICcuLi8uLi8uLi9qcy9qcXVlcnkubWluJztcclxuXHJcbmNvbnN0IHRhYmxlcyA9IHt9O1xyXG5sZXQgaW5kZXggPSAxO1xyXG5mdW5jdGlvbiBzZXRDb2x1bW5EZWZzQW5kUmVuZGVyKG5vZGUsIGNvbERlZnMpIHtcclxuICAgIC8vIENhbGwgdG8gc2V0IG5ldyBjb2x1bW4gZGVmaW5pdGlvbnMgaW50byB0aGUgZ3JpZC4gXHJcbiAgICAvLyBUaGUgZ3JpZCB3aWxsIHJlZHJhdyBhbGwgdGhlIGNvbHVtbiBoZWFkZXJzLCBhbmQgdGhlbiByZWRyYXcgYWxsIG9mIHRoZSByb3dzLlxyXG4gICAgdGFibGVzWyQobm9kZSkuYXR0cihkYXRhVGFibGVJZCldLmFwaS5zZXRDb2x1bW5EZWZzKGNvbERlZnMpO1xyXG4gICAgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIoXCJodG1sL3RhYmxlQG9lZVwiKTtcclxufVxyXG5cclxuY29uc3QgdGFibGUgPSB7XHJcbiAgICBub2RlczogW1widGFibGVcIl0sXHJcbiAgICBjbGFzc2VzOiBbXCJ0YWJsZVwiXSxcclxuICAgIGltYWdlOiBcImljb25zL3RhYmxlLnN2Z1wiLFxyXG4gICAgbmFtZTogXCJhZy1HcmlkXCIsXHJcbiAgICBodG1sOiBgPGRpdiAke2RhdGFDb21wb25lbnRJZH09XCJodG1sL3RhYmxlQG9lZVwiIHN0eWxlPVwid2lkdGg6IDUwMHB4OyBoZWlnaHQ6IDIwMHB4O1wiIGNsYXNzPVwiZHJvcHpvbmUgZHJhZ2dhYmxlIGFnLXRoZW1lLWJsdWUgaG9yaXpvbnRhbC1zdHJpcGVzXCI+PC9kaXY+YCxcclxuICAgIG9uRHJvcChub2RlKSB7XHJcbiAgICAgICAgJChub2RlKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogJ2NhbGMoMTAwJSAtIDI1cHgpJyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJycsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiAnJyxcclxuICAgICAgICAgICAgICAgIHRvcDogJycsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICcnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZHJhZ2dhYmxlJyk7XHJcbiAgICAgICAgVnZ2ZWIuQnVpbGRlci5mcmFtZUJvZHkuZmluZCgnLmNvbnRhaW5lclJpZ2h0IC5hbGxDb250ZW50IC50b3BDb250ZW50IC5jb250YWluZXIgLnJvdyAuZXZlcnlCb3ggLmJveGFyZWEnKS5hcHBlbmQoJChub2RlKS5wcm9wKCdvdXRlckhUTUwnKSk7XHJcbiAgICAgICAgJChub2RlKS5yZW1vdmUoKTtcclxuICAgIH0sXHJcbiAgICBnZXRUYWJsZShrZXkpIHtcclxuICAgICAgICByZXR1cm4gdGFibGVzW2tleV07XHJcbiAgICB9LFxyXG4gICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAkKG5vZGUpLnJlbW92ZUNsYXNzKCdob3Jpem9udGFsLXN0cmlwZXMnKTtcclxuICAgICAgICBpZiAoISQobm9kZSkuYXR0cihkYXRhVGFibGVJZCkpIHtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSBpbmRleCsrO1xyXG4gICAgICAgICAgICAkKG5vZGUpLmF0dHIoZGF0YVRhYmxlSWQsIGlkKTtcclxuICAgICAgICAgICAgdGFibGVzW2lkXSA9IHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbkRlZnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IGhlYWRlck5hbWU6IFwiaGVhZGVyXCIsIGZpZWxkOiBcImZpbGVkXCIsIHdpZHRoOiAnJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgaGVhZGVyTmFtZTogXCJoZWFkZXJcIiwgZmllbGQ6IFwiZmllbGRcIiwgd2lkdGg6ICcnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBoZWFkZXJOYW1lOiBcImhlYWRlclwiLCBmaWVsZDogXCJmaWVsZFwiLCB3aWR0aDogJycgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZVNvcnRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlRmlsdGVyOiBmYWxzZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBuZXcgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpZnJhbWVJZCcpLmNvbnRlbnRXaW5kb3cuYWdHcmlkKS5HcmlkKG5vZGUsIHRhYmxlc1tpZF0pO1xyXG4gICAgICAgICAgICB0YWJsZXNbaWRdLmFwaS5zZXRSb3dEYXRhKFtdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0YWJsZXNbJChub2RlKS5hdHRyKGRhdGFUYWJsZUlkKV0uY29sdW1uRGVmcy5yZWR1Y2UoKHByZXYsIGN1cikgPT4ge1xyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIHByZXYucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkhlYWRlciBcIiArIGksXHJcbiAgICAgICAgICAgICAgICBrZXk6IFwib3B0aW9uXCIgKyBpLFxyXG4gICAgICAgICAgICAgICAgLy9pbmRleDogaSAtIDEsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25Ob2RlOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgaW5wdXR0eXBlOiBUZXh0VmFsdWVJbnB1dCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ3RhYmxlaGVhZGVyQG9lZScsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyTmFtZTogY3VyLmhlYWRlck5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGN1ci5maWVsZCxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogY3VyLndpZHRoXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXlJbmRleCA9IHBhcnNlSW50KHRoaXMua2V5LnN1YnN0cignb3B0aW9uJy5sZW5ndGgpKSAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbERlZnMgPSB0YWJsZXNbJChub2RlKS5hdHRyKGRhdGFUYWJsZUlkKV0uY29sdW1uRGVmcztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQubm9kZU5hbWUgPT0gJ0JVVFRPTicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sRGVmcyA9IGNvbERlZnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKHZhbHVlLCBpbmRleCkgPT4gaW5kZXggIT0ga2V5SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZXNbJChub2RlKS5hdHRyKGRhdGFUYWJsZUlkKV0uY29sdW1uRGVmcyA9IGNvbERlZnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbHVtbkRlZnNBbmRSZW5kZXIobm9kZSwgY29sRGVmcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Lm5hbWUgPT0gJ3dpZHRoJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sRGVmc1trZXlJbmRleF1baW5wdXQubmFtZV0gPSB2YWx1ZSAmJiBwYXJzZUludCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xEZWZzW2tleUluZGV4XVtpbnB1dC5uYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOmHjeaWsOa4suafk+S8muWkseWOu+i+k+WFpeahhueEpueCue+8jOWPqumcgOimgeeUqOaWsOeahGNvbERlZnPmm7TmlrDooajmoLzljbPlj6/vvIzlj7PkvqfnmoTpg6jliIbkuI3pnIDopoHph43mlrDmuLLmn5PjgIJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVzWyQobm9kZSkuYXR0cihkYXRhVGFibGVJZCldLmFwaS5zZXRDb2x1bW5EZWZzKGNvbERlZnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJldjtcclxuICAgICAgICB9LCBbXSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHRoaXMucHJvcGVydGllcy5maWx0ZXIocHJvcGVydHkgPT4gcHJvcGVydHkua2V5LmluZGV4T2YoXCJvcHRpb25cIikgPT09IC0xKTtcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMudW5zaGlmdCguLi5wcm9wZXJ0aWVzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9LFxyXG4gICAgcHJvcGVydGllczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJUaGVtZVwiLFxyXG4gICAgICAgICAgICBrZXk6IFwidGhlbWVcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFsnYWctdGhlbWUtYmFsaGFtLWRhcmsnLCAnYWctdGhlbWUtYmFsaGFtJywgJ2FnLXRoZW1lLWJsdWUnLCAnYWctdGhlbWUtYm9vdHN0cmFwJyxcclxuICAgICAgICAgICAgICAgICdhZy10aGVtZS1kYXJrJywgJ2FnLXRoZW1lLWZyZXNoJywgJ2FnLXRoZW1lLW1hdGVyaWFsJ10sXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQ2xhc3ModGhpcy52YWxpZFZhbHVlcy5qb2luKFwiIFwiKSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmFkZENsYXNzKHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb2RlIGNvcGllZCBmb3JtIG9mZmljaWFsIHNpdGUgZXhhbXBsZSBodHRwczovL3d3dy5hZy1ncmlkLmNvbS9leGFtcGxlLnBocCMvXHJcbiAgICAgICAgICAgICAgICBjb25zdCBncmlkT3B0aW9ucyA9IHRhYmxlc1tub2RlLmF0dHIoZGF0YVRhYmxlSWQpXTtcclxuICAgICAgICAgICAgICAgIGdyaWRPcHRpb25zLmFwaS5yZXNldFJvd0hlaWdodHMoKTtcclxuICAgICAgICAgICAgICAgIGdyaWRPcHRpb25zLmFwaS5yZWRyYXdSb3dzKCk7XHJcbiAgICAgICAgICAgICAgICBncmlkT3B0aW9ucy5hcGkucmVmcmVzaEhlYWRlcigpO1xyXG4gICAgICAgICAgICAgICAgZ3JpZE9wdGlvbnMuYXBpLnJlZnJlc2hUb29sUGFuZWwoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJEZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImFnLXRoZW1lLWJhbGhhbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQmFsaGFtXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJhZy10aGVtZS1iYWxoYW0tZGFya1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQmFsaGFtIChkYXJrKVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiYWctdGhlbWUtYmx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQmx1ZVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiYWctdGhlbWUtYm9vdHN0cmFwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJCb290c3RyYXBcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImFnLXRoZW1lLWRhcmtcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhcmtcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImFnLXRoZW1lLWZyZXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJGcmVzaFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiYWctdGhlbWUtbWF0ZXJpYWxcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIk1hdGVyaWFsXCJcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICAgICAga2V5OiBcImFkZENoaWxkXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQnV0dG9uSW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHsgdGV4dDogXCJBZGQgaGVhZGVyXCIgfSxcclxuICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xEZWZzID0gdGFibGVzWyQobm9kZSkuYXR0cihkYXRhVGFibGVJZCldLmNvbHVtbkRlZnM7XHJcbiAgICAgICAgICAgICAgICBjb2xEZWZzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlck5hbWU6ICdoZWFkZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiAnZmllbGQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0Q29sdW1uRGVmc0FuZFJlbmRlcihub2RlLCBjb2xEZWZzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhYmxlOyIsImltcG9ydCAkIGZyb20gJy4uLy4uL2pzL2pxdWVyeS5taW4nO1xyXG5cclxuZnVuY3Rpb24gaHRtbEdlbmVyYXRvcihodG1sLCAuLi5mbnMpIHtcclxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHRtbCcpO1xyXG4gICAgZWwuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIGZucy5yZWR1Y2UoKGVsLCBmbikgPT4gZm4oZWwpLCBlbCk7XHJcbiAgICByZXR1cm4gJChlbCkucHJvcCgnb3V0ZXJIVE1MJyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGh0bWxHZW5lcmF0b3I7IiwiLy8gVG9nZ2xlIGZ1bGxzY3JlZW5cclxuZnVuY3Rpb24gbGF1bmNoRnVsbFNjcmVlbihkb2N1bWVudCkge1xyXG4gICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbFNjcmVlbikge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQuRnVsbFNjcmVlbkVsZW1lbnQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmV4aXRGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICAvL21vemlsbGFcdFx0XHJcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQubW96RnVsbFNjcmVlbkVsZW1lbnQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgIC8vd2Via2l0XHQgIFxyXG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50KVxyXG4gICAgICAgICAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgLy9pZVx0ICBcclxuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50Lm1zRnVsbFNjcmVlbkVsZW1lbnQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IGxhdW5jaEZ1bGxTY3JlZW4gfTsiLCJmdW5jdGlvbiBkb3dubG9hZEFzVGV4dEZpbGUoZmlsZW5hbWUsIHRleHQpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaHJlZicsIGBkYXRhOnRleHQvaHRtbDtjaGFyc2V0PXV0Zi04LCR7ZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpfWApO1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgZmlsZW5hbWUpO1xyXG5cclxuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcblxyXG4gICAgZWxlbWVudC5jbGljaygpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGRvd25sb2FkQXNUZXh0RmlsZSB9OyIsImZ1bmN0aW9uIGdldFN0eWxlKGVsLCBzdHlsZVByb3ApIHtcclxuICAgIHZhbHVlID0gXCJcIjtcclxuICAgIC8vdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWwpO1xyXG4gICAgaWYgKGVsLnN0eWxlICYmIGVsLnN0eWxlLmxlbmd0aCA+IDAgJiYgZWwuc3R5bGVbc3R5bGVQcm9wXSkvL2NoZWNrIGlubGluZVxyXG4gICAgICAgIHZhciB2YWx1ZSA9IGVsLnN0eWxlW3N0eWxlUHJvcF07XHJcbiAgICBlbHNlXHJcbiAgICAgICAgaWYgKGVsLmN1cnJlbnRTdHlsZSlcdC8vY2hlY2sgZGVmaW5lZCBjc3NcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZWwuY3VycmVudFN0eWxlW3N0eWxlUHJvcF07XHJcbiAgICAgICAgZWxzZSBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0RGVmYXVsdENvbXB1dGVkU3R5bGUgP1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0RGVmYXVsdENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoc3R5bGVQcm9wKSA6XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZVByb3ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGdldFN0eWxlIH07IiwiaW1wb3J0IHsgZGF0YUNvbmZpZ0luZm8sIGRhdGFDYWxlbmRhcklkIH0gZnJvbSAnLi4vY29tcG9uZW50cy9jb21tb24nO1xyXG5pbXBvcnQgJCBmcm9tICcuLi8uLi9qcy9qcXVlcnkubWluJztcclxuXHJcbmNvbnN0IGNhbGVuZGFyU2VsZWN0b3IgPSBgaW5wdXRbJHtkYXRhQ2FsZW5kYXJJZH1dYDtcclxuY29uc3QgY2FsZW5kYXJPbmNsaWNrU2VsZWN0b3IgPSBgaW5wdXRbJHtkYXRhQ2FsZW5kYXJJZH1dW29uY2xpY2tdYDtcclxuLy8gPGlucHV0IGRhdGEtaWQ9XCJ7J2EnLCBifVwiPiDmm7/mjaLljIXlkKsnXFwnJ+eahOWxnuaAp+WAvOS4uuWQiOazleeahGpzb27lrZfnrKbkuLJcclxuZnVuY3Rpb24gZ2V0RGF0YUNvbmZpZ0luZm8obm9kZSkge1xyXG4gICAgcmV0dXJuICQobm9kZSkuYXR0cihkYXRhQ29uZmlnSW5mbyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERhdGFDb25maWdJbmZvSlNPTlN0cmluZyhub2RlKSB7XHJcbiAgICByZXR1cm4gZ2V0RGF0YUNvbmZpZ0luZm8obm9kZSkucmVwbGFjZSgvJy9nLCAnXCInKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0RGF0YUNvbmZpZ0luZm8obm9kZSwgbmV3VmFsdWUpIHtcclxuICAgICQobm9kZSkuYXR0cihkYXRhQ29uZmlnSW5mbywgSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpLnJlcGxhY2UoL1wiL2csICdcXCcnKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldE9uY2xpY2tBdHRyKG5vZGUpIHtcclxuICAgIHJldHVybiAkKG5vZGUpLmF0dHIoJ29uY2xpY2snLCBgV2RhdGVQaWNrZXIoJHtnZXREYXRhQ29uZmlnSW5mbyhub2RlKX0pYCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFBhcnNlZENvbmZpZ0luZm8obm9kZSkge1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoZ2V0RGF0YUNvbmZpZ0luZm9KU09OU3RyaW5nKG5vZGUpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF0ZUZtdChub2RlKSB7XHJcbiAgICByZXR1cm4gZ2V0UGFyc2VkQ29uZmlnSW5mbyhub2RlKS5kYXRlRm10O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9uZVdpdGhvdXRPbmNsaWNrKG5vZGUpIHtcclxuICAgIGNvbnN0ICRjbG9uZSA9ICQobm9kZSkucmVtb3ZlQXR0cignb25jbGljaycpLmNsb25lKCk7XHJcbiAgICAkKG5vZGUpLnJlcGxhY2VXaXRoKCRjbG9uZSk7XHJcbiAgICByZXR1cm4gJGNsb25lO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXBsYWNlT3RoZXJTaG93aW5nQ2FsZW5kYXJJbnB1dHMoZWxlbWVudCwgY29udGV4dCkge1xyXG4gICAgaWYgKCEkKGVsZW1lbnQpLmlzKGNhbGVuZGFyT25jbGlja1NlbGVjdG9yKSkge1xyXG4gICAgICAgIGNvbnRleHQuZmluZChjYWxlbmRhck9uY2xpY2tTZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNsb25lV2l0aG91dE9uY2xpY2sodGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICByZXBsYWNlT3RoZXJTaG93aW5nQ2FsZW5kYXJJbnB1dHMsIGNsb25lV2l0aG91dE9uY2xpY2ssXHJcbiAgICBjYWxlbmRhclNlbGVjdG9yLCBjYWxlbmRhck9uY2xpY2tTZWxlY3RvcixcclxuICAgIGdldERhdGFDb25maWdJbmZvLCBnZXREYXRlRm10LCBnZXRQYXJzZWRDb25maWdJbmZvLFxyXG4gICAgc2V0T25jbGlja0F0dHIsIHNldERhdGFDb25maWdJbmZvXHJcbn07IiwiLypcclxuQ29weXJpZ2h0IDIwMTcgWmlhZGluIEdpdmFuXHJcblxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cclxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcblxyXG5odHRwczovL2dpdGh1Yi5jb20vZ2l2YW56L1Z2dmViSnNcclxuKi9cclxuaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5pbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuaW1wb3J0IENoZWNrYm94SW5wdXQgZnJvbSAnLi9DaGVja2JveElucHV0JztcclxuaW1wb3J0IFNlbGVjdElucHV0IGZyb20gJy4vU2VsZWN0SW5wdXQnO1xyXG5pbXBvcnQgTGlua0lucHV0IGZyb20gJy4vTGlua0lucHV0JztcclxuaW1wb3J0IFJhbmdlSW5wdXQgZnJvbSAnLi9SYW5nZUlucHV0JztcclxuaW1wb3J0IE51bWJlcklucHV0IGZyb20gJy4vTnVtYmVySW5wdXQnO1xyXG5pbXBvcnQgQ3NzVW5pdElucHV0IGZyb20gJy4vQ3NzVW5pdElucHV0JztcclxuaW1wb3J0IENvbG9ySW5wdXQgZnJvbSAnLi9Db2xvcklucHV0JztcclxuaW1wb3J0IEZpbGVVcGxvYWRJbnB1dCBmcm9tICcuL0ZpbGVVcGxvYWRJbnB1dCc7XHJcbmltcG9ydCBSYWRpb0lucHV0IGZyb20gJy4vUmFkaW9JbnB1dCc7XHJcbmltcG9ydCBSYWRpb0J1dHRvbklucHV0IGZyb20gJy4vUmFkaW9CdXR0b25JbnB1dCc7XHJcbmltcG9ydCBUb2dnbGVJbnB1dCBmcm9tICcuL1RvZ2dsZUlucHV0JztcclxuaW1wb3J0IFZhbHVlVGV4dElucHV0IGZyb20gJy4vVmFsdWVUZXh0SW5wdXQnO1xyXG5pbXBvcnQgR3JpZExheW91dElucHV0IGZyb20gJy4vR3JpZExheW91dElucHV0JztcclxuaW1wb3J0IFByb2R1Y3RzSW5wdXQgZnJvbSAnLi9Qcm9kdWN0c0lucHV0JztcclxuaW1wb3J0IEdyaWRJbnB1dCBmcm9tICcuL0dyaWRJbnB1dCc7XHJcbmltcG9ydCBUZXh0VmFsdWVJbnB1dCBmcm9tICcuL1RleHRWYWx1ZUlucHV0JztcclxuaW1wb3J0IEJ1dHRvbklucHV0IGZyb20gJy4vQnV0dG9uSW5wdXQnO1xyXG5pbXBvcnQgU2VjdGlvbklucHV0IGZyb20gJy4vU2VjdGlvbklucHV0JztcclxuaW1wb3J0IExpc3RJbnB1dCBmcm9tICcuL0xpc3RJbnB1dCc7XHJcblxyXG5leHBvcnQge1xyXG5cdElucHV0LCBUZXh0SW5wdXQsIENoZWNrYm94SW5wdXQsIFNlbGVjdElucHV0LCBMaW5rSW5wdXQsIFJhbmdlSW5wdXQsIE51bWJlcklucHV0LCBDc3NVbml0SW5wdXQsXHJcblx0UmFkaW9JbnB1dCwgUmFkaW9CdXR0b25JbnB1dCwgVG9nZ2xlSW5wdXQsIFZhbHVlVGV4dElucHV0LCBHcmlkTGF5b3V0SW5wdXQsIFByb2R1Y3RzSW5wdXQsIEdyaWRJbnB1dCxcclxuXHRUZXh0VmFsdWVJbnB1dCwgQnV0dG9uSW5wdXQsIFNlY3Rpb25JbnB1dCwgTGlzdElucHV0LCBDb2xvcklucHV0LCBGaWxlVXBsb2FkSW5wdXRcclxufTsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBWYWx1ZVRleHRJbnB1dCA9ICQuZXh0ZW5kKHt9LCBUZXh0SW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWYWx1ZVRleHRJbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBUb2dnbGVJbnB1dCA9ICQuZXh0ZW5kKHt9LCBUZXh0SW5wdXQsIHtcclxuXHJcblx0b25DaGFuZ2U6IGZ1bmN0aW9uIChldmVudCwgbm9kZSkge1xyXG5cdFx0aWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS5lbGVtZW50KSB7XHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt0aGlzLmNoZWNrZWQgPyB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtdmFsdWUtb25cIikgOiB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtdmFsdWUtb2ZmXCIpLCB0aGlzXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0b2dnbGVcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVG9nZ2xlSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5pbXBvcnQgJCBmcm9tICcuLi8uLi9qcy9qcXVlcnkubWluJztcclxuXHJcbmNvbnN0IFRleHRWYWx1ZUlucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XHRbXCJjbGlja1wiLCBcIm9uQ2hhbmdlXCIsIFwiYnV0dG9uXCIgLyonc2VsZWN0JyovXSxcclxuXHRdLFxyXG5cclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHR2YWx1ZVwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGV4dFZhbHVlSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5pbXBvcnQgJCBmcm9tICcuLi8uLi9qcy9qcXVlcnkubWluJztcclxuXHJcbmNvbnN0IFNlbGVjdElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG4gICAgZXZlbnRzOiBbXHJcbiAgICAgICAgW1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJzZWxlY3RcIl0sXHJcbiAgICBdLFxyXG5cclxuXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgJCgnc2VsZWN0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcihcInNlbGVjdFwiLCBkYXRhKTtcclxuICAgIH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcbmltcG9ydCAkIGZyb20gJy4uLy4uL2pzL2pxdWVyeS5taW4nO1xyXG5cclxuY29uc3QgU2VjdGlvbklucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2xpY2tcIiwgXCJvbkNoYW5nZVwiLCBcImJ1dHRvblwiIC8qJ3NlbGVjdCcqL10sXHJcblx0XSxcclxuXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwic2VjdGlvbmlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWN0aW9uSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5pbXBvcnQgJCBmcm9tICcuLi8uLi9qcy9qcXVlcnkubWluJztcclxuXHJcbmNvbnN0IFJhbmdlSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJyYW5nZWlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhbmdlSW5wdXQ7IiwiaW1wb3J0IFJhZGlvSW5wdXQgZnJvbSAnLi9SYWRpb0lucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBSYWRpb0J1dHRvbklucHV0ID0gJC5leHRlbmQoe30sIFJhZGlvSW5wdXQsIHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcihcInJhZGlvYnV0dG9uaW5wdXRcIiwgZGF0YSk7XHJcbiAgICB9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYWRpb0J1dHRvbklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBSYWRpb0lucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQsIG5vZGUpIHtcclxuXHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpIHtcclxuXHRcdFx0ZXZlbnQuZGF0YS5lbGVtZW50LnRyaWdnZXIoJ3Byb3BlcnR5Q2hhbmdlJywgW3RoaXMudmFsdWUsIHRoaXNdKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnJlbW92ZUF0dHIoJ2NoZWNrZWQnKTtcclxuXHRcdGlmICh2YWx1ZSlcclxuXHRcdFx0JChcImlucHV0W3ZhbHVlPVwiICsgdmFsdWUgKyBcIl1cIiwgdGhpcy5lbGVtZW50KS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInJhZGlvaW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmFkaW9JbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBQcm9kdWN0c0lucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImtleXVwXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RzSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5pbXBvcnQgJCBmcm9tICcuLi8uLi9qcy9qcXVlcnkubWluJztcclxuXHJcbnZhciBOdW1iZXJJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcIm51bWJlcmlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE51bWJlcklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBMaXN0SW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcInNlbGVjdFwiXSxcclxuXHRdLFxyXG5cclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnc2VsZWN0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJsaXN0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpc3RJbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBMaW5rSW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbmtJbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBHcmlkTGF5b3V0SW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR3JpZExheW91dElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBHcmlkSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwic2VsZWN0XCIgLyonc2VsZWN0JyovXSxcclxuXHRcdFtcImNsaWNrXCIsIFwib25DaGFuZ2VcIiwgXCJidXR0b25cIiAvKidzZWxlY3QnKi9dLFxyXG5cdF0sXHJcblxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdzZWxlY3QnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImdyaWRcIiwgZGF0YSk7XHJcblx0fSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdyaWRJbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBGaWxlVXBsb2FkSW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmlsZVVwbG9hZElucHV0O1xyXG4iLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcbmltcG9ydCAkIGZyb20gJy4uLy4uL2pzL2pxdWVyeS5taW4nO1xyXG5cclxuY29uc3QgVGV4dElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG4gICAgZXZlbnRzOiBbXHJcbiAgICAgICAgW1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdCBdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblx0XHJcblx0aW5pdDogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbiAgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGV4dElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBDc3NVbml0SW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0bnVtYmVyOiAwLFxyXG5cdHVuaXQ6IFwicHhcIixcclxuXHJcblx0b25DaGFuZ2U6IGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuXHRcdGlmIChldmVudC5kYXRhICYmIGV2ZW50LmRhdGEuZWxlbWVudCkge1xyXG5cdFx0XHRpbnB1dCA9IGV2ZW50LmRhdGEuaW5wdXQ7XHJcblx0XHRcdGlucHV0W3RoaXMubmFtZV0gPSB0aGlzLnZhbHVlOy8vIHRoaXMubmFtZSA9IHVuaXQgb3IgbnVtYmVyXHRcclxuXHJcblx0XHRcdHZhbHVlID0gXCJcIjtcclxuXHRcdFx0aWYgKGlucHV0LnVuaXQgPT0gXCJhdXRvXCIpIHtcclxuXHRcdFx0XHQkKGV2ZW50LmRhdGEuZWxlbWVudCkuYWRkQ2xhc3MoXCJhdXRvXCIpO1xyXG5cdFx0XHRcdHZhbHVlID0gaW5wdXQudW5pdDtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHQkKGV2ZW50LmRhdGEuZWxlbWVudCkucmVtb3ZlQ2xhc3MoXCJhdXRvXCIpO1xyXG5cdFx0XHRcdHZhbHVlID0gaW5wdXQubnVtYmVyICsgaW5wdXQudW5pdDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZXZlbnQuZGF0YS5lbGVtZW50LnRyaWdnZXIoJ3Byb3BlcnR5Q2hhbmdlJywgW3ZhbHVlLCB0aGlzXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcInNlbGVjdFwiXSxcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0dGhpcy5udW1iZXIgPSBwYXJzZUludCh2YWx1ZSk7XHJcblx0XHR0aGlzLnVuaXQgPSB2YWx1ZS5yZXBsYWNlKHRoaXMubnVtYmVyLCAnJyk7XHJcblxyXG5cdFx0aWYgKHRoaXMudW5pdCA9PSBcImF1dG9cIikgJCh0aGlzLmVsZW1lbnQpLmFkZENsYXNzKFwiYXV0b1wiKTtcclxuXHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHRoaXMubnVtYmVyKTtcclxuXHRcdCQoJ3NlbGVjdCcsIHRoaXMuZWxlbWVudCkudmFsKHRoaXMudW5pdCk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImNzc3VuaXRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDc3NVbml0SW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5pbXBvcnQgJCBmcm9tICcuLi8uLi9qcy9qcXVlcnkubWluJztcclxuXHJcbmNvbnN0IENvbG9ySW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0Ly9odG1sNSBjb2xvciBpbnB1dCBvbmx5IHN1cHBvcnRzIHNldHRpbmcgdmFsdWVzIGFzIGhleCBjb2xvcnMgZXZlbiBpZiB0aGUgcGlja2VyIHJldHVybnMgb25seSByZ2JcclxuXHRyZ2IyaGV4OiBmdW5jdGlvbiAocmdiKSB7XHJcblxyXG5cdFx0cmdiID0gcmdiLm1hdGNoKC9ecmdiYT9bXFxzK10/XFwoW1xccytdPyhcXGQrKVtcXHMrXT8sW1xccytdPyhcXGQrKVtcXHMrXT8sW1xccytdPyhcXGQrKVtcXHMrXT8vaSk7XHJcblxyXG5cdFx0cmV0dXJuIChyZ2IgJiYgcmdiLmxlbmd0aCA9PT0gNCkgPyBcIiNcIiArXHJcblx0XHRcdChcIjBcIiArIHBhcnNlSW50KHJnYlsxXSwgMTApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpICtcclxuXHRcdFx0KFwiMFwiICsgcGFyc2VJbnQocmdiWzJdLCAxMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMikgK1xyXG5cdFx0XHQoXCIwXCIgKyBwYXJzZUludChyZ2JbM10sIDEwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKSA6IHJnYjtcclxuXHR9LFxyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh0aGlzLnJnYjJoZXgodmFsdWUpKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwiY29sb3JpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb2xvcklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBDaGVja2JveElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbihldmVudCwgbm9kZSkge1xyXG5cdFx0XHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpXHJcblx0XHR7XHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt0aGlzLmNoZWNrZWQsIHRoaXNdKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuICAgIGV2ZW50czogW1xyXG4gICAgICAgIFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0IF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHRcclxuXHRpbml0OiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJjaGVja2JveGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbiAgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tib3hJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcbmltcG9ydCAkIGZyb20gJy4uLy4uL2pzL2pxdWVyeS5taW4nO1xyXG5cclxuY29uc3QgQnV0dG9uSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjbGlja1wiLCBcIm9uQ2hhbmdlXCIsIFwiYnV0dG9uXCIgLyonc2VsZWN0JyovXSxcclxuXHRdLFxyXG5cclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnYnV0dG9uJywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJidXR0b25cIiwgZGF0YSk7XHJcblx0fSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbklucHV0OyIsImltcG9ydCAkIGZyb20gJy4uLy4uL2pzL2pxdWVyeS5taW4nO1xyXG5cclxuY29uc3QgSW5wdXQgPSB7XHJcblx0XHJcblx0aW5pdDogZnVuY3Rpb24obmFtZSkge1xyXG5cdH0sXHJcblxyXG5cclxuXHRvbkNoYW5nZTogZnVuY3Rpb24oZXZlbnQsIG5vZGUpIHtcclxuXHRcdFxyXG5cdFx0aWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS5lbGVtZW50KVxyXG5cdFx0e1xyXG5cdFx0XHRldmVudC5kYXRhLmVsZW1lbnQudHJpZ2dlcigncHJvcGVydHlDaGFuZ2UnLCBbdGhpcy52YWx1ZSwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHJlbmRlclRlbXBsYXRlOiBmdW5jdGlvbihuYW1lLCBkYXRhKSB7XHJcblx0XHRyZXR1cm4gdG1wbChcInZ2dmViLWlucHV0LVwiICsgbmFtZSwgZGF0YSk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbihuYW1lLCBkYXRhKSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKHRoaXMucmVuZGVyVGVtcGxhdGUobmFtZSwgZGF0YSkpO1xyXG5cdFx0XHJcblx0XHQvL2JpbmQgZXZlbnRzXHJcblx0XHRpZiAodGhpcy5ldmVudHMpXHJcblx0XHRmb3IgKHZhciBpIGluIHRoaXMuZXZlbnRzKVxyXG5cdFx0e1xyXG5cdFx0XHRldmVudCA9IHRoaXMuZXZlbnRzW2ldWzBdO1xyXG5cdFx0XHRmdW4gPSB0aGlzWyB0aGlzLmV2ZW50c1tpXVsxXSBdO1xyXG5cdFx0XHRlbCA9IHRoaXMuZXZlbnRzW2ldWzJdO1xyXG5cdFx0XHJcblx0XHRcdHRoaXMuZWxlbWVudC5vbihldmVudCwgZWwsIHtlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGlucHV0OnRoaXN9LCBmdW4pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLmVsZW1lbnQ7XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5wdXQ7IiwiaW1wb3J0ICQgZnJvbSAnLi4vLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5jb25zdCBiZ2NvbG9yQ2xhc3NlcyA9IFtcImJnLXByaW1hcnlcIiwgXCJiZy1zZWNvbmRhcnlcIiwgXCJiZy1zdWNjZXNzXCIsIFwiYmctZGFuZ2VyXCIsIFwiYmctd2FybmluZ1wiLCBcImJnLWluZm9cIiwgXCJiZy1saWdodFwiLCBcImJnLWRhcmtcIiwgXCJiZy13aGl0ZVwiXTtcclxuXHJcbmNvbnN0IGJnY29sb3JTZWxlY3RPcHRpb25zID1cclxuICAgIFt7XHJcbiAgICAgICAgdmFsdWU6IFwiRGVmYXVsdFwiLFxyXG4gICAgICAgIHRleHQ6IFwiXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctcHJpbWFyeVwiLFxyXG4gICAgICAgIHRleHQ6IFwiUHJpbWFyeVwiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctc2Vjb25kYXJ5XCIsXHJcbiAgICAgICAgdGV4dDogXCJTZWNvbmRhcnlcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLXN1Y2Nlc3NcIixcclxuICAgICAgICB0ZXh0OiBcIlN1Y2Nlc3NcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLWRhbmdlclwiLFxyXG4gICAgICAgIHRleHQ6IFwiRGFuZ2VyXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy13YXJuaW5nXCIsXHJcbiAgICAgICAgdGV4dDogXCJXYXJuaW5nXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1pbmZvXCIsXHJcbiAgICAgICAgdGV4dDogXCJJbmZvXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1saWdodFwiLFxyXG4gICAgICAgIHRleHQ6IFwiTGlnaHRcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLWRhcmtcIixcclxuICAgICAgICB0ZXh0OiBcIkRhcmtcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLXdoaXRlXCIsXHJcbiAgICAgICAgdGV4dDogXCJXaGl0ZVwiXHJcbiAgICB9XTtcclxuXHJcbmZ1bmN0aW9uIGNoYW5nZU5vZGVOYW1lKG5vZGUsIG5ld05vZGVOYW1lKSB7XHJcbiAgICB2YXIgbmV3Tm9kZTtcclxuICAgIG5ld05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5ld05vZGVOYW1lKTtcclxuICAgIGF0dHJpYnV0ZXMgPSBub2RlLmdldCgwKS5hdHRyaWJ1dGVzO1xyXG5cclxuICAgIGZvciAoaSA9IDAsIGxlbiA9IGF0dHJpYnV0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBuZXdOb2RlLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVzW2ldLm5vZGVOYW1lLCBhdHRyaWJ1dGVzW2ldLm5vZGVWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgJChuZXdOb2RlKS5hcHBlbmQoJChub2RlKS5jb250ZW50cygpKTtcclxuICAgICQobm9kZSkucmVwbGFjZVdpdGgobmV3Tm9kZSk7XHJcblxyXG4gICAgcmV0dXJuIG5ld05vZGU7XHJcbn1cclxuXHJcbmxldCBiYXNlX3NvcnQgPSAxMDA7Ly9zdGFydCBzb3J0aW5nIGZvciBiYXNlIGNvbXBvbmVudCBmcm9tIDEwMCB0byBhbGxvdyBleHRlbmRlZCBwcm9wZXJ0aWVzIHRvIGJlIGZpcnN0XHJcbmZ1bmN0aW9uIGluY19iYXNlX3NvcnQoKSB7XHJcbiAgICByZXR1cm4gYmFzZV9zb3J0Kys7XHJcbn1cclxuXHJcbmNvbnN0IGRhdGFDb21wb25lbnRJZCA9ICdkYXRhLWNvbXBvbmVudC1pZCc7XHJcbmNvbnN0IGRhdGFUYWJsZUlkID0gJ2RhdGEtdGFibGUtaWQnO1xyXG5jb25zdCBkYXRhQ2FsZW5kYXJJZCA9ICdkYXRhLWNhbGVuZGFyLWlkJztcclxuY29uc3QgZGF0YUNvbmZpZ0luZm8gPSAnZGF0YS1jb25maWctaW5mbyc7XHJcbmNvbnN0IGRhdGFBdXRvU2VsZWN0SWQgPSAnZGF0YS1hdXRvLXNlbGVjdC1pZCc7XHJcbmNvbnN0IGRhdGFCdXR0b25JZCA9ICdkYXRhLWJ1dHRvbi1pZCc7XHJcbmNvbnN0IGRhdGFVcmwgPSAnZGF0YS11cmwnO1xyXG5jb25zdCBkYXRhVmFsdWVNYXBwaW5nID0gJ2RhdGEtdmFsdWUtbWFwcGluZyc7XHJcbmNvbnN0IGRhdGFUZXh0TWFwcGluZyA9ICdkYXRhLXRleHQtbWFwcGluZyc7XHJcblxyXG5leHBvcnQge1xyXG4gICAgYmdjb2xvckNsYXNzZXMsIGJnY29sb3JTZWxlY3RPcHRpb25zLCBjaGFuZ2VOb2RlTmFtZSwgaW5jX2Jhc2Vfc29ydCwgZGF0YUNvbXBvbmVudElkLCBkYXRhVGFibGVJZCxcclxuICAgIGRhdGFDb25maWdJbmZvLCBkYXRhQ2FsZW5kYXJJZCwgZGF0YVVybCwgZGF0YUF1dG9TZWxlY3RJZCwgZGF0YUJ1dHRvbklkLCBkYXRhVmFsdWVNYXBwaW5nLCBkYXRhVGV4dE1hcHBpbmdcclxufTtcclxuIiwiLyohIGpRdWVyeSB2My4yLjEgfCAoYykgSlMgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIHwganF1ZXJ5Lm9yZy9saWNlbnNlICovXHJcbiFmdW5jdGlvbihhLGIpe1widXNlIHN0cmljdFwiO1wib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1hLmRvY3VtZW50P2IoYSwhMCk6ZnVuY3Rpb24oYSl7aWYoIWEuZG9jdW1lbnQpdGhyb3cgbmV3IEVycm9yKFwialF1ZXJ5IHJlcXVpcmVzIGEgd2luZG93IHdpdGggYSBkb2N1bWVudFwiKTtyZXR1cm4gYihhKX06YihhKX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6dGhpcyxmdW5jdGlvbihhLGIpe1widXNlIHN0cmljdFwiO3ZhciBjPVtdLGQ9YS5kb2N1bWVudCxlPU9iamVjdC5nZXRQcm90b3R5cGVPZixmPWMuc2xpY2UsZz1jLmNvbmNhdCxoPWMucHVzaCxpPWMuaW5kZXhPZixqPXt9LGs9ai50b1N0cmluZyxsPWouaGFzT3duUHJvcGVydHksbT1sLnRvU3RyaW5nLG49bS5jYWxsKE9iamVjdCksbz17fTtmdW5jdGlvbiBwKGEsYil7Yj1ifHxkO3ZhciBjPWIuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtjLnRleHQ9YSxiLmhlYWQuYXBwZW5kQ2hpbGQoYykucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjKX12YXIgcT1cIjMuMi4xXCIscj1mdW5jdGlvbihhLGIpe3JldHVybiBuZXcgci5mbi5pbml0KGEsYil9LHM9L15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLHQ9L14tbXMtLyx1PS8tKFthLXpdKS9nLHY9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYi50b1VwcGVyQ2FzZSgpfTtyLmZuPXIucHJvdG90eXBlPXtqcXVlcnk6cSxjb25zdHJ1Y3RvcjpyLGxlbmd0aDowLHRvQXJyYXk6ZnVuY3Rpb24oKXtyZXR1cm4gZi5jYWxsKHRoaXMpfSxnZXQ6ZnVuY3Rpb24oYSl7cmV0dXJuIG51bGw9PWE/Zi5jYWxsKHRoaXMpOmE8MD90aGlzW2ErdGhpcy5sZW5ndGhdOnRoaXNbYV19LHB1c2hTdGFjazpmdW5jdGlvbihhKXt2YXIgYj1yLm1lcmdlKHRoaXMuY29uc3RydWN0b3IoKSxhKTtyZXR1cm4gYi5wcmV2T2JqZWN0PXRoaXMsYn0sZWFjaDpmdW5jdGlvbihhKXtyZXR1cm4gci5lYWNoKHRoaXMsYSl9LG1hcDpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5wdXNoU3RhY2soci5tYXAodGhpcyxmdW5jdGlvbihiLGMpe3JldHVybiBhLmNhbGwoYixjLGIpfSkpfSxzbGljZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLnB1c2hTdGFjayhmLmFwcGx5KHRoaXMsYXJndW1lbnRzKSl9LGZpcnN0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZXEoMCl9LGxhc3Q6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lcSgtMSl9LGVxOmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMubGVuZ3RoLGM9K2ErKGE8MD9iOjApO3JldHVybiB0aGlzLnB1c2hTdGFjayhjPj0wJiZjPGI/W3RoaXNbY11dOltdKX0sZW5kOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucHJldk9iamVjdHx8dGhpcy5jb25zdHJ1Y3RvcigpfSxwdXNoOmgsc29ydDpjLnNvcnQsc3BsaWNlOmMuc3BsaWNlfSxyLmV4dGVuZD1yLmZuLmV4dGVuZD1mdW5jdGlvbigpe3ZhciBhLGIsYyxkLGUsZixnPWFyZ3VtZW50c1swXXx8e30saD0xLGk9YXJndW1lbnRzLmxlbmd0aCxqPSExO2ZvcihcImJvb2xlYW5cIj09dHlwZW9mIGcmJihqPWcsZz1hcmd1bWVudHNbaF18fHt9LGgrKyksXCJvYmplY3RcIj09dHlwZW9mIGd8fHIuaXNGdW5jdGlvbihnKXx8KGc9e30pLGg9PT1pJiYoZz10aGlzLGgtLSk7aDxpO2grKylpZihudWxsIT0oYT1hcmd1bWVudHNbaF0pKWZvcihiIGluIGEpYz1nW2JdLGQ9YVtiXSxnIT09ZCYmKGomJmQmJihyLmlzUGxhaW5PYmplY3QoZCl8fChlPUFycmF5LmlzQXJyYXkoZCkpKT8oZT8oZT0hMSxmPWMmJkFycmF5LmlzQXJyYXkoYyk/YzpbXSk6Zj1jJiZyLmlzUGxhaW5PYmplY3QoYyk/Yzp7fSxnW2JdPXIuZXh0ZW5kKGosZixkKSk6dm9pZCAwIT09ZCYmKGdbYl09ZCkpO3JldHVybiBnfSxyLmV4dGVuZCh7ZXhwYW5kbzpcImpRdWVyeVwiKyhxK01hdGgucmFuZG9tKCkpLnJlcGxhY2UoL1xcRC9nLFwiXCIpLGlzUmVhZHk6ITAsZXJyb3I6ZnVuY3Rpb24oYSl7dGhyb3cgbmV3IEVycm9yKGEpfSxub29wOmZ1bmN0aW9uKCl7fSxpc0Z1bmN0aW9uOmZ1bmN0aW9uKGEpe3JldHVyblwiZnVuY3Rpb25cIj09PXIudHlwZShhKX0saXNXaW5kb3c6ZnVuY3Rpb24oYSl7cmV0dXJuIG51bGwhPWEmJmE9PT1hLndpbmRvd30saXNOdW1lcmljOmZ1bmN0aW9uKGEpe3ZhciBiPXIudHlwZShhKTtyZXR1cm4oXCJudW1iZXJcIj09PWJ8fFwic3RyaW5nXCI9PT1iKSYmIWlzTmFOKGEtcGFyc2VGbG9hdChhKSl9LGlzUGxhaW5PYmplY3Q6ZnVuY3Rpb24oYSl7dmFyIGIsYztyZXR1cm4hKCFhfHxcIltvYmplY3QgT2JqZWN0XVwiIT09ay5jYWxsKGEpKSYmKCEoYj1lKGEpKXx8KGM9bC5jYWxsKGIsXCJjb25zdHJ1Y3RvclwiKSYmYi5jb25zdHJ1Y3RvcixcImZ1bmN0aW9uXCI9PXR5cGVvZiBjJiZtLmNhbGwoYyk9PT1uKSl9LGlzRW1wdHlPYmplY3Q6ZnVuY3Rpb24oYSl7dmFyIGI7Zm9yKGIgaW4gYSlyZXR1cm4hMTtyZXR1cm4hMH0sdHlwZTpmdW5jdGlvbihhKXtyZXR1cm4gbnVsbD09YT9hK1wiXCI6XCJvYmplY3RcIj09dHlwZW9mIGF8fFwiZnVuY3Rpb25cIj09dHlwZW9mIGE/altrLmNhbGwoYSldfHxcIm9iamVjdFwiOnR5cGVvZiBhfSxnbG9iYWxFdmFsOmZ1bmN0aW9uKGEpe3AoYSl9LGNhbWVsQ2FzZTpmdW5jdGlvbihhKXtyZXR1cm4gYS5yZXBsYWNlKHQsXCJtcy1cIikucmVwbGFjZSh1LHYpfSxlYWNoOmZ1bmN0aW9uKGEsYil7dmFyIGMsZD0wO2lmKHcoYSkpe2ZvcihjPWEubGVuZ3RoO2Q8YztkKyspaWYoYi5jYWxsKGFbZF0sZCxhW2RdKT09PSExKWJyZWFrfWVsc2UgZm9yKGQgaW4gYSlpZihiLmNhbGwoYVtkXSxkLGFbZF0pPT09ITEpYnJlYWs7cmV0dXJuIGF9LHRyaW06ZnVuY3Rpb24oYSl7cmV0dXJuIG51bGw9PWE/XCJcIjooYStcIlwiKS5yZXBsYWNlKHMsXCJcIil9LG1ha2VBcnJheTpmdW5jdGlvbihhLGIpe3ZhciBjPWJ8fFtdO3JldHVybiBudWxsIT1hJiYodyhPYmplY3QoYSkpP3IubWVyZ2UoYyxcInN0cmluZ1wiPT10eXBlb2YgYT9bYV06YSk6aC5jYWxsKGMsYSkpLGN9LGluQXJyYXk6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiBudWxsPT1iPy0xOmkuY2FsbChiLGEsYyl9LG1lcmdlOmZ1bmN0aW9uKGEsYil7Zm9yKHZhciBjPStiLmxlbmd0aCxkPTAsZT1hLmxlbmd0aDtkPGM7ZCsrKWFbZSsrXT1iW2RdO3JldHVybiBhLmxlbmd0aD1lLGF9LGdyZXA6ZnVuY3Rpb24oYSxiLGMpe2Zvcih2YXIgZCxlPVtdLGY9MCxnPWEubGVuZ3RoLGg9IWM7ZjxnO2YrKylkPSFiKGFbZl0sZiksZCE9PWgmJmUucHVzaChhW2ZdKTtyZXR1cm4gZX0sbWFwOmZ1bmN0aW9uKGEsYixjKXt2YXIgZCxlLGY9MCxoPVtdO2lmKHcoYSkpZm9yKGQ9YS5sZW5ndGg7ZjxkO2YrKyllPWIoYVtmXSxmLGMpLG51bGwhPWUmJmgucHVzaChlKTtlbHNlIGZvcihmIGluIGEpZT1iKGFbZl0sZixjKSxudWxsIT1lJiZoLnB1c2goZSk7cmV0dXJuIGcuYXBwbHkoW10saCl9LGd1aWQ6MSxwcm94eTpmdW5jdGlvbihhLGIpe3ZhciBjLGQsZTtpZihcInN0cmluZ1wiPT10eXBlb2YgYiYmKGM9YVtiXSxiPWEsYT1jKSxyLmlzRnVuY3Rpb24oYSkpcmV0dXJuIGQ9Zi5jYWxsKGFyZ3VtZW50cywyKSxlPWZ1bmN0aW9uKCl7cmV0dXJuIGEuYXBwbHkoYnx8dGhpcyxkLmNvbmNhdChmLmNhbGwoYXJndW1lbnRzKSkpfSxlLmd1aWQ9YS5ndWlkPWEuZ3VpZHx8ci5ndWlkKyssZX0sbm93OkRhdGUubm93LHN1cHBvcnQ6b30pLFwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmKHIuZm5bU3ltYm9sLml0ZXJhdG9yXT1jW1N5bWJvbC5pdGVyYXRvcl0pLHIuZWFjaChcIkJvb2xlYW4gTnVtYmVyIFN0cmluZyBGdW5jdGlvbiBBcnJheSBEYXRlIFJlZ0V4cCBPYmplY3QgRXJyb3IgU3ltYm9sXCIuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKGEsYil7altcIltvYmplY3QgXCIrYitcIl1cIl09Yi50b0xvd2VyQ2FzZSgpfSk7ZnVuY3Rpb24gdyhhKXt2YXIgYj0hIWEmJlwibGVuZ3RoXCJpbiBhJiZhLmxlbmd0aCxjPXIudHlwZShhKTtyZXR1cm5cImZ1bmN0aW9uXCIhPT1jJiYhci5pc1dpbmRvdyhhKSYmKFwiYXJyYXlcIj09PWN8fDA9PT1ifHxcIm51bWJlclwiPT10eXBlb2YgYiYmYj4wJiZiLTEgaW4gYSl9dmFyIHg9ZnVuY3Rpb24oYSl7dmFyIGIsYyxkLGUsZixnLGgsaSxqLGssbCxtLG4sbyxwLHEscixzLHQsdT1cInNpenpsZVwiKzEqbmV3IERhdGUsdj1hLmRvY3VtZW50LHc9MCx4PTAseT1oYSgpLHo9aGEoKSxBPWhhKCksQj1mdW5jdGlvbihhLGIpe3JldHVybiBhPT09YiYmKGw9ITApLDB9LEM9e30uaGFzT3duUHJvcGVydHksRD1bXSxFPUQucG9wLEY9RC5wdXNoLEc9RC5wdXNoLEg9RC5zbGljZSxJPWZ1bmN0aW9uKGEsYil7Zm9yKHZhciBjPTAsZD1hLmxlbmd0aDtjPGQ7YysrKWlmKGFbY109PT1iKXJldHVybiBjO3JldHVybi0xfSxKPVwiY2hlY2tlZHxzZWxlY3RlZHxhc3luY3xhdXRvZm9jdXN8YXV0b3BsYXl8Y29udHJvbHN8ZGVmZXJ8ZGlzYWJsZWR8aGlkZGVufGlzbWFwfGxvb3B8bXVsdGlwbGV8b3BlbnxyZWFkb25seXxyZXF1aXJlZHxzY29wZWRcIixLPVwiW1xcXFx4MjBcXFxcdFxcXFxyXFxcXG5cXFxcZl1cIixMPVwiKD86XFxcXFxcXFwufFtcXFxcdy1dfFteXFwwLVxcXFx4YTBdKStcIixNPVwiXFxcXFtcIitLK1wiKihcIitMK1wiKSg/OlwiK0srXCIqKFsqXiR8IX5dPz0pXCIrSytcIiooPzonKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcJ10pKiknfFxcXCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFxcXFwiXSkqKVxcXCJ8KFwiK0wrXCIpKXwpXCIrSytcIipcXFxcXVwiLE49XCI6KFwiK0wrXCIpKD86XFxcXCgoKCcoKD86XFxcXFxcXFwufFteXFxcXFxcXFwnXSkqKSd8XFxcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXFxcXCJdKSopXFxcIil8KCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcKClbXFxcXF1dfFwiK00rXCIpKil8LiopXFxcXCl8KVwiLE89bmV3IFJlZ0V4cChLK1wiK1wiLFwiZ1wiKSxQPW5ldyBSZWdFeHAoXCJeXCIrSytcIit8KCg/Ol58W15cXFxcXFxcXF0pKD86XFxcXFxcXFwuKSopXCIrSytcIiskXCIsXCJnXCIpLFE9bmV3IFJlZ0V4cChcIl5cIitLK1wiKixcIitLK1wiKlwiKSxSPW5ldyBSZWdFeHAoXCJeXCIrSytcIiooWz4rfl18XCIrSytcIilcIitLK1wiKlwiKSxTPW5ldyBSZWdFeHAoXCI9XCIrSytcIiooW15cXFxcXSdcXFwiXSo/KVwiK0srXCIqXFxcXF1cIixcImdcIiksVD1uZXcgUmVnRXhwKE4pLFU9bmV3IFJlZ0V4cChcIl5cIitMK1wiJFwiKSxWPXtJRDpuZXcgUmVnRXhwKFwiXiMoXCIrTCtcIilcIiksQ0xBU1M6bmV3IFJlZ0V4cChcIl5cXFxcLihcIitMK1wiKVwiKSxUQUc6bmV3IFJlZ0V4cChcIl4oXCIrTCtcInxbKl0pXCIpLEFUVFI6bmV3IFJlZ0V4cChcIl5cIitNKSxQU0VVRE86bmV3IFJlZ0V4cChcIl5cIitOKSxDSElMRDpuZXcgUmVnRXhwKFwiXjoob25seXxmaXJzdHxsYXN0fG50aHxudGgtbGFzdCktKGNoaWxkfG9mLXR5cGUpKD86XFxcXChcIitLK1wiKihldmVufG9kZHwoKFsrLV18KShcXFxcZCopbnwpXCIrSytcIiooPzooWystXXwpXCIrSytcIiooXFxcXGQrKXwpKVwiK0srXCIqXFxcXCl8KVwiLFwiaVwiKSxib29sOm5ldyBSZWdFeHAoXCJeKD86XCIrSitcIikkXCIsXCJpXCIpLG5lZWRzQ29udGV4dDpuZXcgUmVnRXhwKFwiXlwiK0srXCIqWz4rfl18OihldmVufG9kZHxlcXxndHxsdHxudGh8Zmlyc3R8bGFzdCkoPzpcXFxcKFwiK0srXCIqKCg/Oi1cXFxcZCk/XFxcXGQqKVwiK0srXCIqXFxcXCl8KSg/PVteLV18JClcIixcImlcIil9LFc9L14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8YnV0dG9uKSQvaSxYPS9eaFxcZCQvaSxZPS9eW157XStcXHtcXHMqXFxbbmF0aXZlIFxcdy8sWj0vXig/OiMoW1xcdy1dKyl8KFxcdyspfFxcLihbXFx3LV0rKSkkLywkPS9bK35dLyxfPW5ldyBSZWdFeHAoXCJcXFxcXFxcXChbXFxcXGRhLWZdezEsNn1cIitLK1wiP3woXCIrSytcIil8LilcIixcImlnXCIpLGFhPWZ1bmN0aW9uKGEsYixjKXt2YXIgZD1cIjB4XCIrYi02NTUzNjtyZXR1cm4gZCE9PWR8fGM/YjpkPDA/U3RyaW5nLmZyb21DaGFyQ29kZShkKzY1NTM2KTpTdHJpbmcuZnJvbUNoYXJDb2RlKGQ+PjEwfDU1Mjk2LDEwMjMmZHw1NjMyMCl9LGJhPS8oW1xcMC1cXHgxZlxceDdmXXxeLT9cXGQpfF4tJHxbXlxcMC1cXHgxZlxceDdmLVxcdUZGRkZcXHctXS9nLGNhPWZ1bmN0aW9uKGEsYil7cmV0dXJuIGI/XCJcXDBcIj09PWE/XCJcXHVmZmZkXCI6YS5zbGljZSgwLC0xKStcIlxcXFxcIithLmNoYXJDb2RlQXQoYS5sZW5ndGgtMSkudG9TdHJpbmcoMTYpK1wiIFwiOlwiXFxcXFwiK2F9LGRhPWZ1bmN0aW9uKCl7bSgpfSxlYT10YShmdW5jdGlvbihhKXtyZXR1cm4gYS5kaXNhYmxlZD09PSEwJiYoXCJmb3JtXCJpbiBhfHxcImxhYmVsXCJpbiBhKX0se2RpcjpcInBhcmVudE5vZGVcIixuZXh0OlwibGVnZW5kXCJ9KTt0cnl7Ry5hcHBseShEPUguY2FsbCh2LmNoaWxkTm9kZXMpLHYuY2hpbGROb2RlcyksRFt2LmNoaWxkTm9kZXMubGVuZ3RoXS5ub2RlVHlwZX1jYXRjaChmYSl7Rz17YXBwbHk6RC5sZW5ndGg/ZnVuY3Rpb24oYSxiKXtGLmFwcGx5KGEsSC5jYWxsKGIpKX06ZnVuY3Rpb24oYSxiKXt2YXIgYz1hLmxlbmd0aCxkPTA7d2hpbGUoYVtjKytdPWJbZCsrXSk7YS5sZW5ndGg9Yy0xfX19ZnVuY3Rpb24gZ2EoYSxiLGQsZSl7dmFyIGYsaCxqLGssbCxvLHIscz1iJiZiLm93bmVyRG9jdW1lbnQsdz1iP2Iubm9kZVR5cGU6OTtpZihkPWR8fFtdLFwic3RyaW5nXCIhPXR5cGVvZiBhfHwhYXx8MSE9PXcmJjkhPT13JiYxMSE9PXcpcmV0dXJuIGQ7aWYoIWUmJigoYj9iLm93bmVyRG9jdW1lbnR8fGI6dikhPT1uJiZtKGIpLGI9Ynx8bixwKSl7aWYoMTEhPT13JiYobD1aLmV4ZWMoYSkpKWlmKGY9bFsxXSl7aWYoOT09PXcpe2lmKCEoaj1iLmdldEVsZW1lbnRCeUlkKGYpKSlyZXR1cm4gZDtpZihqLmlkPT09ZilyZXR1cm4gZC5wdXNoKGopLGR9ZWxzZSBpZihzJiYoaj1zLmdldEVsZW1lbnRCeUlkKGYpKSYmdChiLGopJiZqLmlkPT09ZilyZXR1cm4gZC5wdXNoKGopLGR9ZWxzZXtpZihsWzJdKXJldHVybiBHLmFwcGx5KGQsYi5nZXRFbGVtZW50c0J5VGFnTmFtZShhKSksZDtpZigoZj1sWzNdKSYmYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lJiZiLmdldEVsZW1lbnRzQnlDbGFzc05hbWUpcmV0dXJuIEcuYXBwbHkoZCxiLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoZikpLGR9aWYoYy5xc2EmJiFBW2ErXCIgXCJdJiYoIXF8fCFxLnRlc3QoYSkpKXtpZigxIT09dylzPWIscj1hO2Vsc2UgaWYoXCJvYmplY3RcIiE9PWIubm9kZU5hbWUudG9Mb3dlckNhc2UoKSl7KGs9Yi5nZXRBdHRyaWJ1dGUoXCJpZFwiKSk/az1rLnJlcGxhY2UoYmEsY2EpOmIuc2V0QXR0cmlidXRlKFwiaWRcIixrPXUpLG89ZyhhKSxoPW8ubGVuZ3RoO3doaWxlKGgtLSlvW2hdPVwiI1wiK2srXCIgXCIrc2Eob1toXSk7cj1vLmpvaW4oXCIsXCIpLHM9JC50ZXN0KGEpJiZxYShiLnBhcmVudE5vZGUpfHxifWlmKHIpdHJ5e3JldHVybiBHLmFwcGx5KGQscy5xdWVyeVNlbGVjdG9yQWxsKHIpKSxkfWNhdGNoKHgpe31maW5hbGx5e2s9PT11JiZiLnJlbW92ZUF0dHJpYnV0ZShcImlkXCIpfX19cmV0dXJuIGkoYS5yZXBsYWNlKFAsXCIkMVwiKSxiLGQsZSl9ZnVuY3Rpb24gaGEoKXt2YXIgYT1bXTtmdW5jdGlvbiBiKGMsZSl7cmV0dXJuIGEucHVzaChjK1wiIFwiKT5kLmNhY2hlTGVuZ3RoJiZkZWxldGUgYlthLnNoaWZ0KCldLGJbYytcIiBcIl09ZX1yZXR1cm4gYn1mdW5jdGlvbiBpYShhKXtyZXR1cm4gYVt1XT0hMCxhfWZ1bmN0aW9uIGphKGEpe3ZhciBiPW4uY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpO3RyeXtyZXR1cm4hIWEoYil9Y2F0Y2goYyl7cmV0dXJuITF9ZmluYWxseXtiLnBhcmVudE5vZGUmJmIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChiKSxiPW51bGx9fWZ1bmN0aW9uIGthKGEsYil7dmFyIGM9YS5zcGxpdChcInxcIiksZT1jLmxlbmd0aDt3aGlsZShlLS0pZC5hdHRySGFuZGxlW2NbZV1dPWJ9ZnVuY3Rpb24gbGEoYSxiKXt2YXIgYz1iJiZhLGQ9YyYmMT09PWEubm9kZVR5cGUmJjE9PT1iLm5vZGVUeXBlJiZhLnNvdXJjZUluZGV4LWIuc291cmNlSW5kZXg7aWYoZClyZXR1cm4gZDtpZihjKXdoaWxlKGM9Yy5uZXh0U2libGluZylpZihjPT09YilyZXR1cm4tMTtyZXR1cm4gYT8xOi0xfWZ1bmN0aW9uIG1hKGEpe3JldHVybiBmdW5jdGlvbihiKXt2YXIgYz1iLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7cmV0dXJuXCJpbnB1dFwiPT09YyYmYi50eXBlPT09YX19ZnVuY3Rpb24gbmEoYSl7cmV0dXJuIGZ1bmN0aW9uKGIpe3ZhciBjPWIubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtyZXR1cm4oXCJpbnB1dFwiPT09Y3x8XCJidXR0b25cIj09PWMpJiZiLnR5cGU9PT1hfX1mdW5jdGlvbiBvYShhKXtyZXR1cm4gZnVuY3Rpb24oYil7cmV0dXJuXCJmb3JtXCJpbiBiP2IucGFyZW50Tm9kZSYmYi5kaXNhYmxlZD09PSExP1wibGFiZWxcImluIGI/XCJsYWJlbFwiaW4gYi5wYXJlbnROb2RlP2IucGFyZW50Tm9kZS5kaXNhYmxlZD09PWE6Yi5kaXNhYmxlZD09PWE6Yi5pc0Rpc2FibGVkPT09YXx8Yi5pc0Rpc2FibGVkIT09IWEmJmVhKGIpPT09YTpiLmRpc2FibGVkPT09YTpcImxhYmVsXCJpbiBiJiZiLmRpc2FibGVkPT09YX19ZnVuY3Rpb24gcGEoYSl7cmV0dXJuIGlhKGZ1bmN0aW9uKGIpe3JldHVybiBiPStiLGlhKGZ1bmN0aW9uKGMsZCl7dmFyIGUsZj1hKFtdLGMubGVuZ3RoLGIpLGc9Zi5sZW5ndGg7d2hpbGUoZy0tKWNbZT1mW2ddXSYmKGNbZV09IShkW2VdPWNbZV0pKX0pfSl9ZnVuY3Rpb24gcWEoYSl7cmV0dXJuIGEmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBhLmdldEVsZW1lbnRzQnlUYWdOYW1lJiZhfWM9Z2Euc3VwcG9ydD17fSxmPWdhLmlzWE1MPWZ1bmN0aW9uKGEpe3ZhciBiPWEmJihhLm93bmVyRG9jdW1lbnR8fGEpLmRvY3VtZW50RWxlbWVudDtyZXR1cm4hIWImJlwiSFRNTFwiIT09Yi5ub2RlTmFtZX0sbT1nYS5zZXREb2N1bWVudD1mdW5jdGlvbihhKXt2YXIgYixlLGc9YT9hLm93bmVyRG9jdW1lbnR8fGE6djtyZXR1cm4gZyE9PW4mJjk9PT1nLm5vZGVUeXBlJiZnLmRvY3VtZW50RWxlbWVudD8obj1nLG89bi5kb2N1bWVudEVsZW1lbnQscD0hZihuKSx2IT09biYmKGU9bi5kZWZhdWx0VmlldykmJmUudG9wIT09ZSYmKGUuYWRkRXZlbnRMaXN0ZW5lcj9lLmFkZEV2ZW50TGlzdGVuZXIoXCJ1bmxvYWRcIixkYSwhMSk6ZS5hdHRhY2hFdmVudCYmZS5hdHRhY2hFdmVudChcIm9udW5sb2FkXCIsZGEpKSxjLmF0dHJpYnV0ZXM9amEoZnVuY3Rpb24oYSl7cmV0dXJuIGEuY2xhc3NOYW1lPVwiaVwiLCFhLmdldEF0dHJpYnV0ZShcImNsYXNzTmFtZVwiKX0pLGMuZ2V0RWxlbWVudHNCeVRhZ05hbWU9amEoZnVuY3Rpb24oYSl7cmV0dXJuIGEuYXBwZW5kQ2hpbGQobi5jcmVhdGVDb21tZW50KFwiXCIpKSwhYS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIikubGVuZ3RofSksYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lPVkudGVzdChuLmdldEVsZW1lbnRzQnlDbGFzc05hbWUpLGMuZ2V0QnlJZD1qYShmdW5jdGlvbihhKXtyZXR1cm4gby5hcHBlbmRDaGlsZChhKS5pZD11LCFuLmdldEVsZW1lbnRzQnlOYW1lfHwhbi5nZXRFbGVtZW50c0J5TmFtZSh1KS5sZW5ndGh9KSxjLmdldEJ5SWQ/KGQuZmlsdGVyLklEPWZ1bmN0aW9uKGEpe3ZhciBiPWEucmVwbGFjZShfLGFhKTtyZXR1cm4gZnVuY3Rpb24oYSl7cmV0dXJuIGEuZ2V0QXR0cmlidXRlKFwiaWRcIik9PT1ifX0sZC5maW5kLklEPWZ1bmN0aW9uKGEsYil7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGIuZ2V0RWxlbWVudEJ5SWQmJnApe3ZhciBjPWIuZ2V0RWxlbWVudEJ5SWQoYSk7cmV0dXJuIGM/W2NdOltdfX0pOihkLmZpbHRlci5JRD1mdW5jdGlvbihhKXt2YXIgYj1hLnJlcGxhY2UoXyxhYSk7cmV0dXJuIGZ1bmN0aW9uKGEpe3ZhciBjPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBhLmdldEF0dHJpYnV0ZU5vZGUmJmEuZ2V0QXR0cmlidXRlTm9kZShcImlkXCIpO3JldHVybiBjJiZjLnZhbHVlPT09Yn19LGQuZmluZC5JRD1mdW5jdGlvbihhLGIpe2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBiLmdldEVsZW1lbnRCeUlkJiZwKXt2YXIgYyxkLGUsZj1iLmdldEVsZW1lbnRCeUlkKGEpO2lmKGYpe2lmKGM9Zi5nZXRBdHRyaWJ1dGVOb2RlKFwiaWRcIiksYyYmYy52YWx1ZT09PWEpcmV0dXJuW2ZdO2U9Yi5nZXRFbGVtZW50c0J5TmFtZShhKSxkPTA7d2hpbGUoZj1lW2QrK10paWYoYz1mLmdldEF0dHJpYnV0ZU5vZGUoXCJpZFwiKSxjJiZjLnZhbHVlPT09YSlyZXR1cm5bZl19cmV0dXJuW119fSksZC5maW5kLlRBRz1jLmdldEVsZW1lbnRzQnlUYWdOYW1lP2Z1bmN0aW9uKGEsYil7cmV0dXJuXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGIuZ2V0RWxlbWVudHNCeVRhZ05hbWU/Yi5nZXRFbGVtZW50c0J5VGFnTmFtZShhKTpjLnFzYT9iLnF1ZXJ5U2VsZWN0b3JBbGwoYSk6dm9pZCAwfTpmdW5jdGlvbihhLGIpe3ZhciBjLGQ9W10sZT0wLGY9Yi5nZXRFbGVtZW50c0J5VGFnTmFtZShhKTtpZihcIipcIj09PWEpe3doaWxlKGM9ZltlKytdKTE9PT1jLm5vZGVUeXBlJiZkLnB1c2goYyk7cmV0dXJuIGR9cmV0dXJuIGZ9LGQuZmluZC5DTEFTUz1jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUmJmZ1bmN0aW9uKGEsYil7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSYmcClyZXR1cm4gYi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGEpfSxyPVtdLHE9W10sKGMucXNhPVkudGVzdChuLnF1ZXJ5U2VsZWN0b3JBbGwpKSYmKGphKGZ1bmN0aW9uKGEpe28uYXBwZW5kQ2hpbGQoYSkuaW5uZXJIVE1MPVwiPGEgaWQ9J1wiK3UrXCInPjwvYT48c2VsZWN0IGlkPSdcIit1K1wiLVxcclxcXFwnIG1zYWxsb3djYXB0dXJlPScnPjxvcHRpb24gc2VsZWN0ZWQ9Jyc+PC9vcHRpb24+PC9zZWxlY3Q+XCIsYS5xdWVyeVNlbGVjdG9yQWxsKFwiW21zYWxsb3djYXB0dXJlXj0nJ11cIikubGVuZ3RoJiZxLnB1c2goXCJbKl4kXT1cIitLK1wiKig/OicnfFxcXCJcXFwiKVwiKSxhLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbc2VsZWN0ZWRdXCIpLmxlbmd0aHx8cS5wdXNoKFwiXFxcXFtcIitLK1wiKig/OnZhbHVlfFwiK0orXCIpXCIpLGEucXVlcnlTZWxlY3RvckFsbChcIltpZH49XCIrdStcIi1dXCIpLmxlbmd0aHx8cS5wdXNoKFwifj1cIiksYS5xdWVyeVNlbGVjdG9yQWxsKFwiOmNoZWNrZWRcIikubGVuZ3RofHxxLnB1c2goXCI6Y2hlY2tlZFwiKSxhLnF1ZXJ5U2VsZWN0b3JBbGwoXCJhI1wiK3UrXCIrKlwiKS5sZW5ndGh8fHEucHVzaChcIi4jLitbK35dXCIpfSksamEoZnVuY3Rpb24oYSl7YS5pbm5lckhUTUw9XCI8YSBocmVmPScnIGRpc2FibGVkPSdkaXNhYmxlZCc+PC9hPjxzZWxlY3QgZGlzYWJsZWQ9J2Rpc2FibGVkJz48b3B0aW9uLz48L3NlbGVjdD5cIjt2YXIgYj1uLmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtiLnNldEF0dHJpYnV0ZShcInR5cGVcIixcImhpZGRlblwiKSxhLmFwcGVuZENoaWxkKGIpLnNldEF0dHJpYnV0ZShcIm5hbWVcIixcIkRcIiksYS5xdWVyeVNlbGVjdG9yQWxsKFwiW25hbWU9ZF1cIikubGVuZ3RoJiZxLnB1c2goXCJuYW1lXCIrSytcIipbKl4kfCF+XT89XCIpLDIhPT1hLnF1ZXJ5U2VsZWN0b3JBbGwoXCI6ZW5hYmxlZFwiKS5sZW5ndGgmJnEucHVzaChcIjplbmFibGVkXCIsXCI6ZGlzYWJsZWRcIiksby5hcHBlbmRDaGlsZChhKS5kaXNhYmxlZD0hMCwyIT09YS5xdWVyeVNlbGVjdG9yQWxsKFwiOmRpc2FibGVkXCIpLmxlbmd0aCYmcS5wdXNoKFwiOmVuYWJsZWRcIixcIjpkaXNhYmxlZFwiKSxhLnF1ZXJ5U2VsZWN0b3JBbGwoXCIqLDp4XCIpLHEucHVzaChcIiwuKjpcIil9KSksKGMubWF0Y2hlc1NlbGVjdG9yPVkudGVzdChzPW8ubWF0Y2hlc3x8by53ZWJraXRNYXRjaGVzU2VsZWN0b3J8fG8ubW96TWF0Y2hlc1NlbGVjdG9yfHxvLm9NYXRjaGVzU2VsZWN0b3J8fG8ubXNNYXRjaGVzU2VsZWN0b3IpKSYmamEoZnVuY3Rpb24oYSl7Yy5kaXNjb25uZWN0ZWRNYXRjaD1zLmNhbGwoYSxcIipcIikscy5jYWxsKGEsXCJbcyE9JyddOnhcIiksci5wdXNoKFwiIT1cIixOKX0pLHE9cS5sZW5ndGgmJm5ldyBSZWdFeHAocS5qb2luKFwifFwiKSkscj1yLmxlbmd0aCYmbmV3IFJlZ0V4cChyLmpvaW4oXCJ8XCIpKSxiPVkudGVzdChvLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKSx0PWJ8fFkudGVzdChvLmNvbnRhaW5zKT9mdW5jdGlvbihhLGIpe3ZhciBjPTk9PT1hLm5vZGVUeXBlP2EuZG9jdW1lbnRFbGVtZW50OmEsZD1iJiZiLnBhcmVudE5vZGU7cmV0dXJuIGE9PT1kfHwhKCFkfHwxIT09ZC5ub2RlVHlwZXx8IShjLmNvbnRhaW5zP2MuY29udGFpbnMoZCk6YS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiYmMTYmYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihkKSkpfTpmdW5jdGlvbihhLGIpe2lmKGIpd2hpbGUoYj1iLnBhcmVudE5vZGUpaWYoYj09PWEpcmV0dXJuITA7cmV0dXJuITF9LEI9Yj9mdW5jdGlvbihhLGIpe2lmKGE9PT1iKXJldHVybiBsPSEwLDA7dmFyIGQ9IWEuY29tcGFyZURvY3VtZW50UG9zaXRpb24tIWIuY29tcGFyZURvY3VtZW50UG9zaXRpb247cmV0dXJuIGQ/ZDooZD0oYS5vd25lckRvY3VtZW50fHxhKT09PShiLm93bmVyRG9jdW1lbnR8fGIpP2EuY29tcGFyZURvY3VtZW50UG9zaXRpb24oYik6MSwxJmR8fCFjLnNvcnREZXRhY2hlZCYmYi5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihhKT09PWQ/YT09PW58fGEub3duZXJEb2N1bWVudD09PXYmJnQodixhKT8tMTpiPT09bnx8Yi5vd25lckRvY3VtZW50PT09diYmdCh2LGIpPzE6az9JKGssYSktSShrLGIpOjA6NCZkPy0xOjEpfTpmdW5jdGlvbihhLGIpe2lmKGE9PT1iKXJldHVybiBsPSEwLDA7dmFyIGMsZD0wLGU9YS5wYXJlbnROb2RlLGY9Yi5wYXJlbnROb2RlLGc9W2FdLGg9W2JdO2lmKCFlfHwhZilyZXR1cm4gYT09PW4/LTE6Yj09PW4/MTplPy0xOmY/MTprP0koayxhKS1JKGssYik6MDtpZihlPT09ZilyZXR1cm4gbGEoYSxiKTtjPWE7d2hpbGUoYz1jLnBhcmVudE5vZGUpZy51bnNoaWZ0KGMpO2M9Yjt3aGlsZShjPWMucGFyZW50Tm9kZSloLnVuc2hpZnQoYyk7d2hpbGUoZ1tkXT09PWhbZF0pZCsrO3JldHVybiBkP2xhKGdbZF0saFtkXSk6Z1tkXT09PXY/LTE6aFtkXT09PXY/MTowfSxuKTpufSxnYS5tYXRjaGVzPWZ1bmN0aW9uKGEsYil7cmV0dXJuIGdhKGEsbnVsbCxudWxsLGIpfSxnYS5tYXRjaGVzU2VsZWN0b3I9ZnVuY3Rpb24oYSxiKXtpZigoYS5vd25lckRvY3VtZW50fHxhKSE9PW4mJm0oYSksYj1iLnJlcGxhY2UoUyxcIj0nJDEnXVwiKSxjLm1hdGNoZXNTZWxlY3RvciYmcCYmIUFbYitcIiBcIl0mJighcnx8IXIudGVzdChiKSkmJighcXx8IXEudGVzdChiKSkpdHJ5e3ZhciBkPXMuY2FsbChhLGIpO2lmKGR8fGMuZGlzY29ubmVjdGVkTWF0Y2h8fGEuZG9jdW1lbnQmJjExIT09YS5kb2N1bWVudC5ub2RlVHlwZSlyZXR1cm4gZH1jYXRjaChlKXt9cmV0dXJuIGdhKGIsbixudWxsLFthXSkubGVuZ3RoPjB9LGdhLmNvbnRhaW5zPWZ1bmN0aW9uKGEsYil7cmV0dXJuKGEub3duZXJEb2N1bWVudHx8YSkhPT1uJiZtKGEpLHQoYSxiKX0sZ2EuYXR0cj1mdW5jdGlvbihhLGIpeyhhLm93bmVyRG9jdW1lbnR8fGEpIT09biYmbShhKTt2YXIgZT1kLmF0dHJIYW5kbGVbYi50b0xvd2VyQ2FzZSgpXSxmPWUmJkMuY2FsbChkLmF0dHJIYW5kbGUsYi50b0xvd2VyQ2FzZSgpKT9lKGEsYiwhcCk6dm9pZCAwO3JldHVybiB2b2lkIDAhPT1mP2Y6Yy5hdHRyaWJ1dGVzfHwhcD9hLmdldEF0dHJpYnV0ZShiKTooZj1hLmdldEF0dHJpYnV0ZU5vZGUoYikpJiZmLnNwZWNpZmllZD9mLnZhbHVlOm51bGx9LGdhLmVzY2FwZT1mdW5jdGlvbihhKXtyZXR1cm4oYStcIlwiKS5yZXBsYWNlKGJhLGNhKX0sZ2EuZXJyb3I9ZnVuY3Rpb24oYSl7dGhyb3cgbmV3IEVycm9yKFwiU3ludGF4IGVycm9yLCB1bnJlY29nbml6ZWQgZXhwcmVzc2lvbjogXCIrYSl9LGdhLnVuaXF1ZVNvcnQ9ZnVuY3Rpb24oYSl7dmFyIGIsZD1bXSxlPTAsZj0wO2lmKGw9IWMuZGV0ZWN0RHVwbGljYXRlcyxrPSFjLnNvcnRTdGFibGUmJmEuc2xpY2UoMCksYS5zb3J0KEIpLGwpe3doaWxlKGI9YVtmKytdKWI9PT1hW2ZdJiYoZT1kLnB1c2goZikpO3doaWxlKGUtLSlhLnNwbGljZShkW2VdLDEpfXJldHVybiBrPW51bGwsYX0sZT1nYS5nZXRUZXh0PWZ1bmN0aW9uKGEpe3ZhciBiLGM9XCJcIixkPTAsZj1hLm5vZGVUeXBlO2lmKGYpe2lmKDE9PT1mfHw5PT09Znx8MTE9PT1mKXtpZihcInN0cmluZ1wiPT10eXBlb2YgYS50ZXh0Q29udGVudClyZXR1cm4gYS50ZXh0Q29udGVudDtmb3IoYT1hLmZpcnN0Q2hpbGQ7YTthPWEubmV4dFNpYmxpbmcpYys9ZShhKX1lbHNlIGlmKDM9PT1mfHw0PT09ZilyZXR1cm4gYS5ub2RlVmFsdWV9ZWxzZSB3aGlsZShiPWFbZCsrXSljKz1lKGIpO3JldHVybiBjfSxkPWdhLnNlbGVjdG9ycz17Y2FjaGVMZW5ndGg6NTAsY3JlYXRlUHNldWRvOmlhLG1hdGNoOlYsYXR0ckhhbmRsZTp7fSxmaW5kOnt9LHJlbGF0aXZlOntcIj5cIjp7ZGlyOlwicGFyZW50Tm9kZVwiLGZpcnN0OiEwfSxcIiBcIjp7ZGlyOlwicGFyZW50Tm9kZVwifSxcIitcIjp7ZGlyOlwicHJldmlvdXNTaWJsaW5nXCIsZmlyc3Q6ITB9LFwiflwiOntkaXI6XCJwcmV2aW91c1NpYmxpbmdcIn19LHByZUZpbHRlcjp7QVRUUjpmdW5jdGlvbihhKXtyZXR1cm4gYVsxXT1hWzFdLnJlcGxhY2UoXyxhYSksYVszXT0oYVszXXx8YVs0XXx8YVs1XXx8XCJcIikucmVwbGFjZShfLGFhKSxcIn49XCI9PT1hWzJdJiYoYVszXT1cIiBcIithWzNdK1wiIFwiKSxhLnNsaWNlKDAsNCl9LENISUxEOmZ1bmN0aW9uKGEpe3JldHVybiBhWzFdPWFbMV0udG9Mb3dlckNhc2UoKSxcIm50aFwiPT09YVsxXS5zbGljZSgwLDMpPyhhWzNdfHxnYS5lcnJvcihhWzBdKSxhWzRdPSsoYVs0XT9hWzVdKyhhWzZdfHwxKToyKihcImV2ZW5cIj09PWFbM118fFwib2RkXCI9PT1hWzNdKSksYVs1XT0rKGFbN10rYVs4XXx8XCJvZGRcIj09PWFbM10pKTphWzNdJiZnYS5lcnJvcihhWzBdKSxhfSxQU0VVRE86ZnVuY3Rpb24oYSl7dmFyIGIsYz0hYVs2XSYmYVsyXTtyZXR1cm4gVi5DSElMRC50ZXN0KGFbMF0pP251bGw6KGFbM10/YVsyXT1hWzRdfHxhWzVdfHxcIlwiOmMmJlQudGVzdChjKSYmKGI9ZyhjLCEwKSkmJihiPWMuaW5kZXhPZihcIilcIixjLmxlbmd0aC1iKS1jLmxlbmd0aCkmJihhWzBdPWFbMF0uc2xpY2UoMCxiKSxhWzJdPWMuc2xpY2UoMCxiKSksYS5zbGljZSgwLDMpKX19LGZpbHRlcjp7VEFHOmZ1bmN0aW9uKGEpe3ZhciBiPWEucmVwbGFjZShfLGFhKS50b0xvd2VyQ2FzZSgpO3JldHVyblwiKlwiPT09YT9mdW5jdGlvbigpe3JldHVybiEwfTpmdW5jdGlvbihhKXtyZXR1cm4gYS5ub2RlTmFtZSYmYS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpPT09Yn19LENMQVNTOmZ1bmN0aW9uKGEpe3ZhciBiPXlbYStcIiBcIl07cmV0dXJuIGJ8fChiPW5ldyBSZWdFeHAoXCIoXnxcIitLK1wiKVwiK2ErXCIoXCIrSytcInwkKVwiKSkmJnkoYSxmdW5jdGlvbihhKXtyZXR1cm4gYi50ZXN0KFwic3RyaW5nXCI9PXR5cGVvZiBhLmNsYXNzTmFtZSYmYS5jbGFzc05hbWV8fFwidW5kZWZpbmVkXCIhPXR5cGVvZiBhLmdldEF0dHJpYnV0ZSYmYS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKXx8XCJcIil9KX0sQVRUUjpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIGZ1bmN0aW9uKGQpe3ZhciBlPWdhLmF0dHIoZCxhKTtyZXR1cm4gbnVsbD09ZT9cIiE9XCI9PT1iOiFifHwoZSs9XCJcIixcIj1cIj09PWI/ZT09PWM6XCIhPVwiPT09Yj9lIT09YzpcIl49XCI9PT1iP2MmJjA9PT1lLmluZGV4T2YoYyk6XCIqPVwiPT09Yj9jJiZlLmluZGV4T2YoYyk+LTE6XCIkPVwiPT09Yj9jJiZlLnNsaWNlKC1jLmxlbmd0aCk9PT1jOlwifj1cIj09PWI/KFwiIFwiK2UucmVwbGFjZShPLFwiIFwiKStcIiBcIikuaW5kZXhPZihjKT4tMTpcInw9XCI9PT1iJiYoZT09PWN8fGUuc2xpY2UoMCxjLmxlbmd0aCsxKT09PWMrXCItXCIpKX19LENISUxEOmZ1bmN0aW9uKGEsYixjLGQsZSl7dmFyIGY9XCJudGhcIiE9PWEuc2xpY2UoMCwzKSxnPVwibGFzdFwiIT09YS5zbGljZSgtNCksaD1cIm9mLXR5cGVcIj09PWI7cmV0dXJuIDE9PT1kJiYwPT09ZT9mdW5jdGlvbihhKXtyZXR1cm4hIWEucGFyZW50Tm9kZX06ZnVuY3Rpb24oYixjLGkpe3ZhciBqLGssbCxtLG4sbyxwPWYhPT1nP1wibmV4dFNpYmxpbmdcIjpcInByZXZpb3VzU2libGluZ1wiLHE9Yi5wYXJlbnROb2RlLHI9aCYmYi5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpLHM9IWkmJiFoLHQ9ITE7aWYocSl7aWYoZil7d2hpbGUocCl7bT1iO3doaWxlKG09bVtwXSlpZihoP20ubm9kZU5hbWUudG9Mb3dlckNhc2UoKT09PXI6MT09PW0ubm9kZVR5cGUpcmV0dXJuITE7bz1wPVwib25seVwiPT09YSYmIW8mJlwibmV4dFNpYmxpbmdcIn1yZXR1cm4hMH1pZihvPVtnP3EuZmlyc3RDaGlsZDpxLmxhc3RDaGlsZF0sZyYmcyl7bT1xLGw9bVt1XXx8KG1bdV09e30pLGs9bFttLnVuaXF1ZUlEXXx8KGxbbS51bmlxdWVJRF09e30pLGo9a1thXXx8W10sbj1qWzBdPT09dyYmalsxXSx0PW4mJmpbMl0sbT1uJiZxLmNoaWxkTm9kZXNbbl07d2hpbGUobT0rK24mJm0mJm1bcF18fCh0PW49MCl8fG8ucG9wKCkpaWYoMT09PW0ubm9kZVR5cGUmJisrdCYmbT09PWIpe2tbYV09W3csbix0XTticmVha319ZWxzZSBpZihzJiYobT1iLGw9bVt1XXx8KG1bdV09e30pLGs9bFttLnVuaXF1ZUlEXXx8KGxbbS51bmlxdWVJRF09e30pLGo9a1thXXx8W10sbj1qWzBdPT09dyYmalsxXSx0PW4pLHQ9PT0hMSl3aGlsZShtPSsrbiYmbSYmbVtwXXx8KHQ9bj0wKXx8by5wb3AoKSlpZigoaD9tLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk9PT1yOjE9PT1tLm5vZGVUeXBlKSYmKyt0JiYocyYmKGw9bVt1XXx8KG1bdV09e30pLGs9bFttLnVuaXF1ZUlEXXx8KGxbbS51bmlxdWVJRF09e30pLGtbYV09W3csdF0pLG09PT1iKSlicmVhaztyZXR1cm4gdC09ZSx0PT09ZHx8dCVkPT09MCYmdC9kPj0wfX19LFBTRVVETzpmdW5jdGlvbihhLGIpe3ZhciBjLGU9ZC5wc2V1ZG9zW2FdfHxkLnNldEZpbHRlcnNbYS50b0xvd2VyQ2FzZSgpXXx8Z2EuZXJyb3IoXCJ1bnN1cHBvcnRlZCBwc2V1ZG86IFwiK2EpO3JldHVybiBlW3VdP2UoYik6ZS5sZW5ndGg+MT8oYz1bYSxhLFwiXCIsYl0sZC5zZXRGaWx0ZXJzLmhhc093blByb3BlcnR5KGEudG9Mb3dlckNhc2UoKSk/aWEoZnVuY3Rpb24oYSxjKXt2YXIgZCxmPWUoYSxiKSxnPWYubGVuZ3RoO3doaWxlKGctLSlkPUkoYSxmW2ddKSxhW2RdPSEoY1tkXT1mW2ddKX0pOmZ1bmN0aW9uKGEpe3JldHVybiBlKGEsMCxjKX0pOmV9fSxwc2V1ZG9zOntub3Q6aWEoZnVuY3Rpb24oYSl7dmFyIGI9W10sYz1bXSxkPWgoYS5yZXBsYWNlKFAsXCIkMVwiKSk7cmV0dXJuIGRbdV0/aWEoZnVuY3Rpb24oYSxiLGMsZSl7dmFyIGYsZz1kKGEsbnVsbCxlLFtdKSxoPWEubGVuZ3RoO3doaWxlKGgtLSkoZj1nW2hdKSYmKGFbaF09IShiW2hdPWYpKX0pOmZ1bmN0aW9uKGEsZSxmKXtyZXR1cm4gYlswXT1hLGQoYixudWxsLGYsYyksYlswXT1udWxsLCFjLnBvcCgpfX0pLGhhczppYShmdW5jdGlvbihhKXtyZXR1cm4gZnVuY3Rpb24oYil7cmV0dXJuIGdhKGEsYikubGVuZ3RoPjB9fSksY29udGFpbnM6aWEoZnVuY3Rpb24oYSl7cmV0dXJuIGE9YS5yZXBsYWNlKF8sYWEpLGZ1bmN0aW9uKGIpe3JldHVybihiLnRleHRDb250ZW50fHxiLmlubmVyVGV4dHx8ZShiKSkuaW5kZXhPZihhKT4tMX19KSxsYW5nOmlhKGZ1bmN0aW9uKGEpe3JldHVybiBVLnRlc3QoYXx8XCJcIil8fGdhLmVycm9yKFwidW5zdXBwb3J0ZWQgbGFuZzogXCIrYSksYT1hLnJlcGxhY2UoXyxhYSkudG9Mb3dlckNhc2UoKSxmdW5jdGlvbihiKXt2YXIgYztkbyBpZihjPXA/Yi5sYW5nOmIuZ2V0QXR0cmlidXRlKFwieG1sOmxhbmdcIil8fGIuZ2V0QXR0cmlidXRlKFwibGFuZ1wiKSlyZXR1cm4gYz1jLnRvTG93ZXJDYXNlKCksYz09PWF8fDA9PT1jLmluZGV4T2YoYStcIi1cIik7d2hpbGUoKGI9Yi5wYXJlbnROb2RlKSYmMT09PWIubm9kZVR5cGUpO3JldHVybiExfX0pLHRhcmdldDpmdW5jdGlvbihiKXt2YXIgYz1hLmxvY2F0aW9uJiZhLmxvY2F0aW9uLmhhc2g7cmV0dXJuIGMmJmMuc2xpY2UoMSk9PT1iLmlkfSxyb290OmZ1bmN0aW9uKGEpe3JldHVybiBhPT09b30sZm9jdXM6ZnVuY3Rpb24oYSl7cmV0dXJuIGE9PT1uLmFjdGl2ZUVsZW1lbnQmJighbi5oYXNGb2N1c3x8bi5oYXNGb2N1cygpKSYmISEoYS50eXBlfHxhLmhyZWZ8fH5hLnRhYkluZGV4KX0sZW5hYmxlZDpvYSghMSksZGlzYWJsZWQ6b2EoITApLGNoZWNrZWQ6ZnVuY3Rpb24oYSl7dmFyIGI9YS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO3JldHVyblwiaW5wdXRcIj09PWImJiEhYS5jaGVja2VkfHxcIm9wdGlvblwiPT09YiYmISFhLnNlbGVjdGVkfSxzZWxlY3RlZDpmdW5jdGlvbihhKXtyZXR1cm4gYS5wYXJlbnROb2RlJiZhLnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleCxhLnNlbGVjdGVkPT09ITB9LGVtcHR5OmZ1bmN0aW9uKGEpe2ZvcihhPWEuZmlyc3RDaGlsZDthO2E9YS5uZXh0U2libGluZylpZihhLm5vZGVUeXBlPDYpcmV0dXJuITE7cmV0dXJuITB9LHBhcmVudDpmdW5jdGlvbihhKXtyZXR1cm4hZC5wc2V1ZG9zLmVtcHR5KGEpfSxoZWFkZXI6ZnVuY3Rpb24oYSl7cmV0dXJuIFgudGVzdChhLm5vZGVOYW1lKX0saW5wdXQ6ZnVuY3Rpb24oYSl7cmV0dXJuIFcudGVzdChhLm5vZGVOYW1lKX0sYnV0dG9uOmZ1bmN0aW9uKGEpe3ZhciBiPWEubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtyZXR1cm5cImlucHV0XCI9PT1iJiZcImJ1dHRvblwiPT09YS50eXBlfHxcImJ1dHRvblwiPT09Yn0sdGV4dDpmdW5jdGlvbihhKXt2YXIgYjtyZXR1cm5cImlucHV0XCI9PT1hLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkmJlwidGV4dFwiPT09YS50eXBlJiYobnVsbD09KGI9YS5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpKXx8XCJ0ZXh0XCI9PT1iLnRvTG93ZXJDYXNlKCkpfSxmaXJzdDpwYShmdW5jdGlvbigpe3JldHVyblswXX0pLGxhc3Q6cGEoZnVuY3Rpb24oYSxiKXtyZXR1cm5bYi0xXX0pLGVxOnBhKGZ1bmN0aW9uKGEsYixjKXtyZXR1cm5bYzwwP2MrYjpjXX0pLGV2ZW46cGEoZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9MDtjPGI7Yys9MilhLnB1c2goYyk7cmV0dXJuIGF9KSxvZGQ6cGEoZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9MTtjPGI7Yys9MilhLnB1c2goYyk7cmV0dXJuIGF9KSxsdDpwYShmdW5jdGlvbihhLGIsYyl7Zm9yKHZhciBkPWM8MD9jK2I6YzstLWQ+PTA7KWEucHVzaChkKTtyZXR1cm4gYX0pLGd0OnBhKGZ1bmN0aW9uKGEsYixjKXtmb3IodmFyIGQ9YzwwP2MrYjpjOysrZDxiOylhLnB1c2goZCk7cmV0dXJuIGF9KX19LGQucHNldWRvcy5udGg9ZC5wc2V1ZG9zLmVxO2ZvcihiIGlue3JhZGlvOiEwLGNoZWNrYm94OiEwLGZpbGU6ITAscGFzc3dvcmQ6ITAsaW1hZ2U6ITB9KWQucHNldWRvc1tiXT1tYShiKTtmb3IoYiBpbntzdWJtaXQ6ITAscmVzZXQ6ITB9KWQucHNldWRvc1tiXT1uYShiKTtmdW5jdGlvbiByYSgpe31yYS5wcm90b3R5cGU9ZC5maWx0ZXJzPWQucHNldWRvcyxkLnNldEZpbHRlcnM9bmV3IHJhLGc9Z2EudG9rZW5pemU9ZnVuY3Rpb24oYSxiKXt2YXIgYyxlLGYsZyxoLGksaixrPXpbYStcIiBcIl07aWYoaylyZXR1cm4gYj8wOmsuc2xpY2UoMCk7aD1hLGk9W10saj1kLnByZUZpbHRlcjt3aGlsZShoKXtjJiYhKGU9US5leGVjKGgpKXx8KGUmJihoPWguc2xpY2UoZVswXS5sZW5ndGgpfHxoKSxpLnB1c2goZj1bXSkpLGM9ITEsKGU9Ui5leGVjKGgpKSYmKGM9ZS5zaGlmdCgpLGYucHVzaCh7dmFsdWU6Yyx0eXBlOmVbMF0ucmVwbGFjZShQLFwiIFwiKX0pLGg9aC5zbGljZShjLmxlbmd0aCkpO2ZvcihnIGluIGQuZmlsdGVyKSEoZT1WW2ddLmV4ZWMoaCkpfHxqW2ddJiYhKGU9altnXShlKSl8fChjPWUuc2hpZnQoKSxmLnB1c2goe3ZhbHVlOmMsdHlwZTpnLG1hdGNoZXM6ZX0pLGg9aC5zbGljZShjLmxlbmd0aCkpO2lmKCFjKWJyZWFrfXJldHVybiBiP2gubGVuZ3RoOmg/Z2EuZXJyb3IoYSk6eihhLGkpLnNsaWNlKDApfTtmdW5jdGlvbiBzYShhKXtmb3IodmFyIGI9MCxjPWEubGVuZ3RoLGQ9XCJcIjtiPGM7YisrKWQrPWFbYl0udmFsdWU7cmV0dXJuIGR9ZnVuY3Rpb24gdGEoYSxiLGMpe3ZhciBkPWIuZGlyLGU9Yi5uZXh0LGY9ZXx8ZCxnPWMmJlwicGFyZW50Tm9kZVwiPT09ZixoPXgrKztyZXR1cm4gYi5maXJzdD9mdW5jdGlvbihiLGMsZSl7d2hpbGUoYj1iW2RdKWlmKDE9PT1iLm5vZGVUeXBlfHxnKXJldHVybiBhKGIsYyxlKTtyZXR1cm4hMX06ZnVuY3Rpb24oYixjLGkpe3ZhciBqLGssbCxtPVt3LGhdO2lmKGkpe3doaWxlKGI9YltkXSlpZigoMT09PWIubm9kZVR5cGV8fGcpJiZhKGIsYyxpKSlyZXR1cm4hMH1lbHNlIHdoaWxlKGI9YltkXSlpZigxPT09Yi5ub2RlVHlwZXx8ZylpZihsPWJbdV18fChiW3VdPXt9KSxrPWxbYi51bmlxdWVJRF18fChsW2IudW5pcXVlSURdPXt9KSxlJiZlPT09Yi5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKWI9YltkXXx8YjtlbHNle2lmKChqPWtbZl0pJiZqWzBdPT09dyYmalsxXT09PWgpcmV0dXJuIG1bMl09alsyXTtpZihrW2ZdPW0sbVsyXT1hKGIsYyxpKSlyZXR1cm4hMH1yZXR1cm4hMX19ZnVuY3Rpb24gdWEoYSl7cmV0dXJuIGEubGVuZ3RoPjE/ZnVuY3Rpb24oYixjLGQpe3ZhciBlPWEubGVuZ3RoO3doaWxlKGUtLSlpZighYVtlXShiLGMsZCkpcmV0dXJuITE7cmV0dXJuITB9OmFbMF19ZnVuY3Rpb24gdmEoYSxiLGMpe2Zvcih2YXIgZD0wLGU9Yi5sZW5ndGg7ZDxlO2QrKylnYShhLGJbZF0sYyk7cmV0dXJuIGN9ZnVuY3Rpb24gd2EoYSxiLGMsZCxlKXtmb3IodmFyIGYsZz1bXSxoPTAsaT1hLmxlbmd0aCxqPW51bGwhPWI7aDxpO2grKykoZj1hW2hdKSYmKGMmJiFjKGYsZCxlKXx8KGcucHVzaChmKSxqJiZiLnB1c2goaCkpKTtyZXR1cm4gZ31mdW5jdGlvbiB4YShhLGIsYyxkLGUsZil7cmV0dXJuIGQmJiFkW3VdJiYoZD14YShkKSksZSYmIWVbdV0mJihlPXhhKGUsZikpLGlhKGZ1bmN0aW9uKGYsZyxoLGkpe3ZhciBqLGssbCxtPVtdLG49W10sbz1nLmxlbmd0aCxwPWZ8fHZhKGJ8fFwiKlwiLGgubm9kZVR5cGU/W2hdOmgsW10pLHE9IWF8fCFmJiZiP3A6d2EocCxtLGEsaCxpKSxyPWM/ZXx8KGY/YTpvfHxkKT9bXTpnOnE7aWYoYyYmYyhxLHIsaCxpKSxkKXtqPXdhKHIsbiksZChqLFtdLGgsaSksaz1qLmxlbmd0aDt3aGlsZShrLS0pKGw9altrXSkmJihyW25ba11dPSEocVtuW2tdXT1sKSl9aWYoZil7aWYoZXx8YSl7aWYoZSl7aj1bXSxrPXIubGVuZ3RoO3doaWxlKGstLSkobD1yW2tdKSYmai5wdXNoKHFba109bCk7ZShudWxsLHI9W10saixpKX1rPXIubGVuZ3RoO3doaWxlKGstLSkobD1yW2tdKSYmKGo9ZT9JKGYsbCk6bVtrXSk+LTEmJihmW2pdPSEoZ1tqXT1sKSl9fWVsc2Ugcj13YShyPT09Zz9yLnNwbGljZShvLHIubGVuZ3RoKTpyKSxlP2UobnVsbCxnLHIsaSk6Ry5hcHBseShnLHIpfSl9ZnVuY3Rpb24geWEoYSl7Zm9yKHZhciBiLGMsZSxmPWEubGVuZ3RoLGc9ZC5yZWxhdGl2ZVthWzBdLnR5cGVdLGg9Z3x8ZC5yZWxhdGl2ZVtcIiBcIl0saT1nPzE6MCxrPXRhKGZ1bmN0aW9uKGEpe3JldHVybiBhPT09Yn0saCwhMCksbD10YShmdW5jdGlvbihhKXtyZXR1cm4gSShiLGEpPi0xfSxoLCEwKSxtPVtmdW5jdGlvbihhLGMsZCl7dmFyIGU9IWcmJihkfHxjIT09ail8fCgoYj1jKS5ub2RlVHlwZT9rKGEsYyxkKTpsKGEsYyxkKSk7cmV0dXJuIGI9bnVsbCxlfV07aTxmO2krKylpZihjPWQucmVsYXRpdmVbYVtpXS50eXBlXSltPVt0YSh1YShtKSxjKV07ZWxzZXtpZihjPWQuZmlsdGVyW2FbaV0udHlwZV0uYXBwbHkobnVsbCxhW2ldLm1hdGNoZXMpLGNbdV0pe2ZvcihlPSsraTtlPGY7ZSsrKWlmKGQucmVsYXRpdmVbYVtlXS50eXBlXSlicmVhaztyZXR1cm4geGEoaT4xJiZ1YShtKSxpPjEmJnNhKGEuc2xpY2UoMCxpLTEpLmNvbmNhdCh7dmFsdWU6XCIgXCI9PT1hW2ktMl0udHlwZT9cIipcIjpcIlwifSkpLnJlcGxhY2UoUCxcIiQxXCIpLGMsaTxlJiZ5YShhLnNsaWNlKGksZSkpLGU8ZiYmeWEoYT1hLnNsaWNlKGUpKSxlPGYmJnNhKGEpKX1tLnB1c2goYyl9cmV0dXJuIHVhKG0pfWZ1bmN0aW9uIHphKGEsYil7dmFyIGM9Yi5sZW5ndGg+MCxlPWEubGVuZ3RoPjAsZj1mdW5jdGlvbihmLGcsaCxpLGspe3ZhciBsLG8scSxyPTAscz1cIjBcIix0PWYmJltdLHU9W10sdj1qLHg9Znx8ZSYmZC5maW5kLlRBRyhcIipcIixrKSx5PXcrPW51bGw9PXY/MTpNYXRoLnJhbmRvbSgpfHwuMSx6PXgubGVuZ3RoO2ZvcihrJiYoaj1nPT09bnx8Z3x8ayk7cyE9PXomJm51bGwhPShsPXhbc10pO3MrKyl7aWYoZSYmbCl7bz0wLGd8fGwub3duZXJEb2N1bWVudD09PW58fChtKGwpLGg9IXApO3doaWxlKHE9YVtvKytdKWlmKHEobCxnfHxuLGgpKXtpLnB1c2gobCk7YnJlYWt9ayYmKHc9eSl9YyYmKChsPSFxJiZsKSYmci0tLGYmJnQucHVzaChsKSl9aWYocis9cyxjJiZzIT09cil7bz0wO3doaWxlKHE9YltvKytdKXEodCx1LGcsaCk7aWYoZil7aWYocj4wKXdoaWxlKHMtLSl0W3NdfHx1W3NdfHwodVtzXT1FLmNhbGwoaSkpO3U9d2EodSl9Ry5hcHBseShpLHUpLGsmJiFmJiZ1Lmxlbmd0aD4wJiZyK2IubGVuZ3RoPjEmJmdhLnVuaXF1ZVNvcnQoaSl9cmV0dXJuIGsmJih3PXksaj12KSx0fTtyZXR1cm4gYz9pYShmKTpmfXJldHVybiBoPWdhLmNvbXBpbGU9ZnVuY3Rpb24oYSxiKXt2YXIgYyxkPVtdLGU9W10sZj1BW2ErXCIgXCJdO2lmKCFmKXtifHwoYj1nKGEpKSxjPWIubGVuZ3RoO3doaWxlKGMtLSlmPXlhKGJbY10pLGZbdV0/ZC5wdXNoKGYpOmUucHVzaChmKTtmPUEoYSx6YShlLGQpKSxmLnNlbGVjdG9yPWF9cmV0dXJuIGZ9LGk9Z2Euc2VsZWN0PWZ1bmN0aW9uKGEsYixjLGUpe3ZhciBmLGksaixrLGwsbT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBhJiZhLG49IWUmJmcoYT1tLnNlbGVjdG9yfHxhKTtpZihjPWN8fFtdLDE9PT1uLmxlbmd0aCl7aWYoaT1uWzBdPW5bMF0uc2xpY2UoMCksaS5sZW5ndGg+MiYmXCJJRFwiPT09KGo9aVswXSkudHlwZSYmOT09PWIubm9kZVR5cGUmJnAmJmQucmVsYXRpdmVbaVsxXS50eXBlXSl7aWYoYj0oZC5maW5kLklEKGoubWF0Y2hlc1swXS5yZXBsYWNlKF8sYWEpLGIpfHxbXSlbMF0sIWIpcmV0dXJuIGM7bSYmKGI9Yi5wYXJlbnROb2RlKSxhPWEuc2xpY2UoaS5zaGlmdCgpLnZhbHVlLmxlbmd0aCl9Zj1WLm5lZWRzQ29udGV4dC50ZXN0KGEpPzA6aS5sZW5ndGg7d2hpbGUoZi0tKXtpZihqPWlbZl0sZC5yZWxhdGl2ZVtrPWoudHlwZV0pYnJlYWs7aWYoKGw9ZC5maW5kW2tdKSYmKGU9bChqLm1hdGNoZXNbMF0ucmVwbGFjZShfLGFhKSwkLnRlc3QoaVswXS50eXBlKSYmcWEoYi5wYXJlbnROb2RlKXx8YikpKXtpZihpLnNwbGljZShmLDEpLGE9ZS5sZW5ndGgmJnNhKGkpLCFhKXJldHVybiBHLmFwcGx5KGMsZSksYzticmVha319fXJldHVybihtfHxoKGEsbikpKGUsYiwhcCxjLCFifHwkLnRlc3QoYSkmJnFhKGIucGFyZW50Tm9kZSl8fGIpLGN9LGMuc29ydFN0YWJsZT11LnNwbGl0KFwiXCIpLnNvcnQoQikuam9pbihcIlwiKT09PXUsYy5kZXRlY3REdXBsaWNhdGVzPSEhbCxtKCksYy5zb3J0RGV0YWNoZWQ9amEoZnVuY3Rpb24oYSl7cmV0dXJuIDEmYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihuLmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKSl9KSxqYShmdW5jdGlvbihhKXtyZXR1cm4gYS5pbm5lckhUTUw9XCI8YSBocmVmPScjJz48L2E+XCIsXCIjXCI9PT1hLmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKX0pfHxrYShcInR5cGV8aHJlZnxoZWlnaHR8d2lkdGhcIixmdW5jdGlvbihhLGIsYyl7aWYoIWMpcmV0dXJuIGEuZ2V0QXR0cmlidXRlKGIsXCJ0eXBlXCI9PT1iLnRvTG93ZXJDYXNlKCk/MToyKX0pLGMuYXR0cmlidXRlcyYmamEoZnVuY3Rpb24oYSl7cmV0dXJuIGEuaW5uZXJIVE1MPVwiPGlucHV0Lz5cIixhLmZpcnN0Q2hpbGQuc2V0QXR0cmlidXRlKFwidmFsdWVcIixcIlwiKSxcIlwiPT09YS5maXJzdENoaWxkLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpfSl8fGthKFwidmFsdWVcIixmdW5jdGlvbihhLGIsYyl7aWYoIWMmJlwiaW5wdXRcIj09PWEubm9kZU5hbWUudG9Mb3dlckNhc2UoKSlyZXR1cm4gYS5kZWZhdWx0VmFsdWV9KSxqYShmdW5jdGlvbihhKXtyZXR1cm4gbnVsbD09YS5nZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKX0pfHxrYShKLGZ1bmN0aW9uKGEsYixjKXt2YXIgZDtpZighYylyZXR1cm4gYVtiXT09PSEwP2IudG9Mb3dlckNhc2UoKTooZD1hLmdldEF0dHJpYnV0ZU5vZGUoYikpJiZkLnNwZWNpZmllZD9kLnZhbHVlOm51bGx9KSxnYX0oYSk7ci5maW5kPXgsci5leHByPXguc2VsZWN0b3JzLHIuZXhwcltcIjpcIl09ci5leHByLnBzZXVkb3Msci51bmlxdWVTb3J0PXIudW5pcXVlPXgudW5pcXVlU29ydCxyLnRleHQ9eC5nZXRUZXh0LHIuaXNYTUxEb2M9eC5pc1hNTCxyLmNvbnRhaW5zPXguY29udGFpbnMsci5lc2NhcGVTZWxlY3Rvcj14LmVzY2FwZTt2YXIgeT1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9W10sZT12b2lkIDAhPT1jO3doaWxlKChhPWFbYl0pJiY5IT09YS5ub2RlVHlwZSlpZigxPT09YS5ub2RlVHlwZSl7aWYoZSYmcihhKS5pcyhjKSlicmVhaztkLnB1c2goYSl9cmV0dXJuIGR9LHo9ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9W107YTthPWEubmV4dFNpYmxpbmcpMT09PWEubm9kZVR5cGUmJmEhPT1iJiZjLnB1c2goYSk7cmV0dXJuIGN9LEE9ci5leHByLm1hdGNoLm5lZWRzQ29udGV4dDtmdW5jdGlvbiBCKGEsYil7cmV0dXJuIGEubm9kZU5hbWUmJmEubm9kZU5hbWUudG9Mb3dlckNhc2UoKT09PWIudG9Mb3dlckNhc2UoKX12YXIgQz0vXjwoW2Etel1bXlxcL1xcMD46XFx4MjBcXHRcXHJcXG5cXGZdKilbXFx4MjBcXHRcXHJcXG5cXGZdKlxcLz8+KD86PFxcL1xcMT58KSQvaSxEPS9eLlteOiNcXFtcXC4sXSokLztmdW5jdGlvbiBFKGEsYixjKXtyZXR1cm4gci5pc0Z1bmN0aW9uKGIpP3IuZ3JlcChhLGZ1bmN0aW9uKGEsZCl7cmV0dXJuISFiLmNhbGwoYSxkLGEpIT09Y30pOmIubm9kZVR5cGU/ci5ncmVwKGEsZnVuY3Rpb24oYSl7cmV0dXJuIGE9PT1iIT09Y30pOlwic3RyaW5nXCIhPXR5cGVvZiBiP3IuZ3JlcChhLGZ1bmN0aW9uKGEpe3JldHVybiBpLmNhbGwoYixhKT4tMSE9PWN9KTpELnRlc3QoYik/ci5maWx0ZXIoYixhLGMpOihiPXIuZmlsdGVyKGIsYSksci5ncmVwKGEsZnVuY3Rpb24oYSl7cmV0dXJuIGkuY2FsbChiLGEpPi0xIT09YyYmMT09PWEubm9kZVR5cGV9KSl9ci5maWx0ZXI9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPWJbMF07cmV0dXJuIGMmJihhPVwiOm5vdChcIithK1wiKVwiKSwxPT09Yi5sZW5ndGgmJjE9PT1kLm5vZGVUeXBlP3IuZmluZC5tYXRjaGVzU2VsZWN0b3IoZCxhKT9bZF06W106ci5maW5kLm1hdGNoZXMoYSxyLmdyZXAoYixmdW5jdGlvbihhKXtyZXR1cm4gMT09PWEubm9kZVR5cGV9KSl9LHIuZm4uZXh0ZW5kKHtmaW5kOmZ1bmN0aW9uKGEpe3ZhciBiLGMsZD10aGlzLmxlbmd0aCxlPXRoaXM7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGEpcmV0dXJuIHRoaXMucHVzaFN0YWNrKHIoYSkuZmlsdGVyKGZ1bmN0aW9uKCl7Zm9yKGI9MDtiPGQ7YisrKWlmKHIuY29udGFpbnMoZVtiXSx0aGlzKSlyZXR1cm4hMH0pKTtmb3IoYz10aGlzLnB1c2hTdGFjayhbXSksYj0wO2I8ZDtiKyspci5maW5kKGEsZVtiXSxjKTtyZXR1cm4gZD4xP3IudW5pcXVlU29ydChjKTpjfSxmaWx0ZXI6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMucHVzaFN0YWNrKEUodGhpcyxhfHxbXSwhMSkpfSxub3Q6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMucHVzaFN0YWNrKEUodGhpcyxhfHxbXSwhMCkpfSxpczpmdW5jdGlvbihhKXtyZXR1cm4hIUUodGhpcyxcInN0cmluZ1wiPT10eXBlb2YgYSYmQS50ZXN0KGEpP3IoYSk6YXx8W10sITEpLmxlbmd0aH19KTt2YXIgRixHPS9eKD86XFxzKig8W1xcd1xcV10rPilbXj5dKnwjKFtcXHctXSspKSQvLEg9ci5mbi5pbml0PWZ1bmN0aW9uKGEsYixjKXt2YXIgZSxmO2lmKCFhKXJldHVybiB0aGlzO2lmKGM9Y3x8RixcInN0cmluZ1wiPT10eXBlb2YgYSl7aWYoZT1cIjxcIj09PWFbMF0mJlwiPlwiPT09YVthLmxlbmd0aC0xXSYmYS5sZW5ndGg+PTM/W251bGwsYSxudWxsXTpHLmV4ZWMoYSksIWV8fCFlWzFdJiZiKXJldHVybiFifHxiLmpxdWVyeT8oYnx8YykuZmluZChhKTp0aGlzLmNvbnN0cnVjdG9yKGIpLmZpbmQoYSk7aWYoZVsxXSl7aWYoYj1iIGluc3RhbmNlb2Ygcj9iWzBdOmIsci5tZXJnZSh0aGlzLHIucGFyc2VIVE1MKGVbMV0sYiYmYi5ub2RlVHlwZT9iLm93bmVyRG9jdW1lbnR8fGI6ZCwhMCkpLEMudGVzdChlWzFdKSYmci5pc1BsYWluT2JqZWN0KGIpKWZvcihlIGluIGIpci5pc0Z1bmN0aW9uKHRoaXNbZV0pP3RoaXNbZV0oYltlXSk6dGhpcy5hdHRyKGUsYltlXSk7cmV0dXJuIHRoaXN9cmV0dXJuIGY9ZC5nZXRFbGVtZW50QnlJZChlWzJdKSxmJiYodGhpc1swXT1mLHRoaXMubGVuZ3RoPTEpLHRoaXN9cmV0dXJuIGEubm9kZVR5cGU/KHRoaXNbMF09YSx0aGlzLmxlbmd0aD0xLHRoaXMpOnIuaXNGdW5jdGlvbihhKT92b2lkIDAhPT1jLnJlYWR5P2MucmVhZHkoYSk6YShyKTpyLm1ha2VBcnJheShhLHRoaXMpfTtILnByb3RvdHlwZT1yLmZuLEY9cihkKTt2YXIgST0vXig/OnBhcmVudHN8cHJldig/OlVudGlsfEFsbCkpLyxKPXtjaGlsZHJlbjohMCxjb250ZW50czohMCxuZXh0OiEwLHByZXY6ITB9O3IuZm4uZXh0ZW5kKHtoYXM6ZnVuY3Rpb24oYSl7dmFyIGI9cihhLHRoaXMpLGM9Yi5sZW5ndGg7cmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKCl7Zm9yKHZhciBhPTA7YTxjO2ErKylpZihyLmNvbnRhaW5zKHRoaXMsYlthXSkpcmV0dXJuITB9KX0sY2xvc2VzdDpmdW5jdGlvbihhLGIpe3ZhciBjLGQ9MCxlPXRoaXMubGVuZ3RoLGY9W10sZz1cInN0cmluZ1wiIT10eXBlb2YgYSYmcihhKTtpZighQS50ZXN0KGEpKWZvcig7ZDxlO2QrKylmb3IoYz10aGlzW2RdO2MmJmMhPT1iO2M9Yy5wYXJlbnROb2RlKWlmKGMubm9kZVR5cGU8MTEmJihnP2cuaW5kZXgoYyk+LTE6MT09PWMubm9kZVR5cGUmJnIuZmluZC5tYXRjaGVzU2VsZWN0b3IoYyxhKSkpe2YucHVzaChjKTticmVha31yZXR1cm4gdGhpcy5wdXNoU3RhY2soZi5sZW5ndGg+MT9yLnVuaXF1ZVNvcnQoZik6Zil9LGluZGV4OmZ1bmN0aW9uKGEpe3JldHVybiBhP1wic3RyaW5nXCI9PXR5cGVvZiBhP2kuY2FsbChyKGEpLHRoaXNbMF0pOmkuY2FsbCh0aGlzLGEuanF1ZXJ5P2FbMF06YSk6dGhpc1swXSYmdGhpc1swXS5wYXJlbnROb2RlP3RoaXMuZmlyc3QoKS5wcmV2QWxsKCkubGVuZ3RoOi0xfSxhZGQ6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdGhpcy5wdXNoU3RhY2soci51bmlxdWVTb3J0KHIubWVyZ2UodGhpcy5nZXQoKSxyKGEsYikpKSl9LGFkZEJhY2s6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuYWRkKG51bGw9PWE/dGhpcy5wcmV2T2JqZWN0OnRoaXMucHJldk9iamVjdC5maWx0ZXIoYSkpfX0pO2Z1bmN0aW9uIEsoYSxiKXt3aGlsZSgoYT1hW2JdKSYmMSE9PWEubm9kZVR5cGUpO3JldHVybiBhfXIuZWFjaCh7cGFyZW50OmZ1bmN0aW9uKGEpe3ZhciBiPWEucGFyZW50Tm9kZTtyZXR1cm4gYiYmMTEhPT1iLm5vZGVUeXBlP2I6bnVsbH0scGFyZW50czpmdW5jdGlvbihhKXtyZXR1cm4geShhLFwicGFyZW50Tm9kZVwiKX0scGFyZW50c1VudGlsOmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4geShhLFwicGFyZW50Tm9kZVwiLGMpfSxuZXh0OmZ1bmN0aW9uKGEpe3JldHVybiBLKGEsXCJuZXh0U2libGluZ1wiKX0scHJldjpmdW5jdGlvbihhKXtyZXR1cm4gSyhhLFwicHJldmlvdXNTaWJsaW5nXCIpfSxuZXh0QWxsOmZ1bmN0aW9uKGEpe3JldHVybiB5KGEsXCJuZXh0U2libGluZ1wiKX0scHJldkFsbDpmdW5jdGlvbihhKXtyZXR1cm4geShhLFwicHJldmlvdXNTaWJsaW5nXCIpfSxuZXh0VW50aWw6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiB5KGEsXCJuZXh0U2libGluZ1wiLGMpfSxwcmV2VW50aWw6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiB5KGEsXCJwcmV2aW91c1NpYmxpbmdcIixjKX0sc2libGluZ3M6ZnVuY3Rpb24oYSl7cmV0dXJuIHooKGEucGFyZW50Tm9kZXx8e30pLmZpcnN0Q2hpbGQsYSl9LGNoaWxkcmVuOmZ1bmN0aW9uKGEpe3JldHVybiB6KGEuZmlyc3RDaGlsZCl9LGNvbnRlbnRzOmZ1bmN0aW9uKGEpe3JldHVybiBCKGEsXCJpZnJhbWVcIik/YS5jb250ZW50RG9jdW1lbnQ6KEIoYSxcInRlbXBsYXRlXCIpJiYoYT1hLmNvbnRlbnR8fGEpLHIubWVyZ2UoW10sYS5jaGlsZE5vZGVzKSl9fSxmdW5jdGlvbihhLGIpe3IuZm5bYV09ZnVuY3Rpb24oYyxkKXt2YXIgZT1yLm1hcCh0aGlzLGIsYyk7cmV0dXJuXCJVbnRpbFwiIT09YS5zbGljZSgtNSkmJihkPWMpLGQmJlwic3RyaW5nXCI9PXR5cGVvZiBkJiYoZT1yLmZpbHRlcihkLGUpKSx0aGlzLmxlbmd0aD4xJiYoSlthXXx8ci51bmlxdWVTb3J0KGUpLEkudGVzdChhKSYmZS5yZXZlcnNlKCkpLHRoaXMucHVzaFN0YWNrKGUpfX0pO3ZhciBMPS9bXlxceDIwXFx0XFxyXFxuXFxmXSsvZztmdW5jdGlvbiBNKGEpe3ZhciBiPXt9O3JldHVybiByLmVhY2goYS5tYXRjaChMKXx8W10sZnVuY3Rpb24oYSxjKXtiW2NdPSEwfSksYn1yLkNhbGxiYWNrcz1mdW5jdGlvbihhKXthPVwic3RyaW5nXCI9PXR5cGVvZiBhP00oYSk6ci5leHRlbmQoe30sYSk7dmFyIGIsYyxkLGUsZj1bXSxnPVtdLGg9LTEsaT1mdW5jdGlvbigpe2ZvcihlPWV8fGEub25jZSxkPWI9ITA7Zy5sZW5ndGg7aD0tMSl7Yz1nLnNoaWZ0KCk7d2hpbGUoKytoPGYubGVuZ3RoKWZbaF0uYXBwbHkoY1swXSxjWzFdKT09PSExJiZhLnN0b3BPbkZhbHNlJiYoaD1mLmxlbmd0aCxjPSExKX1hLm1lbW9yeXx8KGM9ITEpLGI9ITEsZSYmKGY9Yz9bXTpcIlwiKX0saj17YWRkOmZ1bmN0aW9uKCl7cmV0dXJuIGYmJihjJiYhYiYmKGg9Zi5sZW5ndGgtMSxnLnB1c2goYykpLGZ1bmN0aW9uIGQoYil7ci5lYWNoKGIsZnVuY3Rpb24oYixjKXtyLmlzRnVuY3Rpb24oYyk/YS51bmlxdWUmJmouaGFzKGMpfHxmLnB1c2goYyk6YyYmYy5sZW5ndGgmJlwic3RyaW5nXCIhPT1yLnR5cGUoYykmJmQoYyl9KX0oYXJndW1lbnRzKSxjJiYhYiYmaSgpKSx0aGlzfSxyZW1vdmU6ZnVuY3Rpb24oKXtyZXR1cm4gci5lYWNoKGFyZ3VtZW50cyxmdW5jdGlvbihhLGIpe3ZhciBjO3doaWxlKChjPXIuaW5BcnJheShiLGYsYykpPi0xKWYuc3BsaWNlKGMsMSksYzw9aCYmaC0tfSksdGhpc30saGFzOmZ1bmN0aW9uKGEpe3JldHVybiBhP3IuaW5BcnJheShhLGYpPi0xOmYubGVuZ3RoPjB9LGVtcHR5OmZ1bmN0aW9uKCl7cmV0dXJuIGYmJihmPVtdKSx0aGlzfSxkaXNhYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIGU9Zz1bXSxmPWM9XCJcIix0aGlzfSxkaXNhYmxlZDpmdW5jdGlvbigpe3JldHVybiFmfSxsb2NrOmZ1bmN0aW9uKCl7cmV0dXJuIGU9Zz1bXSxjfHxifHwoZj1jPVwiXCIpLHRoaXN9LGxvY2tlZDpmdW5jdGlvbigpe3JldHVybiEhZX0sZmlyZVdpdGg6ZnVuY3Rpb24oYSxjKXtyZXR1cm4gZXx8KGM9Y3x8W10sYz1bYSxjLnNsaWNlP2Muc2xpY2UoKTpjXSxnLnB1c2goYyksYnx8aSgpKSx0aGlzfSxmaXJlOmZ1bmN0aW9uKCl7cmV0dXJuIGouZmlyZVdpdGgodGhpcyxhcmd1bWVudHMpLHRoaXN9LGZpcmVkOmZ1bmN0aW9uKCl7cmV0dXJuISFkfX07cmV0dXJuIGp9O2Z1bmN0aW9uIE4oYSl7cmV0dXJuIGF9ZnVuY3Rpb24gTyhhKXt0aHJvdyBhfWZ1bmN0aW9uIFAoYSxiLGMsZCl7dmFyIGU7dHJ5e2EmJnIuaXNGdW5jdGlvbihlPWEucHJvbWlzZSk/ZS5jYWxsKGEpLmRvbmUoYikuZmFpbChjKTphJiZyLmlzRnVuY3Rpb24oZT1hLnRoZW4pP2UuY2FsbChhLGIsYyk6Yi5hcHBseSh2b2lkIDAsW2FdLnNsaWNlKGQpKX1jYXRjaChhKXtjLmFwcGx5KHZvaWQgMCxbYV0pfX1yLmV4dGVuZCh7RGVmZXJyZWQ6ZnVuY3Rpb24oYil7dmFyIGM9W1tcIm5vdGlmeVwiLFwicHJvZ3Jlc3NcIixyLkNhbGxiYWNrcyhcIm1lbW9yeVwiKSxyLkNhbGxiYWNrcyhcIm1lbW9yeVwiKSwyXSxbXCJyZXNvbHZlXCIsXCJkb25lXCIsci5DYWxsYmFja3MoXCJvbmNlIG1lbW9yeVwiKSxyLkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLDAsXCJyZXNvbHZlZFwiXSxbXCJyZWplY3RcIixcImZhaWxcIixyLkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLHIuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIiksMSxcInJlamVjdGVkXCJdXSxkPVwicGVuZGluZ1wiLGU9e3N0YXRlOmZ1bmN0aW9uKCl7cmV0dXJuIGR9LGFsd2F5czpmdW5jdGlvbigpe3JldHVybiBmLmRvbmUoYXJndW1lbnRzKS5mYWlsKGFyZ3VtZW50cyksdGhpc30sXCJjYXRjaFwiOmZ1bmN0aW9uKGEpe3JldHVybiBlLnRoZW4obnVsbCxhKX0scGlwZTpmdW5jdGlvbigpe3ZhciBhPWFyZ3VtZW50cztyZXR1cm4gci5EZWZlcnJlZChmdW5jdGlvbihiKXtyLmVhY2goYyxmdW5jdGlvbihjLGQpe3ZhciBlPXIuaXNGdW5jdGlvbihhW2RbNF1dKSYmYVtkWzRdXTtmW2RbMV1dKGZ1bmN0aW9uKCl7dmFyIGE9ZSYmZS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7YSYmci5pc0Z1bmN0aW9uKGEucHJvbWlzZSk/YS5wcm9taXNlKCkucHJvZ3Jlc3MoYi5ub3RpZnkpLmRvbmUoYi5yZXNvbHZlKS5mYWlsKGIucmVqZWN0KTpiW2RbMF0rXCJXaXRoXCJdKHRoaXMsZT9bYV06YXJndW1lbnRzKX0pfSksYT1udWxsfSkucHJvbWlzZSgpfSx0aGVuOmZ1bmN0aW9uKGIsZCxlKXt2YXIgZj0wO2Z1bmN0aW9uIGcoYixjLGQsZSl7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIGg9dGhpcyxpPWFyZ3VtZW50cyxqPWZ1bmN0aW9uKCl7dmFyIGEsajtpZighKGI8Zikpe2lmKGE9ZC5hcHBseShoLGkpLGE9PT1jLnByb21pc2UoKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlbmFibGUgc2VsZi1yZXNvbHV0aW9uXCIpO2o9YSYmKFwib2JqZWN0XCI9PXR5cGVvZiBhfHxcImZ1bmN0aW9uXCI9PXR5cGVvZiBhKSYmYS50aGVuLHIuaXNGdW5jdGlvbihqKT9lP2ouY2FsbChhLGcoZixjLE4sZSksZyhmLGMsTyxlKSk6KGYrKyxqLmNhbGwoYSxnKGYsYyxOLGUpLGcoZixjLE8sZSksZyhmLGMsTixjLm5vdGlmeVdpdGgpKSk6KGQhPT1OJiYoaD12b2lkIDAsaT1bYV0pLChlfHxjLnJlc29sdmVXaXRoKShoLGkpKX19LGs9ZT9qOmZ1bmN0aW9uKCl7dHJ5e2ooKX1jYXRjaChhKXtyLkRlZmVycmVkLmV4Y2VwdGlvbkhvb2smJnIuRGVmZXJyZWQuZXhjZXB0aW9uSG9vayhhLGsuc3RhY2tUcmFjZSksYisxPj1mJiYoZCE9PU8mJihoPXZvaWQgMCxpPVthXSksYy5yZWplY3RXaXRoKGgsaSkpfX07Yj9rKCk6KHIuRGVmZXJyZWQuZ2V0U3RhY2tIb29rJiYoay5zdGFja1RyYWNlPXIuRGVmZXJyZWQuZ2V0U3RhY2tIb29rKCkpLGEuc2V0VGltZW91dChrKSl9fXJldHVybiByLkRlZmVycmVkKGZ1bmN0aW9uKGEpe2NbMF1bM10uYWRkKGcoMCxhLHIuaXNGdW5jdGlvbihlKT9lOk4sYS5ub3RpZnlXaXRoKSksY1sxXVszXS5hZGQoZygwLGEsci5pc0Z1bmN0aW9uKGIpP2I6TikpLGNbMl1bM10uYWRkKGcoMCxhLHIuaXNGdW5jdGlvbihkKT9kOk8pKX0pLnByb21pc2UoKX0scHJvbWlzZTpmdW5jdGlvbihhKXtyZXR1cm4gbnVsbCE9YT9yLmV4dGVuZChhLGUpOmV9fSxmPXt9O3JldHVybiByLmVhY2goYyxmdW5jdGlvbihhLGIpe3ZhciBnPWJbMl0saD1iWzVdO2VbYlsxXV09Zy5hZGQsaCYmZy5hZGQoZnVuY3Rpb24oKXtkPWh9LGNbMy1hXVsyXS5kaXNhYmxlLGNbMF1bMl0ubG9jayksZy5hZGQoYlszXS5maXJlKSxmW2JbMF1dPWZ1bmN0aW9uKCl7cmV0dXJuIGZbYlswXStcIldpdGhcIl0odGhpcz09PWY/dm9pZCAwOnRoaXMsYXJndW1lbnRzKSx0aGlzfSxmW2JbMF0rXCJXaXRoXCJdPWcuZmlyZVdpdGh9KSxlLnByb21pc2UoZiksYiYmYi5jYWxsKGYsZiksZn0sd2hlbjpmdW5jdGlvbihhKXt2YXIgYj1hcmd1bWVudHMubGVuZ3RoLGM9YixkPUFycmF5KGMpLGU9Zi5jYWxsKGFyZ3VtZW50cyksZz1yLkRlZmVycmVkKCksaD1mdW5jdGlvbihhKXtyZXR1cm4gZnVuY3Rpb24oYyl7ZFthXT10aGlzLGVbYV09YXJndW1lbnRzLmxlbmd0aD4xP2YuY2FsbChhcmd1bWVudHMpOmMsLS1ifHxnLnJlc29sdmVXaXRoKGQsZSl9fTtpZihiPD0xJiYoUChhLGcuZG9uZShoKGMpKS5yZXNvbHZlLGcucmVqZWN0LCFiKSxcInBlbmRpbmdcIj09PWcuc3RhdGUoKXx8ci5pc0Z1bmN0aW9uKGVbY10mJmVbY10udGhlbikpKXJldHVybiBnLnRoZW4oKTt3aGlsZShjLS0pUChlW2NdLGgoYyksZy5yZWplY3QpO3JldHVybiBnLnByb21pc2UoKX19KTt2YXIgUT0vXihFdmFsfEludGVybmFsfFJhbmdlfFJlZmVyZW5jZXxTeW50YXh8VHlwZXxVUkkpRXJyb3IkLztyLkRlZmVycmVkLmV4Y2VwdGlvbkhvb2s9ZnVuY3Rpb24oYixjKXthLmNvbnNvbGUmJmEuY29uc29sZS53YXJuJiZiJiZRLnRlc3QoYi5uYW1lKSYmYS5jb25zb2xlLndhcm4oXCJqUXVlcnkuRGVmZXJyZWQgZXhjZXB0aW9uOiBcIitiLm1lc3NhZ2UsYi5zdGFjayxjKX0sci5yZWFkeUV4Y2VwdGlvbj1mdW5jdGlvbihiKXthLnNldFRpbWVvdXQoZnVuY3Rpb24oKXt0aHJvdyBifSl9O3ZhciBSPXIuRGVmZXJyZWQoKTtyLmZuLnJlYWR5PWZ1bmN0aW9uKGEpe3JldHVybiBSLnRoZW4oYSlbXCJjYXRjaFwiXShmdW5jdGlvbihhKXtyLnJlYWR5RXhjZXB0aW9uKGEpfSksdGhpc30sci5leHRlbmQoe2lzUmVhZHk6ITEscmVhZHlXYWl0OjEscmVhZHk6ZnVuY3Rpb24oYSl7KGE9PT0hMD8tLXIucmVhZHlXYWl0OnIuaXNSZWFkeSl8fChyLmlzUmVhZHk9ITAsYSE9PSEwJiYtLXIucmVhZHlXYWl0PjB8fFIucmVzb2x2ZVdpdGgoZCxbcl0pKX19KSxyLnJlYWR5LnRoZW49Ui50aGVuO2Z1bmN0aW9uIFMoKXtkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsUyksXHJcbmEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIixTKSxyLnJlYWR5KCl9XCJjb21wbGV0ZVwiPT09ZC5yZWFkeVN0YXRlfHxcImxvYWRpbmdcIiE9PWQucmVhZHlTdGF0ZSYmIWQuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsP2Euc2V0VGltZW91dChyLnJlYWR5KTooZC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLFMpLGEuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixTKSk7dmFyIFQ9ZnVuY3Rpb24oYSxiLGMsZCxlLGYsZyl7dmFyIGg9MCxpPWEubGVuZ3RoLGo9bnVsbD09YztpZihcIm9iamVjdFwiPT09ci50eXBlKGMpKXtlPSEwO2ZvcihoIGluIGMpVChhLGIsaCxjW2hdLCEwLGYsZyl9ZWxzZSBpZih2b2lkIDAhPT1kJiYoZT0hMCxyLmlzRnVuY3Rpb24oZCl8fChnPSEwKSxqJiYoZz8oYi5jYWxsKGEsZCksYj1udWxsKTooaj1iLGI9ZnVuY3Rpb24oYSxiLGMpe3JldHVybiBqLmNhbGwocihhKSxjKX0pKSxiKSlmb3IoO2g8aTtoKyspYihhW2hdLGMsZz9kOmQuY2FsbChhW2hdLGgsYihhW2hdLGMpKSk7cmV0dXJuIGU/YTpqP2IuY2FsbChhKTppP2IoYVswXSxjKTpmfSxVPWZ1bmN0aW9uKGEpe3JldHVybiAxPT09YS5ub2RlVHlwZXx8OT09PWEubm9kZVR5cGV8fCErYS5ub2RlVHlwZX07ZnVuY3Rpb24gVigpe3RoaXMuZXhwYW5kbz1yLmV4cGFuZG8rVi51aWQrK31WLnVpZD0xLFYucHJvdG90eXBlPXtjYWNoZTpmdW5jdGlvbihhKXt2YXIgYj1hW3RoaXMuZXhwYW5kb107cmV0dXJuIGJ8fChiPXt9LFUoYSkmJihhLm5vZGVUeXBlP2FbdGhpcy5leHBhbmRvXT1iOk9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLHRoaXMuZXhwYW5kbyx7dmFsdWU6Yixjb25maWd1cmFibGU6ITB9KSkpLGJ9LHNldDpmdW5jdGlvbihhLGIsYyl7dmFyIGQsZT10aGlzLmNhY2hlKGEpO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBiKWVbci5jYW1lbENhc2UoYildPWM7ZWxzZSBmb3IoZCBpbiBiKWVbci5jYW1lbENhc2UoZCldPWJbZF07cmV0dXJuIGV9LGdldDpmdW5jdGlvbihhLGIpe3JldHVybiB2b2lkIDA9PT1iP3RoaXMuY2FjaGUoYSk6YVt0aGlzLmV4cGFuZG9dJiZhW3RoaXMuZXhwYW5kb11bci5jYW1lbENhc2UoYildfSxhY2Nlc3M6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiB2b2lkIDA9PT1ifHxiJiZcInN0cmluZ1wiPT10eXBlb2YgYiYmdm9pZCAwPT09Yz90aGlzLmdldChhLGIpOih0aGlzLnNldChhLGIsYyksdm9pZCAwIT09Yz9jOmIpfSxyZW1vdmU6ZnVuY3Rpb24oYSxiKXt2YXIgYyxkPWFbdGhpcy5leHBhbmRvXTtpZih2b2lkIDAhPT1kKXtpZih2b2lkIDAhPT1iKXtBcnJheS5pc0FycmF5KGIpP2I9Yi5tYXAoci5jYW1lbENhc2UpOihiPXIuY2FtZWxDYXNlKGIpLGI9YiBpbiBkP1tiXTpiLm1hdGNoKEwpfHxbXSksYz1iLmxlbmd0aDt3aGlsZShjLS0pZGVsZXRlIGRbYltjXV19KHZvaWQgMD09PWJ8fHIuaXNFbXB0eU9iamVjdChkKSkmJihhLm5vZGVUeXBlP2FbdGhpcy5leHBhbmRvXT12b2lkIDA6ZGVsZXRlIGFbdGhpcy5leHBhbmRvXSl9fSxoYXNEYXRhOmZ1bmN0aW9uKGEpe3ZhciBiPWFbdGhpcy5leHBhbmRvXTtyZXR1cm4gdm9pZCAwIT09YiYmIXIuaXNFbXB0eU9iamVjdChiKX19O3ZhciBXPW5ldyBWLFg9bmV3IFYsWT0vXig/Olxce1tcXHdcXFddKlxcfXxcXFtbXFx3XFxXXSpcXF0pJC8sWj0vW0EtWl0vZztmdW5jdGlvbiAkKGEpe3JldHVyblwidHJ1ZVwiPT09YXx8XCJmYWxzZVwiIT09YSYmKFwibnVsbFwiPT09YT9udWxsOmE9PT0rYStcIlwiPythOlkudGVzdChhKT9KU09OLnBhcnNlKGEpOmEpfWZ1bmN0aW9uIF8oYSxiLGMpe3ZhciBkO2lmKHZvaWQgMD09PWMmJjE9PT1hLm5vZGVUeXBlKWlmKGQ9XCJkYXRhLVwiK2IucmVwbGFjZShaLFwiLSQmXCIpLnRvTG93ZXJDYXNlKCksYz1hLmdldEF0dHJpYnV0ZShkKSxcInN0cmluZ1wiPT10eXBlb2YgYyl7dHJ5e2M9JChjKX1jYXRjaChlKXt9WC5zZXQoYSxiLGMpfWVsc2UgYz12b2lkIDA7cmV0dXJuIGN9ci5leHRlbmQoe2hhc0RhdGE6ZnVuY3Rpb24oYSl7cmV0dXJuIFguaGFzRGF0YShhKXx8Vy5oYXNEYXRhKGEpfSxkYXRhOmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gWC5hY2Nlc3MoYSxiLGMpfSxyZW1vdmVEYXRhOmZ1bmN0aW9uKGEsYil7WC5yZW1vdmUoYSxiKX0sX2RhdGE6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiBXLmFjY2VzcyhhLGIsYyl9LF9yZW1vdmVEYXRhOmZ1bmN0aW9uKGEsYil7Vy5yZW1vdmUoYSxiKX19KSxyLmZuLmV4dGVuZCh7ZGF0YTpmdW5jdGlvbihhLGIpe3ZhciBjLGQsZSxmPXRoaXNbMF0sZz1mJiZmLmF0dHJpYnV0ZXM7aWYodm9pZCAwPT09YSl7aWYodGhpcy5sZW5ndGgmJihlPVguZ2V0KGYpLDE9PT1mLm5vZGVUeXBlJiYhVy5nZXQoZixcImhhc0RhdGFBdHRyc1wiKSkpe2M9Zy5sZW5ndGg7d2hpbGUoYy0tKWdbY10mJihkPWdbY10ubmFtZSwwPT09ZC5pbmRleE9mKFwiZGF0YS1cIikmJihkPXIuY2FtZWxDYXNlKGQuc2xpY2UoNSkpLF8oZixkLGVbZF0pKSk7Vy5zZXQoZixcImhhc0RhdGFBdHRyc1wiLCEwKX1yZXR1cm4gZX1yZXR1cm5cIm9iamVjdFwiPT10eXBlb2YgYT90aGlzLmVhY2goZnVuY3Rpb24oKXtYLnNldCh0aGlzLGEpfSk6VCh0aGlzLGZ1bmN0aW9uKGIpe3ZhciBjO2lmKGYmJnZvaWQgMD09PWIpe2lmKGM9WC5nZXQoZixhKSx2b2lkIDAhPT1jKXJldHVybiBjO2lmKGM9XyhmLGEpLHZvaWQgMCE9PWMpcmV0dXJuIGN9ZWxzZSB0aGlzLmVhY2goZnVuY3Rpb24oKXtYLnNldCh0aGlzLGEsYil9KX0sbnVsbCxiLGFyZ3VtZW50cy5sZW5ndGg+MSxudWxsLCEwKX0scmVtb3ZlRGF0YTpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7WC5yZW1vdmUodGhpcyxhKX0pfX0pLHIuZXh0ZW5kKHtxdWV1ZTpmdW5jdGlvbihhLGIsYyl7dmFyIGQ7aWYoYSlyZXR1cm4gYj0oYnx8XCJmeFwiKStcInF1ZXVlXCIsZD1XLmdldChhLGIpLGMmJighZHx8QXJyYXkuaXNBcnJheShjKT9kPVcuYWNjZXNzKGEsYixyLm1ha2VBcnJheShjKSk6ZC5wdXNoKGMpKSxkfHxbXX0sZGVxdWV1ZTpmdW5jdGlvbihhLGIpe2I9Ynx8XCJmeFwiO3ZhciBjPXIucXVldWUoYSxiKSxkPWMubGVuZ3RoLGU9Yy5zaGlmdCgpLGY9ci5fcXVldWVIb29rcyhhLGIpLGc9ZnVuY3Rpb24oKXtyLmRlcXVldWUoYSxiKX07XCJpbnByb2dyZXNzXCI9PT1lJiYoZT1jLnNoaWZ0KCksZC0tKSxlJiYoXCJmeFwiPT09YiYmYy51bnNoaWZ0KFwiaW5wcm9ncmVzc1wiKSxkZWxldGUgZi5zdG9wLGUuY2FsbChhLGcsZikpLCFkJiZmJiZmLmVtcHR5LmZpcmUoKX0sX3F1ZXVlSG9va3M6ZnVuY3Rpb24oYSxiKXt2YXIgYz1iK1wicXVldWVIb29rc1wiO3JldHVybiBXLmdldChhLGMpfHxXLmFjY2VzcyhhLGMse2VtcHR5OnIuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIikuYWRkKGZ1bmN0aW9uKCl7Vy5yZW1vdmUoYSxbYitcInF1ZXVlXCIsY10pfSl9KX19KSxyLmZuLmV4dGVuZCh7cXVldWU6ZnVuY3Rpb24oYSxiKXt2YXIgYz0yO3JldHVyblwic3RyaW5nXCIhPXR5cGVvZiBhJiYoYj1hLGE9XCJmeFwiLGMtLSksYXJndW1lbnRzLmxlbmd0aDxjP3IucXVldWUodGhpc1swXSxhKTp2b2lkIDA9PT1iP3RoaXM6dGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGM9ci5xdWV1ZSh0aGlzLGEsYik7ci5fcXVldWVIb29rcyh0aGlzLGEpLFwiZnhcIj09PWEmJlwiaW5wcm9ncmVzc1wiIT09Y1swXSYmci5kZXF1ZXVlKHRoaXMsYSl9KX0sZGVxdWV1ZTpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7ci5kZXF1ZXVlKHRoaXMsYSl9KX0sY2xlYXJRdWV1ZTpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5xdWV1ZShhfHxcImZ4XCIsW10pfSxwcm9taXNlOmZ1bmN0aW9uKGEsYil7dmFyIGMsZD0xLGU9ci5EZWZlcnJlZCgpLGY9dGhpcyxnPXRoaXMubGVuZ3RoLGg9ZnVuY3Rpb24oKXstLWR8fGUucmVzb2x2ZVdpdGgoZixbZl0pfTtcInN0cmluZ1wiIT10eXBlb2YgYSYmKGI9YSxhPXZvaWQgMCksYT1hfHxcImZ4XCI7d2hpbGUoZy0tKWM9Vy5nZXQoZltnXSxhK1wicXVldWVIb29rc1wiKSxjJiZjLmVtcHR5JiYoZCsrLGMuZW1wdHkuYWRkKGgpKTtyZXR1cm4gaCgpLGUucHJvbWlzZShiKX19KTt2YXIgYWE9L1srLV0/KD86XFxkKlxcLnwpXFxkKyg/OltlRV1bKy1dP1xcZCt8KS8uc291cmNlLGJhPW5ldyBSZWdFeHAoXCJeKD86KFsrLV0pPXwpKFwiK2FhK1wiKShbYS16JV0qKSRcIixcImlcIiksY2E9W1wiVG9wXCIsXCJSaWdodFwiLFwiQm90dG9tXCIsXCJMZWZ0XCJdLGRhPWZ1bmN0aW9uKGEsYil7cmV0dXJuIGE9Ynx8YSxcIm5vbmVcIj09PWEuc3R5bGUuZGlzcGxheXx8XCJcIj09PWEuc3R5bGUuZGlzcGxheSYmci5jb250YWlucyhhLm93bmVyRG9jdW1lbnQsYSkmJlwibm9uZVwiPT09ci5jc3MoYSxcImRpc3BsYXlcIil9LGVhPWZ1bmN0aW9uKGEsYixjLGQpe3ZhciBlLGYsZz17fTtmb3IoZiBpbiBiKWdbZl09YS5zdHlsZVtmXSxhLnN0eWxlW2ZdPWJbZl07ZT1jLmFwcGx5KGEsZHx8W10pO2ZvcihmIGluIGIpYS5zdHlsZVtmXT1nW2ZdO3JldHVybiBlfTtmdW5jdGlvbiBmYShhLGIsYyxkKXt2YXIgZSxmPTEsZz0yMCxoPWQ/ZnVuY3Rpb24oKXtyZXR1cm4gZC5jdXIoKX06ZnVuY3Rpb24oKXtyZXR1cm4gci5jc3MoYSxiLFwiXCIpfSxpPWgoKSxqPWMmJmNbM118fChyLmNzc051bWJlcltiXT9cIlwiOlwicHhcIiksaz0oci5jc3NOdW1iZXJbYl18fFwicHhcIiE9PWomJitpKSYmYmEuZXhlYyhyLmNzcyhhLGIpKTtpZihrJiZrWzNdIT09ail7aj1qfHxrWzNdLGM9Y3x8W10saz0raXx8MTtkbyBmPWZ8fFwiLjVcIixrLz1mLHIuc3R5bGUoYSxiLGsraik7d2hpbGUoZiE9PShmPWgoKS9pKSYmMSE9PWYmJi0tZyl9cmV0dXJuIGMmJihrPStrfHwraXx8MCxlPWNbMV0/aysoY1sxXSsxKSpjWzJdOitjWzJdLGQmJihkLnVuaXQ9aixkLnN0YXJ0PWssZC5lbmQ9ZSkpLGV9dmFyIGdhPXt9O2Z1bmN0aW9uIGhhKGEpe3ZhciBiLGM9YS5vd25lckRvY3VtZW50LGQ9YS5ub2RlTmFtZSxlPWdhW2RdO3JldHVybiBlP2U6KGI9Yy5ib2R5LmFwcGVuZENoaWxkKGMuY3JlYXRlRWxlbWVudChkKSksZT1yLmNzcyhiLFwiZGlzcGxheVwiKSxiLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYiksXCJub25lXCI9PT1lJiYoZT1cImJsb2NrXCIpLGdhW2RdPWUsZSl9ZnVuY3Rpb24gaWEoYSxiKXtmb3IodmFyIGMsZCxlPVtdLGY9MCxnPWEubGVuZ3RoO2Y8ZztmKyspZD1hW2ZdLGQuc3R5bGUmJihjPWQuc3R5bGUuZGlzcGxheSxiPyhcIm5vbmVcIj09PWMmJihlW2ZdPVcuZ2V0KGQsXCJkaXNwbGF5XCIpfHxudWxsLGVbZl18fChkLnN0eWxlLmRpc3BsYXk9XCJcIikpLFwiXCI9PT1kLnN0eWxlLmRpc3BsYXkmJmRhKGQpJiYoZVtmXT1oYShkKSkpOlwibm9uZVwiIT09YyYmKGVbZl09XCJub25lXCIsVy5zZXQoZCxcImRpc3BsYXlcIixjKSkpO2ZvcihmPTA7ZjxnO2YrKyludWxsIT1lW2ZdJiYoYVtmXS5zdHlsZS5kaXNwbGF5PWVbZl0pO3JldHVybiBhfXIuZm4uZXh0ZW5kKHtzaG93OmZ1bmN0aW9uKCl7cmV0dXJuIGlhKHRoaXMsITApfSxoaWRlOmZ1bmN0aW9uKCl7cmV0dXJuIGlhKHRoaXMpfSx0b2dnbGU6ZnVuY3Rpb24oYSl7cmV0dXJuXCJib29sZWFuXCI9PXR5cGVvZiBhP2E/dGhpcy5zaG93KCk6dGhpcy5oaWRlKCk6dGhpcy5lYWNoKGZ1bmN0aW9uKCl7ZGEodGhpcyk/cih0aGlzKS5zaG93KCk6cih0aGlzKS5oaWRlKCl9KX19KTt2YXIgamE9L14oPzpjaGVja2JveHxyYWRpbykkL2ksa2E9LzwoW2Etel1bXlxcL1xcMD5cXHgyMFxcdFxcclxcblxcZl0rKS9pLGxhPS9eJHxcXC8oPzpqYXZhfGVjbWEpc2NyaXB0L2ksbWE9e29wdGlvbjpbMSxcIjxzZWxlY3QgbXVsdGlwbGU9J211bHRpcGxlJz5cIixcIjwvc2VsZWN0PlwiXSx0aGVhZDpbMSxcIjx0YWJsZT5cIixcIjwvdGFibGU+XCJdLGNvbDpbMixcIjx0YWJsZT48Y29sZ3JvdXA+XCIsXCI8L2NvbGdyb3VwPjwvdGFibGU+XCJdLHRyOlsyLFwiPHRhYmxlPjx0Ym9keT5cIixcIjwvdGJvZHk+PC90YWJsZT5cIl0sdGQ6WzMsXCI8dGFibGU+PHRib2R5Pjx0cj5cIixcIjwvdHI+PC90Ym9keT48L3RhYmxlPlwiXSxfZGVmYXVsdDpbMCxcIlwiLFwiXCJdfTttYS5vcHRncm91cD1tYS5vcHRpb24sbWEudGJvZHk9bWEudGZvb3Q9bWEuY29sZ3JvdXA9bWEuY2FwdGlvbj1tYS50aGVhZCxtYS50aD1tYS50ZDtmdW5jdGlvbiBuYShhLGIpe3ZhciBjO3JldHVybiBjPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBhLmdldEVsZW1lbnRzQnlUYWdOYW1lP2EuZ2V0RWxlbWVudHNCeVRhZ05hbWUoYnx8XCIqXCIpOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBhLnF1ZXJ5U2VsZWN0b3JBbGw/YS5xdWVyeVNlbGVjdG9yQWxsKGJ8fFwiKlwiKTpbXSx2b2lkIDA9PT1ifHxiJiZCKGEsYik/ci5tZXJnZShbYV0sYyk6Y31mdW5jdGlvbiBvYShhLGIpe2Zvcih2YXIgYz0wLGQ9YS5sZW5ndGg7YzxkO2MrKylXLnNldChhW2NdLFwiZ2xvYmFsRXZhbFwiLCFifHxXLmdldChiW2NdLFwiZ2xvYmFsRXZhbFwiKSl9dmFyIHBhPS88fCYjP1xcdys7LztmdW5jdGlvbiBxYShhLGIsYyxkLGUpe2Zvcih2YXIgZixnLGgsaSxqLGssbD1iLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxtPVtdLG49MCxvPWEubGVuZ3RoO248bztuKyspaWYoZj1hW25dLGZ8fDA9PT1mKWlmKFwib2JqZWN0XCI9PT1yLnR5cGUoZikpci5tZXJnZShtLGYubm9kZVR5cGU/W2ZdOmYpO2Vsc2UgaWYocGEudGVzdChmKSl7Zz1nfHxsLmFwcGVuZENoaWxkKGIuY3JlYXRlRWxlbWVudChcImRpdlwiKSksaD0oa2EuZXhlYyhmKXx8W1wiXCIsXCJcIl0pWzFdLnRvTG93ZXJDYXNlKCksaT1tYVtoXXx8bWEuX2RlZmF1bHQsZy5pbm5lckhUTUw9aVsxXStyLmh0bWxQcmVmaWx0ZXIoZikraVsyXSxrPWlbMF07d2hpbGUoay0tKWc9Zy5sYXN0Q2hpbGQ7ci5tZXJnZShtLGcuY2hpbGROb2RlcyksZz1sLmZpcnN0Q2hpbGQsZy50ZXh0Q29udGVudD1cIlwifWVsc2UgbS5wdXNoKGIuY3JlYXRlVGV4dE5vZGUoZikpO2wudGV4dENvbnRlbnQ9XCJcIixuPTA7d2hpbGUoZj1tW24rK10paWYoZCYmci5pbkFycmF5KGYsZCk+LTEpZSYmZS5wdXNoKGYpO2Vsc2UgaWYoaj1yLmNvbnRhaW5zKGYub3duZXJEb2N1bWVudCxmKSxnPW5hKGwuYXBwZW5kQ2hpbGQoZiksXCJzY3JpcHRcIiksaiYmb2EoZyksYyl7az0wO3doaWxlKGY9Z1trKytdKWxhLnRlc3QoZi50eXBlfHxcIlwiKSYmYy5wdXNoKGYpfXJldHVybiBsfSFmdW5jdGlvbigpe3ZhciBhPWQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLGI9YS5hcHBlbmRDaGlsZChkLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpLGM9ZC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7Yy5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsXCJyYWRpb1wiKSxjLnNldEF0dHJpYnV0ZShcImNoZWNrZWRcIixcImNoZWNrZWRcIiksYy5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsXCJ0XCIpLGIuYXBwZW5kQ2hpbGQoYyksby5jaGVja0Nsb25lPWIuY2xvbmVOb2RlKCEwKS5jbG9uZU5vZGUoITApLmxhc3RDaGlsZC5jaGVja2VkLGIuaW5uZXJIVE1MPVwiPHRleHRhcmVhPng8L3RleHRhcmVhPlwiLG8ubm9DbG9uZUNoZWNrZWQ9ISFiLmNsb25lTm9kZSghMCkubGFzdENoaWxkLmRlZmF1bHRWYWx1ZX0oKTt2YXIgcmE9ZC5kb2N1bWVudEVsZW1lbnQsc2E9L15rZXkvLHRhPS9eKD86bW91c2V8cG9pbnRlcnxjb250ZXh0bWVudXxkcmFnfGRyb3ApfGNsaWNrLyx1YT0vXihbXi5dKikoPzpcXC4oLispfCkvO2Z1bmN0aW9uIHZhKCl7cmV0dXJuITB9ZnVuY3Rpb24gd2EoKXtyZXR1cm4hMX1mdW5jdGlvbiB4YSgpe3RyeXtyZXR1cm4gZC5hY3RpdmVFbGVtZW50fWNhdGNoKGEpe319ZnVuY3Rpb24geWEoYSxiLGMsZCxlLGYpe3ZhciBnLGg7aWYoXCJvYmplY3RcIj09dHlwZW9mIGIpe1wic3RyaW5nXCIhPXR5cGVvZiBjJiYoZD1kfHxjLGM9dm9pZCAwKTtmb3IoaCBpbiBiKXlhKGEsaCxjLGQsYltoXSxmKTtyZXR1cm4gYX1pZihudWxsPT1kJiZudWxsPT1lPyhlPWMsZD1jPXZvaWQgMCk6bnVsbD09ZSYmKFwic3RyaW5nXCI9PXR5cGVvZiBjPyhlPWQsZD12b2lkIDApOihlPWQsZD1jLGM9dm9pZCAwKSksZT09PSExKWU9d2E7ZWxzZSBpZighZSlyZXR1cm4gYTtyZXR1cm4gMT09PWYmJihnPWUsZT1mdW5jdGlvbihhKXtyZXR1cm4gcigpLm9mZihhKSxnLmFwcGx5KHRoaXMsYXJndW1lbnRzKX0sZS5ndWlkPWcuZ3VpZHx8KGcuZ3VpZD1yLmd1aWQrKykpLGEuZWFjaChmdW5jdGlvbigpe3IuZXZlbnQuYWRkKHRoaXMsYixlLGQsYyl9KX1yLmV2ZW50PXtnbG9iYWw6e30sYWRkOmZ1bmN0aW9uKGEsYixjLGQsZSl7dmFyIGYsZyxoLGksaixrLGwsbSxuLG8scCxxPVcuZ2V0KGEpO2lmKHEpe2MuaGFuZGxlciYmKGY9YyxjPWYuaGFuZGxlcixlPWYuc2VsZWN0b3IpLGUmJnIuZmluZC5tYXRjaGVzU2VsZWN0b3IocmEsZSksYy5ndWlkfHwoYy5ndWlkPXIuZ3VpZCsrKSwoaT1xLmV2ZW50cyl8fChpPXEuZXZlbnRzPXt9KSwoZz1xLmhhbmRsZSl8fChnPXEuaGFuZGxlPWZ1bmN0aW9uKGIpe3JldHVyblwidW5kZWZpbmVkXCIhPXR5cGVvZiByJiZyLmV2ZW50LnRyaWdnZXJlZCE9PWIudHlwZT9yLmV2ZW50LmRpc3BhdGNoLmFwcGx5KGEsYXJndW1lbnRzKTp2b2lkIDB9KSxiPShifHxcIlwiKS5tYXRjaChMKXx8W1wiXCJdLGo9Yi5sZW5ndGg7d2hpbGUoai0tKWg9dWEuZXhlYyhiW2pdKXx8W10sbj1wPWhbMV0sbz0oaFsyXXx8XCJcIikuc3BsaXQoXCIuXCIpLnNvcnQoKSxuJiYobD1yLmV2ZW50LnNwZWNpYWxbbl18fHt9LG49KGU/bC5kZWxlZ2F0ZVR5cGU6bC5iaW5kVHlwZSl8fG4sbD1yLmV2ZW50LnNwZWNpYWxbbl18fHt9LGs9ci5leHRlbmQoe3R5cGU6bixvcmlnVHlwZTpwLGRhdGE6ZCxoYW5kbGVyOmMsZ3VpZDpjLmd1aWQsc2VsZWN0b3I6ZSxuZWVkc0NvbnRleHQ6ZSYmci5leHByLm1hdGNoLm5lZWRzQ29udGV4dC50ZXN0KGUpLG5hbWVzcGFjZTpvLmpvaW4oXCIuXCIpfSxmKSwobT1pW25dKXx8KG09aVtuXT1bXSxtLmRlbGVnYXRlQ291bnQ9MCxsLnNldHVwJiZsLnNldHVwLmNhbGwoYSxkLG8sZykhPT0hMXx8YS5hZGRFdmVudExpc3RlbmVyJiZhLmFkZEV2ZW50TGlzdGVuZXIobixnKSksbC5hZGQmJihsLmFkZC5jYWxsKGEsayksay5oYW5kbGVyLmd1aWR8fChrLmhhbmRsZXIuZ3VpZD1jLmd1aWQpKSxlP20uc3BsaWNlKG0uZGVsZWdhdGVDb3VudCsrLDAsayk6bS5wdXNoKGspLHIuZXZlbnQuZ2xvYmFsW25dPSEwKX19LHJlbW92ZTpmdW5jdGlvbihhLGIsYyxkLGUpe3ZhciBmLGcsaCxpLGosayxsLG0sbixvLHAscT1XLmhhc0RhdGEoYSkmJlcuZ2V0KGEpO2lmKHEmJihpPXEuZXZlbnRzKSl7Yj0oYnx8XCJcIikubWF0Y2goTCl8fFtcIlwiXSxqPWIubGVuZ3RoO3doaWxlKGotLSlpZihoPXVhLmV4ZWMoYltqXSl8fFtdLG49cD1oWzFdLG89KGhbMl18fFwiXCIpLnNwbGl0KFwiLlwiKS5zb3J0KCksbil7bD1yLmV2ZW50LnNwZWNpYWxbbl18fHt9LG49KGQ/bC5kZWxlZ2F0ZVR5cGU6bC5iaW5kVHlwZSl8fG4sbT1pW25dfHxbXSxoPWhbMl0mJm5ldyBSZWdFeHAoXCIoXnxcXFxcLilcIitvLmpvaW4oXCJcXFxcLig/Oi4qXFxcXC58KVwiKStcIihcXFxcLnwkKVwiKSxnPWY9bS5sZW5ndGg7d2hpbGUoZi0tKWs9bVtmXSwhZSYmcCE9PWsub3JpZ1R5cGV8fGMmJmMuZ3VpZCE9PWsuZ3VpZHx8aCYmIWgudGVzdChrLm5hbWVzcGFjZSl8fGQmJmQhPT1rLnNlbGVjdG9yJiYoXCIqKlwiIT09ZHx8IWsuc2VsZWN0b3IpfHwobS5zcGxpY2UoZiwxKSxrLnNlbGVjdG9yJiZtLmRlbGVnYXRlQ291bnQtLSxsLnJlbW92ZSYmbC5yZW1vdmUuY2FsbChhLGspKTtnJiYhbS5sZW5ndGgmJihsLnRlYXJkb3duJiZsLnRlYXJkb3duLmNhbGwoYSxvLHEuaGFuZGxlKSE9PSExfHxyLnJlbW92ZUV2ZW50KGEsbixxLmhhbmRsZSksZGVsZXRlIGlbbl0pfWVsc2UgZm9yKG4gaW4gaSlyLmV2ZW50LnJlbW92ZShhLG4rYltqXSxjLGQsITApO3IuaXNFbXB0eU9iamVjdChpKSYmVy5yZW1vdmUoYSxcImhhbmRsZSBldmVudHNcIil9fSxkaXNwYXRjaDpmdW5jdGlvbihhKXt2YXIgYj1yLmV2ZW50LmZpeChhKSxjLGQsZSxmLGcsaCxpPW5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKSxqPShXLmdldCh0aGlzLFwiZXZlbnRzXCIpfHx7fSlbYi50eXBlXXx8W10saz1yLmV2ZW50LnNwZWNpYWxbYi50eXBlXXx8e307Zm9yKGlbMF09YixjPTE7Yzxhcmd1bWVudHMubGVuZ3RoO2MrKylpW2NdPWFyZ3VtZW50c1tjXTtpZihiLmRlbGVnYXRlVGFyZ2V0PXRoaXMsIWsucHJlRGlzcGF0Y2h8fGsucHJlRGlzcGF0Y2guY2FsbCh0aGlzLGIpIT09ITEpe2g9ci5ldmVudC5oYW5kbGVycy5jYWxsKHRoaXMsYixqKSxjPTA7d2hpbGUoKGY9aFtjKytdKSYmIWIuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSl7Yi5jdXJyZW50VGFyZ2V0PWYuZWxlbSxkPTA7d2hpbGUoKGc9Zi5oYW5kbGVyc1tkKytdKSYmIWIuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSliLnJuYW1lc3BhY2UmJiFiLnJuYW1lc3BhY2UudGVzdChnLm5hbWVzcGFjZSl8fChiLmhhbmRsZU9iaj1nLGIuZGF0YT1nLmRhdGEsZT0oKHIuZXZlbnQuc3BlY2lhbFtnLm9yaWdUeXBlXXx8e30pLmhhbmRsZXx8Zy5oYW5kbGVyKS5hcHBseShmLmVsZW0saSksdm9pZCAwIT09ZSYmKGIucmVzdWx0PWUpPT09ITEmJihiLnByZXZlbnREZWZhdWx0KCksYi5zdG9wUHJvcGFnYXRpb24oKSkpfXJldHVybiBrLnBvc3REaXNwYXRjaCYmay5wb3N0RGlzcGF0Y2guY2FsbCh0aGlzLGIpLGIucmVzdWx0fX0saGFuZGxlcnM6ZnVuY3Rpb24oYSxiKXt2YXIgYyxkLGUsZixnLGg9W10saT1iLmRlbGVnYXRlQ291bnQsaj1hLnRhcmdldDtpZihpJiZqLm5vZGVUeXBlJiYhKFwiY2xpY2tcIj09PWEudHlwZSYmYS5idXR0b24+PTEpKWZvcig7aiE9PXRoaXM7aj1qLnBhcmVudE5vZGV8fHRoaXMpaWYoMT09PWoubm9kZVR5cGUmJihcImNsaWNrXCIhPT1hLnR5cGV8fGouZGlzYWJsZWQhPT0hMCkpe2ZvcihmPVtdLGc9e30sYz0wO2M8aTtjKyspZD1iW2NdLGU9ZC5zZWxlY3RvcitcIiBcIix2b2lkIDA9PT1nW2VdJiYoZ1tlXT1kLm5lZWRzQ29udGV4dD9yKGUsdGhpcykuaW5kZXgoaik+LTE6ci5maW5kKGUsdGhpcyxudWxsLFtqXSkubGVuZ3RoKSxnW2VdJiZmLnB1c2goZCk7Zi5sZW5ndGgmJmgucHVzaCh7ZWxlbTpqLGhhbmRsZXJzOmZ9KX1yZXR1cm4gaj10aGlzLGk8Yi5sZW5ndGgmJmgucHVzaCh7ZWxlbTpqLGhhbmRsZXJzOmIuc2xpY2UoaSl9KSxofSxhZGRQcm9wOmZ1bmN0aW9uKGEsYil7T2JqZWN0LmRlZmluZVByb3BlcnR5KHIuRXZlbnQucHJvdG90eXBlLGEse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLGdldDpyLmlzRnVuY3Rpb24oYik/ZnVuY3Rpb24oKXtpZih0aGlzLm9yaWdpbmFsRXZlbnQpcmV0dXJuIGIodGhpcy5vcmlnaW5hbEV2ZW50KX06ZnVuY3Rpb24oKXtpZih0aGlzLm9yaWdpbmFsRXZlbnQpcmV0dXJuIHRoaXMub3JpZ2luYWxFdmVudFthXX0sc2V0OmZ1bmN0aW9uKGIpe09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLGEse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOmJ9KX19KX0sZml4OmZ1bmN0aW9uKGEpe3JldHVybiBhW3IuZXhwYW5kb10/YTpuZXcgci5FdmVudChhKX0sc3BlY2lhbDp7bG9hZDp7bm9CdWJibGU6ITB9LGZvY3VzOnt0cmlnZ2VyOmZ1bmN0aW9uKCl7aWYodGhpcyE9PXhhKCkmJnRoaXMuZm9jdXMpcmV0dXJuIHRoaXMuZm9jdXMoKSwhMX0sZGVsZWdhdGVUeXBlOlwiZm9jdXNpblwifSxibHVyOnt0cmlnZ2VyOmZ1bmN0aW9uKCl7aWYodGhpcz09PXhhKCkmJnRoaXMuYmx1cilyZXR1cm4gdGhpcy5ibHVyKCksITF9LGRlbGVnYXRlVHlwZTpcImZvY3Vzb3V0XCJ9LGNsaWNrOnt0cmlnZ2VyOmZ1bmN0aW9uKCl7aWYoXCJjaGVja2JveFwiPT09dGhpcy50eXBlJiZ0aGlzLmNsaWNrJiZCKHRoaXMsXCJpbnB1dFwiKSlyZXR1cm4gdGhpcy5jbGljaygpLCExfSxfZGVmYXVsdDpmdW5jdGlvbihhKXtyZXR1cm4gQihhLnRhcmdldCxcImFcIil9fSxiZWZvcmV1bmxvYWQ6e3Bvc3REaXNwYXRjaDpmdW5jdGlvbihhKXt2b2lkIDAhPT1hLnJlc3VsdCYmYS5vcmlnaW5hbEV2ZW50JiYoYS5vcmlnaW5hbEV2ZW50LnJldHVyblZhbHVlPWEucmVzdWx0KX19fX0sci5yZW1vdmVFdmVudD1mdW5jdGlvbihhLGIsYyl7YS5yZW1vdmVFdmVudExpc3RlbmVyJiZhLnJlbW92ZUV2ZW50TGlzdGVuZXIoYixjKX0sci5FdmVudD1mdW5jdGlvbihhLGIpe3JldHVybiB0aGlzIGluc3RhbmNlb2Ygci5FdmVudD8oYSYmYS50eXBlPyh0aGlzLm9yaWdpbmFsRXZlbnQ9YSx0aGlzLnR5cGU9YS50eXBlLHRoaXMuaXNEZWZhdWx0UHJldmVudGVkPWEuZGVmYXVsdFByZXZlbnRlZHx8dm9pZCAwPT09YS5kZWZhdWx0UHJldmVudGVkJiZhLnJldHVyblZhbHVlPT09ITE/dmE6d2EsdGhpcy50YXJnZXQ9YS50YXJnZXQmJjM9PT1hLnRhcmdldC5ub2RlVHlwZT9hLnRhcmdldC5wYXJlbnROb2RlOmEudGFyZ2V0LHRoaXMuY3VycmVudFRhcmdldD1hLmN1cnJlbnRUYXJnZXQsdGhpcy5yZWxhdGVkVGFyZ2V0PWEucmVsYXRlZFRhcmdldCk6dGhpcy50eXBlPWEsYiYmci5leHRlbmQodGhpcyxiKSx0aGlzLnRpbWVTdGFtcD1hJiZhLnRpbWVTdGFtcHx8ci5ub3coKSx2b2lkKHRoaXNbci5leHBhbmRvXT0hMCkpOm5ldyByLkV2ZW50KGEsYil9LHIuRXZlbnQucHJvdG90eXBlPXtjb25zdHJ1Y3RvcjpyLkV2ZW50LGlzRGVmYXVsdFByZXZlbnRlZDp3YSxpc1Byb3BhZ2F0aW9uU3RvcHBlZDp3YSxpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZDp3YSxpc1NpbXVsYXRlZDohMSxwcmV2ZW50RGVmYXVsdDpmdW5jdGlvbigpe3ZhciBhPXRoaXMub3JpZ2luYWxFdmVudDt0aGlzLmlzRGVmYXVsdFByZXZlbnRlZD12YSxhJiYhdGhpcy5pc1NpbXVsYXRlZCYmYS5wcmV2ZW50RGVmYXVsdCgpfSxzdG9wUHJvcGFnYXRpb246ZnVuY3Rpb24oKXt2YXIgYT10aGlzLm9yaWdpbmFsRXZlbnQ7dGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZD12YSxhJiYhdGhpcy5pc1NpbXVsYXRlZCYmYS5zdG9wUHJvcGFnYXRpb24oKX0sc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5vcmlnaW5hbEV2ZW50O3RoaXMuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQ9dmEsYSYmIXRoaXMuaXNTaW11bGF0ZWQmJmEuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCksdGhpcy5zdG9wUHJvcGFnYXRpb24oKX19LHIuZWFjaCh7YWx0S2V5OiEwLGJ1YmJsZXM6ITAsY2FuY2VsYWJsZTohMCxjaGFuZ2VkVG91Y2hlczohMCxjdHJsS2V5OiEwLGRldGFpbDohMCxldmVudFBoYXNlOiEwLG1ldGFLZXk6ITAscGFnZVg6ITAscGFnZVk6ITAsc2hpZnRLZXk6ITAsdmlldzohMCxcImNoYXJcIjohMCxjaGFyQ29kZTohMCxrZXk6ITAsa2V5Q29kZTohMCxidXR0b246ITAsYnV0dG9uczohMCxjbGllbnRYOiEwLGNsaWVudFk6ITAsb2Zmc2V0WDohMCxvZmZzZXRZOiEwLHBvaW50ZXJJZDohMCxwb2ludGVyVHlwZTohMCxzY3JlZW5YOiEwLHNjcmVlblk6ITAsdGFyZ2V0VG91Y2hlczohMCx0b0VsZW1lbnQ6ITAsdG91Y2hlczohMCx3aGljaDpmdW5jdGlvbihhKXt2YXIgYj1hLmJ1dHRvbjtyZXR1cm4gbnVsbD09YS53aGljaCYmc2EudGVzdChhLnR5cGUpP251bGwhPWEuY2hhckNvZGU/YS5jaGFyQ29kZTphLmtleUNvZGU6IWEud2hpY2gmJnZvaWQgMCE9PWImJnRhLnRlc3QoYS50eXBlKT8xJmI/MToyJmI/Mzo0JmI/MjowOmEud2hpY2h9fSxyLmV2ZW50LmFkZFByb3ApLHIuZWFjaCh7bW91c2VlbnRlcjpcIm1vdXNlb3ZlclwiLG1vdXNlbGVhdmU6XCJtb3VzZW91dFwiLHBvaW50ZXJlbnRlcjpcInBvaW50ZXJvdmVyXCIscG9pbnRlcmxlYXZlOlwicG9pbnRlcm91dFwifSxmdW5jdGlvbihhLGIpe3IuZXZlbnQuc3BlY2lhbFthXT17ZGVsZWdhdGVUeXBlOmIsYmluZFR5cGU6YixoYW5kbGU6ZnVuY3Rpb24oYSl7dmFyIGMsZD10aGlzLGU9YS5yZWxhdGVkVGFyZ2V0LGY9YS5oYW5kbGVPYmo7cmV0dXJuIGUmJihlPT09ZHx8ci5jb250YWlucyhkLGUpKXx8KGEudHlwZT1mLm9yaWdUeXBlLGM9Zi5oYW5kbGVyLmFwcGx5KHRoaXMsYXJndW1lbnRzKSxhLnR5cGU9YiksY319fSksci5mbi5leHRlbmQoe29uOmZ1bmN0aW9uKGEsYixjLGQpe3JldHVybiB5YSh0aGlzLGEsYixjLGQpfSxvbmU6ZnVuY3Rpb24oYSxiLGMsZCl7cmV0dXJuIHlhKHRoaXMsYSxiLGMsZCwxKX0sb2ZmOmZ1bmN0aW9uKGEsYixjKXt2YXIgZCxlO2lmKGEmJmEucHJldmVudERlZmF1bHQmJmEuaGFuZGxlT2JqKXJldHVybiBkPWEuaGFuZGxlT2JqLHIoYS5kZWxlZ2F0ZVRhcmdldCkub2ZmKGQubmFtZXNwYWNlP2Qub3JpZ1R5cGUrXCIuXCIrZC5uYW1lc3BhY2U6ZC5vcmlnVHlwZSxkLnNlbGVjdG9yLGQuaGFuZGxlciksdGhpcztpZihcIm9iamVjdFwiPT10eXBlb2YgYSl7Zm9yKGUgaW4gYSl0aGlzLm9mZihlLGIsYVtlXSk7cmV0dXJuIHRoaXN9cmV0dXJuIGIhPT0hMSYmXCJmdW5jdGlvblwiIT10eXBlb2YgYnx8KGM9YixiPXZvaWQgMCksYz09PSExJiYoYz13YSksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7ci5ldmVudC5yZW1vdmUodGhpcyxhLGMsYil9KX19KTt2YXIgemE9LzwoPyFhcmVhfGJyfGNvbHxlbWJlZHxocnxpbWd8aW5wdXR8bGlua3xtZXRhfHBhcmFtKSgoW2Etel1bXlxcL1xcMD5cXHgyMFxcdFxcclxcblxcZl0qKVtePl0qKVxcLz4vZ2ksQWE9LzxzY3JpcHR8PHN0eWxlfDxsaW5rL2ksQmE9L2NoZWNrZWRcXHMqKD86W149XXw9XFxzKi5jaGVja2VkLikvaSxDYT0vXnRydWVcXC8oLiopLyxEYT0vXlxccyo8ISg/OlxcW0NEQVRBXFxbfC0tKXwoPzpcXF1cXF18LS0pPlxccyokL2c7ZnVuY3Rpb24gRWEoYSxiKXtyZXR1cm4gQihhLFwidGFibGVcIikmJkIoMTEhPT1iLm5vZGVUeXBlP2I6Yi5maXJzdENoaWxkLFwidHJcIik/cihcIj50Ym9keVwiLGEpWzBdfHxhOmF9ZnVuY3Rpb24gRmEoYSl7cmV0dXJuIGEudHlwZT0obnVsbCE9PWEuZ2V0QXR0cmlidXRlKFwidHlwZVwiKSkrXCIvXCIrYS50eXBlLGF9ZnVuY3Rpb24gR2EoYSl7dmFyIGI9Q2EuZXhlYyhhLnR5cGUpO3JldHVybiBiP2EudHlwZT1iWzFdOmEucmVtb3ZlQXR0cmlidXRlKFwidHlwZVwiKSxhfWZ1bmN0aW9uIEhhKGEsYil7dmFyIGMsZCxlLGYsZyxoLGksajtpZigxPT09Yi5ub2RlVHlwZSl7aWYoVy5oYXNEYXRhKGEpJiYoZj1XLmFjY2VzcyhhKSxnPVcuc2V0KGIsZiksaj1mLmV2ZW50cykpe2RlbGV0ZSBnLmhhbmRsZSxnLmV2ZW50cz17fTtmb3IoZSBpbiBqKWZvcihjPTAsZD1qW2VdLmxlbmd0aDtjPGQ7YysrKXIuZXZlbnQuYWRkKGIsZSxqW2VdW2NdKX1YLmhhc0RhdGEoYSkmJihoPVguYWNjZXNzKGEpLGk9ci5leHRlbmQoe30saCksWC5zZXQoYixpKSl9fWZ1bmN0aW9uIElhKGEsYil7dmFyIGM9Yi5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1wiaW5wdXRcIj09PWMmJmphLnRlc3QoYS50eXBlKT9iLmNoZWNrZWQ9YS5jaGVja2VkOlwiaW5wdXRcIiE9PWMmJlwidGV4dGFyZWFcIiE9PWN8fChiLmRlZmF1bHRWYWx1ZT1hLmRlZmF1bHRWYWx1ZSl9ZnVuY3Rpb24gSmEoYSxiLGMsZCl7Yj1nLmFwcGx5KFtdLGIpO3ZhciBlLGYsaCxpLGosayxsPTAsbT1hLmxlbmd0aCxuPW0tMSxxPWJbMF0scz1yLmlzRnVuY3Rpb24ocSk7aWYoc3x8bT4xJiZcInN0cmluZ1wiPT10eXBlb2YgcSYmIW8uY2hlY2tDbG9uZSYmQmEudGVzdChxKSlyZXR1cm4gYS5lYWNoKGZ1bmN0aW9uKGUpe3ZhciBmPWEuZXEoZSk7cyYmKGJbMF09cS5jYWxsKHRoaXMsZSxmLmh0bWwoKSkpLEphKGYsYixjLGQpfSk7aWYobSYmKGU9cWEoYixhWzBdLm93bmVyRG9jdW1lbnQsITEsYSxkKSxmPWUuZmlyc3RDaGlsZCwxPT09ZS5jaGlsZE5vZGVzLmxlbmd0aCYmKGU9ZiksZnx8ZCkpe2ZvcihoPXIubWFwKG5hKGUsXCJzY3JpcHRcIiksRmEpLGk9aC5sZW5ndGg7bDxtO2wrKylqPWUsbCE9PW4mJihqPXIuY2xvbmUoaiwhMCwhMCksaSYmci5tZXJnZShoLG5hKGosXCJzY3JpcHRcIikpKSxjLmNhbGwoYVtsXSxqLGwpO2lmKGkpZm9yKGs9aFtoLmxlbmd0aC0xXS5vd25lckRvY3VtZW50LHIubWFwKGgsR2EpLGw9MDtsPGk7bCsrKWo9aFtsXSxsYS50ZXN0KGoudHlwZXx8XCJcIikmJiFXLmFjY2VzcyhqLFwiZ2xvYmFsRXZhbFwiKSYmci5jb250YWlucyhrLGopJiYoai5zcmM/ci5fZXZhbFVybCYmci5fZXZhbFVybChqLnNyYyk6cChqLnRleHRDb250ZW50LnJlcGxhY2UoRGEsXCJcIiksaykpfXJldHVybiBhfWZ1bmN0aW9uIEthKGEsYixjKXtmb3IodmFyIGQsZT1iP3IuZmlsdGVyKGIsYSk6YSxmPTA7bnVsbCE9KGQ9ZVtmXSk7ZisrKWN8fDEhPT1kLm5vZGVUeXBlfHxyLmNsZWFuRGF0YShuYShkKSksZC5wYXJlbnROb2RlJiYoYyYmci5jb250YWlucyhkLm93bmVyRG9jdW1lbnQsZCkmJm9hKG5hKGQsXCJzY3JpcHRcIikpLGQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkKSk7cmV0dXJuIGF9ci5leHRlbmQoe2h0bWxQcmVmaWx0ZXI6ZnVuY3Rpb24oYSl7cmV0dXJuIGEucmVwbGFjZSh6YSxcIjwkMT48LyQyPlwiKX0sY2xvbmU6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkLGUsZixnLGg9YS5jbG9uZU5vZGUoITApLGk9ci5jb250YWlucyhhLm93bmVyRG9jdW1lbnQsYSk7aWYoIShvLm5vQ2xvbmVDaGVja2VkfHwxIT09YS5ub2RlVHlwZSYmMTEhPT1hLm5vZGVUeXBlfHxyLmlzWE1MRG9jKGEpKSlmb3IoZz1uYShoKSxmPW5hKGEpLGQ9MCxlPWYubGVuZ3RoO2Q8ZTtkKyspSWEoZltkXSxnW2RdKTtpZihiKWlmKGMpZm9yKGY9Znx8bmEoYSksZz1nfHxuYShoKSxkPTAsZT1mLmxlbmd0aDtkPGU7ZCsrKUhhKGZbZF0sZ1tkXSk7ZWxzZSBIYShhLGgpO3JldHVybiBnPW5hKGgsXCJzY3JpcHRcIiksZy5sZW5ndGg+MCYmb2EoZywhaSYmbmEoYSxcInNjcmlwdFwiKSksaH0sY2xlYW5EYXRhOmZ1bmN0aW9uKGEpe2Zvcih2YXIgYixjLGQsZT1yLmV2ZW50LnNwZWNpYWwsZj0wO3ZvaWQgMCE9PShjPWFbZl0pO2YrKylpZihVKGMpKXtpZihiPWNbVy5leHBhbmRvXSl7aWYoYi5ldmVudHMpZm9yKGQgaW4gYi5ldmVudHMpZVtkXT9yLmV2ZW50LnJlbW92ZShjLGQpOnIucmVtb3ZlRXZlbnQoYyxkLGIuaGFuZGxlKTtjW1cuZXhwYW5kb109dm9pZCAwfWNbWC5leHBhbmRvXSYmKGNbWC5leHBhbmRvXT12b2lkIDApfX19KSxyLmZuLmV4dGVuZCh7ZGV0YWNoOmZ1bmN0aW9uKGEpe3JldHVybiBLYSh0aGlzLGEsITApfSxyZW1vdmU6ZnVuY3Rpb24oYSl7cmV0dXJuIEthKHRoaXMsYSl9LHRleHQ6ZnVuY3Rpb24oYSl7cmV0dXJuIFQodGhpcyxmdW5jdGlvbihhKXtyZXR1cm4gdm9pZCAwPT09YT9yLnRleHQodGhpcyk6dGhpcy5lbXB0eSgpLmVhY2goZnVuY3Rpb24oKXsxIT09dGhpcy5ub2RlVHlwZSYmMTEhPT10aGlzLm5vZGVUeXBlJiY5IT09dGhpcy5ub2RlVHlwZXx8KHRoaXMudGV4dENvbnRlbnQ9YSl9KX0sbnVsbCxhLGFyZ3VtZW50cy5sZW5ndGgpfSxhcHBlbmQ6ZnVuY3Rpb24oKXtyZXR1cm4gSmEodGhpcyxhcmd1bWVudHMsZnVuY3Rpb24oYSl7aWYoMT09PXRoaXMubm9kZVR5cGV8fDExPT09dGhpcy5ub2RlVHlwZXx8OT09PXRoaXMubm9kZVR5cGUpe3ZhciBiPUVhKHRoaXMsYSk7Yi5hcHBlbmRDaGlsZChhKX19KX0scHJlcGVuZDpmdW5jdGlvbigpe3JldHVybiBKYSh0aGlzLGFyZ3VtZW50cyxmdW5jdGlvbihhKXtpZigxPT09dGhpcy5ub2RlVHlwZXx8MTE9PT10aGlzLm5vZGVUeXBlfHw5PT09dGhpcy5ub2RlVHlwZSl7dmFyIGI9RWEodGhpcyxhKTtiLmluc2VydEJlZm9yZShhLGIuZmlyc3RDaGlsZCl9fSl9LGJlZm9yZTpmdW5jdGlvbigpe3JldHVybiBKYSh0aGlzLGFyZ3VtZW50cyxmdW5jdGlvbihhKXt0aGlzLnBhcmVudE5vZGUmJnRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSx0aGlzKX0pfSxhZnRlcjpmdW5jdGlvbigpe3JldHVybiBKYSh0aGlzLGFyZ3VtZW50cyxmdW5jdGlvbihhKXt0aGlzLnBhcmVudE5vZGUmJnRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSx0aGlzLm5leHRTaWJsaW5nKX0pfSxlbXB0eTpmdW5jdGlvbigpe2Zvcih2YXIgYSxiPTA7bnVsbCE9KGE9dGhpc1tiXSk7YisrKTE9PT1hLm5vZGVUeXBlJiYoci5jbGVhbkRhdGEobmEoYSwhMSkpLGEudGV4dENvbnRlbnQ9XCJcIik7cmV0dXJuIHRoaXN9LGNsb25lOmZ1bmN0aW9uKGEsYil7cmV0dXJuIGE9bnVsbCE9YSYmYSxiPW51bGw9PWI/YTpiLHRoaXMubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIHIuY2xvbmUodGhpcyxhLGIpfSl9LGh0bWw6ZnVuY3Rpb24oYSl7cmV0dXJuIFQodGhpcyxmdW5jdGlvbihhKXt2YXIgYj10aGlzWzBdfHx7fSxjPTAsZD10aGlzLmxlbmd0aDtpZih2b2lkIDA9PT1hJiYxPT09Yi5ub2RlVHlwZSlyZXR1cm4gYi5pbm5lckhUTUw7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGEmJiFBYS50ZXN0KGEpJiYhbWFbKGthLmV4ZWMoYSl8fFtcIlwiLFwiXCJdKVsxXS50b0xvd2VyQ2FzZSgpXSl7YT1yLmh0bWxQcmVmaWx0ZXIoYSk7dHJ5e2Zvcig7YzxkO2MrKyliPXRoaXNbY118fHt9LDE9PT1iLm5vZGVUeXBlJiYoci5jbGVhbkRhdGEobmEoYiwhMSkpLGIuaW5uZXJIVE1MPWEpO2I9MH1jYXRjaChlKXt9fWImJnRoaXMuZW1wdHkoKS5hcHBlbmQoYSl9LG51bGwsYSxhcmd1bWVudHMubGVuZ3RoKX0scmVwbGFjZVdpdGg6ZnVuY3Rpb24oKXt2YXIgYT1bXTtyZXR1cm4gSmEodGhpcyxhcmd1bWVudHMsZnVuY3Rpb24oYil7dmFyIGM9dGhpcy5wYXJlbnROb2RlO3IuaW5BcnJheSh0aGlzLGEpPDAmJihyLmNsZWFuRGF0YShuYSh0aGlzKSksYyYmYy5yZXBsYWNlQ2hpbGQoYix0aGlzKSl9LGEpfX0pLHIuZWFjaCh7YXBwZW5kVG86XCJhcHBlbmRcIixwcmVwZW5kVG86XCJwcmVwZW5kXCIsaW5zZXJ0QmVmb3JlOlwiYmVmb3JlXCIsaW5zZXJ0QWZ0ZXI6XCJhZnRlclwiLHJlcGxhY2VBbGw6XCJyZXBsYWNlV2l0aFwifSxmdW5jdGlvbihhLGIpe3IuZm5bYV09ZnVuY3Rpb24oYSl7Zm9yKHZhciBjLGQ9W10sZT1yKGEpLGY9ZS5sZW5ndGgtMSxnPTA7Zzw9ZjtnKyspYz1nPT09Zj90aGlzOnRoaXMuY2xvbmUoITApLHIoZVtnXSlbYl0oYyksaC5hcHBseShkLGMuZ2V0KCkpO3JldHVybiB0aGlzLnB1c2hTdGFjayhkKX19KTt2YXIgTGE9L15tYXJnaW4vLE1hPW5ldyBSZWdFeHAoXCJeKFwiK2FhK1wiKSg/IXB4KVthLXolXSskXCIsXCJpXCIpLE5hPWZ1bmN0aW9uKGIpe3ZhciBjPWIub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldztyZXR1cm4gYyYmYy5vcGVuZXJ8fChjPWEpLGMuZ2V0Q29tcHV0ZWRTdHlsZShiKX07IWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYigpe2lmKGkpe2kuc3R5bGUuY3NzVGV4dD1cImJveC1zaXppbmc6Ym9yZGVyLWJveDtwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO21hcmdpbjphdXRvO2JvcmRlcjoxcHg7cGFkZGluZzoxcHg7dG9wOjElO3dpZHRoOjUwJVwiLGkuaW5uZXJIVE1MPVwiXCIscmEuYXBwZW5kQ2hpbGQoaCk7dmFyIGI9YS5nZXRDb21wdXRlZFN0eWxlKGkpO2M9XCIxJVwiIT09Yi50b3AsZz1cIjJweFwiPT09Yi5tYXJnaW5MZWZ0LGU9XCI0cHhcIj09PWIud2lkdGgsaS5zdHlsZS5tYXJnaW5SaWdodD1cIjUwJVwiLGY9XCI0cHhcIj09PWIubWFyZ2luUmlnaHQscmEucmVtb3ZlQ2hpbGQoaCksaT1udWxsfX12YXIgYyxlLGYsZyxoPWQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxpPWQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtpLnN0eWxlJiYoaS5zdHlsZS5iYWNrZ3JvdW5kQ2xpcD1cImNvbnRlbnQtYm94XCIsaS5jbG9uZU5vZGUoITApLnN0eWxlLmJhY2tncm91bmRDbGlwPVwiXCIsby5jbGVhckNsb25lU3R5bGU9XCJjb250ZW50LWJveFwiPT09aS5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCxoLnN0eWxlLmNzc1RleHQ9XCJib3JkZXI6MDt3aWR0aDo4cHg7aGVpZ2h0OjA7dG9wOjA7bGVmdDotOTk5OXB4O3BhZGRpbmc6MDttYXJnaW4tdG9wOjFweDtwb3NpdGlvbjphYnNvbHV0ZVwiLGguYXBwZW5kQ2hpbGQoaSksci5leHRlbmQobyx7cGl4ZWxQb3NpdGlvbjpmdW5jdGlvbigpe3JldHVybiBiKCksY30sYm94U2l6aW5nUmVsaWFibGU6ZnVuY3Rpb24oKXtyZXR1cm4gYigpLGV9LHBpeGVsTWFyZ2luUmlnaHQ6ZnVuY3Rpb24oKXtyZXR1cm4gYigpLGZ9LHJlbGlhYmxlTWFyZ2luTGVmdDpmdW5jdGlvbigpe3JldHVybiBiKCksZ319KSl9KCk7ZnVuY3Rpb24gT2EoYSxiLGMpe3ZhciBkLGUsZixnLGg9YS5zdHlsZTtyZXR1cm4gYz1jfHxOYShhKSxjJiYoZz1jLmdldFByb3BlcnR5VmFsdWUoYil8fGNbYl0sXCJcIiE9PWd8fHIuY29udGFpbnMoYS5vd25lckRvY3VtZW50LGEpfHwoZz1yLnN0eWxlKGEsYikpLCFvLnBpeGVsTWFyZ2luUmlnaHQoKSYmTWEudGVzdChnKSYmTGEudGVzdChiKSYmKGQ9aC53aWR0aCxlPWgubWluV2lkdGgsZj1oLm1heFdpZHRoLGgubWluV2lkdGg9aC5tYXhXaWR0aD1oLndpZHRoPWcsZz1jLndpZHRoLGgud2lkdGg9ZCxoLm1pbldpZHRoPWUsaC5tYXhXaWR0aD1mKSksdm9pZCAwIT09Zz9nK1wiXCI6Z31mdW5jdGlvbiBQYShhLGIpe3JldHVybntnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gYSgpP3ZvaWQgZGVsZXRlIHRoaXMuZ2V0Oih0aGlzLmdldD1iKS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fX12YXIgUWE9L14obm9uZXx0YWJsZSg/IS1jW2VhXSkuKykvLFJhPS9eLS0vLFNhPXtwb3NpdGlvbjpcImFic29sdXRlXCIsdmlzaWJpbGl0eTpcImhpZGRlblwiLGRpc3BsYXk6XCJibG9ja1wifSxUYT17bGV0dGVyU3BhY2luZzpcIjBcIixmb250V2VpZ2h0OlwiNDAwXCJ9LFVhPVtcIldlYmtpdFwiLFwiTW96XCIsXCJtc1wiXSxWYT1kLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikuc3R5bGU7ZnVuY3Rpb24gV2EoYSl7aWYoYSBpbiBWYSlyZXR1cm4gYTt2YXIgYj1hWzBdLnRvVXBwZXJDYXNlKCkrYS5zbGljZSgxKSxjPVVhLmxlbmd0aDt3aGlsZShjLS0paWYoYT1VYVtjXStiLGEgaW4gVmEpcmV0dXJuIGF9ZnVuY3Rpb24gWGEoYSl7dmFyIGI9ci5jc3NQcm9wc1thXTtyZXR1cm4gYnx8KGI9ci5jc3NQcm9wc1thXT1XYShhKXx8YSksYn1mdW5jdGlvbiBZYShhLGIsYyl7dmFyIGQ9YmEuZXhlYyhiKTtyZXR1cm4gZD9NYXRoLm1heCgwLGRbMl0tKGN8fDApKSsoZFszXXx8XCJweFwiKTpifWZ1bmN0aW9uIFphKGEsYixjLGQsZSl7dmFyIGYsZz0wO2ZvcihmPWM9PT0oZD9cImJvcmRlclwiOlwiY29udGVudFwiKT80Olwid2lkdGhcIj09PWI/MTowO2Y8NDtmKz0yKVwibWFyZ2luXCI9PT1jJiYoZys9ci5jc3MoYSxjK2NhW2ZdLCEwLGUpKSxkPyhcImNvbnRlbnRcIj09PWMmJihnLT1yLmNzcyhhLFwicGFkZGluZ1wiK2NhW2ZdLCEwLGUpKSxcIm1hcmdpblwiIT09YyYmKGctPXIuY3NzKGEsXCJib3JkZXJcIitjYVtmXStcIldpZHRoXCIsITAsZSkpKTooZys9ci5jc3MoYSxcInBhZGRpbmdcIitjYVtmXSwhMCxlKSxcInBhZGRpbmdcIiE9PWMmJihnKz1yLmNzcyhhLFwiYm9yZGVyXCIrY2FbZl0rXCJXaWR0aFwiLCEwLGUpKSk7cmV0dXJuIGd9ZnVuY3Rpb24gJGEoYSxiLGMpe3ZhciBkLGU9TmEoYSksZj1PYShhLGIsZSksZz1cImJvcmRlci1ib3hcIj09PXIuY3NzKGEsXCJib3hTaXppbmdcIiwhMSxlKTtyZXR1cm4gTWEudGVzdChmKT9mOihkPWcmJihvLmJveFNpemluZ1JlbGlhYmxlKCl8fGY9PT1hLnN0eWxlW2JdKSxcImF1dG9cIj09PWYmJihmPWFbXCJvZmZzZXRcIitiWzBdLnRvVXBwZXJDYXNlKCkrYi5zbGljZSgxKV0pLGY9cGFyc2VGbG9hdChmKXx8MCxmK1phKGEsYixjfHwoZz9cImJvcmRlclwiOlwiY29udGVudFwiKSxkLGUpK1wicHhcIil9ci5leHRlbmQoe2Nzc0hvb2tzOntvcGFjaXR5OntnZXQ6ZnVuY3Rpb24oYSxiKXtpZihiKXt2YXIgYz1PYShhLFwib3BhY2l0eVwiKTtyZXR1cm5cIlwiPT09Yz9cIjFcIjpjfX19fSxjc3NOdW1iZXI6e2FuaW1hdGlvbkl0ZXJhdGlvbkNvdW50OiEwLGNvbHVtbkNvdW50OiEwLGZpbGxPcGFjaXR5OiEwLGZsZXhHcm93OiEwLGZsZXhTaHJpbms6ITAsZm9udFdlaWdodDohMCxsaW5lSGVpZ2h0OiEwLG9wYWNpdHk6ITAsb3JkZXI6ITAsb3JwaGFuczohMCx3aWRvd3M6ITAsekluZGV4OiEwLHpvb206ITB9LGNzc1Byb3BzOntcImZsb2F0XCI6XCJjc3NGbG9hdFwifSxzdHlsZTpmdW5jdGlvbihhLGIsYyxkKXtpZihhJiYzIT09YS5ub2RlVHlwZSYmOCE9PWEubm9kZVR5cGUmJmEuc3R5bGUpe3ZhciBlLGYsZyxoPXIuY2FtZWxDYXNlKGIpLGk9UmEudGVzdChiKSxqPWEuc3R5bGU7cmV0dXJuIGl8fChiPVhhKGgpKSxnPXIuY3NzSG9va3NbYl18fHIuY3NzSG9va3NbaF0sdm9pZCAwPT09Yz9nJiZcImdldFwiaW4gZyYmdm9pZCAwIT09KGU9Zy5nZXQoYSwhMSxkKSk/ZTpqW2JdOihmPXR5cGVvZiBjLFwic3RyaW5nXCI9PT1mJiYoZT1iYS5leGVjKGMpKSYmZVsxXSYmKGM9ZmEoYSxiLGUpLGY9XCJudW1iZXJcIiksbnVsbCE9YyYmYz09PWMmJihcIm51bWJlclwiPT09ZiYmKGMrPWUmJmVbM118fChyLmNzc051bWJlcltoXT9cIlwiOlwicHhcIikpLG8uY2xlYXJDbG9uZVN0eWxlfHxcIlwiIT09Y3x8MCE9PWIuaW5kZXhPZihcImJhY2tncm91bmRcIil8fChqW2JdPVwiaW5oZXJpdFwiKSxnJiZcInNldFwiaW4gZyYmdm9pZCAwPT09KGM9Zy5zZXQoYSxjLGQpKXx8KGk/ai5zZXRQcm9wZXJ0eShiLGMpOmpbYl09YykpLHZvaWQgMCl9fSxjc3M6ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGUsZixnLGg9ci5jYW1lbENhc2UoYiksaT1SYS50ZXN0KGIpO3JldHVybiBpfHwoYj1YYShoKSksZz1yLmNzc0hvb2tzW2JdfHxyLmNzc0hvb2tzW2hdLGcmJlwiZ2V0XCJpbiBnJiYoZT1nLmdldChhLCEwLGMpKSx2b2lkIDA9PT1lJiYoZT1PYShhLGIsZCkpLFwibm9ybWFsXCI9PT1lJiZiIGluIFRhJiYoZT1UYVtiXSksXCJcIj09PWN8fGM/KGY9cGFyc2VGbG9hdChlKSxjPT09ITB8fGlzRmluaXRlKGYpP2Z8fDA6ZSk6ZX19KSxyLmVhY2goW1wiaGVpZ2h0XCIsXCJ3aWR0aFwiXSxmdW5jdGlvbihhLGIpe3IuY3NzSG9va3NbYl09e2dldDpmdW5jdGlvbihhLGMsZCl7aWYoYylyZXR1cm4hUWEudGVzdChyLmNzcyhhLFwiZGlzcGxheVwiKSl8fGEuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGgmJmEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg/JGEoYSxiLGQpOmVhKGEsU2EsZnVuY3Rpb24oKXtyZXR1cm4gJGEoYSxiLGQpfSl9LHNldDpmdW5jdGlvbihhLGMsZCl7dmFyIGUsZj1kJiZOYShhKSxnPWQmJlphKGEsYixkLFwiYm9yZGVyLWJveFwiPT09ci5jc3MoYSxcImJveFNpemluZ1wiLCExLGYpLGYpO3JldHVybiBnJiYoZT1iYS5leGVjKGMpKSYmXCJweFwiIT09KGVbM118fFwicHhcIikmJihhLnN0eWxlW2JdPWMsYz1yLmNzcyhhLGIpKSxZYShhLGMsZyl9fX0pLHIuY3NzSG9va3MubWFyZ2luTGVmdD1QYShvLnJlbGlhYmxlTWFyZ2luTGVmdCxmdW5jdGlvbihhLGIpe2lmKGIpcmV0dXJuKHBhcnNlRmxvYXQoT2EoYSxcIm1hcmdpbkxlZnRcIikpfHxhLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQtZWEoYSx7bWFyZ2luTGVmdDowfSxmdW5jdGlvbigpe3JldHVybiBhLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnR9KSkrXCJweFwifSksci5lYWNoKHttYXJnaW46XCJcIixwYWRkaW5nOlwiXCIsYm9yZGVyOlwiV2lkdGhcIn0sZnVuY3Rpb24oYSxiKXtyLmNzc0hvb2tzW2ErYl09e2V4cGFuZDpmdW5jdGlvbihjKXtmb3IodmFyIGQ9MCxlPXt9LGY9XCJzdHJpbmdcIj09dHlwZW9mIGM/Yy5zcGxpdChcIiBcIik6W2NdO2Q8NDtkKyspZVthK2NhW2RdK2JdPWZbZF18fGZbZC0yXXx8ZlswXTtyZXR1cm4gZX19LExhLnRlc3QoYSl8fChyLmNzc0hvb2tzW2ErYl0uc2V0PVlhKX0pLHIuZm4uZXh0ZW5kKHtjc3M6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gVCh0aGlzLGZ1bmN0aW9uKGEsYixjKXt2YXIgZCxlLGY9e30sZz0wO2lmKEFycmF5LmlzQXJyYXkoYikpe2ZvcihkPU5hKGEpLGU9Yi5sZW5ndGg7ZzxlO2crKylmW2JbZ11dPXIuY3NzKGEsYltnXSwhMSxkKTtyZXR1cm4gZn1yZXR1cm4gdm9pZCAwIT09Yz9yLnN0eWxlKGEsYixjKTpyLmNzcyhhLGIpfSxhLGIsYXJndW1lbnRzLmxlbmd0aD4xKX19KTtmdW5jdGlvbiBfYShhLGIsYyxkLGUpe3JldHVybiBuZXcgX2EucHJvdG90eXBlLmluaXQoYSxiLGMsZCxlKX1yLlR3ZWVuPV9hLF9hLnByb3RvdHlwZT17Y29uc3RydWN0b3I6X2EsaW5pdDpmdW5jdGlvbihhLGIsYyxkLGUsZil7dGhpcy5lbGVtPWEsdGhpcy5wcm9wPWMsdGhpcy5lYXNpbmc9ZXx8ci5lYXNpbmcuX2RlZmF1bHQsdGhpcy5vcHRpb25zPWIsdGhpcy5zdGFydD10aGlzLm5vdz10aGlzLmN1cigpLHRoaXMuZW5kPWQsdGhpcy51bml0PWZ8fChyLmNzc051bWJlcltjXT9cIlwiOlwicHhcIil9LGN1cjpmdW5jdGlvbigpe3ZhciBhPV9hLnByb3BIb29rc1t0aGlzLnByb3BdO3JldHVybiBhJiZhLmdldD9hLmdldCh0aGlzKTpfYS5wcm9wSG9va3MuX2RlZmF1bHQuZ2V0KHRoaXMpfSxydW46ZnVuY3Rpb24oYSl7dmFyIGIsYz1fYS5wcm9wSG9va3NbdGhpcy5wcm9wXTtyZXR1cm4gdGhpcy5vcHRpb25zLmR1cmF0aW9uP3RoaXMucG9zPWI9ci5lYXNpbmdbdGhpcy5lYXNpbmddKGEsdGhpcy5vcHRpb25zLmR1cmF0aW9uKmEsMCwxLHRoaXMub3B0aW9ucy5kdXJhdGlvbik6dGhpcy5wb3M9Yj1hLHRoaXMubm93PSh0aGlzLmVuZC10aGlzLnN0YXJ0KSpiK3RoaXMuc3RhcnQsdGhpcy5vcHRpb25zLnN0ZXAmJnRoaXMub3B0aW9ucy5zdGVwLmNhbGwodGhpcy5lbGVtLHRoaXMubm93LHRoaXMpLGMmJmMuc2V0P2Muc2V0KHRoaXMpOl9hLnByb3BIb29rcy5fZGVmYXVsdC5zZXQodGhpcyksdGhpc319LF9hLnByb3RvdHlwZS5pbml0LnByb3RvdHlwZT1fYS5wcm90b3R5cGUsX2EucHJvcEhvb2tzPXtfZGVmYXVsdDp7Z2V0OmZ1bmN0aW9uKGEpe3ZhciBiO3JldHVybiAxIT09YS5lbGVtLm5vZGVUeXBlfHxudWxsIT1hLmVsZW1bYS5wcm9wXSYmbnVsbD09YS5lbGVtLnN0eWxlW2EucHJvcF0/YS5lbGVtW2EucHJvcF06KGI9ci5jc3MoYS5lbGVtLGEucHJvcCxcIlwiKSxiJiZcImF1dG9cIiE9PWI/YjowKX0sc2V0OmZ1bmN0aW9uKGEpe3IuZnguc3RlcFthLnByb3BdP3IuZnguc3RlcFthLnByb3BdKGEpOjEhPT1hLmVsZW0ubm9kZVR5cGV8fG51bGw9PWEuZWxlbS5zdHlsZVtyLmNzc1Byb3BzW2EucHJvcF1dJiYhci5jc3NIb29rc1thLnByb3BdP2EuZWxlbVthLnByb3BdPWEubm93OnIuc3R5bGUoYS5lbGVtLGEucHJvcCxhLm5vdythLnVuaXQpfX19LF9hLnByb3BIb29rcy5zY3JvbGxUb3A9X2EucHJvcEhvb2tzLnNjcm9sbExlZnQ9e3NldDpmdW5jdGlvbihhKXthLmVsZW0ubm9kZVR5cGUmJmEuZWxlbS5wYXJlbnROb2RlJiYoYS5lbGVtW2EucHJvcF09YS5ub3cpfX0sci5lYXNpbmc9e2xpbmVhcjpmdW5jdGlvbihhKXtyZXR1cm4gYX0sc3dpbmc6ZnVuY3Rpb24oYSl7cmV0dXJuLjUtTWF0aC5jb3MoYSpNYXRoLlBJKS8yfSxfZGVmYXVsdDpcInN3aW5nXCJ9LHIuZng9X2EucHJvdG90eXBlLmluaXQsci5meC5zdGVwPXt9O3ZhciBhYixiYixjYj0vXig/OnRvZ2dsZXxzaG93fGhpZGUpJC8sZGI9L3F1ZXVlSG9va3MkLztmdW5jdGlvbiBlYigpe2JiJiYoZC5oaWRkZW49PT0hMSYmYS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU/YS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZWIpOmEuc2V0VGltZW91dChlYixyLmZ4LmludGVydmFsKSxyLmZ4LnRpY2soKSl9ZnVuY3Rpb24gZmIoKXtyZXR1cm4gYS5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YWI9dm9pZCAwfSksYWI9ci5ub3coKX1mdW5jdGlvbiBnYihhLGIpe3ZhciBjLGQ9MCxlPXtoZWlnaHQ6YX07Zm9yKGI9Yj8xOjA7ZDw0O2QrPTItYiljPWNhW2RdLGVbXCJtYXJnaW5cIitjXT1lW1wicGFkZGluZ1wiK2NdPWE7cmV0dXJuIGImJihlLm9wYWNpdHk9ZS53aWR0aD1hKSxlfWZ1bmN0aW9uIGhiKGEsYixjKXtmb3IodmFyIGQsZT0oa2IudHdlZW5lcnNbYl18fFtdKS5jb25jYXQoa2IudHdlZW5lcnNbXCIqXCJdKSxmPTAsZz1lLmxlbmd0aDtmPGc7ZisrKWlmKGQ9ZVtmXS5jYWxsKGMsYixhKSlyZXR1cm4gZH1mdW5jdGlvbiBpYihhLGIsYyl7dmFyIGQsZSxmLGcsaCxpLGosayxsPVwid2lkdGhcImluIGJ8fFwiaGVpZ2h0XCJpbiBiLG09dGhpcyxuPXt9LG89YS5zdHlsZSxwPWEubm9kZVR5cGUmJmRhKGEpLHE9Vy5nZXQoYSxcImZ4c2hvd1wiKTtjLnF1ZXVlfHwoZz1yLl9xdWV1ZUhvb2tzKGEsXCJmeFwiKSxudWxsPT1nLnVucXVldWVkJiYoZy51bnF1ZXVlZD0wLGg9Zy5lbXB0eS5maXJlLGcuZW1wdHkuZmlyZT1mdW5jdGlvbigpe2cudW5xdWV1ZWR8fGgoKX0pLGcudW5xdWV1ZWQrKyxtLmFsd2F5cyhmdW5jdGlvbigpe20uYWx3YXlzKGZ1bmN0aW9uKCl7Zy51bnF1ZXVlZC0tLHIucXVldWUoYSxcImZ4XCIpLmxlbmd0aHx8Zy5lbXB0eS5maXJlKCl9KX0pKTtmb3IoZCBpbiBiKWlmKGU9YltkXSxjYi50ZXN0KGUpKXtpZihkZWxldGUgYltkXSxmPWZ8fFwidG9nZ2xlXCI9PT1lLGU9PT0ocD9cImhpZGVcIjpcInNob3dcIikpe2lmKFwic2hvd1wiIT09ZXx8IXF8fHZvaWQgMD09PXFbZF0pY29udGludWU7cD0hMH1uW2RdPXEmJnFbZF18fHIuc3R5bGUoYSxkKX1pZihpPSFyLmlzRW1wdHlPYmplY3QoYiksaXx8IXIuaXNFbXB0eU9iamVjdChuKSl7bCYmMT09PWEubm9kZVR5cGUmJihjLm92ZXJmbG93PVtvLm92ZXJmbG93LG8ub3ZlcmZsb3dYLG8ub3ZlcmZsb3dZXSxqPXEmJnEuZGlzcGxheSxudWxsPT1qJiYoaj1XLmdldChhLFwiZGlzcGxheVwiKSksaz1yLmNzcyhhLFwiZGlzcGxheVwiKSxcIm5vbmVcIj09PWsmJihqP2s9ajooaWEoW2FdLCEwKSxqPWEuc3R5bGUuZGlzcGxheXx8aixrPXIuY3NzKGEsXCJkaXNwbGF5XCIpLGlhKFthXSkpKSwoXCJpbmxpbmVcIj09PWt8fFwiaW5saW5lLWJsb2NrXCI9PT1rJiZudWxsIT1qKSYmXCJub25lXCI9PT1yLmNzcyhhLFwiZmxvYXRcIikmJihpfHwobS5kb25lKGZ1bmN0aW9uKCl7by5kaXNwbGF5PWp9KSxudWxsPT1qJiYoaz1vLmRpc3BsYXksaj1cIm5vbmVcIj09PWs/XCJcIjprKSksby5kaXNwbGF5PVwiaW5saW5lLWJsb2NrXCIpKSxjLm92ZXJmbG93JiYoby5vdmVyZmxvdz1cImhpZGRlblwiLG0uYWx3YXlzKGZ1bmN0aW9uKCl7by5vdmVyZmxvdz1jLm92ZXJmbG93WzBdLG8ub3ZlcmZsb3dYPWMub3ZlcmZsb3dbMV0sby5vdmVyZmxvd1k9Yy5vdmVyZmxvd1syXX0pKSxpPSExO2ZvcihkIGluIG4paXx8KHE/XCJoaWRkZW5cImluIHEmJihwPXEuaGlkZGVuKTpxPVcuYWNjZXNzKGEsXCJmeHNob3dcIix7ZGlzcGxheTpqfSksZiYmKHEuaGlkZGVuPSFwKSxwJiZpYShbYV0sITApLG0uZG9uZShmdW5jdGlvbigpe3B8fGlhKFthXSksVy5yZW1vdmUoYSxcImZ4c2hvd1wiKTtmb3IoZCBpbiBuKXIuc3R5bGUoYSxkLG5bZF0pfSkpLGk9aGIocD9xW2RdOjAsZCxtKSxkIGluIHF8fChxW2RdPWkuc3RhcnQscCYmKGkuZW5kPWkuc3RhcnQsaS5zdGFydD0wKSl9fWZ1bmN0aW9uIGpiKGEsYil7dmFyIGMsZCxlLGYsZztmb3IoYyBpbiBhKWlmKGQ9ci5jYW1lbENhc2UoYyksZT1iW2RdLGY9YVtjXSxBcnJheS5pc0FycmF5KGYpJiYoZT1mWzFdLGY9YVtjXT1mWzBdKSxjIT09ZCYmKGFbZF09ZixkZWxldGUgYVtjXSksZz1yLmNzc0hvb2tzW2RdLGcmJlwiZXhwYW5kXCJpbiBnKXtmPWcuZXhwYW5kKGYpLGRlbGV0ZSBhW2RdO2ZvcihjIGluIGYpYyBpbiBhfHwoYVtjXT1mW2NdLGJbY109ZSl9ZWxzZSBiW2RdPWV9ZnVuY3Rpb24ga2IoYSxiLGMpe3ZhciBkLGUsZj0wLGc9a2IucHJlZmlsdGVycy5sZW5ndGgsaD1yLkRlZmVycmVkKCkuYWx3YXlzKGZ1bmN0aW9uKCl7ZGVsZXRlIGkuZWxlbX0pLGk9ZnVuY3Rpb24oKXtpZihlKXJldHVybiExO2Zvcih2YXIgYj1hYnx8ZmIoKSxjPU1hdGgubWF4KDAsai5zdGFydFRpbWUrai5kdXJhdGlvbi1iKSxkPWMvai5kdXJhdGlvbnx8MCxmPTEtZCxnPTAsaT1qLnR3ZWVucy5sZW5ndGg7ZzxpO2crKylqLnR3ZWVuc1tnXS5ydW4oZik7cmV0dXJuIGgubm90aWZ5V2l0aChhLFtqLGYsY10pLGY8MSYmaT9jOihpfHxoLm5vdGlmeVdpdGgoYSxbaiwxLDBdKSxoLnJlc29sdmVXaXRoKGEsW2pdKSwhMSl9LGo9aC5wcm9taXNlKHtlbGVtOmEscHJvcHM6ci5leHRlbmQoe30sYiksb3B0czpyLmV4dGVuZCghMCx7c3BlY2lhbEVhc2luZzp7fSxlYXNpbmc6ci5lYXNpbmcuX2RlZmF1bHR9LGMpLG9yaWdpbmFsUHJvcGVydGllczpiLG9yaWdpbmFsT3B0aW9uczpjLHN0YXJ0VGltZTphYnx8ZmIoKSxkdXJhdGlvbjpjLmR1cmF0aW9uLHR3ZWVuczpbXSxjcmVhdGVUd2VlbjpmdW5jdGlvbihiLGMpe3ZhciBkPXIuVHdlZW4oYSxqLm9wdHMsYixjLGoub3B0cy5zcGVjaWFsRWFzaW5nW2JdfHxqLm9wdHMuZWFzaW5nKTtyZXR1cm4gai50d2VlbnMucHVzaChkKSxkfSxzdG9wOmZ1bmN0aW9uKGIpe3ZhciBjPTAsZD1iP2oudHdlZW5zLmxlbmd0aDowO2lmKGUpcmV0dXJuIHRoaXM7Zm9yKGU9ITA7YzxkO2MrKylqLnR3ZWVuc1tjXS5ydW4oMSk7cmV0dXJuIGI/KGgubm90aWZ5V2l0aChhLFtqLDEsMF0pLGgucmVzb2x2ZVdpdGgoYSxbaixiXSkpOmgucmVqZWN0V2l0aChhLFtqLGJdKSx0aGlzfX0pLGs9ai5wcm9wcztmb3IoamIoayxqLm9wdHMuc3BlY2lhbEVhc2luZyk7ZjxnO2YrKylpZihkPWtiLnByZWZpbHRlcnNbZl0uY2FsbChqLGEsayxqLm9wdHMpKXJldHVybiByLmlzRnVuY3Rpb24oZC5zdG9wKSYmKHIuX3F1ZXVlSG9va3Moai5lbGVtLGoub3B0cy5xdWV1ZSkuc3RvcD1yLnByb3h5KGQuc3RvcCxkKSksZDtyZXR1cm4gci5tYXAoayxoYixqKSxyLmlzRnVuY3Rpb24oai5vcHRzLnN0YXJ0KSYmai5vcHRzLnN0YXJ0LmNhbGwoYSxqKSxqLnByb2dyZXNzKGoub3B0cy5wcm9ncmVzcykuZG9uZShqLm9wdHMuZG9uZSxqLm9wdHMuY29tcGxldGUpLmZhaWwoai5vcHRzLmZhaWwpLmFsd2F5cyhqLm9wdHMuYWx3YXlzKSxyLmZ4LnRpbWVyKHIuZXh0ZW5kKGkse2VsZW06YSxhbmltOmoscXVldWU6ai5vcHRzLnF1ZXVlfSkpLGp9ci5BbmltYXRpb249ci5leHRlbmQoa2Ise3R3ZWVuZXJzOntcIipcIjpbZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzLmNyZWF0ZVR3ZWVuKGEsYik7cmV0dXJuIGZhKGMuZWxlbSxhLGJhLmV4ZWMoYiksYyksY31dfSx0d2VlbmVyOmZ1bmN0aW9uKGEsYil7ci5pc0Z1bmN0aW9uKGEpPyhiPWEsYT1bXCIqXCJdKTphPWEubWF0Y2goTCk7Zm9yKHZhciBjLGQ9MCxlPWEubGVuZ3RoO2Q8ZTtkKyspYz1hW2RdLGtiLnR3ZWVuZXJzW2NdPWtiLnR3ZWVuZXJzW2NdfHxbXSxrYi50d2VlbmVyc1tjXS51bnNoaWZ0KGIpfSxwcmVmaWx0ZXJzOltpYl0scHJlZmlsdGVyOmZ1bmN0aW9uKGEsYil7Yj9rYi5wcmVmaWx0ZXJzLnVuc2hpZnQoYSk6a2IucHJlZmlsdGVycy5wdXNoKGEpfX0pLHIuc3BlZWQ9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPWEmJlwib2JqZWN0XCI9PXR5cGVvZiBhP3IuZXh0ZW5kKHt9LGEpOntjb21wbGV0ZTpjfHwhYyYmYnx8ci5pc0Z1bmN0aW9uKGEpJiZhLGR1cmF0aW9uOmEsZWFzaW5nOmMmJmJ8fGImJiFyLmlzRnVuY3Rpb24oYikmJmJ9O3JldHVybiByLmZ4Lm9mZj9kLmR1cmF0aW9uPTA6XCJudW1iZXJcIiE9dHlwZW9mIGQuZHVyYXRpb24mJihkLmR1cmF0aW9uIGluIHIuZnguc3BlZWRzP2QuZHVyYXRpb249ci5meC5zcGVlZHNbZC5kdXJhdGlvbl06ZC5kdXJhdGlvbj1yLmZ4LnNwZWVkcy5fZGVmYXVsdCksbnVsbCE9ZC5xdWV1ZSYmZC5xdWV1ZSE9PSEwfHwoZC5xdWV1ZT1cImZ4XCIpLGQub2xkPWQuY29tcGxldGUsZC5jb21wbGV0ZT1mdW5jdGlvbigpe3IuaXNGdW5jdGlvbihkLm9sZCkmJmQub2xkLmNhbGwodGhpcyksZC5xdWV1ZSYmci5kZXF1ZXVlKHRoaXMsZC5xdWV1ZSl9LGR9LHIuZm4uZXh0ZW5kKHtmYWRlVG86ZnVuY3Rpb24oYSxiLGMsZCl7cmV0dXJuIHRoaXMuZmlsdGVyKGRhKS5jc3MoXCJvcGFjaXR5XCIsMCkuc2hvdygpLmVuZCgpLmFuaW1hdGUoe29wYWNpdHk6Yn0sYSxjLGQpfSxhbmltYXRlOmZ1bmN0aW9uKGEsYixjLGQpe3ZhciBlPXIuaXNFbXB0eU9iamVjdChhKSxmPXIuc3BlZWQoYixjLGQpLGc9ZnVuY3Rpb24oKXt2YXIgYj1rYih0aGlzLHIuZXh0ZW5kKHt9LGEpLGYpOyhlfHxXLmdldCh0aGlzLFwiZmluaXNoXCIpKSYmYi5zdG9wKCEwKX07cmV0dXJuIGcuZmluaXNoPWcsZXx8Zi5xdWV1ZT09PSExP3RoaXMuZWFjaChnKTp0aGlzLnF1ZXVlKGYucXVldWUsZyl9LHN0b3A6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPWZ1bmN0aW9uKGEpe3ZhciBiPWEuc3RvcDtkZWxldGUgYS5zdG9wLGIoYyl9O3JldHVyblwic3RyaW5nXCIhPXR5cGVvZiBhJiYoYz1iLGI9YSxhPXZvaWQgMCksYiYmYSE9PSExJiZ0aGlzLnF1ZXVlKGF8fFwiZnhcIixbXSksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGI9ITAsZT1udWxsIT1hJiZhK1wicXVldWVIb29rc1wiLGY9ci50aW1lcnMsZz1XLmdldCh0aGlzKTtpZihlKWdbZV0mJmdbZV0uc3RvcCYmZChnW2VdKTtlbHNlIGZvcihlIGluIGcpZ1tlXSYmZ1tlXS5zdG9wJiZkYi50ZXN0KGUpJiZkKGdbZV0pO2ZvcihlPWYubGVuZ3RoO2UtLTspZltlXS5lbGVtIT09dGhpc3x8bnVsbCE9YSYmZltlXS5xdWV1ZSE9PWF8fChmW2VdLmFuaW0uc3RvcChjKSxiPSExLGYuc3BsaWNlKGUsMSkpOyFiJiZjfHxyLmRlcXVldWUodGhpcyxhKX0pfSxmaW5pc2g6ZnVuY3Rpb24oYSl7cmV0dXJuIGEhPT0hMSYmKGE9YXx8XCJmeFwiKSx0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgYixjPVcuZ2V0KHRoaXMpLGQ9Y1thK1wicXVldWVcIl0sZT1jW2ErXCJxdWV1ZUhvb2tzXCJdLGY9ci50aW1lcnMsZz1kP2QubGVuZ3RoOjA7Zm9yKGMuZmluaXNoPSEwLHIucXVldWUodGhpcyxhLFtdKSxlJiZlLnN0b3AmJmUuc3RvcC5jYWxsKHRoaXMsITApLGI9Zi5sZW5ndGg7Yi0tOylmW2JdLmVsZW09PT10aGlzJiZmW2JdLnF1ZXVlPT09YSYmKGZbYl0uYW5pbS5zdG9wKCEwKSxmLnNwbGljZShiLDEpKTtmb3IoYj0wO2I8ZztiKyspZFtiXSYmZFtiXS5maW5pc2gmJmRbYl0uZmluaXNoLmNhbGwodGhpcyk7ZGVsZXRlIGMuZmluaXNofSl9fSksci5lYWNoKFtcInRvZ2dsZVwiLFwic2hvd1wiLFwiaGlkZVwiXSxmdW5jdGlvbihhLGIpe3ZhciBjPXIuZm5bYl07ci5mbltiXT1mdW5jdGlvbihhLGQsZSl7cmV0dXJuIG51bGw9PWF8fFwiYm9vbGVhblwiPT10eXBlb2YgYT9jLmFwcGx5KHRoaXMsYXJndW1lbnRzKTp0aGlzLmFuaW1hdGUoZ2IoYiwhMCksYSxkLGUpfX0pLHIuZWFjaCh7c2xpZGVEb3duOmdiKFwic2hvd1wiKSxzbGlkZVVwOmdiKFwiaGlkZVwiKSxzbGlkZVRvZ2dsZTpnYihcInRvZ2dsZVwiKSxmYWRlSW46e29wYWNpdHk6XCJzaG93XCJ9LGZhZGVPdXQ6e29wYWNpdHk6XCJoaWRlXCJ9LGZhZGVUb2dnbGU6e29wYWNpdHk6XCJ0b2dnbGVcIn19LGZ1bmN0aW9uKGEsYil7ci5mblthXT1mdW5jdGlvbihhLGMsZCl7cmV0dXJuIHRoaXMuYW5pbWF0ZShiLGEsYyxkKX19KSxyLnRpbWVycz1bXSxyLmZ4LnRpY2s9ZnVuY3Rpb24oKXt2YXIgYSxiPTAsYz1yLnRpbWVycztmb3IoYWI9ci5ub3coKTtiPGMubGVuZ3RoO2IrKylhPWNbYl0sYSgpfHxjW2JdIT09YXx8Yy5zcGxpY2UoYi0tLDEpO2MubGVuZ3RofHxyLmZ4LnN0b3AoKSxhYj12b2lkIDB9LHIuZngudGltZXI9ZnVuY3Rpb24oYSl7ci50aW1lcnMucHVzaChhKSxyLmZ4LnN0YXJ0KCl9LHIuZnguaW50ZXJ2YWw9MTMsci5meC5zdGFydD1mdW5jdGlvbigpe2JifHwoYmI9ITAsZWIoKSl9LHIuZnguc3RvcD1mdW5jdGlvbigpe2JiPW51bGx9LHIuZnguc3BlZWRzPXtzbG93OjYwMCxmYXN0OjIwMCxfZGVmYXVsdDo0MDB9LHIuZm4uZGVsYXk9ZnVuY3Rpb24oYixjKXtyZXR1cm4gYj1yLmZ4P3IuZnguc3BlZWRzW2JdfHxiOmIsYz1jfHxcImZ4XCIsdGhpcy5xdWV1ZShjLGZ1bmN0aW9uKGMsZCl7dmFyIGU9YS5zZXRUaW1lb3V0KGMsYik7ZC5zdG9wPWZ1bmN0aW9uKCl7YS5jbGVhclRpbWVvdXQoZSl9fSl9LGZ1bmN0aW9uKCl7dmFyIGE9ZC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiksYj1kLmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIiksYz1iLmFwcGVuZENoaWxkKGQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSk7YS50eXBlPVwiY2hlY2tib3hcIixvLmNoZWNrT249XCJcIiE9PWEudmFsdWUsby5vcHRTZWxlY3RlZD1jLnNlbGVjdGVkLGE9ZC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiksYS52YWx1ZT1cInRcIixhLnR5cGU9XCJyYWRpb1wiLG8ucmFkaW9WYWx1ZT1cInRcIj09PWEudmFsdWV9KCk7dmFyIGxiLG1iPXIuZXhwci5hdHRySGFuZGxlO3IuZm4uZXh0ZW5kKHthdHRyOmZ1bmN0aW9uKGEsYil7cmV0dXJuIFQodGhpcyxyLmF0dHIsYSxiLGFyZ3VtZW50cy5sZW5ndGg+MSl9LHJlbW92ZUF0dHI6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3IucmVtb3ZlQXR0cih0aGlzLGEpfSl9fSksci5leHRlbmQoe2F0dHI6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkLGUsZj1hLm5vZGVUeXBlO2lmKDMhPT1mJiY4IT09ZiYmMiE9PWYpcmV0dXJuXCJ1bmRlZmluZWRcIj09dHlwZW9mIGEuZ2V0QXR0cmlidXRlP3IucHJvcChhLGIsYyk6KDE9PT1mJiZyLmlzWE1MRG9jKGEpfHwoZT1yLmF0dHJIb29rc1tiLnRvTG93ZXJDYXNlKCldfHwoci5leHByLm1hdGNoLmJvb2wudGVzdChiKT9sYjp2b2lkIDApKSx2b2lkIDAhPT1jP251bGw9PT1jP3ZvaWQgci5yZW1vdmVBdHRyKGEsYik6ZSYmXCJzZXRcImluIGUmJnZvaWQgMCE9PShkPWUuc2V0KGEsYyxiKSk/ZDooYS5zZXRBdHRyaWJ1dGUoYixjK1wiXCIpLGMpOmUmJlwiZ2V0XCJpbiBlJiZudWxsIT09KGQ9ZS5nZXQoYSxiKSk/ZDooZD1yLmZpbmQuYXR0cihhLGIpLFxyXG5udWxsPT1kP3ZvaWQgMDpkKSl9LGF0dHJIb29rczp7dHlwZTp7c2V0OmZ1bmN0aW9uKGEsYil7aWYoIW8ucmFkaW9WYWx1ZSYmXCJyYWRpb1wiPT09YiYmQihhLFwiaW5wdXRcIikpe3ZhciBjPWEudmFsdWU7cmV0dXJuIGEuc2V0QXR0cmlidXRlKFwidHlwZVwiLGIpLGMmJihhLnZhbHVlPWMpLGJ9fX19LHJlbW92ZUF0dHI6ZnVuY3Rpb24oYSxiKXt2YXIgYyxkPTAsZT1iJiZiLm1hdGNoKEwpO2lmKGUmJjE9PT1hLm5vZGVUeXBlKXdoaWxlKGM9ZVtkKytdKWEucmVtb3ZlQXR0cmlidXRlKGMpfX0pLGxiPXtzZXQ6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiBiPT09ITE/ci5yZW1vdmVBdHRyKGEsYyk6YS5zZXRBdHRyaWJ1dGUoYyxjKSxjfX0sci5lYWNoKHIuZXhwci5tYXRjaC5ib29sLnNvdXJjZS5tYXRjaCgvXFx3Ky9nKSxmdW5jdGlvbihhLGIpe3ZhciBjPW1iW2JdfHxyLmZpbmQuYXR0cjttYltiXT1mdW5jdGlvbihhLGIsZCl7dmFyIGUsZixnPWIudG9Mb3dlckNhc2UoKTtyZXR1cm4gZHx8KGY9bWJbZ10sbWJbZ109ZSxlPW51bGwhPWMoYSxiLGQpP2c6bnVsbCxtYltnXT1mKSxlfX0pO3ZhciBuYj0vXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b24pJC9pLG9iPS9eKD86YXxhcmVhKSQvaTtyLmZuLmV4dGVuZCh7cHJvcDpmdW5jdGlvbihhLGIpe3JldHVybiBUKHRoaXMsci5wcm9wLGEsYixhcmd1bWVudHMubGVuZ3RoPjEpfSxyZW1vdmVQcm9wOmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtkZWxldGUgdGhpc1tyLnByb3BGaXhbYV18fGFdfSl9fSksci5leHRlbmQoe3Byb3A6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkLGUsZj1hLm5vZGVUeXBlO2lmKDMhPT1mJiY4IT09ZiYmMiE9PWYpcmV0dXJuIDE9PT1mJiZyLmlzWE1MRG9jKGEpfHwoYj1yLnByb3BGaXhbYl18fGIsZT1yLnByb3BIb29rc1tiXSksdm9pZCAwIT09Yz9lJiZcInNldFwiaW4gZSYmdm9pZCAwIT09KGQ9ZS5zZXQoYSxjLGIpKT9kOmFbYl09YzplJiZcImdldFwiaW4gZSYmbnVsbCE9PShkPWUuZ2V0KGEsYikpP2Q6YVtiXX0scHJvcEhvb2tzOnt0YWJJbmRleDp7Z2V0OmZ1bmN0aW9uKGEpe3ZhciBiPXIuZmluZC5hdHRyKGEsXCJ0YWJpbmRleFwiKTtyZXR1cm4gYj9wYXJzZUludChiLDEwKTpuYi50ZXN0KGEubm9kZU5hbWUpfHxvYi50ZXN0KGEubm9kZU5hbWUpJiZhLmhyZWY/MDotMX19fSxwcm9wRml4OntcImZvclwiOlwiaHRtbEZvclwiLFwiY2xhc3NcIjpcImNsYXNzTmFtZVwifX0pLG8ub3B0U2VsZWN0ZWR8fChyLnByb3BIb29rcy5zZWxlY3RlZD17Z2V0OmZ1bmN0aW9uKGEpe3ZhciBiPWEucGFyZW50Tm9kZTtyZXR1cm4gYiYmYi5wYXJlbnROb2RlJiZiLnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleCxudWxsfSxzZXQ6ZnVuY3Rpb24oYSl7dmFyIGI9YS5wYXJlbnROb2RlO2ImJihiLnNlbGVjdGVkSW5kZXgsYi5wYXJlbnROb2RlJiZiLnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleCl9fSksci5lYWNoKFtcInRhYkluZGV4XCIsXCJyZWFkT25seVwiLFwibWF4TGVuZ3RoXCIsXCJjZWxsU3BhY2luZ1wiLFwiY2VsbFBhZGRpbmdcIixcInJvd1NwYW5cIixcImNvbFNwYW5cIixcInVzZU1hcFwiLFwiZnJhbWVCb3JkZXJcIixcImNvbnRlbnRFZGl0YWJsZVwiXSxmdW5jdGlvbigpe3IucHJvcEZpeFt0aGlzLnRvTG93ZXJDYXNlKCldPXRoaXN9KTtmdW5jdGlvbiBwYihhKXt2YXIgYj1hLm1hdGNoKEwpfHxbXTtyZXR1cm4gYi5qb2luKFwiIFwiKX1mdW5jdGlvbiBxYihhKXtyZXR1cm4gYS5nZXRBdHRyaWJ1dGUmJmEuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIil8fFwiXCJ9ci5mbi5leHRlbmQoe2FkZENsYXNzOmZ1bmN0aW9uKGEpe3ZhciBiLGMsZCxlLGYsZyxoLGk9MDtpZihyLmlzRnVuY3Rpb24oYSkpcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihiKXtyKHRoaXMpLmFkZENsYXNzKGEuY2FsbCh0aGlzLGIscWIodGhpcykpKX0pO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBhJiZhKXtiPWEubWF0Y2goTCl8fFtdO3doaWxlKGM9dGhpc1tpKytdKWlmKGU9cWIoYyksZD0xPT09Yy5ub2RlVHlwZSYmXCIgXCIrcGIoZSkrXCIgXCIpe2c9MDt3aGlsZShmPWJbZysrXSlkLmluZGV4T2YoXCIgXCIrZitcIiBcIik8MCYmKGQrPWYrXCIgXCIpO2g9cGIoZCksZSE9PWgmJmMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixoKX19cmV0dXJuIHRoaXN9LHJlbW92ZUNsYXNzOmZ1bmN0aW9uKGEpe3ZhciBiLGMsZCxlLGYsZyxoLGk9MDtpZihyLmlzRnVuY3Rpb24oYSkpcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihiKXtyKHRoaXMpLnJlbW92ZUNsYXNzKGEuY2FsbCh0aGlzLGIscWIodGhpcykpKX0pO2lmKCFhcmd1bWVudHMubGVuZ3RoKXJldHVybiB0aGlzLmF0dHIoXCJjbGFzc1wiLFwiXCIpO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBhJiZhKXtiPWEubWF0Y2goTCl8fFtdO3doaWxlKGM9dGhpc1tpKytdKWlmKGU9cWIoYyksZD0xPT09Yy5ub2RlVHlwZSYmXCIgXCIrcGIoZSkrXCIgXCIpe2c9MDt3aGlsZShmPWJbZysrXSl3aGlsZShkLmluZGV4T2YoXCIgXCIrZitcIiBcIik+LTEpZD1kLnJlcGxhY2UoXCIgXCIrZitcIiBcIixcIiBcIik7aD1wYihkKSxlIT09aCYmYy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLGgpfX1yZXR1cm4gdGhpc30sdG9nZ2xlQ2xhc3M6ZnVuY3Rpb24oYSxiKXt2YXIgYz10eXBlb2YgYTtyZXR1cm5cImJvb2xlYW5cIj09dHlwZW9mIGImJlwic3RyaW5nXCI9PT1jP2I/dGhpcy5hZGRDbGFzcyhhKTp0aGlzLnJlbW92ZUNsYXNzKGEpOnIuaXNGdW5jdGlvbihhKT90aGlzLmVhY2goZnVuY3Rpb24oYyl7cih0aGlzKS50b2dnbGVDbGFzcyhhLmNhbGwodGhpcyxjLHFiKHRoaXMpLGIpLGIpfSk6dGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGIsZCxlLGY7aWYoXCJzdHJpbmdcIj09PWMpe2Q9MCxlPXIodGhpcyksZj1hLm1hdGNoKEwpfHxbXTt3aGlsZShiPWZbZCsrXSllLmhhc0NsYXNzKGIpP2UucmVtb3ZlQ2xhc3MoYik6ZS5hZGRDbGFzcyhiKX1lbHNlIHZvaWQgMCE9PWEmJlwiYm9vbGVhblwiIT09Y3x8KGI9cWIodGhpcyksYiYmVy5zZXQodGhpcyxcIl9fY2xhc3NOYW1lX19cIixiKSx0aGlzLnNldEF0dHJpYnV0ZSYmdGhpcy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLGJ8fGE9PT0hMT9cIlwiOlcuZ2V0KHRoaXMsXCJfX2NsYXNzTmFtZV9fXCIpfHxcIlwiKSl9KX0saGFzQ2xhc3M6ZnVuY3Rpb24oYSl7dmFyIGIsYyxkPTA7Yj1cIiBcIithK1wiIFwiO3doaWxlKGM9dGhpc1tkKytdKWlmKDE9PT1jLm5vZGVUeXBlJiYoXCIgXCIrcGIocWIoYykpK1wiIFwiKS5pbmRleE9mKGIpPi0xKXJldHVybiEwO3JldHVybiExfX0pO3ZhciByYj0vXFxyL2c7ci5mbi5leHRlbmQoe3ZhbDpmdW5jdGlvbihhKXt2YXIgYixjLGQsZT10aGlzWzBdO3tpZihhcmd1bWVudHMubGVuZ3RoKXJldHVybiBkPXIuaXNGdW5jdGlvbihhKSx0aGlzLmVhY2goZnVuY3Rpb24oYyl7dmFyIGU7MT09PXRoaXMubm9kZVR5cGUmJihlPWQ/YS5jYWxsKHRoaXMsYyxyKHRoaXMpLnZhbCgpKTphLG51bGw9PWU/ZT1cIlwiOlwibnVtYmVyXCI9PXR5cGVvZiBlP2UrPVwiXCI6QXJyYXkuaXNBcnJheShlKSYmKGU9ci5tYXAoZSxmdW5jdGlvbihhKXtyZXR1cm4gbnVsbD09YT9cIlwiOmErXCJcIn0pKSxiPXIudmFsSG9va3NbdGhpcy50eXBlXXx8ci52YWxIb29rc1t0aGlzLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCldLGImJlwic2V0XCJpbiBiJiZ2b2lkIDAhPT1iLnNldCh0aGlzLGUsXCJ2YWx1ZVwiKXx8KHRoaXMudmFsdWU9ZSkpfSk7aWYoZSlyZXR1cm4gYj1yLnZhbEhvb2tzW2UudHlwZV18fHIudmFsSG9va3NbZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpXSxiJiZcImdldFwiaW4gYiYmdm9pZCAwIT09KGM9Yi5nZXQoZSxcInZhbHVlXCIpKT9jOihjPWUudmFsdWUsXCJzdHJpbmdcIj09dHlwZW9mIGM/Yy5yZXBsYWNlKHJiLFwiXCIpOm51bGw9PWM/XCJcIjpjKX19fSksci5leHRlbmQoe3ZhbEhvb2tzOntvcHRpb246e2dldDpmdW5jdGlvbihhKXt2YXIgYj1yLmZpbmQuYXR0cihhLFwidmFsdWVcIik7cmV0dXJuIG51bGwhPWI/YjpwYihyLnRleHQoYSkpfX0sc2VsZWN0OntnZXQ6ZnVuY3Rpb24oYSl7dmFyIGIsYyxkLGU9YS5vcHRpb25zLGY9YS5zZWxlY3RlZEluZGV4LGc9XCJzZWxlY3Qtb25lXCI9PT1hLnR5cGUsaD1nP251bGw6W10saT1nP2YrMTplLmxlbmd0aDtmb3IoZD1mPDA/aTpnP2Y6MDtkPGk7ZCsrKWlmKGM9ZVtkXSwoYy5zZWxlY3RlZHx8ZD09PWYpJiYhYy5kaXNhYmxlZCYmKCFjLnBhcmVudE5vZGUuZGlzYWJsZWR8fCFCKGMucGFyZW50Tm9kZSxcIm9wdGdyb3VwXCIpKSl7aWYoYj1yKGMpLnZhbCgpLGcpcmV0dXJuIGI7aC5wdXNoKGIpfXJldHVybiBofSxzZXQ6ZnVuY3Rpb24oYSxiKXt2YXIgYyxkLGU9YS5vcHRpb25zLGY9ci5tYWtlQXJyYXkoYiksZz1lLmxlbmd0aDt3aGlsZShnLS0pZD1lW2ddLChkLnNlbGVjdGVkPXIuaW5BcnJheShyLnZhbEhvb2tzLm9wdGlvbi5nZXQoZCksZik+LTEpJiYoYz0hMCk7cmV0dXJuIGN8fChhLnNlbGVjdGVkSW5kZXg9LTEpLGZ9fX19KSxyLmVhY2goW1wicmFkaW9cIixcImNoZWNrYm94XCJdLGZ1bmN0aW9uKCl7ci52YWxIb29rc1t0aGlzXT17c2V0OmZ1bmN0aW9uKGEsYil7aWYoQXJyYXkuaXNBcnJheShiKSlyZXR1cm4gYS5jaGVja2VkPXIuaW5BcnJheShyKGEpLnZhbCgpLGIpPi0xfX0sby5jaGVja09ufHwoci52YWxIb29rc1t0aGlzXS5nZXQ9ZnVuY3Rpb24oYSl7cmV0dXJuIG51bGw9PT1hLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpP1wib25cIjphLnZhbHVlfSl9KTt2YXIgc2I9L14oPzpmb2N1c2luZm9jdXN8Zm9jdXNvdXRibHVyKSQvO3IuZXh0ZW5kKHIuZXZlbnQse3RyaWdnZXI6ZnVuY3Rpb24oYixjLGUsZil7dmFyIGcsaCxpLGosayxtLG4sbz1bZXx8ZF0scD1sLmNhbGwoYixcInR5cGVcIik/Yi50eXBlOmIscT1sLmNhbGwoYixcIm5hbWVzcGFjZVwiKT9iLm5hbWVzcGFjZS5zcGxpdChcIi5cIik6W107aWYoaD1pPWU9ZXx8ZCwzIT09ZS5ub2RlVHlwZSYmOCE9PWUubm9kZVR5cGUmJiFzYi50ZXN0KHArci5ldmVudC50cmlnZ2VyZWQpJiYocC5pbmRleE9mKFwiLlwiKT4tMSYmKHE9cC5zcGxpdChcIi5cIikscD1xLnNoaWZ0KCkscS5zb3J0KCkpLGs9cC5pbmRleE9mKFwiOlwiKTwwJiZcIm9uXCIrcCxiPWJbci5leHBhbmRvXT9iOm5ldyByLkV2ZW50KHAsXCJvYmplY3RcIj09dHlwZW9mIGImJmIpLGIuaXNUcmlnZ2VyPWY/MjozLGIubmFtZXNwYWNlPXEuam9pbihcIi5cIiksYi5ybmFtZXNwYWNlPWIubmFtZXNwYWNlP25ldyBSZWdFeHAoXCIoXnxcXFxcLilcIitxLmpvaW4oXCJcXFxcLig/Oi4qXFxcXC58KVwiKStcIihcXFxcLnwkKVwiKTpudWxsLGIucmVzdWx0PXZvaWQgMCxiLnRhcmdldHx8KGIudGFyZ2V0PWUpLGM9bnVsbD09Yz9bYl06ci5tYWtlQXJyYXkoYyxbYl0pLG49ci5ldmVudC5zcGVjaWFsW3BdfHx7fSxmfHwhbi50cmlnZ2VyfHxuLnRyaWdnZXIuYXBwbHkoZSxjKSE9PSExKSl7aWYoIWYmJiFuLm5vQnViYmxlJiYhci5pc1dpbmRvdyhlKSl7Zm9yKGo9bi5kZWxlZ2F0ZVR5cGV8fHAsc2IudGVzdChqK3ApfHwoaD1oLnBhcmVudE5vZGUpO2g7aD1oLnBhcmVudE5vZGUpby5wdXNoKGgpLGk9aDtpPT09KGUub3duZXJEb2N1bWVudHx8ZCkmJm8ucHVzaChpLmRlZmF1bHRWaWV3fHxpLnBhcmVudFdpbmRvd3x8YSl9Zz0wO3doaWxlKChoPW9bZysrXSkmJiFiLmlzUHJvcGFnYXRpb25TdG9wcGVkKCkpYi50eXBlPWc+MT9qOm4uYmluZFR5cGV8fHAsbT0oVy5nZXQoaCxcImV2ZW50c1wiKXx8e30pW2IudHlwZV0mJlcuZ2V0KGgsXCJoYW5kbGVcIiksbSYmbS5hcHBseShoLGMpLG09ayYmaFtrXSxtJiZtLmFwcGx5JiZVKGgpJiYoYi5yZXN1bHQ9bS5hcHBseShoLGMpLGIucmVzdWx0PT09ITEmJmIucHJldmVudERlZmF1bHQoKSk7cmV0dXJuIGIudHlwZT1wLGZ8fGIuaXNEZWZhdWx0UHJldmVudGVkKCl8fG4uX2RlZmF1bHQmJm4uX2RlZmF1bHQuYXBwbHkoby5wb3AoKSxjKSE9PSExfHwhVShlKXx8ayYmci5pc0Z1bmN0aW9uKGVbcF0pJiYhci5pc1dpbmRvdyhlKSYmKGk9ZVtrXSxpJiYoZVtrXT1udWxsKSxyLmV2ZW50LnRyaWdnZXJlZD1wLGVbcF0oKSxyLmV2ZW50LnRyaWdnZXJlZD12b2lkIDAsaSYmKGVba109aSkpLGIucmVzdWx0fX0sc2ltdWxhdGU6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXIuZXh0ZW5kKG5ldyByLkV2ZW50LGMse3R5cGU6YSxpc1NpbXVsYXRlZDohMH0pO3IuZXZlbnQudHJpZ2dlcihkLG51bGwsYil9fSksci5mbi5leHRlbmQoe3RyaWdnZXI6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7ci5ldmVudC50cmlnZ2VyKGEsYix0aGlzKX0pfSx0cmlnZ2VySGFuZGxlcjpmdW5jdGlvbihhLGIpe3ZhciBjPXRoaXNbMF07aWYoYylyZXR1cm4gci5ldmVudC50cmlnZ2VyKGEsYixjLCEwKX19KSxyLmVhY2goXCJibHVyIGZvY3VzIGZvY3VzaW4gZm9jdXNvdXQgcmVzaXplIHNjcm9sbCBjbGljayBkYmxjbGljayBtb3VzZWRvd24gbW91c2V1cCBtb3VzZW1vdmUgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlZW50ZXIgbW91c2VsZWF2ZSBjaGFuZ2Ugc2VsZWN0IHN1Ym1pdCBrZXlkb3duIGtleXByZXNzIGtleXVwIGNvbnRleHRtZW51XCIuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKGEsYil7ci5mbltiXT1mdW5jdGlvbihhLGMpe3JldHVybiBhcmd1bWVudHMubGVuZ3RoPjA/dGhpcy5vbihiLG51bGwsYSxjKTp0aGlzLnRyaWdnZXIoYil9fSksci5mbi5leHRlbmQoe2hvdmVyOmZ1bmN0aW9uKGEsYil7cmV0dXJuIHRoaXMubW91c2VlbnRlcihhKS5tb3VzZWxlYXZlKGJ8fGEpfX0pLG8uZm9jdXNpbj1cIm9uZm9jdXNpblwiaW4gYSxvLmZvY3VzaW58fHIuZWFjaCh7Zm9jdXM6XCJmb2N1c2luXCIsYmx1cjpcImZvY3Vzb3V0XCJ9LGZ1bmN0aW9uKGEsYil7dmFyIGM9ZnVuY3Rpb24oYSl7ci5ldmVudC5zaW11bGF0ZShiLGEudGFyZ2V0LHIuZXZlbnQuZml4KGEpKX07ci5ldmVudC5zcGVjaWFsW2JdPXtzZXR1cDpmdW5jdGlvbigpe3ZhciBkPXRoaXMub3duZXJEb2N1bWVudHx8dGhpcyxlPVcuYWNjZXNzKGQsYik7ZXx8ZC5hZGRFdmVudExpc3RlbmVyKGEsYywhMCksVy5hY2Nlc3MoZCxiLChlfHwwKSsxKX0sdGVhcmRvd246ZnVuY3Rpb24oKXt2YXIgZD10aGlzLm93bmVyRG9jdW1lbnR8fHRoaXMsZT1XLmFjY2VzcyhkLGIpLTE7ZT9XLmFjY2VzcyhkLGIsZSk6KGQucmVtb3ZlRXZlbnRMaXN0ZW5lcihhLGMsITApLFcucmVtb3ZlKGQsYikpfX19KTt2YXIgdGI9YS5sb2NhdGlvbix1Yj1yLm5vdygpLHZiPS9cXD8vO3IucGFyc2VYTUw9ZnVuY3Rpb24oYil7dmFyIGM7aWYoIWJ8fFwic3RyaW5nXCIhPXR5cGVvZiBiKXJldHVybiBudWxsO3RyeXtjPShuZXcgYS5ET01QYXJzZXIpLnBhcnNlRnJvbVN0cmluZyhiLFwidGV4dC94bWxcIil9Y2F0Y2goZCl7Yz12b2lkIDB9cmV0dXJuIGMmJiFjLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwicGFyc2VyZXJyb3JcIikubGVuZ3RofHxyLmVycm9yKFwiSW52YWxpZCBYTUw6IFwiK2IpLGN9O3ZhciB3Yj0vXFxbXFxdJC8seGI9L1xccj9cXG4vZyx5Yj0vXig/OnN1Ym1pdHxidXR0b258aW1hZ2V8cmVzZXR8ZmlsZSkkL2ksemI9L14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8a2V5Z2VuKS9pO2Z1bmN0aW9uIEFiKGEsYixjLGQpe3ZhciBlO2lmKEFycmF5LmlzQXJyYXkoYikpci5lYWNoKGIsZnVuY3Rpb24oYixlKXtjfHx3Yi50ZXN0KGEpP2QoYSxlKTpBYihhK1wiW1wiKyhcIm9iamVjdFwiPT10eXBlb2YgZSYmbnVsbCE9ZT9iOlwiXCIpK1wiXVwiLGUsYyxkKX0pO2Vsc2UgaWYoY3x8XCJvYmplY3RcIiE9PXIudHlwZShiKSlkKGEsYik7ZWxzZSBmb3IoZSBpbiBiKUFiKGErXCJbXCIrZStcIl1cIixiW2VdLGMsZCl9ci5wYXJhbT1mdW5jdGlvbihhLGIpe3ZhciBjLGQ9W10sZT1mdW5jdGlvbihhLGIpe3ZhciBjPXIuaXNGdW5jdGlvbihiKT9iKCk6YjtkW2QubGVuZ3RoXT1lbmNvZGVVUklDb21wb25lbnQoYSkrXCI9XCIrZW5jb2RlVVJJQ29tcG9uZW50KG51bGw9PWM/XCJcIjpjKX07aWYoQXJyYXkuaXNBcnJheShhKXx8YS5qcXVlcnkmJiFyLmlzUGxhaW5PYmplY3QoYSkpci5lYWNoKGEsZnVuY3Rpb24oKXtlKHRoaXMubmFtZSx0aGlzLnZhbHVlKX0pO2Vsc2UgZm9yKGMgaW4gYSlBYihjLGFbY10sYixlKTtyZXR1cm4gZC5qb2luKFwiJlwiKX0sci5mbi5leHRlbmQoe3NlcmlhbGl6ZTpmdW5jdGlvbigpe3JldHVybiByLnBhcmFtKHRoaXMuc2VyaWFsaXplQXJyYXkoKSl9LHNlcmlhbGl6ZUFycmF5OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7dmFyIGE9ci5wcm9wKHRoaXMsXCJlbGVtZW50c1wiKTtyZXR1cm4gYT9yLm1ha2VBcnJheShhKTp0aGlzfSkuZmlsdGVyKGZ1bmN0aW9uKCl7dmFyIGE9dGhpcy50eXBlO3JldHVybiB0aGlzLm5hbWUmJiFyKHRoaXMpLmlzKFwiOmRpc2FibGVkXCIpJiZ6Yi50ZXN0KHRoaXMubm9kZU5hbWUpJiYheWIudGVzdChhKSYmKHRoaXMuY2hlY2tlZHx8IWphLnRlc3QoYSkpfSkubWFwKGZ1bmN0aW9uKGEsYil7dmFyIGM9cih0aGlzKS52YWwoKTtyZXR1cm4gbnVsbD09Yz9udWxsOkFycmF5LmlzQXJyYXkoYyk/ci5tYXAoYyxmdW5jdGlvbihhKXtyZXR1cm57bmFtZTpiLm5hbWUsdmFsdWU6YS5yZXBsYWNlKHhiLFwiXFxyXFxuXCIpfX0pOntuYW1lOmIubmFtZSx2YWx1ZTpjLnJlcGxhY2UoeGIsXCJcXHJcXG5cIil9fSkuZ2V0KCl9fSk7dmFyIEJiPS8lMjAvZyxDYj0vIy4qJC8sRGI9LyhbPyZdKV89W14mXSovLEViPS9eKC4qPyk6WyBcXHRdKihbXlxcclxcbl0qKSQvZ20sRmI9L14oPzphYm91dHxhcHB8YXBwLXN0b3JhZ2V8ListZXh0ZW5zaW9ufGZpbGV8cmVzfHdpZGdldCk6JC8sR2I9L14oPzpHRVR8SEVBRCkkLyxIYj0vXlxcL1xcLy8sSWI9e30sSmI9e30sS2I9XCIqL1wiLmNvbmNhdChcIipcIiksTGI9ZC5jcmVhdGVFbGVtZW50KFwiYVwiKTtMYi5ocmVmPXRiLmhyZWY7ZnVuY3Rpb24gTWIoYSl7cmV0dXJuIGZ1bmN0aW9uKGIsYyl7XCJzdHJpbmdcIiE9dHlwZW9mIGImJihjPWIsYj1cIipcIik7dmFyIGQsZT0wLGY9Yi50b0xvd2VyQ2FzZSgpLm1hdGNoKEwpfHxbXTtpZihyLmlzRnVuY3Rpb24oYykpd2hpbGUoZD1mW2UrK10pXCIrXCI9PT1kWzBdPyhkPWQuc2xpY2UoMSl8fFwiKlwiLChhW2RdPWFbZF18fFtdKS51bnNoaWZ0KGMpKTooYVtkXT1hW2RdfHxbXSkucHVzaChjKX19ZnVuY3Rpb24gTmIoYSxiLGMsZCl7dmFyIGU9e30sZj1hPT09SmI7ZnVuY3Rpb24gZyhoKXt2YXIgaTtyZXR1cm4gZVtoXT0hMCxyLmVhY2goYVtoXXx8W10sZnVuY3Rpb24oYSxoKXt2YXIgaj1oKGIsYyxkKTtyZXR1cm5cInN0cmluZ1wiIT10eXBlb2Yganx8Znx8ZVtqXT9mPyEoaT1qKTp2b2lkIDA6KGIuZGF0YVR5cGVzLnVuc2hpZnQoaiksZyhqKSwhMSl9KSxpfXJldHVybiBnKGIuZGF0YVR5cGVzWzBdKXx8IWVbXCIqXCJdJiZnKFwiKlwiKX1mdW5jdGlvbiBPYihhLGIpe3ZhciBjLGQsZT1yLmFqYXhTZXR0aW5ncy5mbGF0T3B0aW9uc3x8e307Zm9yKGMgaW4gYil2b2lkIDAhPT1iW2NdJiYoKGVbY10/YTpkfHwoZD17fSkpW2NdPWJbY10pO3JldHVybiBkJiZyLmV4dGVuZCghMCxhLGQpLGF9ZnVuY3Rpb24gUGIoYSxiLGMpe3ZhciBkLGUsZixnLGg9YS5jb250ZW50cyxpPWEuZGF0YVR5cGVzO3doaWxlKFwiKlwiPT09aVswXSlpLnNoaWZ0KCksdm9pZCAwPT09ZCYmKGQ9YS5taW1lVHlwZXx8Yi5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKSk7aWYoZClmb3IoZSBpbiBoKWlmKGhbZV0mJmhbZV0udGVzdChkKSl7aS51bnNoaWZ0KGUpO2JyZWFrfWlmKGlbMF1pbiBjKWY9aVswXTtlbHNle2ZvcihlIGluIGMpe2lmKCFpWzBdfHxhLmNvbnZlcnRlcnNbZStcIiBcIitpWzBdXSl7Zj1lO2JyZWFrfWd8fChnPWUpfWY9Znx8Z31pZihmKXJldHVybiBmIT09aVswXSYmaS51bnNoaWZ0KGYpLGNbZl19ZnVuY3Rpb24gUWIoYSxiLGMsZCl7dmFyIGUsZixnLGgsaSxqPXt9LGs9YS5kYXRhVHlwZXMuc2xpY2UoKTtpZihrWzFdKWZvcihnIGluIGEuY29udmVydGVycylqW2cudG9Mb3dlckNhc2UoKV09YS5jb252ZXJ0ZXJzW2ddO2Y9ay5zaGlmdCgpO3doaWxlKGYpaWYoYS5yZXNwb25zZUZpZWxkc1tmXSYmKGNbYS5yZXNwb25zZUZpZWxkc1tmXV09YiksIWkmJmQmJmEuZGF0YUZpbHRlciYmKGI9YS5kYXRhRmlsdGVyKGIsYS5kYXRhVHlwZSkpLGk9ZixmPWsuc2hpZnQoKSlpZihcIipcIj09PWYpZj1pO2Vsc2UgaWYoXCIqXCIhPT1pJiZpIT09Zil7aWYoZz1qW2krXCIgXCIrZl18fGpbXCIqIFwiK2ZdLCFnKWZvcihlIGluIGopaWYoaD1lLnNwbGl0KFwiIFwiKSxoWzFdPT09ZiYmKGc9altpK1wiIFwiK2hbMF1dfHxqW1wiKiBcIitoWzBdXSkpe2c9PT0hMD9nPWpbZV06altlXSE9PSEwJiYoZj1oWzBdLGsudW5zaGlmdChoWzFdKSk7YnJlYWt9aWYoZyE9PSEwKWlmKGcmJmFbXCJ0aHJvd3NcIl0pYj1nKGIpO2Vsc2UgdHJ5e2I9ZyhiKX1jYXRjaChsKXtyZXR1cm57c3RhdGU6XCJwYXJzZXJlcnJvclwiLGVycm9yOmc/bDpcIk5vIGNvbnZlcnNpb24gZnJvbSBcIitpK1wiIHRvIFwiK2Z9fX1yZXR1cm57c3RhdGU6XCJzdWNjZXNzXCIsZGF0YTpifX1yLmV4dGVuZCh7YWN0aXZlOjAsbGFzdE1vZGlmaWVkOnt9LGV0YWc6e30sYWpheFNldHRpbmdzOnt1cmw6dGIuaHJlZix0eXBlOlwiR0VUXCIsaXNMb2NhbDpGYi50ZXN0KHRiLnByb3RvY29sKSxnbG9iYWw6ITAscHJvY2Vzc0RhdGE6ITAsYXN5bmM6ITAsY29udGVudFR5cGU6XCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLThcIixhY2NlcHRzOntcIipcIjpLYix0ZXh0OlwidGV4dC9wbGFpblwiLGh0bWw6XCJ0ZXh0L2h0bWxcIix4bWw6XCJhcHBsaWNhdGlvbi94bWwsIHRleHQveG1sXCIsanNvbjpcImFwcGxpY2F0aW9uL2pzb24sIHRleHQvamF2YXNjcmlwdFwifSxjb250ZW50czp7eG1sOi9cXGJ4bWxcXGIvLGh0bWw6L1xcYmh0bWwvLGpzb246L1xcYmpzb25cXGIvfSxyZXNwb25zZUZpZWxkczp7eG1sOlwicmVzcG9uc2VYTUxcIix0ZXh0OlwicmVzcG9uc2VUZXh0XCIsanNvbjpcInJlc3BvbnNlSlNPTlwifSxjb252ZXJ0ZXJzOntcIiogdGV4dFwiOlN0cmluZyxcInRleHQgaHRtbFwiOiEwLFwidGV4dCBqc29uXCI6SlNPTi5wYXJzZSxcInRleHQgeG1sXCI6ci5wYXJzZVhNTH0sZmxhdE9wdGlvbnM6e3VybDohMCxjb250ZXh0OiEwfX0sYWpheFNldHVwOmZ1bmN0aW9uKGEsYil7cmV0dXJuIGI/T2IoT2IoYSxyLmFqYXhTZXR0aW5ncyksYik6T2Ioci5hamF4U2V0dGluZ3MsYSl9LGFqYXhQcmVmaWx0ZXI6TWIoSWIpLGFqYXhUcmFuc3BvcnQ6TWIoSmIpLGFqYXg6ZnVuY3Rpb24oYixjKXtcIm9iamVjdFwiPT10eXBlb2YgYiYmKGM9YixiPXZvaWQgMCksYz1jfHx7fTt2YXIgZSxmLGcsaCxpLGosayxsLG0sbixvPXIuYWpheFNldHVwKHt9LGMpLHA9by5jb250ZXh0fHxvLHE9by5jb250ZXh0JiYocC5ub2RlVHlwZXx8cC5qcXVlcnkpP3IocCk6ci5ldmVudCxzPXIuRGVmZXJyZWQoKSx0PXIuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIiksdT1vLnN0YXR1c0NvZGV8fHt9LHY9e30sdz17fSx4PVwiY2FuY2VsZWRcIix5PXtyZWFkeVN0YXRlOjAsZ2V0UmVzcG9uc2VIZWFkZXI6ZnVuY3Rpb24oYSl7dmFyIGI7aWYoayl7aWYoIWgpe2g9e307d2hpbGUoYj1FYi5leGVjKGcpKWhbYlsxXS50b0xvd2VyQ2FzZSgpXT1iWzJdfWI9aFthLnRvTG93ZXJDYXNlKCldfXJldHVybiBudWxsPT1iP251bGw6Yn0sZ2V0QWxsUmVzcG9uc2VIZWFkZXJzOmZ1bmN0aW9uKCl7cmV0dXJuIGs/ZzpudWxsfSxzZXRSZXF1ZXN0SGVhZGVyOmZ1bmN0aW9uKGEsYil7cmV0dXJuIG51bGw9PWsmJihhPXdbYS50b0xvd2VyQ2FzZSgpXT13W2EudG9Mb3dlckNhc2UoKV18fGEsdlthXT1iKSx0aGlzfSxvdmVycmlkZU1pbWVUeXBlOmZ1bmN0aW9uKGEpe3JldHVybiBudWxsPT1rJiYoby5taW1lVHlwZT1hKSx0aGlzfSxzdGF0dXNDb2RlOmZ1bmN0aW9uKGEpe3ZhciBiO2lmKGEpaWYoayl5LmFsd2F5cyhhW3kuc3RhdHVzXSk7ZWxzZSBmb3IoYiBpbiBhKXVbYl09W3VbYl0sYVtiXV07cmV0dXJuIHRoaXN9LGFib3J0OmZ1bmN0aW9uKGEpe3ZhciBiPWF8fHg7cmV0dXJuIGUmJmUuYWJvcnQoYiksQSgwLGIpLHRoaXN9fTtpZihzLnByb21pc2UoeSksby51cmw9KChifHxvLnVybHx8dGIuaHJlZikrXCJcIikucmVwbGFjZShIYix0Yi5wcm90b2NvbCtcIi8vXCIpLG8udHlwZT1jLm1ldGhvZHx8Yy50eXBlfHxvLm1ldGhvZHx8by50eXBlLG8uZGF0YVR5cGVzPShvLmRhdGFUeXBlfHxcIipcIikudG9Mb3dlckNhc2UoKS5tYXRjaChMKXx8W1wiXCJdLG51bGw9PW8uY3Jvc3NEb21haW4pe2o9ZC5jcmVhdGVFbGVtZW50KFwiYVwiKTt0cnl7ai5ocmVmPW8udXJsLGouaHJlZj1qLmhyZWYsby5jcm9zc0RvbWFpbj1MYi5wcm90b2NvbCtcIi8vXCIrTGIuaG9zdCE9ai5wcm90b2NvbCtcIi8vXCIrai5ob3N0fWNhdGNoKHope28uY3Jvc3NEb21haW49ITB9fWlmKG8uZGF0YSYmby5wcm9jZXNzRGF0YSYmXCJzdHJpbmdcIiE9dHlwZW9mIG8uZGF0YSYmKG8uZGF0YT1yLnBhcmFtKG8uZGF0YSxvLnRyYWRpdGlvbmFsKSksTmIoSWIsbyxjLHkpLGspcmV0dXJuIHk7bD1yLmV2ZW50JiZvLmdsb2JhbCxsJiYwPT09ci5hY3RpdmUrKyYmci5ldmVudC50cmlnZ2VyKFwiYWpheFN0YXJ0XCIpLG8udHlwZT1vLnR5cGUudG9VcHBlckNhc2UoKSxvLmhhc0NvbnRlbnQ9IUdiLnRlc3Qoby50eXBlKSxmPW8udXJsLnJlcGxhY2UoQ2IsXCJcIiksby5oYXNDb250ZW50P28uZGF0YSYmby5wcm9jZXNzRGF0YSYmMD09PShvLmNvbnRlbnRUeXBlfHxcIlwiKS5pbmRleE9mKFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpJiYoby5kYXRhPW8uZGF0YS5yZXBsYWNlKEJiLFwiK1wiKSk6KG49by51cmwuc2xpY2UoZi5sZW5ndGgpLG8uZGF0YSYmKGYrPSh2Yi50ZXN0KGYpP1wiJlwiOlwiP1wiKStvLmRhdGEsZGVsZXRlIG8uZGF0YSksby5jYWNoZT09PSExJiYoZj1mLnJlcGxhY2UoRGIsXCIkMVwiKSxuPSh2Yi50ZXN0KGYpP1wiJlwiOlwiP1wiKStcIl89XCIrdWIrKyArbiksby51cmw9ZituKSxvLmlmTW9kaWZpZWQmJihyLmxhc3RNb2RpZmllZFtmXSYmeS5zZXRSZXF1ZXN0SGVhZGVyKFwiSWYtTW9kaWZpZWQtU2luY2VcIixyLmxhc3RNb2RpZmllZFtmXSksci5ldGFnW2ZdJiZ5LnNldFJlcXVlc3RIZWFkZXIoXCJJZi1Ob25lLU1hdGNoXCIsci5ldGFnW2ZdKSksKG8uZGF0YSYmby5oYXNDb250ZW50JiZvLmNvbnRlbnRUeXBlIT09ITF8fGMuY29udGVudFR5cGUpJiZ5LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIixvLmNvbnRlbnRUeXBlKSx5LnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIixvLmRhdGFUeXBlc1swXSYmby5hY2NlcHRzW28uZGF0YVR5cGVzWzBdXT9vLmFjY2VwdHNbby5kYXRhVHlwZXNbMF1dKyhcIipcIiE9PW8uZGF0YVR5cGVzWzBdP1wiLCBcIitLYitcIjsgcT0wLjAxXCI6XCJcIik6by5hY2NlcHRzW1wiKlwiXSk7Zm9yKG0gaW4gby5oZWFkZXJzKXkuc2V0UmVxdWVzdEhlYWRlcihtLG8uaGVhZGVyc1ttXSk7aWYoby5iZWZvcmVTZW5kJiYoby5iZWZvcmVTZW5kLmNhbGwocCx5LG8pPT09ITF8fGspKXJldHVybiB5LmFib3J0KCk7aWYoeD1cImFib3J0XCIsdC5hZGQoby5jb21wbGV0ZSkseS5kb25lKG8uc3VjY2VzcykseS5mYWlsKG8uZXJyb3IpLGU9TmIoSmIsbyxjLHkpKXtpZih5LnJlYWR5U3RhdGU9MSxsJiZxLnRyaWdnZXIoXCJhamF4U2VuZFwiLFt5LG9dKSxrKXJldHVybiB5O28uYXN5bmMmJm8udGltZW91dD4wJiYoaT1hLnNldFRpbWVvdXQoZnVuY3Rpb24oKXt5LmFib3J0KFwidGltZW91dFwiKX0sby50aW1lb3V0KSk7dHJ5e2s9ITEsZS5zZW5kKHYsQSl9Y2F0Y2goeil7aWYoayl0aHJvdyB6O0EoLTEseil9fWVsc2UgQSgtMSxcIk5vIFRyYW5zcG9ydFwiKTtmdW5jdGlvbiBBKGIsYyxkLGgpe3ZhciBqLG0sbix2LHcseD1jO2t8fChrPSEwLGkmJmEuY2xlYXJUaW1lb3V0KGkpLGU9dm9pZCAwLGc9aHx8XCJcIix5LnJlYWR5U3RhdGU9Yj4wPzQ6MCxqPWI+PTIwMCYmYjwzMDB8fDMwND09PWIsZCYmKHY9UGIobyx5LGQpKSx2PVFiKG8sdix5LGopLGo/KG8uaWZNb2RpZmllZCYmKHc9eS5nZXRSZXNwb25zZUhlYWRlcihcIkxhc3QtTW9kaWZpZWRcIiksdyYmKHIubGFzdE1vZGlmaWVkW2ZdPXcpLHc9eS5nZXRSZXNwb25zZUhlYWRlcihcImV0YWdcIiksdyYmKHIuZXRhZ1tmXT13KSksMjA0PT09Ynx8XCJIRUFEXCI9PT1vLnR5cGU/eD1cIm5vY29udGVudFwiOjMwND09PWI/eD1cIm5vdG1vZGlmaWVkXCI6KHg9di5zdGF0ZSxtPXYuZGF0YSxuPXYuZXJyb3Isaj0hbikpOihuPXgsIWImJnh8fCh4PVwiZXJyb3JcIixiPDAmJihiPTApKSkseS5zdGF0dXM9Yix5LnN0YXR1c1RleHQ9KGN8fHgpK1wiXCIsaj9zLnJlc29sdmVXaXRoKHAsW20seCx5XSk6cy5yZWplY3RXaXRoKHAsW3kseCxuXSkseS5zdGF0dXNDb2RlKHUpLHU9dm9pZCAwLGwmJnEudHJpZ2dlcihqP1wiYWpheFN1Y2Nlc3NcIjpcImFqYXhFcnJvclwiLFt5LG8saj9tOm5dKSx0LmZpcmVXaXRoKHAsW3kseF0pLGwmJihxLnRyaWdnZXIoXCJhamF4Q29tcGxldGVcIixbeSxvXSksLS1yLmFjdGl2ZXx8ci5ldmVudC50cmlnZ2VyKFwiYWpheFN0b3BcIikpKX1yZXR1cm4geX0sZ2V0SlNPTjpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIHIuZ2V0KGEsYixjLFwianNvblwiKX0sZ2V0U2NyaXB0OmZ1bmN0aW9uKGEsYil7cmV0dXJuIHIuZ2V0KGEsdm9pZCAwLGIsXCJzY3JpcHRcIil9fSksci5lYWNoKFtcImdldFwiLFwicG9zdFwiXSxmdW5jdGlvbihhLGIpe3JbYl09ZnVuY3Rpb24oYSxjLGQsZSl7cmV0dXJuIHIuaXNGdW5jdGlvbihjKSYmKGU9ZXx8ZCxkPWMsYz12b2lkIDApLHIuYWpheChyLmV4dGVuZCh7dXJsOmEsdHlwZTpiLGRhdGFUeXBlOmUsZGF0YTpjLHN1Y2Nlc3M6ZH0sci5pc1BsYWluT2JqZWN0KGEpJiZhKSl9fSksci5fZXZhbFVybD1mdW5jdGlvbihhKXtyZXR1cm4gci5hamF4KHt1cmw6YSx0eXBlOlwiR0VUXCIsZGF0YVR5cGU6XCJzY3JpcHRcIixjYWNoZTohMCxhc3luYzohMSxnbG9iYWw6ITEsXCJ0aHJvd3NcIjohMH0pfSxyLmZuLmV4dGVuZCh7d3JhcEFsbDpmdW5jdGlvbihhKXt2YXIgYjtyZXR1cm4gdGhpc1swXSYmKHIuaXNGdW5jdGlvbihhKSYmKGE9YS5jYWxsKHRoaXNbMF0pKSxiPXIoYSx0aGlzWzBdLm93bmVyRG9jdW1lbnQpLmVxKDApLmNsb25lKCEwKSx0aGlzWzBdLnBhcmVudE5vZGUmJmIuaW5zZXJ0QmVmb3JlKHRoaXNbMF0pLGIubWFwKGZ1bmN0aW9uKCl7dmFyIGE9dGhpczt3aGlsZShhLmZpcnN0RWxlbWVudENoaWxkKWE9YS5maXJzdEVsZW1lbnRDaGlsZDtyZXR1cm4gYX0pLmFwcGVuZCh0aGlzKSksdGhpc30sd3JhcElubmVyOmZ1bmN0aW9uKGEpe3JldHVybiByLmlzRnVuY3Rpb24oYSk/dGhpcy5lYWNoKGZ1bmN0aW9uKGIpe3IodGhpcykud3JhcElubmVyKGEuY2FsbCh0aGlzLGIpKX0pOnRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBiPXIodGhpcyksYz1iLmNvbnRlbnRzKCk7Yy5sZW5ndGg/Yy53cmFwQWxsKGEpOmIuYXBwZW5kKGEpfSl9LHdyYXA6ZnVuY3Rpb24oYSl7dmFyIGI9ci5pc0Z1bmN0aW9uKGEpO3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oYyl7cih0aGlzKS53cmFwQWxsKGI/YS5jYWxsKHRoaXMsYyk6YSl9KX0sdW53cmFwOmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLnBhcmVudChhKS5ub3QoXCJib2R5XCIpLmVhY2goZnVuY3Rpb24oKXtyKHRoaXMpLnJlcGxhY2VXaXRoKHRoaXMuY2hpbGROb2Rlcyl9KSx0aGlzfX0pLHIuZXhwci5wc2V1ZG9zLmhpZGRlbj1mdW5jdGlvbihhKXtyZXR1cm4hci5leHByLnBzZXVkb3MudmlzaWJsZShhKX0sci5leHByLnBzZXVkb3MudmlzaWJsZT1mdW5jdGlvbihhKXtyZXR1cm4hIShhLm9mZnNldFdpZHRofHxhLm9mZnNldEhlaWdodHx8YS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCl9LHIuYWpheFNldHRpbmdzLnhocj1mdW5jdGlvbigpe3RyeXtyZXR1cm4gbmV3IGEuWE1MSHR0cFJlcXVlc3R9Y2F0Y2goYil7fX07dmFyIFJiPXswOjIwMCwxMjIzOjIwNH0sU2I9ci5hamF4U2V0dGluZ3MueGhyKCk7by5jb3JzPSEhU2ImJlwid2l0aENyZWRlbnRpYWxzXCJpbiBTYixvLmFqYXg9U2I9ISFTYixyLmFqYXhUcmFuc3BvcnQoZnVuY3Rpb24oYil7dmFyIGMsZDtpZihvLmNvcnN8fFNiJiYhYi5jcm9zc0RvbWFpbilyZXR1cm57c2VuZDpmdW5jdGlvbihlLGYpe3ZhciBnLGg9Yi54aHIoKTtpZihoLm9wZW4oYi50eXBlLGIudXJsLGIuYXN5bmMsYi51c2VybmFtZSxiLnBhc3N3b3JkKSxiLnhockZpZWxkcylmb3IoZyBpbiBiLnhockZpZWxkcyloW2ddPWIueGhyRmllbGRzW2ddO2IubWltZVR5cGUmJmgub3ZlcnJpZGVNaW1lVHlwZSYmaC5vdmVycmlkZU1pbWVUeXBlKGIubWltZVR5cGUpLGIuY3Jvc3NEb21haW58fGVbXCJYLVJlcXVlc3RlZC1XaXRoXCJdfHwoZVtcIlgtUmVxdWVzdGVkLVdpdGhcIl09XCJYTUxIdHRwUmVxdWVzdFwiKTtmb3IoZyBpbiBlKWguc2V0UmVxdWVzdEhlYWRlcihnLGVbZ10pO2M9ZnVuY3Rpb24oYSl7cmV0dXJuIGZ1bmN0aW9uKCl7YyYmKGM9ZD1oLm9ubG9hZD1oLm9uZXJyb3I9aC5vbmFib3J0PWgub25yZWFkeXN0YXRlY2hhbmdlPW51bGwsXCJhYm9ydFwiPT09YT9oLmFib3J0KCk6XCJlcnJvclwiPT09YT9cIm51bWJlclwiIT10eXBlb2YgaC5zdGF0dXM/ZigwLFwiZXJyb3JcIik6ZihoLnN0YXR1cyxoLnN0YXR1c1RleHQpOmYoUmJbaC5zdGF0dXNdfHxoLnN0YXR1cyxoLnN0YXR1c1RleHQsXCJ0ZXh0XCIhPT0oaC5yZXNwb25zZVR5cGV8fFwidGV4dFwiKXx8XCJzdHJpbmdcIiE9dHlwZW9mIGgucmVzcG9uc2VUZXh0P3tiaW5hcnk6aC5yZXNwb25zZX06e3RleHQ6aC5yZXNwb25zZVRleHR9LGguZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpKX19LGgub25sb2FkPWMoKSxkPWgub25lcnJvcj1jKFwiZXJyb3JcIiksdm9pZCAwIT09aC5vbmFib3J0P2gub25hYm9ydD1kOmgub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7ND09PWgucmVhZHlTdGF0ZSYmYS5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YyYmZCgpfSl9LGM9YyhcImFib3J0XCIpO3RyeXtoLnNlbmQoYi5oYXNDb250ZW50JiZiLmRhdGF8fG51bGwpfWNhdGNoKGkpe2lmKGMpdGhyb3cgaX19LGFib3J0OmZ1bmN0aW9uKCl7YyYmYygpfX19KSxyLmFqYXhQcmVmaWx0ZXIoZnVuY3Rpb24oYSl7YS5jcm9zc0RvbWFpbiYmKGEuY29udGVudHMuc2NyaXB0PSExKX0pLHIuYWpheFNldHVwKHthY2NlcHRzOntzY3JpcHQ6XCJ0ZXh0L2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2VjbWFzY3JpcHQsIGFwcGxpY2F0aW9uL3gtZWNtYXNjcmlwdFwifSxjb250ZW50czp7c2NyaXB0Oi9cXGIoPzpqYXZhfGVjbWEpc2NyaXB0XFxiL30sY29udmVydGVyczp7XCJ0ZXh0IHNjcmlwdFwiOmZ1bmN0aW9uKGEpe3JldHVybiByLmdsb2JhbEV2YWwoYSksYX19fSksci5hamF4UHJlZmlsdGVyKFwic2NyaXB0XCIsZnVuY3Rpb24oYSl7dm9pZCAwPT09YS5jYWNoZSYmKGEuY2FjaGU9ITEpLGEuY3Jvc3NEb21haW4mJihhLnR5cGU9XCJHRVRcIil9KSxyLmFqYXhUcmFuc3BvcnQoXCJzY3JpcHRcIixmdW5jdGlvbihhKXtpZihhLmNyb3NzRG9tYWluKXt2YXIgYixjO3JldHVybntzZW5kOmZ1bmN0aW9uKGUsZil7Yj1yKFwiPHNjcmlwdD5cIikucHJvcCh7Y2hhcnNldDphLnNjcmlwdENoYXJzZXQsc3JjOmEudXJsfSkub24oXCJsb2FkIGVycm9yXCIsYz1mdW5jdGlvbihhKXtiLnJlbW92ZSgpLGM9bnVsbCxhJiZmKFwiZXJyb3JcIj09PWEudHlwZT80MDQ6MjAwLGEudHlwZSl9KSxkLmhlYWQuYXBwZW5kQ2hpbGQoYlswXSl9LGFib3J0OmZ1bmN0aW9uKCl7YyYmYygpfX19fSk7dmFyIFRiPVtdLFViPS8oPSlcXD8oPz0mfCQpfFxcP1xcPy87ci5hamF4U2V0dXAoe2pzb25wOlwiY2FsbGJhY2tcIixqc29ucENhbGxiYWNrOmZ1bmN0aW9uKCl7dmFyIGE9VGIucG9wKCl8fHIuZXhwYW5kbytcIl9cIit1YisrO3JldHVybiB0aGlzW2FdPSEwLGF9fSksci5hamF4UHJlZmlsdGVyKFwianNvbiBqc29ucFwiLGZ1bmN0aW9uKGIsYyxkKXt2YXIgZSxmLGcsaD1iLmpzb25wIT09ITEmJihVYi50ZXN0KGIudXJsKT9cInVybFwiOlwic3RyaW5nXCI9PXR5cGVvZiBiLmRhdGEmJjA9PT0oYi5jb250ZW50VHlwZXx8XCJcIikuaW5kZXhPZihcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKSYmVWIudGVzdChiLmRhdGEpJiZcImRhdGFcIik7aWYoaHx8XCJqc29ucFwiPT09Yi5kYXRhVHlwZXNbMF0pcmV0dXJuIGU9Yi5qc29ucENhbGxiYWNrPXIuaXNGdW5jdGlvbihiLmpzb25wQ2FsbGJhY2spP2IuanNvbnBDYWxsYmFjaygpOmIuanNvbnBDYWxsYmFjayxoP2JbaF09YltoXS5yZXBsYWNlKFViLFwiJDFcIitlKTpiLmpzb25wIT09ITEmJihiLnVybCs9KHZiLnRlc3QoYi51cmwpP1wiJlwiOlwiP1wiKStiLmpzb25wK1wiPVwiK2UpLGIuY29udmVydGVyc1tcInNjcmlwdCBqc29uXCJdPWZ1bmN0aW9uKCl7cmV0dXJuIGd8fHIuZXJyb3IoZStcIiB3YXMgbm90IGNhbGxlZFwiKSxnWzBdfSxiLmRhdGFUeXBlc1swXT1cImpzb25cIixmPWFbZV0sYVtlXT1mdW5jdGlvbigpe2c9YXJndW1lbnRzfSxkLmFsd2F5cyhmdW5jdGlvbigpe3ZvaWQgMD09PWY/cihhKS5yZW1vdmVQcm9wKGUpOmFbZV09ZixiW2VdJiYoYi5qc29ucENhbGxiYWNrPWMuanNvbnBDYWxsYmFjayxUYi5wdXNoKGUpKSxnJiZyLmlzRnVuY3Rpb24oZikmJmYoZ1swXSksZz1mPXZvaWQgMH0pLFwic2NyaXB0XCJ9KSxvLmNyZWF0ZUhUTUxEb2N1bWVudD1mdW5jdGlvbigpe3ZhciBhPWQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KFwiXCIpLmJvZHk7cmV0dXJuIGEuaW5uZXJIVE1MPVwiPGZvcm0+PC9mb3JtPjxmb3JtPjwvZm9ybT5cIiwyPT09YS5jaGlsZE5vZGVzLmxlbmd0aH0oKSxyLnBhcnNlSFRNTD1mdW5jdGlvbihhLGIsYyl7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGEpcmV0dXJuW107XCJib29sZWFuXCI9PXR5cGVvZiBiJiYoYz1iLGI9ITEpO3ZhciBlLGYsZztyZXR1cm4gYnx8KG8uY3JlYXRlSFRNTERvY3VtZW50PyhiPWQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KFwiXCIpLGU9Yi5jcmVhdGVFbGVtZW50KFwiYmFzZVwiKSxlLmhyZWY9ZC5sb2NhdGlvbi5ocmVmLGIuaGVhZC5hcHBlbmRDaGlsZChlKSk6Yj1kKSxmPUMuZXhlYyhhKSxnPSFjJiZbXSxmP1tiLmNyZWF0ZUVsZW1lbnQoZlsxXSldOihmPXFhKFthXSxiLGcpLGcmJmcubGVuZ3RoJiZyKGcpLnJlbW92ZSgpLHIubWVyZ2UoW10sZi5jaGlsZE5vZGVzKSl9LHIuZm4ubG9hZD1mdW5jdGlvbihhLGIsYyl7dmFyIGQsZSxmLGc9dGhpcyxoPWEuaW5kZXhPZihcIiBcIik7cmV0dXJuIGg+LTEmJihkPXBiKGEuc2xpY2UoaCkpLGE9YS5zbGljZSgwLGgpKSxyLmlzRnVuY3Rpb24oYik/KGM9YixiPXZvaWQgMCk6YiYmXCJvYmplY3RcIj09dHlwZW9mIGImJihlPVwiUE9TVFwiKSxnLmxlbmd0aD4wJiZyLmFqYXgoe3VybDphLHR5cGU6ZXx8XCJHRVRcIixkYXRhVHlwZTpcImh0bWxcIixkYXRhOmJ9KS5kb25lKGZ1bmN0aW9uKGEpe2Y9YXJndW1lbnRzLGcuaHRtbChkP3IoXCI8ZGl2PlwiKS5hcHBlbmQoci5wYXJzZUhUTUwoYSkpLmZpbmQoZCk6YSl9KS5hbHdheXMoYyYmZnVuY3Rpb24oYSxiKXtnLmVhY2goZnVuY3Rpb24oKXtjLmFwcGx5KHRoaXMsZnx8W2EucmVzcG9uc2VUZXh0LGIsYV0pfSl9KSx0aGlzfSxyLmVhY2goW1wiYWpheFN0YXJ0XCIsXCJhamF4U3RvcFwiLFwiYWpheENvbXBsZXRlXCIsXCJhamF4RXJyb3JcIixcImFqYXhTdWNjZXNzXCIsXCJhamF4U2VuZFwiXSxmdW5jdGlvbihhLGIpe3IuZm5bYl09ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMub24oYixhKX19KSxyLmV4cHIucHNldWRvcy5hbmltYXRlZD1mdW5jdGlvbihhKXtyZXR1cm4gci5ncmVwKHIudGltZXJzLGZ1bmN0aW9uKGIpe3JldHVybiBhPT09Yi5lbGVtfSkubGVuZ3RofSxyLm9mZnNldD17c2V0T2Zmc2V0OmZ1bmN0aW9uKGEsYixjKXt2YXIgZCxlLGYsZyxoLGksaixrPXIuY3NzKGEsXCJwb3NpdGlvblwiKSxsPXIoYSksbT17fTtcInN0YXRpY1wiPT09ayYmKGEuc3R5bGUucG9zaXRpb249XCJyZWxhdGl2ZVwiKSxoPWwub2Zmc2V0KCksZj1yLmNzcyhhLFwidG9wXCIpLGk9ci5jc3MoYSxcImxlZnRcIiksaj0oXCJhYnNvbHV0ZVwiPT09a3x8XCJmaXhlZFwiPT09aykmJihmK2kpLmluZGV4T2YoXCJhdXRvXCIpPi0xLGo/KGQ9bC5wb3NpdGlvbigpLGc9ZC50b3AsZT1kLmxlZnQpOihnPXBhcnNlRmxvYXQoZil8fDAsZT1wYXJzZUZsb2F0KGkpfHwwKSxyLmlzRnVuY3Rpb24oYikmJihiPWIuY2FsbChhLGMsci5leHRlbmQoe30saCkpKSxudWxsIT1iLnRvcCYmKG0udG9wPWIudG9wLWgudG9wK2cpLG51bGwhPWIubGVmdCYmKG0ubGVmdD1iLmxlZnQtaC5sZWZ0K2UpLFwidXNpbmdcImluIGI/Yi51c2luZy5jYWxsKGEsbSk6bC5jc3MobSl9fSxyLmZuLmV4dGVuZCh7b2Zmc2V0OmZ1bmN0aW9uKGEpe2lmKGFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIHZvaWQgMD09PWE/dGhpczp0aGlzLmVhY2goZnVuY3Rpb24oYil7ci5vZmZzZXQuc2V0T2Zmc2V0KHRoaXMsYSxiKX0pO3ZhciBiLGMsZCxlLGY9dGhpc1swXTtpZihmKXJldHVybiBmLmdldENsaWVudFJlY3RzKCkubGVuZ3RoPyhkPWYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksYj1mLm93bmVyRG9jdW1lbnQsYz1iLmRvY3VtZW50RWxlbWVudCxlPWIuZGVmYXVsdFZpZXcse3RvcDpkLnRvcCtlLnBhZ2VZT2Zmc2V0LWMuY2xpZW50VG9wLGxlZnQ6ZC5sZWZ0K2UucGFnZVhPZmZzZXQtYy5jbGllbnRMZWZ0fSk6e3RvcDowLGxlZnQ6MH19LHBvc2l0aW9uOmZ1bmN0aW9uKCl7aWYodGhpc1swXSl7dmFyIGEsYixjPXRoaXNbMF0sZD17dG9wOjAsbGVmdDowfTtyZXR1cm5cImZpeGVkXCI9PT1yLmNzcyhjLFwicG9zaXRpb25cIik/Yj1jLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOihhPXRoaXMub2Zmc2V0UGFyZW50KCksYj10aGlzLm9mZnNldCgpLEIoYVswXSxcImh0bWxcIil8fChkPWEub2Zmc2V0KCkpLGQ9e3RvcDpkLnRvcCtyLmNzcyhhWzBdLFwiYm9yZGVyVG9wV2lkdGhcIiwhMCksbGVmdDpkLmxlZnQrci5jc3MoYVswXSxcImJvcmRlckxlZnRXaWR0aFwiLCEwKX0pLHt0b3A6Yi50b3AtZC50b3Atci5jc3MoYyxcIm1hcmdpblRvcFwiLCEwKSxsZWZ0OmIubGVmdC1kLmxlZnQtci5jc3MoYyxcIm1hcmdpbkxlZnRcIiwhMCl9fX0sb2Zmc2V0UGFyZW50OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5vZmZzZXRQYXJlbnQ7d2hpbGUoYSYmXCJzdGF0aWNcIj09PXIuY3NzKGEsXCJwb3NpdGlvblwiKSlhPWEub2Zmc2V0UGFyZW50O3JldHVybiBhfHxyYX0pfX0pLHIuZWFjaCh7c2Nyb2xsTGVmdDpcInBhZ2VYT2Zmc2V0XCIsc2Nyb2xsVG9wOlwicGFnZVlPZmZzZXRcIn0sZnVuY3Rpb24oYSxiKXt2YXIgYz1cInBhZ2VZT2Zmc2V0XCI9PT1iO3IuZm5bYV09ZnVuY3Rpb24oZCl7cmV0dXJuIFQodGhpcyxmdW5jdGlvbihhLGQsZSl7dmFyIGY7cmV0dXJuIHIuaXNXaW5kb3coYSk/Zj1hOjk9PT1hLm5vZGVUeXBlJiYoZj1hLmRlZmF1bHRWaWV3KSx2b2lkIDA9PT1lP2Y/ZltiXTphW2RdOnZvaWQoZj9mLnNjcm9sbFRvKGM/Zi5wYWdlWE9mZnNldDplLGM/ZTpmLnBhZ2VZT2Zmc2V0KTphW2RdPWUpfSxhLGQsYXJndW1lbnRzLmxlbmd0aCl9fSksci5lYWNoKFtcInRvcFwiLFwibGVmdFwiXSxmdW5jdGlvbihhLGIpe3IuY3NzSG9va3NbYl09UGEoby5waXhlbFBvc2l0aW9uLGZ1bmN0aW9uKGEsYyl7aWYoYylyZXR1cm4gYz1PYShhLGIpLE1hLnRlc3QoYyk/cihhKS5wb3NpdGlvbigpW2JdK1wicHhcIjpjfSl9KSxyLmVhY2goe0hlaWdodDpcImhlaWdodFwiLFdpZHRoOlwid2lkdGhcIn0sZnVuY3Rpb24oYSxiKXtyLmVhY2goe3BhZGRpbmc6XCJpbm5lclwiK2EsY29udGVudDpiLFwiXCI6XCJvdXRlclwiK2F9LGZ1bmN0aW9uKGMsZCl7ci5mbltkXT1mdW5jdGlvbihlLGYpe3ZhciBnPWFyZ3VtZW50cy5sZW5ndGgmJihjfHxcImJvb2xlYW5cIiE9dHlwZW9mIGUpLGg9Y3x8KGU9PT0hMHx8Zj09PSEwP1wibWFyZ2luXCI6XCJib3JkZXJcIik7cmV0dXJuIFQodGhpcyxmdW5jdGlvbihiLGMsZSl7dmFyIGY7cmV0dXJuIHIuaXNXaW5kb3coYik/MD09PWQuaW5kZXhPZihcIm91dGVyXCIpP2JbXCJpbm5lclwiK2FdOmIuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50W1wiY2xpZW50XCIrYV06OT09PWIubm9kZVR5cGU/KGY9Yi5kb2N1bWVudEVsZW1lbnQsTWF0aC5tYXgoYi5ib2R5W1wic2Nyb2xsXCIrYV0sZltcInNjcm9sbFwiK2FdLGIuYm9keVtcIm9mZnNldFwiK2FdLGZbXCJvZmZzZXRcIithXSxmW1wiY2xpZW50XCIrYV0pKTp2b2lkIDA9PT1lP3IuY3NzKGIsYyxoKTpyLnN0eWxlKGIsYyxlLGgpfSxiLGc/ZTp2b2lkIDAsZyl9fSl9KSxyLmZuLmV4dGVuZCh7YmluZDpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIHRoaXMub24oYSxudWxsLGIsYyl9LHVuYmluZDpmdW5jdGlvbihhLGIpe3JldHVybiB0aGlzLm9mZihhLG51bGwsYil9LGRlbGVnYXRlOmZ1bmN0aW9uKGEsYixjLGQpe3JldHVybiB0aGlzLm9uKGIsYSxjLGQpfSx1bmRlbGVnYXRlOmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gMT09PWFyZ3VtZW50cy5sZW5ndGg/dGhpcy5vZmYoYSxcIioqXCIpOnRoaXMub2ZmKGIsYXx8XCIqKlwiLGMpfX0pLHIuaG9sZFJlYWR5PWZ1bmN0aW9uKGEpe2E/ci5yZWFkeVdhaXQrKzpyLnJlYWR5KCEwKX0sci5pc0FycmF5PUFycmF5LmlzQXJyYXksci5wYXJzZUpTT049SlNPTi5wYXJzZSxyLm5vZGVOYW1lPUIsXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kJiZkZWZpbmUoXCJqcXVlcnlcIixbXSxmdW5jdGlvbigpe3JldHVybiByfSk7dmFyIFZiPWEualF1ZXJ5LFdiPWEuJDtyZXR1cm4gci5ub0NvbmZsaWN0PWZ1bmN0aW9uKGIpe3JldHVybiBhLiQ9PT1yJiYoYS4kPVdiKSxiJiZhLmpRdWVyeT09PXImJihhLmpRdWVyeT1WYikscn0sYnx8KGEualF1ZXJ5PWEuJD1yKSxyfSk7XHJcbiJdfQ==
