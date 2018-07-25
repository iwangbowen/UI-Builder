import $ from '../../js/jquery.min';
import { tableSelector } from './selectors';
import _ from 'lodash';

const unusedTags = [
	{
		name: 'script',
		filter: tag => tag.getAttribute('src')
			&& tag.getAttribute('src').includes('iframe-drag-n-drop')
	},
	{
		name: 'link',
		init(el) {
			return _.chain([...$(el).find(tableSelector)])
				.flatMap(table => $(table).attr('class').split(' '))
				.uniq()
				.filter(v => v.startsWith('ag-theme-'))
				.value();
		},
		// this refers to init function return value
		filter(tag) {
			return tag.getAttribute('rel') == 'stylesheet'
				&& (tag.getAttribute('href').includes('drag-n-drop.css')
					|| tag.getAttribute('href').includes('/datepicker/skin/WdatePicker.css')
					|| tag.getAttribute('href').includes('/layer/skin/layer.css'))
				|| (tag.getAttribute('href').includes('ag-theme-')
					&& _.findIndex(this, v => tag.getAttribute('href').includes(`${v}.css`)) == -1)
		}
	},
	{
		name: 'hr',
		filter: tag => $(tag).hasClass('horizontal-line')
			|| $(tag).hasClass('vertical-line')
	},
	{
		name: 'base'
	}
];

export default unusedTags;