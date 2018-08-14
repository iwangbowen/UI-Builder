import Input from './Input';

const TextInput = $.extend({}, Input, {
	events: [
		["keyup", "onChange", "input"],
	],
	setValue: function (value) {
		$('input', this.element).val(value);
	},
	init: function (data) {
		return this.render("textinput", data);
	},
});

export default TextInput;