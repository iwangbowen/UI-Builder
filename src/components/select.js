import { ButtonInput, TextValueInput } from '../inputs/inputs';
import { property as tooltipProperty } from './tooltip';
import { manualselectinputid } from './@oee/ids';
import Vvveb from '../gui/components';
import {
    dataRowFieldProperty, dataUrlProperty, onchangeProperty, nameProperty,
    requiredProperty, valueMappingProperty, textMappingProperty
} from './properties';

const baseProperties = [
    nameProperty,
    requiredProperty,
    tooltipProperty,
    dataRowFieldProperty,
    onchangeProperty
];

const manualselectProperties = [
    ...baseProperties,
    {
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
    }
];

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

const autoselectProperties = [
    ...baseProperties,
    dataUrlProperty,
    valueMappingProperty,
    textMappingProperty
];

export {
    manualselectProperties,
    manualselectBeforeInit,
    autoselectProperties
};