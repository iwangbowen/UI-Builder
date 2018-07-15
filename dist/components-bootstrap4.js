require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({53:[function(require,module,exports){
var _builder = require('./builder');

var _builder2 = _interopRequireDefault(_builder);

var _components = require('./components/@general/components');

var _general = _interopRequireWildcard(_components);

var _components2 = require('./components/@oee/components');

var _oee = _interopRequireWildcard(_components2);

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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_builder2.default.ComponentsGroup['定制组件'] = ['html/labeldiv@oee', 'html/button@oee', 'html/textinput@oee', 'html/radiobutton@oee', 'html/checkbox@oee', 'html/selectinput@oee', 'html/table@oee'];

_builder2.default.ComponentsGroup['通用组件'] = ['html/label@general', 'html/div@general', 'html/button@general', 'html/buttongroup@general', 'html/buttontoolbar@general', 'html/form@general', 'html/textinput@general', 'html/textareainput@general', 'html/selectinput@general', 'html/fileinput@general', 'html/checkbox@general', 'html/radiobutton@general', 'html/table@general', 'html/heading@general', 'html/image@general', 'html/jumbotron@general', 'html/alert@general', 'html/card@general', 'html/listgroup@general', 'html/hr@general', 'html/taglabel@general', 'html/badge@general', 'html/progress@general', 'html/navbar@general', 'html/breadcrumbs@general', 'html/pagination@general', 'html/container@general', 'html/gridrow@general'];

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

_builder2.default.Components.extend("_base", "html/div@general", _general.div);
_builder2.default.Components.extend("_base", "html/label@general", _general.label);
_builder2.default.Components.extend("_base", "html/button@general", _general.button);
_builder2.default.Components.extend("_base", "html/container@general", _general.container);
_builder2.default.Components.extend("_base", "html/heading@general", _general.heading);
_builder2.default.Components.extend("_base", "html/link@general", _general.link);
_builder2.default.Components.extend("_base", "html/image@general", _general.image);
_builder2.default.Components.add("html/hr@general", _general.hr);
_builder2.default.Components.extend("_base", "html/buttongroup@general", _general.buttongroup);
_builder2.default.Components.extend("_base", "html/buttontoolbar@general", _general.buttontoolbar);
_builder2.default.Components.extend("_base", "html/alert@general", _general.alert);
_builder2.default.Components.extend("_base", "html/badge@general", _general.badge);
_builder2.default.Components.extend("_base", "html/card@general", _general.card);
_builder2.default.Components.extend("_base", "html/listgroup@general", _general.listgroup);
_builder2.default.Components.extend("_base", "html/listitem@general", _general.listitem);
_builder2.default.Components.extend("_base", "html/breadcrumbs@general", _general.breadcrumbs);
_builder2.default.Components.extend("_base", "html/breadcrumbitem@general", _general.breadcrumbitem);
_builder2.default.Components.extend("_base", "html/pagination@general", _general.pagination);
_builder2.default.Components.extend("_base", "html/pageitem@general", _general.pageitem);
_builder2.default.Components.extend("_base", "html/progress@general", _general.progress);
_builder2.default.Components.extend("_base", "html/jumbotron@general", _general.jumbotron);
_builder2.default.Components.extend("_base", "html/navbar@general", _general.navbar);
_builder2.default.Components.extend("_base", "html/form@general", _general.form);
_builder2.default.Components.extend("_base", "html/textinput@general", _general.textinput);
_builder2.default.Components.extend("_base", "html/selectinput@general", _general.selectinput);
_builder2.default.Components.extend("_base", "html/textareainput@general", _general.textareainput);
_builder2.default.Components.extend("_base", "html/radiobutton@general", _general.radiobutton);
_builder2.default.Components.extend("_base", "html/checkbox@general", _general.checkbox);
_builder2.default.Components.extend("_base", "html/fileinput@general", _general.fileinput);
_builder2.default.Components.extend("_base", "html/table@general", _general.table);
_builder2.default.Components.extend("_base", "html/tablerow@general", _general.tablerow);
_builder2.default.Components.extend("_base", "html/tablecell@general", _general.tablecell);
_builder2.default.Components.extend("_base", "html/tableheadercell@general", _general.tableheadercell);
_builder2.default.Components.extend("_base", "html/tablehead@general", _general.tablehead);
_builder2.default.Components.extend("_base", "html/tablebody@general", _general.tablebody);
_builder2.default.Components.add("html/gridcolumn@general", _general.gridcolumn);
_builder2.default.Components.add("html/gridrow@general", _general.gridrow);

_builder2.default.Components.add('html/labeldiv@oee', _oee.labeldiv);
_builder2.default.Components.extend('_base', 'html/textinput@oee', _oee.textinput);
_builder2.default.Components.extend('_base', 'html/button@oee', _oee.button);
_builder2.default.Components.extend('_base', 'html/radiobutton@oee', _oee.radiobutton);
_builder2.default.Components.extend('_base', 'html/span@oee', _oee.span);
_builder2.default.Components.extend('_base', 'html/checkbox@oee', _oee.checkbox);
_builder2.default.Components.extend('_base', 'html/selectinput@oee', _oee.selectinput);
_builder2.default.Components.extend('_base', 'html/table@oee', _oee.table);

},{"./builder":52,"./components/@general/components":63,"./components/@oee/components":101,"./components/border":132,"./components/display":134,"./components/element":135,"./components/margin":137,"./components/padding":138,"./components/size":139,"./components/typography":140}],140:[function(require,module,exports){
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

},{"../inputs/inputs":165,"./common":133}],139:[function(require,module,exports){
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

},{"../inputs/inputs":165,"./common":133}],138:[function(require,module,exports){
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

},{"../inputs/inputs":165,"./common":133}],137:[function(require,module,exports){
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

},{"../inputs/inputs":165,"./common":133}],135:[function(require,module,exports){
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

},{"../inputs/inputs":165,"./common":133}],134:[function(require,module,exports){
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

},{"../inputs/inputs":165,"./common":133}],132:[function(require,module,exports){
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

},{"../inputs/inputs":165,"./common":133}],101:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.span = exports.labeldiv = exports.textareainput = exports.tablerow = exports.tablehead = exports.tablecell = exports.tablebody = exports.table = exports.tableheadercell = exports.selectinput = exports.radiobutton = exports.progress = exports.pagination = exports.pageitem = exports.navbar = exports.listitem = exports.listgroup = exports.link = exports.jumbotron = exports.image = exports.hr = exports.heading = exports.gridrow = exports.gridcolumn = exports.form = exports.fileinput = exports.checkbox = exports.card = exports.buttontoolbar = exports.buttongroup = exports.breadcrumbs = exports.breadcrumbitem = exports.badge = exports.alert = exports.container = exports.div = exports.button = exports.textinput = exports.label = undefined;

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

var _span = require('./span');

var _span2 = _interopRequireDefault(_span);

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
exports.span = _span2.default;

},{"./alert":92,"./badge":93,"./breadcrumbitem":94,"./breadcrumbs":95,"./button":96,"./buttongroup":97,"./buttontoolbar":98,"./card":99,"./checkbox":100,"./container":102,"./div":103,"./fileinput":104,"./form":105,"./gridcolumn":106,"./gridrow":107,"./heading":108,"./hr":109,"./image":110,"./jumbotron":111,"./label":112,"./labeldiv":113,"./link":114,"./listgroup":115,"./listitem":116,"./navbar":117,"./pageitem":118,"./pagination":119,"./progress":120,"./radiobutton":121,"./selectinput":122,"./span":123,"./table":124,"./tablebody":125,"./tablecell":126,"./tablehead":127,"./tableheadercell":128,"./tablerow":129,"./textareainput":130,"./textinput":131}],131:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../../inputs/inputs');

var _inputTypes = require('../inputTypes');

var _common = require('../common');

var textinput = {
    name: "Text Input",
    attributes: { "type": _inputTypes.inputTypeNames },
    image: "icons/text_input.svg",
    html: '<div class="everyOutbox-right draggable">\n            <div class="btn-group">\n                <div class="dailyBox">\n                    <input ' + _common.dataComponentId + '="html/textinput@oee" lustyle="height: 2.8rem;width:13rem " type="text" class="form-control Wdate"/>\n                 </div>\n            </div>\n           </div>',
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
    }, {
        name: 'Name',
        key: 'name',
        htmlAttr: 'name',
        inputtype: _inputs.TextInput
    }, {
        name: 'type',
        key: 'type',
        htmlAttr: 'type',
        inputtype: _inputs.SelectInput,
        data: {
            options: _inputTypes.inputTypes
        }
    }]
};

exports.default = textinput;

},{"../../inputs/inputs":165,"../common":133,"../inputTypes":136}],130:[function(require,module,exports){
arguments[4][90][0].apply(exports,arguments)
},{"dup":90}],129:[function(require,module,exports){
arguments[4][89][0].apply(exports,arguments)
},{"../../inputs/inputs":165,"dup":89}],128:[function(require,module,exports){
arguments[4][88][0].apply(exports,arguments)
},{"dup":88}],127:[function(require,module,exports){
arguments[4][87][0].apply(exports,arguments)
},{"../../inputs/inputs":165,"dup":87}],126:[function(require,module,exports){
arguments[4][86][0].apply(exports,arguments)
},{"dup":86}],125:[function(require,module,exports){
arguments[4][85][0].apply(exports,arguments)
},{"dup":85}],123:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var span = {
    name: "Span",
    image: "icons/text_input.svg",
    html: "",
    properties: [{
        name: "For id",
        key: "for",
        htmlAttr: "for",
        inputtype: _inputs.TextInput
    }, {
        name: 'Text',
        key: 'text',
        htmlAttr: 'text',
        inputtype: _inputs.TextInput
    }]
};

exports.default = span;

},{"../../inputs/inputs":165}],122:[function(require,module,exports){
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
    html: '<div class="form-group draggable" style="display: inline-block;"><label>Choose an option </label><select class="form-control"><option value="value1">Text 1</option><option value="value2">Text 2</option><option value="value3">Text 3</option></select></div>',

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

},{"../../builder":52,"../../inputs/inputs":165}],121:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../../inputs/inputs');

var _common = require('../common');

var radiobutton = {
    name: "Radio Button",
    attributes: { "type": "radio" },
    image: "icons/radio.svg",
    html: '<div ' + _common.dataComponentId + '="html/radiobutton@oee" class="everyOutbox-right draggable">\n            <div style="display:inline;"><input class="radioInput" name="Fruit" type="radio" value="" /><span ' + _common.dataComponentId + '="html/span@oee">\u5355\u90091</span></div>\n           </div>',
    properties: [{
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: _inputs.TextInput
    }]
};

exports.default = radiobutton;

},{"../../inputs/inputs":165,"../common":133}],120:[function(require,module,exports){
arguments[4][81][0].apply(exports,arguments)
},{"../../inputs/inputs":165,"../common":133,"dup":81}],119:[function(require,module,exports){
arguments[4][80][0].apply(exports,arguments)
},{"../../inputs/inputs":165,"dup":80}],118:[function(require,module,exports){
arguments[4][79][0].apply(exports,arguments)
},{"../../inputs/inputs":165,"dup":79}],117:[function(require,module,exports){
arguments[4][78][0].apply(exports,arguments)
},{"../../inputs/inputs":165,"../common":133,"dup":78}],116:[function(require,module,exports){
arguments[4][77][0].apply(exports,arguments)
},{"dup":77}],115:[function(require,module,exports){
arguments[4][76][0].apply(exports,arguments)
},{"dup":76}],114:[function(require,module,exports){
arguments[4][75][0].apply(exports,arguments)
},{"../../inputs/inputs":165,"dup":75}],113:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require('../common');

var labeldiv = {
    name: 'Label Div',
    image: 'icons/label.svg',
    html: '<div class="everyOutbox-left draggable">\n                <i class="fa fa-caret-square-o-right text-danger" aria-hidden="true"></i>\n                <span ' + _common.dataComponentId + '="html/span@oee" class="theme">Period</span>\n           </div>'
};

exports.default = labeldiv;

},{"../common":133}],112:[function(require,module,exports){
arguments[4][74][0].apply(exports,arguments)
},{"../../inputs/inputs":165,"dup":74}],111:[function(require,module,exports){
arguments[4][73][0].apply(exports,arguments)
},{"dup":73}],110:[function(require,module,exports){
arguments[4][72][0].apply(exports,arguments)
},{"../../builder":52,"../../inputs/inputs":165,"dup":72}],109:[function(require,module,exports){
arguments[4][71][0].apply(exports,arguments)
},{"dup":71}],108:[function(require,module,exports){
arguments[4][70][0].apply(exports,arguments)
},{"../../inputs/inputs":165,"../common":133,"dup":70}],107:[function(require,module,exports){
arguments[4][69][0].apply(exports,arguments)
},{"../../inputs/inputs":165,"dup":69}],106:[function(require,module,exports){
arguments[4][68][0].apply(exports,arguments)
},{"../../inputs/inputs":165,"dup":68}],105:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"../../inputs/inputs":165,"dup":67}],104:[function(require,module,exports){
arguments[4][66][0].apply(exports,arguments)
},{"dup":66}],103:[function(require,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"../../inputs/inputs":165,"../common":133,"dup":65}],102:[function(require,module,exports){
arguments[4][64][0].apply(exports,arguments)
},{"../../inputs/inputs":165,"../common":133,"dup":64}],100:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../../inputs/inputs');

var _common = require('../common');

var checkbox = {
    name: "Checkbox",
    attributes: { "type": "checkbox" },
    image: "icons/checkbox.svg",
    html: '<div class="everyOutbox-right draggable">\n             <div style="display:inline;">\n                <input ' + _common.dataComponentId + '="html/checkbox@oee" type="checkbox" class="checkboxInput" id="${it.site}eprCheck" name="paramItems[${loop.index}].eprCheck" value="true"/>\n                <label ' + _common.dataComponentId + '="html/span@oee">\u9009\u98791</label>\n             </div>\n            </div>',
    properties: [{
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: _inputs.TextInput
    }]
};

exports.default = checkbox;

},{"../../inputs/inputs":165,"../common":133}],99:[function(require,module,exports){
arguments[4][61][0].apply(exports,arguments)
},{"dup":61}],98:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"dup":60}],97:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"../../inputs/inputs":165,"dup":59}],96:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var button = {
    classes: ["btn", "btn-link", 'btn@oee'],
    name: "Button",
    image: "icons/button.svg",
    html: "<div class=\"bottom-searchButton draggable\">\n            <button type=\"button\" class=\"btn@oee\"><span class=\"glyphicon glyphicon-search\"></span>Search</button>\n          </div>",
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

},{"../../inputs/inputs":165}],95:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"dup":57}],94:[function(require,module,exports){
arguments[4][56][0].apply(exports,arguments)
},{"../../inputs/inputs":165,"dup":56}],93:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"../../inputs/inputs":165,"dup":55}],92:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"../../inputs/inputs":165,"dup":54}],63:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.textareainput = exports.tablerow = exports.tablehead = exports.tablecell = exports.tablebody = exports.table = exports.tableheadercell = exports.selectinput = exports.radiobutton = exports.progress = exports.pagination = exports.pageitem = exports.navbar = exports.listitem = exports.listgroup = exports.link = exports.jumbotron = exports.image = exports.hr = exports.heading = exports.gridrow = exports.gridcolumn = exports.form = exports.fileinput = exports.checkbox = exports.card = exports.buttontoolbar = exports.buttongroup = exports.breadcrumbs = exports.breadcrumbitem = exports.badge = exports.alert = exports.container = exports.div = exports.button = exports.textinput = exports.label = undefined;

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

},{"./alert":54,"./badge":55,"./breadcrumbitem":56,"./breadcrumbs":57,"./button":58,"./buttongroup":59,"./buttontoolbar":60,"./card":61,"./checkbox":62,"./container":64,"./div":65,"./fileinput":66,"./form":67,"./gridcolumn":68,"./gridrow":69,"./heading":70,"./hr":71,"./image":72,"./jumbotron":73,"./label":74,"./link":75,"./listgroup":76,"./listitem":77,"./navbar":78,"./pageitem":79,"./pagination":80,"./progress":81,"./radiobutton":82,"./selectinput":83,"./table":84,"./tablebody":85,"./tablecell":86,"./tablehead":87,"./tableheadercell":88,"./tablerow":89,"./textareainput":90,"./textinput":91}],91:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../../inputs/inputs');

var _inputTypes = require('../inputTypes');

var _common = require('../common');

var textinput = {
    name: "Text Input",
    attributes: { "type": _inputTypes.inputTypeNames },
    image: "icons/text_input.svg",
    html: '<div class="form-group" style="display: inline-block;"><label>Text</label><input ' + _common.dataComponentId + '="html/textinput@general" type="text" class="form-control"></div></div>',
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
    }, {
        name: 'type',
        key: 'type',
        htmlAttr: 'type',
        inputtype: _inputs.SelectInput,
        data: {
            options: _inputTypes.inputTypes
        }
    }]
};

exports.default = textinput;

},{"../../inputs/inputs":165,"../common":133,"../inputTypes":136}],136:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var inputTypes = [{
    value: 'text',
    text: 'text'
}, {
    value: 'password',
    text: 'password'
}, {
    value: 'number',
    text: 'number'
}, {
    value: 'submit',
    text: 'submit'
}, {
    value: "email",
    text: "email"
}, {
    value: 'url',
    text: 'url'
}, {
    value: 'tel',
    text: 'tel'
}, {
    value: 'search',
    text: 'search'
}, {
    value: 'datetime-local',
    text: 'datetime-local'
}, {
    value: 'datetime',
    text: 'datetime'
}, {
    value: 'date',
    text: 'date'
}, {
    value: 'time',
    text: 'time'
}, {
    value: 'week',
    text: 'week'
}, {
    value: 'month',
    text: 'month'
}, {
    value: 'range',
    text: 'range'
}, {
    value: 'color',
    text: 'color'
}];

var inputTypeNames = inputTypes.reduce(function (prev, cur) {
    prev.push(cur.value);
    return prev;
}, []);

exports.inputTypes = inputTypes;
exports.inputTypeNames = inputTypeNames;

},{}],90:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var textareainput = {
    name: "Text Area",
    image: "icons/text_area.svg",
    html: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>'
};

exports.default = textareainput;

},{}],89:[function(require,module,exports){
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

},{"../../inputs/inputs":165}],88:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var tableheadercell = {
    nodes: ["th"],
    name: "Table Header Cell",
    html: "<th>Head</th>"
};

