import Components from './gui/components'
import * as _general from './components/@general/components';
import * as _common from './components/@common/components';
import * as _common_ids from './components/@common/ids';
import element from './components/element';
import border from './components/border';
import padding from './components/padding';
import display from './components/display';
import typography from './components/typography';
import size from './components/size';
import margin from './components/margin';

const ComponentsGroup = {};

// ComponentsGroup['定制组件'] = [
//     _common_ids.textinputfieldid,
//     _common_ids.datetimeinputfieldid,
//     _common_ids.fileinputfieldid,
//     _common_ids.autoselectinputfieldid,
//     _common_ids.manualselectinputfieldid,
//     _common_ids.multivalueselectinputfieldid,
//     _common_ids.textareafieldid,
//     _common_ids.radiofieldid,
//     _common_ids.checkboxfieldid
// ];

ComponentsGroup['通用组件'] = [
    _common_ids.formid,
    _common_ids.divid,
    _common_ids.commontableid,
    _common_ids.labelid,
    _common_ids.buttonid,
    _common_ids.roundedbuttonid,
    _common_ids.bootstrapbuttongroupid,
    _common_ids.bootstraptextinputfieldid,
    _common_ids.bootstrapdatetimeinputfieldid,
    _common_ids.bootstrapfileinputfieldid,
    _common_ids.bootstrapautoselectinputfieldid,
    _common_ids.bootstrapmanualselectinputfieldid,
    _common_ids.bootstraptextareafieldid,
    _common_ids.bootstrapradiofieldid,
    _common_ids.bootstrapcheckboxfieldid,
    _common_ids.tabsid,
    _common_ids.bootstrapheadingid,
    _common_ids.bootstrapalertid,
    _common_ids.bootstraphrid,
    _common_ids.bootstrapprogressid,
    _common_ids.imageid,
    _common_ids.chartid,
    _common_ids.bootstraptableid,
    _common_ids.bootstrapcontainerid,
    _common_ids.gridrowid,
];

Components.add("_base", element);
Components.extend("_base", "_base", size);
Components.extend("_base", "_base", display);
Components.extend("_base", "_base", typography)
Components.extend("_base", "_base", margin);
Components.extend("_base", "_base", padding);
Components.extend("_base", "_base", border);

// Components.extend('_base', _common_ids.textinputid, _common.textinput);
// Components.extend('_base', _common_ids.textinputfieldid, _common.textinputfield);
// Components.extend('_base', _common_ids.datetimeinputid, _common.datetimeinput);
// Components.extend('_base', _common_ids.datetimeinputfieldid, _common.datetimeinputfield);
// Components.extend('_base', _common_ids.fileinputid, _common.fileinput);
// Components.extend('_base', _common_ids.fileinputfieldid, _common.fileinputfield);
// Components.extend('_base', _common_ids.radioid, _common.radio);
// Components.extend('_base', _common_ids.radiofieldid, _common.radiofield);
// Components.extend('_base', _common_ids.checkboxid, _common.checkbox);
// Components.extend('_base', _common_ids.checkboxfieldid, _common.checkboxfield);
// Components.extend('_base', _common_ids.selectinputid, _common.selectinput);
// Components.extend('_base', _common_ids.autoselectinputid, _common.autoselectinput);
// Components.extend('_base', _common_ids.autoselectinputfieldid, _common.autoselectinputfield);
// Components.extend('_base', _common_ids.manualselectinputid, _common.manualselectinput);
// Components.extend('_base', _common_ids.manualselectinputfieldid, _common.manualselectinputfield);
// Components.extend('_base', _common_ids.multivalueselectinputid, _common.multivalueselectinput);
// Components.extend('_base', _common_ids.multivalueselectinputfieldid, _common.multivalueselectinputfield);
// Components.extend('_base', _common_ids.textareaid, _common.textareainput);
// Components.extend('_base', _common_ids.textareafieldid, _common.textareainputfield);

