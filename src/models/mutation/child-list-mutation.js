import Mutation from './mutation';

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
}