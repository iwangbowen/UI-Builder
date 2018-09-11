import Vvveb from '../../gui/components'
import { FileUploadInput, TextInput } from '../../inputs/inputs';

const image = {
    nodes: ["img"],
    name: "Image",
    html: '<img src="' + Vvveb.baseUrl + 'icons/image.svg" height="128" width="128">',
    /*
    afterDrop: function (node)
	{
		node.attr("src", '');
		return node;
	},*/
    image: "icons/image.svg",
    properties: [{
        name: "Image",
        key: "src",
        htmlAttr: "src",
        inputtype: FileUploadInput
    }, {
        name: "Width",
        key: "width",
        htmlAttr: "width",
        inputtype: TextInput
    }, {
        name: "Height",
        key: "height",
        htmlAttr: "height",
        inputtype: TextInput
    }, {
        name: "Alt",
        key: "alt",
        htmlAttr: "alt",
        inputtype: TextInput
    }]
};

export default image;