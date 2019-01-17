import Vvveb from './gui/components';
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

Vvveb.ComponentsGroup['定制组件'] = [
    _common_ids.textinputfieldid,
    _common_ids.datetimeinputfieldid,
    _common_ids.fileinputfieldid,
    _common_ids.autoselectinputfieldid,
    _common_ids.manualselectinputfieldid,
    _common_ids.multivalueselectinputfieldid,
    _common_ids.textareafieldid,
    _common_ids.radiofieldid,
    _common_ids.checkboxfieldid,
    _common_ids.popuptextinputid,
    _common_ids.popupmanualselectinputid,
    _common_ids.popuptextareaid
];

Vvveb.ComponentsGroup['通用组件'] = [
    _common_ids.divid,
    _common_ids.formid,
    _common_ids.commontableid,
    _common_ids.tabsid,
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
    _common_ids.imageid,
    _common_ids.chartid,
    _common_ids.bootstrapheadingid,
    _common_ids.bootstrapalertid,
    _common_ids.bootstraphrid,
    _common_ids.bootstrapprogressid,
    _common_ids.bootstraptableid,
    _common_ids.labelfieldid,
    _common_ids.bootstrapcontainerid,
    _common_ids.gridrowid,
];

Vvveb.Components.add("_base", element);
Vvveb.Components.extend("_base", "_base", size);
Vvveb.Components.extend("_base", "_base", display);
Vvveb.Components.extend("_base", "_base", typography)
Vvveb.Components.extend("_base", "_base", margin);
Vvveb.Components.extend("_base", "_base", padding);
Vvveb.Components.extend("_base", "_base", border);

Vvveb.Components.add('html/labeldiv@common', _common.labeldiv);
Vvveb.Components.extend("_base", _common_ids.divid, _common.div);
Vvveb.Components.extend('_base', _common_ids.gridrowid, _common.gridrow);
Vvveb.Components.extend('_base', _common_ids.gridcolumnid, _common.gridcolumn);
Vvveb.Components.extend('_base', _common_ids.formid, _common.form);
Vvveb.Components.extend('_base', _common_ids.textinputid, _common.textinput);
Vvveb.Components.extend('_base', _common_ids.datetimeinputid, _common.datetimeinput);
Vvveb.Components.extend('_base', _common_ids.datetimeinputfieldid, _common.datetimeinputfield);
Vvveb.Components.extend('_base', _common_ids.roundedbuttonid, _common.roundedbutton);
Vvveb.Components.extend('_base', _common_ids.buttonid, _common.button);
Vvveb.Components.extend('_base', _common_ids.textinputfieldid, _common.textinputfield);
Vvveb.Components.extend('_base', _common_ids.radioid, _common.radio);
Vvveb.Components.extend('_base', _common_ids.radiofieldid, _common.radiofield);
Vvveb.Components.extend('_base', _common_ids.spanid, _common.span);
Vvveb.Components.extend('_base', _common_ids.checkboxid, _common.checkbox);
Vvveb.Components.extend('_base', _common_ids.checkboxfieldid, _common.checkboxfield);
Vvveb.Components.extend('_base', _common_ids.selectinputid, _common.selectinput);
Vvveb.Components.extend('_base', _common_ids.textid, _common.text);
Vvveb.Components.extend('_base', _common_ids.autoselectinputid, _common.autoselectinput);
Vvveb.Components.extend('_base', _common_ids.autoselectinputfieldid, _common.autoselectinputfield);
Vvveb.Components.extend('_base', _common_ids.manualselectinputid, _common.manualselectinput);
Vvveb.Components.extend('_base', _common_ids.manualselectinputfieldid, _common.manualselectinputfield);
Vvveb.Components.extend('_base', _common_ids.multivalueselectinputid, _common.multivalueselectinput);
Vvveb.Components.extend('_base', _common_ids.multivalueselectinputfieldid, _common.multivalueselectinputfield);
Vvveb.Components.extend('_base', _common_ids.tableid, _common.table);
Vvveb.Components.extend('_base', _common_ids.customtableid, _common.customtable);
Vvveb.Components.extend('_base', _common_ids.commontableid, _common.commontable);
Vvveb.Components.extend('_base', _common_ids.textareaid, _common.textareainput);
Vvveb.Components.extend('_base', _common_ids.textareafieldid, _common.textareainputfield);
Vvveb.Components.extend('_base', _common_ids.fileinputid, _common.fileinput);
Vvveb.Components.extend('_base', _common_ids.fileinputfieldid, _common.fileinputfield);
Vvveb.Components.extend('_base', _common_ids.popuptextinputid, _common.popuptextinput);
Vvveb.Components.extend('_base', _common_ids.popupmanualselectinputid, _common.popupmanualselectinput);
Vvveb.Components.extend('_base', _common_ids.popuptextareaid, _common.popuptextarea);
Vvveb.Components.extend('_base', _common_ids.formlabelid, _common.formlabel);
Vvveb.Components.extend("_base", _common_ids.bootstraptextinputid, _common.bootstraptextinput);
Vvveb.Components.extend("_base", _common_ids.bootstraptextinputfieldid, _common.bootstraptextinputfield);
Vvveb.Components.extend("_base", _common_ids.labelid, _common.label);
Vvveb.Components.extend("_base", _common_ids.imageid, _common.image);
Vvveb.Components.extend("_base", _common_ids.labelfieldid, _common.labelfield);
Vvveb.Components.extend("_base", _common_ids.chartid, _common.chart);
Vvveb.Components.extend("_base", _common_ids.tabsid, _common.tabs);
Vvveb.Components.extend("_base", _common_ids.bodyid, _common.body);

