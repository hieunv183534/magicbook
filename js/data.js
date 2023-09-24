var pages = [];

function getPages(bookName = "hieunv") {
    return $.ajax({
        url: `https://fsiconnected.tech/api/fsi/magic-book/magic-book?name=${bookName}`,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json'
    })
}

function updateBook(bookName = "hieunv") {
    let book = {
        bookName: bookName,
        pages: pages.map((x, i) => {
            return {
                content: x,
                index: i
            }
        })
    };
    return $.ajax({
        url: `https://fsiconnected.tech/api/fsi/magic-book/or-update`,
        method: 'POST',
        data: JSON.stringify(book),
        dataType: 'json',
        contentType: 'application/json'
    })
}