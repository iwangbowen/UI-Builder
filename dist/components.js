require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({59:[function(require,module,exports){
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

_builder2.default.ComponentsGroup['定制组件'] = ['html/labeldiv@oee', _oee_ids.buttonid, 'html/textinput@oee', 'html/calendar@oee', _oee_ids.autoselectinputid, _oee_ids.manualselectinputid, 'html/radiobutton@oee', 'html/checkbox@oee', 'html/table@oee', _oee_ids.commontableid];

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
_builder2.default.Components.extend('_base', _oee_ids.commontableid, _oee.commontable);

},{"./builder":58,"./components/@general/components":69,"./components/@oee/components":110,"./components/@oee/ids":119,"./components/border":144,"./components/display":146,"./components/element":147,"./components/margin":149,"./components/padding":150,"./components/size":151,"./components/typography":152}],152:[function(require,module,exports){
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

},{"../inputs/inputs":177,"./common":145}],151:[function(require,module,exports){
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

},{"../inputs/inputs":177,"./common":145}],150:[function(require,module,exports){
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

},{"../inputs/inputs":177,"./common":145}],149:[function(require,module,exports){
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

},{"../inputs/inputs":177,"./common":145}],147:[function(require,module,exports){
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

},{"../inputs/inputs":177,"./common":145}],146:[function(require,module,exports){
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

},{"../inputs/inputs":177,"./common":145}],144:[function(require,module,exports){
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

},{"../inputs/inputs":177,"./common":145}],110:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.commontable = exports.manualselectinput = exports.autoselectinput = exports.text = exports.calendar = exports.span = exports.labeldiv = exports.textareainput = exports.tablerow = exports.tablehead = exports.tablecell = exports.tablebody = exports.table = exports.tableheadercell = exports.selectinput = exports.radiobutton = exports.progress = exports.pagination = exports.pageitem = exports.navbar = exports.listitem = exports.listgroup = exports.link = exports.jumbotron = exports.image = exports.hr = exports.heading = exports.gridrow = exports.gridcolumn = exports.form = exports.fileinput = exports.checkbox = exports.card = exports.buttontoolbar = exports.buttongroup = exports.breadcrumbs = exports.breadcrumbitem = exports.badge = exports.alert = exports.container = exports.div = exports.button = exports.textinput = exports.label = undefined;

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

var _commontable = require('./commontable');

var _commontable2 = _interopRequireDefault(_commontable);

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
exports.commontable = _commontable2.default;

},{"./alert":98,"./autoselectinput":99,"./badge":100,"./breadcrumbitem":101,"./breadcrumbs":102,"./button":103,"./buttongroup":104,"./buttontoolbar":105,"./calendar":106,"./card":107,"./checkbox":108,"./commontable":109,"./container":111,"./div":112,"./fileinput":113,"./form":114,"./gridcolumn":115,"./gridrow":116,"./heading":117,"./hr":118,"./image":120,"./jumbotron":121,"./label":122,"./labeldiv":123,"./link":124,"./listgroup":125,"./listitem":126,"./manualselectinput":127,"./navbar":128,"./pageitem":129,"./pagination":130,"./progress":131,"./radiobutton":132,"./selectinput":133,"./span":134,"./table":135,"./tablebody":136,"./tablecell":137,"./tablehead":138,"./tableheadercell":139,"./tablerow":140,"./text":141,"./textareainput":142,"./textinput":143}],143:[function(require,module,exports){
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
        name: 'Onchange',
        key: 'onchange',
        htmlAttr: 'onchange',
        inputtype: _inputs.TextInput
    }, {
        name: 'Maxlength',
        key: 'maxlength',
        htmlAttr: 'maxlength',
        inputtype: _inputs.NumberInput
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
        name: 'Type',
        key: 'type',
        htmlAttr: 'type',
        inputtype: _inputs.SelectInput,
        data: {
            options: _inputTypes.inputTypes
        }
    }, {
        name: "Readonly",
        key: "readonly",
        htmlAttr: 'readonly',
        validValues: ["readonly"],
        noValueAttr: true,
        inputtype: _inputs.ToggleInput,
        data: {
            on: 'readonly',
            off: ''
        }
    }]
};

exports.default = textinput;

},{"../../inputs/inputs":177,"../common":145,"../inputTypes":148}],142:[function(require,module,exports){
arguments[4][96][0].apply(exports,arguments)
},{"dup":96}],141:[function(require,module,exports){
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

},{"../../inputs/inputs":177}],140:[function(require,module,exports){
arguments[4][95][0].apply(exports,arguments)
},{"../../inputs/inputs":177,"dup":95}],139:[function(require,module,exports){
arguments[4][94][0].apply(exports,arguments)
},{"dup":94}],138:[function(require,module,exports){
arguments[4][93][0].apply(exports,arguments)
},{"../../inputs/inputs":177,"dup":93}],137:[function(require,module,exports){
arguments[4][92][0].apply(exports,arguments)
},{"dup":92}],136:[function(require,module,exports){
arguments[4][91][0].apply(exports,arguments)
},{"dup":91}],134:[function(require,module,exports){
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

},{"../../inputs/inputs":177}],133:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _builder = require('../../builder');

var _builder2 = _interopRequireDefault(_builder);

var _inputs = require('../../inputs/inputs');

var _jquery = require('../../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectinput = {
    nodes: ["select"],
    name: "Select Input",
    image: "icons/select_input.svg",
    html: '<div class="everyOutbox-right draggable">\n            <div class="btn-group">\n                <div class="dailyBox">\n                    <select class="form-control" lustyle="height: 2.8rem;width:13rem">\n                        <option value="value1">Text 1</option>\n                        <option value="value2">Text 2</option>\n                        <option value="value3">Text 3</option>\n                    </select>\n                </div>\n            </div>\n           </div>\n    ',
    beforeInit: function beforeInit(node) {
        properties = [];
        var i = 0;

        (0, _jquery2.default)(node).find('option').each(function () {

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

                    option = (0, _jquery2.default)(this.optionNode);

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
            (0, _jquery2.default)(node).append('<option value="value">Text</option>');

            //render component properties again to include the new column inputs
            _builder2.default.Components.render("html/selectinput");

            return node;
        }
    }]
};

exports.default = selectinput;

},{"../../../js/jquery.min":1,"../../builder":58,"../../inputs/inputs":177}],132:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../../inputs/inputs');

var _common = require('../common');

var radiobutton = {
    name: "Radio Button",
    attributes: { "type": "radio" },
    image: "icons/radio.svg",
    html: '<div ' + _common.dataComponentId + '="html/radiobutton@oee" class="everyOutbox-right draggable">\n            <div style="display:inline;"><input class="radioInput" type="radio" value="" /><span ' + _common.dataComponentId + '="html/span@oee">\u5355\u90091</span></div>\n           </div>',
    properties: [{
        name: 'Onclick',
        key: 'onclick',
        htmlAttr: 'onclick',
        inputtype: _inputs.TextInput
    }, {
        name: "Value",
        key: "value",
        htmlAttr: "value",
        inputtype: _inputs.TextInput
    }, {
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: _inputs.TextInput
    }]
};

exports.default = radiobutton;

},{"../../inputs/inputs":177,"../common":145}],131:[function(require,module,exports){
arguments[4][87][0].apply(exports,arguments)
},{"../../inputs/inputs":177,"../common":145,"dup":87}],130:[function(require,module,exports){
arguments[4][86][0].apply(exports,arguments)
},{"../../inputs/inputs":177,"dup":86}],129:[function(require,module,exports){
arguments[4][85][0].apply(exports,arguments)
},{"../../inputs/inputs":177,"dup":85}],128:[function(require,module,exports){
arguments[4][84][0].apply(exports,arguments)
},{"../../inputs/inputs":177,"../common":145,"dup":84}],127:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _builder = require('../../builder');

var _builder2 = _interopRequireDefault(_builder);

var _inputs = require('../../inputs/inputs');

var _ids = require('./ids');

var _common = require('../common');

var _jquery = require('../../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var autoselectinput = {
    nodes: ["select"],
    name: "Manual Select Input",
    image: "icons/select_input.svg",
    html: '<div class="everyOutbox-right draggable">\n            <div class="btn-group">\n                <div class="dailyBox">\n                    <select ' + _common.dataComponentId + '="' + _ids.manualselectinputid + '" class="form-control fundodooSelect" lustyle="height:2.8rem;width:13rem">\n                        <option value="value1">Text 1</option>\n                        <option value="value2">Text 2</option>\n                        <option value="value3">Text 3</option>\n                    </select>\n                </div>\n            </div>\n           </div>\n    ',
    beforeInit: function beforeInit(node) {
        properties = [];
        var i = 0;

        (0, _jquery2.default)(node).find('option').each(function () {

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

                    option = (0, _jquery2.default)(this.optionNode);

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
            (0, _jquery2.default)(node).append('<option value="value">Text</option>');
            //render component properties again to include the new column inputs
            _builder2.default.Components.render(_ids.manualselectinputid);
            return node;
        }
    }, {
        name: 'Onchange',
        key: 'onchange',
        htmlAttr: 'onchange',
        inputtype: _inputs.TextInput
    }, {
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: _inputs.TextInput
    }]
};

exports.default = autoselectinput;

},{"../../../js/jquery.min":1,"../../builder":58,"../../inputs/inputs":177,"../common":145,"./ids":119}],126:[function(require,module,exports){
arguments[4][83][0].apply(exports,arguments)
},{"dup":83}],125:[function(require,module,exports){
arguments[4][82][0].apply(exports,arguments)
},{"dup":82}],124:[function(require,module,exports){
arguments[4][81][0].apply(exports,arguments)
},{"../../inputs/inputs":177,"dup":81}],123:[function(require,module,exports){
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

},{"../common":145}],122:[function(require,module,exports){
arguments[4][80][0].apply(exports,arguments)
},{"../../inputs/inputs":177,"dup":80}],121:[function(require,module,exports){
arguments[4][79][0].apply(exports,arguments)
},{"dup":79}],120:[function(require,module,exports){
arguments[4][78][0].apply(exports,arguments)
},{"../../builder":58,"../../inputs/inputs":177,"dup":78}],118:[function(require,module,exports){
arguments[4][77][0].apply(exports,arguments)
},{"dup":77}],117:[function(require,module,exports){
arguments[4][76][0].apply(exports,arguments)
},{"../../inputs/inputs":177,"../common":145,"dup":76}],116:[function(require,module,exports){
arguments[4][75][0].apply(exports,arguments)
},{"../../../js/jquery.min":1,"../../inputs/inputs":177,"dup":75}],115:[function(require,module,exports){
arguments[4][74][0].apply(exports,arguments)
},{"../../../js/jquery.min":1,"../../inputs/inputs":177,"dup":74}],114:[function(require,module,exports){
arguments[4][73][0].apply(exports,arguments)
},{"../../inputs/inputs":177,"dup":73}],113:[function(require,module,exports){
arguments[4][72][0].apply(exports,arguments)
},{"dup":72}],112:[function(require,module,exports){
arguments[4][71][0].apply(exports,arguments)
},{"../../inputs/inputs":177,"../common":145,"dup":71}],111:[function(require,module,exports){
arguments[4][70][0].apply(exports,arguments)
},{"../../inputs/inputs":177,"../common":145,"dup":70}],108:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../../inputs/inputs');

var _common = require('../common');

var checkbox = {
    name: "Checkbox",
    attributes: { "type": "checkbox" },
    image: "icons/checkbox.svg",
    html: '<div class="everyOutbox-right draggable">\n             <div style="display:inline;">\n                <input ' + _common.dataComponentId + '="html/checkbox@oee" type="checkbox" class="checkboxInput"/>\n                <label ' + _common.dataComponentId + '="html/span@oee">\u9009\u98791</label>\n             </div>\n            </div>',
    properties: [{
        name: 'Onclick',
        key: 'onclick',
        htmlAttr: 'onclick',
        inputtype: _inputs.TextInput
    }, {
        name: "Value",
        key: "value",
        htmlAttr: "value",
        inputtype: _inputs.TextInput
    }, {
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: _inputs.TextInput
    }]
};

exports.default = checkbox;

},{"../../inputs/inputs":177,"../common":145}],107:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"dup":67}],106:[function(require,module,exports){
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

},{"../../inputs/inputs":177,"../../util/calendar":184,"../common":145,"../inputTypes":148}],105:[function(require,module,exports){
arguments[4][66][0].apply(exports,arguments)
},{"dup":66}],104:[function(require,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"../../inputs/inputs":177,"dup":65}],103:[function(require,module,exports){
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
    html: '<button ' + _common.dataComponentId + '=' + _ids.buttonid + ' ' + _common.dataButtonId + ' type="button" class="draggable search-btn">\n            <span class="glyphicon glyphicon-search">Search</span>\n           </button>',
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

},{"../../inputs/inputs":177,"../common":145,"./ids":119}],102:[function(require,module,exports){
arguments[4][63][0].apply(exports,arguments)
},{"dup":63}],101:[function(require,module,exports){
arguments[4][62][0].apply(exports,arguments)
},{"../../inputs/inputs":177,"dup":62}],100:[function(require,module,exports){
arguments[4][61][0].apply(exports,arguments)
},{"../../inputs/inputs":177,"dup":61}],99:[function(require,module,exports){
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
    }, {
        name: 'Onchange',
        key: 'onchange',
        htmlAttr: 'onchange',
        inputtype: _inputs.TextInput
    }, {
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: _inputs.TextInput
    }]
};

exports.default = autoselectinput;

},{"../../inputs/inputs":177,"../common":145,"./ids":119}],119:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
var manualselectinputid = 'html/manualselectinput@oee';
var autoselectinputid = 'html/autoselectinput@oee';
var buttonid = 'html/button@oee';
var commontableid = 'html/commontable@oee';

exports.manualselectinputid = manualselectinputid;
exports.autoselectinputid = autoselectinputid;
exports.buttonid = buttonid;
exports.commontableid = commontableid;

},{}],98:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"../../inputs/inputs":177,"dup":60}],69:[function(require,module,exports){
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

},{"./alert":60,"./badge":61,"./breadcrumbitem":62,"./breadcrumbs":63,"./button":64,"./buttongroup":65,"./buttontoolbar":66,"./card":67,"./checkbox":68,"./container":70,"./div":71,"./fileinput":72,"./form":73,"./gridcolumn":74,"./gridrow":75,"./heading":76,"./hr":77,"./image":78,"./jumbotron":79,"./label":80,"./link":81,"./listgroup":82,"./listitem":83,"./navbar":84,"./pageitem":85,"./pagination":86,"./progress":87,"./radiobutton":88,"./selectinput":89,"./table":90,"./tablebody":91,"./tablecell":92,"./tablehead":93,"./tableheadercell":94,"./tablerow":95,"./textareainput":96,"./textinput":97}],97:[function(require,module,exports){
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

},{"../../inputs/inputs":177,"../common":145,"../inputTypes":148}],148:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var textareainput = {
    name: "Text Area",
    image: "icons/text_area.svg",
    html: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>'
};

exports.default = textareainput;

},{}],95:[function(require,module,exports){
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

},{"../../inputs/inputs":177}],94:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var tableheadercell = {
    nodes: ["th"],
    name: "Table Header Cell",
    html: "<th>Head</th>"
};

exports.default = tableheadercell;

},{}],93:[function(require,module,exports){
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

},{"../../inputs/inputs":177}],92:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var tablecell = {
    nodes: ["td"],
    name: "Table Cell",
    html: "<td>Cell</td>"
};

exports.default = tablecell;

},{}],91:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var tablebody = {
    nodes: ["tbody"],
    name: "Table Body",
    html: "<tbody><tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr></tbody>"
};

exports.default = tablebody;

},{}],90:[function(require,module,exports){
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

},{"../../inputs/inputs":177}],89:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _builder = require('../../builder');

var _builder2 = _interopRequireDefault(_builder);

var _inputs = require('../../inputs/inputs');

var _jquery = require('../../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectinput = {
    nodes: ["select"],
    name: "Select Input",
    image: "icons/select_input.svg",
    html: '<div class="form-group" style="display: inline-block;"><label>Choose an option </label><select class="form-control"><option value="value1">Text 1</option><option value="value2">Text 2</option><option value="value3">Text 3</option></select></div>',

    beforeInit: function beforeInit(node) {
        properties = [];
        var i = 0;

        (0, _jquery2.default)(node).find('option').each(function () {

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

                    option = (0, _jquery2.default)(this.optionNode);

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
            (0, _jquery2.default)(node).append('<option value="value">Text</option>');

            //render component properties again to include the new column inputs
            _builder2.default.Components.render("html/selectinput@general");

            return node;
        }
    }]
};

exports.default = selectinput;

},{"../../../js/jquery.min":1,"../../builder":58,"../../inputs/inputs":177}],88:[function(require,module,exports){
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
    }, {
        name: "Value",
        key: "value",
        htmlAttr: "value",
        inputtype: _inputs.TextInput
    }]
};

exports.default = radiobutton;

},{"../../inputs/inputs":177,"../common":145}],87:[function(require,module,exports){
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

},{"../../inputs/inputs":177,"../common":145}],86:[function(require,module,exports){
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

},{"../../inputs/inputs":177}],85:[function(require,module,exports){
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

},{"../../inputs/inputs":177}],84:[function(require,module,exports){
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

},{"../../inputs/inputs":177,"../common":145}],83:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var listitem = {
    name: "List Item",
    classes: ["list-group-item"],
    html: '<li class="list-group-item"><span class="badge">14</span> Cras justo odio</li>'
};

exports.default = listitem;

},{}],82:[function(require,module,exports){
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

},{}],81:[function(require,module,exports){
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

},{"../../inputs/inputs":177}],80:[function(require,module,exports){
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

},{"../../inputs/inputs":177}],79:[function(require,module,exports){
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

},{}],78:[function(require,module,exports){
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

},{"../../builder":58,"../../inputs/inputs":177}],77:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
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

},{"../../inputs/inputs":177,"../common":145}],75:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../../inputs/inputs');

var _jquery = require('../../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gridrow = {
    name: "Grid Row",
    image: "icons/grid_row.svg",
    classes: ["row"],
    html: '<div class="row"><div class="col-sm-4"><h3>col-sm-4</h3></div><div class="col-sm-4 col-5"><h3>col-sm-4</h3></div><div class="col-sm-4"><h3>col-sm-4</h3></div></div>',

    beforeInit: function beforeInit(node) {
        properties = [];
        var i = 0;
        var j = 0;

        (0, _jquery2.default)(node).find('[class*="col-"]').each(function () {
            _class = (0, _jquery2.default)(this).attr("class");

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
                    column = (0, _jquery2.default)(this.columnNode);

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
            (0, _jquery2.default)(node).append('<div class="col-3">Col-3</div>');

            //render component properties again to include the new column inputs
            Vvveb.Components.render("html/gridrow");

            return node;
        }
    }]
};

exports.default = gridrow;

},{"../../../js/jquery.min":1,"../../inputs/inputs":177}],74:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputs = require('../../inputs/inputs');

var _jquery = require('../../../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            _class = (0, _jquery2.default)(node).attr("class");

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

},{"../../../js/jquery.min":1,"../../inputs/inputs":177}],73:[function(require,module,exports){
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

},{"../../inputs/inputs":177}],72:[function(require,module,exports){
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

},{}],71:[function(require,module,exports){
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

},{"../../inputs/inputs":177,"../common":145}],70:[function(require,module,exports){
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

},{"../../inputs/inputs":177,"../common":145}],68:[function(require,module,exports){
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
    }, {
        name: "Value",
        key: "value",
        htmlAttr: "value",
        inputtype: _inputs.TextInput
    }]
};

