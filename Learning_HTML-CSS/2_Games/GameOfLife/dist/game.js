"use strict";
// //ex-find neighbours:
// const FOOD = "🍒";
// const EMPTY = "";
// const HERO = "🤖";
// let gBoard: string[][] = createBoard();
// console.table(gBoard);
// let count: number = countFoodAround(gBoard, 1, 1);
// console.log(`Found ${count} food around Hero position`);
// let bestPos :Record<string,number> |null= findBestPos(gBoard);
// console.log(`Best pos:`)
// function createBoard(): string[][] {
//   let board: string[][] = [];
//   for (let i = 0; i < 3; i++) {
//     board[i] = [];
//     for (let j = 0; j < 3; j++) {
//       board[i][j] = Math.random() > 0.7 ? FOOD : EMPTY;
//     }
//   }
//   board[1][1] = HERO;
//   return board;
// }
// function countFoodAround(board: string[][], rowIdx: number, colIdx: number) {
//   let foodCount = 0;
//   for (let i = rowIdx - 1; i <= rowIdx + 1; i++) {
//     if(i<0 ||i>=board.length) continue
//     for (let j = colIdx - 1; j <= colIdx + 1; j++) {
//         if(i===rowIdx && j===colIdx) continue
//         if(j<0 ||j>=board[i].length) continue
//       let currCell: string = board[i][j];
//       if (currCell === FOOD) foodCount++;
//     }
//   }
//   return foodCount;
// }
// function findBestPos(gBoard:string[][]){
//     let max:number =0;
//     let bestPos :Record<string,number> |null= null;
//     for (let i = 0; i < gBoard.length; i++) {
//         for (let j = 0; j < gBoard[i].length; j++) {
//             let count :number = countFoodAround(gBoard,i,j);
//             if(count>max){
//                 max=count;
//                 bestPos={"i":i ,"j":j};
//             }
//         }        
//     }
//     return bestPos;
// }
//ex- render
const gBoard = [
    [1, 0, 0, 1],
    [0, 0, 1, 0],
    [1, 0, 0, 0]
];
function onInit() {
    renderBoard(gBoard);
}
function renderBoard(board) {
    let strHtml = '';
    for (let i = 0; i < board.length; i++) {
        strHtml += "<tr>";
        for (let j = 0; j < board[0].length; j++) {
            let currCell = board[i][j];
            let cellClass = (board[i][j]) ? 'taken' : '';
            let cellData = `data-i="${i} data-j="${j}"`;
            if (currCell === 1) {
                strHtml += `<td class="cell ${cellClass}" ${cellData} onclick="onCellClick(${i} , ${j})">
                  ${currCell}
                  </td>`;
            }
            else {
                strHtml += `<td class="cell" data-i="${i} data-j="${j}">${currCell}</td>`;
            }
        }
        strHtml += "</tr>";
    }
    const elBoard = document.querySelector(".board");
    elBoard.innerHTML = strHtml;
}
