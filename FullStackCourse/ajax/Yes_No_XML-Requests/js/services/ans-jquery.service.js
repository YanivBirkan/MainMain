'use strict'

function getAns(onSuccess) {
    console.log('getAns')
    const url = 'https://yesno.wtf/api'

    $.get(url, onSuccess)

    // $.get(url, (res) => {
    //     console.log('res:', res)
    //     console.log('hi')

    //     onSuccess(res)
    // })
}