exports.default = tableheadercell;

},{}],87:[function(require,module,exports){
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

},{"../../inputs/inputs":165}],86:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var tablecell = {
    nodes: ["td"],
    name: "Table Cell",
    html: "<td>Cell</td>"
};

exports.default = tablecell;

},{}],85:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var tablebody = {
    nodes: ["tbody"],
    name: "Table Body",
    html: "<tbody><tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr></tbody>"
};

exports.default = tablebody;

},{}],84:[function(require,module,exports){
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

},{"../../inputs/inputs":165}],83:[function(require,module,exports){
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
                        _builder2.default.Components.render("html/selectinput@general");
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
            _builder2.default.Components.render("html/selectinput@general");

            return node;
        }
    }]
};

exports.default = selectinput;

},{"../../builder":52,"../../inputs/inputs":165}],82:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../../inputs/inputs');

var _common = require('../common');

var radiobutton = {
    name: "Radio Button",
    attributes: { "type": "radio" },
    image: "icons/radio.svg",
    html: '<label ' + _common.dataComponentId + '="html/radiobutton@general" class="radio"><input type="radio"> Radio</label>',
    properties: [{
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: _inputs.TextInput
    }]
};

exports.default = radiobutton;

},{"../../inputs/inputs":165,"../common":133}],81:[function(require,module,exports){
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

},{"../../inputs/inputs":165,"../common":133}],80:[function(require,module,exports){
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

},{"../../inputs/inputs":165}],79:[function(require,module,exports){
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

},{"../../inputs/inputs":165}],78:[function(require,module,exports){
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

},{"../../inputs/inputs":165,"../common":133}],77:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var listitem = {
    name: "List Item",
    classes: ["list-group-item"],
    html: '<li class="list-group-item"><span class="badge">14</span> Cras justo odio</li>'
};

