import Mutation from './mutation';
import { setColumnDefsAndRender, getColumnDefs } from '../../components/@common/table';

export default class TableHeaderMutation extends Mutation {
    constructor({ type = 'tableHeader', target, addHeader, colDef, index }) {
        super(type, target);
        this.addHeader = addHeader;
        this.colDef = colDef;
        this.index = index;
    }

    redo() {
        const colDefs = getColumnDefs(this.target);
        if (this.addHeader) {
            colDefs.push(this.colDef);
        } else {
            colDefs.splice(this.index, 1);
        }
        setColumnDefsAndRender(this.target, colDefs);
    }

    undo() {
        const colDefs = getColumnDefs(this.target);
        if (this.addHeader) {
            colDefs.pop();
        } else {
            colDefs.splice(this.index, 0, this.colDef);
        }
        setColumnDefsAndRender(this.target, colDefs);
    }
}