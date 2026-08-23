
let gCurrentBottom = 20;
const clickSound = new Audio('/Learning_HTML-CSS/exs/Baloons/pop.wav');
let counterInterval = undefined;
let gBalloons =[
        // {id:1 ,bottom:20, speed:10},
        // {id:2 ,bottom:20, speed:15},
        // {id:3 ,bottom:20, speed:20},
]
let gNextId =1;
function onInit(body){ 
    gBalloons = createBaloons(5);
    renderBalloons();
}
function renderBalloons(){
    let strHTML='';
    for (let i = 0; i < gBalloons.length; i++) {
        let bgColor = getRandomHexColor();
        let left = (i+1)*150;
        strHTML += `<div onmouseover="onSpeedUp(${i})" class="baloon" onclick="popBaloon(this)" style="background-color:${bgColor}; left:${left}px;"></div>`;
    }
    let elSky = document.querySelector('.sky');
    elSky.innerHTML = strHTML;
} 
function onStart(){
    counterInterval = setInterval(moveBaloons,500);
}
function onSpeedUp(i){
    gBalloons[i].speed+=3;
}
function popBaloon(baloon){
    clickSound.play();
    // baloon.style.display="none";
    baloon.style.transition = "opacity 0.5s ease-in-out";
    baloon.style.opacity = "0"; 
    setTimeout(()=>{
        baloon.remove();
    },2500);

}
function moveBaloons(){
    let elBaloons= document.querySelectorAll(".baloon");
        for (let i = 0; i < elBaloons.length; i++) {
            const baloonObj=gBalloons[i];
            const baloon = elBaloons[i];
            baloon.style.bottom =`${baloonObj.bottom + baloonObj.speed}px`;
            baloonObj.bottom+=baloonObj.speed;

            if(baloonObj.bottom>=500){
                clearInterval(counterInterval)
                alert(`baloon${baloonObj.id} won`)
            }
        }
    
}
function createBaloons(count){
    let baloons = [];
    for (let i = 0; i < count; i++) {
        let baloon = createBaloon()
        baloons.push(baloon);        
    }
    return baloons;
}
function createBaloon(){
    return {
        id:gNextId++,
        bottom : 20,
        speed : getRandomInt(10,20),

    }
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function getRandomHexColor() {
  const chars = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
}