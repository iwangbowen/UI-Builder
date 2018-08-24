const numberinput = `
    <div>
        <input name="{%=key%}" type="number"}" 
            {% if (typeof min !== 'undefined' && min != false) { %}min="{%=min%}"{% } %} 
            {% if (typeof max !== 'undefined' && max != false) { %}max="{%=max%}"{% } %} 
            {% if (typeof step !== 'undefined' && step != false) { %}step="{%=step%}"{% } %} 
        class="form-control"/>
    </div>
`;

export default numberinput;