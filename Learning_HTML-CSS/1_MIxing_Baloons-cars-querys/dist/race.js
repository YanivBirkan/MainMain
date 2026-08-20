"use strict";
const gcars = [
    { id: 1, distance: 0, speed: 10 },
    { id: 2, distance: 0, speed: 15 },
];
let gIntervalId = undefined;
function onInit() {
    renderCars();
}
function renderCars() {
    let strHTML = "";
    for (let i = 0; i < gcars.length; i++) {
        strHTML += `
         <div class="car car${i + 1}" onclick="onSpeedUp(${i + 1})">Car${i + 1}</div>
         `;
    }
    let elRoad = document.querySelector(".road");
    if (elRoad) {
        elRoad.innerHTML = strHTML;
    }
}
function onStartRace() {
    gIntervalId = setInterval(moveCars, 300);
}
function moveCars() {
    const elCars = document.querySelectorAll(".car");
    for (let i = 0; i < gcars.length; i++) {
        const carDetails = gcars[i];
        const elCar = elCars[i];
        elCar.style.marginLeft = `${carDetails.distance + carDetails.speed}px`;
        carDetails.distance += carDetails.speed;
        elCar.style.marginLeft = `${carDetails.distance}px`;
        console.log("carDetails after:", carDetails);
        if (carDetails.distance > 1000) {
            clearInterval(gIntervalId);
            alert(`Car${carDetails.id} Won!`);
        }
    }
}
function onSpeedUp(idx) {
    const elCar = document.querySelector(`.car${idx}`);
    const carDetails = gcars[idx - 1];
    carDetails.speed += 10;
    console.log("selcted car:", elCar);
}
