import Vvveb from './components';
import { replaceOtherShowingCalendarInputs } from '../util/dataAttr';
import {
	middleAlignCallback, centerAlignCallback, topAlignCallback, leftAlignCallback, rightAlignCallback,
	clearSelectedElements, addOrRemoveElement, highlightWhenHovering, highlightwhenSelected,
	getElementWithSpecifiedClass, bottomAlignCallback, loadCallback, hideAuxiliaryElements
} from '../util/dom';
import { noneditableSelector, selectBox, componentSelector } from '../util/selectors';
import ChildListMutation from '../models/mutation/child-list-mutation';
import {
	initComponentDrag, initIframeSortable,
	enableSortableAndDroppableInIframe, enableDroppableInIframe,
	disableSortable, removeSortableAndGridsterDisability, initResize
} from '../util/drag-n-drop';
import { sortableClass, cloneableComponent, containerComponent } from '../components/common';
import { sortableAndDroppableSelector, gridWidgetSelector, containerSelector } from '../common';
import MoveMutation from '../models/mutation/move-mutation';
import { isInIframe } from '../constants';

Vvveb.defaultComponent = "_base";
Vvveb.preservePropertySections = true;
Vvveb.baseUrl = document.currentScript ? document.currentScript.src.replace(/[^\/]*?\.js$/, '') : '';
Vvveb.ComponentsGroup = {};

