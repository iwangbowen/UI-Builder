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
import _ from 'lodash';

const datetimeinputfield = _.extend({}, input, {
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