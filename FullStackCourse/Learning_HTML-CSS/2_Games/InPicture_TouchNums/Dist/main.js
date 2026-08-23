"use strict";
;
const gQuests = [
    { id: 101, opts: ['Cow', 'Horse'], correctOptIndex: 0 },
    { id: 102, opts: ['Cat', 'Dog'], correctOptIndex: 1 },
    { id: 103, opts: ['Fish', 'Cat'], correctOptIndex: 1 },
    { id: 104, opts: ['Horse', 'Bird'], correctOptIndex: 0 }
];
let gCurrQuestIdx = 0;
let gImgId = 101;
function onInit() {
    const elVictory = document.querySelector(".victory");
    elVictory.classList.add('hidden');
    gImgId = 101;
    gCurrQuestIdx = 0;
    renderQuest(gCurrQuestIdx);
}
function renderQuest(currQuest) {
    let btnsHtml = "";
    let quest = gQuests[currQuest];
    let elImg = document.querySelector(".img");
    elImg.src = `imgs/${quest.id}.jpeg`;
    let elbuttons = document.querySelector(".buttons");
    for (let i = 0; i < quest.opts.length; i++) {
        btnsHtml += `
            <button class="btn btn-success " title="op${i}" onclick=onCheckAnswer(${i},this)>
            ${quest.opts[i]}
            </button>
        `;
        // let opt:string = quest.opts[i];
        // elbuttons[i].innerText=opt;
    }
    elbuttons.innerHTML = btnsHtml;
}
function onCheckAnswer(optIdx, elButton) {
    console.log(optIdx);
    const corrOptIdx = gQuests[gCurrQuestIdx].correctOptIndex;
    if (optIdx === corrOptIdx)
        gCurrQuestIdx++;
    if (gCurrQuestIdx === gQuests.length)
        showVictory();
    else
        renderQuest(gCurrQuestIdx);
}
function showVictory() {
    const elVictory = document.querySelector(".victory");
    elVictory.classList.add('show');
}
