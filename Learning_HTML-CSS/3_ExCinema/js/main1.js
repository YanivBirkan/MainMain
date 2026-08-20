let gCinema ;
let gElSelectedSeat = null;
function onInit(){
    gCinema = createCinema(6,10);
    renderCinema();
}

function createCinema(rows , cols) {
    const cinema = [];
    for (let i = 0; i < rows; i++) {
        cinema[i]=[];
        for (let j = 0; j < cols; j++) {
            cinema[i][j] =[];
            const cell = { isSeat: j !== 2 && j !== 7 && i!==3} 
            if (cell.isSeat) {
                cell.price = 5 + i;
                cell.isBooked = false;
            }
            cinema[i][j] = cell;
        }
    }
    return cinema;
}
function renderCinema(){
    var strHTML = '';
    
    for (var i = 0; i < gCinema.length; i++) {
        strHTML += `<tr class="cinema-row" >\n`;
        for (var j = 0; j < gCinema[0].length; j++) {
            const cell = gCinema[i][j];

            // For a cell of type SEAT add seat class
            var className = (cell.isSeat) ? 'seat' : '';
            
            // For a cell that is booked add booked class
            if (cell.isBooked) {
                className += ' booked';
            }
            // Add a seat title
            const title = `Seat: ${i + 1}, ${j + 1}`;

            strHTML += `\t<td title="${title}" class="cell ${className}"  data-i="${i}" data-j="${j}"
                            onclick="onCellClicked(this, ${i}, ${j})" >
                         </td>\n`;
        }
        strHTML += `</tr>\n`;
    }

    const elSeats = document.querySelector('.cinema-seats');
    elSeats.innerHTML = strHTML;
    console.table(gCinema)
}

function onCellClicked(elCell, i, j) {
    const cell = gCinema[i][j];
    if (!cell.isSeat || cell.isBooked) return
    elCell.classList.add("selected");

    if (gElSelectedSeat) {
        gElSelectedSeat.classList.remove('selected')
    }
    gElSelectedSeat = (gElSelectedSeat !== elCell) ? elCell : null


    if (gElSelectedSeat) {
        showSeatDetails( { i, j } )
    } else {
        hideSeatDetails()
    }

}

function showSeatDetails(pos){
    const elPopup = document.querySelector(".popup");
    const elBtn = elPopup.querySelector('.btn-book-seat');
    const elBtns =elPopup.querySelectorAll(".btn");
    elPopup.removeAttribute("hidden");
    const seat = gCinema[pos.i][pos.j]

    elPopup.querySelector("h2 span").innerText = `${pos.i}-${pos.j}`;
    elPopup.querySelector("h3 span").innerText = `${seat.price}`;
    elPopup.querySelector('h4 span').innerText = countAvailableSeatsAround(gCinema, pos.i, pos.j);

    elBtns.forEach(elBtn => {
        elBtn.dataset.i = pos.i;
        elBtn.dataset.j = pos.j;
    });

    elPopup.hidden = false;

}

function hideSeatDetails(){
    document.querySelector('.popup').hidden = true

}

function onBookSeat(elBtn){
    const i = +elBtn.dataset.i;
    const j = +elBtn.dataset.j;
    debugger
    gCinema[i][j].isBooked = true;
    renderCinema();

    hideSeatDetails();
}

function check(elBtn){
    const i = +elBtn.dataset.i;
    const j = +elBtn.dataset.j;
    
    highlightAvailableSeatsAround(gCinema,i,j)
    setTimeout(() => {
        const highlightedCells = document.querySelectorAll('.highlight');
        highlightedCells.forEach(cell => {
        cell.classList.remove('highlight');
    });
    }, 2000);
}

function highlightAvailableSeatsAround(board, rowIdx, colIdx) {
    var count = 0
    
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.isSeat && !currCell.isBooked) {
                count++
                highlight(i,j);
            }
        }
    }


    return count
}
function highlight(i,j){
   let elCell=document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
    elCell.classList.add("highlight");
}

// function removeHighlight(i,j){
//    let elCell=document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
//     elCell.classList.remove("highlight");
// }
function countAvailableSeatsAround(board, rowIdx, colIdx) {
    var count = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.isSeat && !currCell.isBooked) count++
        }
    }
    return count
}

function removeHighlight(){
    currCell.classList.remove('highlight')
    
}

function closePop(elBtn){
    let elPopup = document.querySelector(".popup")
    elPopup.hidden = true;
    let i = elBtn.dataset.i;
    let j = elBtn.dataset.j;
    let elCell=document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
    elCell.classList.remove("highlight")
    renderCinema();
}