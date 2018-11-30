import { dataComponentId, configurableComponent } from "../common";
import { tabsid } from "./ids";

const iframeWindow = document.getElementById('iframeId').contentWindow;
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
};

export default tabs;