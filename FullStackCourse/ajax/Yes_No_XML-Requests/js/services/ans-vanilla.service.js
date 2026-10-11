'use strict'

// function getAns(cb) {
//     setTimeout(() => {
//         const res = (Math.random() > 0.5) ? 'Sure Thing' : 'No Way'
//         console.log('Answer from service  ->  ', res)
//         cb(res)
//     }, 1000)

// }

// get ans from server

function getAns(onSuccess) {
    const xhr = new XMLHttpRequest()
    // console.log('xhr:', xhr)

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const ans = JSON.parse(xhr.responseText)
            onSuccess(ans)
        }
    }
    xhr.open('GET', 'https://yesno.wtf/api')
    xhr.send()
}
