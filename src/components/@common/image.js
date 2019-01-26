import { imageProperties as properties } from '../properties/image';
import { configurableComponent, draggableComponent } from '../common';
import { imagePlaceholder } from '../../common';

const width = '135';
const height = '150';

const image = {
    nodes: ['img'],
    name: 'Image',
    html: `<img class="${configurableComponent} ${draggableComponent}" src="${imagePlaceholder}" style="width: ${width}px; height: ${height}px">`,
    image: "icons/image.svg",
    properties
};

export default image;