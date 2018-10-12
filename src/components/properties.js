import { TextInput, SelectInput, ToggleInput, NumberInput } from "../inputs/inputs";
import { dataRowField, dataValueMapping, dataTextMapping } from "./common";
import { inputTypes } from './inputTypes';
import {
    cloneWithoutOnclick, getDateFmt, getParsedConfigInfo,
    setDataConfigInfo, setOnclickAttr
} from '../util/dataAttr';
import { requiredSpanSelector, inputBlockClassSelector } from "../util/selectors";

const dataRowFieldProperty = {
    name: 'Row Field',
    key: 'dataRowField',
    htmlAttr: dataRowField,
    inputtype: new TextInput()
};

const dataUrlProperty = {
    name: 'Data Url',
    key: 'dataUrl',
    htmlAttr: 'data-url',
    inputtype: new TextInput()
};

const valueProperty = {
    name: "Value",
    key: "value",
    htmlAttr: "value",
    inputtype: new TextInput()
};

const onchangeProperty = {
    name: 'Onchange',
    key: 'onchange',
    htmlAttr: 'onchange',
    inputtype: new TextInput()
};

const onclickProperty = {
    name: 'Onclick',
    key: 'onclick',
    htmlAttr: 'onclick',
    inputtype: new TextInput()
};

const maxlengthProperty = {
    name: 'Maxlength',
    key: 'maxlength',
    htmlAttr: 'maxlength',
    inputtype: new NumberInput()
};

const placeholderProperty = {
    name: "Placeholder",
    key: "placeholder",
    htmlAttr: "placeholder",
    inputtype: new TextInput()
};

const nameProperty = {
    name: 'Name',
    key: 'name',
    htmlAttr: 'name',
    inputtype: new TextInput()
};

const typeProperty = {
    name: 'Type',
    key: 'type',
    htmlAttr: 'type',
    inputtype: new SelectInput(),
    data: {
        options: inputTypes
    }
};

const readonlyProperty = {
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
};

const requiredProperty = {
    name: "Required",
    key: "required",
    htmlAttr: 'required',
    validValues: ["required"],
    noValueAttr: true,
    inputtype: new ToggleInput(),
    onChange(node, value) {
        if (value) {
            node.attr(this.htmlAttr, value);
        } else {
            node.removeAttr(this.htmlAttr);
        }
        node.parents(inputBlockClassSelector).prev().find(requiredSpanSelector).toggle();
        return node;
    },
    data: {
        on: 'required',
        off: ''
    }
};

const datetimeFormatProperty = {
    name: "Date Format",
    key: "dateFmt",
    inputtype: new SelectInput(),
    init: getDateFmt,
    onChange: function (node, value) {
        const configInfo = getParsedConfigInfo(node)
        configInfo.dateFmt = value;
        setDataConfigInfo(node, configInfo);
        if (node.attr('onclick')) {
            return setOnclickAttr(cloneWithoutOnclick(node));
        }
        return node;
    },
    data: {
        options: [{
            value: 'yyyy-MM-dd HH:mm',
            text: 'yyyy-MM-dd HH:mm'
        }, {
            value: 'yyyy-MM-dd HH:mm:ss',
            text: 'yyyy-MM-dd HH:mm:ss'
        }, {
            value: 'yyyy-MM-dd',
            text: 'yyyy-MM-dd'
        }, {
            value: 'yyyyMMdd',
            text: 'yyyyMMdd'
        }, {
            value: 'yyyyMM',
            text: 'yyyyMM'
        }, {
            value: 'yyyy',
            text: 'yyyy'
        }]
    }
};

const showDatetimeProperty = {
    name: "Show Datetime",
    key: "showDatetime",
    validValues: ["table-responsive"],
    inputtype: new ToggleInput(),
    onChange(node, value) {
        if (value == 'on') {
            setOnclickAttr(node);
        } else {
            cloneWithoutOnclick(node);
        }
    },
    data: {
        on: 'on',
        off: 'off'
    }
};

const valueMappingProperty = {
    name: 'Value Mapping',
    key: 'valueMapping',
    htmlAttr: dataValueMapping,
    inputtype: new TextInput()
};
const textMappingProperty = {
    name: 'Text Mapping',
    key: 'textMaping',
    htmlAttr: dataTextMapping,
    inputtype: new TextInput()
};

const actionProperty = {
    name: 'Action',
    key: 'action',
    htmlAttr: 'action',
    inputtype: new TextInput()
};

const methodProperty = {
    name: 'Method',
    key: 'method',
    htmlAttr: 'method',
    inputtype: new TextInput()
};

const formStyleProperty = {
    name: "Style",
    key: "style",
    htmlAttr: "class",
    validValues: ["", "form-search", "form-inline", "form-horizontal"],
    inputtype: new SelectInput(),
    data: {
        options: [{
            value: "",
            text: "Default"
        }, {
            value: "form-search",
            text: "Search"
        }, {
            value: "form-inline",
            text: "Inline"
        }, {
            value: "form-horizontal",
            text: "Horizontal"
        }]
    }
};

export {
    dataRowFieldProperty,
    dataUrlProperty,
    valueProperty,
    onchangeProperty,
    onclickProperty,
    maxlengthProperty,
    placeholderProperty,
    nameProperty,
    typeProperty,
    readonlyProperty,
    requiredProperty,
    datetimeFormatProperty,
    showDatetimeProperty,
    valueMappingProperty,
    textMappingProperty,
    actionProperty,
    methodProperty,
    formStyleProperty
};