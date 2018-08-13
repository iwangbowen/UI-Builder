import Input from './Input';

const TextValueInput = $.extend({}, Input, {
	events: [
		["keyup", "onChange", "input"],
		["click", "onChange", "button" /*'select'*/],
	],


	setValue: function (value) {
		$('input', this.element).val(value);
	},

	init: function (data) {
		return this.render("textvalue", data);
	},

}
);

export default TextValueInput;