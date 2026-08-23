function onBallCLick(elBall){
    console.log("ball clicked");
    const currentWidth = parseInt(elBall.style.width) || 100;
    
    let newSize = currentWidth + 50;
    if(newSize<400){
        elBall.style.width = newSize + "px";
        elBall.style.height = newSize + "px";
        elBall.innerText = elBall.style.width;
    }
    else{
        setTimeout(function(){
            newSize = 100;
            elBall.style.width = newSize + "px";
            elBall.style.height = newSize + "px";
            elBall.innerText = elBall.style.width;
        },1000)
    }
    
}