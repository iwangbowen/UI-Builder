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

function downloadAsTextFile(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', "data:text/html;charset=utf-8," + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
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

			if (property.inputtype == SectionInput) {
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
			if (event.target == moveEvent.target && event.timeStamp - moveEvent.timeStamp < 500) return;

			if (event.target) {
				moveEvent = event;

				self.highlightEl = target = jQuery(event.target);
				offset = target.offset();
				width = target.outerWidth();
				height = target.outerHeight();

				if (self.isDragging) {
					if (self.iconDrag) self.iconDrag.remove();

					parent = self.highlightEl;
					parentOffset = self.dragElement.offset();

					try {
						if (event.originalEvent && offset.left > event.originalEvent.x - 10) {
							if (offset.top > event.originalEvent.y - 10) {
								parent.before(self.dragElement);
							} else {
								parent.prepend(self.dragElement);
								//self.dragElement.prependTo(parent);
							}
						} else {
							if (event.originalEvent && offset.top > event.originalEvent.y - 10) {
								parent.before(self.dragElement);
							} else {
								parent.append(self.dragElement);
								//self.dragElement.appendTo(parent);
							}
						}
					} catch (err) {
						console.log(err);
					}

					self.isDragging == false;
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
				self.selectNode(event.target);
				self.loadNodeComponent(event.target);

				event.preventDefault();
				return false;
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

			$("#component-clone").remove();

			component = Vvveb.Components.get($this.data("type"));

			if (component.dragHtml) {
				html = component.dragHtml;
			} else {
				html = component.html;
			}

			self.dragElement = $(html);

			if (component.dragStart) self.dragElement = component.dragStart(self.dragElement);

			self.isDragging = true;
			self.iconDrag = $this.clone().attr("id", "component-clone").css('position', 'absolute');
			$('body').append(self.iconDrag);
		});

		$('body').on('mouseup touchend', function (event) {
			if (self.iconDrag && self.isDragging == true) {
				self.isDragging = false;
				$("#component-clone").remove();
			}
		});

		$('body').on('mousemove touchmove', function (event) {
			if (self.iconDrag && self.isDragging == true) {
				self.iconDrag.css({ 'left': event.originalEvent.x - 60, 'top': event.originalEvent.y - 30 });

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
			$("#component-clone").remove();
		});
	},

	getBeautifiedHtml: function getBeautifiedHtml() {
		/*
  -I, --indent-inner-html            Indent <head> and <body> sections. Default is false.
  -U, --unformatted                  List of tags (defaults to inline) that should not be reformatted
  								   use empty array to denote that no tags should not be reformatted
   */
		return html_beautify(this.getHtml(), {
			indent_inner_html: true,
			unformatted: []
		});
	},


	getHtml: function getHtml() {
		doc = window.FrameDocument;

		return "<!DOCTYPE " + doc.doctype.name + (doc.doctype.publicId ? ' PUBLIC "' + doc.doctype.publicId + '"' : '') + (!doc.doctype.publicId && doc.doctype.systemId ? ' SYSTEM' : '') + (doc.doctype.systemId ? ' "' + doc.doctype.systemId + '"' : '') + ">\n" + "<html>" + doc.documentElement.innerHTML + "\n</html>";
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
		downloadAsTextFile('index', Vvveb.Builder.getBeautifiedHtml());
	},


	preview: function preview() {
		$("#iframe-layer").toggle();
		$("#vvveb-builder").toggleClass("preview");
	},

	fullscreen: function fullscreen() {
		launchFullScreen(document); // the whole page
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

			Vvveb.FileManager.loadPage($(this).parents("li").data("page"));
			return false;
		});
	},

	addPage: function addPage(name, title, url) {

		this.pages[name] = { title: title, url: url };

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

	loadPage: function loadPage(name) {
		$("[data-page]", this.tree).removeClass("active");
		$("[data-page='" + name + "']", this.tree).addClass("active");

		Vvveb.Builder.loadUrl(this.pages[name]['url']);
	}

	// Toggle fullscreen
};function launchFullScreen(document) {
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

https://github.com/givanz/VvvebJs
*/

/*
https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

childList 				Set to true if additions and removals of the target node's child elements (including text nodes) are to be observed.
attributes 				Set to true if mutations to target's attributes are to be observed.
characterData 			Set to true if mutations to target's data are to be observed.
subtree 				Set to true if mutations to target and target's descendants are to be observed.
attributeOldValue 		Set to true if attributes is set to true and target's attribute value before the mutation needs to be recorded.
characterDataOldValue 	Set to true if characterData is set to true and target's data before the mutation needs to be recorded.
attributeFilter 		Set to an array of attribute local names (without namespace) if not all attribute mutations need to be observed.
*/

/*
MutationRecord.type				 	String 		Returns "attributes" if the mutation was an attribute mutation,
												"characterData" if it was a mutation to a CharacterData node,
												and "childList" if it was a mutation to the tree of nodes.

MutationRecord.target 				Node 		Returns the node the mutation affected, depending on the MutationRecord.type.
												For attributes, it is the element whose attribute changed.
												For characterData, it is the CharacterData node.
												For childList, it is the node whose children changed.

MutationRecord.addedNodes 			NodeList 	Return the nodes added. Will be an empty NodeList if no nodes were added.
MutationRecord.removedNodes 		NodeList 	Return the nodes removed. Will be an empty NodeList if no nodes were removed.
MutationRecord.previousSibling 		Node 		Return the previous sibling of the added or removed nodes, or null.
MutationRecord.nextSibling 			Node 		Return the next sibling of the added or removed nodes, or null.
MutationRecord.attributeName 		String 		Returns the local name of the changed attribute, or null.
MutationRecord.attributeNamespace 	String 		Returns the namespace of the changed attribute, or null.
MutationRecord.oldValue 			String 		The return value depends on the MutationRecord.type.
												For attributes, it is the value of the changed attribute before the change.
												For characterData, it is the data of the changed node before the change.
												For childList, it is null.
*/
Vvveb.Undo = {

	undos: [],
	mutations: [],
	undoIndex: -1,
	enabled: true,
	/*		
 init: function() {
 },
 */
	addMutation: function addMutation(mutation) {
		/*
  	this.mutations.push(mutation);
  	this.undoIndex++;
  */
		Vvveb.Builder.frameBody.trigger("vvveb.undo.add");
		this.mutations.splice(++this.undoIndex, 0, mutation);
	},
	restore: function restore(mutation, undo) {

		switch (mutation.type) {
			case 'childList':

				if (undo == true) {
					addedNodes = mutation.removedNodes;
					removedNodes = mutation.addedNodes;
				} else //redo
					{
						addedNodes = mutation.addedNodes;
						removedNodes = mutation.removedNodes;
					}

				if (addedNodes) for (i in addedNodes) {
					node = addedNodes[i];
					if (mutation.nextSibling) {
						mutation.nextSibling.parentNode.insertBefore(node, mutation.nextSibling);
					} else {
						mutation.target.append(node);
					}
				}

				if (removedNodes) for (i in removedNodes) {
					node = removedNodes[i];
					node.parentNode.removeChild(node);
				}
				break;
			case 'move':
				if (undo == true) {
					parent = mutation.oldParent;
					sibling = mutation.oldNextSibling;
				} else //redo
					{
						parent = mutation.newParent;
						sibling = mutation.newNextSibling;
					}

				if (sibling) {
					sibling.parentNode.insertBefore(mutation.target, sibling);
				} else {
					parent.append(node);
				}
				break;
			case 'characterData':
				mutation.target.innerHTML = undo ? mutation.oldValue : mutation.newValue;
				break;
			case 'attributes':
				value = undo ? mutation.oldValue : mutation.newValue;

				if (value || value === false || value === 0) mutation.target.setAttribute(mutation.attributeName, value);else mutation.target.removeAttribute(mutation.attributeName);

				break;
		}

		Vvveb.Builder.frameBody.trigger("vvveb.undo.restore");
	},
	undo: function undo() {
		if (this.undoIndex >= 0) {
			this.restore(this.mutations[this.undoIndex--], true);
		}
	},
	redo: function redo() {
		if (this.undoIndex < this.mutations.length - 1) {
			this.restore(this.mutations[++this.undoIndex], false);
		}
	},
	hasChanges: function hasChanges() {
		return this.mutations.length;
	}
};

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

https://github.com/givanz/VvvebJs
*/

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

var TextInput = $.extend({}, Input, {

	events: [["keyup", "onChange", "input"]],

	setValue: function setValue(value) {
		$('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textinput", data);
	}
});

var CheckboxInput = $.extend({}, Input, {

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

var SelectInput = $.extend({}, Input, {

	events: [["change", "onChange", "select"]],

	setValue: function setValue(value) {
		$('select', this.element).val(value);
	},

	init: function init(data) {
		return this.render("select", data);
	}

});

var LinkInput = $.extend({}, TextInput, {

	events: [["change", "onChange", "input"]],

	setValue: function setValue(value) {
		$('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textinput", data);
	}
});

var RangeInput = $.extend({}, Input, {

	events: [["change", "onChange", "input"]],

	setValue: function setValue(value) {
		$('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("rangeinput", data);
	}
});

var NumberInput = $.extend({}, Input, {

	events: [["change", "onChange", "input"]],

	setValue: function setValue(value) {
		$('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("numberinput", data);
	}
});

var CssUnitInput = $.extend({}, Input, {

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

var ColorInput = $.extend({}, Input, {

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

var FileUploadInput = $.extend({}, TextInput, {

	events: [["keyup", "onChange", "input"]],

	setValue: function setValue(value) {
		$('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textinput", data);
	}
});

var RadioInput = $.extend({}, Input, {

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

var RadioButtonInput = $.extend({}, RadioInput, {

	init: function init(data) {
		return this.render("radiobuttoninput", data);
	}
});

var ToggleInput = $.extend({}, TextInput, {

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

var ValueTextInput = $.extend({}, TextInput, {

	events: [["keyup", "onChange", "input"]],

	setValue: function setValue(value) {
		$('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textinput", data);
	}
});

var GridLayoutInput = $.extend({}, TextInput, {

	events: [["keyup", "onChange", "input"]],

	setValue: function setValue(value) {
		$('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textinput", data);
	}
});

var ProductsInput = $.extend({}, TextInput, {

	events: [["keyup", "onChange", "input"]],

	setValue: function setValue(value) {
		$('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textinput", data);
	}
});

var GridInput = $.extend({}, Input, {

	events: [["change", "onChange", "select" /*'select'*/], ["click", "onChange", "button" /*'select'*/]],

	setValue: function setValue(value) {
		$('select', this.element).val(value);
	},

	init: function init(data) {
		return this.render("grid", data);
	}

});

var TextValueInput = $.extend({}, Input, {

	events: [["keyup", "onChange", "input"], ["click", "onChange", "button" /*'select'*/]],

	setValue: function setValue(value) {
		$('input', this.element).val(value);
	},

	init: function init(data) {
		return this.render("textvalue", data);
	}

});

var ButtonInput = $.extend({}, Input, {

	events: [["click", "onChange", "button" /*'select'*/]],

	setValue: function setValue(value) {
		$('button', this.element).val(value);
	},

	init: function init(data) {
		return this.render("button", data);
	}

});

var SectionInput = $.extend({}, Input, {

	events: [["click", "onChange", "button" /*'select'*/]],

	setValue: function setValue(value) {
		return false;
	},

	init: function init(data) {
		return this.render("sectioninput", data);
	}

});

var ListInput = $.extend({}, Input, {

	events: [["change", "onChange", "select"]],

	setValue: function setValue(value) {
		$('select', this.element).val(value);
	},

	init: function init(data) {
		return this.render("listinput", data);
	}

});

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

https://github.com/givan/Vvvebjs
*/

bgcolorClasses = ["bg-primary", "bg-secondary", "bg-success", "bg-danger", "bg-warning", "bg-info", "bg-light", "bg-dark", "bg-white"];

bgcolorSelectOptions = [{
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

Vvveb.ComponentsGroup['Bootstrap 4'] = ["html/container", "html/gridrow", "html/button", "html/buttongroup", "html/buttontoolbar", "html/heading", "html/image", "html/jumbotron", "html/alert", "html/card", "html/listgroup", "html/hr", "html/taglabel", "html/badge", "html/progress", "html/navbar", "html/breadcrumbs", "html/pagination", "html/form", "html/textinput", "html/textareainput", "html/selectinput", "html/fileinput", "html/checkbox", "html/radiobutton", "html/table"];

var base_sort = 100; //start sorting for base component from 100 to allow extended properties to be first

Vvveb.Components.add("_base", {
	name: "Element",
	properties: [{
		key: "element_header",
		inputtype: SectionInput,
		name: false,
		sort: base_sort++,
		data: { header: "General" }
	}, {
		name: "Id",
		key: "id",
		htmlAttr: "id",
		sort: base_sort++,
		inline: true,
		col: 6,
		inputtype: TextInput
	}, {
		name: "Class",
		key: "class",
		htmlAttr: "class",
		sort: base_sort++,
		inline: true,
		col: 6,
		inputtype: TextInput
	}]
});

//display
Vvveb.Components.extend("_base", "_base", {
	properties: [{
		key: "display_header",
		inputtype: SectionInput,
		name: false,
		sort: base_sort++,
		data: { header: "Display" }
	}, {
		name: "Display",
		key: "display",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: SelectInput,
		validValues: ["block", "inline", "inline-block", "none"],
		data: {
			options: [{
				value: "block",
				text: "Block"
			}, {
				value: "inline",
				text: "Inline"
			}, {
				value: "inline-block",
				text: "Inline Block"
			}, {
				value: "none",
				text: "none"
			}]
		}
	}, {
		name: "Position",
		key: "position",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: SelectInput,
		validValues: ["static", "fixed", "relative", "absolute"],
		data: {
			options: [{
				value: "static",
				text: "Static"
			}, {
				value: "fixed",
				text: "Fixed"
			}, {
				value: "relative",
				text: "Relative"
			}, {
				value: "absolute",
				text: "Absolute"
			}]
		}
	}, {
		name: "Top",
		key: "top",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		parent: "",
		inputtype: CssUnitInput
	}, {
		name: "Left",
		key: "left",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		parent: "",
		inputtype: CssUnitInput
	}, {
		name: "Bottom",
		key: "bottom",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		parent: "",
		inputtype: CssUnitInput
	}, {
		name: "Right",
		key: "right",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		parent: "",
		inputtype: CssUnitInput
	}, {
		name: "Float",
		key: "float",
		htmlAttr: "style",
		sort: base_sort++,
		col: 12,
		inline: true,
		inputtype: RadioButtonInput,
		data: {
			extraclass: "btn-group-sm btn-group-fullwidth",
			options: [{
				value: "none",
				icon: "la la-close",
				//text: "None",
				title: "None",
				checked: true
			}, {
				value: "left",
				//text: "Left",
				title: "Left",
				icon: "la la-align-left",
				checked: false
			}, {
				value: "right",
				//text: "Right",
				title: "Right",
				icon: "la la-align-right",
				checked: false
			}]
		}
	}, {
		name: "Opacity",
		key: "opacity",
		htmlAttr: "style",
		sort: base_sort++,
		col: 12,
		inline: true,
		parent: "",
		inputtype: RangeInput,
		data: {
			max: 1, //max zoom level
			min: 0,
			step: 0.1
		}
	}, {
		name: "Background Color",
		key: "background-color",
		sort: base_sort++,
		col: 6,
		inline: true,
		htmlAttr: "style",
		inputtype: ColorInput
	}, {
		name: "Text Color",
		key: "color",
		sort: base_sort++,
		col: 6,
		inline: true,
		htmlAttr: "style",
		inputtype: ColorInput
	}]
});

//Typography
Vvveb.Components.extend("_base", "_base", {
	properties: [{
		key: "typography_header",
		inputtype: SectionInput,
		name: false,
		sort: base_sort++,
		data: { header: "Typography" }
	}, {
		name: "Font family",
		key: "font-family",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: SelectInput,
		data: {
			options: [{
				value: "",
				text: "Default"
			}, {
				value: "Arial, Helvetica, sans-serif",
				text: "Arial"
			}, {
				value: 'Lucida Sans Unicode", "Lucida Grande", sans-serif',
				text: 'Lucida Grande'
			}, {
				value: 'Palatino Linotype", "Book Antiqua", Palatino, serif',
				text: 'Palatino Linotype'
			}, {
				value: '"Times New Roman", Times, serif',
				text: 'Times New Roman'
			}, {
				value: "Georgia, serif",
				text: "Georgia, serif"
			}, {
				value: "Tahoma, Geneva, sans-serif",
				text: "Tahoma"
			}, {
				value: 'Comic Sans MS, cursive, sans-serif',
				text: 'Comic Sans'
			}, {
				value: 'Verdana, Geneva, sans-serif',
				text: 'Verdana'
			}, {
				value: 'Impact, Charcoal, sans-serif',
				text: 'Impact'
			}, {
				value: 'Arial Black, Gadget, sans-serif',
				text: 'Arial Black'
			}, {
				value: 'Trebuchet MS, Helvetica, sans-serif',
				text: 'Trebuchet'
			}, {
				value: 'Courier New", Courier, monospace',
				text: 'Courier New", Courier, monospace'
			}, {
				value: 'Brush Script MT, sans-serif',
				text: 'Brush Script'
			}]
		}
	}, {
		name: "Font weight",
		key: "font-weight",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: SelectInput,
		data: {
			options: [{
				value: "",
				text: "Default"
			}, {
				value: "100",
				text: "Thin"
			}, {
				value: "200",
				text: "Extra-Light"
			}, {
				value: "300",
				text: "Light"
			}, {
				value: "400",
				text: "Normal"
			}, {
				value: "500",
				text: "Medium"
			}, {
				value: "600",
				text: "Semi-Bold"
			}, {
				value: "700",
				text: "Bold"
			}, {
				value: "800",
				text: "Extra-Bold"
			}, {
				value: "900",
				text: "Ultra-Bold"
			}]
		}
	}, {
		name: "Text align",
		key: "text-align",
		htmlAttr: "style",
		sort: base_sort++,
		col: 12,
		inline: true,
		inputtype: RadioButtonInput,
		data: {
			extraclass: "btn-group-sm btn-group-fullwidth",
			options: [{
				value: "none",
				icon: "la la-close",
				//text: "None",
				title: "None",
				checked: true
			}, {
				value: "left",
				//text: "Left",
				title: "Left",
				icon: "la la-align-left",
				checked: false
			}, {
				value: "center",
				//text: "Center",
				title: "Center",
				icon: "la la-align-center",
				checked: false
			}, {
				value: "right",
				//text: "Right",
				title: "Right",
				icon: "la la-align-right",
				checked: false
			}, {
				value: "justify",
				//text: "justify",
				title: "Justify",
				icon: "la la-align-justify",
				checked: false
			}]
		}
	}, {
		name: "Line height",
		key: "line-height",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: CssUnitInput
	}, {
		name: "Letter spacing",
		key: "letter-spacing",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: CssUnitInput
	}, {
		name: "Text decoration",
		key: "text-decoration-line",
		htmlAttr: "style",
		sort: base_sort++,
		col: 12,
		inline: true,
		inputtype: RadioButtonInput,
		data: {
			extraclass: "btn-group-sm btn-group-fullwidth",
			options: [{
				value: "none",
				icon: "la la-close",
				//text: "None",
				title: "None",
				checked: true
			}, {
				value: "underline",
				//text: "Left",
				title: "underline",
				icon: "la la-long-arrow-down",
				checked: false
			}, {
				value: "overline",
				//text: "Right",
				title: "overline",
				icon: "la la-long-arrow-up",
				checked: false
			}, {
				value: "line-through",
				//text: "Right",
				title: "Line Through",
				icon: "la la-strikethrough",
				checked: false
			}, {
				value: "underline overline",
				//text: "justify",
				title: "Underline Overline",
				icon: "la la-arrows-v",
				checked: false
			}]
		}
	}, {
		name: "Decoration Color",
		key: "text-decoration-color",
		sort: base_sort++,
		col: 6,
		inline: true,
		htmlAttr: "style",
		inputtype: ColorInput
	}, {
		name: "Decoration style",
		key: "text-decoration-style",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: SelectInput,
		data: {
			options: [{
				value: "",
				text: "Default"
			}, {
				value: "solid",
				text: "Solid"
			}, {
				value: "wavy",
				text: "Wavy"
			}, {
				value: "dotted",
				text: "Dotted"
			}, {
				value: "dashed",
				text: "Dashed"
			}, {
				value: "double",
				text: "Double"
			}]
		}
	}]
});

//Size
Vvveb.Components.extend("_base", "_base", {
	properties: [{
		key: "size_header",
		inputtype: SectionInput,
		name: false,
		sort: base_sort++,
		data: { header: "Size", expanded: false }
	}, {
		name: "Width",
		key: "width",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: CssUnitInput
	}, {
		name: "Height",
		key: "height",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: CssUnitInput
	}, {
		name: "Min Width",
		key: "min-width",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: CssUnitInput
	}, {
		name: "Min Height",
		key: "min-height",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: CssUnitInput
	}, {
		name: "Max Width",
		key: "max-width",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: CssUnitInput
	}, {
		name: "Max Height",
		key: "max-height",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: CssUnitInput
	}]
});

//Margin
Vvveb.Components.extend("_base", "_base", {
	properties: [{
		key: "margins_header",
		inputtype: SectionInput,
		name: false,
		sort: base_sort++,
		data: { header: "Margin", expanded: false }
	}, {
		name: "Top",
		key: "margin-top",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: CssUnitInput
	}, {
		name: "Right",
		key: "margin-right",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: CssUnitInput
	}, {
		name: "Bottom",
		key: "margin-bottom",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: CssUnitInput
	}, {
		name: "Left",
		key: "margin-Left",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: CssUnitInput
	}]
});

//Padding
Vvveb.Components.extend("_base", "_base", {
	properties: [{
		key: "paddings_header",
		inputtype: SectionInput,
		name: false,
		sort: base_sort++,
		data: { header: "Padding", expanded: false }
	}, {
		name: "Top",
		key: "padding-top",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: CssUnitInput
	}, {
		name: "Right",
		key: "padding-right",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: CssUnitInput
	}, {
		name: "Bottom",
		key: "padding-bottom",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: CssUnitInput
	}, {
		name: "Left",
		key: "padding-Left",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: CssUnitInput
	}]
});

//Border
Vvveb.Components.extend("_base", "_base", {
	properties: [{
		key: "border_header",
		inputtype: SectionInput,
		name: false,
		sort: base_sort++,
		data: { header: "Border", expanded: false }
	}, {
		name: "Style",
		key: "border-style",
		htmlAttr: "style",
		sort: base_sort++,
		col: 12,
		inline: true,
		inputtype: SelectInput,
		data: {
			options: [{
				value: "",
				text: "Default"
			}, {
				value: "solid",
				text: "Solid"
			}, {
				value: "dotted",
				text: "Dotted"
			}, {
				value: "dashed",
				text: "Dashed"
			}]
		}
	}, {
		name: "Width",
		key: "border-width",
		htmlAttr: "style",
		sort: base_sort++,
		col: 6,
		inline: true,
		inputtype: CssUnitInput
	}, {
		name: "Color",
		key: "border-color",
		sort: base_sort++,
		col: 6,
		inline: true,
		htmlAttr: "style",
		inputtype: ColorInput
	}]
});

Vvveb.Components.extend("_base", "html/container", {
	classes: ["container", "container-fluid"],
	image: "icons/container.svg",
	html: '<div class="container"><div class="m-5">Container</div></div>',
	name: "Container",
	properties: [{
		name: "Type",
		key: "type",
		htmlAttr: "class",
		inputtype: SelectInput,
		validValues: ["container", "container-fluid"],
		data: {
			options: [{
				value: "container",
				text: "Default"
			}, {
				value: "container-fluid",
				text: "Fluid"
			}]
		}
	}, {
		name: "Background",
		key: "background",
		htmlAttr: "class",
		validValues: bgcolorClasses,
		inputtype: SelectInput,
		data: {
			options: bgcolorSelectOptions
		}
	}, {
		name: "Background Color",
		key: "background-color",
		htmlAttr: "style",
		inputtype: ColorInput
	}, {
		name: "Text Color",
		key: "color",
		htmlAttr: "style",
		inputtype: ColorInput
	}]
});

Vvveb.Components.extend("_base", "html/heading", {
	image: "icons/heading.svg",
	name: "Heading",
	nodes: ["h1", "h2", "h3", "h4", "h5", "h6"],
	html: "<h1>Heading</h1>",

	properties: [{
		name: "Size",
		key: "id",
		htmlAttr: "id",
		inputtype: SelectInput,

		onChange: function onChange(node, value) {

			return changeNodeName(node, "h" + value);
		},

		init: function init(node) {
			var regex;
			regex = /H(\d)/.exec(node.nodeName);
			if (regex && regex[1]) {
				return regex[1];
			}
			return 1;
		},

		data: {
			options: [{
				value: "1",
				text: "1"
			}, {
				value: "2",
				text: "2"
			}, {
				value: "3",
				text: "3"
			}, {
				value: "4",
				text: "4"
			}, {
				value: "5",
				text: "5"
			}, {
				value: "6",
				text: "6"
			}]
		}
	}]
});
Vvveb.Components.extend("_base", "html/link", {
	nodes: ["a"],
	name: "Link",
	properties: [{
		name: "Url",
		key: "href",
		htmlAttr: "href",
		inputtype: LinkInput
	}, {
		name: "Target",
		key: "target",
		htmlAttr: "target",
		inputtype: TextInput
	}]
});
Vvveb.Components.extend("_base", "html/image", {
	nodes: ["img"],
	name: "Image",
	html: '<img src="' + Vvveb.baseUrl + 'icons/image.svg" height="128" width="128">',
	/*
 afterDrop: function (node)
 {
 node.attr("src", '');
 return node;
 },*/
	image: "icons/image.svg",
	properties: [{
		name: "Image",
		key: "src",
		htmlAttr: "src",
		inputtype: FileUploadInput
	}, {
		name: "Width",
		key: "width",
		htmlAttr: "width",
		inputtype: TextInput
	}, {
		name: "Height",
		key: "height",
		htmlAttr: "height",
		inputtype: TextInput
	}, {
		name: "Alt",
		key: "alt",
		htmlAttr: "alt",
		inputtype: TextInput
	}]
});
Vvveb.Components.add("html/hr", {
	image: "icons/hr.svg",
	nodes: ["hr"],
	name: "Horizontal Rule",
	html: "<hr>"
});
Vvveb.Components.extend("_base", "html/label", {
	name: "Label",
	nodes: ["label"],
	html: '<label for="">Label</label>',
	properties: [{
		name: "For id",
		htmlAttr: "for",
		key: "for",
		inputtype: TextInput
	}]
});
Vvveb.Components.extend("_base", "html/button", {
	classes: ["btn", "btn-link"],
	name: "Button",
	image: "icons/button.svg",
	html: '<button type="button" class="btn btn-primary">Primary</button>',
	properties: [{
		name: "Link To",
		key: "href",
		htmlAttr: "href",
		inputtype: LinkInput
	}, {
		name: "Type",
		key: "type",
		htmlAttr: "class",
		inputtype: SelectInput,
		validValues: ["btn-default", "btn-primary", "btn-info", "btn-success", "btn-warning", "btn-info", "btn-light", "btn-dark", "btn-outline-primary", "btn-outline-info", "btn-outline-success", "btn-outline-warning", "btn-outline-info", "btn-outline-light", "btn-outline-dark", "btn-link"],
		data: {
			options: [{
				value: "btn-default",
				text: "Default"
			}, {
				value: "btn-primary",
				text: "Primary"
			}, {
				value: "btn btn-info",
				text: "Info"
			}, {
				value: "btn-success",
				text: "Success"
			}, {
				value: "btn-warning",
				text: "Warning"
			}, {
				value: "btn-info",
				text: "Info"
			}, {
				value: "btn-light",
				text: "Light"
			}, {
				value: "btn-dark",
				text: "Dark"
			}, {
				value: "btn-outline-primary",
				text: "Primary outline"
			}, {
				value: "btn btn-outline-info",
				text: "Info outline"
			}, {
				value: "btn-outline-success",
				text: "Success outline"
			}, {
				value: "btn-outline-warning",
				text: "Warning outline"
			}, {
				value: "btn-outline-info",
				text: "Info outline"
			}, {
				value: "btn-outline-light",
				text: "Light outline"
			}, {
				value: "btn-outline-dark",
				text: "Dark outline"
			}, {
				value: "btn-link",
				text: "Link"
			}]
		}
	}, {
		name: "Size",
		key: "size",
		htmlAttr: "class",
		inputtype: SelectInput,
		validValues: ["btn-lg", "btn-sm"],
		data: {
			options: [{
				value: "",
				text: "Default"
			}, {
				value: "btn-lg",
				text: "Large"
			}, {
				value: "btn-sm",
				text: "Small"
			}]
		}
	}, {
		name: "Target",
		key: "target",
		htmlAttr: "target",
		inputtype: TextInput
	}, {
		name: "Disabled",
		key: "disabled",
		htmlAttr: "class",
		inputtype: ToggleInput,
		validValues: ["disabled"],
		data: {
			on: "disabled",
			off: ""
		}
	}]
});
Vvveb.Components.extend("_base", "html/buttongroup", {
	classes: ["btn-group"],
	name: "Button Group",
	image: "icons/button_group.svg",
	html: '<div class="btn-group" role="group" aria-label="Basic example"><button type="button" class="btn btn-secondary">Left</button><button type="button" class="btn btn-secondary">Middle</button> <button type="button" class="btn btn-secondary">Right</button></div>',
	properties: [{
		name: "Size",
		key: "size",
		htmlAttr: "class",
		inputtype: SelectInput,
		validValues: ["btn-group-lg", "btn-group-sm"],
		data: {
			options: [{
				value: "",
				text: "Default"
			}, {
				value: "btn-group-lg",
				text: "Large"
			}, {
				value: "btn-group-sm",
				text: "Small"
			}]
		}
	}, {
		name: "Alignment",
		key: "alignment",
		htmlAttr: "class",
		inputtype: SelectInput,
		validValues: ["btn-group", "btn-group-vertical"],
		data: {
			options: [{
				value: "",
				text: "Default"
			}, {
				value: "btn-group",
				text: "Horizontal"
			}, {
				value: "btn-group-vertical",
				text: "Vertical"
			}]
		}
	}]
});
Vvveb.Components.extend("_base", "html/buttontoolbar", {
	classes: ["btn-toolbar"],
	name: "Button Toolbar",
	image: "icons/button_toolbar.svg",
	html: '<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">\
		  <div class="btn-group mr-2" role="group" aria-label="First group">\
			<button type="button" class="btn btn-secondary">1</button>\
			<button type="button" class="btn btn-secondary">2</button>\
			<button type="button" class="btn btn-secondary">3</button>\
			<button type="button" class="btn btn-secondary">4</button>\
		  </div>\
		  <div class="btn-group mr-2" role="group" aria-label="Second group">\
			<button type="button" class="btn btn-secondary">5</button>\
			<button type="button" class="btn btn-secondary">6</button>\
			<button type="button" class="btn btn-secondary">7</button>\
		  </div>\
		  <div class="btn-group" role="group" aria-label="Third group">\
			<button type="button" class="btn btn-secondary">8</button>\
		  </div>\
		</div>'
});
Vvveb.Components.extend("_base", "html/alert", {
	classes: ["alert"],
	name: "Alert",
	image: "icons/alert.svg",
	html: '<div class="alert alert-warning alert-dismissible fade show" role="alert">\
		  <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
			<span aria-hidden="true">&times;</span>\
		  </button>\
		  <strong>Holy guacamole!</strong> You should check in on some of those fields below.\
		</div>',
	properties: [{
		name: "Type",
		key: "type",
		htmlAttr: "class",
		validValues: ["alert-primary", "alert-secondary", "alert-success", "alert-danger", "alert-warning", "alert-info", "alert-light", "alert-dark"],
		inputtype: SelectInput,
		data: {
			options: [{
				value: "alert-primary",
				text: "Default"
			}, {
				value: "alert-secondary",
				text: "Secondary"
			}, {
				value: "alert-success",
				text: "Success"
			}, {
				value: "alert-danger",
				text: "Danger"
			}, {
				value: "alert-warning",
				text: "Warning"
			}, {
				value: "alert-info",
				text: "Info"
			}, {
				value: "alert-light",
				text: "Light"
			}, {
				value: "alert-dark",
				text: "Dark"
			}]
		}
	}]
});
Vvveb.Components.extend("_base", "html/badge", {
	classes: ["badge"],
	image: "icons/badge.svg",
	name: "Badge",
	html: '<span class="badge badge-primary">Primary badge</span>',
	properties: [{
		name: "Color",
		key: "color",
		htmlAttr: "class",
		validValues: ["badge-primary", "badge-secondary", "badge-success", "badge-danger", "badge-warning", "badge-info", "badge-light", "badge-dark"],
		inputtype: SelectInput,
		data: {
			options: [{
				value: "",
				text: "Default"
			}, {
				value: "badge-primary",
				text: "Primary"
			}, {
				value: "badge-secondary",
				text: "Secondary"
			}, {
				value: "badge-success",
				text: "Success"
			}, {
				value: "badge-warning",
				text: "Warning"
			}, {
				value: "badge-danger",
				text: "Danger"
			}, {
				value: "badge-info",
				text: "Info"
			}, {
				value: "badge-light",
				text: "Light"
			}, {
				value: "badge-dark",
				text: "Dark"
			}]
		}
	}]
});
Vvveb.Components.extend("_base", "html/card", {
	classes: ["card"],
	image: "icons/panel.svg",
	name: "Card",
	html: '<div class="card">\
		  <img class="card-img-top" src="../libs/builder/icons/image.svg" alt="Card image cap" width="128" height="128">\
		  <div class="card-body">\
			<h4 class="card-title">Card title</h4>\
			<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card\'s content.</p>\
			<a href="#" class="btn btn-primary">Go somewhere</a>\
		  </div>\
		</div>'
});
Vvveb.Components.extend("_base", "html/listgroup", {
	name: "List Group",
	image: "icons/list_group.svg",
	classes: ["list-group"],
	html: '<ul class="list-group">\n  <li class="list-group-item">\n    <span class="badge">14</span>\n    Cras justo odio\n  </li>\n  <li class="list-group-item">\n    <span class="badge">2</span>\n    Dapibus ac facilisis in\n  </li>\n  <li class="list-group-item">\n    <span class="badge">1</span>\n    Morbi leo risus\n  </li>\n</ul>'
});
Vvveb.Components.extend("_base", "html/listitem", {
	name: "List Item",
	classes: ["list-group-item"],
	html: '<li class="list-group-item"><span class="badge">14</span> Cras justo odio</li>'
});
Vvveb.Components.extend("_base", "html/breadcrumbs", {
	classes: ["breadcrumb"],
	name: "Breadcrumbs",
	image: "icons/breadcrumbs.svg",
	html: '<ol class="breadcrumb">\
		  <li class="breadcrumb-item active"><a href="#">Home</a></li>\
		  <li class="breadcrumb-item active"><a href="#">Library</a></li>\
		  <li class="breadcrumb-item active">Data 3</li>\
		</ol>'
});
Vvveb.Components.extend("_base", "html/breadcrumbitem", {
	classes: ["breadcrumb-item"],
	name: "Breadcrumb Item",
	html: '<li class="breadcrumb-item"><a href="#">Library</a></li>',
	properties: [{
		name: "Active",
		key: "active",
		htmlAttr: "class",
		validValues: ["", "active"],
		inputtype: ToggleInput,
		data: {
			on: "active",
			off: ""
		}
	}]
});
Vvveb.Components.extend("_base", "html/pagination", {
	classes: ["pagination"],
	name: "Pagination",
	image: "icons/pagination.svg",
	html: '<nav aria-label="Page navigation example">\
	  <ul class="pagination">\
		<li class="page-item"><a class="page-link" href="#">Previous</a></li>\
		<li class="page-item"><a class="page-link" href="#">1</a></li>\
		<li class="page-item"><a class="page-link" href="#">2</a></li>\
		<li class="page-item"><a class="page-link" href="#">3</a></li>\
		<li class="page-item"><a class="page-link" href="#">Next</a></li>\
	  </ul>\
	</nav>',

	properties: [{
		name: "Size",
		key: "size",
		htmlAttr: "class",
		inputtype: SelectInput,
		validValues: ["btn-lg", "btn-sm"],
		data: {
			options: [{
				value: "",
				text: "Default"
			}, {
				value: "btn-lg",
				text: "Large"
			}, {
				value: "btn-sm",
				text: "Small"
			}]
		}
	}, {
		name: "Alignment",
		key: "alignment",
		htmlAttr: "class",
		inputtype: SelectInput,
		validValues: ["justify-content-center", "justify-content-end"],
		data: {
			options: [{
				value: "",
				text: "Default"
			}, {
				value: "justify-content-center",
				text: "Center"
			}, {
				value: "justify-content-end",
				text: "Right"
			}]
		}
	}]
});
Vvveb.Components.extend("_base", "html/pageitem", {
	classes: ["page-item"],
	html: '<li class="page-item"><a class="page-link" href="#">1</a></li>',
	name: "Pagination Item",
	properties: [{
		name: "Link To",
		key: "href",
		htmlAttr: "href",
		child: ".page-link",
		inputtype: TextInput
	}, {
		name: "Disabled",
		key: "disabled",
		htmlAttr: "class",
		validValues: ["disabled"],
		inputtype: ToggleInput,
		data: {
			on: "disabled",
			off: ""
		}
	}]
});
Vvveb.Components.extend("_base", "html/progress", {
	classes: ["progress"],
	name: "Progress Bar",
	image: "icons/progressbar.svg",
	html: '<div class="progress"><div class="progress-bar w-25"></div></div>',
	properties: [{
		name: "Background",
		key: "background",
		htmlAttr: "class",
		validValues: bgcolorClasses,
		inputtype: SelectInput,
		data: {
			options: bgcolorSelectOptions
		}
	}, {
		name: "Progress",
		key: "background",
		child: ".progress-bar",
		htmlAttr: "class",
		validValues: ["", "w-25", "w-50", "w-75", "w-100"],
		inputtype: SelectInput,
		data: {
			options: [{
				value: "",
				text: "None"
			}, {
				value: "w-25",
				text: "25%"
			}, {
				value: "w-50",
				text: "50%"
			}, {
				value: "w-75",
				text: "75%"
			}, {
				value: "w-100",
				text: "100%"
			}]
		}
	}, {
		name: "Progress background",
		key: "background",
		child: ".progress-bar",
		htmlAttr: "class",
		validValues: bgcolorClasses,
		inputtype: SelectInput,
		data: {
			options: bgcolorSelectOptions
		}
	}, {
		name: "Striped",
		key: "striped",
		child: ".progress-bar",
		htmlAttr: "class",
		validValues: ["", "progress-bar-striped"],
		inputtype: ToggleInput,
		data: {
			on: "progress-bar-striped",
			off: ""
		}
	}, {
		name: "Animated",
		key: "animated",
		child: ".progress-bar",
		htmlAttr: "class",
		validValues: ["", "progress-bar-animated"],
		inputtype: ToggleInput,
		data: {
			on: "progress-bar-animated",
			off: ""
		}
	}]
});
Vvveb.Components.extend("_base", "html/jumbotron", {
	classes: ["jumbotron"],
	image: "icons/jumbotron.svg",
	name: "Jumbotron",
	html: '<div class="jumbotron">\
		  <h1 class="display-3">Hello, world!</h1>\
		  <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>\
		  <hr class="my-4">\
		  <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>\
		  <p class="lead">\
			<a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>\
		  </p>\
		</div>'
});
Vvveb.Components.extend("_base", "html/navbar", {
	classes: ["navbar"],
	image: "icons/navbar.svg",
	name: "Nav Bar",
	html: '<nav class="navbar navbar-expand-lg navbar-light bg-light">\
		  <a class="navbar-brand" href="#">Navbar</a>\
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">\
			<span class="navbar-toggler-icon"></span>\
		  </button>\
		\
		  <div class="collapse navbar-collapse" id="navbarSupportedContent">\
			<ul class="navbar-nav mr-auto">\
			  <li class="nav-item active">\
				<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>\
			  </li>\
			  <li class="nav-item">\
				<a class="nav-link" href="#">Link</a>\
			  </li>\
			  <li class="nav-item">\
				<a class="nav-link disabled" href="#">Disabled</a>\
			  </li>\
			</ul>\
			<form class="form-inline my-2 my-lg-0">\
			  <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">\
			  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>\
			</form>\
		  </div>\
		</nav>',

	properties: [{
		name: "Color theme",
		key: "color",
		htmlAttr: "class",
		validValues: ["navbar-light", "navbar-dark"],
		inputtype: SelectInput,
		data: {
			options: [{
				value: "",
				text: "Default"
			}, {
				value: "navbar-light",
				text: "Light"
			}, {
				value: "navbar-dark",
				text: "Dark"
			}]
		}
	}, {
		name: "Background color",
		key: "background",
		htmlAttr: "class",
		validValues: bgcolorClasses,
		inputtype: SelectInput,
		data: {
			options: bgcolorSelectOptions
		}
	}, {
		name: "Placement",
		key: "placement",
		htmlAttr: "class",
		validValues: ["fixed-top", "fixed-bottom", "sticky-top"],
		inputtype: SelectInput,
		data: {
			options: [{
				value: "",
				text: "Default"
			}, {
				value: "fixed-top",
				text: "Fixed Top"
			}, {
				value: "fixed-bottom",
				text: "Fixed Bottom"
			}, {
				value: "sticky-top",
				text: "Sticky top"
			}]
		}
	}]
});

Vvveb.Components.extend("_base", "html/form", {
	nodes: ["form"],
	image: "icons/form.svg",
	name: "Form",
	html: '<form><div class="form-group"><label>Text</label><input type="text" class="form-control"></div></div></form>',
	properties: [{
		name: "Style",
		key: "style",
		htmlAttr: "class",
		validValues: ["", "form-search", "form-inline", "form-horizontal"],
		inputtype: SelectInput,
		data: {
			options: [{
				value: "",
				text: "Default"
			}, {
				value: "form-search",
				text: "Search"
			}, {
				value: "form-inline",
				text: "Inline"
			}, {
				value: "form-horizontal",
				text: "Horizontal"
			}]
		}
	}, {
		name: "Action",
		key: "action",
		htmlAttr: "action",
		inputtype: TextInput
	}, {
		name: "Method",
		key: "method",
		htmlAttr: "method",
		inputtype: TextInput
	}]
});

Vvveb.Components.extend("_base", "html/textinput", {
	name: "Text Input",
	attributes: { "type": "text" },
	image: "icons/text_input.svg",
	html: '<div class="form-group" style="display: inline-block;"><label>Text</label><input type="text" class="form-control"></div></div>',
	properties: [{
		name: "Value",
		key: "value",
		htmlAttr: "value",
		inputtype: TextInput
	}, {
		name: "Placeholder",
		key: "placeholder",
		htmlAttr: "placeholder",
		inputtype: TextInput
	}]
});

Vvveb.Components.extend("_base", "html/selectinput", {
	nodes: ["select"],
	name: "Select Input",
	image: "icons/select_input.svg",
	html: '<div class="form-group"><label>Choose an option </label><select class="form-control"><option value="value1">Text 1</option><option value="value2">Text 2</option><option value="value3">Text 3</option></select></div>',

	beforeInit: function beforeInit(node) {
		properties = [];
		var i = 0;

		$(node).find('option').each(function () {

			data = { "value": this.value, "text": this.text };

			i++;
			properties.push({
				name: "Option " + i,
				key: "option" + i,
				//index: i - 1,
				optionNode: this,
				inputtype: TextValueInput,
				data: data,
				onChange: function onChange(node, value, input) {

					option = $(this.optionNode);

					//if remove button is clicked remove option and render row properties
					if (input.nodeName == 'BUTTON') {
						option.remove();
						Vvveb.Components.render("html/selectinput");
						return node;
					}

					if (input.name == "value") option.attr("value", value);else if (input.name == "text") option.text(value);

					return node;
				}
			});
		});

		//remove all option properties
		this.properties = this.properties.filter(function (item) {
			return item.key.indexOf("option") === -1;
		});

		//add remaining properties to generated column properties
		properties.push(this.properties[0]);

		this.properties = properties;
		return node;
	},

	properties: [{
		name: "Option",
		key: "option1",
		inputtype: TextValueInput
	}, {
		name: "Option",
		key: "option2",
		inputtype: TextValueInput
	}, {
		name: "",
		key: "addChild",
		inputtype: ButtonInput,
		data: { text: "Add option" },
		onChange: function onChange(node) {
			$(node).append('<option value="value">Text</option>');

			//render component properties again to include the new column inputs
			Vvveb.Components.render("html/selectinput");

			return node;
		}
	}]
});
Vvveb.Components.extend("_base", "html/textareainput", {
	name: "Text Area",
	image: "icons/text_area.svg",
	html: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>'
});
Vvveb.Components.extend("_base", "html/radiobutton", {
	name: "Radio Button",
	attributes: { "type": "radio" },
	image: "icons/radio.svg",
	html: '<label class="radio"><input type="radio"> Radio</label>',
	properties: [{
		name: "Name",
		key: "name",
		htmlAttr: "name",
		inputtype: TextInput
	}]
});
Vvveb.Components.extend("_base", "html/checkbox", {
	name: "Checkbox",
	attributes: { "type": "checkbox" },
	image: "icons/checkbox.svg",
	html: '<label class="checkbox"><input type="checkbox"> Checkbox</label>',
	properties: [{
		name: "Name",
		key: "name",
		htmlAttr: "name",
		inputtype: TextInput
	}]
});
Vvveb.Components.extend("_base", "html/fileinput", {
	name: "Input group",
	attributes: { "type": "file" },
	image: "icons/text_input.svg",
	html: '<div class="form-group">\
			  <input type="file" class="form-control">\
			</div>'
});
Vvveb.Components.extend("_base", "html/table", {
	nodes: ["table"],
	classes: ["table"],
	image: "icons/table.svg",
	name: "Table",
	html: '<table class="table">\
		  <thead>\
			<tr>\
			  <th>#</th>\
			  <th>First Name</th>\
			  <th>Last Name</th>\
			  <th>Username</th>\
			</tr>\
		  </thead>\
		  <tbody>\
			<tr>\
			  <th scope="row">1</th>\
			  <td>Mark</td>\
			  <td>Otto</td>\
			  <td>@mdo</td>\
			</tr>\
			<tr>\
			  <th scope="row">2</th>\
			  <td>Jacob</td>\
			  <td>Thornton</td>\
			  <td>@fat</td>\
			</tr>\
			<tr>\
			  <th scope="row">3</th>\
			  <td>Larry</td>\
			  <td>the Bird</td>\
			  <td>@twitter</td>\
			</tr>\
		  </tbody>\
		</table>',
	properties: [{
		name: "Type",
		key: "type",
		htmlAttr: "class",
		validValues: ["table-primary", "table-secondary", "table-success", "table-danger", "table-warning", "table-info", "table-light", "table-dark", "table-white"],
		inputtype: SelectInput,
		data: {
			options: [{
				value: "Default",
				text: ""
			}, {
				value: "table-primary",
				text: "Primary"
			}, {
				value: "table-secondary",
				text: "Secondary"
			}, {
				value: "table-success",
				text: "Success"
			}, {
				value: "table-danger",
				text: "Danger"
			}, {
				value: "table-warning",
				text: "Warning"
			}, {
				value: "table-info",
				text: "Info"
			}, {
				value: "table-light",
				text: "Light"
			}, {
				value: "table-dark",
				text: "Dark"
			}, {
				value: "table-white",
				text: "White"
			}]
		}
	}, {
		name: "Responsive",
		key: "responsive",
		htmlAttr: "class",
		validValues: ["table-responsive"],
		inputtype: ToggleInput,
		data: {
			on: "table-responsive",
			off: ""
		}
	}, {
		name: "Small",
		key: "small",
		htmlAttr: "class",
		validValues: ["table-sm"],
		inputtype: ToggleInput,
		data: {
			on: "table-sm",
			off: ""
		}
	}, {
		name: "Hover",
		key: "hover",
		htmlAttr: "class",
		validValues: ["table-hover"],
		inputtype: ToggleInput,
		data: {
			on: "table-hover",
			off: ""
		}
	}, {
		name: "Bordered",
		key: "bordered",
		htmlAttr: "class",
		validValues: ["table-bordered"],
		inputtype: ToggleInput,
		data: {
			on: "table-bordered",
			off: ""
		}
	}, {
		name: "Striped",
		key: "striped",
		htmlAttr: "class",
		validValues: ["table-striped"],
		inputtype: ToggleInput,
		data: {
			on: "table-striped",
			off: ""
		}
	}, {
		name: "Inverse",
		key: "inverse",
		htmlAttr: "class",
		validValues: ["table-inverse"],
		inputtype: ToggleInput,
		data: {
			on: "table-inverse",
			off: ""
		}
	}, {
		name: "Head options",
		key: "head",
		htmlAttr: "class",
		child: "thead",
		inputtype: SelectInput,
		validValues: ["", "thead-inverse", "thead-default"],
		data: {
			options: [{
				value: "",
				text: "None"
			}, {
				value: "thead-default",
				text: "Default"
			}, {
				value: "thead-inverse",
				text: "Inverse"
			}]
		}
	}]
});
Vvveb.Components.extend("_base", "html/tablerow", {
	nodes: ["tr"],
	name: "Table Row",
	html: "<tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr>",
	properties: [{
		name: "Type",
		key: "type",
		htmlAttr: "class",
		inputtype: SelectInput,
		validValues: ["", "success", "danger", "warning", "active"],
		data: {
			options: [{
				value: "",
				text: "Default"
			}, {
				value: "success",
				text: "Success"
			}, {
				value: "error",
				text: "Error"
			}, {
				value: "warning",
				text: "Warning"
			}, {
				value: "active",
				text: "Active"
			}]
		}
	}]
});
Vvveb.Components.extend("_base", "html/tablecell", {
	nodes: ["td"],
	name: "Table Cell",
	html: "<td>Cell</td>"
});
Vvveb.Components.extend("_base", "html/tableheadercell", {
	nodes: ["th"],
	name: "Table Header Cell",
	html: "<th>Head</th>"
});
Vvveb.Components.extend("_base", "html/tablehead", {
	nodes: ["thead"],
	name: "Table Head",
	html: "<thead><tr><th>Head 1</th><th>Head 2</th><th>Head 3</th></tr></thead>",
	properties: [{
		name: "Type",
		key: "type",
		htmlAttr: "class",
		inputtype: SelectInput,
		validValues: ["", "success", "danger", "warning", "info"],
		data: {
			options: [{
				value: "",
				text: "Default"
			}, {
				value: "success",
				text: "Success"
			}, {
				value: "anger",
				text: "Error"
			}, {
				value: "warning",
				text: "Warning"
			}, {
				value: "info",
				text: "Info"
			}]
		}
	}]
});
Vvveb.Components.extend("_base", "html/tablebody", {
	nodes: ["tbody"],
	name: "Table Body",
	html: "<tbody><tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr></tbody>"
});

Vvveb.Components.add("html/gridcolumn", {
	name: "Grid Column",
	image: "icons/grid_row.svg",
	classesRegex: ["col-"],
	html: '<div class="col-sm-4"><h3>col-sm-4</h3></div>',
	properties: [{
		name: "Column",
		key: "column",
		inputtype: GridInput,
		data: { hide_remove: true },

		beforeInit: function beforeInit(node) {
			_class = $(node).attr("class");

			var reg = /col-([^-\$ ]*)?-?(\d+)/g;
			var match;

			while ((match = reg.exec(_class)) != null) {
				this.data["col" + (match[1] != undefined ? "_" + match[1] : "")] = match[2];
			}
		},

		onChange: function onChange(node, value, input) {
			_class = node.attr("class");

			//remove previous breakpoint column size
			_class = _class.replace(new RegExp(input.name + '-\\d+?'), '');
			//add new column size
			if (value) _class += ' ' + input.name + '-' + value;
			node.attr("class", _class);

			return node;
		}
	}]
});
Vvveb.Components.add("html/gridrow", {
	name: "Grid Row",
	image: "icons/grid_row.svg",
	classes: ["row"],
	html: '<div class="row drag-n-drop-padding"><div class="col-sm-4"><h3>col-sm-4</h3></div><div class="col-sm-4 col-5"><h3>col-sm-4</h3></div><div class="col-sm-4"><h3>col-sm-4</h3></div></div>',

	beforeInit: function beforeInit(node) {
		properties = [];
		var i = 0;
		var j = 0;

		$(node).find('[class*="col-"]').each(function () {
			_class = $(this).attr("class");

			var reg = /col-([^-\$ ]*)?-?(\d+)/g;
			var match;
			data = {};

			while ((match = reg.exec(_class)) != null) {
				data["col" + (match[1] != undefined ? "_" + match[1] : "")] = match[2];
			}

			i++;
			properties.push({
				name: "Column " + i,
				key: "column" + i,
				//index: i - 1,
				columnNode: this,
				inline: true,
				inputtype: GridInput,
				data: data,
				onChange: function onChange(node, value, input) {

					//column = $('[class*="col-"]:eq(' + this.index + ')', node);
					column = $(this.columnNode);

					//if remove button is clicked remove column and render row properties
					if (input.nodeName == 'BUTTON') {
						column.remove();
						Vvveb.Components.render("html/gridrow");
						return node;
					}

					//if select input then change column class
					_class = column.attr("class");

					//remove previous breakpoint column size
					_class = _class.replace(new RegExp(input.name + '-\\d+?'), '');
					//add new column size
					if (value) _class += ' ' + input.name + '-' + value;
					column.attr("class", _class);

					//console.log(this, node, value, input, input.name);

					return node;
				}
			});
		});

		//remove all column properties
		this.properties = this.properties.filter(function (item) {
			return item.key.indexOf("column") === -1;
		});

		//add remaining properties to generated column properties
		properties.push(this.properties[0]);

		this.properties = properties;
		return node;
	},

	properties: [{
		name: "Column",
		key: "column1",
		inputtype: GridInput
	}, {
		name: "Column",
		key: "column1",
		inline: true,
		col: 12,
		inputtype: GridInput
	}, {
		name: "",
		key: "addChild",
		inputtype: ButtonInput,
		data: { text: "Add column" },
		onChange: function onChange(node) {
			$(node).append('<div class="col-3">Col-3</div>');

			//render component properties again to include the new column inputs
			Vvveb.Components.render("html/gridrow");

			return node;
		}
	}]
});
//# sourceMappingURL=built.js.map
