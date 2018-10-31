import { compiledTr } from './bootstraptablerow';
import { compiledTc } from './bootstraptablecell';
import { configurableComponent } from '../common';

const bootstraptablebody = {
    nodes: ["tbody"],
    name: "Table Body",
    html: `<tbody class="${configurableComponent}">
        ${
        compiledTr({
            text: ['1', 'John', 'Doe', 'john@example.com'].map(v => compiledTc({
                text: v
            })).join('')
        })}
        ${
        compiledTr({
            text: ['2', 'Mary', 'Moe', 'mary@example.com'].map(v => compiledTc({
                text: v
            })).join('')
        })}
        ${
        compiledTr({
            text: ['3', 'July', 'Dooley', 'july@example.com'].map(v => compiledTc({
                text: v
            })).join('')
        })}
           </tbody>`
};

export default bootstraptablebody;