const inputcolorinput = `
	<div>
		<input name="{%=key%}" type="color"
			{% if (typeof value !== 'undefined') { %}value="{%=value%}"{% } %}
		 	pattern="#[a-f0-9]{6}" class="form-control"/>
	</div>
`;

export default inputcolorinput;