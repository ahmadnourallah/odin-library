const myLibrary = [];
const cardContainer = document.querySelector(".card-container");
const addBtn = document.querySelector(".add-btn");
const dialog = document.querySelector("dialog");
const dialogWrapper = document.querySelector("dialog .wrapper");
const dialogForm = document.querySelector("dialog form");

let statusBtns;
let removeBtns;

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

    statusBtns = document.querySelectorAll(".status");
    removeBtns = document.querySelectorAll(".remove");

    statusBtns.forEach(btn => btn.addEventListener("click", event => {
        let book = myLibrary[event.target.parentElement.dataset.index];
        book.toggleStatus();
        event.target.dataset["read"] = book.status;
        event.target.textContent = book.status ? "Read" : "Not read";
    }));

    removeBtns.forEach(btn => btn.addEventListener("click", event => {
        let card = event.target.parentElement;
        
        myLibrary.pop(card.dataset.index);
        card.remove();
    }));
}

addBtn.addEventListener("click", () => {
    dialogForm.reset();
    dialog.showModal();
});

dialog.addEventListener("click", () => dialog.close());
dialogWrapper.addEventListener("click", event => event.stopPropagation());

dialogForm.addEventListener("submit", event => {
    addBook(event.target.title.value, event.target.author.value,
        event.target.pages.value, event.target.status.checked);
});

loadBooks();