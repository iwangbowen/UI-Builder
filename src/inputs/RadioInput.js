import Input from './Input';

const RadioInput = $.extend({}, Input, {
	onChange: function (event, node) {
		if (event.data && event.data.element) {
			event.data.element.trigger('propertyChange', [this.value, this]);
		}
	},
	events: [
		["change", "onChange", "input"],
	],
	setValue: function (value) {
		$('input', this.element).removeAttr('checked');
		if (value)
			$("input[value=" + value + "]", this.element).prop('checked', true);
	},
	init: function (data) {
		return this.render("radioinput", data);
	},
});

export default RadioInput;