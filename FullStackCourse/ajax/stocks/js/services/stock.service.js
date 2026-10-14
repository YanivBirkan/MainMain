'use strict'
const API_KEY = '0EC1ZOCL702RT37U'
const STORAGE_KEY = 'stockDB'
const CACHE_TIME = 1000 * 60
//if exist from storage
const gStockInfo =loadFromStorage(STORAGE_KEY) || {} // AMZN:[],TEVA:[]
// console.log('gStockInfo:', gStockInfo)

function getQuotes(symbol, onSuccess) {
    console.log('Service:', symbol)

    if (gStockInfo[symbol] && Date.now() - gStockInfo[symbol].lastReqTime < CACHE_TIME) {
        console.log('FROM CACHE')
        onSuccess(gStockInfo[symbol].quote)
        return
    }
    //ajax request
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
    $.get(url, (res) => {
        console.log('FROM AJAX')
        //build data from api to send on success
        const stockInfo = res['Time Series (Daily)']
        //create only date and price json data
        const quotes = [] // [{date: , price:}]
        for (const date in stockInfo) {
            const quote = {
                date,
                price: stockInfo[date]['4. close']
            }
            quotes.unshift(quote)
        }
        //create json for local storage
        gStockInfo[symbol] = {
            quotes,
            lastReqTime: Date.now()
        }
        saveToStorage(STORAGE_KEY, gStockInfo)
        onSuccess(quotes)
    })


}



