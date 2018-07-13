require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({53:[function(require,module,exports){
var _builder = require('./builder');

var _builder2 = _interopRequireDefault(_builder);

var _components = require('./components/@oee/components');

var _element = require('./components/element');

var _element2 = _interopRequireDefault(_element);

var _border = require('./components/border');

var _border2 = _interopRequireDefault(_border);

var _padding = require('./components/padding');

var _padding2 = _interopRequireDefault(_padding);

var _display = require('./components/display');

var _display2 = _interopRequireDefault(_display);

var _typography = require('./components/typography');

var _typography2 = _interopRequireDefault(_typography);

var _size = require('./components/size');

var _size2 = _interopRequireDefault(_size);

var _margin = require('./components/margin');

var _margin2 = _interopRequireDefault(_margin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_builder2.default.ComponentsGroup['Bootstrap 3'] = ['html/labeldiv', 'html/label', 'html/div', 'html/button', 'html/buttongroup', 'html/buttontoolbar', 'html/form', 'html/textinput', 'html/textareainput', 'html/selectinput', 'html/fileinput', 'html/checkbox', 'html/radiobutton', 'html/table', 'html/heading', 'html/image', 'html/jumbotron', 'html/alert', 'html/card', 'html/listgroup', 'html/hr', 'html/taglabel', 'html/badge', 'html/progress', 'html/navbar', 'html/breadcrumbs', 'html/pagination', 'html/container', 'html/gridrow']; /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Copyright 2017 Ziadin Givan
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       https://github.com/givan/Vvvebjs
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       */


_builder2.default.Components.add("_base", _element2.default);
//display
_builder2.default.Components.extend("_base", "_base", _display2.default);
//Typography
_builder2.default.Components.extend("_base", "_base", _typography2.default);
//Size
_builder2.default.Components.extend("_base", "_base", _size2.default);
//Margin
_builder2.default.Components.extend("_base", "_base", _margin2.default);
//Padding
_builder2.default.Components.extend("_base", "_base", _padding2.default);
//Border
_builder2.default.Components.extend("_base", "_base", _border2.default);

_builder2.default.Components.extend("_base", "html/div", _components.div);
_builder2.default.Components.extend("_base", "html/label", _components.label);
_builder2.default.Components.extend("_base", "html/button", _components.button);
_builder2.default.Components.extend("_base", "html/container", _components.container);
_builder2.default.Components.extend("_base", "html/heading", _components.heading);
_builder2.default.Components.extend("_base", "html/link", _components.link);
_builder2.default.Components.extend("_base", "html/image", _components.image);
_builder2.default.Components.add("html/hr", _components.hr);
_builder2.default.Components.extend("_base", "html/buttongroup", _components.buttongroup);
_builder2.default.Components.extend("_base", "html/buttontoolbar", _components.buttontoolbar);
_builder2.default.Components.extend("_base", "html/alert", _components.alert);
_builder2.default.Components.extend("_base", "html/badge", _components.badge);
_builder2.default.Components.extend("_base", "html/card", _components.card);
_builder2.default.Components.extend("_base", "html/listgroup", _components.listgroup);
_builder2.default.Components.extend("_base", "html/listitem", _components.listitem);
_builder2.default.Components.extend("_base", "html/breadcrumbs", _components.breadcrumbs);
_builder2.default.Components.extend("_base", "html/breadcrumbitem", _components.breadcrumbitem);
_builder2.default.Components.extend("_base", "html/pagination", _components.pagination);
_builder2.default.Components.extend("_base", "html/pageitem", _components.pageitem);
_builder2.default.Components.extend("_base", "html/progress", _components.progress);
_builder2.default.Components.extend("_base", "html/jumbotron", _components.jumbotron);
_builder2.default.Components.extend("_base", "html/navbar", _components.navbar);
_builder2.default.Components.extend("_base", "html/form", _components.form);
_builder2.default.Components.extend("_base", "html/textinput", _components.textinput);
_builder2.default.Components.extend("_base", "html/selectinput", _components.selectinput);
_builder2.default.Components.extend("_base", "html/textareainput", _components.textareainput);
_builder2.default.Components.extend("_base", "html/radiobutton", _components.radiobutton);
_builder2.default.Components.extend("_base", "html/checkbox", _components.checkbox);
_builder2.default.Components.extend("_base", "html/fileinput", _components.fileinput);
_builder2.default.Components.extend("_base", "html/table", _components.table);
_builder2.default.Components.extend("_base", "html/tablerow", _components.tablerow);
_builder2.default.Components.extend("_base", "html/tablecell", _components.tablecell);
_builder2.default.Components.extend("_base", "html/tableheadercell", _components.tableheadercell);
_builder2.default.Components.extend("_base", "html/tablehead", _components.tablehead);
_builder2.default.Components.extend("_base", "html/tablebody", _components.tablebody);
_builder2.default.Components.add("html/gridcolumn", _components.gridcolumn);
_builder2.default.Components.add("html/gridrow", _components.gridrow);

_builder2.default.Components.add('html/labeldiv', _components.labeldiv);

},{"./builder":52,"./components/@oee/components":63,"./components/border":93,"./components/display":95,"./components/element":96,"./components/margin":97,"./components/padding":98,"./components/size":99,"./components/typography":100}],100:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../inputs/inputs');

var _common = require('./common');

var typography = {
    properties: [{
        key: "typography_header",
        inputtype: _inputs.SectionInput,
        name: false,
        sort: (0, _common.inc_base_sort)(),
        data: { header: "Typography" }
    }, {
        name: "Font family",
        key: "font-family",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.SelectInput,
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "Arial, Helvetica, sans-serif",
                text: "Arial"
            }, {
                value: 'Lucida Sans Unicode", "Lucida Grande", sans-serif',
                text: 'Lucida Grande'
            }, {
                value: 'Palatino Linotype", "Book Antiqua", Palatino, serif',
                text: 'Palatino Linotype'
            }, {
                value: '"Times New Roman", Times, serif',
                text: 'Times New Roman'
            }, {
                value: "Georgia, serif",
                text: "Georgia, serif"
            }, {
                value: "Tahoma, Geneva, sans-serif",
                text: "Tahoma"
            }, {
                value: 'Comic Sans MS, cursive, sans-serif',
                text: 'Comic Sans'
            }, {
                value: 'Verdana, Geneva, sans-serif',
                text: 'Verdana'
            }, {
                value: 'Impact, Charcoal, sans-serif',
                text: 'Impact'
            }, {
                value: 'Arial Black, Gadget, sans-serif',
                text: 'Arial Black'
            }, {
                value: 'Trebuchet MS, Helvetica, sans-serif',
                text: 'Trebuchet'
            }, {
                value: 'Courier New", Courier, monospace',
                text: 'Courier New", Courier, monospace'
            }, {
                value: 'Brush Script MT, sans-serif',
                text: 'Brush Script'
            }]
        }
    }, {
        name: "Font weight",
        key: "font-weight",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.SelectInput,
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "100",
                text: "Thin"
            }, {
                value: "200",
                text: "Extra-Light"
            }, {
                value: "300",
                text: "Light"
            }, {
                value: "400",
                text: "Normal"
            }, {
                value: "500",
                text: "Medium"
            }, {
                value: "600",
                text: "Semi-Bold"
            }, {
                value: "700",
                text: "Bold"
            }, {
                value: "800",
                text: "Extra-Bold"
            }, {
                value: "900",
                text: "Ultra-Bold"
            }]
        }
    }, {
        name: "Text align",
        key: "text-align",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 12,
        inline: true,
        inputtype: _inputs.RadioButtonInput,
        data: {
            extraclass: "btn-group-sm btn-group-fullwidth",
            options: [{
                value: "none",
                icon: "la la-close",
                //text: "None",
                title: "None",
                checked: true
            }, {
                value: "left",
                //text: "Left",
                title: "Left",
                icon: "la la-align-left",
                checked: false
            }, {
                value: "center",
                //text: "Center",
                title: "Center",
                icon: "la la-align-center",
                checked: false
            }, {
                value: "right",
                //text: "Right",
                title: "Right",
                icon: "la la-align-right",
                checked: false
            }, {
                value: "justify",
                //text: "justify",
                title: "Justify",
                icon: "la la-align-justify",
                checked: false
            }]
        }
    }, {
        name: "Line height",
        key: "line-height",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.CssUnitInput
    }, {
        name: "Letter spacing",
        key: "letter-spacing",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.CssUnitInput
    }, {
        name: "Text decoration",
        key: "text-decoration-line",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 12,
        inline: true,
        inputtype: _inputs.RadioButtonInput,
        data: {
            extraclass: "btn-group-sm btn-group-fullwidth",
            options: [{
                value: "none",
                icon: "la la-close",
                //text: "None",
                title: "None",
                checked: true
            }, {
                value: "underline",
                //text: "Left",
                title: "underline",
                icon: "la la-long-arrow-down",
                checked: false
            }, {
                value: "overline",
                //text: "Right",
                title: "overline",
                icon: "la la-long-arrow-up",
                checked: false
            }, {
                value: "line-through",
                //text: "Right",
                title: "Line Through",
                icon: "la la-strikethrough",
                checked: false
            }, {
                value: "underline overline",
                //text: "justify",
                title: "Underline Overline",
                icon: "la la-arrows-v",
                checked: false
            }]
        }
    }, {
        name: "Decoration Color",
        key: "text-decoration-color",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        htmlAttr: "style",
        inputtype: _inputs.ColorInput
    }, {
        name: "Decoration style",
        key: "text-decoration-style",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.SelectInput,
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "solid",
                text: "Solid"
            }, {
                value: "wavy",
                text: "Wavy"
            }, {
                value: "dotted",
                text: "Dotted"
            }, {
                value: "dashed",
                text: "Dashed"
            }, {
                value: "double",
                text: "Double"
            }]
        }
    }]
};

exports.default = typography;

},{"../inputs/inputs":126,"./common":94}],99:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../inputs/inputs');

var _common = require('./common');

var size = {
    properties: [{
        key: "size_header",
        inputtype: _inputs.SectionInput,
        name: false,
        sort: (0, _common.inc_base_sort)(),
        data: { header: "Size", expanded: false }
    }, {
        name: "Width",
        key: "width",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.CssUnitInput
    }, {
        name: "Height",
        key: "height",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.CssUnitInput
    }, {
        name: "Min Width",
        key: "min-width",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.CssUnitInput
    }, {
        name: "Min Height",
        key: "min-height",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.CssUnitInput
    }, {
        name: "Max Width",
        key: "max-width",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.CssUnitInput
    }, {
        name: "Max Height",
        key: "max-height",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.CssUnitInput
    }]
};

exports.default = size;

},{"../inputs/inputs":126,"./common":94}],98:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../inputs/inputs');

var _common = require('./common');

var padding = {
    properties: [{
        key: "paddings_header",
        inputtype: _inputs.SectionInput,
        name: false,
        sort: (0, _common.inc_base_sort)(),
        data: { header: "Padding", expanded: false }
    }, {
        name: "Top",
        key: "padding-top",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.CssUnitInput
    }, {
        name: "Right",
        key: "padding-right",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.CssUnitInput
    }, {
        name: "Bottom",
        key: "padding-bottom",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.CssUnitInput
    }, {
        name: "Left",
        key: "padding-Left",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.CssUnitInput
    }]
};

exports.default = padding;

},{"../inputs/inputs":126,"./common":94}],97:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../inputs/inputs');

var _common = require('./common');

var margin = {
    properties: [{
        key: "margins_header",
        inputtype: _inputs.SectionInput,
        name: false,
        sort: (0, _common.inc_base_sort)(),
        data: { header: "Margin", expanded: false }
    }, {
        name: "Top",
        key: "margin-top",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.CssUnitInput
    }, {
        name: "Right",
        key: "margin-right",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.CssUnitInput
    }, {
        name: "Bottom",
        key: "margin-bottom",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.CssUnitInput
    }, {
        name: "Left",
        key: "margin-Left",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.CssUnitInput
    }]
};

exports.default = margin;

},{"../inputs/inputs":126,"./common":94}],96:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../inputs/inputs');

var _common = require('./common');

var element = {
    name: "Element",
    properties: [{
        key: "element_header",
        inputtype: _inputs.SectionInput,
        name: false,
        sort: (0, _common.inc_base_sort)(),
        data: { header: "General" }
    }, {
        name: "Id",
        key: "id",
        htmlAttr: "id",
        sort: (0, _common.inc_base_sort)(),
        inline: true,
        col: 6,
        inputtype: _inputs.TextInput
    }, {
        name: "Class",
        key: "class",
        htmlAttr: "class",
        sort: (0, _common.inc_base_sort)(),
        inline: true,
        col: 6,
        inputtype: _inputs.TextInput
    }]
};

exports.default = element;

},{"../inputs/inputs":126,"./common":94}],95:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require('./common');

var _inputs = require('../inputs/inputs');

var display = {
    properties: [{
        key: "display_header",
        inputtype: _inputs.SectionInput,
        name: false,
        sort: (0, _common.inc_base_sort)(),
        data: { header: "Display" }
    }, {
        name: "Display",
        key: "display",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.SelectInput,
        validValues: ["block", "inline", "inline-block", "none"],
        data: {
            options: [{
                value: "block",
                text: "Block"
            }, {
                value: "inline",
                text: "Inline"
            }, {
                value: "inline-block",
                text: "Inline Block"
            }, {
                value: "none",
                text: "none"
            }]
        }
    }, {
        name: "Position",
        key: "position",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.SelectInput,
        validValues: ["static", "fixed", "relative", "absolute"],
        data: {
            options: [{
                value: "static",
                text: "Static"
            }, {
                value: "fixed",
                text: "Fixed"
            }, {
                value: "relative",
                text: "Relative"
            }, {
                value: "absolute",
                text: "Absolute"
            }]
        }
    }, {
        name: "Top",
        key: "top",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        parent: "",
        inputtype: _inputs.CssUnitInput
    }, {
        name: "Left",
        key: "left",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        parent: "",
        inputtype: _inputs.CssUnitInput
    }, {
        name: "Bottom",
        key: "bottom",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        parent: "",
        inputtype: _inputs.CssUnitInput
    }, {
        name: "Right",
        key: "right",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        parent: "",
        inputtype: _inputs.CssUnitInput
    }, {
        name: "Float",
        key: "float",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 12,
        inline: true,
        inputtype: _inputs.RadioButtonInput,
        data: {
            extraclass: "btn-group-sm btn-group-fullwidth",
            options: [{
                value: "none",
                icon: "la la-close",
                //text: "None",
                title: "None",
                checked: true
            }, {
                value: "left",
                //text: "Left",
                title: "Left",
                icon: "la la-align-left",
                checked: false
            }, {
                value: "right",
                //text: "Right",
                title: "Right",
                icon: "la la-align-right",
                checked: false
            }]
        }
    }, {
        name: "Opacity",
        key: "opacity",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 12,
        inline: true,
        parent: "",
        inputtype: _inputs.RangeInput,
        data: {
            max: 1, //max zoom level
            min: 0,
            step: 0.1
        }
    }, {
        name: "Background Color",
        key: "background-color",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        htmlAttr: "style",
        inputtype: _inputs.ColorInput
    }, {
        name: "Text Color",
        key: "color",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        htmlAttr: "style",
        inputtype: _inputs.ColorInput
    }]
};

exports.default = display;

},{"../inputs/inputs":126,"./common":94}],93:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../inputs/inputs');

var _common = require('./common');

var border = {
    properties: [{
        key: "border_header",
        inputtype: _inputs.SectionInput,
        name: false,
        sort: (0, _common.inc_base_sort)(),
        data: { header: "Border", expanded: false }
    }, {
        name: "Style",
        key: "border-style",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 12,
        inline: true,
        inputtype: _inputs.SelectInput,
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "solid",
                text: "Solid"
            }, {
                value: "dotted",
                text: "Dotted"
            }, {
                value: "dashed",
                text: "Dashed"
            }]
        }
    }, {
        name: "Width",
        key: "border-width",
        htmlAttr: "style",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        inputtype: _inputs.CssUnitInput
    }, {
        name: "Color",
        key: "border-color",
        sort: (0, _common.inc_base_sort)(),
        col: 6,
        inline: true,
        htmlAttr: "style",
        inputtype: _inputs.ColorInput
    }]
};

exports.default = border;

},{"../inputs/inputs":126,"./common":94}],63:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.labeldiv = exports.textareainput = exports.tablerow = exports.tablehead = exports.tablecell = exports.tablebody = exports.table = exports.tableheadercell = exports.selectinput = exports.radiobutton = exports.progress = exports.pagination = exports.pageitem = exports.navbar = exports.listitem = exports.listgroup = exports.link = exports.jumbotron = exports.image = exports.hr = exports.heading = exports.gridrow = exports.gridcolumn = exports.form = exports.fileinput = exports.checkbox = exports.card = exports.buttontoolbar = exports.buttongroup = exports.breadcrumbs = exports.breadcrumbitem = exports.badge = exports.alert = exports.container = exports.div = exports.button = exports.textinput = exports.label = undefined;

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _textinput = require('./textinput');

var _textinput2 = _interopRequireDefault(_textinput);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _div = require('./div');

var _div2 = _interopRequireDefault(_div);

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

var _alert = require('./alert');

var _alert2 = _interopRequireDefault(_alert);

var _badge = require('./badge');

var _badge2 = _interopRequireDefault(_badge);

var _breadcrumbitem = require('./breadcrumbitem');

var _breadcrumbitem2 = _interopRequireDefault(_breadcrumbitem);

var _breadcrumbs = require('./breadcrumbs');

var _breadcrumbs2 = _interopRequireDefault(_breadcrumbs);

var _buttongroup = require('./buttongroup');

var _buttongroup2 = _interopRequireDefault(_buttongroup);

var _buttontoolbar = require('./buttontoolbar');

var _buttontoolbar2 = _interopRequireDefault(_buttontoolbar);

var _card = require('./card');

var _card2 = _interopRequireDefault(_card);

