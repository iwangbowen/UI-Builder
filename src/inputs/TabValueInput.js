import TextValueInput from './TextValueInput';

class TabValueInput extends TextValueInput {
	init(data) {
		return this.render('tabvalue', data);
	}
}

export default TabValueInput;