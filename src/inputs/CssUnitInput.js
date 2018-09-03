import Input from './Input';

class CssUnitInput extends Input {
	constructor() {
		super();
		this.number = 0;
		this.unit = 'px';
		this.events = [
			["change", "onChange", "select"],
			["change", "onChange", "input"],
		];
	}

	onChange(event) {
		if (event.data && event.data.element) {
			input = event.data.input;
			input[this.name] = this.value;// this.name = unit or number	

			value = "";
			if (input.unit == "auto") {
				$(event.data.element).addClass("auto");
				value = input.unit;
			}
			else {
				$(event.data.element).removeClass("auto");
				value = input.number + input.unit;
			}

			event.data.element.trigger('propertyChange', [value, this]);
		}
	}

	setValue(value) {
		this.number = parseInt(value);
		this.unit = value.replace(this.number, '');

		if (this.unit == "auto") $(this.element).addClass("auto");

		$('input', this.element).val(this.number);
		$('select', this.element).val(this.unit);
	}

	init(data) {
		return this.render("cssunitinput", data);
	}
}

export default CssUnitInput;