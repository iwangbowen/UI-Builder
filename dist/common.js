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

					if (property.htmlAttr == "class" && property.validValues) {
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
				if (property.htmlAttr == "style") {
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

},{"./components/common":132,"./inputs/inputs":164,"./util/download":168,"./util/fullScreen":170,"./util/jsoup":171}],171:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
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

},{}],168:[function(require,module,exports){
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

},{}],164:[function(require,module,exports){
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

},{"./ButtonInput":143,"./CheckboxInput":144,"./ColorInput":145,"./CssUnitInput":146,"./FileUploadInput":147,"./GridInput":148,"./GridLayoutInput":149,"./Input":150,"./LinkInput":151,"./ListInput":152,"./NumberInput":153,"./ProductsInput":154,"./RadioButtonInput":155,"./RadioInput":156,"./RangeInput":157,"./SectionInput":158,"./SelectInput":159,"./TextInput":160,"./TextValueInput":161,"./ToggleInput":162,"./ValueTextInput":163}],163:[function(require,module,exports){
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

},{"./TextInput":160}],162:[function(require,module,exports){
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

},{"./TextInput":160}],161:[function(require,module,exports){
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

},{"./Input":150}],159:[function(require,module,exports){
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

},{"./Input":150}],158:[function(require,module,exports){
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

},{"./Input":150}],157:[function(require,module,exports){
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

},{"./Input":150}],155:[function(require,module,exports){
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

},{"./RadioInput":156}],156:[function(require,module,exports){
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

},{"./Input":150}],154:[function(require,module,exports){
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

},{"./TextInput":160}],153:[function(require,module,exports){
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

},{"./Input":150}],152:[function(require,module,exports){
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

},{"./Input":150}],151:[function(require,module,exports){
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

},{"./TextInput":160}],149:[function(require,module,exports){
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

},{"./TextInput":160}],148:[function(require,module,exports){
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

},{"./Input":150}],147:[function(require,module,exports){
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

},{"./TextInput":160}],160:[function(require,module,exports){
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

},{"./Input":150}],146:[function(require,module,exports){
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

},{"./Input":150}],145:[function(require,module,exports){
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

},{"./Input":150}],144:[function(require,module,exports){
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

},{"./Input":150}],143:[function(require,module,exports){
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

},{"./Input":150}],150:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGRlci5qcyIsInNyYy91dGlsL2pzb3VwLmpzIiwic3JjL3V0aWwvZnVsbFNjcmVlbi5qcyIsInNyYy91dGlsL2Rvd25sb2FkLmpzIiwic3JjL2lucHV0cy9pbnB1dHMuanMiLCJzcmMvaW5wdXRzL1ZhbHVlVGV4dElucHV0LmpzIiwic3JjL2lucHV0cy9Ub2dnbGVJbnB1dC5qcyIsInNyYy9pbnB1dHMvVGV4dFZhbHVlSW5wdXQuanMiLCJzcmMvaW5wdXRzL1NlbGVjdElucHV0LmpzIiwic3JjL2lucHV0cy9TZWN0aW9uSW5wdXQuanMiLCJzcmMvaW5wdXRzL1JhbmdlSW5wdXQuanMiLCJzcmMvaW5wdXRzL1JhZGlvQnV0dG9uSW5wdXQuanMiLCJzcmMvaW5wdXRzL1JhZGlvSW5wdXQuanMiLCJzcmMvaW5wdXRzL1Byb2R1Y3RzSW5wdXQuanMiLCJzcmMvaW5wdXRzL051bWJlcklucHV0LmpzIiwic3JjL2lucHV0cy9MaXN0SW5wdXQuanMiLCJzcmMvaW5wdXRzL0xpbmtJbnB1dC5qcyIsInNyYy9pbnB1dHMvR3JpZExheW91dElucHV0LmpzIiwic3JjL2lucHV0cy9HcmlkSW5wdXQuanMiLCJzcmMvaW5wdXRzL0ZpbGVVcGxvYWRJbnB1dC5qcyIsInNyYy9pbnB1dHMvVGV4dElucHV0LmpzIiwic3JjL2lucHV0cy9Dc3NVbml0SW5wdXQuanMiLCJzcmMvaW5wdXRzL0NvbG9ySW5wdXQuanMiLCJzcmMvaW5wdXRzL0NoZWNrYm94SW5wdXQuanMiLCJzcmMvaW5wdXRzL0J1dHRvbklucHV0LmpzIiwic3JjL2lucHV0cy9JbnB1dC5qcyIsInNyYy9jb21wb25lbnRzL2NvbW1vbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNxQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUEsQ0FBQyxZQUFZO0FBQ1osS0FBSSxRQUFRLEVBQVo7O0FBRUEs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O0FBQ0g7O0FBRUQsSUFBTSxrQkFBa0IsbUJBQXhCOztRQUVTLGMsR0FBQSxjO1FBQWdCLG9CLEdBQUEsb0I7UUFBc0IsYyxHQUFBLGM7UUFBZ0IsYSxHQUFBLGE7UUFBZSxlLEdBQUEsZSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qXHJcbkNvcHlyaWdodCAyMDE3IFppYWRpbiBHaXZhblxyXG5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHJcbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG5cclxuaHR0cHM6Ly9naXRodWIuY29tL2dpdmFuL1Z2dmViSnNcclxuKi9cclxuXHJcblxyXG4vLyBTaW1wbGUgSmF2YVNjcmlwdCBUZW1wbGF0aW5nXHJcbi8vIEpvaG4gUmVzaWcgLSBodHRwczovL2pvaG5yZXNpZy5jb20vIC0gTUlUIExpY2Vuc2VkXHJcbmltcG9ydCB7IFNlY3Rpb25JbnB1dCB9IGZyb20gJy4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IHJlbW92ZVVudXNlZFRhZ3MgfSBmcm9tICcuL3V0aWwvanNvdXAnO1xyXG5pbXBvcnQgeyBkb3dubG9hZEFzVGV4dEZpbGUgfSBmcm9tICcuL3V0aWwvZG93bmxvYWQnO1xyXG5pbXBvcnQgeyBsYXVuY2hGdWxsU2NyZWVuIH0gZnJvbSAnLi91dGlsL2Z1bGxTY3JlZW4nO1xyXG5pbXBvcnQgeyBkYXRhQ29tcG9uZW50SWQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29tbW9uJ1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgY2FjaGUgPSB7fTtcclxuXHJcblx0dGhpcy50bXBsID0gZnVuY3Rpb24gdG1wbChzdHIsIGRhdGEpIHtcclxuXHRcdC8vIEZpZ3VyZSBvdXQgaWYgd2UncmUgZ2V0dGluZyBhIHRlbXBsYXRlLCBvciBpZiB3ZSBuZWVkIHRvXHJcblx0XHQvLyBsb2FkIHRoZSB0ZW1wbGF0ZSAtIGFuZCBiZSBzdXJlIHRvIGNhY2hlIHRoZSByZXN1bHQuXHJcblx0XHR2YXIgZm4gPSAvXlstYS16QS1aMC05XSskLy50ZXN0KHN0cikgP1xyXG5cdFx0XHRjYWNoZVtzdHJdID0gY2FjaGVbc3RyXSB8fFxyXG5cdFx0XHR0bXBsKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHN0cikuaW5uZXJIVE1MKSA6XHJcblxyXG5cdFx0XHQvLyBHZW5lcmF0ZSBhIHJldXNhYmxlIGZ1bmN0aW9uIHRoYXQgd2lsbCBzZXJ2ZSBhcyBhIHRlbXBsYXRlXHJcblx0XHRcdC8vIGdlbmVyYXRvciAoYW5kIHdoaWNoIHdpbGwgYmUgY2FjaGVkKS5cclxuXHRcdFx0bmV3IEZ1bmN0aW9uKFwib2JqXCIsXHJcblx0XHRcdFx0XCJ2YXIgcD1bXSxwcmludD1mdW5jdGlvbigpe3AucHVzaC5hcHBseShwLGFyZ3VtZW50cyk7fTtcIiArXHJcblxyXG5cdFx0XHRcdC8vIEludHJvZHVjZSB0aGUgZGF0YSBhcyBsb2NhbCB2YXJpYWJsZXMgdXNpbmcgd2l0aCgpe31cclxuXHRcdFx0XHRcIndpdGgob2JqKXtwLnB1c2goJ1wiICtcclxuXHJcblx0XHRcdFx0Ly8gQ29udmVydCB0aGUgdGVtcGxhdGUgaW50byBwdXJlIEphdmFTY3JpcHRcclxuXHRcdFx0XHRzdHJcclxuXHRcdFx0XHRcdC5yZXBsYWNlKC9bXFxyXFx0XFxuXS9nLCBcIiBcIilcclxuXHRcdFx0XHRcdC5zcGxpdChcInslXCIpLmpvaW4oXCJcXHRcIilcclxuXHRcdFx0XHRcdC5yZXBsYWNlKC8oKF58JX0pW15cXHRdKiknL2csIFwiJDFcXHJcIilcclxuXHRcdFx0XHRcdC5yZXBsYWNlKC9cXHQ9KC4qPyklfS9nLCBcIicsJDEsJ1wiKVxyXG5cdFx0XHRcdFx0LnNwbGl0KFwiXFx0XCIpLmpvaW4oXCInKTtcIilcclxuXHRcdFx0XHRcdC5zcGxpdChcIiV9XCIpLmpvaW4oXCJwLnB1c2goJ1wiKVxyXG5cdFx0XHRcdFx0LnNwbGl0KFwiXFxyXCIpLmpvaW4oXCJcXFxcJ1wiKVxyXG5cdFx0XHRcdCsgXCInKTt9cmV0dXJuIHAuam9pbignJyk7XCIpO1xyXG5cdFx0Ly8gUHJvdmlkZSBzb21lIGJhc2ljIGN1cnJ5aW5nIHRvIHRoZSB1c2VyXHJcblx0XHRyZXR1cm4gZGF0YSA/IGZuKGRhdGEpIDogZm47XHJcblx0fTtcclxufSkoKTtcclxuXHJcbnZhciBkZWxheSA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHRpbWVyID0gMDtcclxuXHRyZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrLCBtcykge1xyXG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuXHRcdHRpbWVyID0gc2V0VGltZW91dChjYWxsYmFjaywgbXMpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5jb25zdCB1bnVzZWRUYWdzID0gW1xyXG5cdC8vIHtcclxuXHQvLyBcdG5hbWU6ICdzY3JpcHQnXHJcblx0Ly8gfSxcclxuXHR7XHJcblx0XHRuYW1lOiAnbGluaycsXHJcblx0XHRmaWx0ZXI6IHRhZyA9PiB0YWcuZ2V0QXR0cmlidXRlKCdyZWwnKSA9PSAnc3R5bGVzaGVldCdcclxuXHRcdFx0JiYgdGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpLmluY2x1ZGVzKCdkcmFnLW4tZHJvcCcpXHJcblx0fSxcclxuXHR7XHJcblx0XHRuYW1lOiAnaHInLFxyXG5cdFx0ZmlsdGVyOiB0YWcgPT4gJCh0YWcpLmhhc0NsYXNzKCdob3Jpem9udGFsLWxpbmUnKVxyXG5cdFx0XHR8fCAkKHRhZykuaGFzQ2xhc3MoJ3ZlcnRpY2FsLWxpbmUnKVxyXG5cdH1cclxuXTtcclxuXHJcbmZ1bmN0aW9uIGdldFN0eWxlKGVsLCBzdHlsZVByb3ApIHtcclxuXHR2YWx1ZSA9IFwiXCI7XHJcblx0Ly92YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbCk7XHJcblx0aWYgKGVsLnN0eWxlICYmIGVsLnN0eWxlLmxlbmd0aCA+IDAgJiYgZWwuc3R5bGVbc3R5bGVQcm9wXSkvL2NoZWNrIGlubGluZVxyXG5cdFx0dmFyIHZhbHVlID0gZWwuc3R5bGVbc3R5bGVQcm9wXTtcclxuXHRlbHNlXHJcblx0XHRpZiAoZWwuY3VycmVudFN0eWxlKVx0Ly9jaGVjayBkZWZpbmVkIGNzc1xyXG5cdFx0XHR2YXIgdmFsdWUgPSBlbC5jdXJyZW50U3R5bGVbc3R5bGVQcm9wXTtcclxuXHRcdGVsc2UgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XHJcblx0XHRcdHZhciB2YWx1ZSA9IGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldERlZmF1bHRDb21wdXRlZFN0eWxlID9cclxuXHRcdFx0XHRkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXREZWZhdWx0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZVByb3ApIDpcclxuXHRcdFx0XHR3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZVByb3ApO1xyXG5cdFx0fVxyXG5cclxuXHRyZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmlmIChWdnZlYiA9PT0gdW5kZWZpbmVkKSB2YXIgVnZ2ZWIgPSB7fTtcclxuXHJcblZ2dmViLmRlZmF1bHRDb21wb25lbnQgPSBcIl9iYXNlXCI7XHJcblZ2dmViLnByZXNlcnZlUHJvcGVydHlTZWN0aW9ucyA9IHRydWU7XHJcblxyXG5WdnZlYi5iYXNlVXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdCA/IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjLnJlcGxhY2UoL1teXFwvXSo/XFwuanMkLywgJycpIDogJyc7XHJcblxyXG5WdnZlYi5Db21wb25lbnRzR3JvdXAgPSB7fTtcclxuXHJcblZ2dmViLkNvbXBvbmVudHMgPSB7XHJcblx0X2NvbXBvbmVudHM6IHt9LFxyXG5cclxuXHRfbm9kZXNMb29rdXA6IHt9LFxyXG5cclxuXHRfYXR0cmlidXRlc0xvb2t1cDoge30sXHJcblxyXG5cdF9jbGFzc2VzTG9va3VwOiB7fSxcclxuXHJcblx0X2NsYXNzZXNSZWdleExvb2t1cDoge30sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uICh1cmwpIHtcclxuXHR9LFxyXG5cclxuXHRnZXQ6IGZ1bmN0aW9uICh0eXBlKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY29tcG9uZW50c1t0eXBlXTtcclxuXHR9LFxyXG5cclxuXHRhZGQ6IGZ1bmN0aW9uICh0eXBlLCBkYXRhKSB7XHJcblx0XHRkYXRhLnR5cGUgPSB0eXBlO1xyXG5cclxuXHRcdHRoaXMuX2NvbXBvbmVudHNbdHlwZV0gPSBkYXRhO1xyXG5cclxuXHRcdGlmIChkYXRhLm5vZGVzKSB7XHJcblx0XHRcdGZvciAodmFyIGkgaW4gZGF0YS5ub2Rlcykge1xyXG5cdFx0XHRcdHRoaXMuX25vZGVzTG9va3VwW2RhdGEubm9kZXNbaV1dID0gZGF0YTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkYXRhLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0aWYgKGRhdGEuYXR0cmlidXRlcy5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcclxuXHRcdFx0XHRmb3IgKHZhciBpIGluIGRhdGEuYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlc0xvb2t1cFtkYXRhLmF0dHJpYnV0ZXNbaV1dID0gZGF0YTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSBpbiBkYXRhLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5fYXR0cmlidXRlc0xvb2t1cFtpXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlc0xvb2t1cFtpXSA9IHt9O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChkYXRhLmF0dHJpYnV0ZXNbaV0uY29uc3RydWN0b3IgPT09IEFycmF5KSB7XHJcblx0XHRcdFx0XHRcdC8vIOaUr+aMgXRleHRpbnB1dOS4reS4jeWQjOeahOi+k+WFpeexu+Wei2F0dHJpYnV0ZXM6IHsgXCJ0eXBlXCI6IFsndGV4dCcsICdwYXNzd29yZCddIH0sXHJcblx0XHRcdFx0XHRcdGRhdGEuYXR0cmlidXRlc1tpXS5mb3JFYWNoKHZhbHVlID0+IHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2ldW3ZhbHVlXSA9IGRhdGE7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlc0xvb2t1cFtpXVtkYXRhLmF0dHJpYnV0ZXNbaV1dID0gZGF0YTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZGF0YS5jbGFzc2VzKSB7XHJcblx0XHRcdGZvciAodmFyIGkgaW4gZGF0YS5jbGFzc2VzKSB7XHJcblx0XHRcdFx0dGhpcy5fY2xhc3Nlc0xvb2t1cFtkYXRhLmNsYXNzZXNbaV1dID0gZGF0YTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkYXRhLmNsYXNzZXNSZWdleCkge1xyXG5cdFx0XHRmb3IgKHZhciBpIGluIGRhdGEuY2xhc3Nlc1JlZ2V4KSB7XHJcblx0XHRcdFx0dGhpcy5fY2xhc3Nlc1JlZ2V4TG9va3VwW2RhdGEuY2xhc3Nlc1JlZ2V4W2ldXSA9IGRhdGE7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRleHRlbmQ6IGZ1bmN0aW9uIChpbmhlcml0VHlwZSwgdHlwZSwgZGF0YSkge1xyXG5cclxuXHRcdG5ld0RhdGEgPSBkYXRhO1xyXG5cclxuXHRcdGlmIChpbmhlcml0RGF0YSA9IHRoaXMuX2NvbXBvbmVudHNbaW5oZXJpdFR5cGVdKSB7XHJcblx0XHRcdG5ld0RhdGEgPSAkLmV4dGVuZCh0cnVlLCB7fSwgaW5oZXJpdERhdGEsIGRhdGEpO1xyXG5cdFx0XHRuZXdEYXRhLnByb3BlcnRpZXMgPSAkLm1lcmdlKCQubWVyZ2UoW10sIGluaGVyaXREYXRhLnByb3BlcnRpZXMgPyBpbmhlcml0RGF0YS5wcm9wZXJ0aWVzIDogW10pLCBkYXRhLnByb3BlcnRpZXMgPyBkYXRhLnByb3BlcnRpZXMgOiBbXSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly9zb3J0IGJ5IG9yZGVyXHJcblx0XHRuZXdEYXRhLnByb3BlcnRpZXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG5cdFx0XHRpZiAodHlwZW9mIGEuc29ydCA9PT0gXCJ1bmRlZmluZWRcIikgYS5zb3J0ID0gMDtcclxuXHRcdFx0aWYgKHR5cGVvZiBiLnNvcnQgPT09IFwidW5kZWZpbmVkXCIpIGIuc29ydCA9IDA7XHJcblxyXG5cdFx0XHRpZiAoYS5zb3J0IDwgYi5zb3J0KVxyXG5cdFx0XHRcdHJldHVybiAtMTtcclxuXHRcdFx0aWYgKGEuc29ydCA+IGIuc29ydClcclxuXHRcdFx0XHRyZXR1cm4gMTtcclxuXHRcdFx0cmV0dXJuIDA7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0dGhpcy5hZGQodHlwZSwgbmV3RGF0YSk7XHJcblx0fSxcclxuXHJcblxyXG5cdG1hdGNoTm9kZTogZnVuY3Rpb24gKG5vZGUpIHtcclxuXHRcdGlmICgkKG5vZGUpLmF0dHIoZGF0YUNvbXBvbmVudElkKSAmJiB0aGlzLl9jb21wb25lbnRzWyQobm9kZSkuYXR0cihkYXRhQ29tcG9uZW50SWQpXSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fY29tcG9uZW50c1skKG5vZGUpLmF0dHIoZGF0YUNvbXBvbmVudElkKV07XHJcblx0XHR9IGVsc2UgaWYgKCQobm9kZSkuYXR0cigndHlwZScpID09ICdyYWRpbycgfHwgJChub2RlKS5hdHRyKCd0eXBlJykgPT0gJ2NoZWNrYm94Jykge1xyXG5cdFx0XHRjb25zdCAkcGFyZW50ID0gJChub2RlKS5wYXJlbnQoKTtcclxuXHRcdFx0aWYgKCRwYXJlbnQuYXR0cihkYXRhQ29tcG9uZW50SWQpICYmIHRoaXMuX2NvbXBvbmVudHNbJHBhcmVudC5hdHRyKGRhdGFDb21wb25lbnRJZCldKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2NvbXBvbmVudHNbJHBhcmVudC5hdHRyKGRhdGFDb21wb25lbnRJZCldXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAobm9kZS5hdHRyaWJ1dGVzLmxlbmd0aCkge1xyXG5cdFx0XHQvL3NlYXJjaCBmb3IgYXR0cmlidXRlc1xyXG5cdFx0XHRmb3IgKHZhciBpIGluIG5vZGUuYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdGF0dHIgPSBub2RlLmF0dHJpYnV0ZXNbaV0ubmFtZTtcclxuXHRcdFx0XHR2YWx1ZSA9IG5vZGUuYXR0cmlidXRlc1tpXS52YWx1ZTtcclxuXHJcblx0XHRcdFx0aWYgKGF0dHIgaW4gdGhpcy5fYXR0cmlidXRlc0xvb2t1cCkge1xyXG5cdFx0XHRcdFx0Y29tcG9uZW50ID0gdGhpcy5fYXR0cmlidXRlc0xvb2t1cFthdHRyXTtcclxuXHJcblx0XHRcdFx0XHQvL2N1cnJlbnRseSB3ZSBjaGVjayB0aGF0IGlzIG5vdCBhIGNvbXBvbmVudCBieSBsb29raW5nIGF0IG5hbWUgYXR0cmlidXRlXHJcblx0XHRcdFx0XHQvL2lmIHdlIGhhdmUgYSBjb2xsZWN0aW9uIG9mIG9iamVjdHMgaXQgbWVhbnMgdGhhdCBhdHRyaWJ1dGUgdmFsdWUgbXVzdCBiZSBjaGVja2VkXHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIGNvbXBvbmVudFtcIm5hbWVcIl0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHZhbHVlIGluIGNvbXBvbmVudCkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBjb21wb25lbnRbdmFsdWVdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2VcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGNvbXBvbmVudDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZvciAodmFyIGkgaW4gbm9kZS5hdHRyaWJ1dGVzKSB7XHJcblx0XHRcdFx0YXR0ciA9IG5vZGUuYXR0cmlidXRlc1tpXS5uYW1lO1xyXG5cdFx0XHRcdHZhbHVlID0gbm9kZS5hdHRyaWJ1dGVzW2ldLnZhbHVlO1xyXG5cclxuXHRcdFx0XHQvL2NoZWNrIGZvciBub2RlIGNsYXNzZXNcclxuXHRcdFx0XHRpZiAoYXR0ciA9PSBcImNsYXNzXCIpIHtcclxuXHRcdFx0XHRcdGNsYXNzZXMgPSB2YWx1ZS5zcGxpdChcIiBcIik7XHJcblxyXG5cdFx0XHRcdFx0Zm9yIChqIGluIGNsYXNzZXMpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGNsYXNzZXNbal0gaW4gdGhpcy5fY2xhc3Nlc0xvb2t1cClcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fY2xhc3Nlc0xvb2t1cFtjbGFzc2VzW2pdXTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRmb3IgKHJlZ2V4IGluIHRoaXMuX2NsYXNzZXNSZWdleExvb2t1cCkge1xyXG5cdFx0XHRcdFx0XHRyZWdleE9iaiA9IG5ldyBSZWdFeHAocmVnZXgpO1xyXG5cdFx0XHRcdFx0XHRpZiAocmVnZXhPYmouZXhlYyh2YWx1ZSkpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fY2xhc3Nlc1JlZ2V4TG9va3VwW3JlZ2V4XTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRhZ05hbWUgPSBub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcclxuXHRcdGlmICh0YWdOYW1lIGluIHRoaXMuX25vZGVzTG9va3VwKSByZXR1cm4gdGhpcy5fbm9kZXNMb29rdXBbdGFnTmFtZV07XHJcblxyXG5cdFx0Ly9yZXR1cm4gZmFsc2U7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXQoVnZ2ZWIuZGVmYXVsdENvbXBvbmVudCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAodHlwZSkge1xyXG5cclxuXHRcdGNvbXBvbmVudCA9IHRoaXMuX2NvbXBvbmVudHNbdHlwZV07XHJcblxyXG5cdFx0cmlnaHRQYW5lbCA9IGpRdWVyeShcIiNyaWdodC1wYW5lbCAjY29tcG9uZW50LXByb3BlcnRpZXNcIik7XHJcblx0XHRzZWN0aW9uID0gcmlnaHRQYW5lbC5maW5kKCcuc2VjdGlvbltkYXRhLXNlY3Rpb249XCJkZWZhdWx0XCJdJyk7XHJcblxyXG5cdFx0aWYgKCEoVnZ2ZWIucHJlc2VydmVQcm9wZXJ0eVNlY3Rpb25zICYmIHNlY3Rpb24ubGVuZ3RoKSkge1xyXG5cdFx0XHRyaWdodFBhbmVsLmh0bWwoJycpLmFwcGVuZCh0bXBsKFwidnZ2ZWItaW5wdXQtc2VjdGlvbmlucHV0XCIsIHsga2V5OiBcImRlZmF1bHRcIiwgaGVhZGVyOiBjb21wb25lbnQubmFtZSB9KSk7XHJcblx0XHRcdHNlY3Rpb24gPSByaWdodFBhbmVsLmZpbmQoXCIuc2VjdGlvblwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRyaWdodFBhbmVsLmZpbmQoJ1tkYXRhLWhlYWRlcj1cImRlZmF1bHRcIl0gc3BhbicpLmh0bWwoY29tcG9uZW50Lm5hbWUpO1xyXG5cdFx0c2VjdGlvbi5odG1sKFwiXCIpXHJcblxyXG5cdFx0aWYgKGNvbXBvbmVudC5iZWZvcmVJbml0KSBjb21wb25lbnQuYmVmb3JlSW5pdChWdnZlYi5CdWlsZGVyLnNlbGVjdGVkRWwuZ2V0KDApKTtcclxuXHJcblx0XHRmbiA9IGZ1bmN0aW9uIChjb21wb25lbnQsIHByb3BlcnR5KSB7XHJcblx0XHRcdHJldHVybiBwcm9wZXJ0eS5pbnB1dC5vbigncHJvcGVydHlDaGFuZ2UnLCBmdW5jdGlvbiAoZXZlbnQsIHZhbHVlLCBpbnB1dCkge1xyXG5cdFx0XHRcdGVsZW1lbnQgPSBWdnZlYi5CdWlsZGVyLnNlbGVjdGVkRWw7XHJcblx0XHRcdFx0aWYgKHByb3BlcnR5LmNoaWxkKSBlbGVtZW50ID0gZWxlbWVudC5maW5kKHByb3BlcnR5LmNoaWxkKTtcclxuXHRcdFx0XHRpZiAocHJvcGVydHkucGFyZW50KSBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnQocHJvcGVydHkucGFyZW50KTtcclxuXHJcblx0XHRcdFx0aWYgKHByb3BlcnR5Lm9uQ2hhbmdlKSB7XHJcblx0XHRcdFx0XHRlbGVtZW50ID0gcHJvcGVydHkub25DaGFuZ2UoZWxlbWVudCwgdmFsdWUsIGlucHV0LCBjb21wb25lbnQpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHkuaHRtbEF0dHIpIHtcclxuXHRcdFx0XHRcdG9sZFZhbHVlID0gZWxlbWVudC5hdHRyKHByb3BlcnR5Lmh0bWxBdHRyKTtcclxuXHJcblx0XHRcdFx0XHRpZiAocHJvcGVydHkuaHRtbEF0dHIgPT0gXCJjbGFzc1wiICYmIHByb3BlcnR5LnZhbGlkVmFsdWVzKSB7XHJcblx0XHRcdFx0XHRcdGVsZW1lbnQucmVtb3ZlQ2xhc3MocHJvcGVydHkudmFsaWRWYWx1ZXMuam9pbihcIiBcIikpO1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5hZGRDbGFzcyh2YWx1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChwcm9wZXJ0eS5odG1sQXR0ciA9PSBcInN0eWxlXCIpIHtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQuY3NzKHByb3BlcnR5LmtleSwgdmFsdWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LmF0dHIocHJvcGVydHkuaHRtbEF0dHIsIHZhbHVlKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0XHRcdFx0dHlwZTogJ2F0dHJpYnV0ZXMnLFxyXG5cdFx0XHRcdFx0XHR0YXJnZXQ6IGVsZW1lbnQuZ2V0KDApLFxyXG5cdFx0XHRcdFx0XHRhdHRyaWJ1dGVOYW1lOiBwcm9wZXJ0eS5odG1sQXR0cixcclxuXHRcdFx0XHRcdFx0b2xkVmFsdWU6IG9sZFZhbHVlLFxyXG5cdFx0XHRcdFx0XHRuZXdWYWx1ZTogZWxlbWVudC5hdHRyKHByb3BlcnR5Lmh0bWxBdHRyKVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoY29tcG9uZW50Lm9uQ2hhbmdlKSB7XHJcblx0XHRcdFx0XHRlbGVtZW50ID0gY29tcG9uZW50Lm9uQ2hhbmdlKGVsZW1lbnQsIHByb3BlcnR5LCB2YWx1ZSwgaW5wdXQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCFwcm9wZXJ0eS5jaGlsZCAmJiAhcHJvcGVydHkucGFyZW50KSBWdnZlYi5CdWlsZGVyLnNlbGVjdE5vZGUoZWxlbWVudCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHRub2RlRWxlbWVudCA9IFZ2dmViLkJ1aWxkZXIuc2VsZWN0ZWRFbDtcclxuXHJcblx0XHRmb3IgKHZhciBpIGluIGNvbXBvbmVudC5wcm9wZXJ0aWVzKSB7XHJcblx0XHRcdHByb3BlcnR5ID0gY29tcG9uZW50LnByb3BlcnRpZXNbaV07XHJcblxyXG5cdFx0XHRpZiAocHJvcGVydHkuYmVmb3JlSW5pdCkgcHJvcGVydHkuYmVmb3JlSW5pdChlbGVtZW50LmdldCgwKSlcclxuXHJcblx0XHRcdGVsZW1lbnQgPSBub2RlRWxlbWVudDtcclxuXHRcdFx0aWYgKHByb3BlcnR5LmNoaWxkKSBlbGVtZW50ID0gZWxlbWVudC5maW5kKHByb3BlcnR5LmNoaWxkKTtcclxuXHJcblx0XHRcdGlmIChwcm9wZXJ0eS5kYXRhKSB7XHJcblx0XHRcdFx0cHJvcGVydHkuZGF0YVtcImtleVwiXSA9IHByb3BlcnR5LmtleTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRwcm9wZXJ0eS5kYXRhID0geyBcImtleVwiOiBwcm9wZXJ0eS5rZXkgfTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiBwcm9wZXJ0eS5ncm91cCA9PT0gJ3VuZGVmaW5lZCcpIHByb3BlcnR5Lmdyb3VwID0gbnVsbDtcclxuXHJcblx0XHRcdHByb3BlcnR5LmlucHV0ID0gcHJvcGVydHkuaW5wdXR0eXBlLmluaXQocHJvcGVydHkuZGF0YSk7XHJcblxyXG5cdFx0XHRpZiAocHJvcGVydHkuaW5pdCkge1xyXG5cdFx0XHRcdHByb3BlcnR5LmlucHV0dHlwZS5zZXRWYWx1ZShwcm9wZXJ0eS5pbml0KGVsZW1lbnQuZ2V0KDApKSk7XHJcblx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHkuaHRtbEF0dHIpIHtcclxuXHRcdFx0XHRpZiAocHJvcGVydHkuaHRtbEF0dHIgPT0gXCJzdHlsZVwiKSB7XHJcblx0XHRcdFx0XHQvL3ZhbHVlID0gZWxlbWVudC5jc3MocHJvcGVydHkua2V5KTsvL2pxdWVyeSBjc3MgcmV0dXJucyBjb21wdXRlZCBzdHlsZVxyXG5cdFx0XHRcdFx0dmFsdWUgPSBnZXRTdHlsZShlbGVtZW50LmdldCgwKSwgcHJvcGVydHkua2V5KTsvL2dldFN0eWxlIHJldHVybnMgZGVjbGFyZWQgc3R5bGVcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dmFsdWUgPSBlbGVtZW50LmF0dHIocHJvcGVydHkuaHRtbEF0dHIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly9pZiBhdHRyaWJ1dGUgaXMgY2xhc3MgY2hlY2sgaWYgb25lIG9mIHZhbGlkIHZhbHVlcyBpcyBpbmNsdWRlZCBhcyBjbGFzcyB0byBzZXQgdGhlIHNlbGVjdFxyXG5cdFx0XHRcdGlmICh2YWx1ZSAmJiBwcm9wZXJ0eS5odG1sQXR0ciA9PSBcImNsYXNzXCIgJiYgcHJvcGVydHkudmFsaWRWYWx1ZXMpIHtcclxuXHRcdFx0XHRcdHZhbHVlID0gdmFsdWUuc3BsaXQoXCIgXCIpLmZpbHRlcihmdW5jdGlvbiAoZWwpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHByb3BlcnR5LnZhbGlkVmFsdWVzLmluZGV4T2YoZWwpICE9IC0xXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHByb3BlcnR5LmlucHV0dHlwZS5zZXRWYWx1ZSh2YWx1ZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZuKGNvbXBvbmVudCwgcHJvcGVydHkpO1xyXG5cclxuXHRcdFx0aWYgKHByb3BlcnR5LmlucHV0dHlwZSA9PSBTZWN0aW9uSW5wdXQpIHtcclxuXHRcdFx0XHRzZWN0aW9uID0gcmlnaHRQYW5lbC5maW5kKCcuc2VjdGlvbltkYXRhLXNlY3Rpb249XCInICsgcHJvcGVydHkua2V5ICsgJ1wiXScpO1xyXG5cclxuXHRcdFx0XHRpZiAoVnZ2ZWIucHJlc2VydmVQcm9wZXJ0eVNlY3Rpb25zICYmIHNlY3Rpb24ubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRzZWN0aW9uLmh0bWwoXCJcIik7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJpZ2h0UGFuZWwuYXBwZW5kKHByb3BlcnR5LmlucHV0KTtcclxuXHRcdFx0XHRcdHNlY3Rpb24gPSByaWdodFBhbmVsLmZpbmQoJy5zZWN0aW9uW2RhdGEtc2VjdGlvbj1cIicgKyBwcm9wZXJ0eS5rZXkgKyAnXCJdJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHJvdyA9ICQodG1wbCgndnZ2ZWItcHJvcGVydHknLCBwcm9wZXJ0eSkpO1xyXG5cdFx0XHRcdHJvdy5maW5kKCcuaW5wdXQnKS5hcHBlbmQocHJvcGVydHkuaW5wdXQpO1xyXG5cdFx0XHRcdHNlY3Rpb24uYXBwZW5kKHJvdyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY29tcG9uZW50LmluaXQpIGNvbXBvbmVudC5pbml0KFZ2dmViLkJ1aWxkZXIuc2VsZWN0ZWRFbC5nZXQoMCkpO1xyXG5cdH1cclxufTtcclxuXHJcblxyXG5cclxuVnZ2ZWIuV3lzaXd5Z0VkaXRvciA9IHtcclxuXHJcblx0aXNBY3RpdmU6IGZhbHNlLFxyXG5cdG9sZFZhbHVlOiAnJyxcclxuXHRkb2M6IGZhbHNlLFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZG9jKSB7XHJcblx0XHR0aGlzLmRvYyA9IGRvYztcclxuXHJcblx0XHQkKFwiI2JvbGQtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCdib2xkJywgZmFsc2UsIG51bGwpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjaXRhbGljLWJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGRvYy5leGVjQ29tbWFuZCgnaXRhbGljJywgZmFsc2UsIG51bGwpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjdW5kZXJsaW5lLWJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGRvYy5leGVjQ29tbWFuZCgndW5kZXJsaW5lJywgZmFsc2UsIG51bGwpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjc3RyaWtlLWJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGRvYy5leGVjQ29tbWFuZCgnc3RyaWtlVGhyb3VnaCcsIGZhbHNlLCBudWxsKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI2xpbmstYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCdjcmVhdGVMaW5rJywgZmFsc2UsIFwiI1wiKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHR1bmRvOiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5kb2MuZXhlY0NvbW1hbmQoJ3VuZG8nLCBmYWxzZSwgbnVsbCk7XHJcblx0fSxcclxuXHJcblx0cmVkbzogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdyZWRvJywgZmFsc2UsIG51bGwpO1xyXG5cdH0sXHJcblxyXG5cdGVkaXQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHRlbGVtZW50LmF0dHIoeyAnY29udGVudGVkaXRhYmxlJzogdHJ1ZSwgJ3NwZWxsY2hlY2trZXInOiBmYWxzZSB9KTtcclxuXHRcdCQoXCIjd3lzaXd5Zy1lZGl0b3JcIikuc2hvdygpO1xyXG5cclxuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcblx0XHR0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcclxuXHRcdHRoaXMub2xkVmFsdWUgPSBlbGVtZW50Lmh0bWwoKTtcclxuXHR9LFxyXG5cclxuXHRkZXN0cm95OiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0ZWxlbWVudC5yZW1vdmVBdHRyKCdjb250ZW50ZWRpdGFibGUgc3BlbGxjaGVja2tlcicpO1xyXG5cdFx0JChcIiN3eXNpd3lnLWVkaXRvclwiKS5oaWRlKCk7XHJcblx0XHR0aGlzLmlzQWN0aXZlID0gZmFsc2U7XHJcblxyXG5cclxuXHRcdG5vZGUgPSB0aGlzLmVsZW1lbnQuZ2V0KDApO1xyXG5cdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdHR5cGU6ICdjaGFyYWN0ZXJEYXRhJyxcclxuXHRcdFx0dGFyZ2V0OiBub2RlLFxyXG5cdFx0XHRvbGRWYWx1ZTogdGhpcy5vbGRWYWx1ZSxcclxuXHRcdFx0bmV3VmFsdWU6IG5vZGUuaW5uZXJIVE1MXHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcblZ2dmViLkJ1aWxkZXIgPSB7XHJcblxyXG5cdGRyYWdNb3ZlTXV0YXRpb246IGZhbHNlLFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAodXJsLCBjYWxsYmFjaykge1xyXG5cclxuXHRcdHNlbGYgPSB0aGlzO1xyXG5cclxuXHRcdHNlbGYubG9hZENvbnRyb2xHcm91cHMoKTtcclxuXHJcblx0XHRzZWxmLnNlbGVjdGVkRWwgPSBudWxsO1xyXG5cdFx0c2VsZi5oaWdobGlnaHRFbCA9IG51bGw7XHJcblx0XHRzZWxmLmluaXRDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cclxuXHRcdHNlbGYuZG9jdW1lbnRGcmFtZSA9ICQoXCIjaWZyYW1lLXdyYXBwZXIgPiBpZnJhbWVcIik7XHJcblx0XHRzZWxmLmNhbnZhcyA9ICQoXCIjY2FudmFzXCIpO1xyXG5cclxuXHRcdHNlbGYuX2xvYWRJZnJhbWUodXJsKTtcclxuXHJcblx0XHRzZWxmLl9pbml0RHJhZ2Ryb3AoKTtcclxuXHJcblx0XHRzZWxmLmRyYWdFbGVtZW50ID0gbnVsbDtcclxuXHR9LFxyXG5cclxuXHQvKiBjb250cm9scyAqL1xyXG5cdGxvYWRDb250cm9sR3JvdXBzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0Y29tcG9uZW50c0xpc3QgPSAkKFwiI2NvbXBvbmVudHMtbGlzdFwiKTtcclxuXHRcdGNvbXBvbmVudHNMaXN0LmVtcHR5KCk7XHJcblxyXG5cdFx0Zm9yIChncm91cCBpbiBWdnZlYi5Db21wb25lbnRzR3JvdXApIHtcclxuXHRcdFx0Y29tcG9uZW50c0xpc3QuYXBwZW5kKCc8bGkgY2xhc3M9XCJoZWFkZXJcIiBkYXRhLXNlY3Rpb249XCInICsgZ3JvdXAgKyAnXCIgIGRhdGEtc2VhcmNoPVwiXCI+PGxhYmVsIGNsYXNzPVwiaGVhZGVyXCIgZm9yPVwiY29tcGhlYWRfJyArIGdyb3VwICsgJ1wiPicgKyBncm91cCArICcgIDxkaXYgY2xhc3M9XCJoZWFkZXItYXJyb3dcIj48L2Rpdj5cXFxyXG5cdFx0XHRcdFx0XHRcdFx0ICAgPC9sYWJlbD48aW5wdXQgY2xhc3M9XCJoZWFkZXJfY2hlY2tcIiB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPVwidHJ1ZVwiIGlkPVwiY29tcGhlYWRfJyArIGdyb3VwICsgJ1wiPiAgPG9sPjwvb2w+PC9saT4nKTtcclxuXHJcblx0XHRcdGNvbXBvbmVudHNTdWJMaXN0ID0gY29tcG9uZW50c0xpc3QuZmluZCgnbGlbZGF0YS1zZWN0aW9uPVwiJyArIGdyb3VwICsgJ1wiXSAgb2wnKTtcclxuXHJcblx0XHRcdGNvbXBvbmVudHMgPSBWdnZlYi5Db21wb25lbnRzR3JvdXBbZ3JvdXBdO1xyXG5cclxuXHRcdFx0Zm9yIChpIGluIGNvbXBvbmVudHMpIHtcclxuXHRcdFx0XHRjb21wb25lbnRUeXBlID0gY29tcG9uZW50c1tpXTtcclxuXHRcdFx0XHRjb21wb25lbnQgPSBWdnZlYi5Db21wb25lbnRzLmdldChjb21wb25lbnRUeXBlKTtcclxuXHJcblx0XHRcdFx0aWYgKGNvbXBvbmVudCkge1xyXG5cdFx0XHRcdFx0aXRlbSA9ICQoJzxsaSBkYXRhLXNlY3Rpb249XCInICsgZ3JvdXAgKyAnXCIgZGF0YS10eXBlPVwiJyArIGNvbXBvbmVudFR5cGUgKyAnXCIgZGF0YS1zZWFyY2g9XCInICsgY29tcG9uZW50Lm5hbWUudG9Mb3dlckNhc2UoKSArICdcIj48YSBocmVmPVwiI1wiPicgKyBjb21wb25lbnQubmFtZSArIFwiPC9hPjwvbGk+XCIpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChjb21wb25lbnQuaW1hZ2UpIHtcclxuXHJcblx0XHRcdFx0XHRcdGl0ZW0uY3NzKHtcclxuXHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKFwiICsgJ2xpYnMvYnVpbGRlci8nICsgY29tcG9uZW50LmltYWdlICsgXCIpXCIsXHJcblx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZFJlcGVhdDogXCJuby1yZXBlYXRcIlxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGNvbXBvbmVudHNTdWJMaXN0LmFwcGVuZChpdGVtKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGxvYWRVcmw6IGZ1bmN0aW9uICh1cmwpIHtcclxuXHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmhpZGUoKTtcclxuXHRcdHNlbGYuaWZyYW1lLnNyYyA9IHVybDtcclxuXHR9LFxyXG5cclxuXHQvKiBpZnJhbWUgKi9cclxuXHRfbG9hZElmcmFtZTogZnVuY3Rpb24gKHVybCkge1xyXG5cclxuXHRcdHNlbGYuaWZyYW1lID0gdGhpcy5kb2N1bWVudEZyYW1lLmdldCgwKTtcclxuXHRcdHNlbGYuaWZyYW1lLnNyYyA9IHVybDtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5kb2N1bWVudEZyYW1lLm9uKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHR3aW5kb3cuRnJhbWVXaW5kb3cgPSBzZWxmLmlmcmFtZS5jb250ZW50V2luZG93O1xyXG5cdFx0XHR3aW5kb3cuRnJhbWVEb2N1bWVudCA9IHNlbGYuaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XHJcblxyXG5cdFx0XHRWdnZlYi5XeXNpd3lnRWRpdG9yLmluaXQod2luZG93LkZyYW1lRG9jdW1lbnQpO1xyXG5cdFx0XHRpZiAoc2VsZi5pbml0Q2FsbGJhY2spIHNlbGYuaW5pdENhbGxiYWNrKCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gc2VsZi5fZnJhbWVMb2FkZWQoKTtcclxuXHRcdH0pO1xyXG5cclxuXHR9LFxyXG5cclxuXHRfZnJhbWVMb2FkZWQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRzZWxmLmZyYW1lRG9jID0gJCh3aW5kb3cuRnJhbWVEb2N1bWVudCk7XHJcblx0XHRzZWxmLmZyYW1lSHRtbCA9ICQod2luZG93LkZyYW1lRG9jdW1lbnQpLmZpbmQoXCJodG1sXCIpO1xyXG5cdFx0c2VsZi5mcmFtZUJvZHkgPSAkKHdpbmRvdy5GcmFtZURvY3VtZW50KS5maW5kKFwiYm9keVwiKTtcclxuXHJcblx0XHR0aGlzLl9pbml0SGlnaHRsaWdodCgpO1xyXG5cdH0sXHJcblxyXG5cdF9nZXRFbGVtZW50VHlwZTogZnVuY3Rpb24gKGVsKSB7XHJcblxyXG5cdFx0Ly9zZWFyY2ggZm9yIGNvbXBvbmVudCBhdHRyaWJ1dGVcclxuXHRcdGNvbXBvbmVudE5hbWUgPSAnJztcclxuXHJcblx0XHRpZiAoZWwuYXR0cmlidXRlcylcclxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaisrKSB7XHJcblxyXG5cdFx0XHRcdGlmIChlbC5hdHRyaWJ1dGVzW2pdLm5vZGVOYW1lLmluZGV4T2YoJ2RhdGEtY29tcG9uZW50JykgPiAtMSkge1xyXG5cdFx0XHRcdFx0Y29tcG9uZW50TmFtZSA9IGVsLmF0dHJpYnV0ZXNbal0ubm9kZU5hbWUucmVwbGFjZSgnZGF0YS1jb21wb25lbnQtJywgJycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdGlmIChjb21wb25lbnROYW1lICE9ICcnKSByZXR1cm4gY29tcG9uZW50TmFtZTtcclxuXHJcblx0XHRpZiAoZWwuYXR0cmlidXRlcylcclxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaisrKSB7XHJcblxyXG5cdFx0XHRcdGlmIChlbC5hdHRyaWJ1dGVzW2pdLm5vZGVOYW1lLmluZGV4T2YoJ2RhdGEtY29tcG9uZW50JykgPiAtMSkge1xyXG5cdFx0XHRcdFx0Y29tcG9uZW50TmFtZSA9IGVsLmF0dHJpYnV0ZXNbal0ubm9kZU5hbWUucmVwbGFjZSgnZGF0YS1jb21wb25lbnQtJywgJycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdGlmIChjb21wb25lbnROYW1lICE9ICcnKSByZXR1cm4gY29tcG9uZW50TmFtZTtcclxuXHRcdC8vaWYgKGNsYXNzTmFtZSkgcmV0dXJuIGNvbXBvbmVudE5hbWU7XHJcblx0XHRyZXR1cm4gZWwudGFnTmFtZTtcclxuXHR9LFxyXG5cclxuXHRsb2FkTm9kZUNvbXBvbmVudDogZnVuY3Rpb24gKG5vZGUpIHtcclxuXHRcdGRhdGEgPSBWdnZlYi5Db21wb25lbnRzLm1hdGNoTm9kZShub2RlKTtcclxuXHRcdGlmIChkYXRhKSBWdnZlYi5Db21wb25lbnRzLnJlbmRlcihkYXRhLnR5cGUpO1xyXG5cclxuXHR9LFxyXG5cclxuXHRzZWxlY3ROb2RlOiBmdW5jdGlvbiAobm9kZSA9IGZhbHNlKSB7XHJcblxyXG5cdFx0aWYgKCFub2RlKSB7XHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmhpZGUoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChzZWxmLnRleHRlZGl0RWwgJiYgc2VsZi5zZWxlY3RlZEVsLmdldCgwKSAhPSBub2RlKSB7XHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IuZGVzdHJveShzZWxmLnRleHRlZGl0RWwpO1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5yZW1vdmVDbGFzcyhcInRleHQtZWRpdFwiKS5maW5kKFwiI3NlbGVjdC1hY3Rpb25zXCIpLnNob3coKTtcclxuXHRcdFx0c2VsZi50ZXh0ZWRpdEVsID0gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRzZWxmLnNlbGVjdGVkRWwgPSB0YXJnZXQgPSBqUXVlcnkobm9kZSk7XHJcblx0XHRvZmZzZXQgPSB0YXJnZXQub2Zmc2V0KCk7XHJcblxyXG5cclxuXHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmNzcyhcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwidG9wXCI6IG9mZnNldC50b3AgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbFRvcCgpLFxyXG5cdFx0XHRcdFwibGVmdFwiOiBvZmZzZXQubGVmdCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsTGVmdCgpLFxyXG5cdFx0XHRcdFwid2lkdGhcIjogdGFyZ2V0Lm91dGVyV2lkdGgoKSxcclxuXHRcdFx0XHRcImhlaWdodFwiOiB0YXJnZXQub3V0ZXJIZWlnaHQoKSxcclxuXHRcdFx0XHRcImRpc3BsYXlcIjogXCJibG9ja1wiLFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRqUXVlcnkoXCIjaGlnaGxpZ2h0LW5hbWVcIikuaHRtbChzZWxmLl9nZXRFbGVtZW50VHlwZShub2RlKSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdC8qIGlmcmFtZSBoaWdobGlnaHQgKi9cclxuXHRfaW5pdEhpZ2h0bGlnaHQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRtb3ZlRXZlbnQgPSB7IHRhcmdldDogbnVsbCwgfTtcclxuXHJcblx0XHR0aGlzLmZyYW1lQm9keS5vbihcIm1vdXNlbW92ZSB0b3VjaG1vdmVcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdC8vZGVsYXkgZm9yIGhhbGYgYSBzZWNvbmQgaWYgZHJhZ2dpbmcgb3ZlciBzYW1lIGVsZW1lbnRcclxuXHRcdFx0Ly8gaWYgKGV2ZW50LnRhcmdldCA9PSBtb3ZlRXZlbnQudGFyZ2V0ICYmICgoZXZlbnQudGltZVN0YW1wIC0gbW92ZUV2ZW50LnRpbWVTdGFtcCkgPCA1MDApKSByZXR1cm47XHJcblx0XHRcdGlmIChldmVudC50YXJnZXQpIHtcclxuXHRcdFx0XHRtb3ZlRXZlbnQgPSBldmVudDtcclxuXHJcblx0XHRcdFx0c2VsZi5oaWdobGlnaHRFbCA9IHRhcmdldCA9IGpRdWVyeShldmVudC50YXJnZXQpO1xyXG5cdFx0XHRcdG9mZnNldCA9IHRhcmdldC5vZmZzZXQoKTtcclxuXHRcdFx0XHR3aWR0aCA9IHRhcmdldC5vdXRlcldpZHRoKCk7XHJcblx0XHRcdFx0aGVpZ2h0ID0gdGFyZ2V0Lm91dGVySGVpZ2h0KCk7XHJcblxyXG5cdFx0XHRcdGlmIChzZWxmLmlzRHJhZ2dpbmcpIHtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQuY3NzKHtcclxuXHRcdFx0XHRcdFx0ZGlzcGxheTogJ25vbmUnXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHBhcmVudCA9IHNlbGYuaGlnaGxpZ2h0RWw7XHJcblx0XHRcdFx0XHRwYXJlbnRPZmZzZXQgPSBzZWxmLmRyYWdFbGVtZW50Lm9mZnNldCgpO1xyXG5cdFx0XHRcdFx0Ly8gdHJ5IHtcclxuXHRcdFx0XHRcdC8vIFx0c2VsZi5kcmFnRWxlbWVudC5jc3Moe1xyXG5cdFx0XHRcdFx0Ly8gXHRcdGRpc3BsYXk6ICdub25lJ1xyXG5cdFx0XHRcdFx0Ly8gXHR9KTtcclxuXHRcdFx0XHRcdC8vIFx0aWYgKGV2ZW50Lm9yaWdpbmFsRXZlbnQgJiYgKG9mZnNldC5sZWZ0ID4gKGV2ZW50Lm9yaWdpbmFsRXZlbnQueCAtIDEwKSkpIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRpZiAob2Zmc2V0LnRvcCA+IChldmVudC5vcmlnaW5hbEV2ZW50LnkgLSAxMCkpIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHBhcmVudC5iZWZvcmUoc2VsZi5kcmFnRWxlbWVudCk7XHJcblx0XHRcdFx0XHQvLyBcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHBhcmVudC5wcmVwZW5kKHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0c2VsZi5kcmFnRWxlbWVudC5wcmVwZW5kVG8ocGFyZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHR9XHJcblx0XHRcdFx0XHQvLyBcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0aWYgKGV2ZW50Lm9yaWdpbmFsRXZlbnQgJiYgb2Zmc2V0LnRvcCA+ICgoZXZlbnQub3JpZ2luYWxFdmVudC55IC0gMTApKSkge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0cGFyZW50LmJlZm9yZShzZWxmLmRyYWdFbGVtZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0cGFyZW50LmFwcGVuZChzZWxmLmRyYWdFbGVtZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQuYXBwZW5kVG8ocGFyZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHR9XHJcblx0XHRcdFx0XHQvLyBcdH1cclxuXHRcdFx0XHRcdC8vIH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRcdFx0Ly8gXHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cdFx0XHRcdFx0Ly8gfVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0alF1ZXJ5KFwiI2hpZ2hsaWdodC1ib3hcIikuY3NzKFxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XCJ0b3BcIjogb2Zmc2V0LnRvcCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsVG9wKCksXHJcblx0XHRcdFx0XHRcdFx0XCJsZWZ0XCI6IG9mZnNldC5sZWZ0IC0gc2VsZi5mcmFtZURvYy5zY3JvbGxMZWZ0KCksXHJcblx0XHRcdFx0XHRcdFx0XCJ3aWR0aFwiOiB3aWR0aCxcclxuXHRcdFx0XHRcdFx0XHRcImhlaWdodFwiOiBoZWlnaHQsXHJcblx0XHRcdFx0XHRcdFx0XCJkaXNwbGF5XCI6IGV2ZW50LnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScpID8gXCJub25lXCIgOiBcImJsb2NrXCJcclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0alF1ZXJ5KFwiI2hpZ2hsaWdodC1uYW1lXCIpLmh0bWwoc2VsZi5fZ2V0RWxlbWVudFR5cGUoZXZlbnQudGFyZ2V0KSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0dGhpcy5mcmFtZUJvZHkub24oXCJtb3VzZXVwIHRvdWNoZW5kXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRpZiAoc2VsZi5pc0RyYWdnaW5nKSB7XHJcblx0XHRcdFx0c2VsZi5pc0RyYWdnaW5nID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdGlmIChjb21wb25lbnQuZHJhZ0h0bWwpIC8vaWYgZHJhZ0h0bWwgaXMgc2V0IGZvciBkcmFnZ2luZyB0aGVuIHNldCByZWFsIGNvbXBvbmVudCBodG1sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bmV3RWxlbWVudCA9ICQoY29tcG9uZW50Lmh0bWwpO1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnRWxlbWVudC5yZXBsYWNlV2l0aChuZXdFbGVtZW50KTtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQgPSBuZXdFbGVtZW50O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoY29tcG9uZW50LmFmdGVyRHJvcCkgc2VsZi5kcmFnRWxlbWVudCA9IGNvbXBvbmVudC5hZnRlckRyb3Aoc2VsZi5kcmFnRWxlbWVudCk7XHJcblxyXG5cdFx0XHRcdG5vZGUgPSBzZWxmLmRyYWdFbGVtZW50LmdldCgwKTtcclxuXHRcdFx0XHRzZWxmLnNlbGVjdE5vZGUobm9kZSk7XHJcblx0XHRcdFx0c2VsZi5sb2FkTm9kZUNvbXBvbmVudChub2RlKTtcclxuXHJcblx0XHRcdFx0aWYgKHNlbGYuZHJhZ01vdmVNdXRhdGlvbiA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdFx0XHR0eXBlOiAnY2hpbGRMaXN0JyxcclxuXHRcdFx0XHRcdFx0dGFyZ2V0OiBub2RlLnBhcmVudE5vZGUsXHJcblx0XHRcdFx0XHRcdGFkZGVkTm9kZXM6IFtub2RlXSxcclxuXHRcdFx0XHRcdFx0bmV4dFNpYmxpbmc6IG5vZGUubmV4dFNpYmxpbmdcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdNb3ZlTXV0YXRpb24ubmV3UGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnTW92ZU11dGF0aW9uLm5ld05leHRTaWJsaW5nID0gbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRcdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHNlbGYuZHJhZ01vdmVNdXRhdGlvbik7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdNb3ZlTXV0YXRpb24gPSBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHR0aGlzLmZyYW1lQm9keS5vbihcImRibGNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuXHRcdFx0c2VsZi50ZXh0ZWRpdEVsID0gdGFyZ2V0ID0galF1ZXJ5KGV2ZW50LnRhcmdldCk7XHJcblxyXG5cdFx0XHRWdnZlYi5XeXNpd3lnRWRpdG9yLmVkaXQoc2VsZi50ZXh0ZWRpdEVsKTtcclxuXHJcblx0XHRcdHNlbGYudGV4dGVkaXRFbC5hdHRyKHsgJ2NvbnRlbnRlZGl0YWJsZSc6IHRydWUsICdzcGVsbGNoZWNra2VyJzogZmFsc2UgfSk7XHJcblxyXG5cdFx0XHRzZWxmLnRleHRlZGl0RWwub24oXCJibHVyIGtleXVwIHBhc3RlIGlucHV0XCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuXHRcdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5jc3Moe1xyXG5cdFx0XHRcdFx0XCJ3aWR0aFwiOiBzZWxmLnRleHRlZGl0RWwub3V0ZXJXaWR0aCgpLFxyXG5cdFx0XHRcdFx0XCJoZWlnaHRcIjogc2VsZi50ZXh0ZWRpdEVsLm91dGVySGVpZ2h0KClcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5hZGRDbGFzcyhcInRleHQtZWRpdFwiKS5maW5kKFwiI3NlbGVjdC1hY3Rpb25zXCIpLmhpZGUoKTtcclxuXHRcdFx0alF1ZXJ5KFwiI2hpZ2hsaWdodC1ib3hcIikuaGlkZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdHRoaXMuZnJhbWVCb2R5Lm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudC50YXJnZXQpIHtcclxuXHRcdFx0XHRpZiAoIWlzUHJldmlldyAmJiAhJCgnI2F0dHJpYnV0ZS1zZXR0aW5ncycpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG5cdFx0XHRcdFx0JCgnI2F0dHJpYnV0ZS1zZXR0aW5ncycpXHJcblx0XHRcdFx0XHRcdC5hZGRDbGFzcygnYWN0aXZlJylcclxuXHRcdFx0XHRcdFx0LnNpYmxpbmdzKClcclxuXHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdCQoJyNsZWZ0LXBhbmVsJykuaGlkZSgpO1xyXG5cdFx0XHRcdFx0JCgnI3JpZ2h0LXBhbmVsJykuc2hvdygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzZWxmLnNlbGVjdE5vZGUoZXZlbnQudGFyZ2V0KTtcclxuXHRcdFx0XHRzZWxmLmxvYWROb2RlQ29tcG9uZW50KGV2ZW50LnRhcmdldCk7XHJcblxyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmZyYW1lQm9keS5rZXlkb3duKGUgPT4ge1xyXG5cdFx0XHRpZiAoc2VsZi5zZWxlY3RlZEVsICYmIHNlbGYuc2VsZWN0ZWRFbC5wcm9wKCd0YWdOYW1lJykgIT0gJ0JPRFknKSB7XHJcblx0XHRcdFx0aWYgKGUud2hpY2ggPT0gMzcgfHwgZS53aGljaCA9PSAzOCB8fCBlLndoaWNoID09IDM5IHx8IGUud2hpY2ggPT0gNDApIHtcclxuXHRcdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpZnJhbWVJZCcpLmNvbnRlbnRXaW5kb3cuYXJyb3dLZXlNb3ZlKGUud2hpY2gsIHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgdGhlIGRlZmF1bHQgYWN0aW9uIChzY3JvbGwgLyBtb3ZlIGNhcmV0KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNkcmFnLWJveFwiKS5vbihcIm1vdXNlZG93blwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cdFx0XHRzZWxmLmRyYWdFbGVtZW50ID0gc2VsZi5zZWxlY3RlZEVsO1xyXG5cdFx0XHRzZWxmLmlzRHJhZ2dpbmcgPSB0cnVlO1xyXG5cclxuXHRcdFx0bm9kZSA9IHNlbGYuZHJhZ0VsZW1lbnQuZ2V0KDApO1xyXG5cclxuXHJcblx0XHRcdHNlbGYuZHJhZ01vdmVNdXRhdGlvbiA9IHtcclxuXHRcdFx0XHR0eXBlOiAnbW92ZScsXHJcblx0XHRcdFx0dGFyZ2V0OiBub2RlLFxyXG5cdFx0XHRcdG9sZFBhcmVudDogbm9kZS5wYXJlbnROb2RlLFxyXG5cdFx0XHRcdG9sZE5leHRTaWJsaW5nOiBub2RlLm5leHRTaWJsaW5nXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQvL3NlbGYuc2VsZWN0Tm9kZShmYWxzZSk7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjZG93bi1ib3hcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cclxuXHRcdFx0bm9kZSA9IHNlbGYuc2VsZWN0ZWRFbC5nZXQoMCk7XHJcblx0XHRcdG9sZFBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0b2xkTmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0bmV4dCA9IHNlbGYuc2VsZWN0ZWRFbC5uZXh0KCk7XHJcblxyXG5cdFx0XHRpZiAobmV4dC5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0bmV4dC5hZnRlcihzZWxmLnNlbGVjdGVkRWwpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHNlbGYuc2VsZWN0ZWRFbC5wYXJlbnQoKS5hZnRlcihzZWxmLnNlbGVjdGVkRWwpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRuZXdQYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdG5ld05leHRTaWJsaW5nID0gbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdHR5cGU6ICdtb3ZlJyxcclxuXHRcdFx0XHR0YXJnZXQ6IG5vZGUsXHJcblx0XHRcdFx0b2xkUGFyZW50OiBvbGRQYXJlbnQsXHJcblx0XHRcdFx0bmV3UGFyZW50OiBuZXdQYXJlbnQsXHJcblx0XHRcdFx0b2xkTmV4dFNpYmxpbmc6IG9sZE5leHRTaWJsaW5nLFxyXG5cdFx0XHRcdG5ld05leHRTaWJsaW5nOiBuZXdOZXh0U2libGluZ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjdXAtYm94XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmhpZGUoKTtcclxuXHJcblx0XHRcdG5vZGUgPSBzZWxmLnNlbGVjdGVkRWwuZ2V0KDApO1xyXG5cdFx0XHRvbGRQYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdG9sZE5leHRTaWJsaW5nID0gbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRcdG5leHQgPSBzZWxmLnNlbGVjdGVkRWwucHJldigpO1xyXG5cclxuXHRcdFx0aWYgKG5leHQubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdG5leHQuYmVmb3JlKHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c2VsZi5zZWxlY3RlZEVsLnBhcmVudCgpLmJlZm9yZShzZWxmLnNlbGVjdGVkRWwpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRuZXdQYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdG5ld05leHRTaWJsaW5nID0gbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdHR5cGU6ICdtb3ZlJyxcclxuXHRcdFx0XHR0YXJnZXQ6IG5vZGUsXHJcblx0XHRcdFx0b2xkUGFyZW50OiBvbGRQYXJlbnQsXHJcblx0XHRcdFx0bmV3UGFyZW50OiBuZXdQYXJlbnQsXHJcblx0XHRcdFx0b2xkTmV4dFNpYmxpbmc6IG9sZE5leHRTaWJsaW5nLFxyXG5cdFx0XHRcdG5ld05leHRTaWJsaW5nOiBuZXdOZXh0U2libGluZ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjY2xvbmUtYm94XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGNsb25lID0gc2VsZi5zZWxlY3RlZEVsLmNsb25lKCk7XHJcblxyXG5cdFx0XHRzZWxmLnNlbGVjdGVkRWwuYWZ0ZXIoY2xvbmUpO1xyXG5cclxuXHRcdFx0c2VsZi5zZWxlY3RlZEVsID0gY2xvbmUuY2xpY2soKTtcclxuXHJcblx0XHRcdG5vZGUgPSBjbG9uZS5nZXQoMCk7XHJcblx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdHR5cGU6ICdjaGlsZExpc3QnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZS5wYXJlbnROb2RlLFxyXG5cdFx0XHRcdGFkZGVkTm9kZXM6IFtub2RlXSxcclxuXHRcdFx0XHRuZXh0U2libGluZzogbm9kZS5uZXh0U2libGluZ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjcGFyZW50LWJveFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuXHRcdFx0bm9kZSA9IHNlbGYuc2VsZWN0ZWRFbC5wYXJlbnQoKS5nZXQoMCk7XHJcblxyXG5cdFx0XHRzZWxmLnNlbGVjdE5vZGUobm9kZSk7XHJcblx0XHRcdHNlbGYubG9hZE5vZGVDb21wb25lbnQobm9kZSk7XHJcblxyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI2RlbGV0ZS1ib3hcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cclxuXHRcdFx0bm9kZSA9IHNlbGYuc2VsZWN0ZWRFbC5nZXQoMCk7XHJcblxyXG5cdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0XHR0eXBlOiAnY2hpbGRMaXN0JyxcclxuXHRcdFx0XHR0YXJnZXQ6IG5vZGUucGFyZW50Tm9kZSxcclxuXHRcdFx0XHRyZW1vdmVkTm9kZXM6IFtub2RlXSxcclxuXHRcdFx0XHRuZXh0U2libGluZzogbm9kZS5uZXh0U2libGluZ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHNlbGYuc2VsZWN0ZWRFbC5yZW1vdmUoKTtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGpRdWVyeSh3aW5kb3cuRnJhbWVXaW5kb3cpLm9uKFwic2Nyb2xsIHJlc2l6ZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcblx0XHRcdGlmIChzZWxmLnNlbGVjdGVkRWwpIHtcclxuXHRcdFx0XHRvZmZzZXQgPSBzZWxmLnNlbGVjdGVkRWwub2Zmc2V0KCk7XHJcblxyXG5cdFx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmNzcyhcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJ0b3BcIjogb2Zmc2V0LnRvcCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsVG9wKCksXHJcblx0XHRcdFx0XHRcdFwibGVmdFwiOiBvZmZzZXQubGVmdCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsTGVmdCgpLFxyXG5cdFx0XHRcdFx0XHRcIndpZHRoXCI6IHNlbGYuc2VsZWN0ZWRFbC5vdXRlcldpZHRoKCksXHJcblx0XHRcdFx0XHRcdFwiaGVpZ2h0XCI6IHNlbGYuc2VsZWN0ZWRFbC5vdXRlckhlaWdodCgpLFxyXG5cdFx0XHRcdFx0XHQvL1wiZGlzcGxheVwiOiBcImJsb2NrXCJcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHNlbGYuaGlnaGxpZ2h0RWwpIHtcclxuXHRcdFx0XHRvZmZzZXQgPSBzZWxmLmhpZ2hsaWdodEVsLm9mZnNldCgpO1xyXG5cclxuXHRcdFx0XHRqUXVlcnkoXCIjaGlnaGxpZ2h0LWJveFwiKS5jc3MoXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFwidG9wXCI6IG9mZnNldC50b3AgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbFRvcCgpLFxyXG5cdFx0XHRcdFx0XHRcImxlZnRcIjogb2Zmc2V0LmxlZnQgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbExlZnQoKSxcclxuXHRcdFx0XHRcdFx0XCJ3aWR0aFwiOiBzZWxmLmhpZ2hsaWdodEVsLm91dGVyV2lkdGgoKSxcclxuXHRcdFx0XHRcdFx0XCJoZWlnaHRcIjogc2VsZi5oaWdobGlnaHRFbC5vdXRlckhlaWdodCgpLFxyXG5cdFx0XHRcdFx0XHQvL1wiZGlzcGxheVwiOiBcImJsb2NrXCJcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0fSxcclxuXHJcblx0LyogZHJhZyBhbmQgZHJvcCAqL1xyXG5cdF9pbml0RHJhZ2Ryb3A6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRzZWxmLmlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHRcdGNvbXBvbmVudCA9IHt9O1xyXG5cdFx0JCgnI2NvbXBvbmVudHMgdWwgPiBsaSA+IG9sID4gbGknKS5vbihcIm1vdXNlZG93biB0b3VjaHN0YXJ0XCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHQkdGhpcyA9IGpRdWVyeSh0aGlzKTtcclxuXHJcblx0XHRcdC8vICQoXCIjY29tcG9uZW50LWNsb25lXCIpLnJlbW92ZSgpO1xyXG5cdFx0XHRjb21wb25lbnQgPSBWdnZlYi5Db21wb25lbnRzLmdldCgkdGhpcy5kYXRhKFwidHlwZVwiKSk7XHJcblxyXG5cdFx0XHRpZiAoY29tcG9uZW50LmRyYWdIdG1sKSB7XHJcblx0XHRcdFx0aHRtbCA9IGNvbXBvbmVudC5kcmFnSHRtbDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRodG1sID0gY29tcG9uZW50Lmh0bWw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQgPSAkKGh0bWwpO1xyXG5cclxuXHRcdFx0aWYgKGNvbXBvbmVudC5kcmFnU3RhcnQpIHNlbGYuZHJhZ0VsZW1lbnQgPSBjb21wb25lbnQuZHJhZ1N0YXJ0KHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cclxuXHRcdFx0c2VsZi5pc0RyYWdnaW5nID0gdHJ1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHQkKCdib2R5Jykub24oJ21vdXNldXAgdG91Y2hlbmQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0aWYgKHNlbGYuaXNEcmFnZ2luZyA9PSB0cnVlKSB7XHJcblx0XHRcdFx0c2VsZi5pc0RyYWdnaW5nID0gZmFsc2U7XHJcblx0XHRcdFx0Ly8gJChcIiNjb21wb25lbnQtY2xvbmVcIikucmVtb3ZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJ2JvZHknKS5vbignbW91c2Vtb3ZlIHRvdWNobW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRpZiAoc2VsZi5pc0RyYWdnaW5nID09IHRydWUpIHtcclxuXHRcdFx0XHRlbGVtZW50TW91c2VJc092ZXIgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFggLSA2MCwgZXZlbnQuY2xpZW50WSAtIDQwKTtcclxuXHRcdFx0XHQvL2lmIGRyYWcgZWxlbWVudHMgaG92ZXJzIG92ZXIgaWZyYW1lIHN3aXRjaCB0byBpZnJhbWUgbW91c2VvdmVyIGhhbmRsZXJcdFxyXG5cdFx0XHRcdGlmIChlbGVtZW50TW91c2VJc092ZXIgJiYgZWxlbWVudE1vdXNlSXNPdmVyLnRhZ05hbWUgPT0gJ0lGUkFNRScpIHtcclxuXHRcdFx0XHRcdHNlbGYuZnJhbWVCb2R5LnRyaWdnZXIoXCJtb3VzZW1vdmVcIiwgZXZlbnQpO1xyXG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0XHRzZWxmLnNlbGVjdE5vZGUoZmFsc2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnI2NvbXBvbmVudHMgdWwgPiBvbCA+IGxpID4gbGknKS5vbihcIm1vdXNldXAgdG91Y2hlbmRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdHNlbGYuaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cdFx0XHQvLyAkKFwiI2NvbXBvbmVudC1jbG9uZVwiKS5yZW1vdmUoKTtcclxuXHRcdH0pO1xyXG5cclxuXHR9LFxyXG5cclxuXHRnZXRCZWF1dGlmaWVkSHRtbCgpIHtcclxuXHRcdC8qXHJcblx0XHQtSSwgLS1pbmRlbnQtaW5uZXItaHRtbCAgICAgICAgICAgIEluZGVudCA8aGVhZD4gYW5kIDxib2R5PiBzZWN0aW9ucy4gRGVmYXVsdCBpcyBmYWxzZS5cclxuXHRcdC1VLCAtLXVuZm9ybWF0dGVkICAgICAgICAgICAgICAgICAgTGlzdCBvZiB0YWdzIChkZWZhdWx0cyB0byBpbmxpbmUpIHRoYXQgc2hvdWxkIG5vdCBiZSByZWZvcm1hdHRlZFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAgIHVzZSBlbXB0eSBhcnJheSB0byBkZW5vdGUgdGhhdCBubyB0YWdzIHNob3VsZCBub3QgYmUgcmVmb3JtYXR0ZWRcclxuXHRcdCAqL1xyXG5cclxuXHRcdGNvbnN0IHsgZG9jdHlwZSwgaHRtbCB9ID0gdGhpcy5nZXRIdG1sKCk7XHJcblx0XHRyZXR1cm4gaHRtbF9iZWF1dGlmeShgJHtkb2N0eXBlfVxyXG5cdFx0XHRcdFx0XHRcdCAgJHtyZW1vdmVVbnVzZWRUYWdzKGh0bWwsIHVudXNlZFRhZ3MpfWAsXHJcblx0XHRcdHtcclxuXHRcdFx0XHRwcmVzZXJ2ZV9uZXdsaW5lczogZmFsc2UsXHJcblx0XHRcdFx0aW5kZW50X2lubmVyX2h0bWw6IHRydWUsXHJcblx0XHRcdFx0dW5mb3JtYXR0ZWQ6IFtdXHJcblx0XHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdGdldEh0bWw6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGRvYyA9IHdpbmRvdy5GcmFtZURvY3VtZW50O1xyXG5cdFx0Y29uc3QgZG9jdHlwZSA9IFwiPCFET0NUWVBFIFwiXHJcblx0XHRcdCsgZG9jLmRvY3R5cGUubmFtZVxyXG5cdFx0XHQrIChkb2MuZG9jdHlwZS5wdWJsaWNJZCA/ICcgUFVCTElDIFwiJyArIGRvYy5kb2N0eXBlLnB1YmxpY0lkICsgJ1wiJyA6ICcnKVxyXG5cdFx0XHQrICghZG9jLmRvY3R5cGUucHVibGljSWQgJiYgZG9jLmRvY3R5cGUuc3lzdGVtSWQgPyAnIFNZU1RFTScgOiAnJylcclxuXHRcdFx0KyAoZG9jLmRvY3R5cGUuc3lzdGVtSWQgPyAnIFwiJyArIGRvYy5kb2N0eXBlLnN5c3RlbUlkICsgJ1wiJyA6ICcnKVxyXG5cdFx0XHQrIFwiPlxcblwiO1xyXG5cdFx0Y29uc3QgaHRtbCA9IGAke2RvY3R5cGV9XHJcblx0XHRcdFx0XHQgIDxodG1sPlxyXG5cdFx0XHRcdFx0XHQgICR7ZG9jLmRvY3VtZW50RWxlbWVudC5pbm5lckhUTUx9XHJcblx0XHRcdFx0XHQgIDwvaHRtbD5gO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZG9jdHlwZSxcclxuXHRcdFx0aHRtbFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHRzZXRIdG1sOiBmdW5jdGlvbiAoaHRtbCkge1xyXG5cdFx0Ly91cGRhdGUgb25seSBib2R5IHRvIGF2b2lkIGJyZWFraW5nIGlmcmFtZSBjc3MvanMgcmVsYXRpdmUgcGF0aHNcclxuXHRcdHN0YXJ0ID0gaHRtbC5pbmRleE9mKFwiPGJvZHlcIik7XHJcblx0XHRlbmQgPSBodG1sLmluZGV4T2YoXCI8L2JvZHlcIik7XHJcblxyXG5cdFx0aWYgKHN0YXJ0ID49IDAgJiYgZW5kID49IDApIHtcclxuXHRcdFx0Ym9keSA9IGh0bWwuc2xpY2UoaHRtbC5pbmRleE9mKFwiPlwiLCBzdGFydCkgKyAxLCBlbmQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ym9keSA9IGh0bWxcclxuXHRcdH1cclxuXHJcblx0XHQvL3NlbGYuZnJhbWVCb2R5Lmh0bWwoYm9keSk7XHJcblx0XHR3aW5kb3cuRnJhbWVEb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGJvZHk7XHJcblxyXG5cdFx0Ly9iZWxvdyBtZXRob2RzIGJyYWtlIGRvY3VtZW50IHJlbGF0aXZlIGNzcyBhbmQganMgcGF0aHNcclxuXHRcdC8vcmV0dXJuIHNlbGYuaWZyYW1lLm91dGVySFRNTCA9IGh0bWw7XHJcblx0XHQvL3JldHVybiBzZWxmLmRvY3VtZW50RnJhbWUuaHRtbChodG1sKTtcclxuXHRcdC8vcmV0dXJuIHNlbGYuZG9jdW1lbnRGcmFtZS5hdHRyKFwic3JjZG9jXCIsIGh0bWwpO1xyXG5cdH1cclxufTtcclxuXHJcblZ2dmViLkNvZGVFZGl0b3IgPSB7XHJcblxyXG5cdGlzQWN0aXZlOiBmYWxzZSxcclxuXHRvbGRWYWx1ZTogJycsXHJcblx0ZG9jOiBmYWxzZSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRvYykge1xyXG5cdFx0JChcIiN2dnZlYi1jb2RlLWVkaXRvciB0ZXh0YXJlYVwiKS52YWwoVnZ2ZWIuQnVpbGRlci5nZXRCZWF1dGlmaWVkSHRtbCgpKTtcclxuXHJcblx0XHQkKFwiI3Z2dmViLWNvZGUtZWRpdG9yIHRleHRhcmVhXCIpLmtleXVwKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0ZGVsYXkoVnZ2ZWIuQnVpbGRlci5zZXRIdG1sKHRoaXMudmFsdWUpLCAxMDAwKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vbG9hZCBjb2RlIG9uIGRvY3VtZW50IGNoYW5nZXNcclxuXHRcdFZ2dmViLkJ1aWxkZXIuZnJhbWVCb2R5Lm9uKFwidnZ2ZWIudW5kby5hZGQgdnZ2ZWIudW5kby5yZXN0b3JlXCIsIGZ1bmN0aW9uIChlKSB7IFZ2dmViLkNvZGVFZGl0b3Iuc2V0VmFsdWUoKTsgfSk7XHJcblx0XHQvL2xvYWQgY29kZSB3aGVuIGEgbmV3IHVybCBpcyBsb2FkZWRcclxuXHRcdFZ2dmViLkJ1aWxkZXIuZG9jdW1lbnRGcmFtZS5vbihcImxvYWRcIiwgZnVuY3Rpb24gKGUpIHsgVnZ2ZWIuQ29kZUVkaXRvci5zZXRWYWx1ZSgpOyB9KTtcclxuXHJcblx0XHR0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcclxuXHR9LFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRpZiAodGhpcy5pc0FjdGl2ZSkge1xyXG5cdFx0XHQkKFwiI3Z2dmViLWNvZGUtZWRpdG9yIHRleHRhcmVhXCIpLnZhbChWdnZlYi5CdWlsZGVyLmdldEJlYXV0aWZpZWRIdG1sKCkpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGRlc3Ryb3k6IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHQvL3RoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHR0b2dnbGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLmlzQWN0aXZlICE9IHRydWUpIHtcclxuXHRcdFx0dGhpcy5pc0FjdGl2ZSA9IHRydWU7XHJcblx0XHRcdHJldHVybiB0aGlzLmluaXQoKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHRcdHRoaXMuZGVzdHJveSgpO1xyXG5cdH1cclxufVxyXG5cclxubGV0IHNob3duUGFuZWwsIGhpZGRlblBhbmVsLCBpc1ByZXZpZXc7XHJcblxyXG5WdnZlYi5HdWkgPSB7XHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoXCJbZGF0YS12dnZlYi1hY3Rpb25dXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRvbiA9IFwiY2xpY2tcIjtcclxuXHRcdFx0aWYgKHRoaXMuZGF0YXNldC52dnZlYk9uKSBvbiA9IHRoaXMuZGF0YXNldC52dnZlYk9uO1xyXG5cclxuXHRcdFx0JCh0aGlzKS5vbihvbiwgVnZ2ZWIuR3VpW3RoaXMuZGF0YXNldC52dnZlYkFjdGlvbl0pO1xyXG5cdFx0XHRpZiAodGhpcy5kYXRhc2V0LnZ2dmViU2hvcnRjdXQpIHtcclxuXHRcdFx0XHQkKGRvY3VtZW50KS5iaW5kKCdrZXlkb3duJywgdGhpcy5kYXRhc2V0LnZ2dmViU2hvcnRjdXQsIFZ2dmViLkd1aVt0aGlzLmRhdGFzZXQudnZ2ZWJBY3Rpb25dKTtcclxuXHRcdFx0XHQkKHdpbmRvdy5GcmFtZURvY3VtZW50LCB3aW5kb3cuRnJhbWVXaW5kb3cpLmJpbmQoJ2tleWRvd24nLCB0aGlzLmRhdGFzZXQudnZ2ZWJTaG9ydGN1dCwgVnZ2ZWIuR3VpW3RoaXMuZGF0YXNldC52dnZlYkFjdGlvbl0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHR1bmRvOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoVnZ2ZWIuV3lzaXd5Z0VkaXRvci5pc0FjdGl2ZSkge1xyXG5cdFx0XHRWdnZlYi5XeXNpd3lnRWRpdG9yLnVuZG8oKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdFZ2dmViLlVuZG8udW5kbygpO1xyXG5cdFx0fVxyXG5cdFx0VnZ2ZWIuQnVpbGRlci5zZWxlY3ROb2RlKCk7XHJcblx0fSxcclxuXHJcblx0cmVkbzogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKFZ2dmViLld5c2l3eWdFZGl0b3IuaXNBY3RpdmUpIHtcclxuXHRcdFx0VnZ2ZWIuV3lzaXd5Z0VkaXRvci5yZWRvKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRWdnZlYi5VbmRvLnJlZG8oKTtcclxuXHRcdH1cclxuXHRcdFZ2dmViLkJ1aWxkZXIuc2VsZWN0Tm9kZSgpO1xyXG5cdH0sXHJcblxyXG5cdGNoZWNrOiBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKCcjdGV4dGFyZWEtbW9kYWwgdGV4dGFyZWEnKS52YWwoVnZ2ZWIuQnVpbGRlci5nZXRCZWF1dGlmaWVkSHRtbCgpKTtcclxuXHRcdCQoJyN0ZXh0YXJlYS1tb2RhbCcpLm1vZGFsKCk7XHJcblx0fSxcclxuXHJcblx0dmlld3BvcnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoXCIjY2FudmFzXCIpLmF0dHIoXCJjbGFzc1wiLCB0aGlzLmRhdGFzZXQudmlldyk7XHJcblx0fSxcclxuXHJcblx0dG9nZ2xlRWRpdG9yOiBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKFwiI3Z2dmViLWJ1aWxkZXJcIikudG9nZ2xlQ2xhc3MoXCJib3R0b20tcGFuZWwtZXhwYW5kXCIpO1xyXG5cdFx0VnZ2ZWIuQ29kZUVkaXRvci50b2dnbGUoKTtcclxuXHR9LFxyXG5cclxuXHRkb3dubG9hZCgpIHtcclxuXHRcdGRvd25sb2FkQXNUZXh0RmlsZSgnaW5kZXgnLCBWdnZlYi5CdWlsZGVyLmdldEJlYXV0aWZpZWRIdG1sKCkpO1xyXG5cdH0sXHJcblxyXG5cdHByZXZpZXc6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICgkKCcjbGVmdC1wYW5lbCcpLmlzKCc6dmlzaWJsZScpKSB7XHJcblx0XHRcdHNob3duUGFuZWwgPSAnbGVmdC1wYW5lbCc7XHJcblx0XHRcdGhpZGRlblBhbmVsID0gJ3JpZ2h0LXBhbmVsJztcclxuXHRcdFx0JCgnI2xlZnQtcGFuZWwsICNyaWdodC1wYW5lbCcpLmhpZGUoKTtcclxuXHRcdFx0aXNQcmV2aWV3ID0gdHJ1ZTtcclxuXHRcdH0gZWxzZSBpZiAoJCgnI3JpZ2h0LXBhbmVsJykuaXMoJzp2aXNpYmxlJykpIHtcclxuXHRcdFx0c2hvd25QYW5lbCA9ICdyaWdodC1wYW5lbCc7XHJcblx0XHRcdGhpZGRlblBhbmVsID0gJ2xlZnQtcGFuZWwnO1xyXG5cdFx0XHQkKCcjbGVmdC1wYW5lbCwgI3JpZ2h0LXBhbmVsJykuaGlkZSgpO1xyXG5cdFx0XHRpc1ByZXZpZXcgPSB0cnVlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aXNQcmV2aWV3ID0gZmFsc2U7XHJcblx0XHRcdCQoYCMke3Nob3duUGFuZWx9YCkuc2hvdygpO1xyXG5cdFx0XHQkKGAjJHtoaWRkZW5QYW5lbH1gKS5oaWRlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0JCgnI21lbnUtcGFuZWwnKS50b2dnbGUoKTtcclxuXHRcdCQoXCIjaWZyYW1lLWxheWVyXCIpLnRvZ2dsZSgpO1xyXG5cdFx0JChcIiN2dnZlYi1idWlsZGVyXCIpLnRvZ2dsZUNsYXNzKFwicHJldmlld1wiKTtcclxuXHR9LFxyXG5cclxuXHRmdWxsc2NyZWVuOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRsYXVuY2hGdWxsU2NyZWVuKGRvY3VtZW50KTsgLy8gdGhlIHdob2xlIHBhZ2VcclxuXHR9LFxyXG5cclxuXHRjb21wb25lbnRTZWFyY2g6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHNlYXJjaFRleHQgPSB0aGlzLnZhbHVlO1xyXG5cclxuXHRcdCQoXCIjY29tcG9uZW50cy1saXN0IGxpIG9sIGxpXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQkdGhpcyA9ICQodGhpcyk7XHJcblxyXG5cdFx0XHQkdGhpcy5oaWRlKCk7XHJcblx0XHRcdGlmICgkdGhpcy5kYXRhKFwic2VhcmNoXCIpLmluZGV4T2Yoc2VhcmNoVGV4dCkgPiAtMSkgJHRoaXMuc2hvdygpO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0Y2xlYXJDb21wb25lbnRTZWFyY2g6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoXCIjY29tcG9uZW50LXNlYXJjaFwiKS52YWwoXCJcIikua2V5dXAoKTtcclxuXHR9XHJcbn1cclxuXHJcblZ2dmViLkZpbGVNYW5hZ2VyID0ge1xyXG5cdHRyZWU6IGZhbHNlLFxyXG5cdHBhZ2VzOiB7fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy50cmVlID0gJChcIiNmaWxlbWFuYWdlciAudHJlZSA+IG9sXCIpLmh0bWwoXCJcIik7XHJcblxyXG5cdFx0JCh0aGlzLnRyZWUpLm9uKFwiY2xpY2tcIiwgXCJsaVtkYXRhLXBhZ2VdIHNwYW5cIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBgIyR7JCh0aGlzKS5wYXJlbnRzKCdsaScpLmRhdGEoJ3BhZ2UnKX1gO1xyXG5cdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcblx0XHRcdC8vIFZ2dmViLkZpbGVNYW5hZ2VyLmxvYWRQYWdlKCQodGhpcykucGFyZW50cyhcImxpXCIpLmRhdGEoXCJwYWdlXCIpKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSlcclxuXHR9LFxyXG5cclxuXHRnZXRQYWdlKG5hbWUpIHtcclxuXHRcdHJldHVybiB0aGlzLnBhZ2VzW25hbWVdO1xyXG5cdH0sXHJcblxyXG5cdGFkZFBhZ2U6IGZ1bmN0aW9uIChuYW1lLCB0aXRsZSwgdXJsKSB7XHJcblxyXG5cdFx0dGhpcy5wYWdlc1tuYW1lXSA9IHtcclxuXHRcdFx0bmFtZSxcclxuXHRcdFx0dGl0bGUsXHJcblx0XHRcdHVybFxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLnRyZWUuYXBwZW5kKFxyXG5cdFx0XHR0bXBsKFwidnZ2ZWItZmlsZW1hbmFnZXItcGFnZVwiLCB7IG5hbWUsIHRpdGxlLCB1cmwgfSkpO1xyXG5cdH0sXHJcblxyXG5cdGFkZFBhZ2VzOiBmdW5jdGlvbiAocGFnZXMpIHtcclxuXHRcdGZvciAocGFnZSBpbiBwYWdlcykge1xyXG5cdFx0XHR0aGlzLmFkZFBhZ2UocGFnZXNbcGFnZV1bJ25hbWUnXSwgcGFnZXNbcGFnZV1bJ3RpdGxlJ10sIHBhZ2VzW3BhZ2VdWyd1cmwnXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0YWRkQ29tcG9uZW50OiBmdW5jdGlvbiAobmFtZSwgdXJsLCB0aXRsZSwgcGFnZSkge1xyXG5cdFx0JChcIltkYXRhLXBhZ2U9J1wiICsgcGFnZSArIFwiJ10gPiBvbFwiLCB0aGlzLnRyZWUpLmFwcGVuZChcclxuXHRcdFx0dG1wbChcInZ2dmViLWZpbGVtYW5hZ2VyLWNvbXBvbmVudFwiLCB7IG5hbWUsIHVybCwgdGl0bGUgfSkpO1xyXG5cdH0sXHJcblxyXG5cdHNob3dBY3RpdmUobmFtZSkge1xyXG5cdFx0JChcIltkYXRhLXBhZ2VdXCIsIHRoaXMudHJlZSkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHQkKFwiW2RhdGEtcGFnZT0nXCIgKyBuYW1lICsgXCInXVwiLCB0aGlzLnRyZWUpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdH0sXHJcblxyXG5cdGxvYWRQYWdlOiBmdW5jdGlvbiAobmFtZSkge1xyXG5cdFx0JChcIltkYXRhLXBhZ2VdXCIsIHRoaXMudHJlZSkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHQkKFwiW2RhdGEtcGFnZT0nXCIgKyBuYW1lICsgXCInXVwiLCB0aGlzLnRyZWUpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cclxuXHRcdFZ2dmViLkJ1aWxkZXIubG9hZFVybCh0aGlzLnBhZ2VzW25hbWVdWyd1cmwnXSk7XHJcblx0fSxcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ2dmViOyIsImNvbnN0IGFsd2F5c1RydWUgPSAoKSA9PiB0cnVlO1xyXG5cclxuLy8gdGhpcyByZWZlcnMgdG8gaHRtbCBlbGVtZW50XHJcbmZ1bmN0aW9uIHJlbW92ZVRhZyh7IG5hbWUsIGZpbHRlciA9IGFsd2F5c1RydWUgfSkge1xyXG4gICAgQXJyYXkuZnJvbSh0aGlzLmdldEVsZW1lbnRzQnlUYWdOYW1lKG5hbWUpKVxyXG4gICAgICAgIC5maWx0ZXIoZmlsdGVyKVxyXG4gICAgICAgIC5mb3JFYWNoKHRhZyA9PiB0YWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0YWcpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlVW51c2VkVGFncyhodG1sLCB0YWdzKSB7XHJcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2h0bWwnKTtcclxuICAgIGVsLmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICB0YWdzLmZvckVhY2gocmVtb3ZlVGFnLCBlbCk7XHJcblxyXG4gICAgcmV0dXJuICQoZWwpLnByb3AoJ291dGVySFRNTCcpO1xyXG59XHJcblxyXG5leHBvcnQgeyByZW1vdmVVbnVzZWRUYWdzIH07IiwiLy8gVG9nZ2xlIGZ1bGxzY3JlZW5cclxuZnVuY3Rpb24gbGF1bmNoRnVsbFNjcmVlbihkb2N1bWVudCkge1xyXG4gICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbFNjcmVlbikge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQuRnVsbFNjcmVlbkVsZW1lbnQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmV4aXRGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICAvL21vemlsbGFcdFx0XHJcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQubW96RnVsbFNjcmVlbkVsZW1lbnQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgIC8vd2Via2l0XHQgIFxyXG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50KVxyXG4gICAgICAgICAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgLy9pZVx0ICBcclxuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50Lm1zRnVsbFNjcmVlbkVsZW1lbnQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IGxhdW5jaEZ1bGxTY3JlZW4gfTsiLCJmdW5jdGlvbiBkb3dubG9hZEFzVGV4dEZpbGUoZmlsZW5hbWUsIHRleHQpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaHJlZicsIGBkYXRhOnRleHQvaHRtbDtjaGFyc2V0PXV0Zi04LCR7ZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpfWApO1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgZmlsZW5hbWUpO1xyXG5cclxuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcblxyXG4gICAgZWxlbWVudC5jbGljaygpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGRvd25sb2FkQXNUZXh0RmlsZSB9OyIsIi8qXHJcbkNvcHlyaWdodCAyMDE3IFppYWRpbiBHaXZhblxyXG5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHJcbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG5cclxuaHR0cHM6Ly9naXRodWIuY29tL2dpdmFuei9WdnZlYkpzXHJcbiovXHJcbmltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcbmltcG9ydCBDaGVja2JveElucHV0IGZyb20gJy4vQ2hlY2tib3hJbnB1dCc7XHJcbmltcG9ydCBTZWxlY3RJbnB1dCBmcm9tICcuL1NlbGVjdElucHV0JztcclxuaW1wb3J0IExpbmtJbnB1dCBmcm9tICcuL0xpbmtJbnB1dCc7XHJcbmltcG9ydCBSYW5nZUlucHV0IGZyb20gJy4vUmFuZ2VJbnB1dCc7XHJcbmltcG9ydCBOdW1iZXJJbnB1dCBmcm9tICcuL051bWJlcklucHV0JztcclxuaW1wb3J0IENzc1VuaXRJbnB1dCBmcm9tICcuL0Nzc1VuaXRJbnB1dCc7XHJcbmltcG9ydCBDb2xvcklucHV0IGZyb20gJy4vQ29sb3JJbnB1dCc7XHJcbmltcG9ydCBGaWxlVXBsb2FkSW5wdXQgZnJvbSAnLi9GaWxlVXBsb2FkSW5wdXQnO1xyXG5pbXBvcnQgUmFkaW9JbnB1dCBmcm9tICcuL1JhZGlvSW5wdXQnO1xyXG5pbXBvcnQgUmFkaW9CdXR0b25JbnB1dCBmcm9tICcuL1JhZGlvQnV0dG9uSW5wdXQnO1xyXG5pbXBvcnQgVG9nZ2xlSW5wdXQgZnJvbSAnLi9Ub2dnbGVJbnB1dCc7XHJcbmltcG9ydCBWYWx1ZVRleHRJbnB1dCBmcm9tICcuL1ZhbHVlVGV4dElucHV0JztcclxuaW1wb3J0IEdyaWRMYXlvdXRJbnB1dCBmcm9tICcuL0dyaWRMYXlvdXRJbnB1dCc7XHJcbmltcG9ydCBQcm9kdWN0c0lucHV0IGZyb20gJy4vUHJvZHVjdHNJbnB1dCc7XHJcbmltcG9ydCBHcmlkSW5wdXQgZnJvbSAnLi9HcmlkSW5wdXQnO1xyXG5pbXBvcnQgVGV4dFZhbHVlSW5wdXQgZnJvbSAnLi9UZXh0VmFsdWVJbnB1dCc7XHJcbmltcG9ydCBCdXR0b25JbnB1dCBmcm9tICcuL0J1dHRvbklucHV0JztcclxuaW1wb3J0IFNlY3Rpb25JbnB1dCBmcm9tICcuL1NlY3Rpb25JbnB1dCc7XHJcbmltcG9ydCBMaXN0SW5wdXQgZnJvbSAnLi9MaXN0SW5wdXQnO1xyXG5cclxuZXhwb3J0IHtcclxuXHRJbnB1dCwgVGV4dElucHV0LCBDaGVja2JveElucHV0LCBTZWxlY3RJbnB1dCwgTGlua0lucHV0LCBSYW5nZUlucHV0LCBOdW1iZXJJbnB1dCwgQ3NzVW5pdElucHV0LFxyXG5cdFJhZGlvSW5wdXQsIFJhZGlvQnV0dG9uSW5wdXQsIFRvZ2dsZUlucHV0LCBWYWx1ZVRleHRJbnB1dCwgR3JpZExheW91dElucHV0LCBQcm9kdWN0c0lucHV0LCBHcmlkSW5wdXQsXHJcblx0VGV4dFZhbHVlSW5wdXQsIEJ1dHRvbklucHV0LCBTZWN0aW9uSW5wdXQsIExpc3RJbnB1dCwgQ29sb3JJbnB1dCwgRmlsZVVwbG9hZElucHV0XHJcbn07IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBWYWx1ZVRleHRJbnB1dCA9ICQuZXh0ZW5kKHt9LCBUZXh0SW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWYWx1ZVRleHRJbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuXHJcbmNvbnN0IFRvZ2dsZUlucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRvbkNoYW5nZTogZnVuY3Rpb24gKGV2ZW50LCBub2RlKSB7XHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpIHtcclxuXHRcdFx0ZXZlbnQuZGF0YS5lbGVtZW50LnRyaWdnZXIoJ3Byb3BlcnR5Q2hhbmdlJywgW3RoaXMuY2hlY2tlZCA/IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZS1vblwiKSA6IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZS1vZmZcIiksIHRoaXNdKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRvZ2dsZVwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb2dnbGVJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBUZXh0VmFsdWVJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdFx0W1wiY2xpY2tcIiwgXCJvbkNoYW5nZVwiLCBcImJ1dHRvblwiIC8qJ3NlbGVjdCcqL10sXHJcblx0XSxcclxuXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0dmFsdWVcIiwgZGF0YSk7XHJcblx0fSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRleHRWYWx1ZUlucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFNlbGVjdElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG4gICAgZXZlbnRzOiBbXHJcbiAgICAgICAgW1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJzZWxlY3RcIl0sXHJcbiAgICBdLFxyXG5cclxuXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgJCgnc2VsZWN0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcihcInNlbGVjdFwiLCBkYXRhKTtcclxuICAgIH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBTZWN0aW9uSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjbGlja1wiLCBcIm9uQ2hhbmdlXCIsIFwiYnV0dG9uXCIgLyonc2VsZWN0JyovXSxcclxuXHRdLFxyXG5cclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJzZWN0aW9uaW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlY3Rpb25JbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBSYW5nZUlucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwicmFuZ2VpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYW5nZUlucHV0OyIsImltcG9ydCBSYWRpb0lucHV0IGZyb20gJy4vUmFkaW9JbnB1dCc7XHJcblxyXG5jb25zdCBSYWRpb0J1dHRvbklucHV0ID0gJC5leHRlbmQoe30sIFJhZGlvSW5wdXQsIHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcihcInJhZGlvYnV0dG9uaW5wdXRcIiwgZGF0YSk7XHJcbiAgICB9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYWRpb0J1dHRvbklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFJhZGlvSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0b25DaGFuZ2U6IGZ1bmN0aW9uIChldmVudCwgbm9kZSkge1xyXG5cclxuXHRcdGlmIChldmVudC5kYXRhICYmIGV2ZW50LmRhdGEuZWxlbWVudCkge1xyXG5cdFx0XHRldmVudC5kYXRhLmVsZW1lbnQudHJpZ2dlcigncHJvcGVydHlDaGFuZ2UnLCBbdGhpcy52YWx1ZSwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkucmVtb3ZlQXR0cignY2hlY2tlZCcpO1xyXG5cdFx0aWYgKHZhbHVlKVxyXG5cdFx0XHQkKFwiaW5wdXRbdmFsdWU9XCIgKyB2YWx1ZSArIFwiXVwiLCB0aGlzLmVsZW1lbnQpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwicmFkaW9pbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYWRpb0lucHV0OyIsImltcG9ydCBUZXh0SW5wdXQgZnJvbSAnLi9UZXh0SW5wdXQnO1xyXG5cclxuY29uc3QgUHJvZHVjdHNJbnB1dCA9ICQuZXh0ZW5kKHt9LCBUZXh0SW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm9kdWN0c0lucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbnZhciBOdW1iZXJJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcIm51bWJlcmlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE51bWJlcklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IExpc3RJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwic2VsZWN0XCJdLFxyXG5cdF0sXHJcblxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdzZWxlY3QnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImxpc3RpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdElucHV0OyIsImltcG9ydCBUZXh0SW5wdXQgZnJvbSAnLi9UZXh0SW5wdXQnO1xyXG5cclxuY29uc3QgTGlua0lucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaW5rSW5wdXQ7IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBHcmlkTGF5b3V0SW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR3JpZExheW91dElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IEdyaWRJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJzZWxlY3RcIiAvKidzZWxlY3QnKi9dLFxyXG5cdFx0W1wiY2xpY2tcIiwgXCJvbkNoYW5nZVwiLCBcImJ1dHRvblwiIC8qJ3NlbGVjdCcqL10sXHJcblx0XSxcclxuXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ3NlbGVjdCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwiZ3JpZFwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR3JpZElucHV0OyIsImltcG9ydCBUZXh0SW5wdXQgZnJvbSAnLi9UZXh0SW5wdXQnO1xyXG5cclxuY29uc3QgRmlsZVVwbG9hZElucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImtleXVwXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpbGVVcGxvYWRJbnB1dDtcclxuIiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgVGV4dElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG4gICAgZXZlbnRzOiBbXHJcbiAgICAgICAgW1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdCBdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblx0XHJcblx0aW5pdDogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbiAgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGV4dElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IENzc1VuaXRJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRudW1iZXI6IDAsXHJcblx0dW5pdDogXCJweFwiLFxyXG5cclxuXHRvbkNoYW5nZTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0aWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS5lbGVtZW50KSB7XHJcblx0XHRcdGlucHV0ID0gZXZlbnQuZGF0YS5pbnB1dDtcclxuXHRcdFx0aW5wdXRbdGhpcy5uYW1lXSA9IHRoaXMudmFsdWU7Ly8gdGhpcy5uYW1lID0gdW5pdCBvciBudW1iZXJcdFxyXG5cclxuXHRcdFx0dmFsdWUgPSBcIlwiO1xyXG5cdFx0XHRpZiAoaW5wdXQudW5pdCA9PSBcImF1dG9cIikge1xyXG5cdFx0XHRcdCQoZXZlbnQuZGF0YS5lbGVtZW50KS5hZGRDbGFzcyhcImF1dG9cIik7XHJcblx0XHRcdFx0dmFsdWUgPSBpbnB1dC51bml0O1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdCQoZXZlbnQuZGF0YS5lbGVtZW50KS5yZW1vdmVDbGFzcyhcImF1dG9cIik7XHJcblx0XHRcdFx0dmFsdWUgPSBpbnB1dC5udW1iZXIgKyBpbnB1dC51bml0O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRldmVudC5kYXRhLmVsZW1lbnQudHJpZ2dlcigncHJvcGVydHlDaGFuZ2UnLCBbdmFsdWUsIHRoaXNdKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwic2VsZWN0XCJdLFxyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHR0aGlzLm51bWJlciA9IHBhcnNlSW50KHZhbHVlKTtcclxuXHRcdHRoaXMudW5pdCA9IHZhbHVlLnJlcGxhY2UodGhpcy5udW1iZXIsICcnKTtcclxuXHJcblx0XHRpZiAodGhpcy51bml0ID09IFwiYXV0b1wiKSAkKHRoaXMuZWxlbWVudCkuYWRkQ2xhc3MoXCJhdXRvXCIpO1xyXG5cclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodGhpcy5udW1iZXIpO1xyXG5cdFx0JCgnc2VsZWN0JywgdGhpcy5lbGVtZW50KS52YWwodGhpcy51bml0KTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwiY3NzdW5pdGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENzc1VuaXRJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBDb2xvcklucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdC8vaHRtbDUgY29sb3IgaW5wdXQgb25seSBzdXBwb3J0cyBzZXR0aW5nIHZhbHVlcyBhcyBoZXggY29sb3JzIGV2ZW4gaWYgdGhlIHBpY2tlciByZXR1cm5zIG9ubHkgcmdiXHJcblx0cmdiMmhleDogZnVuY3Rpb24gKHJnYikge1xyXG5cclxuXHRcdHJnYiA9IHJnYi5tYXRjaCgvXnJnYmE/W1xccytdP1xcKFtcXHMrXT8oXFxkKylbXFxzK10/LFtcXHMrXT8oXFxkKylbXFxzK10/LFtcXHMrXT8oXFxkKylbXFxzK10/L2kpO1xyXG5cclxuXHRcdHJldHVybiAocmdiICYmIHJnYi5sZW5ndGggPT09IDQpID8gXCIjXCIgK1xyXG5cdFx0XHQoXCIwXCIgKyBwYXJzZUludChyZ2JbMV0sIDEwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKSArXHJcblx0XHRcdChcIjBcIiArIHBhcnNlSW50KHJnYlsyXSwgMTApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpICtcclxuXHRcdFx0KFwiMFwiICsgcGFyc2VJbnQocmdiWzNdLCAxMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMikgOiByZ2I7XHJcblx0fSxcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodGhpcy5yZ2IyaGV4KHZhbHVlKSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImNvbG9yaW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29sb3JJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBDaGVja2JveElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbihldmVudCwgbm9kZSkge1xyXG5cdFx0XHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpXHJcblx0XHR7XHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt0aGlzLmNoZWNrZWQsIHRoaXNdKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuICAgIGV2ZW50czogW1xyXG4gICAgICAgIFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0IF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHRcclxuXHRpbml0OiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJjaGVja2JveGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbiAgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tib3hJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBCdXR0b25JbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNsaWNrXCIsIFwib25DaGFuZ2VcIiwgXCJidXR0b25cIiAvKidzZWxlY3QnKi9dLFxyXG5cdF0sXHJcblxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdidXR0b24nLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImJ1dHRvblwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uSW5wdXQ7IiwiY29uc3QgSW5wdXQgPSB7XHJcblx0XHJcblx0aW5pdDogZnVuY3Rpb24obmFtZSkge1xyXG5cdH0sXHJcblxyXG5cclxuXHRvbkNoYW5nZTogZnVuY3Rpb24oZXZlbnQsIG5vZGUpIHtcclxuXHRcdFxyXG5cdFx0aWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS5lbGVtZW50KVxyXG5cdFx0e1xyXG5cdFx0XHRldmVudC5kYXRhLmVsZW1lbnQudHJpZ2dlcigncHJvcGVydHlDaGFuZ2UnLCBbdGhpcy52YWx1ZSwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHJlbmRlclRlbXBsYXRlOiBmdW5jdGlvbihuYW1lLCBkYXRhKSB7XHJcblx0XHRyZXR1cm4gdG1wbChcInZ2dmViLWlucHV0LVwiICsgbmFtZSwgZGF0YSk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbihuYW1lLCBkYXRhKSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKHRoaXMucmVuZGVyVGVtcGxhdGUobmFtZSwgZGF0YSkpO1xyXG5cdFx0XHJcblx0XHQvL2JpbmQgZXZlbnRzXHJcblx0XHRpZiAodGhpcy5ldmVudHMpXHJcblx0XHRmb3IgKHZhciBpIGluIHRoaXMuZXZlbnRzKVxyXG5cdFx0e1xyXG5cdFx0XHRldmVudCA9IHRoaXMuZXZlbnRzW2ldWzBdO1xyXG5cdFx0XHRmdW4gPSB0aGlzWyB0aGlzLmV2ZW50c1tpXVsxXSBdO1xyXG5cdFx0XHRlbCA9IHRoaXMuZXZlbnRzW2ldWzJdO1xyXG5cdFx0XHJcblx0XHRcdHRoaXMuZWxlbWVudC5vbihldmVudCwgZWwsIHtlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGlucHV0OnRoaXN9LCBmdW4pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLmVsZW1lbnQ7XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5wdXQ7IiwiY29uc3QgYmdjb2xvckNsYXNzZXMgPSBbXCJiZy1wcmltYXJ5XCIsIFwiYmctc2Vjb25kYXJ5XCIsIFwiYmctc3VjY2Vzc1wiLCBcImJnLWRhbmdlclwiLCBcImJnLXdhcm5pbmdcIiwgXCJiZy1pbmZvXCIsIFwiYmctbGlnaHRcIiwgXCJiZy1kYXJrXCIsIFwiYmctd2hpdGVcIl07XHJcblxyXG5jb25zdCBiZ2NvbG9yU2VsZWN0T3B0aW9ucyA9XHJcbiAgICBbe1xyXG4gICAgICAgIHZhbHVlOiBcIkRlZmF1bHRcIixcclxuICAgICAgICB0ZXh0OiBcIlwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLXByaW1hcnlcIixcclxuICAgICAgICB0ZXh0OiBcIlByaW1hcnlcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLXNlY29uZGFyeVwiLFxyXG4gICAgICAgIHRleHQ6IFwiU2Vjb25kYXJ5XCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1zdWNjZXNzXCIsXHJcbiAgICAgICAgdGV4dDogXCJTdWNjZXNzXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1kYW5nZXJcIixcclxuICAgICAgICB0ZXh0OiBcIkRhbmdlclwiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctd2FybmluZ1wiLFxyXG4gICAgICAgIHRleHQ6IFwiV2FybmluZ1wiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctaW5mb1wiLFxyXG4gICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctbGlnaHRcIixcclxuICAgICAgICB0ZXh0OiBcIkxpZ2h0XCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1kYXJrXCIsXHJcbiAgICAgICAgdGV4dDogXCJEYXJrXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy13aGl0ZVwiLFxyXG4gICAgICAgIHRleHQ6IFwiV2hpdGVcIlxyXG4gICAgfV07XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VOb2RlTmFtZShub2RlLCBuZXdOb2RlTmFtZSkge1xyXG4gICAgdmFyIG5ld05vZGU7XHJcbiAgICBuZXdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuZXdOb2RlTmFtZSk7XHJcbiAgICBhdHRyaWJ1dGVzID0gbm9kZS5nZXQoMCkuYXR0cmlidXRlcztcclxuXHJcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBhdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgbmV3Tm9kZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlc1tpXS5ub2RlTmFtZSwgYXR0cmlidXRlc1tpXS5ub2RlVmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgICQobmV3Tm9kZSkuYXBwZW5kKCQobm9kZSkuY29udGVudHMoKSk7XHJcbiAgICAkKG5vZGUpLnJlcGxhY2VXaXRoKG5ld05vZGUpO1xyXG5cclxuICAgIHJldHVybiBuZXdOb2RlO1xyXG59XHJcblxyXG5sZXQgYmFzZV9zb3J0ID0gMTAwOy8vc3RhcnQgc29ydGluZyBmb3IgYmFzZSBjb21wb25lbnQgZnJvbSAxMDAgdG8gYWxsb3cgZXh0ZW5kZWQgcHJvcGVydGllcyB0byBiZSBmaXJzdFxyXG5mdW5jdGlvbiBpbmNfYmFzZV9zb3J0KCkge1xyXG4gICAgcmV0dXJuIGJhc2Vfc29ydCsrO1xyXG59XHJcblxyXG5jb25zdCBkYXRhQ29tcG9uZW50SWQgPSAnZGF0YS1jb21wb25lbnQtaWQnO1xyXG5cclxuZXhwb3J0IHsgYmdjb2xvckNsYXNzZXMsIGJnY29sb3JTZWxlY3RPcHRpb25zLCBjaGFuZ2VOb2RlTmFtZSwgaW5jX2Jhc2Vfc29ydCwgZGF0YUNvbXBvbmVudElkIH07XHJcbiJdfQ==
