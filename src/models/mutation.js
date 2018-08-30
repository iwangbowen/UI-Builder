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
            nodes.forEach(node => {
                if (this.nextSibing) {
                    this.nextSibling.parentNode.insertBefore(node, this.nextSibling);
                } else {
                    this.target.append(node);
                }
            });
        }
    }
}

class ChildListMutation extends Mutation {
    constructor({ target, addedNodes, removedNodes, nextSibing }) {
        super('childList', target);
        this.addedNodes = addedNodes;
        this.removedNodes = removedNodes;
        this.nextSibing = nextSibing;
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

}

export { ChildListMutation, MoveMutation };