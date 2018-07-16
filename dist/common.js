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
    }).join(',') + '\n    ];\n    var gridOptions' + key + ' = {\n        columnDefs: columnDefs' + key + ',\n        enableSorting: true,\n        enableFilter: true\n      };\n    var eGridDiv' + key + ' = document.querySelector(\'#' + id + '\');\n    new agGrid.Grid(eGridDiv' + key + ', gridOptions' + key + ');\n    gridOptions' + key + '.api.setRowData([]);\n    ';
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
    name: "Table",
    html: '<div ' + _common.dataComponentId + '="html/table@oee" style="width: 500px; height: 200px;" class="dropzone draggable ag-theme-balham"></div>',
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
                enableSorting: true,
                enableFilter: true
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGRlci5qcyIsInNyYy91dGlsL2pzb3VwLmpzIiwic3JjL3V0aWwvdW51c2VkVGFncy5qcyIsInNyYy91dGlsL2VtcHR5Q2hpbGRyZW5TZWxlY3RvcnMuanMiLCJzcmMvdGVtcGxhdGVzL3RhYmxlLmpzIiwic3JjL2NvbXBvbmVudHMvQG9lZS90YWJsZS5qcyIsInNyYy91dGlsL2h0bWxHZW5lcmF0b3IuanMiLCJzcmMvdXRpbC9mdWxsU2NyZWVuLmpzIiwic3JjL3V0aWwvZG93bmxvYWQuanMiLCJzcmMvaW5wdXRzL2lucHV0cy5qcyIsInNyYy9pbnB1dHMvVmFsdWVUZXh0SW5wdXQuanMiLCJzcmMvaW5wdXRzL1RvZ2dsZUlucHV0LmpzIiwic3JjL2lucHV0cy9UZXh0VmFsdWVJbnB1dC5qcyIsInNyYy9pbnB1dHMvU2VsZWN0SW5wdXQuanMiLCJzcmMvaW5wdXRzL1NlY3Rpb25JbnB1dC5qcyIsInNyYy9pbnB1dHMvUmFuZ2VJbnB1dC5qcyIsInNyYy9pbnB1dHMvUmFkaW9CdXR0b25JbnB1dC5qcyIsInNyYy9pbnB1dHMvUmFkaW9JbnB1dC5qcyIsInNyYy9pbnB1dHMvUHJvZHVjdHNJbnB1dC5qcyIsInNyYy9pbnB1dHMvTnVtYmVySW5wdXQuanMiLCJzcmMvaW5wdXRzL0xpc3RJbnB1dC5qcyIsInNyYy9pbnB1dHMvTGlua0lucHV0LmpzIiwic3JjL2lucHV0cy9HcmlkTGF5b3V0SW5wdXQuanMiLCJzcmMvaW5wdXRzL0dyaWRJbnB1dC5qcyIsInNyYy9pbnB1dHMvRmlsZVVwbG9hZElucHV0LmpzIiwic3JjL2lucHV0cy9UZXh0SW5wdXQuanMiLCJzcmMvaW5wdXRzL0Nzc1VuaXRJbnB1dC5qcyIsInNyYy9pbnB1dHMvQ29sb3JJbnB1dC5qcyIsInNyYy9pbnB1dHMvQ2hlY2tib3hJbnB1dC5qcyIsInNyYy9pbnB1dHMvQnV0dG9uSW5wdXQuanMiLCJzcmMvaW5w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QUFBLFciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBTZWN0aW9uSW5wdXQgfSBmcm9tICcuL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyByZW1vdmVVbnVzZWRUYWdzLCBlbXB0eUNoaWxkcmVuLCBnZW5lcmF0ZVRhYmxlU2NyaXB0IH0gZnJvbSAnLi91dGlsL2pzb3VwJztcclxuaW1wb3J0IHsgZG93bmxvYWRBc1RleHRGaWxlIH0gZnJvbSAnLi91dGlsL2Rvd25sb2FkJztcclxuaW1wb3J0IHsgbGF1bmNoRnVsbFNjcmVlbiB9IGZyb20gJy4vdXRpbC9mdWxsU2NyZWVuJztcclxuaW1wb3J0IHsgZGF0YUNvbXBvbmVudElkIH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbW1vbidcclxuaW1wb3J0IGh0bWxHZW5lcmF0b3IgZnJvbSAnLi91dGlsL2h0bWxHZW5lcmF0b3InO1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgY2FjaGUgPSB7fTtcclxuXHJcblx0dGhpcy50bXBsID0gZnVuY3Rpb24gdG1wbChzdHIsIGRhdGEpIHtcclxuXHRcdC8vIEZpZ3VyZSBvdXQgaWYgd2UncmUgZ2V0dGluZyBhIHRlbXBsYXRlLCBvciBpZiB3ZSBuZWVkIHRvXHJcblx0XHQvLyBsb2FkIHRoZSB0ZW1wbGF0ZSAtIGFuZCBiZSBzdXJlIHRvIGNhY2hlIHRoZSByZXN1bHQuXHJcblx0XHR2YXIgZm4gPSAvXlstYS16QS1aMC05XSskLy50ZXN0KHN0cikgP1xyXG5cdFx0XHRjYWNoZVtzdHJdID0gY2FjaGVbc3RyXSB8fFxyXG5cdFx0XHR0bXBsKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHN0cikuaW5uZXJIVE1MKSA6XHJcblxyXG5cdFx0XHQvLyBHZW5lcmF0ZSBhIHJldXNhYmxlIGZ1bmN0aW9uIHRoYXQgd2lsbCBzZXJ2ZSBhcyBhIHRlbXBsYXRlXHJcblx0XHRcdC8vIGdlbmVyYXRvciAoYW5kIHdoaWNoIHdpbGwgYmUgY2FjaGVkKS5cclxuXHRcdFx0bmV3IEZ1bmN0aW9uKFwib2JqXCIsXHJcblx0XHRcdFx0XCJ2YXIgcD1bXSxwcmludD1mdW5jdGlvbigpe3AucHVzaC5hcHBseShwLGFyZ3VtZW50cyk7fTtcIiArXHJcblxyXG5cdFx0XHRcdC8vIEludHJvZHVjZSB0aGUgZGF0YSBhcyBsb2NhbCB2YXJpYWJsZXMgdXNpbmcgd2l0aCgpe31cclxuXHRcdFx0XHRcIndpdGgob2JqKXtwLnB1c2goJ1wiICtcclxuXHJcblx0XHRcdFx0Ly8gQ29udmVydCB0aGUgdGVtcGxhdGUgaW50byBwdXJlIEphdmFTY3JpcHRcclxuXHRcdFx0XHRzdHJcclxuXHRcdFx0XHRcdC5yZXBsYWNlKC9bXFxyXFx0XFxuXS9nLCBcIiBcIilcclxuXHRcdFx0XHRcdC5zcGxpdChcInslXCIpLmpvaW4oXCJcXHRcIilcclxuXHRcdFx0XHRcdC5yZXBsYWNlKC8oKF58JX0pW15cXHRdKiknL2csIFwiJDFcXHJcIilcclxuXHRcdFx0XHRcdC5yZXBsYWNlKC9cXHQ9KC4qPyklfS9nLCBcIicsJDEsJ1wiKVxyXG5cdFx0XHRcdFx0LnNwbGl0KFwiXFx0XCIpLmpvaW4oXCInKTtcIilcclxuXHRcdFx0XHRcdC5zcGxpdChcIiV9XCIpLmpvaW4oXCJwLnB1c2goJ1wiKVxyXG5cdFx0XHRcdFx0LnNwbGl0KFwiXFxyXCIpLmpvaW4oXCJcXFxcJ1wiKVxyXG5cdFx0XHRcdCsgXCInKTt9cmV0dXJuIHAuam9pbignJyk7XCIpO1xyXG5cdFx0Ly8gUHJvdmlkZSBzb21lIGJhc2ljIGN1cnJ5aW5nIHRvIHRoZSB1c2VyXHJcblx0XHRyZXR1cm4gZGF0YSA/IGZuKGRhdGEpIDogZm47XHJcblx0fTtcclxufSkoKTtcclxuXHJcbnZhciBkZWxheSA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHRpbWVyID0gMDtcclxuXHRyZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrLCBtcykge1xyXG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuXHRcdHRpbWVyID0gc2V0VGltZW91dChjYWxsYmFjaywgbXMpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5jb25zdCB1bnVzZWRUYWdzID0gW1xyXG5cdC8vIHtcclxuXHQvLyBcdG5hbWU6ICdzY3JpcHQnXHJcblx0Ly8gfSxcclxuXHR7XHJcblx0XHRuYW1lOiAnbGluaycsXHJcblx0XHRmaWx0ZXI6IHRhZyA9PiB0YWcuZ2V0QXR0cmlidXRlKCdyZWwnKSA9PSAnc3R5bGVzaGVldCdcclxuXHRcdFx0JiYgdGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpLmluY2x1ZGVzKCdkcmFnLW4tZHJvcCcpXHJcblx0fSxcclxuXHR7XHJcblx0XHRuYW1lOiAnaHInLFxyXG5cdFx0ZmlsdGVyOiB0YWcgPT4gJCh0YWcpLmhhc0NsYXNzKCdob3Jpem9udGFsLWxpbmUnKVxyXG5cdFx0XHR8fCAkKHRhZykuaGFzQ2xhc3MoJ3ZlcnRpY2FsLWxpbmUnKVxyXG5cdH1cclxuXTtcclxuXHJcbmZ1bmN0aW9uIGdldFN0eWxlKGVsLCBzdHlsZVByb3ApIHtcclxuXHR2YWx1ZSA9IFwiXCI7XHJcblx0Ly92YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbCk7XHJcblx0aWYgKGVsLnN0eWxlICYmIGVsLnN0eWxlLmxlbmd0aCA+IDAgJiYgZWwuc3R5bGVbc3R5bGVQcm9wXSkvL2NoZWNrIGlubGluZVxyXG5cdFx0dmFyIHZhbHVlID0gZWwuc3R5bGVbc3R5bGVQcm9wXTtcclxuXHRlbHNlXHJcblx0XHRpZiAoZWwuY3VycmVudFN0eWxlKVx0Ly9jaGVjayBkZWZpbmVkIGNzc1xyXG5cdFx0XHR2YXIgdmFsdWUgPSBlbC5jdXJyZW50U3R5bGVbc3R5bGVQcm9wXTtcclxuXHRcdGVsc2UgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XHJcblx0XHRcdHZhciB2YWx1ZSA9IGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldERlZmF1bHRDb21wdXRlZFN0eWxlID9cclxuXHRcdFx0XHRkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXREZWZhdWx0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZVByb3ApIDpcclxuXHRcdFx0XHR3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZVByb3ApO1xyXG5cdFx0fVxyXG5cclxuXHRyZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmlmIChWdnZlYiA9PT0gdW5kZWZpbmVkKSB2YXIgVnZ2ZWIgPSB7fTtcclxuXHJcblZ2dmViLmRlZmF1bHRDb21wb25lbnQgPSBcIl9iYXNlXCI7XHJcblZ2dmViLnByZXNlcnZlUHJvcGVydHlTZWN0aW9ucyA9IHRydWU7XHJcblxyXG5WdnZlYi5iYXNlVXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdCA/IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjLnJlcGxhY2UoL1teXFwvXSo/XFwuanMkLywgJycpIDogJyc7XHJcblxyXG5WdnZlYi5Db21wb25lbnRzR3JvdXAgPSB7fTtcclxuXHJcblZ2dmViLkNvbXBvbmVudHMgPSB7XHJcblx0X2NvbXBvbmVudHM6IHt9LFxyXG5cclxuXHRfbm9kZXNMb29rdXA6IHt9LFxyXG5cclxuXHRfYXR0cmlidXRlc0xvb2t1cDoge30sXHJcblxyXG5cdF9jbGFzc2VzTG9va3VwOiB7fSxcclxuXHJcblx0X2NsYXNzZXNSZWdleExvb2t1cDoge30sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uICh1cmwpIHtcclxuXHR9LFxyXG5cclxuXHRnZXQ6IGZ1bmN0aW9uICh0eXBlKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY29tcG9uZW50c1t0eXBlXTtcclxuXHR9LFxyXG5cclxuXHRhZGQ6IGZ1bmN0aW9uICh0eXBlLCBkYXRhKSB7XHJcblx0XHRkYXRhLnR5cGUgPSB0eXBlO1xyXG5cclxuXHRcdHRoaXMuX2NvbXBvbmVudHNbdHlwZV0gPSBkYXRhO1xyXG5cclxuXHRcdGlmIChkYXRhLm5vZGVzKSB7XHJcblx0XHRcdGZvciAodmFyIGkgaW4gZGF0YS5ub2Rlcykge1xyXG5cdFx0XHRcdHRoaXMuX25vZGVzTG9va3VwW2RhdGEubm9kZXNbaV1dID0gZGF0YTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkYXRhLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0aWYgKGRhdGEuYXR0cmlidXRlcy5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcclxuXHRcdFx0XHRmb3IgKHZhciBpIGluIGRhdGEuYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlc0xvb2t1cFtkYXRhLmF0dHJpYnV0ZXNbaV1dID0gZGF0YTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSBpbiBkYXRhLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5fYXR0cmlidXRlc0xvb2t1cFtpXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlc0xvb2t1cFtpXSA9IHt9O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChkYXRhLmF0dHJpYnV0ZXNbaV0uY29uc3RydWN0b3IgPT09IEFycmF5KSB7XHJcblx0XHRcdFx0XHRcdC8vIOaUr+aMgXRleHRpbnB1dOS4reS4jeWQjOeahOi+k+WFpeexu+Wei2F0dHJpYnV0ZXM6IHsgXCJ0eXBlXCI6IFsndGV4dCcsICdwYXNzd29yZCddIH0sXHJcblx0XHRcdFx0XHRcdGRhdGEuYXR0cmlidXRlc1tpXS5mb3JFYWNoKHZhbHVlID0+IHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2ldW3ZhbHVlXSA9IGRhdGE7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlc0xvb2t1cFtpXVtkYXRhLmF0dHJpYnV0ZXNbaV1dID0gZGF0YTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZGF0YS5jbGFzc2VzKSB7XHJcblx0XHRcdGZvciAodmFyIGkgaW4gZGF0YS5jbGFzc2VzKSB7XHJcblx0XHRcdFx0dGhpcy5fY2xhc3Nlc0xvb2t1cFtkYXRhLmNsYXNzZXNbaV1dID0gZGF0YTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkYXRhLmNsYXNzZXNSZWdleCkge1xyXG5cdFx0XHRmb3IgKHZhciBpIGluIGRhdGEuY2xhc3Nlc1JlZ2V4KSB7XHJcblx0XHRcdFx0dGhpcy5fY2xhc3Nlc1JlZ2V4TG9va3VwW2RhdGEuY2xhc3Nlc1JlZ2V4W2ldXSA9IGRhdGE7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRleHRlbmQ6IGZ1bmN0aW9uIChpbmhlcml0VHlwZSwgdHlwZSwgZGF0YSkge1xyXG5cclxuXHRcdG5ld0RhdGEgPSBkYXRhO1xyXG5cclxuXHRcdGlmIChpbmhlcml0RGF0YSA9IHRoaXMuX2NvbXBvbmVudHNbaW5oZXJpdFR5cGVdKSB7XHJcblx0XHRcdG5ld0RhdGEgPSAkLmV4dGVuZCh0cnVlLCB7fSwgaW5oZXJpdERhdGEsIGRhdGEpO1xyXG5cdFx0XHRuZXdEYXRhLnByb3BlcnRpZXMgPSAkLm1lcmdlKCQubWVyZ2UoW10sIGluaGVyaXREYXRhLnByb3BlcnRpZXMgPyBpbmhlcml0RGF0YS5wcm9wZXJ0aWVzIDogW10pLCBkYXRhLnByb3BlcnRpZXMgPyBkYXRhLnByb3BlcnRpZXMgOiBbXSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly9zb3J0IGJ5IG9yZGVyXHJcblx0XHRuZXdEYXRhLnByb3BlcnRpZXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG5cdFx0XHRpZiAodHlwZW9mIGEuc29ydCA9PT0gXCJ1bmRlZmluZWRcIikgYS5zb3J0ID0gMDtcclxuXHRcdFx0aWYgKHR5cGVvZiBiLnNvcnQgPT09IFwidW5kZWZpbmVkXCIpIGIuc29ydCA9IDA7XHJcblxyXG5cdFx0XHRpZiAoYS5zb3J0IDwgYi5zb3J0KVxyXG5cdFx0XHRcdHJldHVybiAtMTtcclxuXHRcdFx0aWYgKGEuc29ydCA+IGIuc29ydClcclxuXHRcdFx0XHRyZXR1cm4gMTtcclxuXHRcdFx0cmV0dXJuIDA7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0dGhpcy5hZGQodHlwZSwgbmV3RGF0YSk7XHJcblx0fSxcclxuXHJcblxyXG5cdG1hdGNoTm9kZTogZnVuY3Rpb24gKG5vZGUpIHtcclxuXHRcdGlmICgkKG5vZGUpLmF0dHIoZGF0YUNvbXBvbmVudElkKSAmJiB0aGlzLl9jb21wb25lbnRzWyQobm9kZSkuYXR0cihkYXRhQ29tcG9uZW50SWQpXSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fY29tcG9uZW50c1skKG5vZGUpLmF0dHIoZGF0YUNvbXBvbmVudElkKV07XHJcblx0XHR9IGVsc2UgaWYgKCQobm9kZSkuYXR0cigndHlwZScpID09ICdyYWRpbycgfHwgJChub2RlKS5hdHRyKCd0eXBlJykgPT0gJ2NoZWNrYm94Jykge1xyXG5cdFx0XHRjb25zdCAkcGFyZW50ID0gJChub2RlKS5wYXJlbnQoKTtcclxuXHRcdFx0aWYgKCRwYXJlbnQuYXR0cihkYXRhQ29tcG9uZW50SWQpICYmIHRoaXMuX2NvbXBvbmVudHNbJHBhcmVudC5hdHRyKGRhdGFDb21wb25lbnRJZCldKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2NvbXBvbmVudHNbJHBhcmVudC5hdHRyKGRhdGFDb21wb25lbnRJZCldXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAobm9kZS5hdHRyaWJ1dGVzLmxlbmd0aCkge1xyXG5cdFx0XHQvL3NlYXJjaCBmb3IgYXR0cmlidXRlc1xyXG5cdFx0XHRmb3IgKHZhciBpIGluIG5vZGUuYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdGF0dHIgPSBub2RlLmF0dHJpYnV0ZXNbaV0ubmFtZTtcclxuXHRcdFx0XHR2YWx1ZSA9IG5vZGUuYXR0cmlidXRlc1tpXS52YWx1ZTtcclxuXHJcblx0XHRcdFx0aWYgKGF0dHIgaW4gdGhpcy5fYXR0cmlidXRlc0xvb2t1cCkge1xyXG5cdFx0XHRcdFx0Y29tcG9uZW50ID0gdGhpcy5fYXR0cmlidXRlc0xvb2t1cFthdHRyXTtcclxuXHJcblx0XHRcdFx0XHQvL2N1cnJlbnRseSB3ZSBjaGVjayB0aGF0IGlzIG5vdCBhIGNvbXBvbmVudCBieSBsb29raW5nIGF0IG5hbWUgYXR0cmlidXRlXHJcblx0XHRcdFx0XHQvL2lmIHdlIGhhdmUgYSBjb2xsZWN0aW9uIG9mIG9iamVjdHMgaXQgbWVhbnMgdGhhdCBhdHRyaWJ1dGUgdmFsdWUgbXVzdCBiZSBjaGVja2VkXHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIGNvbXBvbmVudFtcIm5hbWVcIl0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHZhbHVlIGluIGNvbXBvbmVudCkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBjb21wb25lbnRbdmFsdWVdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2VcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGNvbXBvbmVudDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZvciAodmFyIGkgaW4gbm9kZS5hdHRyaWJ1dGVzKSB7XHJcblx0XHRcdFx0YXR0ciA9IG5vZGUuYXR0cmlidXRlc1tpXS5uYW1lO1xyXG5cdFx0XHRcdHZhbHVlID0gbm9kZS5hdHRyaWJ1dGVzW2ldLnZhbHVlO1xyXG5cclxuXHRcdFx0XHQvL2NoZWNrIGZvciBub2RlIGNsYXNzZXNcclxuXHRcdFx0XHRpZiAoYXR0ciA9PSBcImNsYXNzXCIpIHtcclxuXHRcdFx0XHRcdGNsYXNzZXMgPSB2YWx1ZS5zcGxpdChcIiBcIik7XHJcblxyXG5cdFx0XHRcdFx0Zm9yIChqIGluIGNsYXNzZXMpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGNsYXNzZXNbal0gaW4gdGhpcy5fY2xhc3Nlc0xvb2t1cClcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fY2xhc3Nlc0xvb2t1cFtjbGFzc2VzW2pdXTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRmb3IgKHJlZ2V4IGluIHRoaXMuX2NsYXNzZXNSZWdleExvb2t1cCkge1xyXG5cdFx0XHRcdFx0XHRyZWdleE9iaiA9IG5ldyBSZWdFeHAocmVnZXgpO1xyXG5cdFx0XHRcdFx0XHRpZiAocmVnZXhPYmouZXhlYyh2YWx1ZSkpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fY2xhc3Nlc1JlZ2V4TG9va3VwW3JlZ2V4XTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRhZ05hbWUgPSBub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcclxuXHRcdGlmICh0YWdOYW1lIGluIHRoaXMuX25vZGVzTG9va3VwKSByZXR1cm4gdGhpcy5fbm9kZXNMb29rdXBbdGFnTmFtZV07XHJcblxyXG5cdFx0Ly9yZXR1cm4gZmFsc2U7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXQoVnZ2ZWIuZGVmYXVsdENvbXBvbmVudCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAodHlwZSkge1xyXG5cclxuXHRcdGNvbXBvbmVudCA9IHRoaXMuX2NvbXBvbmVudHNbdHlwZV07XHJcblxyXG5cdFx0cmlnaHRQYW5lbCA9IGpRdWVyeShcIiNyaWdodC1wYW5lbCAjY29tcG9uZW50LXByb3BlcnRpZXNcIik7XHJcblx0XHRzZWN0aW9uID0gcmlnaHRQYW5lbC5maW5kKCcuc2VjdGlvbltkYXRhLXNlY3Rpb249XCJkZWZhdWx0XCJdJyk7XHJcblxyXG5cdFx0aWYgKCEoVnZ2ZWIucHJlc2VydmVQcm9wZXJ0eVNlY3Rpb25zICYmIHNlY3Rpb24ubGVuZ3RoKSkge1xyXG5cdFx0XHRyaWdodFBhbmVsLmh0bWwoJycpLmFwcGVuZCh0bXBsKFwidnZ2ZWItaW5wdXQtc2VjdGlvbmlucHV0XCIsIHsga2V5OiBcImRlZmF1bHRcIiwgaGVhZGVyOiBjb21wb25lbnQubmFtZSB9KSk7XHJcblx0XHRcdHNlY3Rpb24gPSByaWdodFBhbmVsLmZpbmQoXCIuc2VjdGlvblwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRyaWdodFBhbmVsLmZpbmQoJ1tkYXRhLWhlYWRlcj1cImRlZmF1bHRcIl0gc3BhbicpLmh0bWwoY29tcG9uZW50Lm5hbWUpO1xyXG5cdFx0c2VjdGlvbi5odG1sKFwiXCIpXHJcblxyXG5cdFx0aWYgKGNvbXBvbmVudC5iZWZvcmVJbml0KSBjb21wb25lbnQuYmVmb3JlSW5pdChWdnZlYi5CdWlsZGVyLnNlbGVjdGVkRWwuZ2V0KDApKTtcclxuXHJcblx0XHRmbiA9IGZ1bmN0aW9uIChjb21wb25lbnQsIHByb3BlcnR5KSB7XHJcblx0XHRcdHJldHVybiBwcm9wZXJ0eS5pbnB1dC5vbigncHJvcGVydHlDaGFuZ2UnLCBmdW5jdGlvbiAoZXZlbnQsIHZhbHVlLCBpbnB1dCkge1xyXG5cdFx0XHRcdGVsZW1lbnQgPSBWdnZlYi5CdWlsZGVyLnNlbGVjdGVkRWw7XHJcblx0XHRcdFx0aWYgKHByb3BlcnR5LmNoaWxkKSBlbGVtZW50ID0gZWxlbWVudC5maW5kKHByb3BlcnR5LmNoaWxkKTtcclxuXHRcdFx0XHRpZiAocHJvcGVydHkucGFyZW50KSBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnQocHJvcGVydHkucGFyZW50KTtcclxuXHJcblx0XHRcdFx0aWYgKHByb3BlcnR5Lm9uQ2hhbmdlKSB7XHJcblx0XHRcdFx0XHRlbGVtZW50ID0gcHJvcGVydHkub25DaGFuZ2UoZWxlbWVudCwgdmFsdWUsIGlucHV0LCBjb21wb25lbnQpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHkuaHRtbEF0dHIpIHtcclxuXHRcdFx0XHRcdG9sZFZhbHVlID0gZWxlbWVudC5hdHRyKHByb3BlcnR5Lmh0bWxBdHRyKTtcclxuXHJcblx0XHRcdFx0XHRpZiAocHJvcGVydHkuaHRtbEF0dHIgPT0gJ3RleHQnKSB7XHJcblx0XHRcdFx0XHRcdGVsZW1lbnQudGV4dCh2YWx1ZSk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5Lmh0bWxBdHRyID09IFwiY2xhc3NcIiAmJiBwcm9wZXJ0eS52YWxpZFZhbHVlcykge1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50LnJlbW92ZUNsYXNzKHByb3BlcnR5LnZhbGlkVmFsdWVzLmpvaW4oXCIgXCIpKTtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQuYWRkQ2xhc3ModmFsdWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAocHJvcGVydHkuaHRtbEF0dHIgPT0gXCJzdHlsZVwiKSB7XHJcblx0XHRcdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LmNzcyhwcm9wZXJ0eS5rZXksIHZhbHVlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5hdHRyKHByb3BlcnR5Lmh0bWxBdHRyLCB2YWx1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0XHRcdHR5cGU6ICdhdHRyaWJ1dGVzJyxcclxuXHRcdFx0XHRcdFx0dGFyZ2V0OiBlbGVtZW50LmdldCgwKSxcclxuXHRcdFx0XHRcdFx0YXR0cmlidXRlTmFtZTogcHJvcGVydHkuaHRtbEF0dHIsXHJcblx0XHRcdFx0XHRcdG9sZFZhbHVlOiBvbGRWYWx1ZSxcclxuXHRcdFx0XHRcdFx0bmV3VmFsdWU6IGVsZW1lbnQuYXR0cihwcm9wZXJ0eS5odG1sQXR0cilcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGNvbXBvbmVudC5vbkNoYW5nZSkge1xyXG5cdFx0XHRcdFx0ZWxlbWVudCA9IGNvbXBvbmVudC5vbkNoYW5nZShlbGVtZW50LCBwcm9wZXJ0eSwgdmFsdWUsIGlucHV0KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICghcHJvcGVydHkuY2hpbGQgJiYgIXByb3BlcnR5LnBhcmVudCkgVnZ2ZWIuQnVpbGRlci5zZWxlY3ROb2RlKGVsZW1lbnQpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0bm9kZUVsZW1lbnQgPSBWdnZlYi5CdWlsZGVyLnNlbGVjdGVkRWw7XHJcblxyXG5cdFx0Zm9yICh2YXIgaSBpbiBjb21wb25lbnQucHJvcGVydGllcykge1xyXG5cdFx0XHRwcm9wZXJ0eSA9IGNvbXBvbmVudC5wcm9wZXJ0aWVzW2ldO1xyXG5cclxuXHRcdFx0aWYgKHByb3BlcnR5LmJlZm9yZUluaXQpIHByb3BlcnR5LmJlZm9yZUluaXQoZWxlbWVudC5nZXQoMCkpXHJcblxyXG5cdFx0XHRlbGVtZW50ID0gbm9kZUVsZW1lbnQ7XHJcblx0XHRcdGlmIChwcm9wZXJ0eS5jaGlsZCkgZWxlbWVudCA9IGVsZW1lbnQuZmluZChwcm9wZXJ0eS5jaGlsZCk7XHJcblxyXG5cdFx0XHRpZiAocHJvcGVydHkuZGF0YSkge1xyXG5cdFx0XHRcdHByb3BlcnR5LmRhdGFbXCJrZXlcIl0gPSBwcm9wZXJ0eS5rZXk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cHJvcGVydHkuZGF0YSA9IHsgXCJrZXlcIjogcHJvcGVydHkua2V5IH07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0eXBlb2YgcHJvcGVydHkuZ3JvdXAgPT09ICd1bmRlZmluZWQnKSBwcm9wZXJ0eS5ncm91cCA9IG51bGw7XHJcblxyXG5cdFx0XHRwcm9wZXJ0eS5pbnB1dCA9IHByb3BlcnR5LmlucHV0dHlwZS5pbml0KHByb3BlcnR5LmRhdGEpO1xyXG5cclxuXHRcdFx0aWYgKHByb3BlcnR5LmluaXQpIHtcclxuXHRcdFx0XHRwcm9wZXJ0eS5pbnB1dHR5cGUuc2V0VmFsdWUocHJvcGVydHkuaW5pdChlbGVtZW50LmdldCgwKSkpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5Lmh0bWxBdHRyKSB7XHJcblx0XHRcdFx0aWYgKHByb3BlcnR5Lmh0bWxBdHRyID09ICd0ZXh0Jykge1xyXG5cdFx0XHRcdFx0dmFsdWUgPSBlbGVtZW50LnRleHQoKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5Lmh0bWxBdHRyID09IFwic3R5bGVcIikge1xyXG5cdFx0XHRcdFx0Ly92YWx1ZSA9IGVsZW1lbnQuY3NzKHByb3BlcnR5LmtleSk7Ly9qcXVlcnkgY3NzIHJldHVybnMgY29tcHV0ZWQgc3R5bGVcclxuXHRcdFx0XHRcdHZhbHVlID0gZ2V0U3R5bGUoZWxlbWVudC5nZXQoMCksIHByb3BlcnR5LmtleSk7Ly9nZXRTdHlsZSByZXR1cm5zIGRlY2xhcmVkIHN0eWxlXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHZhbHVlID0gZWxlbWVudC5hdHRyKHByb3BlcnR5Lmh0bWxBdHRyKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vaWYgYXR0cmlidXRlIGlzIGNsYXNzIGNoZWNrIGlmIG9uZSBvZiB2YWxpZCB2YWx1ZXMgaXMgaW5jbHVkZWQgYXMgY2xhc3MgdG8gc2V0IHRoZSBzZWxlY3RcclxuXHRcdFx0XHRpZiAodmFsdWUgJiYgcHJvcGVydHkuaHRtbEF0dHIgPT0gXCJjbGFzc1wiICYmIHByb3BlcnR5LnZhbGlkVmFsdWVzKSB7XHJcblx0XHRcdFx0XHR2YWx1ZSA9IHZhbHVlLnNwbGl0KFwiIFwiKS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBwcm9wZXJ0eS52YWxpZFZhbHVlcy5pbmRleE9mKGVsKSAhPSAtMVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRwcm9wZXJ0eS5pbnB1dHR5cGUuc2V0VmFsdWUodmFsdWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmbihjb21wb25lbnQsIHByb3BlcnR5KTtcclxuXHJcblx0XHRcdGlmIChwcm9wZXJ0eS5pbnB1dHR5cGUgPT0gU2VjdGlvbklucHV0KSB7XHJcblx0XHRcdFx0c2VjdGlvbiA9IHJpZ2h0UGFuZWwuZmluZCgnLnNlY3Rpb25bZGF0YS1zZWN0aW9uPVwiJyArIHByb3BlcnR5LmtleSArICdcIl0nKTtcclxuXHJcblx0XHRcdFx0aWYgKFZ2dmViLnByZXNlcnZlUHJvcGVydHlTZWN0aW9ucyAmJiBzZWN0aW9uLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0c2VjdGlvbi5odG1sKFwiXCIpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyaWdodFBhbmVsLmFwcGVuZChwcm9wZXJ0eS5pbnB1dCk7XHJcblx0XHRcdFx0XHRzZWN0aW9uID0gcmlnaHRQYW5lbC5maW5kKCcuc2VjdGlvbltkYXRhLXNlY3Rpb249XCInICsgcHJvcGVydHkua2V5ICsgJ1wiXScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRyb3cgPSAkKHRtcGwoJ3Z2dmViLXByb3BlcnR5JywgcHJvcGVydHkpKTtcclxuXHRcdFx0XHRyb3cuZmluZCgnLmlucHV0JykuYXBwZW5kKHByb3BlcnR5LmlucHV0KTtcclxuXHRcdFx0XHRzZWN0aW9uLmFwcGVuZChyb3cpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbXBvbmVudC5pbml0KSBjb21wb25lbnQuaW5pdChWdnZlYi5CdWlsZGVyLnNlbGVjdGVkRWwuZ2V0KDApKTtcclxuXHR9XHJcbn07XHJcblxyXG5cclxuXHJcblZ2dmViLld5c2l3eWdFZGl0b3IgPSB7XHJcblxyXG5cdGlzQWN0aXZlOiBmYWxzZSxcclxuXHRvbGRWYWx1ZTogJycsXHJcblx0ZG9jOiBmYWxzZSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRvYykge1xyXG5cdFx0dGhpcy5kb2MgPSBkb2M7XHJcblxyXG5cdFx0JChcIiNib2xkLWJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGRvYy5leGVjQ29tbWFuZCgnYm9sZCcsIGZhbHNlLCBudWxsKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI2l0YWxpYy1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRkb2MuZXhlY0NvbW1hbmQoJ2l0YWxpYycsIGZhbHNlLCBudWxsKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI3VuZGVybGluZS1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRkb2MuZXhlY0NvbW1hbmQoJ3VuZGVybGluZScsIGZhbHNlLCBudWxsKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI3N0cmlrZS1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRkb2MuZXhlY0NvbW1hbmQoJ3N0cmlrZVRocm91Z2gnLCBmYWxzZSwgbnVsbCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNsaW5rLWJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGRvYy5leGVjQ29tbWFuZCgnY3JlYXRlTGluaycsIGZhbHNlLCBcIiNcIik7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0dW5kbzogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZG9jLmV4ZWNDb21tYW5kKCd1bmRvJywgZmFsc2UsIG51bGwpO1xyXG5cdH0sXHJcblxyXG5cdHJlZG86IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHR0aGlzLmRvYy5leGVjQ29tbWFuZCgncmVkbycsIGZhbHNlLCBudWxsKTtcclxuXHR9LFxyXG5cclxuXHRlZGl0OiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0ZWxlbWVudC5hdHRyKHsgJ2NvbnRlbnRlZGl0YWJsZSc6IHRydWUsICdzcGVsbGNoZWNra2VyJzogZmFsc2UgfSk7XHJcblx0XHQkKFwiI3d5c2l3eWctZWRpdG9yXCIpLnNob3coKTtcclxuXHJcblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG5cdFx0dGhpcy5pc0FjdGl2ZSA9IHRydWU7XHJcblx0XHR0aGlzLm9sZFZhbHVlID0gZWxlbWVudC5odG1sKCk7XHJcblx0fSxcclxuXHJcblx0ZGVzdHJveTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdGVsZW1lbnQucmVtb3ZlQXR0cignY29udGVudGVkaXRhYmxlIHNwZWxsY2hlY2trZXInKTtcclxuXHRcdCQoXCIjd3lzaXd5Zy1lZGl0b3JcIikuaGlkZSgpO1xyXG5cdFx0dGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuXHJcblx0XHRub2RlID0gdGhpcy5lbGVtZW50LmdldCgwKTtcclxuXHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHR0eXBlOiAnY2hhcmFjdGVyRGF0YScsXHJcblx0XHRcdHRhcmdldDogbm9kZSxcclxuXHRcdFx0b2xkVmFsdWU6IHRoaXMub2xkVmFsdWUsXHJcblx0XHRcdG5ld1ZhbHVlOiBub2RlLmlubmVySFRNTFxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5WdnZlYi5CdWlsZGVyID0ge1xyXG5cclxuXHRkcmFnTW92ZU11dGF0aW9uOiBmYWxzZSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKHVybCwgY2FsbGJhY2spIHtcclxuXHJcblx0XHRzZWxmID0gdGhpcztcclxuXHJcblx0XHRzZWxmLmxvYWRDb250cm9sR3JvdXBzKCk7XHJcblxyXG5cdFx0c2VsZi5zZWxlY3RlZEVsID0gbnVsbDtcclxuXHRcdHNlbGYuaGlnaGxpZ2h0RWwgPSBudWxsO1xyXG5cdFx0c2VsZi5pbml0Q2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHJcblx0XHRzZWxmLmRvY3VtZW50RnJhbWUgPSAkKFwiI2lmcmFtZS13cmFwcGVyID4gaWZyYW1lXCIpO1xyXG5cdFx0c2VsZi5jYW52YXMgPSAkKFwiI2NhbnZhc1wiKTtcclxuXHJcblx0XHRzZWxmLl9sb2FkSWZyYW1lKHVybCk7XHJcblxyXG5cdFx0c2VsZi5faW5pdERyYWdkcm9wKCk7XHJcblxyXG5cdFx0c2VsZi5kcmFnRWxlbWVudCA9IG51bGw7XHJcblx0fSxcclxuXHJcblx0LyogY29udHJvbHMgKi9cclxuXHRsb2FkQ29udHJvbEdyb3VwczogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdGNvbXBvbmVudHNMaXN0ID0gJChcIiNjb21wb25lbnRzLWxpc3RcIik7XHJcblx0XHRjb21wb25lbnRzTGlzdC5lbXB0eSgpO1xyXG5cclxuXHRcdGZvciAoZ3JvdXAgaW4gVnZ2ZWIuQ29tcG9uZW50c0dyb3VwKSB7XHJcblx0XHRcdGNvbXBvbmVudHNMaXN0LmFwcGVuZCgnPGxpIGNsYXNzPVwiaGVhZGVyXCIgZGF0YS1zZWN0aW9uPVwiJyArIGdyb3VwICsgJ1wiICBkYXRhLXNlYXJjaD1cIlwiPjxsYWJlbCBjbGFzcz1cImhlYWRlclwiIGZvcj1cImNvbXBoZWFkXycgKyBncm91cCArICdcIj4nICsgZ3JvdXAgKyAnICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWFycm93XCI+PC9kaXY+XFxcclxuXHRcdFx0XHRcdFx0XHRcdCAgIDwvbGFiZWw+PGlucHV0IGNsYXNzPVwiaGVhZGVyX2NoZWNrXCIgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD1cInRydWVcIiBpZD1cImNvbXBoZWFkXycgKyBncm91cCArICdcIj4gIDxvbD48L29sPjwvbGk+Jyk7XHJcblxyXG5cdFx0XHRjb21wb25lbnRzU3ViTGlzdCA9IGNvbXBvbmVudHNMaXN0LmZpbmQoJ2xpW2RhdGEtc2VjdGlvbj1cIicgKyBncm91cCArICdcIl0gIG9sJyk7XHJcblxyXG5cdFx0XHRjb21wb25lbnRzID0gVnZ2ZWIuQ29tcG9uZW50c0dyb3VwW2dyb3VwXTtcclxuXHJcblx0XHRcdGZvciAoaSBpbiBjb21wb25lbnRzKSB7XHJcblx0XHRcdFx0Y29tcG9uZW50VHlwZSA9IGNvbXBvbmVudHNbaV07XHJcblx0XHRcdFx0Y29tcG9uZW50ID0gVnZ2ZWIuQ29tcG9uZW50cy5nZXQoY29tcG9uZW50VHlwZSk7XHJcblxyXG5cdFx0XHRcdGlmIChjb21wb25lbnQpIHtcclxuXHRcdFx0XHRcdGl0ZW0gPSAkKCc8bGkgZGF0YS1zZWN0aW9uPVwiJyArIGdyb3VwICsgJ1wiIGRhdGEtdHlwZT1cIicgKyBjb21wb25lbnRUeXBlICsgJ1wiIGRhdGEtc2VhcmNoPVwiJyArIGNvbXBvbmVudC5uYW1lLnRvTG93ZXJDYXNlKCkgKyAnXCI+PGEgaHJlZj1cIiNcIj4nICsgY29tcG9uZW50Lm5hbWUgKyBcIjwvYT48L2xpPlwiKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoY29tcG9uZW50LmltYWdlKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRpdGVtLmNzcyh7XHJcblx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZEltYWdlOiBcInVybChcIiArICdsaWJzL2J1aWxkZXIvJyArIGNvbXBvbmVudC5pbWFnZSArIFwiKVwiLFxyXG5cdFx0XHRcdFx0XHRcdGJhY2tncm91bmRSZXBlYXQ6IFwibm8tcmVwZWF0XCJcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRjb21wb25lbnRzU3ViTGlzdC5hcHBlbmQoaXRlbSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRsb2FkVXJsOiBmdW5jdGlvbiAodXJsKSB7XHJcblx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblx0XHRzZWxmLmlmcmFtZS5zcmMgPSB1cmw7XHJcblx0fSxcclxuXHJcblx0LyogaWZyYW1lICovXHJcblx0X2xvYWRJZnJhbWU6IGZ1bmN0aW9uICh1cmwpIHtcclxuXHJcblx0XHRzZWxmLmlmcmFtZSA9IHRoaXMuZG9jdW1lbnRGcmFtZS5nZXQoMCk7XHJcblx0XHRzZWxmLmlmcmFtZS5zcmMgPSB1cmw7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuZG9jdW1lbnRGcmFtZS5vbihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0d2luZG93LkZyYW1lV2luZG93ID0gc2VsZi5pZnJhbWUuY29udGVudFdpbmRvdztcclxuXHRcdFx0d2luZG93LkZyYW1lRG9jdW1lbnQgPSBzZWxmLmlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xyXG5cclxuXHRcdFx0VnZ2ZWIuV3lzaXd5Z0VkaXRvci5pbml0KHdpbmRvdy5GcmFtZURvY3VtZW50KTtcclxuXHRcdFx0aWYgKHNlbGYuaW5pdENhbGxiYWNrKSBzZWxmLmluaXRDYWxsYmFjaygpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNlbGYuX2ZyYW1lTG9hZGVkKCk7XHJcblx0XHR9KTtcclxuXHJcblx0fSxcclxuXHJcblx0X2ZyYW1lTG9hZGVkOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0c2VsZi5mcmFtZURvYyA9ICQod2luZG93LkZyYW1lRG9jdW1lbnQpO1xyXG5cdFx0c2VsZi5mcmFtZUh0bWwgPSAkKHdpbmRvdy5GcmFtZURvY3VtZW50KS5maW5kKFwiaHRtbFwiKTtcclxuXHRcdHNlbGYuZnJhbWVCb2R5ID0gJCh3aW5kb3cuRnJhbWVEb2N1bWVudCkuZmluZChcImJvZHlcIik7XHJcblxyXG5cdFx0dGhpcy5faW5pdEhpZ2h0bGlnaHQoKTtcclxuXHR9LFxyXG5cclxuXHRfZ2V0RWxlbWVudFR5cGU6IGZ1bmN0aW9uIChlbCkge1xyXG5cclxuXHRcdC8vc2VhcmNoIGZvciBjb21wb25lbnQgYXR0cmlidXRlXHJcblx0XHRjb21wb25lbnROYW1lID0gJyc7XHJcblxyXG5cdFx0aWYgKGVsLmF0dHJpYnV0ZXMpXHJcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZWwuYXR0cmlidXRlcy5sZW5ndGg7IGorKykge1xyXG5cclxuXHRcdFx0XHRpZiAoZWwuYXR0cmlidXRlc1tqXS5ub2RlTmFtZS5pbmRleE9mKCdkYXRhLWNvbXBvbmVudCcpID4gLTEpIHtcclxuXHRcdFx0XHRcdGNvbXBvbmVudE5hbWUgPSBlbC5hdHRyaWJ1dGVzW2pdLm5vZGVOYW1lLnJlcGxhY2UoJ2RhdGEtY29tcG9uZW50LScsICcnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRpZiAoY29tcG9uZW50TmFtZSAhPSAnJykgcmV0dXJuIGNvbXBvbmVudE5hbWU7XHJcblxyXG5cdFx0aWYgKGVsLmF0dHJpYnV0ZXMpXHJcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZWwuYXR0cmlidXRlcy5sZW5ndGg7IGorKykge1xyXG5cclxuXHRcdFx0XHRpZiAoZWwuYXR0cmlidXRlc1tqXS5ub2RlTmFtZS5pbmRleE9mKCdkYXRhLWNvbXBvbmVudCcpID4gLTEpIHtcclxuXHRcdFx0XHRcdGNvbXBvbmVudE5hbWUgPSBlbC5hdHRyaWJ1dGVzW2pdLm5vZGVOYW1lLnJlcGxhY2UoJ2RhdGEtY29tcG9uZW50LScsICcnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRpZiAoY29tcG9uZW50TmFtZSAhPSAnJykgcmV0dXJuIGNvbXBvbmVudE5hbWU7XHJcblx0XHQvL2lmIChjbGFzc05hbWUpIHJldHVybiBjb21wb25lbnROYW1lO1xyXG5cdFx0cmV0dXJuIGVsLnRhZ05hbWU7XHJcblx0fSxcclxuXHJcblx0bG9hZE5vZGVDb21wb25lbnQ6IGZ1bmN0aW9uIChub2RlKSB7XHJcblx0XHRkYXRhID0gVnZ2ZWIuQ29tcG9uZW50cy5tYXRjaE5vZGUobm9kZSk7XHJcblx0XHRpZiAoZGF0YSkgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIoZGF0YS50eXBlKTtcclxuXHJcblx0fSxcclxuXHJcblx0c2VsZWN0Tm9kZTogZnVuY3Rpb24gKG5vZGUgPSBmYWxzZSkge1xyXG5cclxuXHRcdGlmICghbm9kZSkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc2VsZi50ZXh0ZWRpdEVsICYmIHNlbGYuc2VsZWN0ZWRFbC5nZXQoMCkgIT0gbm9kZSkge1xyXG5cdFx0XHRWdnZlYi5XeXNpd3lnRWRpdG9yLmRlc3Ryb3koc2VsZi50ZXh0ZWRpdEVsKTtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikucmVtb3ZlQ2xhc3MoXCJ0ZXh0LWVkaXRcIikuZmluZChcIiNzZWxlY3QtYWN0aW9uc1wiKS5zaG93KCk7XHJcblx0XHRcdHNlbGYudGV4dGVkaXRFbCA9IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0c2VsZi5zZWxlY3RlZEVsID0gdGFyZ2V0ID0galF1ZXJ5KG5vZGUpO1xyXG5cdFx0b2Zmc2V0ID0gdGFyZ2V0Lm9mZnNldCgpO1xyXG5cclxuXHJcblx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5jc3MoXHJcblx0XHRcdHtcclxuXHRcdFx0XHRcInRvcFwiOiBvZmZzZXQudG9wIC0gc2VsZi5mcmFtZURvYy5zY3JvbGxUb3AoKSxcclxuXHRcdFx0XHRcImxlZnRcIjogb2Zmc2V0LmxlZnQgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbExlZnQoKSxcclxuXHRcdFx0XHRcIndpZHRoXCI6IHRhcmdldC5vdXRlcldpZHRoKCksXHJcblx0XHRcdFx0XCJoZWlnaHRcIjogdGFyZ2V0Lm91dGVySGVpZ2h0KCksXHJcblx0XHRcdFx0XCJkaXNwbGF5XCI6IFwiYmxvY2tcIixcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0alF1ZXJ5KFwiI2hpZ2hsaWdodC1uYW1lXCIpLmh0bWwoc2VsZi5fZ2V0RWxlbWVudFR5cGUobm9kZSkpO1xyXG5cclxuXHR9LFxyXG5cclxuXHQvKiBpZnJhbWUgaGlnaGxpZ2h0ICovXHJcblx0X2luaXRIaWdodGxpZ2h0OiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0bW92ZUV2ZW50ID0geyB0YXJnZXQ6IG51bGwsIH07XHJcblxyXG5cdFx0dGhpcy5mcmFtZUJvZHkub24oXCJtb3VzZW1vdmUgdG91Y2htb3ZlXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHQvL2RlbGF5IGZvciBoYWxmIGEgc2Vjb25kIGlmIGRyYWdnaW5nIG92ZXIgc2FtZSBlbGVtZW50XHJcblx0XHRcdC8vIGlmIChldmVudC50YXJnZXQgPT0gbW92ZUV2ZW50LnRhcmdldCAmJiAoKGV2ZW50LnRpbWVTdGFtcCAtIG1vdmVFdmVudC50aW1lU3RhbXApIDwgNTAwKSkgcmV0dXJuO1xyXG5cdFx0XHRpZiAoZXZlbnQudGFyZ2V0KSB7XHJcblx0XHRcdFx0bW92ZUV2ZW50ID0gZXZlbnQ7XHJcblxyXG5cdFx0XHRcdHNlbGYuaGlnaGxpZ2h0RWwgPSB0YXJnZXQgPSBqUXVlcnkoZXZlbnQudGFyZ2V0KTtcclxuXHRcdFx0XHRvZmZzZXQgPSB0YXJnZXQub2Zmc2V0KCk7XHJcblx0XHRcdFx0d2lkdGggPSB0YXJnZXQub3V0ZXJXaWR0aCgpO1xyXG5cdFx0XHRcdGhlaWdodCA9IHRhcmdldC5vdXRlckhlaWdodCgpO1xyXG5cclxuXHRcdFx0XHRpZiAoc2VsZi5pc0RyYWdnaW5nKSB7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdFbGVtZW50LmNzcyh7XHJcblx0XHRcdFx0XHRcdGRpc3BsYXk6ICdub25lJ1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRwYXJlbnQgPSBzZWxmLmhpZ2hsaWdodEVsO1xyXG5cdFx0XHRcdFx0cGFyZW50T2Zmc2V0ID0gc2VsZi5kcmFnRWxlbWVudC5vZmZzZXQoKTtcclxuXHRcdFx0XHRcdC8vIHRyeSB7XHJcblx0XHRcdFx0XHQvLyBcdHNlbGYuZHJhZ0VsZW1lbnQuY3NzKHtcclxuXHRcdFx0XHRcdC8vIFx0XHRkaXNwbGF5OiAnbm9uZSdcclxuXHRcdFx0XHRcdC8vIFx0fSk7XHJcblx0XHRcdFx0XHQvLyBcdGlmIChldmVudC5vcmlnaW5hbEV2ZW50ICYmIChvZmZzZXQubGVmdCA+IChldmVudC5vcmlnaW5hbEV2ZW50LnggLSAxMCkpKSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0aWYgKG9mZnNldC50b3AgPiAoZXZlbnQub3JpZ2luYWxFdmVudC55IC0gMTApKSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRwYXJlbnQuYmVmb3JlKHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRwYXJlbnQucHJlcGVuZChzZWxmLmRyYWdFbGVtZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQucHJlcGVuZFRvKHBhcmVudCk7XHJcblx0XHRcdFx0XHQvLyBcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gXHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdGlmIChldmVudC5vcmlnaW5hbEV2ZW50ICYmIG9mZnNldC50b3AgPiAoKGV2ZW50Lm9yaWdpbmFsRXZlbnQueSAtIDEwKSkpIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHBhcmVudC5iZWZvcmUoc2VsZi5kcmFnRWxlbWVudCk7XHJcblx0XHRcdFx0XHQvLyBcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHBhcmVudC5hcHBlbmQoc2VsZi5kcmFnRWxlbWVudCk7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRzZWxmLmRyYWdFbGVtZW50LmFwcGVuZFRvKHBhcmVudCk7XHJcblx0XHRcdFx0XHQvLyBcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gXHR9XHJcblx0XHRcdFx0XHQvLyB9IGNhdGNoIChlcnIpIHtcclxuXHRcdFx0XHRcdC8vIFx0Y29uc29sZS5sb2coZXJyKTtcclxuXHRcdFx0XHRcdC8vIH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdGpRdWVyeShcIiNoaWdobGlnaHQtYm94XCIpLmNzcyhcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFwidG9wXCI6IG9mZnNldC50b3AgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbFRvcCgpLFxyXG5cdFx0XHRcdFx0XHRcdFwibGVmdFwiOiBvZmZzZXQubGVmdCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsTGVmdCgpLFxyXG5cdFx0XHRcdFx0XHRcdFwid2lkdGhcIjogd2lkdGgsXHJcblx0XHRcdFx0XHRcdFx0XCJoZWlnaHRcIjogaGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHRcdFwiZGlzcGxheVwiOiBldmVudC50YXJnZXQuaGFzQXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnKSA/IFwibm9uZVwiIDogXCJibG9ja1wiXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdGpRdWVyeShcIiNoaWdobGlnaHQtbmFtZVwiKS5odG1sKHNlbGYuX2dldEVsZW1lbnRUeXBlKGV2ZW50LnRhcmdldCkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdHRoaXMuZnJhbWVCb2R5Lm9uKFwibW91c2V1cCB0b3VjaGVuZFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0aWYgKHNlbGYuaXNEcmFnZ2luZykge1xyXG5cdFx0XHRcdHNlbGYuaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRpZiAoY29tcG9uZW50LmRyYWdIdG1sKSAvL2lmIGRyYWdIdG1sIGlzIHNldCBmb3IgZHJhZ2dpbmcgdGhlbiBzZXQgcmVhbCBjb21wb25lbnQgaHRtbFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdG5ld0VsZW1lbnQgPSAkKGNvbXBvbmVudC5odG1sKTtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQucmVwbGFjZVdpdGgobmV3RWxlbWVudCk7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdFbGVtZW50ID0gbmV3RWxlbWVudDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGNvbXBvbmVudC5hZnRlckRyb3ApIHNlbGYuZHJhZ0VsZW1lbnQgPSBjb21wb25lbnQuYWZ0ZXJEcm9wKHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cclxuXHRcdFx0XHRub2RlID0gc2VsZi5kcmFnRWxlbWVudC5nZXQoMCk7XHJcblx0XHRcdFx0c2VsZi5zZWxlY3ROb2RlKG5vZGUpO1xyXG5cdFx0XHRcdHNlbGYubG9hZE5vZGVDb21wb25lbnQobm9kZSk7XHJcblxyXG5cdFx0XHRcdGlmIChzZWxmLmRyYWdNb3ZlTXV0YXRpb24gPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0XHRcdFx0dHlwZTogJ2NoaWxkTGlzdCcsXHJcblx0XHRcdFx0XHRcdHRhcmdldDogbm9kZS5wYXJlbnROb2RlLFxyXG5cdFx0XHRcdFx0XHRhZGRlZE5vZGVzOiBbbm9kZV0sXHJcblx0XHRcdFx0XHRcdG5leHRTaWJsaW5nOiBub2RlLm5leHRTaWJsaW5nXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnTW92ZU11dGF0aW9uLm5ld1BhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ01vdmVNdXRhdGlvbi5uZXdOZXh0U2libGluZyA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0XHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbihzZWxmLmRyYWdNb3ZlTXV0YXRpb24pO1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnTW92ZU11dGF0aW9uID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0dGhpcy5mcmFtZUJvZHkub24oXCJkYmxjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcblx0XHRcdHNlbGYudGV4dGVkaXRFbCA9IHRhcmdldCA9IGpRdWVyeShldmVudC50YXJnZXQpO1xyXG5cclxuXHRcdFx0VnZ2ZWIuV3lzaXd5Z0VkaXRvci5lZGl0KHNlbGYudGV4dGVkaXRFbCk7XHJcblxyXG5cdFx0XHRzZWxmLnRleHRlZGl0RWwuYXR0cih7ICdjb250ZW50ZWRpdGFibGUnOiB0cnVlLCAnc3BlbGxjaGVja2tlcic6IGZhbHNlIH0pO1xyXG5cclxuXHRcdFx0c2VsZi50ZXh0ZWRpdEVsLm9uKFwiYmx1ciBrZXl1cCBwYXN0ZSBpbnB1dFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuY3NzKHtcclxuXHRcdFx0XHRcdFwid2lkdGhcIjogc2VsZi50ZXh0ZWRpdEVsLm91dGVyV2lkdGgoKSxcclxuXHRcdFx0XHRcdFwiaGVpZ2h0XCI6IHNlbGYudGV4dGVkaXRFbC5vdXRlckhlaWdodCgpXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuYWRkQ2xhc3MoXCJ0ZXh0LWVkaXRcIikuZmluZChcIiNzZWxlY3QtYWN0aW9uc1wiKS5oaWRlKCk7XHJcblx0XHRcdGpRdWVyeShcIiNoaWdobGlnaHQtYm94XCIpLmhpZGUoKTtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHR0aGlzLmZyYW1lQm9keS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQudGFyZ2V0KSB7XHJcblx0XHRcdFx0aWYgKCFpc1ByZXZpZXcgJiYgISQoJyNhdHRyaWJ1dGUtc2V0dGluZ3MnKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuXHRcdFx0XHRcdCQoJyNhdHRyaWJ1dGUtc2V0dGluZ3MnKVxyXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcblx0XHRcdFx0XHRcdC5zaWJsaW5ncygpXHJcblx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdFx0XHQkKCcjbGVmdC1wYW5lbCcpLmhpZGUoKTtcclxuXHRcdFx0XHRcdCQoJyNyaWdodC1wYW5lbCcpLnNob3coKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0c2VsZi5zZWxlY3ROb2RlKGV2ZW50LnRhcmdldCk7XHJcblx0XHRcdFx0c2VsZi5sb2FkTm9kZUNvbXBvbmVudChldmVudC50YXJnZXQpO1xyXG5cclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5mcmFtZUJvZHkua2V5ZG93bihlID0+IHtcclxuXHRcdFx0aWYgKHNlbGYuc2VsZWN0ZWRFbCAmJiBzZWxmLnNlbGVjdGVkRWwucHJvcCgndGFnTmFtZScpICE9ICdCT0RZJykge1xyXG5cdFx0XHRcdGlmIChlLndoaWNoID09IDM3IHx8IGUud2hpY2ggPT0gMzggfHwgZS53aGljaCA9PSAzOSB8fCBlLndoaWNoID09IDQwKSB7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaWZyYW1lSWQnKS5jb250ZW50V2luZG93LmFycm93S2V5TW92ZShlLndoaWNoLCBzZWxmLnNlbGVjdGVkRWwpO1xyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50IHRoZSBkZWZhdWx0IGFjdGlvbiAoc2Nyb2xsIC8gbW92ZSBjYXJldClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjZHJhZy1ib3hcIikub24oXCJtb3VzZWRvd25cIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmhpZGUoKTtcclxuXHRcdFx0c2VsZi5kcmFnRWxlbWVudCA9IHNlbGYuc2VsZWN0ZWRFbDtcclxuXHRcdFx0c2VsZi5pc0RyYWdnaW5nID0gdHJ1ZTtcclxuXHJcblx0XHRcdG5vZGUgPSBzZWxmLmRyYWdFbGVtZW50LmdldCgwKTtcclxuXHJcblxyXG5cdFx0XHRzZWxmLmRyYWdNb3ZlTXV0YXRpb24gPSB7XHJcblx0XHRcdFx0dHlwZTogJ21vdmUnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZSxcclxuXHRcdFx0XHRvbGRQYXJlbnQ6IG5vZGUucGFyZW50Tm9kZSxcclxuXHRcdFx0XHRvbGROZXh0U2libGluZzogbm9kZS5uZXh0U2libGluZ1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly9zZWxmLnNlbGVjdE5vZGUoZmFsc2UpO1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI2Rvd24tYm94XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmhpZGUoKTtcclxuXHJcblx0XHRcdG5vZGUgPSBzZWxmLnNlbGVjdGVkRWwuZ2V0KDApO1xyXG5cdFx0XHRvbGRQYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdG9sZE5leHRTaWJsaW5nID0gbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRcdG5leHQgPSBzZWxmLnNlbGVjdGVkRWwubmV4dCgpO1xyXG5cclxuXHRcdFx0aWYgKG5leHQubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdG5leHQuYWZ0ZXIoc2VsZi5zZWxlY3RlZEVsKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzZWxmLnNlbGVjdGVkRWwucGFyZW50KCkuYWZ0ZXIoc2VsZi5zZWxlY3RlZEVsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bmV3UGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRuZXdOZXh0U2libGluZyA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0XHR0eXBlOiAnbW92ZScsXHJcblx0XHRcdFx0dGFyZ2V0OiBub2RlLFxyXG5cdFx0XHRcdG9sZFBhcmVudDogb2xkUGFyZW50LFxyXG5cdFx0XHRcdG5ld1BhcmVudDogbmV3UGFyZW50LFxyXG5cdFx0XHRcdG9sZE5leHRTaWJsaW5nOiBvbGROZXh0U2libGluZyxcclxuXHRcdFx0XHRuZXdOZXh0U2libGluZzogbmV3TmV4dFNpYmxpbmdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI3VwLWJveFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5zZWxlY3RlZEVsLmdldCgwKTtcclxuXHRcdFx0b2xkUGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRvbGROZXh0U2libGluZyA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0XHRuZXh0ID0gc2VsZi5zZWxlY3RlZEVsLnByZXYoKTtcclxuXHJcblx0XHRcdGlmIChuZXh0Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRuZXh0LmJlZm9yZShzZWxmLnNlbGVjdGVkRWwpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHNlbGYuc2VsZWN0ZWRFbC5wYXJlbnQoKS5iZWZvcmUoc2VsZi5zZWxlY3RlZEVsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bmV3UGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRuZXdOZXh0U2libGluZyA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0XHR0eXBlOiAnbW92ZScsXHJcblx0XHRcdFx0dGFyZ2V0OiBub2RlLFxyXG5cdFx0XHRcdG9sZFBhcmVudDogb2xkUGFyZW50LFxyXG5cdFx0XHRcdG5ld1BhcmVudDogbmV3UGFyZW50LFxyXG5cdFx0XHRcdG9sZE5leHRTaWJsaW5nOiBvbGROZXh0U2libGluZyxcclxuXHRcdFx0XHRuZXdOZXh0U2libGluZzogbmV3TmV4dFNpYmxpbmdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI2Nsb25lLWJveFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRjbG9uZSA9IHNlbGYuc2VsZWN0ZWRFbC5jbG9uZSgpO1xyXG5cclxuXHRcdFx0c2VsZi5zZWxlY3RlZEVsLmFmdGVyKGNsb25lKTtcclxuXHJcblx0XHRcdHNlbGYuc2VsZWN0ZWRFbCA9IGNsb25lLmNsaWNrKCk7XHJcblxyXG5cdFx0XHRub2RlID0gY2xvbmUuZ2V0KDApO1xyXG5cdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0XHR0eXBlOiAnY2hpbGRMaXN0JyxcclxuXHRcdFx0XHR0YXJnZXQ6IG5vZGUucGFyZW50Tm9kZSxcclxuXHRcdFx0XHRhZGRlZE5vZGVzOiBbbm9kZV0sXHJcblx0XHRcdFx0bmV4dFNpYmxpbmc6IG5vZGUubmV4dFNpYmxpbmdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI3BhcmVudC1ib3hcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcblx0XHRcdG5vZGUgPSBzZWxmLnNlbGVjdGVkRWwucGFyZW50KCkuZ2V0KDApO1xyXG5cclxuXHRcdFx0c2VsZi5zZWxlY3ROb2RlKG5vZGUpO1xyXG5cdFx0XHRzZWxmLmxvYWROb2RlQ29tcG9uZW50KG5vZGUpO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNkZWxldGUtYm94XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmhpZGUoKTtcclxuXHJcblx0XHRcdG5vZGUgPSBzZWxmLnNlbGVjdGVkRWwuZ2V0KDApO1xyXG5cclxuXHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0dHlwZTogJ2NoaWxkTGlzdCcsXHJcblx0XHRcdFx0dGFyZ2V0OiBub2RlLnBhcmVudE5vZGUsXHJcblx0XHRcdFx0cmVtb3ZlZE5vZGVzOiBbbm9kZV0sXHJcblx0XHRcdFx0bmV4dFNpYmxpbmc6IG5vZGUubmV4dFNpYmxpbmdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRzZWxmLnNlbGVjdGVkRWwucmVtb3ZlKCk7XHJcblxyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHRqUXVlcnkod2luZG93LkZyYW1lV2luZG93KS5vbihcInNjcm9sbCByZXNpemVcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRpZiAoc2VsZi5zZWxlY3RlZEVsKSB7XHJcblx0XHRcdFx0b2Zmc2V0ID0gc2VsZi5zZWxlY3RlZEVsLm9mZnNldCgpO1xyXG5cclxuXHRcdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5jc3MoXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFwidG9wXCI6IG9mZnNldC50b3AgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbFRvcCgpLFxyXG5cdFx0XHRcdFx0XHRcImxlZnRcIjogb2Zmc2V0LmxlZnQgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbExlZnQoKSxcclxuXHRcdFx0XHRcdFx0XCJ3aWR0aFwiOiBzZWxmLnNlbGVjdGVkRWwub3V0ZXJXaWR0aCgpLFxyXG5cdFx0XHRcdFx0XHRcImhlaWdodFwiOiBzZWxmLnNlbGVjdGVkRWwub3V0ZXJIZWlnaHQoKSxcclxuXHRcdFx0XHRcdFx0Ly9cImRpc3BsYXlcIjogXCJibG9ja1wiXHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChzZWxmLmhpZ2hsaWdodEVsKSB7XHJcblx0XHRcdFx0b2Zmc2V0ID0gc2VsZi5oaWdobGlnaHRFbC5vZmZzZXQoKTtcclxuXHJcblx0XHRcdFx0alF1ZXJ5KFwiI2hpZ2hsaWdodC1ib3hcIikuY3NzKFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcInRvcFwiOiBvZmZzZXQudG9wIC0gc2VsZi5mcmFtZURvYy5zY3JvbGxUb3AoKSxcclxuXHRcdFx0XHRcdFx0XCJsZWZ0XCI6IG9mZnNldC5sZWZ0IC0gc2VsZi5mcmFtZURvYy5zY3JvbGxMZWZ0KCksXHJcblx0XHRcdFx0XHRcdFwid2lkdGhcIjogc2VsZi5oaWdobGlnaHRFbC5vdXRlcldpZHRoKCksXHJcblx0XHRcdFx0XHRcdFwiaGVpZ2h0XCI6IHNlbGYuaGlnaGxpZ2h0RWwub3V0ZXJIZWlnaHQoKSxcclxuXHRcdFx0XHRcdFx0Ly9cImRpc3BsYXlcIjogXCJibG9ja1wiXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdC8qIGRyYWcgYW5kIGRyb3AgKi9cclxuXHRfaW5pdERyYWdkcm9wOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0c2VsZi5pc0RyYWdnaW5nID0gZmFsc2U7XHJcblx0XHRjb21wb25lbnQgPSB7fTtcclxuXHRcdCQoJyNjb21wb25lbnRzIHVsID4gbGkgPiBvbCA+IGxpJykub24oXCJtb3VzZWRvd24gdG91Y2hzdGFydFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0JHRoaXMgPSBqUXVlcnkodGhpcyk7XHJcblxyXG5cdFx0XHQvLyAkKFwiI2NvbXBvbmVudC1jbG9uZVwiKS5yZW1vdmUoKTtcclxuXHRcdFx0Y29tcG9uZW50ID0gVnZ2ZWIuQ29tcG9uZW50cy5nZXQoJHRoaXMuZGF0YShcInR5cGVcIikpO1xyXG5cclxuXHRcdFx0aWYgKGNvbXBvbmVudC5kcmFnSHRtbCkge1xyXG5cdFx0XHRcdGh0bWwgPSBjb21wb25lbnQuZHJhZ0h0bWw7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aHRtbCA9IGNvbXBvbmVudC5odG1sO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZWxmLmRyYWdFbGVtZW50ID0gJChodG1sKTtcclxuXHJcblx0XHRcdGlmIChjb21wb25lbnQuZHJhZ1N0YXJ0KSBzZWxmLmRyYWdFbGVtZW50ID0gY29tcG9uZW50LmRyYWdTdGFydChzZWxmLmRyYWdFbGVtZW50KTtcclxuXHJcblx0XHRcdHNlbGYuaXNEcmFnZ2luZyA9IHRydWU7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0JCgnYm9keScpLm9uKCdtb3VzZXVwIHRvdWNoZW5kJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGlmIChzZWxmLmlzRHJhZ2dpbmcgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdHNlbGYuaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cdFx0XHRcdC8vICQoXCIjY29tcG9uZW50LWNsb25lXCIpLnJlbW92ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCdib2R5Jykub24oJ21vdXNlbW92ZSB0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0aWYgKHNlbGYuaXNEcmFnZ2luZyA9PSB0cnVlKSB7XHJcblx0XHRcdFx0ZWxlbWVudE1vdXNlSXNPdmVyID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYIC0gNjAsIGV2ZW50LmNsaWVudFkgLSA0MCk7XHJcblx0XHRcdFx0Ly9pZiBkcmFnIGVsZW1lbnRzIGhvdmVycyBvdmVyIGlmcmFtZSBzd2l0Y2ggdG8gaWZyYW1lIG1vdXNlb3ZlciBoYW5kbGVyXHRcclxuXHRcdFx0XHRpZiAoZWxlbWVudE1vdXNlSXNPdmVyICYmIGVsZW1lbnRNb3VzZUlzT3Zlci50YWdOYW1lID09ICdJRlJBTUUnKSB7XHJcblx0XHRcdFx0XHRzZWxmLmZyYW1lQm9keS50cmlnZ2VyKFwibW91c2Vtb3ZlXCIsIGV2ZW50KTtcclxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdFx0c2VsZi5zZWxlY3ROb2RlKGZhbHNlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJyNjb21wb25lbnRzIHVsID4gb2wgPiBsaSA+IGxpJykub24oXCJtb3VzZXVwIHRvdWNoZW5kXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRzZWxmLmlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHRcdFx0Ly8gJChcIiNjb21wb25lbnQtY2xvbmVcIikucmVtb3ZlKCk7XHJcblx0XHR9KTtcclxuXHJcblx0fSxcclxuXHJcblx0Z2V0QmVhdXRpZmllZEh0bWwoKSB7XHJcblx0XHQvKlxyXG5cdFx0LUksIC0taW5kZW50LWlubmVyLWh0bWwgICAgICAgICAgICBJbmRlbnQgPGhlYWQ+IGFuZCA8Ym9keT4gc2VjdGlvbnMuIERlZmF1bHQgaXMgZmFsc2UuXHJcblx0XHQtVSwgLS11bmZvcm1hdHRlZCAgICAgICAgICAgICAgICAgIExpc3Qgb2YgdGFncyAoZGVmYXVsdHMgdG8gaW5saW5lKSB0aGF0IHNob3VsZCBub3QgYmUgcmVmb3JtYXR0ZWRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgICB1c2UgZW1wdHkgYXJyYXkgdG8gZGVub3RlIHRoYXQgbm8gdGFncyBzaG91bGQgbm90IGJlIHJlZm9ybWF0dGVkXHJcblx0XHQgKi9cclxuXHJcblx0XHRjb25zdCB7IGRvY3R5cGUsIGh0bWwgfSA9IHRoaXMuZ2V0SHRtbCgpO1xyXG5cdFx0cmV0dXJuIGh0bWxfYmVhdXRpZnkoYCR7ZG9jdHlwZX1cclxuXHRcdFx0XHRcdFx0XHQgICR7aHRtbEdlbmVyYXRvcihodG1sLCByZW1vdmVVbnVzZWRUYWdzLCBlbXB0eUNoaWxkcmVuLCBnZW5lcmF0ZVRhYmxlU2NyaXB0KX1gLFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0cHJlc2VydmVfbmV3bGluZXM6IGZhbHNlLFxyXG5cdFx0XHRcdGluZGVudF9pbm5lcl9odG1sOiB0cnVlLFxyXG5cdFx0XHRcdHVuZm9ybWF0dGVkOiBbXVxyXG5cdFx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRnZXRIdG1sOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRkb2MgPSB3aW5kb3cuRnJhbWVEb2N1bWVudDtcclxuXHRcdGNvbnN0IGRvY3R5cGUgPSBcIjwhRE9DVFlQRSBcIlxyXG5cdFx0XHQrIGRvYy5kb2N0eXBlLm5hbWVcclxuXHRcdFx0KyAoZG9jLmRvY3R5cGUucHVibGljSWQgPyAnIFBVQkxJQyBcIicgKyBkb2MuZG9jdHlwZS5wdWJsaWNJZCArICdcIicgOiAnJylcclxuXHRcdFx0KyAoIWRvYy5kb2N0eXBlLnB1YmxpY0lkICYmIGRvYy5kb2N0eXBlLnN5c3RlbUlkID8gJyBTWVNURU0nIDogJycpXHJcblx0XHRcdCsgKGRvYy5kb2N0eXBlLnN5c3RlbUlkID8gJyBcIicgKyBkb2MuZG9jdHlwZS5zeXN0ZW1JZCArICdcIicgOiAnJylcclxuXHRcdFx0KyBcIj5cXG5cIjtcclxuXHRcdGNvbnN0IGh0bWwgPSBgJHtkb2N0eXBlfVxyXG5cdFx0XHRcdFx0ICA8aHRtbD5cclxuXHRcdFx0XHRcdFx0ICAke2RvYy5kb2N1bWVudEVsZW1lbnQuaW5uZXJIVE1MfVxyXG5cdFx0XHRcdFx0ICA8L2h0bWw+YDtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGRvY3R5cGUsXHJcblx0XHRcdGh0bWxcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0c2V0SHRtbDogZnVuY3Rpb24gKGh0bWwpIHtcclxuXHRcdC8vdXBkYXRlIG9ubHkgYm9keSB0byBhdm9pZCBicmVha2luZyBpZnJhbWUgY3NzL2pzIHJlbGF0aXZlIHBhdGhzXHJcblx0XHRzdGFydCA9IGh0bWwuaW5kZXhPZihcIjxib2R5XCIpO1xyXG5cdFx0ZW5kID0gaHRtbC5pbmRleE9mKFwiPC9ib2R5XCIpO1xyXG5cclxuXHRcdGlmIChzdGFydCA+PSAwICYmIGVuZCA+PSAwKSB7XHJcblx0XHRcdGJvZHkgPSBodG1sLnNsaWNlKGh0bWwuaW5kZXhPZihcIj5cIiwgc3RhcnQpICsgMSwgZW5kKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGJvZHkgPSBodG1sXHJcblx0XHR9XHJcblxyXG5cdFx0Ly9zZWxmLmZyYW1lQm9keS5odG1sKGJvZHkpO1xyXG5cdFx0d2luZG93LkZyYW1lRG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBib2R5O1xyXG5cclxuXHRcdC8vYmVsb3cgbWV0aG9kcyBicmFrZSBkb2N1bWVudCByZWxhdGl2ZSBjc3MgYW5kIGpzIHBhdGhzXHJcblx0XHQvL3JldHVybiBzZWxmLmlmcmFtZS5vdXRlckhUTUwgPSBodG1sO1xyXG5cdFx0Ly9yZXR1cm4gc2VsZi5kb2N1bWVudEZyYW1lLmh0bWwoaHRtbCk7XHJcblx0XHQvL3JldHVybiBzZWxmLmRvY3VtZW50RnJhbWUuYXR0cihcInNyY2RvY1wiLCBodG1sKTtcclxuXHR9XHJcbn07XHJcblxyXG5WdnZlYi5Db2RlRWRpdG9yID0ge1xyXG5cclxuXHRpc0FjdGl2ZTogZmFsc2UsXHJcblx0b2xkVmFsdWU6ICcnLFxyXG5cdGRvYzogZmFsc2UsXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkb2MpIHtcclxuXHRcdCQoXCIjdnZ2ZWItY29kZS1lZGl0b3IgdGV4dGFyZWFcIikudmFsKFZ2dmViLkJ1aWxkZXIuZ2V0QmVhdXRpZmllZEh0bWwoKSk7XHJcblxyXG5cdFx0JChcIiN2dnZlYi1jb2RlLWVkaXRvciB0ZXh0YXJlYVwiKS5rZXl1cChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGRlbGF5KFZ2dmViLkJ1aWxkZXIuc2V0SHRtbCh0aGlzLnZhbHVlKSwgMTAwMCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvL2xvYWQgY29kZSBvbiBkb2N1bWVudCBjaGFuZ2VzXHJcblx0XHRWdnZlYi5CdWlsZGVyLmZyYW1lQm9keS5vbihcInZ2dmViLnVuZG8uYWRkIHZ2dmViLnVuZG8ucmVzdG9yZVwiLCBmdW5jdGlvbiAoZSkgeyBWdnZlYi5Db2RlRWRpdG9yLnNldFZhbHVlKCk7IH0pO1xyXG5cdFx0Ly9sb2FkIGNvZGUgd2hlbiBhIG5ldyB1cmwgaXMgbG9hZGVkXHJcblx0XHRWdnZlYi5CdWlsZGVyLmRvY3VtZW50RnJhbWUub24oXCJsb2FkXCIsIGZ1bmN0aW9uIChlKSB7IFZ2dmViLkNvZGVFZGl0b3Iuc2V0VmFsdWUoKTsgfSk7XHJcblxyXG5cdFx0dGhpcy5pc0FjdGl2ZSA9IHRydWU7XHJcblx0fSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0aWYgKHRoaXMuaXNBY3RpdmUpIHtcclxuXHRcdFx0JChcIiN2dnZlYi1jb2RlLWVkaXRvciB0ZXh0YXJlYVwiKS52YWwoVnZ2ZWIuQnVpbGRlci5nZXRCZWF1dGlmaWVkSHRtbCgpKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRkZXN0cm95OiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0Ly90aGlzLmlzQWN0aXZlID0gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0dG9nZ2xlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodGhpcy5pc0FjdGl2ZSAhPSB0cnVlKSB7XHJcblx0XHRcdHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5pbml0KCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmlzQWN0aXZlID0gZmFsc2U7XHJcblx0XHR0aGlzLmRlc3Ryb3koKTtcclxuXHR9XHJcbn1cclxuXHJcbmxldCBzaG93blBhbmVsLCBoaWRkZW5QYW5lbCwgaXNQcmV2aWV3O1xyXG5cclxuVnZ2ZWIuR3VpID0ge1xyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKFwiW2RhdGEtdnZ2ZWItYWN0aW9uXVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0b24gPSBcImNsaWNrXCI7XHJcblx0XHRcdGlmICh0aGlzLmRhdGFzZXQudnZ2ZWJPbikgb24gPSB0aGlzLmRhdGFzZXQudnZ2ZWJPbjtcclxuXHJcblx0XHRcdCQodGhpcykub24ob24sIFZ2dmViLkd1aVt0aGlzLmRhdGFzZXQudnZ2ZWJBY3Rpb25dKTtcclxuXHRcdFx0aWYgKHRoaXMuZGF0YXNldC52dnZlYlNob3J0Y3V0KSB7XHJcblx0XHRcdFx0JChkb2N1bWVudCkuYmluZCgna2V5ZG93bicsIHRoaXMuZGF0YXNldC52dnZlYlNob3J0Y3V0LCBWdnZlYi5HdWlbdGhpcy5kYXRhc2V0LnZ2dmViQWN0aW9uXSk7XHJcblx0XHRcdFx0JCh3aW5kb3cuRnJhbWVEb2N1bWVudCwgd2luZG93LkZyYW1lV2luZG93KS5iaW5kKCdrZXlkb3duJywgdGhpcy5kYXRhc2V0LnZ2dmViU2hvcnRjdXQsIFZ2dmViLkd1aVt0aGlzLmRhdGFzZXQudnZ2ZWJBY3Rpb25dKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0dW5kbzogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKFZ2dmViLld5c2l3eWdFZGl0b3IuaXNBY3RpdmUpIHtcclxuXHRcdFx0VnZ2ZWIuV3lzaXd5Z0VkaXRvci51bmRvKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRWdnZlYi5VbmRvLnVuZG8oKTtcclxuXHRcdH1cclxuXHRcdFZ2dmViLkJ1aWxkZXIuc2VsZWN0Tm9kZSgpO1xyXG5cdH0sXHJcblxyXG5cdHJlZG86IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmIChWdnZlYi5XeXNpd3lnRWRpdG9yLmlzQWN0aXZlKSB7XHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IucmVkbygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0VnZ2ZWIuVW5kby5yZWRvKCk7XHJcblx0XHR9XHJcblx0XHRWdnZlYi5CdWlsZGVyLnNlbGVjdE5vZGUoKTtcclxuXHR9LFxyXG5cclxuXHRjaGVjazogZnVuY3Rpb24gKCkge1xyXG5cdFx0JCgnI3RleHRhcmVhLW1vZGFsIHRleHRhcmVhJykudmFsKFZ2dmViLkJ1aWxkZXIuZ2V0QmVhdXRpZmllZEh0bWwoKSk7XHJcblx0XHQkKCcjdGV4dGFyZWEtbW9kYWwnKS5tb2RhbCgpO1xyXG5cdH0sXHJcblxyXG5cdHZpZXdwb3J0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKFwiI2NhbnZhc1wiKS5hdHRyKFwiY2xhc3NcIiwgdGhpcy5kYXRhc2V0LnZpZXcpO1xyXG5cdH0sXHJcblxyXG5cdHRvZ2dsZUVkaXRvcjogZnVuY3Rpb24gKCkge1xyXG5cdFx0JChcIiN2dnZlYi1idWlsZGVyXCIpLnRvZ2dsZUNsYXNzKFwiYm90dG9tLXBhbmVsLWV4cGFuZFwiKTtcclxuXHRcdFZ2dmViLkNvZGVFZGl0b3IudG9nZ2xlKCk7XHJcblx0fSxcclxuXHJcblx0ZG93bmxvYWQoKSB7XHJcblx0XHRkb3dubG9hZEFzVGV4dEZpbGUoJ2luZGV4JywgVnZ2ZWIuQnVpbGRlci5nZXRCZWF1dGlmaWVkSHRtbCgpKTtcclxuXHR9LFxyXG5cclxuXHRwcmV2aWV3OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoJCgnI2xlZnQtcGFuZWwnKS5pcygnOnZpc2libGUnKSkge1xyXG5cdFx0XHRzaG93blBhbmVsID0gJ2xlZnQtcGFuZWwnO1xyXG5cdFx0XHRoaWRkZW5QYW5lbCA9ICdyaWdodC1wYW5lbCc7XHJcblx0XHRcdCQoJyNsZWZ0LXBhbmVsLCAjcmlnaHQtcGFuZWwnKS5oaWRlKCk7XHJcblx0XHRcdGlzUHJldmlldyA9IHRydWU7XHJcblx0XHR9IGVsc2UgaWYgKCQoJyNyaWdodC1wYW5lbCcpLmlzKCc6dmlzaWJsZScpKSB7XHJcblx0XHRcdHNob3duUGFuZWwgPSAncmlnaHQtcGFuZWwnO1xyXG5cdFx0XHRoaWRkZW5QYW5lbCA9ICdsZWZ0LXBhbmVsJztcclxuXHRcdFx0JCgnI2xlZnQtcGFuZWwsICNyaWdodC1wYW5lbCcpLmhpZGUoKTtcclxuXHRcdFx0aXNQcmV2aWV3ID0gdHJ1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlzUHJldmlldyA9IGZhbHNlO1xyXG5cdFx0XHQkKGAjJHtzaG93blBhbmVsfWApLnNob3coKTtcclxuXHRcdFx0JChgIyR7aGlkZGVuUGFuZWx9YCkuaGlkZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdCQoJyNtZW51LXBhbmVsJykudG9nZ2xlKCk7XHJcblx0XHQkKFwiI2lmcmFtZS1sYXllclwiKS50b2dnbGUoKTtcclxuXHRcdCQoXCIjdnZ2ZWItYnVpbGRlclwiKS50b2dnbGVDbGFzcyhcInByZXZpZXdcIik7XHJcblx0fSxcclxuXHJcblx0ZnVsbHNjcmVlbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0bGF1bmNoRnVsbFNjcmVlbihkb2N1bWVudCk7IC8vIHRoZSB3aG9sZSBwYWdlXHJcblx0fSxcclxuXHJcblx0Y29tcG9uZW50U2VhcmNoOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRzZWFyY2hUZXh0ID0gdGhpcy52YWx1ZTtcclxuXHJcblx0XHQkKFwiI2NvbXBvbmVudHMtbGlzdCBsaSBvbCBsaVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0JHRoaXMgPSAkKHRoaXMpO1xyXG5cclxuXHRcdFx0JHRoaXMuaGlkZSgpO1xyXG5cdFx0XHRpZiAoJHRoaXMuZGF0YShcInNlYXJjaFwiKS5pbmRleE9mKHNlYXJjaFRleHQpID4gLTEpICR0aGlzLnNob3coKTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdGNsZWFyQ29tcG9uZW50U2VhcmNoOiBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKFwiI2NvbXBvbmVudC1zZWFyY2hcIikudmFsKFwiXCIpLmtleXVwKCk7XHJcblx0fVxyXG59XHJcblxyXG5WdnZlYi5GaWxlTWFuYWdlciA9IHtcclxuXHR0cmVlOiBmYWxzZSxcclxuXHRwYWdlczoge30sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMudHJlZSA9ICQoXCIjZmlsZW1hbmFnZXIgLnRyZWUgPiBvbFwiKS5odG1sKFwiXCIpO1xyXG5cclxuXHRcdCQodGhpcy50cmVlKS5vbihcImNsaWNrXCIsIFwibGlbZGF0YS1wYWdlXSBzcGFuXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCMkeyQodGhpcykucGFyZW50cygnbGknKS5kYXRhKCdwYWdlJyl9YDtcclxuXHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cdFx0XHQvLyBWdnZlYi5GaWxlTWFuYWdlci5sb2FkUGFnZSgkKHRoaXMpLnBhcmVudHMoXCJsaVwiKS5kYXRhKFwicGFnZVwiKSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pXHJcblx0fSxcclxuXHJcblx0Z2V0UGFnZShuYW1lKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wYWdlc1tuYW1lXTtcclxuXHR9LFxyXG5cclxuXHRhZGRQYWdlOiBmdW5jdGlvbiAobmFtZSwgdGl0bGUsIHVybCkge1xyXG5cclxuXHRcdHRoaXMucGFnZXNbbmFtZV0gPSB7XHJcblx0XHRcdG5hbWUsXHJcblx0XHRcdHRpdGxlLFxyXG5cdFx0XHR1cmxcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy50cmVlLmFwcGVuZChcclxuXHRcdFx0dG1wbChcInZ2dmViLWZpbGVtYW5hZ2VyLXBhZ2VcIiwgeyBuYW1lLCB0aXRsZSwgdXJsIH0pKTtcclxuXHR9LFxyXG5cclxuXHRhZGRQYWdlczogZnVuY3Rpb24gKHBhZ2VzKSB7XHJcblx0XHRmb3IgKHBhZ2UgaW4gcGFnZXMpIHtcclxuXHRcdFx0dGhpcy5hZGRQYWdlKHBhZ2VzW3BhZ2VdWyduYW1lJ10sIHBhZ2VzW3BhZ2VdWyd0aXRsZSddLCBwYWdlc1twYWdlXVsndXJsJ10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGFkZENvbXBvbmVudDogZnVuY3Rpb24gKG5hbWUsIHVybCwgdGl0bGUsIHBhZ2UpIHtcclxuXHRcdCQoXCJbZGF0YS1wYWdlPSdcIiArIHBhZ2UgKyBcIiddID4gb2xcIiwgdGhpcy50cmVlKS5hcHBlbmQoXHJcblx0XHRcdHRtcGwoXCJ2dnZlYi1maWxlbWFuYWdlci1jb21wb25lbnRcIiwgeyBuYW1lLCB1cmwsIHRpdGxlIH0pKTtcclxuXHR9LFxyXG5cclxuXHRzaG93QWN0aXZlKG5hbWUpIHtcclxuXHRcdCQoXCJbZGF0YS1wYWdlXVwiLCB0aGlzLnRyZWUpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0JChcIltkYXRhLXBhZ2U9J1wiICsgbmFtZSArIFwiJ11cIiwgdGhpcy50cmVlKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHR9LFxyXG5cclxuXHRsb2FkUGFnZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuXHRcdCQoXCJbZGF0YS1wYWdlXVwiLCB0aGlzLnRyZWUpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0JChcIltkYXRhLXBhZ2U9J1wiICsgbmFtZSArIFwiJ11cIiwgdGhpcy50cmVlKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHJcblx0XHRWdnZlYi5CdWlsZGVyLmxvYWRVcmwodGhpcy5wYWdlc1tuYW1lXVsndXJsJ10pO1xyXG5cdH0sXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWdnZlYjsiLCJpbXBvcnQgdW51c2VkVGFncyBmcm9tICcuL3VudXNlZFRhZ3MnO1xyXG5pbXBvcnQgeyBlbXB0eUNoaWxkcmVuU2VsZWN0b3JzLCB0YWJsZVNlbGVjdG9yIH0gZnJvbSAnLi9lbXB0eUNoaWxkcmVuU2VsZWN0b3JzJztcclxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy90YWJsZSc7XHJcbmltcG9ydCB0YWJsZSBmcm9tICcuLi9jb21wb25lbnRzL0BvZWUvdGFibGUnO1xyXG5cclxuY29uc3QgYWx3YXlzVHJ1ZSA9ICgpID0+IHRydWU7XHJcblxyXG4vLyB0aGlzIHJlZmVycyB0byBodG1sIGVsZW1lbnRcclxuZnVuY3Rpb24gcmVtb3ZlVGFnKHsgbmFtZSwgZmlsdGVyID0gYWx3YXlzVHJ1ZSB9KSB7XHJcbiAgICBBcnJheS5mcm9tKHRoaXMuZ2V0RWxlbWVudHNCeVRhZ05hbWUobmFtZSkpXHJcbiAgICAgICAgLmZpbHRlcihmaWx0ZXIpXHJcbiAgICAgICAgLmZvckVhY2godGFnID0+IHRhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhZykpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVVbnVzZWRUYWdzKGVsKSB7XHJcbiAgICB1bnVzZWRUYWdzLmZvckVhY2gocmVtb3ZlVGFnLCBlbCk7XHJcbiAgICByZXR1cm4gZWw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVtcHR5Q2hpbGRyZW4oZWwpIHtcclxuICAgICQoZWwpLmZpbmQoZW1wdHlDaGlsZHJlblNlbGVjdG9ycy5qb2luKCcsICcpKS5lbXB0eSgpO1xyXG4gICAgcmV0dXJuIGVsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZVRhYmxlU2NyaXB0KGVsKSB7XHJcbiAgICBjb25zdCBqc1N0ciA9IEFycmF5LmZyb20oJChlbCkuZmluZCh0YWJsZVNlbGVjdG9yKSkucmVkdWNlKChwcmV2LCBlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGAke3ByZXZ9XHJcbiAgICAgICAgICAgICAgICAke3RlbXBsYXRlKCQoZWxlbWVudCksIHRhYmxlKX1gO1xyXG4gICAgfSwgJycpO1xyXG4gICAgJCgnPHNjcmlwdD48L3NjcmlwdD4nKS50ZXh0KGpzU3RyKS5hcHBlbmRUbygkKGVsKS5maW5kKCdib2R5JykpO1xyXG4gICAgcmV0dXJuIGVsO1xyXG59XHJcblxyXG5leHBvcnQgeyByZW1vdmVVbnVzZWRUYWdzLCBlbXB0eUNoaWxkcmVuLCBnZW5lcmF0ZVRhYmxlU2NyaXB0IH07IiwiY29uc3QgdW51c2VkVGFncyA9IFtcclxuXHQvLyB7XHJcblx0Ly8gXHRuYW1lOiAnc2NyaXB0J1xyXG5cdC8vIH0sXHJcblx0e1xyXG5cdFx0bmFtZTogJ2xpbmsnLFxyXG5cdFx0ZmlsdGVyOiB0YWcgPT4gdGFnLmdldEF0dHJpYnV0ZSgncmVsJykgPT0gJ3N0eWxlc2hlZXQnXHJcblx0XHRcdCYmIHRhZy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5pbmNsdWRlcygnZHJhZy1uLWRyb3AnKVxyXG5cdH0sXHJcblx0e1xyXG5cdFx0bmFtZTogJ2hyJyxcclxuXHRcdGZpbHRlcjogdGFnID0+ICQodGFnKS5oYXNDbGFzcygnaG9yaXpvbnRhbC1saW5lJylcclxuXHRcdFx0fHwgJCh0YWcpLmhhc0NsYXNzKCd2ZXJ0aWNhbC1saW5lJylcclxuXHR9XHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1bnVzZWRUYWdzOyIsImltcG9ydCB7IGRhdGFUYWJsZUlkIH0gZnJvbSAnLi4vY29tcG9uZW50cy9jb21tb24nO1xyXG5cclxuY29uc3QgdGFibGVTZWxlY3RvciA9IGBbJHtkYXRhVGFibGVJZH1dYDtcclxuY29uc3QgZW1wdHlDaGlsZHJlblNlbGVjdG9ycyA9IFt0YWJsZVNlbGVjdG9yXTtcclxuXHJcbmV4cG9ydCB7IGVtcHR5Q2hpbGRyZW5TZWxlY3RvcnMsIHRhYmxlU2VsZWN0b3IgfTsiLCJpbXBvcnQgeyBkYXRhVGFibGVJZCB9IGZyb20gXCIuLi9jb21wb25lbnRzL2NvbW1vblwiO1xyXG5cclxubGV0IGluZGV4ID0gMTtcclxuXHJcbmZ1bmN0aW9uIHRlbXBsYXRlKG5vZGUsIHRhYmxlKSB7XHJcbiAgICBjb25zdCBpZCA9IG5vZGUuYXR0cignaWQnKSB8fCAobm9kZS5hdHRyKCdpZCcsIGB0YWJsZSR7aW5kZXgrK31gKSwgbm9kZS5hdHRyKCdpZCcpKTtcclxuICAgIGNvbnN0IGtleSA9IG5vZGUuYXR0cihkYXRhVGFibGVJZCk7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgdmFyIGNvbHVtbkRlZnMke2tleX0gPSBbXHJcbiAgICAgICAgJHt0YWJsZS5nZXRUYWJsZShrZXkpLmNvbHVtbkRlZnMubWFwKGRlZiA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBge2hlYWRlck5hbWU6IFwiJHtkZWYuaGVhZGVyTmFtZX1cIiwgZmllbGQ6IFwiJHtkZWYuZmllbGR9XCJ9YDtcclxuICAgICAgICB9KS5qb2luKCcsJyl9XHJcbiAgICBdO1xyXG4gICAgdmFyIGdyaWRPcHRpb25zJHtrZXl9ID0ge1xyXG4gICAgICAgIGNvbHVtbkRlZnM6IGNvbHVtbkRlZnMke2tleX0sXHJcbiAgICAgICAgZW5hYmxlU29ydGluZzogdHJ1ZSxcclxuICAgICAgICBlbmFibGVGaWx0ZXI6IHRydWVcclxuICAgICAgfTtcclxuICAgIHZhciBlR3JpZERpdiR7a2V5fSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMke2lkfScpO1xyXG4gICAgbmV3IGFnR3JpZC5HcmlkKGVHcmlkRGl2JHtrZXl9LCBncmlkT3B0aW9ucyR7a2V5fSk7XHJcbiAgICBncmlkT3B0aW9ucyR7a2V5fS5hcGkuc2V0Um93RGF0YShbXSk7XHJcbiAgICBgO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0ZW1wbGF0ZTtcclxuXHJcbiIsImltcG9ydCB7IEJ1dHRvbklucHV0LCBUZXh0VmFsdWVJbnB1dCwgU2VsZWN0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgZGF0YUNvbXBvbmVudElkLCBkYXRhVGFibGVJZCB9IGZyb20gJy4uL2NvbW1vbic7XHJcbmltcG9ydCBWdnZlYiBmcm9tICcuLi8uLi9idWlsZGVyJztcclxuXHJcbmNvbnN0IHRhYmxlcyA9IHt9O1xyXG5sZXQgaW5kZXggPSAxO1xyXG5mdW5jdGlvbiBzZXRDb2x1bW5EZWZzQW5kUmVuZGVyKG5vZGUsIGNvbERlZnMpIHtcclxuICAgIC8vIENhbGwgdG8gc2V0IG5ldyBjb2x1bW4gZGVmaW5pdGlvbnMgaW50byB0aGUgZ3JpZC4gXHJcbiAgICAvLyBUaGUgZ3JpZCB3aWxsIHJlZHJhdyBhbGwgdGhlIGNvbHVtbiBoZWFkZXJzLCBhbmQgdGhlbiByZWRyYXcgYWxsIG9mIHRoZSByb3dzLlxyXG4gICAgdGFibGVzWyQobm9kZSkuYXR0cihkYXRhVGFibGVJZCldLmFwaS5zZXRDb2x1bW5EZWZzKGNvbERlZnMpO1xyXG4gICAgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIoXCJodG1sL3RhYmxlQG9lZVwiKTtcclxufVxyXG5cclxuY29uc3QgdGFibGUgPSB7XHJcbiAgICBub2RlczogW1widGFibGVcIl0sXHJcbiAgICBjbGFzc2VzOiBbXCJ0YWJsZVwiXSxcclxuICAgIGltYWdlOiBcImljb25zL3RhYmxlLnN2Z1wiLFxyXG4gICAgbmFtZTogXCJUYWJsZVwiLFxyXG4gICAgaHRtbDogYDxkaXYgJHtkYXRhQ29tcG9uZW50SWR9PVwiaHRtbC90YWJsZUBvZWVcIiBzdHlsZT1cIndpZHRoOiA1MDBweDsgaGVpZ2h0OiAyMDBweDtcIiBjbGFzcz1cImRyb3B6b25lIGRyYWdnYWJsZSBhZy10aGVtZS1iYWxoYW1cIj48L2Rpdj5gLFxyXG4gICAgZ2V0VGFibGUoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRhYmxlc1trZXldO1xyXG4gICAgfSxcclxuICAgIGJlZm9yZUluaXQ6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgaWYgKCEkKG5vZGUpLmF0dHIoZGF0YVRhYmxlSWQpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gaW5kZXgrKztcclxuICAgICAgICAgICAgJChub2RlKS5hdHRyKGRhdGFUYWJsZUlkLCBpZCk7XHJcbiAgICAgICAgICAgIHRhYmxlc1tpZF0gPSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5EZWZzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBoZWFkZXJOYW1lOiBcImhlYWRlclwiLCBmaWVsZDogXCJmaWxlZFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBoZWFkZXJOYW1lOiBcImhlYWRlclwiLCBmaWVsZDogXCJmaWVsZFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBoZWFkZXJOYW1lOiBcImhlYWRlclwiLCBmaWVsZDogXCJmaWVsZFwiIH1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBlbmFibGVTb3J0aW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlRmlsdGVyOiB0cnVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG5ldyAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lmcmFtZUlkJykuY29udGVudFdpbmRvdy5hZ0dyaWQpLkdyaWQobm9kZSwgdGFibGVzW2lkXSk7XHJcbiAgICAgICAgICAgIHRhYmxlc1tpZF0uYXBpLnNldFJvd0RhdGEoW10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaSA9IDA7XHJcbiAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IHRhYmxlc1skKG5vZGUpLmF0dHIoZGF0YVRhYmxlSWQpXS5jb2x1bW5EZWZzLnJlZHVjZSgocHJldiwgY3VyKSA9PiB7XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgcHJldi5wdXNoKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiSGVhZGVyIFwiICsgaSxcclxuICAgICAgICAgICAgICAgIGtleTogXCJvcHRpb25cIiArIGksXHJcbiAgICAgICAgICAgICAgICAvL2luZGV4OiBpIC0gMSxcclxuICAgICAgICAgICAgICAgIG9wdGlvbk5vZGU6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBpbnB1dHR5cGU6IFRleHRWYWx1ZUlucHV0LFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAndGFibGVoZWFkZXJAb2VlJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJOYW1lOiBjdXIuaGVhZGVyTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogY3VyLmZpZWxkXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXlJbmRleCA9IHBhcnNlSW50KHRoaXMua2V5LnN1YnN0cignb3B0aW9uJy5sZW5ndGgpKSAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbERlZnMgPSB0YWJsZXNbJChub2RlKS5hdHRyKGRhdGFUYWJsZUlkKV0uY29sdW1uRGVmcztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQubm9kZU5hbWUgPT0gJ0JVVFRPTicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sRGVmcyA9IGNvbERlZnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKHZhbHVlLCBpbmRleCkgPT4gaW5kZXggIT0ga2V5SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZXNbJChub2RlKS5hdHRyKGRhdGFUYWJsZUlkKV0uY29sdW1uRGVmcyA9IGNvbERlZnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbHVtbkRlZnNBbmRSZW5kZXIobm9kZSwgY29sRGVmcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sRGVmc1trZXlJbmRleF1baW5wdXQubmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6YeN5paw5riy5p+T5Lya5aSx5Y676L6T5YWl5qGG54Sm54K577yM5Y+q6ZyA6KaB55So5paw55qEY29sRGVmc+abtOaWsOihqOagvOWNs+WPr++8jOWPs+S+p+eahOmDqOWIhuS4jemcgOimgemHjeaWsOa4suafk+OAglxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZXNbJChub2RlKS5hdHRyKGRhdGFUYWJsZUlkKV0uYXBpLnNldENvbHVtbkRlZnMoY29sRGVmcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcmV2O1xyXG4gICAgICAgIH0sIFtdKTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gdGhpcy5wcm9wZXJ0aWVzLmZpbHRlcihwcm9wZXJ0eSA9PiBwcm9wZXJ0eS5rZXkuaW5kZXhPZihcIm9wdGlvblwiKSA9PT0gLTEpO1xyXG4gICAgICAgIHRoaXMucHJvcGVydGllcy51bnNoaWZ0KC4uLnByb3BlcnRpZXMpO1xyXG5cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH0sXHJcbiAgICBwcm9wZXJ0aWVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlRoZW1lXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJ0aGVtZVwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogWydhZy10aGVtZS1iYWxoYW0tZGFyaycsICdhZy10aGVtZS1iYWxoYW0nLCAnYWctdGhlbWUtYmx1ZScsICdhZy10aGVtZS1ib290c3RyYXAnLFxyXG4gICAgICAgICAgICAgICAgJ2FnLXRoZW1lLWRhcmsnLCAnYWctdGhlbWUtZnJlc2gnLCAnYWctdGhlbWUtbWF0ZXJpYWwnXSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVDbGFzcyh0aGlzLnZhbGlkVmFsdWVzLmpvaW4oXCIgXCIpKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuYWRkQ2xhc3ModmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENvZGUgY29waWVkIGZvcm0gb2ZmaWNpYWwgc2l0ZSBleGFtcGxlIGh0dHBzOi8vd3d3LmFnLWdyaWQuY29tL2V4YW1wbGUucGhwIy9cclxuICAgICAgICAgICAgICAgIGNvbnN0IGdyaWRPcHRpb25zID0gdGFibGVzW25vZGUuYXR0cihkYXRhVGFibGVJZCldO1xyXG4gICAgICAgICAgICAgICAgZ3JpZE9wdGlvbnMuYXBpLnJlc2V0Um93SGVpZ2h0cygpO1xyXG4gICAgICAgICAgICAgICAgZ3JpZE9wdGlvbnMuYXBpLnJlZHJhd1Jvd3MoKTtcclxuICAgICAgICAgICAgICAgIGdyaWRPcHRpb25zLmFwaS5yZWZyZXNoSGVhZGVyKCk7XHJcbiAgICAgICAgICAgICAgICBncmlkT3B0aW9ucy5hcGkucmVmcmVzaFRvb2xQYW5lbCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkRlZmF1bHRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiYWctdGhlbWUtYmFsaGFtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJCYWxoYW1cIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImFnLXRoZW1lLWJhbGhhbS1kYXJrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJCYWxoYW0gKGRhcmspXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJhZy10aGVtZS1ibHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJCbHVlXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJhZy10aGVtZS1ib290c3RyYXBcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkJvb3RzdHJhcFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiYWctdGhlbWUtZGFya1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGFya1wiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiYWctdGhlbWUtZnJlc2hcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkZyZXNoXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJhZy10aGVtZS1tYXRlcmlhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiTWF0ZXJpYWxcIlxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiYWRkQ2hpbGRcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBCdXR0b25JbnB1dCxcclxuICAgICAgICAgICAgZGF0YTogeyB0ZXh0OiBcIkFkZCBoZWFkZXJcIiB9LFxyXG4gICAgICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbERlZnMgPSB0YWJsZXNbJChub2RlKS5hdHRyKGRhdGFUYWJsZUlkKV0uY29sdW1uRGVmcztcclxuICAgICAgICAgICAgICAgIGNvbERlZnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyTmFtZTogJ2hlYWRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6ICdmaWVsZCdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldENvbHVtbkRlZnNBbmRSZW5kZXIobm9kZSwgY29sRGVmcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFibGU7IiwiZnVuY3Rpb24gaHRtbEdlbmVyYXRvcihodG1sLCAuLi5mbnMpIHtcclxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHRtbCcpO1xyXG4gICAgZWwuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIGZucy5yZWR1Y2UoKGVsLCBmbikgPT4gZm4oZWwpLCBlbCk7XHJcbiAgICByZXR1cm4gJChlbCkucHJvcCgnb3V0ZXJIVE1MJyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGh0bWxHZW5lcmF0b3I7IiwiLy8gVG9nZ2xlIGZ1bGxzY3JlZW5cclxuZnVuY3Rpb24gbGF1bmNoRnVsbFNjcmVlbihkb2N1bWVudCkge1xyXG4gICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbFNjcmVlbikge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQuRnVsbFNjcmVlbkVsZW1lbnQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmV4aXRGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICAvL21vemlsbGFcdFx0XHJcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQubW96RnVsbFNjcmVlbkVsZW1lbnQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgIC8vd2Via2l0XHQgIFxyXG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50KVxyXG4gICAgICAgICAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgLy9pZVx0ICBcclxuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50Lm1zRnVsbFNjcmVlbkVsZW1lbnQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IGxhdW5jaEZ1bGxTY3JlZW4gfTsiLCJmdW5jdGlvbiBkb3dubG9hZEFzVGV4dEZpbGUoZmlsZW5hbWUsIHRleHQpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaHJlZicsIGBkYXRhOnRleHQvaHRtbDtjaGFyc2V0PXV0Zi04LCR7ZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpfWApO1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgZmlsZW5hbWUpO1xyXG5cclxuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcblxyXG4gICAgZWxlbWVudC5jbGljaygpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGRvd25sb2FkQXNUZXh0RmlsZSB9OyIsIi8qXHJcbkNvcHlyaWdodCAyMDE3IFppYWRpbiBHaXZhblxyXG5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHJcbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG5cclxuaHR0cHM6Ly9naXRodWIuY29tL2dpdmFuei9WdnZlYkpzXHJcbiovXHJcbmltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcbmltcG9ydCBDaGVja2JveElucHV0IGZyb20gJy4vQ2hlY2tib3hJbnB1dCc7XHJcbmltcG9ydCBTZWxlY3RJbnB1dCBmcm9tICcuL1NlbGVjdElucHV0JztcclxuaW1wb3J0IExpbmtJbnB1dCBmcm9tICcuL0xpbmtJbnB1dCc7XHJcbmltcG9ydCBSYW5nZUlucHV0IGZyb20gJy4vUmFuZ2VJbnB1dCc7XHJcbmltcG9ydCBOdW1iZXJJbnB1dCBmcm9tICcuL051bWJlcklucHV0JztcclxuaW1wb3J0IENzc1VuaXRJbnB1dCBmcm9tICcuL0Nzc1VuaXRJbnB1dCc7XHJcbmltcG9ydCBDb2xvcklucHV0IGZyb20gJy4vQ29sb3JJbnB1dCc7XHJcbmltcG9ydCBGaWxlVXBsb2FkSW5wdXQgZnJvbSAnLi9GaWxlVXBsb2FkSW5wdXQnO1xyXG5pbXBvcnQgUmFkaW9JbnB1dCBmcm9tICcuL1JhZGlvSW5wdXQnO1xyXG5pbXBvcnQgUmFkaW9CdXR0b25JbnB1dCBmcm9tICcuL1JhZGlvQnV0dG9uSW5wdXQnO1xyXG5pbXBvcnQgVG9nZ2xlSW5wdXQgZnJvbSAnLi9Ub2dnbGVJbnB1dCc7XHJcbmltcG9ydCBWYWx1ZVRleHRJbnB1dCBmcm9tICcuL1ZhbHVlVGV4dElucHV0JztcclxuaW1wb3J0IEdyaWRMYXlvdXRJbnB1dCBmcm9tICcuL0dyaWRMYXlvdXRJbnB1dCc7XHJcbmltcG9ydCBQcm9kdWN0c0lucHV0IGZyb20gJy4vUHJvZHVjdHNJbnB1dCc7XHJcbmltcG9ydCBHcmlkSW5wdXQgZnJvbSAnLi9HcmlkSW5wdXQnO1xyXG5pbXBvcnQgVGV4dFZhbHVlSW5wdXQgZnJvbSAnLi9UZXh0VmFsdWVJbnB1dCc7XHJcbmltcG9ydCBCdXR0b25JbnB1dCBmcm9tICcuL0J1dHRvbklucHV0JztcclxuaW1wb3J0IFNlY3Rpb25JbnB1dCBmcm9tICcuL1NlY3Rpb25JbnB1dCc7XHJcbmltcG9ydCBMaXN0SW5wdXQgZnJvbSAnLi9MaXN0SW5wdXQnO1xyXG5cclxuZXhwb3J0IHtcclxuXHRJbnB1dCwgVGV4dElucHV0LCBDaGVja2JveElucHV0LCBTZWxlY3RJbnB1dCwgTGlua0lucHV0LCBSYW5nZUlucHV0LCBOdW1iZXJJbnB1dCwgQ3NzVW5pdElucHV0LFxyXG5cdFJhZGlvSW5wdXQsIFJhZGlvQnV0dG9uSW5wdXQsIFRvZ2dsZUlucHV0LCBWYWx1ZVRleHRJbnB1dCwgR3JpZExheW91dElucHV0LCBQcm9kdWN0c0lucHV0LCBHcmlkSW5wdXQsXHJcblx0VGV4dFZhbHVlSW5wdXQsIEJ1dHRvbklucHV0LCBTZWN0aW9uSW5wdXQsIExpc3RJbnB1dCwgQ29sb3JJbnB1dCwgRmlsZVVwbG9hZElucHV0XHJcbn07IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBWYWx1ZVRleHRJbnB1dCA9ICQuZXh0ZW5kKHt9LCBUZXh0SW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWYWx1ZVRleHRJbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuXHJcbmNvbnN0IFRvZ2dsZUlucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRvbkNoYW5nZTogZnVuY3Rpb24gKGV2ZW50LCBub2RlKSB7XHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpIHtcclxuXHRcdFx0ZXZlbnQuZGF0YS5lbGVtZW50LnRyaWdnZXIoJ3Byb3BlcnR5Q2hhbmdlJywgW3RoaXMuY2hlY2tlZCA/IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZS1vblwiKSA6IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZS1vZmZcIiksIHRoaXNdKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRvZ2dsZVwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb2dnbGVJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBUZXh0VmFsdWVJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdFx0W1wiY2xpY2tcIiwgXCJvbkNoYW5nZVwiLCBcImJ1dHRvblwiIC8qJ3NlbGVjdCcqL10sXHJcblx0XSxcclxuXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0dmFsdWVcIiwgZGF0YSk7XHJcblx0fSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRleHRWYWx1ZUlucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFNlbGVjdElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG4gICAgZXZlbnRzOiBbXHJcbiAgICAgICAgW1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJzZWxlY3RcIl0sXHJcbiAgICBdLFxyXG5cclxuXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgJCgnc2VsZWN0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcihcInNlbGVjdFwiLCBkYXRhKTtcclxuICAgIH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBTZWN0aW9uSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjbGlja1wiLCBcIm9uQ2hhbmdlXCIsIFwiYnV0dG9uXCIgLyonc2VsZWN0JyovXSxcclxuXHRdLFxyXG5cclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJzZWN0aW9uaW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlY3Rpb25JbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBSYW5nZUlucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwicmFuZ2VpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYW5nZUlucHV0OyIsImltcG9ydCBSYWRpb0lucHV0IGZyb20gJy4vUmFkaW9JbnB1dCc7XHJcblxyXG5jb25zdCBSYWRpb0J1dHRvbklucHV0ID0gJC5leHRlbmQoe30sIFJhZGlvSW5wdXQsIHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcihcInJhZGlvYnV0dG9uaW5wdXRcIiwgZGF0YSk7XHJcbiAgICB9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYWRpb0J1dHRvbklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFJhZGlvSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0b25DaGFuZ2U6IGZ1bmN0aW9uIChldmVudCwgbm9kZSkge1xyXG5cclxuXHRcdGlmIChldmVudC5kYXRhICYmIGV2ZW50LmRhdGEuZWxlbWVudCkge1xyXG5cdFx0XHRldmVudC5kYXRhLmVsZW1lbnQudHJpZ2dlcigncHJvcGVydHlDaGFuZ2UnLCBbdGhpcy52YWx1ZSwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkucmVtb3ZlQXR0cignY2hlY2tlZCcpO1xyXG5cdFx0aWYgKHZhbHVlKVxyXG5cdFx0XHQkKFwiaW5wdXRbdmFsdWU9XCIgKyB2YWx1ZSArIFwiXVwiLCB0aGlzLmVsZW1lbnQpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwicmFkaW9pbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYWRpb0lucHV0OyIsImltcG9ydCBUZXh0SW5wdXQgZnJvbSAnLi9UZXh0SW5wdXQnO1xyXG5cclxuY29uc3QgUHJvZHVjdHNJbnB1dCA9ICQuZXh0ZW5kKHt9LCBUZXh0SW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm9kdWN0c0lucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbnZhciBOdW1iZXJJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcIm51bWJlcmlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE51bWJlcklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IExpc3RJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwic2VsZWN0XCJdLFxyXG5cdF0sXHJcblxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdzZWxlY3QnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImxpc3RpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdElucHV0OyIsImltcG9ydCBUZXh0SW5wdXQgZnJvbSAnLi9UZXh0SW5wdXQnO1xyXG5cclxuY29uc3QgTGlua0lucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaW5rSW5wdXQ7IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBHcmlkTGF5b3V0SW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR3JpZExheW91dElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IEdyaWRJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJzZWxlY3RcIiAvKidzZWxlY3QnKi9dLFxyXG5cdFx0W1wiY2xpY2tcIiwgXCJvbkNoYW5nZVwiLCBcImJ1dHRvblwiIC8qJ3NlbGVjdCcqL10sXHJcblx0XSxcclxuXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ3NlbGVjdCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwiZ3JpZFwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR3JpZElucHV0OyIsImltcG9ydCBUZXh0SW5wdXQgZnJvbSAnLi9UZXh0SW5wdXQnO1xyXG5cclxuY29uc3QgRmlsZVVwbG9hZElucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImtleXVwXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpbGVVcGxvYWRJbnB1dDtcclxuIiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgVGV4dElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG4gICAgZXZlbnRzOiBbXHJcbiAgICAgICAgW1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdCBdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblx0XHJcblx0aW5pdDogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbiAgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGV4dElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IENzc1VuaXRJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRudW1iZXI6IDAsXHJcblx0dW5pdDogXCJweFwiLFxyXG5cclxuXHRvbkNoYW5nZTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0aWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS5lbGVtZW50KSB7XHJcblx0XHRcdGlucHV0ID0gZXZlbnQuZGF0YS5pbnB1dDtcclxuXHRcdFx0aW5wdXRbdGhpcy5uYW1lXSA9IHRoaXMudmFsdWU7Ly8gdGhpcy5uYW1lID0gdW5pdCBvciBudW1iZXJcdFxyXG5cclxuXHRcdFx0dmFsdWUgPSBcIlwiO1xyXG5cdFx0XHRpZiAoaW5wdXQudW5pdCA9PSBcImF1dG9cIikge1xyXG5cdFx0XHRcdCQoZXZlbnQuZGF0YS5lbGVtZW50KS5hZGRDbGFzcyhcImF1dG9cIik7XHJcblx0XHRcdFx0dmFsdWUgPSBpbnB1dC51bml0O1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdCQoZXZlbnQuZGF0YS5lbGVtZW50KS5yZW1vdmVDbGFzcyhcImF1dG9cIik7XHJcblx0XHRcdFx0dmFsdWUgPSBpbnB1dC5udW1iZXIgKyBpbnB1dC51bml0O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRldmVudC5kYXRhLmVsZW1lbnQudHJpZ2dlcigncHJvcGVydHlDaGFuZ2UnLCBbdmFsdWUsIHRoaXNdKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwic2VsZWN0XCJdLFxyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHR0aGlzLm51bWJlciA9IHBhcnNlSW50KHZhbHVlKTtcclxuXHRcdHRoaXMudW5pdCA9IHZhbHVlLnJlcGxhY2UodGhpcy5udW1iZXIsICcnKTtcclxuXHJcblx0XHRpZiAodGhpcy51bml0ID09IFwiYXV0b1wiKSAkKHRoaXMuZWxlbWVudCkuYWRkQ2xhc3MoXCJhdXRvXCIpO1xyXG5cclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodGhpcy5udW1iZXIpO1xyXG5cdFx0JCgnc2VsZWN0JywgdGhpcy5lbGVtZW50KS52YWwodGhpcy51bml0KTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwiY3NzdW5pdGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENzc1VuaXRJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBDb2xvcklucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdC8vaHRtbDUgY29sb3IgaW5wdXQgb25seSBzdXBwb3J0cyBzZXR0aW5nIHZhbHVlcyBhcyBoZXggY29sb3JzIGV2ZW4gaWYgdGhlIHBpY2tlciByZXR1cm5zIG9ubHkgcmdiXHJcblx0cmdiMmhleDogZnVuY3Rpb24gKHJnYikge1xyXG5cclxuXHRcdHJnYiA9IHJnYi5tYXRjaCgvXnJnYmE/W1xccytdP1xcKFtcXHMrXT8oXFxkKylbXFxzK10/LFtcXHMrXT8oXFxkKylbXFxzK10/LFtcXHMrXT8oXFxkKylbXFxzK10/L2kpO1xyXG5cclxuXHRcdHJldHVybiAocmdiICYmIHJnYi5sZW5ndGggPT09IDQpID8gXCIjXCIgK1xyXG5cdFx0XHQoXCIwXCIgKyBwYXJzZUludChyZ2JbMV0sIDEwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKSArXHJcblx0XHRcdChcIjBcIiArIHBhcnNlSW50KHJnYlsyXSwgMTApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpICtcclxuXHRcdFx0KFwiMFwiICsgcGFyc2VJbnQocmdiWzNdLCAxMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMikgOiByZ2I7XHJcblx0fSxcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodGhpcy5yZ2IyaGV4KHZhbHVlKSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImNvbG9yaW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29sb3JJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBDaGVja2JveElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbihldmVudCwgbm9kZSkge1xyXG5cdFx0XHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpXHJcblx0XHR7XHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt0aGlzLmNoZWNrZWQsIHRoaXNdKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuICAgIGV2ZW50czogW1xyXG4gICAgICAgIFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0IF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHRcclxuXHRpbml0OiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJjaGVja2JveGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbiAgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tib3hJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBCdXR0b25JbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNsaWNrXCIsIFwib25DaGFuZ2VcIiwgXCJidXR0b25cIiAvKidzZWxlY3QnKi9dLFxyXG5cdF0sXHJcblxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdidXR0b24nLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImJ1dHRvblwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uSW5wdXQ7IiwiY29uc3QgSW5wdXQgPSB7XHJcblx0XHJcblx0aW5pdDogZnVuY3Rpb24obmFtZSkge1xyXG5cdH0sXHJcblxyXG5cclxuXHRvbkNoYW5nZTogZnVuY3Rpb24oZXZlbnQsIG5vZGUpIHtcclxuXHRcdFxyXG5cdFx0aWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS5lbGVtZW50KVxyXG5cdFx0e1xyXG5cdFx0XHRldmVudC5kYXRhLmVsZW1lbnQudHJpZ2dlcigncHJvcGVydHlDaGFuZ2UnLCBbdGhpcy52YWx1ZSwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHJlbmRlclRlbXBsYXRlOiBmdW5jdGlvbihuYW1lLCBkYXRhKSB7XHJcblx0XHRyZXR1cm4gdG1wbChcInZ2dmViLWlucHV0LVwiICsgbmFtZSwgZGF0YSk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbihuYW1lLCBkYXRhKSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKHRoaXMucmVuZGVyVGVtcGxhdGUobmFtZSwgZGF0YSkpO1xyXG5cdFx0XHJcblx0XHQvL2JpbmQgZXZlbnRzXHJcblx0XHRpZiAodGhpcy5ldmVudHMpXHJcblx0XHRmb3IgKHZhciBpIGluIHRoaXMuZXZlbnRzKVxyXG5cdFx0e1xyXG5cdFx0XHRldmVudCA9IHRoaXMuZXZlbnRzW2ldWzBdO1xyXG5cdFx0XHRmdW4gPSB0aGlzWyB0aGlzLmV2ZW50c1tpXVsxXSBdO1xyXG5cdFx0XHRlbCA9IHRoaXMuZXZlbnRzW2ldWzJdO1xyXG5cdFx0XHJcblx0XHRcdHRoaXMuZWxlbWVudC5vbihldmVudCwgZWwsIHtlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGlucHV0OnRoaXN9LCBmdW4pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLmVsZW1lbnQ7XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5wdXQ7IiwiY29uc3QgYmdjb2xvckNsYXNzZXMgPSBbXCJiZy1wcmltYXJ5XCIsIFwiYmctc2Vjb25kYXJ5XCIsIFwiYmctc3VjY2Vzc1wiLCBcImJnLWRhbmdlclwiLCBcImJnLXdhcm5pbmdcIiwgXCJiZy1pbmZvXCIsIFwiYmctbGlnaHRcIiwgXCJiZy1kYXJrXCIsIFwiYmctd2hpdGVcIl07XHJcblxyXG5jb25zdCBiZ2NvbG9yU2VsZWN0T3B0aW9ucyA9XHJcbiAgICBbe1xyXG4gICAgICAgIHZhbHVlOiBcIkRlZmF1bHRcIixcclxuICAgICAgICB0ZXh0OiBcIlwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLXByaW1hcnlcIixcclxuICAgICAgICB0ZXh0OiBcIlByaW1hcnlcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLXNlY29uZGFyeVwiLFxyXG4gICAgICAgIHRleHQ6IFwiU2Vjb25kYXJ5XCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1zdWNjZXNzXCIsXHJcbiAgICAgICAgdGV4dDogXCJTdWNjZXNzXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1kYW5nZXJcIixcclxuICAgICAgICB0ZXh0OiBcIkRhbmdlclwiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctd2FybmluZ1wiLFxyXG4gICAgICAgIHRleHQ6IFwiV2FybmluZ1wiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctaW5mb1wiLFxyXG4gICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctbGlnaHRcIixcclxuICAgICAgICB0ZXh0OiBcIkxpZ2h0XCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1kYXJrXCIsXHJcbiAgICAgICAgdGV4dDogXCJEYXJrXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy13aGl0ZVwiLFxyXG4gICAgICAgIHRleHQ6IFwiV2hpdGVcIlxyXG4gICAgfV07XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VOb2RlTmFtZShub2RlLCBuZXdOb2RlTmFtZSkge1xyXG4gICAgdmFyIG5ld05vZGU7XHJcbiAgICBuZXdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuZXdOb2RlTmFtZSk7XHJcbiAgICBhdHRyaWJ1dGVzID0gbm9kZS5nZXQoMCkuYXR0cmlidXRlcztcclxuXHJcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBhdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgbmV3Tm9kZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlc1tpXS5ub2RlTmFtZSwgYXR0cmlidXRlc1tpXS5ub2RlVmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgICQobmV3Tm9kZSkuYXBwZW5kKCQobm9kZSkuY29udGVudHMoKSk7XHJcbiAgICAkKG5vZGUpLnJlcGxhY2VXaXRoKG5ld05vZGUpO1xyXG5cclxuICAgIHJldHVybiBuZXdOb2RlO1xyXG59XHJcblxyXG5sZXQgYmFzZV9zb3J0ID0gMTAwOy8vc3RhcnQgc29ydGluZyBmb3IgYmFzZSBjb21wb25lbnQgZnJvbSAxMDAgdG8gYWxsb3cgZXh0ZW5kZWQgcHJvcGVydGllcyB0byBiZSBmaXJzdFxyXG5mdW5jdGlvbiBpbmNfYmFzZV9zb3J0KCkge1xyXG4gICAgcmV0dXJuIGJhc2Vfc29ydCsrO1xyXG59XHJcblxyXG5jb25zdCBkYXRhQ29tcG9uZW50SWQgPSAnZGF0YS1jb21wb25lbnQtaWQnO1xyXG5jb25zdCBkYXRhVGFibGVJZCA9ICdkYXRhLXRhYmxlLWlkJztcclxuXHJcbmV4cG9ydCB7IGJnY29sb3JDbGFzc2VzLCBiZ2NvbG9yU2VsZWN0T3B0aW9ucywgY2hhbmdlTm9kZU5hbWUsIGluY19iYXNlX3NvcnQsIGRhdGFDb21wb25lbnRJZCwgZGF0YVRhYmxlSWQgfTtcclxuIl19
