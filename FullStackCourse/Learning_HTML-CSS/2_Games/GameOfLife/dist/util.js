"use strict";
const GAME_FREQ = 1000;
const LIFE = "🎃";
const SUPER_LIFE = "🤖";
let gBoard;
let gGameInterval;
function onToggleGame(elBtn) {
    // console.log('gGameInterval:', gGameInterval)
    // console.log('elBtn:', elBtn)
    if (gGameInterval) {
        clearInterval(gGameInterval);
        gGameInterval = null;
        elBtn.innerText = "Start";
    }
    else {
        gGameInterval = setInterval(play, GAME_FREQ);
        elBtn.innerText = "Pause";
    }
}
function onInit() {
    gBoard = createBoard();
    renderBoard(gBoard);
    // gGameInterval=setInterval(play,GAME_FREQ)
}
function createBoard() {
    let board = [];
    for (let i = 0; i < 8; i++) {
        board[i] = [];
        for (let j = 0; j < 8; j++) {
            board[i][j] = Math.random() > 0.5 ? LIFE : "";
        }
    }
    return board;
}
function renderBoard(board) {
    console.table(board);
    let strHTML = "";
    for (let i = 0; i < gBoard.length; i++) {
        strHTML += `<tr>`;
        for (let j = 0; j < gBoard[0].length; j++) {
            let cell = board[i][j];
            let className = cell ? "occupied" : "";
            strHTML += `<td class="${className}" onclick="onCellClicked(this,${i},${j})"
                         data-i="${i}" data-j="${j}">
                            ${cell}
                        </td>`;
        }
    }
    strHTML += "</tr>\n";
    let elBoard = document.querySelector(".board");
    elBoard.innerHTML = strHTML;
}
function play() {
    gBoard = runGeneration(gBoard);
    renderBoard(gBoard);
}
function runGeneration(board) {
    let newBoard = copyMat(board);
    for (let i = 0; i < newBoard.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            let numOfnegs = countNegs(i, j, board);
            if (numOfnegs > 2 && numOfnegs < 6) {
                if (board[i][j] === "")
                    newBoard[i][j] = LIFE;
            }
            else if (board[i][j] === LIFE)
                newBoard[i][j] = "";
        }
    }
    return newBoard;
}
function onCellClicked(elCell, cellI, cellJ) {
    if (gBoard[cellI][cellJ] === LIFE) {
        gBoard[cellI][cellJ] = SUPER_LIFE;
        elCell.innerText = SUPER_LIFE;
        blowUpNegs(cellI, cellJ);
    }
}
function blowUpNegs(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length)
            continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[0].length)
                continue;
            if (i === cellI && j === cellJ)
                continue;
            var cell = gBoard[i][j];
            if (cell === LIFE) {
                // console.log("i,j:", i, j);
                gBoard[i][j] = "";
                let elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
                elCell.innerText = "";
                elCell.classList.remove("occupied");
            }
        }
    }
}
function countNegs(cellI, cellJ, mat) {
    var count = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length)
            continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ)
                continue;
            if (j < 0 || j >= mat[i].length)
                continue;
            if (mat[i][j])
                count++;
        }
    }
    return count;
}
function copyMat(mat) {
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = [];
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j];
        }
    }
    return newMat;
}
