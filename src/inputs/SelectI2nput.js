import Input from './Input';

const Select2Input = $.extend({}, Input, {
    events: [
        ["change", "onChange", "select"],
    ],
    setValue(value) {
        $('select', this.element).val(value);
    },
    init(data) {
        return this.render("select2", data);
    },
    afterAppend(input, element) {
        const data = element.attr('class').split(' ').map(className => ({
            id: className,
            text: className,
            selected: true
        }));
        input
            .select2({
                tags: true,
                data: data
            })
            .on("select2:select", e => element.addClass(e.params.data.id))
            .on("select2:unselect", e => element.removeClass(e.params.data.id));
    }
});

export default Select2Input;