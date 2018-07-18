require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({53:[function(require,module,exports){
var _builder = require('./builder');

var _builder2 = _interopRequireDefault(_builder);

var _components = require('./components/@general/components');

var _general = _interopRequireWildcard(_components);

var _components2 = require('./components/@oee/components');

var _oee = _interopRequireWildcard(_components2);

var _ids = require('./components/@oee/ids');

var _oee_ids = _interopRequireWildcard(_ids);

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

_builder2.default.ComponentsGroup['定制组件'] = ['html/labeldiv@oee', _oee_ids.buttonid, 'html/textinput@oee', 'html/calendar@oee', _oee_ids.autoselectinputid, _oee_ids.manualselectinputid, 'html/radiobutton@oee', 'html/checkbox@oee', 'html/table@oee'];

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
_builder2.default.Components.extend('_base', _oee_ids.buttonid, _oee.button);
_builder2.default.Components.extend('_base', 'html/radiobutton@oee', _oee.radiobutton);
_builder2.default.Components.extend('_base', 'html/span@oee', _oee.span);
_builder2.default.Components.extend('_base', 'html/checkbox@oee', _oee.checkbox);
_builder2.default.Components.extend('_base', 'html/selectinput@oee', _oee.selectinput);
_builder2.default.Components.extend('_base', 'html/table@oee', _oee.table);
_builder2.default.Components.extend('_base', 'html/calendar@oee', _oee.calendar);
_builder2.default.Components.extend('_base', 'html/text@oee', _oee.text);
_builder2.default.Components.extend('_base', _oee_ids.autoselectinputid, _oee.autoselectinput);
_builder2.default.Components.extend('_base', _oee_ids.manualselectinputid, _oee.manualselectinput);

},{"./builder":52,"./components/@general/components":63,"./components/@oee/components":103,"./components/@oee/ids":112,"./components/border":137,"./components/display":139,"./components/element":140,"./components/margin":142,"./components/padding":143,"./components/size":144,"./components/typography":145}],145:[function(require,module,exports){
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

},{"../inputs/inputs":170,"./common":138}],144:[function(require,module,exports){
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

},{"../inputs/inputs":170,"./common":138}],143:[function(require,module,exports){
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

},{"../inputs/inputs":170,"./common":138}],142:[function(require,module,exports){
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

},{"../inputs/inputs":170,"./common":138}],140:[function(require,module,exports){
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

},{"../inputs/inputs":170,"./common":138}],139:[function(require,module,exports){
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

},{"../inputs/inputs":170,"./common":138}],137:[function(require,module,exports){
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

},{"../inputs/inputs":170,"./common":138}],103:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.manualselectinput = exports.autoselectinput = exports.text = exports.calendar = exports.span = exports.labeldiv = exports.textareainput = exports.tablerow = exports.tablehead = exports.tablecell = exports.tablebody = exports.table = exports.tableheadercell = exports.selectinput = exports.radiobutton = exports.progress = exports.pagination = exports.pageitem = exports.navbar = exports.listitem = exports.listgroup = exports.link = exports.jumbotron = exports.image = exports.hr = exports.heading = exports.gridrow = exports.gridcolumn = exports.form = exports.fileinput = exports.checkbox = exports.card = exports.buttontoolbar = exports.buttongroup = exports.breadcrumbs = exports.breadcrumbitem = exports.badge = exports.alert = exports.container = exports.div = exports.button = exports.textinput = exports.label = undefined;

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

var _calendar = require('./calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _autoselectinput = require('./autoselectinput');

var _autoselectinput2 = _interopRequireDefault(_autoselectinput);

var _manualselectinput = require('./manualselectinput');

var _manualselectinput2 = _interopRequireDefault(_manualselectinput);

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
exports.calendar = _calendar2.default;
exports.text = _text2.default;
exports.autoselectinput = _autoselectinput2.default;
exports.manualselectinput = _manualselectinput2.default;

},{"./alert":92,"./autoselectinput":93,"./badge":94,"./breadcrumbitem":95,"./breadcrumbs":96,"./button":97,"./buttongroup":98,"./buttontoolbar":99,"./calendar":100,"./card":101,"./checkbox":102,"./container":104,"./div":105,"./fileinput":106,"./form":107,"./gridcolumn":108,"./gridrow":109,"./heading":110,"./hr":111,"./image":113,"./jumbotron":114,"./label":115,"./labeldiv":116,"./link":117,"./listgroup":118,"./listitem":119,"./manualselectinput":120,"./navbar":121,"./pageitem":122,"./pagination":123,"./progress":124,"./radiobutton":125,"./selectinput":126,"./span":127,"./table":128,"./tablebody":129,"./tablecell":130,"./tablehead":131,"./tableheadercell":132,"./tablerow":133,"./text":134,"./textareainput":135,"./textinput":136}],136:[function(require,module,exports){
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
    html: '<div class="everyOutbox-right draggable">\n            <div class="btn-group">\n                <div class="dailyBox">\n                    <input ' + _common.dataComponentId + '="html/textinput@oee" lustyle="height: 2.8rem;width:13rem" type="text" class="form-control"/>\n                 </div>\n            </div>\n           </div>',
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

},{"../../inputs/inputs":170,"../common":138,"../inputTypes":141}],135:[function(require,module,exports){
arguments[4][90][0].apply(exports,arguments)
},{"dup":90}],134:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var text = {
    name: "Text",
    image: "icons/text_input.svg",
    html: "",
    nodes: ['b', 'big', 'em', 'i', 'small', 'strong', 'sub', 'sup', 'ins', 'del', 's', 'strike', 'u'],
    properties: [{
        name: 'Text',
        key: 'text',
        htmlAttr: 'text',
        inputtype: _inputs.TextInput
    }]
};

exports.default = text;

},{"../../inputs/inputs":170}],133:[function(require,module,exports){
arguments[4][89][0].apply(exports,arguments)
},{"../../inputs/inputs":170,"dup":89}],132:[function(require,module,exports){
arguments[4][88][0].apply(exports,arguments)
},{"dup":88}],131:[function(require,module,exports){
arguments[4][87][0].apply(exports,arguments)
},{"../../inputs/inputs":170,"dup":87}],130:[function(require,module,exports){
arguments[4][86][0].apply(exports,arguments)
},{"dup":86}],129:[function(require,module,exports){
arguments[4][85][0].apply(exports,arguments)
},{"dup":85}],127:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var span = {
    name: "Span",
    image: "icons/text_input.svg",
    nodes: ['span'],
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

},{"../../inputs/inputs":170}],126:[function(require,module,exports){
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
    html: '<div class="everyOutbox-right draggable">\n            <div class="btn-group">\n                <div class="dailyBox">\n                    <select class="form-control" lustyle="height: 2.8rem;width:13rem">\n                        <option value="value1">Text 1</option>\n                        <option value="value2">Text 2</option>\n                        <option value="value3">Text 3</option>\n                    </select>\n                </div>\n            </div>\n           </div>\n    ',
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

},{"../../builder":52,"../../inputs/inputs":170}],125:[function(require,module,exports){
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

},{"../../inputs/inputs":170,"../common":138}],124:[function(require,module,exports){
arguments[4][81][0].apply(exports,arguments)
},{"../../inputs/inputs":170,"../common":138,"dup":81}],123:[function(require,module,exports){
arguments[4][80][0].apply(exports,arguments)
},{"../../inputs/inputs":170,"dup":80}],122:[function(require,module,exports){
arguments[4][79][0].apply(exports,arguments)
},{"../../inputs/inputs":170,"dup":79}],121:[function(require,module,exports){
arguments[4][78][0].apply(exports,arguments)
},{"../../inputs/inputs":170,"../common":138,"dup":78}],120:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _builder = require('../../builder');

var _builder2 = _interopRequireDefault(_builder);

var _inputs = require('../../inputs/inputs');

var _ids = require('./ids');

var _common = require('../common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var autoselectinput = {
    nodes: ["select"],
    name: "Manual Select Input",
    image: "icons/select_input.svg",
    html: '<div class="everyOutbox-right draggable">\n            <div class="btn-group">\n                <div class="dailyBox">\n                    <select ' + _common.dataComponentId + '="' + _ids.manualselectinputid + '" class="form-control fundodooSelect" lustyle="height:2.8rem;width:13rem">\n                        <option value="value1">Text 1</option>\n                        <option value="value2">Text 2</option>\n                        <option value="value3">Text 3</option>\n                    </select>\n                </div>\n            </div>\n           </div>\n    ',
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
                        _builder2.default.Components.render(_ids.manualselectinputid);
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
            _builder2.default.Components.render(_ids.manualselectinputid);
            return node;
        }
    }]
};

exports.default = autoselectinput;

},{"../../builder":52,"../../inputs/inputs":170,"../common":138,"./ids":112}],119:[function(require,module,exports){
arguments[4][77][0].apply(exports,arguments)
},{"dup":77}],118:[function(require,module,exports){
arguments[4][76][0].apply(exports,arguments)
},{"dup":76}],117:[function(require,module,exports){
arguments[4][75][0].apply(exports,arguments)
},{"../../inputs/inputs":170,"dup":75}],116:[function(require,module,exports){
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

},{"../common":138}],115:[function(require,module,exports){
arguments[4][74][0].apply(exports,arguments)
},{"../../inputs/inputs":170,"dup":74}],114:[function(require,module,exports){
arguments[4][73][0].apply(exports,arguments)
},{"dup":73}],113:[function(require,module,exports){
arguments[4][72][0].apply(exports,arguments)
},{"../../builder":52,"../../inputs/inputs":170,"dup":72}],111:[function(require,module,exports){
arguments[4][71][0].apply(exports,arguments)
},{"dup":71}],110:[function(require,module,exports){
arguments[4][70][0].apply(exports,arguments)
},{"../../inputs/inputs":170,"../common":138,"dup":70}],109:[function(require,module,exports){
arguments[4][69][0].apply(exports,arguments)
},{"../../inputs/inputs":170,"dup":69}],108:[function(require,module,exports){
arguments[4][68][0].apply(exports,arguments)
},{"../../inputs/inputs":170,"dup":68}],107:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"../../inputs/inputs":170,"dup":67}],106:[function(require,module,exports){
arguments[4][66][0].apply(exports,arguments)
},{"dup":66}],105:[function(require,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"../../inputs/inputs":170,"../common":138,"dup":65}],104:[function(require,module,exports){
arguments[4][64][0].apply(exports,arguments)
},{"../../inputs/inputs":170,"../common":138,"dup":64}],102:[function(require,module,exports){
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

},{"../../inputs/inputs":170,"../common":138}],101:[function(require,module,exports){
arguments[4][61][0].apply(exports,arguments)
},{"dup":61}],100:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../../inputs/inputs');

var _inputTypes = require('../inputTypes');

var _common = require('../common');

var _calendar = require('../../util/calendar');

var calendar = {
    name: "Datetime Input",
    attributes: { "type": _inputTypes.inputTypeNames },
    image: "icons/calendar.svg",
    html: '<div class="everyOutbox-right draggable">\n            <div class="btn-group">\n                <div class="dailyBox">\n                    <input ' + _common.dataCalendarId + ' ' + _common.dataConfigInfo + '="{\'dateFmt\': \'yyyy-MM-dd HH:mm\'}" ' + _common.dataComponentId + '="html/calendar@oee" lustyle="height: 2.8rem;width:13rem " \n                    type="text" class="form-control Wdate"/>\n                 </div>\n            </div>\n           </div>',
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
        name: "Date Format",
        key: "dateFmt",
        inputtype: _inputs.SelectInput,
        init: _calendar.getDateFmt,
        onChange: function onChange(node, value) {
            var configInfo = (0, _calendar.getParsedConfigInfo)(node);
            configInfo.dateFmt = value;
            (0, _calendar.setDataConfigInfo)(node, configInfo);

            if (node.attr('onclick')) {
                return (0, _calendar.setOnclickAttr)((0, _calendar.cloneWithoutOnclick)(node));
            }
            return node;
        },
        data: {
            options: [{
                value: 'yyyy-MM-dd HH:mm',
                text: 'yyyy-MM-dd HH:mm'
            }, {
                value: 'yyyy-MM-dd HH:mm:ss',
                text: 'yyyy-MM-dd HH:mm:ss'
            }, {
                value: 'yyyy-MM-dd',
                text: 'yyyy-MM-dd'
            }, {
                value: 'yyyyMMdd',
                text: 'yyyyMMdd'
            }, {
                value: 'yyyyMM',
                text: 'yyyyMM'
            }, {
                value: 'yyyy',
                text: 'yyyy'
            }, {
                value: 'yyyy年M月',
                text: 'yyyy年M月'
            }]
        }
    }, {
        name: "Show Datetime",
        key: "showDatetime",
        validValues: ["table-responsive"],
        inputtype: _inputs.ToggleInput,
        onChange: function onChange(node, value) {
            if (value == 'on') {
                (0, _calendar.setOnclickAttr)(node);
            } else {
                (0, _calendar.cloneWithoutOnclick)(node);
            }
        },

        data: {
            on: 'on',
            off: 'off'
        }
    }]
};

exports.default = calendar;

},{"../../inputs/inputs":170,"../../util/calendar":177,"../common":138,"../inputTypes":141}],99:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"dup":60}],98:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"../../inputs/inputs":170,"dup":59}],97:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../../inputs/inputs');

var _common = require('../common');

var _ids = require('./ids');

var button = {
    classes: ["btn", "btn-link", 'btn@oee'],
    name: "Button",
    image: "icons/button.svg",
    html: '<button ' + _common.dataComponentId + '=' + _ids.buttonid + ' ' + _common.dataButtonId + ' type="button" class="draggable">\n            <span class="glyphicon glyphicon-search">Search</span>\n           </button>',
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
        name: 'onclick',
        key: 'onclick',
        htmlAttr: 'onclick',
        inputtype: _inputs.TextInput
    }, {
        name: 'Data Url',
        key: 'dataUrl',
        htmlAttr: 'data-url',
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

},{"../../inputs/inputs":170,"../common":138,"./ids":112}],96:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"dup":57}],95:[function(require,module,exports){
arguments[4][56][0].apply(exports,arguments)
},{"../../inputs/inputs":170,"dup":56}],94:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"../../inputs/inputs":170,"dup":55}],93:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../../inputs/inputs');

var _ids = require('./ids');

var _common = require('../common');

var autoselectinput = {
    nodes: ["select"],
    name: "Auto Select Input",
    image: "icons/select_input.svg",
    html: '<div class="everyOutbox-right draggable">\n            <div class="btn-group">\n                <div class="dailyBox">\n                    <select ' + _common.dataAutoSelectId + ' ' + _common.dataComponentId + '="' + _ids.autoselectinputid + '" class="form-control fundodooSelect" lustyle="height: 2.8rem;width:13rem">\n                    </select>\n                </div>\n            </div>\n           </div>\n    ',
    properties: [{
        name: 'Value Mapping',
        key: 'valueMapping',
        htmlAttr: _common.dataValueMapping,
        inputtype: _inputs.TextInput
    }, {
        name: 'Text Mapping',
        key: 'textMaping',
        htmlAttr: _common.dataTextMapping,
        inputtype: _inputs.TextInput
    }, {
        name: "Data Url",
        key: "dataUrl",
        htmlAttr: _common.dataUrl,
        inputtype: _inputs.TextInput
    }]
};

exports.default = autoselectinput;

},{"../../inputs/inputs":170,"../common":138,"./ids":112}],112:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
var manualselectinputid = 'html/manualselectinput@oee';
var autoselectinputid = 'html/autoselectinput@oee';
var buttonid = 'html/button@oee';

