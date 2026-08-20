'use strict'

const WALL = '🗄'
const FOOD = '.'
const EMPTY = ' '
const POWER_FOOD = '🍬'
const CHERRY = '🍒'

var gCherryInterval
var gGame
var gBoard

function onInit() {
    gGame = {
        score: 0,
        isOn: true,
        isVictory: false,
        foodCount: 0
    }

    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    console.log('gBoard:', gBoard)

    renderBoard(gBoard)

    gCherryInterval = setInterval(addCherry, 15000)
    closeModal()
    console.log('gGame.foodCount:', gGame.foodCount)
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gGame.foodCount++
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gGame.foodCount--
            }
        }
    }
    console.log(gGame.foodCount);
    addPowerFood(board)
    return board
}

function addPowerFood(board) {
    board[1][1] = POWER_FOOD
    board[1][board[0].length - 2] = POWER_FOOD
    board[board.length - 2][1] = POWER_FOOD
    board[board.length - 2][board[0].length - 2] = POWER_FOOD
    gGame.foodCount -= 4
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">
                            ${cell}
                        </td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function addCherry() {
    var emptyLocation = getEmptyLocation(gBoard)
    if (!emptyLocation) return
    // Update Model
    gBoard[emptyLocation.i][emptyLocation.j] = CHERRY
    // Update DOM
    renderCell(emptyLocation, CHERRY)
}

function getEmptyLocation(board) {
    var emptyLocations = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === EMPTY) {
                emptyLocations.push({ i, j })
            }
        }
    }
    if (!emptyLocations.length) return null
    var randIdx = getRandomInt(0, emptyLocations.length)
    return emptyLocations[randIdx]
}

function checkVictory() {
    if (gGame.foodCount === 0) {
        gGame.isVictory = true
        gameOver()
    }
}

function gameOver() {
    console.log('Game Over')
    clearInterval(gGhostsInterval)
    clearInterval(gCherryInterval)
    gGame.isOn = false
    renderCell(gPacman.location, EMPTY)

    var msg = gGame.isVictory ? 'You Won!!!' : 'Game Over'
    openModal(msg)
}

function openModal(msg) {
    const elModal = document.querySelector('.modal')
    const elMsg = elModal.querySelector('.msg')
    elMsg.innerText = msg
    elModal.style.display = 'block'
}

function closeModal() {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}