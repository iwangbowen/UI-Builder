import { SectionInput } from './inputs/inputs';
import { dataComponentId } from './components/common'
import { replaceOtherShowingCalendarInputs } from './util/dataAttr';
import {
	getStyle, launchFullScreen, downloadAsTextFile, getBeautifiedHtml, getSelectedElements,
	clearSelectedElements, addOrRemoveElement, highlightWhenHovering, highlightwhenSelected,
	getElementWithDraggable, bottomAlignCallback, topAlignCallback, leftAlignCallback, rightAlignCallback,
	middleAlignCallback, centerAlignCallback
} from './util/dom';
import { importedPageName, defaultFilename } from './constants';
import { noneditableSelector, getParentOrSelf, selectBox } from './util/selectors';
import tmpl from './util/tmpl';
import _ from 'lodash';
import 'core-js/es6/promise';

window.tmpl = tmpl;
window.getSelectedElements = getSelectedElements;
window.getElementWithDraggable = getElementWithDraggable;

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
	init(url) {
	},
	get(type) {
		return this._components[type];
	},
	add(type, data) {
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
						data.attributes[i].forEach(value => {
							this._attributesLookup[i][value] = data;
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
	extend(inheritType, type, data) {
		newData = data;

		if (inheritData = this._components[inheritType]) {
			newData = $.extend(true, {}, inheritData, data);
			newData.properties = $.merge($.merge([], inheritData.properties ? inheritData.properties : []), data.properties ? data.properties : []);
		}

		//sort by order
		newData.properties.sort(function (a, b) {
			if (typeof a.sort === "undefined") a.sort = 0;
			if (typeof b.sort === "undefined") b.sort = 0;

			if (a.sort < b.sort)
				return -1;
			if (a.sort > b.sort)
				return 1;
			return 0;
		});
		this.add(type, newData);
	},
	matchNode(node) {
		if ($(node).attr(dataComponentId) && this._components[$(node).attr(dataComponentId)]) {
			return this._components[$(node).attr(dataComponentId)];
		} else if ($(node).attr('type') == 'radio' || $(node).attr('type') == 'checkbox') {
			const $parent = $(node).parent();
			if ($parent.attr(dataComponentId) && this._components[$parent.attr(dataComponentId)]) {
				return this._components[$parent.attr(dataComponentId)]
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
					} else
						return component;
				}
			}

			for (var i in node.attributes) {
				attr = node.attributes[i].name;
				value = node.attributes[i].value;

				//check for node classes
				if (attr == "class") {
					classes = value.split(" ");

					for (j in classes) {
						if (classes[j] in this._classesLookup)
							return this._classesLookup[classes[j]];
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
	render(type) {
		component = this._components[type];

		rightPanel = jQuery("#right-panel #component-properties");
		section = rightPanel.find('.section[data-section="default"]');

		if (!(Vvveb.preservePropertySections && section.length)) {
			rightPanel.html('').append(tmpl("inputsectioninput", { key: "default", header: component.name }));
			section = rightPanel.find(".section");
		}

		rightPanel.find('[data-header="default"] span').html(component.name);
		section.html("")

		if (component.beforeInit) component.beforeInit(Vvveb.Builder.selectedEl.get(0));

		fn = function (component, property) {
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
					}
					else if (property.htmlAttr == "style") {
						element = element.css(property.key, value);
					}
					else if (property.noValueAttr) {
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

			if (property.beforeInit) property.beforeInit(element.get(0))

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
					value = getStyle(element.get(0), property.key);//getStyle returns declared style
				} else {
					value = element.attr(property.htmlAttr);
				}

				//if attribute is class check if one of valid values is included as class to set the select
				if (value && property.htmlAttr == "class" && property.validValues) {
					value = value.split(" ").filter(function (el) {
						return property.validValues.indexOf(el) != -1
					});
				}

				if (property.noValueAttr) {
					value = element.attr(property.htmlAttr) ? property.validValues : [];
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
			}
			else {
				row = $(tmpl('property', property));
				row.find('.input').append(property.input);

				property.inputtype.afterAppend && property.inputtype.afterAppend(property.input, element);

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
	init(doc) {
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
	undo(element) {
		this.doc.execCommand('undo', false, null);
	},
	redo(element) {
		this.doc.execCommand('redo', false, null);
	},
	edit(element) {
		$("#wysiwyg-editor").show();
		this.element = element;
		this.isActive = true;
		this.oldValue = element.html();
	},
	destroy(element) {
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
}

Vvveb.Builder = {
	dragMoveMutation: false,
	init(url, srcdoc, callback) {
		this.loadControlGroups();

		this.selectedEl = null;
		this.highlightEl = null;
		this.initCallback = callback;

		this.documentFrame = $("#iframe-wrapper > iframe");
		this.canvas = $("#canvas");

		this._loadIframe(url, srcdoc);

		this._initDragdrop();

		this.dragElement = null;
	},
	/* controls */
	loadControlGroups() {
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
					const item = $('<li data-section="' + group + '" data-type="' + componentType + '" data-search="' + component.name.toLowerCase() + '"><a href="#">' + component.name + "</a></li>");
					if (component.image) {
						item.css({
							backgroundImage: "url(" + 'libs/builder/' + component.image + ")",
							backgroundRepeat: "no-repeat"
						})
					}
					componentsSubList.append(item);
				}
			}
		}
	},
	loadUrl(url) {
		jQuery(selectBox).hide();
		this.iframe.src = url;
	},
	/* iframe */
	_loadIframe(url, srcdoc) {
		this.iframe = this.documentFrame.get(0);
		if (srcdoc) {
			const iframeDocument = this.iframe.contentWindow.document;
			iframeDocument.open('text/html', 'replace');
			iframeDocument.write(srcdoc);
			iframeDocument.close();
		} else {
			this.iframe.src = `${window.location.origin}/${url}`;
		}
		const _this = this;
		return this.documentFrame.on("load", function () {
			window.FrameWindow = _this.iframe.contentWindow;
			window.FrameDocument = _this.iframe.contentWindow.document;

			Vvveb.WysiwygEditor.init(window.FrameDocument);
			_this.initCallback && _this.initCallback();
			return _this._frameLoaded();
		});
	},
	_frameLoaded() {

		this.frameDoc = $(window.FrameDocument);
		this.frameHtml = $(window.FrameDocument).find("html");
		this.frameBody = $(window.FrameDocument).find('body');

		this._initHightlight();
	},
	_getElementType(el) {
		//search for component attribute
		componentName = '';
		if (el.attributes)
			for (var j = 0; j < el.attributes.length; j++) {

				if (el.attributes[j].nodeName.indexOf('data-component') > -1) {
					componentName = el.attributes[j].nodeName.replace('data-component-', '');
				}
			}

		if (componentName != '') return componentName;

		if (el.attributes)
			for (var j = 0; j < el.attributes.length; j++) {
				if (el.attributes[j].nodeName.indexOf('data-component') > -1) {
					componentName = el.attributes[j].nodeName.replace('data-component-', '');
				}
			}

		if (componentName != '') return componentName;
		//if (className) return componentName;
		return el.tagName;
	},
	loadNodeComponent(node) {
		data = Vvveb.Components.matchNode(node);
		if (data) Vvveb.Components.render(data.type);
	},
	selectNode(node = false, ctrlKeyPressed = false) {
		if (!node) {
			jQuery(selectBox).hide();
			return;
		}
		if (this.texteditEl && this.selectedEl.get(0) != node) {
			Vvveb.WysiwygEditor.destroy(this.texteditEl);
			jQuery(selectBox).removeClass("text-edit").find("#select-actions").show();
			this.texteditEl = null;
		}
		this.selectedEl = target = jQuery(node);
		highlightwhenSelected(node, ctrlKeyPressed);
	},
	/* iframe highlight */
	_initHightlight() {
		moveEvent = { target: null, };
		const _this = this;
		this.frameBody.on("mousemove touchmove", function (event) {
			//delay for half a second if dragging over same element
			// if (event.target == moveEvent.target && ((event.timeStamp - moveEvent.timeStamp) < 500)) return;
			if (event.target) {
				moveEvent = event;

				_this.highlightEl = target = jQuery(event.target);
				offset = target.offset();
				width = target.outerWidth();
				height = target.outerHeight();

				if (_this.isDragging) {
					_this.dragElement.css({
						display: 'none'
					});
					parent = _this.highlightEl;
					parentOffset = _this.dragElement.offset();
					// try {
					// 	_this.dragElement.css({
					// 		display: 'none'
					// 	});
					// 	if (event.originalEvent && (offset.left > (event.originalEvent.x - 10))) {
					// 		if (offset.top > (event.originalEvent.y - 10)) {
					// 			parent.before(_this.dragElement);
					// 		} else {
					// 			parent.prepend(_this.dragElement);
					// 			_this.dragElement.prependTo(parent);
					// 		}
					// 	} else {
					// 		if (event.originalEvent && offset.top > ((event.originalEvent.y - 10))) {
					// 			parent.before(_this.dragElement);
					// 		} else {
					// 			parent.append(_this.dragElement);
					// 			_this.dragElement.appendTo(parent);
					// 		}
					// 	}
					// } catch (err) {
					// 	console.log(err);
					// }
				} else {
					if (!event.ctrlKey) {
						highlightWhenHovering(event.target);
					}
				}
			}
		});

		this.frameBody.on("mouseup touchend", function (event) {
			if (_this.isDragging) {
				_this.isDragging = false;

				if (component.dragHtml) //if dragHtml is set for dragging then set real component html
				{
					newElement = $(component.html);
					_this.dragElement.replaceWith(newElement);
					_this.dragElement = newElement;
				}
				if (component.afterDrop) _this.dragElement = component.afterDrop(_this.dragElement);

				node = _this.dragElement.get(0);
				_this.selectNode(node);
				_this.loadNodeComponent(node);

				if (_this.dragMoveMutation === false) {
					Vvveb.Undo.addMutation({
						type: 'childList',
						target: node.parentNode,
						addedNodes: [node],
						nextSibling: node.nextSibling
					});
				} else {
					_this.dragMoveMutation.newParent = node.parentNode;
					_this.dragMoveMutation.newNextSibling = node.nextSibling;

					Vvveb.Undo.addMutation(_this.dragMoveMutation);
					_this.dragMoveMutation = false;
				}
			}
		});

		this.frameBody.on("dblclick", function (event) {
			replaceOtherShowingCalendarInputs(event.target, _this.frameBody);

			_this.texteditEl = target = jQuery(event.target);
			Vvveb.WysiwygEditor.edit(_this.texteditEl);
			if (!_this.texteditEl.parents(noneditableSelector).length) {
				_this.texteditEl.attr({ 'contenteditable': true, 'spellcheckker': false });
			}
			_this.texteditEl.on("blur keyup paste input", function (event) {
				jQuery(selectBox).css({
					"width": _this.texteditEl.outerWidth(),
					"height": _this.texteditEl.outerHeight()
				});
			});

			jQuery(selectBox).addClass("text-edit").find("#select-actions").hide();
			jQuery("#highlight-box").hide();
		});

		this.frameBody.on("click", function (event) {
			$(document.getElementById('iframeId').contentWindow.document)
				.find('.horizontal-line, .vertical-line')
				.hide();
			if (!($(event.target).hasClass('horizontal-line') || $(event.target).hasClass('vertical-line'))) {
				replaceOtherShowingCalendarInputs(event.target, _this.frameBody);
				if (event.target) {
					if (event.ctrlKey) {
						addOrRemoveElement(event.target);
					} else {
						clearSelectedElements();
					}

					const node = getParentOrSelf(event.target);
					if (!isPreview && !$('#attribute-settings').hasClass('active')) {
						$('#attribute-settings')
							.addClass('active')
							.siblings()
							.removeClass('active');
						$('#left-panel').hide();
						$('#right-panel').show();
					}

					_this.selectNode(node, event.ctrlKey);
					_this.loadNodeComponent(node);

					event.preventDefault();
					return false;
				}
			}
		});

		this.frameBody.keydown(e => {
			if (_this.selectedEl && _this.selectedEl.prop('tagName') != 'BODY') {
				if (e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40) {
					document.getElementById('iframeId').contentWindow.arrowKeyMove(e.which, _this.selectedEl);
					e.preventDefault();
				} else if (e.ctrlKey) {
					const kc = e.which || e.keyCode;
					// Delete
					if (String.fromCharCode(kc).toUpperCase() == 'D') {
						$("#delete-box").trigger('click');
					}
					// Copy
					if (String.fromCharCode(kc).toUpperCase() == 'C') {
						$("#clone-box").trigger('click');
					}
					e.preventDefault();
				}
			}
		});

		$("#drag-box").on("mousedown", function (event) {
			jQuery(selectBox).hide();
			_this.dragElement = _this.selectedEl;
			_this.isDragging = true;

			node = _this.dragElement.get(0);

			_this.dragMoveMutation = {
				type: 'move',
				target: node,
				oldParent: node.parentNode,
				oldNextSibling: node.nextSibling
			};
			//_this.selectNode(false);
			event.preventDefault();
			return false;
		});

		$("#down-box").on("click", function (event) {
			jQuery(selectBox).hide();

			node = _this.selectedEl.get(0);
			oldParent = node.parentNode;
			oldNextSibling = node.nextSibling;

			next = _this.selectedEl.next();

			if (next.length > 0) {
				next.after(_this.selectedEl);
			} else {
				_this.selectedEl.parent().after(_this.selectedEl);
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
			jQuery(selectBox).hide();

			node = _this.selectedEl.get(0);
			oldParent = node.parentNode;
			oldNextSibling = node.nextSibling;

			next = _this.selectedEl.prev();

			if (next.length > 0) {
				next.before(_this.selectedEl);
			} else {
				_this.selectedEl.parent().before(_this.selectedEl);
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
			clone = getElementWithDraggable(_this.selectedEl).clone();

			_this.selectedEl.after(clone);

			_this.selectedEl = clone.click();

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

			node = _this.selectedEl.parent().get(0);

			_this.selectNode(node);
			_this.loadNodeComponent(node);

			event.preventDefault();
			return false;
		});

		$("#delete-box").on("click", function (event) {
			jQuery(selectBox).hide();

			node = _this.selectedEl.get(0);

			Vvveb.Undo.addMutation({
				type: 'childList',
				target: node.parentNode,
				removedNodes: [node],
				nextSibling: node.nextSibling
			});

			_this.selectedEl.remove();

			event.preventDefault();
			return false;
		});

		$('#left-align').on('click', leftAlignCallback);
		$('#center-align').on('click', centerAlignCallback);
		$('#right-align').on('click', rightAlignCallback);
		$('#top-align').on('click', topAlignCallback);
		$('#middle-align').on('click', middleAlignCallback);
		$('#bottom-align').on('click', bottomAlignCallback);

		jQuery(window.FrameWindow).on("scroll resize", function (event) {

			if (_this.selectedEl) {
				offset = _this.selectedEl.offset();

				jQuery(selectBox).css(
					{
						"top": offset.top - _this.frameDoc.scrollTop(),
						"left": offset.left - _this.frameDoc.scrollLeft(),
						"width": _this.selectedEl.outerWidth(),
						"height": _this.selectedEl.outerHeight(),
						//"display": "block"
					});
			}

			if (_this.highlightEl) {
				offset = _this.highlightEl.offset();
				jQuery("#highlight-box").css(
					{
						"top": offset.top - _this.frameDoc.scrollTop(),
						"left": offset.left - _this.frameDoc.scrollLeft(),
						"width": _this.highlightEl.outerWidth(),
						"height": _this.highlightEl.outerHeight(),
						//"display": "block"
					});
			}
		});
	},
	/* drag and drop */
	_initDragdrop() {
		this.isDragging = false;
		component = {};
		const _this = this;
		$('#components ul > li > ol > li').on("mousedown touchstart", function (event) {
			$this = jQuery(this);

			// $("#component-clone").remove();
			component = Vvveb.Components.get($this.data("type"));

			if (component.dragHtml) {
				html = component.dragHtml;
			} else {
				html = component.html;
			}

			_this.dragElement = $(html);

			if (component.dragStart) _this.dragElement = component.dragStart(_this.dragElement);

			_this.isDragging = true;
		});
		$('body').on('mouseup touchend', function (event) {
			if (_this.isDragging == true) {
				_this.isDragging = false;
				// $("#component-clone").remove();
			}
		});
		$('body').on('mousemove touchmove', function (event) {
			if (_this.isDragging == true) {
				elementMouseIsOver = document.elementFromPoint(event.clientX - 60, event.clientY - 40);
				//if drag elements hovers over iframe switch to iframe mouseover handler	
				if (elementMouseIsOver && elementMouseIsOver.tagName == 'IFRAME') {
					_this.frameBody.trigger("mousemove", event);
					event.stopPropagation();
					_this.selectNode(false);
				}
			}
		});
		$('#components ul > ol > li > li').on("mouseup touchend", function (event) {
			_this.isDragging = false;
			// $("#component-clone").remove();
		});
	},
	setHtml(html) {
		//update only body to avoid breaking iframe css/js relative paths
		let start = html.indexOf("<body");
		let end = html.indexOf("</body");

		if (start >= 0 && end >= 0) {
			body = html.slice(html.indexOf(">", start) + 1, end);
		} else {
			body = html
		}
		//this.frameBody.html(body);
		window.FrameDocument.body.innerHTML = body;
		//below methods brake document relative css and js paths
		//return this.iframe.outerHTML = html;
		//return this.documentFrame.html(html);
		//return this.documentFrame.attr("srcdoc", html);
	}
};

let shownPanel, hiddenPanel, isPreview;

Vvveb.Gui = {
	init() {
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
	undo() {
		if (Vvveb.WysiwygEditor.isActive) {
			Vvveb.WysiwygEditor.undo();
		} else {
			Vvveb.Undo.undo();
		}
		Vvveb.Builder.selectNode();
	},
	redo() {
		if (Vvveb.WysiwygEditor.isActive) {
			Vvveb.WysiwygEditor.redo();
		} else {
			Vvveb.Undo.redo();
		}
		Vvveb.Builder.selectNode();
	},
	check() {
		$('#textarea-modal textarea').val(getBeautifiedHtml(window.FrameDocument));
		$('#textarea-modal').modal();
	},
	viewport() {
		$("#canvas").attr("class", this.dataset.view);
	},
	toggleEditor() {
		$("#vvveb-builder").toggleClass("bottom-panel-expand");
		Vvveb.CodeEditor.toggle();
	},
	formatCode() {
		Vvveb.CodeEditor.formatCode();
	},
	download() {
		downloadAsTextFile(defaultFilename, getBeautifiedHtml(window.FrameDocument));
	},
	upload() {
		$('#file-input')
			.change(function () {
				const file = this.files[0];
				if (file) {
					new Promise(function (resolve, reject) {
						const reader = new FileReader();
						reader.readAsText(file, "UTF-8");
						reader.onload = function (evt) {
							resolve(evt.target.result);
						}
						reader.onerror = function (evt) {
							reject(evt)
						}
					}).then(function (html) {
						localStorage.setItem(importedPageName, html);
						window.location.href = `#${importedPageName}`;
						window.location.reload();
					})
				}
			})
			.click();
	},
	downloadWithExternalFiles() {
		getBeautifiedHtml(window.FrameDocument, true)
			.then(html => downloadAsTextFile(defaultFilename, html));
	},
	preview() {
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
			$(`#${shownPanel}`).show();
			$(`#${hiddenPanel}`).hide();
		}

		$('#menu-panel').toggle();
		$("#iframe-layer").toggle();
		$("#vvveb-builder").toggleClass("preview");
	},
	fullscreen() {
		launchFullScreen(document); // the whole page
	},
	componentSearch() {
		searchText = this.value;
		$("#components-list li ol li").each(function () {
			$this = $(this);
			$this.hide();
			if ($this.data("search").indexOf(searchText) > -1) $this.show();
		});
	},
	clearComponentSearch: function () {
		$("#component-search").val("").keyup();
	}
}

Vvveb.FileManager = {
	tree: false,
	pages: {},
	init() {
		this.tree = $("#filemanager .tree > ol").html("");
		$(this.tree).on("click", "li[data-page] span", function (e) {
			const hash = $(this).parents('li').data('page');
			localStorage.removeItem(hash);
			window.location.href = `#${hash}`;
			window.location.reload();
			// Vvveb.FileManager.loadPage($(this).parents("li").data("page"));
			return false;
		})
	},
	getPage(name) {
		return this.pages[name];
	},
	addPage(name, title, url, srcdoc) {
		this.pages[name] = {
			name,
			title,
			url,
			srcdoc
		};
		this.tree.append(
			tmpl("filemanagerpage", { name, title, url }));
	},
	addPages(pages) {
		for (page in pages) {
			this.addPage(pages[page].name, pages[page].title, pages[page].url, pages[page].srcdoc);
		}
	},
	addComponent(name, url, title, page) {
		$("[data-page='" + page + "'] > ol", this.tree).append(
			tmpl("filemanagercomponent", { name, url, title }));
	},
	showActive(name) {
		$("[data-page]", this.tree).removeClass("active");
		$("[data-page='" + name + "']", this.tree).addClass("active");
	},
	loadPage(name) {
		$("[data-page]", this.tree).removeClass("active");
		$("[data-page='" + name + "']", this.tree).addClass("active");

		Vvveb.Builder.loadUrl(this.pages[name]['url']);
	},
}

export default Vvveb;