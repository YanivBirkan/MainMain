'use strict'

function debounce(func, wait) {
    let timeout
    return function (...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func(...args)
        }, wait)
    }
}



// console.log('Hi')
// console.log('Hi')
// console.log('Hi')
// console.log('Hi')
// console.log('Hi')

const debouncedLog = debounce(console.log, 500)

// debouncedLog('Hi')
// debouncedLog('Hi')
// debouncedLog('Hi')
// debouncedLog('Hi')
// debouncedLog('Hi')
// debouncedLog('Hi')
// debouncedLog('Hi')









// const API_KEY2 = 'LKKLSSME46DZXKVI'
// const API_KEY3 = 'MRBI16SV6ZPHKNOW'