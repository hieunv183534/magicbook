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

function getUserInfoFromSession() {
    debugger;
    var token = sessionStorage.getItem("TOKEN");
    if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64));
        const data = JSON.parse(jsonPayload);
        return data;
    } else {
        return null;
    }
}