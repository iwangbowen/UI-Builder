import Input from './Input';

class GridInput extends Input {
	constructor() {
		super();
		this.events = [
			["change", "onChange", "select" /*'select'*/],
			["click", "onChange", "button" /*'select'*/],
		];
	}

	setValue(value) {
		$('select', this.element).val(value);
	}

	init(data) {
		return this.render("grid", data);
	}
}

export default GridInput;