import Vvveb from '../../gui/builder'
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
        inputtype: new FileUploadInput()
    }, {
        name: "Width",
        key: "width",
        htmlAttr: "width",
        inputtype: new TextInput()
    }, {
        name: "Height",
        key: "height",
        htmlAttr: "height",
        inputtype: new TextInput()
    }, {
        name: "Alt",
        key: "alt",
        htmlAttr: "alt",
        inputtype: new TextInput()
    }]
};

export default image;