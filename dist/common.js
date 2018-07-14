require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({52:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _inputs = require('./inputs/inputs');

var _jsoup = require('./util/jsoup');

var _download = require('./util/download');

var _fullScreen = require('./util/fullScreen');

/*
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
		if ($(node).attr('data-component-id') && this._components[$(node).attr('data-component-id')]) {
			return this._components[$(node).attr('data-component-id')];
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

},{"./inputs/inputs":164,"./util/download":168,"./util/fullScreen":170,"./util/jsoup":171}],171:[function(require,module,exports){
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

},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGRlci5qcyIsInNyYy91dGlsL2pzb3VwLmpzIiwic3JjL3V0aWwvZnVsbFNjcmVlbi5qcyIsInNyYy91dGlsL2Rvd25sb2FkLmpzIiwic3JjL2lucHV0cy9pbnB1dHMuanMiLCJzcmMvaW5wdXRzL1ZhbHVlVGV4dElucHV0LmpzIiwic3JjL2lucHV0cy9Ub2dnbGVJbnB1dC5qcyIsInNyYy9pbnB1dHMvVGV4dFZhbHVlSW5wdXQuanMiLCJzcmMvaW5wdXRzL1NlbGVjdElucHV0LmpzIiwic3JjL2lucHV0cy9TZWN0aW9uSW5wdXQuanMiLCJzcmMvaW5wdXRzL1JhbmdlSW5wdXQuanMiLCJzcmMvaW5wdXRzL1JhZGlvQnV0dG9uSW5wdXQuanMiLCJzcmMvaW5wdXRzL1JhZGlvSW5wdXQuanMiLCJzcmMvaW5wdXRzL1Byb2R1Y3RzSW5wdXQuanMiLCJzcmMvaW5wdXRzL051bWJlcklucHV0LmpzIiwic3JjL2lucHV0cy9MaXN0SW5wdXQuanMiLCJzcmMvaW5wdXRzL0xpbmtJbnB1dC5qcyIsInNyYy9pbnB1dHMvR3JpZExheW91dElucHV0LmpzIiwic3JjL2lucHV0cy9HcmlkSW5wdXQuanMiLCJzcmMvaW5wdXRzL0ZpbGVVcGxvYWRJbnB1dC5qcyIsInNyYy9pbnB1dHMvVGV4dElucHV0LmpzIiwic3JjL2lucHV0cy9Dc3NVbml0SW5wdXQuanMiLCJzcmMvaW5wdXRzL0NvbG9ySW5wdXQuanMiLCJzcmMvaW5wdXRzL0NoZWNrYm94SW5wdXQuanMiLCJzcmMvaW5wdXRzL0J1dHRvbklucHV0LmpzIiwic3JjL2lucHV0cy9JbnB1dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNxQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBeEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkE7QUFDQTtBQU1BLENBQUMsWUFBWTtBQUNaLEtBQUksUUFBUSxFQUFaOztBQUVB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QW9CLElBQXBCLEVBQTBCLElBQTFCLENBQUYsQ0FBZjs7QUFFQTtBQUNBLE1BQUksS0FBSyxNQUFULEVBQ0EsS0FBSyxJQUFJLENBQVQsSUFBYyxLQUFLLE1BQW5CLEVBQ0E7QUFDQyxXQUFRLEtBQUssTUFBTCxDQUFZLENBQVosRUFBZSxDQUFmLENBQVI7QUFDQSxTQUFNLEtBQU0sS0FBSyxNQUFMLENBQVksQ0FBWixFQUFlLENBQWYsQ0FBTixDQUFOO0FBQ0EsUUFBSyxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsQ0FBZixDQUFMOztBQUVBLFFBQUssT0FBTCxDQUFhLEVBQWIsQ0FBZ0IsS0FBaEIsRUFBdUIsRUFBdkIsRUFBMkIsRUFBQyxTQUFTLEtBQUssT0FBZixFQUF3QixPQUFNLElBQTlCLEVBQTNCLEVBQWdFLEdBQWhFO0FBQ0E7O0FBRUQsU0FBTyxLQUFLLE9BQVo7QUFDQTtBQWpDWSxDQUFkOztrQkFvQ2UsSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qXHJcbkNvcHlyaWdodCAyMDE3IFppYWRpbiBHaXZhblxyXG5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHJcbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG5cclxuaHR0cHM6Ly9naXRodWIuY29tL2dpdmFuL1Z2dmViSnNcclxuKi9cclxuXHJcblxyXG4vLyBTaW1wbGUgSmF2YVNjcmlwdCBUZW1wbGF0aW5nXHJcbi8vIEpvaG4gUmVzaWcgLSBodHRwczovL2pvaG5yZXNpZy5jb20vIC0gTUlUIExpY2Vuc2VkXHJcbmltcG9ydCB7IFNlY3Rpb25JbnB1dCB9IGZyb20gJy4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IHJlbW92ZVVudXNlZFRhZ3MgfSBmcm9tICcuL3V0aWwvanNvdXAnO1xyXG5pbXBvcnQgeyBkb3dubG9hZEFzVGV4dEZpbGUgfSBmcm9tICcuL3V0aWwvZG93bmxvYWQnO1xyXG5pbXBvcnQgeyBsYXVuY2hGdWxsU2NyZWVuIH0gZnJvbSAnLi91dGlsL2Z1bGxTY3JlZW4nO1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgY2FjaGUgPSB7fTtcclxuXHJcblx0dGhpcy50bXBsID0gZnVuY3Rpb24gdG1wbChzdHIsIGRhdGEpIHtcclxuXHRcdC8vIEZpZ3VyZSBvdXQgaWYgd2UncmUgZ2V0dGluZyBhIHRlbXBsYXRlLCBvciBpZiB3ZSBuZWVkIHRvXHJcblx0XHQvLyBsb2FkIHRoZSB0ZW1wbGF0ZSAtIGFuZCBiZSBzdXJlIHRvIGNhY2hlIHRoZSByZXN1bHQuXHJcblx0XHR2YXIgZm4gPSAvXlstYS16QS1aMC05XSskLy50ZXN0KHN0cikgP1xyXG5cdFx0XHRjYWNoZVtzdHJdID0gY2FjaGVbc3RyXSB8fFxyXG5cdFx0XHR0bXBsKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHN0cikuaW5uZXJIVE1MKSA6XHJcblxyXG5cdFx0XHQvLyBHZW5lcmF0ZSBhIHJldXNhYmxlIGZ1bmN0aW9uIHRoYXQgd2lsbCBzZXJ2ZSBhcyBhIHRlbXBsYXRlXHJcblx0XHRcdC8vIGdlbmVyYXRvciAoYW5kIHdoaWNoIHdpbGwgYmUgY2FjaGVkKS5cclxuXHRcdFx0bmV3IEZ1bmN0aW9uKFwib2JqXCIsXHJcblx0XHRcdFx0XCJ2YXIgcD1bXSxwcmludD1mdW5jdGlvbigpe3AucHVzaC5hcHBseShwLGFyZ3VtZW50cyk7fTtcIiArXHJcblxyXG5cdFx0XHRcdC8vIEludHJvZHVjZSB0aGUgZGF0YSBhcyBsb2NhbCB2YXJpYWJsZXMgdXNpbmcgd2l0aCgpe31cclxuXHRcdFx0XHRcIndpdGgob2JqKXtwLnB1c2goJ1wiICtcclxuXHJcblx0XHRcdFx0Ly8gQ29udmVydCB0aGUgdGVtcGxhdGUgaW50byBwdXJlIEphdmFTY3JpcHRcclxuXHRcdFx0XHRzdHJcclxuXHRcdFx0XHRcdC5yZXBsYWNlKC9bXFxyXFx0XFxuXS9nLCBcIiBcIilcclxuXHRcdFx0XHRcdC5zcGxpdChcInslXCIpLmpvaW4oXCJcXHRcIilcclxuXHRcdFx0XHRcdC5yZXBsYWNlKC8oKF58JX0pW15cXHRdKiknL2csIFwiJDFcXHJcIilcclxuXHRcdFx0XHRcdC5yZXBsYWNlKC9cXHQ9KC4qPyklfS9nLCBcIicsJDEsJ1wiKVxyXG5cdFx0XHRcdFx0LnNwbGl0KFwiXFx0XCIpLmpvaW4oXCInKTtcIilcclxuXHRcdFx0XHRcdC5zcGxpdChcIiV9XCIpLmpvaW4oXCJwLnB1c2goJ1wiKVxyXG5cdFx0XHRcdFx0LnNwbGl0KFwiXFxyXCIpLmpvaW4oXCJcXFxcJ1wiKVxyXG5cdFx0XHRcdCsgXCInKTt9cmV0dXJuIHAuam9pbignJyk7XCIpO1xyXG5cdFx0Ly8gUHJvdmlkZSBzb21lIGJhc2ljIGN1cnJ5aW5nIHRvIHRoZSB1c2VyXHJcblx0XHRyZXR1cm4gZGF0YSA/IGZuKGRhdGEpIDogZm47XHJcblx0fTtcclxufSkoKTtcclxuXHJcbnZhciBkZWxheSA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHRpbWVyID0gMDtcclxuXHRyZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrLCBtcykge1xyXG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuXHRcdHRpbWVyID0gc2V0VGltZW91dChjYWxsYmFjaywgbXMpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5jb25zdCB1bnVzZWRUYWdzID0gW1xyXG5cdC8vIHtcclxuXHQvLyBcdG5hbWU6ICdzY3JpcHQnXHJcblx0Ly8gfSxcclxuXHR7XHJcblx0XHRuYW1lOiAnbGluaycsXHJcblx0XHRmaWx0ZXI6IHRhZyA9PiB0YWcuZ2V0QXR0cmlidXRlKCdyZWwnKSA9PSAnc3R5bGVzaGVldCdcclxuXHRcdFx0JiYgdGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpLmluY2x1ZGVzKCdkcmFnLW4tZHJvcCcpXHJcblx0fSxcclxuXHR7XHJcblx0XHRuYW1lOiAnaHInLFxyXG5cdFx0ZmlsdGVyOiB0YWcgPT4gJCh0YWcpLmhhc0NsYXNzKCdob3Jpem9udGFsLWxpbmUnKVxyXG5cdFx0XHR8fCAkKHRhZykuaGFzQ2xhc3MoJ3ZlcnRpY2FsLWxpbmUnKVxyXG5cdH1cclxuXTtcclxuXHJcbmZ1bmN0aW9uIGdldFN0eWxlKGVsLCBzdHlsZVByb3ApIHtcclxuXHR2YWx1ZSA9IFwiXCI7XHJcblx0Ly92YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbCk7XHJcblx0aWYgKGVsLnN0eWxlICYmIGVsLnN0eWxlLmxlbmd0aCA+IDAgJiYgZWwuc3R5bGVbc3R5bGVQcm9wXSkvL2NoZWNrIGlubGluZVxyXG5cdFx0dmFyIHZhbHVlID0gZWwuc3R5bGVbc3R5bGVQcm9wXTtcclxuXHRlbHNlXHJcblx0XHRpZiAoZWwuY3VycmVudFN0eWxlKVx0Ly9jaGVjayBkZWZpbmVkIGNzc1xyXG5cdFx0XHR2YXIgdmFsdWUgPSBlbC5jdXJyZW50U3R5bGVbc3R5bGVQcm9wXTtcclxuXHRcdGVsc2UgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XHJcblx0XHRcdHZhciB2YWx1ZSA9IGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldERlZmF1bHRDb21wdXRlZFN0eWxlID9cclxuXHRcdFx0XHRkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXREZWZhdWx0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZVByb3ApIDpcclxuXHRcdFx0XHR3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZVByb3ApO1xyXG5cdFx0fVxyXG5cclxuXHRyZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmlmIChWdnZlYiA9PT0gdW5kZWZpbmVkKSB2YXIgVnZ2ZWIgPSB7fTtcclxuXHJcblZ2dmViLmRlZmF1bHRDb21wb25lbnQgPSBcIl9iYXNlXCI7XHJcblZ2dmViLnByZXNlcnZlUHJvcGVydHlTZWN0aW9ucyA9IHRydWU7XHJcblxyXG5WdnZlYi5iYXNlVXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdCA/IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjLnJlcGxhY2UoL1teXFwvXSo/XFwuanMkLywgJycpIDogJyc7XHJcblxyXG5WdnZlYi5Db21wb25lbnRzR3JvdXAgPSB7fTtcclxuXHJcblZ2dmViLkNvbXBvbmVudHMgPSB7XHJcblx0X2NvbXBvbmVudHM6IHt9LFxyXG5cclxuXHRfbm9kZXNMb29rdXA6IHt9LFxyXG5cclxuXHRfYXR0cmlidXRlc0xvb2t1cDoge30sXHJcblxyXG5cdF9jbGFzc2VzTG9va3VwOiB7fSxcclxuXHJcblx0X2NsYXNzZXNSZWdleExvb2t1cDoge30sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uICh1cmwpIHtcclxuXHR9LFxyXG5cclxuXHRnZXQ6IGZ1bmN0aW9uICh0eXBlKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY29tcG9uZW50c1t0eXBlXTtcclxuXHR9LFxyXG5cclxuXHRhZGQ6IGZ1bmN0aW9uICh0eXBlLCBkYXRhKSB7XHJcblx0XHRkYXRhLnR5cGUgPSB0eXBlO1xyXG5cclxuXHRcdHRoaXMuX2NvbXBvbmVudHNbdHlwZV0gPSBkYXRhO1xyXG5cclxuXHRcdGlmIChkYXRhLm5vZGVzKSB7XHJcblx0XHRcdGZvciAodmFyIGkgaW4gZGF0YS5ub2Rlcykge1xyXG5cdFx0XHRcdHRoaXMuX25vZGVzTG9va3VwW2RhdGEubm9kZXNbaV1dID0gZGF0YTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkYXRhLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0aWYgKGRhdGEuYXR0cmlidXRlcy5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcclxuXHRcdFx0XHRmb3IgKHZhciBpIGluIGRhdGEuYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlc0xvb2t1cFtkYXRhLmF0dHJpYnV0ZXNbaV1dID0gZGF0YTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSBpbiBkYXRhLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5fYXR0cmlidXRlc0xvb2t1cFtpXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlc0xvb2t1cFtpXSA9IHt9O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChkYXRhLmF0dHJpYnV0ZXNbaV0uY29uc3RydWN0b3IgPT09IEFycmF5KSB7XHJcblx0XHRcdFx0XHRcdC8vIOaUr+aMgXRleHRpbnB1dOS4reS4jeWQjOeahOi+k+WFpeexu+Wei2F0dHJpYnV0ZXM6IHsgXCJ0eXBlXCI6IFsndGV4dCcsICdwYXNzd29yZCddIH0sXHJcblx0XHRcdFx0XHRcdGRhdGEuYXR0cmlidXRlc1tpXS5mb3JFYWNoKHZhbHVlID0+IHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2ldW3ZhbHVlXSA9IGRhdGE7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlc0xvb2t1cFtpXVtkYXRhLmF0dHJpYnV0ZXNbaV1dID0gZGF0YTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZGF0YS5jbGFzc2VzKSB7XHJcblx0XHRcdGZvciAodmFyIGkgaW4gZGF0YS5jbGFzc2VzKSB7XHJcblx0XHRcdFx0dGhpcy5fY2xhc3Nlc0xvb2t1cFtkYXRhLmNsYXNzZXNbaV1dID0gZGF0YTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkYXRhLmNsYXNzZXNSZWdleCkge1xyXG5cdFx0XHRmb3IgKHZhciBpIGluIGRhdGEuY2xhc3Nlc1JlZ2V4KSB7XHJcblx0XHRcdFx0dGhpcy5fY2xhc3Nlc1JlZ2V4TG9va3VwW2RhdGEuY2xhc3Nlc1JlZ2V4W2ldXSA9IGRhdGE7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRleHRlbmQ6IGZ1bmN0aW9uIChpbmhlcml0VHlwZSwgdHlwZSwgZGF0YSkge1xyXG5cclxuXHRcdG5ld0RhdGEgPSBkYXRhO1xyXG5cclxuXHRcdGlmIChpbmhlcml0RGF0YSA9IHRoaXMuX2NvbXBvbmVudHNbaW5oZXJpdFR5cGVdKSB7XHJcblx0XHRcdG5ld0RhdGEgPSAkLmV4dGVuZCh0cnVlLCB7fSwgaW5oZXJpdERhdGEsIGRhdGEpO1xyXG5cdFx0XHRuZXdEYXRhLnByb3BlcnRpZXMgPSAkLm1lcmdlKCQubWVyZ2UoW10sIGluaGVyaXREYXRhLnByb3BlcnRpZXMgPyBpbmhlcml0RGF0YS5wcm9wZXJ0aWVzIDogW10pLCBkYXRhLnByb3BlcnRpZXMgPyBkYXRhLnByb3BlcnRpZXMgOiBbXSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly9zb3J0IGJ5IG9yZGVyXHJcblx0XHRuZXdEYXRhLnByb3BlcnRpZXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG5cdFx0XHRpZiAodHlwZW9mIGEuc29ydCA9PT0gXCJ1bmRlZmluZWRcIikgYS5zb3J0ID0gMDtcclxuXHRcdFx0aWYgKHR5cGVvZiBiLnNvcnQgPT09IFwidW5kZWZpbmVkXCIpIGIuc29ydCA9IDA7XHJcblxyXG5cdFx0XHRpZiAoYS5zb3J0IDwgYi5zb3J0KVxyXG5cdFx0XHRcdHJldHVybiAtMTtcclxuXHRcdFx0aWYgKGEuc29ydCA+IGIuc29ydClcclxuXHRcdFx0XHRyZXR1cm4gMTtcclxuXHRcdFx0cmV0dXJuIDA7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0dGhpcy5hZGQodHlwZSwgbmV3RGF0YSk7XHJcblx0fSxcclxuXHJcblxyXG5cdG1hdGNoTm9kZTogZnVuY3Rpb24gKG5vZGUpIHtcclxuXHRcdGlmICgkKG5vZGUpLmF0dHIoJ2RhdGEtY29tcG9uZW50LWlkJykgJiYgdGhpcy5fY29tcG9uZW50c1skKG5vZGUpLmF0dHIoJ2RhdGEtY29tcG9uZW50LWlkJyldKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9jb21wb25lbnRzWyQobm9kZSkuYXR0cignZGF0YS1jb21wb25lbnQtaWQnKV07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG5vZGUuYXR0cmlidXRlcy5sZW5ndGgpIHtcclxuXHRcdFx0Ly9zZWFyY2ggZm9yIGF0dHJpYnV0ZXNcclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBub2RlLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRhdHRyID0gbm9kZS5hdHRyaWJ1dGVzW2ldLm5hbWU7XHJcblx0XHRcdFx0dmFsdWUgPSBub2RlLmF0dHJpYnV0ZXNbaV0udmFsdWU7XHJcblxyXG5cdFx0XHRcdGlmIChhdHRyIGluIHRoaXMuX2F0dHJpYnV0ZXNMb29rdXApIHtcclxuXHRcdFx0XHRcdGNvbXBvbmVudCA9IHRoaXMuX2F0dHJpYnV0ZXNMb29rdXBbYXR0cl07XHJcblxyXG5cdFx0XHRcdFx0Ly9jdXJyZW50bHkgd2UgY2hlY2sgdGhhdCBpcyBub3QgYSBjb21wb25lbnQgYnkgbG9va2luZyBhdCBuYW1lIGF0dHJpYnV0ZVxyXG5cdFx0XHRcdFx0Ly9pZiB3ZSBoYXZlIGEgY29sbGVjdGlvbiBvZiBvYmplY3RzIGl0IG1lYW5zIHRoYXQgYXR0cmlidXRlIHZhbHVlIG11c3QgYmUgY2hlY2tlZFxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBjb21wb25lbnRbXCJuYW1lXCJdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdFx0XHRcdGlmICh2YWx1ZSBpbiBjb21wb25lbnQpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gY29tcG9uZW50W3ZhbHVlXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlXHJcblx0XHRcdFx0XHRcdHJldHVybiBjb21wb25lbnQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpIGluIG5vZGUuYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdGF0dHIgPSBub2RlLmF0dHJpYnV0ZXNbaV0ubmFtZTtcclxuXHRcdFx0XHR2YWx1ZSA9IG5vZGUuYXR0cmlidXRlc1tpXS52YWx1ZTtcclxuXHJcblx0XHRcdFx0Ly9jaGVjayBmb3Igbm9kZSBjbGFzc2VzXHJcblx0XHRcdFx0aWYgKGF0dHIgPT0gXCJjbGFzc1wiKSB7XHJcblx0XHRcdFx0XHRjbGFzc2VzID0gdmFsdWUuc3BsaXQoXCIgXCIpO1xyXG5cclxuXHRcdFx0XHRcdGZvciAoaiBpbiBjbGFzc2VzKSB7XHJcblx0XHRcdFx0XHRcdGlmIChjbGFzc2VzW2pdIGluIHRoaXMuX2NsYXNzZXNMb29rdXApXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2NsYXNzZXNMb29rdXBbY2xhc3Nlc1tqXV07XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Zm9yIChyZWdleCBpbiB0aGlzLl9jbGFzc2VzUmVnZXhMb29rdXApIHtcclxuXHRcdFx0XHRcdFx0cmVnZXhPYmogPSBuZXcgUmVnRXhwKHJlZ2V4KTtcclxuXHRcdFx0XHRcdFx0aWYgKHJlZ2V4T2JqLmV4ZWModmFsdWUpKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2NsYXNzZXNSZWdleExvb2t1cFtyZWdleF07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0YWdOYW1lID0gbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRpZiAodGFnTmFtZSBpbiB0aGlzLl9ub2Rlc0xvb2t1cCkgcmV0dXJuIHRoaXMuX25vZGVzTG9va3VwW3RhZ05hbWVdO1xyXG5cclxuXHRcdC8vcmV0dXJuIGZhbHNlO1xyXG5cdFx0cmV0dXJuIHRoaXMuZ2V0KFZ2dmViLmRlZmF1bHRDb21wb25lbnQpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24gKHR5cGUpIHtcclxuXHJcblx0XHRjb21wb25lbnQgPSB0aGlzLl9jb21wb25lbnRzW3R5cGVdO1xyXG5cclxuXHRcdHJpZ2h0UGFuZWwgPSBqUXVlcnkoXCIjcmlnaHQtcGFuZWwgI2NvbXBvbmVudC1wcm9wZXJ0aWVzXCIpO1xyXG5cdFx0c2VjdGlvbiA9IHJpZ2h0UGFuZWwuZmluZCgnLnNlY3Rpb25bZGF0YS1zZWN0aW9uPVwiZGVmYXVsdFwiXScpO1xyXG5cclxuXHRcdGlmICghKFZ2dmViLnByZXNlcnZlUHJvcGVydHlTZWN0aW9ucyAmJiBzZWN0aW9uLmxlbmd0aCkpIHtcclxuXHRcdFx0cmlnaHRQYW5lbC5odG1sKCcnKS5hcHBlbmQodG1wbChcInZ2dmViLWlucHV0LXNlY3Rpb25pbnB1dFwiLCB7IGtleTogXCJkZWZhdWx0XCIsIGhlYWRlcjogY29tcG9uZW50Lm5hbWUgfSkpO1xyXG5cdFx0XHRzZWN0aW9uID0gcmlnaHRQYW5lbC5maW5kKFwiLnNlY3Rpb25cIik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmlnaHRQYW5lbC5maW5kKCdbZGF0YS1oZWFkZXI9XCJkZWZhdWx0XCJdIHNwYW4nKS5odG1sKGNvbXBvbmVudC5uYW1lKTtcclxuXHRcdHNlY3Rpb24uaHRtbChcIlwiKVxyXG5cclxuXHRcdGlmIChjb21wb25lbnQuYmVmb3JlSW5pdCkgY29tcG9uZW50LmJlZm9yZUluaXQoVnZ2ZWIuQnVpbGRlci5zZWxlY3RlZEVsLmdldCgwKSk7XHJcblxyXG5cdFx0Zm4gPSBmdW5jdGlvbiAoY29tcG9uZW50LCBwcm9wZXJ0eSkge1xyXG5cdFx0XHRyZXR1cm4gcHJvcGVydHkuaW5wdXQub24oJ3Byb3BlcnR5Q2hhbmdlJywgZnVuY3Rpb24gKGV2ZW50LCB2YWx1ZSwgaW5wdXQpIHtcclxuXHRcdFx0XHRlbGVtZW50ID0gVnZ2ZWIuQnVpbGRlci5zZWxlY3RlZEVsO1xyXG5cdFx0XHRcdGlmIChwcm9wZXJ0eS5jaGlsZCkgZWxlbWVudCA9IGVsZW1lbnQuZmluZChwcm9wZXJ0eS5jaGlsZCk7XHJcblx0XHRcdFx0aWYgKHByb3BlcnR5LnBhcmVudCkgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50KHByb3BlcnR5LnBhcmVudCk7XHJcblxyXG5cdFx0XHRcdGlmIChwcm9wZXJ0eS5vbkNoYW5nZSkge1xyXG5cdFx0XHRcdFx0ZWxlbWVudCA9IHByb3BlcnR5Lm9uQ2hhbmdlKGVsZW1lbnQsIHZhbHVlLCBpbnB1dCwgY29tcG9uZW50KTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5Lmh0bWxBdHRyKSB7XHJcblx0XHRcdFx0XHRvbGRWYWx1ZSA9IGVsZW1lbnQuYXR0cihwcm9wZXJ0eS5odG1sQXR0cik7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHByb3BlcnR5Lmh0bWxBdHRyID09IFwiY2xhc3NcIiAmJiBwcm9wZXJ0eS52YWxpZFZhbHVlcykge1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50LnJlbW92ZUNsYXNzKHByb3BlcnR5LnZhbGlkVmFsdWVzLmpvaW4oXCIgXCIpKTtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQuYWRkQ2xhc3ModmFsdWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAocHJvcGVydHkuaHRtbEF0dHIgPT0gXCJzdHlsZVwiKSB7XHJcblx0XHRcdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LmNzcyhwcm9wZXJ0eS5rZXksIHZhbHVlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5hdHRyKHByb3BlcnR5Lmh0bWxBdHRyLCB2YWx1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0XHRcdHR5cGU6ICdhdHRyaWJ1dGVzJyxcclxuXHRcdFx0XHRcdFx0dGFyZ2V0OiBlbGVtZW50LmdldCgwKSxcclxuXHRcdFx0XHRcdFx0YXR0cmlidXRlTmFtZTogcHJvcGVydHkuaHRtbEF0dHIsXHJcblx0XHRcdFx0XHRcdG9sZFZhbHVlOiBvbGRWYWx1ZSxcclxuXHRcdFx0XHRcdFx0bmV3VmFsdWU6IGVsZW1lbnQuYXR0cihwcm9wZXJ0eS5odG1sQXR0cilcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGNvbXBvbmVudC5vbkNoYW5nZSkge1xyXG5cdFx0XHRcdFx0ZWxlbWVudCA9IGNvbXBvbmVudC5vbkNoYW5nZShlbGVtZW50LCBwcm9wZXJ0eSwgdmFsdWUsIGlucHV0KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICghcHJvcGVydHkuY2hpbGQgJiYgIXByb3BlcnR5LnBhcmVudCkgVnZ2ZWIuQnVpbGRlci5zZWxlY3ROb2RlKGVsZW1lbnQpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0bm9kZUVsZW1lbnQgPSBWdnZlYi5CdWlsZGVyLnNlbGVjdGVkRWw7XHJcblxyXG5cdFx0Zm9yICh2YXIgaSBpbiBjb21wb25lbnQucHJvcGVydGllcykge1xyXG5cdFx0XHRwcm9wZXJ0eSA9IGNvbXBvbmVudC5wcm9wZXJ0aWVzW2ldO1xyXG5cclxuXHRcdFx0aWYgKHByb3BlcnR5LmJlZm9yZUluaXQpIHByb3BlcnR5LmJlZm9yZUluaXQoZWxlbWVudC5nZXQoMCkpXHJcblxyXG5cdFx0XHRlbGVtZW50ID0gbm9kZUVsZW1lbnQ7XHJcblx0XHRcdGlmIChwcm9wZXJ0eS5jaGlsZCkgZWxlbWVudCA9IGVsZW1lbnQuZmluZChwcm9wZXJ0eS5jaGlsZCk7XHJcblxyXG5cdFx0XHRpZiAocHJvcGVydHkuZGF0YSkge1xyXG5cdFx0XHRcdHByb3BlcnR5LmRhdGFbXCJrZXlcIl0gPSBwcm9wZXJ0eS5rZXk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cHJvcGVydHkuZGF0YSA9IHsgXCJrZXlcIjogcHJvcGVydHkua2V5IH07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0eXBlb2YgcHJvcGVydHkuZ3JvdXAgPT09ICd1bmRlZmluZWQnKSBwcm9wZXJ0eS5ncm91cCA9IG51bGw7XHJcblxyXG5cdFx0XHRwcm9wZXJ0eS5pbnB1dCA9IHByb3BlcnR5LmlucHV0dHlwZS5pbml0KHByb3BlcnR5LmRhdGEpO1xyXG5cclxuXHRcdFx0aWYgKHByb3BlcnR5LmluaXQpIHtcclxuXHRcdFx0XHRwcm9wZXJ0eS5pbnB1dHR5cGUuc2V0VmFsdWUocHJvcGVydHkuaW5pdChlbGVtZW50LmdldCgwKSkpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5Lmh0bWxBdHRyKSB7XHJcblx0XHRcdFx0aWYgKHByb3BlcnR5Lmh0bWxBdHRyID09IFwic3R5bGVcIikge1xyXG5cdFx0XHRcdFx0Ly92YWx1ZSA9IGVsZW1lbnQuY3NzKHByb3BlcnR5LmtleSk7Ly9qcXVlcnkgY3NzIHJldHVybnMgY29tcHV0ZWQgc3R5bGVcclxuXHRcdFx0XHRcdHZhbHVlID0gZ2V0U3R5bGUoZWxlbWVudC5nZXQoMCksIHByb3BlcnR5LmtleSk7Ly9nZXRTdHlsZSByZXR1cm5zIGRlY2xhcmVkIHN0eWxlXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHZhbHVlID0gZWxlbWVudC5hdHRyKHByb3BlcnR5Lmh0bWxBdHRyKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vaWYgYXR0cmlidXRlIGlzIGNsYXNzIGNoZWNrIGlmIG9uZSBvZiB2YWxpZCB2YWx1ZXMgaXMgaW5jbHVkZWQgYXMgY2xhc3MgdG8gc2V0IHRoZSBzZWxlY3RcclxuXHRcdFx0XHRpZiAodmFsdWUgJiYgcHJvcGVydHkuaHRtbEF0dHIgPT0gXCJjbGFzc1wiICYmIHByb3BlcnR5LnZhbGlkVmFsdWVzKSB7XHJcblx0XHRcdFx0XHR2YWx1ZSA9IHZhbHVlLnNwbGl0KFwiIFwiKS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBwcm9wZXJ0eS52YWxpZFZhbHVlcy5pbmRleE9mKGVsKSAhPSAtMVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRwcm9wZXJ0eS5pbnB1dHR5cGUuc2V0VmFsdWUodmFsdWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmbihjb21wb25lbnQsIHByb3BlcnR5KTtcclxuXHJcblx0XHRcdGlmIChwcm9wZXJ0eS5pbnB1dHR5cGUgPT0gU2VjdGlvbklucHV0KSB7XHJcblx0XHRcdFx0c2VjdGlvbiA9IHJpZ2h0UGFuZWwuZmluZCgnLnNlY3Rpb25bZGF0YS1zZWN0aW9uPVwiJyArIHByb3BlcnR5LmtleSArICdcIl0nKTtcclxuXHJcblx0XHRcdFx0aWYgKFZ2dmViLnByZXNlcnZlUHJvcGVydHlTZWN0aW9ucyAmJiBzZWN0aW9uLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0c2VjdGlvbi5odG1sKFwiXCIpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyaWdodFBhbmVsLmFwcGVuZChwcm9wZXJ0eS5pbnB1dCk7XHJcblx0XHRcdFx0XHRzZWN0aW9uID0gcmlnaHRQYW5lbC5maW5kKCcuc2VjdGlvbltkYXRhLXNlY3Rpb249XCInICsgcHJvcGVydHkua2V5ICsgJ1wiXScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRyb3cgPSAkKHRtcGwoJ3Z2dmViLXByb3BlcnR5JywgcHJvcGVydHkpKTtcclxuXHRcdFx0XHRyb3cuZmluZCgnLmlucHV0JykuYXBwZW5kKHByb3BlcnR5LmlucHV0KTtcclxuXHRcdFx0XHRzZWN0aW9uLmFwcGVuZChyb3cpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbXBvbmVudC5pbml0KSBjb21wb25lbnQuaW5pdChWdnZlYi5CdWlsZGVyLnNlbGVjdGVkRWwuZ2V0KDApKTtcclxuXHR9XHJcbn07XHJcblxyXG5cclxuXHJcblZ2dmViLld5c2l3eWdFZGl0b3IgPSB7XHJcblxyXG5cdGlzQWN0aXZlOiBmYWxzZSxcclxuXHRvbGRWYWx1ZTogJycsXHJcblx0ZG9jOiBmYWxzZSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRvYykge1xyXG5cdFx0dGhpcy5kb2MgPSBkb2M7XHJcblxyXG5cdFx0JChcIiNib2xkLWJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGRvYy5leGVjQ29tbWFuZCgnYm9sZCcsIGZhbHNlLCBudWxsKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI2l0YWxpYy1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRkb2MuZXhlY0NvbW1hbmQoJ2l0YWxpYycsIGZhbHNlLCBudWxsKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI3VuZGVybGluZS1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRkb2MuZXhlY0NvbW1hbmQoJ3VuZGVybGluZScsIGZhbHNlLCBudWxsKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI3N0cmlrZS1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRkb2MuZXhlY0NvbW1hbmQoJ3N0cmlrZVRocm91Z2gnLCBmYWxzZSwgbnVsbCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNsaW5rLWJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGRvYy5leGVjQ29tbWFuZCgnY3JlYXRlTGluaycsIGZhbHNlLCBcIiNcIik7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0dW5kbzogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZG9jLmV4ZWNDb21tYW5kKCd1bmRvJywgZmFsc2UsIG51bGwpO1xyXG5cdH0sXHJcblxyXG5cdHJlZG86IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHR0aGlzLmRvYy5leGVjQ29tbWFuZCgncmVkbycsIGZhbHNlLCBudWxsKTtcclxuXHR9LFxyXG5cclxuXHRlZGl0OiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0ZWxlbWVudC5hdHRyKHsgJ2NvbnRlbnRlZGl0YWJsZSc6IHRydWUsICdzcGVsbGNoZWNra2VyJzogZmFsc2UgfSk7XHJcblx0XHQkKFwiI3d5c2l3eWctZWRpdG9yXCIpLnNob3coKTtcclxuXHJcblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG5cdFx0dGhpcy5pc0FjdGl2ZSA9IHRydWU7XHJcblx0XHR0aGlzLm9sZFZhbHVlID0gZWxlbWVudC5odG1sKCk7XHJcblx0fSxcclxuXHJcblx0ZGVzdHJveTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdGVsZW1lbnQucmVtb3ZlQXR0cignY29udGVudGVkaXRhYmxlIHNwZWxsY2hlY2trZXInKTtcclxuXHRcdCQoXCIjd3lzaXd5Zy1lZGl0b3JcIikuaGlkZSgpO1xyXG5cdFx0dGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuXHJcblx0XHRub2RlID0gdGhpcy5lbGVtZW50LmdldCgwKTtcclxuXHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHR0eXBlOiAnY2hhcmFjdGVyRGF0YScsXHJcblx0XHRcdHRhcmdldDogbm9kZSxcclxuXHRcdFx0b2xkVmFsdWU6IHRoaXMub2xkVmFsdWUsXHJcblx0XHRcdG5ld1ZhbHVlOiBub2RlLmlubmVySFRNTFxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5WdnZlYi5CdWlsZGVyID0ge1xyXG5cclxuXHRkcmFnTW92ZU11dGF0aW9uOiBmYWxzZSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKHVybCwgY2FsbGJhY2spIHtcclxuXHJcblx0XHRzZWxmID0gdGhpcztcclxuXHJcblx0XHRzZWxmLmxvYWRDb250cm9sR3JvdXBzKCk7XHJcblxyXG5cdFx0c2VsZi5zZWxlY3RlZEVsID0gbnVsbDtcclxuXHRcdHNlbGYuaGlnaGxpZ2h0RWwgPSBudWxsO1xyXG5cdFx0c2VsZi5pbml0Q2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHJcblx0XHRzZWxmLmRvY3VtZW50RnJhbWUgPSAkKFwiI2lmcmFtZS13cmFwcGVyID4gaWZyYW1lXCIpO1xyXG5cdFx0c2VsZi5jYW52YXMgPSAkKFwiI2NhbnZhc1wiKTtcclxuXHJcblx0XHRzZWxmLl9sb2FkSWZyYW1lKHVybCk7XHJcblxyXG5cdFx0c2VsZi5faW5pdERyYWdkcm9wKCk7XHJcblxyXG5cdFx0c2VsZi5kcmFnRWxlbWVudCA9IG51bGw7XHJcblx0fSxcclxuXHJcblx0LyogY29udHJvbHMgKi9cclxuXHRsb2FkQ29udHJvbEdyb3VwczogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdGNvbXBvbmVudHNMaXN0ID0gJChcIiNjb21wb25lbnRzLWxpc3RcIik7XHJcblx0XHRjb21wb25lbnRzTGlzdC5lbXB0eSgpO1xyXG5cclxuXHRcdGZvciAoZ3JvdXAgaW4gVnZ2ZWIuQ29tcG9uZW50c0dyb3VwKSB7XHJcblx0XHRcdGNvbXBvbmVudHNMaXN0LmFwcGVuZCgnPGxpIGNsYXNzPVwiaGVhZGVyXCIgZGF0YS1zZWN0aW9uPVwiJyArIGdyb3VwICsgJ1wiICBkYXRhLXNlYXJjaD1cIlwiPjxsYWJlbCBjbGFzcz1cImhlYWRlclwiIGZvcj1cImNvbXBoZWFkXycgKyBncm91cCArICdcIj4nICsgZ3JvdXAgKyAnICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWFycm93XCI+PC9kaXY+XFxcclxuXHRcdFx0XHRcdFx0XHRcdCAgIDwvbGFiZWw+PGlucHV0IGNsYXNzPVwiaGVhZGVyX2NoZWNrXCIgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD1cInRydWVcIiBpZD1cImNvbXBoZWFkXycgKyBncm91cCArICdcIj4gIDxvbD48L29sPjwvbGk+Jyk7XHJcblxyXG5cdFx0XHRjb21wb25lbnRzU3ViTGlzdCA9IGNvbXBvbmVudHNMaXN0LmZpbmQoJ2xpW2RhdGEtc2VjdGlvbj1cIicgKyBncm91cCArICdcIl0gIG9sJyk7XHJcblxyXG5cdFx0XHRjb21wb25lbnRzID0gVnZ2ZWIuQ29tcG9uZW50c0dyb3VwW2dyb3VwXTtcclxuXHJcblx0XHRcdGZvciAoaSBpbiBjb21wb25lbnRzKSB7XHJcblx0XHRcdFx0Y29tcG9uZW50VHlwZSA9IGNvbXBvbmVudHNbaV07XHJcblx0XHRcdFx0Y29tcG9uZW50ID0gVnZ2ZWIuQ29tcG9uZW50cy5nZXQoY29tcG9uZW50VHlwZSk7XHJcblxyXG5cdFx0XHRcdGlmIChjb21wb25lbnQpIHtcclxuXHRcdFx0XHRcdGl0ZW0gPSAkKCc8bGkgZGF0YS1zZWN0aW9uPVwiJyArIGdyb3VwICsgJ1wiIGRhdGEtdHlwZT1cIicgKyBjb21wb25lbnRUeXBlICsgJ1wiIGRhdGEtc2VhcmNoPVwiJyArIGNvbXBvbmVudC5uYW1lLnRvTG93ZXJDYXNlKCkgKyAnXCI+PGEgaHJlZj1cIiNcIj4nICsgY29tcG9uZW50Lm5hbWUgKyBcIjwvYT48L2xpPlwiKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoY29tcG9uZW50LmltYWdlKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRpdGVtLmNzcyh7XHJcblx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZEltYWdlOiBcInVybChcIiArICdsaWJzL2J1aWxkZXIvJyArIGNvbXBvbmVudC5pbWFnZSArIFwiKVwiLFxyXG5cdFx0XHRcdFx0XHRcdGJhY2tncm91bmRSZXBlYXQ6IFwibm8tcmVwZWF0XCJcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRjb21wb25lbnRzU3ViTGlzdC5hcHBlbmQoaXRlbSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRsb2FkVXJsOiBmdW5jdGlvbiAodXJsKSB7XHJcblx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblx0XHRzZWxmLmlmcmFtZS5zcmMgPSB1cmw7XHJcblx0fSxcclxuXHJcblx0LyogaWZyYW1lICovXHJcblx0X2xvYWRJZnJhbWU6IGZ1bmN0aW9uICh1cmwpIHtcclxuXHJcblx0XHRzZWxmLmlmcmFtZSA9IHRoaXMuZG9jdW1lbnRGcmFtZS5nZXQoMCk7XHJcblx0XHRzZWxmLmlmcmFtZS5zcmMgPSB1cmw7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuZG9jdW1lbnRGcmFtZS5vbihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0d2luZG93LkZyYW1lV2luZG93ID0gc2VsZi5pZnJhbWUuY29udGVudFdpbmRvdztcclxuXHRcdFx0d2luZG93LkZyYW1lRG9jdW1lbnQgPSBzZWxmLmlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xyXG5cclxuXHRcdFx0VnZ2ZWIuV3lzaXd5Z0VkaXRvci5pbml0KHdpbmRvdy5GcmFtZURvY3VtZW50KTtcclxuXHRcdFx0aWYgKHNlbGYuaW5pdENhbGxiYWNrKSBzZWxmLmluaXRDYWxsYmFjaygpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNlbGYuX2ZyYW1lTG9hZGVkKCk7XHJcblx0XHR9KTtcclxuXHJcblx0fSxcclxuXHJcblx0X2ZyYW1lTG9hZGVkOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0c2VsZi5mcmFtZURvYyA9ICQod2luZG93LkZyYW1lRG9jdW1lbnQpO1xyXG5cdFx0c2VsZi5mcmFtZUh0bWwgPSAkKHdpbmRvdy5GcmFtZURvY3VtZW50KS5maW5kKFwiaHRtbFwiKTtcclxuXHRcdHNlbGYuZnJhbWVCb2R5ID0gJCh3aW5kb3cuRnJhbWVEb2N1bWVudCkuZmluZChcImJvZHlcIik7XHJcblxyXG5cdFx0dGhpcy5faW5pdEhpZ2h0bGlnaHQoKTtcclxuXHR9LFxyXG5cclxuXHRfZ2V0RWxlbWVudFR5cGU6IGZ1bmN0aW9uIChlbCkge1xyXG5cclxuXHRcdC8vc2VhcmNoIGZvciBjb21wb25lbnQgYXR0cmlidXRlXHJcblx0XHRjb21wb25lbnROYW1lID0gJyc7XHJcblxyXG5cdFx0aWYgKGVsLmF0dHJpYnV0ZXMpXHJcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZWwuYXR0cmlidXRlcy5sZW5ndGg7IGorKykge1xyXG5cclxuXHRcdFx0XHRpZiAoZWwuYXR0cmlidXRlc1tqXS5ub2RlTmFtZS5pbmRleE9mKCdkYXRhLWNvbXBvbmVudCcpID4gLTEpIHtcclxuXHRcdFx0XHRcdGNvbXBvbmVudE5hbWUgPSBlbC5hdHRyaWJ1dGVzW2pdLm5vZGVOYW1lLnJlcGxhY2UoJ2RhdGEtY29tcG9uZW50LScsICcnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRpZiAoY29tcG9uZW50TmFtZSAhPSAnJykgcmV0dXJuIGNvbXBvbmVudE5hbWU7XHJcblxyXG5cdFx0aWYgKGVsLmF0dHJpYnV0ZXMpXHJcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZWwuYXR0cmlidXRlcy5sZW5ndGg7IGorKykge1xyXG5cclxuXHRcdFx0XHRpZiAoZWwuYXR0cmlidXRlc1tqXS5ub2RlTmFtZS5pbmRleE9mKCdkYXRhLWNvbXBvbmVudCcpID4gLTEpIHtcclxuXHRcdFx0XHRcdGNvbXBvbmVudE5hbWUgPSBlbC5hdHRyaWJ1dGVzW2pdLm5vZGVOYW1lLnJlcGxhY2UoJ2RhdGEtY29tcG9uZW50LScsICcnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRpZiAoY29tcG9uZW50TmFtZSAhPSAnJykgcmV0dXJuIGNvbXBvbmVudE5hbWU7XHJcblx0XHQvL2lmIChjbGFzc05hbWUpIHJldHVybiBjb21wb25lbnROYW1lO1xyXG5cdFx0cmV0dXJuIGVsLnRhZ05hbWU7XHJcblx0fSxcclxuXHJcblx0bG9hZE5vZGVDb21wb25lbnQ6IGZ1bmN0aW9uIChub2RlKSB7XHJcblx0XHRkYXRhID0gVnZ2ZWIuQ29tcG9uZW50cy5tYXRjaE5vZGUobm9kZSk7XHJcblx0XHRpZiAoZGF0YSkgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIoZGF0YS50eXBlKTtcclxuXHJcblx0fSxcclxuXHJcblx0c2VsZWN0Tm9kZTogZnVuY3Rpb24gKG5vZGUgPSBmYWxzZSkge1xyXG5cclxuXHRcdGlmICghbm9kZSkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc2VsZi50ZXh0ZWRpdEVsICYmIHNlbGYuc2VsZWN0ZWRFbC5nZXQoMCkgIT0gbm9kZSkge1xyXG5cdFx0XHRWdnZlYi5XeXNpd3lnRWRpdG9yLmRlc3Ryb3koc2VsZi50ZXh0ZWRpdEVsKTtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikucmVtb3ZlQ2xhc3MoXCJ0ZXh0LWVkaXRcIikuZmluZChcIiNzZWxlY3QtYWN0aW9uc1wiKS5zaG93KCk7XHJcblx0XHRcdHNlbGYudGV4dGVkaXRFbCA9IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0c2VsZi5zZWxlY3RlZEVsID0gdGFyZ2V0ID0galF1ZXJ5KG5vZGUpO1xyXG5cdFx0b2Zmc2V0ID0gdGFyZ2V0Lm9mZnNldCgpO1xyXG5cclxuXHJcblx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5jc3MoXHJcblx0XHRcdHtcclxuXHRcdFx0XHRcInRvcFwiOiBvZmZzZXQudG9wIC0gc2VsZi5mcmFtZURvYy5zY3JvbGxUb3AoKSxcclxuXHRcdFx0XHRcImxlZnRcIjogb2Zmc2V0LmxlZnQgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbExlZnQoKSxcclxuXHRcdFx0XHRcIndpZHRoXCI6IHRhcmdldC5vdXRlcldpZHRoKCksXHJcblx0XHRcdFx0XCJoZWlnaHRcIjogdGFyZ2V0Lm91dGVySGVpZ2h0KCksXHJcblx0XHRcdFx0XCJkaXNwbGF5XCI6IFwiYmxvY2tcIixcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0alF1ZXJ5KFwiI2hpZ2hsaWdodC1uYW1lXCIpLmh0bWwoc2VsZi5fZ2V0RWxlbWVudFR5cGUobm9kZSkpO1xyXG5cclxuXHR9LFxyXG5cclxuXHQvKiBpZnJhbWUgaGlnaGxpZ2h0ICovXHJcblx0X2luaXRIaWdodGxpZ2h0OiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0bW92ZUV2ZW50ID0geyB0YXJnZXQ6IG51bGwsIH07XHJcblxyXG5cdFx0dGhpcy5mcmFtZUJvZHkub24oXCJtb3VzZW1vdmUgdG91Y2htb3ZlXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHQvL2RlbGF5IGZvciBoYWxmIGEgc2Vjb25kIGlmIGRyYWdnaW5nIG92ZXIgc2FtZSBlbGVtZW50XHJcblx0XHRcdC8vIGlmIChldmVudC50YXJnZXQgPT0gbW92ZUV2ZW50LnRhcmdldCAmJiAoKGV2ZW50LnRpbWVTdGFtcCAtIG1vdmVFdmVudC50aW1lU3RhbXApIDwgNTAwKSkgcmV0dXJuO1xyXG5cdFx0XHRpZiAoZXZlbnQudGFyZ2V0KSB7XHJcblx0XHRcdFx0bW92ZUV2ZW50ID0gZXZlbnQ7XHJcblxyXG5cdFx0XHRcdHNlbGYuaGlnaGxpZ2h0RWwgPSB0YXJnZXQgPSBqUXVlcnkoZXZlbnQudGFyZ2V0KTtcclxuXHRcdFx0XHRvZmZzZXQgPSB0YXJnZXQub2Zmc2V0KCk7XHJcblx0XHRcdFx0d2lkdGggPSB0YXJnZXQub3V0ZXJXaWR0aCgpO1xyXG5cdFx0XHRcdGhlaWdodCA9IHRhcmdldC5vdXRlckhlaWdodCgpO1xyXG5cclxuXHRcdFx0XHRpZiAoc2VsZi5pc0RyYWdnaW5nKSB7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdFbGVtZW50LmNzcyh7XHJcblx0XHRcdFx0XHRcdGRpc3BsYXk6ICdub25lJ1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRwYXJlbnQgPSBzZWxmLmhpZ2hsaWdodEVsO1xyXG5cdFx0XHRcdFx0cGFyZW50T2Zmc2V0ID0gc2VsZi5kcmFnRWxlbWVudC5vZmZzZXQoKTtcclxuXHRcdFx0XHRcdC8vIHRyeSB7XHJcblx0XHRcdFx0XHQvLyBcdHNlbGYuZHJhZ0VsZW1lbnQuY3NzKHtcclxuXHRcdFx0XHRcdC8vIFx0XHRkaXNwbGF5OiAnbm9uZSdcclxuXHRcdFx0XHRcdC8vIFx0fSk7XHJcblx0XHRcdFx0XHQvLyBcdGlmIChldmVudC5vcmlnaW5hbEV2ZW50ICYmIChvZmZzZXQubGVmdCA+IChldmVudC5vcmlnaW5hbEV2ZW50LnggLSAxMCkpKSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0aWYgKG9mZnNldC50b3AgPiAoZXZlbnQub3JpZ2luYWxFdmVudC55IC0gMTApKSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRwYXJlbnQuYmVmb3JlKHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRwYXJlbnQucHJlcGVuZChzZWxmLmRyYWdFbGVtZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQucHJlcGVuZFRvKHBhcmVudCk7XHJcblx0XHRcdFx0XHQvLyBcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gXHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdGlmIChldmVudC5vcmlnaW5hbEV2ZW50ICYmIG9mZnNldC50b3AgPiAoKGV2ZW50Lm9yaWdpbmFsRXZlbnQueSAtIDEwKSkpIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHBhcmVudC5iZWZvcmUoc2VsZi5kcmFnRWxlbWVudCk7XHJcblx0XHRcdFx0XHQvLyBcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRcdHBhcmVudC5hcHBlbmQoc2VsZi5kcmFnRWxlbWVudCk7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRzZWxmLmRyYWdFbGVtZW50LmFwcGVuZFRvKHBhcmVudCk7XHJcblx0XHRcdFx0XHQvLyBcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gXHR9XHJcblx0XHRcdFx0XHQvLyB9IGNhdGNoIChlcnIpIHtcclxuXHRcdFx0XHRcdC8vIFx0Y29uc29sZS5sb2coZXJyKTtcclxuXHRcdFx0XHRcdC8vIH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdGpRdWVyeShcIiNoaWdobGlnaHQtYm94XCIpLmNzcyhcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFwidG9wXCI6IG9mZnNldC50b3AgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbFRvcCgpLFxyXG5cdFx0XHRcdFx0XHRcdFwibGVmdFwiOiBvZmZzZXQubGVmdCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsTGVmdCgpLFxyXG5cdFx0XHRcdFx0XHRcdFwid2lkdGhcIjogd2lkdGgsXHJcblx0XHRcdFx0XHRcdFx0XCJoZWlnaHRcIjogaGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHRcdFwiZGlzcGxheVwiOiBldmVudC50YXJnZXQuaGFzQXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnKSA/IFwibm9uZVwiIDogXCJibG9ja1wiXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdGpRdWVyeShcIiNoaWdobGlnaHQtbmFtZVwiKS5odG1sKHNlbGYuX2dldEVsZW1lbnRUeXBlKGV2ZW50LnRhcmdldCkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdHRoaXMuZnJhbWVCb2R5Lm9uKFwibW91c2V1cCB0b3VjaGVuZFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0aWYgKHNlbGYuaXNEcmFnZ2luZykge1xyXG5cdFx0XHRcdHNlbGYuaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRpZiAoY29tcG9uZW50LmRyYWdIdG1sKSAvL2lmIGRyYWdIdG1sIGlzIHNldCBmb3IgZHJhZ2dpbmcgdGhlbiBzZXQgcmVhbCBjb21wb25lbnQgaHRtbFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdG5ld0VsZW1lbnQgPSAkKGNvbXBvbmVudC5odG1sKTtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQucmVwbGFjZVdpdGgobmV3RWxlbWVudCk7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdFbGVtZW50ID0gbmV3RWxlbWVudDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGNvbXBvbmVudC5hZnRlckRyb3ApIHNlbGYuZHJhZ0VsZW1lbnQgPSBjb21wb25lbnQuYWZ0ZXJEcm9wKHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cclxuXHRcdFx0XHRub2RlID0gc2VsZi5kcmFnRWxlbWVudC5nZXQoMCk7XHJcblx0XHRcdFx0c2VsZi5zZWxlY3ROb2RlKG5vZGUpO1xyXG5cdFx0XHRcdHNlbGYubG9hZE5vZGVDb21wb25lbnQobm9kZSk7XHJcblxyXG5cdFx0XHRcdGlmIChzZWxmLmRyYWdNb3ZlTXV0YXRpb24gPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0XHRcdFx0dHlwZTogJ2NoaWxkTGlzdCcsXHJcblx0XHRcdFx0XHRcdHRhcmdldDogbm9kZS5wYXJlbnROb2RlLFxyXG5cdFx0XHRcdFx0XHRhZGRlZE5vZGVzOiBbbm9kZV0sXHJcblx0XHRcdFx0XHRcdG5leHRTaWJsaW5nOiBub2RlLm5leHRTaWJsaW5nXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnTW92ZU11dGF0aW9uLm5ld1BhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ01vdmVNdXRhdGlvbi5uZXdOZXh0U2libGluZyA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0XHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbihzZWxmLmRyYWdNb3ZlTXV0YXRpb24pO1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnTW92ZU11dGF0aW9uID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0dGhpcy5mcmFtZUJvZHkub24oXCJkYmxjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcblx0XHRcdHNlbGYudGV4dGVkaXRFbCA9IHRhcmdldCA9IGpRdWVyeShldmVudC50YXJnZXQpO1xyXG5cclxuXHRcdFx0VnZ2ZWIuV3lzaXd5Z0VkaXRvci5lZGl0KHNlbGYudGV4dGVkaXRFbCk7XHJcblxyXG5cdFx0XHRzZWxmLnRleHRlZGl0RWwuYXR0cih7ICdjb250ZW50ZWRpdGFibGUnOiB0cnVlLCAnc3BlbGxjaGVja2tlcic6IGZhbHNlIH0pO1xyXG5cclxuXHRcdFx0c2VsZi50ZXh0ZWRpdEVsLm9uKFwiYmx1ciBrZXl1cCBwYXN0ZSBpbnB1dFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuY3NzKHtcclxuXHRcdFx0XHRcdFwid2lkdGhcIjogc2VsZi50ZXh0ZWRpdEVsLm91dGVyV2lkdGgoKSxcclxuXHRcdFx0XHRcdFwiaGVpZ2h0XCI6IHNlbGYudGV4dGVkaXRFbC5vdXRlckhlaWdodCgpXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuYWRkQ2xhc3MoXCJ0ZXh0LWVkaXRcIikuZmluZChcIiNzZWxlY3QtYWN0aW9uc1wiKS5oaWRlKCk7XHJcblx0XHRcdGpRdWVyeShcIiNoaWdobGlnaHQtYm94XCIpLmhpZGUoKTtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHR0aGlzLmZyYW1lQm9keS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQudGFyZ2V0KSB7XHJcblx0XHRcdFx0aWYgKCFpc1ByZXZpZXcgJiYgISQoJyNhdHRyaWJ1dGUtc2V0dGluZ3MnKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuXHRcdFx0XHRcdCQoJyNhdHRyaWJ1dGUtc2V0dGluZ3MnKVxyXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcblx0XHRcdFx0XHRcdC5zaWJsaW5ncygpXHJcblx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdFx0XHQkKCcjbGVmdC1wYW5lbCcpLmhpZGUoKTtcclxuXHRcdFx0XHRcdCQoJyNyaWdodC1wYW5lbCcpLnNob3coKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0c2VsZi5zZWxlY3ROb2RlKGV2ZW50LnRhcmdldCk7XHJcblx0XHRcdFx0c2VsZi5sb2FkTm9kZUNvbXBvbmVudChldmVudC50YXJnZXQpO1xyXG5cclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5mcmFtZUJvZHkua2V5ZG93bihlID0+IHtcclxuXHRcdFx0aWYgKHNlbGYuc2VsZWN0ZWRFbCAmJiBzZWxmLnNlbGVjdGVkRWwucHJvcCgndGFnTmFtZScpICE9ICdCT0RZJykge1xyXG5cdFx0XHRcdGlmIChlLndoaWNoID09IDM3IHx8IGUud2hpY2ggPT0gMzggfHwgZS53aGljaCA9PSAzOSB8fCBlLndoaWNoID09IDQwKSB7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaWZyYW1lSWQnKS5jb250ZW50V2luZG93LmFycm93S2V5TW92ZShlLndoaWNoLCBzZWxmLnNlbGVjdGVkRWwpO1xyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50IHRoZSBkZWZhdWx0IGFjdGlvbiAoc2Nyb2xsIC8gbW92ZSBjYXJldClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjZHJhZy1ib3hcIikub24oXCJtb3VzZWRvd25cIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmhpZGUoKTtcclxuXHRcdFx0c2VsZi5kcmFnRWxlbWVudCA9IHNlbGYuc2VsZWN0ZWRFbDtcclxuXHRcdFx0c2VsZi5pc0RyYWdnaW5nID0gdHJ1ZTtcclxuXHJcblx0XHRcdG5vZGUgPSBzZWxmLmRyYWdFbGVtZW50LmdldCgwKTtcclxuXHJcblxyXG5cdFx0XHRzZWxmLmRyYWdNb3ZlTXV0YXRpb24gPSB7XHJcblx0XHRcdFx0dHlwZTogJ21vdmUnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZSxcclxuXHRcdFx0XHRvbGRQYXJlbnQ6IG5vZGUucGFyZW50Tm9kZSxcclxuXHRcdFx0XHRvbGROZXh0U2libGluZzogbm9kZS5uZXh0U2libGluZ1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly9zZWxmLnNlbGVjdE5vZGUoZmFsc2UpO1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI2Rvd24tYm94XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmhpZGUoKTtcclxuXHJcblx0XHRcdG5vZGUgPSBzZWxmLnNlbGVjdGVkRWwuZ2V0KDApO1xyXG5cdFx0XHRvbGRQYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdG9sZE5leHRTaWJsaW5nID0gbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRcdG5leHQgPSBzZWxmLnNlbGVjdGVkRWwubmV4dCgpO1xyXG5cclxuXHRcdFx0aWYgKG5leHQubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdG5leHQuYWZ0ZXIoc2VsZi5zZWxlY3RlZEVsKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzZWxmLnNlbGVjdGVkRWwucGFyZW50KCkuYWZ0ZXIoc2VsZi5zZWxlY3RlZEVsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bmV3UGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRuZXdOZXh0U2libGluZyA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0XHR0eXBlOiAnbW92ZScsXHJcblx0XHRcdFx0dGFyZ2V0OiBub2RlLFxyXG5cdFx0XHRcdG9sZFBhcmVudDogb2xkUGFyZW50LFxyXG5cdFx0XHRcdG5ld1BhcmVudDogbmV3UGFyZW50LFxyXG5cdFx0XHRcdG9sZE5leHRTaWJsaW5nOiBvbGROZXh0U2libGluZyxcclxuXHRcdFx0XHRuZXdOZXh0U2libGluZzogbmV3TmV4dFNpYmxpbmdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI3VwLWJveFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5zZWxlY3RlZEVsLmdldCgwKTtcclxuXHRcdFx0b2xkUGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRvbGROZXh0U2libGluZyA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0XHRuZXh0ID0gc2VsZi5zZWxlY3RlZEVsLnByZXYoKTtcclxuXHJcblx0XHRcdGlmIChuZXh0Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRuZXh0LmJlZm9yZShzZWxmLnNlbGVjdGVkRWwpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHNlbGYuc2VsZWN0ZWRFbC5wYXJlbnQoKS5iZWZvcmUoc2VsZi5zZWxlY3RlZEVsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bmV3UGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRuZXdOZXh0U2libGluZyA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0XHR0eXBlOiAnbW92ZScsXHJcblx0XHRcdFx0dGFyZ2V0OiBub2RlLFxyXG5cdFx0XHRcdG9sZFBhcmVudDogb2xkUGFyZW50LFxyXG5cdFx0XHRcdG5ld1BhcmVudDogbmV3UGFyZW50LFxyXG5cdFx0XHRcdG9sZE5leHRTaWJsaW5nOiBvbGROZXh0U2libGluZyxcclxuXHRcdFx0XHRuZXdOZXh0U2libGluZzogbmV3TmV4dFNpYmxpbmdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI2Nsb25lLWJveFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRjbG9uZSA9IHNlbGYuc2VsZWN0ZWRFbC5jbG9uZSgpO1xyXG5cclxuXHRcdFx0c2VsZi5zZWxlY3RlZEVsLmFmdGVyKGNsb25lKTtcclxuXHJcblx0XHRcdHNlbGYuc2VsZWN0ZWRFbCA9IGNsb25lLmNsaWNrKCk7XHJcblxyXG5cdFx0XHRub2RlID0gY2xvbmUuZ2V0KDApO1xyXG5cdFx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0XHR0eXBlOiAnY2hpbGRMaXN0JyxcclxuXHRcdFx0XHR0YXJnZXQ6IG5vZGUucGFyZW50Tm9kZSxcclxuXHRcdFx0XHRhZGRlZE5vZGVzOiBbbm9kZV0sXHJcblx0XHRcdFx0bmV4dFNpYmxpbmc6IG5vZGUubmV4dFNpYmxpbmdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI3BhcmVudC1ib3hcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcblx0XHRcdG5vZGUgPSBzZWxmLnNlbGVjdGVkRWwucGFyZW50KCkuZ2V0KDApO1xyXG5cclxuXHRcdFx0c2VsZi5zZWxlY3ROb2RlKG5vZGUpO1xyXG5cdFx0XHRzZWxmLmxvYWROb2RlQ29tcG9uZW50KG5vZGUpO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNkZWxldGUtYm94XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmhpZGUoKTtcclxuXHJcblx0XHRcdG5vZGUgPSBzZWxmLnNlbGVjdGVkRWwuZ2V0KDApO1xyXG5cclxuXHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0dHlwZTogJ2NoaWxkTGlzdCcsXHJcblx0XHRcdFx0dGFyZ2V0OiBub2RlLnBhcmVudE5vZGUsXHJcblx0XHRcdFx0cmVtb3ZlZE5vZGVzOiBbbm9kZV0sXHJcblx0XHRcdFx0bmV4dFNpYmxpbmc6IG5vZGUubmV4dFNpYmxpbmdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRzZWxmLnNlbGVjdGVkRWwucmVtb3ZlKCk7XHJcblxyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHRqUXVlcnkod2luZG93LkZyYW1lV2luZG93KS5vbihcInNjcm9sbCByZXNpemVcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRpZiAoc2VsZi5zZWxlY3RlZEVsKSB7XHJcblx0XHRcdFx0b2Zmc2V0ID0gc2VsZi5zZWxlY3RlZEVsLm9mZnNldCgpO1xyXG5cclxuXHRcdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5jc3MoXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFwidG9wXCI6IG9mZnNldC50b3AgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbFRvcCgpLFxyXG5cdFx0XHRcdFx0XHRcImxlZnRcIjogb2Zmc2V0LmxlZnQgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbExlZnQoKSxcclxuXHRcdFx0XHRcdFx0XCJ3aWR0aFwiOiBzZWxmLnNlbGVjdGVkRWwub3V0ZXJXaWR0aCgpLFxyXG5cdFx0XHRcdFx0XHRcImhlaWdodFwiOiBzZWxmLnNlbGVjdGVkRWwub3V0ZXJIZWlnaHQoKSxcclxuXHRcdFx0XHRcdFx0Ly9cImRpc3BsYXlcIjogXCJibG9ja1wiXHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChzZWxmLmhpZ2hsaWdodEVsKSB7XHJcblx0XHRcdFx0b2Zmc2V0ID0gc2VsZi5oaWdobGlnaHRFbC5vZmZzZXQoKTtcclxuXHJcblx0XHRcdFx0alF1ZXJ5KFwiI2hpZ2hsaWdodC1ib3hcIikuY3NzKFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcInRvcFwiOiBvZmZzZXQudG9wIC0gc2VsZi5mcmFtZURvYy5zY3JvbGxUb3AoKSxcclxuXHRcdFx0XHRcdFx0XCJsZWZ0XCI6IG9mZnNldC5sZWZ0IC0gc2VsZi5mcmFtZURvYy5zY3JvbGxMZWZ0KCksXHJcblx0XHRcdFx0XHRcdFwid2lkdGhcIjogc2VsZi5oaWdobGlnaHRFbC5vdXRlcldpZHRoKCksXHJcblx0XHRcdFx0XHRcdFwiaGVpZ2h0XCI6IHNlbGYuaGlnaGxpZ2h0RWwub3V0ZXJIZWlnaHQoKSxcclxuXHRcdFx0XHRcdFx0Ly9cImRpc3BsYXlcIjogXCJibG9ja1wiXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdC8qIGRyYWcgYW5kIGRyb3AgKi9cclxuXHRfaW5pdERyYWdkcm9wOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0c2VsZi5pc0RyYWdnaW5nID0gZmFsc2U7XHJcblx0XHRjb21wb25lbnQgPSB7fTtcclxuXHRcdCQoJyNjb21wb25lbnRzIHVsID4gbGkgPiBvbCA+IGxpJykub24oXCJtb3VzZWRvd24gdG91Y2hzdGFydFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0JHRoaXMgPSBqUXVlcnkodGhpcyk7XHJcblxyXG5cdFx0XHQvLyAkKFwiI2NvbXBvbmVudC1jbG9uZVwiKS5yZW1vdmUoKTtcclxuXHRcdFx0Y29tcG9uZW50ID0gVnZ2ZWIuQ29tcG9uZW50cy5nZXQoJHRoaXMuZGF0YShcInR5cGVcIikpO1xyXG5cclxuXHRcdFx0aWYgKGNvbXBvbmVudC5kcmFnSHRtbCkge1xyXG5cdFx0XHRcdGh0bWwgPSBjb21wb25lbnQuZHJhZ0h0bWw7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aHRtbCA9IGNvbXBvbmVudC5odG1sO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZWxmLmRyYWdFbGVtZW50ID0gJChodG1sKTtcclxuXHJcblx0XHRcdGlmIChjb21wb25lbnQuZHJhZ1N0YXJ0KSBzZWxmLmRyYWdFbGVtZW50ID0gY29tcG9uZW50LmRyYWdTdGFydChzZWxmLmRyYWdFbGVtZW50KTtcclxuXHJcblx0XHRcdHNlbGYuaXNEcmFnZ2luZyA9IHRydWU7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0JCgnYm9keScpLm9uKCdtb3VzZXVwIHRvdWNoZW5kJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGlmIChzZWxmLmlzRHJhZ2dpbmcgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdHNlbGYuaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cdFx0XHRcdC8vICQoXCIjY29tcG9uZW50LWNsb25lXCIpLnJlbW92ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCdib2R5Jykub24oJ21vdXNlbW92ZSB0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0aWYgKHNlbGYuaXNEcmFnZ2luZyA9PSB0cnVlKSB7XHJcblx0XHRcdFx0ZWxlbWVudE1vdXNlSXNPdmVyID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYIC0gNjAsIGV2ZW50LmNsaWVudFkgLSA0MCk7XHJcblx0XHRcdFx0Ly9pZiBkcmFnIGVsZW1lbnRzIGhvdmVycyBvdmVyIGlmcmFtZSBzd2l0Y2ggdG8gaWZyYW1lIG1vdXNlb3ZlciBoYW5kbGVyXHRcclxuXHRcdFx0XHRpZiAoZWxlbWVudE1vdXNlSXNPdmVyICYmIGVsZW1lbnRNb3VzZUlzT3Zlci50YWdOYW1lID09ICdJRlJBTUUnKSB7XHJcblx0XHRcdFx0XHRzZWxmLmZyYW1lQm9keS50cmlnZ2VyKFwibW91c2Vtb3ZlXCIsIGV2ZW50KTtcclxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdFx0c2VsZi5zZWxlY3ROb2RlKGZhbHNlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJyNjb21wb25lbnRzIHVsID4gb2wgPiBsaSA+IGxpJykub24oXCJtb3VzZXVwIHRvdWNoZW5kXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRzZWxmLmlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHRcdFx0Ly8gJChcIiNjb21wb25lbnQtY2xvbmVcIikucmVtb3ZlKCk7XHJcblx0XHR9KTtcclxuXHJcblx0fSxcclxuXHJcblx0Z2V0QmVhdXRpZmllZEh0bWwoKSB7XHJcblx0XHQvKlxyXG5cdFx0LUksIC0taW5kZW50LWlubmVyLWh0bWwgICAgICAgICAgICBJbmRlbnQgPGhlYWQ+IGFuZCA8Ym9keT4gc2VjdGlvbnMuIERlZmF1bHQgaXMgZmFsc2UuXHJcblx0XHQtVSwgLS11bmZvcm1hdHRlZCAgICAgICAgICAgICAgICAgIExpc3Qgb2YgdGFncyAoZGVmYXVsdHMgdG8gaW5saW5lKSB0aGF0IHNob3VsZCBub3QgYmUgcmVmb3JtYXR0ZWRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgICB1c2UgZW1wdHkgYXJyYXkgdG8gZGVub3RlIHRoYXQgbm8gdGFncyBzaG91bGQgbm90IGJlIHJlZm9ybWF0dGVkXHJcblx0XHQgKi9cclxuXHJcblx0XHRjb25zdCB7IGRvY3R5cGUsIGh0bWwgfSA9IHRoaXMuZ2V0SHRtbCgpO1xyXG5cdFx0cmV0dXJuIGh0bWxfYmVhdXRpZnkoYCR7ZG9jdHlwZX1cclxuXHRcdFx0XHRcdFx0XHQgICR7cmVtb3ZlVW51c2VkVGFncyhodG1sLCB1bnVzZWRUYWdzKX1gLFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0cHJlc2VydmVfbmV3bGluZXM6IGZhbHNlLFxyXG5cdFx0XHRcdGluZGVudF9pbm5lcl9odG1sOiB0cnVlLFxyXG5cdFx0XHRcdHVuZm9ybWF0dGVkOiBbXVxyXG5cdFx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRnZXRIdG1sOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRkb2MgPSB3aW5kb3cuRnJhbWVEb2N1bWVudDtcclxuXHRcdGNvbnN0IGRvY3R5cGUgPSBcIjwhRE9DVFlQRSBcIlxyXG5cdFx0XHQrIGRvYy5kb2N0eXBlLm5hbWVcclxuXHRcdFx0KyAoZG9jLmRvY3R5cGUucHVibGljSWQgPyAnIFBVQkxJQyBcIicgKyBkb2MuZG9jdHlwZS5wdWJsaWNJZCArICdcIicgOiAnJylcclxuXHRcdFx0KyAoIWRvYy5kb2N0eXBlLnB1YmxpY0lkICYmIGRvYy5kb2N0eXBlLnN5c3RlbUlkID8gJyBTWVNURU0nIDogJycpXHJcblx0XHRcdCsgKGRvYy5kb2N0eXBlLnN5c3RlbUlkID8gJyBcIicgKyBkb2MuZG9jdHlwZS5zeXN0ZW1JZCArICdcIicgOiAnJylcclxuXHRcdFx0KyBcIj5cXG5cIjtcclxuXHRcdGNvbnN0IGh0bWwgPSBgJHtkb2N0eXBlfVxyXG5cdFx0XHRcdFx0ICA8aHRtbD5cclxuXHRcdFx0XHRcdFx0ICAke2RvYy5kb2N1bWVudEVsZW1lbnQuaW5uZXJIVE1MfVxyXG5cdFx0XHRcdFx0ICA8L2h0bWw+YDtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGRvY3R5cGUsXHJcblx0XHRcdGh0bWxcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0c2V0SHRtbDogZnVuY3Rpb24gKGh0bWwpIHtcclxuXHRcdC8vdXBkYXRlIG9ubHkgYm9keSB0byBhdm9pZCBicmVha2luZyBpZnJhbWUgY3NzL2pzIHJlbGF0aXZlIHBhdGhzXHJcblx0XHRzdGFydCA9IGh0bWwuaW5kZXhPZihcIjxib2R5XCIpO1xyXG5cdFx0ZW5kID0gaHRtbC5pbmRleE9mKFwiPC9ib2R5XCIpO1xyXG5cclxuXHRcdGlmIChzdGFydCA+PSAwICYmIGVuZCA+PSAwKSB7XHJcblx0XHRcdGJvZHkgPSBodG1sLnNsaWNlKGh0bWwuaW5kZXhPZihcIj5cIiwgc3RhcnQpICsgMSwgZW5kKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGJvZHkgPSBodG1sXHJcblx0XHR9XHJcblxyXG5cdFx0Ly9zZWxmLmZyYW1lQm9keS5odG1sKGJvZHkpO1xyXG5cdFx0d2luZG93LkZyYW1lRG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBib2R5O1xyXG5cclxuXHRcdC8vYmVsb3cgbWV0aG9kcyBicmFrZSBkb2N1bWVudCByZWxhdGl2ZSBjc3MgYW5kIGpzIHBhdGhzXHJcblx0XHQvL3JldHVybiBzZWxmLmlmcmFtZS5vdXRlckhUTUwgPSBodG1sO1xyXG5cdFx0Ly9yZXR1cm4gc2VsZi5kb2N1bWVudEZyYW1lLmh0bWwoaHRtbCk7XHJcblx0XHQvL3JldHVybiBzZWxmLmRvY3VtZW50RnJhbWUuYXR0cihcInNyY2RvY1wiLCBodG1sKTtcclxuXHR9XHJcbn07XHJcblxyXG5WdnZlYi5Db2RlRWRpdG9yID0ge1xyXG5cclxuXHRpc0FjdGl2ZTogZmFsc2UsXHJcblx0b2xkVmFsdWU6ICcnLFxyXG5cdGRvYzogZmFsc2UsXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkb2MpIHtcclxuXHRcdCQoXCIjdnZ2ZWItY29kZS1lZGl0b3IgdGV4dGFyZWFcIikudmFsKFZ2dmViLkJ1aWxkZXIuZ2V0QmVhdXRpZmllZEh0bWwoKSk7XHJcblxyXG5cdFx0JChcIiN2dnZlYi1jb2RlLWVkaXRvciB0ZXh0YXJlYVwiKS5rZXl1cChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGRlbGF5KFZ2dmViLkJ1aWxkZXIuc2V0SHRtbCh0aGlzLnZhbHVlKSwgMTAwMCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvL2xvYWQgY29kZSBvbiBkb2N1bWVudCBjaGFuZ2VzXHJcblx0XHRWdnZlYi5CdWlsZGVyLmZyYW1lQm9keS5vbihcInZ2dmViLnVuZG8uYWRkIHZ2dmViLnVuZG8ucmVzdG9yZVwiLCBmdW5jdGlvbiAoZSkgeyBWdnZlYi5Db2RlRWRpdG9yLnNldFZhbHVlKCk7IH0pO1xyXG5cdFx0Ly9sb2FkIGNvZGUgd2hlbiBhIG5ldyB1cmwgaXMgbG9hZGVkXHJcblx0XHRWdnZlYi5CdWlsZGVyLmRvY3VtZW50RnJhbWUub24oXCJsb2FkXCIsIGZ1bmN0aW9uIChlKSB7IFZ2dmViLkNvZGVFZGl0b3Iuc2V0VmFsdWUoKTsgfSk7XHJcblxyXG5cdFx0dGhpcy5pc0FjdGl2ZSA9IHRydWU7XHJcblx0fSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0aWYgKHRoaXMuaXNBY3RpdmUpIHtcclxuXHRcdFx0JChcIiN2dnZlYi1jb2RlLWVkaXRvciB0ZXh0YXJlYVwiKS52YWwoVnZ2ZWIuQnVpbGRlci5nZXRCZWF1dGlmaWVkSHRtbCgpKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRkZXN0cm95OiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0Ly90aGlzLmlzQWN0aXZlID0gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0dG9nZ2xlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodGhpcy5pc0FjdGl2ZSAhPSB0cnVlKSB7XHJcblx0XHRcdHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5pbml0KCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmlzQWN0aXZlID0gZmFsc2U7XHJcblx0XHR0aGlzLmRlc3Ryb3koKTtcclxuXHR9XHJcbn1cclxuXHJcbmxldCBzaG93blBhbmVsLCBoaWRkZW5QYW5lbCwgaXNQcmV2aWV3O1xyXG5cclxuVnZ2ZWIuR3VpID0ge1xyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKFwiW2RhdGEtdnZ2ZWItYWN0aW9uXVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0b24gPSBcImNsaWNrXCI7XHJcblx0XHRcdGlmICh0aGlzLmRhdGFzZXQudnZ2ZWJPbikgb24gPSB0aGlzLmRhdGFzZXQudnZ2ZWJPbjtcclxuXHJcblx0XHRcdCQodGhpcykub24ob24sIFZ2dmViLkd1aVt0aGlzLmRhdGFzZXQudnZ2ZWJBY3Rpb25dKTtcclxuXHRcdFx0aWYgKHRoaXMuZGF0YXNldC52dnZlYlNob3J0Y3V0KSB7XHJcblx0XHRcdFx0JChkb2N1bWVudCkuYmluZCgna2V5ZG93bicsIHRoaXMuZGF0YXNldC52dnZlYlNob3J0Y3V0LCBWdnZlYi5HdWlbdGhpcy5kYXRhc2V0LnZ2dmViQWN0aW9uXSk7XHJcblx0XHRcdFx0JCh3aW5kb3cuRnJhbWVEb2N1bWVudCwgd2luZG93LkZyYW1lV2luZG93KS5iaW5kKCdrZXlkb3duJywgdGhpcy5kYXRhc2V0LnZ2dmViU2hvcnRjdXQsIFZ2dmViLkd1aVt0aGlzLmRhdGFzZXQudnZ2ZWJBY3Rpb25dKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0dW5kbzogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKFZ2dmViLld5c2l3eWdFZGl0b3IuaXNBY3RpdmUpIHtcclxuXHRcdFx0VnZ2ZWIuV3lzaXd5Z0VkaXRvci51bmRvKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRWdnZlYi5VbmRvLnVuZG8oKTtcclxuXHRcdH1cclxuXHRcdFZ2dmViLkJ1aWxkZXIuc2VsZWN0Tm9kZSgpO1xyXG5cdH0sXHJcblxyXG5cdHJlZG86IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmIChWdnZlYi5XeXNpd3lnRWRpdG9yLmlzQWN0aXZlKSB7XHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IucmVkbygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0VnZ2ZWIuVW5kby5yZWRvKCk7XHJcblx0XHR9XHJcblx0XHRWdnZlYi5CdWlsZGVyLnNlbGVjdE5vZGUoKTtcclxuXHR9LFxyXG5cclxuXHRjaGVjazogZnVuY3Rpb24gKCkge1xyXG5cdFx0JCgnI3RleHRhcmVhLW1vZGFsIHRleHRhcmVhJykudmFsKFZ2dmViLkJ1aWxkZXIuZ2V0QmVhdXRpZmllZEh0bWwoKSk7XHJcblx0XHQkKCcjdGV4dGFyZWEtbW9kYWwnKS5tb2RhbCgpO1xyXG5cdH0sXHJcblxyXG5cdHZpZXdwb3J0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKFwiI2NhbnZhc1wiKS5hdHRyKFwiY2xhc3NcIiwgdGhpcy5kYXRhc2V0LnZpZXcpO1xyXG5cdH0sXHJcblxyXG5cdHRvZ2dsZUVkaXRvcjogZnVuY3Rpb24gKCkge1xyXG5cdFx0JChcIiN2dnZlYi1idWlsZGVyXCIpLnRvZ2dsZUNsYXNzKFwiYm90dG9tLXBhbmVsLWV4cGFuZFwiKTtcclxuXHRcdFZ2dmViLkNvZGVFZGl0b3IudG9nZ2xlKCk7XHJcblx0fSxcclxuXHJcblx0ZG93bmxvYWQoKSB7XHJcblx0XHRkb3dubG9hZEFzVGV4dEZpbGUoJ2luZGV4JywgVnZ2ZWIuQnVpbGRlci5nZXRCZWF1dGlmaWVkSHRtbCgpKTtcclxuXHR9LFxyXG5cclxuXHRwcmV2aWV3OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoJCgnI2xlZnQtcGFuZWwnKS5pcygnOnZpc2libGUnKSkge1xyXG5cdFx0XHRzaG93blBhbmVsID0gJ2xlZnQtcGFuZWwnO1xyXG5cdFx0XHRoaWRkZW5QYW5lbCA9ICdyaWdodC1wYW5lbCc7XHJcblx0XHRcdCQoJyNsZWZ0LXBhbmVsLCAjcmlnaHQtcGFuZWwnKS5oaWRlKCk7XHJcblx0XHRcdGlzUHJldmlldyA9IHRydWU7XHJcblx0XHR9IGVsc2UgaWYgKCQoJyNyaWdodC1wYW5lbCcpLmlzKCc6dmlzaWJsZScpKSB7XHJcblx0XHRcdHNob3duUGFuZWwgPSAncmlnaHQtcGFuZWwnO1xyXG5cdFx0XHRoaWRkZW5QYW5lbCA9ICdsZWZ0LXBhbmVsJztcclxuXHRcdFx0JCgnI2xlZnQtcGFuZWwsICNyaWdodC1wYW5lbCcpLmhpZGUoKTtcclxuXHRcdFx0aXNQcmV2aWV3ID0gdHJ1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlzUHJldmlldyA9IGZhbHNlO1xyXG5cdFx0XHQkKGAjJHtzaG93blBhbmVsfWApLnNob3coKTtcclxuXHRcdFx0JChgIyR7aGlkZGVuUGFuZWx9YCkuaGlkZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdCQoJyNtZW51LXBhbmVsJykudG9nZ2xlKCk7XHJcblx0XHQkKFwiI2lmcmFtZS1sYXllclwiKS50b2dnbGUoKTtcclxuXHRcdCQoXCIjdnZ2ZWItYnVpbGRlclwiKS50b2dnbGVDbGFzcyhcInByZXZpZXdcIik7XHJcblx0fSxcclxuXHJcblx0ZnVsbHNjcmVlbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0bGF1bmNoRnVsbFNjcmVlbihkb2N1bWVudCk7IC8vIHRoZSB3aG9sZSBwYWdlXHJcblx0fSxcclxuXHJcblx0Y29tcG9uZW50U2VhcmNoOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRzZWFyY2hUZXh0ID0gdGhpcy52YWx1ZTtcclxuXHJcblx0XHQkKFwiI2NvbXBvbmVudHMtbGlzdCBsaSBvbCBsaVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0JHRoaXMgPSAkKHRoaXMpO1xyXG5cclxuXHRcdFx0JHRoaXMuaGlkZSgpO1xyXG5cdFx0XHRpZiAoJHRoaXMuZGF0YShcInNlYXJjaFwiKS5pbmRleE9mKHNlYXJjaFRleHQpID4gLTEpICR0aGlzLnNob3coKTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdGNsZWFyQ29tcG9uZW50U2VhcmNoOiBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKFwiI2NvbXBvbmVudC1zZWFyY2hcIikudmFsKFwiXCIpLmtleXVwKCk7XHJcblx0fVxyXG59XHJcblxyXG5WdnZlYi5GaWxlTWFuYWdlciA9IHtcclxuXHR0cmVlOiBmYWxzZSxcclxuXHRwYWdlczoge30sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMudHJlZSA9ICQoXCIjZmlsZW1hbmFnZXIgLnRyZWUgPiBvbFwiKS5odG1sKFwiXCIpO1xyXG5cclxuXHRcdCQodGhpcy50cmVlKS5vbihcImNsaWNrXCIsIFwibGlbZGF0YS1wYWdlXSBzcGFuXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCMkeyQodGhpcykucGFyZW50cygnbGknKS5kYXRhKCdwYWdlJyl9YDtcclxuXHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cdFx0XHQvLyBWdnZlYi5GaWxlTWFuYWdlci5sb2FkUGFnZSgkKHRoaXMpLnBhcmVudHMoXCJsaVwiKS5kYXRhKFwicGFnZVwiKSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pXHJcblx0fSxcclxuXHJcblx0Z2V0UGFnZShuYW1lKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wYWdlc1tuYW1lXTtcclxuXHR9LFxyXG5cclxuXHRhZGRQYWdlOiBmdW5jdGlvbiAobmFtZSwgdGl0bGUsIHVybCkge1xyXG5cclxuXHRcdHRoaXMucGFnZXNbbmFtZV0gPSB7XHJcblx0XHRcdG5hbWUsXHJcblx0XHRcdHRpdGxlLFxyXG5cdFx0XHR1cmxcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy50cmVlLmFwcGVuZChcclxuXHRcdFx0dG1wbChcInZ2dmViLWZpbGVtYW5hZ2VyLXBhZ2VcIiwgeyBuYW1lLCB0aXRsZSwgdXJsIH0pKTtcclxuXHR9LFxyXG5cclxuXHRhZGRQYWdlczogZnVuY3Rpb24gKHBhZ2VzKSB7XHJcblx0XHRmb3IgKHBhZ2UgaW4gcGFnZXMpIHtcclxuXHRcdFx0dGhpcy5hZGRQYWdlKHBhZ2VzW3BhZ2VdWyduYW1lJ10sIHBhZ2VzW3BhZ2VdWyd0aXRsZSddLCBwYWdlc1twYWdlXVsndXJsJ10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGFkZENvbXBvbmVudDogZnVuY3Rpb24gKG5hbWUsIHVybCwgdGl0bGUsIHBhZ2UpIHtcclxuXHRcdCQoXCJbZGF0YS1wYWdlPSdcIiArIHBhZ2UgKyBcIiddID4gb2xcIiwgdGhpcy50cmVlKS5hcHBlbmQoXHJcblx0XHRcdHRtcGwoXCJ2dnZlYi1maWxlbWFuYWdlci1jb21wb25lbnRcIiwgeyBuYW1lLCB1cmwsIHRpdGxlIH0pKTtcclxuXHR9LFxyXG5cclxuXHRzaG93QWN0aXZlKG5hbWUpIHtcclxuXHRcdCQoXCJbZGF0YS1wYWdlXVwiLCB0aGlzLnRyZWUpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0JChcIltkYXRhLXBhZ2U9J1wiICsgbmFtZSArIFwiJ11cIiwgdGhpcy50cmVlKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHR9LFxyXG5cclxuXHRsb2FkUGFnZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuXHRcdCQoXCJbZGF0YS1wYWdlXVwiLCB0aGlzLnRyZWUpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0JChcIltkYXRhLXBhZ2U9J1wiICsgbmFtZSArIFwiJ11cIiwgdGhpcy50cmVlKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHJcblx0XHRWdnZlYi5CdWlsZGVyLmxvYWRVcmwodGhpcy5wYWdlc1tuYW1lXVsndXJsJ10pO1xyXG5cdH0sXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWdnZlYjsiLCJjb25zdCBhbHdheXNUcnVlID0gKCkgPT4gdHJ1ZTtcclxuXHJcbi8vIHRoaXMgcmVmZXJzIHRvIGh0bWwgZWxlbWVudFxyXG5mdW5jdGlvbiByZW1vdmVUYWcoeyBuYW1lLCBmaWx0ZXIgPSBhbHdheXNUcnVlIH0pIHtcclxuICAgIEFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5VGFnTmFtZShuYW1lKSlcclxuICAgICAgICAuZmlsdGVyKGZpbHRlcilcclxuICAgICAgICAuZm9yRWFjaCh0YWcgPT4gdGFnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGFnKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVVudXNlZFRhZ3MoaHRtbCwgdGFncykge1xyXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdodG1sJyk7XHJcbiAgICBlbC5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgdGFncy5mb3JFYWNoKHJlbW92ZVRhZywgZWwpO1xyXG5cclxuICAgIHJldHVybiAkKGVsKS5wcm9wKCdvdXRlckhUTUwnKTtcclxufVxyXG5cclxuZXhwb3J0IHsgcmVtb3ZlVW51c2VkVGFncyB9OyIsIi8vIFRvZ2dsZSBmdWxsc2NyZWVuXHJcbmZ1bmN0aW9uIGxhdW5jaEZ1bGxTY3JlZW4oZG9jdW1lbnQpIHtcclxuICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LkZ1bGxTY3JlZW5FbGVtZW50KVxyXG4gICAgICAgICAgICBkb2N1bWVudC5leGl0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgLy9tb3ppbGxhXHRcdFxyXG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50KVxyXG4gICAgICAgICAgICBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICAvL3dlYmtpdFx0ICBcclxuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudClcclxuICAgICAgICAgICAgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgIC8vaWVcdCAgXHJcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC5tc0Z1bGxTY3JlZW5FbGVtZW50KVxyXG4gICAgICAgICAgICBkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBsYXVuY2hGdWxsU2NyZWVuIH07IiwiZnVuY3Rpb24gZG93bmxvYWRBc1RleHRGaWxlKGZpbGVuYW1lLCB0ZXh0KSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBgZGF0YTp0ZXh0L2h0bWw7Y2hhcnNldD11dGYtOCwke2VuY29kZVVSSUNvbXBvbmVudCh0ZXh0KX1gKTtcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIGZpbGVuYW1lKTtcclxuXHJcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG5cclxuICAgIGVsZW1lbnQuY2xpY2soKTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG59XHJcblxyXG5leHBvcnQgeyBkb3dubG9hZEFzVGV4dEZpbGUgfTsiLCIvKlxyXG5Db3B5cmlnaHQgMjAxNyBaaWFkaW4gR2l2YW5cclxuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblxyXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuXHJcbmh0dHBzOi8vZ2l0aHViLmNvbS9naXZhbnovVnZ2ZWJKc1xyXG4qL1xyXG5pbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcbmltcG9ydCBUZXh0SW5wdXQgZnJvbSAnLi9UZXh0SW5wdXQnO1xyXG5pbXBvcnQgQ2hlY2tib3hJbnB1dCBmcm9tICcuL0NoZWNrYm94SW5wdXQnO1xyXG5pbXBvcnQgU2VsZWN0SW5wdXQgZnJvbSAnLi9TZWxlY3RJbnB1dCc7XHJcbmltcG9ydCBMaW5rSW5wdXQgZnJvbSAnLi9MaW5rSW5wdXQnO1xyXG5pbXBvcnQgUmFuZ2VJbnB1dCBmcm9tICcuL1JhbmdlSW5wdXQnO1xyXG5pbXBvcnQgTnVtYmVySW5wdXQgZnJvbSAnLi9OdW1iZXJJbnB1dCc7XHJcbmltcG9ydCBDc3NVbml0SW5wdXQgZnJvbSAnLi9Dc3NVbml0SW5wdXQnO1xyXG5pbXBvcnQgQ29sb3JJbnB1dCBmcm9tICcuL0NvbG9ySW5wdXQnO1xyXG5pbXBvcnQgRmlsZVVwbG9hZElucHV0IGZyb20gJy4vRmlsZVVwbG9hZElucHV0JztcclxuaW1wb3J0IFJhZGlvSW5wdXQgZnJvbSAnLi9SYWRpb0lucHV0JztcclxuaW1wb3J0IFJhZGlvQnV0dG9uSW5wdXQgZnJvbSAnLi9SYWRpb0J1dHRvbklucHV0JztcclxuaW1wb3J0IFRvZ2dsZUlucHV0IGZyb20gJy4vVG9nZ2xlSW5wdXQnO1xyXG5pbXBvcnQgVmFsdWVUZXh0SW5wdXQgZnJvbSAnLi9WYWx1ZVRleHRJbnB1dCc7XHJcbmltcG9ydCBHcmlkTGF5b3V0SW5wdXQgZnJvbSAnLi9HcmlkTGF5b3V0SW5wdXQnO1xyXG5pbXBvcnQgUHJvZHVjdHNJbnB1dCBmcm9tICcuL1Byb2R1Y3RzSW5wdXQnO1xyXG5pbXBvcnQgR3JpZElucHV0IGZyb20gJy4vR3JpZElucHV0JztcclxuaW1wb3J0IFRleHRWYWx1ZUlucHV0IGZyb20gJy4vVGV4dFZhbHVlSW5wdXQnO1xyXG5pbXBvcnQgQnV0dG9uSW5wdXQgZnJvbSAnLi9CdXR0b25JbnB1dCc7XHJcbmltcG9ydCBTZWN0aW9uSW5wdXQgZnJvbSAnLi9TZWN0aW9uSW5wdXQnO1xyXG5pbXBvcnQgTGlzdElucHV0IGZyb20gJy4vTGlzdElucHV0JztcclxuXHJcbmV4cG9ydCB7XHJcblx0SW5wdXQsIFRleHRJbnB1dCwgQ2hlY2tib3hJbnB1dCwgU2VsZWN0SW5wdXQsIExpbmtJbnB1dCwgUmFuZ2VJbnB1dCwgTnVtYmVySW5wdXQsIENzc1VuaXRJbnB1dCxcclxuXHRSYWRpb0lucHV0LCBSYWRpb0J1dHRvbklucHV0LCBUb2dnbGVJbnB1dCwgVmFsdWVUZXh0SW5wdXQsIEdyaWRMYXlvdXRJbnB1dCwgUHJvZHVjdHNJbnB1dCwgR3JpZElucHV0LFxyXG5cdFRleHRWYWx1ZUlucHV0LCBCdXR0b25JbnB1dCwgU2VjdGlvbklucHV0LCBMaXN0SW5wdXQsIENvbG9ySW5wdXQsIEZpbGVVcGxvYWRJbnB1dFxyXG59OyIsImltcG9ydCBUZXh0SW5wdXQgZnJvbSAnLi9UZXh0SW5wdXQnO1xyXG5cclxuY29uc3QgVmFsdWVUZXh0SW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmFsdWVUZXh0SW5wdXQ7IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBUb2dnbGVJbnB1dCA9ICQuZXh0ZW5kKHt9LCBUZXh0SW5wdXQsIHtcclxuXHJcblx0b25DaGFuZ2U6IGZ1bmN0aW9uIChldmVudCwgbm9kZSkge1xyXG5cdFx0aWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS5lbGVtZW50KSB7XHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt0aGlzLmNoZWNrZWQgPyB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtdmFsdWUtb25cIikgOiB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtdmFsdWUtb2ZmXCIpLCB0aGlzXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0b2dnbGVcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVG9nZ2xlSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgVGV4dFZhbHVlSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHRldmVudHM6IFtcclxuXHRcdFtcImtleXVwXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRcdFtcImNsaWNrXCIsIFwib25DaGFuZ2VcIiwgXCJidXR0b25cIiAvKidzZWxlY3QnKi9dLFxyXG5cdF0sXHJcblxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dHZhbHVlXCIsIGRhdGEpO1xyXG5cdH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUZXh0VmFsdWVJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBTZWxlY3RJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuICAgIGV2ZW50czogW1xyXG4gICAgICAgIFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwic2VsZWN0XCJdLFxyXG4gICAgXSxcclxuXHJcblxyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICQoJ3NlbGVjdCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXIoXCJzZWxlY3RcIiwgZGF0YSk7XHJcbiAgICB9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0SW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgU2VjdGlvbklucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2xpY2tcIiwgXCJvbkNoYW5nZVwiLCBcImJ1dHRvblwiIC8qJ3NlbGVjdCcqL10sXHJcblx0XSxcclxuXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwic2VjdGlvbmlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWN0aW9uSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgUmFuZ2VJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInJhbmdlaW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmFuZ2VJbnB1dDsiLCJpbXBvcnQgUmFkaW9JbnB1dCBmcm9tICcuL1JhZGlvSW5wdXQnO1xyXG5cclxuY29uc3QgUmFkaW9CdXR0b25JbnB1dCA9ICQuZXh0ZW5kKHt9LCBSYWRpb0lucHV0LCB7XHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXIoXCJyYWRpb2J1dHRvbmlucHV0XCIsIGRhdGEpO1xyXG4gICAgfSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmFkaW9CdXR0b25JbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBSYWRpb0lucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQsIG5vZGUpIHtcclxuXHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpIHtcclxuXHRcdFx0ZXZlbnQuZGF0YS5lbGVtZW50LnRyaWdnZXIoJ3Byb3BlcnR5Q2hhbmdlJywgW3RoaXMudmFsdWUsIHRoaXNdKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnJlbW92ZUF0dHIoJ2NoZWNrZWQnKTtcclxuXHRcdGlmICh2YWx1ZSlcclxuXHRcdFx0JChcImlucHV0W3ZhbHVlPVwiICsgdmFsdWUgKyBcIl1cIiwgdGhpcy5lbGVtZW50KS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInJhZGlvaW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmFkaW9JbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuXHJcbmNvbnN0IFByb2R1Y3RzSW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJvZHVjdHNJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG52YXIgTnVtYmVySW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJudW1iZXJpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOdW1iZXJJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBMaXN0SW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcInNlbGVjdFwiXSxcclxuXHRdLFxyXG5cclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnc2VsZWN0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJsaXN0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpc3RJbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuXHJcbmNvbnN0IExpbmtJbnB1dCA9ICQuZXh0ZW5kKHt9LCBUZXh0SW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlua0lucHV0OyIsImltcG9ydCBUZXh0SW5wdXQgZnJvbSAnLi9UZXh0SW5wdXQnO1xyXG5cclxuY29uc3QgR3JpZExheW91dElucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImtleXVwXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdyaWRMYXlvdXRJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBHcmlkSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwic2VsZWN0XCIgLyonc2VsZWN0JyovXSxcclxuXHRcdFtcImNsaWNrXCIsIFwib25DaGFuZ2VcIiwgXCJidXR0b25cIiAvKidzZWxlY3QnKi9dLFxyXG5cdF0sXHJcblxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdzZWxlY3QnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImdyaWRcIiwgZGF0YSk7XHJcblx0fSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdyaWRJbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuXHJcbmNvbnN0IEZpbGVVcGxvYWRJbnB1dCA9ICQuZXh0ZW5kKHt9LCBUZXh0SW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaWxlVXBsb2FkSW5wdXQ7XHJcbiIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFRleHRJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuICAgIGV2ZW50czogW1xyXG4gICAgICAgIFtcImtleXVwXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHQgXSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cdFxyXG5cdGluaXQ6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG4gIH1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRleHRJbnB1dDsiLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBDc3NVbml0SW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0bnVtYmVyOiAwLFxyXG5cdHVuaXQ6IFwicHhcIixcclxuXHJcblx0b25DaGFuZ2U6IGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuXHRcdGlmIChldmVudC5kYXRhICYmIGV2ZW50LmRhdGEuZWxlbWVudCkge1xyXG5cdFx0XHRpbnB1dCA9IGV2ZW50LmRhdGEuaW5wdXQ7XHJcblx0XHRcdGlucHV0W3RoaXMubmFtZV0gPSB0aGlzLnZhbHVlOy8vIHRoaXMubmFtZSA9IHVuaXQgb3IgbnVtYmVyXHRcclxuXHJcblx0XHRcdHZhbHVlID0gXCJcIjtcclxuXHRcdFx0aWYgKGlucHV0LnVuaXQgPT0gXCJhdXRvXCIpIHtcclxuXHRcdFx0XHQkKGV2ZW50LmRhdGEuZWxlbWVudCkuYWRkQ2xhc3MoXCJhdXRvXCIpO1xyXG5cdFx0XHRcdHZhbHVlID0gaW5wdXQudW5pdDtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHQkKGV2ZW50LmRhdGEuZWxlbWVudCkucmVtb3ZlQ2xhc3MoXCJhdXRvXCIpO1xyXG5cdFx0XHRcdHZhbHVlID0gaW5wdXQubnVtYmVyICsgaW5wdXQudW5pdDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZXZlbnQuZGF0YS5lbGVtZW50LnRyaWdnZXIoJ3Byb3BlcnR5Q2hhbmdlJywgW3ZhbHVlLCB0aGlzXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcInNlbGVjdFwiXSxcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0dGhpcy5udW1iZXIgPSBwYXJzZUludCh2YWx1ZSk7XHJcblx0XHR0aGlzLnVuaXQgPSB2YWx1ZS5yZXBsYWNlKHRoaXMubnVtYmVyLCAnJyk7XHJcblxyXG5cdFx0aWYgKHRoaXMudW5pdCA9PSBcImF1dG9cIikgJCh0aGlzLmVsZW1lbnQpLmFkZENsYXNzKFwiYXV0b1wiKTtcclxuXHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHRoaXMubnVtYmVyKTtcclxuXHRcdCQoJ3NlbGVjdCcsIHRoaXMuZWxlbWVudCkudmFsKHRoaXMudW5pdCk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImNzc3VuaXRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDc3NVbml0SW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgQ29sb3JJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHQvL2h0bWw1IGNvbG9yIGlucHV0IG9ubHkgc3VwcG9ydHMgc2V0dGluZyB2YWx1ZXMgYXMgaGV4IGNvbG9ycyBldmVuIGlmIHRoZSBwaWNrZXIgcmV0dXJucyBvbmx5IHJnYlxyXG5cdHJnYjJoZXg6IGZ1bmN0aW9uIChyZ2IpIHtcclxuXHJcblx0XHRyZ2IgPSByZ2IubWF0Y2goL15yZ2JhP1tcXHMrXT9cXChbXFxzK10/KFxcZCspW1xccytdPyxbXFxzK10/KFxcZCspW1xccytdPyxbXFxzK10/KFxcZCspW1xccytdPy9pKTtcclxuXHJcblx0XHRyZXR1cm4gKHJnYiAmJiByZ2IubGVuZ3RoID09PSA0KSA/IFwiI1wiICtcclxuXHRcdFx0KFwiMFwiICsgcGFyc2VJbnQocmdiWzFdLCAxMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMikgK1xyXG5cdFx0XHQoXCIwXCIgKyBwYXJzZUludChyZ2JbMl0sIDEwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKSArXHJcblx0XHRcdChcIjBcIiArIHBhcnNlSW50KHJnYlszXSwgMTApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpIDogcmdiO1xyXG5cdH0sXHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHRoaXMucmdiMmhleCh2YWx1ZSkpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJjb2xvcmlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbG9ySW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgQ2hlY2tib3hJbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRvbkNoYW5nZTogZnVuY3Rpb24oZXZlbnQsIG5vZGUpIHtcclxuXHRcdFxyXG5cdFx0aWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS5lbGVtZW50KVxyXG5cdFx0e1xyXG5cdFx0XHRldmVudC5kYXRhLmVsZW1lbnQudHJpZ2dlcigncHJvcGVydHlDaGFuZ2UnLCBbdGhpcy5jaGVja2VkLCB0aGlzXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcbiAgICBldmVudHM6IFtcclxuICAgICAgICBbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdCBdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblx0XHJcblx0aW5pdDogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwiY2hlY2tib3hpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG4gIH1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENoZWNrYm94SW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgQnV0dG9uSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjbGlja1wiLCBcIm9uQ2hhbmdlXCIsIFwiYnV0dG9uXCIgLyonc2VsZWN0JyovXSxcclxuXHRdLFxyXG5cclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnYnV0dG9uJywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJidXR0b25cIiwgZGF0YSk7XHJcblx0fSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbklucHV0OyIsImNvbnN0IElucHV0ID0ge1xyXG5cdFxyXG5cdGluaXQ6IGZ1bmN0aW9uKG5hbWUpIHtcclxuXHR9LFxyXG5cclxuXHJcblx0b25DaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50LCBub2RlKSB7XHJcblx0XHRcclxuXHRcdGlmIChldmVudC5kYXRhICYmIGV2ZW50LmRhdGEuZWxlbWVudClcclxuXHRcdHtcclxuXHRcdFx0ZXZlbnQuZGF0YS5lbGVtZW50LnRyaWdnZXIoJ3Byb3BlcnR5Q2hhbmdlJywgW3RoaXMudmFsdWUsIHRoaXNdKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRyZW5kZXJUZW1wbGF0ZTogZnVuY3Rpb24obmFtZSwgZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRtcGwoXCJ2dnZlYi1pbnB1dC1cIiArIG5hbWUsIGRhdGEpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24obmFtZSwgZGF0YSkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJCh0aGlzLnJlbmRlclRlbXBsYXRlKG5hbWUsIGRhdGEpKTtcclxuXHRcdFxyXG5cdFx0Ly9iaW5kIGV2ZW50c1xyXG5cdFx0aWYgKHRoaXMuZXZlbnRzKVxyXG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzLmV2ZW50cylcclxuXHRcdHtcclxuXHRcdFx0ZXZlbnQgPSB0aGlzLmV2ZW50c1tpXVswXTtcclxuXHRcdFx0ZnVuID0gdGhpc1sgdGhpcy5ldmVudHNbaV1bMV0gXTtcclxuXHRcdFx0ZWwgPSB0aGlzLmV2ZW50c1tpXVsyXTtcclxuXHRcdFxyXG5cdFx0XHR0aGlzLmVsZW1lbnQub24oZXZlbnQsIGVsLCB7ZWxlbWVudDogdGhpcy5lbGVtZW50LCBpbnB1dDp0aGlzfSwgZnVuKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5lbGVtZW50O1xyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IElucHV0OyJdfQ==