var _checkbox = require('./checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _fileinput = require('./fileinput');

var _fileinput2 = _interopRequireDefault(_fileinput);

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _gridcolumn = require('./gridcolumn');

var _gridcolumn2 = _interopRequireDefault(_gridcolumn);

var _gridrow = require('./gridrow');

var _gridrow2 = _interopRequireDefault(_gridrow);

var _heading = require('./heading');

var _heading2 = _interopRequireDefault(_heading);

var _hr = require('./hr');

var _hr2 = _interopRequireDefault(_hr);

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

var _jumbotron = require('./jumbotron');

var _jumbotron2 = _interopRequireDefault(_jumbotron);

var _link = require('./link');

var _link2 = _interopRequireDefault(_link);

var _listgroup = require('./listgroup');

var _listgroup2 = _interopRequireDefault(_listgroup);

var _listitem = require('./listitem');

var _listitem2 = _interopRequireDefault(_listitem);

var _navbar = require('./navbar');

var _navbar2 = _interopRequireDefault(_navbar);

var _pageitem = require('./pageitem');

var _pageitem2 = _interopRequireDefault(_pageitem);

var _pagination = require('./pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _progress = require('./progress');

var _progress2 = _interopRequireDefault(_progress);

var _radiobutton = require('./radiobutton');

var _radiobutton2 = _interopRequireDefault(_radiobutton);

var _selectinput = require('./selectinput');

var _selectinput2 = _interopRequireDefault(_selectinput);

var _tableheadercell = require('./tableheadercell');

var _tableheadercell2 = _interopRequireDefault(_tableheadercell);

var _table = require('./table');

var _table2 = _interopRequireDefault(_table);

var _tablebody = require('./tablebody');

var _tablebody2 = _interopRequireDefault(_tablebody);

var _tablecell = require('./tablecell');

var _tablecell2 = _interopRequireDefault(_tablecell);

var _tablehead = require('./tablehead');

var _tablehead2 = _interopRequireDefault(_tablehead);

var _tablerow = require('./tablerow');

var _tablerow2 = _interopRequireDefault(_tablerow);

var _textareainput = require('./textareainput');

var _textareainput2 = _interopRequireDefault(_textareainput);

var _labeldiv = require('./labeldiv');

var _labeldiv2 = _interopRequireDefault(_labeldiv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.label = _label2.default;
exports.textinput = _textinput2.default;
exports.button = _button2.default;
exports.div = _div2.default;
exports.container = _container2.default;
exports.alert = _alert2.default;
exports.badge = _badge2.default;
exports.breadcrumbitem = _breadcrumbitem2.default;
exports.breadcrumbs = _breadcrumbs2.default;
exports.buttongroup = _buttongroup2.default;
exports.buttontoolbar = _buttontoolbar2.default;
exports.card = _card2.default;
exports.checkbox = _checkbox2.default;
exports.fileinput = _fileinput2.default;
exports.form = _form2.default;
exports.gridcolumn = _gridcolumn2.default;
exports.gridrow = _gridrow2.default;
exports.heading = _heading2.default;
exports.hr = _hr2.default;
exports.image = _image2.default;
exports.jumbotron = _jumbotron2.default;
exports.link = _link2.default;
exports.listgroup = _listgroup2.default;
exports.listitem = _listitem2.default;
exports.navbar = _navbar2.default;
exports.pageitem = _pageitem2.default;
exports.pagination = _pagination2.default;
exports.progress = _progress2.default;
exports.radiobutton = _radiobutton2.default;
exports.selectinput = _selectinput2.default;
exports.tableheadercell = _tableheadercell2.default;
exports.table = _table2.default;
exports.tablebody = _tablebody2.default;
exports.tablecell = _tablecell2.default;
exports.tablehead = _tablehead2.default;
exports.tablerow = _tablerow2.default;
exports.textareainput = _textareainput2.default;
exports.labeldiv = _labeldiv2.default;

},{"./alert":54,"./badge":55,"./breadcrumbitem":56,"./breadcrumbs":57,"./button":58,"./buttongroup":59,"./buttontoolbar":60,"./card":61,"./checkbox":62,"./container":64,"./div":65,"./fileinput":66,"./form":67,"./gridcolumn":68,"./gridrow":69,"./heading":70,"./hr":71,"./image":72,"./jumbotron":73,"./label":74,"./labeldiv":75,"./link":76,"./listgroup":77,"./listitem":78,"./navbar":79,"./pageitem":80,"./pagination":81,"./progress":82,"./radiobutton":83,"./selectinput":84,"./table":85,"./tablebody":86,"./tablecell":87,"./tablehead":88,"./tableheadercell":89,"./tablerow":90,"./textareainput":91,"./textinput":92}],92:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var textinput = {
    name: "Text Input",
    attributes: { "type": "text" },
    image: "icons/text_input.svg",
    html: '<div class="form-group" style="display: inline-block;"><label>Text</label><input type="text" class="form-control"></div></div>',
    properties: [{
        name: "Value",
        key: "value",
        htmlAttr: "value",
        inputtype: _inputs.TextInput
    }, {
        name: "Placeholder",
        key: "placeholder",
        htmlAttr: "placeholder",
        inputtype: _inputs.TextInput
    }]
};

exports.default = textinput;

},{"../../inputs/inputs":126}],91:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var textareainput = {
    name: "Text Area",
    image: "icons/text_area.svg",
    html: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>'
};

exports.default = textareainput;

},{}],90:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var tablerow = {
    nodes: ["tr"],
    name: "Table Row",
    html: "<tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr>",
    properties: [{
        name: "Type",
        key: "type",
        htmlAttr: "class",
        inputtype: _inputs.SelectInput,
        validValues: ["", "success", "danger", "warning", "active"],
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "success",
                text: "Success"
            }, {
                value: "error",
                text: "Error"
            }, {
                value: "warning",
                text: "Warning"
            }, {
                value: "active",
                text: "Active"
            }]
        }
    }]
};

exports.default = tablerow;

},{"../../inputs/inputs":126}],89:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var tableheadercell = {
    nodes: ["th"],
    name: "Table Header Cell",
    html: "<th>Head</th>"
};

exports.default = tableheadercell;

},{}],88:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var tablehead = {
    nodes: ["thead"],
    name: "Table Head",
    html: "<thead><tr><th>Head 1</th><th>Head 2</th><th>Head 3</th></tr></thead>",
    properties: [{
        name: "Type",
        key: "type",
        htmlAttr: "class",
        inputtype: _inputs.SelectInput,
        validValues: ["", "success", "danger", "warning", "info"],
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "success",
                text: "Success"
            }, {
                value: "anger",
                text: "Error"
            }, {
                value: "warning",
                text: "Warning"
            }, {
                value: "info",
                text: "Info"
            }]
        }
    }]
};

exports.default = tablehead;

},{"../../inputs/inputs":126}],87:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var tablecell = {
    nodes: ["td"],
    name: "Table Cell",
    html: "<td>Cell</td>"
};

exports.default = tablecell;

},{}],86:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var tablebody = {
    nodes: ["tbody"],
    name: "Table Body",
    html: "<tbody><tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr></tbody>"
};

exports.default = tablebody;

},{}],85:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var table = {
    nodes: ["table"],
    classes: ["table"],
    image: "icons/table.svg",
    name: "Table",
    html: '<table class="table">\
		  <thead>\
			<tr>\
			  <th>#</th>\
			  <th>First Name</th>\
			  <th>Last Name</th>\
			  <th>Username</th>\
			</tr>\
		  </thead>\
		  <tbody>\
			<tr>\
			  <th scope="row">1</th>\
			  <td>Mark</td>\
			  <td>Otto</td>\
			  <td>@mdo</td>\
			</tr>\
			<tr>\
			  <th scope="row">2</th>\
			  <td>Jacob</td>\
			  <td>Thornton</td>\
			  <td>@fat</td>\
			</tr>\
			<tr>\
			  <th scope="row">3</th>\
			  <td>Larry</td>\
			  <td>the Bird</td>\
			  <td>@twitter</td>\
			</tr>\
		  </tbody>\
		</table>',
    properties: [{
        name: "Type",
        key: "type",
        htmlAttr: "class",
        validValues: ["table-primary", "table-secondary", "table-success", "table-danger", "table-warning", "table-info", "table-light", "table-dark", "table-white"],
        inputtype: _inputs.SelectInput,
        data: {
            options: [{
                value: "Default",
                text: ""
            }, {
                value: "table-primary",
                text: "Primary"
            }, {
                value: "table-secondary",
                text: "Secondary"
            }, {
                value: "table-success",
                text: "Success"
            }, {
                value: "table-danger",
                text: "Danger"
            }, {
                value: "table-warning",
                text: "Warning"
            }, {
                value: "table-info",
                text: "Info"
            }, {
                value: "table-light",
                text: "Light"
            }, {
                value: "table-dark",
                text: "Dark"
            }, {
                value: "table-white",
                text: "White"
            }]
        }
    }, {
        name: "Responsive",
        key: "responsive",
        htmlAttr: "class",
        validValues: ["table-responsive"],
        inputtype: _inputs.ToggleInput,
        data: {
            on: "table-responsive",
            off: ""
        }
    }, {
        name: "Small",
        key: "small",
        htmlAttr: "class",
        validValues: ["table-sm"],
        inputtype: _inputs.ToggleInput,
        data: {
            on: "table-sm",
            off: ""
        }
    }, {
        name: "Hover",
        key: "hover",
        htmlAttr: "class",
        validValues: ["table-hover"],
        inputtype: _inputs.ToggleInput,
        data: {
            on: "table-hover",
            off: ""
        }
    }, {
        name: "Bordered",
        key: "bordered",
        htmlAttr: "class",
        validValues: ["table-bordered"],
        inputtype: _inputs.ToggleInput,
        data: {
            on: "table-bordered",
            off: ""
        }
    }, {
        name: "Striped",
        key: "striped",
        htmlAttr: "class",
        validValues: ["table-striped"],
        inputtype: _inputs.ToggleInput,
        data: {
            on: "table-striped",
            off: ""
        }
    }, {
        name: "Inverse",
        key: "inverse",
        htmlAttr: "class",
        validValues: ["table-inverse"],
        inputtype: _inputs.ToggleInput,
        data: {
            on: "table-inverse",
            off: ""
        }
    }, {
        name: "Head options",
        key: "head",
        htmlAttr: "class",
        child: "thead",
        inputtype: _inputs.SelectInput,
        validValues: ["", "thead-inverse", "thead-default"],
        data: {
            options: [{
                value: "",
                text: "None"
            }, {
                value: "thead-default",
                text: "Default"
            }, {
                value: "thead-inverse",
                text: "Inverse"
            }]
        }
    }]
};

exports.default = table;

},{"../../inputs/inputs":126}],84:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _builder = require('../../builder');

var _builder2 = _interopRequireDefault(_builder);

var _inputs = require('../../inputs/inputs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectinput = {
    nodes: ["select"],
    name: "Select Input",
    image: "icons/select_input.svg",
    html: '<div class="form-group" style="display: inline-block;"><label>Choose an option </label><select class="form-control"><option value="value1">Text 1</option><option value="value2">Text 2</option><option value="value3">Text 3</option></select></div>',

    beforeInit: function beforeInit(node) {
        properties = [];
        var i = 0;

        $(node).find('option').each(function () {

            data = { "value": this.value, "text": this.text };

            i++;
            properties.push({
                name: "Option " + i,
                key: "option" + i,
                //index: i - 1,
                optionNode: this,
                inputtype: _inputs.TextValueInput,
                data: data,
                onChange: function onChange(node, value, input) {

                    option = $(this.optionNode);

                    //if remove button is clicked remove option and render row properties
                    if (input.nodeName == 'BUTTON') {
                        option.remove();
                        _builder2.default.Components.render("html/selectinput");
                        return node;
                    }

                    if (input.name == "value") option.attr("value", value);else if (input.name == "text") option.text(value);

                    return node;
                }
            });
        });

        //remove all option properties
        this.properties = this.properties.filter(function (item) {
            return item.key.indexOf("option") === -1;
        });

        //add remaining properties to generated column properties
        properties.push(this.properties[0]);

        this.properties = properties;
        return node;
    },

    properties: [{
        name: "Option",
        key: "option1",
        inputtype: _inputs.TextValueInput
    }, {
        name: "Option",
        key: "option2",
        inputtype: _inputs.TextValueInput
    }, {
        name: "",
        key: "addChild",
        inputtype: _inputs.ButtonInput,
        data: { text: "Add option" },
        onChange: function onChange(node) {
            $(node).append('<option value="value">Text</option>');

            //render component properties again to include the new column inputs
            _builder2.default.Components.render("html/selectinput");

            return node;
        }
    }]
};

exports.default = selectinput;

},{"../../builder":52,"../../inputs/inputs":126}],83:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var radiobutton = {
    name: "Radio Button",
    attributes: { "type": "radio" },
    image: "icons/radio.svg",
    html: '<label class="radio"><input type="radio"> Radio</label>',
    properties: [{
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: _inputs.TextInput
    }]
};

exports.default = radiobutton;

},{"../../inputs/inputs":126}],82:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../../inputs/inputs');

var _common = require('../common');

var progress = {
    classes: ["progress"],
    name: "Progress Bar",
    image: "icons/progressbar.svg",
    html: '<div class="progress"><div class="progress-bar w-25"></div></div>',
    properties: [{
        name: "Background",
        key: "background",
        htmlAttr: "class",
        validValues: _common.bgcolorClasses,
        inputtype: _inputs.SelectInput,
        data: {
            options: _common.bgcolorSelectOptions
        }
    }, {
        name: "Progress",
        key: "background",
        child: ".progress-bar",
        htmlAttr: "class",
        validValues: ["", "w-25", "w-50", "w-75", "w-100"],
        inputtype: _inputs.SelectInput,
        data: {
            options: [{
                value: "",
                text: "None"
            }, {
                value: "w-25",
                text: "25%"
            }, {
                value: "w-50",
                text: "50%"
            }, {
                value: "w-75",
                text: "75%"
            }, {
                value: "w-100",
                text: "100%"
            }]
        }
    }, {
        name: "Progress background",
        key: "background",
        child: ".progress-bar",
        htmlAttr: "class",
        validValues: _common.bgcolorClasses,
        inputtype: _inputs.SelectInput,
        data: {
            options: _common.bgcolorSelectOptions
        }
    }, {
        name: "Striped",
        key: "striped",
        child: ".progress-bar",
        htmlAttr: "class",
        validValues: ["", "progress-bar-striped"],
        inputtype: _inputs.ToggleInput,
        data: {
            on: "progress-bar-striped",
            off: ""
        }
    }, {
        name: "Animated",
        key: "animated",
        child: ".progress-bar",
        htmlAttr: "class",
        validValues: ["", "progress-bar-animated"],
        inputtype: _inputs.ToggleInput,
        data: {
            on: "progress-bar-animated",
            off: ""
        }
    }]
};

exports.default = progress;

},{"../../inputs/inputs":126,"../common":94}],81:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var pagination = {
    classes: ["pagination"],
    name: "Pagination",
    image: "icons/pagination.svg",
    html: '<nav aria-label="Page navigation example">\
	  <ul class="pagination">\
		<li class="page-item"><a class="page-link" href="#">Previous</a></li>\
		<li class="page-item"><a class="page-link" href="#">1</a></li>\
		<li class="page-item"><a class="page-link" href="#">2</a></li>\
		<li class="page-item"><a class="page-link" href="#">3</a></li>\
		<li class="page-item"><a class="page-link" href="#">Next</a></li>\
	  </ul>\
	</nav>',

    properties: [{
        name: "Size",
        key: "size",
        htmlAttr: "class",
        inputtype: _inputs.SelectInput,
        validValues: ["btn-lg", "btn-sm"],
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "btn-lg",
                text: "Large"
            }, {
                value: "btn-sm",
                text: "Small"
            }]
        }
    }, {
        name: "Alignment",
        key: "alignment",
        htmlAttr: "class",
        inputtype: _inputs.SelectInput,
        validValues: ["justify-content-center", "justify-content-end"],
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "justify-content-center",
                text: "Center"
            }, {
                value: "justify-content-end",
                text: "Right"
            }]
        }
    }]
};

exports.default = pagination;

},{"../../inputs/inputs":126}],80:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../../inputs/inputs');

var pageitem = {
    classes: ["page-item"],
    html: '<li class="page-item"><a class="page-link" href="#">1</a></li>',
    name: "Pagination Item",
    properties: [{
        name: "Link To",
        key: "href",
        htmlAttr: "href",
        child: ".page-link",
        inputtype: _inputs.TextInput
    }, {
        name: "Disabled",
        key: "disabled",
        htmlAttr: "class",
        validValues: ["disabled"],
        inputtype: _inputs.ToggleInput,
        data: {
            on: "disabled",
            off: ""
        }
    }]
};

exports.default = pageitem;

},{"../../inputs/inputs":126}],79:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../../inputs/inputs');

var _common = require('../common');

var navbar = {
    classes: ["navbar"],
    image: "icons/navbar.svg",
    name: "Nav Bar",
    html: '<nav class="navbar navbar-expand-lg navbar-light bg-light">\
		  <a class="navbar-brand" href="#">Navbar</a>\
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">\
			<span class="navbar-toggler-icon"></span>\
		  </button>\
		\
		  <div class="collapse navbar-collapse" id="navbarSupportedContent">\
			<ul class="navbar-nav mr-auto">\
			  <li class="nav-item active">\
				<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>\
			  </li>\
			  <li class="nav-item">\
				<a class="nav-link" href="#">Link</a>\
			  </li>\
			  <li class="nav-item">\
				<a class="nav-link disabled" href="#">Disabled</a>\
			  </li>\
			</ul>\
			<form class="form-inline my-2 my-lg-0">\
			  <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">\
			  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>\
			</form>\
		  </div>\
		</nav>',

    properties: [{
        name: "Color theme",
        key: "color",
        htmlAttr: "class",
        validValues: ["navbar-light", "navbar-dark"],
        inputtype: _inputs.SelectInput,
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "navbar-light",
                text: "Light"
            }, {
                value: "navbar-dark",
                text: "Dark"
            }]
        }
    }, {
        name: "Background color",
        key: "background",
        htmlAttr: "class",
        validValues: _common.bgcolorClasses,
        inputtype: _inputs.SelectInput,
        data: {
            options: _common.bgcolorSelectOptions
        }
    }, {
        name: "Placement",
        key: "placement",
        htmlAttr: "class",
        validValues: ["fixed-top", "fixed-bottom", "sticky-top"],
        inputtype: _inputs.SelectInput,
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "fixed-top",
                text: "Fixed Top"
            }, {
                value: "fixed-bottom",
                text: "Fixed Bottom"
            }, {
                value: "sticky-top",
                text: "Sticky top"
            }]
        }
    }]
};

exports.default = navbar;

},{"../../inputs/inputs":126,"../common":94}],78:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var listitem = {
    name: "List Item",
    classes: ["list-group-item"],
    html: '<li class="list-group-item"><span class="badge">14</span> Cras justo odio</li>'
};

exports.default = listitem;

},{}],77:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var listgroup = {
    name: "List Group",
    image: "icons/list_group.svg",
    classes: ["list-group"],
    html: '<ul class="list-group">\n  <li class="list-group-item">\n    <span class="badge">14</span>\n    Cras justo odio\n  </li>\n  <li class="list-group-item">\n    <span class="badge">2</span>\n    Dapibus ac facilisis in\n  </li>\n  <li class="list-group-item">\n    <span class="badge">1</span>\n    Morbi leo risus\n  </li>\n</ul>'
};

exports.default = listgroup;

},{}],76:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var link = {
    nodes: ["a"],
    name: "Link",
    properties: [{
        name: "Url",
        key: "href",
        htmlAttr: "href",
        inputtype: _inputs.LinkInput
    }, {
        name: "Target",
        key: "target",
        htmlAttr: "target",
        inputtype: _inputs.TextInput
    }]
};

exports.default = link;

},{"../../inputs/inputs":126}],75:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var labeldiv = {
    name: 'Label Div',
    image: 'icons/label.svg',
    html: '<div class="everyOutbox-left">\n                <i class="fa fa-caret-square-o-right text-danger" aria-hidden="true"></i>\n                <span class="theme">Period</span>\n           </div>'
};

exports.default = labeldiv;

},{}],74:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../../inputs/inputs');

var label = {
    name: 'Label',
    nodes: ['label'],
    image: 'icons/label.svg',
    html: '<label for="">Label</label>',
    properties: [{
        name: 'For id',
        htmlAttr: 'for',
        key: 'for',
        inputtype: _inputs.TextInput
    }]
};

exports.default = label;

},{"../../inputs/inputs":126}],73:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});
var jumbotron = {
	classes: ["jumbotron"],
	image: "icons/jumbotron.svg",
	name: "Jumbotron",
	html: '<div class="jumbotron">\
		  <h1 class="display-3">Hello, world!</h1>\
		  <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>\
		  <hr class="my-4">\
		  <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>\
		  <p class="lead">\
			<a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>\
		  </p>\
		</div>'
};

exports.default = jumbotron;

},{}],72:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _builder = require('../../builder');

var _builder2 = _interopRequireDefault(_builder);

var _inputs = require('../../inputs/inputs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var image = {
    nodes: ["img"],
    name: "Image",
    html: '<img src="' + _builder2.default.baseUrl + 'icons/image.svg" height="128" width="128">',
    /*
    afterDrop: function (node)
    {
    node.attr("src", '');
    return node;
    },*/
    image: "icons/image.svg",
    properties: [{
        name: "Image",
        key: "src",
        htmlAttr: "src",
        inputtype: _inputs.FileUploadInput
    }, {
        name: "Width",
        key: "width",
        htmlAttr: "width",
        inputtype: _inputs.TextInput
    }, {
        name: "Height",
        key: "height",
        htmlAttr: "height",
        inputtype: _inputs.TextInput
    }, {
        name: "Alt",
        key: "alt",
        htmlAttr: "alt",
        inputtype: _inputs.TextInput
    }]
};

