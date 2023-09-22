function parseHTML(html) {
    var t = document.createElement('template');
    t.innerHTML = html;
    return t.content.firstChild;
}

function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}