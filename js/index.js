(function () {
    window.onload = () => {

        var currentPaperIndex = 0;
        openingOrClosing = false;
        var upping = [];
        var downing = [];
        var inRead = false;
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
                                                        <div id="page${i * 2 + 1}" class="page-value">
                                                            ${pages[i * 2]} <br>
                                                        </div>
                                                        <div class="page-index">${i * 2 + 1}</div>
                                                    </div>
                                                </div>
                                                <div class="back">
                                                    <div class="page-content">
                                                        <div  id="page${i * 2 + 2}" class="page-value">
                                                            ${pages[i * 2 + 1]} <br>
                                                        </div>
                                                        <div class="page-index">${i * 2 + 2}</div>
                                                    </div>
                                                </div>
                                            </div>`);
            bookHtml.appendChild(paperHtml);
        }

        var contents = $$(".page-value").forEach(contentHtml => {
            contentHtml.contentEditable = true;
        });

        function next() {
            if (!inRead) {
                opening = true;
                inRead = true;
                bookHtml.setAttribute('class', "in-read");
                let coverHtml = $('.cover');
                coverHtml.setAttribute('class', 'cover open-half');
                setTimeout(function () {
                    coverHtml.setAttribute('class', 'cover open-fully');
                }, 500);
                setTimeout(function () {
                    coverHtml.style.zIndex = -1000;
                    opening = false;
                }, 500);
            } else {
                if (!opening && downing.every(x => x === false) && currentPaperIndex < paperCount) {
                    upping[currentPaperIndex] = true;

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
                    }, 1200);
                }
            }
        }

        function previous() {
            if (currentPaperIndex == 0) {
                if (inRead && downing.every(x => x === false)) {
                    inRead = false;
                    bookHtml.setAttribute('class', "");
                    let coverHtml = $('.cover');
                    coverHtml.style.zIndex = 1000;
                    coverHtml.setAttribute('class', 'cover close-half');
                    setTimeout(function () {
                        coverHtml.setAttribute('class', 'cover close-fully');
                    }, 500);
                }
            } else {
                if (upping.every(x => x === false) && currentPaperIndex > 0) {

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
                    }, 1200);
                }
            }
        }

        function gotox(pageIndex) {
            let paperIndex = Math.floor(pageIndex / 2);
            let times = Math.abs(paperIndex - currentPaperIndex);
            if (!inRead) {
                next();
                setTimeout(() => {
                    if (paperIndex < currentPaperIndex) {
                        callFnNTimes(times, previous);
                    } else if (paperIndex > currentPaperIndex) {
                        callFnNTimes(times, next);
                    } else {

                    }
                }, 500);
            } else {
                if (paperIndex < currentPaperIndex) {
                    callFnNTimes(times, previous);
                } else if (paperIndex > currentPaperIndex) {
                    callFnNTimes(times, next);
                } else {

                }
            }
        }

        function closeAll() {
            if (inRead) {
                gotox(0);
                let intervalId = null;
                intervalId = setInterval(() => {
                    if (downing.every(x => x === false)) {
                        console.log("aaaaaaaaaaaaaaaaaaaaaaaaa");
                        previous();
                        clearInterval(intervalId);
                    }
                }, 100);
            }
        }

        function callFnNTimes(n, fn) {
            let count = 0;
            function call() {
                if (count < n) {
                    fn();
                    count++;
                    setTimeout(call, 100);
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

        $('#sutdown').addEventListener('click', function () {
            closeAll();
        });

        $('#copy').addEventListener('click', function () {
            $("#page3").innerHTML = $("#page2").innerHTML;
            console.log($("#page3").innerHTML);
        });

        $('#editorbtn').addEventListener('click', function () {
            if ($(".editor-space").classList.contains('editor-space-close')) {
                $(".editor-space").classList.remove("editor-space-close");
            } else {
                $(".editor-space").classList.add("editor-space-close");
            }
        });

        // document.onkeydown = checkKey;

        function checkKey(e) {

            e = e || window.event;

            if (e.keyCode == '37') {
                previous();
            }
            else if (e.keyCode == '39') {
                next();
            }

        }

        configureEditor();

        function configureEditor() {
            var toolbarOptions = [
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'color': [] }, { 'background': [] }],
                ['link'],
                ['image'],
                ['video'],
                ['clean']
            ];
            var quill = new Quill('#editor', {
                theme: 'snow', // Chọn chủ đề giao diện
                modules: {
                    toolbar: toolbarOptions,
                }
            });

            quill.on('text-change', function (delta, oldDelta, source) {
                document.querySelector("#target").innerHTML = quill.root.innerHTML;
            });
        }
    }
}());