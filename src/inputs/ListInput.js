import Input from './Input';

class ListInput extends Input {
	constructor() {
		super();
		this.events = [
			["change", "onChange", "select"],
		];
	}

	setValue (value) {
		$('select', this.element).val(value);
	}

	init (data) {
		return this.render("listinput", data);
	}
}

export default ListInput;