import Vvveb from '../../builder';
import { TextValueInput, ButtonInput, TextInput } from '../../inputs/inputs';
import { manualselectinputid } from './ids';
import { dataComponentId } from '../common';
import $ from '../../../js/jquery.min';

const autoselectinput = {
    nodes: ["select"],
    name: "Manual Select Input",
    image: "icons/select_input.svg",
    html: `<div class="everyOutbox-right draggable">
            <div class="btn-group">
                <div class="dailyBox">
                    <select ${dataComponentId}="${manualselectinputid}" class="form-control fundodooSelect" lustyle="height:2.8rem;width:13rem">
                        <option value="value1">Text 1</option>
                        <option value="value2">Text 2</option>
                    </select>
                </div>
            </div>
           </div>
    `,
    beforeInit: function (node) {
        properties = [];
        var i = 0;

        $(node).find('option').each(function () {

            data = { "value": this.value, "text": this.text };

            i++;
            properties.push({
                name: "Option " + i,
                key: "option" + i,
                //index: i - 1,
                optionNode: this,
                inputtype: TextValueInput,
                data: data,
                onChange: function (node, value, input) {

                    option = $(this.optionNode);

                    //if remove button is clicked remove option and render row properties
                    if (input.nodeName == 'BUTTON') {
                        option.remove();
                        Vvveb.Components.render(manualselectinputid);
                        return node;
                    }

                    if (input.name == "value") option.attr("value", value);
                    else if (input.name == "text") option.text(value);

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
    },

    properties: [{
        name: 'Onchange',
        key: 'onchange',
        htmlAttr: 'onchange',
        inputtype: TextInput
    }, {
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: TextInput
    }, {
        name: "Add option",
        key: "addChild",
        inputtype: ButtonInput,
        data: { text: "Add option" },
        onChange: function (node) {
            $(node).append('<option value="value">Text</option>');
            //render component properties again to include the new column inputs
            Vvveb.Components.render(manualselectinputid);
            return node;
        }
    }]
};

export default autoselectinput;