interface Car {
  id: number;
  distance: number;
  speed: number;
}

const gcars: Car[] = [
  { id: 1, distance: 0, speed: 10 },
  { id: 2, distance: 0, speed: 15 },
];
let gIntervalId: ReturnType<typeof setInterval> | undefined =undefined;

function onInit() {
  renderCars();
}

function renderCars() {
  let strHTML: string = "";
  for (let i = 0; i < gcars.length; i++) {
    strHTML += `
         <div class="car car${i + 1}" onclick="onSpeedUp(${i+1})">Car${i + 1}</div>
         `;
  }
  let elRoad = document.querySelector(".road");
  if (elRoad) {
    elRoad.innerHTML = strHTML;
  }
}

function onStartRace() {
    gIntervalId= setInterval(moveCars,300);
}
    


function moveCars() {
  const elCars: NodeListOf<HTMLElement> = document.querySelectorAll(".car");
  for (let i = 0; i < gcars.length; i++) {
    const carDetails :Car = gcars[i];
    const elCar :HTMLElement =elCars[i];
    elCar.style.marginLeft =`${carDetails.distance + carDetails.speed}px`;
    carDetails.distance += carDetails.speed;
    elCar.style.marginLeft = `${carDetails.distance}px`;
    console.log("carDetails after:" , carDetails);

    if(carDetails.distance >1000){
      clearInterval(gIntervalId);
      alert(`Car${carDetails.id} Won!`);
    }
  }
}

function onSpeedUp(idx:number){
  const elCar: HTMLElement|null = document.querySelector(`.car${idx}`);
  const carDetails :Car = gcars[idx-1];
  carDetails.speed+=10;
  console.log("selcted car:" , elCar);

}
