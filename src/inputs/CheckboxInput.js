import Input from './Input';
import $ from '../../js/jquery.min';

const CheckboxInput = $.extend({}, Input, {

	onChange: function(event, node) {
		
		if (event.data && event.data.element)
		{
			event.data.element.trigger('propertyChange', [this.checked, this]);
		}
	},

    events: [
        ["change", "onChange", "input"],
	 ],

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("checkboxinput", data);
	},
  }
);

export default CheckboxInput;