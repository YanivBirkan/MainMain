function onBallCLick(elBall){
    console.log("ball clicked");
    const currentWidth = parseInt(elBall.style.width) || 100;
    
    const newWidth = currentWidth + 50;
    elBall.style.width = newWidth + "px";
    elBall.style.height = newWidth + "px";
    elBall.innerText = elBall.style.width;
    
}