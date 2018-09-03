import Input from './Input';

class RadioInput extends Input {
	constructor() {
		super();
		this.events = [
			["change", "onChange", "input"],
		];
	}
	
	onChange(event, node) {
		if (event.data && event.data.element) {
			event.data.element.trigger('propertyChange', [this.value, this]);
		}
	}

	setValue(value) {
		$('input', this.element).removeAttr('checked');
		if (value)
			$("input[value=" + value + "]", this.element).prop('checked', true);
	}

	init(data) {
		return this.render("radioinput", data);
	}
}

export default RadioInput;