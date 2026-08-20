"use strict";
let gIsMark=false;

function onInit(body) {
  // TODO: change the h1 txt
  console.log("hello");
  setTimeout(() => {
    const elJsTitle = document.querySelector("h1");
    elJsTitle.innerText = "I Love JS";
    console.log("hello " , elJsTitle);
  }, 3000);
}

function onMark(elBtn) {
  // TODO: change text in the button
  gIsMark= !gIsMark;
  const elSpans= document.querySelectorAll(".box span");
  for (let i = 0; i < elSpans.length; i++) {
    const elSpan = elSpans[i];
    elSpan.classList.toggle("mark");
    gIsMark? elBtn.innerText="Unmark" : elBtn.innerText="Mark";
  }
  console.log(elSpans);
}

function onMouseEnter(elImg) {
  // TODO: change the image
  elImg.src="img/ca.png";
}

function onMouseLeave(elImg) {
  // TODO: change the image
  elImg.src="img/ninja.png";

}

function onChangeSubHeader(elSpan) {
  // TODO: change the text in the span inside the h2
    const txt= elSpan.innerText;
    const elH2= document.querySelector("h2");
    elH2.innerText = txt;
    console.log(txt);
}

function onHandleKey(ev) {
  // TODO: close the modal if escape is pressed
    console.log("ev:", ev);
    const elModal = document.querySelector(".modal");
    elModal.style.display = "none";


}

function openModal() {
  // Todo: show the modal and schedule its closing
    const elModal = document.querySelector(".modal");
    elModal.style.display = "block";
    setTimeout(() => {
    elModal.style.display = "none";
      }, 5000);

}
function onCloseModal() {
  // Todo: hide the modal
    const elModal = document.querySelector(".modal");
    elModal.style.display = "none";
}

function onBless() {
  // Todo: update the modal content and use openModal
    const elModal = document.querySelector(".modal");
    const elH2 =document.querySelector("h2")
    elH2.style.color = getRandomColor();
    const time = getTime();
    elModal.innerHTML = `
    <span>You were blessed at ${time}</span>
    <button type="button" onclick="onCloseModal()" style="display: block ;"  >x</button>
    `
    openModal();
    // elModal.innerText=`You were blessed at ${time}`;


}

function getTime() {
  return new Date().toString().split(" ")[4];
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  var color = "#";

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
