import Builder from './builder';
import Undo from './undo';
import { SectionInput } from '../inputs/inputs';
import { dataComponentId, dataSection, dataSearch, dataType } from '../components/common';
import { getStyle } from '../util/dom';
import tmpl from '../util/tmpl';
import AttributesMutation from '../models/mutation/attributes-mutation';
import { preservePropertySections, defaultComponent } from '../constants';

function addPropertyChangeListener(component, property) {
	property.input.on('propertyChange', function (event, value, input) {
		let element = Builder.selectedEl;
		if (property.child) element = element.find(property.child);
		if (property.parent) element = element.parent(property.parent);
		if (property.onChange) {
			element = property.onChange(element, value, input, component);
		} else if (property.htmlAttr) {
			const oldValue = element.attr(property.htmlAttr);
			if (property.htmlAttr == 'text') {
				element.text(value);
			} else if (property.htmlAttr == "class" && property.validValues) {
				element.removeClass(property.validValues.join(" "));
				element = element.addClass(value);
			} else if (property.htmlAttr == "style") {
				element = element.css(property.key, value);
			} else if (property.noValueAttr) {
				if (value) {
					element = element.attr(property.htmlAttr, '');
				} else {
					element = element.removeAttr(property.htmlAttr);
				}
			} else {
				element = element.attr(property.htmlAttr, value);
			}
			Undo.addMutation(new AttributesMutation({
				type: 'Attribute',
				target: element.get(0),
				attributeName: property.htmlAttr,
				inputtype: property.inputtype,
				oldValue: oldValue,
				newValue: element.attr(property.htmlAttr)
			}));
		}
		if (property.afterChange) {
			property.afterChange(element, value, input, component);
		}
		if (component.onChange) {
			element = component.onChange(element, property, value, input);
		}
		if (!property.child && !property.parent) {
			Builder.selectNode(element.get(0));
		}
	});
};