Components.add('html/labeldiv@common', _common.labeldiv);
Components.extend("_base", _common_ids.divid, _common.div);
Components.extend('_base', _common_ids.gridrowid, _common.gridrow);
Components.extend('_base', _common_ids.gridcolumnid, _common.gridcolumn);
Components.extend('_base', _common_ids.formid, _common.form);
Components.extend('_base', _common_ids.roundedbuttonid, _common.roundedbutton);
Components.extend('_base', _common_ids.buttonid, _common.button);
Components.extend('_base', _common_ids.spanid, _common.span);
Components.extend('_base', _common_ids.textid, _common.text);
Components.extend('_base', _common_ids.tableid, _common.table);
Components.extend('_base', _common_ids.customtableid, _common.customtable);
Components.extend('_base', _common_ids.commontableid, _common.commontable);
Components.extend('_base', _common_ids.formlabelid, _common.formlabel);
Components.extend("_base", _common_ids.labelid, _common.label);
Components.extend("_base", _common_ids.imageid, _common.image);
Components.extend("_base", _common_ids.chartid, _common.chart);
Components.extend("_base", _common_ids.tabsid, _common.tabs);
Components.extend("_base", _common_ids.bodyid, _common.body);

Components.extend("_base", _common_ids.bootstraptextinputid, _common.bootstraptextinput);
Components.extend("_base", _common_ids.bootstraptextinputfieldid, _common.bootstraptextinputfield);
Components.extend("_base", _common_ids.bootstraptextareaid, _common.bootstraptextareainput);
Components.extend("_base", _common_ids.bootstraptextareafieldid, _common.bootstraptextareainputfield);
Components.extend("_base", _common_ids.bootstrapfileinputid, _common.bootstrapfileinput);
Components.extend("_base", _common_ids.bootstrapfileinputfieldid, _common.bootstrapfileinputfield);
Components.extend("_base", _common_ids.bootstrapautoselectinputid, _common.bootstrapautoselectinput);
Components.extend("_base", _common_ids.bootstrapautoselectinputfieldid, _common.bootstrapautoselectinputfield);
Components.extend("_base", _common_ids.bootstrapmanualselectinputid, _common.bootstrapmanualselectinput);
Components.extend("_base", _common_ids.bootstrapmanualselectinputfieldid, _common.bootstrapmanualselectinputfield);
Components.extend("_base", _common_ids.bootstrapradioid, _common.bootstrapradio);
Components.extend("_base", _common_ids.bootstrapradiofieldid, _common.bootstrapradiofield);
Components.extend("_base", _common_ids.bootstrapcheckboxid, _common.bootstrapcheckbox);
Components.extend("_base", _common_ids.bootstrapcheckboxfieldid, _common.bootstrapcheckboxfield);
Components.extend("_base", _common_ids.bootstrapdatetimeinputid, _common.bootstrapdatetimeinput);
Components.extend("_base", _common_ids.bootstrapdatetimeinputfieldid, _common.bootstrapdatetimeinputfield);
Components.extend("_base", _common_ids.bootstrapalertid, _common.bootstrapalert);
Components.extend("_base", _common_ids.bootstrapbuttongroupid, _common.bootstrapbuttongroup);
Components.extend("_base", _common_ids.bootstrapheadingid, _common.bootstrapheading);
Components.extend("_base", _common_ids.bootstraphrid, _common.bootstraphr);
Components.extend("_base", _common_ids.bootstrapprogressid, _common.bootstrapprogress);
Components.extend("_base", _common_ids.bootstraptableid, _common.bootstraptable);
Components.extend("_base", _common_ids.bootstraptableheadercellid, _common.bootstraptableheadercell);
Components.extend("_base", _common_ids.bootstraptableheadid, _common.bootstraptablehead);
Components.extend("_base", _common_ids.bootstraptablerowid, _common.bootstraptablerow);
Components.extend("_base", _common_ids.bootstraptablecellid, _common.bootstraptablecell);
Components.extend("_base", _common_ids.bootstraptablebodyid, _common.bootstraptablebody);
Components.extend("_base", _common_ids.bootstrapcontainerid, _common.bootstrapcontainer);

export default ComponentsGroup;