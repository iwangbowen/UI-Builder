import { imageProperties as properties } from '../properties/image';
import { configurableComponent } from '../common';

const width = '135';
const height = '150';

const image = {
    nodes: ["img"],
    name: "Image",
    html: `<img class="${configurableComponent}" src="../../../../libs/builder/icons/image.svg" height="${height}" width="${width}">`,
    width: `${width}px`,
    height: `${height}px`,
    /*
    afterDrop: function (node)
	{
		node.attr("src", '');
		return node;
	},*/
    image: "icons/image.svg",
    properties
};

export default image;