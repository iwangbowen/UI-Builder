import { TextInput, SelectInput, NumberInput, ToggleInput } from '../inputs/inputs';
import { property as tooltipProperty } from './tooltip';
import { inputTypes } from './inputTypes';
import { dataRowFieldProperty } from './properties';

const properties = [{
    name: "Value",
    key: "value",
    htmlAttr: "value",
    inputtype: new TextInput()
}, {
    name: 'Onchange',
    key: 'onchange',
    htmlAttr: 'onchange',
    inputtype: new TextInput()
}, {
    name: 'Maxlength',
    key: 'maxlength',
    htmlAttr: 'maxlength',
    inputtype: new NumberInput()
}, tooltipProperty, {
    name: "Placeholder",
    key: "placeholder",
    htmlAttr: "placeholder",
    inputtype: new TextInput()
}, {
    name: 'Name',
    key: 'name',
    htmlAttr: 'name',
    inputtype: new TextInput()
}, {
    name: 'Type',
    key: 'type',
    htmlAttr: 'type',
    inputtype: new SelectInput(),
    data: {
        options: inputTypes
    }
}, {
    name: "Readonly",
    key: "readonly",
    htmlAttr: 'readonly',
    validValues: ["readonly"],
    noValueAttr: true,
    inputtype: new ToggleInput(),
    data: {
        on: 'readonly',
        off: ''
    }
}, dataRowFieldProperty, {
    name: "Required",
    key: "required",
    htmlAttr: 'required',
    validValues: ["required"],
    noValueAttr: true,
    inputtype: new ToggleInput(),
    data: {
        on: 'required',
        off: ''
    }
}];

export {
    properties
};