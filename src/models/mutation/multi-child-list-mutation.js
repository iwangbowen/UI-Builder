import Mutation from './mutation';

export default class MultiChildListMutation extends Mutation {
    constructor() {
        super('multiChildList', null);
        this.multiChildListMutation = [];
    }

    addChildListMutation(childListMutation) {
        this.multiChildListMutation.push(childListMutation);
    }

    redo() {
        this.multiChildListMutation.forEach(mutation => mutation.redo());
    }

    undo() {
        this.multiChildListMutation.forEach(mutation => mutation.undo());
    }
}