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

var unusedTags = [
// {
// 	name: 'script'
// },
{
	name: 'link',
	filter: function filter(tag) {
		return tag.getAttribute('rel') == 'stylesheet' && tag.getAttribute('href').includes('drag-n-drop');
	}
}, {
	name: 'hr',
	filter: function filter(tag) {
		return $(tag).hasClass('horizontal-line') || $(tag).hasClass('vertical-line');
	}
}];

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

		return html_beautify(doctype + '\n\t\t\t\t\t\t\t  ' + (0, _htmlGenerator2.default)(html, _jsoup.removeUnusedTags, _jsoup.emptyChildren, _jsoup.generateTableScript, _jsoup.generateCalendarOnclickAttr), {
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

},{"./components/common":134,"./inputs/inputs":166,"./util/calendar":171,"./util/download":172,"./util/fullScreen":175,"./util/htmlGenerator":176,"./util/jsoup":177}],177:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateCalendarOnclickAttr = exports.generateTableScript = exports.emptyChildren = exports.removeUnusedTags = undefined;

var _unusedTags = require('./unusedTags');

var _unusedTags2 = _interopRequireDefault(_unusedTags);

var _emptyChildrenSelectors = require('./emptyChildrenSelectors');

var _table = require('../templates/table');

var _table2 = _interopRequireDefault(_table);

var _table3 = require('../components/@oee/table');

var _table4 = _interopRequireDefault(_table3);

var _calendar = require('./calendar');

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
    $(el).find(_emptyChildrenSelectors.emptyChildrenSelectors.join(', ')).empty();
    return el;
}

function generateTableScript(el) {
    var jsStr = Array.from($(el).find(_emptyChildrenSelectors.tableSelector)).reduce(function (prev, element) {
        return prev + '\n                ' + (0, _table2.default)($(element), _table4.default);
    }, '');
    $('<script></script>').text(jsStr).appendTo($(el).find('body'));
    return el;
}

function generateCalendarOnclickAttr(el) {
    $(el).find(_calendar.calendarSelector).each(function () {
        $(this).attr('onclick') || (0, _calendar.setOnclickAttr)(this);
    });
    return el;
}

exports.removeUnusedTags = removeUnusedTags;
exports.emptyChildren = emptyChildren;
exports.generateTableScript = generateTableScript;
exports.generateCalendarOnclickAttr = generateCalendarOnclickAttr;

},{"../components/@oee/table":125,"../templates/table":169,"./calendar":171,"./emptyChildrenSelectors":174,"./unusedTags":178}],178:[function(require,module,exports){
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
		return tag.getAttribute('rel') == 'stylesheet' && tag.getAttribute('href').includes('drag-n-drop');
	}
}, {
	name: 'hr',
	filter: function filter(tag) {
		return $(tag).hasClass('horizontal-line') || $(tag).hasClass('vertical-line');
	}
}];

exports.default = unusedTags;

},{}],174:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tableSelector = exports.emptyChildrenSelectors = undefined;

var _common = require('../components/common');

var tableSelector = '[' + _common.dataTableId + ']';
var emptyChildrenSelectors = [tableSelector];

exports.emptyChildrenSelectors = emptyChildrenSelectors;
exports.tableSelector = tableSelector;

},{"../components/common":134}],169:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require('../components/common');

var index = 1;

function template(node, table) {
    var id = node.attr('id') || (node.attr('id', 'table' + index++), node.attr('id'));
    var key = node.attr(_common.dataTableId);
    return '\n    var columnDefs' + key + ' = [\n        ' + table.getTable(key).columnDefs.map(function (def) {
        return '{headerName: "' + def.headerName + '", field: "' + def.field + '"}';
    }).join(',') + '\n    ];\n    var gridOptions' + key + ' = {\n        columnDefs: columnDefs' + key + ',\n        enableSorting: false,\n        enableFilter: false\n      };\n    var eGridDiv' + key + ' = document.querySelector(\'#' + id + '\');\n    new agGrid.Grid(eGridDiv' + key + ', gridOptions' + key + ');\n    gridOptions' + key + '.api.setRowData([]);\n    ';
}

exports.default = template;

},{"../components/common":134}],125:[function(require,module,exports){
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
    html: '<div ' + _common.dataComponentId + '="html/table@oee" style="width: 500px; height: 200px;" class="dropzone draggable ag-theme-blue"></div>',
    getTable: function getTable(key) {
        return tables[key];
    },

    beforeInit: function beforeInit(node) {
        var _this = this,
            _properties;

        if (!$(node).attr(_common.dataTableId)) {
            var id = index++;
            $(node).attr(_common.dataTableId, id);
            tables[id] = {
                columnDefs: [{ headerName: "header", field: "filed" }, { headerName: "header", field: "field" }, { headerName: "header", field: "field" }],
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
                    field: cur.field
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
                        colDefs[keyIndex][input.name] = value;
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
                field: 'field'
            });

            setColumnDefsAndRender(node, colDefs);
            return node;
        }
    }]
};

