import { inputfieldProperties as properties } from '../properties/input';
import extend from 'lodash/extend';
import basiccomponent from './basiccomponent';

const inputfield = extend({}, basiccomponent, {
    properties
});

export default inputfield;