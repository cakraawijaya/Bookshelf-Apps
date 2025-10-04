btnSearch.addEventListener("click",function(e) {
    e.preventDefault()
    if (localStorage.getItem(localStorageKey) == "") {    
        alert("Tidak ada data buku");
        return location.reload();
    }else{
        const getByTitle = getData().filter(a => a.title == searchValue.value.trim());
        if (getByTitle.length == 0) {
            const getByAuthor = getData().filter(a => a.author == searchValue.value.trim());
            if (getByAuthor.length == 0) {
                const getByYear = getData().filter(a => a.year == searchValue.value.trim());
                if (getByYear.length == 0) {
                    alert(`Data yang anda cari tidak ditemukan`);
                    return location.reload();
                }else{
                    showSearchResult(getByYear);
                }
            }else{
                showSearchResult(getByAuthor);
            }
        }else{
            showSearchResult(getByTitle);
        }
    }

    searchValue.value = '';
})

function showSearchResult(books) {
    const searchResult = document.querySelector("#searchResult");

    searchResult.innerHTML = '';

    books.forEach(book => {
        let el = `
        <article class="book_item">
            <h3>Hasil Pencarian :</h3>
            <p class="search">Pencarian menunjukkan bahwa data berasal dari buku "${book.title}" </p>
            <h3>${book.title}</h3>
            <p>Penulis: ${book.author}</p>
            <p>Tahun: ${book.year}</p>
            <p class="ket">
                Keterangan : 
                <span class="${book.isCompleted ? 'sudah' : 'belum'}">
                    ${book.isCompleted === 'Sudah dibaca' ? 'Sudah dibaca' : 'Belum selesai dibaca'}
                </span>
            </p>
        </article>
        `;

        searchResult.innerHTML += el;
    });
}