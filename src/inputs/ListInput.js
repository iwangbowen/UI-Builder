import Input from './Input';
import $ from '../../js/jquery.min';

const ListInput = $.extend({}, Input, {

	events: [
		["change", "onChange", "select"],
	],


	setValue: function (value) {
		$('select', this.element).val(value);
	},

	init: function (data) {
		return this.render("listinput", data);
	},

}
);

export default ListInput;