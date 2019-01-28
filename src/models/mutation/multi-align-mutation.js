import Mutation from './mutation';

export default class MultiAlignMutation extends Mutation {
    constructor({ type = 'multiAlign' }) {
        super(type, null);
        this.multiAlignMutations = [];
    }

    onAlignEnd() {
        this.multiAlignMutations.forEach(mutation => mutation.onAlignEnd());
    }

    addMutations(alignMutations) {
        alignMutations.forEach(this.addMutation);
        return this;
    }

    addMutation(alignMutation) {
        this.multiAlignMutations.push(alignMutation);
        return this;
    }

    redo() {
        this.multiAlignMutations.forEach(mutation => mutation.redo());
    }

    undo() {
        this.multiAlignMutations.forEach(mutation => mutation.undo());
    }
}