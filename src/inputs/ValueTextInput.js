import TextInput from './TextInput';

const ValueTextInput = $.extend({}, TextInput, {
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

export default ValueTextInput;