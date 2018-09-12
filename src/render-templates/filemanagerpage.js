const filemanagerpage = `
    <li data-url="{%=url%}" data-page="{%=name%}">
			<label for="{%=name%}"><span>{%=title%}</span></label> <input type="checkbox" checked id="{%=name%}" />
			<ol></ol>
	</li>
`;

export default filemanagerpage;