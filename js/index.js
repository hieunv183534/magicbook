(function () {
    $(document).ready(function () {

        if (/Mobi|Android/i.test(navigator.userAgent)) {
            // Sử dụng hộp thoại cảnh báo để thông báo cho người dùng
            alert("Để có trải nghiệm tốt hơn, vui lòng sử dụng PC. Xin cảm ơn!!");
        }

        $("#loginBtn").on('click', () => {
            $(".user").attr('status', 'in');
            $("#username").html('hieunv183534');
            window.location.href = "./login";
        });

        $("#logoutBtn").on('click', () => {
            sessionStorage.removeItem('TOKEN');
            window.location.reload();
        });

        $(".open-form").on('click', () => {
            $(".newbook-popup").attr('status', 'open');
            if (info.unique_name == "hieunv183534") {
                $(".form-item#tagItem").css('display', 'flex');
            } else {
                $(".form-item#tagItem").css('display', 'none');
            }

            $("#bookNameInput").val("");
            $("#titleInput").val("");
            $("#picField").val(null);
            document.getElementById("previewImage").src = null;
        });
        $(".close-form").on('click', () => {
            $(".newbook-popup").attr('status', 'close');
            var currentUrl = window.location.href;
            var cleanUrl = currentUrl.split('?')[0];
            window.history.replaceState({}, document.title, cleanUrl);
        });

        document.getElementById('picField').onchange = function (evt) {
            var tgt = evt.target || window.event.srcElement,
                files = tgt.files;
            if (FileReader && files && files.length) {
                var fr = new FileReader();
                fr.onload = function () {
                    document.getElementById("previewImage").src = fr.result;
                }
                fr.readAsDataURL(files[0]);
            }
            else {
            }
        }

        var info = getUserInfoFromSession();
        if (info) {
            $(".user").attr('status', 'in');
            $("#username").html(info.unique_name);
        } else {
            $(".newbook-popup").css('display', 'none');
        }


        $("#newBookBtn").click(() => {
            const imageCoverFile = document.getElementById("picField").files[0];
            const tag = $('#tagInput :selected').val();
            const bookName = $("#bookNameInput").val();
            const title = $("#titleInput").val();
            if (bookName && title) {
                const urlParams = new URLSearchParams(window.location.search);
                const bookId = urlParams.get('editBook');
                addOrUpdateBookInfo(bookName, title, tag, info.unique_name, imageCoverFile, bookId).done(res => {
                    if (bookId) { // edit
                        alert("Cập nhật bìa sách thành công!");
                        window.location.href = "./book?book=" + bookId;
                    } else { // add
                        alert("Thêm sách thành công!");
                        window.location.reload();
                    }
                }).fail(err => {
                    alert("Có lỗi, vui lòng thử lại sau!");
                })
            } else {
                alert("Tên sách và tóm tắt là bắt buộc nhập!");
            }
        });


        loadBooks();
    });
}());

function loadBooks() {
    getBooks("").done(res => {
        let aboutMeBooks = res.filter(x => x.tag == "aboutMe");
        let codeBooks = res.filter(x => x.tag == "code");
        let learnEnglishBooks = res.filter(x => x.tag == "learnEnglish");
        let musicAndFilmBooks = res.filter(x => x.tag == "musicAndFilm");
        let shareBooks = res.filter(x => x.tag == "share");
        let bookBooks = res.filter(x => x.tag == "book");
        let collectedValueBooks = res.filter(x => x.tag == "collectedValue");

        let aboutMeBooksHtml = $("#listAboutMeBook");
        let codeBooksHtml = $("#listCodeBook");
        let learnEnglishBooksHtml = $("#listLearnEnglishBook");
        let musicAndFilmBooksHtml = $("#listMusicAndFilmBook");
        let shareBooksHtml = $("#listShareBook");
        let bookBooksHtml = $("#listBookBook");
        let collectedValueBooksHtml = $("#listCollectedValueBook");

        aboutMeBooks.forEach(book => {
            let bookHtml = renderBookHtml(book);
            aboutMeBooksHtml.append(bookHtml);
        });

        codeBooks.forEach(book => {
            let bookHtml = renderBookHtml(book);
            codeBooksHtml.append(bookHtml);
        });

        learnEnglishBooks.forEach(book => {
            let bookHtml = renderBookHtml(book);
            learnEnglishBooksHtml.append(bookHtml);
        });

        musicAndFilmBooks.forEach(book => {
            let bookHtml = renderBookHtml(book);
            musicAndFilmBooksHtml.append(bookHtml);
        });

        shareBooks.forEach(book => {
            let bookHtml = renderBookHtml(book);
            shareBooksHtml.append(bookHtml);
        });

        bookBooks.forEach(book => {
            let bookHtml = renderBookHtml(book);
            bookBooksHtml.append(bookHtml);
        });

        collectedValueBooks.forEach(book => {
            let bookHtml = renderBookHtml(book);
            collectedValueBooksHtml.append(bookHtml);
        });
        maybeEditPage(res);
        renderCarousel();
    }).fail(err => {
        alert("Có lỗi khi lấy danh sách book, vui lòng thử lại sau");
    })
}

function renderBookHtml(book) {
    return $(`<figure style="margin-left: 200px;" class='book'>
                <ul class='hardcover_front'>
                    <li style="padding: 5px; display: flex; align-items: center; flex-direction: column; justify-content: center;">
                        <div class="image-cover-input" style="width: 120px; height: 120px;">
                            <img alt="Your Image" class="square-image" src="https://daustore.store/images/${book.imageCover}">
                        </div>
                        <div class="align">
                            <h1 class="card-title" style="font-size:15px; text-align: center;">${book.bookName}</h1>
                        </div>
                    </li>
                    <li></li>
                </ul>
                <ul class='page'>
                    <li></li>
                    <li style="font-size:14px; padding: 6px;">
                        <a href="./book?book=${book.id}">${book.title} ... <i class="fa-regular fa-hand-point-right"></i>đọc tiếp</a>
                    </li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <ul class='hardcover_back'>
                    <li></li>
                    <li></li>
                </ul>
                <ul class='book_spine'>
                    <li></li>
                    <li></li>
                </ul>
                <figcaption></figcaption>
            </figure>`);
}

function renderCarousel() {
    $(".owl-carousel").owlCarousel(
        {
            lazyLoad: true,
            margin: 20,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            autoplayTimeout: 7000,
            smartSpeed: 800,
            nav: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1024: {
                    items: 3
                },
                1366: {
                    items: 4
                }
            }
        }
    );
}

function maybeEditPage(books) {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('editBook');

    if (bookId) {
        let book = books.find(x => x.id == bookId);
        $("#tagInput").val(book.tag).change();
        $("#bookNameInput").val(book.bookName);
        $("#titleInput").val(book.title);
        document.getElementById("previewImage").src = `https://daustore.store/images/${book.imageCover}`;
        $(".newbook-popup").attr('status', 'open');
        if (getUserInfoFromSession().unique_name == "hieunv183534") {
            $(".form-item#tagItem").css('display', 'flex');
        } else {
            $(".form-item#tagItem").css('display', 'none');
        }


    }
}