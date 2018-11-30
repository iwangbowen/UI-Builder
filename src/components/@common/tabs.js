import { dataComponentId, configurableComponent } from "../common";
import { tabsid } from "./ids";
import { TabValueInput, ButtonInput } from "../../inputs/inputs";

const iframeWindow = document.getElementById('iframeId').contentWindow;

function getLastTabIdSuffix(tabsNav) {
    const href = tabsNav.children().last().children('a').attr('href');
    if (href) {
        return parseInt(href.split('-')[1]);
    } else {
        return 0;
    }
}

const tabs = {
    name: 'Tabs',
    image: "icons/tabs.svg",
    html: `<div ${dataComponentId}="${tabsid}" style="width: 250px; height: 100px;" class="vertical-stripes ${configurableComponent}">
           </div>`,
    isChildrenSortableAndDroppable: true,
    isDescendantsSortableAndDroppable: false,
    sortableAndDroppableSelector: 'div',
    getRenderElement(node) {
        const parents = $(node).parents(`[${dataComponentId}="${tabsid}"]`);
        return parents.length ? parents[0] : node;
    },
    afterDrop(node) {
        const $node = iframeWindow.$(node);
        $node.html(`
        <ul>
            <li><a href="#tabs-1">Nunc tincidunt</a></li>
            <li><a href="#tabs-2">Proin dolor</a></li>
            <li><a href="#tabs-3">Aenean lacinia</a></li>
        </ul>
        <div id="tabs-1">
        </div>
        <div id="tabs-2">
        </div>
        <div id="tabs-3">
        </div>
        `);
        $node.removeClass('vertical-stripes');
        $node.tabs();
        const height = $node.children('ul').height();
        $node.children('div').css({
            height: `calc(100% - ${height}px)`
        })
    },
    beforeInit(node) {
        const tabs = iframeWindow.$(node);
        const properties = [];
        $(node).find('ul li').each((i, li) => {
            const $li = $(li);
            const $a = $li.find('a');
            properties.push({
                name: 'Tab ' + (i + 1),
                key: 'Tab' + (i + 1),
                inputtype: new TabValueInput(),
                data: {
                    title: $a.text()
                },
                onChange(node, value, input) {
                    if (input.nodeName == 'BUTTON') {
                        $li.remove();
                        tabs.tabs("refresh");
                        Vvveb.Components.render(tabsid);
                    } else {
                        $a.text(value);
                    }
                    return node;
                }
            })
        });
        //remove all tab properties
        this.properties = this.properties.filter(function (item) {
            return item.key.indexOf("Tab") === -1;
        });
        this.properties = [...properties, ...this.properties];
        return node;
    },
    properties: [
        {
            name: "Add Tab",
            key: "addChild",
            inputtype: new ButtonInput(),
            data: { text: "Add Tab" },
            onChange: function (node) {
                const tabs = iframeWindow.$(node);
                const tabsNav = tabs.find('.ui-tabs-nav');
                const newTabId = `tabs-${getLastTabIdSuffix(tabsNav) + 1}`;

                const li = `<li><a href="#${newTabId}">New Tab</a></li>`;
                tabs.find('.ui-tabs-nav').append(li);
                tabs.append(`<div id="${newTabId}"></div>`);
                tabs.tabs('refresh');

                Vvveb.Components.render(tabsid);
                return node;
            }
        }
    ]
};

export default tabs;