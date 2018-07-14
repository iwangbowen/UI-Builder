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

					if (typeof this._attributesLookup[i][data.attributes[i]] === 'undefined') {
						this._attributesLookup[i][data.attributes[i]] = {};
					}

					this._attributesLookup[i][data.attributes[i]] = data;
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

},{"./inputs/inputs":163,"./util/download":167,"./util/fullScreen":169,"./util/jsoup":170}],170:[function(require,module,exports){
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

},{}],169:[function(require,module,exports){
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

},{}],167:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
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

},{"./ButtonInput":142,"./CheckboxInput":143,"./ColorInput":144,"./CssUnitInput":145,"./FileUploadInput":146,"./GridInput":147,"./GridLayoutInput":148,"./Input":149,"./LinkInput":150,"./ListInput":151,"./NumberInput":152,"./ProductsInput":153,"./RadioButtonInput":154,"./RadioInput":155,"./RangeInput":156,"./SectionInput":157,"./SelectInput":158,"./TextInput":159,"./TextValueInput":160,"./ToggleInput":161,"./ValueTextInput":162}],162:[function(require,module,exports){
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

},{"./TextInput":159}],161:[function(require,module,exports){
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

},{"./TextInput":159}],160:[function(require,module,exports){
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

},{"./Input":149}],158:[function(require,module,exports){
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

},{"./Input":149}],157:[function(require,module,exports){
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

},{"./Input":149}],156:[function(require,module,exports){
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

},{"./Input":149}],154:[function(require,module,exports){
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

},{"./RadioInput":155}],155:[function(require,module,exports){
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

},{"./Input":149}],153:[function(require,module,exports){
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

},{"./TextInput":159}],152:[function(require,module,exports){
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

},{"./Input":149}],151:[function(require,module,exports){
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

},{"./Input":149}],150:[function(require,module,exports){
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

},{"./TextInput":159}],148:[function(require,module,exports){
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

},{"./TextInput":159}],147:[function(require,module,exports){
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

},{"./Input":149}],146:[function(require,module,exports){
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

},{"./TextInput":159}],159:[function(require,module,exports){
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

},{"./Input":149}],145:[function(require,module,exports){
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

},{"./Input":149}],144:[function(require,module,exports){
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

},{"./Input":149}],143:[function(require,module,exports){
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

},{"./Input":149}],142:[function(require,module,exports){
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

},{"./Input":149}],149:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGRlci5qcyIsInNyYy91dGlsL2pzb3VwLmpzIiwic3JjL3V0aWwvZnVsbFNjcmVlbi5qcyIsInNyYy91dGlsL2Rvd25sb2FkLmpzIiwic3JjL2lucHV0cy9pbnB1dHMuanMiLCJzcmMvaW5wdXRzL1ZhbHVlVGV4dElucHV0LmpzIiwic3JjL2lucHV0cy9Ub2dnbGVJbnB1dC5qcyIsInNyYy9pbnB1dHMvVGV4dFZhbHVlSW5wdXQuanMiLCJzcmMvaW5wdXRzL1NlbGVjdElucHV0LmpzIiwic3JjL2lucHV0cy9TZWN0aW9uSW5wdXQuanMiLCJzcmMvaW5wdXRzL1JhbmdlSW5wdXQuanMiLCJzcmMvaW5wdXRzL1JhZGlvQnV0dG9uSW5wdXQuanMiLCJzcmMvaW5wdXRzL1JhZGlvSW5wdXQuanMiLCJzcmMvaW5wdXRzL1Byb2R1Y3RzSW5wdXQuanMiLCJzcmMvaW5wdXRzL051bWJlcklucHV0LmpzIiwic3JjL2lucHV0cy9MaXN0SW5wdXQuanMiLCJzcmMvaW5wdXRzL0xpbmtJbnB1dC5qcyIsInNyYy9pbnB1dHMvR3JpZExheW91dElucHV0LmpzIiwic3JjL2lucHV0cy9HcmlkSW5wdXQuanMiLCJzcmMvaW5wdXRzL0ZpbGVVcGxvYWRJbnB1dC5qcyIsInNyYy9pbnB1dHMvVGV4dElucHV0LmpzIiwic3JjL2lucHV0cy9Dc3NVbml0SW5wdXQuanMiLCJzcmMvaW5wdXRzL0NvbG9ySW5wdXQuanMiLCJzcmMvaW5wdXRzL0NoZWNrYm94SW5wdXQuanMiLCJzcmMvaW5wdXRzL0J1dHRvbklucHV0LmpzIiwic3JjL2lucHV0cy9JbnB1dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNxQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBeEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkE7QUFDQTtBQU1BLENBQUMsWUFBWTtBQUNaLEtBQUksUUFBUSxFQUFaOztBQUVB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TCxDQUFZLENBQVosRUFBZSxDQUFmLENBQUw7O0FBRUEsUUFBSyxPQUFMLENBQWEsRUFBYixDQUFnQixLQUFoQixFQUF1QixFQUF2QixFQUEyQixFQUFDLFNBQVMsS0FBSyxPQUFmLEVBQXdCLE9BQU0sSUFBOUIsRUFBM0IsRUFBZ0UsR0FBaEU7QUFDQTs7QUFFRCxTQUFPLEtBQUssT0FBWjtBQUNBO0FBakNZLENBQWQ7O2tCQW9DZSxLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLypcclxuQ29weXJpZ2h0IDIwMTcgWmlhZGluIEdpdmFuXHJcblxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cclxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcblxyXG5odHRwczovL2dpdGh1Yi5jb20vZ2l2YW4vVnZ2ZWJKc1xyXG4qL1xyXG5cclxuXHJcbi8vIFNpbXBsZSBKYXZhU2NyaXB0IFRlbXBsYXRpbmdcclxuLy8gSm9obiBSZXNpZyAtIGh0dHBzOi8vam9obnJlc2lnLmNvbS8gLSBNSVQgTGljZW5zZWRcclxuaW1wb3J0IHsgU2VjdGlvbklucHV0IH0gZnJvbSAnLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgcmVtb3ZlVW51c2VkVGFncyB9IGZyb20gJy4vdXRpbC9qc291cCc7XHJcbmltcG9ydCB7IGRvd25sb2FkQXNUZXh0RmlsZSB9IGZyb20gJy4vdXRpbC9kb3dubG9hZCc7XHJcbmltcG9ydCB7IGxhdW5jaEZ1bGxTY3JlZW4gfSBmcm9tICcuL3V0aWwvZnVsbFNjcmVlbic7XHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG5cdHZhciBjYWNoZSA9IHt9O1xyXG5cclxuXHR0aGlzLnRtcGwgPSBmdW5jdGlvbiB0bXBsKHN0ciwgZGF0YSkge1xyXG5cdFx0Ly8gRmlndXJlIG91dCBpZiB3ZSdyZSBnZXR0aW5nIGEgdGVtcGxhdGUsIG9yIGlmIHdlIG5lZWQgdG9cclxuXHRcdC8vIGxvYWQgdGhlIHRlbXBsYXRlIC0gYW5kIGJlIHN1cmUgdG8gY2FjaGUgdGhlIHJlc3VsdC5cclxuXHRcdHZhciBmbiA9IC9eWy1hLXpBLVowLTldKyQvLnRlc3Qoc3RyKSA/XHJcblx0XHRcdGNhY2hlW3N0cl0gPSBjYWNoZVtzdHJdIHx8XHJcblx0XHRcdHRtcGwoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3RyKS5pbm5lckhUTUwpIDpcclxuXHJcblx0XHRcdC8vIEdlbmVyYXRlIGEgcmV1c2FibGUgZnVuY3Rpb24gdGhhdCB3aWxsIHNlcnZlIGFzIGEgdGVtcGxhdGVcclxuXHRcdFx0Ly8gZ2VuZXJhdG9yIChhbmQgd2hpY2ggd2lsbCBiZSBjYWNoZWQpLlxyXG5cdFx0XHRuZXcgRnVuY3Rpb24oXCJvYmpcIixcclxuXHRcdFx0XHRcInZhciBwPVtdLHByaW50PWZ1bmN0aW9uKCl7cC5wdXNoLmFwcGx5KHAsYXJndW1lbnRzKTt9O1wiICtcclxuXHJcblx0XHRcdFx0Ly8gSW50cm9kdWNlIHRoZSBkYXRhIGFzIGxvY2FsIHZhcmlhYmxlcyB1c2luZyB3aXRoKCl7fVxyXG5cdFx0XHRcdFwid2l0aChvYmope3AucHVzaCgnXCIgK1xyXG5cclxuXHRcdFx0XHQvLyBDb252ZXJ0IHRoZSB0ZW1wbGF0ZSBpbnRvIHB1cmUgSmF2YVNjcmlwdFxyXG5cdFx0XHRcdHN0clxyXG5cdFx0XHRcdFx0LnJlcGxhY2UoL1tcXHJcXHRcXG5dL2csIFwiIFwiKVxyXG5cdFx0XHRcdFx0LnNwbGl0KFwieyVcIikuam9pbihcIlxcdFwiKVxyXG5cdFx0XHRcdFx0LnJlcGxhY2UoLygoXnwlfSlbXlxcdF0qKScvZywgXCIkMVxcclwiKVxyXG5cdFx0XHRcdFx0LnJlcGxhY2UoL1xcdD0oLio/KSV9L2csIFwiJywkMSwnXCIpXHJcblx0XHRcdFx0XHQuc3BsaXQoXCJcXHRcIikuam9pbihcIicpO1wiKVxyXG5cdFx0XHRcdFx0LnNwbGl0KFwiJX1cIikuam9pbihcInAucHVzaCgnXCIpXHJcblx0XHRcdFx0XHQuc3BsaXQoXCJcXHJcIikuam9pbihcIlxcXFwnXCIpXHJcblx0XHRcdFx0KyBcIicpO31yZXR1cm4gcC5qb2luKCcnKTtcIik7XHJcblx0XHQvLyBQcm92aWRlIHNvbWUgYmFzaWMgY3VycnlpbmcgdG8gdGhlIHVzZXJcclxuXHRcdHJldHVybiBkYXRhID8gZm4oZGF0YSkgOiBmbjtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxudmFyIGRlbGF5ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGltZXIgPSAwO1xyXG5cdHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2ssIG1zKSB7XHJcblx0XHRjbGVhclRpbWVvdXQodGltZXIpO1xyXG5cdFx0dGltZXIgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCBtcyk7XHJcblx0fTtcclxufSkoKTtcclxuXHJcbmNvbnN0IHVudXNlZFRhZ3MgPSBbXHJcblx0Ly8ge1xyXG5cdC8vIFx0bmFtZTogJ3NjcmlwdCdcclxuXHQvLyB9LFxyXG5cdHtcclxuXHRcdG5hbWU6ICdsaW5rJyxcclxuXHRcdGZpbHRlcjogdGFnID0+IHRhZy5nZXRBdHRyaWJ1dGUoJ3JlbCcpID09ICdzdHlsZXNoZWV0J1xyXG5cdFx0XHQmJiB0YWcuZ2V0QXR0cmlidXRlKCdocmVmJykuaW5jbHVkZXMoJ2RyYWctbi1kcm9wJylcclxuXHR9LFxyXG5cdHtcclxuXHRcdG5hbWU6ICdocicsXHJcblx0XHRmaWx0ZXI6IHRhZyA9PiAkKHRhZykuaGFzQ2xhc3MoJ2hvcml6b250YWwtbGluZScpXHJcblx0XHRcdHx8ICQodGFnKS5oYXNDbGFzcygndmVydGljYWwtbGluZScpXHJcblx0fVxyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0U3R5bGUoZWwsIHN0eWxlUHJvcCkge1xyXG5cdHZhbHVlID0gXCJcIjtcclxuXHQvL3ZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsKTtcclxuXHRpZiAoZWwuc3R5bGUgJiYgZWwuc3R5bGUubGVuZ3RoID4gMCAmJiBlbC5zdHlsZVtzdHlsZVByb3BdKS8vY2hlY2sgaW5saW5lXHJcblx0XHR2YXIgdmFsdWUgPSBlbC5zdHlsZVtzdHlsZVByb3BdO1xyXG5cdGVsc2VcclxuXHRcdGlmIChlbC5jdXJyZW50U3R5bGUpXHQvL2NoZWNrIGRlZmluZWQgY3NzXHJcblx0XHRcdHZhciB2YWx1ZSA9IGVsLmN1cnJlbnRTdHlsZVtzdHlsZVByb3BdO1xyXG5cdFx0ZWxzZSBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcclxuXHRcdFx0dmFyIHZhbHVlID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0RGVmYXVsdENvbXB1dGVkU3R5bGUgP1xyXG5cdFx0XHRcdGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldERlZmF1bHRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHN0eWxlUHJvcCkgOlxyXG5cdFx0XHRcdHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHN0eWxlUHJvcCk7XHJcblx0XHR9XHJcblxyXG5cdHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuaWYgKFZ2dmViID09PSB1bmRlZmluZWQpIHZhciBWdnZlYiA9IHt9O1xyXG5cclxuVnZ2ZWIuZGVmYXVsdENvbXBvbmVudCA9IFwiX2Jhc2VcIjtcclxuVnZ2ZWIucHJlc2VydmVQcm9wZXJ0eVNlY3Rpb25zID0gdHJ1ZTtcclxuXHJcblZ2dmViLmJhc2VVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0ID8gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmMucmVwbGFjZSgvW15cXC9dKj9cXC5qcyQvLCAnJykgOiAnJztcclxuXHJcblZ2dmViLkNvbXBvbmVudHNHcm91cCA9IHt9O1xyXG5cclxuVnZ2ZWIuQ29tcG9uZW50cyA9IHtcclxuXHJcblx0X2NvbXBvbmVudHM6IHt9LFxyXG5cclxuXHRfbm9kZXNMb29rdXA6IHt9LFxyXG5cclxuXHRfYXR0cmlidXRlc0xvb2t1cDoge30sXHJcblxyXG5cdF9jbGFzc2VzTG9va3VwOiB7fSxcclxuXHJcblx0X2NsYXNzZXNSZWdleExvb2t1cDoge30sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uICh1cmwpIHtcclxuXHR9LFxyXG5cclxuXHRnZXQ6IGZ1bmN0aW9uICh0eXBlKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY29tcG9uZW50c1t0eXBlXTtcclxuXHR9LFxyXG5cclxuXHRhZGQ6IGZ1bmN0aW9uICh0eXBlLCBkYXRhKSB7XHJcblx0XHRkYXRhLnR5cGUgPSB0eXBlO1xyXG5cclxuXHRcdHRoaXMuX2NvbXBvbmVudHNbdHlwZV0gPSBkYXRhO1xyXG5cclxuXHRcdGlmIChkYXRhLm5vZGVzKSB7XHJcblx0XHRcdGZvciAodmFyIGkgaW4gZGF0YS5ub2Rlcykge1xyXG5cdFx0XHRcdHRoaXMuX25vZGVzTG9va3VwW2RhdGEubm9kZXNbaV1dID0gZGF0YTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkYXRhLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0aWYgKGRhdGEuYXR0cmlidXRlcy5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcclxuXHRcdFx0XHRmb3IgKHZhciBpIGluIGRhdGEuYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlc0xvb2t1cFtkYXRhLmF0dHJpYnV0ZXNbaV1dID0gZGF0YTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSBpbiBkYXRhLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5fYXR0cmlidXRlc0xvb2t1cFtpXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlc0xvb2t1cFtpXSA9IHt9O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5fYXR0cmlidXRlc0xvb2t1cFtpXVtkYXRhLmF0dHJpYnV0ZXNbaV1dID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2ldW2RhdGEuYXR0cmlidXRlc1tpXV0gPSB7fTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2ldW2RhdGEuYXR0cmlidXRlc1tpXV0gPSBkYXRhO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkYXRhLmNsYXNzZXMpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBkYXRhLmNsYXNzZXMpIHtcclxuXHRcdFx0XHR0aGlzLl9jbGFzc2VzTG9va3VwW2RhdGEuY2xhc3Nlc1tpXV0gPSBkYXRhO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGRhdGEuY2xhc3Nlc1JlZ2V4KSB7XHJcblx0XHRcdGZvciAodmFyIGkgaW4gZGF0YS5jbGFzc2VzUmVnZXgpIHtcclxuXHRcdFx0XHR0aGlzLl9jbGFzc2VzUmVnZXhMb29rdXBbZGF0YS5jbGFzc2VzUmVnZXhbaV1dID0gZGF0YTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGV4dGVuZDogZnVuY3Rpb24gKGluaGVyaXRUeXBlLCB0eXBlLCBkYXRhKSB7XHJcblxyXG5cdFx0bmV3RGF0YSA9IGRhdGE7XHJcblxyXG5cdFx0aWYgKGluaGVyaXREYXRhID0gdGhpcy5fY29tcG9uZW50c1tpbmhlcml0VHlwZV0pIHtcclxuXHRcdFx0bmV3RGF0YSA9ICQuZXh0ZW5kKHRydWUsIHt9LCBpbmhlcml0RGF0YSwgZGF0YSk7XHJcblx0XHRcdG5ld0RhdGEucHJvcGVydGllcyA9ICQubWVyZ2UoJC5tZXJnZShbXSwgaW5oZXJpdERhdGEucHJvcGVydGllcyA/IGluaGVyaXREYXRhLnByb3BlcnRpZXMgOiBbXSksIGRhdGEucHJvcGVydGllcyA/IGRhdGEucHJvcGVydGllcyA6IFtdKTtcclxuXHRcdH1cclxuXHJcblx0XHQvL3NvcnQgYnkgb3JkZXJcclxuXHRcdG5ld0RhdGEucHJvcGVydGllcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgYS5zb3J0ID09PSBcInVuZGVmaW5lZFwiKSBhLnNvcnQgPSAwO1xyXG5cdFx0XHRpZiAodHlwZW9mIGIuc29ydCA9PT0gXCJ1bmRlZmluZWRcIikgYi5zb3J0ID0gMDtcclxuXHJcblx0XHRcdGlmIChhLnNvcnQgPCBiLnNvcnQpXHJcblx0XHRcdFx0cmV0dXJuIC0xO1xyXG5cdFx0XHRpZiAoYS5zb3J0ID4gYi5zb3J0KVxyXG5cdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHRyZXR1cm4gMDtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHR0aGlzLmFkZCh0eXBlLCBuZXdEYXRhKTtcclxuXHR9LFxyXG5cclxuXHJcblx0bWF0Y2hOb2RlOiBmdW5jdGlvbiAobm9kZSkge1xyXG5cclxuXHRcdGlmIChub2RlLmF0dHJpYnV0ZXMubGVuZ3RoKSB7XHJcblx0XHRcdC8vc2VhcmNoIGZvciBhdHRyaWJ1dGVzXHJcblx0XHRcdGZvciAodmFyIGkgaW4gbm9kZS5hdHRyaWJ1dGVzKSB7XHJcblx0XHRcdFx0YXR0ciA9IG5vZGUuYXR0cmlidXRlc1tpXS5uYW1lO1xyXG5cdFx0XHRcdHZhbHVlID0gbm9kZS5hdHRyaWJ1dGVzW2ldLnZhbHVlO1xyXG5cclxuXHRcdFx0XHRpZiAoYXR0ciBpbiB0aGlzLl9hdHRyaWJ1dGVzTG9va3VwKSB7XHJcblx0XHRcdFx0XHRjb21wb25lbnQgPSB0aGlzLl9hdHRyaWJ1dGVzTG9va3VwW2F0dHJdO1xyXG5cclxuXHRcdFx0XHRcdC8vY3VycmVudGx5IHdlIGNoZWNrIHRoYXQgaXMgbm90IGEgY29tcG9uZW50IGJ5IGxvb2tpbmcgYXQgbmFtZSBhdHRyaWJ1dGVcclxuXHRcdFx0XHRcdC8vaWYgd2UgaGF2ZSBhIGNvbGxlY3Rpb24gb2Ygb2JqZWN0cyBpdCBtZWFucyB0aGF0IGF0dHJpYnV0ZSB2YWx1ZSBtdXN0IGJlIGNoZWNrZWRcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgY29tcG9uZW50W1wibmFtZVwiXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdFx0XHRpZiAodmFsdWUgaW4gY29tcG9uZW50KSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGNvbXBvbmVudFt2YWx1ZV07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gY29tcG9uZW50O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBub2RlLmF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRhdHRyID0gbm9kZS5hdHRyaWJ1dGVzW2ldLm5hbWU7XHJcblx0XHRcdFx0dmFsdWUgPSBub2RlLmF0dHJpYnV0ZXNbaV0udmFsdWU7XHJcblxyXG5cdFx0XHRcdC8vY2hlY2sgZm9yIG5vZGUgY2xhc3Nlc1xyXG5cdFx0XHRcdGlmIChhdHRyID09IFwiY2xhc3NcIikge1xyXG5cdFx0XHRcdFx0Y2xhc3NlcyA9IHZhbHVlLnNwbGl0KFwiIFwiKTtcclxuXHJcblx0XHRcdFx0XHRmb3IgKGogaW4gY2xhc3Nlcykge1xyXG5cdFx0XHRcdFx0XHRpZiAoY2xhc3Nlc1tqXSBpbiB0aGlzLl9jbGFzc2VzTG9va3VwKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl9jbGFzc2VzTG9va3VwW2NsYXNzZXNbal1dO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGZvciAocmVnZXggaW4gdGhpcy5fY2xhc3Nlc1JlZ2V4TG9va3VwKSB7XHJcblx0XHRcdFx0XHRcdHJlZ2V4T2JqID0gbmV3IFJlZ0V4cChyZWdleCk7XHJcblx0XHRcdFx0XHRcdGlmIChyZWdleE9iai5leGVjKHZhbHVlKSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl9jbGFzc2VzUmVnZXhMb29rdXBbcmVnZXhdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGFnTmFtZSA9IG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0aWYgKHRhZ05hbWUgaW4gdGhpcy5fbm9kZXNMb29rdXApIHJldHVybiB0aGlzLl9ub2Rlc0xvb2t1cFt0YWdOYW1lXTtcclxuXHJcblx0XHQvL3JldHVybiBmYWxzZTtcclxuXHRcdHJldHVybiB0aGlzLmdldChWdnZlYi5kZWZhdWx0Q29tcG9uZW50KTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uICh0eXBlKSB7XHJcblxyXG5cdFx0Y29tcG9uZW50ID0gdGhpcy5fY29tcG9uZW50c1t0eXBlXTtcclxuXHJcblx0XHRyaWdodFBhbmVsID0galF1ZXJ5KFwiI3JpZ2h0LXBhbmVsICNjb21wb25lbnQtcHJvcGVydGllc1wiKTtcclxuXHRcdHNlY3Rpb24gPSByaWdodFBhbmVsLmZpbmQoJy5zZWN0aW9uW2RhdGEtc2VjdGlvbj1cImRlZmF1bHRcIl0nKTtcclxuXHJcblx0XHRpZiAoIShWdnZlYi5wcmVzZXJ2ZVByb3BlcnR5U2VjdGlvbnMgJiYgc2VjdGlvbi5sZW5ndGgpKSB7XHJcblx0XHRcdHJpZ2h0UGFuZWwuaHRtbCgnJykuYXBwZW5kKHRtcGwoXCJ2dnZlYi1pbnB1dC1zZWN0aW9uaW5wdXRcIiwgeyBrZXk6IFwiZGVmYXVsdFwiLCBoZWFkZXI6IGNvbXBvbmVudC5uYW1lIH0pKTtcclxuXHRcdFx0c2VjdGlvbiA9IHJpZ2h0UGFuZWwuZmluZChcIi5zZWN0aW9uXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJpZ2h0UGFuZWwuZmluZCgnW2RhdGEtaGVhZGVyPVwiZGVmYXVsdFwiXSBzcGFuJykuaHRtbChjb21wb25lbnQubmFtZSk7XHJcblx0XHRzZWN0aW9uLmh0bWwoXCJcIilcclxuXHJcblx0XHRpZiAoY29tcG9uZW50LmJlZm9yZUluaXQpIGNvbXBvbmVudC5iZWZvcmVJbml0KFZ2dmViLkJ1aWxkZXIuc2VsZWN0ZWRFbC5nZXQoMCkpO1xyXG5cclxuXHRcdGZuID0gZnVuY3Rpb24gKGNvbXBvbmVudCwgcHJvcGVydHkpIHtcclxuXHRcdFx0cmV0dXJuIHByb3BlcnR5LmlucHV0Lm9uKCdwcm9wZXJ0eUNoYW5nZScsIGZ1bmN0aW9uIChldmVudCwgdmFsdWUsIGlucHV0KSB7XHJcblx0XHRcdFx0ZWxlbWVudCA9IFZ2dmViLkJ1aWxkZXIuc2VsZWN0ZWRFbDtcclxuXHRcdFx0XHRpZiAocHJvcGVydHkuY2hpbGQpIGVsZW1lbnQgPSBlbGVtZW50LmZpbmQocHJvcGVydHkuY2hpbGQpO1xyXG5cdFx0XHRcdGlmIChwcm9wZXJ0eS5wYXJlbnQpIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudChwcm9wZXJ0eS5wYXJlbnQpO1xyXG5cclxuXHRcdFx0XHRpZiAocHJvcGVydHkub25DaGFuZ2UpIHtcclxuXHRcdFx0XHRcdGVsZW1lbnQgPSBwcm9wZXJ0eS5vbkNoYW5nZShlbGVtZW50LCB2YWx1ZSwgaW5wdXQsIGNvbXBvbmVudCk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eS5odG1sQXR0cikge1xyXG5cdFx0XHRcdFx0b2xkVmFsdWUgPSBlbGVtZW50LmF0dHIocHJvcGVydHkuaHRtbEF0dHIpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChwcm9wZXJ0eS5odG1sQXR0ciA9PSBcImNsYXNzXCIgJiYgcHJvcGVydHkudmFsaWRWYWx1ZXMpIHtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudC5yZW1vdmVDbGFzcyhwcm9wZXJ0eS52YWxpZFZhbHVlcy5qb2luKFwiIFwiKSk7XHJcblx0XHRcdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LmFkZENsYXNzKHZhbHVlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKHByb3BlcnR5Lmh0bWxBdHRyID09IFwic3R5bGVcIikge1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5jc3MocHJvcGVydHkua2V5LCB2YWx1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQuYXR0cihwcm9wZXJ0eS5odG1sQXR0ciwgdmFsdWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdFx0XHR0eXBlOiAnYXR0cmlidXRlcycsXHJcblx0XHRcdFx0XHRcdHRhcmdldDogZWxlbWVudC5nZXQoMCksXHJcblx0XHRcdFx0XHRcdGF0dHJpYnV0ZU5hbWU6IHByb3BlcnR5Lmh0bWxBdHRyLFxyXG5cdFx0XHRcdFx0XHRvbGRWYWx1ZTogb2xkVmFsdWUsXHJcblx0XHRcdFx0XHRcdG5ld1ZhbHVlOiBlbGVtZW50LmF0dHIocHJvcGVydHkuaHRtbEF0dHIpXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChjb21wb25lbnQub25DaGFuZ2UpIHtcclxuXHRcdFx0XHRcdGVsZW1lbnQgPSBjb21wb25lbnQub25DaGFuZ2UoZWxlbWVudCwgcHJvcGVydHksIHZhbHVlLCBpbnB1dCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoIXByb3BlcnR5LmNoaWxkICYmICFwcm9wZXJ0eS5wYXJlbnQpIFZ2dmViLkJ1aWxkZXIuc2VsZWN0Tm9kZShlbGVtZW50KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdG5vZGVFbGVtZW50ID0gVnZ2ZWIuQnVpbGRlci5zZWxlY3RlZEVsO1xyXG5cclxuXHRcdGZvciAodmFyIGkgaW4gY29tcG9uZW50LnByb3BlcnRpZXMpIHtcclxuXHRcdFx0cHJvcGVydHkgPSBjb21wb25lbnQucHJvcGVydGllc1tpXTtcclxuXHJcblx0XHRcdGlmIChwcm9wZXJ0eS5iZWZvcmVJbml0KSBwcm9wZXJ0eS5iZWZvcmVJbml0KGVsZW1lbnQuZ2V0KDApKVxyXG5cclxuXHRcdFx0ZWxlbWVudCA9IG5vZGVFbGVtZW50O1xyXG5cdFx0XHRpZiAocHJvcGVydHkuY2hpbGQpIGVsZW1lbnQgPSBlbGVtZW50LmZpbmQocHJvcGVydHkuY2hpbGQpO1xyXG5cclxuXHRcdFx0aWYgKHByb3BlcnR5LmRhdGEpIHtcclxuXHRcdFx0XHRwcm9wZXJ0eS5kYXRhW1wia2V5XCJdID0gcHJvcGVydHkua2V5O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHByb3BlcnR5LmRhdGEgPSB7IFwia2V5XCI6IHByb3BlcnR5LmtleSB9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIHByb3BlcnR5Lmdyb3VwID09PSAndW5kZWZpbmVkJykgcHJvcGVydHkuZ3JvdXAgPSBudWxsO1xyXG5cclxuXHRcdFx0cHJvcGVydHkuaW5wdXQgPSBwcm9wZXJ0eS5pbnB1dHR5cGUuaW5pdChwcm9wZXJ0eS5kYXRhKTtcclxuXHJcblx0XHRcdGlmIChwcm9wZXJ0eS5pbml0KSB7XHJcblx0XHRcdFx0cHJvcGVydHkuaW5wdXR0eXBlLnNldFZhbHVlKHByb3BlcnR5LmluaXQoZWxlbWVudC5nZXQoMCkpKTtcclxuXHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eS5odG1sQXR0cikge1xyXG5cdFx0XHRcdGlmIChwcm9wZXJ0eS5odG1sQXR0ciA9PSBcInN0eWxlXCIpIHtcclxuXHRcdFx0XHRcdC8vdmFsdWUgPSBlbGVtZW50LmNzcyhwcm9wZXJ0eS5rZXkpOy8vanF1ZXJ5IGNzcyByZXR1cm5zIGNvbXB1dGVkIHN0eWxlXHJcblx0XHRcdFx0XHR2YWx1ZSA9IGdldFN0eWxlKGVsZW1lbnQuZ2V0KDApLCBwcm9wZXJ0eS5rZXkpOy8vZ2V0U3R5bGUgcmV0dXJucyBkZWNsYXJlZCBzdHlsZVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR2YWx1ZSA9IGVsZW1lbnQuYXR0cihwcm9wZXJ0eS5odG1sQXR0cik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvL2lmIGF0dHJpYnV0ZSBpcyBjbGFzcyBjaGVjayBpZiBvbmUgb2YgdmFsaWQgdmFsdWVzIGlzIGluY2x1ZGVkIGFzIGNsYXNzIHRvIHNldCB0aGUgc2VsZWN0XHJcblx0XHRcdFx0aWYgKHZhbHVlICYmIHByb3BlcnR5Lmh0bWxBdHRyID09IFwiY2xhc3NcIiAmJiBwcm9wZXJ0eS52YWxpZFZhbHVlcykge1xyXG5cdFx0XHRcdFx0dmFsdWUgPSB2YWx1ZS5zcGxpdChcIiBcIikuZmlsdGVyKGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcHJvcGVydHkudmFsaWRWYWx1ZXMuaW5kZXhPZihlbCkgIT0gLTFcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cHJvcGVydHkuaW5wdXR0eXBlLnNldFZhbHVlKHZhbHVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zm4oY29tcG9uZW50LCBwcm9wZXJ0eSk7XHJcblxyXG5cdFx0XHRpZiAocHJvcGVydHkuaW5wdXR0eXBlID09IFNlY3Rpb25JbnB1dCkge1xyXG5cdFx0XHRcdHNlY3Rpb24gPSByaWdodFBhbmVsLmZpbmQoJy5zZWN0aW9uW2RhdGEtc2VjdGlvbj1cIicgKyBwcm9wZXJ0eS5rZXkgKyAnXCJdJyk7XHJcblxyXG5cdFx0XHRcdGlmIChWdnZlYi5wcmVzZXJ2ZVByb3BlcnR5U2VjdGlvbnMgJiYgc2VjdGlvbi5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdHNlY3Rpb24uaHRtbChcIlwiKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cmlnaHRQYW5lbC5hcHBlbmQocHJvcGVydHkuaW5wdXQpO1xyXG5cdFx0XHRcdFx0c2VjdGlvbiA9IHJpZ2h0UGFuZWwuZmluZCgnLnNlY3Rpb25bZGF0YS1zZWN0aW9uPVwiJyArIHByb3BlcnR5LmtleSArICdcIl0nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0cm93ID0gJCh0bXBsKCd2dnZlYi1wcm9wZXJ0eScsIHByb3BlcnR5KSk7XHJcblx0XHRcdFx0cm93LmZpbmQoJy5pbnB1dCcpLmFwcGVuZChwcm9wZXJ0eS5pbnB1dCk7XHJcblx0XHRcdFx0c2VjdGlvbi5hcHBlbmQocm93KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjb21wb25lbnQuaW5pdCkgY29tcG9uZW50LmluaXQoVnZ2ZWIuQnVpbGRlci5zZWxlY3RlZEVsLmdldCgwKSk7XHJcblx0fVxyXG59O1xyXG5cclxuXHJcblxyXG5WdnZlYi5XeXNpd3lnRWRpdG9yID0ge1xyXG5cclxuXHRpc0FjdGl2ZTogZmFsc2UsXHJcblx0b2xkVmFsdWU6ICcnLFxyXG5cdGRvYzogZmFsc2UsXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkb2MpIHtcclxuXHRcdHRoaXMuZG9jID0gZG9jO1xyXG5cclxuXHRcdCQoXCIjYm9sZC1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRkb2MuZXhlY0NvbW1hbmQoJ2JvbGQnLCBmYWxzZSwgbnVsbCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNpdGFsaWMtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCdpdGFsaWMnLCBmYWxzZSwgbnVsbCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiN1bmRlcmxpbmUtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCd1bmRlcmxpbmUnLCBmYWxzZSwgbnVsbCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNzdHJpa2UtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZG9jLmV4ZWNDb21tYW5kKCdzdHJpa2VUaHJvdWdoJywgZmFsc2UsIG51bGwpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjbGluay1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRkb2MuZXhlY0NvbW1hbmQoJ2NyZWF0ZUxpbmsnLCBmYWxzZSwgXCIjXCIpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHVuZG86IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHR0aGlzLmRvYy5leGVjQ29tbWFuZCgndW5kbycsIGZhbHNlLCBudWxsKTtcclxuXHR9LFxyXG5cclxuXHRyZWRvOiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5kb2MuZXhlY0NvbW1hbmQoJ3JlZG8nLCBmYWxzZSwgbnVsbCk7XHJcblx0fSxcclxuXHJcblx0ZWRpdDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdGVsZW1lbnQuYXR0cih7ICdjb250ZW50ZWRpdGFibGUnOiB0cnVlLCAnc3BlbGxjaGVja2tlcic6IGZhbHNlIH0pO1xyXG5cdFx0JChcIiN3eXNpd3lnLWVkaXRvclwiKS5zaG93KCk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuXHRcdHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xyXG5cdFx0dGhpcy5vbGRWYWx1ZSA9IGVsZW1lbnQuaHRtbCgpO1xyXG5cdH0sXHJcblxyXG5cdGRlc3Ryb3k6IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHRlbGVtZW50LnJlbW92ZUF0dHIoJ2NvbnRlbnRlZGl0YWJsZSBzcGVsbGNoZWNra2VyJyk7XHJcblx0XHQkKFwiI3d5c2l3eWctZWRpdG9yXCIpLmhpZGUoKTtcclxuXHRcdHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHJcblxyXG5cdFx0bm9kZSA9IHRoaXMuZWxlbWVudC5nZXQoMCk7XHJcblx0XHRWdnZlYi5VbmRvLmFkZE11dGF0aW9uKHtcclxuXHRcdFx0dHlwZTogJ2NoYXJhY3RlckRhdGEnLFxyXG5cdFx0XHR0YXJnZXQ6IG5vZGUsXHJcblx0XHRcdG9sZFZhbHVlOiB0aGlzLm9sZFZhbHVlLFxyXG5cdFx0XHRuZXdWYWx1ZTogbm9kZS5pbm5lckhUTUxcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuVnZ2ZWIuQnVpbGRlciA9IHtcclxuXHJcblx0ZHJhZ01vdmVNdXRhdGlvbjogZmFsc2UsXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uICh1cmwsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0c2VsZiA9IHRoaXM7XHJcblxyXG5cdFx0c2VsZi5sb2FkQ29udHJvbEdyb3VwcygpO1xyXG5cclxuXHRcdHNlbGYuc2VsZWN0ZWRFbCA9IG51bGw7XHJcblx0XHRzZWxmLmhpZ2hsaWdodEVsID0gbnVsbDtcclxuXHRcdHNlbGYuaW5pdENhbGxiYWNrID0gY2FsbGJhY2s7XHJcblxyXG5cdFx0c2VsZi5kb2N1bWVudEZyYW1lID0gJChcIiNpZnJhbWUtd3JhcHBlciA+IGlmcmFtZVwiKTtcclxuXHRcdHNlbGYuY2FudmFzID0gJChcIiNjYW52YXNcIik7XHJcblxyXG5cdFx0c2VsZi5fbG9hZElmcmFtZSh1cmwpO1xyXG5cclxuXHRcdHNlbGYuX2luaXREcmFnZHJvcCgpO1xyXG5cclxuXHRcdHNlbGYuZHJhZ0VsZW1lbnQgPSBudWxsO1xyXG5cdH0sXHJcblxyXG5cdC8qIGNvbnRyb2xzICovXHJcblx0bG9hZENvbnRyb2xHcm91cHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRjb21wb25lbnRzTGlzdCA9ICQoXCIjY29tcG9uZW50cy1saXN0XCIpO1xyXG5cdFx0Y29tcG9uZW50c0xpc3QuZW1wdHkoKTtcclxuXHJcblx0XHRmb3IgKGdyb3VwIGluIFZ2dmViLkNvbXBvbmVudHNHcm91cCkge1xyXG5cdFx0XHRjb21wb25lbnRzTGlzdC5hcHBlbmQoJzxsaSBjbGFzcz1cImhlYWRlclwiIGRhdGEtc2VjdGlvbj1cIicgKyBncm91cCArICdcIiAgZGF0YS1zZWFyY2g9XCJcIj48bGFiZWwgY2xhc3M9XCJoZWFkZXJcIiBmb3I9XCJjb21waGVhZF8nICsgZ3JvdXAgKyAnXCI+JyArIGdyb3VwICsgJyAgPGRpdiBjbGFzcz1cImhlYWRlci1hcnJvd1wiPjwvZGl2PlxcXHJcblx0XHRcdFx0XHRcdFx0XHQgICA8L2xhYmVsPjxpbnB1dCBjbGFzcz1cImhlYWRlcl9jaGVja1wiIHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJ0cnVlXCIgaWQ9XCJjb21waGVhZF8nICsgZ3JvdXAgKyAnXCI+ICA8b2w+PC9vbD48L2xpPicpO1xyXG5cclxuXHRcdFx0Y29tcG9uZW50c1N1Ykxpc3QgPSBjb21wb25lbnRzTGlzdC5maW5kKCdsaVtkYXRhLXNlY3Rpb249XCInICsgZ3JvdXAgKyAnXCJdICBvbCcpO1xyXG5cclxuXHRcdFx0Y29tcG9uZW50cyA9IFZ2dmViLkNvbXBvbmVudHNHcm91cFtncm91cF07XHJcblxyXG5cdFx0XHRmb3IgKGkgaW4gY29tcG9uZW50cykge1xyXG5cdFx0XHRcdGNvbXBvbmVudFR5cGUgPSBjb21wb25lbnRzW2ldO1xyXG5cdFx0XHRcdGNvbXBvbmVudCA9IFZ2dmViLkNvbXBvbmVudHMuZ2V0KGNvbXBvbmVudFR5cGUpO1xyXG5cclxuXHRcdFx0XHRpZiAoY29tcG9uZW50KSB7XHJcblx0XHRcdFx0XHRpdGVtID0gJCgnPGxpIGRhdGEtc2VjdGlvbj1cIicgKyBncm91cCArICdcIiBkYXRhLXR5cGU9XCInICsgY29tcG9uZW50VHlwZSArICdcIiBkYXRhLXNlYXJjaD1cIicgKyBjb21wb25lbnQubmFtZS50b0xvd2VyQ2FzZSgpICsgJ1wiPjxhIGhyZWY9XCIjXCI+JyArIGNvbXBvbmVudC5uYW1lICsgXCI8L2E+PC9saT5cIik7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGNvbXBvbmVudC5pbWFnZSkge1xyXG5cclxuXHRcdFx0XHRcdFx0aXRlbS5jc3Moe1xyXG5cdFx0XHRcdFx0XHRcdGJhY2tncm91bmRJbWFnZTogXCJ1cmwoXCIgKyAnbGlicy9idWlsZGVyLycgKyBjb21wb25lbnQuaW1hZ2UgKyBcIilcIixcclxuXHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kUmVwZWF0OiBcIm5vLXJlcGVhdFwiXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Y29tcG9uZW50c1N1Ykxpc3QuYXBwZW5kKGl0ZW0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0bG9hZFVybDogZnVuY3Rpb24gKHVybCkge1xyXG5cdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cdFx0c2VsZi5pZnJhbWUuc3JjID0gdXJsO1xyXG5cdH0sXHJcblxyXG5cdC8qIGlmcmFtZSAqL1xyXG5cdF9sb2FkSWZyYW1lOiBmdW5jdGlvbiAodXJsKSB7XHJcblxyXG5cdFx0c2VsZi5pZnJhbWUgPSB0aGlzLmRvY3VtZW50RnJhbWUuZ2V0KDApO1xyXG5cdFx0c2VsZi5pZnJhbWUuc3JjID0gdXJsO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmRvY3VtZW50RnJhbWUub24oXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdHdpbmRvdy5GcmFtZVdpbmRvdyA9IHNlbGYuaWZyYW1lLmNvbnRlbnRXaW5kb3c7XHJcblx0XHRcdHdpbmRvdy5GcmFtZURvY3VtZW50ID0gc2VsZi5pZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcclxuXHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IuaW5pdCh3aW5kb3cuRnJhbWVEb2N1bWVudCk7XHJcblx0XHRcdGlmIChzZWxmLmluaXRDYWxsYmFjaykgc2VsZi5pbml0Q2FsbGJhY2soKTtcclxuXHJcblx0XHRcdHJldHVybiBzZWxmLl9mcmFtZUxvYWRlZCgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdF9mcmFtZUxvYWRlZDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHNlbGYuZnJhbWVEb2MgPSAkKHdpbmRvdy5GcmFtZURvY3VtZW50KTtcclxuXHRcdHNlbGYuZnJhbWVIdG1sID0gJCh3aW5kb3cuRnJhbWVEb2N1bWVudCkuZmluZChcImh0bWxcIik7XHJcblx0XHRzZWxmLmZyYW1lQm9keSA9ICQod2luZG93LkZyYW1lRG9jdW1lbnQpLmZpbmQoXCJib2R5XCIpO1xyXG5cclxuXHRcdHRoaXMuX2luaXRIaWdodGxpZ2h0KCk7XHJcblx0fSxcclxuXHJcblx0X2dldEVsZW1lbnRUeXBlOiBmdW5jdGlvbiAoZWwpIHtcclxuXHJcblx0XHQvL3NlYXJjaCBmb3IgY29tcG9uZW50IGF0dHJpYnV0ZVxyXG5cdFx0Y29tcG9uZW50TmFtZSA9ICcnO1xyXG5cclxuXHRcdGlmIChlbC5hdHRyaWJ1dGVzKVxyXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBqKyspIHtcclxuXHJcblx0XHRcdFx0aWYgKGVsLmF0dHJpYnV0ZXNbal0ubm9kZU5hbWUuaW5kZXhPZignZGF0YS1jb21wb25lbnQnKSA+IC0xKSB7XHJcblx0XHRcdFx0XHRjb21wb25lbnROYW1lID0gZWwuYXR0cmlidXRlc1tqXS5ub2RlTmFtZS5yZXBsYWNlKCdkYXRhLWNvbXBvbmVudC0nLCAnJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbXBvbmVudE5hbWUgIT0gJycpIHJldHVybiBjb21wb25lbnROYW1lO1xyXG5cclxuXHRcdGlmIChlbC5hdHRyaWJ1dGVzKVxyXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBqKyspIHtcclxuXHJcblx0XHRcdFx0aWYgKGVsLmF0dHJpYnV0ZXNbal0ubm9kZU5hbWUuaW5kZXhPZignZGF0YS1jb21wb25lbnQnKSA+IC0xKSB7XHJcblx0XHRcdFx0XHRjb21wb25lbnROYW1lID0gZWwuYXR0cmlidXRlc1tqXS5ub2RlTmFtZS5yZXBsYWNlKCdkYXRhLWNvbXBvbmVudC0nLCAnJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbXBvbmVudE5hbWUgIT0gJycpIHJldHVybiBjb21wb25lbnROYW1lO1xyXG5cdFx0Ly9pZiAoY2xhc3NOYW1lKSByZXR1cm4gY29tcG9uZW50TmFtZTtcclxuXHRcdHJldHVybiBlbC50YWdOYW1lO1xyXG5cdH0sXHJcblxyXG5cdGxvYWROb2RlQ29tcG9uZW50OiBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0ZGF0YSA9IFZ2dmViLkNvbXBvbmVudHMubWF0Y2hOb2RlKG5vZGUpO1xyXG5cdFx0aWYgKGRhdGEpIFZ2dmViLkNvbXBvbmVudHMucmVuZGVyKGRhdGEudHlwZSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdHNlbGVjdE5vZGU6IGZ1bmN0aW9uIChub2RlID0gZmFsc2UpIHtcclxuXHJcblx0XHRpZiAoIW5vZGUpIHtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHNlbGYudGV4dGVkaXRFbCAmJiBzZWxmLnNlbGVjdGVkRWwuZ2V0KDApICE9IG5vZGUpIHtcclxuXHRcdFx0VnZ2ZWIuV3lzaXd5Z0VkaXRvci5kZXN0cm95KHNlbGYudGV4dGVkaXRFbCk7XHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLnJlbW92ZUNsYXNzKFwidGV4dC1lZGl0XCIpLmZpbmQoXCIjc2VsZWN0LWFjdGlvbnNcIikuc2hvdygpO1xyXG5cdFx0XHRzZWxmLnRleHRlZGl0RWwgPSBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlbGYuc2VsZWN0ZWRFbCA9IHRhcmdldCA9IGpRdWVyeShub2RlKTtcclxuXHRcdG9mZnNldCA9IHRhcmdldC5vZmZzZXQoKTtcclxuXHJcblxyXG5cdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuY3NzKFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJ0b3BcIjogb2Zmc2V0LnRvcCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsVG9wKCksXHJcblx0XHRcdFx0XCJsZWZ0XCI6IG9mZnNldC5sZWZ0IC0gc2VsZi5mcmFtZURvYy5zY3JvbGxMZWZ0KCksXHJcblx0XHRcdFx0XCJ3aWR0aFwiOiB0YXJnZXQub3V0ZXJXaWR0aCgpLFxyXG5cdFx0XHRcdFwiaGVpZ2h0XCI6IHRhcmdldC5vdXRlckhlaWdodCgpLFxyXG5cdFx0XHRcdFwiZGlzcGxheVwiOiBcImJsb2NrXCIsXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdGpRdWVyeShcIiNoaWdobGlnaHQtbmFtZVwiKS5odG1sKHNlbGYuX2dldEVsZW1lbnRUeXBlKG5vZGUpKTtcclxuXHJcblx0fSxcclxuXHJcblx0LyogaWZyYW1lIGhpZ2hsaWdodCAqL1xyXG5cdF9pbml0SGlnaHRsaWdodDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdG1vdmVFdmVudCA9IHsgdGFyZ2V0OiBudWxsLCB9O1xyXG5cclxuXHRcdHRoaXMuZnJhbWVCb2R5Lm9uKFwibW91c2Vtb3ZlIHRvdWNobW92ZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0Ly9kZWxheSBmb3IgaGFsZiBhIHNlY29uZCBpZiBkcmFnZ2luZyBvdmVyIHNhbWUgZWxlbWVudFxyXG5cdFx0XHQvLyBpZiAoZXZlbnQudGFyZ2V0ID09IG1vdmVFdmVudC50YXJnZXQgJiYgKChldmVudC50aW1lU3RhbXAgLSBtb3ZlRXZlbnQudGltZVN0YW1wKSA8IDUwMCkpIHJldHVybjtcclxuXHRcdFx0aWYgKGV2ZW50LnRhcmdldCkge1xyXG5cdFx0XHRcdG1vdmVFdmVudCA9IGV2ZW50O1xyXG5cclxuXHRcdFx0XHRzZWxmLmhpZ2hsaWdodEVsID0gdGFyZ2V0ID0galF1ZXJ5KGV2ZW50LnRhcmdldCk7XHJcblx0XHRcdFx0b2Zmc2V0ID0gdGFyZ2V0Lm9mZnNldCgpO1xyXG5cdFx0XHRcdHdpZHRoID0gdGFyZ2V0Lm91dGVyV2lkdGgoKTtcclxuXHRcdFx0XHRoZWlnaHQgPSB0YXJnZXQub3V0ZXJIZWlnaHQoKTtcclxuXHJcblx0XHRcdFx0aWYgKHNlbGYuaXNEcmFnZ2luZykge1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnRWxlbWVudC5jc3Moe1xyXG5cdFx0XHRcdFx0XHRkaXNwbGF5OiAnbm9uZSdcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0cGFyZW50ID0gc2VsZi5oaWdobGlnaHRFbDtcclxuXHRcdFx0XHRcdHBhcmVudE9mZnNldCA9IHNlbGYuZHJhZ0VsZW1lbnQub2Zmc2V0KCk7XHJcblx0XHRcdFx0XHQvLyB0cnkge1xyXG5cdFx0XHRcdFx0Ly8gXHRzZWxmLmRyYWdFbGVtZW50LmNzcyh7XHJcblx0XHRcdFx0XHQvLyBcdFx0ZGlzcGxheTogJ25vbmUnXHJcblx0XHRcdFx0XHQvLyBcdH0pO1xyXG5cdFx0XHRcdFx0Ly8gXHRpZiAoZXZlbnQub3JpZ2luYWxFdmVudCAmJiAob2Zmc2V0LmxlZnQgPiAoZXZlbnQub3JpZ2luYWxFdmVudC54IC0gMTApKSkge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdGlmIChvZmZzZXQudG9wID4gKGV2ZW50Lm9yaWdpbmFsRXZlbnQueSAtIDEwKSkge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0cGFyZW50LmJlZm9yZShzZWxmLmRyYWdFbGVtZW50KTtcclxuXHRcdFx0XHRcdC8vIFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0cGFyZW50LnByZXBlbmQoc2VsZi5kcmFnRWxlbWVudCk7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRzZWxmLmRyYWdFbGVtZW50LnByZXBlbmRUbyhwYXJlbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdH1cclxuXHRcdFx0XHRcdC8vIFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRpZiAoZXZlbnQub3JpZ2luYWxFdmVudCAmJiBvZmZzZXQudG9wID4gKChldmVudC5vcmlnaW5hbEV2ZW50LnkgLSAxMCkpKSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRwYXJlbnQuYmVmb3JlKHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0XHRwYXJlbnQuYXBwZW5kKHNlbGYuZHJhZ0VsZW1lbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdFx0c2VsZi5kcmFnRWxlbWVudC5hcHBlbmRUbyhwYXJlbnQpO1xyXG5cdFx0XHRcdFx0Ly8gXHRcdH1cclxuXHRcdFx0XHRcdC8vIFx0fVxyXG5cdFx0XHRcdFx0Ly8gfSBjYXRjaCAoZXJyKSB7XHJcblx0XHRcdFx0XHQvLyBcdGNvbnNvbGUubG9nKGVycik7XHJcblx0XHRcdFx0XHQvLyB9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0XHRqUXVlcnkoXCIjaGlnaGxpZ2h0LWJveFwiKS5jc3MoXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcInRvcFwiOiBvZmZzZXQudG9wIC0gc2VsZi5mcmFtZURvYy5zY3JvbGxUb3AoKSxcclxuXHRcdFx0XHRcdFx0XHRcImxlZnRcIjogb2Zmc2V0LmxlZnQgLSBzZWxmLmZyYW1lRG9jLnNjcm9sbExlZnQoKSxcclxuXHRcdFx0XHRcdFx0XHRcIndpZHRoXCI6IHdpZHRoLFxyXG5cdFx0XHRcdFx0XHRcdFwiaGVpZ2h0XCI6IGhlaWdodCxcclxuXHRcdFx0XHRcdFx0XHRcImRpc3BsYXlcIjogZXZlbnQudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJykgPyBcIm5vbmVcIiA6IFwiYmxvY2tcIlxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRqUXVlcnkoXCIjaGlnaGxpZ2h0LW5hbWVcIikuaHRtbChzZWxmLl9nZXRFbGVtZW50VHlwZShldmVudC50YXJnZXQpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHR0aGlzLmZyYW1lQm9keS5vbihcIm1vdXNldXAgdG91Y2hlbmRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGlmIChzZWxmLmlzRHJhZ2dpbmcpIHtcclxuXHRcdFx0XHRzZWxmLmlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0aWYgKGNvbXBvbmVudC5kcmFnSHRtbCkgLy9pZiBkcmFnSHRtbCBpcyBzZXQgZm9yIGRyYWdnaW5nIHRoZW4gc2V0IHJlYWwgY29tcG9uZW50IGh0bWxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRuZXdFbGVtZW50ID0gJChjb21wb25lbnQuaHRtbCk7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdFbGVtZW50LnJlcGxhY2VXaXRoKG5ld0VsZW1lbnQpO1xyXG5cdFx0XHRcdFx0c2VsZi5kcmFnRWxlbWVudCA9IG5ld0VsZW1lbnQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChjb21wb25lbnQuYWZ0ZXJEcm9wKSBzZWxmLmRyYWdFbGVtZW50ID0gY29tcG9uZW50LmFmdGVyRHJvcChzZWxmLmRyYWdFbGVtZW50KTtcclxuXHJcblx0XHRcdFx0bm9kZSA9IHNlbGYuZHJhZ0VsZW1lbnQuZ2V0KDApO1xyXG5cdFx0XHRcdHNlbGYuc2VsZWN0Tm9kZShub2RlKTtcclxuXHRcdFx0XHRzZWxmLmxvYWROb2RlQ29tcG9uZW50KG5vZGUpO1xyXG5cclxuXHRcdFx0XHRpZiAoc2VsZi5kcmFnTW92ZU11dGF0aW9uID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0XHRcdHR5cGU6ICdjaGlsZExpc3QnLFxyXG5cdFx0XHRcdFx0XHR0YXJnZXQ6IG5vZGUucGFyZW50Tm9kZSxcclxuXHRcdFx0XHRcdFx0YWRkZWROb2RlczogW25vZGVdLFxyXG5cdFx0XHRcdFx0XHRuZXh0U2libGluZzogbm9kZS5uZXh0U2libGluZ1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ01vdmVNdXRhdGlvbi5uZXdQYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdFx0XHRzZWxmLmRyYWdNb3ZlTXV0YXRpb24ubmV3TmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oc2VsZi5kcmFnTW92ZU11dGF0aW9uKTtcclxuXHRcdFx0XHRcdHNlbGYuZHJhZ01vdmVNdXRhdGlvbiA9IGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdHRoaXMuZnJhbWVCb2R5Lm9uKFwiZGJsY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRzZWxmLnRleHRlZGl0RWwgPSB0YXJnZXQgPSBqUXVlcnkoZXZlbnQudGFyZ2V0KTtcclxuXHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IuZWRpdChzZWxmLnRleHRlZGl0RWwpO1xyXG5cclxuXHRcdFx0c2VsZi50ZXh0ZWRpdEVsLmF0dHIoeyAnY29udGVudGVkaXRhYmxlJzogdHJ1ZSwgJ3NwZWxsY2hlY2trZXInOiBmYWxzZSB9KTtcclxuXHJcblx0XHRcdHNlbGYudGV4dGVkaXRFbC5vbihcImJsdXIga2V5dXAgcGFzdGUgaW5wdXRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmNzcyh7XHJcblx0XHRcdFx0XHRcIndpZHRoXCI6IHNlbGYudGV4dGVkaXRFbC5vdXRlcldpZHRoKCksXHJcblx0XHRcdFx0XHRcImhlaWdodFwiOiBzZWxmLnRleHRlZGl0RWwub3V0ZXJIZWlnaHQoKVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGpRdWVyeShcIiNzZWxlY3QtYm94XCIpLmFkZENsYXNzKFwidGV4dC1lZGl0XCIpLmZpbmQoXCIjc2VsZWN0LWFjdGlvbnNcIikuaGlkZSgpO1xyXG5cdFx0XHRqUXVlcnkoXCIjaGlnaGxpZ2h0LWJveFwiKS5oaWRlKCk7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0dGhpcy5mcmFtZUJvZHkub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50LnRhcmdldCkge1xyXG5cdFx0XHRcdGlmICghaXNQcmV2aWV3ICYmICEkKCcjYXR0cmlidXRlLXNldHRpbmdzJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcblx0XHRcdFx0XHQkKCcjYXR0cmlidXRlLXNldHRpbmdzJylcclxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKCdhY3RpdmUnKVxyXG5cdFx0XHRcdFx0XHQuc2libGluZ3MoKVxyXG5cdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdFx0JCgnI2xlZnQtcGFuZWwnKS5oaWRlKCk7XHJcblx0XHRcdFx0XHQkKCcjcmlnaHQtcGFuZWwnKS5zaG93KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHNlbGYuc2VsZWN0Tm9kZShldmVudC50YXJnZXQpO1xyXG5cdFx0XHRcdHNlbGYubG9hZE5vZGVDb21wb25lbnQoZXZlbnQudGFyZ2V0KTtcclxuXHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuZnJhbWVCb2R5LmtleWRvd24oZSA9PiB7XHJcblx0XHRcdGlmIChzZWxmLnNlbGVjdGVkRWwgJiYgc2VsZi5zZWxlY3RlZEVsLnByb3AoJ3RhZ05hbWUnKSAhPSAnQk9EWScpIHtcclxuXHRcdFx0XHRpZiAoZS53aGljaCA9PSAzNyB8fCBlLndoaWNoID09IDM4IHx8IGUud2hpY2ggPT0gMzkgfHwgZS53aGljaCA9PSA0MCkge1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lmcmFtZUlkJykuY29udGVudFdpbmRvdy5hcnJvd0tleU1vdmUoZS53aGljaCwgc2VsZi5zZWxlY3RlZEVsKTtcclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCB0aGUgZGVmYXVsdCBhY3Rpb24gKHNjcm9sbCAvIG1vdmUgY2FyZXQpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI2RyYWctYm94XCIpLm9uKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblx0XHRcdHNlbGYuZHJhZ0VsZW1lbnQgPSBzZWxmLnNlbGVjdGVkRWw7XHJcblx0XHRcdHNlbGYuaXNEcmFnZ2luZyA9IHRydWU7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5kcmFnRWxlbWVudC5nZXQoMCk7XHJcblxyXG5cclxuXHRcdFx0c2VsZi5kcmFnTW92ZU11dGF0aW9uID0ge1xyXG5cdFx0XHRcdHR5cGU6ICdtb3ZlJyxcclxuXHRcdFx0XHR0YXJnZXQ6IG5vZGUsXHJcblx0XHRcdFx0b2xkUGFyZW50OiBub2RlLnBhcmVudE5vZGUsXHJcblx0XHRcdFx0b2xkTmV4dFNpYmxpbmc6IG5vZGUubmV4dFNpYmxpbmdcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vc2VsZi5zZWxlY3ROb2RlKGZhbHNlKTtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNkb3duLWJveFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5zZWxlY3RlZEVsLmdldCgwKTtcclxuXHRcdFx0b2xkUGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRvbGROZXh0U2libGluZyA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0XHRuZXh0ID0gc2VsZi5zZWxlY3RlZEVsLm5leHQoKTtcclxuXHJcblx0XHRcdGlmIChuZXh0Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRuZXh0LmFmdGVyKHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c2VsZi5zZWxlY3RlZEVsLnBhcmVudCgpLmFmdGVyKHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG5ld1BhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0bmV3TmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0dHlwZTogJ21vdmUnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZSxcclxuXHRcdFx0XHRvbGRQYXJlbnQ6IG9sZFBhcmVudCxcclxuXHRcdFx0XHRuZXdQYXJlbnQ6IG5ld1BhcmVudCxcclxuXHRcdFx0XHRvbGROZXh0U2libGluZzogb2xkTmV4dFNpYmxpbmcsXHJcblx0XHRcdFx0bmV3TmV4dFNpYmxpbmc6IG5ld05leHRTaWJsaW5nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiN1cC1ib3hcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuaGlkZSgpO1xyXG5cclxuXHRcdFx0bm9kZSA9IHNlbGYuc2VsZWN0ZWRFbC5nZXQoMCk7XHJcblx0XHRcdG9sZFBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0b2xkTmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0bmV4dCA9IHNlbGYuc2VsZWN0ZWRFbC5wcmV2KCk7XHJcblxyXG5cdFx0XHRpZiAobmV4dC5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0bmV4dC5iZWZvcmUoc2VsZi5zZWxlY3RlZEVsKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzZWxmLnNlbGVjdGVkRWwucGFyZW50KCkuYmVmb3JlKHNlbGYuc2VsZWN0ZWRFbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG5ld1BhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0bmV3TmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0dHlwZTogJ21vdmUnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZSxcclxuXHRcdFx0XHRvbGRQYXJlbnQ6IG9sZFBhcmVudCxcclxuXHRcdFx0XHRuZXdQYXJlbnQ6IG5ld1BhcmVudCxcclxuXHRcdFx0XHRvbGROZXh0U2libGluZzogb2xkTmV4dFNpYmxpbmcsXHJcblx0XHRcdFx0bmV3TmV4dFNpYmxpbmc6IG5ld05leHRTaWJsaW5nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNjbG9uZS1ib3hcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0Y2xvbmUgPSBzZWxmLnNlbGVjdGVkRWwuY2xvbmUoKTtcclxuXHJcblx0XHRcdHNlbGYuc2VsZWN0ZWRFbC5hZnRlcihjbG9uZSk7XHJcblxyXG5cdFx0XHRzZWxmLnNlbGVjdGVkRWwgPSBjbG9uZS5jbGljaygpO1xyXG5cclxuXHRcdFx0bm9kZSA9IGNsb25lLmdldCgwKTtcclxuXHRcdFx0VnZ2ZWIuVW5kby5hZGRNdXRhdGlvbih7XHJcblx0XHRcdFx0dHlwZTogJ2NoaWxkTGlzdCcsXHJcblx0XHRcdFx0dGFyZ2V0OiBub2RlLnBhcmVudE5vZGUsXHJcblx0XHRcdFx0YWRkZWROb2RlczogW25vZGVdLFxyXG5cdFx0XHRcdG5leHRTaWJsaW5nOiBub2RlLm5leHRTaWJsaW5nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNwYXJlbnQtYm94XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5zZWxlY3RlZEVsLnBhcmVudCgpLmdldCgwKTtcclxuXHJcblx0XHRcdHNlbGYuc2VsZWN0Tm9kZShub2RlKTtcclxuXHRcdFx0c2VsZi5sb2FkTm9kZUNvbXBvbmVudChub2RlKTtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjZGVsZXRlLWJveFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRqUXVlcnkoXCIjc2VsZWN0LWJveFwiKS5oaWRlKCk7XHJcblxyXG5cdFx0XHRub2RlID0gc2VsZi5zZWxlY3RlZEVsLmdldCgwKTtcclxuXHJcblx0XHRcdFZ2dmViLlVuZG8uYWRkTXV0YXRpb24oe1xyXG5cdFx0XHRcdHR5cGU6ICdjaGlsZExpc3QnLFxyXG5cdFx0XHRcdHRhcmdldDogbm9kZS5wYXJlbnROb2RlLFxyXG5cdFx0XHRcdHJlbW92ZWROb2RlczogW25vZGVdLFxyXG5cdFx0XHRcdG5leHRTaWJsaW5nOiBub2RlLm5leHRTaWJsaW5nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0c2VsZi5zZWxlY3RlZEVsLnJlbW92ZSgpO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0alF1ZXJ5KHdpbmRvdy5GcmFtZVdpbmRvdykub24oXCJzY3JvbGwgcmVzaXplXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuXHRcdFx0aWYgKHNlbGYuc2VsZWN0ZWRFbCkge1xyXG5cdFx0XHRcdG9mZnNldCA9IHNlbGYuc2VsZWN0ZWRFbC5vZmZzZXQoKTtcclxuXHJcblx0XHRcdFx0alF1ZXJ5KFwiI3NlbGVjdC1ib3hcIikuY3NzKFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcInRvcFwiOiBvZmZzZXQudG9wIC0gc2VsZi5mcmFtZURvYy5zY3JvbGxUb3AoKSxcclxuXHRcdFx0XHRcdFx0XCJsZWZ0XCI6IG9mZnNldC5sZWZ0IC0gc2VsZi5mcmFtZURvYy5zY3JvbGxMZWZ0KCksXHJcblx0XHRcdFx0XHRcdFwid2lkdGhcIjogc2VsZi5zZWxlY3RlZEVsLm91dGVyV2lkdGgoKSxcclxuXHRcdFx0XHRcdFx0XCJoZWlnaHRcIjogc2VsZi5zZWxlY3RlZEVsLm91dGVySGVpZ2h0KCksXHJcblx0XHRcdFx0XHRcdC8vXCJkaXNwbGF5XCI6IFwiYmxvY2tcIlxyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoc2VsZi5oaWdobGlnaHRFbCkge1xyXG5cdFx0XHRcdG9mZnNldCA9IHNlbGYuaGlnaGxpZ2h0RWwub2Zmc2V0KCk7XHJcblxyXG5cdFx0XHRcdGpRdWVyeShcIiNoaWdobGlnaHQtYm94XCIpLmNzcyhcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJ0b3BcIjogb2Zmc2V0LnRvcCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsVG9wKCksXHJcblx0XHRcdFx0XHRcdFwibGVmdFwiOiBvZmZzZXQubGVmdCAtIHNlbGYuZnJhbWVEb2Muc2Nyb2xsTGVmdCgpLFxyXG5cdFx0XHRcdFx0XHRcIndpZHRoXCI6IHNlbGYuaGlnaGxpZ2h0RWwub3V0ZXJXaWR0aCgpLFxyXG5cdFx0XHRcdFx0XHRcImhlaWdodFwiOiBzZWxmLmhpZ2hsaWdodEVsLm91dGVySGVpZ2h0KCksXHJcblx0XHRcdFx0XHRcdC8vXCJkaXNwbGF5XCI6IFwiYmxvY2tcIlxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHR9LFxyXG5cclxuXHQvKiBkcmFnIGFuZCBkcm9wICovXHJcblx0X2luaXREcmFnZHJvcDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHNlbGYuaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cdFx0Y29tcG9uZW50ID0ge307XHJcblx0XHQkKCcjY29tcG9uZW50cyB1bCA+IGxpID4gb2wgPiBsaScpLm9uKFwibW91c2Vkb3duIHRvdWNoc3RhcnRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdCR0aGlzID0galF1ZXJ5KHRoaXMpO1xyXG5cclxuXHRcdFx0Ly8gJChcIiNjb21wb25lbnQtY2xvbmVcIikucmVtb3ZlKCk7XHJcblx0XHRcdGNvbXBvbmVudCA9IFZ2dmViLkNvbXBvbmVudHMuZ2V0KCR0aGlzLmRhdGEoXCJ0eXBlXCIpKTtcclxuXHJcblx0XHRcdGlmIChjb21wb25lbnQuZHJhZ0h0bWwpIHtcclxuXHRcdFx0XHRodG1sID0gY29tcG9uZW50LmRyYWdIdG1sO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGh0bWwgPSBjb21wb25lbnQuaHRtbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VsZi5kcmFnRWxlbWVudCA9ICQoaHRtbCk7XHJcblxyXG5cdFx0XHRpZiAoY29tcG9uZW50LmRyYWdTdGFydCkgc2VsZi5kcmFnRWxlbWVudCA9IGNvbXBvbmVudC5kcmFnU3RhcnQoc2VsZi5kcmFnRWxlbWVudCk7XHJcblxyXG5cdFx0XHRzZWxmLmlzRHJhZ2dpbmcgPSB0cnVlO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdCQoJ2JvZHknKS5vbignbW91c2V1cCB0b3VjaGVuZCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRpZiAoc2VsZi5pc0RyYWdnaW5nID09IHRydWUpIHtcclxuXHRcdFx0XHRzZWxmLmlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHRcdFx0XHQvLyAkKFwiI2NvbXBvbmVudC1jbG9uZVwiKS5yZW1vdmUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnYm9keScpLm9uKCdtb3VzZW1vdmUgdG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGlmIChzZWxmLmlzRHJhZ2dpbmcgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdGVsZW1lbnRNb3VzZUlzT3ZlciA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCAtIDYwLCBldmVudC5jbGllbnRZIC0gNDApO1xyXG5cdFx0XHRcdC8vaWYgZHJhZyBlbGVtZW50cyBob3ZlcnMgb3ZlciBpZnJhbWUgc3dpdGNoIHRvIGlmcmFtZSBtb3VzZW92ZXIgaGFuZGxlclx0XHJcblx0XHRcdFx0aWYgKGVsZW1lbnRNb3VzZUlzT3ZlciAmJiBlbGVtZW50TW91c2VJc092ZXIudGFnTmFtZSA9PSAnSUZSQU1FJykge1xyXG5cdFx0XHRcdFx0c2VsZi5mcmFtZUJvZHkudHJpZ2dlcihcIm1vdXNlbW92ZVwiLCBldmVudCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdHNlbGYuc2VsZWN0Tm9kZShmYWxzZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcjY29tcG9uZW50cyB1bCA+IG9sID4gbGkgPiBsaScpLm9uKFwibW91c2V1cCB0b3VjaGVuZFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0c2VsZi5pc0RyYWdnaW5nID0gZmFsc2U7XHJcblx0XHRcdC8vICQoXCIjY29tcG9uZW50LWNsb25lXCIpLnJlbW92ZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdGdldEJlYXV0aWZpZWRIdG1sKCkge1xyXG5cdFx0LypcclxuXHRcdC1JLCAtLWluZGVudC1pbm5lci1odG1sICAgICAgICAgICAgSW5kZW50IDxoZWFkPiBhbmQgPGJvZHk+IHNlY3Rpb25zLiBEZWZhdWx0IGlzIGZhbHNlLlxyXG5cdFx0LVUsIC0tdW5mb3JtYXR0ZWQgICAgICAgICAgICAgICAgICBMaXN0IG9mIHRhZ3MgKGRlZmF1bHRzIHRvIGlubGluZSkgdGhhdCBzaG91bGQgbm90IGJlIHJlZm9ybWF0dGVkXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgdXNlIGVtcHR5IGFycmF5IHRvIGRlbm90ZSB0aGF0IG5vIHRhZ3Mgc2hvdWxkIG5vdCBiZSByZWZvcm1hdHRlZFxyXG5cdFx0ICovXHJcblxyXG5cdFx0Y29uc3QgeyBkb2N0eXBlLCBodG1sIH0gPSB0aGlzLmdldEh0bWwoKTtcclxuXHRcdHJldHVybiBodG1sX2JlYXV0aWZ5KGAke2RvY3R5cGV9XHJcblx0XHRcdFx0XHRcdFx0ICAke3JlbW92ZVVudXNlZFRhZ3MoaHRtbCwgdW51c2VkVGFncyl9YCxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHByZXNlcnZlX25ld2xpbmVzOiBmYWxzZSxcclxuXHRcdFx0XHRpbmRlbnRfaW5uZXJfaHRtbDogdHJ1ZSxcclxuXHRcdFx0XHR1bmZvcm1hdHRlZDogW11cclxuXHRcdFx0fSk7XHJcblx0fSxcclxuXHJcblx0Z2V0SHRtbDogZnVuY3Rpb24gKCkge1xyXG5cdFx0ZG9jID0gd2luZG93LkZyYW1lRG9jdW1lbnQ7XHJcblx0XHRjb25zdCBkb2N0eXBlID0gXCI8IURPQ1RZUEUgXCJcclxuXHRcdFx0KyBkb2MuZG9jdHlwZS5uYW1lXHJcblx0XHRcdCsgKGRvYy5kb2N0eXBlLnB1YmxpY0lkID8gJyBQVUJMSUMgXCInICsgZG9jLmRvY3R5cGUucHVibGljSWQgKyAnXCInIDogJycpXHJcblx0XHRcdCsgKCFkb2MuZG9jdHlwZS5wdWJsaWNJZCAmJiBkb2MuZG9jdHlwZS5zeXN0ZW1JZCA/ICcgU1lTVEVNJyA6ICcnKVxyXG5cdFx0XHQrIChkb2MuZG9jdHlwZS5zeXN0ZW1JZCA/ICcgXCInICsgZG9jLmRvY3R5cGUuc3lzdGVtSWQgKyAnXCInIDogJycpXHJcblx0XHRcdCsgXCI+XFxuXCI7XHJcblx0XHRjb25zdCBodG1sID0gYCR7ZG9jdHlwZX1cclxuXHRcdFx0XHRcdCAgPGh0bWw+XHJcblx0XHRcdFx0XHRcdCAgJHtkb2MuZG9jdW1lbnRFbGVtZW50LmlubmVySFRNTH1cclxuXHRcdFx0XHRcdCAgPC9odG1sPmA7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRkb2N0eXBlLFxyXG5cdFx0XHRodG1sXHJcblx0XHR9O1xyXG5cdH0sXHJcblxyXG5cdHNldEh0bWw6IGZ1bmN0aW9uIChodG1sKSB7XHJcblx0XHQvL3VwZGF0ZSBvbmx5IGJvZHkgdG8gYXZvaWQgYnJlYWtpbmcgaWZyYW1lIGNzcy9qcyByZWxhdGl2ZSBwYXRoc1xyXG5cdFx0c3RhcnQgPSBodG1sLmluZGV4T2YoXCI8Ym9keVwiKTtcclxuXHRcdGVuZCA9IGh0bWwuaW5kZXhPZihcIjwvYm9keVwiKTtcclxuXHJcblx0XHRpZiAoc3RhcnQgPj0gMCAmJiBlbmQgPj0gMCkge1xyXG5cdFx0XHRib2R5ID0gaHRtbC5zbGljZShodG1sLmluZGV4T2YoXCI+XCIsIHN0YXJ0KSArIDEsIGVuZCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRib2R5ID0gaHRtbFxyXG5cdFx0fVxyXG5cclxuXHRcdC8vc2VsZi5mcmFtZUJvZHkuaHRtbChib2R5KTtcclxuXHRcdHdpbmRvdy5GcmFtZURvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gYm9keTtcclxuXHJcblx0XHQvL2JlbG93IG1ldGhvZHMgYnJha2UgZG9jdW1lbnQgcmVsYXRpdmUgY3NzIGFuZCBqcyBwYXRoc1xyXG5cdFx0Ly9yZXR1cm4gc2VsZi5pZnJhbWUub3V0ZXJIVE1MID0gaHRtbDtcclxuXHRcdC8vcmV0dXJuIHNlbGYuZG9jdW1lbnRGcmFtZS5odG1sKGh0bWwpO1xyXG5cdFx0Ly9yZXR1cm4gc2VsZi5kb2N1bWVudEZyYW1lLmF0dHIoXCJzcmNkb2NcIiwgaHRtbCk7XHJcblx0fVxyXG59O1xyXG5cclxuVnZ2ZWIuQ29kZUVkaXRvciA9IHtcclxuXHJcblx0aXNBY3RpdmU6IGZhbHNlLFxyXG5cdG9sZFZhbHVlOiAnJyxcclxuXHRkb2M6IGZhbHNlLFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZG9jKSB7XHJcblx0XHQkKFwiI3Z2dmViLWNvZGUtZWRpdG9yIHRleHRhcmVhXCIpLnZhbChWdnZlYi5CdWlsZGVyLmdldEJlYXV0aWZpZWRIdG1sKCkpO1xyXG5cclxuXHRcdCQoXCIjdnZ2ZWItY29kZS1lZGl0b3IgdGV4dGFyZWFcIikua2V5dXAoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRkZWxheShWdnZlYi5CdWlsZGVyLnNldEh0bWwodGhpcy52YWx1ZSksIDEwMDApO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly9sb2FkIGNvZGUgb24gZG9jdW1lbnQgY2hhbmdlc1xyXG5cdFx0VnZ2ZWIuQnVpbGRlci5mcmFtZUJvZHkub24oXCJ2dnZlYi51bmRvLmFkZCB2dnZlYi51bmRvLnJlc3RvcmVcIiwgZnVuY3Rpb24gKGUpIHsgVnZ2ZWIuQ29kZUVkaXRvci5zZXRWYWx1ZSgpOyB9KTtcclxuXHRcdC8vbG9hZCBjb2RlIHdoZW4gYSBuZXcgdXJsIGlzIGxvYWRlZFxyXG5cdFx0VnZ2ZWIuQnVpbGRlci5kb2N1bWVudEZyYW1lLm9uKFwibG9hZFwiLCBmdW5jdGlvbiAoZSkgeyBWdnZlYi5Db2RlRWRpdG9yLnNldFZhbHVlKCk7IH0pO1xyXG5cclxuXHRcdHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xyXG5cdH0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdGlmICh0aGlzLmlzQWN0aXZlKSB7XHJcblx0XHRcdCQoXCIjdnZ2ZWItY29kZS1lZGl0b3IgdGV4dGFyZWFcIikudmFsKFZ2dmViLkJ1aWxkZXIuZ2V0QmVhdXRpZmllZEh0bWwoKSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZGVzdHJveTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdC8vdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cdH0sXHJcblxyXG5cdHRvZ2dsZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuaXNBY3RpdmUgIT0gdHJ1ZSkge1xyXG5cdFx0XHR0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaW5pdCgpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5kZXN0cm95KCk7XHJcblx0fVxyXG59XHJcblxyXG5sZXQgc2hvd25QYW5lbCwgaGlkZGVuUGFuZWwsIGlzUHJldmlldztcclxuXHJcblZ2dmViLkd1aSA9IHtcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKCkge1xyXG5cdFx0JChcIltkYXRhLXZ2dmViLWFjdGlvbl1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdG9uID0gXCJjbGlja1wiO1xyXG5cdFx0XHRpZiAodGhpcy5kYXRhc2V0LnZ2dmViT24pIG9uID0gdGhpcy5kYXRhc2V0LnZ2dmViT247XHJcblxyXG5cdFx0XHQkKHRoaXMpLm9uKG9uLCBWdnZlYi5HdWlbdGhpcy5kYXRhc2V0LnZ2dmViQWN0aW9uXSk7XHJcblx0XHRcdGlmICh0aGlzLmRhdGFzZXQudnZ2ZWJTaG9ydGN1dCkge1xyXG5cdFx0XHRcdCQoZG9jdW1lbnQpLmJpbmQoJ2tleWRvd24nLCB0aGlzLmRhdGFzZXQudnZ2ZWJTaG9ydGN1dCwgVnZ2ZWIuR3VpW3RoaXMuZGF0YXNldC52dnZlYkFjdGlvbl0pO1xyXG5cdFx0XHRcdCQod2luZG93LkZyYW1lRG9jdW1lbnQsIHdpbmRvdy5GcmFtZVdpbmRvdykuYmluZCgna2V5ZG93bicsIHRoaXMuZGF0YXNldC52dnZlYlNob3J0Y3V0LCBWdnZlYi5HdWlbdGhpcy5kYXRhc2V0LnZ2dmViQWN0aW9uXSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHVuZG86IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmIChWdnZlYi5XeXNpd3lnRWRpdG9yLmlzQWN0aXZlKSB7XHJcblx0XHRcdFZ2dmViLld5c2l3eWdFZGl0b3IudW5kbygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0VnZ2ZWIuVW5kby51bmRvKCk7XHJcblx0XHR9XHJcblx0XHRWdnZlYi5CdWlsZGVyLnNlbGVjdE5vZGUoKTtcclxuXHR9LFxyXG5cclxuXHRyZWRvOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoVnZ2ZWIuV3lzaXd5Z0VkaXRvci5pc0FjdGl2ZSkge1xyXG5cdFx0XHRWdnZlYi5XeXNpd3lnRWRpdG9yLnJlZG8oKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdFZ2dmViLlVuZG8ucmVkbygpO1xyXG5cdFx0fVxyXG5cdFx0VnZ2ZWIuQnVpbGRlci5zZWxlY3ROb2RlKCk7XHJcblx0fSxcclxuXHJcblx0Y2hlY2s6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoJyN0ZXh0YXJlYS1tb2RhbCB0ZXh0YXJlYScpLnZhbChWdnZlYi5CdWlsZGVyLmdldEJlYXV0aWZpZWRIdG1sKCkpO1xyXG5cdFx0JCgnI3RleHRhcmVhLW1vZGFsJykubW9kYWwoKTtcclxuXHR9LFxyXG5cclxuXHR2aWV3cG9ydDogZnVuY3Rpb24gKCkge1xyXG5cdFx0JChcIiNjYW52YXNcIikuYXR0cihcImNsYXNzXCIsIHRoaXMuZGF0YXNldC52aWV3KTtcclxuXHR9LFxyXG5cclxuXHR0b2dnbGVFZGl0b3I6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoXCIjdnZ2ZWItYnVpbGRlclwiKS50b2dnbGVDbGFzcyhcImJvdHRvbS1wYW5lbC1leHBhbmRcIik7XHJcblx0XHRWdnZlYi5Db2RlRWRpdG9yLnRvZ2dsZSgpO1xyXG5cdH0sXHJcblxyXG5cdGRvd25sb2FkKCkge1xyXG5cdFx0ZG93bmxvYWRBc1RleHRGaWxlKCdpbmRleCcsIFZ2dmViLkJ1aWxkZXIuZ2V0QmVhdXRpZmllZEh0bWwoKSk7XHJcblx0fSxcclxuXHJcblx0cHJldmlldzogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCQoJyNsZWZ0LXBhbmVsJykuaXMoJzp2aXNpYmxlJykpIHtcclxuXHRcdFx0c2hvd25QYW5lbCA9ICdsZWZ0LXBhbmVsJztcclxuXHRcdFx0aGlkZGVuUGFuZWwgPSAncmlnaHQtcGFuZWwnO1xyXG5cdFx0XHQkKCcjbGVmdC1wYW5lbCwgI3JpZ2h0LXBhbmVsJykuaGlkZSgpO1xyXG5cdFx0XHRpc1ByZXZpZXcgPSB0cnVlO1xyXG5cdFx0fSBlbHNlIGlmICgkKCcjcmlnaHQtcGFuZWwnKS5pcygnOnZpc2libGUnKSkge1xyXG5cdFx0XHRzaG93blBhbmVsID0gJ3JpZ2h0LXBhbmVsJztcclxuXHRcdFx0aGlkZGVuUGFuZWwgPSAnbGVmdC1wYW5lbCc7XHJcblx0XHRcdCQoJyNsZWZ0LXBhbmVsLCAjcmlnaHQtcGFuZWwnKS5oaWRlKCk7XHJcblx0XHRcdGlzUHJldmlldyA9IHRydWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpc1ByZXZpZXcgPSBmYWxzZTtcclxuXHRcdFx0JChgIyR7c2hvd25QYW5lbH1gKS5zaG93KCk7XHJcblx0XHRcdCQoYCMke2hpZGRlblBhbmVsfWApLmhpZGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHQkKCcjbWVudS1wYW5lbCcpLnRvZ2dsZSgpO1xyXG5cdFx0JChcIiNpZnJhbWUtbGF5ZXJcIikudG9nZ2xlKCk7XHJcblx0XHQkKFwiI3Z2dmViLWJ1aWxkZXJcIikudG9nZ2xlQ2xhc3MoXCJwcmV2aWV3XCIpO1xyXG5cdH0sXHJcblxyXG5cdGZ1bGxzY3JlZW46IGZ1bmN0aW9uICgpIHtcclxuXHRcdGxhdW5jaEZ1bGxTY3JlZW4oZG9jdW1lbnQpOyAvLyB0aGUgd2hvbGUgcGFnZVxyXG5cdH0sXHJcblxyXG5cdGNvbXBvbmVudFNlYXJjaDogZnVuY3Rpb24gKCkge1xyXG5cdFx0c2VhcmNoVGV4dCA9IHRoaXMudmFsdWU7XHJcblxyXG5cdFx0JChcIiNjb21wb25lbnRzLWxpc3QgbGkgb2wgbGlcIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCR0aGlzID0gJCh0aGlzKTtcclxuXHJcblx0XHRcdCR0aGlzLmhpZGUoKTtcclxuXHRcdFx0aWYgKCR0aGlzLmRhdGEoXCJzZWFyY2hcIikuaW5kZXhPZihzZWFyY2hUZXh0KSA+IC0xKSAkdGhpcy5zaG93KCk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRjbGVhckNvbXBvbmVudFNlYXJjaDogZnVuY3Rpb24gKCkge1xyXG5cdFx0JChcIiNjb21wb25lbnQtc2VhcmNoXCIpLnZhbChcIlwiKS5rZXl1cCgpO1xyXG5cdH1cclxufVxyXG5cclxuVnZ2ZWIuRmlsZU1hbmFnZXIgPSB7XHJcblx0dHJlZTogZmFsc2UsXHJcblx0cGFnZXM6IHt9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLnRyZWUgPSAkKFwiI2ZpbGVtYW5hZ2VyIC50cmVlID4gb2xcIikuaHRtbChcIlwiKTtcclxuXHJcblx0XHQkKHRoaXMudHJlZSkub24oXCJjbGlja1wiLCBcImxpW2RhdGEtcGFnZV0gc3BhblwiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAjJHskKHRoaXMpLnBhcmVudHMoJ2xpJykuZGF0YSgncGFnZScpfWA7XHJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuXHRcdFx0Ly8gVnZ2ZWIuRmlsZU1hbmFnZXIubG9hZFBhZ2UoJCh0aGlzKS5wYXJlbnRzKFwibGlcIikuZGF0YShcInBhZ2VcIikpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KVxyXG5cdH0sXHJcblxyXG5cdGdldFBhZ2UobmFtZSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucGFnZXNbbmFtZV07XHJcblx0fSxcclxuXHJcblx0YWRkUGFnZTogZnVuY3Rpb24gKG5hbWUsIHRpdGxlLCB1cmwpIHtcclxuXHJcblx0XHR0aGlzLnBhZ2VzW25hbWVdID0ge1xyXG5cdFx0XHRuYW1lLFxyXG5cdFx0XHR0aXRsZSxcclxuXHRcdFx0dXJsXHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMudHJlZS5hcHBlbmQoXHJcblx0XHRcdHRtcGwoXCJ2dnZlYi1maWxlbWFuYWdlci1wYWdlXCIsIHsgbmFtZSwgdGl0bGUsIHVybCB9KSk7XHJcblx0fSxcclxuXHJcblx0YWRkUGFnZXM6IGZ1bmN0aW9uIChwYWdlcykge1xyXG5cdFx0Zm9yIChwYWdlIGluIHBhZ2VzKSB7XHJcblx0XHRcdHRoaXMuYWRkUGFnZShwYWdlc1twYWdlXVsnbmFtZSddLCBwYWdlc1twYWdlXVsndGl0bGUnXSwgcGFnZXNbcGFnZV1bJ3VybCddKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRhZGRDb21wb25lbnQ6IGZ1bmN0aW9uIChuYW1lLCB1cmwsIHRpdGxlLCBwYWdlKSB7XHJcblx0XHQkKFwiW2RhdGEtcGFnZT0nXCIgKyBwYWdlICsgXCInXSA+IG9sXCIsIHRoaXMudHJlZSkuYXBwZW5kKFxyXG5cdFx0XHR0bXBsKFwidnZ2ZWItZmlsZW1hbmFnZXItY29tcG9uZW50XCIsIHsgbmFtZSwgdXJsLCB0aXRsZSB9KSk7XHJcblx0fSxcclxuXHJcblx0c2hvd0FjdGl2ZShuYW1lKSB7XHJcblx0XHQkKFwiW2RhdGEtcGFnZV1cIiwgdGhpcy50cmVlKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdCQoXCJbZGF0YS1wYWdlPSdcIiArIG5hbWUgKyBcIiddXCIsIHRoaXMudHJlZSkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0fSxcclxuXHJcblx0bG9hZFBhZ2U6IGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0XHQkKFwiW2RhdGEtcGFnZV1cIiwgdGhpcy50cmVlKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdCQoXCJbZGF0YS1wYWdlPSdcIiArIG5hbWUgKyBcIiddXCIsIHRoaXMudHJlZSkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblxyXG5cdFx0VnZ2ZWIuQnVpbGRlci5sb2FkVXJsKHRoaXMucGFnZXNbbmFtZV1bJ3VybCddKTtcclxuXHR9LFxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVnZ2ZWI7IiwiY29uc3QgYWx3YXlzVHJ1ZSA9ICgpID0+IHRydWU7XHJcblxyXG4vLyB0aGlzIHJlZmVycyB0byBodG1sIGVsZW1lbnRcclxuZnVuY3Rpb24gcmVtb3ZlVGFnKHsgbmFtZSwgZmlsdGVyID0gYWx3YXlzVHJ1ZSB9KSB7XHJcbiAgICBBcnJheS5mcm9tKHRoaXMuZ2V0RWxlbWVudHNCeVRhZ05hbWUobmFtZSkpXHJcbiAgICAgICAgLmZpbHRlcihmaWx0ZXIpXHJcbiAgICAgICAgLmZvckVhY2godGFnID0+IHRhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhZykpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVVbnVzZWRUYWdzKGh0bWwsIHRhZ3MpIHtcclxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHRtbCcpO1xyXG4gICAgZWwuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIHRhZ3MuZm9yRWFjaChyZW1vdmVUYWcsIGVsKTtcclxuXHJcbiAgICByZXR1cm4gJChlbCkucHJvcCgnb3V0ZXJIVE1MJyk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHJlbW92ZVVudXNlZFRhZ3MgfTsiLCIvLyBUb2dnbGUgZnVsbHNjcmVlblxyXG5mdW5jdGlvbiBsYXVuY2hGdWxsU2NyZWVuKGRvY3VtZW50KSB7XHJcbiAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC5GdWxsU2NyZWVuRWxlbWVudClcclxuICAgICAgICAgICAgZG9jdW1lbnQuZXhpdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgIC8vbW96aWxsYVx0XHRcclxuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC5tb3pGdWxsU2NyZWVuRWxlbWVudClcclxuICAgICAgICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgLy93ZWJraXRcdCAgXHJcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICAvL2llXHQgIFxyXG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQubXNGdWxsU2NyZWVuRWxlbWVudClcclxuICAgICAgICAgICAgZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgbGF1bmNoRnVsbFNjcmVlbiB9OyIsImZ1bmN0aW9uIGRvd25sb2FkQXNUZXh0RmlsZShmaWxlbmFtZSwgdGV4dCkge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgYGRhdGE6dGV4dC9odG1sO2NoYXJzZXQ9dXRmLTgsJHtlbmNvZGVVUklDb21wb25lbnQodGV4dCl9YCk7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBmaWxlbmFtZSk7XHJcblxyXG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuXHJcbiAgICBlbGVtZW50LmNsaWNrKCk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxufVxyXG5cclxuZXhwb3J0IHsgZG93bmxvYWRBc1RleHRGaWxlIH07IiwiLypcclxuQ29weXJpZ2h0IDIwMTcgWmlhZGluIEdpdmFuXHJcblxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cclxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcblxyXG5odHRwczovL2dpdGh1Yi5jb20vZ2l2YW56L1Z2dmViSnNcclxuKi9cclxuaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5pbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuaW1wb3J0IENoZWNrYm94SW5wdXQgZnJvbSAnLi9DaGVja2JveElucHV0JztcclxuaW1wb3J0IFNlbGVjdElucHV0IGZyb20gJy4vU2VsZWN0SW5wdXQnO1xyXG5pbXBvcnQgTGlua0lucHV0IGZyb20gJy4vTGlua0lucHV0JztcclxuaW1wb3J0IFJhbmdlSW5wdXQgZnJvbSAnLi9SYW5nZUlucHV0JztcclxuaW1wb3J0IE51bWJlcklucHV0IGZyb20gJy4vTnVtYmVySW5wdXQnO1xyXG5pbXBvcnQgQ3NzVW5pdElucHV0IGZyb20gJy4vQ3NzVW5pdElucHV0JztcclxuaW1wb3J0IENvbG9ySW5wdXQgZnJvbSAnLi9Db2xvcklucHV0JztcclxuaW1wb3J0IEZpbGVVcGxvYWRJbnB1dCBmcm9tICcuL0ZpbGVVcGxvYWRJbnB1dCc7XHJcbmltcG9ydCBSYWRpb0lucHV0IGZyb20gJy4vUmFkaW9JbnB1dCc7XHJcbmltcG9ydCBSYWRpb0J1dHRvbklucHV0IGZyb20gJy4vUmFkaW9CdXR0b25JbnB1dCc7XHJcbmltcG9ydCBUb2dnbGVJbnB1dCBmcm9tICcuL1RvZ2dsZUlucHV0JztcclxuaW1wb3J0IFZhbHVlVGV4dElucHV0IGZyb20gJy4vVmFsdWVUZXh0SW5wdXQnO1xyXG5pbXBvcnQgR3JpZExheW91dElucHV0IGZyb20gJy4vR3JpZExheW91dElucHV0JztcclxuaW1wb3J0IFByb2R1Y3RzSW5wdXQgZnJvbSAnLi9Qcm9kdWN0c0lucHV0JztcclxuaW1wb3J0IEdyaWRJbnB1dCBmcm9tICcuL0dyaWRJbnB1dCc7XHJcbmltcG9ydCBUZXh0VmFsdWVJbnB1dCBmcm9tICcuL1RleHRWYWx1ZUlucHV0JztcclxuaW1wb3J0IEJ1dHRvbklucHV0IGZyb20gJy4vQnV0dG9uSW5wdXQnO1xyXG5pbXBvcnQgU2VjdGlvbklucHV0IGZyb20gJy4vU2VjdGlvbklucHV0JztcclxuaW1wb3J0IExpc3RJbnB1dCBmcm9tICcuL0xpc3RJbnB1dCc7XHJcblxyXG5leHBvcnQge1xyXG5cdElucHV0LCBUZXh0SW5wdXQsIENoZWNrYm94SW5wdXQsIFNlbGVjdElucHV0LCBMaW5rSW5wdXQsIFJhbmdlSW5wdXQsIE51bWJlcklucHV0LCBDc3NVbml0SW5wdXQsXHJcblx0UmFkaW9JbnB1dCwgUmFkaW9CdXR0b25JbnB1dCwgVG9nZ2xlSW5wdXQsIFZhbHVlVGV4dElucHV0LCBHcmlkTGF5b3V0SW5wdXQsIFByb2R1Y3RzSW5wdXQsIEdyaWRJbnB1dCxcclxuXHRUZXh0VmFsdWVJbnB1dCwgQnV0dG9uSW5wdXQsIFNlY3Rpb25JbnB1dCwgTGlzdElucHV0LCBDb2xvcklucHV0LCBGaWxlVXBsb2FkSW5wdXRcclxufTsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuXHJcbmNvbnN0IFZhbHVlVGV4dElucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImtleXVwXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZhbHVlVGV4dElucHV0OyIsImltcG9ydCBUZXh0SW5wdXQgZnJvbSAnLi9UZXh0SW5wdXQnO1xyXG5cclxuY29uc3QgVG9nZ2xlSW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQsIG5vZGUpIHtcclxuXHRcdGlmIChldmVudC5kYXRhICYmIGV2ZW50LmRhdGEuZWxlbWVudCkge1xyXG5cdFx0XHRldmVudC5kYXRhLmVsZW1lbnQudHJpZ2dlcigncHJvcGVydHlDaGFuZ2UnLCBbdGhpcy5jaGVja2VkID8gdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlLW9uXCIpIDogdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlLW9mZlwiKSwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidG9nZ2xlXCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRvZ2dsZUlucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFRleHRWYWx1ZUlucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XHRbXCJjbGlja1wiLCBcIm9uQ2hhbmdlXCIsIFwiYnV0dG9uXCIgLyonc2VsZWN0JyovXSxcclxuXHRdLFxyXG5cclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHR2YWx1ZVwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGV4dFZhbHVlSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgU2VsZWN0SW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcbiAgICBldmVudHM6IFtcclxuICAgICAgICBbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcInNlbGVjdFwiXSxcclxuICAgIF0sXHJcblxyXG5cclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAkKCdzZWxlY3QnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKFwic2VsZWN0XCIsIGRhdGEpO1xyXG4gICAgfSxcclxuXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlbGVjdElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFNlY3Rpb25JbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNsaWNrXCIsIFwib25DaGFuZ2VcIiwgXCJidXR0b25cIiAvKidzZWxlY3QnKi9dLFxyXG5cdF0sXHJcblxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInNlY3Rpb25pbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG5cclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IFJhbmdlSW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJyYW5nZWlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhbmdlSW5wdXQ7IiwiaW1wb3J0IFJhZGlvSW5wdXQgZnJvbSAnLi9SYWRpb0lucHV0JztcclxuXHJcbmNvbnN0IFJhZGlvQnV0dG9uSW5wdXQgPSAkLmV4dGVuZCh7fSwgUmFkaW9JbnB1dCwge1xyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKFwicmFkaW9idXR0b25pbnB1dFwiLCBkYXRhKTtcclxuICAgIH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhZGlvQnV0dG9uSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgUmFkaW9JbnB1dCA9ICQuZXh0ZW5kKHt9LCBJbnB1dCwge1xyXG5cclxuXHRvbkNoYW5nZTogZnVuY3Rpb24gKGV2ZW50LCBub2RlKSB7XHJcblxyXG5cdFx0aWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS5lbGVtZW50KSB7XHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt0aGlzLnZhbHVlLCB0aGlzXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XHJcblx0XHRpZiAodmFsdWUpXHJcblx0XHRcdCQoXCJpbnB1dFt2YWx1ZT1cIiArIHZhbHVlICsgXCJdXCIsIHRoaXMuZWxlbWVudCkucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJyYWRpb2lucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhZGlvSW5wdXQ7IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBQcm9kdWN0c0lucHV0ID0gJC5leHRlbmQoe30sIFRleHRJbnB1dCwge1xyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImtleXVwXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RzSW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxudmFyIE51bWJlcklucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwibnVtYmVyaW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTnVtYmVySW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgTGlzdElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJzZWxlY3RcIl0sXHJcblx0XSxcclxuXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ3NlbGVjdCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwibGlzdGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaXN0SW5wdXQ7IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBMaW5rSW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHRdLFxyXG5cclxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwidGV4dGlucHV0XCIsIGRhdGEpO1xyXG5cdH0sXHJcbn1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbmtJbnB1dDsiLCJpbXBvcnQgVGV4dElucHV0IGZyb20gJy4vVGV4dElucHV0JztcclxuXHJcbmNvbnN0IEdyaWRMYXlvdXRJbnB1dCA9ICQuZXh0ZW5kKHt9LCBUZXh0SW5wdXQsIHtcclxuXHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcInRleHRpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHcmlkTGF5b3V0SW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgR3JpZElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblx0ZXZlbnRzOiBbXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcInNlbGVjdFwiIC8qJ3NlbGVjdCcqL10sXHJcblx0XHRbXCJjbGlja1wiLCBcIm9uQ2hhbmdlXCIsIFwiYnV0dG9uXCIgLyonc2VsZWN0JyovXSxcclxuXHRdLFxyXG5cclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnc2VsZWN0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJncmlkXCIsIGRhdGEpO1xyXG5cdH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHcmlkSW5wdXQ7IiwiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBGaWxlVXBsb2FkSW5wdXQgPSAkLmV4dGVuZCh7fSwgVGV4dElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wia2V5dXBcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2lucHV0JywgdGhpcy5lbGVtZW50KS52YWwodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmlsZVVwbG9hZElucHV0O1xyXG4iLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XHJcblxyXG5jb25zdCBUZXh0SW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcbiAgICBldmVudHM6IFtcclxuICAgICAgICBbXCJrZXl1cFwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0IF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh2YWx1ZSk7XHJcblx0fSxcclxuXHRcclxuXHRpbml0OiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJ0ZXh0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxuICB9XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUZXh0SW5wdXQ7IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xyXG5cclxuY29uc3QgQ3NzVW5pdElucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdG51bWJlcjogMCxcclxuXHR1bml0OiBcInB4XCIsXHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpIHtcclxuXHRcdFx0aW5wdXQgPSBldmVudC5kYXRhLmlucHV0O1xyXG5cdFx0XHRpbnB1dFt0aGlzLm5hbWVdID0gdGhpcy52YWx1ZTsvLyB0aGlzLm5hbWUgPSB1bml0IG9yIG51bWJlclx0XHJcblxyXG5cdFx0XHR2YWx1ZSA9IFwiXCI7XHJcblx0XHRcdGlmIChpbnB1dC51bml0ID09IFwiYXV0b1wiKSB7XHJcblx0XHRcdFx0JChldmVudC5kYXRhLmVsZW1lbnQpLmFkZENsYXNzKFwiYXV0b1wiKTtcclxuXHRcdFx0XHR2YWx1ZSA9IGlucHV0LnVuaXQ7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0JChldmVudC5kYXRhLmVsZW1lbnQpLnJlbW92ZUNsYXNzKFwiYXV0b1wiKTtcclxuXHRcdFx0XHR2YWx1ZSA9IGlucHV0Lm51bWJlciArIGlucHV0LnVuaXQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt2YWx1ZSwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJzZWxlY3RcIl0sXHJcblx0XHRbXCJjaGFuZ2VcIiwgXCJvbkNoYW5nZVwiLCBcImlucHV0XCJdLFxyXG5cdF0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdHRoaXMubnVtYmVyID0gcGFyc2VJbnQodmFsdWUpO1xyXG5cdFx0dGhpcy51bml0ID0gdmFsdWUucmVwbGFjZSh0aGlzLm51bWJlciwgJycpO1xyXG5cclxuXHRcdGlmICh0aGlzLnVuaXQgPT0gXCJhdXRvXCIpICQodGhpcy5lbGVtZW50KS5hZGRDbGFzcyhcImF1dG9cIik7XHJcblxyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh0aGlzLm51bWJlcik7XHJcblx0XHQkKCdzZWxlY3QnLCB0aGlzLmVsZW1lbnQpLnZhbCh0aGlzLnVuaXQpO1xyXG5cdH0sXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoXCJjc3N1bml0aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxufVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3NzVW5pdElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IENvbG9ySW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0Ly9odG1sNSBjb2xvciBpbnB1dCBvbmx5IHN1cHBvcnRzIHNldHRpbmcgdmFsdWVzIGFzIGhleCBjb2xvcnMgZXZlbiBpZiB0aGUgcGlja2VyIHJldHVybnMgb25seSByZ2JcclxuXHRyZ2IyaGV4OiBmdW5jdGlvbiAocmdiKSB7XHJcblxyXG5cdFx0cmdiID0gcmdiLm1hdGNoKC9ecmdiYT9bXFxzK10/XFwoW1xccytdPyhcXGQrKVtcXHMrXT8sW1xccytdPyhcXGQrKVtcXHMrXT8sW1xccytdPyhcXGQrKVtcXHMrXT8vaSk7XHJcblxyXG5cdFx0cmV0dXJuIChyZ2IgJiYgcmdiLmxlbmd0aCA9PT0gNCkgPyBcIiNcIiArXHJcblx0XHRcdChcIjBcIiArIHBhcnNlSW50KHJnYlsxXSwgMTApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpICtcclxuXHRcdFx0KFwiMFwiICsgcGFyc2VJbnQocmdiWzJdLCAxMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMikgK1xyXG5cdFx0XHQoXCIwXCIgKyBwYXJzZUludChyZ2JbM10sIDEwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKSA6IHJnYjtcclxuXHR9LFxyXG5cclxuXHRldmVudHM6IFtcclxuXHRcdFtcImNoYW5nZVwiLCBcIm9uQ2hhbmdlXCIsIFwiaW5wdXRcIl0sXHJcblx0XSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0JCgnaW5wdXQnLCB0aGlzLmVsZW1lbnQpLnZhbCh0aGlzLnJnYjJoZXgodmFsdWUpKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwiY29sb3JpbnB1dFwiLCBkYXRhKTtcclxuXHR9LFxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb2xvcklucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IENoZWNrYm94SW5wdXQgPSAkLmV4dGVuZCh7fSwgSW5wdXQsIHtcclxuXHJcblx0b25DaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50LCBub2RlKSB7XHJcblx0XHRcclxuXHRcdGlmIChldmVudC5kYXRhICYmIGV2ZW50LmRhdGEuZWxlbWVudClcclxuXHRcdHtcclxuXHRcdFx0ZXZlbnQuZGF0YS5lbGVtZW50LnRyaWdnZXIoJ3Byb3BlcnR5Q2hhbmdlJywgW3RoaXMuY2hlY2tlZCwgdGhpc10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG4gICAgZXZlbnRzOiBbXHJcbiAgICAgICAgW1wiY2hhbmdlXCIsIFwib25DaGFuZ2VcIiwgXCJpbnB1dFwiXSxcclxuXHQgXSxcclxuXHJcblx0c2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblx0XHQkKCdpbnB1dCcsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cdFxyXG5cdGluaXQ6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlcihcImNoZWNrYm94aW5wdXRcIiwgZGF0YSk7XHJcblx0fSxcclxuICB9XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaGVja2JveElucHV0OyIsImltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcclxuXHJcbmNvbnN0IEJ1dHRvbklucHV0ID0gJC5leHRlbmQoe30sIElucHV0LCB7XHJcblxyXG5cdGV2ZW50czogW1xyXG5cdFx0W1wiY2xpY2tcIiwgXCJvbkNoYW5nZVwiLCBcImJ1dHRvblwiIC8qJ3NlbGVjdCcqL10sXHJcblx0XSxcclxuXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdCQoJ2J1dHRvbicsIHRoaXMuZWxlbWVudCkudmFsKHZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKFwiYnV0dG9uXCIsIGRhdGEpO1xyXG5cdH0sXHJcblxyXG59XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b25JbnB1dDsiLCJjb25zdCBJbnB1dCA9IHtcclxuXHRcclxuXHRpbml0OiBmdW5jdGlvbihuYW1lKSB7XHJcblx0fSxcclxuXHJcblxyXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbihldmVudCwgbm9kZSkge1xyXG5cdFx0XHJcblx0XHRpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLmVsZW1lbnQpXHJcblx0XHR7XHJcblx0XHRcdGV2ZW50LmRhdGEuZWxlbWVudC50cmlnZ2VyKCdwcm9wZXJ0eUNoYW5nZScsIFt0aGlzLnZhbHVlLCB0aGlzXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0cmVuZGVyVGVtcGxhdGU6IGZ1bmN0aW9uKG5hbWUsIGRhdGEpIHtcclxuXHRcdHJldHVybiB0bXBsKFwidnZ2ZWItaW5wdXQtXCIgKyBuYW1lLCBkYXRhKTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uKG5hbWUsIGRhdGEpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQodGhpcy5yZW5kZXJUZW1wbGF0ZShuYW1lLCBkYXRhKSk7XHJcblx0XHRcclxuXHRcdC8vYmluZCBldmVudHNcclxuXHRcdGlmICh0aGlzLmV2ZW50cylcclxuXHRcdGZvciAodmFyIGkgaW4gdGhpcy5ldmVudHMpXHJcblx0XHR7XHJcblx0XHRcdGV2ZW50ID0gdGhpcy5ldmVudHNbaV1bMF07XHJcblx0XHRcdGZ1biA9IHRoaXNbIHRoaXMuZXZlbnRzW2ldWzFdIF07XHJcblx0XHRcdGVsID0gdGhpcy5ldmVudHNbaV1bMl07XHJcblx0XHRcclxuXHRcdFx0dGhpcy5lbGVtZW50Lm9uKGV2ZW50LCBlbCwge2VsZW1lbnQ6IHRoaXMuZWxlbWVudCwgaW5wdXQ6dGhpc30sIGZ1bik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuZWxlbWVudDtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnB1dDsiXX0=
