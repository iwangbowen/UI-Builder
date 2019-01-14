import { dataComponentId, draggableComponent, dataEnableRowClick } from '../common';
import { table } from './table';
import Vvveb from '../../gui/components';
import { customtableid } from './ids';
import extend from 'lodash/extend';

const customtable = extend({}, table, {
    name: "Custom ag-Grid",
    html: `<div ${dataComponentId}="${customtableid}" style="width: 500px; height: 200px;" class="${draggableComponent} draggable ag-theme-blue"></div>`,
    onDrop(node) {
        $(node)
            .css({
                height: '100%',
                width: '100%',
                position: '',
                left: '',
                top: '',
                transform: ''
            })
            .removeClass('draggable');
        const appendToElement = Vvveb.Builder.frameBody.find('.containerRight .allContent .topContent .container .row .everyBox .boxarea .userList #myGrid');
        appendToElement.append($(node).prop('outerHTML'));
        return appendToElement.children('*:last');
    }
});

export default customtable;