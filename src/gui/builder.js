import { replaceOtherShowingCalendarInputs } from '../util/dataAttr';
import {
	middleAlignCallback, centerAlignCallback, topAlignCallback, leftAlignCallback, rightAlignCallback,
	clearSelectedElements, addOrRemoveElement, highlightWhenHovering, highlightwhenSelected,
	getElementWithDraggable, bottomAlignCallback
} from '../util/dom';
import { noneditableSelector, getParentOrSelf, selectBox } from '../util/selectors';
import _ from 'lodash';

if (Vvveb === undefined) var Vvveb = {};

Vvveb.defaultComponent = "_base";
Vvveb.preservePropertySections = true;

Vvveb.baseUrl = document.currentScript ? document.currentScript.src.replace(/[^\/]*?\.js$/, '') : '';

Vvveb.ComponentsGroup = {};

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
		const componentsList = $("#components-list");
		componentsList.empty();

		for (group in Vvveb.ComponentsGroup) {
			componentsList.append('<li class="header" data-section="' + group + '"  data-search=""><label class="header" for="comphead_' + group + '">' + group + '  <div class="header-arrow"></div>\
								   </label><input class="header_check" type="checkbox" checked="true" id="comphead_' + group + '">  <ol></ol></li>');

			const componentsSubList = componentsList.find('li[data-section="' + group + '"]  ol');

			components = Vvveb.ComponentsGroup[group];

			for (i in components) {
				const componentType = components[i];
				const component = Vvveb.Components.get(componentType);
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
		let componentName = '';
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
		const data = Vvveb.Components.matchNode(node);
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
					if (!Vvveb.Actions.isPreview && !$('#attribute-settings').hasClass('active')) {
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
			const clone = getElementWithDraggable(_this.selectedEl).clone();
			_this.selectedEl.after(clone);
			_this.selectedEl = clone.click();
			const node = clone.get(0);
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
			const node = _this.selectedEl.parent().get(0);
			_this.selectNode(node);
			_this.loadNodeComponent(node);
			event.preventDefault();
			return false;
		});

		$("#delete-box").on("click", function (event) {
			jQuery(selectBox).hide();
			const node = getElementWithDraggable(_this.selectedEl).get(0);
			Vvveb.Undo.addMutation({
				type: 'childList',
				target: node.parentNode,
				removedNodes: [node],
				nextSibling: node.nextSibling
			});
			$(node).remove();
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

export default Vvveb;