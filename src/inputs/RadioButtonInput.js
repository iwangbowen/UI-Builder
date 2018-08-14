import RadioInput from './RadioInput';

const RadioButtonInput = $.extend({}, RadioInput, {
    init: function (data) {
        return this.render("radiobuttoninput", data);
    },
});

export default RadioButtonInput;