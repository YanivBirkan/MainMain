let gBoard;
let gElSelectedCell = null;

const MineIcon = "💣";
const FlagIcon = "🚩";

let gLevel = {
  SIZE: 4,
  MINES: 2,
};

let gGame = {
  isFirstClick: true,
  lives: 3,
  isGameOver: false,
  isWin: false,
};

let startTime = 0;
let timerInterval = null;

function onInit() {
  gGame = {
    isFirstClick: true,
    lives: 3,
    isGameOver: false,
    isWin: false,
  };
  gBoard = buildBoard(gLevel.SIZE, gLevel.SIZE);
  renderBoard(gBoard);
  updateLives();
  updateSmiley("😃");
  clearInterval(timerInterval);
  startTime = 0;
  const timerElement = document.querySelector('.timer');
  if (timerElement) {
    timerElement.innerText = "00:00.00";
  }
}

function onChooseLevel(elBtn){
   switch (elBtn.className) {
    case 'Beginner':
      gLevel.SIZE = 4;
      gLevel.MINES = 2;
      break;
    case 'Medium':
      gLevel.SIZE = 8;
      gLevel.MINES = 4;
      break;
    case 'Expert':
      gLevel.SIZE = 12;
      gLevel.MINES = 6;
      break;
  }
  gBoard = buildBoard(gLevel.SIZE, gLevel.SIZE);
  renderBoard(gBoard);
  clearInterval(timerInterval);
  startTime = 0;
  const timerElement = document.querySelector('.timer');
  if (timerElement) {
    timerElement.innerText = "00:00.00";
  }
  // const level = elBtn.querySelector("")
  // console.log(level)
}

function buildBoard(rows, cols) {
  var board = [];
  for (var i = 0; i < rows; i++) {
    board[i] = [];

    for (var j = 0; j < cols; j++) {
      board[i][j] = {
        minesAroundCount: 0,
        isRevealed: false,
        isMine: false,
        isMarked: false,
      };
    }
  }
  return board;
}

function placeMines(firstRow, firstCol) {
  var minesPlaced = 0;
  while (minesPlaced < gLevel.MINES) {
    var row = Math.floor(Math.random() * gLevel.SIZE);
    var col = Math.floor(Math.random() * gLevel.SIZE);
    // First clicked cell can NEVER be a mine
    if (row === firstRow && col === firstCol) continue;
    if (gBoard[row][col].isMine) continue;
    gBoard[row][col].isMine = true;
    minesPlaced++;
  }
}

function addMinesAround() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      gBoard[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j);
    }
  }
}

function setMinesNegsCount(board, rowIdx, colIdx) {
  var count = 0;
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (i === rowIdx && j === colIdx) continue;
      if (j < 0 || j >= board[0].length) continue;
      if (board[i][j].isMine) {
        count++;
      }
    }
  }
  return count;
}

function renderBoard(board) {
  var strHTML = "";
  for (var i = 0; i < board.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < board[i].length; j++) {
      strHTML += `
        <td
          class="cell"
          onclick="onCellClicked(this, ${i}, ${j})"
          oncontextmenu="onCellMarked(event, this, ${i}, ${j})">
        </td>
      `;
    }
    strHTML += "</tr>";
  }
  var elTable = document.querySelector(".board-cells");
  elTable.innerHTML = strHTML;
}


function onCellClicked(elCell, i, j) {
  // if Game already finished
  if (gGame.isGameOver) return;
  var cell = gBoard[i][j];
  if (cell.isRevealed) return;
  if (cell.isMarked) return;

  if (gGame.isFirstClick) {
    placeMines(i, j);
    addMinesAround();
    gGame.isFirstClick = false;
    // Get the updated cell
    cell = gBoard[i][j];
    //time update
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10); 
  }

  if (cell.isMine) {
    handleMineClick(elCell, i, j);
    return;
  }
  revealCell(i, j);
  checkWin();
}
// update time display
function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  
  // Calculate minutes, seconds, and milliseconds
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10); // 2 digits

  // Format with leading zeros
  const displayString = 
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0') + '.' +
    String(milliseconds).padStart(2, '0');

  // Update your HTML element (assumes an element with id="timer")
  const timerElement = document.querySelector('.timer');
  if (timerElement) {
    timerElement.innerText = displayString;
  }
}

