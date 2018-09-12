export default class Mutation {
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
        console.log(parent);
        if (nextSibling) {
            nextSibling.parentNode.insertBefore(node, nextSibling);
        } else {
            $(parent).append(node);
        }
    }
}