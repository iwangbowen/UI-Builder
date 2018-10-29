import { property as tooltipProperty } from '../tooltip';
import {
    dataUrlProperty, nameProperty, valueProperty, onchangeProperty, onclickProperty, maxlengthProperty,
    placeholderProperty, typeProperty, readonlyProperty, requiredProperty, datetimeFormatProperty,
    showDatetimeProperty, labelProperty, helpTextProperty
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
    valueProperty
];

const checkboxProperties = [
    ...baseProperties,
    onclickProperty,
    valueProperty
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
    helpTextProperty
];

export {
    commonProperties, textinputProperties, fileinputProperties, datetimeinputProperties,
    radioProperties, checkboxProperties, inputfieldProperties
};