const backdrop1 = document.querySelector('.backdrop1');
const backdrop2 = document.querySelector('.backdrop2');
let gSearchQuery = ''; 
let gLayoutView = localStorage.getItem('bookLayoutPref') || 'table';

function onInit(){
    renderBookTable()
}

function renderBookTable(){
    const booksToDisplay = gBooks.filter(book => {
        return book.title.toLowerCase().includes(gSearchQuery);
    });
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
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>`;

        strHtml += booksToDisplay.map(book => `
            <tr>
                <td>${book.title}</td>
                <td>$${book.price}</td>
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