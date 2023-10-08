function getBook(bookName = "hieunv") {
    return $.ajax({
        url: `https://thebooks.azurewebsites.net/api/app/magic-book/magic-book?name=${bookName}`,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json'
    })
}

function addOrUpdateBook(book, pages) {
    let _book = {
        ...book,
        pages: pages.map((x, i) => {
            return {
                content: x,
                index: i
            }
        })
    };
    return $.ajax({
        url: `https://thebooks.azurewebsites.net/api/app/magic-book/or-update`,
        method: 'POST',
        data: JSON.stringify(book),
        dataType: 'json',
        contentType: 'application/json'
    })
}

function getBooks(filter) {
    return $.ajax({
        url: `https://thebooks.azurewebsites.net/api/app/magic-book/book?filter=${filter}`,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json'
    })
}

function deleteBook(bookName) {
    return $.ajax({
        url: `https://thebooks.azurewebsites.net/api/app/magic-book/book?bookName=${bookName}`,
        method: 'DELETE',
        dataType: 'json',
        contentType: 'application/json'
    })
}

function login(username,password) {
    return $.ajax({
        url: `https://thebooks.azurewebsites.net/api/app/magic-book/book?bookName=${bookName}`,
        method: 'DELETE',
        dataType: 'json',
        contentType: 'application/json'
    })
}

function register(username,email,password) {
    return $.ajax({
        url: `https://thebooks.azurewebsites.net/api/app/magic-book/book?bookName=${bookName}`,
        method: 'DELETE',
        dataType: 'json',
        contentType: 'application/json'
    })
}