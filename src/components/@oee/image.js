import { imageProperties as properties } from '../properties/image';
import { configurableComponent } from '../common';
import { imagePlaceholder } from '../../common';

const width = '135';
const height = '150';

const image = {
    nodes: ['img'],
    name: 'Image',
    html: `<img class="${configurableComponent}" src="${imagePlaceholder}" height="${height}" width="${width}">`,
    width: `${width}px`,
    height: `${height}px`,
    image: "icons/image.svg",
    properties
};

export default image;