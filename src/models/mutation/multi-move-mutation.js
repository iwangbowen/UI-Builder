import Mutation from './mutation';

export default class MultiMoveMutation extends Mutation {
    constructor() {
        super('multiMove', null);
        this.multiMoveMutations = [];
    }

    onMoveEnd() {
        this.multiMoveMutations.forEach(mutation => mutation.onMoveEnd());
    }

    addMutations(moveMutations) {
        moveMutations.forEach(this.addMutation);
        return this;
    }

    addMutation(moveMutation) {
        this.multiMoveMutations.push(moveMutation);
        return this;
    }

    redo() {
        this.multiMoveMutations.forEach(mutation => mutation.redo());
    }

    undo() {
        this.multiMoveMutations.forEach(mutation => mutation.undo());
    }
}