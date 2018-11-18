import { dataComponentId, deletableComponent, col_sm_2 } from '../common';
import { labelid } from './ids';
import { labelProperties as properties } from '../properties/label';

const label = {
    name: 'Label',
    nodes: ['label'],
    image: 'icons/label.svg',
    html: `<label for="" ${dataComponentId}="${labelid}" class="${deletableComponent} ${col_sm_2}">Label</label>`,
    properties
};

export default label;