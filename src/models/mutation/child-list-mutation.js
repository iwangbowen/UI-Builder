import Mutation from './mutation';
import { convertAndInitInteractionsRecursively } from '../../util/interactions';

export default class ChildListMutation extends Mutation {
    constructor({ target, addedNodes, removedNodes, nextSibling }) {
        super('childList', target);
        this.addedNodes = addedNodes;
        this.removedNodes = removedNodes;
        this.nextSibling = nextSibling;
    }

    redo() {
        this.removeNodes(this.removedNodes);
        this.addNodes(this.addedNodes);
    }

    undo() {
        this.removeNodes(this.addedNodes);
        this.addNodes(this.removedNodes);
    }

    addNodes(nodes) {
        if (nodes) {
            nodes.forEach(node => this.addNode(this.target, this.nextSibling, node));
        }
    }

    addNode(parent, nextSibling, node) {
        if (nextSibling) {
            nextSibling.parentNode.insertBefore(node, nextSibling);
        } else {
            $(parent).append(node);
        }
        convertAndInitInteractionsRecursively($(node));
    }

    removeNodes(nodes) {
        if (nodes) {
            nodes.forEach(node => node.parentNode.removeChild(node));
        }
    }
}