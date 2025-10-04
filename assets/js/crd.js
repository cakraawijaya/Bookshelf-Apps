function insertData(book) {
    let bookData = [];


    if (localStorage.getItem(localStorageKey) === "") {
        alert(`Data buku [GAGAL DITAMBAHKAN]`);
        localStorage.setItem(localStorageKey, 0);
    }else{
        alert(`Data buku [BERHASIL DITAMBAHKAN]`);
        bookData = JSON.parse(localStorage.getItem(localStorageKey));
    }

    bookData.unshift(book);
    localStorage.setItem(localStorageKey,JSON.stringify(bookData));

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

    books.forEach(book => {
        if (book.isCompleted == false) {
            let el = `
            <article class="book_item">
                <h3 style="text-align:justify;">${book.title}</h3>
                <p style="text-align:justify;">Penulis: ${book.author}</p>
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
            `

            inCompleted.innerHTML += el;
        }else{
            let el = `
            <article class="book_item">
                <h3 style="text-align:justify;">${book.title}</h3>
                <p style="text-align:justify;">Penulis: ${book.author}</p>
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
            `
            completed.innerHTML += el;
        }
    });
}

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