import Vvveb from './builder';
import { getHtml, getBeautifiedHtml, delay } from '../util/dom';

Vvveb.CodeEditor = {
	isActive: false,
	oldValue: '',
	doc: false,
	codemirror: false,
	formated: false,
	init(doc) {
		if (this.codemirror == false) {
			this.codemirror = CodeMirror.fromTextArea(document.querySelector("#vvveb-code-editor textarea"), {
				mode: 'text/html',
				lineNumbers: true,
				autofocus: true,
				lineWrapping: true,
				//viewportMargin:Infinity,
				theme: 'material'
			});
			this.isActive = true;
			this.codemirror.getDoc().on("change", function (e, v) {
				if (v.origin != 'setValue')
					delay(Vvveb.Builder.setHtml(e.getValue()), 1000);
			});
		}
		//_self = this;
		Vvveb.Builder.frameBody.on("vvveb.undo.add vvveb.undo.restore", function (e) { Vvveb.CodeEditor.setValue(e); });
		//load code when a new url is loaded
		Vvveb.Builder.documentFrame.on("load", function (e) { Vvveb.CodeEditor.setValue(); });

		this.isActive = true;
		this.setValue(this.formated);

		return this.codemirror;
	},
	setValue(formatCode = false) {
		if (this.isActive == true) {
			let scrollInfo = this.codemirror.getScrollInfo();
			this.codemirror.setValue(formatCode ? getBeautifiedHtml(window.FrameDocument) : getHtml(window.FrameDocument));
			this.codemirror.scrollTo(scrollInfo.left, scrollInfo.top);
		}
	},
	formatCode() {
		this.formated = true;
		this.setValue(true);
	},
	destroy(element) {
		/*
		//save memory by destroying but lose scroll on editor toggle
		this.codemirror.toTextArea();
		this.codemirror = false;
		*/
		this.isActive = false;
	},
	toggle() {
		let toggleEditorBtn = $('#bottom-panel #code-editor-btn');
		let formatCodeBtn = $('#bottom-panel #format-code-btn');
		if (this.isActive != true) {
			this.isActive = true;
			toggleEditorBtn.children().removeClass('ion-chevron-up').addClass('ion-chevron-down');
			formatCodeBtn.show();
			return this.init();
		}
		this.isActive = false;
		toggleEditorBtn.children().removeClass('ion-chevron-down').addClass('ion-chevron-up');
		formatCodeBtn.hide();
		this.destroy();
	}
};
