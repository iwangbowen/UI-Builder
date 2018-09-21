import { inputTypeNames } from '../inputTypes';
import { dataComponentId, sortableClass } from '../common';
import {
    cloneWithoutOnclick, getDateFmt, getParsedConfigInfo,
    setDataConfigInfo, setOnclickAttr
} from '../../util/dataAttr';
import input from './input';
import { datetimeinputfieldid } from './ids';
import span from './span';
import datetimeinput from './datetimeinput';

const datetimeinputfield = $.extend({}, input, {
    name: "Datetime Input Field",
    attributes: { "type": inputTypeNames },
    image: "icons/calendar.svg",
    sortable: true,
    html: `<div class="form-item ${sortableClass}" ${dataComponentId}="${datetimeinputfieldid}">
               ${span.html}
               ${datetimeinput.html}
           </div>`
});

export default datetimeinputfield;