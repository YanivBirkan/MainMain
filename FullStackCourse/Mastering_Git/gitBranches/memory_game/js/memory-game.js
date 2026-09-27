'use strict'

function init() {

	const nums = initNums()
	const strHtml =
		nums.map(num => `
            <article 
                class="card" 
                onclick="onCardClick(this)"> <div>${num}</div>
            </article>`).join('')

	document.querySelector('main').innerHTML = strHtml
}

function initNums() {
	const nums = []

	for (var i = 0; i < 20; i++) {
		nums.push(i % 10)
	}

	for (var i = 0; i < nums.length; i++) {
		const idx = getRandomInt(0, nums.length)

		const temp = nums[idx]
		nums[idx] = nums[i]
		nums[i] = temp
	}
	return nums
}

function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

function onCardClick(elCard) {
	var elSelectedCards = document.querySelectorAll('.selected')
	if (elSelectedCards.length === 2) return

	elCard.classList.add('selected')

	if (elSelectedCards.length === 0) return
	else elSelectedCards = document.querySelectorAll('.selected')

	if (elSelectedCards[0].innerText === elSelectedCards[1].innerText) {
		elSelectedCards.forEach(elCard => {
			elCard.classList.add('paired')
			elCard.classList.remove('selected')
		})
	} else {
		setTimeout(() => {
			elSelectedCards.forEach(elCard => elCard.classList.remove('selected'))
		}, 2000)
	}
}