//on mine click
function handleMineClick(elCell, i, j) {
  var cell = gBoard[i][j];
  gGame.lives--;
  updateLives();
  cell.isRevealed = true;
  elCell.classList.add("clicked");
  elCell.innerText = MineIcon;

  // Wait a little so the user sees the bomb
  setTimeout(function () {
    // Hide the cell again
    cell.isRevealed = false;
    elCell.classList.remove("clicked");
    elCell.innerText = "";
    // No lives left
    if (gGame.lives <= 0) {
      gGame.isGameOver = true;
      updateSmiley("🤯");
      revealAllMines();
      clearInterval(timerInterval); // Stop counting    
      const finalTimeScore = (Date.now() - startTime) / 1000; 
    }
  }, 700);
}

function revealCell(i, j) {
  var cell = gBoard[i][j];
  if (i < 0 || i >= gBoard.length || j < 0 || j >= gBoard[0].length) {
    return;
  }

  if (cell.isRevealed) return;
  if (cell.isMine) return;
  if (cell.isMarked) return;
  cell.isRevealed = true;

  var elCell = document.querySelector(
    `[onclick="onCellClicked(this, ${i}, ${j})"]`,
  );

  if (!elCell) return;
  elCell.classList.add("clicked");
  if (cell.minesAroundCount > 0) {
    elCell.innerText = cell.minesAroundCount;
    return;
  }
  elCell.innerText = "";
  // Open all neighbors recursively
  revealNeighbors(i, j);
}

function revealNeighbors(row, col) {
  for (var i = row - 1; i <= row + 1; i++) {
    for (var j = col - 1; j <= col + 1; j++) {
      // Don't reveal the current cell
      if (i === row && j === col) continue;
      if (i < 0 || i >= gBoard.length || j < 0 || j >= gBoard[0].length) {
        continue;
      }
      var cell = gBoard[i][j];
      if (cell.isMine) continue;
      if (cell.isMarked) continue;
      if (cell.isRevealed) continue;
      // Reveal this neighbor
      revealCell(i, j);
    }
  }
}

//on right click
function onCellMarked(event, elCell, i, j) {
  event.preventDefault();
  if (gGame.isGameOver) return;
  var cell = gBoard[i][j];
  if (cell.isRevealed) return;

  if (cell.isMarked) {
    cell.isMarked = false;
    elCell.innerText = "";
    return;
  }
  //add flag
  cell.isMarked = true;
  elCell.innerText = FlagIcon;
}

function updateLives() {
  var elLives = document.querySelector(".lives");
  if (!elLives) return;
  var hearts = "";
  for (var i = 0; i < gGame.lives; i++) {
    hearts += "❤️";
  }
  elLives.innerText = hearts;
}

function checkWin() {
  var safeCells = 0;
  var revealedSafeCells = 0;
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      var cell = gBoard[i][j];
      if (!cell.isMine) {
        safeCells++;
        if (cell.isRevealed) {
          revealedSafeCells++;
        }
      }
    }
  }

  if (revealedSafeCells === safeCells) {
    gGame.isGameOver = true;
    gGame.isWin = true;
    updateSmiley("😎");
    clearInterval(timerInterval); // Stop counting    
    const finalTimeScore = (Date.now() - startTime) / 1000; 
  }
}

function markAllMines() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      var cell = gBoard[i][j];
      if (cell.isMine) {
        cell.isMarked = true;
        var elCell = document.querySelector(
          `[onclick="onCellClicked(this, ${i}, ${j})"]`,
        );
        if (elCell) {
          elCell.innerText = FlagIcon;
        }
      }
    }
  }
}

function revealAllMines() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      var cell = gBoard[i][j];
      if (cell.isMine) {
        var elCell = document.querySelector(
          `[onclick="onCellClicked(this, ${i}, ${j})"]`,
        );
        if (elCell) {
          elCell.classList.add("clicked");
          elCell.innerText = MineIcon;
        }
      }
    }
  }
}

//update simillies
function updateSmiley(smiley) {
  var elSmiley = document.querySelector(".smiley");
  if (!elSmiley) return;
  elSmiley.innerText = smiley;
}

function onSmileyClicked() {
  onInit();
}
