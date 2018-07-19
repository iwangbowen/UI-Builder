import Input from './Input';
import $ from '../../js/jquery.min';

const RangeInput = $.extend({}, Input, {

	events: [
		["change", "onChange", "input"],
	],

	setValue: function (value) {
		$('input', this.element).val(value);
	},

	init: function (data) {
		return this.render("rangeinput", data);
	},
}
);

export default RangeInput;