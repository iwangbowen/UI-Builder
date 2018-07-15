const bgcolorClasses = ["bg-primary", "bg-secondary", "bg-success", "bg-danger", "bg-warning", "bg-info", "bg-light", "bg-dark", "bg-white"];

const bgcolorSelectOptions =
    [{
        value: "Default",
        text: ""
    },
    {
        value: "bg-primary",
        text: "Primary"
    }, {
        value: "bg-secondary",
        text: "Secondary"
    }, {
        value: "bg-success",
        text: "Success"
    }, {
        value: "bg-danger",
        text: "Danger"
    }, {
        value: "bg-warning",
        text: "Warning"
    }, {
        value: "bg-info",
        text: "Info"
    }, {
        value: "bg-light",
        text: "Light"
    }, {
        value: "bg-dark",
        text: "Dark"
    }, {
        value: "bg-white",
        text: "White"
    }];

function changeNodeName(node, newNodeName) {
    var newNode;
    newNode = document.createElement(newNodeName);
    attributes = node.get(0).attributes;

    for (i = 0, len = attributes.length; i < len; i++) {
        newNode.setAttribute(attributes[i].nodeName, attributes[i].nodeValue);
    }

    $(newNode).append($(node).contents());
    $(node).replaceWith(newNode);

    return newNode;
}

let base_sort = 100;//start sorting for base component from 100 to allow extended properties to be first
function inc_base_sort() {
    return base_sort++;
}

const dataComponentId = 'data-component-id';
const dataTableId = 'data-table-id';

export { bgcolorClasses, bgcolorSelectOptions, changeNodeName, inc_base_sort, dataComponentId, dataTableId };
