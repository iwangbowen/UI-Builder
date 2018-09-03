import Input from './Input';

class ButtonInput extends Input {
	constructor() {
		super();
		this.events = [
			["click", "onChange", "button" /*'select'*/],
		];
	}

	setValue(value) {
		$('button', this.element).val(value);
	}

	init(data) {
		return this.render("button", data);
	}
}

export default ButtonInput;