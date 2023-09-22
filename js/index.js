(function () {
    window.onload = () => {
        var bookHtml = $("#book");
        let pageCount = pages.length;
        let paperCount = Math.ceil(pageCount / 2);
        for (let i = paperCount - 1; i >= 0; i--) {
            let paperHtml = parseHTML(`<div class="paper close-fully" index="${i}"  id="paper${i}" style="z-index:${-i};">
                                                <div class="front">
                                                    <div class="page-content">
                                                        ${pages[i * 2]}
                                                        <div class="page-index">${i * 2 + 1}</div>
                                                    </div>
                                                </div>
                                                <div class="back">
                                                    <div class="page-content">
                                                        ${pages[i * 2 + 1]}
                                                        <div class="page-index">${i * 2 + 2}</div>
                                                    </div>
                                                </div>
                                            </div>`);
            bookHtml.appendChild(paperHtml);
        }

        function next() {
            if (!running && currentPaperIndex < paperCount) {
                if (currentPaperIndex == 0)
                    bookHtml.setAttribute('class', "in-read");
                running = true;
                let currentPaperHtml = $(`#paper${currentPaperIndex}`);
                currentPaperIndex++;
                currentPaperHtml.setAttribute('class', 'paper open-half');
                currentPaperHtml.style.zIndex = currentPaperHtml.getAttribute("index");

                if (timer) clearTimeout(timer);
                timer = setTimeout(function () {
                    currentPaperHtml.setAttribute('class', 'paper open-fully');
                    timer = null;
                }, 500);

                if (timer1) clearTimeout(timer1);
                timer1 = setTimeout(function () {
                    running = false;
                    timer1 = null;
                }, 1000);
            }
        }

        function previous() {
            if (!running && currentPaperIndex > 0) {
                if (currentPaperIndex == 1)
                    bookHtml.setAttribute('class', "");

                running = true;
                currentPaperIndex--;
                let currentPaperHtml = $(`#paper${currentPaperIndex}`);
                currentPaperHtml.style.zIndex = paperCount + 1;
                currentPaperHtml.setAttribute('class', 'paper close-half');

                if (timer) clearTimeout(timer);
                timer = setTimeout(function () {
                    currentPaperHtml.setAttribute('class', 'paper close-fully');
                    timer = null;
                }, 500);

                if (timer1) clearTimeout(timer1);
                timer1 = setTimeout(function () {
                    currentPaperHtml.style.zIndex = -currentPaperHtml.getAttribute("index");
                    running = false;
                    timer1 = null;
                }, 1000);
            }
        }


        var currentPaperIndex = 0;
        timer = null;
        timer1 = null;
        running = false;

        $('#open').addEventListener('click', function () {
            next();
        });

        $('#close').addEventListener('click', function () {
            previous();
        });

        $('#gotox').addEventListener('click', function () {

        });

        document.onkeydown = checkKey;

        function checkKey(e) {

            e = e || window.event;

            if (e.keyCode == '37') {
                previous();
            }
            else if (e.keyCode == '39') {
                next();
            }

        }
    }
}());