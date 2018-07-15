import unusedTags from './unusedTags';
import { emptyChildrenSelectors, tableSelector } from './emptyChildrenSelectors';
import template from '../templates/table';
import table from '../components/@oee/table';

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

function generateTableScript(el) {
    const jsStr = Array.from($(el).find(tableSelector)).reduce((prev, element) => {
        return `${prev}
                ${template($(element), table)}`;
    }, '');
    $('<script></script>').text(jsStr).appendTo($(el).find('body'));
    return el;
}

export { removeUnusedTags, emptyChildren, generateTableScript };