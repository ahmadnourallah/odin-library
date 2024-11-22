const myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status
}

Book.prototype.toggleStatus = function () {
    this.status = !this.status;
}

function addBook(title, author, pages, status) {
    let book = new Book(title, author, pages, status);
    myLibrary.push(book);
}