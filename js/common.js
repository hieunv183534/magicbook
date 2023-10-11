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
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const data = JSON.parse(jsonPayload);
        return data;
    } else {
        return null;
    }
}