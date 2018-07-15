const unusedTags = [
	// {
	// 	name: 'script'
	// },
	{
		name: 'link',
		filter: tag => tag.getAttribute('rel') == 'stylesheet'
			&& tag.getAttribute('href').includes('drag-n-drop')
	},
	{
		name: 'hr',
		filter: tag => $(tag).hasClass('horizontal-line')
			|| $(tag).hasClass('vertical-line')
	}
];

export default unusedTags;