exports.default = checkbox;

},{"../../inputs/inputs":177}],67:[function(require,module,exports){
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

},{}],66:[function(require,module,exports){
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

},{}],65:[function(require,module,exports){
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

},{"../../inputs/inputs":177}],64:[function(require,module,exports){
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

},{"../../inputs/inputs":177}],63:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
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

},{"../../inputs/inputs":177}],61:[function(require,module,exports){
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

},{"../../inputs/inputs":177}],60:[function(require,module,exports){
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

},{"../../inputs/inputs":177}]},{},[59])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGNvbXBvbmVudHMuanMiLCJzcmNcXGNvbXBvbmVudHNcXHR5cG9ncmFwaHkuanMiLCJzcmNcXGNvbXBvbmVudHNcXHNpemUuanMiLCJzcmNcXGNvbXBvbmVudHNcXHBhZGRpbmcuanMiLCJzcmNcXGNvbXBvbmVudHNcXG1hcmdpbi5qcyIsInNyY1xcY29tcG9uZW50c1xcZWxlbWVudC5qcyIsInNyY1xcY29tcG9uZW50c1xcZGlzcGxheS5qcyIsInNyY1xcY29tcG9uZW50c1xcYm9yZGVyLmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxjb21wb25lbnRzLmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFx0ZXh0aW5wdXQuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXHRleHQuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXHNwYW4uanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXHNlbGVjdGlucHV0LmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxyYWRpb2J1dHRvbi5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcbWFudWFsc2VsZWN0aW5wdXQuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGxhYmVsZGl2LmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxjaGVja2JveC5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcY2FsZW5kYXIuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBvZWVcXGJ1dHRvbi5qcyIsInNyY1xcY29tcG9uZW50c1xcQG9lZVxcYXV0b3NlbGVjdGlucHV0LmpzIiwic3JjXFxjb21wb25lbnRzXFxAb2VlXFxpZHMuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxjb21wb25lbnRzLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGV4dGlucHV0LmpzIiwic3JjXFxjb21wb25lbnRzXFxpbnB1dFR5cGVzLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGV4dGFyZWFpbnB1dC5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXHRhYmxlcm93LmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGFibGVoZWFkZXJjZWxsLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGFibGVoZWFkLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGFibGVjZWxsLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGFibGVib2R5LmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcdGFibGUuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxzZWxlY3RpbnB1dC5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXHJhZGlvYnV0dG9uLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxccHJvZ3Jlc3MuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxwYWdpbmF0aW9uLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxccGFnZWl0ZW0uanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxuYXZiYXIuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxsaXN0aXRlbS5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGxpc3Rncm91cC5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGxpbmsuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxsYWJlbC5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGp1bWJvdHJvbi5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGltYWdlLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcaHIuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxoZWFkaW5nLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcZ3JpZHJvdy5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGdyaWRjb2x1bW4uanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxmb3JtLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcZmlsZWlucHV0LmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcZGl2LmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcY29udGFpbmVyLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcY2hlY2tib3guanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxjYXJkLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcYnV0dG9udG9vbGJhci5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGJ1dHRvbmdyb3VwLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcYnV0dG9uLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcYnJlYWRjcnVtYnMuanMiLCJzcmNcXGNvbXBvbmVudHNcXEBnZW5lcmFsXFxicmVhZGNydW1iaXRlbS5qcyIsInNyY1xcY29tcG9uZW50c1xcQGdlbmVyYWxcXGJhZGdlLmpzIiwic3JjXFxjb21wb25lbnRzXFxAZ2VuZXJhbFxcYWxlcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7OztBQUNBOztJQUFZLFE7O0FBQ1o7O0lBQVksSTs7QUFDWjs7SUFBWSxROztBQUNaOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLGtCQUFNLGVBQU4sQ0FBc0IsTUFBdEIsSUFDSSxDQUFDLG1CQUFELEVBQXNCLFNBQVMsUUFBL0IsRUFBeUMsb0JBQXpDLEVBQStELG1CQUEvRCxFQUFvRixTQUFTLGlCQUE3RixFQUFnSCxTQUFTLG1CQUF6SCxFQUNJLHNCQURKLEVBQzRCLG1CQUQ1QixFQUNpRCxn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dXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFZ2dmViIGZyb20gJy4vYnVpbGRlcic7XHJcbmltcG9ydCAqIGFzIF9nZW5lcmFsIGZyb20gJy4vY29tcG9uZW50cy9AZ2VuZXJhbC9jb21wb25lbnRzJztcclxuaW1wb3J0ICogYXMgX29lZSBmcm9tICcuL2NvbXBvbmVudHMvQG9lZS9jb21wb25lbnRzJztcclxuaW1wb3J0ICogYXMgX29lZV9pZHMgZnJvbSAnLi9jb21wb25lbnRzL0BvZWUvaWRzJztcclxuaW1wb3J0IGVsZW1lbnQgZnJvbSAnLi9jb21wb25lbnRzL2VsZW1lbnQnO1xyXG5pbXBvcnQgYm9yZGVyIGZyb20gJy4vY29tcG9uZW50cy9ib3JkZXInO1xyXG5pbXBvcnQgcGFkZGluZyBmcm9tICcuL2NvbXBvbmVudHMvcGFkZGluZyc7XHJcbmltcG9ydCBkaXNwbGF5IGZyb20gJy4vY29tcG9uZW50cy9kaXNwbGF5JztcclxuaW1wb3J0IHR5cG9ncmFwaHkgZnJvbSAnLi9jb21wb25lbnRzL3R5cG9ncmFwaHknO1xyXG5pbXBvcnQgc2l6ZSBmcm9tICcuL2NvbXBvbmVudHMvc2l6ZSc7XHJcbmltcG9ydCBtYXJnaW4gZnJvbSAnLi9jb21wb25lbnRzL21hcmdpbic7XHJcblxyXG5WdnZlYi5Db21wb25lbnRzR3JvdXBbJ+WumuWItue7hOS7tiddID1cclxuICAgIFsnaHRtbC9sYWJlbGRpdkBvZWUnLCBfb2VlX2lkcy5idXR0b25pZCwgJ2h0bWwvdGV4dGlucHV0QG9lZScsICdodG1sL2NhbGVuZGFyQG9lZScsIF9vZWVfaWRzLmF1dG9zZWxlY3RpbnB1dGlkLCBfb2VlX2lkcy5tYW51YWxzZWxlY3RpbnB1dGlkLFxyXG4gICAgICAgICdodG1sL3JhZGlvYnV0dG9uQG9lZScsICdodG1sL2NoZWNrYm94QG9lZScsICdodG1sL3RhYmxlQG9lZScsIF9vZWVfaWRzLmNvbW1vbnRhYmxlaWRdO1xyXG5cclxuVnZ2ZWIuQ29tcG9uZW50c0dyb3VwWyfpgJrnlKjnu4Tku7YnXSA9XHJcbiAgICBbJ2h0bWwvbGFiZWxAZ2VuZXJhbCcsICdodG1sL2RpdkBnZW5lcmFsJywgJ2h0bWwvYnV0dG9uQGdlbmVyYWwnLCAnaHRtbC9idXR0b25ncm91cEBnZW5lcmFsJyxcclxuICAgICAgICAnaHRtbC9idXR0b250b29sYmFyQGdlbmVyYWwnLCAnaHRtbC9mb3JtQGdlbmVyYWwnLCAnaHRtbC90ZXh0aW5wdXRAZ2VuZXJhbCcsICdodG1sL3RleHRhcmVhaW5wdXRAZ2VuZXJhbCcsXHJcbiAgICAgICAgJ2h0bWwvc2VsZWN0aW5wdXRAZ2VuZXJhbCcsICdodG1sL2ZpbGVpbnB1dEBnZW5lcmFsJywgJ2h0bWwvY2hlY2tib3hAZ2VuZXJhbCcsICdodG1sL3JhZGlvYnV0dG9uQGdlbmVyYWwnLFxyXG4gICAgICAgICdodG1sL3RhYmxlQGdlbmVyYWwnLCAnaHRtbC9oZWFkaW5nQGdlbmVyYWwnLCAnaHRtbC9pbWFnZUBnZW5lcmFsJywgJ2h0bWwvanVtYm90cm9uQGdlbmVyYWwnLFxyXG4gICAgICAgICdodG1sL2FsZXJ0QGdlbmVyYWwnLCAnaHRtbC9jYXJkQGdlbmVyYWwnLCAnaHRtbC9saXN0Z3JvdXBAZ2VuZXJhbCcsICdodG1sL2hyQGdlbmVyYWwnLCAnaHRtbC90YWdsYWJlbEBnZW5lcmFsJyxcclxuICAgICAgICAnaHRtbC9iYWRnZUBnZW5lcmFsJywgJ2h0bWwvcHJvZ3Jlc3NAZ2VuZXJhbCcsICdodG1sL25hdmJhckBnZW5lcmFsJywgJ2h0bWwvYnJlYWRjcnVtYnNAZ2VuZXJhbCcsICdodG1sL3BhZ2luYXRpb25AZ2VuZXJhbCcsXHJcbiAgICAgICAgJ2h0bWwvY29udGFpbmVyQGdlbmVyYWwnLCAnaHRtbC9ncmlkcm93QGdlbmVyYWwnXTtcclxuXHJcblZ2dmViLkNvbXBvbmVudHMuYWRkKFwiX2Jhc2VcIiwgZWxlbWVudCk7XHJcbi8vZGlzcGxheVxyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiX2Jhc2VcIiwgZGlzcGxheSk7XHJcbi8vVHlwb2dyYXBoeVxyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiX2Jhc2VcIiwgdHlwb2dyYXBoeSlcclxuLy9TaXplXHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJfYmFzZVwiLCBzaXplKTtcclxuLy9NYXJnaW5cclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcIl9iYXNlXCIsIG1hcmdpbik7XHJcbi8vUGFkZGluZ1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiX2Jhc2VcIiwgcGFkZGluZyk7XHJcbi8vQm9yZGVyXHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJfYmFzZVwiLCBib3JkZXIpO1xyXG5cclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvZGl2QGdlbmVyYWxcIiwgX2dlbmVyYWwuZGl2KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvbGFiZWxAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5sYWJlbCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2J1dHRvbkBnZW5lcmFsXCIsIF9nZW5lcmFsLmJ1dHRvbik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2NvbnRhaW5lckBnZW5lcmFsXCIsIF9nZW5lcmFsLmNvbnRhaW5lcik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2hlYWRpbmdAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5oZWFkaW5nKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvbGlua0BnZW5lcmFsXCIsIF9nZW5lcmFsLmxpbmspO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9pbWFnZUBnZW5lcmFsXCIsIF9nZW5lcmFsLmltYWdlKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5hZGQoXCJodG1sL2hyQGdlbmVyYWxcIiwgX2dlbmVyYWwuaHIpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9idXR0b25ncm91cEBnZW5lcmFsXCIsIF9nZW5lcmFsLmJ1dHRvbmdyb3VwKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvYnV0dG9udG9vbGJhckBnZW5lcmFsXCIsIF9nZW5lcmFsLmJ1dHRvbnRvb2xiYXIpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9hbGVydEBnZW5lcmFsXCIsIF9nZW5lcmFsLmFsZXJ0KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvYmFkZ2VAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5iYWRnZSk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2NhcmRAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5jYXJkKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvbGlzdGdyb3VwQGdlbmVyYWxcIiwgX2dlbmVyYWwubGlzdGdyb3VwKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvbGlzdGl0ZW1AZ2VuZXJhbFwiLCBfZ2VuZXJhbC5saXN0aXRlbSk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2JyZWFkY3J1bWJzQGdlbmVyYWxcIiwgX2dlbmVyYWwuYnJlYWRjcnVtYnMpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9icmVhZGNydW1iaXRlbUBnZW5lcmFsXCIsIF9nZW5lcmFsLmJyZWFkY3J1bWJpdGVtKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvcGFnaW5hdGlvbkBnZW5lcmFsXCIsIF9nZW5lcmFsLnBhZ2luYXRpb24pO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9wYWdlaXRlbUBnZW5lcmFsXCIsIF9nZW5lcmFsLnBhZ2VpdGVtKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvcHJvZ3Jlc3NAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5wcm9ncmVzcyk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2p1bWJvdHJvbkBnZW5lcmFsXCIsIF9nZW5lcmFsLmp1bWJvdHJvbik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL25hdmJhckBnZW5lcmFsXCIsIF9nZW5lcmFsLm5hdmJhcik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2Zvcm1AZ2VuZXJhbFwiLCBfZ2VuZXJhbC5mb3JtKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvdGV4dGlucHV0QGdlbmVyYWxcIiwgX2dlbmVyYWwudGV4dGlucHV0KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvc2VsZWN0aW5wdXRAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5zZWxlY3RpbnB1dCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL3RleHRhcmVhaW5wdXRAZ2VuZXJhbFwiLCBfZ2VuZXJhbC50ZXh0YXJlYWlucHV0KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvcmFkaW9idXR0b25AZ2VuZXJhbFwiLCBfZ2VuZXJhbC5yYWRpb2J1dHRvbik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL2NoZWNrYm94QGdlbmVyYWxcIiwgX2dlbmVyYWwuY2hlY2tib3gpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC9maWxlaW5wdXRAZ2VuZXJhbFwiLCBfZ2VuZXJhbC5maWxlaW5wdXQpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZChcIl9iYXNlXCIsIFwiaHRtbC90YWJsZUBnZW5lcmFsXCIsIF9nZW5lcmFsLnRhYmxlKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoXCJfYmFzZVwiLCBcImh0bWwvdGFibGVyb3dAZ2VuZXJhbFwiLCBfZ2VuZXJhbC50YWJsZXJvdyk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL3RhYmxlY2VsbEBnZW5lcmFsXCIsIF9nZW5lcmFsLnRhYmxlY2VsbCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL3RhYmxlaGVhZGVyY2VsbEBnZW5lcmFsXCIsIF9nZW5lcmFsLnRhYmxlaGVhZGVyY2VsbCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL3RhYmxlaGVhZEBnZW5lcmFsXCIsIF9nZW5lcmFsLnRhYmxlaGVhZCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKFwiX2Jhc2VcIiwgXCJodG1sL3RhYmxlYm9keUBnZW5lcmFsXCIsIF9nZW5lcmFsLnRhYmxlYm9keSk7XHJcblZ2dmViLkNvbXBvbmVudHMuYWRkKFwiaHRtbC9ncmlkY29sdW1uQGdlbmVyYWxcIiwgX2dlbmVyYWwuZ3JpZGNvbHVtbik7XHJcblZ2dmViLkNvbXBvbmVudHMuYWRkKFwiaHRtbC9ncmlkcm93QGdlbmVyYWxcIiwgX2dlbmVyYWwuZ3JpZHJvdyk7XHJcblxyXG5WdnZlYi5Db21wb25lbnRzLmFkZCgnaHRtbC9sYWJlbGRpdkBvZWUnLCBfb2VlLmxhYmVsZGl2KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgJ2h0bWwvdGV4dGlucHV0QG9lZScsIF9vZWUudGV4dGlucHV0KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgX29lZV9pZHMuYnV0dG9uaWQsIF9vZWUuYnV0dG9uKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgJ2h0bWwvcmFkaW9idXR0b25Ab2VlJywgX29lZS5yYWRpb2J1dHRvbik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKCdfYmFzZScsICdodG1sL3NwYW5Ab2VlJywgX29lZS5zcGFuKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgJ2h0bWwvY2hlY2tib3hAb2VlJywgX29lZS5jaGVja2JveCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKCdfYmFzZScsICdodG1sL3NlbGVjdGlucHV0QG9lZScsIF9vZWUuc2VsZWN0aW5wdXQpO1xyXG5WdnZlYi5Db21wb25lbnRzLmV4dGVuZCgnX2Jhc2UnLCAnaHRtbC90YWJsZUBvZWUnLCBfb2VlLnRhYmxlKTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgJ2h0bWwvY2FsZW5kYXJAb2VlJywgX29lZS5jYWxlbmRhcik7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKCdfYmFzZScsICdodG1sL3RleHRAb2VlJywgX29lZS50ZXh0KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgX29lZV9pZHMuYXV0b3NlbGVjdGlucHV0aWQsIF9vZWUuYXV0b3NlbGVjdGlucHV0KTtcclxuVnZ2ZWIuQ29tcG9uZW50cy5leHRlbmQoJ19iYXNlJywgX29lZV9pZHMubWFudWFsc2VsZWN0aW5wdXRpZCwgX29lZS5tYW51YWxzZWxlY3RpbnB1dCk7XHJcblZ2dmViLkNvbXBvbmVudHMuZXh0ZW5kKCdfYmFzZScsIF9vZWVfaWRzLmNvbW1vbnRhYmxlaWQsIF9vZWUuY29tbW9udGFibGUpO1xyXG5cclxuIiwiaW1wb3J0IHsgU2VjdGlvbklucHV0LCBTZWxlY3RJbnB1dCwgUmFkaW9CdXR0b25JbnB1dCwgQ3NzVW5pdElucHV0LCBDb2xvcklucHV0IH0gZnJvbSAnLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGluY19iYXNlX3NvcnQgfSBmcm9tICcuL2NvbW1vbic7XHJcblxyXG5jb25zdCB0eXBvZ3JhcGh5ID0ge1xyXG4gICAgcHJvcGVydGllczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAga2V5OiBcInR5cG9ncmFwaHlfaGVhZGVyXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VjdGlvbklucHV0LFxyXG4gICAgICAgICAgICBuYW1lOiBmYWxzZSxcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBkYXRhOiB7IGhlYWRlcjogXCJUeXBvZ3JhcGh5XCIgfSxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiRm9udCBmYW1pbHlcIixcclxuICAgICAgICAgICAga2V5OiBcImZvbnQtZmFtaWx5XCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiA2LFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJBcmlhbFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdMdWNpZGEgU2FucyBVbmljb2RlXCIsIFwiTHVjaWRhIEdyYW5kZVwiLCBzYW5zLXNlcmlmJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnTHVjaWRhIEdyYW5kZSdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1BhbGF0aW5vIExpbm90eXBlXCIsIFwiQm9vayBBbnRpcXVhXCIsIFBhbGF0aW5vLCBzZXJpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1BhbGF0aW5vIExpbm90eXBlJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnXCJUaW1lcyBOZXcgUm9tYW5cIiwgVGltZXMsIHNlcmlmJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnVGltZXMgTmV3IFJvbWFuJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkdlb3JnaWEsIHNlcmlmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJHZW9yZ2lhLCBzZXJpZlwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiVGFob21hLCBHZW5ldmEsIHNhbnMtc2VyaWZcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlRhaG9tYVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdDb21pYyBTYW5zIE1TLCBjdXJzaXZlLCBzYW5zLXNlcmlmJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQ29taWMgU2FucydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1ZlcmRhbmEsIEdlbmV2YSwgc2Fucy1zZXJpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1ZlcmRhbmEnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdJbXBhY3QsIENoYXJjb2FsLCBzYW5zLXNlcmlmJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnSW1wYWN0J1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnQXJpYWwgQmxhY2ssIEdhZGdldCwgc2Fucy1zZXJpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0FyaWFsIEJsYWNrJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnVHJlYnVjaGV0IE1TLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdUcmVidWNoZXQnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdDb3VyaWVyIE5ld1wiLCBDb3VyaWVyLCBtb25vc3BhY2UnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdDb3VyaWVyIE5ld1wiLCBDb3VyaWVyLCBtb25vc3BhY2UnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdCcnVzaCBTY3JpcHQgTVQsIHNhbnMtc2VyaWYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdCcnVzaCBTY3JpcHQnXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkZvbnQgd2VpZ2h0XCIsXHJcbiAgICAgICAgICAgIGtleTogXCJmb250LXdlaWdodFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiMTAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJUaGluXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCIyMDBcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkV4dHJhLUxpZ2h0XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCIzMDBcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpZ2h0XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI0MDBcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIk5vcm1hbFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiNTAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJNZWRpdW1cIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjYwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiU2VtaS1Cb2xkXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI3MDBcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkJvbGRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjgwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRXh0cmEtQm9sZFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiOTAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJVbHRyYS1Cb2xkXCJcclxuICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlRleHQgYWxpZ25cIixcclxuICAgICAgICAgICAga2V5OiBcInRleHQtYWxpZ25cIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDEyLFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogUmFkaW9CdXR0b25JbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgZXh0cmFjbGFzczogXCJidG4tZ3JvdXAtc20gYnRuLWdyb3VwLWZ1bGx3aWR0aFwiLFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJub25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJsYSBsYS1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJOb25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwibGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJMZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtYWxpZ24tbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJDZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJDZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWFsaWduLWNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0OiBcIlJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUmlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWFsaWduLXJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwianVzdGlmeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJqdXN0aWZ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiSnVzdGlmeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtYWxpZ24tanVzdGlmeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkxpbmUgaGVpZ2h0XCIsXHJcbiAgICAgICAgICAgIGtleTogXCJsaW5lLWhlaWdodFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJMZXR0ZXIgc3BhY2luZ1wiLFxyXG4gICAgICAgICAgICBrZXk6IFwibGV0dGVyLXNwYWNpbmdcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiVGV4dCBkZWNvcmF0aW9uXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJ0ZXh0LWRlY29yYXRpb24tbGluZVwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogMTIsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBSYWRpb0J1dHRvbklucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBleHRyYWNsYXNzOiBcImJ0bi1ncm91cC1zbSBidG4tZ3JvdXAtZnVsbHdpZHRoXCIsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0OiBcIk5vbmVcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJOb25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ1bmRlcmxpbmVcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwiTGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcInVuZGVybGluZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtbG9uZy1hcnJvdy1kb3duXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwib3ZlcmxpbmVcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwiUmlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJvdmVybGluZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtbG9uZy1hcnJvdy11cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImxpbmUtdGhyb3VnaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJSaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkxpbmUgVGhyb3VnaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtc3RyaWtldGhyb3VnaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInVuZGVybGluZSBvdmVybGluZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dDogXCJqdXN0aWZ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVW5kZXJsaW5lIE92ZXJsaW5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJsYSBsYS1hcnJvd3MtdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkRlY29yYXRpb24gQ29sb3JcIixcclxuICAgICAgICAgICAga2V5OiBcInRleHQtZGVjb3JhdGlvbi1jb2xvclwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENvbG9ySW5wdXQsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkRlY29yYXRpb24gc3R5bGVcIixcclxuICAgICAgICAgICAga2V5OiBcInRleHQtZGVjb3JhdGlvbi1zdHlsZVwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwic29saWRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlNvbGlkXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ3YXZ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJXYXZ5XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJkb3R0ZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkRvdHRlZFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiZGFzaGVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEYXNoZWRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImRvdWJsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRG91YmxlXCJcclxuICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHR5cG9ncmFwaHk7IiwiaW1wb3J0IHsgU2VjdGlvbklucHV0LCBDc3NVbml0SW5wdXQgfSBmcm9tICcuLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgaW5jX2Jhc2Vfc29ydCB9IGZyb20gJy4vY29tbW9uJztcclxuXHJcbmNvbnN0IHNpemUgPSB7XHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIGtleTogXCJzaXplX2hlYWRlclwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VjdGlvbklucHV0LFxyXG4gICAgICAgIG5hbWU6IGZhbHNlLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBkYXRhOiB7IGhlYWRlcjogXCJTaXplXCIsIGV4cGFuZGVkOiBmYWxzZSB9LFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiV2lkdGhcIixcclxuICAgICAgICBrZXk6IFwid2lkdGhcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJIZWlnaHRcIixcclxuICAgICAgICBrZXk6IFwiaGVpZ2h0XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiTWluIFdpZHRoXCIsXHJcbiAgICAgICAga2V5OiBcIm1pbi13aWR0aFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIk1pbiBIZWlnaHRcIixcclxuICAgICAgICBrZXk6IFwibWluLWhlaWdodFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIk1heCBXaWR0aFwiLFxyXG4gICAgICAgIGtleTogXCJtYXgtd2lkdGhcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJNYXggSGVpZ2h0XCIsXHJcbiAgICAgICAga2V5OiBcIm1heC1oZWlnaHRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2l6ZTsiLCJpbXBvcnQgeyBTZWN0aW9uSW5wdXQsIENzc1VuaXRJbnB1dCB9IGZyb20gJy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBpbmNfYmFzZV9zb3J0IH0gZnJvbSAnLi9jb21tb24nO1xyXG5cclxuY29uc3QgcGFkZGluZyA9IHtcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAga2V5OiBcInBhZGRpbmdzX2hlYWRlclwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VjdGlvbklucHV0LFxyXG4gICAgICAgIG5hbWU6IGZhbHNlLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBkYXRhOiB7IGhlYWRlcjogXCJQYWRkaW5nXCIsIGV4cGFuZGVkOiBmYWxzZSB9LFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiVG9wXCIsXHJcbiAgICAgICAga2V5OiBcInBhZGRpbmctdG9wXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiUmlnaHRcIixcclxuICAgICAgICBrZXk6IFwicGFkZGluZy1yaWdodFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkJvdHRvbVwiLFxyXG4gICAgICAgIGtleTogXCJwYWRkaW5nLWJvdHRvbVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkxlZnRcIixcclxuICAgICAgICBrZXk6IFwicGFkZGluZy1MZWZ0XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBhZGRpbmc7IiwiaW1wb3J0IHsgU2VjdGlvbklucHV0LCBDc3NVbml0SW5wdXQgfSBmcm9tICcuLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgaW5jX2Jhc2Vfc29ydCB9IGZyb20gJy4vY29tbW9uJztcclxuXHJcbmNvbnN0IG1hcmdpbiA9IHtcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAga2V5OiBcIm1hcmdpbnNfaGVhZGVyXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWN0aW9uSW5wdXQsXHJcbiAgICAgICAgbmFtZTogZmFsc2UsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGRhdGE6IHsgaGVhZGVyOiBcIk1hcmdpblwiLCBleHBhbmRlZDogZmFsc2UgfSxcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlRvcFwiLFxyXG4gICAgICAgIGtleTogXCJtYXJnaW4tdG9wXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiUmlnaHRcIixcclxuICAgICAgICBrZXk6IFwibWFyZ2luLXJpZ2h0XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiQm90dG9tXCIsXHJcbiAgICAgICAga2V5OiBcIm1hcmdpbi1ib3R0b21cIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJMZWZ0XCIsXHJcbiAgICAgICAga2V5OiBcIm1hcmdpbi1MZWZ0XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgY29sOiA2LFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1hcmdpbjsiLCJpbXBvcnQgeyBTZWN0aW9uSW5wdXQsIFRleHRJbnB1dCB9IGZyb20gJy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBpbmNfYmFzZV9zb3J0IH0gZnJvbSAnLi9jb21tb24nO1xyXG5cclxuY29uc3QgZWxlbWVudCA9IHtcclxuICAgIG5hbWU6IFwiRWxlbWVudFwiLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBrZXk6IFwiZWxlbWVudF9oZWFkZXJcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlY3Rpb25JbnB1dCxcclxuICAgICAgICBuYW1lOiBmYWxzZSxcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgZGF0YTogeyBoZWFkZXI6IFwiR2VuZXJhbFwiIH0sXHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJJZFwiLFxyXG4gICAgICAgIGtleTogXCJpZFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImlkXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkNsYXNzXCIsXHJcbiAgICAgICAga2V5OiBcImNsYXNzXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfVxyXG4gICAgXVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZWxlbWVudDsiLCJpbXBvcnQgeyBpbmNfYmFzZV9zb3J0IH0gZnJvbSAnLi9jb21tb24nO1xyXG5pbXBvcnQgeyBTZWN0aW9uSW5wdXQsIFNlbGVjdElucHV0LCBSYWRpb0J1dHRvbklucHV0LCBDc3NVbml0SW5wdXQsIENvbG9ySW5wdXQsIFJhbmdlSW5wdXQgfSBmcm9tICcuLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGRpc3BsYXkgID0ge1xyXG4gICAgcHJvcGVydGllczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAga2V5OiBcImRpc3BsYXlfaGVhZGVyXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VjdGlvbklucHV0LFxyXG4gICAgICAgICAgICBuYW1lOiBmYWxzZSxcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBkYXRhOiB7IGhlYWRlcjogXCJEaXNwbGF5XCIgfSxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiRGlzcGxheVwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiZGlzcGxheVwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1wiYmxvY2tcIiwgXCJpbmxpbmVcIiwgXCJpbmxpbmUtYmxvY2tcIiwgXCJub25lXCJdLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImJsb2NrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJCbG9ja1wiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiaW5saW5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJJbmxpbmVcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImlubGluZS1ibG9ja1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5saW5lIEJsb2NrXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJub25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJub25lXCJcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiUG9zaXRpb25cIixcclxuICAgICAgICAgICAga2V5OiBcInBvc2l0aW9uXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiA2LFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJzdGF0aWNcIiwgXCJmaXhlZFwiLCBcInJlbGF0aXZlXCIsIFwiYWJzb2x1dGVcIl0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwic3RhdGljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJTdGF0aWNcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImZpeGVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJGaXhlZFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVsYXRpdmVcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlJlbGF0aXZlXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJhYnNvbHV0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQWJzb2x1dGVcIlxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJUb3BcIixcclxuICAgICAgICAgICAga2V5OiBcInRvcFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IFwiXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkxlZnRcIixcclxuICAgICAgICAgICAga2V5OiBcImxlZnRcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgcGFyZW50OiBcIlwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENzc1VuaXRJbnB1dFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJCb3R0b21cIixcclxuICAgICAgICAgICAga2V5OiBcImJvdHRvbVwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IFwiXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlJpZ2h0XCIsXHJcbiAgICAgICAgICAgIGtleTogXCJyaWdodFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogNixcclxuICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IFwiXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ3NzVW5pdElucHV0XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkZsb2F0XCIsXHJcbiAgICAgICAgICAgIGtleTogXCJmbG9hdFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBzb3J0OiBpbmNfYmFzZV9zb3J0KCksXHJcbiAgICAgICAgICAgIGNvbDogMTIsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBSYWRpb0J1dHRvbklucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBleHRyYWNsYXNzOiBcImJ0bi1ncm91cC1zbSBidG4tZ3JvdXAtZnVsbHdpZHRoXCIsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImxhIGxhLWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0OiBcIk5vbmVcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJOb25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJsZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0OiBcIkxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJMZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJsYSBsYS1hbGlnbi1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHQ6IFwiUmlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJSaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibGEgbGEtYWxpZ24tcmlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiBcIk9wYWNpdHlcIixcclxuICAgICAgICAgICAga2V5OiBcIm9wYWNpdHlcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDEyLFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIHBhcmVudDogXCJcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBSYW5nZUlucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBtYXg6IDEsIC8vbWF4IHpvb20gbGV2ZWxcclxuICAgICAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgICAgIHN0ZXA6IDAuMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogXCJCYWNrZ3JvdW5kIENvbG9yXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJiYWNrZ3JvdW5kLWNvbG9yXCIsXHJcbiAgICAgICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICAgICAgY29sOiA2LFxyXG4gICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ29sb3JJbnB1dCxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiVGV4dCBDb2xvclwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiY29sb3JcIixcclxuICAgICAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDb2xvcklucHV0LFxyXG4gICAgICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkaXNwbGF5OyIsImltcG9ydCB7IFNlY3Rpb25JbnB1dCwgU2VsZWN0SW5wdXQsIENzc1VuaXRJbnB1dCwgQ29sb3JJbnB1dCB9IGZyb20gJy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBpbmNfYmFzZV9zb3J0IH0gZnJvbSAnLi9jb21tb24nO1xyXG5cclxuY29uc3QgYm9yZGVyID0ge1xyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBrZXk6IFwiYm9yZGVyX2hlYWRlclwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VjdGlvbklucHV0LFxyXG4gICAgICAgIG5hbWU6IGZhbHNlLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBkYXRhOiB7IGhlYWRlcjogXCJCb3JkZXJcIiwgZXhwYW5kZWQ6IGZhbHNlIH0sXHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJTdHlsZVwiLFxyXG4gICAgICAgIGtleTogXCJib3JkZXItc3R5bGVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDEyLFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwic29saWRcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU29saWRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJkb3R0ZWRcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRG90dGVkXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiZGFzaGVkXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhc2hlZFwiXHJcbiAgICAgICAgICAgIH1dLFxyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIldpZHRoXCIsXHJcbiAgICAgICAga2V5OiBcImJvcmRlci13aWR0aFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgc29ydDogaW5jX2Jhc2Vfc29ydCgpLFxyXG4gICAgICAgIGNvbDogNixcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDc3NVbml0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkNvbG9yXCIsXHJcbiAgICAgICAga2V5OiBcImJvcmRlci1jb2xvclwiLFxyXG4gICAgICAgIHNvcnQ6IGluY19iYXNlX3NvcnQoKSxcclxuICAgICAgICBjb2w6IDYsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBDb2xvcklucHV0LFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJvcmRlcjsiLCJpbXBvcnQgbGFiZWwgZnJvbSAnLi9sYWJlbCc7XHJcbmltcG9ydCB0ZXh0aW5wdXQgZnJvbSAnLi90ZXh0aW5wdXQnO1xyXG5pbXBvcnQgYnV0dG9uIGZyb20gJy4vYnV0dG9uJztcclxuaW1wb3J0IGRpdiBmcm9tICcuL2Rpdic7XHJcbmltcG9ydCBjb250YWluZXIgZnJvbSAnLi9jb250YWluZXInO1xyXG5pbXBvcnQgYWxlcnQgZnJvbSAnLi9hbGVydCc7XHJcbmltcG9ydCBiYWRnZSBmcm9tICcuL2JhZGdlJztcclxuaW1wb3J0IGJyZWFkY3J1bWJpdGVtIGZyb20gJy4vYnJlYWRjcnVtYml0ZW0nO1xyXG5pbXBvcnQgYnJlYWRjcnVtYnMgZnJvbSAnLi9icmVhZGNydW1icyc7XHJcbmltcG9ydCBidXR0b25ncm91cCBmcm9tICcuL2J1dHRvbmdyb3VwJztcclxuaW1wb3J0IGJ1dHRvbnRvb2xiYXIgZnJvbSAnLi9idXR0b250b29sYmFyJztcclxuaW1wb3J0IGNhcmQgZnJvbSAnLi9jYXJkJztcclxuaW1wb3J0IGNoZWNrYm94IGZyb20gJy4vY2hlY2tib3gnO1xyXG5pbXBvcnQgZmlsZWlucHV0IGZyb20gJy4vZmlsZWlucHV0JztcclxuaW1wb3J0IGZvcm0gZnJvbSAnLi9mb3JtJztcclxuaW1wb3J0IGdyaWRjb2x1bW4gZnJvbSAnLi9ncmlkY29sdW1uJztcclxuaW1wb3J0IGdyaWRyb3cgZnJvbSAnLi9ncmlkcm93JztcclxuaW1wb3J0IGhlYWRpbmcgZnJvbSAnLi9oZWFkaW5nJztcclxuaW1wb3J0IGhyIGZyb20gJy4vaHInO1xyXG5pbXBvcnQgaW1hZ2UgZnJvbSAnLi9pbWFnZSc7XHJcbmltcG9ydCBqdW1ib3Ryb24gZnJvbSAnLi9qdW1ib3Ryb24nO1xyXG5pbXBvcnQgbGluayBmcm9tICcuL2xpbmsnO1xyXG5pbXBvcnQgbGlzdGdyb3VwIGZyb20gJy4vbGlzdGdyb3VwJztcclxuaW1wb3J0IGxpc3RpdGVtIGZyb20gJy4vbGlzdGl0ZW0nO1xyXG5pbXBvcnQgbmF2YmFyIGZyb20gJy4vbmF2YmFyJztcclxuaW1wb3J0IHBhZ2VpdGVtIGZyb20gJy4vcGFnZWl0ZW0nO1xyXG5pbXBvcnQgcGFnaW5hdGlvbiBmcm9tICcuL3BhZ2luYXRpb24nO1xyXG5pbXBvcnQgcHJvZ3Jlc3MgZnJvbSAnLi9wcm9ncmVzcyc7XHJcbmltcG9ydCByYWRpb2J1dHRvbiBmcm9tICcuL3JhZGlvYnV0dG9uJztcclxuaW1wb3J0IHNlbGVjdGlucHV0IGZyb20gJy4vc2VsZWN0aW5wdXQnO1xyXG5pbXBvcnQgdGFibGVoZWFkZXJjZWxsIGZyb20gJy4vdGFibGVoZWFkZXJjZWxsJztcclxuaW1wb3J0IHRhYmxlIGZyb20gJy4vdGFibGUnO1xyXG5pbXBvcnQgdGFibGVib2R5IGZyb20gJy4vdGFibGVib2R5JztcclxuaW1wb3J0IHRhYmxlY2VsbCBmcm9tICcuL3RhYmxlY2VsbCc7XHJcbmltcG9ydCB0YWJsZWhlYWQgZnJvbSAnLi90YWJsZWhlYWQnO1xyXG5pbXBvcnQgdGFibGVyb3cgZnJvbSAnLi90YWJsZXJvdyc7XHJcbmltcG9ydCB0ZXh0YXJlYWlucHV0IGZyb20gJy4vdGV4dGFyZWFpbnB1dCc7XHJcbmltcG9ydCBsYWJlbGRpdiBmcm9tICcuL2xhYmVsZGl2JztcclxuaW1wb3J0IHNwYW4gZnJvbSAnLi9zcGFuJztcclxuaW1wb3J0IGNhbGVuZGFyIGZyb20gJy4vY2FsZW5kYXInO1xyXG5pbXBvcnQgdGV4dCBmcm9tICcuL3RleHQnO1xyXG5pbXBvcnQgYXV0b3NlbGVjdGlucHV0IGZyb20gJy4vYXV0b3NlbGVjdGlucHV0JztcclxuaW1wb3J0IG1hbnVhbHNlbGVjdGlucHV0IGZyb20gJy4vbWFudWFsc2VsZWN0aW5wdXQnO1xyXG5pbXBvcnQgY29tbW9udGFibGUgZnJvbSAnLi9jb21tb250YWJsZSc7XHJcblxyXG5leHBvcnQge1xyXG4gICAgbGFiZWwsIHRleHRpbnB1dCwgYnV0dG9uLCBkaXYsIGNvbnRhaW5lciwgYWxlcnQsIGJhZGdlLCBicmVhZGNydW1iaXRlbSwgYnJlYWRjcnVtYnMsIGJ1dHRvbmdyb3VwLFxyXG4gICAgYnV0dG9udG9vbGJhciwgY2FyZCwgY2hlY2tib3gsIGZpbGVpbnB1dCwgZm9ybSwgZ3JpZGNvbHVtbiwgZ3JpZHJvdywgaGVhZGluZywgaHIsIGltYWdlLCBqdW1ib3Ryb24sXHJcbiAgICBsaW5rLCBsaXN0Z3JvdXAsIGxpc3RpdGVtLCBuYXZiYXIsIHBhZ2VpdGVtLCBwYWdpbmF0aW9uLCBwcm9ncmVzcywgcmFkaW9idXR0b24sIHNlbGVjdGlucHV0LCB0YWJsZWhlYWRlcmNlbGwsXHJcbiAgICB0YWJsZSwgdGFibGVib2R5LCB0YWJsZWNlbGwsIHRhYmxlaGVhZCwgdGFibGVyb3csIHRleHRhcmVhaW5wdXQsIGxhYmVsZGl2LCBzcGFuLCBjYWxlbmRhciwgdGV4dCxcclxuICAgIGF1dG9zZWxlY3RpbnB1dCwgbWFudWFsc2VsZWN0aW5wdXQsIGNvbW1vbnRhYmxlXHJcbn07IiwiaW1wb3J0IHsgVGV4dElucHV0LCBTZWxlY3RJbnB1dCwgTnVtYmVySW5wdXQsIFRvZ2dsZUlucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGlucHV0VHlwZXMsIGlucHV0VHlwZU5hbWVzIH0gZnJvbSAnLi4vaW5wdXRUeXBlcyc7XHJcbmltcG9ydCB7IGRhdGFDb21wb25lbnRJZCB9IGZyb20gJy4uL2NvbW1vbic7XHJcblxyXG5jb25zdCB0ZXh0aW5wdXQgPSB7XHJcbiAgICBuYW1lOiBcIlRleHQgSW5wdXRcIixcclxuICAgIGF0dHJpYnV0ZXM6IHsgXCJ0eXBlXCI6IGlucHV0VHlwZU5hbWVzIH0sXHJcbiAgICBpbWFnZTogXCJpY29ucy90ZXh0X2lucHV0LnN2Z1wiLFxyXG4gICAgaHRtbDogYDxkaXYgY2xhc3M9XCJldmVyeU91dGJveC1yaWdodCBkcmFnZ2FibGVcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhaWx5Qm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0ICR7ZGF0YUNvbXBvbmVudElkfT1cImh0bWwvdGV4dGlucHV0QG9lZVwiIGx1c3R5bGU9XCJoZWlnaHQ6IDIuOHJlbTt3aWR0aDoxM3JlbVwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIi8+XHJcbiAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgIDwvZGl2PmAsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiVmFsdWVcIixcclxuICAgICAgICBrZXk6IFwidmFsdWVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJ2YWx1ZVwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ09uY2hhbmdlJyxcclxuICAgICAgICBrZXk6ICdvbmNoYW5nZScsXHJcbiAgICAgICAgaHRtbEF0dHI6ICdvbmNoYW5nZScsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnTWF4bGVuZ3RoJyxcclxuICAgICAgICBrZXk6ICdtYXhsZW5ndGgnLFxyXG4gICAgICAgIGh0bWxBdHRyOiAnbWF4bGVuZ3RoJyxcclxuICAgICAgICBpbnB1dHR5cGU6IE51bWJlcklucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJQbGFjZWhvbGRlclwiLFxyXG4gICAgICAgIGtleTogXCJwbGFjZWhvbGRlclwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInBsYWNlaG9sZGVyXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnTmFtZScsXHJcbiAgICAgICAga2V5OiAnbmFtZScsXHJcbiAgICAgICAgaHRtbEF0dHI6ICduYW1lJyxcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdUeXBlJyxcclxuICAgICAgICBrZXk6ICd0eXBlJyxcclxuICAgICAgICBodG1sQXR0cjogJ3R5cGUnLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBpbnB1dFR5cGVzXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiUmVhZG9ubHlcIixcclxuICAgICAgICBrZXk6IFwicmVhZG9ubHlcIixcclxuICAgICAgICBodG1sQXR0cjogJ3JlYWRvbmx5JyxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wicmVhZG9ubHlcIl0sXHJcbiAgICAgICAgbm9WYWx1ZUF0dHI6IHRydWUsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9uOiAncmVhZG9ubHknLFxyXG4gICAgICAgICAgICBvZmY6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRleHRpbnB1dDsiLCJpbXBvcnQgeyBUZXh0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IHRleHQgPSB7XHJcbiAgICBuYW1lOiBcIlRleHRcIixcclxuICAgIGltYWdlOiBcImljb25zL3RleHRfaW5wdXQuc3ZnXCIsXHJcbiAgICBodG1sOiBgYCxcclxuICAgIG5vZGVzOiBbJ2InLCAnYmlnJywgJ2VtJywgJ2knLCAnc21hbGwnLCAnc3Ryb25nJyxcclxuICAgICAgICAnc3ViJywgJ3N1cCcsICdpbnMnLCAnZGVsJywgJ3MnLCAnc3RyaWtlJywgJ3UnXSxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogJ1RleHQnLFxyXG4gICAgICAgIGtleTogJ3RleHQnLFxyXG4gICAgICAgIGh0bWxBdHRyOiAndGV4dCcsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0ZXh0OyIsImltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3Qgc3BhbiA9IHtcclxuICAgIG5hbWU6IFwiU3BhblwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvdGV4dF9pbnB1dC5zdmdcIixcclxuICAgIG5vZGVzOiBbJ3NwYW4nXSxcclxuICAgIGh0bWw6IGBgLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIkZvciBpZFwiLFxyXG4gICAgICAgIGtleTogXCJmb3JcIixcclxuICAgICAgICBodG1sQXR0cjogXCJmb3JcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdUZXh0JyxcclxuICAgICAgICBrZXk6ICd0ZXh0JyxcclxuICAgICAgICBodG1sQXR0cjogJ3RleHQnLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc3BhbjsiLCJpbXBvcnQgVnZ2ZWIgZnJvbSAnLi4vLi4vYnVpbGRlcic7XHJcbmltcG9ydCB7IFRleHRWYWx1ZUlucHV0LCBCdXR0b25JbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgJCBmcm9tICcuLi8uLi8uLi9qcy9qcXVlcnkubWluJztcclxuXHJcbmNvbnN0IHNlbGVjdGlucHV0ID0ge1xyXG4gICAgbm9kZXM6IFtcInNlbGVjdFwiXSxcclxuICAgIG5hbWU6IFwiU2VsZWN0IElucHV0XCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9zZWxlY3RfaW5wdXQuc3ZnXCIsXHJcbiAgICBodG1sOiBgPGRpdiBjbGFzcz1cImV2ZXJ5T3V0Ym94LXJpZ2h0IGRyYWdnYWJsZVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGFpbHlCb3hcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgbHVzdHlsZT1cImhlaWdodDogMi44cmVtO3dpZHRoOjEzcmVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ2YWx1ZTFcIj5UZXh0IDE8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInZhbHVlMlwiPlRleHQgMjwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwidmFsdWUzXCI+VGV4dCAzPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICBwcm9wZXJ0aWVzID0gW107XHJcbiAgICAgICAgdmFyIGkgPSAwO1xyXG5cclxuICAgICAgICAkKG5vZGUpLmZpbmQoJ29wdGlvbicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgZGF0YSA9IHsgXCJ2YWx1ZVwiOiB0aGlzLnZhbHVlLCBcInRleHRcIjogdGhpcy50ZXh0IH07XHJcblxyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIk9wdGlvbiBcIiArIGksXHJcbiAgICAgICAgICAgICAgICBrZXk6IFwib3B0aW9uXCIgKyBpLFxyXG4gICAgICAgICAgICAgICAgLy9pbmRleDogaSAtIDEsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25Ob2RlOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgaW5wdXR0eXBlOiBUZXh0VmFsdWVJbnB1dCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKG5vZGUsIHZhbHVlLCBpbnB1dCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24gPSAkKHRoaXMub3B0aW9uTm9kZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgcmVtb3ZlIGJ1dHRvbiBpcyBjbGlja2VkIHJlbW92ZSBvcHRpb24gYW5kIHJlbmRlciByb3cgcHJvcGVydGllc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5ub2RlTmFtZSA9PSAnQlVUVE9OJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZ2dmViLkNvbXBvbmVudHMucmVuZGVyKFwiaHRtbC9zZWxlY3RpbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQubmFtZSA9PSBcInZhbHVlXCIpIG9wdGlvbi5hdHRyKFwidmFsdWVcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0Lm5hbWUgPT0gXCJ0ZXh0XCIpIG9wdGlvbi50ZXh0KHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9yZW1vdmUgYWxsIG9wdGlvbiBwcm9wZXJ0aWVzXHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gdGhpcy5wcm9wZXJ0aWVzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5rZXkuaW5kZXhPZihcIm9wdGlvblwiKSA9PT0gLTE7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vYWRkIHJlbWFpbmluZyBwcm9wZXJ0aWVzIHRvIGdlbmVyYXRlZCBjb2x1bW4gcHJvcGVydGllc1xyXG4gICAgICAgIHByb3BlcnRpZXMucHVzaCh0aGlzLnByb3BlcnRpZXNbMF0pO1xyXG5cclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiT3B0aW9uXCIsXHJcbiAgICAgICAga2V5OiBcIm9wdGlvbjFcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRWYWx1ZUlucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJPcHRpb25cIixcclxuICAgICAgICBrZXk6IFwib3B0aW9uMlwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dFZhbHVlSW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICAgIGtleTogXCJhZGRDaGlsZFwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogQnV0dG9uSW5wdXQsXHJcbiAgICAgICAgZGF0YTogeyB0ZXh0OiBcIkFkZCBvcHRpb25cIiB9LFxyXG4gICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgICAgICAkKG5vZGUpLmFwcGVuZCgnPG9wdGlvbiB2YWx1ZT1cInZhbHVlXCI+VGV4dDwvb3B0aW9uPicpO1xyXG5cclxuICAgICAgICAgICAgLy9yZW5kZXIgY29tcG9uZW50IHByb3BlcnRpZXMgYWdhaW4gdG8gaW5jbHVkZSB0aGUgbmV3IGNvbHVtbiBpbnB1dHNcclxuICAgICAgICAgICAgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIoXCJodG1sL3NlbGVjdGlucHV0XCIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNlbGVjdGlucHV0OyIsImltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBkYXRhQ29tcG9uZW50SWQgfSBmcm9tICcuLi9jb21tb24nO1xyXG5cclxuY29uc3QgcmFkaW9idXR0b24gPSB7XHJcbiAgICBuYW1lOiBcIlJhZGlvIEJ1dHRvblwiLFxyXG4gICAgYXR0cmlidXRlczogeyBcInR5cGVcIjogXCJyYWRpb1wiIH0sXHJcbiAgICBpbWFnZTogXCJpY29ucy9yYWRpby5zdmdcIixcclxuICAgIGh0bWw6IGA8ZGl2ICR7ZGF0YUNvbXBvbmVudElkfT1cImh0bWwvcmFkaW9idXR0b25Ab2VlXCIgY2xhc3M9XCJldmVyeU91dGJveC1yaWdodCBkcmFnZ2FibGVcIj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6aW5saW5lO1wiPjxpbnB1dCBjbGFzcz1cInJhZGlvSW5wdXRcIiB0eXBlPVwicmFkaW9cIiB2YWx1ZT1cIlwiIC8+PHNwYW4gJHtkYXRhQ29tcG9uZW50SWR9PVwiaHRtbC9zcGFuQG9lZVwiPuWNlemAiTE8L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgICAgPC9kaXY+YCxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogJ09uY2xpY2snLFxyXG4gICAgICAgIGtleTogJ29uY2xpY2snLFxyXG4gICAgICAgIGh0bWxBdHRyOiAnb25jbGljaycsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlZhbHVlXCIsXHJcbiAgICAgICAga2V5OiBcInZhbHVlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwidmFsdWVcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiTmFtZVwiLFxyXG4gICAgICAgIGtleTogXCJuYW1lXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwibmFtZVwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmFkaW9idXR0b247IiwiaW1wb3J0IFZ2dmViIGZyb20gJy4uLy4uL2J1aWxkZXInO1xyXG5pbXBvcnQgeyBUZXh0VmFsdWVJbnB1dCwgQnV0dG9uSW5wdXQsIFRleHRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBtYW51YWxzZWxlY3RpbnB1dGlkIH0gZnJvbSAnLi9pZHMnO1xyXG5pbXBvcnQgeyBkYXRhQ29tcG9uZW50SWQgfSBmcm9tICcuLi9jb21tb24nO1xyXG5pbXBvcnQgJCBmcm9tICcuLi8uLi8uLi9qcy9qcXVlcnkubWluJztcclxuXHJcbmNvbnN0IGF1dG9zZWxlY3RpbnB1dCA9IHtcclxuICAgIG5vZGVzOiBbXCJzZWxlY3RcIl0sXHJcbiAgICBuYW1lOiBcIk1hbnVhbCBTZWxlY3QgSW5wdXRcIixcclxuICAgIGltYWdlOiBcImljb25zL3NlbGVjdF9pbnB1dC5zdmdcIixcclxuICAgIGh0bWw6IGA8ZGl2IGNsYXNzPVwiZXZlcnlPdXRib3gtcmlnaHQgZHJhZ2dhYmxlXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYWlseUJveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgJHtkYXRhQ29tcG9uZW50SWR9PVwiJHttYW51YWxzZWxlY3RpbnB1dGlkfVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZ1bmRvZG9vU2VsZWN0XCIgbHVzdHlsZT1cImhlaWdodDoyLjhyZW07d2lkdGg6MTNyZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInZhbHVlMVwiPlRleHQgMTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwidmFsdWUyXCI+VGV4dCAyPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ2YWx1ZTNcIj5UZXh0IDM8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBiZWZvcmVJbml0OiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgIHByb3BlcnRpZXMgPSBbXTtcclxuICAgICAgICB2YXIgaSA9IDA7XHJcblxyXG4gICAgICAgICQobm9kZSkuZmluZCgnb3B0aW9uJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBkYXRhID0geyBcInZhbHVlXCI6IHRoaXMudmFsdWUsIFwidGV4dFwiOiB0aGlzLnRleHQgfTtcclxuXHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiT3B0aW9uIFwiICsgaSxcclxuICAgICAgICAgICAgICAgIGtleTogXCJvcHRpb25cIiArIGksXHJcbiAgICAgICAgICAgICAgICAvL2luZGV4OiBpIC0gMSxcclxuICAgICAgICAgICAgICAgIG9wdGlvbk5vZGU6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBpbnB1dHR5cGU6IFRleHRWYWx1ZUlucHV0LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSwgdmFsdWUsIGlucHV0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbiA9ICQodGhpcy5vcHRpb25Ob2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiByZW1vdmUgYnV0dG9uIGlzIGNsaWNrZWQgcmVtb3ZlIG9wdGlvbiBhbmQgcmVuZGVyIHJvdyBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Lm5vZGVOYW1lID09ICdCVVRUT04nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIobWFudWFsc2VsZWN0aW5wdXRpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Lm5hbWUgPT0gXCJ2YWx1ZVwiKSBvcHRpb24uYXR0cihcInZhbHVlXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnB1dC5uYW1lID09IFwidGV4dFwiKSBvcHRpb24udGV4dCh2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vcmVtb3ZlIGFsbCBvcHRpb24gcHJvcGVydGllc1xyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHRoaXMucHJvcGVydGllcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ua2V5LmluZGV4T2YoXCJvcHRpb25cIikgPT09IC0xO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL2FkZCByZW1haW5pbmcgcHJvcGVydGllcyB0byBnZW5lcmF0ZWQgY29sdW1uIHByb3BlcnRpZXNcclxuICAgICAgICBwcm9wZXJ0aWVzLnB1c2godGhpcy5wcm9wZXJ0aWVzWzBdKTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllcztcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIk9wdGlvblwiLFxyXG4gICAgICAgIGtleTogXCJvcHRpb24xXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0VmFsdWVJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiT3B0aW9uXCIsXHJcbiAgICAgICAga2V5OiBcIm9wdGlvbjJcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRWYWx1ZUlucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICBrZXk6IFwiYWRkQ2hpbGRcIixcclxuICAgICAgICBpbnB1dHR5cGU6IEJ1dHRvbklucHV0LFxyXG4gICAgICAgIGRhdGE6IHsgdGV4dDogXCJBZGQgb3B0aW9uXCIgfSxcclxuICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAgICAgJChub2RlKS5hcHBlbmQoJzxvcHRpb24gdmFsdWU9XCJ2YWx1ZVwiPlRleHQ8L29wdGlvbj4nKTtcclxuICAgICAgICAgICAgLy9yZW5kZXIgY29tcG9uZW50IHByb3BlcnRpZXMgYWdhaW4gdG8gaW5jbHVkZSB0aGUgbmV3IGNvbHVtbiBpbnB1dHNcclxuICAgICAgICAgICAgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIobWFudWFsc2VsZWN0aW5wdXRpZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnT25jaGFuZ2UnLFxyXG4gICAgICAgIGtleTogJ29uY2hhbmdlJyxcclxuICAgICAgICBodG1sQXR0cjogJ29uY2hhbmdlJyxcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiTmFtZVwiLFxyXG4gICAgICAgIGtleTogXCJuYW1lXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwibmFtZVwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXV0b3NlbGVjdGlucHV0OyIsImltcG9ydCB7IGRhdGFDb21wb25lbnRJZCB9IGZyb20gJy4uL2NvbW1vbic7XHJcblxyXG5jb25zdCBsYWJlbGRpdiA9IHtcclxuICAgIG5hbWU6ICdMYWJlbCBEaXYnLFxyXG4gICAgaW1hZ2U6ICdpY29ucy9sYWJlbC5zdmcnLFxyXG4gICAgaHRtbDogYDxkaXYgY2xhc3M9XCJldmVyeU91dGJveC1sZWZ0IGRyYWdnYWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jYXJldC1zcXVhcmUtby1yaWdodCB0ZXh0LWRhbmdlclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cclxuICAgICAgICAgICAgICAgIDxzcGFuICR7ZGF0YUNvbXBvbmVudElkfT1cImh0bWwvc3BhbkBvZWVcIiBjbGFzcz1cInRoZW1lXCI+UGVyaW9kPC9zcGFuPlxyXG4gICAgICAgICAgIDwvZGl2PmBcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxhYmVsZGl2OyIsImltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBkYXRhQ29tcG9uZW50SWQgfSBmcm9tICcuLi9jb21tb24nO1xyXG5cclxuY29uc3QgY2hlY2tib3ggPSB7XHJcbiAgICBuYW1lOiBcIkNoZWNrYm94XCIsXHJcbiAgICBhdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBcImNoZWNrYm94XCIgfSxcclxuICAgIGltYWdlOiBcImljb25zL2NoZWNrYm94LnN2Z1wiLFxyXG4gICAgaHRtbDogYDxkaXYgY2xhc3M9XCJldmVyeU91dGJveC1yaWdodCBkcmFnZ2FibGVcIj5cclxuICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OmlubGluZTtcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCAke2RhdGFDb21wb25lbnRJZH09XCJodG1sL2NoZWNrYm94QG9lZVwiIHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiY2hlY2tib3hJbnB1dFwiLz5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCAke2RhdGFDb21wb25lbnRJZH09XCJodG1sL3NwYW5Ab2VlXCI+6YCJ6aG5MTwvbGFiZWw+XHJcbiAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+YCxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogJ09uY2xpY2snLFxyXG4gICAgICAgIGtleTogJ29uY2xpY2snLFxyXG4gICAgICAgIGh0bWxBdHRyOiAnb25jbGljaycsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlZhbHVlXCIsXHJcbiAgICAgICAga2V5OiBcInZhbHVlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwidmFsdWVcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiTmFtZVwiLFxyXG4gICAgICAgIGtleTogXCJuYW1lXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwibmFtZVwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2hlY2tib3g7IiwiaW1wb3J0IHsgVGV4dElucHV0LCBTZWxlY3RJbnB1dCwgVG9nZ2xlSW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgaW5wdXRUeXBlTmFtZXMgfSBmcm9tICcuLi9pbnB1dFR5cGVzJztcclxuaW1wb3J0IHsgZGF0YUNvbXBvbmVudElkLCBkYXRhQ29uZmlnSW5mbywgZGF0YUNhbGVuZGFySWQgfSBmcm9tICcuLi9jb21tb24nO1xyXG5pbXBvcnQge1xyXG4gICAgY2xvbmVXaXRob3V0T25jbGljaywgZ2V0RGF0ZUZtdCwgZ2V0UGFyc2VkQ29uZmlnSW5mbyxcclxuICAgIHNldERhdGFDb25maWdJbmZvLCBzZXRPbmNsaWNrQXR0clxyXG59IGZyb20gJy4uLy4uL3V0aWwvY2FsZW5kYXInXHJcblxyXG5jb25zdCBjYWxlbmRhciA9IHtcclxuICAgIG5hbWU6IFwiRGF0ZXRpbWUgSW5wdXRcIixcclxuICAgIGF0dHJpYnV0ZXM6IHsgXCJ0eXBlXCI6IGlucHV0VHlwZU5hbWVzIH0sXHJcbiAgICBpbWFnZTogXCJpY29ucy9jYWxlbmRhci5zdmdcIixcclxuICAgIGh0bWw6IGA8ZGl2IGNsYXNzPVwiZXZlcnlPdXRib3gtcmlnaHQgZHJhZ2dhYmxlXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYWlseUJveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCAke2RhdGFDYWxlbmRhcklkfSAke2RhdGFDb25maWdJbmZvfT1cInsnZGF0ZUZtdCc6ICd5eXl5LU1NLWRkIEhIOm1tJ31cIiAke2RhdGFDb21wb25lbnRJZH09XCJodG1sL2NhbGVuZGFyQG9lZVwiIGx1c3R5bGU9XCJoZWlnaHQ6IDIuOHJlbTt3aWR0aDoxM3JlbSBcIiBcclxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sIFdkYXRlXCIvPlxyXG4gICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICA8L2Rpdj5gLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIlZhbHVlXCIsXHJcbiAgICAgICAga2V5OiBcInZhbHVlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwidmFsdWVcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiUGxhY2Vob2xkZXJcIixcclxuICAgICAgICBrZXk6IFwicGxhY2Vob2xkZXJcIixcclxuICAgICAgICBodG1sQXR0cjogXCJwbGFjZWhvbGRlclwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ05hbWUnLFxyXG4gICAgICAgIGtleTogJ25hbWUnLFxyXG4gICAgICAgIGh0bWxBdHRyOiAnbmFtZScsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkRhdGUgRm9ybWF0XCIsXHJcbiAgICAgICAga2V5OiBcImRhdGVGbXRcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGluaXQ6IGdldERhdGVGbXQsXHJcbiAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICBjb25zdCBjb25maWdJbmZvID0gZ2V0UGFyc2VkQ29uZmlnSW5mbyhub2RlKVxyXG4gICAgICAgICAgICBjb25maWdJbmZvLmRhdGVGbXQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgc2V0RGF0YUNvbmZpZ0luZm8obm9kZSwgY29uZmlnSW5mbyk7XHJcblxyXG4gICAgICAgICAgICBpZiAobm9kZS5hdHRyKCdvbmNsaWNrJykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZXRPbmNsaWNrQXR0cihjbG9uZVdpdGhvdXRPbmNsaWNrKG5vZGUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAneXl5eS1NTS1kZCBISDptbScsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAneXl5eS1NTS1kZCBISDptbSdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICd5eXl5LU1NLWRkIEhIOm1tOnNzJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICd5eXl5LU1NLWRkIEhIOm1tOnNzJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ3l5eXktTU0tZGQnLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ3l5eXktTU0tZGQnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAneXl5eU1NZGQnLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ3l5eXlNTWRkJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ3l5eXlNTScsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAneXl5eU1NJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ3l5eXknLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ3l5eXknXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiU2hvdyBEYXRldGltZVwiLFxyXG4gICAgICAgIGtleTogXCJzaG93RGF0ZXRpbWVcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1widGFibGUtcmVzcG9uc2l2ZVwiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgIG9uQ2hhbmdlKG5vZGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSAnb24nKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRPbmNsaWNrQXR0cihub2RlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNsb25lV2l0aG91dE9uY2xpY2sobm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb246ICdvbicsXHJcbiAgICAgICAgICAgIG9mZjogJ29mZidcclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2FsZW5kYXI7IiwiaW1wb3J0IHsgTGlua0lucHV0LCBTZWxlY3RJbnB1dCwgVGV4dElucHV0LCBUb2dnbGVJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBkYXRhQnV0dG9uSWQsIGRhdGFDb21wb25lbnRJZCB9IGZyb20gXCIuLi9jb21tb25cIjtcclxuaW1wb3J0IHsgYnV0dG9uaWQgfSBmcm9tICcuL2lkcyc7XHJcblxyXG5jb25zdCBidXR0b24gPSB7XHJcbiAgICBjbGFzc2VzOiBbXCJidG5cIiwgXCJidG4tbGlua1wiLCAnYnRuQG9lZSddLFxyXG4gICAgbmFtZTogXCJCdXR0b25cIixcclxuICAgIGltYWdlOiBcImljb25zL2J1dHRvbi5zdmdcIixcclxuICAgIGh0bWw6IGA8YnV0dG9uICR7ZGF0YUNvbXBvbmVudElkfT0ke2J1dHRvbmlkfSAke2RhdGFCdXR0b25JZH0gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZHJhZ2dhYmxlIHNlYXJjaC1idG5cIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXNlYXJjaFwiPlNlYXJjaDwvc3Bhbj5cclxuICAgICAgICAgICA8L2J1dHRvbj5gLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIkxpbmsgVG9cIixcclxuICAgICAgICBrZXk6IFwiaHJlZlwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImhyZWZcIixcclxuICAgICAgICBpbnB1dHR5cGU6IExpbmtJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICAgIGtleTogXCJ0eXBlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJidG4tZGVmYXVsdFwiLCBcImJ0bi1wcmltYXJ5XCIsIFwiYnRuLWluZm9cIiwgXCJidG4tc3VjY2Vzc1wiLCBcImJ0bi13YXJuaW5nXCIsIFwiYnRuLWluZm9cIiwgXCJidG4tbGlnaHRcIiwgXCJidG4tZGFya1wiLCBcImJ0bi1vdXRsaW5lLXByaW1hcnlcIiwgXCJidG4tb3V0bGluZS1pbmZvXCIsIFwiYnRuLW91dGxpbmUtc3VjY2Vzc1wiLCBcImJ0bi1vdXRsaW5lLXdhcm5pbmdcIiwgXCJidG4tb3V0bGluZS1pbmZvXCIsIFwiYnRuLW91dGxpbmUtbGlnaHRcIiwgXCJidG4tb3V0bGluZS1kYXJrXCIsIFwiYnRuLWxpbmtcIl0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWRlZmF1bHRcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlByaW1hcnlcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4gYnRuLWluZm9cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1zdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4td2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJXYXJuaW5nXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWluZm9cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1saWdodFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMaWdodFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1kYXJrXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhcmtcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tb3V0bGluZS1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlByaW1hcnkgb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0biBidG4tb3V0bGluZS1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm8gb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1vdXRsaW5lLXN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU3VjY2VzcyBvdXRsaW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLW91dGxpbmUtd2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJXYXJuaW5nIG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tb3V0bGluZS1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm8gb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1vdXRsaW5lLWxpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpZ2h0IG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tb3V0bGluZS1kYXJrXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhcmsgb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1saW5rXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpbmtcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlNpemVcIixcclxuICAgICAgICBrZXk6IFwic2l6ZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiYnRuLWxnXCIsIFwiYnRuLXNtXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWxnXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxhcmdlXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLXNtXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlNtYWxsXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJUYXJnZXRcIixcclxuICAgICAgICBrZXk6IFwidGFyZ2V0XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwidGFyZ2V0XCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnb25jbGljaycsXHJcbiAgICAgICAga2V5OiAnb25jbGljaycsXHJcbiAgICAgICAgaHRtbEF0dHI6ICdvbmNsaWNrJyxcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdEYXRhIFVybCcsXHJcbiAgICAgICAga2V5OiAnZGF0YVVybCcsXHJcbiAgICAgICAgaHRtbEF0dHI6ICdkYXRhLXVybCcsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkRpc2FibGVkXCIsXHJcbiAgICAgICAga2V5OiBcImRpc2FibGVkXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJkaXNhYmxlZFwiXSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9uOiBcImRpc2FibGVkXCIsXHJcbiAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidXR0b247IiwiaW1wb3J0IHsgVGV4dElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGF1dG9zZWxlY3RpbnB1dGlkIH0gZnJvbSAnLi9pZHMnO1xyXG5pbXBvcnQgeyBkYXRhQ29tcG9uZW50SWQsIGRhdGFVcmwsIGRhdGFBdXRvU2VsZWN0SWQsIGRhdGFWYWx1ZU1hcHBpbmcsIGRhdGFUZXh0TWFwcGluZyB9IGZyb20gJy4uL2NvbW1vbic7XHJcblxyXG5jb25zdCBhdXRvc2VsZWN0aW5wdXQgPSB7XHJcbiAgICBub2RlczogW1wic2VsZWN0XCJdLFxyXG4gICAgbmFtZTogXCJBdXRvIFNlbGVjdCBJbnB1dFwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvc2VsZWN0X2lucHV0LnN2Z1wiLFxyXG4gICAgaHRtbDogYDxkaXYgY2xhc3M9XCJldmVyeU91dGJveC1yaWdodCBkcmFnZ2FibGVcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhaWx5Qm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCAke2RhdGFBdXRvU2VsZWN0SWR9ICR7ZGF0YUNvbXBvbmVudElkfT1cIiR7YXV0b3NlbGVjdGlucHV0aWR9XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZnVuZG9kb29TZWxlY3RcIiBsdXN0eWxlPVwiaGVpZ2h0OiAyLjhyZW07d2lkdGg6MTNyZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6ICdWYWx1ZSBNYXBwaW5nJyxcclxuICAgICAgICBrZXk6ICd2YWx1ZU1hcHBpbmcnLFxyXG4gICAgICAgIGh0bWxBdHRyOiBkYXRhVmFsdWVNYXBwaW5nLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1RleHQgTWFwcGluZycsXHJcbiAgICAgICAga2V5OiAndGV4dE1hcGluZycsXHJcbiAgICAgICAgaHRtbEF0dHI6IGRhdGFUZXh0TWFwcGluZyxcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiRGF0YSBVcmxcIixcclxuICAgICAgICBrZXk6IFwiZGF0YVVybFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBkYXRhVXJsLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ09uY2hhbmdlJyxcclxuICAgICAgICBrZXk6ICdvbmNoYW5nZScsXHJcbiAgICAgICAgaHRtbEF0dHI6ICdvbmNoYW5nZScsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIk5hbWVcIixcclxuICAgICAgICBrZXk6IFwibmFtZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcIm5hbWVcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGF1dG9zZWxlY3RpbnB1dDsiLCJjb25zdCBtYW51YWxzZWxlY3RpbnB1dGlkID0gJ2h0bWwvbWFudWFsc2VsZWN0aW5wdXRAb2VlJztcclxuY29uc3QgYXV0b3NlbGVjdGlucHV0aWQgPSAnaHRtbC9hdXRvc2VsZWN0aW5wdXRAb2VlJztcclxuY29uc3QgYnV0dG9uaWQgPSAnaHRtbC9idXR0b25Ab2VlJztcclxuY29uc3QgY29tbW9udGFibGVpZCA9ICdodG1sL2NvbW1vbnRhYmxlQG9lZSdcclxuXHJcbmV4cG9ydCB7IG1hbnVhbHNlbGVjdGlucHV0aWQsIGF1dG9zZWxlY3RpbnB1dGlkLCBidXR0b25pZCwgY29tbW9udGFibGVpZCB9OyIsImltcG9ydCBsYWJlbCBmcm9tICcuL2xhYmVsJztcclxuaW1wb3J0IHRleHRpbnB1dCBmcm9tICcuL3RleHRpbnB1dCc7XHJcbmltcG9ydCBidXR0b24gZnJvbSAnLi9idXR0b24nO1xyXG5pbXBvcnQgZGl2IGZyb20gJy4vZGl2JztcclxuaW1wb3J0IGNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcic7XHJcbmltcG9ydCBhbGVydCBmcm9tICcuL2FsZXJ0JztcclxuaW1wb3J0IGJhZGdlIGZyb20gJy4vYmFkZ2UnO1xyXG5pbXBvcnQgYnJlYWRjcnVtYml0ZW0gZnJvbSAnLi9icmVhZGNydW1iaXRlbSc7XHJcbmltcG9ydCBicmVhZGNydW1icyBmcm9tICcuL2JyZWFkY3J1bWJzJztcclxuaW1wb3J0IGJ1dHRvbmdyb3VwIGZyb20gJy4vYnV0dG9uZ3JvdXAnO1xyXG5pbXBvcnQgYnV0dG9udG9vbGJhciBmcm9tICcuL2J1dHRvbnRvb2xiYXInO1xyXG5pbXBvcnQgY2FyZCBmcm9tICcuL2NhcmQnO1xyXG5pbXBvcnQgY2hlY2tib3ggZnJvbSAnLi9jaGVja2JveCc7XHJcbmltcG9ydCBmaWxlaW5wdXQgZnJvbSAnLi9maWxlaW5wdXQnO1xyXG5pbXBvcnQgZm9ybSBmcm9tICcuL2Zvcm0nO1xyXG5pbXBvcnQgZ3JpZGNvbHVtbiBmcm9tICcuL2dyaWRjb2x1bW4nO1xyXG5pbXBvcnQgZ3JpZHJvdyBmcm9tICcuL2dyaWRyb3cnO1xyXG5pbXBvcnQgaGVhZGluZyBmcm9tICcuL2hlYWRpbmcnO1xyXG5pbXBvcnQgaHIgZnJvbSAnLi9ocic7XHJcbmltcG9ydCBpbWFnZSBmcm9tICcuL2ltYWdlJztcclxuaW1wb3J0IGp1bWJvdHJvbiBmcm9tICcuL2p1bWJvdHJvbic7XHJcbmltcG9ydCBsaW5rIGZyb20gJy4vbGluayc7XHJcbmltcG9ydCBsaXN0Z3JvdXAgZnJvbSAnLi9saXN0Z3JvdXAnO1xyXG5pbXBvcnQgbGlzdGl0ZW0gZnJvbSAnLi9saXN0aXRlbSc7XHJcbmltcG9ydCBuYXZiYXIgZnJvbSAnLi9uYXZiYXInO1xyXG5pbXBvcnQgcGFnZWl0ZW0gZnJvbSAnLi9wYWdlaXRlbSc7XHJcbmltcG9ydCBwYWdpbmF0aW9uIGZyb20gJy4vcGFnaW5hdGlvbic7XHJcbmltcG9ydCBwcm9ncmVzcyBmcm9tICcuL3Byb2dyZXNzJztcclxuaW1wb3J0IHJhZGlvYnV0dG9uIGZyb20gJy4vcmFkaW9idXR0b24nO1xyXG5pbXBvcnQgc2VsZWN0aW5wdXQgZnJvbSAnLi9zZWxlY3RpbnB1dCc7XHJcbmltcG9ydCB0YWJsZWhlYWRlcmNlbGwgZnJvbSAnLi90YWJsZWhlYWRlcmNlbGwnO1xyXG5pbXBvcnQgdGFibGUgZnJvbSAnLi90YWJsZSc7XHJcbmltcG9ydCB0YWJsZWJvZHkgZnJvbSAnLi90YWJsZWJvZHknO1xyXG5pbXBvcnQgdGFibGVjZWxsIGZyb20gJy4vdGFibGVjZWxsJztcclxuaW1wb3J0IHRhYmxlaGVhZCBmcm9tICcuL3RhYmxlaGVhZCc7XHJcbmltcG9ydCB0YWJsZXJvdyBmcm9tICcuL3RhYmxlcm93JztcclxuaW1wb3J0IHRleHRhcmVhaW5wdXQgZnJvbSAnLi90ZXh0YXJlYWlucHV0JztcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBsYWJlbCwgdGV4dGlucHV0LCBidXR0b24sIGRpdiwgY29udGFpbmVyLCBhbGVydCwgYmFkZ2UsIGJyZWFkY3J1bWJpdGVtLCBicmVhZGNydW1icywgYnV0dG9uZ3JvdXAsXHJcbiAgICBidXR0b250b29sYmFyLCBjYXJkLCBjaGVja2JveCwgZmlsZWlucHV0LCBmb3JtLCBncmlkY29sdW1uLCBncmlkcm93LCBoZWFkaW5nLCBociwgaW1hZ2UsIGp1bWJvdHJvbixcclxuICAgIGxpbmssIGxpc3Rncm91cCwgbGlzdGl0ZW0sIG5hdmJhciwgcGFnZWl0ZW0sIHBhZ2luYXRpb24sIHByb2dyZXNzLCByYWRpb2J1dHRvbiwgc2VsZWN0aW5wdXQsIHRhYmxlaGVhZGVyY2VsbCxcclxuICAgIHRhYmxlLCB0YWJsZWJvZHksIHRhYmxlY2VsbCwgdGFibGVoZWFkLCB0YWJsZXJvdywgdGV4dGFyZWFpbnB1dFxyXG59OyIsImltcG9ydCB7IFRleHRJbnB1dCwgU2VsZWN0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgaW5wdXRUeXBlcywgaW5wdXRUeXBlTmFtZXMgfSBmcm9tICcuLi9pbnB1dFR5cGVzJztcclxuaW1wb3J0IHsgZGF0YUNvbXBvbmVudElkIH0gZnJvbSAnLi4vY29tbW9uJztcclxuXHJcbmNvbnN0IHRleHRpbnB1dCA9IHtcclxuICAgIG5hbWU6IFwiVGV4dCBJbnB1dFwiLFxyXG4gICAgYXR0cmlidXRlczogeyBcInR5cGVcIjogaW5wdXRUeXBlTmFtZXMgfSxcclxuICAgIGltYWdlOiBcImljb25zL3RleHRfaW5wdXQuc3ZnXCIsXHJcbiAgICBodG1sOiBgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jaztcIj48bGFiZWw+VGV4dDwvbGFiZWw+PGlucHV0ICR7ZGF0YUNvbXBvbmVudElkfT1cImh0bWwvdGV4dGlucHV0QGdlbmVyYWxcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+PC9kaXY+PC9kaXY+YCxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJWYWx1ZVwiLFxyXG4gICAgICAgIGtleTogXCJ2YWx1ZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcInZhbHVlXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlBsYWNlaG9sZGVyXCIsXHJcbiAgICAgICAga2V5OiBcInBsYWNlaG9sZGVyXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwicGxhY2Vob2xkZXJcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICd0eXBlJyxcclxuICAgICAgICBrZXk6ICd0eXBlJyxcclxuICAgICAgICBodG1sQXR0cjogJ3R5cGUnLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBpbnB1dFR5cGVzXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRleHRpbnB1dDsiLCJjb25zdCBpbnB1dFR5cGVzID0gW1xyXG4gICAge1xyXG4gICAgICAgIHZhbHVlOiAndGV4dCcsXHJcbiAgICAgICAgdGV4dDogJ3RleHQnXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6ICdwYXNzd29yZCcsXHJcbiAgICAgICAgdGV4dDogJ3Bhc3N3b3JkJ1xyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiAnbnVtYmVyJyxcclxuICAgICAgICB0ZXh0OiAnbnVtYmVyJ1xyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiAnc3VibWl0JyxcclxuICAgICAgICB0ZXh0OiAnc3VibWl0J1xyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiBcImVtYWlsXCIsXHJcbiAgICAgICAgdGV4dDogXCJlbWFpbFwiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6ICd1cmwnLFxyXG4gICAgICAgIHRleHQ6ICd1cmwnXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6ICd0ZWwnLFxyXG4gICAgICAgIHRleHQ6ICd0ZWwnXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6ICdzZWFyY2gnLFxyXG4gICAgICAgIHRleHQ6ICdzZWFyY2gnXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6ICdkYXRldGltZS1sb2NhbCcsXHJcbiAgICAgICAgdGV4dDogJ2RhdGV0aW1lLWxvY2FsJ1xyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiAnZGF0ZXRpbWUnLFxyXG4gICAgICAgIHRleHQ6ICdkYXRldGltZSdcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ2RhdGUnLFxyXG4gICAgICAgIHRleHQ6ICdkYXRlJ1xyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiAndGltZScsXHJcbiAgICAgICAgdGV4dDogJ3RpbWUnXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6ICd3ZWVrJyxcclxuICAgICAgICB0ZXh0OiAnd2VlaydcclxuICAgIH0sIHtcclxuICAgICAgICB2YWx1ZTogJ21vbnRoJyxcclxuICAgICAgICB0ZXh0OiAnbW9udGgnXHJcbiAgICB9LCB7XHJcbiAgICAgICAgdmFsdWU6ICdyYW5nZScsXHJcbiAgICAgICAgdGV4dDogJ3JhbmdlJ1xyXG4gICAgfSwge1xyXG4gICAgICAgIHZhbHVlOiAnY29sb3InLFxyXG4gICAgICAgIHRleHQ6ICdjb2xvcidcclxuICAgIH1dO1xyXG5cclxuY29uc3QgaW5wdXRUeXBlTmFtZXMgPSBpbnB1dFR5cGVzLnJlZHVjZSgocHJldiwgY3VyKSA9PiB7XHJcbiAgICBwcmV2LnB1c2goY3VyLnZhbHVlKTtcclxuICAgIHJldHVybiBwcmV2O1xyXG59LCBbXSk7XHJcblxyXG5leHBvcnQgeyBpbnB1dFR5cGVzLCBpbnB1dFR5cGVOYW1lcyB9OyIsImNvbnN0IHRleHRhcmVhaW5wdXQgPSB7XHJcbiAgICBuYW1lOiBcIlRleHQgQXJlYVwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvdGV4dF9hcmVhLnN2Z1wiLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+PGxhYmVsPllvdXIgcmVzcG9uc2U6PC9sYWJlbD48dGV4dGFyZWEgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj48L3RleHRhcmVhPjwvZGl2PidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRleHRhcmVhaW5wdXQ7IiwiaW1wb3J0IHsgU2VsZWN0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IHRhYmxlcm93ID0ge1xyXG4gICAgbm9kZXM6IFtcInRyXCJdLFxyXG4gICAgbmFtZTogXCJUYWJsZSBSb3dcIixcclxuICAgIGh0bWw6IFwiPHRyPjx0ZD5DZWxsIDE8L3RkPjx0ZD5DZWxsIDI8L3RkPjx0ZD5DZWxsIDM8L3RkPjwvdHI+XCIsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICAgIGtleTogXCJ0eXBlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJcIiwgXCJzdWNjZXNzXCIsIFwiZGFuZ2VyXCIsIFwid2FybmluZ1wiLCBcImFjdGl2ZVwiXSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU3VjY2Vzc1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImVycm9yXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkVycm9yXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwid2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJXYXJuaW5nXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYWN0aXZlXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkFjdGl2ZVwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhYmxlcm93OyIsImNvbnN0IHRhYmxlaGVhZGVyY2VsbCA9IHtcclxuICAgIG5vZGVzOiBbXCJ0aFwiXSxcclxuICAgIG5hbWU6IFwiVGFibGUgSGVhZGVyIENlbGxcIixcclxuICAgIGh0bWw6IFwiPHRoPkhlYWQ8L3RoPlwiXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YWJsZWhlYWRlcmNlbGw7IiwiaW1wb3J0IHsgU2VsZWN0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IHRhYmxlaGVhZCA9IHtcclxuICAgIG5vZGVzOiBbXCJ0aGVhZFwiXSxcclxuICAgIG5hbWU6IFwiVGFibGUgSGVhZFwiLFxyXG4gICAgaHRtbDogXCI8dGhlYWQ+PHRyPjx0aD5IZWFkIDE8L3RoPjx0aD5IZWFkIDI8L3RoPjx0aD5IZWFkIDM8L3RoPjwvdHI+PC90aGVhZD5cIixcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJUeXBlXCIsXHJcbiAgICAgICAga2V5OiBcInR5cGVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcIlwiLCBcInN1Y2Nlc3NcIiwgXCJkYW5nZXJcIiwgXCJ3YXJuaW5nXCIsIFwiaW5mb1wiXSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU3VjY2Vzc1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImFuZ2VyXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkVycm9yXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwid2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJXYXJuaW5nXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJJbmZvXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFibGVoZWFkOyIsImNvbnN0IHRhYmxlY2VsbCA9IHtcclxuICAgIG5vZGVzOiBbXCJ0ZFwiXSxcclxuICAgIG5hbWU6IFwiVGFibGUgQ2VsbFwiLFxyXG4gICAgaHRtbDogXCI8dGQ+Q2VsbDwvdGQ+XCJcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhYmxlY2VsbDsiLCJjb25zdCB0YWJsZWJvZHkgPSB7XHJcbiAgICBub2RlczogW1widGJvZHlcIl0sXHJcbiAgICBuYW1lOiBcIlRhYmxlIEJvZHlcIixcclxuICAgIGh0bWw6IFwiPHRib2R5Pjx0cj48dGQ+Q2VsbCAxPC90ZD48dGQ+Q2VsbCAyPC90ZD48dGQ+Q2VsbCAzPC90ZD48L3RyPjwvdGJvZHk+XCJcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhYmxlYm9keTsiLCJpbXBvcnQgeyBTZWxlY3RJbnB1dCwgVG9nZ2xlSW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IHRhYmxlID0ge1xyXG4gICAgbm9kZXM6IFtcInRhYmxlXCJdLFxyXG4gICAgY2xhc3NlczogW1widGFibGVcIl0sXHJcbiAgICBpbWFnZTogXCJpY29ucy90YWJsZS5zdmdcIixcclxuICAgIG5hbWU6IFwiVGFibGVcIixcclxuICAgIGh0bWw6ICc8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPlxcXHJcblx0XHQgIDx0aGVhZD5cXFxyXG5cdFx0XHQ8dHI+XFxcclxuXHRcdFx0ICA8dGg+IzwvdGg+XFxcclxuXHRcdFx0ICA8dGg+Rmlyc3QgTmFtZTwvdGg+XFxcclxuXHRcdFx0ICA8dGg+TGFzdCBOYW1lPC90aD5cXFxyXG5cdFx0XHQgIDx0aD5Vc2VybmFtZTwvdGg+XFxcclxuXHRcdFx0PC90cj5cXFxyXG5cdFx0ICA8L3RoZWFkPlxcXHJcblx0XHQgIDx0Ym9keT5cXFxyXG5cdFx0XHQ8dHI+XFxcclxuXHRcdFx0ICA8dGggc2NvcGU9XCJyb3dcIj4xPC90aD5cXFxyXG5cdFx0XHQgIDx0ZD5NYXJrPC90ZD5cXFxyXG5cdFx0XHQgIDx0ZD5PdHRvPC90ZD5cXFxyXG5cdFx0XHQgIDx0ZD5AbWRvPC90ZD5cXFxyXG5cdFx0XHQ8L3RyPlxcXHJcblx0XHRcdDx0cj5cXFxyXG5cdFx0XHQgIDx0aCBzY29wZT1cInJvd1wiPjI8L3RoPlxcXHJcblx0XHRcdCAgPHRkPkphY29iPC90ZD5cXFxyXG5cdFx0XHQgIDx0ZD5UaG9ybnRvbjwvdGQ+XFxcclxuXHRcdFx0ICA8dGQ+QGZhdDwvdGQ+XFxcclxuXHRcdFx0PC90cj5cXFxyXG5cdFx0XHQ8dHI+XFxcclxuXHRcdFx0ICA8dGggc2NvcGU9XCJyb3dcIj4zPC90aD5cXFxyXG5cdFx0XHQgIDx0ZD5MYXJyeTwvdGQ+XFxcclxuXHRcdFx0ICA8dGQ+dGhlIEJpcmQ8L3RkPlxcXHJcblx0XHRcdCAgPHRkPkB0d2l0dGVyPC90ZD5cXFxyXG5cdFx0XHQ8L3RyPlxcXHJcblx0XHQgIDwvdGJvZHk+XFxcclxuXHRcdDwvdGFibGU+JyxcclxuICAgIHByb3BlcnRpZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICAgICAgICBrZXk6IFwidHlwZVwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1widGFibGUtcHJpbWFyeVwiLCBcInRhYmxlLXNlY29uZGFyeVwiLCBcInRhYmxlLXN1Y2Nlc3NcIiwgXCJ0YWJsZS1kYW5nZXJcIiwgXCJ0YWJsZS13YXJuaW5nXCIsIFwidGFibGUtaW5mb1wiLCBcInRhYmxlLWxpZ2h0XCIsIFwidGFibGUtZGFya1wiLCBcInRhYmxlLXdoaXRlXCJdLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkRlZmF1bHRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGFibGUtcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiUHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGFibGUtc2Vjb25kYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJTZWNvbmRhcnlcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInRhYmxlLXN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInRhYmxlLWRhbmdlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGFuZ2VyXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0YWJsZS13YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJXYXJuaW5nXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0YWJsZS1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJJbmZvXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0YWJsZS1saWdodFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiTGlnaHRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInRhYmxlLWRhcmtcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhcmtcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInRhYmxlLXdoaXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJXaGl0ZVwiXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiUmVzcG9uc2l2ZVwiLFxyXG4gICAgICAgICAgICBrZXk6IFwicmVzcG9uc2l2ZVwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1widGFibGUtcmVzcG9uc2l2ZVwiXSxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBUb2dnbGVJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb246IFwidGFibGUtcmVzcG9uc2l2ZVwiLFxyXG4gICAgICAgICAgICAgICAgb2ZmOiBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJTbWFsbFwiLFxyXG4gICAgICAgICAgICBrZXk6IFwic21hbGxcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFtcInRhYmxlLXNtXCJdLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvbjogXCJ0YWJsZS1zbVwiLFxyXG4gICAgICAgICAgICAgICAgb2ZmOiBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJIb3ZlclwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiaG92ZXJcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFtcInRhYmxlLWhvdmVyXCJdLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvbjogXCJ0YWJsZS1ob3ZlclwiLFxyXG4gICAgICAgICAgICAgICAgb2ZmOiBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJCb3JkZXJlZFwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiYm9yZGVyZWRcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFtcInRhYmxlLWJvcmRlcmVkXCJdLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvbjogXCJ0YWJsZS1ib3JkZXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgb2ZmOiBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJTdHJpcGVkXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJzdHJpcGVkXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJ0YWJsZS1zdHJpcGVkXCJdLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvbjogXCJ0YWJsZS1zdHJpcGVkXCIsXHJcbiAgICAgICAgICAgICAgICBvZmY6IFwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkludmVyc2VcIixcclxuICAgICAgICAgICAga2V5OiBcImludmVyc2VcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICAgICAgdmFsaWRWYWx1ZXM6IFtcInRhYmxlLWludmVyc2VcIl0sXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9uOiBcInRhYmxlLWludmVyc2VcIixcclxuICAgICAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiSGVhZCBvcHRpb25zXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJoZWFkXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIGNoaWxkOiBcInRoZWFkXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJcIiwgXCJ0aGVhZC1pbnZlcnNlXCIsIFwidGhlYWQtZGVmYXVsdFwiXSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIk5vbmVcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInRoZWFkLWRlZmF1bHRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInRoZWFkLWludmVyc2VcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkludmVyc2VcIlxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YWJsZTsiLCJpbXBvcnQgVnZ2ZWIgZnJvbSAnLi4vLi4vYnVpbGRlcic7XHJcbmltcG9ydCB7IFRleHRWYWx1ZUlucHV0LCBCdXR0b25JbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgJCBmcm9tICcuLi8uLi8uLi9qcy9qcXVlcnkubWluJztcclxuXHJcbmNvbnN0IHNlbGVjdGlucHV0ID0ge1xyXG4gICAgbm9kZXM6IFtcInNlbGVjdFwiXSxcclxuICAgIG5hbWU6IFwiU2VsZWN0IElucHV0XCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9zZWxlY3RfaW5wdXQuc3ZnXCIsXHJcbiAgICBodG1sOiAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jaztcIj48bGFiZWw+Q2hvb3NlIGFuIG9wdGlvbiA8L2xhYmVsPjxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj48b3B0aW9uIHZhbHVlPVwidmFsdWUxXCI+VGV4dCAxPC9vcHRpb24+PG9wdGlvbiB2YWx1ZT1cInZhbHVlMlwiPlRleHQgMjwvb3B0aW9uPjxvcHRpb24gdmFsdWU9XCJ2YWx1ZTNcIj5UZXh0IDM8L29wdGlvbj48L3NlbGVjdD48L2Rpdj4nLFxyXG5cclxuICAgIGJlZm9yZUluaXQ6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgcHJvcGVydGllcyA9IFtdO1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuXHJcbiAgICAgICAgJChub2RlKS5maW5kKCdvcHRpb24nKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGRhdGEgPSB7IFwidmFsdWVcIjogdGhpcy52YWx1ZSwgXCJ0ZXh0XCI6IHRoaXMudGV4dCB9O1xyXG5cclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJPcHRpb24gXCIgKyBpLFxyXG4gICAgICAgICAgICAgICAga2V5OiBcIm9wdGlvblwiICsgaSxcclxuICAgICAgICAgICAgICAgIC8vaW5kZXg6IGkgLSAxLFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uTm9kZTogdGhpcyxcclxuICAgICAgICAgICAgICAgIGlucHV0dHlwZTogVGV4dFZhbHVlSW5wdXQsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSwgaW5wdXQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gJCh0aGlzLm9wdGlvbk5vZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIHJlbW92ZSBidXR0b24gaXMgY2xpY2tlZCByZW1vdmUgb3B0aW9uIGFuZCByZW5kZXIgcm93IHByb3BlcnRpZXNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQubm9kZU5hbWUgPT0gJ0JVVFRPTicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWdnZlYi5Db21wb25lbnRzLnJlbmRlcihcImh0bWwvc2VsZWN0aW5wdXRAZ2VuZXJhbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQubmFtZSA9PSBcInZhbHVlXCIpIG9wdGlvbi5hdHRyKFwidmFsdWVcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0Lm5hbWUgPT0gXCJ0ZXh0XCIpIG9wdGlvbi50ZXh0KHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9yZW1vdmUgYWxsIG9wdGlvbiBwcm9wZXJ0aWVzXHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gdGhpcy5wcm9wZXJ0aWVzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5rZXkuaW5kZXhPZihcIm9wdGlvblwiKSA9PT0gLTE7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vYWRkIHJlbWFpbmluZyBwcm9wZXJ0aWVzIHRvIGdlbmVyYXRlZCBjb2x1bW4gcHJvcGVydGllc1xyXG4gICAgICAgIHByb3BlcnRpZXMucHVzaCh0aGlzLnByb3BlcnRpZXNbMF0pO1xyXG5cclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiT3B0aW9uXCIsXHJcbiAgICAgICAga2V5OiBcIm9wdGlvbjFcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRWYWx1ZUlucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJPcHRpb25cIixcclxuICAgICAgICBrZXk6IFwib3B0aW9uMlwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dFZhbHVlSW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICAgIGtleTogXCJhZGRDaGlsZFwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogQnV0dG9uSW5wdXQsXHJcbiAgICAgICAgZGF0YTogeyB0ZXh0OiBcIkFkZCBvcHRpb25cIiB9LFxyXG4gICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgICAgICAkKG5vZGUpLmFwcGVuZCgnPG9wdGlvbiB2YWx1ZT1cInZhbHVlXCI+VGV4dDwvb3B0aW9uPicpO1xyXG5cclxuICAgICAgICAgICAgLy9yZW5kZXIgY29tcG9uZW50IHByb3BlcnRpZXMgYWdhaW4gdG8gaW5jbHVkZSB0aGUgbmV3IGNvbHVtbiBpbnB1dHNcclxuICAgICAgICAgICAgVnZ2ZWIuQ29tcG9uZW50cy5yZW5kZXIoXCJodG1sL3NlbGVjdGlucHV0QGdlbmVyYWxcIik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2VsZWN0aW5wdXQ7IiwiaW1wb3J0IHsgVGV4dElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGRhdGFDb21wb25lbnRJZCB9IGZyb20gJy4uL2NvbW1vbic7XHJcblxyXG5jb25zdCByYWRpb2J1dHRvbiA9IHtcclxuICAgIG5hbWU6IFwiUmFkaW8gQnV0dG9uXCIsXHJcbiAgICBhdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBcInJhZGlvXCIgfSxcclxuICAgIGltYWdlOiBcImljb25zL3JhZGlvLnN2Z1wiLFxyXG4gICAgaHRtbDogYDxsYWJlbCAke2RhdGFDb21wb25lbnRJZH09XCJodG1sL3JhZGlvYnV0dG9uQGdlbmVyYWxcIiBjbGFzcz1cInJhZGlvXCI+PGlucHV0IHR5cGU9XCJyYWRpb1wiPiBSYWRpbzwvbGFiZWw+YCxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJOYW1lXCIsXHJcbiAgICAgICAga2V5OiBcIm5hbWVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJuYW1lXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlZhbHVlXCIsXHJcbiAgICAgICAga2V5OiBcInZhbHVlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwidmFsdWVcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJhZGlvYnV0dG9uOyIsImltcG9ydCB7IFNlbGVjdElucHV0LCBUb2dnbGVJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgeyBiZ2NvbG9yQ2xhc3NlcywgYmdjb2xvclNlbGVjdE9wdGlvbnMgfSBmcm9tICcuLi9jb21tb24nO1xyXG5cclxuY29uc3QgcHJvZ3Jlc3MgPSB7XHJcbiAgICBjbGFzc2VzOiBbXCJwcm9ncmVzc1wiXSxcclxuICAgIG5hbWU6IFwiUHJvZ3Jlc3MgQmFyXCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9wcm9ncmVzc2Jhci5zdmdcIixcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIj48ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyIHctMjVcIj48L2Rpdj48L2Rpdj4nLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIkJhY2tncm91bmRcIixcclxuICAgICAgICBrZXk6IFwiYmFja2dyb3VuZFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IGJnY29sb3JDbGFzc2VzLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBiZ2NvbG9yU2VsZWN0T3B0aW9uc1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogXCJQcm9ncmVzc1wiLFxyXG4gICAgICAgIGtleTogXCJiYWNrZ3JvdW5kXCIsXHJcbiAgICAgICAgY2hpbGQ6IFwiLnByb2dyZXNzLWJhclwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcIlwiLCBcInctMjVcIiwgXCJ3LTUwXCIsIFwidy03NVwiLCBcInctMTAwXCJdLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIk5vbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJ3LTI1XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIjI1JVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcInctNTBcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiNTAlXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwidy03NVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCI3NSVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJ3LTEwMFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCIxMDAlXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFwiUHJvZ3Jlc3MgYmFja2dyb3VuZFwiLFxyXG4gICAgICAgIGtleTogXCJiYWNrZ3JvdW5kXCIsXHJcbiAgICAgICAgY2hpbGQ6IFwiLnByb2dyZXNzLWJhclwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IGJnY29sb3JDbGFzc2VzLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBiZ2NvbG9yU2VsZWN0T3B0aW9uc1xyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlN0cmlwZWRcIixcclxuICAgICAgICBrZXk6IFwic3RyaXBlZFwiLFxyXG4gICAgICAgIGNoaWxkOiBcIi5wcm9ncmVzcy1iYXJcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJcIiwgXCJwcm9ncmVzcy1iYXItc3RyaXBlZFwiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb246IFwicHJvZ3Jlc3MtYmFyLXN0cmlwZWRcIixcclxuICAgICAgICAgICAgb2ZmOiBcIlwiLFxyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkFuaW1hdGVkXCIsXHJcbiAgICAgICAga2V5OiBcImFuaW1hdGVkXCIsXHJcbiAgICAgICAgY2hpbGQ6IFwiLnByb2dyZXNzLWJhclwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcIlwiLCBcInByb2dyZXNzLWJhci1hbmltYXRlZFwiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb246IFwicHJvZ3Jlc3MtYmFyLWFuaW1hdGVkXCIsXHJcbiAgICAgICAgICAgIG9mZjogXCJcIixcclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJvZ3Jlc3M7IiwiaW1wb3J0IHsgU2VsZWN0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IHBhZ2luYXRpb24gPSB7XHJcbiAgICBjbGFzc2VzOiBbXCJwYWdpbmF0aW9uXCJdLFxyXG4gICAgbmFtZTogXCJQYWdpbmF0aW9uXCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9wYWdpbmF0aW9uLnN2Z1wiLFxyXG4gICAgaHRtbDogJzxuYXYgYXJpYS1sYWJlbD1cIlBhZ2UgbmF2aWdhdGlvbiBleGFtcGxlXCI+XFxcclxuXHQgIDx1bCBjbGFzcz1cInBhZ2luYXRpb25cIj5cXFxyXG5cdFx0PGxpIGNsYXNzPVwicGFnZS1pdGVtXCI+PGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmPVwiI1wiPlByZXZpb3VzPC9hPjwvbGk+XFxcclxuXHRcdDxsaSBjbGFzcz1cInBhZ2UtaXRlbVwiPjxhIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZj1cIiNcIj4xPC9hPjwvbGk+XFxcclxuXHRcdDxsaSBjbGFzcz1cInBhZ2UtaXRlbVwiPjxhIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZj1cIiNcIj4yPC9hPjwvbGk+XFxcclxuXHRcdDxsaSBjbGFzcz1cInBhZ2UtaXRlbVwiPjxhIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZj1cIiNcIj4zPC9hPjwvbGk+XFxcclxuXHRcdDxsaSBjbGFzcz1cInBhZ2UtaXRlbVwiPjxhIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZj1cIiNcIj5OZXh0PC9hPjwvbGk+XFxcclxuXHQgIDwvdWw+XFxcclxuXHQ8L25hdj4nLFxyXG5cclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJTaXplXCIsXHJcbiAgICAgICAga2V5OiBcInNpemVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImJ0bi1sZ1wiLCBcImJ0bi1zbVwiXSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1sZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMYXJnZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1zbVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTbWFsbFwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiQWxpZ25tZW50XCIsXHJcbiAgICAgICAga2V5OiBcImFsaWdubWVudFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wianVzdGlmeS1jb250ZW50LWNlbnRlclwiLCBcImp1c3RpZnktY29udGVudC1lbmRcIl0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkNlbnRlclwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImp1c3RpZnktY29udGVudC1lbmRcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiUmlnaHRcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwYWdpbmF0aW9uOyIsImltcG9ydCB7IFRleHRJbnB1dCwgVG9nZ2xlSW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IHBhZ2VpdGVtID0ge1xyXG4gICAgY2xhc3NlczogW1wicGFnZS1pdGVtXCJdLFxyXG4gICAgaHRtbDogJzxsaSBjbGFzcz1cInBhZ2UtaXRlbVwiPjxhIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZj1cIiNcIj4xPC9hPjwvbGk+JyxcclxuICAgIG5hbWU6IFwiUGFnaW5hdGlvbiBJdGVtXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiTGluayBUb1wiLFxyXG4gICAgICAgIGtleTogXCJocmVmXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiaHJlZlwiLFxyXG4gICAgICAgIGNoaWxkOiBcIi5wYWdlLWxpbmtcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiRGlzYWJsZWRcIixcclxuICAgICAgICBrZXk6IFwiZGlzYWJsZWRcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJkaXNhYmxlZFwiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb246IFwiZGlzYWJsZWRcIixcclxuICAgICAgICAgICAgb2ZmOiBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBhZ2VpdGVtOyIsImltcG9ydCB7IFNlbGVjdElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcbmltcG9ydCB7IGJnY29sb3JDbGFzc2VzLCBiZ2NvbG9yU2VsZWN0T3B0aW9ucyB9IGZyb20gJy4uL2NvbW1vbic7XHJcblxyXG5jb25zdCBuYXZiYXIgPSB7XHJcbiAgICBjbGFzc2VzOiBbXCJuYXZiYXJcIl0sXHJcbiAgICBpbWFnZTogXCJpY29ucy9uYXZiYXIuc3ZnXCIsXHJcbiAgICBuYW1lOiBcIk5hdiBCYXJcIixcclxuICAgIGh0bWw6ICc8bmF2IGNsYXNzPVwibmF2YmFyIG5hdmJhci1leHBhbmQtbGcgbmF2YmFyLWxpZ2h0IGJnLWxpZ2h0XCI+XFxcclxuXHRcdCAgPGEgY2xhc3M9XCJuYXZiYXItYnJhbmRcIiBocmVmPVwiI1wiPk5hdmJhcjwvYT5cXFxyXG5cdFx0ICA8YnV0dG9uIGNsYXNzPVwibmF2YmFyLXRvZ2dsZXJcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtdGFyZ2V0PVwiI25hdmJhclN1cHBvcnRlZENvbnRlbnRcIiBhcmlhLWNvbnRyb2xzPVwibmF2YmFyU3VwcG9ydGVkQ29udGVudFwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIGFyaWEtbGFiZWw9XCJUb2dnbGUgbmF2aWdhdGlvblwiPlxcXHJcblx0XHRcdDxzcGFuIGNsYXNzPVwibmF2YmFyLXRvZ2dsZXItaWNvblwiPjwvc3Bhbj5cXFxyXG5cdFx0ICA8L2J1dHRvbj5cXFxyXG5cdFx0XFxcclxuXHRcdCAgPGRpdiBjbGFzcz1cImNvbGxhcHNlIG5hdmJhci1jb2xsYXBzZVwiIGlkPVwibmF2YmFyU3VwcG9ydGVkQ29udGVudFwiPlxcXHJcblx0XHRcdDx1bCBjbGFzcz1cIm5hdmJhci1uYXYgbXItYXV0b1wiPlxcXHJcblx0XHRcdCAgPGxpIGNsYXNzPVwibmF2LWl0ZW0gYWN0aXZlXCI+XFxcclxuXHRcdFx0XHQ8YSBjbGFzcz1cIm5hdi1saW5rXCIgaHJlZj1cIiNcIj5Ib21lIDxzcGFuIGNsYXNzPVwic3Itb25seVwiPihjdXJyZW50KTwvc3Bhbj48L2E+XFxcclxuXHRcdFx0ICA8L2xpPlxcXHJcblx0XHRcdCAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj5cXFxyXG5cdFx0XHRcdDxhIGNsYXNzPVwibmF2LWxpbmtcIiBocmVmPVwiI1wiPkxpbms8L2E+XFxcclxuXHRcdFx0ICA8L2xpPlxcXHJcblx0XHRcdCAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj5cXFxyXG5cdFx0XHRcdDxhIGNsYXNzPVwibmF2LWxpbmsgZGlzYWJsZWRcIiBocmVmPVwiI1wiPkRpc2FibGVkPC9hPlxcXHJcblx0XHRcdCAgPC9saT5cXFxyXG5cdFx0XHQ8L3VsPlxcXHJcblx0XHRcdDxmb3JtIGNsYXNzPVwiZm9ybS1pbmxpbmUgbXktMiBteS1sZy0wXCI+XFxcclxuXHRcdFx0ICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgbXItc20tMlwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIiBhcmlhLWxhYmVsPVwiU2VhcmNoXCI+XFxcclxuXHRcdFx0ICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXN1Y2Nlc3MgbXktMiBteS1zbS0wXCIgdHlwZT1cInN1Ym1pdFwiPlNlYXJjaDwvYnV0dG9uPlxcXHJcblx0XHRcdDwvZm9ybT5cXFxyXG5cdFx0ICA8L2Rpdj5cXFxyXG5cdFx0PC9uYXY+JyxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiQ29sb3IgdGhlbWVcIixcclxuICAgICAgICBrZXk6IFwiY29sb3JcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJuYXZiYXItbGlnaHRcIiwgXCJuYXZiYXItZGFya1wiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwibmF2YmFyLWxpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpZ2h0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwibmF2YmFyLWRhcmtcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGFya1wiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiQmFja2dyb3VuZCBjb2xvclwiLFxyXG4gICAgICAgIGtleTogXCJiYWNrZ3JvdW5kXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogYmdjb2xvckNsYXNzZXMsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IGJnY29sb3JTZWxlY3RPcHRpb25zXHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiUGxhY2VtZW50XCIsXHJcbiAgICAgICAga2V5OiBcInBsYWNlbWVudFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgdmFsaWRWYWx1ZXM6IFtcImZpeGVkLXRvcFwiLCBcImZpeGVkLWJvdHRvbVwiLCBcInN0aWNreS10b3BcIl0sXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImZpeGVkLXRvcFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJGaXhlZCBUb3BcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJmaXhlZC1ib3R0b21cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRml4ZWQgQm90dG9tXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwic3RpY2t5LXRvcFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTdGlja3kgdG9wXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmF2YmFyOyIsImNvbnN0IGxpc3RpdGVtID0ge1xyXG4gICAgbmFtZTogXCJMaXN0IEl0ZW1cIixcclxuICAgIGNsYXNzZXM6IFtcImxpc3QtZ3JvdXAtaXRlbVwiXSxcclxuICAgIGh0bWw6ICc8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj48c3BhbiBjbGFzcz1cImJhZGdlXCI+MTQ8L3NwYW4+IENyYXMganVzdG8gb2RpbzwvbGk+J1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGlzdGl0ZW07IiwiY29uc3QgbGlzdGdyb3VwID0ge1xyXG4gICAgbmFtZTogXCJMaXN0IEdyb3VwXCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9saXN0X2dyb3VwLnN2Z1wiLFxyXG4gICAgY2xhc3NlczogW1wibGlzdC1ncm91cFwiXSxcclxuICAgIGh0bWw6ICc8dWwgY2xhc3M9XCJsaXN0LWdyb3VwXCI+XFxuICA8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj5cXG4gICAgPHNwYW4gY2xhc3M9XCJiYWRnZVwiPjE0PC9zcGFuPlxcbiAgICBDcmFzIGp1c3RvIG9kaW9cXG4gIDwvbGk+XFxuICA8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj5cXG4gICAgPHNwYW4gY2xhc3M9XCJiYWRnZVwiPjI8L3NwYW4+XFxuICAgIERhcGlidXMgYWMgZmFjaWxpc2lzIGluXFxuICA8L2xpPlxcbiAgPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+XFxuICAgIDxzcGFuIGNsYXNzPVwiYmFkZ2VcIj4xPC9zcGFuPlxcbiAgICBNb3JiaSBsZW8gcmlzdXNcXG4gIDwvbGk+XFxuPC91bD4nXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsaXN0Z3JvdXA7IiwiaW1wb3J0IHsgTGlua0lucHV0LCBUZXh0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGxpbmsgPSB7XHJcbiAgICBub2RlczogW1wiYVwiXSxcclxuICAgIG5hbWU6IFwiTGlua1wiLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIlVybFwiLFxyXG4gICAgICAgIGtleTogXCJocmVmXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiaHJlZlwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogTGlua0lucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJUYXJnZXRcIixcclxuICAgICAgICBrZXk6IFwidGFyZ2V0XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwidGFyZ2V0XCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsaW5rOyIsImltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgbGFiZWwgPSB7XHJcbiAgICBuYW1lOiAnTGFiZWwnLFxyXG4gICAgbm9kZXM6IFsnbGFiZWwnXSxcclxuICAgIGltYWdlOiAnaWNvbnMvbGFiZWwuc3ZnJyxcclxuICAgIGh0bWw6ICc8bGFiZWwgZm9yPVwiXCI+TGFiZWw8L2xhYmVsPicsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6ICdGb3IgaWQnLFxyXG4gICAgICAgIGh0bWxBdHRyOiAnZm9yJyxcclxuICAgICAgICBrZXk6ICdmb3InLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGFiZWw7IiwiY29uc3QganVtYm90cm9uID0ge1xyXG4gICAgY2xhc3NlczogW1wianVtYm90cm9uXCJdLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvanVtYm90cm9uLnN2Z1wiLFxyXG4gICAgbmFtZTogXCJKdW1ib3Ryb25cIixcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwianVtYm90cm9uXCI+XFxcclxuXHRcdCAgPGgxIGNsYXNzPVwiZGlzcGxheS0zXCI+SGVsbG8sIHdvcmxkITwvaDE+XFxcclxuXHRcdCAgPHAgY2xhc3M9XCJsZWFkXCI+VGhpcyBpcyBhIHNpbXBsZSBoZXJvIHVuaXQsIGEgc2ltcGxlIGp1bWJvdHJvbi1zdHlsZSBjb21wb25lbnQgZm9yIGNhbGxpbmcgZXh0cmEgYXR0ZW50aW9uIHRvIGZlYXR1cmVkIGNvbnRlbnQgb3IgaW5mb3JtYXRpb24uPC9wPlxcXHJcblx0XHQgIDxociBjbGFzcz1cIm15LTRcIj5cXFxyXG5cdFx0ICA8cD5JdCB1c2VzIHV0aWxpdHkgY2xhc3NlcyBmb3IgdHlwb2dyYXBoeSBhbmQgc3BhY2luZyB0byBzcGFjZSBjb250ZW50IG91dCB3aXRoaW4gdGhlIGxhcmdlciBjb250YWluZXIuPC9wPlxcXHJcblx0XHQgIDxwIGNsYXNzPVwibGVhZFwiPlxcXHJcblx0XHRcdDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1sZ1wiIGhyZWY9XCIjXCIgcm9sZT1cImJ1dHRvblwiPkxlYXJuIG1vcmU8L2E+XFxcclxuXHRcdCAgPC9wPlxcXHJcblx0XHQ8L2Rpdj4nXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBqdW1ib3Ryb247IiwiaW1wb3J0IFZ2dmViIGZyb20gJy4uLy4uL2J1aWxkZXInXHJcbmltcG9ydCB7IEZpbGVVcGxvYWRJbnB1dCwgVGV4dElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBpbWFnZSA9IHtcclxuICAgIG5vZGVzOiBbXCJpbWdcIl0sXHJcbiAgICBuYW1lOiBcIkltYWdlXCIsXHJcbiAgICBodG1sOiAnPGltZyBzcmM9XCInICsgVnZ2ZWIuYmFzZVVybCArICdpY29ucy9pbWFnZS5zdmdcIiBoZWlnaHQ9XCIxMjhcIiB3aWR0aD1cIjEyOFwiPicsXHJcbiAgICAvKlxyXG4gICAgYWZ0ZXJEcm9wOiBmdW5jdGlvbiAobm9kZSlcclxuXHR7XHJcblx0XHRub2RlLmF0dHIoXCJzcmNcIiwgJycpO1xyXG5cdFx0cmV0dXJuIG5vZGU7XHJcblx0fSwqL1xyXG4gICAgaW1hZ2U6IFwiaWNvbnMvaW1hZ2Uuc3ZnXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiSW1hZ2VcIixcclxuICAgICAgICBrZXk6IFwic3JjXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwic3JjXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBGaWxlVXBsb2FkSW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIldpZHRoXCIsXHJcbiAgICAgICAga2V5OiBcIndpZHRoXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwid2lkdGhcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiSGVpZ2h0XCIsXHJcbiAgICAgICAga2V5OiBcImhlaWdodFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImhlaWdodFwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJBbHRcIixcclxuICAgICAgICBrZXk6IFwiYWx0XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiYWx0XCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbWFnZTsiLCJjb25zdCBociA9IHtcclxuICAgIGltYWdlOiBcImljb25zL2hyLnN2Z1wiLFxyXG4gICAgbm9kZXM6IFtcImhyXCJdLFxyXG4gICAgbmFtZTogXCJIb3Jpem9udGFsIFJ1bGVcIixcclxuICAgIGh0bWw6IFwiPGhyPlwiXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGhyOyIsImltcG9ydCB7IGNoYW5nZU5vZGVOYW1lIH0gZnJvbSAnLi4vY29tbW9uJztcclxuaW1wb3J0IHsgU2VsZWN0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGhlYWRpbmcgPSAge1xyXG4gICAgaW1hZ2U6IFwiaWNvbnMvaGVhZGluZy5zdmdcIixcclxuICAgIG5hbWU6IFwiSGVhZGluZ1wiLFxyXG4gICAgbm9kZXM6IFtcImgxXCIsIFwiaDJcIiwgXCJoM1wiLCBcImg0XCIsIFwiaDVcIiwgXCJoNlwiXSxcclxuICAgIGh0bWw6IFwiPGgxPkhlYWRpbmc8L2gxPlwiLFxyXG5cclxuICAgIHByb3BlcnRpZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiU2l6ZVwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiaWRcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwiaWRcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAobm9kZSwgdmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hhbmdlTm9kZU5hbWUobm9kZSwgXCJoXCIgKyB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlZ2V4O1xyXG4gICAgICAgICAgICAgICAgcmVnZXggPSAvSChcXGQpLy5leGVjKG5vZGUubm9kZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlZ2V4ICYmIHJlZ2V4WzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZ2V4WzFdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCIxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCIxXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCIyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCIyXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCIzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCIzXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCI0XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCI1XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCI2XCJcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGhlYWRpbmc7IiwiaW1wb3J0IHsgR3JpZElucHV0LCBCdXR0b25JbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgJCBmcm9tICcuLi8uLi8uLi9qcy9qcXVlcnkubWluJztcclxuXHJcbmNvbnN0IGdyaWRyb3cgPSB7XHJcbiAgICBuYW1lOiBcIkdyaWQgUm93XCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9ncmlkX3Jvdy5zdmdcIixcclxuICAgIGNsYXNzZXM6IFtcInJvd1wiXSxcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+PGgzPmNvbC1zbS00PC9oMz48L2Rpdj48ZGl2IGNsYXNzPVwiY29sLXNtLTQgY29sLTVcIj48aDM+Y29sLXNtLTQ8L2gzPjwvZGl2PjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPjxoMz5jb2wtc20tNDwvaDM+PC9kaXY+PC9kaXY+JyxcclxuXHJcbiAgICBiZWZvcmVJbml0OiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgIHByb3BlcnRpZXMgPSBbXTtcclxuICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgdmFyIGogPSAwO1xyXG5cclxuICAgICAgICAkKG5vZGUpLmZpbmQoJ1tjbGFzcyo9XCJjb2wtXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF9jbGFzcyA9ICQodGhpcykuYXR0cihcImNsYXNzXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlZyA9IC9jb2wtKFteLVxcJCBdKik/LT8oXFxkKykvZztcclxuICAgICAgICAgICAgdmFyIG1hdGNoO1xyXG4gICAgICAgICAgICBkYXRhID0ge307XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoKG1hdGNoID0gcmVnLmV4ZWMoX2NsYXNzKSkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YVtcImNvbFwiICsgKChtYXRjaFsxXSAhPSB1bmRlZmluZWQpID8gXCJfXCIgKyBtYXRjaFsxXSA6IFwiXCIpXSA9IG1hdGNoWzJdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkNvbHVtbiBcIiArIGksXHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiY29sdW1uXCIgKyBpLFxyXG4gICAgICAgICAgICAgICAgLy9pbmRleDogaSAtIDEsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5Ob2RlOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaW5wdXR0eXBlOiBHcmlkSW5wdXQsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSwgaW5wdXQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb2x1bW4gPSAkKCdbY2xhc3MqPVwiY29sLVwiXTplcSgnICsgdGhpcy5pbmRleCArICcpJywgbm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uID0gJCh0aGlzLmNvbHVtbk5vZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIHJlbW92ZSBidXR0b24gaXMgY2xpY2tlZCByZW1vdmUgY29sdW1uIGFuZCByZW5kZXIgcm93IHByb3BlcnRpZXNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQubm9kZU5hbWUgPT0gJ0JVVFRPTicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWdnZlYi5Db21wb25lbnRzLnJlbmRlcihcImh0bWwvZ3JpZHJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIHNlbGVjdCBpbnB1dCB0aGVuIGNoYW5nZSBjb2x1bW4gY2xhc3NcclxuICAgICAgICAgICAgICAgICAgICBfY2xhc3MgPSBjb2x1bW4uYXR0cihcImNsYXNzXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3JlbW92ZSBwcmV2aW91cyBicmVha3BvaW50IGNvbHVtbiBzaXplXHJcbiAgICAgICAgICAgICAgICAgICAgX2NsYXNzID0gX2NsYXNzLnJlcGxhY2UobmV3IFJlZ0V4cChpbnB1dC5uYW1lICsgJy1cXFxcZCs/JyksICcnKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2FkZCBuZXcgY29sdW1uIHNpemVcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUpIF9jbGFzcyArPSAnICcgKyBpbnB1dC5uYW1lICsgJy0nICsgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uLmF0dHIoXCJjbGFzc1wiLCBfY2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL3JlbW92ZSBhbGwgY29sdW1uIHByb3BlcnRpZXNcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSB0aGlzLnByb3BlcnRpZXMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmtleS5pbmRleE9mKFwiY29sdW1uXCIpID09PSAtMTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9hZGQgcmVtYWluaW5nIHByb3BlcnRpZXMgdG8gZ2VuZXJhdGVkIGNvbHVtbiBwcm9wZXJ0aWVzXHJcbiAgICAgICAgcHJvcGVydGllcy5wdXNoKHRoaXMucHJvcGVydGllc1swXSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJDb2x1bW5cIixcclxuICAgICAgICBrZXk6IFwiY29sdW1uMVwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogR3JpZElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJDb2x1bW5cIixcclxuICAgICAgICBrZXk6IFwiY29sdW1uMVwiLFxyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBjb2w6IDEyLFxyXG4gICAgICAgIGlucHV0dHlwZTogR3JpZElucHV0XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICBrZXk6IFwiYWRkQ2hpbGRcIixcclxuICAgICAgICBpbnB1dHR5cGU6IEJ1dHRvbklucHV0LFxyXG4gICAgICAgIGRhdGE6IHsgdGV4dDogXCJBZGQgY29sdW1uXCIgfSxcclxuICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAgICAgJChub2RlKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJjb2wtM1wiPkNvbC0zPC9kaXY+Jyk7XHJcblxyXG4gICAgICAgICAgICAvL3JlbmRlciBjb21wb25lbnQgcHJvcGVydGllcyBhZ2FpbiB0byBpbmNsdWRlIHRoZSBuZXcgY29sdW1uIGlucHV0c1xyXG4gICAgICAgICAgICBWdnZlYi5Db21wb25lbnRzLnJlbmRlcihcImh0bWwvZ3JpZHJvd1wiKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBncmlkcm93OyIsImltcG9ydCB7IEdyaWRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5pbXBvcnQgJCBmcm9tICcuLi8uLi8uLi9qcy9qcXVlcnkubWluJztcclxuXHJcbmNvbnN0IGdyaWRjb2x1bW4gPSB7XHJcbiAgICBuYW1lOiBcIkdyaWQgQ29sdW1uXCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9ncmlkX3Jvdy5zdmdcIixcclxuICAgIGNsYXNzZXNSZWdleDogW1wiY29sLVwiXSxcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj48aDM+Y29sLXNtLTQ8L2gzPjwvZGl2PicsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiQ29sdW1uXCIsXHJcbiAgICAgICAga2V5OiBcImNvbHVtblwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogR3JpZElucHV0LFxyXG4gICAgICAgIGRhdGE6IHsgaGlkZV9yZW1vdmU6IHRydWUgfSxcclxuXHJcbiAgICAgICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAgICAgX2NsYXNzID0gJChub2RlKS5hdHRyKFwiY2xhc3NcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVnID0gL2NvbC0oW14tXFwkIF0qKT8tPyhcXGQrKS9nO1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2g7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoKG1hdGNoID0gcmVnLmV4ZWMoX2NsYXNzKSkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhW1wiY29sXCIgKyAoKG1hdGNoWzFdICE9IHVuZGVmaW5lZCkgPyBcIl9cIiArIG1hdGNoWzFdIDogXCJcIildID0gbWF0Y2hbMl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKG5vZGUsIHZhbHVlLCBpbnB1dCkge1xyXG4gICAgICAgICAgICBfY2xhc3MgPSBub2RlLmF0dHIoXCJjbGFzc1wiKTtcclxuXHJcbiAgICAgICAgICAgIC8vcmVtb3ZlIHByZXZpb3VzIGJyZWFrcG9pbnQgY29sdW1uIHNpemVcclxuICAgICAgICAgICAgX2NsYXNzID0gX2NsYXNzLnJlcGxhY2UobmV3IFJlZ0V4cChpbnB1dC5uYW1lICsgJy1cXFxcZCs/JyksICcnKTtcclxuICAgICAgICAgICAgLy9hZGQgbmV3IGNvbHVtbiBzaXplXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSkgX2NsYXNzICs9ICcgJyArIGlucHV0Lm5hbWUgKyAnLScgKyB2YWx1ZTtcclxuICAgICAgICAgICAgbm9kZS5hdHRyKFwiY2xhc3NcIiwgX2NsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH0sXHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ3JpZGNvbHVtbjsiLCJpbXBvcnQgeyBUZXh0SW5wdXQsIFNlbGVjdElucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBmb3JtID0ge1xyXG4gICAgbm9kZXM6IFtcImZvcm1cIl0sXHJcbiAgICBpbWFnZTogXCJpY29ucy9mb3JtLnN2Z1wiLFxyXG4gICAgbmFtZTogXCJGb3JtXCIsXHJcbiAgICBodG1sOiAnPGZvcm0gY2xhc3M9XCJkcm9wem9uZVwiPjwvZm9ybT4nLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIlN0eWxlXCIsXHJcbiAgICAgICAga2V5OiBcInN0eWxlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiXCIsIFwiZm9ybS1zZWFyY2hcIiwgXCJmb3JtLWlubGluZVwiLCBcImZvcm0taG9yaXpvbnRhbFwiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiZm9ybS1zZWFyY2hcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU2VhcmNoXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiZm9ybS1pbmxpbmVcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5saW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiZm9ybS1ob3Jpem9udGFsXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhvcml6b250YWxcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkFjdGlvblwiLFxyXG4gICAgICAgIGtleTogXCJhY3Rpb25cIixcclxuICAgICAgICBodG1sQXR0cjogXCJhY3Rpb25cIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiTWV0aG9kXCIsXHJcbiAgICAgICAga2V5OiBcIm1ldGhvZFwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcIm1ldGhvZFwiLFxyXG4gICAgICAgIGlucHV0dHlwZTogVGV4dElucHV0XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZm9ybTsiLCJjb25zdCBmaWxlaW5wdXQgPSB7XHJcbiAgICBuYW1lOiBcIklucHV0IGdyb3VwXCIsXHJcbiAgICBhdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBcImZpbGVcIiB9LFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvdGV4dF9pbnB1dC5zdmdcIixcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxcXHJcblx0XHRcdCAgPGlucHV0IHR5cGU9XCJmaWxlXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cXFxyXG5cdFx0XHQ8L2Rpdj4nXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmaWxlaW5wdXQ7IiwiaW1wb3J0IHsgYmdjb2xvclNlbGVjdE9wdGlvbnMsIGJnY29sb3JDbGFzc2VzIH0gZnJvbSAnLi4vY29tbW9uJztcclxuaW1wb3J0IHsgU2VsZWN0SW5wdXQsIENvbG9ySW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGRpdiA9IHtcclxuICAgIGNsYXNzZXM6IFtcImNvbnRhaW5lclwiLCBcImNvbnRhaW5lci1mbHVpZFwiXSxcclxuICAgIGltYWdlOiBcImljb25zL2Rpdi5zdmdcIixcclxuICAgIGh0bWw6ICc8ZGl2IHN0eWxlPVwid2lkdGg6IDM1MHB4OyBoZWlnaHQ6IDIwMHB4O1wiIGNsYXNzPVwiZHJvcHpvbmVcIj48L2Rpdj4nLFxyXG4gICAgbmFtZTogXCJEaXZcIixcclxuICAgIHByb3BlcnRpZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICAgICAgICBrZXk6IFwidHlwZVwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogW1wiY29udGFpbmVyXCIsIFwiY29udGFpbmVyLWZsdWlkXCJdLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImNvbnRhaW5lclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiY29udGFpbmVyLWZsdWlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJGbHVpZFwiXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiQmFja2dyb3VuZFwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiYmFja2dyb3VuZFwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICB2YWxpZFZhbHVlczogYmdjb2xvckNsYXNzZXMsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IGJnY29sb3JTZWxlY3RPcHRpb25zXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJCYWNrZ3JvdW5kIENvbG9yXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJiYWNrZ3JvdW5kLWNvbG9yXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ29sb3JJbnB1dCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJUZXh0IENvbG9yXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJjb2xvclwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cjogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBpbnB1dHR5cGU6IENvbG9ySW5wdXQsXHJcbiAgICAgICAgfV0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkaXY7IiwiaW1wb3J0IHsgU2VsZWN0SW5wdXQsIENvbG9ySW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuaW1wb3J0IHsgYmdjb2xvckNsYXNzZXMsIGJnY29sb3JTZWxlY3RPcHRpb25zIH0gZnJvbSAnLi4vY29tbW9uJztcclxuXHJcbmNvbnN0IGNvbnRhaW5lciA9IHtcclxuICAgIGNsYXNzZXM6IFtcImNvbnRhaW5lclwiLCBcImNvbnRhaW5lci1mbHVpZFwiXSxcclxuICAgIGltYWdlOiBcImljb25zL2NvbnRhaW5lci5zdmdcIixcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwiY29udGFpbmVyIGRyb3B6b25lXCI+PGRpdiBjbGFzcz1cIm0tNVwiPkNvbnRhaW5lcjwvZGl2PjwvZGl2PicsXHJcbiAgICBuYW1lOiBcIkNvbnRhaW5lclwiLFxyXG4gICAgcHJvcGVydGllczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJUeXBlXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJ0eXBlXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBbXCJjb250YWluZXJcIiwgXCJjb250YWluZXItZmx1aWRcIl0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiY29udGFpbmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJjb250YWluZXItZmx1aWRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkZsdWlkXCJcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJCYWNrZ3JvdW5kXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJiYWNrZ3JvdW5kXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgICAgIHZhbGlkVmFsdWVzOiBiZ2NvbG9yQ2xhc3NlcyxcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogYmdjb2xvclNlbGVjdE9wdGlvbnNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkJhY2tncm91bmQgQ29sb3JcIixcclxuICAgICAgICAgICAga2V5OiBcImJhY2tncm91bmQtY29sb3JcIixcclxuICAgICAgICAgICAgaHRtbEF0dHI6IFwic3R5bGVcIixcclxuICAgICAgICAgICAgaW5wdXR0eXBlOiBDb2xvcklucHV0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlRleHQgQ29sb3JcIixcclxuICAgICAgICAgICAga2V5OiBcImNvbG9yXCIsXHJcbiAgICAgICAgICAgIGh0bWxBdHRyOiBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIGlucHV0dHlwZTogQ29sb3JJbnB1dCxcclxuICAgICAgICB9XSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbnRhaW5lcjtcclxuXHJcbiIsImltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgY2hlY2tib3ggPSB7XHJcbiAgICBuYW1lOiBcIkNoZWNrYm94XCIsXHJcbiAgICBhdHRyaWJ1dGVzOiB7IFwidHlwZVwiOiBcImNoZWNrYm94XCIgfSxcclxuICAgIGltYWdlOiBcImljb25zL2NoZWNrYm94LnN2Z1wiLFxyXG4gICAgaHRtbDogJzxsYWJlbCBjbGFzcz1cImNoZWNrYm94XCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiPiBDaGVja2JveDwvbGFiZWw+JyxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJOYW1lXCIsXHJcbiAgICAgICAga2V5OiBcIm5hbWVcIixcclxuICAgICAgICBodG1sQXR0cjogXCJuYW1lXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlZhbHVlXCIsXHJcbiAgICAgICAga2V5OiBcInZhbHVlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwidmFsdWVcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRleHRJbnB1dFxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNoZWNrYm94OyIsImNvbnN0IGNhcmQgPSB7XHJcbiAgICBjbGFzc2VzOiBbXCJjYXJkXCJdLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvcGFuZWwuc3ZnXCIsXHJcbiAgICBuYW1lOiBcIkNhcmRcIixcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwiY2FyZFwiPlxcXHJcblx0XHQgIDxpbWcgY2xhc3M9XCJjYXJkLWltZy10b3BcIiBzcmM9XCIuLi9saWJzL2J1aWxkZXIvaWNvbnMvaW1hZ2Uuc3ZnXCIgYWx0PVwiQ2FyZCBpbWFnZSBjYXBcIiB3aWR0aD1cIjEyOFwiIGhlaWdodD1cIjEyOFwiPlxcXHJcblx0XHQgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cXFxyXG5cdFx0XHQ8aDQgY2xhc3M9XCJjYXJkLXRpdGxlXCI+Q2FyZCB0aXRsZTwvaDQ+XFxcclxuXHRcdFx0PHAgY2xhc3M9XCJjYXJkLXRleHRcIj5Tb21lIHF1aWNrIGV4YW1wbGUgdGV4dCB0byBidWlsZCBvbiB0aGUgY2FyZCB0aXRsZSBhbmQgbWFrZSB1cCB0aGUgYnVsayBvZiB0aGUgY2FyZFxcJ3MgY29udGVudC48L3A+XFxcclxuXHRcdFx0PGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPkdvIHNvbWV3aGVyZTwvYT5cXFxyXG5cdFx0ICA8L2Rpdj5cXFxyXG5cdFx0PC9kaXY+J1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2FyZDsiLCJjb25zdCBidXR0b250b29sYmFyID0gIHtcclxuICAgIGNsYXNzZXM6IFtcImJ0bi10b29sYmFyXCJdLFxyXG4gICAgbmFtZTogXCJCdXR0b24gVG9vbGJhclwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvYnV0dG9uX3Rvb2xiYXIuc3ZnXCIsXHJcbiAgICBodG1sOiAnPGRpdiBjbGFzcz1cImJ0bi10b29sYmFyXCIgcm9sZT1cInRvb2xiYXJcIiBhcmlhLWxhYmVsPVwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcIj5cXFxyXG5cdFx0ICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIG1yLTJcIiByb2xlPVwiZ3JvdXBcIiBhcmlhLWxhYmVsPVwiRmlyc3QgZ3JvdXBcIj5cXFxyXG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCI+MTwvYnV0dG9uPlxcXHJcblx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIj4yPC9idXR0b24+XFxcclxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiPjM8L2J1dHRvbj5cXFxyXG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCI+NDwvYnV0dG9uPlxcXHJcblx0XHQgIDwvZGl2PlxcXHJcblx0XHQgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXAgbXItMlwiIHJvbGU9XCJncm91cFwiIGFyaWEtbGFiZWw9XCJTZWNvbmQgZ3JvdXBcIj5cXFxyXG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCI+NTwvYnV0dG9uPlxcXHJcblx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIj42PC9idXR0b24+XFxcclxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiPjc8L2J1dHRvbj5cXFxyXG5cdFx0ICA8L2Rpdj5cXFxyXG5cdFx0ICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCIgYXJpYS1sYWJlbD1cIlRoaXJkIGdyb3VwXCI+XFxcclxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiPjg8L2J1dHRvbj5cXFxyXG5cdFx0ICA8L2Rpdj5cXFxyXG5cdFx0PC9kaXY+J1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnV0dG9udG9vbGJhcjsiLCJpbXBvcnQgeyBTZWxlY3RJbnB1dCB9IGZyb20gJy4uLy4uL2lucHV0cy9pbnB1dHMnO1xyXG5cclxuY29uc3QgYnV0dG9uZ3JvdXAgPSB7XHJcbiAgICBjbGFzc2VzOiBbXCJidG4tZ3JvdXBcIl0sXHJcbiAgICBuYW1lOiBcIkJ1dHRvbiBHcm91cFwiLFxyXG4gICAgaW1hZ2U6IFwiaWNvbnMvYnV0dG9uX2dyb3VwLnN2Z1wiLFxyXG4gICAgaHRtbDogJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIiBhcmlhLWxhYmVsPVwiQmFzaWMgZXhhbXBsZVwiPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIj5MZWZ0PC9idXR0b24+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiPk1pZGRsZTwvYnV0dG9uPiA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCI+UmlnaHQ8L2J1dHRvbj48L2Rpdj4nLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIlNpemVcIixcclxuICAgICAgICBrZXk6IFwic2l6ZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiYnRuLWdyb3VwLWxnXCIsIFwiYnRuLWdyb3VwLXNtXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWdyb3VwLWxnXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxhcmdlXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWdyb3VwLXNtXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlNtYWxsXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJBbGlnbm1lbnRcIixcclxuICAgICAgICBrZXk6IFwiYWxpZ25tZW50XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJidG4tZ3JvdXBcIiwgXCJidG4tZ3JvdXAtdmVydGljYWxcIl0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tZ3JvdXBcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSG9yaXpvbnRhbFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1ncm91cC12ZXJ0aWNhbFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJWZXJ0aWNhbFwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1dHRvbmdyb3VwOyIsImltcG9ydCB7IExpbmtJbnB1dCwgU2VsZWN0SW5wdXQsIFRleHRJbnB1dCwgVG9nZ2xlSW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGJ1dHRvbiA9IHtcclxuICAgIGNsYXNzZXM6IFtcImJ0blwiLCBcImJ0bi1saW5rXCJdLFxyXG4gICAgbmFtZTogXCJCdXR0b25cIixcclxuICAgIGltYWdlOiBcImljb25zL2J1dHRvbi5zdmdcIixcclxuICAgIGh0bWw6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPlByaW1hcnk8L2J1dHRvbj4nLFxyXG4gICAgcHJvcGVydGllczogW3tcclxuICAgICAgICBuYW1lOiBcIkxpbmsgVG9cIixcclxuICAgICAgICBrZXk6IFwiaHJlZlwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImhyZWZcIixcclxuICAgICAgICBpbnB1dHR5cGU6IExpbmtJbnB1dFxyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICAgIGtleTogXCJ0eXBlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJidG4tZGVmYXVsdFwiLCBcImJ0bi1wcmltYXJ5XCIsIFwiYnRuLWluZm9cIiwgXCJidG4tc3VjY2Vzc1wiLCBcImJ0bi13YXJuaW5nXCIsIFwiYnRuLWluZm9cIiwgXCJidG4tbGlnaHRcIiwgXCJidG4tZGFya1wiLCBcImJ0bi1vdXRsaW5lLXByaW1hcnlcIiwgXCJidG4tb3V0bGluZS1pbmZvXCIsIFwiYnRuLW91dGxpbmUtc3VjY2Vzc1wiLCBcImJ0bi1vdXRsaW5lLXdhcm5pbmdcIiwgXCJidG4tb3V0bGluZS1pbmZvXCIsIFwiYnRuLW91dGxpbmUtbGlnaHRcIiwgXCJidG4tb3V0bGluZS1kYXJrXCIsIFwiYnRuLWxpbmtcIl0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWRlZmF1bHRcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlByaW1hcnlcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4gYnRuLWluZm9cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1zdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4td2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJXYXJuaW5nXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWluZm9cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1saWdodFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJMaWdodFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1kYXJrXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhcmtcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tb3V0bGluZS1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlByaW1hcnkgb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0biBidG4tb3V0bGluZS1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm8gb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1vdXRsaW5lLXN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU3VjY2VzcyBvdXRsaW5lXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLW91dGxpbmUtd2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJXYXJuaW5nIG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tb3V0bGluZS1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZm8gb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1vdXRsaW5lLWxpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpZ2h0IG91dGxpbmVcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJidG4tb3V0bGluZS1kYXJrXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhcmsgb3V0bGluZVwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJ0bi1saW5rXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpbmtcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIlNpemVcIixcclxuICAgICAgICBrZXk6IFwic2l6ZVwiLFxyXG4gICAgICAgIGh0bWxBdHRyOiBcImNsYXNzXCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBTZWxlY3RJbnB1dCxcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiYnRuLWxnXCIsIFwiYnRuLXNtXCJdLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEZWZhdWx0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLWxnXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxhcmdlXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYnRuLXNtXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlNtYWxsXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogXCJUYXJnZXRcIixcclxuICAgICAgICBrZXk6IFwidGFyZ2V0XCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwidGFyZ2V0XCIsXHJcbiAgICAgICAgaW5wdXR0eXBlOiBUZXh0SW5wdXRcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiBcIkRpc2FibGVkXCIsXHJcbiAgICAgICAga2V5OiBcImRpc2FibGVkXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICBpbnB1dHR5cGU6IFRvZ2dsZUlucHV0LFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJkaXNhYmxlZFwiXSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9uOiBcImRpc2FibGVkXCIsXHJcbiAgICAgICAgICAgIG9mZjogXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidXR0b247IiwiY29uc3QgYnJlYWRjcnVtYnMgPSAge1xyXG4gICAgY2xhc3NlczogW1wiYnJlYWRjcnVtYlwiXSxcclxuICAgIG5hbWU6IFwiQnJlYWRjcnVtYnNcIixcclxuICAgIGltYWdlOiBcImljb25zL2JyZWFkY3J1bWJzLnN2Z1wiLFxyXG4gICAgaHRtbDogJzxvbCBjbGFzcz1cImJyZWFkY3J1bWJcIj5cXFxyXG5cdFx0ICA8bGkgY2xhc3M9XCJicmVhZGNydW1iLWl0ZW0gYWN0aXZlXCI+PGEgaHJlZj1cIiNcIj5Ib21lPC9hPjwvbGk+XFxcclxuXHRcdCAgPGxpIGNsYXNzPVwiYnJlYWRjcnVtYi1pdGVtIGFjdGl2ZVwiPjxhIGhyZWY9XCIjXCI+TGlicmFyeTwvYT48L2xpPlxcXHJcblx0XHQgIDxsaSBjbGFzcz1cImJyZWFkY3J1bWItaXRlbSBhY3RpdmVcIj5EYXRhIDM8L2xpPlxcXHJcblx0XHQ8L29sPidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJyZWFkY3J1bWJzOyIsImltcG9ydCB7IFRvZ2dsZUlucHV0IH0gZnJvbSAnLi4vLi4vaW5wdXRzL2lucHV0cyc7XHJcblxyXG5jb25zdCBicmVhZGNydW1iaXRlbSA9IHtcclxuICAgIGNsYXNzZXM6IFtcImJyZWFkY3J1bWItaXRlbVwiXSxcclxuICAgIG5hbWU6IFwiQnJlYWRjcnVtYiBJdGVtXCIsXHJcbiAgICBodG1sOiAnPGxpIGNsYXNzPVwiYnJlYWRjcnVtYi1pdGVtXCI+PGEgaHJlZj1cIiNcIj5MaWJyYXJ5PC9hPjwvbGk+JyxcclxuICAgIHByb3BlcnRpZXM6IFt7XHJcbiAgICAgICAgbmFtZTogXCJBY3RpdmVcIixcclxuICAgICAgICBrZXk6IFwiYWN0aXZlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiXCIsIFwiYWN0aXZlXCJdLFxyXG4gICAgICAgIGlucHV0dHlwZTogVG9nZ2xlSW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvbjogXCJhY3RpdmVcIixcclxuICAgICAgICAgICAgb2ZmOiBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnJlYWRjcnVtYml0ZW07IiwiaW1wb3J0IHsgU2VsZWN0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGJhZGdlID0ge1xyXG4gICAgY2xhc3NlczogW1wiYmFkZ2VcIl0sXHJcbiAgICBpbWFnZTogXCJpY29ucy9iYWRnZS5zdmdcIixcclxuICAgIG5hbWU6IFwiQmFkZ2VcIixcclxuICAgIGh0bWw6ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXByaW1hcnlcIj5QcmltYXJ5IGJhZGdlPC9zcGFuPicsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiQ29sb3JcIixcclxuICAgICAgICBrZXk6IFwiY29sb3JcIixcclxuICAgICAgICBodG1sQXR0cjogXCJjbGFzc1wiLFxyXG4gICAgICAgIHZhbGlkVmFsdWVzOiBbXCJiYWRnZS1wcmltYXJ5XCIsIFwiYmFkZ2Utc2Vjb25kYXJ5XCIsIFwiYmFkZ2Utc3VjY2Vzc1wiLCBcImJhZGdlLWRhbmdlclwiLCBcImJhZGdlLXdhcm5pbmdcIiwgXCJiYWRnZS1pbmZvXCIsIFwiYmFkZ2UtbGlnaHRcIiwgXCJiYWRnZS1kYXJrXCJdLFxyXG4gICAgICAgIGlucHV0dHlwZTogU2VsZWN0SW5wdXQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRlZmF1bHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJiYWRnZS1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlByaW1hcnlcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJiYWRnZS1zZWNvbmRhcnlcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU2Vjb25kYXJ5XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYmFkZ2Utc3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTdWNjZXNzXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYmFkZ2Utd2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJXYXJuaW5nXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYmFkZ2UtZGFuZ2VyXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhbmdlclwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJhZGdlLWluZm9cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5mb1wiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImJhZGdlLWxpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpZ2h0XCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYmFkZ2UtZGFya1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJEYXJrXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICB9XVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYmFkZ2U7IiwiaW1wb3J0IHsgU2VsZWN0SW5wdXQgfSBmcm9tICcuLi8uLi9pbnB1dHMvaW5wdXRzJztcclxuXHJcbmNvbnN0IGFsZXJ0ID0ge1xyXG4gICAgY2xhc3NlczogW1wiYWxlcnRcIl0sXHJcbiAgICBuYW1lOiBcIkFsZXJ0XCIsXHJcbiAgICBpbWFnZTogXCJpY29ucy9hbGVydC5zdmdcIixcclxuICAgIGh0bWw6ICc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtd2FybmluZyBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj5cXFxyXG5cdFx0ICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cXFxyXG5cdFx0XHQ8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxcXHJcblx0XHQgIDwvYnV0dG9uPlxcXHJcblx0XHQgIDxzdHJvbmc+SG9seSBndWFjYW1vbGUhPC9zdHJvbmc+IFlvdSBzaG91bGQgY2hlY2sgaW4gb24gc29tZSBvZiB0aG9zZSBmaWVsZHMgYmVsb3cuXFxcclxuXHRcdDwvZGl2PicsXHJcbiAgICBwcm9wZXJ0aWVzOiBbe1xyXG4gICAgICAgIG5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICAgIGtleTogXCJ0eXBlXCIsXHJcbiAgICAgICAgaHRtbEF0dHI6IFwiY2xhc3NcIixcclxuICAgICAgICB2YWxpZFZhbHVlczogW1wiYWxlcnQtcHJpbWFyeVwiLCBcImFsZXJ0LXNlY29uZGFyeVwiLCBcImFsZXJ0LXN1Y2Nlc3NcIiwgXCJhbGVydC1kYW5nZXJcIiwgXCJhbGVydC13YXJuaW5nXCIsIFwiYWxlcnQtaW5mb1wiLCBcImFsZXJ0LWxpZ2h0XCIsIFwiYWxlcnQtZGFya1wiXSxcclxuICAgICAgICBpbnB1dHR5cGU6IFNlbGVjdElucHV0LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImFsZXJ0LXByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVmYXVsdFwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImFsZXJ0LXNlY29uZGFyeVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTZWNvbmRhcnlcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJhbGVydC1zdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJhbGVydC1kYW5nZXJcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGFuZ2VyXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYWxlcnQtd2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJXYXJuaW5nXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYWxlcnQtaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJJbmZvXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiYWxlcnQtbGlnaHRcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiTGlnaHRcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJhbGVydC1kYXJrXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRhcmtcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhbGVydDsiXX0=
