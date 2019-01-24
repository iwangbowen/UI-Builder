import Mutation from './mutation';

export default class AttributesMutation extends Mutation {
    constructor({ type = 'attributes', target, attributeName, inputtype, oldValue, newValue }) {
        super(type, target);
        this.attributeName = attributeName;
        this.inputtype = inputtype;
        this.oldValue = oldValue;
        this.newValue = newValue;
    }

    undo() {
        if (this.oldValue || this.oldValue === false || this.oldValue === 0) {
            this.target.setAttribute(this.attributeName, this.oldValue);
        } else {
            this.target.removeAttribute(this.attributeName)
        }
        this.inputtype.undo(this.oldValue);
    }

    redo() {
        if (this.newValue || this.newValue === false || this.newValue === 0) {
            this.target.setAttribute(this.attributeName, this.newValue);
        } else {
            this.target.removeAttribute(this.attributeName)
        }
        this.inputtype.redo(this.newValue);
    }
}