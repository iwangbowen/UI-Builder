const inputlistinput = `
<div class="row">
    {% for ( var i = 0; i < options.length; i++ ) { %}
    <div class="col-6">
        <div class="input-group">
            <input name="{%=key%}_{%=i%}" type="text" class="form-control" value="{%=options[i].text%}"/>
            <div class="input-group-append">
                <button class="input-group-text btn btn-sm btn-danger">
                    <i class="ion-trash-a"></i>
                </button>
            </div>
          </div>
          <br/>
    </div>
    {% } %}
    {% if (typeof hide_remove === 'undefined') { %}
    <div class="col-12">
        <button class="btn btn-sm btn-outline-primary">
            <i class="ion-trash-a"></i> Add new
        </button>
    </div>
    {% } %}
</div>
`;

export default inputlistinput;