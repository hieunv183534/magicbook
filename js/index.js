(function () {
    $(document).ready(function () {
        $("#loginBtn").on('click', () => {
            debugger
            $(".user").attr('status', 'in');
            $("#username").html('hieunv183534');
            window.location.href = "./login.html";
        });
        $("#logoutBtn").on('click', () => {
            sessionStorage.removeItem('TOKEN');
            window.location.reload();
        });

        $(".open-form").on('click', () => {
            $(".newbook-popup").attr('status', 'open');
        });
        $(".close-form").on('click', () => {
            $(".newbook-popup").attr('status', 'close');
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
                addOrUpdateBookInfo(bookName, title, tag, info.unique_name, imageCoverFile).done(res => {
                    console.log(res);
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
        let bookBooks = res.filter(x => x.tag == "book");
        let collectedValueBooks = res.filter(x => x.tag == "collectedValue");

        let aboutMeBooksHtml = $("#listAboutMeBook");
        let codeBooksHtml = $("#listCodeBook");
        let learnEnglishBooksHtml = $("#listLearnEnglishBook");
        let musicAndFilmBooksHtml = $("#listMusicAndFilmBook");
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

        bookBooks.forEach(book => {
            let bookHtml = renderBookHtml(book);
            bookBooksHtml.append(bookHtml);
        });

        collectedValueBooks.forEach(book => {
            let bookHtml = renderBookHtml(book);
            collectedValueBooksHtml.append(bookHtml);
        });
        renderCarousel();
    }).fail(err => {
        alert("Có lỗi khi lấy danh sách book, vui lòng thử lại sau");
    })
}

function renderBookHtml(book) {
    return $(`<figure style="margin-left: 200px;" class='book'>
                    <!-- Front -->
                    <ul class='hardcover_front'>
                        <li>
                            <div class="position-relative py-8 py-sm-7">
                                <div class="bg-holder rounded-soft rounded-bottom-0"
                                    style="background-image:url('https://daustore.store/images/${book.imageCover}');">
                                </div>
                            </div>
                            <div class="align">
                                <h1 class="card-title" style="font-size:16px">${book.bookName}</h1>
                            </div>
                        </li>
                        <li></li>
                    </ul>
                    <!-- Pages -->
                    <ul class='page'>
                        <li></li>
                        <li style="font-size:14px">
                            <a href="./book.html">${book.title}</a>
                        </li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <!-- Back -->
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