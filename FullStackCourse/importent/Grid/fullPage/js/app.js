const backdrop = document.querySelector('.backdrop');

function openModal() {
    backdrop.classList.add('show');
}

function closeModal(event) {
    backdrop.classList.remove('show');
}
let gRndButtonArea = "item3";
function moveRndAround(elBtn){
    let areas = ["item1" , "item2" , "item3" , "item4" , "item5"];
    let idx = getRandomInt(areas.length);
    debugger;

    while(areas[idx] == gRndButtonArea){
        idx=getRandomInt(areas.length);
    }
    gRndButtonArea=areas[idx];
    elBtn.style.gridArea = areas[idx];
}

function getRandomInt(len){
 return Math.floor(Math.random() * len)
}