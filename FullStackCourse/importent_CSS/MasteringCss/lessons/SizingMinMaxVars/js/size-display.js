'use strict'

function updateSize(){
    var elSize = document.querySelectorAll('.size')

    for(var i = 0; i < elSize.length; i++){
        elSize[i].innerText = 
            elSize[i].parentElement.offsetWidth + 'px x ' +
            elSize[i].parentElement.offsetHeight + 'px' 
    }
}
