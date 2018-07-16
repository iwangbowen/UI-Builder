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
		self.frameBody = $(window.FrameDocument).find("body");

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

		return html_beautify(doctype + '\n\t\t\t\t\t\t\t  ' + (0, _htmlGenerator2.default)(html, _jsoup.removeUnusedTags, _jsoup.emptyChildren, _jsoup.generateTableScript), {
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

},{"./components/common":133,"./inputs/inputs":165,"./util/download":170,"./util/fullScreen":173,"./util/htmlGenerator":174,"./util/jsoup":175}],175:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateTableScript = exports.emptyChildren = exports.removeUnusedTags = undefined;

var _unusedTags = require('./unusedTags');

var _unusedTags2 = _interopRequireDefault(_unusedTags);

var _emptyChildrenSelectors = require('./emptyChildrenSelectors');

var _table = require('../templates/table');

var _table2 = _interopRequireDefault(_table);

var _table3 = require('../components/@oee/table');

var _table4 = _interopRequireDefault(_table3);

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

exports.removeUnusedTags = removeUnusedTags;
exports.emptyChildren = emptyChildren;
exports.generateTableScript = generateTableScript;

},{"../components/@oee/table":124,"../templates/table":168,"./emptyChildrenSelectors":172,"./unusedTags":176}],176:[function(require,module,exports){
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

},{}],172:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tableSelector = exports.emptyChildrenSelectors = undefined;

var _common = require('../components/common');

var tableSelector = '[' + _common.dataTableId + ']';
var emptyChildrenSelectors = [tableSelector];

