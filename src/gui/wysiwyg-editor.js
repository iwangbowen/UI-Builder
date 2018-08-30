import Vvveb from './builder';
import CharacterDataMutation from '../models/mutation/character-data-mutation'

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
        Vvveb.Undo.addMutation(new CharacterDataMutation({
            target: node,
            oldValue: this.oldValue,
            newValue: node.innerHTML
        }));
    }
}