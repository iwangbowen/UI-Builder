import Vvveb from './builder';
import tmpl from '../util/tmpl';

Vvveb.FileManager = {
	tree: false,
	pages: {},
	init() {
		this.tree = $("#filemanager .tree > ol").html("");
		$(this.tree).on("click", "li[data-page] span", function (e) {
			window.location.href = `#${$(this).parents('li').data('page')}`;
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
		$(`[data-page='${page}'] > ol`, this.tree).append(
			tmpl("filemanagercomponent", { name, url, title }));
	},
	showActive(name) {
		$("[data-page]", this.tree).removeClass("active");
		$(`[data-page='${name}']`, this.tree).addClass("active");
	},
	loadPage(name) {
		$("[data-page]", this.tree).removeClass("active");
		$(`[data-page='${name}']`, this.tree).addClass("active");
		Vvveb.Builder.loadUrl(this.pages[name]['url']);
	},
};