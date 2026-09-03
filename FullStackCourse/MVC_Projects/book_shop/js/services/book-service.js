const STORAGE_KEY ="booksDB";
let gBooks =[];  
//local storage:
_createBooks();

// function getBooksToDisplay(){
//     return gBooks;
// }


function getBooks(options = {}) {
    // console.log('options:', options)
    const filterBy = options.filterBy
    // console.log('filterBy:', filterBy)
    const sortBy = options.sortBy
    // console.log('sortBy:', sortBy)
    const page = options.page
    // console.log('page:', page)

    var books = gBooks

    books = _filterBooks(filterBy)

    if (sortBy.title) {
        const sortDir = sortBy.title
        books = books.toSorted((b1, b2) => b1.title.localeCompare(b2.title) * sortDir)

    } else if (sortBy.price) {
        const sortDir = sortBy.price
        books = books.toSorted((b1, b2) => (b1.price - b2.price) * sortDir)
    }

    // console.log('cars:', cars)
    const startIdx = page.idx * page.size // 0 , 3 , 6
    books = books.slice(startIdx, startIdx + page.size) // 0-3 , 3-6 , 6-9

    return books
}

function _filterBooks(filterBy) {
    debugger
    var books = gBooks
    if (filterBy.title) {
        books = books.filter(book => book.title.includes(filterBy.title))
    }
    if (filterBy.minSpeed) {
        books = books.filter(book => book.rating >= filterBy.rating)
    }
    return books
}


function removeBook(id){
    gBooks = gBooks.filter(book=> String(book.id) !==String(id))
    _saveBooks()
    console.log(gBooks)
}
function updateBook(id){
    const book = getBookById(id);
    ShowAddModal(book.id)
    book.price=updateBookDetails(book);
    _saveBooks()
}
function updateBookDetails(book){
    return +prompt(`Enter new price for " ${book.title} ": `);
}
function addBook(title,price){
    let newBook= {
        id: getRandomID(),
        title: title,
        price: price,
        imgUrl: imgsSrc[getRandomInt(0,5)],
        details:fixedLorem(getRandomInt(40,70)),
        rating:getRandomInt(1,6)    
    }  
    gBooks.push(newBook);
    _saveBooks()

}
function showFlashMessage(text, isDanger = false) {
    const msgEl = document.querySelector('.user-msg');
    msgEl.innerText = text;
    if (isDanger) {
        msgEl.classList.add('danger');
    } else {
        msgEl.classList.remove('danger');
    }
    msgEl.classList.add('open');
    setTimeout(() => {
        msgEl.classList.remove('open');
    }, 2000);
}
function renderSelectedBookDetails(id){
    const book = getBookById(id);
    return `
            <h2  class="book-details-title">${book.title}</h2>
            <div class="book-details-main-div">
            <section class="details-section">
                <h4>Price: ${book.price} </h4>
                <h4>Rating: ${createRatingStars(book.rating)}</h4> 
                <article class="Lorem"><h4>Description :</h4> ${book.details}</article>
            </section>
            <section class="img-section">
                <img src="${book.imgUrl}" class="book-details-img" title="img"></img>
            </section>
            </div>
    `
}
function createRatingStars(count){
    return "⭐".repeat(count);
}
function getBookById(id){
   return gBooks.find(book=> book.id===id);
}
function getAllBooksPrices(){
    let newBookPrices = gBooks.map(book=> Number(book.price))
    return newBookPrices.reduce((acc,price) =>{
        if(price<80) acc.cheap++    
        if(price>80 && price<200) acc.avarage++    
        if(price>200) acc.expensive++    
        return acc
    },{cheap: 0 , avarage: 0 , expensive: 0 });
}

//local storage:
function _createBooks(){
    gBooks= loadFromStorage(STORAGE_KEY);
    if(!gBooks||!gBooks.length){
        gBooks= create2Books()
    }
    _saveBooks();

}
function _saveBooks(){
    saveToStorage(STORAGE_KEY,gBooks);
}