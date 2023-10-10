var token = sessionStorage.getItem('TOKEN');

$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    }
});

function getBook(bookName = "hieunv") {
    return $.ajax({
        url: `https://daustore.store/api/app/magic-book/magic-book?name=${bookName}`,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json'
    })
}

function addOrUpdateBookInfo(bookName, title, tag, author, imageCoverFile) {
    let formData = new FormData();
    formData.append('file', imageCoverFile);
    formData.append("BookName", bookName ?? "");
    formData.append("Title", title ?? "");
    formData.append("Tag", tag ?? "");
    formData.append("Author", author ?? "");
    return $.ajax({
        url: `https://daustore.store/api/app/magic-book/or-update-book-info`,
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false
    })
}

function writeBook(bookName, pages) {
    let book = {
        bookName: bookName,
        pages: pages.map((x, i) => {
            return {
                content: x,
                index: i
            }
        }),
        author: 'temp',
        title: 'temp',
        tag: 'temp',
        imageCover: 'temp'
    }
    return $.ajax({
        url: `https://daustore.store/api/app/magic-book/write-book`,
        method: 'POST',
        data: JSON.stringify(book),
        dataType: 'json',
        contentType: 'application/json'
    })
}

function getBooks(filter = "") {
    return $.ajax({
        url: `https://daustore.store/api/app/magic-book/book?filter=${filter}`,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json'
    })
}

function deleteBook(bookName) {
    return $.ajax({
        url: `https://daustore.store/api/app/magic-book/book?bookName=${bookName}`,
        method: 'DELETE',
        dataType: 'json',
        contentType: 'application/json'
    })
}

function login(username, password) {
    return $.ajax({
        url: `https://daustore.store/api/app/auth/login`,
        method: 'POST',
        data: JSON.stringify({ username, password }),
        contentType: 'application/json'
    })
}

function register(username, email, password) {
    return $.ajax({
        url: `https://daustore.store/api/app/auth/register`,
        method: 'POST',
        data: JSON.stringify({ username, email, password, avatar: 'string' }),
        dataType: 'json',
        contentType: 'application/json'
    })
}