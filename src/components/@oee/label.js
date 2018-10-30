import { dataComponentId, deletableComponent } from '../common';
import { labelid } from './ids';
import { labelProperties as properties } from '../properties/label';

const label = {
    name: 'Label',
    nodes: ['label'],
    image: 'icons/label.svg',
    html: `<label for="" ${dataComponentId}="${labelid}" class="${deletableComponent}">Label</label>`,
    properties
};

export default label;