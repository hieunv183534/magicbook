(function () {
    window.onload = () => {
        var thisBook = null;
        var pages = [];
        var imageSrcs = [];

        if (/Mobi|Android/i.test(navigator.userAgent)) {
            // Sử dụng hộp thoại cảnh báo để thông báo cho người dùng
            alert("Để có trải nghiệm tốt hơn, vui lòng sử dụng PC. Xin cảm ơn!");

            $("#book").css('display', 'none');
            $("#open").css('display', 'none');
            $("#close").css('display', 'none');
            $(".editor-space").css('display', 'none');
            $(".edit-book").css('display', 'none');
            $(".close-book").css('display', 'none');
            $(".return-home").css('display', 'none');

            $(".mobile-cover").css('display', 'block');
            $(".mobile-content").css('display', 'block');

            renderMobile();
        } else {

            const urlParams = new URLSearchParams(window.location.search);
            const bookId = urlParams.get('book');

            var currentPaperIndex = 0;
            openingOrClosing = false;
            var upping = [];
            var downing = [];
            var inRead = false;
            var valueBoxShadow = "2px 2px 30px rgba(0, 0, 0, 0.25), 0 0 1px rgba(0, 0, 0, 0.5)";

            var bookHtml = $1("#book");
            var paperCount = null;
            var pageCount = null;
            var choosePageIndex = null;
            renderBook();

            function renderBook() {
                getBook(bookId).done(res => {
                    $("#metaTitle").attr('content', res.bookName);
                    $("#metaImage").attr('content', 'https://daustore.store/images/' + res.imageCover);
                    let userInfo = getUserInfoFromSession();
                    if (userInfo?.unique_name == res.author) {
                        $(".back-cover-wrapper").css('display', 'flex');
                    }

                    $("title").html(res.bookName);

                    thisBook = res;
                    $("#imageCover").attr('src', 'https://daustore.store/images/' + res.imageCover);
                    $("#bookName").html(res.bookName);
                    $$1("#book .paper").forEach(paper => {
                        paper.remove();
                    });


                    currentPaperIndex = 0;

                    pages = res.pages.sort((a, b) => a.index - b.index).map(x => x.content);
                    pageCount = pages.length;
                    paperCount = Math.ceil(pageCount / 2);
                    upping = Array(paperCount).fill(false);
                    downing = Array(paperCount).fill(false);
                    for (let i = paperCount - 1; i >= 0; i--) {
                        let paperHtml = parseHTML(`<div class="paper close-fully" index="${i}"  id="paper${i}" style="z-index:${-i};">
                                                    <div class="front">
                                                        <div class="page-content">
                                                            <div id="page${i * 2 + 1}" class="page-value">${pages[i * 2]}</div>
                                                            <div class="page-index">${i * 2 + 1}</div>
                                                        </div>
                                                    </div>
                                                    <div class="back">
                                                        <div class="page-content">
                                                            <div  id="page${i * 2 + 2}" class="page-value">${pages[i * 2 + 1]}</div>
                                                            <div class="page-index">${i * 2 + 2}</div>
                                                        </div>
                                                    </div>
                                                </div>`);
                        bookHtml.appendChild(paperHtml);
                    }

                    queryImage(res);
                });
            }

            function next() {
                if (!inRead) {
                    opening = true;
                    inRead = true;
                    bookHtml.setAttribute('class', "in-read");
                    let coverHtml = $1('.cover');
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

                        let currentPaperHtml = $1(`#paper${currentPaperIndex}`);
                        currentPaperIndex++;
                        currentPaperHtml.setAttribute('class', 'paper open-half');
                        currentPaperHtml.style.zIndex = currentPaperHtml.getAttribute("index");
                        currentPaperHtml.style.boxShadow = valueBoxShadow;

                        setTimeout(function () {
                            currentPaperHtml.setAttribute('class', 'paper open-fully');
                        }, 500);

                        setTimeout(function () {
                            let previousPaperHtml = $1(`#paper${currentPaperHtml.getAttribute("index") - 1}`);
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
                        let coverHtml = $1('.cover');
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
                        let currentPaperHtml = $1(`#paper${currentPaperIndex}`);
                        currentPaperHtml.style.zIndex = paperCount + 1;
                        currentPaperHtml.setAttribute('class', 'paper close-half');

                        let previousPaperHtml = $1(`#paper${currentPaperHtml.getAttribute("index") - 1}`);
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


            $1('#open').addEventListener('click', function () {
                next();
            });

            $1('#close').addEventListener('click', function () {
                previous();
            });

            $1('#newPage').addEventListener('click', function () {
                choosePageIndex = pageCount;
                document.querySelector("#target").innerHTML = "";
                quill.setText('');
                $(".editor-space .page-index").html(choosePageIndex + 1);
                $1(".editor-space").classList.add("editor-space-open");
            });

            $1('#editPage').addEventListener('click', function () {
                choosePageIndex = Number($1("#inputEditIndex").value - 1);
                let content = pages[choosePageIndex];
                quill.root.innerHTML = `${content}`;
                document.querySelector("#target").innerHTML = quill.root.innerHTML;
                $(".editor-space .page-index").html(choosePageIndex + 1);
                $1(".editor-space").classList.add("editor-space-open");
            });

            $1('#insertPage').addEventListener('click', function () {
                alert("Chèn trang!");
            });

            $1('#removePage').addEventListener('click', function () {
                alert("Xóa trang!");
            });

            $1('#save').addEventListener('click', function () {
                let contentHtml = document.querySelector("#target").innerHTML;
                pages[choosePageIndex] = contentHtml;
                writeBook(thisBook.id, pages).done(res => {
                    renderBook();
                    $1(".editor-space").classList.remove("editor-space-open");
                })
            });

            $1('#cancel').addEventListener('click', function () {
                document.querySelector("#target").innerHTML = "";
                quill.setText('');
                $1(".editor-space").classList.remove("editor-space-open");
            });

            $("button.edit-book").click(() => {
                gotox(pageCount + 1);
            });

            $("button.close-book").click(() => {
                closeAll();
            });

            $("button.return-home").click(() => {
                window.location.href = "./index";
            });

            $("#updateBookInfoBtn").click(() => {
                window.location.href = "./index?editBook=" + thisBook.id;
            });

            $("#deleteBookBtn").click(() => {
                if (confirm("Bạn có chắc chắn muốn xóa cuốn sách này không?") == true) {
                    deleteBook(thisBook.id).done(res => {
                        alert("Xóa sách thành công!");
                        window.location.href = "./index";
                    }).fail(err => {
                        alert("Xóa sách thất bại, vui lòn thử lại!");
                    });
                }
            });

            // document.onkeydown = (e) => {
            //     e = e || window.event;

            //     if (e.keyCode == '37') {
            //         previous();
            //     }
            //     else if (e.keyCode == '39') {
            //         next();
            //     }

            // };

            var quill = null;
            configureEditor();

            function configureEditor() {
                var toolbarOptions = [
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'color': [] }, { 'background': [] }],
                    ['link', 'image', 'video'],
                    ['emoji'],
                    ['clean']
                ];
                quill = new Quill('#editor', {
                    theme: 'snow',
                    modules: {
                        toolbar: toolbarOptions,
                        imageResize: {},
                        "emoji-toolbar": true
                    }
                });

                quill.on('text-change', function (delta, oldDelta, source) {
                    document.querySelector("#target").innerHTML = quill.root.innerHTML;
                });
            }
        }

        function renderMobile() {
            const urlParams = new URLSearchParams(window.location.search);
            const bookId = urlParams.get('book');
            getBook(bookId).done(res => {
                let content = res.pages.map(x => x.content).join(" ");
                $(".mobile-content").html(content);

                $("#metaTitle").attr('content', res.bookName);
                $("#metaImage").attr('content', 'https://daustore.store/images/' + res.imageCover);
                $("title").html(res.bookName);
                $("#imageCoverMobile").attr('src', 'https://daustore.store/images/' + res.imageCover);
                $("#bookNameMobile").html(res.bookName);
                queryImage(res);
            })
        }

        function queryImage(book) {
            let content = book.pages.map(x => x.content).join(" ");
            let imageContainer = $("<div></div>");
            imageContainer.html(content);
            var srcArray = [];
            imageContainer.find('img').each(function () {
                var src = $(this).attr('src');
                srcArray.push(src);
            });
            imageSrcs = srcArray;

            //-------------------- sự kiện cho các image
            let imgQuery;
            if (/Mobi|Android/i.test(navigator.userAgent)) {
                imgQuery = ".mobile-content img";
            } else {
                imgQuery = ".paper img";
            }

            $(imgQuery).click(function () {
                var imageSrc = $(this).attr('src');
                $('#popupImage').attr('src', imageSrc);
                $('#imagePopup').fadeIn();
            });

            $('#imagePopup').click(function() {
                $('#imagePopup').fadeOut();
            });
        }
    }
}());
