import TextInput from './TextInput';

class ToggleInput extends TextInput {
	constructor() {
		super();
		this.events = [
			["change", "onChange", "input"],
		];
	}
	onChange(event, node) {
		if (event.data && event.data.element) {
			event.data.element.trigger('propertyChange', [this.checked ? this.getAttribute("data-value-on") : this.getAttribute("data-value-off"), this]);
		}
	}
	setValue(value) {
		$('input', this.element).val(value);
	}
	init(data) {
		return this.render("toggle", data);
	}
	undo(value) {
		this.setValue([value]);
	}
	redo() {
		this.setValue([value]);
	}
}

export default ToggleInput;