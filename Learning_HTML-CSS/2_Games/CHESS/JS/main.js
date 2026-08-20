'use strict'

// Pieces Types
const PAWN_BLACK = '♟'
const ROOK_BLACK = '♜'
const KNIGHT_BLACK = '♞'
const BISHOP_BLACK = '♝'
const QUEEN_BLACK = '♛'
const KING_BLACK = '♚'
const PAWN_WHITE = '♙'
const ROOK_WHITE = '♖'
const KNIGHT_WHITE = '♘'
const BISHOP_WHITE = '♗'
const QUEEN_WHITE = '♕'
const KING_WHITE = '♔'

// The Chess Board
var gBoard
var gSelectedElCell = null

function onInitGame() {
    gBoard = buildBoard()
    renderBoard(gBoard)
}

function buildBoard() {
    const board = []
    // DONE: build the board 8 * 8
    for (var i = 0; i < 8; i++) {
        board[i] = []
        for (var j = 0; j < 8; j++) {
            var piece = ''
            if (i === 1) piece = PAWN_BLACK
            else if (i === 6) piece = PAWN_WHITE
            board[i][j] = piece
        }
    }
    board[0][0] = board[0][7] = ROOK_BLACK
    board[0][1] = board[0][6] = KNIGHT_BLACK
    board[0][2] = board[0][5] = BISHOP_BLACK
    board[0][3] = QUEEN_BLACK
    board[0][4] = KING_BLACK


    board[7][0] = board[7][7] = ROOK_WHITE
    board[7][1] = board[7][6] = KNIGHT_WHITE
    board[7][2] = board[7][5] = BISHOP_WHITE
    board[7][3] = QUEEN_WHITE
    board[7][4] = KING_WHITE
    return board

}

function renderBoard(board) {
    var strHtml = ''
    for (var i = 0; i < board.length; i++) {
        const row = board[i]
        strHtml += '<tr>'
        for (var j = 0; j < row.length; j++) {
            const cell = row[j]

            const className = (i + j) % 2 === 0 ? 'white' : 'black'
            const tdId = `cell-${i}-${j}`
            strHtml += `<td id="${tdId}" onclick="cellClicked(this)" class="${className}">${cell}</td>`
        }
        strHtml += '</tr>'
    }
    const elMat = document.querySelector('.game-board')
    elMat.innerHTML = strHtml
}

function cellClicked(elCell) {

    // DONE: if the target is marked - move the piece!

    if (elCell.classList.contains('mark')) {
        movePiece(gSelectedElCell, elCell)
        cleanBoard()
        return
    }

    cleanBoard()

    elCell.classList.add('selected')
    gSelectedElCell = elCell

    const cellCoord = getCellCoord(elCell.id)
    console.log('cellCoord:', cellCoord)

    const piece = gBoard[cellCoord.i][cellCoord.j]

    var possibleCoords = []
    switch (piece) {
        case ROOK_BLACK:
        case ROOK_WHITE:
            possibleCoords = getAllPossibleCoordsRook(cellCoord)
            break
        case BISHOP_BLACK:
        case BISHOP_WHITE:
            possibleCoords = getAllPossibleCoordsBishop(cellCoord)
            break
        case KNIGHT_BLACK:
        case KNIGHT_WHITE:
            possibleCoords = getAllPossibleCoordsKnight(cellCoord)
            break
        case PAWN_BLACK:
        case PAWN_WHITE:
            possibleCoords = getAllPossibleCoordsPawn(cellCoord, piece === PAWN_WHITE)
            break
        case KING_BLACK:
        case KING_WHITE:
            possibleCoords = getAllPossibleCoordsKing(cellCoord)
            break
        case QUEEN_BLACK:
        case QUEEN_WHITE:
            possibleCoords = getAllPossibleCoordsQueen(cellCoord)
            break

    }
    markCells(possibleCoords)
}

function movePiece(elFromCell, elToCell) {

    const fromCoord = getCellCoord(elFromCell.id)
    const toCoord = getCellCoord(elToCell.id)
    const piece = gBoard[fromCoord.i][fromCoord.j]

    // update the MODEl
    gBoard[fromCoord.i][fromCoord.j] = ''
    // update the DOM
    elFromCell.innerText = ''

    // update the MODEl
    gBoard[toCoord.i][toCoord.j] = piece
    // update the DOM
    elToCell.innerText = piece

}

function markCells(coords) {

    for (var i = 0; i < coords.length; i++) {
        const coord = coords[i]
        const selector = getSelector(coord)
        const elCell = document.querySelector(selector)
        elCell.classList.add('mark')
    }
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    const coord = {}
    const parts = strCellId.split('-')
    coord.i = +parts[1]
    coord.j = +parts[2]
    return coord
}

