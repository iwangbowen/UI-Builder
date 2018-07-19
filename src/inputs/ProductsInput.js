import TextInput from './TextInput';
import $ from '../../js/jquery.min';

const ProductsInput = $.extend({}, TextInput, {

	events: [
		["keyup", "onChange", "input"],
	],

	setValue: function (value) {
		$('input', this.element).val(value);
	},

	init: function (data) {
		return this.render("textinput", data);
	},
}
);

export default ProductsInput;