const myLibrary = [];
const cardContainer = document.querySelector(".card-container");
const addBtn = document.querySelector(".add-btn");
const statusBtn = document.querySelector(".status");
const removeBtn = document.querySelector(".remove");

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
    loadBooks();
}

function loadBooks() {
    cardContainer.replaceChildren();
    myLibrary.forEach((book, index) => {
        let card = document.createElement("div");
        card.classList.add("card", "shadow");
        card.dataset.index = index;
        card.innerHTML = `
            <div class="title">${book.title}</div>
            <div class="author">${book.author}</div>
            <div class="pages">${book.pages} pages</div>
            <button class="status" data-read="${book.status}">${book.status ? "Read" : "Not read"}</button>
            <button class="remove">Remove</button>
        `;

        cardContainer.append(card);
    });
}