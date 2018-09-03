import TextInput from './TextInput';

class LinkInput extends TextInput {
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
		return this.render("textinput", data);
	}
}

export default LinkInput;