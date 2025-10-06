btnSearch.addEventListener("click", function(e) {
    e.preventDefault();
    const searchResult = document.querySelector("#searchResult");
    searchResult.innerHTML = '';

    if (!localStorage.getItem(localStorageKey) || localStorage.getItem(localStorageKey) === "[]") {    
        showSearchResult([]);
        searchValue.value = '';
        return;
    }

    const query = searchValue.value.trim().toLowerCase();
    const data = getData();

    const getByTitle = data.filter(a => a.title.toLowerCase() === query);
    const getByAuthor = data.filter(a => a.author.toLowerCase() === query);
    const getByYear = data.filter(a => a.year == query);

    const results = getByTitle.length ? getByTitle 
                    : getByAuthor.length ? getByAuthor 
                    : getByYear.length ? getByYear 
                    : [];

    showSearchResult(results);
    searchValue.value = '';
});

function showSearchResult(books) {
    const searchResult = document.querySelector("#searchResult");
    searchResult.innerHTML = '';

    if (books.length === 0) {
        searchResult.innerHTML = `
            <article class="book_item">
                <h3>Hasil Pencarian :</h3>
                <p class="not-found">Data tidak ditemukan.</p>
                <p class="text-muted"><em>*Coba periksa kembali kata kunci pencarian Anda.</em></p>
            </article>
        `;
        return;
    }

    books.forEach(book => {
        let el = `
        <article class="book_item">
            <h3>Hasil Pencarian :</h3>
            <p class="search">Buku "<strong><u>${book.title}</u></strong>" ditemukan.</p>
            <h3 class="title">${book.title}</h3>
            <p class="author">Penulis: ${book.author}</p>
            <p class="year">Tahun: ${book.year}</p>
            <p class="ket">
                Keterangan : 
                <span class="${book.isCompleted ? 'sudah' : 'belum'}">
                    ${book.isCompleted ? '<strong>Sudah dibaca</strong>' : '<strong>Belum selesai dibaca</strong>'}
                </span>
            </p>
        </article>
        `;
        searchResult.innerHTML += el;
    });
}