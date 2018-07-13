/*
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
import Vvveb from './builder';
import {
    label, textinput, button, div, container, alert, badge, breadcrumbitem, breadcrumbs, buttongroup,
    buttontoolbar, card, checkbox, fileinput, form, gridcolumn, gridrow, heading, hr, image, jumbotron,
    link, listgroup, listitem, navbar, pageitem, pagination, progress, radiobutton, selectinput, tableheadercell,
    table, tablebody, tablecell, tablehead, tablerow, textareainput
} from './components/@oee/components';
import element from './components/element';
import border from './components/border';
import padding from './components/padding';
import display from './components/display';
import typography from './components/typography';
import size from './components/size';
import margin from './components/margin';

Vvveb.ComponentsGroup['Bootstrap 3'] =
    ['html/label', 'html/div', 'html/button', 'html/buttongroup', 'html/buttontoolbar', 'html/form', 'html/textinput', 'html/textareainput', 'html/selectinput', 'html/fileinput', 'html/checkbox', 'html/radiobutton', 'html/table', 'html/heading', 'html/image', 'html/jumbotron', 'html/alert', 'html/card', 'html/listgroup', 'html/hr', 'html/taglabel', 'html/badge', 'html/progress', 'html/navbar', 'html/breadcrumbs', 'html/pagination', 'html/container', 'html/gridrow'];

Vvveb.Components.add("_base", element);
//display
Vvveb.Components.extend("_base", "_base", display);
//Typography
Vvveb.Components.extend("_base", "_base", typography)
//Size
Vvveb.Components.extend("_base", "_base", size);
//Margin
Vvveb.Components.extend("_base", "_base", margin);
//Padding
Vvveb.Components.extend("_base", "_base", padding);
//Border
Vvveb.Components.extend("_base", "_base", border);

Vvveb.Components.extend("_base", "html/div", div);
Vvveb.Components.extend("_base", "html/label", label);
Vvveb.Components.extend("_base", "html/button", button);
Vvveb.Components.extend("_base", "html/container", container);
Vvveb.Components.extend("_base", "html/heading", heading);
Vvveb.Components.extend("_base", "html/link", link);
Vvveb.Components.extend("_base", "html/image", image);
Vvveb.Components.add("html/hr", hr);
Vvveb.Components.extend("_base", "html/buttongroup", buttongroup);
Vvveb.Components.extend("_base", "html/buttontoolbar", buttontoolbar);
Vvveb.Components.extend("_base", "html/alert", alert);
Vvveb.Components.extend("_base", "html/badge", badge);
Vvveb.Components.extend("_base", "html/card", card);
Vvveb.Components.extend("_base", "html/listgroup", listgroup);
Vvveb.Components.extend("_base", "html/listitem", listitem);
Vvveb.Components.extend("_base", "html/breadcrumbs", breadcrumbs);
Vvveb.Components.extend("_base", "html/breadcrumbitem", breadcrumbitem);
Vvveb.Components.extend("_base", "html/pagination", pagination);
Vvveb.Components.extend("_base", "html/pageitem", pageitem);
Vvveb.Components.extend("_base", "html/progress", progress);
Vvveb.Components.extend("_base", "html/jumbotron", jumbotron);
Vvveb.Components.extend("_base", "html/navbar", navbar);
Vvveb.Components.extend("_base", "html/form", form);
Vvveb.Components.extend("_base", "html/textinput", textinput);
Vvveb.Components.extend("_base", "html/selectinput", selectinput);
Vvveb.Components.extend("_base", "html/textareainput", textareainput);
Vvveb.Components.extend("_base", "html/radiobutton", radiobutton);
Vvveb.Components.extend("_base", "html/checkbox", checkbox);
Vvveb.Components.extend("_base", "html/fileinput", fileinput);
Vvveb.Components.extend("_base", "html/table", table);
Vvveb.Components.extend("_base", "html/tablerow", tablerow);
Vvveb.Components.extend("_base", "html/tablecell", tablecell);
Vvveb.Components.extend("_base", "html/tableheadercell", tableheadercell);
Vvveb.Components.extend("_base", "html/tablehead", tablehead);
Vvveb.Components.extend("_base", "html/tablebody", tablebody);
Vvveb.Components.add("html/gridcolumn", gridcolumn);
Vvveb.Components.add("html/gridrow", gridrow);
