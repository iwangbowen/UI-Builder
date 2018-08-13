import TextInput from './TextInput';

const LinkInput = $.extend({}, TextInput, {

	events: [
		["change", "onChange", "input"],
	],

	setValue: function (value) {
		$('input', this.element).val(value);
	},

	init: function (data) {
		return this.render("textinput", data);
	},
}
);

export default LinkInput;