exports.default = image;

},{"../../builder":52,"../../inputs/inputs":126}],71:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var hr = {
    image: "icons/hr.svg",
    nodes: ["hr"],
    name: "Horizontal Rule",
    html: "<hr>"
};

exports.default = hr;

},{}],70:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require('../common');

var _inputs = require('../../inputs/inputs');

var heading = {
    image: "icons/heading.svg",
    name: "Heading",
    nodes: ["h1", "h2", "h3", "h4", "h5", "h6"],
    html: "<h1>Heading</h1>",

    properties: [{
        name: "Size",
        key: "id",
        htmlAttr: "id",
        inputtype: _inputs.SelectInput,

        onChange: function onChange(node, value) {

            return (0, _common.changeNodeName)(node, "h" + value);
        },

        init: function init(node) {
            var regex;
            regex = /H(\d)/.exec(node.nodeName);
            if (regex && regex[1]) {
                return regex[1];
            }
            return 1;
        },

        data: {
            options: [{
                value: "1",
                text: "1"
            }, {
                value: "2",
                text: "2"
            }, {
                value: "3",
                text: "3"
            }, {
                value: "4",
                text: "4"
            }, {
                value: "5",
                text: "5"
            }, {
                value: "6",
                text: "6"
            }]
        }
    }]
};

exports.default = heading;

},{"../../inputs/inputs":126,"../common":94}],69:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var gridrow = {
    name: "Grid Row",
    image: "icons/grid_row.svg",
    classes: ["row"],
    html: '<div class="row"><div class="col-sm-4"><h3>col-sm-4</h3></div><div class="col-sm-4 col-5"><h3>col-sm-4</h3></div><div class="col-sm-4"><h3>col-sm-4</h3></div></div>',

    beforeInit: function beforeInit(node) {
        properties = [];
        var i = 0;
        var j = 0;

        $(node).find('[class*="col-"]').each(function () {
            _class = $(this).attr("class");

            var reg = /col-([^-\$ ]*)?-?(\d+)/g;
            var match;
            data = {};

            while ((match = reg.exec(_class)) != null) {
                data["col" + (match[1] != undefined ? "_" + match[1] : "")] = match[2];
            }

            i++;
            properties.push({
                name: "Column " + i,
                key: "column" + i,
                //index: i - 1,
                columnNode: this,
                inline: true,
                inputtype: _inputs.GridInput,
                data: data,
                onChange: function onChange(node, value, input) {

                    //column = $('[class*="col-"]:eq(' + this.index + ')', node);
                    column = $(this.columnNode);

                    //if remove button is clicked remove column and render row properties
                    if (input.nodeName == 'BUTTON') {
                        column.remove();
                        Vvveb.Components.render("html/gridrow");
                        return node;
                    }

                    //if select input then change column class
                    _class = column.attr("class");

                    //remove previous breakpoint column size
                    _class = _class.replace(new RegExp(input.name + '-\\d+?'), '');
                    //add new column size
                    if (value) _class += ' ' + input.name + '-' + value;
                    column.attr("class", _class);

                    return node;
                }
            });
        });

        //remove all column properties
        this.properties = this.properties.filter(function (item) {
            return item.key.indexOf("column") === -1;
        });

        //add remaining properties to generated column properties
        properties.push(this.properties[0]);

        this.properties = properties;
        return node;
    },

    properties: [{
        name: "Column",
        key: "column1",
        inputtype: _inputs.GridInput
    }, {
        name: "Column",
        key: "column1",
        inline: true,
        col: 12,
        inputtype: _inputs.GridInput
    }, {
        name: "",
        key: "addChild",
        inputtype: _inputs.ButtonInput,
        data: { text: "Add column" },
        onChange: function onChange(node) {
            $(node).append('<div class="col-3">Col-3</div>');

            //render component properties again to include the new column inputs
            Vvveb.Components.render("html/gridrow");

            return node;
        }
    }]
};

exports.default = gridrow;

},{"../../inputs/inputs":126}],68:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var gridcolumn = {
    name: "Grid Column",
    image: "icons/grid_row.svg",
    classesRegex: ["col-"],
    html: '<div class="col-sm-4"><h3>col-sm-4</h3></div>',
    properties: [{
        name: "Column",
        key: "column",
        inputtype: _inputs.GridInput,
        data: { hide_remove: true },

        beforeInit: function beforeInit(node) {
            _class = $(node).attr("class");

            var reg = /col-([^-\$ ]*)?-?(\d+)/g;
            var match;

            while ((match = reg.exec(_class)) != null) {
                this.data["col" + (match[1] != undefined ? "_" + match[1] : "")] = match[2];
            }
        },

        onChange: function onChange(node, value, input) {
            _class = node.attr("class");

            //remove previous breakpoint column size
            _class = _class.replace(new RegExp(input.name + '-\\d+?'), '');
            //add new column size
            if (value) _class += ' ' + input.name + '-' + value;
            node.attr("class", _class);

            return node;
        }
    }]
};

exports.default = gridcolumn;

},{"../../inputs/inputs":126}],67:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var form = {
    nodes: ["form"],
    image: "icons/form.svg",
    name: "Form",
    html: '<form class="dropzone"></form>',
    properties: [{
        name: "Style",
        key: "style",
        htmlAttr: "class",
        validValues: ["", "form-search", "form-inline", "form-horizontal"],
        inputtype: _inputs.SelectInput,
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "form-search",
                text: "Search"
            }, {
                value: "form-inline",
                text: "Inline"
            }, {
                value: "form-horizontal",
                text: "Horizontal"
            }]
        }
    }, {
        name: "Action",
        key: "action",
        htmlAttr: "action",
        inputtype: _inputs.TextInput
    }, {
        name: "Method",
        key: "method",
        htmlAttr: "method",
        inputtype: _inputs.TextInput
    }]
};

exports.default = form;

},{"../../inputs/inputs":126}],66:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var fileinput = {
    name: "Input group",
    attributes: { "type": "file" },
    image: "icons/text_input.svg",
    html: '<div class="form-group">\
			  <input type="file" class="form-control">\
			</div>'
};

exports.default = fileinput;

},{}],65:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require('../common');

var _inputs = require('../../inputs/inputs');

var div = {
    classes: ["container", "container-fluid"],
    image: "icons/div.svg",
    html: '<div style="width: 350px; height: 200px;" class="dropzone"></div>',
    name: "Div",
    properties: [{
        name: "Type",
        key: "type",
        htmlAttr: "class",
        inputtype: _inputs.SelectInput,
        validValues: ["container", "container-fluid"],
        data: {
            options: [{
                value: "container",
                text: "Default"
            }, {
                value: "container-fluid",
                text: "Fluid"
            }]
        }
    }, {
        name: "Background",
        key: "background",
        htmlAttr: "class",
        validValues: _common.bgcolorClasses,
        inputtype: _inputs.SelectInput,
        data: {
            options: _common.bgcolorSelectOptions
        }
    }, {
        name: "Background Color",
        key: "background-color",
        htmlAttr: "style",
        inputtype: _inputs.ColorInput
    }, {
        name: "Text Color",
        key: "color",
        htmlAttr: "style",
        inputtype: _inputs.ColorInput
    }]
};

exports.default = div;

},{"../../inputs/inputs":126,"../common":94}],64:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../../inputs/inputs');

var _common = require('../common');

var container = {
    classes: ["container", "container-fluid"],
    image: "icons/container.svg",
    html: '<div class="container dropzone"><div class="m-5">Container</div></div>',
    name: "Container",
    properties: [{
        name: "Type",
        key: "type",
        htmlAttr: "class",
        inputtype: _inputs.SelectInput,
        validValues: ["container", "container-fluid"],
        data: {
            options: [{
                value: "container",
                text: "Default"
            }, {
                value: "container-fluid",
                text: "Fluid"
            }]
        }
    }, {
        name: "Background",
        key: "background",
        htmlAttr: "class",
        validValues: _common.bgcolorClasses,
        inputtype: _inputs.SelectInput,
        data: {
            options: _common.bgcolorSelectOptions
        }
    }, {
        name: "Background Color",
        key: "background-color",
        htmlAttr: "style",
        inputtype: _inputs.ColorInput
    }, {
        name: "Text Color",
        key: "color",
        htmlAttr: "style",
        inputtype: _inputs.ColorInput
    }]
};

exports.default = container;

},{"../../inputs/inputs":126,"../common":94}],94:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var bgcolorClasses = ["bg-primary", "bg-secondary", "bg-success", "bg-danger", "bg-warning", "bg-info", "bg-light", "bg-dark", "bg-white"];

var bgcolorSelectOptions = [{
    value: "Default",
    text: ""
}, {
    value: "bg-primary",
    text: "Primary"
}, {
    value: "bg-secondary",
    text: "Secondary"
}, {
    value: "bg-success",
    text: "Success"
}, {
    value: "bg-danger",
    text: "Danger"
}, {
    value: "bg-warning",
    text: "Warning"
}, {
    value: "bg-info",
    text: "Info"
}, {
    value: "bg-light",
    text: "Light"
}, {
    value: "bg-dark",
    text: "Dark"
}, {
    value: "bg-white",
    text: "White"
}];

function changeNodeName(node, newNodeName) {
    var newNode;
    newNode = document.createElement(newNodeName);
    attributes = node.get(0).attributes;

    for (i = 0, len = attributes.length; i < len; i++) {
        newNode.setAttribute(attributes[i].nodeName, attributes[i].nodeValue);
    }

    $(newNode).append($(node).contents());
    $(node).replaceWith(newNode);

    return newNode;
}

var base_sort = 100; //start sorting for base component from 100 to allow extended properties to be first
function inc_base_sort() {
    return base_sort++;
}

exports.bgcolorClasses = bgcolorClasses;
exports.bgcolorSelectOptions = bgcolorSelectOptions;
exports.changeNodeName = changeNodeName;
exports.inc_base_sort = inc_base_sort;

},{}],62:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var checkbox = {
    name: "Checkbox",
    attributes: { "type": "checkbox" },
    image: "icons/checkbox.svg",
    html: '<label class="checkbox"><input type="checkbox"> Checkbox</label>',
    properties: [{
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: _inputs.TextInput
    }]
};

exports.default = checkbox;

},{"../../inputs/inputs":126}],61:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});
var card = {
	classes: ["card"],
	image: "icons/panel.svg",
	name: "Card",
	html: '<div class="card">\
		  <img class="card-img-top" src="../libs/builder/icons/image.svg" alt="Card image cap" width="128" height="128">\
		  <div class="card-body">\
			<h4 class="card-title">Card title</h4>\
			<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card\'s content.</p>\
			<a href="#" class="btn btn-primary">Go somewhere</a>\
		  </div>\
		</div>'
};

exports.default = card;

},{}],60:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});
var buttontoolbar = {
	classes: ["btn-toolbar"],
	name: "Button Toolbar",
	image: "icons/button_toolbar.svg",
	html: '<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">\
		  <div class="btn-group mr-2" role="group" aria-label="First group">\
			<button type="button" class="btn btn-secondary">1</button>\
			<button type="button" class="btn btn-secondary">2</button>\
			<button type="button" class="btn btn-secondary">3</button>\
			<button type="button" class="btn btn-secondary">4</button>\
		  </div>\
		  <div class="btn-group mr-2" role="group" aria-label="Second group">\
			<button type="button" class="btn btn-secondary">5</button>\
			<button type="button" class="btn btn-secondary">6</button>\
			<button type="button" class="btn btn-secondary">7</button>\
		  </div>\
		  <div class="btn-group" role="group" aria-label="Third group">\
			<button type="button" class="btn btn-secondary">8</button>\
		  </div>\
		</div>'
};

exports.default = buttontoolbar;

},{}],59:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var buttongroup = {
    classes: ["btn-group"],
    name: "Button Group",
    image: "icons/button_group.svg",
    html: '<div class="btn-group" role="group" aria-label="Basic example"><button type="button" class="btn btn-secondary">Left</button><button type="button" class="btn btn-secondary">Middle</button> <button type="button" class="btn btn-secondary">Right</button></div>',
    properties: [{
        name: "Size",
        key: "size",
        htmlAttr: "class",
        inputtype: _inputs.SelectInput,
        validValues: ["btn-group-lg", "btn-group-sm"],
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "btn-group-lg",
                text: "Large"
            }, {
                value: "btn-group-sm",
                text: "Small"
            }]
        }
    }, {
        name: "Alignment",
        key: "alignment",
        htmlAttr: "class",
        inputtype: _inputs.SelectInput,
        validValues: ["btn-group", "btn-group-vertical"],
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "btn-group",
                text: "Horizontal"
            }, {
                value: "btn-group-vertical",
                text: "Vertical"
            }]
        }
    }]
};

exports.default = buttongroup;

},{"../../inputs/inputs":126}],58:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var button = {
    classes: ["btn", "btn-link"],
    name: "Button",
    image: "icons/button.svg",
    html: '<button type="button" class="btn btn-primary">Primary</button>',
    properties: [{
        name: "Link To",
        key: "href",
        htmlAttr: "href",
        inputtype: _inputs.LinkInput
    }, {
        name: "Type",
        key: "type",
        htmlAttr: "class",
        inputtype: _inputs.SelectInput,
        validValues: ["btn-default", "btn-primary", "btn-info", "btn-success", "btn-warning", "btn-info", "btn-light", "btn-dark", "btn-outline-primary", "btn-outline-info", "btn-outline-success", "btn-outline-warning", "btn-outline-info", "btn-outline-light", "btn-outline-dark", "btn-link"],
        data: {
            options: [{
                value: "btn-default",
                text: "Default"
            }, {
                value: "btn-primary",
                text: "Primary"
            }, {
                value: "btn btn-info",
                text: "Info"
            }, {
                value: "btn-success",
                text: "Success"
            }, {
                value: "btn-warning",
                text: "Warning"
            }, {
                value: "btn-info",
                text: "Info"
            }, {
                value: "btn-light",
                text: "Light"
            }, {
                value: "btn-dark",
                text: "Dark"
            }, {
                value: "btn-outline-primary",
                text: "Primary outline"
            }, {
                value: "btn btn-outline-info",
                text: "Info outline"
            }, {
                value: "btn-outline-success",
                text: "Success outline"
            }, {
                value: "btn-outline-warning",
                text: "Warning outline"
            }, {
                value: "btn-outline-info",
                text: "Info outline"
            }, {
                value: "btn-outline-light",
                text: "Light outline"
            }, {
                value: "btn-outline-dark",
                text: "Dark outline"
            }, {
                value: "btn-link",
                text: "Link"
            }]
        }
    }, {
        name: "Size",
        key: "size",
        htmlAttr: "class",
        inputtype: _inputs.SelectInput,
        validValues: ["btn-lg", "btn-sm"],
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "btn-lg",
                text: "Large"
            }, {
                value: "btn-sm",
                text: "Small"
            }]
        }
    }, {
        name: "Target",
        key: "target",
        htmlAttr: "target",
        inputtype: _inputs.TextInput
    }, {
        name: "Disabled",
        key: "disabled",
        htmlAttr: "class",
        inputtype: _inputs.ToggleInput,
        validValues: ["disabled"],
        data: {
            on: "disabled",
            off: ""
        }
    }]
};

exports.default = button;

},{"../../inputs/inputs":126}],57:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var breadcrumbs = {
    classes: ["breadcrumb"],
    name: "Breadcrumbs",
    image: "icons/breadcrumbs.svg",
    html: '<ol class="breadcrumb">\
		  <li class="breadcrumb-item active"><a href="#">Home</a></li>\
		  <li class="breadcrumb-item active"><a href="#">Library</a></li>\
		  <li class="breadcrumb-item active">Data 3</li>\
		</ol>'
};

exports.default = breadcrumbs;

},{}],56:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var breadcrumbitem = {
    classes: ["breadcrumb-item"],
    name: "Breadcrumb Item",
    html: '<li class="breadcrumb-item"><a href="#">Library</a></li>',
    properties: [{
        name: "Active",
        key: "active",
        htmlAttr: "class",
        validValues: ["", "active"],
        inputtype: _inputs.ToggleInput,
        data: {
            on: "active",
            off: ""
        }
    }]
};

exports.default = breadcrumbitem;

},{"../../inputs/inputs":126}],55:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var badge = {
    classes: ["badge"],
    image: "icons/badge.svg",
    name: "Badge",
    html: '<span class="badge badge-primary">Primary badge</span>',
    properties: [{
        name: "Color",
        key: "color",
        htmlAttr: "class",
        validValues: ["badge-primary", "badge-secondary", "badge-success", "badge-danger", "badge-warning", "badge-info", "badge-light", "badge-dark"],
        inputtype: _inputs.SelectInput,
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "badge-primary",
                text: "Primary"
            }, {
                value: "badge-secondary",
                text: "Secondary"
            }, {
                value: "badge-success",
                text: "Success"
            }, {
                value: "badge-warning",
                text: "Warning"
            }, {
                value: "badge-danger",
                text: "Danger"
            }, {
                value: "badge-info",
                text: "Info"
            }, {
                value: "badge-light",
                text: "Light"
            }, {
                value: "badge-dark",
                text: "Dark"
            }]
        }
    }]
};

