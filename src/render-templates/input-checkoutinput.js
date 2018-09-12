const inputcheckboxinput = `
	<div class="custom-control custom-checkbox">
		<input name="{%=key%}" class="custom-control-input" type="checkbox" id="{%=key%}_check">
		<label class="custom-control-label" for="{%=key%}_check">{% if (typeof text !== 'undefined') { %} {%=text%} {% } %}</label>
	</div>
`;

export default inputcheckboxinput;