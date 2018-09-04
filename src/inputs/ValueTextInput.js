import TextInput from './TextInput';

class ValueTextInput extends TextInput {
	setValue(value) {
		$('input', this.element).val(value);
	}

	init(data) {
		return this.render("textinput", data);
	}
}

export default ValueTextInput;