exports.default = badge;

},{"../../inputs/inputs":126}],54:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var _inputs2 = _interopRequireDefault(_inputs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alert = {
    classes: ["alert"],
    name: "Alert",
    image: "icons/alert.svg",
    html: '<div class="alert alert-warning alert-dismissible fade show" role="alert">\
		  <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
			<span aria-hidden="true">&times;</span>\
		  </button>\
		  <strong>Holy guacamole!</strong> You should check in on some of those fields below.\
		</div>',
    properties: [{
        name: "Type",
        key: "type",
        htmlAttr: "class",
        validValues: ["alert-primary", "alert-secondary", "alert-success", "alert-danger", "alert-warning", "alert-info", "alert-light", "alert-dark"],
        inputtype: _inputs2.default,
        data: {
            options: [{
                value: "alert-primary",
                text: "Default"
            }, {
                value: "alert-secondary",
                text: "Secondary"
            }, {
                value: "alert-success",
                text: "Success"
            }, {
                value: "alert-danger",
                text: "Danger"
            }, {
                value: "alert-warning",
                text: "Warning"
            }, {
                value: "alert-info",
                text: "Info"
            }, {
                value: "alert-light",
                text: "Light"
            }, {
                value: "alert-dark",
                text: "Dark"
            }]
        }
    }]
};

exports.default = alert;

},{"../../inputs/inputs":126}]},{},[53])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGNvbXBvbmVudHMtYm9vdHN0cmFwNC5qcyIsInNyY1xcY29tcG9uZW50c1xcdHlwb2dyYXBoeS5qcyIsInNyY1xcY29tcG9uZW50c1xcc2l6ZS5qcyIsInNyY1xcY29tcG9uZW50c1xccGFkZGluZy5qcyIsInNyY1xcY29tcG9uZW50c1xcbWFyZ2luLmpzIiwic3JjXFxjb21wb25lbnRzXFxlbGVtZW50LmpzIiwic3JjXFxjb21wb25lbnRzXFxkaXNwbGF5LmpzIiwic3JjXFxjb21wb25lbnRzXFxib3JkZXIuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGNvbXBvbmVudHMuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXHRleHRpbnB1dC5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcdGV4dGFyZWFpbnB1dC5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcdGFibGVyb3cuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXHRhYmxlaGVhZGVyY2VsbC5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcdGFibGVoZWFkLmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFx0YWJsZWNlbGwuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXHRhYmxlYm9keS5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcdGFibGUuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXHNlbGVjdGlucHV0LmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxyYWRpb2J1dHRvbi5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxccHJvZ3Jlc3MuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXHBhZ2luYXRpb24uanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXHBhZ2VpdGVtLmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxuYXZiYXIuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGxpc3RpdGVtLmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxsaXN0Z3JvdXAuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGxpbmsuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGxhYmVsZGl2LmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxsYWJlbC5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcanVtYm90cm9uLmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxpbWFnZS5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcaHIuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGhlYWRpbmcuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGdyaWRyb3cuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGdyaWRjb2x1bW4uanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGZvcm0uanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGZpbGVpbnB1dC5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcZGl2LmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxjb250YWluZXIuanMiLCJzcmNcXGNvbXBvbmVudHNcXGNvbW1vbi5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcY2hlY2tib3guanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGNhcmQuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGJ1dHRvbnRvb2xiYXIuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGJ1dHRvbmdyb3VwLmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxidXR0b24uanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGJyZWFkY3J1bWJzLmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxicmVhZGNydW1iaXRlbS5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcYmFkZ2UuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGFs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QUtULG1CQUFXLGdCQUxGO0FBTVQsY0FBTTtBQUNGLHFCQUFTLENBQUM7QUFDTix1QkFBTyxlQUREO0FBRU4sc0JBQU07QUFGQSxhQUFELEVBR047QUFDQyx1QkFBTyxpQkFEUjtBQUVDLHNCQUFNO0FBRlAsYUFITSxFQU1OO0FBQ0MsdUJBQU8sZUFEUjtBQUVDLHNCQUFNO0FBRlAsYUFOTSxFQVNOO0FBQ0MsdUJBQU8sY0FEUjtBQUVDLHNCQUFNO0FBRlAsYUFUTSxFQVlOO0FBQ0MsdUJBQU8sZUFEUjtBQUVDLHNCQUFNO0FBRlAsYUFaTSxFQWVOO0FBQ0MsdUJBQU8sWUFEUjtBQUVDLHNCQUFNO0FBRlAsYUFmTSxFQWtCTjtBQUNDLHVCQUFPLGFBRFI7QUFFQyxzQkFBTTtBQUZQLGFBbEJNLEVBcUJOO0FBQ0MsdUJBQU8sWUFEUjtBQUVDLHNCQUFNO0FBRlAsYUFyQk07QUFEUDtBQU5HLEtBQUQ7QUFWRixDQUFkOztrQkE4Q2UsSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxyXG5Db3B5cmlnaHQgMjAxNyBaaWFkaW4gR2l2YW5cclxuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblxyXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuXHJcbmh0dHBzOi8vZ2l0aHViLmNvbS9naXZhbi9WdnZlYmpzXHJcbiovXHJcbmltcG9ydCBWdnZlYiBmcm9tICcuL2J1aWxkZXInO1xyXG5pbXBvcnQge1xyXG4gICAgbGFiZWwsIHRleHRpbnB1dCwgYnV0dG9uLCBkaXYsIGNvbnRhaW5lciwgYWxlcnQsIGJhZGdlLCBicmVhZGNydW1iaXRlbSwgYnJlYWRjcnVtYnMsIGJ1dHRvbmdyb3VwLFxyXG4gICAgYnV0dG9udG9vbGJhciwgY2FyZCwgY2hlY2tib3gsIGZpbGVpbnB1dCwgZm9ybSwgZ3JpZGNvbHVtbiwgZ3JpZHJvdywgaGVhZGluZywgaHIsIGltYWdlLCBqdW1ib3Ryb24sXHJcbiAgICBsaW5rLCBsaXN0Z3JvdXAsIGxpc3RpdGVtLCBuYXZiYXIsIHBhZ2VpdGVtLCBwYWdpbmF0aW9uLCBwcm9ncmVzcywgcmFkaW9idXR0b24sIHNlbGVjdGlucHV0LCB0YWJsZWhlYWRlcmNlbGwsXHJcbiAgICB0YWJsZSwgdGFibGVib2R5LCB0YWJsZWNlbGwsIHRhYmxlaGVhZCwgdGFibGVyb3csIHRleHRhcmVhaW5wdXQsXHJcbiAgICBsYWJlbGRpdlxyXG59IGZyb20gJy4vY29tcG9uZW50cy9Ab2VlL2NvbXBvbmVudHMnO1xyXG5pbXBvcnQgZWxlbWVudCBmcm9tICcuL2NvbXBvbmVudHMvZWxlbWVudCc7XHJcbmltcG9ydCBib3JkZXIgZnJvbSAnLi9jb21wb25lbnRzL2JvcmRlcic7XHJcbmltcG9ydCBwYWRkaW5nIGZyb20gJy4vY29tcG9uZW50cy9wYWRkaW5nJztcclxuaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi9jb21wb25lbnRzL2Rpc3BsYXknO1xyXG5pbXBvcnQgdHlwb2dyYXBoeSBmcm9tICcuL2NvbXBvbmVudHMvdHlwb2dyYXBoeSc7XHJcbmltcG9ydCBzaXplIGZyb20gJy4vY29tcG9uZW50cy9zaXplJztcclxuaW1wb3J0IG1hcmdpbiBmcm9tICcuL2NvbXBvbmVudHMvbWFyZ2luJztcclxuXHJcblZ2dmViLkNvbXBvbmVudHNHcm91cFsnQm9vdHN0cmFwIDMnXSA9XHJcbiAgICBbJ2h0bWwvbGFiZWxkaXYnLCAnaHRtbC9sYWJlbCcsICdodG1sL2RpdicsICdodG1sL2J1dHRvbicsICdodG1sL2J1dHRvbmdyb3VwJywgJ2h0bWwvYnV0dG9udG9vbGJhcicsICdodG1sL2Zvcm0nLCAnaHRtbC90ZXh0aW5wdXQnLCAnaHRtbC90ZXh0YXJlYWlucHV0JywgJ2h0bWwvc2VsZWN0aW5wdXQnLCAnaHRtbC9maWxlaW5wdXQnLCAnaHRtbC9jaGVja2JveCcsICdodG1sL3JhZGlvYnV0dG9uJywgJ2h0bWwvdGFibGUnLCAnaHRtbC9oZWFkaW5nJywgJ2h0bWwvaW1hZ2UnLCAnaHRtbC9qdW1ib3Ryb24nLCAnaHRtbC9hbGVydCcsICdodG1sL2NhcmQnLCAnaHRtbC9saXN0Z3JvdXAnLCAnaHRtbC9ocicsICdodG1sL3RhZ2xhYmVsJywgJ2h0bWwvYmFkZ2UnLCAnaHRtbC9wcm9ncmVzcycsICdodG1sL25hdmJhcicsICdodG1sL2JyZWFkY3J1bWJzJywgJ2h0bWwvcGFnaW5hdGlvbicsICdodG1sL2NvbnRhaW5lcicsICdodG1sL2dyaWRyb3cnXTtcclxuXHJcblZ2dmViLkNvbXBvbmVudHMuYWRkKFwiX2Jhc2VcIiwgZWxlbWVudCk7XHJcbi8vZGlzcGxheVxyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiX2Jhc2VcIiwgZGlzcGxheSk7XHJcbi8vVHlwb2dyYXBoeVxyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiX2Jhc2VcIiwgdHlwb2dyYXBoeSlcclxuLy9TaXplXHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJfYmFzZVwiLCBzaXplKTtcclxuLy9NYXJnaW5cclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcIl9iYXNlXCIsIG1hcmdpbik7XHJcbi8vUGFkZGluZ1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiX2Jhc2VcIiwgcGFkZGluZyk7XHJcbi8vQm9yZGVyXHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJfYmFzZVwiLCBib3JkZXIpO1xyXG5cclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvZGl2XCIsIGRpdik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2xhYmVsXCIsIGxhYmVsKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvYnV0dG9uXCIsIGJ1dHRvbik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2NvbnRhaW5lclwiLCBjb250YWluZXIpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9oZWFkaW5nXCIsIGhlYWRpbmcpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9saW5rXCIsIGxpbmspO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9pbWFnZVwiLCBpbWFnZSk7XHJcblZ2dmViLkNvbXBvbmVudHMuYWRkKFwiaHRtbC9oclwiLCBocik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2J1dHRvbmdyb3VwXCIsIGJ1dHRvbmdyb3VwKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvYnV0dG9udG9vbGJhclwiLCBidXR0b250b29sYmFyKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvYWxlcnRcIiwgYWxlcnQpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9iYWRnZVwiLCBiYWRnZSk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2NhcmRcIiwgY2FyZCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2xpc3Rncm91cFwiLCBsaXN0Z3JvdXApO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9saXN0aXRlbVwiLCBsaXN0aXRlbSk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2JyZWFkY3J1bWJzXCIsIGJyZWFkY3J1bWJzKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvYnJlYWRjcnVtYml0ZW1cIiwgYnJlYWRjcnVtYml0ZW0pO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9wYWdpbmF0aW9uXCIsIHBhZ2luYXRpb24pO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9wYWdlaXRlbVwiLCBwYWdlaXRlbSk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL3Byb2dyZXNzXCIsIHByb2dyZXNzKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvanVtYm90cm9uXCIsIGp1bWJvdHJvbik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL25hdmJhclwiLCBuYXZiYXIpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9mb3JtXCIsIGZvcm0pO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC90ZXh0aW5wdXRcIiwgdGV4dGlucHV0KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvc2VsZWN0aW5wdXRcIiwgc2VsZWN0aW5wdXQpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC90ZXh0YXJlYWlucHV0XCIsIHRleHRhcmVhaW5wdXQpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9yYWRpb2J1dHRvblwiLCByYWRpb2J1dHRvbik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2NoZWNrYm94XCIsIGNoZWNrYm94KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvZmlsZWlucHV0XCIsIGZpbGVpbnB1dCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL3RhYmxlXCIsIHRhYmxlKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvdGFibGVyb3dcIiwgdGFibGVyb3cpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC90YWJsZWNlbGxcIiwgdGFibGVjZWxsKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvdGFibGVoZWFkZXJjZWxsXCIsIHRhYmxlaGVhZGVyY2VsbCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL3RhYmxlaGVhZFwiLCB0YWJsZWhlYWQpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC90YWJsZWJvZHlcIiwgdGFibGVib2R5KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5hZGQoXCJodG1sL2dyaWRjb2x1bW5cIiwgZ3JpZGNvbHVtbik7XHJcblZ2dmViLkNvbXBvbmVudHMuYWRkKFwiaHRtbC9ncmlkcm93XCIsIGdyaWRyb3cpO1xyXG5cclxuVnZ2ZWIuQ29tcG9uZW50cy5hZGQoJ2h0bWwvbGFiZWxkaXYnLCBsYWJlbGRpdik7XHJcbiIsImltcG9ydCB7IFNlY3Rpb25JbnB1dCwgU2VsZWN0SW5wdXQsIFJhZGlvQnV0dG9uSW5wdXQsIENzc1VuaXRJbnB1dCwgQ29sb3JJbnB1dCB9IGZyb20gJy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBpbmNfYmFzZV9zb3J0IH0gZnJvbSAnLi9jb21tb24nO1xyXG5cclxuY29uc3QgdHlwb2dyYXBoeSA9IHtcclxuICAgIHByb3BlcnRpZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGtleTogXCJ0eXBvZ3JhcGh5X2hlYWRlclwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlY3Rpb25JbnB1dCxcclxuICAgICAgICAgICAgbmFtZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgZGF0YTogeyBoZWFkZXI6IFwiVHlwb2dyYXBoeVwiIH0sXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkZvbnQgZmFtaWx5XCIsXHJcbiAgICAgICAgICAgIGtleTogXCJmb250LWZhbWlseVwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQXJpYWxcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnTHVjaWRhIFNhbnMgVW5pY29kZVwiLCBcIkx1Y2lkYSBHcmFuZGVcIiwgc2Fucy1zZXJpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0x1Y2lkYSBHcmFuZGUnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdQYWxhdGlubyBMaW5vdHlwZVwiLCBcIkJvb2sgQW50aXF1YVwiLCBQYWxhdGlubywgc2VyaWYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdQYWxhdGlubyBMaW5vdHlwZSdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1wiVGltZXMgTmV3IFJvbWFuXCIsIFRpbWVzLCBzZXJpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1RpbWVzIE5ldyBSb21hbidcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJHZW9yZ2lhLCBzZXJpZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiR2VvcmdpYSwgc2VyaWZcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlRhaG9tYSwgR2VuZXZhLCBzYW5zLXNlcmlmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJUYWhvbWFcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnQ29taWMgU2FucyBNUywgY3Vyc2l2ZSwgc2Fucy1zZXJpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0NvbWljIFNhbnMnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdWZXJkYW5hLCBHZW5ldmEsIHNhbnMtc2VyaWYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdWZXJkYW5hJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnSW1wYWN0LCBDaGFyY29hbCwgc2Fucy1zZXJpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0ltcGFjdCdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ0FyaWFsIEJsYWNrLCBHYWRnZXQsIHNhbnMtc2VyaWYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdBcmlhbCBCbGFjaydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1RyZWJ1Y2hldCBNUywgSGVsdmV0aWNhLCBzYW5zLXNlcmlmJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnVHJlYnVjaGV0J1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnQ291cmllciBOZXdcIiwgQ291cmllciwgbW9ub3NwYWNlJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQ291cmllciBOZXdcIiwgQ291cmllciwgbW9ub3NwYWNlJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnQnJ1c2ggU2NyaXB0IE1ULCBzYW5zLXNlcmlmJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQnJ1c2ggU2NyaXB0J1xyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJGb250IHdlaWdodFwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiZm9udC13ZWlnaHRcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjEwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiVGhpblwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiMjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJFeHRyYS1MaWdodFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiMzAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJMaWdodFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiNDAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJOb3JtYWxcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjUwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiTWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI2MDBcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlNlbWktQm9sZFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiNzAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJCb2xkXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI4MDBcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkV4dHJhLUJvbGRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjkwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiVWx0cmEtQm9sZFwiXHJcbiAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJUZXh0IGFsaWduXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJ0ZXh0LWFsaWduXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiAxMixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFJhZGlvQnV0dG9uSW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGV4dHJhY2xhc3M6IFwiYnRuLWdyb3VwLXNtIGJ0bi1ncm91cC1mdWxsd2lkdGhcIixcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwiTm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk5vbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwiTGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWFsaWduLWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwiQ2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQ2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJsYSBsYS1hbGlnbi1jZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJSaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJsYSBsYS1hbGlnbi1yaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImp1c3RpZnlcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwianVzdGlmeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkp1c3RpZnlcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWFsaWduLWp1c3RpZnlcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJMaW5lIGhlaWdodFwiLFxyXG4gICAgICAgICAgICBrZXk6IFwibGluZS1oZWlnaHRcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiTGV0dGVyIHNwYWNpbmdcIixcclxuICAgICAgICAgICAga2V5OiBcImxldHRlci1zcGFjaW5nXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiA2LFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlRleHQgZGVjb3JhdGlvblwiLFxyXG4gICAgICAgICAgICBrZXk6IFwidGV4dC1kZWNvcmF0aW9uLWxpbmVcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDEyLFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogUmFkaW9CdXR0b25JbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgZXh0cmFjbGFzczogXCJidG4tZ3JvdXAtc20gYnRuLWdyb3VwLWZ1bGx3aWR0aFwiLFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJub25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJsYSBsYS1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJOb25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidW5kZXJsaW5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0OiBcIkxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJ1bmRlcmxpbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWxvbmctYXJyb3ctZG93blwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIm92ZXJsaW5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0OiBcIlJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwib3ZlcmxpbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWxvbmctYXJyb3ctdXBcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJsaW5lLXRocm91Z2hcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwiUmlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJMaW5lIFRocm91Z2hcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLXN0cmlrZXRocm91Z2hcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ1bmRlcmxpbmUgb3ZlcmxpbmVcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwianVzdGlmeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlVuZGVybGluZSBPdmVybGluZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtYXJyb3dzLXZcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJEZWNvcmF0aW9uIENvbG9yXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJ0ZXh0LWRlY29yYXRpb24tY29sb3JcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDb2xvcklucHV0LFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJEZWNvcmF0aW9uIHN0eWxlXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJ0ZXh0LWRlY29yYXRpb24tc3R5bGVcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInNvbGlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJTb2xpZFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwid2F2eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiV2F2eVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiZG90dGVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEb3R0ZWRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImRhc2hlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGFzaGVkXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJkb3VibGVcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkRvdWJsZVwiXHJcbiAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0eXBvZ3JhcGh5OyIsImltcG9ydCB7IFNlY3Rpb25JbnB1dCwgQ3NzVW5pdElucHV0IH0gZnJvbSAnLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGluY19iYXNlX3NvcnQgfSBmcm9tICcuL2NvbW1vbic7XHJcblxyXG5jb25zdCBzaXplID0ge1xyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBrZXk6IFwic2l6ZV9oZWFkZXJcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlY3Rpb25JbnB1dCxcclxuICAgICAgICBuYW1lOiBmYWxzZSxcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgZGF0YTogeyBoZWFkZXI6IFwiU2l6ZVwiLCBleHBhbmRlZDogZmFsc2UgfSxcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIldpZHRoXCIsXHJcbiAgICAgICAga2V5OiBcIndpZHRoXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiSGVpZ2h0XCIsXHJcbiAgICAgICAga2V5OiBcImhlaWdodFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIk1pbiBXaWR0aFwiLFxyXG4gICAgICAgIGtleTogXCJtaW4td2lkdGhcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJNaW4gSGVpZ2h0XCIsXHJcbiAgICAgICAga2V5OiBcIm1pbi1oZWlnaHRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJNYXggV2lkdGhcIixcclxuICAgICAgICBrZXk6IFwibWF4LXdpZHRoXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiTWF4IEhlaWdodFwiLFxyXG4gICAgICAgIGtleTogXCJtYXgtaGVpZ2h0XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNpemU7IiwiaW1wb3J0IHsgU2VjdGlvbklucHV0LCBDc3NVbml0SW5wdXQgfSBmcm9tICcuLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgaW5jX2Jhc2Vfc29ydCB9IGZyb20gJy4vY29tbW9uJztcclxuXHJcbmNvbnN0IHBhZGRpbmcgPSB7XHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIGtleTogXCJwYWRkaW5nc19oZWFkZXJcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlY3Rpb25JbnB1dCxcclxuICAgICAgICBuYW1lOiBmYWxzZSxcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgZGF0YTogeyBoZWFkZXI6IFwiUGFkZGluZ1wiLCBleHBhbmRlZDogZmFsc2UgfSxcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlRvcFwiLFxyXG4gICAgICAgIGtleTogXCJwYWRkaW5nLXRvcFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlJpZ2h0XCIsXHJcbiAgICAgICAga2V5OiBcInBhZGRpbmctcmlnaHRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJCb3R0b21cIixcclxuICAgICAgICBrZXk6IFwicGFkZGluZy1ib3R0b21cIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJMZWZ0XCIsXHJcbiAgICAgICAga2V5OiBcInBhZGRpbmctTGVmdFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwYWRkaW5nOyIsImltcG9ydCB7IFNlY3Rpb25JbnB1dCwgQ3NzVW5pdElucHV0IH0gZnJvbSAnLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGluY19iYXNlX3NvcnQgfSBmcm9tICcuL2NvbW1vbic7XHJcblxyXG5jb25zdCBtYXJnaW4gPSB7XHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIGtleTogXCJtYXJnaW5zX2hlYWRlclwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VjdGlvbklucHV0LFxyXG4gICAgICAgIG5hbWU6IGZhbHNlLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBkYXRhOiB7IGhlYWRlcjogXCJNYXJnaW5cIiwgZXhwYW5kZWQ6IGZhbHNlIH0sXHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJUb3BcIixcclxuICAgICAgICBrZXk6IFwibWFyZ2luLXRvcFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlJpZ2h0XCIsXHJcbiAgICAgICAga2V5OiBcIm1hcmdpbi1yaWdodFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkJvdHRvbVwiLFxyXG4gICAgICAgIGtleTogXCJtYXJnaW4tYm90dG9tXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiTGVmdFwiLFxyXG4gICAgICAgIGtleTogXCJtYXJnaW4tTGVmdFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYXJnaW47IiwiaW1wb3J0IHsgU2VjdGlvbklucHV0LCBUZXh0SW5wdXQgfSBmcm9tICcuLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgaW5jX2Jhc2Vfc29ydCB9IGZyb20gJy4vY29tbW9uJztcclxuXHJcbmNvbnN0IGVsZW1lbnQgPSB7XHJcbiAgICBuYW1lOiBcIkVsZW1lbnRcIixcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAga2V5OiBcImVsZW1lbnRfaGVhZGVyXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWN0aW9uSW5wdXQsXHJcbiAgICAgICAgbmFtZTogZmFsc2UsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGRhdGE6IHsgaGVhZGVyOiBcIkdlbmVyYWxcIiB9LFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiSWRcIixcclxuICAgICAgICBrZXk6IFwiaWRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJpZFwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJDbGFzc1wiLFxyXG4gICAgICAgIGtleTogXCJjbGFzc1wiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH1cclxuICAgIF1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGVsZW1lbnQ7IiwiaW1wb3J0IHsgaW5jX2Jhc2Vfc29ydCB9IGZyb20gJy4vY29tbW9uJztcclxuaW1wb3J0IHsgU2VjdGlvbklucHV0LCBTZWxlY3RJbnB1dCwgUmFkaW9CdXR0b25JbnB1dCwgQ3NzVW5pdElucHV0LCBDb2xvcklucHV0LCBSYW5nZUlucHV0IH0gZnJvbSAnLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBkaXNwbGF5ICA9IHtcclxuICAgIHByb3BlcnRpZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGtleTogXCJkaXNwbGF5X2hlYWRlclwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlY3Rpb25JbnB1dCxcclxuICAgICAgICAgICAgbmFtZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgZGF0YTogeyBoZWFkZXI6IFwiRGlzcGxheVwiIH0sXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkRpc3BsYXlcIixcclxuICAgICAgICAgICAga2V5OiBcImRpc3BsYXlcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImJsb2NrXCIsIFwiaW5saW5lXCIsIFwiaW5saW5lLWJsb2NrXCIsIFwibm9uZVwiXSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJibG9ja1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQmxvY2tcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImlubGluZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5saW5lXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJpbmxpbmUtYmxvY2tcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIklubGluZSBCbG9ja1wiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwibm9uZVwiXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlBvc2l0aW9uXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJwb3NpdGlvblwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1wic3RhdGljXCIsIFwiZml4ZWRcIiwgXCJyZWxhdGl2ZVwiLCBcImFic29sdXRlXCJdLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInN0YXRpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiU3RhdGljXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJmaXhlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRml4ZWRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlbGF0aXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJSZWxhdGl2ZVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiYWJzb2x1dGVcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkFic29sdXRlXCJcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiVG9wXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJ0b3BcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgcGFyZW50OiBcIlwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJMZWZ0XCIsXHJcbiAgICAgICAgICAgIGtleTogXCJsZWZ0XCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiA2LFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIHBhcmVudDogXCJcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiQm90dG9tXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJib3R0b21cIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgcGFyZW50OiBcIlwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJSaWdodFwiLFxyXG4gICAgICAgICAgICBrZXk6IFwicmlnaHRcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgcGFyZW50OiBcIlwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJGbG9hdFwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiZmxvYXRcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDEyLFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogUmFkaW9CdXR0b25JbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgZXh0cmFjbGFzczogXCJidG4tZ3JvdXAtc20gYnRuLWdyb3VwLWZ1bGx3aWR0aFwiLFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJub25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJsYSBsYS1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJOb25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwibGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJMZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtYWxpZ24tbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0OiBcIlJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUmlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWFsaWduLXJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJPcGFjaXR5XCIsXHJcbiAgICAgICAgICAgIGtleTogXCJvcGFjaXR5XCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiAxMixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IFwiXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogUmFuZ2VJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgbWF4OiAxLCAvL21heCB6b29tIGxldmVsXHJcbiAgICAgICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgICAgICBzdGVwOiAwLjFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiQmFja2dyb3VuZCBDb2xvclwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiYmFja2dyb3VuZC1jb2xvclwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENvbG9ySW5wdXQsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlRleHQgQ29sb3JcIixcclxuICAgICAgICAgICAga2V5OiBcImNvbG9yXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiA2LFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ29sb3JJbnB1dCxcclxuICAgICAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGlzcGxheTsiLCJpbXBvcnQgeyBTZWN0aW9uSW5wdXQsIFNlbGVjdElucHV0LCBDc3NVbml0SW5wdXQsIENvbG9ySW5wdXQgfSBmcm9tICcuLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgaW5jX2Jhc2Vfc29ydCB9IGZyb20gJy4vY29tbW9uJztcclxuXHJcbmNvbnN0IGJvcmRlciA9IHtcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAga2V5OiBcImJvcmRlcl9oZWFkZXJcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlY3Rpb25JbnB1dCxcclxuICAgICAgICBuYW1lOiBmYWxzZSxcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgZGF0YTogeyBoZWFkZXI6IFwiQm9yZGVyXCIsIGV4cGFuZGVkOiBmYWxzZSB9LFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiU3R5bGVcIixcclxuICAgICAgICBrZXk6IFwiYm9yZGVyLXN0eWxlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiAxMixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcInNvbGlkXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlNvbGlkXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiZG90dGVkXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRvdHRlZFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImRhc2hlZFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEYXNoZWRcIlxyXG4gICAgICAgICAgICB9XSxcclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJXaWR0aFwiLFxyXG4gICAgICAgIGtleTogXCJib3JkZXItd2lkdGhcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJDb2xvclwiLFxyXG4gICAgICAgIGtleTogXCJib3JkZXItY29sb3JcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ29sb3JJbnB1dCxcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBib3JkZXI7IiwiaW1wb3J0IGxhYmVsIGZyb20gJy4vbGFiZWwnO1xyXG5pbXBvcnQgdGV4dGlucHV0IGZyb20gJy4vdGV4dGlucHV0JztcclxuaW1wb3J0IGJ1dHRvbiBmcm9tICcuL2J1dHRvbic7XHJcbmltcG9ydCBkaXYgZnJvbSAnLi9kaXYnO1xyXG5pbXBvcnQgY29udGFpbmVyIGZyb20gJy4vY29udGFpbmVyJztcclxuaW1wb3J0IGFsZXJ0IGZyb20gJy4vYWxlcnQnO1xyXG5pbXBvcnQgYmFkZ2UgZnJvbSAnLi9iYWRnZSc7XHJcbmltcG9ydCBicmVhZGNydW1iaXRlbSBmcm9tICcuL2JyZWFkY3J1bWJpdGVtJztcclxuaW1wb3J0IGJyZWFkY3J1bWJzIGZyb20gJy4vYnJlYWRjcnVtYnMnO1xyXG5pbXBvcnQgYnV0dG9uZ3JvdXAgZnJvbSAnLi9idXR0b25ncm91cCc7XHJcbmltcG9ydCBidXR0b250b29sYmFyIGZyb20gJy4vYnV0dG9udG9vbGJhcic7XHJcbmltcG9ydCBjYXJkIGZyb20gJy4vY2FyZCc7XHJcbmltcG9ydCBjaGVja2JveCBmcm9tICcuL2NoZWNrYm94JztcclxuaW1wb3J0IGZpbGVpbnB1dCBmcm9tICcuL2ZpbGVpbnB1dCc7XHJcbmltcG9ydCBmb3JtIGZyb20gJy4vZm9ybSc7XHJcbmltcG9ydCBncmlkY29sdW1uIGZyb20gJy4vZ3JpZGNvbHVtbic7XHJcbmltcG9ydCBncmlkcm93IGZyb20gJy4vZ3JpZHJvdyc7XHJcbmltcG9ydCBoZWFkaW5nIGZyb20gJy4vaGVhZGluZyc7XHJcbmltcG9ydCBociBmcm9tICcuL2hyJztcclxuaW1wb3J0IGltYWdlIGZyb20gJy4vaW1hZ2UnO1xyXG5pbXBvcnQganVtYm90cm9uIGZyb20gJy4vanVtYm90cm9uJztcclxuaW1wb3J0IGxpbmsgZnJvbSAnLi9saW5rJztcclxuaW1wb3J0IGxpc3Rncm91cCBmcm9tICcuL2xpc3Rncm91cCc7XHJcbmltcG9ydCBsaXN0aXRlbSBmcm9tICcuL2xpc3RpdGVtJztcclxuaW1wb3J0IG5hdmJhciBmcm9tICcuL25hdmJhcic7XHJcbmltcG9ydCBwYWdlaXRlbSBmcm9tICcuL3BhZ2VpdGVtJztcclxuaW1wb3J0IHBhZ2luYXRpb24gZnJvbSAnLi9wYWdpbmF0aW9uJztcclxuaW1wb3J0IHByb2dyZXNzIGZyb20gJy4vcHJvZ3Jlc3MnO1xyXG5pbXBvcnQgcmFkaW9idXR0b24gZnJvbSAnLi9yYWRpb2J1dHRvbic7XHJcbmltcG9ydCBzZWxlY3RpbnB1dCBmcm9tICcuL3NlbGVjdGlucHV0JztcclxuaW1wb3J0IHRhYmxlaGVhZGVyY2VsbCBmcm9tICcuL3RhYmxlaGVhZGVyY2VsbCc7XHJcbmltcG9ydCB0YWJsZSBmcm9tICcuL3RhYmxlJztcclxuaW1wb3J0IHRhYmxlYm9keSBmcm9tICcuL3RhYmxlYm9keSc7XHJcbmltcG9ydCB0YWJsZWNlbGwgZnJvbSAnLi90YWJsZWNlbGwnO1xyXG5pbXBvcnQgdGFibGVoZWFkIGZyb20gJy4vdGFibGVoZWFkJztcclxuaW1wb3J0IHRhYmxlcm93IGZyb20gJy4vdGFibGVyb3cnO1xyXG5pbXBvcnQgdGV4dGFyZWFpbnB1dCBmcm9tICcuL3RleHRhcmVhaW5wdXQnO1xyXG5cclxuaW1wb3J0IGxhYmVsZGl2IGZyb20gJy4vbGFiZWxkaXYnO1xyXG5cclxuZXhwb3J0IHtcclxuICAgIGxhYmVsLCB0ZXh0aW5wdXQsIGJ1dHRvbiwgZGl2LCBjb250YWluZXIsIGFsZXJ0LCBiYWRnZSwgYnJlYWRjcnVtYml0ZW0sIGJyZWFkY3J1bWJzLCBidXR0b25ncm91cCxcclxuICAgIGJ1dHRvbnRvb2xiYXIsIGNhcmQsIGNoZWNrYm94LCBmaWxlaW5wdXQsIGZvcm0sIGdyaWRjb2x1bW4sIGdyaWRyb3csIGhlYWRpbmcsIGhyLCBpbWFnZSwganVtYm90cm9uLFxyXG4gICAgbGluaywgbGlzdGdyb3VwLCBsaXN0aXRlbSwgbmF2YmFyLCBwYWdlaXRlbSwgcGFnaW5hdGlvbiwgcHJvZ3Jlc3MsIHJhZGlvYnV0dG9uLCBzZWxlY3RpbnB1dCwgdGFibGVoZWFkZXJjZWxsLFxyXG4gICAgdGFibGUsIHRhYmxlYm9keSwgdGFibGVjZWxsLCB0YWJsZWhlYWQsIHRhYmxlcm93LCB0ZXh0YXJlYWlucHV0LFxyXG4gICAgbGFiZWxkaXZcclxufTsiLCJpbXBvcnQge1RleHRJbnB1dH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCB0ZXh0aW5wdXQgPSB7XHJcbiAgICBuYW1lOiBcIlRleHQgSW5wdXRcIixcclxuICAgIGF0dHJpYnV0ZXM6IHsgXCJ0eXBlXCI6IFwidGV4dFwiIH0sXHJcbiAgICBpbWFnZTogXCJpY29ucy90ZXh0X2lucHV0LnN2Z1wiLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCI+PGxhYmVsPlRleHQ8L2xhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+PC9kaXY+PC9kaXY+JyxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJWYWx1ZVwiLFxyXG4gICAgICAgIGtleTogXCJ2YWx1ZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInZhbHVlXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlBsYWNlaG9sZGVyXCIsXHJcbiAgICAgICAga2V5OiBcInBsYWNlaG9sZGVyXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwicGxhY2Vob2xkZXJcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRleHRpbnB1dDsiLCJjb25zdCB0ZXh0YXJlYWlucHV0ID0ge1xyXG4gICAgbmFtZTogXCJUZXh0IEFyZWFcIixcclxuICAgIGltYWdlOiBcImljb25zL3RleHRfYXJlYS5zdmdcIixcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPjxsYWJlbD5Zb3VyIHJlc3BvbnNlOjwvbGFiZWw+PHRleHRhcmVhIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+PC90ZXh0YXJlYT48L2Rpdj4nXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0ZXh0YXJlYWlucHV0OyIsImltcG9ydCB7IFNlbGVjdElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCB0YWJsZXJvdyA9IHtcclxuICAgIG5vZGVzOiBbXCJ0clwiXSxcclxuICAgIG5hbWU6IFwiVGFibGUgUm93XCIsXHJcbiAgICBodG1sOiBcIjx0cj48dGQ+Q2VsbCAxPC90ZD48dGQ+Q2VsbCAyPC90ZD48dGQ+Q2VsbCAzPC90ZD48L3RyPlwiLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIlR5cGVcIixcclxuICAgICAgICBrZXk6IFwidHlwZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiXCIsIFwic3VjY2Vzc1wiLCBcImRhbmdlclwiLCBcIndhcm5pbmdcIiwgXCJhY3RpdmVcIl0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJlcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJFcnJvclwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIndhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiV2FybmluZ1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImFjdGl2ZVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJBY3RpdmVcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YWJsZXJvdzsiLCJjb25zdCB0YWJsZWhlYWRlcmNlbGwgPSB7XHJcbiAgICBub2RlczogW1widGhcIl0sXHJcbiAgICBuYW1lOiBcIlRhYmxlIEhlYWRlciBDZWxsXCIsXHJcbiAgICBodG1sOiBcIjx0aD5IZWFkPC90aD5cIlxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFibGVoZWFkZXJjZWxsOyIsImltcG9ydCB7IFNlbGVjdElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCB0YWJsZWhlYWQgPSB7XHJcbiAgICBub2RlczogW1widGhlYWRcIl0sXHJcbiAgICBuYW1lOiBcIlRhYmxlIEhlYWRcIixcclxuICAgIGh0bWw6IFwiPHRoZWFkPjx0cj48dGg+SGVhZCAxPC90aD48dGg+SGVhZCAyPC90aD48dGg+SGVhZCAzPC90aD48L3RyPjwvdGhlYWQ+XCIsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICAgIGtleTogXCJ0eXBlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJcIiwgXCJzdWNjZXNzXCIsIFwiZGFuZ2VyXCIsIFwid2FybmluZ1wiLCBcImluZm9cIl0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJhbmdlclwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJFcnJvclwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIndhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiV2FybmluZ1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhYmxlaGVhZDsiLCJjb25zdCB0YWJsZWNlbGwgPSB7XHJcbiAgICBub2RlczogW1widGRcIl0sXHJcbiAgICBuYW1lOiBcIlRhYmxlIENlbGxcIixcclxuICAgIGh0bWw6IFwiPHRkPkNlbGw8L3RkPlwiXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YWJsZWNlbGw7IiwiY29uc3QgdGFibGVib2R5ID0ge1xyXG4gICAgbm9kZXM6IFtcInRib2R5XCJdLFxyXG4gICAgbmFtZTogXCJUYWJsZSBCb2R5XCIsXHJcbiAgICBodG1sOiBcIjx0Ym9keT48dHI+PHRkPkNlbGwgMTwvdGQ+PHRkPkNlbGwgMjwvdGQ+PHRkPkNlbGwgMzwvdGQ+PC90cj48L3Rib2R5PlwiXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YWJsZWJvZHk7IiwiaW1wb3J0IHsgU2VsZWN0SW5wdXQsIFRvZ2dsZUlucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCB0YWJsZSA9IHtcclxuICAgIG5vZGVzOiBbXCJ0YWJsZVwiXSxcclxuICAgIGNsYXNzZXM6IFtcInRhYmxlXCJdLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvdGFibGUuc3ZnXCIsXHJcbiAgICBuYW1lOiBcIlRhYmxlXCIsXHJcbiAgICBodG1sOiAnPHRhYmxlIGNsYXNzPVwidGFibGVcIj5cXFxyXG5cdFx0ICA8dGhlYWQ+XFxcclxuXHRcdFx0PHRyPlxcXHJcblx0XHRcdCAgPHRoPiM8L3RoPlxcXHJcblx0XHRcdCAgPHRoPkZpcnN0IE5hbWU8L3RoPlxcXHJcblx0XHRcdCAgPHRoPkxhc3QgTmFtZTwvdGg+XFxcclxuXHRcdFx0ICA8dGg+VXNlcm5hbWU8L3RoPlxcXHJcblx0XHRcdDwvdHI+XFxcclxuXHRcdCAgPC90aGVhZD5cXFxyXG5cdFx0ICA8dGJvZHk+XFxcclxuXHRcdFx0PHRyPlxcXHJcblx0XHRcdCAgPHRoIHNjb3BlPVwicm93XCI+MTwvdGg+XFxcclxuXHRcdFx0ICA8dGQ+TWFyazwvdGQ+XFxcclxuXHRcdFx0ICA8dGQ+T3R0bzwvdGQ+XFxcclxuXHRcdFx0ICA8dGQ+QG1kbzwvdGQ+XFxcclxuXHRcdFx0PC90cj5cXFxyXG5cdFx0XHQ8dHI+XFxcclxuXHRcdFx0ICA8dGggc2NvcGU9XCJyb3dcIj4yPC90aD5cXFxyXG5cdFx0XHQgIDx0ZD5KYWNvYjwvdGQ+XFxcclxuXHRcdFx0ICA8dGQ+VGhvcm50b248L3RkPlxcXHJcblx0XHRcdCAgPHRkPkBmYXQ8L3RkPlxcXHJcblx0XHRcdDwvdHI+XFxcclxuXHRcdFx0PHRyPlxcXHJcblx0XHRcdCAgPHRoIHNjb3BlPVwicm93XCI+MzwvdGg+XFxcclxuXHRcdFx0ICA8dGQ+TGFycnk8L3RkPlxcXHJcblx0XHRcdCAgPHRkPnRoZSBCaXJkPC90ZD5cXFxyXG5cdFx0XHQgIDx0ZD5AdHdpdHRlcjwvdGQ+XFxcclxuXHRcdFx0PC90cj5cXFxyXG5cdFx0ICA8L3Rib2R5PlxcXHJcblx0XHQ8L3RhYmxlPicsXHJcbiAgICBwcm9wZXJ0aWVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlR5cGVcIixcclxuICAgICAgICAgICAga2V5OiBcInR5cGVcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFtcInRhYmxlLXByaW1hcnlcIiwgXCJ0YWJsZS1zZWNvbmRhcnlcIiwgXCJ0YWJsZS1zdWNjZXNzXCIsIFwidGFibGUtZGFuZ2VyXCIsIFwidGFibGUtd2FybmluZ1wiLCBcInRhYmxlLWluZm9cIiwgXCJ0YWJsZS1saWdodFwiLCBcInRhYmxlLWRhcmtcIiwgXCJ0YWJsZS13aGl0ZVwiXSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJEZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInRhYmxlLXByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlByaW1hcnlcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInRhYmxlLXNlY29uZGFyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiU2Vjb25kYXJ5XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0YWJsZS1zdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJTdWNjZXNzXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0YWJsZS1kYW5nZXJcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhbmdlclwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGFibGUtd2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiV2FybmluZ1wiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGFibGUtaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGFibGUtbGlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpZ2h0XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0YWJsZS1kYXJrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEYXJrXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0YWJsZS13aGl0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiV2hpdGVcIlxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlJlc3BvbnNpdmVcIixcclxuICAgICAgICAgICAga2V5OiBcInJlc3BvbnNpdmVcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFtcInRhYmxlLXJlc3BvbnNpdmVcIl0sXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9uOiBcInRhYmxlLXJlc3BvbnNpdmVcIixcclxuICAgICAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiU21hbGxcIixcclxuICAgICAgICAgICAga2V5OiBcInNtYWxsXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJ0YWJsZS1zbVwiXSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb246IFwidGFibGUtc21cIixcclxuICAgICAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiSG92ZXJcIixcclxuICAgICAgICAgICAga2V5OiBcImhvdmVyXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJ0YWJsZS1ob3ZlclwiXSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb246IFwidGFibGUtaG92ZXJcIixcclxuICAgICAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiQm9yZGVyZWRcIixcclxuICAgICAgICAgICAga2V5OiBcImJvcmRlcmVkXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJ0YWJsZS1ib3JkZXJlZFwiXSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb246IFwidGFibGUtYm9yZGVyZWRcIixcclxuICAgICAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiU3RyaXBlZFwiLFxyXG4gICAgICAgICAgICBrZXk6IFwic3RyaXBlZFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1widGFibGUtc3RyaXBlZFwiXSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb246IFwidGFibGUtc3RyaXBlZFwiLFxyXG4gICAgICAgICAgICAgICAgb2ZmOiBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJJbnZlcnNlXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJpbnZlcnNlXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJ0YWJsZS1pbnZlcnNlXCJdLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvbjogXCJ0YWJsZS1pbnZlcnNlXCIsXHJcbiAgICAgICAgICAgICAgICBvZmY6IFwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkhlYWQgb3B0aW9uc1wiLFxyXG4gICAgICAgICAgICBrZXk6IFwiaGVhZFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICBjaGlsZDogXCJ0aGVhZFwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1wiXCIsIFwidGhlYWQtaW52ZXJzZVwiLCBcInRoZWFkLWRlZmF1bHRcIl0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJOb25lXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0aGVhZC1kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0aGVhZC1pbnZlcnNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJJbnZlcnNlXCJcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFibGU7IiwiaW1wb3J0IFZ2dmViIGZyb20gJy4uLy4uL2J1aWxkZXInO1xyXG5pbXBvcnQge1RleHRWYWx1ZUlucHV0LCBCdXR0b25JbnB1dH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBzZWxlY3RpbnB1dCA9IHtcclxuICAgIG5vZGVzOiBbXCJzZWxlY3RcIl0sXHJcbiAgICBuYW1lOiBcIlNlbGVjdCBJbnB1dFwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvc2VsZWN0X2lucHV0LnN2Z1wiLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCI+PGxhYmVsPkNob29zZSBhbiBvcHRpb24gPC9sYWJlbD48c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCI+PG9wdGlvbiB2YWx1ZT1cInZhbHVlMVwiPlRleHQgMTwvb3B0aW9uPjxvcHRpb24gdmFsdWU9XCJ2YWx1ZTJcIj5UZXh0IDI8L29wdGlvbj48b3B0aW9uIHZhbHVlPVwidmFsdWUzXCI+VGV4dCAzPC9vcHRpb24+PC9zZWxlY3Q+PC9kaXY+JyxcclxuXHJcbiAgICBiZWZvcmVJbml0OiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgIHByb3BlcnRpZXMgPSBbXTtcclxuICAgICAgICB2YXIgaSA9IDA7XHJcblxyXG4gICAgICAgICQobm9kZSkuZmluZCgnb3B0aW9uJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBkYXRhID0geyBcInZhbHVlXCI6IHRoaXMudmFsdWUsIFwidGV4dFwiOiB0aGlzLnRleHQgfTtcclxuXHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiT3B0aW9uIFwiICsgaSxcclxuICAgICAgICAgICAgICAgIGtleTogXCJvcHRpb25cIiArIGksXHJcbiAgICAgICAgICAgICAgICAvL2luZGV4OiBpIC0gMSxcclxuICAgICAgICAgICAgICAgIG9wdGlvbk5vZGU6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBpbnB1dHR5cGU6IFRleHRWYWx1ZUlucHV0LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSwgdmFsdWUsIGlucHV0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbiA9ICQodGhpcy5vcHRpb25Ob2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiByZW1vdmUgYnV0dG9uIGlzIGNsaWNrZWQgcmVtb3ZlIG9wdGlvbiBhbmQgcmVuZGVyIHJvdyBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Lm5vZGVOYW1lID09ICdCVVRUT04nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIoXCJodG1sL3NlbGVjdGlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5uYW1lID09IFwidmFsdWVcIikgb3B0aW9uLmF0dHIoXCJ2YWx1ZVwiLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXQubmFtZSA9PSBcInRleHRcIikgb3B0aW9uLnRleHQodmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL3JlbW92ZSBhbGwgb3B0aW9uIHByb3BlcnRpZXNcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSB0aGlzLnByb3BlcnRpZXMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmtleS5pbmRleE9mKFwib3B0aW9uXCIpID09PSAtMTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9hZGQgcmVtYWluaW5nIHByb3BlcnRpZXMgdG8gZ2VuZXJhdGVkIGNvbHVtbiBwcm9wZXJ0aWVzXHJcbiAgICAgICAgcHJvcGVydGllcy5wdXNoKHRoaXMucHJvcGVydGllc1swXSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJPcHRpb25cIixcclxuICAgICAgICBrZXk6IFwib3B0aW9uMVwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dFZhbHVlSW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIk9wdGlvblwiLFxyXG4gICAgICAgIGtleTogXCJvcHRpb24yXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0VmFsdWVJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAga2V5OiBcImFkZENoaWxkXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBCdXR0b25JbnB1dCxcclxuICAgICAgICBkYXRhOiB7IHRleHQ6IFwiQWRkIG9wdGlvblwiIH0sXHJcbiAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgICAgICQobm9kZSkuYXBwZW5kKCc8b3B0aW9uIHZhbHVlPVwidmFsdWVcIj5UZXh0PC9vcHRpb24+Jyk7XHJcblxyXG4gICAgICAgICAgICAvL3JlbmRlciBjb21wb25lbnQgcHJvcGVydGllcyBhZ2FpbiB0byBpbmNsdWRlIHRoZSBuZXcgY29sdW1uIGlucHV0c1xyXG4gICAgICAgICAgICBWdnZlYi5Db21wb25lbnRzLnJlbmRlcihcImh0bWwvc2VsZWN0aW5wdXRcIik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2VsZWN0aW5wdXQ7IiwiaW1wb3J0IHsgVGV4dElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCByYWRpb2J1dHRvbiA9IHtcclxuICAgIG5hbWU6IFwiUmFkaW8gQnV0dG9uXCIsXHJcbiAgICBhdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBcInJhZGlvXCIgfSxcclxuICAgIGltYWdlOiBcImljb25zL3JhZGlvLnN2Z1wiLFxyXG4gICAgaHRtbDogJzxsYWJlbCBjbGFzcz1cInJhZGlvXCI+PGlucHV0IHR5cGU9XCJyYWRpb1wiPiBSYWRpbzwvbGFiZWw+JyxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJOYW1lXCIsXHJcbiAgICAgICAga2V5OiBcIm5hbWVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJuYW1lXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCByYWRpb2J1dHRvbjsiLCJpbXBvcnQgeyBTZWxlY3RJbnB1dCwgVG9nZ2xlSW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgYmdjb2xvckNsYXNzZXMsIGJnY29sb3JTZWxlY3RPcHRpb25zIH0gZnJvbSAnLi4vY29tbW9uJztcclxuXHJcbmNvbnN0IHByb2dyZXNzID0ge1xyXG4gICAgY2xhc3NlczogW1wicHJvZ3Jlc3NcIl0sXHJcbiAgICBuYW1lOiBcIlByb2dyZXNzIEJhclwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvcHJvZ3Jlc3NiYXIuc3ZnXCIsXHJcbiAgICBodG1sOiAnPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+PGRpdiBjbGFzcz1cInByb2dyZXNzLWJhciB3LTI1XCI+PC9kaXY+PC9kaXY+JyxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJCYWNrZ3JvdW5kXCIsXHJcbiAgICAgICAga2V5OiBcImJhY2tncm91bmRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBiZ2NvbG9yQ2xhc3NlcyxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogYmdjb2xvclNlbGVjdE9wdGlvbnNcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFwiUHJvZ3Jlc3NcIixcclxuICAgICAgICBrZXk6IFwiYmFja2dyb3VuZFwiLFxyXG4gICAgICAgIGNoaWxkOiBcIi5wcm9ncmVzcy1iYXJcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJcIiwgXCJ3LTI1XCIsIFwidy01MFwiLCBcInctNzVcIiwgXCJ3LTEwMFwiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJOb25lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwidy0yNVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCIyNSVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJ3LTUwXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIjUwJVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcInctNzVcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiNzUlXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwidy0xMDBcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiMTAwJVwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBuYW1lOiBcIlByb2dyZXNzIGJhY2tncm91bmRcIixcclxuICAgICAgICBrZXk6IFwiYmFja2dyb3VuZFwiLFxyXG4gICAgICAgIGNoaWxkOiBcIi5wcm9ncmVzcy1iYXJcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBiZ2NvbG9yQ2xhc3NlcyxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogYmdjb2xvclNlbGVjdE9wdGlvbnNcclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJTdHJpcGVkXCIsXHJcbiAgICAgICAga2V5OiBcInN0cmlwZWRcIixcclxuICAgICAgICBjaGlsZDogXCIucHJvZ3Jlc3MtYmFyXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiXCIsIFwicHJvZ3Jlc3MtYmFyLXN0cmlwZWRcIl0sXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9uOiBcInByb2dyZXNzLWJhci1zdHJpcGVkXCIsXHJcbiAgICAgICAgICAgIG9mZjogXCJcIixcclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJBbmltYXRlZFwiLFxyXG4gICAgICAgIGtleTogXCJhbmltYXRlZFwiLFxyXG4gICAgICAgIGNoaWxkOiBcIi5wcm9ncmVzcy1iYXJcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJcIiwgXCJwcm9ncmVzcy1iYXItYW5pbWF0ZWRcIl0sXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9uOiBcInByb2dyZXNzLWJhci1hbmltYXRlZFwiLFxyXG4gICAgICAgICAgICBvZmY6IFwiXCIsXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByb2dyZXNzOyIsImltcG9ydCB7IFNlbGVjdElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBwYWdpbmF0aW9uID0ge1xyXG4gICAgY2xhc3NlczogW1wicGFnaW5hdGlvblwiXSxcclxuICAgIG5hbWU6IFwiUGFnaW5hdGlvblwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvcGFnaW5hdGlvbi5zdmdcIixcclxuICAgIGh0bWw6ICc8bmF2IGFyaWEtbGFiZWw9XCJQYWdlIG5hdmlnYXRpb24gZXhhbXBsZVwiPlxcXHJcblx0ICA8dWwgY2xhc3M9XCJwYWdpbmF0aW9uXCI+XFxcclxuXHRcdDxsaSBjbGFzcz1cInBhZ2UtaXRlbVwiPjxhIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZj1cIiNcIj5QcmV2aW91czwvYT48L2xpPlxcXHJcblx0XHQ8bGkgY2xhc3M9XCJwYWdlLWl0ZW1cIj48YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9XCIjXCI+MTwvYT48L2xpPlxcXHJcblx0XHQ8bGkgY2xhc3M9XCJwYWdlLWl0ZW1cIj48YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9XCIjXCI+MjwvYT48L2xpPlxcXHJcblx0XHQ8bGkgY2xhc3M9XCJwYWdlLWl0ZW1cIj48YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9XCIjXCI+MzwvYT48L2xpPlxcXHJcblx0XHQ8bGkgY2xhc3M9XCJwYWdlLWl0ZW1cIj48YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9XCIjXCI+TmV4dDwvYT48L2xpPlxcXHJcblx0ICA8L3VsPlxcXHJcblx0PC9uYXY+JyxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiU2l6ZVwiLFxyXG4gICAgICAgIGtleTogXCJzaXplXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJidG4tbGdcIiwgXCJidG4tc21cIl0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tbGdcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiTGFyZ2VcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tc21cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU21hbGxcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkFsaWdubWVudFwiLFxyXG4gICAgICAgIGtleTogXCJhbGlnbm1lbnRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImp1c3RpZnktY29udGVudC1jZW50ZXJcIiwgXCJqdXN0aWZ5LWNvbnRlbnQtZW5kXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwianVzdGlmeS1jb250ZW50LWNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJDZW50ZXJcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJqdXN0aWZ5LWNvbnRlbnQtZW5kXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlJpZ2h0XCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGFnaW5hdGlvbjsiLCJpbXBvcnQgeyBUZXh0SW5wdXQsIFRvZ2dsZUlucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBwYWdlaXRlbSA9IHtcclxuICAgIGNsYXNzZXM6IFtcInBhZ2UtaXRlbVwiXSxcclxuICAgIGh0bWw6ICc8bGkgY2xhc3M9XCJwYWdlLWl0ZW1cIj48YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9XCIjXCI+MTwvYT48L2xpPicsXHJcbiAgICBuYW1lOiBcIlBhZ2luYXRpb24gSXRlbVwiLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIkxpbmsgVG9cIixcclxuICAgICAgICBrZXk6IFwiaHJlZlwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImhyZWZcIixcclxuICAgICAgICBjaGlsZDogXCIucGFnZS1saW5rXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkRpc2FibGVkXCIsXHJcbiAgICAgICAga2V5OiBcImRpc2FibGVkXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiZGlzYWJsZWRcIl0sXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9uOiBcImRpc2FibGVkXCIsXHJcbiAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwYWdlaXRlbTsiLCJpbXBvcnQgeyBTZWxlY3RJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBiZ2NvbG9yQ2xhc3NlcywgYmdjb2xvclNlbGVjdE9wdGlvbnMgfSBmcm9tICcuLi9jb21tb24nO1xyXG5cclxuY29uc3QgbmF2YmFyID0ge1xyXG4gICAgY2xhc3NlczogW1wibmF2YmFyXCJdLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvbmF2YmFyLnN2Z1wiLFxyXG4gICAgbmFtZTogXCJOYXYgQmFyXCIsXHJcbiAgICBodG1sOiAnPG5hdiBjbGFzcz1cIm5hdmJhciBuYXZiYXItZXhwYW5kLWxnIG5hdmJhci1saWdodCBiZy1saWdodFwiPlxcXHJcblx0XHQgIDxhIGNsYXNzPVwibmF2YmFyLWJyYW5kXCIgaHJlZj1cIiNcIj5OYXZiYXI8L2E+XFxcclxuXHRcdCAgPGJ1dHRvbiBjbGFzcz1cIm5hdmJhci10b2dnbGVyXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD1cIiNuYXZiYXJTdXBwb3J0ZWRDb250ZW50XCIgYXJpYS1jb250cm9scz1cIm5hdmJhclN1cHBvcnRlZENvbnRlbnRcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiBhcmlhLWxhYmVsPVwiVG9nZ2xlIG5hdmlnYXRpb25cIj5cXFxyXG5cdFx0XHQ8c3BhbiBjbGFzcz1cIm5hdmJhci10b2dnbGVyLWljb25cIj48L3NwYW4+XFxcclxuXHRcdCAgPC9idXR0b24+XFxcclxuXHRcdFxcXHJcblx0XHQgIDxkaXYgY2xhc3M9XCJjb2xsYXBzZSBuYXZiYXItY29sbGFwc2VcIiBpZD1cIm5hdmJhclN1cHBvcnRlZENvbnRlbnRcIj5cXFxyXG5cdFx0XHQ8dWwgY2xhc3M9XCJuYXZiYXItbmF2IG1yLWF1dG9cIj5cXFxyXG5cdFx0XHQgIDxsaSBjbGFzcz1cIm5hdi1pdGVtIGFjdGl2ZVwiPlxcXHJcblx0XHRcdFx0PGEgY2xhc3M9XCJuYXYtbGlua1wiIGhyZWY9XCIjXCI+SG9tZSA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIj4oY3VycmVudCk8L3NwYW4+PC9hPlxcXHJcblx0XHRcdCAgPC9saT5cXFxyXG5cdFx0XHQgIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+XFxcclxuXHRcdFx0XHQ8YSBjbGFzcz1cIm5hdi1saW5rXCIgaHJlZj1cIiNcIj5MaW5rPC9hPlxcXHJcblx0XHRcdCAgPC9saT5cXFxyXG5cdFx0XHQgIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+XFxcclxuXHRcdFx0XHQ8YSBjbGFzcz1cIm5hdi1saW5rIGRpc2FibGVkXCIgaHJlZj1cIiNcIj5EaXNhYmxlZDwvYT5cXFxyXG5cdFx0XHQgIDwvbGk+XFxcclxuXHRcdFx0PC91bD5cXFxyXG5cdFx0XHQ8Zm9ybSBjbGFzcz1cImZvcm0taW5saW5lIG15LTIgbXktbGctMFwiPlxcXHJcblx0XHRcdCAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sIG1yLXNtLTJcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCIgYXJpYS1sYWJlbD1cIlNlYXJjaFwiPlxcXHJcblx0XHRcdCAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tb3V0bGluZS1zdWNjZXNzIG15LTIgbXktc20tMFwiIHR5cGU9XCJzdWJtaXRcIj5TZWFyY2g8L2J1dHRvbj5cXFxyXG5cdFx0XHQ8L2Zvcm0+XFxcclxuXHRcdCAgPC9kaXY+XFxcclxuXHRcdDwvbmF2PicsXHJcblxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIkNvbG9yIHRoZW1lXCIsXHJcbiAgICAgICAga2V5OiBcImNvbG9yXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wibmF2YmFyLWxpZ2h0XCIsIFwibmF2YmFyLWRhcmtcIl0sXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIm5hdmJhci1saWdodFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMaWdodFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIm5hdmJhci1kYXJrXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhcmtcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkJhY2tncm91bmQgY29sb3JcIixcclxuICAgICAgICBrZXk6IFwiYmFja2dyb3VuZFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IGJnY29sb3JDbGFzc2VzLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBiZ2NvbG9yU2VsZWN0T3B0aW9uc1xyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlBsYWNlbWVudFwiLFxyXG4gICAgICAgIGtleTogXCJwbGFjZW1lbnRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJmaXhlZC10b3BcIiwgXCJmaXhlZC1ib3R0b21cIiwgXCJzdGlja3ktdG9wXCJdLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJmaXhlZC10b3BcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRml4ZWQgVG9wXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiZml4ZWQtYm90dG9tXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkZpeGVkIEJvdHRvbVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcInN0aWNreS10b3BcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU3RpY2t5IHRvcFwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5hdmJhcjsiLCJjb25zdCBsaXN0aXRlbSA9IHtcclxuICAgIG5hbWU6IFwiTGlzdCBJdGVtXCIsXHJcbiAgICBjbGFzc2VzOiBbXCJsaXN0LWdyb3VwLWl0ZW1cIl0sXHJcbiAgICBodG1sOiAnPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+PHNwYW4gY2xhc3M9XCJiYWRnZVwiPjE0PC9zcGFuPiBDcmFzIGp1c3RvIG9kaW88L2xpPidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxpc3RpdGVtOyIsImNvbnN0IGxpc3Rncm91cCA9IHtcclxuICAgIG5hbWU6IFwiTGlzdCBHcm91cFwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvbGlzdF9ncm91cC5zdmdcIixcclxuICAgIGNsYXNzZXM6IFtcImxpc3QtZ3JvdXBcIl0sXHJcbiAgICBodG1sOiAnPHVsIGNsYXNzPVwibGlzdC1ncm91cFwiPlxcbiAgPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+XFxuICAgIDxzcGFuIGNsYXNzPVwiYmFkZ2VcIj4xNDwvc3Bhbj5cXG4gICAgQ3JhcyBqdXN0byBvZGlvXFxuICA8L2xpPlxcbiAgPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+XFxuICAgIDxzcGFuIGNsYXNzPVwiYmFkZ2VcIj4yPC9zcGFuPlxcbiAgICBEYXBpYnVzIGFjIGZhY2lsaXNpcyBpblxcbiAgPC9saT5cXG4gIDxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiPlxcbiAgICA8c3BhbiBjbGFzcz1cImJhZGdlXCI+MTwvc3Bhbj5cXG4gICAgTW9yYmkgbGVvIHJpc3VzXFxuICA8L2xpPlxcbjwvdWw+J1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGlzdGdyb3VwOyIsImltcG9ydCB7IExpbmtJbnB1dCwgVGV4dElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBsaW5rID0ge1xyXG4gICAgbm9kZXM6IFtcImFcIl0sXHJcbiAgICBuYW1lOiBcIkxpbmtcIixcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJVcmxcIixcclxuICAgICAgICBrZXk6IFwiaHJlZlwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImhyZWZcIixcclxuICAgICAgICBpbnB1dHR5cGU6IExpbmtJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiVGFyZ2V0XCIsXHJcbiAgICAgICAga2V5OiBcInRhcmdldFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInRhcmdldFwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGluazsiLCJjb25zdCBsYWJlbGRpdiA9IHtcclxuICAgIG5hbWU6ICdMYWJlbCBEaXYnLFxyXG4gICAgaW1hZ2U6ICdpY29ucy9sYWJlbC5zdmcnLFxyXG4gICAgaHRtbDogYDxkaXYgY2xhc3M9XCJldmVyeU91dGJveC1sZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWNhcmV0LXNxdWFyZS1vLXJpZ2h0IHRleHQtZGFuZ2VyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aGVtZVwiPlBlcmlvZDwvc3Bhbj5cclxuICAgICAgICAgICA8L2Rpdj5gXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsYWJlbGRpdjsiLCJpbXBvcnQgeyBUZXh0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGxhYmVsID0ge1xyXG4gICAgbmFtZTogJ0xhYmVsJyxcclxuICAgIG5vZGVzOiBbJ2xhYmVsJ10sXHJcbiAgICBpbWFnZTogJ2ljb25zL2xhYmVsLnN2ZycsXHJcbiAgICBodG1sOiAnPGxhYmVsIGZvcj1cIlwiPkxhYmVsPC9sYWJlbD4nLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiAnRm9yIGlkJyxcclxuICAgICAgICBodG1sQXR0cjogJ2ZvcicsXHJcbiAgICAgICAga2V5OiAnZm9yJyxcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxhYmVsOyIsImNvbnN0IGp1bWJvdHJvbiA9IHtcclxuICAgIGNsYXNzZXM6IFtcImp1bWJvdHJvblwiXSxcclxuICAgIGltYWdlOiBcImljb25zL2p1bWJvdHJvbi5zdmdcIixcclxuICAgIG5hbWU6IFwiSnVtYm90cm9uXCIsXHJcbiAgICBodG1sOiAnPGRpdiBjbGFzcz1cImp1bWJvdHJvblwiPlxcXHJcblx0XHQgIDxoMSBjbGFzcz1cImRpc3BsYXktM1wiPkhlbGxvLCB3b3JsZCE8L2gxPlxcXHJcblx0XHQgIDxwIGNsYXNzPVwibGVhZFwiPlRoaXMgaXMgYSBzaW1wbGUgaGVybyB1bml0LCBhIHNpbXBsZSBqdW1ib3Ryb24tc3R5bGUgY29tcG9uZW50IGZvciBjYWxsaW5nIGV4dHJhIGF0dGVudGlvbiB0byBmZWF0dXJlZCBjb250ZW50IG9yIGluZm9ybWF0aW9uLjwvcD5cXFxyXG5cdFx0ICA8aHIgY2xhc3M9XCJteS00XCI+XFxcclxuXHRcdCAgPHA+SXQgdXNlcyB1dGlsaXR5IGNsYXNzZXMgZm9yIHR5cG9ncmFwaHkgYW5kIHNwYWNpbmcgdG8gc3BhY2UgY29udGVudCBvdXQgd2l0aGluIHRoZSBsYXJnZXIgY29udGFpbmVyLjwvcD5cXFxyXG5cdFx0ICA8cCBjbGFzcz1cImxlYWRcIj5cXFxyXG5cdFx0XHQ8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tbGdcIiBocmVmPVwiI1wiIHJvbGU9XCJidXR0b25cIj5MZWFybiBtb3JlPC9hPlxcXHJcblx0XHQgIDwvcD5cXFxyXG5cdFx0PC9kaXY+J1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQganVtYm90cm9uOyIsImltcG9ydCBWdnZlYiBmcm9tICcuLi8uLi9idWlsZGVyJ1xyXG5pbXBvcnQgeyBGaWxlVXBsb2FkSW5wdXQsIFRleHRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgaW1hZ2UgPSB7XHJcbiAgICBub2RlczogW1wiaW1nXCJdLFxyXG4gICAgbmFtZTogXCJJbWFnZVwiLFxyXG4gICAgaHRtbDogJzxpbWcgc3JjPVwiJyArIFZ2dmViLmJhc2VVcmwgKyAnaWNvbnMvaW1hZ2Uuc3ZnXCIgaGVpZ2h0PVwiMTI4XCIgd2lkdGg9XCIxMjhcIj4nLFxyXG4gICAgLypcclxuICAgIGFmdGVyRHJvcDogZnVuY3Rpb24gKG5vZGUpXHJcblx0e1xyXG5cdFx0bm9kZS5hdHRyKFwic3JjXCIsICcnKTtcclxuXHRcdHJldHVybiBub2RlO1xyXG5cdH0sKi9cclxuICAgIGltYWdlOiBcImljb25zL2ltYWdlLnN2Z1wiLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIkltYWdlXCIsXHJcbiAgICAgICAga2V5OiBcInNyY1wiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInNyY1wiLFxyXG4gICAgICAgIGlucHV0dHlwZTogRmlsZVVwbG9hZElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJXaWR0aFwiLFxyXG4gICAgICAgIGtleTogXCJ3aWR0aFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcIndpZHRoXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkhlaWdodFwiLFxyXG4gICAgICAgIGtleTogXCJoZWlnaHRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJoZWlnaHRcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiQWx0XCIsXHJcbiAgICAgICAga2V5OiBcImFsdFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImFsdFwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW1hZ2U7IiwiY29uc3QgaHIgPSB7XHJcbiAgICBpbWFnZTogXCJpY29ucy9oci5zdmdcIixcclxuICAgIG5vZGVzOiBbXCJoclwiXSxcclxuICAgIG5hbWU6IFwiSG9yaXpvbnRhbCBSdWxlXCIsXHJcbiAgICBodG1sOiBcIjxocj5cIlxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBocjsiLCJpbXBvcnQgeyBjaGFuZ2VOb2RlTmFtZSB9IGZyb20gJy4uL2NvbW1vbic7XHJcbmltcG9ydCB7IFNlbGVjdElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBoZWFkaW5nID0gIHtcclxuICAgIGltYWdlOiBcImljb25zL2hlYWRpbmcuc3ZnXCIsXHJcbiAgICBuYW1lOiBcIkhlYWRpbmdcIixcclxuICAgIG5vZGVzOiBbXCJoMVwiLCBcImgyXCIsIFwiaDNcIiwgXCJoNFwiLCBcImg1XCIsIFwiaDZcIl0sXHJcbiAgICBodG1sOiBcIjxoMT5IZWFkaW5nPC9oMT5cIixcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlNpemVcIixcclxuICAgICAgICAgICAga2V5OiBcImlkXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImlkXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcblxyXG4gICAgICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKG5vZGUsIHZhbHVlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoYW5nZU5vZGVOYW1lKG5vZGUsIFwiaFwiICsgdmFsdWUpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZWdleDtcclxuICAgICAgICAgICAgICAgIHJlZ2V4ID0gL0goXFxkKS8uZXhlYyhub2RlLm5vZGVOYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZWdleCAmJiByZWdleFsxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWdleFsxXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDFcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiMVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiMlwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiM1wiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiNFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiNVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiNlwiXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBoZWFkaW5nOyIsImltcG9ydCB7IEdyaWRJbnB1dCwgQnV0dG9uSW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGdyaWRyb3cgPSB7XHJcbiAgICBuYW1lOiBcIkdyaWQgUm93XCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9ncmlkX3Jvdy5zdmdcIixcclxuICAgIGNsYXNzZXM6IFtcInJvd1wiXSxcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+PGgzPmNvbC1zbS00PC9oMz48L2Rpdj48ZGl2IGNsYXNzPVwiY29sLXNtLTQgY29sLTVcIj48aDM+Y29sLXNtLTQ8L2gzPjwvZGl2PjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPjxoMz5jb2wtc20tNDwvaDM+PC9kaXY+PC9kaXY+JyxcclxuXHJcbiAgICBiZWZvcmVJbml0OiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgIHByb3BlcnRpZXMgPSBbXTtcclxuICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgdmFyIGogPSAwO1xyXG5cclxuICAgICAgICAkKG5vZGUpLmZpbmQoJ1tjbGFzcyo9XCJjb2wtXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF9jbGFzcyA9ICQodGhpcykuYXR0cihcImNsYXNzXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlZyA9IC9jb2wtKFteLVxcJCBdKik/LT8oXFxkKykvZztcclxuICAgICAgICAgICAgdmFyIG1hdGNoO1xyXG4gICAgICAgICAgICBkYXRhID0ge307XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoKG1hdGNoID0gcmVnLmV4ZWMoX2NsYXNzKSkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YVtcImNvbFwiICsgKChtYXRjaFsxXSAhPSB1bmRlZmluZWQpID8gXCJfXCIgKyBtYXRjaFsxXSA6IFwiXCIpXSA9IG1hdGNoWzJdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkNvbHVtbiBcIiArIGksXHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiY29sdW1uXCIgKyBpLFxyXG4gICAgICAgICAgICAgICAgLy9pbmRleDogaSAtIDEsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5Ob2RlOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaW5wdXR0eXBlOiBHcmlkSW5wdXQsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSwgaW5wdXQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb2x1bW4gPSAkKCdbY2xhc3MqPVwiY29sLVwiXTplcSgnICsgdGhpcy5pbmRleCArICcpJywgbm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uID0gJCh0aGlzLmNvbHVtbk5vZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIHJlbW92ZSBidXR0b24gaXMgY2xpY2tlZCByZW1vdmUgY29sdW1uIGFuZCByZW5kZXIgcm93IHByb3BlcnRpZXNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQubm9kZU5hbWUgPT0gJ0JVVFRPTicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWdnZlYi5Db21wb25lbnRzLnJlbmRlcihcImh0bWwvZ3JpZHJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIHNlbGVjdCBpbnB1dCB0aGVuIGNoYW5nZSBjb2x1bW4gY2xhc3NcclxuICAgICAgICAgICAgICAgICAgICBfY2xhc3MgPSBjb2x1bW4uYXR0cihcImNsYXNzXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3JlbW92ZSBwcmV2aW91cyBicmVha3BvaW50IGNvbHVtbiBzaXplXHJcbiAgICAgICAgICAgICAgICAgICAgX2NsYXNzID0gX2NsYXNzLnJlcGxhY2UobmV3IFJlZ0V4cChpbnB1dC5uYW1lICsgJy1cXFxcZCs/JyksICcnKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2FkZCBuZXcgY29sdW1uIHNpemVcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUpIF9jbGFzcyArPSAnICcgKyBpbnB1dC5uYW1lICsgJy0nICsgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uLmF0dHIoXCJjbGFzc1wiLCBfY2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL3JlbW92ZSBhbGwgY29sdW1uIHByb3BlcnRpZXNcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSB0aGlzLnByb3BlcnRpZXMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmtleS5pbmRleE9mKFwiY29sdW1uXCIpID09PSAtMTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9hZGQgcmVtYWluaW5nIHByb3BlcnRpZXMgdG8gZ2VuZXJhdGVkIGNvbHVtbiBwcm9wZXJ0aWVzXHJcbiAgICAgICAgcHJvcGVydGllcy5wdXNoKHRoaXMucHJvcGVydGllc1swXSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJDb2x1bW5cIixcclxuICAgICAgICBrZXk6IFwiY29sdW1uMVwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogR3JpZElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJDb2x1bW5cIixcclxuICAgICAgICBrZXk6IFwiY29sdW1uMVwiLFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBjb2w6IDEyLFxyXG4gICAgICAgIGlucHV0dHlwZTogR3JpZElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICBrZXk6IFwiYWRkQ2hpbGRcIixcclxuICAgICAgICBpbnB1dHR5cGU6IEJ1dHRvbklucHV0LFxyXG4gICAgICAgIGRhdGE6IHsgdGV4dDogXCJBZGQgY29sdW1uXCIgfSxcclxuICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAgICAgJChub2RlKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJjb2wtM1wiPkNvbC0zPC9kaXY+Jyk7XHJcblxyXG4gICAgICAgICAgICAvL3JlbmRlciBjb21wb25lbnQgcHJvcGVydGllcyBhZ2FpbiB0byBpbmNsdWRlIHRoZSBuZXcgY29sdW1uIGlucHV0c1xyXG4gICAgICAgICAgICBWdnZlYi5Db21wb25lbnRzLnJlbmRlcihcImh0bWwvZ3JpZHJvd1wiKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBncmlkcm93OyIsImltcG9ydCB7IEdyaWRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgZ3JpZGNvbHVtbiA9IHtcclxuICAgIG5hbWU6IFwiR3JpZCBDb2x1bW5cIixcclxuICAgIGltYWdlOiBcImljb25zL2dyaWRfcm93LnN2Z1wiLFxyXG4gICAgY2xhc3Nlc1JlZ2V4OiBbXCJjb2wtXCJdLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPjxoMz5jb2wtc20tNDwvaDM+PC9kaXY+JyxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJDb2x1bW5cIixcclxuICAgICAgICBrZXk6IFwiY29sdW1uXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBHcmlkSW5wdXQsXHJcbiAgICAgICAgZGF0YTogeyBoaWRlX3JlbW92ZTogdHJ1ZSB9LFxyXG5cclxuICAgICAgICBiZWZvcmVJbml0OiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgICAgICBfY2xhc3MgPSAkKG5vZGUpLmF0dHIoXCJjbGFzc1wiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZWcgPSAvY29sLShbXi1cXCQgXSopPy0/KFxcZCspL2c7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaDtcclxuXHJcbiAgICAgICAgICAgIHdoaWxlICgobWF0Y2ggPSByZWcuZXhlYyhfY2xhc3MpKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFbXCJjb2xcIiArICgobWF0Y2hbMV0gIT0gdW5kZWZpbmVkKSA/IFwiX1wiICsgbWF0Y2hbMV0gOiBcIlwiKV0gPSBtYXRjaFsyXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSwgdmFsdWUsIGlucHV0KSB7XHJcbiAgICAgICAgICAgIF9jbGFzcyA9IG5vZGUuYXR0cihcImNsYXNzXCIpO1xyXG5cclxuICAgICAgICAgICAgLy9yZW1vdmUgcHJldmlvdXMgYnJlYWtwb2ludCBjb2x1bW4gc2l6ZVxyXG4gICAgICAgICAgICBfY2xhc3MgPSBfY2xhc3MucmVwbGFjZShuZXcgUmVnRXhwKGlucHV0Lm5hbWUgKyAnLVxcXFxkKz8nKSwgJycpO1xyXG4gICAgICAgICAgICAvL2FkZCBuZXcgY29sdW1uIHNpemVcclxuICAgICAgICAgICAgaWYgKHZhbHVlKSBfY2xhc3MgKz0gJyAnICsgaW5wdXQubmFtZSArICctJyArIHZhbHVlO1xyXG4gICAgICAgICAgICBub2RlLmF0dHIoXCJjbGFzc1wiLCBfY2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfSxcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBncmlkY29sdW1uOyIsImltcG9ydCB7IFRleHRJbnB1dCwgU2VsZWN0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGZvcm0gPSB7XHJcbiAgICBub2RlczogW1wiZm9ybVwiXSxcclxuICAgIGltYWdlOiBcImljb25zL2Zvcm0uc3ZnXCIsXHJcbiAgICBuYW1lOiBcIkZvcm1cIixcclxuICAgIGh0bWw6ICc8Zm9ybSBjbGFzcz1cImRyb3B6b25lXCI+PC9mb3JtPicsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiU3R5bGVcIixcclxuICAgICAgICBrZXk6IFwic3R5bGVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJcIiwgXCJmb3JtLXNlYXJjaFwiLCBcImZvcm0taW5saW5lXCIsIFwiZm9ybS1ob3Jpem9udGFsXCJdLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJmb3JtLXNlYXJjaFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTZWFyY2hcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJmb3JtLWlubGluZVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJJbmxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJmb3JtLWhvcml6b250YWxcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSG9yaXpvbnRhbFwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiQWN0aW9uXCIsXHJcbiAgICAgICAga2V5OiBcImFjdGlvblwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImFjdGlvblwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJNZXRob2RcIixcclxuICAgICAgICBrZXk6IFwibWV0aG9kXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwibWV0aG9kXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb3JtOyIsImNvbnN0IGZpbGVpbnB1dCA9IHtcclxuICAgIG5hbWU6IFwiSW5wdXQgZ3JvdXBcIixcclxuICAgIGF0dHJpYnV0ZXM6IHsgXCJ0eXBlXCI6IFwiZmlsZVwiIH0sXHJcbiAgICBpbWFnZTogXCJpY29ucy90ZXh0X2lucHV0LnN2Z1wiLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XFxcclxuXHRcdFx0ICA8aW5wdXQgdHlwZT1cImZpbGVcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxcXHJcblx0XHRcdDwvZGl2PidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZpbGVpbnB1dDsiLCJpbXBvcnQgeyBiZ2NvbG9yU2VsZWN0T3B0aW9ucywgYmdjb2xvckNsYXNzZXMgfSBmcm9tICcuLi9jb21tb24nO1xyXG5pbXBvcnQgeyBTZWxlY3RJbnB1dCwgQ29sb3JJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgZGl2ID0ge1xyXG4gICAgY2xhc3NlczogW1wiY29udGFpbmVyXCIsIFwiY29udGFpbmVyLWZsdWlkXCJdLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvZGl2LnN2Z1wiLFxyXG4gICAgaHRtbDogJzxkaXYgc3R5bGU9XCJ3aWR0aDogMzUwcHg7IGhlaWdodDogMjAwcHg7XCIgY2xhc3M9XCJkcm9wem9uZVwiPjwvZGl2PicsXHJcbiAgICBuYW1lOiBcIkRpdlwiLFxyXG4gICAgcHJvcGVydGllczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJUeXBlXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJ0eXBlXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJjb250YWluZXJcIiwgXCJjb250YWluZXItZmx1aWRcIl0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiY29udGFpbmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJjb250YWluZXItZmx1aWRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkZsdWlkXCJcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJCYWNrZ3JvdW5kXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJiYWNrZ3JvdW5kXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBiZ2NvbG9yQ2xhc3NlcyxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogYmdjb2xvclNlbGVjdE9wdGlvbnNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkJhY2tncm91bmQgQ29sb3JcIixcclxuICAgICAgICAgICAga2V5OiBcImJhY2tncm91bmQtY29sb3JcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDb2xvcklucHV0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlRleHQgQ29sb3JcIixcclxuICAgICAgICAgICAga2V5OiBcImNvbG9yXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ29sb3JJbnB1dCxcclxuICAgICAgICB9XSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRpdjsiLCJpbXBvcnQgeyBTZWxlY3RJbnB1dCwgQ29sb3JJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBiZ2NvbG9yQ2xhc3NlcywgYmdjb2xvclNlbGVjdE9wdGlvbnMgfSBmcm9tICcuLi9jb21tb24nO1xyXG5cclxuY29uc3QgY29udGFpbmVyID0ge1xyXG4gICAgY2xhc3NlczogW1wiY29udGFpbmVyXCIsIFwiY29udGFpbmVyLWZsdWlkXCJdLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvY29udGFpbmVyLnN2Z1wiLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJjb250YWluZXIgZHJvcHpvbmVcIj48ZGl2IGNsYXNzPVwibS01XCI+Q29udGFpbmVyPC9kaXY+PC9kaXY+JyxcclxuICAgIG5hbWU6IFwiQ29udGFpbmVyXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlR5cGVcIixcclxuICAgICAgICAgICAga2V5OiBcInR5cGVcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImNvbnRhaW5lclwiLCBcImNvbnRhaW5lci1mbHVpZFwiXSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJjb250YWluZXJcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImNvbnRhaW5lci1mbHVpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRmx1aWRcIlxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkJhY2tncm91bmRcIixcclxuICAgICAgICAgICAga2V5OiBcImJhY2tncm91bmRcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IGJnY29sb3JDbGFzc2VzLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBiZ2NvbG9yU2VsZWN0T3B0aW9uc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiQmFja2dyb3VuZCBDb2xvclwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiYmFja2dyb3VuZC1jb2xvclwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENvbG9ySW5wdXQsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiVGV4dCBDb2xvclwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiY29sb3JcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDb2xvcklucHV0LFxyXG4gICAgICAgIH1dLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29udGFpbmVyO1xyXG5cclxuIiwiY29uc3QgYmdjb2xvckNsYXNzZXMgPSBbXCJiZy1wcmltYXJ5XCIsIFwiYmctc2Vjb25kYXJ5XCIsIFwiYmctc3VjY2Vzc1wiLCBcImJnLWRhbmdlclwiLCBcImJnLXdhcm5pbmdcIiwgXCJiZy1pbmZvXCIsIFwiYmctbGlnaHRcIiwgXCJiZy1kYXJrXCIsIFwiYmctd2hpdGVcIl07XHJcblxyXG5jb25zdCBiZ2NvbG9yU2VsZWN0T3B0aW9ucyA9XHJcbiAgICBbe1xyXG4gICAgICAgIHZhbHVlOiBcIkRlZmF1bHRcIixcclxuICAgICAgICB0ZXh0OiBcIlwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLXByaW1hcnlcIixcclxuICAgICAgICB0ZXh0OiBcIlByaW1hcnlcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImJnLXNlY29uZGFyeVwiLFxyXG4gICAgICAgIHRleHQ6IFwiU2Vjb25kYXJ5XCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1zdWNjZXNzXCIsXHJcbiAgICAgICAgdGV4dDogXCJTdWNjZXNzXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1kYW5nZXJcIixcclxuICAgICAgICB0ZXh0OiBcIkRhbmdlclwiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctd2FybmluZ1wiLFxyXG4gICAgICAgIHRleHQ6IFwiV2FybmluZ1wiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctaW5mb1wiLFxyXG4gICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiYmctbGlnaHRcIixcclxuICAgICAgICB0ZXh0OiBcIkxpZ2h0XCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy1kYXJrXCIsXHJcbiAgICAgICAgdGV4dDogXCJEYXJrXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJiZy13aGl0ZVwiLFxyXG4gICAgICAgIHRleHQ6IFwiV2hpdGVcIlxyXG4gICAgfV07XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VOb2RlTmFtZShub2RlLCBuZXdOb2RlTmFtZSkge1xyXG4gICAgdmFyIG5ld05vZGU7XHJcbiAgICBuZXdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuZXdOb2RlTmFtZSk7XHJcbiAgICBhdHRyaWJ1dGVzID0gbm9kZS5nZXQoMCkuYXR0cmlidXRlcztcclxuXHJcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBhdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgbmV3Tm9kZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlc1tpXS5ub2RlTmFtZSwgYXR0cmlidXRlc1tpXS5ub2RlVmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgICQobmV3Tm9kZSkuYXBwZW5kKCQobm9kZSkuY29udGVudHMoKSk7XHJcbiAgICAkKG5vZGUpLnJlcGxhY2VXaXRoKG5ld05vZGUpO1xyXG5cclxuICAgIHJldHVybiBuZXdOb2RlO1xyXG59XHJcblxyXG5sZXQgYmFzZV9zb3J0ID0gMTAwOy8vc3RhcnQgc29ydGluZyBmb3IgYmFzZSBjb21wb25lbnQgZnJvbSAxMDAgdG8gYWxsb3cgZXh0ZW5kZWQgcHJvcGVydGllcyB0byBiZSBmaXJzdFxyXG5mdW5jdGlvbiBpbmNfYmFzZV9zb3J0KCkge1xyXG4gICAgcmV0dXJuIGJhc2Vfc29ydCsrO1xyXG59XHJcblxyXG5leHBvcnQgeyBiZ2NvbG9yQ2xhc3NlcywgYmdjb2xvclNlbGVjdE9wdGlvbnMsIGNoYW5nZU5vZGVOYW1lLCBpbmNfYmFzZV9zb3J0IH07XHJcbiIsImltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgY2hlY2tib3ggPSB7XHJcbiAgICBuYW1lOiBcIkNoZWNrYm94XCIsXHJcbiAgICBhdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBcImNoZWNrYm94XCIgfSxcclxuICAgIGltYWdlOiBcImljb25zL2NoZWNrYm94LnN2Z1wiLFxyXG4gICAgaHRtbDogJzxsYWJlbCBjbGFzcz1cImNoZWNrYm94XCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiPiBDaGVja2JveDwvbGFiZWw+JyxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJOYW1lXCIsXHJcbiAgICAgICAga2V5OiBcIm5hbWVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJuYW1lXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjaGVja2JveDsiLCJjb25zdCBjYXJkID0ge1xyXG4gICAgY2xhc3NlczogW1wiY2FyZFwiXSxcclxuICAgIGltYWdlOiBcImljb25zL3BhbmVsLnN2Z1wiLFxyXG4gICAgbmFtZTogXCJDYXJkXCIsXHJcbiAgICBodG1sOiAnPGRpdiBjbGFzcz1cImNhcmRcIj5cXFxyXG5cdFx0ICA8aW1nIGNsYXNzPVwiY2FyZC1pbWctdG9wXCIgc3JjPVwiLi4vbGlicy9idWlsZGVyL2ljb25zL2ltYWdlLnN2Z1wiIGFsdD1cIkNhcmQgaW1hZ2UgY2FwXCIgd2lkdGg9XCIxMjhcIiBoZWlnaHQ9XCIxMjhcIj5cXFxyXG5cdFx0ICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XFxcclxuXHRcdFx0PGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPkNhcmQgdGl0bGU8L2g0PlxcXHJcblx0XHRcdDxwIGNsYXNzPVwiY2FyZC10ZXh0XCI+U29tZSBxdWljayBleGFtcGxlIHRleHQgdG8gYnVpbGQgb24gdGhlIGNhcmQgdGl0bGUgYW5kIG1ha2UgdXAgdGhlIGJ1bGsgb2YgdGhlIGNhcmRcXCdzIGNvbnRlbnQuPC9wPlxcXHJcblx0XHRcdDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIj5HbyBzb21ld2hlcmU8L2E+XFxcclxuXHRcdCAgPC9kaXY+XFxcclxuXHRcdDwvZGl2PidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNhcmQ7IiwiY29uc3QgYnV0dG9udG9vbGJhciA9ICB7XHJcbiAgICBjbGFzc2VzOiBbXCJidG4tdG9vbGJhclwiXSxcclxuICAgIG5hbWU6IFwiQnV0dG9uIFRvb2xiYXJcIixcclxuICAgIGltYWdlOiBcImljb25zL2J1dHRvbl90b29sYmFyLnN2Z1wiLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJidG4tdG9vbGJhclwiIHJvbGU9XCJ0b29sYmFyXCIgYXJpYS1sYWJlbD1cIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXCI+XFxcclxuXHRcdCAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cCBtci0yXCIgcm9sZT1cImdyb3VwXCIgYXJpYS1sYWJlbD1cIkZpcnN0IGdyb3VwXCI+XFxcclxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiPjE8L2J1dHRvbj5cXFxyXG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCI+MjwvYnV0dG9uPlxcXHJcblx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIj4zPC9idXR0b24+XFxcclxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiPjQ8L2J1dHRvbj5cXFxyXG5cdFx0ICA8L2Rpdj5cXFxyXG5cdFx0ICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIG1yLTJcIiByb2xlPVwiZ3JvdXBcIiBhcmlhLWxhYmVsPVwiU2Vjb25kIGdyb3VwXCI+XFxcclxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiPjU8L2J1dHRvbj5cXFxyXG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCI+NjwvYnV0dG9uPlxcXHJcblx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIj43PC9idXR0b24+XFxcclxuXHRcdCAgPC9kaXY+XFxcclxuXHRcdCAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIHJvbGU9XCJncm91cFwiIGFyaWEtbGFiZWw9XCJUaGlyZCBncm91cFwiPlxcXHJcblx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIj44PC9idXR0b24+XFxcclxuXHRcdCAgPC9kaXY+XFxcclxuXHRcdDwvZGl2PidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1dHRvbnRvb2xiYXI7IiwiaW1wb3J0IHsgU2VsZWN0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGJ1dHRvbmdyb3VwID0ge1xyXG4gICAgY2xhc3NlczogW1wiYnRuLWdyb3VwXCJdLFxyXG4gICAgbmFtZTogXCJCdXR0b24gR3JvdXBcIixcclxuICAgIGltYWdlOiBcImljb25zL2J1dHRvbl9ncm91cC5zdmdcIixcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCIgYXJpYS1sYWJlbD1cIkJhc2ljIGV4YW1wbGVcIj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCI+TGVmdDwvYnV0dG9uPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIj5NaWRkbGU8L2J1dHRvbj4gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiPlJpZ2h0PC9idXR0b24+PC9kaXY+JyxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJTaXplXCIsXHJcbiAgICAgICAga2V5OiBcInNpemVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImJ0bi1ncm91cC1sZ1wiLCBcImJ0bi1ncm91cC1zbVwiXSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1ncm91cC1sZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMYXJnZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1ncm91cC1zbVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTbWFsbFwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiQWxpZ25tZW50XCIsXHJcbiAgICAgICAga2V5OiBcImFsaWdubWVudFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiYnRuLWdyb3VwXCIsIFwiYnRuLWdyb3VwLXZlcnRpY2FsXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWdyb3VwXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhvcml6b250YWxcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tZ3JvdXAtdmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiVmVydGljYWxcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidXR0b25ncm91cDsiLCJpbXBvcnQgeyBMaW5rSW5wdXQsIFNlbGVjdElucHV0LCBUZXh0SW5wdXQsIFRvZ2dsZUlucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBidXR0b24gPSB7XHJcbiAgICBjbGFzc2VzOiBbXCJidG5cIiwgXCJidG4tbGlua1wiXSxcclxuICAgIG5hbWU6IFwiQnV0dG9uXCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9idXR0b24uc3ZnXCIsXHJcbiAgICBodG1sOiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIj5QcmltYXJ5PC9idXR0b24+JyxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJMaW5rIFRvXCIsXHJcbiAgICAgICAga2V5OiBcImhyZWZcIixcclxuICAgICAgICBodG1sQXR0cjogXCJocmVmXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBMaW5rSW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlR5cGVcIixcclxuICAgICAgICBrZXk6IFwidHlwZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiYnRuLWRlZmF1bHRcIiwgXCJidG4tcHJpbWFyeVwiLCBcImJ0bi1pbmZvXCIsIFwiYnRuLXN1Y2Nlc3NcIiwgXCJidG4td2FybmluZ1wiLCBcImJ0bi1pbmZvXCIsIFwiYnRuLWxpZ2h0XCIsIFwiYnRuLWRhcmtcIiwgXCJidG4tb3V0bGluZS1wcmltYXJ5XCIsIFwiYnRuLW91dGxpbmUtaW5mb1wiLCBcImJ0bi1vdXRsaW5lLXN1Y2Nlc3NcIiwgXCJidG4tb3V0bGluZS13YXJuaW5nXCIsIFwiYnRuLW91dGxpbmUtaW5mb1wiLCBcImJ0bi1vdXRsaW5lLWxpZ2h0XCIsIFwiYnRuLW91dGxpbmUtZGFya1wiLCBcImJ0bi1saW5rXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJQcmltYXJ5XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuIGJ0bi1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm9cIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tc3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTdWNjZXNzXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLXdhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiV2FybmluZ1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm9cIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tbGlnaHRcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiTGlnaHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tZGFya1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEYXJrXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLW91dGxpbmUtcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJQcmltYXJ5IG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4gYnRuLW91dGxpbmUtaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJJbmZvIG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tb3V0bGluZS1zdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlN1Y2Nlc3Mgb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1vdXRsaW5lLXdhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiV2FybmluZyBvdXRsaW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLW91dGxpbmUtaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJJbmZvIG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tb3V0bGluZS1saWdodFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMaWdodCBvdXRsaW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLW91dGxpbmUtZGFya1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEYXJrIG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tbGlua1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMaW5rXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJTaXplXCIsXHJcbiAgICAgICAga2V5OiBcInNpemVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImJ0bi1sZ1wiLCBcImJ0bi1zbVwiXSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1sZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMYXJnZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1zbVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTbWFsbFwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiVGFyZ2V0XCIsXHJcbiAgICAgICAga2V5OiBcInRhcmdldFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInRhcmdldFwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJEaXNhYmxlZFwiLFxyXG4gICAgICAgIGtleTogXCJkaXNhYmxlZFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiZGlzYWJsZWRcIl0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvbjogXCJkaXNhYmxlZFwiLFxyXG4gICAgICAgICAgICBvZmY6IFwiXCJcclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnV0dG9uOyIsImNvbnN0IGJyZWFkY3J1bWJzID0gIHtcclxuICAgIGNsYXNzZXM6IFtcImJyZWFkY3J1bWJcIl0sXHJcbiAgICBuYW1lOiBcIkJyZWFkY3J1bWJzXCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9icmVhZGNydW1icy5zdmdcIixcclxuICAgIGh0bWw6ICc8b2wgY2xhc3M9XCJicmVhZGNydW1iXCI+XFxcclxuXHRcdCAgPGxpIGNsYXNzPVwiYnJlYWRjcnVtYi1pdGVtIGFjdGl2ZVwiPjxhIGhyZWY9XCIjXCI+SG9tZTwvYT48L2xpPlxcXHJcblx0XHQgIDxsaSBjbGFzcz1cImJyZWFkY3J1bWItaXRlbSBhY3RpdmVcIj48YSBocmVmPVwiI1wiPkxpYnJhcnk8L2E+PC9saT5cXFxyXG5cdFx0ICA8bGkgY2xhc3M9XCJicmVhZGNydW1iLWl0ZW0gYWN0aXZlXCI+RGF0YSAzPC9saT5cXFxyXG5cdFx0PC9vbD4nXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBicmVhZGNydW1iczsiLCJpbXBvcnQgeyBUb2dnbGVJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgYnJlYWRjcnVtYml0ZW0gPSB7XHJcbiAgICBjbGFzc2VzOiBbXCJicmVhZGNydW1iLWl0ZW1cIl0sXHJcbiAgICBuYW1lOiBcIkJyZWFkY3J1bWIgSXRlbVwiLFxyXG4gICAgaHRtbDogJzxsaSBjbGFzcz1cImJyZWFkY3J1bWItaXRlbVwiPjxhIGhyZWY9XCIjXCI+TGlicmFyeTwvYT48L2xpPicsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiQWN0aXZlXCIsXHJcbiAgICAgICAga2V5OiBcImFjdGl2ZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcIlwiLCBcImFjdGl2ZVwiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb246IFwiYWN0aXZlXCIsXHJcbiAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJyZWFkY3J1bWJpdGVtOyIsImltcG9ydCB7IFNlbGVjdElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBiYWRnZSA9IHtcclxuICAgIGNsYXNzZXM6IFtcImJhZGdlXCJdLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvYmFkZ2Uuc3ZnXCIsXHJcbiAgICBuYW1lOiBcIkJhZGdlXCIsXHJcbiAgICBodG1sOiAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1wcmltYXJ5XCI+UHJpbWFyeSBiYWRnZTwvc3Bhbj4nLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIkNvbG9yXCIsXHJcbiAgICAgICAga2V5OiBcImNvbG9yXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiYmFkZ2UtcHJpbWFyeVwiLCBcImJhZGdlLXNlY29uZGFyeVwiLCBcImJhZGdlLXN1Y2Nlc3NcIiwgXCJiYWRnZS1kYW5nZXJcIiwgXCJiYWRnZS13YXJuaW5nXCIsIFwiYmFkZ2UtaW5mb1wiLCBcImJhZGdlLWxpZ2h0XCIsIFwiYmFkZ2UtZGFya1wiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYmFkZ2UtcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJQcmltYXJ5XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYmFkZ2Utc2Vjb25kYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlNlY29uZGFyeVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJhZGdlLXN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU3VjY2Vzc1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJhZGdlLXdhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiV2FybmluZ1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJhZGdlLWRhbmdlclwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEYW5nZXJcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJiYWRnZS1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm9cIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJiYWRnZS1saWdodFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMaWdodFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJhZGdlLWRhcmtcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGFya1wiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJhZGdlOyIsImltcG9ydCBTZWxlY3RJbnB1dCBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGFsZXJ0ID0ge1xyXG4gICAgY2xhc3NlczogW1wiYWxlcnRcIl0sXHJcbiAgICBuYW1lOiBcIkFsZXJ0XCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9hbGVydC5zdmdcIixcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtd2FybmluZyBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj5cXFxyXG5cdFx0ICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cXFxyXG5cdFx0XHQ8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxcXHJcblx0XHQgIDwvYnV0dG9uPlxcXHJcblx0XHQgIDxzdHJvbmc+SG9seSBndWFjYW1vbGUhPC9zdHJvbmc+IFlvdSBzaG91bGQgY2hlY2sgaW4gb24gc29tZSBvZiB0aG9zZSBmaWVsZHMgYmVsb3cuXFxcclxuXHRcdDwvZGl2PicsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICAgIGtleTogXCJ0eXBlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiYWxlcnQtcHJpbWFyeVwiLCBcImFsZXJ0LXNlY29uZGFyeVwiLCBcImFsZXJ0LXN1Y2Nlc3NcIiwgXCJhbGVydC1kYW5nZXJcIiwgXCJhbGVydC13YXJuaW5nXCIsIFwiYWxlcnQtaW5mb1wiLCBcImFsZXJ0LWxpZ2h0XCIsIFwiYWxlcnQtZGFya1wiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImFsZXJ0LXByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImFsZXJ0LXNlY29uZGFyeVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTZWNvbmRhcnlcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJhbGVydC1zdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJhbGVydC1kYW5nZXJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGFuZ2VyXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYWxlcnQtd2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJXYXJuaW5nXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYWxlcnQtaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJJbmZvXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYWxlcnQtbGlnaHRcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiTGlnaHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJhbGVydC1kYXJrXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhcmtcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhbGVydDsiXX0=
