import Vvveb from './builder';
import tmpl from '../util/tmpl';
import { getRandomString, addDatetime } from '../util/common';
import { setPageSrcdoc, isTemplatePage, getSavedPages, clearTimer, hideAuxiliaryElements, decodeHash } from '../util/dom';
import _ from 'lodash';
import { templatePages } from '../constants';

Vvveb.FileManager = {
	tree: false,
	pages: {},
	pageTreeSelector: '#filemanager .tree > ol',
	init() {
		this._initClickHandler()
			._initContextMenu();
	},
	_initClickHandler() {
		this.tree = $(this.pageTreeSelector).html("");
		$(this.tree).on("click", "li[data-page] span", function (e) {
			clearTimer();
			hideAuxiliaryElements();
			const clickedPageName = $(this).parents('li').data('page');
			// window.location.reload();
			Vvveb.FileManager.loadPage(clickedPageName);
			return false;
		});
		return this;
	},
	_initContextMenu() {
		$.contextMenu({
			selector: `${this.pageTreeSelector} li`,
			callback: (key, options) => {
				if (key == 'delete') {
					const deletedPage = $(this.pageTreeSelector).find('li.context-menu-active');
					const deletedPageName = deletedPage.data('page');
					const activePage = $(this.pageTreeSelector).find('li.active');
					const activePageName = activePage.data('page');

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
				}
			},
			items: {
				delete: {
					name: "Delete",
					icon: "delete"
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
		_.each(this.pages, ({ name, title, url }) => {
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
	addPage({ name, title, url, srcdoc }) {
		this.pages[name] = {
			name,
			title,
			url,
			srcdoc
		};
	},
	addPages(pages) {
		this.pages = {};
		_.each(pages, page => this.addPage(page));
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
		this.addPages([...getSavedPages(), ...templatePages]);
		if (isTemplatePage(pageName)) {
			const newPageName = addDatetime(pageName);
			window.location.href = `#${newPageName}`;
		} else {
			setPageSrcdoc(this.pages[pageName]);
			window.location.href = `#${pageName}`;
		}
		this.renderPages().showActive(pageName);
		Vvveb.Builder.loadUrl(this.pages[pageName].url, this.pages[pageName].srcdoc);
	},
};