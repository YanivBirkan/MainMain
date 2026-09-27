// 'use strict'

function onInit() {
    onContinueReadingHover()
}

function onContinueReadingHover() {
    const elLinkBtns = document.querySelectorAll('.card a'); // Get all the links

    elLinkBtns.forEach(elLinkBtn => { // Loop through each link
        const originalText = elLinkBtn.innerText; // Get the original text for the current link

        elLinkBtn.addEventListener('mouseover', () => {
            elLinkBtn.innerText = `${originalText} →`;
            // elLinkBtn.style.maxWidth = '210px';
        });

        elLinkBtn.addEventListener('mouseout', () => {
            elLinkBtn.innerText = originalText;
            // elLinkBtn.style.maxWidth = '180px';
        });
    });

    
}



