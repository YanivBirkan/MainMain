"use strict";
// const GAME_FREQ :number= 1000
// const LIFE :string= '🎃'
// const SUPER_LIFE :string= '🤖'
// // The Model
// var gBoard:string[][];
// var gGameInterval:number |null
// function onInit() {
//     gBoard = createBoard();
//     console.table(gBoard);
//     renderBoard(gBoard);
// }
// function onToggleGame(elBtn:HTMLElement) {
//     // console.log('gGameInterval:', gGameInterval)
//     // console.log('elBtn:', elBtn)
//     if (gGameInterval) {
//         clearInterval(gGameInterval)
//         gGameInterval = null
//         elBtn.innerText = 'Start'
//     } else {
//         gGameInterval = setInterval(play, GAME_FREQ)
//         elBtn.innerText = 'Pause'
//     }
// }
// function play() {
//     gBoard = runGeneration(gBoard)
//     renderBoard(gBoard)
// }
// function createBoard() {
//     let board:string[][] = [];
//     for (var i = 0; i < 8; i++) {
//         board.push([])
//         for (var j = 0; j < 8; j++) {
//             board[i][j] = (Math.random() > 0.5) ? LIFE : ''
//         }
//     }
//     return board
// }
// function renderBoard(board:string[][]) {
//     // console.table(board)
//     var strHTML = ''
//     for (var i = 0; i < board.length; i++) {
//         strHTML += '<tr>'
//         for (var j = 0; j < board[0].length; j++) {
//             var cell = board[i][j]
//             // console.log('cell:', cell)
//             var className = (cell) ? 'occupied' : ''
//             strHTML += `<td class="${className}"
//                         onclick="onCellClicked(this,${i},${j})"
//                         data-i="${i}" data-j="${j}">
//                            ${cell}
//                         </td>`
//         }
//         strHTML += '</tr>'
//     }
//     var elBoard = document.querySelector<HTMLElement>('.board')!;
//     elBoard.innerHTML = strHTML
// }
// function onCellClicked(elCell:HTMLElement, cellI:number, cellJ:number) {
//     // console.log('elCell:', elCell)
//     // console.log('cellI,cellJ:', cellI, cellJ)
//     // console.log('gBoard[cellI][cellJ]:', gBoard[cellI][cellJ])
//     // if (elCell.classList.contains('occupied')) {
//     // if (elCell.innerText === LIFE) {
//     if (gBoard[cellI][cellJ] === LIFE) {
//         // Update Model:
//         gBoard[cellI][cellJ] = SUPER_LIFE
//         // Update Dom:
//         elCell.innerText = SUPER_LIFE
//         blowUpNegs(cellI, cellJ)
//     }
// }
// function blowUpNegs(cellI:number, cellJ:number) {
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= gBoard.length) continue
//         // console.log('i:', i)
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (j < 0 || j >= gBoard[0].length) continue
//             if (i === cellI && j === cellJ) continue
//             // console.log('j:', j)
//             var cell = gBoard[i][j]
//             if (cell === LIFE) {
//                 console.log('i,j:', i, j)
//                 // Update mode:
//                 gBoard[i][j] = ''
//                 // Update dom:
//                 let elCell:HTMLElement = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)!
//                 // console.log('elCell:', elCell)
//                 elCell.innerText = ''
//                 elCell.classList.remove('occupied')
//             }
//         }
//     }
// }
// function runGeneration(board:string[][]) {
//     var newBoard = copyMat(board)
//     for (var i = 0; i < board.length; i++) {
//         for (var j = 0; j < board[0].length; j++) {
//             var numOfNegs = countNegs(i, j, board)
//             if ((numOfNegs > 2) && (numOfNegs < 6)) {
//                 if (board[i][j] === '') newBoard[i][j] = LIFE
//             } else if (board[i][j] === LIFE) newBoard[i][j] = ''
//         }
//     }
//     return newBoard
// }
// function countNegs(cellI:number, cellJ:number, mat:string[][]) {
//     var count = 0
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= mat.length) continue
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (i === cellI && j === cellJ) continue
//             if (j < 0 || j >= mat[i].length) continue
//             // if (mat[i][j] === LIFE || mat[i][j]=== SUPER_LIFE) count++
//             if (mat[i][j]) count++
//         }
//     }
//     return count
// }
// function copyMat(mat:string[][]) {
//     var newMat:string[][] = []
//     for (var i = 0; i < mat.length; i++) {
//         newMat[i] = []
//         for (var j = 0; j < mat[0].length; j++) {
//             newMat[i][j] = mat[i][j]
//         }
//     }
//     return newMat
// }
