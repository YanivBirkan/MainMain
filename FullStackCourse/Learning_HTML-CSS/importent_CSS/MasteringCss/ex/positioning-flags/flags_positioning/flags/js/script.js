function moveTop(elFlag){
    let elFlags = document.querySelectorAll(".flag");
    elFlags.forEach(flag => {
        flag.classList.remove("top-flag")
    });
    elFlag.classList.add("top-flag");
}