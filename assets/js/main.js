const localStorageKey = "BOOKS_DATA";

const title = document.querySelector("#inputBookTitle");
const errorTitle = document.querySelector("#errorTitle");

const author = document.querySelector("#inputBookAuthor");
const errorAuthor = document.querySelector("#errorAuthor");

const year = document.querySelector("#inputBookYear");
const errorYear = document.querySelector("#errorYear");

const readed = document.querySelector("#inputBookIsComplete");
const btnSubmit = document.querySelector("#bookSubmit");


const searchValue = document.querySelector("#searchBookTitle");
const btnSearch = document.querySelector("#searchSubmit");


function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}


function validateForm() {
    let isValid = true;

    // Reset error
    title.classList.remove("error");
    author.classList.remove("error");
    year.classList.remove("error");

    errorTitle.classList.add("error-display");
    errorAuthor.classList.add("error-display");
    errorYear.classList.add("error-display");

    if (title.value.trim() === "") {
        title.classList.add("error");
        errorTitle.classList.remove("error-display");
        isValid = false;
    }

    if (author.value.trim() === "") {
        author.classList.add("error");
        errorAuthor.classList.remove("error-display");
        isValid = false;
    }

    if (year.value.trim() === "") {
        year.classList.add("error");
        errorYear.classList.remove("error-display");
        isValid = false;
    }

    return isValid;
}


function getData() {
    const data = localStorage.getItem(localStorageKey);
    return data ? JSON.parse(data) : [];
}


function saveData(data) {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
}


function insertData(newBook) {
    const booksData = getData();
    booksData.push(newBook);
    saveData(booksData);
    showData(booksData);
}


function showData(books) {
    const listIncomplete = document.getElementById("incompleteBookshelfList");
    const listComplete = document.getElementById("completeBookshelfList");

    if (!listIncomplete || !listComplete) return;

    listIncomplete.innerHTML = "";
    listComplete.innerHTML = "";

    books.forEach(book => {
        const bookItem = document.createElement("article");
        bookItem.classList.add("book_item");
        bookItem.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Year: ${book.year}</p>
        `;

        if (book.isCompleted) {
            listComplete.appendChild(bookItem);
        } else {
            listIncomplete.appendChild(bookItem);
        }
    });
}


window.addEventListener("load", function() {
    setCurrentYear();

    const booksData = getData();
    showData(booksData);
});

btnSubmit.addEventListener("click", function(e) {
    e.preventDefault();

    if (validateForm()) {
        const newBook = {
            id: +new Date(),
            title: title.value.trim(),
            author: author.value.trim(),
            year: year.value,
            isCompleted: readed.checked
        };

        insertData(newBook);

        title.value = "";
        author.value = "";
        year.value = "";
        readed.checked = false;
    }
});