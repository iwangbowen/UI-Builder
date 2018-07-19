import Input from './Input';
import $ from '../../js/jquery.min';

var NumberInput = $.extend({}, Input, {

	events: [
		["change", "onChange", "input"],
	],

	setValue: function (value) {
		$('input', this.element).val(value);
	},

	init: function (data) {
		return this.render("numberinput", data);
	},
}
);

export default NumberInput;