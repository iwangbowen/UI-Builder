const alwaysTrue = () => true;

// this refers to html element
function removeTag({ name, filter = alwaysTrue }) {
    Array.from(this.getElementsByTagName(name))
        .filter(filter)
        .forEach(tag => tag.parentNode.removeChild(tag));
}

function removeUnusedTags(html, tags) {
    const el = document.createElement('html');
    el.innerHTML = html;
    tags.forEach(removeTag, el);

    return $(el).prop('outerHTML');
}

export { removeUnusedTags };