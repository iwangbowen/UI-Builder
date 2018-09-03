import Input from './Input';

class TextValueInput extends Input {
	constructor() {
		super();
		this.events = [
			["keyup", "onChange", "input"],
			["click", "onChange", "button" /*'select'*/],
		];
	}

	setValue(value) {
		$('input', this.element).val(value);
	}

	init(data) {
		return this.render("textvalue", data);
	}
}

export default TextValueInput;