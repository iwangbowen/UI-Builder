const inputselect = `
    <div>
        <select class="form-control custom-select">
            {% for ( var i = 0; i < options.length; i++ ) { %}
            <option value="{%=options[i].value%}">{%=options[i].text%}</option>
            {% } %}
        </select>
    </div>
`;

export default inputselect;