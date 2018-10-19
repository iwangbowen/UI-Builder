import Vvveb from './builder';
import tmpl from '../util/tmpl';
import { getRandomString, addDatetime } from '../util/common';
import { setPageSrcdoc, isTemplatePage, createPage, getSavedPages, clearTimer } from '../util/dom';
import _ from 'lodash';
import { templatePages } from '../constants';

Vvveb.FileManager = {
	tree: false,
	pages: {},
	init() {
		this.tree = $("#filemanager .tree > ol").html("");
		$(this.tree).on("click", "li[data-page] span", function (e) {
			clearTimer();
			const clickedPageName = $(this).parents('li').data('page');
			// window.location.reload();
			Vvveb.FileManager.loadPage(clickedPageName);
			return false;
		})
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
	loadPage(clickedPageName) {
		this.addPages([...getSavedPages(), ...templatePages]);
		if (isTemplatePage(clickedPageName)) {
			const newPageName = addDatetime(clickedPageName);
			window.location.href = `#${newPageName}`;
		} else {
			setPageSrcdoc(this.pages[clickedPageName]);
			window.location.href = `#${clickedPageName}`;
		}
		this.renderPages().showActive(clickedPageName);
		Vvveb.Builder.loadUrl(this.pages[clickedPageName].url, this.pages[clickedPageName].srcdoc);
	},
};