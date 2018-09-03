import Input from './Input';

class SelectInput extends Input {
    constructor() {
        super();
        this.events =  [
            ["change", "onChange", "select"],
        ];
    }

    setValue(value) {
        $('select', this.element).val(value);
    }

    init(data) {
        return this.render("select", data);
    }
}

export default SelectInput;