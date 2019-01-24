import Builder from './builder';
import Undo from './undo';
import tmpl from '../util/tmpl';
import { getRandomString, addDatetime } from '../util/common';
import { setPageSrcdoc, isTemplatePage, getSavedPages, clearTimer, hideAuxiliaryElements, decodeHash, generateHtml } from '../util/dom';
import each from 'lodash/each';
import { templatePages, importedPageName, importedPageHref } from '../constants';

export default FileManager = {
	tree: false,
	pages: {},
	pageTreeSelector: '#filemanager .tree > ol',
	init() {
		this._initClickHandler()
			._initContextMenu();
	},
	_initClickHandler() {
		const self = this;
		this.tree = $(this.pageTreeSelector).html("");
		$(this.tree).on("click", "li[data-page] span", function (e) {
			clearTimer();
			hideAuxiliaryElements();
			const clickedPageName = $(this).parents('li').data('page');
			// window.location.reload();
			self.loadPage(clickedPageName);
			return false;
		});
		return this;
	},
	_initContextMenu() {
		$.contextMenu({
			selector: `${this.pageTreeSelector} li`,
			callback: (key, options) => {
				const deletedPage = $(this.pageTreeSelector).find('li.context-menu-active');
				const deletedPageName = deletedPage.data('page');
				const activePage = $(this.pageTreeSelector).find('li.active');
				const activePageName = activePage.data('page');
				if (key == 'delete') {
					if (isTemplatePage(deletedPageName)) {
						if (activePageName == deletedPageName) {
							const decodedHash = decodeHash();
							localStorage.removeItem(decodedHash);
							deletedPage.find('span').click();
						}
					} else {
						localStorage.removeItem(deletedPageName);
						// if the deleted page and the active page are the same page,
						// show next page
						if (activePageName == deletedPageName) {
							deletedPage.next().find('span').click();
						} else {
							deletedPage.remove();
						}
					}
				} else if (key === 'deleteAll') {
					const self = this;
					$("#dialog-confirm").dialog({
						resizable: false,
						draggable: false,
						height: "auto",
						width: 400,
						modal: true,
						buttons: {
							"Delete all pages":  function () {
								$(self.pageTreeSelector).find('li').each((_, li) => {
									const $li = $(li);
									const pageName = $li.data('page');
									if (!isTemplatePage(pageName)) {
										$li.remove();
									}
								});
								if (isTemplatePage(activePageName)) {
									const decodedHash = decodeHash();
									Object.keys(localStorage)
										.filter(key => key != decodedHash)
										.forEach(key => localStorage.removeItem(key));
								} else {
									Object.keys(localStorage)
										.forEach(key => localStorage.removeItem(key));
									$(self.pageTreeSelector).find('li').find('span').click();
								}

								$(this).dialog("close");
							},
							Cancel: function () {
								$(this).dialog("close");
							}
						}
					});
				}
			},
			items: {
				delete: {
					name: "Delete",
					icon: "delete"
				},
				deleteAll: {
					name: 'Delete All',
					icon: 'delete'
				},
				sep1: "---------",
				quit: {
					name: 'Quit',
					icon: () => 'context-menu-icon context-menu-icon-quit'
				}
			}
		});
		return this;
	},
	getPage(name) {
		return this.pages[name];
	},
	renderPages() {
		this.tree.html('');
		each(this.pages, ({ name, title, url }) => {
			this.tree.append(
				tmpl("filemanagerpage", {
					name,
					title,
					url,
					// To fix bugs which cause pages position changes when hash changes
					id: `${name}_${getRandomString()}`
				}));
		});
		return this;
	},
	addPage({ name, title, url, srcdoc, templateUrl }) {
		this.pages[name] = {
			name,
			title,
			url,
			srcdoc,
			templateUrl
		};
	},
	addPages(pages) {
		this.pages = {};
		each(pages, page => this.addPage(page));
		return this;
	},
	addComponent(name, url, title, page) {
		$(`[data-page='${page}'] > ol`, this.tree).append(
			tmpl("filemanagercomponent", { name, url, title }));
	},
	showActive(name) {
		$("[data-page]", this.tree).removeClass("active");
		$(`[data-page='${name}']`, this.tree).addClass("active");
		return this;
	},
	loadPage(pageName) {
		Undo.clearMutations();
		this.addPages([...getSavedPages(), ...templatePages]);
		if (isTemplatePage(pageName)) {
			const newPageName = addDatetime(pageName);
			window.location.href = `#${newPageName}`;
		} else {
			setPageSrcdoc(this.pages[pageName]);
			window.location.href = `#${pageName}`;
		}
		this.renderPages().showActive(pageName);
		Builder.loadUrl(this.pages[pageName].url, this.pages[pageName].srcdoc);
	},
	loadPageFromMessage(html) {
		clearTimer();
		Undo.clearMutations();
		Builder.loadUrl(addDatetime(importedPageName), generateHtml(html, importedPageHref));
	}
};