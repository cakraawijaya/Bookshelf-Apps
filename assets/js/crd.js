function insertData(book) {
    let bookData = [];

    const storedData = localStorage.getItem(localStorageKey);

    if (!storedData) {
        alert(`Data buku [BERHASIL DITAMBAHKAN]`);
        bookData = [];
    } else {
        alert(`Data buku [BERHASIL DITAMBAHKAN]`);
        bookData = JSON.parse(storedData);
    }

    bookData.unshift(book);
    localStorage.setItem(localStorageKey, JSON.stringify(bookData));

    showData(getData());
}

function getData() {
    return JSON.parse(localStorage.getItem(localStorageKey)) || [];
}

function showData(books = []) {
    const inCompleted = document.querySelector("#incompleteBookshelfList");
    const completed = document.querySelector("#completeBookshelfList");

    inCompleted.innerHTML = '';
    completed.innerHTML = '';

    const incompleteBooks = books.filter(book => book.isCompleted == false);
    const completeBooks = books.filter(book => book.isCompleted == true);

    if (incompleteBooks.length > 0) {
        incompleteBooks.forEach(book => {
            let el = `
            <article class="book_item">
                <h3 style="text-align:left;">${book.title}</h3>
                <p style="text-align:left;">Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>

                <div class="action" style="margin-top: 30px;">
                    <button class="green select-none" onclick="readedBook('${book.id}')">
                        <img class="agree-icon" style="top:10px;" src="assets/img/agree-icon.png" alt="agree-icon">&nbsp;
                        <span>Selesai dibaca</span>
                    </button>
                    <button class="red select-none" onclick="deleteBook('${book.id}')">
                        <img class="disagree-icon" style="top:10px;" src="assets/img/disagree-icon.png" alt="disagree-icon">&nbsp;
                        <span>Hapus buku</span>
                    </button>
                </div>
            </article>
            `;
            inCompleted.innerHTML += el;
        });
    } else {
        inCompleted.innerHTML = `
        <article class="book_item empty">
            <h3 style="text-align: center; color: red; margin: 20px 0;">
                [BELUM ADA DATA]
            </h3>
            <p class="p-empty">
                Harap Tambahkan Data Terlebih Dahulu !!
            </p>
        </article>
        `;
    }

    if (completeBooks.length > 0) {
        completeBooks.forEach(book => {
            let el = `
            <article class="book_item">
                <h3 style="text-align:left;">${book.title}</h3>
                <p style="text-align:left;">Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>

                <div class="action" style="margin-top: 30px;">
                    <button class="green select-none" onclick="unreadedBook('${book.id}')"> 
                        <img class="agree-icon" style="top:10px;" src="assets/img/agree-icon.png" alt="agree-icon">&nbsp;
                        <span>Belum selesai dibaca</span>
                    </button>
                    <button class="red select-none" onclick="deleteBook('${book.id}')">
                        <img class="disagree-icon" style="top:10px;" src="assets/img/disagree-icon.png" alt="disagree-icon">&nbsp;
                        <span>Hapus buku</span>
                    </button>
                </div>
            </article>
            `;
            completed.innerHTML += el;
        });
    } else {
        completed.innerHTML = `
        <article class="book_item empty">
            <h3 style="text-align: center; color: red; margin: 20px 0;">
                [BELUM ADA DATA]
            </h3>
            <p class="p-empty">
                Harap Tambahkan Data Terlebih Dahulu !!
            </p>
        </article>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    showData(getData());
});

function deleteBook(id) {
    let cfm = confirm("Anda yakin akan menghapus data buku ini ?");

    if (cfm == true) {
        const bookDataDetail = getData().filter(a => a.id == id);
        const bookData = getData().filter(a => a.id != id);
        localStorage.setItem(localStorageKey,JSON.stringify(bookData));
        showData(getData());
        alert(`[Buku ${bookDataDetail[0].title}] telah terhapus dari rak`);
    }else{
        return 0;
    }
}