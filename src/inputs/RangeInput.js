import Input from './Input';

class RangeInput extends Input {
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
		return this.render("rangeinput", data);
	}
}

export default RangeInput;