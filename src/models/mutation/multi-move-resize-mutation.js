import Mutation from './mutation';

export default class MultiMoveResizeMutation extends Mutation {
    constructor() {
        super('multiChildList', null);
        this.multiMoveResizeMutation = [];
    }

    onMoveResizeEnd() {
        this.multiMoveResizeMutation.forEach(mutation => mutation.onMoveResizeEnd());
    }

    addMoveResizeMutations(moveResizeMutations) {
        moveResizeMutations.forEach(this.addMoveResizeMutation);
        return this;
    }

    addMoveResizeMutation(moveResizeMutation) {
        this.multiMoveResizeMutation.push(moveResizeMutation);
        return this;
    }

    redo() {
        this.multiMoveResizeMutation.forEach(mutation => mutation.redo());
    }

    undo() {
        this.multiMoveResizeMutation.forEach(mutation => mutation.undo());
    }
}