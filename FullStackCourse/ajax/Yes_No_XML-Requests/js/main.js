'use strict'

function onAsk() {
    console.log('Asking from the controller');
    // Todo : Render the answer from the service!
    showLoader()
    getAns(renderAns)

}

function renderAns(res) {
    // console.log('render ans')
    console.log('res:', res)
    document.querySelector('.ans h2').innerText = res.answer
    document.querySelector('.ans img').src = res.image
    // showAns()
}

function showAns() {
    document.querySelector('.ans').hidden = false
    document.querySelector('.loading').hidden = true
}

function showLoader() {
    document.querySelector('.ans').hidden = true
    document.querySelector('.loading').hidden = false
}