import { inputfieldProperties as properties } from '../properties/input';
import _ from 'lodash';
import basiccomponent from './basiccomponent';

const inputfield = _.extend({}, basiccomponent, {
    properties
});

export default inputfield;