function onIndexInit    () {
  const user = loadFromStorage("userData");
  const { bgColor, txtColor, birthDate, birthTime } = user;
  if (!user) return;
  renderColors(bgColor, txtColor);
  renderBirth(birthDate, birthTime);
}

function renderColors(bgColor, txtColor) {
  document.body.style.backgroundColor = bgColor;
  document.body.style.color = txtColor;
}

function renderBirth(birthDate,birthTime){
    let elDate = document.querySelector(".date-Details .date");
    let elTime = document.querySelector(".date-Details .time");
    elDate.innerHTML =birthDate;
    elTime.innerHTML = birthTime;
}

