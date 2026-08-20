'use strict'

function onInit() {
    // TODO: change the h1 txt
    console.log('hello')
}

function onMark(elBtn) {
    // TODO: change text in the button
    // TODO: mark all spans inside .box
}

function onMouseEnter(elImg) {
    // TODO: change the image
}

function onMouseLeave(elImg) {
    // TODO: change the image
}

function onChangeSubHeader(elSpan) {
    // TODO: change the text in the span inside the h2
}

function onHandleKey(ev) {
    // TODO: close the modal if escape is pressed
    console.log('ev:', ev)
}

function openModal() {
    // Todo: show the modal and schedule its closing
}
function onCloseModal() {
    // Todo: hide the modal
}

function onBless() {
    // Todo: update the modal content and use openModal
}

function getTime() {
    return new Date().toString().split(' ')[4]
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'

    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}