import Input from './Input';

class NumberInput extends Input {
	constructor() {
		super();
		this.events = [
			["change", "onChange", "input"],
		];
	}

	setValue(value) {
		$('input', this.element).val(value);
	}

	init(data) {
		return this.render("numberinput", data);
	}
}

export default NumberInput;