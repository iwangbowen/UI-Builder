import Mutation from './mutation';

export default class AlignMutation extends Mutation {
    constructor({ type = 'Align', target }) {
        super(type, target);
        this.oldStyle = target.getAttribute('style');
    }

    onAlignEnd() {
        this.newStyle = this.target.getAttribute('style');
    }

    redo() {
        this.target.setAttribute('style', this.newStyle);
    }

    undo() {
        this.target.setAttribute('style', this.oldStyle);
    }
}