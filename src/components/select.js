import { ButtonInput, TextInput, TextValueInput, ToggleInput } from '../inputs/inputs';
import { property as tooltipProperty } from './tooltip';
import { manualselectinputid } from './@oee/ids';
import Vvveb from '../gui/components';
import { dataUrl, dataValueMapping, dataTextMapping } from './common';

const manualselectProperties = [
    {
        name: 'Onchange',
        key: 'onchange',
        htmlAttr: 'onchange',
        inputtype: new TextInput()
    }, {
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: new TextInput()
    }, {
        name: "Add option",
        key: "addChild",
        inputtype: new ButtonInput(),
        data: { text: "Add option" },
        onChange: function (node) {
            $(node).append('<option value="value">Text</option>');
            //render component properties again to include the new column inputs
            Vvveb.Components.render(manualselectinputid);
            return node;
        }
    }, {
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
    }, tooltipProperty];

function manualselectBeforeInit(node) {
    const properties = [];
    let i = 0;
    $(node).find('option').each(function () {
        const data = { "value": this.value, "text": this.text };
        i++;
        properties.push({
            name: "Option " + i,
            key: "option" + i,
            //index: i - 1,
            optionNode: this,
            inputtype: new TextValueInput(),
            data,
            onChange: function (node, value, input) {
                const option = $(this.optionNode);
                //if remove button is clicked remove option and render row properties
                if (input.nodeName == 'BUTTON') {
                    option.remove();
                    Vvveb.Components.render(manualselectinputid);
                    return node;
                }
                if (input.name == "value") {
                    option.attr("value", value);
                } else if (input.name == "text") {
                    option.text(value);
                }
                return node;
            },
        });
    });
    //remove all option properties
    this.properties = this.properties.filter(function (item) {
        return item.key.indexOf("option") === -1;
    });
    //add remaining properties to generated column properties
    properties.push(...this.properties);
    this.properties = properties;
    return node;
}

const autoselectProperties = [{
    name: 'Value Mapping',
    key: 'valueMapping',
    htmlAttr: dataValueMapping,
    inputtype: new TextInput()
}, {
    name: 'Text Mapping',
    key: 'textMaping',
    htmlAttr: dataTextMapping,
    inputtype: new TextInput()
}, {
    name: "Data Url",
    key: "dataUrl",
    htmlAttr: dataUrl,
    inputtype: new TextInput()
}, {
    name: 'Onchange',
    key: 'onchange',
    htmlAttr: 'onchange',
    inputtype: new TextInput()
}, {
    name: "Name",
    key: "name",
    htmlAttr: "name",
    inputtype: new TextInput()
}, {
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
}, tooltipProperty];

export {
    manualselectProperties,
    manualselectBeforeInit,
    autoselectProperties
};