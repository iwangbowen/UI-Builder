import { convertAndInitInteractionsRecursively } from '../../util/interactions';
import Mutation from './mutation';

export default class MoveResizeMutation extends Mutation {
    constructor({ target, oldParent, oldNextSibling, oldStyle, newParent, newNextSibling, newStyle }) {
        super('moveResize', target);
        this.oldParent = target.parentNode;
        this.oldNextSibling = target.nextSibling;
        this.oldStyle = target.getAttribute('style');
    }

    onMoveResizeEnd() {
        this.newParent = this.target.parentNode;
        this.newNextSibling = this.target.nextSibling;
        this.newStyle = this.target.getAttribute('style');
    }

    setNewProperties({ newParent, newNextSibling, newAttrs }) {
        this.newParent = newParent;
        this.newNextSibling = newNextSibling;
        this.newAttrs = newAttrs;
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