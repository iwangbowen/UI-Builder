import $ from '../../js/jquery.min';

const unusedTags = [
	{
		name: 'script',
		filter: tag => tag.getAttribute('src')
			&& tag.getAttribute('src').includes('iframe-drag-n-drop')
	},
	{
		name: 'link',
		filter: tag => tag.getAttribute('rel') == 'stylesheet'
			&& (tag.getAttribute('href').includes('drag-n-drop.css')
				|| tag.getAttribute('href').includes('/datepicker/skin/WdatePicker.css')
			|| tag.getAttribute('href').includes('/layer/skin/layer.css'))
	},
	{
		name: 'hr',
		filter: tag => $(tag).hasClass('horizontal-line')
			|| $(tag).hasClass('vertical-line')
	}
];

export default unusedTags;