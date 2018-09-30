function getRandomString(length = 2) {
    let result = '';
    while(!result) {
        result = Math.random().toString(36).substr(2, length);
    }
    return result;
}

export {
    getRandomString
};