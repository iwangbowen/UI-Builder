import { dataComponentId, deletableComponent, col_sm_3 } from '../common';
import { labelid } from './ids';
import { labelProperties as properties } from '../properties/label';

const label = {
    name: 'Label',
    nodes: ['label'],
    image: 'icons/label.svg',
    html: `<label for="" ${dataComponentId}="${labelid}" class="${deletableComponent} ${col_sm_3}">Text</label>`,
    properties
};

export default label;