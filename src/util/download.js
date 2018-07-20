function downloadAsTextFile(filename, text) {
    const element = document.createElement('a');
    if (text.length < 2 * 1024 * 1024) {
        element.setAttribute('href', `data:text/html;charset=utf-8,${encodeURIComponent(text)}`);
    } else {
        const blob = new Blob([text]);
        element.setAttribute('href', URL.createObjectURL(blob));
    }
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

export { downloadAsTextFile };