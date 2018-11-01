import { property as tooltipProperty } from '../tooltip';
import {
    dataUrlProperty, nameProperty, valueProperty, onchangeProperty, onclickProperty, maxlengthProperty,
    placeholderProperty, typeProperty, readonlyProperty, requiredProperty, datetimeFormatProperty,
    showDatetimeProperty, labelProperty, helpTextProperty, inlineProperty, inputFieldInlineProperty
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
];

const radioProperties = [
    ...baseProperties,
    onclickProperty,
    valueProperty,
    inlineProperty
];

const checkboxProperties = [
    ...baseProperties,
    onclickProperty,
    valueProperty,
    inlineProperty
];

const textinputProperties = [
    ...commonProperties,
    typeProperty
];

const datetimeinputProperties = [
    ...commonProperties,
    datetimeFormatProperty,
    showDatetimeProperty
];

const fileinputProperties = [...baseProperties, dataUrlProperty];

const inputfieldProperties = [
    labelProperty,
    helpTextProperty,
    inputFieldInlineProperty
];

export {
    commonProperties, textinputProperties, fileinputProperties, datetimeinputProperties,
    radioProperties, checkboxProperties, inputfieldProperties
};