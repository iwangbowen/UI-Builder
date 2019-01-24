import Mutation from './mutation';

export default class MultiChildListMutation extends Mutation {
    constructor({type = 'multiChildList'}) {
        super(type, null);
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