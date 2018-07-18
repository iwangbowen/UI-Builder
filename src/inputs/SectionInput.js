import Input from './Input';
import $ from '../../js/jquery.min';

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