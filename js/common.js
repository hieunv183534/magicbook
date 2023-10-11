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
        const parts = token.split('.');
        const encodedPayload = parts[1];

        // Giải mã phần Payload
        const decodedPayload = atob(encodedPayload);
        const payloadData = JSON.parse(decodedPayload);
        return payloadData;
    } else {
        return null;
    }
}