exports.default = table;

},{"../../builder":52,"../../inputs/inputs":166,"../common":134}],176:[function(require,module,exports){
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

},{}],175:[function(require,module,exports){
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

},{}],172:[function(require,module,exports){
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

},{}],171:[function(require,module,exports){
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
    $(node).attr('onclick', 'WdatePicker(' + getDataConfigInfo(node) + ')');
}

function getParsedConfigInfo(node) {
    return JSON.parse(getDataConfigInfoJSONString(node));
}

function getDateFmt(node) {
    return getParsedConfigInfo(node).dateFmt;
}

function cloneWithoutOnclick(node) {
    $(node).replaceWith($(node).removeAttr('onclick').clone());
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

},{"../components/common":134}],166:[function(require,module,exports){
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

},{"./ButtonInput":145,"./CheckboxInput":146,"./ColorInput":147,"./CssUnitInput":148,"./FileUploadInput":149,"./GridInput":150,"./GridLayoutInput":151,"./Input":152,"./LinkInput":153,"./ListInput":154,"./NumberInput":155,"./ProductsInput":156,"./RadioButtonInput":157,"./RadioInput":158,"./RangeInput":159,"./SectionInput":160,"./SelectInput":161,"./TextInput":162,"./TextValueInput":163,"./ToggleInput":164,"./ValueTextInput":165}],165:[function(require,module,exports){
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

},{"./TextInput":162}],164:[function(require,module,exports){
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

},{"./TextInput":162}],163:[function(require,module,exports){
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

},{"./Input":152}],161:[function(require,module,exports){
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

},{"./Input":152}],160:[function(require,module,exports){
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

},{"./Input":152}],159:[function(require,module,exports){
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

},{"./Input":152}],157:[function(require,module,exports){
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

},{"./RadioInput":158}],158:[function(require,module,exports){
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

},{"./Input":152}],156:[function(require,module,exports){
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

},{"./TextInput":162}],155:[function(require,module,exports){
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

},{"./Input":152}],154:[function(require,module,exports){
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

},{"./Input":152}],153:[function(require,module,exports){
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

},{"./TextInput":162}],151:[function(require,module,exports){
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

},{"./TextInput":162}],150:[function(require,module,exports){
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

},{"./Input":152}],149:[function(require,module,exports){
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

},{"./TextInput":162}],162:[function(require,module,exports){
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

},{"./Input":152}],148:[function(require,module,exports){
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

},{"./Input":152}],147:[function(require,module,exports){
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

},{"./Input":152}],146:[function(require,module,exports){
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

},{"./Input":152}],145:[function(require,module,exports){
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

},{"./Input":152}],152:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){
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

exports.bgcolorClasses = bgcolorClasses;
exports.bgcolorSelectOptions = bgcolorSelectOptions;
exports.changeNodeName = changeNodeName;
exports.inc_base_sort = inc_base_sort;
exports.dataComponentId = dataComponentId;
exports.dataTableId = dataTableId;
exports.dataConfigInfo = dataConfigInfo;
exports.dataCalendarId = dataCalendarId;

},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGRlci5qcyIsInNyYy91dGlsL2pzb3VwLmpzIiwic3JjL3V0aWwvdW51c2VkVGFncy5qcyIsInNyYy91dGlsL2VtcHR5Q2hpbGRyZW5TZWxlY3RvcnMuanMiLCJzcmMvdGVtcGxhdGVzL3RhYmxlLmpzIiwic3JjL2NvbXBvbmVudHMvQG9lZS90YWJsZS5qcyIsInNyYy91dGlsL2h0bWxHZW5lcmF0b3IuanMiLCJzcmMvdXRpbC9mdWxsU2NyZWVuLmpzIiwic3JjL3V0aWwvZG93bmxvYWQuanMiLCJzcmMvdXRpbC9jYWxlbmRhci5qcyIsInNyYy9pbnB1dHMvaW5wdXRzLmpzIiwic3JjL2lucHV0cy9WYWx1ZVRleHRJbnB1dC5qcyIsInNyYy9pbnB1dHMvVG9nZ2xlSW5wdXQuanMiLCJzcmMvaW5wdXRzL1RleHRWYWx1ZUlucHV0LmpzIiwic3JjL2lucHV0cy9TZWxlY3RJbnB1dC5qcyIsInNyYy9pbnB1dHMvU2VjdGlvbklucHV0LmpzIiwic3JjL2lucHV0cy9SYW5nZUlucHV0LmpzIiwic3JjL2lucHV0cy9SYWRpb0J1dHRvbklucHV0LmpzIiwic3JjL2lucHV0cy9SYWRpb0lucHV0LmpzIiwic3JjL2lucHV0cy9Qcm9kdWN0c0lucHV0LmpzIiwic3JjL2lucHV0cy9OdW1iZXJJbnB1dC5qcyIsInNyYy9pbnB1dHMvTGlzdElucHV0LmpzIiwic3JjL2lucHV0cy9MaW5rSW5wdXQuanMiLCJzcmMvaW5wdXRzL0dyaWRMYXlvdXRJbnB1dC5qcyIsInNyYy9pbnB1dHMvR3JpZElucHV0LmpzIiwic3JjL2lucHV0cy9GaWxlVXBsb2FkSW5wdXQuanMiLCJzcmMvaW5wdXRzL1RleHRJbnB1dC5qcyIsInNyYy9pbnB1dHMvQ3NzVW5pdElucHV0LmpzIiwic3JjL2lucHV0cy9Db2xvcklucHV0LmpzIiwic3JjL2lucHV0cy9DaGVja2JveElucHV0LmpzIiwic3JjL2lucHV0cy9CdXR0b25JbnB1dC5qcyIsInNyYy9pbnB1dHMvSW5wdXQuanMiLCJzcmMvY29tcG9uZW50cy9jb21tb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLENBQUMsWUFBWTtBQUNaLEtBQUksUUFBUSxFQUFaOztBQUVBLE1BQUssSUFBTCxHQUFZLFNBQVMsSUFBVCxDQUFjLEdBQWQsRUFBbUIsSUFBbkIsRUFBeUI7QUFDcEM7QUFDQTtBQUNBLE1BQUksS0FBSyxrQkFBa0IsSUFBbEIsQ0FBdUIsR0FBdkIsSUFDUixNQUFNLEdBQU4sSUFBYSxNQUFNLEdBQU4sS0FDYixLQUFLLFNBQVMsY0FBVCxDQUF3QixHQUF4QixFQUE2QixTQUFsQyxDQUZROztBQUlSO0FBQ0E7QUFDQSxNQUFJLFFBQUosQ0FBYSxLQUFiLEVBQ0M7O0FBRUE7QUFDQSxzQkFIQTs7QUFLQTtBQUNBLE1BQ0UsT0FERixDQUNVLFdBRFYsRUFDdUIsR0FEdkIsRUFFRSxLQUZGLENBRVEsSUFGUixFQUVjLElBRmQsQ0FFbUIsSUFGbkIsRUFHRSxPQUhGLENBR1Usa0JBSFYsRUFHOEIsTUFIOUIsRUFJRSxPQUpGLENBSVUsYUFKVixFQUl5QixRQUp6QixFQUtFLEtBTEYsQ0FLUSxJQUxSLEVBS2MsSUFMZCxDQUttQixLQUxuQixFQU1FLEtBTkYsQ0FNUSxJQU5SLEVBTWMsSUFOZCxDQU1tQixVQU5uQixFQU9FLEtBUEYsQ0FPUSxJQVBSLEVBT2MsSUFQZCxDQU9tQixLQVBuQixDQU5BLEdBY0Usd0JBZkgsQ0FORDtBQXNCQTtBQUNBLFNBQU8sT0FBTyxHQUFHLElBQUgsQ0FBUCxHQUFrQixFQUF6QjtBQUNBLEVBM0JEO0FBNEJBLENBL0JEOztBQWlDQSxJQUFJLFFBQVMsWUFBWTtBQUN4QixLQUFJLFFBQVEsQ0FBWjtBQUNBLFFBQU8sVUFBVSxRQUFWLEVBQW9CLEVBQXBCLEVBQXdCO0FBQzlCLGVBQWEsS0FBYjtBQUNBLFVBQVEs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RUF5Qkc7QUFDQyxXQUFPLFNBRFI7QUFFQyxVQUFNO0FBRlAsQ0F6QkgsRUE0Qkc7QUFDQyxXQUFPLFVBRFI7QUFFQyxVQUFNO0FBRlAsQ0E1QkgsQ0FESjs7QUFrQ0EsU0FBUyxjQUFULENBQXdCLElBQXhCLEVBQThCLFdBQTlCLEVBQTJDO0FBQ3ZDLFFBQUksT0FBSjtBQUNBLGNBQVUsU0FBUyxhQUFULENBQXVCLFdBQXZCLENBQVY7QUFDQSxpQkFBYSxLQUFLLEdBQUwsQ0FBUyxDQUFULEVBQVksVUFBekI7O0FBRUEsU0FBSyxJQUFJLENBQUosRUFBTyxNQUFNLFdBQVcsTUFBN0IsRUFBcUMsSUFBSSxHQUF6QyxFQUE4QyxHQUE5QyxFQUFtRDtBQUMvQyxnQkFBUSxZQUFSLENBQXFCLFdBQVcsQ0FBWCxFQUFjLFFBQW5DLEVBQTZDLFdBQVcsQ0FBWCxFQUFjLFNBQTNEO0FBQ0g7O0FBRUQsTUFBRSxPQUFGLEVBQVcsTUFBWCxDQUFrQixFQUFFLElBQUYsRUFBUSxRQUFSLEVBQWxCO0FBQ0EsTUFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixPQUFwQjs7QUFFQSxXQUFPLE9BQVA7QUFDSDs7QUFFRCxJQUFJLFlBQVksR0FBaEIsQyxDQUFvQjtBQUNwQixTQUFTLGFBQVQsR0FBeUI7QUFDckIsV0FBTyxXQUFQO0FBQ0g7O0FBRUQsSUFBTSxrQkFBa0IsbUJBQXhCO0FBQ0EsSUFBTSxjQUFjLGVBQXBCO0FBQ0EsSUFBTSxpQkFBaUIsa0JBQXZCO0FBQ0EsSUFBTSxpQkFBaUIsa0JBQXZCOztRQUdJLGMsR0FBQSxjO1FBQWdCLG9CLEdBQUEsb0I7UUFBc0IsYyxHQUFBLGM7UUFBZ0IsYSxHQUFBLGE7UUFBZSxlLEdBQUEsZTtRQUFpQixXLEdBQUEsVztRQUN0RixjLEdBQUEsYztRQUFnQixjLEdBQUEsYyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7IFNlY3Rpb25JbnB1dCB9IGZyb20gJy4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IHJlbW92ZVVudXNlZFRhZ3MsIGVtcHR5Q2hpbGRyZW4sIGdlbmVyYXRlVGFibGVTY3JpcHQsIGdlbmVyYXRlQ2FsZW5kYXJPbmNsaWNrQXR0ciB9IGZyb20gJy4vdXRpbC9qc291cCc7XHJcbmltcG9ydCB7IGRvd25sb2FkQXNUZXh0RmlsZSB9IGZyb20gJy4vdXRpbC9kb3dubG9hZCc7XHJcbmltcG9ydCB7IGxhdW5jaEZ1bGxTY3JlZW4gfSBmcm9tICcuL3V0aWwvZnVsbFNjcmVlbic7XHJcbmltcG9ydCB7IGRhdGFDb21wb25lbnRJZCwgZGF0YUNhbGVuZGFySWQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29tbW9uJ1xyXG5pbXBvcnQgaHRtbEdlbmVyYXRvciBmcm9tICcuL3V0aWwvaHRtbEdlbmVyYXRvcic7XHJcbmltcG9ydCB7IHJlcGxhY2VPdGhlclNob3dpbmdDYWxlbmRhcklucHV0cyB9IGZyb20gJy4vdXRpbC9jYWxlbmRhcic7XHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG5cdHZhciBjYWNoZSA9IHt9O1xyXG5cclxuXHR0aGlzLnRtcGwgPSBmdW5jdGlvbiB0bXBsKHN0ciwgZGF0YSkge1xyXG5cdFx0Ly8gRmlndXJlIG91dCBpZiB3ZSdyZSBnZXR0aW5nIGEgdGVtcGxhdGUsIG9yIGlmIHdlIG5lZWQgdG9cclxuXHRcdC8vIGxvYWQgdGhlIHRlbXBsYXRlIC0gYW5kIGJlIHN1cmUgdG8gY2FjaGUgdGhlIHJlc3VsdC5cclxuXHRcdHZhciBmbiA9IC9eWy1hLXpBLVowLTldKyQvLnRlc3Qoc3RyKSA/XHJcblx0XHRcdGNhY2hlW3N0cl0gPSBjYWNoZVtzdHJdIHx8XHJcblx0XHRcdHRtcGwoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3RyKS5pbm5lckhUTUwpIDpcclxuXHJcblx0XHRcdC8vIEdlbmVyYXRlIGEgcmV1c2FibGUgZnVuY3Rpb24gdGhhdCB3aWxsIHNlcnZlIGFzIGEgdGVtcGxhdGVcclxuXHRcdFx0Ly8gZ2VuZXJhdG9yIChhbmQgd2hpY2ggd2lsbCBiZSBjYWNoZWQpLlxyXG5cdFx0XHRuZXcgRnVuY3Rpb24oXCJvYmpcIixcclxuXHRcdFx0XHRcInZhciBwPVtdLHByaW50PWZ1bmN0aW9uKCl7cC5wdXNoLmFwcGx5KHAsYXJndW1lbnRzKTt9O1wiICtcclxuXHJcblx0XHRcdFx0Ly8gSW50cm9kdWNlIHRoZSBkYXRhIGFzIGxvY2FsIHZhcmlhYmxlcyB1c2luZyB3aXRoKCl7fVxyXG5cdFx0XHRcdFwid2l0aChvYmope3AucHVzaCgnXCIgK1xyXG5cclxuXHRcdFx0XHQvLyBDb252ZXJ0IHRoZSB0ZW1wbGF0ZSBpbnRvIHB1cmUgSmF2YVNjcmlwdFxyXG5cdFx0XHRcdHN0clxyXG5cdFx0XHRcdFx0LnJlcGxhY2UoL1tcXHJcXHRcXG5dL2csIFwiIFwiKVxyXG5cdFx0XHRcdFx0LnNwbGl0KFwieyVcIikuam9pbihcIlxcdFwiKVxyXG5cdFx0XHRcdFx0LnJlcGxhY2UoLygoXnwlfSlbXlxcdF0qKScvZywgXCIkMVxcclwiKVxyXG5cdFx0XHRcdFx0LnJlcGxhY2UoL1xcdD0oLio/KSV9L2csIFwiJywkMSwnXCIpXHJcblx0XHRcdFx0XHQuc3BsaXQoXCJcXHRcIikuam9pbihcIicpO1wiKVxyXG5cdFx0XHRcdFx0LnNwbGl0KFwiJX1cIikuam9pbihcInAucHVzaCgnXCIpXHJcblx0XHRcdFx0XHQuc3BsaXQoXCJcXHJcIikuam9pbihcIlxcXFwnXCIpXHJcblx0XHRcdFx0KyBcIicpO31yZXR1cm4gcC5qb2luKCcnKTtcIik7XHJcblx0XHQvLyBQcm92aWRlIHNvbWUgYmFzaWMgY3VycnlpbmcgdG8gdGhlIHVzZXJcclxuXHRcdHJldHVybiBkYXRhID8gZm4oZGF0YSkgOiBmbjtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxudmFyIGRlbGF5ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGltZXIgPSAwO1xyXG5cdHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2ssIG1zKSB7XHJcblx0XHRjbGVhclRpbWVvdXQodGltZXIpO1xyXG5cdFx0dGltZXIgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCBtcyk7XHJcblx0fTtcclxufSkoKTtcclxuXHJcbmNvbnN0IHVudXNlZFRhZ3MgPSBbXHJcblx0Ly8ge1xyXG5cdC8vIFx0bmFtZTogJ3NjcmlwdCdcclxuXHQvLyB9LFxyXG5cdHtcclxuXHRcdG5hbWU6ICdsaW5rJyxcclxuXHRcdGZpbHRlcjogdGFnID0+IHRhZy5nZXRBdHRyaWJ1dGUoJ3JlbCcpID09ICdzdHlsZXNoZWV0J1xyXG5cdFx0XHQmJiB0YWcuZ2V0QXR0cmlidXRlKCdocmVmJykuaW5jbHVkZXMoJ2RyYWctbi1kcm9wJylcclxuXHR9LFxyXG5cdHtcclxuXHRcdG5hbWU6ICdocicsXHJcblx0XHRmaWx0ZXI6IHRhZyA9PiAkKHRhZykuaGFzQ2xhc3MoJ2hvcml6b250YWwtbGluZScpXHJcblx0XHRcdHx8ICQodGFnKS5oYXNDbGFzcygndmVydGljYWwtbGluZScpXHJcblx0fVxyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0U3R5bGUoZWwsIHN0eWxlUHJvcCkge1xyXG5cdHZhbHVlID0gXCJcIjtcclxuXHQvL3ZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsKTtcclxuXHRpZiAoZWwuc3R5bGUgJiYgZWwuc3R5bGUubGVuZ3RoID4gMCAmJiBlbC5zdHlsZVtzdHlsZVByb3BdKS8vY2hlY2sgaW5saW5lXHJcblx0XHR2YXIgdmFsdWUgPSBlbC5zdHlsZVtzdHlsZVByb3BdO1xyXG5cdGVsc2VcclxuXHRcdGlmIChlbC5jdXJyZW50U3R5bGUpXHQvL2NoZWNrIGRlZmluZWQgY3NzXHJcblx0XHRcdHZhciB2YWx1ZSA9IGVsLmN1cnJlbnRTdHlsZVtzdHlsZVByb3BdO1xyXG5cdFx0ZWxzZSBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcclxuXHRcdFx0dmFyIHZhbHVlID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0RGVmYXVsdENvbXB1dGVkU3R5bGUgP1xyXG5cdFx0XHRcdGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldERlZmF1bHRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHN0eWxlUHJvcCkgOlxyXG5cdFx0XHRcdHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHN0eWxlUHJvcCk7XHJcblx0XHR9XHJcblxyXG5cdHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuaWYgKFZ2dmViID09PSB1bmRlZmluZWQpIHZhciBWdnZlYiA9IHt9O1xyXG5cclxuVnZ2ZWIuZGVmYXVsdENvbXBvbmVudCA9IFwiX2Jhc2VcIjtcclxuVnZ2ZWIucHJlc2VydmVQcm9wZXJ0eVNlY3Rpb25zID0gdHJ1ZTtcclxuXHJcblZ2dmViLmJhc2VVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0ID8gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmMucmVwbGFjZSgvW15cXC9dKj9cXC5qcyQvLCAnJykgOiAnJztcclxuXHJcblZ2dmViLkNvbXBvbmVudHNHcm91cCA9IHt9O1xyXG5cclxuVnZ2ZWIuQ29tcG9uZW50cyA9IHtcclxuXHRfY29tcG9uZW50czoge30sXHJcblxyXG5cdF9ub2Rlc0xvb2t1cDoge30sXHJcblxyXG5cdF9hdHRyaWJ1dGVzTG9va3VwOiB7fSxcclxuXHJcblx0X2NsYXNzZXNMb29rdXA6IHt9LFxyXG5cclxuXHRfY2xhc3Nlc1JlZ2V4TG9va3VwOiB7fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKHVybCkge1xyXG5cdH0sXHJcblxyXG5cdGdldDogZnVuY3Rpb24gKHR5cGUpIHtcclxuXHRcdHJldHVybiB0aGlzLl9jb21wb25lbnRzW3R5cGVdO1xyXG5cdH0sXHJcblxyXG5cdGFkZDogZnVuY3Rpb24gKHR5cGUsIGRhdGEpIHtcclxuXHRcdGRhdGEudHlwZSA9IHR5cGU7XHJcblxyXG5cdFx0dGhpcy5fY29tcG9uZW50c1t0eXBlXSA9IGRhdGE7XHJcblxyXG5cdFx0aWYgKGRhdGEubm9kZXMpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBkYXRhLm5vZGVzKSB7XHJcblx0XHRcdFx0dGhpcy5fbm9kZXNMb29rdXBbZGF0YS5ub2Rlc1tpXV0gPSBkYXRhO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGRhdGEuYXR0cmlidXRlcykge1xyXG5cdFx0XHRpZiAoZGF0YS5hdHRyaWJ1dGVzLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xyXG5cdFx0XHRcdGZvciAodmFyIGkgaW4gZGF0YS5hdHRyaWJ1dGVzKSB7XHJcblx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2RhdGEuYXR0cmlidXRlc1tpXV0gPSBkYXRhO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRmb3IgKHZhciBpIGluIGRhdGEuYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2ldID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2ldID0ge307XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGRhdGEuYXR0cmlidXRlc1tpXS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcclxuXHRcdFx0XHRcdFx0Ly8g5pSv5oyBdGV4dGlucHV05Lit5LiN5ZCM55qE6L6T5YWl57G75Z6LYXR0cmlidXRlczogeyBcInR5cGVcIjogWyd0ZXh0JywgJ3Bhc3N3b3JkJ10gfSxcclxuXHRcdFx0XHRcdFx0ZGF0YS5hdHRyaWJ1dGVzW2ldLmZvckVhY2godmFsdWUgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuX2F0dHJpYnV0ZXNMb29rdXBbaV1bdmFsdWVdID0gZGF0YTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2ldW2RhdGEuYXR0cmlidXRlc1tpXV0gPSBkYXRhO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkYXRhLmNsYXNzZXMpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBkYXRhLmNsYXNzZXMpIHtcclxuXHRcdFx0XHR0aGlzLl9jbGFzc2VzTG9va3VwW2RhdGEuY2xhc3Nlc1tpXV0gPSBkYXRhO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGRhdGEuY2xhc3Nlc1JlZ2V4KSB7XHJcblx0XHRcdGZvciAodmFyIGkgaW4gZGF0YS5jbGFzc2VzUmVnZXgpIHtcclxuXHRcdFx0XHR0aGlzLl9jbGFzc2VzUmVnZXhMb29rdXBbZGF0YS5jbGFzc2VzUmVnZXhbaV1dID0gZGF0YTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGV4dGVuZDogZnVuY3Rpb24gKGluaGVyaXRUeXBlLCB0eXBlLCBkYXRhKSB7XHJcblxyXG5cdFx0bmV3RGF0YSA9IGRhdGE7XHJcblxyXG5cdFx0aWYgKGluaGVyaXREYXRhID0gdGhpcy5fY29tcG9uZW50c1tpbmhlcml0VHlwZV0pIHtcclxuXHRcdFx0bmV3RGF0YSA9ICQuZXh0ZW5kKHRydWUsIHt9LCBpbmhlcml0RGF0YSwgZGF0YSk7XHJcblx0XHRcdG5ld0RhdGEucHJvcGVydGllcyA9ICQubWVyZ2UoJC5tZXJnZShbXSwgaW5oZXJpdERhdGEucHJvcGVydGllcyA/IGluaGVyaXREYXRhLnByb3BlcnRpZXMgOiBbXSksIGRhdGEucHJvcGVydGllcyA/IGRhdGEucHJvcGVydGllcyA6IFtdKTtcclxuXHRcdH1cclxuXHJcblx0XHQvL3NvcnQgYnkgb3JkZXJcclxuXHRcdG5ld0RhdGEucHJvcGVydGllcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgYS5zb3J0ID09PSBcInVuZGVmaW5lZFwiKSBhLnNvcnQgPSAwO1xyXG5cdFx0XHRpZiAodHlwZW9mIGIuc29ydCA9PT0gXCJ1bmRlZmluZWRcIikgYi5zb3J0ID0gMDtcclxuXHJcblx0XHRcdGlmIChhLnNvcnQgPCBiLnNvcnQpXHJcblx0XHRcdFx0cmV0dXJuIC0xO1xyXG5cdFx0XHRpZiAoYS5zb3J0ID4gYi5zb3J0KVxyXG5cdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHRyZXR1cm4gMDtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHR0aGlzLmFkZCh0eXBlLCBuZXdEYXRhKTtcclxuXHR9LFxyXG5cclxuXHJcblx0bWF0Y2hOb2RlOiBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0aWYgKCQobm9kZSkuYXR0cihkYXRhQ29tcG9uZW50SWQpICYmIHRoaXMuX2NvbXBvbmVudHNbJChub2RlKS5hdHRyKGRhdGFDb21wb25lbnRJZCldKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9jb21wb25lbnRzWyQobm9kZSkuYXR0cihkYXRhQ29tcG9uZW50SWQpXTtcclxuXHRcdH0gZWxzZSBpZiAoJChub2RlKS5hdHRyKCd0eXBlJykgPT0gJ3JhZGlvJyB8fCAkKG5vZGUpLmF0dHIoJ3R5cGUnKSA9PSAnY2hlY2tib3gnKSB7XHJcblx0XHRcdGNvbnN0ICRwYXJlbnQgPSAkKG5vZGUpLnBhcmVudCgpO1xyXG5cdFx0XHRpZiAoJHBhcmVudC5hdHRyKGRhdGFDb21wb25lbnRJZCkgJiYgdGhpcy5fY29tcG9uZW50c1skcGFyZW50LmF0dHIoZGF0YUNvbXBvbmVudElkKV0pIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fY29tcG9uZW50c1skcGFyZW50LmF0dHIoZGF0YUNvbXBvbmVudElkKV1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChub2RlLmF0dHJpYnV0ZXMubGVuZ3RoKSB7XHJcblx0XHRcdC8vc2VhcmNoIGZvciBhdHRyaWJ1dGVzXHJcblx0XHRcdGZvciAodmFyIGkgaW4gbm9kZS5hdHRyaWJ1dGVzKSB7XHJcblx0XHRcdFx0YXR0ciA9IG5vZGUuYXR0cmlidXRlc1tpXS5uYW1lO1xyXG5cdFx0XHRcdHZhbHVlID0gbm9kZS5hdHRyaWJ1dGVzW2ldLnZhbHVlO1xyXG5cclxuXHRcdFx0XHRpZiAoYXR0ciBpbiB0aGlzLl9hdHRyaWJ1dGVzTG9va3VwKSB7XHJcblx0XHRcdFx0XHRjb21wb25lbnQgPSB0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2F0dHJdO1xyXG5cclxuXHRcdFx0XHRcdC8vY3VycmVudGx5IHdlIGNoZWNrIHRoYXQgaXMgbm90IGEgY29tcG9uZW50IGJ5IGxvb2tpbmcgYXQgbmFtZSBhdHRyaWJ1dGVcclxuXHRcdFx0XHRcdC8vaWYgd2UgaGF2ZSBhIGNvbGxlY3Rpb24gb2Ygb2JqZWN0cyBpdCBtZWFucyB0aGF0IGF0dHJpYnV0ZSB2YWx1ZSBtdXN0IGJlIGNoZWNrZWRcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgY29tcG9uZW50W1wibmFtZVwiXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdFx0XHRpZiAodmFsdWUgaW4gY29tcG9uZW50KSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGNvbXBvbmVudFt2YWx1ZV07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gY29tcG9uZW50O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBub2RlLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRhdHRyID0gbm9kZS5hdHRyaWJ1dGVzW2ldLm5hbWU7XHJcblx0XHRcdFx0dmFsdWUgPSBub2RlLmF0dHJpYnV0ZXNbaV0udmFsdWU7XHJcblxyXG5cdFx0XHRcdC8vY2hlY2sgZm9yIG5vZGUgY2xhc3Nlc1xyXG5cdFx0XHRcdGlmIChhdHRyID09IFwiY2xhc3NcIikge1xyXG5cdFx0XHRcdFx0Y2xhc3NlcyA9IHZhbHVlLnNwbGl0KFwiIFwiKTtcclxuXHJcblx0XHRcdFx0XHRmb3IgKGogaW4gY2xhc3Nlcykge1xyXG5cdFx0XHRcdFx0XHRpZiAoY2xhc3Nlc1tqXSBpbiB0aGlzLl9jbGFzc2VzTG9va3VwKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl9jbGFzc2VzTG9va3VwW2NsYXNzZXNbal1dO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGZvciAocmVnZXggaW4gdGhpcy5fY2xhc3Nlc1JlZ2V4TG9va3VwKSB7XHJcblx0XHRcdFx0XHRcdHJlZ2V4T2JqID0gbmV3IFJlZ0V4cChyZWdleCk7XHJcblx0XHRcdFx0XHRcdGlmIChyZWdleE9iai5leGVjKHZhbHVlKSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl9jbGFzc2VzUmVnZXhMb29rdXBbcmVnZXhdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGFnTmFtZSA9IG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0aWYgKHRhZ05hbWUgaW4gdGhpcy5fbm9kZXNMb29rdXApIHJldHVybiB0aGlzLl9ub2Rlc0xvb2t1cFt0YWdOYW1lXTtcclxuXHJcblx0XHQvL3JldHVybiBmYWxzZTtcclxuXHRcdHJldHVybiB0aGlzLmdldChWdnZlYi5kZWZhdWx0Q29tcG9uZW50KTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uICh0eXBlKSB7XHJcblxyXG5cdFx0Y29tcG9uZW50ID0gdGhpcy5fY29tcG9uZW50c1t0eXBlXTtcclxuXHJcblx0XHRyaWdodFBhbmVsID0galF1ZXJ5KFwiI3JpZ2h0LXBhbmVsICNjb21wb25lbnQtcHJvcGVydGllc1wiKTtcclxuXHRcdHNlY3Rpb24gPSByaWdodFBhbmVsLmZpbmQoJy5zZWN0aW9uW2RhdGEtc2VjdGlvbj1cImRlZmF1bHRcIl0nKTtcclxuXHJcblx0XHRpZiAoIShWdnZlYi5wcmVzZXJ2ZVByb3BlcnR5U2VjdGlvbnMgJiYgc2VjdGlvbi5sZW5ndGgpKSB7XHJcblx0XHRcdHJpZ2h0UGFuZWwuaHRtbCgnJykuYXBwZW5kKHRtcGwoXCJ2dnZlYi1pbnB1dC1zZWN0aW9uaW5wdXRcIiwgeyBrZXk6IFwiZGVmYXVsdFwiLCBoZWFkZXI6IGNvbXBvbmVudC5uYW1lIH0pKTtcclxuXHRcdFx0c2VjdGlvbiA9IHJpZ2h0UGFuZWwuZmluZChcIi5zZWN0aW9uXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJpZ2h0UGFuZWwuZmluZCgnW2RhdGEtaGVhZGVyPVwiZGVmYXVsdFwiXSBzcGFuJykuaHRtbChjb21wb25lbnQubmFtZSk7XHJcblx0XHRzZWN0aW9uLmh0bWwoXCJcIilcclxuXHJcblx0XHRpZiAoY29tcG9uZW50LmJlZm9yZUluaXQpIGNvbXBvbmVudC5iZWZvcmVJbml0KFZ2dmViLkJ1aWxkZXIuc2VsZWN0ZWRFbC5nZXQoMCkpO1xyXG5cclxuXHRcdGZuID0gZnVuY3Rpb24gKGNvbXBvbmVudCwgcHJvcGVydHkpIHtcclxuXHRcdFx0cmV0dXJuIHByb3BlcnR5LmlucHV0Lm9uKCdwcm9wZXJ0eUNoYW5nZScsIGZ1bmN0aW9uIChldmVudCwgdmFsdWUsIGlucHV0KSB7XHJcblx0XHRcdFx0ZWxlbWVudCA9IFZ2dmViLkJ1aWxkZXIuc2VsZWN0ZWRFbDtcclxuXHRcdFx0XHRpZiAocHJvcGVydHkuY2hpbGQpIGVsZW1lbnQgPSBlbGVtZW50LmZpbmQocHJvcGVydHkuY2hpbGQpO1xyXG5cdFx0XHRcdGlmIChwcm9wZXJ0eS5wYXJlbnQpIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudChwcm9wZXJ0eS5wYXJlbnQpO1xyXG5cclxuXHRcdFx0XHRpZiAocHJvcGVydHkub25DaGFuZ2UpIHtcclxuXHRcdFx0XHRcdGVsZW1lbnQgPSBwcm9wZXJ0eS5vbkNoYW5nZShlbGVtZW50LCB2YWx1ZSwgaW5wdXQsIGNvbXBvbmVudCk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eS5odG1sQXR0cikge1xyXG5cdFx0XHRcdFx0b2xkVmFsdWUgPSBlbGVtZW50LmF0dHIocHJvcGVydHkuaHRtbEF0dHIpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChwcm9wZXJ0eS5odG1sQXR0ciA9PSAndGV4dCcpIHtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudC50ZXh0KHZhbHVlKTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHkuaHRtbEF0dHIgPT0gXCJjbGFzc1wiICYmIHByb3BlcnR5LnZhbGlkVmFsdWVzKSB7XHJcblx0XHRcdFx0XHRcdGVsZW1lbnQucmVtb3ZlQ2xhc3MocHJvcGVydHkudmFsaWRWYWx1ZXMuam9pbihcIiBcIikpO1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5hZGRDbGFzcyh2YWx1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChwcm9wZXJ0eS5odG1sQXR0ciA9PSBcInN0eWxlXCIpIHtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQuY3NzKHByb3BlcnR5LmtleSwgdmFsdWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LmF0dHIocHJvcGVydHkuaHRtbEF0dHIsIHZhbHVlKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0XHRcdFx0dHlwZTogJ2F0dHJpYnV0ZXMnLFxyXG5cdFx0XHRcdFx0XHR0YXJnZXQ6IGVsZW1lbnQuZ2V0KDApLFxyXG5cdFx0XHRcdFx0XHRhdHRyaWJ1dGVOYW1lOiBwcm9wZXJ0eS5odG1sQXR0cixcclxuXHRcdFx0XHRcdFx0b2xkVmFsdWU6IG9sZFZhbHVlLFxyXG5cdFx0XHRcdFx0XHRuZXdWYWx1ZTogZWxlbWVudC5hdHRyKHByb3BlcnR5Lmh0bWxBdHRyKVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoY29tcG9uZW50Lm9uQ2hhbmdlKSB7XHJcblx0XHRcdFx0XHRlbGVtZW50ID0gY29tcG9uZW50Lm9uQ2hhbmdlKGVsZW1lbnQsIHByb3BlcnR5LCB2YWx1ZSwgaW5wdXQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCFwcm9wZXJ0eS5jaGlsZCAmJiAhcHJvcGVydHkucGFyZW50KSBWdnZlYi5CdWlsZGVyLnNlbGVjdE5vZGUoZWxlbWVudCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHRub2RlRWxlbWVudCA9IFZ2dmViLkJ1aWxkZXIuc2VsZWN0ZWRFbDtcclxuXHJcblx0XHRmb3IgKHZhciBpIGluIGNvbXBvbmVudC5wcm9wZXJ0aWVzKSB7XHJcblx0XHRcdHByb3BlcnR5ID0gY29tcG9uZW50LnByb3BlcnRpZXNbaV07XHJcblxyXG5cdFx0XHRpZiAocHJvcGVydHkuYmVmb3JlSW5pdCkgcHJvcGVydHkuYmVmb3JlSW5pdChlbGVtZW50LmdldCgwKSlcclxuXHJcblx0XHRcdGVsZW1lbnQgPSBub2RlRWxlbWVudDtcclxuXHRcdFx0aWYgKHByb3BlcnR5LmNoaWxkKSBlbGVtZW50ID0gZWxlbWVudC5maW5kKHByb3BlcnR5LmNoaWxkKTtcclxuXHJcblx0XHRcdGlmIChwcm9wZXJ0eS5kYXRhKSB7XHJcblx0XHRcdFx0cHJvcGVydHkuZGF0YVtcImtleVwiXSA9IHByb3BlcnR5LmtleTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRwcm9wZXJ0eS5kYXRhID0geyBcImtleVwiOiBwcm9wZXJ0eS5rZXkgfTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiBwcm9wZXJ0eS5ncm91cCA9PT0gJ3VuZGVmaW5lZCcpIHByb3BlcnR5Lmdyb3VwID0gbnVsbDtcclxuXHJcblx0XHRcdHByb3BlcnR5LmlucHV0ID0gcHJvcGVydHkuaW5wdXR0eXBlLmluaXQocHJvcGVydHkuZGF0YSk7XHJcblxyXG5cdFx0XHRpZiAocHJvcGVydHkuaW5pdCkge1xyXG5cdFx0XHRcdHByb3BlcnR5LmlucHV0dHlwZS5zZXRWYWx1ZShwcm9wZXJ0eS5pbml0KGVsZW1lbnQuZ2V0KDApKSk7XHJcblx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHkuaHRtbEF0dHIpIHtcclxuXHRcdFx0XHRpZiAocHJvcGVydHkuaHRtbEF0dHIgPT0gJ3RleHQnKSB7XHJcblx0XHRcdFx0XHR2YWx1ZSA9IGVsZW1lbnQudGV4dCgpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHkuaHRtbEF0dHIgPT0gXCJzdHlsZVwiKSB7XHJcblx0XHRcdFx0XHQvL3ZhbHVlID0gZWxlbWVudC5jc3MocHJvcGVydHkua2V5KTsvL2pxdWVyeSBjc3MgcmV0dXJucyBjb21wdXRlZCBzdHlsZVxyXG5cdFx0XHRcdFx0dmFsdWUgPSBnZXRTdHlsZShlbGVtZW50LmdldCgwKSwgcHJvcGVydHkua2V5KTsvL2dldFN0eWxlIHJldHVybnMgZGVjbGFyZWQgc3R5bGVcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dmFsdWUgPSBlbGVtZW50LmF0dHIocHJvcGVydHkuaHRtbEF0dHIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly9pZiBhdHRyaWJ1dGUgaXMgY2xhc3MgY2hlY2sgaWYgb25lIG9mIHZhbGlkIHZhbHVlcyBpcyBpbmNsdWRlZCBhcyBjbGFzcyB0byBzZXQgdGhlIHNlbGVjdFxyXG5cdFx0XHRcdGlmICh2YWx1ZSAmJiBwcm9wZXJ0eS5odG1sQXR0ciA9PSBcImNsYXNzXCIgJiYgcHJvcGVydHkudmFsaWRWYWx1ZXMpIHtcclxuXHRcdFx0XHRcdHZhbHVlID0gdmFsdWUuc3BsaXQoXCIgXCIpLmZpbHRlcihmdW5jdGlvbiAoZWwpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHByb3BlcnR5LnZhbGlkVmFsdWVzLmluZGV4T2YoZWwpICE9IC0xXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHByb3BlcnR5LmlucHV0dHlwZS5zZXRWYWx1ZSh2YWx1ZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZuKGNvbXBvbmVudCwgcHJvcGVydHkpO1xyXG5cclxuXHRcdFx0aWYgKHByb3BlcnR5LmlucHV0dHlwZSA9PSBTZWN0aW9uSW5wdXQpIHtcclxuXHRcdFx0XHRzZWN0aW9uID0gcmlnaHRQYW5lbC5maW5kKCcuc2VjdGlvbltkYXRhLXNlY3Rpb249XCInICsgcHJvcGVydHkua2V5ICsgJ1wiXScpO1xyXG5cclxuXHRcdFx0XHRpZiAoVnZ2ZWIucHJlc2VydmVQcm9wZXJ0eVNlY3Rpb25zICYmIHNlY3Rpb24ubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRzZWN0aW9uLmh0bWwoXCJcIik7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJpZ2h0UGFuZWwuYXBwZW5kKHByb3BlcnR5LmlucHV0KTtcclxuXHRcdFx0XHRcdHNlY3Rpb24gPSByaWdodFBhbmVsLmZpbmQoJy5zZWN0aW9uW2RhdGEtc2VjdGlvbj1cIicgKyBwcm9wZXJ0eS5rZXkgKyAnXCJdJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHJvdyA9ICQodG1wbCgndnZ2ZWItcHJvcGVydHknLCBwcm9wZXJ0eSkpO1xyXG5cdFx0XHRcdHJvdy5maW5kKCcuaW5wdXQnKS5hcHBlbmQocHJvcGVydHkuaW5wdXQpO1xyXG5cdFx0XHRcdHNlY3Rpb24uYXBwZW5kKHJvdyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY29tcG9uZW50LmluaXQpIGNvbXBvbmVudC5pbml0KFZ2dmViLkJ1aWxkZXIuc2VsZWN0ZWRFbC5nZXQoMCkpO1xyXG5cdH1cclxufTtcclxuXHJcblxyXG5cclxuVnZ2ZWIuV3lzaXd5Z0VkaXRvciA9IHtcclxuXHJcblx0aXNBY3RpdmU6IGZhbHNlLFxyXG5cdG9sZFZhbHVlOiAnJyxcclxuXHRkb2M6IGZhbHNlLFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZG9jKSB7XHJcblx0XHR0aGlzLmRvYyA9IGRvYztcclxuXHJcblx0XHQkKFwiI2JvbGQtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCdib2xkJywgZmFsc2UsIG51bGwpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjaXRhbGljLWJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGRvYy5leGVjQ29tbWFuZCgnaXRhbGljJywgZmFsc2UsIG51bGwpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjdW5kZXJsaW5lLWJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGRvYy5leGVjQ29tbWFuZCgndW5kZXJsaW5lJywgZmFsc2UsIG51bGwpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjc3RyaWtlLWJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGRvYy5leGVjQ29tbWFuZCgnc3RyaWtlVGhyb3VnaCcsIGZhbHNlLCBudWxsKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI2xpbmstYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCdjcmVhdGVMaW5rJywgZmFsc2UsIFwiI1wiKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHR1bmRvOiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5kb2MuZXhlY0NvbW1hbmQoJ3VuZG8nLCBmYWxzZSwgbnVsbCk7XHJcblx0fSxcclxuXHJcblx0cmVkbzogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdyZWRvJywgZmFsc2UsIG51bGwpO1xyXG5cdH0sXHJcblxyXG5cdGVkaXQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHRlbGVtZW50LmF0dHIoeyAnY29udGVudGVkaXRhYmxlJzogdHJ1ZSwgJ3NwZWxsY2hlY2trZXInOiBmYWxzZSB9KTtcclxuXHRcdCQoXCIjd3lzaXd5Zy1lZGl0b3JcIikuc2hvdygpO1xyXG5cclxuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcblx0XHR0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcclxuXHRcdHRoaXMub2xkVmFsdWUgPSBlbGVtZW50Lmh0bWwoKTtcclxuXHR9LFxyXG5cclxuXHRkZXN0cm95OiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0ZWxlbWVudC5yZW1vdmVBdHRyKCdjb250ZW50ZWRpdGFibGUgc3BlbGxjaGVja2tlcicpO1xyXG5cdFx0JChcIiN3eXNpd3lnLWVkaXRvclwiKS5oaWRlKCk7XHJcblx0XHR0aGlzLmlzQWN0aXZlID0gZmFsc2U7XHJcblxyXG5cclxuXHRcdG5vZGUgPSB0aGlzLmVsZW1lbnQuZ2V0KDApO1xyXG5cdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdHR5cGU6ICdjaGFyYWN0ZXJEYXRhJyxcclxuXHRcdFx0dGFyZ2V0OiBub2RlLFxyXG5cdFx0XHRvbGRWYWx1ZTogdGhpcy5vbGRWYWx1ZSxcclxuXHRcdFx0bmV3VmFsdWU6IG5vZGUuaW5uZXJIVE1MXHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcblZ2dmViLkJ1aWxkZXIgPSB7XHJcblxyXG5cdGRyYWdNb3ZlTXV0YXRpb246IGZhbHNlLFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAodXJsLCBjYWxsYmFjaykge1xyXG5cclxuXHRcdHNlbGYgPSB0aGlzO1xyXG5cclxuXHRcdHNlbGYubG9hZENvbnRyb2xHcm91cHMoKTtcclxuXHJcblx0XHRzZWxmLnNlbGVjdGVkRWwgPSBudWxsO1xyXG5cdFx0c2VsZi5oaWdobGlnaHRFbCA9IG51bGw7XHJcblx0XHRzZWxmLmluaXRDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cclxuXHRcdHNlbGYuZG9jdW1lbnRGcmFtZSA9ICQoXCIjaWZyYW1lLXdyYXBwZXIgPiBpZnJhbWVcIik7XHJcblx0XHRzZWxmLmNhbnZhcyA9ICQoXCIjY2FudmFzXCIpO1xyXG5cclxuXHRcdHNlbGYuX2xvYWRJZnJhbWUodXJsKTtcclxuXHJcblx0XHRzZWxmLl9pbml0RHJhZ2Ryb3AoKTtcclxuXHJcblx0XHRzZWxmLmRyYWdFbGVtZW50ID0gbnVsbDtcclxuXHR9LFxyXG5cclxuXHQvKiBjb250cm9scyAqL1xyXG5cdGxvYWRDb250cm9sR3JvdXBzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0Y29tcG9uZW50c0xpc3QgPSAkKFwiI2NvbXBvbmVudHMtbGlzdFwiKTtcclxuXHRcdGNvbXBvbmVudHNMaXN0LmVtcHR5KCk7XHJcblxyXG5cdFx0Zm9yIChncm91cCBpbiBWdnZlYi5Db21wb25lbnRzR3JvdXApIHtcclxuXHRcdFx0Y29tcG9uZW50c0xpc3QuYXBwZW5kKCc8bGkgY2xhc3M9XCJoZWFkZXJcIiBkYXRhLXNlY3Rpb249XCInICsgZ3JvdXAgKyAnXCIgIGRhdGEtc2VhcmNoPVwiXCI+PGxhYmVsIGNsYXNzPVwiaGVhZGVyXCIgZm9yPVwiY29tcGhlYWRfJyArIGdyb3VwICsgJ1wiPicgKyBncm91cCArICcgIDxkaXYgY2xhc3M9XCJoZWFkZXItYXJyb3dcIj48L2Rpdj5cXFxyXG5cdFx0XHRcdFx0XHRcdFx0ICAgPC9sYWJlbD48aW5wdXQgY2xhc3M9XCJoZWFkZXJfY2hlY2tcIiB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPVwidHJ1ZVwiIGlkPVwiY29tcGhlYWRfJyArIGdyb3VwICsgJ1wiPiAgPG9sPjwvb2w+PC9saT4nKTtcclxuXHJcblx0XHRcdGNvbXBvbmVudHNTdWJMaXN0ID0gY29tcG9uZW50c0xpc3QuZmluZCgnbGlbZGF0YS1zZWN0aW9uPVwiJyArIGdyb3VwICsgJ1wiXSAgb2wnKTtcclxuXHJcblx0XHRcdGNvbXBvbmVudHMgPSBWdnZlYi5Db21wb25lbnRzR3JvdXBbZ3JvdXBdO1xyXG5cclxuXHRcdFx0Zm9yIChpIGluIGNvbXBvbmVudHMpIHtcclxuXHRcdFx0XHRjb21wb25lbnRUeXBlID0gY29tcG9uZW50c1tpXTtcclxuXHRcdFx0XHRjb21wb25lbnQgPSBWdnZlYi5Db21wb25lbnRzLmdldChjb21wb25lbnRUeXBlKTtcclxuXHJcblx0XHRcdFx0aWYgKGNvbXBvbmVudCkge1xyXG5cdFx0XHRcdFx0aXRlbSA9ICQoJzxsaSBkYXRhLXNlY3Rpb249XCInICsgZ3JvdXAgKyAnXCIgZGF0YS10eXBlPVwiJyArIGNvbXBvbmVudFR5cGUgKyAnXCIgZGF0YS1zZWFyY2g9XCInICsgY29tcG9uZW50Lm5hbWUudG9Mb3dlckNhc2UoKSArICdcIj48YSBocmVmPVwiI1wiPicgKyBjb21wb25lbnQubmFtZSArIFwiPC9hPjwvbGk+XCIpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChjb21wb25lbnQuaW1hZ2UpIHtcclxuXHJcblx0XHRcdFx0XHRcdGl0ZW0uY3NzKHtcclxuXHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKFwiICsgJ2xpYnMvYnVpbGRlci8nICsgY29tcG9uZW50LmltYWdlICsgXCIpXCIsXHJcblx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZFJlcGVhdDogXCJuby1yZXBlYXRcIlxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGNvbXBvbmVudHNTdWJMaXN0LmFwcGVuZChpdGVtKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGxvYWRVcmw6IGZ1bmN0aW9uICh1cmwpIHtcclxuXHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmhpZGUoKTtcclxuXHRcdHNlbGYuaWZyYW1lLnNyYyA9IHVybDtcclxuXHR9LFxyXG5cclxuXHQvKiBpZnJhbWUgKi9cclxuXHRfbG9hZElmcmFtZTogZnVuY3Rpb24gKHVybCkge1xyXG5cclxuXHRcdHNlbGYuaWZyYW1lID0gdGhpcy5kb2N1bWVudEZyYW1lLmdldCgwKTtcclxuXHRcdHNlbGYuaWZyYW1lLnNyYyA9IHVybDtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5kb2N1bWVudEZyYW1lLm9uKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHR3aW5kb3cuRnJhbWVXaW5kb3cgPSBzZWxmLmlmcmFtZS5jb250ZW50V2luZG93O1xyXG5cdFx0XHR3aW5kb3cuRnJhbWVEb2N1bWVudCA9IHNlbGYuaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XHJcblxyXG5cdFx0XHRWdnZlYi5XeXNpd3lnRWRpdG9yLmluaXQod2luZG93LkZyYW1lRG9jdW1lbnQpO1xyXG5cdFx0XHRpZiAoc2VsZi5pbml0Q2FsbGJhY2spIHNlbGYuaW5pdENhbGxiYWNrKCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gc2VsZi5fZnJhbWVMb2FkZWQoKTtcclxuXHRcdH0pO1xyXG5cclxuXHR9LFxyXG5cclxuXHRfZnJhbWVMb2FkZWQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRzZWxmLmZyYW1lRG9jID0gJCh3aW5kb3cuRnJhbWVEb2N1bWVudCk7XHJcblx0XHRzZWxmLmZyYW1lSHRtbCA9ICQod2luZG93LkZyYW1lRG9jdW1lbnQpLmZpbmQoXCJodG1sXCIpO1xyXG5cdFx0c2VsZi5mcmFtZUJvZHkgPSAkKHdpbmRvdy5GcmFtZURvY3VtZW50KS5maW5kKCdib2R5Jyk7XHJcblxyXG5cdFx0dGhpcy5faW5pdEhpZ2h0bGlnaHQoKTtcclxuXHR9LFxyXG5cclxuXHRfZ2V0RWxlbWVudFR5cGU6IGZ1bmN0aW9uIChlbCkge1xyXG5cclxuXHRcdC8vc2VhcmNoIGZvciBjb21wb25lbnQgYXR0cmlidXRlXHJcblx0XHRjb21wb25lbnROYW1lID0gJyc7XHJcblxyXG5cdFx0aWYgKGVsLmF0dHJpYnV0ZXMpXHJcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZWwuYXR0cmlidXRlcy5sZW5ndGg7IGorKykge1xyXG5cclxuXHRcdFx0XHRpZiAoZWwuYXR0cmlidXRlc1tqXS5ub2RlTmFtZS5pbmRleE9mKCdkYXRhLWNvbXBvbmVudCcpID4gLTEpIHtcclxuXHRcdFx0XHRcdGNvbXBvbmVudE5hbWUgPSBlbC5hdHRyaWJ1dGVzW2pdLm5vZGVOYW1lLnJlcGxhY2UoJ2RhdGEtY29tcG9uZW50LScsICcnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRpZiAoY29tcG9uZW50TmFtZSAhPSAnJykgcmV0dXJuIGNvbXBvbmVudE5hbWU7XHJcblxyXG5cdFx0aWYgKGVsLmF0dHJpYnV0ZXMpXHJcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZWwuYXR0cmlidXRlcy5sZW5ndGg7IGorKykge1xyXG5cclxuXHRcdFx0XHRpZiAoZWwuYXR0cmlidXRlc1tqXS5ub2RlTmFtZS5pbmRleE9mKCdkYXRhLWNvbXBvbmVudCcpID4gLTEpIHtcclxuXHRcdFx0XHRcdGNvbXBvbmVudE5hbWUgPSBlbC5hdHRyaWJ1dGVzW2pdLm5vZGVOYW1lLnJlcGxhY2UoJ2RhdGEtY29tcG9uZW50LScsICcnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRpZiAoY29tcG9uZW50TmFtZSAhPSAnJykgcmV0dXJuIGNvbXBvbmVudE5hbWU7XHJcblx0XHQvL2lmIChjbGFzc05hbWUpIHJldHVybiBjb21wb25lbnROYW1lO1xyXG5cdFx0cmV0dXJuIGVsLnRhZ05hbWU7XHJcblx0fSxcclxuXHJcblx0bG9hZE5vZGVDb21wb25lbnQ6IGZ1bmN0aW9uIChub2RlKSB7XHJcblx0XHRkYXRhID0gVnZ2ZWIuQ29tcG9uZW50cy5tYXRjaE5vZGUobm9kZSk7XHJcblx0XHRpZiAoZGF0YSkgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIoZGF0YS50eXBlKTtcclxuXHJcblx0fSxcclxuXHJcblx0c2VsZWN0Tm9kZTogZnVuY3Rpb24gKG5vZGUgPSBmYWxzZSkge1xyXG5cclxuXHRcdGlmICghbm9kZSkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc2VsZi50ZXh0ZWRpdEVsICYmIHNlbGYuc2VsZWN0ZWRFbC5nZXQoMCkgIT0gbm9kZSkge1xyXG5cdFx0XHRWdnZlYi5XeXNpd3lnRWRpdG9yLmRlc3Ryb3koc2VsZi50ZXh0ZWRpdEVsKTtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikucmVtb3ZlQ2xhc3MoXCJ0ZXh0LWVkaXRcIikuZmluZChcIiNzZWxlY3QtYWN0aW9uc1wiKS5zaG93KCk7XHJcblx0XHRcdHNlbGYudGV4dGVkaXRFbCA9IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0c2VsZi5zZWxlY3RlZEVsID0gdGFyZ2V0ID0galF1ZXJ5KG5vZGUpO1xyXG5cdFx0b2Zmc2V0ID0gdGFyZ2V0Lm9mZnNldCgpO1xyXG5cclxuXHJcblx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5jc3MoXHJcblx0XHRcdHtcclxuXHRcdFx0XHRcInRvcFwiOiBvZmZzZXQudG9wIC0gc2VsZi5mcmFtZURvYy5zY3JvbGxUb3AoKSxcclxuXHRcdFx0XHRcImxlZnRcIjogb2Zmc2V0LmxlZnQgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbExlZnQoKSxcclxuXHRcdFx0XHRcIndpZHRoXCI6IHRhcmdldC5vdXRlcldpZHRoKCksXHJcblx0XHRcdFx0XCJoZWlnaHRcIjogdGFyZ2V0Lm91dGVySGVpZ2h0KCksXHJcblx0XHRcdFx0XCJkaXNwbGF5XCI6IFwiYmxvY2tcIixcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0alF1ZXJ5KFwiI2hpZ2hsaWdodC1uYW1lXCIpLmh0bWwoc2VsZi5fZ2V0RWxlbWVudFR5cGUobm9kZSkpO1xyXG5cclxuXHR9LFxyXG5cclxuXHQvKiBpZnJhbWUgaGlnaGxpZ2h0ICovXHJcblx0X2luaXRIaWdodGxpZ2h0OiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0bW92ZUV2ZW50ID0geyB0YXJnZXQ6IG51bGwsIH07XHJcblxyXG5cdFx0dGhpcy5mcmFtZUJvZHkub24oXCJtb3VzZW1vdmUgdG91Y2htb3ZlXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHQvL2RlbGF5IGZvciBoYWxmIGEgc2Vjb25kIGlmIGRyYWdnaW5nIG92ZXIgc2FtZSBlbGVtZW50XHJcblx0XHRcdC8vIGlmIChldmVudC50YXJnZXQgPT0gbW92ZUV2ZW50LnRhcmdldCAmJiAoKGV2ZW50LnRpbWVTdGFtcCAtIG1vdmVFdmVudC50aW1lU3RhbXApIDwgNTAwKSkgcmV0dXJuO1xyXG5cdFx0XHRpZiAoZXZlbnQudGFyZ2V0KSB7XHJcblx0XHRcdFx0bW92ZUV2ZW50ID0gZXZlbnQ7XHJcblxyXG5cdFx0XHRcdHNlbGYuaGlnaGxpZ2h0RWwgPSB0YXJnZXQgPSBqUXVlcnkoZXZlbnQudGFyZ2V0KTtcclxuXHRcdFx0XHRvZmZzZXQgPSB0YXJnZXQub2Zmc2V0KCk7XHJcblx0XHRcdFx0d2lkdGggPSB0YXJnZXQub3V0ZXJXaWR0aCgpO1xyXG5cdFx0XHRcdGhlaWdodCA9IHRhcmdldC5vdXRlckhlaWdodCgpO1xyXG5cclxuXHRcdFx0XHRpZiAoc2VsZi5pc0RyYWdnaW5nKSB7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdFbGVtZW50LmNzcyh7XHJcblx0XHRcdFx0XHRcdGRpc3BsYXk6ICdub25lJ1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRwYXJlbnQgPSBzZWxmLmhpZ2hsaWdodEVsO1xyXG5cdFx0XHRcdFx0cGFyZW50T2Zmc2V0ID0gc2VsZi5kcmFnRWxlbWVudC5vZmZzZXQoKTtcclxuXHRcdFx0XHRcdC8vIHRyeSB7XHJcblx0XHRcdFx0XHQvLyBcdHNlbGYuZHJhZ0VsZW1lbnQuY3NzKHtcclxuXHRcdFx0XHRcdC8vIFx0XHRkaXNwbGF5OiAnbm9uZSdcclxuXHRcdFx0XHRcdC8vIFx0fSk7XHJcblx0XHRcdFx0XHQvLyBcdGlmIChldmVudC5vcmlnaW5hbEV2ZW50ICYmIChvZmZzZXQubGVmdCA+IChldmVudC5vcmlnaW5hbEV2ZW50LnggLSAxMCkpKSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0aWYgKG9mZnNldC50b3AgPiAoZXZlbnQub3JpZ2luYWxFdmVudC55IC0gMTApKSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRwYXJlbnQuYmVmb3JlKHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRwYXJlbnQucHJlcGVuZChzZWxmLmRyYWdFbGVtZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQucHJlcGVuZFRvKHBhcmVudCk7XHJcblx0XHRcdFx0XHQvLyBcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gXHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdGlmIChldmVudC5vcmlnaW5hbEV2ZW50ICYmIG9mZnNldC50b3AgPiAoKGV2ZW50Lm9yaWdpbmFsRXZlbnQueSAtIDEwKSkpIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHBhcmVudC5iZWZvcmUoc2VsZi5kcmFnRWxlbWVudCk7XHJcblx0XHRcdFx0XHQvLyBcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHBhcmVudC5hcHBlbmQoc2VsZi5kcmFnRWxlbWVudCk7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRzZWxmLmRyYWdFbGVtZW50LmFwcGVuZFRvKHBhcmVudCk7XHJcblx0XHRcdFx0XHQvLyBcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gXHR9XHJcblx0XHRcdFx0XHQvLyB9IGNhdGNoIChlcnIpIHtcclxuXHRcdFx0XHRcdC8vIFx0Y29uc29sZS5sb2coZXJyKTtcclxuXHRcdFx0XHRcdC8vIH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdGpRdWVyeShcIiNoaWdobGlnaHQtYm94XCIpLmNzcyhcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFwidG9wXCI6IG9mZnNldC50b3AgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbFRvcCgpLFxyXG5cdFx0XHRcdFx0XHRcdFwibGVmdFwiOiBvZmZzZXQubGVmdCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsTGVmdCgpLFxyXG5cdFx0XHRcdFx0XHRcdFwid2lkdGhcIjogd2lkdGgsXHJcblx0XHRcdFx0XHRcdFx0XCJoZWlnaHRcIjogaGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHRcdFwiZGlzcGxheVwiOiBldmVudC50YXJnZXQuaGFzQXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnKSA/IFwibm9uZVwiIDogXCJibG9ja1wiXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdGpRdWVyeShcIiNoaWdobGlnaHQtbmFtZVwiKS5odG1sKHNlbGYuX2dldEVsZW1lbnRUeXBlKGV2ZW50LnRhcmdldCkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdHRoaXMuZnJhbWVCb2R5Lm9uKFwibW91c2V1cCB0b3VjaGVuZFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0aWYgKHNlbGYuaXNEcmFnZ2luZykge1xyXG5cdFx0XHRcdHNlbGYuaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRpZiAoY29tcG9uZW50LmRyYWdIdG1sKSAvL2lmIGRyYWdIdG1sIGlzIHNldCBmb3IgZHJhZ2dpbmcgdGhlbiBzZXQgcmVhbCBjb21wb25lbnQgaHRtbFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdG5ld0VsZW1lbnQgPSAkKGNvbXBvbmVudC5odG1sKTtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQucmVwbGFjZVdpdGgobmV3RWxlbWVudCk7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdFbGVtZW50ID0gbmV3RWxlbWVudDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGNvbXBvbmVudC5hZnRlckRyb3ApIHNlbGYuZHJhZ0VsZW1lbnQgPSBjb21wb25lbnQuYWZ0ZXJEcm9wKHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cclxuXHRcdFx0XHRub2RlID0gc2VsZi5kcmFnRWxlbWVudC5nZXQoMCk7XHJcblx0XHRcdFx0c2VsZi5zZWxlY3ROb2RlKG5vZGUpO1xyXG5cdFx0XHRcdHNlbGYubG9hZE5vZGVDb21wb25lbnQobm9kZSk7XHJcblxyXG5cdFx0XHRcdGlmIChzZWxmLmRyYWdNb3ZlTXV0YXRpb24gPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0XHRcdFx0dHlwZTogJ2NoaWxkTGlzdCcsXHJcblx0XHRcdFx0XHRcdHRhcmdldDogbm9kZS5wYXJlbnROb2RlLFxyXG5cdFx0XHRcdFx0XHRhZGRlZE5vZGVzOiBbbm9kZV0sXHJcblx0XHRcdFx0XHRcdG5leHRTaWJsaW5nOiBub2RlLm5leHRTaWJsaW5nXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnTW92ZU11dGF0aW9uLm5ld1BhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ01vdmVNdXRhdGlvbi5uZXdOZXh0U2libGluZyA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0XHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbihzZWxmLmRyYWdNb3ZlTXV0YXRpb24pO1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnTW92ZU11dGF0aW9uID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0dGhpcy5mcmFtZUJvZHkub24oXCJkYmxjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0cmVwbGFjZU90aGVyU2hvd2luZ0NhbGVuZGFySW5wdXRzKGV2ZW50LnRhcmdldCwgc2VsZi5mcmFtZUJvZHkpO1xyXG5cclxuXHRcdFx0c2VsZi50ZXh0ZWRpdEVsID0gdGFyZ2V0ID0galF1ZXJ5KGV2ZW50LnRhcmdldCk7XHJcblxyXG5cdFx0XHRWdnZlYi5XeXNpd3lnRWRpdG9yLmVkaXQoc2VsZi50ZXh0ZWRpdEVsKTtcclxuXHJcblx0XHRcdHNlbGYudGV4dGVkaXRFbC5hdHRyKHsgJ2NvbnRlbnRlZGl0YWJsZSc6IHRydWUsICdzcGVsbGNoZWNra2VyJzogZmFsc2UgfSk7XHJcblxyXG5cdFx0XHRzZWxmLnRleHRlZGl0RWwub24oXCJibHVyIGtleXVwIHBhc3RlIGlucHV0XCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuXHRcdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5jc3Moe1xyXG5cdFx0XHRcdFx0XCJ3aWR0aFwiOiBzZWxmLnRleHRlZGl0RWwub3V0ZXJXaWR0aCgpLFxyXG5cdFx0XHRcdFx0XCJoZWlnaHRcIjogc2VsZi50ZXh0ZWRpdEVsLm91dGVySGVpZ2h0KClcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5hZGRDbGFzcyhcInRleHQtZWRpdFwiKS5maW5kKFwiI3NlbGVjdC1hY3Rpb25zXCIpLmhpZGUoKTtcclxuXHRcdFx0alF1ZXJ5KFwiI2hpZ2hsaWdodC1ib3hcIikuaGlkZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdHRoaXMuZnJhbWVCb2R5Lm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdHJlcGxhY2VPdGhlclNob3dpbmdDYWxlbmRhcklucHV0cyhldmVudC50YXJnZXQsIHNlbGYuZnJhbWVCb2R5KTtcclxuXHJcblx0XHRcdGlmIChldmVudC50YXJnZXQpIHtcclxuXHRcdFx0XHRpZiAoIWlzUHJldmlldyAmJiAhJCgnI2F0dHJpYnV0ZS1zZXR0aW5ncycpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG5cdFx0XHRcdFx0JCgnI2F0dHJpYnV0ZS1zZXR0aW5ncycpXHJcblx0XHRcdFx0XHRcdC5hZGRDbGFzcygnYWN0aXZlJylcclxuXHRcdFx0XHRcdFx0LnNpYmxpbmdzKClcclxuXHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdCQoJyNsZWZ0LXBhbmVsJykuaGlkZSgpO1xyXG5cdFx0XHRcdFx0JCgnI3JpZ2h0LXBhbmVsJykuc2hvdygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzZWxmLnNlbGVjdE5vZGUoZXZlbnQudGFyZ2V0KTtcclxuXHRcdFx0XHRzZWxmLmxvYWROb2RlQ29tcG9uZW50KGV2ZW50LnRhcmdldCk7XHJcblxyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmZyYW1lQm9keS5rZXlkb3duKGUgPT4ge1xyXG5cdFx0XHRpZiAoc2VsZi5zZWxlY3RlZEVsICYmIHNlbGYuc2VsZWN0ZWRFbC5wcm9wKCd0YWdOYW1lJykgIT0gJ0JPRFknKSB7XHJcblx0XHRcdFx0aWYgKGUud2hpY2ggPT0gMzcgfHwgZS53aGljaCA9PSAzOCB8fCBlLndoaWNoID09IDM5IHx8IGUud2hpY2ggPT0gNDApIHtcclxuXHRcdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpZnJhbWVJZCcpLmNvbnRlbnRXaW5kb3cuYXJyb3dLZXlNb3ZlKGUud2hpY2gsIHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgdGhlIGRlZmF1bHQgYWN0aW9uIChzY3JvbGwgLyBtb3ZlIGNhcmV0KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNkcmFnLWJveFwiKS5vbihcIm1vdXNlZG93blwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cdFx0XHRzZWxmLmRyYWdFbGVtZW50ID0gc2VsZi5zZWxlY3RlZEVsO1xyXG5cdFx0XHRzZWxmLmlzRHJhZ2dpbmcgPSB0cnVlO1xyXG5cclxuXHRcdFx0bm9kZSA9IHNlbGYuZHJhZ0VsZW1lbnQuZ2V0KDApO1xyXG5cclxuXHJcblx0XHRcdHNlbGYuZHJhZ01vdmVNdXRhdGlvbiA9IHtcclxuXHRcdFx0XHR0eXBlOiAnbW92ZScsXHJcblx0XHRcdFx0dGFyZ2V0OiBub2RlLFxyXG5cdFx0XHRcdG9sZFBhcmVudDogbm9kZS5wYXJlbnROb2RlLFxyXG5cdFx0XHRcdG9sZE5leHRTaWJsaW5nOiBub2RlLm5leHRTaWJsaW5nXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQvL3NlbGYuc2VsZWN0Tm9kZShmYWxzZSk7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjZG93bi1ib3hcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cclxuXHRcdFx0bm9kZSA9IHNlbGYuc2VsZWN0ZWRFbC5nZXQoMCk7XHJcblx0XHRcdG9sZFBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0b2xkTmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0bmV4dCA9IHNlbGYuc2VsZWN0ZWRFbC5uZXh0KCk7XHJcblxyXG5cdFx0XHRpZiAobmV4dC5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0bmV4dC5hZnRlcihzZWxmLnNlbGVjdGVkRWwpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHNlbGYuc2VsZWN0ZWRFbC5wYXJlbnQoKS5hZnRlcihzZWxmLnNlbGVjdGVkRWwpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRuZXdQYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdG5ld05leHRTaWJsaW5nID0gbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdHR5cGU6ICdtb3ZlJyxcclxuXHRcdFx0XHR0YXJnZXQ6IG5vZGUsXHJcblx0XHRcdFx0b2xkUGFyZW50OiBvbGRQYXJlbnQsXHJcblx0XHRcdFx0bmV3UGFyZW50OiBuZXdQYXJlbnQsXHJcblx0XHRcdFx0b2xkTmV4dFNpYmxpbmc6IG9sZE5leHRTaWJsaW5nLFxyXG5cdFx0XHRcdG5ld05leHRTaWJsaW5nOiBuZXdOZXh0U2libGluZ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjdXAtYm94XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmhpZGUoKTtcclxuXHJcblx0XHRcdG5vZGUgPSBzZWxmLnNlbGVjdGVkRWwuZ2V0KDApO1xyXG5cdFx0XHRvbGRQYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdG9sZE5leHRTaWJsaW5nID0gbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRcdG5leHQgPSBzZWxmLnNlbGVjdGVkRWwucHJldigpO1xyXG5cclxuXHRcdFx0aWYgKG5leHQubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdG5leHQuYmVmb3JlKHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c2VsZi5zZWxlY3RlZEVsLnBhcmVudCgpLmJlZm9yZShzZWxmLnNlbGVjdGVkRWwpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRuZXdQYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdG5ld05leHRTaWJsaW5nID0gbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdHR5cGU6ICdtb3ZlJyxcclxuXHRcdFx0XHR0YXJnZXQ6IG5vZGUsXHJcblx0XHRcdFx0b2xkUGFyZW50OiBvbGRQYXJlbnQsXHJcblx0XHRcdFx0bmV3UGFyZW50OiBuZXdQYXJlbnQsXHJcblx0XHRcdFx0b2xkTmV4dFNpYmxpbmc6IG9sZE5leHRTaWJsaW5nLFxyXG5cdFx0XHRcdG5ld05leHRTaWJsaW5nOiBuZXdOZXh0U2libGluZ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjY2xvbmUtYm94XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGNsb25lID0gc2VsZi5zZWxlY3RlZEVsLmNsb25lKCk7XHJcblxyXG5cdFx0XHRzZWxmLnNlbGVjdGVkRWwuYWZ0ZXIoY2xvbmUpO1xyXG5cclxuXHRcdFx0c2VsZi5zZWxlY3RlZEVsID0gY2xvbmUuY2xpY2soKTtcclxuXHJcblx0XHRcdG5vZGUgPSBjbG9uZS5nZXQoMCk7XHJcblx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdHR5cGU6ICdjaGlsZExpc3QnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZS5wYXJlbnROb2RlLFxyXG5cdFx0XHRcdGFkZGVkTm9kZXM6IFtub2RlXSxcclxuXHRcdFx0XHRuZXh0U2libGluZzogbm9kZS5uZXh0U2libGluZ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjcGFyZW50LWJveFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuXHRcdFx0bm9kZSA9IHNlbGYuc2VsZWN0ZWRFbC5wYXJlbnQoKS5nZXQoMCk7XHJcblxyXG5cdFx0XHRzZWxmLnNlbGVjdE5vZGUobm9kZSk7XHJcblx0XHRcdHNlbGYubG9hZE5vZGVDb21wb25lbnQobm9kZSk7XHJcblxyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI2RlbGV0ZS1ib3hcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cclxuXHRcdFx0bm9kZSA9IHNlbGYuc2VsZWN0ZWRFbC5nZXQoMCk7XHJcblxyXG5cdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0XHR0eXBlOiAnY2hpbGRMaXN0JyxcclxuXHRcdFx0XHR0YXJnZXQ6IG5vZGUucGFyZW50Tm9kZSxcclxuXHRcdFx0XHRyZW1vdmVkTm9kZXM6IFtub2RlXSxcclxuXHRcdFx0XHRuZXh0U2libGluZzogbm9kZS5uZXh0U2libGluZ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHNlbGYuc2VsZWN0ZWRFbC5yZW1vdmUoKTtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGpRdWVyeSh3aW5kb3cuRnJhbWVXaW5kb3cpLm9uKFwic2Nyb2xsIHJlc2l6ZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcblx0XHRcdGlmIChzZWxmLnNlbGVjdGVkRWwpIHtcclxuXHRcdFx0XHRvZmZzZXQgPSBzZWxmLnNlbGVjdGVkRWwub2Zmc2V0KCk7XHJcblxyXG5cdFx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmNzcyhcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJ0b3BcIjogb2Zmc2V0LnRvcCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsVG9wKCksXHJcblx0XHRcdFx0XHRcdFwibGVmdFwiOiBvZmZzZXQubGVmdCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsTGVmdCgpLFxyXG5cdFx0XHRcdFx0XHRcIndpZHRoXCI6IHNlbGYuc2VsZWN0ZWRFbC5vdXRlcldpZHRoKCksXHJcblx0XHRcdFx0XHRcdFwiaGVpZ2h0XCI6IHNlbGYuc2VsZWN0ZWRFbC5vdXRlckhlaWdodCgpLFxyXG5cdFx0XHRcdFx0XHQvL1wiZGlzcGxheVwiOiBcImJsb2NrXCJcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHNlbGYuaGlnaGxpZ2h0RWwpIHtcclxuXHRcdFx0XHRvZmZzZXQgPSBzZWxmLmhpZ2hsaWdodEVsLm9mZnNldCgpO1xyXG5cclxuXHRcdFx0XHRqUXVlcnkoXCIjaGlnaGxpZ2h0LWJveFwiKS5jc3MoXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFwidG9wXCI6IG9mZnNldC50b3AgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbFRvcCgpLFxyXG5cdFx0XHRcdFx0XHRcImxlZnRcIjogb2Zmc2V0LmxlZnQgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbExlZnQoKSxcclxuXHRcdFx0XHRcdFx0XCJ3aWR0aFwiOiBzZWxmLmhpZ2hsaWdodEVsLm91dGVyV2lkdGgoKSxcclxuXHRcdFx0XHRcdFx0XCJoZWlnaHRcIjogc2VsZi5oaWdobGlnaHRFbC5vdXRlckhlaWdodCgpLFxyXG5cdFx0XHRcdFx0XHQvL1wiZGlzcGxheVwiOiBcImJsb2NrXCJcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0fSxcclxuXHJcblx0LyogZHJhZyBhbmQgZHJvcCAqL1xyXG5cdF9pbml0RHJhZ2Ryb3A6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRzZWxmLmlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHRcdGNvbXBvbmVudCA9IHt9O1xyXG5cdFx0JCgnI2NvbXBvbmVudHMgdWwgPiBsaSA+IG9sID4gbGknKS5vbihcIm1vdXNlZG93biB0b3VjaHN0YXJ0XCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHQkdGhpcyA9IGpRdWVyeSh0aGlzKTtcclxuXHJcblx0XHRcdC8vICQoXCIjY29tcG9uZW50LWNsb25lXCIpLnJlbW92ZSgpO1xyXG5cdFx0XHRjb21wb25lbnQgPSBWdnZlYi5Db21wb25lbnRzLmdldCgkdGhpcy5kYXRhKFwidHlwZVwiKSk7XHJcblxyXG5cdFx0XHRpZiAoY29tcG9uZW50LmRyYWdIdG1sKSB7XHJcblx0XHRcdFx0aHRtbCA9IGNvbXBvbmVudC5kcmFnSHRtbDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRodG1sID0gY29tcG9uZW50Lmh0bWw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQgPSAkKGh0bWwpO1xyXG5cclxuXHRcdFx0aWYgKGNvbXBvbmVudC5kcmFnU3RhcnQpIHNlbGYuZHJhZ0VsZW1lbnQgPSBjb21wb25lbnQuZHJhZ1N0YXJ0KHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cclxuXHRcdFx0c2VsZi5pc0RyYWdnaW5nID0gdHJ1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHQkKCdib2R5Jykub24oJ21vdXNldXAgdG91Y2hlbmQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0aWYgKHNlbGYuaXNEcmFnZ2luZyA9PSB0cnVlKSB7XHJcblx0XHRcdFx0c2VsZi5pc0RyYWdnaW5nID0gZmFsc2U7XHJcblx0XHRcdFx0Ly8gJChcIiNjb21wb25lbnQtY2xvbmVcIikucmVtb3ZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJ2JvZHknKS5vbignbW91c2Vtb3ZlIHRvdWNobW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRpZiAoc2VsZi5pc0RyYWdnaW5nID09IHRydWUpIHtcclxuXHRcdFx0XHRlbGVtZW50TW91c2VJc092ZXIgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFggLSA2MCwgZXZlbnQuY2xpZW50WSAtIDQwKTtcclxuXHRcdFx0XHQvL2lmIGRyYWcgZWxlbWVudHMgaG92ZXJzIG92ZXIgaWZyYW1lIHN3aXRjaCB0byBpZnJhbWUgbW91c2VvdmVyIGhhbmRsZXJcdFxyXG5cdFx0XHRcdGlmIChlbGVtZW50TW91c2VJc092ZXIgJiYgZWxlbWVudE1vdXNlSXNPdmVyLnRhZ05hbWUgPT0gJ0lGUkFNRScpIHtcclxuXHRcdFx0XHRcdHNlbGYuZnJhbWVCb2R5LnRyaWdnZXIoXCJtb3VzZW1vdmVcIiwgZXZlbnQpO1xyXG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0XHRzZWxmLnNlbGVjdE5vZGUoZmFsc2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnI2NvbXBvbmVudHMgdWwgPiBvbCA+IGxpID4gbGknKS5vbihcIm1vdXNldXAgdG91Y2hlbmRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdHNlbGYuaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cdFx0XHQvLyAkKFwiI2NvbXBvbmVudC1jbG9uZVwiKS5yZW1vdmUoKTtcclxuXHRcdH0pO1xyXG5cclxuXHR9LFxyXG5cclxuXHRnZXRCZWF1dGlmaWVkSHRtbCgpIHtcclxuXHRcdC8qXHJcblx0XHQtSSwgLS1pbmRlbnQtaW5uZXItaHRtbCAgICAgICAgICAgIEluZGVudCA8aGVhZD4gYW5kIDxib2R5PiBzZWN0aW9ucy4gRGVmYXVsdCBpcyBmYWxzZS5cclxuXHRcdC1VLCAtLXVuZm9ybWF0dGVkICAgICAgICAgICAgICAgICAgTGlzdCBvZiB0YWdzIChkZWZhdWx0cyB0byBpbmxpbmUpIHRoYXQgc2hvdWxkIG5vdCBiZSByZWZvcm1hdHRlZFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAgIHVzZSBlbXB0eSBhcnJheSB0byBkZW5vdGUgdGhhdCBubyB0YWdzIHNob3VsZCBub3QgYmUgcmVmb3JtYXR0ZWRcclxuXHRcdCAqL1xyXG5cclxuXHRcdGNvbnN0IHsgZG9jdHlwZSwgaHRtbCB9ID0gdGhpcy5nZXRIdG1sKCk7XHJcblx0XHRyZXR1cm4gaHRtbF9iZWF1dGlmeShgJHtkb2N0eXBlfVxyXG5cdFx0XHRcdFx0XHRcdCAgJHtodG1sR2VuZXJhdG9yKGh0bWwsIHJlbW92ZVVudXNlZFRhZ3MsIGVtcHR5Q2hpbGRyZW4sXHJcblx0XHRcdFx0Z2VuZXJhdGVUYWJsZVNjcmlwdCwgZ2VuZXJhdGVDYWxlbmRhck9uY2xpY2tBdHRyKX1gLFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0cHJlc2VydmVfbmV3bGluZXM6IGZhbHNlLFxyXG5cdFx0XHRcdGluZGVudF9pbm5lcl9odG1sOiB0cnVlLFxyXG5cdFx0XHRcdHVuZm9ybWF0dGVkOiBbXVxyXG5cdFx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRnZXRIdG1sOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRkb2MgPSB3aW5kb3cuRnJhbWVEb2N1bWVudDtcclxuXHRcdGNvbnN0IGRvY3R5cGUgPSBcIjwhRE9DVFlQRSBcIlxyXG5cdFx0XHQrIGRvYy5kb2N0eXBlLm5hbWVcclxuXHRcdFx0KyAoZG9jLmRvY3R5cGUucHVibGljSWQgPyAnIFBVQkxJQyBcIicgKyBkb2MuZG9jdHlwZS5wdWJsaWNJZCArICdcIicgOiAnJylcclxuXHRcdFx0KyAoIWRvYy5kb2N0eXBlLnB1YmxpY0lkICYmIGRvYy5kb2N0eXBlLnN5c3RlbUlkID8gJyBTWVNURU0nIDogJycpXHJcblx0XHRcdCsgKGRvYy5kb2N0eXBlLnN5c3RlbUlkID8gJyBcIicgKyBkb2MuZG9jdHlwZS5zeXN0ZW1JZCArICdcIicgOiAnJylcclxuXHRcdFx0KyBcIj5cXG5cIjtcclxuXHRcdGNvbnN0IGh0bWwgPSBgJHtkb2N0eXBlfVxyXG5cdFx0XHRcdFx0ICA8aHRtbD5cclxuXHRcdFx0XHRcdFx0ICAke2RvYy5kb2N1bWVudEVsZW1lbnQuaW5uZXJIVE1MfVxyXG5cdFx0XHRcdFx0ICA8L2h0bWw+YDtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGRvY3R5cGUsXHJcblx0XHRcdGh0bWxcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0c2V0SHRtbDogZnVuY3Rpb24gKGh0bWwpIHtcclxuXHRcdC8vdXBkYXRlIG9ubHkgYm9keSB0byBhdm9pZCBicmVha2luZyBpZnJhbWUgY3NzL2pzIHJlbGF0aXZlIHBhdGhzXHJcblx0XHRzdGFydCA9IGh0bWwuaW5kZXhPZihcIjxib2R5XCIpO1xyXG5cdFx0ZW5kID0gaHRtbC5pbmRleE9mKFwiPC9ib2R5XCIpO1xyXG5cclxuXHRcdGlmIChzdGFydCA+PSAwICYmIGVuZCA+PSAwKSB7XHJcblx0XHRcdGJvZHkgPSBodG1sLnNsaWNlKGh0bWwuaW5kZXhPZihcIj5cIiwgc3RhcnQpICsgMSwgZW5kKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGJvZHkgPSBodG1sXHJcblx0XHR9XHJcblxyXG5cdFx0Ly9zZWxmLmZyYW1lQm9keS5odG1sKGJvZHkpO1xyXG5cdFx0d2luZG93LkZyYW1lRG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBib2R5O1xyXG5cclxuXHRcdC8vYmVsb3cgbWV0aG9kcyBicmFrZSBkb2N1bWVudCByZWxhdGl2ZSBjc3MgYW5kIGpzIHBhdGhzXHJcblx0XHQvL3JldHVybiBzZWxmLmlmcmFtZS5vdXRlckhUTUwgPSBodG1sO1xyXG5cdFx0Ly9yZXR1cm4gc2VsZi5kb2N1bWVudEZyYW1lLmh0bWwoaHRtbCk7XHJcblx0XHQvL3JldHVybiBzZWxmLmRvY3VtZW50RnJhbWUuYXR0cihcInNyY2RvY1wiLCBodG1sKTtcclxuXHR9XHJcbn07XHJcblxyXG5WdnZlYi5Db2RlRWRpdG9yID0ge1xyXG5cclxuXHRpc0FjdGl2ZTogZmFsc2UsXHJcblx0b2xkVmFsdWU6ICcnLFxyXG5cdGRvYzogZmFsc2UsXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkb2MpIHtcclxuXHRcdCQoXCIjdnZ2ZWItY29kZS1lZGl0b3IgdGV4dGFyZWFcIikudmFsKFZ2dmViLkJ1aWxkZXIuZ2V0QmVhdXRpZmllZEh0bWwoKSk7XHJcblxyXG5cdFx0JChcIiN2dnZlYi1jb2RlLWVkaXRvciB0ZXh0YXJlYVwiKS5rZXl1cChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGRlbGF5KFZ2dmViLkJ1aWxkZXIuc2V0SHRtbCh0aGlzLnZhbHVlKSwgMTAwMCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvL2xvYWQgY29kZSBvbiBkb2N1bWVudCBjaGFuZ2VzXHJcblx0XHRWdnZlYi5CdWlsZGVyLmZyYW1lQm9keS5vbihcInZ2dmViLnVuZG8uYWRkIHZ2dmViLnVuZG8ucmVzdG9yZVwiLCBmdW5jdGlvbiAoZSkgeyBWdnZlYi5Db2RlRWRpdG9yLnNldFZhbHVlKCk7IH0pO1xyXG5cdFx0Ly9sb2FkIGNvZGUgd2hlbiBhIG5ldyB1cmwgaXMgbG9hZGVkXHJcblx0XHRWdnZlYi5CdWlsZGVyLmRvY3VtZW50RnJhbWUub24oXCJsb2FkXCIsIGZ1bmN0aW9uIChlKSB7IFZ2dmViLkNvZGVFZGl0b3Iuc2V0VmFsdWUoKTsgfSk7XHJcblxyXG5cdFx0dGhpcy5pc0FjdGl2ZSA9IHRydWU7XHJcblx0fSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0aWYgKHRoaXMuaXNBY3RpdmUpIHtcclxuXHRcdFx0JChcIiN2dnZlYi1jb2RlLWVkaXRvciB0ZXh0YXJlYVwiKS52YWwoVnZ2ZWIuQnVpbGRlci5nZXRCZWF1dGlmaWVkSHRtbCgpKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRkZXN0cm95OiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0Ly90aGlzLmlzQWN0aXZlID0gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0dG9nZ2xlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodGhpcy5pc0FjdGl2ZSAhPSB0cnVlKSB7XHJcblx0XHRcdHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5pbml0KCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmlzQWN0aXZlID0gZmFsc2U7XHJcblx0XHR0aGlzLmRlc3Ryb3koKTtcclxuXHR9XHJcbn1cclxuXHJcbmxldCBzaG93blBhbmVsLCBoaWRkZW5QYW5lbCwgaXNQcmV2aWV3O1xyXG5cclxuVnZ2ZWIuR3VpID0ge1xyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKFwiW2RhdGEtdnZ2ZWItYWN0aW9uXVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0b24gPSBcImNsaWNrXCI7XHJcblx0XHRcdGlmICh0aGlzLmRhdGFzZXQudnZ2ZWJPbikgb24gPSB0aGlzLmRhdGFzZXQudnZ2ZWJPbjtcclxuXHJcblx0XHRcdCQodGhpcykub24ob24sIFZ2dmViLkd1aVt0aGlzLmRhdGFzZXQudnZ2ZWJBY3Rpb25dKTtcclxuXHRcdFx0aWYgKHRoaXMuZGF0YXNldC52dnZlYlNob3J0Y3V0KSB7XHJcblx0XHRcdFx0JChkb2N1bWVudCkuYmluZCgna2V5ZG93bicsIHRoaXMuZGF0YXNldC52dnZlYlNob3J0Y3V0LCBWdnZlYi5HdWlbdGhpcy5kYXRhc2V0LnZ2dmViQWN0aW9uXSk7XHJcblx0XHRcdFx0JCh3aW5kb3cuRnJhbWVEb2N1bWVudCwgd2luZG93LkZyYW1lV2luZG93KS5iaW5kKCdrZXlkb3duJywgdGhpcy5kYXRhc2V0LnZ2dmViU2hvcnRjdXQsIFZ2dmViLkd1aVt0aGlzLmRhdGFzZXQudnZ2ZWJBY3Rpb25dKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0dW5kbzogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKFZ2dmViLld5c2l3eWdFZGl0b3IuaXNBY3RpdmUpIHtcclxuXHRcdFx0VnZ2ZWIuV3lzaXd5Z0VkaXRvci51bmRvKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRWdnZlYi5VbmRvLnVuZG8oKTtcclxuXHRcdH1cclxuXHRcdFZ2dmViLkJ1aWxkZXIuc2VsZWN0Tm9kZSgpO1xyXG5cdH0sXHJcblxyXG5cdHJlZG86IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmIChWdnZlYi5XeXNpd3lnRWRpdG9yLmlzQWN0aXZlKSB7XHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IucmVkbygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0VnZ2ZWIuVW5kby5yZWRvKCk7XHJcblx0XHR9XHJcblx0XHRWdnZlYi5CdWlsZGVyLnNlbGVjdE5vZGUoKTtcclxuXHR9LFxyXG5cclxuXHRjaGVjazogZnVuY3Rpb24gKCkge1xyXG5cdFx0JCgnI3RleHRhcmVhLW1vZGFsIHRleHRhcmVhJykudmFsKFZ2dmViLkJ1aWxkZXIuZ2V0QmVhdXRpZmllZEh0bWwoKSk7XHJcblx0XHQkKCcjdGV4dGFyZWEtbW9kYWwnKS5tb2RhbCgpO1xyXG5cdH0sXHJcblxyXG5cdHZpZXdwb3J0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKFwiI2NhbnZhc1wiKS5hdHRyKFwiY2xhc3NcIiwgdGhpcy5kYXRhc2V0LnZpZXcpO1xyXG5cdH0sXHJcblxyXG5cdHRvZ2dsZUVkaXRvcjogZnVuY3Rpb24gKCkge1xyXG5cdFx0JChcIiN2dnZlYi1idWlsZGVyXCIpLnRvZ2dsZUNsYXNzKFwiYm90dG9tLXBhbmVsLWV4cGFuZFwiKTtcclxuXHRcdFZ2dmViLkNvZGVFZGl0b3IudG9nZ2xlKCk7XHJcblx0fSxcclxuXHJcblx0ZG93bmxvYWQoKSB7XHJcblx0XHRkb3dubG9hZEFzVGV4dEZpbGUoJ2luZGV4JywgVnZ2ZWIuQnVpbGRlci5nZXRCZWF1dGlmaWVkSHRtbCgpKTtcclxuXHR9LFxyXG5cclxuXHRwcmV2aWV3OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoJCgnI2xlZnQtcGFuZWwnKS5pcygnOnZpc2libGUnKSkge1xyXG5cdFx0XHRzaG93blBhbmVsID0gJ2xlZnQtcGFuZWwnO1xyXG5cdFx0XHRoaWRkZW5QYW5lbCA9ICdyaWdodC1wYW5lbCc7XHJcblx0XHRcdCQoJyNsZWZ0LXBhbmVsLCAjcmlnaHQtcGFuZWwnKS5oaWRlKCk7XHJcblx0XHRcdGlzUHJldmlldyA9IHRydWU7XHJcblx0XHR9IGVsc2UgaWYgKCQoJyNyaWdodC1wYW5lbCcpLmlzKCc6dmlzaWJsZScpKSB7XHJcblx0XHRcdHNob3duUGFuZWwgPSAncmlnaHQtcGFuZWwnO1xyXG5cdFx0XHRoaWRkZW5QYW5lbCA9ICdsZWZ0LXBhbmVsJztcclxuXHRcdFx0JCgnI2xlZnQtcGFuZWwsICNyaWdodC1wYW5lbCcpLmhpZGUoKTtcclxuXHRcdFx0aXNQcmV2aWV3ID0gdHJ1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlzUHJldmlldyA9IGZhbHNlO1xyXG5cdFx0XHQkKGAjJHtzaG93blBhbmVsfWApLnNob3coKTtcclxuXHRcdFx0JChgIyR7aGlkZGVuUGFuZWx9YCkuaGlkZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdCQoJyNtZW51LXBhbmVsJykudG9nZ2xlKCk7XHJcblx0XHQkKFwiI2lmcmFtZS1sYXllclwiKS50b2dnbGUoKTtcclxuXHRcdCQoXCIjdnZ2ZWItYnVpbGRlclwiKS50b2dnbGVDbGFzcyhcInByZXZpZXdcIik7XHJcblx0fSxcclxuXHJcblx0ZnVsbHNjcmVlbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0bGF1bmNoRnVsbFNjcmVlbihkb2N1bWVudCk7IC8vIHRoZSB3aG9sZSBwYWdlXHJcblx0fSxcclxuXHJcblx0Y29tcG9uZW50U2VhcmNoOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRzZWFyY2hUZXh0ID0gdGhpcy52YWx1ZTtcclxuXHJcblx0XHQkKFwiI2NvbXBvbmVudHMtbGlzdCBsaSBvbCBsaVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0JHRoaXMgPSAkKHRoaXMpO1xyXG5cclxuXHRcdFx0JHRoaXMuaGlkZSgpO1xyXG5cdFx0XHRpZiAoJHRoaXMuZGF0YShcInNlYXJjaFwiKS5pbmRleE9mKHNlYXJjaFRleHQpID4gLTEpICR0aGlzLnNob3coKTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdGNsZWFyQ29tcG9uZW50U2VhcmNoOiBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKFwiI2NvbXBvbmVudC1zZWFyY2hcIikudmFsKFwiXCIpLmtleXVwKCk7XHJcblx0fVxyXG59XHJcblxyXG5WdnZlYi5GaWxlTWFuYWdlciA9IHtcclxuXHR0cmVlOiBmYWxzZSxcclxuXHRwYWdlczoge30sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMudHJlZSA9ICQoXCIjZmlsZW1hbmFnZXIgLnRyZWUgPiBvbFwiKS5odG1sKFwiXCIpO1xyXG5cclxuXHRcdCQodGhpcy50cmVlKS5vbihcImNsaWNrXCIsIFwibGlbZGF0YS1wYWdlXSBzcGFuXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCMkeyQodGhpcykucGFyZW50cygnbGknKS5kYXRhKCdwYWdlJyl9YDtcclxuXHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cdFx0XHQvLyBWdnZlYi5GaWxlTWFuYWdlci5sb2FkUGFnZSgkKHRoaXMpLnBhcmVudHMoXCJsaVwiKS5kYXRhKFwicGFnZVwiKSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pXHJcblx0fSxcclxuXHJcblx0Z2V0UGFnZShuYW1lKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wYWdlc1tuYW1lXTtcclxuXHR9LFxyXG5cclxuXHRhZGRQYWdlOiBmdW5jdGlvbiAobmFtZSwgdGl0bGUsIHVybCkge1xyXG5cclxuXHRcdHRoaXMucGFnZXNbbmFtZV0gPSB7XHJcblx0XHRcdG5hbWUsXHJcblx0XHRcdHRpdGxlLFxyXG5cdFx0XHR1cmxcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy50cmVlLmFwcGVuZChcclxuXHRcdFx0dG1wbChcInZ2dmViLWZpbGVtYW5hZ2VyLXBhZ2VcIiwgeyBuYW1lLCB0aXRsZSwgdXJsIH0pKTtcclxuXHR9LFxyXG5cclxuXHRhZGRQYWdlczogZnVuY3Rpb24gKHBhZ2VzKSB7XHJcblx0XHRmb3IgKHBhZ2UgaW4gcGFnZXMpIHtcclxuXHRcdFx0dGhpcy5hZGRQYWdlKHBhZ2VzW3BhZ2VdWyduYW1lJ10sIHBhZ2VzW3BhZ2VdWyd0aXRsZSddLCBwYWdlc1twYWdlXVsndXJsJ10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGFkZENvbXBvbmVudDogZnVuY3Rpb24gKG5hbWUsIHVybCwgdGl0bGUsIHBhZ2UpIHtcclxuXHRcdCQoXCJbZGF0YS1wYWdlPSdcIiArIHBhZ2UgKyBcIiddID4gb2xcIiwgdGhpcy50cmVlKS5hcHBlbmQoXHJcblx0XHRcdHRtcGwoXCJ2dnZlYi1maWxlbWFuYWdlci1jb21wb25lbnRcIiwgeyBuYW1lLCB1cmwsIHRpdGxlIH0pKTtcclxuXHR9LFxyXG5cclxuXHRzaG93QWN0aXZlKG5hbWUpIHtcclxuXHRcdCQoXCJbZGF0YS1wYWdlXVwiLCB0aGlzLnRyZWUpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0JChcIltkYXRhLXBhZ2U9J1wiICsgbmFtZSArIFwiJ11cIiwgdGhpcy50cmVlKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHR9LFxyXG5cclxuXHRsb2FkUGFnZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuXHRcdCQoXCJbZGF0YS1wYWdlXVwiLCB0aGlzLnRyZWUpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0JChcIltkYXRhLXBhZ2U9J1wiICsgbmFtZSArIFwiJ11cIiwgdGhpcy50cmVlKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHJcblx0XHRWdnZlYi5CdWlsZGVyLmxvYWRVcmwodGhpcy5wYWdlc1tuYW1lXVsndXJsJ10pO1xyXG5cdH0sXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWdnZlYjsiLCJpbXBvcnQgdW51c2VkVGFncyBmcm9tICcuL3VudXNlZFRhZ3MnO1xyXG5pbXBvcnQgeyBlbXB0eUNoaWxkcmVuU2VsZWN0b3JzLCB0YWJsZVNlbGVjdG9yIH0gZnJvbSAnLi9lbXB0eUNoaWxkcmVuU2VsZWN0b3JzJztcclxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy90YWJsZSc7XHJcbmltcG9ydCB0YWJsZSBmcm9tICcuLi9jb21wb25lbnRzL0BvZWUvdGFibGUnO1xyXG5pbXBvcnQgeyBjYWxlbmRhclNlbGVjdG9yLCBzZXRPbmNsaWNrQXR0ciB9IGZyb20gJy4vY2FsZW5kYXInO1xyXG5cclxuY29uc3QgYWx3YXlzVHJ1ZSA9ICgpID0+IHRydWU7XHJcblxyXG4vLyB0aGlzIHJlZmVycyB0byBodG1sIGVsZW1lbnRcclxuZnVuY3Rpb24gcmVtb3ZlVGFnKHsgbmFtZSwgZmlsdGVyID0gYWx3YXlzVHJ1ZSB9KSB7XHJcbiAgICBBcnJheS5mcm9tKHRoaXMuZ2V0RWxlbWVudHNCeVRhZ05hbWUobmFtZSkpXHJcbiAgICAgICAgLmZpbHRlcihmaWx0ZXIpXHJcbiAgICAgICAgLmZvckVhY2godGFnID0+IHRhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhZykpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVVbnVzZWRUYWdzKGVsKSB7XHJcbiAgICB1bnVzZWRUYWdzLmZvckVhY2gocmVtb3ZlVGFnLCBlbCk7XHJcbiAgICByZXR1cm4gZWw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVtcHR5Q2hpbGRyZW4oZWwpIHtcclxuICAgICQoZWwpLmZpbmQoZW1wdHlDaGlsZHJlblNlbGVjdG9ycy5qb2luKCcsICcpKS5lbXB0eSgpO1xyXG4gICAgcmV0dXJuIGVsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZVRhYmxlU2NyaXB0KGVsKSB7XHJcbiAgICBjb25zdCBqc1N0ciA9IEFycmF5LmZyb20oJChlbCkuZmluZCh0YWJsZVNlbGVjdG9yKSkucmVkdWNlKChwcmV2LCBlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGAke3ByZXZ9XHJcbiAgICAgICAgICAgICAgICAke3RlbXBsYXRlKCQoZWxlbWVudCksIHRhYmxlKX1gO1xyXG4gICAgfSwgJycpO1xyXG4gICAgJCgnPHNjcmlwdD48L3NjcmlwdD4nKS50ZXh0KGpzU3RyKS5hcHBlbmRUbygkKGVsKS5maW5kKCdib2R5JykpO1xyXG4gICAgcmV0dXJuIGVsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZUNhbGVuZGFyT25jbGlja0F0dHIoZWwpIHtcclxuICAgICQoZWwpLmZpbmQoY2FsZW5kYXJTZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5hdHRyKCdvbmNsaWNrJykgfHwgc2V0T25jbGlja0F0dHIodGhpcyk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBlbDtcclxufVxyXG5cclxuZXhwb3J0IHsgcmVtb3ZlVW51c2VkVGFncywgZW1wdHlDaGlsZHJlbiwgZ2VuZXJhdGVUYWJsZVNjcmlwdCwgZ2VuZXJhdGVDYWxlbmRhck9uY2xpY2tBdHRyIH07IiwiY29uc3QgdW51c2VkVGFncyA9IFtcclxuXHR7XHJcblx0XHRuYW1lOiAnc2NyaXB0JyxcclxuXHRcdGZpbHRlcjogdGFnID0+IHRhZy5nZXRBdHRyaWJ1dGUoJ3NyYycpXHJcblx0XHRcdCYmIHRhZy5nZXRBdHRyaWJ1dGUoJ3NyYycpLmluY2x1ZGVzKCdpZnJhbWUtZHJhZy1uLWRyb3AnKVxyXG5cdH0sXHJcblx0e1xyXG5cdFx0bmFtZTogJ2xpbmsnLFxyXG5cdFx0ZmlsdGVyOiB0YWcgPT4gdGFnLmdldEF0dHJpYnV0ZSgncmVsJykgPT0gJ3N0eWxlc2hlZXQnXHJcblx0XHRcdCYmIHRhZy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5pbmNsdWRlcygnZHJhZy1uLWRyb3AnKVxyXG5cdH0sXHJcblx0e1xyXG5cdFx0bmFtZTogJ2hyJyxcclxuXHRcdGZpbHRlcjogdGFnID0+ICQodGFnKS5oYXNDbGFzcygnaG9yaXpvbnRhbC1saW5lJylcclxuXHRcdFx0fHwgJCh0YWcpLmhhc0NsYXNzKCd2ZXJ0aWNhbC1saW5lJylcclxuXHR9XHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1bnVzZWRUYWdzOyIsImltcG9ydCB7IGRhdGFUYWJsZUlkIH0gZnJvbSAnLi4vY29tcG9uZW50cy9jb21tb24nO1xyXG5cclxuY29uc3QgdGFibGVTZWxlY3RvciA9IGBbJHtkYXRhVGFibGVJZH1dYDtcclxuY29uc3QgZW1wdHlDaGlsZHJlblNlbGVjdG9ycyA9IFt0YWJsZVNlbGVjdG9yXTtcclxuXHJcbmV4cG9ydCB7IGVtcHR5Q2hpbGRyZW5TZWxlY3RvcnMsIHRhYmxlU2VsZWN0b3IgfTsiLCJpbXBvcnQgeyBkYXRhVGFibGVJZCB9IGZyb20gXCIuLi9jb21wb25lbnRzL2NvbW1vblwiO1xyXG5cclxubGV0IGluZGV4ID0gMTtcclxuXHJcbmZ1bmN0aW9uIHRlbXBsYXRlKG5vZGUsIHRhYmxlKSB7XHJcbiAgICBjb25zdCBpZCA9IG5vZGUuYXR0cignaWQnKSB8fCAobm9kZS5hdHRyKCdpZCcsIGB0YWJsZSR7aW5kZXgrK31gKSwgbm9kZS5hdHRyKCdpZCcpKTtcclxuICAgIGNvbnN0IGtleSA9IG5vZGUuYXR0cihkYXRhVGFibGVJZCk7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgdmFyIGNvbHVtbkRlZnMke2tleX0gPSBbXHJcbiAgICAgICAgJHt0YWJsZS5nZXRUYWJsZShrZXkpLmNvbHVtbkRlZnMubWFwKGRlZiA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBge2hlYWRlck5hbWU6IFwiJHtkZWYuaGVhZGVyTmFtZX1cIiwgZmllbGQ6IFwiJHtkZWYuZmllbGR9XCJ9YDtcclxuICAgICAgICB9KS5qb2luKCcsJyl9XHJcbiAgICBdO1xyXG4gICAgdmFyIGdyaWRPcHRpb25zJHtrZXl9ID0ge1xyXG4gICAgICAgIGNvbHVtbkRlZnM6IGNvbHVtbkRlZnMke2tleX0sXHJcbiAgICAgICAgZW5hYmxlU29ydGluZzogZmFsc2UsXHJcbiAgICAgICAgZW5hYmxlRmlsdGVyOiBmYWxzZVxyXG4gICAgICB9O1xyXG4gICAgdmFyIGVHcmlkRGl2JHtrZXl9ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIyR7aWR9Jyk7XHJcbiAgICBuZXcgYWdHcmlkLkdyaWQoZUdyaWREaXYke2tleX0sIGdyaWRPcHRpb25zJHtrZXl9KTtcclxuICAgIGdyaWRPcHRpb25zJHtrZXl9LmFwaS5zZXRSb3dEYXRhKFtdKTtcclxuICAgIGA7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRlbXBsYXRlO1xyXG5cclxuIiwiaW1wb3J0IHsgQnV0dG9uSW5wdXQsIFRleHRWYWx1ZUlucHV0LCBTZWxlY3RJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBkYXRhQ29tcG9uZW50SWQsIGRhdGFUYWJsZUlkIH0gZnJvbSAnLi4vY29tbW9uJztcclxuaW1wb3J0IFZ2dmViIGZyb20gJy4uLy4uL2J1aWxkZXInO1xyXG5cclxuY29uc3QgdGFibGVzID0ge307XHJcbmxldCBpbmRleCA9IDE7XHJcbmZ1bmN0aW9uIHNldENvbHVtbkRlZnNBbmRSZW5kZXIobm9kZSwgY29sRGVmcykge1xyXG4gICAgLy8gQ2FsbCB0byBzZXQgbmV3IGNvbHVtbiBkZWZpbml0aW9ucyBpbnRvIHRoZSBncmlkLiBcclxuICAgIC8vIFRoZSBncmlkIHdpbGwgcmVkcmF3IGFsbCB0aGUgY29sdW1uIGhlYWRlcnMsIGFuZCB0aGVuIHJlZHJhdyBhbGwgb2YgdGhlIHJvd3MuXHJcbiAgICB0YWJsZXNbJChub2RlKS5hdHRyKGRhdGFUYWJsZUlkKV0uYXBpLnNldENvbHVtbkRlZnMoY29sRGVmcyk7XHJcbiAgICBWdnZlYi5Db21wb25lbnRzLnJlbmRlcihcImh0bWwvdGFibGVAb2VlXCIpO1xyXG59XHJcblxyXG5jb25zdCB0YWJsZSA9IHtcclxuICAgIG5vZGVzOiBbXCJ0YWJsZVwiXSxcclxuICAgIGNsYXNzZXM6IFtcInRhYmxlXCJdLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvdGFibGUuc3ZnXCIsXHJcbiAgICBuYW1lOiBcImFnLUdyaWRcIixcclxuICAgIGh0bWw6IGA8ZGl2ICR7ZGF0YUNvbXBvbmVudElkfT1cImh0bWwvdGFibGVAb2VlXCIgc3R5bGU9XCJ3aWR0aDogNTAwcHg7IGhlaWdodDogMjAwcHg7XCIgY2xhc3M9XCJkcm9wem9uZSBkcmFnZ2FibGUgYWctdGhlbWUtYmx1ZVwiPjwvZGl2PmAsXHJcbiAgICBnZXRUYWJsZShrZXkpIHtcclxuICAgICAgICByZXR1cm4gdGFibGVzW2tleV07XHJcbiAgICB9LFxyXG4gICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICBpZiAoISQobm9kZSkuYXR0cihkYXRhVGFibGVJZCkpIHtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSBpbmRleCsrO1xyXG4gICAgICAgICAgICAkKG5vZGUpLmF0dHIoZGF0YVRhYmxlSWQsIGlkKTtcclxuICAgICAgICAgICAgdGFibGVzW2lkXSA9IHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbkRlZnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IGhlYWRlck5hbWU6IFwiaGVhZGVyXCIsIGZpZWxkOiBcImZpbGVkXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGhlYWRlck5hbWU6IFwiaGVhZGVyXCIsIGZpZWxkOiBcImZpZWxkXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGhlYWRlck5hbWU6IFwiaGVhZGVyXCIsIGZpZWxkOiBcImZpZWxkXCIgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZVNvcnRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlRmlsdGVyOiBmYWxzZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBuZXcgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpZnJhbWVJZCcpLmNvbnRlbnRXaW5kb3cuYWdHcmlkKS5HcmlkKG5vZGUsIHRhYmxlc1tpZF0pO1xyXG4gICAgICAgICAgICB0YWJsZXNbaWRdLmFwaS5zZXRSb3dEYXRhKFtdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0YWJsZXNbJChub2RlKS5hdHRyKGRhdGFUYWJsZUlkKV0uY29sdW1uRGVmcy5yZWR1Y2UoKHByZXYsIGN1cikgPT4ge1xyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIHByZXYucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkhlYWRlciBcIiArIGksXHJcbiAgICAgICAgICAgICAgICBrZXk6IFwib3B0aW9uXCIgKyBpLFxyXG4gICAgICAgICAgICAgICAgLy9pbmRleDogaSAtIDEsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25Ob2RlOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgaW5wdXR0eXBlOiBUZXh0VmFsdWVJbnB1dCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ3RhYmxlaGVhZGVyQG9lZScsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyTmFtZTogY3VyLmhlYWRlck5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGN1ci5maWVsZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSwgdmFsdWUsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5SW5kZXggPSBwYXJzZUludCh0aGlzLmtleS5zdWJzdHIoJ29wdGlvbicubGVuZ3RoKSkgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xEZWZzID0gdGFibGVzWyQobm9kZSkuYXR0cihkYXRhVGFibGVJZCldLmNvbHVtbkRlZnM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Lm5vZGVOYW1lID09ICdCVVRUT04nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbERlZnMgPSBjb2xEZWZzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCh2YWx1ZSwgaW5kZXgpID0+IGluZGV4ICE9IGtleUluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVzWyQobm9kZSkuYXR0cihkYXRhVGFibGVJZCldLmNvbHVtbkRlZnMgPSBjb2xEZWZzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRDb2x1bW5EZWZzQW5kUmVuZGVyKG5vZGUsIGNvbERlZnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbERlZnNba2V5SW5kZXhdW2lucHV0Lm5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOmHjeaWsOa4suafk+S8muWkseWOu+i+k+WFpeahhueEpueCue+8jOWPqumcgOimgeeUqOaWsOeahGNvbERlZnPmm7TmlrDooajmoLzljbPlj6/vvIzlj7PkvqfnmoTpg6jliIbkuI3pnIDopoHph43mlrDmuLLmn5PjgIJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVzWyQobm9kZSkuYXR0cihkYXRhVGFibGVJZCldLmFwaS5zZXRDb2x1bW5EZWZzKGNvbERlZnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJldjtcclxuICAgICAgICB9LCBbXSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHRoaXMucHJvcGVydGllcy5maWx0ZXIocHJvcGVydHkgPT4gcHJvcGVydHkua2V5LmluZGV4T2YoXCJvcHRpb25cIikgPT09IC0xKTtcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMudW5zaGlmdCguLi5wcm9wZXJ0aWVzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9LFxyXG4gICAgcHJvcGVydGllczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJUaGVtZVwiLFxyXG4gICAgICAgICAgICBrZXk6IFwidGhlbWVcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFsnYWctdGhlbWUtYmFsaGFtLWRhcmsnLCAnYWctdGhlbWUtYmFsaGFtJywgJ2FnLXRoZW1lLWJsdWUnLCAnYWctdGhlbWUtYm9vdHN0cmFwJyxcclxuICAgICAgICAgICAgICAgICdhZy10aGVtZS1kYXJrJywgJ2FnLXRoZW1lLWZyZXNoJywgJ2FnLXRoZW1lLW1hdGVyaWFsJ10sXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQ2xhc3ModGhpcy52YWxpZFZhbHVlcy5qb2luKFwiIFwiKSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmFkZENsYXNzKHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb2RlIGNvcGllZCBmb3JtIG9mZmljaWFsIHNpdGUgZXhhbXBsZSBodHRwczovL3d3dy5hZy1ncmlkLmNvbS9leGFtcGxlLnBocCMvXHJcbiAgICAgICAgICAgICAgICBjb25zdCBncmlkT3B0aW9ucyA9IHRhYmxlc1tub2RlLmF0dHIoZGF0YVRhYmxlSWQpXTtcclxuICAgICAgICAgICAgICAgIGdyaWRPcHRpb25zLmFwaS5yZXNldFJvd0hlaWdodHMoKTtcclxuICAgICAgICAgICAgICAgIGdyaWRPcHRpb25zLmFwaS5yZWRyYXdSb3dzKCk7XHJcbiAgICAgICAgICAgICAgICBncmlkT3B0aW9ucy5hcGkucmVmcmVzaEhlYWRlcigpO1xyXG4gICAgICAgICAgICAgICAgZ3JpZE9wdGlvbnMuYXBpLnJlZnJlc2hUb29sUGFuZWwoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJEZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImFnLXRoZW1lLWJhbGhhbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQmFsaGFtXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJhZy10aGVtZS1iYWxoYW0tZGFya1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQmFsaGFtIChkYXJrKVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiYWctdGhlbWUtYmx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQmx1ZVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiYWctdGhlbWUtYm9vdHN0cmFwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJCb290c3RyYXBcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImFnLXRoZW1lLWRhcmtcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhcmtcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImFnLXRoZW1lLWZyZXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJGcmVzaFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiYWctdGhlbWUtbWF0ZXJpYWxcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIk1hdGVyaWFsXCJcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICAgICAga2V5OiBcImFkZENoaWxkXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQnV0dG9uSW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHsgdGV4dDogXCJBZGQgaGVhZGVyXCIgfSxcclxuICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xEZWZzID0gdGFibGVzWyQobm9kZSkuYXR0cihkYXRhVGFibGVJZCldLmNvbHVtbkRlZnM7XHJcbiAgICAgICAgICAgICAgICBjb2xEZWZzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlck5hbWU6ICdoZWFkZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiAnZmllbGQnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRDb2x1bW5EZWZzQW5kUmVuZGVyKG5vZGUsIGNvbERlZnMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LF1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhYmxlOyIsImZ1bmN0aW9uIGh0bWxHZW5lcmF0b3IoaHRtbCwgLi4uZm5zKSB7XHJcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2h0bWwnKTtcclxuICAgIGVsLmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICBmbnMucmVkdWNlKChlbCwgZm4pID0+IGZuKGVsKSwgZWwpO1xyXG4gICAgcmV0dXJuICQoZWwpLnByb3AoJ291dGVySFRNTCcpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBodG1sR2VuZXJhdG9yOyIsIi8vIFRvZ2dsZSBmdWxsc2NyZWVuXHJcbmZ1bmN0aW9uIGxhdW5jaEZ1bGxTY3JlZW4oZG9jdW1lbnQpIHtcclxuICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LkZ1bGxTY3JlZW5FbGVtZW50KVxyXG4gICAgICAgICAgICBkb2N1bWVudC5leGl0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgLy9tb3ppbGxhXHRcdFxyXG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50KVxyXG4gICAgICAgICAgICBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICAvL3dlYmtpdFx0ICBcclxuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudClcclxuICAgICAgICAgICAgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgIC8vaWVcdCAgXHJcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC5tc0Z1bGxTY3JlZW5FbGVtZW50KVxyXG4gICAgICAgICAgICBkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBsYXVuY2hGdWxsU2NyZWVuIH07IiwiZnVuY3Rpb24gZG93bmxvYWRBc1RleHRGaWxlKGZpbGVuYW1lLCB0ZXh0KSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBgZGF0YTp0ZXh0L2h0bWw7Y2hhcnNldD11dGYtOCwke2VuY29kZVVSSUNvbXBvbmVudCh0ZXh0KX1gKTtcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIGZpbGVuYW1lKTtcclxuXHJcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG5cclxuICAgIGVsZW1lbnQuY2xpY2soKTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG59XHJcblxyXG5leHBvcnQgeyBkb3dubG9hZEFzVGV4dEZpbGUgfTsiLCJpbXBvcnQgeyBkYXRhQ29uZmlnSW5mbywgZGF0YUNhbGVuZGFySWQgfSBmcm9tICcuLi9jb21wb25lbnRzL2NvbW1vbic7XHJcbmNvbnN0IGNhbGVuZGFyU2VsZWN0b3IgPSBgaW5wdXRbJHtkYXRhQ2FsZW5kYXJJZH1dYDtcclxuY29uc3QgY2FsZW5kYXJPbmNsaWNrU2VsZWN0b3IgPSBgaW5wdXRbJHtkYXRhQ2FsZW5kYXJJZH1dW29uY2xpY2tdYDtcclxuLy8gPGlucHV0IGRhdGEtaWQ9XCJ7J2EnLCBifVwiPiDmm7/mjaLljIXlkKsnXFwnJ+eahOWxnuaAp+WAvOS4uuWQiOazleeahGpzb27lrZfnrKbkuLJcclxuZnVuY3Rpb24gZ2V0RGF0YUNvbmZpZ0luZm8obm9kZSkge1xyXG4gICAgcmV0dXJuICQobm9kZSkuYXR0cihkYXRhQ29uZmlnSW5mbyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERhdGFDb25maWdJbmZvSlNPTlN0cmluZyhub2RlKSB7XHJcbiAgICByZXR1cm4gZ2V0RGF0YUNvbmZpZ0luZm8obm9kZSkucmVwbGFjZSgvJy9nLCAnXCInKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0RGF0YUNvbmZpZ0luZm8obm9kZSwgbmV3VmFsdWUpIHtcclxuICAgICQobm9kZSkuYXR0cihkYXRhQ29uZmlnSW5mbywgSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpLnJlcGxhY2UoL1wiL2csICdcXCcnKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldE9uY2xpY2tBdHRyKG5vZGUpIHtcclxuICAgICQobm9kZSkuYXR0cignb25jbGljaycsIGBXZGF0ZVBpY2tlcigke2dldERhdGFDb25maWdJbmZvKG5vZGUpfSlgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UGFyc2VkQ29uZmlnSW5mbyhub2RlKSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShnZXREYXRhQ29uZmlnSW5mb0pTT05TdHJpbmcobm9kZSkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXRlRm10KG5vZGUpIHtcclxuICAgIHJldHVybiBnZXRQYXJzZWRDb25maWdJbmZvKG5vZGUpLmRhdGVGbXQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb25lV2l0aG91dE9uY2xpY2sobm9kZSkge1xyXG4gICAgJChub2RlKS5yZXBsYWNlV2l0aCgkKG5vZGUpLnJlbW92ZUF0dHIoJ29uY2xpY2snKS5jbG9uZSgpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVwbGFjZU90aGVyU2hvd2luZ0NhbGVuZGFySW5wdXRzKGVsZW1lbnQsIGNvbnRleHQpIHtcclxuICAgIGlmICghJChlbGVtZW50KS5pcyhjYWxlbmRhck9uY2xpY2tTZWxlY3RvcikpIHtcclxuICAgICAgICBjb250ZXh0LmZpbmQoY2FsZW5kYXJPbmNsaWNrU2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjbG9uZVdpdGhvdXRPbmNsaWNrKHRoaXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgcmVwbGFjZU90aGVyU2hvd2luZ0NhbGVuZGFySW5wdXRzLCBjbG9uZVdpdGhvdXRPbmNsaWNrLFxyXG4gICAgY2FsZW5kYXJTZWxlY3RvciwgY2FsZW5kYXJPbmNsaWNrU2VsZWN0b3IsXHJcbiAgICBnZXREYXRhQ29uZmlnSW5mbywgZ2V0RGF0ZUZtdCwgZ2V0UGFyc2VkQ29uZmlnSW5mbyxcclxuICAgIHNldE9uY2xpY2tBdHRyLCBzZXREYXRhQ29uZmlnSW5mb1xyXG59OyIsIi8qXHJcbkNvcHlyaWdodCAyMDE3IFppYWRpbiBHaXZhblxyXG5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHJcbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG5cclxuaHR0cHM6Ly9naXRodWIuY29tL2dpdmFuei9WdnZlYkpzXHJcbiovXHJcbmltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcbmltcG9ydCBDaGVja2JveElucHV0IGZyb20gJy4vQ2hlY2tib3hJbnB1dCc7XHJcbmltcG9ydCBTZWxlY3RJbnB1dCBmcm9tICcuL1NlbGVjdElucHV0JztcclxuaW1wb3J0IExpbmtJbnB1dCBmcm9tICcuL0xpbmtJbnB1dCc7XHJcbmltcG9ydCBSYW5nZUlucHV0IGZyb20gJy4vUmFuZ2VJbnB1dCc7XHJcbmltcG9ydCBOdW1iZXJJbnB1dCBmcm9tICcuL051bWJlcklucHV0JztcclxuaW1wb3J0IENzc1VuaXRJbnB1dCBmcm9tICcuL0Nzc1VuaXRJbnB1dCc7XHJcbmltcG9ydCBDb2xvcklucHV0IGZyb20gJy4vQ29sb3JJbnB1dCc7XHJcbmltcG9ydCBGaWxlVXBsb2FkSW5wdXQgZnJvbSAnLi9GaWxlVXBsb2FkSW5wdXQnO1xyXG5pbXBvcnQgUmFkaW9JbnB1dCBmcm9tICcuL1JhZGlvSW5wdXQnO1xyXG5pbXBvcnQgUmFkaW9CdXR0b25JbnB1dCBmcm9tICcuL1JhZGlvQnV0dG9uSW5wdXQnO1xyXG5pbXBvcnQgVG9nZ2xlSW5wdXQgZnJvbSAnLi9Ub2dnbGVJbnB1dCc7XHJcbmltcG9ydCBWYWx1ZVRleHRJbnB1dCBmcm9tICcuL1ZhbHVlVGV4dElucHV0JztcclxuaW1wb3J0IEdyaWRMYXlvdXRJbnB1dCBmcm9tICcuL0dyaWRMYXlvdXRJbnB1dCc7XHJcbmltcG9ydCBQcm9kdWN0c0lucHV0IGZyb20gJy4vUHJvZHVjdHNJbnB1dCc7XHJcbmltcG9ydCBHcmlkSW5wdXQgZnJvbSAnLi9HcmlkSW5wdXQnO1xyXG5pbXBvcnQgVGV4dFZhbHVlSW5wdXQgZnJvbSAnLi9UZXh0VmFsdWVJbnB1dCc7XHJcbmltcG9ydCBCdXR0b25JbnB1dCBmcm9tICcuL0J1dHRvbklucHV0JztcclxuaW1wb3J0IFNlY3Rpb25JbnB1dCBmcm9tICcuL1NlY3Rpb25JbnB1dCc7XHJcbmltcG9ydCBMaXN0SW5wdXQgZnJvbSAnLi9MaXN0SW5wdXQnO1xyXG5cclxuZXhwb3J0IHtcclxuXHRJbnB1dCwgVGV4dElucHV0LCBDaGVja2JveElucHV0LCBTZWxlY3RJbnB1dCwgTGlua0lucHV0LCBSYW5nZUlucHV0LCBOdW1iZXJJbnB1dCwgQ3NzVW5pdElucHV0LFxyXG5cdFJhZGlvSW5wdXQsIFJhZGlvQnV0dG9uSW5wdXQsIFRvZ2dsZUlucHV0LCBWYWx1ZVRleHRJbnB1dCwgR3JpZExheW91dElucHV0LCBQcm9kdWN0c0lucHV0LCBHcmlkSW5wdXQsXHJcblx0VGV4dFZhbHVlSW5wdXQsIEJ1dHRvbklucHV0LCBTZWN0aW9uSW5wdXQsIExpc3RJbnB1dCwgQ29sb3JJbnB1dCwgRmlsZVVwbG9hZElucHV0XHJcbn07IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBWYWx1ZVRleHRJbnB1dCA9ICQuZXh0ZW5kKHt9LCBUZXh0SW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWYWx1ZVRleHRJbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuXHJcbmNvbnN0IFRvZ2dsZUlucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRvbkNoYW5nZTogZnVuY3Rpb24gKGV2ZW50LCBub2RlKSB7XHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpIHtcclxuXHRcdFx0ZXZlbnQuZGF0YS5lbGVtZW50LnRyaWdnZXIoJ3Byb3BlcnR5Q2hhbmdlJywgW3RoaXMuY2hlY2tlZCA/IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZS1vblwiKSA6IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZS1vZmZcIiksIHRoaXNdKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRvZ2dsZVwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb2dnbGVJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBUZXh0VmFsdWVJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdFx0W1wiY2xpY2tcIiwgXCJvbkNoYW5nZVwiLCBcImJ1dHRvblwiIC8qJ3NlbGVjdCcqL10sXHJcblx0XSxcclxuXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0dmFsdWVcIiwgZGF0YSk7XHJcblx0fSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRleHRWYWx1ZUlucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFNlbGVjdElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG4gICAgZXZlbnRzOiBbXHJcbiAgICAgICAgW1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJzZWxlY3RcIl0sXHJcbiAgICBdLFxyXG5cclxuXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgJCgnc2VsZWN0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcihcInNlbGVjdFwiLCBkYXRhKTtcclxuICAgIH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBTZWN0aW9uSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjbGlja1wiLCBcIm9uQ2hhbmdlXCIsIFwiYnV0dG9uXCIgLyonc2VsZWN0JyovXSxcclxuXHRdLFxyXG5cclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJzZWN0aW9uaW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlY3Rpb25JbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBSYW5nZUlucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwicmFuZ2VpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYW5nZUlucHV0OyIsImltcG9ydCBSYWRpb0lucHV0IGZyb20gJy4vUmFkaW9JbnB1dCc7XHJcblxyXG5jb25zdCBSYWRpb0J1dHRvbklucHV0ID0gJC5leHRlbmQoe30sIFJhZGlvSW5wdXQsIHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcihcInJhZGlvYnV0dG9uaW5wdXRcIiwgZGF0YSk7XHJcbiAgICB9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYWRpb0J1dHRvbklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFJhZGlvSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0b25DaGFuZ2U6IGZ1bmN0aW9uIChldmVudCwgbm9kZSkge1xyXG5cclxuXHRcdGlmIChldmVudC5kYXRhICYmIGV2ZW50LmRhdGEuZWxlbWVudCkge1xyXG5cdFx0XHRldmVudC5kYXRhLmVsZW1lbnQudHJpZ2dlcigncHJvcGVydHlDaGFuZ2UnLCBbdGhpcy52YWx1ZSwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkucmVtb3ZlQXR0cignY2hlY2tlZCcpO1xyXG5cdFx0aWYgKHZhbHVlKVxyXG5cdFx0XHQkKFwiaW5wdXRbdmFsdWU9XCIgKyB2YWx1ZSArIFwiXVwiLCB0aGlzLmVsZW1lbnQpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwicmFkaW9pbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYWRpb0lucHV0OyIsImltcG9ydCBUZXh0SW5wdXQgZnJvbSAnLi9UZXh0SW5wdXQnO1xyXG5cclxuY29uc3QgUHJvZHVjdHNJbnB1dCA9ICQuZXh0ZW5kKHt9LCBUZXh0SW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm9kdWN0c0lucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbnZhciBOdW1iZXJJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcIm51bWJlcmlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE51bWJlcklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IExpc3RJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwic2VsZWN0XCJdLFxyXG5cdF0sXHJcblxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdzZWxlY3QnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImxpc3RpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdElucHV0OyIsImltcG9ydCBUZXh0SW5wdXQgZnJvbSAnLi9UZXh0SW5wdXQnO1xyXG5cclxuY29uc3QgTGlua0lucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaW5rSW5wdXQ7IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBHcmlkTGF5b3V0SW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR3JpZExheW91dElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IEdyaWRJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJzZWxlY3RcIiAvKidzZWxlY3QnKi9dLFxyXG5cdFx0W1wiY2xpY2tcIiwgXCJvbkNoYW5nZVwiLCBcImJ1dHRvblwiIC8qJ3NlbGVjdCcqL10sXHJcblx0XSxcclxuXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ3NlbGVjdCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwiZ3JpZFwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR3JpZElucHV0OyIsImltcG9ydCBUZXh0SW5wdXQgZnJvbSAnLi9UZXh0SW5wdXQnO1xyXG5cclxuY29uc3QgRmlsZVVwbG9hZElucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImtleXVwXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpbGVVcGxvYWRJbnB1dDtcclxuIiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgVGV4dElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG4gICAgZXZlbnRzOiBbXHJcbiAgICAgICAgW1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdCBdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblx0XHJcblx0aW5pdDogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbiAgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGV4dElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IENzc1VuaXRJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRudW1iZXI6IDAsXHJcblx0dW5pdDogXCJweFwiLFxyXG5cclxuXHRvbkNoYW5nZTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0aWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS5lbGVtZW50KSB7XHJcblx0XHRcdGlucHV0ID0gZXZlbnQuZGF0YS5pbnB1dDtcclxuXHRcdFx0aW5wdXRbdGhpcy5uYW1lXSA9IHRoaXMudmFsdWU7Ly8gdGhpcy5uYW1lID0gdW5pdCBvciBudW1iZXJcdFxyXG5cclxuXHRcdFx0dmFsdWUgPSBcIlwiO1xyXG5cdFx0XHRpZiAoaW5wdXQudW5pdCA9PSBcImF1dG9cIikge1xyXG5cdFx0XHRcdCQoZXZlbnQuZGF0YS5lbGVtZW50KS5hZGRDbGFzcyhcImF1dG9cIik7XHJcblx0XHRcdFx0dmFsdWUgPSBpbnB1dC51bml0O1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdCQoZXZlbnQuZGF0YS5lbGVtZW50KS5yZW1vdmVDbGFzcyhcImF1dG9cIik7XHJcblx0XHRcdFx0dmFsdWUgPSBpbnB1dC5udW1iZXIgKyBpbnB1dC51bml0O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRldmVudC5kYXRhLmVsZW1lbnQudHJpZ2dlcigncHJvcGVydHlDaGFuZ2UnLCBbdmFsdWUsIHRoaXNdKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwic2VsZWN0XCJdLFxyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHR0aGlzLm51bWJlciA9IHBhcnNlSW50KHZhbHVlKTtcclxuXHRcdHRoaXMudW5pdCA9IHZhbHVlLnJlcGxhY2UodGhpcy5udW1iZXIsICcnKTtcclxuXHJcblx0XHRpZiAodGhpcy51bml0ID09IFwiYXV0b1wiKSAkKHRoaXMuZWxlbWVudCkuYWRkQ2xhc3MoXCJhdXRvXCIpO1xyXG5cclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodGhpcy5udW1iZXIpO1xyXG5cdFx0JCgnc2VsZWN0JywgdGhpcy5lbGVtZW50KS52YWwodGhpcy51bml0KTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwiY3NzdW5pdGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENzc1VuaXRJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBDb2xvcklucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdC8vaHRtbDUgY29sb3IgaW5wdXQgb25seSBzdXBwb3J0cyBzZXR0aW5nIHZhbHVlcyBhcyBoZXggY29sb3JzIGV2ZW4gaWYgdGhlIHBpY2tlciByZXR1cm5zIG9ubHkgcmdiXHJcblx0cmdiMmhleDogZnVuY3Rpb24gKHJnYikge1xyXG5cclxuXHRcdHJnYiA9IHJnYi5tYXRjaCgvXnJnYmE/W1xccytdP1xcKFtcXHMrXT8oXFxkKylbXFxzK10/LFtcXHMrXT8oXFxkKylbXFxzK10/LFtcXHMrXT8oXFxkKylbXFxzK10/L2kpO1xyXG5cclxuXHRcdHJldHVybiAocmdiICYmIHJnYi5sZW5ndGggPT09IDQpID8gXCIjXCIgK1xyXG5cdFx0XHQoXCIwXCIgKyBwYXJzZUludChyZ2JbMV0sIDEwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKSArXHJcblx0XHRcdChcIjBcIiArIHBhcnNlSW50KHJnYlsyXSwgMTApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpICtcclxuXHRcdFx0KFwiMFwiICsgcGFyc2VJbnQocmdiWzNdLCAxMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMikgOiByZ2I7XHJcblx0fSxcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodGhpcy5yZ2IyaGV4KHZhbHVlKSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImNvbG9yaW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29sb3JJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBDaGVja2JveElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbihldmVudCwgbm9kZSkge1xyXG5cdFx0XHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpXHJcblx0XHR7XHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt0aGlzLmNoZWNrZWQsIHRoaXNdKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuICAgIGV2ZW50czogW1xyXG4gICAgICAgIFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0IF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHRcclxuXHRpbml0OiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJjaGVja2JveGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbiAgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tib3hJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBCdXR0b25JbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNsaWNrXCIsIFwib25DaGFuZ2VcIiwgXCJidXR0b25cIiAvKidzZWxlY3QnKi9dLFxyXG5cdF0sXHJcblxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdidXR0b24nLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImJ1dHRvblwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uSW5wdXQ7IiwiY29uc3QgSW5wdXQgPSB7XHJcblx0XHJcblx0aW5pdDogZnVuY3Rpb24obmFtZSkge1xyXG5cdH0sXHJcblxyXG5cclxuXHRvbkNoYW5nZTogZnVuY3Rpb24oZXZlbnQsIG5vZGUpIHtcclxuXHRcdFxyXG5cdFx0aWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS5lbGVtZW50KVxyXG5cdFx0e1xyXG5cdFx0XHRldmVudC5kYXRhLmVsZW1lbnQudHJpZ2dlcigncHJvcGVydHlDaGFuZ2UnLCBbdGhpcy52YWx1ZSwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHJlbmRlclRlbXBsYXRlOiBmdW5jdGlvbihuYW1lLCBkYXRhKSB7XHJcblx0XHRyZXR1cm4gdG1wbChcInZ2dmViLWlucHV0LVwiICsgbmFtZSwgZGF0YSk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbihuYW1lLCBkYXRhKSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKHRoaXMucmVuZGVyVGVtcGxhdGUobmFtZSwgZGF0YSkpO1xyXG5cdFx0XHJcblx0XHQvL2JpbmQgZXZlbnRzXHJcblx0XHRpZiAodGhpcy5ldmVudHMpXHJcblx0XHRmb3IgKHZhciBpIGluIHRoaXMuZXZlbnRzKVxyXG5cdFx0e1xyXG5cdFx0XHRldmVudCA9IHRoaXMuZXZlbnRzW2ldWzBdO1xyXG5cdFx0XHRmdW4gPSB0aGlzWyB0aGlzLmV2ZW50c1tpXVsxXSBdO1xyXG5cdFx0XHRlbCA9IHRoaXMuZXZlbnRzW2ldWzJdO1xyXG5cdFx0XHJcblx0XHRcdHRoaXMuZWxlbWVudC5vbihldmVudCwgZWwsIHtlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGlucHV0OnRoaXN9LCBmdW4pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLmVsZW1lbnQ7XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5wdXQ7IiwiY29uc3QgYmdjb2xvckNsYXNzZXMgPSBbXCJiZy1wcmltYXJ5XCIsIFwiYmctc2Vjb25kYXJ5XCIsIFwiYmctc3VjY2Vzc1wiLCBcImJnLWRhbmdlclwiLCBcImJnLXdhcm5pbmdcIiwgXCJiZy1pbmZvXCIsIFwiYmctbGlnaHRcIiwgXCJiZy1kYXJrXCIsIFwiYmctd2hpdGVcIl07XHJcblxyXG5jb25zdCBiZ2NvbG9yU2VsZWN0T3B0aW9ucyA9XHJcbiAgICBbe1xyXG4gICAgICAgIHZhbHVlOiBcIkRlZmF1bHRcIixcclxuICAgICAgICB0ZXh0OiBcIlwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLXByaW1hcnlcIixcclxuICAgICAgICB0ZXh0OiBcIlByaW1hcnlcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLXNlY29uZGFyeVwiLFxyXG4gICAgICAgIHRleHQ6IFwiU2Vjb25kYXJ5XCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1zdWNjZXNzXCIsXHJcbiAgICAgICAgdGV4dDogXCJTdWNjZXNzXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1kYW5nZXJcIixcclxuICAgICAgICB0ZXh0OiBcIkRhbmdlclwiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctd2FybmluZ1wiLFxyXG4gICAgICAgIHRleHQ6IFwiV2FybmluZ1wiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctaW5mb1wiLFxyXG4gICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctbGlnaHRcIixcclxuICAgICAgICB0ZXh0OiBcIkxpZ2h0XCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1kYXJrXCIsXHJcbiAgICAgICAgdGV4dDogXCJEYXJrXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy13aGl0ZVwiLFxyXG4gICAgICAgIHRleHQ6IFwiV2hpdGVcIlxyXG4gICAgfV07XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VOb2RlTmFtZShub2RlLCBuZXdOb2RlTmFtZSkge1xyXG4gICAgdmFyIG5ld05vZGU7XHJcbiAgICBuZXdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuZXdOb2RlTmFtZSk7XHJcbiAgICBhdHRyaWJ1dGVzID0gbm9kZS5nZXQoMCkuYXR0cmlidXRlcztcclxuXHJcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBhdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgbmV3Tm9kZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlc1tpXS5ub2RlTmFtZSwgYXR0cmlidXRlc1tpXS5ub2RlVmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgICQobmV3Tm9kZSkuYXBwZW5kKCQobm9kZSkuY29udGVudHMoKSk7XHJcbiAgICAkKG5vZGUpLnJlcGxhY2VXaXRoKG5ld05vZGUpO1xyXG5cclxuICAgIHJldHVybiBuZXdOb2RlO1xyXG59XHJcblxyXG5sZXQgYmFzZV9zb3J0ID0gMTAwOy8vc3RhcnQgc29ydGluZyBmb3IgYmFzZSBjb21wb25lbnQgZnJvbSAxMDAgdG8gYWxsb3cgZXh0ZW5kZWQgcHJvcGVydGllcyB0byBiZSBmaXJzdFxyXG5mdW5jdGlvbiBpbmNfYmFzZV9zb3J0KCkge1xyXG4gICAgcmV0dXJuIGJhc2Vfc29ydCsrO1xyXG59XHJcblxyXG5jb25zdCBkYXRhQ29tcG9uZW50SWQgPSAnZGF0YS1jb21wb25lbnQtaWQnO1xyXG5jb25zdCBkYXRhVGFibGVJZCA9ICdkYXRhLXRhYmxlLWlkJztcclxuY29uc3QgZGF0YUNhbGVuZGFySWQgPSAnZGF0YS1jYWxlbmRhci1pZCc7XHJcbmNvbnN0IGRhdGFDb25maWdJbmZvID0gJ2RhdGEtY29uZmlnLWluZm8nO1xyXG5cclxuZXhwb3J0IHtcclxuICAgIGJnY29sb3JDbGFzc2VzLCBiZ2NvbG9yU2VsZWN0T3B0aW9ucywgY2hhbmdlTm9kZU5hbWUsIGluY19iYXNlX3NvcnQsIGRhdGFDb21wb25lbnRJZCwgZGF0YVRhYmxlSWQsXHJcbiAgICBkYXRhQ29uZmlnSW5mbywgZGF0YUNhbGVuZGFySWRcclxufTtcclxuIl19
