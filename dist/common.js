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
})(); /*
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
      
      https://github.com/givan/VvvebJs
      */

// Simple JavaScript Templating
// John Resig - https://johnresig.com/ - MIT Licensed


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

exports.bgcolorClasses = bgcolorClasses;
exports.bgcolorSelectOptions = bgcolorSelectOptions;
exports.changeNodeName = changeNodeName;
exports.inc_base_sort = inc_base_sort;
exports.dataComponentId = dataComponentId;

},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGRlci5qcyIsInNyYy91dGlsL2pzb3VwLmpzIiwic3JjL3V0aWwvZnVsbFNjcmVlbi5qcyIsInNyYy91dGlsL2Rvd25sb2FkLmpzIiwic3JjL2lucHV0cy9pbnB1dHMuanMiLCJzcmMvaW5wdXRzL1ZhbHVlVGV4dElucHV0LmpzIiwic3JjL2lucHV0cy9Ub2dnbGVJbnB1dC5qcyIsInNyYy9pbnB1dHMvVGV4dFZhbHVlSW5wdXQuanMiLCJzcmMvaW5wdXRzL1NlbGVjdElucHV0LmpzIiwic3JjL2lucHV0cy9TZWN0aW9uSW5wdXQuanMiLCJzcmMvaW5wdXRzL1JhbmdlSW5wdXQuanMiLCJzcmMvaW5wdXRzL1JhZGlvQnV0dG9uSW5wdXQuanMiLCJzcmMvaW5wdXRzL1JhZGlvSW5wdXQuanMiLCJzcmMvaW5wdXRzL1Byb2R1Y3RzSW5wdXQuanMiLCJzcmMvaW5wdXRzL051bWJlcklucHV0LmpzIiwic3JjL2lucHV0cy9MaXN0SW5wdXQuanMiLCJzcmMvaW5wdXRzL0xpbmtJbnB1dC5qcyIsInNyYy9pbnB1dHMvR3JpZExheW91dElucHV0LmpzIiwic3JjL2lucHV0cy9HcmlkSW5wdXQuanMiLCJzcmMvaW5wdXRzL0ZpbGVVcGxvYWRJbnB1dC5qcyIsInNyYy9pbnB1dHMvVGV4dElucHV0LmpzIiwic3JjL2lucHV0cy9Dc3NVbml0SW5wdXQuanMiLCJzcmMvaW5wdXRzL0NvbG9ySW5wdXQuanMiLCJzcmMvaW5wdXRzL0NoZWNrYm94SW5wdXQuanMiLCJzcmMvaW5wdXRzL0J1dHRvbklucHV0LmpzIiwic3JjL2lucHV0cy9JbnB1dC5qcyIsInNyYy9jb21wb25lbnRzL2NvbW1vbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNxQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUEsQ0FBQyxZQUFZO0FBQ1osS0FBSSxRQUFRLEVBQVo7O0FBRUEs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RSxJQUFGLEVBQVEsUUFBUixFQUFsQjtBQUNBLE1BQUUsSUFBRixFQUFRLFdBQVIsQ0FBb0IsT0FBcEI7O0FBRUEsV0FBTyxPQUFQO0FBQ0g7O0FBRUQsSUFBSSxZQUFZLEdBQWhCLEMsQ0FBb0I7QUFDcEIsU0FBUyxhQUFULEdBQXlCO0FBQ3JCLFdBQU8sV0FBUDtBQUNIOztBQUVELElBQU0sa0JBQWtCLG1CQUF4Qjs7UUFFUyxjLEdBQUEsYztRQUFnQixvQixHQUFBLG9CO1FBQXNCLGMsR0FBQSxjO1FBQWdCLGEsR0FBQSxhO1FBQWUsZSxHQUFBLGUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKlxyXG5Db3B5cmlnaHQgMjAxNyBaaWFkaW4gR2l2YW5cclxuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblxyXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuXHJcbmh0dHBzOi8vZ2l0aHViLmNvbS9naXZhbi9WdnZlYkpzXHJcbiovXHJcblxyXG5cclxuLy8gU2ltcGxlIEphdmFTY3JpcHQgVGVtcGxhdGluZ1xyXG4vLyBKb2huIFJlc2lnIC0gaHR0cHM6Ly9qb2hucmVzaWcuY29tLyAtIE1JVCBMaWNlbnNlZFxyXG5pbXBvcnQgeyBTZWN0aW9uSW5wdXQgfSBmcm9tICcuL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyByZW1vdmVVbnVzZWRUYWdzIH0gZnJvbSAnLi91dGlsL2pzb3VwJztcclxuaW1wb3J0IHsgZG93bmxvYWRBc1RleHRGaWxlIH0gZnJvbSAnLi91dGlsL2Rvd25sb2FkJztcclxuaW1wb3J0IHsgbGF1bmNoRnVsbFNjcmVlbiB9IGZyb20gJy4vdXRpbC9mdWxsU2NyZWVuJztcclxuaW1wb3J0IHsgZGF0YUNvbXBvbmVudElkIH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbW1vbidcclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGNhY2hlID0ge307XHJcblxyXG5cdHRoaXMudG1wbCA9IGZ1bmN0aW9uIHRtcGwoc3RyLCBkYXRhKSB7XHJcblx0XHQvLyBGaWd1cmUgb3V0IGlmIHdlJ3JlIGdldHRpbmcgYSB0ZW1wbGF0ZSwgb3IgaWYgd2UgbmVlZCB0b1xyXG5cdFx0Ly8gbG9hZCB0aGUgdGVtcGxhdGUgLSBhbmQgYmUgc3VyZSB0byBjYWNoZSB0aGUgcmVzdWx0LlxyXG5cdFx0dmFyIGZuID0gL15bLWEtekEtWjAtOV0rJC8udGVzdChzdHIpID9cclxuXHRcdFx0Y2FjaGVbc3RyXSA9IGNhY2hlW3N0cl0gfHxcclxuXHRcdFx0dG1wbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzdHIpLmlubmVySFRNTCkgOlxyXG5cclxuXHRcdFx0Ly8gR2VuZXJhdGUgYSByZXVzYWJsZSBmdW5jdGlvbiB0aGF0IHdpbGwgc2VydmUgYXMgYSB0ZW1wbGF0ZVxyXG5cdFx0XHQvLyBnZW5lcmF0b3IgKGFuZCB3aGljaCB3aWxsIGJlIGNhY2hlZCkuXHJcblx0XHRcdG5ldyBGdW5jdGlvbihcIm9ialwiLFxyXG5cdFx0XHRcdFwidmFyIHA9W10scHJpbnQ9ZnVuY3Rpb24oKXtwLnB1c2guYXBwbHkocCxhcmd1bWVudHMpO307XCIgK1xyXG5cclxuXHRcdFx0XHQvLyBJbnRyb2R1Y2UgdGhlIGRhdGEgYXMgbG9jYWwgdmFyaWFibGVzIHVzaW5nIHdpdGgoKXt9XHJcblx0XHRcdFx0XCJ3aXRoKG9iail7cC5wdXNoKCdcIiArXHJcblxyXG5cdFx0XHRcdC8vIENvbnZlcnQgdGhlIHRlbXBsYXRlIGludG8gcHVyZSBKYXZhU2NyaXB0XHJcblx0XHRcdFx0c3RyXHJcblx0XHRcdFx0XHQucmVwbGFjZSgvW1xcclxcdFxcbl0vZywgXCIgXCIpXHJcblx0XHRcdFx0XHQuc3BsaXQoXCJ7JVwiKS5qb2luKFwiXFx0XCIpXHJcblx0XHRcdFx0XHQucmVwbGFjZSgvKChefCV9KVteXFx0XSopJy9nLCBcIiQxXFxyXCIpXHJcblx0XHRcdFx0XHQucmVwbGFjZSgvXFx0PSguKj8pJX0vZywgXCInLCQxLCdcIilcclxuXHRcdFx0XHRcdC5zcGxpdChcIlxcdFwiKS5qb2luKFwiJyk7XCIpXHJcblx0XHRcdFx0XHQuc3BsaXQoXCIlfVwiKS5qb2luKFwicC5wdXNoKCdcIilcclxuXHRcdFx0XHRcdC5zcGxpdChcIlxcclwiKS5qb2luKFwiXFxcXCdcIilcclxuXHRcdFx0XHQrIFwiJyk7fXJldHVybiBwLmpvaW4oJycpO1wiKTtcclxuXHRcdC8vIFByb3ZpZGUgc29tZSBiYXNpYyBjdXJyeWluZyB0byB0aGUgdXNlclxyXG5cdFx0cmV0dXJuIGRhdGEgPyBmbihkYXRhKSA6IGZuO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG52YXIgZGVsYXkgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB0aW1lciA9IDA7XHJcblx0cmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjaywgbXMpIHtcclxuXHRcdGNsZWFyVGltZW91dCh0aW1lcik7XHJcblx0XHR0aW1lciA9IHNldFRpbWVvdXQoY2FsbGJhY2ssIG1zKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuY29uc3QgdW51c2VkVGFncyA9IFtcclxuXHQvLyB7XHJcblx0Ly8gXHRuYW1lOiAnc2NyaXB0J1xyXG5cdC8vIH0sXHJcblx0e1xyXG5cdFx0bmFtZTogJ2xpbmsnLFxyXG5cdFx0ZmlsdGVyOiB0YWcgPT4gdGFnLmdldEF0dHJpYnV0ZSgncmVsJykgPT0gJ3N0eWxlc2hlZXQnXHJcblx0XHRcdCYmIHRhZy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5pbmNsdWRlcygnZHJhZy1uLWRyb3AnKVxyXG5cdH0sXHJcblx0e1xyXG5cdFx0bmFtZTogJ2hyJyxcclxuXHRcdGZpbHRlcjogdGFnID0+ICQodGFnKS5oYXNDbGFzcygnaG9yaXpvbnRhbC1saW5lJylcclxuXHRcdFx0fHwgJCh0YWcpLmhhc0NsYXNzKCd2ZXJ0aWNhbC1saW5lJylcclxuXHR9XHJcbl07XHJcblxyXG5mdW5jdGlvbiBnZXRTdHlsZShlbCwgc3R5bGVQcm9wKSB7XHJcblx0dmFsdWUgPSBcIlwiO1xyXG5cdC8vdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWwpO1xyXG5cdGlmIChlbC5zdHlsZSAmJiBlbC5zdHlsZS5sZW5ndGggPiAwICYmIGVsLnN0eWxlW3N0eWxlUHJvcF0pLy9jaGVjayBpbmxpbmVcclxuXHRcdHZhciB2YWx1ZSA9IGVsLnN0eWxlW3N0eWxlUHJvcF07XHJcblx0ZWxzZVxyXG5cdFx0aWYgKGVsLmN1cnJlbnRTdHlsZSlcdC8vY2hlY2sgZGVmaW5lZCBjc3NcclxuXHRcdFx0dmFyIHZhbHVlID0gZWwuY3VycmVudFN0eWxlW3N0eWxlUHJvcF07XHJcblx0XHRlbHNlIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xyXG5cdFx0XHR2YXIgdmFsdWUgPSBkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXREZWZhdWx0Q29tcHV0ZWRTdHlsZSA/XHJcblx0XHRcdFx0ZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0RGVmYXVsdENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoc3R5bGVQcm9wKSA6XHJcblx0XHRcdFx0d2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoc3R5bGVQcm9wKTtcclxuXHRcdH1cclxuXHJcblx0cmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5pZiAoVnZ2ZWIgPT09IHVuZGVmaW5lZCkgdmFyIFZ2dmViID0ge307XHJcblxyXG5WdnZlYi5kZWZhdWx0Q29tcG9uZW50ID0gXCJfYmFzZVwiO1xyXG5WdnZlYi5wcmVzZXJ2ZVByb3BlcnR5U2VjdGlvbnMgPSB0cnVlO1xyXG5cclxuVnZ2ZWIuYmFzZVVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgPyBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYy5yZXBsYWNlKC9bXlxcL10qP1xcLmpzJC8sICcnKSA6ICcnO1xyXG5cclxuVnZ2ZWIuQ29tcG9uZW50c0dyb3VwID0ge307XHJcblxyXG5WdnZlYi5Db21wb25lbnRzID0ge1xyXG5cdF9jb21wb25lbnRzOiB7fSxcclxuXHJcblx0X25vZGVzTG9va3VwOiB7fSxcclxuXHJcblx0X2F0dHJpYnV0ZXNMb29rdXA6IHt9LFxyXG5cclxuXHRfY2xhc3Nlc0xvb2t1cDoge30sXHJcblxyXG5cdF9jbGFzc2VzUmVnZXhMb29rdXA6IHt9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAodXJsKSB7XHJcblx0fSxcclxuXHJcblx0Z2V0OiBmdW5jdGlvbiAodHlwZSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NvbXBvbmVudHNbdHlwZV07XHJcblx0fSxcclxuXHJcblx0YWRkOiBmdW5jdGlvbiAodHlwZSwgZGF0YSkge1xyXG5cdFx0ZGF0YS50eXBlID0gdHlwZTtcclxuXHJcblx0XHR0aGlzLl9jb21wb25lbnRzW3R5cGVdID0gZGF0YTtcclxuXHJcblx0XHRpZiAoZGF0YS5ub2Rlcykge1xyXG5cdFx0XHRmb3IgKHZhciBpIGluIGRhdGEubm9kZXMpIHtcclxuXHRcdFx0XHR0aGlzLl9ub2Rlc0xvb2t1cFtkYXRhLm5vZGVzW2ldXSA9IGRhdGE7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZGF0YS5hdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGlmIChkYXRhLmF0dHJpYnV0ZXMuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSBpbiBkYXRhLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRcdHRoaXMuX2F0dHJpYnV0ZXNMb29rdXBbZGF0YS5hdHRyaWJ1dGVzW2ldXSA9IGRhdGE7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGZvciAodmFyIGkgaW4gZGF0YS5hdHRyaWJ1dGVzKSB7XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIHRoaXMuX2F0dHJpYnV0ZXNMb29rdXBbaV0gPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuX2F0dHJpYnV0ZXNMb29rdXBbaV0gPSB7fTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoZGF0YS5hdHRyaWJ1dGVzW2ldLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xyXG5cdFx0XHRcdFx0XHQvLyDmlK/mjIF0ZXh0aW5wdXTkuK3kuI3lkIznmoTovpPlhaXnsbvlnothdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBbJ3RleHQnLCAncGFzc3dvcmQnXSB9LFxyXG5cdFx0XHRcdFx0XHRkYXRhLmF0dHJpYnV0ZXNbaV0uZm9yRWFjaCh2YWx1ZSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlc0xvb2t1cFtpXVt2YWx1ZV0gPSBkYXRhO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuX2F0dHJpYnV0ZXNMb29rdXBbaV1bZGF0YS5hdHRyaWJ1dGVzW2ldXSA9IGRhdGE7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGRhdGEuY2xhc3Nlcykge1xyXG5cdFx0XHRmb3IgKHZhciBpIGluIGRhdGEuY2xhc3Nlcykge1xyXG5cdFx0XHRcdHRoaXMuX2NsYXNzZXNMb29rdXBbZGF0YS5jbGFzc2VzW2ldXSA9IGRhdGE7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZGF0YS5jbGFzc2VzUmVnZXgpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBkYXRhLmNsYXNzZXNSZWdleCkge1xyXG5cdFx0XHRcdHRoaXMuX2NsYXNzZXNSZWdleExvb2t1cFtkYXRhLmNsYXNzZXNSZWdleFtpXV0gPSBkYXRhO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZXh0ZW5kOiBmdW5jdGlvbiAoaW5oZXJpdFR5cGUsIHR5cGUsIGRhdGEpIHtcclxuXHJcblx0XHRuZXdEYXRhID0gZGF0YTtcclxuXHJcblx0XHRpZiAoaW5oZXJpdERhdGEgPSB0aGlzLl9jb21wb25lbnRzW2luaGVyaXRUeXBlXSkge1xyXG5cdFx0XHRuZXdEYXRhID0gJC5leHRlbmQodHJ1ZSwge30sIGluaGVyaXREYXRhLCBkYXRhKTtcclxuXHRcdFx0bmV3RGF0YS5wcm9wZXJ0aWVzID0gJC5tZXJnZSgkLm1lcmdlKFtdLCBpbmhlcml0RGF0YS5wcm9wZXJ0aWVzID8gaW5oZXJpdERhdGEucHJvcGVydGllcyA6IFtdKSwgZGF0YS5wcm9wZXJ0aWVzID8gZGF0YS5wcm9wZXJ0aWVzIDogW10pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vc29ydCBieSBvcmRlclxyXG5cdFx0bmV3RGF0YS5wcm9wZXJ0aWVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBhLnNvcnQgPT09IFwidW5kZWZpbmVkXCIpIGEuc29ydCA9IDA7XHJcblx0XHRcdGlmICh0eXBlb2YgYi5zb3J0ID09PSBcInVuZGVmaW5lZFwiKSBiLnNvcnQgPSAwO1xyXG5cclxuXHRcdFx0aWYgKGEuc29ydCA8IGIuc29ydClcclxuXHRcdFx0XHRyZXR1cm4gLTE7XHJcblx0XHRcdGlmIChhLnNvcnQgPiBiLnNvcnQpXHJcblx0XHRcdFx0cmV0dXJuIDE7XHJcblx0XHRcdHJldHVybiAwO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdHRoaXMuYWRkKHR5cGUsIG5ld0RhdGEpO1xyXG5cdH0sXHJcblxyXG5cclxuXHRtYXRjaE5vZGU6IGZ1bmN0aW9uIChub2RlKSB7XHJcblx0XHRpZiAoJChub2RlKS5hdHRyKGRhdGFDb21wb25lbnRJZCkgJiYgdGhpcy5fY29tcG9uZW50c1skKG5vZGUpLmF0dHIoZGF0YUNvbXBvbmVudElkKV0pIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2NvbXBvbmVudHNbJChub2RlKS5hdHRyKGRhdGFDb21wb25lbnRJZCldO1xyXG5cdFx0fSBlbHNlIGlmICgkKG5vZGUpLmF0dHIoJ3R5cGUnKSA9PSAncmFkaW8nIHx8ICQobm9kZSkuYXR0cigndHlwZScpID09ICdjaGVja2JveCcpIHtcclxuXHRcdFx0Y29uc3QgJHBhcmVudCA9ICQobm9kZSkucGFyZW50KCk7XHJcblx0XHRcdGlmICgkcGFyZW50LmF0dHIoZGF0YUNvbXBvbmVudElkKSAmJiB0aGlzLl9jb21wb25lbnRzWyRwYXJlbnQuYXR0cihkYXRhQ29tcG9uZW50SWQpXSkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLl9jb21wb25lbnRzWyRwYXJlbnQuYXR0cihkYXRhQ29tcG9uZW50SWQpXVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG5vZGUuYXR0cmlidXRlcy5sZW5ndGgpIHtcclxuXHRcdFx0Ly9zZWFyY2ggZm9yIGF0dHJpYnV0ZXNcclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBub2RlLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRhdHRyID0gbm9kZS5hdHRyaWJ1dGVzW2ldLm5hbWU7XHJcblx0XHRcdFx0dmFsdWUgPSBub2RlLmF0dHJpYnV0ZXNbaV0udmFsdWU7XHJcblxyXG5cdFx0XHRcdGlmIChhdHRyIGluIHRoaXMuX2F0dHJpYnV0ZXNMb29rdXApIHtcclxuXHRcdFx0XHRcdGNvbXBvbmVudCA9IHRoaXMuX2F0dHJpYnV0ZXNMb29rdXBbYXR0cl07XHJcblxyXG5cdFx0XHRcdFx0Ly9jdXJyZW50bHkgd2UgY2hlY2sgdGhhdCBpcyBub3QgYSBjb21wb25lbnQgYnkgbG9va2luZyBhdCBuYW1lIGF0dHJpYnV0ZVxyXG5cdFx0XHRcdFx0Ly9pZiB3ZSBoYXZlIGEgY29sbGVjdGlvbiBvZiBvYmplY3RzIGl0IG1lYW5zIHRoYXQgYXR0cmlidXRlIHZhbHVlIG11c3QgYmUgY2hlY2tlZFxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBjb21wb25lbnRbXCJuYW1lXCJdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdFx0XHRcdGlmICh2YWx1ZSBpbiBjb21wb25lbnQpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gY29tcG9uZW50W3ZhbHVlXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlXHJcblx0XHRcdFx0XHRcdHJldHVybiBjb21wb25lbnQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpIGluIG5vZGUuYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdGF0dHIgPSBub2RlLmF0dHJpYnV0ZXNbaV0ubmFtZTtcclxuXHRcdFx0XHR2YWx1ZSA9IG5vZGUuYXR0cmlidXRlc1tpXS52YWx1ZTtcclxuXHJcblx0XHRcdFx0Ly9jaGVjayBmb3Igbm9kZSBjbGFzc2VzXHJcblx0XHRcdFx0aWYgKGF0dHIgPT0gXCJjbGFzc1wiKSB7XHJcblx0XHRcdFx0XHRjbGFzc2VzID0gdmFsdWUuc3BsaXQoXCIgXCIpO1xyXG5cclxuXHRcdFx0XHRcdGZvciAoaiBpbiBjbGFzc2VzKSB7XHJcblx0XHRcdFx0XHRcdGlmIChjbGFzc2VzW2pdIGluIHRoaXMuX2NsYXNzZXNMb29rdXApXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2NsYXNzZXNMb29rdXBbY2xhc3Nlc1tqXV07XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Zm9yIChyZWdleCBpbiB0aGlzLl9jbGFzc2VzUmVnZXhMb29rdXApIHtcclxuXHRcdFx0XHRcdFx0cmVnZXhPYmogPSBuZXcgUmVnRXhwKHJlZ2V4KTtcclxuXHRcdFx0XHRcdFx0aWYgKHJlZ2V4T2JqLmV4ZWModmFsdWUpKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2NsYXNzZXNSZWdleExvb2t1cFtyZWdleF07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0YWdOYW1lID0gbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRpZiAodGFnTmFtZSBpbiB0aGlzLl9ub2Rlc0xvb2t1cCkgcmV0dXJuIHRoaXMuX25vZGVzTG9va3VwW3RhZ05hbWVdO1xyXG5cclxuXHRcdC8vcmV0dXJuIGZhbHNlO1xyXG5cdFx0cmV0dXJuIHRoaXMuZ2V0KFZ2dmViLmRlZmF1bHRDb21wb25lbnQpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24gKHR5cGUpIHtcclxuXHJcblx0XHRjb21wb25lbnQgPSB0aGlzLl9jb21wb25lbnRzW3R5cGVdO1xyXG5cclxuXHRcdHJpZ2h0UGFuZWwgPSBqUXVlcnkoXCIjcmlnaHQtcGFuZWwgI2NvbXBvbmVudC1wcm9wZXJ0aWVzXCIpO1xyXG5cdFx0c2VjdGlvbiA9IHJpZ2h0UGFuZWwuZmluZCgnLnNlY3Rpb25bZGF0YS1zZWN0aW9uPVwiZGVmYXVsdFwiXScpO1xyXG5cclxuXHRcdGlmICghKFZ2dmViLnByZXNlcnZlUHJvcGVydHlTZWN0aW9ucyAmJiBzZWN0aW9uLmxlbmd0aCkpIHtcclxuXHRcdFx0cmlnaHRQYW5lbC5odG1sKCcnKS5hcHBlbmQodG1wbChcInZ2dmViLWlucHV0LXNlY3Rpb25pbnB1dFwiLCB7IGtleTogXCJkZWZhdWx0XCIsIGhlYWRlcjogY29tcG9uZW50Lm5hbWUgfSkpO1xyXG5cdFx0XHRzZWN0aW9uID0gcmlnaHRQYW5lbC5maW5kKFwiLnNlY3Rpb25cIik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmlnaHRQYW5lbC5maW5kKCdbZGF0YS1oZWFkZXI9XCJkZWZhdWx0XCJdIHNwYW4nKS5odG1sKGNvbXBvbmVudC5uYW1lKTtcclxuXHRcdHNlY3Rpb24uaHRtbChcIlwiKVxyXG5cclxuXHRcdGlmIChjb21wb25lbnQuYmVmb3JlSW5pdCkgY29tcG9uZW50LmJlZm9yZUluaXQoVnZ2ZWIuQnVpbGRlci5zZWxlY3RlZEVsLmdldCgwKSk7XHJcblxyXG5cdFx0Zm4gPSBmdW5jdGlvbiAoY29tcG9uZW50LCBwcm9wZXJ0eSkge1xyXG5cdFx0XHRyZXR1cm4gcHJvcGVydHkuaW5wdXQub24oJ3Byb3BlcnR5Q2hhbmdlJywgZnVuY3Rpb24gKGV2ZW50LCB2YWx1ZSwgaW5wdXQpIHtcclxuXHRcdFx0XHRlbGVtZW50ID0gVnZ2ZWIuQnVpbGRlci5zZWxlY3RlZEVsO1xyXG5cdFx0XHRcdGlmIChwcm9wZXJ0eS5jaGlsZCkgZWxlbWVudCA9IGVsZW1lbnQuZmluZChwcm9wZXJ0eS5jaGlsZCk7XHJcblx0XHRcdFx0aWYgKHByb3BlcnR5LnBhcmVudCkgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50KHByb3BlcnR5LnBhcmVudCk7XHJcblxyXG5cdFx0XHRcdGlmIChwcm9wZXJ0eS5vbkNoYW5nZSkge1xyXG5cdFx0XHRcdFx0ZWxlbWVudCA9IHByb3BlcnR5Lm9uQ2hhbmdlKGVsZW1lbnQsIHZhbHVlLCBpbnB1dCwgY29tcG9uZW50KTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5Lmh0bWxBdHRyKSB7XHJcblx0XHRcdFx0XHRvbGRWYWx1ZSA9IGVsZW1lbnQuYXR0cihwcm9wZXJ0eS5odG1sQXR0cik7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHByb3BlcnR5Lmh0bWxBdHRyID09ICd0ZXh0Jykge1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50LnRleHQodmFsdWUpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eS5odG1sQXR0ciA9PSBcImNsYXNzXCIgJiYgcHJvcGVydHkudmFsaWRWYWx1ZXMpIHtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudC5yZW1vdmVDbGFzcyhwcm9wZXJ0eS52YWxpZFZhbHVlcy5qb2luKFwiIFwiKSk7XHJcblx0XHRcdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LmFkZENsYXNzKHZhbHVlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKHByb3BlcnR5Lmh0bWxBdHRyID09IFwic3R5bGVcIikge1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5jc3MocHJvcGVydHkua2V5LCB2YWx1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQuYXR0cihwcm9wZXJ0eS5odG1sQXR0ciwgdmFsdWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdFx0XHR0eXBlOiAnYXR0cmlidXRlcycsXHJcblx0XHRcdFx0XHRcdHRhcmdldDogZWxlbWVudC5nZXQoMCksXHJcblx0XHRcdFx0XHRcdGF0dHJpYnV0ZU5hbWU6IHByb3BlcnR5Lmh0bWxBdHRyLFxyXG5cdFx0XHRcdFx0XHRvbGRWYWx1ZTogb2xkVmFsdWUsXHJcblx0XHRcdFx0XHRcdG5ld1ZhbHVlOiBlbGVtZW50LmF0dHIocHJvcGVydHkuaHRtbEF0dHIpXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChjb21wb25lbnQub25DaGFuZ2UpIHtcclxuXHRcdFx0XHRcdGVsZW1lbnQgPSBjb21wb25lbnQub25DaGFuZ2UoZWxlbWVudCwgcHJvcGVydHksIHZhbHVlLCBpbnB1dCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoIXByb3BlcnR5LmNoaWxkICYmICFwcm9wZXJ0eS5wYXJlbnQpIFZ2dmViLkJ1aWxkZXIuc2VsZWN0Tm9kZShlbGVtZW50KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdG5vZGVFbGVtZW50ID0gVnZ2ZWIuQnVpbGRlci5zZWxlY3RlZEVsO1xyXG5cclxuXHRcdGZvciAodmFyIGkgaW4gY29tcG9uZW50LnByb3BlcnRpZXMpIHtcclxuXHRcdFx0cHJvcGVydHkgPSBjb21wb25lbnQucHJvcGVydGllc1tpXTtcclxuXHJcblx0XHRcdGlmIChwcm9wZXJ0eS5iZWZvcmVJbml0KSBwcm9wZXJ0eS5iZWZvcmVJbml0KGVsZW1lbnQuZ2V0KDApKVxyXG5cclxuXHRcdFx0ZWxlbWVudCA9IG5vZGVFbGVtZW50O1xyXG5cdFx0XHRpZiAocHJvcGVydHkuY2hpbGQpIGVsZW1lbnQgPSBlbGVtZW50LmZpbmQocHJvcGVydHkuY2hpbGQpO1xyXG5cclxuXHRcdFx0aWYgKHByb3BlcnR5LmRhdGEpIHtcclxuXHRcdFx0XHRwcm9wZXJ0eS5kYXRhW1wia2V5XCJdID0gcHJvcGVydHkua2V5O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHByb3BlcnR5LmRhdGEgPSB7IFwia2V5XCI6IHByb3BlcnR5LmtleSB9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIHByb3BlcnR5Lmdyb3VwID09PSAndW5kZWZpbmVkJykgcHJvcGVydHkuZ3JvdXAgPSBudWxsO1xyXG5cclxuXHRcdFx0cHJvcGVydHkuaW5wdXQgPSBwcm9wZXJ0eS5pbnB1dHR5cGUuaW5pdChwcm9wZXJ0eS5kYXRhKTtcclxuXHJcblx0XHRcdGlmIChwcm9wZXJ0eS5pbml0KSB7XHJcblx0XHRcdFx0cHJvcGVydHkuaW5wdXR0eXBlLnNldFZhbHVlKHByb3BlcnR5LmluaXQoZWxlbWVudC5nZXQoMCkpKTtcclxuXHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eS5odG1sQXR0cikge1xyXG5cdFx0XHRcdGlmIChwcm9wZXJ0eS5odG1sQXR0ciA9PSAndGV4dCcpIHtcclxuXHRcdFx0XHRcdHZhbHVlID0gZWxlbWVudC50ZXh0KCk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eS5odG1sQXR0ciA9PSBcInN0eWxlXCIpIHtcclxuXHRcdFx0XHRcdC8vdmFsdWUgPSBlbGVtZW50LmNzcyhwcm9wZXJ0eS5rZXkpOy8vanF1ZXJ5IGNzcyByZXR1cm5zIGNvbXB1dGVkIHN0eWxlXHJcblx0XHRcdFx0XHR2YWx1ZSA9IGdldFN0eWxlKGVsZW1lbnQuZ2V0KDApLCBwcm9wZXJ0eS5rZXkpOy8vZ2V0U3R5bGUgcmV0dXJucyBkZWNsYXJlZCBzdHlsZVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR2YWx1ZSA9IGVsZW1lbnQuYXR0cihwcm9wZXJ0eS5odG1sQXR0cik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvL2lmIGF0dHJpYnV0ZSBpcyBjbGFzcyBjaGVjayBpZiBvbmUgb2YgdmFsaWQgdmFsdWVzIGlzIGluY2x1ZGVkIGFzIGNsYXNzIHRvIHNldCB0aGUgc2VsZWN0XHJcblx0XHRcdFx0aWYgKHZhbHVlICYmIHByb3BlcnR5Lmh0bWxBdHRyID09IFwiY2xhc3NcIiAmJiBwcm9wZXJ0eS52YWxpZFZhbHVlcykge1xyXG5cdFx0XHRcdFx0dmFsdWUgPSB2YWx1ZS5zcGxpdChcIiBcIikuZmlsdGVyKGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcHJvcGVydHkudmFsaWRWYWx1ZXMuaW5kZXhPZihlbCkgIT0gLTFcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cHJvcGVydHkuaW5wdXR0eXBlLnNldFZhbHVlKHZhbHVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zm4oY29tcG9uZW50LCBwcm9wZXJ0eSk7XHJcblxyXG5cdFx0XHRpZiAocHJvcGVydHkuaW5wdXR0eXBlID09IFNlY3Rpb25JbnB1dCkge1xyXG5cdFx0XHRcdHNlY3Rpb24gPSByaWdodFBhbmVsLmZpbmQoJy5zZWN0aW9uW2RhdGEtc2VjdGlvbj1cIicgKyBwcm9wZXJ0eS5rZXkgKyAnXCJdJyk7XHJcblxyXG5cdFx0XHRcdGlmIChWdnZlYi5wcmVzZXJ2ZVByb3BlcnR5U2VjdGlvbnMgJiYgc2VjdGlvbi5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdHNlY3Rpb24uaHRtbChcIlwiKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cmlnaHRQYW5lbC5hcHBlbmQocHJvcGVydHkuaW5wdXQpO1xyXG5cdFx0XHRcdFx0c2VjdGlvbiA9IHJpZ2h0UGFuZWwuZmluZCgnLnNlY3Rpb25bZGF0YS1zZWN0aW9uPVwiJyArIHByb3BlcnR5LmtleSArICdcIl0nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0cm93ID0gJCh0bXBsKCd2dnZlYi1wcm9wZXJ0eScsIHByb3BlcnR5KSk7XHJcblx0XHRcdFx0cm93LmZpbmQoJy5pbnB1dCcpLmFwcGVuZChwcm9wZXJ0eS5pbnB1dCk7XHJcblx0XHRcdFx0c2VjdGlvbi5hcHBlbmQocm93KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjb21wb25lbnQuaW5pdCkgY29tcG9uZW50LmluaXQoVnZ2ZWIuQnVpbGRlci5zZWxlY3RlZEVsLmdldCgwKSk7XHJcblx0fVxyXG59O1xyXG5cclxuXHJcblxyXG5WdnZlYi5XeXNpd3lnRWRpdG9yID0ge1xyXG5cclxuXHRpc0FjdGl2ZTogZmFsc2UsXHJcblx0b2xkVmFsdWU6ICcnLFxyXG5cdGRvYzogZmFsc2UsXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkb2MpIHtcclxuXHRcdHRoaXMuZG9jID0gZG9jO1xyXG5cclxuXHRcdCQoXCIjYm9sZC1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRkb2MuZXhlY0NvbW1hbmQoJ2JvbGQnLCBmYWxzZSwgbnVsbCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNpdGFsaWMtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCdpdGFsaWMnLCBmYWxzZSwgbnVsbCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiN1bmRlcmxpbmUtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCd1bmRlcmxpbmUnLCBmYWxzZSwgbnVsbCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNzdHJpa2UtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCdzdHJpa2VUaHJvdWdoJywgZmFsc2UsIG51bGwpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjbGluay1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRkb2MuZXhlY0NvbW1hbmQoJ2NyZWF0ZUxpbmsnLCBmYWxzZSwgXCIjXCIpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHVuZG86IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHR0aGlzLmRvYy5leGVjQ29tbWFuZCgndW5kbycsIGZhbHNlLCBudWxsKTtcclxuXHR9LFxyXG5cclxuXHRyZWRvOiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5kb2MuZXhlY0NvbW1hbmQoJ3JlZG8nLCBmYWxzZSwgbnVsbCk7XHJcblx0fSxcclxuXHJcblx0ZWRpdDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdGVsZW1lbnQuYXR0cih7ICdjb250ZW50ZWRpdGFibGUnOiB0cnVlLCAnc3BlbGxjaGVja2tlcic6IGZhbHNlIH0pO1xyXG5cdFx0JChcIiN3eXNpd3lnLWVkaXRvclwiKS5zaG93KCk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuXHRcdHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xyXG5cdFx0dGhpcy5vbGRWYWx1ZSA9IGVsZW1lbnQuaHRtbCgpO1xyXG5cdH0sXHJcblxyXG5cdGRlc3Ryb3k6IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHRlbGVtZW50LnJlbW92ZUF0dHIoJ2NvbnRlbnRlZGl0YWJsZSBzcGVsbGNoZWNra2VyJyk7XHJcblx0XHQkKFwiI3d5c2l3eWctZWRpdG9yXCIpLmhpZGUoKTtcclxuXHRcdHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHJcblxyXG5cdFx0bm9kZSA9IHRoaXMuZWxlbWVudC5nZXQoMCk7XHJcblx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0dHlwZTogJ2NoYXJhY3RlckRhdGEnLFxyXG5cdFx0XHR0YXJnZXQ6IG5vZGUsXHJcblx0XHRcdG9sZFZhbHVlOiB0aGlzLm9sZFZhbHVlLFxyXG5cdFx0XHRuZXdWYWx1ZTogbm9kZS5pbm5lckhUTUxcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuVnZ2ZWIuQnVpbGRlciA9IHtcclxuXHJcblx0ZHJhZ01vdmVNdXRhdGlvbjogZmFsc2UsXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uICh1cmwsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0c2VsZiA9IHRoaXM7XHJcblxyXG5cdFx0c2VsZi5sb2FkQ29udHJvbEdyb3VwcygpO1xyXG5cclxuXHRcdHNlbGYuc2VsZWN0ZWRFbCA9IG51bGw7XHJcblx0XHRzZWxmLmhpZ2hsaWdodEVsID0gbnVsbDtcclxuXHRcdHNlbGYuaW5pdENhbGxiYWNrID0gY2FsbGJhY2s7XHJcblxyXG5cdFx0c2VsZi5kb2N1bWVudEZyYW1lID0gJChcIiNpZnJhbWUtd3JhcHBlciA+IGlmcmFtZVwiKTtcclxuXHRcdHNlbGYuY2FudmFzID0gJChcIiNjYW52YXNcIik7XHJcblxyXG5cdFx0c2VsZi5fbG9hZElmcmFtZSh1cmwpO1xyXG5cclxuXHRcdHNlbGYuX2luaXREcmFnZHJvcCgpO1xyXG5cclxuXHRcdHNlbGYuZHJhZ0VsZW1lbnQgPSBudWxsO1xyXG5cdH0sXHJcblxyXG5cdC8qIGNvbnRyb2xzICovXHJcblx0bG9hZENvbnRyb2xHcm91cHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRjb21wb25lbnRzTGlzdCA9ICQoXCIjY29tcG9uZW50cy1saXN0XCIpO1xyXG5cdFx0Y29tcG9uZW50c0xpc3QuZW1wdHkoKTtcclxuXHJcblx0XHRmb3IgKGdyb3VwIGluIFZ2dmViLkNvbXBvbmVudHNHcm91cCkge1xyXG5cdFx0XHRjb21wb25lbnRzTGlzdC5hcHBlbmQoJzxsaSBjbGFzcz1cImhlYWRlclwiIGRhdGEtc2VjdGlvbj1cIicgKyBncm91cCArICdcIiAgZGF0YS1zZWFyY2g9XCJcIj48bGFiZWwgY2xhc3M9XCJoZWFkZXJcIiBmb3I9XCJjb21waGVhZF8nICsgZ3JvdXAgKyAnXCI+JyArIGdyb3VwICsgJyAgPGRpdiBjbGFzcz1cImhlYWRlci1hcnJvd1wiPjwvZGl2PlxcXHJcblx0XHRcdFx0XHRcdFx0XHQgICA8L2xhYmVsPjxpbnB1dCBjbGFzcz1cImhlYWRlcl9jaGVja1wiIHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJ0cnVlXCIgaWQ9XCJjb21waGVhZF8nICsgZ3JvdXAgKyAnXCI+ICA8b2w+PC9vbD48L2xpPicpO1xyXG5cclxuXHRcdFx0Y29tcG9uZW50c1N1Ykxpc3QgPSBjb21wb25lbnRzTGlzdC5maW5kKCdsaVtkYXRhLXNlY3Rpb249XCInICsgZ3JvdXAgKyAnXCJdICBvbCcpO1xyXG5cclxuXHRcdFx0Y29tcG9uZW50cyA9IFZ2dmViLkNvbXBvbmVudHNHcm91cFtncm91cF07XHJcblxyXG5cdFx0XHRmb3IgKGkgaW4gY29tcG9uZW50cykge1xyXG5cdFx0XHRcdGNvbXBvbmVudFR5cGUgPSBjb21wb25lbnRzW2ldO1xyXG5cdFx0XHRcdGNvbXBvbmVudCA9IFZ2dmViLkNvbXBvbmVudHMuZ2V0KGNvbXBvbmVudFR5cGUpO1xyXG5cclxuXHRcdFx0XHRpZiAoY29tcG9uZW50KSB7XHJcblx0XHRcdFx0XHRpdGVtID0gJCgnPGxpIGRhdGEtc2VjdGlvbj1cIicgKyBncm91cCArICdcIiBkYXRhLXR5cGU9XCInICsgY29tcG9uZW50VHlwZSArICdcIiBkYXRhLXNlYXJjaD1cIicgKyBjb21wb25lbnQubmFtZS50b0xvd2VyQ2FzZSgpICsgJ1wiPjxhIGhyZWY9XCIjXCI+JyArIGNvbXBvbmVudC5uYW1lICsgXCI8L2E+PC9saT5cIik7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGNvbXBvbmVudC5pbWFnZSkge1xyXG5cclxuXHRcdFx0XHRcdFx0aXRlbS5jc3Moe1xyXG5cdFx0XHRcdFx0XHRcdGJhY2tncm91bmRJbWFnZTogXCJ1cmwoXCIgKyAnbGlicy9idWlsZGVyLycgKyBjb21wb25lbnQuaW1hZ2UgKyBcIilcIixcclxuXHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kUmVwZWF0OiBcIm5vLXJlcGVhdFwiXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Y29tcG9uZW50c1N1Ykxpc3QuYXBwZW5kKGl0ZW0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0bG9hZFVybDogZnVuY3Rpb24gKHVybCkge1xyXG5cdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cdFx0c2VsZi5pZnJhbWUuc3JjID0gdXJsO1xyXG5cdH0sXHJcblxyXG5cdC8qIGlmcmFtZSAqL1xyXG5cdF9sb2FkSWZyYW1lOiBmdW5jdGlvbiAodXJsKSB7XHJcblxyXG5cdFx0c2VsZi5pZnJhbWUgPSB0aGlzLmRvY3VtZW50RnJhbWUuZ2V0KDApO1xyXG5cdFx0c2VsZi5pZnJhbWUuc3JjID0gdXJsO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmRvY3VtZW50RnJhbWUub24oXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdHdpbmRvdy5GcmFtZVdpbmRvdyA9IHNlbGYuaWZyYW1lLmNvbnRlbnRXaW5kb3c7XHJcblx0XHRcdHdpbmRvdy5GcmFtZURvY3VtZW50ID0gc2VsZi5pZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcclxuXHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IuaW5pdCh3aW5kb3cuRnJhbWVEb2N1bWVudCk7XHJcblx0XHRcdGlmIChzZWxmLmluaXRDYWxsYmFjaykgc2VsZi5pbml0Q2FsbGJhY2soKTtcclxuXHJcblx0XHRcdHJldHVybiBzZWxmLl9mcmFtZUxvYWRlZCgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdF9mcmFtZUxvYWRlZDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHNlbGYuZnJhbWVEb2MgPSAkKHdpbmRvdy5GcmFtZURvY3VtZW50KTtcclxuXHRcdHNlbGYuZnJhbWVIdG1sID0gJCh3aW5kb3cuRnJhbWVEb2N1bWVudCkuZmluZChcImh0bWxcIik7XHJcblx0XHRzZWxmLmZyYW1lQm9keSA9ICQod2luZG93LkZyYW1lRG9jdW1lbnQpLmZpbmQoXCJib2R5XCIpO1xyXG5cclxuXHRcdHRoaXMuX2luaXRIaWdodGxpZ2h0KCk7XHJcblx0fSxcclxuXHJcblx0X2dldEVsZW1lbnRUeXBlOiBmdW5jdGlvbiAoZWwpIHtcclxuXHJcblx0XHQvL3NlYXJjaCBmb3IgY29tcG9uZW50IGF0dHJpYnV0ZVxyXG5cdFx0Y29tcG9uZW50TmFtZSA9ICcnO1xyXG5cclxuXHRcdGlmIChlbC5hdHRyaWJ1dGVzKVxyXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBqKyspIHtcclxuXHJcblx0XHRcdFx0aWYgKGVsLmF0dHJpYnV0ZXNbal0ubm9kZU5hbWUuaW5kZXhPZignZGF0YS1jb21wb25lbnQnKSA+IC0xKSB7XHJcblx0XHRcdFx0XHRjb21wb25lbnROYW1lID0gZWwuYXR0cmlidXRlc1tqXS5ub2RlTmFtZS5yZXBsYWNlKCdkYXRhLWNvbXBvbmVudC0nLCAnJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbXBvbmVudE5hbWUgIT0gJycpIHJldHVybiBjb21wb25lbnROYW1lO1xyXG5cclxuXHRcdGlmIChlbC5hdHRyaWJ1dGVzKVxyXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBqKyspIHtcclxuXHJcblx0XHRcdFx0aWYgKGVsLmF0dHJpYnV0ZXNbal0ubm9kZU5hbWUuaW5kZXhPZignZGF0YS1jb21wb25lbnQnKSA+IC0xKSB7XHJcblx0XHRcdFx0XHRjb21wb25lbnROYW1lID0gZWwuYXR0cmlidXRlc1tqXS5ub2RlTmFtZS5yZXBsYWNlKCdkYXRhLWNvbXBvbmVudC0nLCAnJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbXBvbmVudE5hbWUgIT0gJycpIHJldHVybiBjb21wb25lbnROYW1lO1xyXG5cdFx0Ly9pZiAoY2xhc3NOYW1lKSByZXR1cm4gY29tcG9uZW50TmFtZTtcclxuXHRcdHJldHVybiBlbC50YWdOYW1lO1xyXG5cdH0sXHJcblxyXG5cdGxvYWROb2RlQ29tcG9uZW50OiBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0ZGF0YSA9IFZ2dmViLkNvbXBvbmVudHMubWF0Y2hOb2RlKG5vZGUpO1xyXG5cdFx0aWYgKGRhdGEpIFZ2dmViLkNvbXBvbmVudHMucmVuZGVyKGRhdGEudHlwZSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdHNlbGVjdE5vZGU6IGZ1bmN0aW9uIChub2RlID0gZmFsc2UpIHtcclxuXHJcblx0XHRpZiAoIW5vZGUpIHtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHNlbGYudGV4dGVkaXRFbCAmJiBzZWxmLnNlbGVjdGVkRWwuZ2V0KDApICE9IG5vZGUpIHtcclxuXHRcdFx0VnZ2ZWIuV3lzaXd5Z0VkaXRvci5kZXN0cm95KHNlbGYudGV4dGVkaXRFbCk7XHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLnJlbW92ZUNsYXNzKFwidGV4dC1lZGl0XCIpLmZpbmQoXCIjc2VsZWN0LWFjdGlvbnNcIikuc2hvdygpO1xyXG5cdFx0XHRzZWxmLnRleHRlZGl0RWwgPSBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlbGYuc2VsZWN0ZWRFbCA9IHRhcmdldCA9IGpRdWVyeShub2RlKTtcclxuXHRcdG9mZnNldCA9IHRhcmdldC5vZmZzZXQoKTtcclxuXHJcblxyXG5cdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuY3NzKFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJ0b3BcIjogb2Zmc2V0LnRvcCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsVG9wKCksXHJcblx0XHRcdFx0XCJsZWZ0XCI6IG9mZnNldC5sZWZ0IC0gc2VsZi5mcmFtZURvYy5zY3JvbGxMZWZ0KCksXHJcblx0XHRcdFx0XCJ3aWR0aFwiOiB0YXJnZXQub3V0ZXJXaWR0aCgpLFxyXG5cdFx0XHRcdFwiaGVpZ2h0XCI6IHRhcmdldC5vdXRlckhlaWdodCgpLFxyXG5cdFx0XHRcdFwiZGlzcGxheVwiOiBcImJsb2NrXCIsXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdGpRdWVyeShcIiNoaWdobGlnaHQtbmFtZVwiKS5odG1sKHNlbGYuX2dldEVsZW1lbnRUeXBlKG5vZGUpKTtcclxuXHJcblx0fSxcclxuXHJcblx0LyogaWZyYW1lIGhpZ2hsaWdodCAqL1xyXG5cdF9pbml0SGlnaHRsaWdodDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdG1vdmVFdmVudCA9IHsgdGFyZ2V0OiBudWxsLCB9O1xyXG5cclxuXHRcdHRoaXMuZnJhbWVCb2R5Lm9uKFwibW91c2Vtb3ZlIHRvdWNobW92ZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0Ly9kZWxheSBmb3IgaGFsZiBhIHNlY29uZCBpZiBkcmFnZ2luZyBvdmVyIHNhbWUgZWxlbWVudFxyXG5cdFx0XHQvLyBpZiAoZXZlbnQudGFyZ2V0ID09IG1vdmVFdmVudC50YXJnZXQgJiYgKChldmVudC50aW1lU3RhbXAgLSBtb3ZlRXZlbnQudGltZVN0YW1wKSA8IDUwMCkpIHJldHVybjtcclxuXHRcdFx0aWYgKGV2ZW50LnRhcmdldCkge1xyXG5cdFx0XHRcdG1vdmVFdmVudCA9IGV2ZW50O1xyXG5cclxuXHRcdFx0XHRzZWxmLmhpZ2hsaWdodEVsID0gdGFyZ2V0ID0galF1ZXJ5KGV2ZW50LnRhcmdldCk7XHJcblx0XHRcdFx0b2Zmc2V0ID0gdGFyZ2V0Lm9mZnNldCgpO1xyXG5cdFx0XHRcdHdpZHRoID0gdGFyZ2V0Lm91dGVyV2lkdGgoKTtcclxuXHRcdFx0XHRoZWlnaHQgPSB0YXJnZXQub3V0ZXJIZWlnaHQoKTtcclxuXHJcblx0XHRcdFx0aWYgKHNlbGYuaXNEcmFnZ2luZykge1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnRWxlbWVudC5jc3Moe1xyXG5cdFx0XHRcdFx0XHRkaXNwbGF5OiAnbm9uZSdcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0cGFyZW50ID0gc2VsZi5oaWdobGlnaHRFbDtcclxuXHRcdFx0XHRcdHBhcmVudE9mZnNldCA9IHNlbGYuZHJhZ0VsZW1lbnQub2Zmc2V0KCk7XHJcblx0XHRcdFx0XHQvLyB0cnkge1xyXG5cdFx0XHRcdFx0Ly8gXHRzZWxmLmRyYWdFbGVtZW50LmNzcyh7XHJcblx0XHRcdFx0XHQvLyBcdFx0ZGlzcGxheTogJ25vbmUnXHJcblx0XHRcdFx0XHQvLyBcdH0pO1xyXG5cdFx0XHRcdFx0Ly8gXHRpZiAoZXZlbnQub3JpZ2luYWxFdmVudCAmJiAob2Zmc2V0LmxlZnQgPiAoZXZlbnQub3JpZ2luYWxFdmVudC54IC0gMTApKSkge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdGlmIChvZmZzZXQudG9wID4gKGV2ZW50Lm9yaWdpbmFsRXZlbnQueSAtIDEwKSkge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0cGFyZW50LmJlZm9yZShzZWxmLmRyYWdFbGVtZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0cGFyZW50LnByZXBlbmQoc2VsZi5kcmFnRWxlbWVudCk7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRzZWxmLmRyYWdFbGVtZW50LnByZXBlbmRUbyhwYXJlbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdH1cclxuXHRcdFx0XHRcdC8vIFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRpZiAoZXZlbnQub3JpZ2luYWxFdmVudCAmJiBvZmZzZXQudG9wID4gKChldmVudC5vcmlnaW5hbEV2ZW50LnkgLSAxMCkpKSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRwYXJlbnQuYmVmb3JlKHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRwYXJlbnQuYXBwZW5kKHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0c2VsZi5kcmFnRWxlbWVudC5hcHBlbmRUbyhwYXJlbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdH1cclxuXHRcdFx0XHRcdC8vIFx0fVxyXG5cdFx0XHRcdFx0Ly8gfSBjYXRjaCAoZXJyKSB7XHJcblx0XHRcdFx0XHQvLyBcdGNvbnNvbGUubG9nKGVycik7XHJcblx0XHRcdFx0XHQvLyB9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0XHRqUXVlcnkoXCIjaGlnaGxpZ2h0LWJveFwiKS5jc3MoXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcInRvcFwiOiBvZmZzZXQudG9wIC0gc2VsZi5mcmFtZURvYy5zY3JvbGxUb3AoKSxcclxuXHRcdFx0XHRcdFx0XHRcImxlZnRcIjogb2Zmc2V0LmxlZnQgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbExlZnQoKSxcclxuXHRcdFx0XHRcdFx0XHRcIndpZHRoXCI6IHdpZHRoLFxyXG5cdFx0XHRcdFx0XHRcdFwiaGVpZ2h0XCI6IGhlaWdodCxcclxuXHRcdFx0XHRcdFx0XHRcImRpc3BsYXlcIjogZXZlbnQudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJykgPyBcIm5vbmVcIiA6IFwiYmxvY2tcIlxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRqUXVlcnkoXCIjaGlnaGxpZ2h0LW5hbWVcIikuaHRtbChzZWxmLl9nZXRFbGVtZW50VHlwZShldmVudC50YXJnZXQpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHR0aGlzLmZyYW1lQm9keS5vbihcIm1vdXNldXAgdG91Y2hlbmRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGlmIChzZWxmLmlzRHJhZ2dpbmcpIHtcclxuXHRcdFx0XHRzZWxmLmlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0aWYgKGNvbXBvbmVudC5kcmFnSHRtbCkgLy9pZiBkcmFnSHRtbCBpcyBzZXQgZm9yIGRyYWdnaW5nIHRoZW4gc2V0IHJlYWwgY29tcG9uZW50IGh0bWxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRuZXdFbGVtZW50ID0gJChjb21wb25lbnQuaHRtbCk7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdFbGVtZW50LnJlcGxhY2VXaXRoKG5ld0VsZW1lbnQpO1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnRWxlbWVudCA9IG5ld0VsZW1lbnQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChjb21wb25lbnQuYWZ0ZXJEcm9wKSBzZWxmLmRyYWdFbGVtZW50ID0gY29tcG9uZW50LmFmdGVyRHJvcChzZWxmLmRyYWdFbGVtZW50KTtcclxuXHJcblx0XHRcdFx0bm9kZSA9IHNlbGYuZHJhZ0VsZW1lbnQuZ2V0KDApO1xyXG5cdFx0XHRcdHNlbGYuc2VsZWN0Tm9kZShub2RlKTtcclxuXHRcdFx0XHRzZWxmLmxvYWROb2RlQ29tcG9uZW50KG5vZGUpO1xyXG5cclxuXHRcdFx0XHRpZiAoc2VsZi5kcmFnTW92ZU11dGF0aW9uID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0XHRcdHR5cGU6ICdjaGlsZExpc3QnLFxyXG5cdFx0XHRcdFx0XHR0YXJnZXQ6IG5vZGUucGFyZW50Tm9kZSxcclxuXHRcdFx0XHRcdFx0YWRkZWROb2RlczogW25vZGVdLFxyXG5cdFx0XHRcdFx0XHRuZXh0U2libGluZzogbm9kZS5uZXh0U2libGluZ1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ01vdmVNdXRhdGlvbi5uZXdQYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdNb3ZlTXV0YXRpb24ubmV3TmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oc2VsZi5kcmFnTW92ZU11dGF0aW9uKTtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ01vdmVNdXRhdGlvbiA9IGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdHRoaXMuZnJhbWVCb2R5Lm9uKFwiZGJsY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRzZWxmLnRleHRlZGl0RWwgPSB0YXJnZXQgPSBqUXVlcnkoZXZlbnQudGFyZ2V0KTtcclxuXHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IuZWRpdChzZWxmLnRleHRlZGl0RWwpO1xyXG5cclxuXHRcdFx0c2VsZi50ZXh0ZWRpdEVsLmF0dHIoeyAnY29udGVudGVkaXRhYmxlJzogdHJ1ZSwgJ3NwZWxsY2hlY2trZXInOiBmYWxzZSB9KTtcclxuXHJcblx0XHRcdHNlbGYudGV4dGVkaXRFbC5vbihcImJsdXIga2V5dXAgcGFzdGUgaW5wdXRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmNzcyh7XHJcblx0XHRcdFx0XHRcIndpZHRoXCI6IHNlbGYudGV4dGVkaXRFbC5vdXRlcldpZHRoKCksXHJcblx0XHRcdFx0XHRcImhlaWdodFwiOiBzZWxmLnRleHRlZGl0RWwub3V0ZXJIZWlnaHQoKVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmFkZENsYXNzKFwidGV4dC1lZGl0XCIpLmZpbmQoXCIjc2VsZWN0LWFjdGlvbnNcIikuaGlkZSgpO1xyXG5cdFx0XHRqUXVlcnkoXCIjaGlnaGxpZ2h0LWJveFwiKS5oaWRlKCk7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0dGhpcy5mcmFtZUJvZHkub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50LnRhcmdldCkge1xyXG5cdFx0XHRcdGlmICghaXNQcmV2aWV3ICYmICEkKCcjYXR0cmlidXRlLXNldHRpbmdzJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcblx0XHRcdFx0XHQkKCcjYXR0cmlidXRlLXNldHRpbmdzJylcclxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKCdhY3RpdmUnKVxyXG5cdFx0XHRcdFx0XHQuc2libGluZ3MoKVxyXG5cdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdFx0JCgnI2xlZnQtcGFuZWwnKS5oaWRlKCk7XHJcblx0XHRcdFx0XHQkKCcjcmlnaHQtcGFuZWwnKS5zaG93KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHNlbGYuc2VsZWN0Tm9kZShldmVudC50YXJnZXQpO1xyXG5cdFx0XHRcdHNlbGYubG9hZE5vZGVDb21wb25lbnQoZXZlbnQudGFyZ2V0KTtcclxuXHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuZnJhbWVCb2R5LmtleWRvd24oZSA9PiB7XHJcblx0XHRcdGlmIChzZWxmLnNlbGVjdGVkRWwgJiYgc2VsZi5zZWxlY3RlZEVsLnByb3AoJ3RhZ05hbWUnKSAhPSAnQk9EWScpIHtcclxuXHRcdFx0XHRpZiAoZS53aGljaCA9PSAzNyB8fCBlLndoaWNoID09IDM4IHx8IGUud2hpY2ggPT0gMzkgfHwgZS53aGljaCA9PSA0MCkge1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lmcmFtZUlkJykuY29udGVudFdpbmRvdy5hcnJvd0tleU1vdmUoZS53aGljaCwgc2VsZi5zZWxlY3RlZEVsKTtcclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCB0aGUgZGVmYXVsdCBhY3Rpb24gKHNjcm9sbCAvIG1vdmUgY2FyZXQpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI2RyYWctYm94XCIpLm9uKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQgPSBzZWxmLnNlbGVjdGVkRWw7XHJcblx0XHRcdHNlbGYuaXNEcmFnZ2luZyA9IHRydWU7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5kcmFnRWxlbWVudC5nZXQoMCk7XHJcblxyXG5cclxuXHRcdFx0c2VsZi5kcmFnTW92ZU11dGF0aW9uID0ge1xyXG5cdFx0XHRcdHR5cGU6ICdtb3ZlJyxcclxuXHRcdFx0XHR0YXJnZXQ6IG5vZGUsXHJcblx0XHRcdFx0b2xkUGFyZW50OiBub2RlLnBhcmVudE5vZGUsXHJcblx0XHRcdFx0b2xkTmV4dFNpYmxpbmc6IG5vZGUubmV4dFNpYmxpbmdcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vc2VsZi5zZWxlY3ROb2RlKGZhbHNlKTtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNkb3duLWJveFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5zZWxlY3RlZEVsLmdldCgwKTtcclxuXHRcdFx0b2xkUGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRvbGROZXh0U2libGluZyA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0XHRuZXh0ID0gc2VsZi5zZWxlY3RlZEVsLm5leHQoKTtcclxuXHJcblx0XHRcdGlmIChuZXh0Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRuZXh0LmFmdGVyKHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c2VsZi5zZWxlY3RlZEVsLnBhcmVudCgpLmFmdGVyKHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG5ld1BhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0bmV3TmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0dHlwZTogJ21vdmUnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZSxcclxuXHRcdFx0XHRvbGRQYXJlbnQ6IG9sZFBhcmVudCxcclxuXHRcdFx0XHRuZXdQYXJlbnQ6IG5ld1BhcmVudCxcclxuXHRcdFx0XHRvbGROZXh0U2libGluZzogb2xkTmV4dFNpYmxpbmcsXHJcblx0XHRcdFx0bmV3TmV4dFNpYmxpbmc6IG5ld05leHRTaWJsaW5nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiN1cC1ib3hcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cclxuXHRcdFx0bm9kZSA9IHNlbGYuc2VsZWN0ZWRFbC5nZXQoMCk7XHJcblx0XHRcdG9sZFBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0b2xkTmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0bmV4dCA9IHNlbGYuc2VsZWN0ZWRFbC5wcmV2KCk7XHJcblxyXG5cdFx0XHRpZiAobmV4dC5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0bmV4dC5iZWZvcmUoc2VsZi5zZWxlY3RlZEVsKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzZWxmLnNlbGVjdGVkRWwucGFyZW50KCkuYmVmb3JlKHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG5ld1BhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0bmV3TmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0dHlwZTogJ21vdmUnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZSxcclxuXHRcdFx0XHRvbGRQYXJlbnQ6IG9sZFBhcmVudCxcclxuXHRcdFx0XHRuZXdQYXJlbnQ6IG5ld1BhcmVudCxcclxuXHRcdFx0XHRvbGROZXh0U2libGluZzogb2xkTmV4dFNpYmxpbmcsXHJcblx0XHRcdFx0bmV3TmV4dFNpYmxpbmc6IG5ld05leHRTaWJsaW5nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNjbG9uZS1ib3hcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0Y2xvbmUgPSBzZWxmLnNlbGVjdGVkRWwuY2xvbmUoKTtcclxuXHJcblx0XHRcdHNlbGYuc2VsZWN0ZWRFbC5hZnRlcihjbG9uZSk7XHJcblxyXG5cdFx0XHRzZWxmLnNlbGVjdGVkRWwgPSBjbG9uZS5jbGljaygpO1xyXG5cclxuXHRcdFx0bm9kZSA9IGNsb25lLmdldCgwKTtcclxuXHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0dHlwZTogJ2NoaWxkTGlzdCcsXHJcblx0XHRcdFx0dGFyZ2V0OiBub2RlLnBhcmVudE5vZGUsXHJcblx0XHRcdFx0YWRkZWROb2RlczogW25vZGVdLFxyXG5cdFx0XHRcdG5leHRTaWJsaW5nOiBub2RlLm5leHRTaWJsaW5nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNwYXJlbnQtYm94XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5zZWxlY3RlZEVsLnBhcmVudCgpLmdldCgwKTtcclxuXHJcblx0XHRcdHNlbGYuc2VsZWN0Tm9kZShub2RlKTtcclxuXHRcdFx0c2VsZi5sb2FkTm9kZUNvbXBvbmVudChub2RlKTtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjZGVsZXRlLWJveFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5zZWxlY3RlZEVsLmdldCgwKTtcclxuXHJcblx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdHR5cGU6ICdjaGlsZExpc3QnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZS5wYXJlbnROb2RlLFxyXG5cdFx0XHRcdHJlbW92ZWROb2RlczogW25vZGVdLFxyXG5cdFx0XHRcdG5leHRTaWJsaW5nOiBub2RlLm5leHRTaWJsaW5nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0c2VsZi5zZWxlY3RlZEVsLnJlbW92ZSgpO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0alF1ZXJ5KHdpbmRvdy5GcmFtZVdpbmRvdykub24oXCJzY3JvbGwgcmVzaXplXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuXHRcdFx0aWYgKHNlbGYuc2VsZWN0ZWRFbCkge1xyXG5cdFx0XHRcdG9mZnNldCA9IHNlbGYuc2VsZWN0ZWRFbC5vZmZzZXQoKTtcclxuXHJcblx0XHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuY3NzKFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcInRvcFwiOiBvZmZzZXQudG9wIC0gc2VsZi5mcmFtZURvYy5zY3JvbGxUb3AoKSxcclxuXHRcdFx0XHRcdFx0XCJsZWZ0XCI6IG9mZnNldC5sZWZ0IC0gc2VsZi5mcmFtZURvYy5zY3JvbGxMZWZ0KCksXHJcblx0XHRcdFx0XHRcdFwid2lkdGhcIjogc2VsZi5zZWxlY3RlZEVsLm91dGVyV2lkdGgoKSxcclxuXHRcdFx0XHRcdFx0XCJoZWlnaHRcIjogc2VsZi5zZWxlY3RlZEVsLm91dGVySGVpZ2h0KCksXHJcblx0XHRcdFx0XHRcdC8vXCJkaXNwbGF5XCI6IFwiYmxvY2tcIlxyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoc2VsZi5oaWdobGlnaHRFbCkge1xyXG5cdFx0XHRcdG9mZnNldCA9IHNlbGYuaGlnaGxpZ2h0RWwub2Zmc2V0KCk7XHJcblxyXG5cdFx0XHRcdGpRdWVyeShcIiNoaWdobGlnaHQtYm94XCIpLmNzcyhcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJ0b3BcIjogb2Zmc2V0LnRvcCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsVG9wKCksXHJcblx0XHRcdFx0XHRcdFwibGVmdFwiOiBvZmZzZXQubGVmdCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsTGVmdCgpLFxyXG5cdFx0XHRcdFx0XHRcIndpZHRoXCI6IHNlbGYuaGlnaGxpZ2h0RWwub3V0ZXJXaWR0aCgpLFxyXG5cdFx0XHRcdFx0XHRcImhlaWdodFwiOiBzZWxmLmhpZ2hsaWdodEVsLm91dGVySGVpZ2h0KCksXHJcblx0XHRcdFx0XHRcdC8vXCJkaXNwbGF5XCI6IFwiYmxvY2tcIlxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHR9LFxyXG5cclxuXHQvKiBkcmFnIGFuZCBkcm9wICovXHJcblx0X2luaXREcmFnZHJvcDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHNlbGYuaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cdFx0Y29tcG9uZW50ID0ge307XHJcblx0XHQkKCcjY29tcG9uZW50cyB1bCA+IGxpID4gb2wgPiBsaScpLm9uKFwibW91c2Vkb3duIHRvdWNoc3RhcnRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdCR0aGlzID0galF1ZXJ5KHRoaXMpO1xyXG5cclxuXHRcdFx0Ly8gJChcIiNjb21wb25lbnQtY2xvbmVcIikucmVtb3ZlKCk7XHJcblx0XHRcdGNvbXBvbmVudCA9IFZ2dmViLkNvbXBvbmVudHMuZ2V0KCR0aGlzLmRhdGEoXCJ0eXBlXCIpKTtcclxuXHJcblx0XHRcdGlmIChjb21wb25lbnQuZHJhZ0h0bWwpIHtcclxuXHRcdFx0XHRodG1sID0gY29tcG9uZW50LmRyYWdIdG1sO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGh0bWwgPSBjb21wb25lbnQuaHRtbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VsZi5kcmFnRWxlbWVudCA9ICQoaHRtbCk7XHJcblxyXG5cdFx0XHRpZiAoY29tcG9uZW50LmRyYWdTdGFydCkgc2VsZi5kcmFnRWxlbWVudCA9IGNvbXBvbmVudC5kcmFnU3RhcnQoc2VsZi5kcmFnRWxlbWVudCk7XHJcblxyXG5cdFx0XHRzZWxmLmlzRHJhZ2dpbmcgPSB0cnVlO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdCQoJ2JvZHknKS5vbignbW91c2V1cCB0b3VjaGVuZCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRpZiAoc2VsZi5pc0RyYWdnaW5nID09IHRydWUpIHtcclxuXHRcdFx0XHRzZWxmLmlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHRcdFx0XHQvLyAkKFwiI2NvbXBvbmVudC1jbG9uZVwiKS5yZW1vdmUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnYm9keScpLm9uKCdtb3VzZW1vdmUgdG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGlmIChzZWxmLmlzRHJhZ2dpbmcgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdGVsZW1lbnRNb3VzZUlzT3ZlciA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCAtIDYwLCBldmVudC5jbGllbnRZIC0gNDApO1xyXG5cdFx0XHRcdC8vaWYgZHJhZyBlbGVtZW50cyBob3ZlcnMgb3ZlciBpZnJhbWUgc3dpdGNoIHRvIGlmcmFtZSBtb3VzZW92ZXIgaGFuZGxlclx0XHJcblx0XHRcdFx0aWYgKGVsZW1lbnRNb3VzZUlzT3ZlciAmJiBlbGVtZW50TW91c2VJc092ZXIudGFnTmFtZSA9PSAnSUZSQU1FJykge1xyXG5cdFx0XHRcdFx0c2VsZi5mcmFtZUJvZHkudHJpZ2dlcihcIm1vdXNlbW92ZVwiLCBldmVudCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdHNlbGYuc2VsZWN0Tm9kZShmYWxzZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcjY29tcG9uZW50cyB1bCA+IG9sID4gbGkgPiBsaScpLm9uKFwibW91c2V1cCB0b3VjaGVuZFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0c2VsZi5pc0RyYWdnaW5nID0gZmFsc2U7XHJcblx0XHRcdC8vICQoXCIjY29tcG9uZW50LWNsb25lXCIpLnJlbW92ZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdGdldEJlYXV0aWZpZWRIdG1sKCkge1xyXG5cdFx0LypcclxuXHRcdC1JLCAtLWluZGVudC1pbm5lci1odG1sICAgICAgICAgICAgSW5kZW50IDxoZWFkPiBhbmQgPGJvZHk+IHNlY3Rpb25zLiBEZWZhdWx0IGlzIGZhbHNlLlxyXG5cdFx0LVUsIC0tdW5mb3JtYXR0ZWQgICAgICAgICAgICAgICAgICBMaXN0IG9mIHRhZ3MgKGRlZmF1bHRzIHRvIGlubGluZSkgdGhhdCBzaG91bGQgbm90IGJlIHJlZm9ybWF0dGVkXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgdXNlIGVtcHR5IGFycmF5IHRvIGRlbm90ZSB0aGF0IG5vIHRhZ3Mgc2hvdWxkIG5vdCBiZSByZWZvcm1hdHRlZFxyXG5cdFx0ICovXHJcblxyXG5cdFx0Y29uc3QgeyBkb2N0eXBlLCBodG1sIH0gPSB0aGlzLmdldEh0bWwoKTtcclxuXHRcdHJldHVybiBodG1sX2JlYXV0aWZ5KGAke2RvY3R5cGV9XHJcblx0XHRcdFx0XHRcdFx0ICAke3JlbW92ZVVudXNlZFRhZ3MoaHRtbCwgdW51c2VkVGFncyl9YCxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHByZXNlcnZlX25ld2xpbmVzOiBmYWxzZSxcclxuXHRcdFx0XHRpbmRlbnRfaW5uZXJfaHRtbDogdHJ1ZSxcclxuXHRcdFx0XHR1bmZvcm1hdHRlZDogW11cclxuXHRcdFx0fSk7XHJcblx0fSxcclxuXHJcblx0Z2V0SHRtbDogZnVuY3Rpb24gKCkge1xyXG5cdFx0ZG9jID0gd2luZG93LkZyYW1lRG9jdW1lbnQ7XHJcblx0XHRjb25zdCBkb2N0eXBlID0gXCI8IURPQ1RZUEUgXCJcclxuXHRcdFx0KyBkb2MuZG9jdHlwZS5uYW1lXHJcblx0XHRcdCsgKGRvYy5kb2N0eXBlLnB1YmxpY0lkID8gJyBQVUJMSUMgXCInICsgZG9jLmRvY3R5cGUucHVibGljSWQgKyAnXCInIDogJycpXHJcblx0XHRcdCsgKCFkb2MuZG9jdHlwZS5wdWJsaWNJZCAmJiBkb2MuZG9jdHlwZS5zeXN0ZW1JZCA/ICcgU1lTVEVNJyA6ICcnKVxyXG5cdFx0XHQrIChkb2MuZG9jdHlwZS5zeXN0ZW1JZCA/ICcgXCInICsgZG9jLmRvY3R5cGUuc3lzdGVtSWQgKyAnXCInIDogJycpXHJcblx0XHRcdCsgXCI+XFxuXCI7XHJcblx0XHRjb25zdCBodG1sID0gYCR7ZG9jdHlwZX1cclxuXHRcdFx0XHRcdCAgPGh0bWw+XHJcblx0XHRcdFx0XHRcdCAgJHtkb2MuZG9jdW1lbnRFbGVtZW50LmlubmVySFRNTH1cclxuXHRcdFx0XHRcdCAgPC9odG1sPmA7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRkb2N0eXBlLFxyXG5cdFx0XHRodG1sXHJcblx0XHR9O1xyXG5cdH0sXHJcblxyXG5cdHNldEh0bWw6IGZ1bmN0aW9uIChodG1sKSB7XHJcblx0XHQvL3VwZGF0ZSBvbmx5IGJvZHkgdG8gYXZvaWQgYnJlYWtpbmcgaWZyYW1lIGNzcy9qcyByZWxhdGl2ZSBwYXRoc1xyXG5cdFx0c3RhcnQgPSBodG1sLmluZGV4T2YoXCI8Ym9keVwiKTtcclxuXHRcdGVuZCA9IGh0bWwuaW5kZXhPZihcIjwvYm9keVwiKTtcclxuXHJcblx0XHRpZiAoc3RhcnQgPj0gMCAmJiBlbmQgPj0gMCkge1xyXG5cdFx0XHRib2R5ID0gaHRtbC5zbGljZShodG1sLmluZGV4T2YoXCI+XCIsIHN0YXJ0KSArIDEsIGVuZCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRib2R5ID0gaHRtbFxyXG5cdFx0fVxyXG5cclxuXHRcdC8vc2VsZi5mcmFtZUJvZHkuaHRtbChib2R5KTtcclxuXHRcdHdpbmRvdy5GcmFtZURvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gYm9keTtcclxuXHJcblx0XHQvL2JlbG93IG1ldGhvZHMgYnJha2UgZG9jdW1lbnQgcmVsYXRpdmUgY3NzIGFuZCBqcyBwYXRoc1xyXG5cdFx0Ly9yZXR1cm4gc2VsZi5pZnJhbWUub3V0ZXJIVE1MID0gaHRtbDtcclxuXHRcdC8vcmV0dXJuIHNlbGYuZG9jdW1lbnRGcmFtZS5odG1sKGh0bWwpO1xyXG5cdFx0Ly9yZXR1cm4gc2VsZi5kb2N1bWVudEZyYW1lLmF0dHIoXCJzcmNkb2NcIiwgaHRtbCk7XHJcblx0fVxyXG59O1xyXG5cclxuVnZ2ZWIuQ29kZUVkaXRvciA9IHtcclxuXHJcblx0aXNBY3RpdmU6IGZhbHNlLFxyXG5cdG9sZFZhbHVlOiAnJyxcclxuXHRkb2M6IGZhbHNlLFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZG9jKSB7XHJcblx0XHQkKFwiI3Z2dmViLWNvZGUtZWRpdG9yIHRleHRhcmVhXCIpLnZhbChWdnZlYi5CdWlsZGVyLmdldEJlYXV0aWZpZWRIdG1sKCkpO1xyXG5cclxuXHRcdCQoXCIjdnZ2ZWItY29kZS1lZGl0b3IgdGV4dGFyZWFcIikua2V5dXAoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRkZWxheShWdnZlYi5CdWlsZGVyLnNldEh0bWwodGhpcy52YWx1ZSksIDEwMDApO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly9sb2FkIGNvZGUgb24gZG9jdW1lbnQgY2hhbmdlc1xyXG5cdFx0VnZ2ZWIuQnVpbGRlci5mcmFtZUJvZHkub24oXCJ2dnZlYi51bmRvLmFkZCB2dnZlYi51bmRvLnJlc3RvcmVcIiwgZnVuY3Rpb24gKGUpIHsgVnZ2ZWIuQ29kZUVkaXRvci5zZXRWYWx1ZSgpOyB9KTtcclxuXHRcdC8vbG9hZCBjb2RlIHdoZW4gYSBuZXcgdXJsIGlzIGxvYWRlZFxyXG5cdFx0VnZ2ZWIuQnVpbGRlci5kb2N1bWVudEZyYW1lLm9uKFwibG9hZFwiLCBmdW5jdGlvbiAoZSkgeyBWdnZlYi5Db2RlRWRpdG9yLnNldFZhbHVlKCk7IH0pO1xyXG5cclxuXHRcdHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xyXG5cdH0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdGlmICh0aGlzLmlzQWN0aXZlKSB7XHJcblx0XHRcdCQoXCIjdnZ2ZWItY29kZS1lZGl0b3IgdGV4dGFyZWFcIikudmFsKFZ2dmViLkJ1aWxkZXIuZ2V0QmVhdXRpZmllZEh0bWwoKSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZGVzdHJveTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdC8vdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cdH0sXHJcblxyXG5cdHRvZ2dsZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuaXNBY3RpdmUgIT0gdHJ1ZSkge1xyXG5cdFx0XHR0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaW5pdCgpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5kZXN0cm95KCk7XHJcblx0fVxyXG59XHJcblxyXG5sZXQgc2hvd25QYW5lbCwgaGlkZGVuUGFuZWwsIGlzUHJldmlldztcclxuXHJcblZ2dmViLkd1aSA9IHtcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKCkge1xyXG5cdFx0JChcIltkYXRhLXZ2dmViLWFjdGlvbl1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdG9uID0gXCJjbGlja1wiO1xyXG5cdFx0XHRpZiAodGhpcy5kYXRhc2V0LnZ2dmViT24pIG9uID0gdGhpcy5kYXRhc2V0LnZ2dmViT247XHJcblxyXG5cdFx0XHQkKHRoaXMpLm9uKG9uLCBWdnZlYi5HdWlbdGhpcy5kYXRhc2V0LnZ2dmViQWN0aW9uXSk7XHJcblx0XHRcdGlmICh0aGlzLmRhdGFzZXQudnZ2ZWJTaG9ydGN1dCkge1xyXG5cdFx0XHRcdCQoZG9jdW1lbnQpLmJpbmQoJ2tleWRvd24nLCB0aGlzLmRhdGFzZXQudnZ2ZWJTaG9ydGN1dCwgVnZ2ZWIuR3VpW3RoaXMuZGF0YXNldC52dnZlYkFjdGlvbl0pO1xyXG5cdFx0XHRcdCQod2luZG93LkZyYW1lRG9jdW1lbnQsIHdpbmRvdy5GcmFtZVdpbmRvdykuYmluZCgna2V5ZG93bicsIHRoaXMuZGF0YXNldC52dnZlYlNob3J0Y3V0LCBWdnZlYi5HdWlbdGhpcy5kYXRhc2V0LnZ2dmViQWN0aW9uXSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHVuZG86IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmIChWdnZlYi5XeXNpd3lnRWRpdG9yLmlzQWN0aXZlKSB7XHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IudW5kbygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0VnZ2ZWIuVW5kby51bmRvKCk7XHJcblx0XHR9XHJcblx0XHRWdnZlYi5CdWlsZGVyLnNlbGVjdE5vZGUoKTtcclxuXHR9LFxyXG5cclxuXHRyZWRvOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoVnZ2ZWIuV3lzaXd5Z0VkaXRvci5pc0FjdGl2ZSkge1xyXG5cdFx0XHRWdnZlYi5XeXNpd3lnRWRpdG9yLnJlZG8oKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdFZ2dmViLlVuZG8ucmVkbygpO1xyXG5cdFx0fVxyXG5cdFx0VnZ2ZWIuQnVpbGRlci5zZWxlY3ROb2RlKCk7XHJcblx0fSxcclxuXHJcblx0Y2hlY2s6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoJyN0ZXh0YXJlYS1tb2RhbCB0ZXh0YXJlYScpLnZhbChWdnZlYi5CdWlsZGVyLmdldEJlYXV0aWZpZWRIdG1sKCkpO1xyXG5cdFx0JCgnI3RleHRhcmVhLW1vZGFsJykubW9kYWwoKTtcclxuXHR9LFxyXG5cclxuXHR2aWV3cG9ydDogZnVuY3Rpb24gKCkge1xyXG5cdFx0JChcIiNjYW52YXNcIikuYXR0cihcImNsYXNzXCIsIHRoaXMuZGF0YXNldC52aWV3KTtcclxuXHR9LFxyXG5cclxuXHR0b2dnbGVFZGl0b3I6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoXCIjdnZ2ZWItYnVpbGRlclwiKS50b2dnbGVDbGFzcyhcImJvdHRvbS1wYW5lbC1leHBhbmRcIik7XHJcblx0XHRWdnZlYi5Db2RlRWRpdG9yLnRvZ2dsZSgpO1xyXG5cdH0sXHJcblxyXG5cdGRvd25sb2FkKCkge1xyXG5cdFx0ZG93bmxvYWRBc1RleHRGaWxlKCdpbmRleCcsIFZ2dmViLkJ1aWxkZXIuZ2V0QmVhdXRpZmllZEh0bWwoKSk7XHJcblx0fSxcclxuXHJcblx0cHJldmlldzogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCQoJyNsZWZ0LXBhbmVsJykuaXMoJzp2aXNpYmxlJykpIHtcclxuXHRcdFx0c2hvd25QYW5lbCA9ICdsZWZ0LXBhbmVsJztcclxuXHRcdFx0aGlkZGVuUGFuZWwgPSAncmlnaHQtcGFuZWwnO1xyXG5cdFx0XHQkKCcjbGVmdC1wYW5lbCwgI3JpZ2h0LXBhbmVsJykuaGlkZSgpO1xyXG5cdFx0XHRpc1ByZXZpZXcgPSB0cnVlO1xyXG5cdFx0fSBlbHNlIGlmICgkKCcjcmlnaHQtcGFuZWwnKS5pcygnOnZpc2libGUnKSkge1xyXG5cdFx0XHRzaG93blBhbmVsID0gJ3JpZ2h0LXBhbmVsJztcclxuXHRcdFx0aGlkZGVuUGFuZWwgPSAnbGVmdC1wYW5lbCc7XHJcblx0XHRcdCQoJyNsZWZ0LXBhbmVsLCAjcmlnaHQtcGFuZWwnKS5oaWRlKCk7XHJcblx0XHRcdGlzUHJldmlldyA9IHRydWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpc1ByZXZpZXcgPSBmYWxzZTtcclxuXHRcdFx0JChgIyR7c2hvd25QYW5lbH1gKS5zaG93KCk7XHJcblx0XHRcdCQoYCMke2hpZGRlblBhbmVsfWApLmhpZGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHQkKCcjbWVudS1wYW5lbCcpLnRvZ2dsZSgpO1xyXG5cdFx0JChcIiNpZnJhbWUtbGF5ZXJcIikudG9nZ2xlKCk7XHJcblx0XHQkKFwiI3Z2dmViLWJ1aWxkZXJcIikudG9nZ2xlQ2xhc3MoXCJwcmV2aWV3XCIpO1xyXG5cdH0sXHJcblxyXG5cdGZ1bGxzY3JlZW46IGZ1bmN0aW9uICgpIHtcclxuXHRcdGxhdW5jaEZ1bGxTY3JlZW4oZG9jdW1lbnQpOyAvLyB0aGUgd2hvbGUgcGFnZVxyXG5cdH0sXHJcblxyXG5cdGNvbXBvbmVudFNlYXJjaDogZnVuY3Rpb24gKCkge1xyXG5cdFx0c2VhcmNoVGV4dCA9IHRoaXMudmFsdWU7XHJcblxyXG5cdFx0JChcIiNjb21wb25lbnRzLWxpc3QgbGkgb2wgbGlcIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCR0aGlzID0gJCh0aGlzKTtcclxuXHJcblx0XHRcdCR0aGlzLmhpZGUoKTtcclxuXHRcdFx0aWYgKCR0aGlzLmRhdGEoXCJzZWFyY2hcIikuaW5kZXhPZihzZWFyY2hUZXh0KSA+IC0xKSAkdGhpcy5zaG93KCk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRjbGVhckNvbXBvbmVudFNlYXJjaDogZnVuY3Rpb24gKCkge1xyXG5cdFx0JChcIiNjb21wb25lbnQtc2VhcmNoXCIpLnZhbChcIlwiKS5rZXl1cCgpO1xyXG5cdH1cclxufVxyXG5cclxuVnZ2ZWIuRmlsZU1hbmFnZXIgPSB7XHJcblx0dHJlZTogZmFsc2UsXHJcblx0cGFnZXM6IHt9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLnRyZWUgPSAkKFwiI2ZpbGVtYW5hZ2VyIC50cmVlID4gb2xcIikuaHRtbChcIlwiKTtcclxuXHJcblx0XHQkKHRoaXMudHJlZSkub24oXCJjbGlja1wiLCBcImxpW2RhdGEtcGFnZV0gc3BhblwiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAjJHskKHRoaXMpLnBhcmVudHMoJ2xpJykuZGF0YSgncGFnZScpfWA7XHJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuXHRcdFx0Ly8gVnZ2ZWIuRmlsZU1hbmFnZXIubG9hZFBhZ2UoJCh0aGlzKS5wYXJlbnRzKFwibGlcIikuZGF0YShcInBhZ2VcIikpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KVxyXG5cdH0sXHJcblxyXG5cdGdldFBhZ2UobmFtZSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucGFnZXNbbmFtZV07XHJcblx0fSxcclxuXHJcblx0YWRkUGFnZTogZnVuY3Rpb24gKG5hbWUsIHRpdGxlLCB1cmwpIHtcclxuXHJcblx0XHR0aGlzLnBhZ2VzW25hbWVdID0ge1xyXG5cdFx0XHRuYW1lLFxyXG5cdFx0XHR0aXRsZSxcclxuXHRcdFx0dXJsXHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMudHJlZS5hcHBlbmQoXHJcblx0XHRcdHRtcGwoXCJ2dnZlYi1maWxlbWFuYWdlci1wYWdlXCIsIHsgbmFtZSwgdGl0bGUsIHVybCB9KSk7XHJcblx0fSxcclxuXHJcblx0YWRkUGFnZXM6IGZ1bmN0aW9uIChwYWdlcykge1xyXG5cdFx0Zm9yIChwYWdlIGluIHBhZ2VzKSB7XHJcblx0XHRcdHRoaXMuYWRkUGFnZShwYWdlc1twYWdlXVsnbmFtZSddLCBwYWdlc1twYWdlXVsndGl0bGUnXSwgcGFnZXNbcGFnZV1bJ3VybCddKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRhZGRDb21wb25lbnQ6IGZ1bmN0aW9uIChuYW1lLCB1cmwsIHRpdGxlLCBwYWdlKSB7XHJcblx0XHQkKFwiW2RhdGEtcGFnZT0nXCIgKyBwYWdlICsgXCInXSA+IG9sXCIsIHRoaXMudHJlZSkuYXBwZW5kKFxyXG5cdFx0XHR0bXBsKFwidnZ2ZWItZmlsZW1hbmFnZXItY29tcG9uZW50XCIsIHsgbmFtZSwgdXJsLCB0aXRsZSB9KSk7XHJcblx0fSxcclxuXHJcblx0c2hvd0FjdGl2ZShuYW1lKSB7XHJcblx0XHQkKFwiW2RhdGEtcGFnZV1cIiwgdGhpcy50cmVlKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdCQoXCJbZGF0YS1wYWdlPSdcIiArIG5hbWUgKyBcIiddXCIsIHRoaXMudHJlZSkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0fSxcclxuXHJcblx0bG9hZFBhZ2U6IGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0XHQkKFwiW2RhdGEtcGFnZV1cIiwgdGhpcy50cmVlKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdCQoXCJbZGF0YS1wYWdlPSdcIiArIG5hbWUgKyBcIiddXCIsIHRoaXMudHJlZSkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblxyXG5cdFx0VnZ2ZWIuQnVpbGRlci5sb2FkVXJsKHRoaXMucGFnZXNbbmFtZV1bJ3VybCddKTtcclxuXHR9LFxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVnZ2ZWI7IiwiY29uc3QgYWx3YXlzVHJ1ZSA9ICgpID0+IHRydWU7XHJcblxyXG4vLyB0aGlzIHJlZmVycyB0byBodG1sIGVsZW1lbnRcclxuZnVuY3Rpb24gcmVtb3ZlVGFnKHsgbmFtZSwgZmlsdGVyID0gYWx3YXlzVHJ1ZSB9KSB7XHJcbiAgICBBcnJheS5mcm9tKHRoaXMuZ2V0RWxlbWVudHNCeVRhZ05hbWUobmFtZSkpXHJcbiAgICAgICAgLmZpbHRlcihmaWx0ZXIpXHJcbiAgICAgICAgLmZvckVhY2godGFnID0+IHRhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhZykpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVVbnVzZWRUYWdzKGh0bWwsIHRhZ3MpIHtcclxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHRtbCcpO1xyXG4gICAgZWwuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIHRhZ3MuZm9yRWFjaChyZW1vdmVUYWcsIGVsKTtcclxuXHJcbiAgICByZXR1cm4gJChlbCkucHJvcCgnb3V0ZXJIVE1MJyk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHJlbW92ZVVudXNlZFRhZ3MgfTsiLCIvLyBUb2dnbGUgZnVsbHNjcmVlblxyXG5mdW5jdGlvbiBsYXVuY2hGdWxsU2NyZWVuKGRvY3VtZW50KSB7XHJcbiAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC5GdWxsU2NyZWVuRWxlbWVudClcclxuICAgICAgICAgICAgZG9jdW1lbnQuZXhpdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgIC8vbW96aWxsYVx0XHRcclxuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC5tb3pGdWxsU2NyZWVuRWxlbWVudClcclxuICAgICAgICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgLy93ZWJraXRcdCAgXHJcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICAvL2llXHQgIFxyXG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQubXNGdWxsU2NyZWVuRWxlbWVudClcclxuICAgICAgICAgICAgZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgbGF1bmNoRnVsbFNjcmVlbiB9OyIsImZ1bmN0aW9uIGRvd25sb2FkQXNUZXh0RmlsZShmaWxlbmFtZSwgdGV4dCkge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgYGRhdGE6dGV4dC9odG1sO2NoYXJzZXQ9dXRmLTgsJHtlbmNvZGVVUklDb21wb25lbnQodGV4dCl9YCk7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBmaWxlbmFtZSk7XHJcblxyXG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuXHJcbiAgICBlbGVtZW50LmNsaWNrKCk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxufVxyXG5cclxuZXhwb3J0IHsgZG93bmxvYWRBc1RleHRGaWxlIH07IiwiLypcclxuQ29weXJpZ2h0IDIwMTcgWmlhZGluIEdpdmFuXHJcblxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cclxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcblxyXG5odHRwczovL2dpdGh1Yi5jb20vZ2l2YW56L1Z2dmViSnNcclxuKi9cclxuaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5pbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuaW1wb3J0IENoZWNrYm94SW5wdXQgZnJvbSAnLi9DaGVja2JveElucHV0JztcclxuaW1wb3J0IFNlbGVjdElucHV0IGZyb20gJy4vU2VsZWN0SW5wdXQnO1xyXG5pbXBvcnQgTGlua0lucHV0IGZyb20gJy4vTGlua0lucHV0JztcclxuaW1wb3J0IFJhbmdlSW5wdXQgZnJvbSAnLi9SYW5nZUlucHV0JztcclxuaW1wb3J0IE51bWJlcklucHV0IGZyb20gJy4vTnVtYmVySW5wdXQnO1xyXG5pbXBvcnQgQ3NzVW5pdElucHV0IGZyb20gJy4vQ3NzVW5pdElucHV0JztcclxuaW1wb3J0IENvbG9ySW5wdXQgZnJvbSAnLi9Db2xvcklucHV0JztcclxuaW1wb3J0IEZpbGVVcGxvYWRJbnB1dCBmcm9tICcuL0ZpbGVVcGxvYWRJbnB1dCc7XHJcbmltcG9ydCBSYWRpb0lucHV0IGZyb20gJy4vUmFkaW9JbnB1dCc7XHJcbmltcG9ydCBSYWRpb0J1dHRvbklucHV0IGZyb20gJy4vUmFkaW9CdXR0b25JbnB1dCc7XHJcbmltcG9ydCBUb2dnbGVJbnB1dCBmcm9tICcuL1RvZ2dsZUlucHV0JztcclxuaW1wb3J0IFZhbHVlVGV4dElucHV0IGZyb20gJy4vVmFsdWVUZXh0SW5wdXQnO1xyXG5pbXBvcnQgR3JpZExheW91dElucHV0IGZyb20gJy4vR3JpZExheW91dElucHV0JztcclxuaW1wb3J0IFByb2R1Y3RzSW5wdXQgZnJvbSAnLi9Qcm9kdWN0c0lucHV0JztcclxuaW1wb3J0IEdyaWRJbnB1dCBmcm9tICcuL0dyaWRJbnB1dCc7XHJcbmltcG9ydCBUZXh0VmFsdWVJbnB1dCBmcm9tICcuL1RleHRWYWx1ZUlucHV0JztcclxuaW1wb3J0IEJ1dHRvbklucHV0IGZyb20gJy4vQnV0dG9uSW5wdXQnO1xyXG5pbXBvcnQgU2VjdGlvbklucHV0IGZyb20gJy4vU2VjdGlvbklucHV0JztcclxuaW1wb3J0IExpc3RJbnB1dCBmcm9tICcuL0xpc3RJbnB1dCc7XHJcblxyXG5leHBvcnQge1xyXG5cdElucHV0LCBUZXh0SW5wdXQsIENoZWNrYm94SW5wdXQsIFNlbGVjdElucHV0LCBMaW5rSW5wdXQsIFJhbmdlSW5wdXQsIE51bWJlcklucHV0LCBDc3NVbml0SW5wdXQsXHJcblx0UmFkaW9JbnB1dCwgUmFkaW9CdXR0b25JbnB1dCwgVG9nZ2xlSW5wdXQsIFZhbHVlVGV4dElucHV0LCBHcmlkTGF5b3V0SW5wdXQsIFByb2R1Y3RzSW5wdXQsIEdyaWRJbnB1dCxcclxuXHRUZXh0VmFsdWVJbnB1dCwgQnV0dG9uSW5wdXQsIFNlY3Rpb25JbnB1dCwgTGlzdElucHV0LCBDb2xvcklucHV0LCBGaWxlVXBsb2FkSW5wdXRcclxufTsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuXHJcbmNvbnN0IFZhbHVlVGV4dElucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImtleXVwXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZhbHVlVGV4dElucHV0OyIsImltcG9ydCBUZXh0SW5wdXQgZnJvbSAnLi9UZXh0SW5wdXQnO1xyXG5cclxuY29uc3QgVG9nZ2xlSW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQsIG5vZGUpIHtcclxuXHRcdGlmIChldmVudC5kYXRhICYmIGV2ZW50LmRhdGEuZWxlbWVudCkge1xyXG5cdFx0XHRldmVudC5kYXRhLmVsZW1lbnQudHJpZ2dlcigncHJvcGVydHlDaGFuZ2UnLCBbdGhpcy5jaGVja2VkID8gdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlLW9uXCIpIDogdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlLW9mZlwiKSwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidG9nZ2xlXCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRvZ2dsZUlucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFRleHRWYWx1ZUlucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XHRbXCJjbGlja1wiLCBcIm9uQ2hhbmdlXCIsIFwiYnV0dG9uXCIgLyonc2VsZWN0JyovXSxcclxuXHRdLFxyXG5cclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHR2YWx1ZVwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGV4dFZhbHVlSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgU2VsZWN0SW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcbiAgICBldmVudHM6IFtcclxuICAgICAgICBbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcInNlbGVjdFwiXSxcclxuICAgIF0sXHJcblxyXG5cclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAkKCdzZWxlY3QnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKFwic2VsZWN0XCIsIGRhdGEpO1xyXG4gICAgfSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlbGVjdElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFNlY3Rpb25JbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNsaWNrXCIsIFwib25DaGFuZ2VcIiwgXCJidXR0b25cIiAvKidzZWxlY3QnKi9dLFxyXG5cdF0sXHJcblxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInNlY3Rpb25pbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFJhbmdlSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJyYW5nZWlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhbmdlSW5wdXQ7IiwiaW1wb3J0IFJhZGlvSW5wdXQgZnJvbSAnLi9SYWRpb0lucHV0JztcclxuXHJcbmNvbnN0IFJhZGlvQnV0dG9uSW5wdXQgPSAkLmV4dGVuZCh7fSwgUmFkaW9JbnB1dCwge1xyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKFwicmFkaW9idXR0b25pbnB1dFwiLCBkYXRhKTtcclxuICAgIH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhZGlvQnV0dG9uSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgUmFkaW9JbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRvbkNoYW5nZTogZnVuY3Rpb24gKGV2ZW50LCBub2RlKSB7XHJcblxyXG5cdFx0aWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS5lbGVtZW50KSB7XHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt0aGlzLnZhbHVlLCB0aGlzXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XHJcblx0XHRpZiAodmFsdWUpXHJcblx0XHRcdCQoXCJpbnB1dFt2YWx1ZT1cIiArIHZhbHVlICsgXCJdXCIsIHRoaXMuZWxlbWVudCkucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJyYWRpb2lucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhZGlvSW5wdXQ7IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBQcm9kdWN0c0lucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImtleXVwXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RzSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxudmFyIE51bWJlcklucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwibnVtYmVyaW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTnVtYmVySW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgTGlzdElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJzZWxlY3RcIl0sXHJcblx0XSxcclxuXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ3NlbGVjdCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwibGlzdGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaXN0SW5wdXQ7IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBMaW5rSW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbmtJbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuXHJcbmNvbnN0IEdyaWRMYXlvdXRJbnB1dCA9ICQuZXh0ZW5kKHt9LCBUZXh0SW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHcmlkTGF5b3V0SW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgR3JpZElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcInNlbGVjdFwiIC8qJ3NlbGVjdCcqL10sXHJcblx0XHRbXCJjbGlja1wiLCBcIm9uQ2hhbmdlXCIsIFwiYnV0dG9uXCIgLyonc2VsZWN0JyovXSxcclxuXHRdLFxyXG5cclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnc2VsZWN0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJncmlkXCIsIGRhdGEpO1xyXG5cdH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHcmlkSW5wdXQ7IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBGaWxlVXBsb2FkSW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmlsZVVwbG9hZElucHV0O1xyXG4iLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBUZXh0SW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcbiAgICBldmVudHM6IFtcclxuICAgICAgICBbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0IF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHRcclxuXHRpbml0OiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxuICB9XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUZXh0SW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgQ3NzVW5pdElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdG51bWJlcjogMCxcclxuXHR1bml0OiBcInB4XCIsXHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpIHtcclxuXHRcdFx0aW5wdXQgPSBldmVudC5kYXRhLmlucHV0O1xyXG5cdFx0XHRpbnB1dFt0aGlzLm5hbWVdID0gdGhpcy52YWx1ZTsvLyB0aGlzLm5hbWUgPSB1bml0IG9yIG51bWJlclx0XHJcblxyXG5cdFx0XHR2YWx1ZSA9IFwiXCI7XHJcblx0XHRcdGlmIChpbnB1dC51bml0ID09IFwiYXV0b1wiKSB7XHJcblx0XHRcdFx0JChldmVudC5kYXRhLmVsZW1lbnQpLmFkZENsYXNzKFwiYXV0b1wiKTtcclxuXHRcdFx0XHR2YWx1ZSA9IGlucHV0LnVuaXQ7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0JChldmVudC5kYXRhLmVsZW1lbnQpLnJlbW92ZUNsYXNzKFwiYXV0b1wiKTtcclxuXHRcdFx0XHR2YWx1ZSA9IGlucHV0Lm51bWJlciArIGlucHV0LnVuaXQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt2YWx1ZSwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJzZWxlY3RcIl0sXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdHRoaXMubnVtYmVyID0gcGFyc2VJbnQodmFsdWUpO1xyXG5cdFx0dGhpcy51bml0ID0gdmFsdWUucmVwbGFjZSh0aGlzLm51bWJlciwgJycpO1xyXG5cclxuXHRcdGlmICh0aGlzLnVuaXQgPT0gXCJhdXRvXCIpICQodGhpcy5lbGVtZW50KS5hZGRDbGFzcyhcImF1dG9cIik7XHJcblxyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh0aGlzLm51bWJlcik7XHJcblx0XHQkKCdzZWxlY3QnLCB0aGlzLmVsZW1lbnQpLnZhbCh0aGlzLnVuaXQpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJjc3N1bml0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3NzVW5pdElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IENvbG9ySW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0Ly9odG1sNSBjb2xvciBpbnB1dCBvbmx5IHN1cHBvcnRzIHNldHRpbmcgdmFsdWVzIGFzIGhleCBjb2xvcnMgZXZlbiBpZiB0aGUgcGlja2VyIHJldHVybnMgb25seSByZ2JcclxuXHRyZ2IyaGV4OiBmdW5jdGlvbiAocmdiKSB7XHJcblxyXG5cdFx0cmdiID0gcmdiLm1hdGNoKC9ecmdiYT9bXFxzK10/XFwoW1xccytdPyhcXGQrKVtcXHMrXT8sW1xccytdPyhcXGQrKVtcXHMrXT8sW1xccytdPyhcXGQrKVtcXHMrXT8vaSk7XHJcblxyXG5cdFx0cmV0dXJuIChyZ2IgJiYgcmdiLmxlbmd0aCA9PT0gNCkgPyBcIiNcIiArXHJcblx0XHRcdChcIjBcIiArIHBhcnNlSW50KHJnYlsxXSwgMTApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpICtcclxuXHRcdFx0KFwiMFwiICsgcGFyc2VJbnQocmdiWzJdLCAxMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMikgK1xyXG5cdFx0XHQoXCIwXCIgKyBwYXJzZUludChyZ2JbM10sIDEwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKSA6IHJnYjtcclxuXHR9LFxyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh0aGlzLnJnYjJoZXgodmFsdWUpKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwiY29sb3JpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb2xvcklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IENoZWNrYm94SW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0b25DaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50LCBub2RlKSB7XHJcblx0XHRcclxuXHRcdGlmIChldmVudC5kYXRhICYmIGV2ZW50LmRhdGEuZWxlbWVudClcclxuXHRcdHtcclxuXHRcdFx0ZXZlbnQuZGF0YS5lbGVtZW50LnRyaWdnZXIoJ3Byb3BlcnR5Q2hhbmdlJywgW3RoaXMuY2hlY2tlZCwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG4gICAgZXZlbnRzOiBbXHJcbiAgICAgICAgW1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHQgXSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cdFxyXG5cdGluaXQ6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImNoZWNrYm94aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxuICB9XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaGVja2JveElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IEJ1dHRvbklucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2xpY2tcIiwgXCJvbkNoYW5nZVwiLCBcImJ1dHRvblwiIC8qJ3NlbGVjdCcqL10sXHJcblx0XSxcclxuXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2J1dHRvbicsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwiYnV0dG9uXCIsIGRhdGEpO1xyXG5cdH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b25JbnB1dDsiLCJjb25zdCBJbnB1dCA9IHtcclxuXHRcclxuXHRpbml0OiBmdW5jdGlvbihuYW1lKSB7XHJcblx0fSxcclxuXHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbihldmVudCwgbm9kZSkge1xyXG5cdFx0XHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpXHJcblx0XHR7XHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt0aGlzLnZhbHVlLCB0aGlzXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0cmVuZGVyVGVtcGxhdGU6IGZ1bmN0aW9uKG5hbWUsIGRhdGEpIHtcclxuXHRcdHJldHVybiB0bXBsKFwidnZ2ZWItaW5wdXQtXCIgKyBuYW1lLCBkYXRhKTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uKG5hbWUsIGRhdGEpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQodGhpcy5yZW5kZXJUZW1wbGF0ZShuYW1lLCBkYXRhKSk7XHJcblx0XHRcclxuXHRcdC8vYmluZCBldmVudHNcclxuXHRcdGlmICh0aGlzLmV2ZW50cylcclxuXHRcdGZvciAodmFyIGkgaW4gdGhpcy5ldmVudHMpXHJcblx0XHR7XHJcblx0XHRcdGV2ZW50ID0gdGhpcy5ldmVudHNbaV1bMF07XHJcblx0XHRcdGZ1biA9IHRoaXNbIHRoaXMuZXZlbnRzW2ldWzFdIF07XHJcblx0XHRcdGVsID0gdGhpcy5ldmVudHNbaV1bMl07XHJcblx0XHRcclxuXHRcdFx0dGhpcy5lbGVtZW50Lm9uKGV2ZW50LCBlbCwge2VsZW1lbnQ6IHRoaXMuZWxlbWVudCwgaW5wdXQ6dGhpc30sIGZ1bik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuZWxlbWVudDtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnB1dDsiLCJjb25zdCBiZ2NvbG9yQ2xhc3NlcyA9IFtcImJnLXByaW1hcnlcIiwgXCJiZy1zZWNvbmRhcnlcIiwgXCJiZy1zdWNjZXNzXCIsIFwiYmctZGFuZ2VyXCIsIFwiYmctd2FybmluZ1wiLCBcImJnLWluZm9cIiwgXCJiZy1saWdodFwiLCBcImJnLWRhcmtcIiwgXCJiZy13aGl0ZVwiXTtcclxuXHJcbmNvbnN0IGJnY29sb3JTZWxlY3RPcHRpb25zID1cclxuICAgIFt7XHJcbiAgICAgICAgdmFsdWU6IFwiRGVmYXVsdFwiLFxyXG4gICAgICAgIHRleHQ6IFwiXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctcHJpbWFyeVwiLFxyXG4gICAgICAgIHRleHQ6IFwiUHJpbWFyeVwiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctc2Vjb25kYXJ5XCIsXHJcbiAgICAgICAgdGV4dDogXCJTZWNvbmRhcnlcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLXN1Y2Nlc3NcIixcclxuICAgICAgICB0ZXh0OiBcIlN1Y2Nlc3NcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLWRhbmdlclwiLFxyXG4gICAgICAgIHRleHQ6IFwiRGFuZ2VyXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy13YXJuaW5nXCIsXHJcbiAgICAgICAgdGV4dDogXCJXYXJuaW5nXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1pbmZvXCIsXHJcbiAgICAgICAgdGV4dDogXCJJbmZvXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1saWdodFwiLFxyXG4gICAgICAgIHRleHQ6IFwiTGlnaHRcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLWRhcmtcIixcclxuICAgICAgICB0ZXh0OiBcIkRhcmtcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLXdoaXRlXCIsXHJcbiAgICAgICAgdGV4dDogXCJXaGl0ZVwiXHJcbiAgICB9XTtcclxuXHJcbmZ1bmN0aW9uIGNoYW5nZU5vZGVOYW1lKG5vZGUsIG5ld05vZGVOYW1lKSB7XHJcbiAgICB2YXIgbmV3Tm9kZTtcclxuICAgIG5ld05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5ld05vZGVOYW1lKTtcclxuICAgIGF0dHJpYnV0ZXMgPSBub2RlLmdldCgwKS5hdHRyaWJ1dGVzO1xyXG5cclxuICAgIGZvciAoaSA9IDAsIGxlbiA9IGF0dHJpYnV0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBuZXdOb2RlLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVzW2ldLm5vZGVOYW1lLCBhdHRyaWJ1dGVzW2ldLm5vZGVWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgJChuZXdOb2RlKS5hcHBlbmQoJChub2RlKS5jb250ZW50cygpKTtcclxuICAgICQobm9kZSkucmVwbGFjZVdpdGgobmV3Tm9kZSk7XHJcblxyXG4gICAgcmV0dXJuIG5ld05vZGU7XHJcbn1cclxuXHJcbmxldCBiYXNlX3NvcnQgPSAxMDA7Ly9zdGFydCBzb3J0aW5nIGZvciBiYXNlIGNvbXBvbmVudCBmcm9tIDEwMCB0byBhbGxvdyBleHRlbmRlZCBwcm9wZXJ0aWVzIHRvIGJlIGZpcnN0XHJcbmZ1bmN0aW9uIGluY19iYXNlX3NvcnQoKSB7XHJcbiAgICByZXR1cm4gYmFzZV9zb3J0Kys7XHJcbn1cclxuXHJcbmNvbnN0IGRhdGFDb21wb25lbnRJZCA9ICdkYXRhLWNvbXBvbmVudC1pZCc7XHJcblxyXG5leHBvcnQgeyBiZ2NvbG9yQ2xhc3NlcywgYmdjb2xvclNlbGVjdE9wdGlvbnMsIGNoYW5nZU5vZGVOYW1lLCBpbmNfYmFzZV9zb3J0LCBkYXRhQ29tcG9uZW50SWQgfTtcclxuIl19
