import Input from './Input';

class TextInput extends Input {
	constructor() {
		super();
		this.events = [
			["keyup", "onChange", "input"],
		];
	}

	setValue(value) {
		$('input', this.element).val(value);
	}

	init(data) {
		return this.render("textinput", data);
	}

	undo(value) {
		this.setValue(value);
	}

	redo() {
		this.setValue(value);
	}
}

export default TextInput;