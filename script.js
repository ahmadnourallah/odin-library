class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

class Library {
    constructor() {
        this.books = [];
    
        if (localStorage.getItem("user.library")) {
            this.books = JSON.parse(localStorage.getItem("user.library"));    
        }
    }

    addBook(title, author, pages, status) {
        let book = new Book(title, author, pages, status);
        this.books.push(book);    
    }

    removeBook(index) {
        this.books.pop(index);
    }

    updateLocalLibrary() {
        localStorage.setItem("user.library", JSON.stringify(this.books));
    }
}


const Display = (function () {
    const cardContainer = document.querySelector(".card-container");
    const addBtn = document.querySelector(".add-btn");
    const dialog = document.querySelector("dialog");
    const dialogWrapper = document.querySelector("dialog .wrapper");
    const dialogForm = document.querySelector("dialog form");
    const library = new Library();
    
    let statusBtns;
    let removeBtns;

    addBtn.addEventListener("click", () => {
        dialogForm.reset();
        dialog.showModal();
    });
    
    dialog.addEventListener("click", () => {
        dialog.classList.add("hide");
    
        dialog.addEventListener("animationend", function removeAnimation() {
            dialog.classList.remove("hide");
            dialog.close();
            dialog.removeEventListener("animationend", removeAnimation);
        });
    });
    
    dialogWrapper.addEventListener("click", event => event.stopPropagation());
    
    dialogForm.addEventListener("submit", event => {
        library.addBook(event.target.title.value, event.target.author.value,
            event.target.pages.value, event.target.status.checked);
        library.updateLocalLibrary();
        loadBooks();
    });

    function loadBooks() {
        cardContainer.replaceChildren();
    
        library.books.forEach((book, index) => {
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
            let book = library.books[event.target.parentElement.dataset.index];
            book.status = !book.status;
            library.updateLocalLibrary();
            event.target.dataset["read"] = book.status;
            event.target.textContent = book.status ? "Read" : "Not read";
        }));
    
        removeBtns.forEach(btn => btn.addEventListener("click", event => {
            let card = event.target.parentElement;
            
            library.removeBook(card.dataset.index);
            library.updateLocalLibrary();
            card.remove();
        }));
    }
        
    return { loadBooks }
})();

Display.loadBooks();