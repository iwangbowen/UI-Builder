import { ToggleInput } from '../../inputs/inputs';

const breadcrumbitem = {
    classes: ["breadcrumb-item"],
    name: "Breadcrumb Item",
    html: '<li class="breadcrumb-item"><a href="#">Library</a></li>',
    properties: [{
        name: "Active",
        key: "active",
        htmlAttr: "class",
        validValues: ["", "active"],
        inputtype: new ToggleInput(),
        data: {
            on: "active",
            off: ""
        }
    }]
}

export default breadcrumbitem;