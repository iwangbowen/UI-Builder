function generate(type) {
	var n = noty({
		text        : type,
		type        : type,
		dismissQueue: true,
		timeout     : 10000,
		closeWith   : ['click'],
		layout      : 'topCenter',
		theme       : 'defaultTheme',
		maxVisible  : 10
	});
	console.log('html: ' + n.options.id);
}

function generateAll() {
	generate('alert');
	generate('information');
	generate('error');
	generate('warning');
	generate('notification');
	generate('success');
}

function humaneNoty(pretags){
	for (var i = 0; i < pretags.length; i++) { (function(el){
		el.onclick = function () {
		   eval(el.innerHTML)
		}
	 }(pretags[i])) }
}