import TextInput from './TextInput';

class ValueTextInput extends TextInput {
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
}

export default ValueTextInput;