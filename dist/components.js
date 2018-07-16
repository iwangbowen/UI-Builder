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

_builder2.default.ComponentsGroup['定制组件'] = ['html/labeldiv@oee', 'html/button@oee', 'html/textinput@oee', 'html/calendar@oee', _oee_ids.autoselectinputid, _oee_ids.manualselectinputid, 'html/radiobutton@oee', 'html/checkbox@oee', 'html/table@oee'];

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
    html: '<div class="everyOutbox-right draggable">\n            <div class="btn-group">\n                <div class="dailyBox">\n                    <select ' + _common.dataComponentId + '="' + _ids.manualselectinputid + '" class="form-control" lustyle="height: 2.8rem;width:13rem">\n                        <option value="value1">Text 1</option>\n                        <option value="value2">Text 2</option>\n                        <option value="value3">Text 3</option>\n                    </select>\n                </div>\n            </div>\n           </div>\n    ',
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

},{"../../inputs/inputs":170,"../../util/calendar":176,"../common":138,"../inputTypes":141}],99:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"dup":60}],98:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"../../inputs/inputs":170,"dup":59}],97:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require("../../inputs/inputs");

var button = {
    classes: ["btn", "btn-link", 'btn@oee'],
    name: "Button",
    image: "icons/button.svg",
    html: "<button type=\"button\" class=\"btn@oee draggable\">\n            <span class=\"glyphicon glyphicon-search\">Search</span>\n           </button>",
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

},{"../../inputs/inputs":170}],96:[function(require,module,exports){
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
    html: '<div class="everyOutbox-right draggable">\n            <div class="btn-group">\n                <div class="dailyBox">\n                    <select ' + _common.dataAutoSelectId + ' ' + _common.dataComponentId + '="' + _ids.autoselectinputid + '" class="form-control" lustyle="height: 2.8rem;width:13rem">\n                    </select>\n                </div>\n            </div>\n           </div>\n    ',
    properties: [{
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

exports.manualselectinputid = manualselectinputid;
exports.autoselectinputid = autoselectinputid;

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGNvbXBvbmVudHMuanMiLCJzcmNcXGNvbXBvbmVudHNcXHR5cG9ncmFwaHkuanMiLCJzcmNcXGNvbXBvbmVudHNcXHNpemUuanMiLCJzcmNcXGNvbXBvbmVudHNcXHBhZGRpbmcuanMiLCJzcmNcXGNvbXBvbmVudHNcXG1hcmdpbi5qcyIsInNyY1xcY29tcG9uZW50c1xcZWxlbWVudC5qcyIsInNyY1xcY29tcG9uZW50c1xcZGlzcGxheS5qcyIsInNyY1xcY29tcG9uZW50c1xcYm9yZGVyLmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxjb21wb25lbnRzLmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFx0ZXh0aW5wdXQuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXHRleHQuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXHNwYW4uanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXHNlbGVjdGlucHV0LmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxyYWRpb2J1dHRvbi5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcbWFudWFsc2VsZWN0aW5wdXQuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGxhYmVsZGl2LmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxjaGVja2JveC5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcY2FsZW5kYXIuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGJ1dHRvbi5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcYXV0b3NlbGVjdGlucHV0LmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxpZHMuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxjb21wb25lbnRzLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGV4dGlucHV0LmpzIiwic3JjXFxjb21wb25lbnRzXFxpbnB1dFR5cGVzLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGV4dGFyZWFpbnB1dC5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXHRhYmxlcm93LmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGFibGVoZWFkZXJjZWxsLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGFibGVoZWFkLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGFibGVjZWxsLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGFibGVib2R5LmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGFibGUuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxzZWxlY3RpbnB1dC5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXHJhZGlvYnV0dG9uLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxccHJvZ3Jlc3MuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxwYWdpbmF0aW9uLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxccGFnZWl0ZW0uanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxuYXZiYXIuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxsaXN0aXRlbS5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGxpc3Rncm91cC5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGxpbmsuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxsYWJlbC5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGp1bWJvdHJvbi5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGltYWdlLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcaHIuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxoZWFkaW5nLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcZ3JpZHJvdy5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGdyaWRjb2x1bW4uanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxmb3JtLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcZmlsZWlucHV0LmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcZGl2LmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcY29udGFpbmVyLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcY2hlY2tib3guanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxjYXJkLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcYnV0dG9udG9vbGJhci5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGJ1dHRvbmdyb3VwLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcYnV0dG9uLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcYnJlYWRjcnVtYnMuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxicmVhZGNydW1iaXRlbS5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGJhZGdlLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcYWxlcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7OztBQUNBOztJQUFZLFE7O0FBQ1o7O0lBQVksSTs7QUFDWjs7SUFBWSxROztBQUNaOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLGtCQUFNLGVBQU4sQ0FBc0IsTUFBdEIsSUFDSSxDQUFDLG1CQUFELEVBQXNCLGlCQUF0QixFQUF5QyxvQkFBekMsRUFBK0QsbUJBQS9ELEVBQW9GLFNBQVMsaUJBQTdGLEVBQWdILFNBQVMsbUJBQXpILEVBQ0ksc0JBREosRUFDNEIsbUJBRDVCLEVBQ2lELGdCQURq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YUFmTSxFQWtCTjtBQUNDLHVCQUFPLGFBRFI7QUFFQyxzQkFBTTtBQUZQLGFBbEJNLEVBcUJOO0FBQ0MsdUJBQU8sWUFEUjtBQUVDLHNCQUFNO0FBRlAsYUFyQk07QUFEUDtBQU5HLEtBQUQ7QUFWRixDQUFkOztrQkE4Q2UsSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgVnZ2ZWIgZnJvbSAnLi9idWlsZGVyJztcclxuaW1wb3J0ICogYXMgX2dlbmVyYWwgZnJvbSAnLi9jb21wb25lbnRzL0BnZW5lcmFsL2NvbXBvbmVudHMnO1xyXG5pbXBvcnQgKiBhcyBfb2VlIGZyb20gJy4vY29tcG9uZW50cy9Ab2VlL2NvbXBvbmVudHMnO1xyXG5pbXBvcnQgKiBhcyBfb2VlX2lkcyBmcm9tICcuL2NvbXBvbmVudHMvQG9lZS9pZHMnO1xyXG5pbXBvcnQgZWxlbWVudCBmcm9tICcuL2NvbXBvbmVudHMvZWxlbWVudCc7XHJcbmltcG9ydCBib3JkZXIgZnJvbSAnLi9jb21wb25lbnRzL2JvcmRlcic7XHJcbmltcG9ydCBwYWRkaW5nIGZyb20gJy4vY29tcG9uZW50cy9wYWRkaW5nJztcclxuaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi9jb21wb25lbnRzL2Rpc3BsYXknO1xyXG5pbXBvcnQgdHlwb2dyYXBoeSBmcm9tICcuL2NvbXBvbmVudHMvdHlwb2dyYXBoeSc7XHJcbmltcG9ydCBzaXplIGZyb20gJy4vY29tcG9uZW50cy9zaXplJztcclxuaW1wb3J0IG1hcmdpbiBmcm9tICcuL2NvbXBvbmVudHMvbWFyZ2luJztcclxuXHJcblZ2dmViLkNvbXBvbmVudHNHcm91cFsn5a6a5Yi257uE5Lu2J10gPVxyXG4gICAgWydodG1sL2xhYmVsZGl2QG9lZScsICdodG1sL2J1dHRvbkBvZWUnLCAnaHRtbC90ZXh0aW5wdXRAb2VlJywgJ2h0bWwvY2FsZW5kYXJAb2VlJywgX29lZV9pZHMuYXV0b3NlbGVjdGlucHV0aWQsIF9vZWVfaWRzLm1hbnVhbHNlbGVjdGlucHV0aWQsXHJcbiAgICAgICAgJ2h0bWwvcmFkaW9idXR0b25Ab2VlJywgJ2h0bWwvY2hlY2tib3hAb2VlJywgJ2h0bWwvdGFibGVAb2VlJ107XHJcblxyXG5WdnZlYi5Db21wb25lbnRzR3JvdXBbJ+mAmueUqOe7hOS7tiddID1cclxuICAgIFsnaHRtbC9sYWJlbEBnZW5lcmFsJywgJ2h0bWwvZGl2QGdlbmVyYWwnLCAnaHRtbC9idXR0b25AZ2VuZXJhbCcsICdodG1sL2J1dHRvbmdyb3VwQGdlbmVyYWwnLFxyXG4gICAgICAgICdodG1sL2J1dHRvbnRvb2xiYXJAZ2VuZXJhbCcsICdodG1sL2Zvcm1AZ2VuZXJhbCcsICdodG1sL3RleHRpbnB1dEBnZW5lcmFsJywgJ2h0bWwvdGV4dGFyZWFpbnB1dEBnZW5lcmFsJyxcclxuICAgICAgICAnaHRtbC9zZWxlY3RpbnB1dEBnZW5lcmFsJywgJ2h0bWwvZmlsZWlucHV0QGdlbmVyYWwnLCAnaHRtbC9jaGVja2JveEBnZW5lcmFsJywgJ2h0bWwvcmFkaW9idXR0b25AZ2VuZXJhbCcsXHJcbiAgICAgICAgJ2h0bWwvdGFibGVAZ2VuZXJhbCcsICdodG1sL2hlYWRpbmdAZ2VuZXJhbCcsICdodG1sL2ltYWdlQGdlbmVyYWwnLCAnaHRtbC9qdW1ib3Ryb25AZ2VuZXJhbCcsXHJcbiAgICAgICAgJ2h0bWwvYWxlcnRAZ2VuZXJhbCcsICdodG1sL2NhcmRAZ2VuZXJhbCcsICdodG1sL2xpc3Rncm91cEBnZW5lcmFsJywgJ2h0bWwvaHJAZ2VuZXJhbCcsICdodG1sL3RhZ2xhYmVsQGdlbmVyYWwnLFxyXG4gICAgICAgICdodG1sL2JhZGdlQGdlbmVyYWwnLCAnaHRtbC9wcm9ncmVzc0BnZW5lcmFsJywgJ2h0bWwvbmF2YmFyQGdlbmVyYWwnLCAnaHRtbC9icmVhZGNydW1ic0BnZW5lcmFsJywgJ2h0bWwvcGFnaW5hdGlvbkBnZW5lcmFsJyxcclxuICAgICAgICAnaHRtbC9jb250YWluZXJAZ2VuZXJhbCcsICdodG1sL2dyaWRyb3dAZ2VuZXJhbCddO1xyXG5cclxuVnZ2ZWIuQ29tcG9uZW50cy5hZGQoXCJfYmFzZVwiLCBlbGVtZW50KTtcclxuLy9kaXNwbGF5XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJfYmFzZVwiLCBkaXNwbGF5KTtcclxuLy9UeXBvZ3JhcGh5XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJfYmFzZVwiLCB0eXBvZ3JhcGh5KVxyXG4vL1NpemVcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcIl9iYXNlXCIsIHNpemUpO1xyXG4vL01hcmdpblxyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiX2Jhc2VcIiwgbWFyZ2luKTtcclxuLy9QYWRkaW5nXHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJfYmFzZVwiLCBwYWRkaW5nKTtcclxuLy9Cb3JkZXJcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcIl9iYXNlXCIsIGJvcmRlcik7XHJcblxyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9kaXZAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5kaXYpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9sYWJlbEBnZW5lcmFsXCIsIF9nZW5lcmFsLmxhYmVsKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvYnV0dG9uQGdlbmVyYWxcIiwgX2dlbmVyYWwuYnV0dG9uKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvY29udGFpbmVyQGdlbmVyYWxcIiwgX2dlbmVyYWwuY29udGFpbmVyKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvaGVhZGluZ0BnZW5lcmFsXCIsIF9nZW5lcmFsLmhlYWRpbmcpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9saW5rQGdlbmVyYWxcIiwgX2dlbmVyYWwubGluayk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2ltYWdlQGdlbmVyYWxcIiwgX2dlbmVyYWwuaW1hZ2UpO1xyXG5WdnZlYi5Db21wb25lbnRzLmFkZChcImh0bWwvaHJAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5ocik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2J1dHRvbmdyb3VwQGdlbmVyYWxcIiwgX2dlbmVyYWwuYnV0dG9uZ3JvdXApO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9idXR0b250b29sYmFyQGdlbmVyYWxcIiwgX2dlbmVyYWwuYnV0dG9udG9vbGJhcik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2FsZXJ0QGdlbmVyYWxcIiwgX2dlbmVyYWwuYWxlcnQpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9iYWRnZUBnZW5lcmFsXCIsIF9nZW5lcmFsLmJhZGdlKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvY2FyZEBnZW5lcmFsXCIsIF9nZW5lcmFsLmNhcmQpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9saXN0Z3JvdXBAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5saXN0Z3JvdXApO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9saXN0aXRlbUBnZW5lcmFsXCIsIF9nZW5lcmFsLmxpc3RpdGVtKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvYnJlYWRjcnVtYnNAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5icmVhZGNydW1icyk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2JyZWFkY3J1bWJpdGVtQGdlbmVyYWxcIiwgX2dlbmVyYWwuYnJlYWRjcnVtYml0ZW0pO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9wYWdpbmF0aW9uQGdlbmVyYWxcIiwgX2dlbmVyYWwucGFnaW5hdGlvbik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL3BhZ2VpdGVtQGdlbmVyYWxcIiwgX2dlbmVyYWwucGFnZWl0ZW0pO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9wcm9ncmVzc0BnZW5lcmFsXCIsIF9nZW5lcmFsLnByb2dyZXNzKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvanVtYm90cm9uQGdlbmVyYWxcIiwgX2dlbmVyYWwuanVtYm90cm9uKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvbmF2YmFyQGdlbmVyYWxcIiwgX2dlbmVyYWwubmF2YmFyKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvZm9ybUBnZW5lcmFsXCIsIF9nZW5lcmFsLmZvcm0pO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC90ZXh0aW5wdXRAZ2VuZXJhbFwiLCBfZ2VuZXJhbC50ZXh0aW5wdXQpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9zZWxlY3RpbnB1dEBnZW5lcmFsXCIsIF9nZW5lcmFsLnNlbGVjdGlucHV0KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvdGV4dGFyZWFpbnB1dEBnZW5lcmFsXCIsIF9nZW5lcmFsLnRleHRhcmVhaW5wdXQpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9yYWRpb2J1dHRvbkBnZW5lcmFsXCIsIF9nZW5lcmFsLnJhZGlvYnV0dG9uKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvY2hlY2tib3hAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5jaGVja2JveCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2ZpbGVpbnB1dEBnZW5lcmFsXCIsIF9nZW5lcmFsLmZpbGVpbnB1dCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL3RhYmxlQGdlbmVyYWxcIiwgX2dlbmVyYWwudGFibGUpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC90YWJsZXJvd0BnZW5lcmFsXCIsIF9nZW5lcmFsLnRhYmxlcm93KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvdGFibGVjZWxsQGdlbmVyYWxcIiwgX2dlbmVyYWwudGFibGVjZWxsKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvdGFibGVoZWFkZXJjZWxsQGdlbmVyYWxcIiwgX2dlbmVyYWwudGFibGVoZWFkZXJjZWxsKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvdGFibGVoZWFkQGdlbmVyYWxcIiwgX2dlbmVyYWwudGFibGVoZWFkKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvdGFibGVib2R5QGdlbmVyYWxcIiwgX2dlbmVyYWwudGFibGVib2R5KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5hZGQoXCJodG1sL2dyaWRjb2x1bW5AZ2VuZXJhbFwiLCBfZ2VuZXJhbC5ncmlkY29sdW1uKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5hZGQoXCJodG1sL2dyaWRyb3dAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5ncmlkcm93KTtcclxuXHJcblZ2dmViLkNvbXBvbmVudHMuYWRkKCdodG1sL2xhYmVsZGl2QG9lZScsIF9vZWUubGFiZWxkaXYpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZCgnX2Jhc2UnLCAnaHRtbC90ZXh0aW5wdXRAb2VlJywgX29lZS50ZXh0aW5wdXQpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZCgnX2Jhc2UnLCAnaHRtbC9idXR0b25Ab2VlJywgX29lZS5idXR0b24pO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZCgnX2Jhc2UnLCAnaHRtbC9yYWRpb2J1dHRvbkBvZWUnLCBfb2VlLnJhZGlvYnV0dG9uKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgJ2h0bWwvc3BhbkBvZWUnLCBfb2VlLnNwYW4pO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZCgnX2Jhc2UnLCAnaHRtbC9jaGVja2JveEBvZWUnLCBfb2VlLmNoZWNrYm94KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgJ2h0bWwvc2VsZWN0aW5wdXRAb2VlJywgX29lZS5zZWxlY3RpbnB1dCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKCdfYmFzZScsICdodG1sL3RhYmxlQG9lZScsIF9vZWUudGFibGUpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZCgnX2Jhc2UnLCAnaHRtbC9jYWxlbmRhckBvZWUnLCBfb2VlLmNhbGVuZGFyKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgJ2h0bWwvdGV4dEBvZWUnLCBfb2VlLnRleHQpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZCgnX2Jhc2UnLCBfb2VlX2lkcy5hdXRvc2VsZWN0aW5wdXRpZCwgX29lZS5hdXRvc2VsZWN0aW5wdXQpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZCgnX2Jhc2UnLCBfb2VlX2lkcy5tYW51YWxzZWxlY3RpbnB1dGlkLCBfb2VlLm1hbnVhbHNlbGVjdGlucHV0KTtcclxuXHJcbiIsImltcG9ydCB7IFNlY3Rpb25JbnB1dCwgU2VsZWN0SW5wdXQsIFJhZGlvQnV0dG9uSW5wdXQsIENzc1VuaXRJbnB1dCwgQ29sb3JJbnB1dCB9IGZyb20gJy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBpbmNfYmFzZV9zb3J0IH0gZnJvbSAnLi9jb21tb24nO1xyXG5cclxuY29uc3QgdHlwb2dyYXBoeSA9IHtcclxuICAgIHByb3BlcnRpZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGtleTogXCJ0eXBvZ3JhcGh5X2hlYWRlclwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlY3Rpb25JbnB1dCxcclxuICAgICAgICAgICAgbmFtZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgZGF0YTogeyBoZWFkZXI6IFwiVHlwb2dyYXBoeVwiIH0sXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkZvbnQgZmFtaWx5XCIsXHJcbiAgICAgICAgICAgIGtleTogXCJmb250LWZhbWlseVwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQXJpYWxcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnTHVjaWRhIFNhbnMgVW5pY29kZVwiLCBcIkx1Y2lkYSBHcmFuZGVcIiwgc2Fucy1zZXJpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0x1Y2lkYSBHcmFuZGUnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdQYWxhdGlubyBMaW5vdHlwZVwiLCBcIkJvb2sgQW50aXF1YVwiLCBQYWxhdGlubywgc2VyaWYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdQYWxhdGlubyBMaW5vdHlwZSdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1wiVGltZXMgTmV3IFJvbWFuXCIsIFRpbWVzLCBzZXJpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1RpbWVzIE5ldyBSb21hbidcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJHZW9yZ2lhLCBzZXJpZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiR2VvcmdpYSwgc2VyaWZcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlRhaG9tYSwgR2VuZXZhLCBzYW5zLXNlcmlmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJUYWhvbWFcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnQ29taWMgU2FucyBNUywgY3Vyc2l2ZSwgc2Fucy1zZXJpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0NvbWljIFNhbnMnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdWZXJkYW5hLCBHZW5ldmEsIHNhbnMtc2VyaWYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdWZXJkYW5hJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnSW1wYWN0LCBDaGFyY29hbCwgc2Fucy1zZXJpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0ltcGFjdCdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ0FyaWFsIEJsYWNrLCBHYWRnZXQsIHNhbnMtc2VyaWYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdBcmlhbCBCbGFjaydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1RyZWJ1Y2hldCBNUywgSGVsdmV0aWNhLCBzYW5zLXNlcmlmJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnVHJlYnVjaGV0J1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnQ291cmllciBOZXdcIiwgQ291cmllciwgbW9ub3NwYWNlJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQ291cmllciBOZXdcIiwgQ291cmllciwgbW9ub3NwYWNlJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnQnJ1c2ggU2NyaXB0IE1ULCBzYW5zLXNlcmlmJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQnJ1c2ggU2NyaXB0J1xyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJGb250IHdlaWdodFwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiZm9udC13ZWlnaHRcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjEwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiVGhpblwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiMjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJFeHRyYS1MaWdodFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiMzAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJMaWdodFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiNDAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJOb3JtYWxcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjUwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiTWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI2MDBcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlNlbWktQm9sZFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiNzAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJCb2xkXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI4MDBcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkV4dHJhLUJvbGRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjkwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiVWx0cmEtQm9sZFwiXHJcbiAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJUZXh0IGFsaWduXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJ0ZXh0LWFsaWduXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiAxMixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFJhZGlvQnV0dG9uSW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGV4dHJhY2xhc3M6IFwiYnRuLWdyb3VwLXNtIGJ0bi1ncm91cC1mdWxsd2lkdGhcIixcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwiTm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk5vbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwiTGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWFsaWduLWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwiQ2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQ2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJsYSBsYS1hbGlnbi1jZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJSaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJsYSBsYS1hbGlnbi1yaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImp1c3RpZnlcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwianVzdGlmeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkp1c3RpZnlcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWFsaWduLWp1c3RpZnlcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJMaW5lIGhlaWdodFwiLFxyXG4gICAgICAgICAgICBrZXk6IFwibGluZS1oZWlnaHRcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiTGV0dGVyIHNwYWNpbmdcIixcclxuICAgICAgICAgICAga2V5OiBcImxldHRlci1zcGFjaW5nXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiA2LFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlRleHQgZGVjb3JhdGlvblwiLFxyXG4gICAgICAgICAgICBrZXk6IFwidGV4dC1kZWNvcmF0aW9uLWxpbmVcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDEyLFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogUmFkaW9CdXR0b25JbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgZXh0cmFjbGFzczogXCJidG4tZ3JvdXAtc20gYnRuLWdyb3VwLWZ1bGx3aWR0aFwiLFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJub25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJsYSBsYS1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJOb25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidW5kZXJsaW5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0OiBcIkxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJ1bmRlcmxpbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWxvbmctYXJyb3ctZG93blwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIm92ZXJsaW5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0OiBcIlJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwib3ZlcmxpbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWxvbmctYXJyb3ctdXBcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJsaW5lLXRocm91Z2hcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwiUmlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJMaW5lIFRocm91Z2hcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLXN0cmlrZXRocm91Z2hcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ1bmRlcmxpbmUgb3ZlcmxpbmVcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwianVzdGlmeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlVuZGVybGluZSBPdmVybGluZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtYXJyb3dzLXZcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJEZWNvcmF0aW9uIENvbG9yXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJ0ZXh0LWRlY29yYXRpb24tY29sb3JcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDb2xvcklucHV0LFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJEZWNvcmF0aW9uIHN0eWxlXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJ0ZXh0LWRlY29yYXRpb24tc3R5bGVcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInNvbGlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJTb2xpZFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwid2F2eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiV2F2eVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiZG90dGVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEb3R0ZWRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImRhc2hlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGFzaGVkXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJkb3VibGVcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkRvdWJsZVwiXHJcbiAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0eXBvZ3JhcGh5OyIsImltcG9ydCB7IFNlY3Rpb25JbnB1dCwgQ3NzVW5pdElucHV0IH0gZnJvbSAnLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGluY19iYXNlX3NvcnQgfSBmcm9tICcuL2NvbW1vbic7XHJcblxyXG5jb25zdCBzaXplID0ge1xyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBrZXk6IFwic2l6ZV9oZWFkZXJcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlY3Rpb25JbnB1dCxcclxuICAgICAgICBuYW1lOiBmYWxzZSxcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgZGF0YTogeyBoZWFkZXI6IFwiU2l6ZVwiLCBleHBhbmRlZDogZmFsc2UgfSxcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIldpZHRoXCIsXHJcbiAgICAgICAga2V5OiBcIndpZHRoXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiSGVpZ2h0XCIsXHJcbiAgICAgICAga2V5OiBcImhlaWdodFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIk1pbiBXaWR0aFwiLFxyXG4gICAgICAgIGtleTogXCJtaW4td2lkdGhcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJNaW4gSGVpZ2h0XCIsXHJcbiAgICAgICAga2V5OiBcIm1pbi1oZWlnaHRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJNYXggV2lkdGhcIixcclxuICAgICAgICBrZXk6IFwibWF4LXdpZHRoXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiTWF4IEhlaWdodFwiLFxyXG4gICAgICAgIGtleTogXCJtYXgtaGVpZ2h0XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNpemU7IiwiaW1wb3J0IHsgU2VjdGlvbklucHV0LCBDc3NVbml0SW5wdXQgfSBmcm9tICcuLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgaW5jX2Jhc2Vfc29ydCB9IGZyb20gJy4vY29tbW9uJztcclxuXHJcbmNvbnN0IHBhZGRpbmcgPSB7XHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIGtleTogXCJwYWRkaW5nc19oZWFkZXJcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlY3Rpb25JbnB1dCxcclxuICAgICAgICBuYW1lOiBmYWxzZSxcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgZGF0YTogeyBoZWFkZXI6IFwiUGFkZGluZ1wiLCBleHBhbmRlZDogZmFsc2UgfSxcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlRvcFwiLFxyXG4gICAgICAgIGtleTogXCJwYWRkaW5nLXRvcFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlJpZ2h0XCIsXHJcbiAgICAgICAga2V5OiBcInBhZGRpbmctcmlnaHRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJCb3R0b21cIixcclxuICAgICAgICBrZXk6IFwicGFkZGluZy1ib3R0b21cIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJMZWZ0XCIsXHJcbiAgICAgICAga2V5OiBcInBhZGRpbmctTGVmdFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwYWRkaW5nOyIsImltcG9ydCB7IFNlY3Rpb25JbnB1dCwgQ3NzVW5pdElucHV0IH0gZnJvbSAnLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGluY19iYXNlX3NvcnQgfSBmcm9tICcuL2NvbW1vbic7XHJcblxyXG5jb25zdCBtYXJnaW4gPSB7XHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIGtleTogXCJtYXJnaW5zX2hlYWRlclwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VjdGlvbklucHV0LFxyXG4gICAgICAgIG5hbWU6IGZhbHNlLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBkYXRhOiB7IGhlYWRlcjogXCJNYXJnaW5cIiwgZXhwYW5kZWQ6IGZhbHNlIH0sXHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJUb3BcIixcclxuICAgICAgICBrZXk6IFwibWFyZ2luLXRvcFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlJpZ2h0XCIsXHJcbiAgICAgICAga2V5OiBcIm1hcmdpbi1yaWdodFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkJvdHRvbVwiLFxyXG4gICAgICAgIGtleTogXCJtYXJnaW4tYm90dG9tXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiTGVmdFwiLFxyXG4gICAgICAgIGtleTogXCJtYXJnaW4tTGVmdFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYXJnaW47IiwiaW1wb3J0IHsgU2VjdGlvbklucHV0LCBUZXh0SW5wdXQgfSBmcm9tICcuLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgaW5jX2Jhc2Vfc29ydCB9IGZyb20gJy4vY29tbW9uJztcclxuXHJcbmNvbnN0IGVsZW1lbnQgPSB7XHJcbiAgICBuYW1lOiBcIkVsZW1lbnRcIixcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAga2V5OiBcImVsZW1lbnRfaGVhZGVyXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWN0aW9uSW5wdXQsXHJcbiAgICAgICAgbmFtZTogZmFsc2UsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGRhdGE6IHsgaGVhZGVyOiBcIkdlbmVyYWxcIiB9LFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiSWRcIixcclxuICAgICAgICBrZXk6IFwiaWRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJpZFwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJDbGFzc1wiLFxyXG4gICAgICAgIGtleTogXCJjbGFzc1wiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH1cclxuICAgIF1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGVsZW1lbnQ7IiwiaW1wb3J0IHsgaW5jX2Jhc2Vfc29ydCB9IGZyb20gJy4vY29tbW9uJztcclxuaW1wb3J0IHsgU2VjdGlvbklucHV0LCBTZWxlY3RJbnB1dCwgUmFkaW9CdXR0b25JbnB1dCwgQ3NzVW5pdElucHV0LCBDb2xvcklucHV0LCBSYW5nZUlucHV0IH0gZnJvbSAnLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBkaXNwbGF5ICA9IHtcclxuICAgIHByb3BlcnRpZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGtleTogXCJkaXNwbGF5X2hlYWRlclwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlY3Rpb25JbnB1dCxcclxuICAgICAgICAgICAgbmFtZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgZGF0YTogeyBoZWFkZXI6IFwiRGlzcGxheVwiIH0sXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkRpc3BsYXlcIixcclxuICAgICAgICAgICAga2V5OiBcImRpc3BsYXlcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImJsb2NrXCIsIFwiaW5saW5lXCIsIFwiaW5saW5lLWJsb2NrXCIsIFwibm9uZVwiXSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJibG9ja1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQmxvY2tcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImlubGluZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5saW5lXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJpbmxpbmUtYmxvY2tcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIklubGluZSBCbG9ja1wiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwibm9uZVwiXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlBvc2l0aW9uXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJwb3NpdGlvblwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1wic3RhdGljXCIsIFwiZml4ZWRcIiwgXCJyZWxhdGl2ZVwiLCBcImFic29sdXRlXCJdLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInN0YXRpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiU3RhdGljXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJmaXhlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRml4ZWRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlbGF0aXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJSZWxhdGl2ZVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiYWJzb2x1dGVcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkFic29sdXRlXCJcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiVG9wXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJ0b3BcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgcGFyZW50OiBcIlwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJMZWZ0XCIsXHJcbiAgICAgICAgICAgIGtleTogXCJsZWZ0XCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiA2LFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIHBhcmVudDogXCJcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiQm90dG9tXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJib3R0b21cIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgcGFyZW50OiBcIlwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJSaWdodFwiLFxyXG4gICAgICAgICAgICBrZXk6IFwicmlnaHRcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgcGFyZW50OiBcIlwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJGbG9hdFwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiZmxvYXRcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDEyLFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogUmFkaW9CdXR0b25JbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgZXh0cmFjbGFzczogXCJidG4tZ3JvdXAtc20gYnRuLWdyb3VwLWZ1bGx3aWR0aFwiLFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJub25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJsYSBsYS1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJOb25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwibGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJMZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtYWxpZ24tbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0OiBcIlJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUmlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWFsaWduLXJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJPcGFjaXR5XCIsXHJcbiAgICAgICAgICAgIGtleTogXCJvcGFjaXR5XCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiAxMixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IFwiXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogUmFuZ2VJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgbWF4OiAxLCAvL21heCB6b29tIGxldmVsXHJcbiAgICAgICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgICAgICBzdGVwOiAwLjFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiQmFja2dyb3VuZCBDb2xvclwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiYmFja2dyb3VuZC1jb2xvclwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENvbG9ySW5wdXQsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlRleHQgQ29sb3JcIixcclxuICAgICAgICAgICAga2V5OiBcImNvbG9yXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiA2LFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ29sb3JJbnB1dCxcclxuICAgICAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGlzcGxheTsiLCJpbXBvcnQgeyBTZWN0aW9uSW5wdXQsIFNlbGVjdElucHV0LCBDc3NVbml0SW5wdXQsIENvbG9ySW5wdXQgfSBmcm9tICcuLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgaW5jX2Jhc2Vfc29ydCB9IGZyb20gJy4vY29tbW9uJztcclxuXHJcbmNvbnN0IGJvcmRlciA9IHtcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAga2V5OiBcImJvcmRlcl9oZWFkZXJcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlY3Rpb25JbnB1dCxcclxuICAgICAgICBuYW1lOiBmYWxzZSxcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgZGF0YTogeyBoZWFkZXI6IFwiQm9yZGVyXCIsIGV4cGFuZGVkOiBmYWxzZSB9LFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiU3R5bGVcIixcclxuICAgICAgICBrZXk6IFwiYm9yZGVyLXN0eWxlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiAxMixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcInNvbGlkXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlNvbGlkXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiZG90dGVkXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRvdHRlZFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImRhc2hlZFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEYXNoZWRcIlxyXG4gICAgICAgICAgICB9XSxcclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJXaWR0aFwiLFxyXG4gICAgICAgIGtleTogXCJib3JkZXItd2lkdGhcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJDb2xvclwiLFxyXG4gICAgICAgIGtleTogXCJib3JkZXItY29sb3JcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ29sb3JJbnB1dCxcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBib3JkZXI7IiwiaW1wb3J0IGxhYmVsIGZyb20gJy4vbGFiZWwnO1xyXG5pbXBvcnQgdGV4dGlucHV0IGZyb20gJy4vdGV4dGlucHV0JztcclxuaW1wb3J0IGJ1dHRvbiBmcm9tICcuL2J1dHRvbic7XHJcbmltcG9ydCBkaXYgZnJvbSAnLi9kaXYnO1xyXG5pbXBvcnQgY29udGFpbmVyIGZyb20gJy4vY29udGFpbmVyJztcclxuaW1wb3J0IGFsZXJ0IGZyb20gJy4vYWxlcnQnO1xyXG5pbXBvcnQgYmFkZ2UgZnJvbSAnLi9iYWRnZSc7XHJcbmltcG9ydCBicmVhZGNydW1iaXRlbSBmcm9tICcuL2JyZWFkY3J1bWJpdGVtJztcclxuaW1wb3J0IGJyZWFkY3J1bWJzIGZyb20gJy4vYnJlYWRjcnVtYnMnO1xyXG5pbXBvcnQgYnV0dG9uZ3JvdXAgZnJvbSAnLi9idXR0b25ncm91cCc7XHJcbmltcG9ydCBidXR0b250b29sYmFyIGZyb20gJy4vYnV0dG9udG9vbGJhcic7XHJcbmltcG9ydCBjYXJkIGZyb20gJy4vY2FyZCc7XHJcbmltcG9ydCBjaGVja2JveCBmcm9tICcuL2NoZWNrYm94JztcclxuaW1wb3J0IGZpbGVpbnB1dCBmcm9tICcuL2ZpbGVpbnB1dCc7XHJcbmltcG9ydCBmb3JtIGZyb20gJy4vZm9ybSc7XHJcbmltcG9ydCBncmlkY29sdW1uIGZyb20gJy4vZ3JpZGNvbHVtbic7XHJcbmltcG9ydCBncmlkcm93IGZyb20gJy4vZ3JpZHJvdyc7XHJcbmltcG9ydCBoZWFkaW5nIGZyb20gJy4vaGVhZGluZyc7XHJcbmltcG9ydCBociBmcm9tICcuL2hyJztcclxuaW1wb3J0IGltYWdlIGZyb20gJy4vaW1hZ2UnO1xyXG5pbXBvcnQganVtYm90cm9uIGZyb20gJy4vanVtYm90cm9uJztcclxuaW1wb3J0IGxpbmsgZnJvbSAnLi9saW5rJztcclxuaW1wb3J0IGxpc3Rncm91cCBmcm9tICcuL2xpc3Rncm91cCc7XHJcbmltcG9ydCBsaXN0aXRlbSBmcm9tICcuL2xpc3RpdGVtJztcclxuaW1wb3J0IG5hdmJhciBmcm9tICcuL25hdmJhcic7XHJcbmltcG9ydCBwYWdlaXRlbSBmcm9tICcuL3BhZ2VpdGVtJztcclxuaW1wb3J0IHBhZ2luYXRpb24gZnJvbSAnLi9wYWdpbmF0aW9uJztcclxuaW1wb3J0IHByb2dyZXNzIGZyb20gJy4vcHJvZ3Jlc3MnO1xyXG5pbXBvcnQgcmFkaW9idXR0b24gZnJvbSAnLi9yYWRpb2J1dHRvbic7XHJcbmltcG9ydCBzZWxlY3RpbnB1dCBmcm9tICcuL3NlbGVjdGlucHV0JztcclxuaW1wb3J0IHRhYmxlaGVhZGVyY2VsbCBmcm9tICcuL3RhYmxlaGVhZGVyY2VsbCc7XHJcbmltcG9ydCB0YWJsZSBmcm9tICcuL3RhYmxlJztcclxuaW1wb3J0IHRhYmxlYm9keSBmcm9tICcuL3RhYmxlYm9keSc7XHJcbmltcG9ydCB0YWJsZWNlbGwgZnJvbSAnLi90YWJsZWNlbGwnO1xyXG5pbXBvcnQgdGFibGVoZWFkIGZyb20gJy4vdGFibGVoZWFkJztcclxuaW1wb3J0IHRhYmxlcm93IGZyb20gJy4vdGFibGVyb3cnO1xyXG5pbXBvcnQgdGV4dGFyZWFpbnB1dCBmcm9tICcuL3RleHRhcmVhaW5wdXQnO1xyXG5pbXBvcnQgbGFiZWxkaXYgZnJvbSAnLi9sYWJlbGRpdic7XHJcbmltcG9ydCBzcGFuIGZyb20gJy4vc3Bhbic7XHJcbmltcG9ydCBjYWxlbmRhciBmcm9tICcuL2NhbGVuZGFyJztcclxuaW1wb3J0IHRleHQgZnJvbSAnLi90ZXh0JztcclxuaW1wb3J0IGF1dG9zZWxlY3RpbnB1dCBmcm9tICcuL2F1dG9zZWxlY3RpbnB1dCc7XHJcbmltcG9ydCBtYW51YWxzZWxlY3RpbnB1dCBmcm9tICcuL21hbnVhbHNlbGVjdGlucHV0JztcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBsYWJlbCwgdGV4dGlucHV0LCBidXR0b24sIGRpdiwgY29udGFpbmVyLCBhbGVydCwgYmFkZ2UsIGJyZWFkY3J1bWJpdGVtLCBicmVhZGNydW1icywgYnV0dG9uZ3JvdXAsXHJcbiAgICBidXR0b250b29sYmFyLCBjYXJkLCBjaGVja2JveCwgZmlsZWlucHV0LCBmb3JtLCBncmlkY29sdW1uLCBncmlkcm93LCBoZWFkaW5nLCBociwgaW1hZ2UsIGp1bWJvdHJvbixcclxuICAgIGxpbmssIGxpc3Rncm91cCwgbGlzdGl0ZW0sIG5hdmJhciwgcGFnZWl0ZW0sIHBhZ2luYXRpb24sIHByb2dyZXNzLCByYWRpb2J1dHRvbiwgc2VsZWN0aW5wdXQsIHRhYmxlaGVhZGVyY2VsbCxcclxuICAgIHRhYmxlLCB0YWJsZWJvZHksIHRhYmxlY2VsbCwgdGFibGVoZWFkLCB0YWJsZXJvdywgdGV4dGFyZWFpbnB1dCwgbGFiZWxkaXYsIHNwYW4sIGNhbGVuZGFyLCB0ZXh0LFxyXG4gICAgYXV0b3NlbGVjdGlucHV0LCBtYW51YWxzZWxlY3RpbnB1dFxyXG59OyIsImltcG9ydCB7IFRleHRJbnB1dCwgU2VsZWN0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgaW5wdXRUeXBlcywgaW5wdXRUeXBlTmFtZXMgfSBmcm9tICcuLi9pbnB1dFR5cGVzJztcclxuaW1wb3J0IHsgZGF0YUNvbXBvbmVudElkIH0gZnJvbSAnLi4vY29tbW9uJztcclxuXHJcbmNvbnN0IHRleHRpbnB1dCA9IHtcclxuICAgIG5hbWU6IFwiVGV4dCBJbnB1dFwiLFxyXG4gICAgYXR0cmlidXRlczogeyBcInR5cGVcIjogaW5wdXRUeXBlTmFtZXMgfSxcclxuICAgIGltYWdlOiBcImljb25zL3RleHRfaW5wdXQuc3ZnXCIsXHJcbiAgICBodG1sOiBgPGRpdiBjbGFzcz1cImV2ZXJ5T3V0Ym94LXJpZ2h0IGRyYWdnYWJsZVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGFpbHlCb3hcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgJHtkYXRhQ29tcG9uZW50SWR9PVwiaHRtbC90ZXh0aW5wdXRAb2VlXCIgbHVzdHlsZT1cImhlaWdodDogMi44cmVtO3dpZHRoOjEzcmVtXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiLz5cclxuICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgPC9kaXY+YCxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJWYWx1ZVwiLFxyXG4gICAgICAgIGtleTogXCJ2YWx1ZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInZhbHVlXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlBsYWNlaG9sZGVyXCIsXHJcbiAgICAgICAga2V5OiBcInBsYWNlaG9sZGVyXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwicGxhY2Vob2xkZXJcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdOYW1lJyxcclxuICAgICAgICBrZXk6ICduYW1lJyxcclxuICAgICAgICBodG1sQXR0cjogJ25hbWUnLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ3R5cGUnLFxyXG4gICAgICAgIGtleTogJ3R5cGUnLFxyXG4gICAgICAgIGh0bWxBdHRyOiAndHlwZScsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IGlucHV0VHlwZXNcclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGV4dGlucHV0OyIsImltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgdGV4dCA9IHtcclxuICAgIG5hbWU6IFwiVGV4dFwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvdGV4dF9pbnB1dC5zdmdcIixcclxuICAgIGh0bWw6IGBgLFxyXG4gICAgbm9kZXM6IFsnYicsICdiaWcnLCAnZW0nLCAnaScsICdzbWFsbCcsICdzdHJvbmcnLFxyXG4gICAgICAgICdzdWInLCAnc3VwJywgJ2lucycsICdkZWwnLCAncycsICdzdHJpa2UnLCAndSddLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiAnVGV4dCcsXHJcbiAgICAgICAga2V5OiAndGV4dCcsXHJcbiAgICAgICAgaHRtbEF0dHI6ICd0ZXh0JyxcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRleHQ7IiwiaW1wb3J0IHsgVGV4dElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBzcGFuID0ge1xyXG4gICAgbmFtZTogXCJTcGFuXCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy90ZXh0X2lucHV0LnN2Z1wiLFxyXG4gICAgbm9kZXM6IFsnc3BhbiddLFxyXG4gICAgaHRtbDogYGAsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiRm9yIGlkXCIsXHJcbiAgICAgICAga2V5OiBcImZvclwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImZvclwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1RleHQnLFxyXG4gICAgICAgIGtleTogJ3RleHQnLFxyXG4gICAgICAgIGh0bWxBdHRyOiAndGV4dCcsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzcGFuOyIsImltcG9ydCBWdnZlYiBmcm9tICcuLi8uLi9idWlsZGVyJztcclxuaW1wb3J0IHsgVGV4dFZhbHVlSW5wdXQsIEJ1dHRvbklucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBzZWxlY3RpbnB1dCA9IHtcclxuICAgIG5vZGVzOiBbXCJzZWxlY3RcIl0sXHJcbiAgICBuYW1lOiBcIlNlbGVjdCBJbnB1dFwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvc2VsZWN0X2lucHV0LnN2Z1wiLFxyXG4gICAgaHRtbDogYDxkaXYgY2xhc3M9XCJldmVyeU91dGJveC1yaWdodCBkcmFnZ2FibGVcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhaWx5Qm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIGx1c3R5bGU9XCJoZWlnaHQ6IDIuOHJlbTt3aWR0aDoxM3JlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwidmFsdWUxXCI+VGV4dCAxPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ2YWx1ZTJcIj5UZXh0IDI8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInZhbHVlM1wiPlRleHQgMzwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIGJlZm9yZUluaXQ6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgcHJvcGVydGllcyA9IFtdO1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuXHJcbiAgICAgICAgJChub2RlKS5maW5kKCdvcHRpb24nKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGRhdGEgPSB7IFwidmFsdWVcIjogdGhpcy52YWx1ZSwgXCJ0ZXh0XCI6IHRoaXMudGV4dCB9O1xyXG5cclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJPcHRpb24gXCIgKyBpLFxyXG4gICAgICAgICAgICAgICAga2V5OiBcIm9wdGlvblwiICsgaSxcclxuICAgICAgICAgICAgICAgIC8vaW5kZXg6IGkgLSAxLFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uTm9kZTogdGhpcyxcclxuICAgICAgICAgICAgICAgIGlucHV0dHlwZTogVGV4dFZhbHVlSW5wdXQsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSwgaW5wdXQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gJCh0aGlzLm9wdGlvbk5vZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIHJlbW92ZSBidXR0b24gaXMgY2xpY2tlZCByZW1vdmUgb3B0aW9uIGFuZCByZW5kZXIgcm93IHByb3BlcnRpZXNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQubm9kZU5hbWUgPT0gJ0JVVFRPTicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWdnZlYi5Db21wb25lbnRzLnJlbmRlcihcImh0bWwvc2VsZWN0aW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Lm5hbWUgPT0gXCJ2YWx1ZVwiKSBvcHRpb24uYXR0cihcInZhbHVlXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnB1dC5uYW1lID09IFwidGV4dFwiKSBvcHRpb24udGV4dCh2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vcmVtb3ZlIGFsbCBvcHRpb24gcHJvcGVydGllc1xyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHRoaXMucHJvcGVydGllcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ua2V5LmluZGV4T2YoXCJvcHRpb25cIikgPT09IC0xO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL2FkZCByZW1haW5pbmcgcHJvcGVydGllcyB0byBnZW5lcmF0ZWQgY29sdW1uIHByb3BlcnRpZXNcclxuICAgICAgICBwcm9wZXJ0aWVzLnB1c2godGhpcy5wcm9wZXJ0aWVzWzBdKTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllcztcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIk9wdGlvblwiLFxyXG4gICAgICAgIGtleTogXCJvcHRpb24xXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0VmFsdWVJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiT3B0aW9uXCIsXHJcbiAgICAgICAga2V5OiBcIm9wdGlvbjJcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRWYWx1ZUlucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICBrZXk6IFwiYWRkQ2hpbGRcIixcclxuICAgICAgICBpbnB1dHR5cGU6IEJ1dHRvbklucHV0LFxyXG4gICAgICAgIGRhdGE6IHsgdGV4dDogXCJBZGQgb3B0aW9uXCIgfSxcclxuICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAgICAgJChub2RlKS5hcHBlbmQoJzxvcHRpb24gdmFsdWU9XCJ2YWx1ZVwiPlRleHQ8L29wdGlvbj4nKTtcclxuXHJcbiAgICAgICAgICAgIC8vcmVuZGVyIGNvbXBvbmVudCBwcm9wZXJ0aWVzIGFnYWluIHRvIGluY2x1ZGUgdGhlIG5ldyBjb2x1bW4gaW5wdXRzXHJcbiAgICAgICAgICAgIFZ2dmViLkNvbXBvbmVudHMucmVuZGVyKFwiaHRtbC9zZWxlY3RpbnB1dFwiKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzZWxlY3RpbnB1dDsiLCJpbXBvcnQgeyBUZXh0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgZGF0YUNvbXBvbmVudElkIH0gZnJvbSAnLi4vY29tbW9uJztcclxuXHJcbmNvbnN0IHJhZGlvYnV0dG9uID0ge1xyXG4gICAgbmFtZTogXCJSYWRpbyBCdXR0b25cIixcclxuICAgIGF0dHJpYnV0ZXM6IHsgXCJ0eXBlXCI6IFwicmFkaW9cIiB9LFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvcmFkaW8uc3ZnXCIsXHJcbiAgICBodG1sOiBgPGRpdiAke2RhdGFDb21wb25lbnRJZH09XCJodG1sL3JhZGlvYnV0dG9uQG9lZVwiIGNsYXNzPVwiZXZlcnlPdXRib3gtcmlnaHQgZHJhZ2dhYmxlXCI+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OmlubGluZTtcIj48aW5wdXQgY2xhc3M9XCJyYWRpb0lucHV0XCIgbmFtZT1cIkZydWl0XCIgdHlwZT1cInJhZGlvXCIgdmFsdWU9XCJcIiAvPjxzcGFuICR7ZGF0YUNvbXBvbmVudElkfT1cImh0bWwvc3BhbkBvZWVcIj7ljZXpgIkxPC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgIDwvZGl2PmAsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiTmFtZVwiLFxyXG4gICAgICAgIGtleTogXCJuYW1lXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwibmFtZVwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmFkaW9idXR0b247IiwiaW1wb3J0IFZ2dmViIGZyb20gJy4uLy4uL2J1aWxkZXInO1xyXG5pbXBvcnQgeyBUZXh0VmFsdWVJbnB1dCwgQnV0dG9uSW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgbWFudWFsc2VsZWN0aW5wdXRpZCB9IGZyb20gJy4vaWRzJztcclxuaW1wb3J0IHsgZGF0YUNvbXBvbmVudElkIH0gZnJvbSAnLi4vY29tbW9uJztcclxuXHJcbmNvbnN0IGF1dG9zZWxlY3RpbnB1dCA9IHtcclxuICAgIG5vZGVzOiBbXCJzZWxlY3RcIl0sXHJcbiAgICBuYW1lOiBcIk1hbnVhbCBTZWxlY3QgSW5wdXRcIixcclxuICAgIGltYWdlOiBcImljb25zL3NlbGVjdF9pbnB1dC5zdmdcIixcclxuICAgIGh0bWw6IGA8ZGl2IGNsYXNzPVwiZXZlcnlPdXRib3gtcmlnaHQgZHJhZ2dhYmxlXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYWlseUJveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgJHtkYXRhQ29tcG9uZW50SWR9PVwiJHttYW51YWxzZWxlY3RpbnB1dGlkfVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgbHVzdHlsZT1cImhlaWdodDogMi44cmVtO3dpZHRoOjEzcmVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ2YWx1ZTFcIj5UZXh0IDE8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInZhbHVlMlwiPlRleHQgMjwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwidmFsdWUzXCI+VGV4dCAzPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICBwcm9wZXJ0aWVzID0gW107XHJcbiAgICAgICAgdmFyIGkgPSAwO1xyXG5cclxuICAgICAgICAkKG5vZGUpLmZpbmQoJ29wdGlvbicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgZGF0YSA9IHsgXCJ2YWx1ZVwiOiB0aGlzLnZhbHVlLCBcInRleHRcIjogdGhpcy50ZXh0IH07XHJcblxyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIk9wdGlvbiBcIiArIGksXHJcbiAgICAgICAgICAgICAgICBrZXk6IFwib3B0aW9uXCIgKyBpLFxyXG4gICAgICAgICAgICAgICAgLy9pbmRleDogaSAtIDEsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25Ob2RlOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgaW5wdXR0eXBlOiBUZXh0VmFsdWVJbnB1dCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKG5vZGUsIHZhbHVlLCBpbnB1dCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24gPSAkKHRoaXMub3B0aW9uTm9kZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgcmVtb3ZlIGJ1dHRvbiBpcyBjbGlja2VkIHJlbW92ZSBvcHRpb24gYW5kIHJlbmRlciByb3cgcHJvcGVydGllc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5ub2RlTmFtZSA9PSAnQlVUVE9OJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZ2dmViLkNvbXBvbmVudHMucmVuZGVyKG1hbnVhbHNlbGVjdGlucHV0aWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5uYW1lID09IFwidmFsdWVcIikgb3B0aW9uLmF0dHIoXCJ2YWx1ZVwiLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXQubmFtZSA9PSBcInRleHRcIikgb3B0aW9uLnRleHQodmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL3JlbW92ZSBhbGwgb3B0aW9uIHByb3BlcnRpZXNcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSB0aGlzLnByb3BlcnRpZXMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmtleS5pbmRleE9mKFwib3B0aW9uXCIpID09PSAtMTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9hZGQgcmVtYWluaW5nIHByb3BlcnRpZXMgdG8gZ2VuZXJhdGVkIGNvbHVtbiBwcm9wZXJ0aWVzXHJcbiAgICAgICAgcHJvcGVydGllcy5wdXNoKHRoaXMucHJvcGVydGllc1swXSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJPcHRpb25cIixcclxuICAgICAgICBrZXk6IFwib3B0aW9uMVwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dFZhbHVlSW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIk9wdGlvblwiLFxyXG4gICAgICAgIGtleTogXCJvcHRpb24yXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0VmFsdWVJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAga2V5OiBcImFkZENoaWxkXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBCdXR0b25JbnB1dCxcclxuICAgICAgICBkYXRhOiB7IHRleHQ6IFwiQWRkIG9wdGlvblwiIH0sXHJcbiAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgICAgICQobm9kZSkuYXBwZW5kKCc8b3B0aW9uIHZhbHVlPVwidmFsdWVcIj5UZXh0PC9vcHRpb24+Jyk7XHJcbiAgICAgICAgICAgIC8vcmVuZGVyIGNvbXBvbmVudCBwcm9wZXJ0aWVzIGFnYWluIHRvIGluY2x1ZGUgdGhlIG5ldyBjb2x1bW4gaW5wdXRzXHJcbiAgICAgICAgICAgIFZ2dmViLkNvbXBvbmVudHMucmVuZGVyKG1hbnVhbHNlbGVjdGlucHV0aWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXV0b3NlbGVjdGlucHV0OyIsImltcG9ydCB7IGRhdGFDb21wb25lbnRJZCB9IGZyb20gJy4uL2NvbW1vbic7XHJcblxyXG5jb25zdCBsYWJlbGRpdiA9IHtcclxuICAgIG5hbWU6ICdMYWJlbCBEaXYnLFxyXG4gICAgaW1hZ2U6ICdpY29ucy9sYWJlbC5zdmcnLFxyXG4gICAgaHRtbDogYDxkaXYgY2xhc3M9XCJldmVyeU91dGJveC1sZWZ0IGRyYWdnYWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jYXJldC1zcXVhcmUtby1yaWdodCB0ZXh0LWRhbmdlclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cclxuICAgICAgICAgICAgICAgIDxzcGFuICR7ZGF0YUNvbXBvbmVudElkfT1cImh0bWwvc3BhbkBvZWVcIiBjbGFzcz1cInRoZW1lXCI+UGVyaW9kPC9zcGFuPlxyXG4gICAgICAgICAgIDwvZGl2PmBcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxhYmVsZGl2OyIsImltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBkYXRhQ29tcG9uZW50SWQgfSBmcm9tICcuLi9jb21tb24nO1xyXG5cclxuY29uc3QgY2hlY2tib3ggPSB7XHJcbiAgICBuYW1lOiBcIkNoZWNrYm94XCIsXHJcbiAgICBhdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBcImNoZWNrYm94XCIgfSxcclxuICAgIGltYWdlOiBcImljb25zL2NoZWNrYm94LnN2Z1wiLFxyXG4gICAgaHRtbDogYDxkaXYgY2xhc3M9XCJldmVyeU91dGJveC1yaWdodCBkcmFnZ2FibGVcIj5cclxuICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OmlubGluZTtcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCAke2RhdGFDb21wb25lbnRJZH09XCJodG1sL2NoZWNrYm94QG9lZVwiIHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiY2hlY2tib3hJbnB1dFwiIGlkPVwiXFwke2l0LnNpdGV9ZXByQ2hlY2tcIiBuYW1lPVwicGFyYW1JdGVtc1tcXCR7bG9vcC5pbmRleH1dLmVwckNoZWNrXCIgdmFsdWU9XCJ0cnVlXCIvPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsICR7ZGF0YUNvbXBvbmVudElkfT1cImh0bWwvc3BhbkBvZWVcIj7pgInpobkxPC9sYWJlbD5cclxuICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5gLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIk5hbWVcIixcclxuICAgICAgICBrZXk6IFwibmFtZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcIm5hbWVcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNoZWNrYm94OyIsImltcG9ydCB7IFRleHRJbnB1dCwgU2VsZWN0SW5wdXQsIFRvZ2dsZUlucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGlucHV0VHlwZU5hbWVzIH0gZnJvbSAnLi4vaW5wdXRUeXBlcyc7XHJcbmltcG9ydCB7IGRhdGFDb21wb25lbnRJZCwgZGF0YUNvbmZpZ0luZm8sIGRhdGFDYWxlbmRhcklkIH0gZnJvbSAnLi4vY29tbW9uJztcclxuaW1wb3J0IHtcclxuICAgIGNsb25lV2l0aG91dE9uY2xpY2ssIGdldERhdGVGbXQsIGdldFBhcnNlZENvbmZpZ0luZm8sXHJcbiAgICBzZXREYXRhQ29uZmlnSW5mbywgc2V0T25jbGlja0F0dHJcclxufSBmcm9tICcuLi8uLi91dGlsL2NhbGVuZGFyJ1xyXG5cclxuY29uc3QgY2FsZW5kYXIgPSB7XHJcbiAgICBuYW1lOiBcIkRhdGV0aW1lIElucHV0XCIsXHJcbiAgICBhdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBpbnB1dFR5cGVOYW1lcyB9LFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvY2FsZW5kYXIuc3ZnXCIsXHJcbiAgICBodG1sOiBgPGRpdiBjbGFzcz1cImV2ZXJ5T3V0Ym94LXJpZ2h0IGRyYWdnYWJsZVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGFpbHlCb3hcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgJHtkYXRhQ2FsZW5kYXJJZH0gJHtkYXRhQ29uZmlnSW5mb309XCJ7J2RhdGVGbXQnOiAneXl5eS1NTS1kZCBISDptbSd9XCIgJHtkYXRhQ29tcG9uZW50SWR9PVwiaHRtbC9jYWxlbmRhckBvZWVcIiBsdXN0eWxlPVwiaGVpZ2h0OiAyLjhyZW07d2lkdGg6MTNyZW0gXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbCBXZGF0ZVwiLz5cclxuICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgPC9kaXY+YCxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJWYWx1ZVwiLFxyXG4gICAgICAgIGtleTogXCJ2YWx1ZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInZhbHVlXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlBsYWNlaG9sZGVyXCIsXHJcbiAgICAgICAga2V5OiBcInBsYWNlaG9sZGVyXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwicGxhY2Vob2xkZXJcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdOYW1lJyxcclxuICAgICAgICBrZXk6ICduYW1lJyxcclxuICAgICAgICBodG1sQXR0cjogJ25hbWUnLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJEYXRlIEZvcm1hdFwiLFxyXG4gICAgICAgIGtleTogXCJkYXRlRm10XCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICBpbml0OiBnZXREYXRlRm10LFxyXG4gICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc3QgY29uZmlnSW5mbyA9IGdldFBhcnNlZENvbmZpZ0luZm8obm9kZSlcclxuICAgICAgICAgICAgY29uZmlnSW5mby5kYXRlRm10ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHNldERhdGFDb25maWdJbmZvKG5vZGUsIGNvbmZpZ0luZm8pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICd5eXl5LU1NLWRkIEhIOm1tJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICd5eXl5LU1NLWRkIEhIOm1tJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ3l5eXktTU0tZGQgSEg6bW06c3MnLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ3l5eXktTU0tZGQgSEg6bW06c3MnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAneXl5eS1NTS1kZCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAneXl5eS1NTS1kZCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICd5eXl5TU1kZCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAneXl5eU1NZGQnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAneXl5eU1NJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICd5eXl5TU0nXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAneXl5eScsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAneXl5eSdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICd5eXl55bm0TeaciCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAneXl5eeW5tE3mnIgnXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiU2hvdyBEYXRldGltZVwiLFxyXG4gICAgICAgIGtleTogXCJzaG93RGF0ZXRpbWVcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1widGFibGUtcmVzcG9uc2l2ZVwiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgIG9uQ2hhbmdlKG5vZGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSAnb24nKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRPbmNsaWNrQXR0cihub2RlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNsb25lV2l0aG91dE9uY2xpY2sobm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb246ICdvbicsXHJcbiAgICAgICAgICAgIG9mZjogJ29mZidcclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2FsZW5kYXI7IiwiaW1wb3J0IHsgTGlua0lucHV0LCBTZWxlY3RJbnB1dCwgVGV4dElucHV0LCBUb2dnbGVJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgYnV0dG9uID0ge1xyXG4gICAgY2xhc3NlczogW1wiYnRuXCIsIFwiYnRuLWxpbmtcIiwgJ2J0bkBvZWUnXSxcclxuICAgIG5hbWU6IFwiQnV0dG9uXCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9idXR0b24uc3ZnXCIsXHJcbiAgICBodG1sOiBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG5Ab2VlIGRyYWdnYWJsZVwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tc2VhcmNoXCI+U2VhcmNoPC9zcGFuPlxyXG4gICAgICAgICAgIDwvYnV0dG9uPmAsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiTGluayBUb1wiLFxyXG4gICAgICAgIGtleTogXCJocmVmXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiaHJlZlwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogTGlua0lucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJUeXBlXCIsXHJcbiAgICAgICAga2V5OiBcInR5cGVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImJ0bi1kZWZhdWx0XCIsIFwiYnRuLXByaW1hcnlcIiwgXCJidG4taW5mb1wiLCBcImJ0bi1zdWNjZXNzXCIsIFwiYnRuLXdhcm5pbmdcIiwgXCJidG4taW5mb1wiLCBcImJ0bi1saWdodFwiLCBcImJ0bi1kYXJrXCIsIFwiYnRuLW91dGxpbmUtcHJpbWFyeVwiLCBcImJ0bi1vdXRsaW5lLWluZm9cIiwgXCJidG4tb3V0bGluZS1zdWNjZXNzXCIsIFwiYnRuLW91dGxpbmUtd2FybmluZ1wiLCBcImJ0bi1vdXRsaW5lLWluZm9cIiwgXCJidG4tb3V0bGluZS1saWdodFwiLCBcImJ0bi1vdXRsaW5lLWRhcmtcIiwgXCJidG4tbGlua1wiXSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLXByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiUHJpbWFyeVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0biBidG4taW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJJbmZvXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLXN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU3VjY2Vzc1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi13YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIldhcm5pbmdcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4taW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJJbmZvXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWxpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpZ2h0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWRhcmtcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGFya1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1vdXRsaW5lLXByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiUHJpbWFyeSBvdXRsaW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuIGJ0bi1vdXRsaW5lLWluZm9cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5mbyBvdXRsaW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLW91dGxpbmUtc3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTdWNjZXNzIG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tb3V0bGluZS13YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIldhcm5pbmcgb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1vdXRsaW5lLWluZm9cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5mbyBvdXRsaW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLW91dGxpbmUtbGlnaHRcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiTGlnaHQgb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1vdXRsaW5lLWRhcmtcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGFyayBvdXRsaW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWxpbmtcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiTGlua1wiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiU2l6ZVwiLFxyXG4gICAgICAgIGtleTogXCJzaXplXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJidG4tbGdcIiwgXCJidG4tc21cIl0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tbGdcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiTGFyZ2VcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tc21cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU21hbGxcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlRhcmdldFwiLFxyXG4gICAgICAgIGtleTogXCJ0YXJnZXRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJ0YXJnZXRcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdEYXRhIFVybCcsXHJcbiAgICAgICAga2V5OiAnZGF0YVVybCcsXHJcbiAgICAgICAgaHRtbEF0dHI6ICdkYXRhLXVybCcsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkRpc2FibGVkXCIsXHJcbiAgICAgICAga2V5OiBcImRpc2FibGVkXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJkaXNhYmxlZFwiXSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9uOiBcImRpc2FibGVkXCIsXHJcbiAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidXR0b247IiwiaW1wb3J0IHsgVGV4dElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGF1dG9zZWxlY3RpbnB1dGlkIH0gZnJvbSAnLi9pZHMnO1xyXG5pbXBvcnQgeyBkYXRhQ29tcG9uZW50SWQsIGRhdGFVcmwsIGRhdGFBdXRvU2VsZWN0SWQgfSBmcm9tICcuLi9jb21tb24nO1xyXG5cclxuY29uc3QgYXV0b3NlbGVjdGlucHV0ID0ge1xyXG4gICAgbm9kZXM6IFtcInNlbGVjdFwiXSxcclxuICAgIG5hbWU6IFwiQXV0byBTZWxlY3QgSW5wdXRcIixcclxuICAgIGltYWdlOiBcImljb25zL3NlbGVjdF9pbnB1dC5zdmdcIixcclxuICAgIGh0bWw6IGA8ZGl2IGNsYXNzPVwiZXZlcnlPdXRib3gtcmlnaHQgZHJhZ2dhYmxlXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYWlseUJveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgJHtkYXRhQXV0b1NlbGVjdElkfSAke2RhdGFDb21wb25lbnRJZH09XCIke2F1dG9zZWxlY3RpbnB1dGlkfVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgbHVzdHlsZT1cImhlaWdodDogMi44cmVtO3dpZHRoOjEzcmVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIkRhdGEgVXJsXCIsXHJcbiAgICAgICAga2V5OiBcImRhdGFVcmxcIixcclxuICAgICAgICBodG1sQXR0cjogZGF0YVVybCxcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGF1dG9zZWxlY3RpbnB1dDsiLCJjb25zdCBtYW51YWxzZWxlY3RpbnB1dGlkID0gJ2h0bWwvbWFudWFsc2VsZWN0aW5wdXRAb2VlJztcclxuY29uc3QgYXV0b3NlbGVjdGlucHV0aWQgPSAnaHRtbC9hdXRvc2VsZWN0aW5wdXRAb2VlJztcclxuXHJcbmV4cG9ydCB7IG1hbnVhbHNlbGVjdGlucHV0aWQsIGF1dG9zZWxlY3RpbnB1dGlkIH07IiwiaW1wb3J0IGxhYmVsIGZyb20gJy4vbGFiZWwnO1xyXG5pbXBvcnQgdGV4dGlucHV0IGZyb20gJy4vdGV4dGlucHV0JztcclxuaW1wb3J0IGJ1dHRvbiBmcm9tICcuL2J1dHRvbic7XHJcbmltcG9ydCBkaXYgZnJvbSAnLi9kaXYnO1xyXG5pbXBvcnQgY29udGFpbmVyIGZyb20gJy4vY29udGFpbmVyJztcclxuaW1wb3J0IGFsZXJ0IGZyb20gJy4vYWxlcnQnO1xyXG5pbXBvcnQgYmFkZ2UgZnJvbSAnLi9iYWRnZSc7XHJcbmltcG9ydCBicmVhZGNydW1iaXRlbSBmcm9tICcuL2JyZWFkY3J1bWJpdGVtJztcclxuaW1wb3J0IGJyZWFkY3J1bWJzIGZyb20gJy4vYnJlYWRjcnVtYnMnO1xyXG5pbXBvcnQgYnV0dG9uZ3JvdXAgZnJvbSAnLi9idXR0b25ncm91cCc7XHJcbmltcG9ydCBidXR0b250b29sYmFyIGZyb20gJy4vYnV0dG9udG9vbGJhcic7XHJcbmltcG9ydCBjYXJkIGZyb20gJy4vY2FyZCc7XHJcbmltcG9ydCBjaGVja2JveCBmcm9tICcuL2NoZWNrYm94JztcclxuaW1wb3J0IGZpbGVpbnB1dCBmcm9tICcuL2ZpbGVpbnB1dCc7XHJcbmltcG9ydCBmb3JtIGZyb20gJy4vZm9ybSc7XHJcbmltcG9ydCBncmlkY29sdW1uIGZyb20gJy4vZ3JpZGNvbHVtbic7XHJcbmltcG9ydCBncmlkcm93IGZyb20gJy4vZ3JpZHJvdyc7XHJcbmltcG9ydCBoZWFkaW5nIGZyb20gJy4vaGVhZGluZyc7XHJcbmltcG9ydCBociBmcm9tICcuL2hyJztcclxuaW1wb3J0IGltYWdlIGZyb20gJy4vaW1hZ2UnO1xyXG5pbXBvcnQganVtYm90cm9uIGZyb20gJy4vanVtYm90cm9uJztcclxuaW1wb3J0IGxpbmsgZnJvbSAnLi9saW5rJztcclxuaW1wb3J0IGxpc3Rncm91cCBmcm9tICcuL2xpc3Rncm91cCc7XHJcbmltcG9ydCBsaXN0aXRlbSBmcm9tICcuL2xpc3RpdGVtJztcclxuaW1wb3J0IG5hdmJhciBmcm9tICcuL25hdmJhcic7XHJcbmltcG9ydCBwYWdlaXRlbSBmcm9tICcuL3BhZ2VpdGVtJztcclxuaW1wb3J0IHBhZ2luYXRpb24gZnJvbSAnLi9wYWdpbmF0aW9uJztcclxuaW1wb3J0IHByb2dyZXNzIGZyb20gJy4vcHJvZ3Jlc3MnO1xyXG5pbXBvcnQgcmFkaW9idXR0b24gZnJvbSAnLi9yYWRpb2J1dHRvbic7XHJcbmltcG9ydCBzZWxlY3RpbnB1dCBmcm9tICcuL3NlbGVjdGlucHV0JztcclxuaW1wb3J0IHRhYmxlaGVhZGVyY2VsbCBmcm9tICcuL3RhYmxlaGVhZGVyY2VsbCc7XHJcbmltcG9ydCB0YWJsZSBmcm9tICcuL3RhYmxlJztcclxuaW1wb3J0IHRhYmxlYm9keSBmcm9tICcuL3RhYmxlYm9keSc7XHJcbmltcG9ydCB0YWJsZWNlbGwgZnJvbSAnLi90YWJsZWNlbGwnO1xyXG5pbXBvcnQgdGFibGVoZWFkIGZyb20gJy4vdGFibGVoZWFkJztcclxuaW1wb3J0IHRhYmxlcm93IGZyb20gJy4vdGFibGVyb3cnO1xyXG5pbXBvcnQgdGV4dGFyZWFpbnB1dCBmcm9tICcuL3RleHRhcmVhaW5wdXQnO1xyXG5cclxuZXhwb3J0IHtcclxuICAgIGxhYmVsLCB0ZXh0aW5wdXQsIGJ1dHRvbiwgZGl2LCBjb250YWluZXIsIGFsZXJ0LCBiYWRnZSwgYnJlYWRjcnVtYml0ZW0sIGJyZWFkY3J1bWJzLCBidXR0b25ncm91cCxcclxuICAgIGJ1dHRvbnRvb2xiYXIsIGNhcmQsIGNoZWNrYm94LCBmaWxlaW5wdXQsIGZvcm0sIGdyaWRjb2x1bW4sIGdyaWRyb3csIGhlYWRpbmcsIGhyLCBpbWFnZSwganVtYm90cm9uLFxyXG4gICAgbGluaywgbGlzdGdyb3VwLCBsaXN0aXRlbSwgbmF2YmFyLCBwYWdlaXRlbSwgcGFnaW5hdGlvbiwgcHJvZ3Jlc3MsIHJhZGlvYnV0dG9uLCBzZWxlY3RpbnB1dCwgdGFibGVoZWFkZXJjZWxsLFxyXG4gICAgdGFibGUsIHRhYmxlYm9keSwgdGFibGVjZWxsLCB0YWJsZWhlYWQsIHRhYmxlcm93LCB0ZXh0YXJlYWlucHV0XHJcbn07IiwiaW1wb3J0IHsgVGV4dElucHV0LCBTZWxlY3RJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBpbnB1dFR5cGVzLCBpbnB1dFR5cGVOYW1lcyB9IGZyb20gJy4uL2lucHV0VHlwZXMnO1xyXG5pbXBvcnQgeyBkYXRhQ29tcG9uZW50SWQgfSBmcm9tICcuLi9jb21tb24nO1xyXG5cclxuY29uc3QgdGV4dGlucHV0ID0ge1xyXG4gICAgbmFtZTogXCJUZXh0IElucHV0XCIsXHJcbiAgICBhdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBpbnB1dFR5cGVOYW1lcyB9LFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvdGV4dF9pbnB1dC5zdmdcIixcclxuICAgIGh0bWw6IGA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiPjxsYWJlbD5UZXh0PC9sYWJlbD48aW5wdXQgJHtkYXRhQ29tcG9uZW50SWR9PVwiaHRtbC90ZXh0aW5wdXRAZ2VuZXJhbFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj48L2Rpdj48L2Rpdj5gLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIlZhbHVlXCIsXHJcbiAgICAgICAga2V5OiBcInZhbHVlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwidmFsdWVcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiUGxhY2Vob2xkZXJcIixcclxuICAgICAgICBrZXk6IFwicGxhY2Vob2xkZXJcIixcclxuICAgICAgICBodG1sQXR0cjogXCJwbGFjZWhvbGRlclwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ3R5cGUnLFxyXG4gICAgICAgIGtleTogJ3R5cGUnLFxyXG4gICAgICAgIGh0bWxBdHRyOiAndHlwZScsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IGlucHV0VHlwZXNcclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGV4dGlucHV0OyIsImNvbnN0IGlucHV0VHlwZXMgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgdmFsdWU6ICd0ZXh0JyxcclxuICAgICAgICB0ZXh0OiAndGV4dCdcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ3Bhc3N3b3JkJyxcclxuICAgICAgICB0ZXh0OiAncGFzc3dvcmQnXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6ICdudW1iZXInLFxyXG4gICAgICAgIHRleHQ6ICdudW1iZXInXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6ICdzdWJtaXQnLFxyXG4gICAgICAgIHRleHQ6ICdzdWJtaXQnXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6IFwiZW1haWxcIixcclxuICAgICAgICB0ZXh0OiBcImVtYWlsXCJcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ3VybCcsXHJcbiAgICAgICAgdGV4dDogJ3VybCdcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ3RlbCcsXHJcbiAgICAgICAgdGV4dDogJ3RlbCdcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ3NlYXJjaCcsXHJcbiAgICAgICAgdGV4dDogJ3NlYXJjaCdcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ2RhdGV0aW1lLWxvY2FsJyxcclxuICAgICAgICB0ZXh0OiAnZGF0ZXRpbWUtbG9jYWwnXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6ICdkYXRldGltZScsXHJcbiAgICAgICAgdGV4dDogJ2RhdGV0aW1lJ1xyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiAnZGF0ZScsXHJcbiAgICAgICAgdGV4dDogJ2RhdGUnXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6ICd0aW1lJyxcclxuICAgICAgICB0ZXh0OiAndGltZSdcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ3dlZWsnLFxyXG4gICAgICAgIHRleHQ6ICd3ZWVrJ1xyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiAnbW9udGgnLFxyXG4gICAgICAgIHRleHQ6ICdtb250aCdcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ3JhbmdlJyxcclxuICAgICAgICB0ZXh0OiAncmFuZ2UnXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6ICdjb2xvcicsXHJcbiAgICAgICAgdGV4dDogJ2NvbG9yJ1xyXG4gICAgfV07XHJcblxyXG5jb25zdCBpbnB1dFR5cGVOYW1lcyA9IGlucHV0VHlwZXMucmVkdWNlKChwcmV2LCBjdXIpID0+IHtcclxuICAgIHByZXYucHVzaChjdXIudmFsdWUpO1xyXG4gICAgcmV0dXJuIHByZXY7XHJcbn0sIFtdKTtcclxuXHJcbmV4cG9ydCB7IGlucHV0VHlwZXMsIGlucHV0VHlwZU5hbWVzIH07IiwiY29uc3QgdGV4dGFyZWFpbnB1dCA9IHtcclxuICAgIG5hbWU6IFwiVGV4dCBBcmVhXCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy90ZXh0X2FyZWEuc3ZnXCIsXHJcbiAgICBodG1sOiAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj48bGFiZWw+WW91ciByZXNwb25zZTo8L2xhYmVsPjx0ZXh0YXJlYSBjbGFzcz1cImZvcm0tY29udHJvbFwiPjwvdGV4dGFyZWE+PC9kaXY+J1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGV4dGFyZWFpbnB1dDsiLCJpbXBvcnQgeyBTZWxlY3RJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgdGFibGVyb3cgPSB7XHJcbiAgICBub2RlczogW1widHJcIl0sXHJcbiAgICBuYW1lOiBcIlRhYmxlIFJvd1wiLFxyXG4gICAgaHRtbDogXCI8dHI+PHRkPkNlbGwgMTwvdGQ+PHRkPkNlbGwgMjwvdGQ+PHRkPkNlbGwgMzwvdGQ+PC90cj5cIixcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJUeXBlXCIsXHJcbiAgICAgICAga2V5OiBcInR5cGVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcIlwiLCBcInN1Y2Nlc3NcIiwgXCJkYW5nZXJcIiwgXCJ3YXJuaW5nXCIsIFwiYWN0aXZlXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTdWNjZXNzXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiZXJyb3JcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRXJyb3JcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIldhcm5pbmdcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJhY3RpdmVcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiQWN0aXZlXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFibGVyb3c7IiwiY29uc3QgdGFibGVoZWFkZXJjZWxsID0ge1xyXG4gICAgbm9kZXM6IFtcInRoXCJdLFxyXG4gICAgbmFtZTogXCJUYWJsZSBIZWFkZXIgQ2VsbFwiLFxyXG4gICAgaHRtbDogXCI8dGg+SGVhZDwvdGg+XCJcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhYmxlaGVhZGVyY2VsbDsiLCJpbXBvcnQgeyBTZWxlY3RJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgdGFibGVoZWFkID0ge1xyXG4gICAgbm9kZXM6IFtcInRoZWFkXCJdLFxyXG4gICAgbmFtZTogXCJUYWJsZSBIZWFkXCIsXHJcbiAgICBodG1sOiBcIjx0aGVhZD48dHI+PHRoPkhlYWQgMTwvdGg+PHRoPkhlYWQgMjwvdGg+PHRoPkhlYWQgMzwvdGg+PC90cj48L3RoZWFkPlwiLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIlR5cGVcIixcclxuICAgICAgICBrZXk6IFwidHlwZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiXCIsIFwic3VjY2Vzc1wiLCBcImRhbmdlclwiLCBcIndhcm5pbmdcIiwgXCJpbmZvXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTdWNjZXNzXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYW5nZXJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRXJyb3JcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIldhcm5pbmdcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm9cIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YWJsZWhlYWQ7IiwiY29uc3QgdGFibGVjZWxsID0ge1xyXG4gICAgbm9kZXM6IFtcInRkXCJdLFxyXG4gICAgbmFtZTogXCJUYWJsZSBDZWxsXCIsXHJcbiAgICBodG1sOiBcIjx0ZD5DZWxsPC90ZD5cIlxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFibGVjZWxsOyIsImNvbnN0IHRhYmxlYm9keSA9IHtcclxuICAgIG5vZGVzOiBbXCJ0Ym9keVwiXSxcclxuICAgIG5hbWU6IFwiVGFibGUgQm9keVwiLFxyXG4gICAgaHRtbDogXCI8dGJvZHk+PHRyPjx0ZD5DZWxsIDE8L3RkPjx0ZD5DZWxsIDI8L3RkPjx0ZD5DZWxsIDM8L3RkPjwvdHI+PC90Ym9keT5cIlxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFibGVib2R5OyIsImltcG9ydCB7IFNlbGVjdElucHV0LCBUb2dnbGVJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgdGFibGUgPSB7XHJcbiAgICBub2RlczogW1widGFibGVcIl0sXHJcbiAgICBjbGFzc2VzOiBbXCJ0YWJsZVwiXSxcclxuICAgIGltYWdlOiBcImljb25zL3RhYmxlLnN2Z1wiLFxyXG4gICAgbmFtZTogXCJUYWJsZVwiLFxyXG4gICAgaHRtbDogJzx0YWJsZSBjbGFzcz1cInRhYmxlXCI+XFxcclxuXHRcdCAgPHRoZWFkPlxcXHJcblx0XHRcdDx0cj5cXFxyXG5cdFx0XHQgIDx0aD4jPC90aD5cXFxyXG5cdFx0XHQgIDx0aD5GaXJzdCBOYW1lPC90aD5cXFxyXG5cdFx0XHQgIDx0aD5MYXN0IE5hbWU8L3RoPlxcXHJcblx0XHRcdCAgPHRoPlVzZXJuYW1lPC90aD5cXFxyXG5cdFx0XHQ8L3RyPlxcXHJcblx0XHQgIDwvdGhlYWQ+XFxcclxuXHRcdCAgPHRib2R5PlxcXHJcblx0XHRcdDx0cj5cXFxyXG5cdFx0XHQgIDx0aCBzY29wZT1cInJvd1wiPjE8L3RoPlxcXHJcblx0XHRcdCAgPHRkPk1hcms8L3RkPlxcXHJcblx0XHRcdCAgPHRkPk90dG88L3RkPlxcXHJcblx0XHRcdCAgPHRkPkBtZG88L3RkPlxcXHJcblx0XHRcdDwvdHI+XFxcclxuXHRcdFx0PHRyPlxcXHJcblx0XHRcdCAgPHRoIHNjb3BlPVwicm93XCI+MjwvdGg+XFxcclxuXHRcdFx0ICA8dGQ+SmFjb2I8L3RkPlxcXHJcblx0XHRcdCAgPHRkPlRob3JudG9uPC90ZD5cXFxyXG5cdFx0XHQgIDx0ZD5AZmF0PC90ZD5cXFxyXG5cdFx0XHQ8L3RyPlxcXHJcblx0XHRcdDx0cj5cXFxyXG5cdFx0XHQgIDx0aCBzY29wZT1cInJvd1wiPjM8L3RoPlxcXHJcblx0XHRcdCAgPHRkPkxhcnJ5PC90ZD5cXFxyXG5cdFx0XHQgIDx0ZD50aGUgQmlyZDwvdGQ+XFxcclxuXHRcdFx0ICA8dGQ+QHR3aXR0ZXI8L3RkPlxcXHJcblx0XHRcdDwvdHI+XFxcclxuXHRcdCAgPC90Ym9keT5cXFxyXG5cdFx0PC90YWJsZT4nLFxyXG4gICAgcHJvcGVydGllczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJUeXBlXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJ0eXBlXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJ0YWJsZS1wcmltYXJ5XCIsIFwidGFibGUtc2Vjb25kYXJ5XCIsIFwidGFibGUtc3VjY2Vzc1wiLCBcInRhYmxlLWRhbmdlclwiLCBcInRhYmxlLXdhcm5pbmdcIiwgXCJ0YWJsZS1pbmZvXCIsIFwidGFibGUtbGlnaHRcIiwgXCJ0YWJsZS1kYXJrXCIsIFwidGFibGUtd2hpdGVcIl0sXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiRGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0YWJsZS1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJQcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0YWJsZS1zZWNvbmRhcnlcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlNlY29uZGFyeVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGFibGUtc3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiU3VjY2Vzc1wiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGFibGUtZGFuZ2VyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInRhYmxlLXdhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIldhcm5pbmdcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInRhYmxlLWluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm9cIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInRhYmxlLWxpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJMaWdodFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGFibGUtZGFya1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGFya1wiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGFibGUtd2hpdGVcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIldoaXRlXCJcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJSZXNwb25zaXZlXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJyZXNwb25zaXZlXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJ0YWJsZS1yZXNwb25zaXZlXCJdLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvbjogXCJ0YWJsZS1yZXNwb25zaXZlXCIsXHJcbiAgICAgICAgICAgICAgICBvZmY6IFwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlNtYWxsXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJzbWFsbFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1widGFibGUtc21cIl0sXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9uOiBcInRhYmxlLXNtXCIsXHJcbiAgICAgICAgICAgICAgICBvZmY6IFwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkhvdmVyXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJob3ZlclwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1widGFibGUtaG92ZXJcIl0sXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9uOiBcInRhYmxlLWhvdmVyXCIsXHJcbiAgICAgICAgICAgICAgICBvZmY6IFwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkJvcmRlcmVkXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJib3JkZXJlZFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1widGFibGUtYm9yZGVyZWRcIl0sXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9uOiBcInRhYmxlLWJvcmRlcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBvZmY6IFwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlN0cmlwZWRcIixcclxuICAgICAgICAgICAga2V5OiBcInN0cmlwZWRcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFtcInRhYmxlLXN0cmlwZWRcIl0sXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9uOiBcInRhYmxlLXN0cmlwZWRcIixcclxuICAgICAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiSW52ZXJzZVwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiaW52ZXJzZVwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1widGFibGUtaW52ZXJzZVwiXSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb246IFwidGFibGUtaW52ZXJzZVwiLFxyXG4gICAgICAgICAgICAgICAgb2ZmOiBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJIZWFkIG9wdGlvbnNcIixcclxuICAgICAgICAgICAga2V5OiBcImhlYWRcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICAgICAgY2hpbGQ6IFwidGhlYWRcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFtcIlwiLCBcInRoZWFkLWludmVyc2VcIiwgXCJ0aGVhZC1kZWZhdWx0XCJdLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiTm9uZVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGhlYWQtZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGhlYWQtaW52ZXJzZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiSW52ZXJzZVwiXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhYmxlOyIsImltcG9ydCBWdnZlYiBmcm9tICcuLi8uLi9idWlsZGVyJztcclxuaW1wb3J0IHsgVGV4dFZhbHVlSW5wdXQsIEJ1dHRvbklucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBzZWxlY3RpbnB1dCA9IHtcclxuICAgIG5vZGVzOiBbXCJzZWxlY3RcIl0sXHJcbiAgICBuYW1lOiBcIlNlbGVjdCBJbnB1dFwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvc2VsZWN0X2lucHV0LnN2Z1wiLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCI+PGxhYmVsPkNob29zZSBhbiBvcHRpb24gPC9sYWJlbD48c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCI+PG9wdGlvbiB2YWx1ZT1cInZhbHVlMVwiPlRleHQgMTwvb3B0aW9uPjxvcHRpb24gdmFsdWU9XCJ2YWx1ZTJcIj5UZXh0IDI8L29wdGlvbj48b3B0aW9uIHZhbHVlPVwidmFsdWUzXCI+VGV4dCAzPC9vcHRpb24+PC9zZWxlY3Q+PC9kaXY+JyxcclxuXHJcbiAgICBiZWZvcmVJbml0OiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgIHByb3BlcnRpZXMgPSBbXTtcclxuICAgICAgICB2YXIgaSA9IDA7XHJcblxyXG4gICAgICAgICQobm9kZSkuZmluZCgnb3B0aW9uJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBkYXRhID0geyBcInZhbHVlXCI6IHRoaXMudmFsdWUsIFwidGV4dFwiOiB0aGlzLnRleHQgfTtcclxuXHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiT3B0aW9uIFwiICsgaSxcclxuICAgICAgICAgICAgICAgIGtleTogXCJvcHRpb25cIiArIGksXHJcbiAgICAgICAgICAgICAgICAvL2luZGV4OiBpIC0gMSxcclxuICAgICAgICAgICAgICAgIG9wdGlvbk5vZGU6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBpbnB1dHR5cGU6IFRleHRWYWx1ZUlucHV0LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSwgdmFsdWUsIGlucHV0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbiA9ICQodGhpcy5vcHRpb25Ob2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiByZW1vdmUgYnV0dG9uIGlzIGNsaWNrZWQgcmVtb3ZlIG9wdGlvbiBhbmQgcmVuZGVyIHJvdyBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Lm5vZGVOYW1lID09ICdCVVRUT04nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIoXCJodG1sL3NlbGVjdGlucHV0QGdlbmVyYWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Lm5hbWUgPT0gXCJ2YWx1ZVwiKSBvcHRpb24uYXR0cihcInZhbHVlXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnB1dC5uYW1lID09IFwidGV4dFwiKSBvcHRpb24udGV4dCh2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vcmVtb3ZlIGFsbCBvcHRpb24gcHJvcGVydGllc1xyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHRoaXMucHJvcGVydGllcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ua2V5LmluZGV4T2YoXCJvcHRpb25cIikgPT09IC0xO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL2FkZCByZW1haW5pbmcgcHJvcGVydGllcyB0byBnZW5lcmF0ZWQgY29sdW1uIHByb3BlcnRpZXNcclxuICAgICAgICBwcm9wZXJ0aWVzLnB1c2godGhpcy5wcm9wZXJ0aWVzWzBdKTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllcztcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIk9wdGlvblwiLFxyXG4gICAgICAgIGtleTogXCJvcHRpb24xXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0VmFsdWVJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiT3B0aW9uXCIsXHJcbiAgICAgICAga2V5OiBcIm9wdGlvbjJcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRWYWx1ZUlucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICBrZXk6IFwiYWRkQ2hpbGRcIixcclxuICAgICAgICBpbnB1dHR5cGU6IEJ1dHRvbklucHV0LFxyXG4gICAgICAgIGRhdGE6IHsgdGV4dDogXCJBZGQgb3B0aW9uXCIgfSxcclxuICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAgICAgJChub2RlKS5hcHBlbmQoJzxvcHRpb24gdmFsdWU9XCJ2YWx1ZVwiPlRleHQ8L29wdGlvbj4nKTtcclxuXHJcbiAgICAgICAgICAgIC8vcmVuZGVyIGNvbXBvbmVudCBwcm9wZXJ0aWVzIGFnYWluIHRvIGluY2x1ZGUgdGhlIG5ldyBjb2x1bW4gaW5wdXRzXHJcbiAgICAgICAgICAgIFZ2dmViLkNvbXBvbmVudHMucmVuZGVyKFwiaHRtbC9zZWxlY3RpbnB1dEBnZW5lcmFsXCIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNlbGVjdGlucHV0OyIsImltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBkYXRhQ29tcG9uZW50SWQgfSBmcm9tICcuLi9jb21tb24nO1xyXG5cclxuY29uc3QgcmFkaW9idXR0b24gPSB7XHJcbiAgICBuYW1lOiBcIlJhZGlvIEJ1dHRvblwiLFxyXG4gICAgYXR0cmlidXRlczogeyBcInR5cGVcIjogXCJyYWRpb1wiIH0sXHJcbiAgICBpbWFnZTogXCJpY29ucy9yYWRpby5zdmdcIixcclxuICAgIGh0bWw6IGA8bGFiZWwgJHtkYXRhQ29tcG9uZW50SWR9PVwiaHRtbC9yYWRpb2J1dHRvbkBnZW5lcmFsXCIgY2xhc3M9XCJyYWRpb1wiPjxpbnB1dCB0eXBlPVwicmFkaW9cIj4gUmFkaW88L2xhYmVsPmAsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiTmFtZVwiLFxyXG4gICAgICAgIGtleTogXCJuYW1lXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwibmFtZVwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmFkaW9idXR0b247IiwiaW1wb3J0IHsgU2VsZWN0SW5wdXQsIFRvZ2dsZUlucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGJnY29sb3JDbGFzc2VzLCBiZ2NvbG9yU2VsZWN0T3B0aW9ucyB9IGZyb20gJy4uL2NvbW1vbic7XHJcblxyXG5jb25zdCBwcm9ncmVzcyA9IHtcclxuICAgIGNsYXNzZXM6IFtcInByb2dyZXNzXCJdLFxyXG4gICAgbmFtZTogXCJQcm9ncmVzcyBCYXJcIixcclxuICAgIGltYWdlOiBcImljb25zL3Byb2dyZXNzYmFyLnN2Z1wiLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJwcm9ncmVzc1wiPjxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXIgdy0yNVwiPjwvZGl2PjwvZGl2PicsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiQmFja2dyb3VuZFwiLFxyXG4gICAgICAgIGtleTogXCJiYWNrZ3JvdW5kXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogYmdjb2xvckNsYXNzZXMsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IGJnY29sb3JTZWxlY3RPcHRpb25zXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBuYW1lOiBcIlByb2dyZXNzXCIsXHJcbiAgICAgICAga2V5OiBcImJhY2tncm91bmRcIixcclxuICAgICAgICBjaGlsZDogXCIucHJvZ3Jlc3MtYmFyXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiXCIsIFwidy0yNVwiLCBcInctNTBcIiwgXCJ3LTc1XCIsIFwidy0xMDBcIl0sXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiTm9uZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcInctMjVcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiMjUlXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwidy01MFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCI1MCVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJ3LTc1XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIjc1JVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcInctMTAwXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIjEwMCVcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogXCJQcm9ncmVzcyBiYWNrZ3JvdW5kXCIsXHJcbiAgICAgICAga2V5OiBcImJhY2tncm91bmRcIixcclxuICAgICAgICBjaGlsZDogXCIucHJvZ3Jlc3MtYmFyXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogYmdjb2xvckNsYXNzZXMsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IGJnY29sb3JTZWxlY3RPcHRpb25zXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiU3RyaXBlZFwiLFxyXG4gICAgICAgIGtleTogXCJzdHJpcGVkXCIsXHJcbiAgICAgICAgY2hpbGQ6IFwiLnByb2dyZXNzLWJhclwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcIlwiLCBcInByb2dyZXNzLWJhci1zdHJpcGVkXCJdLFxyXG4gICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvbjogXCJwcm9ncmVzcy1iYXItc3RyaXBlZFwiLFxyXG4gICAgICAgICAgICBvZmY6IFwiXCIsXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiQW5pbWF0ZWRcIixcclxuICAgICAgICBrZXk6IFwiYW5pbWF0ZWRcIixcclxuICAgICAgICBjaGlsZDogXCIucHJvZ3Jlc3MtYmFyXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiXCIsIFwicHJvZ3Jlc3MtYmFyLWFuaW1hdGVkXCJdLFxyXG4gICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvbjogXCJwcm9ncmVzcy1iYXItYW5pbWF0ZWRcIixcclxuICAgICAgICAgICAgb2ZmOiBcIlwiLFxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcm9ncmVzczsiLCJpbXBvcnQgeyBTZWxlY3RJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgcGFnaW5hdGlvbiA9IHtcclxuICAgIGNsYXNzZXM6IFtcInBhZ2luYXRpb25cIl0sXHJcbiAgICBuYW1lOiBcIlBhZ2luYXRpb25cIixcclxuICAgIGltYWdlOiBcImljb25zL3BhZ2luYXRpb24uc3ZnXCIsXHJcbiAgICBodG1sOiAnPG5hdiBhcmlhLWxhYmVsPVwiUGFnZSBuYXZpZ2F0aW9uIGV4YW1wbGVcIj5cXFxyXG5cdCAgPHVsIGNsYXNzPVwicGFnaW5hdGlvblwiPlxcXHJcblx0XHQ8bGkgY2xhc3M9XCJwYWdlLWl0ZW1cIj48YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9XCIjXCI+UHJldmlvdXM8L2E+PC9saT5cXFxyXG5cdFx0PGxpIGNsYXNzPVwicGFnZS1pdGVtXCI+PGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmPVwiI1wiPjE8L2E+PC9saT5cXFxyXG5cdFx0PGxpIGNsYXNzPVwicGFnZS1pdGVtXCI+PGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmPVwiI1wiPjI8L2E+PC9saT5cXFxyXG5cdFx0PGxpIGNsYXNzPVwicGFnZS1pdGVtXCI+PGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmPVwiI1wiPjM8L2E+PC9saT5cXFxyXG5cdFx0PGxpIGNsYXNzPVwicGFnZS1pdGVtXCI+PGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmPVwiI1wiPk5leHQ8L2E+PC9saT5cXFxyXG5cdCAgPC91bD5cXFxyXG5cdDwvbmF2PicsXHJcblxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIlNpemVcIixcclxuICAgICAgICBrZXk6IFwic2l6ZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiYnRuLWxnXCIsIFwiYnRuLXNtXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWxnXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxhcmdlXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLXNtXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlNtYWxsXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJBbGlnbm1lbnRcIixcclxuICAgICAgICBrZXk6IFwiYWxpZ25tZW50XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXCIsIFwianVzdGlmeS1jb250ZW50LWVuZFwiXSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImp1c3RpZnktY29udGVudC1jZW50ZXJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiQ2VudGVyXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwianVzdGlmeS1jb250ZW50LWVuZFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJSaWdodFwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBhZ2luYXRpb247IiwiaW1wb3J0IHsgVGV4dElucHV0LCBUb2dnbGVJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgcGFnZWl0ZW0gPSB7XHJcbiAgICBjbGFzc2VzOiBbXCJwYWdlLWl0ZW1cIl0sXHJcbiAgICBodG1sOiAnPGxpIGNsYXNzPVwicGFnZS1pdGVtXCI+PGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmPVwiI1wiPjE8L2E+PC9saT4nLFxyXG4gICAgbmFtZTogXCJQYWdpbmF0aW9uIEl0ZW1cIixcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJMaW5rIFRvXCIsXHJcbiAgICAgICAga2V5OiBcImhyZWZcIixcclxuICAgICAgICBodG1sQXR0cjogXCJocmVmXCIsXHJcbiAgICAgICAgY2hpbGQ6IFwiLnBhZ2UtbGlua1wiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJEaXNhYmxlZFwiLFxyXG4gICAgICAgIGtleTogXCJkaXNhYmxlZFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImRpc2FibGVkXCJdLFxyXG4gICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvbjogXCJkaXNhYmxlZFwiLFxyXG4gICAgICAgICAgICBvZmY6IFwiXCJcclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGFnZWl0ZW07IiwiaW1wb3J0IHsgU2VsZWN0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgYmdjb2xvckNsYXNzZXMsIGJnY29sb3JTZWxlY3RPcHRpb25zIH0gZnJvbSAnLi4vY29tbW9uJztcclxuXHJcbmNvbnN0IG5hdmJhciA9IHtcclxuICAgIGNsYXNzZXM6IFtcIm5hdmJhclwiXSxcclxuICAgIGltYWdlOiBcImljb25zL25hdmJhci5zdmdcIixcclxuICAgIG5hbWU6IFwiTmF2IEJhclwiLFxyXG4gICAgaHRtbDogJzxuYXYgY2xhc3M9XCJuYXZiYXIgbmF2YmFyLWV4cGFuZC1sZyBuYXZiYXItbGlnaHQgYmctbGlnaHRcIj5cXFxyXG5cdFx0ICA8YSBjbGFzcz1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCIjXCI+TmF2YmFyPC9hPlxcXHJcblx0XHQgIDxidXR0b24gY2xhc3M9XCJuYXZiYXItdG9nZ2xlclwiIHR5cGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS10YXJnZXQ9XCIjbmF2YmFyU3VwcG9ydGVkQ29udGVudFwiIGFyaWEtY29udHJvbHM9XCJuYXZiYXJTdXBwb3J0ZWRDb250ZW50XCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgYXJpYS1sYWJlbD1cIlRvZ2dsZSBuYXZpZ2F0aW9uXCI+XFxcclxuXHRcdFx0PHNwYW4gY2xhc3M9XCJuYXZiYXItdG9nZ2xlci1pY29uXCI+PC9zcGFuPlxcXHJcblx0XHQgIDwvYnV0dG9uPlxcXHJcblx0XHRcXFxyXG5cdFx0ICA8ZGl2IGNsYXNzPVwiY29sbGFwc2UgbmF2YmFyLWNvbGxhcHNlXCIgaWQ9XCJuYXZiYXJTdXBwb3J0ZWRDb250ZW50XCI+XFxcclxuXHRcdFx0PHVsIGNsYXNzPVwibmF2YmFyLW5hdiBtci1hdXRvXCI+XFxcclxuXHRcdFx0ICA8bGkgY2xhc3M9XCJuYXYtaXRlbSBhY3RpdmVcIj5cXFxyXG5cdFx0XHRcdDxhIGNsYXNzPVwibmF2LWxpbmtcIiBocmVmPVwiI1wiPkhvbWUgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+KGN1cnJlbnQpPC9zcGFuPjwvYT5cXFxyXG5cdFx0XHQgIDwvbGk+XFxcclxuXHRcdFx0ICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPlxcXHJcblx0XHRcdFx0PGEgY2xhc3M9XCJuYXYtbGlua1wiIGhyZWY9XCIjXCI+TGluazwvYT5cXFxyXG5cdFx0XHQgIDwvbGk+XFxcclxuXHRcdFx0ICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPlxcXHJcblx0XHRcdFx0PGEgY2xhc3M9XCJuYXYtbGluayBkaXNhYmxlZFwiIGhyZWY9XCIjXCI+RGlzYWJsZWQ8L2E+XFxcclxuXHRcdFx0ICA8L2xpPlxcXHJcblx0XHRcdDwvdWw+XFxcclxuXHRcdFx0PGZvcm0gY2xhc3M9XCJmb3JtLWlubGluZSBteS0yIG15LWxnLTBcIj5cXFxyXG5cdFx0XHQgIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbCBtci1zbS0yXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiIGFyaWEtbGFiZWw9XCJTZWFyY2hcIj5cXFxyXG5cdFx0XHQgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLW91dGxpbmUtc3VjY2VzcyBteS0yIG15LXNtLTBcIiB0eXBlPVwic3VibWl0XCI+U2VhcmNoPC9idXR0b24+XFxcclxuXHRcdFx0PC9mb3JtPlxcXHJcblx0XHQgIDwvZGl2PlxcXHJcblx0XHQ8L25hdj4nLFxyXG5cclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJDb2xvciB0aGVtZVwiLFxyXG4gICAgICAgIGtleTogXCJjb2xvclwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcIm5hdmJhci1saWdodFwiLCBcIm5hdmJhci1kYXJrXCJdLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJuYXZiYXItbGlnaHRcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiTGlnaHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJuYXZiYXItZGFya1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEYXJrXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJCYWNrZ3JvdW5kIGNvbG9yXCIsXHJcbiAgICAgICAga2V5OiBcImJhY2tncm91bmRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBiZ2NvbG9yQ2xhc3NlcyxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogYmdjb2xvclNlbGVjdE9wdGlvbnNcclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJQbGFjZW1lbnRcIixcclxuICAgICAgICBrZXk6IFwicGxhY2VtZW50XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiZml4ZWQtdG9wXCIsIFwiZml4ZWQtYm90dG9tXCIsIFwic3RpY2t5LXRvcFwiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiZml4ZWQtdG9wXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkZpeGVkIFRvcFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImZpeGVkLWJvdHRvbVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJGaXhlZCBCb3R0b21cIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJzdGlja3ktdG9wXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlN0aWNreSB0b3BcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuYXZiYXI7IiwiY29uc3QgbGlzdGl0ZW0gPSB7XHJcbiAgICBuYW1lOiBcIkxpc3QgSXRlbVwiLFxyXG4gICAgY2xhc3NlczogW1wibGlzdC1ncm91cC1pdGVtXCJdLFxyXG4gICAgaHRtbDogJzxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiPjxzcGFuIGNsYXNzPVwiYmFkZ2VcIj4xNDwvc3Bhbj4gQ3JhcyBqdXN0byBvZGlvPC9saT4nXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsaXN0aXRlbTsiLCJjb25zdCBsaXN0Z3JvdXAgPSB7XHJcbiAgICBuYW1lOiBcIkxpc3QgR3JvdXBcIixcclxuICAgIGltYWdlOiBcImljb25zL2xpc3RfZ3JvdXAuc3ZnXCIsXHJcbiAgICBjbGFzc2VzOiBbXCJsaXN0LWdyb3VwXCJdLFxyXG4gICAgaHRtbDogJzx1bCBjbGFzcz1cImxpc3QtZ3JvdXBcIj5cXG4gIDxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiPlxcbiAgICA8c3BhbiBjbGFzcz1cImJhZGdlXCI+MTQ8L3NwYW4+XFxuICAgIENyYXMganVzdG8gb2Rpb1xcbiAgPC9saT5cXG4gIDxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiPlxcbiAgICA8c3BhbiBjbGFzcz1cImJhZGdlXCI+Mjwvc3Bhbj5cXG4gICAgRGFwaWJ1cyBhYyBmYWNpbGlzaXMgaW5cXG4gIDwvbGk+XFxuICA8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj5cXG4gICAgPHNwYW4gY2xhc3M9XCJiYWRnZVwiPjE8L3NwYW4+XFxuICAgIE1vcmJpIGxlbyByaXN1c1xcbiAgPC9saT5cXG48L3VsPidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxpc3Rncm91cDsiLCJpbXBvcnQgeyBMaW5rSW5wdXQsIFRleHRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgbGluayA9IHtcclxuICAgIG5vZGVzOiBbXCJhXCJdLFxyXG4gICAgbmFtZTogXCJMaW5rXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiVXJsXCIsXHJcbiAgICAgICAga2V5OiBcImhyZWZcIixcclxuICAgICAgICBodG1sQXR0cjogXCJocmVmXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBMaW5rSW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlRhcmdldFwiLFxyXG4gICAgICAgIGtleTogXCJ0YXJnZXRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJ0YXJnZXRcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxpbms7IiwiaW1wb3J0IHsgVGV4dElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBsYWJlbCA9IHtcclxuICAgIG5hbWU6ICdMYWJlbCcsXHJcbiAgICBub2RlczogWydsYWJlbCddLFxyXG4gICAgaW1hZ2U6ICdpY29ucy9sYWJlbC5zdmcnLFxyXG4gICAgaHRtbDogJzxsYWJlbCBmb3I9XCJcIj5MYWJlbDwvbGFiZWw+JyxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogJ0ZvciBpZCcsXHJcbiAgICAgICAgaHRtbEF0dHI6ICdmb3InLFxyXG4gICAgICAgIGtleTogJ2ZvcicsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsYWJlbDsiLCJjb25zdCBqdW1ib3Ryb24gPSB7XHJcbiAgICBjbGFzc2VzOiBbXCJqdW1ib3Ryb25cIl0sXHJcbiAgICBpbWFnZTogXCJpY29ucy9qdW1ib3Ryb24uc3ZnXCIsXHJcbiAgICBuYW1lOiBcIkp1bWJvdHJvblwiLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJqdW1ib3Ryb25cIj5cXFxyXG5cdFx0ICA8aDEgY2xhc3M9XCJkaXNwbGF5LTNcIj5IZWxsbywgd29ybGQhPC9oMT5cXFxyXG5cdFx0ICA8cCBjbGFzcz1cImxlYWRcIj5UaGlzIGlzIGEgc2ltcGxlIGhlcm8gdW5pdCwgYSBzaW1wbGUganVtYm90cm9uLXN0eWxlIGNvbXBvbmVudCBmb3IgY2FsbGluZyBleHRyYSBhdHRlbnRpb24gdG8gZmVhdHVyZWQgY29udGVudCBvciBpbmZvcm1hdGlvbi48L3A+XFxcclxuXHRcdCAgPGhyIGNsYXNzPVwibXktNFwiPlxcXHJcblx0XHQgIDxwPkl0IHVzZXMgdXRpbGl0eSBjbGFzc2VzIGZvciB0eXBvZ3JhcGh5IGFuZCBzcGFjaW5nIHRvIHNwYWNlIGNvbnRlbnQgb3V0IHdpdGhpbiB0aGUgbGFyZ2VyIGNvbnRhaW5lci48L3A+XFxcclxuXHRcdCAgPHAgY2xhc3M9XCJsZWFkXCI+XFxcclxuXHRcdFx0PGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLWxnXCIgaHJlZj1cIiNcIiByb2xlPVwiYnV0dG9uXCI+TGVhcm4gbW9yZTwvYT5cXFxyXG5cdFx0ICA8L3A+XFxcclxuXHRcdDwvZGl2PidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGp1bWJvdHJvbjsiLCJpbXBvcnQgVnZ2ZWIgZnJvbSAnLi4vLi4vYnVpbGRlcidcclxuaW1wb3J0IHsgRmlsZVVwbG9hZElucHV0LCBUZXh0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGltYWdlID0ge1xyXG4gICAgbm9kZXM6IFtcImltZ1wiXSxcclxuICAgIG5hbWU6IFwiSW1hZ2VcIixcclxuICAgIGh0bWw6ICc8aW1nIHNyYz1cIicgKyBWdnZlYi5iYXNlVXJsICsgJ2ljb25zL2ltYWdlLnN2Z1wiIGhlaWdodD1cIjEyOFwiIHdpZHRoPVwiMTI4XCI+JyxcclxuICAgIC8qXHJcbiAgICBhZnRlckRyb3A6IGZ1bmN0aW9uIChub2RlKVxyXG5cdHtcclxuXHRcdG5vZGUuYXR0cihcInNyY1wiLCAnJyk7XHJcblx0XHRyZXR1cm4gbm9kZTtcclxuXHR9LCovXHJcbiAgICBpbWFnZTogXCJpY29ucy9pbWFnZS5zdmdcIixcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJJbWFnZVwiLFxyXG4gICAgICAgIGtleTogXCJzcmNcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzcmNcIixcclxuICAgICAgICBpbnB1dHR5cGU6IEZpbGVVcGxvYWRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiV2lkdGhcIixcclxuICAgICAgICBrZXk6IFwid2lkdGhcIixcclxuICAgICAgICBodG1sQXR0cjogXCJ3aWR0aFwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJIZWlnaHRcIixcclxuICAgICAgICBrZXk6IFwiaGVpZ2h0XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiaGVpZ2h0XCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkFsdFwiLFxyXG4gICAgICAgIGtleTogXCJhbHRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJhbHRcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGltYWdlOyIsImNvbnN0IGhyID0ge1xyXG4gICAgaW1hZ2U6IFwiaWNvbnMvaHIuc3ZnXCIsXHJcbiAgICBub2RlczogW1wiaHJcIl0sXHJcbiAgICBuYW1lOiBcIkhvcml6b250YWwgUnVsZVwiLFxyXG4gICAgaHRtbDogXCI8aHI+XCJcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgaHI7IiwiaW1wb3J0IHsgY2hhbmdlTm9kZU5hbWUgfSBmcm9tICcuLi9jb21tb24nO1xyXG5pbXBvcnQgeyBTZWxlY3RJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgaGVhZGluZyA9ICB7XHJcbiAgICBpbWFnZTogXCJpY29ucy9oZWFkaW5nLnN2Z1wiLFxyXG4gICAgbmFtZTogXCJIZWFkaW5nXCIsXHJcbiAgICBub2RlczogW1wiaDFcIiwgXCJoMlwiLCBcImgzXCIsIFwiaDRcIiwgXCJoNVwiLCBcImg2XCJdLFxyXG4gICAgaHRtbDogXCI8aDE+SGVhZGluZzwvaDE+XCIsXHJcblxyXG4gICAgcHJvcGVydGllczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJTaXplXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJpZFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJpZFwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG5cclxuICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBjaGFuZ2VOb2RlTmFtZShub2RlLCBcImhcIiArIHZhbHVlKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVnZXg7XHJcbiAgICAgICAgICAgICAgICByZWdleCA9IC9IKFxcZCkvLmV4ZWMobm9kZS5ub2RlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVnZXggJiYgcmVnZXhbMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVnZXhbMV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiAxXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjFcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIjFcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjJcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIjJcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjNcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIjNcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIjRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjVcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIjVcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjZcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIjZcIlxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGVhZGluZzsiLCJpbXBvcnQgeyBHcmlkSW5wdXQsIEJ1dHRvbklucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBncmlkcm93ID0ge1xyXG4gICAgbmFtZTogXCJHcmlkIFJvd1wiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvZ3JpZF9yb3cuc3ZnXCIsXHJcbiAgICBjbGFzc2VzOiBbXCJyb3dcIl0sXHJcbiAgICBodG1sOiAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPjxoMz5jb2wtc20tNDwvaDM+PC9kaXY+PGRpdiBjbGFzcz1cImNvbC1zbS00IGNvbC01XCI+PGgzPmNvbC1zbS00PC9oMz48L2Rpdj48ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj48aDM+Y29sLXNtLTQ8L2gzPjwvZGl2PjwvZGl2PicsXHJcblxyXG4gICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICBwcm9wZXJ0aWVzID0gW107XHJcbiAgICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICAgIHZhciBqID0gMDtcclxuXHJcbiAgICAgICAgJChub2RlKS5maW5kKCdbY2xhc3MqPVwiY29sLVwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfY2xhc3MgPSAkKHRoaXMpLmF0dHIoXCJjbGFzc1wiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZWcgPSAvY29sLShbXi1cXCQgXSopPy0/KFxcZCspL2c7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaDtcclxuICAgICAgICAgICAgZGF0YSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgd2hpbGUgKChtYXRjaCA9IHJlZy5leGVjKF9jbGFzcykpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFbXCJjb2xcIiArICgobWF0Y2hbMV0gIT0gdW5kZWZpbmVkKSA/IFwiX1wiICsgbWF0Y2hbMV0gOiBcIlwiKV0gPSBtYXRjaFsyXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJDb2x1bW4gXCIgKyBpLFxyXG4gICAgICAgICAgICAgICAga2V5OiBcImNvbHVtblwiICsgaSxcclxuICAgICAgICAgICAgICAgIC8vaW5kZXg6IGkgLSAxLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uTm9kZTogdGhpcyxcclxuICAgICAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGlucHV0dHlwZTogR3JpZElucHV0LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSwgdmFsdWUsIGlucHV0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vY29sdW1uID0gJCgnW2NsYXNzKj1cImNvbC1cIl06ZXEoJyArIHRoaXMuaW5kZXggKyAnKScsIG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbiA9ICQodGhpcy5jb2x1bW5Ob2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiByZW1vdmUgYnV0dG9uIGlzIGNsaWNrZWQgcmVtb3ZlIGNvbHVtbiBhbmQgcmVuZGVyIHJvdyBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Lm5vZGVOYW1lID09ICdCVVRUT04nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbi5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIoXCJodG1sL2dyaWRyb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiBzZWxlY3QgaW5wdXQgdGhlbiBjaGFuZ2UgY29sdW1uIGNsYXNzXHJcbiAgICAgICAgICAgICAgICAgICAgX2NsYXNzID0gY29sdW1uLmF0dHIoXCJjbGFzc1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZW1vdmUgcHJldmlvdXMgYnJlYWtwb2ludCBjb2x1bW4gc2l6ZVxyXG4gICAgICAgICAgICAgICAgICAgIF9jbGFzcyA9IF9jbGFzcy5yZXBsYWNlKG5ldyBSZWdFeHAoaW5wdXQubmFtZSArICctXFxcXGQrPycpLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hZGQgbmV3IGNvbHVtbiBzaXplXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlKSBfY2xhc3MgKz0gJyAnICsgaW5wdXQubmFtZSArICctJyArIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbi5hdHRyKFwiY2xhc3NcIiwgX2NsYXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9yZW1vdmUgYWxsIGNvbHVtbiBwcm9wZXJ0aWVzXHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gdGhpcy5wcm9wZXJ0aWVzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5rZXkuaW5kZXhPZihcImNvbHVtblwiKSA9PT0gLTE7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vYWRkIHJlbWFpbmluZyBwcm9wZXJ0aWVzIHRvIGdlbmVyYXRlZCBjb2x1bW4gcHJvcGVydGllc1xyXG4gICAgICAgIHByb3BlcnRpZXMucHVzaCh0aGlzLnByb3BlcnRpZXNbMF0pO1xyXG5cclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiQ29sdW1uXCIsXHJcbiAgICAgICAga2V5OiBcImNvbHVtbjFcIixcclxuICAgICAgICBpbnB1dHR5cGU6IEdyaWRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiQ29sdW1uXCIsXHJcbiAgICAgICAga2V5OiBcImNvbHVtbjFcIixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgY29sOiAxMixcclxuICAgICAgICBpbnB1dHR5cGU6IEdyaWRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAga2V5OiBcImFkZENoaWxkXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBCdXR0b25JbnB1dCxcclxuICAgICAgICBkYXRhOiB7IHRleHQ6IFwiQWRkIGNvbHVtblwiIH0sXHJcbiAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgICAgICQobm9kZSkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiY29sLTNcIj5Db2wtMzwvZGl2PicpO1xyXG5cclxuICAgICAgICAgICAgLy9yZW5kZXIgY29tcG9uZW50IHByb3BlcnRpZXMgYWdhaW4gdG8gaW5jbHVkZSB0aGUgbmV3IGNvbHVtbiBpbnB1dHNcclxuICAgICAgICAgICAgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIoXCJodG1sL2dyaWRyb3dcIik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ3JpZHJvdzsiLCJpbXBvcnQgeyBHcmlkSW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGdyaWRjb2x1bW4gPSB7XHJcbiAgICBuYW1lOiBcIkdyaWQgQ29sdW1uXCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9ncmlkX3Jvdy5zdmdcIixcclxuICAgIGNsYXNzZXNSZWdleDogW1wiY29sLVwiXSxcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj48aDM+Y29sLXNtLTQ8L2gzPjwvZGl2PicsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiQ29sdW1uXCIsXHJcbiAgICAgICAga2V5OiBcImNvbHVtblwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogR3JpZElucHV0LFxyXG4gICAgICAgIGRhdGE6IHsgaGlkZV9yZW1vdmU6IHRydWUgfSxcclxuXHJcbiAgICAgICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAgICAgX2NsYXNzID0gJChub2RlKS5hdHRyKFwiY2xhc3NcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVnID0gL2NvbC0oW14tXFwkIF0qKT8tPyhcXGQrKS9nO1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2g7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoKG1hdGNoID0gcmVnLmV4ZWMoX2NsYXNzKSkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhW1wiY29sXCIgKyAoKG1hdGNoWzFdICE9IHVuZGVmaW5lZCkgPyBcIl9cIiArIG1hdGNoWzFdIDogXCJcIildID0gbWF0Y2hbMl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKG5vZGUsIHZhbHVlLCBpbnB1dCkge1xyXG4gICAgICAgICAgICBfY2xhc3MgPSBub2RlLmF0dHIoXCJjbGFzc1wiKTtcclxuXHJcbiAgICAgICAgICAgIC8vcmVtb3ZlIHByZXZpb3VzIGJyZWFrcG9pbnQgY29sdW1uIHNpemVcclxuICAgICAgICAgICAgX2NsYXNzID0gX2NsYXNzLnJlcGxhY2UobmV3IFJlZ0V4cChpbnB1dC5uYW1lICsgJy1cXFxcZCs/JyksICcnKTtcclxuICAgICAgICAgICAgLy9hZGQgbmV3IGNvbHVtbiBzaXplXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSkgX2NsYXNzICs9ICcgJyArIGlucHV0Lm5hbWUgKyAnLScgKyB2YWx1ZTtcclxuICAgICAgICAgICAgbm9kZS5hdHRyKFwiY2xhc3NcIiwgX2NsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH0sXHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ3JpZGNvbHVtbjsiLCJpbXBvcnQgeyBUZXh0SW5wdXQsIFNlbGVjdElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBmb3JtID0ge1xyXG4gICAgbm9kZXM6IFtcImZvcm1cIl0sXHJcbiAgICBpbWFnZTogXCJpY29ucy9mb3JtLnN2Z1wiLFxyXG4gICAgbmFtZTogXCJGb3JtXCIsXHJcbiAgICBodG1sOiAnPGZvcm0gY2xhc3M9XCJkcm9wem9uZVwiPjwvZm9ybT4nLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIlN0eWxlXCIsXHJcbiAgICAgICAga2V5OiBcInN0eWxlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiXCIsIFwiZm9ybS1zZWFyY2hcIiwgXCJmb3JtLWlubGluZVwiLCBcImZvcm0taG9yaXpvbnRhbFwiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiZm9ybS1zZWFyY2hcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU2VhcmNoXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiZm9ybS1pbmxpbmVcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5saW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiZm9ybS1ob3Jpem9udGFsXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhvcml6b250YWxcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkFjdGlvblwiLFxyXG4gICAgICAgIGtleTogXCJhY3Rpb25cIixcclxuICAgICAgICBodG1sQXR0cjogXCJhY3Rpb25cIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiTWV0aG9kXCIsXHJcbiAgICAgICAga2V5OiBcIm1ldGhvZFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcIm1ldGhvZFwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZm9ybTsiLCJjb25zdCBmaWxlaW5wdXQgPSB7XHJcbiAgICBuYW1lOiBcIklucHV0IGdyb3VwXCIsXHJcbiAgICBhdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBcImZpbGVcIiB9LFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvdGV4dF9pbnB1dC5zdmdcIixcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxcXHJcblx0XHRcdCAgPGlucHV0IHR5cGU9XCJmaWxlXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cXFxyXG5cdFx0XHQ8L2Rpdj4nXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmaWxlaW5wdXQ7IiwiaW1wb3J0IHsgYmdjb2xvclNlbGVjdE9wdGlvbnMsIGJnY29sb3JDbGFzc2VzIH0gZnJvbSAnLi4vY29tbW9uJztcclxuaW1wb3J0IHsgU2VsZWN0SW5wdXQsIENvbG9ySW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGRpdiA9IHtcclxuICAgIGNsYXNzZXM6IFtcImNvbnRhaW5lclwiLCBcImNvbnRhaW5lci1mbHVpZFwiXSxcclxuICAgIGltYWdlOiBcImljb25zL2Rpdi5zdmdcIixcclxuICAgIGh0bWw6ICc8ZGl2IHN0eWxlPVwid2lkdGg6IDM1MHB4OyBoZWlnaHQ6IDIwMHB4O1wiIGNsYXNzPVwiZHJvcHpvbmVcIj48L2Rpdj4nLFxyXG4gICAgbmFtZTogXCJEaXZcIixcclxuICAgIHByb3BlcnRpZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICAgICAgICBrZXk6IFwidHlwZVwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1wiY29udGFpbmVyXCIsIFwiY29udGFpbmVyLWZsdWlkXCJdLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImNvbnRhaW5lclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiY29udGFpbmVyLWZsdWlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJGbHVpZFwiXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiQmFja2dyb3VuZFwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiYmFja2dyb3VuZFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogYmdjb2xvckNsYXNzZXMsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IGJnY29sb3JTZWxlY3RPcHRpb25zXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJCYWNrZ3JvdW5kIENvbG9yXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJiYWNrZ3JvdW5kLWNvbG9yXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ29sb3JJbnB1dCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJUZXh0IENvbG9yXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJjb2xvclwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENvbG9ySW5wdXQsXHJcbiAgICAgICAgfV0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkaXY7IiwiaW1wb3J0IHsgU2VsZWN0SW5wdXQsIENvbG9ySW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgYmdjb2xvckNsYXNzZXMsIGJnY29sb3JTZWxlY3RPcHRpb25zIH0gZnJvbSAnLi4vY29tbW9uJztcclxuXHJcbmNvbnN0IGNvbnRhaW5lciA9IHtcclxuICAgIGNsYXNzZXM6IFtcImNvbnRhaW5lclwiLCBcImNvbnRhaW5lci1mbHVpZFwiXSxcclxuICAgIGltYWdlOiBcImljb25zL2NvbnRhaW5lci5zdmdcIixcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwiY29udGFpbmVyIGRyb3B6b25lXCI+PGRpdiBjbGFzcz1cIm0tNVwiPkNvbnRhaW5lcjwvZGl2PjwvZGl2PicsXHJcbiAgICBuYW1lOiBcIkNvbnRhaW5lclwiLFxyXG4gICAgcHJvcGVydGllczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJUeXBlXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJ0eXBlXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJjb250YWluZXJcIiwgXCJjb250YWluZXItZmx1aWRcIl0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiY29udGFpbmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJjb250YWluZXItZmx1aWRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkZsdWlkXCJcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJCYWNrZ3JvdW5kXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJiYWNrZ3JvdW5kXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBiZ2NvbG9yQ2xhc3NlcyxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogYmdjb2xvclNlbGVjdE9wdGlvbnNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkJhY2tncm91bmQgQ29sb3JcIixcclxuICAgICAgICAgICAga2V5OiBcImJhY2tncm91bmQtY29sb3JcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDb2xvcklucHV0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlRleHQgQ29sb3JcIixcclxuICAgICAgICAgICAga2V5OiBcImNvbG9yXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ29sb3JJbnB1dCxcclxuICAgICAgICB9XSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbnRhaW5lcjtcclxuXHJcbiIsImltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgY2hlY2tib3ggPSB7XHJcbiAgICBuYW1lOiBcIkNoZWNrYm94XCIsXHJcbiAgICBhdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBcImNoZWNrYm94XCIgfSxcclxuICAgIGltYWdlOiBcImljb25zL2NoZWNrYm94LnN2Z1wiLFxyXG4gICAgaHRtbDogJzxsYWJlbCBjbGFzcz1cImNoZWNrYm94XCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiPiBDaGVja2JveDwvbGFiZWw+JyxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJOYW1lXCIsXHJcbiAgICAgICAga2V5OiBcIm5hbWVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJuYW1lXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjaGVja2JveDsiLCJjb25zdCBjYXJkID0ge1xyXG4gICAgY2xhc3NlczogW1wiY2FyZFwiXSxcclxuICAgIGltYWdlOiBcImljb25zL3BhbmVsLnN2Z1wiLFxyXG4gICAgbmFtZTogXCJDYXJkXCIsXHJcbiAgICBodG1sOiAnPGRpdiBjbGFzcz1cImNhcmRcIj5cXFxyXG5cdFx0ICA8aW1nIGNsYXNzPVwiY2FyZC1pbWctdG9wXCIgc3JjPVwiLi4vbGlicy9idWlsZGVyL2ljb25zL2ltYWdlLnN2Z1wiIGFsdD1cIkNhcmQgaW1hZ2UgY2FwXCIgd2lkdGg9XCIxMjhcIiBoZWlnaHQ9XCIxMjhcIj5cXFxyXG5cdFx0ICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XFxcclxuXHRcdFx0PGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPkNhcmQgdGl0bGU8L2g0PlxcXHJcblx0XHRcdDxwIGNsYXNzPVwiY2FyZC10ZXh0XCI+U29tZSBxdWljayBleGFtcGxlIHRleHQgdG8gYnVpbGQgb24gdGhlIGNhcmQgdGl0bGUgYW5kIG1ha2UgdXAgdGhlIGJ1bGsgb2YgdGhlIGNhcmRcXCdzIGNvbnRlbnQuPC9wPlxcXHJcblx0XHRcdDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIj5HbyBzb21ld2hlcmU8L2E+XFxcclxuXHRcdCAgPC9kaXY+XFxcclxuXHRcdDwvZGl2PidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNhcmQ7IiwiY29uc3QgYnV0dG9udG9vbGJhciA9ICB7XHJcbiAgICBjbGFzc2VzOiBbXCJidG4tdG9vbGJhclwiXSxcclxuICAgIG5hbWU6IFwiQnV0dG9uIFRvb2xiYXJcIixcclxuICAgIGltYWdlOiBcImljb25zL2J1dHRvbl90b29sYmFyLnN2Z1wiLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJidG4tdG9vbGJhclwiIHJvbGU9XCJ0b29sYmFyXCIgYXJpYS1sYWJlbD1cIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXCI+XFxcclxuXHRcdCAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cCBtci0yXCIgcm9sZT1cImdyb3VwXCIgYXJpYS1sYWJlbD1cIkZpcnN0IGdyb3VwXCI+XFxcclxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiPjE8L2J1dHRvbj5cXFxyXG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCI+MjwvYnV0dG9uPlxcXHJcblx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIj4zPC9idXR0b24+XFxcclxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiPjQ8L2J1dHRvbj5cXFxyXG5cdFx0ICA8L2Rpdj5cXFxyXG5cdFx0ICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIG1yLTJcIiByb2xlPVwiZ3JvdXBcIiBhcmlhLWxhYmVsPVwiU2Vjb25kIGdyb3VwXCI+XFxcclxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiPjU8L2J1dHRvbj5cXFxyXG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCI+NjwvYnV0dG9uPlxcXHJcblx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIj43PC9idXR0b24+XFxcclxuXHRcdCAgPC9kaXY+XFxcclxuXHRcdCAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIHJvbGU9XCJncm91cFwiIGFyaWEtbGFiZWw9XCJUaGlyZCBncm91cFwiPlxcXHJcblx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIj44PC9idXR0b24+XFxcclxuXHRcdCAgPC9kaXY+XFxcclxuXHRcdDwvZGl2PidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1dHRvbnRvb2xiYXI7IiwiaW1wb3J0IHsgU2VsZWN0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGJ1dHRvbmdyb3VwID0ge1xyXG4gICAgY2xhc3NlczogW1wiYnRuLWdyb3VwXCJdLFxyXG4gICAgbmFtZTogXCJCdXR0b24gR3JvdXBcIixcclxuICAgIGltYWdlOiBcImljb25zL2J1dHRvbl9ncm91cC5zdmdcIixcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCIgYXJpYS1sYWJlbD1cIkJhc2ljIGV4YW1wbGVcIj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCI+TGVmdDwvYnV0dG9uPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIj5NaWRkbGU8L2J1dHRvbj4gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiPlJpZ2h0PC9idXR0b24+PC9kaXY+JyxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJTaXplXCIsXHJcbiAgICAgICAga2V5OiBcInNpemVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImJ0bi1ncm91cC1sZ1wiLCBcImJ0bi1ncm91cC1zbVwiXSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1ncm91cC1sZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMYXJnZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1ncm91cC1zbVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTbWFsbFwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiQWxpZ25tZW50XCIsXHJcbiAgICAgICAga2V5OiBcImFsaWdubWVudFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiYnRuLWdyb3VwXCIsIFwiYnRuLWdyb3VwLXZlcnRpY2FsXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWdyb3VwXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhvcml6b250YWxcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tZ3JvdXAtdmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiVmVydGljYWxcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidXR0b25ncm91cDsiLCJpbXBvcnQgeyBMaW5rSW5wdXQsIFNlbGVjdElucHV0LCBUZXh0SW5wdXQsIFRvZ2dsZUlucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBidXR0b24gPSB7XHJcbiAgICBjbGFzc2VzOiBbXCJidG5cIiwgXCJidG4tbGlua1wiXSxcclxuICAgIG5hbWU6IFwiQnV0dG9uXCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9idXR0b24uc3ZnXCIsXHJcbiAgICBodG1sOiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIj5QcmltYXJ5PC9idXR0b24+JyxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJMaW5rIFRvXCIsXHJcbiAgICAgICAga2V5OiBcImhyZWZcIixcclxuICAgICAgICBodG1sQXR0cjogXCJocmVmXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBMaW5rSW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlR5cGVcIixcclxuICAgICAgICBrZXk6IFwidHlwZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiYnRuLWRlZmF1bHRcIiwgXCJidG4tcHJpbWFyeVwiLCBcImJ0bi1pbmZvXCIsIFwiYnRuLXN1Y2Nlc3NcIiwgXCJidG4td2FybmluZ1wiLCBcImJ0bi1pbmZvXCIsIFwiYnRuLWxpZ2h0XCIsIFwiYnRuLWRhcmtcIiwgXCJidG4tb3V0bGluZS1wcmltYXJ5XCIsIFwiYnRuLW91dGxpbmUtaW5mb1wiLCBcImJ0bi1vdXRsaW5lLXN1Y2Nlc3NcIiwgXCJidG4tb3V0bGluZS13YXJuaW5nXCIsIFwiYnRuLW91dGxpbmUtaW5mb1wiLCBcImJ0bi1vdXRsaW5lLWxpZ2h0XCIsIFwiYnRuLW91dGxpbmUtZGFya1wiLCBcImJ0bi1saW5rXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJQcmltYXJ5XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuIGJ0bi1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm9cIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tc3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTdWNjZXNzXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLXdhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiV2FybmluZ1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm9cIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tbGlnaHRcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiTGlnaHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tZGFya1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEYXJrXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLW91dGxpbmUtcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJQcmltYXJ5IG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4gYnRuLW91dGxpbmUtaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJJbmZvIG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tb3V0bGluZS1zdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlN1Y2Nlc3Mgb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1vdXRsaW5lLXdhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiV2FybmluZyBvdXRsaW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLW91dGxpbmUtaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJJbmZvIG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tb3V0bGluZS1saWdodFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMaWdodCBvdXRsaW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLW91dGxpbmUtZGFya1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEYXJrIG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tbGlua1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMaW5rXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJTaXplXCIsXHJcbiAgICAgICAga2V5OiBcInNpemVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImJ0bi1sZ1wiLCBcImJ0bi1zbVwiXSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1sZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMYXJnZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1zbVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTbWFsbFwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiVGFyZ2V0XCIsXHJcbiAgICAgICAga2V5OiBcInRhcmdldFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInRhcmdldFwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJEaXNhYmxlZFwiLFxyXG4gICAgICAgIGtleTogXCJkaXNhYmxlZFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiZGlzYWJsZWRcIl0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvbjogXCJkaXNhYmxlZFwiLFxyXG4gICAgICAgICAgICBvZmY6IFwiXCJcclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnV0dG9uOyIsImNvbnN0IGJyZWFkY3J1bWJzID0gIHtcclxuICAgIGNsYXNzZXM6IFtcImJyZWFkY3J1bWJcIl0sXHJcbiAgICBuYW1lOiBcIkJyZWFkY3J1bWJzXCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9icmVhZGNydW1icy5zdmdcIixcclxuICAgIGh0bWw6ICc8b2wgY2xhc3M9XCJicmVhZGNydW1iXCI+XFxcclxuXHRcdCAgPGxpIGNsYXNzPVwiYnJlYWRjcnVtYi1pdGVtIGFjdGl2ZVwiPjxhIGhyZWY9XCIjXCI+SG9tZTwvYT48L2xpPlxcXHJcblx0XHQgIDxsaSBjbGFzcz1cImJyZWFkY3J1bWItaXRlbSBhY3RpdmVcIj48YSBocmVmPVwiI1wiPkxpYnJhcnk8L2E+PC9saT5cXFxyXG5cdFx0ICA8bGkgY2xhc3M9XCJicmVhZGNydW1iLWl0ZW0gYWN0aXZlXCI+RGF0YSAzPC9saT5cXFxyXG5cdFx0PC9vbD4nXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBicmVhZGNydW1iczsiLCJpbXBvcnQgeyBUb2dnbGVJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgYnJlYWRjcnVtYml0ZW0gPSB7XHJcbiAgICBjbGFzc2VzOiBbXCJicmVhZGNydW1iLWl0ZW1cIl0sXHJcbiAgICBuYW1lOiBcIkJyZWFkY3J1bWIgSXRlbVwiLFxyXG4gICAgaHRtbDogJzxsaSBjbGFzcz1cImJyZWFkY3J1bWItaXRlbVwiPjxhIGhyZWY9XCIjXCI+TGlicmFyeTwvYT48L2xpPicsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiQWN0aXZlXCIsXHJcbiAgICAgICAga2V5OiBcImFjdGl2ZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcIlwiLCBcImFjdGl2ZVwiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb246IFwiYWN0aXZlXCIsXHJcbiAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJyZWFkY3J1bWJpdGVtOyIsImltcG9ydCB7IFNlbGVjdElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBiYWRnZSA9IHtcclxuICAgIGNsYXNzZXM6IFtcImJhZGdlXCJdLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvYmFkZ2Uuc3ZnXCIsXHJcbiAgICBuYW1lOiBcIkJhZGdlXCIsXHJcbiAgICBodG1sOiAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1wcmltYXJ5XCI+UHJpbWFyeSBiYWRnZTwvc3Bhbj4nLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIkNvbG9yXCIsXHJcbiAgICAgICAga2V5OiBcImNvbG9yXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiYmFkZ2UtcHJpbWFyeVwiLCBcImJhZGdlLXNlY29uZGFyeVwiLCBcImJhZGdlLXN1Y2Nlc3NcIiwgXCJiYWRnZS1kYW5nZXJcIiwgXCJiYWRnZS13YXJuaW5nXCIsIFwiYmFkZ2UtaW5mb1wiLCBcImJhZGdlLWxpZ2h0XCIsIFwiYmFkZ2UtZGFya1wiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYmFkZ2UtcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJQcmltYXJ5XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYmFkZ2Utc2Vjb25kYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlNlY29uZGFyeVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJhZGdlLXN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU3VjY2Vzc1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJhZGdlLXdhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiV2FybmluZ1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJhZGdlLWRhbmdlclwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEYW5nZXJcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJiYWRnZS1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm9cIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJiYWRnZS1saWdodFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMaWdodFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJhZGdlLWRhcmtcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGFya1wiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJhZGdlOyIsImltcG9ydCB7IFNlbGVjdElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBhbGVydCA9IHtcclxuICAgIGNsYXNzZXM6IFtcImFsZXJ0XCJdLFxyXG4gICAgbmFtZTogXCJBbGVydFwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvYWxlcnQuc3ZnXCIsXHJcbiAgICBodG1sOiAnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXdhcm5pbmcgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+XFxcclxuXHRcdCAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XFxcclxuXHRcdFx0PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cXFxyXG5cdFx0ICA8L2J1dHRvbj5cXFxyXG5cdFx0ICA8c3Ryb25nPkhvbHkgZ3VhY2Ftb2xlITwvc3Ryb25nPiBZb3Ugc2hvdWxkIGNoZWNrIGluIG9uIHNvbWUgb2YgdGhvc2UgZmllbGRzIGJlbG93LlxcXHJcblx0XHQ8L2Rpdj4nLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIlR5cGVcIixcclxuICAgICAgICBrZXk6IFwidHlwZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImFsZXJ0LXByaW1hcnlcIiwgXCJhbGVydC1zZWNvbmRhcnlcIiwgXCJhbGVydC1zdWNjZXNzXCIsIFwiYWxlcnQtZGFuZ2VyXCIsIFwiYWxlcnQtd2FybmluZ1wiLCBcImFsZXJ0LWluZm9cIiwgXCJhbGVydC1saWdodFwiLCBcImFsZXJ0LWRhcmtcIl0sXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJhbGVydC1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJhbGVydC1zZWNvbmRhcnlcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU2Vjb25kYXJ5XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYWxlcnQtc3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTdWNjZXNzXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYWxlcnQtZGFuZ2VyXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhbmdlclwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImFsZXJ0LXdhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiV2FybmluZ1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImFsZXJ0LWluZm9cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImFsZXJ0LWxpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpZ2h0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYWxlcnQtZGFya1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEYXJrXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWxlcnQ7Il19
