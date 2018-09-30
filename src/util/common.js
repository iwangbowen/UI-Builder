import format from 'date-fns/format';

function getRandomString(length = 2) {
    let result = '';
    while(!result) {
        result = Math.random().toString(36).substr(2, length);
    }
    return result;
}


const delimiter = '_';
function addDatetime(name) {
    return `${name}${delimiter}${format(new Date(), 'YYYY-MM-DD HH:mm:ss')}`;
}

export {
    getRandomString,
    addDatetime
};