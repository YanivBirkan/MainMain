const gBoard = [
  ["", "w", "", "w", "", "w", "", "w"],
  ["w", "", "w", "", "w", "", "w", ""],
  ["", "w", "", "w", "", "w", "", "w"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["b", "", "b", "", "b", "", "b", ""],
  ["", "b", "", "b", "", "b", "", "b"],
  ["b", "", "b", "", "b", "", "b", ""],
];

const elBoard = document.querySelector(".board");
function onInit() {
    let strHtml = "";
    let squaerColor = "";   
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[0].length; j++) {
            if(i%2==0){
                squaerColor = ((j%2==0)? "white" : "black")
            }
            else if(i%2!=0){
                squaerColor = ((j%2==0)? "black" : "white")
            }
        const color = gBoard[i][j];
        if (color == "w") {
            strHtml += `<div class="item ${squaerColor}-squaer"><div class="piece white"></div></div>`;
        } else if (color == "b") {
            strHtml += `<div class="item ${squaerColor}-squaer"><div class="piece black"></div></div>`;
        } else {
            strHtml += `<div class="item ${squaerColor}-squaer"></div>`;
        }
        }
    }
    console.log(strHtml);
    let elBoard = document.querySelector(".board");
    elBoard.innerHTML = strHtml;  
}
