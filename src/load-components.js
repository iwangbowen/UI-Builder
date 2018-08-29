import Vvveb from './builder';
import * as _general from './components/@general/components';
import * as _oee from './components/@oee/components';
import * as _oee_ids from './components/@oee/ids';
import element from './components/element';
// import border from './components/border';
// import padding from './components/padding';
// import display from './components/display';
// import typography from './components/typography';
// import size from './components/size';
// import margin from './components/margin';

Vvveb.ComponentsGroup['定制组件'] =
    ['html/labeldiv@oee', _oee_ids.buttonid, 'html/textinput@oee', 'html/calendar@oee', _oee_ids.fileinputid, _oee_ids.multivalueselectid, _oee_ids.autoselectinputid, _oee_ids.manualselectinputid,
        _oee_ids.textareaid, 'html/radiobutton@oee', 'html/checkbox@oee', _oee_ids.customtableid, _oee_ids.commontableid];

Vvveb.ComponentsGroup['通用组件'] = [];
// Vvveb.ComponentsGroup['通用组件'] =
//     ['html/label@general', 'html/div@general', 'html/button@general', 'html/buttongroup@general',
//         'html/buttontoolbar@general', 'html/form@general', 'html/textinput@general', 'html/textareainput@general',
//         'html/selectinput@general', 'html/fileinput@general', 'html/checkbox@general', 'html/radiobutton@general',
//         'html/table@general', 'html/heading@general', 'html/image@general', 'html/jumbotron@general',
//         'html/alert@general', 'html/card@general', 'html/listgroup@general', 'html/hr@general', 'html/taglabel@general',
//         'html/badge@general', 'html/progress@general', 'html/navbar@general', 'html/breadcrumbs@general', 'html/pagination@general',
//         'html/container@general', 'html/gridrow@general'];

Vvveb.Components.add("_base", element);
// Vvveb.Components.extend("_base", "_base", display);
// Vvveb.Components.extend("_base", "_base", typography)
// Vvveb.Components.extend("_base", "_base", size);
// Vvveb.Components.extend("_base", "_base", margin);
// Vvveb.Components.extend("_base", "_base", padding);
// Vvveb.Components.extend("_base", "_base", border);

// Vvveb.Components.extend("_base", "html/div@general", _general.div);
// Vvveb.Components.extend("_base", "html/label@general", _general.label);
// Vvveb.Components.extend("_base", "html/button@general", _general.button);
// Vvveb.Components.extend("_base", "html/container@general", _general.container);
// Vvveb.Components.extend("_base", "html/heading@general", _general.heading);
// Vvveb.Components.extend("_base", "html/link@general", _general.link);
// Vvveb.Components.extend("_base", "html/image@general", _general.image);
// Vvveb.Components.add("html/hr@general", _general.hr);
// Vvveb.Components.extend("_base", "html/buttongroup@general", _general.buttongroup);
// Vvveb.Components.extend("_base", "html/buttontoolbar@general", _general.buttontoolbar);
// Vvveb.Components.extend("_base", "html/alert@general", _general.alert);
// Vvveb.Components.extend("_base", "html/badge@general", _general.badge);
// Vvveb.Components.extend("_base", "html/card@general", _general.card);
// Vvveb.Components.extend("_base", "html/listgroup@general", _general.listgroup);
// Vvveb.Components.extend("_base", "html/listitem@general", _general.listitem);
// Vvveb.Components.extend("_base", "html/breadcrumbs@general", _general.breadcrumbs);
// Vvveb.Components.extend("_base", "html/breadcrumbitem@general", _general.breadcrumbitem);
// Vvveb.Components.extend("_base", "html/pagination@general", _general.pagination);
// Vvveb.Components.extend("_base", "html/pageitem@general", _general.pageitem);
// Vvveb.Components.extend("_base", "html/progress@general", _general.progress);
// Vvveb.Components.extend("_base", "html/jumbotron@general", _general.jumbotron);
// Vvveb.Components.extend("_base", "html/navbar@general", _general.navbar);
// Vvveb.Components.extend("_base", "html/form@general", _general.form);
// Vvveb.Components.extend("_base", "html/textinput@general", _general.textinput);
// Vvveb.Components.extend("_base", "html/selectinput@general", _general.selectinput);
// Vvveb.Components.extend("_base", "html/textareainput@general", _general.textareainput);
// Vvveb.Components.extend("_base", "html/radiobutton@general", _general.radiobutton);
// Vvveb.Components.extend("_base", "html/checkbox@general", _general.checkbox);
// Vvveb.Components.extend("_base", "html/fileinput@general", _general.fileinput);
// Vvveb.Components.extend("_base", "html/table@general", _general.table);
// Vvveb.Components.extend("_base", "html/tablerow@general", _general.tablerow);
// Vvveb.Components.extend("_base", "html/tablecell@general", _general.tablecell);
// Vvveb.Components.extend("_base", "html/tableheadercell@general", _general.tableheadercell);
// Vvveb.Components.extend("_base", "html/tablehead@general", _general.tablehead);
// Vvveb.Components.extend("_base", "html/tablebody@general", _general.tablebody);
// Vvveb.Components.add("html/gridcolumn@general", _general.gridcolumn);
// Vvveb.Components.add("html/gridrow@general", _general.gridrow);

Vvveb.Components.add('html/labeldiv@oee', _oee.labeldiv);
Vvveb.Components.extend('_base', 'html/textinput@oee', _oee.textinput);
Vvveb.Components.extend('_base', _oee_ids.buttonid, _oee.button);
Vvveb.Components.extend('_base', 'html/radiobutton@oee', _oee.radiobutton);
Vvveb.Components.extend('_base', 'html/span@oee', _oee.span);
Vvveb.Components.extend('_base', 'html/checkbox@oee', _oee.checkbox);
Vvveb.Components.extend('_base', 'html/selectinput@oee', _oee.selectinput);
Vvveb.Components.extend('_base', 'html/calendar@oee', _oee.calendar);
Vvveb.Components.extend('_base', 'html/text@oee', _oee.text);
Vvveb.Components.extend('_base', _oee_ids.autoselectinputid, _oee.autoselectinput);
Vvveb.Components.extend('_base', _oee_ids.manualselectinputid, _oee.manualselectinput);
Vvveb.Components.extend('_base', _oee_ids.tableid, _oee.table);
Vvveb.Components.extend('_base', _oee_ids.customtableid, _oee.customtable);
Vvveb.Components.extend('_base', _oee_ids.commontableid, _oee.commontable);
Vvveb.Components.extend('_base', _oee_ids.multivalueselectid, _oee.multivalueselect);
Vvveb.Components.extend('_base', _oee_ids.textareaid, _oee.textareainput);
Vvveb.Components.extend('_base', _oee_ids.fileinputid, _oee.fileinput);

