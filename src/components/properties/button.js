import {
    buttonSizeProperty, targetProperty, onclickProperty, dataUrlProperty,
    buttonDisabledProperty, buttonTypeProperty, linkToProperty, textProperty,
    buttonBlockProperty, buttonGroupSizeProperty, buttonGroupAlignmentProperty,
    enableButtonClickPopupProperty
} from './properties';

const buttonProperties = [
    textProperty,
    linkToProperty,
    buttonTypeProperty,
    buttonSizeProperty,
    targetProperty,
    onclickProperty,
    dataUrlProperty,
    enableButtonClickPopupProperty,
    buttonDisabledProperty,
    buttonBlockProperty
];

const buttonGroupProperties = [
    buttonGroupSizeProperty,
    buttonGroupAlignmentProperty
];

const roundedButtonProperty = [
    linkToProperty,
    buttonTypeProperty,
    buttonSizeProperty,
    targetProperty,
    onclickProperty,
    dataUrlProperty,
    enableButtonClickPopupProperty,
    buttonDisabledProperty,
    buttonBlockProperty
];

export {
    buttonProperties,
    roundedButtonProperty,
    buttonGroupProperties
};