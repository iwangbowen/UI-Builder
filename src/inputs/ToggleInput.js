import TextInput from './TextInput';
import $ from '../../js/jquery.min';

const ToggleInput = $.extend({}, TextInput, {

	onChange: function (event, node) {
		if (event.data && event.data.element) {
			event.data.element.trigger('propertyChange', [this.checked ? this.getAttribute("data-value-on") : this.getAttribute("data-value-off"), this]);
		}
	},

	events: [
		["change", "onChange", "input"],
	],

	setValue: function (value) {
		$('input', this.element).val(value);
	},

	init: function (data) {
		return this.render("toggle", data);
	},
}
);

export default ToggleInput;