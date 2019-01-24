import Mutation from './mutation';

export default class MultiResizeMutation extends Mutation {
    constructor() {
        super('multiResize', null);
        this.multiResizeMutations = [];
    }

    onResizeEnd() {
        this.multiResizeMutations.forEach(mutation => mutation.onResizeEnd());
    }

    addMutations(resizeMutations) {
        resizeMutations.forEach(this.addMutation);
        return this;
    }

    addMutation(resizeMutation) {
        this.multiResizeMutations.push(resizeMutation);
        return this;
    }

    redo() {
        this.multiResizeMutations.forEach(mutation => mutation.redo());
    }

    undo() {
        this.multiResizeMutations.forEach(mutation => mutation.undo());
    }
}