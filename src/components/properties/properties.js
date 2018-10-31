import { TextInput, SelectInput, ToggleInput, NumberInput, LinkInput } from "../../inputs/inputs";
import {
    dataRowField, dataValueMapping, dataTextMapping, formText, textMuted, formCheckInline,
    btnBlock, changeNodeName, headingReg, bgcolorClasses, bgcolorSelectOptions, deletableComponent
} from "../common";
import { inputTypes } from '../inputTypes';
import {
    cloneWithoutOnclick, getDateFmt, getParsedConfigInfo,
    setDataConfigInfo, setOnclickAttr
} from '../../util/dataAttr';
import { requiredSpanSelector, inputBlockClassSelector } from "../../util/selectors";

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

const buttonSizeProperty = {
    name: "Size",
    key: "size",
    htmlAttr: "class",
    inputtype: new SelectInput(),
    validValues: ["btn-lg", "btn-sm"],
    data: {
        options: [{
            value: "",
            text: "Default"
        }, {
            value: "btn-lg",
            text: "Large"
        }, {
            value: "btn-sm",
            text: "Small"
        }]
    }
};

const targetProperty = {
    name: "Target",
    key: "target",
    htmlAttr: "target",
    inputtype: new TextInput()
};

const buttonDisabledProperty = {
    name: "Disabled",
    key: "disabled",
    htmlAttr: "class",
    inputtype: new ToggleInput(),
    validValues: ["disabled"],
    data: {
        on: "disabled",
        off: ""
    }
};

const linkToProperty = {
    name: "Link To",
    key: "href",
    htmlAttr: "href",
    inputtype: new LinkInput()
};

const buttonBlockProperty = {
    name: 'Block',
    key: 'block',
    htmlAttr: "class",
    inputtype: new ToggleInput(),
    validValues: [btnBlock],
    data: {
        on: btnBlock,
        off: ""
    }
}

const buttonTypeProperty = {
    name: "Type",
    key: "type",
    htmlAttr: "class",
    inputtype: new SelectInput(),
    validValues: ["btn-default", "btn-primary", "btn-info", "btn-success", "btn-warning", "btn-info", "btn-light", "btn-dark", "btn-outline-primary", 'btn-outline-secondary', "btn-outline-info", "btn-outline-success", "btn-outline-warning", "btn-outline-info", "btn-outline-light", "btn-outline-dark", "btn-link"],
    data: {
        options: [{
            value: "btn-default",
            text: "Default"
        }, {
            value: "btn-primary",
            text: "Primary"
        }, {
            value: "btn btn-info",
            text: "Info"
        }, {
            value: "btn-success",
            text: "Success"
        }, {
            value: "btn-warning",
            text: "Warning"
        }, {
            value: "btn-info",
            text: "Info"
        }, {
            value: "btn-light",
            text: "Light"
        }, {
            value: "btn-dark",
            text: "Dark"
        }, {
            value: "btn-outline-primary",
            text: "Primary outline"
        }, {
            value: 'btn-outline-secondary',
            text: 'Secondary outline'
        }, {
            value: "btn btn-outline-info",
            text: "Info outline"
        }, {
            value: "btn-outline-success",
            text: "Success outline"
        }, {
            value: "btn-outline-warning",
            text: "Warning outline"
        }, {
            value: "btn-outline-info",
            text: "Info outline"
        }, {
            value: "btn-outline-light",
            text: "Light outline"
        }, {
            value: "btn-outline-dark",
            text: "Dark outline"
        }, {
            value: "btn-link",
            text: "Link"
        }]
    }
};

const textProperty = {
    name: 'Text',
    key: 'text',
    htmlAttr: 'text',
    inputtype: new TextInput()
};

const forProperty = {
    name: "For",
    key: "for",
    htmlAttr: "for",
    inputtype: new TextInput()
};

const labelProperty = {
    name: 'Label',
    key: 'label',
    inputtype: new TextInput(),
    init(node) {
        return $(node).children('label').text();
    },
    onChange(node, value) {
        if ($(node).children('label').length) {
            $(node).children('label').text(value);
        } else {
            $(`<label class="${deletableComponent}">${value}</label>`).prependTo(node);
        }
    }
};

const helpTextProperty = {
    name: 'Help Text',
    key: 'helpText',
    inputtype: new TextInput(),
    init(node) {
        return $(node).children('small').text();
    },
    onChange(node, value) {
        if ($(node).children('small').length) {
            $(node).children('small').text(value);
        } else {
            $(`<small class="${formText} ${textMuted} ${deletableComponent}">${value}</small>`).appendTo(node);
        }
    }
};

