function getPositionedParent($element) {
    if (!$element.length || $element.css('position') == 'absolute'
        || $element.css('position') == 'relative' || $element.css('position') == 'fixed') {
        return $element;
    } else {
        return getPositionedParent($element.parent());
    }
}

export { getPositionedParent };