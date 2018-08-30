class Mutation {
    constructor(type, target) {
        this.type = type;
        this.target = target;
    }

    removeNodes(nodes) {
        if (nodes) {
            nodes.forEach(node => node.parentNode.removeChild(node));
        }
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
            parent.append(node);
        }
    }
}

class ChildListMutation extends Mutation {
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

class MoveMutation extends Mutation {
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

export { ChildListMutation, MoveMutation };