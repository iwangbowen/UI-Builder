import unusedTags from './unusedTags';
import { emptyChildrenSelectors, tableSelector, autoselectinputSelector } from './selectors';
import tableTemplate from '../templates/table';
import autoselectinputTemplate from '../templates/autoselectinput';
import submitFormTemplate from '../templates/submitform';
import table from '../components/@oee/table';
import { calendarSelector, setOnclickAttr } from './calendar';

const alwaysTrue = () => true;

// this refers to html element
function removeTag({ name, filter = alwaysTrue }) {
    Array.from(this.getElementsByTagName(name))
        .filter(filter)
        .forEach(tag => tag.parentNode.removeChild(tag));
}

function removeUnusedTags(el) {
    unusedTags.forEach(removeTag, el);
    return el;
}

function emptyChildren(el) {
    $(el).find(emptyChildrenSelectors.join(', ')).empty();
    return el;
}

function appendScript(el, jsStr) {
    jsStr && $('<script></script>').text(jsStr).appendTo($(el).find('body'));
    return el;
}

function generateTableScript(el) {
    const jsStr = Array.from($(el).find(tableSelector)).reduce((prev, element) => {
        return `${prev}
                ${tableTemplate($(element), table)}`;
    }, '');
    return appendScript(el, jsStr);
}

function generateCalendarOnclickAttr(el) {
    $(el).find(calendarSelector).each(function () {
        $(this).attr('onclick') || setOnclickAttr(this);
    });
    return el;
}

function generateSelectOptionsScript(el) {
    return appendScript(el, autoselectinputTemplate());
}

function generateSubmitFormScript() {

}

export {
    removeUnusedTags, emptyChildren, generateTableScript, generateCalendarOnclickAttr,
    generateSelectOptionsScript, generateSubmitFormScript
};