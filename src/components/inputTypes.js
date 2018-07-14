const inputTypes = [
    {
        value: 'text',
        text: 'text'
    }, {
        value: 'password',
        text: 'password'
    }, {
        value: 'number',
        text: 'number'
    }, {
        value: 'submit',
        text: 'submit'
    }, {
        value: "email",
        text: "email"
    }, {
        value: 'url',
        text: 'url'
    }, {
        value: 'tel',
        text: 'tel'
    }, {
        value: 'search',
        text: 'search'
    }, {
        value: 'datetime-local',
        text: 'datetime-local'
    }, {
        value: 'datetime',
        text: 'datetime'
    }, {
        value: 'date',
        text: 'date'
    }, {
        value: 'time',
        text: 'time'
    }, {
        value: 'week',
        text: 'week'
    }, {
        value: 'month',
        text: 'month'
    }, {
        value: 'range',
        text: 'range'
    }, {
        value: 'color',
        text: 'color'
    }];

const inputTypeNames = inputTypes.reduce((prev, cur) => {
    prev.push(cur.value);
    return prev;
}, []);

export { inputTypes, inputTypeNames };