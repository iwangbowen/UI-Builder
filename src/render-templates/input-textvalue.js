const inputtextvalue = `
	<div class="row">
		{% if (typeof id !== 'undefined' && id == 'tableheader@common') { %}
			<div class="col-6 mb-1">
				<label>Name</label>
				<input name="headerName" type="text" value="{%=headerName%}" class="form-control"/>
			</div>
			<div class="col-6 mb-1">
				<label>Field</label>
				<input name="field" type="text" value="{%=field%}" class="form-control"/>
			</div>
			<div class="col-6 mb-1">
				<label>Width</label>
				<input name="width" type="number" value="{%=width%}" class="form-control"/>
			</div>
		{% } else { %}
			<div class="col-6 mb-1">
				<label>Value</label>
				<input name="value" type="text" value="{%=value%}" class="form-control"/>
			</div>
			<div class="col-6 mb-1">
				<label>Text</label>
				<input name="text" type="text" value="{%=text%}" class="form-control"/>
			</div>
		{% } %}
		{% if (typeof hide_remove === 'undefined') { %}
		<div class="col-12">
			<button class="btn btn-sm btn-outline-light text-danger">
				<i class="ion-trash-a"></i> Remove
			</button>
		</div>
		{% } %}
	</div>
`;

export default inputtextvalue;