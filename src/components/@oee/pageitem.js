import { TextInput, ToggleInput } from '../../inputs/inputs';

const pageitem = {
    classes: ["page-item"],
    html: '<li class="page-item"><a class="page-link" href="#">1</a></li>',
    name: "Pagination Item",
    properties: [{
        name: "Link To",
        key: "href",
        htmlAttr: "href",
        child: ".page-link",
        inputtype: new TextInput()
    }, {
        name: "Disabled",
        key: "disabled",
        htmlAttr: "class",
        validValues: ["disabled"],
        inputtype: new ToggleInput(),
        data: {
            on: "disabled",
            off: ""
        }
    }]
};

export default pageitem;