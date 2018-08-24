const inputgrid = `
<div class="row">
    <div class="mb-1 col-12">
        <label>Flexbox</label>
        <select class="form-control custom-select" name="col">
            <option value="">None</option>
            {% for ( var i = 1; i <= 12; i++ ) { %}
            <option value="{%=i%}" {% if ((typeof col !== 'undefined') && col == i) { %} selected {% } %}>{%=i%}</option>
            {% } %}
        </select>
        <br/>
    </div>
    <div class="col-6">
        <label>Extra small</label>
        <select class="form-control custom-select" name="col-xs">
            <option value="">None</option>
            {% for ( var i = 1; i <= 12; i++ ) { %}
            <option value="{%=i%}" {% if ((typeof col_xs !== 'undefined') && col_xs == i) { %} selected {% } %}>{%=i%}</option>
            {% } %}
        </select>
        <br/>
    </div>
    <div class="col-6">
        <label>Small</label>
        <select class="form-control custom-select" name="col-sm">
            <option value="">None</option>
            {% for ( var i = 1; i <= 12; i++ ) { %}
            <option value="{%=i%}" {% if ((typeof col_sm !== 'undefined') && col_sm == i) { %} selected {% } %}>{%=i%}</option>
            {% } %}
        </select>
        <br/>
    </div>
    <div class="col-6">
        <label>Medium</label>
        <select class="form-control custom-select" name="col-md">
            <option value="">None</option>
            {% for ( var i = 1; i <= 12; i++ ) { %}
            <option value="{%=i%}" {% if ((typeof col_md !== 'undefined') && col_md == i) { %} selected {% } %}>{%=i%}</option>
            {% } %}
        </select>
        <br/>
    </div>
    <div class="col-6 mb-1">
        <label>Large</label>
        <select class="form-control custom-select" name="col-lg">
            <option value="">None</option>
            {% for ( var i = 1; i <= 12; i++ ) { %}
            <option value="{%=i%}" {% if ((typeof col_lg !== 'undefined') && col_lg == i) { %} selected {% } %}>{%=i%}</option>
            {% } %}
        </select>
        <br/>
    </div>
    {% if (typeof hide_remove === 'undefined') { %}
    <div class="col-12">
        <button class="btn btn-sm btn-outline-light text-danger">
            <i class="ion-trash-a"></i> Remove
        </button>
    </div>
    {% } %}
</div>
`;

export default inputgrid;