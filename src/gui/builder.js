import Components from './components';
import Undo from './undo';
import Actions from './actions';
import WysiwygEditor from './wysiwyg-editor';
import ComponentsGroup from '../components-loader';
import { replaceOtherShowingCalendarInputs } from '../util/dataAttr';
import {
	clearSelectedElements, addOrRemoveElement, highlightOnMove, highlightwhenSelected,
	getElementWithSpecifiedClass, loadCallback, hideAuxiliaryElements, changeOffset, alignCallback,
	getFunctionInIframe, getSelectedElements, setSelectedElements
} from '../util/dom';
import { noneditableSelector, selectBox } from '../util/selectors';
import ChildListMutation from '../models/mutation/child-list-mutation';
import {
	initDraggableComponents,
	initInteractions,
	arrayKeyPressed,
	setDraggable,
	hideAlignmentLines,
	cloneAndInit
} from '../util/interactions';
import { containerComponent } from '../components/common';
import SortMutation from '../models/mutation/sort-mutation';
import { isInIframe } from '../constants';
import { multiSelectedCopy, multiSelectedDelete } from '../shared';
import MultiChildListMutation from '../models/mutation/multi-child-list-mutation';
import { closeDropdown } from './undo-history';

export default Builder = {
	dragMoveMutation: false,
	init({ url, srcdoc }) {
		this.loadControlGroups();

		this.selectedEl = null;
		this.highlightEl = null;
		this.documentFrame = $("#iframe-wrapper > iframe");
		this.canvas = $("#canvas");

		Actions.init();

		if (!isInIframe) {
			this._loadIframe(url, srcdoc);
		}
		this._initSelectBox();
		this.documentFrame.on('load', () => {
			window.FrameWindow = this.iframe.contentWindow;
			window.FrameDocument = this.iframe.contentWindow.document;
			WysiwygEditor.init(window.FrameDocument);
			loadCallback();
			this.frameWindow = window.FrameWindow;
			this.frameDoc = $(window.FrameDocument);
			this.frameHtml = $(window.FrameDocument).find("html");
			this.frameBody = $(window.FrameDocument).find('body');


			initInteractions();
			return this._initHightlight();
		});
	},
	loadControlGroups() {
		const componentsList = $("#components-list");
		componentsList.empty();
		for (const group in ComponentsGroup) {
			componentsList.append(`
			<li class="header" data-section="${group}" data-search="">
				<label class="header" for="comphead_${group}">${group}
					<div class="header-arrow"></div>
				</label>
				<input class="header_check" type="checkbox" checked="true" id="comphead_${group}">
				<ol></ol>
			</li>`);
			const componentsSubList = componentsList.find(`li[data-section="${group}"] ol`);
			const components = ComponentsGroup[group];
			for (const i in components) {
				const componentType = components[i];
				const component = Components.get(componentType);
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
					initDraggableComponents(item, Components.get($(item).data("type")));
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
		const data = Components.matchNode(node);
		if (data) {
			Components.render(data.type);
		}
	},
	selectNode(node = false, ctrlKeyPressed = false) {
		if (!node) {
			jQuery(selectBox).hide();
			return;
		}
		if (this.texteditEl && this.selectedEl && this.selectedEl.get(0) != node) {
			WysiwygEditor.destroy(this.texteditEl);
			jQuery(selectBox).removeClass("text-edit").find("#select-actions").show();
			this.texteditEl = null;
		}
		this.selectedEl = jQuery(node);
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

			Undo.addMutation(new SortMutation({
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

			Undo.addMutation(new SortMutation({
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
				const cloned = cloneAndInit(original);
				if (cloned.length) {
					_this.selectedEl = $(cloned[0]).click();
				}
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
			Undo.addMutation(new ChildListMutation({
				target: node.parentNode,
				removedNodes: [node],
				nextSibling: node.nextSibling
			}));
			$(node).remove();
			event.preventDefault();
			return false;
		});

		$('#left-align').on('click', alignCallback('left'));
		$('#center-align').on('click', alignCallback('center'));
		$('#right-align').on('click', alignCallback('right'));
		$('#top-align').on('click', alignCallback('top'));
		$('#middle-align').on('click', alignCallback('middle'));
		$('#bottom-align').on('click', alignCallback('bottom'));

		$(`#${multiSelectedCopy}`).on('click', (event) => {
			hideAuxiliaryElements();
			const selectedElements = getSelectedElements();
			const clonedElements = cloneAndInit($(selectedElements));
			clearSelectedElements();
			setSelectedElements(clonedElements);
			event.preventDefault();
			return false;
		});

		$(`#${multiSelectedDelete}`).on('click', (event) => {
			hideAuxiliaryElements();
			const selectedElements = getSelectedElements();
			const multiChildListMutation = new MultiChildListMutation();
			selectedElements.forEach(node => {
				multiChildListMutation.addChildListMutation(new ChildListMutation({
					target: node.parentNode,
					removedNodes: [node]
				}));
			});
			Undo.addMutation(multiChildListMutation);
			clearSelectedElements();
			$(selectedElements).remove();
			event.preventDefault();
			return false;
		});
	},
	_initHightlight() {
		const _this = this;
		this.frameBody.on("mousemove touchmove", function (event) {
			if (event.target) {
				// Show highlight box only when no button is pressed
				// else hide highlight box
				if (event.which === 0) {
					if (getElementWithSpecifiedClass($(event.target)).length) {
						_this.highlightEl = jQuery(event.target);
						if (!event.ctrlKey) {
							highlightOnMove(event.target);
						}
					}
				} else {
					hideAuxiliaryElements();
				}
			}
		});

		this.frameBody.on("dblclick", function (event) {
			replaceOtherShowingCalendarInputs(event.target, _this.frameBody);

			_this.texteditEl = jQuery(event.target);
			WysiwygEditor.edit(_this.texteditEl);
			if (!_this.texteditEl.parents(noneditableSelector).length) {
				// Disable draggable to allow edit mode text node to be editable
				if (_this.texteditEl.draggable('instance')) {
					setDraggable(_this.texteditEl, 'disable');
				}
				_this.texteditEl.attr({
					contenteditable: true,
					spellcheckker: false
				});
				_this.texteditEl.on('blur', function () {
					const $this = $(this);
					if ($this.draggable('instance')) {
						setDraggable($this, 'enable');
					}
				});
			}
			_this.texteditEl.on("blur keyup paste input", function (event) {
				const el = $(this);
				jQuery(selectBox).css({
					"width": el.outerWidth(),
					"height": el.outerHeight()
				});
			});
			jQuery(selectBox).addClass("text-edit").find("#select-actions").hide();
			jQuery("#highlight-box").hide();
		});

		this.frameBody.on("click", function (event) {
			hideAlignmentLines();
			closeDropdown();
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
						const component = Components.matchNode(element.get(0));
						let node = event.target;
						if (component.getRenderElement) {
							node = component.getRenderElement(node);
						}
						if (!Actions.isPreview && !$('#attribute-settings').hasClass('active')) {
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

		this.frameDoc.keydown(e => {
			if (_this.selectedEl && _this.selectedEl.prop('tagName') != 'BODY') {
				if (e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40) {
					// Disable element move using arrow keys in text node edit mode
					if (!_this.texteditEl) {
						arrayKeyPressed(e.which, _this.selectedEl);
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

		// Fix scroll handler not called after changing pages
		this.frameWindow.addEventListener('scroll', changeOffset);
		jQuery(this.frameWindow).on('resize', changeOffset);
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