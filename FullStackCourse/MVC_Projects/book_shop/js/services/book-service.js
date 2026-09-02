const STORAGE_KEY ="booksDB";
let gBooks =[];  
//local storage:
_createBooks();

function getBooksToDisplay(){
    return gBooks;
}

function removeBook(id){
    gBooks = gBooks.filter(book=> String(book.id) !==String(id))
    _saveBooks()
    console.log(gBooks)
}
function updateBook(id){
    const book = gBooks.find(book=> book.id===id);
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
         details:fixedLorem(getRandomInt(40,70))    
    }  
    gBooks.push(newBook);
    _saveBooks()

}
function renderSelectedBookDetails(id){
    const book = gBooks.find(book=> book.id===id);
    return `
            <h2  class="book-details-title">${book.title}</h2>
            <div class="book-details-main-div">
            <section class="details-section">
                <h4> Price: ${book.price} </h4>
                <article class="Lorem"><h4>Description :</h4> ${book.details}</article>
            </section>
            <section class="img-section">
                <img src="${book.imgUrl}" class="book-details-img" title="img"></img>
            </section>
            </div>
    `
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