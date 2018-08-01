import { dataConfigInfo, dataCalendarId, dataMultivalueSelectId } from '../components/common';
import $ from '../../js/jquery.min';

const dataUrl = 'data-url';
const calendarSelector = `input[${dataCalendarId}]`;
const calendarOnclickSelector = `input[${dataCalendarId}][onclick]`;
const multivalueSelectSelector = `select[${dataMultivalueSelectId}]`;

// <input data-id="{'a', b}"> 替换包含'\''的属性值为合法的json字符串
function getDataConfigInfo(node) {
    return $(node).attr(dataConfigInfo);
}

function getDataConfigInfoJSONString(node) {
    return getDataConfigInfo(node).replace(/'/g, '"');
}

function setDataConfigInfo(node, newValue) {
    $(node).attr(dataConfigInfo, JSON.stringify(newValue).replace(/"/g, '\''));
}

function setOnclickAttr(node) {
    return $(node).attr('onclick', `WdatePicker(${getDataConfigInfo(node)})`);
}

function getParsedConfigInfo(node) {
    return JSON.parse(getDataConfigInfoJSONString(node));
}

function getDateFmt(node) {
    return getParsedConfigInfo(node).dateFmt;
}

function cloneWithoutOnclick(node) {
    const $clone = $(node).removeAttr('onclick').clone();
    $(node).replaceWith($clone);
    return $clone;
}

function replaceOtherShowingCalendarInputs(element, context) {
    if (!$(element).is(calendarOnclickSelector)) {
        context.find(calendarOnclickSelector).each(function () {
            cloneWithoutOnclick(this);
        });
    }
}

export {
    replaceOtherShowingCalendarInputs, cloneWithoutOnclick,
    calendarSelector, calendarOnclickSelector,
    getDataConfigInfo, getDateFmt, getParsedConfigInfo,
    setOnclickAttr, setDataConfigInfo, dataUrl, multivalueSelectSelector
};