'use strict'

const STORAGE_KEY = 'carDB'

var gCars

_createCars()

function getCars(options = {}) {
    // console.log('options:', options)
    const filterBy = options.filterBy
    // console.log('filterBy:', filterBy)
    const sortBy = options.sortBy
    // console.log('sortBy:', sortBy)
    const page = options.page
    // console.log('page:', page)

    var cars = gCars

    cars = _filterCars(filterBy)

    if (sortBy.vendor) {
        const sortDir = sortBy.vendor
        cars = cars.toSorted((c1, c2) => c1.vendor.localeCompare(c2.vendor) * sortDir)

    } else if (sortBy.maxSpeed) {
        const sortDir = sortBy.maxSpeed
        cars = cars.toSorted((c1, c2) => (c1.maxSpeed - c2.maxSpeed) * sortDir)
    }

    // console.log('cars:', cars)
    const startIdx = page.idx * page.size // 0 , 3 , 6
    cars = cars.slice(startIdx, startIdx + page.size) // 0-3 , 3-6 , 6-9

    return cars
}

function _filterCars(filterBy) {
    var cars = gCars
    if (filterBy.txt) {
        cars = cars.filter(car => car.vendor.includes(filterBy.txt))
    }
    if (filterBy.minSpeed) {
        cars = cars.filter(car => car.maxSpeed >= filterBy.minSpeed)
    }
    return cars
}

function getPageCount(options) {
    const page = options.page
    const filterBy = options.filterBy
    // console.log('page:', page)
    // console.log('gCars:', gCars)

    const cars = _filterCars(filterBy)
    // console.log('cars:', cars)

    const pageCount = Math.ceil(cars.length / page.size)
    // console.log('pageCount:', pageCount)
    return pageCount
}

function removeCar(carId) {
    const carIdx = gCars.findIndex(car => carId === car.id)
    if (carIdx !== -1) gCars.splice(carIdx, 1)

    _saveCarsToStorage()
}

function addCar(vendor, maxSpeed) {
    var car = _createCar(vendor, maxSpeed)
    gCars.unshift(car)

    _saveCarsToStorage()
    return car
}

function getCarById(carId) {
    return gCars.find(car => carId === car.id)
}

function updateCar(carId, vendor, newSpeed) {
    const car = getCarById(carId)
    car.maxSpeed = newSpeed
    car.vendor = vendor

    _saveCarsToStorage()
    return car
}

function _createCars() {
    gCars = loadFromStorage(STORAGE_KEY)
    if (gCars && gCars.length) return

    // If no cars in storage - generate demo data

    gCars = []
    const vendors = ['audu', 'fiak', 'subali', 'mitsu']

    for (let i = 0; i < 12; i++) {
        var vendor = vendors[getRandomInt(0, vendors.length)]
        gCars.push(_createCar(vendor))
    }
    _saveCarsToStorage()
}

function _createCar(vendor, maxSpeed) {
    return {
        id: makeId(),
        vendor,
        maxSpeed: maxSpeed || getRandomIntInclusive(50, 250),
        desc: makeLorem()
    }
}

function _saveCarsToStorage() {
    saveToStorage(STORAGE_KEY, gCars)
}
