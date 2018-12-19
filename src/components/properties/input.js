import { property as tooltipProperty } from '../tooltip';
import {
    dataUrlProperty, nameProperty, valueProperty, onchangeProperty, onclickProperty, maxlengthProperty,
    placeholderProperty, typeProperty, readonlyProperty, requiredProperty, datetimeFormatProperty,
    showDatetimeProperty, labelProperty, helpTextProperty, inlineProperty, inputFieldInlineProperty, dataRowFieldProperty, inputSizeProperty
} from './properties';

const baseProperties = [
    nameProperty,
    tooltipProperty,
    readonlyProperty,
    requiredProperty
];

const commonProperties = [
    ...baseProperties,
    valueProperty,
    onchangeProperty,
    maxlengthProperty,
    placeholderProperty,
    dataRowFieldProperty,
    inputSizeProperty
];

const customRadioProperties = [
    ...baseProperties,
    onclickProperty,
    valueProperty
];

const radioProperties = [
    ...customRadioProperties,
    inlineProperty
];

const customCheckboxProperties = [
    ...baseProperties,
    onclickProperty,
    valueProperty
];

const checkboxProperties = [
    ...customCheckboxProperties,
    inlineProperty
];

const textinputProperties = [
    ...commonProperties,
    typeProperty
];

const datetimeinputProperties = [
    ...commonProperties,
    datetimeFormatProperty
];

const fileinputProperties = [...baseProperties, inputSizeProperty, dataUrlProperty];

const inputfieldProperties = [
    labelProperty,
    helpTextProperty,
    inputFieldInlineProperty
];

export {
    commonProperties, textinputProperties, fileinputProperties, datetimeinputProperties,
    radioProperties, checkboxProperties, inputfieldProperties, customRadioProperties,
    customCheckboxProperties
};