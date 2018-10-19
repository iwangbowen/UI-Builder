const filemanagerpage = `
    <li data-url="{%=url%}" data-page="{%=name%}">
		<label for="{%=id%}"><span>{%=title%}</span></label>
		<input type="checkbox" checked id="{%=id%}" />
		<ol></ol>
	</li>
`;

export default filemanagerpage;