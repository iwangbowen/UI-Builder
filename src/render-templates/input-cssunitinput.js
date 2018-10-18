const inputcssunitinput = `
    <div class="input-group" id="cssunit-{%=key%}">
        <input name="number" type="number"
            {% if (typeof value !== 'undefined') { %}value="{%=value%}"{% } %}
            {% if (typeof min !== 'undefined' && min != false) { %}min="{%=min%}"{% } %}
            {% if (typeof max !== 'undefined' && max != false) { %}max="{%=max%}"{% } %}
            {% if (typeof step !== 'undefined' && step != false) { %}step="{%=step%}"{% } %}
        class="form-control"/>
        <div class="input-group-append">
            <select class="form-control custom-select small-arrow" name="unit">
                <option>em&ensp;</option>
                <option>px</option>
                <option>%</option>
                <option>rem</option>
                <option>auto</option>
            </select>
        </div>
    </div>
`;

export default inputcssunitinput;