require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({52:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _inputs = require('./inputs/inputs');

var _jsoup = require('./util/jsoup');

var _download = require('./util/download');

var _fullScreen = require('./util/fullScreen');

var _common = require('./components/common');

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

		return html_beautify(doctype + '\n\t\t\t\t\t\t\t  ' + (0, _jsoup.removeUnusedTags)(html, unusedTags), {
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

},{"./components/common":133,"./inputs/inputs":165,"./util/download":169,"./util/fullScreen":171,"./util/jsoup":172}],172:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
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

function removeUnusedTags(html, tags) {
    var el = document.createElement('html');
    el.innerHTML = html;
    tags.forEach(removeTag, el);

    return $(el).prop('outerHTML');
}

exports.removeUnusedTags = removeUnusedTags;

},{}],171:[function(require,module,exports){
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

},{}],169:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGRlci5qcyIsInNyYy91dGlsL2pzb3VwLmpzIiwic3JjL3V0aWwvZnVsbFNjcmVlbi5qcyIsInNyYy91dGlsL2Rvd25sb2FkLmpzIiwic3JjL2lucHV0cy9pbnB1dHMuanMiLCJzcmMvaW5wdXRzL1ZhbHVlVGV4dElucHV0LmpzIiwic3JjL2lucHV0cy9Ub2dnbGVJbnB1dC5qcyIsInNyYy9pbnB1dHMvVGV4dFZhbHVlSW5wdXQuanMiLCJzcmMvaW5wdXRzL1NlbGVjdElucHV0LmpzIiwic3JjL2lucHV0cy9TZWN0aW9uSW5wdXQuanMiLCJzcmMvaW5wdXRzL1JhbmdlSW5wdXQuanMiLCJzcmMvaW5wdXRzL1JhZGlvQnV0dG9uSW5wdXQuanMiLCJzcmMvaW5wdXRzL1JhZGlvSW5wdXQuanMiLCJzcmMvaW5wdXRzL1Byb2R1Y3RzSW5wdXQuanMiLCJzcmMvaW5wdXRzL051bWJlcklucHV0LmpzIiwic3JjL2lucHV0cy9MaXN0SW5wdXQuanMiLCJzcmMvaW5wdXRzL0xpbmtJbnB1dC5qcyIsInNyYy9pbnB1dHMvR3JpZExheW91dElucHV0LmpzIiwic3JjL2lucHV0cy9HcmlkSW5wdXQuanMiLCJzcmMvaW5wdXRzL0ZpbGVVcGxvYWRJbnB1dC5qcyIsInNyYy9pbnB1dHMvVGV4dElucHV0LmpzIiwic3JjL2lucHV0cy9Dc3NVbml0SW5wdXQuanMiLCJzcmMvaW5wdXRzL0NvbG9ySW5wdXQuanMiLCJzcmMvaW5wdXRzL0NoZWNrYm94SW5wdXQuanMiLCJzcmMvaW5wdXRzL0J1dHRvbklucHV0LmpzIiwic3JjL2lucHV0cy9JbnB1dC5qcyIsInNyYy9jb21wb25lbnRzL2NvbW1vbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSxDQUFDLFlBQVk7QUFDWixLQUFJLFFBQVEsRUFBWjs7QUFFQSxN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RUFBUSxXQUFSLENBQW9CLE9BQXBCOztBQUVBLFdBQU8sT0FBUDtBQUNIOztBQUVELElBQUksWUFBWSxHQUFoQixDLENBQW9CO0FBQ3BCLFNBQVMsYUFBVCxHQUF5QjtBQUNyQixXQUFPLFdBQVA7QUFDSDs7QUFFRCxJQUFNLGtCQUFrQixtQkFBeEI7QUFDQSxJQUFNLGNBQWMsZUFBcEI7O1FBRVMsYyxHQUFBLGM7UUFBZ0Isb0IsR0FBQSxvQjtRQUFzQixjLEdBQUEsYztRQUFnQixhLEdBQUEsYTtRQUFlLGUsR0FBQSxlO1FBQWlCLFcsR0FBQSxXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgU2VjdGlvbklucHV0IH0gZnJvbSAnLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgcmVtb3ZlVW51c2VkVGFncyB9IGZyb20gJy4vdXRpbC9qc291cCc7XHJcbmltcG9ydCB7IGRvd25sb2FkQXNUZXh0RmlsZSB9IGZyb20gJy4vdXRpbC9kb3dubG9hZCc7XHJcbmltcG9ydCB7IGxhdW5jaEZ1bGxTY3JlZW4gfSBmcm9tICcuL3V0aWwvZnVsbFNjcmVlbic7XHJcbmltcG9ydCB7IGRhdGFDb21wb25lbnRJZCB9IGZyb20gJy4vY29tcG9uZW50cy9jb21tb24nXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG5cdHZhciBjYWNoZSA9IHt9O1xyXG5cclxuXHR0aGlzLnRtcGwgPSBmdW5jdGlvbiB0bXBsKHN0ciwgZGF0YSkge1xyXG5cdFx0Ly8gRmlndXJlIG91dCBpZiB3ZSdyZSBnZXR0aW5nIGEgdGVtcGxhdGUsIG9yIGlmIHdlIG5lZWQgdG9cclxuXHRcdC8vIGxvYWQgdGhlIHRlbXBsYXRlIC0gYW5kIGJlIHN1cmUgdG8gY2FjaGUgdGhlIHJlc3VsdC5cclxuXHRcdHZhciBmbiA9IC9eWy1hLXpBLVowLTldKyQvLnRlc3Qoc3RyKSA/XHJcblx0XHRcdGNhY2hlW3N0cl0gPSBjYWNoZVtzdHJdIHx8XHJcblx0XHRcdHRtcGwoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3RyKS5pbm5lckhUTUwpIDpcclxuXHJcblx0XHRcdC8vIEdlbmVyYXRlIGEgcmV1c2FibGUgZnVuY3Rpb24gdGhhdCB3aWxsIHNlcnZlIGFzIGEgdGVtcGxhdGVcclxuXHRcdFx0Ly8gZ2VuZXJhdG9yIChhbmQgd2hpY2ggd2lsbCBiZSBjYWNoZWQpLlxyXG5cdFx0XHRuZXcgRnVuY3Rpb24oXCJvYmpcIixcclxuXHRcdFx0XHRcInZhciBwPVtdLHByaW50PWZ1bmN0aW9uKCl7cC5wdXNoLmFwcGx5KHAsYXJndW1lbnRzKTt9O1wiICtcclxuXHJcblx0XHRcdFx0Ly8gSW50cm9kdWNlIHRoZSBkYXRhIGFzIGxvY2FsIHZhcmlhYmxlcyB1c2luZyB3aXRoKCl7fVxyXG5cdFx0XHRcdFwid2l0aChvYmope3AucHVzaCgnXCIgK1xyXG5cclxuXHRcdFx0XHQvLyBDb252ZXJ0IHRoZSB0ZW1wbGF0ZSBpbnRvIHB1cmUgSmF2YVNjcmlwdFxyXG5cdFx0XHRcdHN0clxyXG5cdFx0XHRcdFx0LnJlcGxhY2UoL1tcXHJcXHRcXG5dL2csIFwiIFwiKVxyXG5cdFx0XHRcdFx0LnNwbGl0KFwieyVcIikuam9pbihcIlxcdFwiKVxyXG5cdFx0XHRcdFx0LnJlcGxhY2UoLygoXnwlfSlbXlxcdF0qKScvZywgXCIkMVxcclwiKVxyXG5cdFx0XHRcdFx0LnJlcGxhY2UoL1xcdD0oLio/KSV9L2csIFwiJywkMSwnXCIpXHJcblx0XHRcdFx0XHQuc3BsaXQoXCJcXHRcIikuam9pbihcIicpO1wiKVxyXG5cdFx0XHRcdFx0LnNwbGl0KFwiJX1cIikuam9pbihcInAucHVzaCgnXCIpXHJcblx0XHRcdFx0XHQuc3BsaXQoXCJcXHJcIikuam9pbihcIlxcXFwnXCIpXHJcblx0XHRcdFx0KyBcIicpO31yZXR1cm4gcC5qb2luKCcnKTtcIik7XHJcblx0XHQvLyBQcm92aWRlIHNvbWUgYmFzaWMgY3VycnlpbmcgdG8gdGhlIHVzZXJcclxuXHRcdHJldHVybiBkYXRhID8gZm4oZGF0YSkgOiBmbjtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxudmFyIGRlbGF5ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGltZXIgPSAwO1xyXG5cdHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2ssIG1zKSB7XHJcblx0XHRjbGVhclRpbWVvdXQodGltZXIpO1xyXG5cdFx0dGltZXIgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCBtcyk7XHJcblx0fTtcclxufSkoKTtcclxuXHJcbmNvbnN0IHVudXNlZFRhZ3MgPSBbXHJcblx0Ly8ge1xyXG5cdC8vIFx0bmFtZTogJ3NjcmlwdCdcclxuXHQvLyB9LFxyXG5cdHtcclxuXHRcdG5hbWU6ICdsaW5rJyxcclxuXHRcdGZpbHRlcjogdGFnID0+IHRhZy5nZXRBdHRyaWJ1dGUoJ3JlbCcpID09ICdzdHlsZXNoZWV0J1xyXG5cdFx0XHQmJiB0YWcuZ2V0QXR0cmlidXRlKCdocmVmJykuaW5jbHVkZXMoJ2RyYWctbi1kcm9wJylcclxuXHR9LFxyXG5cdHtcclxuXHRcdG5hbWU6ICdocicsXHJcblx0XHRmaWx0ZXI6IHRhZyA9PiAkKHRhZykuaGFzQ2xhc3MoJ2hvcml6b250YWwtbGluZScpXHJcblx0XHRcdHx8ICQodGFnKS5oYXNDbGFzcygndmVydGljYWwtbGluZScpXHJcblx0fVxyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0U3R5bGUoZWwsIHN0eWxlUHJvcCkge1xyXG5cdHZhbHVlID0gXCJcIjtcclxuXHQvL3ZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsKTtcclxuXHRpZiAoZWwuc3R5bGUgJiYgZWwuc3R5bGUubGVuZ3RoID4gMCAmJiBlbC5zdHlsZVtzdHlsZVByb3BdKS8vY2hlY2sgaW5saW5lXHJcblx0XHR2YXIgdmFsdWUgPSBlbC5zdHlsZVtzdHlsZVByb3BdO1xyXG5cdGVsc2VcclxuXHRcdGlmIChlbC5jdXJyZW50U3R5bGUpXHQvL2NoZWNrIGRlZmluZWQgY3NzXHJcblx0XHRcdHZhciB2YWx1ZSA9IGVsLmN1cnJlbnRTdHlsZVtzdHlsZVByb3BdO1xyXG5cdFx0ZWxzZSBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcclxuXHRcdFx0dmFyIHZhbHVlID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0RGVmYXVsdENvbXB1dGVkU3R5bGUgP1xyXG5cdFx0XHRcdGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldERlZmF1bHRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHN0eWxlUHJvcCkgOlxyXG5cdFx0XHRcdHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHN0eWxlUHJvcCk7XHJcblx0XHR9XHJcblxyXG5cdHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuaWYgKFZ2dmViID09PSB1bmRlZmluZWQpIHZhciBWdnZlYiA9IHt9O1xyXG5cclxuVnZ2ZWIuZGVmYXVsdENvbXBvbmVudCA9IFwiX2Jhc2VcIjtcclxuVnZ2ZWIucHJlc2VydmVQcm9wZXJ0eVNlY3Rpb25zID0gdHJ1ZTtcclxuXHJcblZ2dmViLmJhc2VVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0ID8gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmMucmVwbGFjZSgvW15cXC9dKj9cXC5qcyQvLCAnJykgOiAnJztcclxuXHJcblZ2dmViLkNvbXBvbmVudHNHcm91cCA9IHt9O1xyXG5cclxuVnZ2ZWIuQ29tcG9uZW50cyA9IHtcclxuXHRfY29tcG9uZW50czoge30sXHJcblxyXG5cdF9ub2Rlc0xvb2t1cDoge30sXHJcblxyXG5cdF9hdHRyaWJ1dGVzTG9va3VwOiB7fSxcclxuXHJcblx0X2NsYXNzZXNMb29rdXA6IHt9LFxyXG5cclxuXHRfY2xhc3Nlc1JlZ2V4TG9va3VwOiB7fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKHVybCkge1xyXG5cdH0sXHJcblxyXG5cdGdldDogZnVuY3Rpb24gKHR5cGUpIHtcclxuXHRcdHJldHVybiB0aGlzLl9jb21wb25lbnRzW3R5cGVdO1xyXG5cdH0sXHJcblxyXG5cdGFkZDogZnVuY3Rpb24gKHR5cGUsIGRhdGEpIHtcclxuXHRcdGRhdGEudHlwZSA9IHR5cGU7XHJcblxyXG5cdFx0dGhpcy5fY29tcG9uZW50c1t0eXBlXSA9IGRhdGE7XHJcblxyXG5cdFx0aWYgKGRhdGEubm9kZXMpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBkYXRhLm5vZGVzKSB7XHJcblx0XHRcdFx0dGhpcy5fbm9kZXNMb29rdXBbZGF0YS5ub2Rlc1tpXV0gPSBkYXRhO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGRhdGEuYXR0cmlidXRlcykge1xyXG5cdFx0XHRpZiAoZGF0YS5hdHRyaWJ1dGVzLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xyXG5cdFx0XHRcdGZvciAodmFyIGkgaW4gZGF0YS5hdHRyaWJ1dGVzKSB7XHJcblx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2RhdGEuYXR0cmlidXRlc1tpXV0gPSBkYXRhO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRmb3IgKHZhciBpIGluIGRhdGEuYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2ldID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2ldID0ge307XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGRhdGEuYXR0cmlidXRlc1tpXS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcclxuXHRcdFx0XHRcdFx0Ly8g5pSv5oyBdGV4dGlucHV05Lit5LiN5ZCM55qE6L6T5YWl57G75Z6LYXR0cmlidXRlczogeyBcInR5cGVcIjogWyd0ZXh0JywgJ3Bhc3N3b3JkJ10gfSxcclxuXHRcdFx0XHRcdFx0ZGF0YS5hdHRyaWJ1dGVzW2ldLmZvckVhY2godmFsdWUgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuX2F0dHJpYnV0ZXNMb29rdXBbaV1bdmFsdWVdID0gZGF0YTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2ldW2RhdGEuYXR0cmlidXRlc1tpXV0gPSBkYXRhO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkYXRhLmNsYXNzZXMpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBkYXRhLmNsYXNzZXMpIHtcclxuXHRcdFx0XHR0aGlzLl9jbGFzc2VzTG9va3VwW2RhdGEuY2xhc3Nlc1tpXV0gPSBkYXRhO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGRhdGEuY2xhc3Nlc1JlZ2V4KSB7XHJcblx0XHRcdGZvciAodmFyIGkgaW4gZGF0YS5jbGFzc2VzUmVnZXgpIHtcclxuXHRcdFx0XHR0aGlzLl9jbGFzc2VzUmVnZXhMb29rdXBbZGF0YS5jbGFzc2VzUmVnZXhbaV1dID0gZGF0YTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGV4dGVuZDogZnVuY3Rpb24gKGluaGVyaXRUeXBlLCB0eXBlLCBkYXRhKSB7XHJcblxyXG5cdFx0bmV3RGF0YSA9IGRhdGE7XHJcblxyXG5cdFx0aWYgKGluaGVyaXREYXRhID0gdGhpcy5fY29tcG9uZW50c1tpbmhlcml0VHlwZV0pIHtcclxuXHRcdFx0bmV3RGF0YSA9ICQuZXh0ZW5kKHRydWUsIHt9LCBpbmhlcml0RGF0YSwgZGF0YSk7XHJcblx0XHRcdG5ld0RhdGEucHJvcGVydGllcyA9ICQubWVyZ2UoJC5tZXJnZShbXSwgaW5oZXJpdERhdGEucHJvcGVydGllcyA/IGluaGVyaXREYXRhLnByb3BlcnRpZXMgOiBbXSksIGRhdGEucHJvcGVydGllcyA/IGRhdGEucHJvcGVydGllcyA6IFtdKTtcclxuXHRcdH1cclxuXHJcblx0XHQvL3NvcnQgYnkgb3JkZXJcclxuXHRcdG5ld0RhdGEucHJvcGVydGllcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgYS5zb3J0ID09PSBcInVuZGVmaW5lZFwiKSBhLnNvcnQgPSAwO1xyXG5cdFx0XHRpZiAodHlwZW9mIGIuc29ydCA9PT0gXCJ1bmRlZmluZWRcIikgYi5zb3J0ID0gMDtcclxuXHJcblx0XHRcdGlmIChhLnNvcnQgPCBiLnNvcnQpXHJcblx0XHRcdFx0cmV0dXJuIC0xO1xyXG5cdFx0XHRpZiAoYS5zb3J0ID4gYi5zb3J0KVxyXG5cdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHRyZXR1cm4gMDtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHR0aGlzLmFkZCh0eXBlLCBuZXdEYXRhKTtcclxuXHR9LFxyXG5cclxuXHJcblx0bWF0Y2hOb2RlOiBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0aWYgKCQobm9kZSkuYXR0cihkYXRhQ29tcG9uZW50SWQpICYmIHRoaXMuX2NvbXBvbmVudHNbJChub2RlKS5hdHRyKGRhdGFDb21wb25lbnRJZCldKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9jb21wb25lbnRzWyQobm9kZSkuYXR0cihkYXRhQ29tcG9uZW50SWQpXTtcclxuXHRcdH0gZWxzZSBpZiAoJChub2RlKS5hdHRyKCd0eXBlJykgPT0gJ3JhZGlvJyB8fCAkKG5vZGUpLmF0dHIoJ3R5cGUnKSA9PSAnY2hlY2tib3gnKSB7XHJcblx0XHRcdGNvbnN0ICRwYXJlbnQgPSAkKG5vZGUpLnBhcmVudCgpO1xyXG5cdFx0XHRpZiAoJHBhcmVudC5hdHRyKGRhdGFDb21wb25lbnRJZCkgJiYgdGhpcy5fY29tcG9uZW50c1skcGFyZW50LmF0dHIoZGF0YUNvbXBvbmVudElkKV0pIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fY29tcG9uZW50c1skcGFyZW50LmF0dHIoZGF0YUNvbXBvbmVudElkKV1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChub2RlLmF0dHJpYnV0ZXMubGVuZ3RoKSB7XHJcblx0XHRcdC8vc2VhcmNoIGZvciBhdHRyaWJ1dGVzXHJcblx0XHRcdGZvciAodmFyIGkgaW4gbm9kZS5hdHRyaWJ1dGVzKSB7XHJcblx0XHRcdFx0YXR0ciA9IG5vZGUuYXR0cmlidXRlc1tpXS5uYW1lO1xyXG5cdFx0XHRcdHZhbHVlID0gbm9kZS5hdHRyaWJ1dGVzW2ldLnZhbHVlO1xyXG5cclxuXHRcdFx0XHRpZiAoYXR0ciBpbiB0aGlzLl9hdHRyaWJ1dGVzTG9va3VwKSB7XHJcblx0XHRcdFx0XHRjb21wb25lbnQgPSB0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2F0dHJdO1xyXG5cclxuXHRcdFx0XHRcdC8vY3VycmVudGx5IHdlIGNoZWNrIHRoYXQgaXMgbm90IGEgY29tcG9uZW50IGJ5IGxvb2tpbmcgYXQgbmFtZSBhdHRyaWJ1dGVcclxuXHRcdFx0XHRcdC8vaWYgd2UgaGF2ZSBhIGNvbGxlY3Rpb24gb2Ygb2JqZWN0cyBpdCBtZWFucyB0aGF0IGF0dHJpYnV0ZSB2YWx1ZSBtdXN0IGJlIGNoZWNrZWRcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgY29tcG9uZW50W1wibmFtZVwiXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdFx0XHRpZiAodmFsdWUgaW4gY29tcG9uZW50KSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGNvbXBvbmVudFt2YWx1ZV07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gY29tcG9uZW50O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBub2RlLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRhdHRyID0gbm9kZS5hdHRyaWJ1dGVzW2ldLm5hbWU7XHJcblx0XHRcdFx0dmFsdWUgPSBub2RlLmF0dHJpYnV0ZXNbaV0udmFsdWU7XHJcblxyXG5cdFx0XHRcdC8vY2hlY2sgZm9yIG5vZGUgY2xhc3Nlc1xyXG5cdFx0XHRcdGlmIChhdHRyID09IFwiY2xhc3NcIikge1xyXG5cdFx0XHRcdFx0Y2xhc3NlcyA9IHZhbHVlLnNwbGl0KFwiIFwiKTtcclxuXHJcblx0XHRcdFx0XHRmb3IgKGogaW4gY2xhc3Nlcykge1xyXG5cdFx0XHRcdFx0XHRpZiAoY2xhc3Nlc1tqXSBpbiB0aGlzLl9jbGFzc2VzTG9va3VwKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl9jbGFzc2VzTG9va3VwW2NsYXNzZXNbal1dO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGZvciAocmVnZXggaW4gdGhpcy5fY2xhc3Nlc1JlZ2V4TG9va3VwKSB7XHJcblx0XHRcdFx0XHRcdHJlZ2V4T2JqID0gbmV3IFJlZ0V4cChyZWdleCk7XHJcblx0XHRcdFx0XHRcdGlmIChyZWdleE9iai5leGVjKHZhbHVlKSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl9jbGFzc2VzUmVnZXhMb29rdXBbcmVnZXhdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGFnTmFtZSA9IG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0aWYgKHRhZ05hbWUgaW4gdGhpcy5fbm9kZXNMb29rdXApIHJldHVybiB0aGlzLl9ub2Rlc0xvb2t1cFt0YWdOYW1lXTtcclxuXHJcblx0XHQvL3JldHVybiBmYWxzZTtcclxuXHRcdHJldHVybiB0aGlzLmdldChWdnZlYi5kZWZhdWx0Q29tcG9uZW50KTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uICh0eXBlKSB7XHJcblxyXG5cdFx0Y29tcG9uZW50ID0gdGhpcy5fY29tcG9uZW50c1t0eXBlXTtcclxuXHJcblx0XHRyaWdodFBhbmVsID0galF1ZXJ5KFwiI3JpZ2h0LXBhbmVsICNjb21wb25lbnQtcHJvcGVydGllc1wiKTtcclxuXHRcdHNlY3Rpb24gPSByaWdodFBhbmVsLmZpbmQoJy5zZWN0aW9uW2RhdGEtc2VjdGlvbj1cImRlZmF1bHRcIl0nKTtcclxuXHJcblx0XHRpZiAoIShWdnZlYi5wcmVzZXJ2ZVByb3BlcnR5U2VjdGlvbnMgJiYgc2VjdGlvbi5sZW5ndGgpKSB7XHJcblx0XHRcdHJpZ2h0UGFuZWwuaHRtbCgnJykuYXBwZW5kKHRtcGwoXCJ2dnZlYi1pbnB1dC1zZWN0aW9uaW5wdXRcIiwgeyBrZXk6IFwiZGVmYXVsdFwiLCBoZWFkZXI6IGNvbXBvbmVudC5uYW1lIH0pKTtcclxuXHRcdFx0c2VjdGlvbiA9IHJpZ2h0UGFuZWwuZmluZChcIi5zZWN0aW9uXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJpZ2h0UGFuZWwuZmluZCgnW2RhdGEtaGVhZGVyPVwiZGVmYXVsdFwiXSBzcGFuJykuaHRtbChjb21wb25lbnQubmFtZSk7XHJcblx0XHRzZWN0aW9uLmh0bWwoXCJcIilcclxuXHJcblx0XHRpZiAoY29tcG9uZW50LmJlZm9yZUluaXQpIGNvbXBvbmVudC5iZWZvcmVJbml0KFZ2dmViLkJ1aWxkZXIuc2VsZWN0ZWRFbC5nZXQoMCkpO1xyXG5cclxuXHRcdGZuID0gZnVuY3Rpb24gKGNvbXBvbmVudCwgcHJvcGVydHkpIHtcclxuXHRcdFx0cmV0dXJuIHByb3BlcnR5LmlucHV0Lm9uKCdwcm9wZXJ0eUNoYW5nZScsIGZ1bmN0aW9uIChldmVudCwgdmFsdWUsIGlucHV0KSB7XHJcblx0XHRcdFx0ZWxlbWVudCA9IFZ2dmViLkJ1aWxkZXIuc2VsZWN0ZWRFbDtcclxuXHRcdFx0XHRpZiAocHJvcGVydHkuY2hpbGQpIGVsZW1lbnQgPSBlbGVtZW50LmZpbmQocHJvcGVydHkuY2hpbGQpO1xyXG5cdFx0XHRcdGlmIChwcm9wZXJ0eS5wYXJlbnQpIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudChwcm9wZXJ0eS5wYXJlbnQpO1xyXG5cclxuXHRcdFx0XHRpZiAocHJvcGVydHkub25DaGFuZ2UpIHtcclxuXHRcdFx0XHRcdGVsZW1lbnQgPSBwcm9wZXJ0eS5vbkNoYW5nZShlbGVtZW50LCB2YWx1ZSwgaW5wdXQsIGNvbXBvbmVudCk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eS5odG1sQXR0cikge1xyXG5cdFx0XHRcdFx0b2xkVmFsdWUgPSBlbGVtZW50LmF0dHIocHJvcGVydHkuaHRtbEF0dHIpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChwcm9wZXJ0eS5odG1sQXR0ciA9PSAndGV4dCcpIHtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudC50ZXh0KHZhbHVlKTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHkuaHRtbEF0dHIgPT0gXCJjbGFzc1wiICYmIHByb3BlcnR5LnZhbGlkVmFsdWVzKSB7XHJcblx0XHRcdFx0XHRcdGVsZW1lbnQucmVtb3ZlQ2xhc3MocHJvcGVydHkudmFsaWRWYWx1ZXMuam9pbihcIiBcIikpO1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5hZGRDbGFzcyh2YWx1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChwcm9wZXJ0eS5odG1sQXR0ciA9PSBcInN0eWxlXCIpIHtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQuY3NzKHByb3BlcnR5LmtleSwgdmFsdWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LmF0dHIocHJvcGVydHkuaHRtbEF0dHIsIHZhbHVlKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0XHRcdFx0dHlwZTogJ2F0dHJpYnV0ZXMnLFxyXG5cdFx0XHRcdFx0XHR0YXJnZXQ6IGVsZW1lbnQuZ2V0KDApLFxyXG5cdFx0XHRcdFx0XHRhdHRyaWJ1dGVOYW1lOiBwcm9wZXJ0eS5odG1sQXR0cixcclxuXHRcdFx0XHRcdFx0b2xkVmFsdWU6IG9sZFZhbHVlLFxyXG5cdFx0XHRcdFx0XHRuZXdWYWx1ZTogZWxlbWVudC5hdHRyKHByb3BlcnR5Lmh0bWxBdHRyKVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoY29tcG9uZW50Lm9uQ2hhbmdlKSB7XHJcblx0XHRcdFx0XHRlbGVtZW50ID0gY29tcG9uZW50Lm9uQ2hhbmdlKGVsZW1lbnQsIHByb3BlcnR5LCB2YWx1ZSwgaW5wdXQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCFwcm9wZXJ0eS5jaGlsZCAmJiAhcHJvcGVydHkucGFyZW50KSBWdnZlYi5CdWlsZGVyLnNlbGVjdE5vZGUoZWxlbWVudCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHRub2RlRWxlbWVudCA9IFZ2dmViLkJ1aWxkZXIuc2VsZWN0ZWRFbDtcclxuXHJcblx0XHRmb3IgKHZhciBpIGluIGNvbXBvbmVudC5wcm9wZXJ0aWVzKSB7XHJcblx0XHRcdHByb3BlcnR5ID0gY29tcG9uZW50LnByb3BlcnRpZXNbaV07XHJcblxyXG5cdFx0XHRpZiAocHJvcGVydHkuYmVmb3JlSW5pdCkgcHJvcGVydHkuYmVmb3JlSW5pdChlbGVtZW50LmdldCgwKSlcclxuXHJcblx0XHRcdGVsZW1lbnQgPSBub2RlRWxlbWVudDtcclxuXHRcdFx0aWYgKHByb3BlcnR5LmNoaWxkKSBlbGVtZW50ID0gZWxlbWVudC5maW5kKHByb3BlcnR5LmNoaWxkKTtcclxuXHJcblx0XHRcdGlmIChwcm9wZXJ0eS5kYXRhKSB7XHJcblx0XHRcdFx0cHJvcGVydHkuZGF0YVtcImtleVwiXSA9IHByb3BlcnR5LmtleTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRwcm9wZXJ0eS5kYXRhID0geyBcImtleVwiOiBwcm9wZXJ0eS5rZXkgfTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiBwcm9wZXJ0eS5ncm91cCA9PT0gJ3VuZGVmaW5lZCcpIHByb3BlcnR5Lmdyb3VwID0gbnVsbDtcclxuXHJcblx0XHRcdHByb3BlcnR5LmlucHV0ID0gcHJvcGVydHkuaW5wdXR0eXBlLmluaXQocHJvcGVydHkuZGF0YSk7XHJcblxyXG5cdFx0XHRpZiAocHJvcGVydHkuaW5pdCkge1xyXG5cdFx0XHRcdHByb3BlcnR5LmlucHV0dHlwZS5zZXRWYWx1ZShwcm9wZXJ0eS5pbml0KGVsZW1lbnQuZ2V0KDApKSk7XHJcblx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHkuaHRtbEF0dHIpIHtcclxuXHRcdFx0XHRpZiAocHJvcGVydHkuaHRtbEF0dHIgPT0gJ3RleHQnKSB7XHJcblx0XHRcdFx0XHR2YWx1ZSA9IGVsZW1lbnQudGV4dCgpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHkuaHRtbEF0dHIgPT0gXCJzdHlsZVwiKSB7XHJcblx0XHRcdFx0XHQvL3ZhbHVlID0gZWxlbWVudC5jc3MocHJvcGVydHkua2V5KTsvL2pxdWVyeSBjc3MgcmV0dXJucyBjb21wdXRlZCBzdHlsZVxyXG5cdFx0XHRcdFx0dmFsdWUgPSBnZXRTdHlsZShlbGVtZW50LmdldCgwKSwgcHJvcGVydHkua2V5KTsvL2dldFN0eWxlIHJldHVybnMgZGVjbGFyZWQgc3R5bGVcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dmFsdWUgPSBlbGVtZW50LmF0dHIocHJvcGVydHkuaHRtbEF0dHIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly9pZiBhdHRyaWJ1dGUgaXMgY2xhc3MgY2hlY2sgaWYgb25lIG9mIHZhbGlkIHZhbHVlcyBpcyBpbmNsdWRlZCBhcyBjbGFzcyB0byBzZXQgdGhlIHNlbGVjdFxyXG5cdFx0XHRcdGlmICh2YWx1ZSAmJiBwcm9wZXJ0eS5odG1sQXR0ciA9PSBcImNsYXNzXCIgJiYgcHJvcGVydHkudmFsaWRWYWx1ZXMpIHtcclxuXHRcdFx0XHRcdHZhbHVlID0gdmFsdWUuc3BsaXQoXCIgXCIpLmZpbHRlcihmdW5jdGlvbiAoZWwpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHByb3BlcnR5LnZhbGlkVmFsdWVzLmluZGV4T2YoZWwpICE9IC0xXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHByb3BlcnR5LmlucHV0dHlwZS5zZXRWYWx1ZSh2YWx1ZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZuKGNvbXBvbmVudCwgcHJvcGVydHkpO1xyXG5cclxuXHRcdFx0aWYgKHByb3BlcnR5LmlucHV0dHlwZSA9PSBTZWN0aW9uSW5wdXQpIHtcclxuXHRcdFx0XHRzZWN0aW9uID0gcmlnaHRQYW5lbC5maW5kKCcuc2VjdGlvbltkYXRhLXNlY3Rpb249XCInICsgcHJvcGVydHkua2V5ICsgJ1wiXScpO1xyXG5cclxuXHRcdFx0XHRpZiAoVnZ2ZWIucHJlc2VydmVQcm9wZXJ0eVNlY3Rpb25zICYmIHNlY3Rpb24ubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRzZWN0aW9uLmh0bWwoXCJcIik7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJpZ2h0UGFuZWwuYXBwZW5kKHByb3BlcnR5LmlucHV0KTtcclxuXHRcdFx0XHRcdHNlY3Rpb24gPSByaWdodFBhbmVsLmZpbmQoJy5zZWN0aW9uW2RhdGEtc2VjdGlvbj1cIicgKyBwcm9wZXJ0eS5rZXkgKyAnXCJdJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHJvdyA9ICQodG1wbCgndnZ2ZWItcHJvcGVydHknLCBwcm9wZXJ0eSkpO1xyXG5cdFx0XHRcdHJvdy5maW5kKCcuaW5wdXQnKS5hcHBlbmQocHJvcGVydHkuaW5wdXQpO1xyXG5cdFx0XHRcdHNlY3Rpb24uYXBwZW5kKHJvdyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY29tcG9uZW50LmluaXQpIGNvbXBvbmVudC5pbml0KFZ2dmViLkJ1aWxkZXIuc2VsZWN0ZWRFbC5nZXQoMCkpO1xyXG5cdH1cclxufTtcclxuXHJcblxyXG5cclxuVnZ2ZWIuV3lzaXd5Z0VkaXRvciA9IHtcclxuXHJcblx0aXNBY3RpdmU6IGZhbHNlLFxyXG5cdG9sZFZhbHVlOiAnJyxcclxuXHRkb2M6IGZhbHNlLFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZG9jKSB7XHJcblx0XHR0aGlzLmRvYyA9IGRvYztcclxuXHJcblx0XHQkKFwiI2JvbGQtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCdib2xkJywgZmFsc2UsIG51bGwpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjaXRhbGljLWJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGRvYy5leGVjQ29tbWFuZCgnaXRhbGljJywgZmFsc2UsIG51bGwpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjdW5kZXJsaW5lLWJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGRvYy5leGVjQ29tbWFuZCgndW5kZXJsaW5lJywgZmFsc2UsIG51bGwpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjc3RyaWtlLWJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGRvYy5leGVjQ29tbWFuZCgnc3RyaWtlVGhyb3VnaCcsIGZhbHNlLCBudWxsKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI2xpbmstYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCdjcmVhdGVMaW5rJywgZmFsc2UsIFwiI1wiKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHR1bmRvOiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5kb2MuZXhlY0NvbW1hbmQoJ3VuZG8nLCBmYWxzZSwgbnVsbCk7XHJcblx0fSxcclxuXHJcblx0cmVkbzogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdyZWRvJywgZmFsc2UsIG51bGwpO1xyXG5cdH0sXHJcblxyXG5cdGVkaXQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHRlbGVtZW50LmF0dHIoeyAnY29udGVudGVkaXRhYmxlJzogdHJ1ZSwgJ3NwZWxsY2hlY2trZXInOiBmYWxzZSB9KTtcclxuXHRcdCQoXCIjd3lzaXd5Zy1lZGl0b3JcIikuc2hvdygpO1xyXG5cclxuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcblx0XHR0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcclxuXHRcdHRoaXMub2xkVmFsdWUgPSBlbGVtZW50Lmh0bWwoKTtcclxuXHR9LFxyXG5cclxuXHRkZXN0cm95OiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0ZWxlbWVudC5yZW1vdmVBdHRyKCdjb250ZW50ZWRpdGFibGUgc3BlbGxjaGVja2tlcicpO1xyXG5cdFx0JChcIiN3eXNpd3lnLWVkaXRvclwiKS5oaWRlKCk7XHJcblx0XHR0aGlzLmlzQWN0aXZlID0gZmFsc2U7XHJcblxyXG5cclxuXHRcdG5vZGUgPSB0aGlzLmVsZW1lbnQuZ2V0KDApO1xyXG5cdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdHR5cGU6ICdjaGFyYWN0ZXJEYXRhJyxcclxuXHRcdFx0dGFyZ2V0OiBub2RlLFxyXG5cdFx0XHRvbGRWYWx1ZTogdGhpcy5vbGRWYWx1ZSxcclxuXHRcdFx0bmV3VmFsdWU6IG5vZGUuaW5uZXJIVE1MXHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcblZ2dmViLkJ1aWxkZXIgPSB7XHJcblxyXG5cdGRyYWdNb3ZlTXV0YXRpb246IGZhbHNlLFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAodXJsLCBjYWxsYmFjaykge1xyXG5cclxuXHRcdHNlbGYgPSB0aGlzO1xyXG5cclxuXHRcdHNlbGYubG9hZENvbnRyb2xHcm91cHMoKTtcclxuXHJcblx0XHRzZWxmLnNlbGVjdGVkRWwgPSBudWxsO1xyXG5cdFx0c2VsZi5oaWdobGlnaHRFbCA9IG51bGw7XHJcblx0XHRzZWxmLmluaXRDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cclxuXHRcdHNlbGYuZG9jdW1lbnRGcmFtZSA9ICQoXCIjaWZyYW1lLXdyYXBwZXIgPiBpZnJhbWVcIik7XHJcblx0XHRzZWxmLmNhbnZhcyA9ICQoXCIjY2FudmFzXCIpO1xyXG5cclxuXHRcdHNlbGYuX2xvYWRJZnJhbWUodXJsKTtcclxuXHJcblx0XHRzZWxmLl9pbml0RHJhZ2Ryb3AoKTtcclxuXHJcblx0XHRzZWxmLmRyYWdFbGVtZW50ID0gbnVsbDtcclxuXHR9LFxyXG5cclxuXHQvKiBjb250cm9scyAqL1xyXG5cdGxvYWRDb250cm9sR3JvdXBzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0Y29tcG9uZW50c0xpc3QgPSAkKFwiI2NvbXBvbmVudHMtbGlzdFwiKTtcclxuXHRcdGNvbXBvbmVudHNMaXN0LmVtcHR5KCk7XHJcblxyXG5cdFx0Zm9yIChncm91cCBpbiBWdnZlYi5Db21wb25lbnRzR3JvdXApIHtcclxuXHRcdFx0Y29tcG9uZW50c0xpc3QuYXBwZW5kKCc8bGkgY2xhc3M9XCJoZWFkZXJcIiBkYXRhLXNlY3Rpb249XCInICsgZ3JvdXAgKyAnXCIgIGRhdGEtc2VhcmNoPVwiXCI+PGxhYmVsIGNsYXNzPVwiaGVhZGVyXCIgZm9yPVwiY29tcGhlYWRfJyArIGdyb3VwICsgJ1wiPicgKyBncm91cCArICcgIDxkaXYgY2xhc3M9XCJoZWFkZXItYXJyb3dcIj48L2Rpdj5cXFxyXG5cdFx0XHRcdFx0XHRcdFx0ICAgPC9sYWJlbD48aW5wdXQgY2xhc3M9XCJoZWFkZXJfY2hlY2tcIiB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPVwidHJ1ZVwiIGlkPVwiY29tcGhlYWRfJyArIGdyb3VwICsgJ1wiPiAgPG9sPjwvb2w+PC9saT4nKTtcclxuXHJcblx0XHRcdGNvbXBvbmVudHNTdWJMaXN0ID0gY29tcG9uZW50c0xpc3QuZmluZCgnbGlbZGF0YS1zZWN0aW9uPVwiJyArIGdyb3VwICsgJ1wiXSAgb2wnKTtcclxuXHJcblx0XHRcdGNvbXBvbmVudHMgPSBWdnZlYi5Db21wb25lbnRzR3JvdXBbZ3JvdXBdO1xyXG5cclxuXHRcdFx0Zm9yIChpIGluIGNvbXBvbmVudHMpIHtcclxuXHRcdFx0XHRjb21wb25lbnRUeXBlID0gY29tcG9uZW50c1tpXTtcclxuXHRcdFx0XHRjb21wb25lbnQgPSBWdnZlYi5Db21wb25lbnRzLmdldChjb21wb25lbnRUeXBlKTtcclxuXHJcblx0XHRcdFx0aWYgKGNvbXBvbmVudCkge1xyXG5cdFx0XHRcdFx0aXRlbSA9ICQoJzxsaSBkYXRhLXNlY3Rpb249XCInICsgZ3JvdXAgKyAnXCIgZGF0YS10eXBlPVwiJyArIGNvbXBvbmVudFR5cGUgKyAnXCIgZGF0YS1zZWFyY2g9XCInICsgY29tcG9uZW50Lm5hbWUudG9Mb3dlckNhc2UoKSArICdcIj48YSBocmVmPVwiI1wiPicgKyBjb21wb25lbnQubmFtZSArIFwiPC9hPjwvbGk+XCIpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChjb21wb25lbnQuaW1hZ2UpIHtcclxuXHJcblx0XHRcdFx0XHRcdGl0ZW0uY3NzKHtcclxuXHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKFwiICsgJ2xpYnMvYnVpbGRlci8nICsgY29tcG9uZW50LmltYWdlICsgXCIpXCIsXHJcblx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZFJlcGVhdDogXCJuby1yZXBlYXRcIlxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGNvbXBvbmVudHNTdWJMaXN0LmFwcGVuZChpdGVtKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGxvYWRVcmw6IGZ1bmN0aW9uICh1cmwpIHtcclxuXHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmhpZGUoKTtcclxuXHRcdHNlbGYuaWZyYW1lLnNyYyA9IHVybDtcclxuXHR9LFxyXG5cclxuXHQvKiBpZnJhbWUgKi9cclxuXHRfbG9hZElmcmFtZTogZnVuY3Rpb24gKHVybCkge1xyXG5cclxuXHRcdHNlbGYuaWZyYW1lID0gdGhpcy5kb2N1bWVudEZyYW1lLmdldCgwKTtcclxuXHRcdHNlbGYuaWZyYW1lLnNyYyA9IHVybDtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5kb2N1bWVudEZyYW1lLm9uKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHR3aW5kb3cuRnJhbWVXaW5kb3cgPSBzZWxmLmlmcmFtZS5jb250ZW50V2luZG93O1xyXG5cdFx0XHR3aW5kb3cuRnJhbWVEb2N1bWVudCA9IHNlbGYuaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XHJcblxyXG5cdFx0XHRWdnZlYi5XeXNpd3lnRWRpdG9yLmluaXQod2luZG93LkZyYW1lRG9jdW1lbnQpO1xyXG5cdFx0XHRpZiAoc2VsZi5pbml0Q2FsbGJhY2spIHNlbGYuaW5pdENhbGxiYWNrKCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gc2VsZi5fZnJhbWVMb2FkZWQoKTtcclxuXHRcdH0pO1xyXG5cclxuXHR9LFxyXG5cclxuXHRfZnJhbWVMb2FkZWQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRzZWxmLmZyYW1lRG9jID0gJCh3aW5kb3cuRnJhbWVEb2N1bWVudCk7XHJcblx0XHRzZWxmLmZyYW1lSHRtbCA9ICQod2luZG93LkZyYW1lRG9jdW1lbnQpLmZpbmQoXCJodG1sXCIpO1xyXG5cdFx0c2VsZi5mcmFtZUJvZHkgPSAkKHdpbmRvdy5GcmFtZURvY3VtZW50KS5maW5kKFwiYm9keVwiKTtcclxuXHJcblx0XHR0aGlzLl9pbml0SGlnaHRsaWdodCgpO1xyXG5cdH0sXHJcblxyXG5cdF9nZXRFbGVtZW50VHlwZTogZnVuY3Rpb24gKGVsKSB7XHJcblxyXG5cdFx0Ly9zZWFyY2ggZm9yIGNvbXBvbmVudCBhdHRyaWJ1dGVcclxuXHRcdGNvbXBvbmVudE5hbWUgPSAnJztcclxuXHJcblx0XHRpZiAoZWwuYXR0cmlidXRlcylcclxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaisrKSB7XHJcblxyXG5cdFx0XHRcdGlmIChlbC5hdHRyaWJ1dGVzW2pdLm5vZGVOYW1lLmluZGV4T2YoJ2RhdGEtY29tcG9uZW50JykgPiAtMSkge1xyXG5cdFx0XHRcdFx0Y29tcG9uZW50TmFtZSA9IGVsLmF0dHJpYnV0ZXNbal0ubm9kZU5hbWUucmVwbGFjZSgnZGF0YS1jb21wb25lbnQtJywgJycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdGlmIChjb21wb25lbnROYW1lICE9ICcnKSByZXR1cm4gY29tcG9uZW50TmFtZTtcclxuXHJcblx0XHRpZiAoZWwuYXR0cmlidXRlcylcclxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaisrKSB7XHJcblxyXG5cdFx0XHRcdGlmIChlbC5hdHRyaWJ1dGVzW2pdLm5vZGVOYW1lLmluZGV4T2YoJ2RhdGEtY29tcG9uZW50JykgPiAtMSkge1xyXG5cdFx0XHRcdFx0Y29tcG9uZW50TmFtZSA9IGVsLmF0dHJpYnV0ZXNbal0ubm9kZU5hbWUucmVwbGFjZSgnZGF0YS1jb21wb25lbnQtJywgJycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdGlmIChjb21wb25lbnROYW1lICE9ICcnKSByZXR1cm4gY29tcG9uZW50TmFtZTtcclxuXHRcdC8vaWYgKGNsYXNzTmFtZSkgcmV0dXJuIGNvbXBvbmVudE5hbWU7XHJcblx0XHRyZXR1cm4gZWwudGFnTmFtZTtcclxuXHR9LFxyXG5cclxuXHRsb2FkTm9kZUNvbXBvbmVudDogZnVuY3Rpb24gKG5vZGUpIHtcclxuXHRcdGRhdGEgPSBWdnZlYi5Db21wb25lbnRzLm1hdGNoTm9kZShub2RlKTtcclxuXHRcdGlmIChkYXRhKSBWdnZlYi5Db21wb25lbnRzLnJlbmRlcihkYXRhLnR5cGUpO1xyXG5cclxuXHR9LFxyXG5cclxuXHRzZWxlY3ROb2RlOiBmdW5jdGlvbiAobm9kZSA9IGZhbHNlKSB7XHJcblxyXG5cdFx0aWYgKCFub2RlKSB7XHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmhpZGUoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChzZWxmLnRleHRlZGl0RWwgJiYgc2VsZi5zZWxlY3RlZEVsLmdldCgwKSAhPSBub2RlKSB7XHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IuZGVzdHJveShzZWxmLnRleHRlZGl0RWwpO1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5yZW1vdmVDbGFzcyhcInRleHQtZWRpdFwiKS5maW5kKFwiI3NlbGVjdC1hY3Rpb25zXCIpLnNob3coKTtcclxuXHRcdFx0c2VsZi50ZXh0ZWRpdEVsID0gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRzZWxmLnNlbGVjdGVkRWwgPSB0YXJnZXQgPSBqUXVlcnkobm9kZSk7XHJcblx0XHRvZmZzZXQgPSB0YXJnZXQub2Zmc2V0KCk7XHJcblxyXG5cclxuXHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmNzcyhcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwidG9wXCI6IG9mZnNldC50b3AgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbFRvcCgpLFxyXG5cdFx0XHRcdFwibGVmdFwiOiBvZmZzZXQubGVmdCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsTGVmdCgpLFxyXG5cdFx0XHRcdFwid2lkdGhcIjogdGFyZ2V0Lm91dGVyV2lkdGgoKSxcclxuXHRcdFx0XHRcImhlaWdodFwiOiB0YXJnZXQub3V0ZXJIZWlnaHQoKSxcclxuXHRcdFx0XHRcImRpc3BsYXlcIjogXCJibG9ja1wiLFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRqUXVlcnkoXCIjaGlnaGxpZ2h0LW5hbWVcIikuaHRtbChzZWxmLl9nZXRFbGVtZW50VHlwZShub2RlKSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdC8qIGlmcmFtZSBoaWdobGlnaHQgKi9cclxuXHRfaW5pdEhpZ2h0bGlnaHQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRtb3ZlRXZlbnQgPSB7IHRhcmdldDogbnVsbCwgfTtcclxuXHJcblx0XHR0aGlzLmZyYW1lQm9keS5vbihcIm1vdXNlbW92ZSB0b3VjaG1vdmVcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdC8vZGVsYXkgZm9yIGhhbGYgYSBzZWNvbmQgaWYgZHJhZ2dpbmcgb3ZlciBzYW1lIGVsZW1lbnRcclxuXHRcdFx0Ly8gaWYgKGV2ZW50LnRhcmdldCA9PSBtb3ZlRXZlbnQudGFyZ2V0ICYmICgoZXZlbnQudGltZVN0YW1wIC0gbW92ZUV2ZW50LnRpbWVTdGFtcCkgPCA1MDApKSByZXR1cm47XHJcblx0XHRcdGlmIChldmVudC50YXJnZXQpIHtcclxuXHRcdFx0XHRtb3ZlRXZlbnQgPSBldmVudDtcclxuXHJcblx0XHRcdFx0c2VsZi5oaWdobGlnaHRFbCA9IHRhcmdldCA9IGpRdWVyeShldmVudC50YXJnZXQpO1xyXG5cdFx0XHRcdG9mZnNldCA9IHRhcmdldC5vZmZzZXQoKTtcclxuXHRcdFx0XHR3aWR0aCA9IHRhcmdldC5vdXRlcldpZHRoKCk7XHJcblx0XHRcdFx0aGVpZ2h0ID0gdGFyZ2V0Lm91dGVySGVpZ2h0KCk7XHJcblxyXG5cdFx0XHRcdGlmIChzZWxmLmlzRHJhZ2dpbmcpIHtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQuY3NzKHtcclxuXHRcdFx0XHRcdFx0ZGlzcGxheTogJ25vbmUnXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHBhcmVudCA9IHNlbGYuaGlnaGxpZ2h0RWw7XHJcblx0XHRcdFx0XHRwYXJlbnRPZmZzZXQgPSBzZWxmLmRyYWdFbGVtZW50Lm9mZnNldCgpO1xyXG5cdFx0XHRcdFx0Ly8gdHJ5IHtcclxuXHRcdFx0XHRcdC8vIFx0c2VsZi5kcmFnRWxlbWVudC5jc3Moe1xyXG5cdFx0XHRcdFx0Ly8gXHRcdGRpc3BsYXk6ICdub25lJ1xyXG5cdFx0XHRcdFx0Ly8gXHR9KTtcclxuXHRcdFx0XHRcdC8vIFx0aWYgKGV2ZW50Lm9yaWdpbmFsRXZlbnQgJiYgKG9mZnNldC5sZWZ0ID4gKGV2ZW50Lm9yaWdpbmFsRXZlbnQueCAtIDEwKSkpIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRpZiAob2Zmc2V0LnRvcCA+IChldmVudC5vcmlnaW5hbEV2ZW50LnkgLSAxMCkpIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHBhcmVudC5iZWZvcmUoc2VsZi5kcmFnRWxlbWVudCk7XHJcblx0XHRcdFx0XHQvLyBcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHBhcmVudC5wcmVwZW5kKHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0c2VsZi5kcmFnRWxlbWVudC5wcmVwZW5kVG8ocGFyZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHR9XHJcblx0XHRcdFx0XHQvLyBcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0aWYgKGV2ZW50Lm9yaWdpbmFsRXZlbnQgJiYgb2Zmc2V0LnRvcCA+ICgoZXZlbnQub3JpZ2luYWxFdmVudC55IC0gMTApKSkge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0cGFyZW50LmJlZm9yZShzZWxmLmRyYWdFbGVtZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0cGFyZW50LmFwcGVuZChzZWxmLmRyYWdFbGVtZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQuYXBwZW5kVG8ocGFyZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHR9XHJcblx0XHRcdFx0XHQvLyBcdH1cclxuXHRcdFx0XHRcdC8vIH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRcdFx0Ly8gXHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cdFx0XHRcdFx0Ly8gfVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0alF1ZXJ5KFwiI2hpZ2hsaWdodC1ib3hcIikuY3NzKFxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XCJ0b3BcIjogb2Zmc2V0LnRvcCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsVG9wKCksXHJcblx0XHRcdFx0XHRcdFx0XCJsZWZ0XCI6IG9mZnNldC5sZWZ0IC0gc2VsZi5mcmFtZURvYy5zY3JvbGxMZWZ0KCksXHJcblx0XHRcdFx0XHRcdFx0XCJ3aWR0aFwiOiB3aWR0aCxcclxuXHRcdFx0XHRcdFx0XHRcImhlaWdodFwiOiBoZWlnaHQsXHJcblx0XHRcdFx0XHRcdFx0XCJkaXNwbGF5XCI6IGV2ZW50LnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScpID8gXCJub25lXCIgOiBcImJsb2NrXCJcclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0alF1ZXJ5KFwiI2hpZ2hsaWdodC1uYW1lXCIpLmh0bWwoc2VsZi5fZ2V0RWxlbWVudFR5cGUoZXZlbnQudGFyZ2V0KSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0dGhpcy5mcmFtZUJvZHkub24oXCJtb3VzZXVwIHRvdWNoZW5kXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRpZiAoc2VsZi5pc0RyYWdnaW5nKSB7XHJcblx0XHRcdFx0c2VsZi5pc0RyYWdnaW5nID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdGlmIChjb21wb25lbnQuZHJhZ0h0bWwpIC8vaWYgZHJhZ0h0bWwgaXMgc2V0IGZvciBkcmFnZ2luZyB0aGVuIHNldCByZWFsIGNvbXBvbmVudCBodG1sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bmV3RWxlbWVudCA9ICQoY29tcG9uZW50Lmh0bWwpO1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnRWxlbWVudC5yZXBsYWNlV2l0aChuZXdFbGVtZW50KTtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQgPSBuZXdFbGVtZW50O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoY29tcG9uZW50LmFmdGVyRHJvcCkgc2VsZi5kcmFnRWxlbWVudCA9IGNvbXBvbmVudC5hZnRlckRyb3Aoc2VsZi5kcmFnRWxlbWVudCk7XHJcblxyXG5cdFx0XHRcdG5vZGUgPSBzZWxmLmRyYWdFbGVtZW50LmdldCgwKTtcclxuXHRcdFx0XHRzZWxmLnNlbGVjdE5vZGUobm9kZSk7XHJcblx0XHRcdFx0c2VsZi5sb2FkTm9kZUNvbXBvbmVudChub2RlKTtcclxuXHJcblx0XHRcdFx0aWYgKHNlbGYuZHJhZ01vdmVNdXRhdGlvbiA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdFx0XHR0eXBlOiAnY2hpbGRMaXN0JyxcclxuXHRcdFx0XHRcdFx0dGFyZ2V0OiBub2RlLnBhcmVudE5vZGUsXHJcblx0XHRcdFx0XHRcdGFkZGVkTm9kZXM6IFtub2RlXSxcclxuXHRcdFx0XHRcdFx0bmV4dFNpYmxpbmc6IG5vZGUubmV4dFNpYmxpbmdcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdNb3ZlTXV0YXRpb24ubmV3UGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnTW92ZU11dGF0aW9uLm5ld05leHRTaWJsaW5nID0gbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRcdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHNlbGYuZHJhZ01vdmVNdXRhdGlvbik7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdNb3ZlTXV0YXRpb24gPSBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHR0aGlzLmZyYW1lQm9keS5vbihcImRibGNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuXHRcdFx0c2VsZi50ZXh0ZWRpdEVsID0gdGFyZ2V0ID0galF1ZXJ5KGV2ZW50LnRhcmdldCk7XHJcblxyXG5cdFx0XHRWdnZlYi5XeXNpd3lnRWRpdG9yLmVkaXQoc2VsZi50ZXh0ZWRpdEVsKTtcclxuXHJcblx0XHRcdHNlbGYudGV4dGVkaXRFbC5hdHRyKHsgJ2NvbnRlbnRlZGl0YWJsZSc6IHRydWUsICdzcGVsbGNoZWNra2VyJzogZmFsc2UgfSk7XHJcblxyXG5cdFx0XHRzZWxmLnRleHRlZGl0RWwub24oXCJibHVyIGtleXVwIHBhc3RlIGlucHV0XCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuXHRcdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5jc3Moe1xyXG5cdFx0XHRcdFx0XCJ3aWR0aFwiOiBzZWxmLnRleHRlZGl0RWwub3V0ZXJXaWR0aCgpLFxyXG5cdFx0XHRcdFx0XCJoZWlnaHRcIjogc2VsZi50ZXh0ZWRpdEVsLm91dGVySGVpZ2h0KClcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5hZGRDbGFzcyhcInRleHQtZWRpdFwiKS5maW5kKFwiI3NlbGVjdC1hY3Rpb25zXCIpLmhpZGUoKTtcclxuXHRcdFx0alF1ZXJ5KFwiI2hpZ2hsaWdodC1ib3hcIikuaGlkZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdHRoaXMuZnJhbWVCb2R5Lm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudC50YXJnZXQpIHtcclxuXHRcdFx0XHRpZiAoIWlzUHJldmlldyAmJiAhJCgnI2F0dHJpYnV0ZS1zZXR0aW5ncycpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG5cdFx0XHRcdFx0JCgnI2F0dHJpYnV0ZS1zZXR0aW5ncycpXHJcblx0XHRcdFx0XHRcdC5hZGRDbGFzcygnYWN0aXZlJylcclxuXHRcdFx0XHRcdFx0LnNpYmxpbmdzKClcclxuXHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdCQoJyNsZWZ0LXBhbmVsJykuaGlkZSgpO1xyXG5cdFx0XHRcdFx0JCgnI3JpZ2h0LXBhbmVsJykuc2hvdygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzZWxmLnNlbGVjdE5vZGUoZXZlbnQudGFyZ2V0KTtcclxuXHRcdFx0XHRzZWxmLmxvYWROb2RlQ29tcG9uZW50KGV2ZW50LnRhcmdldCk7XHJcblxyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmZyYW1lQm9keS5rZXlkb3duKGUgPT4ge1xyXG5cdFx0XHRpZiAoc2VsZi5zZWxlY3RlZEVsICYmIHNlbGYuc2VsZWN0ZWRFbC5wcm9wKCd0YWdOYW1lJykgIT0gJ0JPRFknKSB7XHJcblx0XHRcdFx0aWYgKGUud2hpY2ggPT0gMzcgfHwgZS53aGljaCA9PSAzOCB8fCBlLndoaWNoID09IDM5IHx8IGUud2hpY2ggPT0gNDApIHtcclxuXHRcdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpZnJhbWVJZCcpLmNvbnRlbnRXaW5kb3cuYXJyb3dLZXlNb3ZlKGUud2hpY2gsIHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgdGhlIGRlZmF1bHQgYWN0aW9uIChzY3JvbGwgLyBtb3ZlIGNhcmV0KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNkcmFnLWJveFwiKS5vbihcIm1vdXNlZG93blwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cdFx0XHRzZWxmLmRyYWdFbGVtZW50ID0gc2VsZi5zZWxlY3RlZEVsO1xyXG5cdFx0XHRzZWxmLmlzRHJhZ2dpbmcgPSB0cnVlO1xyXG5cclxuXHRcdFx0bm9kZSA9IHNlbGYuZHJhZ0VsZW1lbnQuZ2V0KDApO1xyXG5cclxuXHJcblx0XHRcdHNlbGYuZHJhZ01vdmVNdXRhdGlvbiA9IHtcclxuXHRcdFx0XHR0eXBlOiAnbW92ZScsXHJcblx0XHRcdFx0dGFyZ2V0OiBub2RlLFxyXG5cdFx0XHRcdG9sZFBhcmVudDogbm9kZS5wYXJlbnROb2RlLFxyXG5cdFx0XHRcdG9sZE5leHRTaWJsaW5nOiBub2RlLm5leHRTaWJsaW5nXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQvL3NlbGYuc2VsZWN0Tm9kZShmYWxzZSk7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjZG93bi1ib3hcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cclxuXHRcdFx0bm9kZSA9IHNlbGYuc2VsZWN0ZWRFbC5nZXQoMCk7XHJcblx0XHRcdG9sZFBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0b2xkTmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0bmV4dCA9IHNlbGYuc2VsZWN0ZWRFbC5uZXh0KCk7XHJcblxyXG5cdFx0XHRpZiAobmV4dC5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0bmV4dC5hZnRlcihzZWxmLnNlbGVjdGVkRWwpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHNlbGYuc2VsZWN0ZWRFbC5wYXJlbnQoKS5hZnRlcihzZWxmLnNlbGVjdGVkRWwpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRuZXdQYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdG5ld05leHRTaWJsaW5nID0gbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdHR5cGU6ICdtb3ZlJyxcclxuXHRcdFx0XHR0YXJnZXQ6IG5vZGUsXHJcblx0XHRcdFx0b2xkUGFyZW50OiBvbGRQYXJlbnQsXHJcblx0XHRcdFx0bmV3UGFyZW50OiBuZXdQYXJlbnQsXHJcblx0XHRcdFx0b2xkTmV4dFNpYmxpbmc6IG9sZE5leHRTaWJsaW5nLFxyXG5cdFx0XHRcdG5ld05leHRTaWJsaW5nOiBuZXdOZXh0U2libGluZ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjdXAtYm94XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmhpZGUoKTtcclxuXHJcblx0XHRcdG5vZGUgPSBzZWxmLnNlbGVjdGVkRWwuZ2V0KDApO1xyXG5cdFx0XHRvbGRQYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdG9sZE5leHRTaWJsaW5nID0gbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRcdG5leHQgPSBzZWxmLnNlbGVjdGVkRWwucHJldigpO1xyXG5cclxuXHRcdFx0aWYgKG5leHQubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdG5leHQuYmVmb3JlKHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c2VsZi5zZWxlY3RlZEVsLnBhcmVudCgpLmJlZm9yZShzZWxmLnNlbGVjdGVkRWwpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRuZXdQYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdG5ld05leHRTaWJsaW5nID0gbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdHR5cGU6ICdtb3ZlJyxcclxuXHRcdFx0XHR0YXJnZXQ6IG5vZGUsXHJcblx0XHRcdFx0b2xkUGFyZW50OiBvbGRQYXJlbnQsXHJcblx0XHRcdFx0bmV3UGFyZW50OiBuZXdQYXJlbnQsXHJcblx0XHRcdFx0b2xkTmV4dFNpYmxpbmc6IG9sZE5leHRTaWJsaW5nLFxyXG5cdFx0XHRcdG5ld05leHRTaWJsaW5nOiBuZXdOZXh0U2libGluZ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjY2xvbmUtYm94XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGNsb25lID0gc2VsZi5zZWxlY3RlZEVsLmNsb25lKCk7XHJcblxyXG5cdFx0XHRzZWxmLnNlbGVjdGVkRWwuYWZ0ZXIoY2xvbmUpO1xyXG5cclxuXHRcdFx0c2VsZi5zZWxlY3RlZEVsID0gY2xvbmUuY2xpY2soKTtcclxuXHJcblx0XHRcdG5vZGUgPSBjbG9uZS5nZXQoMCk7XHJcblx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdHR5cGU6ICdjaGlsZExpc3QnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZS5wYXJlbnROb2RlLFxyXG5cdFx0XHRcdGFkZGVkTm9kZXM6IFtub2RlXSxcclxuXHRcdFx0XHRuZXh0U2libGluZzogbm9kZS5uZXh0U2libGluZ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjcGFyZW50LWJveFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuXHRcdFx0bm9kZSA9IHNlbGYuc2VsZWN0ZWRFbC5wYXJlbnQoKS5nZXQoMCk7XHJcblxyXG5cdFx0XHRzZWxmLnNlbGVjdE5vZGUobm9kZSk7XHJcblx0XHRcdHNlbGYubG9hZE5vZGVDb21wb25lbnQobm9kZSk7XHJcblxyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI2RlbGV0ZS1ib3hcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cclxuXHRcdFx0bm9kZSA9IHNlbGYuc2VsZWN0ZWRFbC5nZXQoMCk7XHJcblxyXG5cdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0XHR0eXBlOiAnY2hpbGRMaXN0JyxcclxuXHRcdFx0XHR0YXJnZXQ6IG5vZGUucGFyZW50Tm9kZSxcclxuXHRcdFx0XHRyZW1vdmVkTm9kZXM6IFtub2RlXSxcclxuXHRcdFx0XHRuZXh0U2libGluZzogbm9kZS5uZXh0U2libGluZ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHNlbGYuc2VsZWN0ZWRFbC5yZW1vdmUoKTtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGpRdWVyeSh3aW5kb3cuRnJhbWVXaW5kb3cpLm9uKFwic2Nyb2xsIHJlc2l6ZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcblx0XHRcdGlmIChzZWxmLnNlbGVjdGVkRWwpIHtcclxuXHRcdFx0XHRvZmZzZXQgPSBzZWxmLnNlbGVjdGVkRWwub2Zmc2V0KCk7XHJcblxyXG5cdFx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmNzcyhcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJ0b3BcIjogb2Zmc2V0LnRvcCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsVG9wKCksXHJcblx0XHRcdFx0XHRcdFwibGVmdFwiOiBvZmZzZXQubGVmdCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsTGVmdCgpLFxyXG5cdFx0XHRcdFx0XHRcIndpZHRoXCI6IHNlbGYuc2VsZWN0ZWRFbC5vdXRlcldpZHRoKCksXHJcblx0XHRcdFx0XHRcdFwiaGVpZ2h0XCI6IHNlbGYuc2VsZWN0ZWRFbC5vdXRlckhlaWdodCgpLFxyXG5cdFx0XHRcdFx0XHQvL1wiZGlzcGxheVwiOiBcImJsb2NrXCJcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHNlbGYuaGlnaGxpZ2h0RWwpIHtcclxuXHRcdFx0XHRvZmZzZXQgPSBzZWxmLmhpZ2hsaWdodEVsLm9mZnNldCgpO1xyXG5cclxuXHRcdFx0XHRqUXVlcnkoXCIjaGlnaGxpZ2h0LWJveFwiKS5jc3MoXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFwidG9wXCI6IG9mZnNldC50b3AgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbFRvcCgpLFxyXG5cdFx0XHRcdFx0XHRcImxlZnRcIjogb2Zmc2V0LmxlZnQgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbExlZnQoKSxcclxuXHRcdFx0XHRcdFx0XCJ3aWR0aFwiOiBzZWxmLmhpZ2hsaWdodEVsLm91dGVyV2lkdGgoKSxcclxuXHRcdFx0XHRcdFx0XCJoZWlnaHRcIjogc2VsZi5oaWdobGlnaHRFbC5vdXRlckhlaWdodCgpLFxyXG5cdFx0XHRcdFx0XHQvL1wiZGlzcGxheVwiOiBcImJsb2NrXCJcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0fSxcclxuXHJcblx0LyogZHJhZyBhbmQgZHJvcCAqL1xyXG5cdF9pbml0RHJhZ2Ryb3A6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRzZWxmLmlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHRcdGNvbXBvbmVudCA9IHt9O1xyXG5cdFx0JCgnI2NvbXBvbmVudHMgdWwgPiBsaSA+IG9sID4gbGknKS5vbihcIm1vdXNlZG93biB0b3VjaHN0YXJ0XCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHQkdGhpcyA9IGpRdWVyeSh0aGlzKTtcclxuXHJcblx0XHRcdC8vICQoXCIjY29tcG9uZW50LWNsb25lXCIpLnJlbW92ZSgpO1xyXG5cdFx0XHRjb21wb25lbnQgPSBWdnZlYi5Db21wb25lbnRzLmdldCgkdGhpcy5kYXRhKFwidHlwZVwiKSk7XHJcblxyXG5cdFx0XHRpZiAoY29tcG9uZW50LmRyYWdIdG1sKSB7XHJcblx0XHRcdFx0aHRtbCA9IGNvbXBvbmVudC5kcmFnSHRtbDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRodG1sID0gY29tcG9uZW50Lmh0bWw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQgPSAkKGh0bWwpO1xyXG5cclxuXHRcdFx0aWYgKGNvbXBvbmVudC5kcmFnU3RhcnQpIHNlbGYuZHJhZ0VsZW1lbnQgPSBjb21wb25lbnQuZHJhZ1N0YXJ0KHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cclxuXHRcdFx0c2VsZi5pc0RyYWdnaW5nID0gdHJ1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHQkKCdib2R5Jykub24oJ21vdXNldXAgdG91Y2hlbmQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0aWYgKHNlbGYuaXNEcmFnZ2luZyA9PSB0cnVlKSB7XHJcblx0XHRcdFx0c2VsZi5pc0RyYWdnaW5nID0gZmFsc2U7XHJcblx0XHRcdFx0Ly8gJChcIiNjb21wb25lbnQtY2xvbmVcIikucmVtb3ZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJ2JvZHknKS5vbignbW91c2Vtb3ZlIHRvdWNobW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRpZiAoc2VsZi5pc0RyYWdnaW5nID09IHRydWUpIHtcclxuXHRcdFx0XHRlbGVtZW50TW91c2VJc092ZXIgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFggLSA2MCwgZXZlbnQuY2xpZW50WSAtIDQwKTtcclxuXHRcdFx0XHQvL2lmIGRyYWcgZWxlbWVudHMgaG92ZXJzIG92ZXIgaWZyYW1lIHN3aXRjaCB0byBpZnJhbWUgbW91c2VvdmVyIGhhbmRsZXJcdFxyXG5cdFx0XHRcdGlmIChlbGVtZW50TW91c2VJc092ZXIgJiYgZWxlbWVudE1vdXNlSXNPdmVyLnRhZ05hbWUgPT0gJ0lGUkFNRScpIHtcclxuXHRcdFx0XHRcdHNlbGYuZnJhbWVCb2R5LnRyaWdnZXIoXCJtb3VzZW1vdmVcIiwgZXZlbnQpO1xyXG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0XHRzZWxmLnNlbGVjdE5vZGUoZmFsc2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnI2NvbXBvbmVudHMgdWwgPiBvbCA+IGxpID4gbGknKS5vbihcIm1vdXNldXAgdG91Y2hlbmRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdHNlbGYuaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cdFx0XHQvLyAkKFwiI2NvbXBvbmVudC1jbG9uZVwiKS5yZW1vdmUoKTtcclxuXHRcdH0pO1xyXG5cclxuXHR9LFxyXG5cclxuXHRnZXRCZWF1dGlmaWVkSHRtbCgpIHtcclxuXHRcdC8qXHJcblx0XHQtSSwgLS1pbmRlbnQtaW5uZXItaHRtbCAgICAgICAgICAgIEluZGVudCA8aGVhZD4gYW5kIDxib2R5PiBzZWN0aW9ucy4gRGVmYXVsdCBpcyBmYWxzZS5cclxuXHRcdC1VLCAtLXVuZm9ybWF0dGVkICAgICAgICAgICAgICAgICAgTGlzdCBvZiB0YWdzIChkZWZhdWx0cyB0byBpbmxpbmUpIHRoYXQgc2hvdWxkIG5vdCBiZSByZWZvcm1hdHRlZFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAgIHVzZSBlbXB0eSBhcnJheSB0byBkZW5vdGUgdGhhdCBubyB0YWdzIHNob3VsZCBub3QgYmUgcmVmb3JtYXR0ZWRcclxuXHRcdCAqL1xyXG5cclxuXHRcdGNvbnN0IHsgZG9jdHlwZSwgaHRtbCB9ID0gdGhpcy5nZXRIdG1sKCk7XHJcblx0XHRyZXR1cm4gaHRtbF9iZWF1dGlmeShgJHtkb2N0eXBlfVxyXG5cdFx0XHRcdFx0XHRcdCAgJHtyZW1vdmVVbnVzZWRUYWdzKGh0bWwsIHVudXNlZFRhZ3MpfWAsXHJcblx0XHRcdHtcclxuXHRcdFx0XHRwcmVzZXJ2ZV9uZXdsaW5lczogZmFsc2UsXHJcblx0XHRcdFx0aW5kZW50X2lubmVyX2h0bWw6IHRydWUsXHJcblx0XHRcdFx0dW5mb3JtYXR0ZWQ6IFtdXHJcblx0XHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdGdldEh0bWw6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGRvYyA9IHdpbmRvdy5GcmFtZURvY3VtZW50O1xyXG5cdFx0Y29uc3QgZG9jdHlwZSA9IFwiPCFET0NUWVBFIFwiXHJcblx0XHRcdCsgZG9jLmRvY3R5cGUubmFtZVxyXG5cdFx0XHQrIChkb2MuZG9jdHlwZS5wdWJsaWNJZCA/ICcgUFVCTElDIFwiJyArIGRvYy5kb2N0eXBlLnB1YmxpY0lkICsgJ1wiJyA6ICcnKVxyXG5cdFx0XHQrICghZG9jLmRvY3R5cGUucHVibGljSWQgJiYgZG9jLmRvY3R5cGUuc3lzdGVtSWQgPyAnIFNZU1RFTScgOiAnJylcclxuXHRcdFx0KyAoZG9jLmRvY3R5cGUuc3lzdGVtSWQgPyAnIFwiJyArIGRvYy5kb2N0eXBlLnN5c3RlbUlkICsgJ1wiJyA6ICcnKVxyXG5cdFx0XHQrIFwiPlxcblwiO1xyXG5cdFx0Y29uc3QgaHRtbCA9IGAke2RvY3R5cGV9XHJcblx0XHRcdFx0XHQgIDxodG1sPlxyXG5cdFx0XHRcdFx0XHQgICR7ZG9jLmRvY3VtZW50RWxlbWVudC5pbm5lckhUTUx9XHJcblx0XHRcdFx0XHQgIDwvaHRtbD5gO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZG9jdHlwZSxcclxuXHRcdFx0aHRtbFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHRzZXRIdG1sOiBmdW5jdGlvbiAoaHRtbCkge1xyXG5cdFx0Ly91cGRhdGUgb25seSBib2R5IHRvIGF2b2lkIGJyZWFraW5nIGlmcmFtZSBjc3MvanMgcmVsYXRpdmUgcGF0aHNcclxuXHRcdHN0YXJ0ID0gaHRtbC5pbmRleE9mKFwiPGJvZHlcIik7XHJcblx0XHRlbmQgPSBodG1sLmluZGV4T2YoXCI8L2JvZHlcIik7XHJcblxyXG5cdFx0aWYgKHN0YXJ0ID49IDAgJiYgZW5kID49IDApIHtcclxuXHRcdFx0Ym9keSA9IGh0bWwuc2xpY2UoaHRtbC5pbmRleE9mKFwiPlwiLCBzdGFydCkgKyAxLCBlbmQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ym9keSA9IGh0bWxcclxuXHRcdH1cclxuXHJcblx0XHQvL3NlbGYuZnJhbWVCb2R5Lmh0bWwoYm9keSk7XHJcblx0XHR3aW5kb3cuRnJhbWVEb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGJvZHk7XHJcblxyXG5cdFx0Ly9iZWxvdyBtZXRob2RzIGJyYWtlIGRvY3VtZW50IHJlbGF0aXZlIGNzcyBhbmQganMgcGF0aHNcclxuXHRcdC8vcmV0dXJuIHNlbGYuaWZyYW1lLm91dGVySFRNTCA9IGh0bWw7XHJcblx0XHQvL3JldHVybiBzZWxmLmRvY3VtZW50RnJhbWUuaHRtbChodG1sKTtcclxuXHRcdC8vcmV0dXJuIHNlbGYuZG9jdW1lbnRGcmFtZS5hdHRyKFwic3JjZG9jXCIsIGh0bWwpO1xyXG5cdH1cclxufTtcclxuXHJcblZ2dmViLkNvZGVFZGl0b3IgPSB7XHJcblxyXG5cdGlzQWN0aXZlOiBmYWxzZSxcclxuXHRvbGRWYWx1ZTogJycsXHJcblx0ZG9jOiBmYWxzZSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRvYykge1xyXG5cdFx0JChcIiN2dnZlYi1jb2RlLWVkaXRvciB0ZXh0YXJlYVwiKS52YWwoVnZ2ZWIuQnVpbGRlci5nZXRCZWF1dGlmaWVkSHRtbCgpKTtcclxuXHJcblx0XHQkKFwiI3Z2dmViLWNvZGUtZWRpdG9yIHRleHRhcmVhXCIpLmtleXVwKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0ZGVsYXkoVnZ2ZWIuQnVpbGRlci5zZXRIdG1sKHRoaXMudmFsdWUpLCAxMDAwKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vbG9hZCBjb2RlIG9uIGRvY3VtZW50IGNoYW5nZXNcclxuXHRcdFZ2dmViLkJ1aWxkZXIuZnJhbWVCb2R5Lm9uKFwidnZ2ZWIudW5kby5hZGQgdnZ2ZWIudW5kby5yZXN0b3JlXCIsIGZ1bmN0aW9uIChlKSB7IFZ2dmViLkNvZGVFZGl0b3Iuc2V0VmFsdWUoKTsgfSk7XHJcblx0XHQvL2xvYWQgY29kZSB3aGVuIGEgbmV3IHVybCBpcyBsb2FkZWRcclxuXHRcdFZ2dmViLkJ1aWxkZXIuZG9jdW1lbnRGcmFtZS5vbihcImxvYWRcIiwgZnVuY3Rpb24gKGUpIHsgVnZ2ZWIuQ29kZUVkaXRvci5zZXRWYWx1ZSgpOyB9KTtcclxuXHJcblx0XHR0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcclxuXHR9LFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRpZiAodGhpcy5pc0FjdGl2ZSkge1xyXG5cdFx0XHQkKFwiI3Z2dmViLWNvZGUtZWRpdG9yIHRleHRhcmVhXCIpLnZhbChWdnZlYi5CdWlsZGVyLmdldEJlYXV0aWZpZWRIdG1sKCkpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGRlc3Ryb3k6IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHQvL3RoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHR0b2dnbGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLmlzQWN0aXZlICE9IHRydWUpIHtcclxuXHRcdFx0dGhpcy5pc0FjdGl2ZSA9IHRydWU7XHJcblx0XHRcdHJldHVybiB0aGlzLmluaXQoKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHRcdHRoaXMuZGVzdHJveSgpO1xyXG5cdH1cclxufVxyXG5cclxubGV0IHNob3duUGFuZWwsIGhpZGRlblBhbmVsLCBpc1ByZXZpZXc7XHJcblxyXG5WdnZlYi5HdWkgPSB7XHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoXCJbZGF0YS12dnZlYi1hY3Rpb25dXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRvbiA9IFwiY2xpY2tcIjtcclxuXHRcdFx0aWYgKHRoaXMuZGF0YXNldC52dnZlYk9uKSBvbiA9IHRoaXMuZGF0YXNldC52dnZlYk9uO1xyXG5cclxuXHRcdFx0JCh0aGlzKS5vbihvbiwgVnZ2ZWIuR3VpW3RoaXMuZGF0YXNldC52dnZlYkFjdGlvbl0pO1xyXG5cdFx0XHRpZiAodGhpcy5kYXRhc2V0LnZ2dmViU2hvcnRjdXQpIHtcclxuXHRcdFx0XHQkKGRvY3VtZW50KS5iaW5kKCdrZXlkb3duJywgdGhpcy5kYXRhc2V0LnZ2dmViU2hvcnRjdXQsIFZ2dmViLkd1aVt0aGlzLmRhdGFzZXQudnZ2ZWJBY3Rpb25dKTtcclxuXHRcdFx0XHQkKHdpbmRvdy5GcmFtZURvY3VtZW50LCB3aW5kb3cuRnJhbWVXaW5kb3cpLmJpbmQoJ2tleWRvd24nLCB0aGlzLmRhdGFzZXQudnZ2ZWJTaG9ydGN1dCwgVnZ2ZWIuR3VpW3RoaXMuZGF0YXNldC52dnZlYkFjdGlvbl0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHR1bmRvOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoVnZ2ZWIuV3lzaXd5Z0VkaXRvci5pc0FjdGl2ZSkge1xyXG5cdFx0XHRWdnZlYi5XeXNpd3lnRWRpdG9yLnVuZG8oKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdFZ2dmViLlVuZG8udW5kbygpO1xyXG5cdFx0fVxyXG5cdFx0VnZ2ZWIuQnVpbGRlci5zZWxlY3ROb2RlKCk7XHJcblx0fSxcclxuXHJcblx0cmVkbzogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKFZ2dmViLld5c2l3eWdFZGl0b3IuaXNBY3RpdmUpIHtcclxuXHRcdFx0VnZ2ZWIuV3lzaXd5Z0VkaXRvci5yZWRvKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRWdnZlYi5VbmRvLnJlZG8oKTtcclxuXHRcdH1cclxuXHRcdFZ2dmViLkJ1aWxkZXIuc2VsZWN0Tm9kZSgpO1xyXG5cdH0sXHJcblxyXG5cdGNoZWNrOiBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKCcjdGV4dGFyZWEtbW9kYWwgdGV4dGFyZWEnKS52YWwoVnZ2ZWIuQnVpbGRlci5nZXRCZWF1dGlmaWVkSHRtbCgpKTtcclxuXHRcdCQoJyN0ZXh0YXJlYS1tb2RhbCcpLm1vZGFsKCk7XHJcblx0fSxcclxuXHJcblx0dmlld3BvcnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoXCIjY2FudmFzXCIpLmF0dHIoXCJjbGFzc1wiLCB0aGlzLmRhdGFzZXQudmlldyk7XHJcblx0fSxcclxuXHJcblx0dG9nZ2xlRWRpdG9yOiBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKFwiI3Z2dmViLWJ1aWxkZXJcIikudG9nZ2xlQ2xhc3MoXCJib3R0b20tcGFuZWwtZXhwYW5kXCIpO1xyXG5cdFx0VnZ2ZWIuQ29kZUVkaXRvci50b2dnbGUoKTtcclxuXHR9LFxyXG5cclxuXHRkb3dubG9hZCgpIHtcclxuXHRcdGRvd25sb2FkQXNUZXh0RmlsZSgnaW5kZXgnLCBWdnZlYi5CdWlsZGVyLmdldEJlYXV0aWZpZWRIdG1sKCkpO1xyXG5cdH0sXHJcblxyXG5cdHByZXZpZXc6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICgkKCcjbGVmdC1wYW5lbCcpLmlzKCc6dmlzaWJsZScpKSB7XHJcblx0XHRcdHNob3duUGFuZWwgPSAnbGVmdC1wYW5lbCc7XHJcblx0XHRcdGhpZGRlblBhbmVsID0gJ3JpZ2h0LXBhbmVsJztcclxuXHRcdFx0JCgnI2xlZnQtcGFuZWwsICNyaWdodC1wYW5lbCcpLmhpZGUoKTtcclxuXHRcdFx0aXNQcmV2aWV3ID0gdHJ1ZTtcclxuXHRcdH0gZWxzZSBpZiAoJCgnI3JpZ2h0LXBhbmVsJykuaXMoJzp2aXNpYmxlJykpIHtcclxuXHRcdFx0c2hvd25QYW5lbCA9ICdyaWdodC1wYW5lbCc7XHJcblx0XHRcdGhpZGRlblBhbmVsID0gJ2xlZnQtcGFuZWwnO1xyXG5cdFx0XHQkKCcjbGVmdC1wYW5lbCwgI3JpZ2h0LXBhbmVsJykuaGlkZSgpO1xyXG5cdFx0XHRpc1ByZXZpZXcgPSB0cnVlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aXNQcmV2aWV3ID0gZmFsc2U7XHJcblx0XHRcdCQoYCMke3Nob3duUGFuZWx9YCkuc2hvdygpO1xyXG5cdFx0XHQkKGAjJHtoaWRkZW5QYW5lbH1gKS5oaWRlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0JCgnI21lbnUtcGFuZWwnKS50b2dnbGUoKTtcclxuXHRcdCQoXCIjaWZyYW1lLWxheWVyXCIpLnRvZ2dsZSgpO1xyXG5cdFx0JChcIiN2dnZlYi1idWlsZGVyXCIpLnRvZ2dsZUNsYXNzKFwicHJldmlld1wiKTtcclxuXHR9LFxyXG5cclxuXHRmdWxsc2NyZWVuOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRsYXVuY2hGdWxsU2NyZWVuKGRvY3VtZW50KTsgLy8gdGhlIHdob2xlIHBhZ2VcclxuXHR9LFxyXG5cclxuXHRjb21wb25lbnRTZWFyY2g6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHNlYXJjaFRleHQgPSB0aGlzLnZhbHVlO1xyXG5cclxuXHRcdCQoXCIjY29tcG9uZW50cy1saXN0IGxpIG9sIGxpXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQkdGhpcyA9ICQodGhpcyk7XHJcblxyXG5cdFx0XHQkdGhpcy5oaWRlKCk7XHJcblx0XHRcdGlmICgkdGhpcy5kYXRhKFwic2VhcmNoXCIpLmluZGV4T2Yoc2VhcmNoVGV4dCkgPiAtMSkgJHRoaXMuc2hvdygpO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0Y2xlYXJDb21wb25lbnRTZWFyY2g6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoXCIjY29tcG9uZW50LXNlYXJjaFwiKS52YWwoXCJcIikua2V5dXAoKTtcclxuXHR9XHJcbn1cclxuXHJcblZ2dmViLkZpbGVNYW5hZ2VyID0ge1xyXG5cdHRyZWU6IGZhbHNlLFxyXG5cdHBhZ2VzOiB7fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy50cmVlID0gJChcIiNmaWxlbWFuYWdlciAudHJlZSA+IG9sXCIpLmh0bWwoXCJcIik7XHJcblxyXG5cdFx0JCh0aGlzLnRyZWUpLm9uKFwiY2xpY2tcIiwgXCJsaVtkYXRhLXBhZ2VdIHNwYW5cIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBgIyR7JCh0aGlzKS5wYXJlbnRzKCdsaScpLmRhdGEoJ3BhZ2UnKX1gO1xyXG5cdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcblx0XHRcdC8vIFZ2dmViLkZpbGVNYW5hZ2VyLmxvYWRQYWdlKCQodGhpcykucGFyZW50cyhcImxpXCIpLmRhdGEoXCJwYWdlXCIpKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSlcclxuXHR9LFxyXG5cclxuXHRnZXRQYWdlKG5hbWUpIHtcclxuXHRcdHJldHVybiB0aGlzLnBhZ2VzW25hbWVdO1xyXG5cdH0sXHJcblxyXG5cdGFkZFBhZ2U6IGZ1bmN0aW9uIChuYW1lLCB0aXRsZSwgdXJsKSB7XHJcblxyXG5cdFx0dGhpcy5wYWdlc1tuYW1lXSA9IHtcclxuXHRcdFx0bmFtZSxcclxuXHRcdFx0dGl0bGUsXHJcblx0XHRcdHVybFxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLnRyZWUuYXBwZW5kKFxyXG5cdFx0XHR0bXBsKFwidnZ2ZWItZmlsZW1hbmFnZXItcGFnZVwiLCB7IG5hbWUsIHRpdGxlLCB1cmwgfSkpO1xyXG5cdH0sXHJcblxyXG5cdGFkZFBhZ2VzOiBmdW5jdGlvbiAocGFnZXMpIHtcclxuXHRcdGZvciAocGFnZSBpbiBwYWdlcykge1xyXG5cdFx0XHR0aGlzLmFkZFBhZ2UocGFnZXNbcGFnZV1bJ25hbWUnXSwgcGFnZXNbcGFnZV1bJ3RpdGxlJ10sIHBhZ2VzW3BhZ2VdWyd1cmwnXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0YWRkQ29tcG9uZW50OiBmdW5jdGlvbiAobmFtZSwgdXJsLCB0aXRsZSwgcGFnZSkge1xyXG5cdFx0JChcIltkYXRhLXBhZ2U9J1wiICsgcGFnZSArIFwiJ10gPiBvbFwiLCB0aGlzLnRyZWUpLmFwcGVuZChcclxuXHRcdFx0dG1wbChcInZ2dmViLWZpbGVtYW5hZ2VyLWNvbXBvbmVudFwiLCB7IG5hbWUsIHVybCwgdGl0bGUgfSkpO1xyXG5cdH0sXHJcblxyXG5cdHNob3dBY3RpdmUobmFtZSkge1xyXG5cdFx0JChcIltkYXRhLXBhZ2VdXCIsIHRoaXMudHJlZSkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHQkKFwiW2RhdGEtcGFnZT0nXCIgKyBuYW1lICsgXCInXVwiLCB0aGlzLnRyZWUpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdH0sXHJcblxyXG5cdGxvYWRQYWdlOiBmdW5jdGlvbiAobmFtZSkge1xyXG5cdFx0JChcIltkYXRhLXBhZ2VdXCIsIHRoaXMudHJlZSkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHQkKFwiW2RhdGEtcGFnZT0nXCIgKyBuYW1lICsgXCInXVwiLCB0aGlzLnRyZWUpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cclxuXHRcdFZ2dmViLkJ1aWxkZXIubG9hZFVybCh0aGlzLnBhZ2VzW25hbWVdWyd1cmwnXSk7XHJcblx0fSxcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ2dmViOyIsImNvbnN0IGFsd2F5c1RydWUgPSAoKSA9PiB0cnVlO1xyXG5cclxuLy8gdGhpcyByZWZlcnMgdG8gaHRtbCBlbGVtZW50XHJcbmZ1bmN0aW9uIHJlbW92ZVRhZyh7IG5hbWUsIGZpbHRlciA9IGFsd2F5c1RydWUgfSkge1xyXG4gICAgQXJyYXkuZnJvbSh0aGlzLmdldEVsZW1lbnRzQnlUYWdOYW1lKG5hbWUpKVxyXG4gICAgICAgIC5maWx0ZXIoZmlsdGVyKVxyXG4gICAgICAgIC5mb3JFYWNoKHRhZyA9PiB0YWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0YWcpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlVW51c2VkVGFncyhodG1sLCB0YWdzKSB7XHJcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2h0bWwnKTtcclxuICAgIGVsLmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICB0YWdzLmZvckVhY2gocmVtb3ZlVGFnLCBlbCk7XHJcblxyXG4gICAgcmV0dXJuICQoZWwpLnByb3AoJ291dGVySFRNTCcpO1xyXG59XHJcblxyXG5leHBvcnQgeyByZW1vdmVVbnVzZWRUYWdzIH07IiwiLy8gVG9nZ2xlIGZ1bGxzY3JlZW5cclxuZnVuY3Rpb24gbGF1bmNoRnVsbFNjcmVlbihkb2N1bWVudCkge1xyXG4gICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbFNjcmVlbikge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQuRnVsbFNjcmVlbkVsZW1lbnQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmV4aXRGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICAvL21vemlsbGFcdFx0XHJcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQubW96RnVsbFNjcmVlbkVsZW1lbnQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgIC8vd2Via2l0XHQgIFxyXG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50KVxyXG4gICAgICAgICAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgLy9pZVx0ICBcclxuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50Lm1zRnVsbFNjcmVlbkVsZW1lbnQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IGxhdW5jaEZ1bGxTY3JlZW4gfTsiLCJmdW5jdGlvbiBkb3dubG9hZEFzVGV4dEZpbGUoZmlsZW5hbWUsIHRleHQpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaHJlZicsIGBkYXRhOnRleHQvaHRtbDtjaGFyc2V0PXV0Zi04LCR7ZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpfWApO1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgZmlsZW5hbWUpO1xyXG5cclxuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcblxyXG4gICAgZWxlbWVudC5jbGljaygpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGRvd25sb2FkQXNUZXh0RmlsZSB9OyIsIi8qXHJcbkNvcHlyaWdodCAyMDE3IFppYWRpbiBHaXZhblxyXG5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHJcbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG5cclxuaHR0cHM6Ly9naXRodWIuY29tL2dpdmFuei9WdnZlYkpzXHJcbiovXHJcbmltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcbmltcG9ydCBDaGVja2JveElucHV0IGZyb20gJy4vQ2hlY2tib3hJbnB1dCc7XHJcbmltcG9ydCBTZWxlY3RJbnB1dCBmcm9tICcuL1NlbGVjdElucHV0JztcclxuaW1wb3J0IExpbmtJbnB1dCBmcm9tICcuL0xpbmtJbnB1dCc7XHJcbmltcG9ydCBSYW5nZUlucHV0IGZyb20gJy4vUmFuZ2VJbnB1dCc7XHJcbmltcG9ydCBOdW1iZXJJbnB1dCBmcm9tICcuL051bWJlcklucHV0JztcclxuaW1wb3J0IENzc1VuaXRJbnB1dCBmcm9tICcuL0Nzc1VuaXRJbnB1dCc7XHJcbmltcG9ydCBDb2xvcklucHV0IGZyb20gJy4vQ29sb3JJbnB1dCc7XHJcbmltcG9ydCBGaWxlVXBsb2FkSW5wdXQgZnJvbSAnLi9GaWxlVXBsb2FkSW5wdXQnO1xyXG5pbXBvcnQgUmFkaW9JbnB1dCBmcm9tICcuL1JhZGlvSW5wdXQnO1xyXG5pbXBvcnQgUmFkaW9CdXR0b25JbnB1dCBmcm9tICcuL1JhZGlvQnV0dG9uSW5wdXQnO1xyXG5pbXBvcnQgVG9nZ2xlSW5wdXQgZnJvbSAnLi9Ub2dnbGVJbnB1dCc7XHJcbmltcG9ydCBWYWx1ZVRleHRJbnB1dCBmcm9tICcuL1ZhbHVlVGV4dElucHV0JztcclxuaW1wb3J0IEdyaWRMYXlvdXRJbnB1dCBmcm9tICcuL0dyaWRMYXlvdXRJbnB1dCc7XHJcbmltcG9ydCBQcm9kdWN0c0lucHV0IGZyb20gJy4vUHJvZHVjdHNJbnB1dCc7XHJcbmltcG9ydCBHcmlkSW5wdXQgZnJvbSAnLi9HcmlkSW5wdXQnO1xyXG5pbXBvcnQgVGV4dFZhbHVlSW5wdXQgZnJvbSAnLi9UZXh0VmFsdWVJbnB1dCc7XHJcbmltcG9ydCBCdXR0b25JbnB1dCBmcm9tICcuL0J1dHRvbklucHV0JztcclxuaW1wb3J0IFNlY3Rpb25JbnB1dCBmcm9tICcuL1NlY3Rpb25JbnB1dCc7XHJcbmltcG9ydCBMaXN0SW5wdXQgZnJvbSAnLi9MaXN0SW5wdXQnO1xyXG5cclxuZXhwb3J0IHtcclxuXHRJbnB1dCwgVGV4dElucHV0LCBDaGVja2JveElucHV0LCBTZWxlY3RJbnB1dCwgTGlua0lucHV0LCBSYW5nZUlucHV0LCBOdW1iZXJJbnB1dCwgQ3NzVW5pdElucHV0LFxyXG5cdFJhZGlvSW5wdXQsIFJhZGlvQnV0dG9uSW5wdXQsIFRvZ2dsZUlucHV0LCBWYWx1ZVRleHRJbnB1dCwgR3JpZExheW91dElucHV0LCBQcm9kdWN0c0lucHV0LCBHcmlkSW5wdXQsXHJcblx0VGV4dFZhbHVlSW5wdXQsIEJ1dHRvbklucHV0LCBTZWN0aW9uSW5wdXQsIExpc3RJbnB1dCwgQ29sb3JJbnB1dCwgRmlsZVVwbG9hZElucHV0XHJcbn07IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBWYWx1ZVRleHRJbnB1dCA9ICQuZXh0ZW5kKHt9LCBUZXh0SW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWYWx1ZVRleHRJbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuXHJcbmNvbnN0IFRvZ2dsZUlucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRvbkNoYW5nZTogZnVuY3Rpb24gKGV2ZW50LCBub2RlKSB7XHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpIHtcclxuXHRcdFx0ZXZlbnQuZGF0YS5lbGVtZW50LnRyaWdnZXIoJ3Byb3BlcnR5Q2hhbmdlJywgW3RoaXMuY2hlY2tlZCA/IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZS1vblwiKSA6IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZS1vZmZcIiksIHRoaXNdKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRvZ2dsZVwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb2dnbGVJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBUZXh0VmFsdWVJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdFx0W1wiY2xpY2tcIiwgXCJvbkNoYW5nZVwiLCBcImJ1dHRvblwiIC8qJ3NlbGVjdCcqL10sXHJcblx0XSxcclxuXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0dmFsdWVcIiwgZGF0YSk7XHJcblx0fSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRleHRWYWx1ZUlucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFNlbGVjdElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG4gICAgZXZlbnRzOiBbXHJcbiAgICAgICAgW1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJzZWxlY3RcIl0sXHJcbiAgICBdLFxyXG5cclxuXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgJCgnc2VsZWN0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcihcInNlbGVjdFwiLCBkYXRhKTtcclxuICAgIH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBTZWN0aW9uSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjbGlja1wiLCBcIm9uQ2hhbmdlXCIsIFwiYnV0dG9uXCIgLyonc2VsZWN0JyovXSxcclxuXHRdLFxyXG5cclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJzZWN0aW9uaW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlY3Rpb25JbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBSYW5nZUlucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwicmFuZ2VpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYW5nZUlucHV0OyIsImltcG9ydCBSYWRpb0lucHV0IGZyb20gJy4vUmFkaW9JbnB1dCc7XHJcblxyXG5jb25zdCBSYWRpb0J1dHRvbklucHV0ID0gJC5leHRlbmQoe30sIFJhZGlvSW5wdXQsIHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcihcInJhZGlvYnV0dG9uaW5wdXRcIiwgZGF0YSk7XHJcbiAgICB9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYWRpb0J1dHRvbklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFJhZGlvSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0b25DaGFuZ2U6IGZ1bmN0aW9uIChldmVudCwgbm9kZSkge1xyXG5cclxuXHRcdGlmIChldmVudC5kYXRhICYmIGV2ZW50LmRhdGEuZWxlbWVudCkge1xyXG5cdFx0XHRldmVudC5kYXRhLmVsZW1lbnQudHJpZ2dlcigncHJvcGVydHlDaGFuZ2UnLCBbdGhpcy52YWx1ZSwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkucmVtb3ZlQXR0cignY2hlY2tlZCcpO1xyXG5cdFx0aWYgKHZhbHVlKVxyXG5cdFx0XHQkKFwiaW5wdXRbdmFsdWU9XCIgKyB2YWx1ZSArIFwiXVwiLCB0aGlzLmVsZW1lbnQpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwicmFkaW9pbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYWRpb0lucHV0OyIsImltcG9ydCBUZXh0SW5wdXQgZnJvbSAnLi9UZXh0SW5wdXQnO1xyXG5cclxuY29uc3QgUHJvZHVjdHNJbnB1dCA9ICQuZXh0ZW5kKHt9LCBUZXh0SW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm9kdWN0c0lucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbnZhciBOdW1iZXJJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcIm51bWJlcmlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE51bWJlcklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IExpc3RJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwic2VsZWN0XCJdLFxyXG5cdF0sXHJcblxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdzZWxlY3QnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImxpc3RpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdElucHV0OyIsImltcG9ydCBUZXh0SW5wdXQgZnJvbSAnLi9UZXh0SW5wdXQnO1xyXG5cclxuY29uc3QgTGlua0lucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaW5rSW5wdXQ7IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBHcmlkTGF5b3V0SW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR3JpZExheW91dElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IEdyaWRJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJzZWxlY3RcIiAvKidzZWxlY3QnKi9dLFxyXG5cdFx0W1wiY2xpY2tcIiwgXCJvbkNoYW5nZVwiLCBcImJ1dHRvblwiIC8qJ3NlbGVjdCcqL10sXHJcblx0XSxcclxuXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ3NlbGVjdCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwiZ3JpZFwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR3JpZElucHV0OyIsImltcG9ydCBUZXh0SW5wdXQgZnJvbSAnLi9UZXh0SW5wdXQnO1xyXG5cclxuY29uc3QgRmlsZVVwbG9hZElucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImtleXVwXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpbGVVcGxvYWRJbnB1dDtcclxuIiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgVGV4dElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG4gICAgZXZlbnRzOiBbXHJcbiAgICAgICAgW1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdCBdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblx0XHJcblx0aW5pdDogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbiAgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGV4dElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IENzc1VuaXRJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRudW1iZXI6IDAsXHJcblx0dW5pdDogXCJweFwiLFxyXG5cclxuXHRvbkNoYW5nZTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0aWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS5lbGVtZW50KSB7XHJcblx0XHRcdGlucHV0ID0gZXZlbnQuZGF0YS5pbnB1dDtcclxuXHRcdFx0aW5wdXRbdGhpcy5uYW1lXSA9IHRoaXMudmFsdWU7Ly8gdGhpcy5uYW1lID0gdW5pdCBvciBudW1iZXJcdFxyXG5cclxuXHRcdFx0dmFsdWUgPSBcIlwiO1xyXG5cdFx0XHRpZiAoaW5wdXQudW5pdCA9PSBcImF1dG9cIikge1xyXG5cdFx0XHRcdCQoZXZlbnQuZGF0YS5lbGVtZW50KS5hZGRDbGFzcyhcImF1dG9cIik7XHJcblx0XHRcdFx0dmFsdWUgPSBpbnB1dC51bml0O1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdCQoZXZlbnQuZGF0YS5lbGVtZW50KS5yZW1vdmVDbGFzcyhcImF1dG9cIik7XHJcblx0XHRcdFx0dmFsdWUgPSBpbnB1dC5udW1iZXIgKyBpbnB1dC51bml0O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRldmVudC5kYXRhLmVsZW1lbnQudHJpZ2dlcigncHJvcGVydHlDaGFuZ2UnLCBbdmFsdWUsIHRoaXNdKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwic2VsZWN0XCJdLFxyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHR0aGlzLm51bWJlciA9IHBhcnNlSW50KHZhbHVlKTtcclxuXHRcdHRoaXMudW5pdCA9IHZhbHVlLnJlcGxhY2UodGhpcy5udW1iZXIsICcnKTtcclxuXHJcblx0XHRpZiAodGhpcy51bml0ID09IFwiYXV0b1wiKSAkKHRoaXMuZWxlbWVudCkuYWRkQ2xhc3MoXCJhdXRvXCIpO1xyXG5cclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodGhpcy5udW1iZXIpO1xyXG5cdFx0JCgnc2VsZWN0JywgdGhpcy5lbGVtZW50KS52YWwodGhpcy51bml0KTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwiY3NzdW5pdGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENzc1VuaXRJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBDb2xvcklucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdC8vaHRtbDUgY29sb3IgaW5wdXQgb25seSBzdXBwb3J0cyBzZXR0aW5nIHZhbHVlcyBhcyBoZXggY29sb3JzIGV2ZW4gaWYgdGhlIHBpY2tlciByZXR1cm5zIG9ubHkgcmdiXHJcblx0cmdiMmhleDogZnVuY3Rpb24gKHJnYikge1xyXG5cclxuXHRcdHJnYiA9IHJnYi5tYXRjaCgvXnJnYmE/W1xccytdP1xcKFtcXHMrXT8oXFxkKylbXFxzK10/LFtcXHMrXT8oXFxkKylbXFxzK10/LFtcXHMrXT8oXFxkKylbXFxzK10/L2kpO1xyXG5cclxuXHRcdHJldHVybiAocmdiICYmIHJnYi5sZW5ndGggPT09IDQpID8gXCIjXCIgK1xyXG5cdFx0XHQoXCIwXCIgKyBwYXJzZUludChyZ2JbMV0sIDEwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKSArXHJcblx0XHRcdChcIjBcIiArIHBhcnNlSW50KHJnYlsyXSwgMTApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpICtcclxuXHRcdFx0KFwiMFwiICsgcGFyc2VJbnQocmdiWzNdLCAxMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMikgOiByZ2I7XHJcblx0fSxcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodGhpcy5yZ2IyaGV4KHZhbHVlKSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImNvbG9yaW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29sb3JJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBDaGVja2JveElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbihldmVudCwgbm9kZSkge1xyXG5cdFx0XHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpXHJcblx0XHR7XHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt0aGlzLmNoZWNrZWQsIHRoaXNdKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuICAgIGV2ZW50czogW1xyXG4gICAgICAgIFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0IF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHRcclxuXHRpbml0OiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJjaGVja2JveGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbiAgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tib3hJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBCdXR0b25JbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNsaWNrXCIsIFwib25DaGFuZ2VcIiwgXCJidXR0b25cIiAvKidzZWxlY3QnKi9dLFxyXG5cdF0sXHJcblxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdidXR0b24nLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImJ1dHRvblwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uSW5wdXQ7IiwiY29uc3QgSW5wdXQgPSB7XHJcblx0XHJcblx0aW5pdDogZnVuY3Rpb24obmFtZSkge1xyXG5cdH0sXHJcblxyXG5cclxuXHRvbkNoYW5nZTogZnVuY3Rpb24oZXZlbnQsIG5vZGUpIHtcclxuXHRcdFxyXG5cdFx0aWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS5lbGVtZW50KVxyXG5cdFx0e1xyXG5cdFx0XHRldmVudC5kYXRhLmVsZW1lbnQudHJpZ2dlcigncHJvcGVydHlDaGFuZ2UnLCBbdGhpcy52YWx1ZSwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHJlbmRlclRlbXBsYXRlOiBmdW5jdGlvbihuYW1lLCBkYXRhKSB7XHJcblx0XHRyZXR1cm4gdG1wbChcInZ2dmViLWlucHV0LVwiICsgbmFtZSwgZGF0YSk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbihuYW1lLCBkYXRhKSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKHRoaXMucmVuZGVyVGVtcGxhdGUobmFtZSwgZGF0YSkpO1xyXG5cdFx0XHJcblx0XHQvL2JpbmQgZXZlbnRzXHJcblx0XHRpZiAodGhpcy5ldmVudHMpXHJcblx0XHRmb3IgKHZhciBpIGluIHRoaXMuZXZlbnRzKVxyXG5cdFx0e1xyXG5cdFx0XHRldmVudCA9IHRoaXMuZXZlbnRzW2ldWzBdO1xyXG5cdFx0XHRmdW4gPSB0aGlzWyB0aGlzLmV2ZW50c1tpXVsxXSBdO1xyXG5cdFx0XHRlbCA9IHRoaXMuZXZlbnRzW2ldWzJdO1xyXG5cdFx0XHJcblx0XHRcdHRoaXMuZWxlbWVudC5vbihldmVudCwgZWwsIHtlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGlucHV0OnRoaXN9LCBmdW4pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLmVsZW1lbnQ7XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5wdXQ7IiwiY29uc3QgYmdjb2xvckNsYXNzZXMgPSBbXCJiZy1wcmltYXJ5XCIsIFwiYmctc2Vjb25kYXJ5XCIsIFwiYmctc3VjY2Vzc1wiLCBcImJnLWRhbmdlclwiLCBcImJnLXdhcm5pbmdcIiwgXCJiZy1pbmZvXCIsIFwiYmctbGlnaHRcIiwgXCJiZy1kYXJrXCIsIFwiYmctd2hpdGVcIl07XHJcblxyXG5jb25zdCBiZ2NvbG9yU2VsZWN0T3B0aW9ucyA9XHJcbiAgICBbe1xyXG4gICAgICAgIHZhbHVlOiBcIkRlZmF1bHRcIixcclxuICAgICAgICB0ZXh0OiBcIlwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLXByaW1hcnlcIixcclxuICAgICAgICB0ZXh0OiBcIlByaW1hcnlcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLXNlY29uZGFyeVwiLFxyXG4gICAgICAgIHRleHQ6IFwiU2Vjb25kYXJ5XCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1zdWNjZXNzXCIsXHJcbiAgICAgICAgdGV4dDogXCJTdWNjZXNzXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1kYW5nZXJcIixcclxuICAgICAgICB0ZXh0OiBcIkRhbmdlclwiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctd2FybmluZ1wiLFxyXG4gICAgICAgIHRleHQ6IFwiV2FybmluZ1wiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctaW5mb1wiLFxyXG4gICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctbGlnaHRcIixcclxuICAgICAgICB0ZXh0OiBcIkxpZ2h0XCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1kYXJrXCIsXHJcbiAgICAgICAgdGV4dDogXCJEYXJrXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy13aGl0ZVwiLFxyXG4gICAgICAgIHRleHQ6IFwiV2hpdGVcIlxyXG4gICAgfV07XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VOb2RlTmFtZShub2RlLCBuZXdOb2RlTmFtZSkge1xyXG4gICAgdmFyIG5ld05vZGU7XHJcbiAgICBuZXdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuZXdOb2RlTmFtZSk7XHJcbiAgICBhdHRyaWJ1dGVzID0gbm9kZS5nZXQoMCkuYXR0cmlidXRlcztcclxuXHJcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBhdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgbmV3Tm9kZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlc1tpXS5ub2RlTmFtZSwgYXR0cmlidXRlc1tpXS5ub2RlVmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgICQobmV3Tm9kZSkuYXBwZW5kKCQobm9kZSkuY29udGVudHMoKSk7XHJcbiAgICAkKG5vZGUpLnJlcGxhY2VXaXRoKG5ld05vZGUpO1xyXG5cclxuICAgIHJldHVybiBuZXdOb2RlO1xyXG59XHJcblxyXG5sZXQgYmFzZV9zb3J0ID0gMTAwOy8vc3RhcnQgc29ydGluZyBmb3IgYmFzZSBjb21wb25lbnQgZnJvbSAxMDAgdG8gYWxsb3cgZXh0ZW5kZWQgcHJvcGVydGllcyB0byBiZSBmaXJzdFxyXG5mdW5jdGlvbiBpbmNfYmFzZV9zb3J0KCkge1xyXG4gICAgcmV0dXJuIGJhc2Vfc29ydCsrO1xyXG59XHJcblxyXG5jb25zdCBkYXRhQ29tcG9uZW50SWQgPSAnZGF0YS1jb21wb25lbnQtaWQnO1xyXG5jb25zdCBkYXRhVGFibGVJZCA9ICdkYXRhLXRhYmxlLWlkJztcclxuXHJcbmV4cG9ydCB7IGJnY29sb3JDbGFzc2VzLCBiZ2NvbG9yU2VsZWN0T3B0aW9ucywgY2hhbmdlTm9kZU5hbWUsIGluY19iYXNlX3NvcnQsIGRhdGFDb21wb25lbnRJZCwgZGF0YVRhYmxlSWQgfTtcclxuIl19
