(function () {
    function $(selector) {
        return document.querySelector(selector);
    }

    function $$(selector) {
        return document.querySelectorAll(selector);
    }

    var card = $('book'),
        openB = $('open'),
        closeB = $('close'),
        timer = null;
    openB.addEventListener('click', function () {
        card.setAttribute('class', 'open-half');
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
            card.setAttribute('class', 'open-fully');
            timer = null;
        }, 500);
    });

    closeB.addEventListener('click', function () {
        card.setAttribute('class', 'close-half');
        if (timer) clearTimerout(timer);
        timer = setTimeout(function () {
            card.setAttribute('class', '');
            timer = null;
        }, 500);
    });

}());