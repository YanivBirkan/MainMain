'use strict'

var gChart

function onInit() {

    const elInput = document.querySelector('input')
    // const debouncedGetQuotes = debounce(onGetQuotes, 1500)
    elInput.addEventListener('input', onGetQuotes)
}

function onGetQuotes(ev) {
    const symbol = ev.target.value
    console.log('Getting quotes for:', symbol)
    //if not searching stock - dont call api
    if (!symbol) return
    //show loader while wait for success
    showLoader()
    // * AJAX  get from api and on success render the chart*
    getQuotes(symbol, renderChart)
}

function renderChart(quotes) {
    console.log('renderChart quotes:', quotes)
    //if stock name didnt exist 
    if (!quotes.length) {
        showMsg()
        return
    }
    //create the chart
    const elCanvas = document.querySelector('.my-chart');
    if (gChart) gChart.destroy()
    gChart = new Chart(elCanvas, {
        type: 'bar',
        data: {
            labels: quotes.map(quote => quote.date),
            datasets: [{
                label: 'stock price ',
                data: quotes.map(quote => quote.price),
                borderWidth: 1,
                borderColor: 'white'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    showChart()

}
//show error massege if stock not exist
function showMsg() {
    document.querySelector('.msg').classList.remove('hide')
    document.querySelector('.loader').classList.add('hide')
    document.querySelector('.chart-container').classList.add('hide')
}

//remove  loader  and show chart
function showChart() {
    document.querySelector('.chart-container').classList.remove('hide')
    document.querySelector('.loader').classList.add('hide')
    document.querySelector('.msg').classList.add('hide')
}

//remove chart and show loader
function showLoader() {
    document.querySelector('.loader').classList.remove('hide')
    document.querySelector('.chart-container').classList.add('hide')
    document.querySelector('.msg').classList.add('hide')
}