export default Components = {
	_components: {},
	_nodesLookup: {},
	_attributesLookup: {},
	_classesLookup: {},
	_classesRegexLookup: {},
	init(url) {
	},
	get(type) {
		return this._components[type];
	},
	add(type, data) {
		data.type = type;
		this._components[type] = data;
		if (data.nodes) {
			data.nodes.forEach(node => this._nodesLookup[node] = data);
		}
		if (data.attributes) {
			if (data.attributes.constructor === Array) {
				data.attributes.forEach(attribute => this._attributesLookup[attribute] = data);
			} else {
				for (var i in data.attributes) {
					if (typeof this._attributesLookup[i] === 'undefined') {
						this._attributesLookup[i] = {};
					}
					if (data.attributes[i].constructor === Array) {
						// 支持textinput中不同的输入类型attributes: { "type": ['text', 'password'] },
						data.attributes[i].forEach(value => {
							this._attributesLookup[i][value] = data;
						});
					} else {
						this._attributesLookup[i][data.attributes[i]] = data;
					}
				}
			}
		}
		if (data.classes) {
			data.classes.forEach(className => this._classesLookup[className] = data);
		}
		if (data.classesRegex) {
			for (var i in data.classesRegex) {
				this._classesRegexLookup[data.classesRegex[i]] = data;
			}
		}
	},
	extend(inheritType, type, data) {
		let newData = data;
		if (inheritData = this._components[inheritType]) {
			newData = $.extend(true, {}, inheritData, data);
			newData.properties = $.merge($.merge([], inheritData.properties ? inheritData.properties : []), data.properties ? data.properties : []);
		}
		//sort by order
		newData.properties.sort(function (a, b) {
			if (typeof a.sort === "undefined") a.sort = 0;
			if (typeof b.sort === "undefined") b.sort = 0;
			if (a.sort < b.sort)
				return -1;
			if (a.sort > b.sort)
				return 1;
			return 0;
		});
		this.add(type, newData);
	},
	matchNode(node) {
		// Component list component li element
		if ($(node).attr(dataSection) && $(node).attr(dataSearch) && this._components[$(node).attr(dataType)]) {
			return this._components[$(node).attr(dataType)];
		} else if ($(node).attr(dataComponentId) && this._components[$(node).attr(dataComponentId)]) {
			return this._components[$(node).attr(dataComponentId)];
		} else if ($(node).attr('type') == 'radio' || $(node).attr('type') == 'checkbox') {
			const $parent = $(node).parent();
			if ($parent.attr(dataComponentId) && this._components[$parent.attr(dataComponentId)]) {
				return this._components[$parent.attr(dataComponentId)]
			}
		}
		if (node.attributes.length) {
			//search for attributes
			for (var i in node.attributes) {
				attr = node.attributes[i].name;
				value = node.attributes[i].value;
				if (attr in this._attributesLookup) {
					component = this._attributesLookup[attr];
					//currently we check that is not a component by looking at name attribute
					//if we have a collection of objects it means that attribute value must be checked
					if (typeof component["name"] === "undefined") {
						if (value in component) {
							return component[value];
						}
					} else
						return component;
				}
			}
			for (var i in node.attributes) {
				attr = node.attributes[i].name;
				value = node.attributes[i].value;
				//check for node classes
				if (attr == "class") {
					classes = value.split(" ");
					for (j in classes) {
						if (classes[j] in this._classesLookup)
							return this._classesLookup[classes[j]];
					}
					for (regex in this._classesRegexLookup) {
						const regexObj = new RegExp(regex);
						if (regexObj.exec(value)) {
							return this._classesRegexLookup[regex];
						}
					}
				}
			}
		}
		const tagName = node.tagName.toLowerCase();
		if (tagName in this._nodesLookup) {
			return this._nodesLookup[tagName];
		}
		return this.get(defaultComponent);
	},
	render(type) {
		const component = this._components[type];
		const rightPanel = jQuery("#right-panel #component-properties");
		let section = rightPanel.find('.section[data-section="default"]');
		if (!(preservePropertySections && section.length)) {
			rightPanel.html('').append(tmpl("inputsectioninput", { key: "default", header: component.name }));
			section = rightPanel.find(".section");
		}
		rightPanel.find('[data-header="default"] span').html(component.name);
		section.html("")
		if (component.beforeInit) {
			component.beforeInit(Builder.selectedEl.get(0));
		}
		const nodeElement = Builder.selectedEl;
		component.properties.forEach(property => {
			let element = nodeElement;
			if (property.beforeInit) {
				property.beforeInit(element.get(0));
			}
			if (property.child) {
				element = element.find(property.child);
			}
			if (property.data) {
				property.data["key"] = property.key;
			} else {
				property.data = { "key": property.key };
			}
			if (typeof property.group === 'undefined') {
				property.group = null;
			}
			property.input = property.inputtype.init(property.data);
			if (property.init) {
				property.inputtype.setValue(property.init(element.get(0)));
			} else if (property.htmlAttr) {
				let value;
				if (property.htmlAttr == 'text') {
					value = element.text();
				} else if (property.htmlAttr == "style") {
					//value = element.css(property.key);//jquery css returns computed style
					value = getStyle(element.get(0), property.key);//getStyle returns declared style
				} else {
					value = element.attr(property.htmlAttr);
				}
				//if attribute is class check if one of valid values is included as class to set the select
				if (value && property.htmlAttr == "class" && property.validValues) {
					value = value.split(" ").filter(function (el) {
						return property.validValues.indexOf(el) != -1
					});
				}
				if (property.noValueAttr) {
					value = element.attr(property.htmlAttr) ? property.validValues : [];
				}
				property.inputtype.setValue(value);
			}
			addPropertyChangeListener(component, property);
			if (property.inputtype instanceof SectionInput) {
				section = rightPanel.find(`.section[data-section="${property.key}"]`);
				if (preservePropertySections && section.length) {
					section.html("");
				} else {
					rightPanel.append(property.input);
					section = rightPanel.find(`.section[data-section="${property.key}"]`);
				}
			} else {
				const row = $(tmpl('property', property));
				row.find('.input').append(property.input);
				property.inputtype.afterAppend && property.inputtype.afterAppend(property.input, element);
				section.append(row);
			}
		});
		if (component.init) {
			component.init(Builder.selectedEl.get(0));
		}
	}
};