const inputsectioninput = `
    <label class="header" data-header="{%=key%}" for="header_{%=key%}">
        <span>&ensp;{%=header%}</span> 
        <div class="header-arrow"></div>
    </label> 
	<input class="header_check" type="checkbox" {% if (typeof expanded !== 'undefined' && expanded == false) { %} {% } else { %}checked="true"{% } %} id="header_{%=key%}"> 
	<div class="section" data-section="{%=key%}"></div>	
`;

export default inputsectioninput;