function parseHTML(html) {
    var t = document.createElement('template');
    t.innerHTML = html;
    return t.content.firstChild;
}

function $1(selector) {
    return document.querySelector(selector);
}

function $$1(selector) {
    return document.querySelectorAll(selector);
}