function getInput(node) {
    return $(node).is('input') ? node : $(node).children('input');
}

const inlineProperty = {
    name: 'Inline',
    key: 'inline',
    validValues: ['inline'],
    inputtype: new ToggleInput(),
    init(node) {
        node = getInput(node);
        return $(node).parent().hasClass(formCheckInline) ?
            this.validValues : [];
    },
    onChange(node) {
        node = getInput(node);
        $(node).parent().toggleClass(formCheckInline);
        return node;
    },
    data: {
        on: 'inline',
        off: ''
    }
};

const alertTypeProperty = {
    name: "Type",
    key: "type",
    htmlAttr: "class",
    validValues: ["alert-primary", "alert-secondary", "alert-success", "alert-danger", "alert-warning", "alert-info", "alert-light", "alert-dark"],
    inputtype: new SelectInput(),
    data: {
        options: [{
            value: "alert-primary",
            text: "Default"
        }, {
            value: "alert-secondary",
            text: "Secondary"
        }, {
            value: "alert-success",
            text: "Success"
        }, {
            value: "alert-danger",
            text: "Danger"
        }, {
            value: "alert-warning",
            text: "Warning"
        }, {
            value: "alert-info",
            text: "Info"
        }, {
            value: "alert-light",
            text: "Light"
        }, {
            value: "alert-dark",
            text: "Dark"
        }]
    }
};

const buttonGroupSizeProperty = {
    name: "Size",
    key: "size",
    htmlAttr: "class",
    inputtype: new SelectInput(),
    validValues: ["btn-group-lg", "btn-group-sm"],
    data: {
        options: [{
            value: "",
            text: "Default"
        }, {
            value: "btn-group-lg",
            text: "Large"
        }, {
            value: "btn-group-sm",
            text: "Small"
        }]
    }
};

const buttonGroupAlignmentProperty = {
    name: "Alignment",
    key: "alignment",
    htmlAttr: "class",
    inputtype: new SelectInput(),
    validValues: ["btn-group", "btn-group-vertical"],
    data: {
        options: [{
            value: "",
            text: "Default"
        }, {
            value: "btn-group",
            text: "Horizontal"
        }, {
            value: "btn-group-vertical",
            text: "Vertical"
        }]
    }
};

const headingSizeProperty = {
    name: "Size",
    key: "id",
    htmlAttr: "id",
    inputtype: new SelectInput(),
    onChange: function (node, value) {
        return changeNodeName(node, "h" + value);
    },
    init: function (node) {
        const result = headingReg.exec(node.nodeName);
        if (result && result[1]) {
            return result[1]
        }
        return 1;
    },

    data: {
        options: [{
            value: "1",
            text: "1"
        }, {
            value: "2",
            text: "2"
        }, {
            value: "3",
            text: "3"
        }, {
            value: "4",
            text: "4"
        }, {
            value: "5",
            text: "5"
        }, {
            value: "6",
            text: "6"
        }]
    },
};

const backgroundProperty = {
    name: "Background",
    key: "background",
    htmlAttr: "class",
    validValues: bgcolorClasses,
    inputtype: new SelectInput(),
    data: {
        options: bgcolorSelectOptions
    }
};

const progressBarProperty = {
    name: "Progress",
    key: "background",
    child: ".progress-bar",
    htmlAttr: "class",
    validValues: ["", "w-25", "w-50", "w-75", "w-100"],
    inputtype: new SelectInput(),
    data: {
        options: [{
            value: "",
            text: "None"
        }, {
            value: "w-25",
            text: "25%"
        }, {
            value: "w-50",
            text: "50%"
        }, {
            value: "w-75",
            text: "75%"
        }, {
            value: "w-100",
            text: "100%"
        }]
    }
};

const progressBackgroundProperty = {
    name: "Progress background",
    key: "background",
    child: ".progress-bar",
    htmlAttr: "class",
    validValues: bgcolorClasses,
    inputtype: new SelectInput(),
    data: {
        options: bgcolorSelectOptions
    }
};

const progressStripedProperty = {
    name: "Striped",
    key: "striped",
    child: ".progress-bar",
    htmlAttr: "class",
    validValues: ["", "progress-bar-striped"],
    inputtype: new ToggleInput(),
    data: {
        on: "progress-bar-striped",
        off: "",
    }
};

const progressAnimatedProperty = {
    name: "Animated",
    key: "animated",
    child: ".progress-bar",
    htmlAttr: "class",
    validValues: ["", "progress-bar-animated"],
    inputtype: new ToggleInput(),
    data: {
        on: "progress-bar-animated",
        off: "",
    }
};

