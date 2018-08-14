import Input from './Input';

const GridInput = $.extend({}, Input, {
	events: [
		["change", "onChange", "select" /*'select'*/],
		["click", "onChange", "button" /*'select'*/],
	],
	setValue: function (value) {
		$('select', this.element).val(value);
	},
	init: function (data) {
		return this.render("grid", data);
	},
});

export default GridInput;