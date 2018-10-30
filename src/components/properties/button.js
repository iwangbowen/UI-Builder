import {
    buttonSizeProperty, targetProperty, onclickProperty, dataUrlProperty,
    buttonDisabledProperty, buttonTypeProperty, linkToProperty, textProperty,
    buttonBlockProperty, buttonGroupSizeProperty, buttonGroupAlignmentProperty
} from './properties';

const buttonProperties = [
    textProperty,
    linkToProperty,
    buttonTypeProperty,
    buttonSizeProperty,
    targetProperty,
    onclickProperty,
    dataUrlProperty,
    buttonDisabledProperty,
    buttonBlockProperty
];

const buttonGroupProperties = [
    buttonGroupSizeProperty,
    buttonGroupAlignmentProperty
];

export {
    buttonProperties,
    buttonGroupProperties
};