function cleanBoard() {
    const elTds = document.querySelectorAll('.mark, .selected')
    for (var i = 0; i < elTds.length; i++) {
        elTds[i].classList.remove('mark', 'selected')
    }
}

function getSelector(coord) {
    return `#cell-${coord.i}-${coord.j}`
}

function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j] === ''
}


function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
    const res = []
    // DONE: handle PAWN use isEmptyCell()
    var diff = isWhite ? -1 : 1
    var nextCoord = {
        i: pieceCoord.i + diff,
        j: pieceCoord.j
    }

    if (isEmptyCell(nextCoord)) res.push(nextCoord)

    if (pieceCoord.i === 6 && isWhite || pieceCoord.i === 1 && !isWhite) {
        diff *= 2
        nextCoord = {
            i: pieceCoord.i + diff,
            j: pieceCoord.j
        }
        if (isEmptyCell(nextCoord)) res.push(nextCoord)
    }

    return res
}

function getAllPossibleCoordsRook(pieceCoord) {
    const res = []

    // UP
    for (var idx = pieceCoord.i - 1; idx >= 0; idx--) {
        const coord = { i: idx, j: pieceCoord.j }
        if (!isEmptyCell(coord)) break
        res.push(coord)
    }

    // RIGHT
    for (var idx = pieceCoord.j + 1; idx < 8; idx++) {
        const coord = { i: pieceCoord.i, j: idx }
        if (!isEmptyCell(coord)) break
        res.push(coord)
    }

    // DOWN
    for (var idx = pieceCoord.i + 1; idx < 8; idx++) {
        const coord = { i: idx, j: pieceCoord.j }
        if (!isEmptyCell(coord)) break
        res.push(coord)
    }

    // LEFT
    for (var idx = pieceCoord.j - 1; idx >= 0; idx--) {
        const coord = { i: pieceCoord.i, j: idx }
        if (!isEmptyCell(coord)) break
        res.push(coord)
    }

    return res
}

function getAllPossibleCoordsBishop(pieceCoord) {
    const res = []

    // up right
    var i = pieceCoord.i - 1
    for (var idx = pieceCoord.j + 1; idx < 8 && i >= 0; idx++) {
        const coord = { i: i--, j: idx }
        if (!isEmptyCell(coord)) break
        res.push(coord)
    }

    // down right
    i = pieceCoord.i + 1
    for (var idx = pieceCoord.j + 1; idx < 8 && i < 8; idx++) {
        const coord = { i: i++, j: idx }
        if (!isEmptyCell(coord)) break
        res.push(coord)
    }

    // down left
    i = pieceCoord.i + 1
    for (var idx = pieceCoord.j - 1; idx >= 0 && i < 8; idx--) {
        const coord = { i: i++, j: idx }
        if (!isEmptyCell(coord)) break
        res.push(coord)
    }

    // up left
    i = pieceCoord.i - 1
    for (var idx = pieceCoord.j - 1; idx >= 0 && i >= 0; idx--) {
        const coord = { i: i--, j: idx }
        if (!isEmptyCell(coord)) break
        res.push(coord)
    }

    return res
}


function getAllPossibleCoordsKing(pieceCoord) {
    const res = []
    const rowIdx = pieceCoord.i
    const colIdx = pieceCoord.j
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= 8) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= 8) continue
            if (i === rowIdx && j === colIdx) continue
            const coord = { i: i, j: j }
            if (isEmptyCell(coord)) res.push(coord)
        }
    }

    return res
}

function getAllPossibleCoordsQueen(pieceCoord) {

    const bishopRes = getAllPossibleCoordsBishop(pieceCoord)
    const rookRes = getAllPossibleCoordsRook(pieceCoord)
    const res = bishopRes.concat(rookRes)

    return res
}


function getAllPossibleCoordsKnight(pieceCoord) {
    const res = []
    const knightMoves = [
        { i: pieceCoord.i + 2, j: pieceCoord.j + 1 },
        { i: pieceCoord.i + 2, j: pieceCoord.j - 1 },
        { i: pieceCoord.i - 2, j: pieceCoord.j + 1 },
        { i: pieceCoord.i - 2, j: pieceCoord.j - 1 },
        { i: pieceCoord.i + 1, j: pieceCoord.j + 2 },
        { i: pieceCoord.i - 1, j: pieceCoord.j + 2 },
        { i: pieceCoord.i + 1, j: pieceCoord.j - 2 },
        { i: pieceCoord.i - 1, j: pieceCoord.j - 2 }
    ]

    for (var i = 0; i < knightMoves.length; i++) {
        const knightMove = knightMoves[i]
        if (knightMove.i < 0 || knightMove.i >= gBoard.length ||
            knightMove.j < 0 || knightMove.j >= gBoard[0].length) {
            continue
        }
        if (isEmptyCell(knightMove)) res.push(knightMove)
    }

    return res
}