import Input from './Input';

class SectionInput extends Input {
	constructor() {
		super();
		this.events = [
			["click", "onChange", "button" /*'select'*/],
		];
	}

	setValue(value) {
		return false;
	}

	init(data) {
		return this.render("sectioninput", data);
	}
}

export default SectionInput;