Vvveb.Components.extend("_base", _common_ids.bootstraptextareaid, _common.bootstraptextareainput);
Vvveb.Components.extend("_base", _common_ids.bootstraptextareafieldid, _common.bootstraptextareainputfield);
Vvveb.Components.extend("_base", _common_ids.bootstrapfileinputid, _common.bootstrapfileinput);
Vvveb.Components.extend("_base", _common_ids.bootstrapfileinputfieldid, _common.bootstrapfileinputfield);
Vvveb.Components.extend("_base", _common_ids.bootstrapautoselectinputid, _common.bootstrapautoselectinput);
Vvveb.Components.extend("_base", _common_ids.bootstrapautoselectinputfieldid, _common.bootstrapautoselectinputfield);
Vvveb.Components.extend("_base", _common_ids.bootstrapmanualselectinputid, _common.bootstrapmanualselectinput);
Vvveb.Components.extend("_base", _common_ids.bootstrapmanualselectinputfieldid, _common.bootstrapmanualselectinputfield);
Vvveb.Components.extend("_base", _common_ids.bootstrapradioid, _common.bootstrapradio);
Vvveb.Components.extend("_base", _common_ids.bootstrapradiofieldid, _common.bootstrapradiofield);
Vvveb.Components.extend("_base", _common_ids.bootstrapcheckboxid, _common.bootstrapcheckbox);
Vvveb.Components.extend("_base", _common_ids.bootstrapcheckboxfieldid, _common.bootstrapcheckboxfield);
Vvveb.Components.extend("_base", _common_ids.bootstrapdatetimeinputid, _common.bootstrapdatetimeinput);
Vvveb.Components.extend("_base", _common_ids.bootstrapdatetimeinputfieldid, _common.bootstrapdatetimeinputfield);
Vvveb.Components.extend("_base", _common_ids.bootstrapalertid, _common.bootstrapalert);
Vvveb.Components.extend("_base", _common_ids.bootstrapbuttongroupid, _common.bootstrapbuttongroup);
Vvveb.Components.extend("_base", _common_ids.bootstrapheadingid, _common.bootstrapheading);
Vvveb.Components.extend("_base", _common_ids.bootstraphrid, _common.bootstraphr);
Vvveb.Components.extend("_base", _common_ids.bootstrapprogressid, _common.bootstrapprogress);
Vvveb.Components.extend("_base", _common_ids.bootstraptableid, _common.bootstraptable);
Vvveb.Components.extend("_base", _common_ids.bootstraptableheadercellid, _common.bootstraptableheadercell);
Vvveb.Components.extend("_base", _common_ids.bootstraptableheadid, _common.bootstraptablehead);
Vvveb.Components.extend("_base", _common_ids.bootstraptablerowid, _common.bootstraptablerow);
Vvveb.Components.extend("_base", _common_ids.bootstraptablecellid, _common.bootstraptablecell);
Vvveb.Components.extend("_base", _common_ids.bootstraptablebodyid, _common.bootstraptablebody);
Vvveb.Components.extend("_base", _common_ids.bootstrapcontainerid, _common.bootstrapcontainer);