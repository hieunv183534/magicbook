var token = sessionStorage.getItem('TOKEN');

$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    }
});

function getBook(bookId) {
    return $.ajax({
        url: `https://daustore.store/api/app/magic-book/magic-book/${bookId}`,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json'
    })
}

function addOrUpdateBookInfo(bookName, title, tag, author, imageCoverFile, bookId = null) {
    let formData = new FormData();
    formData.append('file', imageCoverFile);
    formData.append("BookName", bookName ?? "");
    formData.append("Title", title ?? "");
    formData.append("Tag", tag ?? "");
    formData.append("Author", author ?? "");
    formData.append("Id", bookId ?? "00000000-0000-0000-0000-000000000000");
    return $.ajax({
        url: `https://daustore.store/api/app/magic-book/or-update-book-info`,
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false
    })
}

function writeBook(bookId, pages) {
    let book = {
        id: bookId,
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

function deleteBook(bookId) {
    return $.ajax({
        url: `https://daustore.store/api/app/magic-book/delete-book/${bookId}`,
        method: 'POST',
        data: JSON.stringify({}),
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