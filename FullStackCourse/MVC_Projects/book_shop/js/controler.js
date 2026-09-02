const backdrop1 = document.querySelector('.backdrop1');
const backdrop2 = document.querySelector('.backdrop2');

function onInit(){
    renderBookTable()
}
//first book table render
function renderBookTable(){
    let strHtml = `<th>Title</th>
            <th>Price</th>
            <th>Actions</th>
            `;
    //  gBooks;
    let books = gBooks.map(book=>{
        return `
            <tr>
                <td>${book.title}</td>
                <td>${book.price}</td>
                <td class='actions'><button type='button' title='btn' class='btn btn-Read' onclick="ShowDetailsModal('${book.id}',event)">Read</button>
                    <button type='button' title='btn' class='btn btn-Update' onclick="onUpdateBook('${book.id}',event)">Update</button>
                    <button type='button' title='btn' class='btn btn-Delete' onclick="onRemoveBook('${book.id}' ,event)">Delete</button>
                </td>
            </tr>
            `
    }).join('');
    if(books.length==0) {strHtml+=`
        <tr class="noResult-row">
            <td colspan="4" rowspan="4">No matching book were found...</td>   
        </tr>
        `
    }
    else{
        strHtml+=books;

    }
    document.querySelector(".book-table").innerHTML=strHtml;
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