import { convertAndInitInteractionsRecursively } from '../../util/interactions';
import Mutation from './mutation';

export default class MoveMutation extends Mutation {
    constructor({ target }) {
        super('move', target);
        this.oldParent = target.parentNode;
        this.oldNextSibling = target.nextSibling;
        this.oldStyle = target.getAttribute('style');
    }

    onMoveEnd() {
        this.newParent = this.target.parentNode;
        this.newNextSibling = this.target.nextSibling;
        this.newStyle = this.target.getAttribute('style');
    }

    redo() {
        this.addNode(this.newParent, this.newNextSibling, this.target);
        this.target.setAttribute('style', this.newStyle);
    }

    undo() {
        this.addNode(this.oldParent, this.oldNextSibling, this.target);
        this.target.setAttribute('style', this.oldStyle);
    }

    addNode(parent, nextSibling, node) {
        if (nextSibling) {
            nextSibling.parentNode.insertBefore(node, nextSibling);
        } else {
            $(parent).append(node);
        }
        convertAndInitInteractionsRecursively($(node));
    }
}