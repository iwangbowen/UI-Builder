import Mutation from './mutation';

export default class MoveMutation extends Mutation {
    constructor({ target, oldParent, oldNextSibling, oldAttrs, newParent, newNextSibling, newAttrs }) {
        super('move', target);
        this.oldParent = oldParent;
        this.oldNextSibling = oldNextSibling;
        this.oldAttrs = oldAttrs;
        this.newParent = newParent;
        this.newNextSibling = newNextSibling;
        this.newAttrs = newAttrs;
    }

    redo() {
        $(this.target).attr(this.newAttrs);
        this.addNode(this.newParent, this.newNextSibling, this.target);
    }

    undo() {
        $(this.target).attr(this.oldAttrs);
        this.addNode(this.oldParent, this.oldNextSibling, this.target);
    }
}