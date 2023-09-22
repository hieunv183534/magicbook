(function () {
    window.onload = () => {

        var currentPaperIndex = 0;
        running = false;
        var upping = [];
        var downing = [];
        var valueBoxShadow = "2px 2px 30px rgba(0, 0, 0, 0.25), 0 0 1px rgba(0, 0, 0, 0.5)";

        var bookHtml = $("#book");
        let pageCount = pages.length;
        let paperCount = Math.ceil(pageCount / 2);
        upping = Array(paperCount).fill(false);
        downing = Array(paperCount).fill(false);
        for (let i = paperCount - 1; i >= 0; i--) {
            let paperHtml = parseHTML(`<div class="paper close-fully" index="${i}"  id="paper${i}" style="z-index:${-i};">
                                                <div class="front">
                                                    <div class="page-content">
                                                        ${pages[i * 2]} <br>
                                                        ${i}
                                                        <div class="page-index">${i * 2 + 1}</div>
                                                    </div>
                                                </div>
                                                <div class="back">
                                                    <div class="page-content">
                                                        ${pages[i * 2 + 1]} <br>
                                                        ${i}
                                                        <div class="page-index">${i * 2 + 2}</div>
                                                    </div>
                                                </div>
                                            </div>`);
            bookHtml.appendChild(paperHtml);
        }

        function next() {
            if (downing.every(x => x === false) && currentPaperIndex < paperCount) {
                upping[currentPaperIndex] = true;
                if (currentPaperIndex == 0)
                    bookHtml.setAttribute('class', "in-read");

                let currentPaperHtml = $(`#paper${currentPaperIndex}`);
                currentPaperIndex++;
                currentPaperHtml.setAttribute('class', 'paper open-half');
                currentPaperHtml.style.zIndex = currentPaperHtml.getAttribute("index");
                currentPaperHtml.style.boxShadow = valueBoxShadow;

                setTimeout(function () {
                    currentPaperHtml.setAttribute('class', 'paper open-fully');
                }, 500);

                setTimeout(function () {
                    let previousPaperHtml = $(`#paper${currentPaperHtml.getAttribute("index") - 1}`);
                    if (previousPaperHtml)
                        previousPaperHtml.style.boxShadow = "none";
                }, 1000);
                setTimeout(() => {
                    upping[currentPaperHtml.getAttribute("index")] = false;
                }, 1500);
            }
        }

        function previous() {
            if (upping.every(x => x === false) && currentPaperIndex > 0) {
                if (currentPaperIndex == 1)
                    bookHtml.setAttribute('class', "");

                currentPaperIndex--;
                downing[currentPaperIndex] = true;
                let currentPaperHtml = $(`#paper${currentPaperIndex}`);
                currentPaperHtml.style.zIndex = paperCount + 1;
                currentPaperHtml.setAttribute('class', 'paper close-half');

                let previousPaperHtml = $(`#paper${currentPaperHtml.getAttribute("index") - 1}`);
                if (previousPaperHtml)
                    previousPaperHtml.style.boxShadow = valueBoxShadow;

                setTimeout(function () {
                    currentPaperHtml.setAttribute('class', 'paper close-fully');
                }, 500);

                setTimeout(function () {
                    currentPaperHtml.style.zIndex = -currentPaperHtml.getAttribute("index");
                    currentPaperHtml.style.boxShadow = "none";
                }, 1000);
                setTimeout(() => {
                    downing[currentPaperHtml.getAttribute("index")] = false;
                }, 1500);
            }
        }

        function gotox(pageIndex) {
            let paperIndex = Math.floor(pageIndex / 2);
            let times = Math.abs(paperIndex - currentPaperIndex);
            if (paperIndex < currentPaperIndex) {
                callFnNTimes(times, previous);
            } else if (paperIndex > currentPaperIndex) {
                callFnNTimes(times, next);
            } else {

            }
        }

        function callFnNTimes(n, fn) {
            let count = 0;

            function call() {
                if (count < n) {
                    fn();
                    count++;
                    setTimeout(call, 300);
                }
            }

            call();
        }


        $('#open').addEventListener('click', function () {
            next();
        });

        $('#close').addEventListener('click', function () {
            previous();
        });

        $('#gotox').addEventListener('click', function () {
            gotox(8);
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