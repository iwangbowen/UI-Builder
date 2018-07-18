import RadioInput from './RadioInput';
import $ from '../../js/jquery.min';

const RadioButtonInput = $.extend({}, RadioInput, {

    init: function (data) {
        return this.render("radiobuttoninput", data);
    },
}
);

export default RadioButtonInput;