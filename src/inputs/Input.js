const Input = {
	init: function (name) {
	},
	onChange: function (event, node) {
		if (event.data && event.data.element) {
			event.data.element.trigger('propertyChange', [this.value, this]);
		}
	},
	renderTemplate: function (name, data) {
		return tmpl("input" + name, data);
	},
	render: function (name, data) {
		this.element = $(this.renderTemplate(name, data));
		//bind events
		if (this.events) {
			for (var i in this.events) {
				const event = this.events[i][0];
				const fun = this[this.events[i][1]];
				const el = this.events[i][2];
				this.element.on(event, el, { element: this.element, input: this }, fun);
			}
		}
		return this.element;
	}
};

export default Input;