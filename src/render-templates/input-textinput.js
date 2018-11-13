const inputtextinput = `
    <div>
        <input {% if (typeof readonly !== 'undefined' && readonly == true) { %}readonly="{%=readonly%}"{% } %}
        name="{%=key%}" type="text" class="form-control"/>
    </div>
`;

export default inputtextinput;