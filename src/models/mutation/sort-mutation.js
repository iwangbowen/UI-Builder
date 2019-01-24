import Mutation from './mutation';

export default class SortMutation extends Mutation {
    constructor({ target, oldParent, oldNextSibling, oldAttrs, newParent, newNextSibling, newAttrs }) {
        super('sort', target);
        this.oldParent = oldParent;
        this.oldNextSibling = oldNextSibling;
        this.oldAttrs = oldAttrs;
        this.newParent = newParent;
        this.newNextSibling = newNextSibling;
        this.newAttrs = newAttrs;
    }

    redo() {
        if (this.newAttrs) {
            $(this.target).attr(this.newAttrs);
        }
        this.addNode(this.newParent, this.newNextSibling, this.target);
    }

    undo() {
        if (this.oldAttrs) {
            $(this.target).attr(this.oldAttrs);
        }
        this.addNode(this.oldParent, this.oldNextSibling, this.target);
    }
}