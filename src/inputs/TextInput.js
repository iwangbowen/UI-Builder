import Input from './Input';

class TextInput extends Input {
	setValue(value) {
		$('input', this.element).val(value);
	}

	init(data) {
		return this.render("textinput", data);
	}
}

export default TextInput;