exports.manualselectinputid = manualselectinputid;
exports.autoselectinputid = autoselectinputid;
exports.buttonid = buttonid;

},{}],92:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"../../inputs/inputs":170,"dup":54}],63:[function(require,module,exports){
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

},{"../../inputs/inputs":170,"../common":138,"../inputTypes":141}],141:[function(require,module,exports){
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

},{"../../inputs/inputs":170}],88:[function(require,module,exports){
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

},{"../../inputs/inputs":170}],86:[function(require,module,exports){
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

},{"../../inputs/inputs":170}],83:[function(require,module,exports){
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

},{"../../builder":52,"../../inputs/inputs":170}],82:[function(require,module,exports){
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

},{"../../inputs/inputs":170,"../common":138}],81:[function(require,module,exports){
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

},{"../../inputs/inputs":170,"../common":138}],80:[function(require,module,exports){
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

},{"../../inputs/inputs":170}],79:[function(require,module,exports){
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

},{"../../inputs/inputs":170}],78:[function(require,module,exports){
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

},{"../../inputs/inputs":170,"../common":138}],77:[function(require,module,exports){
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

},{"../../inputs/inputs":170}],74:[function(require,module,exports){
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

},{"../../inputs/inputs":170}],73:[function(require,module,exports){
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

},{"../../builder":52,"../../inputs/inputs":170}],71:[function(require,module,exports){
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

},{"../../inputs/inputs":170,"../common":138}],69:[function(require,module,exports){
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

},{"../../inputs/inputs":170}],68:[function(require,module,exports){
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

},{"../../inputs/inputs":170}],67:[function(require,module,exports){
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

},{"../../inputs/inputs":170}],66:[function(require,module,exports){
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

},{"../../inputs/inputs":170,"../common":138}],64:[function(require,module,exports){
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

},{"../../inputs/inputs":170,"../common":138}],62:[function(require,module,exports){
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

},{"../../inputs/inputs":170}],61:[function(require,module,exports){
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

},{"../../inputs/inputs":170}],58:[function(require,module,exports){
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

},{"../../inputs/inputs":170}],57:[function(require,module,exports){
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

},{"../../inputs/inputs":170}],55:[function(require,module,exports){
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

},{"../../inputs/inputs":170}],54:[function(require,module,exports){
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

},{"../../inputs/inputs":170}]},{},[53])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGNvbXBvbmVudHMuanMiLCJzcmNcXGNvbXBvbmVudHNcXHR5cG9ncmFwaHkuanMiLCJzcmNcXGNvbXBvbmVudHNcXHNpemUuanMiLCJzcmNcXGNvbXBvbmVudHNcXHBhZGRpbmcuanMiLCJzcmNcXGNvbXBvbmVudHNcXG1hcmdpbi5qcyIsInNyY1xcY29tcG9uZW50c1xcZWxlbWVudC5qcyIsInNyY1xcY29tcG9uZW50c1xcZGlzcGxheS5qcyIsInNyY1xcY29tcG9uZW50c1xcYm9yZGVyLmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxjb21wb25lbnRzLmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFx0ZXh0aW5wdXQuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXHRleHQuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXHNwYW4uanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXHNlbGVjdGlucHV0LmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxyYWRpb2J1dHRvbi5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcbWFudWFsc2VsZWN0aW5wdXQuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGxhYmVsZGl2LmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxjaGVja2JveC5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcY2FsZW5kYXIuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGJ1dHRvbi5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcYXV0b3NlbGVjdGlucHV0LmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxpZHMuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxjb21wb25lbnRzLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGV4dGlucHV0LmpzIiwic3JjXFxjb21wb25lbnRzXFxpbnB1dFR5cGVzLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGV4dGFyZWFpbnB1dC5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXHRhYmxlcm93LmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGFibGVoZWFkZXJjZWxsLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGFibGVoZWFkLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGFibGVjZWxsLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGFibGVib2R5LmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGFibGUuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxzZWxlY3RpbnB1dC5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXHJhZGlvYnV0dG9uLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxccHJvZ3Jlc3MuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxwYWdpbmF0aW9uLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxccGFnZWl0ZW0uanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxuYXZiYXIuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxsaXN0aXRlbS5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGxpc3Rncm91cC5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGxpbmsuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxsYWJlbC5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGp1bWJvdHJvbi5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGltYWdlLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcaHIuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxoZWFkaW5nLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcZ3JpZHJvdy5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGdyaWRjb2x1bW4uanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxmb3JtLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcZmlsZWlucHV0LmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcZGl2LmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcY29udGFpbmVyLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcY2hlY2tib3guanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxjYXJkLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcYnV0dG9udG9vbGJhci5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGJ1dHRvbmdyb3VwLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcYnV0dG9uLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcYnJlYWRjcnVtYnMuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxicmVhZGNydW1iaXRlbS5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGJhZGdlLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcYWxlcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7OztBQUNBOztJQUFZLFE7O0FBQ1o7O0lBQVksSTs7QUFDWjs7SUFBWSxROztBQUNaOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLGtCQUFNLGVBQU4sQ0FBc0IsTUFBdEIsSUFDSSxDQUFDLG1CQUFELEVBQXNCLFNBQVMsUUFBL0IsRUFBeUMsb0JBQXpDLEVBQStELG1CQUEvRCxFQUFvRixTQUFTLGlCQUE3RixFQUFnSCxTQUFTLG1CQUF6SCxFQUNJLHNCQURKLEVBQzRCLG1CQUQ1QixFQUNpRCxn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QUssTUFGSTtBQUdULGtCQUFVLE9BSEQ7QUFJVCxxQkFBYSxDQUFDLGVBQUQsRUFBa0IsaUJBQWxCLEVBQXFDLGVBQXJDLEVBQXNELGNBQXRELEVBQXNFLGVBQXRFLEVBQXVGLFlBQXZGLEVBQXFHLGFBQXJHLEVBQW9ILFlBQXBILENBSko7QUFLVCxtQkFBVyxtQkFMRjtBQU1ULGNBQU07QUFDRixxQkFBUyxDQUFDO0FBQ04sdUJBQU8sZUFERDtBQUVOLHNCQUFNO0FBRkEsYUFBRCxFQUdOO0FBQ0MsdUJBQU8saUJBRFI7QUFFQyxzQkFBTTtBQUZQLGFBSE0sRUFNTjtBQUNDLHVCQUFPLGVBRFI7QUFFQyxzQkFBTTtBQUZQLGFBTk0sRUFTTjtBQUNDLHVCQUFPLGNBRFI7QUFFQyxzQkFBTTtBQUZQLGFBVE0sRUFZTjtBQUNDLHVCQUFPLGVBRFI7QUFFQyxzQkFBTTtBQUZQLGFBWk0sRUFlTjtBQUNDLHVCQUFPLFlBRFI7QUFFQyxzQkFBTTtBQUZQLGFBZk0sRUFrQk47QUFDQyx1QkFBTyxhQURSO0FBRUMsc0JBQU07QUFGUCxhQWxCTSxFQXFCTjtBQUNDLHVCQUFPLFlBRFI7QUFFQyxzQkFBTTtBQUZQLGFBckJNO0FBRFA7QUFORyxLQUFEO0FBVkYsQ0FBZDs7a0JBOENlLEsiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFZ2dmViIGZyb20gJy4vYnVpbGRlcic7XHJcbmltcG9ydCAqIGFzIF9nZW5lcmFsIGZyb20gJy4vY29tcG9uZW50cy9AZ2VuZXJhbC9jb21wb25lbnRzJztcclxuaW1wb3J0ICogYXMgX29lZSBmcm9tICcuL2NvbXBvbmVudHMvQG9lZS9jb21wb25lbnRzJztcclxuaW1wb3J0ICogYXMgX29lZV9pZHMgZnJvbSAnLi9jb21wb25lbnRzL0BvZWUvaWRzJztcclxuaW1wb3J0IGVsZW1lbnQgZnJvbSAnLi9jb21wb25lbnRzL2VsZW1lbnQnO1xyXG5pbXBvcnQgYm9yZGVyIGZyb20gJy4vY29tcG9uZW50cy9ib3JkZXInO1xyXG5pbXBvcnQgcGFkZGluZyBmcm9tICcuL2NvbXBvbmVudHMvcGFkZGluZyc7XHJcbmltcG9ydCBkaXNwbGF5IGZyb20gJy4vY29tcG9uZW50cy9kaXNwbGF5JztcclxuaW1wb3J0IHR5cG9ncmFwaHkgZnJvbSAnLi9jb21wb25lbnRzL3R5cG9ncmFwaHknO1xyXG5pbXBvcnQgc2l6ZSBmcm9tICcuL2NvbXBvbmVudHMvc2l6ZSc7XHJcbmltcG9ydCBtYXJnaW4gZnJvbSAnLi9jb21wb25lbnRzL21hcmdpbic7XHJcblxyXG5WdnZlYi5Db21wb25lbnRzR3JvdXBbJ+WumuWItue7hOS7tiddID1cclxuICAgIFsnaHRtbC9sYWJlbGRpdkBvZWUnLCBfb2VlX2lkcy5idXR0b25pZCwgJ2h0bWwvdGV4dGlucHV0QG9lZScsICdodG1sL2NhbGVuZGFyQG9lZScsIF9vZWVfaWRzLmF1dG9zZWxlY3RpbnB1dGlkLCBfb2VlX2lkcy5tYW51YWxzZWxlY3RpbnB1dGlkLFxyXG4gICAgICAgICdodG1sL3JhZGlvYnV0dG9uQG9lZScsICdodG1sL2NoZWNrYm94QG9lZScsICdodG1sL3RhYmxlQG9lZSddO1xyXG5cclxuVnZ2ZWIuQ29tcG9uZW50c0dyb3VwWyfpgJrnlKjnu4Tku7YnXSA9XHJcbiAgICBbJ2h0bWwvbGFiZWxAZ2VuZXJhbCcsICdodG1sL2RpdkBnZW5lcmFsJywgJ2h0bWwvYnV0dG9uQGdlbmVyYWwnLCAnaHRtbC9idXR0b25ncm91cEBnZW5lcmFsJyxcclxuICAgICAgICAnaHRtbC9idXR0b250b29sYmFyQGdlbmVyYWwnLCAnaHRtbC9mb3JtQGdlbmVyYWwnLCAnaHRtbC90ZXh0aW5wdXRAZ2VuZXJhbCcsICdodG1sL3RleHRhcmVhaW5wdXRAZ2VuZXJhbCcsXHJcbiAgICAgICAgJ2h0bWwvc2VsZWN0aW5wdXRAZ2VuZXJhbCcsICdodG1sL2ZpbGVpbnB1dEBnZW5lcmFsJywgJ2h0bWwvY2hlY2tib3hAZ2VuZXJhbCcsICdodG1sL3JhZGlvYnV0dG9uQGdlbmVyYWwnLFxyXG4gICAgICAgICdodG1sL3RhYmxlQGdlbmVyYWwnLCAnaHRtbC9oZWFkaW5nQGdlbmVyYWwnLCAnaHRtbC9pbWFnZUBnZW5lcmFsJywgJ2h0bWwvanVtYm90cm9uQGdlbmVyYWwnLFxyXG4gICAgICAgICdodG1sL2FsZXJ0QGdlbmVyYWwnLCAnaHRtbC9jYXJkQGdlbmVyYWwnLCAnaHRtbC9saXN0Z3JvdXBAZ2VuZXJhbCcsICdodG1sL2hyQGdlbmVyYWwnLCAnaHRtbC90YWdsYWJlbEBnZW5lcmFsJyxcclxuICAgICAgICAnaHRtbC9iYWRnZUBnZW5lcmFsJywgJ2h0bWwvcHJvZ3Jlc3NAZ2VuZXJhbCcsICdodG1sL25hdmJhckBnZW5lcmFsJywgJ2h0bWwvYnJlYWRjcnVtYnNAZ2VuZXJhbCcsICdodG1sL3BhZ2luYXRpb25AZ2VuZXJhbCcsXHJcbiAgICAgICAgJ2h0bWwvY29udGFpbmVyQGdlbmVyYWwnLCAnaHRtbC9ncmlkcm93QGdlbmVyYWwnXTtcclxuXHJcblZ2dmViLkNvbXBvbmVudHMuYWRkKFwiX2Jhc2VcIiwgZWxlbWVudCk7XHJcbi8vZGlzcGxheVxyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiX2Jhc2VcIiwgZGlzcGxheSk7XHJcbi8vVHlwb2dyYXBoeVxyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiX2Jhc2VcIiwgdHlwb2dyYXBoeSlcclxuLy9TaXplXHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJfYmFzZVwiLCBzaXplKTtcclxuLy9NYXJnaW5cclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcIl9iYXNlXCIsIG1hcmdpbik7XHJcbi8vUGFkZGluZ1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiX2Jhc2VcIiwgcGFkZGluZyk7XHJcbi8vQm9yZGVyXHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJfYmFzZVwiLCBib3JkZXIpO1xyXG5cclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvZGl2QGdlbmVyYWxcIiwgX2dlbmVyYWwuZGl2KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvbGFiZWxAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5sYWJlbCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2J1dHRvbkBnZW5lcmFsXCIsIF9nZW5lcmFsLmJ1dHRvbik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2NvbnRhaW5lckBnZW5lcmFsXCIsIF9nZW5lcmFsLmNvbnRhaW5lcik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2hlYWRpbmdAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5oZWFkaW5nKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvbGlua0BnZW5lcmFsXCIsIF9nZW5lcmFsLmxpbmspO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9pbWFnZUBnZW5lcmFsXCIsIF9nZW5lcmFsLmltYWdlKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5hZGQoXCJodG1sL2hyQGdlbmVyYWxcIiwgX2dlbmVyYWwuaHIpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9idXR0b25ncm91cEBnZW5lcmFsXCIsIF9nZW5lcmFsLmJ1dHRvbmdyb3VwKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvYnV0dG9udG9vbGJhckBnZW5lcmFsXCIsIF9nZW5lcmFsLmJ1dHRvbnRvb2xiYXIpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9hbGVydEBnZW5lcmFsXCIsIF9nZW5lcmFsLmFsZXJ0KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvYmFkZ2VAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5iYWRnZSk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2NhcmRAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5jYXJkKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvbGlzdGdyb3VwQGdlbmVyYWxcIiwgX2dlbmVyYWwubGlzdGdyb3VwKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvbGlzdGl0ZW1AZ2VuZXJhbFwiLCBfZ2VuZXJhbC5saXN0aXRlbSk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2JyZWFkY3J1bWJzQGdlbmVyYWxcIiwgX2dlbmVyYWwuYnJlYWRjcnVtYnMpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9icmVhZGNydW1iaXRlbUBnZW5lcmFsXCIsIF9nZW5lcmFsLmJyZWFkY3J1bWJpdGVtKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvcGFnaW5hdGlvbkBnZW5lcmFsXCIsIF9nZW5lcmFsLnBhZ2luYXRpb24pO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9wYWdlaXRlbUBnZW5lcmFsXCIsIF9nZW5lcmFsLnBhZ2VpdGVtKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvcHJvZ3Jlc3NAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5wcm9ncmVzcyk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2p1bWJvdHJvbkBnZW5lcmFsXCIsIF9nZW5lcmFsLmp1bWJvdHJvbik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL25hdmJhckBnZW5lcmFsXCIsIF9nZW5lcmFsLm5hdmJhcik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2Zvcm1AZ2VuZXJhbFwiLCBfZ2VuZXJhbC5mb3JtKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvdGV4dGlucHV0QGdlbmVyYWxcIiwgX2dlbmVyYWwudGV4dGlucHV0KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvc2VsZWN0aW5wdXRAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5zZWxlY3RpbnB1dCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL3RleHRhcmVhaW5wdXRAZ2VuZXJhbFwiLCBfZ2VuZXJhbC50ZXh0YXJlYWlucHV0KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvcmFkaW9idXR0b25AZ2VuZXJhbFwiLCBfZ2VuZXJhbC5yYWRpb2J1dHRvbik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2NoZWNrYm94QGdlbmVyYWxcIiwgX2dlbmVyYWwuY2hlY2tib3gpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9maWxlaW5wdXRAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5maWxlaW5wdXQpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC90YWJsZUBnZW5lcmFsXCIsIF9nZW5lcmFsLnRhYmxlKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvdGFibGVyb3dAZ2VuZXJhbFwiLCBfZ2VuZXJhbC50YWJsZXJvdyk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL3RhYmxlY2VsbEBnZW5lcmFsXCIsIF9nZW5lcmFsLnRhYmxlY2VsbCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL3RhYmxlaGVhZGVyY2VsbEBnZW5lcmFsXCIsIF9nZW5lcmFsLnRhYmxlaGVhZGVyY2VsbCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL3RhYmxlaGVhZEBnZW5lcmFsXCIsIF9nZW5lcmFsLnRhYmxlaGVhZCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL3RhYmxlYm9keUBnZW5lcmFsXCIsIF9nZW5lcmFsLnRhYmxlYm9keSk7XHJcblZ2dmViLkNvbXBvbmVudHMuYWRkKFwiaHRtbC9ncmlkY29sdW1uQGdlbmVyYWxcIiwgX2dlbmVyYWwuZ3JpZGNvbHVtbik7XHJcblZ2dmViLkNvbXBvbmVudHMuYWRkKFwiaHRtbC9ncmlkcm93QGdlbmVyYWxcIiwgX2dlbmVyYWwuZ3JpZHJvdyk7XHJcblxyXG5WdnZlYi5Db21wb25lbnRzLmFkZCgnaHRtbC9sYWJlbGRpdkBvZWUnLCBfb2VlLmxhYmVsZGl2KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgJ2h0bWwvdGV4dGlucHV0QG9lZScsIF9vZWUudGV4dGlucHV0KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgX29lZV9pZHMuYnV0dG9uaWQsIF9vZWUuYnV0dG9uKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgJ2h0bWwvcmFkaW9idXR0b25Ab2VlJywgX29lZS5yYWRpb2J1dHRvbik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKCdfYmFzZScsICdodG1sL3NwYW5Ab2VlJywgX29lZS5zcGFuKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgJ2h0bWwvY2hlY2tib3hAb2VlJywgX29lZS5jaGVja2JveCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKCdfYmFzZScsICdodG1sL3NlbGVjdGlucHV0QG9lZScsIF9vZWUuc2VsZWN0aW5wdXQpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZCgnX2Jhc2UnLCAnaHRtbC90YWJsZUBvZWUnLCBfb2VlLnRhYmxlKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgJ2h0bWwvY2FsZW5kYXJAb2VlJywgX29lZS5jYWxlbmRhcik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKCdfYmFzZScsICdodG1sL3RleHRAb2VlJywgX29lZS50ZXh0KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgX29lZV9pZHMuYXV0b3NlbGVjdGlucHV0aWQsIF9vZWUuYXV0b3NlbGVjdGlucHV0KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgX29lZV9pZHMubWFudWFsc2VsZWN0aW5wdXRpZCwgX29lZS5tYW51YWxzZWxlY3RpbnB1dCk7XHJcblxyXG4iLCJpbXBvcnQgeyBTZWN0aW9uSW5wdXQsIFNlbGVjdElucHV0LCBSYWRpb0J1dHRvbklucHV0LCBDc3NVbml0SW5wdXQsIENvbG9ySW5wdXQgfSBmcm9tICcuLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgaW5jX2Jhc2Vfc29ydCB9IGZyb20gJy4vY29tbW9uJztcclxuXHJcbmNvbnN0IHR5cG9ncmFwaHkgPSB7XHJcbiAgICBwcm9wZXJ0aWVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBrZXk6IFwidHlwb2dyYXBoeV9oZWFkZXJcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWN0aW9uSW5wdXQsXHJcbiAgICAgICAgICAgIG5hbWU6IGZhbHNlLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGRhdGE6IHsgaGVhZGVyOiBcIlR5cG9ncmFwaHlcIiB9LFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJGb250IGZhbWlseVwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiZm9udC1mYW1pbHlcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWZcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkFyaWFsXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ0x1Y2lkYSBTYW5zIFVuaWNvZGVcIiwgXCJMdWNpZGEgR3JhbmRlXCIsIHNhbnMtc2VyaWYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdMdWNpZGEgR3JhbmRlJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnUGFsYXRpbm8gTGlub3R5cGVcIiwgXCJCb29rIEFudGlxdWFcIiwgUGFsYXRpbm8sIHNlcmlmJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnUGFsYXRpbm8gTGlub3R5cGUnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdcIlRpbWVzIE5ldyBSb21hblwiLCBUaW1lcywgc2VyaWYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdUaW1lcyBOZXcgUm9tYW4nXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiR2VvcmdpYSwgc2VyaWZcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkdlb3JnaWEsIHNlcmlmXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJUYWhvbWEsIEdlbmV2YSwgc2Fucy1zZXJpZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiVGFob21hXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ0NvbWljIFNhbnMgTVMsIGN1cnNpdmUsIHNhbnMtc2VyaWYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdDb21pYyBTYW5zJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnVmVyZGFuYSwgR2VuZXZhLCBzYW5zLXNlcmlmJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnVmVyZGFuYSdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ0ltcGFjdCwgQ2hhcmNvYWwsIHNhbnMtc2VyaWYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdJbXBhY3QnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdBcmlhbCBCbGFjaywgR2FkZ2V0LCBzYW5zLXNlcmlmJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQXJpYWwgQmxhY2snXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdUcmVidWNoZXQgTVMsIEhlbHZldGljYSwgc2Fucy1zZXJpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1RyZWJ1Y2hldCdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ0NvdXJpZXIgTmV3XCIsIENvdXJpZXIsIG1vbm9zcGFjZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0NvdXJpZXIgTmV3XCIsIENvdXJpZXIsIG1vbm9zcGFjZSdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ0JydXNoIFNjcmlwdCBNVCwgc2Fucy1zZXJpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0JydXNoIFNjcmlwdCdcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiRm9udCB3ZWlnaHRcIixcclxuICAgICAgICAgICAga2V5OiBcImZvbnQtd2VpZ2h0XCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiA2LFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCIxMDBcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlRoaW5cIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjIwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRXh0cmEtTGlnaHRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjMwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiTGlnaHRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjQwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiTm9ybWFsXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI1MDBcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIk1lZGl1bVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiNjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJTZW1pLUJvbGRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjcwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQm9sZFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiODAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJFeHRyYS1Cb2xkXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI5MDBcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlVsdHJhLUJvbGRcIlxyXG4gICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiVGV4dCBhbGlnblwiLFxyXG4gICAgICAgICAgICBrZXk6IFwidGV4dC1hbGlnblwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogMTIsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBSYWRpb0J1dHRvbklucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBleHRyYWNsYXNzOiBcImJ0bi1ncm91cC1zbSBidG4tZ3JvdXAtZnVsbHdpZHRoXCIsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0OiBcIk5vbmVcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJOb25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJsZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0OiBcIkxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJMZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJsYSBsYS1hbGlnbi1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0OiBcIkNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtYWxpZ24tY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwiUmlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJSaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtYWxpZ24tcmlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJqdXN0aWZ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0OiBcImp1c3RpZnlcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJKdXN0aWZ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJsYSBsYS1hbGlnbi1qdXN0aWZ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiTGluZSBoZWlnaHRcIixcclxuICAgICAgICAgICAga2V5OiBcImxpbmUtaGVpZ2h0XCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiA2LFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkxldHRlciBzcGFjaW5nXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJsZXR0ZXItc3BhY2luZ1wiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJUZXh0IGRlY29yYXRpb25cIixcclxuICAgICAgICAgICAga2V5OiBcInRleHQtZGVjb3JhdGlvbi1saW5lXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiAxMixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFJhZGlvQnV0dG9uSW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGV4dHJhY2xhc3M6IFwiYnRuLWdyb3VwLXNtIGJ0bi1ncm91cC1mdWxsd2lkdGhcIixcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwiTm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk5vbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInVuZGVybGluZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJMZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwidW5kZXJsaW5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJsYSBsYS1sb25nLWFycm93LWRvd25cIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJvdmVybGluZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJSaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIm92ZXJsaW5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJsYSBsYS1sb25nLWFycm93LXVwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwibGluZS10aHJvdWdoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0OiBcIlJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTGluZSBUaHJvdWdoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJsYSBsYS1zdHJpa2V0aHJvdWdoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidW5kZXJsaW5lIG92ZXJsaW5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0OiBcImp1c3RpZnlcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJVbmRlcmxpbmUgT3ZlcmxpbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWFycm93cy12XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiRGVjb3JhdGlvbiBDb2xvclwiLFxyXG4gICAgICAgICAgICBrZXk6IFwidGV4dC1kZWNvcmF0aW9uLWNvbG9yXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiA2LFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ29sb3JJbnB1dCxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiRGVjb3JhdGlvbiBzdHlsZVwiLFxyXG4gICAgICAgICAgICBrZXk6IFwidGV4dC1kZWNvcmF0aW9uLXN0eWxlXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiA2LFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJzb2xpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiU29saWRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIndhdnlcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIldhdnlcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImRvdHRlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRG90dGVkXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJkYXNoZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhc2hlZFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiZG91YmxlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEb3VibGVcIlxyXG4gICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHlwb2dyYXBoeTsiLCJpbXBvcnQgeyBTZWN0aW9uSW5wdXQsIENzc1VuaXRJbnB1dCB9IGZyb20gJy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBpbmNfYmFzZV9zb3J0IH0gZnJvbSAnLi9jb21tb24nO1xyXG5cclxuY29uc3Qgc2l6ZSA9IHtcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAga2V5OiBcInNpemVfaGVhZGVyXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWN0aW9uSW5wdXQsXHJcbiAgICAgICAgbmFtZTogZmFsc2UsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGRhdGE6IHsgaGVhZGVyOiBcIlNpemVcIiwgZXhwYW5kZWQ6IGZhbHNlIH0sXHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJXaWR0aFwiLFxyXG4gICAgICAgIGtleTogXCJ3aWR0aFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkhlaWdodFwiLFxyXG4gICAgICAgIGtleTogXCJoZWlnaHRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJNaW4gV2lkdGhcIixcclxuICAgICAgICBrZXk6IFwibWluLXdpZHRoXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiTWluIEhlaWdodFwiLFxyXG4gICAgICAgIGtleTogXCJtaW4taGVpZ2h0XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiTWF4IFdpZHRoXCIsXHJcbiAgICAgICAga2V5OiBcIm1heC13aWR0aFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIk1heCBIZWlnaHRcIixcclxuICAgICAgICBrZXk6IFwibWF4LWhlaWdodFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzaXplOyIsImltcG9ydCB7IFNlY3Rpb25JbnB1dCwgQ3NzVW5pdElucHV0IH0gZnJvbSAnLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGluY19iYXNlX3NvcnQgfSBmcm9tICcuL2NvbW1vbic7XHJcblxyXG5jb25zdCBwYWRkaW5nID0ge1xyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBrZXk6IFwicGFkZGluZ3NfaGVhZGVyXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWN0aW9uSW5wdXQsXHJcbiAgICAgICAgbmFtZTogZmFsc2UsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGRhdGE6IHsgaGVhZGVyOiBcIlBhZGRpbmdcIiwgZXhwYW5kZWQ6IGZhbHNlIH0sXHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJUb3BcIixcclxuICAgICAgICBrZXk6IFwicGFkZGluZy10b3BcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJSaWdodFwiLFxyXG4gICAgICAgIGtleTogXCJwYWRkaW5nLXJpZ2h0XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiQm90dG9tXCIsXHJcbiAgICAgICAga2V5OiBcInBhZGRpbmctYm90dG9tXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiTGVmdFwiLFxyXG4gICAgICAgIGtleTogXCJwYWRkaW5nLUxlZnRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGFkZGluZzsiLCJpbXBvcnQgeyBTZWN0aW9uSW5wdXQsIENzc1VuaXRJbnB1dCB9IGZyb20gJy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBpbmNfYmFzZV9zb3J0IH0gZnJvbSAnLi9jb21tb24nO1xyXG5cclxuY29uc3QgbWFyZ2luID0ge1xyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBrZXk6IFwibWFyZ2luc19oZWFkZXJcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlY3Rpb25JbnB1dCxcclxuICAgICAgICBuYW1lOiBmYWxzZSxcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgZGF0YTogeyBoZWFkZXI6IFwiTWFyZ2luXCIsIGV4cGFuZGVkOiBmYWxzZSB9LFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiVG9wXCIsXHJcbiAgICAgICAga2V5OiBcIm1hcmdpbi10b3BcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJSaWdodFwiLFxyXG4gICAgICAgIGtleTogXCJtYXJnaW4tcmlnaHRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJCb3R0b21cIixcclxuICAgICAgICBrZXk6IFwibWFyZ2luLWJvdHRvbVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkxlZnRcIixcclxuICAgICAgICBrZXk6IFwibWFyZ2luLUxlZnRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWFyZ2luOyIsImltcG9ydCB7IFNlY3Rpb25JbnB1dCwgVGV4dElucHV0IH0gZnJvbSAnLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGluY19iYXNlX3NvcnQgfSBmcm9tICcuL2NvbW1vbic7XHJcblxyXG5jb25zdCBlbGVtZW50ID0ge1xyXG4gICAgbmFtZTogXCJFbGVtZW50XCIsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIGtleTogXCJlbGVtZW50X2hlYWRlclwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VjdGlvbklucHV0LFxyXG4gICAgICAgIG5hbWU6IGZhbHNlLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBkYXRhOiB7IGhlYWRlcjogXCJHZW5lcmFsXCIgfSxcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIklkXCIsXHJcbiAgICAgICAga2V5OiBcImlkXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiaWRcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiQ2xhc3NcIixcclxuICAgICAgICBrZXk6IFwiY2xhc3NcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9XHJcbiAgICBdXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBlbGVtZW50OyIsImltcG9ydCB7IGluY19iYXNlX3NvcnQgfSBmcm9tICcuL2NvbW1vbic7XHJcbmltcG9ydCB7IFNlY3Rpb25JbnB1dCwgU2VsZWN0SW5wdXQsIFJhZGlvQnV0dG9uSW5wdXQsIENzc1VuaXRJbnB1dCwgQ29sb3JJbnB1dCwgUmFuZ2VJbnB1dCB9IGZyb20gJy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgZGlzcGxheSAgPSB7XHJcbiAgICBwcm9wZXJ0aWVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBrZXk6IFwiZGlzcGxheV9oZWFkZXJcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWN0aW9uSW5wdXQsXHJcbiAgICAgICAgICAgIG5hbWU6IGZhbHNlLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGRhdGE6IHsgaGVhZGVyOiBcIkRpc3BsYXlcIiB9LFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJEaXNwbGF5XCIsXHJcbiAgICAgICAgICAgIGtleTogXCJkaXNwbGF5XCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiA2LFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJibG9ja1wiLCBcImlubGluZVwiLCBcImlubGluZS1ibG9ja1wiLCBcIm5vbmVcIl0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiYmxvY2tcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkJsb2NrXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJpbmxpbmVcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIklubGluZVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiaW5saW5lLWJsb2NrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJJbmxpbmUgQmxvY2tcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIm5vbmVcIlxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJQb3NpdGlvblwiLFxyXG4gICAgICAgICAgICBrZXk6IFwicG9zaXRpb25cIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFtcInN0YXRpY1wiLCBcImZpeGVkXCIsIFwicmVsYXRpdmVcIiwgXCJhYnNvbHV0ZVwiXSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJzdGF0aWNcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlN0YXRpY1wiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiZml4ZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkZpeGVkXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZWxhdGl2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiUmVsYXRpdmVcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImFic29sdXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJBYnNvbHV0ZVwiXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlRvcFwiLFxyXG4gICAgICAgICAgICBrZXk6IFwidG9wXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiA2LFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIHBhcmVudDogXCJcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiTGVmdFwiLFxyXG4gICAgICAgICAgICBrZXk6IFwibGVmdFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IFwiXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkJvdHRvbVwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiYm90dG9tXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiA2LFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIHBhcmVudDogXCJcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiUmlnaHRcIixcclxuICAgICAgICAgICAga2V5OiBcInJpZ2h0XCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiA2LFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIHBhcmVudDogXCJcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiRmxvYXRcIixcclxuICAgICAgICAgICAga2V5OiBcImZsb2F0XCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiAxMixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFJhZGlvQnV0dG9uSW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGV4dHJhY2xhc3M6IFwiYnRuLWdyb3VwLXNtIGJ0bi1ncm91cC1mdWxsd2lkdGhcIixcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwiTm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk5vbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwiTGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWFsaWduLWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJSaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJsYSBsYS1hbGlnbi1yaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiT3BhY2l0eVwiLFxyXG4gICAgICAgICAgICBrZXk6IFwib3BhY2l0eVwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogMTIsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgcGFyZW50OiBcIlwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFJhbmdlSW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG1heDogMSwgLy9tYXggem9vbSBsZXZlbFxyXG4gICAgICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICAgICAgc3RlcDogMC4xXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkJhY2tncm91bmQgQ29sb3JcIixcclxuICAgICAgICAgICAga2V5OiBcImJhY2tncm91bmQtY29sb3JcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDb2xvcklucHV0LFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJUZXh0IENvbG9yXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJjb2xvclwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENvbG9ySW5wdXQsXHJcbiAgICAgICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRpc3BsYXk7IiwiaW1wb3J0IHsgU2VjdGlvbklucHV0LCBTZWxlY3RJbnB1dCwgQ3NzVW5pdElucHV0LCBDb2xvcklucHV0IH0gZnJvbSAnLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGluY19iYXNlX3NvcnQgfSBmcm9tICcuL2NvbW1vbic7XHJcblxyXG5jb25zdCBib3JkZXIgPSB7XHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIGtleTogXCJib3JkZXJfaGVhZGVyXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWN0aW9uSW5wdXQsXHJcbiAgICAgICAgbmFtZTogZmFsc2UsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGRhdGE6IHsgaGVhZGVyOiBcIkJvcmRlclwiLCBleHBhbmRlZDogZmFsc2UgfSxcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlN0eWxlXCIsXHJcbiAgICAgICAga2V5OiBcImJvcmRlci1zdHlsZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogMTIsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJzb2xpZFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTb2xpZFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImRvdHRlZFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEb3R0ZWRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJkYXNoZWRcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGFzaGVkXCJcclxuICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiV2lkdGhcIixcclxuICAgICAgICBrZXk6IFwiYm9yZGVyLXdpZHRoXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiQ29sb3JcIixcclxuICAgICAgICBrZXk6IFwiYm9yZGVyLWNvbG9yXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBpbnB1dHR5cGU6IENvbG9ySW5wdXQsXHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYm9yZGVyOyIsImltcG9ydCBsYWJlbCBmcm9tICcuL2xhYmVsJztcclxuaW1wb3J0IHRleHRpbnB1dCBmcm9tICcuL3RleHRpbnB1dCc7XHJcbmltcG9ydCBidXR0b24gZnJvbSAnLi9idXR0b24nO1xyXG5pbXBvcnQgZGl2IGZyb20gJy4vZGl2JztcclxuaW1wb3J0IGNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcic7XHJcbmltcG9ydCBhbGVydCBmcm9tICcuL2FsZXJ0JztcclxuaW1wb3J0IGJhZGdlIGZyb20gJy4vYmFkZ2UnO1xyXG5pbXBvcnQgYnJlYWRjcnVtYml0ZW0gZnJvbSAnLi9icmVhZGNydW1iaXRlbSc7XHJcbmltcG9ydCBicmVhZGNydW1icyBmcm9tICcuL2JyZWFkY3J1bWJzJztcclxuaW1wb3J0IGJ1dHRvbmdyb3VwIGZyb20gJy4vYnV0dG9uZ3JvdXAnO1xyXG5pbXBvcnQgYnV0dG9udG9vbGJhciBmcm9tICcuL2J1dHRvbnRvb2xiYXInO1xyXG5pbXBvcnQgY2FyZCBmcm9tICcuL2NhcmQnO1xyXG5pbXBvcnQgY2hlY2tib3ggZnJvbSAnLi9jaGVja2JveCc7XHJcbmltcG9ydCBmaWxlaW5wdXQgZnJvbSAnLi9maWxlaW5wdXQnO1xyXG5pbXBvcnQgZm9ybSBmcm9tICcuL2Zvcm0nO1xyXG5pbXBvcnQgZ3JpZGNvbHVtbiBmcm9tICcuL2dyaWRjb2x1bW4nO1xyXG5pbXBvcnQgZ3JpZHJvdyBmcm9tICcuL2dyaWRyb3cnO1xyXG5pbXBvcnQgaGVhZGluZyBmcm9tICcuL2hlYWRpbmcnO1xyXG5pbXBvcnQgaHIgZnJvbSAnLi9ocic7XHJcbmltcG9ydCBpbWFnZSBmcm9tICcuL2ltYWdlJztcclxuaW1wb3J0IGp1bWJvdHJvbiBmcm9tICcuL2p1bWJvdHJvbic7XHJcbmltcG9ydCBsaW5rIGZyb20gJy4vbGluayc7XHJcbmltcG9ydCBsaXN0Z3JvdXAgZnJvbSAnLi9saXN0Z3JvdXAnO1xyXG5pbXBvcnQgbGlzdGl0ZW0gZnJvbSAnLi9saXN0aXRlbSc7XHJcbmltcG9ydCBuYXZiYXIgZnJvbSAnLi9uYXZiYXInO1xyXG5pbXBvcnQgcGFnZWl0ZW0gZnJvbSAnLi9wYWdlaXRlbSc7XHJcbmltcG9ydCBwYWdpbmF0aW9uIGZyb20gJy4vcGFnaW5hdGlvbic7XHJcbmltcG9ydCBwcm9ncmVzcyBmcm9tICcuL3Byb2dyZXNzJztcclxuaW1wb3J0IHJhZGlvYnV0dG9uIGZyb20gJy4vcmFkaW9idXR0b24nO1xyXG5pbXBvcnQgc2VsZWN0aW5wdXQgZnJvbSAnLi9zZWxlY3RpbnB1dCc7XHJcbmltcG9ydCB0YWJsZWhlYWRlcmNlbGwgZnJvbSAnLi90YWJsZWhlYWRlcmNlbGwnO1xyXG5pbXBvcnQgdGFibGUgZnJvbSAnLi90YWJsZSc7XHJcbmltcG9ydCB0YWJsZWJvZHkgZnJvbSAnLi90YWJsZWJvZHknO1xyXG5pbXBvcnQgdGFibGVjZWxsIGZyb20gJy4vdGFibGVjZWxsJztcclxuaW1wb3J0IHRhYmxlaGVhZCBmcm9tICcuL3RhYmxlaGVhZCc7XHJcbmltcG9ydCB0YWJsZXJvdyBmcm9tICcuL3RhYmxlcm93JztcclxuaW1wb3J0IHRleHRhcmVhaW5wdXQgZnJvbSAnLi90ZXh0YXJlYWlucHV0JztcclxuaW1wb3J0IGxhYmVsZGl2IGZyb20gJy4vbGFiZWxkaXYnO1xyXG5pbXBvcnQgc3BhbiBmcm9tICcuL3NwYW4nO1xyXG5pbXBvcnQgY2FsZW5kYXIgZnJvbSAnLi9jYWxlbmRhcic7XHJcbmltcG9ydCB0ZXh0IGZyb20gJy4vdGV4dCc7XHJcbmltcG9ydCBhdXRvc2VsZWN0aW5wdXQgZnJvbSAnLi9hdXRvc2VsZWN0aW5wdXQnO1xyXG5pbXBvcnQgbWFudWFsc2VsZWN0aW5wdXQgZnJvbSAnLi9tYW51YWxzZWxlY3RpbnB1dCc7XHJcblxyXG5leHBvcnQge1xyXG4gICAgbGFiZWwsIHRleHRpbnB1dCwgYnV0dG9uLCBkaXYsIGNvbnRhaW5lciwgYWxlcnQsIGJhZGdlLCBicmVhZGNydW1iaXRlbSwgYnJlYWRjcnVtYnMsIGJ1dHRvbmdyb3VwLFxyXG4gICAgYnV0dG9udG9vbGJhciwgY2FyZCwgY2hlY2tib3gsIGZpbGVpbnB1dCwgZm9ybSwgZ3JpZGNvbHVtbiwgZ3JpZHJvdywgaGVhZGluZywgaHIsIGltYWdlLCBqdW1ib3Ryb24sXHJcbiAgICBsaW5rLCBsaXN0Z3JvdXAsIGxpc3RpdGVtLCBuYXZiYXIsIHBhZ2VpdGVtLCBwYWdpbmF0aW9uLCBwcm9ncmVzcywgcmFkaW9idXR0b24sIHNlbGVjdGlucHV0LCB0YWJsZWhlYWRlcmNlbGwsXHJcbiAgICB0YWJsZSwgdGFibGVib2R5LCB0YWJsZWNlbGwsIHRhYmxlaGVhZCwgdGFibGVyb3csIHRleHRhcmVhaW5wdXQsIGxhYmVsZGl2LCBzcGFuLCBjYWxlbmRhciwgdGV4dCxcclxuICAgIGF1dG9zZWxlY3RpbnB1dCwgbWFudWFsc2VsZWN0aW5wdXRcclxufTsiLCJpbXBvcnQgeyBUZXh0SW5wdXQsIFNlbGVjdElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGlucHV0VHlwZXMsIGlucHV0VHlwZU5hbWVzIH0gZnJvbSAnLi4vaW5wdXRUeXBlcyc7XHJcbmltcG9ydCB7IGRhdGFDb21wb25lbnRJZCB9IGZyb20gJy4uL2NvbW1vbic7XHJcblxyXG5jb25zdCB0ZXh0aW5wdXQgPSB7XHJcbiAgICBuYW1lOiBcIlRleHQgSW5wdXRcIixcclxuICAgIGF0dHJpYnV0ZXM6IHsgXCJ0eXBlXCI6IGlucHV0VHlwZU5hbWVzIH0sXHJcbiAgICBpbWFnZTogXCJpY29ucy90ZXh0X2lucHV0LnN2Z1wiLFxyXG4gICAgaHRtbDogYDxkaXYgY2xhc3M9XCJldmVyeU91dGJveC1yaWdodCBkcmFnZ2FibGVcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhaWx5Qm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0ICR7ZGF0YUNvbXBvbmVudElkfT1cImh0bWwvdGV4dGlucHV0QG9lZVwiIGx1c3R5bGU9XCJoZWlnaHQ6IDIuOHJlbTt3aWR0aDoxM3JlbVwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIi8+XHJcbiAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgIDwvZGl2PmAsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiVmFsdWVcIixcclxuICAgICAgICBrZXk6IFwidmFsdWVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJ2YWx1ZVwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJQbGFjZWhvbGRlclwiLFxyXG4gICAgICAgIGtleTogXCJwbGFjZWhvbGRlclwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInBsYWNlaG9sZGVyXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnTmFtZScsXHJcbiAgICAgICAga2V5OiAnbmFtZScsXHJcbiAgICAgICAgaHRtbEF0dHI6ICduYW1lJyxcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICd0eXBlJyxcclxuICAgICAgICBrZXk6ICd0eXBlJyxcclxuICAgICAgICBodG1sQXR0cjogJ3R5cGUnLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBpbnB1dFR5cGVzXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRleHRpbnB1dDsiLCJpbXBvcnQgeyBUZXh0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IHRleHQgPSB7XHJcbiAgICBuYW1lOiBcIlRleHRcIixcclxuICAgIGltYWdlOiBcImljb25zL3RleHRfaW5wdXQuc3ZnXCIsXHJcbiAgICBodG1sOiBgYCxcclxuICAgIG5vZGVzOiBbJ2InLCAnYmlnJywgJ2VtJywgJ2knLCAnc21hbGwnLCAnc3Ryb25nJyxcclxuICAgICAgICAnc3ViJywgJ3N1cCcsICdpbnMnLCAnZGVsJywgJ3MnLCAnc3RyaWtlJywgJ3UnXSxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogJ1RleHQnLFxyXG4gICAgICAgIGtleTogJ3RleHQnLFxyXG4gICAgICAgIGh0bWxBdHRyOiAndGV4dCcsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0ZXh0OyIsImltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3Qgc3BhbiA9IHtcclxuICAgIG5hbWU6IFwiU3BhblwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvdGV4dF9pbnB1dC5zdmdcIixcclxuICAgIG5vZGVzOiBbJ3NwYW4nXSxcclxuICAgIGh0bWw6IGBgLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIkZvciBpZFwiLFxyXG4gICAgICAgIGtleTogXCJmb3JcIixcclxuICAgICAgICBodG1sQXR0cjogXCJmb3JcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdUZXh0JyxcclxuICAgICAgICBrZXk6ICd0ZXh0JyxcclxuICAgICAgICBodG1sQXR0cjogJ3RleHQnLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc3BhbjsiLCJpbXBvcnQgVnZ2ZWIgZnJvbSAnLi4vLi4vYnVpbGRlcic7XHJcbmltcG9ydCB7IFRleHRWYWx1ZUlucHV0LCBCdXR0b25JbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3Qgc2VsZWN0aW5wdXQgPSB7XHJcbiAgICBub2RlczogW1wic2VsZWN0XCJdLFxyXG4gICAgbmFtZTogXCJTZWxlY3QgSW5wdXRcIixcclxuICAgIGltYWdlOiBcImljb25zL3NlbGVjdF9pbnB1dC5zdmdcIixcclxuICAgIGh0bWw6IGA8ZGl2IGNsYXNzPVwiZXZlcnlPdXRib3gtcmlnaHQgZHJhZ2dhYmxlXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYWlseUJveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBsdXN0eWxlPVwiaGVpZ2h0OiAyLjhyZW07d2lkdGg6MTNyZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInZhbHVlMVwiPlRleHQgMTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwidmFsdWUyXCI+VGV4dCAyPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ2YWx1ZTNcIj5UZXh0IDM8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBiZWZvcmVJbml0OiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgIHByb3BlcnRpZXMgPSBbXTtcclxuICAgICAgICB2YXIgaSA9IDA7XHJcblxyXG4gICAgICAgICQobm9kZSkuZmluZCgnb3B0aW9uJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBkYXRhID0geyBcInZhbHVlXCI6IHRoaXMudmFsdWUsIFwidGV4dFwiOiB0aGlzLnRleHQgfTtcclxuXHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiT3B0aW9uIFwiICsgaSxcclxuICAgICAgICAgICAgICAgIGtleTogXCJvcHRpb25cIiArIGksXHJcbiAgICAgICAgICAgICAgICAvL2luZGV4OiBpIC0gMSxcclxuICAgICAgICAgICAgICAgIG9wdGlvbk5vZGU6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBpbnB1dHR5cGU6IFRleHRWYWx1ZUlucHV0LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSwgdmFsdWUsIGlucHV0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbiA9ICQodGhpcy5vcHRpb25Ob2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiByZW1vdmUgYnV0dG9uIGlzIGNsaWNrZWQgcmVtb3ZlIG9wdGlvbiBhbmQgcmVuZGVyIHJvdyBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Lm5vZGVOYW1lID09ICdCVVRUT04nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIoXCJodG1sL3NlbGVjdGlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5uYW1lID09IFwidmFsdWVcIikgb3B0aW9uLmF0dHIoXCJ2YWx1ZVwiLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXQubmFtZSA9PSBcInRleHRcIikgb3B0aW9uLnRleHQodmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL3JlbW92ZSBhbGwgb3B0aW9uIHByb3BlcnRpZXNcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSB0aGlzLnByb3BlcnRpZXMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmtleS5pbmRleE9mKFwib3B0aW9uXCIpID09PSAtMTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9hZGQgcmVtYWluaW5nIHByb3BlcnRpZXMgdG8gZ2VuZXJhdGVkIGNvbHVtbiBwcm9wZXJ0aWVzXHJcbiAgICAgICAgcHJvcGVydGllcy5wdXNoKHRoaXMucHJvcGVydGllc1swXSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJPcHRpb25cIixcclxuICAgICAgICBrZXk6IFwib3B0aW9uMVwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dFZhbHVlSW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIk9wdGlvblwiLFxyXG4gICAgICAgIGtleTogXCJvcHRpb24yXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0VmFsdWVJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAga2V5OiBcImFkZENoaWxkXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBCdXR0b25JbnB1dCxcclxuICAgICAgICBkYXRhOiB7IHRleHQ6IFwiQWRkIG9wdGlvblwiIH0sXHJcbiAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgICAgICQobm9kZSkuYXBwZW5kKCc8b3B0aW9uIHZhbHVlPVwidmFsdWVcIj5UZXh0PC9vcHRpb24+Jyk7XHJcblxyXG4gICAgICAgICAgICAvL3JlbmRlciBjb21wb25lbnQgcHJvcGVydGllcyBhZ2FpbiB0byBpbmNsdWRlIHRoZSBuZXcgY29sdW1uIGlucHV0c1xyXG4gICAgICAgICAgICBWdnZlYi5Db21wb25lbnRzLnJlbmRlcihcImh0bWwvc2VsZWN0aW5wdXRcIik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2VsZWN0aW5wdXQ7IiwiaW1wb3J0IHsgVGV4dElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGRhdGFDb21wb25lbnRJZCB9IGZyb20gJy4uL2NvbW1vbic7XHJcblxyXG5jb25zdCByYWRpb2J1dHRvbiA9IHtcclxuICAgIG5hbWU6IFwiUmFkaW8gQnV0dG9uXCIsXHJcbiAgICBhdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBcInJhZGlvXCIgfSxcclxuICAgIGltYWdlOiBcImljb25zL3JhZGlvLnN2Z1wiLFxyXG4gICAgaHRtbDogYDxkaXYgJHtkYXRhQ29tcG9uZW50SWR9PVwiaHRtbC9yYWRpb2J1dHRvbkBvZWVcIiBjbGFzcz1cImV2ZXJ5T3V0Ym94LXJpZ2h0IGRyYWdnYWJsZVwiPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTppbmxpbmU7XCI+PGlucHV0IGNsYXNzPVwicmFkaW9JbnB1dFwiIG5hbWU9XCJGcnVpdFwiIHR5cGU9XCJyYWRpb1wiIHZhbHVlPVwiXCIgLz48c3BhbiAke2RhdGFDb21wb25lbnRJZH09XCJodG1sL3NwYW5Ab2VlXCI+5Y2V6YCJMTwvc3Bhbj48L2Rpdj5cclxuICAgICAgICAgICA8L2Rpdj5gLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIk5hbWVcIixcclxuICAgICAgICBrZXk6IFwibmFtZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcIm5hbWVcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJhZGlvYnV0dG9uOyIsImltcG9ydCBWdnZlYiBmcm9tICcuLi8uLi9idWlsZGVyJztcclxuaW1wb3J0IHsgVGV4dFZhbHVlSW5wdXQsIEJ1dHRvbklucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IG1hbnVhbHNlbGVjdGlucHV0aWQgfSBmcm9tICcuL2lkcyc7XHJcbmltcG9ydCB7IGRhdGFDb21wb25lbnRJZCB9IGZyb20gJy4uL2NvbW1vbic7XHJcblxyXG5jb25zdCBhdXRvc2VsZWN0aW5wdXQgPSB7XHJcbiAgICBub2RlczogW1wic2VsZWN0XCJdLFxyXG4gICAgbmFtZTogXCJNYW51YWwgU2VsZWN0IElucHV0XCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9zZWxlY3RfaW5wdXQuc3ZnXCIsXHJcbiAgICBodG1sOiBgPGRpdiBjbGFzcz1cImV2ZXJ5T3V0Ym94LXJpZ2h0IGRyYWdnYWJsZVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGFpbHlCb3hcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0ICR7ZGF0YUNvbXBvbmVudElkfT1cIiR7bWFudWFsc2VsZWN0aW5wdXRpZH1cIiBjbGFzcz1cImZvcm0tY29udHJvbCBmdW5kb2Rvb1NlbGVjdFwiIGx1c3R5bGU9XCJoZWlnaHQ6Mi44cmVtO3dpZHRoOjEzcmVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ2YWx1ZTFcIj5UZXh0IDE8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInZhbHVlMlwiPlRleHQgMjwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwidmFsdWUzXCI+VGV4dCAzPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICBwcm9wZXJ0aWVzID0gW107XHJcbiAgICAgICAgdmFyIGkgPSAwO1xyXG5cclxuICAgICAgICAkKG5vZGUpLmZpbmQoJ29wdGlvbicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgZGF0YSA9IHsgXCJ2YWx1ZVwiOiB0aGlzLnZhbHVlLCBcInRleHRcIjogdGhpcy50ZXh0IH07XHJcblxyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIk9wdGlvbiBcIiArIGksXHJcbiAgICAgICAgICAgICAgICBrZXk6IFwib3B0aW9uXCIgKyBpLFxyXG4gICAgICAgICAgICAgICAgLy9pbmRleDogaSAtIDEsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25Ob2RlOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgaW5wdXR0eXBlOiBUZXh0VmFsdWVJbnB1dCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKG5vZGUsIHZhbHVlLCBpbnB1dCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24gPSAkKHRoaXMub3B0aW9uTm9kZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgcmVtb3ZlIGJ1dHRvbiBpcyBjbGlja2VkIHJlbW92ZSBvcHRpb24gYW5kIHJlbmRlciByb3cgcHJvcGVydGllc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5ub2RlTmFtZSA9PSAnQlVUVE9OJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZ2dmViLkNvbXBvbmVudHMucmVuZGVyKG1hbnVhbHNlbGVjdGlucHV0aWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5uYW1lID09IFwidmFsdWVcIikgb3B0aW9uLmF0dHIoXCJ2YWx1ZVwiLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXQubmFtZSA9PSBcInRleHRcIikgb3B0aW9uLnRleHQodmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL3JlbW92ZSBhbGwgb3B0aW9uIHByb3BlcnRpZXNcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSB0aGlzLnByb3BlcnRpZXMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmtleS5pbmRleE9mKFwib3B0aW9uXCIpID09PSAtMTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9hZGQgcmVtYWluaW5nIHByb3BlcnRpZXMgdG8gZ2VuZXJhdGVkIGNvbHVtbiBwcm9wZXJ0aWVzXHJcbiAgICAgICAgcHJvcGVydGllcy5wdXNoKHRoaXMucHJvcGVydGllc1swXSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJPcHRpb25cIixcclxuICAgICAgICBrZXk6IFwib3B0aW9uMVwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dFZhbHVlSW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIk9wdGlvblwiLFxyXG4gICAgICAgIGtleTogXCJvcHRpb24yXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0VmFsdWVJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAga2V5OiBcImFkZENoaWxkXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBCdXR0b25JbnB1dCxcclxuICAgICAgICBkYXRhOiB7IHRleHQ6IFwiQWRkIG9wdGlvblwiIH0sXHJcbiAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgICAgICQobm9kZSkuYXBwZW5kKCc8b3B0aW9uIHZhbHVlPVwidmFsdWVcIj5UZXh0PC9vcHRpb24+Jyk7XHJcbiAgICAgICAgICAgIC8vcmVuZGVyIGNvbXBvbmVudCBwcm9wZXJ0aWVzIGFnYWluIHRvIGluY2x1ZGUgdGhlIG5ldyBjb2x1bW4gaW5wdXRzXHJcbiAgICAgICAgICAgIFZ2dmViLkNvbXBvbmVudHMucmVuZGVyKG1hbnVhbHNlbGVjdGlucHV0aWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXV0b3NlbGVjdGlucHV0OyIsImltcG9ydCB7IGRhdGFDb21wb25lbnRJZCB9IGZyb20gJy4uL2NvbW1vbic7XHJcblxyXG5jb25zdCBsYWJlbGRpdiA9IHtcclxuICAgIG5hbWU6ICdMYWJlbCBEaXYnLFxyXG4gICAgaW1hZ2U6ICdpY29ucy9sYWJlbC5zdmcnLFxyXG4gICAgaHRtbDogYDxkaXYgY2xhc3M9XCJldmVyeU91dGJveC1sZWZ0IGRyYWdnYWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jYXJldC1zcXVhcmUtby1yaWdodCB0ZXh0LWRhbmdlclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cclxuICAgICAgICAgICAgICAgIDxzcGFuICR7ZGF0YUNvbXBvbmVudElkfT1cImh0bWwvc3BhbkBvZWVcIiBjbGFzcz1cInRoZW1lXCI+UGVyaW9kPC9zcGFuPlxyXG4gICAgICAgICAgIDwvZGl2PmBcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxhYmVsZGl2OyIsImltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBkYXRhQ29tcG9uZW50SWQgfSBmcm9tICcuLi9jb21tb24nO1xyXG5cclxuY29uc3QgY2hlY2tib3ggPSB7XHJcbiAgICBuYW1lOiBcIkNoZWNrYm94XCIsXHJcbiAgICBhdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBcImNoZWNrYm94XCIgfSxcclxuICAgIGltYWdlOiBcImljb25zL2NoZWNrYm94LnN2Z1wiLFxyXG4gICAgaHRtbDogYDxkaXYgY2xhc3M9XCJldmVyeU91dGJveC1yaWdodCBkcmFnZ2FibGVcIj5cclxuICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OmlubGluZTtcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCAke2RhdGFDb21wb25lbnRJZH09XCJodG1sL2NoZWNrYm94QG9lZVwiIHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiY2hlY2tib3hJbnB1dFwiIGlkPVwiXFwke2l0LnNpdGV9ZXByQ2hlY2tcIiBuYW1lPVwicGFyYW1JdGVtc1tcXCR7bG9vcC5pbmRleH1dLmVwckNoZWNrXCIgdmFsdWU9XCJ0cnVlXCIvPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsICR7ZGF0YUNvbXBvbmVudElkfT1cImh0bWwvc3BhbkBvZWVcIj7pgInpobkxPC9sYWJlbD5cclxuICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5gLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIk5hbWVcIixcclxuICAgICAgICBrZXk6IFwibmFtZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcIm5hbWVcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNoZWNrYm94OyIsImltcG9ydCB7IFRleHRJbnB1dCwgU2VsZWN0SW5wdXQsIFRvZ2dsZUlucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGlucHV0VHlwZU5hbWVzIH0gZnJvbSAnLi4vaW5wdXRUeXBlcyc7XHJcbmltcG9ydCB7IGRhdGFDb21wb25lbnRJZCwgZGF0YUNvbmZpZ0luZm8sIGRhdGFDYWxlbmRhcklkIH0gZnJvbSAnLi4vY29tbW9uJztcclxuaW1wb3J0IHtcclxuICAgIGNsb25lV2l0aG91dE9uY2xpY2ssIGdldERhdGVGbXQsIGdldFBhcnNlZENvbmZpZ0luZm8sXHJcbiAgICBzZXREYXRhQ29uZmlnSW5mbywgc2V0T25jbGlja0F0dHJcclxufSBmcm9tICcuLi8uLi91dGlsL2NhbGVuZGFyJ1xyXG5cclxuY29uc3QgY2FsZW5kYXIgPSB7XHJcbiAgICBuYW1lOiBcIkRhdGV0aW1lIElucHV0XCIsXHJcbiAgICBhdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBpbnB1dFR5cGVOYW1lcyB9LFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvY2FsZW5kYXIuc3ZnXCIsXHJcbiAgICBodG1sOiBgPGRpdiBjbGFzcz1cImV2ZXJ5T3V0Ym94LXJpZ2h0IGRyYWdnYWJsZVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGFpbHlCb3hcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgJHtkYXRhQ2FsZW5kYXJJZH0gJHtkYXRhQ29uZmlnSW5mb309XCJ7J2RhdGVGbXQnOiAneXl5eS1NTS1kZCBISDptbSd9XCIgJHtkYXRhQ29tcG9uZW50SWR9PVwiaHRtbC9jYWxlbmRhckBvZWVcIiBsdXN0eWxlPVwiaGVpZ2h0OiAyLjhyZW07d2lkdGg6MTNyZW0gXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbCBXZGF0ZVwiLz5cclxuICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgPC9kaXY+YCxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJWYWx1ZVwiLFxyXG4gICAgICAgIGtleTogXCJ2YWx1ZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInZhbHVlXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlBsYWNlaG9sZGVyXCIsXHJcbiAgICAgICAga2V5OiBcInBsYWNlaG9sZGVyXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwicGxhY2Vob2xkZXJcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdOYW1lJyxcclxuICAgICAgICBrZXk6ICduYW1lJyxcclxuICAgICAgICBodG1sQXR0cjogJ25hbWUnLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJEYXRlIEZvcm1hdFwiLFxyXG4gICAgICAgIGtleTogXCJkYXRlRm10XCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICBpbml0OiBnZXREYXRlRm10LFxyXG4gICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc3QgY29uZmlnSW5mbyA9IGdldFBhcnNlZENvbmZpZ0luZm8obm9kZSlcclxuICAgICAgICAgICAgY29uZmlnSW5mby5kYXRlRm10ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHNldERhdGFDb25maWdJbmZvKG5vZGUsIGNvbmZpZ0luZm8pO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5vZGUuYXR0cignb25jbGljaycpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0T25jbGlja0F0dHIoY2xvbmVXaXRob3V0T25jbGljayhub2RlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ3l5eXktTU0tZGQgSEg6bW0nLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ3l5eXktTU0tZGQgSEg6bW0nXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAneXl5eS1NTS1kZCBISDptbTpzcycsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAneXl5eS1NTS1kZCBISDptbTpzcydcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICd5eXl5LU1NLWRkJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICd5eXl5LU1NLWRkJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ3l5eXlNTWRkJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICd5eXl5TU1kZCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICd5eXl5TU0nLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ3l5eXlNTSdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICd5eXl5JyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICd5eXl5J1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ3l5eXnlubRN5pyIJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICd5eXl55bm0TeaciCdcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJTaG93IERhdGV0aW1lXCIsXHJcbiAgICAgICAga2V5OiBcInNob3dEYXRldGltZVwiLFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJ0YWJsZS1yZXNwb25zaXZlXCJdLFxyXG4gICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgb25DaGFuZ2Uobm9kZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09ICdvbicpIHtcclxuICAgICAgICAgICAgICAgIHNldE9uY2xpY2tBdHRyKG5vZGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2xvbmVXaXRob3V0T25jbGljayhub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvbjogJ29uJyxcclxuICAgICAgICAgICAgb2ZmOiAnb2ZmJ1xyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjYWxlbmRhcjsiLCJpbXBvcnQgeyBMaW5rSW5wdXQsIFNlbGVjdElucHV0LCBUZXh0SW5wdXQsIFRvZ2dsZUlucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGRhdGFCdXR0b25JZCwgZGF0YUNvbXBvbmVudElkIH0gZnJvbSBcIi4uL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBidXR0b25pZCB9IGZyb20gJy4vaWRzJztcclxuXHJcbmNvbnN0IGJ1dHRvbiA9IHtcclxuICAgIGNsYXNzZXM6IFtcImJ0blwiLCBcImJ0bi1saW5rXCIsICdidG5Ab2VlJ10sXHJcbiAgICBuYW1lOiBcIkJ1dHRvblwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvYnV0dG9uLnN2Z1wiLFxyXG4gICAgaHRtbDogYDxidXR0b24gJHtkYXRhQ29tcG9uZW50SWR9PSR7YnV0dG9uaWR9ICR7ZGF0YUJ1dHRvbklkfSB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJkcmFnZ2FibGVcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXNlYXJjaFwiPlNlYXJjaDwvc3Bhbj5cclxuICAgICAgICAgICA8L2J1dHRvbj5gLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIkxpbmsgVG9cIixcclxuICAgICAgICBrZXk6IFwiaHJlZlwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImhyZWZcIixcclxuICAgICAgICBpbnB1dHR5cGU6IExpbmtJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICAgIGtleTogXCJ0eXBlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJidG4tZGVmYXVsdFwiLCBcImJ0bi1wcmltYXJ5XCIsIFwiYnRuLWluZm9cIiwgXCJidG4tc3VjY2Vzc1wiLCBcImJ0bi13YXJuaW5nXCIsIFwiYnRuLWluZm9cIiwgXCJidG4tbGlnaHRcIiwgXCJidG4tZGFya1wiLCBcImJ0bi1vdXRsaW5lLXByaW1hcnlcIiwgXCJidG4tb3V0bGluZS1pbmZvXCIsIFwiYnRuLW91dGxpbmUtc3VjY2Vzc1wiLCBcImJ0bi1vdXRsaW5lLXdhcm5pbmdcIiwgXCJidG4tb3V0bGluZS1pbmZvXCIsIFwiYnRuLW91dGxpbmUtbGlnaHRcIiwgXCJidG4tb3V0bGluZS1kYXJrXCIsIFwiYnRuLWxpbmtcIl0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWRlZmF1bHRcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlByaW1hcnlcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4gYnRuLWluZm9cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1zdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4td2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJXYXJuaW5nXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWluZm9cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1saWdodFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMaWdodFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1kYXJrXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhcmtcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tb3V0bGluZS1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlByaW1hcnkgb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0biBidG4tb3V0bGluZS1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm8gb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1vdXRsaW5lLXN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU3VjY2VzcyBvdXRsaW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLW91dGxpbmUtd2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJXYXJuaW5nIG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tb3V0bGluZS1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm8gb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1vdXRsaW5lLWxpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpZ2h0IG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tb3V0bGluZS1kYXJrXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhcmsgb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1saW5rXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpbmtcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlNpemVcIixcclxuICAgICAgICBrZXk6IFwic2l6ZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiYnRuLWxnXCIsIFwiYnRuLXNtXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWxnXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxhcmdlXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLXNtXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlNtYWxsXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJUYXJnZXRcIixcclxuICAgICAgICBrZXk6IFwidGFyZ2V0XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwidGFyZ2V0XCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnb25jbGljaycsXHJcbiAgICAgICAga2V5OiAnb25jbGljaycsXHJcbiAgICAgICAgaHRtbEF0dHI6ICdvbmNsaWNrJyxcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdEYXRhIFVybCcsXHJcbiAgICAgICAga2V5OiAnZGF0YVVybCcsXHJcbiAgICAgICAgaHRtbEF0dHI6ICdkYXRhLXVybCcsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkRpc2FibGVkXCIsXHJcbiAgICAgICAga2V5OiBcImRpc2FibGVkXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJkaXNhYmxlZFwiXSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9uOiBcImRpc2FibGVkXCIsXHJcbiAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidXR0b247IiwiaW1wb3J0IHsgVGV4dElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGF1dG9zZWxlY3RpbnB1dGlkIH0gZnJvbSAnLi9pZHMnO1xyXG5pbXBvcnQgeyBkYXRhQ29tcG9uZW50SWQsIGRhdGFVcmwsIGRhdGFBdXRvU2VsZWN0SWQsIGRhdGFWYWx1ZU1hcHBpbmcsIGRhdGFUZXh0TWFwcGluZyB9IGZyb20gJy4uL2NvbW1vbic7XHJcblxyXG5jb25zdCBhdXRvc2VsZWN0aW5wdXQgPSB7XHJcbiAgICBub2RlczogW1wic2VsZWN0XCJdLFxyXG4gICAgbmFtZTogXCJBdXRvIFNlbGVjdCBJbnB1dFwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvc2VsZWN0X2lucHV0LnN2Z1wiLFxyXG4gICAgaHRtbDogYDxkaXYgY2xhc3M9XCJldmVyeU91dGJveC1yaWdodCBkcmFnZ2FibGVcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhaWx5Qm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCAke2RhdGFBdXRvU2VsZWN0SWR9ICR7ZGF0YUNvbXBvbmVudElkfT1cIiR7YXV0b3NlbGVjdGlucHV0aWR9XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZnVuZG9kb29TZWxlY3RcIiBsdXN0eWxlPVwiaGVpZ2h0OiAyLjhyZW07d2lkdGg6MTNyZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6ICdWYWx1ZSBNYXBwaW5nJyxcclxuICAgICAgICBrZXk6ICd2YWx1ZU1hcHBpbmcnLFxyXG4gICAgICAgIGh0bWxBdHRyOiBkYXRhVmFsdWVNYXBwaW5nLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1RleHQgTWFwcGluZycsXHJcbiAgICAgICAga2V5OiAndGV4dE1hcGluZycsXHJcbiAgICAgICAgaHRtbEF0dHI6IGRhdGFUZXh0TWFwcGluZyxcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiRGF0YSBVcmxcIixcclxuICAgICAgICBrZXk6IFwiZGF0YVVybFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBkYXRhVXJsLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXV0b3NlbGVjdGlucHV0OyIsImNvbnN0IG1hbnVhbHNlbGVjdGlucHV0aWQgPSAnaHRtbC9tYW51YWxzZWxlY3RpbnB1dEBvZWUnO1xyXG5jb25zdCBhdXRvc2VsZWN0aW5wdXRpZCA9ICdodG1sL2F1dG9zZWxlY3RpbnB1dEBvZWUnO1xyXG5jb25zdCBidXR0b25pZCA9ICdodG1sL2J1dHRvbkBvZWUnO1xyXG5cclxuZXhwb3J0IHsgbWFudWFsc2VsZWN0aW5wdXRpZCwgYXV0b3NlbGVjdGlucHV0aWQsIGJ1dHRvbmlkIH07IiwiaW1wb3J0IGxhYmVsIGZyb20gJy4vbGFiZWwnO1xyXG5pbXBvcnQgdGV4dGlucHV0IGZyb20gJy4vdGV4dGlucHV0JztcclxuaW1wb3J0IGJ1dHRvbiBmcm9tICcuL2J1dHRvbic7XHJcbmltcG9ydCBkaXYgZnJvbSAnLi9kaXYnO1xyXG5pbXBvcnQgY29udGFpbmVyIGZyb20gJy4vY29udGFpbmVyJztcclxuaW1wb3J0IGFsZXJ0IGZyb20gJy4vYWxlcnQnO1xyXG5pbXBvcnQgYmFkZ2UgZnJvbSAnLi9iYWRnZSc7XHJcbmltcG9ydCBicmVhZGNydW1iaXRlbSBmcm9tICcuL2JyZWFkY3J1bWJpdGVtJztcclxuaW1wb3J0IGJyZWFkY3J1bWJzIGZyb20gJy4vYnJlYWRjcnVtYnMnO1xyXG5pbXBvcnQgYnV0dG9uZ3JvdXAgZnJvbSAnLi9idXR0b25ncm91cCc7XHJcbmltcG9ydCBidXR0b250b29sYmFyIGZyb20gJy4vYnV0dG9udG9vbGJhcic7XHJcbmltcG9ydCBjYXJkIGZyb20gJy4vY2FyZCc7XHJcbmltcG9ydCBjaGVja2JveCBmcm9tICcuL2NoZWNrYm94JztcclxuaW1wb3J0IGZpbGVpbnB1dCBmcm9tICcuL2ZpbGVpbnB1dCc7XHJcbmltcG9ydCBmb3JtIGZyb20gJy4vZm9ybSc7XHJcbmltcG9ydCBncmlkY29sdW1uIGZyb20gJy4vZ3JpZGNvbHVtbic7XHJcbmltcG9ydCBncmlkcm93IGZyb20gJy4vZ3JpZHJvdyc7XHJcbmltcG9ydCBoZWFkaW5nIGZyb20gJy4vaGVhZGluZyc7XHJcbmltcG9ydCBociBmcm9tICcuL2hyJztcclxuaW1wb3J0IGltYWdlIGZyb20gJy4vaW1hZ2UnO1xyXG5pbXBvcnQganVtYm90cm9uIGZyb20gJy4vanVtYm90cm9uJztcclxuaW1wb3J0IGxpbmsgZnJvbSAnLi9saW5rJztcclxuaW1wb3J0IGxpc3Rncm91cCBmcm9tICcuL2xpc3Rncm91cCc7XHJcbmltcG9ydCBsaXN0aXRlbSBmcm9tICcuL2xpc3RpdGVtJztcclxuaW1wb3J0IG5hdmJhciBmcm9tICcuL25hdmJhcic7XHJcbmltcG9ydCBwYWdlaXRlbSBmcm9tICcuL3BhZ2VpdGVtJztcclxuaW1wb3J0IHBhZ2luYXRpb24gZnJvbSAnLi9wYWdpbmF0aW9uJztcclxuaW1wb3J0IHByb2dyZXNzIGZyb20gJy4vcHJvZ3Jlc3MnO1xyXG5pbXBvcnQgcmFkaW9idXR0b24gZnJvbSAnLi9yYWRpb2J1dHRvbic7XHJcbmltcG9ydCBzZWxlY3RpbnB1dCBmcm9tICcuL3NlbGVjdGlucHV0JztcclxuaW1wb3J0IHRhYmxlaGVhZGVyY2VsbCBmcm9tICcuL3RhYmxlaGVhZGVyY2VsbCc7XHJcbmltcG9ydCB0YWJsZSBmcm9tICcuL3RhYmxlJztcclxuaW1wb3J0IHRhYmxlYm9keSBmcm9tICcuL3RhYmxlYm9keSc7XHJcbmltcG9ydCB0YWJsZWNlbGwgZnJvbSAnLi90YWJsZWNlbGwnO1xyXG5pbXBvcnQgdGFibGVoZWFkIGZyb20gJy4vdGFibGVoZWFkJztcclxuaW1wb3J0IHRhYmxlcm93IGZyb20gJy4vdGFibGVyb3cnO1xyXG5pbXBvcnQgdGV4dGFyZWFpbnB1dCBmcm9tICcuL3RleHRhcmVhaW5wdXQnO1xyXG5cclxuZXhwb3J0IHtcclxuICAgIGxhYmVsLCB0ZXh0aW5wdXQsIGJ1dHRvbiwgZGl2LCBjb250YWluZXIsIGFsZXJ0LCBiYWRnZSwgYnJlYWRjcnVtYml0ZW0sIGJyZWFkY3J1bWJzLCBidXR0b25ncm91cCxcclxuICAgIGJ1dHRvbnRvb2xiYXIsIGNhcmQsIGNoZWNrYm94LCBmaWxlaW5wdXQsIGZvcm0sIGdyaWRjb2x1bW4sIGdyaWRyb3csIGhlYWRpbmcsIGhyLCBpbWFnZSwganVtYm90cm9uLFxyXG4gICAgbGluaywgbGlzdGdyb3VwLCBsaXN0aXRlbSwgbmF2YmFyLCBwYWdlaXRlbSwgcGFnaW5hdGlvbiwgcHJvZ3Jlc3MsIHJhZGlvYnV0dG9uLCBzZWxlY3RpbnB1dCwgdGFibGVoZWFkZXJjZWxsLFxyXG4gICAgdGFibGUsIHRhYmxlYm9keSwgdGFibGVjZWxsLCB0YWJsZWhlYWQsIHRhYmxlcm93LCB0ZXh0YXJlYWlucHV0XHJcbn07IiwiaW1wb3J0IHsgVGV4dElucHV0LCBTZWxlY3RJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBpbnB1dFR5cGVzLCBpbnB1dFR5cGVOYW1lcyB9IGZyb20gJy4uL2lucHV0VHlwZXMnO1xyXG5pbXBvcnQgeyBkYXRhQ29tcG9uZW50SWQgfSBmcm9tICcuLi9jb21tb24nO1xyXG5cclxuY29uc3QgdGV4dGlucHV0ID0ge1xyXG4gICAgbmFtZTogXCJUZXh0IElucHV0XCIsXHJcbiAgICBhdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBpbnB1dFR5cGVOYW1lcyB9LFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvdGV4dF9pbnB1dC5zdmdcIixcclxuICAgIGh0bWw6IGA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiPjxsYWJlbD5UZXh0PC9sYWJlbD48aW5wdXQgJHtkYXRhQ29tcG9uZW50SWR9PVwiaHRtbC90ZXh0aW5wdXRAZ2VuZXJhbFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj48L2Rpdj48L2Rpdj5gLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIlZhbHVlXCIsXHJcbiAgICAgICAga2V5OiBcInZhbHVlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwidmFsdWVcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiUGxhY2Vob2xkZXJcIixcclxuICAgICAgICBrZXk6IFwicGxhY2Vob2xkZXJcIixcclxuICAgICAgICBodG1sQXR0cjogXCJwbGFjZWhvbGRlclwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ3R5cGUnLFxyXG4gICAgICAgIGtleTogJ3R5cGUnLFxyXG4gICAgICAgIGh0bWxBdHRyOiAndHlwZScsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IGlucHV0VHlwZXNcclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGV4dGlucHV0OyIsImNvbnN0IGlucHV0VHlwZXMgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgdmFsdWU6ICd0ZXh0JyxcclxuICAgICAgICB0ZXh0OiAndGV4dCdcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ3Bhc3N3b3JkJyxcclxuICAgICAgICB0ZXh0OiAncGFzc3dvcmQnXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6ICdudW1iZXInLFxyXG4gICAgICAgIHRleHQ6ICdudW1iZXInXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6ICdzdWJtaXQnLFxyXG4gICAgICAgIHRleHQ6ICdzdWJtaXQnXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiZW1haWxcIixcclxuICAgICAgICB0ZXh0OiBcImVtYWlsXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ3VybCcsXHJcbiAgICAgICAgdGV4dDogJ3VybCdcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ3RlbCcsXHJcbiAgICAgICAgdGV4dDogJ3RlbCdcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ3NlYXJjaCcsXHJcbiAgICAgICAgdGV4dDogJ3NlYXJjaCdcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ2RhdGV0aW1lLWxvY2FsJyxcclxuICAgICAgICB0ZXh0OiAnZGF0ZXRpbWUtbG9jYWwnXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6ICdkYXRldGltZScsXHJcbiAgICAgICAgdGV4dDogJ2RhdGV0aW1lJ1xyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiAnZGF0ZScsXHJcbiAgICAgICAgdGV4dDogJ2RhdGUnXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6ICd0aW1lJyxcclxuICAgICAgICB0ZXh0OiAndGltZSdcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ3dlZWsnLFxyXG4gICAgICAgIHRleHQ6ICd3ZWVrJ1xyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiAnbW9udGgnLFxyXG4gICAgICAgIHRleHQ6ICdtb250aCdcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ3JhbmdlJyxcclxuICAgICAgICB0ZXh0OiAncmFuZ2UnXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6ICdjb2xvcicsXHJcbiAgICAgICAgdGV4dDogJ2NvbG9yJ1xyXG4gICAgfV07XHJcblxyXG5jb25zdCBpbnB1dFR5cGVOYW1lcyA9IGlucHV0VHlwZXMucmVkdWNlKChwcmV2LCBjdXIpID0+IHtcclxuICAgIHByZXYucHVzaChjdXIudmFsdWUpO1xyXG4gICAgcmV0dXJuIHByZXY7XHJcbn0sIFtdKTtcclxuXHJcbmV4cG9ydCB7IGlucHV0VHlwZXMsIGlucHV0VHlwZU5hbWVzIH07IiwiY29uc3QgdGV4dGFyZWFpbnB1dCA9IHtcclxuICAgIG5hbWU6IFwiVGV4dCBBcmVhXCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy90ZXh0X2FyZWEuc3ZnXCIsXHJcbiAgICBodG1sOiAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj48bGFiZWw+WW91ciByZXNwb25zZTo8L2xhYmVsPjx0ZXh0YXJlYSBjbGFzcz1cImZvcm0tY29udHJvbFwiPjwvdGV4dGFyZWE+PC9kaXY+J1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGV4dGFyZWFpbnB1dDsiLCJpbXBvcnQgeyBTZWxlY3RJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgdGFibGVyb3cgPSB7XHJcbiAgICBub2RlczogW1widHJcIl0sXHJcbiAgICBuYW1lOiBcIlRhYmxlIFJvd1wiLFxyXG4gICAgaHRtbDogXCI8dHI+PHRkPkNlbGwgMTwvdGQ+PHRkPkNlbGwgMjwvdGQ+PHRkPkNlbGwgMzwvdGQ+PC90cj5cIixcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJUeXBlXCIsXHJcbiAgICAgICAga2V5OiBcInR5cGVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcIlwiLCBcInN1Y2Nlc3NcIiwgXCJkYW5nZXJcIiwgXCJ3YXJuaW5nXCIsIFwiYWN0aXZlXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTdWNjZXNzXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiZXJyb3JcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRXJyb3JcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIldhcm5pbmdcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJhY3RpdmVcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiQWN0aXZlXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFibGVyb3c7IiwiY29uc3QgdGFibGVoZWFkZXJjZWxsID0ge1xyXG4gICAgbm9kZXM6IFtcInRoXCJdLFxyXG4gICAgbmFtZTogXCJUYWJsZSBIZWFkZXIgQ2VsbFwiLFxyXG4gICAgaHRtbDogXCI8dGg+SGVhZDwvdGg+XCJcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhYmxlaGVhZGVyY2VsbDsiLCJpbXBvcnQgeyBTZWxlY3RJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgdGFibGVoZWFkID0ge1xyXG4gICAgbm9kZXM6IFtcInRoZWFkXCJdLFxyXG4gICAgbmFtZTogXCJUYWJsZSBIZWFkXCIsXHJcbiAgICBodG1sOiBcIjx0aGVhZD48dHI+PHRoPkhlYWQgMTwvdGg+PHRoPkhlYWQgMjwvdGg+PHRoPkhlYWQgMzwvdGg+PC90cj48L3RoZWFkPlwiLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIlR5cGVcIixcclxuICAgICAgICBrZXk6IFwidHlwZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiXCIsIFwic3VjY2Vzc1wiLCBcImRhbmdlclwiLCBcIndhcm5pbmdcIiwgXCJpbmZvXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTdWNjZXNzXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYW5nZXJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRXJyb3JcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIldhcm5pbmdcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm9cIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YWJsZWhlYWQ7IiwiY29uc3QgdGFibGVjZWxsID0ge1xyXG4gICAgbm9kZXM6IFtcInRkXCJdLFxyXG4gICAgbmFtZTogXCJUYWJsZSBDZWxsXCIsXHJcbiAgICBodG1sOiBcIjx0ZD5DZWxsPC90ZD5cIlxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFibGVjZWxsOyIsImNvbnN0IHRhYmxlYm9keSA9IHtcclxuICAgIG5vZGVzOiBbXCJ0Ym9keVwiXSxcclxuICAgIG5hbWU6IFwiVGFibGUgQm9keVwiLFxyXG4gICAgaHRtbDogXCI8dGJvZHk+PHRyPjx0ZD5DZWxsIDE8L3RkPjx0ZD5DZWxsIDI8L3RkPjx0ZD5DZWxsIDM8L3RkPjwvdHI+PC90Ym9keT5cIlxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFibGVib2R5OyIsImltcG9ydCB7IFNlbGVjdElucHV0LCBUb2dnbGVJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgdGFibGUgPSB7XHJcbiAgICBub2RlczogW1widGFibGVcIl0sXHJcbiAgICBjbGFzc2VzOiBbXCJ0YWJsZVwiXSxcclxuICAgIGltYWdlOiBcImljb25zL3RhYmxlLnN2Z1wiLFxyXG4gICAgbmFtZTogXCJUYWJsZVwiLFxyXG4gICAgaHRtbDogJzx0YWJsZSBjbGFzcz1cInRhYmxlXCI+XFxcclxuXHRcdCAgPHRoZWFkPlxcXHJcblx0XHRcdDx0cj5cXFxyXG5cdFx0XHQgIDx0aD4jPC90aD5cXFxyXG5cdFx0XHQgIDx0aD5GaXJzdCBOYW1lPC90aD5cXFxyXG5cdFx0XHQgIDx0aD5MYXN0IE5hbWU8L3RoPlxcXHJcblx0XHRcdCAgPHRoPlVzZXJuYW1lPC90aD5cXFxyXG5cdFx0XHQ8L3RyPlxcXHJcblx0XHQgIDwvdGhlYWQ+XFxcclxuXHRcdCAgPHRib2R5PlxcXHJcblx0XHRcdDx0cj5cXFxyXG5cdFx0XHQgIDx0aCBzY29wZT1cInJvd1wiPjE8L3RoPlxcXHJcblx0XHRcdCAgPHRkPk1hcms8L3RkPlxcXHJcblx0XHRcdCAgPHRkPk90dG88L3RkPlxcXHJcblx0XHRcdCAgPHRkPkBtZG88L3RkPlxcXHJcblx0XHRcdDwvdHI+XFxcclxuXHRcdFx0PHRyPlxcXHJcblx0XHRcdCAgPHRoIHNjb3BlPVwicm93XCI+MjwvdGg+XFxcclxuXHRcdFx0ICA8dGQ+SmFjb2I8L3RkPlxcXHJcblx0XHRcdCAgPHRkPlRob3JudG9uPC90ZD5cXFxyXG5cdFx0XHQgIDx0ZD5AZmF0PC90ZD5cXFxyXG5cdFx0XHQ8L3RyPlxcXHJcblx0XHRcdDx0cj5cXFxyXG5cdFx0XHQgIDx0aCBzY29wZT1cInJvd1wiPjM8L3RoPlxcXHJcblx0XHRcdCAgPHRkPkxhcnJ5PC90ZD5cXFxyXG5cdFx0XHQgIDx0ZD50aGUgQmlyZDwvdGQ+XFxcclxuXHRcdFx0ICA8dGQ+QHR3aXR0ZXI8L3RkPlxcXHJcblx0XHRcdDwvdHI+XFxcclxuXHRcdCAgPC90Ym9keT5cXFxyXG5cdFx0PC90YWJsZT4nLFxyXG4gICAgcHJvcGVydGllczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJUeXBlXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJ0eXBlXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJ0YWJsZS1wcmltYXJ5XCIsIFwidGFibGUtc2Vjb25kYXJ5XCIsIFwidGFibGUtc3VjY2Vzc1wiLCBcInRhYmxlLWRhbmdlclwiLCBcInRhYmxlLXdhcm5pbmdcIiwgXCJ0YWJsZS1pbmZvXCIsIFwidGFibGUtbGlnaHRcIiwgXCJ0YWJsZS1kYXJrXCIsIFwidGFibGUtd2hpdGVcIl0sXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiRGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0YWJsZS1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJQcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0YWJsZS1zZWNvbmRhcnlcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlNlY29uZGFyeVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGFibGUtc3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiU3VjY2Vzc1wiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGFibGUtZGFuZ2VyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInRhYmxlLXdhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIldhcm5pbmdcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInRhYmxlLWluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm9cIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInRhYmxlLWxpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJMaWdodFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGFibGUtZGFya1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGFya1wiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGFibGUtd2hpdGVcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIldoaXRlXCJcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJSZXNwb25zaXZlXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJyZXNwb25zaXZlXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJ0YWJsZS1yZXNwb25zaXZlXCJdLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvbjogXCJ0YWJsZS1yZXNwb25zaXZlXCIsXHJcbiAgICAgICAgICAgICAgICBvZmY6IFwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlNtYWxsXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJzbWFsbFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1widGFibGUtc21cIl0sXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9uOiBcInRhYmxlLXNtXCIsXHJcbiAgICAgICAgICAgICAgICBvZmY6IFwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkhvdmVyXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJob3ZlclwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1widGFibGUtaG92ZXJcIl0sXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9uOiBcInRhYmxlLWhvdmVyXCIsXHJcbiAgICAgICAgICAgICAgICBvZmY6IFwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkJvcmRlcmVkXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJib3JkZXJlZFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1widGFibGUtYm9yZGVyZWRcIl0sXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9uOiBcInRhYmxlLWJvcmRlcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBvZmY6IFwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlN0cmlwZWRcIixcclxuICAgICAgICAgICAga2V5OiBcInN0cmlwZWRcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFtcInRhYmxlLXN0cmlwZWRcIl0sXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9uOiBcInRhYmxlLXN0cmlwZWRcIixcclxuICAgICAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiSW52ZXJzZVwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiaW52ZXJzZVwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1widGFibGUtaW52ZXJzZVwiXSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb246IFwidGFibGUtaW52ZXJzZVwiLFxyXG4gICAgICAgICAgICAgICAgb2ZmOiBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJIZWFkIG9wdGlvbnNcIixcclxuICAgICAgICAgICAga2V5OiBcImhlYWRcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICAgICAgY2hpbGQ6IFwidGhlYWRcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFtcIlwiLCBcInRoZWFkLWludmVyc2VcIiwgXCJ0aGVhZC1kZWZhdWx0XCJdLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiTm9uZVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGhlYWQtZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGhlYWQtaW52ZXJzZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiSW52ZXJzZVwiXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhYmxlOyIsImltcG9ydCBWdnZlYiBmcm9tICcuLi8uLi9idWlsZGVyJztcclxuaW1wb3J0IHsgVGV4dFZhbHVlSW5wdXQsIEJ1dHRvbklucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBzZWxlY3RpbnB1dCA9IHtcclxuICAgIG5vZGVzOiBbXCJzZWxlY3RcIl0sXHJcbiAgICBuYW1lOiBcIlNlbGVjdCBJbnB1dFwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvc2VsZWN0X2lucHV0LnN2Z1wiLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCI+PGxhYmVsPkNob29zZSBhbiBvcHRpb24gPC9sYWJlbD48c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCI+PG9wdGlvbiB2YWx1ZT1cInZhbHVlMVwiPlRleHQgMTwvb3B0aW9uPjxvcHRpb24gdmFsdWU9XCJ2YWx1ZTJcIj5UZXh0IDI8L29wdGlvbj48b3B0aW9uIHZhbHVlPVwidmFsdWUzXCI+VGV4dCAzPC9vcHRpb24+PC9zZWxlY3Q+PC9kaXY+JyxcclxuXHJcbiAgICBiZWZvcmVJbml0OiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgIHByb3BlcnRpZXMgPSBbXTtcclxuICAgICAgICB2YXIgaSA9IDA7XHJcblxyXG4gICAgICAgICQobm9kZSkuZmluZCgnb3B0aW9uJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBkYXRhID0geyBcInZhbHVlXCI6IHRoaXMudmFsdWUsIFwidGV4dFwiOiB0aGlzLnRleHQgfTtcclxuXHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiT3B0aW9uIFwiICsgaSxcclxuICAgICAgICAgICAgICAgIGtleTogXCJvcHRpb25cIiArIGksXHJcbiAgICAgICAgICAgICAgICAvL2luZGV4OiBpIC0gMSxcclxuICAgICAgICAgICAgICAgIG9wdGlvbk5vZGU6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBpbnB1dHR5cGU6IFRleHRWYWx1ZUlucHV0LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSwgdmFsdWUsIGlucHV0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbiA9ICQodGhpcy5vcHRpb25Ob2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiByZW1vdmUgYnV0dG9uIGlzIGNsaWNrZWQgcmVtb3ZlIG9wdGlvbiBhbmQgcmVuZGVyIHJvdyBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Lm5vZGVOYW1lID09ICdCVVRUT04nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIoXCJodG1sL3NlbGVjdGlucHV0QGdlbmVyYWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Lm5hbWUgPT0gXCJ2YWx1ZVwiKSBvcHRpb24uYXR0cihcInZhbHVlXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnB1dC5uYW1lID09IFwidGV4dFwiKSBvcHRpb24udGV4dCh2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vcmVtb3ZlIGFsbCBvcHRpb24gcHJvcGVydGllc1xyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHRoaXMucHJvcGVydGllcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ua2V5LmluZGV4T2YoXCJvcHRpb25cIikgPT09IC0xO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL2FkZCByZW1haW5pbmcgcHJvcGVydGllcyB0byBnZW5lcmF0ZWQgY29sdW1uIHByb3BlcnRpZXNcclxuICAgICAgICBwcm9wZXJ0aWVzLnB1c2godGhpcy5wcm9wZXJ0aWVzWzBdKTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllcztcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIk9wdGlvblwiLFxyXG4gICAgICAgIGtleTogXCJvcHRpb24xXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0VmFsdWVJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiT3B0aW9uXCIsXHJcbiAgICAgICAga2V5OiBcIm9wdGlvbjJcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRWYWx1ZUlucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICBrZXk6IFwiYWRkQ2hpbGRcIixcclxuICAgICAgICBpbnB1dHR5cGU6IEJ1dHRvbklucHV0LFxyXG4gICAgICAgIGRhdGE6IHsgdGV4dDogXCJBZGQgb3B0aW9uXCIgfSxcclxuICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAgICAgJChub2RlKS5hcHBlbmQoJzxvcHRpb24gdmFsdWU9XCJ2YWx1ZVwiPlRleHQ8L29wdGlvbj4nKTtcclxuXHJcbiAgICAgICAgICAgIC8vcmVuZGVyIGNvbXBvbmVudCBwcm9wZXJ0aWVzIGFnYWluIHRvIGluY2x1ZGUgdGhlIG5ldyBjb2x1bW4gaW5wdXRzXHJcbiAgICAgICAgICAgIFZ2dmViLkNvbXBvbmVudHMucmVuZGVyKFwiaHRtbC9zZWxlY3RpbnB1dEBnZW5lcmFsXCIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNlbGVjdGlucHV0OyIsImltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBkYXRhQ29tcG9uZW50SWQgfSBmcm9tICcuLi9jb21tb24nO1xyXG5cclxuY29uc3QgcmFkaW9idXR0b24gPSB7XHJcbiAgICBuYW1lOiBcIlJhZGlvIEJ1dHRvblwiLFxyXG4gICAgYXR0cmlidXRlczogeyBcInR5cGVcIjogXCJyYWRpb1wiIH0sXHJcbiAgICBpbWFnZTogXCJpY29ucy9yYWRpby5zdmdcIixcclxuICAgIGh0bWw6IGA8bGFiZWwgJHtkYXRhQ29tcG9uZW50SWR9PVwiaHRtbC9yYWRpb2J1dHRvbkBnZW5lcmFsXCIgY2xhc3M9XCJyYWRpb1wiPjxpbnB1dCB0eXBlPVwicmFkaW9cIj4gUmFkaW88L2xhYmVsPmAsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiTmFtZVwiLFxyXG4gICAgICAgIGtleTogXCJuYW1lXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwibmFtZVwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmFkaW9idXR0b247IiwiaW1wb3J0IHsgU2VsZWN0SW5wdXQsIFRvZ2dsZUlucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGJnY29sb3JDbGFzc2VzLCBiZ2NvbG9yU2VsZWN0T3B0aW9ucyB9IGZyb20gJy4uL2NvbW1vbic7XHJcblxyXG5jb25zdCBwcm9ncmVzcyA9IHtcclxuICAgIGNsYXNzZXM6IFtcInByb2dyZXNzXCJdLFxyXG4gICAgbmFtZTogXCJQcm9ncmVzcyBCYXJcIixcclxuICAgIGltYWdlOiBcImljb25zL3Byb2dyZXNzYmFyLnN2Z1wiLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJwcm9ncmVzc1wiPjxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXIgdy0yNVwiPjwvZGl2PjwvZGl2PicsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiQmFja2dyb3VuZFwiLFxyXG4gICAgICAgIGtleTogXCJiYWNrZ3JvdW5kXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogYmdjb2xvckNsYXNzZXMsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IGJnY29sb3JTZWxlY3RPcHRpb25zXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBuYW1lOiBcIlByb2dyZXNzXCIsXHJcbiAgICAgICAga2V5OiBcImJhY2tncm91bmRcIixcclxuICAgICAgICBjaGlsZDogXCIucHJvZ3Jlc3MtYmFyXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiXCIsIFwidy0yNVwiLCBcInctNTBcIiwgXCJ3LTc1XCIsIFwidy0xMDBcIl0sXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiTm9uZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcInctMjVcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiMjUlXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwidy01MFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCI1MCVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJ3LTc1XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIjc1JVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcInctMTAwXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIjEwMCVcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogXCJQcm9ncmVzcyBiYWNrZ3JvdW5kXCIsXHJcbiAgICAgICAga2V5OiBcImJhY2tncm91bmRcIixcclxuICAgICAgICBjaGlsZDogXCIucHJvZ3Jlc3MtYmFyXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogYmdjb2xvckNsYXNzZXMsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IGJnY29sb3JTZWxlY3RPcHRpb25zXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiU3RyaXBlZFwiLFxyXG4gICAgICAgIGtleTogXCJzdHJpcGVkXCIsXHJcbiAgICAgICAgY2hpbGQ6IFwiLnByb2dyZXNzLWJhclwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcIlwiLCBcInByb2dyZXNzLWJhci1zdHJpcGVkXCJdLFxyXG4gICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvbjogXCJwcm9ncmVzcy1iYXItc3RyaXBlZFwiLFxyXG4gICAgICAgICAgICBvZmY6IFwiXCIsXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiQW5pbWF0ZWRcIixcclxuICAgICAgICBrZXk6IFwiYW5pbWF0ZWRcIixcclxuICAgICAgICBjaGlsZDogXCIucHJvZ3Jlc3MtYmFyXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiXCIsIFwicHJvZ3Jlc3MtYmFyLWFuaW1hdGVkXCJdLFxyXG4gICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvbjogXCJwcm9ncmVzcy1iYXItYW5pbWF0ZWRcIixcclxuICAgICAgICAgICAgb2ZmOiBcIlwiLFxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcm9ncmVzczsiLCJpbXBvcnQgeyBTZWxlY3RJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgcGFnaW5hdGlvbiA9IHtcclxuICAgIGNsYXNzZXM6IFtcInBhZ2luYXRpb25cIl0sXHJcbiAgICBuYW1lOiBcIlBhZ2luYXRpb25cIixcclxuICAgIGltYWdlOiBcImljb25zL3BhZ2luYXRpb24uc3ZnXCIsXHJcbiAgICBodG1sOiAnPG5hdiBhcmlhLWxhYmVsPVwiUGFnZSBuYXZpZ2F0aW9uIGV4YW1wbGVcIj5cXFxyXG5cdCAgPHVsIGNsYXNzPVwicGFnaW5hdGlvblwiPlxcXHJcblx0XHQ8bGkgY2xhc3M9XCJwYWdlLWl0ZW1cIj48YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9XCIjXCI+UHJldmlvdXM8L2E+PC9saT5cXFxyXG5cdFx0PGxpIGNsYXNzPVwicGFnZS1pdGVtXCI+PGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmPVwiI1wiPjE8L2E+PC9saT5cXFxyXG5cdFx0PGxpIGNsYXNzPVwicGFnZS1pdGVtXCI+PGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmPVwiI1wiPjI8L2E+PC9saT5cXFxyXG5cdFx0PGxpIGNsYXNzPVwicGFnZS1pdGVtXCI+PGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmPVwiI1wiPjM8L2E+PC9saT5cXFxyXG5cdFx0PGxpIGNsYXNzPVwicGFnZS1pdGVtXCI+PGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmPVwiI1wiPk5leHQ8L2E+PC9saT5cXFxyXG5cdCAgPC91bD5cXFxyXG5cdDwvbmF2PicsXHJcblxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIlNpemVcIixcclxuICAgICAgICBrZXk6IFwic2l6ZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiYnRuLWxnXCIsIFwiYnRuLXNtXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWxnXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxhcmdlXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLXNtXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlNtYWxsXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJBbGlnbm1lbnRcIixcclxuICAgICAgICBrZXk6IFwiYWxpZ25tZW50XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXCIsIFwianVzdGlmeS1jb250ZW50LWVuZFwiXSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImp1c3RpZnktY29udGVudC1jZW50ZXJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiQ2VudGVyXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwianVzdGlmeS1jb250ZW50LWVuZFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJSaWdodFwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBhZ2luYXRpb247IiwiaW1wb3J0IHsgVGV4dElucHV0LCBUb2dnbGVJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgcGFnZWl0ZW0gPSB7XHJcbiAgICBjbGFzc2VzOiBbXCJwYWdlLWl0ZW1cIl0sXHJcbiAgICBodG1sOiAnPGxpIGNsYXNzPVwicGFnZS1pdGVtXCI+PGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmPVwiI1wiPjE8L2E+PC9saT4nLFxyXG4gICAgbmFtZTogXCJQYWdpbmF0aW9uIEl0ZW1cIixcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJMaW5rIFRvXCIsXHJcbiAgICAgICAga2V5OiBcImhyZWZcIixcclxuICAgICAgICBodG1sQXR0cjogXCJocmVmXCIsXHJcbiAgICAgICAgY2hpbGQ6IFwiLnBhZ2UtbGlua1wiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJEaXNhYmxlZFwiLFxyXG4gICAgICAgIGtleTogXCJkaXNhYmxlZFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImRpc2FibGVkXCJdLFxyXG4gICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvbjogXCJkaXNhYmxlZFwiLFxyXG4gICAgICAgICAgICBvZmY6IFwiXCJcclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGFnZWl0ZW07IiwiaW1wb3J0IHsgU2VsZWN0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgYmdjb2xvckNsYXNzZXMsIGJnY29sb3JTZWxlY3RPcHRpb25zIH0gZnJvbSAnLi4vY29tbW9uJztcclxuXHJcbmNvbnN0IG5hdmJhciA9IHtcclxuICAgIGNsYXNzZXM6IFtcIm5hdmJhclwiXSxcclxuICAgIGltYWdlOiBcImljb25zL25hdmJhci5zdmdcIixcclxuICAgIG5hbWU6IFwiTmF2IEJhclwiLFxyXG4gICAgaHRtbDogJzxuYXYgY2xhc3M9XCJuYXZiYXIgbmF2YmFyLWV4cGFuZC1sZyBuYXZiYXItbGlnaHQgYmctbGlnaHRcIj5cXFxyXG5cdFx0ICA8YSBjbGFzcz1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCIjXCI+TmF2YmFyPC9hPlxcXHJcblx0XHQgIDxidXR0b24gY2xhc3M9XCJuYXZiYXItdG9nZ2xlclwiIHR5cGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS10YXJnZXQ9XCIjbmF2YmFyU3VwcG9ydGVkQ29udGVudFwiIGFyaWEtY29udHJvbHM9XCJuYXZiYXJTdXBwb3J0ZWRDb250ZW50XCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgYXJpYS1sYWJlbD1cIlRvZ2dsZSBuYXZpZ2F0aW9uXCI+XFxcclxuXHRcdFx0PHNwYW4gY2xhc3M9XCJuYXZiYXItdG9nZ2xlci1pY29uXCI+PC9zcGFuPlxcXHJcblx0XHQgIDwvYnV0dG9uPlxcXHJcblx0XHRcXFxyXG5cdFx0ICA8ZGl2IGNsYXNzPVwiY29sbGFwc2UgbmF2YmFyLWNvbGxhcHNlXCIgaWQ9XCJuYXZiYXJTdXBwb3J0ZWRDb250ZW50XCI+XFxcclxuXHRcdFx0PHVsIGNsYXNzPVwibmF2YmFyLW5hdiBtci1hdXRvXCI+XFxcclxuXHRcdFx0ICA8bGkgY2xhc3M9XCJuYXYtaXRlbSBhY3RpdmVcIj5cXFxyXG5cdFx0XHRcdDxhIGNsYXNzPVwibmF2LWxpbmtcIiBocmVmPVwiI1wiPkhvbWUgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+KGN1cnJlbnQpPC9zcGFuPjwvYT5cXFxyXG5cdFx0XHQgIDwvbGk+XFxcclxuXHRcdFx0ICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPlxcXHJcblx0XHRcdFx0PGEgY2xhc3M9XCJuYXYtbGlua1wiIGhyZWY9XCIjXCI+TGluazwvYT5cXFxyXG5cdFx0XHQgIDwvbGk+XFxcclxuXHRcdFx0ICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPlxcXHJcblx0XHRcdFx0PGEgY2xhc3M9XCJuYXYtbGluayBkaXNhYmxlZFwiIGhyZWY9XCIjXCI+RGlzYWJsZWQ8L2E+XFxcclxuXHRcdFx0ICA8L2xpPlxcXHJcblx0XHRcdDwvdWw+XFxcclxuXHRcdFx0PGZvcm0gY2xhc3M9XCJmb3JtLWlubGluZSBteS0yIG15LWxnLTBcIj5cXFxyXG5cdFx0XHQgIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbCBtci1zbS0yXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiIGFyaWEtbGFiZWw9XCJTZWFyY2hcIj5cXFxyXG5cdFx0XHQgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLW91dGxpbmUtc3VjY2VzcyBteS0yIG15LXNtLTBcIiB0eXBlPVwic3VibWl0XCI+U2VhcmNoPC9idXR0b24+XFxcclxuXHRcdFx0PC9mb3JtPlxcXHJcblx0XHQgIDwvZGl2PlxcXHJcblx0XHQ8L25hdj4nLFxyXG5cclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJDb2xvciB0aGVtZVwiLFxyXG4gICAgICAgIGtleTogXCJjb2xvclwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcIm5hdmJhci1saWdodFwiLCBcIm5hdmJhci1kYXJrXCJdLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJuYXZiYXItbGlnaHRcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiTGlnaHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJuYXZiYXItZGFya1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEYXJrXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJCYWNrZ3JvdW5kIGNvbG9yXCIsXHJcbiAgICAgICAga2V5OiBcImJhY2tncm91bmRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBiZ2NvbG9yQ2xhc3NlcyxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogYmdjb2xvclNlbGVjdE9wdGlvbnNcclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJQbGFjZW1lbnRcIixcclxuICAgICAgICBrZXk6IFwicGxhY2VtZW50XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiZml4ZWQtdG9wXCIsIFwiZml4ZWQtYm90dG9tXCIsIFwic3RpY2t5LXRvcFwiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiZml4ZWQtdG9wXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkZpeGVkIFRvcFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImZpeGVkLWJvdHRvbVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJGaXhlZCBCb3R0b21cIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJzdGlja3ktdG9wXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlN0aWNreSB0b3BcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuYXZiYXI7IiwiY29uc3QgbGlzdGl0ZW0gPSB7XHJcbiAgICBuYW1lOiBcIkxpc3QgSXRlbVwiLFxyXG4gICAgY2xhc3NlczogW1wibGlzdC1ncm91cC1pdGVtXCJdLFxyXG4gICAgaHRtbDogJzxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiPjxzcGFuIGNsYXNzPVwiYmFkZ2VcIj4xNDwvc3Bhbj4gQ3JhcyBqdXN0byBvZGlvPC9saT4nXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsaXN0aXRlbTsiLCJjb25zdCBsaXN0Z3JvdXAgPSB7XHJcbiAgICBuYW1lOiBcIkxpc3QgR3JvdXBcIixcclxuICAgIGltYWdlOiBcImljb25zL2xpc3RfZ3JvdXAuc3ZnXCIsXHJcbiAgICBjbGFzc2VzOiBbXCJsaXN0LWdyb3VwXCJdLFxyXG4gICAgaHRtbDogJzx1bCBjbGFzcz1cImxpc3QtZ3JvdXBcIj5cXG4gIDxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiPlxcbiAgICA8c3BhbiBjbGFzcz1cImJhZGdlXCI+MTQ8L3NwYW4+XFxuICAgIENyYXMganVzdG8gb2Rpb1xcbiAgPC9saT5cXG4gIDxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiPlxcbiAgICA8c3BhbiBjbGFzcz1cImJhZGdlXCI+Mjwvc3Bhbj5cXG4gICAgRGFwaWJ1cyBhYyBmYWNpbGlzaXMgaW5cXG4gIDwvbGk+XFxuICA8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj5cXG4gICAgPHNwYW4gY2xhc3M9XCJiYWRnZVwiPjE8L3NwYW4+XFxuICAgIE1vcmJpIGxlbyByaXN1c1xcbiAgPC9saT5cXG48L3VsPidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxpc3Rncm91cDsiLCJpbXBvcnQgeyBMaW5rSW5wdXQsIFRleHRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgbGluayA9IHtcclxuICAgIG5vZGVzOiBbXCJhXCJdLFxyXG4gICAgbmFtZTogXCJMaW5rXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiVXJsXCIsXHJcbiAgICAgICAga2V5OiBcImhyZWZcIixcclxuICAgICAgICBodG1sQXR0cjogXCJocmVmXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBMaW5rSW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlRhcmdldFwiLFxyXG4gICAgICAgIGtleTogXCJ0YXJnZXRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJ0YXJnZXRcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxpbms7IiwiaW1wb3J0IHsgVGV4dElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBsYWJlbCA9IHtcclxuICAgIG5hbWU6ICdMYWJlbCcsXHJcbiAgICBub2RlczogWydsYWJlbCddLFxyXG4gICAgaW1hZ2U6ICdpY29ucy9sYWJlbC5zdmcnLFxyXG4gICAgaHRtbDogJzxsYWJlbCBmb3I9XCJcIj5MYWJlbDwvbGFiZWw+JyxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogJ0ZvciBpZCcsXHJcbiAgICAgICAgaHRtbEF0dHI6ICdmb3InLFxyXG4gICAgICAgIGtleTogJ2ZvcicsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsYWJlbDsiLCJjb25zdCBqdW1ib3Ryb24gPSB7XHJcbiAgICBjbGFzc2VzOiBbXCJqdW1ib3Ryb25cIl0sXHJcbiAgICBpbWFnZTogXCJpY29ucy9qdW1ib3Ryb24uc3ZnXCIsXHJcbiAgICBuYW1lOiBcIkp1bWJvdHJvblwiLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJqdW1ib3Ryb25cIj5cXFxyXG5cdFx0ICA8aDEgY2xhc3M9XCJkaXNwbGF5LTNcIj5IZWxsbywgd29ybGQhPC9oMT5cXFxyXG5cdFx0ICA8cCBjbGFzcz1cImxlYWRcIj5UaGlzIGlzIGEgc2ltcGxlIGhlcm8gdW5pdCwgYSBzaW1wbGUganVtYm90cm9uLXN0eWxlIGNvbXBvbmVudCBmb3IgY2FsbGluZyBleHRyYSBhdHRlbnRpb24gdG8gZmVhdHVyZWQgY29udGVudCBvciBpbmZvcm1hdGlvbi48L3A+XFxcclxuXHRcdCAgPGhyIGNsYXNzPVwibXktNFwiPlxcXHJcblx0XHQgIDxwPkl0IHVzZXMgdXRpbGl0eSBjbGFzc2VzIGZvciB0eXBvZ3JhcGh5IGFuZCBzcGFjaW5nIHRvIHNwYWNlIGNvbnRlbnQgb3V0IHdpdGhpbiB0aGUgbGFyZ2VyIGNvbnRhaW5lci48L3A+XFxcclxuXHRcdCAgPHAgY2xhc3M9XCJsZWFkXCI+XFxcclxuXHRcdFx0PGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLWxnXCIgaHJlZj1cIiNcIiByb2xlPVwiYnV0dG9uXCI+TGVhcm4gbW9yZTwvYT5cXFxyXG5cdFx0ICA8L3A+XFxcclxuXHRcdDwvZGl2PidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGp1bWJvdHJvbjsiLCJpbXBvcnQgVnZ2ZWIgZnJvbSAnLi4vLi4vYnVpbGRlcidcclxuaW1wb3J0IHsgRmlsZVVwbG9hZElucHV0LCBUZXh0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGltYWdlID0ge1xyXG4gICAgbm9kZXM6IFtcImltZ1wiXSxcclxuICAgIG5hbWU6IFwiSW1hZ2VcIixcclxuICAgIGh0bWw6ICc8aW1nIHNyYz1cIicgKyBWdnZlYi5iYXNlVXJsICsgJ2ljb25zL2ltYWdlLnN2Z1wiIGhlaWdodD1cIjEyOFwiIHdpZHRoPVwiMTI4XCI+JyxcclxuICAgIC8qXHJcbiAgICBhZnRlckRyb3A6IGZ1bmN0aW9uIChub2RlKVxyXG5cdHtcclxuXHRcdG5vZGUuYXR0cihcInNyY1wiLCAnJyk7XHJcblx0XHRyZXR1cm4gbm9kZTtcclxuXHR9LCovXHJcbiAgICBpbWFnZTogXCJpY29ucy9pbWFnZS5zdmdcIixcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJJbWFnZVwiLFxyXG4gICAgICAgIGtleTogXCJzcmNcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzcmNcIixcclxuICAgICAgICBpbnB1dHR5cGU6IEZpbGVVcGxvYWRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiV2lkdGhcIixcclxuICAgICAgICBrZXk6IFwid2lkdGhcIixcclxuICAgICAgICBodG1sQXR0cjogXCJ3aWR0aFwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJIZWlnaHRcIixcclxuICAgICAgICBrZXk6IFwiaGVpZ2h0XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiaGVpZ2h0XCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkFsdFwiLFxyXG4gICAgICAgIGtleTogXCJhbHRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJhbHRcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGltYWdlOyIsImNvbnN0IGhyID0ge1xyXG4gICAgaW1hZ2U6IFwiaWNvbnMvaHIuc3ZnXCIsXHJcbiAgICBub2RlczogW1wiaHJcIl0sXHJcbiAgICBuYW1lOiBcIkhvcml6b250YWwgUnVsZVwiLFxyXG4gICAgaHRtbDogXCI8aHI+XCJcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgaHI7IiwiaW1wb3J0IHsgY2hhbmdlTm9kZU5hbWUgfSBmcm9tICcuLi9jb21tb24nO1xyXG5pbXBvcnQgeyBTZWxlY3RJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgaGVhZGluZyA9ICB7XHJcbiAgICBpbWFnZTogXCJpY29ucy9oZWFkaW5nLnN2Z1wiLFxyXG4gICAgbmFtZTogXCJIZWFkaW5nXCIsXHJcbiAgICBub2RlczogW1wiaDFcIiwgXCJoMlwiLCBcImgzXCIsIFwiaDRcIiwgXCJoNVwiLCBcImg2XCJdLFxyXG4gICAgaHRtbDogXCI8aDE+SGVhZGluZzwvaDE+XCIsXHJcblxyXG4gICAgcHJvcGVydGllczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJTaXplXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJpZFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJpZFwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG5cclxuICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBjaGFuZ2VOb2RlTmFtZShub2RlLCBcImhcIiArIHZhbHVlKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVnZXg7XHJcbiAgICAgICAgICAgICAgICByZWdleCA9IC9IKFxcZCkvLmV4ZWMobm9kZS5ub2RlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVnZXggJiYgcmVnZXhbMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVnZXhbMV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiAxXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjFcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIjFcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjJcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIjJcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjNcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIjNcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIjRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjVcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIjVcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjZcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIjZcIlxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGVhZGluZzsiLCJpbXBvcnQgeyBHcmlkSW5wdXQsIEJ1dHRvbklucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBncmlkcm93ID0ge1xyXG4gICAgbmFtZTogXCJHcmlkIFJvd1wiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvZ3JpZF9yb3cuc3ZnXCIsXHJcbiAgICBjbGFzc2VzOiBbXCJyb3dcIl0sXHJcbiAgICBodG1sOiAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPjxoMz5jb2wtc20tNDwvaDM+PC9kaXY+PGRpdiBjbGFzcz1cImNvbC1zbS00IGNvbC01XCI+PGgzPmNvbC1zbS00PC9oMz48L2Rpdj48ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj48aDM+Y29sLXNtLTQ8L2gzPjwvZGl2PjwvZGl2PicsXHJcblxyXG4gICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICBwcm9wZXJ0aWVzID0gW107XHJcbiAgICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICAgIHZhciBqID0gMDtcclxuXHJcbiAgICAgICAgJChub2RlKS5maW5kKCdbY2xhc3MqPVwiY29sLVwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfY2xhc3MgPSAkKHRoaXMpLmF0dHIoXCJjbGFzc1wiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZWcgPSAvY29sLShbXi1cXCQgXSopPy0/KFxcZCspL2c7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaDtcclxuICAgICAgICAgICAgZGF0YSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgd2hpbGUgKChtYXRjaCA9IHJlZy5leGVjKF9jbGFzcykpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFbXCJjb2xcIiArICgobWF0Y2hbMV0gIT0gdW5kZWZpbmVkKSA/IFwiX1wiICsgbWF0Y2hbMV0gOiBcIlwiKV0gPSBtYXRjaFsyXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJDb2x1bW4gXCIgKyBpLFxyXG4gICAgICAgICAgICAgICAga2V5OiBcImNvbHVtblwiICsgaSxcclxuICAgICAgICAgICAgICAgIC8vaW5kZXg6IGkgLSAxLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uTm9kZTogdGhpcyxcclxuICAgICAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGlucHV0dHlwZTogR3JpZElucHV0LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSwgdmFsdWUsIGlucHV0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vY29sdW1uID0gJCgnW2NsYXNzKj1cImNvbC1cIl06ZXEoJyArIHRoaXMuaW5kZXggKyAnKScsIG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbiA9ICQodGhpcy5jb2x1bW5Ob2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiByZW1vdmUgYnV0dG9uIGlzIGNsaWNrZWQgcmVtb3ZlIGNvbHVtbiBhbmQgcmVuZGVyIHJvdyBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Lm5vZGVOYW1lID09ICdCVVRUT04nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbi5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIoXCJodG1sL2dyaWRyb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiBzZWxlY3QgaW5wdXQgdGhlbiBjaGFuZ2UgY29sdW1uIGNsYXNzXHJcbiAgICAgICAgICAgICAgICAgICAgX2NsYXNzID0gY29sdW1uLmF0dHIoXCJjbGFzc1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZW1vdmUgcHJldmlvdXMgYnJlYWtwb2ludCBjb2x1bW4gc2l6ZVxyXG4gICAgICAgICAgICAgICAgICAgIF9jbGFzcyA9IF9jbGFzcy5yZXBsYWNlKG5ldyBSZWdFeHAoaW5wdXQubmFtZSArICctXFxcXGQrPycpLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hZGQgbmV3IGNvbHVtbiBzaXplXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlKSBfY2xhc3MgKz0gJyAnICsgaW5wdXQubmFtZSArICctJyArIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbi5hdHRyKFwiY2xhc3NcIiwgX2NsYXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9yZW1vdmUgYWxsIGNvbHVtbiBwcm9wZXJ0aWVzXHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gdGhpcy5wcm9wZXJ0aWVzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5rZXkuaW5kZXhPZihcImNvbHVtblwiKSA9PT0gLTE7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vYWRkIHJlbWFpbmluZyBwcm9wZXJ0aWVzIHRvIGdlbmVyYXRlZCBjb2x1bW4gcHJvcGVydGllc1xyXG4gICAgICAgIHByb3BlcnRpZXMucHVzaCh0aGlzLnByb3BlcnRpZXNbMF0pO1xyXG5cclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiQ29sdW1uXCIsXHJcbiAgICAgICAga2V5OiBcImNvbHVtbjFcIixcclxuICAgICAgICBpbnB1dHR5cGU6IEdyaWRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiQ29sdW1uXCIsXHJcbiAgICAgICAga2V5OiBcImNvbHVtbjFcIixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgY29sOiAxMixcclxuICAgICAgICBpbnB1dHR5cGU6IEdyaWRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAga2V5OiBcImFkZENoaWxkXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBCdXR0b25JbnB1dCxcclxuICAgICAgICBkYXRhOiB7IHRleHQ6IFwiQWRkIGNvbHVtblwiIH0sXHJcbiAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgICAgICQobm9kZSkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiY29sLTNcIj5Db2wtMzwvZGl2PicpO1xyXG5cclxuICAgICAgICAgICAgLy9yZW5kZXIgY29tcG9uZW50IHByb3BlcnRpZXMgYWdhaW4gdG8gaW5jbHVkZSB0aGUgbmV3IGNvbHVtbiBpbnB1dHNcclxuICAgICAgICAgICAgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIoXCJodG1sL2dyaWRyb3dcIik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ3JpZHJvdzsiLCJpbXBvcnQgeyBHcmlkSW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGdyaWRjb2x1bW4gPSB7XHJcbiAgICBuYW1lOiBcIkdyaWQgQ29sdW1uXCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9ncmlkX3Jvdy5zdmdcIixcclxuICAgIGNsYXNzZXNSZWdleDogW1wiY29sLVwiXSxcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj48aDM+Y29sLXNtLTQ8L2gzPjwvZGl2PicsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiQ29sdW1uXCIsXHJcbiAgICAgICAga2V5OiBcImNvbHVtblwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogR3JpZElucHV0LFxyXG4gICAgICAgIGRhdGE6IHsgaGlkZV9yZW1vdmU6IHRydWUgfSxcclxuXHJcbiAgICAgICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAgICAgX2NsYXNzID0gJChub2RlKS5hdHRyKFwiY2xhc3NcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVnID0gL2NvbC0oW14tXFwkIF0qKT8tPyhcXGQrKS9nO1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2g7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoKG1hdGNoID0gcmVnLmV4ZWMoX2NsYXNzKSkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhW1wiY29sXCIgKyAoKG1hdGNoWzFdICE9IHVuZGVmaW5lZCkgPyBcIl9cIiArIG1hdGNoWzFdIDogXCJcIildID0gbWF0Y2hbMl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKG5vZGUsIHZhbHVlLCBpbnB1dCkge1xyXG4gICAgICAgICAgICBfY2xhc3MgPSBub2RlLmF0dHIoXCJjbGFzc1wiKTtcclxuXHJcbiAgICAgICAgICAgIC8vcmVtb3ZlIHByZXZpb3VzIGJyZWFrcG9pbnQgY29sdW1uIHNpemVcclxuICAgICAgICAgICAgX2NsYXNzID0gX2NsYXNzLnJlcGxhY2UobmV3IFJlZ0V4cChpbnB1dC5uYW1lICsgJy1cXFxcZCs/JyksICcnKTtcclxuICAgICAgICAgICAgLy9hZGQgbmV3IGNvbHVtbiBzaXplXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSkgX2NsYXNzICs9ICcgJyArIGlucHV0Lm5hbWUgKyAnLScgKyB2YWx1ZTtcclxuICAgICAgICAgICAgbm9kZS5hdHRyKFwiY2xhc3NcIiwgX2NsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH0sXHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ3JpZGNvbHVtbjsiLCJpbXBvcnQgeyBUZXh0SW5wdXQsIFNlbGVjdElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBmb3JtID0ge1xyXG4gICAgbm9kZXM6IFtcImZvcm1cIl0sXHJcbiAgICBpbWFnZTogXCJpY29ucy9mb3JtLnN2Z1wiLFxyXG4gICAgbmFtZTogXCJGb3JtXCIsXHJcbiAgICBodG1sOiAnPGZvcm0gY2xhc3M9XCJkcm9wem9uZVwiPjwvZm9ybT4nLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIlN0eWxlXCIsXHJcbiAgICAgICAga2V5OiBcInN0eWxlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiXCIsIFwiZm9ybS1zZWFyY2hcIiwgXCJmb3JtLWlubGluZVwiLCBcImZvcm0taG9yaXpvbnRhbFwiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiZm9ybS1zZWFyY2hcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU2VhcmNoXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiZm9ybS1pbmxpbmVcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5saW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiZm9ybS1ob3Jpem9udGFsXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhvcml6b250YWxcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkFjdGlvblwiLFxyXG4gICAgICAgIGtleTogXCJhY3Rpb25cIixcclxuICAgICAgICBodG1sQXR0cjogXCJhY3Rpb25cIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiTWV0aG9kXCIsXHJcbiAgICAgICAga2V5OiBcIm1ldGhvZFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcIm1ldGhvZFwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZm9ybTsiLCJjb25zdCBmaWxlaW5wdXQgPSB7XHJcbiAgICBuYW1lOiBcIklucHV0IGdyb3VwXCIsXHJcbiAgICBhdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBcImZpbGVcIiB9LFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvdGV4dF9pbnB1dC5zdmdcIixcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxcXHJcblx0XHRcdCAgPGlucHV0IHR5cGU9XCJmaWxlXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cXFxyXG5cdFx0XHQ8L2Rpdj4nXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmaWxlaW5wdXQ7IiwiaW1wb3J0IHsgYmdjb2xvclNlbGVjdE9wdGlvbnMsIGJnY29sb3JDbGFzc2VzIH0gZnJvbSAnLi4vY29tbW9uJztcclxuaW1wb3J0IHsgU2VsZWN0SW5wdXQsIENvbG9ySW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGRpdiA9IHtcclxuICAgIGNsYXNzZXM6IFtcImNvbnRhaW5lclwiLCBcImNvbnRhaW5lci1mbHVpZFwiXSxcclxuICAgIGltYWdlOiBcImljb25zL2Rpdi5zdmdcIixcclxuICAgIGh0bWw6ICc8ZGl2IHN0eWxlPVwid2lkdGg6IDM1MHB4OyBoZWlnaHQ6IDIwMHB4O1wiIGNsYXNzPVwiZHJvcHpvbmVcIj48L2Rpdj4nLFxyXG4gICAgbmFtZTogXCJEaXZcIixcclxuICAgIHByb3BlcnRpZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICAgICAgICBrZXk6IFwidHlwZVwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1wiY29udGFpbmVyXCIsIFwiY29udGFpbmVyLWZsdWlkXCJdLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImNvbnRhaW5lclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiY29udGFpbmVyLWZsdWlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJGbHVpZFwiXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiQmFja2dyb3VuZFwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiYmFja2dyb3VuZFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogYmdjb2xvckNsYXNzZXMsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IGJnY29sb3JTZWxlY3RPcHRpb25zXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJCYWNrZ3JvdW5kIENvbG9yXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJiYWNrZ3JvdW5kLWNvbG9yXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ29sb3JJbnB1dCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJUZXh0IENvbG9yXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJjb2xvclwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENvbG9ySW5wdXQsXHJcbiAgICAgICAgfV0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkaXY7IiwiaW1wb3J0IHsgU2VsZWN0SW5wdXQsIENvbG9ySW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgYmdjb2xvckNsYXNzZXMsIGJnY29sb3JTZWxlY3RPcHRpb25zIH0gZnJvbSAnLi4vY29tbW9uJztcclxuXHJcbmNvbnN0IGNvbnRhaW5lciA9IHtcclxuICAgIGNsYXNzZXM6IFtcImNvbnRhaW5lclwiLCBcImNvbnRhaW5lci1mbHVpZFwiXSxcclxuICAgIGltYWdlOiBcImljb25zL2NvbnRhaW5lci5zdmdcIixcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwiY29udGFpbmVyIGRyb3B6b25lXCI+PGRpdiBjbGFzcz1cIm0tNVwiPkNvbnRhaW5lcjwvZGl2PjwvZGl2PicsXHJcbiAgICBuYW1lOiBcIkNvbnRhaW5lclwiLFxyXG4gICAgcHJvcGVydGllczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJUeXBlXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJ0eXBlXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJjb250YWluZXJcIiwgXCJjb250YWluZXItZmx1aWRcIl0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiY29udGFpbmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJjb250YWluZXItZmx1aWRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkZsdWlkXCJcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJCYWNrZ3JvdW5kXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJiYWNrZ3JvdW5kXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBiZ2NvbG9yQ2xhc3NlcyxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogYmdjb2xvclNlbGVjdE9wdGlvbnNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkJhY2tncm91bmQgQ29sb3JcIixcclxuICAgICAgICAgICAga2V5OiBcImJhY2tncm91bmQtY29sb3JcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDb2xvcklucHV0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlRleHQgQ29sb3JcIixcclxuICAgICAgICAgICAga2V5OiBcImNvbG9yXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ29sb3JJbnB1dCxcclxuICAgICAgICB9XSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbnRhaW5lcjtcclxuXHJcbiIsImltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgY2hlY2tib3ggPSB7XHJcbiAgICBuYW1lOiBcIkNoZWNrYm94XCIsXHJcbiAgICBhdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBcImNoZWNrYm94XCIgfSxcclxuICAgIGltYWdlOiBcImljb25zL2NoZWNrYm94LnN2Z1wiLFxyXG4gICAgaHRtbDogJzxsYWJlbCBjbGFzcz1cImNoZWNrYm94XCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiPiBDaGVja2JveDwvbGFiZWw+JyxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJOYW1lXCIsXHJcbiAgICAgICAga2V5OiBcIm5hbWVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJuYW1lXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjaGVja2JveDsiLCJjb25zdCBjYXJkID0ge1xyXG4gICAgY2xhc3NlczogW1wiY2FyZFwiXSxcclxuICAgIGltYWdlOiBcImljb25zL3BhbmVsLnN2Z1wiLFxyXG4gICAgbmFtZTogXCJDYXJkXCIsXHJcbiAgICBodG1sOiAnPGRpdiBjbGFzcz1cImNhcmRcIj5cXFxyXG5cdFx0ICA8aW1nIGNsYXNzPVwiY2FyZC1pbWctdG9wXCIgc3JjPVwiLi4vbGlicy9idWlsZGVyL2ljb25zL2ltYWdlLnN2Z1wiIGFsdD1cIkNhcmQgaW1hZ2UgY2FwXCIgd2lkdGg9XCIxMjhcIiBoZWlnaHQ9XCIxMjhcIj5cXFxyXG5cdFx0ICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XFxcclxuXHRcdFx0PGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPkNhcmQgdGl0bGU8L2g0PlxcXHJcblx0XHRcdDxwIGNsYXNzPVwiY2FyZC10ZXh0XCI+U29tZSBxdWljayBleGFtcGxlIHRleHQgdG8gYnVpbGQgb24gdGhlIGNhcmQgdGl0bGUgYW5kIG1ha2UgdXAgdGhlIGJ1bGsgb2YgdGhlIGNhcmRcXCdzIGNvbnRlbnQuPC9wPlxcXHJcblx0XHRcdDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIj5HbyBzb21ld2hlcmU8L2E+XFxcclxuXHRcdCAgPC9kaXY+XFxcclxuXHRcdDwvZGl2PidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNhcmQ7IiwiY29uc3QgYnV0dG9udG9vbGJhciA9ICB7XHJcbiAgICBjbGFzc2VzOiBbXCJidG4tdG9vbGJhclwiXSxcclxuICAgIG5hbWU6IFwiQnV0dG9uIFRvb2xiYXJcIixcclxuICAgIGltYWdlOiBcImljb25zL2J1dHRvbl90b29sYmFyLnN2Z1wiLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJidG4tdG9vbGJhclwiIHJvbGU9XCJ0b29sYmFyXCIgYXJpYS1sYWJlbD1cIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXCI+XFxcclxuXHRcdCAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cCBtci0yXCIgcm9sZT1cImdyb3VwXCIgYXJpYS1sYWJlbD1cIkZpcnN0IGdyb3VwXCI+XFxcclxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiPjE8L2J1dHRvbj5cXFxyXG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCI+MjwvYnV0dG9uPlxcXHJcblx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIj4zPC9idXR0b24+XFxcclxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiPjQ8L2J1dHRvbj5cXFxyXG5cdFx0ICA8L2Rpdj5cXFxyXG5cdFx0ICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIG1yLTJcIiByb2xlPVwiZ3JvdXBcIiBhcmlhLWxhYmVsPVwiU2Vjb25kIGdyb3VwXCI+XFxcclxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiPjU8L2J1dHRvbj5cXFxyXG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCI+NjwvYnV0dG9uPlxcXHJcblx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIj43PC9idXR0b24+XFxcclxuXHRcdCAgPC9kaXY+XFxcclxuXHRcdCAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIHJvbGU9XCJncm91cFwiIGFyaWEtbGFiZWw9XCJUaGlyZCBncm91cFwiPlxcXHJcblx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIj44PC9idXR0b24+XFxcclxuXHRcdCAgPC9kaXY+XFxcclxuXHRcdDwvZGl2PidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1dHRvbnRvb2xiYXI7IiwiaW1wb3J0IHsgU2VsZWN0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGJ1dHRvbmdyb3VwID0ge1xyXG4gICAgY2xhc3NlczogW1wiYnRuLWdyb3VwXCJdLFxyXG4gICAgbmFtZTogXCJCdXR0b24gR3JvdXBcIixcclxuICAgIGltYWdlOiBcImljb25zL2J1dHRvbl9ncm91cC5zdmdcIixcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCIgYXJpYS1sYWJlbD1cIkJhc2ljIGV4YW1wbGVcIj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCI+TGVmdDwvYnV0dG9uPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIj5NaWRkbGU8L2J1dHRvbj4gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiPlJpZ2h0PC9idXR0b24+PC9kaXY+JyxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJTaXplXCIsXHJcbiAgICAgICAga2V5OiBcInNpemVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImJ0bi1ncm91cC1sZ1wiLCBcImJ0bi1ncm91cC1zbVwiXSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1ncm91cC1sZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMYXJnZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1ncm91cC1zbVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTbWFsbFwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiQWxpZ25tZW50XCIsXHJcbiAgICAgICAga2V5OiBcImFsaWdubWVudFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiYnRuLWdyb3VwXCIsIFwiYnRuLWdyb3VwLXZlcnRpY2FsXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWdyb3VwXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhvcml6b250YWxcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tZ3JvdXAtdmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiVmVydGljYWxcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidXR0b25ncm91cDsiLCJpbXBvcnQgeyBMaW5rSW5wdXQsIFNlbGVjdElucHV0LCBUZXh0SW5wdXQsIFRvZ2dsZUlucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBidXR0b24gPSB7XHJcbiAgICBjbGFzc2VzOiBbXCJidG5cIiwgXCJidG4tbGlua1wiXSxcclxuICAgIG5hbWU6IFwiQnV0dG9uXCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9idXR0b24uc3ZnXCIsXHJcbiAgICBodG1sOiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIj5QcmltYXJ5PC9idXR0b24+JyxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJMaW5rIFRvXCIsXHJcbiAgICAgICAga2V5OiBcImhyZWZcIixcclxuICAgICAgICBodG1sQXR0cjogXCJocmVmXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBMaW5rSW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlR5cGVcIixcclxuICAgICAgICBrZXk6IFwidHlwZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiYnRuLWRlZmF1bHRcIiwgXCJidG4tcHJpbWFyeVwiLCBcImJ0bi1pbmZvXCIsIFwiYnRuLXN1Y2Nlc3NcIiwgXCJidG4td2FybmluZ1wiLCBcImJ0bi1pbmZvXCIsIFwiYnRuLWxpZ2h0XCIsIFwiYnRuLWRhcmtcIiwgXCJidG4tb3V0bGluZS1wcmltYXJ5XCIsIFwiYnRuLW91dGxpbmUtaW5mb1wiLCBcImJ0bi1vdXRsaW5lLXN1Y2Nlc3NcIiwgXCJidG4tb3V0bGluZS13YXJuaW5nXCIsIFwiYnRuLW91dGxpbmUtaW5mb1wiLCBcImJ0bi1vdXRsaW5lLWxpZ2h0XCIsIFwiYnRuLW91dGxpbmUtZGFya1wiLCBcImJ0bi1saW5rXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJQcmltYXJ5XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuIGJ0bi1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm9cIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tc3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTdWNjZXNzXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLXdhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiV2FybmluZ1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm9cIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tbGlnaHRcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiTGlnaHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tZGFya1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEYXJrXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLW91dGxpbmUtcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJQcmltYXJ5IG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4gYnRuLW91dGxpbmUtaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJJbmZvIG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tb3V0bGluZS1zdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlN1Y2Nlc3Mgb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1vdXRsaW5lLXdhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiV2FybmluZyBvdXRsaW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLW91dGxpbmUtaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJJbmZvIG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tb3V0bGluZS1saWdodFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMaWdodCBvdXRsaW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLW91dGxpbmUtZGFya1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEYXJrIG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tbGlua1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMaW5rXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJTaXplXCIsXHJcbiAgICAgICAga2V5OiBcInNpemVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImJ0bi1sZ1wiLCBcImJ0bi1zbVwiXSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1sZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMYXJnZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1zbVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTbWFsbFwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiVGFyZ2V0XCIsXHJcbiAgICAgICAga2V5OiBcInRhcmdldFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInRhcmdldFwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJEaXNhYmxlZFwiLFxyXG4gICAgICAgIGtleTogXCJkaXNhYmxlZFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiZGlzYWJsZWRcIl0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvbjogXCJkaXNhYmxlZFwiLFxyXG4gICAgICAgICAgICBvZmY6IFwiXCJcclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnV0dG9uOyIsImNvbnN0IGJyZWFkY3J1bWJzID0gIHtcclxuICAgIGNsYXNzZXM6IFtcImJyZWFkY3J1bWJcIl0sXHJcbiAgICBuYW1lOiBcIkJyZWFkY3J1bWJzXCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9icmVhZGNydW1icy5zdmdcIixcclxuICAgIGh0bWw6ICc8b2wgY2xhc3M9XCJicmVhZGNydW1iXCI+XFxcclxuXHRcdCAgPGxpIGNsYXNzPVwiYnJlYWRjcnVtYi1pdGVtIGFjdGl2ZVwiPjxhIGhyZWY9XCIjXCI+SG9tZTwvYT48L2xpPlxcXHJcblx0XHQgIDxsaSBjbGFzcz1cImJyZWFkY3J1bWItaXRlbSBhY3RpdmVcIj48YSBocmVmPVwiI1wiPkxpYnJhcnk8L2E+PC9saT5cXFxyXG5cdFx0ICA8bGkgY2xhc3M9XCJicmVhZGNydW1iLWl0ZW0gYWN0aXZlXCI+RGF0YSAzPC9saT5cXFxyXG5cdFx0PC9vbD4nXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBicmVhZGNydW1iczsiLCJpbXBvcnQgeyBUb2dnbGVJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgYnJlYWRjcnVtYml0ZW0gPSB7XHJcbiAgICBjbGFzc2VzOiBbXCJicmVhZGNydW1iLWl0ZW1cIl0sXHJcbiAgICBuYW1lOiBcIkJyZWFkY3J1bWIgSXRlbVwiLFxyXG4gICAgaHRtbDogJzxsaSBjbGFzcz1cImJyZWFkY3J1bWItaXRlbVwiPjxhIGhyZWY9XCIjXCI+TGlicmFyeTwvYT48L2xpPicsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiQWN0aXZlXCIsXHJcbiAgICAgICAga2V5OiBcImFjdGl2ZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcIlwiLCBcImFjdGl2ZVwiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb246IFwiYWN0aXZlXCIsXHJcbiAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJyZWFkY3J1bWJpdGVtOyIsImltcG9ydCB7IFNlbGVjdElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBiYWRnZSA9IHtcclxuICAgIGNsYXNzZXM6IFtcImJhZGdlXCJdLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvYmFkZ2Uuc3ZnXCIsXHJcbiAgICBuYW1lOiBcIkJhZGdlXCIsXHJcbiAgICBodG1sOiAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1wcmltYXJ5XCI+UHJpbWFyeSBiYWRnZTwvc3Bhbj4nLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIkNvbG9yXCIsXHJcbiAgICAgICAga2V5OiBcImNvbG9yXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiYmFkZ2UtcHJpbWFyeVwiLCBcImJhZGdlLXNlY29uZGFyeVwiLCBcImJhZGdlLXN1Y2Nlc3NcIiwgXCJiYWRnZS1kYW5nZXJcIiwgXCJiYWRnZS13YXJuaW5nXCIsIFwiYmFkZ2UtaW5mb1wiLCBcImJhZGdlLWxpZ2h0XCIsIFwiYmFkZ2UtZGFya1wiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYmFkZ2UtcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJQcmltYXJ5XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYmFkZ2Utc2Vjb25kYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlNlY29uZGFyeVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJhZGdlLXN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU3VjY2Vzc1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJhZGdlLXdhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiV2FybmluZ1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJhZGdlLWRhbmdlclwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEYW5nZXJcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJiYWRnZS1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm9cIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJiYWRnZS1saWdodFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMaWdodFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJhZGdlLWRhcmtcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGFya1wiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJhZGdlOyIsImltcG9ydCB7IFNlbGVjdElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBhbGVydCA9IHtcclxuICAgIGNsYXNzZXM6IFtcImFsZXJ0XCJdLFxyXG4gICAgbmFtZTogXCJBbGVydFwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvYWxlcnQuc3ZnXCIsXHJcbiAgICBodG1sOiAnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXdhcm5pbmcgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+XFxcclxuXHRcdCAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XFxcclxuXHRcdFx0PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cXFxyXG5cdFx0ICA8L2J1dHRvbj5cXFxyXG5cdFx0ICA8c3Ryb25nPkhvbHkgZ3VhY2Ftb2xlITwvc3Ryb25nPiBZb3Ugc2hvdWxkIGNoZWNrIGluIG9uIHNvbWUgb2YgdGhvc2UgZmllbGRzIGJlbG93LlxcXHJcblx0XHQ8L2Rpdj4nLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIlR5cGVcIixcclxuICAgICAgICBrZXk6IFwidHlwZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImFsZXJ0LXByaW1hcnlcIiwgXCJhbGVydC1zZWNvbmRhcnlcIiwgXCJhbGVydC1zdWNjZXNzXCIsIFwiYWxlcnQtZGFuZ2VyXCIsIFwiYWxlcnQtd2FybmluZ1wiLCBcImFsZXJ0LWluZm9cIiwgXCJhbGVydC1saWdodFwiLCBcImFsZXJ0LWRhcmtcIl0sXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJhbGVydC1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJhbGVydC1zZWNvbmRhcnlcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU2Vjb25kYXJ5XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYWxlcnQtc3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTdWNjZXNzXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYWxlcnQtZGFuZ2VyXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhbmdlclwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImFsZXJ0LXdhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiV2FybmluZ1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImFsZXJ0LWluZm9cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImFsZXJ0LWxpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpZ2h0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYWxlcnQtZGFya1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEYXJrXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWxlcnQ7Il19
