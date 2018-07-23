import { dataComponentId } from '../common';
import table from './table';
import Vvveb from '../../builder';
import { customtableid } from './ids';
import $ from '../../../js/jquery.min';

const customtable = $.extend({}, table, {
    name: "Custom ag-Grid",
    html: `<div ${dataComponentId}="${customtableid}" style="width: 500px; height: 200px;" class="draggable ag-theme-blue horizontal-stripes"></div>`,
    onDrop(node) {
        $(node)
            .css({
                height: 'calc(100% - 25px)',
                width: '100%',
                position: '',
                left: '',
                top: '',
                transform: ''
            })
            .removeClass('draggable');
        Vvveb.Builder.frameBody.find('.containerRight .allContent .topContent .container .row .everyBox .boxarea').append($(node).prop('outerHTML'));
        $(node).remove();
    }
});

export default customtable;