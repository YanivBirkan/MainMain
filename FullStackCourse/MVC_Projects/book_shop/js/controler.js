const backdrop1 = document.querySelector('.backdrop1');
const backdrop2 = document.querySelector('.backdrop2');
let gSearchQuery = ''; 
let gLayoutView = localStorage.getItem('bookLayoutPref') || 'table';

let gQueryOptions = {
    filterBy: { title: '', rating: 0 },
    sortBy: {},
    page: { idx: 0, size: 6 }
}



function onInit(){
    renderBookTable()
}

function renderBookTable(){
    const booksToDisplay = getBooks(gQueryOptions)
    // const booksToDisplay = gBooks.filter(book => {
    //     return book.title.toLowerCase().includes(gSearchQuery);
    // });
    const container = document.querySelector(".books-display-container");
        // 2. Check if the active filter returns an empty set
    if (booksToDisplay.length === 0) {
        container.innerHTML = `<div class="no-results-box" style="height:200px; display:flex; justify-content:center; align-items:center;">No books found matching your search.</div>`;
        return;
    }
    let strHtml=``;
    // 3. Render Table Template Layout
    if (gLayoutView === 'table') {
        strHtml = `<table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Actions</th>
                    
                </tr>
            </thead>
            <tbody>`;

        strHtml += booksToDisplay.map(book => `
            <tr>
                <td>${book.title}</td>
                <td>$${book.price}</td>
                <td>${createRatingStars(book.rating)}</td>
                <td class="actions">
                    <button type="button" class="btn btn-Read" onclick="ShowDetailsModal('${book.id}', event)">Read</button>
                    <button type="button" class="btn btn-Update" onclick="onUpdateBook('${book.id}', event)">Update</button>
                    <button type="button" class="btn btn-Delete" onclick="onRemoveBook('${book.id}', event)">Delete</button>
                </td>
            </tr>
        `).join('');

        strHtml += `</tbody></table>`;
        container.innerHTML = strHtml;
    } 
    
    // 4. Render Grid Card Template Layout
    else if (gLayoutView === 'grid') {
    strHtml = `<div class="books-card-grid">`;

        strHtml += booksToDisplay.map(book => `
            <div class="book-card">
                <img src="${book.imgUrl}" class="card-img" alt="Book Image">
                <div class="card-info">
                    <h3>${book.title}</h3>
                    <p class="card-price">Price: $${book.price}</p>
                    <p class="book-price">Rating: ${createRatingStars(book.rating)}</p>
                    <div class="card-actions">
                        <button type="button" class="btn btn-Read" onclick="ShowDetailsModal('${book.id}', event)">Read</button>
                        <button type="button" class="btn btn-Update" onclick="onUpdateBook('${book.id}', event)">Update</button>
                        <button type="button" class="btn btn-Delete" onclick="onRemoveBook('${book.id}', event)">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');

        strHtml += `</div>`;
        container.innerHTML = strHtml;
    }
    // strHtml += `</tbody>`;
    // document.querySelector(".book-table").innerHTML = strHtml;
    // document.querySelector(".book-table").innerHTML=strHtml;
    let booksPrices = getAllBooksPrices();
    document.querySelector(".cheap-books-num").innerText = booksPrices.cheap;
    document.querySelector(".avg-books-num").innerText = booksPrices.avarage;
    document.querySelector(".exp-books-num").innerText = booksPrices.expensive;


}
function onSetLayoutView(viewType) {
    gLayoutView = viewType;
    localStorage.setItem('bookLayoutPref', viewType); 
    renderBookTable(); 
}
function onSetSearch(textInput) {
    gSearchQuery = textInput.value.toLowerCase().trim(); 
    renderBookTable(); 
}
function onRemoveBook(id,ev){
    ev.stopPropagation();
    removeBook(id);
    console.log("books:" , gBooks);
    renderBookTable();
}
function onUpdateBook(id,ev){
    ev.stopPropagation();
    updateBook(id);
    console.log("books:" , gBooks);
    renderBookTable();
}
function onAddBook(){
    let newBookTitle = document.querySelector(".newBook-title-input").value;
    let newBookPrice = document.querySelector(".newBook-price-input").value;        
    if (!newBookTitle) return; 
    if (!newBookPrice || isNaN(newBookPrice) || Number(newBookPrice) <= 0) return;
    addBook(newBookTitle, newBookPrice);
    closeModal()
    renderBookTable()
    showFlashMessage("Book added successfully!");
    document.querySelector(".newBook-title-input").value ="";
    document.querySelector(".newBook-price-input").value ="";
}
//modal functions
function ShowAddModal(id,event){
    backdrop1.classList.add('show');
}
function closeModal(event) {
    backdrop1.classList.remove('show');
}
function ShowDetailsModal(id,event){
    backdrop2.classList.add('show');
    document.querySelector(".book-details-text").innerHTML= renderSelectedBookDetails(id);
}
function closeModal2(event) {
    backdrop2.classList.remove('show');
}




// // Filter, Sort & Pagination
function onclear(){
    gQueryOptions.filterBy = { title: '', rating: 0 }
    gQueryOptions.sortBy = {}
    gQueryOptions.page.idx = 0

    // 2. Clear input fields in the DOM
    const elSearchInput = document.querySelector('.filter-by input[type="text"]')
    const elRatingInput = document.querySelector('.filter-by input[type="range"]')
    const elSortSelect = document.querySelector('.sort-by select')
    const elSortDesc = document.querySelector('.sort-by .sort-desc')

    if (elSearchInput) elSearchInput.value = ''
    if (elRatingInput) elRatingInput.value = 0
    if (elSortSelect) elSortSelect.value = "title"
    if (elSortDesc) elSortDesc.checked = false

    renderBookTable()
    setQueryParams()
}
function onSetFilterBy(filterBy) {
    // console.log('filterBy:', filterBy)
    if (filterBy.title !== undefined) {
        gQueryOptions.filterBy.title = filterBy.title
    } else if (filterBy.rating !== undefined) {
        gQueryOptions.filterBy.rating = filterBy.rating
    }
    // console.log('gQueryOptions.filterBy:', gQueryOptions.filterBy)

    gQueryOptions.page.idx = 0
    renderBookTable()
    setQueryParams()
}

function onSetSortBy() {

    const elSortField = document.querySelector('.sort-by select')
    const elSortDir = document.querySelector('.sort-by .sort-desc')

    const sortField = elSortField.value
    // console.log('sortField:', sortField)
    const sortDir = elSortDir.checked ? -1 : 1
    // console.log('sortDir:', sortDir)

    gQueryOptions.sortBy = { [sortField]: sortDir }
    // console.log('gQueryOptions.sortBy:', gQueryOptions.sortBy)

    gQueryOptions.page.idx = 0
    renderBookTable()
    setQueryParams()
}

function onNextPage() {
    // console.log('Getting next page...')

    const pageCount = getPageCount(gQueryOptions)

    if (gQueryOptions.page.idx === pageCount - 1) {
        gQueryOptions.page.idx = 0
    } else {
        gQueryOptions.page.idx++
    }

    // console.log('gQueryOptions.page:', gQueryOptions.page)
    renderBookTable()
    setQueryParams()
}

// // Query Params

function readQueryParams() {
    const queryParams = new URLSearchParams(window.location.search)
    gQueryOptions.filterBy = {
        title: queryParams.get('title') || '',
        rating: +queryParams.get('rating') || 0
    }

    if (queryParams.get('sortBy')) {
        const prop = queryParams.get('sortBy')
        const dir = queryParams.get('sortDir')
        gQueryOptions.sortBy[prop] = dir
    }

    if (queryParams.get('pageIdx')) {
        gQueryOptions.page.idx = +queryParams.get('pageIdx')
        gQueryOptions.page.size = +queryParams.get('pageSize')
    }
    renderQueryParams()
}

function renderQueryParams() {

    document.querySelector('.filter-by input[type="text"]').value = gQueryOptions.filterBy.title
    document.querySelector('.filter-by input[type="range"]').value = gQueryOptions.filterBy.rating

    const sortKeys = Object.keys(gQueryOptions.sortBy)
    const sortBy = sortKeys[0]
    const dir = gQueryOptions.sortBy[sortKeys[0]]

    document.querySelector('.sort-by select').value = sortBy || ''
    // document.querySelector('.sort-by .sort-desc').checked = (dir === '-1') ? true : false

}

function setQueryParams() {
    const queryParams = new URLSearchParams()

    queryParams.set('title', gQueryOptions.filterBy.title)
    queryParams.set('rating', gQueryOptions.filterBy.rating)

    const sortKeys = Object.keys(gQueryOptions.sortBy)
    if (sortKeys.length) {
        queryParams.set('sortBy', sortKeys[0])
        queryParams.set('sortDir', gQueryOptions.sortBy[sortKeys[0]])
    }

    if (gQueryOptions.page) {
        queryParams.set('pageIdx', gQueryOptions.page.idx)
        queryParams.set('pageSize', gQueryOptions.page.size)
    }

    const newUrl =
        window.location.protocol + "//" +
        window.location.host +
        window.location.pathname + '?' + queryParams.toString()

    window.history.pushState({ path: newUrl }, '', newUrl)
}
