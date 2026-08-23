'use strict'

const PACMAN = '<img src="img/pacman.gif"/>'
var gPacman

function createPacman(board) {
    gPacman = {
        location: {
            i: 7,
            j: 7
        },
        isSuper: false,
        deg: 0
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gGame.foodCount--
}

function onMovePacman(ev) {
    if (!gGame.isOn) return

    const nextLocation = getNextLocation(ev)
    // console.log('nextLocation:', nextLocation)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell:', nextCell)

    // return if cannot move
    if (nextCell === WALL) return
    // hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            console.log('nextLocation:', nextLocation)
            // console.log('gGhosts:', gGhosts)
            killGhost(nextLocation)
        } else {
            gameOver()
            return
        }
    } else if (nextCell === FOOD) {
        handleFood()
    } else if (nextCell === POWER_FOOD) {
        if (gPacman.isSuper) return
        handlePowerFood()
    } else if (nextCell === CHERRY) {
        updateScore(10)
    }
    console.log('gGame.foodCount:', gGame.foodCount)

    // moving from current location:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location:
    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, getPacmanHTML())

}

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
            gPacman.deg = -90
            break;
        case 'ArrowRight':
            nextLocation.j++
            gPacman.deg = 0
            break;
        case 'ArrowDown':
            nextLocation.i++
            gPacman.deg = 90
            break;
        case 'ArrowLeft':
            nextLocation.j--
            gPacman.deg = 180
            break;
    }
    return nextLocation
}

function getPacmanHTML() {
    return `<div style="transform: rotate(${gPacman.deg}deg)">${PACMAN}</div>`
}

function handleFood() {
    updateScore(1)
    gGame.foodCount--
    checkVictory()
}

function handlePowerFood() {
    gPacman.isSuper = true
    renderGhosts()
    setTimeout(() => {
        gPacman.isSuper = false
        reviveGhosts()
        renderGhosts()
    }, 5000)
}