const tableTypeProperty = {
    name: "Type",
    key: "type",
    htmlAttr: "class",
    validValues: ["table-primary", "table-secondary", "table-success", "table-danger", "table-warning", "table-info", "table-light", "table-dark", "table-white"],
    inputtype: new SelectInput(),
    data: {
        options: [{
            value: "Default",
            text: ""
        }, {
            value: "table-primary",
            text: "Primary"
        }, {
            value: "table-secondary",
            text: "Secondary"
        }, {
            value: "table-success",
            text: "Success"
        }, {
            value: "table-danger",
            text: "Danger"
        }, {
            value: "table-warning",
            text: "Warning"
        }, {
            value: "table-info",
            text: "Info"
        }, {
            value: "table-light",
            text: "Light"
        }, {
            value: "table-dark",
            text: "Dark"
        }, {
            value: "table-white",
            text: "White"
        }]
    }
};

const tableResponsiveProperty = {
    name: "Responsive",
    key: "responsive",
    htmlAttr: "class",
    validValues: ["table-responsive"],
    inputtype: new ToggleInput(),
    data: {
        on: "table-responsive",
        off: ""
    }
};

const tableSmallProperty = {
    name: "Small",
    key: "small",
    htmlAttr: "class",
    validValues: ["table-sm"],
    inputtype: new ToggleInput(),
    data: {
        on: "table-sm",
        off: ""
    }
};

const tableHoverProperty = {
    name: "Hover",
    key: "hover",
    htmlAttr: "class",
    validValues: ["table-hover"],
    inputtype: new ToggleInput(),
    data: {
        on: "table-hover",
        off: ""
    }
};

const tableBorderedProperty = {
    name: "Bordered",
    key: "bordered",
    htmlAttr: "class",
    validValues: ["table-bordered"],
    inputtype: new ToggleInput(),
    data: {
        on: "table-bordered",
        off: ""
    }
};

const tableStripedProperty = {
    name: "Striped",
    key: "striped",
    htmlAttr: "class",
    validValues: ["table-striped"],
    inputtype: new ToggleInput(),
    data: {
        on: "table-striped",
        off: ""
    }
};

const tableInverseProperty = {
    name: "Inverse",
    key: "inverse",
    htmlAttr: "class",
    validValues: ["table-inverse"],
    inputtype: new ToggleInput(),
    data: {
        on: "table-inverse",
        off: ""
    }
};

const tableHeadOptions = {
    name: "Head options",
    key: "head",
    htmlAttr: "class",
    child: "thead",
    inputtype: new SelectInput(),
    validValues: ["", "thead-inverse", "thead-default"],
    data: {
        options: [{
            value: "",
            text: "None"
        }, {
            value: "thead-default",
            text: "Default"
        }, {
            value: "thead-inverse",
            text: "Inverse"
        }]
    }
};

const tableRowTypeProperty = {
    name: "Type",
    key: "type",
    htmlAttr: "class",
    inputtype: new SelectInput(),
    validValues: ["", "success", "danger", "warning", "active"],
    data: {
        options: [{
            value: "",
            text: "Default"
        }, {
            value: "success",
            text: "Success"
        }, {
            value: "error",
            text: "Error"
        }, {
            value: "warning",
            text: "Warning"
        }, {
            value: "active",
            text: "Active"
        }]
    }
};

const tableHeadTypeProperty = {
    name: "Type",
    key: "type",
    htmlAttr: "class",
    inputtype: new SelectInput(),
    validValues: ["", "success", "danger", "warning", "info"],
    data: {
        options: [{
            value: "",
            text: "Default"
        }, {
            value: "success",
            text: "Success"
        }, {
            value: "anger",
            text: "Error"
        }, {
            value: "warning",
            text: "Warning"
        }, {
            value: "info",
            text: "Info"
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
    formStyleProperty,
    buttonSizeProperty,
    buttonDisabledProperty,
    targetProperty,
    linkToProperty,
    buttonTypeProperty,
    textProperty,
    forProperty,
    labelProperty,
    helpTextProperty,
    inlineProperty,
    buttonBlockProperty,
    alertTypeProperty,
    buttonGroupSizeProperty,
    buttonGroupAlignmentProperty,
    headingSizeProperty,
    backgroundProperty,
    progressBarProperty,
    progressBackgroundProperty,
    progressStripedProperty,
    progressAnimatedProperty,
    tableBorderedProperty,
    tableHeadOptions,
    tableHoverProperty,
    tableInverseProperty,
    tableResponsiveProperty,
    tableSmallProperty,
    tableStripedProperty,
    tableTypeProperty,
    tableRowTypeProperty,
    tableHeadTypeProperty
};