exports.default = listitem;

},{}],76:[function(require,module,exports){
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

},{}],75:[function(require,module,exports){
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

},{"../../inputs/inputs":165}],74:[function(require,module,exports){
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

},{"../../inputs/inputs":165}],73:[function(require,module,exports){
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

},{"../../builder":52,"../../inputs/inputs":165}],71:[function(require,module,exports){
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

},{"../../inputs/inputs":165,"../common":133}],69:[function(require,module,exports){
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

},{"../../inputs/inputs":165}],68:[function(require,module,exports){
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

},{"../../inputs/inputs":165}],67:[function(require,module,exports){
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

},{"../../inputs/inputs":165}],66:[function(require,module,exports){
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

},{"../../inputs/inputs":165,"../common":133}],64:[function(require,module,exports){
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

},{"../../inputs/inputs":165,"../common":133}],62:[function(require,module,exports){
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

},{"../../inputs/inputs":165}],61:[function(require,module,exports){
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

},{"../../inputs/inputs":165}],58:[function(require,module,exports){
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

},{"../../inputs/inputs":165}],57:[function(require,module,exports){
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

},{"../../inputs/inputs":165}],55:[function(require,module,exports){
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

},{"../../inputs/inputs":165}],54:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

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
        inputtype: _inputs.SelectInput,
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

},{"../../inputs/inputs":165}]},{},[53])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGNvbXBvbmVudHMtYm9vdHN0cmFwNC5qcyIsInNyY1xcY29tcG9uZW50c1xcdHlwb2dyYXBoeS5qcyIsInNyY1xcY29tcG9uZW50c1xcc2l6ZS5qcyIsInNyY1xcY29tcG9uZW50c1xccGFkZGluZy5qcyIsInNyY1xcY29tcG9uZW50c1xcbWFyZ2luLmpzIiwic3JjXFxjb21wb25lbnRzXFxlbGVtZW50LmpzIiwic3JjXFxjb21wb25lbnRzXFxkaXNwbGF5LmpzIiwic3JjXFxjb21wb25lbnRzXFxib3JkZXIuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGNvbXBvbmVudHMuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXHRleHRpbnB1dC5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcc3Bhbi5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcc2VsZWN0aW5wdXQuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXHJhZGlvYnV0dG9uLmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxsYWJlbGRpdi5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcY2hlY2tib3guanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGJ1dHRvbi5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGNvbXBvbmVudHMuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFx0ZXh0aW5wdXQuanMiLCJzcmNcXGNvbXBvbmVudHNcXGlucHV0VHlwZXMuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFx0ZXh0YXJlYWlucHV0LmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGFibGVyb3cuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFx0YWJsZWhlYWRlcmNlbGwuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFx0YWJsZWhlYWQuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFx0YWJsZWNlbGwuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFx0YWJsZWJvZHkuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFx0YWJsZS5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXHNlbGVjdGlucHV0LmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxccmFkaW9idXR0b24uanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxwcm9ncmVzcy5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXHBhZ2luYXRpb24uanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxwYWdlaXRlbS5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXG5hdmJhci5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGxpc3RpdGVtLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcbGlzdGdyb3VwLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcbGluay5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGxhYmVsLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcanVtYm90cm9uLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcaW1hZ2UuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxoci5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGhlYWRpbmcuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxncmlkcm93LmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcZ3JpZGNvbHVtbi5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGZvcm0uanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxmaWxlaW5wdXQuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxkaXYuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxjb250YWluZXIuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxjaGVja2JveC5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGNhcmQuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxidXR0b250b29sYmFyLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcYnV0dG9uZ3JvdXAuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxidXR0b24uanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxicmVhZGNydW1icy5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGJyZWFkY3J1bWJpdGVtLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcYmFkZ2UuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxhbGVydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7O0FBQ0E7O0lBQVksUTs7QUFDWjs7SUFBWSxJOztBQUNaOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLGtCQUFNLGVBQU4sQ0FBc0IsTUFBdEIsSUFDSSxDQUFDLG1CQUFELEVBQXNCLGlCQUF0QixFQUF5QyxvQkFBekMsRUFBK0Qsc0JBQS9ELEVBQXVGLG1CQUF2RixFQUNJLHNCQURKLEVBQzRCLGdCQUQ1QixDQURKOztBQUlBLGtCQUFNLGVBQU4sQ0FBc0IsTUFBdEIsSUFDSSxDQUFDLG9CQUFELEVBQXVCLGtCQUF2QixFQUEyQyxxQkFBM0MsRUFBa0UsMEJBQWxFLEVBQ0ksNEJBREosRUFDa0MsbUJBRGxDLEVBQ3VELHdCQUR2RCxFQUNpRiw0QkFEakYsRUFFSSwwQkFGSixFQUVnQyx3QkFGaEMsRUFFMEQsdUJBRjFELEVBRW1GLDBCQUZuRixFQUdJLG9CQUhKLEVBRzBCLHNCQUgxQixFQUdrRCxvQkFIbEQsRUFH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VSxPQUhEO0FBSVQscUJBQWEsQ0FBQyxlQUFELEVBQWtCLGlCQUFsQixFQUFxQyxlQUFyQyxFQUFzRCxjQUF0RCxFQUFzRSxlQUF0RSxFQUF1RixZQUF2RixFQUFxRyxhQUFyRyxFQUFvSCxZQUFwSCxDQUpKO0FBS1QsbUJBQVcsbUJBTEY7QUFNVCxjQUFNO0FBQ0YscUJBQVMsQ0FBQztBQUNOLHVCQUFPLGVBREQ7QUFFTixzQkFBTTtBQUZBLGFBQUQsRUFHTjtBQUNDLHVCQUFPLGlCQURSO0FBRUMsc0JBQU07QUFGUCxhQUhNLEVBTU47QUFDQyx1QkFBTyxlQURSO0FBRUMsc0JBQU07QUFGUCxhQU5NLEVBU047QUFDQyx1QkFBTyxjQURSO0FBRUMsc0JBQU07QUFGUCxhQVRNLEVBWU47QUFDQyx1QkFBTyxlQURSO0FBRUMsc0JBQU07QUFGUCxhQVpNLEVBZU47QUFDQyx1QkFBTyxZQURSO0FBRUMsc0JBQU07QUFGUCxhQWZNLEVBa0JOO0FBQ0MsdUJBQU8sYUFEUjtBQUVDLHNCQUFNO0FBRlAsYUFsQk0sRUFxQk47QUFDQyx1QkFBTyxZQURSO0FBRUMsc0JBQU07QUFGUCxhQXJCTTtBQURQO0FBTkcsS0FBRDtBQVZGLENBQWQ7O2tCQThDZSxLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBWdnZlYiBmcm9tICcuL2J1aWxkZXInO1xyXG5pbXBvcnQgKiBhcyBfZ2VuZXJhbCBmcm9tICcuL2NvbXBvbmVudHMvQGdlbmVyYWwvY29tcG9uZW50cyc7XHJcbmltcG9ydCAqIGFzIF9vZWUgZnJvbSAnLi9jb21wb25lbnRzL0BvZWUvY29tcG9uZW50cyc7XHJcbmltcG9ydCBlbGVtZW50IGZyb20gJy4vY29tcG9uZW50cy9lbGVtZW50JztcclxuaW1wb3J0IGJvcmRlciBmcm9tICcuL2NvbXBvbmVudHMvYm9yZGVyJztcclxuaW1wb3J0IHBhZGRpbmcgZnJvbSAnLi9jb21wb25lbnRzL3BhZGRpbmcnO1xyXG5pbXBvcnQgZGlzcGxheSBmcm9tICcuL2NvbXBvbmVudHMvZGlzcGxheSc7XHJcbmltcG9ydCB0eXBvZ3JhcGh5IGZyb20gJy4vY29tcG9uZW50cy90eXBvZ3JhcGh5JztcclxuaW1wb3J0IHNpemUgZnJvbSAnLi9jb21wb25lbnRzL3NpemUnO1xyXG5pbXBvcnQgbWFyZ2luIGZyb20gJy4vY29tcG9uZW50cy9tYXJnaW4nO1xyXG5cclxuVnZ2ZWIuQ29tcG9uZW50c0dyb3VwWyflrprliLbnu4Tku7YnXSA9XHJcbiAgICBbJ2h0bWwvbGFiZWxkaXZAb2VlJywgJ2h0bWwvYnV0dG9uQG9lZScsICdodG1sL3RleHRpbnB1dEBvZWUnLCAnaHRtbC9yYWRpb2J1dHRvbkBvZWUnLCAnaHRtbC9jaGVja2JveEBvZWUnLFxyXG4gICAgICAgICdodG1sL3NlbGVjdGlucHV0QG9lZScsICdodG1sL3RhYmxlQG9lZSddO1xyXG5cclxuVnZ2ZWIuQ29tcG9uZW50c0dyb3VwWyfpgJrnlKjnu4Tku7YnXSA9XHJcbiAgICBbJ2h0bWwvbGFiZWxAZ2VuZXJhbCcsICdodG1sL2RpdkBnZW5lcmFsJywgJ2h0bWwvYnV0dG9uQGdlbmVyYWwnLCAnaHRtbC9idXR0b25ncm91cEBnZW5lcmFsJyxcclxuICAgICAgICAnaHRtbC9idXR0b250b29sYmFyQGdlbmVyYWwnLCAnaHRtbC9mb3JtQGdlbmVyYWwnLCAnaHRtbC90ZXh0aW5wdXRAZ2VuZXJhbCcsICdodG1sL3RleHRhcmVhaW5wdXRAZ2VuZXJhbCcsXHJcbiAgICAgICAgJ2h0bWwvc2VsZWN0aW5wdXRAZ2VuZXJhbCcsICdodG1sL2ZpbGVpbnB1dEBnZW5lcmFsJywgJ2h0bWwvY2hlY2tib3hAZ2VuZXJhbCcsICdodG1sL3JhZGlvYnV0dG9uQGdlbmVyYWwnLFxyXG4gICAgICAgICdodG1sL3RhYmxlQGdlbmVyYWwnLCAnaHRtbC9oZWFkaW5nQGdlbmVyYWwnLCAnaHRtbC9pbWFnZUBnZW5lcmFsJywgJ2h0bWwvanVtYm90cm9uQGdlbmVyYWwnLFxyXG4gICAgICAgICdodG1sL2FsZXJ0QGdlbmVyYWwnLCAnaHRtbC9jYXJkQGdlbmVyYWwnLCAnaHRtbC9saXN0Z3JvdXBAZ2VuZXJhbCcsICdodG1sL2hyQGdlbmVyYWwnLCAnaHRtbC90YWdsYWJlbEBnZW5lcmFsJyxcclxuICAgICAgICAnaHRtbC9iYWRnZUBnZW5lcmFsJywgJ2h0bWwvcHJvZ3Jlc3NAZ2VuZXJhbCcsICdodG1sL25hdmJhckBnZW5lcmFsJywgJ2h0bWwvYnJlYWRjcnVtYnNAZ2VuZXJhbCcsICdodG1sL3BhZ2luYXRpb25AZ2VuZXJhbCcsXHJcbiAgICAgICAgJ2h0bWwvY29udGFpbmVyQGdlbmVyYWwnLCAnaHRtbC9ncmlkcm93QGdlbmVyYWwnXTtcclxuXHJcblZ2dmViLkNvbXBvbmVudHMuYWRkKFwiX2Jhc2VcIiwgZWxlbWVudCk7XHJcbi8vZGlzcGxheVxyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiX2Jhc2VcIiwgZGlzcGxheSk7XHJcbi8vVHlwb2dyYXBoeVxyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiX2Jhc2VcIiwgdHlwb2dyYXBoeSlcclxuLy9TaXplXHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJfYmFzZVwiLCBzaXplKTtcclxuLy9NYXJnaW5cclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcIl9iYXNlXCIsIG1hcmdpbik7XHJcbi8vUGFkZGluZ1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiX2Jhc2VcIiwgcGFkZGluZyk7XHJcbi8vQm9yZGVyXHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJfYmFzZVwiLCBib3JkZXIpO1xyXG5cclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvZGl2QGdlbmVyYWxcIiwgX2dlbmVyYWwuZGl2KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvbGFiZWxAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5sYWJlbCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2J1dHRvbkBnZW5lcmFsXCIsIF9nZW5lcmFsLmJ1dHRvbik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2NvbnRhaW5lckBnZW5lcmFsXCIsIF9nZW5lcmFsLmNvbnRhaW5lcik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2hlYWRpbmdAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5oZWFkaW5nKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvbGlua0BnZW5lcmFsXCIsIF9nZW5lcmFsLmxpbmspO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9pbWFnZUBnZW5lcmFsXCIsIF9nZW5lcmFsLmltYWdlKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5hZGQoXCJodG1sL2hyQGdlbmVyYWxcIiwgX2dlbmVyYWwuaHIpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9idXR0b25ncm91cEBnZW5lcmFsXCIsIF9nZW5lcmFsLmJ1dHRvbmdyb3VwKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvYnV0dG9udG9vbGJhckBnZW5lcmFsXCIsIF9nZW5lcmFsLmJ1dHRvbnRvb2xiYXIpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9hbGVydEBnZW5lcmFsXCIsIF9nZW5lcmFsLmFsZXJ0KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvYmFkZ2VAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5iYWRnZSk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2NhcmRAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5jYXJkKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvbGlzdGdyb3VwQGdlbmVyYWxcIiwgX2dlbmVyYWwubGlzdGdyb3VwKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvbGlzdGl0ZW1AZ2VuZXJhbFwiLCBfZ2VuZXJhbC5saXN0aXRlbSk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2JyZWFkY3J1bWJzQGdlbmVyYWxcIiwgX2dlbmVyYWwuYnJlYWRjcnVtYnMpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9icmVhZGNydW1iaXRlbUBnZW5lcmFsXCIsIF9nZW5lcmFsLmJyZWFkY3J1bWJpdGVtKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvcGFnaW5hdGlvbkBnZW5lcmFsXCIsIF9nZW5lcmFsLnBhZ2luYXRpb24pO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9wYWdlaXRlbUBnZW5lcmFsXCIsIF9nZW5lcmFsLnBhZ2VpdGVtKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvcHJvZ3Jlc3NAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5wcm9ncmVzcyk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2p1bWJvdHJvbkBnZW5lcmFsXCIsIF9nZW5lcmFsLmp1bWJvdHJvbik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL25hdmJhckBnZW5lcmFsXCIsIF9nZW5lcmFsLm5hdmJhcik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2Zvcm1AZ2VuZXJhbFwiLCBfZ2VuZXJhbC5mb3JtKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvdGV4dGlucHV0QGdlbmVyYWxcIiwgX2dlbmVyYWwudGV4dGlucHV0KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvc2VsZWN0aW5wdXRAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5zZWxlY3RpbnB1dCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL3RleHRhcmVhaW5wdXRAZ2VuZXJhbFwiLCBfZ2VuZXJhbC50ZXh0YXJlYWlucHV0KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvcmFkaW9idXR0b25AZ2VuZXJhbFwiLCBfZ2VuZXJhbC5yYWRpb2J1dHRvbik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2NoZWNrYm94QGdlbmVyYWxcIiwgX2dlbmVyYWwuY2hlY2tib3gpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9maWxlaW5wdXRAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5maWxlaW5wdXQpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC90YWJsZUBnZW5lcmFsXCIsIF9nZW5lcmFsLnRhYmxlKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvdGFibGVyb3dAZ2VuZXJhbFwiLCBfZ2VuZXJhbC50YWJsZXJvdyk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL3RhYmxlY2VsbEBnZW5lcmFsXCIsIF9nZW5lcmFsLnRhYmxlY2VsbCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL3RhYmxlaGVhZGVyY2VsbEBnZW5lcmFsXCIsIF9nZW5lcmFsLnRhYmxlaGVhZGVyY2VsbCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL3RhYmxlaGVhZEBnZW5lcmFsXCIsIF9nZW5lcmFsLnRhYmxlaGVhZCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL3RhYmxlYm9keUBnZW5lcmFsXCIsIF9nZW5lcmFsLnRhYmxlYm9keSk7XHJcblZ2dmViLkNvbXBvbmVudHMuYWRkKFwiaHRtbC9ncmlkY29sdW1uQGdlbmVyYWxcIiwgX2dlbmVyYWwuZ3JpZGNvbHVtbik7XHJcblZ2dmViLkNvbXBvbmVudHMuYWRkKFwiaHRtbC9ncmlkcm93QGdlbmVyYWxcIiwgX2dlbmVyYWwuZ3JpZHJvdyk7XHJcblxyXG5WdnZlYi5Db21wb25lbnRzLmFkZCgnaHRtbC9sYWJlbGRpdkBvZWUnLCBfb2VlLmxhYmVsZGl2KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgJ2h0bWwvdGV4dGlucHV0QG9lZScsIF9vZWUudGV4dGlucHV0KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgJ2h0bWwvYnV0dG9uQG9lZScsIF9vZWUuYnV0dG9uKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgJ2h0bWwvcmFkaW9idXR0b25Ab2VlJywgX29lZS5yYWRpb2J1dHRvbik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKCdfYmFzZScsICdodG1sL3NwYW5Ab2VlJywgX29lZS5zcGFuKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgJ2h0bWwvY2hlY2tib3hAb2VlJywgX29lZS5jaGVja2JveCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKCdfYmFzZScsICdodG1sL3NlbGVjdGlucHV0QG9lZScsIF9vZWUuc2VsZWN0aW5wdXQpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZCgnX2Jhc2UnLCAnaHRtbC90YWJsZUBvZWUnLCBfb2VlLnRhYmxlKTtcclxuIiwiaW1wb3J0IHsgU2VjdGlvbklucHV0LCBTZWxlY3RJbnB1dCwgUmFkaW9CdXR0b25JbnB1dCwgQ3NzVW5pdElucHV0LCBDb2xvcklucHV0IH0gZnJvbSAnLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGluY19iYXNlX3NvcnQgfSBmcm9tICcuL2NvbW1vbic7XHJcblxyXG5jb25zdCB0eXBvZ3JhcGh5ID0ge1xyXG4gICAgcHJvcGVydGllczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAga2V5OiBcInR5cG9ncmFwaHlfaGVhZGVyXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VjdGlvbklucHV0LFxyXG4gICAgICAgICAgICBuYW1lOiBmYWxzZSxcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBkYXRhOiB7IGhlYWRlcjogXCJUeXBvZ3JhcGh5XCIgfSxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiRm9udCBmYW1pbHlcIixcclxuICAgICAgICAgICAga2V5OiBcImZvbnQtZmFtaWx5XCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiA2LFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJBcmlhbFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdMdWNpZGEgU2FucyBVbmljb2RlXCIsIFwiTHVjaWRhIEdyYW5kZVwiLCBzYW5zLXNlcmlmJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnTHVjaWRhIEdyYW5kZSdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1BhbGF0aW5vIExpbm90eXBlXCIsIFwiQm9vayBBbnRpcXVhXCIsIFBhbGF0aW5vLCBzZXJpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1BhbGF0aW5vIExpbm90eXBlJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnXCJUaW1lcyBOZXcgUm9tYW5cIiwgVGltZXMsIHNlcmlmJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnVGltZXMgTmV3IFJvbWFuJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkdlb3JnaWEsIHNlcmlmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJHZW9yZ2lhLCBzZXJpZlwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiVGFob21hLCBHZW5ldmEsIHNhbnMtc2VyaWZcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlRhaG9tYVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdDb21pYyBTYW5zIE1TLCBjdXJzaXZlLCBzYW5zLXNlcmlmJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQ29taWMgU2FucydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1ZlcmRhbmEsIEdlbmV2YSwgc2Fucy1zZXJpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1ZlcmRhbmEnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdJbXBhY3QsIENoYXJjb2FsLCBzYW5zLXNlcmlmJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnSW1wYWN0J1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnQXJpYWwgQmxhY2ssIEdhZGdldCwgc2Fucy1zZXJpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0FyaWFsIEJsYWNrJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnVHJlYnVjaGV0IE1TLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdUcmVidWNoZXQnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdDb3VyaWVyIE5ld1wiLCBDb3VyaWVyLCBtb25vc3BhY2UnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdDb3VyaWVyIE5ld1wiLCBDb3VyaWVyLCBtb25vc3BhY2UnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdCcnVzaCBTY3JpcHQgTVQsIHNhbnMtc2VyaWYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdCcnVzaCBTY3JpcHQnXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkZvbnQgd2VpZ2h0XCIsXHJcbiAgICAgICAgICAgIGtleTogXCJmb250LXdlaWdodFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiMTAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJUaGluXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCIyMDBcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkV4dHJhLUxpZ2h0XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCIzMDBcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpZ2h0XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI0MDBcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIk5vcm1hbFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiNTAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJNZWRpdW1cIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjYwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiU2VtaS1Cb2xkXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI3MDBcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkJvbGRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjgwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRXh0cmEtQm9sZFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiOTAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJVbHRyYS1Cb2xkXCJcclxuICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlRleHQgYWxpZ25cIixcclxuICAgICAgICAgICAga2V5OiBcInRleHQtYWxpZ25cIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDEyLFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogUmFkaW9CdXR0b25JbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgZXh0cmFjbGFzczogXCJidG4tZ3JvdXAtc20gYnRuLWdyb3VwLWZ1bGx3aWR0aFwiLFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJub25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJsYSBsYS1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJOb25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwibGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJMZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtYWxpZ24tbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJDZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJDZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWFsaWduLWNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0OiBcIlJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUmlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWFsaWduLXJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwianVzdGlmeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJqdXN0aWZ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiSnVzdGlmeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtYWxpZ24tanVzdGlmeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkxpbmUgaGVpZ2h0XCIsXHJcbiAgICAgICAgICAgIGtleTogXCJsaW5lLWhlaWdodFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJMZXR0ZXIgc3BhY2luZ1wiLFxyXG4gICAgICAgICAgICBrZXk6IFwibGV0dGVyLXNwYWNpbmdcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiVGV4dCBkZWNvcmF0aW9uXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJ0ZXh0LWRlY29yYXRpb24tbGluZVwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogMTIsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBSYWRpb0J1dHRvbklucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBleHRyYWNsYXNzOiBcImJ0bi1ncm91cC1zbSBidG4tZ3JvdXAtZnVsbHdpZHRoXCIsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0OiBcIk5vbmVcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJOb25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ1bmRlcmxpbmVcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwiTGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcInVuZGVybGluZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtbG9uZy1hcnJvdy1kb3duXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwib3ZlcmxpbmVcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwiUmlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJvdmVybGluZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtbG9uZy1hcnJvdy11cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImxpbmUtdGhyb3VnaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJSaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkxpbmUgVGhyb3VnaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtc3RyaWtldGhyb3VnaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInVuZGVybGluZSBvdmVybGluZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJqdXN0aWZ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVW5kZXJsaW5lIE92ZXJsaW5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJsYSBsYS1hcnJvd3MtdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkRlY29yYXRpb24gQ29sb3JcIixcclxuICAgICAgICAgICAga2V5OiBcInRleHQtZGVjb3JhdGlvbi1jb2xvclwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENvbG9ySW5wdXQsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkRlY29yYXRpb24gc3R5bGVcIixcclxuICAgICAgICAgICAga2V5OiBcInRleHQtZGVjb3JhdGlvbi1zdHlsZVwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwic29saWRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlNvbGlkXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ3YXZ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJXYXZ5XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJkb3R0ZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkRvdHRlZFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiZGFzaGVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEYXNoZWRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImRvdWJsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRG91YmxlXCJcclxuICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHR5cG9ncmFwaHk7IiwiaW1wb3J0IHsgU2VjdGlvbklucHV0LCBDc3NVbml0SW5wdXQgfSBmcm9tICcuLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgaW5jX2Jhc2Vfc29ydCB9IGZyb20gJy4vY29tbW9uJztcclxuXHJcbmNvbnN0IHNpemUgPSB7XHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIGtleTogXCJzaXplX2hlYWRlclwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VjdGlvbklucHV0LFxyXG4gICAgICAgIG5hbWU6IGZhbHNlLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBkYXRhOiB7IGhlYWRlcjogXCJTaXplXCIsIGV4cGFuZGVkOiBmYWxzZSB9LFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiV2lkdGhcIixcclxuICAgICAgICBrZXk6IFwid2lkdGhcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJIZWlnaHRcIixcclxuICAgICAgICBrZXk6IFwiaGVpZ2h0XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiTWluIFdpZHRoXCIsXHJcbiAgICAgICAga2V5OiBcIm1pbi13aWR0aFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIk1pbiBIZWlnaHRcIixcclxuICAgICAgICBrZXk6IFwibWluLWhlaWdodFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIk1heCBXaWR0aFwiLFxyXG4gICAgICAgIGtleTogXCJtYXgtd2lkdGhcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJNYXggSGVpZ2h0XCIsXHJcbiAgICAgICAga2V5OiBcIm1heC1oZWlnaHRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2l6ZTsiLCJpbXBvcnQgeyBTZWN0aW9uSW5wdXQsIENzc1VuaXRJbnB1dCB9IGZyb20gJy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBpbmNfYmFzZV9zb3J0IH0gZnJvbSAnLi9jb21tb24nO1xyXG5cclxuY29uc3QgcGFkZGluZyA9IHtcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAga2V5OiBcInBhZGRpbmdzX2hlYWRlclwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VjdGlvbklucHV0LFxyXG4gICAgICAgIG5hbWU6IGZhbHNlLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBkYXRhOiB7IGhlYWRlcjogXCJQYWRkaW5nXCIsIGV4cGFuZGVkOiBmYWxzZSB9LFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiVG9wXCIsXHJcbiAgICAgICAga2V5OiBcInBhZGRpbmctdG9wXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiUmlnaHRcIixcclxuICAgICAgICBrZXk6IFwicGFkZGluZy1yaWdodFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkJvdHRvbVwiLFxyXG4gICAgICAgIGtleTogXCJwYWRkaW5nLWJvdHRvbVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkxlZnRcIixcclxuICAgICAgICBrZXk6IFwicGFkZGluZy1MZWZ0XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBhZGRpbmc7IiwiaW1wb3J0IHsgU2VjdGlvbklucHV0LCBDc3NVbml0SW5wdXQgfSBmcm9tICcuLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgaW5jX2Jhc2Vfc29ydCB9IGZyb20gJy4vY29tbW9uJztcclxuXHJcbmNvbnN0IG1hcmdpbiA9IHtcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAga2V5OiBcIm1hcmdpbnNfaGVhZGVyXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWN0aW9uSW5wdXQsXHJcbiAgICAgICAgbmFtZTogZmFsc2UsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGRhdGE6IHsgaGVhZGVyOiBcIk1hcmdpblwiLCBleHBhbmRlZDogZmFsc2UgfSxcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlRvcFwiLFxyXG4gICAgICAgIGtleTogXCJtYXJnaW4tdG9wXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiUmlnaHRcIixcclxuICAgICAgICBrZXk6IFwibWFyZ2luLXJpZ2h0XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiQm90dG9tXCIsXHJcbiAgICAgICAga2V5OiBcIm1hcmdpbi1ib3R0b21cIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJMZWZ0XCIsXHJcbiAgICAgICAga2V5OiBcIm1hcmdpbi1MZWZ0XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1hcmdpbjsiLCJpbXBvcnQgeyBTZWN0aW9uSW5wdXQsIFRleHRJbnB1dCB9IGZyb20gJy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBpbmNfYmFzZV9zb3J0IH0gZnJvbSAnLi9jb21tb24nO1xyXG5cclxuY29uc3QgZWxlbWVudCA9IHtcclxuICAgIG5hbWU6IFwiRWxlbWVudFwiLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBrZXk6IFwiZWxlbWVudF9oZWFkZXJcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlY3Rpb25JbnB1dCxcclxuICAgICAgICBuYW1lOiBmYWxzZSxcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgZGF0YTogeyBoZWFkZXI6IFwiR2VuZXJhbFwiIH0sXHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJJZFwiLFxyXG4gICAgICAgIGtleTogXCJpZFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImlkXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkNsYXNzXCIsXHJcbiAgICAgICAga2V5OiBcImNsYXNzXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfVxyXG4gICAgXVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZWxlbWVudDsiLCJpbXBvcnQgeyBpbmNfYmFzZV9zb3J0IH0gZnJvbSAnLi9jb21tb24nO1xyXG5pbXBvcnQgeyBTZWN0aW9uSW5wdXQsIFNlbGVjdElucHV0LCBSYWRpb0J1dHRvbklucHV0LCBDc3NVbml0SW5wdXQsIENvbG9ySW5wdXQsIFJhbmdlSW5wdXQgfSBmcm9tICcuLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGRpc3BsYXkgID0ge1xyXG4gICAgcHJvcGVydGllczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAga2V5OiBcImRpc3BsYXlfaGVhZGVyXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VjdGlvbklucHV0LFxyXG4gICAgICAgICAgICBuYW1lOiBmYWxzZSxcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBkYXRhOiB7IGhlYWRlcjogXCJEaXNwbGF5XCIgfSxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiRGlzcGxheVwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiZGlzcGxheVwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1wiYmxvY2tcIiwgXCJpbmxpbmVcIiwgXCJpbmxpbmUtYmxvY2tcIiwgXCJub25lXCJdLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImJsb2NrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJCbG9ja1wiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiaW5saW5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJJbmxpbmVcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImlubGluZS1ibG9ja1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5saW5lIEJsb2NrXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJub25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJub25lXCJcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiUG9zaXRpb25cIixcclxuICAgICAgICAgICAga2V5OiBcInBvc2l0aW9uXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiA2LFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJzdGF0aWNcIiwgXCJmaXhlZFwiLCBcInJlbGF0aXZlXCIsIFwiYWJzb2x1dGVcIl0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwic3RhdGljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJTdGF0aWNcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImZpeGVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJGaXhlZFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVsYXRpdmVcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlJlbGF0aXZlXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJhYnNvbHV0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQWJzb2x1dGVcIlxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJUb3BcIixcclxuICAgICAgICAgICAga2V5OiBcInRvcFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IFwiXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkxlZnRcIixcclxuICAgICAgICAgICAga2V5OiBcImxlZnRcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgcGFyZW50OiBcIlwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJCb3R0b21cIixcclxuICAgICAgICAgICAga2V5OiBcImJvdHRvbVwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IFwiXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlJpZ2h0XCIsXHJcbiAgICAgICAgICAgIGtleTogXCJyaWdodFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IFwiXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkZsb2F0XCIsXHJcbiAgICAgICAgICAgIGtleTogXCJmbG9hdFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogMTIsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBSYWRpb0J1dHRvbklucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBleHRyYWNsYXNzOiBcImJ0bi1ncm91cC1zbSBidG4tZ3JvdXAtZnVsbHdpZHRoXCIsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0OiBcIk5vbmVcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJOb25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJsZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0OiBcIkxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJMZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJsYSBsYS1hbGlnbi1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwiUmlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJSaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtYWxpZ24tcmlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIk9wYWNpdHlcIixcclxuICAgICAgICAgICAga2V5OiBcIm9wYWNpdHlcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDEyLFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIHBhcmVudDogXCJcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBSYW5nZUlucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBtYXg6IDEsIC8vbWF4IHpvb20gbGV2ZWxcclxuICAgICAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgICAgIHN0ZXA6IDAuMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJCYWNrZ3JvdW5kIENvbG9yXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJiYWNrZ3JvdW5kLWNvbG9yXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiA2LFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ29sb3JJbnB1dCxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiVGV4dCBDb2xvclwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiY29sb3JcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDb2xvcklucHV0LFxyXG4gICAgICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkaXNwbGF5OyIsImltcG9ydCB7IFNlY3Rpb25JbnB1dCwgU2VsZWN0SW5wdXQsIENzc1VuaXRJbnB1dCwgQ29sb3JJbnB1dCB9IGZyb20gJy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBpbmNfYmFzZV9zb3J0IH0gZnJvbSAnLi9jb21tb24nO1xyXG5cclxuY29uc3QgYm9yZGVyID0ge1xyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBrZXk6IFwiYm9yZGVyX2hlYWRlclwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VjdGlvbklucHV0LFxyXG4gICAgICAgIG5hbWU6IGZhbHNlLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBkYXRhOiB7IGhlYWRlcjogXCJCb3JkZXJcIiwgZXhwYW5kZWQ6IGZhbHNlIH0sXHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJTdHlsZVwiLFxyXG4gICAgICAgIGtleTogXCJib3JkZXItc3R5bGVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDEyLFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwic29saWRcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU29saWRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJkb3R0ZWRcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRG90dGVkXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiZGFzaGVkXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhc2hlZFwiXHJcbiAgICAgICAgICAgIH1dLFxyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIldpZHRoXCIsXHJcbiAgICAgICAga2V5OiBcImJvcmRlci13aWR0aFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkNvbG9yXCIsXHJcbiAgICAgICAga2V5OiBcImJvcmRlci1jb2xvclwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDb2xvcklucHV0LFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJvcmRlcjsiLCJpbXBvcnQgbGFiZWwgZnJvbSAnLi9sYWJlbCc7XHJcbmltcG9ydCB0ZXh0aW5wdXQgZnJvbSAnLi90ZXh0aW5wdXQnO1xyXG5pbXBvcnQgYnV0dG9uIGZyb20gJy4vYnV0dG9uJztcclxuaW1wb3J0IGRpdiBmcm9tICcuL2Rpdic7XHJcbmltcG9ydCBjb250YWluZXIgZnJvbSAnLi9jb250YWluZXInO1xyXG5pbXBvcnQgYWxlcnQgZnJvbSAnLi9hbGVydCc7XHJcbmltcG9ydCBiYWRnZSBmcm9tICcuL2JhZGdlJztcclxuaW1wb3J0IGJyZWFkY3J1bWJpdGVtIGZyb20gJy4vYnJlYWRjcnVtYml0ZW0nO1xyXG5pbXBvcnQgYnJlYWRjcnVtYnMgZnJvbSAnLi9icmVhZGNydW1icyc7XHJcbmltcG9ydCBidXR0b25ncm91cCBmcm9tICcuL2J1dHRvbmdyb3VwJztcclxuaW1wb3J0IGJ1dHRvbnRvb2xiYXIgZnJvbSAnLi9idXR0b250b29sYmFyJztcclxuaW1wb3J0IGNhcmQgZnJvbSAnLi9jYXJkJztcclxuaW1wb3J0IGNoZWNrYm94IGZyb20gJy4vY2hlY2tib3gnO1xyXG5pbXBvcnQgZmlsZWlucHV0IGZyb20gJy4vZmlsZWlucHV0JztcclxuaW1wb3J0IGZvcm0gZnJvbSAnLi9mb3JtJztcclxuaW1wb3J0IGdyaWRjb2x1bW4gZnJvbSAnLi9ncmlkY29sdW1uJztcclxuaW1wb3J0IGdyaWRyb3cgZnJvbSAnLi9ncmlkcm93JztcclxuaW1wb3J0IGhlYWRpbmcgZnJvbSAnLi9oZWFkaW5nJztcclxuaW1wb3J0IGhyIGZyb20gJy4vaHInO1xyXG5pbXBvcnQgaW1hZ2UgZnJvbSAnLi9pbWFnZSc7XHJcbmltcG9ydCBqdW1ib3Ryb24gZnJvbSAnLi9qdW1ib3Ryb24nO1xyXG5pbXBvcnQgbGluayBmcm9tICcuL2xpbmsnO1xyXG5pbXBvcnQgbGlzdGdyb3VwIGZyb20gJy4vbGlzdGdyb3VwJztcclxuaW1wb3J0IGxpc3RpdGVtIGZyb20gJy4vbGlzdGl0ZW0nO1xyXG5pbXBvcnQgbmF2YmFyIGZyb20gJy4vbmF2YmFyJztcclxuaW1wb3J0IHBhZ2VpdGVtIGZyb20gJy4vcGFnZWl0ZW0nO1xyXG5pbXBvcnQgcGFnaW5hdGlvbiBmcm9tICcuL3BhZ2luYXRpb24nO1xyXG5pbXBvcnQgcHJvZ3Jlc3MgZnJvbSAnLi9wcm9ncmVzcyc7XHJcbmltcG9ydCByYWRpb2J1dHRvbiBmcm9tICcuL3JhZGlvYnV0dG9uJztcclxuaW1wb3J0IHNlbGVjdGlucHV0IGZyb20gJy4vc2VsZWN0aW5wdXQnO1xyXG5pbXBvcnQgdGFibGVoZWFkZXJjZWxsIGZyb20gJy4vdGFibGVoZWFkZXJjZWxsJztcclxuaW1wb3J0IHRhYmxlIGZyb20gJy4vdGFibGUnO1xyXG5pbXBvcnQgdGFibGVib2R5IGZyb20gJy4vdGFibGVib2R5JztcclxuaW1wb3J0IHRhYmxlY2VsbCBmcm9tICcuL3RhYmxlY2VsbCc7XHJcbmltcG9ydCB0YWJsZWhlYWQgZnJvbSAnLi90YWJsZWhlYWQnO1xyXG5pbXBvcnQgdGFibGVyb3cgZnJvbSAnLi90YWJsZXJvdyc7XHJcbmltcG9ydCB0ZXh0YXJlYWlucHV0IGZyb20gJy4vdGV4dGFyZWFpbnB1dCc7XHJcbmltcG9ydCBsYWJlbGRpdiBmcm9tICcuL2xhYmVsZGl2JztcclxuaW1wb3J0IHNwYW4gZnJvbSAnLi9zcGFuJztcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBsYWJlbCwgdGV4dGlucHV0LCBidXR0b24sIGRpdiwgY29udGFpbmVyLCBhbGVydCwgYmFkZ2UsIGJyZWFkY3J1bWJpdGVtLCBicmVhZGNydW1icywgYnV0dG9uZ3JvdXAsXHJcbiAgICBidXR0b250b29sYmFyLCBjYXJkLCBjaGVja2JveCwgZmlsZWlucHV0LCBmb3JtLCBncmlkY29sdW1uLCBncmlkcm93LCBoZWFkaW5nLCBociwgaW1hZ2UsIGp1bWJvdHJvbixcclxuICAgIGxpbmssIGxpc3Rncm91cCwgbGlzdGl0ZW0sIG5hdmJhciwgcGFnZWl0ZW0sIHBhZ2luYXRpb24sIHByb2dyZXNzLCByYWRpb2J1dHRvbiwgc2VsZWN0aW5wdXQsIHRhYmxlaGVhZGVyY2VsbCxcclxuICAgIHRhYmxlLCB0YWJsZWJvZHksIHRhYmxlY2VsbCwgdGFibGVoZWFkLCB0YWJsZXJvdywgdGV4dGFyZWFpbnB1dCwgbGFiZWxkaXYsIHNwYW5cclxufTsiLCJpbXBvcnQgeyBUZXh0SW5wdXQsIFNlbGVjdElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGlucHV0VHlwZXMsIGlucHV0VHlwZU5hbWVzIH0gZnJvbSAnLi4vaW5wdXRUeXBlcyc7XHJcbmltcG9ydCB7IGRhdGFDb21wb25lbnRJZCB9IGZyb20gJy4uL2NvbW1vbic7XHJcblxyXG5jb25zdCB0ZXh0aW5wdXQgPSB7XHJcbiAgICBuYW1lOiBcIlRleHQgSW5wdXRcIixcclxuICAgIGF0dHJpYnV0ZXM6IHsgXCJ0eXBlXCI6IGlucHV0VHlwZU5hbWVzIH0sXHJcbiAgICBpbWFnZTogXCJpY29ucy90ZXh0X2lucHV0LnN2Z1wiLFxyXG4gICAgaHRtbDogYDxkaXYgY2xhc3M9XCJldmVyeU91dGJveC1yaWdodCBkcmFnZ2FibGVcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhaWx5Qm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0ICR7ZGF0YUNvbXBvbmVudElkfT1cImh0bWwvdGV4dGlucHV0QG9lZVwiIGx1c3R5bGU9XCJoZWlnaHQ6IDIuOHJlbTt3aWR0aDoxM3JlbSBcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sIFdkYXRlXCIvPlxyXG4gICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICA8L2Rpdj5gLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIlZhbHVlXCIsXHJcbiAgICAgICAga2V5OiBcInZhbHVlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwidmFsdWVcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiUGxhY2Vob2xkZXJcIixcclxuICAgICAgICBrZXk6IFwicGxhY2Vob2xkZXJcIixcclxuICAgICAgICBodG1sQXR0cjogXCJwbGFjZWhvbGRlclwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ05hbWUnLFxyXG4gICAgICAgIGtleTogJ25hbWUnLFxyXG4gICAgICAgIGh0bWxBdHRyOiAnbmFtZScsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAndHlwZScsXHJcbiAgICAgICAga2V5OiAndHlwZScsXHJcbiAgICAgICAgaHRtbEF0dHI6ICd0eXBlJyxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogaW5wdXRUeXBlc1xyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0ZXh0aW5wdXQ7IiwiaW1wb3J0IHsgVGV4dElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBzcGFuID0ge1xyXG4gICAgbmFtZTogXCJTcGFuXCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy90ZXh0X2lucHV0LnN2Z1wiLFxyXG4gICAgaHRtbDogYGAsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiRm9yIGlkXCIsXHJcbiAgICAgICAga2V5OiBcImZvclwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImZvclwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1RleHQnLFxyXG4gICAgICAgIGtleTogJ3RleHQnLFxyXG4gICAgICAgIGh0bWxBdHRyOiAndGV4dCcsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzcGFuOyIsImltcG9ydCBWdnZlYiBmcm9tICcuLi8uLi9idWlsZGVyJztcclxuaW1wb3J0IHsgVGV4dFZhbHVlSW5wdXQsIEJ1dHRvbklucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBzZWxlY3RpbnB1dCA9IHtcclxuICAgIG5vZGVzOiBbXCJzZWxlY3RcIl0sXHJcbiAgICBuYW1lOiBcIlNlbGVjdCBJbnB1dFwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvc2VsZWN0X2lucHV0LnN2Z1wiLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGRyYWdnYWJsZVwiIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiPjxsYWJlbD5DaG9vc2UgYW4gb3B0aW9uIDwvbGFiZWw+PHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiPjxvcHRpb24gdmFsdWU9XCJ2YWx1ZTFcIj5UZXh0IDE8L29wdGlvbj48b3B0aW9uIHZhbHVlPVwidmFsdWUyXCI+VGV4dCAyPC9vcHRpb24+PG9wdGlvbiB2YWx1ZT1cInZhbHVlM1wiPlRleHQgMzwvb3B0aW9uPjwvc2VsZWN0PjwvZGl2PicsXHJcblxyXG4gICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICBwcm9wZXJ0aWVzID0gW107XHJcbiAgICAgICAgdmFyIGkgPSAwO1xyXG5cclxuICAgICAgICAkKG5vZGUpLmZpbmQoJ29wdGlvbicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgZGF0YSA9IHsgXCJ2YWx1ZVwiOiB0aGlzLnZhbHVlLCBcInRleHRcIjogdGhpcy50ZXh0IH07XHJcblxyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIk9wdGlvbiBcIiArIGksXHJcbiAgICAgICAgICAgICAgICBrZXk6IFwib3B0aW9uXCIgKyBpLFxyXG4gICAgICAgICAgICAgICAgLy9pbmRleDogaSAtIDEsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25Ob2RlOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgaW5wdXR0eXBlOiBUZXh0VmFsdWVJbnB1dCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKG5vZGUsIHZhbHVlLCBpbnB1dCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24gPSAkKHRoaXMub3B0aW9uTm9kZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgcmVtb3ZlIGJ1dHRvbiBpcyBjbGlja2VkIHJlbW92ZSBvcHRpb24gYW5kIHJlbmRlciByb3cgcHJvcGVydGllc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5ub2RlTmFtZSA9PSAnQlVUVE9OJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZ2dmViLkNvbXBvbmVudHMucmVuZGVyKFwiaHRtbC9zZWxlY3RpbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQubmFtZSA9PSBcInZhbHVlXCIpIG9wdGlvbi5hdHRyKFwidmFsdWVcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0Lm5hbWUgPT0gXCJ0ZXh0XCIpIG9wdGlvbi50ZXh0KHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9yZW1vdmUgYWxsIG9wdGlvbiBwcm9wZXJ0aWVzXHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gdGhpcy5wcm9wZXJ0aWVzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5rZXkuaW5kZXhPZihcIm9wdGlvblwiKSA9PT0gLTE7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vYWRkIHJlbWFpbmluZyBwcm9wZXJ0aWVzIHRvIGdlbmVyYXRlZCBjb2x1bW4gcHJvcGVydGllc1xyXG4gICAgICAgIHByb3BlcnRpZXMucHVzaCh0aGlzLnByb3BlcnRpZXNbMF0pO1xyXG5cclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiT3B0aW9uXCIsXHJcbiAgICAgICAga2V5OiBcIm9wdGlvbjFcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRWYWx1ZUlucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJPcHRpb25cIixcclxuICAgICAgICBrZXk6IFwib3B0aW9uMlwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dFZhbHVlSW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICAgIGtleTogXCJhZGRDaGlsZFwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogQnV0dG9uSW5wdXQsXHJcbiAgICAgICAgZGF0YTogeyB0ZXh0OiBcIkFkZCBvcHRpb25cIiB9LFxyXG4gICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgICAgICAkKG5vZGUpLmFwcGVuZCgnPG9wdGlvbiB2YWx1ZT1cInZhbHVlXCI+VGV4dDwvb3B0aW9uPicpO1xyXG5cclxuICAgICAgICAgICAgLy9yZW5kZXIgY29tcG9uZW50IHByb3BlcnRpZXMgYWdhaW4gdG8gaW5jbHVkZSB0aGUgbmV3IGNvbHVtbiBpbnB1dHNcclxuICAgICAgICAgICAgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIoXCJodG1sL3NlbGVjdGlucHV0XCIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNlbGVjdGlucHV0OyIsImltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBkYXRhQ29tcG9uZW50SWQgfSBmcm9tICcuLi9jb21tb24nO1xyXG5cclxuY29uc3QgcmFkaW9idXR0b24gPSB7XHJcbiAgICBuYW1lOiBcIlJhZGlvIEJ1dHRvblwiLFxyXG4gICAgYXR0cmlidXRlczogeyBcInR5cGVcIjogXCJyYWRpb1wiIH0sXHJcbiAgICBpbWFnZTogXCJpY29ucy9yYWRpby5zdmdcIixcclxuICAgIGh0bWw6IGA8ZGl2ICR7ZGF0YUNvbXBvbmVudElkfT1cImh0bWwvcmFkaW9idXR0b25Ab2VlXCIgY2xhc3M9XCJldmVyeU91dGJveC1yaWdodCBkcmFnZ2FibGVcIj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6aW5saW5lO1wiPjxpbnB1dCBjbGFzcz1cInJhZGlvSW5wdXRcIiBuYW1lPVwiRnJ1aXRcIiB0eXBlPVwicmFkaW9cIiB2YWx1ZT1cIlwiIC8+PHNwYW4gJHtkYXRhQ29tcG9uZW50SWR9PVwiaHRtbC9zcGFuQG9lZVwiPuWNlemAiTE8L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgICAgPC9kaXY+YCxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJOYW1lXCIsXHJcbiAgICAgICAga2V5OiBcIm5hbWVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJuYW1lXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCByYWRpb2J1dHRvbjsiLCJpbXBvcnQgeyBkYXRhQ29tcG9uZW50SWQgfSBmcm9tICcuLi9jb21tb24nO1xyXG5cclxuY29uc3QgbGFiZWxkaXYgPSB7XHJcbiAgICBuYW1lOiAnTGFiZWwgRGl2JyxcclxuICAgIGltYWdlOiAnaWNvbnMvbGFiZWwuc3ZnJyxcclxuICAgIGh0bWw6IGA8ZGl2IGNsYXNzPVwiZXZlcnlPdXRib3gtbGVmdCBkcmFnZ2FibGVcIj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2FyZXQtc3F1YXJlLW8tcmlnaHQgdGV4dC1kYW5nZXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiAke2RhdGFDb21wb25lbnRJZH09XCJodG1sL3NwYW5Ab2VlXCIgY2xhc3M9XCJ0aGVtZVwiPlBlcmlvZDwvc3Bhbj5cclxuICAgICAgICAgICA8L2Rpdj5gXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsYWJlbGRpdjsiLCJpbXBvcnQgeyBUZXh0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgZGF0YUNvbXBvbmVudElkIH0gZnJvbSAnLi4vY29tbW9uJztcclxuXHJcbmNvbnN0IGNoZWNrYm94ID0ge1xyXG4gICAgbmFtZTogXCJDaGVja2JveFwiLFxyXG4gICAgYXR0cmlidXRlczogeyBcInR5cGVcIjogXCJjaGVja2JveFwiIH0sXHJcbiAgICBpbWFnZTogXCJpY29ucy9jaGVja2JveC5zdmdcIixcclxuICAgIGh0bWw6IGA8ZGl2IGNsYXNzPVwiZXZlcnlPdXRib3gtcmlnaHQgZHJhZ2dhYmxlXCI+XHJcbiAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTppbmxpbmU7XCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgJHtkYXRhQ29tcG9uZW50SWR9PVwiaHRtbC9jaGVja2JveEBvZWVcIiB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImNoZWNrYm94SW5wdXRcIiBpZD1cIlxcJHtpdC5zaXRlfWVwckNoZWNrXCIgbmFtZT1cInBhcmFtSXRlbXNbXFwke2xvb3AuaW5kZXh9XS5lcHJDaGVja1wiIHZhbHVlPVwidHJ1ZVwiLz5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCAke2RhdGFDb21wb25lbnRJZH09XCJodG1sL3NwYW5Ab2VlXCI+6YCJ6aG5MTwvbGFiZWw+XHJcbiAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+YCxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJOYW1lXCIsXHJcbiAgICAgICAga2V5OiBcIm5hbWVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJuYW1lXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjaGVja2JveDsiLCJpbXBvcnQgeyBMaW5rSW5wdXQsIFNlbGVjdElucHV0LCBUZXh0SW5wdXQsIFRvZ2dsZUlucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBidXR0b24gPSB7XHJcbiAgICBjbGFzc2VzOiBbXCJidG5cIiwgXCJidG4tbGlua1wiLCAnYnRuQG9lZSddLFxyXG4gICAgbmFtZTogXCJCdXR0b25cIixcclxuICAgIGltYWdlOiBcImljb25zL2J1dHRvbi5zdmdcIixcclxuICAgIGh0bWw6IGA8ZGl2IGNsYXNzPVwiYm90dG9tLXNlYXJjaEJ1dHRvbiBkcmFnZ2FibGVcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG5Ab2VlXCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXNlYXJjaFwiPjwvc3Bhbj5TZWFyY2g8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PmAsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiTGluayBUb1wiLFxyXG4gICAgICAgIGtleTogXCJocmVmXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiaHJlZlwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogTGlua0lucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJUeXBlXCIsXHJcbiAgICAgICAga2V5OiBcInR5cGVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImJ0bi1kZWZhdWx0XCIsIFwiYnRuLXByaW1hcnlcIiwgXCJidG4taW5mb1wiLCBcImJ0bi1zdWNjZXNzXCIsIFwiYnRuLXdhcm5pbmdcIiwgXCJidG4taW5mb1wiLCBcImJ0bi1saWdodFwiLCBcImJ0bi1kYXJrXCIsIFwiYnRuLW91dGxpbmUtcHJpbWFyeVwiLCBcImJ0bi1vdXRsaW5lLWluZm9cIiwgXCJidG4tb3V0bGluZS1zdWNjZXNzXCIsIFwiYnRuLW91dGxpbmUtd2FybmluZ1wiLCBcImJ0bi1vdXRsaW5lLWluZm9cIiwgXCJidG4tb3V0bGluZS1saWdodFwiLCBcImJ0bi1vdXRsaW5lLWRhcmtcIiwgXCJidG4tbGlua1wiXSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLXByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiUHJpbWFyeVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0biBidG4taW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJJbmZvXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLXN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU3VjY2Vzc1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi13YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIldhcm5pbmdcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4taW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJJbmZvXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWxpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpZ2h0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWRhcmtcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGFya1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1vdXRsaW5lLXByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiUHJpbWFyeSBvdXRsaW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuIGJ0bi1vdXRsaW5lLWluZm9cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5mbyBvdXRsaW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLW91dGxpbmUtc3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTdWNjZXNzIG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tb3V0bGluZS13YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIldhcm5pbmcgb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1vdXRsaW5lLWluZm9cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5mbyBvdXRsaW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLW91dGxpbmUtbGlnaHRcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiTGlnaHQgb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1vdXRsaW5lLWRhcmtcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGFyayBvdXRsaW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWxpbmtcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiTGlua1wiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiU2l6ZVwiLFxyXG4gICAgICAgIGtleTogXCJzaXplXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJidG4tbGdcIiwgXCJidG4tc21cIl0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tbGdcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiTGFyZ2VcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tc21cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU21hbGxcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlRhcmdldFwiLFxyXG4gICAgICAgIGtleTogXCJ0YXJnZXRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJ0YXJnZXRcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiRGlzYWJsZWRcIixcclxuICAgICAgICBrZXk6IFwiZGlzYWJsZWRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImRpc2FibGVkXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb246IFwiZGlzYWJsZWRcIixcclxuICAgICAgICAgICAgb2ZmOiBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1dHRvbjsiLCJpbXBvcnQgbGFiZWwgZnJvbSAnLi9sYWJlbCc7XHJcbmltcG9ydCB0ZXh0aW5wdXQgZnJvbSAnLi90ZXh0aW5wdXQnO1xyXG5pbXBvcnQgYnV0dG9uIGZyb20gJy4vYnV0dG9uJztcclxuaW1wb3J0IGRpdiBmcm9tICcuL2Rpdic7XHJcbmltcG9ydCBjb250YWluZXIgZnJvbSAnLi9jb250YWluZXInO1xyXG5pbXBvcnQgYWxlcnQgZnJvbSAnLi9hbGVydCc7XHJcbmltcG9ydCBiYWRnZSBmcm9tICcuL2JhZGdlJztcclxuaW1wb3J0IGJyZWFkY3J1bWJpdGVtIGZyb20gJy4vYnJlYWRjcnVtYml0ZW0nO1xyXG5pbXBvcnQgYnJlYWRjcnVtYnMgZnJvbSAnLi9icmVhZGNydW1icyc7XHJcbmltcG9ydCBidXR0b25ncm91cCBmcm9tICcuL2J1dHRvbmdyb3VwJztcclxuaW1wb3J0IGJ1dHRvbnRvb2xiYXIgZnJvbSAnLi9idXR0b250b29sYmFyJztcclxuaW1wb3J0IGNhcmQgZnJvbSAnLi9jYXJkJztcclxuaW1wb3J0IGNoZWNrYm94IGZyb20gJy4vY2hlY2tib3gnO1xyXG5pbXBvcnQgZmlsZWlucHV0IGZyb20gJy4vZmlsZWlucHV0JztcclxuaW1wb3J0IGZvcm0gZnJvbSAnLi9mb3JtJztcclxuaW1wb3J0IGdyaWRjb2x1bW4gZnJvbSAnLi9ncmlkY29sdW1uJztcclxuaW1wb3J0IGdyaWRyb3cgZnJvbSAnLi9ncmlkcm93JztcclxuaW1wb3J0IGhlYWRpbmcgZnJvbSAnLi9oZWFkaW5nJztcclxuaW1wb3J0IGhyIGZyb20gJy4vaHInO1xyXG5pbXBvcnQgaW1hZ2UgZnJvbSAnLi9pbWFnZSc7XHJcbmltcG9ydCBqdW1ib3Ryb24gZnJvbSAnLi9qdW1ib3Ryb24nO1xyXG5pbXBvcnQgbGluayBmcm9tICcuL2xpbmsnO1xyXG5pbXBvcnQgbGlzdGdyb3VwIGZyb20gJy4vbGlzdGdyb3VwJztcclxuaW1wb3J0IGxpc3RpdGVtIGZyb20gJy4vbGlzdGl0ZW0nO1xyXG5pbXBvcnQgbmF2YmFyIGZyb20gJy4vbmF2YmFyJztcclxuaW1wb3J0IHBhZ2VpdGVtIGZyb20gJy4vcGFnZWl0ZW0nO1xyXG5pbXBvcnQgcGFnaW5hdGlvbiBmcm9tICcuL3BhZ2luYXRpb24nO1xyXG5pbXBvcnQgcHJvZ3Jlc3MgZnJvbSAnLi9wcm9ncmVzcyc7XHJcbmltcG9ydCByYWRpb2J1dHRvbiBmcm9tICcuL3JhZGlvYnV0dG9uJztcclxuaW1wb3J0IHNlbGVjdGlucHV0IGZyb20gJy4vc2VsZWN0aW5wdXQnO1xyXG5pbXBvcnQgdGFibGVoZWFkZXJjZWxsIGZyb20gJy4vdGFibGVoZWFkZXJjZWxsJztcclxuaW1wb3J0IHRhYmxlIGZyb20gJy4vdGFibGUnO1xyXG5pbXBvcnQgdGFibGVib2R5IGZyb20gJy4vdGFibGVib2R5JztcclxuaW1wb3J0IHRhYmxlY2VsbCBmcm9tICcuL3RhYmxlY2VsbCc7XHJcbmltcG9ydCB0YWJsZWhlYWQgZnJvbSAnLi90YWJsZWhlYWQnO1xyXG5pbXBvcnQgdGFibGVyb3cgZnJvbSAnLi90YWJsZXJvdyc7XHJcbmltcG9ydCB0ZXh0YXJlYWlucHV0IGZyb20gJy4vdGV4dGFyZWFpbnB1dCc7XHJcblxyXG5leHBvcnQge1xyXG4gICAgbGFiZWwsIHRleHRpbnB1dCwgYnV0dG9uLCBkaXYsIGNvbnRhaW5lciwgYWxlcnQsIGJhZGdlLCBicmVhZGNydW1iaXRlbSwgYnJlYWRjcnVtYnMsIGJ1dHRvbmdyb3VwLFxyXG4gICAgYnV0dG9udG9vbGJhciwgY2FyZCwgY2hlY2tib3gsIGZpbGVpbnB1dCwgZm9ybSwgZ3JpZGNvbHVtbiwgZ3JpZHJvdywgaGVhZGluZywgaHIsIGltYWdlLCBqdW1ib3Ryb24sXHJcbiAgICBsaW5rLCBsaXN0Z3JvdXAsIGxpc3RpdGVtLCBuYXZiYXIsIHBhZ2VpdGVtLCBwYWdpbmF0aW9uLCBwcm9ncmVzcywgcmFkaW9idXR0b24sIHNlbGVjdGlucHV0LCB0YWJsZWhlYWRlcmNlbGwsXHJcbiAgICB0YWJsZSwgdGFibGVib2R5LCB0YWJsZWNlbGwsIHRhYmxlaGVhZCwgdGFibGVyb3csIHRleHRhcmVhaW5wdXRcclxufTsiLCJpbXBvcnQgeyBUZXh0SW5wdXQsIFNlbGVjdElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGlucHV0VHlwZXMsIGlucHV0VHlwZU5hbWVzIH0gZnJvbSAnLi4vaW5wdXRUeXBlcyc7XHJcbmltcG9ydCB7IGRhdGFDb21wb25lbnRJZCB9IGZyb20gJy4uL2NvbW1vbic7XHJcblxyXG5jb25zdCB0ZXh0aW5wdXQgPSB7XHJcbiAgICBuYW1lOiBcIlRleHQgSW5wdXRcIixcclxuICAgIGF0dHJpYnV0ZXM6IHsgXCJ0eXBlXCI6IGlucHV0VHlwZU5hbWVzIH0sXHJcbiAgICBpbWFnZTogXCJpY29ucy90ZXh0X2lucHV0LnN2Z1wiLFxyXG4gICAgaHRtbDogYDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCI+PGxhYmVsPlRleHQ8L2xhYmVsPjxpbnB1dCAke2RhdGFDb21wb25lbnRJZH09XCJodG1sL3RleHRpbnB1dEBnZW5lcmFsXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPjwvZGl2PjwvZGl2PmAsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiVmFsdWVcIixcclxuICAgICAgICBrZXk6IFwidmFsdWVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJ2YWx1ZVwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJQbGFjZWhvbGRlclwiLFxyXG4gICAgICAgIGtleTogXCJwbGFjZWhvbGRlclwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInBsYWNlaG9sZGVyXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAndHlwZScsXHJcbiAgICAgICAga2V5OiAndHlwZScsXHJcbiAgICAgICAgaHRtbEF0dHI6ICd0eXBlJyxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogaW5wdXRUeXBlc1xyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0ZXh0aW5wdXQ7IiwiY29uc3QgaW5wdXRUeXBlcyA9IFtcclxuICAgIHtcclxuICAgICAgICB2YWx1ZTogJ3RleHQnLFxyXG4gICAgICAgIHRleHQ6ICd0ZXh0J1xyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiAncGFzc3dvcmQnLFxyXG4gICAgICAgIHRleHQ6ICdwYXNzd29yZCdcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ251bWJlcicsXHJcbiAgICAgICAgdGV4dDogJ251bWJlcidcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ3N1Ym1pdCcsXHJcbiAgICAgICAgdGV4dDogJ3N1Ym1pdCdcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogXCJlbWFpbFwiLFxyXG4gICAgICAgIHRleHQ6IFwiZW1haWxcIlxyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiAndXJsJyxcclxuICAgICAgICB0ZXh0OiAndXJsJ1xyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiAndGVsJyxcclxuICAgICAgICB0ZXh0OiAndGVsJ1xyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiAnc2VhcmNoJyxcclxuICAgICAgICB0ZXh0OiAnc2VhcmNoJ1xyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiAnZGF0ZXRpbWUtbG9jYWwnLFxyXG4gICAgICAgIHRleHQ6ICdkYXRldGltZS1sb2NhbCdcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ2RhdGV0aW1lJyxcclxuICAgICAgICB0ZXh0OiAnZGF0ZXRpbWUnXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6ICdkYXRlJyxcclxuICAgICAgICB0ZXh0OiAnZGF0ZSdcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ3RpbWUnLFxyXG4gICAgICAgIHRleHQ6ICd0aW1lJ1xyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiAnd2VlaycsXHJcbiAgICAgICAgdGV4dDogJ3dlZWsnXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6ICdtb250aCcsXHJcbiAgICAgICAgdGV4dDogJ21vbnRoJ1xyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiAncmFuZ2UnLFxyXG4gICAgICAgIHRleHQ6ICdyYW5nZSdcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ2NvbG9yJyxcclxuICAgICAgICB0ZXh0OiAnY29sb3InXHJcbiAgICB9XTtcclxuXHJcbmNvbnN0IGlucHV0VHlwZU5hbWVzID0gaW5wdXRUeXBlcy5yZWR1Y2UoKHByZXYsIGN1cikgPT4ge1xyXG4gICAgcHJldi5wdXNoKGN1ci52YWx1ZSk7XHJcbiAgICByZXR1cm4gcHJldjtcclxufSwgW10pO1xyXG5cclxuZXhwb3J0IHsgaW5wdXRUeXBlcywgaW5wdXRUeXBlTmFtZXMgfTsiLCJjb25zdCB0ZXh0YXJlYWlucHV0ID0ge1xyXG4gICAgbmFtZTogXCJUZXh0IEFyZWFcIixcclxuICAgIGltYWdlOiBcImljb25zL3RleHRfYXJlYS5zdmdcIixcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPjxsYWJlbD5Zb3VyIHJlc3BvbnNlOjwvbGFiZWw+PHRleHRhcmVhIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+PC90ZXh0YXJlYT48L2Rpdj4nXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0ZXh0YXJlYWlucHV0OyIsImltcG9ydCB7IFNlbGVjdElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCB0YWJsZXJvdyA9IHtcclxuICAgIG5vZGVzOiBbXCJ0clwiXSxcclxuICAgIG5hbWU6IFwiVGFibGUgUm93XCIsXHJcbiAgICBodG1sOiBcIjx0cj48dGQ+Q2VsbCAxPC90ZD48dGQ+Q2VsbCAyPC90ZD48dGQ+Q2VsbCAzPC90ZD48L3RyPlwiLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIlR5cGVcIixcclxuICAgICAgICBrZXk6IFwidHlwZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiXCIsIFwic3VjY2Vzc1wiLCBcImRhbmdlclwiLCBcIndhcm5pbmdcIiwgXCJhY3RpdmVcIl0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJlcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJFcnJvclwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIndhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiV2FybmluZ1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImFjdGl2ZVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJBY3RpdmVcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YWJsZXJvdzsiLCJjb25zdCB0YWJsZWhlYWRlcmNlbGwgPSB7XHJcbiAgICBub2RlczogW1widGhcIl0sXHJcbiAgICBuYW1lOiBcIlRhYmxlIEhlYWRlciBDZWxsXCIsXHJcbiAgICBodG1sOiBcIjx0aD5IZWFkPC90aD5cIlxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFibGVoZWFkZXJjZWxsOyIsImltcG9ydCB7IFNlbGVjdElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCB0YWJsZWhlYWQgPSB7XHJcbiAgICBub2RlczogW1widGhlYWRcIl0sXHJcbiAgICBuYW1lOiBcIlRhYmxlIEhlYWRcIixcclxuICAgIGh0bWw6IFwiPHRoZWFkPjx0cj48dGg+SGVhZCAxPC90aD48dGg+SGVhZCAyPC90aD48dGg+SGVhZCAzPC90aD48L3RyPjwvdGhlYWQ+XCIsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICAgIGtleTogXCJ0eXBlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJcIiwgXCJzdWNjZXNzXCIsIFwiZGFuZ2VyXCIsIFwid2FybmluZ1wiLCBcImluZm9cIl0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJhbmdlclwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJFcnJvclwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIndhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiV2FybmluZ1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhYmxlaGVhZDsiLCJjb25zdCB0YWJsZWNlbGwgPSB7XHJcbiAgICBub2RlczogW1widGRcIl0sXHJcbiAgICBuYW1lOiBcIlRhYmxlIENlbGxcIixcclxuICAgIGh0bWw6IFwiPHRkPkNlbGw8L3RkPlwiXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YWJsZWNlbGw7IiwiY29uc3QgdGFibGVib2R5ID0ge1xyXG4gICAgbm9kZXM6IFtcInRib2R5XCJdLFxyXG4gICAgbmFtZTogXCJUYWJsZSBCb2R5XCIsXHJcbiAgICBodG1sOiBcIjx0Ym9keT48dHI+PHRkPkNlbGwgMTwvdGQ+PHRkPkNlbGwgMjwvdGQ+PHRkPkNlbGwgMzwvdGQ+PC90cj48L3Rib2R5PlwiXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YWJsZWJvZHk7IiwiaW1wb3J0IHsgU2VsZWN0SW5wdXQsIFRvZ2dsZUlucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCB0YWJsZSA9IHtcclxuICAgIG5vZGVzOiBbXCJ0YWJsZVwiXSxcclxuICAgIGNsYXNzZXM6IFtcInRhYmxlXCJdLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvdGFibGUuc3ZnXCIsXHJcbiAgICBuYW1lOiBcIlRhYmxlXCIsXHJcbiAgICBodG1sOiAnPHRhYmxlIGNsYXNzPVwidGFibGVcIj5cXFxyXG5cdFx0ICA8dGhlYWQ+XFxcclxuXHRcdFx0PHRyPlxcXHJcblx0XHRcdCAgPHRoPiM8L3RoPlxcXHJcblx0XHRcdCAgPHRoPkZpcnN0IE5hbWU8L3RoPlxcXHJcblx0XHRcdCAgPHRoPkxhc3QgTmFtZTwvdGg+XFxcclxuXHRcdFx0ICA8dGg+VXNlcm5hbWU8L3RoPlxcXHJcblx0XHRcdDwvdHI+XFxcclxuXHRcdCAgPC90aGVhZD5cXFxyXG5cdFx0ICA8dGJvZHk+XFxcclxuXHRcdFx0PHRyPlxcXHJcblx0XHRcdCAgPHRoIHNjb3BlPVwicm93XCI+MTwvdGg+XFxcclxuXHRcdFx0ICA8dGQ+TWFyazwvdGQ+XFxcclxuXHRcdFx0ICA8dGQ+T3R0bzwvdGQ+XFxcclxuXHRcdFx0ICA8dGQ+QG1kbzwvdGQ+XFxcclxuXHRcdFx0PC90cj5cXFxyXG5cdFx0XHQ8dHI+XFxcclxuXHRcdFx0ICA8dGggc2NvcGU9XCJyb3dcIj4yPC90aD5cXFxyXG5cdFx0XHQgIDx0ZD5KYWNvYjwvdGQ+XFxcclxuXHRcdFx0ICA8dGQ+VGhvcm50b248L3RkPlxcXHJcblx0XHRcdCAgPHRkPkBmYXQ8L3RkPlxcXHJcblx0XHRcdDwvdHI+XFxcclxuXHRcdFx0PHRyPlxcXHJcblx0XHRcdCAgPHRoIHNjb3BlPVwicm93XCI+MzwvdGg+XFxcclxuXHRcdFx0ICA8dGQ+TGFycnk8L3RkPlxcXHJcblx0XHRcdCAgPHRkPnRoZSBCaXJkPC90ZD5cXFxyXG5cdFx0XHQgIDx0ZD5AdHdpdHRlcjwvdGQ+XFxcclxuXHRcdFx0PC90cj5cXFxyXG5cdFx0ICA8L3Rib2R5PlxcXHJcblx0XHQ8L3RhYmxlPicsXHJcbiAgICBwcm9wZXJ0aWVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlR5cGVcIixcclxuICAgICAgICAgICAga2V5OiBcInR5cGVcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFtcInRhYmxlLXByaW1hcnlcIiwgXCJ0YWJsZS1zZWNvbmRhcnlcIiwgXCJ0YWJsZS1zdWNjZXNzXCIsIFwidGFibGUtZGFuZ2VyXCIsIFwidGFibGUtd2FybmluZ1wiLCBcInRhYmxlLWluZm9cIiwgXCJ0YWJsZS1saWdodFwiLCBcInRhYmxlLWRhcmtcIiwgXCJ0YWJsZS13aGl0ZVwiXSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJEZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInRhYmxlLXByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlByaW1hcnlcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInRhYmxlLXNlY29uZGFyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiU2Vjb25kYXJ5XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0YWJsZS1zdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJTdWNjZXNzXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0YWJsZS1kYW5nZXJcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhbmdlclwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGFibGUtd2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiV2FybmluZ1wiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGFibGUtaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGFibGUtbGlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpZ2h0XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0YWJsZS1kYXJrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEYXJrXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0YWJsZS13aGl0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiV2hpdGVcIlxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlJlc3BvbnNpdmVcIixcclxuICAgICAgICAgICAga2V5OiBcInJlc3BvbnNpdmVcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFtcInRhYmxlLXJlc3BvbnNpdmVcIl0sXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9uOiBcInRhYmxlLXJlc3BvbnNpdmVcIixcclxuICAgICAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiU21hbGxcIixcclxuICAgICAgICAgICAga2V5OiBcInNtYWxsXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJ0YWJsZS1zbVwiXSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb246IFwidGFibGUtc21cIixcclxuICAgICAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiSG92ZXJcIixcclxuICAgICAgICAgICAga2V5OiBcImhvdmVyXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJ0YWJsZS1ob3ZlclwiXSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb246IFwidGFibGUtaG92ZXJcIixcclxuICAgICAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiQm9yZGVyZWRcIixcclxuICAgICAgICAgICAga2V5OiBcImJvcmRlcmVkXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJ0YWJsZS1ib3JkZXJlZFwiXSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb246IFwidGFibGUtYm9yZGVyZWRcIixcclxuICAgICAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiU3RyaXBlZFwiLFxyXG4gICAgICAgICAgICBrZXk6IFwic3RyaXBlZFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1widGFibGUtc3RyaXBlZFwiXSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb246IFwidGFibGUtc3RyaXBlZFwiLFxyXG4gICAgICAgICAgICAgICAgb2ZmOiBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJJbnZlcnNlXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJpbnZlcnNlXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJ0YWJsZS1pbnZlcnNlXCJdLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvbjogXCJ0YWJsZS1pbnZlcnNlXCIsXHJcbiAgICAgICAgICAgICAgICBvZmY6IFwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkhlYWQgb3B0aW9uc1wiLFxyXG4gICAgICAgICAgICBrZXk6IFwiaGVhZFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICBjaGlsZDogXCJ0aGVhZFwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1wiXCIsIFwidGhlYWQtaW52ZXJzZVwiLCBcInRoZWFkLWRlZmF1bHRcIl0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJOb25lXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0aGVhZC1kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0aGVhZC1pbnZlcnNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJJbnZlcnNlXCJcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFibGU7IiwiaW1wb3J0IFZ2dmViIGZyb20gJy4uLy4uL2J1aWxkZXInO1xyXG5pbXBvcnQgeyBUZXh0VmFsdWVJbnB1dCwgQnV0dG9uSW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IHNlbGVjdGlucHV0ID0ge1xyXG4gICAgbm9kZXM6IFtcInNlbGVjdFwiXSxcclxuICAgIG5hbWU6IFwiU2VsZWN0IElucHV0XCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9zZWxlY3RfaW5wdXQuc3ZnXCIsXHJcbiAgICBodG1sOiAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jaztcIj48bGFiZWw+Q2hvb3NlIGFuIG9wdGlvbiA8L2xhYmVsPjxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj48b3B0aW9uIHZhbHVlPVwidmFsdWUxXCI+VGV4dCAxPC9vcHRpb24+PG9wdGlvbiB2YWx1ZT1cInZhbHVlMlwiPlRleHQgMjwvb3B0aW9uPjxvcHRpb24gdmFsdWU9XCJ2YWx1ZTNcIj5UZXh0IDM8L29wdGlvbj48L3NlbGVjdD48L2Rpdj4nLFxyXG5cclxuICAgIGJlZm9yZUluaXQ6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgcHJvcGVydGllcyA9IFtdO1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuXHJcbiAgICAgICAgJChub2RlKS5maW5kKCdvcHRpb24nKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGRhdGEgPSB7IFwidmFsdWVcIjogdGhpcy52YWx1ZSwgXCJ0ZXh0XCI6IHRoaXMudGV4dCB9O1xyXG5cclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJPcHRpb24gXCIgKyBpLFxyXG4gICAgICAgICAgICAgICAga2V5OiBcIm9wdGlvblwiICsgaSxcclxuICAgICAgICAgICAgICAgIC8vaW5kZXg6IGkgLSAxLFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uTm9kZTogdGhpcyxcclxuICAgICAgICAgICAgICAgIGlucHV0dHlwZTogVGV4dFZhbHVlSW5wdXQsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSwgaW5wdXQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gJCh0aGlzLm9wdGlvbk5vZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIHJlbW92ZSBidXR0b24gaXMgY2xpY2tlZCByZW1vdmUgb3B0aW9uIGFuZCByZW5kZXIgcm93IHByb3BlcnRpZXNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQubm9kZU5hbWUgPT0gJ0JVVFRPTicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWdnZlYi5Db21wb25lbnRzLnJlbmRlcihcImh0bWwvc2VsZWN0aW5wdXRAZ2VuZXJhbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQubmFtZSA9PSBcInZhbHVlXCIpIG9wdGlvbi5hdHRyKFwidmFsdWVcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0Lm5hbWUgPT0gXCJ0ZXh0XCIpIG9wdGlvbi50ZXh0KHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9yZW1vdmUgYWxsIG9wdGlvbiBwcm9wZXJ0aWVzXHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gdGhpcy5wcm9wZXJ0aWVzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5rZXkuaW5kZXhPZihcIm9wdGlvblwiKSA9PT0gLTE7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vYWRkIHJlbWFpbmluZyBwcm9wZXJ0aWVzIHRvIGdlbmVyYXRlZCBjb2x1bW4gcHJvcGVydGllc1xyXG4gICAgICAgIHByb3BlcnRpZXMucHVzaCh0aGlzLnByb3BlcnRpZXNbMF0pO1xyXG5cclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiT3B0aW9uXCIsXHJcbiAgICAgICAga2V5OiBcIm9wdGlvbjFcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRWYWx1ZUlucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJPcHRpb25cIixcclxuICAgICAgICBrZXk6IFwib3B0aW9uMlwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dFZhbHVlSW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICAgIGtleTogXCJhZGRDaGlsZFwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogQnV0dG9uSW5wdXQsXHJcbiAgICAgICAgZGF0YTogeyB0ZXh0OiBcIkFkZCBvcHRpb25cIiB9LFxyXG4gICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgICAgICAkKG5vZGUpLmFwcGVuZCgnPG9wdGlvbiB2YWx1ZT1cInZhbHVlXCI+VGV4dDwvb3B0aW9uPicpO1xyXG5cclxuICAgICAgICAgICAgLy9yZW5kZXIgY29tcG9uZW50IHByb3BlcnRpZXMgYWdhaW4gdG8gaW5jbHVkZSB0aGUgbmV3IGNvbHVtbiBpbnB1dHNcclxuICAgICAgICAgICAgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIoXCJodG1sL3NlbGVjdGlucHV0QGdlbmVyYWxcIik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2VsZWN0aW5wdXQ7IiwiaW1wb3J0IHsgVGV4dElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGRhdGFDb21wb25lbnRJZCB9IGZyb20gJy4uL2NvbW1vbic7XHJcblxyXG5jb25zdCByYWRpb2J1dHRvbiA9IHtcclxuICAgIG5hbWU6IFwiUmFkaW8gQnV0dG9uXCIsXHJcbiAgICBhdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBcInJhZGlvXCIgfSxcclxuICAgIGltYWdlOiBcImljb25zL3JhZGlvLnN2Z1wiLFxyXG4gICAgaHRtbDogYDxsYWJlbCAke2RhdGFDb21wb25lbnRJZH09XCJodG1sL3JhZGlvYnV0dG9uQGdlbmVyYWxcIiBjbGFzcz1cInJhZGlvXCI+PGlucHV0IHR5cGU9XCJyYWRpb1wiPiBSYWRpbzwvbGFiZWw+YCxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJOYW1lXCIsXHJcbiAgICAgICAga2V5OiBcIm5hbWVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJuYW1lXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCByYWRpb2J1dHRvbjsiLCJpbXBvcnQgeyBTZWxlY3RJbnB1dCwgVG9nZ2xlSW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgYmdjb2xvckNsYXNzZXMsIGJnY29sb3JTZWxlY3RPcHRpb25zIH0gZnJvbSAnLi4vY29tbW9uJztcclxuXHJcbmNvbnN0IHByb2dyZXNzID0ge1xyXG4gICAgY2xhc3NlczogW1wicHJvZ3Jlc3NcIl0sXHJcbiAgICBuYW1lOiBcIlByb2dyZXNzIEJhclwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvcHJvZ3Jlc3NiYXIuc3ZnXCIsXHJcbiAgICBodG1sOiAnPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+PGRpdiBjbGFzcz1cInByb2dyZXNzLWJhciB3LTI1XCI+PC9kaXY+PC9kaXY+JyxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJCYWNrZ3JvdW5kXCIsXHJcbiAgICAgICAga2V5OiBcImJhY2tncm91bmRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBiZ2NvbG9yQ2xhc3NlcyxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogYmdjb2xvclNlbGVjdE9wdGlvbnNcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFwiUHJvZ3Jlc3NcIixcclxuICAgICAgICBrZXk6IFwiYmFja2dyb3VuZFwiLFxyXG4gICAgICAgIGNoaWxkOiBcIi5wcm9ncmVzcy1iYXJcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJcIiwgXCJ3LTI1XCIsIFwidy01MFwiLCBcInctNzVcIiwgXCJ3LTEwMFwiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJOb25lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwidy0yNVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCIyNSVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJ3LTUwXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIjUwJVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcInctNzVcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiNzUlXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwidy0xMDBcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiMTAwJVwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBuYW1lOiBcIlByb2dyZXNzIGJhY2tncm91bmRcIixcclxuICAgICAgICBrZXk6IFwiYmFja2dyb3VuZFwiLFxyXG4gICAgICAgIGNoaWxkOiBcIi5wcm9ncmVzcy1iYXJcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBiZ2NvbG9yQ2xhc3NlcyxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogYmdjb2xvclNlbGVjdE9wdGlvbnNcclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJTdHJpcGVkXCIsXHJcbiAgICAgICAga2V5OiBcInN0cmlwZWRcIixcclxuICAgICAgICBjaGlsZDogXCIucHJvZ3Jlc3MtYmFyXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiXCIsIFwicHJvZ3Jlc3MtYmFyLXN0cmlwZWRcIl0sXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9uOiBcInByb2dyZXNzLWJhci1zdHJpcGVkXCIsXHJcbiAgICAgICAgICAgIG9mZjogXCJcIixcclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJBbmltYXRlZFwiLFxyXG4gICAgICAgIGtleTogXCJhbmltYXRlZFwiLFxyXG4gICAgICAgIGNoaWxkOiBcIi5wcm9ncmVzcy1iYXJcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJcIiwgXCJwcm9ncmVzcy1iYXItYW5pbWF0ZWRcIl0sXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9uOiBcInByb2dyZXNzLWJhci1hbmltYXRlZFwiLFxyXG4gICAgICAgICAgICBvZmY6IFwiXCIsXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByb2dyZXNzOyIsImltcG9ydCB7IFNlbGVjdElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBwYWdpbmF0aW9uID0ge1xyXG4gICAgY2xhc3NlczogW1wicGFnaW5hdGlvblwiXSxcclxuICAgIG5hbWU6IFwiUGFnaW5hdGlvblwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvcGFnaW5hdGlvbi5zdmdcIixcclxuICAgIGh0bWw6ICc8bmF2IGFyaWEtbGFiZWw9XCJQYWdlIG5hdmlnYXRpb24gZXhhbXBsZVwiPlxcXHJcblx0ICA8dWwgY2xhc3M9XCJwYWdpbmF0aW9uXCI+XFxcclxuXHRcdDxsaSBjbGFzcz1cInBhZ2UtaXRlbVwiPjxhIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZj1cIiNcIj5QcmV2aW91czwvYT48L2xpPlxcXHJcblx0XHQ8bGkgY2xhc3M9XCJwYWdlLWl0ZW1cIj48YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9XCIjXCI+MTwvYT48L2xpPlxcXHJcblx0XHQ8bGkgY2xhc3M9XCJwYWdlLWl0ZW1cIj48YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9XCIjXCI+MjwvYT48L2xpPlxcXHJcblx0XHQ8bGkgY2xhc3M9XCJwYWdlLWl0ZW1cIj48YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9XCIjXCI+MzwvYT48L2xpPlxcXHJcblx0XHQ8bGkgY2xhc3M9XCJwYWdlLWl0ZW1cIj48YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9XCIjXCI+TmV4dDwvYT48L2xpPlxcXHJcblx0ICA8L3VsPlxcXHJcblx0PC9uYXY+JyxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiU2l6ZVwiLFxyXG4gICAgICAgIGtleTogXCJzaXplXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJidG4tbGdcIiwgXCJidG4tc21cIl0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tbGdcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiTGFyZ2VcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tc21cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU21hbGxcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkFsaWdubWVudFwiLFxyXG4gICAgICAgIGtleTogXCJhbGlnbm1lbnRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImp1c3RpZnktY29udGVudC1jZW50ZXJcIiwgXCJqdXN0aWZ5LWNvbnRlbnQtZW5kXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwianVzdGlmeS1jb250ZW50LWNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJDZW50ZXJcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJqdXN0aWZ5LWNvbnRlbnQtZW5kXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlJpZ2h0XCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGFnaW5hdGlvbjsiLCJpbXBvcnQgeyBUZXh0SW5wdXQsIFRvZ2dsZUlucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBwYWdlaXRlbSA9IHtcclxuICAgIGNsYXNzZXM6IFtcInBhZ2UtaXRlbVwiXSxcclxuICAgIGh0bWw6ICc8bGkgY2xhc3M9XCJwYWdlLWl0ZW1cIj48YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9XCIjXCI+MTwvYT48L2xpPicsXHJcbiAgICBuYW1lOiBcIlBhZ2luYXRpb24gSXRlbVwiLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIkxpbmsgVG9cIixcclxuICAgICAgICBrZXk6IFwiaHJlZlwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImhyZWZcIixcclxuICAgICAgICBjaGlsZDogXCIucGFnZS1saW5rXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkRpc2FibGVkXCIsXHJcbiAgICAgICAga2V5OiBcImRpc2FibGVkXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiZGlzYWJsZWRcIl0sXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9uOiBcImRpc2FibGVkXCIsXHJcbiAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwYWdlaXRlbTsiLCJpbXBvcnQgeyBTZWxlY3RJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBiZ2NvbG9yQ2xhc3NlcywgYmdjb2xvclNlbGVjdE9wdGlvbnMgfSBmcm9tICcuLi9jb21tb24nO1xyXG5cclxuY29uc3QgbmF2YmFyID0ge1xyXG4gICAgY2xhc3NlczogW1wibmF2YmFyXCJdLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvbmF2YmFyLnN2Z1wiLFxyXG4gICAgbmFtZTogXCJOYXYgQmFyXCIsXHJcbiAgICBodG1sOiAnPG5hdiBjbGFzcz1cIm5hdmJhciBuYXZiYXItZXhwYW5kLWxnIG5hdmJhci1saWdodCBiZy1saWdodFwiPlxcXHJcblx0XHQgIDxhIGNsYXNzPVwibmF2YmFyLWJyYW5kXCIgaHJlZj1cIiNcIj5OYXZiYXI8L2E+XFxcclxuXHRcdCAgPGJ1dHRvbiBjbGFzcz1cIm5hdmJhci10b2dnbGVyXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD1cIiNuYXZiYXJTdXBwb3J0ZWRDb250ZW50XCIgYXJpYS1jb250cm9scz1cIm5hdmJhclN1cHBvcnRlZENvbnRlbnRcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiBhcmlhLWxhYmVsPVwiVG9nZ2xlIG5hdmlnYXRpb25cIj5cXFxyXG5cdFx0XHQ8c3BhbiBjbGFzcz1cIm5hdmJhci10b2dnbGVyLWljb25cIj48L3NwYW4+XFxcclxuXHRcdCAgPC9idXR0b24+XFxcclxuXHRcdFxcXHJcblx0XHQgIDxkaXYgY2xhc3M9XCJjb2xsYXBzZSBuYXZiYXItY29sbGFwc2VcIiBpZD1cIm5hdmJhclN1cHBvcnRlZENvbnRlbnRcIj5cXFxyXG5cdFx0XHQ8dWwgY2xhc3M9XCJuYXZiYXItbmF2IG1yLWF1dG9cIj5cXFxyXG5cdFx0XHQgIDxsaSBjbGFzcz1cIm5hdi1pdGVtIGFjdGl2ZVwiPlxcXHJcblx0XHRcdFx0PGEgY2xhc3M9XCJuYXYtbGlua1wiIGhyZWY9XCIjXCI+SG9tZSA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIj4oY3VycmVudCk8L3NwYW4+PC9hPlxcXHJcblx0XHRcdCAgPC9saT5cXFxyXG5cdFx0XHQgIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+XFxcclxuXHRcdFx0XHQ8YSBjbGFzcz1cIm5hdi1saW5rXCIgaHJlZj1cIiNcIj5MaW5rPC9hPlxcXHJcblx0XHRcdCAgPC9saT5cXFxyXG5cdFx0XHQgIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+XFxcclxuXHRcdFx0XHQ8YSBjbGFzcz1cIm5hdi1saW5rIGRpc2FibGVkXCIgaHJlZj1cIiNcIj5EaXNhYmxlZDwvYT5cXFxyXG5cdFx0XHQgIDwvbGk+XFxcclxuXHRcdFx0PC91bD5cXFxyXG5cdFx0XHQ8Zm9ybSBjbGFzcz1cImZvcm0taW5saW5lIG15LTIgbXktbGctMFwiPlxcXHJcblx0XHRcdCAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sIG1yLXNtLTJcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCIgYXJpYS1sYWJlbD1cIlNlYXJjaFwiPlxcXHJcblx0XHRcdCAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tb3V0bGluZS1zdWNjZXNzIG15LTIgbXktc20tMFwiIHR5cGU9XCJzdWJtaXRcIj5TZWFyY2g8L2J1dHRvbj5cXFxyXG5cdFx0XHQ8L2Zvcm0+XFxcclxuXHRcdCAgPC9kaXY+XFxcclxuXHRcdDwvbmF2PicsXHJcblxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIkNvbG9yIHRoZW1lXCIsXHJcbiAgICAgICAga2V5OiBcImNvbG9yXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wibmF2YmFyLWxpZ2h0XCIsIFwibmF2YmFyLWRhcmtcIl0sXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIm5hdmJhci1saWdodFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMaWdodFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIm5hdmJhci1kYXJrXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhcmtcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkJhY2tncm91bmQgY29sb3JcIixcclxuICAgICAgICBrZXk6IFwiYmFja2dyb3VuZFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IGJnY29sb3JDbGFzc2VzLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBiZ2NvbG9yU2VsZWN0T3B0aW9uc1xyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlBsYWNlbWVudFwiLFxyXG4gICAgICAgIGtleTogXCJwbGFjZW1lbnRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJmaXhlZC10b3BcIiwgXCJmaXhlZC1ib3R0b21cIiwgXCJzdGlja3ktdG9wXCJdLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJmaXhlZC10b3BcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRml4ZWQgVG9wXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiZml4ZWQtYm90dG9tXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkZpeGVkIEJvdHRvbVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcInN0aWNreS10b3BcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU3RpY2t5IHRvcFwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5hdmJhcjsiLCJjb25zdCBsaXN0aXRlbSA9IHtcclxuICAgIG5hbWU6IFwiTGlzdCBJdGVtXCIsXHJcbiAgICBjbGFzc2VzOiBbXCJsaXN0LWdyb3VwLWl0ZW1cIl0sXHJcbiAgICBodG1sOiAnPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+PHNwYW4gY2xhc3M9XCJiYWRnZVwiPjE0PC9zcGFuPiBDcmFzIGp1c3RvIG9kaW88L2xpPidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxpc3RpdGVtOyIsImNvbnN0IGxpc3Rncm91cCA9IHtcclxuICAgIG5hbWU6IFwiTGlzdCBHcm91cFwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvbGlzdF9ncm91cC5zdmdcIixcclxuICAgIGNsYXNzZXM6IFtcImxpc3QtZ3JvdXBcIl0sXHJcbiAgICBodG1sOiAnPHVsIGNsYXNzPVwibGlzdC1ncm91cFwiPlxcbiAgPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+XFxuICAgIDxzcGFuIGNsYXNzPVwiYmFkZ2VcIj4xNDwvc3Bhbj5cXG4gICAgQ3JhcyBqdXN0byBvZGlvXFxuICA8L2xpPlxcbiAgPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+XFxuICAgIDxzcGFuIGNsYXNzPVwiYmFkZ2VcIj4yPC9zcGFuPlxcbiAgICBEYXBpYnVzIGFjIGZhY2lsaXNpcyBpblxcbiAgPC9saT5cXG4gIDxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiPlxcbiAgICA8c3BhbiBjbGFzcz1cImJhZGdlXCI+MTwvc3Bhbj5cXG4gICAgTW9yYmkgbGVvIHJpc3VzXFxuICA8L2xpPlxcbjwvdWw+J1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGlzdGdyb3VwOyIsImltcG9ydCB7IExpbmtJbnB1dCwgVGV4dElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBsaW5rID0ge1xyXG4gICAgbm9kZXM6IFtcImFcIl0sXHJcbiAgICBuYW1lOiBcIkxpbmtcIixcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJVcmxcIixcclxuICAgICAgICBrZXk6IFwiaHJlZlwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImhyZWZcIixcclxuICAgICAgICBpbnB1dHR5cGU6IExpbmtJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiVGFyZ2V0XCIsXHJcbiAgICAgICAga2V5OiBcInRhcmdldFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInRhcmdldFwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGluazsiLCJpbXBvcnQgeyBUZXh0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGxhYmVsID0ge1xyXG4gICAgbmFtZTogJ0xhYmVsJyxcclxuICAgIG5vZGVzOiBbJ2xhYmVsJ10sXHJcbiAgICBpbWFnZTogJ2ljb25zL2xhYmVsLnN2ZycsXHJcbiAgICBodG1sOiAnPGxhYmVsIGZvcj1cIlwiPkxhYmVsPC9sYWJlbD4nLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiAnRm9yIGlkJyxcclxuICAgICAgICBodG1sQXR0cjogJ2ZvcicsXHJcbiAgICAgICAga2V5OiAnZm9yJyxcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxhYmVsOyIsImNvbnN0IGp1bWJvdHJvbiA9IHtcclxuICAgIGNsYXNzZXM6IFtcImp1bWJvdHJvblwiXSxcclxuICAgIGltYWdlOiBcImljb25zL2p1bWJvdHJvbi5zdmdcIixcclxuICAgIG5hbWU6IFwiSnVtYm90cm9uXCIsXHJcbiAgICBodG1sOiAnPGRpdiBjbGFzcz1cImp1bWJvdHJvblwiPlxcXHJcblx0XHQgIDxoMSBjbGFzcz1cImRpc3BsYXktM1wiPkhlbGxvLCB3b3JsZCE8L2gxPlxcXHJcblx0XHQgIDxwIGNsYXNzPVwibGVhZFwiPlRoaXMgaXMgYSBzaW1wbGUgaGVybyB1bml0LCBhIHNpbXBsZSBqdW1ib3Ryb24tc3R5bGUgY29tcG9uZW50IGZvciBjYWxsaW5nIGV4dHJhIGF0dGVudGlvbiB0byBmZWF0dXJlZCBjb250ZW50IG9yIGluZm9ybWF0aW9uLjwvcD5cXFxyXG5cdFx0ICA8aHIgY2xhc3M9XCJteS00XCI+XFxcclxuXHRcdCAgPHA+SXQgdXNlcyB1dGlsaXR5IGNsYXNzZXMgZm9yIHR5cG9ncmFwaHkgYW5kIHNwYWNpbmcgdG8gc3BhY2UgY29udGVudCBvdXQgd2l0aGluIHRoZSBsYXJnZXIgY29udGFpbmVyLjwvcD5cXFxyXG5cdFx0ICA8cCBjbGFzcz1cImxlYWRcIj5cXFxyXG5cdFx0XHQ8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tbGdcIiBocmVmPVwiI1wiIHJvbGU9XCJidXR0b25cIj5MZWFybiBtb3JlPC9hPlxcXHJcblx0XHQgIDwvcD5cXFxyXG5cdFx0PC9kaXY+J1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQganVtYm90cm9uOyIsImltcG9ydCBWdnZlYiBmcm9tICcuLi8uLi9idWlsZGVyJ1xyXG5pbXBvcnQgeyBGaWxlVXBsb2FkSW5wdXQsIFRleHRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgaW1hZ2UgPSB7XHJcbiAgICBub2RlczogW1wiaW1nXCJdLFxyXG4gICAgbmFtZTogXCJJbWFnZVwiLFxyXG4gICAgaHRtbDogJzxpbWcgc3JjPVwiJyArIFZ2dmViLmJhc2VVcmwgKyAnaWNvbnMvaW1hZ2Uuc3ZnXCIgaGVpZ2h0PVwiMTI4XCIgd2lkdGg9XCIxMjhcIj4nLFxyXG4gICAgLypcclxuICAgIGFmdGVyRHJvcDogZnVuY3Rpb24gKG5vZGUpXHJcblx0e1xyXG5cdFx0bm9kZS5hdHRyKFwic3JjXCIsICcnKTtcclxuXHRcdHJldHVybiBub2RlO1xyXG5cdH0sKi9cclxuICAgIGltYWdlOiBcImljb25zL2ltYWdlLnN2Z1wiLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIkltYWdlXCIsXHJcbiAgICAgICAga2V5OiBcInNyY1wiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInNyY1wiLFxyXG4gICAgICAgIGlucHV0dHlwZTogRmlsZVVwbG9hZElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJXaWR0aFwiLFxyXG4gICAgICAgIGtleTogXCJ3aWR0aFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcIndpZHRoXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkhlaWdodFwiLFxyXG4gICAgICAgIGtleTogXCJoZWlnaHRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJoZWlnaHRcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiQWx0XCIsXHJcbiAgICAgICAga2V5OiBcImFsdFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImFsdFwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW1hZ2U7IiwiY29uc3QgaHIgPSB7XHJcbiAgICBpbWFnZTogXCJpY29ucy9oci5zdmdcIixcclxuICAgIG5vZGVzOiBbXCJoclwiXSxcclxuICAgIG5hbWU6IFwiSG9yaXpvbnRhbCBSdWxlXCIsXHJcbiAgICBodG1sOiBcIjxocj5cIlxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBocjsiLCJpbXBvcnQgeyBjaGFuZ2VOb2RlTmFtZSB9IGZyb20gJy4uL2NvbW1vbic7XHJcbmltcG9ydCB7IFNlbGVjdElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBoZWFkaW5nID0gIHtcclxuICAgIGltYWdlOiBcImljb25zL2hlYWRpbmcuc3ZnXCIsXHJcbiAgICBuYW1lOiBcIkhlYWRpbmdcIixcclxuICAgIG5vZGVzOiBbXCJoMVwiLCBcImgyXCIsIFwiaDNcIiwgXCJoNFwiLCBcImg1XCIsIFwiaDZcIl0sXHJcbiAgICBodG1sOiBcIjxoMT5IZWFkaW5nPC9oMT5cIixcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlNpemVcIixcclxuICAgICAgICAgICAga2V5OiBcImlkXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImlkXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcblxyXG4gICAgICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKG5vZGUsIHZhbHVlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoYW5nZU5vZGVOYW1lKG5vZGUsIFwiaFwiICsgdmFsdWUpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZWdleDtcclxuICAgICAgICAgICAgICAgIHJlZ2V4ID0gL0goXFxkKS8uZXhlYyhub2RlLm5vZGVOYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZWdleCAmJiByZWdleFsxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWdleFsxXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDFcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiMVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiMlwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiM1wiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiNFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiNVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiNlwiXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBoZWFkaW5nOyIsImltcG9ydCB7IEdyaWRJbnB1dCwgQnV0dG9uSW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGdyaWRyb3cgPSB7XHJcbiAgICBuYW1lOiBcIkdyaWQgUm93XCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9ncmlkX3Jvdy5zdmdcIixcclxuICAgIGNsYXNzZXM6IFtcInJvd1wiXSxcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+PGgzPmNvbC1zbS00PC9oMz48L2Rpdj48ZGl2IGNsYXNzPVwiY29sLXNtLTQgY29sLTVcIj48aDM+Y29sLXNtLTQ8L2gzPjwvZGl2PjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPjxoMz5jb2wtc20tNDwvaDM+PC9kaXY+PC9kaXY+JyxcclxuXHJcbiAgICBiZWZvcmVJbml0OiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgIHByb3BlcnRpZXMgPSBbXTtcclxuICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgdmFyIGogPSAwO1xyXG5cclxuICAgICAgICAkKG5vZGUpLmZpbmQoJ1tjbGFzcyo9XCJjb2wtXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF9jbGFzcyA9ICQodGhpcykuYXR0cihcImNsYXNzXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlZyA9IC9jb2wtKFteLVxcJCBdKik/LT8oXFxkKykvZztcclxuICAgICAgICAgICAgdmFyIG1hdGNoO1xyXG4gICAgICAgICAgICBkYXRhID0ge307XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoKG1hdGNoID0gcmVnLmV4ZWMoX2NsYXNzKSkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YVtcImNvbFwiICsgKChtYXRjaFsxXSAhPSB1bmRlZmluZWQpID8gXCJfXCIgKyBtYXRjaFsxXSA6IFwiXCIpXSA9IG1hdGNoWzJdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkNvbHVtbiBcIiArIGksXHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiY29sdW1uXCIgKyBpLFxyXG4gICAgICAgICAgICAgICAgLy9pbmRleDogaSAtIDEsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5Ob2RlOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaW5wdXR0eXBlOiBHcmlkSW5wdXQsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSwgaW5wdXQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb2x1bW4gPSAkKCdbY2xhc3MqPVwiY29sLVwiXTplcSgnICsgdGhpcy5pbmRleCArICcpJywgbm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uID0gJCh0aGlzLmNvbHVtbk5vZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIHJlbW92ZSBidXR0b24gaXMgY2xpY2tlZCByZW1vdmUgY29sdW1uIGFuZCByZW5kZXIgcm93IHByb3BlcnRpZXNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQubm9kZU5hbWUgPT0gJ0JVVFRPTicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWdnZlYi5Db21wb25lbnRzLnJlbmRlcihcImh0bWwvZ3JpZHJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIHNlbGVjdCBpbnB1dCB0aGVuIGNoYW5nZSBjb2x1bW4gY2xhc3NcclxuICAgICAgICAgICAgICAgICAgICBfY2xhc3MgPSBjb2x1bW4uYXR0cihcImNsYXNzXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3JlbW92ZSBwcmV2aW91cyBicmVha3BvaW50IGNvbHVtbiBzaXplXHJcbiAgICAgICAgICAgICAgICAgICAgX2NsYXNzID0gX2NsYXNzLnJlcGxhY2UobmV3IFJlZ0V4cChpbnB1dC5uYW1lICsgJy1cXFxcZCs/JyksICcnKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2FkZCBuZXcgY29sdW1uIHNpemVcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUpIF9jbGFzcyArPSAnICcgKyBpbnB1dC5uYW1lICsgJy0nICsgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uLmF0dHIoXCJjbGFzc1wiLCBfY2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL3JlbW92ZSBhbGwgY29sdW1uIHByb3BlcnRpZXNcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSB0aGlzLnByb3BlcnRpZXMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmtleS5pbmRleE9mKFwiY29sdW1uXCIpID09PSAtMTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9hZGQgcmVtYWluaW5nIHByb3BlcnRpZXMgdG8gZ2VuZXJhdGVkIGNvbHVtbiBwcm9wZXJ0aWVzXHJcbiAgICAgICAgcHJvcGVydGllcy5wdXNoKHRoaXMucHJvcGVydGllc1swXSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJDb2x1bW5cIixcclxuICAgICAgICBrZXk6IFwiY29sdW1uMVwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogR3JpZElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJDb2x1bW5cIixcclxuICAgICAgICBrZXk6IFwiY29sdW1uMVwiLFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBjb2w6IDEyLFxyXG4gICAgICAgIGlucHV0dHlwZTogR3JpZElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICBrZXk6IFwiYWRkQ2hpbGRcIixcclxuICAgICAgICBpbnB1dHR5cGU6IEJ1dHRvbklucHV0LFxyXG4gICAgICAgIGRhdGE6IHsgdGV4dDogXCJBZGQgY29sdW1uXCIgfSxcclxuICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAgICAgJChub2RlKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJjb2wtM1wiPkNvbC0zPC9kaXY+Jyk7XHJcblxyXG4gICAgICAgICAgICAvL3JlbmRlciBjb21wb25lbnQgcHJvcGVydGllcyBhZ2FpbiB0byBpbmNsdWRlIHRoZSBuZXcgY29sdW1uIGlucHV0c1xyXG4gICAgICAgICAgICBWdnZlYi5Db21wb25lbnRzLnJlbmRlcihcImh0bWwvZ3JpZHJvd1wiKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBncmlkcm93OyIsImltcG9ydCB7IEdyaWRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgZ3JpZGNvbHVtbiA9IHtcclxuICAgIG5hbWU6IFwiR3JpZCBDb2x1bW5cIixcclxuICAgIGltYWdlOiBcImljb25zL2dyaWRfcm93LnN2Z1wiLFxyXG4gICAgY2xhc3Nlc1JlZ2V4OiBbXCJjb2wtXCJdLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPjxoMz5jb2wtc20tNDwvaDM+PC9kaXY+JyxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJDb2x1bW5cIixcclxuICAgICAgICBrZXk6IFwiY29sdW1uXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBHcmlkSW5wdXQsXHJcbiAgICAgICAgZGF0YTogeyBoaWRlX3JlbW92ZTogdHJ1ZSB9LFxyXG5cclxuICAgICAgICBiZWZvcmVJbml0OiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgICAgICBfY2xhc3MgPSAkKG5vZGUpLmF0dHIoXCJjbGFzc1wiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZWcgPSAvY29sLShbXi1cXCQgXSopPy0/KFxcZCspL2c7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaDtcclxuXHJcbiAgICAgICAgICAgIHdoaWxlICgobWF0Y2ggPSByZWcuZXhlYyhfY2xhc3MpKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFbXCJjb2xcIiArICgobWF0Y2hbMV0gIT0gdW5kZWZpbmVkKSA/IFwiX1wiICsgbWF0Y2hbMV0gOiBcIlwiKV0gPSBtYXRjaFsyXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSwgdmFsdWUsIGlucHV0KSB7XHJcbiAgICAgICAgICAgIF9jbGFzcyA9IG5vZGUuYXR0cihcImNsYXNzXCIpO1xyXG5cclxuICAgICAgICAgICAgLy9yZW1vdmUgcHJldmlvdXMgYnJlYWtwb2ludCBjb2x1bW4gc2l6ZVxyXG4gICAgICAgICAgICBfY2xhc3MgPSBfY2xhc3MucmVwbGFjZShuZXcgUmVnRXhwKGlucHV0Lm5hbWUgKyAnLVxcXFxkKz8nKSwgJycpO1xyXG4gICAgICAgICAgICAvL2FkZCBuZXcgY29sdW1uIHNpemVcclxuICAgICAgICAgICAgaWYgKHZhbHVlKSBfY2xhc3MgKz0gJyAnICsgaW5wdXQubmFtZSArICctJyArIHZhbHVlO1xyXG4gICAgICAgICAgICBub2RlLmF0dHIoXCJjbGFzc1wiLCBfY2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfSxcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBncmlkY29sdW1uOyIsImltcG9ydCB7IFRleHRJbnB1dCwgU2VsZWN0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGZvcm0gPSB7XHJcbiAgICBub2RlczogW1wiZm9ybVwiXSxcclxuICAgIGltYWdlOiBcImljb25zL2Zvcm0uc3ZnXCIsXHJcbiAgICBuYW1lOiBcIkZvcm1cIixcclxuICAgIGh0bWw6ICc8Zm9ybSBjbGFzcz1cImRyb3B6b25lXCI+PC9mb3JtPicsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiU3R5bGVcIixcclxuICAgICAgICBrZXk6IFwic3R5bGVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJcIiwgXCJmb3JtLXNlYXJjaFwiLCBcImZvcm0taW5saW5lXCIsIFwiZm9ybS1ob3Jpem9udGFsXCJdLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJmb3JtLXNlYXJjaFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTZWFyY2hcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJmb3JtLWlubGluZVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJJbmxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJmb3JtLWhvcml6b250YWxcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSG9yaXpvbnRhbFwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiQWN0aW9uXCIsXHJcbiAgICAgICAga2V5OiBcImFjdGlvblwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImFjdGlvblwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJNZXRob2RcIixcclxuICAgICAgICBrZXk6IFwibWV0aG9kXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwibWV0aG9kXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb3JtOyIsImNvbnN0IGZpbGVpbnB1dCA9IHtcclxuICAgIG5hbWU6IFwiSW5wdXQgZ3JvdXBcIixcclxuICAgIGF0dHJpYnV0ZXM6IHsgXCJ0eXBlXCI6IFwiZmlsZVwiIH0sXHJcbiAgICBpbWFnZTogXCJpY29ucy90ZXh0X2lucHV0LnN2Z1wiLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XFxcclxuXHRcdFx0ICA8aW5wdXQgdHlwZT1cImZpbGVcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxcXHJcblx0XHRcdDwvZGl2PidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZpbGVpbnB1dDsiLCJpbXBvcnQgeyBiZ2NvbG9yU2VsZWN0T3B0aW9ucywgYmdjb2xvckNsYXNzZXMgfSBmcm9tICcuLi9jb21tb24nO1xyXG5pbXBvcnQgeyBTZWxlY3RJbnB1dCwgQ29sb3JJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgZGl2ID0ge1xyXG4gICAgY2xhc3NlczogW1wiY29udGFpbmVyXCIsIFwiY29udGFpbmVyLWZsdWlkXCJdLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvZGl2LnN2Z1wiLFxyXG4gICAgaHRtbDogJzxkaXYgc3R5bGU9XCJ3aWR0aDogMzUwcHg7IGhlaWdodDogMjAwcHg7XCIgY2xhc3M9XCJkcm9wem9uZVwiPjwvZGl2PicsXHJcbiAgICBuYW1lOiBcIkRpdlwiLFxyXG4gICAgcHJvcGVydGllczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJUeXBlXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJ0eXBlXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJjb250YWluZXJcIiwgXCJjb250YWluZXItZmx1aWRcIl0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiY29udGFpbmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJjb250YWluZXItZmx1aWRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkZsdWlkXCJcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJCYWNrZ3JvdW5kXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJiYWNrZ3JvdW5kXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBiZ2NvbG9yQ2xhc3NlcyxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogYmdjb2xvclNlbGVjdE9wdGlvbnNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkJhY2tncm91bmQgQ29sb3JcIixcclxuICAgICAgICAgICAga2V5OiBcImJhY2tncm91bmQtY29sb3JcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDb2xvcklucHV0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlRleHQgQ29sb3JcIixcclxuICAgICAgICAgICAga2V5OiBcImNvbG9yXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ29sb3JJbnB1dCxcclxuICAgICAgICB9XSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRpdjsiLCJpbXBvcnQgeyBTZWxlY3RJbnB1dCwgQ29sb3JJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBiZ2NvbG9yQ2xhc3NlcywgYmdjb2xvclNlbGVjdE9wdGlvbnMgfSBmcm9tICcuLi9jb21tb24nO1xyXG5cclxuY29uc3QgY29udGFpbmVyID0ge1xyXG4gICAgY2xhc3NlczogW1wiY29udGFpbmVyXCIsIFwiY29udGFpbmVyLWZsdWlkXCJdLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvY29udGFpbmVyLnN2Z1wiLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJjb250YWluZXIgZHJvcHpvbmVcIj48ZGl2IGNsYXNzPVwibS01XCI+Q29udGFpbmVyPC9kaXY+PC9kaXY+JyxcclxuICAgIG5hbWU6IFwiQ29udGFpbmVyXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlR5cGVcIixcclxuICAgICAgICAgICAga2V5OiBcInR5cGVcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImNvbnRhaW5lclwiLCBcImNvbnRhaW5lci1mbHVpZFwiXSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJjb250YWluZXJcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImNvbnRhaW5lci1mbHVpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRmx1aWRcIlxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkJhY2tncm91bmRcIixcclxuICAgICAgICAgICAga2V5OiBcImJhY2tncm91bmRcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IGJnY29sb3JDbGFzc2VzLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBiZ2NvbG9yU2VsZWN0T3B0aW9uc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiQmFja2dyb3VuZCBDb2xvclwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiYmFja2dyb3VuZC1jb2xvclwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENvbG9ySW5wdXQsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiVGV4dCBDb2xvclwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiY29sb3JcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDb2xvcklucHV0LFxyXG4gICAgICAgIH1dLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29udGFpbmVyO1xyXG5cclxuIiwiaW1wb3J0IHsgVGV4dElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBjaGVja2JveCA9IHtcclxuICAgIG5hbWU6IFwiQ2hlY2tib3hcIixcclxuICAgIGF0dHJpYnV0ZXM6IHsgXCJ0eXBlXCI6IFwiY2hlY2tib3hcIiB9LFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvY2hlY2tib3guc3ZnXCIsXHJcbiAgICBodG1sOiAnPGxhYmVsIGNsYXNzPVwiY2hlY2tib3hcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCI+IENoZWNrYm94PC9sYWJlbD4nLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIk5hbWVcIixcclxuICAgICAgICBrZXk6IFwibmFtZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcIm5hbWVcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNoZWNrYm94OyIsImNvbnN0IGNhcmQgPSB7XHJcbiAgICBjbGFzc2VzOiBbXCJjYXJkXCJdLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvcGFuZWwuc3ZnXCIsXHJcbiAgICBuYW1lOiBcIkNhcmRcIixcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwiY2FyZFwiPlxcXHJcblx0XHQgIDxpbWcgY2xhc3M9XCJjYXJkLWltZy10b3BcIiBzcmM9XCIuLi9saWJzL2J1aWxkZXIvaWNvbnMvaW1hZ2Uuc3ZnXCIgYWx0PVwiQ2FyZCBpbWFnZSBjYXBcIiB3aWR0aD1cIjEyOFwiIGhlaWdodD1cIjEyOFwiPlxcXHJcblx0XHQgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cXFxyXG5cdFx0XHQ8aDQgY2xhc3M9XCJjYXJkLXRpdGxlXCI+Q2FyZCB0aXRsZTwvaDQ+XFxcclxuXHRcdFx0PHAgY2xhc3M9XCJjYXJkLXRleHRcIj5Tb21lIHF1aWNrIGV4YW1wbGUgdGV4dCB0byBidWlsZCBvbiB0aGUgY2FyZCB0aXRsZSBhbmQgbWFrZSB1cCB0aGUgYnVsayBvZiB0aGUgY2FyZFxcJ3MgY29udGVudC48L3A+XFxcclxuXHRcdFx0PGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPkdvIHNvbWV3aGVyZTwvYT5cXFxyXG5cdFx0ICA8L2Rpdj5cXFxyXG5cdFx0PC9kaXY+J1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2FyZDsiLCJjb25zdCBidXR0b250b29sYmFyID0gIHtcclxuICAgIGNsYXNzZXM6IFtcImJ0bi10b29sYmFyXCJdLFxyXG4gICAgbmFtZTogXCJCdXR0b24gVG9vbGJhclwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvYnV0dG9uX3Rvb2xiYXIuc3ZnXCIsXHJcbiAgICBodG1sOiAnPGRpdiBjbGFzcz1cImJ0bi10b29sYmFyXCIgcm9sZT1cInRvb2xiYXJcIiBhcmlhLWxhYmVsPVwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcIj5cXFxyXG5cdFx0ICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIG1yLTJcIiByb2xlPVwiZ3JvdXBcIiBhcmlhLWxhYmVsPVwiRmlyc3QgZ3JvdXBcIj5cXFxyXG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCI+MTwvYnV0dG9uPlxcXHJcblx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIj4yPC9idXR0b24+XFxcclxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiPjM8L2J1dHRvbj5cXFxyXG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCI+NDwvYnV0dG9uPlxcXHJcblx0XHQgIDwvZGl2PlxcXHJcblx0XHQgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXAgbXItMlwiIHJvbGU9XCJncm91cFwiIGFyaWEtbGFiZWw9XCJTZWNvbmQgZ3JvdXBcIj5cXFxyXG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCI+NTwvYnV0dG9uPlxcXHJcblx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIj42PC9idXR0b24+XFxcclxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiPjc8L2J1dHRvbj5cXFxyXG5cdFx0ICA8L2Rpdj5cXFxyXG5cdFx0ICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCIgYXJpYS1sYWJlbD1cIlRoaXJkIGdyb3VwXCI+XFxcclxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiPjg8L2J1dHRvbj5cXFxyXG5cdFx0ICA8L2Rpdj5cXFxyXG5cdFx0PC9kaXY+J1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnV0dG9udG9vbGJhcjsiLCJpbXBvcnQgeyBTZWxlY3RJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgYnV0dG9uZ3JvdXAgPSB7XHJcbiAgICBjbGFzc2VzOiBbXCJidG4tZ3JvdXBcIl0sXHJcbiAgICBuYW1lOiBcIkJ1dHRvbiBHcm91cFwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvYnV0dG9uX2dyb3VwLnN2Z1wiLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIiBhcmlhLWxhYmVsPVwiQmFzaWMgZXhhbXBsZVwiPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIj5MZWZ0PC9idXR0b24+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiPk1pZGRsZTwvYnV0dG9uPiA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCI+UmlnaHQ8L2J1dHRvbj48L2Rpdj4nLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIlNpemVcIixcclxuICAgICAgICBrZXk6IFwic2l6ZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiYnRuLWdyb3VwLWxnXCIsIFwiYnRuLWdyb3VwLXNtXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWdyb3VwLWxnXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxhcmdlXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWdyb3VwLXNtXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlNtYWxsXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJBbGlnbm1lbnRcIixcclxuICAgICAgICBrZXk6IFwiYWxpZ25tZW50XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJidG4tZ3JvdXBcIiwgXCJidG4tZ3JvdXAtdmVydGljYWxcIl0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tZ3JvdXBcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSG9yaXpvbnRhbFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1ncm91cC12ZXJ0aWNhbFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJWZXJ0aWNhbFwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1dHRvbmdyb3VwOyIsImltcG9ydCB7IExpbmtJbnB1dCwgU2VsZWN0SW5wdXQsIFRleHRJbnB1dCwgVG9nZ2xlSW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGJ1dHRvbiA9IHtcclxuICAgIGNsYXNzZXM6IFtcImJ0blwiLCBcImJ0bi1saW5rXCJdLFxyXG4gICAgbmFtZTogXCJCdXR0b25cIixcclxuICAgIGltYWdlOiBcImljb25zL2J1dHRvbi5zdmdcIixcclxuICAgIGh0bWw6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPlByaW1hcnk8L2J1dHRvbj4nLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIkxpbmsgVG9cIixcclxuICAgICAgICBrZXk6IFwiaHJlZlwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImhyZWZcIixcclxuICAgICAgICBpbnB1dHR5cGU6IExpbmtJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICAgIGtleTogXCJ0eXBlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJidG4tZGVmYXVsdFwiLCBcImJ0bi1wcmltYXJ5XCIsIFwiYnRuLWluZm9cIiwgXCJidG4tc3VjY2Vzc1wiLCBcImJ0bi13YXJuaW5nXCIsIFwiYnRuLWluZm9cIiwgXCJidG4tbGlnaHRcIiwgXCJidG4tZGFya1wiLCBcImJ0bi1vdXRsaW5lLXByaW1hcnlcIiwgXCJidG4tb3V0bGluZS1pbmZvXCIsIFwiYnRuLW91dGxpbmUtc3VjY2Vzc1wiLCBcImJ0bi1vdXRsaW5lLXdhcm5pbmdcIiwgXCJidG4tb3V0bGluZS1pbmZvXCIsIFwiYnRuLW91dGxpbmUtbGlnaHRcIiwgXCJidG4tb3V0bGluZS1kYXJrXCIsIFwiYnRuLWxpbmtcIl0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWRlZmF1bHRcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlByaW1hcnlcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4gYnRuLWluZm9cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1zdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4td2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJXYXJuaW5nXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWluZm9cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1saWdodFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMaWdodFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1kYXJrXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhcmtcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tb3V0bGluZS1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlByaW1hcnkgb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0biBidG4tb3V0bGluZS1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm8gb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1vdXRsaW5lLXN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU3VjY2VzcyBvdXRsaW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLW91dGxpbmUtd2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJXYXJuaW5nIG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tb3V0bGluZS1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm8gb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1vdXRsaW5lLWxpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpZ2h0IG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tb3V0bGluZS1kYXJrXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhcmsgb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1saW5rXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpbmtcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlNpemVcIixcclxuICAgICAgICBrZXk6IFwic2l6ZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiYnRuLWxnXCIsIFwiYnRuLXNtXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWxnXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxhcmdlXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLXNtXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlNtYWxsXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJUYXJnZXRcIixcclxuICAgICAgICBrZXk6IFwidGFyZ2V0XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwidGFyZ2V0XCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkRpc2FibGVkXCIsXHJcbiAgICAgICAga2V5OiBcImRpc2FibGVkXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJkaXNhYmxlZFwiXSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9uOiBcImRpc2FibGVkXCIsXHJcbiAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidXR0b247IiwiY29uc3QgYnJlYWRjcnVtYnMgPSAge1xyXG4gICAgY2xhc3NlczogW1wiYnJlYWRjcnVtYlwiXSxcclxuICAgIG5hbWU6IFwiQnJlYWRjcnVtYnNcIixcclxuICAgIGltYWdlOiBcImljb25zL2JyZWFkY3J1bWJzLnN2Z1wiLFxyXG4gICAgaHRtbDogJzxvbCBjbGFzcz1cImJyZWFkY3J1bWJcIj5cXFxyXG5cdFx0ICA8bGkgY2xhc3M9XCJicmVhZGNydW1iLWl0ZW0gYWN0aXZlXCI+PGEgaHJlZj1cIiNcIj5Ib21lPC9hPjwvbGk+XFxcclxuXHRcdCAgPGxpIGNsYXNzPVwiYnJlYWRjcnVtYi1pdGVtIGFjdGl2ZVwiPjxhIGhyZWY9XCIjXCI+TGlicmFyeTwvYT48L2xpPlxcXHJcblx0XHQgIDxsaSBjbGFzcz1cImJyZWFkY3J1bWItaXRlbSBhY3RpdmVcIj5EYXRhIDM8L2xpPlxcXHJcblx0XHQ8L29sPidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJyZWFkY3J1bWJzOyIsImltcG9ydCB7IFRvZ2dsZUlucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBicmVhZGNydW1iaXRlbSA9IHtcclxuICAgIGNsYXNzZXM6IFtcImJyZWFkY3J1bWItaXRlbVwiXSxcclxuICAgIG5hbWU6IFwiQnJlYWRjcnVtYiBJdGVtXCIsXHJcbiAgICBodG1sOiAnPGxpIGNsYXNzPVwiYnJlYWRjcnVtYi1pdGVtXCI+PGEgaHJlZj1cIiNcIj5MaWJyYXJ5PC9hPjwvbGk+JyxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJBY3RpdmVcIixcclxuICAgICAgICBrZXk6IFwiYWN0aXZlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiXCIsIFwiYWN0aXZlXCJdLFxyXG4gICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvbjogXCJhY3RpdmVcIixcclxuICAgICAgICAgICAgb2ZmOiBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnJlYWRjcnVtYml0ZW07IiwiaW1wb3J0IHsgU2VsZWN0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGJhZGdlID0ge1xyXG4gICAgY2xhc3NlczogW1wiYmFkZ2VcIl0sXHJcbiAgICBpbWFnZTogXCJpY29ucy9iYWRnZS5zdmdcIixcclxuICAgIG5hbWU6IFwiQmFkZ2VcIixcclxuICAgIGh0bWw6ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXByaW1hcnlcIj5QcmltYXJ5IGJhZGdlPC9zcGFuPicsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiQ29sb3JcIixcclxuICAgICAgICBrZXk6IFwiY29sb3JcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJiYWRnZS1wcmltYXJ5XCIsIFwiYmFkZ2Utc2Vjb25kYXJ5XCIsIFwiYmFkZ2Utc3VjY2Vzc1wiLCBcImJhZGdlLWRhbmdlclwiLCBcImJhZGdlLXdhcm5pbmdcIiwgXCJiYWRnZS1pbmZvXCIsIFwiYmFkZ2UtbGlnaHRcIiwgXCJiYWRnZS1kYXJrXCJdLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJiYWRnZS1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlByaW1hcnlcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJiYWRnZS1zZWNvbmRhcnlcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU2Vjb25kYXJ5XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYmFkZ2Utc3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTdWNjZXNzXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYmFkZ2Utd2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJXYXJuaW5nXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYmFkZ2UtZGFuZ2VyXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhbmdlclwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJhZGdlLWluZm9cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJhZGdlLWxpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpZ2h0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYmFkZ2UtZGFya1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEYXJrXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYmFkZ2U7IiwiaW1wb3J0IHsgU2VsZWN0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGFsZXJ0ID0ge1xyXG4gICAgY2xhc3NlczogW1wiYWxlcnRcIl0sXHJcbiAgICBuYW1lOiBcIkFsZXJ0XCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9hbGVydC5zdmdcIixcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtd2FybmluZyBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj5cXFxyXG5cdFx0ICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cXFxyXG5cdFx0XHQ8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxcXHJcblx0XHQgIDwvYnV0dG9uPlxcXHJcblx0XHQgIDxzdHJvbmc+SG9seSBndWFjYW1vbGUhPC9zdHJvbmc+IFlvdSBzaG91bGQgY2hlY2sgaW4gb24gc29tZSBvZiB0aG9zZSBmaWVsZHMgYmVsb3cuXFxcclxuXHRcdDwvZGl2PicsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICAgIGtleTogXCJ0eXBlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiYWxlcnQtcHJpbWFyeVwiLCBcImFsZXJ0LXNlY29uZGFyeVwiLCBcImFsZXJ0LXN1Y2Nlc3NcIiwgXCJhbGVydC1kYW5nZXJcIiwgXCJhbGVydC13YXJuaW5nXCIsIFwiYWxlcnQtaW5mb1wiLCBcImFsZXJ0LWxpZ2h0XCIsIFwiYWxlcnQtZGFya1wiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImFsZXJ0LXByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImFsZXJ0LXNlY29uZGFyeVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTZWNvbmRhcnlcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJhbGVydC1zdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJhbGVydC1kYW5nZXJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGFuZ2VyXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYWxlcnQtd2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJXYXJuaW5nXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYWxlcnQtaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJJbmZvXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYWxlcnQtbGlnaHRcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiTGlnaHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJhbGVydC1kYXJrXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhcmtcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhbGVydDsiXX0=
