const inputtabvalue = `
	<div class="row">
		<div class="col-12 mb-1">
			<label>Title</label>
			<input name="title" type="text" value="{%=title%}" class="form-control"/>
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

export default inputtabvalue;