exports.emptyChildrenSelectors = emptyChildrenSelectors;
exports.tableSelector = tableSelector;

},{"../components/common":133}],168:[function(require,module,exports){
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

},{"../components/common":133}],124:[function(require,module,exports){
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

},{"../../builder":52,"../../inputs/inputs":165,"../common":133}],174:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
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

},{"./ButtonInput":144,"./CheckboxInput":145,"./ColorInput":146,"./CssUnitInput":147,"./FileUploadInput":148,"./GridInput":149,"./GridLayoutInput":150,"./Input":151,"./LinkInput":152,"./ListInput":153,"./NumberInput":154,"./ProductsInput":155,"./RadioButtonInput":156,"./RadioInput":157,"./RangeInput":158,"./SectionInput":159,"./SelectInput":160,"./TextInput":161,"./TextValueInput":162,"./ToggleInput":163,"./ValueTextInput":164}],164:[function(require,module,exports){
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

},{"./TextInput":161}],163:[function(require,module,exports){
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

},{"./TextInput":161}],162:[function(require,module,exports){
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

},{"./Input":151}],160:[function(require,module,exports){
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

},{"./Input":151}],159:[function(require,module,exports){
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

},{"./Input":151}],158:[function(require,module,exports){
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

},{"./Input":151}],156:[function(require,module,exports){
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

},{"./RadioInput":157}],157:[function(require,module,exports){
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

},{"./Input":151}],155:[function(require,module,exports){
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

},{"./TextInput":161}],154:[function(require,module,exports){
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

},{"./Input":151}],153:[function(require,module,exports){
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

},{"./Input":151}],152:[function(require,module,exports){
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

},{"./TextInput":161}],150:[function(require,module,exports){
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

},{"./TextInput":161}],149:[function(require,module,exports){
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

},{"./Input":151}],148:[function(require,module,exports){
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

},{"./TextInput":161}],161:[function(require,module,exports){
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

},{"./Input":151}],147:[function(require,module,exports){
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

},{"./Input":151}],146:[function(require,module,exports){
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

},{"./Input":151}],145:[function(require,module,exports){
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

},{"./Input":151}],144:[function(require,module,exports){
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

},{"./Input":151}],151:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){
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

exports.bgcolorClasses = bgcolorClasses;
exports.bgcolorSelectOptions = bgcolorSelectOptions;
exports.changeNodeName = changeNodeName;
exports.inc_base_sort = inc_base_sort;
exports.dataComponentId = dataComponentId;
exports.dataTableId = dataTableId;

},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGRlci5qcyIsInNyYy91dGlsL2pzb3VwLmpzIiwic3JjL3V0aWwvdW51c2VkVGFncy5qcyIsInNyYy91dGlsL2VtcHR5Q2hpbGRyZW5TZWxlY3RvcnMuanMiLCJzcmMvdGVtcGxhdGVzL3RhYmxlLmpzIiwic3JjL2NvbXBvbmVudHMvQG9lZS90YWJsZS5qcyIsInNyYy91dGlsL2h0bWxHZW5lcmF0b3IuanMiLCJzcmMvdXRpbC9mdWxsU2NyZWVuLmpzIiwic3JjL3V0aWwvZG93bmxvYWQuanMiLCJzcmMvaW5wdXRzL2lucHV0cy5qcyIsInNyYy9pbnB1dHMvVmFsdWVUZXh0SW5wdXQuanMiLCJzcmMvaW5wdXRzL1RvZ2dsZUlucHV0LmpzIiwic3JjL2lucHV0cy9UZXh0VmFsdWVJbnB1dC5qcyIsInNyYy9pbnB1dHMvU2VsZWN0SW5wdXQuanMiLCJzcmMvaW5wdXRzL1NlY3Rpb25JbnB1dC5qcyIsInNyYy9pbnB1dHMvUmFuZ2VJbnB1dC5qcyIsInNyYy9pbnB1dHMvUmFkaW9CdXR0b25JbnB1dC5qcyIsInNyYy9pbnB1dHMvUmFkaW9JbnB1dC5qcyIsInNyYy9pbnB1dHMvUHJvZHVjdHNJbnB1dC5qcyIsInNyYy9pbnB1dHMvTnVtYmVySW5wdXQuanMiLCJzcmMvaW5wdXRzL0xpc3RJbnB1dC5qcyIsInNyYy9pbnB1dHMvTGlua0lucHV0LmpzIiwic3JjL2lucHV0cy9HcmlkTGF5b3V0SW5wdXQuanMiLCJzcmMvaW5wdXRzL0dyaWRJbnB1dC5qcyIsInNyYy9pbnB1dHMvRmlsZVVwbG9hZElucHV0LmpzIiwic3JjL2lucHV0cy9UZXh0SW5wdXQuanMiLCJzcmMvaW5wdXRzL0Nzc1VuaXRJbnB1dC5qcyIsInNyYy9pbnB1dHMvQ29sb3JJbnB1dC5qcyIsInNyYy9pbnB1dHMvQ2hlY2tib3hJbnB1dC5qcyIsInNyYy9pbnB1dHMvQnV0dG9uSW5wdXQuanMiLCJzcmMvaW5w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LGtCQUFrQixtQkFBeEI7QUFDQSxJQUFNLGNBQWMsZUFBcEI7O1FBRVMsYyxHQUFBLGM7UUFBZ0Isb0IsR0FBQSxvQjtRQUFzQixjLEdBQUEsYztRQUFnQixhLEdBQUEsYTtRQUFlLGUsR0FBQSxlO1FBQWlCLFcsR0FBQSxXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgU2VjdGlvbklucHV0IH0gZnJvbSAnLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgcmVtb3ZlVW51c2VkVGFncywgZW1wdHlDaGlsZHJlbiwgZ2VuZXJhdGVUYWJsZVNjcmlwdCB9IGZyb20gJy4vdXRpbC9qc291cCc7XHJcbmltcG9ydCB7IGRvd25sb2FkQXNUZXh0RmlsZSB9IGZyb20gJy4vdXRpbC9kb3dubG9hZCc7XHJcbmltcG9ydCB7IGxhdW5jaEZ1bGxTY3JlZW4gfSBmcm9tICcuL3V0aWwvZnVsbFNjcmVlbic7XHJcbmltcG9ydCB7IGRhdGFDb21wb25lbnRJZCB9IGZyb20gJy4vY29tcG9uZW50cy9jb21tb24nXHJcbmltcG9ydCBodG1sR2VuZXJhdG9yIGZyb20gJy4vdXRpbC9odG1sR2VuZXJhdG9yJztcclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGNhY2hlID0ge307XHJcblxyXG5cdHRoaXMudG1wbCA9IGZ1bmN0aW9uIHRtcGwoc3RyLCBkYXRhKSB7XHJcblx0XHQvLyBGaWd1cmUgb3V0IGlmIHdlJ3JlIGdldHRpbmcgYSB0ZW1wbGF0ZSwgb3IgaWYgd2UgbmVlZCB0b1xyXG5cdFx0Ly8gbG9hZCB0aGUgdGVtcGxhdGUgLSBhbmQgYmUgc3VyZSB0byBjYWNoZSB0aGUgcmVzdWx0LlxyXG5cdFx0dmFyIGZuID0gL15bLWEtekEtWjAtOV0rJC8udGVzdChzdHIpID9cclxuXHRcdFx0Y2FjaGVbc3RyXSA9IGNhY2hlW3N0cl0gfHxcclxuXHRcdFx0dG1wbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzdHIpLmlubmVySFRNTCkgOlxyXG5cclxuXHRcdFx0Ly8gR2VuZXJhdGUgYSByZXVzYWJsZSBmdW5jdGlvbiB0aGF0IHdpbGwgc2VydmUgYXMgYSB0ZW1wbGF0ZVxyXG5cdFx0XHQvLyBnZW5lcmF0b3IgKGFuZCB3aGljaCB3aWxsIGJlIGNhY2hlZCkuXHJcblx0XHRcdG5ldyBGdW5jdGlvbihcIm9ialwiLFxyXG5cdFx0XHRcdFwidmFyIHA9W10scHJpbnQ9ZnVuY3Rpb24oKXtwLnB1c2guYXBwbHkocCxhcmd1bWVudHMpO307XCIgK1xyXG5cclxuXHRcdFx0XHQvLyBJbnRyb2R1Y2UgdGhlIGRhdGEgYXMgbG9jYWwgdmFyaWFibGVzIHVzaW5nIHdpdGgoKXt9XHJcblx0XHRcdFx0XCJ3aXRoKG9iail7cC5wdXNoKCdcIiArXHJcblxyXG5cdFx0XHRcdC8vIENvbnZlcnQgdGhlIHRlbXBsYXRlIGludG8gcHVyZSBKYXZhU2NyaXB0XHJcblx0XHRcdFx0c3RyXHJcblx0XHRcdFx0XHQucmVwbGFjZSgvW1xcclxcdFxcbl0vZywgXCIgXCIpXHJcblx0XHRcdFx0XHQuc3BsaXQoXCJ7JVwiKS5qb2luKFwiXFx0XCIpXHJcblx0XHRcdFx0XHQucmVwbGFjZSgvKChefCV9KVteXFx0XSopJy9nLCBcIiQxXFxyXCIpXHJcblx0XHRcdFx0XHQucmVwbGFjZSgvXFx0PSguKj8pJX0vZywgXCInLCQxLCdcIilcclxuXHRcdFx0XHRcdC5zcGxpdChcIlxcdFwiKS5qb2luKFwiJyk7XCIpXHJcblx0XHRcdFx0XHQuc3BsaXQoXCIlfVwiKS5qb2luKFwicC5wdXNoKCdcIilcclxuXHRcdFx0XHRcdC5zcGxpdChcIlxcclwiKS5qb2luKFwiXFxcXCdcIilcclxuXHRcdFx0XHQrIFwiJyk7fXJldHVybiBwLmpvaW4oJycpO1wiKTtcclxuXHRcdC8vIFByb3ZpZGUgc29tZSBiYXNpYyBjdXJyeWluZyB0byB0aGUgdXNlclxyXG5cdFx0cmV0dXJuIGRhdGEgPyBmbihkYXRhKSA6IGZuO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG52YXIgZGVsYXkgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB0aW1lciA9IDA7XHJcblx0cmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjaywgbXMpIHtcclxuXHRcdGNsZWFyVGltZW91dCh0aW1lcik7XHJcblx0XHR0aW1lciA9IHNldFRpbWVvdXQoY2FsbGJhY2ssIG1zKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuY29uc3QgdW51c2VkVGFncyA9IFtcclxuXHQvLyB7XHJcblx0Ly8gXHRuYW1lOiAnc2NyaXB0J1xyXG5cdC8vIH0sXHJcblx0e1xyXG5cdFx0bmFtZTogJ2xpbmsnLFxyXG5cdFx0ZmlsdGVyOiB0YWcgPT4gdGFnLmdldEF0dHJpYnV0ZSgncmVsJykgPT0gJ3N0eWxlc2hlZXQnXHJcblx0XHRcdCYmIHRhZy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5pbmNsdWRlcygnZHJhZy1uLWRyb3AnKVxyXG5cdH0sXHJcblx0e1xyXG5cdFx0bmFtZTogJ2hyJyxcclxuXHRcdGZpbHRlcjogdGFnID0+ICQodGFnKS5oYXNDbGFzcygnaG9yaXpvbnRhbC1saW5lJylcclxuXHRcdFx0fHwgJCh0YWcpLmhhc0NsYXNzKCd2ZXJ0aWNhbC1saW5lJylcclxuXHR9XHJcbl07XHJcblxyXG5mdW5jdGlvbiBnZXRTdHlsZShlbCwgc3R5bGVQcm9wKSB7XHJcblx0dmFsdWUgPSBcIlwiO1xyXG5cdC8vdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWwpO1xyXG5cdGlmIChlbC5zdHlsZSAmJiBlbC5zdHlsZS5sZW5ndGggPiAwICYmIGVsLnN0eWxlW3N0eWxlUHJvcF0pLy9jaGVjayBpbmxpbmVcclxuXHRcdHZhciB2YWx1ZSA9IGVsLnN0eWxlW3N0eWxlUHJvcF07XHJcblx0ZWxzZVxyXG5cdFx0aWYgKGVsLmN1cnJlbnRTdHlsZSlcdC8vY2hlY2sgZGVmaW5lZCBjc3NcclxuXHRcdFx0dmFyIHZhbHVlID0gZWwuY3VycmVudFN0eWxlW3N0eWxlUHJvcF07XHJcblx0XHRlbHNlIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xyXG5cdFx0XHR2YXIgdmFsdWUgPSBkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXREZWZhdWx0Q29tcHV0ZWRTdHlsZSA/XHJcblx0XHRcdFx0ZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0RGVmYXVsdENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoc3R5bGVQcm9wKSA6XHJcblx0XHRcdFx0d2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoc3R5bGVQcm9wKTtcclxuXHRcdH1cclxuXHJcblx0cmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5pZiAoVnZ2ZWIgPT09IHVuZGVmaW5lZCkgdmFyIFZ2dmViID0ge307XHJcblxyXG5WdnZlYi5kZWZhdWx0Q29tcG9uZW50ID0gXCJfYmFzZVwiO1xyXG5WdnZlYi5wcmVzZXJ2ZVByb3BlcnR5U2VjdGlvbnMgPSB0cnVlO1xyXG5cclxuVnZ2ZWIuYmFzZVVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgPyBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYy5yZXBsYWNlKC9bXlxcL10qP1xcLmpzJC8sICcnKSA6ICcnO1xyXG5cclxuVnZ2ZWIuQ29tcG9uZW50c0dyb3VwID0ge307XHJcblxyXG5WdnZlYi5Db21wb25lbnRzID0ge1xyXG5cdF9jb21wb25lbnRzOiB7fSxcclxuXHJcblx0X25vZGVzTG9va3VwOiB7fSxcclxuXHJcblx0X2F0dHJpYnV0ZXNMb29rdXA6IHt9LFxyXG5cclxuXHRfY2xhc3Nlc0xvb2t1cDoge30sXHJcblxyXG5cdF9jbGFzc2VzUmVnZXhMb29rdXA6IHt9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAodXJsKSB7XHJcblx0fSxcclxuXHJcblx0Z2V0OiBmdW5jdGlvbiAodHlwZSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NvbXBvbmVudHNbdHlwZV07XHJcblx0fSxcclxuXHJcblx0YWRkOiBmdW5jdGlvbiAodHlwZSwgZGF0YSkge1xyXG5cdFx0ZGF0YS50eXBlID0gdHlwZTtcclxuXHJcblx0XHR0aGlzLl9jb21wb25lbnRzW3R5cGVdID0gZGF0YTtcclxuXHJcblx0XHRpZiAoZGF0YS5ub2Rlcykge1xyXG5cdFx0XHRmb3IgKHZhciBpIGluIGRhdGEubm9kZXMpIHtcclxuXHRcdFx0XHR0aGlzLl9ub2Rlc0xvb2t1cFtkYXRhLm5vZGVzW2ldXSA9IGRhdGE7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZGF0YS5hdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGlmIChkYXRhLmF0dHJpYnV0ZXMuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSBpbiBkYXRhLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRcdHRoaXMuX2F0dHJpYnV0ZXNMb29rdXBbZGF0YS5hdHRyaWJ1dGVzW2ldXSA9IGRhdGE7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGZvciAodmFyIGkgaW4gZGF0YS5hdHRyaWJ1dGVzKSB7XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIHRoaXMuX2F0dHJpYnV0ZXNMb29rdXBbaV0gPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuX2F0dHJpYnV0ZXNMb29rdXBbaV0gPSB7fTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoZGF0YS5hdHRyaWJ1dGVzW2ldLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xyXG5cdFx0XHRcdFx0XHQvLyDmlK/mjIF0ZXh0aW5wdXTkuK3kuI3lkIznmoTovpPlhaXnsbvlnothdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBbJ3RleHQnLCAncGFzc3dvcmQnXSB9LFxyXG5cdFx0XHRcdFx0XHRkYXRhLmF0dHJpYnV0ZXNbaV0uZm9yRWFjaCh2YWx1ZSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlc0xvb2t1cFtpXVt2YWx1ZV0gPSBkYXRhO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuX2F0dHJpYnV0ZXNMb29rdXBbaV1bZGF0YS5hdHRyaWJ1dGVzW2ldXSA9IGRhdGE7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGRhdGEuY2xhc3Nlcykge1xyXG5cdFx0XHRmb3IgKHZhciBpIGluIGRhdGEuY2xhc3Nlcykge1xyXG5cdFx0XHRcdHRoaXMuX2NsYXNzZXNMb29rdXBbZGF0YS5jbGFzc2VzW2ldXSA9IGRhdGE7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZGF0YS5jbGFzc2VzUmVnZXgpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBkYXRhLmNsYXNzZXNSZWdleCkge1xyXG5cdFx0XHRcdHRoaXMuX2NsYXNzZXNSZWdleExvb2t1cFtkYXRhLmNsYXNzZXNSZWdleFtpXV0gPSBkYXRhO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZXh0ZW5kOiBmdW5jdGlvbiAoaW5oZXJpdFR5cGUsIHR5cGUsIGRhdGEpIHtcclxuXHJcblx0XHRuZXdEYXRhID0gZGF0YTtcclxuXHJcblx0XHRpZiAoaW5oZXJpdERhdGEgPSB0aGlzLl9jb21wb25lbnRzW2luaGVyaXRUeXBlXSkge1xyXG5cdFx0XHRuZXdEYXRhID0gJC5leHRlbmQodHJ1ZSwge30sIGluaGVyaXREYXRhLCBkYXRhKTtcclxuXHRcdFx0bmV3RGF0YS5wcm9wZXJ0aWVzID0gJC5tZXJnZSgkLm1lcmdlKFtdLCBpbmhlcml0RGF0YS5wcm9wZXJ0aWVzID8gaW5oZXJpdERhdGEucHJvcGVydGllcyA6IFtdKSwgZGF0YS5wcm9wZXJ0aWVzID8gZGF0YS5wcm9wZXJ0aWVzIDogW10pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vc29ydCBieSBvcmRlclxyXG5cdFx0bmV3RGF0YS5wcm9wZXJ0aWVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBhLnNvcnQgPT09IFwidW5kZWZpbmVkXCIpIGEuc29ydCA9IDA7XHJcblx0XHRcdGlmICh0eXBlb2YgYi5zb3J0ID09PSBcInVuZGVmaW5lZFwiKSBiLnNvcnQgPSAwO1xyXG5cclxuXHRcdFx0aWYgKGEuc29ydCA8IGIuc29ydClcclxuXHRcdFx0XHRyZXR1cm4gLTE7XHJcblx0XHRcdGlmIChhLnNvcnQgPiBiLnNvcnQpXHJcblx0XHRcdFx0cmV0dXJuIDE7XHJcblx0XHRcdHJldHVybiAwO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdHRoaXMuYWRkKHR5cGUsIG5ld0RhdGEpO1xyXG5cdH0sXHJcblxyXG5cclxuXHRtYXRjaE5vZGU6IGZ1bmN0aW9uIChub2RlKSB7XHJcblx0XHRpZiAoJChub2RlKS5hdHRyKGRhdGFDb21wb25lbnRJZCkgJiYgdGhpcy5fY29tcG9uZW50c1skKG5vZGUpLmF0dHIoZGF0YUNvbXBvbmVudElkKV0pIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2NvbXBvbmVudHNbJChub2RlKS5hdHRyKGRhdGFDb21wb25lbnRJZCldO1xyXG5cdFx0fSBlbHNlIGlmICgkKG5vZGUpLmF0dHIoJ3R5cGUnKSA9PSAncmFkaW8nIHx8ICQobm9kZSkuYXR0cigndHlwZScpID09ICdjaGVja2JveCcpIHtcclxuXHRcdFx0Y29uc3QgJHBhcmVudCA9ICQobm9kZSkucGFyZW50KCk7XHJcblx0XHRcdGlmICgkcGFyZW50LmF0dHIoZGF0YUNvbXBvbmVudElkKSAmJiB0aGlzLl9jb21wb25lbnRzWyRwYXJlbnQuYXR0cihkYXRhQ29tcG9uZW50SWQpXSkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLl9jb21wb25lbnRzWyRwYXJlbnQuYXR0cihkYXRhQ29tcG9uZW50SWQpXVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG5vZGUuYXR0cmlidXRlcy5sZW5ndGgpIHtcclxuXHRcdFx0Ly9zZWFyY2ggZm9yIGF0dHJpYnV0ZXNcclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBub2RlLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRhdHRyID0gbm9kZS5hdHRyaWJ1dGVzW2ldLm5hbWU7XHJcblx0XHRcdFx0dmFsdWUgPSBub2RlLmF0dHJpYnV0ZXNbaV0udmFsdWU7XHJcblxyXG5cdFx0XHRcdGlmIChhdHRyIGluIHRoaXMuX2F0dHJpYnV0ZXNMb29rdXApIHtcclxuXHRcdFx0XHRcdGNvbXBvbmVudCA9IHRoaXMuX2F0dHJpYnV0ZXNMb29rdXBbYXR0cl07XHJcblxyXG5cdFx0XHRcdFx0Ly9jdXJyZW50bHkgd2UgY2hlY2sgdGhhdCBpcyBub3QgYSBjb21wb25lbnQgYnkgbG9va2luZyBhdCBuYW1lIGF0dHJpYnV0ZVxyXG5cdFx0XHRcdFx0Ly9pZiB3ZSBoYXZlIGEgY29sbGVjdGlvbiBvZiBvYmplY3RzIGl0IG1lYW5zIHRoYXQgYXR0cmlidXRlIHZhbHVlIG11c3QgYmUgY2hlY2tlZFxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBjb21wb25lbnRbXCJuYW1lXCJdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdFx0XHRcdGlmICh2YWx1ZSBpbiBjb21wb25lbnQpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gY29tcG9uZW50W3ZhbHVlXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlXHJcblx0XHRcdFx0XHRcdHJldHVybiBjb21wb25lbnQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpIGluIG5vZGUuYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdGF0dHIgPSBub2RlLmF0dHJpYnV0ZXNbaV0ubmFtZTtcclxuXHRcdFx0XHR2YWx1ZSA9IG5vZGUuYXR0cmlidXRlc1tpXS52YWx1ZTtcclxuXHJcblx0XHRcdFx0Ly9jaGVjayBmb3Igbm9kZSBjbGFzc2VzXHJcblx0XHRcdFx0aWYgKGF0dHIgPT0gXCJjbGFzc1wiKSB7XHJcblx0XHRcdFx0XHRjbGFzc2VzID0gdmFsdWUuc3BsaXQoXCIgXCIpO1xyXG5cclxuXHRcdFx0XHRcdGZvciAoaiBpbiBjbGFzc2VzKSB7XHJcblx0XHRcdFx0XHRcdGlmIChjbGFzc2VzW2pdIGluIHRoaXMuX2NsYXNzZXNMb29rdXApXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2NsYXNzZXNMb29rdXBbY2xhc3Nlc1tqXV07XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Zm9yIChyZWdleCBpbiB0aGlzLl9jbGFzc2VzUmVnZXhMb29rdXApIHtcclxuXHRcdFx0XHRcdFx0cmVnZXhPYmogPSBuZXcgUmVnRXhwKHJlZ2V4KTtcclxuXHRcdFx0XHRcdFx0aWYgKHJlZ2V4T2JqLmV4ZWModmFsdWUpKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2NsYXNzZXNSZWdleExvb2t1cFtyZWdleF07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0YWdOYW1lID0gbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRpZiAodGFnTmFtZSBpbiB0aGlzLl9ub2Rlc0xvb2t1cCkgcmV0dXJuIHRoaXMuX25vZGVzTG9va3VwW3RhZ05hbWVdO1xyXG5cclxuXHRcdC8vcmV0dXJuIGZhbHNlO1xyXG5cdFx0cmV0dXJuIHRoaXMuZ2V0KFZ2dmViLmRlZmF1bHRDb21wb25lbnQpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24gKHR5cGUpIHtcclxuXHJcblx0XHRjb21wb25lbnQgPSB0aGlzLl9jb21wb25lbnRzW3R5cGVdO1xyXG5cclxuXHRcdHJpZ2h0UGFuZWwgPSBqUXVlcnkoXCIjcmlnaHQtcGFuZWwgI2NvbXBvbmVudC1wcm9wZXJ0aWVzXCIpO1xyXG5cdFx0c2VjdGlvbiA9IHJpZ2h0UGFuZWwuZmluZCgnLnNlY3Rpb25bZGF0YS1zZWN0aW9uPVwiZGVmYXVsdFwiXScpO1xyXG5cclxuXHRcdGlmICghKFZ2dmViLnByZXNlcnZlUHJvcGVydHlTZWN0aW9ucyAmJiBzZWN0aW9uLmxlbmd0aCkpIHtcclxuXHRcdFx0cmlnaHRQYW5lbC5odG1sKCcnKS5hcHBlbmQodG1wbChcInZ2dmViLWlucHV0LXNlY3Rpb25pbnB1dFwiLCB7IGtleTogXCJkZWZhdWx0XCIsIGhlYWRlcjogY29tcG9uZW50Lm5hbWUgfSkpO1xyXG5cdFx0XHRzZWN0aW9uID0gcmlnaHRQYW5lbC5maW5kKFwiLnNlY3Rpb25cIik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmlnaHRQYW5lbC5maW5kKCdbZGF0YS1oZWFkZXI9XCJkZWZhdWx0XCJdIHNwYW4nKS5odG1sKGNvbXBvbmVudC5uYW1lKTtcclxuXHRcdHNlY3Rpb24uaHRtbChcIlwiKVxyXG5cclxuXHRcdGlmIChjb21wb25lbnQuYmVmb3JlSW5pdCkgY29tcG9uZW50LmJlZm9yZUluaXQoVnZ2ZWIuQnVpbGRlci5zZWxlY3RlZEVsLmdldCgwKSk7XHJcblxyXG5cdFx0Zm4gPSBmdW5jdGlvbiAoY29tcG9uZW50LCBwcm9wZXJ0eSkge1xyXG5cdFx0XHRyZXR1cm4gcHJvcGVydHkuaW5wdXQub24oJ3Byb3BlcnR5Q2hhbmdlJywgZnVuY3Rpb24gKGV2ZW50LCB2YWx1ZSwgaW5wdXQpIHtcclxuXHRcdFx0XHRlbGVtZW50ID0gVnZ2ZWIuQnVpbGRlci5zZWxlY3RlZEVsO1xyXG5cdFx0XHRcdGlmIChwcm9wZXJ0eS5jaGlsZCkgZWxlbWVudCA9IGVsZW1lbnQuZmluZChwcm9wZXJ0eS5jaGlsZCk7XHJcblx0XHRcdFx0aWYgKHByb3BlcnR5LnBhcmVudCkgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50KHByb3BlcnR5LnBhcmVudCk7XHJcblxyXG5cdFx0XHRcdGlmIChwcm9wZXJ0eS5vbkNoYW5nZSkge1xyXG5cdFx0XHRcdFx0ZWxlbWVudCA9IHByb3BlcnR5Lm9uQ2hhbmdlKGVsZW1lbnQsIHZhbHVlLCBpbnB1dCwgY29tcG9uZW50KTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5Lmh0bWxBdHRyKSB7XHJcblx0XHRcdFx0XHRvbGRWYWx1ZSA9IGVsZW1lbnQuYXR0cihwcm9wZXJ0eS5odG1sQXR0cik7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHByb3BlcnR5Lmh0bWxBdHRyID09ICd0ZXh0Jykge1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50LnRleHQodmFsdWUpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eS5odG1sQXR0ciA9PSBcImNsYXNzXCIgJiYgcHJvcGVydHkudmFsaWRWYWx1ZXMpIHtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudC5yZW1vdmVDbGFzcyhwcm9wZXJ0eS52YWxpZFZhbHVlcy5qb2luKFwiIFwiKSk7XHJcblx0XHRcdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LmFkZENsYXNzKHZhbHVlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKHByb3BlcnR5Lmh0bWxBdHRyID09IFwic3R5bGVcIikge1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5jc3MocHJvcGVydHkua2V5LCB2YWx1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQuYXR0cihwcm9wZXJ0eS5odG1sQXR0ciwgdmFsdWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdFx0XHR0eXBlOiAnYXR0cmlidXRlcycsXHJcblx0XHRcdFx0XHRcdHRhcmdldDogZWxlbWVudC5nZXQoMCksXHJcblx0XHRcdFx0XHRcdGF0dHJpYnV0ZU5hbWU6IHByb3BlcnR5Lmh0bWxBdHRyLFxyXG5cdFx0XHRcdFx0XHRvbGRWYWx1ZTogb2xkVmFsdWUsXHJcblx0XHRcdFx0XHRcdG5ld1ZhbHVlOiBlbGVtZW50LmF0dHIocHJvcGVydHkuaHRtbEF0dHIpXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChjb21wb25lbnQub25DaGFuZ2UpIHtcclxuXHRcdFx0XHRcdGVsZW1lbnQgPSBjb21wb25lbnQub25DaGFuZ2UoZWxlbWVudCwgcHJvcGVydHksIHZhbHVlLCBpbnB1dCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoIXByb3BlcnR5LmNoaWxkICYmICFwcm9wZXJ0eS5wYXJlbnQpIFZ2dmViLkJ1aWxkZXIuc2VsZWN0Tm9kZShlbGVtZW50KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdG5vZGVFbGVtZW50ID0gVnZ2ZWIuQnVpbGRlci5zZWxlY3RlZEVsO1xyXG5cclxuXHRcdGZvciAodmFyIGkgaW4gY29tcG9uZW50LnByb3BlcnRpZXMpIHtcclxuXHRcdFx0cHJvcGVydHkgPSBjb21wb25lbnQucHJvcGVydGllc1tpXTtcclxuXHJcblx0XHRcdGlmIChwcm9wZXJ0eS5iZWZvcmVJbml0KSBwcm9wZXJ0eS5iZWZvcmVJbml0KGVsZW1lbnQuZ2V0KDApKVxyXG5cclxuXHRcdFx0ZWxlbWVudCA9IG5vZGVFbGVtZW50O1xyXG5cdFx0XHRpZiAocHJvcGVydHkuY2hpbGQpIGVsZW1lbnQgPSBlbGVtZW50LmZpbmQocHJvcGVydHkuY2hpbGQpO1xyXG5cclxuXHRcdFx0aWYgKHByb3BlcnR5LmRhdGEpIHtcclxuXHRcdFx0XHRwcm9wZXJ0eS5kYXRhW1wia2V5XCJdID0gcHJvcGVydHkua2V5O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHByb3BlcnR5LmRhdGEgPSB7IFwia2V5XCI6IHByb3BlcnR5LmtleSB9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIHByb3BlcnR5Lmdyb3VwID09PSAndW5kZWZpbmVkJykgcHJvcGVydHkuZ3JvdXAgPSBudWxsO1xyXG5cclxuXHRcdFx0cHJvcGVydHkuaW5wdXQgPSBwcm9wZXJ0eS5pbnB1dHR5cGUuaW5pdChwcm9wZXJ0eS5kYXRhKTtcclxuXHJcblx0XHRcdGlmIChwcm9wZXJ0eS5pbml0KSB7XHJcblx0XHRcdFx0cHJvcGVydHkuaW5wdXR0eXBlLnNldFZhbHVlKHByb3BlcnR5LmluaXQoZWxlbWVudC5nZXQoMCkpKTtcclxuXHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eS5odG1sQXR0cikge1xyXG5cdFx0XHRcdGlmIChwcm9wZXJ0eS5odG1sQXR0ciA9PSAndGV4dCcpIHtcclxuXHRcdFx0XHRcdHZhbHVlID0gZWxlbWVudC50ZXh0KCk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eS5odG1sQXR0ciA9PSBcInN0eWxlXCIpIHtcclxuXHRcdFx0XHRcdC8vdmFsdWUgPSBlbGVtZW50LmNzcyhwcm9wZXJ0eS5rZXkpOy8vanF1ZXJ5IGNzcyByZXR1cm5zIGNvbXB1dGVkIHN0eWxlXHJcblx0XHRcdFx0XHR2YWx1ZSA9IGdldFN0eWxlKGVsZW1lbnQuZ2V0KDApLCBwcm9wZXJ0eS5rZXkpOy8vZ2V0U3R5bGUgcmV0dXJucyBkZWNsYXJlZCBzdHlsZVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR2YWx1ZSA9IGVsZW1lbnQuYXR0cihwcm9wZXJ0eS5odG1sQXR0cik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvL2lmIGF0dHJpYnV0ZSBpcyBjbGFzcyBjaGVjayBpZiBvbmUgb2YgdmFsaWQgdmFsdWVzIGlzIGluY2x1ZGVkIGFzIGNsYXNzIHRvIHNldCB0aGUgc2VsZWN0XHJcblx0XHRcdFx0aWYgKHZhbHVlICYmIHByb3BlcnR5Lmh0bWxBdHRyID09IFwiY2xhc3NcIiAmJiBwcm9wZXJ0eS52YWxpZFZhbHVlcykge1xyXG5cdFx0XHRcdFx0dmFsdWUgPSB2YWx1ZS5zcGxpdChcIiBcIikuZmlsdGVyKGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcHJvcGVydHkudmFsaWRWYWx1ZXMuaW5kZXhPZihlbCkgIT0gLTFcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cHJvcGVydHkuaW5wdXR0eXBlLnNldFZhbHVlKHZhbHVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zm4oY29tcG9uZW50LCBwcm9wZXJ0eSk7XHJcblxyXG5cdFx0XHRpZiAocHJvcGVydHkuaW5wdXR0eXBlID09IFNlY3Rpb25JbnB1dCkge1xyXG5cdFx0XHRcdHNlY3Rpb24gPSByaWdodFBhbmVsLmZpbmQoJy5zZWN0aW9uW2RhdGEtc2VjdGlvbj1cIicgKyBwcm9wZXJ0eS5rZXkgKyAnXCJdJyk7XHJcblxyXG5cdFx0XHRcdGlmIChWdnZlYi5wcmVzZXJ2ZVByb3BlcnR5U2VjdGlvbnMgJiYgc2VjdGlvbi5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdHNlY3Rpb24uaHRtbChcIlwiKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cmlnaHRQYW5lbC5hcHBlbmQocHJvcGVydHkuaW5wdXQpO1xyXG5cdFx0XHRcdFx0c2VjdGlvbiA9IHJpZ2h0UGFuZWwuZmluZCgnLnNlY3Rpb25bZGF0YS1zZWN0aW9uPVwiJyArIHByb3BlcnR5LmtleSArICdcIl0nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0cm93ID0gJCh0bXBsKCd2dnZlYi1wcm9wZXJ0eScsIHByb3BlcnR5KSk7XHJcblx0XHRcdFx0cm93LmZpbmQoJy5pbnB1dCcpLmFwcGVuZChwcm9wZXJ0eS5pbnB1dCk7XHJcblx0XHRcdFx0c2VjdGlvbi5hcHBlbmQocm93KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjb21wb25lbnQuaW5pdCkgY29tcG9uZW50LmluaXQoVnZ2ZWIuQnVpbGRlci5zZWxlY3RlZEVsLmdldCgwKSk7XHJcblx0fVxyXG59O1xyXG5cclxuXHJcblxyXG5WdnZlYi5XeXNpd3lnRWRpdG9yID0ge1xyXG5cclxuXHRpc0FjdGl2ZTogZmFsc2UsXHJcblx0b2xkVmFsdWU6ICcnLFxyXG5cdGRvYzogZmFsc2UsXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkb2MpIHtcclxuXHRcdHRoaXMuZG9jID0gZG9jO1xyXG5cclxuXHRcdCQoXCIjYm9sZC1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRkb2MuZXhlY0NvbW1hbmQoJ2JvbGQnLCBmYWxzZSwgbnVsbCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNpdGFsaWMtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCdpdGFsaWMnLCBmYWxzZSwgbnVsbCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiN1bmRlcmxpbmUtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCd1bmRlcmxpbmUnLCBmYWxzZSwgbnVsbCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNzdHJpa2UtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCdzdHJpa2VUaHJvdWdoJywgZmFsc2UsIG51bGwpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjbGluay1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRkb2MuZXhlY0NvbW1hbmQoJ2NyZWF0ZUxpbmsnLCBmYWxzZSwgXCIjXCIpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHVuZG86IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHR0aGlzLmRvYy5leGVjQ29tbWFuZCgndW5kbycsIGZhbHNlLCBudWxsKTtcclxuXHR9LFxyXG5cclxuXHRyZWRvOiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5kb2MuZXhlY0NvbW1hbmQoJ3JlZG8nLCBmYWxzZSwgbnVsbCk7XHJcblx0fSxcclxuXHJcblx0ZWRpdDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdGVsZW1lbnQuYXR0cih7ICdjb250ZW50ZWRpdGFibGUnOiB0cnVlLCAnc3BlbGxjaGVja2tlcic6IGZhbHNlIH0pO1xyXG5cdFx0JChcIiN3eXNpd3lnLWVkaXRvclwiKS5zaG93KCk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuXHRcdHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xyXG5cdFx0dGhpcy5vbGRWYWx1ZSA9IGVsZW1lbnQuaHRtbCgpO1xyXG5cdH0sXHJcblxyXG5cdGRlc3Ryb3k6IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHRlbGVtZW50LnJlbW92ZUF0dHIoJ2NvbnRlbnRlZGl0YWJsZSBzcGVsbGNoZWNra2VyJyk7XHJcblx0XHQkKFwiI3d5c2l3eWctZWRpdG9yXCIpLmhpZGUoKTtcclxuXHRcdHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHJcblxyXG5cdFx0bm9kZSA9IHRoaXMuZWxlbWVudC5nZXQoMCk7XHJcblx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0dHlwZTogJ2NoYXJhY3RlckRhdGEnLFxyXG5cdFx0XHR0YXJnZXQ6IG5vZGUsXHJcblx0XHRcdG9sZFZhbHVlOiB0aGlzLm9sZFZhbHVlLFxyXG5cdFx0XHRuZXdWYWx1ZTogbm9kZS5pbm5lckhUTUxcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuVnZ2ZWIuQnVpbGRlciA9IHtcclxuXHJcblx0ZHJhZ01vdmVNdXRhdGlvbjogZmFsc2UsXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uICh1cmwsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0c2VsZiA9IHRoaXM7XHJcblxyXG5cdFx0c2VsZi5sb2FkQ29udHJvbEdyb3VwcygpO1xyXG5cclxuXHRcdHNlbGYuc2VsZWN0ZWRFbCA9IG51bGw7XHJcblx0XHRzZWxmLmhpZ2hsaWdodEVsID0gbnVsbDtcclxuXHRcdHNlbGYuaW5pdENhbGxiYWNrID0gY2FsbGJhY2s7XHJcblxyXG5cdFx0c2VsZi5kb2N1bWVudEZyYW1lID0gJChcIiNpZnJhbWUtd3JhcHBlciA+IGlmcmFtZVwiKTtcclxuXHRcdHNlbGYuY2FudmFzID0gJChcIiNjYW52YXNcIik7XHJcblxyXG5cdFx0c2VsZi5fbG9hZElmcmFtZSh1cmwpO1xyXG5cclxuXHRcdHNlbGYuX2luaXREcmFnZHJvcCgpO1xyXG5cclxuXHRcdHNlbGYuZHJhZ0VsZW1lbnQgPSBudWxsO1xyXG5cdH0sXHJcblxyXG5cdC8qIGNvbnRyb2xzICovXHJcblx0bG9hZENvbnRyb2xHcm91cHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRjb21wb25lbnRzTGlzdCA9ICQoXCIjY29tcG9uZW50cy1saXN0XCIpO1xyXG5cdFx0Y29tcG9uZW50c0xpc3QuZW1wdHkoKTtcclxuXHJcblx0XHRmb3IgKGdyb3VwIGluIFZ2dmViLkNvbXBvbmVudHNHcm91cCkge1xyXG5cdFx0XHRjb21wb25lbnRzTGlzdC5hcHBlbmQoJzxsaSBjbGFzcz1cImhlYWRlclwiIGRhdGEtc2VjdGlvbj1cIicgKyBncm91cCArICdcIiAgZGF0YS1zZWFyY2g9XCJcIj48bGFiZWwgY2xhc3M9XCJoZWFkZXJcIiBmb3I9XCJjb21waGVhZF8nICsgZ3JvdXAgKyAnXCI+JyArIGdyb3VwICsgJyAgPGRpdiBjbGFzcz1cImhlYWRlci1hcnJvd1wiPjwvZGl2PlxcXHJcblx0XHRcdFx0XHRcdFx0XHQgICA8L2xhYmVsPjxpbnB1dCBjbGFzcz1cImhlYWRlcl9jaGVja1wiIHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJ0cnVlXCIgaWQ9XCJjb21waGVhZF8nICsgZ3JvdXAgKyAnXCI+ICA8b2w+PC9vbD48L2xpPicpO1xyXG5cclxuXHRcdFx0Y29tcG9uZW50c1N1Ykxpc3QgPSBjb21wb25lbnRzTGlzdC5maW5kKCdsaVtkYXRhLXNlY3Rpb249XCInICsgZ3JvdXAgKyAnXCJdICBvbCcpO1xyXG5cclxuXHRcdFx0Y29tcG9uZW50cyA9IFZ2dmViLkNvbXBvbmVudHNHcm91cFtncm91cF07XHJcblxyXG5cdFx0XHRmb3IgKGkgaW4gY29tcG9uZW50cykge1xyXG5cdFx0XHRcdGNvbXBvbmVudFR5cGUgPSBjb21wb25lbnRzW2ldO1xyXG5cdFx0XHRcdGNvbXBvbmVudCA9IFZ2dmViLkNvbXBvbmVudHMuZ2V0KGNvbXBvbmVudFR5cGUpO1xyXG5cclxuXHRcdFx0XHRpZiAoY29tcG9uZW50KSB7XHJcblx0XHRcdFx0XHRpdGVtID0gJCgnPGxpIGRhdGEtc2VjdGlvbj1cIicgKyBncm91cCArICdcIiBkYXRhLXR5cGU9XCInICsgY29tcG9uZW50VHlwZSArICdcIiBkYXRhLXNlYXJjaD1cIicgKyBjb21wb25lbnQubmFtZS50b0xvd2VyQ2FzZSgpICsgJ1wiPjxhIGhyZWY9XCIjXCI+JyArIGNvbXBvbmVudC5uYW1lICsgXCI8L2E+PC9saT5cIik7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGNvbXBvbmVudC5pbWFnZSkge1xyXG5cclxuXHRcdFx0XHRcdFx0aXRlbS5jc3Moe1xyXG5cdFx0XHRcdFx0XHRcdGJhY2tncm91bmRJbWFnZTogXCJ1cmwoXCIgKyAnbGlicy9idWlsZGVyLycgKyBjb21wb25lbnQuaW1hZ2UgKyBcIilcIixcclxuXHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kUmVwZWF0OiBcIm5vLXJlcGVhdFwiXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Y29tcG9uZW50c1N1Ykxpc3QuYXBwZW5kKGl0ZW0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0bG9hZFVybDogZnVuY3Rpb24gKHVybCkge1xyXG5cdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cdFx0c2VsZi5pZnJhbWUuc3JjID0gdXJsO1xyXG5cdH0sXHJcblxyXG5cdC8qIGlmcmFtZSAqL1xyXG5cdF9sb2FkSWZyYW1lOiBmdW5jdGlvbiAodXJsKSB7XHJcblxyXG5cdFx0c2VsZi5pZnJhbWUgPSB0aGlzLmRvY3VtZW50RnJhbWUuZ2V0KDApO1xyXG5cdFx0c2VsZi5pZnJhbWUuc3JjID0gdXJsO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmRvY3VtZW50RnJhbWUub24oXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdHdpbmRvdy5GcmFtZVdpbmRvdyA9IHNlbGYuaWZyYW1lLmNvbnRlbnRXaW5kb3c7XHJcblx0XHRcdHdpbmRvdy5GcmFtZURvY3VtZW50ID0gc2VsZi5pZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcclxuXHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IuaW5pdCh3aW5kb3cuRnJhbWVEb2N1bWVudCk7XHJcblx0XHRcdGlmIChzZWxmLmluaXRDYWxsYmFjaykgc2VsZi5pbml0Q2FsbGJhY2soKTtcclxuXHJcblx0XHRcdHJldHVybiBzZWxmLl9mcmFtZUxvYWRlZCgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdF9mcmFtZUxvYWRlZDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHNlbGYuZnJhbWVEb2MgPSAkKHdpbmRvdy5GcmFtZURvY3VtZW50KTtcclxuXHRcdHNlbGYuZnJhbWVIdG1sID0gJCh3aW5kb3cuRnJhbWVEb2N1bWVudCkuZmluZChcImh0bWxcIik7XHJcblx0XHRzZWxmLmZyYW1lQm9keSA9ICQod2luZG93LkZyYW1lRG9jdW1lbnQpLmZpbmQoXCJib2R5XCIpO1xyXG5cclxuXHRcdHRoaXMuX2luaXRIaWdodGxpZ2h0KCk7XHJcblx0fSxcclxuXHJcblx0X2dldEVsZW1lbnRUeXBlOiBmdW5jdGlvbiAoZWwpIHtcclxuXHJcblx0XHQvL3NlYXJjaCBmb3IgY29tcG9uZW50IGF0dHJpYnV0ZVxyXG5cdFx0Y29tcG9uZW50TmFtZSA9ICcnO1xyXG5cclxuXHRcdGlmIChlbC5hdHRyaWJ1dGVzKVxyXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBqKyspIHtcclxuXHJcblx0XHRcdFx0aWYgKGVsLmF0dHJpYnV0ZXNbal0ubm9kZU5hbWUuaW5kZXhPZignZGF0YS1jb21wb25lbnQnKSA+IC0xKSB7XHJcblx0XHRcdFx0XHRjb21wb25lbnROYW1lID0gZWwuYXR0cmlidXRlc1tqXS5ub2RlTmFtZS5yZXBsYWNlKCdkYXRhLWNvbXBvbmVudC0nLCAnJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbXBvbmVudE5hbWUgIT0gJycpIHJldHVybiBjb21wb25lbnROYW1lO1xyXG5cclxuXHRcdGlmIChlbC5hdHRyaWJ1dGVzKVxyXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBqKyspIHtcclxuXHJcblx0XHRcdFx0aWYgKGVsLmF0dHJpYnV0ZXNbal0ubm9kZU5hbWUuaW5kZXhPZignZGF0YS1jb21wb25lbnQnKSA+IC0xKSB7XHJcblx0XHRcdFx0XHRjb21wb25lbnROYW1lID0gZWwuYXR0cmlidXRlc1tqXS5ub2RlTmFtZS5yZXBsYWNlKCdkYXRhLWNvbXBvbmVudC0nLCAnJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbXBvbmVudE5hbWUgIT0gJycpIHJldHVybiBjb21wb25lbnROYW1lO1xyXG5cdFx0Ly9pZiAoY2xhc3NOYW1lKSByZXR1cm4gY29tcG9uZW50TmFtZTtcclxuXHRcdHJldHVybiBlbC50YWdOYW1lO1xyXG5cdH0sXHJcblxyXG5cdGxvYWROb2RlQ29tcG9uZW50OiBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0ZGF0YSA9IFZ2dmViLkNvbXBvbmVudHMubWF0Y2hOb2RlKG5vZGUpO1xyXG5cdFx0aWYgKGRhdGEpIFZ2dmViLkNvbXBvbmVudHMucmVuZGVyKGRhdGEudHlwZSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdHNlbGVjdE5vZGU6IGZ1bmN0aW9uIChub2RlID0gZmFsc2UpIHtcclxuXHJcblx0XHRpZiAoIW5vZGUpIHtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHNlbGYudGV4dGVkaXRFbCAmJiBzZWxmLnNlbGVjdGVkRWwuZ2V0KDApICE9IG5vZGUpIHtcclxuXHRcdFx0VnZ2ZWIuV3lzaXd5Z0VkaXRvci5kZXN0cm95KHNlbGYudGV4dGVkaXRFbCk7XHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLnJlbW92ZUNsYXNzKFwidGV4dC1lZGl0XCIpLmZpbmQoXCIjc2VsZWN0LWFjdGlvbnNcIikuc2hvdygpO1xyXG5cdFx0XHRzZWxmLnRleHRlZGl0RWwgPSBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlbGYuc2VsZWN0ZWRFbCA9IHRhcmdldCA9IGpRdWVyeShub2RlKTtcclxuXHRcdG9mZnNldCA9IHRhcmdldC5vZmZzZXQoKTtcclxuXHJcblxyXG5cdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuY3NzKFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJ0b3BcIjogb2Zmc2V0LnRvcCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsVG9wKCksXHJcblx0XHRcdFx0XCJsZWZ0XCI6IG9mZnNldC5sZWZ0IC0gc2VsZi5mcmFtZURvYy5zY3JvbGxMZWZ0KCksXHJcblx0XHRcdFx0XCJ3aWR0aFwiOiB0YXJnZXQub3V0ZXJXaWR0aCgpLFxyXG5cdFx0XHRcdFwiaGVpZ2h0XCI6IHRhcmdldC5vdXRlckhlaWdodCgpLFxyXG5cdFx0XHRcdFwiZGlzcGxheVwiOiBcImJsb2NrXCIsXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdGpRdWVyeShcIiNoaWdobGlnaHQtbmFtZVwiKS5odG1sKHNlbGYuX2dldEVsZW1lbnRUeXBlKG5vZGUpKTtcclxuXHJcblx0fSxcclxuXHJcblx0LyogaWZyYW1lIGhpZ2hsaWdodCAqL1xyXG5cdF9pbml0SGlnaHRsaWdodDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdG1vdmVFdmVudCA9IHsgdGFyZ2V0OiBudWxsLCB9O1xyXG5cclxuXHRcdHRoaXMuZnJhbWVCb2R5Lm9uKFwibW91c2Vtb3ZlIHRvdWNobW92ZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0Ly9kZWxheSBmb3IgaGFsZiBhIHNlY29uZCBpZiBkcmFnZ2luZyBvdmVyIHNhbWUgZWxlbWVudFxyXG5cdFx0XHQvLyBpZiAoZXZlbnQudGFyZ2V0ID09IG1vdmVFdmVudC50YXJnZXQgJiYgKChldmVudC50aW1lU3RhbXAgLSBtb3ZlRXZlbnQudGltZVN0YW1wKSA8IDUwMCkpIHJldHVybjtcclxuXHRcdFx0aWYgKGV2ZW50LnRhcmdldCkge1xyXG5cdFx0XHRcdG1vdmVFdmVudCA9IGV2ZW50O1xyXG5cclxuXHRcdFx0XHRzZWxmLmhpZ2hsaWdodEVsID0gdGFyZ2V0ID0galF1ZXJ5KGV2ZW50LnRhcmdldCk7XHJcblx0XHRcdFx0b2Zmc2V0ID0gdGFyZ2V0Lm9mZnNldCgpO1xyXG5cdFx0XHRcdHdpZHRoID0gdGFyZ2V0Lm91dGVyV2lkdGgoKTtcclxuXHRcdFx0XHRoZWlnaHQgPSB0YXJnZXQub3V0ZXJIZWlnaHQoKTtcclxuXHJcblx0XHRcdFx0aWYgKHNlbGYuaXNEcmFnZ2luZykge1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnRWxlbWVudC5jc3Moe1xyXG5cdFx0XHRcdFx0XHRkaXNwbGF5OiAnbm9uZSdcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0cGFyZW50ID0gc2VsZi5oaWdobGlnaHRFbDtcclxuXHRcdFx0XHRcdHBhcmVudE9mZnNldCA9IHNlbGYuZHJhZ0VsZW1lbnQub2Zmc2V0KCk7XHJcblx0XHRcdFx0XHQvLyB0cnkge1xyXG5cdFx0XHRcdFx0Ly8gXHRzZWxmLmRyYWdFbGVtZW50LmNzcyh7XHJcblx0XHRcdFx0XHQvLyBcdFx0ZGlzcGxheTogJ25vbmUnXHJcblx0XHRcdFx0XHQvLyBcdH0pO1xyXG5cdFx0XHRcdFx0Ly8gXHRpZiAoZXZlbnQub3JpZ2luYWxFdmVudCAmJiAob2Zmc2V0LmxlZnQgPiAoZXZlbnQub3JpZ2luYWxFdmVudC54IC0gMTApKSkge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdGlmIChvZmZzZXQudG9wID4gKGV2ZW50Lm9yaWdpbmFsRXZlbnQueSAtIDEwKSkge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0cGFyZW50LmJlZm9yZShzZWxmLmRyYWdFbGVtZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0cGFyZW50LnByZXBlbmQoc2VsZi5kcmFnRWxlbWVudCk7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRzZWxmLmRyYWdFbGVtZW50LnByZXBlbmRUbyhwYXJlbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdH1cclxuXHRcdFx0XHRcdC8vIFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRpZiAoZXZlbnQub3JpZ2luYWxFdmVudCAmJiBvZmZzZXQudG9wID4gKChldmVudC5vcmlnaW5hbEV2ZW50LnkgLSAxMCkpKSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRwYXJlbnQuYmVmb3JlKHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRwYXJlbnQuYXBwZW5kKHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0c2VsZi5kcmFnRWxlbWVudC5hcHBlbmRUbyhwYXJlbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdH1cclxuXHRcdFx0XHRcdC8vIFx0fVxyXG5cdFx0XHRcdFx0Ly8gfSBjYXRjaCAoZXJyKSB7XHJcblx0XHRcdFx0XHQvLyBcdGNvbnNvbGUubG9nKGVycik7XHJcblx0XHRcdFx0XHQvLyB9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0XHRqUXVlcnkoXCIjaGlnaGxpZ2h0LWJveFwiKS5jc3MoXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcInRvcFwiOiBvZmZzZXQudG9wIC0gc2VsZi5mcmFtZURvYy5zY3JvbGxUb3AoKSxcclxuXHRcdFx0XHRcdFx0XHRcImxlZnRcIjogb2Zmc2V0LmxlZnQgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbExlZnQoKSxcclxuXHRcdFx0XHRcdFx0XHRcIndpZHRoXCI6IHdpZHRoLFxyXG5cdFx0XHRcdFx0XHRcdFwiaGVpZ2h0XCI6IGhlaWdodCxcclxuXHRcdFx0XHRcdFx0XHRcImRpc3BsYXlcIjogZXZlbnQudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJykgPyBcIm5vbmVcIiA6IFwiYmxvY2tcIlxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRqUXVlcnkoXCIjaGlnaGxpZ2h0LW5hbWVcIikuaHRtbChzZWxmLl9nZXRFbGVtZW50VHlwZShldmVudC50YXJnZXQpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHR0aGlzLmZyYW1lQm9keS5vbihcIm1vdXNldXAgdG91Y2hlbmRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGlmIChzZWxmLmlzRHJhZ2dpbmcpIHtcclxuXHRcdFx0XHRzZWxmLmlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0aWYgKGNvbXBvbmVudC5kcmFnSHRtbCkgLy9pZiBkcmFnSHRtbCBpcyBzZXQgZm9yIGRyYWdnaW5nIHRoZW4gc2V0IHJlYWwgY29tcG9uZW50IGh0bWxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRuZXdFbGVtZW50ID0gJChjb21wb25lbnQuaHRtbCk7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdFbGVtZW50LnJlcGxhY2VXaXRoKG5ld0VsZW1lbnQpO1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnRWxlbWVudCA9IG5ld0VsZW1lbnQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChjb21wb25lbnQuYWZ0ZXJEcm9wKSBzZWxmLmRyYWdFbGVtZW50ID0gY29tcG9uZW50LmFmdGVyRHJvcChzZWxmLmRyYWdFbGVtZW50KTtcclxuXHJcblx0XHRcdFx0bm9kZSA9IHNlbGYuZHJhZ0VsZW1lbnQuZ2V0KDApO1xyXG5cdFx0XHRcdHNlbGYuc2VsZWN0Tm9kZShub2RlKTtcclxuXHRcdFx0XHRzZWxmLmxvYWROb2RlQ29tcG9uZW50KG5vZGUpO1xyXG5cclxuXHRcdFx0XHRpZiAoc2VsZi5kcmFnTW92ZU11dGF0aW9uID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0XHRcdHR5cGU6ICdjaGlsZExpc3QnLFxyXG5cdFx0XHRcdFx0XHR0YXJnZXQ6IG5vZGUucGFyZW50Tm9kZSxcclxuXHRcdFx0XHRcdFx0YWRkZWROb2RlczogW25vZGVdLFxyXG5cdFx0XHRcdFx0XHRuZXh0U2libGluZzogbm9kZS5uZXh0U2libGluZ1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ01vdmVNdXRhdGlvbi5uZXdQYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdNb3ZlTXV0YXRpb24ubmV3TmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oc2VsZi5kcmFnTW92ZU11dGF0aW9uKTtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ01vdmVNdXRhdGlvbiA9IGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdHRoaXMuZnJhbWVCb2R5Lm9uKFwiZGJsY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRzZWxmLnRleHRlZGl0RWwgPSB0YXJnZXQgPSBqUXVlcnkoZXZlbnQudGFyZ2V0KTtcclxuXHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IuZWRpdChzZWxmLnRleHRlZGl0RWwpO1xyXG5cclxuXHRcdFx0c2VsZi50ZXh0ZWRpdEVsLmF0dHIoeyAnY29udGVudGVkaXRhYmxlJzogdHJ1ZSwgJ3NwZWxsY2hlY2trZXInOiBmYWxzZSB9KTtcclxuXHJcblx0XHRcdHNlbGYudGV4dGVkaXRFbC5vbihcImJsdXIga2V5dXAgcGFzdGUgaW5wdXRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmNzcyh7XHJcblx0XHRcdFx0XHRcIndpZHRoXCI6IHNlbGYudGV4dGVkaXRFbC5vdXRlcldpZHRoKCksXHJcblx0XHRcdFx0XHRcImhlaWdodFwiOiBzZWxmLnRleHRlZGl0RWwub3V0ZXJIZWlnaHQoKVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmFkZENsYXNzKFwidGV4dC1lZGl0XCIpLmZpbmQoXCIjc2VsZWN0LWFjdGlvbnNcIikuaGlkZSgpO1xyXG5cdFx0XHRqUXVlcnkoXCIjaGlnaGxpZ2h0LWJveFwiKS5oaWRlKCk7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0dGhpcy5mcmFtZUJvZHkub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50LnRhcmdldCkge1xyXG5cdFx0XHRcdGlmICghaXNQcmV2aWV3ICYmICEkKCcjYXR0cmlidXRlLXNldHRpbmdzJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcblx0XHRcdFx0XHQkKCcjYXR0cmlidXRlLXNldHRpbmdzJylcclxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKCdhY3RpdmUnKVxyXG5cdFx0XHRcdFx0XHQuc2libGluZ3MoKVxyXG5cdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdFx0JCgnI2xlZnQtcGFuZWwnKS5oaWRlKCk7XHJcblx0XHRcdFx0XHQkKCcjcmlnaHQtcGFuZWwnKS5zaG93KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHNlbGYuc2VsZWN0Tm9kZShldmVudC50YXJnZXQpO1xyXG5cdFx0XHRcdHNlbGYubG9hZE5vZGVDb21wb25lbnQoZXZlbnQudGFyZ2V0KTtcclxuXHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuZnJhbWVCb2R5LmtleWRvd24oZSA9PiB7XHJcblx0XHRcdGlmIChzZWxmLnNlbGVjdGVkRWwgJiYgc2VsZi5zZWxlY3RlZEVsLnByb3AoJ3RhZ05hbWUnKSAhPSAnQk9EWScpIHtcclxuXHRcdFx0XHRpZiAoZS53aGljaCA9PSAzNyB8fCBlLndoaWNoID09IDM4IHx8IGUud2hpY2ggPT0gMzkgfHwgZS53aGljaCA9PSA0MCkge1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lmcmFtZUlkJykuY29udGVudFdpbmRvdy5hcnJvd0tleU1vdmUoZS53aGljaCwgc2VsZi5zZWxlY3RlZEVsKTtcclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCB0aGUgZGVmYXVsdCBhY3Rpb24gKHNjcm9sbCAvIG1vdmUgY2FyZXQpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI2RyYWctYm94XCIpLm9uKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQgPSBzZWxmLnNlbGVjdGVkRWw7XHJcblx0XHRcdHNlbGYuaXNEcmFnZ2luZyA9IHRydWU7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5kcmFnRWxlbWVudC5nZXQoMCk7XHJcblxyXG5cclxuXHRcdFx0c2VsZi5kcmFnTW92ZU11dGF0aW9uID0ge1xyXG5cdFx0XHRcdHR5cGU6ICdtb3ZlJyxcclxuXHRcdFx0XHR0YXJnZXQ6IG5vZGUsXHJcblx0XHRcdFx0b2xkUGFyZW50OiBub2RlLnBhcmVudE5vZGUsXHJcblx0XHRcdFx0b2xkTmV4dFNpYmxpbmc6IG5vZGUubmV4dFNpYmxpbmdcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vc2VsZi5zZWxlY3ROb2RlKGZhbHNlKTtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNkb3duLWJveFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5zZWxlY3RlZEVsLmdldCgwKTtcclxuXHRcdFx0b2xkUGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRvbGROZXh0U2libGluZyA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0XHRuZXh0ID0gc2VsZi5zZWxlY3RlZEVsLm5leHQoKTtcclxuXHJcblx0XHRcdGlmIChuZXh0Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRuZXh0LmFmdGVyKHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c2VsZi5zZWxlY3RlZEVsLnBhcmVudCgpLmFmdGVyKHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG5ld1BhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0bmV3TmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0dHlwZTogJ21vdmUnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZSxcclxuXHRcdFx0XHRvbGRQYXJlbnQ6IG9sZFBhcmVudCxcclxuXHRcdFx0XHRuZXdQYXJlbnQ6IG5ld1BhcmVudCxcclxuXHRcdFx0XHRvbGROZXh0U2libGluZzogb2xkTmV4dFNpYmxpbmcsXHJcblx0XHRcdFx0bmV3TmV4dFNpYmxpbmc6IG5ld05leHRTaWJsaW5nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiN1cC1ib3hcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cclxuXHRcdFx0bm9kZSA9IHNlbGYuc2VsZWN0ZWRFbC5nZXQoMCk7XHJcblx0XHRcdG9sZFBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0b2xkTmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0bmV4dCA9IHNlbGYuc2VsZWN0ZWRFbC5wcmV2KCk7XHJcblxyXG5cdFx0XHRpZiAobmV4dC5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0bmV4dC5iZWZvcmUoc2VsZi5zZWxlY3RlZEVsKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzZWxmLnNlbGVjdGVkRWwucGFyZW50KCkuYmVmb3JlKHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG5ld1BhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0bmV3TmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0dHlwZTogJ21vdmUnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZSxcclxuXHRcdFx0XHRvbGRQYXJlbnQ6IG9sZFBhcmVudCxcclxuXHRcdFx0XHRuZXdQYXJlbnQ6IG5ld1BhcmVudCxcclxuXHRcdFx0XHRvbGROZXh0U2libGluZzogb2xkTmV4dFNpYmxpbmcsXHJcblx0XHRcdFx0bmV3TmV4dFNpYmxpbmc6IG5ld05leHRTaWJsaW5nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNjbG9uZS1ib3hcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0Y2xvbmUgPSBzZWxmLnNlbGVjdGVkRWwuY2xvbmUoKTtcclxuXHJcblx0XHRcdHNlbGYuc2VsZWN0ZWRFbC5hZnRlcihjbG9uZSk7XHJcblxyXG5cdFx0XHRzZWxmLnNlbGVjdGVkRWwgPSBjbG9uZS5jbGljaygpO1xyXG5cclxuXHRcdFx0bm9kZSA9IGNsb25lLmdldCgwKTtcclxuXHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0dHlwZTogJ2NoaWxkTGlzdCcsXHJcblx0XHRcdFx0dGFyZ2V0OiBub2RlLnBhcmVudE5vZGUsXHJcblx0XHRcdFx0YWRkZWROb2RlczogW25vZGVdLFxyXG5cdFx0XHRcdG5leHRTaWJsaW5nOiBub2RlLm5leHRTaWJsaW5nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNwYXJlbnQtYm94XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5zZWxlY3RlZEVsLnBhcmVudCgpLmdldCgwKTtcclxuXHJcblx0XHRcdHNlbGYuc2VsZWN0Tm9kZShub2RlKTtcclxuXHRcdFx0c2VsZi5sb2FkTm9kZUNvbXBvbmVudChub2RlKTtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjZGVsZXRlLWJveFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5zZWxlY3RlZEVsLmdldCgwKTtcclxuXHJcblx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdHR5cGU6ICdjaGlsZExpc3QnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZS5wYXJlbnROb2RlLFxyXG5cdFx0XHRcdHJlbW92ZWROb2RlczogW25vZGVdLFxyXG5cdFx0XHRcdG5leHRTaWJsaW5nOiBub2RlLm5leHRTaWJsaW5nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0c2VsZi5zZWxlY3RlZEVsLnJlbW92ZSgpO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0alF1ZXJ5KHdpbmRvdy5GcmFtZVdpbmRvdykub24oXCJzY3JvbGwgcmVzaXplXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuXHRcdFx0aWYgKHNlbGYuc2VsZWN0ZWRFbCkge1xyXG5cdFx0XHRcdG9mZnNldCA9IHNlbGYuc2VsZWN0ZWRFbC5vZmZzZXQoKTtcclxuXHJcblx0XHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuY3NzKFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcInRvcFwiOiBvZmZzZXQudG9wIC0gc2VsZi5mcmFtZURvYy5zY3JvbGxUb3AoKSxcclxuXHRcdFx0XHRcdFx0XCJsZWZ0XCI6IG9mZnNldC5sZWZ0IC0gc2VsZi5mcmFtZURvYy5zY3JvbGxMZWZ0KCksXHJcblx0XHRcdFx0XHRcdFwid2lkdGhcIjogc2VsZi5zZWxlY3RlZEVsLm91dGVyV2lkdGgoKSxcclxuXHRcdFx0XHRcdFx0XCJoZWlnaHRcIjogc2VsZi5zZWxlY3RlZEVsLm91dGVySGVpZ2h0KCksXHJcblx0XHRcdFx0XHRcdC8vXCJkaXNwbGF5XCI6IFwiYmxvY2tcIlxyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoc2VsZi5oaWdobGlnaHRFbCkge1xyXG5cdFx0XHRcdG9mZnNldCA9IHNlbGYuaGlnaGxpZ2h0RWwub2Zmc2V0KCk7XHJcblxyXG5cdFx0XHRcdGpRdWVyeShcIiNoaWdobGlnaHQtYm94XCIpLmNzcyhcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJ0b3BcIjogb2Zmc2V0LnRvcCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsVG9wKCksXHJcblx0XHRcdFx0XHRcdFwibGVmdFwiOiBvZmZzZXQubGVmdCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsTGVmdCgpLFxyXG5cdFx0XHRcdFx0XHRcIndpZHRoXCI6IHNlbGYuaGlnaGxpZ2h0RWwub3V0ZXJXaWR0aCgpLFxyXG5cdFx0XHRcdFx0XHRcImhlaWdodFwiOiBzZWxmLmhpZ2hsaWdodEVsLm91dGVySGVpZ2h0KCksXHJcblx0XHRcdFx0XHRcdC8vXCJkaXNwbGF5XCI6IFwiYmxvY2tcIlxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHR9LFxyXG5cclxuXHQvKiBkcmFnIGFuZCBkcm9wICovXHJcblx0X2luaXREcmFnZHJvcDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHNlbGYuaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cdFx0Y29tcG9uZW50ID0ge307XHJcblx0XHQkKCcjY29tcG9uZW50cyB1bCA+IGxpID4gb2wgPiBsaScpLm9uKFwibW91c2Vkb3duIHRvdWNoc3RhcnRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdCR0aGlzID0galF1ZXJ5KHRoaXMpO1xyXG5cclxuXHRcdFx0Ly8gJChcIiNjb21wb25lbnQtY2xvbmVcIikucmVtb3ZlKCk7XHJcblx0XHRcdGNvbXBvbmVudCA9IFZ2dmViLkNvbXBvbmVudHMuZ2V0KCR0aGlzLmRhdGEoXCJ0eXBlXCIpKTtcclxuXHJcblx0XHRcdGlmIChjb21wb25lbnQuZHJhZ0h0bWwpIHtcclxuXHRcdFx0XHRodG1sID0gY29tcG9uZW50LmRyYWdIdG1sO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGh0bWwgPSBjb21wb25lbnQuaHRtbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VsZi5kcmFnRWxlbWVudCA9ICQoaHRtbCk7XHJcblxyXG5cdFx0XHRpZiAoY29tcG9uZW50LmRyYWdTdGFydCkgc2VsZi5kcmFnRWxlbWVudCA9IGNvbXBvbmVudC5kcmFnU3RhcnQoc2VsZi5kcmFnRWxlbWVudCk7XHJcblxyXG5cdFx0XHRzZWxmLmlzRHJhZ2dpbmcgPSB0cnVlO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdCQoJ2JvZHknKS5vbignbW91c2V1cCB0b3VjaGVuZCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRpZiAoc2VsZi5pc0RyYWdnaW5nID09IHRydWUpIHtcclxuXHRcdFx0XHRzZWxmLmlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHRcdFx0XHQvLyAkKFwiI2NvbXBvbmVudC1jbG9uZVwiKS5yZW1vdmUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnYm9keScpLm9uKCdtb3VzZW1vdmUgdG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGlmIChzZWxmLmlzRHJhZ2dpbmcgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdGVsZW1lbnRNb3VzZUlzT3ZlciA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCAtIDYwLCBldmVudC5jbGllbnRZIC0gNDApO1xyXG5cdFx0XHRcdC8vaWYgZHJhZyBlbGVtZW50cyBob3ZlcnMgb3ZlciBpZnJhbWUgc3dpdGNoIHRvIGlmcmFtZSBtb3VzZW92ZXIgaGFuZGxlclx0XHJcblx0XHRcdFx0aWYgKGVsZW1lbnRNb3VzZUlzT3ZlciAmJiBlbGVtZW50TW91c2VJc092ZXIudGFnTmFtZSA9PSAnSUZSQU1FJykge1xyXG5cdFx0XHRcdFx0c2VsZi5mcmFtZUJvZHkudHJpZ2dlcihcIm1vdXNlbW92ZVwiLCBldmVudCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdHNlbGYuc2VsZWN0Tm9kZShmYWxzZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcjY29tcG9uZW50cyB1bCA+IG9sID4gbGkgPiBsaScpLm9uKFwibW91c2V1cCB0b3VjaGVuZFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0c2VsZi5pc0RyYWdnaW5nID0gZmFsc2U7XHJcblx0XHRcdC8vICQoXCIjY29tcG9uZW50LWNsb25lXCIpLnJlbW92ZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdGdldEJlYXV0aWZpZWRIdG1sKCkge1xyXG5cdFx0LypcclxuXHRcdC1JLCAtLWluZGVudC1pbm5lci1odG1sICAgICAgICAgICAgSW5kZW50IDxoZWFkPiBhbmQgPGJvZHk+IHNlY3Rpb25zLiBEZWZhdWx0IGlzIGZhbHNlLlxyXG5cdFx0LVUsIC0tdW5mb3JtYXR0ZWQgICAgICAgICAgICAgICAgICBMaXN0IG9mIHRhZ3MgKGRlZmF1bHRzIHRvIGlubGluZSkgdGhhdCBzaG91bGQgbm90IGJlIHJlZm9ybWF0dGVkXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgdXNlIGVtcHR5IGFycmF5IHRvIGRlbm90ZSB0aGF0IG5vIHRhZ3Mgc2hvdWxkIG5vdCBiZSByZWZvcm1hdHRlZFxyXG5cdFx0ICovXHJcblxyXG5cdFx0Y29uc3QgeyBkb2N0eXBlLCBodG1sIH0gPSB0aGlzLmdldEh0bWwoKTtcclxuXHRcdHJldHVybiBodG1sX2JlYXV0aWZ5KGAke2RvY3R5cGV9XHJcblx0XHRcdFx0XHRcdFx0ICAke2h0bWxHZW5lcmF0b3IoaHRtbCwgcmVtb3ZlVW51c2VkVGFncywgZW1wdHlDaGlsZHJlbiwgZ2VuZXJhdGVUYWJsZVNjcmlwdCl9YCxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHByZXNlcnZlX25ld2xpbmVzOiBmYWxzZSxcclxuXHRcdFx0XHRpbmRlbnRfaW5uZXJfaHRtbDogdHJ1ZSxcclxuXHRcdFx0XHR1bmZvcm1hdHRlZDogW11cclxuXHRcdFx0fSk7XHJcblx0fSxcclxuXHJcblx0Z2V0SHRtbDogZnVuY3Rpb24gKCkge1xyXG5cdFx0ZG9jID0gd2luZG93LkZyYW1lRG9jdW1lbnQ7XHJcblx0XHRjb25zdCBkb2N0eXBlID0gXCI8IURPQ1RZUEUgXCJcclxuXHRcdFx0KyBkb2MuZG9jdHlwZS5uYW1lXHJcblx0XHRcdCsgKGRvYy5kb2N0eXBlLnB1YmxpY0lkID8gJyBQVUJMSUMgXCInICsgZG9jLmRvY3R5cGUucHVibGljSWQgKyAnXCInIDogJycpXHJcblx0XHRcdCsgKCFkb2MuZG9jdHlwZS5wdWJsaWNJZCAmJiBkb2MuZG9jdHlwZS5zeXN0ZW1JZCA/ICcgU1lTVEVNJyA6ICcnKVxyXG5cdFx0XHQrIChkb2MuZG9jdHlwZS5zeXN0ZW1JZCA/ICcgXCInICsgZG9jLmRvY3R5cGUuc3lzdGVtSWQgKyAnXCInIDogJycpXHJcblx0XHRcdCsgXCI+XFxuXCI7XHJcblx0XHRjb25zdCBodG1sID0gYCR7ZG9jdHlwZX1cclxuXHRcdFx0XHRcdCAgPGh0bWw+XHJcblx0XHRcdFx0XHRcdCAgJHtkb2MuZG9jdW1lbnRFbGVtZW50LmlubmVySFRNTH1cclxuXHRcdFx0XHRcdCAgPC9odG1sPmA7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRkb2N0eXBlLFxyXG5cdFx0XHRodG1sXHJcblx0XHR9O1xyXG5cdH0sXHJcblxyXG5cdHNldEh0bWw6IGZ1bmN0aW9uIChodG1sKSB7XHJcblx0XHQvL3VwZGF0ZSBvbmx5IGJvZHkgdG8gYXZvaWQgYnJlYWtpbmcgaWZyYW1lIGNzcy9qcyByZWxhdGl2ZSBwYXRoc1xyXG5cdFx0c3RhcnQgPSBodG1sLmluZGV4T2YoXCI8Ym9keVwiKTtcclxuXHRcdGVuZCA9IGh0bWwuaW5kZXhPZihcIjwvYm9keVwiKTtcclxuXHJcblx0XHRpZiAoc3RhcnQgPj0gMCAmJiBlbmQgPj0gMCkge1xyXG5cdFx0XHRib2R5ID0gaHRtbC5zbGljZShodG1sLmluZGV4T2YoXCI+XCIsIHN0YXJ0KSArIDEsIGVuZCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRib2R5ID0gaHRtbFxyXG5cdFx0fVxyXG5cclxuXHRcdC8vc2VsZi5mcmFtZUJvZHkuaHRtbChib2R5KTtcclxuXHRcdHdpbmRvdy5GcmFtZURvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gYm9keTtcclxuXHJcblx0XHQvL2JlbG93IG1ldGhvZHMgYnJha2UgZG9jdW1lbnQgcmVsYXRpdmUgY3NzIGFuZCBqcyBwYXRoc1xyXG5cdFx0Ly9yZXR1cm4gc2VsZi5pZnJhbWUub3V0ZXJIVE1MID0gaHRtbDtcclxuXHRcdC8vcmV0dXJuIHNlbGYuZG9jdW1lbnRGcmFtZS5odG1sKGh0bWwpO1xyXG5cdFx0Ly9yZXR1cm4gc2VsZi5kb2N1bWVudEZyYW1lLmF0dHIoXCJzcmNkb2NcIiwgaHRtbCk7XHJcblx0fVxyXG59O1xyXG5cclxuVnZ2ZWIuQ29kZUVkaXRvciA9IHtcclxuXHJcblx0aXNBY3RpdmU6IGZhbHNlLFxyXG5cdG9sZFZhbHVlOiAnJyxcclxuXHRkb2M6IGZhbHNlLFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZG9jKSB7XHJcblx0XHQkKFwiI3Z2dmViLWNvZGUtZWRpdG9yIHRleHRhcmVhXCIpLnZhbChWdnZlYi5CdWlsZGVyLmdldEJlYXV0aWZpZWRIdG1sKCkpO1xyXG5cclxuXHRcdCQoXCIjdnZ2ZWItY29kZS1lZGl0b3IgdGV4dGFyZWFcIikua2V5dXAoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRkZWxheShWdnZlYi5CdWlsZGVyLnNldEh0bWwodGhpcy52YWx1ZSksIDEwMDApO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly9sb2FkIGNvZGUgb24gZG9jdW1lbnQgY2hhbmdlc1xyXG5cdFx0VnZ2ZWIuQnVpbGRlci5mcmFtZUJvZHkub24oXCJ2dnZlYi51bmRvLmFkZCB2dnZlYi51bmRvLnJlc3RvcmVcIiwgZnVuY3Rpb24gKGUpIHsgVnZ2ZWIuQ29kZUVkaXRvci5zZXRWYWx1ZSgpOyB9KTtcclxuXHRcdC8vbG9hZCBjb2RlIHdoZW4gYSBuZXcgdXJsIGlzIGxvYWRlZFxyXG5cdFx0VnZ2ZWIuQnVpbGRlci5kb2N1bWVudEZyYW1lLm9uKFwibG9hZFwiLCBmdW5jdGlvbiAoZSkgeyBWdnZlYi5Db2RlRWRpdG9yLnNldFZhbHVlKCk7IH0pO1xyXG5cclxuXHRcdHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xyXG5cdH0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdGlmICh0aGlzLmlzQWN0aXZlKSB7XHJcblx0XHRcdCQoXCIjdnZ2ZWItY29kZS1lZGl0b3IgdGV4dGFyZWFcIikudmFsKFZ2dmViLkJ1aWxkZXIuZ2V0QmVhdXRpZmllZEh0bWwoKSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZGVzdHJveTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdC8vdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cdH0sXHJcblxyXG5cdHRvZ2dsZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuaXNBY3RpdmUgIT0gdHJ1ZSkge1xyXG5cdFx0XHR0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaW5pdCgpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5kZXN0cm95KCk7XHJcblx0fVxyXG59XHJcblxyXG5sZXQgc2hvd25QYW5lbCwgaGlkZGVuUGFuZWwsIGlzUHJldmlldztcclxuXHJcblZ2dmViLkd1aSA9IHtcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKCkge1xyXG5cdFx0JChcIltkYXRhLXZ2dmViLWFjdGlvbl1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdG9uID0gXCJjbGlja1wiO1xyXG5cdFx0XHRpZiAodGhpcy5kYXRhc2V0LnZ2dmViT24pIG9uID0gdGhpcy5kYXRhc2V0LnZ2dmViT247XHJcblxyXG5cdFx0XHQkKHRoaXMpLm9uKG9uLCBWdnZlYi5HdWlbdGhpcy5kYXRhc2V0LnZ2dmViQWN0aW9uXSk7XHJcblx0XHRcdGlmICh0aGlzLmRhdGFzZXQudnZ2ZWJTaG9ydGN1dCkge1xyXG5cdFx0XHRcdCQoZG9jdW1lbnQpLmJpbmQoJ2tleWRvd24nLCB0aGlzLmRhdGFzZXQudnZ2ZWJTaG9ydGN1dCwgVnZ2ZWIuR3VpW3RoaXMuZGF0YXNldC52dnZlYkFjdGlvbl0pO1xyXG5cdFx0XHRcdCQod2luZG93LkZyYW1lRG9jdW1lbnQsIHdpbmRvdy5GcmFtZVdpbmRvdykuYmluZCgna2V5ZG93bicsIHRoaXMuZGF0YXNldC52dnZlYlNob3J0Y3V0LCBWdnZlYi5HdWlbdGhpcy5kYXRhc2V0LnZ2dmViQWN0aW9uXSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHVuZG86IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmIChWdnZlYi5XeXNpd3lnRWRpdG9yLmlzQWN0aXZlKSB7XHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IudW5kbygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0VnZ2ZWIuVW5kby51bmRvKCk7XHJcblx0XHR9XHJcblx0XHRWdnZlYi5CdWlsZGVyLnNlbGVjdE5vZGUoKTtcclxuXHR9LFxyXG5cclxuXHRyZWRvOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoVnZ2ZWIuV3lzaXd5Z0VkaXRvci5pc0FjdGl2ZSkge1xyXG5cdFx0XHRWdnZlYi5XeXNpd3lnRWRpdG9yLnJlZG8oKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdFZ2dmViLlVuZG8ucmVkbygpO1xyXG5cdFx0fVxyXG5cdFx0VnZ2ZWIuQnVpbGRlci5zZWxlY3ROb2RlKCk7XHJcblx0fSxcclxuXHJcblx0Y2hlY2s6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoJyN0ZXh0YXJlYS1tb2RhbCB0ZXh0YXJlYScpLnZhbChWdnZlYi5CdWlsZGVyLmdldEJlYXV0aWZpZWRIdG1sKCkpO1xyXG5cdFx0JCgnI3RleHRhcmVhLW1vZGFsJykubW9kYWwoKTtcclxuXHR9LFxyXG5cclxuXHR2aWV3cG9ydDogZnVuY3Rpb24gKCkge1xyXG5cdFx0JChcIiNjYW52YXNcIikuYXR0cihcImNsYXNzXCIsIHRoaXMuZGF0YXNldC52aWV3KTtcclxuXHR9LFxyXG5cclxuXHR0b2dnbGVFZGl0b3I6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoXCIjdnZ2ZWItYnVpbGRlclwiKS50b2dnbGVDbGFzcyhcImJvdHRvbS1wYW5lbC1leHBhbmRcIik7XHJcblx0XHRWdnZlYi5Db2RlRWRpdG9yLnRvZ2dsZSgpO1xyXG5cdH0sXHJcblxyXG5cdGRvd25sb2FkKCkge1xyXG5cdFx0ZG93bmxvYWRBc1RleHRGaWxlKCdpbmRleCcsIFZ2dmViLkJ1aWxkZXIuZ2V0QmVhdXRpZmllZEh0bWwoKSk7XHJcblx0fSxcclxuXHJcblx0cHJldmlldzogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCQoJyNsZWZ0LXBhbmVsJykuaXMoJzp2aXNpYmxlJykpIHtcclxuXHRcdFx0c2hvd25QYW5lbCA9ICdsZWZ0LXBhbmVsJztcclxuXHRcdFx0aGlkZGVuUGFuZWwgPSAncmlnaHQtcGFuZWwnO1xyXG5cdFx0XHQkKCcjbGVmdC1wYW5lbCwgI3JpZ2h0LXBhbmVsJykuaGlkZSgpO1xyXG5cdFx0XHRpc1ByZXZpZXcgPSB0cnVlO1xyXG5cdFx0fSBlbHNlIGlmICgkKCcjcmlnaHQtcGFuZWwnKS5pcygnOnZpc2libGUnKSkge1xyXG5cdFx0XHRzaG93blBhbmVsID0gJ3JpZ2h0LXBhbmVsJztcclxuXHRcdFx0aGlkZGVuUGFuZWwgPSAnbGVmdC1wYW5lbCc7XHJcblx0XHRcdCQoJyNsZWZ0LXBhbmVsLCAjcmlnaHQtcGFuZWwnKS5oaWRlKCk7XHJcblx0XHRcdGlzUHJldmlldyA9IHRydWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpc1ByZXZpZXcgPSBmYWxzZTtcclxuXHRcdFx0JChgIyR7c2hvd25QYW5lbH1gKS5zaG93KCk7XHJcblx0XHRcdCQoYCMke2hpZGRlblBhbmVsfWApLmhpZGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHQkKCcjbWVudS1wYW5lbCcpLnRvZ2dsZSgpO1xyXG5cdFx0JChcIiNpZnJhbWUtbGF5ZXJcIikudG9nZ2xlKCk7XHJcblx0XHQkKFwiI3Z2dmViLWJ1aWxkZXJcIikudG9nZ2xlQ2xhc3MoXCJwcmV2aWV3XCIpO1xyXG5cdH0sXHJcblxyXG5cdGZ1bGxzY3JlZW46IGZ1bmN0aW9uICgpIHtcclxuXHRcdGxhdW5jaEZ1bGxTY3JlZW4oZG9jdW1lbnQpOyAvLyB0aGUgd2hvbGUgcGFnZVxyXG5cdH0sXHJcblxyXG5cdGNvbXBvbmVudFNlYXJjaDogZnVuY3Rpb24gKCkge1xyXG5cdFx0c2VhcmNoVGV4dCA9IHRoaXMudmFsdWU7XHJcblxyXG5cdFx0JChcIiNjb21wb25lbnRzLWxpc3QgbGkgb2wgbGlcIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCR0aGlzID0gJCh0aGlzKTtcclxuXHJcblx0XHRcdCR0aGlzLmhpZGUoKTtcclxuXHRcdFx0aWYgKCR0aGlzLmRhdGEoXCJzZWFyY2hcIikuaW5kZXhPZihzZWFyY2hUZXh0KSA+IC0xKSAkdGhpcy5zaG93KCk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRjbGVhckNvbXBvbmVudFNlYXJjaDogZnVuY3Rpb24gKCkge1xyXG5cdFx0JChcIiNjb21wb25lbnQtc2VhcmNoXCIpLnZhbChcIlwiKS5rZXl1cCgpO1xyXG5cdH1cclxufVxyXG5cclxuVnZ2ZWIuRmlsZU1hbmFnZXIgPSB7XHJcblx0dHJlZTogZmFsc2UsXHJcblx0cGFnZXM6IHt9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLnRyZWUgPSAkKFwiI2ZpbGVtYW5hZ2VyIC50cmVlID4gb2xcIikuaHRtbChcIlwiKTtcclxuXHJcblx0XHQkKHRoaXMudHJlZSkub24oXCJjbGlja1wiLCBcImxpW2RhdGEtcGFnZV0gc3BhblwiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAjJHskKHRoaXMpLnBhcmVudHMoJ2xpJykuZGF0YSgncGFnZScpfWA7XHJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuXHRcdFx0Ly8gVnZ2ZWIuRmlsZU1hbmFnZXIubG9hZFBhZ2UoJCh0aGlzKS5wYXJlbnRzKFwibGlcIikuZGF0YShcInBhZ2VcIikpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KVxyXG5cdH0sXHJcblxyXG5cdGdldFBhZ2UobmFtZSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucGFnZXNbbmFtZV07XHJcblx0fSxcclxuXHJcblx0YWRkUGFnZTogZnVuY3Rpb24gKG5hbWUsIHRpdGxlLCB1cmwpIHtcclxuXHJcblx0XHR0aGlzLnBhZ2VzW25hbWVdID0ge1xyXG5cdFx0XHRuYW1lLFxyXG5cdFx0XHR0aXRsZSxcclxuXHRcdFx0dXJsXHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMudHJlZS5hcHBlbmQoXHJcblx0XHRcdHRtcGwoXCJ2dnZlYi1maWxlbWFuYWdlci1wYWdlXCIsIHsgbmFtZSwgdGl0bGUsIHVybCB9KSk7XHJcblx0fSxcclxuXHJcblx0YWRkUGFnZXM6IGZ1bmN0aW9uIChwYWdlcykge1xyXG5cdFx0Zm9yIChwYWdlIGluIHBhZ2VzKSB7XHJcblx0XHRcdHRoaXMuYWRkUGFnZShwYWdlc1twYWdlXVsnbmFtZSddLCBwYWdlc1twYWdlXVsndGl0bGUnXSwgcGFnZXNbcGFnZV1bJ3VybCddKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRhZGRDb21wb25lbnQ6IGZ1bmN0aW9uIChuYW1lLCB1cmwsIHRpdGxlLCBwYWdlKSB7XHJcblx0XHQkKFwiW2RhdGEtcGFnZT0nXCIgKyBwYWdlICsgXCInXSA+IG9sXCIsIHRoaXMudHJlZSkuYXBwZW5kKFxyXG5cdFx0XHR0bXBsKFwidnZ2ZWItZmlsZW1hbmFnZXItY29tcG9uZW50XCIsIHsgbmFtZSwgdXJsLCB0aXRsZSB9KSk7XHJcblx0fSxcclxuXHJcblx0c2hvd0FjdGl2ZShuYW1lKSB7XHJcblx0XHQkKFwiW2RhdGEtcGFnZV1cIiwgdGhpcy50cmVlKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdCQoXCJbZGF0YS1wYWdlPSdcIiArIG5hbWUgKyBcIiddXCIsIHRoaXMudHJlZSkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0fSxcclxuXHJcblx0bG9hZFBhZ2U6IGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0XHQkKFwiW2RhdGEtcGFnZV1cIiwgdGhpcy50cmVlKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdCQoXCJbZGF0YS1wYWdlPSdcIiArIG5hbWUgKyBcIiddXCIsIHRoaXMudHJlZSkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblxyXG5cdFx0VnZ2ZWIuQnVpbGRlci5sb2FkVXJsKHRoaXMucGFnZXNbbmFtZV1bJ3VybCddKTtcclxuXHR9LFxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVnZ2ZWI7IiwiaW1wb3J0IHVudXNlZFRhZ3MgZnJvbSAnLi91bnVzZWRUYWdzJztcclxuaW1wb3J0IHsgZW1wdHlDaGlsZHJlblNlbGVjdG9ycywgdGFibGVTZWxlY3RvciB9IGZyb20gJy4vZW1wdHlDaGlsZHJlblNlbGVjdG9ycyc7XHJcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvdGFibGUnO1xyXG5pbXBvcnQgdGFibGUgZnJvbSAnLi4vY29tcG9uZW50cy9Ab2VlL3RhYmxlJztcclxuXHJcbmNvbnN0IGFsd2F5c1RydWUgPSAoKSA9PiB0cnVlO1xyXG5cclxuLy8gdGhpcyByZWZlcnMgdG8gaHRtbCBlbGVtZW50XHJcbmZ1bmN0aW9uIHJlbW92ZVRhZyh7IG5hbWUsIGZpbHRlciA9IGFsd2F5c1RydWUgfSkge1xyXG4gICAgQXJyYXkuZnJvbSh0aGlzLmdldEVsZW1lbnRzQnlUYWdOYW1lKG5hbWUpKVxyXG4gICAgICAgIC5maWx0ZXIoZmlsdGVyKVxyXG4gICAgICAgIC5mb3JFYWNoKHRhZyA9PiB0YWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0YWcpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlVW51c2VkVGFncyhlbCkge1xyXG4gICAgdW51c2VkVGFncy5mb3JFYWNoKHJlbW92ZVRhZywgZWwpO1xyXG4gICAgcmV0dXJuIGVsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBlbXB0eUNoaWxkcmVuKGVsKSB7XHJcbiAgICAkKGVsKS5maW5kKGVtcHR5Q2hpbGRyZW5TZWxlY3RvcnMuam9pbignLCAnKSkuZW1wdHkoKTtcclxuICAgIHJldHVybiBlbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVUYWJsZVNjcmlwdChlbCkge1xyXG4gICAgY29uc3QganNTdHIgPSBBcnJheS5mcm9tKCQoZWwpLmZpbmQodGFibGVTZWxlY3RvcikpLnJlZHVjZSgocHJldiwgZWxlbWVudCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgJHtwcmV2fVxyXG4gICAgICAgICAgICAgICAgJHt0ZW1wbGF0ZSgkKGVsZW1lbnQpLCB0YWJsZSl9YDtcclxuICAgIH0sICcnKTtcclxuICAgICQoJzxzY3JpcHQ+PC9zY3JpcHQ+JykudGV4dChqc1N0cikuYXBwZW5kVG8oJChlbCkuZmluZCgnYm9keScpKTtcclxuICAgIHJldHVybiBlbDtcclxufVxyXG5cclxuZXhwb3J0IHsgcmVtb3ZlVW51c2VkVGFncywgZW1wdHlDaGlsZHJlbiwgZ2VuZXJhdGVUYWJsZVNjcmlwdCB9OyIsImNvbnN0IHVudXNlZFRhZ3MgPSBbXHJcblx0e1xyXG5cdFx0bmFtZTogJ3NjcmlwdCcsXHJcblx0XHRmaWx0ZXI6IHRhZyA9PiB0YWcuZ2V0QXR0cmlidXRlKCdzcmMnKVxyXG5cdFx0XHQmJiB0YWcuZ2V0QXR0cmlidXRlKCdzcmMnKS5pbmNsdWRlcygnaWZyYW1lLWRyYWctbi1kcm9wJylcclxuXHR9LFxyXG5cdHtcclxuXHRcdG5hbWU6ICdsaW5rJyxcclxuXHRcdGZpbHRlcjogdGFnID0+IHRhZy5nZXRBdHRyaWJ1dGUoJ3JlbCcpID09ICdzdHlsZXNoZWV0J1xyXG5cdFx0XHQmJiB0YWcuZ2V0QXR0cmlidXRlKCdocmVmJykuaW5jbHVkZXMoJ2RyYWctbi1kcm9wJylcclxuXHR9LFxyXG5cdHtcclxuXHRcdG5hbWU6ICdocicsXHJcblx0XHRmaWx0ZXI6IHRhZyA9PiAkKHRhZykuaGFzQ2xhc3MoJ2hvcml6b250YWwtbGluZScpXHJcblx0XHRcdHx8ICQodGFnKS5oYXNDbGFzcygndmVydGljYWwtbGluZScpXHJcblx0fVxyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdW51c2VkVGFnczsiLCJpbXBvcnQgeyBkYXRhVGFibGVJZCB9IGZyb20gJy4uL2NvbXBvbmVudHMvY29tbW9uJztcclxuXHJcbmNvbnN0IHRhYmxlU2VsZWN0b3IgPSBgWyR7ZGF0YVRhYmxlSWR9XWA7XHJcbmNvbnN0IGVtcHR5Q2hpbGRyZW5TZWxlY3RvcnMgPSBbdGFibGVTZWxlY3Rvcl07XHJcblxyXG5leHBvcnQgeyBlbXB0eUNoaWxkcmVuU2VsZWN0b3JzLCB0YWJsZVNlbGVjdG9yIH07IiwiaW1wb3J0IHsgZGF0YVRhYmxlSWQgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb21tb25cIjtcclxuXHJcbmxldCBpbmRleCA9IDE7XHJcblxyXG5mdW5jdGlvbiB0ZW1wbGF0ZShub2RlLCB0YWJsZSkge1xyXG4gICAgY29uc3QgaWQgPSBub2RlLmF0dHIoJ2lkJykgfHwgKG5vZGUuYXR0cignaWQnLCBgdGFibGUke2luZGV4Kyt9YCksIG5vZGUuYXR0cignaWQnKSk7XHJcbiAgICBjb25zdCBrZXkgPSBub2RlLmF0dHIoZGF0YVRhYmxlSWQpO1xyXG4gICAgcmV0dXJuIGBcclxuICAgIHZhciBjb2x1bW5EZWZzJHtrZXl9ID0gW1xyXG4gICAgICAgICR7dGFibGUuZ2V0VGFibGUoa2V5KS5jb2x1bW5EZWZzLm1hcChkZWYgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYHtoZWFkZXJOYW1lOiBcIiR7ZGVmLmhlYWRlck5hbWV9XCIsIGZpZWxkOiBcIiR7ZGVmLmZpZWxkfVwifWA7XHJcbiAgICAgICAgfSkuam9pbignLCcpfVxyXG4gICAgXTtcclxuICAgIHZhciBncmlkT3B0aW9ucyR7a2V5fSA9IHtcclxuICAgICAgICBjb2x1bW5EZWZzOiBjb2x1bW5EZWZzJHtrZXl9LFxyXG4gICAgICAgIGVuYWJsZVNvcnRpbmc6IGZhbHNlLFxyXG4gICAgICAgIGVuYWJsZUZpbHRlcjogZmFsc2VcclxuICAgICAgfTtcclxuICAgIHZhciBlR3JpZERpdiR7a2V5fSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMke2lkfScpO1xyXG4gICAgbmV3IGFnR3JpZC5HcmlkKGVHcmlkRGl2JHtrZXl9LCBncmlkT3B0aW9ucyR7a2V5fSk7XHJcbiAgICBncmlkT3B0aW9ucyR7a2V5fS5hcGkuc2V0Um93RGF0YShbXSk7XHJcbiAgICBgO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0ZW1wbGF0ZTtcclxuXHJcbiIsImltcG9ydCB7IEJ1dHRvbklucHV0LCBUZXh0VmFsdWVJbnB1dCwgU2VsZWN0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgZGF0YUNvbXBvbmVudElkLCBkYXRhVGFibGVJZCB9IGZyb20gJy4uL2NvbW1vbic7XHJcbmltcG9ydCBWdnZlYiBmcm9tICcuLi8uLi9idWlsZGVyJztcclxuXHJcbmNvbnN0IHRhYmxlcyA9IHt9O1xyXG5sZXQgaW5kZXggPSAxO1xyXG5mdW5jdGlvbiBzZXRDb2x1bW5EZWZzQW5kUmVuZGVyKG5vZGUsIGNvbERlZnMpIHtcclxuICAgIC8vIENhbGwgdG8gc2V0IG5ldyBjb2x1bW4gZGVmaW5pdGlvbnMgaW50byB0aGUgZ3JpZC4gXHJcbiAgICAvLyBUaGUgZ3JpZCB3aWxsIHJlZHJhdyBhbGwgdGhlIGNvbHVtbiBoZWFkZXJzLCBhbmQgdGhlbiByZWRyYXcgYWxsIG9mIHRoZSByb3dzLlxyXG4gICAgdGFibGVzWyQobm9kZSkuYXR0cihkYXRhVGFibGVJZCldLmFwaS5zZXRDb2x1bW5EZWZzKGNvbERlZnMpO1xyXG4gICAgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIoXCJodG1sL3RhYmxlQG9lZVwiKTtcclxufVxyXG5cclxuY29uc3QgdGFibGUgPSB7XHJcbiAgICBub2RlczogW1widGFibGVcIl0sXHJcbiAgICBjbGFzc2VzOiBbXCJ0YWJsZVwiXSxcclxuICAgIGltYWdlOiBcImljb25zL3RhYmxlLnN2Z1wiLFxyXG4gICAgbmFtZTogXCJhZy1HcmlkXCIsXHJcbiAgICBodG1sOiBgPGRpdiAke2RhdGFDb21wb25lbnRJZH09XCJodG1sL3RhYmxlQG9lZVwiIHN0eWxlPVwid2lkdGg6IDUwMHB4OyBoZWlnaHQ6IDIwMHB4O1wiIGNsYXNzPVwiZHJvcHpvbmUgZHJhZ2dhYmxlIGFnLXRoZW1lLWJsdWVcIj48L2Rpdj5gLFxyXG4gICAgZ2V0VGFibGUoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRhYmxlc1trZXldO1xyXG4gICAgfSxcclxuICAgIGJlZm9yZUluaXQ6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgaWYgKCEkKG5vZGUpLmF0dHIoZGF0YVRhYmxlSWQpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gaW5kZXgrKztcclxuICAgICAgICAgICAgJChub2RlKS5hdHRyKGRhdGFUYWJsZUlkLCBpZCk7XHJcbiAgICAgICAgICAgIHRhYmxlc1tpZF0gPSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5EZWZzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBoZWFkZXJOYW1lOiBcImhlYWRlclwiLCBmaWVsZDogXCJmaWxlZFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBoZWFkZXJOYW1lOiBcImhlYWRlclwiLCBmaWVsZDogXCJmaWVsZFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBoZWFkZXJOYW1lOiBcImhlYWRlclwiLCBmaWVsZDogXCJmaWVsZFwiIH1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBlbmFibGVTb3J0aW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZUZpbHRlcjogZmFsc2VcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbmV3IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaWZyYW1lSWQnKS5jb250ZW50V2luZG93LmFnR3JpZCkuR3JpZChub2RlLCB0YWJsZXNbaWRdKTtcclxuICAgICAgICAgICAgdGFibGVzW2lkXS5hcGkuc2V0Um93RGF0YShbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGFibGVzWyQobm9kZSkuYXR0cihkYXRhVGFibGVJZCldLmNvbHVtbkRlZnMucmVkdWNlKChwcmV2LCBjdXIpID0+IHtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICBwcmV2LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJIZWFkZXIgXCIgKyBpLFxyXG4gICAgICAgICAgICAgICAga2V5OiBcIm9wdGlvblwiICsgaSxcclxuICAgICAgICAgICAgICAgIC8vaW5kZXg6IGkgLSAxLFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uTm9kZTogdGhpcyxcclxuICAgICAgICAgICAgICAgIGlucHV0dHlwZTogVGV4dFZhbHVlSW5wdXQsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICd0YWJsZWhlYWRlckBvZWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlck5hbWU6IGN1ci5oZWFkZXJOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBjdXIuZmllbGRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKG5vZGUsIHZhbHVlLCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleUluZGV4ID0gcGFyc2VJbnQodGhpcy5rZXkuc3Vic3RyKCdvcHRpb24nLmxlbmd0aCkpIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29sRGVmcyA9IHRhYmxlc1skKG5vZGUpLmF0dHIoZGF0YVRhYmxlSWQpXS5jb2x1bW5EZWZzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5ub2RlTmFtZSA9PSAnQlVUVE9OJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xEZWZzID0gY29sRGVmc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigodmFsdWUsIGluZGV4KSA9PiBpbmRleCAhPSBrZXlJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlc1skKG5vZGUpLmF0dHIoZGF0YVRhYmxlSWQpXS5jb2x1bW5EZWZzID0gY29sRGVmcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q29sdW1uRGVmc0FuZFJlbmRlcihub2RlLCBjb2xEZWZzKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xEZWZzW2tleUluZGV4XVtpbnB1dC5uYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDph43mlrDmuLLmn5PkvJrlpLHljrvovpPlhaXmoYbnhKbngrnvvIzlj6rpnIDopoHnlKjmlrDnmoRjb2xEZWZz5pu05paw6KGo5qC85Y2z5Y+v77yM5Y+z5L6n55qE6YOo5YiG5LiN6ZyA6KaB6YeN5paw5riy5p+T44CCXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlc1skKG5vZGUpLmF0dHIoZGF0YVRhYmxlSWQpXS5hcGkuc2V0Q29sdW1uRGVmcyhjb2xEZWZzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHByZXY7XHJcbiAgICAgICAgfSwgW10pO1xyXG5cclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSB0aGlzLnByb3BlcnRpZXMuZmlsdGVyKHByb3BlcnR5ID0+IHByb3BlcnR5LmtleS5pbmRleE9mKFwib3B0aW9uXCIpID09PSAtMSk7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnVuc2hpZnQoLi4ucHJvcGVydGllcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfSxcclxuICAgIHByb3BlcnRpZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiVGhlbWVcIixcclxuICAgICAgICAgICAga2V5OiBcInRoZW1lXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbJ2FnLXRoZW1lLWJhbGhhbS1kYXJrJywgJ2FnLXRoZW1lLWJhbGhhbScsICdhZy10aGVtZS1ibHVlJywgJ2FnLXRoZW1lLWJvb3RzdHJhcCcsXHJcbiAgICAgICAgICAgICAgICAnYWctdGhlbWUtZGFyaycsICdhZy10aGVtZS1mcmVzaCcsICdhZy10aGVtZS1tYXRlcmlhbCddLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKG5vZGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUNsYXNzKHRoaXMudmFsaWRWYWx1ZXMuam9pbihcIiBcIikpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5hZGRDbGFzcyh2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ29kZSBjb3BpZWQgZm9ybSBvZmZpY2lhbCBzaXRlIGV4YW1wbGUgaHR0cHM6Ly93d3cuYWctZ3JpZC5jb20vZXhhbXBsZS5waHAjL1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZ3JpZE9wdGlvbnMgPSB0YWJsZXNbbm9kZS5hdHRyKGRhdGFUYWJsZUlkKV07XHJcbiAgICAgICAgICAgICAgICBncmlkT3B0aW9ucy5hcGkucmVzZXRSb3dIZWlnaHRzKCk7XHJcbiAgICAgICAgICAgICAgICBncmlkT3B0aW9ucy5hcGkucmVkcmF3Um93cygpO1xyXG4gICAgICAgICAgICAgICAgZ3JpZE9wdGlvbnMuYXBpLnJlZnJlc2hIZWFkZXIoKTtcclxuICAgICAgICAgICAgICAgIGdyaWRPcHRpb25zLmFwaS5yZWZyZXNoVG9vbFBhbmVsKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiRGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJhZy10aGVtZS1iYWxoYW1cIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkJhbGhhbVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiYWctdGhlbWUtYmFsaGFtLWRhcmtcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkJhbGhhbSAoZGFyaylcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImFnLXRoZW1lLWJsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkJsdWVcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImFnLXRoZW1lLWJvb3RzdHJhcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQm9vdHN0cmFwXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJhZy10aGVtZS1kYXJrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEYXJrXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJhZy10aGVtZS1mcmVzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRnJlc2hcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImFnLXRoZW1lLW1hdGVyaWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJNYXRlcmlhbFwiXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJhZGRDaGlsZFwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IEJ1dHRvbklucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7IHRleHQ6IFwiQWRkIGhlYWRlclwiIH0sXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29sRGVmcyA9IHRhYmxlc1skKG5vZGUpLmF0dHIoZGF0YVRhYmxlSWQpXS5jb2x1bW5EZWZzO1xyXG4gICAgICAgICAgICAgICAgY29sRGVmcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJOYW1lOiAnaGVhZGVyJyxcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogJ2ZpZWxkJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0Q29sdW1uRGVmc0FuZFJlbmRlcihub2RlLCBjb2xEZWZzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxdXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YWJsZTsiLCJmdW5jdGlvbiBodG1sR2VuZXJhdG9yKGh0bWwsIC4uLmZucykge1xyXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdodG1sJyk7XHJcbiAgICBlbC5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgZm5zLnJlZHVjZSgoZWwsIGZuKSA9PiBmbihlbCksIGVsKTtcclxuICAgIHJldHVybiAkKGVsKS5wcm9wKCdvdXRlckhUTUwnKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgaHRtbEdlbmVyYXRvcjsiLCIvLyBUb2dnbGUgZnVsbHNjcmVlblxyXG5mdW5jdGlvbiBsYXVuY2hGdWxsU2NyZWVuKGRvY3VtZW50KSB7XHJcbiAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC5GdWxsU2NyZWVuRWxlbWVudClcclxuICAgICAgICAgICAgZG9jdW1lbnQuZXhpdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgIC8vbW96aWxsYVx0XHRcclxuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC5tb3pGdWxsU2NyZWVuRWxlbWVudClcclxuICAgICAgICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgLy93ZWJraXRcdCAgXHJcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICAvL2llXHQgIFxyXG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQubXNGdWxsU2NyZWVuRWxlbWVudClcclxuICAgICAgICAgICAgZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgbGF1bmNoRnVsbFNjcmVlbiB9OyIsImZ1bmN0aW9uIGRvd25sb2FkQXNUZXh0RmlsZShmaWxlbmFtZSwgdGV4dCkge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgYGRhdGE6dGV4dC9odG1sO2NoYXJzZXQ9dXRmLTgsJHtlbmNvZGVVUklDb21wb25lbnQodGV4dCl9YCk7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBmaWxlbmFtZSk7XHJcblxyXG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuXHJcbiAgICBlbGVtZW50LmNsaWNrKCk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxufVxyXG5cclxuZXhwb3J0IHsgZG93bmxvYWRBc1RleHRGaWxlIH07IiwiLypcclxuQ29weXJpZ2h0IDIwMTcgWmlhZGluIEdpdmFuXHJcblxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cclxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcblxyXG5odHRwczovL2dpdGh1Yi5jb20vZ2l2YW56L1Z2dmViSnNcclxuKi9cclxuaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5pbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuaW1wb3J0IENoZWNrYm94SW5wdXQgZnJvbSAnLi9DaGVja2JveElucHV0JztcclxuaW1wb3J0IFNlbGVjdElucHV0IGZyb20gJy4vU2VsZWN0SW5wdXQnO1xyXG5pbXBvcnQgTGlua0lucHV0IGZyb20gJy4vTGlua0lucHV0JztcclxuaW1wb3J0IFJhbmdlSW5wdXQgZnJvbSAnLi9SYW5nZUlucHV0JztcclxuaW1wb3J0IE51bWJlcklucHV0IGZyb20gJy4vTnVtYmVySW5wdXQnO1xyXG5pbXBvcnQgQ3NzVW5pdElucHV0IGZyb20gJy4vQ3NzVW5pdElucHV0JztcclxuaW1wb3J0IENvbG9ySW5wdXQgZnJvbSAnLi9Db2xvcklucHV0JztcclxuaW1wb3J0IEZpbGVVcGxvYWRJbnB1dCBmcm9tICcuL0ZpbGVVcGxvYWRJbnB1dCc7XHJcbmltcG9ydCBSYWRpb0lucHV0IGZyb20gJy4vUmFkaW9JbnB1dCc7XHJcbmltcG9ydCBSYWRpb0J1dHRvbklucHV0IGZyb20gJy4vUmFkaW9CdXR0b25JbnB1dCc7XHJcbmltcG9ydCBUb2dnbGVJbnB1dCBmcm9tICcuL1RvZ2dsZUlucHV0JztcclxuaW1wb3J0IFZhbHVlVGV4dElucHV0IGZyb20gJy4vVmFsdWVUZXh0SW5wdXQnO1xyXG5pbXBvcnQgR3JpZExheW91dElucHV0IGZyb20gJy4vR3JpZExheW91dElucHV0JztcclxuaW1wb3J0IFByb2R1Y3RzSW5wdXQgZnJvbSAnLi9Qcm9kdWN0c0lucHV0JztcclxuaW1wb3J0IEdyaWRJbnB1dCBmcm9tICcuL0dyaWRJbnB1dCc7XHJcbmltcG9ydCBUZXh0VmFsdWVJbnB1dCBmcm9tICcuL1RleHRWYWx1ZUlucHV0JztcclxuaW1wb3J0IEJ1dHRvbklucHV0IGZyb20gJy4vQnV0dG9uSW5wdXQnO1xyXG5pbXBvcnQgU2VjdGlvbklucHV0IGZyb20gJy4vU2VjdGlvbklucHV0JztcclxuaW1wb3J0IExpc3RJbnB1dCBmcm9tICcuL0xpc3RJbnB1dCc7XHJcblxyXG5leHBvcnQge1xyXG5cdElucHV0LCBUZXh0SW5wdXQsIENoZWNrYm94SW5wdXQsIFNlbGVjdElucHV0LCBMaW5rSW5wdXQsIFJhbmdlSW5wdXQsIE51bWJlcklucHV0LCBDc3NVbml0SW5wdXQsXHJcblx0UmFkaW9JbnB1dCwgUmFkaW9CdXR0b25JbnB1dCwgVG9nZ2xlSW5wdXQsIFZhbHVlVGV4dElucHV0LCBHcmlkTGF5b3V0SW5wdXQsIFByb2R1Y3RzSW5wdXQsIEdyaWRJbnB1dCxcclxuXHRUZXh0VmFsdWVJbnB1dCwgQnV0dG9uSW5wdXQsIFNlY3Rpb25JbnB1dCwgTGlzdElucHV0LCBDb2xvcklucHV0LCBGaWxlVXBsb2FkSW5wdXRcclxufTsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuXHJcbmNvbnN0IFZhbHVlVGV4dElucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImtleXVwXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZhbHVlVGV4dElucHV0OyIsImltcG9ydCBUZXh0SW5wdXQgZnJvbSAnLi9UZXh0SW5wdXQnO1xyXG5cclxuY29uc3QgVG9nZ2xlSW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQsIG5vZGUpIHtcclxuXHRcdGlmIChldmVudC5kYXRhICYmIGV2ZW50LmRhdGEuZWxlbWVudCkge1xyXG5cdFx0XHRldmVudC5kYXRhLmVsZW1lbnQudHJpZ2dlcigncHJvcGVydHlDaGFuZ2UnLCBbdGhpcy5jaGVja2VkID8gdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlLW9uXCIpIDogdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlLW9mZlwiKSwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidG9nZ2xlXCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRvZ2dsZUlucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFRleHRWYWx1ZUlucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XHRbXCJjbGlja1wiLCBcIm9uQ2hhbmdlXCIsIFwiYnV0dG9uXCIgLyonc2VsZWN0JyovXSxcclxuXHRdLFxyXG5cclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHR2YWx1ZVwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGV4dFZhbHVlSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgU2VsZWN0SW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcbiAgICBldmVudHM6IFtcclxuICAgICAgICBbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcInNlbGVjdFwiXSxcclxuICAgIF0sXHJcblxyXG5cclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAkKCdzZWxlY3QnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKFwic2VsZWN0XCIsIGRhdGEpO1xyXG4gICAgfSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlbGVjdElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFNlY3Rpb25JbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNsaWNrXCIsIFwib25DaGFuZ2VcIiwgXCJidXR0b25cIiAvKidzZWxlY3QnKi9dLFxyXG5cdF0sXHJcblxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInNlY3Rpb25pbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFJhbmdlSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJyYW5nZWlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhbmdlSW5wdXQ7IiwiaW1wb3J0IFJhZGlvSW5wdXQgZnJvbSAnLi9SYWRpb0lucHV0JztcclxuXHJcbmNvbnN0IFJhZGlvQnV0dG9uSW5wdXQgPSAkLmV4dGVuZCh7fSwgUmFkaW9JbnB1dCwge1xyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKFwicmFkaW9idXR0b25pbnB1dFwiLCBkYXRhKTtcclxuICAgIH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhZGlvQnV0dG9uSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgUmFkaW9JbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRvbkNoYW5nZTogZnVuY3Rpb24gKGV2ZW50LCBub2RlKSB7XHJcblxyXG5cdFx0aWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS5lbGVtZW50KSB7XHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt0aGlzLnZhbHVlLCB0aGlzXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XHJcblx0XHRpZiAodmFsdWUpXHJcblx0XHRcdCQoXCJpbnB1dFt2YWx1ZT1cIiArIHZhbHVlICsgXCJdXCIsIHRoaXMuZWxlbWVudCkucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJyYWRpb2lucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhZGlvSW5wdXQ7IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBQcm9kdWN0c0lucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImtleXVwXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RzSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxudmFyIE51bWJlcklucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwibnVtYmVyaW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTnVtYmVySW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgTGlzdElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJzZWxlY3RcIl0sXHJcblx0XSxcclxuXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ3NlbGVjdCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwibGlzdGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaXN0SW5wdXQ7IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBMaW5rSW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbmtJbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuXHJcbmNvbnN0IEdyaWRMYXlvdXRJbnB1dCA9ICQuZXh0ZW5kKHt9LCBUZXh0SW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHcmlkTGF5b3V0SW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgR3JpZElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcInNlbGVjdFwiIC8qJ3NlbGVjdCcqL10sXHJcblx0XHRbXCJjbGlja1wiLCBcIm9uQ2hhbmdlXCIsIFwiYnV0dG9uXCIgLyonc2VsZWN0JyovXSxcclxuXHRdLFxyXG5cclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnc2VsZWN0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJncmlkXCIsIGRhdGEpO1xyXG5cdH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHcmlkSW5wdXQ7IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBGaWxlVXBsb2FkSW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmlsZVVwbG9hZElucHV0O1xyXG4iLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBUZXh0SW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcbiAgICBldmVudHM6IFtcclxuICAgICAgICBbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0IF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHRcclxuXHRpbml0OiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxuICB9XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUZXh0SW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgQ3NzVW5pdElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdG51bWJlcjogMCxcclxuXHR1bml0OiBcInB4XCIsXHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpIHtcclxuXHRcdFx0aW5wdXQgPSBldmVudC5kYXRhLmlucHV0O1xyXG5cdFx0XHRpbnB1dFt0aGlzLm5hbWVdID0gdGhpcy52YWx1ZTsvLyB0aGlzLm5hbWUgPSB1bml0IG9yIG51bWJlclx0XHJcblxyXG5cdFx0XHR2YWx1ZSA9IFwiXCI7XHJcblx0XHRcdGlmIChpbnB1dC51bml0ID09IFwiYXV0b1wiKSB7XHJcblx0XHRcdFx0JChldmVudC5kYXRhLmVsZW1lbnQpLmFkZENsYXNzKFwiYXV0b1wiKTtcclxuXHRcdFx0XHR2YWx1ZSA9IGlucHV0LnVuaXQ7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0JChldmVudC5kYXRhLmVsZW1lbnQpLnJlbW92ZUNsYXNzKFwiYXV0b1wiKTtcclxuXHRcdFx0XHR2YWx1ZSA9IGlucHV0Lm51bWJlciArIGlucHV0LnVuaXQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt2YWx1ZSwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJzZWxlY3RcIl0sXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdHRoaXMubnVtYmVyID0gcGFyc2VJbnQodmFsdWUpO1xyXG5cdFx0dGhpcy51bml0ID0gdmFsdWUucmVwbGFjZSh0aGlzLm51bWJlciwgJycpO1xyXG5cclxuXHRcdGlmICh0aGlzLnVuaXQgPT0gXCJhdXRvXCIpICQodGhpcy5lbGVtZW50KS5hZGRDbGFzcyhcImF1dG9cIik7XHJcblxyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh0aGlzLm51bWJlcik7XHJcblx0XHQkKCdzZWxlY3QnLCB0aGlzLmVsZW1lbnQpLnZhbCh0aGlzLnVuaXQpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJjc3N1bml0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3NzVW5pdElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IENvbG9ySW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0Ly9odG1sNSBjb2xvciBpbnB1dCBvbmx5IHN1cHBvcnRzIHNldHRpbmcgdmFsdWVzIGFzIGhleCBjb2xvcnMgZXZlbiBpZiB0aGUgcGlja2VyIHJldHVybnMgb25seSByZ2JcclxuXHRyZ2IyaGV4OiBmdW5jdGlvbiAocmdiKSB7XHJcblxyXG5cdFx0cmdiID0gcmdiLm1hdGNoKC9ecmdiYT9bXFxzK10/XFwoW1xccytdPyhcXGQrKVtcXHMrXT8sW1xccytdPyhcXGQrKVtcXHMrXT8sW1xccytdPyhcXGQrKVtcXHMrXT8vaSk7XHJcblxyXG5cdFx0cmV0dXJuIChyZ2IgJiYgcmdiLmxlbmd0aCA9PT0gNCkgPyBcIiNcIiArXHJcblx0XHRcdChcIjBcIiArIHBhcnNlSW50KHJnYlsxXSwgMTApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpICtcclxuXHRcdFx0KFwiMFwiICsgcGFyc2VJbnQocmdiWzJdLCAxMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMikgK1xyXG5cdFx0XHQoXCIwXCIgKyBwYXJzZUludChyZ2JbM10sIDEwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKSA6IHJnYjtcclxuXHR9LFxyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh0aGlzLnJnYjJoZXgodmFsdWUpKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwiY29sb3JpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb2xvcklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IENoZWNrYm94SW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0b25DaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50LCBub2RlKSB7XHJcblx0XHRcclxuXHRcdGlmIChldmVudC5kYXRhICYmIGV2ZW50LmRhdGEuZWxlbWVudClcclxuXHRcdHtcclxuXHRcdFx0ZXZlbnQuZGF0YS5lbGVtZW50LnRyaWdnZXIoJ3Byb3BlcnR5Q2hhbmdlJywgW3RoaXMuY2hlY2tlZCwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG4gICAgZXZlbnRzOiBbXHJcbiAgICAgICAgW1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHQgXSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cdFxyXG5cdGluaXQ6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImNoZWNrYm94aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxuICB9XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaGVja2JveElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IEJ1dHRvbklucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2xpY2tcIiwgXCJvbkNoYW5nZVwiLCBcImJ1dHRvblwiIC8qJ3NlbGVjdCcqL10sXHJcblx0XSxcclxuXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2J1dHRvbicsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwiYnV0dG9uXCIsIGRhdGEpO1xyXG5cdH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b25JbnB1dDsiLCJjb25zdCBJbnB1dCA9IHtcclxuXHRcclxuXHRpbml0OiBmdW5jdGlvbihuYW1lKSB7XHJcblx0fSxcclxuXHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbihldmVudCwgbm9kZSkge1xyXG5cdFx0XHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpXHJcblx0XHR7XHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt0aGlzLnZhbHVlLCB0aGlzXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0cmVuZGVyVGVtcGxhdGU6IGZ1bmN0aW9uKG5hbWUsIGRhdGEpIHtcclxuXHRcdHJldHVybiB0bXBsKFwidnZ2ZWItaW5wdXQtXCIgKyBuYW1lLCBkYXRhKTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uKG5hbWUsIGRhdGEpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQodGhpcy5yZW5kZXJUZW1wbGF0ZShuYW1lLCBkYXRhKSk7XHJcblx0XHRcclxuXHRcdC8vYmluZCBldmVudHNcclxuXHRcdGlmICh0aGlzLmV2ZW50cylcclxuXHRcdGZvciAodmFyIGkgaW4gdGhpcy5ldmVudHMpXHJcblx0XHR7XHJcblx0XHRcdGV2ZW50ID0gdGhpcy5ldmVudHNbaV1bMF07XHJcblx0XHRcdGZ1biA9IHRoaXNbIHRoaXMuZXZlbnRzW2ldWzFdIF07XHJcblx0XHRcdGVsID0gdGhpcy5ldmVudHNbaV1bMl07XHJcblx0XHRcclxuXHRcdFx0dGhpcy5lbGVtZW50Lm9uKGV2ZW50LCBlbCwge2VsZW1lbnQ6IHRoaXMuZWxlbWVudCwgaW5wdXQ6dGhpc30sIGZ1bik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuZWxlbWVudDtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnB1dDsiLCJjb25zdCBiZ2NvbG9yQ2xhc3NlcyA9IFtcImJnLXByaW1hcnlcIiwgXCJiZy1zZWNvbmRhcnlcIiwgXCJiZy1zdWNjZXNzXCIsIFwiYmctZGFuZ2VyXCIsIFwiYmctd2FybmluZ1wiLCBcImJnLWluZm9cIiwgXCJiZy1saWdodFwiLCBcImJnLWRhcmtcIiwgXCJiZy13aGl0ZVwiXTtcclxuXHJcbmNvbnN0IGJnY29sb3JTZWxlY3RPcHRpb25zID1cclxuICAgIFt7XHJcbiAgICAgICAgdmFsdWU6IFwiRGVmYXVsdFwiLFxyXG4gICAgICAgIHRleHQ6IFwiXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctcHJpbWFyeVwiLFxyXG4gICAgICAgIHRleHQ6IFwiUHJpbWFyeVwiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctc2Vjb25kYXJ5XCIsXHJcbiAgICAgICAgdGV4dDogXCJTZWNvbmRhcnlcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLXN1Y2Nlc3NcIixcclxuICAgICAgICB0ZXh0OiBcIlN1Y2Nlc3NcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLWRhbmdlclwiLFxyXG4gICAgICAgIHRleHQ6IFwiRGFuZ2VyXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy13YXJuaW5nXCIsXHJcbiAgICAgICAgdGV4dDogXCJXYXJuaW5nXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1pbmZvXCIsXHJcbiAgICAgICAgdGV4dDogXCJJbmZvXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1saWdodFwiLFxyXG4gICAgICAgIHRleHQ6IFwiTGlnaHRcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLWRhcmtcIixcclxuICAgICAgICB0ZXh0OiBcIkRhcmtcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLXdoaXRlXCIsXHJcbiAgICAgICAgdGV4dDogXCJXaGl0ZVwiXHJcbiAgICB9XTtcclxuXHJcbmZ1bmN0aW9uIGNoYW5nZU5vZGVOYW1lKG5vZGUsIG5ld05vZGVOYW1lKSB7XHJcbiAgICB2YXIgbmV3Tm9kZTtcclxuICAgIG5ld05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5ld05vZGVOYW1lKTtcclxuICAgIGF0dHJpYnV0ZXMgPSBub2RlLmdldCgwKS5hdHRyaWJ1dGVzO1xyXG5cclxuICAgIGZvciAoaSA9IDAsIGxlbiA9IGF0dHJpYnV0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBuZXdOb2RlLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVzW2ldLm5vZGVOYW1lLCBhdHRyaWJ1dGVzW2ldLm5vZGVWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgJChuZXdOb2RlKS5hcHBlbmQoJChub2RlKS5jb250ZW50cygpKTtcclxuICAgICQobm9kZSkucmVwbGFjZVdpdGgobmV3Tm9kZSk7XHJcblxyXG4gICAgcmV0dXJuIG5ld05vZGU7XHJcbn1cclxuXHJcbmxldCBiYXNlX3NvcnQgPSAxMDA7Ly9zdGFydCBzb3J0aW5nIGZvciBiYXNlIGNvbXBvbmVudCBmcm9tIDEwMCB0byBhbGxvdyBleHRlbmRlZCBwcm9wZXJ0aWVzIHRvIGJlIGZpcnN0XHJcbmZ1bmN0aW9uIGluY19iYXNlX3NvcnQoKSB7XHJcbiAgICByZXR1cm4gYmFzZV9zb3J0Kys7XHJcbn1cclxuXHJcbmNvbnN0IGRhdGFDb21wb25lbnRJZCA9ICdkYXRhLWNvbXBvbmVudC1pZCc7XHJcbmNvbnN0IGRhdGFUYWJsZUlkID0gJ2RhdGEtdGFibGUtaWQnO1xyXG5cclxuZXhwb3J0IHsgYmdjb2xvckNsYXNzZXMsIGJnY29sb3JTZWxlY3RPcHRpb25zLCBjaGFuZ2VOb2RlTmFtZSwgaW5jX2Jhc2Vfc29ydCwgZGF0YUNvbXBvbmVudElkLCBkYXRhVGFibGVJZCB9O1xyXG4iXX0=
