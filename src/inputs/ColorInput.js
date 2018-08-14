import Input from './Input';

const ColorInput = $.extend({}, Input, {
	//html5 color input only supports setting values as hex colors even if the picker returns only rgb
	rgb2hex: function (rgb) {
		rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
		return (rgb && rgb.length === 4) ? "#" +
			("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
			("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
			("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : rgb;
	},
	events: [
		["change", "onChange", "input"],
	],
	setValue: function (value) {
		$('input', this.element).val(this.rgb2hex(value));
	},
	init: function (data) {
		return this.render("colorinput", data);
	},
});

export default ColorInput;