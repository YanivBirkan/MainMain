'use strict'

const gQueryOptions = {
    filterBy: { txt: '', minSpeed: 0 },
    sortBy: {},
    page: { idx: 0, size: 6 }
}
var gCarToEdit

function onInit() {
    readQueryParams()
    renderCars()
}

function renderCars() {
    var cars = getCars(gQueryOptions)
    var strHtmls = cars.map(car => `
        <article class="car-preview">
            <button title="Delete car" class="btn-remove" onclick="onRemoveCar('${car.id}')">X</button>
            
            <h2>${car.vendor}</h2>
            <p>Up to <span>${car.maxSpeed}</span> KMH</p>
            
            <button onclick="onReadCar('${car.id}')">Details</button>
            <button onclick="onUpdateCar('${car.id}')">Update</button>

            <img title="Photo of ${car.vendor}" 
                src="img/${car.vendor}.png" 
                alt="Car by ${car.vendor}"
                onerror="this.src='img/default.png'">
        </article> 
    `)
    document.querySelector('.cars-container').innerHTML = strHtmls.join('')
}

// CRUD

function onRemoveCar(carId) {
    // Model:
    removeCar(carId)
    // Dom:
    renderCars()
    flashMsg(`Car Deleted`)
}

function onUpdateCar(carId) {
    const car = getCarById(carId)
    // console.log('car:', car)

    const elForm = document.querySelector('.car-edit-modal form')

    const elVendor = elForm.querySelector('select')
    const elMaxSpeed = elForm.querySelector('input')
    const elImg = elForm.querySelector('img')

    elVendor.value = car.vendor
    elMaxSpeed.value = car.maxSpeed
    elImg.src = `img/${car.vendor}.png`
    
    //To make the modal button to update and not add
    gCarToEdit = car

    const elModal = document.querySelector('.car-edit-modal');
    elModal.showModal();

}

function onAddCar() {
    const elModal = document.querySelector('.car-edit-modal');
    elModal.showModal()
}

function onSaveCar() {
    const elForm = document.querySelector('.car-edit-modal form')

    const elVendor = elForm.querySelector('select')
    const elMaxSpeed = elForm.querySelector('input')

    const vendor = elVendor.value
    const maxSpeed = +elMaxSpeed.value

    if (gCarToEdit) {
        var car = updateCar(gCarToEdit.id, vendor, maxSpeed)
        gCarToEdit = null
    } else {
        var car = addCar(vendor, maxSpeed)
    }

    resetCarEditModal()
    renderCars()
    flashMsg(`Car Saved (id: ${car.id})`)
}

function resetCarEditModal() {
    const elForm = document.querySelector('.car-edit-modal form')

    const elVendor = elForm.querySelector('select')
    const elMaxSpeed = elForm.querySelector('input')
    const elImg = elForm.querySelector('img')

    elVendor.value = ''
    elMaxSpeed.value = ''
    elImg.src = ''
}

function onSelectVendor(vendor) {
    const elCarImg = document.querySelector('.car-edit-modal img')
    elCarImg.src = `img/${vendor}.png`
}

function onCloseCarEditModal() {
    document.querySelector('.car-edit-modal').close()
    resetCarEditModal()
    gCarToEdit = null

}

// // Details modal

function onReadCar(carId) {
    const car = getCarById(carId)
    const elModal = document.querySelector('.car-details-modal')

    elModal.querySelector('h3').innerText = car.vendor
    elModal.querySelector('h4 span').innerText = car.maxSpeed
    elModal.querySelector('p').innerText = car.desc
    elModal.querySelector('img').src = `img/${car.vendor}.png`

    elModal.showModal()
}

// function onCloseCarDetailsModal() {
//     document.querySelector('.car-details-modal').close()
// }

// // Filter, Sort & Pagination

function onSetFilterBy(filterBy) {
    // console.log('filterBy:', filterBy)
    if (filterBy.txt !== undefined) {
        gQueryOptions.filterBy.txt = filterBy.txt
    } else if (filterBy.minSpeed !== undefined) {
        gQueryOptions.filterBy.minSpeed = filterBy.minSpeed
    }
    // console.log('gQueryOptions.filterBy:', gQueryOptions.filterBy)

    gQueryOptions.page.idx = 0
    renderCars()
    setQueryParams()
}

function onSetSortBy() {

    const elSortField = document.querySelector('.sort-by select')
    const elSortDir = document.querySelector('.sort-by .sort-desc')

    const sortField = elSortField.value
    // console.log('sortField:', sortField)
    const sortDir = elSortDir.checked ? -1 : 1
    // console.log('sortDir:', sortDir)

    gQueryOptions.sortBy = { [sortField]: sortDir }
    // console.log('gQueryOptions.sortBy:', gQueryOptions.sortBy)

    gQueryOptions.page.idx = 0
    renderCars()
    setQueryParams()
}

function onNextPage() {
    // console.log('Getting next page...')

    const pageCount = getPageCount(gQueryOptions)

    if (gQueryOptions.page.idx === pageCount - 1) {
        gQueryOptions.page.idx = 0
    } else {
        gQueryOptions.page.idx++
    }

    // console.log('gQueryOptions.page:', gQueryOptions.page)
    renderCars()
    setQueryParams()
}

// // Query Params

function readQueryParams() {
    const queryParams = new URLSearchParams(window.location.search)
    gQueryOptions.filterBy = {
        txt: queryParams.get('vendor') || '',
        minSpeed: +queryParams.get('minSpeed') || 0
    }

    if (queryParams.get('sortBy')) {
        const prop = queryParams.get('sortBy')
        const dir = queryParams.get('sortDir')
        gQueryOptions.sortBy[prop] = dir
    }

    if (queryParams.get('pageIdx')) {
        gQueryOptions.page.idx = +queryParams.get('pageIdx')
        gQueryOptions.page.size = +queryParams.get('pageSize')
    }
    renderQueryParams()
}

function renderQueryParams() {

    document.querySelector('.filter-by input[type="text"]').value = gQueryOptions.filterBy.txt
    document.querySelector('.filter-by input[type="range"]').value = gQueryOptions.filterBy.minSpeed

    const sortKeys = Object.keys(gQueryOptions.sortBy)
    const sortBy = sortKeys[0]
    const dir = gQueryOptions.sortBy[sortKeys[0]]

    document.querySelector('.sort-by select').value = sortBy || ''
    document.querySelector('.sort-by .sort-desc').checked = (dir === '-1') ? true : false
}

function setQueryParams() {
    const queryParams = new URLSearchParams()

    queryParams.set('vendor', gQueryOptions.filterBy.txt)
    queryParams.set('minSpeed', gQueryOptions.filterBy.minSpeed)

    const sortKeys = Object.keys(gQueryOptions.sortBy)
    if (sortKeys.length) {
        queryParams.set('sortBy', sortKeys[0])
        queryParams.set('sortDir', gQueryOptions.sortBy[sortKeys[0]])
    }

    if (gQueryOptions.page) {
        queryParams.set('pageIdx', gQueryOptions.page.idx)
        queryParams.set('pageSize', gQueryOptions.page.size)
    }

    const newUrl =
        window.location.protocol + "//" +
        window.location.host +
        window.location.pathname + '?' + queryParams.toString()

    window.history.pushState({ path: newUrl }, '', newUrl)
}

// // UI

function flashMsg(msg) {
    const el = document.querySelector('.user-msg')

    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => el.classList.remove('open'), 3000)
}