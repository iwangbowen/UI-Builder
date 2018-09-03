import RadioInput from './RadioInput';

class RadioButtonInput extends RadioInput {
    init(data) {
        return this.render("radiobuttoninput", data);
    }
}

export default RadioButtonInput;