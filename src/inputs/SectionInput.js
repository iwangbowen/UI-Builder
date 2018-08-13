import Input from './Input';

const SectionInput = $.extend({}, Input, {

	events: [
		["click", "onChange", "button" /*'select'*/],
	],


	setValue: function (value) {
		return false;
	},

	init: function (data) {
		return this.render("sectioninput", data);
	},

}
);

export default SectionInput;