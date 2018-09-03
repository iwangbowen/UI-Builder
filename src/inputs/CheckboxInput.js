import Input from './Input';

class CheckboxInput extends Input {
	constructor() {
		super();
		this.events = [
			["change", "onChange", "input"],
		];
	}

	onChange(event, node) {
		if (event.data && event.data.element) {
			event.data.element.trigger('propertyChange', [this.checked, this]);
		}
	}

	setValue(value) {
		$('input', this.element).val(value);
	}

	init(data) {
		return this.render("checkboxinput", data);
	}
}

export default CheckboxInput;