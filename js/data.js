var pages = [];

function getPages(bookName = "hieunv") {
    return $.ajax({
        url: `https://fsiconnected.tech/api/fsi/magic-book/magic-book?name=${bookName}`,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json'
    })
}