Vvveb.Builder = {
	dragMoveMutation: false,
	init({ url, srcdoc }) {
		this.loadControlGroups();

		this.selectedEl = null;
		this.highlightEl = null;
		this.documentFrame = $("#iframe-wrapper > iframe");
		this.canvas = $("#canvas");

		Vvveb.Actions.init();

		if (!isInIframe) {
			this._loadIframe(url, srcdoc);
		}
		this._initSelectBox();
		this.documentFrame.on('load', () => {
			window.FrameWindow = this.iframe.contentWindow;
			window.FrameDocument = this.iframe.contentWindow.document;
			Vvveb.WysiwygEditor.init(window.FrameDocument);
			loadCallback();
			this.frameWindow = window.FrameWindow;
			this.frameDoc = $(window.FrameDocument);
			this.frameHtml = $(window.FrameDocument).find("html");
			this.frameBody = $(window.FrameDocument).find('body');

			enableDroppableInIframe(`${gridWidgetSelector}, ${containerSelector}`);
			enableSortableAndDroppableInIframe(sortableAndDroppableSelector);
			initResize();
			initIframeSortable();
			return this._initHightlight();
		});
	},
	loadControlGroups() {
		const componentsList = $("#components-list");
		componentsList.empty();
		for (const group in Vvveb.ComponentsGroup) {
			componentsList.append(`
			<li class="header" data-section="${group}" data-search="">
				<label class="header" for="comphead_${group}">${group}
					<div class="header-arrow"></div>
				</label>
				<input class="header_check" type="checkbox" checked="true" id="comphead_${group}">
				<ol></ol>
			</li>`);
			const componentsSubList = componentsList.find(`li[data-section="${group}"] ol`);
			const components = Vvveb.ComponentsGroup[group];
			for (const i in components) {
				const componentType = components[i];
				const component = Vvveb.Components.get(componentType);
				if (component) {
					const item = $(`
					<li data-section="${group}" data-type="${componentType}" data-search="${component.name.toLowerCase()}">
						<a href="#">${component.name}</a>
					</li>`);
					if (component.image) {
						item.css({
							backgroundImage: `url(libs/builder/${component.image})`,
							backgroundRepeat: "no-repeat"
						})
					}
					componentsSubList.append(item);
					initComponentDrag(item, Vvveb.Components.get($(item).data("type")));
				}
			}
		}
	},
	loadUrl(url, srcdoc) {
		jQuery(selectBox).hide();
		this._loadIframe(url, srcdoc);
	},
	/* iframe */
	_loadIframe(url, srcdoc) {
		this.iframe = this.documentFrame.get(0);
		this.iframe.src = `${window.location.origin}/${url}`;
		if (srcdoc) {
			const iframeDocument = this.iframe.contentWindow.document;
			iframeDocument.open('text/html', 'replace');
			iframeDocument.write(srcdoc);
			iframeDocument.close();
		}
	},
	loadNodeComponent(node) {
		const data = Vvveb.Components.matchNode(node);
		if (data) {
			Vvveb.Components.render(data.type);
		}
	},
	selectNode(node = false, ctrlKeyPressed = false) {
		if (!node) {
			jQuery(selectBox).hide();
			return;
		}
		if (this.texteditEl && this.selectedEl && this.selectedEl.get(0) != node) {
			Vvveb.WysiwygEditor.destroy(this.texteditEl);
			jQuery(selectBox).removeClass("text-edit").find("#select-actions").show();
			this.texteditEl = null;
		}
		this.selectedEl = target = jQuery(node);
		highlightwhenSelected(node, ctrlKeyPressed);
	},
	_initSelectBox() {
		const _this = this;
		$("#down-box").on("click", function (event) {
			jQuery(selectBox).hide();
			const node = _this.selectedEl.get(0);
			const oldParent = node.parentNode;
			const oldNextSibling = node.nextSibling;
			const next = _this.selectedEl.next();
			if (next.length > 0) {
				next.after(_this.selectedEl);
			} else {
				_this.selectedEl.parent().after(_this.selectedEl);
			}
			const newParent = node.parentNode;
			const newNextSibling = node.nextSibling;

			Vvveb.Undo.addMutation(new MoveMutation({
				target: node,
				oldParent,
				newParent,
				oldNextSibling,
				newNextSibling
			}));
			event.preventDefault();
			return false;
		});

		$("#up-box").on("click", function (event) {
			jQuery(selectBox).hide();
			const node = _this.selectedEl.get(0);
			const oldParent = node.parentNode;
			const oldNextSibling = node.nextSibling;
			const next = _this.selectedEl.prev();
			if (next.length > 0) {
				next.before(_this.selectedEl);
			} else {
				_this.selectedEl.parent().before(_this.selectedEl);
			}
			const newParent = node.parentNode;
			const newNextSibling = node.nextSibling;

			Vvveb.Undo.addMutation(new MoveMutation({
				target: node,
				oldParent,
				oldNextSibling,
				newParent,
				newNextSibling
			}));
			event.preventDefault();
			return false;
		});

		$("#clone-box").on("click", function (event) {
			const original = getElementWithSpecifiedClass(_this.selectedEl);
			if (original.length) {
				const component = Vvveb.Components.matchNode(original.get(0));
				const cloned = original.clone();
				if (!component.sortable && !cloned.hasClass(sortableClass) && !cloned.hasClass(cloneableComponent)) {
					const { left, top } = cloned.offset();
					cloned.offset({
						left: left + 10,
						top: top + 10
					});
				}
				original.after(cloned);
				if (component && (component.sortable || component.droppable)) {
					enableSortableAndDroppableInIframe(cloned, undefined, undefined, component.droppable, component.sortable);
				}
				if (component && component.childrenSortable && component.childrenDroppable) {
					enableSortableAndDroppableInIframe(cloned.children());
				}
				_this.selectedEl = cloned.click();
				const node = cloned.get(0);
				Vvveb.Undo.addMutation(new ChildListMutation({
					target: node.parentNode,
					addedNodes: [node],
					nextSibling: node.nextSibling
				}));
			}
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

		$('#container-box').on('click', function (event) {
			const container = _this.selectedEl.parents(`.${containerComponent}`);
			if (container.length) {
				const node = container.get(0);
				_this.selectNode(node);
				_this.loadNodeComponent(node);
			}
			event.preventDefault();
			return false;
		});

		$("#delete-box").on("click", function (event) {
			hideAuxiliaryElements();
			const node = _this.selectedEl.get(0);
			Vvveb.Undo.addMutation(new ChildListMutation({
				target: node.parentNode,
				removedNodes: [node],
				nextSibling: node.nextSibling
			}));
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
	},
	_initHightlight() {
		const _this = this;
		this.frameBody.on("mousemove touchmove", function (event) {
			if (event.target) {
				if (getElementWithSpecifiedClass($(event.target)).length) {
					_this.highlightEl = target = jQuery(event.target);
					if (!event.ctrlKey) {
						highlightWhenHovering(event.target);
					}
				}
			}
		});

		// this.frameBody.on("dblclick", function (event) {
		// 	replaceOtherShowingCalendarInputs(event.target, _this.frameBody);

		// 	_this.texteditEl = target = jQuery(event.target);
		// 	Vvveb.WysiwygEditor.edit(_this.texteditEl);
		// 	if (!_this.texteditEl.parents(noneditableSelector).length) {
		// 		// Disable sortable to allow edit mode text node to be editable
		// 		disableSortable();
		// 		window.FrameWindow.disableGridster();
		// 		_this.texteditEl.attr({
		// 			contenteditable: true,
		// 			spellcheckker: false
		// 		});
		// 		_this.texteditEl.on('blur', removeSortableAndGridsterDisability);
		// 	}
		// 	_this.texteditEl.on("blur keyup paste input", function (event) {
		// 		const el = $(this);
		// 		jQuery(selectBox).css({
		// 			"width": el.outerWidth(),
		// 			"height": el.outerHeight()
		// 		});
		// 	});
		// 	jQuery(selectBox).addClass("text-edit").find("#select-actions").hide();
		// 	jQuery("#highlight-box").hide();
		// });

		this.frameBody.on("click", function (event) {
			document.getElementById('iframeId').contentWindow.hideAlignmentLines();
			const element = getElementWithSpecifiedClass($(event.target));

			if (element.length) {
				if (!($(event.target).hasClass('horizontal-line') || $(event.target).hasClass('vertical-line'))) {
					replaceOtherShowingCalendarInputs(event.target, _this.frameBody);
					if (event.target) {
						if (event.ctrlKey) {
							addOrRemoveElement(event.target);
						} else {
							clearSelectedElements();
						}
						const component = Vvveb.Components.matchNode(element.get(0));
						let node = event.target;
						if (component.getRenderElement) {
							node = component.getRenderElement(node);
						}
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
			}
		});

		this.frameBody.keydown(e => {
			if (_this.selectedEl && _this.selectedEl.prop('tagName') != 'BODY') {
				if (e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40) {
					// Disable element move using arrow keys in text node edit mode
					if (!_this.texteditEl) {
						document.getElementById('iframeId').contentWindow.arrowKeyMove(e.which, _this.selectedEl);
						e.preventDefault();
					}
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

		function changeOffset() {
			if (_this.selectedEl) {
				const offset = _this.selectedEl.offset();
				jQuery(selectBox).css(
					{
						top: offset.top - _this.frameDoc.scrollTop(),
						left: offset.left - _this.frameDoc.scrollLeft(),
						width: _this.selectedEl.outerWidth(),
						height: _this.selectedEl.outerHeight(),
						//"display": "block"
					});
			}
			if (_this.highlightEl) {
				const offset = _this.highlightEl.offset();
				jQuery("#highlight-box").css(
					{
						"top": offset.top - _this.frameDoc.scrollTop(),
						"left": offset.left - _this.frameDoc.scrollLeft(),
						"width": _this.highlightEl.outerWidth(),
						"height": _this.highlightEl.outerHeight(),
						//"display": "block"
					});
			}
		}
		// Fix scroll handler not called after changing pages
		window.FrameWindow.addEventListener('scroll', changeOffset);
		jQuery(window.FrameWindow).on('resize', changeOffset);
	},
	setHtml(html) {
		//update only body to avoid breaking iframe css/js relative paths
		const start = html.indexOf("<body");
		const end = html.indexOf("</body");
		let body;
		if (start >= 0 && end >= 0) {
			body = html.slice(html.indexOf(">", start) + 1, end);
		} else {
			body = html;
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