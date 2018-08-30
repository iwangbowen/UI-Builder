import Mutation from './mutation';

export default class CharacterDataMutation extends Mutation {
    constructor({ target, oldValue, newValue }) {
        super('characterData', target);
        this.oldValue = oldValue;
        this.newValue = newValue;
    }

    redo() {
        this.target.innerHTML = this.newValue;
    }

    undo() {
        this.target.innerHTML = this.oldValue;
    }
}